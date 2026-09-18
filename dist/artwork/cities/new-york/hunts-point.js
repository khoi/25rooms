import { benchFrame, bentTube, metal, pendant, spokedWheel, surface, vessel } from '../materials.js';
import { masonry } from '../structure.js';

import { boundBook, coiledLine } from '../furnishings.js';
import { TAU, actor, box, cycle, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const hold = { ...rest, head: 16, lean: -8, al: 56, ar: 58, el: 28, er: 29 };
FIGURES.clips.newYorkProduceInspect = {
  dur: 14,
  keys: [
    [0, hold],
    [0.16, hold],
    [0.32, { ...hold, lean: -3, al: 73, ar: 77, el: 55, er: 46, head: 8 }],
    [0.53, { ...hold, lean: -2, al: 70, ar: 81, el: 53, er: 42, head: 17 }],
    [0.72, hold],
    [0.88, hold],
    [1, hold]
  ]
};
FIGURES.clips.newYorkDispatchCheck = {
  dur: 14,
  keys: [
    [0, { ...rest, al: 52, el: 63, ar: 69, er: 38, head: 12 }],
    [0.28, { ...rest, al: 52, el: 63, ar: 72, er: 33, head: 14 }],
    [0.56, { ...rest, al: 52, el: 63, ar: 60, er: 48, head: -9 }],
    [0.82, { ...rest, al: 52, el: 63, ar: 60, er: 48, head: -9 }],
    [1, { ...rest, al: 52, el: 63, ar: 69, er: 38, head: 12 }]
  ]
};

function crate(H, R, i, j, z, kind = 'citrus', ink = 'sun') {
  box(H, R, i, j, 1.46, 1.06, z, 0.49, ink, 0.62);
  shape(H, R, H.tile(i + 0.08, j + 0.07, 1.3, 0.9, z + 0.5), 'blue', 0.38, 0.55);
  for (let q = 0; q < 5; q++) {
    shape(H, R, H.faceI(i + 0.12 + q * 0.25, j + 1.065, 0.15, z + 0.12, z + 0.32), 'blue', 0.63, 0.4);
    H.line(R, [H.p(i + 1.47, j + 0.1 + q * 0.18, z + 0.12), H.p(i + 1.47, j + 0.1 + q * 0.18, z + 0.34)], 'blue', 1.4);
  }
  for (let a = 0; a < 3; a++)
    for (let b = 0; b < 2; b++) {
      const [x, y] = H.p(i + 0.31 + a * 0.38, j + 0.27 + b * 0.43, z + 0.53);
      if (kind === 'cabbage') {
        oval(H, R, x, y - 2, 8, 6, 'teal', 0.8);
        stroke(
          H,
          R,
          [
            [x - 6, y - 2],
            [x, y - 5],
            [x + 5, y - 1],
            [x - 1, y + 3]
          ],
          'paper',
          0.8,
          0.68
        );
        H.line(
          R,
          [
            [x, y - 5],
            [x + 1, y + 3]
          ],
          'blue',
          0.7
        );
      } else if (kind === 'pear') {
        shape(
          H,
          R,
          [
            [x - 6, y + 2],
            [x - 7, y - 3],
            [x - 2, y - 8],
            [x + 1, y - 10],
            [x + 5, y - 5],
            [x + 7, y + 1],
            [x, y + 5]
          ],
          'sun',
          0.67,
          0.5
        );
        H.line(
          R,
          [
            [x + 1, y - 9],
            [x + 3, y - 13]
          ],
          'blue',
          0.8
        );
      } else {
        oval(H, R, x, y - 1, 6, 5.4, 'coral', 0.77);
        H.dot(x + 1, y - 4, 1.1, 'sun');
      }
    }
  for (const a of [i, i + 1.39]) box(H, R, a, j, 0.08, 1.06, z + 0.45, 0.13, ink, 0.75);
}

function pallet(H, R, i, j, w = 2.1, d = 2.6, z = 0) {
  for (const a of [i + 0.12, i + w - 0.24]) box(H, R, a, j, 0.18, d, z, 0.2, 'coral', 0.48);
  for (let b = 0.05; b < d; b += 0.36) box(H, R, i, j + b, w, 0.26, z + 0.2, 0.08, 'sun', 0.57);
  for (const a of [0.15, w - 0.15]) for (const b of [0.19, d - 0.17]) H.dot(...H.p(i + a, j + b, z + 0.29), 1.2, 'blue');
}

const room = world(
  'new-york-hunts-point',
  'Hunts Point · Before the Grocers',
  { floor: 'paper', tone: 1, wall: false, head: 100 },
  (H, R) => {
    for (let r = 0; r < 8; r++)
      for (let c = 0; c < 8; c++) surface(H, R, H.tile(c * 1.5, r * 1.5, 1.47, 1.47, 0.025), 'blue', (r + c) % 4 ? 0.11 : 0.19, 0.5);
    masonry(H, R, 'nw', 0.12, 11.73, 0, 4.0, 'paper', 1);
    masonry(H, R, 'ne', 0.12, 11.73, 0, 4.15, 'teal', 0.23);
    surface(H, R, H.faceI(4.16, 0.16, 5.35, 0.1, 3.8), 'blue', 0.8);
    for (let n = 0; n < 10; n++) metal(H, R, 4.26, 0.21, 5.15, 0.11, 2.98 + n * 0.071, 0.04, 'paper');
    for (const i of [4.04, 9.5]) metal(H, R, i, 0.16, 0.2, 0.45, 0.03, 4.04, 'sun');
    surface(H, R, H.faceI(4.34, 0.29, 4.97, 0.19, 2.91), 'teal', 0.3);
    metal(H, R, 4.13, 0.12, 5.57, 1.52, 3.91, 0.16, 'teal');
    for (const i of [4.3, 9.2]) {
      metal(H, R, i, 1.52, 0.15, 0.15, 0.05, 1.17, 'sun');
      for (const z of [0.21, 0.67]) metal(H, R, i, 1.52, 0.16, 0.16, z, 0.18, 'blue');
    }
    for (const i of [0.53, 3.24]) for (const j of [0.57, 3.24, 5.92]) metal(H, R, i, j, 0.1, 0.1, 0.03, 3.61, 'teal');
    for (const [row, z] of [0.18, 1.47, 2.76].entries()) {
      for (const i of [0.53, 3.24]) metal(H, R, i, 0.57, 0.1, 5.44, z, 0.1, 'teal');
      for (let n = 0; n < 4; n++) metal(H, R, 0.53, 0.57 + n * 1.78, 2.81, 0.1, z, 0.1, 'teal');
      for (let n = 0; n < 3; n++) crate(H, R, 0.73, 0.8 + n * 1.62, z + 0.12, row === 1 ? 'greens' : 'citrus', row === 2 ? 'coral' : 'sun');
    }
    for (const [i, j, z] of [
      [0.68, 7.0, 0.19],
      [0.68, 8.57, 0.19],
      [2.85, 9.57, 0.19],
      [9.05, 1.69, 0.18],
      [9.12, 3.24, 0.18]
    ]) {
      pallet(H, R, i - 0.06, j - 0.07, 1.88, 1.51);
      crate(H, R, i, j, z, 'citrus', 'sun');
      crate(H, R, i + 0.03, j + 0.02, z + 0.61, 'greens', 'teal');
    }
    for (const i of [5.46, 9.91]) for (const j of [6.9, 8.56]) metal(H, R, i, j, 0.15, 0.15, 0.02, 0.89, 'teal');
    for (const j of [6.82, 8.58]) metal(H, R, 5.34, j, 4.88, 0.12, 0.85, 0.22, 'teal');
    for (let n = 0; n < 22; n++) {
      const i = 5.47 + n * 0.217;
      bentTube(
        H,
        R,
        [
          [i, 6.91, 0.97],
          [i, 8.61, 0.97]
        ],
        4.5,
        'paper'
      );
      H.line(R, [H.p(i, 6.92, 1.01), H.p(i, 8.59, 1.01)], 'teal', 0.8);
    }
    crate(H, R, 5.62, 6.99, 1.03, 'citrus', 'sun');
    benchFrame(H, R, 3.52, 1.58, 1.48, 1.63, 1.17, 'sun');
    boundBook(H, R, 3.7, 1.8, 1.09, 0.88, 1.2, 'paper');
    vessel(H, R, 4.61, 2.92, 1.19, 4, 9, 'teal');
    metal(H, R, 8.42, 9.36, 2.29, 1.91, 0.08, 0.1, 'sun');
    for (const j of [9.59, 10.75]) metal(H, R, 8.56, j, 2.61, 0.24, 0.08, 0.11, 'sun');
    bentTube(
      H,
      R,
      [
        [10.91, 9.38, 0.13],
        [10.91, 9.38, 1.56],
        [10.91, 10.97, 1.56],
        [10.91, 10.97, 0.13]
      ],
      3,
      'teal'
    );
    for (const j of [9.61, 10.78]) spokedWheel(H, R, ...H.p(10.94, j, 0.22), 5, 'blue');
    for (let n = 0; n < 11; n++) H.line(R, [H.p(4.26 + n * 0.39, 10.98, 0.03), H.p(4.47 + n * 0.39, 11.5, 0.03)], 'sun', 2.3);
    pendant(H, R, 6.5, 4.46, 3.92, 3.17, 'paper', 1);
    coiledLine(H, R, 10.95, 5.41, 0.03, 12, 'teal');
  },
  (H, R, t) => {
    const u = cycle(t, 14);
    H.at(8.35, 6.18, 0, (HH) =>
      actor(
        HH,
        R,
        8.35,
        6.18,
        u * 14,
        'newYorkProduceInspect',
        {
          face: 'sw',
          shirt: ['blue', 0.66],
          vest: ['sun', 0.8],
          pants: ['teal', 0.75],
          hairStyle: 'cap',
          skin: ['coral', 0.56],
          prop(h, r, points) {
            const x = (points.nearHand[0] + points.farHand[0]) / 2,
              y = (points.nearHand[1] + points.farHand[1]) / 2;
            const tilt = Math.sin(Math.PI * Math.max(0, Math.min(1, (u - 0.16) / 0.56))) * 5;
            shape(
              h,
              r,
              [
                [x - 27, y - 7],
                [x + 20, y - 1 - tilt],
                [x + 26, y + 8 - tilt],
                [x - 22, y + 15]
              ],
              'sun',
              0.74,
              0.8
            );
            shape(
              h,
              r,
              [
                [x - 27, y - 7],
                [x - 18, y - 17],
                [x + 28, y - 11 - tilt],
                [x + 20, y - 1 - tilt]
              ],
              'paper',
              1,
              0.7
            );
            for (let q = 0; q < 6; q++)
              oval(h, r, x - 14 + (q % 3) * 13, y - 13 + Math.floor(q / 3) * 5 - (tilt * q) / 7, 5, 4, q % 2 ? 'coral' : 'sun', 0.77);
            for (let q = 0; q < 5; q++)
              h.line(
                r,
                [
                  [x - 19 + q * 8, y + 2 - q * 0.12 * tilt],
                  [x - 18 + q * 8, y + 9 - q * 0.12 * tilt]
                ],
                'blue',
                1.6
              );
            h.line(
              r,
              [
                [x - 27, y - 7],
                [x + 20, y - 1 - tilt]
              ],
              'coral',
              2
            );
          }
        },
        0,
        1.4
      )
    );
    H.at(4.5, 3.38, 0, (HH) =>
      actor(
        HH,
        R,
        4.5,
        3.38,
        u * 14,
        'newYorkDispatchCheck',
        {
          shirt: ['paper', 1],
          vest: ['teal', 0.65],
          hairStyle: 'bun',
          glasses: true,
          prop(h, r, p) {
            const [x, y] = p.farHand;
            shape(
              h,
              r,
              [
                [x - 12, y - 4],
                [x + 13, y + 2],
                [x + 11, y + 21],
                [x - 14, y + 15]
              ],
              'sun',
              0.61,
              0.7
            );
            shape(
              h,
              r,
              [
                [x - 9, y - 1],
                [x + 10, y + 4],
                [x + 8, y + 18],
                [x - 11, y + 13]
              ],
              'paper',
              1,
              0.5
            );
            for (let q = 0; q < 3; q++)
              h.line(
                r,
                [
                  [x - 7, y + 3 + q * 3],
                  [x + 5, y + 6 + q * 3]
                ],
                'teal',
                0.7
              );
            const [px, py] = p.nearHand;
            h.line(
              r,
              [
                [px - 5, py + 5],
                [px + 5, py - 7]
              ],
              'coral',
              1.6
            );
          }
        },
        0,
        1.3
      )
    );
    const glow = 0.17 + 0.03 * Math.sin(u * TAU);
    HHGlow(H, 6.4, 0.12, 2.5, glow);
  }
);

function HHGlow(H, i, j, z, tone) {
  const [x, y] = H.p(i, j, z);
  H.glow(x, y, 23, 13, 'teal', tone);
}

room.loopSeconds = 14;
room.stillTime = 0;
export default room;
