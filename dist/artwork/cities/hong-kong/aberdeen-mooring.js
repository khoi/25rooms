import { surface, timber, metal, vessel, bentTube, drape, benchFrame, spokedWheel, slattedSeat } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';

import { shallowTray, foldedCloth, coiledLine, handTool } from '../furnishings.js';
import { actor, cycle, ell, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const hold = { ...rest, lean: -7, al: 55, el: 58, ar: 58, er: 54, head: 13 };
FIGURES.clips.hongKongMooring = {
  dur: 16,
  keys: [
    [0, hold],
    [0.12, hold],
    [0.3, { ...hold, lean: -14, ar: 83, er: 8, al: 66, el: 24 }],
    [0.48, { ...hold, lean: -12, ar: 73, er: 25, al: 56, el: 45 }],
    [0.66, hold],
    [0.82, { ...hold, head: -12 }],
    [1, hold]
  ]
};

function ropeCoil(H, R, x, y, rx, ry, ink = 'sun') {
  for (let k = 0; k < 5; k++) H.outline(R, ell(x + k * 0.7, y - k * 0.4, rx - k * 2.1, ry - k * 0.8), ink, 2, { tone: 0.8, amp: 0.15 });
}

function deck(H, R) {
  const rim = [];
  for (let n = 0; n <= 30; n++) {
    const f = n / 30;
    rim.push([4.56 + Math.sin(f * Math.PI) ** 0.47 * 2.69, 1.13 + 9.61 * f]);
  }
  for (let n = 30; n >= 0; n--) {
    const f = n / 30;
    rim.push([4.56 - Math.sin(f * Math.PI) ** 0.47 * 2.69, 1.13 + 9.61 * f]);
  }
  surface(
    H,
    R,
    rim.map(([i, j]) => H.p(i, j, 0.18)),
    'blue',
    0.72,
    1.2
  );
  surface(
    H,
    R,
    rim.map(([i, j]) => H.p(i, j, 0.66)),
    'coral',
    0.65,
    1.2
  );
  const inside = rim.map(([i, j]) => H.p(4.56 + (i - 4.56) * 0.89, 1.48 + (j - 1.13) * 0.92, 0.68));
  surface(H, R, inside, 'sun', 0.21);
  H.clip(inside, () => boardFloor(H, R, 1.9, 1.5, 5.4, 9, 0.69, 'sun', 0.38));
  for (const j of [2.73, 4.97, 8.54]) {
    bentTube(
      H,
      R,
      [
        [2.3, j, 0.69],
        [2.51, j, 0.21],
        [4.54, j, 0.08],
        [6.65, j, 0.21],
        [6.85, j, 0.69]
      ],
      1.3,
      'sun'
    );
  }
  for (const j of [3.9, 6.51, 8.5]) {
    const [x, y] = H.p(7.12, j, 0.46);
    surface(H, R, ell(x, y + 9, 9, 15), 'blue', 0.9);
    surface(H, R, ell(x, y + 9, 4, 9), 'teal', 0.43);
    H.line(R, [H.p(7.01, j, 0.77), [x, y]], 'sun', 1.3);
  }
  for (const j of [2.15, 5.06]) {
    const hoop = [];
    for (let n = 0; n <= 16; n++) {
      const f = n / 16;
      hoop.push([2.43 + 4.25 * f, j, 2.45 + Math.sin(f * Math.PI) * 0.83]);
    }
    bentTube(H, R, [[2.43, j, 0.73], ...hoop, [6.68, j, 0.73]], 2.5, 'teal');
  }
  for (let n = 0; n < 12; n++) {
    const a = n / 12,
      b = (n + 1) / 12;
    surface(
      H,
      R,
      [
        H.p(2.43 + 4.25 * a, 1.84, 2.45 + Math.sin(a * Math.PI) * 0.83),
        H.p(2.43 + 4.25 * b, 1.84, 2.45 + Math.sin(b * Math.PI) * 0.83),
        H.p(2.43 + 4.25 * b, 4.32, 2.45 + Math.sin(b * Math.PI) * 0.83),
        H.p(2.43 + 4.25 * a, 4.32, 2.45 + Math.sin(a * Math.PI) * 0.83)
      ],
      n % 3 ? 'teal' : 'paper',
      0.45,
      0.5
    );
  }
  drape(H, R, 3.16, 3.94, 0.7, 0.38, 3.09, 0.39, 'coral');
  slattedSeat(H, R, 2.73, 2.58, 3.81, 0.72, 'sun', 0.45);
  metal(H, R, 2.68, 4.74, 1.23, 1.12, 0.7, 0.5, 'teal');
  surface(H, R, H.tile(2.78, 4.83, 1.03, 0.94, 1.22), 'paper', 1);
  for (const i of [2.87, 3.58]) metal(H, R, i, 5.87, 0.12, 0.14, 0.74, 0.26, 'sun');
  timber(H, R, 4.87, 3.56, 0.31, 0.39, 0.73, 1.02, 'sun');
  const [x, y] = H.p(5.06, 3.8, 1.82);
  spokedWheel(H, R, x, y, 17, 'sun', 0.3, 0.72);
  vessel(H, R, 3.01, 6.26, 0.71, 11, 17, 'teal');
  ropeCoil(H, R, ...H.p(4.6, 7.95, 0.73), 25, 10);
  bentTube(
    H,
    R,
    [
      [2.54, 7.02, 0.77],
      [2.84, 9.14, 0.81]
    ],
    3,
    'sun'
  );
  surface(H, R, [H.p(2.66, 8.94, 0.83), H.p(3.02, 8.89, 0.83), H.p(3.15, 9.84, 0.83), H.p(2.83, 9.87, 0.83)], 'coral', 0.55);
  const [lx, ly] = H.p(2.29, 6.8, 1.3);
  surface(H, R, ell(lx, ly, 18, 20), 'paper', 1);
  surface(H, R, ell(lx, ly, 11, 13), 'teal', 0.3);
  for (const a of [0, 1.57, 3.14, 4.71])
    H.line(
      R,
      [
        [lx + Math.cos(a) * 12, ly + Math.sin(a) * 13],
        [lx + Math.cos(a) * 18, ly + Math.sin(a) * 19]
      ],
      'coral',
      4
    );
  bentTube(
    H,
    R,
    [
      [2.38, 6.8, 0.75],
      [2.29, 6.8, 1.7]
    ],
    1.1,
    'sun'
  );
  vessel(H, R, 5.1, 9.61, 0.71, 11, 18, 'paper');
  foldedCloth(H, R, 3.49, 5.06, 0.6, 0.39, 1.26, 'paper', 'coral');
}

const room = world(
  'hong-kong-aberdeen-mooring',
  'Aberdeen · First rope ashore',
  { floor: 'teal', tone: 0.28, wall: false, head: 45 },
  (H, R) => {
    surface(H, R, H.tile(0, 0, 12, 12, 0.01), 'teal', 0.24);
    for (let n = 0; n < 38; n++) {
      const i = 0.2 + (n % 6) * 1.8,
        j = 0.3 + Math.floor(n / 6) * 1.8;
      H.line(R, [H.p(i, j, 0.02), H.p(i + 0.7, j + 0.04, 0.02)], n % 3 ? 'paper' : 'blue', 0.8, { tone: 0.4 });
    }
    for (const j of [1, 4.3, 7.6, 10.9])
      for (const i of [8.53, 11.36]) {
        timber(H, R, i, j, 0.23, 0.31, -0.2, 1.08, 'teal');
        bentTube(
          H,
          R,
          [
            [i, j, 0.08],
            [i, j + 1.55, 0.83]
          ],
          3,
          'sun'
        );
      }
    timber(H, R, 8.38, 0.36, 3.3, 11.12, 0.68, 0.17, 'sun');
    boardFloor(H, R, 8.38, 0.36, 3.3, 11.12, 0.87, 'paper', 0.42);
    for (const j of [2.02, 8.27, 10.67]) {
      metal(H, R, 8.58, j - 0.18, 0.36, 0.4, 0.87, 0.47, 'teal');
      metal(H, R, 8.43, j - 0.13, 0.67, 0.2, 1.33, 0.1, 'blue');
      ropeCoil(H, R, ...H.p(8.76, j, 1.17), 10, 5);
    }
    for (const j of [0.72, 3.44, 9.68]) {
      bentTube(
        H,
        R,
        [
          [11.44, j, 0.89],
          [11.44, j, 2.02]
        ],
        2.4,
        'teal'
      );
      surface(H, R, ell(...H.p(11.44, j, 2.05), 3, 3), 'sun', 0.8);
    }
    bentTube(
      H,
      R,
      [
        [11.44, 0.72, 2.02],
        [11.44, 3.44, 2.02]
      ],
      2.3,
      'teal'
    );
    cabinetFrame(H, R, 9.28, 0.57, 2.01, 1.18, 0.93, 1.14, 2, 'teal', (i, j, w, d, z, h, n) => {
      for (let q = 0; q < 2; q++) {
        timber(H, R, i, j, w, d, z + q * 0.41, 0.08, 'sun');
        coiledLine(H, R, i + w / 2, j + d * 0.55, z + q * 0.41 + 0.1, 10, n ? 'coral' : 'sun');
      }
    });
    vessel(H, R, 10.82, 1.22, 2.13, 7, 18, 'sun');
    benchFrame(H, R, 9.28, 3.15, 2.03, 1.47, 1.93, 'teal');
    shallowTray(H, R, 9.43, 3.32, 1.68, 1.1, 1.95, 'paper');
    handTool(H, R, 9.84, 3.8, 2.14, 'brush', 'coral');
    handTool(H, R, 10.5, 3.8, 2.14, 'spanner', 'sun');
    drape(H, R, 9.5, 4.15, 0.54, 0.43, 1.96, 0.54, 'paper');
    for (const i of [8.35, 9.03])
      bentTube(
        H,
        R,
        [
          [i, 10.97, 0.01],
          [i, 10.97, 1.3]
        ],
        2.5,
        'teal'
      );
    for (let n = 0; n < 5; n++)
      bentTube(
        H,
        R,
        [
          [8.35, 10.97, 0.1 + n * 0.23],
          [9.03, 10.97, 0.1 + n * 0.23]
        ],
        2,
        'sun'
      );
    coiledLine(H, R, 10.5, 8.84, 0.89, 25, 'teal');
    vessel(H, R, 10.85, 10.18, 0.9, 12, 24, 'paper');
    deck(H, R);
  },
  (H, R, t) => {
    const u = cycle(t, 16);
    for (const [i, j, phase] of [
      [1, 7.2, 0],
      [7.5, 10.8, 0.35],
      [6.5, 0.7, 0.65]
    ]) {
      const q = (u + phase) % 1;
      const [x, y] = H.p(i, j, 0.04);
      H.opacity(Math.sin(q * Math.PI) * 0.6, () => H.outline(R, ell(x, y, 12 + q * 23, 3 + q * 5), 'paper', 1, { amp: 0.1 }));
    }
    H.at(6.36, 7.43, 0.68, (HH) =>
      actor(
        HH,
        R,
        6.36,
        7.43,
        u * 16,
        'hongKongMooring',
        {
          shirt: ['paper', 1],
          pants: ['teal', 0.7],
          hairStyle: 'cap',
          prop: (h, r, p) => {
            const [x, y] = p.nearHand;
            const end = h.p(8.76, 8.27, 1.4);
            stroke(h, r, [end, [end[0] - 17, end[1] + 15], [x + 26, y + 17], [x, y]], 'sun', 2.4);
            stroke(h, r, [p.farHand, [x - 10, y + 21], h.p(4.6, 7.95, 0.73)], 'sun', 2);
            ropeCoil(h, r, x + 2, y + 11, 14, 7);
          }
        },
        0.68,
        1.3
      )
    );
    H.at(10.17, 6.0, 0.89, (HH) =>
      actor(
        HH,
        R,
        10.17,
        6.0,
        u * 3,
        'hold',
        {
          shirt: ['coral', 0.67],
          hairStyle: 'short',
          prop: (h, r, p) => {
            const [x, y] = p.nearHand;
            shape(
              h,
              r,
              [
                [x - 8, y],
                [x + 7, y],
                [x + 5, y + 14],
                [x - 6, y + 14]
              ],
              'sun',
              0.57
            );
            stroke(
              h,
              r,
              [
                [x - 7, y],
                [x - 4, y - 10],
                [x + 4, y - 10],
                [x + 7, y]
              ],
              'blue',
              1
            );
          }
        },
        0.89,
        1.2
      )
    );
  }
);
room.loopSeconds = 16;
room.stillTime = 0;
export default room;
