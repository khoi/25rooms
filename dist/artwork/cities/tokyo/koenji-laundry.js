import { world, shape, oval, stroke, box, table, bench, actor, cycle, bottle, ell, TAU } from '../../worlds/common.js';

const dryerColumns = [2.65, 5.12, 7.59];
const entrance = H => H.faceJ(.07, 7.53, 3.66, .15, 3.39);
const clamp = n => Math.max(0, Math.min(1, n));
const ease = n => { const x = clamp(n); return x * x * (3 - 2 * x); };

function towel(H, R, i, j, z, ink, w = .74, d = .54) {
  box(H, R, i, j, w, d, z, .09, ink, .64);
  H.line(R, [H.p(i + .06, j + d, z + .05), H.p(i + w - .06, j + d, z + .05)], 'paper', .9);
}

function sock(H, R, i, j, z) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 4, y - 17], [x + 3, y - 17], [x + 3, y - 4], [x + 11, y - 2], [x + 10, y + 4], [x - 3, y + 1]], 'paper', 1, .6);
  for (const dy of [-13, -9]) H.line(R, [[x - 3, y + dy], [x + 2, y + dy]], 'coral', 1.5);
}

function basket(H, R, i, j, ink, loaded = false) {
  box(H, R, i, j, 1.1, .83, .05, .58, ink, .27);
  for (let k = 0; k < 6; k++) H.line(R, [H.p(i + .11 + k * .17, j + .85, .12), H.p(i + .11 + k * .17, j + .85, .59)], 'blue', .7);
  for (const z of [.23, .42]) H.line(R, [H.p(i, j + .85, z), H.p(i + 1.1, j + .85, z), H.p(i + 1.1, j, z)], 'blue', .65);
  shape(H, R, H.tile(i + .08, j + .08, .94, .67, .64), 'paper', .9);
  if (loaded) for (let k = 0; k < 5; k++) oval(H, R, ...H.p(i + .2 + k % 3 * .28, j + .22 + Math.floor(k / 3) * .27, .68), 8, 4, k % 2 ? 'coral' : 'teal', .58);
}

function machine(H, R, i, j, z, tall = false) {
  box(H, R, i, j, 2.14, 1.64, z, 1.76, 'paper', .96);
  shape(H, R, H.faceI(i + .08, j + 1.655, 1.98, z + .22, z + 1.34), 'teal', .17);
  H.outline(R, H.faceI(i + .08, j + 1.66, 1.98, z + .06, z + 1.69), 'blue', .7);
  shape(H, R, H.faceI(i + .35, j + 1.68, 1.05, z + 1.44, z + 1.68), 'blue', .71);
  shape(H, R, H.faceI(i + .95, j + 1.7, .3, z + 1.51, z + 1.61), 'sun', .62);
  for (const x of [i + .14, i + 2.0]) for (const h of [.12, 1.31]) H.dot(...H.p(x, j + 1.69, z + h), 1.1, 'blue');
  for (let k = 0; k < 4; k++) H.line(R, [H.p(i + 2.16, j + .26 + k * .25, z + .31), H.p(i + 2.16, j + .26 + k * .25, z + 1.22)], 'teal', .8);

  H.line(R, [H.p(i + .11, j + 1.67, z + 1.41), H.p(i + 2.04, j + 1.67, z + 1.41)], 'blue', .8);
  const [x, y] = H.p(i + 1.06, j + 1.68, z + .84);
  oval(H, R, x, y, tall ? 28 : 26, tall ? 30 : 27, 'blue', .65);
  oval(H, R, x, y, tall ? 26 : 24, tall ? 28 : 25, 'paper', .85);
  oval(H, R, x, y, tall ? 25 : 23, tall ? 27 : 24, 'teal', .65);
  for (const dy of [-11, 11]) shape(H, R, [[x - 29, y + dy - 3], [x - 23, y + dy - 3], [x - 23, y + dy + 3], [x - 29, y + dy + 3]], 'paper', .9);
  stroke(H, R, [[x + 24, y - 9], [x + 29, y - 7], [x + 29, y + 7], [x + 24, y + 9]], 'blue', 2.1);

  oval(H, R, x, y, tall ? 21 : 19, tall ? 23 : 20, 'blue', .83);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(i + .19 + k * .43, j + 1.69, z + .13), H.p(i + .4 + k * .43, j + 1.69, z + .13)], 'blue', .65);
  H.line(R, [H.p(i + .54, j + 1.69, z + 1.57), H.p(i + .83, j + 1.69, z + 1.57)], 'blue', 2.2);
  oval(H, R, ...H.p(i + 1.75, j + 1.7, z + 1.56), 3.5, 3.5, 'coral', .8);
  H.line(R, [H.p(i + .2, j + 1.69, z + 1.5), H.p(i + .2, j + 1.69, z + 1.64)], 'blue', 1.5);
}

function drum(H, R, i, j, z, angle, big = false) {
  const [x, y] = H.p(i + 1.06, j + 1.68, z + .84);
  H.clip(ell(x, y, big ? 20 : 18, big ? 22 : 19), () => {
    for (let k = 0; k < (big ? 3 : 5); k++) {
      const a = angle + k * TAU / (big ? 3 : 5);
      oval(H, R, x + Math.cos(a) * (big ? 8 : 10), y + Math.sin(a) * 12, big ? 15 : 9, big ? 10 : 5, big ? 'paper' : ['teal', 'coral', 'sun'][k % 3], .75);
      stroke(H, R, [[x + Math.cos(a) * 8 - 5, y + Math.sin(a) * 12], [x + Math.cos(a) * 8, y + Math.sin(a) * 12 - 3], [x + Math.cos(a) * 8 + 4, y + Math.sin(a) * 12]], 'blue', .65, .5);
    }
  });
  stroke(H, R, [[x - 12, y - 14], [x - 16, y - 2], [x - 13, y + 9]], 'paper', 1.25);
}

function laundryDetails(H, R) {
  table(H, R, .98, 7.62, 2.79, 1.24, 1.03, 'coral');
  box(H, R, 1.34, 7.93, 1.02, .62, 1.17, .11, 'blue', .65);
  const [x, y] = H.p(1.89, 8.3, 1.31);
  shape(H, R, [[x - 17, y], [x + 17, y], [x + 16, y - 26], [x + 7, y - 32], [x - 14, y - 32], [x - 14, y - 23], [x + 1, y - 23], [x + 1, y - 6], [x - 17, y - 6]], 'teal', .68);
  oval(H, R, x + 16, y - 20, 5, 8, 'sun', .8);
  H.line(R, [[x - 10, y - 24], [x - 10, y - 3]], 'blue', 1.4);
  H.line(R, [[x + 2, y - 33], [x + 2, y - 39]], 'blue', 1.2);
  oval(H, R, x + 2, y - 39, 4, 2, 'coral', .7);
  shape(H, R, H.tile(1.08, 8.1, 1.25, .65, 1.32), 'sun', .54);
  for (let k = 0; k < 5; k++) H.line(R, [H.p(1.15 + k * .2, 8.14, 1.34), H.p(1.15 + k * .2, 8.71, 1.34)], 'teal', .7);
  for (let k = 0; k < 6; k++) {
    const [sx, sy] = H.p(2.65 + k % 3 * .33, 7.83 + Math.floor(k / 3) * .41, 1.19);
    shape(H, R, [[sx - 3, sy], [sx + 3, sy], [sx + 3, sy - 10], [sx - 3, sy - 10]], ['coral', 'teal', 'sun'][k % 3], .65, .6);
    H.line(R, [[sx - 4, sy], [sx + 4, sy]], 'blue', .8);
    H.line(R, [[sx - 4, sy - 10], [sx + 4, sy - 10]], 'blue', .8);
  }
  const [cx, cy] = H.p(3.23, 8.5, 1.2);
  oval(H, R, cx - 5, cy, 3, 2.5, 'paper'); oval(H, R, cx + 3, cy, 3, 2.5, 'paper');
  H.line(R, [[cx - 5, cy], [cx + 6, cy - 12]], 'blue', 1.1);
  H.line(R, [[cx + 3, cy], [cx - 7, cy - 11]], 'blue', 1.1);
  oval(H, R, ...H.p(2.59, 8.51, 1.25), 7, 4, 'coral', .7);
  for (let k = 0; k < 5; k++) H.line(R, [H.p(2.58, 8.51, 1.3), H.p(2.51 + k * .04, 8.48, 1.51)], 'blue', .6);
  box(H, R, 2.19, 8.01, .64, .49, .04, .09, 'blue', .7);
  stroke(H, R, [H.p(2.4, 8.2, .14), H.p(3.46, 7.97, .09), H.p(3.48, 7.99, 1.14)], 'blue', .9);
  table(H, R, 1.63, 9.17, .75, .72, .47, 'sun');
  basket(H, R, 3.06, 9.17, 'teal', true);
  for (let k = 0; k < 4; k++) towel(H, R, .51, 8.81, .05 + k * .12, k % 2 ? 'paper' : 'coral', .57, .6);
  for (const i of [6.96, 8.61]) {
    H.line(R, [H.p(i, 8.24, .04), H.p(i + .51, 9.03, 1.04)], 'blue', 1.9);
    H.line(R, [H.p(i + .51, 9.03, .04), H.p(i, 8.24, 1.04)], 'blue', 1.9);
  }
  shape(H, R, [H.p(6.67, 8.11, 1.08), H.p(9.07, 8.11, 1.08), H.p(9.47, 8.56, 1.08), H.p(9.07, 9.05, 1.08), H.p(6.67, 9.05, 1.08)], 'teal', .62);
  shape(H, R, H.tile(6.83, 8.23, 1.43, .7, 1.12), 'paper');
  for (let k = 0; k < 5; k++) H.line(R, [H.p(6.93 + k * .24, 8.27, 1.13), H.p(6.93 + k * .24, 8.89, 1.13)], 'coral', .85);
  bottle(H, R, ...H.p(8.96, 8.57, 1.12), 'sun', .37);
  stroke(H, R, [H.p(8.37, 8.95, 1.12), H.p(8.63, 9.28, .63), H.p(8.45, 9.45, .02), H.p(9.31, 9.53, .02)], 'blue', 1);
  for (const i of [8.98, 11.32]) {
    H.line(R, [H.p(i, 11.09, .06), H.p(i, 11.09, 2.38)], 'blue', 2.2);
    H.line(R, [H.p(i, 10.79, .06), H.p(i, 11.41, .06)], 'teal', 2.6);
    for (const j of [10.81, 11.38]) oval(H, R, ...H.p(i, j, .06), 3, 4, 'blue');
  }
  H.line(R, [H.p(8.96, 11.09, 2.38), H.p(11.35, 11.09, 2.38)], 'sun', 2.3);
  for (const [i, j, ink] of [[3.08, 3.27, 'teal'], [5.02, 3.65, 'coral'], [10.28, 8.22, 'sun']]) {
    basket(H, R, i, j, ink, true);
    towel(H, R, i + .18, j + .04, .79, 'paper', .62, .55);
  }
  for (let k = 0; k < 4; k++) towel(H, R, 8.15, .72, 3.58 + k * .1, ['paper', 'teal', 'coral', 'paper'][k], 1.05, .72);
  for (let k = 0; k < 3; k++) box(H, R, 5.5 + k * .48, .73, .39, .6, 3.59, .39, ['sun', 'coral', 'teal'][k], .58);
  for (const j of [6.81, 7.22]) {
    shape(H, R, H.faceJ(.11, j, .29, 2.93, 3.39), 'paper');
    oval(H, R, ...H.p(.12, j + .14, 3.18), 4, 5, 'teal', .62);
  }
  box(H, R, 5.88, 10.7, 1.11, .65, .73, .04, 'paper');
  H.line(R, [H.p(6.43, 10.73, .79), H.p(6.43, 11.31, .79)], 'blue', .75);
  for (let k = 0; k < 4; k++) oval(H, R, ...H.p(6.02 + k * .23, 10.94, .8), 3.8, 3, k % 2 ? 'coral' : 'teal', .6);
  basket(H, R, 7.74, 11.19, 'coral');
  for (let k = 0; k < 5; k++) sock(H, R, 7.94 + k % 3 * .28, 11.42 + Math.floor(k / 3) * .23, .71);
}

export default world('tokyo-koenji-laundry', 'Koenji · Until the last dryer stops', { floor: 'paper', tone: .8, wall: 'teal', wallTone: .26, height: 4.2, head: 20, pattern: 'tiles' }, (H, R) => {
  box(H, R, .23, .1, 9.53, .24, 3.6, .19, 'blue', .56);
  for (const i of dryerColumns) {
    stroke(H, R, [H.p(i + 1.07, .35, 3.56), H.p(i + 1.07, .18, 4.01), H.p(i + 1.87, .18, 4.01)], 'teal', 7);
    for (let k = 0; k < 4; k++) H.line(R, [H.p(i + .91, .31, 3.65 + k * .09), H.p(i + 1.22, .31, 3.65 + k * .09)], 'paper', .9);
    for (const z of [0, 1.8]) machine(H, R, i, .48, z, true);
  }

  machine(H, R, .31, 3.05, 0);
  machine(H, R, .31, 5.08, 0);
  box(H, R, 10.12, .45, 1.39, 1.1, 0, 2.39, 'coral', .55);
  shape(H, R, H.faceI(10.31, 1.59, 1, .82, 2.19), 'blue', .85);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
    const [x, y] = H.p(10.47 + c * .25, 1.61, 1.03 + r * .4);
    shape(H, R, [[x - 3, y], [x + 3, y], [x + 3, y - 9], [x - 3, y - 9]], ['sun', 'teal', 'paper'][c], .8, .5);
    oval(H, R, x, y - 9, 3, 1.2, 'paper');
  }
  shape(H, R, H.faceI(10.34, 1.62, .93, .29, .55), 'blue', .88);
  const [cx, cy] = H.p(10.65, .08, 3.27);
  oval(H, R, cx, cy, 16, 16, 'paper');
  for (let k = 0; k < 12; k++) H.dot(cx + Math.sin(k * TAU / 12) * 12, cy - Math.cos(k * TAU / 12) * 12, k % 3 ? .7 : 1.2, 'blue');
  H.line(R, [[cx - 5, cy - 7], [cx, cy], [cx - 1, cy - 12]], 'blue', 1.2);
  for (const i of [3.6, 8.1]) {
    box(H, R, i, .1, 2.14, .17, 3.83, .13, 'paper');
    H.glow(...H.p(i + 1.07, .3, 3.8), 58, 21, 'paper', .3);
  }
  for (const z of [1.96, 2.6]) {
    box(H, R, .06, 3.01, .65, 3.34, z, .08, 'paper');
    for (let k = 0; k < 7; k++) bottle(H, R, ...H.p(.41, 3.24 + k * .43, z + .09), ['teal', 'sun', 'coral'][k % 3], .38);
  }
  for (const i of [4.21, 7.99]) {
    H.line(R, [H.p(i, 5.76, .13), H.p(i, 7.16, .93)], 'teal', 2);
    H.line(R, [H.p(i, 7.16, .13), H.p(i, 5.76, .93)], 'teal', 2);
  }
  box(H, R, 4.19, 5.75, 4.04, 1.44, .27, .09, 'teal', .42);
  for (let k = 0; k < 3; k++) towel(H, R, 4.54, 6.12, .38 + k * .1, k % 2 ? 'coral' : 'paper', 1.08, .84);
  box(H, R, 6.29, 5.98, 1.31, .92, .37, .4, 'sun', .3);
  for (let k = 0; k < 5; k++) H.line(R, [H.p(6.4 + k * .23, 6.92, .41), H.p(6.4 + k * .23, 6.92, .72)], 'teal', .8);
  table(H, R, 4.04, 5.57, 4.43, 1.83, 1.02, 'paper');
  H.line(R, [H.p(4.1, 7.42, 1.1), H.p(8.39, 7.42, 1.1)], 'teal', 1.5);

  for (let k = 0; k < 6; k++) towel(H, R, 4.23 + k % 2 * .85, 5.81, 1.16 + Math.floor(k / 2) * .095, k % 2 ? 'teal' : 'paper');
  shape(H, R, H.tile(6.5, 5.89, 1.3, 1.19, 1.17), 'teal', .17);
  H.hatch(R, H.tile(6.5, 5.89, 1.3, 1.19, 1.17), 'blue', 4, Math.PI / 4, .45, { tone: .4 });
  stroke(H, R, [H.p(6.56, 5.89, 1.19), H.p(6.86, 5.8, 1.19), H.p(7.42, 5.9, 1.19)], 'blue', .8);
  sock(H, R, 7.99, 6.94, 1.21);
  const [sx, sy] = H.p(5.96, 7.05, 1.2);
  shape(H, R, [[sx - 7, sy - 6], [sx - 17, sy], [sx - 13, sy + 10], [sx - 8, sy + 7], [sx - 8, sy + 25], [sx + 9, sy + 25], [sx + 9, sy + 7], [sx + 14, sy + 11], [sx + 18, sy + 1], [sx + 7, sy - 6], [sx, sy - 2]], 'sun', .54);
  shape(H, R, [[sx + 1, sy + 11], [sx + 7, sy + 11], [sx + 7, sy + 18], [sx + 1, sy + 18]], 'teal', .65, .5);
  for (let k = 0; k < 3; k++) H.line(R, [[sx + 1 + k * 2, sy + 10], [sx + 1 + k * 2, sy + 13]], 'blue', .6);
  basket(H, R, 4.54, 8.03, 'coral', true);
  basket(H, R, 9.16, 4.22, 'teal');
  basket(H, R, 10.27, 9.2, 'sun', true);
  sock(H, R, 10.79, 9.58, .78);
  bench(H, R, 4.29, 10.01, 4.64, 'teal');
  box(H, R, 7.61, 10.14, .92, .59, .71, .04, 'paper');
  shape(H, R, H.tile(7.67, 10.19, .8, .47, .76), 'coral', .38);
  oval(H, R, ...H.p(8.05, 10.42, .78), 5, 4, 'teal', .65);
  for (const [i, j] of [[9.98, 6.07], [11.03, 6.07]]) {
    H.line(R, [H.p(i, j, .08), H.p(i + .23, j + .97, 1.36)], 'blue', 1.8);
    H.line(R, [H.p(i + .23, j + .97, .08), H.p(i, j, 1.36)], 'blue', 1.8);
  }
  shape(H, R, H.tile(9.96, 6.36, 1.33, .65, .68), 'coral', .54);
  shape(H, R, H.faceI(9.99, 6.13, 1.2, 1.04, 1.53), 'coral', .54);
  box(H, R, 10.63, 2.67, .78, .78, 0, .84, 'teal', .47);
  shape(H, R, H.tile(10.7, 2.74, .64, .63, .86), 'blue', .75);
  H.line(R, [H.p(11.39, 3.53, .1), H.p(11.39, 3.53, 1.71)], 'sun', 1.6);
  shape(H, R, H.tile(11.09, 3.39, .58, .44, .07), 'coral', .75);
  H.line(R, [H.p(9.2, 7.54, .1), H.p(9.2, 8.39, 1.1), H.p(10.02, 8.39, 1.1), H.p(10.02, 7.54, .1)], 'blue', 1.7);
  H.line(R, [H.p(9.2, 8.23, .16), H.p(9.2, 7.55, .91), H.p(10.02, 7.55, .91), H.p(10.02, 8.23, .16)], 'blue', 1.7);
  for (const i of [9.23, 9.99]) oval(H, R, ...H.p(i, 8.26, .08), 3, 4, 'blue');
  H.line(R, [H.p(9.2, 8.42, 1.1), H.p(9.2, 8.42, 1.62), H.p(10.02, 8.42, 1.62), H.p(10.02, 8.42, 1.1)], 'teal', 2);
  for (let k = 0; k < 4; k++) {
    const [x, y] = H.p(.19, 6.45 + k * .26, 2.63);
    stroke(H, R, [[x, y - 5], [x + 4, y - 8], [x + 5, y - 3], [x - 10, y + 7], [x + 13, y + 7], [x + 5, y - 3]], 'blue', .8);
  }
  shape(H, R, entrance(H), 'blue', .7);
  H.clip(entrance(H), () => {
    shape(H, R, H.faceJ(.06, 7.72, 3.2, .18, 1.16), 'teal', .42);
    for (let k = 0; k < 6; k++) H.line(R, [H.p(.055, 7.65 + k * .58, .25), H.p(.055, 8.01 + k * .58, .48)], 'paper', 1, { tone: .5 });
    const [x, y] = H.p(.06, 9.72, 1.4);
    shape(H, R, [[x - 15, y], [x + 15, y], [x + 11, y + 17], [x - 11, y + 17]], 'paper', .45);
    for (let k = 0; k < 6; k++) H.line(R, [[x - 11 + k * 4, y + 1], [x - 9 + k * 3.6, y + 15]], 'blue', .65);
    stroke(H, R, [[x - 12, y - 6], [x - 8, y - 13], [x + 8, y - 13], [x + 12, y - 6]], 'blue', 2);
    shape(H, R, H.faceJ(.055, 7.73, .42, 1.6, 3.05), 'sun', .3);
  });
  H.outline(R, entrance(H), 'paper', 3);
  H.line(R, [H.p(.085, 9.34, .17), H.p(.085, 9.34, 3.38)], 'paper', 3);
  H.line(R, [H.p(.1, 9.05, 1.25), H.p(.1, 9.05, 1.75)], 'sun', 2.5);
  box(H, R, 1.35, 9.61, 1.43, .63, 0, .13, 'teal', .5);
  const [ux, uy] = H.p(2.17, 9.86, .17);
  stroke(H, R, [[ux, uy], [ux - 3, uy - 53], [ux + 3, uy - 59], [ux + 8, uy - 54]], 'blue', 1.5);
  shape(H, R, [[ux - 6, uy - 3], [ux - 8, uy - 43], [ux - 2, uy - 51], [ux + 6, uy - 42], [ux + 3, uy - 3]], 'coral', .66);
  laundryDetails(H, R);
}, (H, R, t) => {
  const u = cycle(t, 20) * 20, speed = TAU * 4 / 9.5;
  const spin = u < 7 ? speed * u : u < 10 ? speed * (7 + (u - 7) - (u - 7) ** 2 / 6) : u < 18 ? speed * 8.5 : speed * (8.5 + (u - 18) ** 2 / 4);
  for (let k = 0; k < dryerColumns.length; k++) for (let row = 0; row < 2; row++) drum(H, R, dryerColumns[k], .48, row * 1.8, k === 2 && row === 0 ? spin : t * (1.1 + k * .24 + row * .37), k === 2 && row === 0);
  drum(H, R, .31, 3.05, 0, t * 1.13);
  drum(H, R, .31, 5.08, 0, -t * .87);
  const stopped = u >= 10 && u < 18;
  H.dot(...H.p(9.34, 2.18, 1.56), 3.6, stopped ? 'teal' : 'coral', 1, { knock: true });
  const door = ease((u - 12) / 1.2) * (1 - ease((u - 16.7) / 1.1));
  const [dx, dy] = H.p(8.65, 2.16, .84);
  if (door > .005) {
    const x = dx - 24 - door * 16, y = dy + door * 9, width = 25 * Math.max(.14, 1 - door);
    oval(H, R, x, y, width, 27, 'paper', .9);
    oval(H, R, x, y, Math.max(1.5, width - 3), 23, 'teal', .25);
    H.line(R, [[dx - 24, dy - 17], [x + width, y - 17]], 'blue', 1.2);
  } else {
    H.outline(R, ell(dx, dy, 25, 27), 'teal', 2.4);
    oval(H, R, dx + 22, dy + 1, 2.8, 6, 'sun', .8);
  }
  const arrival = ease((u - 10.6) / 1.3) * (1 - ease((u - 17.8) / 1.3));
  actor(H, R, 10.55 - arrival * 1.85, 6.65 - arrival * 3.58, t * .5, arrival > .98 ? 'hold' : arrival > .02 ? 'walk' : 'sit', { shirt: ['coral', .65], face: 'nw' }, .23 * (1 - arrival), 1.21);
  actor(H, R, 5.82, 4.78, t * .25, 'hold', { shirt: ['teal', .65], face: 'se' }, 0, 1.2);
  const fold = .5 + Math.sin(t * .45) * .5;
  shape(H, R, [H.p(5.65, 5.65, 1.19), H.p(6.35, 5.65, 1.19), H.p(6.35, 6.13 - fold * .32, 1.19 + fold * .15), H.p(5.65, 6.13 - fold * .32, 1.19 + fold * .15)], 'paper', .9);
  actor(H, R, 5.19, 10.4, t * .17, 'read', { shirt: ['sun', .64], face: 'se', glasses: true }, .31, 1.19);
  const drip = cycle(t, 3.5), [ux, uy] = H.p(2.17, 9.86, .15);
  H.opacity(Math.sin(drip * Math.PI), () => H.dot(ux, uy - 8 + drip * 8, 1.1, 'teal', .7));
  if (u > 3 && u < 6) H.clip(entrance(H), () => {
    const [x, y] = H.p(.08, 7.1 + (u - 3) * 1.67, .35);
    H.opacity(.3, () => {
      H.outline(R, ell(x, y, 14, 17), 'blue', 2);
      H.outline(R, ell(x + 42, y + 14, 14, 17), 'blue', 2);
      stroke(H, R, [[x, y], [x + 21, y - 13], [x + 42, y + 14], [x + 17, y + 5], [x, y]], 'blue', 2);
    });
  });
  actor(H, R, 2.04, 9.53, t * .3, 'type', { shirt: ['sun', .69], face: 'nw', glasses: true }, .13, 1.17);
  const [nx, ny] = H.p(1.89, 8.3, 1.31);
  H.line(R, [[nx - 10, ny - 21], [nx - 10, ny - 4 + Math.sin(t * 8) * 2]], 'paper', 1.1);
  actor(H, R, 7.13, 9.4, t * .25, 'hold', { shirt: ['coral', .63], face: 'nw' }, 0, 1.17);
  const press = Math.sin(t * .8) * .23, [ix, iy] = H.p(7.44 + press, 8.6, 1.15);
  shape(H, R, [[ix - 12, iy + 4], [ix + 13, iy + 4], [ix + 7, iy - 6], [ix - 5, iy - 9]], 'blue', .7);
  stroke(H, R, [[ix - 4, iy - 6], [ix - 4, iy - 15], [ix + 4, iy - 15], [ix + 7, iy - 6]], 'coral', 2.2);
  for (let k = 0; k < 2; k++) {
    const v = cycle(t + k * .8, 2.8);
    H.opacity(Math.sin(v * Math.PI) * .44, () => stroke(H, R, [[ix + k * 4, iy - 7 - v * 21], [ix - 3 + k * 4, iy - 13 - v * 21], [ix + 2 + k * 4, iy - 19 - v * 21]], 'paper', 1.1));
  }
  actor(H, R, 6.72, 10.51, t * .28, 'read', { shirt: ['teal', .67], face: 'se' }, .34, 1, 'child');
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(9.31 + k * .78, 11.09, 2.34), sway = Math.sin(t * .47 + k) * 1.2;
    stroke(H, R, [[x, y - 4], [x + 3, y - 7], [x + 5, y - 3], [x - 10, y + 7], [x + 13, y + 7], [x + 5, y - 3]], 'blue', .8);
    shape(H, R, [[x - 8, y + 6], [x - 19, y + 13], [x - 14, y + 24], [x - 9, y + 19], [x - 9 + sway, y + 44], [x + 10 + sway, y + 44], [x + 10, y + 19], [x + 16, y + 25], [x + 21, y + 13], [x + 9, y + 6], [x + 1, y + 10]], ['coral', 'paper', 'teal'][k], .62);
    for (let q = 0; q < 4; q++) H.line(R, [[x - 8, y + 19 + q * 6], [x + 9, y + 19 + q * 6]], k === 1 ? 'teal' : 'paper', .8);
  }
});
