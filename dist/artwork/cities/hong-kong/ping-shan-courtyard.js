import { surface, timber, vessel, benchFrame, branchSpray } from '../materials.js';
import { masonry, archedBay } from '../structure.js';

import { shallowTray, foldedCloth } from '../furnishings.js';
import { TAU, actor, box, cycle, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -9, head: 17, al: 44, ar: 72, el: 42, er: 27 };
const hover = { ...seated, ar: 82, er: 14, lean: -12 };
FIGURES.clips.hongKongPingShanConsider = {
  dur: 18,
  keys: [
    [0, seated],
    [0.16, seated],
    [0.32, hover],
    [0.47, hover],
    [0.58, { ...hover, head: -8 }],
    [0.72, { ...seated, ar: 61, er: 49, head: -8 }],
    [0.86, seated],
    [1, seated]
  ]
};
const companion = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, head: 9, al: 24, ar: 41, el: 28, er: 50 };
FIGURES.clips.hongKongPingShanRespond = {
  dur: 18,
  keys: [
    [0, companion],
    [0.35, companion],
    [0.49, { ...companion, ar: 87, er: 17, head: -3 }],
    [0.62, companion],
    [0.71, { ...companion, ar: 34, er: 39 }],
    [0.78, companion],
    [1, companion]
  ]
};

function stool(H, R, i, j, ink = 'sun', repaired = false) {
  benchFrame(H, R, i, j, 1.15, 1.07, 0.67, ink);
  for (const x of [i + 0.1, i + 1.02]) H.line(R, [H.p(x, j + 0.08, 0.3), H.p(x, j + 0.94, 0.3)], 'blue', 1.1);
  if (repaired) for (let k = 0; k < 3; k++) box(H, R, i + 0.03, j + 0.81, 0.26, 0.28, k * 0.022, 0.02, k % 2 ? 'coral' : 'paper', 0.54);
}

function cup(H, R, i, j, z) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y + 2, 8, 3, 'paper', 1);
  shape(
    H,
    R,
    [
      [x - 5, y - 10],
      [x + 5, y - 10],
      [x + 4, y + 1],
      [x - 4, y + 1]
    ],
    'paper',
    1,
    0.6
  );
  oval(H, R, x, y - 10, 5, 2, 'sun', 0.45);
}

function courtyardTree(H, R) {
  const [x, y] = H.p(2.24, 2.66, 0.15);
  oval(H, R, x, y, 43, 20, 'blue', 0.22);
  oval(H, R, x, y - 4, 39, 17, 'paper', 1);
  oval(H, R, x, y - 5, 32, 13, 'sun', 0.31);
  shape(
    H,
    R,
    [
      [x - 7, y - 6],
      [x + 9, y - 6],
      [x + 3, y - 63],
      [x + 23, y - 94],
      [x + 17, y - 98],
      [x - 5, y - 71],
      [x - 17, y - 103],
      [x - 23, y - 99],
      [x - 7, y - 59]
    ],
    'coral',
    0.41
  );
  stroke(
    H,
    R,
    [
      [x - 3, y - 8],
      [x - 2, y - 58],
      [x + 21, y - 94]
    ],
    'blue',
    0.8,
    0.64
  );
  stroke(
    H,
    R,
    [
      [x - 3, y - 53],
      [x - 23, y - 83],
      [x - 37, y - 89]
    ],
    'blue',
    2.4,
    0.63
  );
  stroke(
    H,
    R,
    [
      [x + 2, y - 66],
      [x + 29, y - 83],
      [x + 45, y - 87]
    ],
    'blue',
    2.1,
    0.63
  );
  for (const [dx, dy] of [
    [-39, -76],
    [-23, -97],
    [2, -105],
    [25, -101],
    [43, -84]
  ]) {
    stroke(
      H,
      R,
      [
        [x, y - 52],
        [x + dx * 0.6, y + dy + 13],
        [x + dx, y + dy]
      ],
      'sun',
      2
    );
    for (let n = 0; n < 5; n++) branchSpray(H, R, x + dx + (n - 2) * 8, y + dy + (n % 2) * 9, 0.65 + (n % 2) * 0.12, 'teal', n % 2 ? 1 : -1);
  }
  for (let n = 0; n < 7; n++)
    stroke(
      H,
      R,
      [
        [x - 3, y - 12],
        [x + (n - 3) * 5, y - 3],
        [x + (n - 3) * 9, y + 2]
      ],
      'coral',
      1.2
    );
  for (let k = 0; k < 8; k++) oval(H, R, ...H.p(2.61 + (k % 4) * 0.61, 3.56 + Math.floor(k / 4) * 0.46, 0.023), 13 + (k % 3) * 4, 5, 'teal', 0.11);
}

const room = world(
  'hong-kong-ping-shan-courtyard',
  'Ping Shan · Shade for two',
  { floor: 'paper', tone: 1, wall: false, head: 70 },
  (H, R) => {
    for (let row = 0; row < 12; row++)
      for (let col = 0; col < 8; col++) {
        const i = col * 1.49 + (row % 2) * 0.36,
          j = row * 0.98;
        if (i < 11.8) surface(H, R, H.tile(i, j, Math.min(1.44, 12 - i), 0.94, 0.025), 'sun', (row + col) % 5 === 0 ? 0.2 : 0.08, 0.5);
      }
    masonry(H, R, 'nw', 0.1, 11.78, 0, 3.68, 'coral', 0.35);
    masonry(H, R, 'ne', 0.1, 11.78, 0, 3.05, 'paper', 1);
    const P = (u, z) => H.p(u, 0.22, z),
      arch = [P(6.72, 0.1), P(10.76, 0.1), P(10.76, 1.67)];
    for (let n = 0; n <= 32; n++) {
      const a = (n * Math.PI) / 32;
      arch.push(P(8.74 + Math.cos(a) * 2.02, 1.67 + Math.sin(a) * 1.08));
    }
    surface(H, R, arch, 'teal', 0.72, 2.4);
    H.clip(arch, () => {
      surface(H, R, H.faceI(6.8, 0.23, 3.89, 0.18, 2.68), 'sun', 0.25);
      for (const i of [7.03, 7.78, 8.53, 9.28, 10.03]) timber(H, R, i, 0.27, 0.14, 0.22, 0.18, 2.8, 'teal');
      branchSpray(H, R, ...H.p(9.24, 0.3, 0.78), 1.1, 'teal');
    });
    timber(H, R, 6.61, 0.14, 4.27, 0.74, 0.04, 0.19, 'paper');
    for (let n = 0; n < 23; n++) {
      const j = 0.08 + n * 0.51;
      surface(
        H,
        R,
        [H.p(0.07, j, 3.76), H.p(0.07, j + 0.46, 3.76), H.p(0.97, j + 0.46, 3.57), H.p(0.97, j, 3.57)],
        n % 4 ? 'teal' : 'blue',
        0.58,
        0.7
      );
    }
    for (let n = 0; n < 22; n++) {
      const i = 0.14 + n * 0.53;
      surface(H, R, [H.p(i, 0.03, 3.11), H.p(i + 0.48, 0.03, 3.11), H.p(i + 0.48, 0.89, 2.94), H.p(i, 0.89, 2.94)], 'teal', 0.52, 0.7);
    }
    archedBay(H, R, 'nw', 5.16, 2.63, 1.19, 1.68, 'teal', (P) => {
      for (let n = 0; n < 8; n++) H.line(R, [P(0.18 + n * 0.32, 0.1), P(0.18 + n * 0.32, 1.8)], 'coral', 1.3);
    });
    courtyardTree(H, R);
    for (const j of [5.13, 8.88]) timber(H, R, 0.6, j, 0.88, 0.42, 0.05, 0.48, 'paper');
    timber(H, R, 0.43, 5.02, 1.24, 4.4, 0.54, 0.2, 'paper');
    vessel(H, R, 1.7, 10.21, 0.06, 15, 28, 'teal');
    branchSpray(H, R, ...H.p(1.7, 10.21, 1.02), 0.83, 'teal');
    timber(H, R, 6.24, 5.56, 1.04, 1.1, 0.06, 0.6, 'paper');
    timber(H, R, 5.37, 4.88, 2.8, 2.4, 0.67, 0.19, 'paper');
    surface(H, R, H.tile(5.62, 5.11, 2.3, 1.92, 0.875), 'sun', 0.23);
    for (let n = 0; n < 9; n++) {
      H.line(R, [H.p(5.79 + n * 0.26, 5.25, 0.89), H.p(5.79 + n * 0.26, 6.86, 0.89)], 'coral', 0.6);
      H.line(R, [H.p(5.79, 5.25 + n * 0.2, 0.89), H.p(7.87, 5.25 + n * 0.2, 0.89)], 'coral', 0.6);
    }
    for (const [i, j, ink] of [
      [5.79, 5.45, 'coral'],
      [6.57, 5.25, 'blue'],
      [7.35, 6.65, 'blue'],
      [7.61, 6.05, 'coral'],
      [6.31, 6.65, 'coral'],
      [6.83, 6.05, 'blue']
    ]) {
      vessel(H, R, i, j, 0.9, 3.6, 2, ink);
      H.dot(...H.p(i, j, 0.98), 1.2, 'paper', 1);
    }
    stool(H, R, 5.4, 7.8, 'sun', true);
    stool(H, R, 8.34, 5.31, 'teal');
    benchFrame(H, R, 8.89, 8.27, 2.12, 1.23, 0.84, 'sun');
    shallowTray(H, R, 9.12, 8.43, 1.42, 0.76, 0.87, 'teal');
    cup(H, R, 9.3, 8.62, 0.9);
    cup(H, R, 10.07, 8.92, 0.9);
    vessel(H, R, 9.84, 8.54, 0.89, 8, 13, 'coral');
    foldedCloth(H, R, 9.86, 9.22, 0.85, 0.63, 0.9, 'paper', 'blue');
    for (const [i, j] of [
      [3.29, 9.42],
      [4.2, 10.68],
      [8.09, 10.91],
      [10.62, 5.66]
    ])
      H.line(R, [H.p(i, j, 0.04), H.p(i + 0.22, j + 0.3, 0.04), H.p(i + 0.42, j + 0.25, 0.04)], 'teal', 0.75);
    vessel(H, R, 10.93, 1.8, 0.05, 12, 16, 'sun');
    branchSpray(H, R, ...H.p(10.93, 1.8, 0.56), 1.15, 'teal');
  },
  (H, R, t) => {
    const u = cycle(t, 18);
    H.at(5.63, 8.31, 0.12, (HH) =>
      actor(
        HH,
        R,
        5.63,
        8.31,
        t,
        'hongKongPingShanConsider',
        {
          shirt: ['paper', 1],
          hairStyle: 'short',
          glasses: true,
          face: 'nw',
          prop(h, r, p) {
            const [x, y] = p.nearHand;
            oval(h, r, x - 1, y + 1, 4.6, 2.9, 'coral', 0.73);
            h.line(
              r,
              [
                [x - 3, y],
                [x + 1, y]
              ],
              'paper',
              0.6
            );
          }
        },
        0.12,
        1.36,
        'elder'
      )
    );
    H.at(8.69, 5.67, 0.1, (HH) =>
      actor(
        HH,
        R,
        8.69,
        5.67,
        t,
        'hongKongPingShanRespond',
        {
          shirt: ['teal', 0.58],
          hairStyle: 'bun',
          face: 'sw',
          prop(h, r, p) {
            const [x, y] = p.farHand;
            shape(
              h,
              r,
              [
                [x - 2, y + 3],
                [x + 3, y + 3],
                [x + 8, y - 18],
                [x - 1, y - 20]
              ],
              'sun',
              0.63,
              0.6
            );
            for (let k = 0; k < 3; k++)
              h.line(
                r,
                [
                  [x + k, y + 1],
                  [x + k * 2, y - 16]
                ],
                'blue',
                0.45
              );
          }
        },
        0.1,
        1.34,
        'elder'
      )
    );
    const [x, y] = H.p(2.24, 2.66, 0.15),
      swing = Math.sin(u * TAU) * 2;
    stroke(
      H,
      R,
      [
        [x + 41, y - 96],
        [x + 57 + swing, y - 87],
        [x + 61 + swing, y - 82]
      ],
      'blue',
      0.7,
      0.63
    );
    oval(H, R, x + 60 + swing, y - 85, 6, 3, 'teal', 0.57);
  }
);

room.loopSeconds = 18;
export default room;
