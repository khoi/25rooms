import { specimen } from '../joinery.js';
import { shallowTray, foldedCloth, coiledLine, boundBook, satchel } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, bench, actor, plant, cycle, TAU, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -6, head: 14, al: 72, el: 24, ar: 38, er: 92 };
FIGURES.clips.newYorkChessConsider = { dur: 16, keys: [[0, seated], [.14, seated], [.28, { ...seated, al: 52, el: 95, head: -4 }], [.46, { ...seated, al: 52, el: 95, head: 8 }], [.6, seated], [.76, { ...seated, head: -10, ar: 50, er: 75 }], [.88, seated], [1, seated]] };
const observer = { ...seated, al: 28, el: 112, ar: 24, er: 130 };
FIGURES.clips.newYorkChessReply = { dur: 16, keys: [[0, observer], [.4, observer], [.57, { ...observer, ar: 65, er: 23, head: 18 }], [.72, { ...observer, ar: 65, er: 23, head: 18 }], [.88, observer], [1, observer]] };

function piece(H, R, x, y, ink = 'paper', knight = false, size = 1) {
  oval(H, R, x, y, 4.2 * size, 1.7 * size, ink, 1);
  shape(H, R, [[x - 3 * size, y], [x - 1.7 * size, y - 6 * size], [x + 1.7 * size, y - 6 * size], [x + 3 * size, y]], ink, 1, .55);
  if (knight) shape(H, R, [[x - 2 * size, y - 5 * size], [x - 3 * size, y - 11 * size], [x + 1 * size, y - 14 * size], [x + 4 * size, y - 9 * size], [x + 1 * size, y - 7 * size]], ink, 1, .55);
  else oval(H, R, x, y - 7 * size, 2.5 * size, 2.5 * size, ink, 1);
}

function foldingChair(H, R, i, j, ink) {
  const corners = [[i, j], [i + .85, j], [i + .85, j + .9], [i, j + .9]];
  for (const [x, y] of corners) stroke(H, R, [H.p(x, y, .04), H.p(x + .07, j + .45, .6), H.p(x, j + .9 - (y - j), .04)], 'blue', 1.3);
  box(H, R, i, j, .85, .9, .6, .09, ink, .7);
  box(H, R, i, j + .83, .85, .09, .7, .62, ink, .65);
  for (let n = 0; n < 4; n++) H.line(R, [H.p(i + .08, j + .93, .8 + n * .13), H.p(i + .77, j + .93, .8 + n * .13)], 'paper', .7);
}

function planter(H, R, i, j, w, d) {
  box(H, R, i, j, w, d, .02, .78, 'teal', .65);
  shape(H, R, H.tile(i + .1, j + .1, w - .2, d - .2, .82), 'blue', .63, .6);
  for (let n = 0; n < Math.ceil(w / .7); n++) plant(H, R, ...H.p(i + .4 + n * .62, j + d / 2, .79), .64);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(i, j + d, .15 + n * .12), H.p(i + w, j + d, .15 + n * .12)], 'paper', .6, { tone: .5 });
}

function jacksonHeightsDetails(H, R) {
  table(H, R, 0.8, 7.26, 2.44, 0.91, 0.55, 'teal');
  boundBook(H, R, 1.03, 7.4, 0.87, 0.59, 0.69, 'sun');
  satchel(H, R, 2.69, 7.71, 0.69, 'coral', 0.65);
  for (const j of [8.7, 9.39]) {
    stroke(H, R, [H.p(0.87, j, 0.03), H.p(0.87, j + 0.52, 0.97), H.p(1.6, j + 0.52, 0.97), H.p(1.6, j, 0.03)], 'blue', 2);
    box(H, R, 0.9, j + 0.18, 0.66, 0.16, 0.94, 0.36, 'teal', 0.5);
  }
  shallowTray(H, R, 9.16, 8.07, 1.21, 1.01, 1.0, 'paper');
  for (let n = 0; n < 4; n++)
    piece(H, R, ...H.p(9.4 + (n % 2) * 0.53, 8.33 + Math.floor(n / 2) * 0.42, 1.2), n % 2 ? 'blue' : 'paper', n === 2, 0.52);
  box(H, R, 8.79, 10.02, 2.16, 0.79, 0.04, 0.56, 'sun', 0.4);
  for (let n = 0; n < 6; n++) H.line(R, [H.p(8.9 + n * 0.33, 10.82, 0.12), H.p(8.9 + n * 0.33, 10.82, 0.49)], 'blue', 0.8);
  foldedCloth(H, R, 9, 10.17, 1.7, 0.48, 0.65, 'teal', 'paper');
  const [x, y] = H.p(3.86, 2.92, 0.06);
  oval(H, R, x, y, 20, 8, 'blue', 0.6);
  H.line(
    R,
    [
      [x - 11, y],
      [x + 11, y]
    ],
    'sun',
    2
  );
  for (const i of [1.26, 10.72]) {
    box(H, R, i, 1.1, 0.44, 0.44, 0.02, 0.73, 'blue', 0.6);
    H.line(R, [H.p(i + 0.05, 1.57, 0.61), H.p(i + 0.39, 1.57, 0.61)], 'sun', 2);
  }
  coiledLine(H, R, 3.4, 9.07, 0.04, 10, 'teal');
  for (const [i, j] of [
    [1.66, 3.73],
    [10.48, 6.9],
    [3.04, 10.93]
  ])
    oval(H, R, ...H.p(i, j, 0.03), 4, 2, 'coral', 0.35);
}

function construction(H, R) {
  for (let n = 0; n < 8; n++) {
    const i = 0.5 + n * 1.45;
    shape(H, R, H.tile(i, 0.91, 1.25, 0.3, 0.025), 'teal', 0.25, 0.5);
    H.line(R, [H.p(i + 0.1, 1.23, 0.03), H.p(i + 1.14, 1.23, 0.03)], 'paper', 1.1);
  }
  for (const [i, j] of [
    [0.79, 2.3],
    [10.48, 1.51],
    [10.62, 5.17]
  ]) {
    const [x, y] = H.p(i, j, 0.86);
    specimen(H, R, x, y, 0.87, 'teal', true);
    for (let n = 0; n < 4; n++)
      H.line(
        R,
        [
          [x - 13 + n * 8, y + 12],
          [x - 13 + n * 8, y + 21]
        ],
        'sun',
        0.65
      );
  }
  for (const i of [4.76, 7.29])
    for (const j of [4.86, 7.18]) {
      H.line(R, [H.p(i, j, 0.15), H.p(i, j, 0.89)], 'sun', 0.8);
      H.dot(...H.p(i, j, 0.67), 1.3, 'blue');
    }
  const [x, y] = H.p(7.31, 5.91, 1.45);
  for (const dx of [-5, 5]) {
    oval(H, R, x + dx, y, 4, 4, 'paper', 1);
    H.line(
      R,
      [
        [x + dx, y],
        [x + dx + 2, y - 2]
      ],
      'blue',
      0.8
    );
  }
  H.line(
    R,
    [
      [x - 7, y - 8],
      [x - 2, y - 8]
    ],
    'sun',
    2
  );
  H.line(
    R,
    [
      [x + 3, y - 8],
      [x + 8, y - 8]
    ],
    'paper',
    2
  );
  for (let n = 0; n < 5; n++) {
    const [px, py] = H.p(4.87 + n * 0.23, 7.17, 1.18);
    piece(H, R, px, py, n % 2 ? 'blue' : 'paper', n === 3, 0.57);
  }
  const [px, py] = H.p(1.46, 7.71, 0.72);
  shape(
    H,
    R,
    [
      [px - 13, py],
      [px + 11, py],
      [px + 13, py - 14],
      [px - 10, py - 14]
    ],
    'paper',
    1,
    0.6
  );
  for (let n = 0; n < 4; n++)
    H.line(
      R,
      [
        [px - 8, py - 10 + n * 3],
        [px + 7, py - 10 + n * 3]
      ],
      'teal',
      0.5
    );
  H.line(
    R,
    [
      [px + 10, py - 10],
      [px + 17, py + 4]
    ],
    'coral',
    1.1
  );
  box(H, R, 1.01, 5.27, 0.81, 0.65, 0.04, 1.44, 'teal', 0.5);
  shape(H, R, H.faceI(1.09, 5.945, 0.63, 0.63, 1.25), 'paper', 1, 0.6);
  for (let n = 0; n < 5; n++) {
    const z = 0.7 + n * 0.1;
    H.line(R, [H.p(1.2, 5.96, z), H.p(1.63, 5.96, z)], n % 2 ? 'coral' : 'teal', 0.8);
  }
  box(H, R, 0.95, 5.22, 0.94, 0.77, 1.49, 0.09, 'sun', 0.5);
  for (const i of [8.95, 10.73]) H.line(R, [H.p(i, 10.11, 0.14), H.p(i, 10.73, 0.52)], 'blue', 1.4);
  for (let n = 0; n < 3; n++) {
    const [ax, ay] = H.p(3.39 + n * 0.25, 10.47, 0.03);
    shape(
      H,
      R,
      [
        [ax - 5, ay],
        [ax + 5, ay],
        [ax + 3, ay - 5]
      ],
      'sun',
      0.3,
      0.45
    );
  }
  const [ax, ay] = H.p(3.92, 2.92, 3.72);
  for (let n = 0; n < 6; n++) {
    const a = (n * TAU) / 6;
    H.line(
      R,
      [
        [ax + Math.cos(a) * 8, ay + Math.sin(a) * 3],
        [ax + Math.cos(a) * 41, ay + Math.sin(a) * 18 + 11]
      ],
      'blue',
      0.6
    );
  }
}

const room = world('new-york-jackson-heights', 'Jackson Heights · One More Move', { floor: 'paper', tone: .78, wall: false, head: 20 }, (H, R) => {
  for (let i = 0; i < 12; i += 1.5) for (let j = 0; j < 12; j += 1.5) H.outline(R, H.tile(i, j, 1.5, 1.5, .02), 'blue', .5, { tone: .24, amp: .08 });
  shape(H, R, H.tile(.15, .15, 11.65, 1.1, .04), 'blue', .38, .6);
  for (let i = .5; i < 11.7; i += .6) H.line(R, [H.p(i, .22, .05), H.p(i, 1.1, .05)], 'paper', .75, { tone: .5 });
  planter(H, R, .4, 1.3, 3.1, 1.15);
  planter(H, R, 7.9, 1.3, 3.4, 1.15);
  planter(H, R, .4, 7.9, 1.2, 2.9);
  for (const i of [.65, 4.5, 7.3, 11.4]) {
    oval(H, R, ...H.p(i, .66, .08), 6, 3, 'blue', .6);
    box(H, R, i - .06, .6, .12, .12, .07, .88, 'blue', .7);
    oval(H, R, ...H.p(i, .66, .98), 3.6, 1.8, 'sun', .8);
  }
  box(H, R, 3.87, 2.85, .28, .28, 0, 3.8, 'blue', .75);
  const center = H.p(4.01, 2.99, 4.13);
  const canopy = Array.from({ length: 8 }, (_, n) => H.p(4.01 + Math.cos(n * TAU / 8) * 2.58, 2.99 + Math.sin(n * TAU / 8) * 1.65, 3.42));
  for (let n = 0; n < 8; n++) shape(H, R, [center, canopy[n], canopy[(n + 1) % 8]], n % 2 ? 'paper' : 'sun', n % 2 ? 1 : .65, .75);
  for (let n = 0; n < 8; n++) H.line(R, [center, canopy[n]], 'blue', .65, { tone: .7 });
  oval(H, R, ...H.p(4.01, 2.99, .05), 16, 8, 'blue', .6);
  bench(H, R, 8.2, 3.17, 2.6, 'coral');
  for (let n = 0; n < 6; n++) H.line(R, [H.p(8.3 + n * .43, 3.22, .57), H.p(8.3 + n * .43, 3.89, .57)], 'paper', .7);
  foldingChair(H, R, 5.4, 7.54, 'coral');
  foldingChair(H, R, 5.37, 3.62, 'teal');
  table(H, R, 4.6, 4.7, 2.9, 2.7, 1.02, 'paper');
  shape(H, R, H.tile(4.89, 4.9, 2.35, 2.35, 1.16), 'sun', .5, .7);
  for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) shape(H, R, H.tile(4.94 + i * .28, 4.95 + j * .28, .28, .28, 1.18), (i + j) % 2 ? 'teal' : 'paper', (i + j) % 2 ? .68 : 1, .2);
  for (const [i, j, ink, knight] of [[0, 0, 'blue'], [2, 0, 'blue'], [5, 1, 'blue'], [6, 2, 'blue', true], [3, 3, 'blue'], [2, 4, 'paper'], [5, 5, 'paper'], [1, 6, 'paper'], [6, 7, 'paper']]) piece(H, R, ...H.p(5.08 + i * .28, 5.09 + j * .28, 1.2), ink, knight, .74);
  box(H, R, 7.04, 5.42, .43, .93, 1.16, .24, 'coral', .75);
  for (let n = 0; n < 2; n++) {
    const [x, y] = H.p(7.49, 5.61 + n * .43, 1.34);
    oval(H, R, x, y, 4.2, 5.4, 'paper', 1);
    H.line(R, [[x, y - 3], [x, y], [x + 2, y + 1]], 'blue', .6);
  }
  table(H, R, 9.1, 7.95, 1.43, 1.3, .86, 'sun');
  const [cx, cy] = H.p(9.6, 8.45, 1.03);
  oval(H, R, cx, cy - 8, 6, 8, 'paper', 1);
  oval(H, R, cx, cy - 16, 6, 2.5, 'blue', .5);
  shape(H, R, H.tile(9.88, 8.23, .4, .62, 1.02), 'coral', .7, .5);
  foldingChair(H, R, 9.46, 9.59, 'teal');
  box(H, R, 2.26, 9.93, 1.07, .72, .04, .52, 'coral', .6);
  stroke(H, R, [H.p(2.42, 10.08, .57), H.p(2.58, 10.02, 1), H.p(3.01, 10.1, .55)], 'blue', 1.7);
  shape(H, R, H.tile(2.44, 9.86, .64, .54, .59), 'paper', 1, .55);
  for (let n = 0; n < 4; n++) H.line(R, [H.p(2.55, 9.92 + n * .1, .6), H.p(2.98, 9.92 + n * .1, .6)], 'teal', .6);
  const [px, py] = H.p(8.05, 10.76, .08);
  oval(H, R, px, py - 5, 9, 6, 'blue', .5);
  oval(H, R, px + 6, py - 11, 4, 4, 'teal', .7);
  shape(H, R, [[px + 9, py - 12], [px + 14, py - 10], [px + 9, py - 9]], 'sun', .8, .4);
  H.dot(px + 7, py - 12, .9, 'blue', 1);
  for (const dx of [-2, 3]) H.line(R, [[px + dx, py], [px + dx - 1, py + 4]], 'coral', 1);
  jacksonHeightsDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 16);
  actor(H, R, 5.81, 4.04, u * 16, 'newYorkChessReply', { face: 'se', shirt: ['teal', .7], hairStyle: 'curly', skin: ['coral', .5] }, .05, 1.32);
  actor(H, R, 5.86, 7.97, u * 16, 'newYorkChessConsider', { face: 'ne', shirt: ['coral', .7], hairStyle: 'bald', glasses: true, prop(h, r, points) {
    const [x, y] = points.nearHand;
    piece(h, r, x + 1, y + 3, 'paper', true, .95);
  } }, .05, 1.4, 'elder');
  actor(H, R, 8.96, 3.59, u * 3, 'sit', { shirt: ['sun', .62], hairStyle: 'pony', face: 'sw' }, .05, 1.25);
  const [x, y] = H.p(10.22, 2.03, 1.88);
  const sway = Math.sin(u * TAU) * 4;
  stroke(H, R, [[x, y + 13], [x + 4 + sway, y - 6], [x + sway, y - 19]], 'teal', 1.2);
  oval(H, R, x + sway - 5, y - 9, 5, 2.8, 'teal', .7);
});
room.loopSeconds = 16;
export default room;
