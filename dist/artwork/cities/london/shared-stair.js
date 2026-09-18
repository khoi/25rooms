import { world, shape, stroke, oval, ell, cycle, TAU, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, benchFrame, drape, vessel, cushion } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, recessedFrame, wallCourse, hangingRail, floorShadow, radiator, taskLight } from '../joinery.js';

const smooth = v => { const a = Math.max(0, Math.min(1, v)); return a * a * (3 - 2 * a); };
const rest = FIGURES.clips.idle.keys[0][1];
for (const name of ['londonStairParent', 'londonStairNeighbour']) FIGURES.clips[name] = { dur: 16, keys: [[0, { ...rest }], [1, { ...rest }]] };
function neighbour(H, R, i, j, name, target, color, lower = 0) {
  const [x, y] = H.p(i, j), scale = name === 'londonStairParent' ? 2.2 : 1.8;
  const q = { ...rest, head: 12, lean: lower, al: 16, el: 60 }, lean = lower * Math.PI / 180;
  const shoulderX = -Math.sin(lean) * 15 + 5.2 * Math.cos(lean) - 1.5 * Math.sin(lean), shoulderY = -19 - Math.cos(lean) * 15 + 5.2 * Math.sin(lean) + 1.5 * Math.cos(lean);
  const dx = (target[0] - x) / scale - shoulderX, dy = (target[1] - y) / scale - shoulderY, a = 4.368, b = 4.2;
  const l = Math.min(a + b - .001, Math.max(.2, Math.hypot(dx, dy))), e = Math.acos((l * l - a * a - b * b) / (2 * a * b));
  q.ar = (Math.atan2(dx, dy) - Math.atan2(b * Math.sin(e), a + b * Math.cos(e))) * 180 / Math.PI; q.er = e * 180 / Math.PI;
  FIGURES.clips[name].keys = [[0, q], [1, q]];
  FIGURES.draw(H, R, { who: 'adult', x, y, scale, clip: name, phase: 0, face: 'se', ground: [x, y], opts: { shirt: [color, .7], hairStyle: name === 'londonStairParent' ? 'pony' : 'short' } });
}
function coat(H, R, x, y, ink, sway = 0) {
  shape(H, R, [[x - 4, y], [x + 5, y], [x + 15, y + 12], [x + 9, y + 17], [x + 10 + sway, y + 40], [x - 12 + sway, y + 40], [x - 10, y + 16], [x - 16, y + 12]], ink, .57, .8);
  H.line(R, [[x, y + 2], [x + 1, y + 37]], 'paper', .85);
  H.line(R, [[x - 7 + sway, y + 26], [x - 3 + sway, y + 29]], 'blue', 1.2);
}
const room = world('london-shared-stair', 'A buggy clears the turn', { height: 4.1, wall: 'paper', wallTone: .8, floor: 'paper', pattern: 'tiles', accent: 'teal', head: 75 }, (H, R) => {
  wallCourse(H, R, 'nw', .1, 11.9, 1.0, 'teal');
  wallCourse(H, R, 'ne', .1, 11.9, 1.0, 'teal');
  for (const side of ['nw','ne']) {
    H.line(R,[wallPt(H,side,.06,3.96,-.15),wallPt(H,side,11.92,3.96,-.15)],'teal',4);
    H.line(R,[wallPt(H,side,.06,4.02,-.15),wallPt(H,side,11.92,4.02,-.15)],'sun',1.1);
  }
  for (const [u,z,w,h,ink] of [[3.4,2.45,1.55,1.05,'coral'],[6.0,1.94,1.4,1.25,'sun'],[8.2,1.54,1.65,1.06,'teal']]) {
    recessedFrame(H,R,'nw',u,w,z,h,ink,P=>{
      surface(H,R,[P(.12,.12),P(w-.12,.12),P(w-.12,h-.12),P(.12,h-.12)],'paper',1,.5);
      const [x,y]=P(w*.48,h*.57);
      oval(H,R,x,y,7,8,'sun',.6);
      surface(H,R,[[x-10,y+8],[x+9,y+8],[x+14,y+22],[x-13,y+22]],ink,.55,.6);
      H.line(R,[P(.19,.2),P(w-.18,.2)],'teal',1.1);
    });
  }
  const lamp=wallPt(H,'nw',10.56,2.26,-.25);
  H.line(R,[lamp,[lamp[0]+14,lamp[1]+7]],'blue',2.4);
  shape(H,R,[[lamp[0]+5,lamp[1]+2],[lamp[0]+24,lamp[1]+10],[lamp[0]+20,lamp[1]-4],[lamp[0]+12,lamp[1]-7]],'coral',.7,.8);
  H.glow(lamp[0]+16,lamp[1]+18,28,26,'sun',.25);
  windowBay(H, R, 'ne' , 4.65, 2.55, 1.65, 2.06, { ink: 'teal', divisions: 2, view: Q => { surface(H, R, [Q(.14, .16), Q(2.4, .16), Q(2.4, .65), Q(1.1, 1.2), Q(.14, .8)], 'teal', .25, .4); } });
  radiator(H,R,'ne',4.78,2.08,.95);
  for(let n=0;n<6;n++) { const [x,y]=H.p(5.0+n*.35,.39,3.68); H.line(R,[[x,y],[x,y+14]],'sun',1.3); }
  H.line(R,[H.p(7.31,.21,3.69),H.p(7.31,.21,1.47)],'blue',.8);
  oval(H,R,...H.p(7.31,.21,1.4),2.5,4,'sun',.8);
  const doorway = recessedFrame(H, R, 'ne', .6, 3.1, .05, 3.8, 'teal', P => {
    surface(H, R, [P(.17, .13), P(2.93, .13), P(2.93, 3.62), P(.17, 3.62)], 'sun', .24, .7);
    for (const [a, b] of [[.36, 1.37], [1.7, 2.72]]) for (const [c, d] of [[.3, 1.12], [1.31, 3.3]]) { surface(H, R, [P(a, c), P(b, c), P(b, d), P(a, d)], c > 1 ? 'paper' : 'teal', c > 1 ? .95 : .23, .6); if (c > 1) H.line(R, [P(a + .12, c + .15), P(b - .15, d - .15)], 'teal', 1.3); }
  });
  H.line(R, [doorway(2.67, 1.54), doorway(2.37, 1.54)], 'blue', 2.6);
  H.line(R, [doorway(2.31, 3.42), doorway(1.77, 3.59), doorway(1.33, 3.43)], 'blue', 2);
  floorShadow(H, .85, 2.55, 3.5, 7.45, .2);
  for (let n = 7; n >= 0; n--) {
    const j = 9.7 - n * .82, z = .23 + n * .28;
    timber(H, R, .7, j, 3.2, .85, 0, z, 'sun');
    H.line(R, [H.p(.74, j + .81, z + .013), H.p(3.84, j + .81, z + .013)], 'paper', 2);
    surface(H,R,H.tile(1.53,j+.02,1.53,.78,z+.02),'coral',.35,.6);
    H.line(R,[H.p(1.67,j+.03,z+.025),H.p(1.67,j+.78,z+.025)],'paper',.9);
    H.line(R,[H.p(2.91,j+.03,z+.025),H.p(2.91,j+.78,z+.025)],'paper',.9);
    H.line(R,[H.p(1.45,j+.73,z+.04),H.p(3.13,j+.73,z+.04)],'sun',2.1);
    for (const a of [.95, 3.55]) H.dot(...H.p(a, j + .68, z + .014), 1.2, 'blue');
  }
  surface(H, R, [H.p(3.94, 10.48, .1), H.p(3.94, 3.68, 2.15), H.p(3.94, 3.68, 2.46), H.p(3.94, 10.48, .42)], 'teal', .56, 1.1);
  const under = (u,z) => H.p(3.966,u,z);
  surface(H,R,[under(4.05,.16),under(8.24,.16),under(8.24,.69),under(4.05,1.98)],'blue',.69,.8);
  for(const [j,h] of [[4.0,1.96],[5.95,1.36],[8.2,.65]]) timber(H,R,3.95,j,.13,.13,.13,h,'teal');
  timber(H,R,3.94,4.04,.15,4.23,.1,.13,'sun');
  H.line(R,[under(4.11,.8),under(5.83,.8)],'sun',4);
  for(let n=0;n<3;n++) {
    surface(H,R,[under(4.24,.87+n*.18),under(5.66,.87+n*.18),under(5.6,1.02+n*.18),under(4.28,1.02+n*.18)],n%2?'coral':'paper',.78,.6);
    H.line(R,[under(4.42,.93+n*.18),under(5.48,.93+n*.18)],'teal',.6);
  }
  const trolley=under(6.88,.23);
  oval(H,R,trolley[0]-14,trolley[1]+3,5,5,'blue',.8);
  oval(H,R,trolley[0]+14,trolley[1]-10,5,5,'blue',.8);
  shape(H,R,[[trolley[0]-15,trolley[1]-4],[trolley[0]+15,trolley[1]-18],[trolley[0]+14,trolley[1]-44],[trolley[0]-14,trolley[1]-29]],'coral',.55,.7);
  H.line(R,[[trolley[0]-14,trolley[1]-29],[trolley[0]-14,trolley[1]-43],[trolley[0]+12,trolley[1]-55],[trolley[0]+14,trolley[1]-44]],'sun',2);
  timber(H, R, .72, .9, 3.2, 2.75, 2.16, .23, 'sun');
  for (let n = 0; n <= 8; n++) {
    const j = 10.42 - n * .82, z = .28 + n * .28;
    timber(H, R, 3.72, j, .12, .12, z, .97, 'teal');
    H.line(R, [H.p(3.84, j + .06, z + .16), H.p(3.84, j + .06, z + .81)], 'paper', .7);
  }
  bentTube(H, R, [[3.79, 10.65, 1.25], [3.79, 10.42, 1.32], [3.79, 3.86, 3.56], [3.79, 1.2, 3.56]], 5, 'sun');
  for(const [j,z] of [[10.46,.32],[3.81,2.47]]) {
    timber(H,R,3.65,j,.27,.26,z,1.06,'teal');
    oval(H,R,...H.p(3.785,j+.13,z+1.12),6,5,'sun',.8);
    for(const h of [z+.13,z+.91]) metal(H,R,3.61,j-.025,.35,.31,h,.07,'sun');
  }
  metal(H, R, 3.64, 6.1, .29, .48, 2.73, .11, 'teal');
  for (let n = 0; n < 6; n++) H.line(R, [H.p(.87 + n * .5, 10.55, .31), H.p(.87 + n * .5, 10.55, 1.18)], 'teal', 2.8);
  bentTube(H, R, [[.8, 10.55, .35], [.8, 10.55, 1.23], [3.66, 10.55, 1.23], [3.66, 10.55, .35]], 3, 'teal');
  for (const z of [.45, 1.05]) metal(H, R, .69, 10.47, .22, .16, z, .12, 'blue');
  cushion(H, R, 3.49, 10.42, .24, .28, .9, .12, 'coral');
  cabinetFrame(H, R, 8.06, .25, 3.5, 1.05, .08, 3.65, 3, 'teal', (i, j, w, d, z, h, n) => {
    if (n === 0) for (let row = 0; row < 6; row++) { const zz = z + row * .51; timber(H, R, i, j, w, d, zz, .055, 'sun'); for (let k = 0; k < 2; k++) surface(H, R, H.faceI(i + .09 + k * .15, j + .65, w - .23, zz + .06, zz + .3 + k * .06), k ? 'paper' : 'coral', k ? 1 : .4, .5); }
    if (n === 1) { for (const zz of [.34, .86, 1.45]) timber(H, R, i, j, w, d, zz, .07, 'sun'); for (const zz of [.45, .98]) for (const a of [.1, .52]) { const [x, y] = H.p(i + a, j + .55, zz); shape(H, R, [[x - 7, y], [x + 9, y], [x + 7, y - 8], [x - 4, y - 10]], 'blue', .65, .7); } const [x, y] = H.p(i + .5, j + .3, 3.1); coat(H, R, x, y, 'coral'); }
    if (n === 2) { surface(H, R, H.faceI(i + .09, j + .73, w - .15, .35, 2.45), 'teal', .37, .8); H.line(R, [H.p(i + .76, j + .75, 1.22), H.p(i + .76, j + .75, 1.53)], 'blue', 2); for (let k = 0; k < 5; k++) H.line(R, [H.p(i + .24, j + .76, .59 + k * .1), H.p(i + .66, j + .76, .59 + k * .1)], 'blue', .7); timber(H, R, i, j, w, d, 2.55, .08, 'sun'); oval(H, R, ...H.p(i + .5, j + .3, 2.83), 9, 11, 'sun', .72); }
  });
  const mirror=recessedFrame(H,R,'ne',7.43,.5,1.68,1.76,'sun',P=>{
    surface(H,R,[P(.08,.08),P(.42,.08),P(.42,1.68),P(.08,1.68)],'paper',.95,.6);
    H.line(R,[P(.12,.3),P(.37,1.39)],'teal',1.2);
  });
  for(const z of [1.18,1.58]) H.dot(...H.p(11.72,.32,z),2.2,'sun',.9);
  bentTube(H,R,[[11.7,.25,.24],[11.7,.25,3.86],[9.95,.25,3.86]],1.7,'teal');
  metal(H,R,11.46,.19,.31,.22,1.57,.33,'paper');
  benchFrame(H, R, 8.15, 1.6, 3.2, .9, .64, 'sun');
  cushion(H, R, 8.27, 1.7, 1.4, .64, .66, .12, 'coral');
  const [gx, gy] = H.p(10.45, 2.1, .71); shape(H, R, [[gx - 6, gy], [gx + 5, gy], [gx + 6, gy - 7], [gx + 9, gy - 9], [gx + 6, gy - 12], [gx + 3, gy - 7], [gx - 5, gy - 10]], 'teal', .68, .7);
  vessel(H,R,11.33,2.94,.05,14,29,'teal');
  for(let n=0;n<3;n++) {
    const [x,y]=H.p(11.2+n*.15,2.9,.82);
    H.line(R,[[x,y],[x-2+n*2,y-39]],n===1?'coral':'blue',2.4);
    stroke(H,R,[[x-2+n*2,y-39],[x-5,y-46],[x-10,y-41]],'sun',2.2);
  }
  cabinetFrame(H,R,8.4,9.35,2.75,1.35,.07,.85,2,'teal',(i,j,w,d,z,h,n)=>{
    if(n===0) for(let k=0;k<3;k++) drape(H,R,i+.05,j+.13,w-.1,d-.1,.25+k*.16,.08,k%2?'paper':'coral');
    else { vessel(H,R,i+.37,j+.5,.2,11,15,'sun',false); vessel(H,R,i+.85,j+.61,.2,8,12,'teal',false); }
  });
  timber(H,R,8.34,9.3,2.87,1.45,.86,.08,'teal');
  drape(H, R, 8.65, 9.64, .9, .7, .94, .23, 'paper');
  oval(H, R, ...H.p(9.15, 10.0, 1.01), 18, 8, 'coral', .45);
  vessel(H, R, 9.15, 10.0, 1.04, 14, 12, 'blue');
  H.line(R, [H.p(9.43, 10.0, 1.2), H.p(10.0, 10.0, 1.2)], 'blue', 3);
  vessel(H, R, 10.35, 9.72, .98, 7, 11, 'teal', false);
  oval(H, R, ...H.p(10.65, 10.28, .99), 8, 4, 'sun', .7);
  const [kx,ky]=H.p(10.65,10.28,1.01);
  H.outline(R,ell(kx-2,ky,2.5,2),'blue',1.2);
  H.line(R,[[kx,ky],[kx+7,ky+3],[kx+9,ky+1]],'blue',1.2);
  vessel(H,R,8.65,9.61,1.0,5,12,'paper');
  H.line(R,[H.p(8.65,9.61,1.31),H.p(8.62,9.6,1.63)],'teal',1);
  const cutting=H.p(8.62,9.6,1.48);
  shape(H,R,[[cutting[0],cutting[1]],[cutting[0]-8,cutting[1]-5],[cutting[0]-4,cutting[1]+2]],'teal',.6,.5);
  metal(H,R,10.31,4.97,1.14,1.11,.025,.08,'teal');
  timber(H, R, 10.45, 5.1, .85, .82, .02, .14, 'blue');
  for (let n = 0; n < 6; n++) H.line(R, [H.p(10.52, 5.16 + n * .12, .18), H.p(11.22, 5.16 + n * .12, .18)], 'sun', 1.6);
  surface(H, R, H.tile(6.3, 9.45, 1.25, 1.7, .025), 'teal', .32, .8);
  for (let n = 0; n < 7; n++) H.line(R, [H.p(6.4, 9.56 + n * .21, .03), H.p(7.44, 9.56 + n * .21, .03)], 'sun', 1.2);
  floorShadow(H, 5.8, 4.6, 2.7, 2.8, .16);
  for (const [i, j, ink] of [[5.95, 4.93, 'blue'], [7.82, 4.93, 'blue'], [5.95, 6.62, 'blue'], [7.82, 6.62, 'teal']]) { const [x, y] = H.p(i, j, .17); oval(H, R, x, y, 9, 9, ink, .82); oval(H, R, x, y, 3, 3, 'sun', .82); metal(H, R, i - .08, j - .08, .16, .16, .25, .2, 'teal'); }
  for (const i of [6.04, 7.68]) { bentTube(H, R, [[i, 4.94, .37], [i, 6.36, 1.08], [i, 6.65, .35]], 3, 'teal'); bentTube(H, R, [[i, 6.62, .35], [i, 5.18, 1.37]], 3, 'teal'); }
  surface(H, R, [H.p(6.0, 5.25, 1.35), H.p(7.72, 5.25, 1.35), H.p(7.72, 6.26, .69), H.p(6.0, 6.26, .69)], 'coral', .58, .8);
  surface(H, R, H.tile(6.04, 5.75, 1.64, .72, .7), 'coral', .76, .65);
  for (const i of [6.42, 7.16]) H.line(R, [H.p(i, 5.4, 1.25), H.p(i, 6.24, .76)], 'paper', 1.3);
  surface(H, R, [H.p(5.91, 5.23, 1.42), H.p(6.05, 4.95, 1.83), H.p(7.56, 4.95, 1.83), H.p(7.84, 5.24, 1.42)], 'coral', .65, .9);
  H.line(R, [H.p(6.79, 4.97, 1.85), H.p(6.83, 5.23, 1.42)], 'paper', 1.2);
  surface(H, R, H.tile(6.1, 5.23, 1.5, 1.13, .33), 'blue', .4, .6);
  for(const i of [6.12,7.56]) H.line(R,[H.p(i,5.25,.37),H.p(i,6.29,.37)],'paper',.9);
  drape(H,R,6.28,5.6,.72,.59,.39,.16,'sun');
  H.line(R,[H.p(6.72,5.52,1.18),H.p(6.82,6.05,.79),H.p(7.11,5.61,1.13)],'blue',2.4);
  metal(H,R,6.75,6.03,.2,.15,.76,.09,'sun');
  for(const i of [6.07,7.64]) {
    oval(H,R,...H.p(i,5.9,.86),5,4,'paper',1);
    H.dot(...H.p(i,5.9,.86),2,'blue');
  }
  const toy=H.p(6.26,5.02,1.5);
  H.line(R,[[toy[0],toy[1]],[toy[0]-3,toy[1]+15]],'sun',1);
  oval(H,R,toy[0]-3,toy[1]+18,4,5,'teal',.7);
}, (H, R, t) => {
  const u = cycle(t, 16) * 16, a = u < 3.2 ? 0 : u < 6.4 ? smooth((u - 3.2) / 3.2) : u < 9.6 ? 1 : 1 - smooth((u - 9.6) / 4.4), angle = .16 + .95 * a;
  const J = 6.07 + Math.cos(angle) * .9, Z = 1.02 + Math.sin(angle) * .9;
  for (const i of [6.0, 7.72]) bentTube(H, R, [[i, 6.07, 1.02], [i, J, Z]], 3.6, 'teal');
  bentTube(H, R, [[6.0, J, Z], [7.72, J, Z]], 4.5, 'blue');
  for (const i of [6.0, 7.72]) oval(H, R, ...H.p(i, 6.07, 1.02), 4.2, 3.2, 'coral', .85);
  const hand = H.p(7.63, J, Z);
  neighbour(H, R, 8.5, 7.5, 'londonStairParent', hand, 'teal', 20 * (1 - a));
  neighbour(H, R, 6.35, 7.17, 'londonStairNeighbour', H.p(6.03, 6.22, 1.03), 'coral');
  H.dot(...hand, 3, 'coral', .35, { knock: true });
  const [bx, by] = H.p(6.02, 7.23, .78 + .09 * a); shape(H, R, [[bx - 9, by], [bx + 10, by], [bx + 8, by + 21], [bx - 8, by + 21]], 'sun', .54, .8); stroke(H, R, [[bx - 5, by], [bx - 4, by - 10], [bx + 4, by - 10], [bx + 6, by]], 'blue', 1.0);
  const [x, y] = H.p(9.3, .74, 3.29); coat(H, R, x, y, 'coral', Math.sin(TAU * u / 16) * 1.8);
});
room.loopSeconds = 16;
room.stillTime = 8;
export default room;
