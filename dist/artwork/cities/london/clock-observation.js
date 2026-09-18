import { world, shape, stroke, oval, ell, cycle, TAU, actor, starPts } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, benchFrame, drape, cushion, vessel } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { recessedFrame, taskLight, floorShadow } from '../joinery.js';

const smooth = v => { const a = Math.max(0, Math.min(1, v)); return a * a * (3 - 2 * a); };
const rest = FIGURES.clips.idle.keys[0][1];
FIGURES.clips.londonShadowEducator = { dur: 20, keys: [[0, { ...rest }], [1, { ...rest }]] };
FIGURES.clips.londonShadowLearner = { dur: 20, keys: [[0, { ...rest, head: 13, ar: 55, er: 40 }], [.4, { ...rest, head: 13, ar: 55, er: 40 }], [.55, { ...rest, head: 20, ar: 82, er: 29 }], [.65, { ...rest, head: 20, ar: 82, er: 29 }], [.9, { ...rest, head: 13, ar: 55, er: 40 }], [1, { ...rest, head: 13, ar: 55, er: 40 }]] };
function cylinder(H, R, a, b, radius, ink = 'teal') {
  const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy), n = [-dy / l * radius, dx / l * radius];
  surface(H, R, [[a[0] + n[0], a[1] + n[1]], [b[0] + n[0], b[1] + n[1]], [b[0] - n[0], b[1] - n[1]], [a[0] - n[0], a[1] - n[1]]], ink, .67, 1.0);
  H.line(R, [[a[0] + n[0] * .61, a[1] + n[1] * .61], [b[0] + n[0] * .61, b[1] + n[1] * .61]], 'paper', 1.6);
  oval(H, R, ...a, radius * .76, radius, 'blue', .7);
  oval(H, R, ...b, radius * .76, radius, 'teal', .79);
  H.line(R, [[b[0] - radius * .45, b[1]], [b[0] + radius * .45, b[1]]], 'sun', 1.3);
}
function globe(H, R, i, j, z, r) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y, r, r, 'paper', 1);
  H.clip(ell(x, y, r, r), () => {
    shape(H, R, [[x - r, y - r * .5], [x - r * .32, y - r * .77], [x + r * .22, y - r * .37], [x + r * .04, y], [x - r * .37, y + r * .14], [x - r * .44, y + r * .7], [x - r * .7, y + r * .2]], 'teal', .51, .5);
    shape(H, R, [[x + r * .4, y - r * .1], [x + r, y - r * .42], [x + r * .89, y + r * .67], [x + r * .42, y + r * .39]], 'coral', .35, .5);
    for (const rx of [.3, .65]) H.outline(R, ell(x, y, r * rx, r), 'blue', .6, { tone: .4 });
    H.outline(R, ell(x, y, r, r * .32), 'blue', .6, { tone: .5 });
  });
  H.outline(R, ell(x, y, r + 4, r + 4), 'sun', 2.5, { tone: .85 });
  H.line(R, [[x, y + r + 3], [x, y + r + 14]], 'teal', 4);
  H.line(R, [[x - 10, y + r + 15], [x + 11, y + r + 15]], 'blue', 3);
  H.line(R, [[x - 2, y + r + 5], [x + 3, y + r + 10]], 'coral', 2.0);
}
const room = world('london-clock-observation', 'The shadow passes the mark', { wall: false, floor: 'paper', head: 80 }, (H, R) => {
  for (let i = 0; i < 12; i += 1.5) for (let j = 0; j < 12; j += 1.5) surface(H, R, H.tile(i + .03, j + .03, 1.44, 1.44, .03), 'teal', (i + j) % 3 ? .12 : .07, .5);
  for (const side of ['nw', 'ne']) { masonry(H, R, side, 0, 12, 0, 1.12, 'paper', .9); if (side === 'nw') timber(H, R, -.12, 0, .45, 12, 1.1, .16, 'teal'); else timber(H, R, 0, -.12, 12, .45, 1.1, .16, 'teal'); }
  for (const [i, h, ink] of [[1.3, .75, 'blue'], [2.3, 1.1, 'teal'], [4.0, .6, 'coral'], [5.1, .8, 'teal'], [6.3, .5, 'blue']]) { surface(H, R, H.faceI(i, -.08, .9, 1.25, 1.25 + h), ink, .15, .5); H.line(R, [H.p(i - .04, -.08, 1.25 + h), H.p(i + .94, -.08, 1.25 + h)], 'blue', .65); }
  for(let n=0;n<12;n++) {
    H.line(R,[H.p(.01,n+.08,1.28),H.p(.32,n+.08,1.28)],'blue',.75);
    H.line(R,[H.p(n+.08,.01,1.28),H.p(n+.08,.32,1.28)],'blue',.75);
  }
  metal(H,R,.23,10.78,.42,.67,.09,.3,'teal');
  for(let n=0;n<4;n++) H.line(R,[H.p(.26,10.9+n*.14,.4),H.p(.63,10.9+n*.14,.4)],'blue',1.5);
  bentTube(H,R,[[.34,10.88,.31],[.34,11.48,.31],[.34,11.48,.06]],2.7,'teal');
  surface(H,R,H.faceJ(.22,5.7,4.22,.14,2.43),'blue',.7,.8);
  for(const j of [5.63,7.76,9.95]) timber(H,R,.16,j,1.01,.13,.12,2.38,'teal');
  for(const z of [.13,.87,1.61,2.43]) timber(H,R,.13,5.62,1.11,4.5,z,.12,'teal');
  for(let n=0;n<4;n++) {
    const j=5.96+n*.4,[x,y]=H.p(.95,j,1.78);
    shape(H,R,[[x-5,y],[x+5,y],[x+5,y-18],[x-5,y-18]],n%2?'blue':'coral',.65,.6);
    oval(H,R,x,y-18,5,2.6,'paper',.85);
    H.line(R,[[x-5,y-8],[x+5,y-8]],'sun',1.1);
  }
  for(let n=0;n<4;n++) {
    const j=8.04+n*.42;
    surface(H,R,H.faceJ(1.12,j,.33,1.76,2.34-n%2*.09),['paper','sun','coral'][n%3],.8,.6);
    H.line(R,[H.p(1.13,j+.08,1.8),H.p(1.13,j+.08,2.24)],'teal',1.3);
  }
  drape(H,R,.29,5.9,.83,1.56,.94,.15,'coral');
  const compass=H.p(.93,8.71,1.05); oval(H,R,...compass,16,10,'sun',.7); oval(H,R,...compass,12,7,'paper',1); H.line(R,[[compass[0]-9,compass[1]+4],[compass[0]+9,compass[1]-4]],'coral',1.8);
  for(const j of [5.92,8.01]) {
    surface(H,R,H.faceJ(1.23,j,1.79,.28,.71),'sun',.51,.7);
    H.line(R,[H.p(1.25,j+.62,.49),H.p(1.25,j+1.2,.49)],'blue',1.8);
  }
  surface(H,R,[H.p(1.24,9.97,.26),H.p(2.25,10.32,.26),H.p(2.25,10.32,2.3),H.p(1.24,9.97,2.3)],'teal',.46,.8);
  surface(H,R,[H.p(1.37,10.01,.43),H.p(2.09,10.26,.43),H.p(2.09,10.26,2.13),H.p(1.37,10.01,2.13)],'blue',.43,.6);
  const strap=H.p(1.76,10.16,1.7);H.line(R,[[strap[0]-4,strap[1]],[strap[0]+3,strap[1]+18]],'coral',3);
  for(const z of [.44,2.1]) metal(H,R,1.15,9.91,.2,.19,z,.16,'sun');
  timber(H,R,.07,5.54,1.26,4.69,2.55,.12,'sun');
  masonry(H, R, 'ne', 8.2, 3.8, 1.13, 2.2, 'paper', .7);
  recessedFrame(H, R, 'ne', 8.6, 2.45, .08, 2.85, 'teal', P => {
    surface(H, R, [P(.16, .16), P(2.28, .16), P(2.28, 2.68), P(.16, 2.68)], 'teal', .42, .7);
    surface(H, R, [P(.32, 1.4), P(2.13, 1.4), P(2.13, 2.51), P(.32, 2.51)], 'blue', .54, .7);
    H.line(R, [P(.51, 1.58), P(.81, 2.31)], 'paper', 2);
    H.line(R, [P(1.93, 1.12), P(1.63, 1.12)], 'sun', 2.4);
  });
  metal(H, R, 8.3, .02, 3.3, 1.0, 3.06, .13, 'teal');
  bentTube(H, R, [[11.65, .12, .1], [11.65, .12, 3.3], [10.5, .12, 3.3]], 2.2, 'blue');
  taskLight(H, R, 11.2, .47, 2.64, 'coral', .28);
  cabinetFrame(H, R, .25, .35, 4.65, 1.18, .08, 1.54, 3, 'sun', (i, j, w, d, z, h, n) => {
    timber(H, R, i, j, w, d, .78, .09, 'sun');
    if (n === 0) for (let q = 0; q < 3; q++) { const x = i + .22 + q * .4; oval(H, R, ...H.p(x, j + .45, .89), 7, 4, 'blue', .6); oval(H, R, ...H.p(x, j + .45, .96), 4, 3, 'paper', 1); }
    if (n === 1) { surface(H, R, H.tile(i + .1, j + .1, w - .2, d - .2, .9), 'teal', .65, .6); const [x, y] = H.p(i + .6, j + .48, .94); shape(H, R, starPts(x, y, 6, 2.5, 5, -.3), 'paper', 1, .5); }
    if (n === 2) { drape(H, R, i + .1, j + .1, w - .25, d - .18, .89, .4, 'coral'); }
    surface(H, R, H.faceI(i + .07, j + d, w - .14, .2, .65), 'sun', .45, .65); H.line(R, [H.p(i + w * .35, j + d + .01, .42), H.p(i + w * .65, j + d + .01, .42)], 'blue', 1.4);
  });
  for(const i of [.3,4.74]) bentTube(H,R,[[i,.43,1.59],[i,.43,2.94],[i,.13,2.98]],2.1,'teal');
  metal(H,R,.15,.08,4.89,.67,2.94,.09,'teal');
  for(const i of [1.78,2.32]) {
    const [x,y]=H.p(i,.75,1.65);
    oval(H,R,x,y,9,4,'blue',.75); oval(H,R,x,y-5,7,3.5,'paper',1);
  }
  surface(H,R,H.tile(1.62,.84,1.14,.41,1.67),'teal',.7,.6);
  const prism=H.p(2.22,1.09,1.7);
  surface(H,R,[[prism[0]-7,prism[1]+3],[prism[0]+8,prism[1]+5],[prism[0]+1,prism[1]-13]],'paper',.75,.7);
  H.line(R,[[prism[0]+1,prism[1]-13],[prism[0]+3,prism[1]+3]],'coral',1.1);
  globe(H, R, .73, .74, 2.22, 21);
  surface(H, R, H.faceI(3.0, .84, 1.55, 1.64, 2.54), 'paper', 1, .7);
  const [sx, sy] = H.p(3.79, .84, 2.1); shape(H, R, starPts(sx, sy, 20, 6, 5, -.1), 'coral', .7, .8);
  floorShadow(H, 1.5, 2.4, 3.75, 3.4, .13);
  const hub = [3.23, 3.3, 2.37];
  for (const foot of [[1.82, 4.47, .05], [4.5, 4.22, .05], [3.2, 1.97, .05]]) { bentTube(H, R, [foot, hub], 4.3, 'sun'); metal(H, R, foot[0] - .14, foot[1] - .12, .29, .23, .03, .08, 'blue'); }
  surface(H, R, [H.p(2.65, 3.95, .91), H.p(3.8, 3.85, .91), H.p(3.18, 2.85, .91)], 'teal', .62, .75);
  for (const i of [2.9, 3.4]) oval(H, R, ...H.p(i, 3.55, .98), 5, 2.8, 'blue', .7);
  for(const [i,j] of [[2.48,4.05],[3.96,3.95],[3.22,2.55]]) {
    const [x,y]=H.p(i,j,1.07);H.line(R,[[x-4,y-4],[x+4,y+4]],'teal',4);H.dot(x,y,2,'sun',.9);
  }
  H.line(R,[H.p(1.88,4.4,.18),H.p(3.19,3.3,.9),H.p(4.42,4.18,.18)],'teal',1.5);
  metal(H, R, 3.05, 3.1, .38, .4, 2.27, .34, 'teal');
  bentTube(H, R, [[3.2, 3.3, 2.47], [3.68, 3.39, 2.91], [4.34, 3.5, 2.16]], 3.5, 'blue');
  cylinder(H, R, H.p(4.11, 3.46, 2.31), H.p(4.43, 3.52, 1.98), 10, 'blue');
  const low = H.p(3.97, 3.5, 2.64), high = H.p(2.3, 3.15, 4.12);
  cylinder(H, R, low, high, 16, 'teal');
  for (const f of [.26, .66]) { const x = low[0] + (high[0] - low[0]) * f, y = low[1] + (high[1] - low[1]) * f; H.line(R, [[x - 13, y + 7], [x + 11, y - 11]], 'sun', 3.8); }
  cylinder(H, R, [low[0] + 4, low[1] + 3], [low[0] + 18, low[1] + 17], 4.5, 'blue');
  cylinder(H, R, [high[0] + 21, high[1] + 22], [high[0] + 36, high[1] + 37], 4.1, 'sun');
  oval(H, R, ...H.p(3.64, 3.56, 2.5), 7, 6, 'coral', .8);
  const mount=H.p(3.27,3.32,2.55);
  H.outline(R,ell(...mount,18,11),'sun',3.4);
  H.outline(R,ell(...mount,14,8),'blue',1.2);
  for(let n=0;n<12;n++) {const a=TAU*n/12;H.line(R,[[mount[0]+Math.cos(a)*15,mount[1]+Math.sin(a)*9],[mount[0]+Math.cos(a)*19,mount[1]+Math.sin(a)*12]],'blue',.75);}
  stroke(H,R,[H.p(3.47,3.41,2.59),H.p(4.14,3.68,2.64),H.p(4.43,3.96,2.41)],'teal',2.3);
  oval(H,R,...H.p(4.43,3.96,2.41),5,5,'coral',.75);
  metal(H,R,5.19,4.68,1.56,2.4,.19,.49,'teal');
  surface(H,R,H.faceI(5.32,7.09,1.3,.28,.59),'sun',.46,.65);
  H.line(R,[H.p(5.64,7.1,.44),H.p(6.3,7.1,.44)],'blue',1.9);
  benchFrame(H, R, 5.0, 4.5, 4.55, 3.0, 1.14, 'sun');
  metal(H, R, 6.95, 5.8, .75, .75, 1.14, .1, 'teal');
  const ring = r => Array.from({ length: 65 }, (_, n) => H.p(7.0 + Math.cos(n * TAU / 64) * r, 5.85 + Math.sin(n * TAU / 64) * r, 1.29));
  for(const [i,j] of [[6.32,5.16],[7.65,5.16],[6.32,6.53],[7.65,6.53]]) {
    metal(H,R,i-.1,j-.1,.2,.2,1.16,.1,'blue'); oval(H,R,...H.p(i,j,1.26),3,2.3,'sun',.9);
  }
  surface(H, R, ring(1.15), 'sun', .77, .85); surface(H, R, ring(.99), 'paper', 1, .6);
  for (let n = 0; n < 15; n++) { const a = n * TAU / 15; H.line(R, [H.p(7 + Math.cos(a) * .86, 5.85 + Math.sin(a) * .86, 1.3), H.p(7 + Math.cos(a) * 1.09, 5.85 + Math.sin(a) * 1.09, 1.3)], 'blue', n % 3 ? .6 : 1.4); }
  const arc = []; for (let n = 0; n <= 32; n++) { const a = .03 + n / 32 * .74; arc.push(H.p(7 + Math.cos(a) * 1.82, 5.85 + Math.sin(a) * 1.82, 1.28)); }
  H.line(R, arc, 'blue', 4); H.line(R, arc, 'paper', 1.1);
  for (const a of [.03, .77]) metal(H, R, 7 + Math.cos(a) * 1.82 - .12, 5.85 + Math.sin(a) * 1.82 - .1, .24, .22, 1.19, .22, 'coral');
  const innerRing=Array.from({length:49},(_,n)=>H.p(7+Math.cos(n*TAU/48)*.7,5.85+Math.sin(n*TAU/48)*.7,1.31));
  H.outline(R,innerRing,'coral',.75);
  for(const a of [.17,.42,.64]) {
    const i=7+Math.cos(a)*1.82,j=5.85+Math.sin(a)*1.82;
    metal(H,R,i-.08,j-.08,.16,.16,1.16,.09,'sun');
  }
  metal(H,R,8.91,4.78,.51,.6,1.16,.2,'teal');
  surface(H,R,H.faceI(8.96,5.39,.4,1.22,1.32),'blue',.7,.6);
  H.dot(...H.p(9.14,5.41,1.27),2,'coral',.9);
  for(let n=0;n<3;n++) H.line(R,[H.p(8.99,4.92+n*.13,1.37),H.p(9.3,4.92+n*.13,1.37)],'paper',.6);
  surface(H, R, H.faceI(5.1, 4.75, 1.15, 1.15, 2.13), 'paper', 1, .8);
  benchFrame(H, R, 9.92, 9.75, 1.4, 1.35, .65, 'teal');
  cushion(H, R, 10.01, 9.86, 1.19, 1.08, .67, .12, 'sun');
  bentTube(H, R, [[10.03, 9.86, .7], [10.03, 9.73, 1.49], [11.13, 9.73, 1.49], [11.13, 9.86, .7]], 3, 'teal');
  drape(H, R, 10.03, 10.10, .55, .79, .8, .61, 'coral');
  const binoculars=H.p(10.72,10.29,.84);
  for(const dx of [-5,5]) {H.line(R,[[binoculars[0]+dx,binoculars[1]],[binoculars[0]+dx+3,binoculars[1]-12]],'blue',7);oval(H,R,binoculars[0]+dx+3,binoculars[1]-12,4,2.6,'sun',.85);}
  stroke(H,R,[[binoculars[0]-6,binoculars[1]],[binoculars[0]-17,binoculars[1]+21],[binoculars[0]+14,binoculars[1]+17],[binoculars[0]+7,binoculars[1]]],'coral',1.1);
  metal(H,R,10.1,11.28,1.14,.63,.05,.28,'sun');
  H.line(R,[H.p(10.4,11.91,.22),H.p(10.88,11.91,.22)],'teal',2.3);
  benchFrame(H, R, 3.55, 9.18, 3.6, 1.48, .74, 'teal');
  for (const [i, ink] of [[3.8, 'paper'], [4.9, 'coral'], [6.0, 'sun']]) { surface(H, R, H.tile(i, 9.45, .84, .8, .77), ink, ink === 'paper' ? 1 : .32, .6); oval(H, R, ...H.p(i + .4, 9.82, .8), 8, 5, ink === 'paper' ? 'blue' : 'paper', .8); }
  const aperture=H.p(4.26,9.89,.82);
  surface(H,R,[[aperture[0]-12,aperture[1]+5],[aperture[0]+12,aperture[1]+5],[aperture[0]+12,aperture[1]-25],[aperture[0]-12,aperture[1]-25]],'teal',.66,.7);
  oval(H,R,aperture[0],aperture[1]-10,7,7,'paper',1);
  H.line(R,[[aperture[0],aperture[1]-25],[aperture[0]+8,aperture[1]+8]],'sun',1.3);
  const globePaper=H.p(6.37,9.73,1.15);oval(H,R,...globePaper,10,10,'paper',1);H.outline(R,ell(...globePaper,4,10),'coral',.7);H.outline(R,ell(...globePaper,10,3),'teal',.7);
  surface(H,R,H.tile(3.82,10.84,1.46,.5,.03),'paper',1,.7);
  for(const [i,j,r] of [[4.05,10.99,3],[4.39,11.17,5],[4.84,11.08,3.5]]) shape(H,R,starPts(...H.p(i,j,.04),r,r*.4,5,.1),'teal',.7,.4);
  surface(H, R, [H.p(5.4, 9.7, .8), H.p(5.8, 9.7, .8), H.p(5.58, 9.7, 1.65)], 'sun', .7, .7);
  for (let n = 0; n < 6; n++) H.line(R, [H.p(11.15, .4 + n * .1, .08), H.p(11.6, .4 + n * .1, .08)], 'blue', 1.4);
}, (H, R, t) => {
  const u = cycle(t, 20) * 20, move = u < 4 ? 0 : u < 8 ? smooth((u - 4) / 4) : u < 12 ? 1 : 1 - smooth((u - 12) / 6), a = .03 + .74 * move;
  const li = 7 + Math.cos(a) * 1.82, lj = 5.85 + Math.sin(a) * 1.82;
  const shadow = [H.p(6.7, 5.85, 1.305), H.p(7.3, 5.85, 1.305), H.p(7 - Math.cos(a) * 1.04, 5.85 - Math.sin(a) * 1.04, 1.305)];
  H.tint(shadow, 'blue', .62);
  surface(H, R, [H.p(6.7, 5.85, 1.32), H.p(7.3, 5.85, 1.32), H.p(7.0, 5.83, 1.79)], 'sun', .8, .8);
  metal(H, R, li - .13, lj - .13, .26, .26, 1.27, .15, 'teal');
  bentTube(H, R, [[li, lj, 1.42], [li, lj, 2.25], [li - .25, lj - .17, 2.47]], 2.8, 'teal');
  const [x, y] = H.p(li - .25, lj - .17, 2.47);
  shape(H, R, [[x - 6, y - 7], [x + 9, y - 2], [x + 8, y + 7], [x - 11, y + 2]], 'coral', .8, .8); oval(H, R, x - 6, y + 2, 5, 4, 'sun', .9);
  stroke(H,R,[H.p(li,lj,1.42),H.p(li-.26,lj-.21,1.2),H.p(8.56,5.31,1.18),H.p(9.25,5.2,1.17)],'blue',1.1);
  const hand = H.p(li, lj, 1.82), foot = H.p(li + .9, lj + .4), scale = 2.2;
  const stepping = u > 4 && u < 8 ? Math.sin((u - 4) / 4 * TAU) : u > 12 && u < 18 ? -Math.sin((u - 12) / 6 * TAU) : 0;
  const q = { ...rest, head: 14, al: 30, el: 56, ll: stepping * 12, lr: -stepping * 12, kl: Math.max(0, stepping) * 14, kr: Math.max(0, -stepping) * 14 };
  const dx = (foot[0] - hand[0]) / scale - 5.2, dy = (hand[1] - foot[1]) / scale + 32.5, l = Math.min(8.567, Math.max(.2, Math.hypot(dx, dy))), e = Math.acos((l * l - 4.368 ** 2 - 4.2 ** 2) / (2 * 4.368 * 4.2));
  q.ar = (Math.atan2(dx, dy) - Math.atan2(4.2 * Math.sin(e), 4.368 + 4.2 * Math.cos(e))) * 180 / Math.PI; q.er = e * 180 / Math.PI;
  FIGURES.clips.londonShadowEducator.keys = [[0, q], [1, q]];
  FIGURES.draw(H, R, { who: 'adult', x: foot[0], y: foot[1], scale, clip: 'londonShadowEducator', phase: 0, face: 'sw', ground: foot, opts: { shirt: ['teal', .73], glasses: true } });
  actor(H, R, 6.13, 7.3, u, 'londonShadowLearner', { shirt: ['coral', .65], hairStyle: 'curly' }, 0, 1.9, 'child');
  H.dot(...hand, 2.7, 'coral', .32, { knock: true });
  const p = H.p(.16, 10.4, 2.65); H.line(R, [H.p(.16, 10.4, 1.21), p], 'blue', 1.8); stroke(H, R, [p, [p[0] + 15, p[1] + Math.sin(TAU * u / 20) * 3], [p[0] + 29, p[1] + 8]], 'coral', 3.2);
});
room.loopSeconds = 20;
room.stillTime = 10;
export default room;
