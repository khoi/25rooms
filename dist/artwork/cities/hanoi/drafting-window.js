import { world, shape, oval, stroke, box, cycle, ell } from '../../worlds/common.js';
import { timber, metal, benchFrame, cushion, bentTube } from '../materials.js';
import { windowBay, recessedFrame, taskLight, floorShadow } from '../joinery.js';

const ease = (a, b, u) => { const q = Math.max(0, Math.min(1, (u - a) / (b - a))); return q * q * (3 - 2 * q); };
const liftAt = u => ease(4.8, 9.6, u) * (1 - ease(14.4, 22, u));
function student(H, R, x, y, ink, hands, face = 1, lean = 0) {
  const h = [x + lean, y - 58];
  H.tint([[x - 15, y + 2], [x + 17, y + 3], [x + 27, y + 10], [x - 11, y + 9]], 'blue', .14);
  for (const s of [-1, 1]) { stroke(H, R, [[x + s * 7, y - 20], [x + face * 17 + s * 3, y - 13], [x + face * 19 + s * 3, y + 2]], 'blue', 7); oval(H, R, x + face * 21 + s * 3, y + 3, 6, 2.5, 'blue', .8); }
  shape(H, R, [[x - 10 + lean, y - 46], [x + 10 + lean, y - 46], [x + 12, y - 20], [x - 12, y - 20]], ink, .75);
  oval(H, R, ...h, 9, 10, 'coral', .28);
  shape(H, R, [[h[0] - 9, h[1]], [h[0] - 10, h[1] - 6], [h[0] - 3, h[1] - 12], [h[0] + 7, h[1] - 10], [h[0] + 10, h[1] - 4], [h[0] + 4, h[1] - 5]], 'blue', .85);
  H.dot(h[0] + face * 5, h[1] + 1, 1, 'blue');
  hands.forEach((hand, n) => { const shoulder = [x + (n ? 8 : -7) + lean, y - 43]; const elbow = [shoulder[0] * .45 + hand[0] * .55, Math.max(shoulder[1], hand[1]) + 8]; stroke(H, R, [shoulder, elbow, hand], 'blue', 6.5); stroke(H, R, [shoulder, elbow, hand], ink, 4.9); oval(H, R, ...hand, 3, 2.5, 'coral', .3); });
}
function roof(H, R, lift) {
  const i = 5.02 - 1.3 * lift, j = 4.26 + .55 * lift, z = 2.06 + .4 * lift;
  const P = (a, b, h = 0) => H.p(i + a, j + b, z + h);
  shape(H, R, [P(-.14, -.12), P(3.14, -.12), P(3.14, 1.08, .56), P(-.14, 1.08, .56)], 'paper', 1);
  shape(H, R, [P(-.14, 1.08, .56), P(3.14, 1.08, .56), P(3.14, 2.32), P(-.14, 2.32)], 'sun', .42);
  H.line(R, [P(-.14, 2.32), P(3.14, 2.32)], 'paper', 2.7);
  for (let a = .1; a < 3; a += .33) H.line(R, [P(a, 1.08, .57), P(a, 2.28, .02)], 'coral', .65, { tone: .6 });
  for (const d of [.08, .15]) H.line(R, [P(2.63, 2.18, d), P(2.96, 2.18, d), P(2.96, 1.9, d + .12)], 'teal', 1.5);
  return [P(.45, 2.3), P(.95, 2.3)];
}
const room = world('hanoi-drafting-window', 'The house in pieces', { floor: 'paper', tone: .8, wall: 'teal', wallTone: .22, height: 4.15, head: 28 }, (H, R) => {
  for (let a = 0; a < 12; a++) for (const j of [.04, 11.45]) { shape(H, R, H.tile(a + .03, j, .9, .5, .018), 'teal', .27, .45); H.line(R, [H.p(a + .2, j + .12), H.p(a + .65, j + .38)], 'coral', .7); }
  for (let j = 1.2; j < 11.5; j += 2.3) H.line(R, [H.p(.7, j), H.p(11.4, j)], 'blue', .45, { tone: .23 });
  const W = windowBay(H, R, 'ne', 2.8, 6.4, 1.48, 2.42, { divisions: 4, view: P => { for (let n = 0; n < 5; n++) shape(H, R, [P(.18 + n * 1.2, .15), P(1.25 + n * 1.2, .15), P(1.25 + n * 1.2, .7 + n % 2 * .25), P(.18 + n * 1.2, .85 + n % 2 * .3)], n % 2 ? 'teal' : 'coral', .19, .4); } });
  H.line(R, [W(5.3, .25), W(5.8, .12, .75), W(6.15, .18)], 'blue', 1.4);
  shape(H, R, [H.p(3.2, .5, .02), H.p(7.3, .5, .02), H.p(9.1, 7.7, .02), H.p(5.2, 7.7, .02)], 'sun', .12, .1);
  for (const z of [.38, .67, .96]) { timber(H, R, .25, 1.6, 2.2, 5.5, z, .18, 'teal'); for (let j = 1.9; j < 6.8; j += 1.55) { H.outline(R, H.faceJ(2.46, j, 1.3, z + .025, z + .15), 'blue', .7); H.line(R, [H.p(2.47, j + .5, z + .11), H.p(2.47, j + .85, z + .11)], 'sun', 2); } }
  for (const j of [2.1, 5.8]) bentTube(H, R, [[.52, j, 1.1], [1.55, j, 2.85], [2.22, j, 1.2]], 2, 'blue');
  const board = [H.p(.4, 1.5, 2.75), H.p(.4, 6.8, 2.75), H.p(2.25, 6.8, 1.35), H.p(2.25, 1.5, 1.35)]; shape(H, R, board, 'sun', .45); shape(H, R, [H.p(.57, 1.8, 2.64), H.p(.57, 6.46, 2.64), H.p(2.07, 6.46, 1.5), H.p(2.07, 1.8, 1.5)], 'paper', 1);
  for (const j of [2.1, 3.15, 4.3, 5.4]) H.line(R, [H.p(.82, j, 2.47), H.p(1.8, j, 1.75), H.p(1.8, j + .65, 1.75), H.p(.82, j + .65, 2.47)], 'teal', .8);
  H.line(R, [H.p(1.55, 1.58, 1.94), H.p(1.55, 6.65, 1.94)], 'blue', 3); for (const j of [2.05, 5.9]) metal(H, R, .37, j, .16, .36, 2.76, .055, 'blue');
  const B = recessedFrame(H, R, 'nw', 7.55, 3.85, 1.5, 2.2, 'sun');
  for (const [u, v, w, h] of [[.2, .3, 1.2, .7], [1.75, .24, 1.7, .88], [.22, 1.24, 1.3, .65], [1.94, 1.33, 1.2, .55]]) { const q = [B(u, v), B(u + w, v), B(u + w, v + h), B(u, v + h)]; shape(H, R, q, 'paper', 1, .5); H.line(R, [B(u + .15, v + .12), B(u + .55, v + .12), B(u + .55, v + h - .12), B(u + w - .12, v + h - .12)], 'teal', 1); H.dot(...B(u + .08, v + h - .07), 1.7, 'coral'); }
  benchFrame(H, R, 4.25, 3.75, 5.75, 3.4, 1.15, 'sun');
  box(H, R, 4.85, 4.18, 3.37, 2.54, 1.15, .13, 'blue', .72); box(H, R, 4.96, 4.28, 3.14, 2.31, 1.28, .06, 'paper', 1);
  for (const [i, j, w, d] of [[5.05, 4.36, 3, .19], [5.05, 4.36, .17, 2.12], [7.83, 4.36, .18, 2.12], [5.05, 6.3, 1.22, .18], [7.03, 6.3, .8, .18]]) box(H, R, i, j, w, d, 1.34, .72, 'paper', .95);
  for (let n = 0; n < 6; n++) box(H, R, 5.4 + n * .12, 4.75, .12, .64, 1.35, .06 + n * .09, 'sun', .6);
  shape(H, R, [H.p(7.03, 5.48, 1.34), H.p(7.62, 5.48, 1.34), H.p(7.62, 6.2, 1.78), H.p(7.03, 6.2, 1.78)], 'coral', .45);
  for (const i of [5.16, 7.95]) for (const j of [4.47, 6.39]) { H.line(R, [H.p(i, j, 2.04), H.p(i, j, 2.22)], 'blue', 1.3); H.dot(...H.p(i, j, 2.22), 1, 'sun'); }
  H.line(R, [H.p(6.37, 5.8, 1.36), H.p(6.57, 5.8, 1.36)], 'blue', 2); for (let k = 0; k < 3; k++) H.line(R, [H.p(6.41 + k * .045, 5.74, 1.37), H.p(6.41 + k * .045, 5.86, 1.37)], 'paper', .6);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(6.32 + n * .15, 6.35, 1.85), H.p(6.32 + n * .15, 6.35, 2.08)], 'blue', .55);
  H.line(R, [H.p(6.29, 6.35, 2.09), H.p(6.96, 6.35, 2.09)], 'sun', 1);
  for (const [i, j] of [[6.58, 4.76], [6.95, 4.98], [6.35, 4.94]]) { const p = H.p(i, j, 1.38); H.line(R, [p, [p[0], p[1] - 10]], 'coral', .7); oval(H, R, p[0], p[1] - 11, 4, 5, 'teal', .5); }
  const lens = H.p(8.61, 5.13, 1.71); H.line(R, [H.p(8.65, 4.8, 1.16), H.p(8.65, 4.8, 1.81), lens], 'blue', 1.2); H.outline(R, ell(lens[0], lens[1], 9, 6), 'blue', 1.6); H.line(R, [[lens[0] - 4, lens[1] - 3], [lens[0] + 2, lens[1] + 2]], 'paper', 1);
  shape(H, R, H.tile(8.52, 4.05, 1.05, 1.95, 1.16), 'teal', .21); for (let n = 0; n < 3; n++) box(H, R, 8.8 + n * .07, 4.6 + n * .07, .5, .48, 1.18 + n * .09, .08, 'paper', 1);
  shape(H, R, [H.p(4.5, 6.6, 1.17), H.p(4.88, 6.6, 1.17), H.p(4.88, 6.15, 1.17)], 'teal', .5); metal(H, R, 5.4, 6.83, 2.55, .13, 1.16, .035, 'paper'); for (let n = 0; n < 17; n++) H.line(R, [H.p(5.5 + n * .14, 6.84, 1.21), H.p(5.5 + n * .14, 6.9, 1.21)], 'blue', .5);
  for (const i of [6.48, 6.67]) for (const j of [6.59, 6.78]) H.line(R, [H.p(i, j, 1.18), H.p(i, j, 1.35)], 'blue', .75);
  shape(H, R, H.tile(6.44, 6.55, .28, .29, 1.35), 'paper', 1, .5); shape(H, R, H.faceI(6.44, 6.55, .28, 1.35, 1.58), 'paper', 1, .5);
  shape(H, R, H.tile(9.01, 6.03, .53, .42, 1.18), 'blue', .2, .5); H.line(R, [H.p(9.02, 6.24, 1.19), H.p(9.52, 6.24, 1.19)], 'sun', .8);
  shape(H, R, [H.p(8.8, 8.1, .02), H.p(10.2, 8.1, .02), H.p(10.2, 8.45, .21), H.p(8.8, 8.45, .21)], 'paper', 1, .6);
  shape(H, R, [H.p(8.8, 8.45, .21), H.p(10.2, 8.45, .21), H.p(10.2, 8.8, .02), H.p(8.8, 8.8, .02)], 'sun', .35, .6);
  taskLight(H, R, 9.7, 3.9, 1.17, 'coral', -.5);
  for (const [i, j] of [[4.5, 6.7], [8.25, 6.85]]) { benchFrame(H, R, i - .55, j - .46, 1.1, .9, .63, 'teal'); cushion(H, R, i - .52, j - .44, 1.04, .85, .63, .08, 'coral'); }
  benchFrame(H, R, .8, 9.25, 3.9, 1.35, .63, 'sun'); box(H, R, 1.04, 9.4, .72, .47, .63, .19, 'coral', .56); box(H, R, 1.99, 9.4, .72, .52, .63, .09, 'blue', .38); box(H, R, 2.97, 9.4, .55, .48, .63, .12, 'paper', 1); H.line(R, [H.p(3.8, 9.4, .7), H.p(4.25, 10.1, .7)], 'teal', 7);
  shape(H, R, H.tile(3.82, 9.38, .61, .51, .69), 'coral', .25, .55);
  box(H, R, 8.9, 9.3, 2.2, 1.6, .04, .42, 'teal', .43); for (const i of [9.03, 10.66]) for (const j of [9.43, 10.62]) metal(H, R, i, j, .21, .17, .47, .05, 'blue');
  floorShadow(H, 10.3, 1.5, .85, 1.7); for (let n = 0; n < 4; n++) { const p = H.p(10.35 + n % 2 * .38, 1.8 + Math.floor(n / 2) * .43, 0); oval(H, R, p[0], p[1], 6, 3, 'teal', .45); H.line(R, [p, [p[0] - 4, p[1] - 52 - n * 4]], n % 2 ? 'paper' : 'sun', 9); oval(H, R, p[0] - 4, p[1] - 52 - n * 4, 5, 2.8, 'paper', 1); }
}, (H, R, t) => {
  const u = cycle(t, 24) * 24, lift = liftAt(u), hands = roof(H, R, lift);
  const a = H.p(4.5, 6.7, .01); student(H, R, ...a, 'teal', hands, 1, lift * 2);
  const b = H.p(8.25, 6.85, .01), point = ease(9.6, 11, u) * (1 - ease(13.8, 15.6, u)); student(H, R, ...b, 'coral', [[b[0] - 18, b[1] - 31], H.p(7.62 + (1 - point) * .8, 6.15 + (1 - point) * .5, 1.65)], -1);
  const flutter = Math.sin(u * Math.PI / 12) * .07; shape(H, R, [H.p(8.55, 5.95, 1.18), H.p(9.7, 5.95, 1.18), H.p(9.7, 6.67, 1.18 + flutter), H.p(8.55, 6.67, 1.18)], 'paper', 1, .6);
});
room.loopSeconds = 24;
room.stillTime = 12;
export default room;
