import { benchFrame, bentTube, branchSpray, cushion, pendant, slattedSeat, surface, timber, vessel } from '../materials.js';
import { cabinetFrame, rackFrame, boardFloor } from '../structure.js';
import { windowBay } from '../joinery.js';
import { boundBook, shallowTray, slattedCrate } from '../furnishings.js';
import { TAU, actor, cycle, ell, oval, shape, stroke, wallPt, wallRect, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -8, head: 17, al: 65, el: 36, ar: 55, er: 66 };
FIGURES.clips.newYorkLeafLens = {
  dur: 18,
  keys: [
    [0, seated],
    [0.15, seated],
    [0.29, { ...seated, al: 71, el: 63, head: 23 }],
    [0.47, { ...seated, al: 71, el: 63, head: 23 }],
    [0.61, { ...seated, al: 87, el: 25, head: 6 }],
    [0.77, { ...seated, al: 87, el: 25, head: 6 }],
    [0.93, seated],
    [1, seated]
  ]
};
const indicate = { ...rest, head: 15, lean: -5, ar: 83, er: 6, al: 31, el: 42 };
FIGURES.clips.newYorkLeafGuide = {
  dur: 18,
  keys: [
    [0, indicate],
    [0.34, indicate],
    [0.53, { ...indicate, ar: 99, er: 2, head: 3 }],
    [0.74, { ...indicate, ar: 99, er: 2, head: 3 }],
    [0.92, indicate],
    [1, indicate]
  ]
};

function leaf(H, R, x, y, size = 1, ink = 'coral', turn = 0, oak = false) {
  const p = (a, b) => [x + (a * Math.cos(turn) - b * Math.sin(turn)) * size, y + (a * Math.sin(turn) + b * Math.cos(turn)) * size];
  const edge = oak
    ? [
        [0, -16],
        [5, -13],
        [4, -9],
        [11, -8],
        [8, -3],
        [12, 1],
        [7, 5],
        [5, 12],
        [0, 15],
        [-4, 10],
        [-10, 8],
        [-7, 2],
        [-12, -2],
        [-7, -6],
        [-9, -10],
        [-3, -11]
      ]
    : [
        [0, -17],
        [6, -7],
        [13, -7],
        [8, 0],
        [14, 5],
        [5, 7],
        [2, 15],
        [-3, 8],
        [-12, 7],
        [-8, 0],
        [-13, -5],
        [-5, -6]
      ];
  shape(
    H,
    R,
    edge.map(([a, b]) => p(a, b)),
    ink,
    0.65,
    0.6
  );
  H.line(R, [p(0, -12), p(0, 19)], 'blue', 0.65, { tone: 0.65 });
  for (const n of [-1, 1]) for (const q of [-5, 3]) H.line(R, [p(0, q + 5), p(n * 7, q)], 'blue', 0.45, { tone: 0.55 });
}

function cone(H, R, x, y, size = 1) {
  oval(H, R, x, y - 7 * size, 6 * size, 10 * size, 'sun', 0.65);
  for (let n = 0; n < 4; n++)
    stroke(
      H,
      R,
      [
        [x - 4 * size, y - n * 4 * size],
        [x, y + 2 * size - n * 4 * size],
        [x + 4 * size, y - n * 4 * size]
      ],
      'blue',
      0.6
    );
}

const room = world(
  'new-york-greenbelt-center',
  'Staten Island · The Leaf Table',
  { floor: 'paper', tone: 1, wall: false, head: 110 },
  (H, R) => {
    boardFloor(H, R, 0.04, 0.04, 11.91, 11.89, 0.025, 'sun', 0.51);
    surface(H, R, H.faceJ(0.13, 0.13, 11.73, 0, 4.03), 'sun', 0.14);
    surface(H, R, H.faceI(0.13, 0.13, 11.73, 0, 4.03), 'paper', 1);
    for (let n = 0; n < 22; n++) H.line(R, [H.p(0.16, 0.15 + n * 0.53, 0.1), H.p(0.16, 0.15 + n * 0.53, 3.99)], 'coral', 0.6, { tone: 0.35 });
    for (const i of [0.26, 4.12, 8.03, 11.69]) {
      timber(H, R, i, 0.31, 0.18, 0.23, 0.03, 4.06, 'sun');
      bentTube(
        H,
        R,
        [
          [i, 0.32, 3.45],
          [i, 1.42, 4.04]
        ],
        2.8,
        'teal'
      );
    }
    timber(H, R, 0.2, 0.23, 11.65, 0.27, 4.06, 0.16, 'sun');
    windowBay(H, R, 'ne', 8.48, 2.45, 1.64, 1.39, {
      ink: 'teal',
      divisions: 1,
      view: (P) => {
        surface(H, R, [P(0, 0), P(2.45, 0), P(2.45, 1.4), P(0, 1.4)], 'sun', 0.13);
      }
    });
    cabinetFrame(H, R, 0.42, 0.47, 5.76, 1.83, 0.04, 3.28, 3, 'sun', (i, j, w, d, z, h, col) => {
      for (let row = 0; row < 3; row++) {
        timber(H, R, i, j, w, d, z + row * 1.01, 0.085, 'sun');
        surface(H, R, H.tile(i + 0.1, j + 0.1, w - 0.2, d - 0.19, z + 0.12 + row * 1.01), 'paper', 1, 0.3);
        for (let n = 0; n < 3; n++) {
          const [x, y] = H.p(i + 0.31 + n * 0.48, j + 0.7, z + 0.2 + row * 1.01);
          if (col === 1) cone(H, R, x, y, 0.56);
          else leaf(H, R, x, y, 0.54, n % 2 ? 'teal' : 'coral', n * 0.4, row === 1);
        }
      }
    });
    benchFrame(H, R, 6.7, 0.65, 1.29, 1.62, 1.04, 'teal');
    boundBook(H, R, 6.84, 0.83, 1.01, 1.05, 1.08, 'paper');
    vessel(H, R, 7.33, 1.74, 1.08, 5, 10, 'teal');
    const edge = [];
    for (let n = 0; n < 48; n++) {
      const a = (n * TAU) / 48;
      edge.push(H.p(6.27 + Math.cos(a) * 2.25, 6.38 + Math.sin(a) * 1.67, 1.1));
    }
    for (const [i, j] of [
      [4.89, 5.41],
      [7.61, 5.41],
      [4.89, 7.27],
      [7.61, 7.27]
    ]) {
      timber(H, R, i, j, 0.18, 0.18, 0.02, 1.06, 'sun');
      bentTube(
        H,
        R,
        [
          [i, j, 0.17],
          [6.28, 6.37, 0.53]
        ],
        2.1,
        'teal'
      );
    }
    surface(H, R, edge, 'sun', 0.38, 2);
    for (let n = 0; n < 4; n++) {
      const i = 4.75 + (n % 2) * 1.69,
        j = 5.54 + Math.floor(n / 2) * 1.45;
      surface(H, R, H.tile(i, j, 1.28, 0.88, 1.12), 'paper', 1);
      const [x, y] = H.p(i + 0.62, j + 0.42, 1.14);
      leaf(H, R, x, y, 0.85, n % 2 ? 'teal' : 'coral', 0.2, n > 1);
    }
    shallowTray(H, R, 6.22, 6.08, 1.14, 0.63, 1.14, 'teal');
    for (let n = 0; n < 3; n++) cone(H, R, ...H.p(6.43 + n * 0.3, 6.41, 1.19), 0.4);
    for (const [i, j, h] of [
      [5.16, 7.71, 0.95],
      [8.05, 5.0, 0.61]
    ]) {
      for (const x of [i, i + 0.83]) for (const y of [j, j + 0.65]) timber(H, R, x, y, 0.1, 0.1, 0.03, h - 0.1, 'sun');
      cushion(H, R, i - 0.04, j - 0.04, 1.02, 0.84, h, 0.12, 'coral');
    }
    rackFrame(H, R, 0.56, 6.74, 2.09, 4.13, 0.02, [0.12, 1.06], 'sun', (i, j, w, d, z, row) => {
      for (let n = 0; n < 4; n++) slattedCrate(H, R, i + 0.1, j + 0.12 + n * 0.93, w - 0.2, 0.8, z, 0.53, row ? 'sun' : 'teal');
    });
    slattedSeat(H, R, 8.83, 9.38, 2.36, 0.03, 'sun', 0.63);
    boundBook(H, R, 9.12, 9.59, 1.39, 0.51, 0.68, 'teal');
    const [tx, ty] = H.p(10.64, 3.35, 0.03);
    H.line(
      R,
      [
        [tx, ty],
        [tx - 8, ty - 68],
        [tx - 29, ty - 103]
      ],
      'coral',
      5
    );
    H.line(
      R,
      [
        [tx - 8, ty - 62],
        [tx + 27, ty - 109]
      ],
      'sun',
      3
    );
    branchSpray(H, R, tx - 22, ty - 81, 1.0, 'teal');
    branchSpray(H, R, tx + 13, ty - 83, 0.9, 'teal');
    vessel(H, R, 3.57, 9.64, 0.04, 13, 20, 'sun');
    bentTube(
      H,
      R,
      [
        [3.57, 9.64, 0.4],
        [3.63, 9.66, 1.67]
      ],
      2,
      'teal'
    );
    pendant(H, R, 6.18, 5.81, 4.27, 3.17, 'paper', 1.18);
  },
  (H, R, t) => {
    const u = cycle(t, 18);
    actor(
      H,
      R,
      8.45,
      5.39,
      u * 18,
      'newYorkLeafGuide',
      { shirt: ['paper', 1], vest: ['teal', 0.62], hairStyle: 'curly', face: 'sw', glasses: true },
      0.04,
      1.31
    );
    actor(
      H,
      R,
      5.6,
      8.03,
      u * 18,
      'newYorkLeafLens',
      {
        shirt: ['coral', 0.63],
        hairStyle: 'pony',
        face: 'ne',
        prop(h, r, points) {
          const [x, y] = points.nearHand;
          h.line(
            r,
            [
              [x, y],
              [x + 9, y - 9]
            ],
            'blue',
            3
          );
          oval(h, r, x + 14, y - 14, 8, 7, 'paper', 0.4);
          h.outline(r, ell(x + 14, y - 14, 8, 7), 'teal', 2, { tone: 0.8, amp: 0.08 });
          h.line(
            r,
            [
              [x + 11, y - 18],
              [x + 16, y - 20]
            ],
            'paper',
            1.3
          );
        }
      },
      0.39,
      1.5,
      'child'
    );
    const glass = wallRect(H, 'ne', 8.56, 10.81, 1.74, 2.92, 0.17);
    H.clip(glass, () => {
      const sway = Math.sin(u * TAU) * 0.05;
      stroke(
        H,
        R,
        [wallPt(H, 'ne', 10.75, 1.71, 0.18), wallPt(H, 'ne', 10.08 + sway, 2.14, 0.18), wallPt(H, 'ne', 8.51 + sway, 2.64, 0.18)],
        'blue',
        1.2
      );
      for (let n = 0; n < 4; n++)
        leaf(H, R, ...wallPt(H, 'ne', 8.79 + n * 0.43 + sway, 2.63 - n * 0.16, 0.19), 0.59, n % 2 ? 'teal' : 'sun', -0.4 + n * 0.24);
    });
  }
);
room.loopSeconds = 18;
export default room;
