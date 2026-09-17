import { surface, timber, metal, vessel, bentTube, spokedWheel, slattedSeat, cushion } from '../materials.js';
import { masonry, archedBay, cabinetFrame, boardFloor } from '../structure.js';
import { cityView } from '../joinery.js';
import { coiledLine } from '../furnishings.js';
import { TAU, actor, cycle, ell, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const driver = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, al: 49, el: 31, ar: 57, er: 30, head: -20 };
FIGURES.clips.hongKongTramCheck = {
  dur: 20,
  keys: [
    [0, driver],
    [0.17, driver],
    [0.31, { ...driver, head: 20, lean: -7 }],
    [0.48, { ...driver, head: 20, lean: -7 }],
    [0.62, { ...driver, head: 4, ar: 79, er: 10, lean: -11 }],
    [0.75, { ...driver, head: 4, ar: 79, er: 10, lean: -11 }],
    [0.9, driver],
    [1, driver]
  ]
};
const passenger = { ...rest, al: 52, el: 62, ar: 62, er: 42, head: 12 };
FIGURES.clips.hongKongTramBag = {
  dur: 20,
  keys: [
    [0, passenger],
    [0.33, passenger],
    [0.45, { ...passenger, ar: 70, er: 49, lean: -7 }],
    [0.58, { ...passenger, ar: 58, er: 70 }],
    [0.7, passenger],
    [1, passenger]
  ]
};

function tramSeat(H, R, i, j, w, z = 0.73) {
  slattedSeat(H, R, i, j, w, z - 0.18, 'sun', 0.63);
  for (const x of [i + 0.13, i + w - 0.15]) {
    metal(H, R, x, j + 0.14, 0.13, 0.18, z + 0.2, 0.75, 'teal');
    for (const h of [0.3, 0.7]) H.dot(...H.p(x + 0.07, j + 0.33, z + h), 1.2, 'sun');
  }
}

function body(H, R) {
  for (const i of [3.04, 8.34])
    for (const j of [4.24, 7.42]) {
      const [x, y] = H.p(i, j, 0.28);
      spokedWheel(H, R, x, y, 16, 'teal', 0.1, 0.78);
      metal(H, R, i - 0.42, j - 0.19, 0.84, 0.38, 0.36, 0.19, 'blue');
    }
  metal(H, R, 1.2, 3.83, 9.73, 4.16, 0.48, 0.23, 'teal');
  boardFloor(H, R, 1.34, 3.95, 9.44, 3.91, 0.74, 'sun', 0.33);
  for (const z of [0.78, 2.89]) {
    surface(H, R, H.faceI(1.3, 3.87, 9.5, z, z + 2.1), 'teal', 0.42);
    for (let n = 0; n < 5; n++) {
      const i = 1.54 + n * 1.84;
      surface(H, R, H.faceI(i, 3.94, 1.58, z + 0.56, z + 1.81), 'blue', 0.23);
      for (const x of [i, i + 0.78, i + 1.58]) metal(H, R, x, 3.92, 0.064, 0.095, z + 0.5, 1.42, 'paper');
      for (const h of [z + 0.55, z + 1.17, z + 1.84]) metal(H, R, i, 3.92, 1.64, 0.09, h, 0.065, 'paper');
      H.line(R, [H.p(i + 0.21, 4.04, z + 0.7), H.p(i + 0.62, 4.04, z + 1.55)], 'paper', 1.1);
      timber(H, R, i - 0.06, 3.95, 1.74, 0.22, z + 0.43, 0.1, 'sun');
      for (const x of [i + 0.1, i + 1.4]) H.dot(...H.p(x, 4.18, z + 0.48), 1.1, 'blue');
    }
  }
  for (const j of [3.9, 7.7]) {
    metal(H, R, 1.2, j, 0.15, 0.16, 0.74, 4.48, 'teal');
    metal(H, R, 10.68, j, 0.15, 0.16, 0.74, 2.78, 'teal');
  }
  timber(H, R, 1.25, 3.94, 6.2, 3.72, 2.69, 0.18, 'sun');
  boardFloor(H, R, 1.31, 4, 6.05, 3.61, 2.89, 'sun', 0.34);
  for (const j of [4.12, 7.56])
    for (const i of [1.59, 4.44, 7.26]) {
      bentTube(
        H,
        R,
        [
          [i, j, 2.91],
          [i, j, 3.58]
        ],
        2,
        'teal'
      );
      if (i < 7)
        bentTube(
          H,
          R,
          [
            [i, j, 3.59],
            [Math.min(i + 2.8, 7.35), j, 3.59]
          ],
          2,
          'sun'
        );
    }
  tramSeat(H, R, 2.04, 4.23, 4.57, 2.9);
  tramSeat(H, R, 3.54, 4.23, 3.34, 0.74);
  for (let n = 0; n < 7; n++) {
    const i = 1.53 + n * 0.31,
      h = 0.28 + n * 0.285;
    timber(H, R, i, 5.63, 0.34, 1.33, 0.74, h, 'sun');
    metal(H, R, i, 6.93, 0.32, 0.04, 0.74 + h - 0.05, 0.05, 'teal');
  }
  bentTube(
    H,
    R,
    [
      [1.62, 7.08, 1.42],
      [3.47, 7.08, 3.14],
      [3.69, 6.63, 3.39]
    ],
    2.4,
    'sun'
  );
  for (const [i, j] of [
    [3.69, 7.6],
    [7.64, 5.31],
    [10.59, 4.23]
  ])
    bentTube(
      H,
      R,
      [
        [i, j, 0.76],
        [i, j, 2.6]
      ],
      2.5,
      'sun'
    );
  cabinetFrame(H, R, 9.49, 5.78, 1.14, 1.6, 0.74, 0.91, 1, 'teal', (i, j, w, d, z) => {
    metal(H, R, i, j, w, d, z + 0.1, 0.17, 'blue');
    bentTube(
      H,
      R,
      [
        [i + 0.15, j + 0.3, z + 0.27],
        [i + 0.15, j + 0.3, z + 0.58]
      ],
      2,
      'coral'
    );
  });
  surface(H, R, [H.p(9.48, 5.78, 1.99), H.p(10.66, 5.78, 1.99), H.p(10.66, 7.4, 1.64), H.p(9.48, 7.4, 1.64)], 'teal', 0.62);
  for (let n = 0; n < 3; n++) {
    const [x, y] = H.p(9.75 + n * 0.3, 6.11, 1.94);
    surface(H, R, ell(x, y, 6, 4.6), 'paper', 1);
    H.line(
      R,
      [
        [x, y],
        [x - 3, y - 2]
      ],
      'blue',
      0.75
    );
  }
  bentTube(
    H,
    R,
    [
      [10.01, 6.79, 1.77],
      [10.07, 6.72, 2.19]
    ],
    3,
    'teal'
  );
  H.dot(...H.p(10.07, 6.72, 2.2), 4, 'coral');
  cushion(H, R, 8.45, 6.41, 0.85, 0.84, 1.2, 0.17, 'coral');
  for (const i of [8.54, 9.12]) metal(H, R, i, 6.54, 0.12, 0.56, 0.74, 0.46, 'blue');
  surface(H, R, H.faceI(8.45, 7.18, 0.86, 1.32, 2.04), 'coral', 0.59);
  metal(H, R, 7.3, 6.71, 0.43, 0.7, 0.74, 0.78, 'teal');
  surface(H, R, H.faceI(7.35, 7.43, 0.32, 1.07, 1.36), 'paper', 1);
  for (const j of [4.12, 5.91, 7.77]) metal(H, R, 10.78, j, 0.12, 0.12, 1.07, 2.28, 'teal');
  for (const z of [1.05, 1.73, 3.33]) metal(H, R, 10.76, 4.03, 0.15, 3.9, z, 0.1, 'teal');
  H.tint(H.faceJ(10.79, 4.12, 3.61, 1.87, 3.25), 'teal', 0.1);
  H.outline(R, H.faceJ(10.79, 4.12, 3.61, 1.87, 3.25), 'teal', 0.8);
  const [x, y] = H.p(10.46, 4.31, 2.74);
  surface(H, R, ell(x, y, 12, 17), 'blue', 0.72);
  surface(H, R, ell(x, y, 9, 14), 'paper', 1);
  bentTube(
    H,
    R,
    [
      [10.48, 4.08, 2.74],
      [10.48, 4.31, 2.74]
    ],
    2,
    'teal'
  );
  metal(H, R, 1.15, 3.82, 9.75, 0.28, 5.02, 0.18, 'paper');
  for (let n = 0; n < 6; n++)
    bentTube(
      H,
      R,
      [
        [1.52 + n * 1.61, 3.98, 5.12],
        [1.52 + n * 1.61, 4.61, 5.29],
        [1.52 + n * 1.61, 5.32, 5.12]
      ],
      1.7,
      'teal'
    );
}

const room = world(
  'hong-kong-kennedy-town-tram',
  'Kennedy Town · Bell before departure',
  { floor: 'paper', tone: 0.8, wall: false, head: 80 },
  (H, R) => {
    surface(H, R, H.tile(0.02, 0.04, 11.96, 11.91, 0.015), 'paper', 1);
    for (const j of [4.72, 7.12]) {
      metal(H, R, 0.32, j, 11.36, 0.15, 0.02, 0.085, 'teal');
      for (let n = 0; n < 23; n++) H.line(R, [H.p(0.42 + n * 0.5, j - 0.08, 0.02), H.p(0.42 + n * 0.5, j + 0.22, 0.02)], 'blue', 0.55);
    }
    masonry(H, R, 'ne', 0.1, 11.8, 0.02, 3.42, 'paper');
    archedBay(H, R, 'ne', 0.66, 3.4, 0.82, 2.2, 'teal', (P) => cityView(H, R, P, 3.4, 2.2));
    archedBay(H, R, 'ne', 4.66, 3.4, 0.82, 2.2, 'teal', (P) => cityView(H, R, P, 3.4, 2.2));
    for (const i of [8.7, 11.35]) metal(H, R, i, 0.7, 0.14, 0.18, 0.03, 3.7, 'teal');
    for (let n = 0; n < 8; n++)
      surface(
        H,
        R,
        [H.p(8.58 + n * 0.37, 0.57, 3.8), H.p(8.95 + n * 0.37, 0.57, 3.8), H.p(8.95 + n * 0.37, 2.5, 3.45), H.p(8.58 + n * 0.37, 2.5, 3.45)],
        n % 2 ? 'paper' : 'coral',
        0.58,
        0.4
      );
    slattedSeat(H, R, 8.97, 1.12, 2.11, 0.03, 'sun', 0.64);
    metal(H, R, 0.72, 9.85, 1.67, 1.09, 0.02, 0.16, 'teal');
    for (let n = 0; n < 5; n++) H.line(R, [H.p(0.86 + n * 0.31, 9.96, 0.19), H.p(0.86 + n * 0.31, 10.76, 0.19)], 'paper', 1.6);
    coiledLine(H, R, 10.46, 10.35, 0.04, 17, 'coral');
    vessel(H, R, 9.17, 9.74, 0.04, 10, 18, 'teal');
    body(H, R);
  },
  (H, R, t) => {
    const u = cycle(t, 20);
    H.at(8.91, 6.86, 0.73, (HH) =>
      actor(HH, R, 8.91, 6.86, u * 20, 'hongKongTramCheck', { shirt: ['paper', 1], pants: ['blue', 0.76], hairStyle: 'short' }, 0.73, 1.27)
    );
    H.at(4.62, 6.44, 0.74, (HH) =>
      actor(
        HH,
        R,
        4.62,
        6.44,
        u * 20,
        'hongKongTramBag',
        {
          shirt: ['coral', 0.72],
          pants: ['blue', 0.7],
          hairStyle: 'pony',
          prop: (h, r, p) => {
            const [x, y] = p.nearHand;
            stroke(
              h,
              r,
              [
                [x - 6, y + 15],
                [x - 5, y],
                [x + 7, y + 1],
                [x + 9, y + 16]
              ],
              'coral',
              2
            );
            shape(
              h,
              r,
              [
                [x - 10, y + 12],
                [x + 13, y + 12],
                [x + 11, y + 33],
                [x - 9, y + 32]
              ],
              'teal',
              0.74
            );
            h.line(
              r,
              [
                [x - 5, y + 25],
                [x + 8, y + 25]
              ],
              'paper',
              1.2
            );
          }
        },
        0.74,
        1.23
      )
    );
    H.at(3.31, 4.69, 2.89, (HH) =>
      actor(
        HH,
        R,
        3.31,
        4.69,
        u * 4,
        'read',
        {
          shirt: ['sun', 0.67],
          hairStyle: 'short',
          prop: (h, r, p) => {
            const [x, y] = p.nearHand;
            shape(
              h,
              r,
              [
                [x - 12, y - 10],
                [x, y - 5],
                [x + 12, y - 11],
                [x + 12, y + 6],
                [x, y + 10],
                [x - 12, y + 6]
              ],
              'paper',
              1
            );
            h.line(
              r,
              [
                [x, y - 4],
                [x, y + 9]
              ],
              'teal',
              0.8
            );
          }
        },
        2.89,
        1.15
      )
    );
    const [x, y] = H.p(10.47, 4.31, 2.74);
    H.opacity(0.3 + 0.25 * Math.sin(u * TAU) ** 2, () =>
      H.line(
        R,
        [
          [x - 5, y + 6],
          [x + 4, y - 7]
        ],
        'paper',
        2
      )
    );
  }
);
room.loopSeconds = 20;
export default room;
