import { world, shape, oval, stroke, box, table, actor, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const colors = ['teal', 'coral', 'sun', 'blue'];
const rest = FIGURES.clips.idle.keys[0][1];
FIGURES.clips.tokyoCollectorRestore = { dur: 15, keys: [[0, { ...rest, al: 44, ar: 70, el: 62, er: 38, head: 13 }], [.2, { ...rest, al: 56, ar: 92, el: 55, er: 27, head: 13 }], [.38, { ...rest, al: 64, ar: 59, el: 56, er: 60, head: 17 }], [.54, { ...rest, al: 64, ar: 68, el: 56, er: 62, head: 15 }], [.72, { ...rest, al: 83, ar: 78, el: 39, er: 41, head: -2 }], [.86, { ...rest, al: 83, ar: 78, el: 39, er: 41, head: -2 }], [1, { ...rest, al: 44, ar: 70, el: 62, er: 38, head: 13 }]] };

function bird(H, R, x, y, s = 1, wing = true) {
  oval(H, R, x, y, 7 * s, 5 * s, 'teal');
  oval(H, R, x + 4 * s, y - 4 * s, 4 * s, 4 * s, 'teal');
  shape(H, R, [[x + 7 * s, y - 5 * s], [x + 12 * s, y - 3 * s], [x + 7 * s, y - 2 * s]], 'sun', .8, .5);
  if (wing) shape(H, R, [[x - 3 * s, y], [x + s, y - 3 * s], [x + 2 * s, y + 3 * s]], 'coral', .8, .5);
  H.dot(x + 5 * s, y - 5 * s, s, 'blue');
  H.line(R, [[x - 2 * s, y + 4 * s], [x - 2 * s, y + 7 * s], [x + 2 * s, y + 7 * s]], 'blue', .8);
}

function robot(H, R, x, y, s = 1, ink = 'coral') {
  const P = points => points.map(([a, b]) => [x + a * s, y + b * s]);
  for (const side of [-1, 1]) {
    shape(H, R, P([[side * 4, -17], [side * 12, -17], [side * 13, -3], [side * 3, -3]]), 'blue', .76, .7);
    oval(H, R, x + side * 9 * s, y - 2 * s, 9 * s, 4 * s, 'teal');
    H.line(R, P([[side * 15, -35], [side * 22, -26], [side * 22, -16]]), 'blue', 4 * s);
    oval(H, R, x + side * 22 * s, y - 16 * s, 5 * s, 5 * s, 'sun');
  }
  shape(H, R, P([[-15, -42], [15, -42], [13, -16], [-13, -16]]), ink, .76);
  shape(H, R, P([[-12, -62], [12, -62], [12, -44], [-12, -44]]), 'paper', 1);
  for (const side of [-1, 1]) oval(H, R, x + side * 5 * s, y - 54 * s, 2.7 * s, 3 * s, 'teal');
  H.line(R, P([[-5, -48], [5, -48]]), 'blue', s);
  oval(H, R, x, y - 30 * s, 7 * s, 8 * s, 'paper', 1);
  for (let q = 0; q < 3; q++) H.line(R, P([[-4, -34 + q * 4], [4, -34 + q * 4]]), 'blue', .65 * s);
  H.line(R, P([[0, -62], [0, -72]]), 'blue', s);
  H.dot(x, y - 73 * s, 3 * s, 'sun');
}

function creature(H, R, x, y, s, ink) {
  shape(H, R, [[x - 9 * s, y - 11 * s], [x - 8 * s, y - 28 * s], [x - 2 * s, y - 22 * s], [x + 6 * s, y - 27 * s], [x + 10 * s, y - 9 * s]], ink, .66);
  oval(H, R, x, y - 9 * s, 11 * s, 12 * s, ink);
  for (const side of [-1, 1]) {
    oval(H, R, x + side * 4 * s, y - 14 * s, 3 * s, 4 * s, 'paper');
    H.dot(x + side * 4 * s, y - 14 * s, 1.3 * s, 'blue');
    oval(H, R, x + side * 7 * s, y + s, 5 * s, 2.8 * s, 'blue');
  }
  H.line(R, [[x - 3 * s, y - 5 * s], [x, y - 3 * s], [x + 3 * s, y - 5 * s]], 'blue', .7);
}

function train(H, R, i, j, z) {
  for (let q = 0; q < 3; q++) {
    box(H, R, i + q * .62, j, .57, .32, z, .3, 'paper', 1);
    shape(H, R, H.faceI(i + q * .62 + .05, j + .34, .47, z + .09, z + .15), 'teal', .8, .3);
    for (let n = 0; n < 3; n++) shape(H, R, H.faceI(i + q * .62 + .05 + n * .16, j + .34, .1, z + .19, z + .26), 'blue', .8, .3);
  }
  H.line(R, [H.p(i - .07, j + .1, z - .025), H.p(i + 1.9, j + .1, z - .025)], 'blue', .8);
  H.line(R, [H.p(i - .07, j + .3, z - .025), H.p(i + 1.9, j + .3, z - .025)], 'blue', .8);
}

function collectorStock(H, R) {
  shape(H, R, H.tile(2.02, 2.76, 4.13, 4.79, .025), 'teal', .2);
  shape(H, R, H.tile(7.73, 6.98, 3.58, 2.82, .025), 'coral', .18);
  for (let q = 0; q < 7; q++) {
    const i = .45 + q * .9;
    box(H, R, i, .38, .78, .74, 2.84, .62 + q % 2 * .18, colors[q % 3], .56);
    shape(H, R, H.faceI(i + .11, 1.15, .56, 2.93, 3.37), 'paper', 1);
    const [x, y] = H.p(i + .39, 1.17, 3.07);
    if (q % 2) bird(H, R, x, y, .91);
    else creature(H, R, x, y + 4, .7, colors[(q + 1) % 3]);
    H.line(R, [H.p(i + .12, 1.18, 2.91), H.p(i + .65, 1.18, 2.91)], 'sun', 1.1);
  }
  for (let q = 0; q < 6; q++) {
    const j = 1.83 + q * .81;
    box(H, R, .3, j, .83, .69, 2.84, .51 + q % 3 * .12, colors[(q + 1) % 3], .56);
    shape(H, R, H.faceJ(1.15, j + .1, .5, 2.94, 3.29), 'paper', 1);
    H.line(R, [H.p(1.18, j + .16, 3.04), H.p(1.18, j + .54, 3.22)], 'coral', 3);
  }
  box(H, R, 2.11, 3.0, 2.34, 2.07, 0, .83, 'coral', .6);
  box(H, R, 2.19, 3.08, 2.18, 1.91, .84, .08, 'sun', .64);
  box(H, R, 2.62, 3.41, 1.31, 1.1, .93, .26, 'teal', .54);
  creature(H, R, ...H.p(3.25, 4.04, 1.23), 1.61, 'teal');
  for (let q = 0; q < 4; q++) {
    const [x, y] = H.p(2.43 + q % 2 * 1.51, 3.34 + Math.floor(q / 2) * 1.29, .98);
    creature(H, R, x, y, .88, colors[q % 3]);
  }
  for (let q = 0; q < 8; q++) {
    const i = 2.24 + q * .26;
    box(H, R, i, 4.51, .2, .39, .16, .51 + q % 3 * .04, colors[q % 3], .55);
    H.line(R, [H.p(i + .04, 4.93, .4), H.p(i + .16, 4.93, .4)], 'paper', 1.1);
  }
  for (let row = 0; row < 2; row++) {
    box(H, R, 1.84, 10.36 + row * .77, 2.45, .65, 0, .41, row ? 'sun' : 'teal', .56);
    for (let q = 0; q < 10; q++) {
      box(H, R, 1.99 + q * .22, 10.45 + row * .77, .16, .44, .22, .51 + q % 3 * .09, colors[q % 4], .58);
      H.line(R, [H.p(2.01 + q * .22, 10.91 + row * .77, .52), H.p(2.11 + q * .22, 10.91 + row * .77, .52)], 'paper', 1.1);
    }
  }
  box(H, R, 5.15, 10.79, 2.33, .77, 0, .51, 'paper', 1);
  for (let q = 0; q < 5; q++) {
    box(H, R, 5.32 + q * .43, 10.97, .34, .45, .52, .47, colors[q % 3], .53);
    const [x, y] = H.p(5.5 + q * .43, 11.44, .7);
    bird(H, R, x, y, .63);
  }
  table(H, R, 9.13, 6.27, 2.3, 1.48, .77, 'teal');
  box(H, R, 9.4, 6.53, 1.18, .89, .91, .54, 'sun', .5);
  shape(H, R, H.tile(9.49, 6.62, 1.0, .72, 1.47), 'paper', .7);
  shape(H, R, [H.p(9.4, 6.53, 1.47), H.p(10.58, 6.53, 1.47), H.p(10.58, 6.22, 1.74), H.p(9.4, 6.22, 1.74)], 'sun', .5);
  shape(H, R, [H.p(9.4, 7.42, 1.47), H.p(10.58, 7.42, 1.47), H.p(10.58, 7.68, 1.26), H.p(9.4, 7.68, 1.26)], 'sun', .5);
  creature(H, R, ...H.p(10.01, 7.02, 1.5), .98, 'paper');
  for (let q = 0; q < 3; q++) {
    const [x, y] = H.p(10.89, 6.54 + q * .33, .94);
    shape(H, R, [[x - 9, y], [x - 5, y - 11], [x + 9, y - 7], [x + 10, y + 4]], 'paper', 1, .6);
    H.line(R, [[x - 6, y - 5], [x + 5, y - 2]], 'teal', .8);
  }
  box(H, R, 9.53, 6.51, 1.42, .92, .12, .43, 'coral', .58);
  for (const i of [9.38, 11.21]) for (const j of [6.46, 7.56]) oval(H, R, ...H.p(i, j, .06), 4, 5, 'blue');
  box(H, R, 7.33, 3.47, 1.04, .88, 0, .42, 'sun', .48);
  for (let q = 0; q < 5; q++) box(H, R, 7.44 + q * .17, 3.57, .13, .67, .23, .68, colors[q % 3], .54);
  shape(H, R, H.faceI(7.55, .08, 1.09, 2.22, 3.17), 'paper', 1);
  const [px, py] = H.p(8.09, .1, 2.48);
  shape(H, R, [[px - 15, py + 6], [px - 4, py - 20], [px + 15, py + 1], [px + 2, py - 3]], 'coral', .68);
  H.dot(px - 9, py - 22, 3, 'sun');
  box(H, R, 8.34, 10.1, 1.07, 1.01, 0, .47, 'teal', .49);
  for (let q = 0; q < 3; q++) {
    const [x, y] = H.p(8.59 + q * .25, 10.49, .51);
    oval(H, R, x, y, 9, 7, 'paper');
    oval(H, R, x + 2, y - 4, 4, 3, colors[q]);
  }
}

function cabinet(H, R, i, j, w, d, h, side) {
  box(H, R, i, j, w, d, 0, .27, 'blue', .72);
  for (const z of [.29, 1.08, 1.88, 2.68]) {
    box(H, R, i, j, w, d, z, .06, 'paper', 1);
    if (z < 2.68) {
      const count = side ? 5 : Math.floor(w / .87);
      for (let q = 0; q < count; q++) {
        const x = i + (side ? .44 : .42 + q * .92), y = j + (side ? .44 + q * .92 : .44), zz = z + .12;
        const [px, py] = H.p(x, y, zz);
        if (z < .4) {
          if (q % 2) creature(H, R, px, py, .96, colors[q % 3]);
          else robot(H, R, px, py, .42, colors[q % 3]);
        } else if (z < 1.2) {
          box(H, R, x - .33, y - .28, .68, .53, zz, .62, colors[q % 3], .63);
          const [bx, by] = H.p(x, y + .21, zz + .12);
          if (q % 2) bird(H, R, bx, by, .97);
          else creature(H, R, bx, by, .66, 'paper');
        } else if (q % 3 === 0) {
          const p = [[px - 14, py - 6], [px, py - 22], [px + 17, py - 4], [px + 3, py - 7], [px, py + 1], [px - 4, py - 7]];
          shape(H, R, p, 'paper', 1);
          H.line(R, [[px, py - 20], [px, py - 3]], 'coral', 1.6);
        } else {
          for (let n = 0; n < 3; n++) box(H, R, x - .23 + n * .16, y, .13, .36, zz, .45 + n % 2 * .07, colors[(q + n) % 3], .6);
        }
      }
    }
  }
  for (const [x, y] of [[i, j], [i + w, j], [i + w, j + d], [i, j + d]]) H.line(R, [H.p(x, y, .25), H.p(x, y, h)], 'blue', 1.5);
  const front = side ? H.faceJ(i + w + .01, j, d, .3, h) : H.faceI(i, j + d + .01, w, .3, h);
  H.tint(front, 'teal', .06);
  H.outline(R, front, 'blue', 1);
  for (const q of [.23, .74]) {
    const a = side ? H.p(i + w + .02, j + d * q, .56) : H.p(i + w * q, j + d + .02, .56);
    const b = side ? H.p(i + w + .02, j + d * q + .55, 2.42) : H.p(i + w * q + .55, j + d + .02, 2.42);
    H.line(R, [a, b], 'paper', 2.3, { tone: .55 });
  }
}

function furnishings(H, R) {
  collectorStock(H, R);
  cabinet(H, R, .35, .34, 6.53, .98, 2.77, false);
  cabinet(H, R, .25, 1.61, 1.03, 5.29, 2.77, true);
  box(H, R, 7.53, .42, 3.81, 1.85, 0, .45, 'blue', .75);
  box(H, R, 8.28, .88, 2.0, 1.13, .45, .39, 'coral', .4);
  robot(H, R, ...H.p(9.28, 1.6, .92), 1.48, 'coral');
  box(H, R, 7.53, .41, 3.81, .17, 3.74, .1, 'paper', 1);
  for (const i of [7.53, 11.34]) H.line(R, [H.p(i, .43, .46), H.p(i, .43, 3.83)], 'blue', 1.6);
  for (let q = 0; q < 4; q++) {
    const i = 7.75 + q * .81;
    box(H, R, i, 2.16, .61, .24, .45, .22, 'paper', 1);
    H.dot(...H.p(i + .3, 2.43, .58), 2.5, colors[q % 3]);
  }
  box(H, R, .27, 7.34, 1.0, 2.66, 0, .68, 'teal', .4);
  for (let q = 0; q < 4; q++) {
    const j = 7.46 + q * .6;
    shape(H, R, H.faceJ(1.3, j, .5, .8, 1.55), 'paper', 1);
    const [x, y] = H.p(1.32, j + .25, 1.07);
    bird(H, R, x, y, .68);
    H.line(R, [H.p(1.31, j, 1.56), H.p(1.31, j + .5, 1.56)], 'coral', 1.5);
  }
  table(H, R, 4.13, 5.33, 4.63, 1.57, .94, 'paper');
  shape(H, R, H.tile(4.33, 5.5, 2.5, 1.2, 1.08), 'teal', .28);
  box(H, R, 4.64, 5.69, .86, .77, 1.1, .08, 'blue', .5);
  const [gx, gy] = H.p(7.62, 6.03, 1.1);
  shape(H, R, [[gx - 9, gy + 8], [gx - 10, gy - 2], [gx - 14, gy - 7], [gx - 12, gy - 10], [gx - 7, gy - 6], [gx - 6, gy - 18], [gx - 3, gy - 18], [gx - 1, gy - 7], [gx + 1, gy - 21], [gx + 4, gy - 21], [gx + 5, gy - 7], [gx + 7, gy - 16], [gx + 10, gy - 15], [gx + 9, gy + 6]], 'paper', 1, .6);
  const [lx, ly] = H.p(8.19, 5.74, 1.14);
  H.line(R, [[lx, ly], [lx - 8, ly - 15], [lx + 1, ly - 34]], 'blue', 2);
  shape(H, R, [[lx - 6, ly - 35], [lx + 10, ly - 35], [lx + 15, ly - 25], [lx - 10, ly - 25]], 'sun', .68);
  oval(H, R, ...H.p(7.09, 6.51, 1.1), 9, 6, 'paper');
  oval(H, R, ...H.p(7.09, 6.51, 1.1), 7, 4, 'teal', .13);
  H.line(R, [H.p(7.2, 6.57, 1.11), H.p(7.57, 6.89, 1.11)], 'blue', 2);
  H.line(R, [H.p(7.72, 6.61, 1.1), H.p(8.11, 6.43, 1.1)], 'sun', 2);
  for (let q = 0; q < 5; q++) H.line(R, [H.p(8.1, 6.43, 1.1), H.p(8.27, 6.33 + q * .04, 1.1)], 'paper', .8);
  for (let q = 0; q < 3; q++) {
    shape(H, R, H.tile(6.2 + q * .45, 5.48, .36, .43, 1.1), 'paper', 1, .5);
    H.line(R, [H.p(6.23 + q * .45, 5.53, 1.12), H.p(6.5 + q * .45, 5.53, 1.12)], 'coral', .7);
    oval(H, R, ...H.p(6.38 + q * .45, 5.75, 1.12), 3, 2, 'sun');
  }
  box(H, R, 2.0, 8.75, 5.35, 1.3, 0, .85, 'blue', .62);
  shape(H, R, H.tile(2.12, 8.88, 5.08, 1.02, .87), 'paper', 1);
  train(H, R, 2.29, 9.24, .9);
  train(H, R, 4.81, 9.13, .9);
  for (const [i, j] of [[2, 8.75], [7.35, 8.75], [7.35, 10.05], [2, 10.05]]) H.line(R, [H.p(i, j, .87), H.p(i, j, 1.46)], 'blue', 1);
  H.tint(H.tile(2, 8.75, 5.35, 1.3, 1.46), 'teal', .07);
  H.outline(R, H.tile(2, 8.75, 5.35, 1.3, 1.46), 'blue', 1.1);
  box(H, R, 9.8, 3.18, 1.25, 1.24, 0, 1.03, 'teal', .45);
  oval(H, R, ...H.p(10.42, 3.8, 1.08), 22, 11, 'blue', .75);
  for (let q = 0; q < 3; q++) box(H, R, 8.65, 1.62, .96, .74, .02 + q * .2, .18, colors[q], .5);
  shape(H, R, H.tile(9.41, 10.5, 2.33, 1.15, .025), 'sun', .22);
  box(H, R, 10.31, 9.81, 1.05, .92, 0, .88, 'coral', .7);
  box(H, R, 10.36, 9.84, .94, .85, .88, .86, 'paper', 1);
  shape(H, R, H.faceI(10.45, 10.72, .77, 1.02, 1.65), 'teal', .14);
  for (let q = 0; q < 7; q++) {
    const [x, y] = H.p(10.53 + q % 3 * .23, 10.74, 1.14 + Math.floor(q / 3) * .19);
    oval(H, R, x, y, 4, 4, colors[q % 3]);
    H.line(R, [[x - 3, y], [x + 3, y]], 'paper', .7);
  }
  oval(H, R, ...H.p(10.84, 10.76, .67), 8, 8, 'paper');
  H.line(R, [H.p(10.84, 10.78, .53), H.p(10.84, 10.78, .8)], 'blue', 2);
  shape(H, R, H.faceI(10.56, 10.77, .55, .17, .39), 'blue', .8);
}

export default world('tokyo-nakano-collectors', 'Nakano · The missing piece', { floor: 'paper', tone: .37, wall: 'blue', wallTone: .37, pattern: 'tiles', height: 3.82, head: 20 }, furnishings, (H, R, t) => {
  const u = cycle(t, 15), closed = .5 + .5 * Math.cos(u * TAU), turn = t * .32;
  const [rx, ry] = H.p(10.42, 3.8, 1.15);
  creature(H, R, rx + Math.sin(turn) * 3, ry, 1.08, 'sun');
  H.line(R, [[rx - 11, ry + 4], [rx + 11, ry + 4]], 'paper', .7);
  actor(H, R, 5.38, 4.78, t, 'tokyoCollectorRestore', { shirt: ['teal', .68], glasses: true, face: 'se', prop(HH, RR, points) {
    const [x, y] = points.nearHand;
    bird(HH, RR, x + 2, y - 3, 1.3, u > .5 && u < .93);
    if (u <= .5 || u >= .93) {
      const [a, b] = points.farHand;
      shape(HH, RR, [[a - 3, b], [a + 2, b - 5], [a + 4, b + 4]], 'coral', .8, .6);
    }
  } }, 0, 1.25);
  actor(H, R, 7.42, 7.72, t * .25, u > .62 && u < .91 ? 'talk' : 'think', { shirt: ['sun', .68], hairStyle: 'curly', face: 'nw' }, 0, 1.22);
  const lid = [H.p(4.62, 5.67, 1.17), H.p(5.54, 5.67, 1.17), H.p(5.54, 5.67 + closed * .79, 1.18 + (1 - closed) * .64), H.p(4.62, 5.67 + closed * .79, 1.18 + (1 - closed) * .64)];
  H.tint(lid, 'teal', .09);
  H.outline(R, lid, 'blue', .8);
  actor(H, R, 2.69, 6.18, t * .3, 'hold', { shirt: ['coral', .68], hairStyle: 'curly', face: 'nw', prop(HH, RR, points) {
    const [x, y] = points.nearHand;
    shape(HH, RR, [[x - 13, y - 12], [x + 12, y - 7], [x + 12, y + 11], [x - 13, y + 6]], 'paper', 1);
    creature(HH, RR, x, y + 7, .55, 'teal');
  } }, 0, 1.25);
  actor(H, R, 10.65, 8.29, t * .43, 'hold', { shirt: ['blue', .63], hairStyle: 'short', face: 'nw', prop(HH, RR, points) {
    const [x, y] = points.nearHand;
    creature(HH, RR, x - 4, y - 2 + Math.sin(t * .9) * 2, .77, 'coral');
  } }, 0, 1.26);
  actor(H, R, 7.53, 10.31, t * .31, 'kneel', { shirt: ['teal', .67], hairStyle: 'pony', face: 'se', prop(HH, RR, points) {
    const [x, y] = points.nearHand;
    bird(HH, RR, x + 3, y - 3, .85);
  } }, 0, 1.2);
});
