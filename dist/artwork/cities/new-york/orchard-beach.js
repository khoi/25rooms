import { bentTube, branchSpray, metal, slattedSeat, surface, timber, vessel } from '../materials.js';
import { basin as washBasin } from '../structure.js';

import { foldedCloth } from '../furnishings.js';
import { actor, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const ready = { ...rest, ll: -16, lr: 16, kl: 14, kr: 12, al: 36, el: 70, ar: 55, er: 55, head: -5, lean: -2 };
const strike = { ...rest, ll: -25, lr: 27, kl: 18, kr: 20, al: -28, el: 20, ar: 110, er: 0, head: -14, lean: -8 };
FIGURES.clips.newYorkHandballRally = {
  dur: 10,
  keys: [
    [0, ready],
    [0.12, ready],
    [0.2, { ...ready, ar: 13, er: 100, lean: -13 }],
    [0.26, strike],
    [0.82, strike],
    [0.94, ready],
    [1, ready]
  ]
};
const seated = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, al: 15, ar: 38, el: 35, er: 70, head: -6 };
FIGURES.clips.newYorkHandballFriend = {
  dur: 10,
  keys: [
    [0, seated],
    [0.3, { ...seated, head: -16 }],
    [0.5, { ...seated, head: -9 }],
    [0.69, { ...seated, head: 5 }],
    [0.87, seated],
    [1, seated]
  ]
};

function duffel(H, R, i, j) {
  const [x, y] = H.p(i, j, 0.05);
  shape(
    H,
    R,
    [
      [x - 18, y + 2],
      [x + 17, y + 2],
      [x + 21, y - 14],
      [x + 13, y - 20],
      [x - 13, y - 20],
      [x - 21, y - 12]
    ],
    'coral',
    0.72,
    0.85
  );
  for (const dx of [-10, 10])
    stroke(
      H,
      R,
      [
        [x + dx - 3, y],
        [x + dx - 3, y - 18],
        [x + dx + 4, y - 20],
        [x + dx + 4, y]
      ],
      'blue',
      1.1
    );
  stroke(
    H,
    R,
    [
      [x - 7, y - 19],
      [x - 6, y - 28],
      [x + 6, y - 28],
      [x + 8, y - 19]
    ],
    'blue',
    1.7
  );
  H.line(
    R,
    [
      [x - 13, y - 18],
      [x + 12, y - 18]
    ],
    'paper',
    0.8
  );
  H.dot(x + 4, y - 17, 1.5, 'sun');
}

const room = world(
  'new-york-orchard-beach',
  'Orchard Beach · Off the Wall',
  { floor: 'paper', tone: 1, wall: false, head: 115 },
  (H, R) => {
    surface(H, R, H.tile(0, 0, 12, 12, 0.02), 'sun', 0.14);
    surface(H, R, H.tile(1.82, 0.54, 7.42, 10.78, 0.032), 'teal', 0.27);
    surface(H, R, H.faceI(1.53, 0.49, 7.98, 0.02, 4.65), 'teal', 0.41);
    surface(H, R, H.faceI(1.7, 0.57, 7.61, 0.15, 4.44), 'paper', 1);
    for (const z of [0.49, 2.51]) H.line(R, [H.p(1.77, 0.59, z), H.p(9.22, 0.59, z)], 'coral', 1.5);
    H.line(R, [H.p(5.52, 0.59, 0.17), H.p(5.52, 0.59, 4.4)], 'teal', 0.55, { tone: 0.26 });
    for (const i of [1.48, 9.41]) timber(H, R, i, 0.24, 0.23, 0.63, 0.03, 4.68, 'teal');
    timber(H, R, 1.45, 0.27, 8.17, 0.42, 4.64, 0.14, 'paper');
    for (const z of [1.53, 3.71]) for (const i of [1.54, 9.44]) metal(H, R, i, 0.16, 0.16, 0.17, z, 0.23, 'sun');
    for (const [i, j] of [
      [1.94, 0.72],
      [9.06, 0.72],
      [1.94, 11.09],
      [9.06, 11.09]
    ])
      H.line(R, [H.p(i, j, 0.05), H.p(i, j > 6 ? j - 0.48 : j + 0.48, 0.05)], 'paper', 1.4);
    for (const j of [5.57, 8.76, 11.08]) H.line(R, [H.p(1.96, j, 0.05), H.p(9.03, j, 0.05)], 'paper', 2.4);
    for (const i of [1.94, 9.06]) H.line(R, [H.p(i, 0.75, 0.05), H.p(i, 11.1, 0.05)], 'paper', 2.4);
    for (const j of [0.62, 3.29, 5.97, 8.65, 11.33]) {
      metal(H, R, 0.28, j, 0.085, 0.085, 0.03, 3.51, 'teal');
      surface(H, R, ell(...H.p(0.32, j + 0.04, 3.55), 2.2, 1.9), 'paper', 1);
    }
    for (const z of [0.2, 3.45])
      bentTube(
        H,
        R,
        [
          [0.31, 0.67, z],
          [0.31, 11.42, z]
        ],
        2.2,
        'teal'
      );
    H.clip(H.faceJ(0.31, 0.67, 10.7, 0.22, 3.44), () => {
      for (let n = -10; n < 42; n++) {
        const j = n * 0.42;
        H.line(R, [H.p(0.31, j, 0.23), H.p(0.31, j + 3.21, 3.44)], 'teal', 0.6, { tone: 0.55 });
        H.line(R, [H.p(0.31, j, 3.44), H.p(0.31, j + 3.21, 0.23)], 'teal', 0.6, { tone: 0.55 });
      }
    });
    for (let n = 0; n < 7; n++) {
      const j = 1.0 + n * 1.45;
      branchSpray(H, R, ...H.p(0.16, j, 0.19), 0.67 + (n % 2) * 0.18, 'teal');
    }
    slattedSeat(H, R, 9.65, 3.16, 1.63, 0.03, 'sun', 0.58);
    duffel(H, R, 10.2, 4.43);
    foldedCloth(H, R, 9.81, 3.31, 0.63, 0.52, 0.68, 'paper', 'coral');
    metal(H, R, 10.12, 0.83, 0.9, 0.93, 0.07, 0.72, 'teal');
    washBasin(H, R, 10.12, 0.83, 0.9, 0.93, 0.81, 'paper');
    vessel(H, R, 10.49, 10.63, 0.03, 13, 25, 'teal');
    vessel(H, R, 9.72, 9.27, 0.04, 4, 12, 'coral');
    for (const [i, j] of [
      [3.4, 10.42],
      [8.3, 3.03],
      [2.16, 7.79]
    ])
      H.line(R, [H.p(i, j, 0.05), H.p(i + 0.17, j + 0.23, 0.05), H.p(i + 0.42, j + 0.18, 0.05)], 'blue', 0.7, { tone: 0.55 });
    for (let n = 0; n < 14; n++) H.line(R, [H.p(9.61 + n * 0.12, 5.67, 0.04), H.p(9.61 + n * 0.12, 6.18, 0.04)], 'blue', 1);
  },
  (H, R, t) => {
    const u = cycle(t, 10);
    H.at(4.93, 8.0, 0, (HH) =>
      actor(
        HH,
        R,
        4.93,
        8.0,
        t,
        'newYorkHandballRally',
        {
          shirt: ['sun', 0.75],
          pants: ['blue', 0.68],
          skin: ['coral', 0.5],
          hairStyle: 'short',
          prop: (h, r, p) => {
            const start = p.nearHand,
              wall = h.p(7.5, 0.58, 1.84),
              ground = h.p(6.04, 5.68, 0.08);
            let point = start;
            const segment = (a, b, v, hop = 0) => [a[0] + (b[0] - a[0]) * v, a[1] + (b[1] - a[1]) * v - Math.sin(v * Math.PI) * hop];
            if (u >= 0.26 && u < 0.44) point = segment(start, wall, (u - 0.26) / 0.18, 11);
            else if (u >= 0.44 && u < 0.64) point = segment(wall, ground, (u - 0.44) / 0.2);
            else if (u >= 0.64 && u < 0.82) point = segment(ground, start, (u - 0.64) / 0.18, 29);
            if (u >= 0.26 && u < 0.82) oval(h, r, point[0] + 4, Math.max(point[1] + 15, ground[1]), 4.5, 1.5, 'blue', 0.15);
            oval(h, r, point[0], point[1], 4.1, 4.1, 'blue', 0.9);
            h.dot(point[0] - 1, point[1] - 1, 1.1, 'paper', 0.8);
            const [x, y] = p.head;
            h.line(
              r,
              [
                [x - 7, y - 3],
                [x + 7, y - 3]
              ],
              'coral',
              2.1
            );
          }
        },
        0,
        1.48
      )
    );
    H.at(10.35, 7.98, 0, (HH) =>
      actor(
        HH,
        R,
        10.35,
        7.98,
        t,
        'newYorkHandballFriend',
        {
          face: 'sw',
          shirt: ['coral', 0.67],
          pants: ['blue', 0.66],
          hairStyle: 'curly',
          skin: ['coral', 0.44],
          prop: (h, r, p) => {
            const [x, y] = p.nearHand;
            shape(
              h,
              r,
              [
                [x - 3, y + 4],
                [x + 4, y + 4],
                [x + 4, y - 10],
                [x - 3, y - 10]
              ],
              'teal',
              0.6,
              0.55
            );
            h.line(
              r,
              [
                [x - 2, y - 12],
                [x + 3, y - 12]
              ],
              'paper',
              2.2
            );
          }
        },
        0,
        1.35
      )
    );
  }
);
room.loopSeconds = 10;
room.stillTime = 0;
export default room;
