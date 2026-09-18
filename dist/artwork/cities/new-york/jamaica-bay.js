import { benchFrame, bentTube, slattedSeat, surface, timber, vessel } from '../materials.js';
import { boardFloor } from '../structure.js';

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
    const horizon = (z, rise, ink, tone) => {
      const pts = [H.p(0.09, 0.11, z - 0.35), H.p(11.88, 0.11, z - 0.35)];
      for (let n = 24; n >= 0; n--) pts.push(H.p(0.09 + n * 0.491, 0.11, z + Math.sin(n * 0.74) * rise + Math.cos(n * 1.61) * rise * 0.35));
      surface(H, R, pts, ink, tone, 0.35);
    };
    horizon(2.1, 0.06, 'teal', 0.24);
    horizon(1.65, 0.13, 'teal', 0.37);
    horizon(0.82, 0.09, 'sun', 0.42);
    for (let n = 0; n < 11; n++) {
      const i = 0.36 + n * 1.04;
      const [x, y] = H.p(i, 0.12, 1.68 + Math.sin(n * 0.75) * 0.1);
      stroke(H, R, [[x - 7, y], [x - 4, y - 12], [x - 1, y - 18]], 'teal', 1, 0.5);
      stroke(H, R, [[x, y], [x + 4, y - 21], [x + 7, y - 26]], 'teal', 1.2, 0.5);
      H.line(R, [[x + 2, y - 8], [x + 11, y - 16]], 'sun', 0.8);
    }
    for (const [i, z] of [[2.7, 2.4], [3.28, 2.34], [7.64, 2.47]]) {
      const [x, y] = H.p(i, 0.13, z);
      H.line(R, [[x - 7, y - 3], [x - 3, y - 5], [x, y], [x + 4, y - 4], [x + 8, y - 3]], 'blue', 0.8, { tone: 0.7 });
    }
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
      surface(H, R, [H.p(0.22, 4.24, 2.28), H.p(2.7, 4.24, 2.23), H.p(4.7, 4.24, 2.31), H.p(7.3, 4.24, 2.2), H.p(11.61, 4.24, 2.28), H.p(11.61, 4.24, 2.42), H.p(0.22, 4.24, 2.42)], 'teal', 0.3);
      surface(H, R, [H.p(0.22, 4.25, 1.41), H.p(0.22, 4.25, 1.7), H.p(2.3, 4.25, 1.92), H.p(4.56, 4.25, 1.7), H.p(6.45, 4.25, 1.83), H.p(8.41, 4.25, 1.49)], 'sun', 0.39);
      for (const i of [0.65, 1.07, 2.28, 3.41, 6.67, 7.07, 11.17]) {
        const [x, y] = H.p(i, 4.26, 1.63);
        for (let n = 0; n < 4; n++) stroke(H, R, [[x + n * 3, y], [x + n * 2 - 1, y - 12], [x + n * 4 - 4, y - 23 - n % 2 * 7]], 'teal', 1, 0.68);
      }
      for (const [i, z, w] of [[3.0, 2.07, 1.7], [5.2, 1.97, 1.25], [8.37, 1.74, 0.69], [10.33, 1.47, 0.75]]) H.line(R, [H.p(i, 4.26, z), H.p(i + w, 4.26, z)], 'paper', 1.1);
      const [bx, by] = H.p(4.56, 4.26, 1.82);
      oval(H, R, bx, by - 3, 5, 3, 'blue', 0.62);
      H.line(R, [[bx + 3, by - 3], [bx + 6, by - 9], [bx + 10, by - 8]], 'blue', 1.3);
      H.line(R, [[bx - 2, by], [bx - 2, by + 7], [bx + 2, by + 7]], 'blue', 0.7);
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
    for (const i of [0.22, 4.02, 7.83, 11.62]) {
      timber(H, R, i, 4.3, 0.13, 0.24, 1.36, 1.2, 'teal');
      for (const z of [1.52, 2.37]) {
        const [x, y] = H.p(i + 0.02, 4.56, z);
        surface(H, R, [[x - 4, y - 4], [x + 4, y - 4], [x + 4, y + 4], [x - 4, y + 4]], 'sun', 0.7);
        H.line(R, [[x - 2, y], [x + 2, y]], 'blue', 1);
      }
    }
    for (const i of [1.13, 5.07, 8.96]) {
      surface(H, R, [H.p(i, 4.42, 2.65), H.p(i + 2.35, 4.42, 2.65), H.p(i + 2.35, 5.07, 3.11), H.p(i, 5.07, 3.11)], 'teal', 0.63);
      for (const d of [0.21, 2.11]) bentTube(H, R, [[i + d, 4.43, 2.38], [i + d, 4.99, 3.04]], 1.5, 'sun');
      H.line(R, [H.p(i + 0.12, 4.59, 2.78), H.p(i + 2.21, 4.59, 2.78)], 'paper', 0.8);
    }
    for (let n = 0; n < 7; n++) timber(H, R, 0.17, 4.4 + n * 0.48, 0.14, 0.44, 0.15, 2.56, 'teal');
    bentTube(H, R, [[0.35, 4.55, 0.51], [0.35, 7.59, 2.51]], 3, 'sun');
    surface(H, R, H.faceJ(0.38, 5.49, 1.7, 1.24, 2.41), 'sun', 0.6);
    surface(H, R, H.faceJ(0.4, 5.61, 1.46, 1.36, 2.29), 'paper', 1);
    for (let n = 0; n < 3; n++) {
      const [x, y] = H.p(0.43, 5.85 + n * 0.44, 1.92);
      surface(H, R, ell(x, y, 6, 3), n === 1 ? 'coral' : 'teal', 0.5);
      H.line(R, [[x + 4, y], [x + 8, y - 4], [x + 12, y - 3]], 'blue', 1);
    }
    benchFrame(H, R, 0.56, 4.52, 10.84, 0.67, 1.28, 'sun');
    for (let n = 0; n < 5; n++) surface(H, R, H.tile(0.91 + n * 2.12, 4.69, 1.29, 0.3, 1.31), 'paper', 1, 0.4);
    for (const i of [2.43, 6.12, 9.17]) {
      const [x, y] = H.p(i, 4.53, 2.42);
      H.line(R, [[x - 5, y], [x + 5, y], [x + 5, y + 4]], 'blue', 1.7);
      H.line(R, [[x + 2, y + 4], [x + 2, y + 11]], 'sun', 1.4);
    }
    H.tint([H.p(4.52, 4.65, 0.14), H.p(7.43, 4.65, 0.14), H.p(8.81, 7.75, 0.14), H.p(5.45, 7.3, 0.14)], 'sun', 0.15, { fine: true });
    slattedSeat(H, R, 4.59, 5.85, 3.32, 0.12, 'sun', 0.51);
    benchFrame(H, R, 0.5, 7.5, 1.48, 3.05, 0.86, 'teal');
    timber(H, R, 0.54, 7.54, 0.12, 2.97, 0.91, 0.28, 'sun');
    for (const j of [7.55, 10.38]) timber(H, R, 0.55, j, 1.43, 0.14, 0.89, 0.25, 'sun');
    boundBook(H, R, 0.74, 7.87, 1.06, 0.81, 0.92, 'coral');
    boundBook(H, R, 0.79, 7.9, 0.95, 0.73, 1.06, 'paper');
    const caseP = (a, b, z) => H.p(0.73 + a, 9.13 + b, z);
    surface(H, R, [caseP(0, 0, 0.94), caseP(1.02, 0, 0.94), caseP(1.02, 0.95, 0.94), caseP(0, 0.95, 0.94)], 'blue', 0.71);
    surface(H, R, [caseP(0, 0, 0.96), caseP(0, 0, 1.61), caseP(1.02, 0, 1.61), caseP(1.02, 0, 0.96)], 'teal', 0.64);
    for (const j of [9.35, 9.81]) {
      const [x, y] = H.p(1.31, j, 1.08);
      surface(H, R, ell(x, y, 10, 5), 'teal', 0.67);
      surface(H, R, ell(x, y - 3, 7, 3), 'blue', 0.81);
      H.line(R, [[x - 4, y - 4], [x + 2, y - 4]], 'paper', 1);
    }
    foldedCloth(H, R, 0.66, 10.05, 1.03, 0.31, 1.0, 'paper', 'sun');
    bentTube(H, R, [[0.67, 7.68, 0.43], [1.83, 7.68, 0.43], [1.83, 10.34, 0.43]], 1.6, 'teal');
    timber(H, R, 2.68, 9.14, 2.14, 1.35, 0.42, 0.07, 'teal');
    satchel(H, R, 3.16, 9.8, 0.51, 'sun', 0.67);
    for (const i of [2.73, 4.66]) for (const j of [9.19, 10.36]) {
      const [cx, cy] = H.p(i, j, 0.12);
      surface(H, R, ell(cx, cy, 4, 5), 'blue', 0.68);
      H.dot(cx, cy, 1.4, 'sun');
    }
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
    surface(H, R, ell(x + 21, y - 59, 2.6, 3.5), 'blue', 0.68);
    H.line(R, [[x - 11, y - 65], [x - 11, y - 58]], 'sun', 3);
    H.line(R, [[x - 3, y - 54], [x + 6, y - 50], [x + 12, y - 45]], 'blue', 1.5);
    H.dot(x - 6, y - 54, 3, 'sun');
    H.line(R, [[x - 12, y - 19], [x + 12, y - 19], [x, y - 36]], 'sun', 1);
    for (const dx of [-19, 0, 19]) surface(H, R, ell(x + dx, y, 3.5, 1.5), 'blue', 0.7);
    surface(H, R, H.tile(2.73, 9.2, 1.36, 1.02, 1.1), 'paper', 1);
    H.line(R, [H.p(3.42, 9.24, 1.12), H.p(3.42, 10.18, 1.12)], 'teal', 0.75);
    for (let n = 0; n < 4; n++) H.line(R, [H.p(3.56, 9.4 + n * 0.16, 1.12), H.p(3.91, 9.4 + n * 0.16, 1.12)], 'blue', 0.65);
    foldedCloth(H, R, 4.25, 9.29, 0.53, 0.61, 0.98, 'teal', 'paper');
    surface(H, R, H.tile(6.07, 10.25, 1.3, 0.95, 0.15), 'teal', 0.57);
    for (const i of [6.37, 6.91]) {
      const [bx, by] = H.p(i, 10.72, 0.17);
      surface(H, R, ell(bx, by, 8, 12), 'sun', 0.53);
      for (let n = 0; n < 4; n++) H.line(R, [[bx - 5, by - 6 + n * 4], [bx + 5, by - 6 + n * 4]], 'blue', 1);
    }
    bentTube(H, R, [[8.19, 8.36, 0.16], [8.25, 8.16, 1.82], [8.46, 8.16, 1.94], [8.63, 8.16, 1.86]], 2.2, 'sun');
    slattedCrate(H, R, 8.47, 9.54, 2.62, 1.53, 0.14, 0.67, 'sun');
    foldedCloth(H, R, 8.67, 9.74, 1.29, 0.94, 0.86, 'coral', 'paper');
    satchel(H, R, 10.35, 10.32, 0.83, 'teal', 0.75);
    vessel(H, R, 7.14, 10.76, 0.14, 6, 18, 'sun');
  },
  (H, R, t) => {
    const u = cycle(t, 20);
    const dip = u > 0.37 && u < 0.68 ? Math.sin(((u - 0.37) / 0.31) * Math.PI) ** 2 : 0;
    H.clip(H.faceI(0.22, 4.22, 11.39, 1.4, 2.51), () => shorebird(H, R, ...H.p(9.8, 4.23, 1.62), dip));
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
room.stillTime = 8;
export default room;
