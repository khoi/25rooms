import { benchFrame, bentTube, branchSpray, caneChair, cushion, drape, floorLight, metal, pendant, surface, timber, vessel } from '../materials.js';
import { masonry, cabinetFrame, basin as washBasin, boardFloor } from '../structure.js';
import { windowBay } from '../joinery.js';
import { boundBook, foldedCloth, shallowTray } from '../furnishings.js';
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
    boardFloor(H, R, 0.05, 0.05, 11.9, 11.88, 0.025, 'sun', 0.42);
    masonry(H, R, 'ne', 0.07, 11.85, 0, 4.18, 'paper', 1);
    masonry(H, R, 'nw', 0.07, 11.83, 0, 4.18, 'coral', 0.16);
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
    for (const j of [3.64, 4.66]) surface(H, R, ell(...H.p(1.24, j, 1.43), 12, 5), 'teal', 0.6);
    vessel(H, R, 1.24, 3.62, 1.46, 10, 17, 'coral');
    cabinetFrame(H, R, 0.18, 6.66, 1.69, 4.23, 0.03, 3.25, 1, 'sun', (i, j, w, d, z, h) => {
      for (let row = 0; row < 4; row++) {
        timber(H, R, i, j, w, d, z + row * 0.74, 0.08, 'sun');
        for (let n = 0; n < 5; n++)
          boundBook(H, R, i + 0.1, j + 0.1 + n * 0.77, w - 0.2, 0.64, z + 0.12 + row * 0.74, ['teal', 'paper', 'coral'][(row + n) % 3]);
      }
    });
    benchFrame(H, R, 5.95, 4.46, 2.8, 2.55, 1.07, 'sun');
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
export default room;
