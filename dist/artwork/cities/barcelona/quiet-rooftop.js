import { world, shape, oval, stroke, ell, actor, wallPt, starPts } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, cushion, drape, floorLight, slattedSeat, vessel } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { floorShadow, taskLight } from '../joinery.js';

const rest = { x: 0, y: 0, drop: 0, lean: -5, head: 9, al: 63, ar: 68, el: 30, er: 33, ll: -5, lr: 5, kl: 0, kr: 0, roll: 0 };
FIGURES.clips.barcelonaRoofObserver = { dur: 22, keys: [[0, rest], [.2, { ...rest, lean: -7, head: 12 }], [.4, { ...rest, head: -7, ar: 74, er: 42 }], [.6, { ...rest, head: -7, ar: 74, er: 42 }], [.91, rest], [1, rest]] };
const seat = { ...rest, drop: .47, lean: 2, al: 22, ar: 25, el: 34, er: 34, ll: 84, lr: 80, kl: -84, kr: -80, head: -15 };
FIGURES.clips.barcelonaRoofCompanion = { dur: 22, keys: [[0, seat], [.33, seat], [.46, { ...seat, lean: -5, head: -25 }], [.68, { ...seat, lean: -5, head: -25 }], [.92, seat], [1, seat]] };
const ease = v => { const q = Math.max(0, Math.min(1, v)); return q * q * (3 - 2 * q); };

function tube(H, R, cx, cy, angle, t) {
  const X = (x, y) => [cx + Math.cos(angle) * x - Math.sin(angle) * y, cy + Math.sin(angle) * x + Math.cos(angle) * y];
  const poly = (p, ink, tone = .7) => surface(H, R, p.map(([x, y]) => X(x, y)), ink, tone);
  poly([[-57, -12], [34, -12], [34, 12], [-57, 12]], 'teal', .62);
  poly([[-57, 6], [34, 6], [34, 12], [-57, 12]], 'blue', .52);
  for (const x of [-20, 17]) {
    poly([[x - 4, -14], [x + 4, -14], [x + 4, 14], [x - 4, 14]], 'paper', 1);
    poly([[x - 3, 12], [x + 3, 12], [x + 3, 21], [x - 3, 21]], 'sun', .7);
    H.dot(...X(x, 18), 2.1, 'blue');
  }
  H.line(R, [X(-51, -7), X(29, -7)], 'paper', 2);
  poly([[-3, -14], [2, -14], [2, -26], [-3, -26]], 'sun', .68);
  poly([[-6, -28], [23, -28], [23, -35], [-6, -35]], 'teal', .76);
  for (const x of [-6, 23]) {
    H.line(R, [X(x, -36), X(x, -27)], 'paper', 2.2);
    H.dot(...X(x - 1, -31), 1.2, 'blue');
  }
  for (const x of [-20, 17]) {
    H.line(R, [X(x - 5, -17), X(x + 5, -17)], 'blue', 2.1);
    H.dot(...X(x, -18), 2.2, 'coral');
  }
  for (let n = 0; n < 7; n++) H.line(R, [X(36 + n * 1.1, -6), X(36 + n * 1.1, 6)], 'teal', .7);
  H.line(R, [X(36, 8), X(36, 18)], 'blue', 2);
  oval(H, R, ...X(36, 19), 5, 2.8, 'sun', .8);
  poly([[-67, -15], [-55, -15], [-55, 15], [-67, 15]], 'blue', .8);
  const lens = Array.from({ length: 28 }, (_, k) => X(-67 + Math.cos(k * Math.PI / 14) * 4.5, Math.sin(k * Math.PI / 14) * 15));
  surface(H, R, lens, 'paper', .8, 1.1);
  const glass = Array.from({ length: 28 }, (_, k) => X(-67.4 + Math.cos(k * Math.PI / 14) * 3.5, Math.sin(k * Math.PI / 14) * 11.8));
  surface(H, R, glass, 'blue', .8, .8);
  H.line(R, [X(-69, -8), X(-69, 6)], 'paper', 1.8);
  poly([[34, -7], [48, -7], [48, 7], [34, 7]], 'paper', .8);
  poly([[46, -6], [55, -6], [55, 6], [46, 6]], 'blue', .9);
  H.line(R, [X(38, -7), X(38, 7)], 'blue', 2);
  poly([[-28, -17], [-17, -28], [12, -28], [20, -17]], 'blue', .7);
  poly([[-19, -29], [9, -29], [9, -24], [-19, -24]], 'paper', .85);
  H.line(R, [X(-15, 21), X(17, 21)], 'blue', 4);
  stroke(H, R, [X(18, 20), X(35, 35), X(38, 50)], 'sun', 2.5);
  oval(H, R, ...X(38, 51), 5, 5, 'coral', .8);
  const tether = [X(-59, 14), [cx - 47 + Math.sin(t * Math.PI / 11) * 2, cy + 49], [cx - 65, cy + 52]];
  stroke(H, R, tether, 'coral', 1.2);
  oval(H, R, cx - 66, cy + 54, 8, 10, 'blue', .7);
  H.line(R, [[cx - 50, cy + 42], [cx - 44, cy + 45], [cx - 49, cy + 47]], 'paper', 1.1);
  return X(55, 0);
}

const room = world('barcelona-quiet-rooftop', 'A skyline in a shallow tray', { wall: false, floor: 'blue', tone: .55, pattern: 'tiles', accent: 'teal', head: 20 }, (H, R) => {
  for (const side of ['nw', 'ne']) {
    const P = (u, z) => wallPt(H, side, u, z, .13);
    for (let n = 0; n < 7; n++) {
      const u = n * 1.7 + .17, h = 1.28 + n % 3 * .24;
      surface(H, R, [P(u, .7), P(u + 1.29, .7), P(u + 1.29, h), P(u, h)], n % 3 ? 'blue' : 'teal', .75);
      for (let k = 0; k < 3; k++) H.line(R, [P(u + .2 + k * .34, .9), P(u + .2 + k * .34, 1.05)], k === n % 3 ? 'sun' : 'paper', 1.5, { tone: .7 });
      if (n % 3 === 1) metal(H, R, side === 'ne' ? u + .4 : -.2, side === 'ne' ? -.2 : u + .4, .18, .18, h, .57, 'coral');
    }
    masonry(H, R, side, .05, 11.9, 0, .98, 'teal', .39);
    for (let n = 0; n < 12; n++) {
      if (side === 'ne') timber(H, R, n, -.03, .98, .42, .98, .13, 'paper');
      else timber(H, R, -.03, n, .42, .98, .98, .13, 'paper');
    }
  }
  floorShadow(H, .56, 1.56, 3.57, 2.83, .26);
  metal(H, R, .59, 1.63, 3.39, 2.66, .1, .22, 'paper');
  surface(H, R, H.tile(.79, 1.85, 3, 2.2, .34), 'blue', .98, .9);
  for (let n = 0; n < 4; n++) {
    const j = 2.16 + n * .43, z = .28 - n * .03;
    timber(H, R, .88, j, 2.71, .31, z, .05, 'sun');
    H.line(R, [H.p(.93, j + .3, z + .05), H.p(3.55, j + .3, z + .05)], 'paper', 1);
  }
  for (const x of [.62, 3.76]) metal(H, R, x, 1.67, .13, 2.58, .33, .1, 'teal');
  const hatch = (x, q) => H.p(.65 + x, 1.77 + q * .46, .45 + q * .66);
  surface(H, R, [hatch(0, 0), hatch(3.17, 0), hatch(3.17, 2.53), hatch(0, 2.53)], 'teal', .73, 1.3);
  surface(H, R, [hatch(.13, .13), hatch(3.04, .13), hatch(3.04, 2.39), hatch(.13, 2.39)], 'paper', .72, .85);
  for (let n = 0; n < 4; n++) H.line(R, [hatch(.19, .36 + n * .5), hatch(2.98, .36 + n * .5)], 'blue', 1.4);
  for (const x of [.87, 3.53]) bentTube(H, R, [[x, 3.53, .37], [x, 2.8, 1.87]], 2.5, 'sun');
  for (const x of [1.19, 3.16]) metal(H, R, x, 1.67, .28, .29, .4, .11, 'blue');
  H.line(R, [hatch(1.22, 2.14), hatch(1.22, 2.37), hatch(1.89, 2.37), hatch(1.89, 2.14)], 'blue', 3);
  metal(H, R, .32, 1.81, .16, .72, .43, .26, 'coral');
  bentTube(H, R, [[.41, 1.86, .7], [.41, .26, .7], [7.91, .26, .7]], 1.7, 'blue');
  floorShadow(H, 7.6, .5, 3.55, 1.98, .23);
  cabinetFrame(H, R, 7.66, .47, 3.4, 1.46, .23, 2.27, 2, 'teal', (x, j, w, d, z, h, n) => {
    timber(H, R, x, j, w, d, 1.3, .1, 'teal');
    if (n === 0) {
      cushion(H, R, x + .05, j + .13, w - .13, .98, .43, .43, 'paper');
      drape(H, R, x + .09, j + .15, w - .2, .88, .92, .18, 'teal');
      for (let k = 0; k < 3; k++) {
        vessel(H, R, x + .25 + k * .43, j + .67, 1.43, 5.5, 17 + k * 3, 'blue', false);
        oval(H, R, ...H.p(x + .25 + k * .43, j + .67, 2.02 + k * .06), 4.5, 2, 'paper', .9);
      }
    } else {
      for (let k = 0; k < 4; k++) timber(H, R, x + .12 + k * .3, j + .15, .16, .82, .43, .6, 'paper');
      metal(H, R, x + .12, j + .18, 1.22, .84, 1.43, .37, 'coral');
      for (let k = 0; k < 4; k++) H.line(R, [H.p(x + .28 + k * .24, j + 1.04, 1.48), H.p(x + .28 + k * .24, j + 1.04, 1.66)], 'blue', .8);
    }
  });
  metal(H, R, 7.53, .37, 3.66, 1.65, 2.54, .14, 'paper');
  surface(H, R, [H.p(7.63, .44, 2.64), H.p(10.99, .44, 2.64), H.p(10.99, .9, 3.24), H.p(7.63, .9, 3.24)], 'teal', .46);
  bentTube(H, R, [[10.65, 1.49, 2.59], [10.66, .82, 3.13]], 2, 'sun');
  taskLight(H, R, 10.83, 1.53, 1.72, 'coral', -.39);
  floorLight(H, 8.6, 3.7, 93, .28);
  for (const [x, y] of [[2.65, 3.03], [4.71, 2.78], [6.96, 3.03]]) {
    metal(H, R, x - .17, y - .17, .44, .44, .04, .15, 'paper');
    metal(H, R, x, y, .1, .1, .19, 1.98, 'teal');
    for (const z of [.31, 1.25, 2.02]) oval(H, R, ...H.p(x + .05, y + .07, z), 2.4, 3.3, 'sun', .85);
  }
  for (const [x0, y0, x1, y1] of [[2.7, 3.08, 4.76, 2.83], [4.76, 2.83, 7.01, 3.08]]) {
    surface(H, R, [H.p(x0, y0, .71), H.p(x1, y1, .71), H.p(x1, y1, 2.14), H.p(x0, y0, 2.14)], 'teal', .31, 1);
    for (const z of [.75, 2.1]) H.line(R, [H.p(x0, y0, z), H.p(x1, y1, z)], 'paper', 1.4);
    for (let n = 1; n < 5; n++) {
      const f = n / 5;
      H.line(R, [H.p(x0 + (x1 - x0) * f, y0 + (y1 - y0) * f, .81), H.p(x0 + (x1 - x0) * f, y0 + (y1 - y0) * f, 2.04)], 'blue', .65, {tone:.5});
    }
  }
  bentTube(H, R, [[2.7, 3.08, 1.77], [2.3, 4.01, .12]], 1.1, 'coral');
  bentTube(H, R, [[7.01, 3.08, 1.77], [7.44, 3.91, .12]], 1.1, 'coral');
  for (const [x, y] of [[2.25, 3.91], [7.39, 3.81]]) metal(H, R, x, y, .41, .3, .03, .1, 'blue');
  const top = H.p(5.6, 5.55, 1.72);
  const feet = [[4.05, 4.41], [7.19, 5.17], [5.1, 7.38]];
  floorShadow(H, 4.05, 4.4, 3.24, 3.01, .23);
  for (const [n, foot] of feet.entries()) {
    const low = H.p(foot[0], foot[1], .09);
    H.line(R, [top, low], 'blue', 7.8);
    H.line(R, [[top[0] - 1.4, top[1]], [low[0] - 1.4, low[1] - 4]], 'paper', 2.2);
    const mid = [(top[0] + low[0]) / 2, (top[1] + low[1]) / 2];
    H.line(R, [[mid[0] - 4, mid[1]], [mid[0] + 4, mid[1] + 3]], 'coral', 2.2);
    oval(H, R, low[0], low[1], n === 0 ? 8 : n === 1 ? 6 : 10, 3.5, ['paper', 'coral', 'teal'][n], .8);
    H.line(R, [H.p(5.6, 5.55, .85), H.p(foot[0] + (5.6 - foot[0]) * .43, foot[1] + (5.55 - foot[1]) * .43, .77)], 'sun', 2);
  }
  surface(H, R, [H.p(4.77, 4.97, .82), H.p(6.44, 5.15, .82), H.p(5.3, 6.58, .82)], 'paper', .7);
  for (let n = 0; n < 3; n++) oval(H, R, ...H.p(5.22 + n * .3, 5.61, .84), 4, 2, 'blue', .85);
  bentTube(H, R, [[5.6, 5.55, 1.69], [5.6, 5.55, 2.06]], 9, 'teal');
  const axis = H.p(5.6, 5.55, 1.99);
  oval(H, R, ...axis, 13, 13, 'sun', .75);
  oval(H, R, ...axis, 7, 7, 'blue', .6);
  for (let n = 0; n < 14; n++) {
    const a = n * Math.PI / 7;
    H.line(R, [[axis[0] + Math.cos(a) * 9, axis[1] + Math.sin(a) * 9], [axis[0] + Math.cos(a) * 12, axis[1] + Math.sin(a) * 12]], 'paper', .7);
  }
  H.line(R, [[axis[0] + 6, axis[1] + 8], [axis[0] + 17, axis[1] + 16]], 'blue', 3);
  oval(H, R, axis[0] + 19, axis[1] + 17, 6, 4, 'coral', .7);
  const bubble = H.p(5.4, 5.65, 1.7);
  oval(H, R, ...bubble, 5, 2.5, 'paper', .85);
  H.dot(bubble[0] + 1, bubble[1], 1.3, 'teal');
  stroke(H, R, [[axis[0] - 5, axis[1] + 10], [axis[0] - 31, axis[1] + 40]], 'paper', 5);
  shape(H, R, [[axis[0] - 39, axis[1] + 34], [axis[0] - 25, axis[1] + 43], [axis[0] - 34, axis[1] + 57], [axis[0] - 49, axis[1] + 48]], 'blue', .8);
  for (const x of [2.88, 5.08]) {
    bentTube(H, R, [[x, 10.76, .08], [x, 10.54, .46], [x, 9.51, .65]], 2.7, 'teal');
    bentTube(H, R, [[x, 9.55, .12], [x, 10.63, .48]], 2, 'sun');
  }
  for (let n = 0; n < 6; n++) timber(H, R, 2.8, 9.63 + n * .19, 2.39, .15, .63 - n * .039, .07, 'paper');
  for (const x of [2.76, 5.13]) {
    H.line(R, [H.p(x, 9.58, .72), H.p(x, 10.77, .43)], 'blue', 2);
    for (let n = 0; n < 3; n++) H.dot(...H.p(x, 10.09 + n * .15, .54), 1.5, 'coral');
  }
  slattedSeat(H, R, 2.67, 8.83, 2.75, .06, 'teal', 1.05);
  cushion(H, R, 2.75, 8.95, 2.59, .59, .77, .15, 'paper');
  drape(H, R, 2.82, 8.88, .92, .68, .95, .64, 'paper');
  const star = H.p(3.12, 9.63, .47);
  surface(H, R, starPts(star[0], star[1], 5.5, 2.2, 5), 'coral', .6, .6);
  for (const x of [5.93, 7.14]) for (const j of [9.3, 9.8]) metal(H, R, x, j, .11, .11, .04, .39, 'teal');
  timber(H, R, 5.83, 9.21, 1.59, .81, .41, .15, 'teal');
  vessel(H, R, 6.94, 9.59, .58, 6, 21, 'paper', false);
  surface(H, R, H.tile(5.97, 9.34, .7, .49, .59), 'paper', 1);
  for (const [a, b] of [[.1, .1], [.31, .34], [.57, .19]]) H.dot(...H.p(6 + a, 9.36 + b, .6), 1.4, 'blue');
  for (const x of [4.79, 5.09]) vessel(H, R, x, 9.35, .94, 5, 12, 'blue', false);
  stroke(H, R, [H.p(4.75, 9.3, .93), H.p(4.41, 9.59, .83), H.p(4.57, 9.71, .59)], 'coral', 1.4);
  for (const j of [7.02, 9.6]) bentTube(H, R, [[.31, j, .49], [1.17, j, 1.01], [.3, j, 1.03]], 2.6, 'teal');
  timber(H, R, .28, 6.82, .98, 3.01, 1.02, .14, 'paper');
  metal(H, R, .5, 7.1, .56, .56, 1.17, .07, 'teal');
  const prism = [H.p(.53, 7.73, 1.19), H.p(1.04, 7.73, 1.19), H.p(.78, 7.73, 1.54)];
  surface(H, R, prism, 'paper', .45, .8);
  surface(H, R, H.tile(.49, 8.19, .66, .73, 1.18), 'paper', .95);
  surface(H, R, H.tile(.63, 8.4, .23, .2, 1.2), 'coral', .45);
  surface(H, R, H.tile(.72, 8.47, .23, .2, 1.21), 'sun', .53);
  const toy = H.p(.78, 9.35, 1.32);
  stroke(H, R, [[toy[0] - 11, toy[1] - 6], [toy[0] + 9, toy[1] + 2]], 'sun', 7);
  H.line(R, [[toy[0], toy[1] - 1], [toy[0], toy[1] + 8]], 'blue', 1.2);
  for (let k = 0; k < 3; k++) H.line(R, [[toy[0], toy[1] + 6], [toy[0] - 6 + k * 6, toy[1] + 13]], 'coral', 1);
  bentTube(H, R, [[11.32, .31, .52], [11.32, .31, 3.42]], 2, 'blue');
  for (let k = 0; k < 3; k++) H.line(R, [H.p(10.95, .31, 3.18 + k * .14), H.p(11.71, .31, 3.18 + k * .14)], 'blue', 1.1);
  metal(H, R, .09, 10.62, .48, .39, .04, .1, 'blue');
  for (let k = 0; k < 5; k++) H.line(R, [H.p(.13 + k * .09, 10.65, .15), H.p(.13 + k * .09, 10.93, .15)], 'paper', .7);
  floorShadow(H, 8.01, 8.73, 2.13, 1.51, .32);
  metal(H, R, 8.02, 8.72, 2.15, 1.31, .08, .27, 'teal');
  surface(H, R, H.tile(8.15, 8.85, 1.89, 1.04, .36), 'blue', .82, .6);
  surface(H, R, [H.p(8.02, 8.72, .37), H.p(10.17, 8.72, .37), H.p(10.17, 8.28, 1.15), H.p(8.02, 8.28, 1.15)], 'paper', .65, 1);
  for (const x of [8.2, 9.82]) bentTube(H, R, [[x, 8.92, .31], [x, 8.43, .88]], 1.6, 'sun');
  for (let k = 0; k < 3; k++) {
    vessel(H, R, 8.47 + k * .59, 9.33, .4, 6, 13 + k * 3, 'blue', false);
    oval(H, R, ...H.p(8.47 + k * .59, 9.33, .83 + k * .095), 4.9, 2.3, 'paper', .9);
  }
  bentTube(H, R, [[8.69, 10.05, .25], [8.73, 10.29, .25], [9.36, 10.29, .25], [9.4, 10.05, .25]], 2.2, 'coral');
  for (const x of [8.76, 9.37]) timber(H, R, x, 8.89, .07, .99, .39, .13, 'coral');
  metal(H, R, 8.09, 10, .28, .1, .14, .14, 'sun');
  metal(H, R, 9.78, 10, .28, .1, .14, .14, 'sun');
  surface(H, R, [H.p(8.34, 8.66, .72), H.p(9.86, 8.66, .72), H.p(9.86, 8.48, 1.02), H.p(8.34, 8.48, 1.02)], 'blue', .44, .65);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(8.47 + n * .26, 8.66, .73), H.p(8.47 + n * .26, 8.52, .94)], 'sun', .9);
  metal(H, R, 10.33, 4.74, .99, 1.34, .11, .72, 'blue');
  metal(H, R, 10.27, 4.69, 1.11, 1.44, .84, .1, 'paper');
  bentTube(H, R, [[10.51, 5.02, .97], [10.51, 5.02, 1.2], [11.07, 5.02, 1.2], [11.07, 5.02, .97]], 2.2, 'teal');
  for (const x of [10.53, 10.95]) oval(H, R, ...H.p(x, 6.1, .58), 4, 3, 'coral', .7);
  bentTube(H, R, [[10.73, 4.71, .78], [10.74, 4.35, .06], [11.35, 3.89, .06], [11.35, 1.56, .06], [10.87, 1.56, 1.73]], 1.3, 'coral');
  drape(H, R, 10.42, 5.34, .82, .52, .96, .31, 'teal');
  const chart = H.p(7.84, 10.66, .06);
  oval(H, R, ...chart, 20, 9, 'paper', .95);
  H.outline(R, ell(chart[0], chart[1], 15, 6.5), 'teal', .8, { amp: .06 });
  for (let k = 0; k < 8; k++) {
    const a = k * Math.PI / 4;
    H.dot(chart[0] + Math.cos(a) * (7 + k % 2 * 5), chart[1] + Math.sin(a) * 4.5, 1, 'blue');
  }
  H.line(R, [[chart[0] - 5, chart[1] - 2], [chart[0] + 7, chart[1] + 1], [chart[0] + 11, chart[1] - 4]], 'coral', .65);
}, (H, R, t) => {
  const u = ((t % 22) + 22) % 22, lift = ease((u - 4.4) / 4.4) * (1 - ease((u - 13.2) / 6.8));
  const [x, y] = H.p(5.6, 5.55, 2.08), angle = .18 + lift * .22;
  const eye = [x + Math.cos(angle) * 55, y + Math.sin(angle) * 55];
  const fx = eye[0] + 7, fy = eye[1] + 57;
  actor(H, R, (fy / 16 + fx / 32) / 2, (fy / 16 - fx / 32) / 2, u, 'barcelonaRoofObserver', { face: 'sw', shirt: ['teal', .63], hairStyle: 'short', glasses: true, prop: (HH, RR, pts) => {
    const patch = [pts.chest[0] - 10, pts.chest[1] + 10];
    oval(HH, RR, patch[0], patch[1], 4, 3, 'coral', .6);
  } }, 0, 1.45);
  tube(H, R, x, y, angle, u);
  actor(H, R, 4.63, 9.32, u, 'barcelonaRoofCompanion', { face: 'ne', shirt: ['coral', .67], hairStyle: 'bun' }, .42, 1.4);
  const flag = H.p(2.7, 3.08, 2.14);
  surface(H, R, [flag, [flag[0] + 14, flag[1] + 4 + Math.sin(u * Math.PI / 11) * 3], [flag[0] + 11, flag[1] + 10], [flag[0], flag[1] + 5]], 'coral', .64, .65);
});
room.loopSeconds = 22;
room.stillTime = 11;
export default room;
