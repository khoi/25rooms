import { surface, timber, metal, vessel, bentTube, drape, benchFrame, pendant } from '../materials.js';
import { masonry, cabinetFrame, boardFloor } from '../structure.js';
import { windowBay, caster } from '../joinery.js';
import { shallowTray, handTool } from '../furnishings.js';
import { TAU, actor, box, cycle, oval, shape, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const hold = { ...rest, al: 49, ar: 57, el: 36, er: 44, head: 8, lean: -5 };
FIGURES.clips.hongKongOarInspect = {
  dur: 16,
  keys: [
    [0, hold],
    [0.13, hold],
    [0.27, { ...hold, al: 69, ar: 78, el: 56, er: 58, lean: -2, head: 0 }],
    [0.43, { ...hold, al: 70, ar: 79, el: 59, er: 61, head: -10 }],
    [0.58, { ...hold, al: 70, ar: 78, el: 57, er: 61, head: 10 }],
    [0.75, hold],
    [1, hold]
  ]
};

function shell(H, R, i, j, length, z, ink) {
  const hull = [];
  for (let q = 0; q <= 16; q++) {
    const f = q / 16;
    hull.push(H.p(i + Math.sin(f * Math.PI) * 0.48, j + f * length, z));
  }
  for (let q = 16; q >= 0; q--) {
    const f = q / 16;
    hull.push(H.p(i - Math.sin(f * Math.PI) * 0.48, j + f * length, z));
  }
  const lower = hull.map(([x, y]) => [x, y + 5]);
  shape(H, R, lower, 'blue', 0.43, 0.8);
  shape(H, R, hull, ink, 0.68, 0.8);
  H.line(R, [H.p(i, j + 0.18, z + 0.01), H.p(i, j + length - 0.18, z + 0.01)], 'paper', 1.2, { tone: 0.8 });
  for (const q of [0.28, 0.49, 0.7]) {
    const opening = [];
    for (let k = 0; k < 24; k++) {
      const a = (k * TAU) / 24;
      opening.push(H.p(i + Math.cos(a) * 0.22, j + q * length + Math.sin(a) * 0.49, z + 0.03));
    }
    shape(H, R, opening, 'blue', 0.67, 0.6);
    box(H, R, i - 0.17, j + q * length - 0.15, 0.34, 0.28, z + 0.06, 0.04, 'paper', 0.85);
    for (const sign of [-1, 1]) {
      H.line(
        R,
        [
          H.p(i + sign * 0.31, j + q * length, z),
          H.p(i + sign * 0.82, j + q * length - 0.25, z + 0.09),
          H.p(i + sign * 0.32, j + q * length - 0.36, z)
        ],
        'blue',
        0.9
      );
      oval(H, R, ...H.p(i + sign * 0.82, j + q * length - 0.25, z + 0.13), 2.6, 2, 'sun', 0.9);
    }
  }
  for (const q of [0.28, 0.49, 0.7]) {
    for (const a of [-0.14, 0.14]) metal(H, R, i + a, j + q * length - 0.48, 0.045, 0.93, z + 0.075, 0.035, 'teal');
    timber(H, R, i - 0.19, j + q * length + 0.2, 0.38, 0.14, z + 0.09, 0.08, 'sun');
    for (const a of [-0.11, 0.11]) {
      const p = H.p(i + a, j + q * length - 0.28, z + 0.13);
      surface(
        H,
        R,
        [
          [p[0] - 3, p[1] + 2],
          [p[0] + 3, p[1] + 2],
          [p[0] + 4, p[1] - 7],
          [p[0] - 2, p[1] - 9]
        ],
        'coral',
        0.6,
        0.5
      );
      H.line(
        R,
        [
          [p[0] - 3, p[1] - 3],
          [p[0] + 3, p[1] - 3]
        ],
        'paper',
        1
      );
    }
  }
}

function oar(H, R, x, y, angle, roll = 0, ink = 'coral', size = 1) {
  const c = Math.cos(angle),
    s = Math.sin(angle);
  const p = (a, b) => [x + (a * c - b * s) * size, y + (a * s + b * c) * size];
  H.line(R, [p(-79, 0), p(71, 0)], 'blue', 2.5);
  H.line(R, [p(-76, -0.4), p(69, -0.4)], 'sun', 1.05, { tone: 0.7 });
  H.line(R, [p(-81, 0), p(-60, 0)], 'teal', 4.5);
  H.line(R, [p(3, 0), p(13, 0)], 'paper', 5.2);
  H.line(R, [p(11, 0), p(15, 0)], 'teal', 6.4);
  const width = 6 + roll * 4;
  shape(H, R, [p(68, -3), p(82, -width), p(104, -width - 1), p(105, width), p(82, width), p(69, 3)], ink, 0.78, 0.7);
  shape(H, R, [p(88, -width), p(95, -width), p(96, width), p(89, width)], 'paper', 1, 0.4);
}

function trestle(H, R, i, j, z = 0.87) {
  for (const a of [-0.38, 0.38]) H.line(R, [H.p(i + a, j, 0.03), H.p(i, j, z)], 'blue', 2.3);
  H.line(R, [H.p(i - 0.43, j, z), H.p(i + 0.43, j, z)], 'teal', 3.8);
  H.line(R, [H.p(i - 0.3, j, 0.2), H.p(i + 0.3, j, 0.2)], 'blue', 1.4);
  H.line(R, [H.p(i - 0.31, j, z + 0.04), H.p(i - 0.27, j, z - 0.08), H.p(i + 0.27, j, z - 0.08), H.p(i + 0.31, j, z + 0.04)], 'sun', 1.2);
}

const room = world(
  'hong-kong-sha-tin-rowing',
  'Sha Tin · Oars in parallel',
  { floor: 'paper', tone: 1, wall: false, head: 60 },
  (H, R) => {
    boardFloor(H, R, 0, 0, 12, 12, 0.025, 'paper', 0.65);
    masonry(H, R, 'nw', 0, 12, 0, 4.15, 'teal', 0.2);
    surface(H, R, H.faceI(0.02, 0.04, 11.94, 0, 3.98), 'paper', 1);
    windowBay(H, R, 'ne', 5.34, 6.15, 0.34, 3.45, {
      ink: 'teal',
      divisions: 4,
      view(P) {
        surface(H, R, [P(0.14, 0.14), P(6, 0.14), P(6, 1.44), P(0.14, 1.44)], 'teal', 0.25);
        surface(H, R, [P(0.14, 1.44), P(1.9, 2.27), P(3.9, 1.71), P(6, 2.13), P(6, 1.44)], 'blue', 0.14);
        for (let n = 0; n < 12; n++) H.line(R, [P(0.2 + n * 0.46, 0.4 + (n % 3) * 0.2), P(0.54 + n * 0.46, 0.4 + (n % 3) * 0.2)], 'paper', 1);
      }
    });
    for (const j of [1.3, 5.65, 10.37]) {
      timber(H, R, 0.36, j, 0.2, 0.2, 0.08, 4.13, 'sun');
      for (const z of [0.76, 1.92, 3.08]) {
        metal(H, R, 0.39, j, 2.29, 0.12, z, 0.1, 'teal');
        bentTube(
          H,
          R,
          [
            [0.46, j, z - 0.48],
            [2.36, j, z]
          ],
          1.9,
          'teal'
        );
      }
    }
    for (let row = 0; row < 3; row++)
      for (let n = 0; n < 2; n++) shell(H, R, 1.09 + n * 0.99, 1.08, 9.89, 0.9 + row * 1.16, ['paper', 'coral', 'sun'][(n + row) % 3]);
    for (const j of [3.33, 8.52]) trestle(H, R, 8.13, j, 0.73);
    shell(H, R, 8.13, 2.83, 7.18, 0.92, 'paper');
    for (const i of [4.09, 7.18]) trestle(H, R, i, 5.77, 0.65);
    oar(H, R, ...H.p(5.79, 5.78, 0.77), 0.464, 0.2, 'sun', 1.03);
    cabinetFrame(H, R, 3.13, 0.44, 1.84, 1.72, 0.08, 2.68, 1, 'teal', (i, j, w, d, z, h) => {
      for (let row = 0; row < 3; row++) {
        timber(H, R, i, j, w, d, z + row * 0.81, 0.08, 'sun');
        for (let n = 0; n < 3; n++) vessel(H, R, i + 0.3 + n * 0.4, j + 0.6, z + 0.11 + row * 0.81, 6, 14, n % 2 ? 'paper' : 'teal');
      }
    });
    benchFrame(H, R, 9.52, 8.51, 1.91, 2.55, 0.91, 'teal');
    shallowTray(H, R, 9.64, 8.7, 1.65, 1.36, 0.95, 'sun');
    handTool(H, R, 10.05, 9.1, 1.14, 'spanner', 'coral');
    handTool(H, R, 10.81, 9.7, 1.14, 'brush', 'sun');
    drape(H, R, 9.8, 10.42, 0.54, 0.55, 0.95, 0.5, 'paper');
    metal(H, R, 3.44, 9.89, 3.63, 1.16, 0.19, 0.12, 'teal');
    for (const i of [3.54, 6.89]) for (const j of [10.01, 10.92]) caster(H, R, i, j);
    for (let n = 0; n < 4; n++) oar(H, R, ...H.p(5.2, 10.13 + n * 0.23, 0.4), 0.46, 0, ['coral', 'sun', 'teal', 'paper'][n], 0.72);
    for (const j of [2.15, 8.86])
      bentTube(
        H,
        R,
        [
          [0.35, j, 4.12],
          [5.74, j, 4.42],
          [11.46, j, 4.03]
        ],
        2.5,
        'teal'
      );
    pendant(H, R, 6.21, 2.11, 4.43, 3.2, 'sun', 1);
  },
  (H, R, t) => {
    const u = cycle(t, 16),
      lift =
        u < 0.13
          ? 0
          : u < 0.27
            ? (1 - Math.cos(((u - 0.13) / 0.14) * Math.PI)) / 2
            : u < 0.58
              ? 1
              : u < 0.75
                ? (1 + Math.cos(((u - 0.58) / 0.17) * Math.PI)) / 2
                : 0;
    H.at(5.95, 6.48, 0, (HH) =>
      actor(
        HH,
        R,
        5.95 + lift * 0.13,
        6.48 - lift * 0.1,
        t,
        'hongKongOarInspect',
        {
          shirt: ['teal', 0.76],
          pants: ['blue', 0.7],
          hairStyle: 'pony',
          prop(h, r, p) {
            const [x, y] = p.nearHand;
            oar(h, r, x - 9, y + 2, -0.463 + lift * 0.075, lift * (0.5 + Math.sin(u * TAU) * 0.3), 'coral');
            h.line(r, [[x - 9, y + 2], p.farHand], 'blue', 1.2, { tone: 0.65 });
          }
        },
        0,
        1.4
      )
    );
    H.at(10.6, 6.27, 0, (HH) =>
      actor(
        HH,
        R,
        10.6,
        6.27,
        0,
        'hold',
        {
          shirt: ['sun', 0.67],
          hairStyle: 'short',
          face: 'sw',
          prop(h, r, p) {
            const [x, y] = p.nearHand;
            shape(
              h,
              r,
              [
                [x - 9, y - 6],
                [x + 8, y - 5],
                [x + 10, y + 5],
                [x - 9, y + 7]
              ],
              'paper',
              1,
              0.6
            );
            h.line(
              r,
              [
                [x - 6, y - 2],
                [x + 7, y - 1]
              ],
              'teal',
              1.1
            );
          }
        },
        0,
        1.27
      )
    );
  }
);
room.loopSeconds = 16;
export default room;
