import { surface, timber, metal, bentTube, drape, benchFrame, pendant } from '../materials.js';
import { masonry, rackFrame, basin as washBasin } from '../structure.js';
import { hangingRail } from '../joinery.js';
import { handTool, shallowTray, foldedCloth, coiledLine, boundBook } from '../furnishings.js';
import { TAU, actor, box, cycle, ell, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const low = { ...rest, drop: 0.47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -8, head: 20, al: 60, ar: 67, el: 22, er: 28 };
const inspect = { ...low, lean: -2, head: 8, al: 58, ar: 53, el: 82, er: 90 };
FIGURES.clips.hongKongOysterAssess = {
  dur: 14,
  keys: [
    [0, low],
    [0.12, low],
    [0.31, inspect],
    [0.46, { ...inspect, head: 15, ar: 62, er: 84 }],
    [0.62, inspect],
    [0.79, low],
    [1, low]
  ]
};

function shell(H, R, x, y, size = 1, angle = 0, pale = false) {
  const p = (a, b) => [x + (a * Math.cos(angle) - b * Math.sin(angle)) * size, y + (a * Math.sin(angle) + b * Math.cos(angle)) * size];
  const outline = [
    [-9, 1],
    [-8, -5],
    [-4, -9],
    [1, -8],
    [6, -5],
    [10, -1],
    [8, 4],
    [2, 6],
    [-5, 6]
  ].map(([a, b]) => p(a, b));
  shape(H, R, outline, pale ? 'paper' : 'teal', pale ? 1 : 0.37, 0.65);
  for (const f of [0.38, 0.66, 0.84])
    stroke(
      H,
      R,
      [
        [-8 * f, 1],
        [-5 * f, -6 * f],
        [3 * f, -5 * f],
        [8 * f, 0],
        [4 * f, 4 * f]
      ].map(([a, b]) => p(a, b)),
      'blue',
      0.5,
      0.53
    );
  H.dot(...p(-3, 1), 1.1 * size, 'coral', 0.36);
}

function basket(H, R, i, j, w = 1.62, d = 1.16, z = 0, filled = true) {
  box(H, R, i, j, w, d, z, 0.49, 'sun', 0.53);
  shape(H, R, H.tile(i + 0.1, j + 0.1, w - 0.2, d - 0.2, z + 0.5), 'blue', 0.47, 0.5);
  for (let k = 0; k < 7; k++)
    H.line(
      R,
      [H.p(i + 0.12 + (k * (w - 0.25)) / 6, j + d + 0.02, z + 0.08), H.p(i + 0.12 + (k * (w - 0.25)) / 6, j + d + 0.02, z + 0.42)],
      'paper',
      0.7,
      { tone: 0.65 }
    );
  for (const height of [0.16, 0.31])
    H.line(R, [H.p(i + 0.08, j + d + 0.03, z + height), H.p(i + w - 0.08, j + d + 0.03, z + height)], 'blue', 0.7, { tone: 0.66 });
  if (filled)
    for (let k = 0; k < 9; k++)
      shell(
        H,
        R,
        ...H.p(i + 0.24 + ((k % 3) * (w - 0.48)) / 2, j + 0.24 + (Math.floor(k / 3) * (d - 0.48)) / 2, z + 0.54),
        0.48,
        k * 0.8,
        k % 3 === 0
      );
  for (const x of [i + 0.08, i + w - 0.08])
    stroke(H, R, [H.p(x, j + d * 0.27, z + 0.47), H.p(x, j + d * 0.5, z + 0.68), H.p(x, j + d * 0.73, z + 0.47)], 'blue', 1.1);
}

function basin(H, R, i, j, w, d, z) {
  const rim = Array.from({ length: 48 }, (_, n) => {
    const a = (n * TAU) / 48;
    return H.p(i + w * 0.5 + Math.cos(a) * w * 0.5, j + d * 0.5 + Math.sin(a) * d * 0.5, z + 0.43);
  });
  const foot = rim.map(([x, y]) => [x, y + 14]);
  surface(H, R, [...foot.slice(0, 25), ...rim.slice(0, 25).reverse()], 'paper', 1);
  surface(H, R, rim, 'teal', 0.4);
  H.outline(R, rim, 'paper', 2.8, { tone: 1 });
  for (let n = 0; n < 6; n++) {
    const p = H.p(i + w * (0.24 + n * 0.095), j + d * 0.56, z + 0.44);
    H.line(
      R,
      [
        [p[0] - 6, p[1]],
        [p[0] + 6, p[1]]
      ],
      'paper',
      0.85
    );
  }
  for (const a of [i + 0.1, i + w - 0.1])
    bentTube(
      H,
      R,
      [
        [a, j + d * 0.32, z + 0.39],
        [a, j + d * 0.39, z + 0.62],
        [a, j + d * 0.66, z + 0.62],
        [a, j + d * 0.73, z + 0.39]
      ],
      1.5,
      'teal'
    );
}

const room = world(
  'hong-kong-lau-fau-shan-oysters',
  'Lau Fau Shan · Shells after the tide',
  { floor: 'paper', tone: 1, wall: false, head: 55 },
  (H, R) => {
    surface(H, R, H.tile(0, 0, 12, 12, 0.02), 'teal', 0.12);
    for (let i = 0.4; i < 12; i += 1.3)
      for (let j = 0.3; j < 12; j += 1.25) H.line(R, [H.p(i, j, 0.025), H.p(i + 0.41, j + 0.08, 0.025)], 'blue', 0.5, { tone: 0.23 });
    masonry(H, R, 'nw', 0, 12, 0, 3.68, 'paper');
    for (const i of [0.39, 5.98, 11.51]) timber(H, R, i, 0.48, 0.19, 0.23, 0.04, 3.77, 'teal');
    surface(H, R, H.faceI(0.44, 0.58, 11.16, 1.08, 3.54), 'paper', 1);
    surface(H, R, H.faceI(0.49, 0.6, 11.04, 1.13, 2.32), 'teal', 0.28);
    for (let n = 0; n < 16; n++)
      H.line(R, [H.p(0.6 + n * 0.67, 0.61, 1.4 + (n % 3) * 0.2), H.p(1.07 + n * 0.67, 0.61, 1.4 + (n % 3) * 0.2)], 'paper', 1.1);
    for (const z of [1.09, 2.47, 3.62]) timber(H, R, 0.4, 0.49, 11.3, 0.24, z, 0.13, 'teal');
    for (const j of [0.48, 2.54])
      bentTube(
        H,
        R,
        [
          [0.39, j, 3.83],
          [11.56, j, 3.83]
        ],
        2.4,
        'teal'
      );
    for (let n = 0; n < 15; n++)
      surface(
        H,
        R,
        [H.p(0.32 + n * 0.75, 0.36, 3.99), H.p(1.05 + n * 0.75, 0.36, 3.99), H.p(1.05 + n * 0.75, 2.9, 3.66), H.p(0.32 + n * 0.75, 2.9, 3.66)],
        n % 6 === 0 ? 'teal' : 'paper',
        0.6,
        0.45
      );
    surface(H, R, H.faceJ(0.12, 2.8, 5.95, 1.89, 3.28), 'teal', 0.47);
    for (const j of [2.86, 5.7, 8.68]) timber(H, R, 0.11, j, 0.2, 0.2, 0.05, 3.35, 'sun');
    timber(H, R, 0.11, 2.86, 0.23, 5.96, 3.3, 0.12, 'sun');
    timber(H, R, 0.2, 2.99, 1.07, 5.52, 2.52, 0.11, 'sun');
    foldedCloth(H, R, 0.35, 3.19, 0.76, 1.15, 2.67, 'paper', 'coral');
    boundBook(H, R, 0.35, 4.6, 0.73, 0.94, 2.68, 'coral');
    for (const j of [6.21, 7.48]) {
      basket(H, R, 0.3, j, 0.81, 0.9, 2.65, false);
      handTool(H, R, 0.72, j + 0.37, 3.2, 'brush', 'sun');
    }
    bentTube(H, R, [[0.17, 10.9, 0.04], [0.17, 10.9, 1.49], [0.17, 9.09, 1.49], [0.61, 9.09, 1.49]], 2.3, 'teal');
    H.outline(R, ell(...H.p(0.39, 9.09, 1.67), 6, 5), 'coral', 2);
    coiledLine(H, R, 1.5, 10.12, 0.06, 22, 'teal');
    bentTube(H, R, [[0.61, 9.09, 1.49], [1.09, 9.37, 0.05], [1.5, 10.12, 0.06]], 1.9, 'teal');
    rackFrame(H, R, 0.43, 2.9, 1.55, 5.91, 0.12, [0.07, 0.88, 1.71], 'teal', (i, j, w, d, z, row) => {
      for (let n = 0; n < 4; n++) basket(H, R, i, j + n * 1.4, w, 1.29, z, row !== 2 || n < 2);
    });
    for (const i of [3.62, 7.63]) basket(H, R, i, 5.19, 1.39, 1.4, 0.16, true);
    benchFrame(H, R, 3.18, 4.82, 5.25, 2.23, 1.03, 'teal');
    metal(H, R, 3.24, 4.89, 5.1, 2.07, 1.05, 0.09, 'paper');
    for (const [i, j, w, d] of [
      [3.46, 5.06, 1.23, 1.65],
      [4.92, 5.06, 1.78, 1.65],
      [6.88, 5.06, 1.2, 1.65]
    ]) {
      shallowTray(H, R, i, j, w, d, 1.15, 'teal');
      for (const a of [i + 0.09, i + w - 0.15]) metal(H, R, a, j + d - 0.09, 0.08, 0.13, 1.15, 0.2, 'sun');
      for (let n = 0; n < 7; n++)
        shell(H, R, ...H.p(i + 0.21 + (n % 3) * 0.3, j + 0.23 + Math.floor(n / 3) * 0.4, 1.19), 0.62, n * 0.83, n % 3 === 0);
    }
    for (let n = 0; n < 10; n++) shell(H, R, ...H.p(5.19 + n % 3 * 0.44, 5.28 + Math.floor(n / 3) * 0.34, 1.38 + (n % 2) * 0.12), 0.76, n * 1.3, n % 4 === 0);
    metal(H, R, 3.31, 6.93, 5.0, 0.19, 0.72, 0.1, 'teal');
    bentTube(H, R, [[8.27, 6.99, 0.76], [8.65, 7.29, 0.31], [8.65, 10.99, 0.05]], 1.7, 'teal');
    for (const i of [3.45, 8.01]) bentTube(H, R, [[i, 4.99, 0.2], [i, 6.9, 0.86]], 2, 'sun');
    drape(H, R, 4.43, 6.64, 0.66, 0.36, 1.18, 0.59, 'paper');
    handTool(H, R, 7.97, 6.71, 1.2, 'brush', 'sun');
    benchFrame(H, R, 5.53, 1.04, 2.27, 1.61, 1.31, 'sun');
    metal(H, R, 6.12, 1.37, 0.9, 0.79, 1.32, 0.24, 'teal');
    bentTube(H, R, [[6.54, 1.76, 1.53], [6.54, 1.76, 1.95]], 3, 'teal');
    basin(H, R, 5.89, 1.16, 1.35, 1.18, 1.61);
    const [sx, sy] = H.p(6.57, 2.16, 1.52);
    surface(H, R, ell(sx, sy, 13, 13), 'paper', 1);
    for (let n = 0; n < 9; n++) {
      const a = -2.7 + n * 0.48;
      H.line(R, [[sx + Math.cos(a) * 9, sy + Math.sin(a) * 9], [sx + Math.cos(a) * 11, sy + Math.sin(a) * 11]], 'blue', 0.7);
    }
    H.line(R, [[sx, sy], [sx - 5, sy - 7]], 'coral', 1.4);
    foldedCloth(H, R, 5.69, 2.13, 0.52, 0.35, 1.35, 'paper', 'coral');
    basin(H, R, 8.81, 1.96, 2.08, 2.18, 0.42);
    benchFrame(H, R, 9.38, 4.96, 2.13, 2.41, 0.82, 'teal');
    washBasin(H, R, 9.45, 5.03, 1.99, 2.27, 0.85, 'paper');
    bentTube(
      H,
      R,
      [
        [10.31, 6.17, 0.83],
        [10.31, 6.17, 0.26],
        [11.28, 6.17, 0.17],
        [11.28, 10.84, 0.17]
      ],
      2,
      'teal'
    );
    for (let n = 0; n < 16; n++) H.line(R, [H.p(3.01 + n * 0.52, 10.88, 0.03), H.p(3.01 + n * 0.52, 11.17, 0.03)], 'blue', 1);
    for (const [i, j, w, d] of [
      [2.58, 9.17, 1.78, 1.65],
      [6.76, 9.32, 1.73, 1.51],
      [9.23, 9.37, 1.82, 1.66]
    ])
      basket(H, R, i, j, w, d, 0.04, i < 8);
    benchFrame(H, R, 5.14, 7.65, 1.13, 1.08, 0.6, 'sun');
    hangingRail(H, R, 'nw', 9.09, 2.48, 2.88, 4, (P, u, n) => {
      const [x, y] = P(u, -0.16);
      surface(
        H,
        R,
        [
          [x - 8, y],
          [x + 8, y],
          [x + 11, y + 35],
          [x - 10, y + 38]
        ],
        n % 2 ? 'paper' : 'coral',
        0.58
      );
      H.line(
        R,
        [
          [x - 5, y + 4],
          [x - 3, y + 30]
        ],
        'teal',
        0.7
      );
    });
    const [fx, fy] = H.p(0.28, 1.65, 2.41);
    surface(H, R, ell(fx, fy, 24, 24), 'paper', 0.9);
    for (let n = 0; n < 3; n++) {
      const a = n * TAU / 3;
      surface(H, R, [[fx, fy], [fx + Math.cos(a) * 20, fy + Math.sin(a) * 20], [fx + Math.cos(a + 0.7) * 16, fy + Math.sin(a + 0.7) * 16]], 'teal', 0.66);
    }
    for (const r of [8, 15, 22]) H.outline(R, ell(fx, fy, r, r), 'blue', 0.75);
    H.line(R, [[fx - 23, fy], [fx + 23, fy]], 'blue', 0.7);
    H.line(R, [[fx, fy - 23], [fx, fy + 23]], 'blue', 0.7);
    bentTube(H, R, [[0.14, 1.65, 1.76], [0.28, 1.65, 2.4]], 3, 'sun');
    pendant(H, R, 5.91, 3.53, 3.92, 2.94, 'teal', 1.04);
  },
  (H, R, t) => {
    const u = cycle(t, 14);
    H.at(5.79, 8.04, 0, (HH) =>
      actor(
        HH,
        R,
        5.79,
        8.04,
        t,
        'hongKongOysterAssess',
        {
          shirt: ['paper', 1],
          apron: ['coral', 0.62],
          hairStyle: 'cap',
          face: 'nw',
          prop(h, r, p) {
            const [x, y] = p.nearHand;
            shell(h, r, x - 3, y - 2, 0.95, Math.sin(u * TAU) * 0.23, true);
            stroke(h, r, [p.farHand, [x + 5, y + 3]], 'coral', 2, 0.48);
          }
        },
        0,
        1.39
      )
    );
    const [x, y] = H.p(9.81, 3.03, 0.66);
    H.outline(R, ell(x, y, 14 + Math.sin(u * TAU) * 2, 4), 'paper', 0.65, { tone: 0.61 });
  }
);

room.loopSeconds = 14;
room.stillTime = 0;
export default room;
