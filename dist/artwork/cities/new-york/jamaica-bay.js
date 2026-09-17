import { benchFrame, bentTube, slattedSeat, surface, timber, vessel } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';

import { boundBook, foldedCloth, handTool, satchel, slattedCrate } from '../furnishings.js';
import { TAU, actor, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, al: 50, ar: 45, el: 68, er: 74, head: 10 };
const watching = { ...seated, al: 160, ar: 154, el: 32, er: 33, head: -12, lean: 4 };
FIGURES.clips.newYorkBinoculars = {
  dur: 20,
  keys: [
    [0, seated],
    [0.13, seated],
    [0.28, watching],
    [0.48, { ...watching, head: -16, lean: 5 }],
    [0.61, watching],
    [0.76, seated],
    [1, seated]
  ]
};

function reeds(H, R, i, j, h, ink = 'teal') {
  const [x, y] = H.p(i, j, 0.05);
  for (let n = 0; n < 7; n++) {
    const lean = (n - 3) * 4;
    stroke(
      H,
      R,
      [
        [x + n - 3, y],
        [x + lean * 0.55, y - h * 0.57],
        [x + lean, y - h + (n % 3) * 7]
      ],
      ink,
      1.35,
      0.6
    );
    if (n % 2 === 0)
      shape(
        H,
        R,
        [
          [x + lean - 2, y - h + (n % 3) * 7],
          [x + lean, y - h - 10 + (n % 3) * 7],
          [x + lean + 3, y - h + (n % 3) * 7]
        ],
        'sun',
        0.55,
        0.4
      );
  }
  for (let n = 0; n < 5; n++) {
    const lean = (n - 2) * 5,
      yy = y - h * 0.45 - (n % 2) * 8;
    surface(
      H,
      R,
      [
        [x + lean * 0.4, yy],
        [x + lean - 4, yy - 17],
        [x + lean - 11, yy - 22],
        [x + lean - 7, yy - 11]
      ],
      ink,
      0.52,
      0.35
    );
    H.line(
      R,
      [
        [x + lean * 0.4, yy],
        [x + lean - 11, yy - 22]
      ],
      'sun',
      0.55
    );
  }
}

function shorebird(H, R, x, y, dip) {
  for (const d of [-3, 3])
    H.line(
      R,
      [
        [x + d, y],
        [x + d - 1, y - 13]
      ],
      'blue',
      0.8
    );
  oval(H, R, x, y - 15, 9, 5, 'paper', 1);
  shape(
    H,
    R,
    [
      [x - 6, y - 17],
      [x - 13, y - 20],
      [x - 8, y - 13]
    ],
    'blue',
    0.57,
    0.5
  );
  stroke(
    H,
    R,
    [
      [x + 4, y - 17],
      [x + 9, y - 25 + dip * 12],
      [x + 15, y - 24 + dip * 19]
    ],
    'paper',
    3.4
  );
  oval(H, R, x + 15, y - 25 + dip * 19, 4, 3.5, 'paper', 1);
  H.line(
    R,
    [
      [x + 18, y - 25 + dip * 19],
      [x + 27, y - 24 + dip * 22]
    ],
    'blue',
    1.1
  );
  H.dot(x + 16, y - 26 + dip * 19, 0.8, 'blue');
}

const room = world(
  'new-york-jamaica-bay',
  'Jamaica Bay · A Quiet Opening',
  { floor: 'paper', tone: 1, wall: false, head: 100 },
  (H, R) => {
    surface(H, R, H.tile(0, 0, 12, 4.15, 0.025), 'teal', 0.36);
    surface(H, R, H.faceI(0.08, 0.09, 11.83, 0.08, 2.69), 'sun', 0.12);
    const bank = [
      [0.07, 0.11],
      [11.91, 0.11],
      [11.91, 0.91],
      [10.56, 1.14],
      [8.98, 0.79],
      [7.41, 1.02],
      [5.61, 0.69],
      [3.58, 1.06],
      [1.31, 0.71],
      [0.07, 1.12]
    ].map(([i, j]) => H.p(i, j, 0.08));
    surface(H, R, bank, 'teal', 0.48);
    for (const [i, j, h] of [
      [0.42, 1.33, 38],
      [1.27, 2.77, 34],
      [2.0, 0.68, 29],
      [10.56, 0.72, 25],
      [11.26, 2.54, 33]
    ])
      reeds(H, R, i, j, h, 'teal');
    for (let n = 0; n < 20; n++) {
      const i = 0.21 + (n % 7) * 1.64,
        j = 0.36 + Math.floor(n / 7) * 1.2;
      H.line(R, [H.p(i, j, 0.055), H.p(i + 0.67, j, 0.055)], 'paper', 0.75);
    }
    timber(H, R, 0.05, 4.13, 11.9, 7.81, 0.06, 0.06, 'teal');
    boardFloor(H, R, 0.06, 4.14, 11.88, 7.74, 0.125, 'sun', 0.42);
    for (const i of [0.1, 3.91, 7.72, 11.53]) timber(H, R, i, 4.02, 0.24, 0.34, 0.09, 3.52, 'teal');
    for (let n = 0; n < 23; n++) {
      timber(H, R, 0.12 + n * 0.51, 4.08, 0.48, 0.15, 0.13, 1.22, 'sun');
      timber(H, R, 0.12 + n * 0.51, 4.08, 0.48, 0.15, 2.58, 1.04, 'sun');
    }
    const slit = H.faceI(0.22, 4.22, 11.39, 1.4, 2.51);
    surface(H, R, slit, 'paper', 1);
    H.clip(slit, () => {
      surface(H, R, H.faceI(0.22, 4.23, 11.39, 1.4, 1.89), 'teal', 0.3);
      for (let n = 0; n < 16; n++) H.line(R, [H.p(0.43 + n * 0.69, 4.24, 1.58), H.p(0.83 + n * 0.69, 4.24, 1.58)], 'paper', 0.85);
    });
    for (const z of [1.32, 2.55]) timber(H, R, 0.15, 4.17, 11.52, 0.37, z, 0.08, 'teal');
    for (const i of [0.14, 3.97, 7.8, 11.61]) {
      timber(H, R, i, 4.04, 0.15, 4.64, 3.62, 0.18, 'sun');
      bentTube(
        H,
        R,
        [
          [i, 4.27, 3.03],
          [i, 5.07, 3.65]
        ],
        2.4,
        'teal'
      );
    }
    for (let n = 0; n < 7; n++) timber(H, R, 0.06, 4.06 + n * 0.18, 11.82, 0.14, 3.85, 0.07, 'paper');
    for (const j of [4.38, 7.83]) timber(H, R, 0.17, j, 0.18, 0.18, 0.12, 3.46, 'sun');
    benchFrame(H, R, 0.56, 4.52, 10.84, 0.67, 1.28, 'sun');
    for (let n = 0; n < 5; n++) surface(H, R, H.tile(0.91 + n * 2.12, 4.69, 1.29, 0.3, 1.31), 'paper', 1, 0.4);
    slattedSeat(H, R, 4.59, 5.85, 3.32, 0.12, 'sun', 0.51);
    cabinetFrame(H, R, 0.44, 7.37, 1.53, 3.57, 0.14, 1.67, 1, 'teal', (i, j, w, d, z, h) => {
      for (let row = 0; row < 3; row++) {
        timber(H, R, i, j, w, d, z + row * 0.48, 0.08, 'sun');
        for (let n = 0; n < 4; n++) boundBook(H, R, i + 0.1, j + 0.1 + n * 0.74, w - 0.2, 0.61, z + 0.11 + row * 0.48, row === 1 ? 'coral' : 'paper');
      }
    });
    benchFrame(H, R, 2.56, 9.03, 2.44, 1.65, 0.93, 'sun');
    boundBook(H, R, 2.75, 9.23, 1.34, 1.01, 0.97, 'paper');
    handTool(H, R, 4.53, 9.86, 0.97, 'pencil', 'coral');
    const [x, y] = H.p(10.52, 6.28, 0.13);
    for (const dx of [-19, 0, 19])
      H.line(
        R,
        [
          [x, y - 54],
          [x + dx, y]
        ],
        'teal',
        2
      );
    surface(
      H,
      R,
      [
        [x - 22, y - 69],
        [x + 21, y - 63],
        [x + 21, y - 55],
        [x - 22, y - 60]
      ],
      'teal',
      0.71
    );
    surface(H, R, ell(x + 21, y - 59, 4, 5), 'paper', 1);
    slattedCrate(H, R, 8.47, 9.54, 2.62, 1.53, 0.14, 0.67, 'sun');
    foldedCloth(H, R, 8.67, 9.74, 1.29, 0.94, 0.86, 'coral', 'paper');
    satchel(H, R, 10.35, 10.32, 0.83, 'teal', 0.75);
    vessel(H, R, 7.14, 10.76, 0.14, 6, 18, 'sun');
  },
  (H, R, t) => {
    const u = cycle(t, 20);
    const dip = u > 0.37 && u < 0.68 ? Math.sin(((u - 0.37) / 0.31) * Math.PI) ** 2 : 0;
    H.clip(H.faceI(0.22, 4.22, 11.39, 1.4, 2.51), () => shorebird(H, R, ...H.p(9.8, 1.35, 0.08), dip));
    actor(
      H,
      R,
      5.88,
      6.29,
      t,
      'newYorkBinoculars',
      {
        shirt: ['coral', 0.58],
        pants: ['blue', 0.65],
        hairStyle: 'cap',
        glasses: true,
        face: 'ne',
        prop(HH, RR, points) {
          const [x, y] = points.nearHand;
          const [hx, hy] = points.head;
          stroke(
            HH,
            RR,
            [
              [hx - 4, hy + 8],
              [x - 9, y + 15],
              [x + 6, y + 7]
            ],
            'blue',
            0.8,
            0.68
          );
          for (const dx of [-4, 5]) {
            shape(
              HH,
              RR,
              [
                [x + dx - 4, y - 2],
                [x + dx - 2, y - 13],
                [x + dx + 4, y - 13],
                [x + dx + 5, y - 2]
              ],
              'blue',
              0.84,
              0.65
            );
            oval(HH, RR, x + dx + 1, y - 13, 3, 2, 'teal', 0.6);
          }
          HH.line(
            RR,
            [
              [x - 1, y - 6],
              [x + 8, y - 6]
            ],
            'blue',
            2
          );
        }
      },
      0.12,
      1.22
    );
    for (let n = 0; n < 3; n++) {
      const p = cycle(t + n * 6, 20);
      H.opacity(Math.sin(p * Math.PI) * 0.35, () => H.outline(R, ell(...H.p(4.2 + n * 1.13, 2.73, 0.075), 7 + p * 20, 2 + p * 5), 'paper', 0.8));
    }
    const sway = Math.sin(u * TAU) * 3;
    for (let n = 0; n < 4; n++) {
      const [x, y] = H.p(11.33 + n * 0.1, 3.25 + n * 0.12, 0.05);
      stroke(
        H,
        R,
        [
          [x, y],
          [x + sway, y - 13],
          [x + sway * 1.4 - 3 + n * 2, y - 27]
        ],
        'teal',
        1.2,
        0.63
      );
    }
  }
);
room.loopSeconds = 20;
export default room;
