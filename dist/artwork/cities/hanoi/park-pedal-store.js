import { world, shape, oval, stroke, box, cycle, actor, loop, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, cushion, bentTube, spokedWheel } from '../materials.js';
import { rackFrame } from '../structure.js';
import { caster, floorShadow } from '../joinery.js';

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
  for (const i of [3.62, 8.43]) { timber(H, R, i, 3.23, .36, 3.98, .18, .28, 'sun'); for (const j of [3.47, 6.72]) { timber(H, R, i - .12, j, .6, .54, .04, .17, 'blue'); shape(H, R, [H.p(i - .03, j, .45), H.p(i + .38, j, .45), H.p(i + .38, j + .46, .78), H.p(i - .03, j + .46, .78)], 'coral', .52); } }
  floorShadow(H, 2.9, 3.4, 6.1, 3.25, .22);
  rackFrame(H, R, 8.45, .6, 2.72, 1.2, .04, [.2, 3.3], 'teal');
  for (let i = 8.58; i < 11.1; i += .25) for (let z = .5; z < 2.7; z += .3) H.line(R, [H.p(i, .72, z), H.p(i + .24, .72, z + .3)], 'paper', .55, { tone: .65 });
  for (let n = 0; n < 3; n++) { const i = 8.65 + n * .85, p = H.p(i, 1.42, 2.82); H.line(R, [H.p(i, .74, 2.94), p], 'blue', 2); shape(H, R, [[p[0] - 14, p[1] + 2], [p[0] - 5, p[1] - 5], [p[0] - 2, p[1] + 6], [p[0] + 3, p[1] + 6], [p[0] + 6, p[1] - 5], [p[0] + 15, p[1] + 2], [p[0] + 13, p[1] + 39], [p[0] - 13, p[1] + 39]], n === 1 ? 'sun' : 'coral', .7); H.line(R, [[p[0], p[1] + 6], [p[0], p[1] + 37]], 'blue', 1); for (const dy of [20, 30]) H.line(R, [[p[0] - 12, p[1] + dy], [p[0] + 12, p[1] + dy]], 'blue', 2); }
  metal(H, R, 8.38, 1.6, 2.9, .25, .18, .14, 'blue'); for (let n = 0; n < 3; n++) cushion(H, R, 8.68 + n * .73, .74, .64, .81, 3.4, .08, n === 1 ? 'coral' : 'paper');
  for (const i of [8.75, 9.18]) { const p = H.p(i, 1.38, .31); shape(H, R, [[p[0] - 5, p[1]], [p[0] + 8, p[1]], [p[0] + 8, p[1] - 4], [p[0] + 1, p[1] - 7], [p[0] + 1, p[1] - 20], [p[0] - 5, p[1] - 20]], 'blue', .7, .7); H.line(R, [[p[0] - 4, p[1] - 18], [p[0], p[1] - 18]], 'paper', .8); }
  for (const [i, j] of [[9.93, 8.45], [11.03, 8.45], [9.93, 10.4], [11.03, 10.4]]) caster(H, R, i, j);
  metal(H, R, 9.8, 8.3, 1.35, 2.3, .22, .13, 'teal'); bentTube(H, R, [[9.88, 8.35, .35], [9.88, 8.35, 1.75], [11.09, 8.35, 1.75], [11.09, 8.35, .35]], 2.5, 'teal'); cushion(H, R, 9.91, 9.15, 1.13, .96, .36, .15, 'blue');
  timber(H, R, 1.05, 8.45, 3.07, 1.67, .1, .42, 'teal'); cushion(H, R, 1.2, 8.58, 1.01, 1.18, .52, .13, 'blue'); box(H, R, 2.53, 8.64, .68, .53, .53, .09, 'sun', .65); H.line(R, [H.p(2.77, 9.44, .55), H.p(3.58, 9.56, .55)], 'coral', 4); oval(H, R, ...H.p(3.37, 8.95, .61), 8, 4, 'paper', 1);
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
