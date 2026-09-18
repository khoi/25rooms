import { benchFrame, bentTube, slattedSeat, surface, timber, vessel } from '../materials.js';

import { satchel, coiledLine, foldedCloth, handTool, shallowTray, slattedCrate } from '../furnishings.js';
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
    surface(H, R, [H.p(0.12, 0.21, 0.35), H.p(11.84, 0.21, 0.35), H.p(11.84, 0.21, 0.83), H.p(9.13, 0.21, 0.73), H.p(6.4, 0.21, 0.94), H.p(3.6, 0.21, 0.72), H.p(0.12, 0.21, 0.84)], 'sun', 0.32, 0.3);
    for (let n = 0; n < 4; n++) {
      const z = 1.21 + n * 0.15;
      stroke(H, R, [H.p(4.05 + n * 0.37, 0.21, z), H.p(5.7 + n * 0.41, 0.21, z + 0.04), H.p(8.74 + n * 0.33, 0.21, z)], 'teal', 0.8, 0.4);
    }
    const trestle = [[3.53, 1.2], [4.24, 1.82], [5.03, 2.23], [5.83, 2.29], [6.64, 1.97], [7.45, 1.41], [8.22, 1.2]];
    H.line(R, trestle.map(([i, z]) => H.p(i, 0.22, z)), 'coral', 2);
    H.line(R, trestle.map(([i, z]) => H.p(i, 0.22, z - 0.11)), 'teal', 1);
    for (let n = 0; n < trestle.length - 1; n++) {
      const [a, az] = trestle[n], [b, bz] = trestle[n + 1];
      H.line(R, [H.p(a, 0.22, 0.98), H.p(a, 0.22, az - 0.11), H.p(b, 0.22, 0.98), H.p(b, 0.22, bz - 0.11)], 'teal', 0.8);
    }
    for (const [i, j] of [[0.6, 1.76], [1.37, 2.86], [8.51, 1.53], [10.47, 2.84], [11.36, 1.94]]) {
      surface(H, R, [H.p(i - 0.43, j, 0.07), H.p(i, j - 0.25, 0.11), H.p(i + 0.6, j, 0.07), H.p(i + 0.14, j + 0.26, 0.07)], 'sun', 0.37, 0.25);
      for (let n = 0; n < 5; n++) stroke(H, R, [H.p(i + n * 0.06, j, 0.08), H.p(i + n * 0.03, j, 0.29 + n % 2 * 0.1), H.p(i - 0.14 + n * 0.11, j, 0.44 + n % 3 * 0.07)], 'teal', 0.9, 0.57);
    }
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
    timber(H, R, 0.08, 3.46, 11.8, 0.17, 0.06, 0.17, 'teal');
    for (const i of [0.69, 3.94, 7.18, 10.42]) {
      surface(H, R, H.tile(i, 3.66, 0.53, 0.77, 0.075), 'teal', 0.5);
      for (let n = 0; n < 5; n++) H.line(R, [H.p(i + 0.08, 3.78 + n * 0.13, 0.08), H.p(i + 0.45, 3.78 + n * 0.13, 0.08)], 'blue', 1.2);
    }
    for (const [i, j, w] of [[7.18, 8.45, 2.59], [1.07, 11.29, 2.26], [9.31, 4.65, 1.38]]) {
      surface(H, R, H.tile(i, j, w, 0.3, 0.063), 'sun', 0.4);
      for (const d of [0.13, w - 0.13]) for (const e of [0.06, 0.23]) H.dot(...H.p(i + d, j + e, 0.071), 0.85, 'blue');
    }
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
    for (const j of [4.28, 8.88]) {
      timber(H, R, 0.48, j, 3.86, 0.15, 3.48, 0.15, 'teal');
      bentTube(H, R, [[0.6, j, 2.87], [1.32, j, 3.5]], 3, 'sun');
    }
    for (let n = 0; n < 6; n++) timber(H, R, 0.47, 4.4 + n * 0.62, 0.13, 0.52, 0.1, 1.37, 'teal');
    timber(H, R, 0.45, 4.31, 0.28, 4.44, 1.46, 0.12, 'sun');
    for (let n = 0; n < 3; n++) {
      const j = 4.77 + n * 1.14;
      const P = (u, z) => H.p(0.76, j + u, z);
      surface(H, R, [P(0, 2.69), P(-0.46, 2.15), P(0, 1.55), P(0.46, 2.15)], ['coral', 'paper', 'sun'][n], 0.75);
      H.line(R, [P(0, 2.69), P(0, 1.55)], 'teal', 1.2);
      H.line(R, [P(-0.46, 2.15), P(0.46, 2.15)], 'teal', 1);
      H.line(R, [P(0, 2.69), P(0, 3.45)], 'blue', 0.6);
    }
    surface(H, R, H.faceJ(0.68, 5.21, 1.12, 1.82, 2.61), 'sun', 0.66);
    surface(H, R, H.faceJ(0.7, 5.31, 0.92, 1.93, 2.49), 'paper', 1);
    H.line(R, [H.p(0.72, 5.38, 2.03), H.p(0.72, 5.78, 2.38), H.p(0.72, 6.11, 2.03)], 'coral', 1.4);
    surface(H, R, [H.p(0.41, 4.15, 3.66), H.p(4.61, 4.15, 3.66), H.p(3.62, 7.36, 3.14), H.p(0.41, 9.06, 3.66)], 'paper', 1);
    for (let n = 0; n < 7; n++) H.line(R, [H.p(0.55 + n * 0.51, 4.19, 3.67), H.p(0.55 + n * 0.41, 8.73 - n * 0.25, 3.63 - n * 0.069)], 'sun', 2.1);
    for (let n = 0; n < 8; n++) {
      const i = 0.48 + n * 0.5;
      surface(H, R, [H.p(i, 4.13, 3.66), H.p(i + 0.47, 4.13, 3.66), H.p(i + 0.47, 4.13, 3.4), H.p(i + 0.24, 4.13, 3.33), H.p(i, 4.13, 3.4)], n % 2 ? 'paper' : 'sun', n % 2 ? 1 : 0.5, 0.45);
    }

    slattedSeat(H, R, 4.55, 5.92, 3.02, 0.25, 'sun', 0.57);
    for (const i of [4.58, 7.38]) {
      bentTube(H, R, [[i, 6.13, 0.96], [i, 6.16, 1.21], [i, 6.91, 1.21], [i, 7.03, 0.83]], 3.3, 'teal');
      for (const j of [6.19, 6.96]) surface(H, R, H.tile(i - 0.14, j - 0.12, 0.36, 0.32, 0.08), 'blue', 0.65);
    }
    for (let n = 0; n < 4; n++) timber(H, R, 4.62, 6.02, 2.77, 0.09, 1.0 + n * 0.17, 0.12, 'sun');
    foldedCloth(H, R, 4.88, 6.22, 0.7, 0.51, 0.9, 'coral', 'paper');
    timber(H, R, 1.12, 5.12, 2.19, 1.44, 0.31, 0.09, 'sun');
    slattedCrate(H, R, 1.26, 5.34, 1.13, 1.02, 0.43, 0.36, 'sun');
    for (let n = 0; n < 4; n++) surface(H, R, H.tile(1.34 + n * 0.08, 5.44 + n * 0.08, 0.69, 0.61, 0.81 + n * 0.025), ['paper', 'coral', 'teal', 'paper'][n], 0.75);
    for (let n = 0; n < 5; n++) bentTube(H, R, [[2.56 + n * 0.1, 5.14, 0.44], [2.7 + n * 0.1, 6.45, 0.47]], 1.3, 'sun');
    benchFrame(H, R, 1.06, 5.01, 2.34, 1.73, 0.94, 'teal');
    surface(H, R, [H.p(1.38, 5.85, 0.99), H.p(2.36, 5.13, 0.99), H.p(3.05, 5.84, 0.99), H.p(2.37, 6.51, 0.99)], 'coral', 0.64);
    H.line(R, [H.p(1.39, 5.85, 1.01), H.p(3.05, 5.84, 1.01)], 'sun', 1.3);
    H.line(R, [H.p(2.36, 5.13, 1.01), H.p(2.37, 6.51, 1.01)], 'sun', 1.3);
    for (let n = 0; n < 4; n++) vessel(H, R, 1.3 + n * 0.5, 6.38, 1.01, 4, 6, ['teal', 'paper', 'sun', 'coral'][n]);
    shallowTray(H, R, 1.11, 6.8, 1.51, 0.74, 0.07, 'teal');
    coiledLine(H, R, 2.09, 7.18, 0.16, 13, 'teal');
    for (const i of [1.15, 3.2]) bentTube(H, R, [[i, 5.13, 0.27], [i, 6.43, 0.9]], 1.5, 'teal');
    for (let n = 0; n < 3; n++) {
      const [x, y] = H.p(3.23, 5.24 + n * 0.36, 1.02);
      surface(H, R, ell(x, y, 5, 3), 'sun', 0.75);
      H.line(R, [[x, y - 2], [x, y - 9]], 'coral', 4);
      surface(H, R, ell(x, y - 9, 5, 3), 'paper', 1);
      H.dot(x, y - 9, 1, 'blue');
    }
    handTool(H, R, 3.09, 6.15, 1.01, 'scissors', 'blue');
    timber(H, R, 0.71, 7.65, 0.15, 0.92, 0.17, 1.07, 'sun');
    for (let n = 0; n < 4; n++) {
      const [x, y] = H.p(0.86, 7.82 + n * 0.21, 0.66);
      surface(H, R, ell(x, y, 7, 4), ['coral', 'teal', 'sun', 'paper'][n], 0.65);
      H.line(R, [[x - 7, y + 3], [x + 7, y + 3]], 'blue', 0.65);
    }
    bentTube(H, R, [[0.87, 8.91, 0.09], [0.87, 8.57, 2.1]], 2.7, 'sun');
    timber(H, R, 0.63, 8.74, 0.51, 0.31, 0.08, 0.12, 'teal');
    for (let n = 0; n < 7; n++) H.line(R, [H.p(0.65 + n * 0.065, 8.98, 0.19), H.p(0.65 + n * 0.065, 9.09, 0.08)], 'sun', 1.4);
    bag(H, R, 3.47, 8.82);
    for (const i of [1.16, 2.55]) {
      bentTube(H, R, [[i, 9.5, 0.08], [i, 10.39, 0.82], [i, 10.63, 1.78]], 2.4, 'teal');
      bentTube(H, R, [[i, 10.8, 0.08], [i, 9.72, 0.88]], 2.4, 'teal');
      H.dot(...H.p(i, 10.02, 0.58), 2.2, 'sun');
    }
    surface(H, R, [H.p(1.16, 9.69, 0.86), H.p(2.55, 9.69, 0.86), H.p(2.55, 10.57, 1.7), H.p(1.16, 10.57, 1.7)], 'paper', 1);
    for (let n = 0; n < 5; n++) H.line(R, [H.p(1.28 + n * 0.26, 9.7, 0.87), H.p(1.28 + n * 0.26, 10.58, 1.71)], 'coral', 3);
    foldedCloth(H, R, 3.82, 9.45, 1.2, 0.74, 0.08, 'teal', 'paper');
    for (const i of [4.15, 4.77]) {
      const [x, y] = H.p(i, 10.71, 0.09);
      surface(H, R, ell(x, y, 8, 15), 'coral', 0.6);
      H.line(R, [[x - 6, y - 7], [x, y + 1], [x + 6, y - 7]], 'paper', 2);
    }
    shallowTray(H, R, 6.11, 9.45, 1.48, 0.87, 0.07, 'sun');
    foldedCloth(H, R, 6.23, 9.57, 0.58, 0.49, 0.16, 'paper', 'coral');
    vessel(H, R, 7.14, 9.87, 0.16, 4, 15, 'teal');
    const [hx, hy] = H.p(8.59, 4.96, 0.09);
    surface(H, R, ell(hx, hy, 18, 8), 'sun', 0.52);
    surface(H, R, ell(hx, hy - 5, 10, 9), 'sun', 0.68);
    H.line(R, [[hx - 9, hy - 1], [hx + 9, hy - 1]], 'coral', 2);
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
room.stillTime = 0;
export default room;
