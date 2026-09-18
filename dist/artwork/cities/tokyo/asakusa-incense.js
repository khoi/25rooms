import { world, shape, oval, stroke, box, actor, cycle, ell, TAU } from '../../worlds/common.js';

function line(H, R, points, width = 1, ink = 'blue', tone = .8) {
  H.line(R, points, ink, width, { tone, amp: .12 });
}

function roof(H, R, i, j, w, d, z, rise, small = false) {
  const points = [H.p(i, j, z + rise), H.p(i + w, j, z + rise), H.p(i + w + .25, j + d, z + .18), H.p(i + w * .78, j + d, z), H.p(i + w * .22, j + d, z), H.p(i - .25, j + d, z + .18)];
  shape(H, R, points, 'blue', .78, 1.1);
  const rows = small ? 4 : 7;
  H.clip(points, () => {
    for (let n = 0; n < rows; n++) {
      const v = n / rows;
      line(H, R, [H.p(i - .25, j + d * v, z + rise * (1 - v)), H.p(i + w + .25, j + d * v, z + rise * (1 - v))], .65, 'paper', .5);
    }
    for (let n = 0; n <= w / .3; n++) {
      const x = i + n * .3;
      stroke(H, R, [H.p(x, j, z + rise), H.p(x, j + d * .55, z + rise * .5), H.p(x, j + d, z + (n < 2 || x > i + w - .6 ? .12 : 0))], 'paper', .9, .55);
    }
  });
  line(H, R, [H.p(i - .25, j + d, z + .18), H.p(i + .3, j + d, z), H.p(i + w - .3, j + d, z), H.p(i + w + .25, j + d, z + .18)], 3, 'blue');
  box(H, R, i + .12, j + .02, w - .24, .2, z + rise, .16, 'paper', .72);
  for (const x of [i + .03, i + w - .18]) box(H, R, x, j, .18, .22, z + rise + .04, .26, 'blue', .75);
}

function bowl(H, R, i, j, z, radius = 14) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - radius, y - 4], [x + radius, y - 4], [x + radius * .65, y + 10], [x - radius * .65, y + 10]], 'teal', .5, .7);
  oval(H, R, x, y - 4, radius, radius * .35, 'sun', .26);
}

function burner(H, R) {
  box(H, R, 4.52, 4.89, 3.46, 3.01, .02, .1, 'blue', .5);
  box(H, R, 4.65, 5.02, 3.2, 2.75, .12, .09, 'paper', .95);
  for (const i of [4.85, 7.55]) for (const j of [5.18, 7.45]) {
    box(H, R, i, j, .18, .15, .22, .045, 'sun', .7);
    line(H, R, [H.p(i, j, .28), H.p(i + .18, j + .15, .28)], .6);
  }
  const [ux, uy] = H.p(6.25, 6.25, .5);
  oval(H, R, ux, uy, 33, 14, 'blue', .7);
  oval(H, R, ux, uy - 5, 29, 12, 'teal', .65);
  for (const dx of [-26, 26]) stroke(H, R, [[ux + dx, uy], [ux + dx * 1.35, uy - 18], [ux + dx * 1.8, uy - 28]], 'teal', 5);
  for (const [i, j] of [[5.15, 5.5], [7.22, 5.5], [5.25, 7.1], [7.12, 7.1]]) {
    const [x, y] = H.p(i, j, .24);
    shape(H, R, [[x - 5, y], [x + 5, y], [x + 8, y - 25], [x - 6, y - 25]], 'teal', .65, .75);
  }
  const [x, y] = H.p(6.25, 6.25, 1.35);
  shape(H, R, [[x - 57, y], [x - 51, y + 23], [x - 28, y + 35], [x + 30, y + 35], [x + 53, y + 23], [x + 58, y]], 'teal', .6, 1.1);
  oval(H, R, x, y, 59, 28, 'teal', .8);
  oval(H, R, x, y, 51, 22, 'paper', .95);
  H.speckle(R, ell(x, y, 49, 20), 'blue', 95, .4, 1, .26);
  for (const dx of [-41, -21, 0, 21, 41]) {
    line(H, R, [[x + dx, y + 20], [x + dx * .9, y + 29]], .8, 'sun', .5);
    H.dot(x + dx, y + 23, 1.8, 'sun', .65);
  }
  for (const side of [-1, 1]) stroke(H, R, [[x + side * 54, y + 8], [x + side * 72, y - 4], [x + side * 75, y + 14], [x + side * 57, y + 20]], 'teal', 3.5);
  for (const dx of [-32, 0, 32]) {
    const seal = [[x + dx - 8, y + 16], [x + dx, y + 12], [x + dx + 8, y + 16], [x + dx + 5, y + 27], [x + dx - 5, y + 27]];
    shape(H, R, seal, 'sun', .4, .5);
    line(H, R, [[x + dx - 3, y + 18], [x + dx + 3, y + 24]], .7, 'teal');
    line(H, R, [[x + dx + 3, y + 18], [x + dx - 3, y + 24]], .7, 'teal');
  }
  for (let k = 0; k < 18; k++) {
    const dx = (k % 6) * 12 - 32, dy = Math.floor(k / 6) * 9 - 7;
    line(H, R, [[x + dx, y + dy], [x + dx + (k % 3 - 1) * 2, y + dy - 18 - k % 4 * 3]], 1.1, k % 3 ? 'coral' : 'blue', .7);
    H.dot(x + dx + (k % 3 - 1) * 2, y + dy - 18 - k % 4 * 3, .9, 'sun', .9);
  }
}


function charm(H, R, i, j, z, ink = 'coral', size = 1) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 5 * size, y], [x + 5 * size, y], [x + 6 * size, y - 15 * size], [x, y - 20 * size], [x - 6 * size, y - 15 * size]], ink, .74, .6);
  H.outline(R, [[x - 3 * size, y - 3 * size], [x + 3 * size, y - 3 * size], [x + 3 * size, y - 13 * size], [x - 3 * size, y - 13 * size]], 'sun', .7, {tone: .85, amp: .07});
  stroke(H, R, [[x, y - 18 * size], [x - 4 * size, y - 24 * size], [x, y - 27 * size], [x + 4 * size, y - 24 * size], [x, y - 18 * size]], 'paper', .8);
}

function courtyardDetails(H, R) {
  box(H, R, 1.75, 8.56, 1.4, 2.05, .03, .85, 'coral', .48);
  box(H, R, 1.66, 8.48, 1.58, 2.2, .89, .11, 'sun', .48);
  for (const j of [8.8, 9.44, 10.08]) {
    box(H, R, 1.87, j, 1.12, .51, 1.01, .13, 'paper', 1);
    for (let k = 0; k < 4; k++) box(H, R, 1.98 + k * .22, j + .05, .16, .39, 1.16, .045, k % 2 ? 'coral' : 'teal', .6);
    line(H, R, [H.p(1.86, j + .52, .7), H.p(2.99, j + .52, .7)], .75);
  }
  for (const j of [8.55, 10.6]) box(H, R, 1.78, j, .12, .12, 1, 1.4, 'coral', .65);
  box(H, R, 1.76, 8.55, .15, 2.15, 2.25, .12, 'sun', .65);
  for (const z of [1.49, 1.99]) for (let k = 0; k < 5; k++) charm(H, R, 1.86, 8.83 + k * .34, z, ['coral', 'teal', 'sun'][k % 3], .72);
  box(H, R, 2.03, 8.08, .85, .33, .04, .58, 'blue', .62);
  for (let k = 0; k < 5; k++) box(H, R, 2.05, 8.1, .81, .28, .64 + k * .045, .038, 'paper', 1);
  box(H, R, 9.94, 4.44, 1.48, 2.14, .02, .81, 'coral', .45);
  box(H, R, 9.87, 4.37, 1.63, 2.29, .85, .12, 'sun', .4);
  for (let k = 0; k < 4; k++) {
    const j = 4.55 + k * .46;
    box(H, R, 10.02, j, 1.12, .35, 1.0, .14, 'paper', 1);
    for (let n = 0; n < 5; n++) {
      const [x, y] = H.p(10.13 + n * .18, j + .19, 1.17);
      line(H, R, [[x, y], [x + 5, y - 8]], 2.2, k % 2 ? 'coral' : 'teal');
      line(H, R, [[x + 1, y - 2], [x + 4, y - 4]], 2, 'paper');
    }
    box(H, R, 10.05, j, 1.0, .33, .1, .32, 'paper', 1);
  }
  for (const j of [4.5, 6.3]) box(H, R, 11.48, j, .13, .13, .02, 2.42, 'coral', .65);
  box(H, R, 11.45, 4.48, .16, 1.99, 2.4, .14, 'coral', .7);
  for (const z of [1.34, 1.95]) {
    line(H, R, [H.p(11.51, 4.58, z), H.p(11.51, 6.35, z)], 1.2, 'sun');
    for (let k = 0; k < 5; k++) charm(H, R, 11.53, 4.71 + k * .33, z - .05, k % 2 ? 'paper' : 'coral', .64);
  }
  for (let k = 0; k < 3; k++) box(H, R, 10.1, 6.86, 1.3, .7, .02 + k * .26, .24, k === 1 ? 'teal' : 'paper', k === 1 ? .5 : 1);
  for (const i of [1.4, 3.62]) {
    box(H, R, i, 1.25, .69, .7, .43, .48, 'paper', .88);
    const [x, y] = H.p(i + .35, 1.6, .95);
    shape(H, R, [[x - 10, y], [x + 10, y], [x + 15, y - 30], [x - 15, y - 30]], 'teal', .6, .8);
    oval(H, R, x, y - 30, 15, 5, 'blue', .65);
    for (let k = 0; k < 5; k++) {
      const dx = (k - 2) * 7, dy = 43 + k % 2 * 13;
      line(H, R, [[x + dx * .4, y - 26], [x + dx, y - dy]], 1.2, 'teal');
      for (let n = 0; n < 5; n++) {
        const a = n * TAU / 5;
        oval(H, R, x + dx + Math.cos(a) * 4, y - dy + Math.sin(a) * 4, 4, 3, k % 2 ? 'paper' : 'coral', .7);
      }
      H.dot(x + dx, y - dy, 2, 'sun', 1);
    }
  }
  for (const i of [2.6, 9.6]) {
    box(H, R, i, 2.68, .5, .5, .02, .41, 'paper', .9);
    box(H, R, i + .17, 2.85, .17, .17, .43, 1.0, 'paper', .8);
    box(H, R, i - .05, 2.63, .6, .6, 1.42, .15, 'blue', .58);
    box(H, R, i + .04, 2.72, .43, .43, 1.59, .49, 'sun', .5);
    for (const dx of [.04, .37]) box(H, R, i + dx, 2.72, .07, .43, 1.59, .49, 'blue', .7);
    box(H, R, i - .15, 2.53, .8, .8, 2.1, .16, 'blue', .65);
    box(H, R, i + .16, 2.84, .19, .19, 2.26, .14, 'paper', .9);
  }
  box(H, R, 3.1, 10.82, 3.36, .8, .02, .45, 'paper', .84);
  for (const i of [3.35, 5.93]) box(H, R, i, 10.94, .36, .51, .01, .25, 'blue', .45);
  for (const [i, ink] of [[3.35, 'teal'], [5.82, 'coral']]) {
    box(H, R, i, 10.98, .48, .32, .49, .47, ink, .68);
    stroke(H, R, [H.p(i + .1, 11.12, .98), H.p(i + .1, 11.12, 1.17), H.p(i + .37, 11.12, 1.17), H.p(i + .37, 11.12, .98)], 'blue', 1);
  }
  const [ux, uy] = H.p(6.55, 11.06, .04);
  shape(H, R, [[ux - 3, uy], [ux + 4, uy], [ux + 2, uy - 49], [ux - 1, uy - 49]], 'coral', .75, .6);
  stroke(H, R, [[ux, uy - 48], [ux, uy - 58], [ux + 7, uy - 58], [ux + 7, uy - 52]], 'blue', 1.2);
  for (const j of [4.05, 5.4, 6.76]) {
    const [x, y] = H.p(2.27, j, .05);
    H.outline(R, ell(x, y, 6, 3), 'coral', .8, {tone: .5, amp: .1});
  }
  box(H, R, 8.2, 10.65, .63, .63, .02, .83, 'teal', .55);
  const [bx, by] = H.p(8.52, 10.98, .89);
  oval(H, R, bx, by, 11, 6, 'blue', .65);
  for (const dx of [-3, 3]) line(H, R, [[bx + dx, by], [bx + dx + 4, by - 42]], 1.3, 'coral');
  shape(H, R, [[bx - 8, by - 31], [bx + 8, by - 30], [bx + 6, by - 14], [bx - 6, by - 15]], 'paper', 1, .6);
}

const room = world('tokyo-asakusa-incense', 'Asakusa · Incense before the crowds', {
  floor: 'paper', tone: 1, wall: false, head: 20,
}, (H, R) => {
  for (let j = 0; j < 12; j += .85) for (let i = (Math.round(j / .85) % 2) * -1.05; i < 12; i += 2.1) {
    const a = Math.max(0, i), w = Math.min(12, i + 2.1) - a;
    H.outline(R, H.tile(a, j, w, Math.min(.85, 12 - j), .01), 'blue', .65, { tone: .4, amp: .16 });
  }
  box(H, R, .55, .1, 10.9, 2.05, 0, .42, 'paper', .85);
  box(H, R, 3.9, 2.05, 5.35, .47, .01, .25, 'paper', .85);
  box(H, R, 4.15, 2.51, 4.85, .45, .01, .12, 'paper', .85);
  shape(H, R, H.faceI(.55, .05, 10.9, .4, 3.3), 'coral', .54, 1);
  for (const i of [1.28, 5.65, 10.05]) {
    box(H, R, i - .12, .5, .66, .66, .42, .19, 'paper', 1);
    box(H, R, i, .58, .42, .44, .6, 2.79, 'coral', .85);
    box(H, R, i - .22, .48, .85, .67, 3.2, .18, 'coral', .75);
    box(H, R, i - .34, .35, 1.06, .86, 3.37, .15, 'paper', .86);
    box(H, R, i - .15, .35, .67, .84, 3.52, .16, 'coral', .8);
    for (const dx of [-.18, .37]) box(H, R, i + dx, .72, .26, .65, 3.04, .16, 'coral', .8);
  }
  for (const i of [2.1, 6.55]) {
    shape(H, R, H.faceI(i, .1, 2.9, .7, 3.03), 'blue', .73, .8);
    for (let x = i + .13; x < i + 2.8; x += .2) line(H, R, [H.p(x, .15, .75), H.p(x, .15, 2.97)], 1.1, 'sun', .45);
  }
  for (let i = .9; i < 11.25; i += .47) {
    box(H, R, i, .18, .13, 1.88, 3.42, .16, 'sun', .5);
    box(H, R, i - .04, 1.81, .21, .25, 3.4, .2, 'coral', .7);
  }
  box(H, R, .7, .4, 10.8, .7, 3.66, .17, 'coral', .8);
  roof(H, R, .55, .12, 10.8, 2.15, 3.65, .88);
  box(H, R, 7.1, 1.05, 2.25, 1, .44, .92, 'coral', .58);
  box(H, R, 6.99, .96, 2.46, 1.15, 1.35, .12, 'sun', .32);
  for (let i = 7.12; i < 9.35; i += .2) line(H, R, [H.p(i, 1, 1.5), H.p(i, 2.02, 1.5)], 2, 'blue');
  for (let k = 0; k < 5; k++) line(H, R, [H.p(7.3 + k * .39, 2.07, .53), H.p(7.3 + k * .39, 2.07, 1.25)], .6);
  box(H, R, .45, 3.25, 1.05, 3.95, .04, 2.15, 'blue', .65);
  for (const j of [3.23, 7.08]) box(H, R, .44, j, 1.1, .14, .02, 2.2, 'coral', .65);
  box(H, R, .39, 3.2, 1.17, 4.06, .02, .16, 'coral', .7);
  box(H, R, .33, 3.15, 1.29, 4.14, 2.2, .14, 'blue', .62);
  for (let row = 0; row < 5; row++) for (let col = 0; col < 6; col++) {
    const j = 3.36 + col * .62, z = .18 + row * .385;
    if (row === 2 && col === 3) {
      box(H, R, 1.35, j, .59, .56, z, .06, 'sun', .5);
      box(H, R, 1.87, j, .09, .56, z, .33, 'coral', .6);
      for (let n = 0; n < 4; n++) box(H, R, 1.42, j + .06, .37, .42, z + .07 + n * .035, .025, 'paper', 1);
    } else shape(H, R, H.faceJ(1.515, j, .56, z, z + .33), 'sun', .23, .55);
    const [x, y] = H.p(1.53, j + .29, z + .17);
    oval(H, R, x, y, 2.2, 1.5, 'blue', .8);
  }
  box(H, R, 1.5, 3.15, .75, 1.3, .04, .93, 'coral', .42);
  const [sx, sy] = H.p(1.86, 3.75, 1.04);
  shape(H, R, [[sx - 8, sy], [sx + 8, sy], [sx + 8, sy - 24], [sx - 8, sy - 24]], 'sun', .58, .7);
  oval(H, R, sx, sy - 24, 8, 3, 'blue', .55);
  for (let k = 0; k < 7; k++) line(H, R, [[sx - 5 + k * 1.6, sy - 23], [sx - 5 + k * 1.6, sy - 32 - k % 3 * 2]], .75, 'paper');
  box(H, R, 1.7, 4.72, .72, .52, .06, .45, 'teal', .45);
  for (let k = 0; k < 6; k++) box(H, R, 1.73, 4.75, .61, .39, .53 + k * .025, .02, 'paper', 1);
  for (const j of [8.15, 10.85]) box(H, R, .68, j, .17, .17, .02, 2.0, 'blue', .55);
  for (const z of [.85, 1.45, 1.93]) {
    line(H, R, [H.p(.76, 8.2, z), H.p(.76, 10.91, z)], 1.3);
    for (let n = 0; n < 7; n++) {
      const [x, y] = H.p(.77, 8.35 + n * .37, z);
      shape(H, R, [[x - 3, y - 4], [x + 4, y - 1], [x + 2, y + 13 + n % 3 * 2], [x - 2, y + 12]], 'paper', 1, .5);
      line(H, R, [[x - 4, y + 1], [x + 4, y + 2]], .7, 'coral', .45);
    }
  }
  for (const [i, j] of [[4.25, 4.65], [8.2, 4.65], [4.25, 8.1], [8.2, 8.1]]) {
    box(H, R, i - .14, j - .14, .48, .48, .03, .19, 'paper', .9);
    box(H, R, i, j, .2, .2, .22, 3.56, 'blue', .65);
    box(H, R, i - .09, j - .09, .38, .38, 3.39, .18, 'teal', .55);
    box(H, R, i - .16, j - .16, .52, .52, 3.58, .14, 'paper', .8);
    for (const side of [-1, 1]) shape(H, R, [H.p(i + .1, j + .1, 3.19), H.p(i + .1 + side * .64, j + .1, 3.67), H.p(i + .1, j + .1, 3.67)], 'teal', .6, .7);
  }
  box(H, R, 4.18, 4.61, 4.28, .27, 3.65, .13, 'teal', .7);
  box(H, R, 4.18, 4.61, .27, 3.69, 3.65, .13, 'teal', .7);
  for (const i of [4.2, 8.25]) {
    line(H, R, [H.p(i, 5.2, .7), H.p(i, 7.55, .7)], 1.8, 'teal');
    for (const j of [5.2, 7.55]) line(H, R, [H.p(i, j, .03), H.p(i, j, .7)], 1.8, 'teal');
  }
  burner(H, R);
  box(H, R, 9.95, 3.5, 1.35, .8, .02, .78, 'paper', .95);
  for (let k = 0; k < 6; k++) {
    const [x, y] = H.p(10.17 + k * .15, 3.8, .82);
    line(H, R, [[x - 1, y], [x + 1, y - 17]], 2.2, 'coral', .7);
    line(H, R, [[x - 3, y - 7], [x + 3, y - 7]], 1.3, 'paper');
  }
  bowl(H, R, 10.8, 4, .82, 8);
  const [rx, ry] = H.p(10.65, 4.8, .04);
  line(H, R, [[rx, ry], [rx - 9, ry - 53]], 1.4);
  for (let k = 0; k < 5; k++) line(H, R, [[rx - 8 + k * 4, ry], [rx - 8 + k * 4, ry + 7]], .8);
  line(H, R, [[rx - 9, ry], [rx + 9, ry]], 1.6);
  box(H, R, 10.55, 10.8, .76, .5, .02, .13, 'blue', .6);
  line(H, R, [H.p(10.9, 11, .15), H.p(10.9, 11, .8)], 1.3);
  for (const [i, j, turn] of [[2.7, 9.9, .3], [9.25, 9.55, -.4], [3.5, 2.8, .2], [11.2, 6.7, .5]]) {
    const [x, y] = H.p(i, j, .04);
    shape(H, R, [[x - 4, y], [x + turn * 4, y - 4], [x + 5, y + 1], [x, y + 3]], 'sun', .55, .5);
  }
  courtyardDetails(H, R);
}, (H, R, t) => {
  const u = cycle(t, 16), waft = Math.sin(u * Math.PI * 2) * .5 + .5;
  H.at(8.8, 6.5, 0, HH => actor(HH, R, 8.8, 6.5, waft * 1.2, 'talk', { shirt: ['teal', .6], hairStyle: 'pony', face: 'nw' }, 0, 1.2));
  H.at(2.8, 7.4, 0, HH => actor(HH, R, 2.8, 7.4, t * .16, 'hold', {
    shirt: ['paper', 1], pants: ['blue', .7], glasses: true,
    prop: (h, r, p) => {
      const [x, y] = p.nearHand;
      shape(h, r, [[x - 3, y - 11], [x + 7, y - 8], [x + 5, y + 12], [x - 4, y + 10]], 'paper', 1, .55);
      line(h, r, [[x - 1, y - 5], [x + 4, y - 3]], .5, 'coral', .45);
    },
  }, 0, 1.15));
  H.at(10.05, 9.15, 0, HH => {
    actor(HH, R, 10.05, 9.15, waft * 1.2, 'water', { shirt: ['blue', .58], apron: ['paper', 1], hairStyle: 'cap' }, 0, 1.15);
    const [x, y] = HH.p(9.85 - waft * .3, 9.65 + waft * .14, .02);
    line(HH, R, [[x, y], [x + 20, y - 54]], 1.7, 'coral');
    for (let k = 0; k < 9; k++) line(HH, R, [[x + 4, y - 10], [x - 10 + k * 3, y + 2]], .85, 'sun');
    const leap = Math.max(0, Math.sin(u * Math.PI * 2));
    const [lx, ly] = HH.p(9.4 - leap * .8, 10.05 + leap * .18, .04 + leap * .12);
    shape(HH, R, [[lx - 4, ly], [lx, ly - 4], [lx + 5, ly], [lx, ly + 3]], 'sun', .65, .5);
  });
  for (let k = 0; k < 5; k++) {
    const p = cycle(t + k * 2.5, 9);
    const [x, y] = H.p(6.25 + (k - 2) * .17, 6.25, 1.43 + p * 1.25);
    H.opacity(Math.sin(p * Math.PI) * .5, () => stroke(H, R, [[x, y], [x + 8 * Math.sin(t * .4 + k), y - 13], [x - 8, y - 23], [x + 3, y - 36]], k % 2 ? 'paper' : 'sun', 2, .65));
  }
  H.at(3.8, 9.18, 0, HH => actor(HH, R, 3.8, 9.18, t * .22, 'hold', {shirt: ['coral', .65], hairStyle: 'bun', face: 'nw', prop: (h, r, p) => {
    const [x, y] = p.nearHand;
    shape(h, r, [[x - 4, y], [x + 5, y], [x + 5, y - 12], [x, y - 15], [x - 4, y - 12]], 'sun', .75, .6);
  }}, 0, 1.18));
  H.at(9.4, 5.25, 0, HH => actor(HH, R, 9.4, 5.25, t * .24, 'hold', {shirt: ['paper', 1], pants: ['blue', .65], hairStyle: 'short', prop: (h, r, p) => {
    const [x, y] = p.nearHand;
    for (let k = 0; k < 3; k++) line(h, r, [[x + k * 2, y], [x + k * 2 + 6, y - 14]], 1.4, 'coral');
  }}, 0, 1.16));
  H.at(4.8, 11.2, .45, HH => actor(HH, R, 4.8, 11.2, t * .15, 'read', {shirt: ['teal', .6], hair: ['blue', .35], glasses: true}, .45, 1.18, 'elder'));
  H.at(7.3, 9.45, 0, HH => actor(HH, R, 7.3, 9.45, t * .17, 'lookup', {shirt: ['sun', .65], hairStyle: 'short'}, 0, 1.06, 'child'));
  H.at(7.9, 9.3, 0, HH => actor(HH, R, 7.9, 9.3, t * .13, 'talk', {shirt: ['paper', 1], hairStyle: 'pony', prop: (h, r, p) => {
    const [x, y] = p.nearHand;
    shape(h, r, [[x - 7, y - 4], [x + 9, y - 5], [x + 10, y + 6], [x - 6, y + 7]], 'blue', .7, .6);
    oval(h, r, x + 2, y + 1, 3, 3, 'paper', 1);
  }}, 0, 1.17));
  const [x, y] = H.p(.8, 9.55, 1.93);
  shape(H, R, [[x - 2, y], [x + 3, y + 1], [x + Math.sin(t * .8) * 3 + 3, y + 22], [x + Math.sin(t * .8) * 3 - 2, y + 20]], 'paper', 1, .5);
});

room.over = (H, R) => {
  roof(H, R, 4.06, 4.45, 4.3, 1.88, 3.78, .37, true);
  for (const i of [4.2, 8.25]) {
    box(H, R, i, 6.25, .23, 2.12, 3.68, .14, 'teal', .65);
    H.line(R, [H.p(i + .11, 8.1, 3.1), H.p(i + .11, 7.46, 3.73)], 'teal', 4);
  }
  box(H, R, 4.19, 8.13, 4.3, .2, 3.68, .14, 'teal', .65);
  line(H, R, [H.p(4.25, 8.1, .22), H.p(4.25, 8.1, 3.8)], 3.5, 'blue', .8);
};

export default room;
