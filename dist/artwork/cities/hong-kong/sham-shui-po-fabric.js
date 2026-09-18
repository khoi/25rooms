import { surface, timber, metal, vessel, bentTube, drape, benchFrame, pendant, spokedWheel } from '../materials.js';
import { masonry, archedBay, cabinetFrame, boardFloor } from '../structure.js';
import { cityView, taskLight } from '../joinery.js';
import { shallowTray, foldedCloth, handTool } from '../furnishings.js';
import { TAU, actor, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const measure = { ...rest, lean: -11, head: 15, al: 66, ar: 78, el: 30, er: 14 };
FIGURES.clips.hongKongFabricMeasure = {
  dur: 16,
  keys: [
    [0, measure],
    [0.1, measure],
    [0.28, { ...measure, al: 85, ar: 100, el: 6, er: -5, lean: -17 }],
    [0.48, { ...measure, al: 85, ar: 100, el: 6, er: -5, lean: -17 }],
    [0.63, { ...measure, al: 57, ar: 56, el: 57, er: 60, lean: -4 }],
    [0.8, { ...measure, al: 57, ar: 56, el: 57, er: 60, lean: -4, head: -2 }],
    [0.95, measure],
    [1, measure]
  ]
};

function bolt(H, R, i, j, z, width, height, ink, pattern = 0) {
  const edge = Array.from({ length: 13 }, (_, n) => H.p(i + width, j + 0.04 + n * 0.055, z + height - 0.035 + Math.sin(n * 0.9) * 0.025));
  surface(H, R, [H.p(i, j, z), H.p(i + width, j, z), H.p(i + width, j + 0.76, z), H.p(i, j + 0.76, z)], ink, 0.65);
  surface(H, R, [H.p(i, j + 0.76, z), H.p(i + width, j + 0.76, z), H.p(i + width, j + 0.76, z + height), H.p(i, j + 0.76, z + height)], ink, 0.49);
  surface(H, R, H.tile(i, j, width, 0.76, z + height), ink, 0.42);
  H.line(R, edge, 'paper', 1.2);
  for (let n = 0; n < 4; n++)
    H.line(R, [H.p(i + 0.05, j + 0.79, z + 0.08 + n * 0.07), H.p(i + width - 0.05, j + 0.79, z + 0.08 + n * 0.07)], 'paper', 0.6);
  const face = H.faceI(i + 0.03, j + 0.775, width - 0.06, z + 0.04, z + height - 0.04);
  H.clip(face, () => {
    if (pattern % 3 === 0)
      for (let q = 0; q < 7; q++)
        H.line(R, [H.p(i + 0.02, j + 0.79, z + 0.08 + q * 0.15), H.p(i + width, j + 0.79, z + 0.08 + q * 0.15)], 'paper', 1.1);
    else if (pattern % 3 === 1)
      for (let q = 0; q < 12; q++) H.dot(...H.p(i + 0.08 + ((q % 3) * width) / 3, j + 0.79, z + 0.13 + Math.floor(q / 3) * 0.19), 1.6, 'paper', 1);
    else
      for (let q = 0; q < 4; q++)
        H.line(R, [H.p(i + 0.1 + (q * width) / 4, j + 0.79, z), H.p(i + 0.1 + (q * width) / 4, j + 0.79, z + height)], 'blue', 0.6, { tone: 0.5 });
  });
  shape(H, R, H.tile(i + width * 0.3, j + 0.07, width * 0.4, 0.56, z + height + 0.015), 'paper', 0.85, 0.4);
}

function roll(H, R, i, j, z, length, ink, stripe = false) {
  const a = H.p(i, j, z),
    b = H.p(i + length, j, z);
  shape(
    H,
    R,
    [
      [a[0], a[1] - 13],
      [b[0], b[1] - 13],
      [b[0], b[1] + 9],
      [a[0], a[1] + 9]
    ],
    ink,
    0.6,
    0.75
  );
  oval(H, R, ...a, 9, 13, ink, 0.7);
  oval(H, R, ...b, 9, 13, 'paper', 1);
  for (const rad of [3, 5, 7])
    H.outline(
      R,
      Array.from({ length: 24 }, (_, q) => [b[0] + Math.cos((q * TAU) / 24) * rad, b[1] + Math.sin((q * TAU) / 24) * rad * 1.4]),
      ink,
      0.8,
      { tone: 0.65 }
    );
  H.dot(...b, 2.2, 'blue', 0.9);
  if (stripe)
    for (let q = 0; q < 3; q++)
      H.line(
        R,
        [
          [a[0], a[1] - 8 + q * 6],
          [b[0], b[1] - 8 + q * 6]
        ],
        'paper',
        1.1
      );
}

const room = world(
  'hong-kong-sham-shui-po-fabric',
  'Sham Shui Po · Twelve blue metres',
  { floor: 'paper', tone: 0.9, wall: false, head: 70 },
  (H, R) => {
    boardFloor(H, R, 0, 0, 12, 12, 0.02, 'sun', 0.55);
    masonry(H, R, 'nw', 0, 12, 0, 4.64, 'paper');
    masonry(H, R, 'ne', 0, 12, 0, 4.64, 'paper');
    cabinetFrame(H, R, 0.47, 0.37, 7.26, 1.25, 0.12, 4.07, 3, 'teal', (i, j, w, d, z, h, n) => {
      for (let row = 0; row < 3; row++) {
        timber(H, R, i, j, w, d, z + row * 1.23, 0.11, 'sun');
        for (let q = 0; q < 4; q++)
          bolt(
            H,
            R,
            i + 0.08 + q * 0.5,
            j + 0.13,
            z + 0.12 + row * 1.23,
            0.43,
            0.8 + ((q + row) % 2) * 0.16,
            ['teal', 'paper', 'coral', 'sun'][(q + row + n) % 4],
            q + row
          );
      }
    });
    archedBay(H, R, 'ne', 8.32, 3.06, 1.64, 2.45, 'teal', (P) => cityView(H, R, P, 3.06, 2.45));
    for (const z of [1.44, 2.4, 3.35]) {
      bentTube(
        H,
        R,
        [
          [0.25, 2.58, z],
          [0.25, 8.65, z]
        ],
        2.5,
        'teal'
      );
      for (let n = 0; n < 5; n++) {
        const j = 2.89 + n * 1.1,
          [x, y] = H.p(0.4, j, z);
        H.line(
          R,
          [
            [x, y],
            [x + 7, y + 6]
          ],
          'sun',
          1.4
        );
        surface(
          H,
          R,
          [
            [x - 4, y + 6],
            [x + 17, y + 6],
            [x + 17, y + 39],
            [x - 5, y + 44]
          ],
          ['teal', 'sun', 'coral', 'paper'][(n + Math.round(z)) % 4],
          0.58,
          0.6
        );
        for (let q = 0; q < 4; q++)
          H.line(
            R,
            [
              [x - 2 + q * 5, y + 8],
              [x - 2 + q * 5, y + 39]
            ],
            'paper',
            0.65
          );
      }
    }
    for (const j of [2.62, 8.59]) {
      timber(H, R, 0.16, j, 0.11, 0.17, 0.08, 3.48, 'teal');
      for (const z of [1.44, 2.4, 3.35]) bentTube(H, R, [[0.2, j, z - 0.29], [0.73, j, z], [0.2, j, z]], 1.4, 'sun');
    }
    cabinetFrame(H, R, 8.29, 0.47, 2.91, 0.92, 0.08, 1.24, 3, 'sun', (i, j, w, d, z, h, n) => {
      for (let k = 0; k < 3; k++) foldedCloth(H, R, i + 0.06, j, w - 0.12, d, z + 0.1 + k * 0.17, n === 1 ? 'coral' : 'paper', 'teal');
    });
    for (const i of [8.5, 9.17, 9.84, 10.51]) {
      bolt(H, R, i, 0.66, 1.36, 0.42, 0.53, 'paper', 1);
    }
    benchFrame(H, R, 2.56, 4.07, 7.42, 2.41, 1.13, 'sun');
    timber(H, R, 2.67, 4.21, 7.18, 2.08, 0.3, 0.08, 'sun');
    for (const i of [2.76, 6.24, 9.61]) bentTube(H, R, [[i, 4.29, 0.14], [i, 6.25, 0.94]], 1.5, 'teal');
    for (const i of [2.7, 8.99]) {
      timber(H, R, i, 4.17, 0.15, 0.58, 1.13, 0.47, 'sun');
      metal(H, R, i - 0.04, 4.35, 0.23, 0.25, 1.47, 0.1, 'teal');
      H.dot(...H.p(i + 0.08, 4.62, 1.52), 2.5, 'sun');
    }
    for (let n = 0; n < 7; n++) surface(H, R, H.tile(2.69 + n * 0.95, 4.22, 0.88, 2.1, 0.36), 'paper', 1, 0.4);
    drape(H, R, 3.45, 4.31, 4.71, 2.11, 1.16, 0.74, 'teal');
    roll(H, R, 3.45, 4.41, 1.52, 4.72, 'teal', true);
    for (let n = 0; n < 25; n++) H.line(R, [H.p(2.9 + n * 0.25, 6.36, 1.2), H.p(2.9 + n * 0.25, 6.18, 1.2)], 'sun', 0.8);
    shallowTray(H, R, 8.59, 4.31, 1.11, 0.84, 1.17, 'paper');
    for (let n = 0; n < 3; n++) vessel(H, R, 8.81 + n * 0.28, 4.7, 1.31, 4.8, 10, ['coral', 'teal', 'sun'][n], false);
    handTool(H, R, 8.98, 5.8, 1.19, 'scissors', 'coral');
    surface(H, R, H.tile(8.55, 5.63, 0.79, 0.6, 1.19), 'sun', 0.22);
    for (let n = 0; n < 3; n++) {
      const [wx, wy] = H.p(8.58 + n * 0.33, 5.41, 1.23);
      surface(H, R, ell(wx, wy, 5, 3), 'blue', 0.8);
      surface(H, R, ell(wx, wy - 3, 5, 3), 'sun', 0.57);
    }
    surface(H, R, H.tile(2.75, 5.05, 0.49, 0.77, 1.2), 'blue', 0.8);
    for (let n = 0; n < 9; n++) surface(H, R, H.tile(2.81 + n % 3 * 0.12, 5.23 + Math.floor(n / 3) * 0.17, 0.08, 0.1, 1.22), 'paper', 1);
    taskLight(H, R, 9.53, 4.32, 1.16, 'teal', -0.66);
    benchFrame(H, R, 9.35, 8.32, 2.06, 2.08, 1.05, 'teal');
    metal(H, R, 9.69, 8.64, 1.36, 1.15, 1.08, 0.1, 'blue');
    const [x, y] = H.p(10.3, 9.2, 1.24);
    surface(
      H,
      R,
      [
        [x - 24, y],
        [x - 24, y - 35],
        [x - 12, y - 44],
        [x + 21, y - 39],
        [x + 25, y - 18],
        [x + 8, y - 18],
        [x + 6, y - 26],
        [x - 9, y - 28],
        [x - 9, y]
      ],
      'teal',
      0.66
    );
    spokedWheel(H, R, x + 25, y - 27, 11, 'sun', 0.2, 0.82);
    H.line(
      R,
      [
        [x - 19, y - 22],
        [x - 19, y - 2]
      ],
      'paper',
      1.5
    );
    drape(H, R, 9.43, 9.74, 0.87, 0.65, 1.17, 0.66, 'coral');
    cabinetFrame(H, R, 1.55, 9.61, 4.12, 1.75, 0.04, 0.79, 3, 'sun', (i, j, w, d, z, h, n) => {
      for (let q = 0; q < 3; q++)
        foldedCloth(H, R, i + 0.1, j + 0.07, w - 0.16, d - 0.15, z + 0.11 + q * 0.15, ['paper', 'sun', 'coral'][(q + n) % 3], 'teal');
    });
    shallowTray(H, R, 1.72, 9.77, 1.63, 1.27, 0.87, 'teal');
    for (let n = 0; n < 8; n++) {
      const [x, y] = H.p(1.98 + n % 4 * 0.32, 10.06 + Math.floor(n / 4) * 0.48, 1.04);
      surface(H, R, ell(x, y, 4.3, 3), n === 3 ? 'paper' : 'sun', 0.85);
      for (const dx of [-1, 1]) H.dot(x + dx, y, 0.7, 'blue');
    }
    shallowTray(H, R, 3.56, 9.77, 1.77, 1.27, 0.87, 'paper');
    for (let n = 0; n < 4; n++) {
      const [x, y] = H.p(3.9 + n % 2 * 0.79, 10.08 + Math.floor(n / 2) * 0.53, 1.09);
      surface(H, R, ell(x, y, 7, 3), 'sun', 0.5);
      surface(H, R, [[x - 4, y], [x + 4, y], [x + 4, y - 10], [x - 4, y - 10]], n % 2 ? 'coral' : 'teal', 0.64);
      surface(H, R, ell(x, y - 10, 7, 3), 'sun', 0.5);
      H.dot(x, y - 10, 1.5, 'blue');
    }
    bentTube(H, R, [[10.2, 9.14, 1.32], [10.2, 9.14, 0.43], [10.75, 9.7, 0.22]], 1.3, 'teal');
    metal(H, R, 10.25, 9.58, 0.61, 0.51, 0.08, 0.08, 'teal');
    for (let n = 0; n < 4; n++) H.line(R, [H.p(10.32, 9.64 + n * 0.1, 0.18), H.p(10.78, 9.64 + n * 0.1, 0.18)], 'paper', 0.7);
    roll(H, R, 1.51, 8.79, 1.01, 1.39, 'coral');
    for (const i of [3.26, 7.48]) pendant(H, R, i, 3.51, 4.53, 3.32, 'paper', 0.9);
  },
  (H, R, t) => {
    const u = cycle(t, 16);
    actor(
      H,
      R,
      7.44,
      6.91,
      t,
      'hongKongFabricMeasure',
      {
        shirt: ['coral', 0.58],
        apron: ['paper', 1],
        glasses: true,
        hairStyle: 'short',
        face: 'nw',
        prop(HH, RR, points) {
          const a = points.nearHand,
            b = points.farHand,
            anchor = HH.p(6.15, 5.51, 1.2);
          stroke(HH, RR, [anchor, [a[0] - 17, a[1] + 5], a, [b[0] - 5, b[1] + 2], b], 'sun', 3.1);
          for (let q = 1; q < 9; q++) {
            const x = anchor[0] + ((a[0] - anchor[0]) * q) / 9,
              y = anchor[1] + ((a[1] - anchor[1]) * q) / 9;
            HH.line(
              RR,
              [
                [x, y - 1.5],
                [x + 0.8, y + 1.5]
              ],
              'blue',
              0.6
            );
          }
        }
      },
      0,
      1.4
    );
    actor(
      H,
      R,
      4.17,
      8.47,
      0,
      'hold',
      {
        shirt: ['teal', 0.63],
        hairStyle: 'pony',
        face: 'nw',
        prop(HH, RR, points) {
          const [x, y] = points.nearHand;
          shape(
            HH,
            RR,
            [
              [x - 17, y - 9],
              [x + 10, y - 3],
              [x + 8, y + 15],
              [x - 19, y + 9]
            ],
            'paper',
            1,
            0.8
          );
          for (let q = 0; q < 4; q++)
            shape(
              HH,
              RR,
              [
                [x - 13 + q * 5, y - 6],
                [x - 9 + q * 5, y - 5],
                [x - 10 + q * 5, y + 8],
                [x - 14 + q * 5, y + 7]
              ],
              ['teal', 'sun', 'coral', 'blue'][q],
              0.62,
              0.4
            );
        }
      },
      0,
      1.25
    );
    const [x, y] = H.p(1.61, 8.78, 1.01);
    stroke(
      H,
      R,
      [
        [x, y],
        [x + 10, y + 8 + Math.sin(u * TAU) * 1.5],
        [x + 6, y + 24]
      ],
      'coral',
      1.2
    );
  }
);

room.loopSeconds = 16;
room.stillTime = 6;
export default room;
