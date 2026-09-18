import { surface, timber, metal, vessel, bentTube, benchFrame, slattedSeat, cushion } from '../materials.js';
import { masonry, cabinetFrame, boardFloor } from '../structure.js';

import { foldedCloth, coiledLine, handTool, boundBook, shallowTray } from '../furnishings.js';
import { TAU, actor, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const watch = { ...rest, al: -146, el: -12, ar: 146, er: 12, head: -6, lean: 3 };
const lowered = { ...rest, al: 45, el: 70, ar: 52, er: 73, head: 12 };
FIGURES.clips.hongKongHideObserve = {
  dur: 14,
  keys: [
    [0, watch],
    [0.2, watch],
    [0.32, { ...watch, head: -12, lean: -3 }],
    [0.49, { ...watch, head: -12, lean: -3 }],
    [0.64, lowered],
    [0.81, lowered],
    [0.94, watch],
    [1, watch]
  ]
};
const seated = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, al: 48, ar: 65, el: 45, er: 30, head: 16 };
FIGURES.clips.hongKongHideNotes = {
  dur: 14,
  keys: [
    [0, seated],
    [0.5, seated],
    [0.65, { ...seated, ar: 73, er: 22 }],
    [0.7, seated],
    [0.76, { ...seated, ar: 72, er: 21 }],
    [0.84, seated],
    [1, seated]
  ]
};

function reeds(H, R, i, j, s = 1, bend = 0) {
  const [x, y] = H.p(i, j, 0.08);
  for (let k = 0; k < 7; k++) {
    const dx = (k - 3) * 4 * s,
      h = (28 + (k % 3) * 12) * s;
    stroke(
      H,
      R,
      [
        [x + dx, y],
        [x + dx - 2 * s + bend, y - h * 0.52],
        [x + dx + (k % 2 ? 5 : -4) * s + bend, y - h]
      ],
      'teal',
      1.15 * s,
      0.7
    );
    const tip = x + dx + (k % 2 ? 5 : -4) * s + bend;
    oval(H, R, tip, y - h + 2 * s, 1.6 * s, 6 * s, 'sun', 0.68);
    stroke(
      H,
      R,
      [
        [x + dx, y - h * 0.32],
        [x + dx + 10 * s, y - h * 0.57],
        [x + dx + 13 * s, y - h * 0.58]
      ],
      'teal',
      0.8 * s,
      0.6
    );
  }
}

function egret(H, R, x, y, turn = 0) {
  for (const dx of [-3, 4])
    stroke(
      H,
      R,
      [
        [x + dx, y - 2],
        [x + dx + 2, y + 11],
        [x + dx + 6, y + 11]
      ],
      'blue',
      0.7
    );
  oval(H, R, x, y - 6, 10, 5, 'paper', 1);
  stroke(
    H,
    R,
    [
      [x + 6, y - 7],
      [x + 13, y - 14],
      [x + 8 + turn, y - 23],
      [x + 13 + turn, y - 27]
    ],
    'blue',
    3.8
  );
  stroke(
    H,
    R,
    [
      [x + 6, y - 7],
      [x + 13, y - 14],
      [x + 8 + turn, y - 23],
      [x + 13 + turn, y - 27]
    ],
    'paper',
    2.8
  );
  oval(H, R, x + 14 + turn, y - 27, 4, 3, 'paper', 1);
  shape(
    H,
    R,
    [
      [x + 17 + turn, y - 28],
      [x + 26 + turn, y - 26],
      [x + 17 + turn, y - 25]
    ],
    'sun',
    0.8,
    0.4
  );
  H.dot(x + 15 + turn, y - 28, 0.8, 'blue');
  stroke(
    H,
    R,
    [
      [x - 7, y - 7],
      [x, y - 4],
      [x + 5, y - 6]
    ],
    'teal',
    0.55,
    0.45
  );
}

const room = world(
  'hong-kong-tin-shui-wai-hide',
  'Tin Shui Wai · A gap in the reeds',
  { floor: 'paper', tone: 1, wall: false, head: 70 },
  (H, R) => {
    surface(H, R, H.tile(0, 0, 12, 2.25, 0.025), 'teal', 0.28);
    for (let n = 0; n < 19; n++) {
      const i = 0.25 + (n % 7) * 1.61,
        j = 0.3 + Math.floor(n / 7) * 0.65;
      H.line(R, [H.p(i, j, 0.04), H.p(i + 0.57, j, 0.04)], 'paper', 1);
    }
    for (const [i, j, s] of [
      [0.61, 0.49, 0.87],
      [1.3, 1.31, 0.96],
      [9.14, 0.45, 1.03],
      [10.76, 1.35, 0.86]
    ])
      reeds(H, R, i, j, s);
    for (const i of [0.16, 5.84, 11.48]) for (const j of [2.39, 6.56, 11.31]) timber(H, R, i, j, 0.25, 0.28, 0.03, 0.3, 'teal');
    timber(H, R, 0.08, 2.28, 11.83, 9.56, 0.13, 0.1, 'sun');
    boardFloor(H, R, 0.1, 2.33, 11.76, 9.42, 0.25, 'sun', 0.44);
    for (const i of [0.15, 4.02, 7.86, 11.58]) {
      timber(H, R, i, 2.2, 0.22, 0.3, 0.23, 3.5, 'teal');
      bentTube(
        H,
        R,
        [
          [i, 2.4, 2.96],
          [i, 3.16, 3.62]
        ],
        2.8,
        'sun'
      );
    }
    for (let n = 0; n < 22; n++) {
      timber(H, R, 0.18 + n * 0.52, 2.19, 0.49, 0.2, 0.24, 1.51, 'teal');
      timber(H, R, 0.18 + n * 0.52, 2.19, 0.49, 0.2, 2.53, 1.06, 'teal');
    }
    surface(H, R, H.faceI(0.37, 2.41, 11.24, 1.79, 2.5), 'paper', 1);
    surface(H, R, H.faceI(0.39, 2.42, 11.2, 1.8, 2.05), 'teal', 0.23);
    for (let n = 0; n < 13; n++) H.line(R, [H.p(0.6 + n * 0.82, 2.425, 1.91), H.p(0.99 + n * 0.82, 2.425, 1.91)], 'paper', 0.85);
    for (const z of [1.73, 2.51]) timber(H, R, 0.29, 2.37, 11.37, 0.46, z, 0.1, 'sun');
    for (const i of [0.2, 4.08, 7.98, 11.62]) {
      timber(H, R, i, 2.16, 0.18, 3.38, 3.68, 0.19, 'sun');
      for (const j of [2.23, 4.43]) metal(H, R, i - 0.02, j, 0.22, 0.19, 3.66, 0.045, 'teal');
    }
    for (let n = 0; n < 7; n++) timber(H, R, 0.11, 2.18 + n * 0.17, 11.77, 0.14, 3.9, 0.08, 'paper');
    masonry(H, R, 'nw', 2.44, 8.92, 0.25, 2.64, 'teal', 0.18);
    for (const i of [0.65, 4.36, 8.17]) {
      surface(H, R, [H.p(i, 2.36, 2.55), H.p(i + 3.15, 2.36, 2.55), H.p(i + 3.15, 3.04, 3.09), H.p(i, 3.04, 3.09)], 'teal', 0.61);
      for (const a of [i + 0.17, i + 2.94]) {
        metal(H, R, a, 2.32, 0.17, 0.18, 2.52, 0.13, 'sun');
        bentTube(H, R, [[a, 2.55, 2.13], [a, 3.01, 3.06]], 1.4, 'blue');
      }
      H.line(R, [H.p(i + 0.1, 3.04, 3.07), H.p(i + 3.05, 3.04, 3.07)], 'paper', 1.3);
    }
    for (const j of [3.0, 5.25, 8.78, 11.27]) timber(H, R, 0.16, j, 0.21, 0.2, 0.3, 2.6, 'sun');
    timber(H, R, 0.16, 2.84, 0.28, 8.61, 2.79, 0.18, 'sun');
    surface(H, R, H.faceJ(0.4, 3.25, 2.04, 1.06, 2.51), 'paper', 0.93);
    for (const [j, z] of [[3.7, 2.14], [4.5, 1.57]]) {
      const [x, y] = H.p(0.42, j, z);
      egret(H, R, x, y, 0);
    }
    benchFrame(H, R, 0.71, 2.72, 10.26, 0.81, 1.49, 'sun');
    for (let n = 0; n < 4; n++) surface(H, R, H.tile(1.18 + n * 2.42, 2.87, 1.24, 0.5, 1.51), 'paper', 1, 0.5);
    slattedSeat(H, R, 3.94, 4.87, 4.56, 0.25, 'sun', 0.62);
    cabinetFrame(H, R, 0.38, 5.67, 1.6, 3.12, 0.29, 1.33, 1, 'teal', (i, j, w, d, z, h) => {
      for (let row = 0; row < 2; row++) {
        timber(H, R, i, j, w, d, z + row * 0.53, 0.08, 'sun');
        for (let n = 0; n < 5; n++) boundBook(H, R, i + 0.14, j + 0.12 + n * 0.53, w - 0.28, 0.43, z + 0.1 + row * 0.53, n % 2 ? 'paper' : 'teal');
      }
    });
    benchFrame(H, R, 1.4, 7.41, 3.03, 1.58, 1.17, 'sun');
    boundBook(H, R, 1.82, 7.66, 1.38, 0.95, 1.2, 'paper');
    handTool(H, R, 3.66, 8.45, 1.2, 'brush', 'coral');
    cushion(H, R, 2.19, 9.06, 1.02, 0.91, 0.82, 0.13, 'coral');
    for (const i of [2.3, 3.06]) for (const j of [9.15, 9.8]) timber(H, R, i, j, 0.11, 0.11, 0.26, 0.54, 'sun');
    const [x, y] = H.p(10.49, 3.97, 0.28);
    for (const dx of [-21, 0, 21])
      H.line(
        R,
        [
          [x, y - 62],
          [x + dx, y]
        ],
        'teal',
        2
      );
    surface(
      H,
      R,
      [
        [x - 24, y - 68],
        [x + 19, y - 62],
        [x + 20, y - 73],
        [x - 21, y - 81]
      ],
      'teal',
      0.78
    );
    surface(H, R, ell(x + 20, y - 68, 4, 6), 'paper', 1);
    cabinetFrame(H, R, 9.03, 8.6, 2.31, 2.39, 0.28, 0.74, 2, 'sun', (i, j, w, d, z, h, n) => {
      foldedCloth(H, R, i + 0.08, j + 0.1, w - 0.16, d - 0.21, z + 0.12, 'paper', n ? 'coral' : 'teal');
    });
    shallowTray(H, R, 9.23, 8.79, 1.83, 1.09, 1.07, 'teal');
    foldedCloth(H, R, 9.39, 8.95, 1.46, 0.73, 1.23, 'paper', 'sun');
    for (const [i, r] of [[9.8, 6], [10.41, 4]]) surface(H, R, ell(...H.p(i, 9.37, 1.33), r, r * 0.56), 'blue', 0.82);
    handTool(H, R, 10.43, 10.37, 1.06, 'brush', 'coral');
    boundBook(H, R, 9.28, 10.2, 0.8, 0.58, 1.06, 'teal');
    shallowTray(H, R, 0.58, 10.17, 1.66, 1.06, 0.3, 'teal');
    for (const j of [10.41, 10.92]) {
      metal(H, R, 0.87, j, 0.62, 0.31, 0.4, 0.17, 'blue');
      metal(H, R, 0.88, j, 0.29, 0.3, 0.53, 0.47, 'teal');
    }
    bentTube(H, R, [[0.39, 9.21, 2.53], [0.69, 9.21, 2.53], [0.69, 9.21, 2.67]], 1.7, 'sun');
    surface(H, R, H.faceJ(0.79, 8.96, 0.83, 1.15, 2.22), 'coral', 0.57);
    surface(H, R, H.faceJ(0.8, 9.12, 0.48, 1.3, 1.68), 'teal', 0.68);
    bentTube(H, R, [[0.79, 9.12, 2.18], [0.79, 9.24, 2.57], [0.79, 9.67, 2.18]], 1.1, 'blue');
    foldedCloth(H, R, 7.36, 5.0, 0.85, 0.59, 0.9, 'teal', 'coral');
    const [capX, capY] = H.p(10.49, 3.97, 1.15);
    H.line(R, [[capX + 17, capY - 38], [capX + 26, capY + 7]], 'blue', 0.8);
    surface(H, R, ell(capX + 26, capY + 7, 5, 6), 'coral', 0.76);
    H.line(R, [[capX - 19, capY + 15], [capX, capY + 21], [capX + 19, capY + 15]], 'sun', 1.4);
    bentTube(H, R, [[11.7, 2.32, 3.8], [11.83, 2.69, 3.71], [11.83, 2.69, 0.35]], 2, 'teal');
    vessel(H, R, 9.41, 7.12, 0.26, 11, 21, 'sun');
  },
  (H, R, t) => {
    const u = cycle(t, 14),
      bend = Math.sin(u * TAU) * 2;
    const slit = H.faceI(0.37, 2.42, 11.24, 1.79, 2.5);
    H.clip(slit, () => {
      const [x, y] = H.p(7.05, 2.42, 1.93);
      egret(H, R, x, y, Math.sin(u * TAU) * 2);
      for (let k = 0; k < 9; k++) {
        const [rx, ry] = H.p(8.58 + k * 0.32, 2.42, 1.81);
        stroke(
          H,
          R,
          [
            [rx, ry + 13],
            [rx + bend, ry - 6],
            [rx + bend + 3, ry - 18 - (k % 3) * 4]
          ],
          'teal',
          0.8,
          0.62
        );
        oval(H, R, rx + bend + 3, ry - 20 - (k % 3) * 4, 1.5, 4.5, 'sun', 0.57);
      }
    });
    H.at(5.94, 4.21, 0.22, (HH) =>
      actor(
        HH,
        R,
        5.94,
        4.21,
        t,
        'hongKongHideObserve',
        {
          shirt: ['coral', 0.61],
          hairStyle: 'cap',
          face: 'ne',
          prop(h, r, p) {
            const x = (p.nearHand[0] + p.farHand[0]) / 2,
              y = (p.nearHand[1] + p.farHand[1]) / 2;
            stroke(h, r, [p.nearHand, [x, y + 1], p.farHand], 'blue', 3);
            for (const dx of [-5, 5]) {
              shape(
                h,
                r,
                [
                  [x + dx - 4, y + 4],
                  [x + dx + 4, y + 4],
                  [x + dx + 3, y - 7],
                  [x + dx - 3, y - 7]
                ],
                'blue',
                0.8,
                0.6
              );
              oval(h, r, x + dx, y - 7, 3.5, 2, 'teal', 0.64);
            }
            stroke(
              h,
              r,
              [
                [x - 7, y + 4],
                [p.chest[0] - 11, p.chest[1] + 13],
                [p.chest[0] + 10, p.chest[1] + 14],
                [x + 7, y + 4]
              ],
              'blue',
              0.7
            );
          }
        },
        0.22,
        1.34
      )
    );
    H.at(2.67, 9.37, 0.25, (HH) =>
      actor(
        HH,
        R,
        2.67,
        9.37,
        t,
        'hongKongHideNotes',
        {
          shirt: ['paper', 1],
          hairStyle: 'bun',
          face: 'nw',
          prop(h, r, p) {
            h.line(
              r,
              [
                [p.nearHand[0] + 2, p.nearHand[1] + 4],
                [p.nearHand[0] - 5, p.nearHand[1] - 10]
              ],
              'blue',
              1.3
            );
          }
        },
        0.25,
        1.24
      )
    );
  }
);

room.loopSeconds = 14;
room.stillTime = 0;
export default room;
