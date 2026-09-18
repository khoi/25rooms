import { world, shape, oval, stroke, ell, actor, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, benchFrame, bentTube, cushion, caneChair, vessel, drape, floorLight, pendant } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, cityView, cornice, wallCourse, hangingRail, recessedFrame, floorShadow } from '../joinery.js';

const rest = { x: 0, y: 0, drop: 0, lean: 0, head: 8, al: 12, ar: 12, el: 18, er: 18, ll: -5, lr: 5, kl: 0, kr: 0, roll: 0 };
FIGURES.clips.barcelonaDinnerPull = { dur: 20, keys: [[0, rest], [1, rest]] };
FIGURES.clips.barcelonaDinnerCheck = { dur: 20, keys: [[0, rest], [1, rest]] };
const ease = v => { const x = Math.max(0, Math.min(1, v)); return x * x * (3 - 2 * x); };

function reach(H, R, clip, target, face, shirt, head = 8, stride = 0) {
  const mirror = face === 'sw' ? -1 : 1, scale = 1.47;
  const fx = target[0] - mirror * 14, fy = target[1] + 46;
  const i = (fy / 16 + fx / 32) / 2, j = (fy / 16 - fx / 32) / 2;
  const q = { ...rest, head, ll: -5 + stride * 8, lr: 5 - stride * 8 };
  for (const [s, dx] of [['l', -11], ['r', 0]]) {
    const tx = ((target[0] + dx * mirror - fx) / scale) * mirror - (s === 'l' ? -5.2 : 5.2), ty = (target[1] - fy) / scale + 32.5;
    const d = Math.min(8.56, Math.max(.3, Math.hypot(tx, ty))), a = Math.atan2(tx, ty) - Math.acos(Math.max(-1, Math.min(1, (4.368 ** 2 + d ** 2 - 4.2 ** 2) / (2 * 4.368 * d))));
    const b = Math.atan2(tx - Math.sin(a) * 4.368, ty - Math.cos(a) * 4.368);
    q[`a${s}`] = a * 180 / Math.PI;
    q[`e${s}`] = (b - a) * 180 / Math.PI;
  }
  FIGURES.clips[clip].keys = [[0, q], [1, q]];
  actor(H, R, i, j, 0, clip, { face, shirt, pants: ['blue', .7], hairStyle: clip === 'barcelonaDinnerPull' ? 'curly' : 'bun' }, 0, scale);
}

function plate(H, R, i, j, z, r, ink = 'paper', upright = false) {
  const p = H.p(i, j, z);
  oval(H, R, p[0], p[1] - (upright ? r : 0), r, upright ? r * .94 : r * .43, ink, .9);
  H.outline(R, ell(p[0], p[1] - (upright ? r : 0), r * .75, upright ? r * .7 : r * .28), 'coral', .9, { amp: .12 });
  H.outline(R, ell(p[0], p[1] - (upright ? r : 0), r * .5, upright ? r * .48 : r * .19), 'sun', .7, { amp: .08 });
}

function bowl(H, R, i, j, z, r, ink = 'paper') {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y + 4, r * .45, 3, 'coral', .55);
  shape(H, R, [[x - r, y - 8], [x - r * .72, y + 2], [x, y + 7], [x + r * .72, y + 2], [x + r, y - 8]], ink, .85);
  oval(H, R, x, y - 8, r, r * .34, 'paper', 1);
  oval(H, R, x, y - 8, r * .81, r * .21, 'teal', .18);
  H.line(R, [[x - r * .82, y - 3], [x - r * .66, y + 1]], 'sun', 1.4);
}

const room = world('barcelona-ceramics-cupboard', 'The bowl has a place', { wall: 'paper', wallTone: .84, height: 4.15, floor: 'paper', tone: .78, pattern: 'tiles', accent: 'teal', head: 52 }, (H, R) => {
  wallCourse(H, R, 'nw', .1, 11.9, .67, 'coral');
  wallCourse(H, R, 'ne', .1, 11.9, .67, 'coral');
  cornice(H, R, 'ne', .1, 11.9, 4.01, 'paper');
  cornice(H, R, 'nw', .1, 11.9, 4.01, 'paper');
  windowBay(H, R, 'nw', 2.3, 3.1, 1.26, 2.37, { night: true, ink: 'teal', divisions: 2, view: P => cityView(H, R, P, 3.1, 2.3, true) });
  for (let n = 0; n < 6; n++) H.line(R, [wallPt(H, 'nw', 2.33, 3.38 - n * .105, -.26), wallPt(H, 'nw', 5.37, 3.38 - n * .105, -.26)], 'sun', 2.1);
  stroke(H, R, [wallPt(H, 'nw', 5.33, 3.48, -.3), wallPt(H, 'nw', 5.4, 2.43, -.3), wallPt(H, 'nw', 5.34, 2.36, -.3)], 'paper', 1.3);
  const corner = recessedFrame(H, R, 'nw', .31, 1.43, 1.46, 2.15, 'sun', P => {
    surface(H, R, [P(.12, .15), P(1.3, .15), P(1.3, 2.02), P(.12, 2.02)], 'teal', .3);
    for (const h of [.21, 1.08]) {
      H.line(R, [P(.12, h, .44), P(1.3, h, .44)], 'paper', 3.1);
      const q = P(.66, h + .36, .36);
      oval(H, R, ...q, 11, 8, 'coral', .55);
      oval(H, R, q[0], q[1] - 2, 8, 3.4, 'paper', .9);
    }
  });
  for (const j of [2.34, 5.32]) {
    const p = wallPt(H, 'nw', j, 1.28, -.38);
    H.line(R, [p, [p[0] + 2, p[1] + 17], [p[0] + 6, p[1] + 17]], 'teal', 2);
  }
  H.line(R, [wallPt(H, 'nw', 2.56, 1.59, -.31), wallPt(H, 'nw', 3.35, 2.77, -.31)], 'paper', 1.2, {tone:.5});
  cabinetFrame(H, R, 2.1, .28, 8.76, 1.43, .06, 3.67, 3, 'paper', (x, j, w, d, z, h, n) => {
    for (const top of [.83, 1.74, 2.72]) timber(H, R, x, j, w, d, top, .12, 'paper');
    if (n === 0) {
      for (let k = 0; k < 9; k++) timber(H, R, x + .18 + k * .29, j + .3, .06, .86, 1.86, .05, 'sun');
      for (let k = 0; k < 4; k++) plate(H, R, x + .37 + k * .62, j + .79, 1.88, 15 + (k === 1 ? 3 : 0), k === 2 ? 'sun' : 'paper', true);
      for (let k = 0; k < 3; k++) {
        bowl(H, R, x + .5 + k * .87, j + .7, .99, 13, k === 1 ? 'teal' : 'paper');
        bowl(H, R, x + .5 + k * .87, j + .7, 1.12, 11, 'paper');
      }
      drape(H, R, x + .23, j + .23, 1.92, .8, .45, .16, 'coral');
      drape(H, R, x + .21, j + .19, 1.81, .77, .57, .09, 'paper');
    } else if (n === 1) {
      for (let k = 0; k < 6; k++) plate(H, R, x + .67, j + .69, .99 + k * .075, 17, k % 3 ? 'paper' : 'coral');
      vessel(H, R, x + 1.89, j + .66, .99, 12, 22, 'teal', false);
      bentTube(H, R, [[x + 1.96, j + .69, 1.33], [x + 2.28, j + .69, 1.44], [x + 2.35, j + .69, 1.18], [x + 2.08, j + .69, 1.13]], 2, 'paper');
      bowl(H, R, x + .75, j + .72, 1.93, 22, 'paper');
      for (let k = 0; k < 3; k++) plate(H, R, x + 1.9, j + .64, 1.96 + k * .09, 14, 'sun');
      surface(H, R, H.faceI(x + .13, j + 1.16, w - .25, .19, .73), 'coral', .37);
      for (let k = 0; k < 8; k++) H.line(R, [H.p(x + .25 + k * .28, j + 1.18, .29), H.p(x + .25 + k * .28, j + 1.18, .61)], 'blue', .8);
    } else {
      for (let k = 0; k < 4; k++) vessel(H, R, x + .35 + k * .56, j + .73, .98, 7, 16 + k % 2 * 7, ['paper', 'coral', 'teal', 'sun'][k]);
      for (let k = 0; k < 2; k++) bowl(H, R, x + .74 + k * 1.26, j + .6, 1.93, 17 + k * 3, k ? 'coral' : 'paper');
      surface(H, R, H.faceI(x + .14, j + 1.19, w - .3, .24, .72), 'paper', .95);
      oval(H, R, ...H.p(x + 1.4, j + 1.22, .52), 6, 2.2, 'sun', .8);
    }
    if (n < 2) {
      const a = H.p(x + .1, j + 1.1, 2.89);
      surface(H, R, [[a[0] - 8, a[1]], [a[0] + 7, a[1] - 4], [a[0] + 7, a[1] - 17], [a[0] - 8, a[1] - 12]], 'teal', .65);
      H.dot(a[0], a[1] - 10, 3, 'sun');
      vessel(H, R, x + 1.75, j + .67, 2.91, 12, 20, n ? 'coral' : 'paper');
    } else {
      metal(H, R, x + .25, j + .35, 1.84, .54, 2.89, .49, 'teal');
      const p = H.p(x + .72, j + .9, 3.16);
      oval(H, R, ...p, 5, 5, 'blue', .75);
      for (let k = 0; k < 5; k++) H.line(R, [H.p(x + 1.16 + k * .14, j + .91, 3.02), H.p(x + 1.16 + k * .14, j + .91, 3.24)], 'paper', .8);
    }
  });
  timber(H, R, 1.98, .2, 9, 1.65, 3.75, .16, 'sun');
  timber(H, R, 1.89, .17, 9.19, 1.78, 3.9, .09, 'paper');
  for (let n = 0; n < 14; n++) {
    const x = 2.08 + n * .62;
    surface(H, R, [H.p(x, 1.85, 3.73), H.p(x + .52, 1.85, 3.73), H.p(x + .42, 1.85, 3.57), H.p(x + .28, 1.85, 3.51), H.p(x + .12, 1.85, 3.57)], 'paper', .92, .75);
  }
  for (const x of [2.16, 4.93, 7.81, 10.72]) {
    timber(H, R, x, 1.58, .12, .17, .19, 3.36, 'paper');
    for (const h of [.39, 2.9]) metal(H, R, x - .03, 1.69, .18, .07, h, .22, 'sun');
    H.line(R, [H.p(x + .06, 1.77, .67), H.p(x + .06, 1.77, 2.72)], 'coral', .7);
  }
  const linen = [H.p(5.27, 1.74, .24), H.p(7.4, 1.74, .24), H.p(7.4, 2.13, .57), H.p(5.27, 2.13, .57)];
  surface(H, R, linen, 'blue', .67, .75);
  for (let n = 0; n < 3; n++) drape(H, R, 5.45 + n * .02, 1.8, 1.65, .65, .57 + n * .075, .11, n === 1 ? 'coral' : 'paper');
  timber(H, R, 5.26, 2.4, 2.13, .1, .31, .34, 'sun');
  H.line(R, [H.p(5.96, 2.52, .48), H.p(6.73, 2.52, .48)], 'blue', 2.3);
  const repair = H.p(6.87, 1.23, 3.3);
  H.line(R, [[repair[0] - 8, repair[1] - 6], [repair[0] - 3, repair[1] - 1], [repair[0] - 5, repair[1] + 6]], 'sun', 1.3);
  const door = [H.p(2.12, 1.62, 1.78), H.p(2.52, 3.09, 1.78), H.p(2.52, 3.09, 3.69), H.p(2.12, 1.62, 3.69)];
  H.tint(door, 'teal', .12);
  H.outline(R, door, 'blue', 1.4);
  H.line(R, [H.p(2.32, 2.25, 1.84), H.p(2.32, 2.25, 3.62)], 'paper', 2);
  for (const h of [2.03, 3.47]) metal(H, R, 2.07, 1.49, .1, .19, h, .17, 'sun');
  const key = H.p(10.95, 1.29, 2.4);
  oval(H, R, key[0], key[1], 4, 8, 'sun', .7);
  H.line(R, [[key[0], key[1] + 4], [key[0], key[1] + 15], [key[0] + 4, key[1] + 15]], 'blue', 1.5);
  hangingRail(H, R, 'nw', 6.29, 3.97, 2.85, 3, (P, u, n) => {
    const p = P(u, -.1);
    if (n === 0) {
      surface(H, R, [[p[0] - 7, p[1]], [p[0] + 7, p[1]], [p[0] + 12, p[1] + 35], [p[0] - 11, p[1] + 37]], 'coral', .57);
      H.line(R, [[p[0] - 8, p[1] + 22], [p[0] + 8, p[1] + 22]], 'paper', 1.2);
    } else oval(H, R, p[0], p[1] + 15, 9, 12, n === 1 ? 'paper' : 'sun', .8);
  });
  floorShadow(H, .75, 6.61, 1.73, 3.5, .19);
  for (const j of [6.77, 9.77]) timber(H, R, .85, j, 1.29, .17, .07, .77, 'teal');
  timber(H, R, .85, 6.79, 1.28, 3.12, .17, .12, 'paper');
  timber(H, R, .75, 6.64, 1.59, 3.46, .74, .15, 'teal');
  for (const j of [6.87, 8.24]) {
    surface(H, R, H.faceJ(2.23, j, 1.23, .32, .72), 'sun', .42, .8);
    for (let n = 0; n < 6; n++) H.line(R, [H.p(2.245, j + .1 + n * .2, .35), H.p(2.245, j + .1 + n * .2, .68)], 'blue', .7);
    H.line(R, [H.p(2.26, j + .45, .58), H.p(2.26, j + .85, .58)], 'paper', 2.2);
  }
  timber(H, R, .51, 6.72, .28, 3.19, .86, .27, 'paper');
  drape(H, R, .89, 7.73, 1.34, .39, .9, .47, 'paper');
  surface(H, R, H.tile(1.1, 7.81, .37, .2, .91), 'coral', .52, .45);
  vessel(H, R, 1.47, 7.42, .92, 12, 23, 'paper', false);
  vessel(H, R, 1.47, 8.52, .92, 10, 15, 'sun', false);
  const sieve = H.p(1.51, 9.44, .91);
  oval(H, R, ...sieve, 14, 6, 'paper', .6);
  for (let k = -2; k <= 2; k++) H.line(R, [[sieve[0] - 10, sieve[1] + k], [sieve[0] + 10, sieve[1] + k]], 'blue', .5);
  H.line(R, [[sieve[0] + 12, sieve[1]], [sieve[0] + 24, sieve[1] - 5]], 'sun', 2);
  floorLight(H, 5.3, 5.2, 153, .4);
  pendant(H, R, 4.9, 3.7, 4.15, 3.12, 'coral', .82);
  caneChair(H, R, 3.86, 2.7, 'coral');
  floorShadow(H, 3.27, 3.94, 4.9, 2.83, .23);
  for (const i of [3.45, 7.61]) for (const j of [4.12, 6.3]) {
    timber(H, R, i, j, .24, .24, .06, 1.05, 'sun');
    metal(H, R, i + .03, j + .03, .18, .18, .06, .19, 'teal');
    surface(H, R, [H.p(i, j + .25, .7), H.p(i + .24, j + .25, .7), H.p(i + .38, j + .25, 1.04), H.p(i, j + .25, 1.04)], 'sun', .59, .75);
  }
  for (const j of [4.16, 6.19]) timber(H, R, 3.57, j, 4.1, .13, .3, .16, 'sun');
  timber(H, R, 3.5, 4.1, 4.34, .17, .87, .25, 'sun');
  timber(H, R, 3.5, 6.3, 4.34, .17, .84, .23, 'sun');
  for (let n = 0; n < 4; n++) timber(H, R, 3.3 + n * 1.18, 3.95, 1.155, 2.66, 1.13, .15, 'sun');
  for (const x of [3.69, 7.51]) {
    metal(H, R, x, 5.7, .19, .72, .96, .08, 'blue');
    for (const j of [5.77, 6.33]) H.dot(...H.p(x + .1, j, 1.06), 1.6, 'paper');
  }
  const trivet = H.p(4.33, 5.09, 1.34);
  for (let n = 0; n < 5; n++) H.outline(R, ell(trivet[0], trivet[1], 12 + n * 2.7, 4.4 + n * 1.1), 'sun', 1.3);
  for (const i of [3.69, 7.41]) timber(H, R, i, 4.4, .24, 2.1, .95, .17, 'blue');
  for (const i of [3.63, 7.45]) metal(H, R, i, 6.37, .24, .23, 1.02, .11, 'coral');
  drape(H, R, 3.58, 4.14, 1.31, 2.14, 1.3, .23, 'paper');
  bowl(H, R, 4.33, 5.09, 1.48, 24, 'paper');
  const foot = H.p(4.33, 5.09, 1.48);
  H.line(R, [[foot[0] - 4, foot[1] + 6], [foot[0] + 2, foot[1] + 6]], 'coral', 2);
  vessel(H, R, 6.95, 4.58, 1.31, 12, 28, 'teal');
  const jug = H.p(6.95, 4.58, 1.31);
  stroke(H, R, [[jug[0] + 10, jug[1] - 23], [jug[0] + 19, jug[1] - 22], [jug[0] + 19, jug[1] - 7], [jug[0] + 10, jug[1] - 5]], 'paper', 2.2);
  for (let k = 0; k < 3; k++) plate(H, R, 7.3, 5.75, 1.36 + k * .065, 12, 'paper');
  caneChair(H, R, 8.97, 8.39, 'teal', true);
  cushion(H, R, 9.02, 8.54, .79, .56, .73, .17, 'paper');
  surface(H, R, H.tile(9.16, 8.73, .23, .2, .916), 'coral', .6);
  const tie = H.p(9.82, 8.47, .86);
  stroke(H, R, [[tie[0], tie[1]], [tie[0] + 3, tie[1] + 12], [tie[0] - 2, tie[1] + 18]], 'sun', 1.7);
  for (const x of [9.18, 10.65]) {
    bentTube(H, R, [[x, 9.98, .06], [x, 10.86, .65], [x, 10.83, .06], [x, 10.03, .65]], 2.6, 'teal');
    H.dot(...H.p(x, 10.44, .35), 2.1, 'sun');
  }
  timber(H, R, 9.08, 9.96, 1.82, 1.01, .6, .08, 'paper');
  for (const j of [9.98, 10.85]) timber(H, R, 9.1, j, 1.78, .09, .69, .13, 'sun');
  for (const x of [9.11, 10.78]) timber(H, R, x, 10.04, .1, .8, .69, .11, 'sun');
  drape(H, R, 9.26, 10.16, .74, .52, .66, .24, 'paper');
  for (let k = 0; k < 3; k++) H.line(R, [H.p(10.16 + k * .15, 10.22, .66), H.p(10.16 + k * .15, 10.69, .66)], 'blue', 1);
  vessel(H, R, 10.56, 10.39, .66, 6, 15, 'coral');
  const flower = H.p(10.56, 10.39, 1.12);
  stroke(H, R, [flower, [flower[0] - 3, flower[1] - 18]], 'teal', 1);
  oval(H, R, flower[0] - 3, flower[1] - 20, 5, 3.5, 'sun', .85);
  floorShadow(H, 10.08, 3.23, 1.37, 2.2, .17);
  cabinetFrame(H, R, 10.12, 3.33, 1.23, 1.89, .04, 1.37, 1, 'coral', (x, j, w, d, z, h) => {
    timber(H, R, x, j, w, d, .66, .08, 'paper');
    for (let n = 0; n < 3; n++) plate(H, R, x + .52, j + .9, .29 + n * .07, 15, 'paper');
    drape(H, R, x + .06, j + .09, .8, 1.2, .77, .11, 'teal');
  });
  bowl(H, R, 10.73, 4.43, 1.48, 18, 'coral');
  const cover = H.p(10.73, 4.43, 1.66);
  shape(H, R, [[cover[0] - 19, cover[1]], [cover[0] - 12, cover[1] - 14], [cover[0], cover[1] - 21], [cover[0] + 13, cover[1] - 14], [cover[0] + 19, cover[1]]], 'paper', .68, .8);
  for (const dx of [-11, 0, 11]) H.line(R, [[cover[0] + dx, cover[1] - 2], [cover[0] + dx * .25, cover[1] - 16]], 'sun', .9);
  oval(H, R, cover[0], cover[1] - 23, 4, 2, 'teal', .7);
  for (const j of [10.01, 10.55]) timber(H, R, 2.62, j, 1.14, .15, .07, .34, 'teal');
  timber(H, R, 2.55, 9.93, 1.27, .9, .4, .1, 'paper');
  const bread = H.p(3.15, 10.33, .49);
  surface(H, R, [[bread[0] - 27, bread[1] - 2], [bread[0] + 24, bread[1] - 2], [bread[0] + 20, bread[1] + 13], [bread[0] - 21, bread[1] + 13]], 'sun', .6, .8);
  oval(H, R, bread[0], bread[1] - 2, 27, 10, 'paper', .9);
  oval(H, R, bread[0] - 4, bread[1] - 6, 18, 10, 'sun', .78);
  for (let n = 0; n < 3; n++) H.line(R, [[bread[0] - 14 + n * 9, bread[1] - 11], [bread[0] - 10 + n * 9, bread[1] - 3]], 'paper', 1.5);
  for (let n = 0; n < 8; n++) H.line(R, [[bread[0] - 19 + n * 5, bread[1] + 5], [bread[0] - 17 + n * 5, bread[1] + 12]], 'teal', .8);
  const drawing = [wallPt(H, 'nw', 10.52, 1.17, -.2), wallPt(H, 'nw', 11.52, 1.17, -.2), wallPt(H, 'nw', 11.52, 2.07, -.2), wallPt(H, 'nw', 10.52, 2.07, -.2)];
  surface(H, R, drawing, 'paper', 1);
  for (const [u, z, ink] of [[10.77, 1.53, 'coral'], [11.18, 1.46, 'teal'], [10.98, 1.84, 'sun']]) oval(H, R, ...wallPt(H, 'nw', u, z, -.22), 6, 5, ink, .7);
}, (H, R, t) => {
  const u = ((t % 20) + 20) % 20, a = ease((u - 4) / 4) * (1 - ease((u - 12) / 6)), end = 6.59 + a * 1.79;
  for (const i of [3.6, 7.57]) timber(H, R, i, 6.59, .18, Math.max(.015, a * 1.9), .88, .13, 'blue');
  timber(H, R, 3.38, 6.61, 4.53, Math.max(.015, a * 1.79), 1.1, .17, 'paper');
  for (const i of [4.12, 7.21]) metal(H, R, i, end - .08, .08, .2, 1.17, .07, 'sun');
  const catchP = H.p(7.71, end - .21, 1.06);
  stroke(H, R, [catchP, [catchP[0] + 5 * (1 - a), catchP[1] + 7 + a * 3]], 'coral', 2.3);
  const hand = H.p(5.92, end + .02, 1.25);
  reach(H, R, 'barcelonaDinnerPull', hand, 'sw', ['coral', .7], a > .95 ? -6 : 10, Math.sin(a * Math.PI * 4) * (a > 0 && a < 1 ? 1 : 0));
  const check = H.p(8.06, 5.6, 1.29);
  reach(H, R, 'barcelonaDinnerCheck', check, 'sw', ['teal', .72], a > .9 ? -18 : 12);
});
room.loopSeconds = 20;
room.stillTime = 10;
export default room;
