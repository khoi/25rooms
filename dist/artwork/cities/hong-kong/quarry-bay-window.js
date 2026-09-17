import { surface, timber, metal, vessel, bentTube, drape, benchFrame, pendant, floorLight, cushion, branchSpray } from '../materials.js';
import { masonry, cabinetFrame, basin as washBasin, boardFloor } from '../structure.js';
import { windowBay, taskLight } from '../joinery.js';
import { coiledLine, boundBook } from '../furnishings.js';
import { TAU, actor, cycle, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const watch = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, head: 4, lean: -3, al: 26, ar: 102, el: 36, er: 7 };
FIGURES.clips.hongKongAquariumTrace = {
  dur: 20,
  keys: [
    [0, watch],
    [0.15, watch],
    [0.37, { ...watch, ar: 138, er: 0, head: -6 }],
    [0.55, { ...watch, ar: 109, er: 6, head: -2 }],
    [0.69, { ...watch, ar: 50, er: 48, head: 3 }],
    [0.83, { ...watch, ar: 50, er: 48, head: 3 }],
    [1, watch]
  ]
};

function mug(H, R, i, j, z, ink) {
  const [x, y] = H.p(i, j, z);
  shape(
    H,
    R,
    [
      [x - 6, y],
      [x + 6, y],
      [x + 6, y - 13],
      [x - 6, y - 13]
    ],
    ink,
    0.7,
    0.7
  );
  oval(H, R, x, y - 13, 6, 2.3, 'paper', 1);
  stroke(
    H,
    R,
    [
      [x + 6, y - 11],
      [x + 12, y - 9],
      [x + 12, y - 3],
      [x + 6, y - 2]
    ],
    'blue',
    1
  );
}

function fish(H, R, x, y, direction, ink, size = 1) {
  const p = (a, b) => [x + a * direction * size, y + b * size];
  shape(H, R, [p(-9, 0), p(-16, -6), p(-15, 6), p(-9, 1)], ink, 0.76, 0.6);
  oval(H, R, x, y, 11 * size * Math.max(0.2, Math.abs(direction)), 6 * size, ink, 0.8);
  shape(H, R, [p(-1, -4), p(2, -10), p(6, -3)], ink, 0.7, 0.55);
  H.dot(...p(7, -2), 1.25 * size, 'blue', 1);
  H.line(R, [p(-5, 1), p(5, 1)], 'paper', 0.65);
}

const room = world(
  'hong-kong-quarry-bay-window',
  'Quarry Bay · One window still awake',
  { floor: 'paper', tone: 1, wall: false, head: 70 },
  (H, R) => {
    boardFloor(H, R, 0, 0, 12, 12, 0.02, 'teal', 0.47);
    H.tint(H.tile(0.03, 0.03, 11.94, 11.94, 0.027), 'blue', 0.47, { fine: true });
    floorLight(H, 7.2, 8.4, 104, 0.67);
    floorLight(H, 2.3, 8.3, 59, 0.32);
    masonry(H, R, 'nw', 0, 12, 0, 4.73, 'blue', 0.67);
    masonry(H, R, 'ne', 0, 12, 0, 4.73, 'teal', 0.53);
    windowBay(H, R, 'ne', 4.48, 7.04, 1.92, 2.52, {
      night: true,
      divisions: 5,
      view(P) {
        for (let n = 0; n < 7; n++) {
          const u = 0.15 + n * 0.96,
            h = 1.47 + (n % 3) * 0.28;
          surface(H, R, [P(u, 0.1), P(u + 0.84, 0.1), P(u + 0.84, h), P(u, h)], n % 2 ? 'teal' : 'blue', 0.67, 0.45);
          for (let x = 0; x < 2; x++)
            for (let y = 0; y < 5; y++)
              surface(
                H,
                R,
                [
                  P(u + 0.12 + x * 0.39, 0.24 + y * 0.31),
                  P(u + 0.29 + x * 0.39, 0.24 + y * 0.31),
                  P(u + 0.29 + x * 0.39, 0.42 + y * 0.31),
                  P(u + 0.12 + x * 0.39, 0.42 + y * 0.31)
                ],
                (x + y + n) % 4 === 0 ? 'sun' : 'paper',
                (x + y + n) % 4 === 0 ? 0.77 : 0.23,
                0.3
              );
        }
      }
    });
    for (const j of [3.49, 8.1]) timber(H, R, 0.22, j, 3.35, 0.14, 0.1, 3.99, 'teal');
    timber(H, R, 0.22, 3.49, 3.35, 4.75, 0.13, 0.29, 'sun');
    for (let n = 0; n < 9; n++) timber(H, R, 0.34, 3.65 + n * 0.46, 3.07, 0.39, 0.42, 0.09, 'sun');
    cushion(H, R, 0.39, 3.7, 2.99, 4.23, 0.54, 0.24, 'paper');
    drape(H, R, 0.48, 5.06, 2.81, 2.87, 0.81, 0.64, 'coral');
    cushion(H, R, 0.65, 3.88, 2.23, 0.96, 0.8, 0.23, 'paper');
    timber(H, R, 0.21, 3.49, 3.33, 0.19, 3.97, 0.18, 'teal');
    for (let n = 0; n < 5; n++) surface(H, R, H.faceJ(0.42, 3.76 + n * 0.81, 0.68, 1.81, 3.88), n % 2 ? 'teal' : 'paper', 0.24, 0.5);
    cabinetFrame(H, R, 0.32, 0.43, 3.21, 1.62, 0.09, 1.17, 2, 'teal', (i, j, w, d, z, h, n) => {
      timber(H, R, i, j, w, d, z + 0.47, 0.07, 'sun');
      for (let k = 0; k < 3; k++) vessel(H, R, i + 0.25 + k * 0.35, j + 0.5, z + 0.58, 5, 12, n ? 'paper' : 'sun');
    });
    metal(H, R, 0.29, 0.39, 3.31, 1.71, 1.26, 0.1, 'paper');
    washBasin(H, R, 0.45, 0.55, 1.58, 1.26, 1.38);
    vessel(H, R, 2.75, 1.15, 1.38, 11, 24, 'paper', false);
    mug(H, R, 3.02, 1.8, 1.38, 'coral');
    cabinetFrame(H, R, 3.73, 1.01, 2.52, 1.22, 0.07, 1.05, 3, 'sun', (i, j, w, d, z, h, n) => {
      for (let k = 0; k < 4; k++) boundBook(H, R, i + 0.04, j + 0.1 + k * 0.2, w - 0.1, 0.16, z + 0.12, n % 2 ? 'paper' : 'teal');
    });
    cushion(H, R, 3.78, 1.07, 2.42, 1.1, 1.17, 0.14, 'sun');
    cabinetFrame(H, R, 7.34, 6.72, 3.7, 1.61, 0.08, 0.99, 3, 'teal', (i, j, w, d, z, h, n) => {
      if (n === 0) {
        vessel(H, R, i + w / 2, j + d * 0.6, z + 0.05, 10, 21, 'paper');
        coiledLine(H, R, i + w / 2, j + d * 0.6, z + 0.54, 10, 'teal');
      } else for (let k = 0; k < 3; k++) vessel(H, R, i + 0.2 + k * 0.26, j + 0.57, z + 0.15, 5, 12, ['sun', 'coral', 'teal'][k]);
    });
    metal(H, R, 7.5, 6.98, 3.39, 1.28, 1.09, 0.1, 'blue');
    surface(H, R, H.faceI(7.51, 8.25, 3.37, 1.19, 2.59), 'teal', 0.15);
    surface(H, R, H.faceJ(10.88, 6.98, 1.28, 1.19, 2.59), 'teal', 0.24);
    H.tint(H.tile(7.51, 6.98, 3.37, 1.28, 2.59), 'teal', 0.12, { fine: true });
    for (const i of [7.51, 10.88])
      for (const j of [6.98, 8.25])
        bentTube(
          H,
          R,
          [
            [i, j, 1.19],
            [i, j, 2.61]
          ],
          1.5,
          'teal'
        );
    for (const j of [6.98, 8.25]) metal(H, R, 7.51, j, 3.37, 0.035, 2.59, 0.045, 'blue');
    surface(H, R, H.faceI(7.58, 8.27, 3.23, 1.25, 1.42), 'sun', 0.24);
    for (const [i, h] of [
      [7.92, 0.78],
      [8.18, 1.01],
      [10.17, 0.81],
      [10.5, 1.05]
    ])
      for (let n = 0; n < 3; n++) branchSpray(H, R, ...H.p(i + n * 0.07, 8.28, 1.41), h * 0.7, 'teal', n % 2 ? 1 : -1);
    surface(H, R, [H.p(8.68, 8.28, 1.4), H.p(9, 8.28, 1.82), H.p(9.41, 8.28, 1.62), H.p(9.64, 8.28, 1.4)], 'blue', 0.3);
    bentTube(
      H,
      R,
      [
        [10.5, 7.21, 2.63],
        [10.5, 7.21, 1.35]
      ],
      1.4,
      'teal'
    );
    pendant(H, R, 9.1, 7.65, 4.38, 3.3, 'teal', 1.02);
    benchFrame(H, R, 2.67, 9.47, 2.96, 1.72, 0.88, 'sun');
    boundBook(H, R, 3.01, 9.71, 1.3, 0.84, 0.91, 'teal');
    mug(H, R, 4.89, 10.08, 0.92, 'sun');
    taskLight(H, R, 2.99, 9.62, 0.92, 'coral', 0.67);
    cushion(H, R, 4.33, 11.02, 1.42, 0.66, 0.05, 0.12, 'coral');
    for (let n = 0; n < 4; n++) branchSpray(H, R, ...H.p(10.67 + n * 0.12, 3.08, 0.55), 1.08, 'teal', n % 2 ? 1 : -1);
    vessel(H, R, 10.81, 3.18, 0.02, 17, 23, 'coral');
  },
  (H, R, t) => {
    const u = cycle(t, 20),
      pane = H.faceI(7.55, 8.27, 3.29, 1.27, 2.53);
    H.clip(pane, () => {
      const a = u * TAU;
      const [x, y] = H.p(9.1 + Math.cos(a) * 0.91, 8.28, 1.91 + Math.sin(a) * 0.24);
      fish(H, R, x, y, Math.tanh(-Math.sin(a) * 5), 'coral', 0.68);
      const [fx, fy] = H.p(8.97 + Math.cos(a + 2.4) * 0.72, 8.28, 2.23 + Math.sin(a + 2.4) * 0.13);
      fish(H, R, fx, fy, Math.tanh(-Math.sin(a + 2.4) * 5), 'sun', 0.47);
      for (let q = 0; q < 4; q++) {
        const bubble = cycle(t + q * 5, 20),
          p = H.p(10.4 + Math.sin(bubble * TAU) * 0.055, 8.28, 1.35 + bubble * 1.15);
        H.opacity(Math.sin(bubble * Math.PI), () =>
          H.outline(
            R,
            Array.from({ length: 14 }, (_, k) => [p[0] + Math.cos((k * TAU) / 14) * 2, p[1] + Math.sin((k * TAU) / 14) * 2]),
            'paper',
            0.7
          )
        );
      }
    });
    H.line(R, [H.p(7.79, 8.3, 1.65), H.p(8.02, 8.3, 2.38)], 'paper', 1.1, { tone: 0.5 });
    actor(
      H,
      R,
      7.38,
      8.22,
      t,
      'hongKongAquariumTrace',
      {
        shirt: ['paper', 1],
        pants: ['teal', 0.6],
        hairStyle: 'bun',
        face: 'se',
        prop(h, r, p) {
          h.line(r, [p.nearHand, [p.nearHand[0] + 6, p.nearHand[1] - 2]], 'coral', 1.5);
        }
      },
      0.03,
      1.28
    );
    const [x, y] = H.p(9.2, 8.52, 1.14);
    H.glow(x, y, 51, 18, 'teal', 0.16);
  }
);
room.loopSeconds = 20;
export default room;
