import { timber, metal } from '../materials.js';
import { hangingRail, specimen } from '../joinery.js';
import { shallowTray, foldedCloth, coiledLine, handTool, slattedCrate } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, plant, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const ready = { ...rest, lean: -12, head: 15, al: 41, ar: 58, el: 39, er: 26 };
FIGURES.clips.newYorkCompostTurn = { dur: 18, keys: [[0, ready], [.15, ready], [.31, { ...ready, lean: -22, ar: 74, al: 61, er: 10, el: 19 }], [.49, { ...ready, lean: -3, ar: 48, al: 48, er: 64, el: 68 }], [.64, { ...ready, lean: -11, ar: 69, al: 60, er: 33, el: 39 }], [.79, ready], [1, ready]] };
FIGURES.clips.newYorkGardenSort = { dur: 18, keys: [[0, { ...rest, head: 17, ar: 53, er: 59, al: 50, el: 62 }], [.35, { ...rest, head: 17, ar: 53, er: 59, al: 50, el: 62 }], [.54, { ...rest, lean: -8, head: 23, ar: 73, er: 18, al: 50, el: 62 }], [.7, { ...rest, head: 17, ar: 53, er: 59, al: 50, el: 62 }], [1, { ...rest, head: 17, ar: 53, er: 59, al: 50, el: 62 }]] };

function leaf(H, R, x, y, size, ink = 'teal') {
  shape(H, R, [[x, y], [x - size * .6, y - size * .7], [x - size * .25, y - size * 1.7], [x + size * .5, y - size * 1.2]], ink, .7, .55);
  H.line(R, [[x, y], [x - size * .1, y - size * 1.3]], 'blue', .6);
}

function compostBay(H, R, j, filled, open) {
  const i = 0.5,
    w = 2.6,
    d = 2.52;
  box(H, R, i, j, w, d, 0.04, 0.14, 'blue', 0.4);
  if (filled) {
    const heap = [
      H.p(i + 0.12, j + 0.18, 0.35),
      H.p(i + 1.15, j + 0.18, 0.94),
      H.p(i + 2.42, j + 0.72, 0.57),
      H.p(i + 2.41, j + 2.25, 0.45),
      H.p(i + 1.31, j + 2.29, 0.73),
      H.p(i + 0.14, j + 1.87, 0.49)
    ];
    shape(H, R, heap, filled === 2 ? 'blue' : 'teal', 0.68, 0.75);
    H.clip(heap, () => {
      H.speckle(R, heap, 'sun', 190, 0.6, 1.8, 0.55);
      for (let k = 0; k < 19; k++) {
        const [x, y] = H.p(i + 0.25 + R() * 2, j + 0.22 + R() * 1.9, 0.69);
        H.line(
          R,
          [
            [x - 4, y - 1],
            [x + 5, y + 1]
          ],
          k % 3 ? 'paper' : 'coral',
          1.2,
          { tone: 0.6 }
        );
      }
    });
  }
  for (let n = 0; n < 4; n++) {
    timber(H, R, i, j, 0.12, d, 0.17 + n * 0.22, 0.13, 'teal', 0.48);
    timber(H, R, i, j, w, 0.1, 0.17 + n * 0.22, 0.13, 'teal', 0.48);
    timber(H, R, i, j + d - 0.1, w, 0.1, 0.17 + n * 0.22, 0.13, 'teal', 0.5);
    if (!open || n < 2) timber(H, R, i + w - 0.1, j, 0.1, d, 0.17 + n * 0.22, 0.13, 'sun', 0.42);
  }
  for (const a of [i, i + w - 0.15]) for (const b of [j, j + d - 0.15]) box(H, R, a, b, 0.15, 0.15, 0.03, 1.11, 'blue', 0.65);
  if (open) {
    shape(H, R, [H.p(i, j, 1.14), H.p(i + 0.22, j, 2.17), H.p(i + 0.22, j + d, 2.17), H.p(i, j + d, 1.14)], 'sun', 0.35, 1);
    for (let k = 0; k < 6; k++) H.line(R, [H.p(i + 0.03, j + k * 0.42, 1.2), H.p(i + 0.2, j + k * 0.42, 2.1)], 'blue', 0.65);
    H.line(R, [H.p(i + 0.16, j + d - 0.3, 1.87), H.p(i + 0.93, j + d - 0.3, 0.99)], 'blue', 1.5);
  } else shape(H, R, H.tile(i, j, w, d, 1.17), 'paper', 0.9, 0.8);
  for (const y of [j + 0.18, j + d - 0.34]) {
    metal(H, R, i - 0.01, y, 0.22, 0.17, 1.08, 0.11, 'teal');
    H.line(R, [H.p(i - 0.035, y + 0.085, 1.14), H.p(i + 0.245, y + 0.085, 1.14)], 'sun', 1.2);
  }
  if (open) {
    for (let n = 0; n < 5; n++) {
      const y = j + 0.22 + (n * (d - 0.44)) / 4;
      H.line(R, [H.p(i + 0.04, y, 1.3), H.p(i + 0.18, y, 1.94)], 'paper', 0.9);
    }
    for (let n = 0; n < 4; n++) leaf(H, R, ...H.p(i + 1.14 + n * 0.25, j + d - 0.22, 0.58), 5 + (n % 2) * 2, n % 2 ? 'coral' : 'sun');
  }
}

function barrel(H, R, i, j) {
  const [x, y] = H.p(i, j, .05);
  shape(H, R, [[x - 20, y - 6], [x + 20, y - 6], [x + 22, y - 53], [x - 22, y - 53]], 'teal', .66);
  oval(H, R, x, y - 53, 22, 9, 'blue', .65);
  oval(H, R, x, y - 53, 17, 6, 'paper', .85);
  for (const off of [14, 36]) stroke(H, R, [[x - 20, y - off], [x, y - off + 6], [x + 20, y - off]], 'blue', 1);
  H.line(R, [[x + 15, y - 15], [x + 27, y - 15], [x + 27, y - 8]], 'blue', 2.1);
  H.line(R, [[x + 21, y - 19], [x + 27, y - 19]], 'coral', 2.3);
}

function crownHeightsGardenDetails(H, R) {
  table(H, R, 5.87, 8.83, 2.39, 1.86, 0.72, 'sun');
  shallowTray(H, R, 6.03, 9.01, 2.05, 1.52, 0.86, 'teal');
  for (let n = 0; n < 9; n++) {
    H.line(R, [H.p(6.13 + n * 0.22, 9.1, 1.06), H.p(6.13 + n * 0.22, 10.39, 1.06)], 'blue', 0.7);
    H.line(R, [H.p(6.12, 9.13 + n * 0.14, 1.06), H.p(7.97, 9.13 + n * 0.14, 1.06)], 'blue', 0.7);
  }
  leaf(H, R, ...H.p(6.12, 9.11, 1.1), 0.42, 'sun');
  shallowTray(H, R, 6.12, 9.13, 1.82, 1.24, 0.05, 'sun');
  for (let n = 0; n < 10; n++) oval(H, R, ...H.p(6.33 + (n % 5) * 0.31, 9.42 + Math.floor(n / 5) * 0.43, 0.24), 4, 2, 'blue', 0.4);
  for (const i of [5.02, 5.44, 5.86]) {
    H.line(R, [H.p(i, 0.4, 0.13), H.p(i, 0.4, 1.9)], i === 5.86 ? 'coral' : 'sun', 2);
    const [x, y] = H.p(i, 0.4, 0.18);
    shape(
      H,
      R,
      [
        [x - 6, y],
        [x + 6, y],
        [x + 8, y + 13],
        [x, y + 18],
        [x - 8, y + 13]
      ],
      'blue',
      0.5,
      0.6
    );
  }
  slattedCrate(H, R, 3.58, 9.81, 1.56, 1.37, 0.02, 0.73, 'teal');
  for (let n = 0; n < 6; n++) leaf(H, R, ...H.p(3.9 + (n % 3) * 0.4, 10.12 + Math.floor(n / 3) * 0.47, 0.85), 0.5, 'sun');
  handTool(H, R, 7.62, 3.52, 1.05, 'trowel', 'coral');
  coiledLine(H, R, 8.35, 7.37, 0.04, 15, 'teal');
  const [x, y] = H.p(4.79, 2.52, 0.15);
  H.line(
    R,
    [
      [x, y],
      [x, y - 49]
    ],
    'paper',
    2
  );
  oval(H, R, x, y - 50, 5, 5, 'blue', 0.65);
  H.line(
    R,
    [
      [x, y - 50],
      [x + 2, y - 53]
    ],
    'sun',
    1
  );
  foldedCloth(H, R, 9.34, 9.86, 1.33, 0.45, 0.69, 'paper', 'teal');
}

function construction(H, R) {
  for (let row = 0; row < 8; row++)
    for (let n = 0; n < 14; n++) {
      const j = 0.2 + n * 0.82 + (row % 2) * 0.41,
        z = 0.15 + row * 0.28;
      if (j < 11.9) {
        H.line(R, [H.p(0.215, j, z), H.p(0.215, Math.min(j + 0.74, 11.9), z)], 'blue', 0.6, { tone: 0.3 });
        H.line(R, [H.p(0.215, j, z), H.p(0.215, j, z + 0.24)], 'paper', 0.6);
      }
    }
  for (const j of [0.53, 3.54, 6.55])
    for (let n = 0; n < 4; n++) {
      const z = 0.24 + n * 0.23;
      H.dot(...H.p(2.8, j + 0.1, z), 1.2, 'sun');
      H.line(R, [H.p(2.8, j + 0.11, z), H.p(2.8, j + 0.2, z)], 'paper', 0.6);
    }
  for (const i of [6.23, 8.98]) {
    H.line(R, [H.p(i, 0.55, 0.5), H.p(i, 0.55, 2.5)], 'sun', 2.3);
    for (const z of [1.08, 1.55, 2.02, 2.48]) H.line(R, [H.p(i - 0.055, 0.58, z), H.p(i + 0.055, 0.58, z)], 'blue', 0.8);
  }
  for (const z of [0.96, 1.38, 1.8, 2.22]) H.line(R, [H.p(6.23, 0.62, z), H.p(8.98, 0.62, z)], 'blue', 0.65);
  for (let n = 0; n < 4; n++) specimen(H, R, ...H.p(6.52 + n * 0.7, 0.93, 0.45), 0.83, 'teal', n === 1);
  hangingRail(H, R, 'nw', 9.73, 1.92, 2.27, 4, (P, u, n) => {
    const [x, y] = P(u, -0.16);
    H.line(
      R,
      [
        [x, y],
        [x - 1, y + 36]
      ],
      'sun',
      2.2
    );
    if (n % 2) {
      shape(
        H,
        R,
        [
          [x - 5, y + 33],
          [x + 4, y + 33],
          [x + 5, y + 44],
          [x, y + 48],
          [x - 6, y + 44]
        ],
        'teal',
        0.55,
        0.6
      );
    } else {
      H.line(
        R,
        [
          [x - 7, y + 39],
          [x + 6, y + 39]
        ],
        'blue',
        1.5
      );
      for (let q = 0; q < 4; q++)
        H.line(
          R,
          [
            [x - 6 + q * 4, y + 39],
            [x - 6 + q * 4, y + 46]
          ],
          'blue',
          1
        );
    }
  });
  const [x, y] = H.p(6.91, 9.52, 0.91);
  shape(
    H,
    R,
    [
      [x - 24, y],
      [x + 22, y - 11],
      [x + 26, y + 5],
      [x - 20, y + 17]
    ],
    'sun',
    0.5,
    0.8
  );
  for (let n = 0; n < 9; n++)
    H.line(
      R,
      [
        [x - 20 + n * 5, y + 2 - n],
        [x - 16 + n * 5, y + 14 - n]
      ],
      'blue',
      0.5
    );
  for (let n = 0; n < 5; n++)
    H.line(
      R,
      [
        [x - 19, y + 1 + n * 3],
        [x + 22, y - 9 + n * 3]
      ],
      'teal',
      0.65
    );
  for (let n = 0; n < 7; n++) {
    const [px, py] = H.p(6.45 + n * 0.19, 9.43, 0.93);
    oval(H, R, px, py, 2.1, 1.3, n % 2 ? 'blue' : 'coral', 0.5);
  }
  for (let n = 0; n < 4; n++) {
    const [px, py] = H.p(6.2 + n * 0.42, 3.59, 1.19);
    specimen(H, R, px, py, 0.23, 'teal', false);
  }
  const [px, py] = H.p(10.32, 10.94, 0.15);
  shape(
    H,
    R,
    [
      [px - 6, py],
      [px + 6, py],
      [px + 5, py - 17],
      [px - 5, py - 17]
    ],
    'paper',
    1,
    0.6
  );
  H.line(
    R,
    [
      [px, py - 14],
      [px + 1, py - 5]
    ],
    'teal',
    1.2
  );
  for (let n = 0; n < 9; n++) {
    const [ax, ay] = H.p(3.18 + (n % 3) * 0.24, 7.61 + Math.floor(n / 3) * 0.24, 0.035);
    H.line(
      R,
      [
        [ax - 3, ay],
        [ax + 4, ay - 3]
      ],
      'sun',
      1
    );
  }
}

const room = world('new-york-crown-heights-garden', 'Crown Heights · Turn the Heap', { floor: 'sun', tone: .12, wall: false, head: 20 }, (H, R) => {
  box(H, R, 0, 0, .2, 12, .04, 2.52, 'coral', .23);
  for (let z = .15; z < 2.5; z += .27) {
    H.line(R, [H.p(.22, .08, z), H.p(.22, 11.95, z)], 'paper', 1.1);
    for (let j = (Math.round(z * 4) % 2) * .45; j < 12; j += .9) H.line(R, [H.p(.23, j, z), H.p(.23, j, z + .25)], 'paper', .9);
  }
  for (let i = .4; i < 12; i += .55) box(H, R, i, .08, .12, .14, .05, 2.25 + i % 1.1 * .15, 'teal', .55);
  for (const z of [.55, 1.68]) box(H, R, .3, .12, 11.5, .15, z, .13, 'blue', .55);
  shape(H, R, H.tile(3.65, .4, 1.35, 11.3, .03), 'coral', .2, .5);
  shape(H, R, H.tile(4.98, 7.55, 6.5, 1.24, .04), 'coral', .2, .5);
  for (let j = .6; j < 11.6; j += .64) for (const i of [3.71, 4.36]) H.outline(R, H.tile(i, j, .57, .53, .05), 'blue', .55, { tone: .4, amp: .08 });
  compostBay(H, R, .56, 0, false);
  compostBay(H, R, 3.4, 1, true);
  compostBay(H, R, 6.26, 2, false);
  box(H, R, 6.05, .34, 3.17, 1.7, .04, .38, 'teal', .47);
  shape(H, R, H.tile(6.2, .49, 2.85, 1.38, .44), 'blue', .48);
  for (let row = 0; row < 3; row++) for (let k = 0; k < 7; k++) leaf(H, R, ...H.p(6.39 + k * .39, .65 + row * .47, .46), 7 + k % 2 * 2);
  barrel(H, R, 10.41, 1.02);
  stroke(H, R, [H.p(11.7, .24, 2.75), H.p(11.7, .24, 1.78), H.p(10.41, 1.02, 1.6)], 'blue', 5);
  stroke(H, R, [H.p(11.7, .24, 2.75), H.p(11.7, .24, 1.78), H.p(10.41, 1.02, 1.6)], 'paper', 2);
  box(H, R, 8.98, 3.32, 2.26, 3.14, .03, .5, 'coral', .48);
  shape(H, R, H.tile(9.12, 3.46, 1.98, 2.87, .55), 'blue', .48);
  for (const i of [9.39, 10.58]) for (let j = 3.75; j < 6.3; j += .78) {
    const p = H.p(i, j, .58);
    for (let k = 0; k < 5; k++) leaf(H, R, p[0] + (k - 2) * 4, p[1] + k % 2 * 3, 11 + k % 3 * 4);
  }
  for (const j of [3.46, 6.14]) for (const i of [9.17, 11.02]) H.line(R, [H.p(i, j, .55), H.p(i, j, 1.92)], 'sun', 1.8);
  for (const z of [1.15, 1.72]) H.line(R, [H.p(9.17, 3.46, z), H.p(11.02, 3.46, z), H.p(11.02, 6.14, z)], 'blue', .65);
  table(H, R, 5.8, 2.79, 2.35, 1.35, .89, 'paper');
  box(H, R, 5.99, 2.94, 1.29, .83, 1.03, .12, 'teal', .48);
  for (let k = 0; k < 8; k++) box(H, R, 6.08 + k % 4 * .27, 3.03 + Math.floor(k / 4) * .3, .21, .21, 1.16, .12, 'blue', .5);
  const [gx, gy] = H.p(7.7, 3.61, 1.04);
  for (const [dx, ink] of [[-3, 'coral'], [9, 'sun']]) {
    oval(H, R, gx + dx, gy, 5, 7, ink, .65);
    for (let k = 0; k < 4; k++) H.line(R, [[gx + dx - 4 + k * 2.2, gy - 4], [gx + dx - 5 + k * 2.2, gy - 12]], ink, 2);
  }
  box(H, R, .38, 9.72, 2.4, 1.18, .04, .74, 'teal', .5);
  for (let k = 0; k < 3; k++) box(H, R, .55 + k * .72, 9.85, .58, .9, .78, .34, ['sun', 'paper', 'coral'][k], .8);
  for (let k = 0; k < 4; k++) {
    const [x, y] = H.p(.38, 9.34 + k * .51, 1.08);
    H.line(R, [[x, y], [x - 7, y - 49 - k % 2 * 13]], 'sun', 2);
    if (k % 2) shape(H, R, [[x - 11, y - 58], [x - 4, y - 59], [x - 2, y - 72], [x - 10, y - 70]], 'blue', .7, .7);
    else for (let n = 0; n < 4; n++) H.line(R, [[x - 12 + n * 4, y - 52], [x - 11 + n * 4, y - 65]], 'blue', 1.4);
  }
  const [hx, hy] = H.p(7.5, 10.26, .03);
  for (const r of [14, 19, 24, 29]) H.outline(R, Array.from({ length: 30 }, (_, k) => [hx + Math.cos(k * TAU / 30) * r, hy + Math.sin(k * TAU / 30) * r * .42]), 'teal', 2.2);
  stroke(H, R, [[hx + 27, hy], [hx + 51, hy + 2], [hx + 58, hy - 11], [hx + 52, hy - 17]], 'teal', 2.5);
  H.line(R, [[hx + 52, hy - 17], [hx + 48, hy - 23]], 'sun', 3);
  table(H, R, 9.12, 9.67, 2.13, .82, .53, 'coral');
  box(H, R, 9.12, 9.67, 2.13, .13, .68, .69, 'coral', .5);
  box(H, R, 9.48, 10.61, .73, .64, .02, .58, 'sun', .58);
  stroke(H, R, [H.p(9.53, 10.89, .5), H.p(9.84, 10.89, .95), H.p(10.13, 10.89, .5)], 'blue', 1);
  plant(H, R, ...H.p(11.15, 11.03, .04), .75);
  for (let k = 0; k < 4; k++) shape(H, R, H.tile(5.35 + k * .61, 10.92, .44, .3, .04), k % 2 ? 'paper' : 'sun', .85, .6);
  crownHeightsGardenDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 18), turn = Math.sin(Math.PI * Math.max(0, Math.min(1, (u - .17) / .59))) ** 2;
  actor(H, R, 4.39, 5.11, t, 'newYorkCompostTurn', { face: 'sw', shirt: ['paper', 1], apron: ['teal', .72], hairStyle: 'cap', prop(h, r, points) {
    const [x, y] = points.nearHand, end = [x - 46 + turn * 9, y + 12 - turn * 19];
    H.line(r, [[x + 11, y - 9], [x, y], end], 'blue', 3);
    H.line(r, [[x + 11, y - 9], [x, y], end], 'sun', 1.55);
    for (let k = 0; k < 4; k++) H.line(r, [[end[0] + k * 3, end[1] - 3], [end[0] - 4 + k * 3, end[1] + 8]], 'blue', 1.3);
    if (turn > .12) for (let k = 0; k < 5; k++) leaf(h, r, end[0] + k * 3, end[1] + 1, 3.7, k % 2 ? 'sun' : 'teal');
  } }, 0, 1.38);
  actor(H, R, 7.51, 4.93, t, 'newYorkGardenSort', { shirt: ['coral', .64], hairStyle: 'bun', face: 'nw', prop(h, r, points) {
    const [x, y] = points.farHand;
    shape(h, r, [[x - 5, y + 5], [x + 5, y + 5], [x + 7, y - 6], [x - 7, y - 6]], 'sun', .7, .6);
    leaf(h, r, x, y - 6, 5);
  } }, 0, 1.23);
  const sway = Math.sin(u * TAU) * 2;
  for (let k = 0; k < 4; k++) {
    const [x, y] = H.p(9.25 + k * .5, 3.5, 1.79);
    stroke(H, R, [[x, y + 22], [x + sway, y + 4], [x + 3 + sway, y - 8]], 'teal', 1.6);
    leaf(H, R, x + sway, y + 2, 7);
  }
});

room.loopSeconds = 18;
export default room;
