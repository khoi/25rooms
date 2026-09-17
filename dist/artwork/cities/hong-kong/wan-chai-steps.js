import { surface, timber, metal, vessel, bentTube, slattedSeat, branchSpray } from '../materials.js';
import { masonry, archedBay } from '../structure.js';

import { foldedCloth } from '../furnishings.js';
import { TAU, actor, cycle, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const fold = { ...rest, head: 14, lean: -5, al: 52, ar: 62, el: 66, er: 48 };
FIGURES.clips.hongKongUmbrellaFold = {
  dur: 12,
  keys: [
    [0, fold],
    [0.17, fold],
    [0.35, { ...fold, ar: 83, er: 15, al: 67, el: 40 }],
    [0.53, { ...fold, ar: 78, er: 24, al: 65, el: 49 }],
    [0.68, { ...fold, ar: 53, er: 74, head: 9 }],
    [0.8, { ...fold, ar: 53, er: 74, head: 9 }],
    [1, fold]
  ]
};

function rail(H, R, points) {
  H.line(
    R,
    points.map((p) => H.p(...p)),
    'blue',
    3.2
  );
  H.line(
    R,
    points.map(([i, j, z]) => H.p(i, j, z + 0.04)),
    'paper',
    0.9
  );
}

const room = world(
  'hong-kong-wan-chai-steps',
  'Wan Chai · Rain on the landing',
  { floor: 'blue', tone: 0.16, wall: false, head: 115 },
  (H, R) => {
    masonry(H, R, 'nw', 0.06, 11.86, 0, 5.1, 'coral', 0.25);
    masonry(H, R, 'ne', 0.06, 11.84, 0, 4.48, 'teal', 0.24);
    archedBay(H, R, 'nw', 1.02, 2.91, 2.06, 2.28, 'teal');
    surface(H, R, H.faceI(5.74, 0.2, 3.16, 1.17, 4.11), 'blue', 0.8);
    for (let n = 0; n < 12; n++) timber(H, R, 5.86 + n * 0.24, 0.26, 0.21, 0.19, 1.19, 2.74, 'sun');
    metal(H, R, 8.51, 0.49, 0.08, 0.11, 2.24, 0.23, 'teal');
    timber(H, R, 5.58, 0.13, 3.53, 0.7, 1.01, 0.18, 'paper');
    metal(H, R, 5.48, 0.12, 0.17, 0.26, 1.04, 3.24, 'teal');
    metal(H, R, 9.02, 0.12, 0.17, 0.26, 1.04, 3.24, 'teal');
    for (let n = 0; n < 7; n++) {
      const j = 1.08 + n * 0.72,
        z = 2.71 - n * 0.28;
      timber(H, R, 0.68, j, 3.76, 0.72, 0, z, 'paper');
      surface(H, R, H.tile(0.72, j + 0.06, 3.66, 0.6, z + 0.005), 'blue', 0.15, 0.5);
      H.line(R, [H.p(0.76, j + 0.68, z + 0.01), H.p(4.34, j + 0.68, z + 0.01)], 'paper', 1.3);
    }
    timber(H, R, 4.48, 0.9, 6.81, 4.89, 0, 1.0, 'paper');
    for (let r = 0; r < 7; r++)
      for (let c = 0; c < 8; c++) surface(H, R, H.tile(4.55 + c * 0.83, 1.0 + r * 0.67, 0.79, 0.63, 1.01), 'teal', (r + c) % 4 ? 0.12 : 0.23, 0.4);
    for (let n = 0; n < 5; n++) {
      const j = 5.82 + n * 0.9,
        z = 0.82 - n * 0.17;
      timber(H, R, 4.5, j, 4.45, 0.86, 0, z, 'paper');
      surface(H, R, H.tile(4.56, j + 0.06, 4.33, 0.73, z + 0.01), 'blue', 0.16, 0.4);
    }
    timber(H, R, 9.0, 5.88, 2.58, 3.87, 0, 0.51, 'paper');
    surface(H, R, H.tile(9.07, 5.92, 2.43, 3.77, 0.52), 'teal', 0.28);
    for (const i of [0.7, 4.41]) {
      rail(H, R, [
        [i, 1.14, 3.68],
        [i, 5.41, 2.02],
        [i, 5.41, 1.02]
      ]);
      for (let n = 0; n < 6; n++)
        rail(H, R, [
          [i, 1.37 + n * 0.72, 2.7 - n * 0.28],
          [i, 1.37 + n * 0.72, 3.6 - n * 0.28]
        ]);
    }
    rail(H, R, [
      [9.03, 5.83, 1.88],
      [9.03, 10.31, 1.03]
    ]);
    for (let n = 0; n < 5; n++)
      rail(H, R, [
        [9.03, 6 + n * 0.9, 0.81 - n * 0.17],
        [9.03, 6 + n * 0.9, 1.84 - n * 0.17]
      ]);
    const canopy = [H.p(5.46, 0.42, 4.03), H.p(10.93, 0.42, 4.03), H.p(10.93, 4.43, 3.53), H.p(5.46, 4.43, 3.53)];
    H.tint(canopy, 'teal', 0.15);
    H.outline(R, canopy, 'blue', 2.3);
    for (let n = 0; n < 6; n++)
      bentTube(
        H,
        R,
        [
          [5.52 + n * 1.06, 0.46, 4.04],
          [5.52 + n * 1.06, 4.44, 3.54]
        ],
        1.5,
        'teal'
      );
    bentTube(
      H,
      R,
      [
        [10.96, 4.42, 3.55],
        [10.96, 5.51, 3.47],
        [10.9, 7.38, 3.29]
      ],
      3,
      'teal'
    );
    for (const j of [1.04, 3.17])
      bentTube(
        H,
        R,
        [
          [10.9, j, 3.93 - j * 0.1],
          [10.9, 0.42, 3.12]
        ],
        2,
        'teal'
      );
    slattedSeat(H, R, 9.53, 1.19, 1.35, 1.02, 'sun', 0.64);
    foldedCloth(H, R, 9.66, 1.36, 0.73, 0.45, 1.69, 'coral', 'paper');
    for (const [i, j, z, s] of [
      [1.46, 7.45, 0.03, 0.87],
      [3.14, 9.32, 0.03, 1.1],
      [10.06, 4.99, 1.02, 0.72]
    ]) {
      vessel(H, R, i, j, z, 12 * s, 18 * s, 'coral');
      branchSpray(H, R, ...H.p(i, j, z + 0.65 * s), s, 'teal');
    }
    for (let n = 0; n < 15; n++) H.line(R, [H.p(9.15 + n * 0.145, 9.34, 0.54), H.p(9.15 + n * 0.145, 9.66, 0.54)], 'blue', 1.2);
    H.tint(H.tile(6.83, 3.1, 1.52, 1.48, 1.022), 'paper', 0.45);
    H.tint(H.tile(10.31, 6.83, 1.11, 1.45, 0.53), 'paper', 0.48);
  },
  (H, R, t) => {
    const u = cycle(t, 12),
      wrap = Math.sin(Math.PI * Math.max(0, Math.min(1, (u - 0.17) / 0.63))) ** 2;
    actor(
      H,
      R,
      7.23,
      4.0,
      t,
      'hongKongUmbrellaFold',
      {
        shirt: ['sun', 0.75],
        pants: ['blue', 0.7],
        hairStyle: 'short',
        face: 'se',
        prop(h, r, p) {
          const [x, y] = p.nearHand;
          h.line(
            r,
            [
              [x, y - 30],
              [x, y + 30]
            ],
            'blue',
            1.7
          );
          stroke(
            h,
            r,
            [
              [x, y - 30],
              [x, y - 37],
              [x + 7, y - 39],
              [x + 9, y - 32]
            ],
            'coral',
            2.1
          );
          const width = 7 - wrap * 3;
          shape(
            h,
            r,
            [
              [x - 2, y - 22],
              [x - width, y + 8],
              [x, y + 23],
              [x + width, y + 7],
              [x + 2, y - 22]
            ],
            'coral',
            0.66,
            0.8
          );
          for (const dx of [-2, 2])
            stroke(
              h,
              r,
              [
                [x + dx, y - 19],
                [x + dx * 1.6, y + 7],
                [x, y + 22]
              ],
              'blue',
              0.6
            );
          h.line(
            r,
            [
              [x - width, y + 4],
              [x + width, y + 4]
            ],
            'teal',
            1.6
          );
        }
      },
      1.01,
      1.29
    );
    const [x, y] = H.p(10.9, 7.38, 0.52);
    for (let q = 0; q < 4; q++) {
      const drop = cycle(t + q * 3, 12);
      H.opacity(0.6 * Math.sin(drop * Math.PI), () =>
        H.line(
          R,
          [
            [x + q * 6, y - 82 + drop * 78],
            [x + q * 6 - 2, y - 75 + drop * 78]
          ],
          'teal',
          0.85
        )
      );
    }
    H.opacity(Math.sin(u * TAU) ** 2 * 0.6, () =>
      H.outline(
        R,
        Array.from({ length: 24 }, (_, q) => [x + Math.cos((q * TAU) / 24) * (6 + u * 7), y + Math.sin((q * TAU) / 24) * (2 + u * 2)]),
        'paper',
        0.8
      )
    );
  }
);
room.loopSeconds = 12;
export default room;
