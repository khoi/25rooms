import { world, shape, oval, stroke, box, table, actor, windowOn, plant, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const colors = ['coral', 'teal', 'sun', 'blue'];
const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -8, al: 53, ar: 66, el: 49, er: 38, head: 13 };
FIGURES.clips.tokyoAnimationFlip = { dur: 12, keys: [[0, seated], [.13, { ...seated, al: 75, el: 39, ar: 70 }], [.26, seated], [.38, { ...seated, al: 74, el: 40, head: 16 }], [.47, seated], [.64, { ...seated, al: 71, el: 42 }], [.8, seated], [.92, { ...seated, head: -9, ar: 34, er: 90 }], [1, seated]] };
FIGURES.clips.tokyoAnimationCorrect = { dur: 12, keys: [[0, seated], [.28, { ...seated, ar: 76, er: 21 }], [.4, { ...seated, ar: 72, er: 32 }], [.48, { ...seated, ar: 73, er: 28 }], [.58, { ...seated, ar: 76, er: 23 }], [.74, { ...seated, ar: 32, er: 103, head: -13 }], [.91, { ...seated, ar: 32, er: 103, head: -13 }], [1, seated]] };

function bird(H, R, x, y, s = 1, flap = 0) {
  oval(H, R, x, y, 7 * s, 5 * s, 'teal');
  oval(H, R, x + 4 * s, y - 4 * s, 4 * s, 4 * s, 'teal');
  shape(H, R, [[x + 7 * s, y - 5 * s], [x + 12 * s, y - 3 * s], [x + 7 * s, y - 2 * s]], 'sun', .8, .5);
  shape(H, R, [[x - 3 * s, y], [x + s, y - (3 + flap * 8) * s], [x + 2 * s, y + 3 * s]], 'coral', .8, .5);
  H.dot(x + 5 * s, y - 5 * s, s, 'blue');
  H.line(R, [[x - 2 * s, y + 4 * s], [x - 2 * s, y + 7 * s], [x + 2 * s, y + 7 * s]], 'blue', .8);
}

function mug(H, R, i, j, z, ink = 'coral') {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 5, y], [x + 5, y], [x + 5, y - 11], [x - 5, y - 11]], ink, .62, .7);
  oval(H, R, x, y - 11, 5, 2, 'paper');
  stroke(H, R, [[x + 5, y - 9], [x + 10, y - 8], [x + 9, y - 2], [x + 5, y - 2]], 'blue', .9);
}

function pencils(H, R, i, j, z) {
  const [x, y] = H.p(i, j, z);
  for (let q = 0; q < 6; q++) {
    H.line(R, [[x - 5 + q * 2, y - 5], [x - 8 + q * 3, y - 27 + q % 2 * 4]], colors[q % 3], 1.4);
    H.line(R, [[x - 8 + q * 3, y - 27 + q % 2 * 4], [x - 8 + q * 3, y - 30 + q % 2 * 4]], 'blue', .6);
  }
  shape(H, R, [[x - 7, y], [x + 7, y], [x + 8, y - 15], [x - 8, y - 15]], 'paper', 1);
  H.line(R, [[x - 6, y - 6], [x + 6, y - 6]], 'teal', 1.2);
}

function lamp(H, R, i, j, z, flip = 1) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y, 11, 5, 'teal');
  H.line(R, [[x, y - 2], [x - 11 * flip, y - 24], [x + 12 * flip, y - 43]], 'blue', 2.3);
  for (const [a, b] of [[0, 2], [-11 * flip, 24], [12 * flip, 43]]) H.dot(x + a, y - b, 2.3, 'sun');
  shape(H, R, [[x + 4 * flip, y - 47], [x + 21 * flip, y - 42], [x + 24 * flip, y - 32], [x - 1 * flip, y - 36]], 'sun', .75);
}

function chair(H, R, i, j, ink) {
  box(H, R, i, j, .94, .83, .51, .13, ink, .6);
  box(H, R, i, j + .72, .94, .12, .64, .75, ink, .52);
  H.line(R, [H.p(i + .46, j + .41, .04), H.p(i + .46, j + .41, .51)], 'blue', 2.2);
  for (const [a, b] of [[-.14, .16], [.99, .1], [.0, .93], [.96, .9]]) {
    H.line(R, [H.p(i + .46, j + .41, .09), H.p(i + a, j + b, .05)], 'blue', 1.5);
    oval(H, R, ...H.p(i + a, j + b, .035), 3, 2, 'blue');
  }
}

function storyboard(H, R) {
  shape(H, R, H.faceI(.43, .06, 6.83, 1.14, 3.46), 'sun', .29);
  for (let row = 0; row < 3; row++) for (let col = 0; col < 6; col++) {
    const i = .68 + col * 1.06, z = 1.29 + row * .67;
    shape(H, R, H.faceI(i, .1, .9, z, z + .53), 'paper', 1, .65);
    const [x, y] = H.p(i + .43, .12, z + .22);
    bird(H, R, x, y, .47, (row + col) % 3 / 2);
    H.line(R, [H.p(i + .09, .12, z + .08), H.p(i + .81, .12, z + .08)], 'teal', .6);
    H.dot(...H.p(i + .43, .13, z + .48), 1.6, col % 2 ? 'coral' : 'teal');
    if (col === 4 && row === 2) {
      oval(H, R, x - 6, y - 10, 4, 2, 'blue', .2);
      oval(H, R, x - 2, y - 12, 3, 2, 'blue', .2);
    }
  }
}

function productionMaterials(H, R) {
  shape(H, R, H.tile(3.72, 3.74, 3.39, 4.53, .017), 'sun', .22);
  for (let q = 0; q < 6; q++) H.line(R, [H.p(3.78, 3.84 + q * .74, .025), H.p(7.05, 3.84 + q * .74, .025)], 'coral', .75, { tone: .32 });
  box(H, R, .24, .27, 3.33, .76, 0, .85, 'paper', 1);
  for (let row = 0; row < 4; row++) {
    shape(H, R, H.faceI(.34, 1.05, 3.13, .1 + row * .17, .24 + row * .17), row % 2 ? 'teal' : 'paper', .54, .6);
    for (let q = 0; q < 3; q++) H.line(R, [H.p(.65 + q * 1.04, 1.07, .18 + row * .17), H.p(.96 + q * 1.04, 1.07, .18 + row * .17)], 'blue', 1.5);
  }
  for (let q = 0; q < 4; q++) {
    box(H, R, .37 + q * .77, .35, .67, .55, .87, .2 + q % 2 * .11, colors[q % 3], .58);
    H.line(R, [H.p(.7 + q * .77, .37, 1.1 + q % 2 * .11), H.p(.7 + q * .77, .88, 1.1 + q % 2 * .11)], 'paper', 1.2);
  }
  box(H, R, .06, 7.22, .28, 4.44, 1.67, 1.72, 'teal', .65);
  for (const z of [1.66, 2.21, 2.78, 3.36]) {
    box(H, R, .05, 7.22, .91, 4.44, z, .065, 'sun', .55);
    if (z < 3.3) for (let q = 0; q < 5; q++) {
      const j = 7.35 + q * .83;
      for (let n = 0; n < 3; n++) box(H, R, .19, j, .69, .66, z + .075 + n * .11, .075, n === 1 ? colors[q % 3] : 'paper', n === 1 ? .57 : 1);
      H.line(R, [H.p(.9, j + .13, z + .28), H.p(.9, j + .47, z + .28)], 'blue', .65);
    }
  }
  for (let q = 0; q < 6; q++) box(H, R, .08, 7.25 + q * .87, .82, .08, 1.67, 1.73, 'teal', .57);
  table(H, R, 4.02, 4.47, 2.51, 2.39, .94, 'coral');
  shape(H, R, H.tile(4.18, 4.66, 2.13, 1.99, 1.09), 'teal', .24);
  for (let row = 0; row < 2; row++) for (let q = 0; q < 2; q++) {
    const i = 4.28 + q * 1.0, j = 4.81 + row * .83;
    for (let n = 0; n < 3; n++) box(H, R, i + n * .025, j, .83, .65, 1.11 + n * .024, .018, 'paper', 1);
    const [x, y] = H.p(i + .45, j + .35, 1.22);
    bird(H, R, x, y, .7, row ? .75 : -.3);
    for (let n = 0; n < 3; n++) oval(H, R, ...H.p(i + .13 + n * .26, j + .04, 1.21), 1.5, .8, 'blue', .65);
  }
  pencils(H, R, 6.15, 4.55, 1.09);
  box(H, R, 6.17, 6.15, .22, .33, 1.1, .12, 'sun', .65);
  for (let q = 0; q < 4; q++) box(H, R, 4.28 + q * .41, 4.63, .29, .17, 1.18, .05, colors[q], .63);
  H.line(R, [H.p(4.23, 6.47, 1.12), H.p(5.58, 6.47, 1.12)], 'blue', 1.8);
  for (let q = 0; q < 12; q++) H.line(R, [H.p(4.25 + q * .11, 6.43, 1.13), H.p(4.25 + q * .11, 6.54, 1.13)], 'paper', .6);
  box(H, R, 4.62, 5.15, 1.31, .83, .12, .62, 'teal', .58);
  for (let q = 0; q < 3; q++) H.line(R, [H.p(4.73, 6.01, .23 + q * .18), H.p(5.81, 6.01, .23 + q * .18)], 'paper', 1.3);
  chair(H, R, 4.67, 7.08, 'coral');
  box(H, R, 10.81, 3.67, .17, 2.19, .3, 2.46, 'blue', .69);
  shape(H, R, H.faceJ(11.01, 3.87, 1.8, .62, 2.56), 'paper', 1);
  for (let row = 0; row < 2; row++) {
    const j = 4.04 + row * .79;
    shape(H, R, H.faceJ(11.03, j, .66, .87, 2.24), row ? 'teal' : 'sun', .2);
    const [x, y] = H.p(11.06, j + .35, 1.34);
    shape(H, R, [[x - 14, y + 12], [x - 4, y - 20], [x + 16, y + 5]], 'teal', .66);
    bird(H, R, x + 3, y - 17, .69, .5);
  }
  H.line(R, [H.p(10.83, 3.8, .08), H.p(10.83, 3.8, 2.78)], 'sun', 2);
  H.line(R, [H.p(10.83, 5.78, .08), H.p(10.83, 5.78, 2.78)], 'sun', 2);
  box(H, R, 10.47, 8.8, 1.05, 1.22, .12, 1.07, 'teal', .57);
  for (const z of [.21, .57, .95, 1.2]) box(H, R, 10.47, 8.8, 1.05, 1.22, z, .055, 'paper', 1);
  for (let row = 0; row < 3; row++) for (let q = 0; q < 3; q++) box(H, R, 10.54, 8.89 + q * .33, .91, .27, .27 + row * .37, .17, colors[(row + q) % 3], .51);
  for (const [i, j] of [[10.62, 8.95], [11.36, 8.95], [10.62, 9.86], [11.36, 9.86]]) oval(H, R, ...H.p(i, j, .06), 3, 4, 'blue');
  for (let q = 0; q < 3; q++) {
    const i = 2.33 + q * .39;
    box(H, R, i, 10.44, .3, .45, 0, 1.13 + q % 2 * .22, q % 2 ? 'coral' : 'paper', .73);
    oval(H, R, ...H.p(i + .15, 10.67, 1.15 + q % 2 * .22), 6, 3, 'teal', .59);
    oval(H, R, ...H.p(i + .15, 10.67, 1.15 + q % 2 * .22), 2.2, 1.4, 'paper');
  }
  table(H, R, 7.4, 10.33, 1.85, 1.06, .71, 'teal');
  for (let q = 0; q < 2; q++) {
    const [x, y] = H.p(7.9 + q * .77, 10.88, .87);
    oval(H, R, x, y, 15, 7, 'paper', 1);
    for (let n = 0; n < 5; n++) H.dot(x + Math.cos(n * TAU / 5) * 9, y + Math.sin(n * TAU / 5) * 4, 2, 'blue', .6);
    H.dot(x, y, 2.5, 'coral', .7);
  }
  shape(H, R, H.tile(7.62, 10.39, .53, .48, .86), 'paper', 1);
  const [fx, fy] = H.p(8.91, 10.6, .87);
  stroke(H, R, [[fx, fy], [fx + 15, fy - 4], [fx + 21, fy + 5], [fx + 10, fy + 11], [fx - 7, fy + 6]], 'blue', 2.5);
  for (let q = 0; q < 5; q++) H.line(R, [[fx + q * 3, fy + 7], [fx + q * 3, fy + 11]], 'paper', .7);
  const [wx, wy] = H.p(6.58, 8.53, .04);
  shape(H, R, [[wx - 10, wy], [wx + 10, wy], [wx + 13, wy - 20], [wx - 13, wy - 20]], 'teal', .37);
  for (let q = 0; q < 4; q++) oval(H, R, wx - 6 + q * 4, wy - 18 - q % 2 * 3, 5, 3, 'paper');
}

function furnishings(H, R) {
  productionMaterials(H, R);
  windowOn(H, R, 'nw', 3.34, 1.12, 5.54, 2.1, { sky: 'sun', skyTone: .11, frameInk: 'teal', inside() {
    for (let q = 0; q < 5; q++) {
      const j = .89 + q * 1.07;
      box(H, R, -.16, j, .08, .82, 1.12, .59 + q % 3 * .18, 'blue', .2);
      const [x, y] = H.p(-.04, j + .4, 1.86 + q % 3 * .18);
      shape(H, R, [[x - 16, y], [x, y - 12], [x + 16, y]], 'teal', .35, .6);
      for (let n = 0; n < 2; n++) shape(H, R, H.faceJ(-.02, j + .12 + n * .36, .19, 1.3, 1.52), 'paper', 1, .4);
    }
    H.line(R, [H.p(-.04, .4, 2.35), H.p(-.04, 6.22, 2.74)], 'blue', .6);
  } });
  storyboard(H, R);
  shape(H, R, H.faceI(7.63, .06, 3.91, 3.08, 3.57), 'paper', 1);
  for (let q = 0; q < 14; q++) box(H, R, 7.75 + q * .26, .08, .19, .04, 3.2, q % 3 === 0 ? .23 : .12, colors[q % 3], .5);
  table(H, R, 7.52, .7, 3.8, 1.79, 1.01, 'teal');
  box(H, R, 8.74, 1.52, .93, .46, 1.15, .09, 'blue', .8);
  box(H, R, 9.12, 1.67, .19, .16, 1.22, .54, 'blue', .8);
  box(H, R, 7.71, 1.32, 3.37, .16, 1.63, 1.56, 'blue', .86);
  shape(H, R, H.faceI(7.87, 1.51, 3.05, 1.8, 3.02), 'paper', 1);
  H.line(R, [H.p(8.04, 1.53, 1.96), H.p(10.74, 1.53, 1.96)], 'teal', 1);
  box(H, R, 8.41, 2.03, 1.56, .43, 1.15, .04, 'paper', 1);
  for (let q = 0; q < 7; q++) for (let n = 0; n < 2; n++) shape(H, R, H.tile(8.48 + q * .2, 2.08 + n * .16, .14, .09, 1.21), 'blue', .3, .3);
  oval(H, R, ...H.p(10.39, 2.23, 1.19), 6, 4, 'paper');
  stroke(H, R, [H.p(10.39, 2.23, 1.18), H.p(10.58, 2.6, 1.18), H.p(11.02, 2.12, 1.17)], 'blue', .6);
  chair(H, R, 9.2, 3.16, 'coral');
  mug(H, R, 7.88, 2.06, 1.17, 'sun');
  table(H, R, .69, 5.83, 3.22, 1.95, 1.07, 'teal');
  const desk = [H.p(1.03, 6.01, 1.63), H.p(3.51, 6.01, 1.63), H.p(3.51, 7.42, 1.24), H.p(1.03, 7.42, 1.24)];
  shape(H, R, desk, 'paper', 1);
  H.outline(R, desk, 'blue', 2);
  for (let q = 0; q < 3; q++) oval(H, R, ...H.p(1.61 + q * .57, 6.14, 1.65), 2, 1.2, 'blue');
  H.line(R, [H.p(1.5, 6.14, 1.66), H.p(2.89, 6.14, 1.66)], 'teal', 1.8);
  pencils(H, R, .98, 7.07, 1.23);
  lamp(H, R, .96, 6.18, 1.2, 1);
  box(H, R, 3.2, 7.56, .35, .2, 1.2, .06, 'coral', .5);
  shape(H, R, H.tile(3.21, 7.57, .19, .18, 1.27), 'paper', 1, .4);
  chair(H, R, 2.22, 8.03, 'teal');
  box(H, R, 2.35, 8.05, .66, .54, .66, .05, 'sun', .5);
  table(H, R, 7.11, 6.41, 3.41, 1.68, 1.02, 'teal');
  const tablet = [H.p(7.48, 6.74, 1.56), H.p(9.83, 6.74, 1.56), H.p(9.83, 7.77, 1.19), H.p(7.48, 7.77, 1.19)];
  shape(H, R, tablet, 'blue', .83);
  shape(H, R, [H.p(7.63, 6.88, 1.53), H.p(9.56, 6.88, 1.53), H.p(9.56, 7.62, 1.27), H.p(7.63, 7.62, 1.27)], 'paper', 1);
  bird(H, R, ...H.p(8.51, 7.23, 1.43), 1.35, .2);
  for (let q = 0; q < 5; q++) H.dot(...H.p(9.7, 6.99 + q * .14, 1.48 - q * .04), 1.8, colors[q % 4]);
  pencils(H, R, 10.09, 6.79, 1.18);
  lamp(H, R, 10.14, 7.73, 1.17, -1);
  const [hx, hy] = H.p(7.35, 7.57, 1.17);
  stroke(H, R, [[hx - 8, hy], [hx - 10, hy - 12], [hx, hy - 18], [hx + 10, hy - 12], [hx + 8, hy]], 'blue', 2.6);
  oval(H, R, hx - 8, hy, 4, 7, 'coral'); oval(H, R, hx + 8, hy, 4, 7, 'coral');
  chair(H, R, 8.12, 8.43, 'sun');
  const [jx, jy] = H.p(8.89, 9.21, 1.44);
  shape(H, R, [[jx - 9, jy], [jx + 11, jy], [jx + 18, jy + 14], [jx + 10, jy + 19], [jx + 12, jy + 34], [jx - 12, jy + 34], [jx - 11, jy + 13], [jx - 18, jy + 19]], 'coral', .52);
  for (let q = 0; q < 4; q++) {
    shape(H, R, H.tile(10.05 + q % 2 * .31, 7.71 + Math.floor(q / 2) * .13, 0.24, .1, 1.17), colors[q], .67, .3);
  }
  box(H, R, .25, 9.2, 1.57, 1.99, 0, .95, 'paper', .9);
  for (let q = 0; q < 3; q++) {
    H.line(R, [H.p(.3, 11.2, .18 + q * .26), H.p(1.76, 11.2, .18 + q * .26)], 'blue', .6);
    H.line(R, [H.p(.91, 11.22, .3 + q * .26), H.p(1.23, 11.22, .3 + q * .26)], 'blue', 1.4);
  }
  box(H, R, .42, 9.48, 1.16, 1.19, .97, .2, 'teal', .5);
  shape(H, R, H.tile(.51, 9.61, .98, .91, 1.19), 'blue', .48);
  shape(H, R, H.tile(.66, 9.69, .7, .73, 1.21), 'paper', 1);
  bird(H, R, ...H.p(1.03, 10.09, 1.23), .83, .6);
  for (let q = 0; q < 6; q++) box(H, R, .48 + q % 2 * .54, 10.8, .45, .29, .97 + Math.floor(q / 2) * .07, .05, colors[q % 3], .5);
  table(H, R, 4.1, 10.3, 2.9, 1.07, .7, 'paper');
  const [kx, ky] = H.p(4.59, 10.68, .85);
  oval(H, R, kx, ky - 10, 10, 13, 'teal', .55);
  oval(H, R, kx, ky - 22, 7, 3, 'paper');
  stroke(H, R, [[kx + 8, ky - 19], [kx + 18, ky - 18], [kx + 18, ky - 7], [kx + 9, ky - 4]], 'blue', 2);
  shape(H, R, [[kx - 8, ky - 15], [kx - 18, ky - 21], [kx - 12, ky - 4]], 'teal', .6);
  mug(H, R, 5.29, 10.87, .84, 'coral'); mug(H, R, 5.95, 10.87, .84, 'paper');
  box(H, R, 6.44, 10.53, .35, .37, .84, .27, 'sun', .62);
  bird(H, R, ...H.p(6.62, 10.71, 1.31), 1.13);
  plant(H, R, ...H.p(.74, 4.74, .06), .86);
  plant(H, R, ...H.p(10.85, 10.75, .06), .83);
  box(H, R, 4.2, .35, 2.15, .53, .09, .64, 'teal', .4);
  for (let q = 0; q < 8; q++) box(H, R, 4.33 + q * .23, .47, .17, .37, .73, .29 + q % 3 * .05, colors[q % 3], .5);
  const [fx, fy] = H.p(3.63, 4.55, 1.37);
  table(H, R, 3.2, 4.1, .87, .82, .49, 'sun');
  oval(H, R, fx, fy + 25, 12, 5, 'blue', .6);
  H.line(R, [[fx, fy + 24], [fx, fy]], 'blue', 3);
  oval(H, R, fx, fy - 12, 17, 19, 'paper', 1);
  H.outline(R, Array.from({ length: 32 }, (_, q) => [fx + Math.cos(q * TAU / 32) * 13, fy - 12 + Math.sin(q * TAU / 32) * 15]), 'blue', .65);
}

export default world('tokyo-nerima-animation', 'Nerima · A few frames of flight', { floor: 'paper', tone: .5, wall: 'teal', wallTone: .15, pattern: 'boards', height: 3.67, head: 20 }, furnishings, (H, R, t) => {
  const u = cycle(t, 12), revision = u >= .45, progress = revision ? Math.min(1, (u - .45) / .31) : Math.min(1, u / .27);
  const lift = revision ? progress * progress * .47 : Math.max(0, Math.sin(progress * Math.PI * 3)) * .21;
  const screen = H.faceI(7.88, 1.54, 3.01, 1.81, 3.01);
  H.clip(screen, () => {
    shape(H, R, screen, 'paper', 1, .4);
    H.line(R, [H.p(8.02, 1.56, 1.98), H.p(10.74, 1.56, 1.98)], 'teal', .9);
    const [cx, cy] = H.p(10.41, 1.57, 2.73);
    oval(H, R, cx, cy, 10, 4, 'teal', .15);
    oval(H, R, cx - 7, cy - 2, 5, 4, 'teal', .15);
    oval(H, R, cx + 4, cy - 4, 6, 5, 'teal', .15);
    const opacity = u > .9 ? Math.max(0, (1 - u) / .1) : u > .32 && u < .45 ? Math.max(0, (.45 - u) / .1) : 1;
    H.opacity(opacity, () => bird(H, R, ...H.p(8.62 + progress * .78, 1.58, 2.18 + lift), 1.31, Math.sin(progress * TAU * 3)));
    for (let q = 0; q < 10; q++) shape(H, R, H.faceI(8.02 + q * .26, 1.59, .19, 1.83, 1.87), q / 10 < progress ? 'teal' : 'blue', q / 10 < progress ? .5 : .12, .1);
  });
  actor(H, R, 9.67, 3.48, t * .2, 'read', { shirt: ['coral', .63], glasses: true, face: 'nw' }, .11, 1.17);
  actor(H, R, 2.66, 8.36, t, 'tokyoAnimationFlip', { shirt: ['sun', .6], hairStyle: 'bun', face: 'nw' }, .12, 1.17);
  for (let q = 0; q < 3; q++) {
    const curl = q * .038 + Math.max(0, Math.sin(t * 2.1 + q * .6)) * .13;
    const sheet = [H.p(1.44, 6.28, 1.62 + q * .018), H.p(3.05, 6.28, 1.62 + q * .018), H.p(3.05, 7.23, 1.3 + curl), H.p(1.44, 7.23, 1.3 + curl)];
    shape(H, R, sheet, 'paper', 1, .65);
    if (q === 2) bird(H, R, ...H.p(2.19, 6.79, 1.53 + curl), .93, Math.sin(progress * TAU * 3));
    for (let n = 0; n < 3; n++) oval(H, R, ...H.p(1.69 + n * .57, 6.34, 1.66 + q * .018), 1.8, 1, 'blue', .5);
  }
  actor(H, R, 8.58, 8.75, t, 'tokyoAnimationCorrect', { shirt: ['teal', .65], hairStyle: 'short', face: 'nw', prop(HH, RR, points) {
    const [x, y] = points.nearHand;
    HH.line(RR, [[x + 4, y + 4], [x - 7, y - 13]], 'blue', 1.4);
    HH.line(RR, [[x - 7, y - 13], [x - 8, y - 16]], 'sun', .8);
  } }, .12, 1.17);
  const [fx, fy] = H.p(3.63, 4.55, 1.37);
  H.clip(Array.from({ length: 28 }, (_, q) => [fx + Math.cos(q * TAU / 28) * 14, fy - 12 + Math.sin(q * TAU / 28) * 16]), () => {
    for (let q = 0; q < 3; q++) {
      const a = t * 2.5 + q * TAU / 3;
      shape(H, R, [[fx, fy - 12], [fx + Math.cos(a) * 13, fy - 12 + Math.sin(a) * 14], [fx + Math.cos(a + .8) * 8, fy - 12 + Math.sin(a + .8) * 9]], 'teal', .48, .5);
    }
  });
  H.dot(fx, fy - 12, 3, 'sun', 1, { knock: true });
  const flutter = Math.sin(t * 1.4) * .07;
  shape(H, R, [H.p(4.51, 5.41, .04), H.p(5.13, 5.41, .04), H.p(5.13, 6.13, .07 + flutter), H.p(4.51, 6.13, .04)], 'paper', 1, .6);
  actor(H, R, 5.13, 7.43, t * .39, 'read', { shirt: ['coral', .67], hairStyle: 'long', face: 'nw', prop(HH, RR, points) {
    const [x, y] = points.nearHand;
    shape(HH, RR, [[x - 15, y - 9], [x + 13, y - 2], [x + 13, y + 15], [x - 15, y + 8]], 'paper', 1);
    bird(HH, RR, x - 1, y + 4, .7, Math.sin(t * .8) * .6);
  } }, .1, 1.23);
  actor(H, R, 1.9, 11.12, t * .4, 'hold', { shirt: ['blue', .62], hairStyle: 'short', face: 'nw', prop(HH, RR, points) {
    const [x, y] = points.nearHand;
    shape(HH, RR, [[x - 14, y - 9], [x + 12, y - 1], [x + 12, y + 10], [x - 14, y + 3]], 'paper', 1);
    HH.line(RR, [[x - 10, y - 3], [x + 7, y + 2]], 'teal', 1.2);
  } }, 0, 1.24);
  const scan = cycle(t, 6);
  H.line(R, [H.p(.6, 9.66 + scan * .79, 1.235), H.p(1.4, 9.66 + scan * .79, 1.235)], 'sun', 2.2);
});
