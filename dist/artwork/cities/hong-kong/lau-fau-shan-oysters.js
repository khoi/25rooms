import { surface, bentTube } from '../materials.js';
import { cornice, wallRack, hangingRail } from '../joinery.js';
import { shelfUnit, shallowTray, liddedTin, foldedCloth, coiledLine, boundBook, satchel, handTool, servicePipe, slattedCrate } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, TAU, wallRect, wallPt, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const low = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -8, head: 20, al: 60, ar: 67, el: 22, er: 28 };
const inspect = { ...low, lean: -2, head: 8, al: 58, ar: 53, el: 82, er: 90 };
FIGURES.clips.hongKongOysterAssess = { dur: 14, keys: [[0, low], [.12, low], [.31, inspect], [.46, { ...inspect, head: 15, ar: 62, er: 84 }], [.62, inspect], [.79, low], [1, low]] };

function shell(H, R, x, y, size = 1, angle = 0, pale = false) {
  const p = (a, b) => [x + (a * Math.cos(angle) - b * Math.sin(angle)) * size, y + (a * Math.sin(angle) + b * Math.cos(angle)) * size];
  const outline = [[-9, 1], [-8, -5], [-4, -9], [1, -8], [6, -5], [10, -1], [8, 4], [2, 6], [-5, 6]].map(([a, b]) => p(a, b));
  shape(H, R, outline, pale ? 'paper' : 'teal', pale ? 1 : .37, .65);
  for (const f of [.38, .66, .84]) stroke(H, R, [[-8 * f, 1], [-5 * f, -6 * f], [3 * f, -5 * f], [8 * f, 0], [4 * f, 4 * f]].map(([a, b]) => p(a, b)), 'blue', .5, .53);
  H.dot(...p(-3, 1), 1.1 * size, 'coral', .36);
}

function basket(H, R, i, j, w = 1.62, d = 1.16, z = 0, filled = true) {
  box(H, R, i, j, w, d, z, .49, 'sun', .53);
  shape(H, R, H.tile(i + .1, j + .1, w - .2, d - .2, z + .5), 'blue', .47, .5);
  for (let k = 0; k < 7; k++) H.line(R, [H.p(i + .12 + k * (w - .25) / 6, j + d + .02, z + .08), H.p(i + .12 + k * (w - .25) / 6, j + d + .02, z + .42)], 'paper', .7, { tone: .65 });
  for (const height of [.16, .31]) H.line(R, [H.p(i + .08, j + d + .03, z + height), H.p(i + w - .08, j + d + .03, z + height)], 'blue', .7, { tone: .66 });
  if (filled) for (let k = 0; k < 9; k++) shell(H, R, ...H.p(i + .24 + k % 3 * (w - .48) / 2, j + .24 + Math.floor(k / 3) * (d - .48) / 2, z + .54), .48, k * .8, k % 3 === 0);
  for (const x of [i + .08, i + w - .08]) stroke(H, R, [H.p(x, j + d * .27, z + .47), H.p(x, j + d * .5, z + .68), H.p(x, j + d * .73, z + .47)], 'blue', 1.1);
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


function shed(H, R) {
  for (const side of ['nw', 'ne']) {
    for (let p = .2; p < 11.9; p += .43) H.line(R, [wallPt(H, side, p, .17, .04), wallPt(H, side, p, 3.28, .04)], 'blue', .7, { tone: .36 });
    for (const z of [.33, 2.96]) H.line(R, [wallPt(H, side, .1, z, .06), wallPt(H, side, 11.8, z, .06)], 'teal', 2.4, { tone: .52 });
  }
  const view = wallRect(H, 'ne', 3.54, 10.86, 1.42, 3.04, .07);
  shape(H, R, view, 'sun', .21);
  H.clip(view, () => {
    shape(H, R, wallRect(H, 'ne', 3.4, 10.97, 1.42, 2.19, .09), 'teal', .34);
    for (let k = 0; k < 13; k++) {
      const i = 3.6 + k * .56;
      H.line(R, [wallPt(H, 'ne', i, 1.42, .11), wallPt(H, 'ne', i, 1.86 + k % 3 * .12, .11)], 'blue', .7);
      H.line(R, [wallPt(H, 'ne', i, 1.57, .11), wallPt(H, 'ne', i + .3, 1.57, .11)], 'paper', .8);
    }
    shape(H, R, [wallPt(H, 'ne', 3.4, 2.21, .13), wallPt(H, 'ne', 4.5, 2.43, .13), wallPt(H, 'ne', 5.6, 2.32, .13), wallPt(H, 'ne', 7.4, 2.57, .13), wallPt(H, 'ne', 9.2, 2.34, .13), wallPt(H, 'ne', 10.9, 2.51, .13), wallPt(H, 'ne', 10.9, 2.19, .13)], 'blue', .2);
  });
  H.outline(R, view, 'blue', 1.4);
  box(H, R, 3.47, .05, 7.54, .51, 1.33, .12, 'teal', .64);
  for (const i of [3.49, 7.16, 10.84]) box(H, R, i, .03, .13, .21, 1.4, 1.67, 'blue', .6);
  for (const [i, j] of [[.4, .63], [.4, 2.07], [.4, 3.52]]) basket(H, R, i, j, 1.73, 1.15);
  basket(H, R, .4, .63, 1.73, 1.15, .58, false);
  basket(H, R, .4, 2.07, 1.73, 1.15, .58, true);
  table(H, R, 2.91, 4.74, 5.47, 2.45, .88, 'teal');
  shape(H, R, H.tile(3.11, 4.95, 5.02, 2.01, 1.02), 'paper', .95);
  for (let k = 0; k < 3; k++) {
    box(H, R, 3.22 + k * 1.59, 5.1, 1.39, 1.51, 1.04, .11 + k * .04, k === 1 ? 'sun' : 'teal', .37);
    for (let q = 0; q < 6; q++) shell(H, R, ...H.p(3.47 + k * 1.59 + q % 2 * .81, 5.36 + Math.floor(q / 2) * .46, 1.19 + k * .04), .61, q * .8, q % 2 === 1);
  }
  const [cx, cy] = H.p(4.09, 6.77, 1.16);
  shape(H, R, [[cx - 18, cy - 7], [cx + 17, cy - 4], [cx + 18, cy + 5], [cx - 17, cy + 7]], 'coral', .38);
  for (let q = 0; q < 4; q++) H.line(R, [[cx - 14, cy - 3 + q * 2], [cx + 13, cy - 1 + q * 2]], 'paper', .6);
  table(H, R, 5.31, 7.67, .97, .91, .55, 'sun');
  box(H, R, 5.28, 8.51, 1.07, .1, .54, .42, 'sun', .61);
  basket(H, R, 3.01, 8.96, 1.61, 1.43, 0, false);
  basket(H, R, 6.82, 8.91, 1.89, 1.46, 0, true);
  basin(H, R, 8.87, 2.18, 2.31, 1.86, .21);
  box(H, R, 9.06, 2.41, 1.91, 1.41, 0, .2, 'blue', .51);
  stroke(H, R, [H.p(10.82, 2.3, .72), H.p(10.82, 2.3, 1.59), H.p(10.19, 2.3, 1.59), H.p(10.19, 2.47, 1.43)], 'blue', 2.4);
  H.line(R, [H.p(10.67, 2.3, 1.29), H.p(10.95, 2.3, 1.29)], 'coral', 2.3);
  const [hx, hy] = H.p(.22, 6.58, 1.62);
  for (let q = 0; q < 4; q++) H.outline(R, ell(hx, hy, 15 + q * 3.4, 17 + q * 3.4), 'teal', 1.6, { tone: .67 });
  stroke(H, R, [[hx + 20, hy + 10], [hx + 29, hy + 57], [hx + 59, hy + 79], [hx + 77, hy + 68]], 'teal', 2.2);
  shape(H, R, H.tile(8.97, 6.37, 2.48, .31, .02), 'blue', .75);
  for (let q = 0; q < 16; q++) H.line(R, [H.p(9.03 + q * .15, 6.38, .04), H.p(9.03 + q * .15, 6.67, .04)], 'paper', .7);
  for (let q = 0; q < 7; q++) oval(H, R, ...H.p(8.95 + q % 3 * .49, 4.5 + Math.floor(q / 3) * .52, .035), 10 + q, 2.7, 'teal', .17);
  for (const i of [1.03, 1.57]) {
    box(H, R, i, 9.81, .34, .42, .03, .72, 'blue', .74);
    box(H, R, i, 10.1, .35, .48, .03, .21, 'blue', .8);
    oval(H, R, ...H.p(i + .17, 10.02, .77), 5, 3, 'paper', .8);
  }
  table(H, R, .52, 7.6, 1.66, 1.22, .89, 'paper');
  const [tx, ty] = H.p(1.02, 8.05, 1.07);
  shape(H, R, [[tx - 6, ty], [tx + 6, ty], [tx + 6, ty - 27], [tx - 6, ty - 27]], 'sun', .6);
  oval(H, R, tx, ty - 28, 6, 2.5, 'blue', .7);
  oval(H, R, tx + 17, ty + 2, 6, 3, 'paper');
  H.line(R, [[tx + 11, ty + 1], [tx + 11, ty - 9], [tx + 23, ty - 9], [tx + 23, ty + 1]], 'blue', .7);
  box(H, R, 10.15, 8.71, 1.28, 1.66, .02, .68, 'paper', 1);
  H.line(R, [H.p(10.29, 10.39, .39), H.p(11.28, 10.39, .39)], 'teal', 1.1);
  box(H, R, 10.33, 8.89, .91, 1.3, .73, .06, 'coral', .32);
  shell(H, R, ...H.p(10.67, 9.5, .82), .72, .3, true);
  H.line(R, [H.p(2.75, 10.88, .02), H.p(9.11, 10.88, .02)], 'paper', 2.3, { tone: .8 });
  lauFauShanOystersDetails(H, R);
  construction(H, R);
}

function lauFauShanOystersDetails(H, R) {
  shelfUnit(H, R, 0.3, 2.26, 1.94, 1.1, 0.03, [0.13, 1.02, 1.92], 'teal');
  for (let n = 0; n < 3; n++) liddedTin(H, R, 0.7 + n * 0.57, 2.82, 0.31, 6, 17, ['paper', 'sun', 'teal'][n]);
  shallowTray(H, R, 0.48, 2.41, 1.56, 0.75, 1.16, 'paper');
  handTool(H, R, 0.93, 2.79, 1.37, 'brush', 'coral');
  handTool(H, R, 1.57, 2.93, 1.37, 'trowel', 'sun');
  foldedCloth(H, R, 0.49, 2.45, 1.52, 0.72, 2.06, 'paper', 'teal');
  slattedCrate(H, R, 7.1, 9.9, 1.85, 1.17, 0.02, 0.67, 'teal');
  for (let n = 0; n < 6; n++) shell(H, R, ...H.p(7.4 + (n % 3) * 0.52, 10.2 + Math.floor(n / 3) * 0.38, 0.73), 0.38, n * 0.5, true);
  shallowTray(H, R, 8.75, 5.49, 1.67, 1.29, 0.03, 'paper');
  for (let n = 0; n < 4; n++) shell(H, R, ...H.p(9.08 + (n % 2) * 0.65, 5.83 + Math.floor(n / 2) * 0.45, 0.23), 0.46, n * 0.4);
  servicePipe(
    H,
    R,
    [
      [0.13, 5.62, 0.14],
      [0.13, 5.62, 1.82],
      [0.62, 5.62, 1.82]
    ],
    'teal',
    2.8
  );
  coiledLine(H, R, 1.17, 5.61, 0.06, 18, 'teal');
  boundBook(H, R, 10.16, 8.94, 0.69, 0.63, 0.82, 'blue');
  satchel(H, R, 10.73, 1.09, 0.06, 'coral', 0.67);
  for (const i of [3.21, 4.39, 7.17]) H.line(R, [H.p(i, 7.19, 0.28), H.p(i, 7.19, 0.81)], 'paper', 1.5);
}

function construction(H, R) {
  cornice(H, R, 'nw', 0.12, 11.85, 3.14, 'teal');
  wallRack(H, R, 'nw', 4.35, 2.64, 1.44, 1.54, 2, 'teal', (P, z, row) => {
    for (let n = 0; n < 5; n++) {
      const [x, y] = P(0.36 + n * 0.47, z + 0.14);
      if (row) {
        shape(
          H,
          R,
          [
            [x - 4, y],
            [x + 4, y],
            [x + 5, y - 18],
            [x - 3, y - 18]
          ],
          'paper',
          1,
          0.6
        );
        H.line(
          R,
          [
            [x - 3, y - 10],
            [x + 4, y - 10]
          ],
          'coral',
          1
        );
      } else {
        shell(H, R, x, y, 0.48, n * 0.2, n === 2);
      }
    }
  });
  hangingRail(H, R, 'nw', 7.4, 3.4, 2.87, 5, (P, u, n) => {
    const [x, y] = P(u, -0.14);
    if (n < 2) {
      shape(
        H,
        R,
        [
          [x - 10, y],
          [x + 10, y],
          [x + 7, y + 32],
          [x - 7, y + 32]
        ],
        n ? 'coral' : 'paper',
        0.7,
        0.7
      );
      H.line(
        R,
        [
          [x, y + 4],
          [x - 2, y + 28]
        ],
        'blue',
        0.55
      );
    } else {
      H.line(
        R,
        [
          [x, y],
          [x - 3, y + 24]
        ],
        'sun',
        2.7
      );
      shape(
        H,
        R,
        [
          [x - 6, y + 21],
          [x + 1, y + 22],
          [x + 7, y + 12]
        ],
        'paper',
        1,
        0.6
      );
    }
  });
  for (let n = 0; n < 4; n++) {
    const i = 3.13 + n * 1.29;
    shape(H, R, H.faceI(i, 7.215, 1.13, 0.23, 0.76), 'teal', 0.3, 0.6);
    H.line(R, [H.p(i + 0.1, 7.23, 0.68), H.p(i + 1.04, 7.23, 0.68)], 'paper', 1.1);
    for (const u of [0.15, 0.99]) H.dot(...H.p(i + u, 7.235, 0.37), 1.1, 'sun');
  }
  for (let n = 0; n < 5; n++) {
    const [x, y] = H.p(3.55 + n * 0.89, 6.57, 1.19);
    shell(H, R, x, y, 0.55, n * 0.2, n % 2 === 0);
    H.line(
      R,
      [
        [x - 4, y + 3],
        [x + 4, y + 3]
      ],
      'paper',
      0.7
    );
  }
  const [x, y] = H.p(10.14, 3.18, 0.32);
  shape(
    H,
    R,
    [
      [x - 14, y],
      [x + 13, y],
      [x + 11, y - 13],
      [x - 12, y - 13]
    ],
    'teal',
    0.65,
    0.8
  );
  oval(H, R, x, y - 20, 13, 12, 'paper', 1);
  oval(H, R, x, y - 20, 10, 9, 'sun', 0.25);
  for (let n = 0; n < 8; n++) {
    const a = (n * TAU) / 8;
    H.line(
      R,
      [
        [x + Math.cos(a) * 7, y - 20 + Math.sin(a) * 7],
        [x + Math.cos(a) * 9, y - 20 + Math.sin(a) * 9]
      ],
      'blue',
      0.7
    );
  }
  H.line(
    R,
    [
      [x, y - 20],
      [x - 5, y - 25]
    ],
    'coral',
    1.3
  );
  for (let n = 0; n < 8; n++) {
    const j = 8.93 + n * 0.19;
    H.line(R, [H.p(10.25, j, 0.79), H.p(11.3, j, 0.79)], 'paper', 0.65);
  }
  for (let n = 0; n < 4; n++) {
    const i = 3.98 + n * 0.71;
    shape(H, R, H.tile(i, 9.62, 0.48, 0.39, 0.025), 'teal', 0.2, 0.4);
    shell(H, R, ...H.p(i + 0.23, 9.84, 0.04), 0.42, n * 0.3, true);
  }
  for (const i of [3.5, 7.13, 10.85]) {
    H.line(R, [H.p(i, 0.23, 1.52), H.p(i, 0.23, 2.98)], 'paper', 0.8);
    for (const z of [1.64, 2.88]) H.dot(...H.p(i, 0.25, z), 1.1, 'sun');
  }
  const [px, py] = H.p(0.83, 8.61, 1.08);
  oval(H, R, px, py, 6, 3, 'paper', 1);
  H.line(
    R,
    [
      [px - 5, py],
      [px + 6, py]
    ],
    'coral',
    1.1
  );
  H.line(
    R,
    [
      [px, py - 3],
      [px + 9, py - 19]
    ],
    'sun',
    1.2
  );
}

const room = world('hong-kong-lau-fau-shan-oysters', 'Lau Fau Shan · Shells after the tide', { floor: 'teal', tone: .18, wall: 'paper', wallTone: .9, height: 3.38, head: 20 }, shed, (H, R, t) => {
  const u = cycle(t, 14);
  H.at(5.79, 8.04, 0, HH => actor(HH, R, 5.79, 8.04, t, 'hongKongOysterAssess', { shirt: ['paper', 1], apron: ['coral', .62], hairStyle: 'cap', face: 'nw', prop(h, r, p) {
    const [x, y] = p.nearHand;
    shell(h, r, x - 3, y - 2, .95, Math.sin(u * TAU) * .23, true);
    stroke(h, r, [p.farHand, [x + 5, y + 3]], 'coral', 2, .48);
  } }, 0, 1.39));
  const [x, y] = H.p(9.81, 3.03, .66);
  H.outline(R, ell(x, y, 14 + Math.sin(u * TAU) * 2, 4), 'paper', .65, { tone: .61 });
});

room.loopSeconds = 14;
export default room;
