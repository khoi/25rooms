import { benchFrame, bentTube, branchSpray, metal, pendant, slattedSeat, surface, timber, vessel } from '../materials.js';
import { masonry, basin as washBasin } from '../structure.js';

import { coiledLine, foldedCloth, shallowTray, slattedCrate } from '../furnishings.js';
import { actor, cycle, ell, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const hang = { ...rest, ar: 150, er: 0, al: 45, el: 35, head: -14 };
const check = { ...rest, ar: 52, er: 64, al: 65, el: 60, head: 18, lean: -5 };
FIGURES.clips.newYorkVestDry = {
  dur: 18,
  keys: [
    [0, hang],
    [0.14, hang],
    [0.3, check],
    [0.43, { ...check, ar: 60, er: 38 }],
    [0.57, check],
    [0.76, hang],
    [1, hang]
  ]
};

function canoe(H, R, i, j, z, ink) {
  const P = (a, b, h = 0) => H.p(i + a, j + b, z + h);
  const edge = [];
  for (let n = 0; n <= 24; n++) {
    const f = n / 24;
    edge.push([f * 7.5, -(Math.sin(f * Math.PI) ** 0.73) * 0.61]);
  }
  for (let n = 24; n >= 0; n--) {
    const f = n / 24;
    edge.push([f * 7.5, Math.sin(f * Math.PI) ** 0.73 * 0.61]);
  }
  surface(
    H,
    R,
    edge.map(([a, b]) => P(a, b, -0.17)),
    ink,
    0.8,
    0.85
  );
  surface(
    H,
    R,
    edge.map(([a, b]) => P(a, b, 0.03)),
    ink,
    0.55,
    1
  );
  const inner = edge.map(([a, b]) => P(0.28 + a * 0.925, b * 0.72, 0.055));
  surface(H, R, inner, 'blue', 0.57, 0.6);
  H.clip(inner, () => {
    for (let n = 0; n < 15; n++) {
      const a = 0.45 + n * 0.46,
        bulge = Math.sin((a / 7.5) * Math.PI) * 0.45;
      H.line(R, [P(a, -bulge, 0.06), P(a + 0.035, 0, -0.05), P(a, bulge, 0.06)], 'sun', 1.3);
    }
    H.line(R, [P(0.6, 0, -0.01), P(6.91, 0, -0.01)], 'paper', 0.75);
  });
  for (const a of [1.65, 5.6]) {
    timber(H, R, i + a, j - 0.3, 0.42, 0.61, z + 0.07, 0.055, 'sun');
    const weave = H.tile(i + a + 0.07, j - 0.23, 0.28, 0.46, z + 0.13);
    surface(H, R, weave, 'sun', 0.28, 0.3);
    for (let n = 0; n < 5; n++) H.line(R, [P(a + 0.08 + n * 0.055, -0.23, 0.14), P(a + 0.08 + n * 0.055, 0.23, 0.14)], 'blue', 0.5);
    for (let n = 0; n < 5; n++) H.line(R, [P(a + 0.07, -0.2 + n * 0.09, 0.14), P(a + 0.35, -0.2 + n * 0.09, 0.14)], 'paper', 0.5);
  }
  timber(H, R, i + 3.57, j - 0.43, 0.16, 0.86, z + 0.09, 0.055, 'sun');
  H.outline(
    R,
    edge.map(([a, b]) => P(a, b, 0.045)),
    'paper',
    1.3,
    { tone: 0.9 }
  );
  for (const a of [0.4, 7.1]) H.outline(R, ell(...P(a, 0, 0.08), 4, 2), 'sun', 1.2);
}

function vest(H, R, x, y, ink = 'coral', twist = 0) {
  const p = (a, b) => [x + a + b * twist, y + b];
  shape(H, R, [p(-8, 1), p(-15, 8), p(-12, 31), p(-1, 34), p(0, 9)], ink, 0.84, 0.85);
  shape(H, R, [p(8, 1), p(15, 8), p(12, 31), p(1, 34), p(0, 9)], ink, 0.76, 0.85);
  stroke(H, R, [p(-8, 1), p(-7, -4), p(7, -4), p(8, 1)], 'blue', 1.4);
  for (const b of [16, 25]) {
    H.line(R, [p(-11, b), p(11, b)], 'blue', 2.1);
    shape(H, R, [p(-2, b - 2), p(3, b - 2), p(3, b + 2), p(-2, b + 2)], 'sun', 0.75, 0.5);
  }
  H.line(R, [p(-8, 7), p(-7, 12)], 'paper', 2.8);
  H.line(R, [p(8, 7), p(7, 12)], 'paper', 2.8);
}

function paddle(H, R, i, j, z, lean = 0, size = 1) {
  const [x, y] = H.p(i, j, z);
  H.line(
    R,
    [
      [x, y],
      [x + lean, y - 75 * size]
    ],
    'sun',
    3
  );
  shape(
    H,
    R,
    [
      [x - 5, y + 2],
      [x - 6, y + 25],
      [x, y + 31],
      [x + 6, y + 25],
      [x + 5, y + 2]
    ],
    'coral',
    0.63,
    0.7
  );
  H.line(
    R,
    [
      [x + lean - 5, y - 76 * size],
      [x + lean + 5, y - 76 * size]
    ],
    'blue',
    2.2
  );
}

const room = world(
  'new-york-bronx-boathouse',
  'Bronx River · Back from the River',
  { floor: 'paper', tone: 1, wall: false, head: 110 },
  (H, R) => {
    surface(H, R, H.tile(0, 0, 12, 12, 0.02), 'teal', 0.15);
    for (let n = 0; n < 10; n++) H.line(R, [H.p(0.1, n * 1.19, 0.03), H.p(11.9, n * 1.19, 0.03)], 'blue', 0.5, { tone: 0.3 });
    masonry(H, R, 'nw', 0.08, 11.84, 0, 3.78, 'coral', 0.25);
    surface(H, R, H.faceI(0.08, 0.12, 11.84, 0, 4.1), 'paper', 1);
    surface(H, R, H.faceI(8.55, 0.2, 3.04, 0.13, 3.46), 'teal', 0.23);
    H.clip(H.faceI(8.55, 0.2, 3.04, 0.13, 3.46), () => {
      branchSpray(H, R, ...H.p(9.03, 0.23, 1.6), 1.16, 'teal');
      branchSpray(H, R, ...H.p(11.36, 0.23, 1.13), 1.48, 'teal');
      surface(H, R, H.faceI(8.55, 0.25, 3.04, 0.13, 0.83), 'teal', 0.45);
    });
    for (const i of [8.37, 11.63]) timber(H, R, i, 0.2, 0.15, 0.38, 0.03, 3.72, 'sun');
    timber(H, R, 8.35, 0.2, 3.46, 0.38, 3.65, 0.17, 'sun');
    for (const i of [1.0, 4.44, 7.88]) {
      timber(H, R, i, 0.56, 0.16, 3.76, 3.73, 0.2, 'sun');
      for (const j of [0.61, 3.54])
        bentTube(
          H,
          R,
          [
            [i, j, 3.38],
            [i, j + 0.54, 3.74]
          ],
          2.1,
          'teal'
        );
    }
    for (const i of [1.83, 6.86]) for (const j of [1.07, 3.04]) metal(H, R, i, j, 0.12, 0.12, 0.05, 3.42, 'teal');
    for (const z of [0.88, 1.98, 3.08]) {
      for (const i of [1.83, 6.86]) {
        metal(H, R, i, 0.76, 0.1, 2.64, z - 0.12, 0.1, 'teal');
        bentTube(
          H,
          R,
          [
            [i, 1.17, z - 0.1],
            [i, 2.87, z - 0.1]
          ],
          2.4,
          'sun'
        );
      }
      canoe(H, R, 0.65, 1.83, z, z === 1.98 ? 'coral' : 'teal');
    }
    for (const j of [4.96, 9.42]) metal(H, R, 0.55, j, 0.12, 0.12, 0.03, 2.78, 'teal');
    bentTube(
      H,
      R,
      [
        [0.61, 4.98, 2.79],
        [0.61, 9.52, 2.79]
      ],
      2.8,
      'sun'
    );
    for (let n = 0; n < 7; n++) paddle(H, R, 0.61, 5.27 + n * 0.59, 0.09, n % 2 ? 0.14 : -0.12, 0.8 + (n % 3) * 0.07);
    slattedSeat(H, R, 2.48, 7.44, 3.1, 0.05, 'sun', 0.53);
    foldedCloth(H, R, 4.41, 7.63, 0.84, 0.49, 0.7, 'paper', 'teal');
    for (const [i, j] of [
      [8.74, 3.39],
      [8.74, 7.24]
    ]) {
      metal(H, R, i, j, 0.1, 0.1, 0.05, 2.92, 'teal');
      metal(H, R, i - 0.11, j - 0.11, 0.33, 0.33, 0.04, 0.11, 'blue');
    }
    bentTube(
      H,
      R,
      [
        [8.79, 3.44, 2.94],
        [8.79, 7.3, 2.94]
      ],
      2.4,
      'sun'
    );
    for (let n = 0; n < 5; n++) vest(H, R, ...H.p(8.79, 3.79 + n * 0.65, 2.5), n % 2 ? 'sun' : 'coral', n % 2 ? 0.035 : -0.04);
    surface(H, R, H.tile(8.47, 4.59, 2.76, 2.21, 0.036), 'teal', 0.24);
    for (let n = 0; n < 13; n++) H.line(R, [H.p(8.69 + n * 0.17, 6.52, 0.05), H.p(8.69 + n * 0.17, 6.79, 0.05)], 'blue', 0.9);
    benchFrame(H, R, 6.81, 9.11, 4.1, 1.81, 1.0, 'sun');
    shallowTray(H, R, 7.03, 9.29, 1.95, 1.26, 1.04, 'teal');
    for (let n = 0; n < 5; n++) vessel(H, R, 7.29 + n * 0.34, 9.88, 1.12, 3.5, 8, 'paper');
    coiledLine(H, R, 10.15, 9.99, 1.04, 13, 'sun');
    slattedCrate(H, R, 7.19, 9.48, 2.29, 1.21, 0.04, 0.52, 'sun');
    washBasin(H, R, 9.6, 1.32, 1.59, 1.41, 0.85, 'paper');
    for (const i of [9.65, 11.05]) for (const j of [1.39, 2.54]) metal(H, R, i, j, 0.1, 0.1, 0.03, 0.82, 'teal');
    pendant(H, R, 6.4, 5.04, 4.05, 3.12, 'paper', 1.02);
  },
  (H, R, t) => {
    const u = cycle(t, 18);
    actor(
      H,
      R,
      7.45,
      5.28,
      t,
      'newYorkVestDry',
      {
        shirt: ['teal', 0.55],
        pants: ['blue', 0.66],
        hairStyle: 'pony',
        face: 'se',
        prop(HH, RR, points) {
          const [x, y] = points.nearHand;
          vest(HH, RR, x, y + 4, 'coral', u > 0.3 && u < 0.6 ? Math.sin(u * Math.PI * 12) * 0.09 : 0);
          if (u > 0.31 && u < 0.49) {
            const drop = (u - 0.31) / 0.18;
            HH.opacity(Math.sin(drop * Math.PI), () => {
              HH.dot(x - 5, y + 38 + drop * 36, 1.8, 'teal', 0.6);
              HH.dot(x + 7, y + 41 + drop * 29, 1.5, 'teal', 0.6);
            });
          }
        }
      },
      0,
      1.25
    );
    actor(
      H,
      R,
      3.54,
      7.87,
      0,
      'sit',
      {
        shirt: ['sun', 0.62],
        hairStyle: 'cap',
        face: 'se',
        prop(HH, RR, points) {
          const [x, y] = points.nearHand;
          shape(
            HH,
            RR,
            [
              [x - 7, y - 3],
              [x + 7, y - 3],
              [x + 6, y + 4],
              [x - 6, y + 4]
            ],
            'paper',
            1,
            0.6
          );
        }
      },
      0.05,
      1.19
    );
    for (let n = 0; n < 3; n++) {
      const p = cycle(t + n * 5, 18);
      H.opacity(Math.sin(p * Math.PI) * 0.3, () => H.outline(R, ell(...H.p(9.1 + n * 0.6, 5.2, 0.035), 3 + p * 9, 1 + p * 3), 'teal', 0.7));
    }
  }
);
room.loopSeconds = 18;
export default room;
