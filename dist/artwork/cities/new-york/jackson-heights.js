import { benchFrame, bentTube, branchSpray, metal, slattedSeat, surface, timber, vessel } from '../materials.js';
import { masonry, archedBay } from '../structure.js';

import { boundBook, foldedCloth, satchel, shallowTray } from '../furnishings.js';
import { TAU, actor, box, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -6, head: 14, al: 72, el: 24, ar: 38, er: 92 };
FIGURES.clips.newYorkChessConsider = {
  dur: 16,
  keys: [
    [0, seated],
    [0.14, seated],
    [0.28, { ...seated, al: 52, el: 95, head: -4 }],
    [0.46, { ...seated, al: 52, el: 95, head: 8 }],
    [0.6, seated],
    [0.76, { ...seated, head: -10, ar: 50, er: 75 }],
    [0.88, seated],
    [1, seated]
  ]
};
const observer = { ...seated, al: 28, el: 112, ar: 24, er: 130 };
FIGURES.clips.newYorkChessReply = {
  dur: 16,
  keys: [
    [0, observer],
    [0.4, observer],
    [0.57, { ...observer, ar: 65, er: 23, head: 18 }],
    [0.72, { ...observer, ar: 65, er: 23, head: 18 }],
    [0.88, observer],
    [1, observer]
  ]
};

function piece(H, R, x, y, ink = 'paper', knight = false, size = 1) {
  oval(H, R, x, y, 4.2 * size, 1.7 * size, ink, 1);
  shape(
    H,
    R,
    [
      [x - 3 * size, y],
      [x - 1.7 * size, y - 6 * size],
      [x + 1.7 * size, y - 6 * size],
      [x + 3 * size, y]
    ],
    ink,
    1,
    0.55
  );
  if (knight)
    shape(
      H,
      R,
      [
        [x - 2 * size, y - 5 * size],
        [x - 3 * size, y - 11 * size],
        [x + 1 * size, y - 14 * size],
        [x + 4 * size, y - 9 * size],
        [x + 1 * size, y - 7 * size]
      ],
      ink,
      1,
      0.55
    );
  else oval(H, R, x, y - 7 * size, 2.5 * size, 2.5 * size, ink, 1);
}

function foldingChair(H, R, i, j, ink) {
  const corners = [
    [i, j],
    [i + 0.85, j],
    [i + 0.85, j + 0.9],
    [i, j + 0.9]
  ];
  for (const [x, y] of corners) stroke(H, R, [H.p(x, y, 0.04), H.p(x + 0.07, j + 0.45, 0.6), H.p(x, j + 0.9 - (y - j), 0.04)], 'blue', 1.3);
  box(H, R, i, j, 0.85, 0.9, 0.6, 0.09, ink, 0.7);
  box(H, R, i, j + 0.83, 0.85, 0.09, 0.7, 0.62, ink, 0.65);
  for (let n = 0; n < 4; n++) H.line(R, [H.p(i + 0.08, j + 0.93, 0.8 + n * 0.13), H.p(i + 0.77, j + 0.93, 0.8 + n * 0.13)], 'paper', 0.7);
}

function planter(H, R, i, j, w, d) {
  for (const z of [0.02, 0.27, 0.52]) timber(H, R, i, j, w, d, z, 0.22, 'teal');
  for (const x of [i + 0.11, i + w - 0.22]) metal(H, R, x, j + d + 0.01, 0.11, 0.045, 0.07, 0.67, 'blue');
  shape(H, R, H.tile(i + 0.1, j + 0.1, w - 0.2, d - 0.2, 0.82), 'blue', 0.63, 0.6);
  for (let n = 0; n < Math.ceil(w / 0.4); n++)
    branchSpray(H, R, ...H.p(i + 0.24 + n * 0.38, j + d / 2, 0.84), 0.55 + (n % 2) * 0.15, 'teal', n % 2 ? 1 : -1);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(i, j + d, 0.15 + n * 0.12), H.p(i + w, j + d, 0.15 + n * 0.12)], 'paper', 0.6, { tone: 0.5 });
}

const room = world(
  'new-york-jackson-heights',
  'Jackson Heights · One More Move',
  { floor: 'paper', tone: 1, wall: false, head: 90 },
  (H, R) => {
    for (let r = 0; r < 14; r++)
      for (let c = 0; c < 10; c++) {
        const i = c * 1.2 + (r % 2) * 0.3;
        if (i < 11.96) surface(H, R, H.tile(i, r * 0.85, Math.min(1.16, 12 - i), 0.81, 0.025), 'coral', (r + c) % 4 ? 0.12 : 0.23, 0.4);
      }
    masonry(H, R, 'ne', 0.08, 11.84, 0, 3.28, 'paper', 1);
    masonry(H, R, 'nw', 0.08, 7.06, 0, 3.48, 'coral', 0.26);
    for (const [pos, w] of [
      [0.52, 3.11],
      [4.18, 3.11],
      [7.84, 3.54]
    ])
      archedBay(H, R, 'ne', pos, w, 0.89, 2.13, 'teal');
    for (const i of [0.34, 11.46]) {
      metal(H, R, i, 1.42, 0.17, 0.17, 0.02, 3.62, 'teal');
      metal(H, R, i - 0.11, 1.3, 0.39, 0.39, 0.02, 0.12, 'blue');
    }
    surface(H, R, [H.p(0.27, 0.5, 3.56), H.p(11.68, 0.5, 3.56), H.p(11.68, 2.71, 3.3), H.p(0.27, 2.71, 3.3)], 'paper', 1);
    for (let n = 0; n < 14; n++)
      surface(
        H,
        R,
        [H.p(0.29 + n * 0.81, 0.51, 3.57), H.p(0.68 + n * 0.81, 0.51, 3.57), H.p(0.68 + n * 0.81, 2.72, 3.31), H.p(0.29 + n * 0.81, 2.72, 3.31)],
        'sun',
        0.43,
        0.4
      );
    for (let n = 0; n < 14; n++) H.line(R, [H.p(0.68 + n * 0.81, 2.73, 3.31), H.p(0.68 + n * 0.81, 2.73, 3.14)], 'teal', 1.1);
    planter(H, R, 0.48, 2.72, 1.75, 4.25);
    planter(H, R, 8.79, 0.88, 2.54, 1.71);
    planter(H, R, 9.88, 8.88, 1.44, 2.43);
    for (const [i, j, s] of [
      [1.21, 3.18, 0.85],
      [1.3, 5.52, 1.14],
      [10.29, 1.73, 0.91],
      [10.47, 10.11, 0.74]
    ])
      branchSpray(H, R, ...H.p(i, j, 1.02), s, 'teal');
    slattedSeat(H, R, 7.83, 3.18, 3.32, 0.03, 'sun', 0.78);
    satchel(H, R, 10.31, 3.53, 0.7, 'coral', 0.6);
    foldingChair(H, R, 5.33, 3.54, 'teal');
    foldingChair(H, R, 5.39, 7.43, 'coral');
    for (const i of [4.33, 7.09])
      bentTube(
        H,
        R,
        [
          [i, 5.06, 0.04],
          [i, 6.76, 1.07],
          [i, 7.12, 0.04]
        ],
        2.7,
        'teal'
      );
    timber(H, R, 4.11, 5.03, 3.27, 2.44, 1.04, 0.16, 'sun');
    surface(H, R, H.tile(4.63, 5.42, 2.26, 1.78, 1.215), 'paper', 1);
    for (let r = 0; r < 8; r++)
      for (let c = 0; c < 8; c++) if ((r + c) % 2) surface(H, R, H.tile(4.69 + c * 0.269, 5.46 + r * 0.214, 0.267, 0.211, 1.224), 'teal', 0.54, 0.2);
    for (const [c, r, ink, k] of [
      [0, 1, 'blue', 0],
      [2, 2, 'blue', 1],
      [4, 1, 'blue', 0],
      [6, 0, 'blue', 0],
      [7, 2, 'blue', 0],
      [1, 6, 'paper', 0],
      [3, 4, 'paper', 0],
      [5, 6, 'paper', 1],
      [6, 7, 'paper', 0]
    ])
      piece(H, R, ...H.p(4.82 + c * 0.269, 5.57 + r * 0.214, 1.23), ink, k, 0.62);
    shallowTray(H, R, 4.28, 5.13, 0.31, 1.02, 1.23, 'coral');
    vessel(H, R, 7.17, 6.81, 1.22, 4, 9, 'paper');
    benchFrame(H, R, 2.59, 8.75, 2.48, 1.71, 0.92, 'teal');
    boundBook(H, R, 2.86, 8.98, 1.18, 0.86, 0.96, 'paper');
    foldedCloth(H, R, 4.26, 9.14, 0.49, 0.8, 0.96, 'coral', 'paper');
    for (const i of [7.77, 8.31, 8.85]) metal(H, R, i, 9.04, 0.075, 0.075, 0.02, 0.78, 'teal');
    bentTube(
      H,
      R,
      [
        [7.77, 9.04, 0.79],
        [8.85, 9.04, 0.79]
      ],
      2,
      'teal'
    );
    vessel(H, R, 8.31, 9.46, 0.03, 11, 21, 'teal');
    for (let n = 0; n < 6; n++) H.line(R, [H.p(8.11 + n * 0.08, 9.38, 0.58), H.p(8.11 + n * 0.08, 9.38, 0.94 + (n % 2) * 0.08)], 'sun', 1.2);
    for (const i of [0.54, 3.13, 5.72, 8.31, 10.9]) {
      H.line(R, [H.p(i, 2.73, 3.17), H.p(i, 2.73, 2.97)], 'blue', 0.65);
      surface(H, R, ell(...H.p(i, 2.73, 2.91), 3, 4.1), 'sun', 0.7);
    }
  },
  (H, R, t) => {
    const u = cycle(t, 16);
    actor(H, R, 5.81, 4.04, u * 16, 'newYorkChessReply', { face: 'se', shirt: ['teal', 0.7], hairStyle: 'curly', skin: ['coral', 0.5] }, 0.05, 1.32);
    actor(
      H,
      R,
      5.86,
      7.97,
      u * 16,
      'newYorkChessConsider',
      {
        face: 'ne',
        shirt: ['coral', 0.7],
        hairStyle: 'bald',
        glasses: true,
        prop(h, r, points) {
          const [x, y] = points.nearHand;
          piece(h, r, x + 1, y + 3, 'paper', true, 0.95);
        }
      },
      0.05,
      1.4,
      'elder'
    );
    actor(H, R, 8.96, 3.59, u * 3, 'sit', { shirt: ['sun', 0.62], hairStyle: 'pony', face: 'sw' }, 0.05, 1.25);
    const [x, y] = H.p(10.22, 2.03, 1.88);
    const sway = Math.sin(u * TAU) * 4;
    stroke(
      H,
      R,
      [
        [x, y + 13],
        [x + 4 + sway, y - 6],
        [x + sway, y - 19]
      ],
      'teal',
      1.2
    );
    oval(H, R, x + sway - 5, y - 9, 5, 2.8, 'teal', 0.7);
  }
);
room.loopSeconds = 16;
room.stillTime = 0;
export default room;
