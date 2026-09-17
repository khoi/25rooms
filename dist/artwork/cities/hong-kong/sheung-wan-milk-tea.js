import { surface, timber, metal, vessel, bentTube, drape, benchFrame, pendant, floorLight, caneChair } from '../materials.js';
import { masonry, archedBay, cabinetFrame, basin as washBasin } from '../structure.js';
import { windowBay, cityView, hangingRail } from '../joinery.js';
import { shallowTray, coiledLine } from '../furnishings.js';
import { actor, cycle, ell, oval, shape, steam, stroke, wallRect, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const pourRight = { ...rest, al: -42, el: -35, ar: 143, er: -9, head: 13, lean: -3 };
const lowered = { ...rest, al: -48, el: -45, ar: 48, er: 45, head: 8 };
const pourLeft = { ...rest, al: -143, el: 9, ar: 42, er: 35, head: 13, lean: 3 };
FIGURES.clips.hongKongTeaTransfer = {
  dur: 18,
  keys: [
    [0, pourRight],
    [0.2, pourRight],
    [0.31, lowered],
    [0.38, lowered],
    [0.49, pourLeft],
    [0.69, pourLeft],
    [0.8, lowered],
    [0.88, lowered],
    [1, pourRight]
  ]
};

function cup(H, R, x, y, ink = 'paper', s = 1) {
  oval(H, R, x, y + 2 * s, 9 * s, 3 * s, 'paper', 1);
  shape(
    H,
    R,
    [
      [x - 6 * s, y - 11 * s],
      [x + 6 * s, y - 11 * s],
      [x + 5 * s, y],
      [x - 5 * s, y]
    ],
    ink,
    0.85,
    0.65
  );
  oval(H, R, x, y - 11 * s, 6 * s, 2.5 * s, 'blue', 0.38);
  stroke(
    H,
    R,
    [
      [x + 6 * s, y - 9 * s],
      [x + 11 * s, y - 10 * s],
      [x + 11 * s, y - 3 * s],
      [x + 6 * s, y - 2 * s]
    ],
    'blue',
    0.9
  );
}

function pot(H, R, x, y, direction, filter, tea, tilt = 0) {
  const p = (a, b) => [x + a * Math.cos(tilt) - b * Math.sin(tilt), y + a * Math.sin(tilt) + b * Math.cos(tilt)];
  shape(H, R, [p(-11, 0), p(11, 0), p(9, -23), p(-9, -23)], 'paper', 1);
  shape(H, R, [p(direction * 8, -19), p(direction * 24, -23), p(direction * 16, -8), p(direction * 10, -6)], 'paper', 0.9);
  stroke(H, R, [p(-direction * 10, -20), p(-direction * 20, -19), p(-direction * 21, -7), p(-direction * 10, -5)], 'blue', 2.1);
  H.line(R, [p(-6, -19), p(-5, -4)], 'teal', 1.3, { tone: 0.55 });
  oval(H, R, ...p(0, -23), 9, 3.5, tea ? 'sun' : 'blue', tea ? 0.58 : 0.25);
  if (filter) {
    const [fx, fy] = p(0, -24);
    shape(
      H,
      R,
      [
        [fx - 8, fy],
        [fx + 8, fy],
        [fx + 5, fy + 16],
        [fx - 2, fy + 19],
        [fx - 6, fy + 12]
      ],
      'coral',
      0.43,
      0.65
    );
    for (const a of [-4, 0, 4])
      H.line(
        R,
        [
          [fx + a, fy + 2],
          [fx + a * 0.45, fy + 14]
        ],
        'blue',
        0.55,
        { tone: 0.35 }
      );
    oval(H, R, fx, fy, 10, 3, 'paper', 0.88);
    oval(H, R, fx, fy, 7, 1.6, 'sun', 0.62);
    H.line(
      R,
      [
        [fx - 15, fy],
        [fx - 9, fy],
        [fx + 9, fy],
        [fx + 15, fy]
      ],
      'blue',
      1.5
    );
  }
  return { spout: p(direction * 24, -23), mouth: p(0, -26) };
}

const room = world(
  'hong-kong-sheung-wan-milk-tea',
  'Sheung Wan · The long pour',
  { floor: 'paper', tone: 1, wall: false, head: 55 },
  (H, R) => {
    for (let i = 0; i < 12; i += 1.2)
      for (let j = 0; j < 12; j += 1.2) surface(H, R, H.tile(i, j, 1.18, 1.18, 0.02), (Math.round(i + j) * 5) % 2 ? 'teal' : 'paper', 0.13, 0.4);
    masonry(H, R, 'nw', 0, 12, 0, 4.43, 'paper');
    masonry(H, R, 'ne', 0, 12, 0, 4.43, 'paper');
    for (const side of ['ne', 'nw']) surface(H, R, wallRect(H, side, 0.05, 11.92, 0.1, 1.7, -0.08), 'teal', 0.25);
    archedBay(H, R, 'nw', 1.22, 4.88, 2.06, 2.05, 'teal', (P) => cityView(H, R, P, 4.88, 2.05));
    windowBay(H, R, 'ne', 7.37, 4.02, 2.15, 1.83, { ink: 'coral', divisions: 3, view: (P) => cityView(H, R, P, 4.02, 1.83) });
    cabinetFrame(H, R, 2.06, 0.43, 4.77, 1.25, 0.1, 1.31, 3, 'teal', (i, j, w, d, z, h, n) => {
      timber(H, R, i, j, w, d, z + 0.5, 0.07, 'sun');
      for (let k = 0; k < 3; k++) {
        cup(H, R, ...H.p(i + 0.2 + k * 0.38, j + 0.55, z + 0.61), 'paper', 0.7);
        vessel(H, R, i + 0.23 + k * 0.38, j + 0.4, z + 0.12, 5, 14, n === 1 ? 'coral' : 'teal');
      }
    });
    metal(H, R, 1.98, 0.36, 4.94, 1.37, 1.41, 0.12, 'paper');
    for (let n = 0; n < 6; n++) vessel(H, R, 2.42 + n * 0.72, 0.98, 1.55, 9, 17, n % 2 ? 'paper' : 'teal', n === 4);
    hangingRail(H, R, 'ne', 2.08, 4.48, 3.89, 6, (P, u, n) => {
      const [x, y] = P(u, -0.1);
      H.line(
        R,
        [
          [x, y],
          [x, y + 20]
        ],
        'sun',
        1.6
      );
      if (n < 3) surface(H, R, ell(x, y + 26, 7, 10), 'paper', 1);
      else
        surface(
          H,
          R,
          [
            [x - 8, y + 18],
            [x + 8, y + 18],
            [x + 6, y + 45],
            [x - 6, y + 42]
          ],
          n % 2 ? 'paper' : 'coral',
          0.6
        );
    });
    benchFrame(H, R, 0.36, 3.08, 1.8, 4.81, 1.27, 'teal');
    washBasin(H, R, 0.45, 3.26, 1.6, 1.9, 1.29);
    for (let n = 0; n < 6; n++) {
      const [x, y] = H.p(1.25, 5.69 + n * 0.28, 1.49);
      surface(H, R, ell(x, y, 10, 13), 'paper', 1);
      H.outline(R, ell(x, y, 7, 10), 'teal', 0.7);
    }
    drape(H, R, 0.5, 7.12, 0.58, 0.61, 1.43, 0.76, 'paper');
    bentTube(
      H,
      R,
      [
        [1.16, 4.22, 1.25],
        [1.16, 4.22, 0.54],
        [1.42, 4.22, 0.41],
        [1.68, 4.22, 0.57],
        [1.68, 4.22, 0.95]
      ],
      2.2,
      'teal'
    );
    benchFrame(H, R, 3.26, 3.71, 2.04, 1.65, 1.24, 'sun');
    metal(H, R, 3.33, 3.8, 1.88, 1.48, 1.25, 0.14, 'paper');
    vessel(H, R, 4.44, 4.64, 1.43, 18, 29, 'paper');
    bentTube(
      H,
      R,
      [
        [4.1, 4.61, 1.47],
        [3.81, 4.61, 1.67],
        [3.7, 4.7, 1.57]
      ],
      1.7,
      'teal'
    );
    for (let n = 0; n < 8; n++) H.line(R, [H.p(3.48 + n * 0.2, 5.16, 1.42), H.p(3.48 + n * 0.2, 4.98, 1.42)], 'blue', 0.7);
    coiledLine(H, R, 4.02, 4.44, 0.32, 12, 'teal');
    const outline = [
      [7.69, 3.21],
      [10.72, 3.21],
      [11.35, 3.75],
      [11.35, 5.22],
      [10.89, 5.77],
      [8.32, 5.77],
      [7.69, 5.14]
    ];
    surface(
      H,
      R,
      outline.map(([i, j]) => H.p(i, j, 0.09)),
      'teal',
      0.55
    );
    for (let n = 0; n < outline.length; n++) {
      const [i, j] = outline[n],
        [a, b] = outline[(n + 1) % outline.length];
      surface(H, R, [H.p(i, j, 0.1), H.p(a, b, 0.1), H.p(a, b, 1.12), H.p(i, j, 1.12)], 'teal', 0.43);
      H.line(R, [H.p(i, j, 0.37), H.p(a, b, 0.37)], 'sun', 1.2);
    }
    surface(
      H,
      R,
      outline.map(([i, j]) => H.p(i, j, 1.15)),
      'paper',
      1,
      1.1
    );
    for (let n = 0; n < 5; n++) cup(H, R, ...H.p(8.36 + n * 0.55, 4.63, 1.17), n === 2 ? 'coral' : 'paper', 0.9);
    shallowTray(H, R, 8.08, 3.53, 2.62, 0.66, 1.19, 'sun');
    for (let n = 0; n < 4; n++) {
      const [x, y] = H.p(8.4 + n * 0.57, 3.82, 1.31);
      surface(H, R, ell(x, y, 7, 4), 'sun', 0.5);
      H.line(
        R,
        [
          [x - 5, y],
          [x + 4, y - 2]
        ],
        'coral',
        0.9
      );
    }
    caneChair(H, R, 8.99, 8.53, 'teal');
    benchFrame(H, R, 9.64, 9.06, 1.44, 1.2, 0.9, 'sun');
    cup(H, R, ...H.p(10.28, 9.57, 0.94), 'paper', 0.9);
    cabinetFrame(H, R, 0.62, 9.54, 3.71, 1.53, 0.07, 0.92, 3, 'sun', (i, j, w, d, z, h, n) => {
      for (let k = 0; k < 3; k++) surface(H, R, H.tile(i + 0.04, j, w - 0.08, d - 0.07, z + 0.1 + k * 0.13), 'paper', 1, 0.4);
    });
    pendant(H, R, 5.11, 4.24, 4.4, 3.41, 'coral', 1.1);
    floorLight(H, 6.21, 6.53, 77, 0.28);
  },
  (H, R, t) => {
    const u = cycle(t, 18);
    H.at(5.6, 6.1, 0, (HH) =>
      actor(
        HH,
        R,
        5.6,
        6.1,
        u * 18,
        'hongKongTeaTransfer',
        {
          shirt: ['paper', 1],
          pants: ['blue', 0.73],
          apron: ['teal', 0.73],
          hairStyle: 'short',
          prop: (h, r, p) => {
            const rightPour = u < 0.24 || u > 0.94;
            const leftPour = u > 0.47 && u < 0.73;
            const right = pot(h, r, p.nearHand[0] + 8, p.nearHand[1] + 6, -1, false, true, rightPour ? -0.1 : 0);
            const left = pot(h, r, p.farHand[0] - 8, p.farHand[1] + 6, 1, true, true, leftPour ? 0.1 : 0);
            const source = rightPour ? right : left;
            const target = rightPour ? left : right;
            if (rightPour || leftPour) {
              const [sx, sy] = source.spout,
                [ex, ey] = target.mouth;
              stroke(
                h,
                r,
                [
                  [sx, sy],
                  [(sx + ex) / 2, (sy + ey) / 2 + 3],
                  [ex, ey]
                ],
                'sun',
                2.4
              );
              h.line(
                r,
                [
                  [sx, sy + 1],
                  [ex, ey + 1]
                ],
                'coral',
                0.7,
                { tone: 0.5 }
              );
            }
          }
        },
        0,
        1.52
      )
    );
    H.at(9.9, 6.36, 0, (HH) =>
      actor(
        HH,
        R,
        9.9,
        6.36,
        u * 3,
        'hold',
        { shirt: ['sun', 0.55], hairStyle: 'bun', prop: (h, r, p) => cup(h, r, p.nearHand[0], p.nearHand[1] + 3, 'paper', 0.7) },
        0,
        1.16
      )
    );
    steam(H, R, ...H.p(4.44, 4.64, 1.79), u * 10, 2, 'paper');
  }
);
room.loopSeconds = 18;
export default room;
