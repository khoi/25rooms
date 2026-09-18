import { world, shape, oval, stroke, box, bench, actor, cycle, TAU } from '../../worlds/common.js';
import { FIGURES, blob, loop, ell } from '../../drawings.js';

const rest = FIGURES.sample('idle', 0);
FIGURES.clips.tokyoMeijiBow = {
  dur: 20,
  keys: [[0, {}], [.2, {}], [.27, { lean: -28, head: 18, al: 8, ar: 8 }], [.36, { lean: -28, head: 18, al: 8, ar: 8 }], [.43, {}], [1, {}]].map(([u, pose]) => [u, { ...rest, ...pose }]),
};
FIGURES.clips.tokyoMeijiSweep = {
  dur: 20,
  keys: [[0, { ar: 46 }], [.56, { ar: 46 }], [.61, { ar: 64, lean: -9 }], [.67, { ar: 42, lean: -5 }], [.73, { ar: 64, lean: -9 }], [.79, { ar: 46 }], [1, { ar: 46 }]].map(([u, pose]) => [u, { ...rest, al: 38, el: 28, er: 10, ...pose }]),
};

function oldTree(H, R, i, j, height, spread) {
  const [x, y] = H.p(i, j);
  const h = height * 32;
  H.tint(ell(x + 18, y + 8, 58, 20), 'blue', .18);
  for (const side of [-1, 1]) shape(H, R, loop([[x + side * 7, y - 18], [x + side * 49, y + 8], [x + side * 22, y + 10], [x, y - 2]], 1), 'teal', .6);
  const trunk = loop([[x - 15, y + 2], [x - 12, y - h * .42], [x - 22, y - h], [x + 4, y - h - 4], [x + 10, y - h * .38], [x + 17, y]], 1);
  shape(H, R, trunk, 'coral', .35);
  H.tint(trunk, 'blue', .42);
  for (let k = 0; k < 7; k++) stroke(H, R, [[x - 11 + k * 4, y - 6], [x - 7 + k * 2, y - h * .43], [x - 15 + k * 3, y - h + 6]], 'blue', .7, .6);
  const crown = [[-44,-8,.59],[-20,-32,.64],[14,-41,.67],[47,-24,.64],[68,1,.43],[-51,17,.47],[-15,8,.72],[25,-1,.58],[45,25,.57],[-6,30,.47]].map(([dx, dy, size], n) => [dx * (i > 6 ? -1 : 1), dy + (i > 6 ? Math.sin(n * 1.7) * 9 : 0), size]);
  for (let n = 0; n < crown.length; n++) {
    const [dx, dy, scale] = crown[n];
    shape(H, R, blob(R, x + dx, y - h + dy, spread * scale, spread * scale * .58, n * .6), n % 3 ? 'teal' : 'blue', n % 3 ? .75 : .55, .75);
  }
  const branches = [[-39, -17], [-13, -40], [27, -38], [63, -8], [44, 21], [-45, 23]].map(([dx, dy]) => [dx * (i > 6 ? -1 : 1), dy]);
  for (let n = 0; n < branches.length; n++) {
    const [dx, dy] = branches[n];
    const ax = x - 3, ay = y - h * .57, bx = x + dx * .48, by = y - h * .89, cx = x + dx, cy = y - h + dy;
    shape(H, R, [[ax - 6, ay], [bx - 4, by], [cx - 1, cy], [cx + 2, cy], [bx + 4, by + 1], [ax + 7, ay]], 'blue', .77, .65);
    stroke(H, R, [[ax + 1, ay], [bx + 1, by + 2], [cx, cy]], 'sun', 1.4, .4);
    for (const side of [-1, 1]) {
      const ex = cx + side * 17, ey = cy - 12;
      stroke(H, R, [[bx, by], [cx, cy], [ex, ey]], 'blue', 1.4, .8);
      for (let k = 0; k < 3; k++) {
        const lx = cx + side * (k * 6 + 3), ly = cy - k * 4;
        shape(H, R, loop([[lx, ly], [lx + side * 5, ly - 11], [lx + side * 11, ly - 12], [lx + side * 9, ly - 4]], 1), 'teal', .64, .5);
        H.line(R, [[lx, ly], [lx + side * 9, ly - 10]], 'sun', .6, { tone: .6 });
      }
    }
  }
  for (let n = 0; n < crown.length; n++) {
    const [dx, dy, scale] = crown[n];
    for (let k = 0; k < 3; k++) {
      const a = n * .82 + k * 2.18;
      const px = x + dx + Math.cos(a) * spread * scale * .57, py = y - h + dy + Math.sin(a) * spread * scale * .3;
      const fan = [[px - 13, py + 4], [px - 11, py - 6], [px - 5, py - 3], [px - 2, py - 12], [px + 5, py - 7], [px + 13, py - 8], [px + 9, py + 1], [px + 15, py + 5], [px + 3, py + 9], [px - 5, py + 6]];
      shape(H, R, fan.map(([fx, fy]) => [px + (fx - px) * Math.cos(a * .31) - (fy - py) * Math.sin(a * .31), py + (fx - px) * Math.sin(a * .31) + (fy - py) * Math.cos(a * .31)]), 'teal', n % 3 ? .52 : .32, .55);
      stroke(H, R, [[px - 9, py + 2], [px, py], [px + 8, py - 4]], 'blue', .7, .55);
      for (const side of [-1, 1]) H.line(R, [[px, py], [px + side * 4, py - 6]], 'paper', .7, { tone: .65 });
    }
  }
  for (const [dx, dy] of [[-42,12],[37,17],[21,29]]) {
    shape(H, R, loop([[x - 4, y - 13], [x + dx * .45, y + dy * .32], [x + dx, y + dy], [x + dx * .73, y + dy + 3], [x + 4, y + 2]], 1), 'blue', .57, .6);
    stroke(H, R, [[x, y - 8], [x + dx * .5, y + dy * .45], [x + dx * .9, y + dy]], 'coral', 1.6, .48);
  }
  for (let n = 0; n < 6; n++) oval(H, R, x - 22 + n * 8, y + 2 + Math.sin(n) * 4, 9, 3, 'teal', .67);
}

function tablet(H, R, i, z, sway = 0) {
  const [x, y] = H.p(i, 7.5, z);
  stroke(H, R, [[x, y - 12], [x + sway, y - 4]], 'coral', .75);
  shape(H, R, [[x + sway - 7, y - 1], [x + sway, y - 6], [x + sway + 7, y - 1], [x + sway + 7, y + 10], [x + sway - 7, y + 10]], 'sun', .37);
  H.dot(x + sway, y - 2, .9, 'blue', .6);
}

function fern(H, R, i, j, size = 1) {
  const [x, y] = H.p(i, j, .06);
  for (let k = 0; k < 5; k++) {
    const dx = (k - 2) * 10 * size, dy = (22 - Math.abs(k - 2) * 4) * size;
    stroke(H, R, [[x, y], [x + dx * .48, y - dy * .73], [x + dx, y - dy]], 'teal', 1.2);
    for (let n = 1; n < 5; n++) for (const side of [-1, 1]) {
      const f = n / 5, px = x + dx * f, py = y - dy * f;
      shape(H, R, [[px, py + 3], [px + side * 7 * size * (1 - f * .6), py - 3 * size], [px + side * 4 * size, py + 2 * size]], 'teal', .7, .45);
    }
  }
}

function forestGarden(H, R) {
  for (const [i, j, w, d] of [[.25, .35, 2.7, 3.8], [9.15, .3, 2.5, 3.5], [.25, 4.5, 1.65, 2.3], [10.4, 5.1, 1.3, 2.2], [.5, 11.05, 3.2, .6]]) {
    const bed = H.tile(i, j, w, d, .025);
    H.tint(bed, 'teal', .34);
    for (let k = 0; k < 11; k++) {
      const [x, y] = H.p(i + .15 + R() * (w - .3), j + .1 + R() * (d - .2), .06);
      const rock = blob(R, x, y - 3, 8 + R() * 11, 4 + R() * 5, .2);
      shape(H, R, rock, k % 3 ? 'teal' : 'blue', k % 3 ? .55 : .28, .6);
      stroke(H, R, [[x - 7, y - 3], [x - 1, y - 6], [x + 4, y - 4]], 'paper', .65, .45);
    }
  }
  for (const [i, j, size] of [[.7, 3.9, 1.25], [2.4, 2.8, 1], [9.5, 2.9, 1.2], [11.2, 3.6, 1.3], [.7, 5.4, 1.3], [1.7, 4.4, .9], [11.2, 6.2, 1.1], [1, 11.35, .8], [2.7, 11.5, .85]]) fern(H, R, i, j, size);
  for (const [i, j] of [[1.2, 2.8], [10.2, 2.7]]) {
    const [x, y] = H.p(i, j);
    for (let k = 0; k < 5; k++) stroke(H, R, [[x - 7, y - 11], [x - 24 + k * 12, y + 4], [x - 34 + k * 17, y + 16]], 'blue', 3.8, .57);
  }
  for (let k = 0; k < 5; k++) box(H, R, 4.98 + (k % 2) * .08, 6.3 + k * .73, 1.13, .58, .015, .045, 'blue', .19);
  box(H, R, 7.68, 6.07, 2.65, 1.72, .03, .2, 'blue', .32);
  box(H, R, 7.91, 6.28, 2.17, 1.23, .23, .73, 'paper', 1);
  shape(H, R, H.tile(8.09, 6.44, 1.81, .86, .98), 'teal', .58);
  for (const i of [8.27, 8.71, 9.15, 9.59]) {
    H.line(R, [H.p(i, 6.33, 1.03), H.p(i, 7.45, 1.03)], 'sun', 2);
    const [x, y] = H.p(i, 7.12, 1.05);
    oval(H, R, x, y - 2, 5.5, 3.6, 'sun', .6);
    H.line(R, [[x - 1, y + 1], [x + 10, y + 9]], 'sun', 2);
  }
  for (const [i, j] of [[7.62, 6.01], [10.23, 6.01]]) box(H, R, i, j, .16, .2, .2, 2.7, 'sun', .48);
  const roof = [H.p(7.36, 5.78, 2.82), H.p(8.9, 6.3, 3.25), H.p(10.7, 5.78, 2.82), H.p(10.7, 7.69, 2.82), H.p(7.36, 7.69, 2.82)];
  shape(H, R, roof, 'teal', .7);
  for (let k = 0; k < 10; k++) H.line(R, [H.p(7.5 + k * .33, 5.84, 2.86), H.p(7.5 + k * .33, 7.64, 2.86)], 'blue', .6, { tone: .6 });
  box(H, R, 7.58, 7.57, 2.95, .14, 2.59, .19, 'sun', .5);
  box(H, R, 10.56, 9.83, 1.01, .88, .02, .44, 'sun', .45);
  for (let k = 0; k < 7; k++) H.line(R, [H.p(10.64 + k * .13, 10.73, .09), H.p(10.64 + k * .13, 10.73, .43)], 'coral', .75);
  for (let k = 0; k < 7; k++) {
    const [x, y] = H.p(10.67 + R() * .74, 9.95 + R() * .63, .52);
    shape(H, R, [[x - 5, y], [x + 2, y - 4], [x + 6, y], [x, y + 3]], k % 2 ? 'sun' : 'coral', .54, .5);
  }
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(11.1 + k * .15, 9.37, .06);
    H.line(R, [[x, y], [x - 7, y - 60 - k * 6]], 'sun', 1.8);
    H.line(R, [[x - 7, y - 60 - k * 6], [x + 5, y - 60 - k * 6]], 'blue', 1.3);
  }
  const [bx, by] = H.p(9.78, 11.17);
  shape(H, R, [[bx - 12, by - 18], [bx + 12, by - 18], [bx + 9, by], [bx - 9, by]], 'teal', .55);
  oval(H, R, bx, by - 18, 12, 4.5, 'paper', 1);
  stroke(H, R, [[bx - 11, by - 12], [bx - 8, by - 31], [bx + 8, by - 31], [bx + 11, by - 12]], 'blue', 1);
  bench(H, R, 4.35, 10.87, 2.9, 'sun');
  box(H, R, 6.35, 11.02, .59, .46, .7, .24, 'coral', .47);
  stroke(H, R, [H.p(6.45, 11.15, .95), H.p(6.65, 11.16, 1.19), H.p(6.87, 11.15, .95)], 'blue', 1);
}

export default world('tokyo-meiji-clearing', 'Meiji Jingu · A clearing inside the city', { wall: false, floor: 'paper', tone: 1, head: 20 }, (H, R) => {
  const soil = [H.p(.2, .2), H.p(11.8, .2), H.p(10.1, 3.2), H.p(7.1, 2.6), H.p(4.2, 3.9), H.p(.2, 5.4)];
  shape(H, R, soil, 'teal', .34);
  forestGarden(H, R);
  H.speckle(R, H.tile(.2, .2, 11.6, 11.6, .015), 'blue', 620, .35, .85, .27);
  shape(H, R, [H.p(3.5, .2, 2.55), H.p(7.7, .2, 2.55), H.p(8.25, .45, 2.4), H.p(3.05, .45, 2.4)], 'teal', .65);
  for (let k = 0; k < 11; k++) H.line(R, [H.p(3.3 + k * .44, .42, 2.42), H.p(3.65 + k * .37, .18, 2.58)], 'blue', .7, { tone: .45 });
  for (const i of [3.4, 8.5]) {
    box(H, R, i, 1.75, .5, .5, 0, .24, 'blue', .42);
    box(H, R, i + .08, 1.83, .34, .34, .22, 3.55, 'sun', .32);
    for (let k = 0; k < 3; k++) H.line(R, [H.p(i + .13 + k * .07, 2.18, .38), H.p(i + .13 + k * .07, 2.18, 3.61)], 'coral', .55, { tone: .65 });
  }
  shape(H, R, [H.p(2.7, 1.72, 3.83), H.p(9.6, 1.72, 3.83), H.p(9.77, 1.72, 4.16), H.p(2.53, 1.72, 4.16)], 'sun', .42);
  shape(H, R, [H.p(2.53, 1.72, 4.16), H.p(9.77, 1.72, 4.16), H.p(9.77, 2.28, 4.16), H.p(2.53, 2.28, 4.16)], 'paper', .75);
  shape(H, R, H.faceI(2.7, 2.28, 6.9, 3.83, 4.12), 'sun', .4);
  for (const i of [3.48, 8.58]) {
    box(H, R, i - .17, 1.71, .67, .59, 3.63, .17, 'sun', .5);
    shape(H, R, H.faceI(i, 2.2, .28, 2.76, 3.07), 'coral', .35);
    for (const z of [2.85, 3.3, 3.73]) H.dot(...H.p(i + .13, 2.22, z), 2.1, 'blue', .65);
  }
  for (let n = 0; n < 4; n++) stroke(H, R, [H.p(2.88, 2.3, 3.88 + n * .055), H.p(5.8, 2.3, 3.9 + n * .045), H.p(9.37, 2.3, 3.88 + n * .055)], 'coral', .55, .45);
  box(H, R, 3.15, 1.86, 5.85, .31, 3.21, .19, 'sun', .42);
  box(H, R, 5.95, 1.88, .29, .28, 3.4, .45, 'sun', .34);
  for (const i of [3.28, 8.81]) H.line(R, [H.p(i, 2.21, 3.25), H.p(i, 2.21, 3.4)], 'blue', 1.3);
  for (const [i, j] of [[.85, 4.1], [2.5, 3.6], [9.7, 3], [11.1, 3.7]]) box(H, R, i, j, .13, .13, 0, .68, 'coral', .48);
  stroke(H, R, [H.p(.92, 4.17, .54), H.p(1.6, 3.92, .4), H.p(2.57, 3.67, .54)], 'sun', 2);
  stroke(H, R, [H.p(9.77, 3.07, .54), H.p(10.4, 3.43, .38), H.p(11.17, 3.77, .54)], 'sun', 2);
  oldTree(H, R, 1.4, 1.75, 4.35, 56);
  oldTree(H, R, 10.4, 1.5, 4.55, 55);
  box(H, R, 9.7, 4.1, .98, .98, 0, .17, 'blue', .35);
  box(H, R, 10.01, 4.41, .36, .36, .17, .91, 'paper', 1);
  box(H, R, 9.83, 4.23, .72, .72, 1.08, .58, 'paper', 1);
  shape(H, R, H.faceI(9.99, 4.96, .4, 1.19, 1.51), 'blue', .65);
  shape(H, R, [H.p(9.57, 3.97, 1.64), H.p(10.19, 4.59, 2.05), H.p(10.81, 5.21, 1.64), H.p(9.57, 5.21, 1.64)], 'blue', .32);
  for (const i of [.75, 3.7]) box(H, R, i, 7.35, .14, .24, 0, 2.3, 'sun', .47);
  for (const z of [1.3, 2.06]) box(H, R, .6, 7.37, 3.35, .15, z, .12, 'sun', .46);
  for (const i of [.71, 3.66]) {
    box(H, R, i - .16, 7.17, .5, .65, .01, .18, 'blue', .4);
    H.line(R, [H.p(i + .08, 7.46, .35), H.p(i + .64 * (i < 2 ? 1 : -1), 7.46, 1.22)], 'sun', 3);
    H.line(R, [H.p(i + .08, 7.46, 1.8), H.p(i + .58 * (i < 2 ? 1 : -1), 7.46, 2.25)], 'sun', 3);
    for (const z of [1.37, 2.13]) H.dot(...H.p(i + .08, 7.55, z), 2, 'blue');
  }
  shape(H, R, [H.p(.32, 6.97, 2.37), H.p(2.27, 7.44, 2.81), H.p(4.25, 6.97, 2.37), H.p(4.25, 7.95, 2.37), H.p(.32, 7.95, 2.37)], 'teal', .62);
  box(H, R, .35, 7.86, 3.87, .13, 2.23, .15, 'sun', .5);
  for (let k = 0; k < 12; k++) H.line(R, [H.p(.45 + k * .32, 7.04, 2.4), H.p(.45 + k * .32, 7.86, 2.4)], 'blue', .7);
  box(H, R, .84, 7.12, 2.78, .49, .55, .09, 'sun', .5);
  for (let k = 0; k < 3; k++) {
    box(H, R, .99 + k * .7, 7.19, .57, .34, .66, .13, 'paper', 1);
    H.line(R, [H.p(1.05 + k * .7, 7.53, .73), H.p(1.47 + k * .7, 7.53, .73)], 'coral', .9);
  }
  for (const j of [9.95, 10.2, 10.45]) box(H, R, .72, j, 2.88, .19, .55, .13, 'sun', .45);
  for (const i of [.93, 3.15]) {
    box(H, R, i, 10.01, .19, .52, .06, .49, 'blue', .5);
    H.line(R, [H.p(i, 10.09, .18), H.p(i + .43, 10.4, .55)], 'coral', 2);
  }
  for (const i of [.92, 3.25]) for (const j of [10.04, 10.54]) H.dot(...H.p(i, j, .7), 1.5, 'blue');
  const fallen = [H.p(.36, 5.19, .15), H.p(1.76, 5.71, .21), H.p(1.92, 6.3, .15)];
  stroke(H, R, fallen, 'blue', 10, .55);
  stroke(H, R, fallen.map(([x, y]) => [x, y - 3]), 'coral', 6, .4);
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(.76 + k * .36, 5.42 + k * .25, .32);
    H.line(R, [[x, y], [x, y - 7]], 'paper', 2);
    oval(H, R, x, y - 8, 5, 2.5, 'sun', .55);
  }
  for (let k = 0; k < 8; k++) {
    const i = 3.24 + k * .17;
    box(H, R, i, 10.93, .12, .59, .03, .05, 'blue', .28);
  }
  const [bx, by] = H.p(1.3, 10.3, .7);
  shape(H, R, [[bx - 10, by], [bx - 9, by - 17], [bx + 9, by - 17], [bx + 11, by]], 'teal', .7);
  stroke(H, R, [[bx - 5, by - 16], [bx - 5, by - 25], [bx + 5, by - 25], [bx + 6, by - 16]], 'blue', 1);
  for (let n = 0; n < 21; n++) {
    const i = .7 + R() * 10.6, j = 3.3 + R() * 8;
    const [x, y] = H.p(i, j, .03);
    shape(H, R, [[x - 3, y], [x + 1, y - 2], [x + 4, y + 1], [x, y + 2]], n % 4 ? 'sun' : 'coral', .46, .45);
  }
}, (H, R, t) => {
  const u = cycle(t, 20);
  H.clip(H.tile(.2, .2, 11.6, 11.6, .02), () => {
    for (let k = 0; k < 5; k++) {
      const [x, y] = H.p(4.2 + k * .7 + Math.sin(t * .14) * .28, 4.5 + k * .5, .025);
      H.tint(ell(x, y, 20 + k * 3, 7), 'sun', .12);
    }
  });
  actor(H, R, 5.7, 5.1, t, 'tokyoMeijiBow', { shirt: ['coral', .5], face: 'nw', hairStyle: 'pony' }, 0, 1.2);
  actor(H, R, 2.9, 8.3, t, u > .39 && u < .54 ? 'reach' : 'idle', { shirt: ['teal', .65], face: 'nw' }, 0, 1.15);
  for (let row = 0; row < 2; row++) for (let k = 0; k < 6; k++) tablet(H, R, .99 + k * .48, 1.2 + row * .76, Math.sin(t * .75 + k) * .7);
  actor(H, R, 9.45, 10.04, t, 'tokyoMeijiSweep', {
    shirt: ['paper', 1], pants: ['blue', .6], face: 'sw',
    prop: (HH, RR, pts) => {
      const [x, y] = pts.nearHand;
      const sweep = u > .56 && u < .79 ? Math.sin((u - .56) * TAU * 9) * 8 : 0;
      stroke(HH, RR, [[x + 6, y - 18], [x - 18 + sweep, y + 32]], 'sun', 2.2);
      for (let n = 0; n < 8; n++) H.line(R, [[x - 18 + sweep, y + 27], [x - 30 + n * 2.8 + sweep, y + 42]], 'coral', 1.1, { tone: .65 });
    },
  }, 0, 1.13);
  actor(H, R, 8.65, 8.47, t, 'hold', { shirt: ['coral', .45], face: 'nw', prop: (HH, RR, pts) => {
    const [x, y] = pts.nearHand;
    stroke(HH, RR, [[x, y], [x - 15, y - 7]], 'sun', 2);
    oval(HH, RR, x - 18, y - 9, 5.5, 3.3, 'sun', .6);
    if (u > .15 && u < .48) for (let k = 0; k < 3; k++) H.line(R, [[x - 21 + k * 3, y - 7], [x - 20 + k * 3, y + 8 + Math.sin(t * 6 + k) * 3]], 'teal', .65);
  } }, 0, 1.14);
  actor(H, R, 4.93, 11.33, t, 'read', { shirt: ['teal', .53], face: 'se', glasses: true }, .54, 1.14, 'elder');
  actor(H, R, 6.93, 8.57, t, 'hold', { shirt: ['sun', .5], face: 'nw', prop: (HH, RR, pts) => {
    const [x, y] = pts.nearHand;
    shape(HH, RR, [[x - 9, y - 8], [x + 8, y - 8], [x + 8, y + 2], [x - 9, y + 2]], 'blue', .8, .6);
    oval(HH, RR, x, y - 3, 4, 4, 'paper', 1);
  } }, 0, 1.12);
  for (let k = 0; k < 2; k++) {
    const [x, y] = H.p(3.4 + k * .7 + Math.sin(t * .31 + k) * .09, 6.1 + k * .2, .08);
    oval(H, R, x, y - 4, 5, 3.5, 'blue', .62);
    oval(H, R, x + 4, y - 8, 2.6, 2.7, 'teal', .7);
    H.line(R, [[x - 1, y - 1], [x - 1, y + 3]], 'coral', .65);
    H.line(R, [[x + 2, y - 1], [x + 3, y + 3]], 'coral', .65);
    H.dot(x + 5, y - 9, .6, 'paper');
  }
  if (u > .65 && u < .94) {
    const f = (u - .65) / .29;
    const [x, y] = H.p(7.1 + Math.sin(f * TAU) * .3, 5 + f * 2, 2.7 * (1 - f));
    shape(H, R, [[x - 4, y], [x, y - 2], [x + 5, y + 2], [x, y + 3]], 'sun', .7, .6);
  }
});
