import { world, shape, oval, stroke, box, cycle, actor, loop, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, cushion, bentTube, spokedWheel, drape, vessel } from '../materials.js';
import { rackFrame } from '../structure.js';
import { caster, floorShadow, taskLight } from '../joinery.js';

const ease = (a, b, u) => { const q = Math.max(0, Math.min(1, (u - a) / (b - a))); return q * q * (3 - 2 * q); };
const base = { x: 0, y: 0, drop: 0, lean: -5, head: 12, al: 25, ar: 68, el: 28, er: 24, ll: -5, lr: 5, kl: 0, kr: 0, roll: 0 };
FIGURES.clips.hanoiPedalInspector = { dur: 18, keys: [[0, base], [.42, { ...base, head: 22, lean: -9 }], [.6, { ...base, head: -9, ar: 50 }], [1, base]] };
function hull(H, R) {
  const edge = [[2.9, 4.07], [3.08, 3.42], [4.1, 2.93], [6.4, 2.88], [8.8, 3.42], [9.47, 4.25], [9.35, 5.72], [8.36, 6.64], [6.22, 7.02], [3.68, 6.67], [2.86, 5.68]];
  const upper = edge.map(([i, j]) => H.p(i, j, 1.5)), lower = edge.map(([i, j]) => H.p(5.9 + (i - 5.9) * .84, 4.85 + (j - 4.85) * .78, .61));
  shape(H, R, [...upper.slice(5), upper[0], lower[0], ...lower.slice(5).reverse()], 'teal', .65, 1.3);
  H.line(R, upper.slice(5), 'paper', 4);
  shape(H, R, upper, 'paper', .98, 1.1);
  const well = [[4.27, 3.77], [7.9, 3.78], [8.4, 4.17], [8.2, 5.91], [7.68, 6.31], [4.34, 6.1], [3.91, 5.66], [3.96, 4.32]].map(([i, j]) => H.p(i, j, 1.52));
  shape(H, R, well, 'blue', .75); shape(H, R, H.tile(4.35, 4.1, 3.2, 1.67, 1.08), 'teal', .45);
  const rim = edge.map(([i, j]) => H.p(5.95 + (i - 5.95) * .93, 4.85 + (j - 4.85) * .89, 1.53));
  H.line(R, [...rim, rim[0]], 'teal', 1.35);
  for (const [i, j, w, d] of [[3.31, 4.62, .46, 1.08], [8.48, 4.39, .39, 1.18], [6.02, 6.39, 1.2, .29]]) {
    shape(H, R, H.tile(i, j, w, d, 1.54), 'teal', .35);
    for (let n = .1; n < d; n += .13) H.line(R, [H.p(i + .07, j + n, 1.56), H.p(i + w - .07, j + n, 1.56)], 'paper', .85);
  }
  for (const [i, j] of [[3.92, 3.35], [7.42, 3.21], [8.55, 6.14]]) {
    metal(H, R, i, j, .36, .15, 1.54, .08, 'teal');
    bentTube(H, R, [[i + .04, j + .08, 1.62], [i + .04, j + .08, 1.8], [i + .31, j + .08, 1.8], [i + .31, j + .08, 1.62]], 1.4, 'blue');
  }
  for (const i of [4.52, 5.4, 6.3, 7.23]) metal(H, R, i, 4.03, .15, 1.97, 1.08, .11, 'paper');
  shape(H, R, [H.p(4.39, 3.88, 1.5), H.p(6.31, 3.88, 1.5), H.p(6.31, 3.61, 2.03), H.p(4.39, 3.61, 2.03)], 'teal', .65);
  H.line(R, [H.p(4.5, 3.64, 2.05), H.p(6.2, 3.64, 2.05)], 'paper', 2.2);
  for (let n = 0; n < 4; n++) H.line(R, [H.p(4.72 + n * .39, 3.88, 1.59), H.p(4.72 + n * .39, 3.68, 1.97)], 'blue', .8);
  H.line(R, [H.p(3.58, 6.43, 1.17), H.p(4.6, 6.73, 1.17), H.p(7.2, 6.69, 1.17), H.p(8.79, 6.14, 1.17)], 'sun', 1.4);
  for (const [i, j] of [[3.65, 6.5], [8.75, 5.95]]) H.line(R, [H.p(i, j, 1.1), H.p(i + .18, j, 1.1)], 'coral', 3);
  oval(H, R, ...H.p(8.1, 6.54, .83), 3.3, 2.4, 'blue', .9); H.line(R, [H.p(8.12, 6.56, .83), H.p(8.31, 6.46, .92)], 'paper', .8);
}
function swan(H, R) {
  const [x, y] = H.p(3.42, 4.04, 1.46);
  const neck = loop([[x - 21, y + 10], [x - 29, y - 4], [x - 27, y - 24], [x - 11, y - 48], [x - 7, y - 72], [x - 16, y - 92], [x - 11, y - 110], [x + 4, y - 117], [x + 21, y - 110], [x + 21, y - 100], [x + 7, y - 96], [x + 5, y - 78], [x + 7, y - 52], [x - 4, y - 22], [x + 17, y + 8]], 2);
  shape(H, R, neck, 'paper', 1, 1.2); stroke(H, R, [[x - 18, y + 3], [x - 19, y - 21], [x - 4, y - 49], [x + 1, y - 74], [x - 7, y - 97]], 'teal', 6, .4);
  shape(H, R, [[x + 17, y - 108], [x + 38, y - 101], [x + 19, y - 97]], 'coral', .85); H.line(R, [[x + 25, y - 105], [x + 25, y - 99]], 'sun', 1.5); H.dot(x + 12, y - 108, 2, 'blue');
  for (let n = 0; n < 4; n++) stroke(H, R, [[x + 4 + n * 9, y + 6], [x + 15 + n * 9, y - 3], [x + 28 + n * 9, y - 2]], 'teal', .85);
}
function mechanism(H, R, turn) {
  const [x, y] = H.p(7.05, 5.6, 1.5), a = turn * Math.PI * 2;
  shape(H, R, [H.p(5.95, 5.4, 1.53), H.p(7.84, 5.4, 1.53), H.p(7.84, 6.04, 1.53), H.p(5.95, 6.04, 1.53)], 'blue', .8);
  for (let n = 0; n < 2; n++) spokedWheel(H, R, x - 27 + n * 38, y - n * 8, n ? 13 : 17, 'sun', a, .72);
  stroke(H, R, [[x - 27, y - 13], [x + 11, y - 19], [x + 19, y - 12], [x + 11, y + 1], [x - 27, y + 14], [x - 41, y + 5], [x - 27, y - 13]], 'blue', 2.8);
  stroke(H, R, [[x - 27, y - 13], [x + 11, y - 19], [x + 19, y - 12], [x + 11, y + 1], [x - 27, y + 14]], 'paper', .9);
  for (const [dx, dy] of [[-43, -2], [18, -14]]) {
    shape(H, R, [[x + dx - 5, y + dy + 8], [x + dx + 5, y + dy + 8], [x + dx + 5, y + dy - 3], [x + dx - 5, y + dy - 3]], 'teal', .65);
    H.dot(x + dx, y + dy + 2, 2.1, 'sun');
  }
  H.line(R, [[x + 11, y - 8], [x + 34, y - 18]], 'blue', 5);
  H.line(R, [[x + 11, y - 10], [x + 34, y - 20]], 'paper', 1.1);
  for (let n = 0; n < 6; n++) H.line(R, [[x - 25 + n * 6, y - 14 - n], [x - 23 + n * 6, y - 10 - n]], 'sun', 1);
  const p1 = [x - 27 + Math.cos(a) * 17, y + Math.sin(a) * 12], p2 = [x - 27 - Math.cos(a) * 17, y - Math.sin(a) * 12];
  for (const p of [p1, p2]) { H.line(R, [[x - 27, y], p], 'blue', 4); H.line(R, [[p[0] - 7, p[1]], [p[0] + 7, p[1]]], 'teal', 5); H.line(R, [[p[0] - 5, p[1] - 2], [p[0] + 5, p[1] - 2]], 'paper', .8); }
  H.line(R, [[p1[0] - 3, p1[1] - 4], [p1[0] + 5, p1[1] - 4]], 'coral', 3);
  H.line(R, [[p1[0] + 1, p1[1] - 5], [p1[0] + 1, p1[1] + 2]], 'paper', 1);
  oval(H, R, x - 27, y, 3.5, 3.2, 'paper', 1);
  return [p1, p2];
}
const room = world('hanoi-park-pedal-store', 'The swan waits ashore', { floor: 'sun', tone: .15, wall: false, head: 68, pattern: 'boards' }, (H, R) => {
  for (const j of [0, .28]) { timber(H, R, .15, j, 11.45, .16, .1, 1.05, 'teal'); }
  for (let i = .3; i < 12; i += 1.4) { timber(H, R, i, .18, .18, .18, .07, 2.2, 'teal'); bentTube(H, R, [[i, .2, 1.1], [i + 1.18, .2, 2.12]], 1, 'blue'); }
  bentTube(H, R, [[.25, .24, 2.25], [5.8, .24, 2.42], [11.7, .24, 2.25]], 4, 'teal');
  for (const j of [.3, 3.6, 7.8]) timber(H, R, .17, j, .22, .23, .02, 3.25, 'blue');
  timber(H, R, .16, .3, .25, 7.67, 3.13, .21, 'teal');
  for (let j = .4; j < 7.6; j += .42) shape(H, R, [H.p(.31, j, 2.83), H.p(1.25, j, 3.02), H.p(1.25, j + .35, 3.04), H.p(.31, j + .35, 2.85)], j % .84 < .42 ? 'coral' : 'paper', .55, .6);
  for (const j of [.49, 3.5, 7.55]) {
    bentTube(H, R, [[.28, j, 2.7], [1.22, j, 3.02], [.28, j, 3.2]], 2.5, 'teal');
    metal(H, R, .12, j, .33, .24, .12, .13, 'paper');
  }
  for (const j of [1.14, 2.28, 3.42, 4.56, 5.7, 6.84]) H.line(R, [H.p(.22, j, 1.18), H.p(.22, j, 2.51)], 'teal', 2.4);
  shape(H, R, [H.p(.24, .56, 1.02), H.p(.24, 7.66, 1.02), H.p(.24, 7.66, 2.48), H.p(.24, .56, 2.48)], 'teal', .13, .65);
  for (const j of [1.17, 1.54]) bentTube(H, R, [[.32, j, 1.02], [.48, j, 2.7], [1.62, j, 2.7], [1.62, j, 1.09]], 1.6, 'sun');
  drape(H, R, .31, 4.23, .65, 1.54, 2.56, .32, 'coral');
  H.line(R, [H.p(.36, 4.5, 2.69), H.p(.78, 4.5, 2.44)], 'blue', 1.8);
  const cleat = H.p(.33, 6.38, 2.2); H.line(R, [[cleat[0] - 9, cleat[1]], [cleat[0] + 9, cleat[1]]], 'blue', 3);
  for (let n = 0; n < 3; n++) H.outline(R, ell(cleat[0], cleat[1] + 14, 12 + n * 2, 17 + n * 2), 'sun', 1.2);
  for (const j of [5.91, 6.32, 6.72]) { const p = H.p(.45, j, 1.47); H.line(R, [p, [p[0] + 12, p[1] + 26]], 'blue', 2.4); oval(H, R, p[0] + 12, p[1] + 29, 7, 4, 'coral', .6); }
  for (const i of [3.27, 7.38]) for (const j of [.84, 1.8]) timber(H, R, i, j, .18, .18, .03, 1.09, 'sun');
  timber(H, R, 3.27, .84, 4.28, 1.1, .3, .1, 'teal');
  for (const [i, ink] of [[3.44, 'coral'], [4.94, 'paper'], [6.3, 'teal']]) { box(H, R, i, .94, 1.07, .82, .41, .3, ink, .55); H.line(R, [H.p(i + .32, 1.78, .58), H.p(i + .73, 1.78, .58)], 'sun', 1.8); }
  timber(H, R, 3.1, .64, 4.64, 1.45, 1.12, .12, 'sun');
  shape(H, R, H.tile(3.42, .89, 1.59, .98, 1.26), 'paper', 1);
  for (const [i, j] of [[3.8, 1.14], [4.52, 1.61]]) { const p = H.p(i, j, 1.28); H.line(R, [[p[0] - 12, p[1] - 5], [p[0] + 12, p[1] + 5]], 'blue', 2.5); H.outline(R, ell(p[0] - 13, p[1] - 5, 4, 3), 'sun', 1.8); }
  vessel(H, R, 5.71, 1.06, 1.24, 7, 15, 'teal');
  H.line(R, [H.p(5.66, 1.07, 1.51), H.p(5.33, 1.05, 1.85)], 'sun', 3);
  box(H, R, 6.18, .9, 1.13, .73, 1.24, .12, 'blue', .7);
  for (let n = 0; n < 4; n++) { const q = H.p(6.41 + n % 2 * .43, 1.09 + Math.floor(n / 2) * .32, 1.39); H.outline(R, ell(...q, 4, 2.5), 'paper', 1.2); }
  taskLight(H, R, 7.34, .94, 1.25, 'coral', -.55);
  for (const i of [3.62, 8.43]) { timber(H, R, i, 3.23, .36, 3.98, .18, .28, 'sun'); for (const j of [3.47, 6.72]) { timber(H, R, i - .12, j, .6, .54, .04, .17, 'blue'); shape(H, R, [H.p(i - .03, j, .45), H.p(i + .38, j, .45), H.p(i + .38, j + .46, .78), H.p(i - .03, j + .46, .78)], 'coral', .52); } }
  floorShadow(H, 2.9, 3.4, 6.1, 3.25, .22);
  rackFrame(H, R, 8.45, .6, 2.72, 1.2, .04, [.2, 3.3], 'teal');
  for (let i = 8.58; i < 11.1; i += .25) for (let z = .5; z < 2.7; z += .3) H.line(R, [H.p(i, .72, z), H.p(i + .24, .72, z + .3)], 'paper', .55, { tone: .65 });
  for (let n = 0; n < 3; n++) { const i = 8.65 + n * .85, p = H.p(i, 1.42, 2.82); H.line(R, [H.p(i, .74, 2.94), p], 'blue', 2); shape(H, R, [[p[0] - 14, p[1] + 2], [p[0] - 5, p[1] - 5], [p[0] - 2, p[1] + 6], [p[0] + 3, p[1] + 6], [p[0] + 6, p[1] - 5], [p[0] + 15, p[1] + 2], [p[0] + 13, p[1] + 39], [p[0] - 13, p[1] + 39]], n === 1 ? 'sun' : 'coral', .7); H.line(R, [[p[0], p[1] + 6], [p[0], p[1] + 37]], 'blue', 1); for (const dy of [20, 30]) H.line(R, [[p[0] - 12, p[1] + dy], [p[0] + 12, p[1] + dy]], 'blue', 2); }
  metal(H, R, 8.38, 1.6, 2.9, .25, .18, .14, 'blue'); for (let n = 0; n < 3; n++) cushion(H, R, 8.68 + n * .73, .74, .64, .81, 3.4, .08, n === 1 ? 'coral' : 'paper');
  for (const i of [8.75, 9.18]) { const p = H.p(i, 1.38, .31); shape(H, R, [[p[0] - 5, p[1]], [p[0] + 8, p[1]], [p[0] + 8, p[1] - 4], [p[0] + 1, p[1] - 7], [p[0] + 1, p[1] - 20], [p[0] - 5, p[1] - 20]], 'blue', .7, .7); H.line(R, [[p[0] - 4, p[1] - 18], [p[0], p[1] - 18]], 'paper', .8); }
  for (const i of [8.6, 10.96]) bentTube(H, R, [[i, .73, .24], [i, 1.74, 2.82]], 1.1, 'blue');
  metal(H, R, 9.82, 1.44, 1.14, .38, .41, .06, 'sun');
  for (const i of [10.01, 10.46]) { const p = H.p(i, 1.59, .5); H.outline(R, ell(...p, 5, 3), 'coral', 1.6); }
  for (const i of [8.76, 9.6, 10.43]) { const p = H.p(i, .69, 3.15); shape(H, R, [[p[0] - 4, p[1] + 2], [p[0] + 4, p[1] + 2], [p[0] + 3, p[1] - 6], [p[0] - 3, p[1] - 6]], 'sun', .75); }
  for (const [i, j] of [[9.93, 8.45], [11.03, 8.45], [9.93, 10.4], [11.03, 10.4]]) caster(H, R, i, j);
  metal(H, R, 9.8, 8.3, 1.35, 2.3, .22, .13, 'teal'); bentTube(H, R, [[9.88, 8.35, .35], [9.88, 8.35, 1.75], [11.09, 8.35, 1.75], [11.09, 8.35, .35]], 2.5, 'teal'); cushion(H, R, 9.91, 9.15, 1.13, .96, .36, .15, 'blue');
  for (const i of [1.08, 3.86]) for (const j of [8.51, 9.83]) timber(H, R, i, j, .2, .2, .06, .45, 'teal');
  timber(H, R, 1.11, 8.53, 2.93, 1.45, .12, .09, 'sun');
  for (const j of [8.78, 9.3]) box(H, R, 1.23, j, 1.57, .43, .22, .17, 'paper', .85);
  timber(H, R, 1.05, 8.45, 3.07, 1.67, .48, .1, 'teal'); cushion(H, R, 1.2, 8.58, 1.01, 1.18, .52, .13, 'blue'); box(H, R, 2.53, 8.64, .68, .53, .53, .09, 'sun', .65); H.line(R, [H.p(2.77, 9.44, .55), H.p(3.58, 9.56, .55)], 'coral', 4); oval(H, R, ...H.p(3.37, 8.95, .61), 8, 4, 'paper', 1);
  shape(H, R, [H.p(1.19, 8.54, .65), H.p(2.25, 8.54, .65), H.p(2.25, 8.25, 1.25), H.p(1.19, 8.25, 1.25)], 'blue', .6);
  H.line(R, [H.p(1.28, 8.27, 1.27), H.p(2.14, 8.27, 1.27)], 'teal', 3);
  for (let n = 0; n < 3; n++) H.line(R, [H.p(2.59, 8.74 + n * .12, .64), H.p(3.08, 8.74 + n * .12, .64)], 'paper', 1);
  const strap = H.p(3.44, 9.73, .61); H.line(R, [[strap[0] - 11, strap[1]], [strap[0] + 7, strap[1] + 6]], 'blue', 3.5); H.outline(R, [[strap[0] + 4, strap[1] + 1], [strap[0] + 12, strap[1] + 5], [strap[0] + 9, strap[1] + 10], [strap[0] + 1, strap[1] + 6]], 'sun', 1.7);
  drape(H, R, 3.37, 8.49, .54, .49, .61, .3, 'paper');
  metal(H, R, 9.94, 9.17, 1.07, .92, .54, .06, 'paper');
  shape(H, R, H.tile(10.06, 9.29, .83, .66, .61), 'blue', .45);
  for (const i of [10.1, 10.83]) for (const j of [9.32, 9.88]) H.dot(...H.p(i, j, .63), 1.7, 'sun');
  H.line(R, [H.p(10.22, 9.65, .65), H.p(10.67, 9.65, .65)], 'paper', 2.4);
  const brush = H.p(10.34, 10.25, .43); H.line(R, [[brush[0] - 7, brush[1]], [brush[0] + 12, brush[1] - 19]], 'sun', 2.8); for (let n = 0; n < 5; n++) H.line(R, [[brush[0] - 11 + n * 3, brush[1] - 1], [brush[0] - 8 + n * 3, brush[1] + 7]], 'blue', 1.2);
  for (let n = 0; n < 4; n++) H.outline(R, ell(...H.p(5.1, 10.45, .03), 18 + n * 3, 8 + n * 1.3), 'coral', 1.5);
  H.line(R, [H.p(5.75, 10.5, .04), H.p(6.9, 10.8, .08), H.p(7.7, 10.3, .09)], 'coral', 2); H.line(R, [H.p(.35, 10.85, .08), H.p(2.1, 10.85, .08)], 'blue', 4); for (let k = 0; k < 9; k++) H.line(R, [H.p(.44 + k * .17, 10.72, .08), H.p(.44 + k * .17, 10.97, .08)], 'paper', .8);
}, (H, R, t) => {
  const u = cycle(t, 18) * 18, turn = ease(3.6, 7.2, u);
  hull(H, R); cushion(H, R, 4.55, 4.05, 1.61, .94, 1.5, .14 - .035 * ease(0, 3.6, u) * (1 - ease(10.8, 16, u)), 'blue');
  const patch = H.p(4.92, 4.51, 1.67); stroke(H, R, [[patch[0] - 6, patch[1] - 2], [patch[0] - 1, patch[1] + 4], [patch[0] + 7, patch[1] - 1]], 'coral', 2);
  const pedals = mechanism(H, R, turn), [x, y] = H.p(5.63, 4.74, 1.13);
  for (let n = 0; n < 2; n++) { const hip = [x + (n ? 7 : -7), y - 10]; stroke(H, R, [hip, [(hip[0] + pedals[n][0]) / 2 + 10, Math.min(hip[1], pedals[n][1]) - 8], pedals[n]], 'blue', 8); H.line(R, [[pedals[n][0] - 6, pedals[n][1] - 3], [pedals[n][0] + 6, pedals[n][1] - 3]], 'paper', 5); }
  shape(H, R, [[x - 10, y - 41], [x + 11, y - 41], [x + 13, y - 9], [x - 10, y - 9]], 'sun', .8); oval(H, R, x + 2, y - 53, 9, 10, 'coral', .28); shape(H, R, [[x - 8, y - 54], [x - 8, y - 61], [x + 4, y - 65], [x + 13, y - 57], [x + 17, y - 54]], 'teal', .8); H.dot(x + 8, y - 52, 1, 'blue');
  const grip = H.p(6.55, 4.65, 1.84); bentTube(H, R, [[6.48, 4.67, 1.1], [6.55, 4.65, 1.84], [6.92, 4.65, 1.84]], 3, 'blue'); H.line(R, [[grip[0] + 6, grip[1] + 3], [grip[0] + 13, grip[1] + 7]], 'paper', 1.4);
  for (const dx of [-7, 8]) { stroke(H, R, [[x + dx, y - 36], [x + dx + 13, y - 21], grip], 'blue', 6.5); stroke(H, R, [[x + dx, y - 36], [x + dx + 13, y - 21], grip], 'sun', 4.5); } oval(H, R, ...grip, 3, 2.5, 'coral', .3);
  swan(H, R);
  actor(H, R, 8.66, 7.51, u, 'hanoiPedalInspector', { face: 'sw', shirt: ['teal', .7], pants: ['blue', .7], hairStyle: 'pony' }, 0, 1.65);
  const clip = H.p(7.75, 6, 1.56); H.outline(R, ell(...clip, 5, 2), 'coral', 1.3); H.line(R, [[clip[0] - 4, clip[1]], [clip[0] + 4, clip[1]]], 'sun', .8);
  const b = H.p(9.63, 1.51, 1.96), s = Math.sin(u * Math.PI / 9) * 3; H.line(R, [b, [b[0] + s, b[1] + 11]], 'coral', 2); shape(H, R, [[b[0] + s - 3, b[1] + 10], [b[0] + s + 3, b[1] + 10], [b[0] + s + 3, b[1] + 15], [b[0] + s - 3, b[1] + 15]], 'sun', .8);
});
room.loopSeconds = 18;
room.stillTime = 10;
export default room;
