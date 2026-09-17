import { world, shape, oval, stroke, box, table, actor, wallRect, wallPt, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const looking = { ...rest, lean: -4, head: 16, al: 24, ar: 27, el: 36, er: 32 };
FIGURES.clips.newYorkPanoramaFind = { dur: 18, keys: [[0, looking], [.13, looking], [.3, { ...looking, ar: 106, er: 4, head: 21 }], [.53, { ...looking, ar: 104, er: 8, head: 19 }], [.66, { ...looking, ar: 95, er: 13, head: 14 }], [.8, looking], [1, looking]] };
FIGURES.clips.newYorkPanoramaWheelFind = { dur: 18, keys: FIGURES.clips.newYorkPanoramaFind.keys.map(([time, pose]) => [time, { ...pose, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80 }]) };
FIGURES.clips.newYorkPanoramaLean = { dur: 18, keys: [[0, { ...rest, al: 44, ar: 45, el: 38, er: 37, head: 15 }], [.24, { ...rest, al: 44, ar: 45, el: 38, er: 37, head: 15 }], [.48, { ...rest, al: 55, ar: 59, el: 30, er: 27, head: 24, lean: -9 }], [.7, { ...rest, al: 55, ar: 59, el: 30, er: 27, head: 24, lean: -9 }], [.91, { ...rest, al: 44, ar: 45, el: 38, er: 37, head: 15 }], [1, { ...rest, al: 44, ar: 45, el: 38, er: 37, head: 15 }]] };

function modelBlock(H, R, i, j, w, d, height, ink = 'paper') {
  box(H, R, i, j, w, d, .77, height, ink, ink === 'paper' ? 1 : .6);
  if (height > .36) {
    for (let z = .88; z < .77 + height - .04; z += .15) H.line(R, [H.p(i + .035, j + d + .007, z), H.p(i + w - .035, j + d + .007, z)], 'blue', .45, { tone: .55, amp: .02 });
    box(H, R, i + w * .17, j + d * .17, w * .66, d * .66, .77 + height, .05, 'sun', .42);
  }
}

function cityModel(H, R) {
  box(H, R, 2.35, 2.09, 7.08, 6.98, .1, .5, 'blue', .68);
  box(H, R, 2.27, 2.01, 7.24, 7.14, .61, .14, 'paper', 1);
  shape(H, R, H.tile(2.42, 2.16, 6.94, 6.84, .77), 'teal', .66, .6);
  const land = [
    [[2.64, 2.35], [4.91, 2.35], [4.82, 3.28], [4.26, 4.07], [4.17, 5.59], [3.61, 6.2], [2.64, 6.13]],
    [[5.75, 2.36], [9.11, 2.36], [9.11, 5.27], [7.41, 5.45], [6.47, 4.95], [6.13, 3.66]],
    [[6.77, 5.61], [9.11, 5.53], [9.11, 8.7], [5.53, 8.7], [5.7, 7.46], [6.47, 6.98]],
    [[4.83, 3.05], [5.53, 3.09], [6.15, 6.52], [5.63, 7.39], [5.04, 6.68], [4.44, 4.21]],
    [[2.65, 7.15], [3.53, 6.96], [4.56, 7.75], [4.47, 8.7], [2.65, 8.7]],
  ];
  for (const polygon of land) shape(H, R, polygon.map(([i, j]) => H.p(i, j, .79)), 'sun', .27, .7);
  for (let i = 2.8; i < 4.1; i += .34) for (let j = 2.63; j < 5.88; j += .43) modelBlock(H, R, i, j, .22, .29, .11 + (Math.floor(j * 10) % 3) * .04, 'paper');
  for (let i = 6.6; i < 8.95; i += .44) for (let j = 2.65; j < 4.98; j += .41) {
    if (i > 7.87 && j < 3.5) continue;
    modelBlock(H, R, i, j, .3, .25, .1 + Math.floor(i * 10 + j * 10) % 4 * .035, Math.floor(i * 10) % 3 ? 'paper' : 'coral');
  }
  for (let i = 6.65; i < 8.96; i += .47) for (let j = 6.09; j < 8.58; j += .44) modelBlock(H, R, i, j, .33, .28, .12 + Math.floor(j * 10) % 3 * .055);
  for (let j = 3.29; j < 6.78; j += .32) {
    const i = 4.76 + (j - 3.29) * .2;
    for (let k = 0; k < 2; k++) {
      if (j > 3.95 && j < 4.67 && k === 0) continue;
      modelBlock(H, R, i + k * .33, j, .24, .22, j > 4.7 && j < 5.7 ? .35 + k * .19 : .13 + k * .07);
    }
  }
  shape(H, R, [H.p(4.86, 4.06, .82), H.p(5.14, 4.06, .82), H.p(5.3, 4.72, .82), H.p(5.01, 4.72, .82)], 'teal', .85, .5);
  for (const [i, j, height] of [[5.21, 4.91, .78], [5.55, 5.34, .68], [5.66, 6.49, .98], [5.34, 5.67, .58]]) {
    modelBlock(H, R, i, j, .2, .23, height);
    H.line(R, [H.p(i + .1, j + .12, .77 + height), H.p(i + .1, j + .12, 1.02 + height)], 'blue', .55);
  }
  for (let i = 2.96; i < 4.22; i += .41) for (let j = 7.45; j < 8.52; j += .45) modelBlock(H, R, i, j, .26, .29, .12);
  for (const [a, b, c, d] of [[4.04, 4.16, 4.56, 4.13], [5.98, 5.39, 6.77, 5.12], [6.09, 6.52, 6.76, 6.48], [4.36, 8.04, 5.56, 8.09]]) {
    H.line(R, [H.p(a, b, .94), H.p(c, d, .94)], 'paper', 3.5);
    H.line(R, [H.p(a, b, .95), H.p(c, d, .95)], 'blue', .6);
    for (const f of [.22, .78]) {
      const i = a + (c - a) * f, j = b + (d - b) * f;
      H.line(R, [H.p(i, j, .8), H.p(i, j, 1.19)], 'coral', .8);
    }
    stroke(H, R, [H.p(a, b, .95), H.p(a + (c - a) * .22, b + (d - b) * .22, 1.19), H.p(a + (c - a) * .5, b + (d - b) * .5, 1.01), H.p(a + (c - a) * .78, b + (d - b) * .78, 1.19), H.p(c, d, .95)], 'blue', .5);
  }
  const runway = [H.p(7.87, 2.67, .82), H.p(8.91, 2.67, .82), H.p(8.91, 2.91, .82), H.p(7.87, 2.91, .82)];
  shape(H, R, runway, 'blue', .4, .4);
  for (let k = 0; k < 6; k++) H.line(R, [H.p(7.96 + k * .16, 2.79, .83), H.p(8.04 + k * .16, 2.79, .83)], 'paper', .8);
  modelBlock(H, R, 8.14, 3.12, .53, .21, .09, 'coral');
  for (let k = 0; k < 4; k++) oval(H, R, ...H.p(3.1 + k * .3, 6.55, .83), 4, 1.5, 'paper', 1);
}

function rail(H, R, from, to, posts, z = 1.43) {
  const a = H.p(...from, z), b = H.p(...to, z);
  shape(H, R, [H.p(...from, .65), H.p(...to, .65), b, a], 'paper', .18, .5);
  H.line(R, [a, b], 'blue', 2.2);
  H.line(R, [H.p(...from, z - .05), H.p(...to, z - .05)], 'sun', .8);
  for (let k = 0; k <= posts; k++) {
    const i = from[0] + (to[0] - from[0]) * k / posts, j = from[1] + (to[1] - from[1]) * k / posts;
    H.line(R, [H.p(i, j, .24), H.p(i, j, z)], 'blue', 1.65);
    oval(H, R, ...H.p(i, j, .25), 4, 2, 'blue', .5);
  }
}

function wheelchair(H, R, i, j, t) {
  const [x, y] = H.p(i, j, .11);
  oval(H, R, x - 10, y - 7, 13, 15, 'blue', .6);
  oval(H, R, x - 10, y - 7, 10, 12, 'paper', 1);
  H.line(R, [[x + 4, y - 12], [x - 16, y - 12], [x - 27, y + 6], [x - 36, y + 6]], 'blue', 2.5);
  H.line(R, [[x + 9, y - 8], [x + 9, y - 32], [x + 16, y - 35]], 'blue', 2.5);
  H.line(R, [[x - 11, y - 17], [x - 11, y - 29], [x + 7, y - 29]], 'blue', 2);
  shape(H, R, [[x - 13, y - 17], [x + 9, y - 15], [x + 9, y - 29], [x - 13, y - 31]], 'teal', .65, .7);
  actor(H, R, i, j, t, 'newYorkPanoramaWheelFind', { shirt: ['coral', .66], hairStyle: 'curly', face: 'sw' }, .29, 1.3);
  oval(H, R, x + 12, y - 7, 15, 17, 'blue', .72);
  oval(H, R, x + 12, y - 7, 12, 14, 'paper', 1);
  for (let k = 0; k < 8; k++) {
    const a = k * TAU / 8;
    H.line(R, [[x + 12, y - 7], [x + 12 + Math.cos(a) * 11, y - 7 + Math.sin(a) * 13]], 'blue', .65);
  }
  H.dot(x + 12, y - 7, 2.4, 'teal', .9);
  H.line(R, [[x + 12, y - 7], [x - 17, y + 7], [x - 27, y + 7]], 'blue', 2);
  oval(H, R, x - 26, y + 9, 4, 5, 'blue', .8);
  H.line(R, [[x - 28, y + 6], [x - 39, y + 5]], 'teal', 3.2);
}

const room = world('new-york-queens-panorama', 'Flushing Meadows · A City on a Table', { floor: 'blue', tone: .12, wall: 'paper', wallTone: .8, height: 3.55, head: 20 }, (H, R) => {
  for (const side of ['nw', 'ne']) {
    shape(H, R, wallRect(H, side, .1, 11.9, .12, .35), 'blue', .6, .6);
    for (let p = .5; p < 12; p += 2.25) H.line(R, [wallPt(H, side, p, .35, .03), wallPt(H, side, p, 3.5, .03)], 'blue', .65, { tone: .2 });
  }
  for (const [p, w] of [[1.4, 2.35], [5.04, 2.74], [8.95, 1.75]]) {
    shape(H, R, wallRect(H, 'ne', p, p + w, 2.02, 3.04), 'teal', .16, .75);
    const [x, y] = wallPt(H, 'ne', p + w / 2, 2.53, .05);
    oval(H, R, x, y, 15, 12, 'sun', .6);
    for (let k = 0; k < 5; k++) box(H, R, p + .21 + k * (w - .4) / 5, -.06, (w - .5) / 6, .03, 2.13, .15 + k % 3 * .14, 'blue', .45);
  }
  shape(H, R, H.tile(.71, .76, 10.67, 10.62, .09), 'paper', .7, .6);
  shape(H, R, H.tile(1.81, 1.56, 8.33, 8.08, .12), 'blue', .66, .75);
  cityModel(H, R);
  shape(H, R, [H.p(.52, 2, .1), H.p(1.47, 2, .1), H.p(1.47, 10.5, .45), H.p(.52, 10.5, .45)], 'paper', 1, .8);
  for (let j = 2.3; j < 10.3; j += .85) H.line(R, [H.p(.59, j, .1 + (j - 2) * .041), H.p(1.41, j, .1 + (j - 2) * .041)], 'blue', .55, { tone: .3 });
  rail(H, R, [1.63, 1.62], [9.93, 1.62], 6);
  rail(H, R, [1.63, 1.62], [1.63, 9.51], 5);
  box(H, R, 10.22, .64, .74, .63, .03, 1.83, 'blue', .58);
  shape(H, R, H.faceI(10.3, 1.29, .58, 1.3, 1.7), 'paper', 1, .5);
  shape(H, R, [H.p(10.38, 1.31, 1.48), H.p(10.68, 1.31, 1.62), H.p(10.8, 1.31, 1.38)], 'teal', .5, .4);
  for (const i of [3.09, 7.57]) {
    H.line(R, [H.p(i, .29, 3.5), H.p(i, .29, 3.18)], 'blue', 1.2);
    box(H, R, i - .28, .26, .6, .48, 3.05, .25, 'blue', .75);
    oval(H, R, ...H.p(i, .76, 3.12), 7, 4, 'sun', .9);
    H.tint([H.p(i, .76, 3.09), H.p(i + 1.12, 3.51, .84), H.p(i - .85, 3.17, .84)], 'sun', .035);
  }
  table(H, R, 3.35, 10.64, 3.02, .7, .56, 'teal');
  box(H, R, 3.35, 10.64, 3.02, .11, .7, .55, 'teal', .6);
  for (let k = 0; k < 7; k++) H.line(R, [H.p(3.5 + k * .4, 10.67, .68), H.p(3.5 + k * .4, 11.29, .68)], 'blue', .65);
  box(H, R, 8.25, 10.6, 1.7, .9, .01, .25, 'sun', .48);
  shape(H, R, [H.p(8.32, 10.68, .3), H.p(9.89, 10.68, .3), H.p(9.89, 11.4, .61), H.p(8.32, 11.4, .61)], 'paper', 1, .7);
  for (let k = 0; k < 4; k++) shape(H, R, H.tile(8.58 + k * .29, 10.93, .19, .21, .46), ['teal', 'coral', 'blue', 'sun'][k], .65, .5);
  oval(H, R, ...H.p(11.08, 9.72, .04), 14, 7, 'blue', .45);
  box(H, R, 10.77, 9.4, .58, .54, .06, .93, 'paper', 1);
  oval(H, R, ...H.p(11.06, 9.67, 1.02), 12, 5, 'blue', .6);
}, (H, R, t) => {
  H.at(5.55, 1.2, 0, h => actor(h, R, 5.55, 1.2, 0, 'hold', { shirt: ['blue', .64], hairStyle: 'short', prop(hh, rr, p) {
    const [x, y] = p.nearHand;
    shape(hh, rr, [[x - 6, y - 7], [x + 8, y - 4], [x + 8, y + 7], [x - 6, y + 4]], 'paper', 1, .6);
    hh.line(rr, [[x - 3, y - 2], [x + 5, y]], 'teal', .8);
  } }, .1, 1.25));
  H.at(10.68, 5.37, 0, h => wheelchair(h, R, 10.68, 5.37, t));
  H.at(10.64, 6.62, 0, h => actor(h, R, 10.64, 6.62, t, 'newYorkPanoramaLean', { shirt: ['sun', .78], hairStyle: 'short', face: 'sw' }, .2, 1.4, 'child'));
  H.at(6.68, 9.98, 0, h => actor(h, R, 6.68, 9.98, t, 'newYorkPanoramaFind', { shirt: ['teal', .68], hairStyle: 'pony', face: 'nw' }, .15, 1.25));
  H.at(7.73, 10.25, 0, h => actor(h, R, 7.73, 10.25, 0, 'hold', { shirt: ['paper', 1], hairStyle: 'bald', face: 'nw', glasses: true }, .15, 1.2, 'elder'));
  H.at(9.94, 7.14, 0, h => rail(h, R, [9.94, 1.62], [9.94, 9.51], 5));
  H.at(6.39, 9.51, 0, h => rail(h, R, [1.63, 9.51], [9.94, 9.51], 6));
  const u = cycle(t, 18), [x, y] = H.p(9.7, 10.91, .64);
  H.dot(x, y, 1.6, 'sun', .65 + Math.sin(u * TAU) * .12);
});

room.loopSeconds = 18;
export default room;
