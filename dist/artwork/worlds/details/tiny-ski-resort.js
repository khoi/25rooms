import { actor, box, cycle, oval, shape, steam, stroke, table, TAU } from '../common.js';
import { slab } from '../../drawings.js';

const palette = ['coral', 'teal', 'sun', 'blue'];

function pine(H, R, i, j, z, size = 1) {
  const [x, y] = H.p(i, j, z);
  H.line(R, [[x, y + 3], [x, y - 31 * size]], 'blue', 2);
  for (let k = 0; k < 3; k++) {
    const top = y - (30 + k * 15) * size;
    const width = (18 - k * 3.5) * size;
    shape(H, R, [[x - width, top + 26 * size], [x, top], [x + width, top + 26 * size]], 'teal', .7);
    stroke(H, R, [[x - width * .63, top + 16 * size], [x, top + 5 * size], [x + width * .58, top + 16 * size]], 'paper', 3 * size);
  }
}

function pole(H, R, i, j, z, number, ink = 'coral') {
  const [x, y] = H.p(i, j, z);
  H.line(R, [[x, y], [x, y - 29]], 'blue', 1.2);
  shape(H, R, [[x, y - 29], [x + 14, y - 28], [x + 12, y - 18], [x, y - 19]], ink, .8);
  if (number) {}
}

function skiPair(H, R, x, y, ink, lean = 0) {
  for (const dx of [-3, 3]) {
    stroke(H, R, [[x + dx, y], [x + dx + lean, y - 33], [x + dx + lean - 2, y - 39]], ink, 3);
    H.line(R, [[x + dx - 2, y - 15], [x + dx + 2, y - 15]], 'blue', 2);
    H.line(R, [[x + dx - 2, y - 24], [x + dx + 2, y - 24]], 'paper', 1.5);
  }
}

function mug(H, R, x, y, ink = 'coral') {
  shape(H, R, [[x - 3.5, y], [x + 3.5, y], [x + 4, y - 7], [x - 4, y - 7]], ink, .8);
  oval(H, R, x + 5, y - 3.8, 2.2, 2.4, 'paper', 1);
  oval(H, R, x, y - 7, 3.6, 1.6, 'blue', .9);
}

function bench(H, R, i, j, width) {
  for (const a of [0, width - .15]) box(H, R, i + a, j, .12, .6, 0, .35, 'blue');
  box(H, R, i, j, width, .65, .35, .12, 'coral');
  H.line(R, [H.p(i, j + .24, .48), H.p(i + width, j + .24, .48)], 'blue', .65);
}

function sign(H, R, i, j, z, text, ink = 'sun', width = 62) {
  const [x, y] = H.p(i, j, z);
  H.line(R, [[x, y + 9], [x, y - 24]], 'blue', 2);
  shape(H, R, [[x - width / 2, y - 24], [x + width / 2, y - 24], [x + width / 2 + 6, y - 17], [x + width / 2, y - 10], [x - width / 2, y - 10]], ink, .75);
}

function sled(H, R, i, j, ink = 'coral') {
  for (const d of [0, .43]) stroke(H, R, [H.p(i - .18, j + d, .05), H.p(i + 1.05, j + d, .05), H.p(i + 1.16, j + d, .18)], 'blue', 1.8);
  box(H, R, i, j, .9, .5, .12, .11, ink);
  for (let n = 1; n < 5; n++) H.line(R, [H.p(i + n * .16, j, .24), H.p(i + n * .16, j + .5, .24)], 'blue', .7);
}

function snowman(H, R, i, j, size = 1) {
  const [x, y] = H.p(i, j, .02);
  oval(H, R, x, y - 10 * size, 13 * size, 12 * size, 'paper', 1);
  oval(H, R, x, y - 26 * size, 9 * size, 9 * size, 'paper', 1);
  H.line(R, [[x - 8 * size, y - 20 * size], [x + 8 * size, y - 19 * size], [x + 10 * size, y - 10 * size]], 'coral', 3 * size);
  for (const side of [-1, 1]) {
    H.line(R, [[x + side * 11 * size, y - 13 * size], [x + side * 22 * size, y - 25 * size]], 'blue', 1);
    H.dot(x + side * 3 * size, y - 28 * size, 1.1 * size, 'blue');
  }
  shape(H, R, [[x + 1 * size, y - 26 * size], [x + 14 * size, y - 24 * size], [x + 2 * size, y - 23 * size]], 'coral', 1);
  H.line(R, [[x - 11 * size, y - 34 * size], [x + 11 * size, y - 34 * size]], 'blue', 2 * size);
  shape(H, R, [[x - 6 * size, y - 34 * size], [x + 6 * size, y - 34 * size], [x + 5 * size, y - 44 * size], [x - 5 * size, y - 44 * size]], 'teal', .8);
  for (let k = 0; k < 3; k++) H.dot(x, y - (6 + k * 5) * size, 1.1 * size, 'blue');
}

function skier(H, R, i, j, z, t, ink = 'coral', scale = 1) {
  const [x, y] = H.p(i, j, z);
  const p = (a, b) => [x + a * scale, y + b * scale];
  const bend = Math.sin(t * 2) * 2;
  H.tint([[x - 13, y + 4], [x + 21, y - 3], [x + 28, y], [x - 6, y + 7]], 'blue', .12);
  for (const dy of [0, 5]) stroke(H, R, [p(-18, dy), p(19, dy - 8), p(24, dy - 12)], ink, 2.3);
  for (const d of [-4, 4]) stroke(H, R, [p(d + 1, -3), p(d + 7, -12), p(d - 1, -20)], 'blue', 2.6 * scale);
  shape(H, R, [p(-9, -20), p(4, -22), p(9 + bend, -34), p(-3 + bend, -37)], ink, .85);
  oval(H, R, ...p(2 + bend, -43), 5.7 * scale, 6.1 * scale, 'paper', 1);
  stroke(H, R, [p(-3 + bend, -46), p(1 + bend, -50), p(7 + bend, -45)], ink, 4 * scale);
  H.line(R, [p(0 + bend, -43), p(8 + bend, -43)], 'blue', 2.4 * scale);
  stroke(H, R, [p(6, -31), p(15, -24), p(21, -29)], ink, 3 * scale);
  H.line(R, [p(20, -29), p(28, -4)], 'blue', .9);
  H.line(R, [p(24, -5), p(31, -6)], 'blue', .8);
  stroke(H, R, [p(-4, -33), p(-12, -23), p(-17, -26)], ink, 2.6 * scale);
  H.line(R, [p(-17, -26), p(-11, 2)], 'blue', .8);
}

function station(H, R, i, j, z, top = false) {
  const width = top ? 1.35 : 1.8;
  box(H, R, i - width / 2, j - .5, width, 1, z, .15, 'blue', .3);
  for (const side of [-1, 1]) box(H, R, i + side * (width / 2 - .15), j - .26, .12, .62, z + .15, .9, 'teal');
  box(H, R, i - width / 2 - .13, j - .6, width + .26, 1.2, z + 1.05, .16, 'coral');
  shape(H, R, H.tile(i - width / 2 - .13, j - .6, width + .26, 1.2, z + 1.23), 'paper', 1);
  const [x, y] = H.p(i, j + .6, z + 1.08);

  oval(H, R, ...H.p(i, j, z + 1.18), 16, 5, 'blue', .6);
}

function lodge(H, R) {
  const i = 8.85, j = 1.75, w = 2.4, d = 2.15;
  box(H, R, i, j, w, d, .05, 1.7, 'coral', .62);
  for (let z = .2; z < 1.7; z += .22) {
    H.line(R, [H.p(i, j + d, z), H.p(i + w, j + d, z), H.p(i + w, j, z)], 'blue', .6, { tone: .6 });
  }
  const front = (a, z) => H.p(i + a, j + d + .015, z);
  shape(H, R, [front(.95, .08), front(1.52, .08), front(1.52, 1.43), front(.95, 1.43)], 'teal', .8);
  H.dot(...front(1.4, .8), 1.5, 'sun');
  for (const offset of [.17, 1.73]) {
    shape(H, R, [front(offset, .8), front(offset + .47, .8), front(offset + .47, 1.35), front(offset, 1.35)], 'sun', .85);
    H.line(R, [front(offset + .235, .8), front(offset + .235, 1.35)], 'blue', .8);
    H.line(R, [front(offset, 1.08), front(offset + .47, 1.08)], 'blue', .8);
  }
  const roof = [H.p(i - .18, j - .2, 1.72), H.p(i + w / 2, j - .2, 2.6), H.p(i + w + .18, j - .2, 1.72), H.p(i + w + .18, j + d + .22, 1.72), H.p(i + w / 2, j + d + .22, 2.6), H.p(i - .18, j + d + .22, 1.72)];
  shape(H, R, roof, 'blue', .7);
  shape(H, R, [roof[0], roof[1], roof[4], roof[5]], 'paper', 1);
  shape(H, R, [roof[1], roof[2], roof[3], roof[4]], 'teal', .22);
  for (let q = 0; q < 7; q++) H.line(R, [H.p(i + w / 2 + .17, j + q * .35, 2.52), H.p(i + w + .08, j + q * .35, 1.88)], 'paper', 3);
  box(H, R, i + 1.55, j + .3, .34, .34, 2.07, .86, 'coral', .7);
  shape(H, R, H.tile(i + 1.5, j + .25, .44, .44, 2.94), 'paper', 1);
  const [x, y] = H.p(i + w / 2, j + d + .23, 1.69);
  shape(H, R, [[x - 34, y - 6], [x + 34, y - 6], [x + 34, y + 7], [x - 34, y + 7]], 'sun', .9);

  for (let n = 0; n < 8; n++) {
    const p = H.p(i + n * .32, j + d + .25, 1.66);
    H.line(R, [p, [p[0], p[1] + 7 + n % 3 * 2]], 'paper', 1.5);
  }
}

function groomer(H, R) {
  const i = 9.45, j = 7.7;
  for (const a of [0, 1.25]) {
    const [x, y] = H.p(i + a, j + .64, .18);
    oval(H, R, x, y, 23, 8, 'blue', .88);
    for (let k = -3; k < 4; k++) H.line(R, [[x + k * 6 - 1, y - 7], [x + k * 6 + 3, y + 6]], 'paper', 1);
  }
  box(H, R, i, j, 1.55, 1.35, .3, .5, 'coral', .85);
  box(H, R, i + .12, j + .1, .95, .8, .8, .85, 'coral', .85);
  shape(H, R, [H.p(i + .21, j + .92, .99), H.p(i + .96, j + .92, .99), H.p(i + .96, j + .92, 1.5), H.p(i + .21, j + .92, 1.5)], 'teal', .5);
  box(H, R, i + .05, j + .02, 1.15, 1, 1.62, .1, 'paper', 1);
  box(H, R, i + .15, j + 1.42, 1.58, .15, .12, .65, 'sun', .78);
  for (const a of [.37, 1.18]) H.line(R, [H.p(i + a, j + 1.35, .55), H.p(i + a, j + 1.62, .37)], 'blue', 2);
  for (const a of [.23, 1.36]) H.dot(...H.p(i + a, j + 1.37, .71), 3, 'paper');
  const [x, y] = H.p(i + .9, j + .4, 1.86);
  oval(H, R, x, y, 4, 4, 'sun', .9);
  H.line(R, [[x - 5, y + 4], [x + 5, y + 4]], 'blue', 1.1);
}

export default function enrich(room) {
  return {
    ...room,
    under(H, R) {
      const floor = slab(H, R, this, { ink: 'paper', tone: 1, edgeInk: 'teal', edgeTone: .4 });
      H.speckle(R, floor, 'blue', 550, .2, .55, .18);
      const mountain = [H.p(.35, .65), H.p(6, .8, 5.5), H.p(11.6, 1.1), H.p(10.9, 7.8), H.p(5.5, 10.6), H.p(.4, 8.1)];
      shape(H, R, mountain, 'paper', 1);
      shape(H, R, [H.p(6, .8, 5.5), H.p(11.6, 1.1), H.p(10.9, 7.8), H.p(7.4, 5.1, 2.35)], 'teal', .18);
      shape(H, R, [H.p(6, .8, 5.5), H.p(5.3, 2.2, 3.95), H.p(6.15, 2.65, 3.5), H.p(6.55, 1.85, 3.95), H.p(7.2, 2.45, 3.22), H.p(7.2, 1.3, 3.45)], 'blue', .12);
      for (const [a, b, c] of [[3.5, 1.7, 1.35], [8.3, 2.3, 1.8], [1.6, 5.7, .6]]) {
        stroke(H, R, [H.p(a, b, c), H.p(a + .6, b + .55, c - .2), H.p(a + 1.15, b + .6, c - .18)], 'teal', .8, .32);
      }
      for (const d of [-.2, .2]) {
        stroke(H, R, [H.p(6 + d, 1.2, 5.1), H.p(4.85 + d, 3.35, 2.9), H.p(6.5 + d, 6, 1.05), H.p(5.6 + d, 9.2, .18)], 'teal', .8, .35);
      }
      for (const [i, j, z, n] of [[6.8, 1.55, 4.5, '1'], [4.4, 3.5, 2.8, '2'], [7.1, 5.5, 1.55, '3'], [4.9, 7.45, .7, '4'], [6.4, 9.1, .1, '5']]) pole(H, R, i, j, z, n);
      for (const [i, j, z, s] of [[1.2, 1.9, .1, .8], [1.6, 3.1, .1, .75], [1.1, 4.8, .1, .8], [.7, 7.2, 0, .6], [10.75, .75, 0, .9], [11.35, 4.5, 0, .7], [11.2, 6.2, 0, .75], [2.05, 11.1, 0, .5]]) pine(H, R, i, j, z, s);
      for (const [i, j, z] of [[4.3, 4.3, 3.6], [2.7, 8.1, 2.4]]) {
        H.line(R, [H.p(i, j, Math.max(0, z - 1.8)), H.p(i, j, z)], 'blue', 3);
        H.line(R, [H.p(i - .38, j - .14, z), H.p(i + .38, j + .14, z)], 'coral', 3);
        for (const d of [-.32, .32]) oval(H, R, ...H.p(i + d, j, z), 4, 2, 'blue', .7);
      }
      station(H, R, 5.6, 1.15, 4.65, true);
      station(H, R, 2.5, 9, .75);
      for (const offset of [-.15, .15]) H.line(R, [H.p(2.5 + offset, 9, 2), H.p(5.6 + offset, 1.15, 5.9)], 'blue', 1.1);
      for (const j of [9.25, 10.1]) {
        for (const i of [2.7, 4.1]) H.line(R, [H.p(i, j), H.p(i, j, .6)], 'blue', 1.4);
        H.line(R, [H.p(2.7, j, .55), H.p(4.1, j, .55)], 'coral', 1.5);
      }
      sign(H, R, 3.5, 10.25, 0, 'LIFT TICKETS', 'sun', 64);
      lodge(H, R);
      shape(H, R, H.tile(8.35, 4.35, 2.8, 2.5, .03), 'sun', .17);
      for (let j = 4.35; j < 6.8; j += .3) H.line(R, [H.p(8.35, j, .04), H.p(11.15, j, .04)], 'blue', .5, { tone: .4 });
      for (const [i, j] of [[8.8, 4.85], [10.15, 5.55]]) {
        table(H, R, i, j, .9, .7, .62, 'teal');
        const [x, y] = H.p(i + .38, j + .3, .75);
        mug(H, R, x - 6, y, 'coral'); mug(H, R, x + 9, y + 3, 'sun');
        oval(H, R, x + 2, y - 4, 5, 2.5, 'paper', 1);
        H.dot(x + 2, y - 5, 2, 'coral');
      }
      bench(H, R, 8.65, 6.1, 1.3);
      for (let k = 0; k < 4; k++) {
        const [x, y] = H.p(11.15, 4.4 + k * .45, .05);
        skiPair(H, R, x, y, palette[k], -5);
      }
      box(H, R, 8.12, 4.1, .22, 1.7, 0, .35, 'blue', .3);
      sign(H, R, 10.5, 6.65, 0, 'HOT COCOA', 'paper', 61);
      table(H, R, .85, 9.4, 1.35, .9, .63, 'sun');
      for (let k = 0; k < 5; k++) {
        const [x, y] = H.p(.85 + k * .25, 9.5, .85);
        oval(H, R, x, y, 5, 4, palette[k % 4], .8);
        H.line(R, [[x - 4, y + 1], [x + 4, y + 1]], 'blue', 1);
      }
      for (let k = 0; k < 6; k++) {
        const [x, y] = H.p(.75 + k * .22, 10.6, .05);
        skiPair(H, R, x, y, palette[k % 4], 5);
      }
      H.line(R, [H.p(.6, 10.53, .5), H.p(2.2, 10.53, .5)], 'blue', 2);
      for (const i of [.62, 2.16]) H.line(R, [H.p(i, 10.55), H.p(i, 10.55, .7)], 'blue', 2);
      for (let n = 0; n < 3; n++) {
        box(H, R, 1 + n * .32, 9.95, .18, .3, .78, .22, 'blue', .8);
        box(H, R, 1 + n * .32, 10.1, .18, .21, .78, .1, 'coral', .8);
      }
      sign(H, R, .65, 9.25, .75, 'SKI RENTAL', 'sun', 62);
      for (let k = 0; k < 5; k++) {
        const i = 4.6 + k * .6, j = 9.65;
        const [x, y] = H.p(i, j);
        shape(H, R, [[x - 4, y + 1], [x, y - 10], [x + 4, y + 1]], k % 2 ? 'sun' : 'coral', .85);
      }
      sign(H, R, 7.5, 9.65, 0, 'FIRST TURNS', 'sun', 64);
      snowman(H, R, 4.45, 11.1, .82);
      snowman(H, R, 5.6, 11.25, .57);
      sled(H, R, 6.25, 11.05, 'sun');
      const [sx, sy] = H.p(6.4, 10.8);
      stroke(H, R, [[sx, sy], [sx - 13, sy - 4], [sx - 17, sy + 1]], 'blue', .7);
      for (let k = 0; k < 5; k++) oval(H, R, ...H.p(4.75 + k * .16, 11.68), 3, 2.6, 'paper', 1);
      box(H, R, 7.6, 10.65, .8, .65, .05, .65, 'teal', .75);
      const [rx, ry] = H.p(8, 11.31, .48);
      H.line(R, [[rx - 5, ry], [rx + 5, ry]], 'paper', 3);
      H.line(R, [[rx, ry - 5], [rx, ry + 5]], 'paper', 3);
      sled(H, R, 8.65, 10.9);
      box(H, R, 8.81, 10.92, .68, .45, .25, .13, 'paper', 1);
      for (let k = 0; k < 3; k++) H.line(R, [H.p(8.97 + k * .15, 10.9, .4), H.p(8.97 + k * .15, 11.38, .4)], 'teal', 2);
      sign(H, R, 9.95, 10.9, 0, 'SKI PATROL', 'paper', 66);
      for (let j = 7.3; j < 9.9; j += .18) {
        H.line(R, [H.p(9.55, j, .02), H.p(10.02, j, .02)], 'teal', .7, { tone: .38 });
        H.line(R, [H.p(10.57, j, .02), H.p(11.02, j, .02)], 'teal', .7, { tone: .38 });
      }
      groomer(H, R);
      for (let n = 0; n < 5; n++) {
        const p = H.p(7.4 + n * .35, 6.8 + n * .2, .05);
        oval(H, R, p[0], p[1], 2.5, 1.1, 'blue', .16);
        oval(H, R, p[0] + 6, p[1] + 5, 2.5, 1.1, 'blue', .16);
      }
    },
    live(H, R, t) {
      for (let k = 0; k < 5; k++) {
        const u = cycle(t + k * 4, 20);
        const i = 2.5 + u * 3.1, j = 9 - u * 7.85, z = 2 + u * 3.9;
        const [x, y] = H.p(i, j, z);
        H.line(R, [[x, y], [x + 3, y + 19]], 'blue', 1.1);
        H.line(R, [[x - 12, y + 14], [x - 12, y + 24], [x + 13, y + 24], [x + 13, y + 14]], 'blue', 1.2);
        H.line(R, [[x - 12, y + 22], [x + 13, y + 22]], 'coral', 4);
        if (k !== 3) actor(H, R, i + .03, j, t + k, 'sit', { shirt: [palette[k % 4], .8] }, z - .79, .36);
        H.line(R, [[x - 10, y + 32], [x + 15, y + 28]], palette[k % 4], 1.6);
      }
      for (let k = 0; k < 3; k++) {
        const u = cycle(t + k * 4.9, 15), i = 6 + Math.sin(u * TAU + k * .45) * 1.05, j = 1.35 + u * 7.15, z = 4.85 * (1 - u) ** 2;
        skier(H, R, i, j, z, t + k, palette[k], .67);
        const [x, y] = H.p(i, j, z);
        for (let n = 0; n < 4; n++) H.dot(x - 16 - n * 4, y + n * 2, 1 + n * .25, 'paper', .7);
      }
      actor(H, R, 8.45, 5.06, t, 'sit', { shirt: ['coral', .8] }, .24, .55);
      actor(H, R, 10.25, 6.42, t + 2, 'sit', { shirt: ['blue', .8] }, .2, .53);
      actor(H, R, 8.3, 4.35, t, 'wave', { shirt: ['sun', .8] }, 0, .55);
      const [cx, cy] = H.p(10.4, 2.1, 3.1);
      steam(H, R, cx, cy, t, 3, 'paper');
      for (const [i, j] of [[9.2, 5.15], [10.55, 5.85]]) {
        const [x, y] = H.p(i, j, .9);
        H.opacity(.5, () => stroke(H, R, [[x, y], [x + Math.sin(t * 2) * 3, y - 9], [x - 3, y - 15]], 'paper', 1.5));
      }
      actor(H, R, 1.2, 8.95, t, 'idle', { shirt: ['teal', .8] }, 0, .54);
      actor(H, R, 2.25, 10.2, t + 1, 'idle', { shirt: ['coral', .8] }, 0, .54);
      actor(H, R, 3.73, 9.45, t + 2, 'idle', { shirt: ['teal', .8] }, 0, .5);
      actor(H, R, 4.2, 8.65, t, 'wave', { shirt: ['coral', .9] }, 0, .55);
      for (let k = 0; k < 3; k++) skier(H, R, 4.95 + k * .68, 8.8 + Math.sin(t * .6 + k) * .11, .06, t + k, palette[(k + 1) % 4], .42);
      actor(H, R, 5.92, 10.6, t, 'wave', { shirt: ['sun', .9] }, 0, .41);
      actor(H, R, 3.7, 11.02, t + 1, 'idle', { shirt: ['teal', .8] }, 0, .51);
      const v = cycle(t, 10), si = 6.2 + v * 1.2, sj = 7.25 + v * 1.15;
      sled(H, R, si, sj, 'coral');
      actor(H, R, si + .4, sj + .27, t, 'sit', { shirt: ['sun', .8] }, .23, .37);
      actor(H, R, 8.4, 10.5, t, 'idle', { shirt: ['coral', .85] }, 0, .6);
      actor(H, R, 9.68, 10.38, t + 2, 'wave', { shirt: ['coral', .85] }, 0, .57);
      for (const [i, j] of [[8.4, 10.5], [9.68, 10.38]]) {
        const [x, y] = H.p(i, j, .74);
        H.line(R, [[x - 3, y], [x + 3, y]], 'paper', 1.8);
        H.line(R, [[x, y - 3], [x, y + 3]], 'paper', 1.8);
      }
      actor(H, R, 11.24, 8.15, t, 'idle', { shirt: ['blue', .8] }, 0, .56);
      const [bx, by] = H.p(10.35, 8.1, 1.86);
      H.opacity(.45 + Math.sin(t * 4) * .25, () => H.dot(bx, by - 1, 3.5, 'sun', 1));
    },
  };
}
