import { surface, metal, bentTube, drape, benchFrame } from '../materials.js';
import { masonry, cabinetFrame, rackFrame, basin as washBasin } from '../structure.js';
import { caster } from '../joinery.js';
import { shallowTray, slattedCrate } from '../furnishings.js';
import { TAU, actor, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const weigh = { ...rest, al: 58, el: 53, ar: 62, er: 50, lean: -7, head: 14 };
FIGURES.clips.hongKongMarketWeigh = {
  dur: 15,
  keys: [
    [0, weigh],
    [0.12, weigh],
    [0.21, { ...weigh, ar: 69, er: 53, al: 65, el: 58 }],
    [0.41, { ...weigh, ar: 68, er: 54, al: 63, el: 58 }],
    [0.49, weigh],
    [0.68, weigh],
    [0.77, { ...weigh, ar: 70, er: 53, al: 65, el: 58 }],
    [0.93, weigh],
    [1, weigh]
  ]
};
const ease = (u) => (1 - Math.cos(Math.PI * Math.max(0, Math.min(1, u)))) / 2;

function leafy(H, R, x, y, size = 1, ink = 'teal') {
  for (let n = 0; n < 5; n++) {
    const a = -0.95 + n * 0.43;
    const tx = x + Math.sin(a) * 12 * size,
      ty = y - (15 + (n % 2) * 4) * size;
    stroke(
      H,
      R,
      [
        [x, y],
        [x + Math.sin(a) * 5 * size, y - 6 * size],
        [tx, ty]
      ],
      'paper',
      2.2 * size
    );
    shape(
      H,
      R,
      [
        [tx, ty + 8 * size],
        [tx - 6 * size, ty + 2 * size],
        [tx - 5 * size, ty - 5 * size],
        [tx + 2 * size, ty - 8 * size],
        [tx + 6 * size, ty - 1 * size],
        [tx + 4 * size, ty + 4 * size]
      ],
      ink,
      0.58 + (n % 2) * 0.16,
      0.55
    );
    H.line(
      R,
      [
        [tx, ty + 6 * size],
        [tx, ty - 5 * size]
      ],
      'blue',
      0.55
    );
  }
}

function crate(H, R, i, j, w, d, z, kind) {
  metal(H, R, i, j, w, d, z, 0.07, 'teal');
  for (const x of [i + 0.035, i + w - 0.095]) for (const y of [j + 0.035, j + d - 0.095]) metal(H, R, x, y, 0.06, 0.06, z, 0.34, 'teal');
  for (const h of [0.11, 0.28]) {
    metal(H, R, i, j, w, 0.045, z + h, 0.045, 'teal');
    metal(H, R, i, j + d - 0.045, w, 0.045, z + h, 0.045, 'teal');
    metal(H, R, i, j, 0.045, d, z + h, 0.045, 'teal');
    metal(H, R, i + w - 0.045, j, 0.045, d, z + h, 0.045, 'teal');
  }
  for (let n = 0; n < 7; n++)
    bentTube(
      H,
      R,
      [
        [i + 0.12 + (n * (w - 0.24)) / 6, j + d, z + 0.08],
        [i + 0.12 + (n * (w - 0.24)) / 6, j + d, z + 0.31]
      ],
      0.65,
      'teal'
    );
  for (let n = 0; n < 9; n++) {
    const [x, y] = H.p(i + 0.29 + ((n % 3) * (w - 0.6)) / 2, j + 0.24 + (Math.floor(n / 3) * (d - 0.5)) / 2, z + 0.38);
    if (kind === 'greens') leafy(H, R, x, y, 0.63);
    if (kind === 'tomato') {
      oval(H, R, x, y - 3, 6.5, 5.7, 'coral', 0.75);
      H.line(
        R,
        [
          [x - 3, y - 7],
          [x, y - 10],
          [x + 2, y - 7]
        ],
        'teal',
        1.1
      );
    }
    if (kind === 'aubergine') {
      oval(H, R, x, y - 4, 5, 11, 'blue', 0.78);
      shape(
        H,
        R,
        [
          [x - 4, y - 12],
          [x - 1, y - 17],
          [x + 4, y - 13],
          [x + 1, y - 10]
        ],
        'teal',
        0.7,
        0.4
      );
      H.line(
        R,
        [
          [x - 2, y - 7],
          [x - 2, y + 1]
        ],
        'paper',
        0.8
      );
    }
    if (kind === 'radish') {
      shape(
        H,
        R,
        [
          [x - 5, y - 10],
          [x + 5, y - 10],
          [x + 4, y + 2],
          [x, y + 9],
          [x - 3, y + 2]
        ],
        'paper',
        0.96,
        0.5
      );
      for (const a of [-1, 0, 1])
        stroke(
          H,
          R,
          [
            [x, y - 10],
            [x + a * 5, y - 17],
            [x + a * 7, y - 21]
          ],
          'teal',
          2
        );
    }
    if (kind === 'ginger') {
      stroke(
        H,
        R,
        [
          [x - 7, y + 2],
          [x - 2, y - 7],
          [x + 4, y - 2],
          [x + 8, y - 9]
        ],
        'sun',
        6.4
      );
      H.line(
        R,
        [
          [x - 3, y - 4],
          [x + 1, y - 1]
        ],
        'blue',
        0.7
      );
    }
    if (kind === 'onion') {
      oval(H, R, x, y - 3, 6.5, 7.5, 'sun', 0.67);
      H.line(
        R,
        [
          [x - 2, y - 9],
          [x - 2, y + 1]
        ],
        'coral',
        0.75
      );
      H.line(
        R,
        [
          [x, y - 10],
          [x + 1, y - 15]
        ],
        'blue',
        0.65
      );
    }
  }
}

function basket(H, R, x, y) {
  for (let k = 0; k < 4; k++) leafy(H, R, x - 12 + k * 8, y + 12, 0.78);
  shape(
    H,
    R,
    [
      [x - 22, y + 7],
      [x + 23, y + 7],
      [x + 17, y + 28],
      [x - 16, y + 28]
    ],
    'sun',
    0.58
  );
  for (let q = 0; q < 7; q++)
    H.line(
      R,
      [
        [x - 17 + q * 5.6, y + 10],
        [x - 13 + q * 4.3, y + 26]
      ],
      'blue',
      0.7,
      { tone: 0.66 }
    );
  for (const n of [14, 19, 24])
    H.line(
      R,
      [
        [x - 19 + (n - 14) * 0.18, y + n],
        [x + 20 - (n - 14) * 0.18, y + n]
      ],
      'paper',
      0.9
    );
  stroke(
    H,
    R,
    [
      [x - 17, y + 9],
      [x - 12, y - 6],
      [x + 11, y - 6],
      [x + 18, y + 9]
    ],
    'coral',
    2.2
  );
}

const room = world(
  'hong-kong-north-point-market',
  'North Point · A basket of greens',
  { floor: 'paper', tone: 1, wall: false, head: 60 },
  (H, R) => {
    for (let i = 0; i < 12; i++)
      for (let j = 0; j < 12; j++) surface(H, R, H.tile(i, j, 0.98, 0.98, 0.02), (i + j) % 3 ? 'paper' : 'teal', 0.15, 0.35);
    masonry(H, R, 'ne', 0, 12, 0, 4.17, 'teal', 0.2);
    for (const i of [0.29, 5.95, 11.62]) metal(H, R, i, 0.31, 0.18, 0.23, 0.03, 4.21, 'teal');
    for (const j of [0.43, 3.1])
      bentTube(
        H,
        R,
        [
          [0.3, j, 3.99],
          [11.59, j, 3.99]
        ],
        3,
        'teal'
      );
    for (let n = 0; n < 18; n++) {
      const i = 0.21 + n * 0.643;
      surface(
        H,
        R,
        [H.p(i, 0.21, 4.32), H.p(i + 0.63, 0.21, 4.32), H.p(i + 0.63, 3.37, 3.84), H.p(i, 3.37, 3.84)],
        n % 2 ? 'paper' : 'coral',
        0.64,
        0.45
      );
      surface(
        H,
        R,
        [H.p(i, 3.37, 3.84), H.p(i + 0.63, 3.37, 3.84), H.p(i + 0.6, 3.41, 3.56), H.p(i + 0.05, 3.41, 3.59)],
        n % 2 ? 'paper' : 'coral',
        0.64,
        0.4
      );
    }
    for (const i of [0.45, 6.04, 11.47])
      bentTube(
        H,
        R,
        [
          [i, 0.37, 3.13],
          [i, 2.6, 3.97]
        ],
        2,
        'teal'
      );
    for (let row = 0; row < 3; row++) {
      const j = 0.7 + row * 1.01,
        z = 1.67 - row * 0.47;
      benchFrame(H, R, 2.24, j, 8.67, 1.03, z, 'teal');
      for (let n = 0; n < 5; n++)
        crate(H, R, 2.35 + n * 1.7, j + 0.06, 1.57, 0.89, z + 0.015, ['greens', 'tomato', 'aubergine', 'radish', 'ginger'][(n + row) % 5]);
    }
    rackFrame(H, R, 0.49, 3.42, 1.18, 5.87, 0.04, [0.15, 1.13, 2.14], 'teal', (i, j, w, d, z, row) => {
      for (let n = 0; n < 4; n++) crate(H, R, i, j + n * 1.4, w, 1.29, z, n % 2 ? 'onion' : 'greens');
    });
    cabinetFrame(H, R, 7.19, 4.35, 3.49, 1.28, 0.04, 1.08, 3, 'sun', (i, j, w, d, z, h, n) => {
      for (let k = 0; k < 3; k++)
        surface(H, R, H.tile(i + 0.07, j + 0.1, w - 0.14, d - 0.18, z + 0.1 + k * 0.08), n === 1 ? 'paper' : 'sun', 0.5, 0.4);
    });
    metal(H, R, 7.13, 4.3, 3.62, 1.38, 1.13, 0.09, 'paper');
    metal(H, R, 7.44, 4.57, 1.56, 0.92, 1.24, 0.2, 'teal');
    surface(H, R, H.tile(7.35, 4.52, 1.76, 1.02, 1.46), 'paper', 1);
    const [x, y] = H.p(8.17, 5.57, 1.34);
    surface(H, R, ell(x, y, 15, 12), 'sun', 0.5);
    surface(H, R, ell(x, y, 12, 9.5), 'paper', 1);
    for (let n = 0; n < 9; n++) {
      const a = (n / 8) * Math.PI;
      H.line(
        R,
        [
          [x + Math.cos(a) * 9, y - Math.sin(a) * 7],
          [x + Math.cos(a) * 11, y - Math.sin(a) * 9]
        ],
        'blue',
        0.6
      );
    }
    H.line(
      R,
      [
        [x, y],
        [x - 6, y - 5]
      ],
      'coral',
      1.3
    );
    shallowTray(H, R, 9.47, 4.59, 1.08, 0.84, 1.25, 'sun');
    for (let n = 0; n < 6; n++) H.dot(...H.p(9.65 + (n % 3) * 0.27, 4.83 + Math.floor(n / 3) * 0.31, 1.45), 2.1, 'teal');
    benchFrame(H, R, 5.01, 7.43, 2.76, 1.43, 0.83, 'sun');
    crate(H, R, 5.16, 7.59, 2.4, 1.1, 0.85, 'greens');
    metal(H, R, 9.71, 9.15, 1.48, 1.68, 0.19, 0.1, 'teal');
    for (const i of [9.76, 11.13]) for (const j of [9.23, 10.73]) caster(H, R, i, j);
    for (let n = 0; n < 3; n++) slattedCrate(H, R, 9.8, 9.25, 1.26, 1.41, 0.33 + n * 0.41, 0.34, 'sun');
    bentTube(
      H,
      R,
      [
        [11.32, 0.59, 3.86],
        [11.32, 4.49, 3.86],
        [11.48, 4.48, 2.81]
      ],
      2.3,
      'teal'
    );
    washBasin(H, R, 10.33, 6.3, 1.16, 1.58, 0.69);
    for (let n = 0; n < 18; n++) H.line(R, [H.p(0.57 + n * 0.52, 10.93, 0.02), H.p(0.57 + n * 0.52, 11.2, 0.02)], 'blue', 0.9);
    drape(H, R, 5.21, 8.46, 0.62, 0.42, 0.86, 0.45, 'paper');
  },
  (H, R, t) => {
    const u = cycle(t, 15);
    const move = u < 0.18 ? 0 : u < 0.46 ? ease((u - 0.18) / 0.28) : u < 0.69 ? 1 : u < 0.95 ? 1 - ease((u - 0.69) / 0.26) : 0;
    const j = 5.0 + move * 1.7;
    H.at(6.2, j, 0, (HH) =>
      actor(
        HH,
        R,
        6.2,
        j,
        u * 15,
        'hongKongMarketWeigh',
        {
          shirt: ['paper', 0.9],
          apron: ['coral', 0.69],
          hairStyle: 'short',
          prop: (h, r, p) => {
            basket(h, r, p.nearHand[0] + 6, p.nearHand[1] + 1);
          }
        },
        0,
        1.3
      )
    );
    H.at(8.96, 7.61, 0, (HH) =>
      actor(
        HH,
        R,
        8.96,
        7.61,
        u * 3,
        'hold',
        {
          shirt: ['sun', 0.57],
          hairStyle: 'bun',
          face: 'sw',
          prop: (h, r, p) => {
            const [x, y] = p.nearHand;
            const spread = 2 + Math.sin(u * TAU) ** 2 * 3;
            stroke(
              h,
              r,
              [
                [x - 9, y + 8],
                [x - spread, y - 3],
                [x + spread, y - 3],
                [x + 10, y + 8]
              ],
              'coral',
              1.6
            );
            shape(
              h,
              r,
              [
                [x - 12, y + 7],
                [x + 12, y + 7],
                [x + 10, y + 30],
                [x - 10, y + 30]
              ],
              'paper',
              0.9
            );
            h.line(
              r,
              [
                [x - 3, y + 10],
                [x - 4, y + 27]
              ],
              'teal',
              0.8
            );
          }
        },
        0,
        1.2
      )
    );
    const q = cycle(u * 15, 3);
    const [x, y] = H.p(11.48, 4.48, 2.72 - q * 2.48);
    H.opacity(Math.sin(q * Math.PI) * 0.65, () =>
      H.line(
        R,
        [
          [x, y - 5],
          [x, y]
        ],
        'paper',
        1.5
      )
    );
  }
);
room.loopSeconds = 15;
export default room;
