import {
  benchFrame,
  bentTube,
  branchSpray,
  caneChair,
  cushion,
  floorLight,
  metal,
  pendant,
  slattedSeat,
  surface,
  timber,
  vessel
} from '../materials.js';
import { masonry, cabinetFrame, boardFloor } from '../structure.js';
import { windowBay } from '../joinery.js';
import { boundBook, foldedCloth } from '../furnishings.js';
import { actor, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const lowered = { ...rest, al: 40, ar: 40, el: 100, er: 95, head: 7 };
const playing = { ...rest, al: 115, ar: 91, el: 50, er: 81, head: -3, lean: -2 };
FIGURES.clips.newYorkTrumpetPhrase = {
  dur: 12,
  keys: [
    [0, lowered],
    [0.12, lowered],
    [0.28, playing],
    [0.4, { ...playing, al: 113, head: -5 }],
    [0.53, playing],
    [0.67, { ...playing, ar: 93, head: -1 }],
    [0.8, playing],
    [0.91, lowered],
    [1, lowered]
  ]
};

function trumpet(H, R, hand, raised, t) {
  const [x, y] = hand,
    angle = -0.12 + (1 - raised) * 0.72;
  const p = (a, b) => [x + a * Math.cos(angle) - b * Math.sin(angle), y + a * Math.sin(angle) + b * Math.cos(angle)];
  stroke(H, R, [p(-6, -2), p(19, -2), p(29, -5)], 'sun', 3.6);
  stroke(H, R, [p(24, 0), p(19, 8), p(1, 8), p(-1, 2), p(2, 0), p(18, 0)], 'sun', 3.2);
  stroke(H, R, [p(24, 0), p(19, 8), p(1, 8)], 'blue', 0.55);
  shape(H, R, [p(22, -4), p(36, -10), p(36, 4), p(22, 0)], 'sun', 0.9, 0.65);
  const rim = ell(0, 0, 2.6, 7, 20).map(([a, b]) => p(36 + a, b - 3));
  shape(H, R, rim, 'coral', 0.65, 0.7);
  for (let q = 0; q < 3; q++) {
    const press = raised > 0.8 ? Math.max(0, Math.sin(t * 5 + q * 2)) * 1.6 : 0;
    stroke(H, R, [p(4 + q * 5, 5), p(4 + q * 5, -5 + press)], 'sun', 2.2);
    H.line(R, [p(1 + q * 5, -6 + press), p(7 + q * 5, -6 + press)], 'blue', 1.1);
  }
  H.line(R, [p(-10, -2), p(-5, -2)], 'blue', 1.6);
  H.line(R, [p(-4, -3), p(19, -3), p(29, -6)], 'paper', 0.8);
  for (let n = 0; n < 3; n++) {
    const a = 4 + n * 5;
    H.line(R, [p(a - 2, 2), p(a - 2, 8), p(a + 2, 8)], 'blue', 0.5);
    H.line(R, [p(a - 2, 2), p(a + 2, 2)], 'paper', 0.8);
  }
  H.line(R, [p(7, 8), p(7, 12), p(16, 12), p(16, 8)], 'sun', 1.1);
  const inner = ell(0, 0, 1.3, 4.6, 20).map(([a, b]) => p(36 + a, b - 3));
  surface(H, R, inner, 'blue', 0.65, 0.4);
}

const room = world(
  'new-york-corona-trumpet',
  'Corona · A Phrase for the Window',
  { floor: 'paper', tone: 1, wall: false, head: 105 },
  (H, R) => {
    boardFloor(H, R, 0.05, 0.07, 11.91, 11.86, 0.025, 'sun', 0.42);
    masonry(H, R, 'ne', 0.08, 11.84, 0, 4.07, 'paper', 1);
    surface(H, R, H.faceJ(0.13, 0.13, 11.74, 0, 4.07), 'teal', 0.18);
    const bay = [H.p(5.36, 0.18, 1.25), H.p(10.86, 0.18, 1.25), H.p(10.86, 0.18, 3.56), H.p(8.11, 0.18, 3.88), H.p(5.36, 0.18, 3.56)];
    surface(H, R, bay, 'blue', 0.62);
    for (let n = 0; n < 3; n++)
      windowBay(H, R, 'ne', 5.46 + n * 1.8, 1.68, 1.42, 2.06, {
        ink: 'sun',
        divisions: 1,
        view: (P) => {
          for (let k = 0; k < 4; k++) H.line(R, [P(0.2 + k * 0.41, 0.1), P(0.2 + k * 0.41, 0.58 + (k % 2) * 0.31)], 'coral', 7);
        }
      });
    cabinetFrame(H, R, 5.34, 0.41, 5.57, 1.39, 0.03, 1.02, 3, 'sun', (i, j, w, d, z, h, n) => {
      for (let k = 0; k < 4; k++) boundBook(H, R, i + 0.14, j + 0.1 + k * 0.25, w - 0.28, 0.2, z + 0.11, n % 2 ? 'coral' : 'teal');
    });
    cushion(H, R, 5.4, 0.46, 5.42, 1.29, 1.08, 0.14, 'coral');
    for (let n = 0; n < 10; n++) surface(H, R, H.faceJ(0.2, 1.0 + n * 0.66, 0.45, 1.41, 3.42), n % 2 ? 'sun' : 'teal', 0.25, 0.6);
    cabinetFrame(H, R, 0.49, 1.0, 2.15, 2.87, 0.03, 1.28, 1, 'sun', (i, j, w, d, z, h) => {
      for (let n = 0; n < 9; n++) timber(H, R, i + 0.12 + n * 0.19, j + 0.14, 0.13, d - 0.28, z, 0.86, n % 3 ? 'blue' : 'coral');
    });
    metal(H, R, 0.68, 1.18, 1.75, 1.45, 1.33, 0.11, 'teal');
    surface(H, R, ell(...H.p(1.52, 1.93, 1.47), 17, 7), 'blue', 0.9);
    surface(H, R, ell(...H.p(1.52, 1.93, 1.48), 5, 2.2), 'coral', 0.78);
    bentTube(
      H,
      R,
      [
        [2.12, 1.36, 1.5],
        [1.93, 2.0, 1.5],
        [1.67, 2.25, 1.5]
      ],
      1.4,
      'paper'
    );
    surface(H, R, H.tile(2.94, 4.47, 4.42, 4.63, 0.037), 'coral', 0.26);
    for (let n = 0; n < 16; n++) H.line(R, [H.p(3.07 + n * 0.26, 8.95, 0.04), H.p(3.07 + n * 0.26, 9.21, 0.04)], 'sun', 1);
    const [mx, my] = H.p(6.39, 5.67, 0.04);
    for (const [dx, dy] of [
      [-19, 4],
      [19, 4],
      [0, -12]
    ])
      H.line(
        R,
        [
          [mx, my - 13],
          [mx + dx, my + dy]
        ],
        'teal',
        2
      );
    H.line(
      R,
      [
        [mx, my - 12],
        [mx, my - 64]
      ],
      'teal',
      2.3
    );
    surface(
      H,
      R,
      [
        [mx - 25, my - 64],
        [mx + 24, my - 57],
        [mx + 26, my - 93],
        [mx - 22, my - 99]
      ],
      'teal',
      0.68
    );
    surface(
      H,
      R,
      [
        [mx - 20, my - 67],
        [mx + 18, my - 62],
        [mx + 20, my - 88],
        [mx - 18, my - 93]
      ],
      'paper',
      1
    );
    for (let n = 0; n < 5; n++)
      H.line(
        R,
        [
          [mx - 15, my - 86 + n * 4],
          [mx + 15, my - 81 + n * 4]
        ],
        'blue',
        0.55
      );
    for (let n = 0; n < 8; n++) H.dot(mx - 12 + n * 3.5, my - 75 + (n % 3) * 3, 1.1, 'blue', 0.8);
    caneChair(H, R, 3.94, 6.08, 'sun');
    metal(H, R, 7.81, 7.52, 2.92, 1.27, 0.04, 0.17, 'teal');
    surface(H, R, H.tile(7.99, 7.67, 2.55, 0.95, 0.23), 'blue', 0.72);
    for (let n = 0; n < 3; n++) vessel(H, R, 8.41 + n * 0.7, 8.15, 0.25, 5, 9, 'sun');
    surface(H, R, [H.p(7.82, 7.5, 0.23), H.p(10.73, 7.5, 0.23), H.p(10.73, 7.12, 1.22), H.p(7.82, 7.12, 1.22)], 'teal', 0.64);
    H.line(R, [H.p(8.03, 7.4, 0.37), H.p(10.52, 7.4, 0.37)], 'sun', 1.3);
    benchFrame(H, R, 8.6, 9.66, 2.25, 1.12, 0.94, 'sun');
    boundBook(H, R, 8.81, 9.82, 1.12, 0.73, 0.98, 'paper');
    vessel(H, R, 10.32, 10.22, 0.98, 5, 10, 'teal');
    vessel(H, R, 0.7, 7.52, 0.03, 15, 25, 'coral');
    branchSpray(H, R, ...H.p(0.7, 7.52, 0.9), 0.97, 'teal');
    slattedSeat(H, R, 1.12, 9.5, 2.83, 0.03, 'sun', 0.57);
    foldedCloth(H, R, 1.37, 9.66, 1.23, 0.49, 0.68, 'coral', 'paper');
    pendant(H, R, 4.78, 5.06, 4.17, 3.04, 'sun', 1.02);
    floorLight(H, 7.65, 4.56, 93, 0.2);
  },
  (H, R, t) => {
    const u = cycle(t, 12),
      raised =
        u < 0.12
          ? 0
          : u < 0.28
            ? (1 - Math.cos(((u - 0.12) / 0.16) * Math.PI)) / 2
            : u < 0.8
              ? 1
              : u < 0.91
                ? (1 + Math.cos(((u - 0.8) / 0.11) * Math.PI)) / 2
                : 0;
    H.at(4.4, 6.32, 0, (HH) =>
      actor(
        HH,
        R,
        4.4,
        6.32,
        t,
        'newYorkTrumpetPhrase',
        {
          shirt: ['coral', 0.68],
          pants: ['blue', 0.63],
          skin: ['coral', 0.5],
          hairStyle: 'curly',
          prop: (h, r, p) => trumpet(h, r, p.nearHand, raised, t)
        },
        0,
        1.45
      )
    );
    const [x, y] = H.p(0.7, 7.52, 1.0);
    stroke(
      H,
      R,
      [
        [x, y],
        [x + 3, y - 17],
        [x + 8 + Math.sin(u * Math.PI * 2) * 2, y - 30]
      ],
      'teal',
      1.2
    );
    oval(H, R, x + 9 + Math.sin(u * Math.PI * 2) * 2, y - 29, 6, 3, 'teal', 0.8);
  }
);
room.loopSeconds = 12;
export default room;
