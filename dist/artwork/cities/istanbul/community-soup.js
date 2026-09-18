import { world, actor, shape, oval, stroke, ell, cycle } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, benchFrame, drape, cushion, bentTube, floorLight, slattedSeat } from '../materials.js';
import { cabinetFrame, basin } from '../structure.js';
import { windowBay, wallCourse, cornice, hangingRail, taskLight, caster, panelFront, recessedFrame } from '../joinery.js';

const ease = (a, b, t) => { const q = Math.max(0, Math.min(1, (t - a) / (b - a))); return q * q * (3 - 2 * q); };
const poses = [{ ...FIGURES.clips.idle.keys[0][1], head: 8 }, { ...FIGURES.clips.idle.keys[0][1], head: 8 }];
for (const [n, p] of poses.entries()) FIGURES.clips['istanbulSoupHands' + n] = { dur: 22, keys: [[0, p], [1, p]] };
function aim(H, i, j, targets, p) {
  const root = H.p(i, j), s = 1.85;
  for (const [n, q] of targets.entries()) {
    const side = n ? 'r' : 'l', dx = (q[0] - root[0]) / s - (n ? 5.2 : -5.2), dy = (q[1] - root[1]) / s + 32.5;
    const d = Math.min(8.48, Math.max(.4, Math.hypot(dx, dy))), e = Math.acos(Math.max(-1, Math.min(1, (d * d - 4.368 ** 2 - 4.2 ** 2) / (2 * 4.368 * 4.2))));
    p['a' + side] = (Math.atan2(dx, dy) - Math.atan2(4.2 * Math.sin(e), 4.368 + 4.2 * Math.cos(e))) * 180 / Math.PI;
    p['e' + side] = e * 180 / Math.PI;
  }
}
function bowl(H, R, i, j, z, size = 1, ink = 'paper') {
  const [x, y] = H.p(i, j, z), r = 10 * size;
  shape(H, R, [[x - r, y - 6 * size], [x - r * .65, y + 3 * size], [x + r * .65, y + 3 * size], [x + r, y - 6 * size]], ink, ink === 'paper' ? 1 : .7, .65);
  oval(H, R, x, y - 6 * size, r, r * .36, 'paper', 1);
  oval(H, R, x, y - 6 * size, r * .72, r * .21, 'sun', .3);
  H.line(R, [[x - r * .7, y + 3 * size], [x + r * .7, y + 3 * size]], 'coral', .7);
}
const room = world('istanbul-community-soup', 'A lid held for a neighbour', { floor: 'paper', tone: .4, wall: 'paper', wallTone: .8, height: 3.7, head: 35, pattern: 'tiles' }, (H, R) => {
  wallCourse(H, R, 'ne', 0, 12, .85, 'teal');
  cornice(H, R, 'nw', 0, 12, 3.6, 'teal');
  windowBay(H, R, 'nw', 3.1, 5.5, 1.52, 1.85, { divisions: 3 });
  recessedFrame(H, R, 'nw', 9.03, 2.47, 1.23, 1.92, 'teal', P => {
    shape(H, R, [P(.15, .15), P(2.32, .15), P(2.32, 1.77), P(.15, 1.77)], 'sun', .15, .5);
    H.line(R, [P(1.23, .15), P(1.23, 1.77)], 'teal', 2.3);
    shape(H, R, [P(.26, .3), P(1.08, .3), P(1.08, 1.55), P(.26, 1.55)], 'paper', .6, .6);
    shape(H, R, [P(1.38, .3), P(2.18, .3), P(2.18, 1.55), P(1.38, 1.55)], 'paper', .65, .6);
    for (const u of [1.0, 1.44]) H.line(R, [P(u, .79), P(u, .98)], 'sun', 2);
  });
  timber(H, R, .11, 9.02, 1.0, 2.51, 1.17, .12, 'sun');
  for (const j of [9.24, 11.22]) H.line(R, [H.p(.95, j, 1.17), H.p(.19, j, .77)], 'teal', 2.5);
  bowl(H, R, .62, 9.59, 1.35, .8);
  drape(H, R, .31, 10.43, .63, .71, 1.32, .39, 'coral');
  metal(H, R, 2.94, .3, 3.86, 1.36, .16, .81, 'teal');
  timber(H, R, 2.87, .27, 4.0, 1.44, .98, .14, 'sun');
  panelFront(H, R, 3.01, 1.69, 3.7, .2, .73, 3, 'teal');
  metal(H, R, 4.49, .43, 1.9, .99, 1.14, .05, 'paper');
  for (const i of [4.95, 5.91]) {
    const [x, y] = H.p(i, .9, 1.21);
    oval(H, R, x, y, 11, 4.2, 'blue', .68);
    H.outline(R, ell(x, y, 7, 2.6), 'sun', .8);
    H.line(R, [[x - 14, y], [x + 14, y]], 'teal', 1.1);
  }
  vessel(H, R, 5.85, .89, 1.24, 9, 11, 'coral', false);
  const [ktx, kty] = H.p(5.85, .89, 1.24);
  stroke(H, R, [[ktx - 7, kty - 8], [ktx - 10, kty - 22], [ktx + 9, kty - 22], [ktx + 7, kty - 8]], 'blue', 2);
  shape(H, R, [[ktx + 7, kty - 5], [ktx + 18, kty - 15], [ktx + 17, kty - 19], [ktx + 5, kty - 12]], 'coral', .7, .7);
  for (const i of [4.8, 5.36, 5.92]) H.dot(...H.p(i, 1.51, 1.05), 2.5, 'blue');
  timber(H, R, 3.14, .48, 1.03, .83, 1.14, .065, 'paper');
  const [vegX, vegY] = H.p(3.64, .9, 1.23);
  oval(H, R, vegX, vegY, 12, 5, 'sun', .6);
  for (let n = 0; n < 3; n++) { oval(H, R, vegX - 7 + n * 7, vegY - 5, 5, 5, n === 1 ? 'coral' : 'paper', .85); stroke(H, R, [[vegX - 7 + n * 7, vegY - 9], [vegX - 9 + n * 7, vegY - 16], [vegX - 5 + n * 7, vegY - 13]], 'teal', 1); }
  cabinetFrame(H, R, 7.8, .35, 3.7, 1.3, .08, 3.05, 3, 'teal', (x, j, w, d, z, h, n) => {
    for (const zt of [.6, 1.43, 2.2]) timber(H, R, x, j, w, d, zt, .09, 'sun');
    if (n === 0) { for (let k = 0; k < 3; k++) bowl(H, R, x + w * .45, j + .5, .75 + k * .14, 1); bowl(H, R, x + .7, j + .6, 2.34, .65); }
    else if (n === 1) { for (let k = 0; k < 3; k++) { metal(H, R, x + .13 + k * .27, j + .15, .1, .65, .72, .55, k === 1 ? 'coral' : 'blue'); H.line(R, [H.p(x + .17 + k * .27, j + .35, 1.23), H.p(x + .17 + k * .27, j + .35, 1.6)], k === 1 ? 'sun' : 'blue', 2); } }
    else { bowl(H, R, x + .57, j + .55, .81, 1.4); timber(H, R, x + .06, j + .45, .15, .3, .67, .36, 'sun'); timber(H, R, x + w - .2, j + .45, .15, .3, .67, .36, 'sun'); }
    for (let k = 0; k < 2; k++) drape(H, R, x + .08, j + .1, w - .17, d - .18, 1.59 + k * .12, .11, n ? 'paper' : 'coral');
  });
  benchFrame(H, R, .3, 1.2, 2.25, 2.1, 1.05, 'teal');
  basin(H, R, .49, 1.49, 1.75, 1.34, 1.08, 'paper');
  bentTube(H, R, [[1.15, 2.0, 1.06], [1.15, 2.0, .36], [.55, 2.0, .36], [.55, .3, .36]], 2, 'blue');
  metal(H, R, .2, 3.54, 1.32, 4.16, .15, .79, 'teal');
  timber(H, R, .18, 3.5, 1.41, 4.27, .95, .14, 'sun');
  for (let n = 0; n < 3; n++) {
    shape(H, R, H.faceJ(1.54, 3.66 + n * 1.32, 1.12, .25, .84), 'paper', .63, .7);
    shape(H, R, H.faceJ(1.56, 3.79 + n * 1.32, .86, .35, .74), 'teal', .28, .6);
    H.line(R, [H.p(1.58, 3.98 + n * 1.32, .67), H.p(1.58, 4.38 + n * 1.32, .67)], 'sun', 1.9);
  }
  metal(H, R, .3, 3.71, 1.12, 2.21, 1.11, .035, 'paper');
  for (const i of [.39, 1.31]) bentTube(H, R, [[i, 3.85, 1.16], [i, 3.85, 1.56], [i, 5.8, 1.56], [i, 5.8, 1.16]], 1.2, 'teal');
  for (let n = 0; n < 7; n++) H.line(R, [H.p(.4, 3.93 + n * .27, 1.14), H.p(1.31, 3.93 + n * .27, 1.14)], 'blue', .75);
  timber(H, R, .38, 6.28, .94, 1.13, 1.12, .07, 'sun');
  const [chx, chy] = H.p(.9, 6.7, 1.2);
  oval(H, R, chx, chy, 11, 5, 'paper', 1);
  H.line(R, [[chx - 8, chy - 1], [chx + 9, chy + 3]], 'coral', 1.3);
  H.line(R, [[chx + 7, chy - 5], [chx + 16, chy - 10]], 'blue', 3);
  drape(H, R, .61, 7.16, .64, .42, 1.21, .5, 'paper');
  H.line(R, [H.p(.73, 7.59, .81), H.p(1.15, 7.59, .81)], 'coral', 1.5);
  for (let n = 0; n < 4; n++) { const [x, y] = H.p(.9, 3.95 + n * .48, 1.12); oval(H, R, x, y - 6, 7, 12, 'paper', 1); H.outline(R, ell(x, y - 6, 4, 8), 'coral', .6); }
  hangingRail(H, R, 'ne', 1.5, 5.2, 3.23, 5, (P, u, n) => {
    const [x, y] = P(u, -.17);
    if (n % 2) { H.line(R, [[x, y], [x + 1, y + 21]], n === 1 ? 'sun' : 'blue', 2); oval(H, R, x + 1, y + 25, 6, 4, 'blue', .55); }
    else { shape(H, R, [[x - 6, y + 3], [x + 6, y + 3], [x + 10, y + 16], [x + 9, y + 35], [x - 9, y + 35], [x - 10, y + 16]], n === 2 ? 'coral' : 'paper', n === 2 ? .6 : 1, .65); H.line(R, [[x - 5, y + 3], [x, y - 1], [x + 5, y + 3]], 'blue', 1); }
  });
  timber(H, R, 2.2, 3.61, 4.02, 1.72, .32, .1, 'teal');
  for (let n = 0; n < 2; n++) {
    const i = 2.42 + n * 1.88;
    metal(H, R, i, 3.77, 1.51, 1.12, .46, .32, 'paper');
    shape(H, R, H.faceI(i + .1, 4.91, 1.31, .51, .71), 'sun', .34, .55);
    H.line(R, [H.p(i + .49, 4.94, .64), H.p(i + .93, 4.94, .64)], 'teal', 1.8);
  }
  for (const i of [2.24, 6.03]) H.line(R, [H.p(i, 3.57, .35), H.p(i, 5.37, .95)], 'teal', 2.2);
  benchFrame(H, R, 2.0, 3.4, 4.43, 2.17, 1.14, 'sun');
  timber(H, R, 2.15, 4.95, 4.08, .16, .32, .16, 'sun');
  drape(H, R, 3.15, 3.65, 2.65, 1.8, 1.17, .39, 'paper');
  for (const [x, j, w, d] of [[3.35, 5.1, .27, .25], [5.35, 4.3, .25, .3], [3.55, 4.6, .2, .19]]) { shape(H, R, H.tile(x, j, w, d, 1.18), 'teal', .3, .55); for (let n = 0; n < 3; n++) H.line(R, [H.p(x + n * .07, j, 1.19), H.p(x + n * .07 + .02, j + d, 1.19)], 'coral', .6); }
  const [px, py] = H.p(6.2, 4.5, 1.17); oval(H, R, px, py, 21, 8, 'blue', .7); for (let n = 0; n < 5; n++) H.line(R, [[px - 14 + n * 7, py - 4], [px - 12 + n * 7, py + 5]], 'sun', 1.5);
  vessel(H, R, 6.2, 4.5, 1.2, 19, 15, 'teal');
  for (const side of [-1, 1]) { H.outline(R, ell(px + side * 23, py - 10, 7, 5), 'blue', 2.4); H.line(R, [[px + side * 24, py - 14], [px + side * 27, py - 11]], 'coral', 2.5); }
  oval(H, R, px, py - 14, 15, 4, 'sun', .56);
  H.line(R, [[px - 11, py - 9], [px - 11, py - 4]], 'paper', 1.3);
  metal(H, R, 5.98, 3.57, .56, .53, 1.19, .06, 'paper');
  H.line(R, [H.p(6.12, 3.67, 1.27), H.p(6.44, 3.67, 1.27), H.p(6.44, 3.95, 1.27)], 'teal', 1.2);
  cushion(H, R, 5.85, 3.65, .58, .48, 1.17, .07, 'coral');
  const [lx, ly] = H.p(5.95, 4.25, 1.2); H.line(R, [[lx, ly], [lx + 23, ly - 11]], 'blue', 1.8); H.line(R, [[lx + 14, ly - 7], [lx + 23, ly - 11]], 'sun', 3); oval(H, R, lx - 3, ly + 1, 6, 3.5, 'blue', .45);
  for (let n = 0; n < 3; n++) bowl(H, R, 2.6 + n * .48, 4.1, 1.22, .75);
  const [bx, by] = H.p(2.6, 5.05, 1.2); oval(H, R, bx, by, 17, 7, 'sun', .56); for (let n = 0; n < 5; n++) H.line(R, [[bx - 13 + n * 6, by - 4], [bx - 11 + n * 6, by + 5]], 'coral', .7); for (let n = 0; n < 3; n++) oval(H, R, bx - 9 + n * 8, by - 4, 6, 4, 'paper', 1);
  timber(H, R, 1.53, 8.82, 3.13, 1.69, .22, .09, 'sun');
  for (let n = 0; n < 3; n++) drape(H, R, 1.71, 8.92, 1.12, 1.27, .37 + n * .08, .1, n === 1 ? 'coral' : 'paper');
  benchFrame(H, R, 1.25, 8.55, 3.7, 2.25, .72, 'teal');
  const [spx, spy] = H.p(4.3, 9.4, .77);
  H.line(R, [[spx - 9, spy + 3], [spx + 8, spy - 6]], 'sun', 4.7); H.line(R, [[spx - 15, spy + 7], [spx - 8, spy + 3]], 'blue', 1.7); H.line(R, [[spx + 8, spy - 6], [spx + 15, spy - 10]], 'blue', 1.7);
  shape(H, R, H.tile(3.14, 9.96, 1.3, .53, .76), 'paper', 1, .55);
  for (let n = 0; n < 3; n++) { const [x, y] = H.p(3.43 + n * .35, 10.2, .78); oval(H, R, x, y, 4, 3, ['coral', 'sun', 'teal'][n], .7); }

  timber(H, R, 1.47, 8.84, 1.61, 1.04, .75, .07, 'sun');
  for (const [i, j, ink] of [[1.85, 9.16, 'coral'], [2.4, 9.34, 'teal'], [3.5, 9.5, 'sun']]) { const [x, y] = H.p(i, j, .84); oval(H, R, x, y, 6, 4, ink, .75); H.line(R, [[x, y - 3], [x + 2, y - 9]], 'blue', .7); }
  bowl(H, R, 3.61, 8.93, .85, .9);
  timber(H, R, 9.3, 3.0, 2.07, 2.31, .25, .15, 'teal');
  for (const [x, j] of [[9.45, 3.15], [11.1, 3.15], [9.45, 5.1], [11.1, 5.1]]) caster(H, R, x, j);
  bentTube(H, R, [[9.38, 3.2, .4], [9.38, 3.2, 1.48], [11.22, 3.2, 1.48], [11.22, 3.2, .4]], 2.5, 'teal');
  for (let n = 0; n < 2; n++) { vessel(H, R, 9.98 + n * .82, 4.15, .47, 12, 22, n ? 'coral' : 'paper', false); const [x, y] = H.p(9.98 + n * .82, 4.15, .47); H.line(R, [[x - 8, y - 9], [x + 8, y - 9]], 'teal', 2); }
  for (const i of [9.47, 11.19]) { metal(H, R, i, 3.21, .09, .09, .44, .83, 'teal'); }
  metal(H, R, 9.42, 3.3, 1.76, .61, .84, .05, 'teal');
  for (const i of [9.81, 10.64]) { const [x, y] = H.p(i, 3.58, .93); oval(H, R, x, y - 7, 12, 7, 'paper', 1); H.outline(R, ell(x, y - 7, 8, 4), 'coral', .8); }
  for (const i of [9.82, 10.81]) bentTube(H, R, [[i, 4.99, .43], [i, 4.62, 1.1], [i, 3.96, 1.09]], 1.8, 'coral');
  slattedSeat(H, R, 8.8, 8.31, 2.45, .05, 'teal', .84);
  drape(H, R, 9.62, 8.43, 1.17, .71, .65, .29, 'paper');
  const [hamX, hamY] = H.p(9.45, 9.8, .09);
  shape(H, R, [[hamX - 23, hamY - 17], [hamX + 23, hamY - 17], [hamX + 18, hamY + 5], [hamX - 18, hamY + 5]], 'sun', .67, .85);
  oval(H, R, hamX, hamY - 17, 23, 8, 'blue', .65);
  for (let n = 0; n < 5; n++) H.line(R, [[hamX - 16 + n * 8, hamY - 13], [hamX - 13 + n * 7, hamY + 3]], 'coral', .9);
  shape(H, R, [[hamX - 20, hamY - 18], [hamX - 4, hamY - 23], [hamX + 14, hamY - 18], [hamX + 22, hamY - 6], [hamX + 6, hamY - 5], [hamX - 9, hamY - 12]], 'paper', 1, .7);
  for (let n = 0; n < 3; n++) H.line(R, [[hamX + 7 + n * 4, hamY - 17], [hamX + 15 + n * 3, hamY - 7]], 'teal', .7);
  const [pegX, pegY] = H.p(9.19, 8.37, 1.45);
  H.line(R, [[pegX, pegY + 2], [pegX, pegY - 9]], 'sun', 1.8);
  stroke(H, R, [[pegX - 7, pegY + 7], [pegX - 4, pegY - 3], [pegX + 6, pegY - 2], [pegX + 8, pegY + 8]], 'coral', 1.5);
  shape(H, R, [[pegX - 9, pegY + 7], [pegX + 10, pegY + 7], [pegX + 11, pegY + 28], [pegX - 10, pegY + 28]], 'coral', .5, .7);
  timber(H, R, 1.12, .28, 5.55, .62, 2.27, .12, 'sun');
  for (const x of [1.4, 3.75, 6.28]) H.line(R, [H.p(x, .84, 2.25), H.p(x, .3, 1.99)], 'blue', 2);
  const [jx, jy] = H.p(1.8, .56, 2.41);
  shape(H, R, [[jx - 9, jy], [jx + 9, jy], [jx + 8, jy - 18], [jx + 3, jy - 25], [jx - 5, jy - 24], [jx - 8, jy - 17]], 'paper', 1, .7);
  stroke(H, R, [[jx + 7, jy - 19], [jx + 15, jy - 20], [jx + 15, jy - 7], [jx + 8, jy - 4]], 'coral', 2.5);
  H.line(R, [[jx + 13, jy - 16], [jx + 15, jy - 10]], 'teal', 3);
  const [wx, wy] = H.p(2.9, .57, 2.43); H.line(R, [[wx, wy], [wx, wy - 24]], 'sun', 2); for (let n = 0; n < 3; n++) H.outline(R, ell(wx, wy - 8, 3 + n * 2, 8), 'blue', .6);
  const [cx, cy] = H.p(4.1, .58, 2.44); oval(H, R, cx, cy - 10, 11, 12, 'teal', .6); oval(H, R, cx, cy - 10, 8, 9, 'paper', 1); H.line(R, [[cx - 4, cy - 13], [cx, cy - 10], [cx + 1, cy - 16]], 'blue', .8);
  const Q = (a, b) => H.p(5.0 + a, .5, 2.42 + b);
  shape(H, R, [Q(0, 0), Q(.92, 0), Q(.92, .65), Q(0, .65)], 'coral', .45, .6);
  shape(H, R, [Q(.07, .07), Q(.84, .07), Q(.84, .57), Q(.07, .57)], 'paper', 1, .4);
  H.line(R, [Q(.17, .17), Q(.31, .42), Q(.5, .16), Q(.68, .45), Q(.77, .18)], 'teal', 1.3);
  drape(H, R, 6.05, .33, .48, .42, 2.44, .16, 'paper');
  taskLight(H, R, 2.35, 3.5, 1.19, 'coral', .66);
  floorLight(H, 5.5, 5.4, 145, .36);
}, (H, R, t) => {
  const u = cycle(t, 22) * 22, trayLift = ease(.3, 1.8, u) * (1 - ease(2.8, 4.4, u)), open = ease(4.4, 8.8, u) * (1 - ease(13.2, 20, u));
  const [x, y0] = H.p(4.95, 4.95, 1.23), y = y0 - trayLift * 6;
  oval(H, R, x, y + 2, 44, 14, 'blue', .8); oval(H, R, x, y, 44, 14, 'blue', .55); oval(H, R, x, y - 1, 38, 10, 'paper', 1);
  for (const sign of [-1, 1]) { H.outline(R, ell(x + sign * 47, y, 6, 4.5), 'blue', 2, { tone: .85 }); H.line(R, [[x + sign * 46, y - 4], [x + sign * 50, y - 3]], 'coral', 2.8); }
  const [px, py] = H.p(6.2, 4.5, 1.2), lidY = py - 16 - open * 9, target = [px + 1, lidY - 4];
  poses[0].head = 8 - 13 * ease(8.8, 10, u) * (1 - ease(14, 17, u));
  aim(H, 4.5, 5.95, [[x - 50, y], [x - 43, y]], poses[0]);
  actor(H, R, 4.5, 5.95, t, 'istanbulSoupHands0', { shirt: ['teal', .65], hairStyle: 'curly' }, 0, 1.85);
  const rest = [x + 47, y], active = [rest[0] + (target[0] - rest[0]) * ease(4.4, 6, u), rest[1] + (target[1] - rest[1]) * ease(4.4, 6, u)];
  const back = ease(18, 20, u); active[0] += (rest[0] - active[0]) * back; active[1] += (rest[1] - active[1]) * back;
  aim(H, 6.7, 4.4, [active, [x + 55, y + 3]], poses[1]);
  actor(H, R, 6.7, 4.4, t, 'istanbulSoupHands1', { shirt: ['paper', 1], apron: ['coral', .66], hairStyle: 'bun' }, 0, 1.85);
  oval(H, R, px, lidY, 20, 6.2, 'teal', .75); H.line(R, [[px - 12, lidY - 2], [px - 4, lidY - 4]], 'paper', 1.2); oval(H, R, px + 1, lidY - 4, 4, 3, 'sun', .85);
});
room.loopSeconds = 22;
room.stillTime = 11;
export default room;
