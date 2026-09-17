import { benchFrame, bentTube, branchSpray, metal, slattedSeat, surface, timber, vessel } from '../materials.js';
import { masonry } from '../structure.js';

import { coiledLine, foldedCloth, handTool, shallowTray, slattedCrate } from '../furnishings.js';
import { TAU, actor, box, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const gather = { ...rest, drop: 0.34, ll: 78, kl: -150, lr: -12, kr: 100, lean: -13, al: 38, ar: 55, el: 60, er: 25, head: 14 };
FIGURES.clips.newYorkRoofHarvest = {
  dur: 14,
  keys: [
    [0, gather],
    [0.16, { ...gather, lean: -20, ar: 73, er: 6 }],
    [0.28, { ...gather, lean: -20, ar: 73, er: 6 }],
    [0.44, { ...gather, lean: -5, ar: 48, er: 115, head: 2 }],
    [0.58, { ...gather, lean: -5, ar: 48, er: 115, head: 2 }],
    [0.75, { ...gather, ar: 5, er: 12, lean: -8 }],
    [0.85, { ...gather, ar: 5, er: 12, lean: -8 }],
    [1, gather]
  ]
};

function leaf(H, R, x, y, size = 1, tilt = 0, color = 'teal') {
  const p = (a, b) => [x + a * size + b * tilt, y + b * size];
  shape(H, R, [p(0, 0), p(-8, -7), p(-10, -19), p(-4, -27), p(1, -33), p(8, -24), p(10, -12), p(5, -4)], color, 0.67, 0.65);
  H.line(R, [p(0, 0), p(0, -28)], 'sun', 0.9);
  for (let q = 0; q < 3; q++) H.line(R, [p(-6, -9 - q * 6), p(0, -6 - q * 6), p(6, -11 - q * 6)], 'paper', 0.45, { tone: 0.7 });
}

function bed(H, R, i, j, w, d, variant = 0) {
  for (const z of [0.03, 0.28]) {
    timber(H, R, i, j, w, 0.12, z, 0.22, 'sun');
    timber(H, R, i, j + d - 0.12, w, 0.12, z, 0.22, 'sun');
    timber(H, R, i, j, 0.12, d, z, 0.22, 'sun');
    timber(H, R, i + w - 0.12, j, 0.12, d, z, 0.22, 'sun');
  }
  shape(H, R, H.tile(i + 0.12, j + 0.12, w - 0.24, d - 0.24, 0.55), 'blue', 0.6, 0.5);
  for (const z of [0.16, 0.36]) {
    H.line(R, [H.p(i + 0.04, j + d + 0.01, z), H.p(i + w - 0.04, j + d + 0.01, z)], 'coral', 0.75);
    H.line(R, [H.p(i + w + 0.01, j + 0.04, z), H.p(i + w + 0.01, j + d - 0.04, z)], 'coral', 0.75);
  }
  for (const a of [i + 0.1, i + w - 0.1]) for (const b of [j + 0.1, j + d - 0.1]) box(H, R, a, b, 0.07, 0.07, 0.03, 0.57, 'teal', 0.72);
  const rows = Math.max(2, Math.floor(d / 0.76)),
    cols = Math.max(2, Math.floor(w / 0.73));
  for (let row = 0; row < rows; row++) {
    const y = j + 0.37 + (row * (d - 0.74)) / (rows - 1);
    H.line(R, [H.p(i + 0.18, y, 0.58), H.p(i + w - 0.18, y, 0.58)], 'teal', 1.1);
    for (let col = 0; col < cols; col++) {
      const x = i + 0.39 + (col * (w - 0.78)) / (cols - 1),
        [px, py] = H.p(x, y, 0.57);
      if (variant === 0 && row === 1 && col === 1) {
        surface(H, R, ell(px, py, 8, 3), 'sun', 0.33, 0.4);
        continue;
      }
      for (let n = 0; n < 4; n++)
        leaf(H, R, px + (n - 1.5) * 4, py + (n % 2) * 2, 0.68 + ((row + col) % 3) * 0.13, (n - 1.5) * 0.2, variant && n === 1 ? 'coral' : 'teal');
    }
  }
  if (variant) {
    for (const x of [i + 0.28, i + w - 0.28])
      bentTube(
        H,
        R,
        [
          [x, j + 0.26, 0.55],
          [x, j + 0.26, 2.02]
        ],
        1.4,
        'sun'
      );
    for (const z of [1.06, 1.53, 1.97]) H.line(R, [H.p(i + 0.28, j + 0.26, z), H.p(i + w - 0.28, j + 0.26, z)], 'teal', 0.7);
    for (let n = 0; n < Math.max(2, Math.floor(w / 0.6)); n++) {
      const x = i + 0.39 + n * 0.57;
      branchSpray(H, R, ...H.p(x, j + 0.29, 1.07), 0.72, 'teal', n % 2 ? 1 : -1);
      if (n % 2 === 0) {
        const [a, b] = H.p(x, j + 0.32, 1.39);
        oval(H, R, a, b, 3.4, 4, 'coral', 0.77);
      }
    }
  }
}

function basket(H, R, i, j) {
  const [x, y] = H.p(i, j, 0.14);
  shape(
    H,
    R,
    [
      [x - 23, y - 8],
      [x + 22, y - 8],
      [x + 18, y + 6],
      [x - 18, y + 6]
    ],
    'sun',
    0.7,
    0.9
  );
  oval(H, R, x, y - 8, 22, 8, 'sun', 0.68);
  for (let q = 0; q < 5; q++) leaf(H, R, x - 14 + q * 7, y - 5, 0.4, (q - 2) * 0.18);
  for (let q = 0; q < 8; q++)
    H.line(
      R,
      [
        [x - 17 + q * 5, y + 5],
        [x - 21 + q * 6, y - 8]
      ],
      'coral',
      0.65
    );
  H.line(
    R,
    [
      [x - 20, y - 2],
      [x + 20, y - 2]
    ],
    'blue',
    0.7
  );
  stroke(
    H,
    R,
    [
      [x - 20, y - 7],
      [x - 12, y - 20],
      [x + 8, y - 22],
      [x + 20, y - 7]
    ],
    'sun',
    2.4
  );
  H.line(
    R,
    [
      [x - 23, y - 7],
      [x + 22, y - 7]
    ],
    'blue',
    1.1
  );
}

const room = world(
  'new-york-sunset-roof',
  'Sunset Park · Above the Loading Bays',
  { floor: 'paper', tone: 1, wall: false, head: 115 },
  (H, R) => {
    surface(H, R, H.tile(0, 0, 12, 12, 0.02), 'blue', 0.17);
    for (let n = 0; n < 10; n++) H.line(R, [H.p(0.07, n * 1.29, 0.03), H.p(11.94, n * 1.29, 0.03)], 'paper', 0.85);
    masonry(H, R, 'ne', 0.08, 11.83, 0, 0.87, 'coral', 0.4);
    masonry(H, R, 'nw', 0.08, 11.83, 0, 0.87, 'coral', 0.4);
    timber(H, R, 0.03, 0.06, 11.93, 0.47, 0.91, 0.13, 'paper');
    timber(H, R, 0.06, 0.08, 0.46, 11.85, 0.91, 0.13, 'paper');
    const sky = H.faceI(0.15, 0.09, 11.7, 1.05, 2.72);
    surface(H, R, sky, 'sun', 0.14, 0.3);
    H.clip(sky, () => {
      for (let n = 0; n < 11; n++) {
        const i = 0.2 + n * 1.09;
        surface(H, R, H.faceI(i, 0.11, 0.89, 1.06, 1.24 + (n % 4) * 0.28), 'coral', 0.21, 0.4);
        for (let k = 0; k < 4; k++)
          surface(
            H,
            R,
            H.faceI(i + 0.13 + (k % 2) * 0.38, 0.13, 0.16, 1.17 + Math.floor(k / 2) * 0.2, 1.27 + Math.floor(k / 2) * 0.2),
            'teal',
            0.28,
            0.3
          );
      }
    });
    for (const i of [1.42, 3.92]) for (const j of [1.53, 3.74]) metal(H, R, i, j, 0.18, 0.18, 0.02, 1.33, 'teal');
    const [tx, ty] = H.p(2.66, 2.62, 1.31);
    surface(
      H,
      R,
      [
        [tx - 38, ty],
        [tx + 38, ty],
        [tx + 38, ty - 59],
        [tx - 38, ty - 59]
      ],
      'sun',
      0.48
    );
    surface(H, R, ell(tx, ty - 59, 38, 15), 'sun', 0.58);
    for (let n = 0; n < 16; n++) {
      const dx = Math.cos((n * TAU) / 16) * 37;
      H.line(
        R,
        [
          [tx + dx, ty - 58],
          [tx + dx, ty]
        ],
        'coral',
        0.7
      );
    }
    for (const dy of [-9, -43])
      H.line(
        R,
        [
          [tx - 38, ty + dy],
          [tx + 38, ty + dy]
        ],
        'teal',
        2.2
      );
    surface(
      H,
      R,
      [
        [tx - 43, ty - 59],
        [tx, ty - 93],
        [tx + 43, ty - 59],
        [tx, ty - 44]
      ],
      'teal',
      0.55
    );
    bentTube(
      H,
      R,
      [
        [3.74, 2.93, 1.45],
        [4.35, 2.93, 1.45],
        [4.35, 2.93, 0.13],
        [4.35, 6.07, 0.13]
      ],
      2.5,
      'teal'
    );
    bed(H, R, 5.14, 1.32, 5.58, 2.32, 1);
    bed(H, R, 1.17, 5.13, 2.91, 4.99, 0);
    bed(H, R, 5.52, 5.3, 4.21, 2.66, 2);
    for (const i of [5.62, 6.92, 8.22, 9.52]) {
      bentTube(
        H,
        R,
        [
          [i, 5.42, 0.62],
          [i, 5.42, 2.48],
          [i, 7.49, 2.48],
          [i, 7.49, 0.62]
        ],
        1.9,
        'sun'
      );
      for (let n = 0; n < 3; n++) H.line(R, [H.p(i, 5.41, 1.02 + n * 0.45), H.p(i, 7.5, 1.02 + n * 0.45)], 'teal', 0.75);
    }
    for (const [i, j] of [
      [5.68, 5.7],
      [6.99, 6.3],
      [8.29, 5.7],
      [9.19, 6.63]
    ])
      branchSpray(H, R, ...H.p(i, j, 1.01), 0.72, 'teal');
    benchFrame(H, R, 8.89, 9.79, 2.36, 1.51, 1.02, 'sun');
    shallowTray(H, R, 9.03, 9.96, 1.43, 1.04, 1.06, 'teal');
    for (let n = 0; n < 4; n++) vessel(H, R, 9.29 + n * 0.31, 10.33, 1.1, 4, 7, 'coral');
    handTool(H, R, 10.64, 10.57, 1.07, 'trowel', 'teal');
    slattedCrate(H, R, 9.16, 9.99, 1.82, 1.12, 0.03, 0.56, 'sun');
    vessel(H, R, 10.97, 7.68, 0.03, 13, 23, 'teal');
    coiledLine(H, R, 10.47, 5.1, 0.04, 16, 'teal');
    for (const i of [5.3, 10.62]) metal(H, R, i, 2.03, 0.06, 0.06, 1.04, 1.88, 'teal');
    H.line(R, [H.p(5.3, 2.03, 2.87), H.p(10.62, 2.03, 2.66)], 'blue', 0.8);
    slattedSeat(H, R, 4.55, 10.53, 2.08, 0.03, 'sun', 0.45);
    foldedCloth(H, R, 4.72, 10.74, 0.96, 0.45, 0.68, 'paper', 'coral');
    for (let n = 0; n < 15; n++) H.line(R, [H.p(4.39 + n * 0.25, 4.22, 0.04), H.p(4.39 + n * 0.25, 4.64, 0.04)], 'blue', 1.05);
  },
  (H, R, t) => {
    const u = cycle(t, 14);
    H.at(7.45, 8.3, 0, (HH) =>
      actor(
        HH,
        R,
        7.45,
        8.3,
        t,
        'newYorkRoofHarvest',
        {
          face: 'nw',
          shirt: ['coral', 0.75],
          pants: ['blue', 0.65],
          hairStyle: 'cap',
          apron: ['paper', 0.95],
          prop: (h, r, p) => {
            const [x, y] = p.farHand;
            if (u > 0.25 && u < 0.85) {
              const fall = Math.max(0, Math.min(1, (u - 0.68) / 0.17));
              const [bx, by] = h.p(7.85, 9.0, 0.14);
              const lx = x + (bx - x) * fall,
                ly = y + fall * fall * 72;
              h.clip(
                [
                  [-500, -300],
                  [500, -300],
                  [500, by - 7],
                  [-500, by - 7]
                ],
                () => {
                  leaf(h, r, lx, ly - 2, 0.72, -0.16);
                  leaf(h, r, lx + 3, ly, 0.57, 0.21);
                }
              );
            }
            const [sx, sy] = p.nearHand;
            const pinch = u > 0.16 && u < 0.3 ? Math.sin(((u - 0.16) / 0.14) * Math.PI) : 0;
            for (const d of [-1, 1]) {
              oval(h, r, sx + d * 2.6, sy + 3, 2.6, 3.1, 'coral', 0.8);
              h.line(
                r,
                [
                  [sx + d * 2, sy],
                  [sx - d * (4 - pinch * 3), sy - 11]
                ],
                'blue',
                1.15
              );
            }
          }
        },
        0,
        1.38
      )
    );
    H.at(7.85, 9.0, 0.2, (HH) => basket(HH, R, 7.85, 9.0));
    const [x, y] = H.p(7.82, 2.13, 2.66),
      flutter = Math.sin(u * Math.PI * 2) * 3;
    shape(
      H,
      R,
      [
        [x, y],
        [x + 14, y - 2 + flutter],
        [x + 11, y + 9 + flutter],
        [x, y + 6]
      ],
      'coral',
      0.68,
      0.7
    );
  }
);
room.loopSeconds = 14;
export default room;
