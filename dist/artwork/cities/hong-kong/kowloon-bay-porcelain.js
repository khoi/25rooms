import { shelfUnit, drawerUnit, shallowTray, liddedTin, foldedCloth, boundBook, handTool, servicePipe } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, wallRect, wallPt, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const paint = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -8, head: 15, al: 52, ar: 72, el: 44, er: 22 };
FIGURES.clips.hongKongPorcelainInspect = { dur: 18, keys: [[0, paint], [.12, paint], [.28, { ...paint, ar: 56, er: 99, head: -9 }], [.42, { ...paint, ar: 56, er: 99, head: -9 }], [.57, paint], [.73, { ...paint, al: 60, el: 35, head: 9 }], [.86, { ...paint, al: 60, el: 35, head: 9 }], [1, paint]] };

function blossom(H, R, x, y, size = 1, uneven = false) {
  for (let q = 0; q < 5; q++) oval(H, R, x + Math.cos(q * TAU / 5) * 5 * size, y + Math.sin(q * TAU / 5) * 3.7 * size, (q === 3 && uneven ? 5.5 : 3.7) * size, 3 * size, 'coral', .64);
  H.dot(x, y, 2 * size, 'sun', 1);
  for (const side of [-1, 1]) shape(H, R, [[x + side * 8 * size, y + 2 * size], [x + side * 16 * size, y - 3 * size], [x + side * 13 * size, y + 6 * size]], 'teal', .62, .45);
}

function plate(H, R, x, y, radius = 22, decorated = false, upright = false, turn = 0, uneven = false) {
  const ry = radius * (upright ? .88 : .6);
  oval(H, R, x, y, radius, ry, 'paper', 1);
  H.outline(R, Array.from({ length: 42 }, (_, q) => [x + Math.cos(q * TAU / 42) * radius * .82, y + Math.sin(q * TAU / 42) * ry * .82]), decorated ? 'sun' : 'blue', decorated ? 1.6 : .7, { tone: decorated ? .85 : .45 });
  if (decorated) {
    blossom(H, R, x + Math.sin(turn) * radius * .2, y, radius / 27, uneven);
    for (let q = 0; q < 8; q++) {
      const a = q * TAU / 8 + turn;
      oval(H, R, x + Math.cos(a) * radius * .67, y + Math.sin(a) * ry * .67, 1.8, 1.2, q % 2 ? 'teal' : 'coral', .65);
    }
  }
  H.line(R, [[x - radius * .58, y - ry * .38], [x - radius * .14, y - ry * .52]], 'paper', 1.8);
}

function cup(H, R, i, j, z, ink = 'paper', brushes = false) {
  const [x, y] = H.p(i, j, z);
  if (brushes) for (let q = 0; q < 5; q++) {
    H.line(R, [[x - 4 + q * 2, y - 4], [x - 7 + q * 3, y - 34 + q % 2 * 5]], q % 2 ? 'coral' : 'sun', 1.1);
    H.line(R, [[x - 7 + q * 3, y - 34 + q % 2 * 5], [x - 8 + q * 3, y - 40 + q % 2 * 5]], 'blue', 1.3);
  }
  shape(H, R, [[x - 7, y], [x + 7, y], [x + 8, y - 16], [x - 8, y - 16]], ink, ink === 'paper' ? 1 : .58, .7);
  oval(H, R, x, y - 16, 8, 3, 'paper', 1);
  if (!brushes) oval(H, R, x, y - 16, 5.5, 1.8, 'teal', .24);
  H.line(R, [[x - 4, y - 8], [x + 4, y - 8]], 'teal', .9);
}

function kowloonBayPorcelainDetails(H, R) {
  drawerUnit(H, R, 8.04, 8.08, 3.19, 1.48, 1.24, 4, 'teal');
  shallowTray(H, R, 8.22, 8.25, 1.28, 1.06, 1.41, 'paper');
  for (let n = 0; n < 4; n++) {
    const [x, y] = H.p(8.51 + (n % 2) * 0.51, 8.53 + Math.floor(n / 2) * 0.43, 1.61);
    plate(H, R, x, y, 9, n === 2, false, 0, true);
  }
  foldedCloth(H, R, 9.71, 8.25, 1.12, 0.83, 1.4, 'paper', 'coral');
  liddedTin(H, R, 10.7, 9.21, 1.42, 6, 12, 'teal', true);
  shelfUnit(H, R, 2.02, 0.2, 3.29, 0.76, 1.94, [0, 0.67], 'sun');
  for (let n = 0; n < 4; n++) liddedTin(H, R, 2.41 + n * 0.74, 0.55, 2.08, 6, 15, ['coral', 'teal', 'sun', 'blue'][n]);
  for (let n = 0; n < 3; n++) {
    const [x, y] = H.p(2.55 + n * 1.06, 0.57, 2.76);
    plate(H, R, x, y - 12, 12, true, true, 0, n === 1);
  }
  boundBook(H, R, 5.02, 9.69, 1.09, 0.81, 0.04, 'coral');
  shallowTray(H, R, 6.31, 9.71, 1.01, 0.85, 0.03, 'paper');
  handTool(H, R, 6.81, 10.12, 0.24, 'brush', 'sun');
  for (let n = 0; n < 3; n++) shape(H, R, H.tile(6.43 + n * 0.23, 9.88, 0.15, 0.32, 0.22), 'teal', 0.3 + n * 0.2, 0.4);
  const [x, y] = H.p(7.77, 2.42, 0.04);
  oval(H, R, x, y - 9, 13, 10, 'paper', 1);
  oval(H, R, x, y - 17, 12, 4, 'teal', 0.2);
  stroke(
    H,
    R,
    [
      [x - 12, y - 15],
      [x - 8, y - 29],
      [x + 9, y - 29],
      [x + 12, y - 15]
    ],
    'blue',
    1
  );
  servicePipe(
    H,
    R,
    [
      [7.22, 0.11, 0.14],
      [7.22, 0.11, 0.89],
      [7.77, 0.11, 0.89]
    ],
    'teal',
    2
  );
}

const room = world('hong-kong-kowloon-bay-porcelain', 'Kowloon Bay · A quiet rim of color', { floor: 'paper', tone: .54, wall: 'teal', wallTone: .19, height: 3.74, head: 20 }, (H, R) => {
  shape(H, R, wallRect(H, 'ne', 6.14, 11.42, 1.28, 3.4), 'blue', .26, .9);
  for (const i of [6.24, 7.49, 8.74, 10.0, 11.29]) H.line(R, [wallPt(H, 'ne', i, 1.34, .08), wallPt(H, 'ne', i, 3.34, .08)], 'paper', 2.4);
  for (const z of [2.27, 3.34]) H.line(R, [wallPt(H, 'ne', 6.2, z, .08), wallPt(H, 'ne', 11.33, z, .08)], 'paper', 2.3);
  box(H, R, 6.05, .12, 5.51, .65, 1.15, .15, 'paper', 1);
  shape(H, R, [H.p(6.4, .78, .015), H.p(10.95, .78, .015), H.p(11.76, 7.33, .015), H.p(7.34, 7.33, .015)], 'sun', .1, .2);
  for (const z of [.91, 1.99, 3.03]) {
    box(H, R, .12, .74, .92, 6.32, z, .12, 'blue', .6);
    for (let q = 0; q < 6; q++) {
      const j = 1.22 + q * .98;
      const [x, y] = H.p(.67, j, z + .18);
      plate(H, R, x, y - 19, 19, q === 2 && z === 1.99, true);
      H.line(R, [[x - 11, y - 2], [x - 9, y + 5], [x + 10, y + 5], [x + 12, y - 2]], 'coral', 1.5);
    }
  }
  for (const j of [1.04, 6.66]) box(H, R, .14, j, .15, .13, .18, 2.98, 'blue', .6);
  table(H, R, 1.97, 3.44, 4.95, 2.53, .94, 'paper');
  shape(H, R, H.tile(2.14, 3.61, 4.59, 2.17, 1.08), 'teal', .14, .55);
  const [px, py] = H.p(5.14, 5.26, 1.13);
  oval(H, R, px, py + 7, 35, 19, 'blue', .48);
  oval(H, R, px, py + 3, 34, 19, 'coral', .38);
  for (let q = 0; q < 4; q++) {
    const [x, y] = H.p(2.56 + q * .63, 3.92, 1.12);
    oval(H, R, x, y, 9, 5, 'paper', 1);
    oval(H, R, x, y - .5, 5.6, 2.7, ['coral', 'teal', 'sun', 'blue'][q], .5);
  }
  cup(H, R, 2.54, 4.76, 1.1, 'paper', true);
  cup(H, R, 3.2, 4.48, 1.1);
  shape(H, R, H.tile(3.11, 5.22, 1.06, .4, 1.11), 'paper', 1, .5);
  for (let q = 0; q < 3; q++) {
    H.line(R, [H.p(3.27 + q * .19, 5.25, 1.16), H.p(3.3 + q * .19, 5.55, 1.16)], 'coral', 1.4);
    H.line(R, [H.p(3.3 + q * .19, 5.55, 1.16), H.p(3.31 + q * .19, 5.65, 1.16)], 'blue', 1.5);
  }
  box(H, R, 3.29, 5.32, .64, .12, 1.11, .09, 'teal', .6);
  const [mx, my] = H.p(6.44, 4.11, 1.11);
  oval(H, R, mx, my, 12, 5, 'blue', .55);
  stroke(H, R, [[mx, my - 3], [mx - 6, my - 25], [mx - 22, my - 38]], 'blue', 2.3);
  oval(H, R, mx - 27, my - 42, 15, 9, 'paper', 1);
  oval(H, R, mx - 27, my - 42, 11.5, 6, 'teal', .1);
  const [lx, ly] = H.p(2.3, 3.68, 1.12);
  oval(H, R, lx, ly, 12, 5, 'teal', .6);
  H.line(R, [[lx, ly], [lx - 8, ly - 37], [lx + 30, ly - 57]], 'blue', 2.3);
  shape(H, R, [[lx + 19, ly - 61], [lx + 38, ly - 54], [lx + 43, ly - 41], [lx + 13, ly - 48]], 'sun', .7, .8);
  for (const q of [[0, 0], [-8, -37], [30, -57]]) H.dot(lx + q[0], ly + q[1], 2.4, 'coral', 1);
  for (let q = 0; q < 3; q++) box(H, R, 2.26, 3.64, 1.45, 1.53, .03 + q * .19, .16, q % 2 ? 'paper' : 'blue', q % 2 ? 1 : .26);
  table(H, R, 5.16, 6.02, 1.09, 1.06, .47, 'coral');
  shape(H, R, H.tile(5.22, 6.08, .97, .94, .62), 'teal', .45, .7);
  box(H, R, 5.15, 6.99, 1.11, .12, .49, .84, 'coral', .43);
  table(H, R, 8.37, 1.53, 2.53, 1.68, .82, 'paper');
  for (let q = 0; q < 5; q++) plate(H, R, ...H.p(9.21, 2.21, .98 + q * .055), 25, q === 4);
  box(H, R, 10.12, 1.87, .56, .69, .97, .43, 'teal', .48);
  box(H, R, 10.05, 1.81, .71, .81, 1.4, .08, 'paper', 1);
  table(H, R, 8.72, 5.42, 2.3, 1.34, .64, 'teal');
  for (let q = 0; q < 3; q++) {
    const [x, y] = H.p(9.09 + q * .66, 5.99, .82);
    plate(H, R, x, y, 14, q === 1, false, 0, true);
  }
  shape(H, R, [H.p(10.13, 5.73, .8), H.p(10.77, 5.73, .8), H.p(10.78, 6.61, .19), H.p(10.12, 6.61, .19)], 'paper', 1, .65);
  for (const [i, j] of [[1.98, 8.9], [3.87, 8.9], [1.98, 10.51], [3.87, 10.51]]) oval(H, R, ...H.p(i, j, .1), 4, 6, 'blue', .7);
  table(H, R, 1.84, 8.8, 2.24, 1.85, .4, 'teal');
  box(H, R, 1.94, 8.91, 2.04, 1.64, .55, .57, 'paper', .85);
  shape(H, R, [H.p(1.9, 8.91, 1.13), H.p(4.02, 8.91, 1.13), H.p(4.1, 10.7, .57), H.p(1.79, 10.69, .57)], 'paper', 1, .8);
  H.line(R, [H.p(2.02, 10.69, .58), H.p(3.88, 10.69, .58)], 'coral', 1.3);
  for (const i of [1.89, 4.01]) H.line(R, [H.p(i, 8.88, .42), H.p(i, 8.88, 1.46)], 'blue', 2);
  H.line(R, [H.p(1.89, 8.88, 1.46), H.p(4.01, 8.88, 1.46)], 'blue', 2.1);
  kowloonBayPorcelainDetails(H, R);
}, (H, R, t) => {
  const u = cycle(t, 18), turn = u < .57 ? 0 : u < .73 ? Math.sin((u - .57) / .16 * Math.PI / 2) * .22 : u < .86 ? .22 : Math.cos((u - .86) / .14 * Math.PI / 2) * .22;
  const [px, py] = H.p(5.14, 5.26, 1.24);
  plate(H, R, px, py, 31, true, false, turn);
  actor(H, R, 5.62, 6.36, t, 'hongKongPorcelainInspect', { shirt: ['paper', 1], apron: ['teal', .6], hairStyle: 'bun', glasses: true, face: 'nw', prop(HH, RR, points) {
    const [x, y] = points.nearHand;
    const a = u < .12 ? 0 : u < .28 ? Math.sin((u - .12) / .16 * Math.PI / 2) : u < .42 ? 1 : u < .57 ? Math.cos((u - .42) / .15 * Math.PI / 2) : 0;
    const tip = [x - 5 - a * 6, y - 25 + a * 5];
    HH.line(RR, [[x + 2, y + 5], tip], 'coral', 1.55);
    HH.line(RR, [tip, [tip[0] - 1, tip[1] - 5]], 'blue', 1.35);
    const [fx, fy] = points.farHand;
    HH.line(RR, [[fx, fy], [px + 27, py + 9]], 'coral', 2.8, { tone: .3 });
  } }, .27, 1.45);
  const sway = Math.sin(u * TAU) * .06;
  shape(H, R, [H.p(11.41, .12, 3.38), H.p(11.91, .12, 3.38), H.p(11.88 + sway, .14, 1.39), H.p(11.35 + sway, .14, 1.33)], 'paper', .86, .55);
  H.line(R, [H.p(11.62, .15, 3.28), H.p(11.55 + sway, .17, 1.47)], 'teal', .6, { tone: .45 });
});

room.loopSeconds = 18;
export default room;
