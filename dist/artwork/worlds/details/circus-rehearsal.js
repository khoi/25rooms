import { actor, box, table, shape, oval, stroke, label, plaque, ell, starPts, TAU, inks } from '../common.js';
import { slab } from '../../drawings.js';

function line(H, R, a, b, ink = 'blue', width = 1) {
  H.line(R, [a, b], ink, width, { tone: .85, amp: .13 });
}

function ring(H, R, x, y, radius, ink = 'coral', flat = 1) {
  H.outline(R, ell(x, y, radius, radius * flat, 32), ink, 3, { tone: .85, amp: .13 });
  H.outline(R, ell(x, y, radius + 2, radius * flat + 2, 32), 'blue', .6, { tone: .8 });
}

function mat(H, R, i, j, w, d, ink, z = .02) {
  box(H, R, i, j, w, d, z, .14, ink, .55);
  H.outline(R, H.tile(i + .12, j + .12, w - .24, d - .24, z + .15), 'paper', 1.5);
  for (let x = i + .55; x < i + w; x += .6) line(H, R, H.p(x, j + .13, z + .15), H.p(x, j + d - .13, z + .15), 'blue', .45);
  for (let y = j + .2; y < j + d; y += .3) line(H, R, H.p(i + .03, y, z + .16), H.p(i + .12, y, z + .16), 'paper', .7);
}

function trunk(H, R, i, j, w, ink, text) {
  box(H, R, i, j, w, .8, .1, .65, ink, .65);
  for (const x of [i + .18, i + w - .25]) {
    shape(H, R, H.tile(x, j, .1, .8, .76), 'sun', .8);
    shape(H, R, H.faceI(x, j + .8, .1, .1, .76), 'sun', .8);
  }
  const [x, y] = H.p(i + w / 2, j + .82, .43);
  shape(H, R, [[x - 8, y - 5], [x + 8, y - 5], [x + 8, y + 4], [x - 8, y + 4]], 'paper', .9);
  label(H, text, x, y, 4.5);
  line(H, R, [x - 3, y + 7], [x + 3, y + 7], 'blue', 2);
}

function club(H, R, x, y, ink, angle = 0, size = 1) {
  const p = (a, b) => [x + (a * Math.cos(angle) - b * Math.sin(angle)) * size, y + (a * Math.sin(angle) + b * Math.cos(angle)) * size];
  shape(H, R, [[-2, 3], [2, 3], [2, -7], [5, -14], [4, -23], [0, -27], [-4, -23], [-5, -14], [-2, -7]].map(([a, b]) => p(a, b)), ink, .8);
  line(H, R, p(-3, -9), p(3, -9), 'paper', 2);
}

function spool(H, R, x, y, ink) {
  shape(H, R, [[x - 3, y], [x + 3, y], [x + 3, y - 7], [x - 3, y - 7]], ink, .8);
  oval(H, R, x, y - 7, 4, 1.8, 'paper');
  oval(H, R, x, y, 4, 1.8, 'sun');
}

function drum(H, R, i, j, radius, ink) {
  const [x, y] = H.p(i, j, .12);
  shape(H, R, [[x - radius, y], [x + radius, y], [x + radius, y - 18], [x - radius, y - 18]], ink, .8);
  oval(H, R, x, y, radius, radius * .38, ink, .65);
  for (let a = -radius + 3; a < radius; a += 7) line(H, R, [x + a, y - 17], [x + a + 4, y - 1], 'paper', .8);
  oval(H, R, x, y - 18, radius, radius * .4, 'paper', 1);
  oval(H, R, x, y - 18, radius - 3, radius * .3, 'sun', .2);
}

function musicStand(H, R, i, j) {
  const [x, y] = H.p(i, j);
  line(H, R, [x, y], [x, y - 44], 'blue', 1.5);
  for (const dx of [-9, 9]) line(H, R, [x, y - 8], [x + dx, y + 2], 'blue', 1.4);
  shape(H, R, [[x - 13, y - 51], [x + 12, y - 55], [x + 15, y - 36], [x - 12, y - 33]], 'paper', 1);
  for (let k = 0; k < 4; k++) line(H, R, [x - 9, y - 46 + k * 3], [x + 9, y - 49 + k * 3], 'blue', .4);
  for (const [dx, dy] of [[-6, -42], [0, -44], [6, -39]]) {
    H.dot(x + dx, y + dy, 1.2, 'blue');
    line(H, R, [x + dx + 1, y + dy], [x + dx + 1, y + dy - 6], 'blue', .6);
  }
}

function popcorn(H, R) {
  const i = 9.65, j = 6.2;
  for (const [a, b] of [[i, j + .2], [i + 1.55, j + .2], [i, j + 1.35], [i + 1.55, j + 1.35]]) {
    const [x, y] = H.p(a, b, .2);
    oval(H, R, x, y, 6, 8, 'blue', .8);
    H.dot(x, y, 2, 'sun');
  }
  box(H, R, i, j, 1.55, 1.35, .25, .9, 'coral', .7);
  const [cx, cy] = H.p(i + .75, j + 1.36, .75);
  label(H, 'POP!', cx, cy, 10);
  for (const [a, b] of [[i, j], [i + 1.55, j], [i, j + 1.35], [i + 1.55, j + 1.35]]) line(H, R, H.p(a, b, 1.15), H.p(a, b, 2.65), 'blue', 1.4);
  box(H, R, i - .1, j - .1, 1.75, 1.55, 2.65, .13, 'sun', .9);
  for (let k = 0; k < 7; k++) shape(H, R, H.faceI(i - .1 + k * .25, j + 1.45, .25, 2.46, 2.65), k % 2 ? 'paper' : 'coral', .8);
  box(H, R, i + .16, j + .2, 1.1, .8, 1.15, .55, 'paper', .3);
  for (let k = 0; k < 32; k++) {
    const [x, y] = H.p(i + .23 + (k % 6) * .17, j + .3 + Math.floor(k / 6) * .12, 1.48 + (k % 3) * .045);
    oval(H, R, x, y, 2.5, 2.1, k % 4 ? 'sun' : 'paper', .8);
  }
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(9.8 + k * .36, 7.32, 1.2);
    shape(H, R, [[x - 4, y], [x + 4, y], [x + 6, y - 13], [x - 6, y - 13]], 'paper', 1);
    for (const dx of [-3, 1]) line(H, R, [x + dx, y - 1], [x + dx, y - 12], 'coral', 1.5);
    oval(H, R, x, y - 13, 5, 2, 'sun');
  }
}

export default function enrich(room) {
  return {
    ...room,
    under(H, R) {
      slab(H, R, this, { ink: 'sun', tone: .22 });
      H.speckle(R, H.tile(.05, .05, 11.9, 11.9, .01), 'coral', 800, .15, .8, .25);
      const peak = H.p(5.8, .2, 5.3);
      for (let k = 0; k < 12; k++) shape(H, R, [peak, H.p(k, .25, .02), H.p(k + 1, .25, .02)], k % 2 ? 'coral' : 'paper', .78);
      for (const i of [.35, 11.6]) {
        box(H, R, i, .8, .12, .12, 0, 4, 'blue', .8);
        shape(H, R, [H.p(i, .8, 4), H.p(i + .35, .8, 3.8), H.p(i, .8, 3.6)], 'sun', .9);
        line(H, R, H.p(i, .8, 3.8), H.p(i, 3, 0), 'blue', 1);
        box(H, R, i - .08, 2.85, .28, .3, 0, .15, 'coral');
      }
      plaque(H, R, 5.8, .1, 4.6, 'PRACTICE MAKES MAGIC', 'sun', 148);
      const points = [[.5, 1.1, 3.65], [3.4, 1.1, 3.1], [7.7, 1.1, 3.1], [11.6, 1.1, 3.65]].map(p => H.p(...p));
      stroke(H, R, points, 'blue', 1);
      for (let k = 0; k < 18; k++) {
        const i = .8 + k * .59, z = 3.05 + Math.abs(i - 6) * .095;
        const [x, y] = H.p(i, 1.1, z);
        shape(H, R, [[x - 6, y], [x + 6, y + 3], [x + 1, y + 14]], inks[k % 3], .85);
      }
      const [rx, ry] = H.p(6, 6.8, .025);
      oval(H, R, rx, ry, 111, 51, 'coral', .35);
      H.outline(R, ell(rx, ry, 105, 47), 'sun', 3);
      for (let k = 0; k < 16; k++) {
        const a = k * TAU / 16;
        shape(H, R, starPts(rx + Math.cos(a) * 105, ry + Math.sin(a) * 47, 3.5, 1.6, 5), 'paper', 1);
      }
      mat(H, R, 3.8, 2.55, 3.7, 1.75, 'teal');
      for (const [i, j] of [[3.75, 2.4], [7.65, 2.4], [3.75, 4.5], [7.65, 4.5]]) {
        line(H, R, H.p(i, j), H.p(i, j, .9), 'blue', 2);
        H.dot(...H.p(i, j, .9), 2.5, 'sun');
      }
      const net = (i, j) => H.p(i, j, .4 + .45 * Math.pow((i - 5.7) / 1.95, 2) + .08 * Math.pow((j - 3.45) / 1.05, 2));
      for (let i = 3.75; i <= 7.7; i += .26) stroke(H, R, [net(i, 2.4), net(i, 3.45), net(i, 4.5)], 'blue', .58, .6);
      for (let j = 2.4; j <= 4.51; j += .23) stroke(H, R, [net(3.75, j), net(5.7, j), net(7.65, j)], 'blue', .58, .6);
      for (const j of [2.4, 4.5]) stroke(H, R, [net(3.75, j), net(5.7, j), net(7.65, j)], 'coral', 2);
      line(H, R, H.p(3.8, 2.1), H.p(3.8, 2.1, 4.35), 'blue', 3);
      line(H, R, H.p(7.6, 2.1), H.p(7.6, 2.1, 4.35), 'blue', 3);
      line(H, R, H.p(3.8, 2.1, 4.35), H.p(7.6, 2.1, 4.35), 'blue', 3);
      for (const i of [3.15, 3.62]) line(H, R, H.p(i, 3.5), H.p(i, 2.15, 3.3), 'coral', 2.5);
      for (let k = 0; k < 10; k++) line(H, R, H.p(3.15, 3.5 - k * .135, k * .33), H.p(3.62, 3.5 - k * .135, k * .33), 'blue', 1.2);
      line(H, R, H.p(.65, 1.1), H.p(.65, 1.1, 2.65), 'blue', 2);
      line(H, R, H.p(2.9, 1.1), H.p(2.9, 1.1, 2.65), 'blue', 2);
      line(H, R, H.p(.65, 1.1, 2.65), H.p(2.9, 1.1, 2.65), 'blue', 2);
      for (let k = 0; k < 4; k++) {
        const [x, y] = H.p(.95 + k * .55, 1.15, 2.48);
        line(H, R, [x, y - 7], [x, y], 'blue', .65);
        shape(H, R, [[x - 8, y + 5], [x - 3, y], [x + 3, y], [x + 9, y + 5], [x + 6, y + 13], [x + 5, y + 29], [x - 5, y + 29], [x - 6, y + 12]], inks[k], .75);
        for (let n = 0; n < 3; n++) H.dot(x, y + 11 + n * 5, 1, 'sun');
      }
      table(H, R, .65, 2.65, 2.15, 1.1, .88, 'teal');
      const [sx, sy] = H.p(1.45, 3.1, 1.03);
      shape(H, R, [[sx - 12, sy], [sx + 13, sy], [sx + 13, sy - 5], [sx + 1, sy - 5], [sx + 1, sy - 15], [sx - 12, sy - 15]], 'blue', .8);
      oval(H, R, sx - 12, sy - 11, 5, 6, 'coral');
      line(H, R, [sx + 9, sy - 12], [sx + 9, sy - 2], 'blue', 1);
      shape(H, R, H.tile(1.8, 2.86, .7, .7, 1.025), 'coral', .65);
      for (let k = 0; k < 4; k++) spool(H, R, ...H.p(.85 + k * .3, 2.77, 1.05), inks[k]);
      const [scx, scy] = H.p(2.4, 3.22, 1.05);
      oval(H, R, scx - 3, scy, 3, 2, 'paper'); oval(H, R, scx + 3, scy, 3, 2, 'paper');
      line(H, R, [scx - 2, scy - 1], [scx + 4, scy - 11], 'blue', .7);
      line(H, R, [scx + 2, scy - 1], [scx - 4, scy - 11], 'blue', .7);
      trunk(H, R, .75, 4.3, 1.8, 'coral', 'COSTUMES');
      const [hx, hy] = H.p(1.35, 4.6, .9);
      oval(H, R, hx, hy, 12, 4, 'blue');
      shape(H, R, [[hx - 7, hy], [hx + 7, hy], [hx + 8, hy - 15], [hx - 8, hy - 15]], 'blue', .9);
      line(H, R, [hx - 7, hy - 4], [hx + 7, hy - 4], 'coral', 3);
      for (const [i, j, radius, ink] of [[8.6, 2.1, 18, 'coral'], [9.7, 2.4, 11, 'teal'], [10.45, 2.8, 9, 'coral']]) drum(H, R, i, j, radius, ink);
      for (const [i, j] of [[8.8, 1.1], [10.8, 2]]) {
        const [x, y] = H.p(i, j);
        line(H, R, [x, y], [x, y - 38], 'blue', 1.1);
        line(H, R, [x - 7, y + 2], [x, y - 5], 'blue'); line(H, R, [x + 7, y + 2], [x, y - 5], 'blue');
        oval(H, R, x, y - 38, 17, 5, 'sun', .85);
        H.dot(x, y - 38, 2, 'blue');
      }
      musicStand(H, R, 10.5, 3.85);
      trunk(H, R, 9.2, .65, 2, 'blue', 'BRASS');
      const [tx, ty] = H.p(10.1, 1.1, 1);
      stroke(H, R, [[tx - 17, ty - 2], [tx + 8, ty - 2], [tx + 10, ty - 10], [tx - 3, ty - 11], [tx - 5, ty - 2]], 'sun', 4);
      shape(H, R, [[tx + 9, ty - 10], [tx + 20, ty - 17], [tx + 20, ty - 3]], 'sun', .9);
      for (let k = 0; k < 3; k++) line(H, R, [tx - 5 + k * 5, ty - 3], [tx - 5 + k * 5, ty - 9], 'blue', 1);
      trunk(H, R, .65, 6.45, 2, 'teal', 'PROPS');
      for (let k = 0; k < 5; k++) club(H, R, ...H.p(.82 + k * .34, 6.65, .98), inks[k % 3], (k - 2) * .17, .67);
      box(H, R, .75, 8, 1.55, .75, .15, .7, 'coral', .6);
      for (const i of [.8, 2.1]) {
        const [x, y] = H.p(i, 8.65, .15); oval(H, R, x, y, 5, 5, 'blue');
      }
      for (let k = 0; k < 8; k++) oval(H, R, ...H.p(.95 + k % 4 * .32, 8.13 + Math.floor(k / 4) * .26, 1), 5, 5, inks[k % 3], .8);
      for (let k = 0; k < 3; k++) ring(H, R, ...H.p(.75 + k * .33, 9.95, .45), 18 - k * 2, inks[k], .9);
      for (let k = 0; k < 3; k++) {
        const [x, y] = H.p(2.35, 9.9, .04 + k * .07);
        H.outline(R, ell(x, y, 15 - k * 2, 6 - k * .8), 'blue', 1.3);
      }
      line(H, R, H.p(2.7, 9.8), H.p(3.2, 10.45), 'blue', 1.2);
      mat(H, R, 4.25, 9.05, 3.8, 1.7, 'teal');
      for (let k = 0; k < 3; k++) mat(H, R, 8.9, 9.25, 1.7, .8, inks[k], .02 + k * .17);
      for (const [i, j] of [[3.8, 8.8], [8.4, 10.6]]) {
        const [x, y] = H.p(i, j);
        oval(H, R, x, y, 8, 3, 'coral');
        shape(H, R, [[x - 6, y], [x + 6, y], [x, y - 18]], 'sun', .8);
        line(H, R, [x - 3, y - 8], [x + 3, y - 8], 'coral', 2);
      }
      popcorn(H, R);
      table(H, R, 9.4, 8.3, 1.8, .7, .65, 'sun');
      for (let k = 0; k < 4; k++) {
        const [x, y] = H.p(9.65 + k * .36, 8.6, .79);
        oval(H, R, x, y - 3, 4, 3, 'paper');
        line(H, R, [x - 3, y - 3], [x - 3, y - 9], 'coral', 1.2);
        line(H, R, [x + 3, y - 3], [x + 3, y - 9], 'coral', 1.2);
        oval(H, R, x, y - 9, 4, 2, 'sun');
      }
      box(H, R, 7.9, 5.05, .9, .75, .01, .55, 'sun', .7);
      const [bx, by] = H.p(8.35, 5.45, .58);
      oval(H, R, bx, by - 3, 9, 4, 'paper');
      label(H, 'CHALK', bx, by + 10, 5);
      const [px, py] = H.p(3, 10.9, .03);
      shape(H, R, [[px - 13, py - 4], [px + 11, py - 7], [px + 14, py + 8], [px - 10, py + 10]], 'paper');
      label(H, 'RUN 03', px, py, 5);
    },
    live(H, R, t) {
      const swing = Math.sin(t * .72) * .48;
      const [ax, ay] = H.p(5.7 + swing, 2.75, 2.72 + Math.abs(swing) * .18);
      for (const dx of [-15, 15]) line(H, R, [ax + dx, ay], H.p(5.7 + dx / 32, 2.1, 4.32), 'blue', 1.3);
      line(H, R, [ax - 20, ay], [ax + 20, ay], 'coral', 4);
      stroke(H, R, [[ax - 12, ay], [ax - 9, ay + 16], [ax - 5, ay + 25]], 'blue', 4);
      stroke(H, R, [[ax + 12, ay], [ax + 9, ay + 16], [ax + 5, ay + 25]], 'blue', 4);
      shape(H, R, [[ax - 6, ay + 25], [ax + 6, ay + 25], [ax + 7, ay + 39], [ax - 6, ay + 39]], 'coral', .85);
      oval(H, R, ax, ay + 18, 5, 6, 'paper');
      oval(H, R, ax - 1, ay + 13, 5, 2, 'blue');
      H.dot(ax + 2, ay + 18, .8, 'blue');
      stroke(H, R, [[ax - 3, ay + 39], [ax - 14, ay + 49], [ax - 28, ay + 45 + swing * 10]], 'teal', 4);
      stroke(H, R, [[ax + 3, ay + 39], [ax + 14, ay + 48], [ax + 25, ay + 41 - swing * 9]], 'teal', 4);
      actor(H, R, 2.5, 3.82, t, 'write', { shirt: ['coral', .8] }, 0, .91);
      actor(H, R, 9.8, 1.7, t, 'hold', { shirt: ['teal', .8] }, 0, .95);
      const [dx, dy] = H.p(9.6, 2.05, .85);
      line(H, R, [dx - 5, dy - 12], [dx - 24, dy + Math.sin(t * 8) * 6], 'blue', 1.5);
      line(H, R, [dx + 5, dy - 14], [dx + 20, dy + Math.cos(t * 8) * 6], 'blue', 1.5);
      actor(H, R, 3.9, 6.4, t, 'hold', { shirt: ['coral', .8] }, 0, 1.02);
      const [jx, jy] = H.p(3.9, 6.4, 1.7);
      for (let k = 0; k < 3; k++) {
        const a = t * 2.4 + k * TAU / 3;
        club(H, R, jx + Math.cos(a) * 25, jy - 6 - Math.abs(Math.sin(a)) * 31, inks[k], a, .6);
      }
      const ui = 6.55 + Math.sin(t * .65) * .45, uj = 6.6;
      const [ux, uy] = H.p(ui, uj, .04);
      ring(H, R, ux, uy - 13, 12, 'blue', 1);
      for (let k = 0; k < 6; k++) {
        const a = t * 2 + k * TAU / 6;
        line(H, R, [ux, uy - 13], [ux + Math.cos(a) * 11, uy - 13 + Math.sin(a) * 11], 'blue', .6);
      }
      line(H, R, [ux, uy - 13], [ux, uy - 34], 'coral', 3);
      oval(H, R, ux, uy - 35, 8, 3, 'blue');
      actor(H, R, ui, uj, t, 'sit', { shirt: ['teal', .8] }, 1.06, .92);
      const pedal = Math.sin(t * 2) * 7;
      line(H, R, [ux - 1, uy - 13], [ux - 7, uy - 13 + pedal], 'blue', 1.6);
      line(H, R, [ux - 10, uy - 13 + pedal], [ux - 4, uy - 13 + pedal], 'coral', 2.8);
      actor(H, R, 8.55, 7.8, t, 'point', { shirt: ['sun', .9] }, 0, .85);
      actor(H, R, 10.95, 5.55, t, 'hold', { shirt: ['coral', .8] }, 0, .92);
      actor(H, R, 2.85, 8.85, t, 'stretch', { shirt: ['teal', .85] }, 0, .85);
      const [hrx, hry] = H.p(2.85, 8.85, .75);
      ring(H, R, hrx + Math.sin(t * 3) * 3, hry, 20, 'coral', .22 + Math.abs(Math.sin(t * 3)) * .08);
      const [hx, hy] = H.p(5.9, 9.95, .18);
      const sway = Math.sin(t * 1.5) * 4;
      stroke(H, R, [[hx - 15, hy], [hx - 9, hy - 11], [hx - 5, hy - 19]], 'blue', 4);
      stroke(H, R, [[hx + 15, hy], [hx + 9, hy - 11], [hx + 5, hy - 19]], 'blue', 4);
      oval(H, R, hx, hy - 14, 5, 6, 'paper');
      shape(H, R, [[hx - 6, hy - 20], [hx + 6, hy - 20], [hx + 5 + sway, hy - 36], [hx - 5 + sway, hy - 36]], 'coral', .9);
      stroke(H, R, [[hx - 3 + sway, hy - 35], [hx - 13 + sway, hy - 47], [hx - 23 + sway, hy - 49]], 'teal', 4.5);
      stroke(H, R, [[hx + 3 + sway, hy - 35], [hx + 13 + sway, hy - 47], [hx + 25 + sway, hy - 44]], 'teal', 4.5);
      actor(H, R, 7.65, 10.85, t, 'kneel', { shirt: ['sun', .85] }, 0, .9);
    },
  };
}
