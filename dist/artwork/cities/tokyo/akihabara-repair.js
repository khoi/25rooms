import { world, shape, oval, stroke, box, table, actor, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const inks = ['teal', 'coral', 'sun', 'blue'];
const rest = FIGURES.clips.idle.keys[0][1];
const seated = { drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -9, head: 13, al: 57, el: 48 };
FIGURES.clips.tokyoRepairJoint = { dur: 12, keys: [[0, { ...rest, ...seated, ar: 71, er: 35 }], [.29, { ...rest, ...seated, ar: 74, er: 28 }], [.4, { ...rest, ...seated, ar: 42, er: 103 }], [.57, { ...rest, ...seated, ar: 42, er: 103 }], [.67, { ...rest, ...seated, ar: 90, er: 16 }], [.79, { ...rest, ...seated, ar: 90, er: 22, head: -4 }], [.9, { ...rest, ...seated, ar: 47, er: 56, head: -4 }], [1, { ...rest, ...seated, ar: 71, er: 35 }]] };

function coil(H, R, x, y, s = 1, ink = 'coral') {
  for (let q = 0; q < 4; q++) H.outline(R, Array.from({ length: 28 }, (_, k) => [x + Math.cos(k * TAU / 28) * (10 + q) * s, y + Math.sin(k * TAU / 28) * (4 + q * .6) * s]), ink, .8, { tone: .8, amp: .1 });
  H.line(R, [[x + 10 * s, y], [x + 20 * s, y + 7 * s]], 'blue', 1.2);
}

function speaker(H, R, i, j, z, s = 1) {
  box(H, R, i, j, .92 * s, .6 * s, z, 1.17 * s, 'blue', .65);
  const [x, y] = H.p(i + .46 * s, j + .62 * s, z + .53 * s);
  oval(H, R, x, y, 12 * s, 14 * s, 'paper', 1);
  oval(H, R, x, y, 9 * s, 11 * s, 'teal', .55);
  oval(H, R, x, y, 4 * s, 5 * s, 'blue');
  oval(H, R, ...H.p(i + .46 * s, j + .63 * s, z + .96 * s), 3 * s, 3 * s, 'sun');
}

function drawers(H, R) {
  box(H, R, .18, .16, 10.5, .83, .25, 2.83, 'blue', .64);
  for (let row = 0; row < 5; row++) for (let col = 0; col < 11; col++) {
    const i = .34 + col * .93, z = .35 + row * .51;
    shape(H, R, H.faceI(i, 1.01, .81, z, z + .43), 'paper', 1, .7);
    shape(H, R, H.faceI(i + .04, 1.035, .73, z + .1, z + .38), 'teal', .13, .3);
    for (let q = 0; q < 3; q++) {
      const [x, y] = H.p(i + .17 + q * .21, 1.05, z + .22);
      if (row % 3 === 0) {
        H.line(R, [[x - 4, y - 2], [x + 5, y + 2]], 'blue', .65);
        oval(H, R, x, y, 2.8, 1.6, col % 2 ? 'coral' : 'sun');
      } else if (row % 3 === 1) {
        shape(H, R, [[x - 2, y - 3], [x + 2, y - 3], [x + 2, y + 2], [x - 2, y + 2]], inks[col % 4], .55, .4);
        H.line(R, [[x - 1, y + 2], [x - 1, y + 5]], 'blue', .6);
      } else {
        oval(H, R, x, y, 2.4, 3, col % 2 ? 'sun' : 'teal');
        H.line(R, [[x, y + 2], [x, y + 5]], 'blue', .55);
      }
    }
    H.line(R, [H.p(i + .32, 1.07, z + .08), H.p(i + .53, 1.07, z + .08)], 'blue', 1.4);
  }
}

function bench(H, R) {
  table(H, R, 2.65, 1.55, 7.61, 2.2, 1.05, 'paper');
  shape(H, R, H.tile(4.6, 2.18, 2.5, 1.34, 1.18), 'teal', .53);
  for (let q = 0; q < 4; q++) H.line(R, [H.p(4.71 + q * .61, 2.29, 1.19), H.p(4.71 + q * .61, 3.35, 1.19)], 'paper', .6, { tone: .5 });
  box(H, R, 5.0, 2.5, 1.66, .76, 1.2, .17, 'blue', .8);
  shape(H, R, H.tile(5.12, 2.61, 1.39, .53, 1.39), 'teal', .66);
  for (let q = 0; q < 7; q++) {
    const i = 5.24 + q % 4 * .3, j = 2.68 + Math.floor(q / 4) * .25;
    box(H, R, i, j, .12, .11, 1.4, .09 + q % 3 * .04, inks[q % 3], .7);
    H.line(R, [H.p(i - .06, j, 1.41), H.p(i - .06, j + .2, 1.41), H.p(i + .18, j + .2, 1.41)], 'sun', .6);
  }
  speaker(H, R, 6.64, 2.61, 1.18, .55);
  box(H, R, 7.73, 1.77, 1.43, .91, 1.18, .91, 'paper', 1);
  shape(H, R, H.faceI(7.82, 2.7, .98, 1.37, 1.99), 'blue', .84);
  for (let q = 1; q < 5; q++) {
    H.line(R, [H.p(7.82 + q * .195, 2.72, 1.4), H.p(7.82 + q * .195, 2.72, 1.97)], 'teal', .55, { tone: .55 });
    H.line(R, [H.p(7.84, 2.72, 1.4 + q * .114), H.p(8.78, 2.72, 1.4 + q * .114)], 'teal', .55, { tone: .55 });
  }
  for (let q = 0; q < 3; q++) oval(H, R, ...H.p(8.99, 2.71, 1.4 + q * .23), 3, 3, 'blue');
  box(H, R, 7.23, 3.02, .55, .5, 1.18, .21, 'coral', .6);
  shape(H, R, H.tile(7.3, 3.07, .4, .21, 1.41), 'blue', .8);
  oval(H, R, ...H.p(7.5, 3.4, 1.42), 4, 3, 'paper');
  stroke(H, R, [H.p(7.23, 3.38, 1.4), H.p(6.94, 3.77, 1.2), H.p(6.7, 3.67, 1.2), H.p(6.57, 3.16, 1.45)], 'coral', 1.2);
  stroke(H, R, [H.p(7.66, 3.41, 1.4), H.p(7.98, 3.86, 1.18), H.p(7.8, 4.01, 1.17), H.p(6.85, 3.72, 1.18)], 'blue', 1.1);
  box(H, R, 3.0, 2.74, .89, .75, 1.18, .31, 'teal');
  oval(H, R, ...H.p(3.58, 3.51, 1.35), 4, 4, 'sun');
  H.line(R, [H.p(3.12, 3.53, 1.37), H.p(3.32, 3.53, 1.37)], 'paper', 2);
  const [ex, ey] = H.p(4.22, 1.82, 2.09);
  shape(H, R, [[ex - 16, ey - 12], [ex + 14, ey - 12], [ex + 14, ey + 14], [ex - 16, ey + 14]], 'blue', .72);
  for (let q = 0; q < 6; q++) H.line(R, [[ex - 12, ey - 8 + q * 3.7], [ex + 11, ey - 8 + q * 3.7]], 'paper', .7);
  H.line(R, [H.p(4.21, 1.82, 1.2), H.p(4.21, 1.82, 2.09)], 'blue', 3);
  stroke(H, R, [H.p(3.97, 1.98, 1.2), H.p(3.53, 2.06, 1.78), H.p(4.06, 2.73, 2.01)], 'blue', 2);
  oval(H, R, ...H.p(4.07, 2.74, 2.01), 13, 7, 'paper');
  oval(H, R, ...H.p(4.07, 2.74, 2.01), 10, 4.5, 'teal', .12);
  const [tx, ty] = H.p(4.14, 3.38, 1.23);
  oval(H, R, tx, ty, 12, 6, 'blue', .45);
  for (let q = 0; q < 6; q++) H.line(R, [[tx - 7 + q * 2.5, ty - 2 + q % 2 * 3], [tx - 4 + q * 2.5, ty + q % 2 * 3]], 'paper', .8);
  coil(H, R, ...H.p(3.4, 1.98, 1.21), .66, 'sun');
  for (let q = 0; q < 2; q++) H.line(R, [H.p(8.74 + q * .14, 3.3, 1.22), H.p(8.91, 3.73, 1.22)], 'blue', 1);
  shape(H, R, H.tile(9.17, 2.58, .78, .97, 1.2), 'paper', 1);
  for (let q = 0; q < 3; q++) {
    box(H, R, 9.3, 2.7 + q * .23, .17, .15, 1.21, .02, 'teal', .3);
    H.line(R, [H.p(9.49, 2.78 + q * .23, 1.24), H.p(9.8, 2.78 + q * .23, 1.24)], 'blue', .6);
  }
}

function furnishings(H, R) {
  drawers(H, R);
  box(H, R, .12, 1.2, .16, 9.75, 3.11, .12, 'paper', 1);
  for (let q = 0; q < 5; q++) {
    const j = 2.0 + q * 1.05, [x, y] = H.p(.28, j, 2.34);
    oval(H, R, x, y, 17, 20, 'paper');
    oval(H, R, x, y, 12, 15, inks[q % 3], .62);
    oval(H, R, x, y, 4, 5, 'blue');
    stroke(H, R, [[x + 9, y + 7], [x + 20, y + 19], [x + 13, y + 35]], inks[q % 3], 1.7);
  }
  for (let q = 0; q < 2; q++) {
    table(H, R, .25, 7.03 + q * 1.89, 1.16, 1.63, .63 + q * .04, 'blue');
    for (let n = 0; n < 3; n++) {
      box(H, R, .43, 7.15 + q * 1.89 + n * .45, .66, .32, .79, .5, 'paper');
      const [x, y] = H.p(.78, 7.29 + q * 1.89 + n * .45, 1.33);
      oval(H, R, x, y, 5, 10, 'sun', .32);
      H.line(R, [[x - 2, y + 7], [x - 2, y - 5], [x + 2, y - 5], [x + 2, y + 7]], 'blue', .6);
    }
  }
  bench(H, R);
  box(H, R, 5.16, 4.05, .83, .75, 0, .65, 'coral', .48);
  table(H, R, 2.35, 8.35, 6.52, 1.36, .95, 'teal');
  for (let q = 0; q < 3; q++) {
    box(H, R, 2.67 + q * 1.03, 8.57, .79, .63, 1.1, .12, 'sun', .34);
    for (let n = 0; n < 5; n++) {
      const [x, y] = H.p(2.78 + q * 1.03 + n % 3 * .2, 8.67 + Math.floor(n / 3) * .23, 1.26);
      oval(H, R, x, y, q === 0 ? 2 : 4, 3, inks[q]);
      if (q !== 0) H.line(R, [[x - 2, y + 2], [x - 2, y + 7]], 'blue', .7);
    }
  }
  box(H, R, 6.26, 8.65, .65, .67, 1.1, .17, 'coral', .62);
  shape(H, R, H.tile(6.35, 8.71, .44, .23, 1.29), 'paper', 1);
  H.line(R, [H.p(6.44, 8.8, 1.31), H.p(6.64, 8.83, 1.31)], 'blue', .8);
  for (let q = 0; q < 2; q++) box(H, R, 6.31 + q * .26, 9.0, .18, .32, 1.28, .12, q ? 'sun' : 'teal');
  stroke(H, R, [H.p(6.89, 8.89, 1.21), H.p(7.15, 9.4, 1.11), H.p(7.57, 9.32, 1.1)], 'coral', 1.1);
  for (let q = 0; q < 2; q++) {
    box(H, R, 7.43 + q * .57, 8.5, .44, .73, 1.1, .12, 'paper', 1);
    shape(H, R, H.tile(7.49 + q * .57, 8.56, .3, .27, 1.24), 'blue', .75);
    H.dot(...H.p(7.76 + q * .57, 9.04, 1.25), 2.3, 'coral');
    H.line(R, [H.p(7.51 + q * .57, 8.96, 1.25), H.p(7.63 + q * .57, 9.06, 1.25)], 'blue', 1.8);
  }
  speaker(H, R, 10.18, 1.89, 0, 1.05);
  speaker(H, R, 10.22, 3.0, 0, .87);
  box(H, R, 9.26, 6.43, 1.15, 1.1, 0, .61, 'sun', .5);
  for (let q = 0; q < 3; q++) {
    const [x, y] = H.p(9.6 + q * .21, 6.92, .66);
    oval(H, R, x, y, 7, 8, 'teal', .45);
    H.line(R, [[x, y - 5], [x + 5, y - 15]], 'blue', 1.3);
  }
  coil(H, R, ...H.p(10.48, 8.37, .05), 1.1, 'blue');
  box(H, R, 10.64, 5.44, .54, .78, 0, .7, 'paper', 1);
  shape(H, R, H.faceI(10.77, 6.24, .29, .41, .57), 'blue', .8);
  for (let q = 0; q < 3; q++) H.line(R, [H.p(10.74, 6.23, .13 + q * .07), H.p(11.04, 6.23, .13 + q * .07)], 'blue', .7);
  H.line(R, [H.p(11.68, 2.06, .05), H.p(11.68, 10.43, .05)], 'sun', 2.4);
  shape(H, R, H.tile(9.54, 10.72, 1.98, .82, .03), 'coral', .35);
}

export default world('tokyo-akihabara-repair', 'Akihabara · One more connection', { floor: 'paper', tone: .42, wall: 'teal', wallTone: .2, height: 3.4, pattern: 'tiles', head: 20 }, furnishings, (H, R, t) => {
  const u = cycle(t, 12), powered = u > .65 && u < .95;
  actor(H, R, 5.65, 4.13, t, 'tokyoRepairJoint', { shirt: ['teal', .66], glasses: true, face: 'nw', prop(HH, RR, points) {
    if (u < .6 || u > .95) {
      const [x, y] = points.nearHand;
      HH.line(RR, [[x, y], [x - 8, y - 8]], 'blue', 3);
      HH.line(RR, [[x - 8, y - 8], [x - 14, y - 13]], 'sun', 1.1);
    }
  } }, .12, 1.2);
  actor(H, R, 6.25, 7.23, t * .25, 'hold', { shirt: ['coral', .62], face: 'ne', prop(HH, RR, points) {
    const [x, y] = points.nearHand;
    shape(HH, RR, [[x - 20, y + 2], [x + 12, y + 12], [x + 15, y - 7], [x - 17, y - 17]], 'blue', .6);
    for (let q = 0; q < 6; q++) HH.line(RR, [[x - 12 + q * 4, y - 10], [x - 14 + q * 4, y + 2]], 'paper', .6);
  } }, 0, 1.2);
  const trace = [];
  for (let q = 0; q <= 32; q++) {
    const v = q / 32, magnitude = powered ? .12 : .025;
    trace.push(H.p(7.86 + v * .88, 2.74, 1.67 + Math.sin(v * TAU * (powered ? 2 : 7) + t * (powered ? 2 : 12)) * magnitude));
  }
  H.line(R, trace, powered ? 'sun' : 'teal', 1.35, { amp: .05 });
  H.dot(...H.p(6.73, 3.25, 1.52), powered ? 3 : 1.8, powered ? 'sun' : 'blue', 1, { knock: true });
  if (u < .3) {
    const [x, y] = H.p(5.71, 2.89, 1.53), rise = cycle(t, 2.2);
    H.opacity(Math.sin(rise * Math.PI) * .55, () => stroke(H, R, [[x, y], [x - 8 - rise * 10, y - 11], [x - 23 - rise * 12, y - 20], [x - 42, y - 28]], 'paper', 1.5));
  }
});
