import { world, box, actor, shape, oval, stroke, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, drape, slattedSeat, vessel, floorLight } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';
import { windowBay, hangingRail, recessedFrame, taskLight, caster, radiator } from '../joinery.js';

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
  timber(H, R, 1.12, 4.8, 4.17, 1.19, 1.04, .27, 'teal');
  for (const x of [1.24, 4.77]) {
    shape(H, R, H.tile(x, 4.96, .42, .32, 1.32), 'blue', .7, .55);
    for (let n = 0; n < 5; n++) H.line(R, [H.p(x + .04, 5.01 + n * .05, 1.33), H.p(x + .37, 5.01 + n * .05, 1.33)], 'paper', .45);
  }
  for (let n = 0; n < 5; n++) oval(H, R, ...H.p(2.03 + n * .3, 5.16, 1.33), 2.2, 1.2, n === 3 ? 'coral' : 'paper');
  shape(H, R, H.tile(2.58, 4.91, .59, .22, 1.33), 'blue', .8, .5);
  H.line(R, [H.p(2.67, 4.99, 1.34), H.p(3.06, 4.99, 1.34)], 'sun', 1.6);
  for (const x of [2.26, 3.31]) bentTube(H, R, [[x, 4.92, 1.31], [x, 4.91, 1.89], [x + .25, 4.91, 1.89]], 1.8, 'blue');
  shape(H, R, [H.p(2.13, 4.89, 1.4), H.p(3.64, 4.89, 1.4), H.p(3.64, 4.73, 1.93), H.p(2.13, 4.73, 1.93)], 'teal', .55);
  for (const x of [2.17, 2.88]) {
    shape(H, R, [H.p(x, 4.88, 1.45), H.p(x + .67, 4.88, 1.45), H.p(x + .67, 4.73, 1.89), H.p(x, 4.73, 1.89)], 'paper', 1, .5);
    for (let n = 0; n < 4; n++) H.line(R, [H.p(x + .07, 4.85 - n * .025, 1.49 + n * .1), H.p(x + .55, 4.85 - n * .025, 1.49 + n * .1)], 'blue', .5);
  }
  metal(H, R, 1.27, 5.42, .39, .51, .2, .18, 'blue');
  bentTube(H, R, [[1.45, 5.5, .27], [1.14, 5.13, .23], [1.11, 4.82, 1.12]], .9, 'blue');
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
  for (const side of ['nw', 'ne']) {
    const P = (u, z) => wallPt(H, side, u, z, -.18);
    H.line(R, [P(.15, 3.46), P(11.83, 3.46)], 'teal', 6);
    H.line(R, [P(.15, 1.14), P(11.83, 1.14)], 'sun', 3.5);
    for (let n = 0; n < 9; n++) {
      const u = .3 + n * 1.25;
      shape(H, R, [P(u, .36), P(u + 1.12, .36), P(u + 1.12, 1.06), P(u, 1.06)], 'teal', .19, .55);
      H.line(R, [P(u + .08, .42), P(u + .08, 1.0)], 'paper', .7);
    }
  }
  radiator(H, R, 'nw', 1.42, 4.8, .9);
  windowBay(H, R, 'nw', 1.05, 5.65, 2.25, .95, { night: true, divisions: 4 });
  hangingRail(H, R, 'nw', .87, 6.1, 3.33, 2, (P, u, n) => {
    const edge = n ? 5.68 : .08;
    shape(H, R, [P(edge, -.08), P(edge + .4, -.08), P(edge + .48, -.81), P(edge + .32, -1.39), P(edge, -1.32)], 'coral', .36);
    for (let k = 0; k < 3; k++) H.line(R, [P(edge + .07 + k * .1, -.13), P(edge + .1 + k * .08, -1.29)], 'paper', .65);
  });
  for (let n = 0; n < 5; n++) recessedFrame(H, R, 'ne', 1.0 + n * 1.27, 1.02, 2.05, 1.25, n % 2 ? 'teal' : 'coral', P => {
    for (let k = 0; k < 7; k++) H.line(R, [P(.12 + k * .11, .17), P(.12 + k * .11, 1.08)], 'paper', .75, { tone: .5 });
  });
  const P = (u, z) => wallPt(H, 'nw', u, z, -.22);
  for (let n = 0; n < 5; n++) { const q = P(7.4 + n * .65, 2.75 + (n % 2) * .18); oval(H, R, ...q, 5 + n % 2 * 2, 3.5, n % 2 ? 'sun' : 'coral', .7); H.line(R, [q, [q[0] + 5, q[1] - 15]], 'blue', 1.2); }
  const [cx, cy] = wallPt(H, 'ne', 10.76, 3.05, -.24);
  oval(H, R, cx, cy, 14, 14, 'paper');
  H.line(R, [[cx, cy - 9], [cx, cy], [cx + 6, cy + 3]], 'blue', 1.5);
  for (let n = 0; n < 12; n++) { const a = n * Math.PI / 6; H.dot(cx + Math.cos(a) * 11, cy + Math.sin(a) * 11, .7, 'blue'); }
  cabinetFrame(H, R, 7.85, .22, 3.55, 1.35, .15, 2.8, 3, 'sun', (i, j, w, d, z, h, n) => {
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
  timber(H, R, 7.79, .15, 3.67, 1.48, 2.97, .12, 'teal');
  for (let n = 0; n < 4; n++) {
    box(H, R, 8.04 + n * .68, .46, .54, .64, 3.11, .21, n === 2 ? 'coral' : 'paper', .65);
    H.line(R, [H.p(8.17 + n * .68, 1.11, 3.21), H.p(8.42 + n * .68, 1.11, 3.21)], 'teal', 1.1);
  }
  for (const x of [9.89, 11.03]) {
    bentTube(H, R, [[x, 2.58, .08], [x, 2.47, 2.66]], 2.4, 'teal');
    metal(H, R, x - .22, 2.34, .48, .4, .05, .09, 'blue');
  }
  shape(H, R, [H.p(9.92, 2.48, .36), H.p(11.02, 2.48, .36), H.p(11.02, 2.48, 2.65), H.p(9.92, 2.48, 2.65)], 'coral', .37);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(10.02 + n * .19, 2.5, .45), H.p(10.02 + n * .19, 2.5, 2.56)], 'sun', .65);
  shape(H, R, [H.p(11.02, 2.48, .36), H.p(11.44, 3.42, .36), H.p(11.44, 3.42, 2.65), H.p(11.02, 2.48, 2.65)], 'teal', .42);
  for (const z of [.48, 2.53]) bentTube(H, R, [[9.9, 2.48, z], [11.03, 2.48, z], [11.44, 3.42, z]], 1.6, 'sun');
  for (const z of [.8, 2.1]) metal(H, R, 10.96, 2.47, .12, .14, z, .17, 'paper');
  hangingRail(H, R, 'nw', 7.55, 3.6, 2.1, 3, (Q, u, n) => {
    shape(H, R, [Q(u - .28, -.2), Q(u + .28, -.2), Q(u + .43, -.7), Q(u + .23, -.72), Q(u + .24, -1.28), Q(u - .27, -1.28), Q(u - .25, -.65), Q(u - .4, -.65)], n === 1 ? 'coral' : 'teal', .5);
    H.line(R, [Q(u, -.3), Q(u, -1.2)], 'paper', .8);
  });
  for (const j of [3.18, 4.41]) {
    timber(H, R, 2.1, j, 7.03, .14, .08, .1, 'blue');
    for (const x of [2.27, 5.33, 8.83]) metal(H, R, x, j, .23, .21, .045, .12, 'teal');
  }
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
  for (const x of [5.45, 6.48]) {
    H.line(R, [H.p(x, 6.11, 1.61), H.p(x, 6.28, 1.37)], 'blue', 1);
    oval(H, R, ...H.p(x, 6.28, 1.37), 2.4, 1.4, 'coral');
  }
  bentTube(H, R, [[5.92, 6.42, 1.05], [6.17, 6.42, 1.05]], 1.7, 'sun');
  oval(H, R, ...H.p(6.23, 6.42, 1.05), 3, 2, 'teal');
  timber(H, R, .5, 6.95, 1.08, 1.29, .08, .14, 'teal');
  bentTube(H, R, [[.65, 7.23, .17], [.65, 7.23, 2.03], [.98, 7.23, 2.18], [1.33, 7.23, 2.03], [1.33, 7.23, .17]], 1.8, 'sun');
  timber(H, R, .56, 6.97, .85, .64, .83, .09, 'sun');
  const bottle = H.p(.98, 7.18, .92);
  shape(H, R, [[bottle[0] - 9, bottle[1]], [bottle[0] + 9, bottle[1]], [bottle[0] + 7, bottle[1] - 21], [bottle[0] + 3, bottle[1] - 27], [bottle[0] - 3, bottle[1] - 27], [bottle[0] - 7, bottle[1] - 21]], 'paper', 1);
  H.line(R, [[bottle[0] - 6, bottle[1] - 5], [bottle[0] + 6, bottle[1] - 5]], 'teal', 2);
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
  for (const [x, j] of [[8.02, 9.16], [9.84, 9.16], [8.02, 10.28], [9.84, 10.28]]) {
    caster(H, R, x, j);
    metal(H, R, x, j, .1, .1, .17, .91, 'teal');
  }
  timber(H, R, 7.9, 9.04, 2.18, 1.43, .29, .1, 'teal');
  timber(H, R, 7.9, 9.04, 2.18, 1.43, 1.08, .1, 'sun');
  for (let n = 0; n < 3; n++) box(H, R, 8.13 + n * .54, 9.24, .41, .82, .4, .54, ['paper', 'teal', 'coral'][n], .61);
  shape(H, R, H.tile(8.09, 9.25, 1.75, .92, 1.2), 'blue', .73);
  folder(H, R, ...H.p(8.66, 9.61, 1.35), true);
  const pipe = H.p(9.63, 9.78, 1.25);
  oval(H, R, ...pipe, 8, 5, 'paper');
  for (let n = 0; n < 6; n++) H.line(R, [[pipe[0] - 6 + n * 2, pipe[1] - 3], [pipe[0] - 6 + n * 2, pipe[1] + 3]], 'blue', .6);
  bentTube(H, R, [[9.95, 9.08, 1.13], [9.95, 9.08, 1.6], [9.95, 10.4, 1.6], [9.95, 10.4, 1.13]], 2, 'teal');
  taskLight(H, R, 10.5, 1.2, 3.11, 'coral', -.7);
  floorLight(H, 5.9, 4.9, 135, .24);
}, (H, R, t) => {
  cast.forEach(([i, j, ink, hair], n) => actor(H, R, i, j + .3, t, `london-choir-singer-${n}`, { shirt: [ink, ink === 'paper' ? 1 : .65], hairStyle: hair, skin: ['coral', .25 + n * .14], prop: (HH, RR, p) => { folder(HH, RR, (p.lhand[0] + p.rhand[0]) / 2, (p.lhand[1] + p.rhand[1]) / 2 - 3, n === 0, Math.sin(t*Math.PI/9+n)*1.2); const u=((t%18)+18)%18; if(u>3.6+n*.1&&u<10.8) oval(HH,RR,p.head[0]+3,p.head[1]+5,1.6,1.9,'blue',.8); } }, .22, 1.55));
  actor(H, R, 6.48, 7.45, t, 'london-choir-conductor', { shirt: ['coral', .72], face: 'nw', hairStyle: 'bun', pants: ['blue', .55] }, 0, 1.65);
});
room.loopSeconds = 18;
room.stillTime = 3.5;
export default room;
