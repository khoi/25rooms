import { benchFrame, bentTube, cushion, metal, pendant, surface } from '../materials.js';
import { masonry, cabinetFrame, rackFrame } from '../structure.js';
import { taskLight, windowBay } from '../joinery.js';
import { coiledLine, handTool, shallowTray, slattedCrate } from '../furnishings.js';
import { TAU, actor, cycle, ell, oval, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const repair = { ...rest, lean: -8, head: 15, al: 25, el: 40, ar: 74, er: 13 };
FIGURES.clips.newYorkWheelTrue = {
  dur: 16,
  keys: [
    [0, repair],
    [0.09, repair],
    [0.16, { ...repair, ar: 93, er: 5 }],
    [0.23, { ...repair, ar: 37, er: 57 }],
    [0.4, { ...repair, ar: 37, er: 57, head: 25 }],
    [0.48, repair],
    [0.57, { ...repair, ar: 65, er: 23, al: 50, el: 33 }],
    [0.66, { ...repair, ar: 68, er: 27, al: 50, el: 33 }],
    [0.74, { ...repair, ar: 65, er: 23, al: 50, el: 33 }],
    [0.87, repair],
    [1, repair]
  ]
};

function wheel(H, R, x, y, radius = 28, turn = 0, ink = 'blue') {
  H.outline(R, ell(x, y, radius * 0.82, radius), ink, 3.4, { tone: 0.85, amp: 0.12 });
  H.outline(R, ell(x, y, radius * 0.73, radius * 0.91), 'paper', 1.4, { tone: 1, amp: 0.08 });
  for (let n = 0; n < 16; n++) {
    const a = turn + (n * TAU) / 16;
    H.line(
      R,
      [
        [x, y],
        [x + Math.cos(a) * radius * 0.75, y + Math.sin(a) * radius * 0.94]
      ],
      'blue',
      0.65,
      { tone: 0.55, amp: 0.05 }
    );
  }
  const a = turn + 0.5;
  H.line(
    R,
    [
      [x + Math.cos(a) * radius * 0.44, y + Math.sin(a) * radius * 0.53],
      [x + Math.cos(a) * radius * 0.63, y + Math.sin(a) * radius * 0.78]
    ],
    'coral',
    3,
    { tone: 0.9 }
  );
  oval(H, R, x, y, 3, 4, 'sun', 0.8);
}

function bike(H, R, i, j, z = 0, scale = 1, ink = 'coral') {
  const [x, y] = H.p(i, j, z);
  const p = (a, b) => [x + a * scale, y + b * scale];
  wheel(H, R, ...p(-34, -28), 25 * scale);
  wheel(H, R, ...p(41, -28), 25 * scale);
  for (const points of [
    [
      [-34, -28],
      [-6, -64],
      [8, -29],
      [-34, -28]
    ],
    [
      [-6, -64],
      [31, -65],
      [8, -29]
    ],
    [
      [31, -65],
      [41, -28]
    ],
    [
      [8, -29],
      [26, -60]
    ]
  ])
    H.line(
      R,
      points.map(([a, b]) => p(a, b)),
      ink,
      3.8 * scale,
      { tone: 0.78, amp: 0.12 }
    );
  H.line(R, [p(-8, -68), p(-12, -79), p(-23, -79), p(1, -79)], 'blue', 3 * scale);
  stroke(H, R, [p(30, -65), p(26, -84), p(37, -88), p(48, -84), p(46, -74)], 'blue', 2 * scale);
  oval(H, R, ...p(8, -29), 7 * scale, 7 * scale, 'blue', 0.6);
  H.line(R, [p(8, -29), p(18, -20), p(24, -21)], 'paper', 2 * scale);
  stroke(H, R, [p(-38, -29), p(8, -24), p(10, -33), p(-34, -34), p(-38, -29)], 'blue', 0.75);
  H.line(R, [p(-35, -64), p(-15, -65), p(-28, -31)], 'blue', 1.2 * scale);
  for (const [a, b, c, d] of [
    [-6, -64, 31, -65],
    [-34, -28, 8, -29]
  ])
    H.line(R, [p(a, b - 1), p(c, d - 1)], 'paper', 0.8);
  stroke(H, R, [p(46, -77), p(25, -56), p(-4, -58), p(-26, -39)], 'blue', 0.7);
  stroke(H, R, [p(40, -80), p(47, -65), p(44, -45)], 'blue', 0.65);
  for (let n = 0; n < 14; n++) {
    const a = (n * TAU) / 14;
    H.dot(...p(8 + Math.cos(a) * 8, -29 + Math.sin(a) * 8), 0.85, 'sun');
  }
  H.line(R, [p(25, -47), p(30, -52)], 'coral', 2.3);
  surface(H, R, [p(-4, -50), p(0, -54), p(7, -45), p(3, -41)], 'paper', 1, 0.5);
}

function wrench(H, R, x, y, size = 1, ink = 'blue') {
  H.line(
    R,
    [
      [x, y],
      [x + 2 * size, y - 20 * size]
    ],
    ink,
    3 * size
  );
  stroke(
    H,
    R,
    [
      [x - 2 * size, y - 25 * size],
      [x - 3 * size, y - 20 * size],
      [x + 2 * size, y - 16 * size],
      [x + 6 * size, y - 21 * size],
      [x + 5 * size, y - 25 * size]
    ],
    ink,
    2 * size
  );
  oval(H, R, x, y + 1 * size, 3.5 * size, 3.5 * size, ink, 0.72);
  oval(H, R, x, y + 1 * size, 1.8 * size, 1.8 * size, 'paper', 1);
}

const room = world(
  'new-york-mott-haven-cycles',
  'Mott Haven · Wheel True',
  { floor: 'paper', tone: 1, wall: false, head: 105 },
  (H, R) => {
    surface(H, R, H.tile(0, 0, 12, 12, 0.02), 'blue', 0.12);
    for (let n = 0; n < 7; n++) H.line(R, [H.p(0.1, n * 1.71, 0.025), H.p(11.9, n * 1.71, 0.025)], 'teal', 0.5, { tone: 0.3 });
    masonry(H, R, 'ne', 0.06, 11.87, 0, 4.18, 'coral', 0.37);
    masonry(H, R, 'nw', 0.06, 11.87, 0, 4.18, 'paper', 1);
    surface(H, R, H.faceI(7.59, 0.21, 3.69, 0.07, 3.85), 'blue', 0.77);
    for (let n = 0; n < 26; n++) metal(H, R, 7.73, 0.24, 3.41, 0.09, 1.83 + n * 0.072, 0.035, 'teal');
    surface(H, R, H.faceI(7.76, 0.29, 3.35, 0.09, 1.79), 'sun', 0.13);
    for (const i of [7.53, 11.31]) metal(H, R, i, 0.2, 0.14, 0.25, 0.03, 3.96, 'sun');
    windowBay(H, R, 'nw', 1.07, 3.39, 1.72, 2.14, { ink: 'teal', divisions: 3 });
    cabinetFrame(H, R, 0.44, 0.52, 1.95, 4.08, 0.03, 1.21, 1, 'teal', (i, j, w, d, z, h) => {
      for (let n = 0; n < 4; n++) slattedCrate(H, R, i + 0.08, j + 0.08 + n * 0.94, w - 0.15, 0.81, z, 0.41, 'sun');
    });
    metal(H, R, 0.39, 0.49, 2.04, 4.16, 1.25, 0.1, 'paper');
    for (let n = 0; n < 6; n++) handTool(H, R, 0.81, 1.03 + n * 0.54, 1.38, n % 2 ? 'wrench' : 'pliers', n % 3 ? 'teal' : 'coral');
    for (const i of [3.26, 4.77, 6.28]) {
      bentTube(
        H,
        R,
        [
          [i, 0.48, 2.38],
          [i, 0.71, 2.63]
        ],
        2.6,
        'teal'
      );
      wheel(H, R, ...H.p(i, 0.72, 2.48), 19, 0, 'blue');
    }
    bike(H, R, 3.61, 3.58, 0.01, 0.93, 'coral');
    bike(H, R, 9.51, 2.46, 0.04, 0.87, 'teal');
    surface(H, R, H.tile(4.22, 4.84, 3.97, 3.76, 0.035), 'teal', 0.2);
    benchFrame(H, R, 5.45, 4.98, 2.57, 1.6, 0.91, 'sun');
    metal(H, R, 6.15, 5.24, 0.82, 0.76, 0.96, 0.12, 'teal');
    for (const i of [6.18, 6.89])
      bentTube(
        H,
        R,
        [
          [i, 5.51, 1.02],
          [i, 5.51, 1.79],
          [6.55, 5.58, 1.79]
        ],
        3,
        'teal'
      );
    bentTube(
      H,
      R,
      [
        [6.48, 5.41, 1.1],
        [6.48, 5.41, 1.33],
        [6.83, 5.57, 1.33]
      ],
      1.3,
      'coral'
    );
    shallowTray(H, R, 7.04, 5.03, 0.72, 1.28, 0.97, 'paper');
    for (let n = 0; n < 9; n++) H.dot(...H.p(7.18 + (n % 3) * 0.2, 5.23 + Math.floor(n / 3) * 0.33, 1.03), 1.5, 'teal', 0.8);
    for (const [i, j] of [
      [9.28, 7.41],
      [9.28, 10.27]
    ]) {
      metal(H, R, i, j, 0.15, 0.15, 0.02, 2.7, 'teal');
      bentTube(
        H,
        R,
        [
          [i, j, 2.72],
          [10.94, j, 2.72]
        ],
        2.4,
        'teal'
      );
    }
    for (let n = 0; n < 5; n++) wheel(H, R, ...H.p(10.06, 7.81 + n * 0.48, 2.27), 22, n * 0.1, 'blue');
    rackFrame(H, R, 0.5, 7.15, 2.02, 3.86, 0.03, [0.15, 1.06, 1.97], 'teal', (i, j, w, d, z, row) => {
      for (let n = 0; n < 4; n++) {
        shallowTray(H, R, i + 0.08, j + 0.09 + n * 0.84, w - 0.16, 0.69, z, 'sun');
        if (row === 1) for (let k = 0; k < 4; k++) H.line(R, ell(...H.p(i + 0.27 + k * 0.38, j + 0.42 + n * 0.84, z + 0.08), 3, 2), 'blue', 0.7);
      }
    });
    coiledLine(H, R, 3.92, 10.51, 0.03, 18, 'teal');
    bentTube(
      H,
      R,
      [
        [3.92, 10.5, 0.04],
        [4.61, 10.44, 0.19],
        [4.61, 9.41, 1.32]
      ],
      2,
      'blue'
    );
    metal(H, R, 4.34, 9.39, 0.62, 0.07, 1.34, 0.06, 'sun');
    benchFrame(H, R, 6.23, 9.49, 1.64, 1.37, 0.71, 'teal');
    cushion(H, R, 6.25, 9.51, 1.6, 1.32, 0.75, 0.15, 'coral');
    pendant(H, R, 6.51, 5.29, 4.17, 3.2, 'sun', 1.04);
    taskLight(H, R, 7.83, 5.03, 1.03, 'teal', -0.72);
  },
  (H, R, t) => {
    const u = cycle(t, 16),
      spin = Math.min(1, Math.max(0, (u - 0.1) / 0.34));
    const angle = TAU * 5 * (1 - (1 - spin) ** 3);
    wheel(H, R, ...H.p(6.55, 5.58, 1.77), 31, angle);
    actor(
      H,
      R,
      5.65,
      6.51,
      u * 16,
      'newYorkWheelTrue',
      {
        shirt: ['sun', 0.64],
        apron: ['teal', 0.68],
        face: 'se',
        hairStyle: 'curly',
        prop(h, r, points) {
          const [x, y] = points.farHand;
          oval(h, r, x + 3, y - 3, 3, 3, 'blue', 0.7);
          h.line(
            r,
            [
              [x + 3, y - 1],
              [x + 8, y + 6]
            ],
            'blue',
            2
          );
        }
      },
      0.02,
      1.4
    );
    actor(
      H,
      R,
      3.27,
      3.6,
      0,
      'hold',
      {
        shirt: ['coral', 0.6],
        face: 'sw',
        hairStyle: 'short',
        prop(h, r, points) {
          const [x, y] = points.nearHand;
          wrench(h, r, x, y, 0.5);
        }
      },
      0.02,
      1.2
    );
  }
);
room.loopSeconds = 16;
room.stillTime = 0;
export default room;
