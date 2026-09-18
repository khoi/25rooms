import { world, shape, oval, stroke, box, table, bench, actor, plant, bottle, cycle, TAU } from '../../worlds/common.js';
import { FIGURES, loop, ell } from '../../drawings.js';

const standing = FIGURES.sample('idle', 0);
FIGURES.clips.tokyoShibaLaundry = {
  dur: 20,
  keys: [[0, { ar: 30 }], [.2, { ar: 30 }], [.32, { ar: 154, er: 0, al: 135, el: 8, head: -15 }], [.42, { ar: 144, er: 16, al: 124, el: 25 }], [.54, { ar: 55, er: 54, al: 55, el: 54 }], [.66, { ar: 61, er: 81, al: 59, el: 72 }], [.79, { ar: 25, er: 4, lean: -18, head: 12 }], [.87, {}], [1, { ar: 30 }]].map(([u, pose]) => [u, { ...standing, ...pose }]),
};

function tomato(H, R, i, j, ripe = false) {
  for (const x of [i + .08, i + 1.28]) box(H, R, x, j + .13, .12, .73, .02, .18, 'blue', .6);
  box(H, R, i, j, 1.48, 1.01, .18, .47, 'coral', .38);
  for (const z of [.29, .46]) H.line(R, [H.p(i, j + 1.02, z), H.p(i + 1.48, j + 1.02, z)], 'sun', 1.2);
  for (const x of [i + .12, i + 1.34]) {
    box(H, R, x, j + 1.025, .09, .035, .2, .45, 'teal', .6);
    H.dot(...H.p(x + .04, j + 1.07, .53), 1.2, 'paper');
  }
  box(H, R, i - .04, j - .04, 1.56, .1, .64, .1, 'sun', .55);
  box(H, R, i - .04, j + .95, 1.56, .1, .64, .1, 'sun', .55);
  shape(H, R, H.tile(i + .11, j + .11, 1.26, .79, .67), 'blue', .42);
  for (const off of [.26, 1.08]) {
    const [x, y] = H.p(i + off, j + .53, .69);
    stroke(H, R, [[x, y], [x - 2, y - 47], [x + 2, y - 91]], 'sun', 1.7);
    stroke(H, R, [[x, y], [x + 7, y - 32], [x - 5, y - 66], [x + 4, y - 83]], 'teal', 2);
    for (let k = 0; k < 6; k++) {
      const side = k % 2 ? 1 : -1, yy = y - 18 - k * 11;
      stroke(H, R, [[x + 2, yy + 6], [x + side * 15, yy - 4]], 'teal', 1.2);
      shape(H, R, loop([[x + side * 5, yy], [x + side * 18, yy - 12], [x + side * 19, yy - 3], [x + side * 9, yy + 4]], 1), 'teal', .7, .65);
      if (k === 1 || k === 3) {
        const px = x + side * 13, py = yy + 9;
        oval(H, R, px, py, 4.5, 4, ripe && k === 1 ? 'coral' : 'sun', ripe && k === 1 ? .94 : .48);
        stroke(H, R, [[px - 3, py - 3], [px, py - 5], [px + 3, py - 3]], 'teal', 1);
      }
    }
    for (const dy of [-24, -52, -75]) H.line(R, [[x - 4, y + dy], [x + 4, y + dy]], 'paper', 1.3);
  }
}

function tower(H, R, light = 0) {
  const [x, y] = H.p(8.15, .15, .62);
  const tiers = [[0, 46], [-67, 20], [-127, 13], [-178, 5.5], [-218, 2]];
  if (light) {
    for (const side of [-1, 1]) H.line(R, tiers.slice(1).map(([dy, w]) => [x + side * w, y + dy]), 'sun', 1.6, { tone: .5 + light * .35 });
    H.glow(x, y - 79, 35, 17, 'sun', .06 + light * .12);
    return;
  }
  for (const side of [-1, 1]) stroke(H, R, tiers.map(([dy, w]) => [x + side * w, y + dy]), 'coral', 5);
  for (let k = 0; k < tiers.length - 1; k++) {
    const [y0, w0] = tiers[k], [y1, w1] = tiers[k + 1];
    for (let n = 0; n < 4; n++) {
      const f = n / 4, next = (n + 1) / 4;
      const yy = y + y0 + (y1 - y0) * f, yn = y + y0 + (y1 - y0) * next;
      const w = w0 + (w1 - w0) * f, wn = w0 + (w1 - w0) * next;
      H.line(R, [[x - w, yy], [x + w, yy]], k % 2 ? 'paper' : 'coral', 1.7);
      H.line(R, [[x - w, yy], [x + wn, yn]], 'coral', 1.5);
      H.line(R, [[x + w, yy], [x - wn, yn]], 'coral', 1.5);
    }
  }
  for (const [dy, w, h] of [[-78, 28, 12], [-157, 12, 8]]) {
    shape(H, R, [[x - w, y + dy], [x + w, y + dy], [x + w, y + dy - h], [x - w, y + dy - h]], 'paper', 1, .7);
    for (let k = 0; k < 7; k++) H.line(R, [[x - w + 3 + k * (w * 2 - 6) / 7, y + dy - 3], [x - w + 3 + k * (w * 2 - 6) / 7, y + dy - h + 3]], 'blue', 2.2);
  }
  H.line(R, [[x, y - 218], [x, y - 246]], 'paper', 3);
  H.line(R, [[x, y - 232], [x, y - 246]], 'coral', 2.6);
}

function washing(H, R, i, ink, t, width = 29, length = 40) {
  const [x, y] = H.p(i, 7.77, 2.86);
  const sway = Math.sin(t * .9 + i) * 3;
  shape(H, R, [[x - width / 2, y], [x + width / 2, y - 3], [x + width / 2 + sway, y + length], [x - width / 2 + sway, y + length + 3]], ink, ink === 'paper' ? 1 : .48, .7);
  for (const dy of [length - 7, length - 3]) stroke(H, R, [[x - width / 2 + sway, y + dy + 2], [x + sway, y + dy + 3], [x + width / 2 + sway, y + dy]], ink === 'teal' ? 'paper' : 'teal', 1);
  for (const dx of [-width / 2 + 4, width / 2 - 4]) H.line(R, [[x + dx, y - 4], [x + dx, y + 6]], 'coral', 2.3);
}

function nurseryPot(H, R, i, j, z, ink = 'coral', size = .65) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 9 * size, y - 11 * size], [x + 9 * size, y - 11 * size], [x + 6 * size, y], [x - 6 * size, y]], ink, .54, .7);
  oval(H, R, x, y - 11 * size, 9 * size, 3.3 * size, 'blue', .43);
  for (let k = 0; k < 5; k++) {
    const a = -Math.PI * .87 + k * .56;
    const dx = Math.cos(a) * 19 * size, dy = Math.sin(a) * 21 * size;
    stroke(H, R, [[x, y - 10 * size], [x + dx, y - 10 * size + dy]], 'teal', 1);
    shape(H, R, loop([[x + dx * .44, y - 10 * size + dy * .45], [x + dx - 4, y - 13 * size + dy], [x + dx + 5, y - 10 * size + dy], [x + dx * .5, y - 7 * size + dy * .5]], 1), 'teal', .68, .55);
  }
}

function roofNeighbors(H, R) {
  for (const j of [3.82, 7.17]) {
    H.line(R, [H.p(10.14, j, .14), H.p(11.43, j, 1.08)], 'blue', 2);
    H.line(R, [H.p(11.43, j, .14), H.p(10.14, j, 1.08)], 'blue', 2);
  }
  table(H, R, 10.03, 3.8, 1.53, 3.5, 1.13, 'sun');
  for (const j of [3.85, 7.2]) box(H, R, 10.02, j, 1.56, .09, 1.24, .28, 'coral', .48);
  box(H, R, 11.48, 3.85, .08, 3.45, 1.24, .28, 'coral', .48);
  for (let k = 0; k < 6; k++) H.line(R, [H.p(10.15 + k * .21, 3.91, 1.26), H.p(10.15 + k * .21, 7.13, 1.26)], 'blue', .65);

  box(H, R, 10.11, 3.88, 1.37, 3.34, .35, .11, 'teal', .5);
  for (let k = 0; k < 4; k++) box(H, R, 10.26, 4.03 + k * .68, 1.06, .55, .48, .32, k % 2 ? 'paper' : 'coral', k % 2 ? 1 : .45);
  for (const [i, j, ink, s] of [[10.33, 4.14, 'coral', .7], [11.09, 4.48, 'sun', .65], [10.49, 5.17, 'paper', .8], [11.12, 5.68, 'coral', .6], [10.48, 6.48, 'teal', .73]]) nurseryPot(H, R, i, j, 1.28, ink, s);
  box(H, R, 10.17, 6.9, 1.21, .32, 1.26, .11, 'blue', .55);
  for (let k = 0; k < 5; k++) {
    const [x, y] = H.p(10.3 + k * .2, 7.08, 1.42);
    H.line(R, [[x, y], [x + 2, y - 11]], 'teal', .8);
    oval(H, R, x - 2, y - 7, 3, 1.7, 'teal', .65);
    oval(H, R, x + 4, y - 10, 3, 1.7, 'teal', .65);
  }
  box(H, R, 11.55, 3.69, .13, 3.74, .05, 2.62, 'sun', .4);
  for (let k = 0; k < 9; k++) H.line(R, [H.p(11.69, 3.78 + k * .4, .17), H.p(11.69, 3.78 + k * .4, 2.66)], 'coral', 1);
  for (const z of [.59, 1.19, 1.79, 2.39]) H.line(R, [H.p(11.7, 3.72, z), H.p(11.7, 7.43, z)], 'coral', 1);
  for (let k = 0; k < 12; k++) {
    const j = 3.9 + k * .26, z = 1.5 + Math.sin(k * .5) * .6;
    const [x, y] = H.p(11.73, j, z);
    shape(H, R, loop([[x - 2, y], [x - 13, y - 11], [x - 3, y - 17], [x + 5, y - 6]], 1), 'teal', .66, .6);
    if (k % 3 === 0) oval(H, R, x - 5, y + 4, 3.4, 9, 'teal', .81);
  }
  table(H, R, 7.57, 3.82, 1.72, 1.62, .86, 'teal');
  for (const [i, j] of [[7.9, 4.07], [8.7, 4.88]]) {
    const [x, y] = H.p(i, j, 1.03);
    oval(H, R, x, y, 9, 3.5, 'paper', 1);
    shape(H, R, [[x - 5, y - 10], [x + 5, y - 10], [x + 4, y], [x - 4, y]], 'coral', .52, .6);
    oval(H, R, x, y - 10, 5, 2, 'sun', .38);
  }
  bottle(H, R, ...H.p(8.75, 4.07, 1.02), 'teal', .55);
  const [fx, fy] = H.p(8.15, 4.77, 1.02);
  oval(H, R, fx, fy, 13, 5, 'paper', 1);
  for (let k = 0; k < 4; k++) oval(H, R, fx - 8 + k * 5, fy - 1, 3.8, 3.3, k % 2 ? 'coral' : 'sun', .78);
  bench(H, R, 7.55, 5.78, 1.76, 'coral');
  table(H, R, 6.31, 4.18, .71, .79, .54, 'sun');
  box(H, R, 6.51, 4.91, .6, .32, .06, .75, 'blue', .53);
  shape(H, R, H.faceI(6.61, 5.25, .4, .2, .68), 'paper', 1);
  for (let k = 0; k < 3; k++) H.line(R, [H.p(6.65, 5.26, .3 + k * .11), H.p(6.98, 5.26, .3 + k * .11)], 'blue', .65);
  box(H, R, 5.89, 1.5, 2.38, 1.36, .08, .14, 'blue', .56);
  shape(H, R, [H.p(5.94, 1.58, .37), H.p(8.23, 1.58, .37), H.p(8.23, 2.79, .25), H.p(5.94, 2.79, .25)], 'teal', .79);
  for (let k = 0; k < 6; k++) H.line(R, [H.p(6.01 + k * .43, 1.61, .4), H.p(6.01 + k * .43, 2.73, .28)], 'paper', .6);
  for (const j of [1.97, 2.39]) H.line(R, [H.p(6.01, j, .37), H.p(8.18, j, .37)], 'paper', .6);
  stroke(H, R, [H.p(5.44, 2.45, .89), H.p(5.77, 2.68, .88), H.p(5.77, 3.44, .11), H.p(7.02, 3.44, .11)], 'teal', 3);
  for (const i of [4.4, 5.14]) {
    const [x, y] = H.p(i, 3.13, .12);
    shape(H, R, [[x - 8, y], [x + 8, y], [x + 7, y - 33], [x - 7, y - 33]], 'paper', 1);
    oval(H, R, x, y - 34, 13, 4, 'teal', .48);
    for (let k = 0; k < 3; k++) H.line(R, [[x - 6, y - 24 + k * 4], [x + 6, y - 24 + k * 4]], 'blue', .65);
  }
  table(H, R, .56, 11.01, 2.95, .73, .62, 'sun');
  box(H, R, .69, 11.08, 1.21, .51, .76, .08, 'paper');
  for (let k = 0; k < 3; k++) {
    oval(H, R, ...H.p(1.03 + k * .28, 11.33, .87), 5, 3, k === 0 ? 'coral' : 'teal', .7);
    H.line(R, [H.p(1.03 + k * .28, 11.33, .9), H.p(.99 + k * .28, 11.32, 1.03)], 'teal', .8);
  }
  const [qx, qy] = H.p(2.63, 11.37, .77);
  oval(H, R, qx, qy - 7, 10, 8, 'sun', .58);
  for (const dy of [-11, -7, -3]) H.line(R, [[qx - 9, qy + dy], [qx + 9, qy + dy]], 'coral', .75);
  stroke(H, R, [[qx + 7, qy - 3], [qx + 17, qy + 5], [qx + 29, qy + 3]], 'coral', 1);
  box(H, R, 2.18, 11.13, .51, .42, .03, .42, 'teal', .4);
  const [bx, by] = H.p(4.88, 10.75, .1);
  for (const dx of [-29, 29]) {
    H.outline(R, ell(bx + dx, by, 20, 20), 'blue', 2);
    for (let k = 0; k < 8; k++) H.line(R, [[bx + dx, by], [bx + dx + Math.cos(k * TAU / 8) * 18, by + Math.sin(k * TAU / 8) * 18]], 'blue', .6);
  }
  stroke(H, R, [[bx - 29, by], [bx - 10, by - 31], [bx + 9, by], [bx - 29, by], [bx + 17, by - 29], [bx + 29, by]], 'coral', 2.4);
  H.line(R, [[bx + 17, by - 29], [bx + 12, by - 44], [bx + 24, by - 46]], 'blue', 1.5);
  H.line(R, [[bx - 10, by - 31], [bx - 13, by - 41]], 'blue', 1.5);
  H.line(R, [[bx - 21, by - 41], [bx - 7, by - 41]], 'blue', 3);
  box(H, R, 4.01, 10.2, .65, .48, .63, .29, 'sun', .44);
  for (let k = 0; k < 3; k++) nurseryPot(H, R, 6.03 + k * .7, 11.4, .07, ['coral', 'paper', 'sun'][k], .83);
  box(H, R, 3.42, 6.17, .7, .8, .07, .46, 'teal', .44);
  const [wx, wy] = H.p(3.77, 6.57, .58);
  oval(H, R, wx, wy, 9, 4, 'paper', 1);
  stroke(H, R, [[wx - 8, wy], [wx - 8, wy - 14], [wx + 8, wy - 14], [wx + 8, wy]], 'blue', 1);
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(10.1 + k * .38, 8.24, .05);
    shape(H, R, [[x - 7, y], [x + 7, y], [x + 9, y - 17], [x - 8, y - 17]], k % 2 ? 'paper' : 'coral', k % 2 ? 1 : .45);
    H.line(R, [[x - 5, y - 8], [x + 5, y - 8]], 'teal', 1.2);
  }
}

export default world('tokyo-shiba-rooftop', 'Shiba · The tower beyond the tomatoes', { wall: false, floor: 'paper', tone: 1, head: 20 }, (H, R) => {
  for (let k = 0; k < 6; k++) {
    const i = .35 + k * 1.92, h = .8 + (k % 3) * .28;
    box(H, R, i, .05, 1.6, .35, .08, h, 'teal', .34);
    for (let n = 0; n < 3; n++) shape(H, R, H.faceI(i + .2 + n * .43, .41, .16, .24, .55), 'sun', .75, .4);
  }
  tower(H, R);
  box(H, R, .12, .57, 11.76, .28, .02, .79, 'teal', .43);
  box(H, R, .12, .57, .26, 11.14, .02, .79, 'teal', .35);
  box(H, R, .08, .52, 11.86, .41, .81, .1, 'paper', 1);
  box(H, R, .07, .61, .41, 11.17, .81, .1, 'paper', 1);
  for (const i of [4, 8]) H.line(R, [H.p(i, .95, .025), H.p(i, 11.8, .025)], 'blue', .65, { tone: .33 });
  for (const j of [4.1, 8]) H.line(R, [H.p(.5, j, .025), H.p(11.8, j, .025)], 'blue', .65, { tone: .33 });
  box(H, R, .75, 1.15, 2.45, 2.42, .03, 2.95, 'paper', 1);
  box(H, R, .61, 1.01, 2.73, 2.69, 2.98, .15, 'teal', .6);
  shape(H, R, H.faceI(1.08, 3.59, 1.74, 1.35, 2.54), 'blue', .59);
  shape(H, R, H.faceI(1.25, 3.62, 1.4, 1.39, 2.27), 'teal', .39);
  shape(H, R, H.faceJ(3.24, 2.35, 1.03, .13, 2.54), 'blue', .65);
  H.outline(R, H.faceJ(3.27, 2.41, .91, .19, 2.46), 'paper', 1.2);
  H.line(R, [H.p(3.3, 3.14, 1.01), H.p(3.3, 3.14, 1.27)], 'sun', 2);
  box(H, R, 3.24, 2.38, .42, 1.04, .02, .15, 'teal', .4);
  for (const j of [1.38]) {
    shape(H, R, H.faceJ(3.22, j, .61, 1.16, 2.54), 'blue', .66);
    H.outline(R, H.faceJ(3.25, j + .05, .51, 1.24, 2.46), 'paper', 1.6);
    H.line(R, [H.p(3.27, j + .3, 1.24), H.p(3.27, j + .3, 2.46)], 'teal', 1.4);
  }
  for (const z of [.32, .7, 1.08, 1.46, 1.84, 2.22, 2.6]) H.line(R, [H.p(.77, 3.59, z), H.p(1.04, 3.59, z)], 'blue', .7);
  stroke(H, R, [H.p(.63, 1.1, 3.08), H.p(.63, 3.73, 3.08), H.p(.63, 3.73, .18), H.p(.91, 4.35, .05)], 'teal', 3);
  box(H, R, 3.72, 1.3, 1.75, 1.34, .12, 1.46, 'paper', 1);
  shape(H, R, H.faceI(3.88, 2.66, 1.41, .42, 1.32), 'teal', .35);
  for (const z of [.46, 1.29]) H.line(R, [H.p(3.84, 2.68, z), H.p(5.32, 2.68, z)], 'blue', 1.6);
  for (const i of [3.9, 5.26]) H.dot(...H.p(i, 2.7, 1.16), 1.5, 'sun');
  oval(H, R, ...H.p(4.63, 2.7, .95), 8, 9, 'paper');
  H.line(R, [H.p(4.63, 2.72, .95), H.p(4.78, 2.72, 1.06)], 'coral', 1.3);

  box(H, R, 3.65, 1.23, 1.89, 1.48, 1.58, .13, 'teal', .49);
  for (const i of [4.03, 5.03]) stroke(H, R, [H.p(i, 1.38, .2), H.p(i, 1.38, 1.84), H.p(i + .38, 1.38, 1.84)], 'blue', 2.6);
  box(H, R, 10.03, 1.32, 1.59, .93, .1, 1.05, 'paper', 1);
  for (let k = 0; k < 6; k++) H.line(R, [H.p(10.18, 2.27, .24 + k * .13), H.p(11.45, 2.27, .24 + k * .13)], 'blue', .8, { tone: .6 });
  stroke(H, R, [H.p(11.6, 1.71, .45), H.p(11.78, 1.9, .25), H.p(11.78, 3.1, .07)], 'teal', 2);
  const [ax, ay] = H.p(2.62, 1.54, 3.1);
  stroke(H, R, [[ax, ay], [ax, ay - 53]], 'blue', 1.5);
  H.line(R, [[ax - 31, ay - 39], [ax + 31, ay - 49]], 'blue', 1.4);
  for (let k = 0; k < 6; k++) H.line(R, [[ax - 24 + k * 9, ay - 48 - k * 1.5], [ax - 24 + k * 9, ay - 31 - k * 1.5]], 'blue', .9);
  table(H, R, .55, 4.04, 2.53, .67, 1.28, 'teal');
  box(H, R, .59, 4.07, 2.44, .61, 1.4, .1, 'paper');
  shape(H, R, H.tile(.81, 4.14, 1.06, .43, 1.52), 'blue', .76);
  shape(H, R, H.tile(.92, 4.19, .84, .31, 1.53), 'teal', .44);
  stroke(H, R, [H.p(1.2, 4.09, 1.52), H.p(1.2, 4.09, 2.03), H.p(1.2, 4.42, 2.03), H.p(1.2, 4.42, 1.85)], 'blue', 2);
  stroke(H, R, [H.p(1.3, 4.37, 1.26), H.p(1.3, 4.37, .43), H.p(.71, 4.37, .43), H.p(.71, 4.37, .09)], 'teal', 2.4);
  for (let k = 0; k < 5; k++) H.line(R, [H.p(2.06 + k * .18, 4.17, 1.52), H.p(2.06 + k * .18, 4.61, 1.52)], 'blue', .9);
  bottle(H, R, ...H.p(2.73, 4.35, 1.53), 'coral', .35);
  tomato(H, R, 1.06, 5.02);
  tomato(H, R, 1.06, 7.08, true);
  for (const [i, j, size] of [[1.45, 9.5, .87], [2.57, 9.73, .73], [1.24, 10.8, .66]]) {
    oval(H, R, ...H.p(i, j, .02), 12 * size, 5 * size, 'blue', .33);
    plant(H, R, ...H.p(i, j, .09), size);
  }
  const [rx, ry] = H.p(3.3, 5.35, .31);
  oval(H, R, rx, ry, 16, 17, 'teal', .6);
  for (let k = 0; k < 5; k++) H.outline(R, ell(rx, ry, 13 - k * 2.1, 14 - k * 2.1), 'sun', 1.2);
  stroke(H, R, [[rx + 12, ry + 7], [rx + 24, ry + 22], [rx + 43, ry + 29], [rx + 51, ry + 19]], 'teal', 1.8);
  box(H, R, 3.16, 8.99, 1.03, .69, .04, .22, 'sun', .5);
  box(H, R, 3.2, 9.08, 1.02, .67, .27, .18, 'paper', 1);
  for (const [i, j] of [[4.41, 10.85], [11.18, 3.38]]) {
    shape(H, R, H.tile(i, j, .58, .58, .03), 'blue', .6);
    for (let k = 0; k < 5; k++) H.line(R, [H.p(i + .05 + k * .1, j + .04, .05), H.p(i + .05 + k * .1, j + .54, .05)], 'paper', .7);
  }
  const [sx, sy] = H.p(3.58, 9.4, .47);
  for (const dx of [-4, 4]) oval(H, R, sx + dx, sy, 3, 2, 'coral', .7);
  stroke(H, R, [[sx - 3, sy], [sx + 7, sy - 9]], 'blue', 1.1);
  stroke(H, R, [[sx + 3, sy], [sx - 7, sy - 9]], 'blue', 1.1);
  const [cx, cy] = H.p(10.17, 9.7, .03);
  for (const dx of [-14, 14]) {
    stroke(H, R, [[cx + dx, cy], [cx - dx, cy - 27], [cx - dx, cy - 52]], 'blue', 2);
    stroke(H, R, [[cx - dx, cy], [cx + dx, cy - 28]], 'blue', 2);
  }
  shape(H, R, [[cx - 15, cy - 51], [cx + 15, cy - 51], [cx + 14, cy - 31], [cx - 14, cy - 31]], 'coral', .42);
  shape(H, R, [[cx - 15, cy - 28], [cx + 15, cy - 28], [cx + 21, cy - 18], [cx - 9, cy - 18]], 'coral', .42);
  for (const i of [5.22, 10.3]) box(H, R, i, 7.73, .12, .12, .04, 3.03, 'blue', .6);
  stroke(H, R, [H.p(5.28, 7.79, 2.91), H.p(7.85, 7.79, 2.79), H.p(10.36, 7.79, 2.91)], 'blue', 1);
  box(H, R, 7.87, 10.35, 1.43, 1.07, .06, .45, 'paper', 1);
  for (let k = 0; k < 7; k++) H.line(R, [H.p(7.99 + k * .18, 11.44, .12), H.p(7.99 + k * .18, 11.44, .46)], 'teal', .9);
  for (const z of [.21, .35]) H.line(R, [H.p(7.93, 11.44, z), H.p(9.24, 11.44, z)], 'teal', .8);
  box(H, R, 8.03, 10.57, .88, .54, .47, .16, 'coral', .34);
  roofNeighbors(H, R);
}, (H, R, t) => {
  const u = cycle(t, 20);
  actor(H, R, 9.44, 6.21, t, 'hold', { shirt: ['coral', .57], pants: ['blue', .55], apron: ['sun', .43], face: 'ne', prop: (HH, RR, pts) => {
    const [x, y] = pts.nearHand;
    shape(HH, RR, [[x - 7, y], [x + 7, y], [x + 5, y + 10], [x - 5, y + 10]], 'coral', .6, .6);
    stroke(HH, RR, [[x, y], [x + Math.sin(t) * 3, y - 15]], 'teal', 1.2);
    oval(HH, RR, x - 4, y - 9, 5, 2.3, 'teal', .72);
    oval(HH, RR, x + 5, y - 14, 5, 2.3, 'teal', .72);
  } }, 0, 1.14);
  actor(H, R, 8.3, 6.18, t, 'read', { shirt: ['sun', .52], face: 'nw', glasses: true }, .54, 1.13, 'elder');
  actor(H, R, 6.66, 4.6, t, 'drink', { shirt: ['paper', 1], pants: ['teal', .53], face: 'se', prop: (HH, RR, pts) => {
    const [x, y] = pts.nearHand;
    shape(HH, RR, [[x - 4, y - 6], [x + 4, y - 6], [x + 3, y + 3], [x - 3, y + 3]], 'coral', .55, .6);
  } }, .53, 1.12);
  const [px, py] = H.p(11.3, 6.92, 2.37);
  const wind = t * 2.6;
  for (let k = 0; k < 4; k++) shape(H, R, [[px, py], [px + Math.cos(wind + k * TAU / 4) * 12, py + Math.sin(wind + k * TAU / 4) * 12], [px + Math.cos(wind + k * TAU / 4 + .75) * 10, py + Math.sin(wind + k * TAU / 4 + .75) * 10]], k % 2 ? 'coral' : 'sun', .62, .5);
  H.line(R, [[px, py], [px, py + 24]], 'blue', 1);
  tower(H, R, .4 + Math.sin(t * .15) * .2);
  box(H, R, 7.11, .57, 3.08, .28, .02, .79, 'teal', .43);
  box(H, R, 7.08, .52, 3.14, .41, .81, .1, 'paper', 1);
  washing(H, R, 9.65, 'teal', t, 24, 36);
  const [sx, sy] = H.p(8.48, 7.77, 2.85);
  const sway = Math.sin(t * .9) * 2;
  shape(H, R, [[sx - 8, sy], [sx - 18, sy + 8], [sx - 14, sy + 18], [sx - 7, sy + 15], [sx - 8 + sway, sy + 37], [sx + 10 + sway, sy + 37], [sx + 9, sy + 15], [sx + 16, sy + 18], [sx + 20, sy + 8], [sx + 8, sy], [sx + 2, sy + 4]], 'coral', .37, .7);
  for (const dx of [-7, 7]) H.line(R, [[sx + dx, sy - 4], [sx + dx, sy + 5]], 'sun', 2.3);
  if (u < .38 || u > .93) washing(H, R, 6.71, 'paper', t);
  actor(H, R, 6.72, 8.9, t, 'tokyoShibaLaundry', {
    shirt: ['teal', .63], pants: ['blue', .63], face: 'nw', hairStyle: 'bun',
    prop: (HH, RR, pts) => {
      if (u < .38 || u > .79) return;
      const [x, y] = pts.nearHand;
      const folded = u > .6, w = folded ? 18 : 29, h = folded ? 15 : 33;
      shape(HH, RR, [[x - w / 2, y - 3], [x + w / 2, y], [x + w / 2, y + h], [x - w / 2, y + h - 3]], 'paper', 1, .7);
      H.line(R, [[x - w / 2, y + h - 7], [x + w / 2, y + h - 4]], 'teal', 1.1);
    },
  }, 0, 1.19);
  if (u > .79 && u < .94) box(H, R, 8.14, 10.62, .82, .48, .64, .12, 'paper', 1);
  actor(H, R, 3.18, 7.61, t, 'water', {
    shirt: ['sun', .54], pants: ['blue', .66], face: 'sw',
    prop: (HH, RR, pts) => {
      const [x, y] = pts.nearHand;
      shape(HH, RR, [[x - 10, y - 4], [x + 9, y - 4], [x + 9, y + 13], [x - 9, y + 13]], 'teal', .7, .7);
      stroke(HH, RR, [[x + 8, y], [x + 15, y - 3], [x + 14, y + 8], [x + 9, y + 9]], 'blue', 1.4);
      stroke(HH, RR, [[x - 8, y + 4], [x - 22, y - 3], [x - 27, y - 2]], 'teal', 3);
      if (u > .07 && u < .76) for (let k = 0; k < 4; k++) stroke(HH, RR, [[x - 28, y - 2], [x - 33 - k * 2, y + 11], [x - 33 - k * 3, y + 23]], 'blue', .65, .55);
    },
  }, 0, 1.15);
  if (u > .07 && u < .76) H.tint(H.tile(1.46, 7.33, .65, .47, .68), 'blue', .26);
});
