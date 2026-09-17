import { surface, timber, vessel, bentTube, benchFrame, pendant } from '../materials.js';
import { masonry, cabinetFrame, boardFloor } from '../structure.js';
import { windowBay } from '../joinery.js';
import { foldedCloth, coiledLine, handTool } from '../furnishings.js';
import { TAU, actor, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const hold = { ...rest, lean: -10, head: 13, al: 62, ar: 69, el: 42, er: 34 };
FIGURES.clips.hongKongDragonSupport = {
  dur: 14,
  keys: [
    [0, hold],
    [0.13, hold],
    [0.3, { ...hold, al: 74, ar: 78, el: 20, er: 20 }],
    [0.48, { ...hold, al: 79, ar: 84, el: 12, er: 15, lean: -14 }],
    [0.61, { ...hold, al: 74, ar: 78, el: 20, er: 20 }],
    [0.8, hold],
    [1, hold]
  ]
};

function trestle(H, R, i, j) {
  for (const x of [i, i + 0.8]) {
    H.line(R, [H.p(x, j, 0.04), H.p(x, j + 0.57, 1.04), H.p(x, j + 1.14, 0.04)], 'blue', 3.4);
    H.line(R, [H.p(x, j + 0.15, 0.37), H.p(x, j + 0.95, 0.37)], 'coral', 2);
  }
  timber(H, R, i - 0.09, j + 0.42, 0.98, 0.31, 1.02, 0.12, 'coral');
}

function strawSection(H, R, i, j, z, size = 1) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y, 25 * size, 17 * size, 'sun', 0.57);
  for (let q = 0; q < 13; q++) {
    const dy = (q - 6) * 2.1 * size,
      half = Math.sqrt(Math.max(0, 1 - (dy / (17 * size)) ** 2)) * 25 * size;
    stroke(
      H,
      R,
      [
        [x - half, y + dy],
        [x - half * 0.35, y + dy - 2],
        [x + half * 0.4, y + dy + 1],
        [x + half, y + dy - 2]
      ],
      q % 3 ? 'coral' : 'blue',
      0.5,
      0.52
    );
  }
  for (const dx of [-13, 9])
    stroke(
      H,
      R,
      [
        [x + dx * size, y - 15 * size],
        [x + (dx - 4) * size, y],
        [x + dx * size, y + 15 * size]
      ],
      'teal',
      1.5,
      0.72
    );
}

function dragonHead(H, R, i, j, z) {
  const [x, y] = H.p(i, j, z);
  shape(
    H,
    R,
    [
      [x - 32, y + 5],
      [x - 30, y - 22],
      [x - 17, y - 36],
      [x + 8, y - 34],
      [x + 24, y - 19],
      [x + 44, y - 8],
      [x + 43, y + 13],
      [x + 20, y + 24],
      [x - 11, y + 24]
    ],
    'sun',
    0.65
  );
  for (let q = 0; q < 15; q++)
    H.line(
      R,
      [
        [x - 25 + q * 4.4, y + 5 + Math.sin(q) * 4],
        [x - 22 + q * 4.4, y + 21]
      ],
      'coral',
      0.7,
      { tone: 0.7 }
    );
  shape(
    H,
    R,
    [
      [x - 18, y - 27],
      [x - 29, y - 52],
      [x - 22, y - 57],
      [x - 8, y - 31]
    ],
    'paper',
    1,
    0.8
  );
  shape(
    H,
    R,
    [
      [x + 5, y - 30],
      [x + 7, y - 54],
      [x + 16, y - 51],
      [x + 16, y - 26]
    ],
    'paper',
    1,
    0.8
  );
  oval(H, R, x + 8, y - 15, 11, 12, 'paper', 1);
  oval(H, R, x + 11, y - 14, 5, 6, 'blue', 0.85);
  H.dot(x + 13, y - 16, 1.6, 'paper', 1);
  oval(H, R, x + 31, y - 3, 15, 8, 'coral', 0.63);
  H.dot(x + 35, y - 6, 2, 'blue', 1);
  stroke(
    H,
    R,
    [
      [x + 12, y + 8],
      [x + 25, y + 13],
      [x + 41, y + 7]
    ],
    'blue',
    1.5
  );
  for (let q = 0; q < 5; q++)
    shape(
      H,
      R,
      [
        [x + 13 + q * 5, y + 10],
        [x + 16 + q * 5, y + 10],
        [x + 15 + q * 5, y + 16]
      ],
      'paper',
      1,
      0.4
    );
  for (const d of [-1, 1])
    stroke(
      H,
      R,
      [
        [x + 27, y + 1],
        [x + 43, y + d * 17],
        [x + 54, y + d * 18],
        [x + 57, y + d * 12]
      ],
      'teal',
      1.6
    );
  for (let q = 0; q < 8; q++)
    stroke(
      H,
      R,
      [
        [x - 13 + q * 5, y + 22],
        [x - 15 + q * 5, y + 32],
        [x - 10 + q * 5, y + 39]
      ],
      q % 2 ? 'coral' : 'sun',
      1.3
    );
  const mouth = [
    [x + 14, y + 12],
    [x + 39, y + 8],
    [x + 37, y + 21],
    [x + 21, y + 25]
  ];
  surface(H, R, mouth, 'blue', 0.85);
  surface(
    H,
    R,
    [
      [x + 14, y + 24],
      [x + 24, y + 27],
      [x + 41, y + 23],
      [x + 46, y + 17],
      [x + 40, y + 15],
      [x + 34, y + 20],
      [x + 22, y + 22]
    ],
    'coral',
    0.72
  );
  for (let n = 0; n < 4; n++)
    surface(
      H,
      R,
      [
        [x + 18 + n * 5, y + 12 - n],
        [x + 22 + n * 5, y + 11 - n],
        [x + 21 + n * 5, y + 18 - n]
      ],
      'paper',
      1,
      0.4
    );
  for (let n = 0; n < 14; n++) {
    const a = (n / 14) * TAU,
      rx = 14 + Math.sin(n * 2) * 3;
    H.line(
      R,
      [
        [x - 15 + Math.cos(a) * rx, y - 7 + Math.sin(a) * rx],
        [x - 15 + Math.cos(a) * (rx + 8), y - 7 + Math.sin(a) * (rx + 8)]
      ],
      'sun',
      1.8
    );
  }
  for (const dx of [-23, 11])
    for (let n = 0; n < 5; n++)
      H.line(
        R,
        [
          [x + dx - 3, y - 35 - n * 3],
          [x + dx + 4, y - 36 - n * 3]
        ],
        'teal',
        0.65
      );
}

const room = world(
  'hong-kong-tai-hang-dragon',
  'Tai Hang · The dragon waits',
  { floor: 'paper', tone: 1, wall: false, head: 70 },
  (H, R) => {
    boardFloor(H, R, 0, 0, 12, 12, 0.02, 'paper', 0.6);
    masonry(H, R, 'nw', 0, 12, 0, 4.53, 'paper');
    masonry(H, R, 'ne', 0, 12, 0, 4.53, 'teal', 0.17);
    windowBay(H, R, 'nw', 1.04, 5.27, 2.21, 1.96, { ink: 'teal', divisions: 4 });
    for (const i of [0.35, 5.57, 11.4]) timber(H, R, i, 0.18, 0.2, 0.3, 0.03, 4.39, 'sun');
    for (const i of [1.19, 4.2, 7.21, 10.22])
      bentTube(
        H,
        R,
        [
          [i, 0.3, 4.35],
          [i, 2.41, 4.02]
        ],
        3,
        'sun'
      );
    cabinetFrame(H, R, 2.56, 0.51, 8.69, 1.31, 0.12, 2.86, 4, 'teal', (i, j, w, d, z, h, n) => {
      timber(H, R, i, j, w, d, z + 1.22, 0.1, 'sun');
      for (let row = 0; row < 2; row++)
        for (let q = 0; q < 3; q++) {
          const [x, y] = H.p(i + 0.35 + q * 0.61, j + 0.63, z + 0.43 + row * 1.3);
          surface(H, R, ell(x, y, 12, 14), ['coral', 'teal', 'sun'][(q + n) % 3], 0.55);
          H.outline(R, ell(x, y, 7, 9), 'paper', 0.8);
        }
    });
    for (const [i, j] of [
      [2.57, 3.01],
      [4.54, 3.94],
      [6.65, 4.25],
      [8.78, 4.76]
    ])
      trestle(H, R, i, j);
    const segments = [
      [2.8, 3.36, 1.43, 0.68],
      [3.85, 3.75, 1.46, 0.82],
      [4.99, 4.12, 1.45, 0.93],
      [6.1, 4.4, 1.44, 1],
      [7.24, 4.72, 1.44, 1.08],
      [8.44, 5.1, 1.5, 1.14]
    ];
    for (const [i, j, z, s] of segments) {
      strawSection(H, R, i, j, z, s);
      bentTube(
        H,
        R,
        [
          [i, j, z - 0.1],
          [i + 0.05, j, 0.06]
        ],
        2,
        'teal'
      );
    }
    dragonHead(H, R, 9.65, 5.47, 1.66);
    for (let n = 0; n < 6; n++) {
      const [x, y] = H.p(2.01 - n * 0.16, 2.86 - n * 0.19, 1.28 - n * 0.045);
      surface(H, R, ell(x, y, 12 - n, 9 - n * 0.6), 'sun', 0.51);
    }
    benchFrame(H, R, 0.42, 7.77, 2.12, 3.27, 1.02, 'sun');
    for (let n = 0; n < 16; n++)
      bentTube(
        H,
        R,
        [
          [0.63 + n * 0.1, 8.03, 1.1],
          [0.77 + n * 0.11, 10.53, 1.1]
        ],
        1.2,
        n % 3 ? 'sun' : 'coral'
      );
    for (const j of [8.53, 10.14]) coiledLine(H, R, 1.36, j, 1.18, 17, 'teal');
    cabinetFrame(H, R, 4.11, 9.67, 3.82, 1.56, 0.05, 0.74, 3, 'sun', (i, j, w, d, z, h, n) => {
      for (let k = 0; k < 3; k++) coiledLine(H, R, i + w * 0.5, j + 0.34 + k * 0.35, z + 0.12, 10, ['teal', 'coral', 'sun'][n]);
    });
    const [x, y] = H.p(8.99, 9.52, 0.79);
    for (let n = 0; n < 9; n++) {
      const a = (n * TAU) / 9;
      H.line(
        R,
        [
          [x + Math.cos(a) * 28, y + Math.sin(a) * 18],
          [x + Math.cos(a) * 28, y + Math.sin(a) * 18 - 32]
        ],
        'sun',
        1.2
      );
    }
    for (const dy of [0, -15, -32]) H.outline(R, ell(x, y + dy, 28, 18), 'teal', 1.8);
    benchFrame(H, R, 8.31, 9.03, 2.1, 1.75, 0.46, 'teal');
    handTool(H, R, 5.1, 10.51, 0.85, 'scissors', 'coral');
    foldedCloth(H, R, 6.91, 9.87, 0.83, 1.06, 0.84, 'paper', 'teal');
    vessel(H, R, 10.77, 8.32, 0.03, 15, 25, 'sun');
    for (let n = 0; n < 9; n++) {
      const [a, b] = H.p(10.68 + (n % 3) * 0.09, 8.26 + Math.floor(n / 3) * 0.08, 0.8);
      H.line(
        R,
        [
          [a, b],
          [a + (n - 4) * 1.5, b - 26 - (n % 3) * 8]
        ],
        'sun',
        0.9
      );
    }
    pendant(H, R, 6.81, 3.34, 4.4, 3.31, 'coral', 1.12);
  },
  (H, R, t) => {
    const u = cycle(t, 14),
      pull = Math.sin(Math.PI * Math.max(0, Math.min(1, (u - 0.13) / 0.67))) ** 2;
    actor(
      H,
      R,
      6.27,
      6.29,
      t,
      'hongKongDragonSupport',
      {
        shirt: ['coral', 0.7],
        hairStyle: 'short',
        face: 'nw',
        prop(h, r, p) {
          const [x, y] = p.nearHand,
            target = h.p(6.55, 4.25, 1.39);
          stroke(h, r, [target, [target[0] + 2, target[1] + 19 - pull * 5], [x, y]], 'teal', 1.6);
          for (let q = 0; q < 4; q++)
            stroke(
              h,
              r,
              [
                [x + q * 2, y],
                [x + q * 2 - 4, y + 13],
                [x + q * 2 - 2, y + 23]
              ],
              'sun',
              0.85
            );
        }
      },
      0,
      1.3
    );
    actor(
      H,
      R,
      3.2,
      5.17,
      0,
      'hold',
      {
        shirt: ['paper', 1],
        hairStyle: 'short',
        face: 'se',
        prop(h, r, p) {
          const [x, y] = p.nearHand;
          for (let q = 0; q < 6; q++)
            h.line(
              r,
              [
                [x - 13, y - 11 + q * 2],
                [x + 14, y - 5 + q * 2]
              ],
              'sun',
              1.1
            );
          h.line(
            r,
            [
              [x - 2, y - 8],
              [x - 4, y + 6]
            ],
            'teal',
            1.4
          );
        }
      },
      0.01,
      1.2
    );
  }
);
room.loopSeconds = 14;
export default room;
