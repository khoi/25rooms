import { surface, bentTube, slattedSeat } from '../materials.js';
import { panelFront } from '../joinery.js';
import { shallowTray, liddedTin, foldedCloth, coiledLine, handTool, servicePipe } from '../furnishings.js';
import { world, shape, oval, stroke, box, actor, cycle, TAU, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const hold = { ...rest, lean: -7, al: 55, el: 58, ar: 58, er: 54, head: 13 };
FIGURES.clips.hongKongMooring = { dur: 16, keys: [[0, hold], [.12, hold], [.3, { ...hold, lean: -14, ar: 83, er: 8, al: 66, el: 24 }], [.48, { ...hold, lean: -12, ar: 73, er: 25, al: 56, el: 45 }], [.66, hold], [.82, { ...hold, head: -12 }], [1, hold]] };

function ropeCoil(H, R, x, y, rx, ry, ink = 'sun') {
  for (let k = 0; k < 5; k++) H.outline(R, ell(x + k * .7, y - k * .4, rx - k * 2.1, ry - k * .8), ink, 2, { tone: .8, amp: .15 });
}

function deck(H, R) {
  const hull = [
    [2.2, 1.3],
    [6.7, 1.3],
    [7.8, 3],
    [7.4, 9.2],
    [4.8, 11],
    [2.1, 9.4],
    [1.6, 3.2]
  ];
  shape(
    H,
    R,
    hull.map(([i, j]) => H.p(i, j, 0.28)),
    'blue',
    0.75,
    1.2
  );
  const rim = [
    [2.3, 1.4],
    [6.5, 1.4],
    [7.4, 3.1],
    [7.05, 9.1],
    [4.8, 10.5],
    [2.45, 9.2],
    [1.96, 3.2]
  ];
  shape(
    H,
    R,
    rim.map(([i, j]) => H.p(i, j, 0.64)),
    'coral',
    0.61
  );
  const inner = [
    [2.5, 1.7],
    [6.3, 1.7],
    [7.06, 3.1],
    [6.73, 8.85],
    [4.8, 10.06],
    [2.77, 8.93],
    [2.27, 3.2]
  ].map(([i, j]) => H.p(i, j, 0.65));
  shape(H, R, inner, 'sun', 0.46);
  H.clip(inner, () => {
    for (let j = 1.75; j < 10.4; j += 0.4) H.line(R, [H.p(2.1, j, 0.67), H.p(7.3, j, 0.67)], 'blue', 0.7, { tone: 0.5 });
    for (let j = 2.05; j < 9.8; j += 0.8) for (const i of [2.65, 6.66]) H.dot(...H.p(i, j, 0.68), 1.2, 'blue', 0.5);
  });
  for (const j of [3.6, 6.3, 8.4]) {
    const [x, y] = H.p(7.25, j, 0.47);
    oval(H, R, x, y + 8, 8, 13, 'blue', 0.81);
    oval(H, R, x, y + 8, 3.5, 7, 'teal', 0.6);
    stroke(H, R, [H.p(7.1, j, 0.8), [x - 3, y - 3], [x + 2, y + 1]], 'sun', 1.3);
  }
  for (const i of [2.65, 6.5]) {
    for (const j of [2.1, 5.65]) box(H, R, i, j, 0.1, 0.1, 0.7, 2.25, 'blue', 0.6);
    stroke(H, R, [H.p(i, 2.15, 2.9), H.p(i, 3.65, 3.25), H.p(i, 5.7, 2.9)], 'sun', 2);
  }
  for (let n = 0; n < 12; n++) {
    const a = n / 12,
      b = (n + 1) / 12;
    surface(
      H,
      R,
      [
        H.p(2.5 + 4.25 * a, 1.8, 2.91 + Math.sin(a * Math.PI) * 0.55),
        H.p(2.5 + 4.25 * b, 1.8, 2.91 + Math.sin(b * Math.PI) * 0.55),
        H.p(2.5 + 4.25 * b, 4.55, 2.91 + Math.sin(b * Math.PI) * 0.55),
        H.p(2.5 + 4.25 * a, 4.55, 2.91 + Math.sin(a * Math.PI) * 0.55)
      ],
      n % 3 === 0 ? 'paper' : 'teal',
      0.45,
      0.4
    );
  }
  for (const j of [1.8, 4.55]) {
    const points = Array.from({ length: 17 }, (_, n) => [2.5 + (n * 4.25) / 16, j, 2.91 + Math.sin((n / 16) * Math.PI) * 0.55]);
    bentTube(H, R, points, 2, 'sun');
  }
  for (const i of [2.5, 6.75]) {
    bentTube(
      H,
      R,
      [
        [i, 4.55, 2.93],
        [i, 5.55, 2.63],
        [i, 5.65, 0.72]
      ],
      1.5,
      'sun'
    );
    for (let n = 0; n < 9; n++) surface(H, R, ell(...H.p(i, 1.92 + n * 0.29, 2.94), 1.3, 1.3), 'sun', 0.8, 0.3);
  }
  surface(H, R, [H.p(2.5, 4.55, 2.91), H.p(6.75, 4.55, 2.91), H.p(6.75, 4.65, 2.65), H.p(2.5, 4.65, 2.65)], 'coral', 0.56);
  slattedSeat(H, R, 2.75, 2.05, 3.65, 0.69, 'sun', 0.53);
  for (let i = 2.82; i < 6.4; i += 0.38) H.line(R, [H.p(i, 2.1, 1.15), H.p(i, 2.61, 1.15)], 'paper', 0.7);
  box(H, R, 2.8, 4.37, 1.25, 0.87, 0.68, 0.45, 'paper', 1);
  H.line(R, [H.p(3.42, 4.4, 1.15), H.p(3.42, 5.18, 1.15)], 'coral', 2);
  box(H, R, 2.85, 5.9, 1.18, 0.84, 0.69, 0.2, 'blue', 0.62);
  for (let k = 0; k < 6; k++) H.line(R, [H.p(2.91 + k * 0.18, 5.95, 0.92), H.p(2.91 + k * 0.18, 6.69, 0.92)], 'teal', 2);
  const [rx, ry] = H.p(2.77, 7.52, 1.04);
  oval(H, R, rx, ry, 19, 16, 'coral', 0.85);
  oval(H, R, rx, ry, 11, 9, 'paper', 1);
  for (const a of [0, Math.PI / 2, Math.PI, Math.PI * 1.5])
    H.line(
      R,
      [
        [rx + Math.cos(a) * 12, ry + Math.sin(a) * 11],
        [rx + Math.cos(a) * 18, ry + Math.sin(a) * 16]
      ],
      'paper',
      4
    );
  stroke(H, R, [H.p(2.62, 6.63, 1.03), H.p(2.74, 7.7, 1.66), H.p(2.88, 8.55, 0.96)], 'sun', 1.2);
  const [bx, by] = H.p(4.9, 9.38, 0.7);
  shape(
    H,
    R,
    [
      [bx - 13, by - 19],
      [bx + 13, by - 19],
      [bx + 10, by],
      [bx - 10, by]
    ],
    'paper',
    1
  );
  oval(H, R, bx, by - 19, 13, 5, 'teal', 0.54);
  stroke(
    H,
    R,
    [
      [bx - 12, by - 17],
      [bx - 10, by - 34],
      [bx + 10, by - 34],
      [bx + 12, by - 17]
    ],
    'blue',
    1.2
  );
  H.line(R, [H.p(3.2, 8.7, 0.78), H.p(3.3, 3.5, 1.04)], 'sun', 3);
  shape(H, R, [H.p(3.12, 8.65, 0.81), H.p(3.43, 8.64, 0.81), H.p(3.48, 9.58, 0.81), H.p(3.12, 9.58, 0.81)], 'coral', 0.65);
  for (const [i, j] of [
    [5.9, 2.9],
    [5.9, 3.4]
  ]) {
    const [x, y] = H.p(i, j, 0.69);
    oval(H, R, x, y - 4, 7, 4, 'blue', 0.8);
    H.line(
      R,
      [
        [x - 5, y - 5],
        [x + 4, y - 7]
      ],
      'paper',
      1
    );
  }
  const [tx, ty] = H.p(6.15, 4.87, 0.72);
  shape(
    H,
    R,
    [
      [tx - 5, ty],
      [tx + 5, ty],
      [tx + 5, ty - 21],
      [tx - 5, ty - 21]
    ],
    'sun',
    0.7
  );
  oval(H, R, tx, ty - 21, 5, 2, 'blue', 0.8);
  ropeCoil(H, R, ...H.p(4.56, 7.98, 0.7), 25, 10);
}

function aberdeenMooringDetails(H, R) {
  shallowTray(H, R, 9.48, 7.5, 1.65, 1.05, 0.9, 'teal');
  handTool(H, R, 9.87, 7.84, 1.02, 'spanner');
  handTool(H, R, 10.56, 8.08, 1.03, 'brush', 'sun');
  liddedTin(H, R, 10.74, 7.55, 1.03, 6, 14, 'coral', true);
  servicePipe(
    H,
    R,
    [
      [11.35, 7.2, 0.9],
      [11.35, 7.2, 1.6],
      [10.9, 7.2, 1.6]
    ],
    'teal'
  );
  oval(H, R, ...H.p(11.35, 7.2, 1.45), 5, 5, 'coral', 0.7);
  coiledLine(H, R, 10.58, 8.87, 0.91, 19, 'teal');
  box(H, R, 8.41, 9.49, 0.45, 0.9, 0.94, 0.07, 'sun', 0.45);
  for (let n = 0; n < 4; n++) H.line(R, [H.p(8.43, 9.57 + n * 0.2, 1.03), H.p(8.84, 9.57 + n * 0.2, 1.03)], 'blue', 0.8);
  for (const j of [10.5, 11.1])
    servicePipe(
      H,
      R,
      [
        [8.5, j, 1],
        [8.18, j, 1],
        [8.18, j, 0.08]
      ],
      'sun',
      2
    );
  for (const z of [0.2, 0.47, 0.74]) H.line(R, [H.p(8.17, 10.5, z), H.p(8.17, 11.1, z)], 'blue', 2);
  foldedCloth(H, R, 3.05, 6.05, 0.64, 0.42, 0.96, 'paper', 'coral');
  shallowTray(H, R, 3.32, 8.61, 0.8, 0.63, 0.7, 'teal');
  for (const i of [3.54, 3.86]) oval(H, R, ...H.p(i, 8.87, 0.84), 5, 3, 'sun', 0.65);
  box(H, R, 4.78, 5.92, 1.04, 0.85, 0.69, 0.07, 'teal', 0.6);
  H.line(R, [H.p(5.15, 6.62, 0.79), H.p(5.49, 6.62, 0.79)], 'blue', 2);
  for (const [i, j] of [
    [4.89, 6.04],
    [5.68, 6.04],
    [4.89, 6.64],
    [5.68, 6.64]
  ])
    H.dot(...H.p(i, j, 0.79), 1.1, i < 5 && j > 6.5 ? 'coral' : 'paper');
  shape(H, R, H.tile(5.3, 2.25, 0.76, 0.87, 2.94), 'coral', 0.4, 0.6);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(5.29 + n * 0.16, 2.22, 2.96), H.p(5.29 + n * 0.16, 2.4, 2.96)], 'paper', 1);
}

function construction(H, R) {
  for (const j of [1.2, 4.6, 8.15, 10.55]) {
    box(H, R, 8.55, j - 0.08, 0.7, 0.62, 0.88, 0.06, 'teal', 0.6);
    for (const i of [8.63, 9.14])
      for (const y of [j + 0.01, j + 0.44]) {
        H.dot(...H.p(i, y, 0.96), 1.5, 'blue');
        H.line(R, [H.p(i - 0.035, y, 0.97), H.p(i + 0.035, y, 0.97)], 'paper', 0.65);
      }
  }
  for (const j of [2.25, 5.32, 8.8]) {
    const [x, y] = H.p(8.38, j, 0.44);
    shape(
      H,
      R,
      [
        [x - 6, y - 19],
        [x + 5, y - 19],
        [x + 7, y + 10],
        [x - 6, y + 10]
      ],
      'blue',
      0.7,
      0.8
    );
    for (let n = 0; n < 4; n++)
      H.line(
        R,
        [
          [x - 5, y - 12 + n * 5],
          [x + 6, y - 12 + n * 5]
        ],
        'teal',
        1.2
      );
    H.line(R, [H.p(8.43, j, 0.91), [x, y - 12]], 'sun', 1.4);
  }
  for (const j of [1.9, 2.3, 2.7]) {
    box(H, R, 9.82, j, 0.84, 0.12, 1.55, 0.06, 'sun', 0.5);
    H.dot(...H.p(9.94, j + 0.07, 1.63), 1, 'blue');
  }
  const [wx, wy] = H.p(10.3, 2.9, 1.14);
  oval(H, R, wx, wy, 14, 13, 'teal', 0.65);
  oval(H, R, wx, wy, 10, 9, 'sun', 0.5);
  for (let n = 0; n < 8; n++) {
    const a = (n * TAU) / 8;
    H.line(
      R,
      [
        [wx, wy],
        [wx + Math.cos(a) * 12, wy + Math.sin(a) * 11]
      ],
      'blue',
      0.8
    );
  }
  H.line(
    R,
    [
      [wx, wy],
      [wx + 22, wy - 9],
      [wx + 22, wy - 18]
    ],
    'blue',
    2
  );
  H.line(
    R,
    [
      [wx + 22, wy - 18],
      [wx + 29, wy - 18]
    ],
    'coral',
    3
  );
  stroke(H, R, [[wx - 12, wy + 5], H.p(9.6, 3.7, 0.93), H.p(8.8, 4.76, 1.38)], 'sun', 1.8);
  box(H, R, 10.8, 5.1, 0.46, 0.4, 0.9, 1.04, 'paper', 1);
  panelFront(H, R, 10.83, 5.52, 0.4, 1.02, 0.76, 1, 'teal');
  H.line(R, [H.p(11.02, 5.54, 1.56), H.p(11.02, 5.54, 1.79)], 'coral', 1.5);
  for (let n = 0; n < 8; n++) {
    const j = 1.7 + n * 0.48;
    H.line(R, [H.p(2.48, j, 2.91), H.p(2.48, j, 2.72)], 'blue', 0.8);
    H.dot(...H.p(2.49, j, 2.7), 1.2, 'sun');
  }
  for (const i of [2.66, 6.5]) {
    H.line(R, [H.p(i, 2.1, 1.95), H.p(i, 2.9, 2.92)], 'sun', 1.4);
    H.line(R, [H.p(i, 5.6, 1.94), H.p(i, 4.9, 2.94)], 'sun', 1.4);
  }
  for (let n = 0; n < 6; n++) H.line(R, [H.p(2.74 + n * 0.61, 2.69, 0.77), H.p(2.74 + n * 0.61, 2.69, 1.02)], 'blue', 0.7);
  const [mx, my] = H.p(4.55, 5.32, 0.76);
  shape(
    H,
    R,
    [
      [mx - 20, my - 3],
      [mx + 12, my - 11],
      [mx + 24, my + 2],
      [mx - 10, my + 10]
    ],
    'paper',
    1,
    0.7
  );
  stroke(
    H,
    R,
    [
      [mx - 16, my],
      [mx - 5, my - 4],
      [mx + 1, my + 2],
      [mx + 16, my - 2]
    ],
    'teal',
    1.3
  );
  H.line(
    R,
    [
      [mx - 9, my - 5],
      [mx + 7, my + 6]
    ],
    'coral',
    0.65
  );
  oval(H, R, mx + 11, my, 3, 3, 'sun', 0.8);
  for (let n = 0; n < 7; n++) {
    const [x, y] = H.p(6.7, 8.1 + n * 0.15, 0.69);
    H.line(
      R,
      [
        [x - 5, y],
        [x + 3, y - 1]
      ],
      'paper',
      0.9
    );
  }
  shape(H, R, H.tile(9.57, 9.7, 0.18, 0.75, 0.92), 'paper', 1, 0.5);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(9.59, 9.75 + n * 0.14, 0.94), H.p(9.74, 9.75 + n * 0.14, 0.94)], 'coral', 0.8);
}

const room = world('hong-kong-aberdeen-mooring', 'Aberdeen · First rope ashore', { floor: 'teal', tone: .4, wall: false, head: 20 }, (H, R) => {
  for (let j = .3; j < 12; j += .62) for (let i = .1; i < 12; i += 1.4) H.line(R, [H.p(i, j, .03), H.p(i + .62, j, .03)], 'paper', 1, { tone: .36 });
  box(H, R, 8.4, .4, 3.25, 11.05, .09, .65, 'blue', .57);
  box(H, R, 8.4, .4, 3.25, 11.05, .75, .12, 'paper', .84);
  for (let j = .55; j < 11.5; j += .48) H.line(R, [H.p(8.47, j, .9), H.p(11.58, j, .9)], 'blue', .7, { tone: .5 });
  for (const j of [1.2, 4.6, 8.15, 10.55]) {
    box(H, R, 8.71, j, .27, .3, .88, .42, 'blue', .84);
    box(H, R, 8.55, j + .06, .62, .19, 1.25, .12, 'blue', .85);
    H.line(R, [H.p(8.58, j + .12, 1.4), H.p(9.12, j + .12, 1.4)], 'paper', 1);
  }
  for (const j of [1.1, 3.8, 6.3]) {
    H.line(R, [H.p(11.4, j, .88), H.p(11.4, j, 1.88)], 'blue', 2.5);
    if (j < 6) H.line(R, [H.p(11.4, j, 1.85), H.p(11.4, j + 2.7, 1.85)], 'teal', 2.2);
  }
  box(H, R, 10.14, 1.05, 1.0, 1.18, .89, .64, 'sun', .5);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(10.22 + k * .25, 2.25, 1.0), H.p(10.22 + k * .25, 2.25, 1.5)], 'blue', .8);
  box(H, R, 9.85, 2.7, .89, .75, .9, .19, 'teal', .7);
  ropeCoil(H, R, ...H.p(10.3, 4.45, .91), 20, 8, 'coral');
  const [cx, cy] = H.p(10.5, 10.15, .9);
  shape(H, R, [[cx - 10, cy], [cx + 10, cy], [cx + 8, cy - 25], [cx - 6, cy - 25]], 'teal', .58);
  stroke(H, R, [[cx - 6, cy - 24], [cx - 5, cy - 32], [cx + 6, cy - 31], [cx + 8, cy - 24]], 'blue', 1.5);
  deck(H, R);
  aberdeenMooringDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 16);
  for (const [i, j, phase] of [[1, 7.2, 0], [7.5, 10.8, .35], [6.5, .7, .65]]) {
    const q = (u + phase) % 1;
    const [x, y] = H.p(i, j, .04);
    H.opacity(Math.sin(q * Math.PI) * .6, () => H.outline(R, ell(x, y, 12 + q * 23, 3 + q * 5), 'paper', 1, { amp: .1 }));
  }
  H.at(6.36, 7.43, .68, HH => actor(HH, R, 6.36, 7.43, u * 16, 'hongKongMooring', { shirt: ['paper', 1], pants: ['teal', .7], hairStyle: 'cap', prop: (h, r, p) => {
    const [x, y] = p.nearHand;
    const end = h.p(8.76, 8.27, 1.4);
    stroke(h, r, [end, [end[0] - 17, end[1] + 15], [x + 26, y + 17], [x, y]], 'sun', 2.4);
    stroke(h, r, [p.farHand, [x - 10, y + 21], h.p(4.6, 7.95, .73)], 'sun', 2);
    ropeCoil(h, r, x + 2, y + 11, 14, 7);
  } }, .68, 1.3));
  H.at(10.17, 6.0, .89, HH => actor(HH, R, 10.17, 6.0, u * 3, 'hold', { shirt: ['coral', .67], hairStyle: 'short', prop: (h, r, p) => {
    const [x, y] = p.nearHand;
    shape(h, r, [[x - 8, y], [x + 7, y], [x + 5, y + 14], [x - 6, y + 14]], 'sun', .57);
    stroke(h, r, [[x - 7, y], [x - 4, y - 10], [x + 4, y - 10], [x + 7, y]], 'blue', 1);
  } }, .89, 1.2));
});
room.loopSeconds = 16;
export default room;
