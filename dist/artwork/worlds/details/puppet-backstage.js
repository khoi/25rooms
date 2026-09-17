import { shape, oval, stroke, box, table, actor, creature, rug, ell, starPts } from '../common.js';
import { slab, backWalls } from '../../drawings.js';

const colors = ['coral', 'teal', 'sun', 'paper'];

function spool(H, R, x, y, ink, size = 1) {
  shape(H, R, [[x - 5 * size, y], [x + 5 * size, y], [x + 5 * size, y - 11 * size], [x - 5 * size, y - 11 * size]], ink, .72, .7);
  for (const dy of [-11, 0]) oval(H, R, x, y + dy * size, 7 * size, 2.6 * size, 'sun', .65);
  for (let k = 2; k < 10; k += 2) H.line(R, [[x - 4 * size, y - k * size], [x + 4 * size, y - k * size]], 'blue', .45, { tone: .5 });
}

function face(H, R, x, y, size = 1, expression = 0) {
  oval(H, R, x, y, 9 * size, 11 * size, 'paper', 1);
  for (const dx of [-3.5, 3.5]) {
    H.dot(x + dx * size, y - 1.7 * size, .95 * size, 'blue');
    H.dot(x + dx * size * 1.55, y + 3 * size, 1.6 * size, 'coral', .55);
    H.line(R, [[x + (dx - 1.8) * size, y - 5 * size], [x + (dx + 1.8) * size, y - (expression ? 6 : 5) * size]], 'blue', .8);
  }
  stroke(H, R, [[x - 3 * size, y + 5 * size], [x, y + (expression ? 3 : 7) * size], [x + 3 * size, y + 5 * size]], 'coral', .9);
  stroke(H, R, [[x, y - size], [x - size, y + 2 * size], [x + size, y + 2 * size]], 'blue', .6);
}

function wig(H, R, x, y, n, size = 1) {
  H.line(R, [[x, y], [x, y - 13 * size]], 'blue', 1.5);
  oval(H, R, x, y, 9 * size, 3 * size, 'coral', .7);
  face(H, R, x, y - 24 * size, size * .78, n % 2);
  if (n % 3 === 0) {
    for (const dx of [-10, -5, 0, 5, 10]) oval(H, R, x + dx * size, y - (34 - Math.abs(dx) * .45) * size, 4.4 * size, 5 * size, 'paper', 1);
    for (const dx of [-10, 10]) for (let k = 0; k < 3; k++) oval(H, R, x + dx * size, y - (26 - k * 5) * size, 3.5 * size, 3.5 * size, 'paper', 1);
  } else if (n % 3 === 1) {
    shape(H, R, [[x - 10 * size, y - 18 * size], [x - 10 * size, y - 32 * size], [x, y - 40 * size], [x + 10 * size, y - 31 * size], [x + 10 * size, y - 17 * size], [x + 5 * size, y - 20 * size], [x + 5 * size, y - 29 * size], [x - 5 * size, y - 32 * size], [x - 6 * size, y - 17 * size]], 'coral', .8);
    for (let k = -7; k <= 7; k += 3) H.line(R, [[x + k * size, y - 32 * size], [x + (k + 2) * size, y - 23 * size]], 'blue', .5);
  } else {
    for (let k = 0; k < 8; k++) oval(H, R, x + Math.cos(k / 7 * Math.PI) * 10 * size, y - 26 * size - Math.sin(k / 7 * Math.PI) * 11 * size, 4.5 * size, 4.5 * size, 'sun', .85);
  }
}

function scissors(H, R, x, y, size = 1) {
  oval(H, R, x - 5 * size, y + 3 * size, 3.2 * size, 2.6 * size, 'paper', 1);
  oval(H, R, x + 3 * size, y + 5 * size, 3.2 * size, 2.6 * size, 'paper', 1);
  H.line(R, [[x - 3 * size, y + 2 * size], [x + 9 * size, y - 10 * size]], 'blue', 1.4);
  H.line(R, [[x + 2 * size, y + 3 * size], [x - 3 * size, y - 11 * size]], 'blue', 1.4);
  H.dot(x + size, y - size, 1.5 * size, 'sun');
}

function costume(H, R, x, y, n) {
  stroke(H, R, [[x, y - 10], [x + 3, y - 13], [x + 5, y - 10], [x, y - 6]], 'sun', 1);
  shape(H, R, [[x, y - 6], [x + 15, y + 3], [x - 15, y + 3]], 'paper', .4, .65);
  const ink = colors[n % 4];
  shape(H, R, [[x - 5, y], [x + 5, y], [x + 17, y + 9], [x + 12, y + 17], [x + 7, y + 13], [x + 8, y + 25], [x + 15, y + 43], [x - 14, y + 43], [x - 8, y + 25], [x - 7, y + 13], [x - 12, y + 17], [x - 17, y + 9]], ink, .72);
  H.line(R, [[x, y + 2], [x, y + 38]], 'blue', .7);
  H.line(R, [[x - 7, y + 24], [x + 7, y + 24]], 'sun', 2);
  for (let k = 0; k < 4; k++) H.dot(x + 3, y + 9 + k * 6, 1.2, 'sun');
  if (n % 2) for (const dx of [-8, -3, 3, 8]) H.line(R, [[x + dx * .5, y + 27], [x + dx, y + 40]], 'paper', .8);
  else for (const dx of [-7, 7]) shape(H, R, starPts(x + dx, y + 33, 3.5, 1.5, 5), 'sun', .9, .45);
}

function puppet(H, R, x, y, size = 1, t = 0, ink = 'coral') {
  const bob = Math.sin(t * 2) * 2 * size;
  const p = (a, b) => [x + a * size, y + b * size + bob];
  const limbs = [
    [[-5, -29], [-9, -14], [-12, -2]],
    [[5, -29], [10, -15], [15, -3]],
    [[-8, -47], [-18, -37 + Math.sin(t) * 6], [-25, -46 + Math.sin(t) * 5]],
    [[8, -47], [18, -37 - Math.sin(t) * 5], [26, -45 - Math.sin(t) * 5]],
  ];
  for (const limb of limbs) {
    stroke(H, R, limb.map(([a, b]) => p(a, b)), 'blue', 6 * size);
    stroke(H, R, limb.map(([a, b]) => p(a, b)), 'sun', 3.9 * size);
    for (const [a, b] of limb) oval(H, R, ...p(a, b), 2.4 * size, 2.4 * size, 'paper', 1);
  }
  shape(H, R, [[-9, -49], [9, -49], [7, -28], [-7, -28]].map(([a, b]) => p(a, b)), ink, .8);
  for (const b of [-43, -36]) H.dot(...p(0, b), 1.6 * size, 'sun');
  shape(H, R, [[-8, -49], [0, -45], [8, -49], [0, -53]].map(([a, b]) => p(a, b)), 'paper', 1);
  face(H, R, ...p(0, -60), size * .8);
  shape(H, R, [[-9, -66], [-6, -82], [0, -74], [5, -85], [9, -65]].map(([a, b]) => p(a, b)), 'teal', .8);
  for (const [a, b] of [[-6, -82], [5, -85]]) H.dot(...p(a, b), 2 * size, 'sun');
  for (const a of [-12, 15]) oval(H, R, ...p(a, -1), 6 * size, 3 * size, 'blue', .9);
  return [p(-25, -46 + Math.sin(t) * 5), p(0, -68), p(26, -45 - Math.sin(t) * 5)];
}

function sewingMachine(H, R, x, y) {
  shape(H, R, [[x - 24, y + 2], [x + 23, y + 2], [x + 29, y - 4], [x - 18, y - 8]], 'blue', .8);
  shape(H, R, [[x - 13, y - 4], [x - 13, y - 27], [x - 6, y - 34], [x + 13, y - 34], [x + 17, y - 28], [x + 17, y - 6], [x + 8, y - 6], [x + 8, y - 25], [x - 6, y - 25], [x - 6, y - 4]], 'teal', .85);
  oval(H, R, x + 20, y - 23, 7, 10, 'blue', .8);
  oval(H, R, x + 20, y - 23, 3, 5, 'paper', 1);
  H.line(R, [[x - 11, y - 13], [x - 11, y]], 'blue', 1);
  spool(H, R, x + 8, y - 34, 'coral', .5);
  stroke(H, R, [[x + 8, y - 40], [x - 9, y - 35], [x - 11, y - 13]], 'sun', .7);
  shape(H, R, [[x - 29, y - 4], [x - 2, y + 2], [x + 1, y + 23], [x - 15, y + 28], [x - 27, y + 17]], 'coral', .7);
  for (let k = 0; k < 6; k++) H.line(R, [[x - 24 + k * 4, y + 5], [x - 22 + k * 4, y + 18]], 'sun', .55);
}

export default function enrich(room) {
  return {
    ...room,
    under(H, R) {
      slab(H, R, this, { ink: 'coral', tone: .22 });
      for (let j = .4; j < 12; j += .5) {
        H.line(R, [H.p(0, j), H.p(12, j)], 'blue', .6, { tone: .35, amp: .1 });
        for (let i = (j * 2 % 2) * 1.4; i < 12; i += 2.8) H.line(R, [H.p(i, j), H.p(i, j + .45)], 'blue', .55, { tone: .3 });
      }
      backWalls(H, R, this, 3.8, { ink: 'blue', tone: .57 });
      for (let z = .4; z < 3.8; z += .7) H.line(R, [H.p(.05, 0, z), H.p(.05, 11.7, z)], 'paper', .6, { tone: .3 });
      shape(H, R, [H.p(5.2, .08, 2.97), H.p(10.7, .08, 2.97), H.p(10.7, .08, 3.52), H.p(5.2, .08, 3.52)], 'sun', .8);

      box(H, R, .65, 1, .16, 5.7, 0, 2.55, 'teal', .6);
      H.line(R, [H.p(.85, 1.05, 2.75), H.p(.85, 6.6, 2.75)], 'sun', 3);
      for (let k = 0; k < 5; k++) costume(H, R, ...H.p(.92, 1.45 + k * 1.08, 2.62), k);
      for (let k = 0; k < 4; k++) {
        box(H, R, .8, 1.3 + k * 1.23, .68, .9, .08, .32, colors[k], .6);
      }
      const rack = H.p(.87, 5.95, 3.2);

      for (const z of [.65, 1.9]) {
        box(H, R, 4.9, .4, 6.1, .65, z, .12, 'coral', .65);
        for (let k = 0; k < 6; k++) wig(H, R, ...H.p(5.3 + k * 1.01, .9, z + .13), k + (z > 1 ? 0 : 1), .8);
      }
      for (const i of [4.95, 10.85]) box(H, R, i, .5, .1, .5, 0, 2.1, 'sun', .6);

      shape(H, R, [H.p(2.2, .06, 1.3), H.p(3.9, .06, 1.3), H.p(3.9, .06, 2.9), H.p(2.2, .06, 2.9)], 'sun', .65);
      for (let n = 0; n < 3; n++) {
        const [x, y] = H.p(2.65 + n * .5, .1, 2.25);
        face(H, R, x, y, .58, n % 2);
        H.line(R, [[x - 5, y + 13], [x + 6, y + 17]], 'blue', .65);
      }

      const [qx, qy] = H.p(3.07, .1, 1.55);

      table(H, R, 2.7, 3.05, 2.65, 1.6, 1.02, 'sun');
      table(H, R, 3.65, 4.85, .6, .6, .46, 'coral');
      const [sx, sy] = H.p(3.65, 3.72, 1.15);
      sewingMachine(H, R, sx, sy);
      for (let k = 0; k < 4; k++) spool(H, R, ...H.p(4.55 + k % 2 * .36, 3.35 + Math.floor(k / 2) * .34, 1.16), colors[k], .7);
      scissors(H, R, ...H.p(4.67, 4.21, 1.17), .9);
      const [pinx, piny] = H.p(2.94, 4.12, 1.17);
      oval(H, R, pinx, piny, 9, 5, 'coral', .85);
      for (let n = 0; n < 5; n++) {
        H.line(R, [[pinx - 7 + n * 3, piny], [pinx - 9 + n * 4, piny - 8]], 'blue', .6);
        H.dot(pinx - 9 + n * 4, piny - 8, 1.5, 'sun');
      }
      box(H, R, 3.02, 3.6, 1, .65, .03, .32, 'teal', .6);

      for (const [i, j, ink] of [[3.2, 3.8, 'coral'], [3.7, 3.9, 'sun'], [3.4, 4, 'paper']]) shape(H, R, [H.p(i, j, .35), H.p(i + .4, j, .35), H.p(i + .3, j + .4, .28), H.p(i - .1, j + .2, .3)], ink, .7);
      table(H, R, 7.9, 2.95, 2.9, 1.7, 1.03, 'teal');
      table(H, R, 7.85, 4.82, .62, .62, .46, 'sun');
      const [fx, fy] = H.p(8.7, 3.75, 1.17);
      face(H, R, fx, fy - 12, 1.1);
      H.line(R, [[fx, fy + 1], [fx, fy + 9]], 'blue', 2);
      oval(H, R, fx, fy + 10, 11, 4, 'coral', .65);
      for (let k = 0; k < 5; k++) {
        const [x, y] = H.p(9.4 + (k % 3) * .4, 3.37 + Math.floor(k / 3) * .6, 1.17);
        shape(H, R, [[x - 5, y], [x + 5, y], [x + 5, y - 10], [x - 5, y - 10]], colors[k % 4], .8);
        oval(H, R, x, y - 10, 5, 2, 'paper', 1);
        H.dot(x, y - 10, 2.3, colors[k % 3]);
      }
      const [palx, paly] = H.p(8.23, 4.21, 1.17);
      oval(H, R, palx, paly, 17, 8, 'paper', 1);
      for (let k = 0; k < 4; k++) H.dot(palx - 11 + k * 7, paly - 1, 2.5, colors[k]);
      const [bx, by] = H.p(10.43, 4.1, 1.17);
      shape(H, R, [[bx - 6, by], [bx + 6, by], [bx + 7, by - 15], [bx - 7, by - 15]], 'sun', .7);
      for (let k = 0; k < 5; k++) {
        H.line(R, [[bx - 4 + k * 2, by - 4], [bx - 9 + k * 4, by - 30 + k % 2 * 5]], 'blue', 1);
        H.dot(bx - 9 + k * 4, by - 30 + k % 2 * 5, 2, colors[k % 3]);
      }

      box(H, R, 10.43, 5.3, .95, 1.1, 0, .57, 'coral', .5);
      for (let n = 0; n < 3; n++) face(H, R, ...H.p(10.65 + n % 2 * .45, 5.55 + Math.floor(n / 2) * .46, .68), .55, n % 2);
      const [mx, my] = H.p(.9, 8.6, 2.2);
      shape(H, R, [[mx - 33, my + 44], [mx + 33, my + 44], [mx + 33, my - 44], [mx - 33, my - 44]], 'coral', .78);
      oval(H, R, mx, my, 25, 37, 'paper', 1);
      H.clip(ell(mx, my, 24, 36), () => {
        H.tint([[mx - 30, my + 18], [mx + 20, my - 38], [mx + 34, my - 23], [mx - 13, my + 39]], 'teal', .28);
        H.line(R, [[mx - 19, my + 5], [mx + 9, my - 24]], 'paper', 3);
      });
      for (const dx of [-29, 29]) for (let k = 0; k < 6; k++) H.dot(mx + dx, my - 36 + k * 14, 2.8, 'sun');
      table(H, R, .55, 8, 1.9, 1.9, .88, 'coral');
      wig(H, R, ...H.p(.95, 8.6, 1.03), 1, .7);
      for (let k = 0; k < 3; k++) {
        const [x, y] = H.p(1.48 + k * .27, 8.5, 1.05);
        oval(H, R, x, y, 4, 2, colors[k], .8);
        H.line(R, [[x, y], [x, y - 10]], colors[k], 4);
      }
      const [combX, combY] = H.p(1.7, 9.4, 1.03);
      H.line(R, [[combX - 10, combY], [combX + 10, combY]], 'blue', 2);
      for (let k = 0; k < 8; k++) H.line(R, [[combX - 9 + k * 2.5, combY], [combX - 9 + k * 2.5, combY + 5]], 'blue', .7);

      table(H, R, 3.65, 8.1, 2.65, 1.8, .98, 'sun');
      const [rx, ry] = H.p(4.62, 8.9, 1.12);
      shape(H, R, [[rx - 17, ry - 13], [rx + 8, ry - 18], [rx + 19, ry + 1], [rx - 7, ry + 9]], 'coral', .75);
      face(H, R, rx - 24, ry - 13, .68);
      for (const [dx, dy, endX, endY] of [[9, -13, 27, -24], [15, -2, 34, 9], [-9, 5, -5, 20], [4, 4, 13, 17]]) {
        H.line(R, [[rx + dx, ry + dy], [rx + endX, ry + endY]], 'blue', 5);
        H.line(R, [[rx + dx, ry + dy], [rx + endX, ry + endY]], 'sun', 3);
        oval(H, R, rx + endX, ry + endY, 2.4, 2.4, 'paper', 1);
      }
      for (let k = 0; k < 3; k++) {
        const [x, y] = H.p(5.53 + k % 2 * .42, 8.3 + Math.floor(k / 2) * .38, 1.12);
        oval(H, R, x, y, 7, 4, 'paper', 1);
        for (let q = 0; q < 3; q++) H.dot(x - 3 + q * 3, y, 1.6, 'sun');
      }
      const [hx, hy] = H.p(5.8, 9.43, 1.12);
      H.line(R, [[hx - 9, hy + 3], [hx + 4, hy - 14]], 'coral', 3);
      H.line(R, [[hx - 2, hy - 18], [hx + 11, hy - 11]], 'blue', 6);

      for (let k = 0; k < 3; k++) {
        box(H, R, 3.85 + k * .7, 8.7, .58, .7, .05, .3, colors[k], .6);
      }
      for (const i of [6.6, 9.45]) box(H, R, i, 5.65, .12, .14, 0, 3.25, 'coral', .75);
      box(H, R, 6.6, 5.65, 2.96, .18, 3.25, .13, 'sun', .8);
      for (let k = 0; k < 4; k++) {
        const [x, y] = H.p(6.97 + k * .65, 5.8, 3.26);
        oval(H, R, x, y, 5, 5, 'paper', 1);
        H.dot(x, y, 1.5, 'blue');
        stroke(H, R, [[x - 3, y + 3], [x - 7, y + 34], [x + 6, y + 57], [x + 9, y + 76]], 'sun', .75);
      }

      rug(H, R, 7.2, 7.3, 3.9, 2.55, 'teal', .5, { border: 'sun' });
      for (let k = 0; k < 7; k++) H.line(R, [H.p(7.35 + k * .52, 7.45, .02), H.p(7.35 + k * .52, 9.68, .02)], 'paper', .6, { tone: .4 });
      for (let k = 0; k < 4; k++) {
        const [x, y] = H.p(6.5, 6.1 + k * .47, .05);
        H.outline(R, ell(x, y, 11, 4), 'sun', 2, { tone: .8 });
        H.outline(R, ell(x, y, 7, 2.4), 'blue', .6);
      }
      box(H, R, 9.45, 10.25, 1.75, 1.05, .05, .75, 'teal', .72);
      shape(H, R, [H.p(9.45, 10.28, .85), H.p(11.2, 10.28, .85), H.p(11.2, 10.03, 1.6), H.p(9.45, 10.03, 1.6)], 'coral', .7);

      for (const i of [9.72, 10.8]) {
        H.line(R, [H.p(i, 10.28, .8), H.p(i, 11.29, .8), H.p(i, 11.29, .17)], 'sun', 2);
      }
      const [cx, cy] = H.p(10.24, 10.67, 1.03);
      shape(H, R, [[cx - 18, cy + 6], [cx - 21, cy - 11], [cx - 10, cy - 4], [cx - 3, cy - 17], [cx + 5, cy - 4], [cx + 15, cy - 13], [cx + 13, cy + 8]], 'sun', .85);
      for (const dx of [-11, -3, 7]) H.dot(cx + dx, cy + 2, 2.3, 'coral');
      const [wx, wy] = H.p(10.92, 10.63, 1.01);
      H.line(R, [[wx, wy], [wx + 9, wy - 37]], 'blue', 2);
      shape(H, R, starPts(wx + 9, wy - 39, 8, 3.5, 5), 'sun', .85);
      const [ux, uy] = H.p(11.35, 8.93, .12);
      stroke(H, R, [[ux, uy], [ux + 5, uy + 5], [ux + 9, uy], [ux + 9, uy - 57]], 'blue', 2);
      shape(H, R, [[ux + 9, uy - 60], [ux - 4, uy - 22], [ux + 8, uy - 28], [ux + 20, uy - 23]], 'coral', .75);
      for (const [i, j] of [[6.05, 10.7], [6.75, 10.98]]) {
        const [x, y] = H.p(i, j, .08);
        shape(H, R, [[x - 8, y], [x + 13, y], [x + 16, y - 5], [x + 4, y - 9], [x + 4, y - 19], [x - 7, y - 19]], 'blue', .85);
        for (let k = 0; k < 3; k++) H.line(R, [[x - 4, y - 9 - k * 3], [x + 1, y - 9 - k * 3]], 'sun', .7);
      }
      const [tx, ty] = H.p(7.66, 10.78, .12);
      shape(H, R, [[tx - 18, ty], [tx + 18, ty], [tx + 13, ty - 7], [tx + 11, ty - 27], [tx - 10, ty - 27], [tx - 12, ty - 7]], 'blue', .88);
      H.line(R, [[tx - 10, ty - 11], [tx + 11, ty - 11]], 'coral', 4);
      const [nx, ny] = H.p(7.2, 4, .06);
      shape(H, R, [[nx - 19, ny - 8], [nx + 16, ny - 2], [nx + 12, ny + 15], [nx - 23, ny + 9]], 'paper', 1);

      for (let k = 0; k < 3; k++) H.line(R, [[nx - 15, ny + 5 + k * 2], [nx + 7, ny + 8 + k * 2]], 'blue', .45);
    },
    live(H, R, t) {
      actor(H, R, 3.9, 5.2, t, 'write', { shirt: ['paper', 1], pants: ['blue', .7], face: 'nw' }, .55, 1.08);
      const [sx, sy] = H.p(3.65, 3.72, 1.15);
      H.line(R, [[sx - 11, sy - 10 + Math.sin(t * 12) * 3], [sx - 11, sy + Math.sin(t * 12) * 3]], 'paper', 1.2);
      oval(H, R, sx + 20 + Math.sin(t * 12) * 3, sy - 23 + Math.cos(t * 12) * 5, 1.7, 1.7, 'sun', .9);
      actor(H, R, 8.12, 5.14, t + .3, 'write', { shirt: ['coral', .7], pants: ['blue', .8], face: 'nw' }, .55, 1.04);
      const [px, py] = H.p(8.64, 3.8, 1.25);
      stroke(H, R, [[px - 26, py + 23], [px - 18, py + 14], [px - 4, py - 9 + Math.sin(t * 2.5) * 3]], 'blue', 1.4);
      H.dot(px - 4, py - 9 + Math.sin(t * 2.5) * 3, 1.5, 'coral');
      actor(H, R, 4.36, 7.62, t + 1.4, 'kneel', { shirt: ['teal', .85], pants: ['blue', .75], face: 'se' }, .05, 1.12);
      const [rx, ry] = H.p(4.61, 8.7, 1.16);
      H.line(R, [[rx - 14, ry - 10], [rx + 3 + Math.sin(t * 4) * 3, ry + 2]], 'blue', 1.5);
      H.dot(rx + 3 + Math.sin(t * 4) * 3, ry + 2, 2, 'sun');
      actor(H, R, 2.06, 10.08, t + .6, 'think', { shirt: ['sun', .7], pants: ['coral', .8], face: 'nw' }, 0, 1.06);
      actor(H, R, 9.85, 6.6, t, 'reach', { shirt: ['paper', 1], pants: ['teal', .9], face: 'se' }, 0, 1.03);
      const [x, y] = H.p(8.67, 8.6, .16);
      const hands = puppet(H, R, x, y, .98, t, 'coral');
      const controlX = x + Math.sin(t * 1.2) * 5;
      H.line(R, [[controlX - 24, y - 124], [controlX + 24, y - 124]], 'sun', 3);
      H.line(R, [[controlX - 8, y - 134], [controlX + 8, y - 115]], 'sun', 2);
      for (let n = 0; n < 3; n++) stroke(H, R, [[controlX - 19 + n * 19, y - 124], [hands[n][0], hands[n][1]]], 'blue', .62);
      creature(H, R, controlX, y - 129, 'mouse', t, .54, 'teal');
      const miniX = x + 45;
      const miniY = y + 13;
      const miniHands = puppet(H, R, miniX, miniY, .34, t + .7, 'sun');
      const barY = hands[2][1] + 1;
      H.line(R, [[miniX - 11, barY], [miniX + 11, barY]], 'blue', 1.5);
      H.line(R, [hands[2], [miniX - 11, barY]], 'sun', 1.1);
      for (let k = 0; k < 3; k++) H.line(R, [[miniX - 9 + k * 9, barY], miniHands[k]], 'blue', .45);
      const [mx, my] = H.p(6.7, 9.7, .04);
      creature(H, R, mx, my, 'mouse', t, .47, 'coral');
      spool(H, R, mx + 21, my - 1, 'sun', .65);
      stroke(H, R, [[mx + 7, my - 12], [mx + 12, my - 17 + Math.sin(t * 3) * 2], [mx + 21, my - 3]], 'blue', .6);
    },
  };
}
