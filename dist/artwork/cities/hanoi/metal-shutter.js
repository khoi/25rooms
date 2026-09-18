import { world, shape, oval, stroke, wallPt, bottle, ell } from '../../worlds/common.js';
import { surface, timber, metal, bentTube, benchFrame, drape, vessel } from '../materials.js';
import { masonry, archedBay } from '../structure.js';
import { windowBay, hangingRail, taskLight, floorShadow, wallRack, recessedFrame } from '../joinery.js';

const ease = (a, b, t) => { const q = Math.max(0, Math.min(1, (t - a) / (b - a))); return q * q * (3 - 2 * q); };
function person(H, R, i, j, hands, ink = 'teal', lean = 0) {
  const [x, y] = H.p(i, j), s = 1.25, Q = (a, b) => [x + a * s, y + b * s], cx = lean;
  H.tint(H.tile(i - .22, j - .12, .7, .52, .015), 'blue', .16);
  for (const side of [-1, 1]) { stroke(H, R, [Q(side * 5, -25), Q(side * 6, -11), Q(side * 7, -1)], 'blue', 8.5); oval(H, R, ...Q(side * 7 + 2, 0), 7, 3, 'blue', .85); }
  shape(H, R, [Q(cx - 10, -52), Q(cx + 10, -51), Q(9, -24), Q(-9, -24)], ink, .7);
  shape(H, R, [Q(cx - 5, -47), Q(cx + 6, -47), Q(7, -24), Q(-6, -24)], 'paper', .9);
  H.line(R, [Q(-4, -31), Q(5, -31)], 'blue', .8);
  H.line(R, [Q(-5, -27), Q(6, -27)], ink, 1.1);
  oval(H, R, ...Q(cx + 1, -61), 9, 10, 'coral', .3);
  shape(H, R, [Q(cx - 7, -62), Q(cx - 6, -69), Q(cx + 3, -71), Q(cx + 9, -65), Q(cx + 3, -66)], 'blue', .85);
  H.dot(...Q(cx + 5, -60), 1, 'blue');
  for (const [n, target] of hands.entries()) { const side = n ? 1 : -1, sh = Q(cx + side * 9, -49), elbow = [sh[0] + (target[0] - sh[0]) * .5 + side * 4, Math.max(sh[1], target[1]) + 7]; stroke(H, R, [sh, elbow, target], 'blue', 7.2); stroke(H, R, [sh, elbow, target], ink, 5.5); oval(H, R, ...target, 3, 2.8, 'coral', .3); }
}
function tool(H, R, i, j, z, length, ink = 'blue') { bentTube(H, R, [[i, j, z], [i + length, j, z]], 1.8, ink); oval(H, R, ...H.p(i, j, z), 4, 2.5, 'sun', .7); }
const room = world('hanoi-metal-shutter', 'A hinge that moves again', { floor: 'paper', wall: 'paper', wallTone: .83, height: 4.15, head: 38, tone: .52 }, (H, R) => {
  for (let j = 0; j < 12; j += 1.6) for (let i = 0; i < 12; i += 2.4) { surface(H, R, H.tile(i + .03, j + .03, 2.32, 1.52, .012), 'paper', .7, .45); if ((i + j) % 4 < 1) H.line(R, [H.p(i + .3, j + .1), H.p(i + .58, j + .48), H.p(i + .9, j + .52)], 'blue', .5, { tone: .32 }); }
  masonry(H, R, 'nw', .1, 1.1, 0, 4.2, 'paper', .86);
  masonry(H, R, 'nw', 8.4, 3.5, 0, 4.2, 'paper', .86);
  archedBay(H, R, 'nw', 1.2, 7.2, .2, 3.35, 'blue', P => { shape(H, R, [P(.1, .1), P(7.1, .1), P(7.1, 3.2), P(.1, 3.2)], 'sun', .18); shape(H, R, [P(.1, .1), P(2.5, .1), P(2.1, 2.7), P(.1, 2.9)], 'teal', .35); });
  timber(H, R, .08, 1.16, .42, 7.3, .02, .14, 'blue');
  timber(H, R, .18, 1.3, .51, 6.98, .16, .07, 'paper');
  for (const j of [1.29, 8.15]) { metal(H, R, .12, j, .36, .14, .2, 3.14, 'teal'); for (const z of [.48, 1.8, 3.1]) H.dot(...H.p(.5, j + .08, z), 1.6, 'sun'); }
  recessedFrame(H, R, 'nw', 8.8, 2.63, 1.42, 2.15, 'teal', P => {
    for (const z of [.18, 1.14]) { H.line(R, [P(.12, z), P(2.5, z)], 'sun', 4); for (let k = 0; k < 3; k++) { const u = .32 + k * .73; surface(H, R, [P(u, z+.05),P(u+.51,z+.05),P(u+.51,z+.58),P(u,z+.58)], k === 1 ? 'coral' : 'paper', .65); H.line(R,[P(u+.13,z+.35),P(u+.38,z+.35)],'blue',2); } }
    H.line(R,[P(1.3,.18),P(1.3,1.05)],'teal',3);
    H.line(R,[P(.32,1.85),P(.82,1.85)],'paper',2);
  });
  hangingRail(H,R,'nw',9.02,2.17,1.24,3,(P,u,n)=>{ H.line(R,[P(u,-.14),P(u,-.48)],'blue',3); if(n===1) { H.line(R,[P(u-.16,-.25),P(u+.16,-.25)],'sun',4); H.line(R,[P(u-.13,-.5),P(u+.13,-.5)],'sun',3); } else stroke(H,R,[P(u-.1,-.15),P(u+.1,-.31),P(u-.1,-.52)],'coral',2.5); });
  H.tint([H.p(.6, 2.3, .02), H.p(.6, 6.7, .02), H.p(7.5, 8.6, .02), H.p(5, 4.6, .02)], 'sun', .25);
  windowBay(H, R, 'ne', 1.1, 3.3, 2.8, .85, { divisions: 5 });
  for (let i = 1.25; i < 4.3; i += .4) H.line(R, [wallPt(H, 'ne', i, 2.94, -.3), wallPt(H, 'ne', i + .2, 3.42, -.3)], 'blue', 1.1);
  wallRack(H,R,'ne',1.35,5.38,1.62,1.03,1,'teal',(P,z)=>{
    for(let k=0;k<6;k++){ const u=.35+k*.8; H.line(R,[P(u,z+.07),P(u,z+.54)],'blue',2.5); if(k%2) {H.line(R,[P(u-.12,z+.53),P(u+.14,z+.53)],'sun',3);H.line(R,[P(u+.02,z+.12),P(u+.12,z+.29)],'paper',1);}else{stroke(H,R,[P(u-.14,z+.57),P(u-.14,z+.36),P(u+.14,z+.36),P(u+.14,z+.57)],'paper',2);H.line(R,[P(u,z+.1),P(u,z+.33)],'coral',3);} }
  });
  for(const i of [1.25,6.38]) timber(H,R,i,.48,.17,1.14,.08,1.14,'teal');
  timber(H,R,1.2,.43,5.46,1.33,1.2,.15,'sun');
  surface(H,R,H.faceI(1.39,1.59,4.79,.18,1.15),'blue',.65);
  for(const [i,w] of [[1.45,1.31],[2.85,1.36],[4.31,1.82]])for(const z of [.28,.69]){metal(H,R,i,1.43,w,.23,z,.34,'teal');bentTube(H,R,[[i+w*.3,1.72,z+.19],[i+w*.7,1.72,z+.19]],1.7,'sun');}
  metal(H,R,1.57,.78,1.18,.7,1.36,.1,'blue');
  bentTube(H,R,[[1.84,1.02,1.47],[1.84,1.02,2.34],[2.4,1.02,2.34],[2.4,1.02,1.9]],4,'teal');
  metal(H,R,2.27,.91,.27,.32,1.99,.4,'coral');
  bentTube(H,R,[[2.4,1.06,1.99],[2.4,1.06,1.55]],1.6,'blue');
  const [gx,gy]=H.p(2.4,1.06,1.91);surface(H,R,[[gx-8,gy-2],[gx+8,gy-2],[gx+10,gy+17],[gx-10,gy+17]],'paper',.38);H.line(R,[[gx-8,gy],[gx-7,gy+14]],'paper',1.2);
  surface(H,R,H.tile(3.04,.8,1.09,.68,1.37),'paper',1);for(let k=0;k<3;k++)tool(H,R,3.13,.91+k*.17,1.4,.7,['sun','blue','coral'][k]);
  vessel(H,R,5.65,1.02,1.38,8,12,'teal',true);H.line(R,[H.p(5.66,1.03,1.66),H.p(5.53,1.01,1.97)],'blue',2);
  bentTube(H, R, [[5.1, .12, 4], [9.9, .12, 4], [9.9, .12, 3.25]], 2.1, 'blue');
  metal(H, R, 9.7, .08, .45, .3, 3.3, .55, 'teal');
  for (const i of [6, 7.5, 9]) metal(H, R, i, .12, .12, .16, 3.91, .2, 'sun');
  floorShadow(H, 7.55, .7, 3.65, 2.3, .19);
  for (const i of [7.55, 9.2, 11.2]) { metal(H, R, i, .45, .14, 2, .05, .12, 'blue'); metal(H, R, i, .5, .13, .14, .1, 3.7, 'teal'); metal(H, R, i, 2.26, .13, .14, .1, 3.7, 'teal'); bentTube(H, R, [[i, .53, 3.3], [i, 2.3, .25]], 1.4, 'blue'); }
  for (const z of [.25, 1.42, 3.58]) metal(H, R, 7.48, .42, 3.86, 2.04, z, .09, 'teal');
  for (let k = 0; k < 6; k++) { const i = 7.82 + k * .51, h = 1.55 + (k % 3) * .35; surface(H, R, [H.p(i, .78, 1.54), H.p(i + .33, .78, 1.54), H.p(i + .38, 1.13, 1.54 + h), H.p(i, 1.13, 1.54 + h)], k % 3 ? 'blue' : 'paper', k % 3 ? .34 : 1); H.line(R, [H.p(i, 1.13, 1.54 + h), H.p(i + .38, 1.13, 1.54 + h)], 'sun', 2); }
  metal(H, R, 7.74, 1.03, 1.33, 1.36, .48, .34, 'blue');
  metal(H, R, 7.96, 2.35, .9, .11, .56, .11, 'sun');
  surface(H, R, [H.p(9.5, .72, .45), H.p(10.9, .72, .45), H.p(10.75, 1.8, 1.12), H.p(9.55, 1.8, 1.12)], 'paper', .74);
  for (let k = 0; k < 8; k++) H.line(R, [H.p(9.55 + k * .16, .75, .47), H.p(9.57 + k * .14, 1.76, 1.1)], 'blue', .6);
  hangingRail(H, R, 'ne', 5, 1.8, 2.85, 3, (P, u, n) => { stroke(H, R, [P(u, -.12), P(u - .07, -.62), P(u + .12, -.9)], 'blue', 2.1); if (n !== 1) H.line(R, [P(u + .08, -.4), P(u + .21, -.87)], 'blue', 1.5); });
  benchFrame(H, R, 2.15, 3.78, 5.05, 2.5, 1.18, 'sun');
  surface(H,R,H.faceI(3.53,6.07,2.43,.43,.99),'blue',.59);
  timber(H,R,3.58,5.92,1.17,.48,.62,.31,'teal');
  timber(H,R,4.87,5.92,1.04,.9,.43,.15,'sun');
  surface(H,R,H.tile(4.97,6.02,.84,.67,.59),'blue',.58);
  for(const i of [5.05,5.4]){tool(H,R,i,6.14,.61,.28,'paper');metal(H,R,i,6.49,.18,.14,.61,.07,'sun');}
  timber(H,R,4.87,6.75,1.04,.1,.43,.24,'teal');
  for(const [i,z]of [[4.15,.78],[5.39,.55]])bentTube(H,R,[[i-.15,6.4+(i>5?.5:0),z],[i+.15,6.4+(i>5?.5:0),z]],1.8,'sun');
  metal(H,R,2.2,3.84,.12,2.26,1.19,.06,'blue');
  for(const j of [4.1,5.03,6])H.dot(...H.p(2.24,j,1.27),1.4,'sun');
  timber(H, R, 2.4, 4.03, 4.52, .38, .42, .13, 'sun');
  for (const i of [2.45, 6.57]) bentTube(H, R, [[i, 4.0, .5], [i + .3, 5.6, .93]], 3, 'blue');
  metal(H, R, 2.6, 5.71, .8, .58, 1.19, .1, 'blue');
  for (const j of [5.68, 6.21]) { metal(H, R, 2.88, j, .45, .11, 1.28, .45, 'blue'); metal(H, R, 3.05, j, .18, .11, 1.56, .07, 'coral'); }
  bentTube(H, R, [[2.68, 6.26, 1.45], [3.4, 6.26, 1.45]], 2.4, 'blue');
  metal(H, R, 6.63, 4.8, .26, .35, 1.18, .3, 'blue');
  drape(H, R, 6.27, 3.94, .6, .58, 1.2, .32, 'paper');
  metal(H, R, 3.04, 5.95, .14, .14, 1.3, 2.41, 'blue');
  bentTube(H, R, [[5.84, 6.13, 1.2], [5.84, 6.86, 1.2], [5.7, 6.86, 1.62]], 2.8, 'blue');
  metal(H, R, 5.57, 6.78, .25, .17, 1.59, .13, 'coral');
  tool(H, R, 4.25, 5.73, 1.25, .8); tool(H, R, 5.45, 5.67, 1.25, .47, 'teal');
  surface(H, R, H.tile(4.4, 4.05, 1.02, .53, 1.2), 'blue', .34);
  for (let n = 0; n < 5; n++) metal(H, R, 4.52 + n * .13, 4.13, .055, .29, 1.23, .055, n === 3 ? 'sun' : 'paper');
  bottle(H, R, ...H.p(6.62, 4.14, 1.23), 'teal', .6);
  taskLight(H, R, 2.3, 3.86, 1.2, 'coral', 1.1);
  benchFrame(H, R, 1.2, 8.7, 2.8, 1.1, .67, 'teal');
  surface(H, R, [H.p(1.47, 8.91, .69), H.p(2.82, 8.91, .69), H.p(2.82, 9.52, .69), H.p(2.58, 9.52, .69), H.p(2.58, 9.08, .69), H.p(1.47, 9.08, .69)], 'paper', 1);
  for (const i of [1.6, 1.86, 2.12, 2.38]) H.line(R, [H.p(i, 8.91, .7), H.p(i, 9.01, .7)], 'blue', .6);
  bentTube(H, R, [[3.07, 9.41, .69], [3.22, 8.98, .73], [3.53, 9.37, .69]], 1.3, 'blue');
  floorShadow(H,1.16,10.3,1.21,1.15,.2);
  vessel(H,R,1.81,10.81,.03,19,31,'teal',true);
  for(const [i,j,z]of [[1.58,10.79,.8],[1.92,10.64,.94],[2.05,10.86,.73]])surface(H,R,[H.p(i,j,.48),H.p(i+.18,j,.5),H.p(i+.09,j+.04,z),H.p(i-.08,j+.04,z+.12)],'paper',.85);
  H.line(R,[H.p(1.53,10.89,.7),H.p(1.33,10.93,1.2)],'coral',3);
  timber(H,R,4.55,9.76,2.56,1.1,.08,.13,'sun');
  for(const j of [9.77,10.76])timber(H,R,4.56,j,2.55,.1,.2,.37,'teal');
  for(const i of [4.56,7])timber(H,R,i,9.78,.1,1.02,.2,.37,'teal');
  surface(H,R,H.tile(4.71,9.89,2.22,.76,.24),'blue',.63);
  for(const i of [5.27,6.12])timber(H,R,i,9.85,.09,.89,.23,.3,'sun');
  for(const [i,j]of [[4.95,10.24],[5.63,10.24],[6.54,10.26]]){const [x,y]=H.p(i,j,.35);oval(H,R,x,y,9,4,'sun',.64);oval(H,R,x,y,5,2,'blue',.74);}
  surface(H,R,[H.p(4.56,9.75,.58),H.p(7.11,9.75,.58),H.p(7.11,9.37,1.21),H.p(4.56,9.37,1.21)],'teal',.5);
  H.line(R,[H.p(4.76,9.4,1.14),H.p(6.87,9.4,1.14)],'paper',1.6);
  metal(H, R, 9.4, 7.35, 1.45, 1.4, .02, .13, 'teal');
  for (const i of [9.52, 10.53]) for (const j of [7.47, 8.48]) timber(H, R, i, j, .22, .2, .15, .18, 'paper');
  bentTube(H, R, [[9.6, 7.48, .35], [9.6, 7.48, 1.25], [10.65, 7.48, 1.25], [10.65, 7.48, .35]], 2.8, 'blue');
  surface(H, R, H.tile(9.81, 7.8, .6, .47, .17), 'paper', 1);
  for(const i of [9.57,10.73])bentTube(H,R,[[i,7.42,.32],[i,7.05,1.68],[i,7.05,1.88]],3,'teal');
  for(const z of [.82,1.55])metal(H,R,9.52,7.05,1.33,.14,z,.11,'blue');
  for(const i of [9.68,10.56])drape(H,R,i,7.06,.28,.29,1.68,.31,'paper');
  surface(H,R,[H.p(9.69,7.05,.89),H.p(10.55,7.05,.89),H.p(10.55,7.05,1.4),H.p(9.69,7.05,1.4)],'paper',.9);
  H.line(R,[H.p(9.78,7.03,1.02),H.p(10.25,7.03,1.31),H.p(10.4,7.03,1.16)],'blue',.8);
  H.line(R, [H.p(9.9, 7.89, .18), H.p(10.22, 8.1, .18), H.p(10.3, 7.91, .18)], 'teal', 1);
}, (H, R, t) => {
  const u = ((t % 22) + 22) % 22, q = ease(4.4, 8.8, u) * (1 - ease(13.2, 20, u)), a = .3 * q;
  const P = (s, z, offset = 0) => H.p(3.13 + s * Math.cos(a), 6.04 + s * Math.sin(a) + offset, z);
  surface(H, R, [P(0, 1.3), P(2.65, 1.3), P(2.65, 3.63), P(0, 3.63)], 'blue', .46);
  surface(H,R,[P(.2,1.51),P(2.45,1.51),P(2.45,3.4),P(.2,3.4)],'teal',.39);
  for(const z of [1.63,2.34]){surface(H,R,[P(.34,z),P(2.29,z),P(2.29,z+.61),P(.34,z+.61)],'blue',.49);H.line(R,[P(.37,z+.03),P(2.23,z+.03),P(2.23,z+.57)],'paper',1.1);H.line(R,[P(.4,z+.52),P(2.22,z+.52)],'teal',3);}
  surface(H,R,[P(2.63,1.3),P(2.71,1.36,.04),P(2.71,3.67,.04),P(2.63,3.63)],'paper',.76);
  for(const z of [1.7,2.56,3.3]){H.line(R,[P(.05,z),P(.43,z)],'sun',3);H.dot(...P(.33,z),1.8,'paper');}
  surface(H,R,[P(1.99,1.67),P(2.45,1.67),P(2.45,2.09),P(1.99,2.09)],'blue',.8);
  H.line(R,[P(2.14,1.97),P(2.37,1.97)],'sun',1.3);
  for (const z of [1.4, 3.52]) H.line(R, [P(.08, z), P(2.58, z)], 'paper', 2.2);
  for (const s of [.11, 2.53]) H.line(R, [P(s, 1.43), P(s, 3.49)], 'blue', 3);
  H.line(R, [P(.2, 1.5), P(2.46, 3.4)], 'sun', 5);
  H.line(R, [P(.2, 1.5), P(2.46, 3.4)], 'blue', 1);
  for (const z of [1.65, 2.55, 3.22]) { metal(H, R, 3.01, 5.91, .25, .26, z, .22, 'sun'); H.line(R, [H.p(3.12, 6.02, z - .06), H.p(3.12, 6.02, z + .3)], 'paper', 1.4); }
  for (const s of [.27, 2.35]) for (const z of [1.63, 3.31]) H.dot(...P(s, z), 1.8, 'sun');
  H.line(R, [P(2.14, 1.83), P(2.74, 1.83)], 'blue', 5);
  H.line(R, [P(2.14, 1.84), P(2.74, 1.84)], 'paper', 1.1);
  person(H, R, 5.91 - .08 * q, 6.8 + .75 * q, [P(2.43, 1.86), P(2.63, 1.87)], 'teal', -3);
  const point = ease(8.8, 10.6, u) * (1 - ease(12.8, 15.6, u));
  person(H, R, 3.1, 6.85, [H.p(3.25, 6.31, 1.35), H.p(3.08, 6.05 - .06 * point, 1.79)], 'coral', -3);
  const [x, y] = H.p(10.35, 1.75, 2.52);
  stroke(H, R, [[x - 11, y - 15], [x + 12, y - 4 + Math.sin(u * Math.PI / 11) * .8], [x + 10, y + 14], [x - 12, y + 6], [x - 11, y - 15]], 'blue', .7);
  for (let n = 0; n < 5; n++) H.line(R, [[x - 10 + n * 5, y - 13], [x - 11 + n * 5, y + 7]], 'blue', .5);
});
room.loopSeconds = 22;
room.stillTime = 10.5;
export default room;
