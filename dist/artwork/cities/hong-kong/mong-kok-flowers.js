import { surface, vessel, bentTube, drape, benchFrame, pendant, branchSpray } from '../materials.js';
import { masonry, archedBay, cabinetFrame, basin as washBasin } from '../structure.js';
import { cityView } from '../joinery.js';
import { shallowTray, foldedCloth, coiledLine, handTool } from '../furnishings.js';
import { TAU, actor, cycle, ell, oval, shape, stroke, world } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const arrange = { ...rest, lean: -8, head: 12, al: 58, ar: 64, el: 48, er: 42 };
FIGURES.clips.hongKongFlowerArrange = {
  dur: 14,
  keys: [
    [0, arrange],
    [0.15, arrange],
    [0.32, { ...arrange, al: 77, el: 22, ar: 62, head: 18 }],
    [0.46, { ...arrange, al: 64, el: 53, ar: 78, er: 29 }],
    [0.6, { ...arrange, al: 48, el: 85, ar: 52, er: 76, head: -4 }],
    [0.77, { ...arrange, al: 48, el: 85, ar: 52, er: 76, head: -4 }],
    [0.94, arrange],
    [1, arrange]
  ]
};

function stem(H, R, x, y, length, ink, lean = 0, kind = 0) {
  stroke(
    H,
    R,
    [
      [x, y],
      [x + lean * 0.27, y - length * 0.48],
      [x + lean, y - length]
    ],
    'teal',
    1.2
  );
  for (let n = 0; n < 3; n++) {
    const side = n % 2 ? 1 : -1,
      xx = x + lean * (0.25 + n * 0.2),
      yy = y - length * (0.22 + n * 0.2);
    const leaf = [
      [xx, yy],
      [xx + side * 3, yy - 8],
      [xx + side * 12, yy - 12],
      [xx + side * 10, yy - 3]
    ];
    surface(H, R, leaf, 'teal', 0.6, 0.4);
    H.line(
      R,
      [
        [xx, yy],
        [xx + side * 10, yy - 10]
      ],
      'paper',
      0.45
    );
  }
  const xx = x + lean,
    yy = y - length;
  if (kind) {
    for (let n = 0; n < 5; n++) {
      const a = (n * TAU) / 5;
      surface(
        H,
        R,
        [
          [xx, yy],
          [xx + Math.cos(a - 0.4) * 7, yy + Math.sin(a - 0.4) * 7],
          [xx + Math.cos(a) * 12, yy + Math.sin(a) * 12],
          [xx + Math.cos(a + 0.3) * 6, yy + Math.sin(a + 0.3) * 6]
        ],
        ink,
        0.72,
        0.4
      );
      H.line(
        R,
        [
          [xx, yy],
          [xx + Math.cos(a) * 8, yy + Math.sin(a) * 8]
        ],
        'paper',
        0.6
      );
    }
  } else {
    for (let row = 0; row < 3; row++)
      for (let n = 0; n < 7; n++) {
        const a = ((n + row * 0.45) * TAU) / 7,
          rad = 7 - row * 2;
        const p = [xx + Math.cos(a) * rad, yy + Math.sin(a) * rad * 0.8];
        oval(H, R, ...p, 3.6 - row * 0.5, 3.1 - row * 0.4, ink, 0.5 + row * 0.13);
      }
  }
  H.dot(xx, yy, 1.8, 'sun', 1, { knock: true });
}

function bucket(H, R, i, j, z, ink, count = 6, tall = false) {
  const [x, y] = H.p(i, j, z);
  shape(
    H,
    R,
    [
      [x - 13, y - 23],
      [x + 13, y - 23],
      [x + 10, y],
      [x - 10, y]
    ],
    'blue',
    0.5,
    0.85
  );
  oval(H, R, x, y - 23, 13, 5, 'paper', 1);
  oval(H, R, x, y - 23, 10, 3, 'teal', 0.45);
  for (let q = 0; q < count; q++)
    stem(H, R, x - 7 + (q * 14) / count, y - 24, 24 + (q % 3) * 6 + (tall ? 15 : 0), ink, (q - count / 2) * 3.3, tall ? 1 : 0);
  stroke(
    H,
    R,
    [
      [x - 12, y - 17],
      [x - 17, y - 7],
      [x, y + 3],
      [x + 17, y - 7],
      [x + 12, y - 17]
    ],
    'paper',
    0.7,
    0.8
  );
}

function wrap(H, R, x, y, length = 27) {
  shape(
    H,
    R,
    [
      [x - 16, y - length],
      [x + 15, y - length - 5],
      [x + 6, y + 10],
      [x - 3, y + 10]
    ],
    'paper',
    1,
    0.7
  );
  H.line(
    R,
    [
      [x - 8, y - 8],
      [x + 8, y - 10]
    ],
    'coral',
    2.2
  );
}

const room = world(
  'hong-kong-mong-kok-flowers',
  'Mong Kok · Water between stems',
  { floor: 'paper', tone: 1, wall: false, head: 70 },
  (H, R) => {
    surface(H, R, H.tile(0, 0, 12, 12, 0.02), 'teal', 0.09);
    for (let j = 0.2; j < 12; j += 0.74) H.line(R, [H.p(0.1, j, 0.03), H.p(11.9, j, 0.03)], 'blue', 0.45, { tone: 0.2 });
    masonry(H, R, 'nw', 0, 12, 0, 4.24, 'paper');
    masonry(H, R, 'ne', 0, 12, 0, 4.65, 'paper');
    archedBay(H, R, 'ne', 5.1, 6.26, 1.91, 2.36, 'teal', (P) => cityView(H, R, P, 6.26, 2.36));
    for (let row = 0; row < 3; row++) {
      const i = 0.34 + row * 0.8,
        z = 2.18 - row * 0.73;
      benchFrame(H, R, i, 0.71, 0.8, 5.79, z, 'teal');
      for (let n = 0; n < 5; n++) bucket(H, R, i + 0.41, 1.22 + n * 1.13, z + 0.04, ['coral', 'paper', 'sun'][(n + row) % 3], 5, row === 0);
    }
    for (const j of [1.22, 4.55]) {
      const [x, y] = H.p(0.25, j, 3.9);
      bentTube(
        H,
        R,
        [
          [0.12, j, 4.13],
          [0.62, j, 3.84]
        ],
        1.4,
        'teal'
      );
      for (let n = 0; n < 4; n++) branchSpray(H, R, x + (n - 2) * 4, y + 20, 0.8, 'teal', n % 2 ? 1 : -1);
      vessel(H, R, 0.43, j, 3.1, 10, 14, 'coral');
    }
    cabinetFrame(H, R, 4.18, 0.56, 1.63, 1.8, 0.08, 1.2, 1, 'sun', (i, j, w, d, z) => {
      for (let n = 0; n < 4; n++) surface(H, R, H.tile(i + 0.04, j + 0.07, w - 0.08, d - 0.14, z + 0.12 + n * 0.18), 'paper', 1, 0.4);
    });
    for (let n = 0; n < 4; n++) {
      const [x, y] = H.p(4.35 + n * 0.34, 1.14, 1.45);
      surface(H, R, ell(x, y, 6, 7), 'coral', 0.5);
      surface(H, R, ell(x, y, 2.8, 3), 'paper', 1);
    }
    benchFrame(H, R, 4.11, 4.65, 3.92, 2.03, 1.14, 'sun');
    drape(H, R, 4.19, 4.78, 1.63, 1.83, 1.16, 0.63, 'paper');
    for (let n = 0; n < 3; n++) surface(H, R, H.tile(6.41, 4.93, 1.41, 1.03, 1.17 + n * 0.022), n === 2 ? 'sun' : 'paper', n === 2 ? 0.15 : 1, 0.4);
    for (let n = 0; n < 7; n++) {
      const [x, y] = H.p(4.52 + n * 0.27, 5.39, 1.19);
      stem(H, R, x, y, 22 + (n % 3) * 4, n % 2 ? 'paper' : 'coral', 12, 0);
    }
    handTool(H, R, 7.38, 6.25, 1.24, 'scissors', 'coral');
    vessel(H, R, 7.52, 5.21, 1.2, 8, 13, 'teal');
    for (let n = 0; n < 6; n++) H.line(R, [H.p(5.28 + n * 0.27, 6.81, 0.03), H.p(5.09 + n * 0.27, 7.3, 0.03)], 'teal', 0.8);
    benchFrame(H, R, 9.55, 2.35, 1.79, 2.35, 1.12, 'teal');
    washBasin(H, R, 9.63, 2.43, 1.62, 2.17, 1.14);
    coiledLine(H, R, 10.43, 5.32, 0.04, 24, 'teal');
    for (let n = 0; n < 3; n++) bucket(H, R, 10.54, 6.24 + n * 0.71, 0.04, ['sun', 'coral', 'paper'][n], 5, false);
    cabinetFrame(H, R, 0.54, 8.18, 2.67, 2.52, 0.07, 1.16, 2, 'teal', (i, j, w, d, z, h, n) => {
      for (let q = 0; q < 2; q++) vessel(H, R, i + w * 0.5, j + 0.35 + q * 0.86, z + 0.11, 10, 23, n ? 'paper' : 'teal', true);
    });
    for (let n = 0; n < 3; n++) wrap(H, R, ...H.p(0.95 + n * 0.77, 9.14, 1.33), 37);
    bentTube(
      H,
      R,
      [
        [3.09, 9.03, 0.1],
        [3.09, 9.03, 2.2]
      ],
      2,
      'teal'
    );
    const [rx, ry] = H.p(3.09, 9.03, 2.2);
    surface(H, R, ell(rx, ry, 21, 21), 'teal', 0.37);
    surface(H, R, ell(rx, ry, 15, 15), 'paper', 1);
    for (let n = 0; n < 11; n++) {
      const a = (n * TAU) / 11;
      stem(H, R, rx + Math.cos(a) * 20, ry + Math.sin(a) * 20, 6, 'paper', Math.cos(a) * 3, 0);
    }
    shallowTray(H, R, 7.5, 9.77, 1.44, 1.39, 0.03, 'sun');
    foldedCloth(H, R, 7.69, 10, 1.06, 1.02, 0.21, 'paper', 'coral');
    pendant(H, R, 6.48, 4.94, 4.52, 3.38, 'coral', 0.98);
  },
  (H, R, t) => {
    const u = cycle(t, 14);
    actor(
      H,
      R,
      6.62,
      7.16,
      t,
      'hongKongFlowerArrange',
      {
        shirt: ['paper', 1],
        apron: ['teal', 0.7],
        hairStyle: 'bun',
        face: 'nw',
        prop(HH, RR, points) {
          const [x, y] = points.farHand;
          const twist = Math.sin(TAU * u) * 4;
          wrap(HH, RR, x, y + 4, 24);
          for (let q = 0; q < 5; q++) stem(HH, RR, x + q - 2, y + 4, 29 + (q % 3) * 4, q % 2 ? 'paper' : 'coral', (q - 2) * 5 + twist);
          const [nx, ny] = points.nearHand;
          stroke(
            HH,
            RR,
            [
              [nx, ny],
              [x + 2, y - 5],
              [x + 9, y - 8]
            ],
            'coral',
            1.2
          );
        }
      },
      0,
      1.38
    );
    actor(
      H,
      R,
      9.55,
      8.66,
      0,
      'hold',
      {
        shirt: ['sun', 0.63],
        face: 'nw',
        hairStyle: 'short',
        prop(HH, RR, points) {
          const [x, y] = points.nearHand;
          stroke(
            HH,
            RR,
            [
              [x - 7, y + 10],
              [x - 6, y],
              [x + 5, y],
              [x + 8, y + 10]
            ],
            'blue',
            1
          );
          shape(
            HH,
            RR,
            [
              [x - 11, y + 8],
              [x + 12, y + 8],
              [x + 10, y + 30],
              [x - 10, y + 30]
            ],
            'paper',
            1,
            0.8
          );
          oval(HH, RR, x, y + 18, 5, 4, 'coral', 0.6);
        }
      },
      0,
      1.28
    );
    const [x, y] = H.p(3.3, 2.25, 0.55);
    H.opacity(0.15 + 0.12 * Math.sin(u * TAU) ** 2, () =>
      H.outline(
        R,
        [
          [x - 6, y - 4],
          [x + 5, y - 3],
          [x + 7, y]
        ],
        'paper',
        0.8
      )
    );
  }
);

room.loopSeconds = 14;
room.stillTime = 0;
export default room;
