import { world, shape, oval, stroke, box, cycle, actor, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, cushion, benchFrame, drape } from '../materials.js';
import { masonry } from '../structure.js';


const ease = (a, b, u) => { const q = Math.max(0, Math.min(1, (u - a) / (b - a))); return q * q * (3 - 2 * q); };
const base = { x: 0, y: 0, drop: 0, lean: 0, head: -5, al: 15, ar: 34, el: 35, er: 30, ll: -8, lr: 10, kl: 0, kr: 0, roll: 0 };
const raised = { ...base, lean: 3, head: -24, ar: 156, er: -8, al: 35, el: 30, y: -2 };
FIGURES.clips.hanoiTerraceFirst = { dur: 24, keys: [[0, base], [.2, base], [.4, raised], [.6, raised], [.91, base], [1, base]] };
FIGURES.clips.hanoiTerraceSecond = { dur: 24, keys: [[0, base], [.4, base], [.6, raised], [.65, raised], [.91, base], [1, base]] };
function racket(H, R, p, lifted, ink, small = false, direction = 1) {
  const s = small ? .48 : 1, angle = -.2 - lifted * .9, dx = Math.cos(angle) * direction, dy = Math.sin(angle), hx = p[0], hy = p[1], x = hx + dx * 36 * s, y = hy + dy * 36 * s;
  H.line(R, [[hx - dx * 4 * s, hy - dy * 4 * s], [x, y]], 'blue', 2.4 * s); H.line(R, [[hx - dx * 3 * s, hy - dy * 3 * s], [hx + dx * 8 * s, hy + dy * 8 * s]], ink, 4 * s);
  H.line(R, [[hx + dx * 1 * s, hy + dy * 1 * s], [hx + dx * 5 * s, hy + dy * 5 * s]], 'sun', 2 * s);
  const P = (a, b) => [x + (a * dx - b * dy) * s, y + (a * dy + b * dx) * s], ring = Array.from({ length: 33 }, (_, n) => P(Math.cos(n * Math.PI / 16) * 15, Math.sin(n * Math.PI / 16) * 11));
  shape(H, R, ring, 'paper', .36, .9); H.clip(ring, () => { for (let n = -12; n < 15; n += 4) { H.line(R, [P(n, -13), P(n, 13)], 'teal', .55); H.line(R, [P(-17, n), P(17, n)], 'teal', .55); } }); H.outline(R, ring, ink, 2.1 * s);
}
function target(H, R, u) {
  const pulse = ease(7.7, 8.8, u) * (1 - ease(19.5, 22, u)), swing = Math.sin((u - 8.8) * 2.1) * pulse * Math.exp(-Math.max(0, u - 14.4) * .3), anchor = H.p(6.4, 5.1, 3.58), tip = [anchor[0] + swing * 10, anchor[1] + 34];
  stroke(H, R, [anchor, [anchor[0] + swing * 4, anchor[1] + 16], tip], 'blue', .8); oval(H, R, anchor[0], anchor[1], 3, 4, 'coral', .65); H.line(R, [[anchor[0] - 3, anchor[1] - 3], [anchor[0] + 3, anchor[1] + 2]], 'sun', 1.3);
  for (let n = -2; n <= 2; n++) { const q = [[tip[0] + n, tip[1] + 7], [tip[0] + n * 4.3 - 2.1, tip[1] - 11], [tip[0] + n * 4.3 + 2.1, tip[1] - 11]]; shape(H, R, q, n === 2 ? 'sun' : 'paper', 1, .5); H.line(R, [[tip[0] + n, tip[1] + 6], [tip[0] + n * 4.3, tip[1] - 10]], 'teal', .5); } oval(H, R, tip[0], tip[1] + 7, 4, 4, 'coral', .7);
}
const room = world('hanoi-terrace-shuttle', 'One feather caught', { floor: 'paper', tone: .65, wall: false, head: 28 }, (H, R) => {
  for (let i = 0; i < 12; i += 1.5) for (let j = 0; j < 12; j += 1.5) { shape(H, R, H.tile(i + .02, j + .02, 1.46, 1.46, .012), 'blue', (i + j) % 3 ? .04 : .1, .4); H.line(R, [H.p(i + .3, j + .18, .022), H.p(i + 1.2, j + .25, .022)], 'paper', .7); }
  masonry(H, R, 'nw', .1, 11.75, .02, 1.0, 'paper', .9); masonry(H, R, 'ne', .1, 11.75, .02, 1.0, 'paper', .9);
  for (const i of [.15, 1.62, 3.09, 4.56, 6.03, 7.5, 8.97, 10.44]) timber(H, R, i, .06, 1.4, .35, 1.02, .13, 'sun'); for (const j of [.3, 1.77, 3.24, 4.71, 6.18, 7.65, 9.12, 10.59]) timber(H, R, .06, j, .35, 1.4, 1.02, .13, 'sun');
  for (const j of [1.2, 4.7]) metal(H, R, .26, j, .14, .14, 1.13, 2.63, 'teal');
  const screen = [H.p(.3, 1.2, 1.41), H.p(.3, 4.85, 1.41), H.p(.3, 4.85, 3.61), H.p(.3, 1.2, 3.61)]; shape(H, R, screen, 'teal', .3); H.clip(screen, () => { for (let j = 1.37; j < 4.8; j += .33) for (let z = 1.55; z < 3.55; z += .32) oval(H, R, ...H.p(.31, j, z), 2.5, 3.5, 'paper', 1); });
  box(H, R, 9.14, .65, 2.34, 1.93, .25, 2.79, 'teal', .5); for (const i of [9.21, 11.13]) for (const j of [.73, 2.28]) metal(H, R, i, j, .21, .21, .04, .24, 'blue'); metal(H, R, 9.04, .57, 2.55, 2.09, 3.02, .11, 'blue');
  for (let n = 0; n < 2; n++) { const i = 9.26 + n * 1.08; shape(H, R, H.faceI(i, 2.61, .91, .75, 2.89), 'blue', .48); for (let z = .86; z < 2.85; z += .18) { H.line(R, [H.p(i + .05, 2.64, z), H.p(i + .86, 2.64, z)], 'sun', 2.4); H.line(R, [H.p(i + .07, 2.65, z + .035), H.p(i + .84, 2.65, z + .035)], 'paper', .7); } H.line(R, [H.p(i + .75, 2.69, 1.5), H.p(i + .75, 2.69, 1.86)], 'blue', 2); }
  timber(H, R, 9.24, 2.56, 2.01, .2, .35, .25, 'teal'); H.line(R, [H.p(10.02, 2.78, .48), H.p(10.48, 2.78, .48)], 'sun', 2.2);
  const cover = H.p(11.38, 2.31, 2.43); shape(H, R, [[cover[0] - 8, cover[1]], [cover[0] + 8, cover[1]], [cover[0] + 9, cover[1] + 22], [cover[0] + 3, cover[1] + 29], [cover[0] + 3, cover[1] + 44], [cover[0] - 3, cover[1] + 44], [cover[0] - 3, cover[1] + 29], [cover[0] - 9, cover[1] + 22]], 'coral', .55, .7); H.line(R, [[cover[0], cover[1] + 3], [cover[0], cover[1] + 23]], 'paper', .8);
  for (let n = 0; n < 4; n++) H.line(R, [H.p(11.52, 1.11 + n * .26, .48), H.p(11.52, 1.11 + n * .26, 2.56)], 'coral', 3);
  const door = [H.p(.4, 7.45, 1.1), H.p(.4, 10.5, 1.1), H.p(.4, 10.5, 3.57), H.p(.4, 7.45, 3.57)]; shape(H, R, door, 'blue', .7); shape(H, R, [H.p(.53, 7.59, 1.1), H.p(.53, 10.37, 1.1), H.p(.53, 10.37, 3.43), H.p(.53, 7.59, 3.43)], 'teal', .4); H.line(R, [H.p(.55, 9.93, 2.03), H.p(.55, 9.93, 2.29)], 'sun', 2.4); timber(H, R, .32, 7.3, 1.1, 3.33, 3.56, .12, 'paper');
  shape(H, R, H.tile(.61, 7.61, 1.88, 2.77, .04), 'teal', .26); for (let n = 0; n < 7; n++) H.line(R, [H.p(.77, 7.8 + n * .35, .05), H.p(2.2, 7.8 + n * .35, .05)], 'paper', .9);
  timber(H, R, 1.05, 10.58, 2.47, .92, .06, .17, 'sun'); for (let n = 0; n < 2; n++) { const p = H.p(1.5 + n * .8, 10.96, .25); oval(H, R, ...p, 10, 5, n ? 'coral' : 'teal', .65); H.line(R, [[p[0] - 5, p[1] - 3], [p[0] + 3, p[1] + 3]], 'paper', 2); }
  for (const i of [3.0, 8.72]) { metal(H, R, i - .47, 3.54, .94, .95, .03, .22, 'blue'); metal(H, R, i - .29, 3.7, .58, .59, .25, .16, 'sun'); bentTube(H, R, [[i, 4, .38], [i, 4, 2.62]], 4, 'blue'); H.line(R, [H.p(i, 4, 1.7), H.p(i + .13, 4, 1.7)], 'coral', 2.2); oval(H, R, ...H.p(i, 4, 2.62), 4, 2.5, 'sun', .8); }
  const P = (i, z) => H.p(i, 4.02, z), net = [P(3.04, 1.06), P(8.66, 1.06), P(8.66, 2.5), P(5.85, 2.37), P(3.04, 2.5)];
  shape(H, R, net, 'paper', .16, .65); H.clip(net, () => { for (let i = 3.1; i < 8.7; i += .23) H.line(R, [P(i, .98), P(i, 2.55)], 'teal', .6); for (let z = 1.13; z < 2.55; z += .2) H.line(R, [P(3.03, z), P(8.68, z)], 'teal', .6); }); stroke(H, R, [P(3.0, 2.52), P(5.85, 2.39), P(8.72, 2.52)], 'paper', 4); H.line(R, [P(3.0, 1.05), P(8.72, 1.05)], 'blue', 1.5);
  H.line(R, [P(6.01, 1.75), P(6.48, 1.75), P(6.48, 2.14), P(6.01, 2.14), P(6.01, 1.75)], 'coral', 1.15);
  for (let i = 3.1; i < 8.7; i += .47) H.line(R, [H.p(i, 4.3, .022), H.p(i + .7, 6.05, .022)], 'blue', .7, { tone: .18 });
  metal(H, R, 9.1, 4.76, .91, .84, .03, .24, 'blue'); bentTube(H, R, [[9.51, 5.16, .23], [9.51, 5.16, 3.62], [6.4, 5.1, 3.62]], 2.8, 'teal'); H.line(R, [H.p(9.5, 5.16, 3.0), H.p(8.6, 5.14, 3.62)], 'blue', 1.4);
  H.outline(R, ell(...H.p(9.91, 6.6, .024), 14, 7), 'blue', 1, { tone: .17 });
  for (const [i, j] of [[4.16, 9.0], [8.57, 8.7]]) { shape(H, R, H.tile(i, j, .43, .43, .03), 'coral', .58); cushion(H, R, i + .05, j + .05, .34, .34, .05, .05, 'sun'); }
  benchFrame(H, R, 6.33, 10.12, 2.75, .85, .59, 'sun'); drape(H, R, 7.7, 10.18, 1.03, .69, .6, .29, 'paper'); box(H, R, 9.65, 9.82, 1.44, 1.16, .03, .34, 'sun', .5); for (const [i, j] of [[9.98, 10.16], [10.59, 10.18], [10.29, 10.58]]) oval(H, R, ...H.p(i, j, .43), 6, 5, 'coral', .55);
  const fan = H.p(6.85, 10.6, .64); shape(H, R, [[fan[0] - 1, fan[1] + 6], [fan[0] - 15, fan[1] - 7], [fan[0] - 6, fan[1] - 15], [fan[0] + 10, fan[1] - 12], [fan[0] + 16, fan[1] - 4]], 'paper', 1); for (let n = -2; n < 3; n++) H.line(R, [[fan[0], fan[1] + 5], [fan[0] + n * 6, fan[1] - 11 + Math.abs(n) * 2]], 'teal', .6);
  racket(H, R, H.p(2.43, 10.58, .28), .45, 'sun', true);
  bentTube(H, R, [[.21, 6.5, 1.06], [.21, 6.5, .35], [.83, 6.5, .24]], 3.2, 'blue');
}, (H, R, t) => {
  const u = cycle(t, 24) * 24, a = ease(4.8, 9.6, u) * (1 - ease(14.4, 22, u)), b = ease(9.6, 14.4, u) * (1 - ease(15.6, 22, u));
  actor(H, R, 6.15, 6.4, u, 'hanoiTerraceFirst', { face: 'se', shirt: ['coral', .68], pants: ['blue', .73], hairStyle: 'pony', prop: (HH, RR, pts) => racket(HH, RR, pts.nearHand, a, 'teal') }, 0, 1.8);
  actor(H, R, 8.3, 6, u, 'hanoiTerraceSecond', { face: 'sw', shirt: ['teal', .7], pants: ['blue', .66], hairStyle: 'short', prop: (HH, RR, pts) => racket(HH, RR, pts.nearHand, b, 'coral', false, -1) }, 0, 1.8);
  target(H, R, u);
  const p = H.p(.31, 4.78, 3.7), sway = Math.sin(u * Math.PI / 12) * 7; shape(H, R, [[p[0], p[1]], [p[0] + 19, p[1] + 5], [p[0] + 35, p[1] + sway], [p[0] + 31, p[1] + 9 + sway], [p[0] + 15, p[1] + 12], [p[0], p[1] + 6]], 'coral', .57, .55);
});
room.loopSeconds = 24;
room.stillTime = 2;
export default room;
