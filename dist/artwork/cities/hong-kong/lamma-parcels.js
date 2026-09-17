import { metal, bentTube } from '../materials.js';
import { panelFront, caster } from '../joinery.js';
import { shelfUnit, drawerUnit, shallowTray, liddedTin, foldedCloth, coiledLine, boundBook, satchel, handTool, framedPanel, servicePipe } from '../furnishings.js';
import { world, shape, oval, stroke, box, bench, actor, cycle, TAU, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const hold = { ...rest, lean: -5, head: 15, al: 64, ar: 65, el: 50, er: 51 };
const balance = { ...hold, lean: 8, head: 7, al: 77, ar: 80, el: 27, er: 33 };
FIGURES.clips.hongKongLammaBalance = { dur: 16, keys: [[0, hold], [.15, hold], [.33, balance], [.51, balance], [.65, { ...balance, head: 19 }], [.83, hold], [1, hold]] };
const sit = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, al: 43, ar: 47, el: 75, er: 76, head: 16 };
FIGURES.clips.hongKongLammaWait = { dur: 16, keys: [[0, sit], [.42, sit], [.57, { ...sit, head: -10 }], [.74, { ...sit, head: -10 }], [.88, sit], [1, sit]] };

function carton(H, R, i, j, w, d, z, height, ink = 'sun') {
  box(H, R, i, j, w, d, z, height, ink, .49);
  H.line(R, [H.p(i + w * .5, j, z + height + .01), H.p(i + w * .5, j + d, z + height + .01), H.p(i + w * .5, j + d, z + .03)], 'paper', 2.3);
  H.line(R, [H.p(i + .04, j + d * .52, z + height + .01), H.p(i + w - .04, j + d * .52, z + height + .01)], 'blue', .6, { tone: .55 });
  shape(H, R, H.faceI(i + w * .16, j + d + .025, w * .25, z + height * .27, z + height * .55), 'paper', 1, .4);
}

function crate(H, R, i, j, z = 0.18) {
  metal(H, R, i, j, 1.69, 1.28, z, 0.085, 'teal');
  for (const x of [i + 0.03, i + 1.59]) for (const y of [j + 0.03, j + 1.18]) metal(H, R, x, y, 0.07, 0.07, z, 0.77, 'teal');
  for (const h of [0.18, 0.39, 0.64]) {
    metal(H, R, i, j, 1.69, 0.07, z + h, 0.095, 'teal');
    metal(H, R, i, j + 1.21, 1.69, 0.07, z + h, 0.095, 'teal');
    metal(H, R, i, j, 0.07, 1.28, z + h, 0.095, 'teal');
    metal(H, R, i + 1.62, j, 0.07, 1.28, z + h, 0.095, 'teal');
  }
  for (let n = 0; n < 6; n++)
    bentTube(
      H,
      R,
      [
        [i + 0.15 + n * 0.27, j + 1.27, z + 0.1],
        [i + 0.15 + n * 0.27, j + 1.27, z + 0.73]
      ],
      0.8,
      'teal'
    );
  bentTube(
    H,
    R,
    [
      [i + 0.59, j + 1.29, z + 0.64],
      [i + 0.59, j + 1.29, z + 0.79],
      [i + 1.07, j + 1.29, z + 0.79],
      [i + 1.07, j + 1.29, z + 0.64]
    ],
    1.5,
    'blue'
  );
}


function bicycle(H, R, i, j) {
  const [x, y] = H.p(i, j, .06);
  for (const dx of [-32, 34]) {
    oval(H, R, x + dx, y, 21, 24, 'paper', 1);
    H.outline(R, ell(x + dx, y, 17, 20), 'blue', .9);
    for (let k = 0; k < 6; k++) {
      const a = k * TAU / 6;
      H.line(R, [[x + dx, y], [x + dx + Math.cos(a) * 18, y + Math.sin(a) * 21]], 'blue', .55, { tone: .62 });
    }
  }
  stroke(H, R, [[x - 32, y], [x - 11, y - 29], [x + 3, y], [x - 32, y], [x + 18, y - 30], [x + 3, y], [x + 34, y]], 'coral', 2.6);
  H.line(R, [[x + 18, y - 30], [x + 34, y], [x + 16, y - 42], [x + 27, y - 44]], 'blue', 1.7);
  H.line(R, [[x - 11, y - 29], [x - 12, y - 39]], 'blue', 1.8);
  H.line(R, [[x - 23, y - 40], [x - 4, y - 38]], 'blue', 3.2);
  H.outline(R, ell(x + 3, y, 6, 6), 'blue', 1);
  stroke(H, R, [[x + 2, y], [x + 10, y + 10], [x + 18, y + 10]], 'blue', 1.5);
  shape(H, R, [[x + 15, y - 45], [x + 39, y - 42], [x + 35, y - 25], [x + 20, y - 28]], 'sun', .52);
  for (let k = 0; k < 5; k++) H.line(R, [[x + 18 + k * 4, y - 41], [x + 21 + k * 3, y - 29]], 'blue', .6);
}

function shelter(H, R) {
  shape(H, R, H.tile(0.08, 0.08, 11.84, 1.72, 0.025), 'teal', 0.49);
  for (let k = 0; k < 8; k++) H.line(R, [H.p(0.5 + k * 1.39, 0.66, 0.04), H.p(1.18 + k * 1.39, 0.66, 0.04)], 'paper', 0.9, { tone: 0.67 });
  box(H, R, 0.07, 1.84, 11.86, 10.07, 0.03, 0.14, 'paper', 0.9);
  for (const j of [4.26, 7.26, 10.13]) H.line(R, [H.p(0.15, j, 0.18), H.p(11.81, j, 0.18)], 'blue', 0.65, { tone: 0.25 });
  for (const i of [3.12, 7.01, 10.28]) H.line(R, [H.p(i, 1.93, 0.18), H.p(i, 11.84, 0.18)], 'blue', 0.65, { tone: 0.25 });
  shape(H, R, H.tile(0.22, 1.85, 11.56, 0.35, 0.18), 'sun', 0.62);
  for (let k = 0; k < 15; k++) H.line(R, [H.p(0.33 + k * 0.76, 1.87, 0.2), H.p(0.33 + k * 0.76, 2.17, 0.2)], 'blue', 0.75, { tone: 0.59 });
  for (const i of [0.47, 5.8, 11.29]) {
    box(H, R, i, 2.33, 0.2, 0.2, 0.18, 3.28, 'teal', 0.65);
    box(H, R, i - 0.09, 2.24, 0.38, 0.38, 0.17, 0.19, 'blue', 0.62);
  }
  shape(H, R, [H.p(0.17, 1.83, 3.55), H.p(11.87, 1.83, 3.55), H.p(11.87, 4.2, 3.22), H.p(0.17, 4.2, 3.22)], 'paper', 1);
  for (let i = 0.33; i < 11.8; i += 0.4) H.line(R, [H.p(i, 1.84, 3.56), H.p(i, 4.18, 3.24)], 'teal', 0.65, { tone: 0.62 });
  H.line(R, [H.p(0.15, 4.2, 3.21), H.p(11.89, 4.2, 3.21)], 'blue', 3.1);
  stroke(H, R, [H.p(0.29, 4.15, 3.2), H.p(0.31, 4.3, 2.9), H.p(0.31, 4.3, 0.36), H.p(0.57, 4.47, 0.24)], 'teal', 2.7);
  bench(H, R, 0.79, 3.56, 3.75, 'teal');
  box(H, R, 0.79, 3.56, 3.75, 0.79, 0.63, 0.13, 'teal', 0.49);
  box(H, R, 0.79, 3.58, 3.75, 0.12, 0.75, 0.67, 'teal', 0.49);
  for (let k = 0; k < 3; k++) H.line(R, [H.p(0.92, 3.74, 0.83 + k * 0.18), H.p(4.36, 3.74, 0.83 + k * 0.18)], 'paper', 0.8);
  box(H, R, 8.7, 2.42, 0.14, 1.3, 1.39, 1.48, 'blue', 0.58);
  shape(H, R, H.faceJ(8.87, 2.54, 1.06, 1.61, 2.69), 'paper', 1);
  const [mx, my] = H.p(8.9, 3.05, 2.1);
  stroke(
    H,
    R,
    [
      [mx - 8, my + 13],
      [mx - 1, my + 1],
      [mx + 6, my - 5],
      [mx + 10, my - 18]
    ],
    'teal',
    2.2
  );
  for (const [x, y] of [
    [-8, 13],
    [-1, 1],
    [6, -5],
    [10, -18]
  ])
    H.dot(mx + x, my + y, 2.2, 'sun', 1, { knock: true });
  crate(H, R, 9.57, 3.37);
  crate(H, R, 9.57, 3.37, 1.0);
  for (let k = 0; k < 3; k++) carton(H, R, 9.21, 5.27 + k * 1.36, 1.83, 1.14, 0.18, 0.71 + (k % 2) * 0.24, k === 1 ? 'coral' : 'sun');
  for (const i of [3.6, 7.4])
    for (const j of [5.14, 7.22]) {
      const [x, y] = H.p(i, j, 0.28);
      oval(H, R, x, y, 7, 9, 'blue', 0.81);
      H.dot(x, y, 2.1, 'paper', 1, { knock: true });
    }
  metal(H, R, 3.34, 4.84, 4.55, 2.73, 0.49, 0.17, 'teal');
  for (const i of [3.49, 7.58])
    bentTube(
      H,
      R,
      [
        [i, 5.13, 0.46],
        [i, 7.27, 0.46],
        [i, 8.21, 1.86]
      ],
      3,
      'teal'
    );
  for (let j = 5.05; j < 7.5; j += 0.48) H.line(R, [H.p(3.47, j, 0.68), H.p(7.76, j, 0.68)], 'paper', 0.8);
  for (const i of [3.49, 7.58]) stroke(H, R, [H.p(i, 7.44, 0.62), H.p(i, 8.21, 1.41), H.p(i, 8.21, 1.89)], 'blue', 2.5);
  H.line(R, [H.p(3.49, 8.21, 1.88), H.p(7.58, 8.21, 1.88)], 'blue', 2.6);
  carton(H, R, 3.58, 5.02, 1.52, 1.03, 0.69, 0.94, 'sun');
  carton(H, R, 5.22, 5.04, 2.36, 1.21, 0.69, 0.72, 'paper');
  carton(H, R, 6.44, 6.36, 1.07, 0.94, 0.69, 1.12, 'coral');
  carton(H, R, 3.64, 5.12, 1.34, 0.86, 1.66, 0.58, 'coral');
  const [sx, sy] = H.p(5.85, 5.79, 1.52);
  shape(
    H,
    R,
    [
      [sx - 16, sy + 5],
      [sx + 13, sy + 6],
      [sx + 18, sy - 19],
      [sx + 6, sy - 32],
      [sx - 5, sy - 29],
      [sx - 17, sy - 13]
    ],
    'paper',
    1
  );
  stroke(
    H,
    R,
    [
      [sx - 9, sy - 22],
      [sx + 5, sy - 17],
      [sx + 10, sy - 28]
    ],
    'teal',
    1.2
  );
  bicycle(H, R, 1.35, 7.23);
  const [rx, ry] = H.p(10.8, 10.5, 0.2);
  for (let k = 0; k < 4; k++) H.outline(R, ell(rx, ry, 10 + k * 4, 4 + k * 1.6), 'sun', 1.6, { tone: 0.67 });
  box(H, R, 10.45, 10.95, 0.43, 0.41, 0.18, 0.69, 'blue', 0.75);
  box(H, R, 10.24, 10.97, 0.85, 0.36, 0.82, 0.13, 'blue', 0.7);
  const [ux, uy] = H.p(4.4, 4.61, 0.21);
  stroke(
    H,
    R,
    [
      [ux, uy],
      [ux, uy - 54],
      [ux + 5, uy - 62],
      [ux + 12, uy - 56]
    ],
    'blue',
    1.5
  );
  shape(
    H,
    R,
    [
      [ux - 3, uy],
      [ux - 8, uy - 42],
      [ux + 5, uy - 43],
      [ux + 5, uy - 2]
    ],
    'coral',
    0.63
  );
  shape(H, R, H.tile(4.7, 10.56, 2.3, 0.71, 0.2), 'sun', 0.2);
  for (let k = 0; k < 8; k++) H.dot(...H.p(4.91 + k * 0.26, 10.86, 0.22), 1.4, 'blue', 0.35);
  lammaParcelsDetails(H, R);
  construction(H, R);
}

function lammaParcelsDetails(H, R) {
  drawerUnit(H, R, 9.03, 3.92, 2.07, 1.21, 1.16, 3, 'teal', 0.18);
  shallowTray(H, R, 9.22, 4.1, 1.02, 0.85, 1.52, 'sun');
  coiledLine(H, R, 9.73, 4.5, 1.73, 10, 'coral');
  handTool(H, R, 9.81, 4.61, 1.75, 'scissors', 'blue');
  boundBook(H, R, 10.43, 4.11, 0.48, 0.78, 1.52, 'teal');
  shelfUnit(H, R, 0.56, 8.18, 2.2, 1.09, 0.18, [0.13, 1.01, 1.8], 'sun');
  foldedCloth(H, R, 0.74, 8.32, 1.78, 0.78, 0.45, 'teal', 'paper');
  for (let n = 0; n < 3; n++) liddedTin(H, R, 1 + n * 0.62, 8.7, 1.33, 6, 15, ['paper', 'coral', 'sun'][n]);
  satchel(H, R, 1.73, 8.73, 2.13, 'blue', 0.75);
  shallowTray(H, R, 8.26, 8.48, 1.44, 1.34, 0.18, 'teal');
  for (let n = 0; n < 3; n++) coiledLine(H, R, 8.61 + n * 0.36, 9.12, 0.38, 7, 'sun');
  servicePipe(
    H,
    R,
    [
      [11.51, 2.64, 0.21],
      [11.51, 2.64, 3.44],
      [10.49, 2.64, 3.44]
    ],
    'teal',
    2.4
  );
  for (const i of [3.55, 7.25]) {
    box(H, R, i, 7.01, 0.42, 0.36, 0.2, 0.12, 'blue', 0.7);
    shape(H, R, [H.p(i, 7.01, 0.32), H.p(i + 0.42, 7.01, 0.32), H.p(i + 0.42, 7.37, 0.2)], i < 4 ? 'sun' : 'coral', 0.6, 0.6);
  }
  framedPanel(H, R, 6.6, 2.53, 1.36, 1.96, 0.86, 'teal');
}

function construction(H, R) {
  for (const i of [0.65, 5.76, 11.06]) {
    H.line(R, [H.p(i, 2.48, 2.81), H.p(i + 0.48, 2.48, 3.44)], 'sun', 2.1);
    for (const z of [0.42, 2.91]) {
      H.dot(...H.p(i + 0.07, 2.56, z), 1.5, 'paper');
      H.line(R, [H.p(i + 0.02, 2.57, z), H.p(i + 0.12, 2.57, z)], 'blue', 0.65);
    }
  }
  for (let n = 0; n < 15; n++) {
    const i = 0.3 + n * 0.78;
    H.line(R, [H.p(i, 1.91, 0.19), H.p(i, 2.19, 0.19)], 'blue', 0.65);
  }
  for (const [i, j] of [
    [3.47, 4.97],
    [7.56, 4.97],
    [3.47, 7.25],
    [7.56, 7.25]
  ])
    caster(H, R, i, j, 0.28);
  for (const j of [4.93, 7.24]) {
    H.line(R, [H.p(3.36, j, 0.31), H.p(7.81, j, 0.31)], 'blue', 2.3);
    for (let n = 0; n < 6; n++) H.dot(...H.p(3.57 + n * 0.74, j, 0.52), 1.2, 'sun');
  }
  panelFront(H, R, 9.09, 5.15, 1.94, 0.31, 1.0, 3, 'teal');
  const [x, y] = H.p(10.11, 4.55, 1.54);
  shape(
    H,
    R,
    [
      [x - 15, y],
      [x + 13, y],
      [x + 11, y - 13],
      [x - 10, y - 13]
    ],
    'paper',
    1,
    0.7
  );
  oval(H, R, x, y - 20, 10, 10, 'sun', 0.5);
  H.line(
    R,
    [
      [x, y - 20],
      [x - 4, y - 25]
    ],
    'blue',
    1.2
  );
  for (let n = 0; n < 6; n++) {
    const a = (n * TAU) / 6;
    H.dot(x + Math.cos(a) * 7, y - 20 + Math.sin(a) * 7, 0.8, 'blue');
  }
  for (let n = 0; n < 3; n++) {
    const [px, py] = H.p(9.43 + n * 0.42, 4.92, 1.53);
    shape(
      H,
      R,
      [
        [px - 4, py],
        [px + 4, py],
        [px + 4, py - 11],
        [px - 4, py - 11]
      ],
      n % 2 ? 'coral' : 'teal',
      0.6,
      0.5
    );
    H.line(
      R,
      [
        [px - 3, py - 7],
        [px + 3, py - 7]
      ],
      'paper',
      0.9
    );
  }
  for (let n = 0; n < 6; n++) {
    const j = 8.36 + n * 0.15;
    H.line(R, [H.p(0.72, j, 2.13), H.p(2.49, j, 2.13)], 'teal', 0.7);
  }
  for (const j of [3.76, 4.1]) for (let n = 0; n < 8; n++) H.line(R, [H.p(0.94 + n * 0.42, j, 0.79), H.p(1.15 + n * 0.42, j, 0.79)], 'paper', 0.65);
  box(H, R, 5.6, 2.47, 2.1, 0.2, 1.58, 1.48, 'teal', 0.4);
  for (let n = 0; n < 6; n++) {
    const i = 5.75 + (n % 3) * 0.59,
      z = 1.75 + Math.floor(n / 3) * 0.59;
    shape(H, R, H.faceI(i, 2.69, 0.48, z, z + 0.43), 'paper', 1, 0.55);
    H.line(R, [H.p(i + 0.08, 2.7, z + 0.26), H.p(i + 0.39, 2.7, z + 0.26)], n % 2 ? 'coral' : 'teal', 1.1);
    H.dot(...H.p(i + 0.23, 2.71, z + 0.37), 1, 'sun');
  }
  const [px, py] = H.p(7.97, 10.64, 0.2);
  shape(
    H,
    R,
    [
      [px - 7, py],
      [px + 8, py - 5],
      [px + 10, py + 2],
      [px - 5, py + 7]
    ],
    'paper',
    1,
    0.55
  );
  H.line(
    R,
    [
      [px - 3, py],
      [px + 5, py - 2]
    ],
    'teal',
    0.8
  );
}

const room = world('hong-kong-lamma-parcels', 'Lamma · The last parcel fits', { floor: 'paper', tone: .6, wall: false, head: 20 }, shelter, (H, R, t) => {
  const u = cycle(t, 16);
  H.at(5.21, 8.12, .18, HH => actor(HH, R, 5.21, 8.12, t, 'hongKongLammaBalance', { shirt: ['sun', .61], hairStyle: 'cap', face: 'nw', prop(h, r, p) {
    const x = (p.nearHand[0] + p.farHand[0]) / 2, y = (p.nearHand[1] + p.farHand[1]) / 2;
    shape(h, r, [[x - 24, y - 12], [x + 6, y - 21], [x + 26, y - 9], [x - 5, y + 1]], 'sun', .55);
    shape(h, r, [[x - 24, y - 12], [x - 5, y + 1], [x - 5, y + 20], [x - 24, y + 7]], 'coral', .48);
    shape(h, r, [[x - 5, y + 1], [x + 26, y - 9], [x + 26, y + 10], [x - 5, y + 20]], 'sun', .56);
    h.line(r, [[x - 14, y - 16], [x + 10, y - 4], [x + 10, y + 15]], 'paper', 2.5);
    h.line(r, [p.nearHand, [x - 21, y + 7]], 'coral', 2.5);
    h.line(r, [p.farHand, [x + 24, y + 9]], 'coral', 2.5);
  } }, .18, 1.38));
  H.at(2.47, 4.16, .2, HH => actor(HH, R, 2.47, 4.16, t, 'hongKongLammaWait', { shirt: ['teal', .58], hairStyle: 'pony', face: 'se', prop(h, r, p) {
    const [x, y] = p.nearHand;
    shape(h, r, [[x - 7, y - 11], [x + 5, y - 8], [x + 5, y + 6], [x - 7, y + 3]], 'blue', .75, .6);
    shape(h, r, [[x - 5, y - 8], [x + 3, y - 6], [x + 3, y + 2], [x - 5, y]], 'paper', .94, .35);
  } }, .2, 1.28));
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(5.2 + k * 2.12, .9, .06);
    stroke(H, R, [[x - 15, y], [x + Math.sin(u * TAU + k) * 3, y - 2], [x + 17, y]], 'paper', .9, .68);
  }
});

room.loopSeconds = 16;
export default room;
