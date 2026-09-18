import { taskLight } from '../joinery.js';
import { shallowTray, handTool } from '../furnishings.js';
import { world, shape, stroke, actor, bottle, cycle, wallPt, ell } from '../../worlds/common.js';
import { surface, timber, metal, vessel, bentTube, drape, benchFrame, pendant, floorLight } from '../materials.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const sand = { ...rest, lean: -9, head: 15, al: 65, el: 17, ar: 75, er: 10 };
const pass = { ...sand, lean: -12, ar: 94, er: 2 };
FIGURES.clips.newYorkChairSand = {
  dur: 14,
  keys: [
    [0, sand],
    [0.1, sand],
    [0.2, pass],
    [0.3, sand],
    [0.4, pass],
    [0.5, sand],
    [0.6, { ...sand, ar: 44, er: 67, al: 80, el: 4, head: 23 }],
    [0.75, { ...sand, ar: 44, er: 67, al: 80, el: 4, head: 23 }],
    [0.88, sand],
    [1, sand]
  ]
};

function chair(H, R, i, j, z = 0, ink = 'sun', scale = 1) {
  const P = (a, b, c) => H.p(i + a * scale, j + b * scale, z + c * scale);
  for (const [a, b] of [
    [0.1, 0.13],
    [1.24, 0.13],
    [0.1, 1.19],
    [1.24, 1.19]
  ]) {
    const foot = P(a + (a < 0.5 ? -0.08 : 0.08), b + (b < 0.5 ? -0.08 : 0.08), 0.02),
      top = P(a, b, 0.83);
    const v = [];
    for (let n = 0; n <= 12; n++) {
      const f = n / 12,
        w = (1.7 + Math.sin(f * Math.PI) * 1.2 + Math.sin(f * 8 * Math.PI) * 0.55) * scale;
      v.push([foot[0] + (top[0] - foot[0]) * f - w, foot[1] + (top[1] - foot[1]) * f]);
    }
    for (let n = 12; n >= 0; n--) {
      const f = n / 12,
        w = (1.7 + Math.sin(f * Math.PI) * 1.2 + Math.sin(f * 8 * Math.PI) * 0.55) * scale;
      v.push([foot[0] + (top[0] - foot[0]) * f + w, foot[1] + (top[1] - foot[1]) * f]);
    }
    surface(H, R, v, ink, 0.72, 0.65);
    H.line(R, [foot, top], 'paper', 0.65);
  }
  for (const b of [0.2, 1.12])
    bentTube(
      H,
      R,
      [
        [i + 0.12 * scale, j + b * scale, z + 0.34 * scale],
        [i + 1.21 * scale, j + b * scale, z + 0.34 * scale]
      ],
      2.3 * scale,
      ink
    );
  bentTube(
    H,
    R,
    [
      [i + 0.66 * scale, j + 0.2 * scale, z + 0.34 * scale],
      [i + 0.66 * scale, j + 1.12 * scale, z + 0.34 * scale]
    ],
    2.4 * scale,
    ink
  );
  const outline = [
    [0.07, 0.1],
    [0.38, -0.03],
    [1, -0.03],
    [1.33, 0.12],
    [1.41, 0.85],
    [1.24, 1.36],
    [0.99, 1.46],
    [0.3, 1.46],
    [-0.06, 1.21],
    [-0.07, 0.48]
  ];
  surface(
    H,
    R,
    [
      ...outline.slice(4).map(([a, b]) => P(a, b, 0.76)),
      ...outline
        .slice(4)
        .reverse()
        .map(([a, b]) => P(a, b, 0.91))
    ],
    ink,
    0.8,
    0.7
  );
  surface(
    H,
    R,
    outline.map(([a, b]) => P(a, b, 0.91)),
    ink,
    0.44,
    0.8
  );
  for (let n = 0; n < 5; n++)
    H.line(R, [P(0.13, 0.4 + n * 0.17, 0.923), P(0.65, 0.34 + n * 0.17, 0.923), P(1.22, 0.43 + n * 0.17, 0.923)], 'coral', 0.45, { tone: 0.55 });
  const rail = [];
  for (let n = 0; n <= 12; n++) {
    const a = n / 12;
    rail.push(P(-0.04 + a * 1.42, 0.18 - Math.sin(a * Math.PI) * 0.24, 1.73 + Math.sin(a * Math.PI) * 0.2));
  }
  for (let n = 12; n >= 0; n--) {
    const a = n / 12;
    rail.push(P(-0.04 + a * 1.42, 0.18 - Math.sin(a * Math.PI) * 0.24, 1.9 + Math.sin(a * Math.PI) * 0.2));
  }
  for (let n = 0; n < 7; n++) {
    const a = 0.04 + n * 0.205,
      top = 1.78 + Math.sin((n / 6) * Math.PI) * 0.2;
    H.line(R, [P(a, 0.22, 0.92), P(a, 0.12, 1.33), P(a, 0.16 - Math.sin((n / 6) * Math.PI) * 0.19, top)], 'blue', 3 * scale);
    H.line(R, [P(a, 0.22, 0.92), P(a, 0.12, 1.33), P(a, 0.16 - Math.sin((n / 6) * Math.PI) * 0.19, top)], ink, 1.9 * scale);
    for (const c of [1.06, 1.5]) surface(H, R, ell(...P(a, 0.16, c), 2.1 * scale, 1.5 * scale), ink, 0.7, 0.35);
  }
  surface(H, R, rail, ink, 0.68, 0.8);
}

function clamp(H, R, i, j, z, size = 1) {
  const [x, y] = H.p(i, j, z);
  stroke(
    H,
    R,
    [
      [x - 13 * size, y - 9 * size],
      [x - 19 * size, y - 9 * size],
      [x - 19 * size, y + 16 * size],
      [x + 9 * size, y + 16 * size],
      [x + 9 * size, y - 5 * size]
    ],
    'blue',
    3 * size
  );
  H.line(
    R,
    [
      [x + 9 * size, y - 12 * size],
      [x + 9 * size, y + 5 * size]
    ],
    'teal',
    2 * size
  );
  H.line(
    R,
    [
      [x + 3 * size, y - 12 * size],
      [x + 15 * size, y - 12 * size]
    ],
    'coral',
    2 * size
  );
}

function workshopArchitecture(H, R) {
  for (const side of ['nw', 'ne']) {
    const P = (u, z) => wallPt(H, side, u, z, -0.025);
    surface(H, R, [P(0, 0), P(12, 0), P(12, 4.65), P(0, 4.65)], side === 'nw' ? 'coral' : 'paper', side === 'nw' ? 0.19 : 1);
    for (let row = 0; row < 15; row++) {
      const z = 0.09 + row * 0.3;
      H.line(R, [P(0, z), P(12, z)], 'coral', 0.6, { tone: 0.4 });
      for (let u = (row % 2) * 0.44; u < 12; u += 0.88) H.line(R, [P(u, z), P(u, z + 0.3)], 'coral', 0.5, { tone: 0.4 });
    }
  }
  for (const j of [0.3, 4.65, 11.65]) metal(H, R, 0.06, j, 0.21, 0.23, 0, 4.51, 'teal');
  for (const i of [0.3, 3.72, 11.65]) metal(H, R, i, 0.06, 0.21, 0.23, 0, 4.51, 'teal');
  timber(H, R, 0.19, 0.15, 11.6, 0.25, 4.34, 0.18, 'sun');
  timber(H, R, 0.15, 0.19, 0.25, 11.6, 4.34, 0.18, 'sun');
  const P = (u, z) => H.p(4.13 + u, 0.14, 1.67 + z),
    w = 7.18,
    h = 2.45;
  const shapeWindow = (inset) => {
    const a = [P(inset, inset), P(w - inset, inset), P(w - inset, h - 0.47)];
    for (let n = 0; n <= 20; n++) {
      const t = (n / 20) * Math.PI;
      a.push(P(w / 2 + Math.cos(t) * (w / 2 - inset), h - 0.47 + Math.sin(t) * 0.48));
    }
    return a;
  };
  surface(H, R, shapeWindow(0), 'blue', 0.8, 1.3);
  surface(H, R, shapeWindow(0.16), 'sun', 0.18, 0.8);
  H.clip(shapeWindow(0.16), () => {
    for (let n = 0; n < 8; n++) {
      const u = 0.2 + n * 0.96,
        z = 0.17 + (n % 3) * 0.17;
      surface(H, R, [P(u, 0), P(u + 0.87, 0), P(u + 0.87, z), P(u, z)], n % 2 ? 'coral' : 'teal', 0.2, 0.4);
    }
    for (let n = 0; n < 7; n++) H.line(R, [P(0.2 + n * 1.1, 0.17), P(0.2 + n * 1.1, 2.4)], 'teal', 2.4);
    for (const z of [0.76, 1.43, 2.06]) H.line(R, [P(0.12, z), P(w - 0.12, z)], 'teal', 2.4);
    for (const u of [1.1, 3.3, 5.5]) H.line(R, [P(u, 0.45), P(u + 0.38, 1.27)], 'paper', 2.7);
  });
  timber(H, R, 4, 0.08, 7.5, 0.49, 1.49, 0.18, 'sun');
  for (const i of [4.46, 6.45, 8.42, 10.42]) metal(H, R, i, 0.31, 0.12, 0.13, 1.19, 0.3, 'teal');
  surface(H, R, H.faceJ(0.12, 1.02, 3.19, 0.03, 3.92), 'blue', 0.62);
  for (let n = 0; n < 7; n++) timber(H, R, 0.17, 1.08 + n * 0.44, 0.14, 0.42, 0.08, 3.7, n === 5 ? 'teal' : 'sun');
  for (const z of [0.55, 2.9]) metal(H, R, 0.32, 1.25, 0.11, 2.66, z, 0.16, 'teal');
  bentTube(
    H,
    R,
    [
      [0.5, 3.58, 1.34],
      [0.67, 3.58, 1.34],
      [0.67, 3.58, 1.86],
      [0.5, 3.58, 1.86]
    ],
    2.8,
    'teal'
  );
  for (let n = 0; n < 5; n++) {
    const i = 0.54 + n * 0.6,
      j = 0.26;
    bentTube(
      H,
      R,
      [
        [i, j, 3.6],
        [i, j, 2.14],
        [i + 0.33, j, 2.14]
      ],
      2.7,
      'teal'
    );
    metal(H, R, i - 0.08, j, 0.26, 0.2, 2.48, 0.18, 'coral');
    H.line(R, [H.p(i + 0.03, j, 2.61), H.p(i + 0.03, j, 2.91)], 'sun', 1.5);
  }
}

function timberStorage(H, R) {
  for (const j of [5.17, 9.78]) {
    metal(H, R, 0.32, j, 0.15, 0.17, 0.08, 3.93, 'blue');
    for (const z of [0.64, 1.58, 2.52, 3.35]) {
      metal(H, R, 0.33, j, 1.55, 0.16, z, 0.1, 'teal');
      bentTube(
        H,
        R,
        [
          [0.35, j, z - 0.39],
          [1.66, j, z]
        ],
        1.5,
        'teal'
      );
    }
  }
  for (let row = 0; row < 4; row++)
    for (let n = 0; n < 3; n++) {
      const x = 0.49 + n * 0.42,
        j = 4.92 + (n % 2) * 0.22,
        z = 0.77 + row * 0.91,
        len = 5.62 - n * 0.3;
      timber(H, R, x, j, 0.35, len, z, 0.15, row === 2 && n === 1 ? 'teal' : 'sun');
      const [a, b] = H.p(x + 0.17, j + len + 0.01, z + 0.07);
      for (let k = 0; k < 3; k++)
        H.line(
          R,
          [
            [a - 3 + k * 2, b - 2],
            [a - 4 + k * 2, b + 2]
          ],
          'coral',
          0.4
        );
    }
  benchFrame(H, R, 3.6, 0.6, 4.3, 1.31, 1.05, 'teal');
  for (let n = 0; n < 5; n++) timber(H, R, 3.79 + n * 0.76, 0.74, 0.64, 1.03, 0.35, 0.18, 'sun');
  for (let n = 0; n < 4; n++) {
    const i = 4.0 + n * 0.82;
    timber(H, R, i, 0.87, 0.25, 0.71, 1.07, 0.16, 'sun');
    metal(H, R, i + 0.07, 1.06, 0.13, 0.15, 1.23, 0.21, 'blue');
    H.line(R, [H.p(i + 0.12, 1.13, 1.37), H.p(i + 0.12, 1.13, 1.72)], 'coral', 2.3);
  }
  vessel(H, R, 8.8, 1.01, 0.07, 16, 22, 'teal');
  for (let n = 0; n < 5; n++)
    bentTube(
      H,
      R,
      [
        [8.61 + n * 0.11, 0.98, 0.21],
        [8.45 + n * 0.2, 0.81 + (n % 2) * 0.2, 2.92 - (n % 3) * 0.3]
      ],
      2.6,
      'sun'
    );
}

function cabinetmakersBench(H, R) {
  benchFrame(H, R, 3.18, 4.14, 4.96, 2.49, 1.35, 'sun');
  timber(H, R, 3.33, 6.54, 4.62, 0.16, 0.95, 0.3, 'sun');
  surface(H, R, H.tile(3.5, 4.32, 3.3, 0.43, 1.36), 'blue', 0.7, 0.5);
  for (let n = 0; n < 7; n++) {
    const i = 3.68 + n * 0.43;
    handTool(H, R, i, 4.57, 1.38, n % 3 === 0 ? 'hammer' : 'trowel', n % 2 ? 'sun' : 'coral');
  }
  for (let n = 0; n < 11; n++) {
    const [x, y] = H.p(3.53 + n * 0.39, 6.17, 1.367);
    surface(H, R, ell(x, y, 2.1, 1.15), 'blue', 0.8, 0.4);
  }
  for (let n = 0; n < 4; n++) timber(H, R, 3.68 + n * 0.91, 4.68, 0.78, 1.31, 0.38, 0.15, 'sun');
  metal(H, R, 6.57, 6.51, 1.33, 0.26, 0.91, 0.36, 'teal');
  timber(H, R, 6.42, 6.81, 1.64, 0.19, 1.01, 0.39, 'sun');
  for (const i of [6.73, 7.67]) {
    bentTube(
      H,
      R,
      [
        [i, 6.54, 1.11],
        [i, 7.07, 1.11]
      ],
      3,
      'teal'
    );
    for (let n = 0; n < 8; n++) H.line(R, [H.p(i - 0.035, 6.58 + n * 0.061, 1.13), H.p(i + 0.035, 6.63 + n * 0.061, 1.13)], 'paper', 0.6);
  }
  bentTube(
    H,
    R,
    [
      [7.24, 7.11, 0.8],
      [7.24, 7.11, 1.48]
    ],
    3,
    'coral'
  );
  for (const z of [0.8, 1.48]) surface(H, R, ell(...H.p(7.24, 7.11, z), 3, 3), 'sun', 0.8, 0.65);
  chair(H, R, 7.29, 4.71, 0.49, 'sun', 1.04);
  clamp(H, R, 7.01, 6.1, 1.44, 0.67);
  surface(H, R, H.tile(4.03, 5.13, 1.4, 0.77, 1.365), 'paper', 1);
  for (let n = 0; n < 3; n++) H.line(R, [H.p(4.2, 5.25 + n * 0.18, 1.38), H.p(5.24, 5.25 + n * 0.18, 1.38)], 'teal', 0.5);
  H.line(R, [H.p(4.53, 5.2, 1.39), H.p(4.53, 5.78, 1.39)], 'coral', 0.65);
  handTool(H, R, 5.82, 5.37, 1.39, 'hammer', 'sun');
  clamp(H, R, 3.74, 5.92, 1.4, 0.64);
  bottle(H, R, ...H.p(3.46, 4.49, 1.37), 'paper', 0.55);
  drape(H, R, 3.4, 6.11, 0.47, 0.49, 1.36, 0.63, 'coral');
  taskLight(H, R, 3.58, 4.27, 1.37, 'teal', 0.8);
}

function finishingCorner(H, R) {
  benchFrame(H, R, 10.06, 3.22, 1.58, 4.21, 1.02, 'teal');
  surface(H, R, H.tile(10.21, 3.5, 1.21, 2.07, 1.04), 'paper', 1);
  for (let n = 0; n < 3; n++) vessel(H, R, 10.7, 3.78 + n * 0.78, 1.05, 9, 16, ['sun', 'coral', 'teal'][n], n !== 1);
  drape(H, R, 10.25, 6.16, 0.63, 1.24, 1.05, 0.58, 'paper');
  for (const j of [4.19, 5.34, 6.49]) {
    timber(H, R, 10.21, j, 1.18, 0.77, 0.26, 0.12, 'sun');
    for (let n = 0; n < 3; n++) timber(H, R, 10.33 + n * 0.34, j + 0.09, 0.26, 0.59, 0.39, 0.1, 'sun');
  }
  surface(H, R, H.tile(2.61, 8.67, 2.39, 2.37, 0.035), 'coral', 0.15);
  chair(H, R, 3.08, 8.93, 0.05, 'teal', 1.1);
  for (let n = 0; n < 7; n++) H.line(R, [H.p(2.67 + n * 0.32, 10.99, 0.04), H.p(2.67 + n * 0.32, 11.18, 0.04)], 'coral', 1.1);
  benchFrame(H, R, 7.07, 9.62, 3.82, 1.27, 0.6, 'sun');
  for (let n = 0; n < 4; n++) {
    const i = 7.29 + n * 0.85;
    timber(H, R, i, 9.73, 0.69, 1.02, 0.61, 0.13, 'sun');
    for (let k = 0; k < 3; k++) surface(H, R, ell(...H.p(i + 0.14 + k * 0.2, 10.73, 0.69), 1.4, 1.8), 'coral', 0.5, 0.3);
  }
  shallowTray(H, R, 9.61, 9.69, 0.98, 0.91, 0.75, 'teal');
  for (let n = 0; n < 6; n++)
    H.line(
      R,
      [H.p(9.77 + (n % 3) * 0.23, 9.87 + Math.floor(n / 3) * 0.3, 0.84), H.p(9.83 + (n % 3) * 0.23, 10.03 + Math.floor(n / 3) * 0.3, 0.84)],
      'blue',
      1.4
    );
  for (let n = 0; n < 12; n++) {
    const [x, y] = H.p(6.85 + (n % 4) * 0.46, 7.68 + Math.floor(n / 4) * 0.48, 0.03);
    stroke(
      H,
      R,
      [
        [x - 7, y],
        [x - 7, y - 5],
        [x, y - 8],
        [x + 7, y - 3],
        [x + 3, y + 1],
        [x - 1, y - 2]
      ],
      'sun',
      1.8
    );
    H.line(
      R,
      [
        [x - 7, y],
        [x - 7, y - 5],
        [x, y - 8]
      ],
      'coral',
      0.45
    );
  }
  bentTube(
    H,
    R,
    [
      [1.97, 10.98, 0.16],
      [1.97, 10.98, 2.44]
    ],
    3,
    'sun'
  );
  surface(H, R, H.faceI(1.57, 11.1, 0.79, 0.035, 0.33), 'sun', 0.6);
  for (let n = 0; n < 12; n++) H.line(R, [H.p(1.58 + n * 0.066, 11.12, 0.3), H.p(1.58 + n * 0.066, 11.12, 0.03)], 'blue', 0.55);
}

const room = world(
  'new-york-navy-yard',
  'Brooklyn Navy Yard · Chair in the Making',
  { floor: 'sun', tone: 0.12, wall: false, height: 4.65, head: 55, pattern: 'boards' },
  (H, R) => {
    for (let n = 0; n < 6; n++) {
      const i = 3.31 + n * 1.21;
      H.tint([H.p(i, 0.4, 0.025), H.p(i + 0.96, 0.4, 0.025), H.p(i + 2.5, 8.1, 0.025), H.p(i + 1.54, 8.1, 0.025)], 'sun', 0.17, { fine: true });
    }
    floorLight(H, 6.8, 5.91, 148, 0.45);
    workshopArchitecture(H, R);
    timberStorage(H, R);
    finishingCorner(H, R);
    cabinetmakersBench(H, R);
    pendant(H, R, 6.12, 3.18, 4.62, 3.53, 'teal', 1.14);
  },
  (H, R, t) => {
    const u = cycle(t, 14);
    actor(
      H,
      R,
      8.02,
      6.44,
      u * 14,
      'newYorkChairSand',
      {
        shirt: ['coral', 0.6],
        apron: ['paper', 0.95],
        face: 'se',
        hairStyle: 'short',
        prop(h, r, points) {
          const [x, y] = points.nearHand;
          shape(
            h,
            r,
            [
              [x - 8, y - 1],
              [x + 5, y - 4],
              [x + 8, y + 2],
              [x - 5, y + 5]
            ],
            'sun',
            0.6,
            0.6
          );
          h.line(
            r,
            [
              [x - 6, y + 4],
              [x + 7, y + 1]
            ],
            'coral',
            2.2
          );
        }
      },
      0.03,
      1.4
    );
    actor(H, R, 4.15, 3.59, 0, 'think', { shirt: ['teal', 0.64], hairStyle: 'curly', face: 'se', glasses: true }, 0.03, 1.26);
  }
);
room.loopSeconds = 14;
room.stillTime = 0;
export default room;
