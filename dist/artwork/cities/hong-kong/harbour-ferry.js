import { surface, timber, metal, vessel, bentTube, pendant, slattedSeat, benchFrame, drape } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';

import { foldedCloth, coiledLine, shallowTray, handTool, boundBook } from '../furnishings.js';
import { TAU, actor, box, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const watch = { ...rest, al: 46, ar: 53, el: 66, er: 62, head: -8 };
FIGURES.clips.hongKongFerryLook = {
  dur: 16,
  keys: [
    [0, watch],
    [0.16, watch],
    [0.3, { ...watch, al: 109, ar: 115, el: 60, er: 66, head: -14 }],
    [0.62, { ...watch, al: 109, ar: 115, el: 60, er: 66, head: -20, lean: 3 }],
    [0.77, watch],
    [1, watch]
  ]
};
const seated = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, al: 28, ar: 32, el: 28, er: 38 };
FIGURES.clips.hongKongFerrySit = {
  dur: 16,
  keys: [
    [0, seated],
    [0.3, { ...seated, head: -12 }],
    [0.62, { ...seated, head: -12, al: 33 }],
    [0.84, seated],
    [1, seated]
  ]
};

function seat(H, R, i, j, width = 4.9) {
  slattedSeat(H, R, i, j, width, 0, 'sun', 0.81);
  for (const x of [i + 0.22, i + width - 0.24]) {
    metal(H, R, x - 0.19, j + 0.15, 0.38, 0.72, 0.025, 0.06, 'teal');
    for (const y of [j + 0.23, j + 0.78]) H.dot(...H.p(x, y, 0.096), 1.5, 'sun');
  }
  for (let n = 0; n < 3; n++) metal(H, R, i + 0.42 + (n * (width - 0.84)) / 2, j + 0.17, 0.1, 0.1, 0.73, 0.68, 'teal');
}

function lifering(H, R, i, j, z) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y, 19, 21, 'paper', 1);
  oval(H, R, x, y, 11, 12, 'teal', 0.46);
  for (const a of [0.2, 1.77, 3.34, 4.91]) {
    const outer = [],
      inner = [];
    for (let q = 0; q < 6; q++) {
      const angle = a + q * 0.08;
      outer.push([x + Math.cos(angle) * 19, y + Math.sin(angle) * 21]);
      inner.unshift([x + Math.cos(angle) * 11, y + Math.sin(angle) * 12]);
    }
    shape(H, R, outer.concat(inner), 'coral', 0.75, 0.5);
  }
  H.outline(R, ell(x, y, 22, 24), 'sun', 1.2, { tone: 0.75, amp: 0.15 });
}

function luggage(H, R, i, j) {
  box(H, R, i, j, 0.72, 0.5, 0.07, 0.95, 'coral', 0.6);
  H.line(
    R,
    [H.p(i + 0.14, j + 0.28, 1.03), H.p(i + 0.14, j + 0.28, 1.45), H.p(i + 0.58, j + 0.28, 1.45), H.p(i + 0.58, j + 0.28, 1.03)],
    'blue',
    1.5
  );
  for (const a of [i + 0.12, i + 0.58]) oval(H, R, ...H.p(a, j + 0.45, 0.06), 2.8, 3.5, 'blue', 0.9);
  H.line(R, [H.p(i + 0.34, j + 0.51, 0.18), H.p(i + 0.34, j + 0.51, 0.86)], 'paper', 1.3);
  H.dot(...H.p(i + 0.56, j + 0.51, 0.7), 2, 'sun', 0.9);
}

const room = world(
  'hong-kong-harbour-ferry',
  'Victoria Harbour · Across the working water',
  { floor: 'teal', tone: 0.14, wall: false, head: 55 },
  (H, R) => {
    boardFloor(H, R, 0.04, 0.04, 11.92, 11.92, 0.025, 'teal', 0.4);
    const P = (u, z) => H.p(u, 0.07, z);
    surface(H, R, H.faceI(0.05, 0.06, 11.9, 0.59, 3.51), 'paper', 1);
    surface(H, R, H.faceI(0.1, 0.08, 11.8, 0.61, 1.47), 'teal', 0.35);
    for (let n = 0; n < 15; n++) {
      const i = 0.15 + n * 0.78,
        h = 0.14 + (n % 4) * 0.11;
      surface(H, R, H.faceI(i, 0.08, 0.6, 1.45, 1.45 + h), 'blue', 0.2, 0.35);
    }
    for (const i of [0.12, 3.86, 7.77, 11.66]) metal(H, R, i, 0.14, 0.2, 0.27, 0.02, 4.05, 'paper');
    for (const z of [0.58, 3.58]) timber(H, R, 0.11, 0.13, 11.68, 0.24, z, 0.14, 'teal');
    for (const j of [0.48, 4.01, 7.91, 11.56]) metal(H, R, 0.1, j, 0.2, 0.2, 0.02, 3.98, 'paper');
    surface(H, R, H.faceJ(0.14, 0.4, 11.22, 0.04, 0.73), 'teal', 0.72);
    for (const z of [0.76, 2.02, 3.68])
      bentTube(
        H,
        R,
        [
          [0.2, 0.52, z],
          [0.2, 11.66, z]
        ],
        2,
        'teal'
      );
    for (const j of [1.12, 4.55, 8.14]) {
      const arch = [];
      for (let n = 0; n <= 18; n++) {
        const f = n / 18;
        arch.push([0.2 + 11.45 * f, j, 3.62 + Math.sin(f * Math.PI) * 0.44]);
      }
      bentTube(H, R, arch, 3, 'paper');
      for (const i of [0.24, 11.55])
        bentTube(
          H,
          R,
          [
            [i, j, 3.09],
            [i + (i < 1 ? 0.66 : -0.66), j, 3.81]
          ],
          2,
          'teal'
        );
    }
    for (const j of [1.1, 4.52, 8.14]) {
      metal(H, R, 0.29, j, 1.33, 0.17, 3.74, 0.18, 'teal');
      metal(H, R, 10.2, j, 1.41, 0.17, 3.74, 0.18, 'teal');
    }
    for (let n = 0; n < 12; n++) timber(H, R, 0.21, 0.45 + n * 0.58, 1.52, 0.52, 3.95, 0.07, 'paper');
    for (const j of [1.35, 4.83, 8.87]) {
      metal(H, R, 0.1, j, 0.47, 0.43, 0.025, 0.065, 'teal');
      for (const y of [j + 0.07, j + 0.35]) H.dot(...H.p(0.45, y, 0.1), 1.5, 'sun');
    }
    for (let n = 0; n < 8; n++) timber(H, R, 0.22 + n * 0.35, 0.35, 0.3, 1.71, 3.9, 0.08, 'paper');
    lifering(H, R, 0.35, 2.47, 2.48);
    cabinetFrame(H, R, 0.37, 9.2, 1.23, 2.11, 0.08, 1.33, 1, 'teal', (i, j, w, d, z) => {
      for (let n = 0; n < 3; n++) {
        timber(H, R, i, j, w, d, z + n * 0.34, 0.07, 'sun');
        coiledLine(H, R, i + w * 0.5, j + d * 0.45, z + 0.12 + n * 0.34, 10, 'sun');
      }
    });
    cabinetFrame(H, R, 8.59, 0.53, 2.64, 1.4, 0.09, 2.23, 2, 'teal', (i, j, w, d, z, h, n) => {
      timber(H, R, i, j, w, d, z + 0.9, 0.07, 'paper');
      for (let q = 0; q < 2; q++) {
        foldedCloth(H, R, i + 0.11, j + 0.17, w - 0.22, d - 0.3, z + 0.16 + q * 0.26, 'coral', 'sun');
      }
      vessel(H, R, i + w / 2, j + d / 2, z + 1.04, 8, 20, 'paper', false);
    });
    shallowTray(H, R, 8.85, 0.73, 1.87, 0.99, 2.36, 'sun');
    handTool(H, R, 9.22, 1.16, 2.54, 'spanner', 'teal');
    foldedCloth(H, R, 9.83, 0.89, 0.57, 0.61, 2.53, 'paper', 'coral');
    bentTube(H, R, [[11.49, 0.32, 0.3], [11.49, 0.32, 3.32], [8.01, 0.32, 3.32]], 1.5, 'teal');
    const [lx, ly] = H.p(8.01, 0.34, 3.1);
    oval(H, R, lx, ly, 10, 14, 'sun', 0.8);
    for (const dx of [-6, 0, 6]) H.line(R, [[lx + dx, ly - 12], [lx + dx, ly + 12]], 'blue', 0.9);
    for (const dy of [-7, 0, 7]) H.line(R, [[lx - 8, ly + dy], [lx + 8, ly + dy]], 'blue', 0.9);
    seat(H, R, 1.97, 5.41, 5.23);
    seat(H, R, 2.72, 8.61, 4.98);
    seat(H, R, 7.43, 3.21, 3.68);
    for (const [i, j] of [
      [2.15, 9.32],
      [8.71, 3.36]
    ])
      luggage(H, R, i, j);
    benchFrame(H, R, 7.85, 10.69, 3.61, 0.83, 0.35, 'teal');
    luggage(H, R, 10.59, 10.87);
    boundBook(H, R, 8.06, 10.8, 0.92, 0.52, 0.38, 'coral');
    for (let n = 0; n < 10; n++) {
      metal(H, R, 0.4 + n * 0.71, 11.7, 0.52, 0.17, 0.026, 0.025, 'blue');
    }
    drape(H, R, 6.4, 8.63, 0.73, 0.6, 1.52, 0.83, 'coral');
    bentTube(H, R, [[7.25, 8.9, 0.03], [7.25, 8.9, 1.2], [7.06, 8.9, 1.35], [6.94, 8.9, 1.25]], 2, 'sun');
    metal(H, R, 9.72, 8.96, 1.36, 1.7, 0.06, 0.13, 'teal');
    for (const x of [9.79, 10.98])
      bentTube(
        H,
        R,
        [
          [x, 9.03, 0.14],
          [x, 9.03, 1.72],
          [x, 10.47, 1.72],
          [x, 10.47, 0.14]
        ],
        1.6,
        'teal'
      );
    for (const z of [0.76, 1.69]) metal(H, R, 9.74, 9.01, 1.32, 1.47, z, 0.07, 'sun');
    foldedCloth(H, R, 9.91, 9.31, 0.76, 0.73, 1.79, 'paper', 'coral');
    vessel(H, R, 8.52, 10.68, 0.04, 10, 20, 'teal');
    for (const [i, j] of [
      [2.1, 4.38],
      [6.54, 4.38],
      [7.73, 7.7]
    ]) {
      metal(H, R, i, j, 0.14, 0.14, 0.02, 2.58, 'sun');
      surface(H, R, ell(...H.p(i + 0.07, j + 0.07, 2.63), 4, 4), 'sun', 0.8);
    }
    pendant(H, R, 6.21, 2.21, 4.09, 3.18, 'teal', 0.85);
  },
  (H, R, t) => {
    const u = cycle(t, 16);
    H.clip(H.faceI(0.2, 0.11, 11.55, 0.63, 1.48), () => {
      for (let q = 0; q < 11; q++) {
        const i = 0.35 + q * 1.07 + Math.sin(TAU * u + q) * 0.18,
          z = 0.73 + (q % 3) * 0.21;
        H.line(R, [H.p(i, 0.12, z), H.p(i + 0.56, 0.12, z)], 'paper', 1.4, { tone: 0.65, amp: 0.15 });
      }
      for (let q = 0; q < 4; q++) {
        const i = 1.4 + q * 2.64 + Math.sin(TAU * u) * 0.19;
        H.line(R, [H.p(i, 0.13, 0.97), H.p(i + 0.77, 0.13, 1.03)], 'teal', 0.8, { tone: 0.42 });
      }
    });
    H.at(5.52, 1.43, 0, (HH) =>
      actor(
        HH,
        R,
        5.52,
        1.43,
        t,
        'hongKongFerryLook',
        {
          shirt: ['coral', 0.67],
          hairStyle: 'short',
          face: 'nw',
          prop(h, r, p) {
            const [x, y] = p.nearHand;
            stroke(
              h,
              r,
              [
                [x - 6, y + 1],
                [p.chest[0] + 2, p.chest[1] + 15],
                [x + 8, y + 3]
              ],
              'blue',
              0.7,
              0.7
            );
            for (const a of [-6, 5]) {
              shape(
                h,
                r,
                [
                  [x + a - 3, y + 4],
                  [x + a + 4, y + 5],
                  [x + a + 5, y - 8],
                  [x + a - 3, y - 9]
                ],
                'blue',
                0.8,
                0.6
              );
              oval(h, r, x + a + 1, y - 8, 4, 2.3, 'teal', 0.7);
            }
            h.line(
              r,
              [
                [x - 3, y - 1],
                [x + 5, y]
              ],
              'sun',
              2
            );
          }
        },
        0,
        1.35
      )
    );
    H.at(3.15, 5.92, 0, (HH) => actor(HH, R, 3.15, 5.92, t, 'hongKongFerrySit', { shirt: ['paper', 1], hairStyle: 'short', face: 'se' }, 0.05, 1.27));
    H.at(5.13, 5.95, 0, (HH) =>
      actor(HH, R, 5.13, 5.95, t, 'hongKongFerrySit', { shirt: ['sun', 0.7], hairStyle: 'pony', face: 'se' }, 0.25, 1.15, 'child')
    );
    H.at(4.55, 9.13, 0, (HH) =>
      actor(
        HH,
        R,
        4.55,
        9.13,
        t,
        'hongKongFerrySit',
        {
          shirt: ['teal', 0.63],
          hairStyle: 'curly',
          face: 'se',
          prop(h, r, p) {
            const [x, y] = p.nearHand;
            shape(
              h,
              r,
              [
                [x - 14, y - 5],
                [x, y - 8],
                [x + 13, y - 3],
                [x + 12, y + 12],
                [x - 1, y + 8],
                [x - 14, y + 10]
              ],
              'paper',
              1,
              0.65
            );
            h.line(
              r,
              [
                [x, y - 7],
                [x - 1, y + 8]
              ],
              'teal',
              0.9
            );
            for (let q = 0; q < 4; q++)
              h.line(
                r,
                [
                  [x - 11, y + q * 2.5],
                  [x - 4, y - 1 + q * 2.5]
                ],
                'blue',
                0.5,
                { tone: 0.6 }
              );
          }
        },
        0.05,
        1.25
      )
    );
  }
);
room.loopSeconds = 16;
room.stillTime = 0;
export default room;
