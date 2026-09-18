import { surface, timber, vessel, bentTube, drape, benchFrame, pendant, floorLight, cushion, caneChair, metal } from '../materials.js';
import { masonry, cabinetFrame, boardFloor } from '../structure.js';
import { windowBay, hangingRail } from '../joinery.js';
import { shallowTray, foldedCloth, coiledLine, handTool, boundBook } from '../furnishings.js';
import { TAU, actor, box, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const ready = { ...rest, al: 38, ar: 48, el: 45, er: 52, head: 4, ll: -11, lr: 12 };
FIGURES.clips.hongKongOperaSleeves = {
  dur: 14,
  keys: [
    [0, ready],
    [0.12, ready],
    [0.27, { ...ready, al: -91, el: -12, ar: 102, er: 13, lean: -7, head: -10 }],
    [0.39, { ...ready, al: -116, el: 5, ar: 142, er: -16, lean: -9, head: -16 }],
    [0.53, { ...ready, al: -68, el: -30, ar: 108, er: 14, lean: 4 }],
    [0.7, { ...ready, al: 24, el: 73, ar: 76, er: 64, head: 9 }],
    [0.83, ready],
    [1, ready]
  ]
};
FIGURES.clips.hongKongOperaCoach = {
  dur: 14,
  keys: [
    [0, { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, al: 28, ar: 36, el: 44, er: 42 }],
    [0.56, { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, al: 28, ar: 36, el: 44, er: 42, head: -6 }],
    [0.69, { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, al: 28, ar: 92, el: 44, er: 24, head: -9 }],
    [0.83, { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, al: 28, ar: 36, el: 44, er: 42 }],
    [1, { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, al: 28, ar: 36, el: 44, er: 42 }]
  ]
};

function trunk(H, R, i, j, ink, width = 1.7) {
  box(H, R, i, j, width, 1.08, 0.04, 0.72, ink, 0.6);
  box(H, R, i, j, width, 1.08, 0.77, 0.15, ink, 0.72);
  for (const a of [0.17, width - 0.27]) {
    shape(H, R, H.faceI(i + a, j + 1.09, 0.11, 0.13, 0.85), 'sun', 0.75, 0.5);
    H.line(R, [H.p(i + a + 0.05, j, 0.94), H.p(i + a + 0.05, j + 1.08, 0.94)], 'sun', 2);
  }
  const [x, y] = H.p(i + width / 2, j + 1.11, 0.52);
  stroke(
    H,
    R,
    [
      [x - 6, y - 1],
      [x - 6, y + 4],
      [x + 6, y + 4],
      [x + 6, y - 1]
    ],
    'blue',
    1.5
  );
}

function costume(H, R, j, ink, skirt = false) {
  const [x, y] = H.p(0.67, j, 2.58);
  H.line(
    R,
    [
      [x, y - 8],
      [x, y - 1],
      [x - 13, y + 8],
      [x + 13, y + 8],
      [x, y - 1]
    ],
    'blue',
    1
  );
  shape(
    H,
    R,
    [
      [x - 7, y + 4],
      [x + 7, y + 4],
      [x + 20, y + 14],
      [x + 16, y + 26],
      [x + 9, y + 20],
      [x + (skirt ? 16 : 10), y + 58],
      [x - (skirt ? 16 : 10), y + 58],
      [x - 9, y + 20],
      [x - 17, y + 27],
      [x - 21, y + 15]
    ],
    ink,
    0.65,
    0.8
  );
  for (let q = 0; q < 5; q++)
    H.line(
      R,
      [
        [x - 7 + q * 3.4, y + 21],
        [x - 10 + q * 5, y + 56]
      ],
      'blue',
      0.6,
      { tone: 0.4 }
    );
  H.line(
    R,
    [
      [x - 5, y + 5],
      [x, y + 15],
      [x + 6, y + 5]
    ],
    'paper',
    1.7
  );
  for (const dy of [25, 39, 49]) oval(H, R, x + 1, y + dy, 2.4, 1.7, 'sun', 0.7);
  for (let n = 0; n < 4; n++) {
    const yy = y + 22 + n * 8;
    for (const side of [-1, 1]) {
      const xx = x + side * (5 + n * 0.8);
      H.line(
        R,
        [
          [xx - side * 3, yy + 3],
          [xx + side * 3, yy - 2],
          [xx + side * 5, yy + 2]
        ],
        'sun',
        1.1
      );
      H.dot(xx, yy, 1.1, 'paper', 1, { knock: true });
    }
  }
  H.line(
    R,
    [
      [x - 14, y + 53],
      [x - 5, y + 55],
      [x + 5, y + 55],
      [x + 14, y + 53]
    ],
    'sun',
    1.6
  );
  for (let n = 0; n < 9; n++)
    H.line(
      R,
      [
        [x - 13 + n * 3, y + 55],
        [x - 14 + n * 3.3, y + 61 + (n % 2) * 3]
      ],
      'paper',
      0.7
    );
}

const room = world(
  'hong-kong-yau-ma-tei-opera',
  'Yau Ma Tei · Before the entrance',
  { floor: 'sun', tone: 0.13, wall: false, head: 70 },
  (H, R) => {
    boardFloor(H, R, 0, 0, 12, 12, 0.02, 'sun', 0.43);
    floorLight(H, 6.17, 6.26, 145, 0.57);
    masonry(H, R, 'nw', 0, 12, 0, 4.57, 'blue', 0.18);
    masonry(H, R, 'ne', 0, 12, 0, 4.57, 'paper');
    for (const j of [7.1, 11.5]) timber(H, R, 0.09, j, 0.21, 0.18, 0.08, 4.26, 'teal');
    timber(H, R, 0.11, 6.93, 0.2, 4.75, 4.19, 0.18, 'sun');
    hangingRail(H, R, 'nw', 7.26, 3.91, 3.62, 4, (P, u, n) => {
      const [x, y] = P(u, -0.16);
      if (n < 2) {
        surface(H, R, [[x - 10, y], [x + 10, y], [x + 12, y + 32], [x - 12, y + 32]], 'paper', 1);
        for (let q = 0; q < 4; q++) H.line(R, [[x - 7 + q * 4, y + 4], [x - 8 + q * 5, y + 28]], n ? 'teal' : 'coral', 0.9);
      } else {
        oval(H, R, x, y + 18, 12, 17, 'sun', 0.5);
        H.line(R, [[x - 8, y + 30], [x + 8, y + 4]], 'coral', 3);
      }
    });
    surface(H, R, H.faceJ(0.28, 7.62, 2.77, 1.43, 2.88), 'sun', 0.35);
    surface(H, R, H.faceJ(0.3, 7.77, 2.47, 1.56, 2.75), 'paper', 1);
    for (let n = 0; n < 3; n++) {
      const [x, y] = H.p(0.34, 8.16 + n * 0.75, 2.13);
      oval(H, R, x, y - 13, 4, 5, 'coral', 0.65);
      H.line(R, [[x, y - 8], [x + 2, y + 8], [x - 7, y + 19]], 'teal', 2);
      H.line(R, [[x - 11, y - 5], [x, y + 1], [x + 15, y - 12]], 'teal', 1.6);
    }
    surface(H, R, H.faceI(6.64, 0.14, 4.91, 0.24, 4.16), 'blue', 0.72);
    surface(H, R, H.faceI(7.46, 0.15, 3.18, 0.35, 3.72), 'sun', 0.12);
    for (const i of [6.56, 11.4]) timber(H, R, i, 0.15, 0.2, 2.12, 0.12, 4.2, 'teal');
    timber(H, R, 6.56, 0.15, 5.04, 0.21, 4.16, 0.24, 'sun');
    for (const [i, w] of [
      [6.62, 0.98],
      [10.58, 0.92]
    ]) {
      const pts = [H.p(i, 0.42, 4.12), H.p(i + w, 0.42, 4.12)];
      for (let n = 9; n >= 0; n--) pts.push(H.p(i + (n * w) / 9, 0.63 + Math.sin(n * 2) * 0.04, 0.36 + Math.sin(n * 0.8) * 0.09));
      surface(H, R, pts, 'coral', 0.75);
      for (let n = 0; n < 6; n++)
        H.line(R, [H.p(i + 0.08 + (n * w) / 6, 0.45, 4.06), H.p(i + 0.08 + (n * w) / 6, 0.66, 0.46)], n % 2 ? 'sun' : 'blue', 1.2, { tone: 0.45 });
    }
    for (let n = 0; n < 8; n++)
      surface(
        H,
        R,
        [
          H.p(6.73 + n * 0.58, 0.41, 4.13),
          H.p(7.3 + n * 0.58, 0.41, 4.13),
          H.p(7.26 + n * 0.58, 0.49, 3.75),
          H.p(6.99 + n * 0.58, 0.58, 3.64),
          H.p(6.76 + n * 0.58, 0.49, 3.75)
        ],
        'coral',
        0.72,
        0.5
      );
    for (const i of [6.82, 11.16]) {
      bentTube(H, R, [[i, 0.79, 4.18], [i, 0.83, 1.2], [i + 0.12, 0.84, 0.88], [i + 0.26, 0.84, 1.2], [i + 0.26, 0.79, 4.18]], 1, 'sun');
      oval(H, R, ...H.p(i + 0.13, 0.83, 3.98), 5, 7, 'blue', 0.65);
    }
    timber(H, R, 6.61, 0.4, 4.92, 2.38, 0.05, 0.28, 'teal');
    boardFloor(H, R, 6.65, 0.45, 4.8, 2.25, 0.35, 'sun', 0.33);
    timber(H, R, 7.52, 2.82, 3.06, 0.43, 0.03, 0.15, 'sun');
    cabinetFrame(H, R, 0.23, 1.03, 1.1, 5.38, 0.06, 3.83, 1, 'teal', (i, j, w, d, z, h) => {
      timber(H, R, i, j, w, d, z + 0.36, 0.09, 'sun');
      for (let n = 0; n < 4; n++) foldedCloth(H, R, i + 0.11, j + 0.17 + n * 1.2, w - 0.18, 1.02, z + 0.49, 'paper', n % 2 ? 'teal' : 'coral');
    });
    bentTube(
      H,
      R,
      [
        [0.72, 1.23, 2.78],
        [0.72, 6.23, 2.78]
      ],
      2.5,
      'sun'
    );
    costume(H, R, 1.91, 'teal', true);
    costume(H, R, 3.4, 'coral', true);
    costume(H, R, 4.99, 'paper', true);
    benchFrame(H, R, 1.77, 0.43, 3.75, 1.39, 1.15, 'sun');
    windowBay(H, R, 'ne', 1.81, 3.73, 1.52, 2.54, { ink: 'sun', divisions: 1 });
    for (const i of [1.95, 5.35])
      for (let n = 0; n < 7; n++) {
        const [x, y] = H.p(i, 0.38, 1.75 + n * 0.29);
        surface(H, R, ell(x, y, 4.1, 4.3), 'paper', 1);
        H.dot(x, y, 2.4, 'sun');
      }
    for (let n = 0; n < 6; n++) vessel(H, R, 2.11 + n * 0.57, 1.19, 1.2, 5.6, 12, n % 3 === 0 ? 'coral' : 'paper', n % 2 === 0);
    shallowTray(H, R, 3.84, 0.63, 1.22, 0.58, 1.2, 'teal');
    handTool(H, R, 4.18, 0.91, 1.37, 'brush', 'coral');
    cushion(H, R, 3.03, 2.39, 1.05, 1.04, 0.58, 0.16, 'coral');
    for (const i of [3.12, 3.92]) for (const j of [2.49, 3.24]) timber(H, R, i, j, 0.11, 0.11, 0.04, 0.54, 'sun');
    trunk(H, R, 0.56, 8.51, 'teal', 2.72);
    trunk(H, R, 0.74, 10.19, 'coral', 2.55);
    drape(H, R, 1.14, 8.99, 1.25, 0.54, 1.04, 0.58, 'paper');
    const [gx, gy] = H.p(3.24, 7.34, 0.51);
    bentTube(
      H,
      R,
      [
        [2.7, 7.41, 0.04],
        [2.7, 7.41, 1.78],
        [3.74, 7.41, 1.78],
        [3.74, 7.41, 0.04]
      ],
      2.5,
      'teal'
    );
    surface(H, R, ell(gx, gy - 23, 23, 28), 'sun', 0.72);
    surface(H, R, ell(gx, gy - 23, 9, 11), 'coral', 0.34);
    for (const dx of [-13, 13])
      H.line(
        R,
        [
          [gx + dx, gy - 47],
          [gx + dx, gy - 57]
        ],
        'blue',
        1
      );
    benchFrame(H, R, 1.14, 6.65, 1.32, 1.47, 0.58, 'sun');
    vessel(H, R, 1.78, 7.36, 0.6, 18, 21, 'coral', false);
    oval(H, R, ...H.p(1.78, 7.36, 1.08), 18, 9, 'paper', 1);
    for (let n = 0; n < 8; n++) {
      const a = n * TAU / 8;
      const [x, y] = H.p(1.78, 7.36, 1.08);
      H.line(R, [[x + Math.cos(a) * 17, y + Math.sin(a) * 8], [x + Math.cos(a) * 15, y + 19 + Math.sin(a) * 5]], 'sun', 0.8);
    }
    handTool(H, R, 2.18, 7.67, 0.64, 'hammer', 'paper');
    benchFrame(H, R, 10.28, 4.39, 1.03, 1.14, 0.77, 'teal');
    boundBook(H, R, 10.39, 4.51, 0.69, 0.77, 0.79, 'paper');
    vessel(H, R, 11.04, 5.14, 0.79, 5, 16, 'coral', false);
    caneChair(H, R, 9.66, 6.33, 'sun');
    benchFrame(H, R, 8.28, 9.78, 2.76, 1.43, 0.93, 'teal');
    for (let n = 0; n < 3; n++) {
      metal(H, R, 8.49 + n * 0.8, 9.94, 0.7, 1.12, 0.19, 0.42, 'teal');
      H.dot(...H.p(8.84 + n * 0.8, 11.08, 0.41), 2.4, 'sun');
    }
    shallowTray(H, R, 10.02, 9.91, 0.86, 0.91, 0.96, 'sun');
    handTool(H, R, 10.45, 10.27, 1.13, 'scissors', 'coral');
    for (let n = 0; n < 3; n++) {
      oval(H, R, ...H.p(8.72 + n * 0.34, 10.41, 1.02), 4, 3, ['teal', 'coral', 'sun'][n], 0.8);
    }
    drape(H, R, 8.45, 9.89, 1.05, 1.29, 0.95, 0.51, 'paper');
    boundBook(H, R, 10.16, 10.03, 0.7, 0.63, 0.96, 'coral');
    coiledLine(H, R, 10.43, 10.7, 0.97, 8, 'sun');
    const [fx, fy] = H.p(1.19, 11.31, 1.39);
    metal(H, R, 0.83, 11.07, 0.72, 0.54, 0.04, 0.08, 'teal');
    bentTube(H, R, [[1.19, 11.31, 0.12], [1.19, 11.31, 1.28]], 2.6, 'teal');
    oval(H, R, fx, fy, 18, 19, 'paper', 1);
    for (let n = 0; n < 12; n++) {
      const a = n * TAU / 12;
      H.line(R, [[fx, fy], [fx + Math.cos(a) * 18, fy + Math.sin(a) * 19]], 'blue', 0.6);
    }
    for (const rad of [7, 13, 18]) H.outline(R, ell(fx, fy, rad, rad * 1.05), 'teal', 0.7);
    H.dot(fx, fy, 3, 'sun');
    pendant(H, R, 6.13, 3.57, 4.49, 3.48, 'sun', 1.09);
  },
  (H, R, t) => {
    const u = cycle(t, 14),
      sweep = Math.sin(TAU * u),
      lift = Math.sin(Math.PI * Math.min(1, Math.max(0, (u - 0.12) / 0.61)));
    H.at(6.3, 6.53, 0, (HH) =>
      actor(
        HH,
        R,
        6.3,
        6.53,
        t,
        'hongKongOperaSleeves',
        {
          shirt: ['teal', 0.62],
          pants: ['blue', 0.62],
          hairStyle: 'bun',
          face: 'se',
          prop(h, r, p) {
            for (const [hand, sign] of [
              [p.farHand, -1],
              [p.nearHand, 1]
            ]) {
              const [x, y] = hand,
                reach = sign * (11 + lift * 20),
                drop = 28 - lift * 9;
              shape(
                h,
                r,
                [
                  [x - 3, y - 4],
                  [x + 4, y - 3],
                  [x + reach + sweep * 4, y + drop - 8],
                  [x + reach + sign * 12, y + drop + 3],
                  [x + reach - sign * 4, y + drop + 7],
                  [x - 5, y + 3]
                ],
                'paper',
                1,
                0.75
              );
              stroke(
                h,
                r,
                [
                  [x, y + 1],
                  [x + reach * 0.65, y + drop * 0.55],
                  [x + reach + sign * 6, y + drop + 2]
                ],
                'teal',
                0.75,
                0.42
              );
            }
          }
        },
        0,
        1.5
      )
    );
    H.at(10.12, 6.78, 0, (HH) =>
      actor(
        HH,
        R,
        10.12,
        6.78,
        t,
        'hongKongOperaCoach',
        { shirt: ['coral', 0.62], hairStyle: 'short', glasses: true, face: 'sw' },
        0.02,
        1.28,
        'elder'
      )
    );
    const [x, y] = H.p(4.9, 10.95, 0.02);
    shape(
      H,
      R,
      [
        [x - 16, y],
        [x + 16, y],
        [x + 7, y - 8],
        [x - 9, y - 7]
      ],
      'paper',
      1,
      0.6
    );
    for (let q = 0; q < 6; q++)
      H.line(
        R,
        [
          [x - 12 + q * 5, y - 1],
          [x - 7 + q * 3, y - 6]
        ],
        'teal',
        0.7,
        { tone: 0.55 }
      );
  }
);
room.loopSeconds = 14;
room.stillTime = 0;
export default room;
