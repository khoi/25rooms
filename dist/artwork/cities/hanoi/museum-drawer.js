import { world, shape, oval, stroke, box, cycle, actor, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, cushion, benchFrame, bentTube, drape } from '../materials.js';
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
  metal(H, R, 3.26, 3.55, .13, 3.99, .99, .12, 'blue'); metal(H, R, 8.26, 3.55, .13, 3.99, .99, .12, 'blue');
  timber(H, R, 3.13, j, 5.43, 2.12, 1.08, .15, 'sun'); shape(H, R, H.tile(3.3, j + .13, 5.08, 1.8, 1.24), 'paper', 1);
  for (const i of [3.13, 8.43]) timber(H, R, i, j, .13, 2.12, 1.23, .18, 'sun'); timber(H, R, 3.12, j + 2.01, 5.43, .17, 1.09, .34, 'sun');
  for (const i of [4.85, 6.82]) timber(H, R, i, j + .14, .09, 1.78, 1.24, .11, 'paper');
  cushion(H, R, 5.06, j + .23, 1.54, 1.48, 1.25, .11, 'paper'); basket(H, R, 5.85, j + .97, 1.39, .74);
  cushion(H, R, 3.49, j + .28, 1.11, .66, 1.25, .07, 'paper');
  const comb = H.p(4.02, j + .69, 1.34); H.line(R, [[comb[0] - 15, comb[1] - 5], [comb[0] + 14, comb[1] + 9]], 'sun', 4); for (let n = 0; n < 8; n++) H.line(R, [[comb[0] - 13 + n * 3.6, comb[1] - 4 + n * 1.75], [comb[0] - 18 + n * 3.6, comb[1] + 3 + n * 1.75]], n === 4 ? 'coral' : 'sun', 2.1);
  box(H, R, 3.56, j + 1.15, .97, .58, 1.27, .22, 'coral', .44); H.line(R, [H.p(4.02, j + 1.16, 1.5), H.p(4.02, j + 1.71, 1.5)], 'paper', 1); oval(H, R, ...H.p(4.02, j + 1.73, 1.37), 2, 1.6, 'sun', .8);
  const bowl = H.p(7.43, j + .66, 1.33); oval(H, R, bowl[0], bowl[1], 17, 8, 'paper', 1); oval(H, R, bowl[0], bowl[1] - 5, 18, 9, 'teal', .44); oval(H, R, bowl[0], bowl[1] - 5, 13.5, 6, 'paper', 1); H.line(R, [[bowl[0] + 12, bowl[1] - 10], [bowl[0] + 15, bowl[1] - 8]], 'blue', 2);
  shape(H, R, H.tile(7.07, j + 1.17, .98, .54, 1.29), 'teal', .39); shape(H, R, H.tile(7.34, j + 1.27, .27, .24, 1.3), 'coral', .43); for (let n = 0; n < 5; n++) H.line(R, [H.p(7.31 + n * .075, j + 1.25, 1.32), H.p(7.31 + n * .075, j + 1.54, 1.32)], 'sun', .65);
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
  windowBay(H, R, 'nw', 2.04, 2.3, 1.5, 2.23, { divisions: 2, ink: 'sun' });
  box(H, R, 5.2, .25, 6.06, 1.65, .12, 3.42, 'sun', .45);
  for (let col = 0; col < 3; col++) { const i = 5.37 + col * 1.94; shape(H, R, H.faceI(i, 1.92, 1.73, .36, 3.36), 'blue', .67); for (const z of [.44, 1.37, 2.31, 3.35]) timber(H, R, i, .37, 1.73, 1.65, z, .09, 'sun'); for (let row = 0; row < 3; row++) { const z = .54 + row * .94; if (col === 1 && row === 0) { for (let n = 0; n < 5; n++) box(H, R, i + .08, .6, 1.42, 1.1, z + n * .11, .055, n % 2 ? 'paper' : 'teal', .55); } else { box(H, R, i + .13, .73, 1.36, .94, z, .61, row % 2 ? 'paper' : 'teal', .5); box(H, R, i + .09, .69, 1.44, 1.02, z + .6, .07, 'paper', 1); shape(H, R, H.faceI(i + .7, 1.69, .18, z + .21, z + .39), col === 2 ? 'coral' : 'sun', .8); } } }
  for (const i of [5.25, 11.15]) H.line(R, [H.p(i, 1.96, .14), H.p(i, 1.96, 3.61)], 'paper', 2); H.line(R, [H.p(5.3, 1.97, 3.59), H.p(11.13, 1.97, 3.59)], 'blue', 2);
  timber(H, R, .27, 5.9, 1.22, 4.85, .23, .1, 'sun'); for (const j of [6.12, 10.47]) timber(H, R, .42, j, .24, .2, .08, 2.3, 'sun'); timber(H, R, .31, 5.91, 1.27, 4.84, 2.3, .13, 'sun');
  for (let n = 0; n < 4; n++) { const p = H.p(.9, 6.48 + n * 1.08, 2.5); H.line(R, [[p[0] - 11, p[1] + 4], [p[0] + 13, p[1] - 8]], n % 2 ? 'paper' : 'teal', 14); oval(H, R, p[0] + 13, p[1] - 8, 7, 5, 'paper', 1); oval(H, R, p[0] + 13, p[1] - 8, 2.5, 2, 'blue', .6); }
  const frame = recessedFrame(H, R, 'nw', 6.01, 3.81, .65, 1.38, 'teal'); for (let n = 0; n < 3; n++) { shape(H, R, [frame(.22 + n * 1.1, .2), frame(1.15 + n * 1.1, .2), frame(1.15 + n * 1.1, 1.1), frame(.22 + n * 1.1, 1.1)], 'paper', 1); oval(H, R, ...frame(.69 + n * 1.1, .62), 8, 11, 'blue', .2); }
  for (const i of [3.12, 8.39]) for (const j of [3.41, 5.24]) timber(H, R, i, j, .24, .24, .03, 1.6, 'sun'); timber(H, R, 3.11, 3.43, 5.54, .15, .39, .19, 'sun');
  shape(H, R, H.faceI(3.23, 5.5, 5.2, .68, 1.39), 'blue', .66); for (const i of [3.3, 8.19]) metal(H, R, i, 3.63, .19, 3.96, 1.05, .13, 'blue');
  taskLight(H, R, 8.81, 3.68, 1.59, 'teal', -.9);
  benchFrame(H, R, 1.8, 9.13, 3.69, 1.65, .68, 'sun'); basket(H, R, 2.62, 9.8, .84, .65); H.line(R, [H.p(2.73, 9.59, .96), H.p(2.76, 9.75, .85)], 'teal', 3.4); shape(H, R, H.tile(3.6, 9.32, 1.3, .82, .7), 'paper', 1); for (let n = 0; n < 5; n++) H.line(R, [H.p(3.79, 9.41 + n * .13, .72), H.p(4.58, 9.41 + n * .13, .72)], 'teal', .8); shape(H, R, H.tile(4.95, 9.5, .32, .32, .71), 'teal', .7);
  benchFrame(H, R, 9.02, 6.17, 1.5, 3.54, .8, 'teal'); cushion(H, R, 9.02, 6.21, 1.43, 1.32, .8, .13, 'paper'); box(H, R, 9.22, 8.85, .79, .53, .82, .08, 'coral', .45); bentTube(H, R, [[10.62, 8.62, .05], [10.62, 8.62, 1.32], [10.47, 8.62, 1.48], [10.27, 8.62, 1.48]], 2.2, 'sun');
  for (const i of [9.78, 11.1]) for (const j of [3.28, 4.89]) caster(H, R, i, j); metal(H, R, 9.65, 3.17, 1.58, 1.89, .27, .1, 'teal'); metal(H, R, 9.65, 3.17, 1.58, 1.89, 1.16, .1, 'teal'); drape(H, R, 9.81, 3.35, 1.2, 1.3, 1.27, .34, 'paper');
  const bag = H.p(2.37, 6.13, .49); shape(H, R, [[bag[0] - 15, bag[1] - 20], [bag[0] + 14, bag[1] - 20], [bag[0] + 12, bag[1] + 4], [bag[0] - 12, bag[1] + 4]], 'teal', .6); shape(H, R, [[bag[0] - 8, bag[1] - 9], [bag[0], bag[1] - 9], [bag[0], bag[1] - 2], [bag[0] - 8, bag[1] - 2]], 'coral', .5); stroke(H, R, [[bag[0] - 8, bag[1] - 20], [bag[0], bag[1] - 35], [bag[0] + 8, bag[1] - 20]], 'blue', 1.4);
}, (H, R, t) => {
  const u = cycle(t, 22) * 22, amount = ease(4.4, 8.8, u) * (1 - ease(13.2, 20, u)), point = ease(8.8, 10, u) * (1 - ease(13.2, 14.4, u));
  const T = tray(H, R, amount);
  timber(H, R, 3.04, 3.29, 5.66, 2.24, 1.44, .17, 'sun'); drape(H, R, 3.23, 3.52, 1.4, 1.2, 1.62, .11, 'paper');
  bentTube(H, R, [[3.42, 3.47, 1.77], [7.72, 3.47, 1.77]], 8, 'paper');
  for (const i of [3.36, 7.73]) metal(H, R, i, 3.38, .12, .22, 1.62, .21, 'teal');
  curator(H, R, amount, point, T);
  actor(H, R, 9.73, 7.53, u, 'hanoiMuseumVisitor', { face: 'sw', shirt: ['coral', .63], pants: ['blue', .72], hairStyle: 'bald', glasses: true }, .4, 1.65, 'elder');
  const tab = H.p(6.98, T.j + 1.67, 1.39); shape(H, R, [[tab[0] - 3, tab[1]], [tab[0] + 5, tab[1] - Math.sin(u * Math.PI / 11) * 2], [tab[0] + 5, tab[1] + 4], [tab[0] - 3, tab[1] + 4]], 'paper', 1, .4);
});
room.loopSeconds = 22;
room.stillTime = 11;
export default room;
