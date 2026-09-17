import { benchFrame, bentTube, branchSpray, caneChair, cushion, drape, metal, pendant, surface, timber, vessel } from '../materials.js';
import { masonry, cabinetFrame, boardFloor } from '../structure.js';
import { taskLight, windowBay } from '../joinery.js';
import { boundBook } from '../furnishings.js';
import { actor, cycle, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, al: 53, el: 75, ar: 35, er: 70, head: 6 };
const reach = { ...seated, ar: 153, er: 8, head: -17, lean: 3 };
FIGURES.clips.newYorkCurtain = {
  dur: 18,
  keys: [
    [0, seated],
    [0.13, seated],
    [0.23, reach],
    [0.37, { ...reach, ar: 90, er: 14 }],
    [0.53, { ...reach, ar: 90, er: 14 }],
    [0.7, reach],
    [0.83, seated],
    [1, seated]
  ]
};
const ease = (value) => {
  const q = Math.max(0, Math.min(1, value));
  return q * q * (3 - 2 * q);
};

function cup(H, R, x, y) {
  shape(
    H,
    R,
    [
      [x - 5, y - 10],
      [x + 5, y - 10],
      [x + 5, y + 1],
      [x - 4, y + 2]
    ],
    'sun',
    0.72,
    0.7
  );
  oval(H, R, x, y - 10, 5, 2, 'paper', 1);
  oval(H, R, x, y - 10, 3, 1.2, 'blue', 0.56);
  stroke(
    H,
    R,
    [
      [x + 5, y - 8],
      [x + 10, y - 8],
      [x + 10, y - 1],
      [x + 5, y]
    ],
    'blue',
    1.1
  );
}

function curtain(H, R, open) {
  const width = 1.94 - open * 1.36;
  for (const side of [-1, 1]) {
    const left = side < 0 ? 7.13 : 11.23 - width;
    const poly = [H.p(left, 0.105, 3.64), H.p(left + width, 0.105, 3.64), H.p(left + width + 0.06, 0.18, 0.99), H.p(left + 0.02, 0.18, 1.03)];
    shape(H, R, poly, 'blue', 0.77, 0.75);
    for (let n = 1; n < 6; n++) {
      const i = left + (width * n) / 6;
      stroke(H, R, [H.p(i, 0.12, 3.61), H.p(i - 0.05, 0.2, 2.4), H.p(i + 0.05, 0.19, 1.06)], n % 2 ? 'teal' : 'paper', 0.9, 0.35);
    }
    for (let n = 0; n < 6; n++) oval(H, R, ...H.p(left + (width * (n + 0.3)) / 6, 0.115, 3.67), 2, 3, 'sun', 0.64);
  }
}

const room = world(
  'new-york-lower-east-bedroom',
  'Lower East Side · The Other Morning',
  { floor: 'paper', tone: 1, wall: false, head: 125 },
  (H, R) => {
    boardFloor(H, R, 0.05, 0.05, 11.9, 11.9, 0.025, 'sun', 0.44);
    masonry(H, R, 'ne', 0.07, 11.85, 0, 4.53, 'paper', 1);
    masonry(H, R, 'nw', 0.07, 11.85, 0, 4.53, 'coral', 0.18);
    windowBay(H, R, 'ne', 7.12, 4.11, 1.0, 2.61, {
      ink: 'teal',
      divisions: 2,
      view: (P) => {
        for (let n = 0; n < 6; n++) {
          const u = 0.1 + n * 0.67;
          surface(H, R, [P(u, 0.1), P(u + 0.52, 0.1), P(u + 0.52, 0.8 + (n % 3) * 0.37), P(u, 0.8 + (n % 3) * 0.37)], 'coral', 0.29);
          for (let k = 0; k < 4; k++)
            H.line(
              R,
              [P(u + 0.12 + (k % 2) * 0.22, 0.25 + Math.floor(k / 2) * 0.25), P(u + 0.12 + (k % 2) * 0.22, 0.4 + Math.floor(k / 2) * 0.25)],
              'blue',
              1.1
            );
        }
        for (const v of [0.69, 1.41]) H.line(R, [P(0, v), P(4.1, v)], 'blue', 2);
        for (let n = 0; n < 15; n++) H.line(R, [P(n * 0.29, 0.7), P(n * 0.29, 1.41)], 'blue', 0.75);
      }
    });
    bentTube(
      H,
      R,
      [
        [6.91, 0.16, 3.72],
        [11.46, 0.16, 3.72]
      ],
      2.2,
      'sun'
    );
    for (let n = 0; n < 14; n++)
      bentTube(
        H,
        R,
        [
          [7.32 + n * 0.265, 0.56, 0.21],
          [7.32 + n * 0.265, 0.56, 0.81],
          [7.44 + n * 0.265, 0.75, 0.83],
          [7.44 + n * 0.265, 0.75, 0.22]
        ],
        2.7,
        'paper'
      );
    benchFrame(H, R, 0.79, 1.16, 4.28, 1.52, 0.95, 'sun');
    boundBook(H, R, 1.04, 1.4, 1.24, 0.82, 0.99, 'paper');
    metal(H, R, 2.82, 1.38, 1.28, 0.94, 0.99, 0.055, 'teal');
    surface(H, R, H.faceI(2.84, 1.36, 1.24, 1.03, 1.87), 'blue', 0.77);
    surface(H, R, H.faceI(2.94, 1.38, 1.04, 1.14, 1.76), 'paper', 1);
    taskLight(H, R, 4.73, 1.47, 1.0, 'coral', -0.54);
    caneChair(H, R, 2.1, 3.1, 'teal');
    for (const i of [0.46, 5.57])
      for (const j of [0.54, 5.21]) {
        timber(H, R, i, j, 0.2, 0.2, 0.03, 3.93, 'teal');
        metal(H, R, i - 0.045, j - 0.045, 0.29, 0.29, 0.05, 0.12, 'sun');
      }
    for (const j of [0.54, 5.21]) timber(H, R, 0.45, j, 5.34, 0.21, 2.23, 0.21, 'sun');
    boardFloor(H, R, 0.49, 0.57, 5.14, 4.78, 2.47, 'sun', 0.38);
    cushion(H, R, 0.67, 0.73, 4.76, 4.12, 2.5, 0.26, 'paper');
    cushion(H, R, 0.88, 0.91, 2.14, 0.98, 2.79, 0.23, 'sun');
    cushion(H, R, 3.19, 0.98, 1.98, 0.94, 2.79, 0.2, 'paper');
    drape(H, R, 0.7, 2.03, 4.68, 2.94, 2.81, 0.42, 'teal');
    for (let n = 0; n < 8; n++) H.line(R, [H.p(0.82 + n * 0.58, 2.13, 2.82), H.p(0.82 + n * 0.58, 4.91, 2.82)], 'sun', 0.7);
    for (const i of [0.55, 1.47, 2.39, 3.31, 4.23]) timber(H, R, i, 5.26, 0.09, 0.11, 2.47, 0.7, 'teal');
    timber(H, R, 0.5, 5.24, 3.99, 0.13, 3.17, 0.11, 'teal');
    for (const i of [4.59, 5.61])
      bentTube(
        H,
        R,
        [
          [i, 7.33, 0.04],
          [i, 5.52, 2.48]
        ],
        3.2,
        'sun'
      );
    for (let n = 0; n < 7; n++) {
      const f = n / 6;
      bentTube(
        H,
        R,
        [
          [4.59, 7.29 - f * 1.72, 0.16 + f * 2.24],
          [5.61, 7.29 - f * 1.72, 0.16 + f * 2.24]
        ],
        2.7,
        'teal'
      );
    }
    cabinetFrame(H, R, 0.42, 6.46, 1.99, 4.56, 0.03, 2.62, 1, 'sun', (i, j, w, d, z, h) => {
      for (let row = 0; row < 4; row++) {
        timber(H, R, i, j, w, d, z + row * 0.59, 0.08, 'sun');
        for (let n = 0; n < 5; n++)
          boundBook(H, R, i + 0.13, j + 0.1 + n * 0.81, w - 0.26, 0.65, z + 0.12 + row * 0.59, ['paper', 'coral', 'teal'][(row + n) % 3]);
      }
    });
    caneChair(H, R, 8.53, 2.97, 'coral');
    benchFrame(H, R, 10.06, 3.73, 1.28, 1.06, 0.7, 'sun');
    vessel(H, R, 10.72, 4.22, 0.75, 6, 10, 'teal');
    surface(H, R, H.tile(6.51, 6.71, 4.77, 3.89, 0.039), 'coral', 0.22);
    for (let n = 0; n < 11; n++) H.line(R, [H.p(6.62 + n * 0.41, 10.58, 0.04), H.p(6.62 + n * 0.41, 10.79, 0.04)], 'sun', 1);
    timber(H, R, 8.02, 8.58, 3.15, 1.95, 0.09, 0.48, 'teal');
    cushion(H, R, 8.07, 8.62, 3.05, 1.84, 0.61, 0.2, 'sun');
    cushion(H, R, 8.08, 8.52, 3.02, 0.3, 0.81, 0.51, 'sun');
    cushion(H, R, 8.29, 8.88, 0.82, 0.74, 0.84, 0.18, 'coral');
    benchFrame(H, R, 5.13, 10.27, 1.5, 1.09, 0.68, 'teal');
    boundBook(H, R, 5.3, 10.43, 1.09, 0.69, 0.72, 'paper');
    vessel(H, R, 10.77, 6.25, 0.03, 13, 21, 'coral');
    branchSpray(H, R, ...H.p(10.77, 6.25, 0.66), 1.0, 'teal');
    pendant(H, R, 7.17, 6.13, 4.4, 3.15, 'paper', 0.98);
  },
  (H, R, t) => {
    const u = cycle(t, 18),
      open = ease((u - 0.23) / 0.14) * (1 - ease((u - 0.53) / 0.17));
    curtain(H, R, open);
    H.opacity(open * 0.15, () => H.tint([H.p(7.9, 0.8, 0.025), H.p(10.48, 0.8, 0.025), H.p(9.22, 6.1, 0.025), H.p(5.4, 5.15, 0.025)], 'sun', 0.65));
    actor(
      H,
      R,
      9.04,
      3.33,
      t,
      'newYorkCurtain',
      {
        shirt: ['paper', 1],
        pants: ['teal', 0.55],
        hairStyle: 'short',
        face: 'ne',
        prop(HH, RR, points) {
          cup(HH, RR, points.farHand[0], points.farHand[1] + 2);
          const anchor = HH.p(9.38, 0.2, 3.68),
            parked = HH.p(9.52, 0.3, 1.32);
          const hold = ease((u - 0.13) / 0.1) * (1 - ease((u - 0.7) / 0.13));
          const end = [parked[0] * (1 - hold) + points.nearHand[0] * hold, parked[1] * (1 - hold) + points.nearHand[1] * hold];
          stroke(HH, RR, [anchor, [anchor[0] + 3, (anchor[1] + end[1]) / 2], end], 'sun', 1.4, 0.8);
          oval(HH, RR, end[0], end[1] + 4, 2.5, 4, 'sun', 0.73);
        }
      },
      0.1,
      1.25
    );
    const [x, y] = H.p(5.89, 10.84, 0.73);
    shape(
      H,
      R,
      [
        [x - 12, y],
        [x + 10, y - 3],
        [x + 11, y + 7 + Math.sin(u * Math.PI * 2) * 1.5],
        [x - 10, y + 10]
      ],
      'paper',
      1,
      0.6
    );
  }
);
room.loopSeconds = 18;
export default room;
