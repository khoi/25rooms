import { world, box, actor, shape, oval, stroke, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, drape, slattedSeat, vessel, floorLight } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';
import { windowBay, hangingRail, recessedFrame, taskLight, caster } from '../joinery.js';

const base = FIGURES.sample('idle', 0);
const cast = [[2.95, 3.8, 'coral', 'curly'], [4.78, 3.35, 'paper', 'bun'], [6.66, 3.58, 'teal', 'short'], [8.42, 4.57, 'sun', 'pony']];
for (let n = 0; n < 4; n++) {
  const pose = { ...base, al: 50, ar: 54, el: 65, er: 60, head: 1 };
  FIGURES.clips[`london-choir-singer-${n}`] = { dur: 18, keys: [[0, pose], [.18 + n * .007, { ...pose, y: -1.1 }], [.4, { ...pose, head: -4, y: -1.3 }], [.6, { ...pose, head: -3, y: -.8 }], [.84, pose], [1, pose]] };
}
FIGURES.clips['london-choir-conductor'] = { dur: 18, keys: [[0, { ...base, al: 92, ar: 105, el: 45, er: 24 }], [.2, { ...base, al: 108, ar: 132, el: 20, er: 14, y: -.8 }], [.4, { ...base, al: 87, ar: 108, el: 24, er: 30 }], [.6, { ...base, al: 92, ar: 115, el: 28, er: 12 }], [.84, { ...base, al: 60, ar: 64, el: 42, er: 30 }], [.9, { ...base, al: 92, ar: 105, el: 45, er: 24 }], [1, { ...base, al: 92, ar: 105, el: 45, er: 24 }]] };
function folder(H, R, x, y, patch = false, flap = 0) {
  shape(H, R, [[x - 12, y - 8], [x, y - 4], [x, y + 11], [x - 12, y + 7]], 'teal', .7);
  shape(H, R, [[x, y - 4], [x + 11, y - 9], [x + 11, y + 6], [x, y + 11]], 'paper', 1);
  for (let k = 0; k < 4; k++) H.line(R, [[x + 2, y - 1 + k * 2], [x + 9, y - 4 + k * 2]], 'blue', .5);
  shape(H,R,[[x+7,y-7],[x+11,y-9],[x+11+flap,y-5]],'paper',1,.4);
  if (patch) { shape(H, R, [[x - 12, y + 1], [x - 5, y + 3], [x - 5, y + 7], [x - 12, y + 5]], 'coral', .8, .5); for (let k = 0; k < 4; k++) H.line(R, [[x - 11 + k * 1.5, y + 1], [x - 11 + k * 1.5, y + 3]], 'paper', .5); }
}
function keyboard(base, R) {
  const H={...base,p:(i,j,z)=>base.p(i-.95,j+.35,z),tile:(i,j,w,d,z)=>base.tile(i-.95,j+.35,w,d,z),faceI:(i,j,w,z0,z1)=>base.faceI(i-.95,j+.35,w,z0,z1),faceJ:(i,j,d,z0,z1)=>base.faceJ(i-.95,j+.35,d,z0,z1)};
  for (const x of [1.3, 3.28]) bentTube(H, R, [[x, 6.02, .05], [x + 1.6, 5.1, 1.04], [x + 1.6, 6.02, .05], [x, 5.1, 1.04]], 2.5, 'blue');
  metal(H, R, 1.18, 4.86, 4.05, 1.08, 1.04, .24, 'teal');
  shape(H, R, H.tile(1.33, 5.38, 3.74, .44, 1.3), 'paper', 1);
  for (let n = 0; n < 28; n++) { const x = 1.36 + n * .13; H.line(R, [H.p(x, 5.39, 1.31), H.p(x, 5.8, 1.31)], 'blue', .5); if (![2, 6].includes(n % 7)) box(H, R, x + .06, 5.39, .055, .24, 1.31, .055, 'blue', .9); }
  bentTube(H, R, [[2.8, 5.85, 1.07], [2.8, 6.02, .06], [3.3, 6.03, .06]], 1, 'blue');
  metal(H, R, 3.25, 5.88, .27, .6, .05, .12, 'blue');
  shape(H, R, H.faceI(3.7, 4.94, .7, 1.31, 1.92), 'paper', 1);
  for (let n = 0; n < 4; n++) { H.dot(...H.p(3.78 + n * .14, 4.96, 1.76), 2, ['coral', 'sun', 'teal', 'blue'][n]); H.line(R, [H.p(3.78 + n * .14, 4.96, 1.7), H.p(3.78 + n * .14, 4.96, 1.48)], 'blue', .65); oval(H, R, ...H.p(3.8 + n * .14, 4.96, 1.46), 2 + n % 2, 1.1, n % 2 ? 'coral' : 'blue'); }
}
const room = world('london-rehearsal-choir', 'The room takes a breath', { wall: 'paper', wallTone: .72, height: 3.6, floor: 'paper', tone: .17, head: 40 }, (H, R) => {
  boardFloor(H, R, .2, .2, 11.6, 11.6, .03, 'sun', .72);
  for (const side of ['nw', 'ne']) {
    for (let n = 0; n < 8; n++) {
      const P = (u, z) => wallPt(H, side, u, z, -.15);
      shape(H, R, [P(.3 + n * 1.4, .05), P(1.5 + n * 1.4, .05), P(1.5 + n * 1.4, .3), P(.3 + n * 1.4, .3)], n % 3 ? 'teal' : 'coral', .4, .5);
    }
  }
  windowBay(H, R, 'nw', 1.05, 5.65, 2.25, .95, { night: true, divisions: 4 });
  for (let n = 0; n < 5; n++) recessedFrame(H, R, 'ne', 1.0 + n * 1.27, 1.02, 2.05, 1.25, n % 2 ? 'teal' : 'coral', P => {
    for (let k = 0; k < 7; k++) H.line(R, [P(.12 + k * .11, .17), P(.12 + k * .11, 1.08)], 'paper', .75, { tone: .5 });
  });
  const P = (u, z) => wallPt(H, 'nw', u, z, -.22);
  for (let n = 0; n < 5; n++) { const q = P(7.4 + n * .65, 2.75 + (n % 2) * .18); oval(H, R, ...q, 5 + n % 2 * 2, 3.5, n % 2 ? 'sun' : 'coral', .7); H.line(R, [q, [q[0] + 5, q[1] - 15]], 'blue', 1.2); }
  const [cx, cy] = wallPt(H, 'ne', 10.76, 3.05, -.24);
  oval(H, R, cx, cy, 14, 14, 'paper');
  H.line(R, [[cx, cy - 9], [cx, cy], [cx + 6, cy + 3]], 'blue', 1.5);
  for (let n = 0; n < 12; n++) { const a = n * Math.PI / 6; H.dot(cx + Math.cos(a) * 11, cy + Math.sin(a) * 11, .7, 'blue'); }
  cabinetFrame(H, R, 7.85, .22, 3.55, 1.35, .15, 2.4, 3, 'sun', (i, j, w, d, z, h, n) => {
    timber(H, R, i, j, w, d, 1.02, .09, 'sun');
    if (n === 0) {
      for (let k = 0; k < 6; k++) { box(H, R, i + .06 + k * .145, j + .35, .095, .58, 1.13, .85 - k % 2 * .1, ['paper', 'coral', 'teal'][k % 3], .7); H.line(R, [H.p(i + .09 + k * .145, j + .94, 1.24), H.p(i + .09 + k * .145, j + .94, 1.42)], 'sun', 1); }
      box(H, R, i + .09, j + .24, .75, .67, .3, .42, 'blue', .7);
    } else if (n === 1) {
      box(H, R, i + .04, j + .18, .88, .71, 1.13, .92, 'blue', .75);
      oval(H, R, ...H.p(i + .47, j + .91, 1.6), 10, 13, 'teal', .6);
      oval(H, R, ...H.p(i + .47, j + .92, 1.63), 4, 5, 'blue', .9);
      for (let k = 0; k < 3; k++) { box(H, R, i + .06, j + .2, .86, .73, .24 + k * .22, .18, 'teal', .4); H.dot(...H.p(i + .5, j + .94, .32 + k * .22), 1.8, 'sun'); }
    } else {
      for (let k = 0; k < 3; k++) { const a = H.p(i + .2 + k * .26, j + .65, 1.3); stroke(H, R, [[a[0] - 5, a[1]], [a[0] - 6, a[1] - 17], [a[0], a[1] - 30], [a[0] + 5, a[1] - 17], [a[0] + 4, a[1]]], 'coral', 6); }
      drape(H, R, i + .1, j + .2, .72, .6, .55, .17, 'paper');
    }
  });
  hangingRail(H, R, 'nw', 7.55, 3.6, 2.1, 3, (Q, u, n) => {
    shape(H, R, [Q(u - .28, -.2), Q(u + .28, -.2), Q(u + .43, -.7), Q(u + .23, -.72), Q(u + .24, -1.28), Q(u - .27, -1.28), Q(u - .25, -.65), Q(u - .4, -.65)], n === 1 ? 'coral' : 'teal', .5);
    H.line(R, [Q(u, -.3), Q(u, -1.2)], 'paper', .8);
  });
  timber(H, R, 2.0, 2.6, 7.2, 2.05, .05, .16, 'teal');
  for (let n = 0; n < 8; n++) H.line(R, [H.p(2.12 + n * .86, 2.65, .215), H.p(2.12 + n * .86, 4.6, .215)], 'paper', .6);
  for (const [i, j] of cast) slattedSeat(H, R, i - .38, j - .58, .85, .22, 'sun', .52);
  metal(H, R, 8.03, 3.98, .3, .35, .22, .14, 'coral');
  keyboard(H,R);
  for (const [di, dj] of [[-.45, .38], [.4, .38], [0, -.45]]) bentTube(H, R, [[5.98, 6.42, .5], [5.98 + di, 6.42 + dj, .07]], 2.2, 'blue');
  metal(H, R, 5.93, 6.37, .1, .1, .48, 1.03, 'teal');
  oval(H, R, ...H.p(5.98, 6.46, 1.14), 3, 2, 'coral');
  shape(H, R, [H.p(5.22, 6.1, 1.6), H.p(6.75, 6.1, 1.6), H.p(6.75, 6.57, 1.35), H.p(5.22, 6.57, 1.35)], 'sun', .6);
  timber(H, R, 5.2, 6.55, 1.6, .08, 1.32, .11, 'sun');
  folder(H, R, ...H.p(6.0, 6.34, 1.63));
  slattedSeat(H, R, .55, 9.1, 2.6, .05, 'teal', .57);
  drape(H, R, .8, 9.2, .8, .52, .75, .44, 'coral');
  vessel(H, R, 3.6, 9.7, .12, 16, 17, 'sun');
  const q = H.p(3.6, 9.7, .65); oval(H, R, ...q, 16, 6, 'paper');
  for (let n = 0; n < 8; n++) H.line(R, [[q[0] - 13 + n * 3.7, q[1] + 1], [q[0] - 10 + n * 3, q[1] + 16]], n === 2 ? 'coral' : 'blue', .7);
  box(H, R, 1.0, 7.15, 1.5, .95, .05, .35, 'teal', .4);
  drape(H, R, 1.12, 7.25, 1.1, .66, .5, .2, 'coral');
  vessel(H, R, 2.85, 8.12, .04, 7, 21, 'teal');
  oval(H, R, ...H.p(2.05, 7.63, .64), 6, 5, 'sun');
  for (const [i, j] of [[9.65, 7.55], [10.74, 7.55]]) caster(H, R, i, j);
  box(H, R, 9.36, 6.88, 1.76, .78, .2, .55, 'blue', .66);
  H.line(R, [H.p(9.5, 7.69, .46), H.p(10.9, 7.69, .46)], 'paper', 1);
  bentTube(H, R, [[10.02, 7.72, .54], [10.02, 7.72, .76], [10.48, 7.72, .76], [10.48, 7.72, .54]], 1.5, 'sun');
  taskLight(H, R, 10.5, 1.2, 2.59, 'coral', -.7);
  floorLight(H, 5.9, 4.9, 135, .24);
}, (H, R, t) => {
  cast.forEach(([i, j, ink, hair], n) => actor(H, R, i, j + .3, t, `london-choir-singer-${n}`, { shirt: [ink, ink === 'paper' ? 1 : .65], hairStyle: hair, skin: ['coral', .25 + n * .14], prop: (HH, RR, p) => { folder(HH, RR, (p.lhand[0] + p.rhand[0]) / 2, (p.lhand[1] + p.rhand[1]) / 2 - 3, n === 0, Math.sin(t*Math.PI/9+n)*1.2); const u=((t%18)+18)%18; if(u>3.6+n*.1&&u<10.8) oval(HH,RR,p.head[0]+3,p.head[1]+5,1.6,1.9,'blue',.8); } }, .22, 1.55));
  actor(H, R, 6.48, 7.45, t, 'london-choir-conductor', { shirt: ['coral', .72], face: 'nw', hairStyle: 'bun', pants: ['blue', .55] }, 0, 1.65);
});
room.loopSeconds = 18;
room.stillTime = 3.5;
export default room;
