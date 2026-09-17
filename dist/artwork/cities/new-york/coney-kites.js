import { benchFrame, bentTube, slattedSeat, surface, timber, vessel } from '../materials.js';

import { satchel, coiledLine, foldedCloth, handTool } from '../furnishings.js';
import { TAU, actor, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -8, head: 16, al: 54, ar: 62, el: 62, er: 37 };
const holding = { ...rest, al: 54, ar: 58, el: 70, er: 60, head: -9 };
FIGURES.clips.newYorkKiteSlack = {
  dur: 18,
  keys: [
    [0, seated],
    [0.14, seated],
    [0.33, { ...seated, ar: 75, er: 16, al: 59, el: 51 }],
    [0.5, { ...seated, ar: 75, er: 16, al: 59, el: 51 }],
    [0.68, { ...seated, ar: 46, er: 75, al: 47, el: 68, head: 21 }],
    [0.84, seated],
    [1, seated]
  ]
};
FIGURES.clips.newYorkKiteHold = {
  dur: 18,
  keys: [
    [0, holding],
    [0.22, holding],
    [0.4, { ...holding, al: 57, ar: 61, head: -14 }],
    [0.64, { ...holding, al: 57, ar: 61, head: -14 }],
    [0.83, holding],
    [1, holding]
  ]
};

function bag(H, R, i, j) {
  const [x, y] = H.p(i, j, 0.05);
  shape(
    H,
    R,
    [
      [x - 17, y - 3],
      [x + 14, y + 5],
      [x + 18, y - 27],
      [x - 15, y - 35]
    ],
    'coral',
    0.7,
    0.9
  );
  stroke(
    H,
    R,
    [
      [x - 10, y - 32],
      [x - 10, y - 49],
      [x + 9, y - 43],
      [x + 12, y - 28]
    ],
    'blue',
    2.2
  );
  for (const dx of [-7, 2, 11])
    H.line(
      R,
      [
        [x + dx - 5, y - 30],
        [x + dx - 7, y - 1]
      ],
      'paper',
      2.1,
      { tone: 0.8 }
    );
  shape(
    H,
    R,
    [
      [x - 2, y - 33],
      [x + 16, y - 28],
      [x + 12, y - 42],
      [x - 5, y - 46]
    ],
    'teal',
    0.59,
    0.6
  );
}

function gull(H, R, x, y, turn = 0) {
  oval(H, R, x, y - 4, 10, 6, 'paper', 1);
  oval(H, R, x + 7 + turn, y - 10, 5, 5, 'paper', 1);
  shape(
    H,
    R,
    [
      [x + 11 + turn, y - 11],
      [x + 18 + turn, y - 8],
      [x + 11 + turn, y - 7]
    ],
    'sun',
    0.8,
    0.55
  );
  shape(
    H,
    R,
    [
      [x - 8, y - 7],
      [x - 17, y - 12],
      [x - 11, y - 2]
    ],
    'blue',
    0.65,
    0.6
  );
  stroke(
    H,
    R,
    [
      [x - 5, y - 5],
      [x + 1, y - 1],
      [x + 7, y - 4]
    ],
    'blue',
    0.7
  );
  H.dot(x + 8 + turn, y - 12, 1, 'blue', 1);
  for (const dx of [-4, 4])
    H.line(
      R,
      [
        [x + dx, y],
        [x + dx, y + 6],
        [x + dx + 5, y + 6]
      ],
      'coral',
      1.1
    );
}

function kite(H, R, x, y, u, hand, parentHand) {
  const a = Math.sin(u * TAU) * 0.035;
  const pt = (dx, dy) => [x + dx * Math.cos(a) - dy * Math.sin(a), y + dx * Math.sin(a) + dy * Math.cos(a)];
  const top = pt(0, -37),
    right = pt(28, -3),
    bottom = pt(0, 39),
    left = pt(-28, -3),
    center = pt(0, -3);
  shape(H, R, [top, right, bottom, left], 'paper', 1, 1.05);
  shape(H, R, [top, center, left], 'coral', 0.76, 0.5);
  shape(H, R, [right, center, bottom], 'teal', 0.75, 0.5);
  shape(H, R, [top, right, center], 'sun', 0.7, 0.5);
  H.line(R, [top, bottom], 'blue', 1.05);
  stroke(H, R, [left, pt(0, -8), right], 'blue', 1.05);
  for (const edge of [
    [top, left],
    [left, bottom],
    [bottom, right],
    [right, top]
  ]) {
    const [a, b] = edge;
    for (let n = 1; n < 9; n++) {
      const f = n / 9,
        x0 = a[0] + (b[0] - a[0]) * f,
        y0 = a[1] + (b[1] - a[1]) * f;
      H.line(
        R,
        [
          [x0 * 0.96 + center[0] * 0.04, y0 * 0.96 + center[1] * 0.04],
          [x0 * 0.91 + center[0] * 0.09, y0 * 0.91 + center[1] * 0.09]
        ],
        'blue',
        0.5
      );
    }
  }
  H.line(R, [pt(-18, -14), pt(-7, -24), pt(-3, -20), pt(-14, -10)], 'paper', 1.1);
  H.dot(...center, 2.2, 'paper', 1);
  H.line(R, [bottom, hand], 'blue', 0.7);
  const wave = Math.sin(u * TAU) * 8;
  const tail = [bottom, pt(16 + wave * 0.4, 56), pt(4 + wave * 0.6, 77), pt(26 + wave, 92), pt(22 + wave, 115)];
  stroke(H, R, tail, 'blue', 0.85);
  for (const [dx, dy, ink] of [
    [15 + wave * 0.4, 55, 'coral'],
    [9 + wave * 0.6, 78, 'sun'],
    [24 + wave, 102, 'teal']
  ]) {
    const [tx, ty] = pt(dx, dy);
    shape(
      H,
      R,
      [
        [tx, ty],
        [tx - 8, ty - 5],
        [tx - 7, ty + 5],
        [tx, ty],
        [tx + 8, ty - 5],
        [tx + 7, ty + 5]
      ],
      ink,
      0.74,
      0.55
    );
  }
  if (parentHand) {
    const pull = Math.sin(Math.PI * Math.max(0, Math.min(1, (u - 0.14) / 0.7))) ** 2;
    const target = pt(-14, 7),
      middle = [(target[0] + parentHand[0]) / 2, (target[1] + parentHand[1]) / 2 + 15 - pull * 11];
    stroke(H, R, [parentHand, middle, target, pt(-2, 12), center], 'blue', 0.85);
    const [lx, ly] = pt(-8, 11);
    stroke(
      H,
      R,
      [
        [lx, ly],
        [lx - 7, ly + 7 - pull * 4],
        [lx + 5, ly + 10 - pull * 6],
        [lx + 1, ly]
      ],
      'paper',
      1.3
    );
  }
}

const room = world(
  'new-york-coney-kites',
  'Coney Island · Wind at the Bench',
  { floor: 'paper', tone: 1, wall: false, head: 95 },
  (H, R) => {
    surface(H, R, H.tile(0, 0, 12, 3.55, 0.02), 'sun', 0.22);
    surface(H, R, H.faceI(0.08, 0.12, 11.84, 0.17, 2.8), 'paper', 1, 0.2);
    surface(H, R, H.faceI(0.08, 0.17, 11.84, 0.17, 1.16), 'teal', 0.35);
    for (let n = 0; n < 17; n++)
      H.line(R, [H.p(0.2 + n * 0.69, 0.2, 0.41 + (n % 3) * 0.19), H.p(0.63 + n * 0.69, 0.2, 0.41 + (n % 3) * 0.19)], 'paper', 0.9);
    const [fx, fy] = H.p(2.01, 0.23, 1.31);
    H.line(R, ell(fx, fy - 24, 29, 29), 'teal', 1.4);
    for (let n = 0; n < 12; n++) {
      const a = (n * TAU) / 12;
      H.line(
        R,
        [
          [fx, fy - 24],
          [fx + Math.cos(a) * 29, fy - 24 + Math.sin(a) * 29]
        ],
        'coral',
        0.65
      );
      surface(
        H,
        R,
        [
          [fx + Math.cos(a) * 29 - 3, fy - 24 + Math.sin(a) * 29],
          [fx + Math.cos(a) * 29 + 3, fy - 24 + Math.sin(a) * 29],
          [fx + Math.cos(a) * 29 + 3, fy - 18 + Math.sin(a) * 29],
          [fx + Math.cos(a) * 29 - 3, fy - 18 + Math.sin(a) * 29]
        ],
        'sun',
        0.63,
        0.4
      );
    }
    H.line(
      R,
      [
        [fx, fy - 24],
        [fx - 14, fy + 20],
        [fx + 14, fy + 20],
        [fx, fy - 24]
      ],
      'blue',
      1.5
    );
    for (let n = 0; n < 24; n++) surface(H, R, H.tile(0.05, 3.61 + n * 0.345, 11.9, 0.321, 0.05), 'sun', n % 4 ? 0.22 : 0.12, 0.45);
    for (let n = 0; n < 18; n++) {
      const i = 0.21 + n * 0.65;
      H.line(R, [H.p(i, 3.57, 0.09), H.p(i, 3.57, 1.35)], 'paper', 2.5);
      H.line(R, [H.p(i, 3.57, 1.35), H.p(i + 0.23, 3.57, 1.35)], 'teal', 1);
    }
    for (const z of [0.59, 1.36])
      bentTube(
        H,
        R,
        [
          [0.18, 3.57, z],
          [11.78, 3.57, z]
        ],
        2.3,
        'teal'
      );
    for (const [i, j] of [
      [0.51, 4.27],
      [4.28, 4.27],
      [0.51, 8.92]
    ])
      timber(H, R, i, j, 0.18, 0.18, 0.06, 3.59, 'teal');
    surface(H, R, [H.p(0.41, 4.15, 3.66), H.p(4.61, 4.15, 3.66), H.p(3.62, 7.36, 3.14), H.p(0.41, 9.06, 3.66)], 'paper', 1);
    for (let n = 0; n < 7; n++) H.line(R, [H.p(0.55 + n * 0.51, 4.19, 3.67), H.p(0.55 + n * 0.41, 8.73 - n * 0.25, 3.63 - n * 0.069)], 'sun', 2.1);
    slattedSeat(H, R, 4.7, 6.04, 2.45, 0.25, 'sun', 0.57);
    foldedCloth(H, R, 4.88, 6.22, 0.7, 0.51, 0.9, 'coral', 'paper');
    benchFrame(H, R, 1.06, 5.01, 2.34, 1.73, 0.94, 'teal');
    surface(H, R, [H.p(1.38, 5.85, 0.99), H.p(2.36, 5.13, 0.99), H.p(3.05, 5.84, 0.99), H.p(2.37, 6.51, 0.99)], 'coral', 0.64);
    H.line(R, [H.p(1.39, 5.85, 1.01), H.p(3.05, 5.84, 1.01)], 'sun', 1.3);
    H.line(R, [H.p(2.36, 5.13, 1.01), H.p(2.37, 6.51, 1.01)], 'sun', 1.3);
    for (let n = 0; n < 4; n++) vessel(H, R, 1.3 + n * 0.5, 6.38, 1.01, 4, 6, ['teal', 'paper', 'sun', 'coral'][n]);
    coiledLine(H, R, 2.09, 7.18, 0.06, 13, 'teal');
    handTool(H, R, 3.09, 6.15, 1.01, 'scissors', 'blue');
    bag(H, R, 3.47, 8.82);
    for (const [i, j] of [
      [0.54, 10.99],
      [11.29, 4.58]
    ]) {
      vessel(H, R, i, j, 0.07, 12, 22, 'teal');
      for (let n = 0; n < 9; n++) H.line(R, [H.p(i - 0.25 + n * 0.06, j, 0.08), H.p(i - 0.25 + n * 0.06, j, 0.65)], 'paper', 0.6);
    }
    slattedSeat(H, R, 9.13, 4.4, 2.19, 0.05, 'sun', 0.52);
    satchel(H, R, 9.44, 4.68, 0.7, 'coral', 0.67);
    for (const [i, j] of [
      [2.83, 10.45],
      [7.07, 10.79],
      [10.77, 9.63]
    ]) {
      H.line(R, [H.p(i, j, 0.06), H.p(i + 0.3, j + 0.02, 0.06)], 'teal', 0.7);
      H.dot(...H.p(i + 0.15, j - 0.09, 0.06), 1, 'blue', 0.4);
    }
  },
  (H, R, t) => {
    const u = cycle(t, 18);
    let parentHand;
    H.at(6.02, 6.48, 0, (h) =>
      actor(
        h,
        R,
        6.02,
        6.48,
        t,
        'newYorkKiteSlack',
        {
          shirt: ['teal', 0.68],
          hairStyle: 'curly',
          face: 'se',
          prop(hh, rr, points) {
            parentHand = points.nearHand;
            const [x, y] = points.farHand;
            shape(
              hh,
              rr,
              [
                [x - 9, y - 6],
                [x + 8, y - 2],
                [x + 8, y + 5],
                [x - 9, y + 1]
              ],
              'sun',
              0.77,
              0.6
            );
            for (let k = 0; k < 5; k++)
              hh.line(
                rr,
                [
                  [x - 5 + k * 2, y - 5],
                  [x - 5 + k * 2, y + 2]
                ],
                'paper',
                0.9
              );
          }
        },
        0.25,
        1.37
      )
    );
    H.at(8.33, 6.68, 0, (h) =>
      actor(
        h,
        R,
        8.33,
        6.68,
        t,
        'newYorkKiteHold',
        {
          shirt: ['coral', 0.74],
          hairStyle: 'short',
          face: 'se',
          prop(hh, rr, points) {
            const [x, y] = points.nearHand;
            kite(hh, rr, x + 2, y - 42, u, points.nearHand, parentHand);
          }
        },
        0,
        1.47,
        'child'
      )
    );
    gull(H, R, ...H.p(9.62, 10.87, 0.035), Math.sin(u * TAU) * 1.2);
    const [x, y] = H.p(3.87, 7.76, 0.04),
      wave = Math.sin(u * TAU) * 2;
    shape(
      H,
      R,
      [
        [x - 11, y - 3],
        [x + 13, y + 3],
        [x + 15, y - 2 + wave],
        [x - 8, y - 8]
      ],
      'paper',
      1,
      0.6
    );
    H.line(
      R,
      [
        [x - 6, y - 3],
        [x + 8, y]
      ],
      'coral',
      1.1
    );
  }
);

room.loopSeconds = 18;
export default room;
