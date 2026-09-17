import { benchFrame, bentTube, caneChair, metal, pendant, surface, timber, vessel } from '../materials.js';
import { masonry, archedBay, cabinetFrame, rackFrame, boardFloor } from '../structure.js';
import { caster } from '../joinery.js';
import { boundBook } from '../furnishings.js';
import { actor, box, cycle, oval, shape, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const reading = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -8, head: 15, al: 59, el: 40, ar: 72, er: 15 };
FIGURES.clips.newYorkMapTrace = {
  dur: 12,
  keys: [
    [0, reading],
    [0.17, reading],
    [0.38, { ...reading, ar: 92, er: -2, head: 8 }],
    [0.58, { ...reading, ar: 86, er: 15, head: 8 }],
    [0.71, { ...reading, ar: 47, er: 115, head: -9 }],
    [0.86, { ...reading, ar: 47, er: 115, head: -9 }],
    [1, reading]
  ]
};
FIGURES.clips.newYorkMapLibrarian = {
  dur: 12,
  keys: [
    [0, { ...rest, al: 52, el: 75, ar: 52, er: 75, head: 10 }],
    [0.35, { ...rest, al: 52, el: 75, ar: 69, er: 30, head: 17 }],
    [0.6, { ...rest, al: 52, el: 75, ar: 69, er: 30, head: 17 }],
    [0.8, { ...rest, al: 52, el: 75, ar: 52, er: 75, head: -4 }],
    [1, { ...rest, al: 52, el: 75, ar: 52, er: 75, head: 10 }]
  ]
};

function cabinet(H, R, i, j, w, d, count = 7) {
  box(H, R, i, j, w, d, 0.05, 1.42, 'teal', 0.6);
  for (let q = 0; q < count; q++) {
    const z = 0.15 + (q * 1.15) / count;
    shape(H, R, H.faceI(i + 0.09, j + d + 0.02, w - 0.18, z, z + 1.08 / count), 'paper', 0.88, 0.55);
    for (const x of [i + w * 0.28, i + w * 0.72]) {
      H.line(R, [H.p(x - 0.16, j + d + 0.05, z + 0.08), H.p(x + 0.16, j + d + 0.05, z + 0.08)], 'blue', 1.4);
      H.dot(...H.p(x - 0.16, j + d + 0.05, z + 0.1), 0.9, 'sun');
      H.dot(...H.p(x + 0.16, j + d + 0.05, z + 0.1), 0.9, 'sun');
    }
    shape(H, R, H.faceI(i + w / 2 - 0.12, j + d + 0.06, 0.24, z + 0.025, z + 0.1), 'sun', 0.4, 0.4);
  }
  box(H, R, i - 0.04, j - 0.04, w + 0.08, d + 0.08, 1.46, 0.1, 'sun', 0.52);
  const z = 0.15 + (3 * 1.15) / count;
  metal(H, R, i + 0.12, j + d - 0.06, w - 0.24, 0.57, z, 0.055, 'teal');
  for (let n = 0; n < 3; n++) {
    const points = H.tile(i + 0.23 + n * 0.025, j + d + 0.05 + n * 0.018, w - 0.46, 0.39, z + 0.061 + n * 0.018);
    surface(H, R, points, 'paper', 1, 0.4);
    for (let k = 0; k < 4; k++)
      H.line(
        R,
        [H.p(i + 0.31 + (k * (w - 0.6)) / 4, j + d + 0.08, z + 0.12), H.p(i + 0.39 + (k * (w - 0.6)) / 4, j + d + 0.36, z + 0.12)],
        'teal',
        0.45
      );
  }
  timber(H, R, i + 0.08, j + d + 0.51, w - 0.16, 0.08, z - 0.005, 0.12, 'sun');
  for (const x of [i + w * 0.3, i + w * 0.7])
    bentTube(
      H,
      R,
      [
        [x - 0.1, j + d + 0.61, z + 0.025],
        [x - 0.1, j + d + 0.63, z + 0.08],
        [x + 0.1, j + d + 0.63, z + 0.08],
        [x + 0.1, j + d + 0.61, z + 0.025]
      ],
      0.8,
      'blue'
    );
}

function map(H, R) {
  const frame = H.tile(3.28, 4.03, 5.48, 3.69, 1.08);
  shape(H, R, frame, 'paper', 1);
  const water = [
    [3.48, 4.21],
    [4.34, 4.21],
    [5.05, 4.68],
    [5.25, 5.18],
    [6.62, 6.3],
    [7.85, 7.5],
    [6.98, 7.5],
    [5.88, 6.41],
    [4.64, 5.66],
    [4.38, 5.13]
  ].map(([i, j]) => H.p(i, j, 1.1));
  H.clip(frame, () => {
    shape(H, R, water, 'teal', 0.32, 0.65);
    for (let i = 3.5; i < 8.6; i += 0.35)
      for (let j = 4.23; j < 7.48; j += 0.28) {
        if ((i > 4.1 && i < 5.3 && j < 5.5) || (i > 5.1 && i < 7.35 && j > 5.5)) continue;
        shape(H, R, H.tile(i, j, 0.27, 0.2, 1.11), (Math.round(i * 10) + Math.round(j * 10)) % 7 === 0 ? 'teal' : 'sun', 0.18, 0.37);
      }
    for (const [i, j] of [
      [4.7, 5.28],
      [6.24, 6.15]
    ]) {
      H.line(R, [H.p(i - 0.42, j + 0.25, 1.12), H.p(i + 0.58, j - 0.3, 1.12)], 'blue', 2);
      H.line(R, [H.p(i - 0.42, j + 0.25, 1.12), H.p(i + 0.58, j - 0.3, 1.12)], 'paper', 0.9);
    }
    shape(H, R, H.tile(7.51, 4.27, 0.82, 0.63, 1.13), 'teal', 0.36, 0.45);
    for (let n = 0; n < 3; n++) H.line(R, [H.p(3.65, 7.0 + n * 0.13, 1.12), H.p(4.83 - n * 0.16, 7.0 + n * 0.13, 1.12)], 'blue', 0.5);
  });
  for (const [i, j] of [
    [3.49, 4.3],
    [8.4, 4.25],
    [3.53, 7.45],
    [8.45, 7.45]
  ]) {
    oval(H, R, ...H.p(i, j, 1.15), 6, 3, 'blue', 0.58);
    H.line(R, [H.p(i - 0.12, j, 1.17), H.p(i + 0.12, j, 1.17)], 'paper', 0.75);
  }
}

const room = world(
  'new-york-map-room',
  'Midtown · Find Our Block',
  { floor: 'paper', tone: 1, wall: false, head: 110 },
  (H, R) => {
    boardFloor(H, R, 0.06, 0.05, 11.88, 11.89, 0.025, 'sun', 0.48);
    masonry(H, R, 'ne', 0.07, 11.84, 0, 4.25, 'paper', 1);
    masonry(H, R, 'nw', 0.07, 11.84, 0, 4.25, 'sun', 0.13);
    archedBay(H, R, 'ne', 6.32, 4.83, 1.67, 2.28, 'teal', (P) => {
      for (let n = 0; n < 6; n++)
        surface(
          H,
          R,
          [P(0.13 + n * 0.8, 0.1), P(0.73 + n * 0.8, 0.1), P(0.73 + n * 0.8, 0.5 + (n % 3) * 0.18), P(0.13 + n * 0.8, 0.5 + (n % 3) * 0.18)],
          'coral',
          0.24,
          0.4
        );
    });
    cabinetFrame(H, R, 0.45, 0.48, 5.27, 1.57, 0.04, 3.54, 3, 'sun', (i, j, w, d, z, h, col) => {
      for (let row = 0; row < 5; row++) {
        timber(H, R, i, j, w, d, z + row * 0.66, 0.08, 'sun');
        for (let n = 0; n < 5; n++)
          boundBook(H, R, i + 0.11, j + 0.09 + n * 0.25, w - 0.22, 0.21, z + 0.13 + row * 0.66, ['teal', 'paper', 'coral'][(row + col + n) % 3]);
      }
    });
    for (let n = 0; n < 2; n++) {
      const j = 3.43 + n * 3.92;
      cabinet(H, R, 0.43, j, 2.22, 3.48, 8);
      for (let k = 0; k < 3; k++) {
        const y = j + 0.34 + k * 0.74;
        surface(H, R, H.tile(0.7, y, 1.36, 0.57, 1.34), 'paper', 1, 0.45);
        for (let q = 0; q < 3; q++) H.line(R, [H.p(0.79, y + 0.13 + q * 0.1, 1.35), H.p(1.91 - q * 0.13, y + 0.13 + q * 0.1, 1.35)], 'teal', 0.55);
      }
    }
    for (const i of [3.39, 8.69])
      for (const j of [4.18, 7.72]) {
        timber(H, R, i, j, 0.18, 0.2, 0.03, 0.95, 'sun');
        timber(H, R, i - 0.07, j - 0.07, 0.32, 0.34, 0.04, 0.13, 'teal');
      }
    for (const j of [4.22, 7.76]) timber(H, R, 3.39, j, 5.49, 0.12, 0.43, 0.14, 'sun');
    timber(H, R, 3.19, 4.0, 5.77, 3.94, 0.97, 0.14, 'sun');
    map(H, R);
    for (const i of [3.4, 8.73]) {
      bentTube(
        H,
        R,
        [
          [i, 4.3, 1.14],
          [i, 4.3, 1.92],
          [i + 0.08, 5.38, 2.04]
        ],
        2.2,
        'teal'
      );
      const [x, y] = H.p(i + 0.08, 5.38, 2.04);
      surface(
        H,
        R,
        [
          [x - 14, y],
          [x + 14, y],
          [x + 9, y - 8],
          [x - 8, y - 9]
        ],
        'teal',
        0.68
      );
      H.line(
        R,
        [
          [x - 12, y + 1],
          [x + 12, y + 1]
        ],
        'sun',
        2
      );
    }
    cabinetFrame(H, R, 9.87, 1.18, 1.52, 2.54, 0.03, 1.6, 1, 'teal', (i, j, w, d, z, h) => {
      for (let row = 0; row < 3; row++) {
        timber(H, R, i, j, w, d, z + row * 0.46, 0.06, 'sun');
        for (let n = 0; n < 3; n++) boundBook(H, R, i + 0.08, j + 0.08 + n * 0.65, w - 0.16, 0.55, z + 0.1 + row * 0.46, 'paper');
      }
    });
    caneChair(H, R, 7.49, 8.39, 'sun');
    rackFrame(H, R, 9.54, 7.72, 1.59, 3.12, 0.21, [0, 0.87, 1.74], 'teal', (i, j, w, d, z, row) => {
      for (let n = 0; n < 4; n++) boundBook(H, R, i + 0.08, j + 0.13 + n * 0.65, w - 0.16, 0.53, z + 0.1, row === 1 ? 'coral' : 'paper');
    });
    for (const i of [9.54, 11.13]) for (const j of [7.72, 10.84]) caster(H, R, i, j, 0.18, 0.14, 'blue');
    benchFrame(H, R, 4.24, 10.04, 2.05, 1.1, 0.8, 'sun');
    boundBook(H, R, 4.39, 10.21, 1.66, 0.68, 0.84, 'paper');
    vessel(H, R, 3.32, 9.07, 0.03, 11, 19, 'teal');
    for (let n = 0; n < 6; n++) {
      const i = 3.03 + n * 0.12;
      bentTube(
        H,
        R,
        [
          [i, 9.07, 0.35],
          [i, 9.07, 1.35 + (n % 3) * 0.16]
        ],
        4,
        'paper'
      );
      H.line(R, [H.p(i, 9.08, 1.11), H.p(i, 9.08, 1.17)], 'coral', 1.3);
    }
    pendant(H, R, 6.17, 5.73, 4.35, 3.22, 'paper', 1.12);
  },
  (H, R, t) => {
    const u = cycle(t, 12);
    H.at(7.94, 8.71, 0, (HH) =>
      actor(
        HH,
        R,
        7.94,
        8.71,
        t,
        'newYorkMapTrace',
        {
          face: 'nw',
          shirt: ['coral', 0.65],
          hairStyle: 'pony',
          pants: ['blue', 0.64],
          prop: (h, r, p) => {
            const [x, y] = p.farHand;
            const lift =
              u < 0.6
                ? 0
                : u < 0.71
                  ? (1 - Math.cos(((u - 0.6) / 0.11) * Math.PI)) / 2
                  : u < 0.86
                    ? 1
                    : (1 + Math.cos(((u - 0.86) / 0.14) * Math.PI)) / 2;
            const tip = [x - 25 + lift * 16, y - 3 - lift * 11];
            h.line(r, [[x + 3, y + 2], tip], 'sun', 2.1);
            h.dot(...tip, 1.1, 'blue');
          }
        },
        0,
        1.4
      )
    );
    H.at(9.45, 4.39, 0, (HH) =>
      actor(
        HH,
        R,
        9.45,
        4.39,
        t,
        'newYorkMapLibrarian',
        {
          face: 'sw',
          shirt: ['teal', 0.72],
          hairStyle: 'short',
          glasses: true,
          skin: ['coral', 0.45],
          prop: (h, r, p) => {
            const [x, y] = p.farHand;
            shape(
              h,
              r,
              [
                [x - 5, y - 10],
                [x + 13, y - 7],
                [x + 11, y + 9],
                [x - 7, y + 6]
              ],
              'paper',
              1,
              0.6
            );
            for (let q = 0; q < 3; q++)
              h.line(
                r,
                [
                  [x - 2, y - 5 + q * 4],
                  [x + 8, y - 3 + q * 4]
                ],
                'blue',
                0.5
              );
          }
        },
        0,
        1.33
      )
    );
  }
);
room.loopSeconds = 12;
export default room;
