import { shelfUnit, drawerUnit, shallowTray, liddedTin, foldedCloth, coiledLine, boundBook, handTool, servicePipe, slattedCrate } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, wallRect, wallPt, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const press = { ...rest, lean: -15, head: 13, al: 74, ar: 82, el: 14, er: 6 };
FIGURES.clips.hongKongScreenRehearse = { dur: 16, keys: [[0, press], [.1, press], [.34, { ...press, lean: -3, al: 40, ar: 48, el: 43, er: 37 }], [.43, { ...press, lean: -3, al: 47, ar: 55, el: 56, er: 50 }], [.6, { ...press, al: 79, ar: 87, el: 22, er: 14 }], [.69, press], [.79, { ...press, al: 108, ar: 116, el: 25, er: 17, head: -5 }], [.88, { ...press, al: 108, ar: 116, el: 25, er: 17, head: -5 }], [1, press]] };

function print(H, R, points, cx, cy, size = 1, flip = false) {
  shape(H, R, points, 'paper', 1, .6);
  H.clip(points, () => {
    oval(H, R, cx + (flip ? 9 : -9) * size, cy - 4 * size, 18 * size, 10 * size, 'coral', .65);
    for (let q = 0; q < 3; q++) stroke(H, R, [[cx - 29 * size, cy + (q * 7 - 1) * size], [cx - 7 * size, cy + (q * 7 - 7) * size], [cx + 14 * size, cy + (q * 7 + 2) * size], [cx + 32 * size, cy + (q * 7 - 4) * size]], 'teal', 3.3 * size);
  });
}

function jar(H, R, i, j, z, ink) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 7, y], [x + 7, y], [x + 7, y - 14], [x - 7, y - 14]], ink, .65, .7);
  oval(H, R, x, y - 14, 8, 3, 'paper', 1);
  H.line(R, [[x - 4, y - 8], [x + 4, y - 8]], 'paper', 2.3);
}

function screen(H, R, lift) {
  const z = 1.27, j0 = 3.8, j1 = 6.48 - lift * .7, z1 = z + lift * 1.65;
  const outer = [H.p(3.9, j0, z), H.p(7.5, j0, z), H.p(7.5, j1, z1), H.p(3.9, j1, z1)];
  shape(H, R, outer, 'sun', .45, 1.15);
  const inner = [H.p(4.09, j0 + .19, z + .012), H.p(7.31, j0 + .19, z + .012), H.p(7.31, j1 - .18, z1 + .012), H.p(4.09, j1 - .18, z1 + .012)];
  shape(H, R, inner, 'paper', .88, .8);
  H.clip(inner, () => {
    for (let q = 1; q < 17; q++) {
      const f = q / 18;
      H.line(R, [H.p(4.05 + f * 3.28, j0 + .18, z + .02), H.p(4.05 + f * 3.28, j1 - .18, z1 + .02)], 'teal', .35, { tone: .4 });
      H.line(R, [H.p(4.05, j0 + (j1 - j0) * f, z + lift * 1.65 * f), H.p(7.35, j0 + (j1 - j0) * f, z + lift * 1.65 * f)], 'blue', .35, { tone: .23 });
    }
  });
  for (const i of [4.18, 7.02]) box(H, R, i, j0 - .13, .24, .33, 1.24, .16, 'blue', .7);
}

function kwunTongPrintDetails(H, R) {
  drawerUnit(H, R, 1.5, 1.67, 3.98, 1.12, 1.32, 5, 'teal');
  shallowTray(H, R, 1.71, 1.86, 1.48, 0.74, 1.49, 'sun');
  handTool(H, R, 2.19, 2.19, 1.68, 'brush', 'coral');
  handTool(H, R, 2.85, 2.3, 1.68, 'trowel', 'teal');
  for (let n = 0; n < 3; n++) boundBook(H, R, 3.56, 1.87, 1.56, 0.78, 1.49 + n * 0.16, ['paper', 'coral', 'teal'][n]);
  shelfUnit(H, R, 0.14, 4.03, 1.08, 2.1, 0.04, [0.16, 1.1, 2.12], 'blue');
  for (let n = 0; n < 4; n++) liddedTin(H, R, 0.61, 4.4 + n * 0.44, 0.32, 6, 17, ['sun', 'teal', 'coral', 'blue'][n]);
  foldedCloth(H, R, 0.29, 4.31, 0.77, 1.03, 1.24, 'paper', 'coral');
  shallowTray(H, R, 0.27, 4.18, 0.8, 1.73, 2.26, 'sun');
  for (let n = 0; n < 4; n++) H.line(R, [H.p(0.44, 4.44 + n * 0.34, 2.45), H.p(0.94, 4.44 + n * 0.34, 2.45)], 'coral', 3);
  servicePipe(
    H,
    R,
    [
      [0.12, 7.73, 0.2],
      [0.12, 7.73, 3.29],
      [0.12, 0.1, 3.29],
      [3.07, 0.1, 3.29]
    ],
    'teal',
    2
  );
  for (let n = 0; n < 3; n++) {
    const i = 4.03 + n * 1.07;
    const points = H.faceI(i, 0.15, 0.88, 2.1, 3.13);
    print(H, R, points, ...H.p(i + 0.43, 0.16, 2.65), 0.34, n === 1);
    for (const a of [0.13, 0.74]) box(H, R, i + a, 0.16, 0.1, 0.06, 3.09, 0.14, 'blue', 0.6);
  }
  slattedCrate(H, R, 4.23, 9.52, 2.23, 1.58, 0.02, 0.65, 'teal');
  for (let n = 0; n < 5; n++) {
    box(H, R, 4.41 + n * 0.37, 9.73, 0.11, 1.13, 0.15, 1.18, 'sun', 0.38);
    H.line(R, [H.p(4.44 + n * 0.37, 10.89, 0.26), H.p(4.44 + n * 0.37, 10.89, 1.23)], 'paper', 1);
  }
  coiledLine(H, R, 7.15, 10.47, 0.03, 16, 'blue');
}

const room = world('hong-kong-kwun-tong-print', 'Kwun Tong · One fresh layer', { floor: 'paper', tone: .4, wall: 'paper', wallTone: .85, height: 3.86, head: 20 }, (H, R) => {
  for (let i = .25; i < 12; i += 3) box(H, R, i, .04, .27, .24, .01, 3.81, 'teal', .35);
  box(H, R, .08, .04, 11.8, .3, 3.57, .26, 'teal', .45);
  shape(H, R, wallRect(H, 'nw', 1.18, 7.22, 1.43, 3.52), 'teal', .25, .8);
  for (let p = 1.28; p < 7.3; p += 1.17) H.line(R, [wallPt(H, 'nw', p, 1.47, .08), wallPt(H, 'nw', p, 3.47, .08)], 'paper', 2.3);
  H.line(R, [wallPt(H, 'nw', 1.23, 2.5, .08), wallPt(H, 'nw', 7.17, 2.5, .08)], 'paper', 2.5);
  shape(H, R, [H.p(.15, 1.45, .015), H.p(.15, 6.65, .015), H.p(5.36, 9.13, .015), H.p(5.36, 4.25, .015)], 'sun', .1, .2);
  for (const i of [7.87, 11.28]) box(H, R, i, .56, .1, 1.53, .03, 3.09, 'blue', .78);
  for (let q = 0; q < 9; q++) {
    const z = .28 + q * .32;
    box(H, R, 7.85, .56, 3.53, 1.61, z, .045, 'blue', .52);
    if (q % 2 === 0) print(H, R, H.tile(8.03, .74, 2.97, 1.17, z + .06), ...H.p(9.5, 1.32, z + .07), .8, q === 2);
    for (let i = 8.05; i < 11.2; i += .38) H.line(R, [H.p(i, .6, z + .05), H.p(i, 2.1, z + .05)], 'paper', .5, { tone: .5 });
  }
  table(H, R, 3.48, 3.38, 4.47, 3.68, 1.0, 'teal');
  shape(H, R, H.tile(3.62, 3.55, 4.18, 3.31, 1.14), 'paper', 1, .8);
  shape(H, R, H.tile(4.2, 4.1, 2.74, 2.0, 1.16), 'paper', 1, .65);
  for (const [i, j] of [[4.13, 4.04], [6.99, 4.04], [4.13, 6.16]]) box(H, R, i, j, .17, .17, 1.17, .06, 'coral', .65);
  box(H, R, 3.76, 4.43, 3.8, 1.87, .05, .29, 'blue', .22);
  for (let q = 0; q < 6; q++) box(H, R, 4.06, 4.61, 3.21, 1.45, .35 + q * .045, .03, 'paper', 1);
  table(H, R, 8.9, 3.43, 2.37, 2.26, .85, 'paper');
  for (let q = 0; q < 6; q++) jar(H, R, 9.22 + q % 3 * .66, 3.78 + Math.floor(q / 3) * .65, .99, ['teal', 'coral', 'sun'][q % 3]);
  shape(H, R, H.tile(9.1, 4.96, 1.28, .46, 1.01), 'paper', 1, .6);
  oval(H, R, ...H.p(9.44, 5.16, 1.03), 7, 3, 'coral', .65);
  H.line(R, [H.p(10.03, 5.3, 1.03), H.p(10.65, 4.99, 1.03)], 'blue', 2);
  shape(H, R, H.tile(10.51, 4.88, .26, .27, 1.05), 'paper', 1, .6);
  table(H, R, 1.01, 8.08, 2.0, 1.45, .76, 'teal');
  box(H, R, 1.15, 8.22, 1.36, .98, .9, .22, 'paper', 1);
  shape(H, R, H.tile(1.25, 8.32, 1.14, .75, 1.14), 'blue', .28, .6);
  stroke(H, R, [H.p(2.44, 8.32, 1.13), H.p(2.44, 8.32, 1.7), H.p(2.05, 8.32, 1.7), H.p(2.05, 8.32, 1.51)], 'blue', 3);
  H.line(R, [H.p(2.5, 8.55, 1.22), H.p(2.82, 8.55, 1.22)], 'coral', 2.2);
  for (let q = 0; q < 4; q++) H.line(R, [H.p(2.66 + q * .07, 8.94, .95), H.p(2.63 + q * .09, 8.94, 1.55 - q * .07)], q % 2 ? 'coral' : 'sun', 1.8);
  jar(H, R, 2.77, 8.95, .94, 'teal');
  box(H, R, 9.32, 7.32, 1.18, 1.02, .02, .56, 'coral', .3);
  for (let q = 0; q < 6; q++) {
    const [x, y] = H.p(9.48 + q % 3 * .26, 7.51 + Math.floor(q / 3) * .3, .6);
    shape(H, R, [[x - 6, y], [x + 5, y - 4], [x + 10, y + 5], [x - 1, y + 9]], q % 2 ? 'paper' : 'teal', .6, .4);
  }
  table(H, R, 8.36, 10.22, 2.22, 1.19, .66, 'paper');
  print(H, R, H.tile(8.48, 10.31, 1.96, .95, .81), ...H.p(9.44, 10.79, .83), .64);
  const [tx, ty] = H.p(10.66, 6.17, .03);
  oval(H, R, tx, ty, 17, 7, 'coral', .5);
  for (const dx of [-10, 10]) H.line(R, [[tx + dx, ty], [tx + dx, ty - 23]], 'blue', 2);
  oval(H, R, tx, ty - 23, 17, 7, 'paper', 1);
  const [cx, cy] = wallPt(H, 'ne', 5.46, 2.61, .05);
  oval(H, R, cx, cy, 10, 11, 'sun', .6);
  H.line(R, [[cx, cy - 7], [cx, cy], [cx + 4, cy + 3]], 'blue', 1.2);
  kwunTongPrintDetails(H, R);
}, (H, R, t) => {
  const u = cycle(t, 16), rise = u < .69 ? 0 : u < .79 ? (1 - Math.cos((u - .69) / .1 * Math.PI)) / 2 : u < .88 ? 1 : (1 + Math.cos((u - .88) / .12 * Math.PI)) / 2;
  screen(H, R, rise * .1);
  actor(H, R, 8.1, 5.4, t, 'hongKongScreenRehearse', { shirt: ['paper', 1], apron: ['coral', .67], hairStyle: 'short', face: 'nw', prop(HH, RR, points) {
    const a = points.nearHand, b = points.farHand, x = (a[0] + b[0]) / 2 - 8, y = (a[1] + b[1]) / 2 - 8;
    const tool = [[x - 24, y + 7], [x + 23, y - 9], [x + 23, y - 2], [x - 24, y + 14]];
    shape(HH, RR, tool, 'coral', .65, .9);
    shape(HH, RR, [[x - 24, y + 14], [x + 23, y - 2], [x + 22, y + 2], [x - 25, y + 18]], 'blue', .7, .7);
    for (const hand of [a, b]) {
      const grip = [hand[0], y + 6 - (hand[0] - x) * .35];
      HH.line(RR, [hand, grip], 'blue', 4.6);
      HH.line(RR, [hand, grip], 'coral', 3.1);
    }
  } }, 0, 1.55);
  const [x, y] = H.p(.19, 7.34, 1.74), sway = Math.sin(u * TAU) * 3;
  shape(H, R, [[x - 9, y], [x + 9, y - 5], [x + 10 + sway, y + 32], [x - 9 + sway, y + 37]], 'coral', .36, .7);
  for (let q = 0; q < 3; q++) H.line(R, [[x - 4 + q * 4, y + 1], [x - 4 + q * 4 + sway, y + 29]], 'paper', .8);
});

room.loopSeconds = 16;
export default room;
