import { world, shape, oval, stroke, box, wallPt, TAU } from '../../worlds/common.js';
import { timber, metal, benchFrame, drape, vessel, bentTube, floorLight } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, panelFront, taskLight, floorShadow } from '../joinery.js';

const smooth = v => { const a = Math.max(0, Math.min(1, v)); return a * a * (3 - 2 * a); };
export function hands(H, R, i, j, targets, shirt = 'teal', shift = 0, scale = 1) {
  const [x, y] = H.p(i, j, 0), head = [x + shift, y - 57];
  if (scale !== 1) {
    const base = H, pt = p => [x + (p[0] - x) * scale, y + (p[1] - y) * scale];
    targets = targets.map(p => p && [x + (p[0] - x) / scale, y + (p[1] - y) / scale]);
    H = Object.create(base);
    H.fill = (points, ...args) => base.fill(points.map(pt), ...args);
    H.outline = (random, points, ...args) => base.outline(random, points.map(pt), ...args);
    H.line = (random, points, ...args) => base.line(random, points.map(pt), ...args);
    H.dot = (a, b, radius, ...args) => base.dot(...pt([a, b]), radius * scale, ...args);
  }
  oval(H, R, x + 2, y + 1, 12, 4, 'blue', .14);
  for (const s of [-1, 1]) {
    stroke(H, R, [[x + s * 4, y - 24], [x + s * 5, y - 12], [x + s * 6, y]], 'blue', 6);
    oval(H, R, x + s * 6 + 2, y, 5, 2.4, 'blue', .8);
  }
  shape(H, R, [[x - 8 + shift, y - 48], [x + 8 + shift, y - 48], [x + 9, y - 23], [x - 8, y - 23]], shirt, .7);
  H.line(R, [[x - 4, y - 25], [x + 5, y - 25]], 'paper', .8);
  oval(H, R, ...head, 7.5, 8.5, 'paper', 1);
  shape(H, R, [[head[0] - 8, head[1]], [head[0] - 7, head[1] - 8], [head[0] + 3, head[1] - 10], [head[0] + 8, head[1] - 4], [head[0] + 4, head[1] - 5], [head[0] - 5, head[1] - 3]], 'blue', .86);
  H.dot(head[0] + 3, head[1] + 1, .9, 'blue');
  for (let n = 0; n < 2; n++) {
    const start = [x + (n ? 7 : -7) + shift, y - 44], target = targets[n] || [x + (n ? 11 : -11), y - 29];
    const elbow = [(start[0] + target[0]) / 2 + (n ? 4 : -4), (start[1] + target[1]) / 2 + 7];
    stroke(H, R, [start, elbow, target], 'blue', 6);
    stroke(H, R, [start, elbow, target], shirt, 4.3);
    oval(H, R, ...target, 2.6, 2.4, 'paper', 1);
  }
}

function hookedHandle(H, R, i, j, z, ink = 'sun', size = 1) {
  const [x, y] = H.p(i, j, z);
  stroke(H, R, [[x, y - 23 * size], [x, y - 3 * size], [x - 2 * size, y + 4 * size], [x - 8 * size, y + 5 * size], [x - 11 * size, y], [x - 10 * size, y - 6 * size]], 'blue', 5 * size);
  stroke(H, R, [[x, y - 23 * size], [x, y - 3 * size], [x - 2 * size, y + 4 * size], [x - 8 * size, y + 5 * size], [x - 11 * size, y], [x - 10 * size, y - 6 * size]], ink, 3 * size);
}

const room = world('london-umbrella-ribs', 'A canopy learns its shape', { wall: false, floor: 'paper', pattern: 'tiles', accent: 'teal', head: 65 }, (H, R) => {
  masonry(H, R, 'ne', 0, 12, 0, 3.6, 'paper', .92);
  masonry(H, R, 'nw', 0, 12, 0, 3.6, 'teal', .15);
  windowBay(H, R, 'nw', 1.2, 5.8, 1.45, 1.85, { divisions: 3, view: P => {
    shape(H, R, [P(.2,.2),P(5.5,.2),P(5.5,.7),P(4.6,1),P(3.8,.65),P(2.7,.85),P(1.7,.5),P(.2,.7)], 'teal', .22);
  }});
  floorLight(H, 5.1, 5.6, 110, .5);
  for (const j of [9.6, 10.1]) metal(H, R, .05, j, .9, .12, .02, .05, 'blue');
  timber(H, R, .05, 8.75, .22, 2.9, 0, 3, 'sun');
  cabinetFrame(H, R, 7.2, .15, 4.4, 1.25, .12, 3.2, 3, 'teal', (i,j,w,d,z,h,n) => {
    timber(H,R,i,j,w,d,z+.92,.09,'sun');
    timber(H,R,i,j,w,d,z+1.91,.09,'sun');
    if(n===0){
      for(let k=0;k<7;k++) bentTube(H,R,[[i+.12+k*.14,j+.42,z+1.02],[i+.18+k*.14,j+.35,z+1.81]],1.2,k===2?'sun':'blue');
      for(let k=0;k<3;k++) hookedHandle(H,R,i+.2+k*.32,j+.48,z+2.18,'sun',.5);
      drape(H,R,i+.06,j+.02,w-.13,d-.03,z+.65,.3,'coral');
    } else if(n===1){
      for(let k=0;k<3;k++) box(H,R,i+.06,j+.07,w-.1,d-.1,z+k*.2,.16,k===1?'paper':'coral',.45);
      vessel(H,R,i+.35,j+.4,z+1.02,7,10,'teal',false);
      for(let k=0;k<4;k++) hookedHandle(H,R,i+.1+k*.25,j+.45,z+2.27,k===2?'coral':'sun',.43);
    } else {
      for(let k=0;k<4;k++) { const a=H.p(i+.13+k*.24,j+.4,z+.12), b=H.p(i+.13+k*.24,j+.4,z+.82); H.line(R,[a,b],'blue',3); H.line(R,[b,[b[0]+3,b[1]-5]],'sun',2); }
      drape(H,R,i+.03,j+.03,w-.07,d-.08,z+1.46,.35,'paper');
      metal(H,R,i+.1,j+.05,w-.2,d-.1,z+2.12,.18,'blue');
      for(let k=0;k<4;k++) H.line(R,[H.p(i+.13+k*.2,j+d,z+2.1),H.p(i+.13+k*.2,j+d,z+2.65)],'paper',.55);
    }
  });
  panelFront(H,R,7.28,1.42,4.2,.14,.48,3,'teal');
  for(let n=0;n<4;n++) {
    const a=wallPt(H,'ne',1.2+n*1.1,2.6,-.2);
    shape(H,R,[[a[0],a[1]-17],[a[0]+17,a[1]+10],[a[0]-12,a[1]+6]],n===2?'coral':'paper',n===2?.6:1);
    H.line(R,[[a[0],a[1]-15],[a[0]+2,a[1]+7]],'blue',.6);
    H.dot(a[0],a[1]-18,1.5,'sun');
  }
  timber(H,R,.24,2.1,1.05,4.4,1.05,.13,'sun');
  for(const j of [2.25,4.2,6.22]) timber(H,R,.31,j,.16,.16,.12,.93,'teal');
  timber(H,R,.27,2.16,.92,4.25,.36,.08,'teal');
  for(let n=0;n<4;n++) {
    const j=2.3+n*.94;
    box(H,R,.32,j,.68,.76,.45,.3,n%2?'paper':'coral',.5);
    H.line(R,[H.p(.55,j+.77,.54),H.p(.76,j+.77,.54)],'blue',1.4);
  }
  for(const j of [2.45,2.75,3.03]) hookedHandle(H,R,.8,j,1.18,'sun',.5);
  for(let n=0;n<3;n++) {
    const [x,y]=H.p(.75,4.2+n*.44,1.18);
    oval(H,R,x,y,7,3,'paper',1);
    H.line(R,[[x-5,y],[x+4,y]],n===1?'coral':'teal',2);
  }
  box(H,R,.35,5.85,.6,.48,1.18,.2,'teal',.75);
  bentTube(H,R,[[.2,2,1.82],[.2,6.5,1.82]],1.8,'blue');
  for(let n=0;n<5;n++) {
    const [x,y]=H.p(.27,2.4+n*.78,1.8);
    H.line(R,[[x,y],[x+3,y+13],[x+8,y+18]],n===2?'coral':'sun',2);
    oval(H,R,x+8,y+18,3,2,'blue',.45);
  }
  floorShadow(H,2.4,3.5,5.2,3.2,.19);
  benchFrame(H,R,2.4,3.5,5.15,2.9,1.18,'sun');
  timber(H,R,2.65,3.85,4.6,2.24,.39,.09,'sun');
  for(let n=0;n<3;n++) box(H,R,2.82+n*1.22,4.15,.99,1.1,.5,.26,n===1?'coral':'teal',.45);
  drape(H,R,2.55,3.63,4.82,2.53,1.19,.18,'paper');
  shape(H,R,H.tile(3.15,4.2,3.4,1.6,1.205),'teal',.13);
  metal(H,R,6.6,5.1,.42,.4,1.2,.22,'blue');
  bentTube(H,R,[[6.58,5.31,1.38],[7.08,5.31,1.38]],3,'coral');
  for(const [i,j,z] of [[3,5.45,1.22],[3.38,5.65,1.22]]) metal(H,R,i,j,.3,.2,z,.07,'sun');
  H.line(R,[H.p(3.15,5.8,1.27),H.p(3.7,5.55,1.27)],'blue',2);
  for(let n=0;n<5;n++) oval(H,R,...H.p(3.6+n*.1,5.82,1.24),2,1.1,'blue',.6);
  shape(H,R,H.tile(6.3,5.6,.6,.45,1.22),'coral',.65);
  for(let n=0;n<4;n++) H.line(R,[H.p(6.32+n*.14,5.63,1.23),H.p(6.34+n*.14,6.02,1.23)],'paper',.6);
  taskLight(H,R,2.8,3.8,1.24,'coral',.5);
  timber(H,R,9.3,6.7,1.6,1.45,.62,.13,'sun');
  for(const i of [9.45,10.65]) for(const j of [6.84,7.9]) timber(H,R,i,j,.13,.13,0,.62,'sun');
  drape(H,R,9.38,6.75,1.4,1.27,.78,.12,'teal');
  hookedHandle(H,R,10.9,7.7,.07,'sun',1.3);
  vessel(H,R,1.15,8.1,0,11,26,'teal');
  for(let n=0;n<3;n++) hookedHandle(H,R,1.0+n*.19,8.12,.78,'sun',.65);
  box(H,R,1.4,9.4,1.6,1.1,0,.14,'blue',.3);
  for(let n=0;n<4;n++) H.line(R,[H.p(1.55,9.56+n*.22,.15),H.p(2.83,9.56+n*.22,.15)],'sun',1.1);
  timber(H,R,3.8,8.1,2.7,1.2,.05,.12,'sun');
  for(const i of [3.8,6.35]) timber(H,R,i,8.1,.15,1.2,.16,.2,'sun');
  timber(H,R,3.8,8.1,2.7,.12,.16,.2,'sun');
  for(let n=0;n<4;n++) H.line(R,[H.p(4,8.3+n*.2,.2),H.p(6.15,8.33+n*.2,.2)],n===2?'sun':'blue',1.2);
  shape(H,R,H.tile(4.16,8.16,.6,.7,.23),'coral',.5);
  for(const i of [5.2,5.65]) oval(H,R,...H.p(i,8.65,.23),4,2,'paper',1);
}, (H,R,t) => {
  const u=((t%20)+20)%20, a=smooth((u-4)/4)*(1-smooth((u-12)/6)), radius=.24+2.1*a;
  const ci=6.8,cj=5.3, top=3.4, rim=1.85+.55*a, runner=1.4+.2*a;
  const grip=H.p(ci,cj,runner);
  hands(H,R,9.55,7.65,[H.p(9.1,7.16,1),H.p(9.43,7.28,.82)],'teal',-a);
  hookedHandle(H,R,ci,cj,1.43,'sun',.8);
  bentTube(H,R,[[ci,cj,1.41],[ci,cj,top+.13]],2.2,'blue');
  for(let n=0;n<10;n++) {
    const an=n*TAU/10, bn=(n+1)*TAU/10;
    const p0=H.p(ci,cj,top), p1=H.p(ci+radius*Math.cos(an),cj+radius*Math.sin(an),rim), p2=H.p(ci+radius*Math.cos(bn),cj+radius*Math.sin(bn),rim);
    const mid=H.p(ci+radius*.91*Math.cos((an+bn)/2),cj+radius*.91*Math.sin((an+bn)/2),rim-.16*a);
    shape(H,R,[p0,p1,mid,p2],n===7?'sun':n%3===0?'teal':'paper',n===7?.34:n%3===0?.27:1,.8);
    H.line(R,[p0,p1],n===2?'sun':'blue',n===2?1.8:1);
    H.line(R,[p1,mid,p2],'blue',1);
    H.dot(...p1,1.5,'sun');
    if(n>3&&n<9) H.line(R,[grip,H.p(ci+radius*.54*Math.cos(an),cj+radius*.54*Math.sin(an),top*.5+rim*.5)],'blue',1.1);
  }
  const contact=smooth(u/3)*(1-smooth((u-17.6)/1.2)),rest=H.p(7.88,5.65,.92),hand=grip.map((v,n)=>rest[n]+(v-rest[n])*contact);
  hands(H,R,7.9,5.65,[H.p(7.0,5.35,1.35),hand],'coral',-a);
  const repaired=H.p(ci+radius*.64*Math.cos(TAU*.7),cj+radius*.64*Math.sin(TAU*.7),rim+(top-rim)*.36);
  oval(H,R,...repaired,3,2.4,'coral',.85);
  metal(H,R,ci-.07,cj-.07,.14,.14,runner-.055,.11,'paper');
  H.line(R,[H.p(ci,cj,runner-.12),H.p(ci+.15,cj,runner-.12)],'coral',2);
  if(contact>.99)oval(H,R,...grip,2.4,2.2,'paper',1);
});
room.loopSeconds=20;
room.stillTime=10;
export default room;
