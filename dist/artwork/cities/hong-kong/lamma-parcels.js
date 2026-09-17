import { surface, timber, metal, bentTube, benchFrame, slattedSeat } from '../materials.js';
import { rackFrame, boardFloor } from '../structure.js';
import { caster } from '../joinery.js';
import { shallowTray, coiledLine, handTool, boundBook } from '../furnishings.js';
import { TAU, actor, box, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const hold = { ...rest, lean: -5, head: 15, al: 64, ar: 65, el: 50, er: 51 };
const balance = { ...hold, lean: 8, head: 7, al: 77, ar: 80, el: 27, er: 33 };
FIGURES.clips.hongKongLammaBalance = {
  dur: 16,
  keys: [
    [0, hold],
    [0.15, hold],
    [0.33, balance],
    [0.51, balance],
    [0.65, { ...balance, head: 19 }],
    [0.83, hold],
    [1, hold]
  ]
};
const sit = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, al: 43, ar: 47, el: 75, er: 76, head: 16 };
FIGURES.clips.hongKongLammaWait = {
  dur: 16,
  keys: [
    [0, sit],
    [0.42, sit],
    [0.57, { ...sit, head: -10 }],
    [0.74, { ...sit, head: -10 }],
    [0.88, sit],
    [1, sit]
  ]
};

function carton(H, R, i, j, w, d, z, height, ink = 'sun') {
  box(H, R, i, j, w, d, z, height, ink, 0.49);
  H.line(R, [H.p(i + w * 0.5, j, z + height + 0.01), H.p(i + w * 0.5, j + d, z + height + 0.01), H.p(i + w * 0.5, j + d, z + 0.03)], 'paper', 2.3);
  H.line(R, [H.p(i + 0.04, j + d * 0.52, z + height + 0.01), H.p(i + w - 0.04, j + d * 0.52, z + height + 0.01)], 'blue', 0.6, { tone: 0.55 });
  shape(H, R, H.faceI(i + w * 0.16, j + d + 0.025, w * 0.25, z + height * 0.27, z + height * 0.55), 'paper', 1, 0.4);
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
  const [x, y] = H.p(i, j, 0.06);
  for (const dx of [-32, 34]) {
    oval(H, R, x + dx, y, 21, 24, 'paper', 1);
    H.outline(R, ell(x + dx, y, 17, 20), 'blue', 0.9);
    for (let k = 0; k < 6; k++) {
      const a = (k * TAU) / 6;
      H.line(
        R,
        [
          [x + dx, y],
          [x + dx + Math.cos(a) * 18, y + Math.sin(a) * 21]
        ],
        'blue',
        0.55,
        { tone: 0.62 }
      );
    }
  }
  stroke(
    H,
    R,
    [
      [x - 32, y],
      [x - 11, y - 29],
      [x + 3, y],
      [x - 32, y],
      [x + 18, y - 30],
      [x + 3, y],
      [x + 34, y]
    ],
    'coral',
    2.6
  );
  H.line(
    R,
    [
      [x + 18, y - 30],
      [x + 34, y],
      [x + 16, y - 42],
      [x + 27, y - 44]
    ],
    'blue',
    1.7
  );
  H.line(
    R,
    [
      [x - 11, y - 29],
      [x - 12, y - 39]
    ],
    'blue',
    1.8
  );
  H.line(
    R,
    [
      [x - 23, y - 40],
      [x - 4, y - 38]
    ],
    'blue',
    3.2
  );
  H.outline(R, ell(x + 3, y, 6, 6), 'blue', 1);
  stroke(
    H,
    R,
    [
      [x + 2, y],
      [x + 10, y + 10],
      [x + 18, y + 10]
    ],
    'blue',
    1.5
  );
  shape(
    H,
    R,
    [
      [x + 15, y - 45],
      [x + 39, y - 42],
      [x + 35, y - 25],
      [x + 20, y - 28]
    ],
    'sun',
    0.52
  );
  for (let k = 0; k < 5; k++)
    H.line(
      R,
      [
        [x + 18 + k * 4, y - 41],
        [x + 21 + k * 3, y - 29]
      ],
      'blue',
      0.6
    );
}

const room = world(
  'hong-kong-lamma-parcels',
  'Lamma · The last parcel fits',
  { floor: 'paper', tone: 0.85, wall: false, head: 55 },
  (H, R) => {
    surface(H, R, H.tile(0.04, 0.04, 11.92, 2.04, 0.02), 'teal', 0.38);
    for (let n = 0; n < 14; n++) H.line(R, [H.p(0.23 + n * 0.83, 0.8, 0.03), H.p(0.69 + n * 0.83, 0.8, 0.03)], 'paper', 1);
    timber(H, R, 0.09, 2.15, 11.81, 9.7, 0.04, 0.12, 'paper');
    for (const j of [2.23, 5.23, 8.25, 11.62]) H.line(R, [H.p(0.14, j, 0.19), H.p(11.8, j, 0.19)], 'blue', 0.65, { tone: 0.3 });
    for (const i of [0.48, 6.14, 11.37]) {
      metal(H, R, i, 2.42, 0.18, 0.23, 0.18, 3.53, 'teal');
      metal(H, R, i - 0.09, 2.33, 0.36, 0.4, 0.18, 0.14, 'blue');
      bentTube(
        H,
        R,
        [
          [i, 2.51, 2.94],
          [i, 3.54, 3.7]
        ],
        2.1,
        'teal'
      );
    }
    for (let n = 0; n < 18; n++) {
      const i = 0.14 + n * 0.65;
      surface(
        H,
        R,
        [H.p(i, 1.98, 3.54), H.p(i + 0.63, 1.98, 3.54), H.p(i + 0.63, 3.47, 4.08), H.p(i, 3.47, 4.08)],
        n % 5 === 0 ? 'coral' : 'paper',
        0.82,
        0.5
      );
      surface(H, R, [H.p(i, 3.47, 4.08), H.p(i + 0.63, 3.47, 4.08), H.p(i + 0.63, 4.25, 3.81), H.p(i, 4.25, 3.81)], 'teal', 0.28, 0.5);
    }
    bentTube(
      H,
      R,
      [
        [0.12, 4.25, 3.81],
        [11.86, 4.25, 3.81]
      ],
      3,
      'teal'
    );
    bentTube(
      H,
      R,
      [
        [11.7, 4.24, 3.8],
        [11.7, 4.4, 0.37],
        [11.34, 4.7, 0.2]
      ],
      2,
      'teal'
    );
    slattedSeat(H, R, 0.91, 3.58, 3.84, 0.18, 'sun', 0.68);
    rackFrame(H, R, 8.85, 2.73, 2.59, 1.55, 0.22, [0.08, 0.96, 1.86], 'teal', (i, j, w, d, z, row) => {
      for (let n = 0; n < 2; n++) carton(H, R, i + n * 1.23, j, 0.98, d - 0.04, z, 0.57 + (row % 2) * 0.17, n % 2 ? 'paper' : 'sun');
    });
    for (const i of [3.59, 7.44]) for (const j of [5.2, 7.24]) caster(H, R, i, j);
    metal(H, R, 3.35, 4.87, 4.53, 2.72, 0.42, 0.19, 'teal');
    boardFloor(H, R, 3.43, 4.96, 4.35, 2.51, 0.63, 'sun', 0.31);
    for (const i of [3.47, 7.64])
      bentTube(
        H,
        R,
        [
          [i, 5.01, 0.62],
          [i, 7.31, 0.62],
          [i, 8.2, 1.84]
        ],
        3,
        'teal'
      );
    bentTube(
      H,
      R,
      [
        [3.47, 8.2, 1.84],
        [7.64, 8.2, 1.84]
      ],
      3,
      'teal'
    );
    for (const [i, j, w, d, z, h, c] of [
      [3.61, 5.03, 1.54, 1.28, 0.65, 0.97, 'sun'],
      [5.31, 5.03, 2.12, 1.34, 0.65, 0.7, 'paper'],
      [6.41, 6.53, 1.02, 0.82, 0.65, 0.99, 'coral'],
      [3.76, 5.18, 1.24, 1.05, 1.64, 0.56, 'coral']
    ])
      carton(H, R, i, j, w, d, z, h, c);
    bentTube(
      H,
      R,
      [
        [3.59, 5.36, 0.62],
        [3.59, 5.36, 2.21],
        [5.06, 5.36, 2.21],
        [5.06, 5.36, 0.65]
      ],
      1.8,
      'sun'
    );
    benchFrame(H, R, 9.35, 6.25, 2.12, 2.38, 1.24, 'teal');
    shallowTray(H, R, 9.51, 6.42, 1.81, 1.21, 1.26, 'sun');
    boundBook(H, R, 9.62, 7.84, 1.21, 0.52, 1.27, 'teal');
    handTool(H, R, 10.78, 7.95, 1.3, 'scissors', 'coral');
    carton(H, R, 9.63, 6.61, 1.4, 0.83, 0.35, 0.61, 'sun');
    crate(H, R, 9.46, 9.36, 0.2);
    crate(H, R, 9.46, 9.36, 1.03);
    bicycle(H, R, 1.82, 7.83);
    bentTube(
      H,
      R,
      [
        [0.72, 6.12, 0.2],
        [0.72, 8.74, 0.2],
        [0.72, 8.74, 1.38],
        [0.72, 6.12, 1.38],
        [0.72, 6.12, 0.2]
      ],
      2,
      'teal'
    );
    for (let n = 0; n < 4; n++) H.line(R, [H.p(0.73, 6.54 + n * 0.56, 0.23), H.p(0.73, 6.54 + n * 0.56, 1.35)], 'sun', 1.8);
    coiledLine(H, R, 2.27, 10.47, 0.2, 18, 'coral');
    carton(H, R, 4.23, 10.12, 1.28, 0.95, 0.19, 0.37, 'paper');
  },
  (H, R, t) => {
    const u = cycle(t, 16);
    H.at(5.21, 8.12, 0.18, (HH) =>
      actor(
        HH,
        R,
        5.21,
        8.12,
        t,
        'hongKongLammaBalance',
        {
          shirt: ['sun', 0.61],
          hairStyle: 'cap',
          face: 'nw',
          prop(h, r, p) {
            const x = (p.nearHand[0] + p.farHand[0]) / 2,
              y = (p.nearHand[1] + p.farHand[1]) / 2;
            shape(
              h,
              r,
              [
                [x - 24, y - 12],
                [x + 6, y - 21],
                [x + 26, y - 9],
                [x - 5, y + 1]
              ],
              'sun',
              0.55
            );
            shape(
              h,
              r,
              [
                [x - 24, y - 12],
                [x - 5, y + 1],
                [x - 5, y + 20],
                [x - 24, y + 7]
              ],
              'coral',
              0.48
            );
            shape(
              h,
              r,
              [
                [x - 5, y + 1],
                [x + 26, y - 9],
                [x + 26, y + 10],
                [x - 5, y + 20]
              ],
              'sun',
              0.56
            );
            h.line(
              r,
              [
                [x - 14, y - 16],
                [x + 10, y - 4],
                [x + 10, y + 15]
              ],
              'paper',
              2.5
            );
            h.line(r, [p.nearHand, [x - 21, y + 7]], 'coral', 2.5);
            h.line(r, [p.farHand, [x + 24, y + 9]], 'coral', 2.5);
          }
        },
        0.18,
        1.38
      )
    );
    H.at(2.47, 4.16, 0.2, (HH) =>
      actor(
        HH,
        R,
        2.47,
        4.16,
        t,
        'hongKongLammaWait',
        {
          shirt: ['teal', 0.58],
          hairStyle: 'pony',
          face: 'se',
          prop(h, r, p) {
            const [x, y] = p.nearHand;
            shape(
              h,
              r,
              [
                [x - 7, y - 11],
                [x + 5, y - 8],
                [x + 5, y + 6],
                [x - 7, y + 3]
              ],
              'blue',
              0.75,
              0.6
            );
            shape(
              h,
              r,
              [
                [x - 5, y - 8],
                [x + 3, y - 6],
                [x + 3, y + 2],
                [x - 5, y]
              ],
              'paper',
              0.94,
              0.35
            );
          }
        },
        0.2,
        1.28
      )
    );
    for (let k = 0; k < 3; k++) {
      const [x, y] = H.p(5.2 + k * 2.12, 0.9, 0.06);
      stroke(
        H,
        R,
        [
          [x - 15, y],
          [x + Math.sin(u * TAU + k) * 3, y - 2],
          [x + 17, y]
        ],
        'paper',
        0.9,
        0.68
      );
    }
  }
);

room.loopSeconds = 16;
export default room;
