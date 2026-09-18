import { world, shape, oval, stroke, box, ell, loop, TAU, actor } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, bentTube, drape, benchFrame, caneChair, branchSpray } from '../materials.js';
import { cabinetFrame, basin, masonry } from '../structure.js';
import { windowBay, hangingRail, panelFront, floorShadow } from '../joinery.js';
const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };
function person(H, R, foot, hands, shirt = 'teal', scale = 1, head = 0) {
  const [x, y] = foot, P = (a, b) => [x + a * scale, y + b * scale];
  oval(H, R, x + 2, y + 2, 14 * scale, 4 * scale, 'blue', .18);
  for (const s of [-1, 1]) {
    stroke(H, R, [P(s * 5, -29), P(s * 6, -14), P(s * 8, -1)], 'blue', 6 * scale);
    oval(H, R, ...P(s * 8 + 2, 0), 5 * scale, 2.5 * scale, 'blue', .9);
  }
  shape(H, R, loop([P(-8, -56), P(8, -55), P(10, -28), P(-9, -28)], 1), shirt, .65, .9);
  H.line(R, [P(-6, -30), P(7, -30)], 'paper', .65);
  oval(H, R, ...P(head, -66), 7.5 * scale, 8 * scale, 'coral', .3);
  shape(H, R, [P(-8 + head, -67), P(-7 + head, -73), P(head, -76), P(7 + head, -71), P(8 + head, -66), P(head, -69), P(-5 + head, -64)], 'blue', .86, .5);
  H.dot(...P(3 + head, -66), .8 * scale, 'blue');
  H.line(R, [P(2 + head, -61), P(5 + head, -61)], 'blue', .5);
  hands.forEach((hand, n) => {
    const s = n ? 1 : -1, sh = P(s * 6, -52), el = [(sh[0] + hand[0]) / 2 + s * 5, (sh[1] + hand[1]) / 2 + 8];
    stroke(H, R, [sh, el, hand], 'blue', 5.8 * scale);
    stroke(H, R, [sh, el, hand], shirt, 4.2 * scale);
    oval(H, R, ...hand, 2.4 * scale, 2 * scale, 'coral', .38);
  });
}

function plate(H, R, i, j, z, r = 13) { const p = H.p(i, j, z); oval(H, R, ...p, r, r * .4, 'paper', 1); H.outline(R, ell(...p, r * .73, r * .26), 'coral', .6); }
function bird(H, R, x, y, s = 1) { oval(H, R, x, y, 6 * s, 3.8 * s, 'teal', .6); oval(H, R, x + 5 * s, y - 4 * s, 3 * s, 3 * s, 'teal', .7); shape(H, R, [[x + 7 * s, y - 5 * s], [x + 12 * s, y - 3 * s], [x + 7 * s, y - 2 * s]], 'sun', .8, .4); H.dot(x + 5 * s, y - 4 * s, .6 * s, 'blue'); }
const room = world('mexico-city-patio-breakfast', 'A table under the arch', { wall: false, floor: 'paper', tone: 1, head: 60 }, (H, R) => {
  for (let ix = 0; ix < 10; ix++) for (let jy = 0; jy < 15; jy++) { const i=ix*1.2,j=jy*.8; shape(H, R, H.tile(i + .025, j + .025, 1.14, .74, .02), (Math.round(i / 1.2) + Math.round(j / .8)) % 8 === 0 ? 'coral' : 'paper', .17, .5); }
  masonry(H, R, 'nw', 0, 11.95, 0, 3.25, 'coral', .29);
  masonry(H, R, 'ne', 0, 12, 0, 4.6, 'paper', .84);
  shape(H, R, H.tile(2.2, 2.05, 6.8, 5.35, .035), 'blue', .13, .1);
  windowBay(H, R, 'ne', 2.75, 5.9, 1.6, 2.2, { ink: 'teal', divisions: 3, view: P => { shape(H, R, [P(.13,.14),P(5.77,.14),P(5.77,2.03),P(.13,2.03)], 'sun', .12, .3); for(let n=0;n<4;n++){ const [x,y]=P(.7+n*1.25,.5);oval(H,R,x,y,7,9,'coral',.4); } } });
  for (const i of [1.18, 9.95]) {
    box(H, R, i, 1.48, .73, .94, .04, 2.68, 'paper', 1);
    box(H, R, i - .1, 1.4, .93, 1.11, 2.66, .18, 'paper', 1);
    box(H, R, i - .05, 1.42, .83, 1.05, .06, .24, 'coral', .22);
  }
  const center = 5.93, radius = 4.35;
  for (let n = 0; n < 14; n++) {
    const a = n * Math.PI / 14, b = (n + 1) * Math.PI / 14;
    const Q = (r, theta, j) => H.p(center + Math.cos(theta) * r, j, 2.74 + Math.sin(theta) * r * .42);
    const front = [Q(radius, a, 2.36), Q(radius, b, 2.36), Q(radius + .52, b, 2.36), Q(radius + .52, a, 2.36)];
    shape(H, R, front, 'paper', 1, .7);
    shape(H, R, [Q(radius,a,1.48),Q(radius,b,1.48),Q(radius,b,2.36),Q(radius,a,2.36)], 'teal', .2, .6);
    H.line(R, [Q(radius + .4,a,2.38),Q(radius + .4,b,2.38)], 'sun', .8);
  }
  cabinetFrame(H, R, 2.36, .53, 6.53, 1.04, .05, 1.3, 3, 'teal', (i,j,w,d,z,h,n) => {
    if(n === 0){for(let k=0;k<4;k++){plate(H,R,i+.5,j+.55,z+.17+k*.07,11);}vessel(H,R,i+1.4,j+.55,z+.15,10,18,'sun',false);}
    if(n === 1){for(let k=0;k<3;k++){timber(H,R,i,j,w,d,z+k*.34,.09,'sun');H.line(R,[H.p(i+.7,j+d,z+.17+k*.34),H.p(i+1.2,j+d,z+.17+k*.34)],'blue',2);}}
    if(n === 2){vessel(H,R,i+.62,j+.48,z+.17,10,13,'paper');bird(H,R,...H.p(i+.62,j+.48,z+.59),.65);shape(H,R,H.faceJ(i+w-.05,j+.16,d,.14,.99),'sun',.5,.65);}
  });
  hangingRail(H, R, 'nw', 1.2, 3.8, 2.55, 3, (P,u,n)=>{const [x,y]=P(u,-.17);H.line(R,[[x,y],[x,y+12]],'blue',1.8);oval(H,R,x,y+23,n===1?13:9,n===1?12:9,n===1?'blue':'paper',n===1?.7:1);});
  for(let n=0;n<6;n++) { const [x,y]=H.p(9.02,.75,1.33+n*.11); oval(H,R,x,y,12,4,'paper',1); }
  bentTube(H,R,[[.25,10.95,.04],[.25,10.95,3.42],[.25,.6,3.42]],2.6,'teal');
  for(const j of [3.2,6.6,9.4]) {H.line(R,[H.p(.22,j,3.4),H.p(.5,j,3.4)],'blue',2);}
  shape(H,R,H.tile(.45,10.39,1.12,.73,.05),'blue',.65,.6);
  for(let n=0;n<7;n++) H.line(R,[H.p(.55+n*.13,10.45,.065),H.p(.55+n*.13,11.02,.065)],'paper',.8);
  for(const j of [5.5,6.3,7.1]) bentTube(H,R,[[.21,j,.5],[.21,j,3.75]],1.3,'sun');
  for(const z of [1.1,1.8,2.5,3.2]) bentTube(H,R,[[.21,5.2,z],[.21,7.35,z]],1.1,'sun');
  for(let n=0;n<8;n++){const [x,y]=H.p(.28,5.43+n*.24,.85+n*.31);branchSpray(H,R,x,y,.55,'teal',n%2?1:-1);}
  benchFrame(H, R, 3.04, 4.62, 4.94, 2.98, 1.3, 'sun');
  for(const i of [3.16,7.76]) timber(H,R,i,4.77,.12,2.62,.62,.14,'sun');
  drape(H, R, 4.77, 4.65, 1.12, 2.94, 1.315, .39, 'paper');
  for(const i of [4.89,5.06,5.63]) H.line(R,[H.p(i,4.68,1.33),H.p(i,7.61,1.33),H.p(i,7.64,.96)],'teal',1.2);
  vessel(H,R,6.4,5.5,1.35,12,28,'paper');
  oval(H,R,...H.p(6.4,5.5,2.24),6,2.6,'coral',.8);
  plate(H,R,4.16,5.58,1.36,20);
  for(const [i,j,c] of [[3.93,5.51,'coral'],[4.32,5.54,'sun'],[4.15,5.78,'sun']])oval(H,R,...H.p(i,j,1.4),8,7,c,.7);
  for(const [i,j] of [[6.82,6.85],[4.18,6.95]]){plate(H,R,i,j,1.35,12);vessel(H,R,i,j,1.4,6,11,'paper');}
  shape(H,R,loop([H.p(6.7,4.96,1.35),H.p(7.7,4.96,1.35),H.p(7.51,5.75,1.35),H.p(6.83,5.55,1.75)],1),'paper',1,.7);
  H.line(R,[H.p(6.8,5.44,1.37),H.p(7.58,5.54,1.37)],'coral',1);
  H.line(R,[H.p(3.1,7.6,1.31),H.p(3.55,7.6,1.31)],'teal',2);
  caneChair(H,R,7.82,4.5,'teal');
  for(const i of [3.05,3.68]){const p=H.p(i,10.5,.06);shape(H,R,loop([[p[0]-6,p[1]],[p[0]+6,p[1]],[p[0]+6,p[1]-13],[p[0],p[1]-18],[p[0]-5,p[1]-12]],1),'coral',.44,.65);H.line(R,[[p[0]-4,p[1]-8],[p[0]+4,p[1]-8]],'paper',1);}
  box(H,R,1.71,9.19,.83,.48,.02,.73,'teal',.5);
  bentTube(H,R,[[1.82,9.27,.73],[1.82,9.27,.98],[2.37,9.27,.98],[2.37,9.27,.73]],1.4,'coral');
  drape(H,R,9.65,8.96,1.26,1,.64,.32,'coral');
  for(const x of [9.73,10.72])timber(H,R,x,9.05,.13,.75,.03,.58,'sun');
  plate(H,R,10.21,9.5,.68,13);
  H.line(R,[H.p(10.05,9.51,.7),H.p(10.45,9.45,.7)],'blue',1.3);
}, (H,R,t)=>{
  const u=((t%24)+24)%24, pull=ease(4.8,9.6,u)*(1-ease(14.4,22,u));
  const i=3.45,j=7.82+pull*.85;
  floorShadow(H,i,j,.95,.86,.15);caneChair(H,R,i,j,'sun',true);
  H.line(R,[H.p(i+.26,j+.72,1.14),H.p(i+.57,j+.72,1.14)],'teal',2);
  const hands=[H.p(i+.16,j+.72,1.24),H.p(i+.75,j+.72,1.24)];
  person(H,R,H.p(i+.6,j+1.19,.02),hands,'coral',1.03,-pull);
  const open=ease(4.8,9.6,u)*(1-ease(16,22,u));
  actor(H,R,8.17,4.95,u,'read',{shirt:['teal',.6],face:'sw',prop:(HH,RR,pts)=>{
    const x=pts.nearHand[0],y=pts.nearHand[1]-7;
    shape(HH,RR,[[x-12,y],[x,y+3],[x,y+14],[x-12,y+10]],'paper',1,.6);
    shape(HH,RR,[[x,y+3],[x+2+open*13,y-open*3],[x+2+open*13,y+10],[x,y+14]],'paper',1,.6);
    HH.line(RR,[[x,y+3],[x,y+14]],'coral',1.2);
    bird(HH,RR,x-7,y+6,.4);
    if(open>.1)bird(HH,RR,x+7,y+5,.4);
  }},.64-FIGURES.seatZ('child',1.6),1.6,'child');
  const p=H.p(10.3,.56,2.8),sway=Math.sin(u*TAU/24)*3;
  shape(H,R,[[p[0]-10,p[1]],[p[0]+10,p[1]],[p[0]+10+sway,p[1]+36],[p[0]-11+sway,p[1]+34]],'paper',1,.7);
  for(const a of [26,30])H.line(R,[[p[0]-9+sway,p[1]+a],[p[0]+9+sway,p[1]+a+1]],'teal',1);
});
room.loopSeconds=24;
room.stillTime=11.5;
export default room;
