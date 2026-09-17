import { surface, timber, metal, bentTube, drape, benchFrame, pendant, cushion } from '../materials.js';
import { masonry, cabinetFrame, rackFrame, basin as washBasin } from '../structure.js';
import { windowBay, cityView, taskLight } from '../joinery.js';

import { TAU, actor, cycle, ell, oval, shape, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const paint = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -8, head: 15, al: 52, ar: 72, el: 44, er: 22 };
FIGURES.clips.hongKongPorcelainInspect = {
  dur: 18,
  keys: [
    [0, paint],
    [0.12, paint],
    [0.28, { ...paint, ar: 56, er: 99, head: -9 }],
    [0.42, { ...paint, ar: 56, er: 99, head: -9 }],
    [0.57, paint],
    [0.73, { ...paint, al: 60, el: 35, head: 9 }],
    [0.86, { ...paint, al: 60, el: 35, head: 9 }],
    [1, paint]
  ]
};

function blossom(H, R, x, y, size = 1, uneven = false) {
  for (let q = 0; q < 5; q++)
    oval(
      H,
      R,
      x + Math.cos((q * TAU) / 5) * 5 * size,
      y + Math.sin((q * TAU) / 5) * 3.7 * size,
      (q === 3 && uneven ? 5.5 : 3.7) * size,
      3 * size,
      'coral',
      0.64
    );
  H.dot(x, y, 2 * size, 'sun', 1);
  for (const side of [-1, 1])
    shape(
      H,
      R,
      [
        [x + side * 8 * size, y + 2 * size],
        [x + side * 16 * size, y - 3 * size],
        [x + side * 13 * size, y + 6 * size]
      ],
      'teal',
      0.62,
      0.45
    );
}

function plate(H, R, x, y, radius = 22, decorated = false, upright = false, turn = 0, uneven = false) {
  const ry = radius * (upright ? 0.88 : 0.6);
  oval(H, R, x, y, radius, ry, 'paper', 1);
  H.outline(
    R,
    Array.from({ length: 42 }, (_, q) => [x + Math.cos((q * TAU) / 42) * radius * 0.82, y + Math.sin((q * TAU) / 42) * ry * 0.82]),
    decorated ? 'sun' : 'blue',
    decorated ? 1.6 : 0.7,
    { tone: decorated ? 0.85 : 0.45 }
  );
  if (decorated) {
    blossom(H, R, x + Math.sin(turn) * radius * 0.2, y, radius / 27, uneven);
    for (let q = 0; q < 8; q++) {
      const a = (q * TAU) / 8 + turn;
      oval(H, R, x + Math.cos(a) * radius * 0.67, y + Math.sin(a) * ry * 0.67, 1.8, 1.2, q % 2 ? 'teal' : 'coral', 0.65);
    }
  }
  H.line(
    R,
    [
      [x - radius * 0.58, y - ry * 0.38],
      [x - radius * 0.14, y - ry * 0.52]
    ],
    'paper',
    1.8
  );
  if (decorated)
    for (let n = 0; n < 18; n++) {
      const a = (n * TAU) / 18 + turn,
        b = a + 0.12;
      H.line(
        R,
        [
          [x + Math.cos(a) * radius * 0.72, y + Math.sin(a) * ry * 0.72],
          [x + Math.cos(b) * radius * 0.77, y + Math.sin(b) * ry * 0.77],
          [x + Math.cos(a + 0.24) * radius * 0.72, y + Math.sin(a + 0.24) * ry * 0.72]
        ],
        'teal',
        0.55
      );
    }
}

function cup(H, R, i, j, z, ink = 'paper', brushes = false) {
  const [x, y] = H.p(i, j, z);
  if (brushes)
    for (let q = 0; q < 5; q++) {
      H.line(
        R,
        [
          [x - 4 + q * 2, y - 4],
          [x - 7 + q * 3, y - 34 + (q % 2) * 5]
        ],
        q % 2 ? 'coral' : 'sun',
        1.1
      );
      H.line(
        R,
        [
          [x - 7 + q * 3, y - 34 + (q % 2) * 5],
          [x - 8 + q * 3, y - 40 + (q % 2) * 5]
        ],
        'blue',
        1.3
      );
    }
  shape(
    H,
    R,
    [
      [x - 7, y],
      [x + 7, y],
      [x + 8, y - 16],
      [x - 8, y - 16]
    ],
    ink,
    ink === 'paper' ? 1 : 0.58,
    0.7
  );
  oval(H, R, x, y - 16, 8, 3, 'paper', 1);
  if (!brushes) oval(H, R, x, y - 16, 5.5, 1.8, 'teal', 0.24);
  H.line(
    R,
    [
      [x - 4, y - 8],
      [x + 4, y - 8]
    ],
    'teal',
    0.9
  );
}

const room = world(
  'hong-kong-kowloon-bay-porcelain',
  'Kowloon Bay · A quiet rim of color',
  { floor: 'paper', tone: 1, wall: false, head: 70 },
  (H, R) => {
    for (let j = 0; j < 12; j += 0.77) for (let i = 0; i < 12; i += 1.5) surface(H, R, H.tile(i, j, 1.47, 0.74, 0.02), 'paper', 1, 0.35);
    masonry(H, R, 'nw', 0, 12, 0, 4.58, 'teal', 0.14);
    masonry(H, R, 'ne', 0, 12, 0, 4.58, 'paper');
    windowBay(H, R, 'nw', 0.77, 5.61, 2.46, 1.73, { ink: 'teal', divisions: 4, view: (P) => cityView(H, R, P, 5.61, 1.73) });
    cabinetFrame(H, R, 1.4, 0.35, 6.53, 1.26, 0.09, 4.11, 4, 'teal', (i, j, w, d, z, h, n) => {
      for (let row = 0; row < 3; row++) {
        timber(H, R, i, j, w, d, z + row * 1.25, 0.09, 'sun');
        plate(H, R, ...H.p(i + w * 0.5, j + 0.72, z + 0.59 + row * 1.25), 17 + row * 2, n % 2 === 0, true, n * 0.4);
        timber(H, R, i + 0.27, j + 0.84, w - 0.54, 0.09, z + 0.13 + row * 1.25, 0.1, 'sun');
        for (const x of [i + 0.3, i + w - 0.32])
          bentTube(
            H,
            R,
            [
              [x, j + 0.82, z + 0.16 + row * 1.25],
              [x, j + 0.5, z + 0.5 + row * 1.25]
            ],
            1,
            'teal'
          );
      }
    });
    benchFrame(H, R, 0.48, 7.51, 1.77, 3.57, 1.17, 'teal');
    washBasin(H, R, 0.58, 7.67, 1.55, 1.8, 1.19);
    drape(H, R, 0.67, 10.28, 0.62, 0.7, 1.23, 0.68, 'paper');
    for (let n = 0; n < 4; n++) cup(H, R, 1.19, 9.8 + n * 0.27, 1.21, 'paper', n === 0);
    benchFrame(H, R, 2.75, 3.39, 4.31, 2.4, 1.07, 'sun');
    drape(H, R, 2.84, 3.49, 1.23, 2.23, 1.09, 0.49, 'paper');
    surface(H, R, ell(...H.p(5.14, 5.26, 1.12), 34, 20), 'teal', 0.5);
    for (const i of [4.08, 6.51]) cup(H, R, i, 3.87, 1.12, 'teal', true);
    for (let n = 0; n < 6; n++) {
      const [x, y] = H.p(4.03 + n * 0.43, 4.19, 1.13);
      surface(H, R, ell(x, y, 5, 3), 'paper', 1);
      surface(H, R, ell(x, y, 3, 1.7), ['coral', 'teal', 'sun'][n % 3], 0.72);
    }
    for (let n = 0; n < 4; n++) plate(H, R, ...H.p(3.56, 4.74, 1.12 + n * 0.075), 19, false);
    cushion(H, R, 5.09, 6.13, 1.07, 1.04, 0.62, 0.16, 'coral');
    for (const i of [5.2, 5.91]) for (const j of [6.24, 6.94]) timber(H, R, i, j, 0.12, 0.12, 0.03, 0.59, 'sun');
    const outline = [
      [9.14, 0.77],
      [11.38, 0.77],
      [11.64, 1.28],
      [11.64, 2.42],
      [11.21, 2.83],
      [9.18, 2.83],
      [8.85, 2.39],
      [8.85, 1.21]
    ];
    surface(
      H,
      R,
      outline.map(([i, j]) => H.p(i, j, 0.2)),
      'teal',
      0.65
    );
    for (let n = 0; n < outline.length; n++) {
      const [i, j] = outline[n],
        [a, b] = outline[(n + 1) % outline.length];
      surface(H, R, [H.p(i, j, 0.2), H.p(a, b, 0.2), H.p(a, b, 1.76), H.p(i, j, 1.76)], 'paper', 1);
    }
    surface(
      H,
      R,
      outline.map(([i, j]) => H.p(i, j, 1.81)),
      'sun',
      0.2
    );
    for (const z of [0.53, 1.41])
      bentTube(
        H,
        R,
        [
          [8.88, 1.24, z],
          [8.88, 2.37, z],
          [9.22, 2.81, z],
          [11.19, 2.81, z]
        ],
        2,
        'teal'
      );
    metal(H, R, 10.08, 2.82, 0.65, 0.12, 0.85, 0.54, 'teal');
    surface(H, R, H.faceI(10.19, 2.95, 0.42, 1.12, 1.31), 'blue', 0.72);
    for (const i of [9.35, 11.17])
      bentTube(
        H,
        R,
        [
          [i, 1.08, 1.83],
          [i, 1.08, 2.01],
          [i, 1.5, 2.01],
          [i, 1.5, 1.83]
        ],
        2,
        'teal'
      );
    rackFrame(H, R, 9.24, 4.1, 2.08, 2.53, 0.14, [0.13, 0.82, 1.57], 'teal', (i, j, w, d, z, row) => {
      for (let n = 0; n < 3; n++) plate(H, R, ...H.p(i + w * 0.5, j + 0.39 + n * 0.65, z + 0.08), 15, row === 2, false, n * 0.2);
    });
    cabinetFrame(H, R, 2.97, 9.06, 3.6, 2.01, 0.04, 0.68, 3, 'sun', (i, j, w, d, z, h, n) => {
      for (let k = 0; k < 4; k++) plate(H, R, ...H.p(i + w * 0.5, j + d * 0.5, z + 0.1 + k * 0.08), 14, n === 2);
    });
    for (let n = 0; n < 3; n++) {
      surface(H, R, H.tile(7.79 + n * 0.1, 9.58 + n * 0.08, 1.67, 1.04, 0.04 + n * 0.025), 'paper', 1, 0.4);
    }
    taskLight(H, R, 6.69, 3.54, 1.11, 'teal', -0.65);
    pendant(H, R, 4.31, 3.33, 4.45, 3.33, 'paper', 1.12);
  },
  (H, R, t) => {
    const u = cycle(t, 18),
      turn =
        u < 0.57
          ? 0
          : u < 0.73
            ? Math.sin((((u - 0.57) / 0.16) * Math.PI) / 2) * 0.22
            : u < 0.86
              ? 0.22
              : Math.cos((((u - 0.86) / 0.14) * Math.PI) / 2) * 0.22;
    const [px, py] = H.p(5.14, 5.26, 1.24);
    plate(H, R, px, py, 31, true, false, turn);
    actor(
      H,
      R,
      5.62,
      6.36,
      t,
      'hongKongPorcelainInspect',
      {
        shirt: ['paper', 1],
        apron: ['teal', 0.6],
        hairStyle: 'bun',
        glasses: true,
        face: 'nw',
        prop(HH, RR, points) {
          const [x, y] = points.nearHand;
          const a =
            u < 0.12
              ? 0
              : u < 0.28
                ? Math.sin((((u - 0.12) / 0.16) * Math.PI) / 2)
                : u < 0.42
                  ? 1
                  : u < 0.57
                    ? Math.cos((((u - 0.42) / 0.15) * Math.PI) / 2)
                    : 0;
          const tip = [x - 5 - a * 6, y - 25 + a * 5];
          HH.line(RR, [[x + 2, y + 5], tip], 'coral', 1.55);
          HH.line(RR, [tip, [tip[0] - 1, tip[1] - 5]], 'blue', 1.35);
          const [fx, fy] = points.farHand;
          HH.line(
            RR,
            [
              [fx, fy],
              [px + 27, py + 9]
            ],
            'coral',
            2.8,
            { tone: 0.3 }
          );
        }
      },
      0.27,
      1.45
    );
    const sway = Math.sin(u * TAU) * 0.06;
    shape(H, R, [H.p(11.41, 0.12, 3.38), H.p(11.91, 0.12, 3.38), H.p(11.88 + sway, 0.14, 1.39), H.p(11.35 + sway, 0.14, 1.33)], 'paper', 0.86, 0.55);
    H.line(R, [H.p(11.62, 0.15, 3.28), H.p(11.55 + sway, 0.17, 1.47)], 'teal', 0.6, { tone: 0.45 });
  }
);

room.loopSeconds = 18;
export default room;
