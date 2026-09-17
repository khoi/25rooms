import { world, shape, oval, stroke, box, table, actor, windowOn, plant, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const colors = ['coral', 'teal', 'sun', 'blue'];
const rest = FIGURES.clips.idle.keys[0][1];
FIGURES.clips.tokyoAtelierPin = { dur: 14, keys: [[0, { ...rest, ar: 90, er: 55, al: 35, head: 9 }], [.3, { ...rest, ar: 95, er: 48, al: 40, head: 12 }], [.5, { ...rest, ar: 38, er: 95, head: 2 }], [.82, { ...rest, ar: 38, er: 95, head: 2 }], [1, { ...rest, ar: 90, er: 55, al: 35, head: 9 }]] };

function bird(H, R, x, y, s = 1) {
  oval(H, R, x, y, 7 * s, 5 * s, 'teal');
  oval(H, R, x + 4 * s, y - 4 * s, 4 * s, 4 * s, 'teal');
  shape(H, R, [[x + 7 * s, y - 5 * s], [x + 12 * s, y - 3 * s], [x + 7 * s, y - 2 * s]], 'sun', .8, .5);
  shape(H, R, [[x - 3 * s, y], [x + s, y - 3 * s], [x + 2 * s, y + 3 * s]], 'coral', .8, .5);
  H.dot(x + 5 * s, y - 5 * s, s, 'blue');
  H.line(R, [[x - 2 * s, y + 4 * s], [x - 2 * s, y + 7 * s], [x + 2 * s, y + 7 * s]], 'blue', .8);
}

function garment(H, R, x, y, ink, s = 1, skirt = false) {
  const outline = skirt ? [[-11, 0], [11, 0], [20, 36], [-20, 36]] : [[-8, 0], [-22, 10], [-17, 22], [-10, 16], [-10, 39], [12, 39], [11, 15], [19, 23], [25, 12], [8, 0], [4, 4], [-3, 4]];
  shape(H, R, outline.map(([a, b]) => [x + a * s, y + b * s]), ink, .66, .8);
  if (skirt) for (let q = -3; q <= 3; q++) H.line(R, [[x + q * 3 * s, y + 2 * s], [x + q * 5 * s, y + 35 * s]], 'blue', .65);
  else {
    H.line(R, [[x, y + 7 * s], [x + s, y + 37 * s]], 'paper', .9);
    shape(H, R, [[x - 8 * s, y + 15 * s], [x - 2 * s, y + 15 * s], [x - 2 * s, y + 23 * s], [x - 8 * s, y + 23 * s]], 'coral', .5, .5);
    for (let q = 0; q < 5; q++) H.line(R, [[x - 9 * s, y + (12 + q * 5) * s], [x + 10 * s, y + (12 + q * 5) * s]], ink === 'teal' ? 'sun' : 'paper', 1.2, { tone: .7 });
  }
}

function atelierStock(H, R) {
  shape(H, R, H.tile(7.17, 8.11, 4.06, 3.16, .015), 'coral', .21);
  for (let q = 0; q < 9; q++) H.line(R, [H.p(7.22 + q * .46, 8.17, .024), H.p(7.22 + q * .46, 11.2, .024)], 'paper', 1.7);
  shape(H, R, H.faceI(3.29, .04, 3.58, 1.65, 3.43), 'teal', .4);
  for (let row = 0; row < 2; row++) for (let q = 0; q < 4; q++) {
    const i = 3.44 + q * .83, z = 1.81 + row * .75;
    shape(H, R, H.faceI(i, .08, .66, z, z + .61), 'paper', 1);
    const [x, y] = H.p(i + .34, .1, z + .45);
    garment(H, R, x, y, colors[q % 3], .35, q % 2 === 0);
    H.line(R, [H.p(i + .11, .11, z + .08), H.p(i + .57, .11, z + .08)], 'coral', 1.1);
  }
  box(H, R, 3.23, .39, 3.54, 1.1, 0, 1.13, 'teal', .57);
  for (let row = 0; row < 3; row++) for (let q = 0; q < 5; q++) {
    const i = 3.34 + q * .66, z = .12 + row * .31;
    shape(H, R, H.faceI(i, 1.51, .55, z, z + .25), q % 2 ? 'paper' : 'sun', .6, .65);
    H.line(R, [H.p(i + .2, 1.53, z + .12), H.p(i + .38, 1.53, z + .12)], 'blue', 1.4);
  }
  for (let q = 0; q < 4; q++) {
    const i = 3.49 + q * .73;
    for (let n = 0; n < 3; n++) box(H, R, i, .51, .62, .76, 1.14 + n * .1, .075, colors[(q + n) % 3], .63);
    H.line(R, [H.p(i + .3, .52, 1.48), H.p(i + .3, 1.26, 1.48)], 'paper', 1.2);
  }
  table(H, R, 4.03, 2.38, 2.75, 1.38, 1.01, 'coral');
  box(H, R, 4.19, 2.57, .95, .83, 1.14, .13, 'blue', .77);
  box(H, R, 4.59, 2.62, .52, .54, 1.28, .56, 'paper', 1);
  for (let q = 0; q < 3; q++) {
    const [x, y] = H.p(4.35 + q * .27, 2.67, 1.89);
    H.line(R, [[x, y + 14], [x, y - 6]], 'blue', .9);
    shape(H, R, [[x - 4, y + 4], [x + 4, y + 4], [x + 3, y - 7], [x - 3, y - 7]], colors[q], .76, .6);
    stroke(H, R, [[x, y - 7], [x + 6, y - 12], H.p(4.59, 3.03, 1.3)], colors[q], .65);
  }
  shape(H, R, H.tile(4.18, 3.24, 1.14, .39, 1.29), 'teal', .7);
  box(H, R, 5.51, 2.59, .93, .78, 1.14, .045, 'paper', 1);
  for (let q = 0; q < 4; q++) shape(H, R, H.tile(5.6 + q % 2 * .36, 2.7 + Math.floor(q / 2) * .27, .27, .2, 1.2), colors[q], .54, .45);
  scissors(H, R, ...H.p(6.46, 3.39, 1.19), .83);
  box(H, R, 5.77, 3.94, .76, .7, 0, .58, 'sun', .5);
  box(H, R, 2.87, 2.96, .8, .83, 0, .48, 'paper', 1);
  for (let q = 0; q < 7; q++) {
    const [x, y] = H.p(3.03 + q % 3 * .22, 3.13 + Math.floor(q / 3) * .19, .51 + q % 2 * .07);
    shape(H, R, [[x - 7, y], [x - 5, y - 8], [x + 9, y - 5], [x + 5, y + 4]], colors[q % 3], .58, .6);
  }
  box(H, R, .23, 11.16, 2.28, .61, 0, .34, 'teal', .62);
  for (const z of [.35, .87, 1.39]) {
    box(H, R, .23, 11.16, 2.28, .61, z, .06, 'sun', .61);
    for (let q = 0; q < 3; q++) {
      const [x, y] = H.p(.58 + q * .69, 11.47, z + .14);
      shape(H, R, [[x - 10, y], [x + 12, y], [x + 11, y - 8], [x, y - 16], [x - 8, y - 12]], q % 2 ? 'coral' : 'blue', .75);
      H.line(R, [[x - 9, y - 3], [x + 10, y - 3]], 'paper', 1.6);
    }
  }
  for (const i of [.23, 2.51]) H.line(R, [H.p(i, 11.16, .02), H.p(i, 11.16, 1.49)], 'blue', 1.5);
  box(H, R, 7.05, 10.16, 1.25, 1.06, 0, .72, 'sun', .49);
  shape(H, R, H.tile(7.12, 10.23, 1.11, .92, .74), 'paper', 1);
  for (let q = 0; q < 5; q++) {
    const [x, y] = H.p(7.39 + q % 2 * .42, 10.49 + Math.floor(q / 2) * .19, .79 + q % 2 * .05);
    oval(H, R, x, y, 13, 7, colors[q % 3], .66);
    stroke(H, R, [[x - 8, y], [x - 3, y - 4], [x + 7, y + 2]], 'paper', 1);
  }
  table(H, R, 10.74, 4.41, .84, 2.08, .67, 'teal');
  for (let q = 0; q < 3; q++) {
    box(H, R, 10.86, 4.58 + q * .47, .59, .39, .82, .07, colors[q], .56);
    shape(H, R, H.tile(10.97, 4.68 + q * .47, .3, .2, .9), 'paper', 1, .5);
  }
  const [bx, by] = H.p(9.9, 10.65, .04);
  shape(H, R, [[bx - 15, by], [bx + 14, by], [bx + 17, by - 26], [bx - 15, by - 26]], 'teal', .55);
  stroke(H, R, [[bx - 8, by - 26], [bx - 8, by - 36], [bx + 8, by - 36], [bx + 8, by - 26]], 'blue', 1.5);
  bird(H, R, bx, by - 12, .87);
}

function scissors(H, R, x, y, s = 1) {
  oval(H, R, x - 4 * s, y, 3 * s, 3 * s, 'paper');
  oval(H, R, x + 4 * s, y + 2 * s, 3 * s, 3 * s, 'paper');
  H.line(R, [[x - 4 * s, y], [x + 7 * s, y - 16 * s]], 'blue', 1.5);
  H.line(R, [[x + 4 * s, y + 2 * s], [x - 6 * s, y - 15 * s]], 'blue', 1.5);
}

function sewingMachine(H, R) {
  box(H, R, 1.03, 4.36, 1.45, .86, 1.25, .11, 'blue');
  const [x, y] = H.p(1.75, 4.7, 1.45);
  shape(H, R, [[x - 27, y], [x + 28, y], [x + 28, y - 31], [x + 16, y - 36], [x - 24, y - 36], [x - 27, y - 26], [x + 10, y - 25], [x + 10, y - 7], [x - 27, y - 7]], 'paper', 1);
  oval(H, R, x + 28, y - 24, 6, 8, 'teal');
  H.line(R, [[x - 20, y - 25], [x - 20, y - 3]], 'blue', 1.2);
  H.line(R, [[x - 4, y - 38], [x - 4, y - 48]], 'blue', 1);
  shape(H, R, [[x - 8, y - 48], [x + 1, y - 48], [x + 1, y - 39], [x - 8, y - 39]], 'coral', .7, .6);
  stroke(H, R, [[x - 5, y - 45], [x - 21, y - 36], [x - 20, y - 4]], 'coral', .65);
}

function furnishings(H, R) {
  atelierStock(H, R);
  windowOn(H, R, 'nw', 4.6, 1.35, 4.8, 2.1, { sky: 'sun', skyTone: .13, frameInk: 'teal', inside() {
    for (let q = 0; q < 4; q++) box(H, R, -.12, 2.5 + q * .94, .03, .72, 1.4, .65 + q % 2 * .45, 'teal', .22);
  } });
  box(H, R, .05, .05, 11.7, .16, 3.55, .16, 'blue', .55);
  box(H, R, .06, .1, .16, 11.6, 3.55, .16, 'sun', .6);
  for (const i of [7.15, 10.8]) box(H, R, i, 1.1, .12, .12, 0, 3.12, 'blue');
  H.line(R, [H.p(7.15, 1.1, 3.08), H.p(10.92, 1.1, 3.08)], 'blue', 2);
  for (let q = 0; q < 9; q++) {
    const i = 7.3 + q * .22;
    shape(H, R, H.faceI(i, 1.12 + q % 2 * .03, .24, .08, 2.92), 'coral', .36 + q % 2 * .18, .5);
  }
  box(H, R, 10.45, 1.5, .12, 2.45, .08, 2.76, 'sun', .7);
  shape(H, R, H.faceJ(10.61, 1.66, 2.14, .23, 2.68), 'teal', .16);
  const [mx, my] = H.p(10.64, 2.7, 1.86);
  garment(H, R, mx, my, 'coral', .65, true);
  H.line(R, [H.p(10.63, 1.8, .4), H.p(10.63, 3.5, 2.55)], 'paper', 3);
  table(H, R, .45, 3.15, 2.32, 3.08, 1.15, 'teal');
  for (let q = 0; q < 7; q++) {
    const [x, y] = H.p(.87 + q % 3 * .52, 3.4 + Math.floor(q / 3) * .3, 1.28);
    shape(H, R, [[x - 4, y], [x + 4, y], [x + 3, y - 13], [x - 3, y - 13]], colors[q % 4], .72, .6);
    oval(H, R, x, y - 13, 3, 1.8, 'paper');
  }
  sewingMachine(H, R);
  box(H, R, 1.5, 6.55, .86, .83, 0, .62, 'coral', .6);
  box(H, R, 1.65, 5.9, .65, .5, .03, .11, 'blue');
  stroke(H, R, [H.p(1.98, 6.07, .14), H.p(2.3, 5.8, .05), H.p(2.51, 5.06, 1.22)], 'blue', .9);
  for (let q = 0; q < 6; q++) {
    const i = .47 + q % 3 * .47, j = .52 + Math.floor(q / 3) * .54;
    box(H, R, i, j, .36, .38, 0, 1.25 + q % 3 * .24, colors[q % 4], .45);
    oval(H, R, ...H.p(i + .18, j + .19, 1.25 + q % 3 * .24), 7, 3.4, 'paper');
    oval(H, R, ...H.p(i + .18, j + .19, 1.25 + q % 3 * .24), 2, 1.3, 'blue');
  }
  table(H, R, 4.0, 4.55, 4.28, 2.85, 1.17, 'sun');
  shape(H, R, H.tile(4.24, 4.77, 3.62, 2.38, 1.31), 'teal', .3);
  const pattern = [H.p(4.45, 4.96, 1.34), H.p(5.67, 4.99, 1.34), H.p(6.2, 5.58, 1.34), H.p(5.85, 5.92, 1.34), H.p(5.55, 5.58, 1.34), H.p(5.65, 6.81, 1.34), H.p(4.4, 6.79, 1.34), H.p(4.5, 5.56, 1.34), H.p(4.12, 5.79, 1.34), H.p(3.93, 5.42, 1.34)];
  shape(H, R, pattern, 'paper', 1);
  H.line(R, [H.p(4.88, 5.1, 1.36), H.p(4.94, 6.6, 1.36)], 'coral', .8, { dash: [3, 4] });
  for (let q = 0; q < 4; q++) H.dot(...H.p(4.47 + q % 2 * .96, 5.22 + Math.floor(q / 2) * 1.16, 1.36), 2.2, 'blue');
  scissors(H, R, ...H.p(7.38, 6.62, 1.35), 1.1);
  shape(H, R, H.tile(6.87, 4.86, .95, .22, 1.36), 'paper', 1);
  for (let q = 0; q < 10; q++) H.line(R, [H.p(6.89 + q * .09, 4.87, 1.38), H.p(6.89 + q * .09, 4.98 + q % 2 * .05, 1.38)], 'blue', .6);
  oval(H, R, ...H.p(7.37, 5.82, 1.41), 12, 7, 'coral');
  for (let q = 0; q < 7; q++) {
    const [x, y] = H.p(7.28 + q % 3 * .12, 5.67 + Math.floor(q / 3) * .13, 1.46);
    H.line(R, [[x, y], [x - 2, y - 8]], 'blue', .55); H.dot(x - 2, y - 8, 1.3, colors[q % 3]);
  }
  shape(H, R, H.tile(6.22, 6.62, .16, .28, 1.36), 'paper', 1);
  for (let q = 0; q < 3; q++) box(H, R, 5.8, 5.04, 1.32, .85, .17 + q * .14, .12, colors[q], .5);
  for (const j of [7.87, 10.66]) {
    H.line(R, [H.p(.75, j, .1), H.p(.75, j, 2.51)], 'blue', 2);
    H.line(R, [H.p(.3, j, .1), H.p(1.25, j, .1)], 'blue', 2);
  }
  H.line(R, [H.p(.75, 7.87, 2.51), H.p(.75, 10.66, 2.51)], 'blue', 2.3);
  for (let q = 0; q < 4; q++) {
    const [x, y] = H.p(.75, 8.1 + q * .69, 2.42);
    stroke(H, R, [[x, y - 3], [x + 4, y - 7], [x + 6, y - 2], [x, y + 3]], 'blue', .75);
    H.line(R, [[x, y + 3], [x - 14, y + 12], [x + 15, y + 12], [x, y + 3]], 'blue', .7);
    garment(H, R, x, y + 10, colors[q % 3], 1.15, q === 1);
    if (q === 0) bird(H, R, x + 6, y + 27, .46);
  }
  const [dx, dy] = H.p(8.85, 5.11, .04);
  oval(H, R, dx, dy, 21, 8, 'blue', .65);
  H.line(R, [[dx, dy], [dx, dy - 68]], 'blue', 2);
  garment(H, R, dx, dy - 88, 'coral', 1.18, true);
  garment(H, R, dx, dy - 108, 'teal', .83);
  shape(H, R, [[dx + 8, dy - 105], [dx + 27, dy - 96], [dx + 33, dy - 81], [dx + 23, dy - 78], [dx + 11, dy - 93]], 'paper', 1, .7);
  for (let q = 0; q < 4; q++) H.line(R, [[dx + 17 + q * 3, dy - 96 + q * 4], [dx + 23 + q * 3, dy - 99 + q * 4]], 'blue', .7);
  bird(H, R, dx - 4, dy - 88, .65);
  oval(H, R, dx, dy - 111, 5, 2, 'sun');
  table(H, R, 8.76, 8.82, 1.94, 1.15, .66, 'teal');
  table(H, R, 2.35, 7.63, 1.55, 1.18, .9, 'paper');
  for (let q = 0; q < 2; q++) {
    const [x, y] = H.p(9.11 + q * .64, 9.26, .82);
    shape(H, R, [[x - 11, y], [x + 13, y], [x + 12, y - 7], [x + 2, y - 14], [x - 9, y - 12]], 'blue', .82);
    H.line(R, [[x - 10, y - 3], [x + 12, y - 3]], 'coral', 2);
  }
  for (let q = 0; q < 4; q++) oval(H, R, ...H.p(10.05 + q % 2 * .26, 8.97 + Math.floor(q / 2) * .27, .83), 4, 2, colors[q % 3]);
  shape(H, R, H.tile(4.0, 9.5, 2.5, 1.65, .025), 'blue', .8);
  for (let q = 0; q < 5; q++) shape(H, R, H.tile(4.03, 9.56 + q * .3, 2.41, .24, .04), 'paper', .25 + q * .12, .7);
  for (const i of [3.94, 6.6]) {
    H.line(R, [H.p(i, 9.4, .1), H.p(i, 9.4, 1.18), H.p(i, 11.32, 1.18), H.p(i, 11.32, .1)], 'blue', 2);
  }
  const [cx, cy] = H.p(10.54, 7.45, 1.29);
  for (const d of [-15, 0, 15]) H.line(R, [[cx, cy], [cx + d, cy + 42]], 'blue', 1.4);
  shape(H, R, [[cx - 13, cy - 15], [cx + 13, cy - 15], [cx + 13, cy], [cx - 13, cy]], 'blue', .8);
  oval(H, R, cx + 1, cy - 7, 6, 6, 'teal');
  plant(H, R, ...H.p(2.65, 1.37), .78);
}

export default world('tokyo-harajuku-atelier', 'Harajuku · Made upstairs', { floor: 'paper', tone: .55, wall: 'sun', wallTone: .18, pattern: 'boards', height: 3.75, head: 20 }, furnishings, (H, R, t) => {
  const u = cycle(t, 14), sew = u < .4 ? Math.sin(t * 13) : 0;
  actor(H, R, 2.05, 6.58, u < .4 ? t : 0, 'type', { shirt: ['coral', .65], hairStyle: 'bun', face: 'nw' }, .15, 1.15);
  const [sx, sy] = H.p(1.3, 4.94, 1.4);
  shape(H, R, [[sx - 15, sy], [sx + 10, sy + 9], [sx + 29, sy + 1], [sx + 5, sy - 9]], 'coral', .58, .6);
  H.line(R, [[sx - 4, sy - 12], [sx - 4, sy + sew * 2]], 'blue', 1.2);
  actor(H, R, 8.31, 6.12, t, 'tokyoAtelierPin', { shirt: ['sun', .65], hairStyle: 'pony', face: 'ne' }, 0, 1.18);
  const [dx, dy] = H.p(8.85, 5.11, 1.69);
  stroke(H, R, [[dx + 8, dy - 5], [dx + 16 + Math.sin(t * .8) * 2, dy + 13], [dx + 14 + Math.sin(t * .8) * 3, dy + 30]], 'sun', 3);
  actor(H, R, 9.5, 3.17, 0, 'idle', { shirt: ['coral', .72], dress: true, hairStyle: 'long', face: u > .45 && u < .8 ? 'nw' : 'sw' }, 0, 1.22);
  const [ix, iy] = H.p(3.1, 8.2, 1.03);
  shape(H, R, [[ix - 17, iy], [ix + 18, iy], [ix + 8, iy - 10], [ix - 6, iy - 14]], 'paper', 1);
  stroke(H, R, [[ix - 7, iy - 10], [ix - 6, iy - 21], [ix + 7, iy - 21], [ix + 10, iy - 8]], 'teal', 3);
  stroke(H, R, [[ix + 14, iy], [ix + 23, iy + 12], [ix + 19, iy + 23], [ix + 2, iy + 26]], 'blue', .9);
  actor(H, R, 6.18, 4.11, t * .5, 'type', { shirt: ['blue', .64], hairStyle: 'curly', face: 'nw' }, .09, 1.23);
  actor(H, R, 10.33, 8.17, t * .35, 'hold', { shirt: ['teal', .68], hairStyle: 'bun', face: 'sw', prop(HH, RR, points) {
    const [x, y] = points.nearHand;
    garment(HH, RR, x - 5, y - 8 + Math.sin(t * .8) * 2, 'sun', .62, true);
  } }, 0, 1.26);
  actor(H, R, 8.36, 10.09, t * .27, 'think', { shirt: ['coral', .62], hairStyle: 'long', face: 'ne' }, 0, 1.22);
});
