import { benchFrame, bentTube, branchSpray, metal, slattedSeat, surface, timber, vessel } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';

import { coiledLine, foldedCloth, handTool, shallowTray, slattedCrate } from '../furnishings.js';
import { TAU, actor, box, cycle, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const ready = { ...rest, lean: -12, head: 15, al: 41, ar: 58, el: 39, er: 26 };
FIGURES.clips.newYorkCompostTurn = {
  dur: 18,
  keys: [
    [0, ready],
    [0.15, ready],
    [0.31, { ...ready, lean: -22, ar: 74, al: 61, er: 10, el: 19 }],
    [0.49, { ...ready, lean: -3, ar: 48, al: 48, er: 64, el: 68 }],
    [0.64, { ...ready, lean: -11, ar: 69, al: 60, er: 33, el: 39 }],
    [0.79, ready],
    [1, ready]
  ]
};
FIGURES.clips.newYorkGardenSort = {
  dur: 18,
  keys: [
    [0, { ...rest, head: 17, ar: 53, er: 59, al: 50, el: 62 }],
    [0.35, { ...rest, head: 17, ar: 53, er: 59, al: 50, el: 62 }],
    [0.54, { ...rest, lean: -8, head: 23, ar: 73, er: 18, al: 50, el: 62 }],
    [0.7, { ...rest, head: 17, ar: 53, er: 59, al: 50, el: 62 }],
    [1, { ...rest, head: 17, ar: 53, er: 59, al: 50, el: 62 }]
  ]
};

function leaf(H, R, x, y, size, ink = 'teal') {
  shape(
    H,
    R,
    [
      [x, y],
      [x - size * 0.6, y - size * 0.7],
      [x - size * 0.25, y - size * 1.7],
      [x + size * 0.5, y - size * 1.2]
    ],
    ink,
    0.7,
    0.55
  );
  H.line(
    R,
    [
      [x, y],
      [x - size * 0.1, y - size * 1.3]
    ],
    'blue',
    0.6
  );
}

function compostBay(H, R, j, filled, open) {
  const i = 0.5,
    w = 2.6,
    d = 2.52;
  box(H, R, i, j, w, d, 0.04, 0.14, 'blue', 0.4);
  if (filled) {
    const heap = [
      H.p(i + 0.12, j + 0.18, 0.35),
      H.p(i + 1.15, j + 0.18, 0.94),
      H.p(i + 2.42, j + 0.72, 0.57),
      H.p(i + 2.41, j + 2.25, 0.45),
      H.p(i + 1.31, j + 2.29, 0.73),
      H.p(i + 0.14, j + 1.87, 0.49)
    ];
    shape(H, R, heap, filled === 2 ? 'blue' : 'teal', 0.68, 0.75);
    H.clip(heap, () => {
      H.speckle(R, heap, 'sun', 190, 0.6, 1.8, 0.55);
      for (let k = 0; k < 19; k++) {
        const [x, y] = H.p(i + 0.25 + R() * 2, j + 0.22 + R() * 1.9, 0.69);
        H.line(
          R,
          [
            [x - 4, y - 1],
            [x + 5, y + 1]
          ],
          k % 3 ? 'paper' : 'coral',
          1.2,
          { tone: 0.6 }
        );
      }
    });
  }
  for (let n = 0; n < 4; n++) {
    timber(H, R, i, j, 0.12, d, 0.17 + n * 0.22, 0.13, 'teal', 0.48);
    timber(H, R, i, j, w, 0.1, 0.17 + n * 0.22, 0.13, 'teal', 0.48);
    timber(H, R, i, j + d - 0.1, w, 0.1, 0.17 + n * 0.22, 0.13, 'teal', 0.5);
    if (!open || n < 2) timber(H, R, i + w - 0.1, j, 0.1, d, 0.17 + n * 0.22, 0.13, 'sun', 0.42);
  }
  for (const a of [i, i + w - 0.15]) for (const b of [j, j + d - 0.15]) box(H, R, a, b, 0.15, 0.15, 0.03, 1.11, 'blue', 0.65);
  if (open) {
    shape(H, R, [H.p(i, j, 1.14), H.p(i + 0.22, j, 2.17), H.p(i + 0.22, j + d, 2.17), H.p(i, j + d, 1.14)], 'sun', 0.35, 1);
    for (let k = 0; k < 6; k++) H.line(R, [H.p(i + 0.03, j + k * 0.42, 1.2), H.p(i + 0.2, j + k * 0.42, 2.1)], 'blue', 0.65);
    H.line(R, [H.p(i + 0.16, j + d - 0.3, 1.87), H.p(i + 0.93, j + d - 0.3, 0.99)], 'blue', 1.5);
  } else shape(H, R, H.tile(i, j, w, d, 1.17), 'paper', 0.9, 0.8);
  for (const y of [j + 0.18, j + d - 0.34]) {
    metal(H, R, i - 0.01, y, 0.22, 0.17, 1.08, 0.11, 'teal');
    H.line(R, [H.p(i - 0.035, y + 0.085, 1.14), H.p(i + 0.245, y + 0.085, 1.14)], 'sun', 1.2);
  }
  if (open) {
    for (let n = 0; n < 5; n++) {
      const y = j + 0.22 + (n * (d - 0.44)) / 4;
      H.line(R, [H.p(i + 0.04, y, 1.3), H.p(i + 0.18, y, 1.94)], 'paper', 0.9);
    }
    for (let n = 0; n < 4; n++) leaf(H, R, ...H.p(i + 1.14 + n * 0.25, j + d - 0.22, 0.58), 5 + (n % 2) * 2, n % 2 ? 'coral' : 'sun');
  }
}

function barrel(H, R, i, j) {
  const [x, y] = H.p(i, j, 0.05);
  shape(
    H,
    R,
    [
      [x - 20, y - 6],
      [x + 20, y - 6],
      [x + 22, y - 53],
      [x - 22, y - 53]
    ],
    'teal',
    0.66
  );
  oval(H, R, x, y - 53, 22, 9, 'blue', 0.65);
  oval(H, R, x, y - 53, 17, 6, 'paper', 0.85);
  for (const off of [14, 36])
    stroke(
      H,
      R,
      [
        [x - 20, y - off],
        [x, y - off + 6],
        [x + 20, y - off]
      ],
      'blue',
      1
    );
  H.line(
    R,
    [
      [x + 15, y - 15],
      [x + 27, y - 15],
      [x + 27, y - 8]
    ],
    'blue',
    2.1
  );
  H.line(
    R,
    [
      [x + 21, y - 19],
      [x + 27, y - 19]
    ],
    'coral',
    2.3
  );
}

const room = world(
  'new-york-crown-heights-garden',
  'Crown Heights · Turn the Heap',
  { floor: 'paper', tone: 1, wall: false, head: 100 },
  (H, R) => {
    surface(H, R, H.tile(0, 0, 12, 12, 0.02), 'sun', 0.2);
    H.speckle(R, H.tile(0.1, 0.1, 11.8, 11.8, 0.025), 'coral', 440, 0.45, 1.1, 0.4);
    masonry(H, R, 'ne', 0.08, 11.84, 0, 3.04, 'coral', 0.34);
    for (let n = 0; n < 25; n++) {
      const j = 0.09 + n * 0.47;
      timber(H, R, 0.09, j, 0.17, 0.43, 0.02, 2.36 + (n % 3) * 0.08, 'sun');
    }
    for (const z of [0.49, 1.78]) timber(H, R, 0.22, 0.07, 0.12, 11.87, z, 0.11, 'teal');
    for (const i of [4.57, 8.19]) timber(H, R, i, 0.24, 0.18, 0.24, 0.04, 3.24, 'teal');
    timber(H, R, 4.51, 0.23, 3.93, 0.29, 3.28, 0.16, 'sun');
    for (let n = 0; n < 6; n++) timber(H, R, 4.5 + n * 0.73, 0.15, 0.12, 2.31, 3.4, 0.11, 'sun');
    compostBay(H, R, 1.02, 1, false);
    compostBay(H, R, 4.02, 2, true);
    compostBay(H, R, 7.02, 0, false);
    for (const j of [1.18, 4.18, 7.18]) {
      surface(H, R, H.faceJ(3.13, j, 0.53, 0.46, 0.78), 'paper', 1, 0.4);
      for (let n = 0; n < 3; n++) H.line(R, [H.p(3.14, j + 0.08, 0.53 + n * 0.065), H.p(3.14, j + 0.43, 0.53 + n * 0.065)], 'teal', 0.55);
    }
    benchFrame(H, R, 6.27, 3.24, 2.43, 1.79, 1.02, 'sun');
    shallowTray(H, R, 6.45, 3.43, 1.34, 1.2, 1.06, 'teal');
    for (let n = 0; n < 10; n++) leaf(H, R, ...H.p(6.69 + (n % 3) * 0.37, 3.69 + Math.floor(n / 3) * 0.25, 1.13), 4.5, n % 2 ? 'coral' : 'sun');
    vessel(H, R, 8.12, 4.22, 1.07, 8, 13, 'sun');
    handTool(H, R, 8.43, 3.47, 1.08, 'trowel', 'teal');
    slattedCrate(H, R, 6.46, 3.55, 1.59, 1.08, 0.04, 0.59, 'sun');
    cabinetFrame(H, R, 9.06, 1.34, 2.03, 2.39, 0.06, 1.02, 1, 'sun', (i, j, w, d, z, h) => {
      for (let n = 0; n < 2; n++) shallowTray(H, R, i + 0.1, j + 0.16 + n * 0.99, w - 0.2, 0.84, z + 0.14, 'teal');
    });
    surface(H, R, H.tile(9.13, 1.44, 1.89, 2.19, 1.1), 'blue', 0.6);
    for (let n = 0; n < 10; n++) branchSpray(H, R, ...H.p(9.37 + (n % 3) * 0.56, 1.72 + Math.floor(n / 3) * 0.52, 1.11), 0.28, 'teal');
    barrel(H, R, 5.51, 1.37);
    bentTube(
      H,
      R,
      [
        [5.4, 0.41, 3.01],
        [5.4, 0.41, 1.78],
        [5.51, 1.37, 1.7]
      ],
      3,
      'teal'
    );
    coiledLine(H, R, 5.39, 2.88, 0.04, 13, 'teal');
    for (let n = 0; n < 7; n++) surface(H, R, H.tile(4.44, 3.42 + n * 1.11, 1.13, 0.81, 0.07), 'paper', 1, 0.7);
    timber(H, R, 7.31, 6.84, 3.54, 2.25, 0.05, 0.16, 'teal');
    surface(H, R, H.tile(7.49, 7.01, 3.18, 1.91, 0.23), 'blue', 0.42);
    for (let n = 0; n < 15; n++)
      branchSpray(H, R, ...H.p(7.76 + (n % 5) * 0.62, 7.3 + Math.floor(n / 5) * 0.56, 0.25), 0.32 + (n % 3) * 0.04, 'teal');
    for (const i of [9.59, 10.09, 10.59])
      bentTube(
        H,
        R,
        [
          [i, 0.38, 0.11],
          [i, 0.38, 2.79]
        ],
        2.1,
        'sun'
      );
    for (let n = 0; n < 3; n++) handTool(H, R, 9.59 + n * 0.5, 0.42, 0.12, n === 1 ? 'rake' : 'spade', 'teal');
    slattedSeat(H, R, 7.38, 10.19, 3.43, 0.03, 'sun', 0.48);
    foldedCloth(H, R, 7.61, 10.37, 1.12, 0.47, 0.67, 'coral', 'paper');
    vessel(H, R, 10.97, 5.33, 0.04, 11, 21, 'teal');
  },
  (H, R, t) => {
    const u = cycle(t, 18),
      turn = Math.sin(Math.PI * Math.max(0, Math.min(1, (u - 0.17) / 0.59))) ** 2;
    actor(
      H,
      R,
      4.39,
      5.11,
      t,
      'newYorkCompostTurn',
      {
        face: 'sw',
        shirt: ['paper', 1],
        apron: ['teal', 0.72],
        hairStyle: 'cap',
        prop(h, r, points) {
          const [x, y] = points.nearHand,
            end = [x - 46 + turn * 9, y + 12 - turn * 19];
          H.line(r, [[x + 11, y - 9], [x, y], end], 'blue', 3);
          H.line(r, [[x + 11, y - 9], [x, y], end], 'sun', 1.55);
          for (let k = 0; k < 4; k++)
            H.line(
              r,
              [
                [end[0] + k * 3, end[1] - 3],
                [end[0] - 4 + k * 3, end[1] + 8]
              ],
              'blue',
              1.3
            );
          if (turn > 0.12) for (let k = 0; k < 5; k++) leaf(h, r, end[0] + k * 3, end[1] + 1, 3.7, k % 2 ? 'sun' : 'teal');
        }
      },
      0,
      1.38
    );
    actor(
      H,
      R,
      7.51,
      4.93,
      t,
      'newYorkGardenSort',
      {
        shirt: ['coral', 0.64],
        hairStyle: 'bun',
        face: 'nw',
        prop(h, r, points) {
          const [x, y] = points.farHand;
          shape(
            h,
            r,
            [
              [x - 5, y + 5],
              [x + 5, y + 5],
              [x + 7, y - 6],
              [x - 7, y - 6]
            ],
            'sun',
            0.7,
            0.6
          );
          leaf(h, r, x, y - 6, 5);
        }
      },
      0,
      1.23
    );
    const sway = Math.sin(u * TAU) * 2;
    for (let k = 0; k < 4; k++) {
      const [x, y] = H.p(9.25 + k * 0.5, 3.5, 1.79);
      stroke(
        H,
        R,
        [
          [x, y + 22],
          [x + sway, y + 4],
          [x + 3 + sway, y - 8]
        ],
        'teal',
        1.6
      );
      leaf(H, R, x + sway, y + 2, 7);
    }
  }
);

room.loopSeconds = 18;
export default room;
