import { surface, timber, metal, vessel, bentTube, benchFrame, pendant } from '../materials.js';
import { masonry, cabinetFrame, rackFrame } from '../structure.js';
import { taskLight } from '../joinery.js';
import { shallowTray, foldedCloth, coiledLine, handTool } from '../furnishings.js';
import { TAU, actor, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const up = { ...rest, al: 57, ar: 55, el: 64, er: 60, lean: -7, head: 9, ll: -9, lr: 13 };
const down = { ...up, drop: 0.16, lean: -24, al: 39, ar: 39, el: 6, er: 8, head: 17 };
FIGURES.clips.hongKongTyrePump = {
  dur: 16,
  keys: [
    [0, up],
    [0.12, up],
    [0.24, down],
    [0.34, up],
    [0.46, down],
    [0.56, up],
    [0.68, { ...up, head: 24, lean: -10 }],
    [0.83, { ...up, head: 24, lean: -10 }],
    [1, up]
  ]
};

function wheel(H, R, x, y, radius = 22, narrow = 0.82) {
  oval(H, R, x, y, radius * narrow, radius, 'blue', 0.83);
  oval(H, R, x, y, radius * narrow - 3, radius - 3, 'paper', 1);
  H.outline(R, ell(x, y, radius * narrow - 5, radius - 5), 'teal', 0.8, { tone: 0.52 });
  for (let q = 0; q < 12; q++) {
    const a = (q * TAU) / 12;
    H.line(
      R,
      [
        [x, y],
        [x + Math.cos(a) * (radius * narrow - 3), y + Math.sin(a) * (radius - 3)]
      ],
      'blue',
      0.65,
      { tone: 0.55 }
    );
  }
  oval(H, R, x, y, 2.7, 3, 'sun', 0.8);
  H.dot(x + radius * narrow * 0.45, y + radius * 0.64, 2, 'coral', 0.85, { knock: true });
}

function bicycle(H, R, i, j, ink = 'coral', size = 1, basket = true) {
  const [x, y] = H.p(i, j, 0.04),
    p = (a, b) => [x + a * size, y + b * size];
  wheel(H, R, ...p(-36, -21), 21 * size, 0.81);
  wheel(H, R, ...p(40, -21), 21 * size, 0.81);
  const frame = [
    [-36, -21],
    [-14, -46],
    [1, -22],
    [25, -45],
    [40, -21],
    [1, -22],
    [-36, -21]
  ];
  H.line(
    R,
    frame.map(([a, b]) => p(a, b)),
    'blue',
    3.9 * size
  );
  H.line(
    R,
    frame.map(([a, b]) => p(a, b)),
    ink,
    2.1 * size
  );
  H.line(R, [p(-14, -46), p(14, -40), p(25, -45)], ink, 3 * size);
  H.line(R, [p(-14, -44), p(-16, -53)], 'blue', 2.3 * size);
  oval(H, R, ...p(-15, -55), 11 * size, 3 * size, 'blue', 0.75);
  H.line(R, [p(25, -45), p(24, -59), p(31, -63), p(38, -61)], 'blue', 2.4 * size);
  H.outline(R, ell(...p(1, -22), 7 * size, 7 * size), 'blue', 1.1);
  H.line(R, [p(-4, -17), p(7, -27), p(13, -27)], 'blue', 1.6 * size);
  H.line(R, [p(-36, -26), p(-47, -39), p(-23, -44)], 'blue', 1.8 * size);
  H.line(R, [p(-51, -43), p(-21, -43)], 'teal', 3 * size);
  H.line(R, [p(2, -20), p(6, -2)], 'blue', 1.6 * size);
  if (basket) {
    shape(H, R, [p(27, -57), p(51, -57), p(47, -40), p(31, -40)], 'sun', 0.5, 0.7);
    for (let q = 0; q < 5; q++) H.line(R, [p(30 + q * 4.5, -56), p(33 + q * 3, -41)], 'blue', 0.7, { tone: 0.56 });
    for (const z of [-52, -47, -42]) H.line(R, [p(30, z), p(49, z)], 'blue', 0.7, { tone: 0.56 });
  }
  for (const [a, b, c, d] of [
    [-36, -21, 1, -22],
    [-14, -46, 25, -45]
  ]) {
    H.line(R, [p(a, b - 3), p(c, d - 3)], 'paper', 0.6);
  }
  const chain = [p(-36, -23), p(0, -29), p(8, -24), p(5, -16), p(-36, -19)];
  H.line(R, chain, 'blue', 0.8);
  H.line(R, [p(23, -54), p(30, -49), p(34, -34)], 'blue', 0.65);
  H.line(R, [p(20, -57), p(7, -45), p(-12, -41), p(-29, -27)], 'blue', 0.65);
  for (let n = 0; n < 12; n++) {
    const a = (n * TAU) / 12;
    H.dot(...p(1 + Math.cos(a) * 8, -22 + Math.sin(a) * 8), 0.8, 'sun');
  }
  surface(H, R, [p(-42, -47), p(-27, -47), p(-29, -28), p(-44, -29)], 'teal', 0.58, 0.6);
  H.line(R, [p(-40, -44), p(-29, -44), p(-31, -40), p(-39, -40)], 'sun', 0.8);
}

function bottle(H, R, i, j, z, ink) {
  const [x, y] = H.p(i, j, z);
  shape(
    H,
    R,
    [
      [x - 4, y],
      [x + 4, y],
      [x + 5, y - 18],
      [x + 3, y - 23],
      [x - 3, y - 23],
      [x - 5, y - 18]
    ],
    ink,
    0.65,
    0.6
  );
  H.line(
    R,
    [
      [x - 3, y - 23],
      [x + 3, y - 23]
    ],
    'blue',
    2.1
  );
  H.line(
    R,
    [
      [x - 4, y - 10],
      [x + 4, y - 10]
    ],
    'paper',
    2.6
  );
}

const room = world(
  'hong-kong-tai-po-cycle',
  'Tai Po · One more breath of air',
  { floor: 'paper', tone: 1, wall: false, head: 65 },
  (H, R) => {
    surface(H, R, H.tile(0.05, 0.05, 11.9, 11.9, 0.02), 'paper', 1);
    for (let n = 0; n < 13; n++) H.line(R, [H.p(0.15, 0.29 + n * 0.9, 0.025), H.p(11.8, 0.29 + n * 0.9, 0.025)], 'blue', 0.45, { tone: 0.25 });
    masonry(H, R, 'nw', 0, 12, 0, 3.97, 'paper');
    for (const i of [0.29, 6.16, 11.62]) metal(H, R, i, 0.39, 0.19, 0.23, 0.04, 4.07, 'teal');
    metal(H, R, 0.27, 0.37, 11.49, 0.29, 4.07, 0.17, 'teal');
    for (let n = 0; n < 13; n++)
      surface(
        H,
        R,
        [H.p(0.25 + n * 0.88, 0.39, 4.27), H.p(1.11 + n * 0.88, 0.39, 4.27), H.p(1.11 + n * 0.88, 2.17, 3.87), H.p(0.25 + n * 0.88, 2.17, 3.87)],
        n % 3 ? 'paper' : 'sun',
        0.65,
        0.45
      );
    surface(H, R, H.faceI(0.39, 0.47, 10.99, 1.6, 3.98), 'teal', 0.16);
    for (let n = 0; n < 7; n++) {
      const [x, y] = H.p(1.13 + n * 1.46, 0.58, 3.18);
      wheel(H, R, x, y, 22 + (n % 2) * 3, 0.84);
      bentTube(
        H,
        R,
        [
          [1.13 + n * 1.46, 0.51, 3.96],
          [1.13 + n * 1.46, 0.61, 3.47]
        ],
        1.4,
        'sun'
      );
    }
    cabinetFrame(H, R, 1.09, 0.77, 8.28, 1.37, 0.06, 1.18, 5, 'teal', (i, j, w, d, z, h, n) => {
      if (n % 2) {
        timber(H, R, i, j, w, d, z + 0.5, 0.08, 'sun');
        for (let q = 0; q < 3; q++) bottle(H, R, i + 0.2 + q * 0.4, j + 0.54, z + 0.65, q % 2 ? 'sun' : 'coral');
      } else for (let q = 0; q < 4; q++) coiledLine(H, R, i + w * 0.5, j + 0.35 + q * 0.21, z + 0.13, 9, 'blue');
    });
    metal(H, R, 1.04, 0.71, 8.4, 1.51, 1.25, 0.11, 'paper');
    for (let n = 0; n < 4; n++) shallowTray(H, R, 1.32 + n * 1.38, 0.93, 1.16, 0.88, 1.38, n % 2 ? 'sun' : 'teal');
    for (let n = 0; n < 7; n++) handTool(H, R, 1.51 + n * 0.89, 1.43, 1.57, n % 2 ? 'spanner' : 'hammer', n % 2 ? 'coral' : 'sun');
    taskLight(H, R, 8.79, 0.96, 1.38, 'coral', -0.68);
    bicycle(H, R, 6.21, 5.56, 'coral', 1.45, true);
    for (const [i, j] of [
      [4.7, 3.38],
      [7.53, 3.03]
    ])
      bicycle(H, R, i, j, 'teal', 0.81, false);
    bentTube(
      H,
      R,
      [
        [7.41, 3.17, 0.04],
        [7.41, 3.17, 1.3],
        [7.16, 3.05, 1.3]
      ],
      3,
      'teal'
    );
    for (const [i, j] of [
      [6.71, 3.57],
      [8.09, 3.57],
      [7.4, 2.48]
    ])
      bentTube(
        H,
        R,
        [
          [7.41, 3.17, 0.1],
          [i, j, 0.1]
        ],
        2,
        'teal'
      );
    rackFrame(H, R, 0.39, 5.69, 1.51, 4.96, 0.04, [0.14, 1.02, 1.91], 'sun', (i, j, w, d, z, row) => {
      for (let n = 0; n < 4; n++) {
        const [x, y] = H.p(i + w * 0.5, j + 0.53 + n * 1.07, z + 0.24);
        wheel(H, R, x, y, 12 + row, 0.8);
      }
    });
    for (const j of [4.78, 9.69])
      bentTube(
        H,
        R,
        [
          [11.47, j, 0.05],
          [11.47, j, 1.49]
        ],
        2.6,
        'teal'
      );
    for (const z of [0.59, 1.43])
      bentTube(
        H,
        R,
        [
          [11.47, 4.78, z],
          [11.47, 9.69, z]
        ],
        2.3,
        'sun'
      );
    benchFrame(H, R, 9.17, 9.26, 2.14, 1.86, 0.66, 'sun');
    foldedCloth(H, R, 9.36, 9.48, 1.78, 1.39, 0.69, 'paper', 'coral');
    vessel(H, R, 10.76, 8.01, 0.05, 12, 23, 'teal');
    coiledLine(H, R, 9.62, 7.95, 0.04, 22, 'blue');
    surface(H, R, H.tile(4.75, 9.63, 2.61, 1.33, 0.025), 'teal', 0.17);
    for (let n = 0; n < 8; n++) H.line(R, [H.p(4.9 + n * 0.3, 9.74, 0.03), H.p(4.9 + n * 0.3, 10.86, 0.03)], 'blue', 0.5);
    pendant(H, R, 5.65, 2.16, 4.25, 3.24, 'sun', 0.96);
  },
  (H, R, t) => {
    const u = cycle(t, 16),
      [baseX, baseY] = H.p(6.55, 7.67, 0.02);
    H.at(6.43, 8.18, 0, (HH) =>
      actor(
        HH,
        R,
        6.43,
        8.18,
        t,
        'hongKongTyrePump',
        {
          shirt: ['paper', 1],
          apron: ['teal', 0.64],
          pants: ['blue', 0.7],
          hairStyle: 'short',
          prop(h, r, p) {
            const handX = (p.nearHand[0] + p.farHand[0]) / 2,
              handY = (p.nearHand[1] + p.farHand[1]) / 2;
            oval(h, r, baseX, baseY, 15, 5, 'blue', 0.73);
            shape(
              h,
              r,
              [
                [baseX - 4, baseY - 2],
                [baseX + 4, baseY - 2],
                [baseX + 4, baseY - 24],
                [baseX - 4, baseY - 24]
              ],
              'coral',
              0.71,
              0.7
            );
            h.line(
              r,
              [
                [baseX, baseY - 24],
                [handX, handY + 1]
              ],
              'blue',
              2.7
            );
            h.line(
              r,
              [
                [handX - 13, handY],
                [handX + 13, handY]
              ],
              'blue',
              4.2
            );
            h.line(r, [p.farHand, [handX - 5, handY]], 'coral', 2.1, { tone: 0.34 });
            h.line(r, [p.nearHand, [handX + 5, handY]], 'coral', 2.1, { tone: 0.34 });
            const [tx, ty] = h.p(6.21, 5.56, 0.04);
            stroke(
              h,
              r,
              [
                [baseX + 3, baseY - 6],
                [baseX + 33, baseY + 5],
                [tx + 69, ty + 8],
                [tx + 55, ty - 6]
              ],
              'blue',
              1.7
            );
            oval(h, r, baseX + 8, baseY - 10, 6.5, 6.5, 'paper', 1);
            const angle = -0.9 + (u < 0.56 ? Math.sin((u * Math.PI) / 0.56) * 0.23 : 0);
            h.line(
              r,
              [
                [baseX + 8, baseY - 10],
                [baseX + 8 + Math.sin(angle) * 4.5, baseY - 10 - Math.cos(angle) * 4.5]
              ],
              'coral',
              1.2
            );
          }
        },
        0,
        1.35
      )
    );
    H.at(8.93, 4.88, 0, (HH) =>
      actor(
        HH,
        R,
        8.93,
        4.88,
        0,
        'hold',
        {
          shirt: ['sun', 0.7],
          hairStyle: 'pony',
          face: 'sw',
          prop(h, r, p) {
            const [x, y] = p.nearHand;
            oval(h, r, x, y + 5, 9, 8, 'teal', 0.6);
            h.line(
              r,
              [
                [x - 5, y + 1],
                [x - 2, y + 10]
              ],
              'paper',
              1.2
            );
            h.line(
              r,
              [
                [x + 1, y],
                [x + 4, y + 10]
              ],
              'paper',
              1.2
            );
          }
        },
        0,
        1.23
      )
    );
  }
);
room.loopSeconds = 16;
room.stillTime = 0;
export default room;
