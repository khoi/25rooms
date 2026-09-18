import { world, shape, oval, stroke, box, cycle, actor, wallPt, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, cushion, benchFrame, bentTube, drape, vessel } from '../materials.js';
import { windowBay, recessedFrame, taskLight, caster } from '../joinery.js';

const ease = (a, b, u) => { const q = Math.max(0, Math.min(1, (u - a) / (b - a))); return q * q * (3 - 2 * q); };
const base = { x: 0, y: 0, drop: .47, lean: -4, head: 10, al: 52, ar: 56, el: 42, er: 37, ll: 84, lr: 80, kl: -84, kr: -80, roll: 0 };
FIGURES.clips.hanoiMuseumVisitor = { dur: 22, keys: [[0, base], [.46, { ...base, head: 25, lean: -10 }], [.62, { ...base, head: -3, lean: -7 }], [1, base]] };
function basket(H, R, i, j, z, scale = 1) {
  const [x, y] = H.p(i, j, z), s = scale;
  const outer = [[x - 28 * s, y + 3 * s], [x - 22 * s, y - 14 * s], [x - 7 * s, y - 21 * s], [x + 18 * s, y - 17 * s], [x + 29 * s, y - 3 * s], [x + 20 * s, y + 9 * s], [x, y + 13 * s]];
  shape(H, R, outer, 'sun', .49); H.clip(outer, () => { for (let n = -4; n < 5; n++) { stroke(H, R, [[x - 31 * s, y + n * 5 * s], [x, y + (n * 5 + 4) * s], [x + 31 * s, y + (n * 5 - 1) * s]], 'coral', 1 * s); H.line(R, [[x + n * 7 * s, y - 25 * s], [x + (n * 7 - 5) * s, y + 19 * s]], 'paper', 1.2 * s); } });
  stroke(H, R, [outer[0], outer[1], outer[2], outer[3], outer[4]], 'blue', 3 * s); stroke(H, R, [outer[0], outer[1], outer[2], outer[3], outer[4]], 'sun', 1.5 * s);
  for (let n = 0; n < 5; n++) H.line(R, [[x + (9 + n * 2.2) * s, y - 19 * s], [x + (8 + n * 2.2) * s, y - 12 * s]], 'coral', 1.4 * s);
}
function tray(H, R, amount) {
  const j = 3.64 + amount * 1.82;
  for (const i of [3.26, 8.26]) { metal(H, R, i, 3.55, .13, 1.98 + amount * 1.82, .99, .12, 'blue'); H.line(R, [H.p(i + .07, 5.16, 1.1), H.p(i + .07, 5.46 + amount * 1.82, 1.1)], 'paper', 1); }
  timber(H, R, 3.13, j, 5.43, 2.12, 1.08, .15, 'sun'); shape(H, R, H.tile(3.3, j + .13, 5.08, 1.8, 1.24), 'paper', 1);
  for (const i of [3.13, 8.43]) timber(H, R, i, j, .13, 2.12, 1.23, .18, 'sun'); timber(H, R, 3.12, j + 2.01, 5.43, .17, 1.09, .34, 'sun');
  for (const i of [4.85, 6.82]) timber(H, R, i, j + .14, .09, 1.78, 1.24, .11, 'paper');
  cushion(H, R, 5.06, j + .23, 1.54, 1.48, 1.25, .11, 'paper'); basket(H, R, 5.85, j + .97, 1.39, .74);
  cushion(H, R, 3.49, j + .28, 1.11, .66, 1.25, .07, 'paper');
  const comb = H.p(4.02, j + .69, 1.34); H.line(R, [[comb[0] - 15, comb[1] - 5], [comb[0] + 14, comb[1] + 9]], 'sun', 4); for (let n = 0; n < 8; n++) H.line(R, [[comb[0] - 13 + n * 3.6, comb[1] - 4 + n * 1.75], [comb[0] - 18 + n * 3.6, comb[1] + 3 + n * 1.75]], n === 4 ? 'coral' : 'sun', 2.1);
  box(H, R, 3.56, j + 1.15, .97, .58, 1.27, .22, 'coral', .44); H.line(R, [H.p(4.02, j + 1.16, 1.5), H.p(4.02, j + 1.71, 1.5)], 'paper', 1); oval(H, R, ...H.p(4.02, j + 1.73, 1.37), 2, 1.6, 'sun', .8);
  const bowl = H.p(7.43, j + .66, 1.33); oval(H, R, bowl[0], bowl[1], 17, 8, 'paper', 1); oval(H, R, bowl[0], bowl[1] - 5, 18, 9, 'teal', .44); oval(H, R, bowl[0], bowl[1] - 5, 13.5, 6, 'paper', 1); H.line(R, [[bowl[0] + 12, bowl[1] - 10], [bowl[0] + 15, bowl[1] - 8]], 'blue', 2);
  shape(H, R, H.tile(7.07, j + 1.17, .98, .54, 1.29), 'teal', .39); shape(H, R, H.tile(7.34, j + 1.27, .27, .24, 1.3), 'coral', .43); for (let n = 0; n < 5; n++) H.line(R, [H.p(7.31 + n * .075, j + 1.25, 1.32), H.p(7.31 + n * .075, j + 1.54, 1.32)], 'sun', .65);
  for (const [i, w] of [[3.35, 1.34], [4.98, 1.71], [6.97, 1.22]]) {
    H.line(R, [H.p(i, j + .12, 1.31), H.p(i + w, j + .12, 1.31), H.p(i + w, j + 1.87, 1.31)], 'sun', .8);
  }
  const rim = H.p(5.85, j + .97, 1.38);
  H.line(R, [[rim[0] - 21, rim[1] + 4], [rim[0] - 14, rim[1] + 11], [rim[0] + 2, rim[1] + 13], [rim[0] + 18, rim[1] + 6]], 'teal', 1.8);
  for (const [i, z] of [[3.29, 1.26], [8.28, 1.26]]) for (const k of [.27, 1.81]) H.dot(...H.p(i, j + k, z), 1.3, 'blue');
  const grip = H.p(5.75, j + 2.21, 1.18); stroke(H, R, [[grip[0] - 19, grip[1] - 2], [grip[0] - 19, grip[1] + 6], [grip[0] + 19, grip[1] + 6], [grip[0] + 19, grip[1] - 2]], 'blue', 2.6);
  metal(H, R, 3.38, j + 1.84, .19, .16, .96, .1, 'coral');
  return { grip, point: H.p(5.12, j + .75, 1.5), j };
}
function curator(H, R, amount, point, T) {
  const [x, y] = H.p(4.7, 6.45 + amount * .5, 0), hand = [T.grip[0] - 15, T.grip[1] + 5];
  for (const dx of [-7, 7]) { stroke(H, R, [[x + dx, y - 26], [x + dx + amount * (dx < 0 ? -3 : 3), y]], 'blue', 7); oval(H, R, x + dx + 3, y + 1, 6, 2.4, 'blue', .8); }
  shape(H, R, [[x - 11, y - 52], [x + 10, y - 52], [x + 12, y - 24], [x - 12, y - 24]], 'teal', .7); oval(H, R, x, y - 64, 9, 10, 'coral', .27); shape(H, R, [[x - 9, y - 65], [x - 10, y - 71], [x, y - 77], [x + 9, y - 71], [x + 7, y - 67]], 'blue', .85); H.dot(x + 4, y - 63, 1, 'blue');
  const right = [hand[0] * (1 - point) + T.point[0] * point, hand[1] * (1 - point) + T.point[1] * point];
  for (const [n, p] of [hand, right].entries()) { const a = [x + (n ? 8 : -7), y - 48], b = [(a[0] + p[0]) / 2, Math.max(a[1], p[1]) + 5]; stroke(H, R, [a, b, p], 'blue', 6); stroke(H, R, [a, b, p], 'teal', 4.5); oval(H, R, ...p, 2.8, 2.2, 'coral', .28); }
}
const room = world('hanoi-museum-drawer', 'The underside of a memory', { floor: 'paper', tone: .7, wall: 'paper', wallTone: .75, height: 4.03, head: 30, pattern: 'tiles' }, (H, R) => {
  for (const side of ['ne', 'nw']) { const P = (a, z) => wallPt(H, side, a, z, -.09); shape(H, R, [P(.1, .08), P(11.85, .08), P(11.85, .66), P(.1, .57)], 'teal', .18); H.line(R, [P(.1, .09), P(11.85, .09)], 'blue', 2); }
  for (const side of ['nw', 'ne']) {
    const P = (a, z) => wallPt(H, side, a, z, -.14);
    H.line(R, [P(.1, 3.89), P(11.84, 3.89)], 'teal', 4);
    H.line(R, [P(.1, 3.96), P(11.84, 3.96)], 'sun', 1.4);
  }
  const vent = recessedFrame(H, R, 'ne', .86, 2.94, 3.22, .39, 'teal');
  for (let u = .2; u < 2.8; u += .2) H.line(R, [vent(u, .07), vent(u, .32)], 'sun', 1.5);
  timber(H, R, .2, 1.93, .88, 2.5, 1.37, .13, 'sun');
  windowBay(H, R, 'nw', 2.04, 2.3, 1.5, 2.23, { divisions: 2, ink: 'sun' });
  const latch = H.p(.41, 3.93, 2.68); H.line(R, [[latch[0], latch[1] - 5], [latch[0] + 4, latch[1] + 1], [latch[0] + 10, latch[1] + 1]], 'blue', 1.6);
  box(H, R, .35, 2.41, .47, .61, 1.51, .12, 'paper', 1);
  for (const j of [2.58, 2.85]) H.line(R, [H.p(.36, j, 1.64), H.p(.8, j, 1.64)], 'coral', .7);
  const wallTray = recessedFrame(H, R, 'ne', 1.2, 2.51, 1.3, 1.43, 'sun');
  for (const [u, v, w] of [[.2, .25, .89], [1.29, .25, .91]]) {
    shape(H, R, [wallTray(u, v), wallTray(u + w, v), wallTray(u + w, 1.16), wallTray(u, 1.16)], 'paper', 1, .6);
    H.line(R, [wallTray(u + .19, .39), wallTray(u + .19, .98), wallTray(u + w - .14, .98), wallTray(u + w - .14, .39)], 'teal', 2);
    oval(H, R, ...wallTray(u + w * .5, .68), 8, 11, 'sun', .5);
  }
  box(H, R, 5.2, .25, 6.06, 1.65, .12, 3.42, 'sun', .45);
  for (let col = 0; col < 3; col++) { const i = 5.37 + col * 1.94; shape(H, R, H.faceI(i, 1.92, 1.73, .36, 3.36), 'blue', .67); for (const z of [.44, 1.37, 2.31, 3.35]) timber(H, R, i, .37, 1.73, 1.65, z, .09, 'sun'); for (let row = 0; row < 3; row++) { const z = .54 + row * .94; if (col === 1 && row === 0) { for (let n = 0; n < 5; n++) box(H, R, i + .08, .6, 1.42, 1.1, z + n * .11, .055, n % 2 ? 'paper' : 'teal', .55); } else { box(H, R, i + .13, .73, 1.36, .94, z, .61, row % 2 ? 'paper' : 'teal', .5); box(H, R, i + .09, .69, 1.44, 1.02, z + .6, .07, 'paper', 1); shape(H, R, H.faceI(i + .7, 1.69, .18, z + .21, z + .39), col === 2 ? 'coral' : 'sun', .8); } } }
  for (const i of [5.25, 11.15]) H.line(R, [H.p(i, 1.96, .14), H.p(i, 1.96, 3.61)], 'paper', 2); H.line(R, [H.p(5.3, 1.97, 3.59), H.p(11.13, 1.97, 3.59)], 'blue', 2);
  for (const i of [5.28, 7.24, 9.2, 11.17]) {
    timber(H, R, i, 1.87, .1, .12, .24, 3.26, 'sun');
    H.line(R, [H.p(i + .015, 2.01, .32), H.p(i + .015, 2.01, 3.4)], 'paper', .95);
  }
  for (const z of [.34, 3.42]) timber(H, R, 5.26, 1.89, 5.96, .14, z, .1, 'sun');
  shape(H, R, [H.p(5.3, 1.99, .35), H.p(4.71, 2.96, .35), H.p(4.71, 2.96, 3.32), H.p(5.3, 1.99, 3.32)], 'teal', .19);
  H.line(R, [H.p(4.74, 2.9, .49), H.p(4.74, 2.9, 3.17)], 'sun', 2.8);
  for (const z of [.58, 3.08]) H.line(R, [H.p(5.24, 1.96, z), H.p(5.09, 2.26, z)], 'blue', 2.8);
  H.line(R, [H.p(4.8, 2.81, 1.6), H.p(4.8, 2.81, 1.97)], 'blue', 2.1);
  timber(H, R, .22, 5.69, .89, 5.14, 3.16, .12, 'sun');
  for (const j of [5.81, 8.1, 10.62]) bentTube(H, R, [[.11, j, 2.87], [.9, j, 3.17]], 1.6, 'blue');
  for (const j of [6.16, 9.69]) { box(H, R, .39, j, .51, .75, 3.29, .19, 'paper', 1); H.line(R, [H.p(.43, j + .09, 3.49), H.p(.84, j + .62, 3.49)], 'teal', .9); }
  const mount = H.p(.68, 8.16, 3.38); H.line(R, [[mount[0] - 13, mount[1] + 4], [mount[0] - 13, mount[1] - 11], [mount[0] + 13, mount[1] - 11], [mount[0] + 13, mount[1] + 4]], 'teal', 2); H.line(R, [[mount[0] - 8, mount[1] - 7], [mount[0] + 8, mount[1] + 1]], 'coral', .9);
  timber(H, R, .27, 5.9, 1.22, 4.85, .23, .1, 'sun'); for (const j of [6.12, 10.47]) timber(H, R, .42, j, .24, .2, .08, 2.3, 'sun'); timber(H, R, .31, 5.91, 1.27, 4.84, 2.3, .13, 'sun');
  for (let n = 0; n < 4; n++) { const p = H.p(.9, 6.48 + n * 1.08, 2.5); H.line(R, [[p[0] - 11, p[1] + 4], [p[0] + 13, p[1] - 8]], n % 2 ? 'paper' : 'teal', 14); oval(H, R, p[0] + 13, p[1] - 8, 7, 5, 'paper', 1); oval(H, R, p[0] + 13, p[1] - 8, 2.5, 2, 'blue', .6); }
  const frame = recessedFrame(H, R, 'nw', 6.01, 3.81, .65, 1.38, 'teal'); for (let n = 0; n < 3; n++) { shape(H, R, [frame(.22 + n * 1.1, .2), frame(1.15 + n * 1.1, .2), frame(1.15 + n * 1.1, 1.1), frame(.22 + n * 1.1, 1.1)], 'paper', 1); oval(H, R, ...frame(.69 + n * 1.1, .62), 8, 11, 'blue', .2); }
  for (const j of [6.16, 7.46, 8.75, 10.08]) {
    box(H, R, .51, j, .78, .86, .37, .73, 'teal', .28);
    for (let n = 0; n < 4; n++) shape(H, R, H.faceJ(1.31, j + .06 + n * .16, .12, .48, 1.03), n % 2 ? 'paper' : 'sun', .8, .5);
  }
  for (const i of [3.12, 8.39]) for (const j of [3.41, 5.24]) timber(H, R, i, j, .24, .24, .03, 1.6, 'sun'); timber(H, R, 3.11, 3.43, 5.54, .15, .39, .19, 'sun');
  timber(H, R, 3.27, 3.58, 5.09, 1.71, .26, .12, 'teal');
  shape(H, R, H.faceI(3.4, 5.32, 4.83, .43, .9), 'blue', .68);
  for (let n = 0; n < 4; n++) {
    const i = 3.47 + n * 1.18;
    shape(H, R, H.faceI(i, 5.35, 1.06, .47, .81), 'teal', .48);
    H.line(R, [H.p(i + .36, 5.38, .68), H.p(i + .7, 5.38, .68)], 'sun', 1.8);
  }
  shape(H, R, H.faceI(3.23, 5.5, 5.2, .68, 1.39), 'blue', .66); for (const i of [3.3, 8.19]) metal(H, R, i, 3.63, .19, 1.84, 1.05, .13, 'blue');
  taskLight(H, R, 8.81, 3.68, 1.59, 'teal', -.9);
  for (const i of [3.14, 8.39]) for (const j of [3.49, 5.24]) { metal(H, R, i - .04, j - .03, .33, .31, .04, .1, 'teal'); H.dot(...H.p(i + .12, j + .13, 1.02), 1.4, 'sun'); }
  timber(H, R, 1.97, 9.26, 3.34, 1.29, .21, .1, 'teal');
  for (const [i, ink] of [[2.12, 'paper'], [3.72, 'teal']]) { box(H, R, i, 9.39, 1.36, .94, .32, .22, ink, .65); H.line(R, [H.p(i + .45, 10.35, .45), H.p(i + .86, 10.35, .45)], 'sun', 1.7); }
  benchFrame(H, R, 1.8, 9.13, 3.69, 1.65, .77, 'sun');
  basket(H, R, 2.62, 9.8, .87, .65);
  shape(H, R, H.tile(3.6, 9.32, 1.3, .82, .79), 'paper', 1);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(3.76, 9.42 + n * .13, .81), H.p(4.59, 9.42 + n * .13, .81)], 'teal', .8);
  for (const [i, j, ink] of [[3.66, 10.35, 'coral'], [4.1, 10.28, 'teal']]) { shape(H, R, [H.p(i, j, .8), H.p(i + .29, j, .8), H.p(i + .34, j + .23, .87), H.p(i + .05, j + .28, .86)], ink, .65); H.line(R, [H.p(i + .04, j, .82), H.p(i + .27, j + .03, .84)], 'paper', 1.3); }
  const hoop = H.p(4.85, 10.01, .82); oval(H, R, ...hoop, 12, 7, 'paper', 1); H.outline(R, ell(...hoop, 12.8, 7.7), 'sun', 1.6); for (let n = 0; n < 5; n++) H.line(R, [[hoop[0] - 8 + n * 4, hoop[1] - 3], [hoop[0] - 6 + n * 4, hoop[1] + 3]], 'coral', .85);
  vessel(H, R, 5.21, 9.38, .79, 5, 9, 'teal'); H.line(R, [H.p(5.2, 9.4, 1), H.p(4.78, 9.4, 1.1)], 'sun', 1.8);
  benchFrame(H, R, 9.02, 6.17, 1.5, 3.54, .8, 'teal'); cushion(H, R, 9.02, 6.21, 1.43, 1.32, .8, .13, 'paper'); box(H, R, 9.22, 8.85, .79, .53, .82, .08, 'coral', .45); bentTube(H, R, [[10.62, 8.62, .05], [10.62, 8.62, 1.32], [10.47, 8.62, 1.48], [10.27, 8.62, 1.48]], 2.2, 'sun');
  for (const i of [9.78, 11.1]) for (const j of [3.28, 4.89]) caster(H, R, i, j); metal(H, R, 9.65, 3.17, 1.58, 1.89, .27, .1, 'teal'); metal(H, R, 9.65, 3.17, 1.58, 1.89, 1.16, .1, 'teal'); drape(H, R, 9.81, 3.35, 1.2, 1.3, 1.27, .34, 'paper');
  for (const i of [9.69, 11.06]) for (const j of [3.22, 4.86]) metal(H, R, i, j, .12, .12, .26, 1.11, 'teal');
  bentTube(H, R, [[9.7, 3.24, 1.36], [9.7, 3.24, 1.6], [11.15, 3.24, 1.6], [11.15, 3.24, 1.36]], 1.8, 'teal');
  box(H, R, 9.9, 3.55, 1.1, 1.19, .4, .31, 'paper', 1); H.line(R, [H.p(10.37, 3.58, .73), H.p(10.37, 4.69, .73)], 'teal', 1.5);
  shape(H, R, H.tile(9.25, 8.88, .82, .55, .93), 'blue', .28);
  const ear = H.p(9.66, 9.15, .97); H.outline(R, ell(...ear, 6, 4), 'paper', 1.6); H.line(R, [[ear[0] + 5, ear[1]], [ear[0] + 8, ear[1] + 8]], 'blue', 1);
  for (const j of [6.48, 7.37]) H.line(R, [H.p(9.04, j, .79), H.p(8.85, j, 1.08)], 'sun', 2.2);
  const bag = H.p(2.37, 6.13, .49); shape(H, R, [[bag[0] - 15, bag[1] - 20], [bag[0] + 14, bag[1] - 20], [bag[0] + 12, bag[1] + 4], [bag[0] - 12, bag[1] + 4]], 'teal', .6); shape(H, R, [[bag[0] - 8, bag[1] - 9], [bag[0], bag[1] - 9], [bag[0], bag[1] - 2], [bag[0] - 8, bag[1] - 2]], 'coral', .5); stroke(H, R, [[bag[0] - 8, bag[1] - 20], [bag[0], bag[1] - 35], [bag[0] + 8, bag[1] - 20]], 'blue', 1.4);
}, (H, R, t) => {
  const u = cycle(t, 22) * 22, amount = ease(4.4, 8.8, u) * (1 - ease(13.2, 20, u)), point = ease(8.8, 10, u) * (1 - ease(13.2, 14.4, u));
  const T = tray(H, R, amount);
  timber(H, R, 3.04, 3.29, 5.66, 2.24, 1.44, .17, 'sun'); drape(H, R, 3.23, 3.52, 1.4, 1.2, 1.62, .11, 'paper');
  shape(H, R, H.tile(5.05, 3.71, 2.61, 1.24, 1.62), 'paper', 1);
  for (const i of [5.2, 6.41]) {
    const p = H.p(i, 4.17, 1.66);
    oval(H, R, ...p, 8, 6, 'paper', 1); for (let n = 0; n < 4; n++) H.line(R, [[p[0] - 6 + n * 4, p[1] - 2], [p[0] - 7 + n * 4, p[1] - 12 + n % 2]], 'teal', .75);
  }
  const glass = H.p(7.29, 4.68, 1.65); H.outline(R, ell(...glass, 9, 6), 'teal', 1.7); H.line(R, [[glass[0] + 7, glass[1] + 3], [glass[0] + 18, glass[1] + 10]], 'sun', 3.4);
  H.line(R, [H.p(6.88, 4.05, 1.66), H.p(7.61, 4.28, 1.66)], 'sun', 2); H.line(R, [H.p(7.61, 4.28, 1.66), H.p(7.77, 4.34, 1.66)], 'coral', 3.5);
  for (const i of [3.54, 7.9]) H.line(R, [H.p(i, 5.26, 1.46), H.p(i, 5.26, 1.58)], 'teal', 2.1);
  bentTube(H, R, [[3.42, 3.47, 1.77], [7.72, 3.47, 1.77]], 8, 'paper');
  for (const i of [3.36, 7.73]) metal(H, R, i, 3.38, .12, .22, 1.62, .21, 'teal');
  curator(H, R, amount, point, T);
  actor(H, R, 9.73, 7.53, u, 'hanoiMuseumVisitor', { face: 'sw', shirt: ['coral', .63], pants: ['blue', .72], hairStyle: 'bald', glasses: true }, .4, 1.65, 'elder');
  const tab = H.p(6.98, T.j + 1.67, 1.39); shape(H, R, [[tab[0] - 3, tab[1]], [tab[0] + 5, tab[1] - Math.sin(u * Math.PI / 11) * 2], [tab[0] + 5, tab[1] + 4], [tab[0] - 3, tab[1] + 4]], 'paper', 1, .4);
});
room.loopSeconds = 22;
room.stillTime = 11;
export default room;
