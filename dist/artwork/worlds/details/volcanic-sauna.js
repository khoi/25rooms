import { shape, oval, stroke, box, table, bench, bottle, pool, ripple, steam, cycle, ell, arcPts } from '../common.js';
import { slab, backWalls } from '../../drawings.js';

function pipe(H, R, points, color = 'coral', width = 8) {
  H.line(R, points.map(p => H.p(...p)), 'blue', width + 3, { amp: .1 });
  H.line(R, points.map(p => H.p(...p)), 'paper', width, { amp: .1 });
  H.line(R, points.map(p => H.p(...p)), color, width, { tone: .85, amp: .1 });
  for (const p of points) {
    const [x, y] = H.p(...p);
    oval(H, R, x, y, width * .7, width * .48, 'paper', .75);
  }
}

function towel(H, R, i, j, z, color = 'paper', w = .6, d = .35) {
  box(H, R, i, j, w, d, z, .11, color, .92);
  for (const u of [.12, .2]) H.line(R, [H.p(i + u, j, z + .115), H.p(i + u, j + d, z + .115)], 'coral', 1, { tone: .8 });
}

function bucket(H, R, i, j, z = 0, color = 'coral') {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 9, y - 14], [x + 9, y - 14], [x + 7, y], [x - 7, y]], color, .65);
  oval(H, R, x, y - 14, 9, 4, 'blue', .8);
  H.line(R, arcPts(x, y - 14, 8, 11, Math.PI, Math.PI * 2, 10), 'paper', 1.2);
  for (const dx of [-4, 1, 5]) H.line(R, [[x + dx, y - 10], [x + dx * .8, y - 1]], 'blue', .7);
  H.line(R, [[x - 7, y - 4], [x + 7, y - 4]], 'paper', 1);
}

function stone(H, R, i, j, z, size = 1, color = 'blue') {
  const [x, y] = H.p(i, j, z);
  const p = [[-10, 0], [-13, -7], [-7, -15], [5, -18], [13, -10], [11, -2]].map(([a, b]) => [x + a * size, y + b * size]);
  shape(H, R, p, color, .73);
  H.line(R, [[x - 6 * size, y - 13 * size], [x, y - 8 * size], [x + 9 * size, y - 11 * size]], color === 'blue' ? 'paper' : 'sun', .7, { tone: .6 });
}

function stoneGuest(H, R, i, j, z, t, size = 1, cool = false) {
  const [x, y] = H.p(i, j, z), b = Math.sin(t * 1.4) * 1.4;
  oval(H, R, x - 13 * size, y, 10 * size, 4 * size, 'blue', .95);
  oval(H, R, x + 14 * size, y, 10 * size, 4 * size, 'blue', .95);
  const p = [[-22, -6], [-25, -26], [-17, -42], [-2, -49], [14, -44], [25, -27], [22, -7], [6, -2]].map(([a, q]) => [x + a * size, y + (q + b) * size]);
  shape(H, R, p, cool ? 'teal' : 'blue', cool ? .9 : .95);
  for (const side of [-1, 1]) {
    H.line(R, [[x + side * 7 * size, y - 38 * size], [x + side * 12 * size, y - 31 * size], [x + side * 18 * size, y - 33 * size]], 'coral', 1);
    H.line(R, [[x + side * 5 * size, y - 27 * size], [x + side * 11 * size, y - 26 * size]], 'paper', 1.7);
  }
  stroke(H, R, [[x - 5 * size, y - 16 * size], [x, y - 13 * size], [x + 5 * size, y - 16 * size]], 'paper', .9);
  shape(H, R, [[x - 18 * size, y - 45 * size], [x + 18 * size, y - 45 * size], [x + 11 * size, y - 53 * size], [x - 11 * size, y - 53 * size]], 'paper', 1);
  H.line(R, [[x - 10 * size, y - 49 * size], [x + 11 * size, y - 49 * size]], 'coral', 1.1);
}

function attendant(H, R, i, j, t, role) {
  const [x, y] = H.p(i, j), a = Math.sin(t * 1.65), lean = role === 'brush' ? -4 : 0;
  H.line(R, [[x - 4, y - 19], [x - 5, y - 2], [x - 10, y]], 'blue', 5);
  H.line(R, [[x + 5, y - 19], [x + 8, y - 2], [x + 13, y]], 'blue', 5);
  shape(H, R, [[x - 9 + lean, y - 38], [x + 8 + lean, y - 38], [x + 11, y - 17], [x - 9, y - 17]], 'coral', .9);
  shape(H, R, [[x - 5 + lean, y - 35], [x + 5 + lean, y - 35], [x + 7, y - 18], [x - 5, y - 18]], 'paper', .95);
  oval(H, R, x + lean, y - 46, 7, 8, 'sun', .58);
  shape(H, R, [[x - 8 + lean, y - 49], [x + 8 + lean, y - 49], [x + 6 + lean, y - 55], [x - 6 + lean, y - 55]], 'paper', 1);
  H.dot(x + 3 + lean, y - 46, 1, 'blue');
  let hand;
  if (role === 'shovel') {
    hand = [x - 17, y - 29 - a * 7];
    const tip = [x - 47 + a * 19, y - 29 - a * 23];
    stroke(H, R, [[x + 6, y - 36], [x - 2, y - 29], [hand[0] + 8, hand[1] + 2]], 'sun', 4);
    stroke(H, R, [[x - 7, y - 35], [x - 14, y - 30], hand], 'sun', 4);
    H.line(R, [[x - 5, y - 25], tip], 'paper', 2.3);
    shape(H, R, [[tip[0] - 7, tip[1] - 4], [tip[0] + 6, tip[1] - 4], [tip[0] + 8, tip[1] + 4], [tip[0] - 6, tip[1] + 5]], 'coral', .8);
    oval(H, R, tip[0], tip[1] - 2, 5, 3, 'sun');
  } else if (role === 'pour') {
    hand = [x - 24, y - 42 + a * 6];
    stroke(H, R, [[x - 6, y - 36], [x - 15, y - 39], hand], 'sun', 4);
    stroke(H, R, [[x + 7, y - 35], [x + 13, y - 27], [x + 15, y - 31]], 'sun', 4);
    H.line(R, [[hand[0], hand[1]], [hand[0] - 12, hand[1] - 3]], 'paper', 2);
    oval(H, R, hand[0] - 16, hand[1] - 2, 7, 4, 'coral');
    if (a > -.6) {
      stroke(H, R, [[hand[0] - 21, hand[1]], [hand[0] - 28, hand[1] + 13], [hand[0] - 25, hand[1] + 27]], 'paper', 1.5);
      for (let n = 0; n < 3; n++) H.dot(hand[0] - 25 + n * 3, hand[1] + 27 + (n % 2) * 3, 1.3, 'paper');
    }
  } else {
    hand = [x - 27, y - 58 + a * 4];
    stroke(H, R, [[x - 9, y - 35], [x - 18, y - 47], hand], 'sun', 4);
    stroke(H, R, [[x + 6, y - 34], [x - 4, y - 30], [x - 20, y - 51]], 'sun', 4);
    shape(H, R, [[hand[0] - 8, hand[1] - 3], [hand[0] + 5, hand[1] - 3], [hand[0] + 5, hand[1] + 3], [hand[0] - 8, hand[1] + 3]], 'coral', .7);
    for (let q = 0; q < 5; q++) H.line(R, [[hand[0] - 7 + q * 3, hand[1] + 3], [hand[0] - 8 + q * 3, hand[1] + 7]], 'sun', .8);
  }
}

function gauge(H, R, i, j, z, text) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y, 12, 12, 'coral', .9);
  oval(H, R, x, y, 9, 9, 'paper', 1);
  for (let n = 0; n < 5; n++) {
    const a = Math.PI + n * Math.PI / 4;
    H.line(R, [[x + Math.cos(a) * 6, y + Math.sin(a) * 6], [x + Math.cos(a) * 8, y + Math.sin(a) * 8]], 'blue', .7);
  }
  H.line(R, [[x, y], [x + 5, y - 5]], 'coral', 1.4);
}

export default function enrich(room) {
  return {
    ...room,
    under(H, R) {
      slab(H, R, this, { ink: 'blue', tone: .23 });
      backWalls(H, R, this, 3.2, { ink: 'blue', tone: .86, style: 'brick' });
      for (let i = 0; i < 12; i++) for (let j = 0; j < 12; j++) H.outline(R, H.tile(i, j, 1, 1, .01), 'blue', .6, { tone: .4, amp: .12 });
      for (let k = 0; k < 14; k++) box(H, R, .8 + k * .75, 10.95, .65, .68, .04, .08, 'coral', .46);

      pipe(H, R, [[1.25, 1.15, 2.35], [1.25, 1.15, 2.92], [5.85, 1.15, 2.92], [5.85, 2.55, 2.92], [5.85, 2.55, 1.23]], 'coral', 9);
      pipe(H, R, [[.35, 1.0, 1.0], [.35, 5.75, 1.0], [2.5, 5.75, 1.0], [2.5, 5.75, .25]], 'teal', 5);
      box(H, R, .7, 1.15, 2.4, 1.6, 0, 1.9, 'blue', .38);
      box(H, R, .5, .95, 2.8, 2, 1.9, .2, 'blue', .92);
      for (let k = 0; k < 6; k++) stone(H, R, .9 + k % 3 * .75, 1.2 + Math.floor(k / 3) * .6, 2.13, .66, k % 2 ? 'blue' : 'coral');
      const [fx, fy] = H.p(1.95, 2.78, .64);
      shape(H, R, [[fx - 29, fy + 13], [fx + 28, fy + 13], [fx + 25, fy - 15], [fx - 23, fy - 15]], 'coral', .95);
      oval(H, R, fx, fy, 21, 9, 'sun', .95);
      for (let n = 0; n < 6; n++) H.line(R, [[fx - 23 + n * 9, fy + 12], [fx - 23 + n * 9, fy - 13]], 'blue', 2.3);
      gauge(H, R, 1.35, 2.8, 1.55, 'BAR'); gauge(H, R, 2.4, 2.8, 1.55, 'HEAT');
      box(H, R, .6, 3.9, 1.6, 1.25, 0, .35, 'coral', .7);
      for (let n = 0; n < 8; n++) stone(H, R, .84 + n % 3 * .42, 4.12 + Math.floor(n / 3) * .31, .4, .6, n % 3 ? 'coral' : 'sun');
      const [vx, vy] = H.p(.42, 5.0, 1.02);
      H.outline(R, ell(vx, vy, 12, 12), 'coral', 3);
      H.line(R, [[vx - 10, vy], [vx + 10, vy]], 'coral', 2);
      H.line(R, [[vx, vy - 10], [vx, vy + 10]], 'coral', 2);
      bench(H, R, 3.5, .85, 3.5, 'coral');
      for (let n = 0; n < 3; n++) towel(H, R, 3.75 + n * 1.0, 1.03, .7, 'paper', .7, .4);
      for (let n = 0; n < 5; n++) {
        const i = 7.6 + n * .75;
        box(H, R, i, .5, .68, .78, .05, 2.1, n % 2 ? 'coral' : 'teal', .52);

        H.dot(...H.p(i + .54, 1.3, 1.02), 1.7, 'sun');
        for (let q = 0; q < 3; q++) H.line(R, [H.p(i + .16, 1.3, 1.5 - q * .08), H.p(i + .48, 1.3, 1.5 - q * .08)], 'blue', .8);
        if (n === 3) for (let q = 0; q < 3; q++) towel(H, R, i + .08, .68, 2.15 + q * .11, q === 1 ? 'coral' : 'paper', .52, .48);
      }
      table(H, R, 9.1, 2.4, 2.2, 1.0, .85, 'coral');
      for (let n = 0; n < 5; n++) bottle(H, R, ...H.p(9.32 + n * .37, 2.68, 1.01), n % 2 ? 'teal' : 'sun', .32);
      for (let n = 0; n < 4; n++) {
        const [x, y] = H.p(9.37 + n * .46, 3.06, 1.01);
        shape(H, R, [[x - 3, y], [x + 3, y], [x + 4, y - 8], [x - 4, y - 8]], 'paper', .8);
        oval(H, R, x, y - 8, 4, 2, 'sun');
      }

      box(H, R, 3.45, 3.2, 4.6, 3.8, .0, .35, 'blue', .44);
      pool(H, R, 3.7, 3.4, 4.1, 3.25, 'coral');
      H.tint(H.tile(3.87, 3.57, 3.78, 2.92, .12), 'sun', .38);
      for (const [i, j] of [[4.1, 4.15], [5.6, 3.8], [6.6, 5.25]]) {
        box(H, R, i, j, 1.12, .95, .16, .28, 'blue', .8);
        for (let n = 0; n < 3; n++) stone(H, R, i + .2 + n * .3, j + .45, .47, .48);
      }
      box(H, R, 7.46, 5.83, .7, .66, .12, .24, 'coral', .78);
      for (let n = 0; n < 4; n++) stone(H, R, 7.59 + n % 2 * .3, 5.99 + Math.floor(n / 2) * .24, .36, .36, n % 2 ? 'sun' : 'coral');
      bucket(H, R, 8.15, 4.9); bucket(H, R, 7.85, 6.6, 0, 'teal');
      H.line(R, [H.p(8.12, 5.0, .45), H.p(8.44, 5.2, .72)], 'paper', 2);
      for (let n = 0; n < 4; n++) box(H, R, 1.0, 6.35 + n * .45, 1.75, .34, .1, .1, 'coral', .47);
      bucket(H, R, 1.25, 6.85); bucket(H, R, 2.0, 7.45, 0, 'teal');
      box(H, R, 1.8, 8.65, 2.55, 1.65, 0, .32, 'coral', .62);
      towel(H, R, 2.05, 8.84, .34, 'paper', 1.9, 1.22);
      table(H, R, 5.4, 9.25, 1.55, 1.05, .65, 'teal');
      for (const [i, j] of [[5.55, 9.42], [6.02, 9.4], [6.46, 9.45]]) bottle(H, R, ...H.p(i, j, .82), 'coral', .26);
      for (let n = 0; n < 2; n++) towel(H, R, 5.64, 9.79, .82 + n * .11, 'paper', .72, .35);
      const [bx, by] = H.p(6.58, 9.89, .82);
      oval(H, R, bx, by - 2, 8, 4, 'sun');
      for (let n = 0; n < 6; n++) H.line(R, [[bx - 6 + n * 2, by + 1], [bx - 6 + n * 2, by + 5]], 'blue', .7);
      pool(H, R, 8.3, 7.55, 3.05, 3.1, 'teal');
      for (let n = 0; n < 7; n++) {
        const i = 8.55 + n * .38;
        H.line(R, [H.p(i, 7.56, .16), H.p(i, 7.73, .16)], 'coral', 1.5);
      }
      for (const i of [8.9, 9.7]) pipe(H, R, [[i, 7.45, .2], [i, 7.45, .9], [i, 8.25, .9], [i, 8.25, .15]], 'paper', 2);
      for (const j of [7.85, 8.07, 8.25]) H.line(R, [H.p(8.9, j, .2), H.p(9.7, j, .2)], 'paper', 2);

      bench(H, R, 7.25, 10.88, 3.5, 'coral');
      for (let n = 0; n < 3; n++) towel(H, R, 7.5 + n * 1.06, 11.04, .71, n === 2 ? 'sun' : 'paper');
      for (const [i, j] of [[7.55, 10.48], [8.03, 10.63], [10.66, 6.65], [11.0, 6.76]]) {
        const [x, y] = H.p(i, j, .03);
        oval(H, R, x, y, 7, 3, 'sun', .76);
        H.line(R, [[x - 2, y - 2], [x + 3, y + 1]], 'coral', 1.5);
      }
      box(H, R, .15, 6.5, .62, 3.35, 1.88, .12, 'coral', .75);
      for (let n = 0; n < 6; n++) bottle(H, R, ...H.p(.43, 6.8 + n * .5, 2.05), n % 2 ? 'sun' : 'teal', .3);
      for (let n = 0; n < 4; n++) {
        const j = 6.7 + n * .8;
        H.dot(...H.p(.1, j + .24, 1.64), 2, 'sun', 1, { knock: true });
        shape(H, R, [H.p(.15, j, 1.59), H.p(.15, j + .55, 1.59), H.p(.15, j + .55, .72), H.p(.15, j, .72)], n % 2 ? 'paper' : 'teal', .95);
        for (const z of [.83, .94]) H.line(R, [H.p(.16, j, z), H.p(.16, j + .55, z)], 'coral', 1.4);
      }
      table(H, R, .6, 9.7, .8, .8, .55, 'teal');
      towel(H, R, .66, 9.83, .69, 'paper');
      bucket(H, R, .85, 10.84);
    },
    live(H, R, t) {
      H.at(3.3, 3.4, 0, HH => attendant(HH, R, 3.3, 3.4, t, 'shovel'));
      H.at(5.5, 1.48, .75, HH => {
        stoneGuest(HH, R, 5.5, 1.48, .75, t + 3, .65);
        const [x, y] = HH.p(5.5, 1.48, .75), lift = Math.sin(t * 1.2) * 3;
        stroke(HH, R, [[x + 12, y - 18], [x + 19, y - 13], [x + 23, y - 18 - lift]], 'blue', 4);
        shape(HH, R, [[x + 18, y - 14 - lift], [x + 26, y - 14 - lift], [x + 27, y - 25 - lift], [x + 17, y - 25 - lift]], 'paper', .9);
        oval(HH, R, x + 22, y - 25 - lift, 5, 2, 'sun');
        steam(HH, R, x + 22, y - 27 - lift, t, 1);
      });
      H.at(4.62, 4.95, .5, HH => stoneGuest(HH, R, 4.62, 4.95, .5, t, .91));
      H.at(6.77, 5.87, .47, HH => stoneGuest(HH, R, 6.77, 5.87, .47, t + 2, .72));
      H.at(8.62, 5.53, 0, HH => attendant(HH, R, 8.62, 5.53, t + 1, 'pour'));
      H.at(3.16, 9.34, .35, HH => stoneGuest(HH, R, 3.16, 9.34, .35, t, 1.02));
      H.at(4.33, 9.63, 0, HH => attendant(HH, R, 4.33, 9.63, t, 'brush'));
      H.at(9.9, 9.15, .02, HH => {
        stoneGuest(HH, R, 9.9, 9.15, .02, t + 1, .74, true);
        ripple(HH, R, 9.9, 9.28, t, 31, 'paper');
      });
      for (const [i, j, z, off] of [[4.25, 4.0, .6, 0], [6.8, 5.0, .6, 2], [1.5, 1.8, 2.15, 1]]) {
        const [x, y] = H.p(i, j, z);
        steam(H, R, x, y, t + off, 3);
      }
      const [fx, fy] = H.p(1.95, 2.78, .64);
      H.opacity(.25 + Math.sin(t * 3) * .08, () => H.glow(fx, fy, 43, 28, 'sun', .7));
      for (let n = 0; n < 6; n++) {
        const u = cycle(t + n * .71, 3.7), [x, y] = H.p(4.05 + n % 3 * 1.25, 4.5 + Math.floor(n / 3) * 1.4, .14);
        H.opacity((1 - u) * .7, () => H.outline(R, ell(x, y, 2 + u * 9, 1 + u * 4), 'sun', 1));
      }
      const [x, y] = H.p(5.85, 2.55, 1.65), a = t * .6;
      H.outline(R, ell(x, y, 9, 9), 'coral', 2.2);
      for (let n = 0; n < 3; n++) H.line(R, [[x, y], [x + Math.cos(a + n * Math.PI * 2 / 3) * 8, y + Math.sin(a + n * Math.PI * 2 / 3) * 8]], 'coral', 1.5);
    },
  };
}
