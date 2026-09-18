import { world, shape, oval, stroke, box, actor, cycle, wallPt, TAU, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { windowBay, cityView, taskLight, caster, hangingRail } from '../joinery.js';
import { foldedCloth, coiledLine, handTool } from '../furnishings.js';
import { surface, timber, metal, vessel, bentTube, drape, benchFrame, pendant, floorLight, spokedWheel } from '../materials.js';

const rest = FIGURES.clips.idle.keys[0][1];
const press = { ...rest, lean: -15, head: 13, al: 74, ar: 82, el: 14, er: 6 };
FIGURES.clips.hongKongScreenRehearse = {
  dur: 16,
  keys: [
    [0, press],
    [0.1, press],
    [0.34, { ...press, lean: -3, al: 40, ar: 48, el: 43, er: 37 }],
    [0.43, { ...press, lean: -3, al: 47, ar: 55, el: 56, er: 50 }],
    [0.6, { ...press, al: 79, ar: 87, el: 22, er: 14 }],
    [0.69, press],
    [0.79, { ...press, al: 108, ar: 116, el: 25, er: 17, head: -5 }],
    [0.88, { ...press, al: 108, ar: 116, el: 25, er: 17, head: -5 }],
    [1, press]
  ]
};

function print(H, R, points, cx, cy, size = 1, flip = false) {
  shape(H, R, points, 'paper', 1, 0.6);
  H.clip(points, () => {
    oval(H, R, cx + (flip ? 9 : -9) * size, cy - 4 * size, 18 * size, 10 * size, 'coral', 0.65);
    for (let q = 0; q < 3; q++)
      stroke(
        H,
        R,
        [
          [cx - 29 * size, cy + (q * 7 - 1) * size],
          [cx - 7 * size, cy + (q * 7 - 7) * size],
          [cx + 14 * size, cy + (q * 7 + 2) * size],
          [cx + 32 * size, cy + (q * 7 - 4) * size]
        ],
        'teal',
        3.3 * size
      );
  });
}

function screen(H, R, lift) {
  const z = 1.27,
    j0 = 3.8,
    j1 = 6.48 - lift * 0.7,
    z1 = z + lift * 1.65;
  const outer = [H.p(3.9, j0, z), H.p(7.5, j0, z), H.p(7.5, j1, z1), H.p(3.9, j1, z1)];
  shape(H, R, outer, 'sun', 0.45, 1.15);
  const inner = [
    H.p(4.09, j0 + 0.19, z + 0.012),
    H.p(7.31, j0 + 0.19, z + 0.012),
    H.p(7.31, j1 - 0.18, z1 + 0.012),
    H.p(4.09, j1 - 0.18, z1 + 0.012)
  ];
  surface(H, R, inner, 'paper', 1, 0.8);
  const center = inner.reduce((a, p) => [a[0] + p[0] / 4, a[1] + p[1] / 4], [0, 0]);
  print(H, R, inner, ...center, 0.86);
  H.tint(inner, 'teal', 0.12, { fine: true });
  H.clip(inner, () => {
    for (let q = 1; q < 17; q++) {
      const f = q / 18;
      H.line(R, [H.p(4.05 + f * 3.28, j0 + 0.18, z + 0.02), H.p(4.05 + f * 3.28, j1 - 0.18, z1 + 0.02)], 'teal', 0.35, { tone: 0.4 });
      H.line(R, [H.p(4.05, j0 + (j1 - j0) * f, z + lift * 1.65 * f), H.p(7.35, j0 + (j1 - j0) * f, z + lift * 1.65 * f)], 'blue', 0.35, {
        tone: 0.23
      });
    }
  });
  for (let n = 0; n < 9; n++) {
    const f = n / 8;
    H.dot(...H.p(3.99 + f * 3.4, j1 - 0.05, z1 + 0.02), 1.3, 'blue');
  }
  H.line(R, [H.p(3.9, j1, z1), H.p(7.5, j1, z1)], 'blue', 4);
  H.line(R, [H.p(3.9, j1, z1 + 0.06), H.p(7.5, j1, z1 + 0.06)], 'sun', 2.3);
  for (const i of [4.18, 7.02]) box(H, R, i, j0 - 0.13, 0.24, 0.33, 1.24, 0.16, 'blue', 0.7);
}

function studioWalls(H, R) {
  surface(H, R, H.faceJ(0.01, 0, 12, 0, 4.43), 'blue', 0.18);
  surface(H, R, H.faceI(0, 0.01, 12, 0, 4.43), 'teal', 0.18);
  for (const side of ['nw', 'ne'])
    for (let row = 0; row < 10; row++)
      for (let n = 0; n < 12; n++) {
        const u = 0.1 + n + (row % 2) * 0.5,
          z = 0.1 + row * 0.43;
        if (u < 11.9) H.line(R, [wallPt(H, side, u, z, -0.03), wallPt(H, side, Math.min(11.9, u + 0.91), z, -0.03)], 'teal', 0.5, { tone: 0.32 });
      }
  for (const side of ['nw', 'ne']) H.line(R, [wallPt(H, side, 0.15, 4.29, -0.16), wallPt(H, side, 11.8, 4.29, -0.16)], 'sun', 2.1);
  for (const j of [1.12, 5.63]) {
    timber(H, R, 0.23, j, 1.36, 0.17, 0.08, 1.67, 'teal');
    timber(H, R, 0.23, j, 1.36, 0.17, 1.74, 0.13, 'sun');
  }
  for (let n = 0; n < 6; n++) {
    const z = 0.18 + n * 0.24;
    metal(H, R, 0.29, 1.31, 1.18, 4.29, z, 0.2, 'teal');
    for (const j of [2.22, 4.52]) bentTube(H, R, [[1.49, j - 0.22, z + 0.08], [1.63, j - 0.22, z + 0.08], [1.63, j + 0.22, z + 0.08], [1.49, j + 0.22, z + 0.08]], 1.4, 'sun');
  }
  timber(H, R, 0.23, 1.13, 1.45, 4.62, 1.69, 0.14, 'sun');
  for (let n = 0; n < 3; n++) {
    surface(H, R, H.tile(0.53 + n * 0.025, 2.02 + n * 0.025, 0.98, 1.72, 1.87 + n * 0.07), n === 2 ? 'coral' : 'paper', 0.8);
    H.line(R, [H.p(0.58, 2.09, 2.04), H.p(1.45, 2.09, 2.04)], 'blue', 2);
  }
  vessel(H, R, 0.81, 4.91, 1.85, 7, 16, 'paper');
  windowBay(H, R, 'nw' , 0.86, 6.48, 2.03, 2.05, {
    night: true,
    divisions: 5,
    ink: 'teal',
    view(P) {
      cityView(H, R, P, 6.48, 2.05, true);
    }
  });
  for (const j of [0.83, 7.29, 11.45]) metal(H, R, 0.05, j, 0.2, 0.21, 0.05, 4.19, 'teal');
  for (const i of [3.58, 7.56, 11.43]) metal(H, R, i, 0.05, 0.18, 0.23, 0.05, 4.19, 'teal');
  bentTube(
    H,
    R,
    [
      [0.25, 10.91, 0.21],
      [0.25, 10.91, 3.87],
      [0.25, 0.25, 3.87],
      [11.47, 0.25, 3.87]
    ],
    2.4,
    'teal'
  );
  for (let n = 0; n < 5; n++) {
    const i = 3.83 + n * 1.39,
      z = 3.48 - (n % 2) * 0.11;
    const sheet = [H.p(i, 0.31, z - 1.17), H.p(i + 1.04, 0.31, z - 1.17), H.p(i + 1.06, 0.31, z), H.p(i, 0.31, z + 0.025)];
    print(H, R, sheet, ...H.p(i + 0.53, 0.33, z - 0.57), 0.43, n % 2 === 0);
    for (const x of [i + 0.13, i + 0.88]) metal(H, R, x, 0.31, 0.085, 0.07, z - 0.08, 0.2, 'coral');
  }
  hangingRail(H, R, 'nw', 8.05, 3.21, 3.23, 5, (P, u, n) => {
    const [x, y] = P(u, -0.16);
    if (n < 3) {
      H.line(
        R,
        [
          [x, y],
          [x - 2, y + 25]
        ],
        'sun',
        2
      );
      surface(
        H,
        R,
        [
          [x - 8, y + 25],
          [x + 5, y + 25],
          [x + 5, y + 34],
          [x - 8, y + 34]
        ],
        'paper',
        1
      );
      for (let q = 0; q < 5; q++)
        H.line(
          R,
          [
            [x - 6 + q * 2.5, y + 27],
            [x - 6 + q * 2.5, y + 33]
          ],
          'teal',
          0.6
        );
    } else {
      surface(
        H,
        R,
        [
          [x - 10, y],
          [x + 8, y - 3],
          [x + 9, y + 35],
          [x - 8, y + 39]
        ],
        n === 3 ? 'paper' : 'coral',
        0.6
      );
      H.line(
        R,
        [
          [x - 7, y + 27],
          [x + 8, y + 25]
        ],
        'sun',
        1
      );
    }
  });
}

function printingBench(H, R) {
  for (const i of [3.55, 7.61]) {
    metal(H, R, i, 3.52, 0.22, 3.32, 0.04, 0.17, 'teal');
    bentTube(H, R, [[i + 0.1, 3.71, 0.25], [i + 0.1, 6.75, 0.98]], 3, 'teal');
  }

  benchFrame(H, R, 3.45, 3.35, 4.55, 3.72, 1.14, 'sun');
  metal(H, R, 3.71, 4.01, 3.9, 2.51, 0.3, 0.13, 'teal');
  for (let n = 0; n < 5; n++) {
    const j = 4.17 + n * 0.43;
    for (let k = 0; k < 3; k++) surface(H, R, H.tile(3.88, j, 3.31, 0.36, 0.46 + k * 0.035), 'paper', 1, 0.4);
    H.line(R, [H.p(5.47, j, 0.59), H.p(5.47, j + 0.36, 0.59)], n % 2 ? 'coral' : 'teal', 1.4);
  }
  for (const i of [3.66, 7.7]) {
    metal(H, R, i, 3.59, 0.18, 2.99, 1.15, 0.075, 'blue');
    for (let n = 0; n < 6; n++) H.dot(...H.p(i + 0.09, 3.76 + n * 0.49, 1.24), 1.4, 'sun');
  }
  surface(H, R, H.tile(3.92, 3.94, 3.65, 2.52, 1.22), 'paper', 1);
  print(H, R, H.tile(4.28, 4.18, 2.76, 1.98, 1.23), ...H.p(5.66, 5.17, 1.24), 0.8);
  for (const i of [4.1, 7.09]) {
    metal(H, R, i, 3.15, 0.33, 0.55, 1.16, 0.3, 'teal');
    const [x, y] = H.p(i + 0.16, 3.4, 1.61);
    surface(H, R, ell(x, y, 5, 5), 'sun', 0.7);
    H.dot(x, y, 1.5, 'blue');
    H.line(
      R,
      [
        [x, y + 3],
        [x, y - 16]
      ],
      'paper',
      1.2
    );
    H.line(
      R,
      [
        [x - 9, y - 16],
        [x + 9, y - 16]
      ],
      'coral',
      3
    );
    for (let q = 0; q < 5; q++)
      H.line(
        R,
        [
          [x - 2, y - 2 - q * 2.5],
          [x + 2, y - 4 - q * 2.5]
        ],
        'blue',
        0.6
      );
  }
  for (let n = 0; n < 16; n++) H.line(R, [H.p(3.94 + n * 0.215, 6.95, 1.145), H.p(3.94 + n * 0.215, 6.78, 1.145)], 'blue', 0.6);
  drape(H, R, 3.57, 5.81, 0.52, 1.14, 1.16, 0.58, 'coral');
  const [x, y] = H.p(7.43, 7.08, 0.78);
  spokedWheel(H, R, x, y, 12, 'sun', 0.3, 0.68);
  H.line(
    R,
    [
      [x, y],
      [x + 17, y + 10]
    ],
    'blue',
    2.3
  );
  H.dot(x + 17, y + 10, 3, 'coral', 1, { knock: true });
}

function paperHandling(H, R) {
  const i = 8.15,
    j = 0.62,
    w = 3.21,
    d = 1.86;
  for (const x of [i, i + w])
    for (const y of [j, j + d]) {
      caster(H, R, x, y);
      metal(H, R, x - 0.045, y - 0.045, 0.09, 0.09, 0.16, 3.31, 'teal');
    }
  for (let n = 0; n < 9; n++) {
    const z = 0.31 + n * 0.35;
    H.line(R, [H.p(i, j, z), H.p(i + w, j, z), H.p(i + w, j + d, z), H.p(i, j + d, z), H.p(i, j, z)], 'sun', 1.4);
    for (let q = 0; q < 8; q++) H.line(R, [H.p(i + 0.19 + q * 0.39, j, z), H.p(i + 0.19 + q * 0.39, j + d, z)], 'teal', 0.65);
    if (n !== 2 && n !== 6) {
      const off = (n % 3) * 0.14;
      print(H, R, H.tile(i + 0.13 + off, j + 0.17, 2.65 - off, 1.33, z + 0.035), ...H.p(i + 1.43, j + 0.8, z + 0.04), 0.64, n % 2 === 0);
    }
  }
  bentTube(
    H,
    R,
    [
      [i, j + d, 3.43],
      [i, j + d + 0.22, 3.57],
      [i + w, j + d + 0.22, 3.57],
      [i + w, j + d, 3.43]
    ],
    2,
    'teal'
  );
  benchFrame(H, R, 1.02, 6.37, 1.95, 1.45, 1.02, 'teal');
  surface(H, R, H.tile(1.16, 6.53, 1.63, 1.09, 1.03), 'paper', 1);
  for (let n = 0; n < 9; n++) H.line(R, [H.p(1.27 + n * 0.16, 6.59, 1.05), H.p(1.27 + n * 0.16, 7.53, 1.05)], 'teal', 0.5);
  bentTube(
    H,
    R,
    [
      [2.74, 6.5, 1.07],
      [2.74, 6.47, 1.94],
      [2.74, 7.45, 1.52]
    ],
    3,
    'blue'
  );
  H.line(R, [H.p(2.74, 7.42, 1.54), H.p(2.74, 7.75, 1.36)], 'coral', 4.3);
  for (let n = 0; n < 6; n++) surface(H, R, H.tile(2.97 + n * 0.07, 7.54 + n * 0.08, 0.12, 0.7, 0.025), 'paper', 1, 0.4);
  metal(H, R, 4.21, 9.53, 2.33, 1.57, 0.13, 0.13, 'teal');
  for (let n = 0; n < 6; n++) {
    const i = 4.32 + n * 0.37;
    timber(H, R, i, 9.63, 0.085, 1.32, 0.3, 1.29, 'sun');
    H.line(R, [H.p(i + 0.045, 9.69, 0.44), H.p(i + 0.045, 10.88, 1.48)], 'teal', 0.7);
  }
  for (const i of [4.27, 6.4]) for (const j of [9.66, 10.99]) caster(H, R, i, j);
  benchFrame(H, R, 8.14, 9.95, 2.84, 1.38, 0.8, 'teal');
  for (let n = 0; n < 6; n++) surface(H, R, H.tile(8.26 + (n % 2) * 0.035, 10.06 + n * 0.012, 2.21, 1.11, 0.82 + n * 0.028), 'paper', 1, 0.45);
  print(H, R, H.tile(8.3, 10.12, 2.12, 1.03, 1.01), ...H.p(9.36, 10.64, 1.02), 0.69, true);
  vessel(H, R, 10.77, 10.48, 0.97, 8, 14, 'sun', true);
}

function wetWork(H, R) {
  benchFrame(H, R, 0.33, 8.28, 2.5, 2.38, 1.1, 'teal');
  metal(H, R, 0.48, 8.43, 2.17, 1.96, 1.1, 0.19, 'paper');
  surface(H, R, H.tile(0.63, 8.63, 1.48, 1.47, 1.3), 'blue', 0.8);
  surface(H, R, H.tile(0.79, 8.79, 1.16, 1.13, 1.19), 'teal', 0.35);
  bentTube(
    H,
    R,
    [
      [0.71, 8.49, 1.31],
      [0.71, 8.49, 2.07],
      [1.2, 8.63, 2.07],
      [1.2, 8.83, 1.86]
    ],
    2.6,
    'teal'
  );
  for (const j of [9.0, 9.8]) vessel(H, R, 2.38, j, 1.31, 6, 15, 'coral', true);
  drape(H, R, 0.75, 10.08, 0.65, 0.53, 1.32, 0.57, 'paper');
  bentTube(
    H,
    R,
    [
      [1.17, 9.22, 1.08],
      [1.17, 9.22, 0.5],
      [1.5, 9.22, 0.37],
      [1.8, 9.22, 0.53],
      [1.8, 9.22, 0.87]
    ],
    2,
    'teal'
  );
  metal(H, R, 9.12, 3.9, 2.07, 1.75, 0.34, 0.08, 'teal');
  foldedCloth(H, R, 9.24, 4.08, 0.73, 1.2, 0.44, 'paper', 'teal');
  for (let n = 0; n < 3; n++) vessel(H, R, 10.57, 4.19 + n * 0.52, 0.45, 7, 15, 'paper', false);
  benchFrame(H, R, 8.98, 3.76, 2.4, 2.16, 1.02, 'sun');
  for (let n = 0; n < 6; n++) {
    const i = 9.3 + (n % 3) * 0.7,
      j = 4.15 + Math.floor(n / 3) * 0.92;
    vessel(H, R, i, j, 1.05, 9, 19, ['coral', 'teal', 'sun'][n % 3], n !== 2);
    const [x, y] = H.p(i, j, 1.05);
    H.line(
      R,
      [
        [x - 6, y - 10],
        [x + 6, y - 10]
      ],
      'paper',
      2.2
    );
  }
  taskLight(H, R, 11.09, 3.99, 1.06, 'coral', -0.62);
  for (let n = 0; n < 4; n++) handTool(H, R, 9.37 + n * 0.48, 5.66, 1.05, n % 2 ? 'brush' : 'trowel', n % 2 ? 'sun' : 'coral');
  vessel(H, R, 10.88, 7.39, 0.05, 17, 30, 'teal');
  foldedCloth(H, R, 9.04, 7.71, 0.88, 0.69, 0.03, 'paper', 'coral');
  surface(H, R, H.tile(9.05, 5.02, 0.73, 0.65, 1.08), 'paper', 1);
  for (let n = 0; n < 3; n++) oval(H, R, ...H.p(9.22 + n * 0.17, 5.31, 1.1), 4, 2, ['teal', 'coral', 'sun'][n], 0.8);
  coiledLine(H, R, 7.07, 10.69, 0.035, 16, 'coral');
}

const room = world(
  'hong-kong-kwun-tong-print',
  'Kwun Tong · One fresh layer',
  { floor: 'paper', tone: 0.9, wall: 'teal', wallTone: 0.22, pattern: 'boards', height: 4.43, head: 50 },
  (H, R) => {
    floorLight(H, 5.7, 5.8, 158, 0.8);
    floorLight(H, 9.6, 10.3, 76, 0.55);
    studioWalls(H, R);
    paperHandling(H, R);
    wetWork(H, R);
    printingBench(H, R);
    pendant(H, R, 5.71, 4.21, 4.4, 3.55, 'coral', 1.05);
  },
  (H, R, t) => {
    const u = cycle(t, 16),
      rise =
        u < 0.69 ? 0 : u < 0.79 ? (1 - Math.cos(((u - 0.69) / 0.1) * Math.PI)) / 2 : u < 0.88 ? 1 : (1 + Math.cos(((u - 0.88) / 0.12) * Math.PI)) / 2;
    screen(H, R, rise * 0.78);
    actor(
      H,
      R,
      8.1,
      5.4,
      t,
      'hongKongScreenRehearse',
      {
        shirt: ['paper', 1],
        apron: ['coral', 0.67],
        hairStyle: 'short',
        face: 'nw',
        prop(HH, RR, points) {
          const a = points.nearHand,
            b = points.farHand,
            x = (a[0] + b[0]) / 2 - 8,
            y = (a[1] + b[1]) / 2 - 8;
          const tool = [
            [x - 24, y + 7],
            [x + 23, y - 9],
            [x + 23, y - 2],
            [x - 24, y + 14]
          ];
          shape(HH, RR, tool, 'coral', 0.65, 0.9);
          shape(
            HH,
            RR,
            [
              [x - 24, y + 14],
              [x + 23, y - 2],
              [x + 22, y + 2],
              [x - 25, y + 18]
            ],
            'blue',
            0.7,
            0.7
          );
          for (const hand of [a, b]) {
            const grip = [hand[0], y + 6 - (hand[0] - x) * 0.35];
            HH.line(RR, [hand, grip], 'blue', 4.6);
            HH.line(RR, [hand, grip], 'coral', 3.1);
          }
        }
      },
      0,
      1.55
    );
    actor(H, R, 10.97, 2.94, t, 'think', { shirt: ['teal', 0.65], hairStyle: 'curly', face: 'nw', glasses: true }, 0, 1.16);
    const [x, y] = H.p(0.19, 7.34, 1.74),
      sway = Math.sin(u * TAU) * 3;
    shape(
      H,
      R,
      [
        [x - 9, y],
        [x + 9, y - 5],
        [x + 10 + sway, y + 32],
        [x - 9 + sway, y + 37]
      ],
      'coral',
      0.36,
      0.7
    );
    for (let q = 0; q < 3; q++)
      H.line(
        R,
        [
          [x - 4 + q * 4, y + 1],
          [x - 4 + q * 4 + sway, y + 29]
        ],
        'paper',
        0.8
      );
  }
);

room.loopSeconds = 16;
room.stillTime = 0;
export default room;
