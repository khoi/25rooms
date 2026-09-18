import { benchFrame, bentTube, branchSpray, caneChair, cushion, drape, floorLight, metal, pendant, surface, timber, vessel } from '../materials.js';
import { masonry, cabinetFrame, basin as washBasin, boardFloor } from '../structure.js';
import { windowBay } from '../joinery.js';
import { boundBook, foldedCloth, shallowTray, liddedTin, satchel, slattedCrate } from '../furnishings.js';
import { TAU, actor, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const breakfast = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, al: 30, el: 65, ar: 37, er: 64, head: 8 };
FIGURES.clips.newYorkHeightsToast = {
  dur: 14,
  keys: [
    [0, breakfast],
    [0.17, breakfast],
    [0.32, { ...breakfast, ar: 62, er: 99, head: -4 }],
    [0.44, { ...breakfast, ar: 62, er: 99, head: -17 }],
    [0.66, { ...breakfast, ar: 62, er: 99, head: -17 }],
    [0.83, breakfast],
    [1, breakfast]
  ]
};
const childSeat = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, head: -18, ar: 118, er: 13, al: 33, el: 44 };
FIGURES.clips.newYorkHeightsPoint = {
  dur: 14,
  keys: [
    [0, childSeat],
    [0.28, { ...childSeat, ar: 125, er: 8, head: -21 }],
    [0.56, { ...childSeat, ar: 125, er: 8, head: -21 }],
    [0.75, { ...childSeat, ar: 72, er: 46, head: 3 }],
    [0.89, { ...childSeat, ar: 72, er: 46, head: 3 }],
    [1, childSeat]
  ]
};

function cup(H, R, i, j, z, ink = 'coral', scale = 1) {
  const [x, y] = H.p(i, j, z);
  shape(
    H,
    R,
    [
      [x - 6 * scale, y],
      [x + 6 * scale, y],
      [x + 6 * scale, y - 12 * scale],
      [x - 6 * scale, y - 12 * scale]
    ],
    ink,
    0.63,
    0.7
  );
  oval(H, R, x, y - 12 * scale, 6 * scale, 2.5 * scale, 'paper', 1);
  stroke(
    H,
    R,
    [
      [x + 6 * scale, y - 10 * scale],
      [x + 12 * scale, y - 9 * scale],
      [x + 11 * scale, y - 2 * scale],
      [x + 6 * scale, y - 2 * scale]
    ],
    'blue',
    0.9
  );
}

const room = world(
  'new-york-washington-heights',
  'Washington Heights · Window Wide',
  { floor: 'paper', tone: 1, wall: false, head: 100 },
  (H, R) => {
    H.opacity(0.38, () => boardFloor(H, R, 0.05, 0.05, 11.9, 11.88, 0.025, 'sun', 0.7));
    H.tint(H.tile(0.06, 0.08, 11.85, 11.78, 0.031), 'blue', 0.11);
    H.tint([H.p(5.0, 0.91, 0.036), H.p(9.83, 0.91, 0.036), H.p(9.39, 8.25, 0.036), H.p(3.3, 8.25, 0.036)], 'sun', 0.24);
    for (const [i, j, w, d] of [[0.5, 0.5, 3.9, 2.1], [0.45, 3.1, 2.13, 2.67], [0.22, 6.68, 2.1, 4.43], [5.9, 4.4, 3.39, 3.1]]) H.tint(H.tile(i, j, w, d, 0.04), 'blue', 0.21);
    masonry(H, R, 'ne', 0.07, 11.85, 0, 4.18, 'paper', 1);
    masonry(H, R, 'nw', 0.07, 11.83, 0, 4.18, 'blue', 0.68);
    windowBay(H, R, 'ne', 4.85, 5.01, 1.37, 2.31, {
      ink: 'teal',
      divisions: 2,
      view: (P) => {
        for (let n = 0; n < 5; n++) {
          const u = 0.16 + n * 0.95;
          surface(H, R, [P(u, 0), P(u + 0.73, 0), P(u + 0.73, 0.71 + (n % 3) * 0.29), P(u, 0.71 + (n % 3) * 0.29)], 'coral', 0.25);
        }
        for (const v of [0.49, 1.35]) H.line(R, [P(0, v), P(5, v)], 'blue', 2);
        for (let n = 0; n < 15; n++) H.line(R, [P(n * 0.35, 0.49), P(n * 0.35, 1.34)], 'blue', 0.9);
      }
    });
    for (const i of [5.28, 9.58]) metal(H, R, i, 0.41, 0.16, 0.39, 0.04, 0.19, 'teal');
    for (let n = 0; n < 16; n++) {
      const i = 5.29 + n * 0.28;
      bentTube(
        H,
        R,
        [
          [i, 0.56, 0.26],
          [i, 0.56, 1.08],
          [i + 0.12, 0.77, 1.12],
          [i + 0.12, 0.77, 0.29]
        ],
        3.2,
        'paper'
      );
    }
    bentTube(
      H,
      R,
      [
        [5.23, 0.69, 0.27],
        [9.91, 0.69, 0.27],
        [9.91, 0.69, 0.06]
      ],
      2.2,
      'teal'
    );
    for (const z of [2.41, 3.43]) {
      timber(H, R, 0.27, 0.39, 3.84, 0.76, z, 0.1, 'sun');
      for (const i of [0.58, 3.62]) bentTube(H, R, [[i, 0.32, z - 0.38], [i, 1.01, z], [i, 0.32, z]], 1.7, 'paper');
    }
    for (let n = 0; n < 5; n++) {
      const [x, y] = H.p(0.75 + n * 0.46, 0.84, 2.53);
      oval(H, R, x, y - 8, 7, 10, 'paper', 1);
      oval(H, R, x, y - 8, 4, 7, 'sun', 0.3);
    }
    foldedCloth(H, R, 2.83, 0.51, 0.98, 0.48, 2.53, 'paper', 'coral');
    vessel(H, R, 0.85, 0.74, 3.56, 7, 14, 'coral');
    vessel(H, R, 1.57, 0.73, 3.56, 6, 19, 'teal');
    boundBook(H, R, 2.21, 0.55, 1.19, 0.49, 3.56, 'paper');
    cabinetFrame(H, R, 0.4, 0.41, 3.44, 1.69, 0.03, 1.28, 3, 'teal', (i, j, w, d, z, h, n) => {
      timber(H, R, i, j, w, d, z + 0.48, 0.08, 'sun');
      for (let k = 0; k < 2; k++) vessel(H, R, i + 0.22 + k * 0.42, j + 0.7, z + 0.63, 5, 13, n === 1 ? 'coral' : 'paper');
    });
    washBasin(H, R, 0.53, 0.55, 2.15, 1.22, 1.34, 'paper');
    vessel(H, R, 3.39, 1.5, 1.35, 6, 11, 'teal');
    cabinetFrame(H, R, 0.41, 3.02, 1.68, 2.55, 0.03, 1.28, 1, 'sun', (i, j, w, d, z, h) => {
      foldedCloth(H, R, i + 0.14, j + 0.2, w - 0.2, d - 0.34, z + 0.16, 'paper', 'teal');
    });
    metal(H, R, 0.42, 3.05, 1.69, 2.53, 1.31, 0.1, 'paper');
    surface(H, R, H.faceJ(2.13, 3.24, 2.15, 0.2, 1.06), 'blue', 0.75);
    surface(H, R, H.faceJ(2.15, 3.46, 1.73, 0.37, 0.87), 'coral', 0.26);
    bentTube(H, R, [[2.22, 3.48, 0.96], [2.22, 5.1, 0.96]], 2.5, 'paper');
    for (const j of [3.43, 4.19, 4.96]) H.dot(...H.p(2.23, j, 1.2), 3, 'teal');
    metal(H, R, 0.29, 3.09, 0.1, 2.54, 1.43, 0.34, 'paper');
    for (const j of [3.64, 4.66]) surface(H, R, ell(...H.p(1.24, j, 1.43), 12, 5), 'teal', 0.6);
    vessel(H, R, 1.24, 3.62, 1.46, 10, 17, 'coral');
    surface(H, R, H.faceJ(0.21, 7.14, 2.87, 3.38, 4.01), 'sun', 0.45);
    surface(H, R, H.faceJ(0.24, 7.26, 2.63, 3.48, 3.91), 'paper', 1);
    for (const [j, h, c] of [[7.67, 0.19, 'coral'], [8.34, 0.27, 'teal'], [9.1, 0.15, 'sun']]) {
      surface(H, R, H.faceJ(0.27, j, 0.39, 3.52, 3.52 + h), c, 0.65);
      oval(H, R, ...H.p(0.28, j + 0.2, 3.56 + h), 3, 3, c, 0.7);
    }
    cabinetFrame(H, R, 0.18, 6.66, 1.69, 4.23, 0.03, 1.57, 1, 'sun', (i, j, w, d, z) => {
      timber(H, R, i, j, w, d, z + 0.64, 0.07, 'sun');
      foldedCloth(H, R, i + 0.12, j + 0.2, w - 0.27, 1.12, z + 0.12, 'paper', 'teal');
      slattedCrate(H, R, i + 0.12, j + 1.65, w - 0.26, 1.11, z + 0.09, 0.43, 'teal');
      boundBook(H, R, i + 0.12, j + 0.3, w - 0.25, 0.86, z + 0.76, 'coral');
      boundBook(H, R, i + 0.19, j + 0.45, w - 0.35, 0.8, z + 0.88, 'paper');
      for (let n = 0; n < 3; n++) oval(H, R, ...H.p(i + 0.62, j + 2.7, z + 0.76 + n * 0.07), 13, 5, 'paper', 1);
    });
    liddedTin(H, R, 0.98, 7.33, 1.63, 12, 13, 'teal', true);
    for (const [j, c] of [[7.05, 'coral'], [7.35, 'sun'], [7.62, 'paper']]) {
      vessel(H, R, 0.96, j, 1.69, 3, 7, c);
      H.line(R, [H.p(0.96, j, 1.7), H.p(1.28, j + 0.2, 1.66)], c, 0.8);
    }
    boundBook(H, R, 0.4, 8.27, 1.14, 0.82, 1.63, 'coral');
    H.line(R, [H.p(0.95, 8.41, 1.72), H.p(1.3, 9.13, 1.69)], 'teal', 1.5);
    metal(H, R, 0.4, 9.55, 1.13, 0.76, 1.63, 0.44, 'paper');
    for (let n = 0; n < 6; n++) H.line(R, [H.p(0.59 + n * 0.1, 10.33, 1.73), H.p(0.59 + n * 0.1, 10.33, 1.98)], 'teal', 1.1);
    H.dot(...H.p(1.33, 10.34, 1.87), 3.2, 'coral');
    bentTube(H, R, [[1.29, 9.83, 2.08], [1.46, 9.83, 2.77]], 1, 'teal');
    for (const j of [7.12, 9.27]) {
      surface(H, R, H.faceJ(0.24, j, 1.25, 2.08, 3.12), 'sun', 0.61);
      surface(H, R, H.faceJ(0.27, j + 0.1, 1.05, 2.2, 3.0), 'paper', 1);
      for (const [k, z, c] of [[0.21, 2.33, 'teal'], [0.55, 2.47, 'coral'], [0.82, 2.3, 'sun']]) {
        surface(H, R, H.faceJ(0.29, j + k, 0.19, 2.24, z + 0.22), c, 0.65);
        oval(H, R, ...H.p(0.31, j + k + 0.1, z + 0.31), 3.5, 3.5, c, 0.72);
      }
    }
    bentTube(H, R, [[0.33, 3.1, 2.45], [0.33, 5.6, 2.45]], 2.3, 'sun');
    for (const j of [3.65, 4.71]) {
      const [x, y] = H.p(0.43, j, 1.98);
      oval(H, R, x, y, 11, 13, 'teal', 0.72);
      oval(H, R, x, y, 7, 9, 'blue', 0.46);
      H.line(R, [H.p(0.43, j, 2.3), H.p(0.43, j, 2.49)], 'paper', 2);
    }
    metal(H, R, 3.96, 0.34, 0.5, 0.18, 1.69, 0.54, 'paper');
    for (const z of [1.86, 2.05]) H.dot(...H.p(4.19, 0.54, z), 1.7, 'blue');
    bentTube(H, R, [[4.18, 0.54, 1.84], [4.3, 0.61, 1.36], [3.67, 1.1, 1.35]], 1, 'teal');
    cabinetFrame(H, R, 2.45, 2.34, 2.58, 1.53, 0.03, 1.2, 2, 'teal', (i, j, w, d, z, h, n) => {
      if (n) foldedCloth(H, R, i + 0.1, j + 0.11, w - 0.18, d - 0.2, z + 0.09, 'paper', 'coral');
      else {
        vessel(H, R, i + 0.44, j + 0.51, z + 0.08, 10, 18, 'sun');
        bentTube(H, R, [[i + 0.25, j + 0.55, z + 0.63], [i + 0.25, j + 0.55, z + 0.85], [i + 0.64, j + 0.55, z + 0.85], [i + 0.64, j + 0.55, z + 0.63]], 1.3, 'teal');
      }
    });
    timber(H, R, 2.61, 2.56, 1.28, 1.03, 1.22, 0.08, 'sun');
    const [breadX, breadY] = H.p(3.13, 2.93, 1.32);
    oval(H, R, breadX, breadY - 4, 16, 8, 'coral', 0.53);
    for (let n = 0; n < 3; n++) H.line(R, [[breadX - 9 + n * 7, breadY - 9], [breadX - 6 + n * 7, breadY - 2]], 'paper', 1.3);
    H.line(R, [H.p(3.2, 3.5, 1.32), H.p(3.82, 3.5, 1.32)], 'paper', 3);
    H.line(R, [H.p(2.96, 3.5, 1.33), H.p(3.2, 3.5, 1.33)], 'teal', 3.5);
    shallowTray(H, R, 4.12, 2.61, 0.64, 0.66, 1.24, 'paper');
    liddedTin(H, R, 4.42, 2.94, 1.4, 5, 12, 'coral');
    for (let n = 0; n < 5; n++) H.dot(...H.p(3.65 + (n % 3) * 0.12, 3.18 + Math.floor(n / 3) * 0.15, 1.32), 0.9, 'coral');
    drape(H, R, 3.95, 3.04, 0.54, 0.93, 1.23, 0.67, 'paper');
    metal(H, R, 10.12, 0.38, 1.41, 1.31, 0.07, 2.73, 'paper');
    for (const z of [0.21, 1.7]) H.outline(R, H.faceI(10.2, 1.71, 1.25, z, z + (z < 1 ? 1.4 : 0.98)), 'teal', 1);
    for (const z of [1.09, 2.09]) bentTube(H, R, [[10.32, 1.78, z], [10.32, 1.78, z + 0.38]], 2.5, 'teal');
    for (const [i, z, c] of [[10.56, 2.06, 'coral'], [10.88, 0.9, 'teal']]) {
      surface(H, R, H.faceI(i, 1.74, 0.43, z, z + 0.39), 'paper', 1);
      H.dot(...H.p(i + 0.2, 1.76, z + 0.36), 2.1, c);
      H.line(R, [H.p(i + 0.08, 1.76, z + 0.07), H.p(i + 0.32, 1.76, z + 0.25)], c, 1.8);
    }
    shallowTray(H, R, 10.23, 0.61, 1.13, 0.79, 2.82, 'sun');
    foldedCloth(H, R, 10.31, 0.74, 0.95, 0.51, 2.97, 'paper', 'coral');
    benchFrame(H, R, 5.95, 4.46, 2.8, 2.55, 1.07, 'sun');
    timber(H, R, 6.0, 4.64, 0.11, 2.12, 0.79, 0.11, 'sun');
    for (const j of [4.76, 6.63]) bentTube(H, R, [[6.14, j, 0.26], [7.1, j, 0.93], [7.45, j, 0.94]], 2.2, 'teal');
    for (const j of [4.83, 6.53]) metal(H, R, 6.49, j, 0.18, 0.18, 1.08, 0.026, 'blue');
    drape(H, R, 6.85, 4.51, 0.93, 2.48, 1.1, 0.39, 'paper');
    for (const [i, j] of [
      [6.42, 5.51],
      [8.13, 5.1]
    ]) {
      surface(H, R, ell(...H.p(i, j, 1.12), 12, 5), 'paper', 1);
      surface(H, R, ell(...H.p(i, j, 1.13), 9, 3.7), 'sun', 0.21);
      cup(H, R, i + 0.24, j + 0.73, 1.12, 'coral', 0.8);
    }
    shallowTray(H, R, 7.03, 4.65, 1.18, 0.86, 1.13, 'teal');
    vessel(H, R, 7.69, 4.83, 1.18, 7, 17, 'paper');
    boundBook(H, R, 6.5, 6.28, 1.13, 0.61, 1.14, 'teal');
    caneChair(H, R, 8.73, 5.06, 'sun');
    caneChair(H, R, 5.31, 5.75, 'coral', true);
    cushion(H, R, 5.3, 5.79, 0.87, 0.64, 0.69, 0.31, 'sun');
    timber(H, R, 8.66, 9.11, 2.71, 1.76, 0.15, 0.43, 'teal');
    cushion(H, R, 8.68, 9.1, 2.66, 1.7, 0.6, 0.18, 'coral');
    cushion(H, R, 8.72, 9.02, 2.58, 0.32, 0.78, 0.54, 'coral');
    for (const i of [8.78, 11.06]) timber(H, R, i, 9.22, 0.15, 1.45, 0.04, 0.74, 'sun');
    benchFrame(H, R, 5.59, 9.12, 2.04, 1.39, 0.72, 'sun');
    boundBook(H, R, 5.89, 9.29, 1.12, 0.89, 0.76, 'paper');
    cup(H, R, 7.12, 9.97, 0.77, 'teal', 0.7);
    pendant(H, R, 7.32, 5.61, 4.17, 2.88, 'sun', 1.05);
    vessel(H, R, 10.91, 1.56, 0.03, 12, 19, 'teal');
    branchSpray(H, R, ...H.p(10.91, 1.56, 0.6), 1.5, 'teal');
    shallowTray(H, R, 8.93, 9.48, 1.32, 0.94, 0.86, 'sun');
    for (const [i, j, c] of [[9.14, 9.76, 'coral'], [9.61, 9.74, 'sun'], [9.73, 10.06, 'coral']]) oval(H, R, ...H.p(i, j, 1.04), 6, 5, c, 0.6);
    H.dot(...H.p(9.17, 9.75, 1.1), 1.6, 'paper');
    foldedCloth(H, R, 10.39, 9.36, 0.61, 1.17, 0.85, 'paper', 'teal');
    for (const j of [7.06, 8.03]) {
      metal(H, R, 11.54, j, 0.12, 0.12, 0.05, 1.46, 'teal');
      bentTube(H, R, [[11.58, j, 1.47], [11.28, j, 1.47], [11.28, j, 1.29]], 2.2, 'sun');
    }
    surface(H, R, H.faceJ(11.32, 7.02, 0.89, 0.44, 1.19), 'coral', 0.63);
    H.line(R, [H.p(11.34, 7.14, 0.72), H.p(11.34, 7.77, 0.72)], 'paper', 1.1);
    slattedCrate(H, R, 2.79, 9.57, 1.49, 1.24, 0.05, 0.56, 'sun');
    foldedCloth(H, R, 2.91, 9.67, 1.16, 0.94, 0.47, 'paper', 'teal');
    surface(H, R, [H.p(3.54, 9.78, 0.69), H.p(4.03, 9.81, 0.69), H.p(4.11, 10.91, 0.18), H.p(3.69, 10.97, 0.2)], 'coral', 0.56);
    satchel(H, R, 4.74, 6.27, 0.045, 'teal', 0.62);
    H.line(R, [H.p(4.52, 6.09, 0.78), H.p(4.53, 6.06, 1.03)], 'sun', 2.2);
    shallowTray(H, R, 5.91, 9.29, 0.6, 0.37, 0.9, 'teal');
    for (const j of [9.4, 9.58]) H.outline(R, ell(...H.p(6.1, j, 1.0), 3.2, 1.8), 'blue', 1);
    H.line(R, [H.p(6.1, 9.41, 1.0), H.p(6.11, 9.61, 1.0)], 'blue', 0.8);
    floorLight(H, 7.44, 5.31, 86, 0.16);
  },
  (H, R, t) => {
    const u = cycle(t, 14);
    for (const [i, dir] of [
      [4.92, 1],
      [9.79, -1]
    ]) {
      const sway = Math.sin(u * TAU) * 0.07;
      shape(
        H,
        R,
        [H.p(i, 0.31, 3.71), H.p(i + dir * 0.54, 0.31, 3.71), H.p(i + dir * (0.38 + sway), 0.36, 1.7), H.p(i + dir * 0.04, 0.34, 1.7)],
        'paper',
        0.9,
        0.7
      );
      for (let k = 0; k < 3; k++)
        H.line(R, [H.p(i + dir * (0.12 + k * 0.13), 0.33, 3.64), H.p(i + dir * (0.07 + k * 0.12 + sway * 0.5), 0.38, 1.75)], 'coral', 0.7, {
          tone: 0.45
        });
    }
    H.at(9.04, 5.43, 0.08, (HH) =>
      actor(
        HH,
        R,
        9.04,
        5.43,
        u * 14,
        'newYorkHeightsToast',
        {
          face: 'sw',
          shirt: ['teal', 0.68],
          pants: ['blue', 0.74],
          hairStyle: 'short',
          skin: ['coral', 0.57],
          prop(h, r, p) {
            const [x, y] = p.nearHand;
            shape(
              h,
              r,
              [
                [x - 8, y + 4],
                [x - 9, y - 6],
                [x - 12, y - 11],
                [x - 8, y - 16],
                [x + 3, y - 16],
                [x + 7, y - 11],
                [x + 5, y - 5],
                [x + 5, y + 4]
              ],
              'coral',
              0.53,
              0.7
            );
            shape(
              h,
              r,
              [
                [x - 6, y + 2],
                [x - 6, y - 7],
                [x - 8, y - 11],
                [x - 6, y - 13],
                [x + 1, y - 13],
                [x + 4, y - 10],
                [x + 2, y - 5],
                [x + 2, y + 2]
              ],
              'sun',
              0.48,
              0.5
            );
            h.line(
              r,
              [
                [x - 4, y - 8],
                [x + 1, y - 5]
              ],
              'paper',
              1.9
            );
          }
        },
        0.08,
        1.4
      )
    );
    H.at(5.67, 6.12, 0.4, (HH) =>
      actor(
        HH,
        R,
        5.67,
        6.12,
        u * 14,
        'newYorkHeightsPoint',
        {
          face: 'se',
          shirt: ['coral', 0.68],
          pants: ['blue', 0.67],
          hairStyle: 'curly',
          skin: ['coral', 0.46]
        },
        0.4,
        1.33,
        'child'
      )
    );
  }
);

room.loopSeconds = 14;
room.stillTime = 6;
export default room;
