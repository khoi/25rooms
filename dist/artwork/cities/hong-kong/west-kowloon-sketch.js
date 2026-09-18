import { surface, timber, metal, vessel, bentTube, slattedSeat, branchSpray } from '../materials.js';

import { shallowTray, coiledLine, handTool, boundBook, slattedCrate } from '../furnishings.js';
import { TAU, actor, cycle, shape, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -7, head: 12, al: 54, ar: 70, el: 42, er: 27 };
FIGURES.clips.hongKongSketchCloud = {
  dur: 16,
  keys: [
    [0, seated],
    [0.12, seated],
    [0.27, { ...seated, ar: 77, er: 18 }],
    [0.34, { ...seated, ar: 70, er: 27 }],
    [0.43, { ...seated, ar: 78, er: 17 }],
    [0.52, { ...seated, ar: 35, er: 105, head: -20 }],
    [0.72, { ...seated, ar: 35, er: 105, head: -20 }],
    [0.86, seated],
    [1, seated]
  ]
};

function cloud(H, R, x, y, scale = 1) {
  shape(
    H,
    R,
    [
      [x - 22 * scale, y + 4 * scale],
      [x - 19 * scale, y - 5 * scale],
      [x - 10 * scale, y - 6 * scale],
      [x - 5 * scale, y - 15 * scale],
      [x + 9 * scale, y - 14 * scale],
      [x + 14 * scale, y - 6 * scale],
      [x + 24 * scale, y - 4 * scale],
      [x + 27 * scale, y + 5 * scale]
    ],
    'paper',
    1,
    0.7
  );
}

function foldingChair(H, R, i, j, ink) {
  for (const x of [i, i + 0.82]) {
    H.line(R, [H.p(x, j, 0), H.p(x, j + 0.9, 0.8)], 'blue', 1.8);
    H.line(R, [H.p(x, j + 0.95, 0), H.p(x, j, 0.8)], 'blue', 1.8);
  }
  shape(H, R, H.tile(i, j + 0.15, 0.82, 0.62, 0.65), ink, 0.65);
  shape(H, R, H.faceI(i, j + 0.08, 0.82, 0.7, 1.35), ink, 0.65);
  for (const x of [i, i + 0.82]) {
    bentTube(
      H,
      R,
      [
        [x, j + 0.9, 0.65],
        [x, j + 0.92, 0.95],
        [x, j + 0.02, 1.03]
      ],
      1.6,
      'sun'
    );
    metal(H, R, x - 0.03, j + 0.44, 0.065, 0.08, 0.33, 0.09, 'teal');
  }
  for (let n = 0; n < 5; n++) H.line(R, [H.p(i + 0.08 + n * 0.16, j + 0.08, 0.77), H.p(i + 0.08 + n * 0.16, j + 0.1, 1.28)], 'sun', 0.6);
}

const room = world(
  'hong-kong-west-kowloon-sketch',
  'West Kowloon · Hold that cloud',
  { floor: 'paper', tone: 1, wall: false, head: 65 },
  (H, R) => {
    surface(H, R, H.faceI(0.1, 0.15, 11.8, 0.4, 3.45), 'sun', 0.12);
    const hill = [
      H.p(0.1, 0.18, 0.5),
      H.p(0.1, 0.18, 1.37),
      H.p(2.7, 0.18, 2.13),
      H.p(4.51, 0.18, 1.7),
      H.p(6.34, 0.18, 1.94),
      H.p(9.04, 0.18, 1.4),
      H.p(11.9, 0.18, 1.61),
      H.p(11.9, 0.18, 0.5)
    ];
    surface(H, R, hill, 'teal', 0.23);
    surface(H, R, H.faceI(0.1, 0.2, 11.8, 0.4, 1.14), 'teal', 0.43);
    for (let n = 0; n < 26; n++) {
      const i = 0.21 + n * 0.43;
      surface(H, R, H.faceI(i, 0.21, 0.29, 1.12, 1.28 + (n % 5) * 0.095), n % 3 ? 'blue' : 'teal', 0.39, 0.3);
    }
    for (let n = 0; n < 12; n++) H.line(R, [H.p(0.4 + n * 0.91, 0.23, 0.79), H.p(0.95 + n * 0.91, 0.23, 0.79)], 'paper', 1);
    timber(H, R, 0.06, 0.35, 11.89, 0.67, 0, 0.51, 'paper');
    for (const i of [0.26, 3.04, 5.82, 8.6, 11.38]) metal(H, R, i, 0.93, 0.07, 0.07, 0.5, 0.79, 'teal');
    for (const z of [0.74, 1.28])
      bentTube(
        H,
        R,
        [
          [0.27, 0.96, z],
          [11.46, 0.96, z]
        ],
        2.1,
        'teal'
      );
    for (let n = 0; n < 11; n++) surface(H, R, H.tile(0.14, 1.25 + n * 0.94, 11.64, 0.88, 0.025), 'sun', n % 3 ? 0.06 : 0.14, 0.4);
    surface(H, R, H.tile(0.24, 1.36, 1.84, 9.86, 0.04), 'teal', 0.3);
    for (let n = 0; n < 8; n++) {
      const j = 1.78 + n * 1.19;
      branchSpray(H, R, ...H.p(0.95, j, 0.12), 0.48 + (n % 3) * 0.12, 'teal', n % 2 ? 1 : -1);
    }
    for (const [i, j] of [
      [2.39, 2.39],
      [2.39, 8.83],
      [7.35, 2.39]
    ]) {
      metal(H, R, i, j, 0.17, 0.17, 0.02, 3.78, 'teal');
      metal(H, R, i - 0.12, j - 0.12, 0.41, 0.41, 0.02, 0.12, 'blue');
    }
    surface(H, R, [H.p(2.32, 2.3, 3.77), H.p(7.55, 2.3, 3.77), H.p(6.29, 6.3, 3.25), H.p(2.32, 8.98, 3.77)], 'paper', 1, 1.5);
    H.line(R, [H.p(7.54, 2.31, 3.78), H.p(6.29, 6.3, 3.27), H.p(2.33, 8.97, 3.78)], 'sun', 2);
    for (let n = 0; n < 7; n++)
      H.line(R, [H.p(2.44 + n * 0.65, 2.34, 3.76), H.p(2.44 + n * 0.52, 8.5 - n * 0.53, 3.71 - n * 0.07)], 'teal', 0.65, { tone: 0.5 });
    H.tint([H.p(3.04, 3.24, 0.03), H.p(8.26, 3.24, 0.03), H.p(7, 7.24, 0.03), H.p(3.04, 9.92, 0.03)], 'teal', 0.1);
    slattedSeat(H, R, 8.18, 1.73, 3.17, 0.03, 'sun', 0.58);
    foldingChair(H, R, 4.79, 6.38, 'coral');
    for (const i of [3.37, 5.08])
      bentTube(
        H,
        R,
        [
          [i, 5.22, 0.03],
          [i, 6.39, 1.04],
          [i, 6.85, 0.04]
        ],
        2.4,
        'teal'
      );
    timber(H, R, 3.22, 5.41, 2.31, 1.2, 0.93, 0.15, 'sun');
    surface(H, R, [H.p(3.32, 5.49, 1.48), H.p(5.42, 5.49, 1.48), H.p(5.42, 6.48, 1.09), H.p(3.32, 6.48, 1.09)], 'sun', 0.43);
    surface(H, R, [H.p(3.47, 5.61, 1.44), H.p(5.21, 5.61, 1.44), H.p(5.21, 6.34, 1.15), H.p(3.47, 6.34, 1.15)], 'paper', 1);
    const [sx, sy] = H.p(4.28, 6.06, 1.27);
    cloud(H, R, sx, sy, 0.4);
    H.line(
      R,
      [
        [sx - 19, sy + 7],
        [sx - 5, sy + 3],
        [sx + 16, sy + 10]
      ],
      'teal',
      0.9
    );
    shallowTray(H, R, 3.41, 6.56, 1.24, 0.41, 1.06, 'sun');
    for (let n = 0; n < 5; n++) vessel(H, R, 3.55 + n * 0.21, 6.76, 1.08, 2.9, 2, ['teal', 'coral', 'sun'][n % 3]);
    vessel(H, R, 5.27, 5.49, 1.1, 5, 10, 'paper');
    handTool(H, R, 5.58, 6.51, 1.08, 'brush', 'coral');
    slattedCrate(H, R, 3.01, 8.15, 1.49, 1.02, 0.03, 0.53, 'sun');
    boundBook(H, R, 3.17, 8.26, 1.18, 0.84, 0.58, 'coral');
    coiledLine(H, R, 3.35, 9.45, 0.03, 9, 'teal');
    for (const i of [8.38, 9.22, 10.06]) {
      timber(H, R, i, 6.08, 0.16, 0.16, 0.02, 1.38, 'sun');
      H.line(R, [H.p(i, 6.08, 1.39), H.p(i, 6.74, 0.06)], 'teal', 1.2);
    }
    H.line(R, [H.p(8.38, 6.08, 1.4), H.p(10.06, 6.08, 1.4)], 'teal', 1);
    for (let n = 0; n < 3; n++) surface(H, R, H.faceI(8.43 + n * 0.53, 6.12, 0.43, 0.82, 1.33), 'paper', 1, 0.5);
    vessel(H, R, 10.73, 8.42, 0.04, 11, 24, 'teal');
    for (let n = 0; n < 5; n++)
      bentTube(
        H,
        R,
        [
          [10.73, 8.42, 0.34],
          [10.49 + n * 0.13, 8.42, 1.56 + (n % 2) * 0.18]
        ],
        1.3,
        'sun'
      );
  },
  (H, R, t) => {
    const u = cycle(t, 16);
    H.clip(H.faceI(0.1, 0.15, 11.8, 1.85, 3.45), () => {
      const [x, y] = H.p(8.6 + Math.sin(u * TAU) * 0.3, 0.1, 2.79);
      cloud(H, R, x, y, 1.27);
    });
    actor(
      H,
      R,
      5.3,
      6.65,
      t,
      'hongKongSketchCloud',
      {
        shirt: ['coral', 0.64],
        hairStyle: 'bun',
        face: 'nw',
        prop(h, r, p) {
          const [x, y] = p.nearHand;
          h.line(
            r,
            [
              [x + 2, y + 3],
              [x - 12, y - 10]
            ],
            'blue',
            1.4
          );
          h.line(
            r,
            [
              [x - 12, y - 10],
              [x - 15, y - 12]
            ],
            'coral',
            0.9
          );
        }
      },
      0.01,
      1.26
    );
    actor(
      H,
      R,
      9.27,
      2.12,
      0,
      'sit',
      {
        shirt: ['paper', 1],
        hairStyle: 'cap',
        face: 'sw',
        prop(h, r, p) {
          const [x, y] = p.nearHand;
          shape(
            h,
            r,
            [
              [x - 12, y - 4],
              [x + 10, y + 1],
              [x + 10, y + 13],
              [x - 12, y + 8]
            ],
            'teal',
            0.65,
            0.7
          );
        }
      },
      0.08,
      1.17
    );
    const [x, y] = H.p(6.65, 5.7, 0.03);
    shape(
      H,
      R,
      [
        [x - 7, y + 5],
        [x + 9, y + 5],
        [x + 9, y - 2],
        [x + 6, y - 8 + Math.sin(u * TAU) * 2],
        [x - 8, y - 4]
      ],
      'paper',
      1,
      0.65
    );
    H.dot(x + 4, y - 2, 2, 'sun', 0.85);
  }
);
room.loopSeconds = 16;
room.stillTime = 0;
export default room;
