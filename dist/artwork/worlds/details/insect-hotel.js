import { world, shape, oval, stroke, box, table, bench, creature, bottle, steam, rug, ell, TAU } from '../common.js';

function key(H, R, x, y, ink = 'sun', scale = 1) {
  H.outline(R, ell(x, y, 2.6 * scale, 2.6 * scale), ink, 1.4 * scale, { tone: 1 });
  H.line(R, [[x, y + 2 * scale], [x, y + 10 * scale], [x + 4 * scale, y + 10 * scale], [x + 4 * scale, y + 7 * scale]], ink, 1.5 * scale);
}

function envelope(H, R, i, j, z, ink = 'paper') {
  const p = H.tile(i, j, .48, .34, z);
  shape(H, R, p, ink, .95, .6);
  H.line(R, [p[0], H.p(i + .25, j + .24, z + .005), p[1]], 'blue', .55);
  H.dot(...H.p(i + .25, j + .24, z + .01), 1.2, 'coral');
}

function suitcase(H, R, i, j, z, ink, width = .65) {
  box(H, R, i, j, width, .4, z, .43, ink, .75);
  for (const k of [.2, .76]) H.line(R, [H.p(i + width * k, j, z + .44), H.p(i + width * k, j + .4, z + .44), H.p(i + width * k, j + .4, z)], 'sun', 1.7);
  stroke(H, R, [H.p(i + width * .36, j + .2, z + .44), H.p(i + width * .36, j + .2, z + .57), H.p(i + width * .67, j + .2, z + .57), H.p(i + width * .67, j + .2, z + .44)], 'blue', 1.4);
  const [x, y] = H.p(i + width * .84, j + .42, z + .27);
  shape(H, R, [[x - 3, y - 2], [x + 3, y - 2], [x + 2, y + 4], [x - 3, y + 4]], 'paper', 1, .5);
}

function cup(H, R, x, y, ink = 'paper', scale = 1) {
  oval(H, R, x, y + 2 * scale, 7 * scale, 3 * scale, 'paper', 1);
  oval(H, R, x + 5 * scale, y - 3 * scale, 3 * scale, 3 * scale, ink, .8);
  shape(H, R, [[x - 4 * scale, y - 8 * scale], [x + 4 * scale, y - 8 * scale], [x + 3 * scale, y], [x - 3 * scale, y]], ink, .95, .6);
  oval(H, R, x, y - 8 * scale, 4 * scale, 1.8 * scale, 'blue', .65);
}

function bug(H, R, i, j, t, ink = 'teal', role = '', size = .65, z = 0) {
  const [x, y] = H.p(i, j, z);
  const bob = Math.sin(t * 2) * 1.1;
  creature(H, R, x, y + bob, role === 'waiter' ? 'bee' : 'beetle', t, size, ink);
  if (role === 'porter' || role === 'clerk') {
    shape(H, R, [[x - 8 * size, y - 47 * size + bob], [x + 8 * size, y - 47 * size + bob], [x + 7 * size, y - 55 * size + bob], [x - 7 * size, y - 55 * size + bob]], 'coral', .9, .65);
    H.line(R, [[x - 10 * size, y - 47 * size + bob], [x + 10 * size, y - 47 * size + bob]], 'sun', 2);
    for (const dy of [-26, -18, -10]) H.dot(x, y + dy * size + bob, 1.1, 'sun');
  }
  if (role === 'cleaner' || role === 'waiter') {
    shape(H, R, [[x - 9 * size, y - 29 * size], [x + 9 * size, y - 29 * size], [x + 11 * size, y - 6 * size], [x - 11 * size, y - 6 * size]], 'paper', .95, .6);
    H.line(R, [[x - 7 * size, y - 26 * size], [x + 7 * size, y - 26 * size]], 'coral', 1.3);
  }
  return [x, y];
}

function roomService(H, R, i, j, t) {
  const [x, y] = bug(H, R, i, j, t, 'sun', 'waiter', .62);
  const sway = Math.sin(t * 2) * 2;
  stroke(H, R, [[x + 7, y - 15], [x + 22, y - 29 + sway], [x + 31, y - 30 + sway]], 'blue', 1.8);
  oval(H, R, x + 33, y - 32 + sway, 19, 5, 'sun', .8);
  shape(H, R, [[x + 21, y - 33 + sway], [x + 23, y - 43 + sway], [x + 33, y - 48 + sway], [x + 42, y - 43 + sway], [x + 45, y - 33 + sway]], 'paper', .95, .75);
  H.dot(x + 33, y - 50 + sway, 2.3, 'sun');
  H.line(R, [[x + 24, y - 40 + sway], [x + 28, y - 44 + sway]], 'teal', 1);
}

function bellCart(H, R, i, j, t) {
  for (const a of [0, 1.7]) for (const b of [0, .83]) {
    const [x, y] = H.p(i + a, j + b, .16);
    oval(H, R, x, y, 3.5, 4.5, 'blue', .9);
    H.dot(x, y, 1, 'sun');
  }
  box(H, R, i - .1, j - .08, 1.95, 1.02, .23, .12, 'coral', .8);
  for (const a of [0, 1.7]) {
    stroke(H, R, [H.p(i + a, j + .05, .32), H.p(i + a, j + .05, 1.9), H.p(i + a, j + .85, 1.9), H.p(i + a, j + .85, .32)], 'sun', 3.2);
  }
  H.line(R, [H.p(i, j + .05, 1.9), H.p(i + 1.7, j + .05, 1.9)], 'sun', 3.2);
  suitcase(H, R, i + .08, j + .02, .36, 'teal', .86);
  suitcase(H, R, i + .92, j + .1, .36, 'coral', .68);
  suitcase(H, R, i + .35, j + .08, .8, 'sun', .78);
  box(H, R, i + .45, j + .11, .6, .44, 1.23, .29, 'paper', .9);
  H.line(R, [H.p(i + .75, j + .1, 1.53), H.p(i + .75, j + .55, 1.53)], 'coral', 2);
  const headI = i - 1.2;
  for (let k = 5; k >= 0; k--) {
    const [x, y] = H.p(headI + k * .2, j + .72 + Math.sin(t * 2 + k) * .045, .2);
    for (const dx of [-4, 4]) H.line(R, [[x + dx, y + 3], [x + dx + Math.sin(t * 4 + k) * 2, y + 9]], 'blue', .8);
    oval(H, R, x, y, 6.5, 6.3, k % 2 ? 'sun' : 'teal', .9);
  }
  const [hx, hy] = H.p(headI - .12, j + .74, .34);
  oval(H, R, hx, hy, 8, 8, 'teal', .8);
  for (const dx of [-3, 3]) {
    H.dot(hx + dx, hy - 2, 2, 'paper');
    H.dot(hx + dx - .5, hy - 2, .8, 'blue');
    stroke(H, R, [[hx + dx, hy - 6], [hx + dx * 2, hy - 15], [hx + dx * 2 - 2, hy - 17]], 'blue', .8);
  }
  shape(H, R, [[hx - 7, hy - 7], [hx + 7, hy - 7], [hx + 5, hy - 12], [hx - 5, hy - 12]], 'coral', .9, .7);
  stroke(H, R, [H.p(headI + .9, j + .7, .5), H.p(i, j + .8, .7)], 'blue', 1.5);
}

function lobby(H, R) {
  for (const side of ['nw', 'ne']) {
    const wall = (a, z) => side === 'nw' ? H.p(.08, a, z) : H.p(a, .08, z);
    for (const z of [.16, .28, 3.88, 4.04]) H.line(R, [wall(.12, z), wall(11.85, z)], z > 3 ? 'sun' : 'blue', z > 3 ? 3 : 1.6);
    for (let a = .6; a < 12; a += 1.9) {
      H.line(R, [wall(a, .3), wall(a, 1.22)], 'sun', 1.1);
      H.line(R, [wall(a, 3.72), wall(a, 3.9)], 'coral', 3);
    }
  }
  for (const side of ['nw', 'ne']) {
    const p = n => side === 'nw' ? H.p(.03, n, 1.3) : H.p(n, .03, 1.3);
    H.line(R, [p(0), p(12)], 'sun', 2.2);
  }
  shape(H, R, [H.p(.09, .55, .08), H.p(.09, 2.55, .08), H.p(.09, 2.55, 3.6), H.p(.09, .55, 3.6)], 'blue', .9);
  for (const j of [.48, 2.64]) box(H, R, .1, j, .17, .13, 0, 3.6, 'sun', .8);
  box(H, R, .09, .48, .28, 2.3, 3.6, .16, 'coral', .8);
  for (const j of [.68, 2.4]) {
    H.line(R, [H.p(.16, j, .05), H.p(.16, j, 3.6)], 'paper', 2.1);
  }

  const [wx, wy] = H.p(.3, 1.58, 3.65);
  oval(H, R, wx, wy, 15, 7, 'blue', .9);
  oval(H, R, wx, wy, 10, 4, 'sun', .85);
  for (const dx of [-7, 7]) H.line(R, [[wx + dx, wy], [wx + dx, wy + 30]], 'blue', 1.2);
  box(H, R, .2, .2, 1.05, .4, .15, .8, 'teal', .8);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(.3 + k * .22, .62, .25), H.p(.3 + k * .22, .62, .84)], 'sun', 1);


  const [cx, cy] = H.p(.15, 3.03, 3.05);
  oval(H, R, cx, cy, 11, 11, 'paper', .95);
  for (let k = 0; k < 12; k++) H.dot(cx + Math.sin(k / 12 * TAU) * 8, cy + Math.cos(k / 12 * TAU) * 8, .8, 'blue');
  H.line(R, [[cx - 4, cy - 4], [cx, cy], [cx + 5, cy - 1]], 'blue', 1);


  for (let k = 0; k < 4; k++) {
    const i = 4.05 + k * 1.88;
    shape(H, R, [H.p(i, .08, .04), H.p(i + 1.42, .08, .04), H.p(i + 1.42, .08, 2.75), H.p(i, .08, 2.75)], k % 2 ? 'coral' : 'blue', .8);
    shape(H, R, [H.p(i + .14, .12, .28), H.p(i + 1.28, .12, .28), H.p(i + 1.28, .12, 2.55), H.p(i + .14, .12, 2.55)], k % 2 ? 'coral' : 'teal', .7, .7);
    H.line(R, [H.p(i + .24, .13, 1.4), H.p(i + 1.18, .13, 1.4)], 'sun', .8);

    H.dot(...H.p(i + 1.12, .17, 1.18), 2.2, 'sun');
    rug(H, R, i + .12, .22, 1.22, .64, 'coral', .45, { border: 'sun' });
    for (let r = 0; r < 3; r++) H.line(R, [H.p(i + .37, .14, .62 + r * .14), H.p(i + 1, .14, .62 + r * .14)], 'blue', .6);
    if (k === 1 || k === 3) {
      const [x, y] = H.p(i + 1.12, .19, 1.02);
      shape(H, R, [[x - 3, y - 2], [x + 4, y - 2], [x + 4, y + 9], [x - 3, y + 9]], 'paper', 1, .6);
    }
  }
  for (let k = 0; k < 4; k++) {
    const i = 4.05 + k * 1.88;
    const p = (a, z) => H.p(i + a, .22, z);
    for (const a of [-.06, 1.43]) box(H, R, i + a, .12, .13, .18, .06, 2.9, 'sun', .74);
    stroke(H, R, [p(-.07, 2.8), p(.18, 3.13), p(.71, 3.26), p(1.2, 3.13), p(1.56, 2.8)], 'sun', 4);
    oval(H, R, ...p(.71, 2.83), 5, 5, 'paper', 1);
    H.line(R, [p(.49, 2.83), p(.94, 2.83)], 'coral', 1.1);
    box(H, R, i + .15, .17, 1.13, .17, .04, .06, 'blue', .8);
  }
  shape(H, R, [H.p(5.35, .12, 3.02), H.p(9.45, .12, 3.02), H.p(9.45, .12, 3.66), H.p(5.35, .12, 3.66)], 'sun', .9, .85);

  for (const j of [3.6, 6.75]) box(H, R, .09, j, .46, .12, 1.72, 1.92, 'sun', .75);
  for (const z of [1.72, 2.32, 2.92, 3.52]) box(H, R, .09, 3.6, .46, 3.27, z, .1, 'sun', .8);
  for (let k = 0; k < 5; k++) box(H, R, .09, 3.65 + k * .61, .4, .06, 1.78, 1.73, 'blue', .5);
  for (let row = 0; row < 3; row++) for (let col = 0; col < 5; col++) {
    const [x, y] = H.p(.57, 3.91 + col * .61, 2.06 + row * .6);
    if ((row + col) % 4) {
      H.dot(x, y - 4, 1.6, 'paper');
      key(H, R, x, y, 'sun', .62);
      shape(H, R, [[x + 3, y + 4], [x + 7, y + 5], [x + 7, y + 10], [x + 3, y + 9]], 'coral', .85, .4);
    } else {
      shape(H, R, [[x - 5, y - 1], [x + 5, y + 1], [x + 5, y + 8], [x - 5, y + 6]], 'paper', 1, .5);
      H.line(R, [[x - 5, y - 1], [x, y + 4], [x + 5, y + 1]], 'blue', .5);
    }
  }
  for (const z of [1.8, 2.4, 3]) envelope(H, R, .25, 5.59, z, 'paper');
  table(H, R, 1.15, .8, 2.35, .6, .7, 'teal');
  for (let n = 0; n < 5; n++) envelope(H, R, 1.24 + n * .42, .88, .84 + n % 2 * .025, n % 2 ? 'sun' : 'paper');
  for (let n = 0; n < 3; n++) box(H, R, 1.3 + n * .73, .87, .61, .39, .85, .12, 'coral', .45);

  rug(H, R, 4.3, 5.65, 3.6, 4.7, 'coral', .58, { border: 'sun' });
  for (let n = 0; n < 5; n++) {
    const [x, y] = H.p(6.1, 6.12 + n * .82, .02);
    shape(H, R, [[x, y - 4], [x + 5, y], [x, y + 4], [x - 5, y]], 'sun', .6, .5);
  }
  box(H, R, 1.22, 4.2, 3.35, 1.15, 0, .16, 'blue', .85);
  box(H, R, 1.22, 4.2, 3.35, 1.15, .16, .92, 'coral', .77);
  for (const i of [1.25, 2.35, 3.45, 4.45]) {
    box(H, R, i, 5.35, .1, .12, .16, .93, 'sun', .85);
    box(H, R, i - .04, 5.33, .18, .17, .18, .1, 'sun', .8);
  }
  H.line(R, [H.p(1.3, 5.47, .29), H.p(4.45, 5.47, .29)], 'sun', 2);
  H.line(R, [H.p(1.3, 5.47, .91), H.p(4.45, 5.47, .91)], 'sun', 2);
  box(H, R, 1.07, 4.12, 3.65, 1.36, 1.08, .12, 'sun', .8);
  for (let n = 0; n < 3; n++) {
    shape(H, R, [H.p(1.47 + n * 1.04, 5.36, .22), H.p(2.22 + n * 1.04, 5.36, .22), H.p(2.22 + n * 1.04, 5.36, .88), H.p(1.47 + n * 1.04, 5.36, .88)], 'coral', .8, .65);
  }

  shape(H, R, H.tile(2.2, 4.37, 1.03, .7, 1.22), 'paper', 1, .6);
  H.line(R, [H.p(2.71, 4.37, 1.23), H.p(2.71, 5.07, 1.23)], 'blue', .7);
  for (let n = 0; n < 4; n++) for (const i of [2.28, 2.79]) H.line(R, [H.p(i, 4.47 + n * .13, 1.24), H.p(i + .3, 4.47 + n * .13, 1.24)], 'blue', .55);
  const [bx, by] = H.p(3.82, 4.83, 1.22);
  oval(H, R, bx, by, 10, 4, 'blue', .8);
  oval(H, R, bx, by - 4, 7, 6, 'sun', 1);
  H.dot(bx, by - 11, 2, 'sun');
  envelope(H, R, 1.3, 4.49, 1.24);
  const [ix, iy] = H.p(3.42, 4.31, 1.23);
  oval(H, R, ix, iy, 4, 4, 'blue', .9);
  stroke(H, R, [[ix, iy], [ix + 2, iy - 13], [ix + 8, iy - 23]], 'blue', .8);
  shape(H, R, [[ix + 3, iy - 11], [ix + 3, iy - 22], [ix + 10, iy - 26], [ix + 8, iy - 16]], 'paper', 1, .5);
  for (const [i, j] of [[4.8, 5.8], [6.6, 5.8], [4.8, 8.65], [6.6, 8.65]]) {
    oval(H, R, ...H.p(i, j, .02), 6, 3, 'blue', .8);
    H.line(R, [H.p(i, j, .06), H.p(i, j, .8)], 'sun', 2.2);
    H.dot(...H.p(i, j, .84), 3, 'sun');
  }
  for (const i of [4.8, 6.6]) stroke(H, R, [H.p(i, 5.8, .8), H.p(i, 7.2, .56), H.p(i, 8.65, .8)], 'coral', 2.3);
  shape(H, R, [H.p(.08, 7.12, 2.05), H.p(.08, 10.42, 2.05), H.p(.08, 10.42, 3.57), H.p(.08, 7.12, 3.57)], 'blue', .9);
  for (const j of [7.12, 8.77, 10.42]) box(H, R, .08, j, .48, .11, 2.04, 1.6, 'coral', .75);
  for (const z of [2.05, 2.75, 3.5]) box(H, R, .08, 7.12, .48, 3.45, z, .1, 'sun', .75);
  for (let k = 0; k < 7; k++) {
    const [x, y] = H.p(.37, 7.4 + k * .43, 2.88);
    oval(H, R, x, y - 5, 6, 9, k % 3 ? 'paper' : 'sun', 1);
    oval(H, R, x, y - 5, 3.5, 6, 'teal', .25);
  }
  for (let k = 0; k < 4; k++) bottle(H, R, ...H.p(.36, 7.46 + k * .64, 2.19), k % 2 ? 'coral' : 'sun', .44);
  table(H, R, .7, 7.5, 1.2, 2.2, 1, 'teal');
  const [tx, ty] = H.p(1.26, 8.12, 1.18);
  oval(H, R, tx, ty - 7, 11, 9, 'sun', .85);
  oval(H, R, tx + 11, ty - 8, 5, 6, 'sun', .8);
  stroke(H, R, [[tx - 9, ty - 8], [tx - 16, ty - 16], [tx - 21, ty - 17]], 'sun', 4);
  oval(H, R, tx, ty - 16, 6, 2.5, 'paper', 1);
  H.dot(tx, ty - 19, 2, 'coral');
  for (let n = 0; n < 3; n++) cup(H, R, ...H.p(.97 + n % 2 * .56, 8.7 + Math.floor(n / 2) * .5, 1.14), 'paper', .72);
  for (let n = 0; n < 2; n++) bottle(H, R, ...H.p(.95 + n * .6, 7.7, 1.16), n ? 'coral' : 'sun', .36);
  const [px, py] = H.p(2.92, 9.55, 1.0);
  H.line(R, [H.p(2.92, 9.55, 0), [px, py]], 'blue', 5);
  oval(H, R, px, py, 36, 16, 'teal', .7);
  H.line(R, [[px - 29, py + 3], [px + 27, py - 3]], 'blue', .7);
  for (const dx of [-17, 0, 17]) H.line(R, [[px + dx - 8, py - 9], [px + dx, py + 1], [px + dx + 10, py + 10]], 'sun', .6);
  cup(H, R, px - 16, py - 3, 'paper', .78);
  cup(H, R, px + 17, py + 3, 'paper', .78);
  oval(H, R, px + 3, py - 7, 8, 4, 'paper', 1);
  for (let n = 0; n < 3; n++) oval(H, R, px - 1 + n * 4, py - 9, 3, 2, 'coral', .8);
  for (const [i, j] of [[2.07, 9.57], [3.69, 9.5], [2.93, 10.48]]) {
    box(H, R, i - .17, j - .17, .34, .34, 0, .46, 'sun', .75);
    oval(H, R, ...H.p(i, j, .48), 10, 5, 'coral', .9);
  }

  for (let n = 0; n < 4; n++) {
    const [x, y] = H.p(.14, 7.3 + n * .72, 1.8);
    shape(H, R, [[x - 4, y], [x + 4, y], [x + 4, y - 10], [x - 4, y - 10]], n % 2 ? 'paper' : 'sun', .9, .6);
  }
  box(H, R, 9.26, 3.75, 1.85, .96, .25, .12, 'blue', .8);
  box(H, R, 9.26, 3.75, 1.85, .96, 1.06, .1, 'coral', .8);
  for (const i of [9.3, 11.07]) for (const j of [3.79, 4.65]) {
    H.line(R, [H.p(i, j, .18), H.p(i, j, 1.32)], 'sun', 1.8);
    oval(H, R, ...H.p(i, j, .13), 2.7, 3.5, 'blue', .9);
  }
  for (let n = 0; n < 5; n++) box(H, R, 9.42, 3.93, .82, .5, 1.17 + n * .09, .08, n % 2 ? 'paper' : 'teal', .7);
  for (let n = 0; n < 3; n++) bottle(H, R, ...H.p(10.48 + n * .2, 4.13, 1.19), n % 2 ? 'coral' : 'teal', .27);
  for (let n = 0; n < 3; n++) oval(H, R, ...H.p(9.53 + n * .52, 4.17, .47), 5, 5, 'paper', 1);
  const [ux, uy] = H.p(10.85, 5.03, .17);
  shape(H, R, [[ux - 9, uy - 14], [ux + 9, uy - 14], [ux + 6, uy], [ux - 6, uy]], 'teal', .85, .7);
  oval(H, R, ux, uy - 14, 9, 3, 'paper', .9);
  stroke(H, R, [[ux - 8, uy - 13], [ux - 7, uy - 26], [ux + 7, uy - 26], [ux + 8, uy - 13]], 'blue', .8);
  bench(H, R, 6.8, 10.35, 1.8, 'teal');
  suitcase(H, R, 8.82, 10.7, .02, 'coral', .78);
  for (let n = 0; n < 3; n++) box(H, R, 6.85 + n * .37, 10.56, .3, .44, .7, .07, ['paper', 'coral', 'sun'][n], .8);
  table(H, R, 10.5, 10.25, 1.02, 1.1, .7, 'coral');
  box(H, R, 10.54, 10.3, .84, .84, .11, .1, 'sun', .75);
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(10.73 + k * .22, 10.7, .84);
    oval(H, R, x, y, 4, 3, k === 1 ? 'blue' : 'sun', .8);
    H.line(R, [[x - 3, y - 2], [x + 3, y - 2]], 'paper', .7);
  }
  const [ax, ay] = H.p(11.03, 10.68, .88);
  shape(H, R, [[ax - 6, ay - 7], [ax + 9, ay - 5], [ax + 10, ay - 1], [ax - 7, ay - 2]], 'teal', .8);
  for (let k = 0; k < 6; k++) H.line(R, [[ax - 5 + k * 2, ay - 1], [ax - 6 + k * 2, ay + 3]], 'sun', .8);
  suitcase(H, R, 10.65, 10.47, .22, 'blue', .64);
  const [lx, ly] = H.p(8.05, 2.67, 2.9);
  H.line(R, [[lx, ly - 36], [lx, ly - 18]], 'blue', 1.3);
  shape(H, R, [[lx - 18, ly - 16], [lx + 18, ly - 16], [lx + 12, ly + 11], [lx - 12, ly + 11]], 'sun', .85, 1);
  for (const dx of [-9, 0, 9]) H.line(R, [[lx + dx * 1.6, ly - 16], [lx + dx, ly + 11]], 'coral', .8);
  oval(H, R, lx, ly - 17, 18, 5, 'paper', .8);
  H.glow(lx, ly, 67, 47, 'sun', .25);
  const [sx, sy] = H.p(.88, 10.89, .03);
  shape(H, R, [[sx - 9, sy - 15], [sx + 9, sy - 15], [sx + 7, sy], [sx - 7, sy]], 'coral', .9, .8);
  for (let n = 0; n < 3; n++) stroke(H, R, [[sx - 5 + n * 5, sy - 8], [sx - 8 + n * 7, sy - 35], [sx - 4 + n * 7, sy - 39], [sx - 1 + n * 7, sy - 36]], n % 2 ? 'sun' : 'blue', 1.7);
}

function guests(H, R, t) {
  const lift = .18 + (1 + Math.sin(t * .55)) * .57;
  box(H, R, .13, .65, .78, 1.65, lift, .11, 'coral', .8);
  bug(H, R, .42, 1.45, t, 'sun', '', .46, lift + .13);
  for (let k = 0; k < 6; k++) {
    const j = .61 + k * .31;
    H.line(R, [H.p(.94, j, lift + .13), H.p(.94, j + .3, lift + 1.85)], 'sun', .9);
    H.line(R, [H.p(.95, j + .3, lift + .13), H.p(.95, j, lift + 1.85)], 'sun', .9);
  }
  H.line(R, [H.p(.56, 1.45, lift + 1.9), H.p(.56, 1.45, 3.62)], 'blue', 1.4);
  bug(H, R, 2.45, 3.8, t, 'blue', 'clerk', .62, .85);
  const [rx, ry] = H.p(2.8, 4.58, 1.25);
  stroke(H, R, [[rx - 11, ry - 13], [rx - 3, ry - 7], [rx + Math.sin(t * 3) * 5, ry - 2]], 'blue', 1.8);
  H.line(R, [[rx + Math.sin(t * 3) * 5, ry - 8], [rx + Math.sin(t * 3) * 5 + 2, ry + 2]], 'coral', 1.1);
  for (const [i, j, ink, phase] of [[5.72, 5.9, 'teal', 0], [5.71, 7.55, 'coral', 2], [5.72, 9.2, 'sun', 4]]) {
    const [x, y] = bug(H, R, i, j, t + phase, ink, '', .69);
    shape(H, R, [[x + 8, y - 18], [x + 17, y - 15], [x + 17, y - 28], [x + 8, y - 31]], 'paper', .95, .6);
    H.line(R, [[x + 10, y - 25], [x + 15, y - 23]], 'coral', .7);
    suitcase(H, R, i - .75, j + .17, .01, ink === 'teal' ? 'sun' : 'teal', .48);
  }
  const cleanI = 10.52 + Math.sin(t * .85) * .2;
  const [hx, hy] = bug(H, R, cleanI, 2.14, t, 'teal', 'cleaner', .61);
  const sweep = Math.sin(t * 2.2) * 9;
  H.line(R, [[hx - 6, hy - 19], [hx - 21 + sweep, hy + 17]], 'blue', 1.6);
  shape(H, R, [[hx - 23 + sweep, hy + 9], [hx - 16 + sweep, hy + 13], [hx - 17 + sweep, hy + 23], [hx - 30 + sweep, hy + 17]], 'sun', .85, .6);
  for (let k = 0; k < 4; k++) H.line(R, [[hx - 23 + sweep + k * 2, hy + 13], [hx - 28 + sweep + k * 3, hy + 18]], 'coral', .6);
  for (let n = 0; n < 3; n++) H.dot(hx - 31 + n * 6, hy + 24 + Math.sin(t + n), 1, 'blue', .4);
  roomService(H, R, 7.8, 5.15 + Math.sin(t * .6) * .42, t);
  const [dx, dy] = bug(H, R, 3.55, 10.02, t, 'coral', '', .57, .34);
  const sip = Math.max(0, Math.sin(t * 1.3)) * 7;
  stroke(H, R, [[dx - 8, dy - 13], [dx - 17, dy - 16 - sip]], 'blue', 1.3);
  cup(H, R, dx - 19, dy - 18 - sip, 'paper', .65);
  steam(H, R, ...H.p(1.26, 8.12, 1.65), t, 2, 'paper');
  bellCart(H, R, 9.65 + Math.sin(t * .6) * .18, 8.35, t);
  const [mx, my] = H.p(8.05, 2.67, 2.9);
  for (let k = 0; k < 5; k++) {
    const a = t * .65 + k * TAU / 5;
    const x = mx + Math.cos(a) * (33 + k * 3), y = my + Math.sin(a) * 20;
    const flap = 3 + Math.abs(Math.sin(t * 11 + k)) * 4;
    oval(H, R, x - 5, y, 6, flap, k % 2 ? 'paper' : 'sun', .9);
    oval(H, R, x + 5, y, 6, flap, 'paper', 1);
    H.line(R, [[x, y - 5], [x, y + 5]], 'blue', 1.2);
    H.line(R, [[x, y - 5], [x - 3, y - 9]], 'blue', .5);
    H.line(R, [[x, y - 5], [x + 3, y - 9]], 'blue', .5);
  }
  const [nx, ny] = bug(H, R, 7.99, 10.7, t, 'teal', '', .52, .63);
  shape(H, R, [[nx - 16, ny - 14], [nx - 1, ny - 10], [nx + 13, ny - 14], [nx + 13, ny - 31], [nx - 1, ny - 27], [nx - 16, ny - 31]], 'paper', 1, .7);
  H.line(R, [[nx - 1, ny - 10], [nx - 1, ny - 27]], 'blue', .6);

  for (let k = 0; k < 3; k++) H.line(R, [[nx - 12, ny - 19 + k * 3], [nx - 4, ny - 17 + k * 3]], 'blue', .5);
}

export default function enrich(room) {
  const hotel = world(room.id, room.title, { floor: 'sun', tone: .23, wall: 'teal', wallTone: .45, wallStyle: 'stripe', height: 4.2, head: room.head }, lobby, guests);
  return { ...room, under: hotel.under, live: hotel.live };
}
