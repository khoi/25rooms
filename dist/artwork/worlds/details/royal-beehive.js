import { world, shape, oval, stroke, label, plaque, box, table, creature, cycle, TAU } from '../common.js';

function hexagon(H, i, j, z, radius) {
  return Array.from({ length: 6 }, (_, n) => H.p(i + Math.cos(n * TAU / 6) * radius, j + Math.sin(n * TAU / 6) * radius, z));
}

function platform(H, R, i, j, radius, z, ink = 'sun') {
  const top = hexagon(H, i, j, z, radius), bottom = hexagon(H, i, j, z - .22, radius);
  for (let n = 0; n < 6; n++) shape(H, R, [bottom[n], bottom[(n + 1) % 6], top[(n + 1) % 6], top[n]], 'coral', .64, .7);
  shape(H, R, top, ink, .46, 1.1);
  H.outline(R, hexagon(H, i, j, z + .01, radius * .88), 'coral', 1, { tone: .65 });
}

function jar(H, R, i, j, z, ink = 'sun', size = 1) {
  const [x, y] = H.p(i, j, z), w = 5.5 * size, h = 14 * size;
  shape(H, R, [[x - w, y], [x + w, y], [x + w, y - h + 3], [x - w, y - h + 3]], 'paper', 1, .65);
  shape(H, R, [[x - w + 1, y - 1], [x + w - 1, y - 1], [x + w - 1, y - h + 5], [x - w + 1, y - h + 5]], ink, .8, .3);
  shape(H, R, [[x - w - .5, y - h], [x + w + .5, y - h], [x + w + .5, y - h + 3], [x - w - .5, y - h + 3]], 'coral', .7, .65);
  shape(H, R, [[x - 3 * size, y - 4 * size], [x + 3 * size, y - 4 * size], [x + 3 * size, y - 8 * size], [x - 3 * size, y - 8 * size]], 'paper', 1, .35);
  H.dot(x, y - 6 * size, 1.1 * size, 'sun', 1);
}

function basket(H, R, i, j, z, ink = 'coral', pollen = false) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 10, y - 11], [x + 10, y - 11], [x + 8, y + 1], [x - 8, y + 1]], ink, .62, .7);
  oval(H, R, x, y - 11, 10, 3.6, 'sun', .45);
  for (let n = 0; n < 4; n++) H.line(R, [[x - 9, y - 8 + n * 2.3], [x + 9, y - 8 + n * 2.3]], 'blue', .55, { tone: .6 });
  if (pollen) for (let n = 0; n < 7; n++) H.dot(x + (n % 4 - 1.5) * 3.7, y - 12 - Math.floor(n / 4) * 3, 2.6, n % 3 ? 'sun' : 'coral', .9, { knock: true });
}

function flower(H, R, i, j, z, ink = 'coral', height = 20) {
  const [x, y] = H.p(i, j, z);
  stroke(H, R, [[x, y], [x + 3, y - height * .45], [x, y - height]], 'teal', 1.6);
  shape(H, R, [[x + 1, y - 7], [x + 10, y - 13], [x + 7, y - 5]], 'teal', .7, .6);
  for (let n = 0; n < 6; n++) oval(H, R, x + Math.cos(n * TAU / 6) * 5, y - height + Math.sin(n * TAU / 6) * 5, 4, 3.5, ink, .75);
  H.dot(x, y - height, 2.8, 'sun', 1, { knock: true });
}

function bee(H, R, i, j, z, t, size = .5, role = '') {
  const [x, y] = H.p(i, j, z);
  creature(H, R, x, y, 'bee', t, size);
  if (role === 'apron') shape(H, R, [[x - 6, y - 15], [x + 6, y - 15], [x + 8, y - 3], [x - 8, y - 3]], 'paper', 1, .6);
  if (role === 'nurse') {
    shape(H, R, [[x - 6, y - 26], [x + 6, y - 26], [x + 5, y - 31], [x - 5, y - 31]], 'paper', 1, .6);
    H.line(R, [[x - 2, y - 28], [x + 2, y - 28]], 'coral', 1.4);
    H.line(R, [[x, y - 30], [x, y - 26]], 'coral', 1.4);
  }
  if (role === 'builder') {
    oval(H, R, x, y - 23, 7, 4, 'coral', .85);
    H.line(R, [[x - 9, y - 23], [x + 9, y - 23]], 'blue', 1.2);
  }
  if (role === 'courier') {
    shape(H, R, [[x - 8, y - 15], [x - 16, y - 18], [x - 18, y - 6], [x - 9, y - 3]], 'coral', .75, .65);
    H.dot(x - 13, y - 10, 2.2, 'sun', 1);
    stroke(H, R, [[x - 11, y - 15], [x + 5, y - 20]], 'coral', 1.8);
  }
  if (role === 'guard') {
    const pole = x + 14;
    H.line(R, [[pole, y + 2], [pole, y - 38]], 'blue', 1.5);
    shape(H, R, [[pole, y - 42], [pole - 3, y - 34], [pole + 3, y - 34]], 'sun', .9, .7);
    shape(H, R, [[x - 16, y - 15], [x - 8, y - 15], [x - 8, y - 5], [x - 12, y], [x - 16, y - 5]], 'teal', .75, .8);
    H.dot(x - 12, y - 10, 2, 'sun', 1);
    shape(H, R, [[x - 6, y - 26], [x + 6, y - 26], [x + 4, y - 33], [x - 4, y - 33]], 'coral', .8, .6);
  }
}

function waxFrame(H, R, i, j, z, size = 1) {
  const [x, y] = H.p(i, j, z), w = 16 * size, h = 24 * size;
  shape(H, R, [[x - w, y], [x + w, y], [x + w, y - h], [x - w, y - h]], 'sun', .5, 1.5);
  for (let row = 0; row < 3; row++) for (let col = 0; col < 4; col++) {
    const cx = x - w + 5 * size + col * 7 * size, cy = y - 5 * size - row * 7 * size;
    H.outline(R, Array.from({ length: 6 }, (_, n) => [cx + Math.cos(n * TAU / 6) * 4 * size, cy + Math.sin(n * TAU / 6) * 4 * size]), 'coral', .8, { tone: .85 });
  }
}

function hiveUnder(H, R) {
  for (const side of [0, 1]) for (let row = 0; row < 5; row++) for (let col = 0; col < 10; col++) {
    const a = .58 + col * 1.08 + (row % 2) * .4, z = .48 + row * .77;
    const points = Array.from({ length: 6 }, (_, n) => {
      const p = a + Math.cos(n * TAU / 6) * .53, q = z + Math.sin(n * TAU / 6) * .41;
      return side ? H.p(p, .035, q) : H.p(.035, p, q);
    });
    shape(H, R, points, (row + col * 2) % 7 === 0 ? 'teal' : 'sun', .48, .8);
    if ((col + row) % 5 === 1) {
      const [x, y] = side ? H.p(a, .04, z) : H.p(.04, a, z);
      H.line(R, [[x - 4, y - 3], [x + 5, y - 3]], 'paper', 1.4);
    }
  }
  plaque(H, R, 5.7, .06, 4.24, 'HER HONEYNESS', 'paper', 110);
  for (const [i, j, r, z, ink] of [[5.8, 3.1, 1.85, .7, 'coral'], [2.1, 3.1, 1.45, .4, 'teal'], [9.4, 2, 1.4, .45, 'sun'], [2.4, 7.5, 1.9, .2, 'sun'], [8.7, 6.35, 1.8, .28, 'sun'], [8.7, 9.7, 1.65, .2, 'teal']]) platform(H, R, i, j, r, z, ink);
  for (const [i, j, w, d, z] of [[3.05, 2.8, 1.5, .6, .42], [6.9, 2.15, 1.35, .6, .45], [5.1, 4.2, .65, 3.1, .22], [3.2, 6.95, 4.6, .65, .2]]) {
    box(H, R, i, j, w, d, z, .12, 'paper', 1);
    for (let q = .15; q < Math.max(w, d); q += .3) H.line(R, w > d ? [H.p(i + q, j, z + .14), H.p(i + q, j + d, z + .14)] : [H.p(i, j + q, z + .14), H.p(i + w, j + q, z + .14)], 'coral', .85);
  }
  box(H, R, 4.9, 2.45, 1.8, .8, .7, .65, 'sun', .6);
  const [tx, ty] = H.p(5.8, 2.56, 1.36);
  shape(H, R, [[tx - 27, ty + 7], [tx - 27, ty - 44], [tx - 17, ty - 64], [tx, ty - 72], [tx + 17, ty - 64], [tx + 27, ty - 44], [tx + 27, ty + 7]], 'coral', .76, 1.3);
  shape(H, R, [[tx - 19, ty + 3], [tx - 19, ty - 40], [tx, ty - 55], [tx + 19, ty - 40], [tx + 19, ty + 3]], 'paper', 1, .7);
  for (const i of [4.5, 7.1]) {
    box(H, R, i, 2.15, .16, .16, .7, 2, 'blue', .8);
    const [x, y] = H.p(i, 2.15, 2.8);
    shape(H, R, [[x, y], [x + 18, y + 5], [x + 18, y + 35], [x + 9, y + 29], [x, y + 34]], 'teal', .65, .7);
    H.dot(x + 8, y + 15, 3, 'sun', 1);
  }
  table(H, R, 1.15, 1.55, 2.15, .8, .56, 'teal');
  for (let n = 0; n < 6; n++) {
    const i = 1.25 + (n % 3) * .63, j = 1.68 + Math.floor(n / 3) * .45;
    platform(H, R, i, j, .34, .73, 'paper');
    const [x, y] = H.p(i, j, .76);
    oval(H, R, x, y - 4, 6, 5, 'sun', .55);
    stroke(H, R, [[x - 3, y - 3], [x + 2, y - 4], [x, y - 7]], 'coral', 1.5);
    H.dot(x - 3, y - 6, .7, 'blue', 1);
  }
  plaque(H, R, 1.9, .08, 2.05, 'NURSERY', 'paper', 67);
  for (let n = 0; n < 3; n++) jar(H, R, .6, 3.2 + n * .48, .4, 'paper', .75);
  const [mx, my] = H.p(2.1, 1.75, 2.25);
  H.line(R, [[mx, my], [mx, my + 18], [mx - 20, my + 22], [mx + 20, my + 22]], 'blue', .8);
  for (let n = -1; n <= 1; n++) {
    H.line(R, [[mx + n * 18, my + 22], [mx + n * 18, my + 35 + n * 3]], 'blue', .55);
    oval(H, R, mx + n * 18, my + 36 + n * 3, 4, 4, n ? 'sun' : 'coral', .8);
  }
  for (const z of [.55, 1.35]) {
    box(H, R, 8.1, .5, 3.15, .8, z, .1, 'coral', .65);
    for (let n = 0; n < 7; n++) jar(H, R, 8.3 + n * .43, .9, z + .11, 'sun', .82);
  }
  plaque(H, R, 9.6, .05, 2.42, 'ROYAL RESERVES', 'paper', 98);
  for (let n = 0; n < 3; n++) basket(H, R, 8.65 + n * .8, 2.5, .48, 'coral', true);
  table(H, R, 1.05, 6.85, 3.15, .85, .72, 'teal');
  for (let n = 0; n < 11; n++) {
    const i = 1.2 + n * .275;
    H.line(R, [H.p(i, 6.85, .85), H.p(i, 7.7, .85)], 'blue', 1.6);
  }
  for (const j of [6.8, 7.74]) H.line(R, [H.p(1.05, j, .9), H.p(4.2, j, .9)], 'coral', 1.4);
  const [vx, vy] = H.p(1.35, 5.78, .3);
  shape(H, R, [[vx - 21, vy], [vx + 21, vy], [vx + 21, vy - 39], [vx - 21, vy - 39]], 'sun', .75, 1);
  oval(H, R, vx, vy - 39, 21, 8, 'coral', .65);
  oval(H, R, vx, vy - 40, 15, 4, 'sun', .8);
  for (const dy of [-30, -8]) H.line(R, [[vx - 21, vy + dy], [vx + 21, vy + dy]], 'coral', 2);
  stroke(H, R, [[vx + 17, vy - 20], [vx + 39, vy - 20], [vx + 39, vy + 6]], 'blue', 3.2);
  label(H, 'NECTAR', vx, vy - 19, 6.5);
  for (let n = 0; n < 5; n++) jar(H, R, 1.1 + n * .52, 8.6, .22, 'sun', .9);
  for (let n = 0; n < 3; n++) {
    box(H, R, .6 + n * .85, 9.2, .7, .7, .01, .45, 'coral', .5);
    for (let k = 0; k < 3; k++) jar(H, R, .7 + n * .85 + (k % 2) * .27, 9.35 + Math.floor(k / 2) * .25, .46, 'sun', .62);
    const [x, y] = H.p(.95 + n * .85, 9.93, .23); label(H, 'H', x, y, 6);
  }
  plaque(H, R, 2.6, 6.48, 1.85, 'BOTTLING', 'paper', 69);
  table(H, R, 8, 5.05, 2.6, .95, .7, 'coral');
  for (let n = 0; n < 3; n++) waxFrame(H, R, 8.3 + n * .82, 5.38, .82, .55);
  for (let n = 0; n < 5; n++) box(H, R, 8.25 + (n % 3) * .52, 6.85 + Math.floor(n / 3) * .5, .42, .35, .3, .16, 'paper', 1);
  for (const i of [8, 10.6]) for (const j of [3.9, 4.55]) box(H, R, i, j, .08, .08, .02, 2.4, 'blue', .6);
  box(H, R, 7.9, 3.9, 2.9, .8, 1.57, .1, 'teal', .55);
  for (const i of [8.4, 9.5, 10.4]) waxFrame(H, R, i, 4.1, 1.7, .6);
  for (let n = 0; n < 7; n++) H.line(R, [H.p(10.6, 4.65 + n * .14, 1.57 - n * .21), H.p(11, 4.65 + n * .14, 1.57 - n * .21)], 'coral', 2);
  for (const i of [10.6, 11]) H.line(R, [H.p(i, 4.65, 1.65), H.p(i, 5.7, 0)], 'blue', 1.4);
  plaque(H, R, 9.3, 3.8, 2.58, 'WAX WORKS', 'paper', 77);
  table(H, R, 4.2, 9.1, 2.05, .95, .56, 'sun');
  basket(H, R, 4.6, 9.5, .7, 'teal', true);
  basket(H, R, 5.6, 9.5, .7, 'coral', true);
  const [sx, sy] = H.p(6, 9.13, .7);
  H.line(R, [[sx, sy], [sx, sy - 31], [sx - 15, sy - 25], [sx + 15, sy - 25]], 'blue', 1.3);
  for (const dx of [-15, 15]) {
    H.line(R, [[sx + dx, sy - 25], [sx + dx, sy - 12]], 'blue', .6);
    oval(H, R, sx + dx, sy - 11, 7, 3, 'coral', .6);
  }
  plaque(H, R, 5.2, 9.92, .47, 'POLLEN POST', 'paper', 80);
  for (let n = 0; n < 3; n++) basket(H, R, 3.6 + n * .67, 10.78, .05, 'sun', true);
  table(H, R, 7.4, 9.2, 3, 1, .57, 'teal');
  for (let n = 0; n < 7; n++) {
    const i = 7.6 + n * .4;
    basket(H, R, i, 9.54, .7, n % 2 ? 'sun' : 'coral');
    flower(H, R, i, 9.54, .88, n % 3 === 0 ? 'paper' : 'coral', 15 + n % 3 * 5);
  }
  for (let n = 0; n < 3; n++) {
    basket(H, R, 9.75 + n * .5, 10.8, .02, 'coral');
    flower(H, R, 9.75 + n * .5, 10.8, .2, n % 2 ? 'sun' : 'coral', 25);
  }
  plaque(H, R, 8.9, 10.28, .49, 'FLOWER EXCHANGE', 'paper', 101);
  const [qx, qy] = H.p(7.1, 10.35, .05);
  shape(H, R, [[qx - 12, qy], [qx + 12, qy], [qx + 12, qy - 23], [qx - 12, qy - 23]], 'coral', .7, .8);
  H.line(R, [[qx - 8, qy - 16], [qx + 8, qy - 16]], 'blue', 2);
  label(H, 'MAIL', qx, qy - 7, 5);
  for (const [i, j] of [[10.95, 7.7], [6.9, 11]]) {
    box(H, R, i, j, .15, .15, 0, 1.3, 'teal', .8);
    const [x, y] = H.p(i, j, 1.3);
    shape(H, R, [[x, y], [x + 18, y + 2], [x + 15, y + 12], [x, y + 10]], 'coral', .8, .7);
    H.dot(x + 7, y + 6, 2.5, 'sun', 1);
  }
}

function hiveLive(H, R, t) {
  H.at(5.8, 3.15, 1.1, HH => {
    const [x, y] = HH.p(5.8, 3.15, 1.08);
    creature(HH, R, x, y, 'bee', t * .12, 1.08);
    shape(HH, R, [[x - 12, y - 50], [x - 14, y - 64], [x - 5, y - 57], [x, y - 69], [x + 6, y - 57], [x + 14, y - 64], [x + 12, y - 50]], 'sun', .9, .9);
    for (const dx of [-8, 0, 8]) HH.dot(x + dx, y - 53, 1.8, 'coral', 1);
    stroke(HH, R, [[x + 18, y - 20], [x + 31, y - 13], [x + 31, y - 50]], 'blue', 1.8);
    oval(HH, R, x + 31, y - 53, 5, 5, 'sun', .9);
  });
  for (const [i, j, side] of [[4.3, 3.8, -1], [7.1, 3.25, 1]]) H.at(i, j, .7, HH => {
    bee(HH, R, i, j, .72, t, .52);
    const [x, y] = HH.p(i, j, .74), dx = side * (14 + Math.sin(t * 2) * 5);
    stroke(HH, R, [[x + side * 9, y - 10], [x + dx, y - 40]], 'blue', 1.2);
    shape(HH, R, [[x + dx, y - 35], [x + dx - 16, y - 54], [x + dx - 9, y - 64], [x + dx + 6, y - 67], [x + dx + 18, y - 54]], 'teal', .65, .8);
    for (let n = -1; n <= 1; n++) HH.line(R, [[x + dx, y - 35], [x + dx + n * 12, y - 60]], 'sun', .75);
  });
  for (const [i, j] of [[1.08, 3.35], [2.97, 2.9]]) H.at(i, j, .4, HH => {
    bee(HH, R, i, j, .41, t, .47, 'nurse');
    const [x, y] = HH.p(i, j, .45);
    stroke(HH, R, [[x + 7, y - 13], [x + 17, y - 18 + Math.sin(t * 2) * 3]], 'blue', 1);
    oval(HH, R, x + 18, y - 19 + Math.sin(t * 2) * 3, 3.5, 2, 'paper', 1);
  });
  for (let n = 0; n < 5; n++) {
    const i = 1.25 + cycle(t * .36 + n * .65, 3.4) * 2.8;
    jar(H, R, i, 7.2, .9, 'sun', .85);
  }
  const [drx, dry] = H.p(1.98, 6.77, 1.33);
  H.line(R, [[drx, dry], [drx, dry + 8 + Math.sin(t * 4) * 4]], 'sun', 2.1);
  for (const [i, j] of [[3.48, 6.1], [4.16, 8.03], [1.02, 8.25]]) H.at(i, j, .25, HH => {
    bee(HH, R, i, j, .27, t + i, .5, 'apron');
    const [x, y] = HH.p(i, j, .29), lift = Math.sin(t * 3 + i) * 4;
    stroke(HH, R, [[x + 8, y - 12], [x + 16, y - 18 + lift]], 'blue', 1.1);
    HH.line(R, [[x + 15, y - 18 + lift], [x + 23, y - 18 + lift]], 'coral', 2.4);
  });
  for (const [i, j, z] of [[8.13, 6.42, .3], [10.16, 4.45, 1.7]]) H.at(i, j, z, HH => {
    bee(HH, R, i, j, z, t, .48, 'builder');
    const [x, y] = HH.p(i, j, z), move = Math.sin(t * 3) * 5;
    stroke(HH, R, [[x + 8, y - 14], [x + 18, y - 24 + move]], 'blue', 1.2);
    shape(HH, R, [[x + 15, y - 25 + move], [x + 23, y - 25 + move], [x + 24, y - 21 + move], [x + 16, y - 21 + move]], 'coral', .8, .6);
  });
  for (let n = 0; n < 3; n++) {
    const u = cycle(t + n * 3.2, 10), i = 3.1 + u * 5.6, j = 5 + Math.sin(u * Math.PI) * 2.8;
    H.at(i, j, 1 + n * .32, HH => {
      bee(HH, R, i, j, 1 + n * .32 + Math.sin(t * 3 + n) * .08, t + n, .43, 'courier');
      const [x, y] = HH.p(i, j, .83 + n * .32);
      oval(HH, R, x + 8, y - 7, 4.5, 4, 'sun', .85);
    });
  }
  H.at(5.7, 8.65, .1, HH => {
    bee(HH, R, 5.7, 8.65, .12, t, .5, 'apron');
    const [x, y] = HH.p(5.7, 8.65, .15);
    shape(HH, R, [[x + 10, y - 13], [x + 23, y - 13], [x + 20, y - 22], [x + 9, y - 22]], 'paper', 1, .6);
    HH.line(R, [[x + 13, y - 18], [x + 19, y - 18]], 'blue', .65);
  });
  H.at(8.5, 8.82, .24, HH => {
    bee(HH, R, 8.5, 8.82, .25, t, .51, 'apron');
    flower(HH, R, 8.74, 8.85, .6 + Math.sin(t * 1.7) * .07, 'coral', 17);
  });
  H.at(7.5, 11.1, .04, HH => bee(HH, R, 7.5, 11.1, .06, t, .5, 'courier'));
  for (const [i, j] of [[10.83, 7.24], [6.52, 10.87]]) H.at(i, j, .03, HH => bee(HH, R, i, j, .04, t * .2, .54, 'guard'));
}

export default function enrich(room) {
  const colony = world(room.id, room.title, { floor: 'sun', tone: .27, wall: 'coral', wallTone: .24, height: 4.5 }, hiveUnder, hiveLive);
  return { ...room, under: colony.under, live: colony.live };
}
