import { world, shape, oval, stroke, box, table, bench, actor, plant, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -7, head: 12, al: 54, ar: 70, el: 42, er: 27 };
FIGURES.clips.hongKongSketchCloud = { dur: 16, keys: [[0, seated], [.12, seated], [.27, { ...seated, ar: 77, er: 18 }], [.34, { ...seated, ar: 70, er: 27 }], [.43, { ...seated, ar: 78, er: 17 }], [.52, { ...seated, ar: 35, er: 105, head: -20 }], [.72, { ...seated, ar: 35, er: 105, head: -20 }], [.86, seated], [1, seated]] };

function cloud(H, R, x, y, scale = 1) {
  shape(H, R, [[x - 22 * scale, y + 4 * scale], [x - 19 * scale, y - 5 * scale], [x - 10 * scale, y - 6 * scale], [x - 5 * scale, y - 15 * scale], [x + 9 * scale, y - 14 * scale], [x + 14 * scale, y - 6 * scale], [x + 24 * scale, y - 4 * scale], [x + 27 * scale, y + 5 * scale]], 'paper', 1, .7);
}

function foldingChair(H, R, i, j, ink) {
  for (const x of [i, i + .82]) {
    H.line(R, [H.p(x, j, 0), H.p(x, j + .9, .8)], 'blue', 1.8);
    H.line(R, [H.p(x, j + .95, 0), H.p(x, j, .8)], 'blue', 1.8);
  }
  shape(H, R, H.tile(i, j + .15, .82, .62, .65), ink, .65);
  shape(H, R, H.faceI(i, j + .08, .82, .7, 1.35), ink, .65);
}

const room = world('hong-kong-west-kowloon-sketch', 'West Kowloon · Hold that cloud', { floor: 'paper', tone: .55, wall: false, head: 20 }, (H, R) => {
  const sky = H.faceI(.1, .15, 11.8, .4, 3.45);
  shape(H, R, sky, 'sun', .18);
  H.clip(sky, () => {
    shape(H, R, H.faceI(.1, .14, 11.8, .4, 1.4), 'teal', .44, .5);
    const hill = [[0, 1.32], [1.4, 1.83], [3, 2.13], [4.5, 1.7], [5.6, 1.88], [7, 1.52], [9, 1.67], [11.9, 1.34]].map(([i, z]) => H.p(i, .12, z));
    shape(H, R, [...hill, H.p(11.9, .12, 1.14), H.p(.1, .12, 1.14)], 'blue', .33, .65);
    for (let q = 0; q < 17; q++) {
      const i = .4 + q * .68, h = .16 + q % 4 * .13;
      shape(H, R, H.faceI(i, .1, .36, 1.14, 1.14 + h), q % 3 ? 'blue' : 'teal', .52, .35);
    }
    for (let q = 0; q < 16; q++) H.line(R, [H.p(.4 + q % 6 * 1.9, .08, .52 + Math.floor(q / 6) * .2), H.p(1 + q % 6 * 1.9, .08, .52 + Math.floor(q / 6) * .2)], 'paper', .9, { tone: .65 });
  });
  box(H, R, .08, .4, 11.84, .43, 0, .56, 'paper', .9);
  for (const i of [.3, 3.15, 6, 8.85, 11.7]) H.line(R, [H.p(i, .75, .5), H.p(i, .75, 1.29)], 'blue', 2.3);
  for (const z of [.87, 1.27]) H.line(R, [H.p(.3, .75, z), H.p(11.7, .75, z)], 'teal', 2.3);
  box(H, R, .6, 1.5, 1.4, 7.2, .01, .16, 'teal', .34);
  for (let q = 0; q < 5; q++) plant(H, R, ...H.p(1.2, 2.15 + q * 1.25, .18), 1.05);
  for (const [i, j] of [[2.6, 2.1], [2.6, 8.3], [7.5, 2.1]]) {
    box(H, R, i, j, .15, .15, .02, 3.43, 'teal', .55);
    box(H, R, i - .13, j - .12, .41, .4, .01, .11, 'blue', .5);
  }
  for (const j of [2.1, 8.3]) box(H, R, 2.45, j, 5.27, .2, 3.42, .18, 'paper', .8);
  for (let q = 0; q < 9; q++) {
    const i = 2.6 + q * .6;
    box(H, R, i, 2.1, .18, 6.43, 3.63, .09, q % 3 ? 'paper' : 'sun', .7);
    H.tint(H.tile(i + .3, 2.5, .14, 5.8, .03), 'blue', .13);
  }
  bench(H, R, 8.1, 1.6, 3.1, 'teal');
  for (let q = 0; q < 7; q++) H.line(R, [H.p(8.25 + q * .43, 1.77, .71), H.p(8.25 + q * .43, 2.33, .71)], 'paper', .8);
  foldingChair(H, R, 4.8, 6.35, 'coral');
  table(H, R, 3.1, 5.45, 2.3, 1.2, .94, 'paper');
  shape(H, R, H.tile(3.23, 5.57, 1.83, .86, 1.08), 'sun', .45);
  shape(H, R, H.tile(3.37, 5.63, 1.48, .72, 1.1), 'paper', 1);
  const [sx, sy] = H.p(4.09, 5.95, 1.12);
  H.line(R, [[sx - 18, sy + 6], [sx - 2, sy - 1], [sx + 15, sy + 4]], 'teal', .8);
  cloud(H, R, sx, sy - 3, .42);
  for (const [i, ink] of [[3.42, 'coral'], [3.82, 'teal'], [4.22, 'sun']]) oval(H, R, ...H.p(i, 6.47, 1.08), 3.5, 2, ink, .85);
  box(H, R, 3.06, 5.49, .12, .2, 1.09, .06, 'blue', .85);
  box(H, R, 4.94, 6.24, .12, .2, 1.09, .06, 'blue', .85);
  for (let q = 0; q < 4; q++) H.line(R, [H.p(5.08, 5.62 + q * .12, 1.1), H.p(5.48, 5.7 + q * .12, 1.1)], q % 2 ? 'coral' : 'blue', 1.4);
  const [bx, by] = H.p(3.03, 7.49, .04);
  shape(H, R, [[bx - 14, by], [bx + 17, by], [bx + 13, by - 26], [bx - 12, by - 28]], 'teal', .6);
  stroke(H, R, [[bx - 9, by - 25], [bx - 9, by - 38], [bx + 9, by - 38], [bx + 10, by - 25]], 'blue', 1.5);
  box(H, R, 3.38, 7.65, .66, .54, .03, .2, 'paper', 1);
  const [tx, ty] = H.p(4.01, 8.11, .06);
  shape(H, R, [[tx - 5, ty], [tx + 5, ty], [tx + 5, ty - 23], [tx - 5, ty - 23]], 'sun', .65);
  oval(H, R, tx, ty - 23, 5, 2, 'blue', .65);
  for (let q = 0; q < 3; q++) box(H, R, 9.35, 5.7 + q * .31, 1.03, .25, .02, .05, q === 1 ? 'coral' : 'paper', .8);
  for (const [i, j] of [[2.7, 10.7], [7.3, 10.7], [11, 4.1]]) {
    box(H, R, i, j, .2, .2, .02, .57, 'blue', .6);
    shape(H, R, H.faceI(i + .03, j + .21, .14, .4, .5), 'sun', .9, .3);
  }
  for (let q = 0; q < 9; q++) H.line(R, [H.p(1.7 + q * 1.05, 10.9, .01), H.p(1.9 + q * 1.05, 11.6, .01)], 'blue', .6, { tone: .3 });
}, (H, R, t) => {
  const u = cycle(t, 16);
  H.clip(H.faceI(.1, .15, 11.8, 1.85, 3.45), () => {
    const [x, y] = H.p(8.6 + Math.sin(u * TAU) * .3, .1, 2.79);
    cloud(H, R, x, y, 1.27);
  });
  actor(H, R, 5.3, 6.65, t, 'hongKongSketchCloud', { shirt: ['coral', .64], hairStyle: 'bun', face: 'nw', prop(h, r, p) {
    const [x, y] = p.nearHand;
    h.line(r, [[x + 2, y + 3], [x - 12, y - 10]], 'blue', 1.4);
    h.line(r, [[x - 12, y - 10], [x - 15, y - 12]], 'coral', .9);
  } }, .01, 1.26);
  actor(H, R, 9.27, 2.12, 0, 'sit', { shirt: ['paper', 1], hairStyle: 'cap', face: 'sw', prop(h, r, p) {
    const [x, y] = p.nearHand;
    shape(h, r, [[x - 12, y - 4], [x + 10, y + 1], [x + 10, y + 13], [x - 12, y + 8]], 'teal', .65, .7);
  } }, .08, 1.17);
  const [x, y] = H.p(6.65, 5.7, .03);
  shape(H, R, [[x - 7, y + 5], [x + 9, y + 5], [x + 9, y - 2], [x + 6, y - 8 + Math.sin(u * TAU) * 2], [x - 8, y - 4]], 'paper', 1, .65);
  H.dot(x + 4, y - 2, 2, 'sun', .85);
});
room.loopSeconds = 16;
export default room;
