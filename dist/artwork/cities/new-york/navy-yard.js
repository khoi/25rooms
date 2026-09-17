import { world, shape, oval, stroke, box, table, actor, bottle, cycle, TAU, wallPt, wallRect } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const sand = { ...rest, lean: -9, head: 15, al: 65, el: 17, ar: 75, er: 10 };
const pass = { ...sand, lean: -12, ar: 94, er: 2 };
FIGURES.clips.newYorkChairSand = { dur: 14, keys: [[0, sand], [.1, sand], [.2, pass], [.3, sand], [.4, pass], [.5, sand], [.6, { ...sand, ar: 44, er: 67, al: 80, el: 4, head: 23 }], [.75, { ...sand, ar: 44, er: 67, al: 80, el: 4, head: 23 }], [.88, sand], [1, sand]] };

function chair(H, R, i, j, z = 0, ink = 'sun', scale = 1) {
  const w = 1.34 * scale, d = 1.33 * scale, seat = .78 * scale;
  for (const x of [i + .08, i + w - .17]) for (const y of [j + .08, j + d - .17]) box(H, R, x, y, .12, .12, z, seat, ink, .55);
  for (const x of [i + .08, i + w - .17]) box(H, R, x, j + .04, .12, .12, z + seat, 1.1 * scale, ink, .55);
  box(H, R, i, j, w, .14, z + seat, .13, ink, .62);
  box(H, R, i, j + d - .14, w, .14, z + seat, .13, ink, .62);
  for (const x of [i, i + w - .14]) box(H, R, x, j, .14, d, z + seat, .13, ink, .62);
  for (const x of [i + .2, i + w - .27]) box(H, R, x, j + .12, .1, 1.03 * scale, z + .28 * scale, .1, ink, .5);
  for (const y of [j + .11, j + d - .2]) box(H, R, i + .16, y, w - .32, .1, z + .3 * scale, .11, ink, .5);
  box(H, R, i + .04, j + .04, w - .08, .15, z + 1.64 * scale, .23, ink, .68);
  for (let n = 0; n < 3; n++) box(H, R, i + .29 + n * .31 * scale, j + .07, .1, .09, z + seat + .13, .71 * scale, ink, .55);
  H.line(R, [H.p(i + .13, j + .2, z + 1.77 * scale), H.p(i + w - .1, j + .2, z + 1.77 * scale)], 'coral', .6, { tone: .6 });
}

function clamp(H, R, i, j, z, size = 1) {
  const [x, y] = H.p(i, j, z);
  stroke(H, R, [[x - 13 * size, y - 9 * size], [x - 19 * size, y - 9 * size], [x - 19 * size, y + 16 * size], [x + 9 * size, y + 16 * size], [x + 9 * size, y - 5 * size]], 'blue', 3 * size);
  H.line(R, [[x + 9 * size, y - 12 * size], [x + 9 * size, y + 5 * size]], 'teal', 2 * size);
  H.line(R, [[x + 3 * size, y - 12 * size], [x + 15 * size, y - 12 * size]], 'coral', 2 * size);
}

const room = world('new-york-navy-yard', 'Brooklyn Navy Yard · Chair in the Making', { floor: 'paper', tone: .66, wall: 'paper', wallTone: .91, height: 3.85, head: 20 }, (H, R) => {
  for (const side of ['nw', 'ne']) {
    for (let p = .25; p < 12; p += 3.2) shape(H, R, wallRect(H, side, p, p + .13, .02, 3.85, .06), 'blue', .58, .6);
    shape(H, R, wallRect(H, side, .01, 11.99, 3.48, 3.64, .07), 'teal', .62, .6);
  }
  shape(H, R, wallRect(H, 'ne', 3.9, 10.72, 1.69, 3.42, .1), 'blue', .7, 1);
  shape(H, R, wallRect(H, 'ne', 4.03, 10.58, 1.84, 3.3, .12), 'sun', .22, .7);
  for (let p = 4.05; p < 10.6; p += 1.08) H.line(R, [wallPt(H, 'ne', p, 1.84, .15), wallPt(H, 'ne', p, 3.3, .15)], 'paper', 2.3);
  H.line(R, [wallPt(H, 'ne', 4.03, 2.56, .15), wallPt(H, 'ne', 10.58, 2.56, .15)], 'paper', 2.3);
  for (let n = 0; n < 6; n++) shape(H, R, H.tile(4.04 + n * .96, 1.7, .38, 3.05, .025), 'sun', .08, .15);
  shape(H, R, wallRect(H, 'nw', 1.08, 3.87, .13, 3.26, .1), 'blue', .44, .8);
  shape(H, R, wallRect(H, 'nw', 1.24, 3.71, .22, 3.12, .12), 'teal', .31, .7);
  H.line(R, [wallPt(H, 'nw', 2.45, .25, .14), wallPt(H, 'nw', 2.45, 3.1, .14)], 'blue', .9);
  for (const p of [2.3, 2.65]) H.line(R, [wallPt(H, 'nw', p, 1.25, .16), wallPt(H, 'nw', p, 1.73, .16)], 'paper', 2.3);
  for (const j of [5.2, 8.8]) {
    box(H, R, .35, j, .12, .18, .2, 3.17, 'blue', .75);
    for (const z of [.65, 1.44, 2.29]) box(H, R, .38, j, 1.4, .13, z, .1, 'blue', .6);
  }
  for (let n = 0; n < 7; n++) {
    const x = .43 + n % 3 * .33, z = .79 + Math.floor(n / 3) * .82;
    box(H, R, x, 4.73 + n % 2 * .2, .29, 4.9 - n % 3 * .32, z, .17, 'sun', .43 + n % 2 * .13);
    H.line(R, [H.p(x + .13, 4.82, z + .19), H.p(x + .13, 9.28 - n % 3 * .32, z + .19)], 'coral', .55, { tone: .38 });
  }
  table(H, R, 3.22, 4.32, 4.9, 2.11, 1.05, 'sun');
  box(H, R, 3.25, 4.33, 4.85, 2.08, 1.18, .16, 'paper', .6);
  for (let n = 0; n < 6; n++) H.line(R, [H.p(3.34 + n * .78, 4.41, 1.35), H.p(3.34 + n * .78, 6.33, 1.35)], 'coral', .65, { tone: .33 });
  box(H, R, 3.57, 4.69, 4.1, 1.5, .3, .13, 'teal', .5);
  box(H, R, 6.61, 6.25, 1.28, .46, 1.02, .43, 'blue', .72);
  box(H, R, 6.47, 6.56, 1.56, .25, 1.1, .37, 'teal', .68);
  H.line(R, [H.p(7.22, 6.82, 1.2), H.p(7.22, 7.29, 1.2)], 'blue', 3.1);
  H.line(R, [H.p(7.22, 7.17, .87), H.p(7.22, 7.17, 1.53)], 'coral', 2.4);
  chair(H, R, 7.33, 4.78, .47, 'sun', 1.03);
  box(H, R, 6.91, 6.03, 1.94, .19, 1.32, .12, 'sun', .65);
  H.line(R, [H.p(6.93, 6.23, 1.41), H.p(8.81, 6.23, 1.41)], 'coral', .55);
  clamp(H, R, 7.15, 6.07, 1.41, .6);
  clamp(H, R, 4.17, 5.72, 1.36, .68);
  bottle(H, R, ...H.p(3.76, 4.84, 1.36), 'paper', .56);
  box(H, R, 4.29, 4.68, .9, .61, 1.36, .12, 'teal', .5);
  for (let n = 0; n < 3; n++) box(H, R, 4.38 + n * .21, 4.76, .13, .4, 1.5, .09, 'sun', .65);
  const [mx, my] = H.p(5.8, 4.98, 1.38);
  H.line(R, [[mx - 7, my + 9], [mx + 8, my - 17]], 'sun', 3.6);
  shape(H, R, [[mx - 3, my - 20], [mx + 13, my - 18], [mx + 12, my - 9], [mx - 4, my - 11]], 'paper', .9, .7);
  shape(H, R, [H.p(5.18, 5.46, 1.37), H.p(5.8, 5.46, 1.37), H.p(5.8, 6.07, 1.37), H.p(5.62, 6.07, 1.37), H.p(5.62, 5.64, 1.37), H.p(5.18, 5.64, 1.37)], 'blue', .63, .6);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(5.66, 5.6 + n * .09, 1.4), H.p(5.78, 5.6 + n * .09, 1.4)], 'paper', .55);
  H.line(R, [H.p(6.07, 5.46, 1.39), H.p(6.41, 5.89, 1.39)], 'coral', 1.4);
  shape(H, R, H.tile(3.52, 5.62, .54, .57, 1.38), 'coral', .46, .55);
  for (let n = 0; n < 12; n++) H.dot(...H.p(3.55 + R() * .48, 5.66 + R() * .48, 1.4), .65, 'blue', .4);
  box(H, R, 10.15, 2.95, 1.35, 4.72, .03, .79, 'teal', .6);
  for (let n = 0; n < 4; n++) {
    H.line(R, [H.p(10.17, 3.05 + n * 1.12, .1), H.p(10.17, 3.05 + n * 1.12, .76)], 'blue', .6);
    H.line(R, [H.p(10.13, 3.43 + n * 1.12, .5), H.p(10.13, 3.82 + n * 1.12, .5)], 'paper', 1.8);
  }
  bottle(H, R, ...H.p(10.72, 3.49, .83), 'teal', .72);
  const [ex, ey] = H.p(10.64, 5.03, 1.08);
  stroke(H, R, [[ex - 12, ey + 5], [ex - 13, ey - 8], [ex, ey - 15], [ex + 13, ey - 7], [ex + 12, ey + 5]], 'blue', 2);
  for (const dx of [-12, 12]) oval(H, R, ex + dx, ey + 5, 5, 8, 'coral', .7);
  shape(H, R, H.tile(2.65, 8.72, 2.0, 1.8, .04), 'coral', .25, .55);
  chair(H, R, 2.97, 8.89, .08, 'teal', .86);
  box(H, R, 9.37, 9.04, 1.55, 1.48, .04, .75, 'paper', .8);
  box(H, R, 9.33, 9.01, 1.63, 1.56, .8, .1, 'blue', .55);
  oval(H, R, ...H.p(10.15, 9.77, .92), 4, 3, 'coral', .6);
  H.line(R, [H.p(1.79, 10.21, .05), H.p(1.79, 10.21, 1.7)], 'sun', 2.1);
  box(H, R, 1.51, 9.94, .56, .52, .04, .17, 'teal', .6);
  for (let n = 0; n < 6; n++) H.line(R, [H.p(1.56 + n * .085, 10.48, .05), H.p(1.56 + n * .085, 10.48, .18)], 'blue', .6);
  shape(H, R, [H.p(.37, 2.87, .04), H.p(.99, 2.87, .04), H.p(.99, 3.22, .04), H.p(.37, 3.22, .2)], 'sun', .6, .6);
}, (H, R, t) => {
  const u = cycle(t, 14);
  actor(H, R, 8.02, 6.44, u * 14, 'newYorkChairSand', { shirt: ['coral', .6], apron: ['paper', .95], face: 'se', hairStyle: 'short', prop(h, r, points) {
    const [x, y] = points.nearHand;
    shape(h, r, [[x - 8, y - 1], [x + 5, y - 4], [x + 8, y + 2], [x - 5, y + 5]], 'sun', .6, .6);
    h.line(r, [[x - 6, y + 4], [x + 7, y + 1]], 'coral', 2.2);
  } }, .03, 1.4);
  actor(H, R, 4.15, 3.59, 0, 'think', { shirt: ['teal', .64], hairStyle: 'curly', face: 'se', glasses: true }, .03, 1.26);
  const flutter = Math.sin(u * TAU) * .045;
  shape(H, R, [H.p(4.09, .17, 3.26), H.p(6.89, .17, 3.26), H.p(6.89, .24 + flutter, 2.98), H.p(4.09, .24, 2.98)], 'paper', .75, .5);
});
room.loopSeconds = 14;
export default room;
