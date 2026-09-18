import { bentTube, metal, surface, timber, vessel } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';

import { boundBook, foldedCloth, satchel } from '../furnishings.js';
import { TAU, actor, box, cycle, ell, oval, shape, stroke, wallRect, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, al: 36, el: 76, ar: 28, er: 88, head: 9 };
FIGURES.clips.newYorkFerrySip = {
  dur: 16,
  keys: [
    [0, seated],
    [0.14, seated],
    [0.29, { ...seated, ar: 57, er: 119, head: -5 }],
    [0.43, { ...seated, ar: 57, er: 119, head: -5 }],
    [0.57, seated],
    [0.7, { ...seated, head: -22, lean: 3 }],
    [0.88, { ...seated, head: -22, lean: 3 }],
    [1, seated]
  ]
};
FIGURES.clips.newYorkFerryDoze = {
  dur: 16,
  keys: [
    [0, { ...seated, head: 20, ar: 15, er: 43, al: 15, el: 40 }],
    [0.5, { ...seated, head: 26, ar: 15, er: 43, al: 15, el: 40, y: -0.5 }],
    [1, { ...seated, head: 20, ar: 15, er: 43, al: 15, el: 40 }]
  ]
};

function seatRow(H, R, i, j, length) {
  metal(H, R, i + 0.11, j + 0.36, length - 0.22, 0.16, 0.3, 0.13, 'teal');
  for (const x of [i + 0.24, i + length * 0.5, i + length - 0.3]) {
    bentTube(
      H,
      R,
      [
        [x, j + 0.08, 0.02],
        [x, j + 0.33, 0.49],
        [x, j + 0.79, 0.49],
        [x, j + 0.79, 0.02]
      ],
      3.2,
      'teal'
    );
    metal(H, R, x - 0.13, j + 0.72, 0.29, 0.19, 0.02, 0.06, 'blue');
  }
  const count = Math.max(1, Math.round(length / 0.88)),
    w = length / count;
  for (let n = 0; n < count; n++) {
    const x = i + n * w + 0.03,
      sw = w - 0.06;
    const seat = [
      [x, j + 0.07, 0.63],
      [x + sw, j + 0.07, 0.63],
      [x + sw, j + 0.65, 0.57],
      [x + sw - 0.08, j + 0.84, 0.6],
      [x + 0.08, j + 0.84, 0.6],
      [x, j + 0.65, 0.57]
    ];
    surface(
      H,
      R,
      seat.map((p) => H.p(...p)),
      'coral',
      0.65,
      0.65
    );
    const back = [
      [x, j + 0.07, 0.63],
      [x + sw, j + 0.07, 0.63],
      [x + sw, j - 0.035, 1.15],
      [x + sw - 0.12, j - 0.055, 1.28],
      [x + 0.12, j - 0.055, 1.28],
      [x, j - 0.035, 1.15]
    ];
    surface(
      H,
      R,
      back.map((p) => H.p(...p)),
      'coral',
      0.7,
      0.65
    );
    for (let k = 0; k < 3; k++)
      H.line(R, [H.p(x + 0.13 + (k * (sw - 0.26)) / 2, j + 0.05, 0.78), H.p(x + 0.13 + (k * (sw - 0.26)) / 2, j - 0.01, 1.1)], 'sun', 0.85);
    H.line(R, [H.p(x + 0.09, j + 0.75, 0.6), H.p(x + sw - 0.09, j + 0.75, 0.6)], 'paper', 1);
  }
  for (const x of [i, i + length])
    bentTube(
      H,
      R,
      [
        [x, j + 0.71, 0.6],
        [x, j + 0.74, 0.98],
        [x, j + 0.06, 1.04],
        [x, j + 0.03, 0.64]
      ],
      2.5,
      'teal'
    );
}

function harbor(H, R, polygon, shift = 0) {
  const xs = polygon.map((p) => p[0]),
    ys = polygon.map((p) => p[1]);
  const x0 = Math.min(...xs),
    x1 = Math.max(...xs),
    y0 = Math.min(...ys),
    y1 = Math.max(...ys);
  H.clip(polygon, () => {
    shape(
      H,
      R,
      [
        [x0 - 8, y1 - 30],
        [x1 + 8, y1 - 30],
        [x1 + 8, y1 + 8],
        [x0 - 8, y1 + 8]
      ],
      'teal',
      0.43,
      0.4
    );
    for (let n = 0; n < 14; n++) {
      const x = x0 - 20 + n * 16,
        h = 8 + ((n * 13) % 29);
      shape(
        H,
        R,
        [
          [x, y1 - 31],
          [x, y1 - 31 - h],
          [x + 11, y1 - 31 - h],
          [x + 11, y1 - 31]
        ],
        'blue',
        0.3,
        0.4
      );
    }
    oval(H, R, x1 - 19, y0 + 24, 13, 13, 'sun', 0.64);
    for (let k = 0; k < 8; k++) {
      const x = x0 - 45 + ((k * 37 + shift * (x1 - x0 + 90)) % (x1 - x0 + 90));
      H.line(
        R,
        [
          [x, y1 - 22 + (k % 3) * 7],
          [x + 15 + (k % 2) * 7, y1 - 22 + (k % 3) * 7]
        ],
        'paper',
        1.3,
        { tone: 0.72, amp: 0.1 }
      );
    }
  });
}

function luggage(H, R, i, j) {
  box(H, R, i, j, 0.72, 0.55, 0.04, 0.67, 'teal', 0.7);
  const [x, y] = H.p(i + 0.37, j + 0.3, 0.71);
  stroke(
    H,
    R,
    [
      [x - 7, y],
      [x - 7, y - 9],
      [x + 7, y - 9],
      [x + 7, y]
    ],
    'blue',
    2
  );
  shape(H, R, H.faceI(i + 0.09, j + 0.56, 0.51, 0.15, 0.42), 'coral', 0.62, 0.6);
  H.line(R, [H.p(i + 0.36, j + 0.57, 0.16), H.p(i + 0.36, j + 0.57, 0.36)], 'sun', 1.4);
  for (const a of [0.16, 0.58]) H.dot(...H.p(i + a, j + 0.48, 0.04), 2.5, 'blue');
}

const room = world(
  'new-york-staten-ferry',
  'Staten Island Ferry · First Crossing',
  { floor: 'paper', tone: 1, wall: false, head: 90 },
  (H, R) => {
    boardFloor(H, R, 0.08, 0.16, 11.82, 11.68, 0.025, 'sun', 0.43);
    surface(H, R, H.faceI(0.03, 0.13, 11.94, 0, 3.47), 'paper', 1);
    surface(H, R, H.faceJ(0.12, 0.15, 11.74, 0, 3.54), 'teal', 0.37);
    for (const p of [2.15, 5.85, 9.55]) {
      const pane = wallRect(H, 'ne', p - 1.58, p + 1.58, 1.29, 2.88, 0.031);
      surface(H, R, pane, 'sun', 0.11);
      H.outline(R, wallRect(H, 'ne', p - 1.72, p + 1.72, 1.16, 3.02, -0.1), 'teal', 5);
      H.outline(R, pane, 'blue', 1.4);
      timber(H, R, p - 1.7, 0.17, 3.4, 0.47, 1.09, 0.12, 'sun');
    }
    for (let n = 0; n < 27; n++) metal(H, R, 0.23 + n * 0.43, 0.24, 0.022, 0.035, 0.09, 0.89, 'teal');
    for (const z of [0.13, 1.02, 3.12]) metal(H, R, 0.14, 0.19, 11.72, 0.15, z, 0.1, 'teal');
    surface(H, R, H.faceJ(0.22, 1.1, 2.25, 0.17, 3.04), 'paper', 1);
    surface(H, R, H.faceJ(0.23, 1.3, 1.83, 1.46, 2.77), 'teal', 0.43);
    bentTube(
      H,
      R,
      [
        [0.29, 2.84, 1.26],
        [0.29, 2.84, 1.85]
      ],
      2.5,
      'sun'
    );
    for (const j of [1.02, 5.49, 10.65]) {
      const rib = [];
      for (let n = 0; n <= 24; n++) {
        const i = 0.23 + n * 0.48;
        rib.push([i, j, 3.56 + Math.sin((n * Math.PI) / 24) * 0.47]);
      }
      bentTube(H, R, rib, 5, 'paper');
      bentTube(
        H,
        R,
        rib.map(([i, j, z]) => [i, j, z + 0.06]),
        1.1,
        'teal'
      );
    }
    metal(H, R, 0.14, 0.15, 0.27, 10.77, 3.49, 0.15, 'teal');
    metal(H, R, 11.54, 0.15, 0.27, 10.77, 3.49, 0.15, 'teal');
    for (const i of [2.42, 8.64]) {
      metal(H, R, i, 1.02, 0.17, 5.37, 3.87, 0.13, 'blue');
      H.line(R, [H.p(i + 0.09, 1.08, 3.85), H.p(i + 0.09, 6.26, 3.85)], 'sun', 3.7);
    }
    seatRow(H, R, 1.02, 2.72, 3.44);
    seatRow(H, R, 6.63, 2.72, 4.3);
    seatRow(H, R, 2.53, 6.31, 3.82);
    seatRow(H, R, 8.29, 7.2, 2.55);
    for (const [i, j] of [
      [1.01, 4.87],
      [7.46, 5.27],
      [10.91, 9.7]
    ]) {
      metal(H, R, i, j, 0.075, 0.075, 0.02, 3.64, 'teal');
      surface(H, R, ell(...H.p(i + 0.04, j + 0.04, 0.045), 5, 2.4), 'blue', 0.5);
      for (let n = 0; n < 3; n++) {
        const z = 2.34 + n * 0.34;
        bentTube(
          H,
          R,
          [
            [i, j, z],
            [i - 0.43, j, z],
            [i - 0.43, j, z - 0.18]
          ],
          1.6,
          'sun'
        );
      }
    }
    cabinetFrame(H, R, 0.36, 8.84, 2.12, 2.28, 0.03, 1.44, 1, 'teal', (i, j, w, d, z, h) => {
      for (let n = 0; n < 3; n++) foldedCloth(H, R, i + 0.14, j + 0.24 + n * 0.55, w - 0.25, 0.46, z + 0.12 + n * 0.18, 'coral', 'paper');
    });
    const [lx, ly] = H.p(0.32, 6.73, 2.36);
    surface(H, R, ell(lx, ly, 18, 21), 'coral', 0.77);
    surface(H, R, ell(lx, ly, 9, 11), 'paper', 1);
    for (const a of [0, Math.PI / 2, Math.PI, Math.PI * 1.5])
      H.line(
        R,
        [
          [lx + Math.cos(a) * 10, ly + Math.sin(a) * 12],
          [lx + Math.cos(a) * 19, ly + Math.sin(a) * 22]
        ],
        'paper',
        3.5
      );
    luggage(H, R, 4.94, 7.71);
    boundBook(H, R, 3.08, 6.52, 0.74, 0.54, 0.67, 'paper');
    vessel(H, R, 10.67, 10.87, 0.03, 12, 27, 'teal');
    for (let n = 0; n < 19; n++) H.line(R, [H.p(3.1 + n * 0.23, 10.9, 0.04), H.p(3.1 + n * 0.23, 11.42, 0.04)], 'sun', 1.4);
  },
  (H, R, t) => {
    const u = cycle(t, 16);
    for (const p of [2.15, 5.85, 9.55]) {
      const pane = wallRect(H, 'ne', p - 1.58, p + 1.58, 1.29, 2.88, 0.031);
      harbor(H, R, pane, u);
    }
    H.at(4.72, 6.72, 0, (HH) =>
      actor(
        HH,
        R,
        4.72,
        6.72,
        u * 16,
        'newYorkFerrySip',
        {
          shirt: ['teal', 0.68],
          pants: ['blue', 0.72],
          hairStyle: 'curly',
          skin: ['coral', 0.52],
          prop(h, r, points) {
            const [x, y] = points.nearHand;
            shape(
              h,
              r,
              [
                [x - 5, y + 5],
                [x + 5, y + 5],
                [x + 5, y - 12],
                [x - 5, y - 12]
              ],
              'paper',
              1,
              0.7
            );
            oval(h, r, x, y - 12, 5, 2, 'teal', 0.75);
            h.line(
              r,
              [
                [x - 5, y - 5],
                [x + 5, y - 5]
              ],
              'coral',
              2
            );
            const [bx, by] = points.farHand;
            shape(
              h,
              r,
              [
                [bx - 15, by - 3],
                [bx + 6, by + 3],
                [bx + 5, by + 12],
                [bx - 16, by + 6]
              ],
              'sun',
              0.64,
              0.7
            );
            h.line(
              r,
              [
                [bx - 12, by + 1],
                [bx + 2, by + 5]
              ],
              'paper',
              2
            );
            h.line(
              r,
              [
                [bx - 5, by + 6],
                [bx - 6, by + 15]
              ],
              'coral',
              1.5
            );
          }
        },
        0.1,
        1.4
      )
    );
    H.at(8.5, 3.1, 0, (HH) =>
      actor(HH, R, 8.5, 3.1, u * 16, 'newYorkFerryDoze', { shirt: ['sun', 0.66], hairStyle: 'cap', eyesClosed: true }, 0.1, 1.3)
    );
    const [wx, wy] = H.p(10.93, 9.82, 2.1);
    stroke(
      H,
      R,
      [
        [wx, wy - 11],
        [wx + Math.sin(u * TAU) * 2, wy + 3],
        [wx + 1, wy + 14]
      ],
      'coral',
      1.6
    );
  }
);

room.over = (H, R) => {
  for (const i of [2.02, 7.24]) {
    const points = [H.p(i, 0.43, 3.34), H.p(i, 0.94, 3.18), H.p(i + 2.43, 0.94, 3.18), H.p(i + 2.43, 0.43, 3.34)];
    shape(H, R, points, 'paper', 0.9, 0.7);
    for (let n = 0; n < 8; n++) H.line(R, [H.p(i + 0.13 + n * 0.29, 0.46, 3.35), H.p(i + 0.13 + n * 0.29, 0.88, 3.23)], 'blue', 0.8);
    for (const x of [i + 0.12, i + 2.28]) H.line(R, [H.p(x, 0.24, 2.94), H.p(x, 0.93, 3.19)], 'teal', 1.4);
  }
  satchel(H, R, 2.78, 0.79, 3.32, 'teal', 0.57);
  foldedCloth(H, R, 7.6, 0.5, 0.95, 0.39, 3.37, 'coral', 'paper');
};
room.loopSeconds = 16;
room.stillTime = 0;
export default room;
