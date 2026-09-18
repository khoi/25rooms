import { benchFrame, bentTube, branchSpray, cushion, metal, slattedSeat, surface, timber, vessel } from '../materials.js';
import { masonry, archedBay } from '../structure.js';

import { slattedCrate, foldedCloth, handTool, shallowTray } from '../furnishings.js';
import { TAU, actor, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const ready = { ...rest, lean: -4, al: 16, ar: 50, er: 38, head: 10 };
FIGURES.clips.newYorkStoopWater = {
  dur: 16,
  keys: [
    [0, ready],
    [0.13, ready],
    [0.26, { ...ready, lean: -11, ar: 71, er: 12, head: 18 }],
    [0.58, { ...ready, lean: -11, ar: 71, er: 12, head: 18 }],
    [0.74, ready],
    [0.87, { ...ready, head: -8 }],
    [1, ready]
  ]
};
FIGURES.clips.newYorkStoopNeighbor = {
  dur: 16,
  keys: [
    [0, { ...rest, head: -10, al: 19, ar: 16, er: 13 }],
    [0.48, { ...rest, head: -14, al: 19, ar: 16, er: 13 }],
    [0.67, { ...rest, head: -14, al: 19, ar: 32, er: 22 }],
    [0.82, { ...rest, head: -10, al: 19, ar: 16, er: 13 }],
    [1, { ...rest, head: -10, al: 19, ar: 16, er: 13 }]
  ]
};

function pot(H, R, i, j, z, size = 15, ink = 'coral', herbs = false) {
  const [x, y] = H.p(i, j, z);
  shape(
    H,
    R,
    [
      [x - size * 0.84, y - 20],
      [x + size * 0.84, y - 20],
      [x + size * 0.63, y],
      [x - size * 0.63, y]
    ],
    ink,
    0.65,
    0.8
  );
  oval(H, R, x, y - 20, size, 5, ink, 0.76);
  oval(H, R, x, y - 21, size * 0.79, 3.6, 'blue', 0.54);
  if (herbs)
    for (let k = 0; k < 7; k++) {
      const dx = (k - 3) * 4,
        top = y - 29 - ((k * 7) % 17);
      H.line(
        R,
        [
          [x + dx * 0.3, y - 21],
          [x + dx, top]
        ],
        'blue',
        0.8
      );
      oval(H, R, x + dx - 3, top + 4, 4.5, 2.5, 'teal', 0.76);
      oval(H, R, x + dx + 2, top, 4, 2.8, 'teal', 0.7);
    }
  else
    for (let k = 0; k < 6; k++) {
      const dx = (k - 2.5) * 7,
        top = y - 37 - Math.sin((k / 5) * Math.PI) * 17;
      stroke(
        H,
        R,
        [
          [x, y - 20],
          [x + dx * 0.4, top - 1],
          [x + dx, top + 8]
        ],
        'teal',
        1.3
      );
      for (let q = 0; q < 4; q++) {
        const px = x + (dx * q) / 4,
          py = y - 22 + ((top - y + 27) * q) / 4;
        H.line(
          R,
          [
            [px - 6, py - 1],
            [px, py + 2],
            [px + 6, py - 2]
          ],
          'teal',
          2.5,
          { tone: 0.72 }
        );
      }
    }
  oval(H, R, x + 1, y + 1, size * 0.8, 3, 'sun', 0.43);
}

const room = world(
  'new-york-bed-stuy-stoop',
  'Bedford-Stuyvesant · The Extra Step',
  { floor: 'paper', tone: 1, wall: false, head: 125 },
  (H, R) => {
    for (let r = 0; r < 8; r++)
      for (let c = 0; c < 7; c++) surface(H, R, H.tile(c * 1.71, r * 1.5, 1.66, 1.45, 0.025), 'sun', (r + c) % 4 ? 0.09 : 0.18, 0.5);
    masonry(H, R, 'ne', 0.08, 11.83, 0, 5.54, 'coral', 0.48);
    masonry(H, R, 'nw', 0.1, 5.18, 0, 4.82, 'coral', 0.38);
    surface(H, R, H.faceJ(0.22, 1.14, 2.62, 1.02, 3.81), 'blue', 0.76);
    for (const j of [1.04, 3.74]) timber(H, R, 0.22, j, 0.39, 0.19, 0.98, 2.89, 'sun');
    timber(H, R, 0.19, 0.99, 0.47, 2.98, 3.82, 0.16, 'sun');
    surface(H, R, H.faceJ(0.43, 1.29, 2.3, 1.18, 3.63), 'teal', 0.52);
    for (const j of [1.43, 2.58]) surface(H, R, H.faceJ(0.45, j, 0.84, 1.45, 2.29), 'blue', 0.26);
    for (const z of [2.59, 3.09]) H.line(R, [H.p(0.46, 1.42, z), H.p(0.46, 3.39, z)], 'sun', 1.4);
    H.dot(...H.p(0.51, 3.23, 2.42), 2.7, 'sun');
    for (const z of [0.1, 1.03, 4.95, 5.32]) timber(H, R, 0.11, 0.17, 11.75, 0.33, z, 0.13, 'sun');
    archedBay(H, R, 'ne', 6.44, 3.59, 1.9, 2.5, 'teal', (P) => {
      surface(H, R, [P(0.13, 0.1), P(3.46, 0.1), P(3.46, 2.2), P(0.13, 2.2)], 'blue', 0.35);
      for (let n = 0; n < 5; n++) H.line(R, [P(0.33 + n * 0.69, 0.17), P(0.33 + n * 0.69, 2.3)], 'sun', 1.2);
    });
    for (const i of [0.52, 10.93]) {
      timber(H, R, i, 0.24, 0.48, 0.39, 1.15, 3.71, 'coral');
      for (const z of [1.2, 4.54, 4.77]) timber(H, R, i - 0.12, 0.2, 0.72, 0.58, z, 0.13, 'sun');
    }
    for (let n = 0; n < 12; n++) {
      timber(H, R, 0.46 + n * 0.95, 0.22, 0.33, 0.54, 5.08, 0.19, 'coral');
    }
    bentTube(H, R, [[11.62, 0.36, 4.93], [11.62, 0.36, 0.62], [11.62, 0.87, 0.11]], 4.5, 'teal');
    for (const z of [0.83, 2.13, 3.53, 4.65]) metal(H, R, 11.49, 0.3, 0.26, 0.19, z, 0.12, 'blue');
    surface(H, R, H.faceI(0.49, 0.3, 1.22, 0.3, 1.46), 'blue', 0.85);
    timber(H, R, 0.38, 0.2, 1.47, 0.45, 1.45, 0.13, 'sun');
    for (let n = 0; n < 5; n++) metal(H, R, 0.57 + n * 0.24, 0.51, 0.04, 0.05, 0.36, 1.01, 'teal');
    metal(H, R, 0.52, 0.51, 1.17, 0.05, 0.81, 0.05, 'teal');
    metal(H, R, 6.22, 0.39, 0.38, 0.12, 2.81, 0.69, 'paper');
    for (let n = 0; n < 3; n++) H.dot(...H.p(6.41, 0.53, 2.95 + n * 0.18), 2.1, n === 1 ? 'coral' : 'blue');
    const door = [H.p(2.52, 0.29, 2.26), H.p(5.77, 0.29, 2.26), H.p(5.77, 0.29, 4.24)];
    for (let n = 0; n <= 24; n++) door.push(H.p(4.145 + Math.cos((n * Math.PI) / 24) * 1.625, 0.29, 4.24 + Math.sin((n * Math.PI) / 24) * 0.6));
    surface(H, R, door, 'blue', 0.77, 2.3);
    for (const i of [2.71, 4.2]) {
      timber(H, R, i, 0.36, 1.35, 0.17, 2.3, 1.93, 'teal');
      for (const z of [2.45, 3.25]) surface(H, R, H.faceI(i + 0.15, 0.55, 1.03, z, z + 0.6), 'teal', 0.35);
      metal(H, R, i + 0.93, 0.6, 0.1, 0.11, 3.12, 0.23, 'sun');
    }
    for (const i of [2.28, 5.87]) {
      timber(H, R, i, 0.17, 0.22, 0.56, 2.16, 2.3, 'sun');
      timber(H, R, i - 0.12, 0.1, 0.48, 0.7, 4.39, 0.16, 'sun');
    }
    for (let n = 0; n < 9; n++) {
      const j = 1.0 + n * 0.83,
        z = 2.225 - n * 0.235;
      timber(H, R, 2.34, j, 3.93, 0.84, 0, z, 'coral');
      surface(H, R, H.tile(2.4, j + 0.04, 3.81, 0.76, z + 0.014), 'sun', 0.35, 0.6);
      H.line(R, [H.p(2.43, j + 0.81, z + 0.02), H.p(6.21, j + 0.81, z + 0.02)], 'paper', 1.2);
    }
    for (const i of [2.29, 6.29]) {
      const rail = [];
      for (let n = 0; n < 9; n++) {
        const j = 1.26 + n * 0.83,
          z = 2.225 - n * 0.235;
        rail.push([i, j, z + 0.98]);
        bentTube(
          H,
          R,
          [
            [i, j, z],
            [i, j, z + 0.98]
          ],
          2,
          'blue'
        );
        const [x, y] = H.p(i, j, z + 0.5);
        H.line(R, ell(x, y, 4, 8), 'teal', 0.85);
      }
      bentTube(H, R, rail, 3.2, 'blue');
    }
    for (const i of [2.29, 6.29]) {
      timber(H, R, i - 0.19, 7.92, 0.4, 0.4, 0.02, 0.88, 'coral');
      timber(H, R, i - 0.26, 7.86, 0.54, 0.53, 0.88, 0.11, 'sun');
      const [x, y] = H.p(i, 8.1, 1.1);
      oval(H, R, x, y, 5, 5, 'teal', 0.72);
    }
    surface(H, R, H.tile(3.31, 1.03, 1.89, 0.67, 2.24), 'teal', 0.6);
    for (let n = 0; n < 10; n++) H.line(R, [H.p(3.4 + n * 0.17, 1.06, 2.25), H.p(3.4 + n * 0.17, 1.64, 2.25)], 'sun', 0.9);
    pot(H, R, 3.38, 5.6, 1.05, 14, 'coral', true);
    pot(H, R, 5.72, 2.14, 1.99, 14, 'teal');
    pot(H, R, 2.78, 7.77, 0.345, 12, 'coral');
    timber(H, R, 7.02, 0.85, 3.62, 1.89, 0, 0.89, 'paper');
    for (let n = 0; n < 12; n++) metal(H, R, 7.11 + n * 0.29, 0.94, 0.045, 1.63, 0.93, 0.05, 'blue');
    for (const j of [0.95, 2.63]) for (let n = 0; n < 13; n++) metal(H, R, 6.94 + n * 0.29, j, 0.045, 0.045, 0.04, 1.11, 'blue');
    for (const j of [0.95, 2.63])
      bentTube(
        H,
        R,
        [
          [6.93, j, 1.2],
          [10.69, j, 1.2]
        ],
        2.3,
        'blue'
      );
    pot(H, R, 10.88, 3.52, 0.03, 19, 'coral', true);
    pot(H, R, 10.91, 5.14, 0.03, 14, 'teal');
    benchFrame(H, R, 0.59, 7.55, 1.12, 2.65, 0.87, 'teal');
    shallowTray(H, R, 0.69, 7.75, 0.92, 1.26, 0.91, 'sun');
    handTool(H, R, 1.09, 8.55, 0.94, 'trowel', 'coral');
    foldedCloth(H, R, 0.68, 9.33, 0.79, 0.58, 0.91, 'paper', 'teal');
    slattedCrate(H, R, 0.48, 5.54, 1.36, 1.46, 0.05, 0.54, 'sun');
    for (let n = 0; n < 3; n++) vessel(H, R, 1.1, 6.17, 0.18 + n * 0.21, 10 - n, 15, 'coral');
    timber(H, R, 0.64, 7.7, 0.92, 2.31, 0.23, 0.07, 'teal');
    vessel(H, R, 1.07, 9.06, 0.34, 9, 14, 'paper');
    bentTube(H, R, [[0.7, 10.37, 0.08], [0.4, 9.89, 1.94]], 2.5, 'sun');
    surface(H, R, [H.p(0.47, 10.2, 0.02), H.p(1.09, 10.2, 0.02), H.p(1.05, 10.2, 0.29), H.p(0.5, 10.2, 0.31)], 'sun', 0.63);
    for (let n = 0; n < 7; n++) H.line(R, [H.p(0.54 + n * 0.075, 10.22, 0.02), H.p(0.54 + n * 0.075, 10.22, 0.19)], 'blue', 0.7);
    for (const z of [0.26, 0.3]) H.line(R, [H.p(0.5, 10.23, z), H.p(1.04, 10.23, z)], 'coral', 1.1);
    for (const j of [4.27, 5.21]) {
      bentTube(H, R, [[8.09, j, 0.1], [8.79, j, 1.68], [9.03, j, 1.76]], 2, 'blue');
      oval(H, R, ...H.p(8.12, j, 0.17), 5, 5, 'teal', 0.8);
    }
    surface(H, R, H.faceI(8.31, 5.23, 0.55, 0.45, 1.33), 'coral', 0.63);
    bentTube(H, R, [[9.03, 4.27, 1.76], [9.03, 5.21, 1.76]], 2.2, 'sun');
    slattedSeat(H, R, 8.56, 6.59, 2.7, 0.03, 'sun', 0.68);
    cushion(H, R, 8.75, 6.78, 0.99, 0.57, 0.68, 0.14, 'coral');
    for (let n = 0; n < 4; n++) H.line(R, [H.p(8.32 + n * 0.56, 10.43, 0.04), H.p(8.71 + n * 0.56, 10.83, 0.04)], 'coral', 0.95);
    for (const [i, j] of [
      [0.69, 10.96],
      [10.91, 8.55]
    ]) {
      vessel(H, R, i, j, 0.03, 11, 15, 'teal');
      branchSpray(H, R, ...H.p(i, j, 0.48), 0.73, 'teal');
    }
  },
  (H, R, t) => {
    const u = cycle(t, 16);
    const tilt = u < 0.26 ? Math.max(0, (u - 0.13) / 0.13) : u < 0.58 ? 1 : Math.max(0, 1 - (u - 0.58) / 0.16);
    H.at(4.67, 4.82, 1.52, (HH) =>
      actor(
        HH,
        R,
        4.67,
        4.82,
        u * 16,
        'newYorkStoopWater',
        {
          face: 'sw',
          shirt: ['sun', 0.65],
          pants: ['blue', 0.7],
          hairStyle: 'curly',
          skin: ['coral', 0.65],
          prop(h, r, p) {
            const [hx, hy] = p.nearHand,
              angle = tilt * 0.42;
            const q = (x, y) => [hx + x * Math.cos(angle) + y * Math.sin(angle), hy - x * Math.sin(angle) + y * Math.cos(angle)];
            shape(h, r, [q(-12, 4), q(11, 4), q(9, 23), q(-10, 23)], 'teal', 0.72, 0.8);
            oval(h, r, ...q(0, 4), 11, 4, 'teal', 0.78);
            stroke(h, r, [q(-6, 4), q(-9, -6), q(8, -7), q(8, 5)], 'blue', 1.8);
            shape(h, r, [q(-10, 12), q(-27, 3), q(-30, 6), q(-11, 21)], 'teal', 0.72, 0.7);
            const spout = q(-29, 5),
              target = h.p(3.38, 5.6, 1.91);
            if (tilt > 0.72) {
              const opacity = Math.min(1, (tilt - 0.72) / 0.2);
              h.opacity(opacity, () => {
                stroke(h, r, [spout, [(spout[0] + target[0]) / 2 - 2, spout[1] + 8], target], 'teal', 1.1, 0.55);
                for (let k = 0; k < 3; k++) {
                  const f = cycle(u * 16 + k * 0.4, 1.2);
                  h.dot(spout[0] + (target[0] - spout[0]) * f, spout[1] + (target[1] - spout[1]) * f, 1.1, 'paper', 0.8);
                }
              });
            }
          }
        },
        1.52,
        1.4
      )
    );
    H.at(7.7, 9.65, 0, (HH) =>
      actor(
        HH,
        R,
        7.7,
        9.65,
        u * 16,
        'newYorkStoopNeighbor',
        {
          face: 'sw',
          shirt: ['paper', 1],
          pants: ['teal', 0.77],
          hairStyle: 'bun',
          skin: ['coral', 0.48],
          prop(h, r, p) {
            const [x, y] = p.nearHand;
            stroke(
              h,
              r,
              [
                [x - 7, y + 10],
                [x - 4, y],
                [x + 5, y + 1],
                [x + 8, y + 11]
              ],
              'blue',
              1.3
            );
            shape(
              h,
              r,
              [
                [x - 11, y + 9],
                [x + 12, y + 11],
                [x + 13, y + 33],
                [x - 10, y + 31]
              ],
              'coral',
              0.65,
              0.8
            );
            h.line(
              r,
              [
                [x - 7, y + 26],
                [x + 10, y + 27]
              ],
              'paper',
              1.4
            );
            for (let k = 0; k < 3; k++)
              h.line(
                r,
                [
                  [x - 5 + k * 5, y + 10],
                  [x - 8 + k * 5, y - 1]
                ],
                'teal',
                2
              );
          }
        },
        0,
        1.36
      )
    );
    const [x, y] = H.p(6.69, 2.18, 3.0);
    stroke(
      H,
      R,
      [
        [x - 6, y + 8],
        [x, y - Math.sin(u * TAU) * 2],
        [x + 8, y + 4]
      ],
      'teal',
      1.8
    );
  }
);

room.loopSeconds = 16;
room.stillTime = 0;
export default room;
