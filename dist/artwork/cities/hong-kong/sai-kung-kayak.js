import { surface, timber, metal, vessel, bentTube, drape, benchFrame, pendant } from '../materials.js';
import { masonry, cabinetFrame, basin as washBasin } from '../structure.js';
import { windowBay, cityView, hangingRail } from '../joinery.js';
import { foldedCloth, coiledLine } from '../furnishings.js';
import { TAU, actor, box, cycle, ell, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const rinse = { ...rest, al: 22, ar: 74, el: 34, er: 12, lean: -7, head: 7 };
FIGURES.clips.hongKongKayakRinse = {
  dur: 16,
  keys: [
    [0, rinse],
    [0.12, rinse],
    [0.31, { ...rinse, ar: 97, er: 8, lean: -11, head: 10 }],
    [0.49, { ...rinse, ar: 58, er: 9, lean: -5, head: 14 }],
    [0.66, { ...rinse, ar: 95, er: 8, lean: -9 }],
    [0.79, rinse],
    [1, rinse]
  ]
};

function kayak(H, R, i, j, length, width, z, ink) {
  const hull = [],
    under = [];
  for (let q = 0; q <= 22; q++) {
    const f = q / 22,
      bulge = Math.sin(Math.PI * f) ** 0.72 * width;
    hull.push(H.p(i + f * length, j - bulge, z + Math.sin(Math.PI * f) * 0.13));
    under.push(H.p(i + f * length, j - bulge * 0.7, z - 0.19));
  }
  for (let q = 22; q >= 0; q--) {
    const f = q / 22,
      bulge = Math.sin(Math.PI * f) ** 0.72 * width;
    hull.push(H.p(i + f * length, j + bulge, z + Math.sin(Math.PI * f) * 0.13));
    under.push(H.p(i + f * length, j + bulge * 0.7, z - 0.19));
  }
  shape(H, R, under, 'blue', 0.64, 0.8);
  shape(H, R, hull, ink, 0.68, 0.9);
  H.line(R, [H.p(i + 0.2, j, z + 0.04), H.p(i + length - 0.2, j, z + 0.04)], 'paper', 1.1, { tone: 0.7 });
  const cockpit = [];
  for (let q = 0; q < 30; q++) {
    const a = (q * TAU) / 30;
    cockpit.push(H.p(i + length * 0.51 + Math.cos(a) * 0.91, j + Math.sin(a) * width * 0.65, z + 0.18));
  }
  shape(H, R, cockpit, 'blue', 0.73, 0.85);
  H.outline(R, cockpit, 'paper', 2.1, { tone: 0.85, amp: 0.1 });
  box(H, R, i + length * 0.52, j - width * 0.43, 0.38, width * 0.86, z + 0.18, 0.13, 'teal', 0.65);
  for (const pos of [0.2, 0.8]) {
    const hatch = [];
    for (let q = 0; q < 20; q++) {
      const a = (q * TAU) / 20;
      hatch.push(H.p(i + length * pos + Math.cos(a) * 0.33, j + Math.sin(a) * 0.32, z + 0.16));
    }
    shape(H, R, hatch, 'teal', 0.64, 0.65);
  }
  for (const pos of [0.14, 0.7])
    for (let q = 0; q < 3; q++) {
      const a = i + length * pos + q * 0.3;
      H.line(R, [H.p(a, j - width * 0.62, z + 0.16), H.p(a + 0.38, j + width * 0.62, z + 0.16)], 'blue', 0.9);
      H.line(R, [H.p(a, j + width * 0.62, z + 0.16), H.p(a + 0.38, j - width * 0.62, z + 0.16)], 'blue', 0.9);
    }
  for (const a of [i + 0.14, i + length - 0.2]) stroke(H, R, [H.p(a, j - 0.14, z), H.p(a, j, z + 0.16), H.p(a, j + 0.14, z)], 'blue', 1.3);
  for (const side of [-1, 1]) {
    const edge = [];
    for (let n = 1; n < 22; n++) {
      const f = n / 22;
      edge.push(H.p(i + f * length, j + side * Math.sin(f * Math.PI) ** 0.72 * width * 0.84, z + Math.sin(f * Math.PI) * 0.13 + 0.025));
    }
    H.line(R, edge, 'paper', 1.2);
    for (const f of [0.17, 0.32, 0.68, 0.83]) {
      const b = Math.sin(f * Math.PI) ** 0.72 * width * 0.83;
      surface(H, R, ell(...H.p(i + f * length, j + side * b, z + 0.16), 2.4, 1.6), 'blue', 0.7, 0.4);
    }
  }
  drape(H, R, i + length * 0.47, j - width * 0.31, 0.38, width * 0.61, z + 0.34, 0.21, 'coral');
  for (let n = 0; n < 4; n++)
    H.line(
      R,
      [H.p(i + length * 0.61 + n * 0.08, j - width * 0.21, z + 0.13), H.p(i + length * 0.61 + n * 0.08, j + width * 0.21, z + 0.13)],
      'paper',
      0.65
    );
}

function vest(H, R, i, z, ink) {
  const [x, y] = H.p(i, 0.35, z);
  H.line(
    R,
    [
      [x, y - 8],
      [x, y],
      [x - 13, y + 7],
      [x + 13, y + 7],
      [x, y]
    ],
    'blue',
    0.8
  );
  shape(
    H,
    R,
    [
      [x - 10, y + 5],
      [x - 4, y + 4],
      [x - 2, y + 15],
      [x + 2, y + 15],
      [x + 4, y + 4],
      [x + 10, y + 5],
      [x + 15, y + 32],
      [x - 15, y + 32]
    ],
    ink,
    0.73,
    0.8
  );
  H.line(
    R,
    [
      [x, y + 16],
      [x, y + 31]
    ],
    'blue',
    1.2
  );
  for (const dy of [21, 27]) {
    H.line(
      R,
      [
        [x - 12, y + dy],
        [x + 12, y + dy]
      ],
      'blue',
      2.2
    );
    shape(
      H,
      R,
      [
        [x - 3, y + dy - 2],
        [x + 3, y + dy - 2],
        [x + 3, y + dy + 2],
        [x - 3, y + dy + 2]
      ],
      'paper',
      1,
      0.5
    );
  }
}

function cradle(H, R, i, j, width = 1.85, height = 0.72) {
  for (const sign of [-1, 1]) H.line(R, [H.p(i, j + sign * width * 0.5, 0.03), H.p(i, j - sign * width * 0.34, height)], 'blue', 2.5);
  H.line(R, [H.p(i, j - width * 0.41, height), H.p(i, j + width * 0.41, height)], 'teal', 4);
  H.line(R, [H.p(i, j - width * 0.3, 0.24), H.p(i, j + width * 0.3, 0.24)], 'sun', 1.8);
}

const room = world(
  'hong-kong-sai-kung-kayak',
  'Sai Kung · Salt rinsed away',
  { floor: 'paper', tone: 1, wall: false, head: 70 },
  (H, R) => {
    surface(H, R, H.tile(0, 0, 12, 12, 0.02), 'teal', 0.1);
    for (let n = 0; n < 25; n++) H.line(R, [H.p(0.1 + n * 0.47, 9.05, 0.04), H.p(0.1 + n * 0.47, 9.34, 0.04)], 'blue', 0.75);
    masonry(H, R, 'nw', 0, 12, 0, 4.43, 'paper');
    windowBay(H, R, 'nw', 1.13, 5.42, 2.22, 1.82, { ink: 'teal', divisions: 4, view: (P) => cityView(H, R, P, 5.42, 1.82) });
    for (const i of [0.48, 5.81, 11.28]) {
      timber(H, R, i, 0.67, 0.19, 0.2, 0.04, 4.36, 'sun');
      for (const z of [0.73, 1.91, 3.1]) {
        metal(H, R, i, 0.68, 0.13, 2.02, z, 0.09, 'teal');
        bentTube(
          H,
          R,
          [
            [i, 0.78, z - 0.49],
            [i, 2.43, z]
          ],
          2,
          'teal'
        );
      }
    }
    for (let row = 0; row < 3; row++) kayak(H, R, 0.8, 1.7, 9.89, 0.64, 0.91 + row * 1.18, ['sun', 'teal', 'paper'][row]);
    for (const i of [2.32, 8.25]) cradle(H, R, i, 5.77, 1.98, 0.82);
    kayak(H, R, 1.19, 5.77, 8.57, 0.77, 1.04, 'coral');
    for (const i of [2.31, 8.22])
      bentTube(
        H,
        R,
        [
          [i, 4.89, 0.04],
          [i, 6.66, 0.04]
        ],
        2,
        'teal'
      );
    cabinetFrame(H, R, 0.32, 7.2, 1.88, 3.93, 0.06, 0.9, 1, 'teal', (i, j, w, d, z) => {
      for (let n = 0; n < 3; n++) foldedCloth(H, R, i + 0.11, j + 0.18 + n * 1.13, w - 0.22, 0.99, z + 0.2, n % 2 ? 'sun' : 'paper', 'teal');
    });
    const [hx, hy] = H.p(0.27, 9.78, 1.68);
    surface(H, R, ell(hx, hy, 25, 26), 'teal', 0.6);
    surface(H, R, ell(hx, hy, 18, 19), 'paper', 1);
    for (let n = 0; n < 5; n++) H.outline(R, ell(hx, hy, 7 + n * 2, 8 + n * 2), 'teal', 1.9);
    H.line(
      R,
      [
        [hx, hy],
        [hx + 21, hy + 13]
      ],
      'sun',
      2.4
    );
    H.dot(hx + 21, hy + 13, 3, 'coral');
    for (let n = 0; n < 4; n++) vest(H, R, 7.98 + n * 0.92, 4.0, ['sun', 'coral', 'teal', 'paper'][n]);
    hangingRail(H, R, 'ne', 7.73, 3.85, 4.18, 4, () => {});
    benchFrame(H, R, 9.8, 6.24, 1.65, 2.01, 1.06, 'teal');
    washBasin(H, R, 9.89, 6.34, 1.47, 1.79, 1.08);
    vessel(H, R, 10.64, 9.13, 0.04, 18, 28, 'paper');
    coiledLine(H, R, 9.72, 10.7, 0.04, 21, 'sun');
    for (let n = 0; n < 4; n++) {
      const i = 4.12 + n * 0.5;
      bentTube(
        H,
        R,
        [
          [i, 10.49, 0.04],
          [i, 10.49, 1.97]
        ],
        2,
        'sun'
      );
      surface(
        H,
        R,
        [H.p(i - 0.11, 10.49, 0.1), H.p(i + 0.11, 10.49, 0.1), H.p(i + 0.15, 10.49, 0.63), H.p(i - 0.15, 10.49, 0.63)],
        n % 2 ? 'teal' : 'coral',
        0.68
      );
    }
    timber(H, R, 3.87, 10.33, 2.38, 0.34, 0.03, 0.18, 'teal');
    for (const j of [0.57, 3.03])
      bentTube(
        H,
        R,
        [
          [0.37, j, 4.32],
          [5.86, j, 4.65],
          [11.49, j, 4.31]
        ],
        2.8,
        'teal'
      );
    pendant(H, R, 5.93, 3.22, 4.63, 3.48, 'paper', 1.08);
  },
  (H, R, t) => {
    const u = cycle(t, 16),
      spraying = u > 0.15 && u < 0.73;
    H.at(5.93, 8.03, 0, (HH) =>
      actor(
        HH,
        R,
        5.93,
        8.03,
        t,
        'hongKongKayakRinse',
        {
          shirt: ['paper', 1],
          pants: ['teal', 0.72],
          hairStyle: 'cap',
          face: 'nw',
          prop(h, r, p) {
            const [x, y] = p.farHand;
            const [sx, sy] = h.p(0.27, 9.78, 1.68);
            stroke(h, r, [[sx + 14, sy + 15], h.p(1.6, 10.1, 0.05), h.p(4.3, 9.46, 0.05), [x + 9, y + 18], [x + 1, y + 3]], 'teal', 2.7);
            h.line(
              r,
              [
                [x + 3, y + 5],
                [x - 6, y - 8],
                [x - 11, y - 10]
              ],
              'blue',
              3.4
            );
            h.line(
              r,
              [
                [x - 6, y - 8],
                [x - 11, y - 10]
              ],
              'sun',
              2.1
            );
            if (spraying) {
              const phase = (u - 0.15) / 0.58,
                target = h.p(4.1 + (1 - Math.cos(phase * TAU)) * 1.1, 5.77, 1.1);
              for (let q = 0; q < 5; q++) {
                const px = target[0] + (q - 2) * 3.3,
                  py = target[1] + (q % 2) * 2;
                h.line(
                  r,
                  [
                    [x - 12, y - 11],
                    [px, py]
                  ],
                  'paper',
                  0.8,
                  { tone: 0.66, amp: 0.15 }
                );
                h.dot(px, py + 2, 1.3, 'paper', 0.86, { knock: true });
              }
            }
          }
        },
        0,
        1.33
      )
    );
    H.at(10.7, 4.65, 0, (HH) =>
      actor(
        HH,
        R,
        10.7,
        4.65,
        0,
        'hold',
        {
          shirt: ['sun', 0.66],
          hairStyle: 'pony',
          face: 'sw',
          prop(h, r, p) {
            const [x, y] = p.nearHand;
            shape(
              h,
              r,
              [
                [x - 10, y - 7],
                [x + 9, y - 6],
                [x + 12, y + 10],
                [x - 10, y + 12]
              ],
              'teal',
              0.53,
              0.6
            );
            for (let q = 0; q < 3; q++)
              h.line(
                r,
                [
                  [x - 7, y - 3 + q * 4],
                  [x + 7, y - 2 + q * 4]
                ],
                'paper',
                0.8
              );
          }
        },
        0,
        1.22
      )
    );
  }
);
room.loopSeconds = 16;
room.stillTime = 0;
export default room;
