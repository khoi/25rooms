import { world, shape, oval, stroke, label, plaque, box, table, actor, bottle, ell, arcPts, cycle, TAU } from '../common.js';

function crystal(H, R, i, j, z, h, w, ink = 'teal', pulse = 0) {
  const [x, y] = H.p(i, j, z);
  const p = [[x - w, y - 3], [x - w * .9, y - h * .76], [x - w * .1, y - h], [x + w, y - h * .72], [x + w * .8, y - 2], [x, y + 4]];
  shape(H, R, p, ink, .7 + pulse * .2, .85);
  H.tint([p[2], p[3], p[4], p[5], [x, y - h * .65]], 'blue', .3);
  H.fill([p[1], p[2], [x, y - h * .65], p[5]], 'paper', .2);
  H.line(R, [[x - w * .58, y - 8], [x - w * .55, y - h * .72], [x - w * .1, y - h + 6]], 'paper', 1.1, { tone: .9, amp: .08 });
  H.line(R, [[x, y - h * .65], [x + w * .8, y - 2]], ink, .7);
}

function stone(H, R, i, j, s, ink = 'blue') {
  const [x, y] = H.p(i, j, .04);
  shape(H, R, [[x - s, y], [x - s * .75, y - s * .55], [x + s * .2, y - s * .7], [x + s, y - s * .2], [x + s * .6, y + s * .3]], ink, .7, .7);
  H.line(R, [[x - s * .75, y - s * .55], [x, y - s * .15], [x + s, y - s * .2]], 'paper', .65, { tone: .35 });
}

function crate(H, R, i, j, z = 0, ink = 'coral') {
  box(H, R, i, j, .85, .72, z, .56, ink, .62);
  for (const n of [.15, .4]) H.line(R, [H.p(i, j + .73, z + n), H.p(i + .85, j + .73, z + n)], 'blue', .8);
  H.line(R, [H.p(i + .05, j + .74, z + .04), H.p(i + .78, j + .74, z + .49)], 'sun', 2.4);
  const [x, y] = H.p(i + .55, j + .73, z + .3);
  label(H, 'ORE', x, y, 5);
}

function rail(H, R, i, j, w, d, z, h = .7) {
  const n = Math.ceil((w + d) / .65);
  for (let k = 0; k <= n; k++) {
    const a = k / n;
    H.line(R, [H.p(i + w * a, j + d * a, z), H.p(i + w * a, j + d * a, z + h)], 'coral', 2.5, { amp: .1 });
  }
  for (const hh of [h * .42, h]) H.line(R, [H.p(i, j, z + hh), H.p(i + w, j + d, z + hh)], 'sun', 1.8, { amp: .15 });
}

function dial(H, R, x, y, r, value = .3) {
  oval(H, R, x, y, r, r, 'paper', 1);
  for (let k = 0; k < 7; k++) {
    const a = Math.PI * (.85 + k * .22);
    H.line(R, [[x + Math.cos(a) * r * .68, y + Math.sin(a) * r * .68], [x + Math.cos(a) * r * .85, y + Math.sin(a) * r * .85]], 'blue', .6);
  }
  const a = Math.PI * (.85 + value * 1.32);
  H.line(R, [[x, y], [x + Math.cos(a) * r * .68, y + Math.sin(a) * r * .68]], 'coral', 1.3);
  H.dot(x, y, 1.5, 'blue');
}

function miner(H, R, i, j, t, clip, ink = 'sun', z = 0, prop) {
  actor(H, R, i, j, t, clip, {
    shirt: [ink, .86], pants: ['blue', .8], skin: ['coral', .4], hairStyle: 'short',
    prop: (HH, RR, p) => {
      const [x, y] = p.head;
      shape(HH, RR, [[x - 8, y - 2], [x - 7, y - 8], [x - 3, y - 11], [x + 4, y - 11], [x + 8, y - 6], [x + 9, y - 2]], 'sun', .95, .7);
      HH.line(RR, [[x - 10, y - 2], [x + 10, y - 2]], 'blue', 1.4);
      HH.dot(x + 4, y - 6, 2.8, 'paper', 1);
      if (prop) prop(HH, RR, p);
    },
  }, z, .95);
}

function fork(H, R, x, y, s = 1) {
  H.line(R, [[x, y], [x, y - 10 * s], [x - 5 * s, y - 15 * s], [x - 5 * s, y - 29 * s]], 'blue', 2);
  H.line(R, [[x, y - 10 * s], [x + 5 * s, y - 15 * s], [x + 5 * s, y - 29 * s]], 'paper', 2);
}

function cart(H, R, i, j) {
  for (const a of [.15, 1.1]) for (const b of [.15, .95]) {
    const [x, y] = H.p(i + a, j + b, .18);
    oval(H, R, x, y, 6, 7, 'blue', .9);
    H.dot(x, y, 2.2, 'sun', 1);
  }
  box(H, R, i, j, 1.35, 1.1, .28, .55, 'teal', .7);
  H.fill(H.tile(i + .08, j + .08, 1.18, .93, .84), 'blue', .55);
  for (let k = 0; k < 7; k++) crystal(H, R, i + .25 + k % 3 * .37, j + .23 + Math.floor(k / 3) * .28, .88, 15 + k % 3 * 7, 4.5, k % 2 ? 'coral' : 'sun');
  for (const a of [.18, .68, 1.15]) H.line(R, [H.p(i + a, j + 1.11, .35), H.p(i + a, j + 1.11, .8)], 'blue', 1.1);
  H.line(R, [H.p(i + .2, j + 1.1, .65), H.p(i + .2, j + 1.5, .65), H.p(i + 1.1, j + 1.5, .65), H.p(i + 1.1, j + 1.1, .65)], 'sun', 2.3);
}

export default function enrich(room) {
  const rich = world(room.id, room.title, { floor: 'blue', tone: .86, wall: 'blue', wallTone: .92, height: 3.7 }, (H, R) => {
    for (const side of [0, 1]) for (let k = 0; k < 9; k++) {
      const p = .25 + k * 1.35;
      const pts = [[p, .1, 3.65], [p + .3, .1, 2.8], [p + .02, .1, 2.5], [p + .45, .1, 1.5], [p + .25, .1, .45]].map(([i, j, z]) => side ? H.p(j, i, z) : H.p(i, j, z));
      H.line(R, pts, 'paper', .85, { tone: .24, amp: .8 });
    }
    const tunnel = [[8.3, .04, 0], [8.3, .04, 2.15], [8.65, .04, 2.85], [10.7, .04, 2.85], [11.2, .04, 2.1], [11.2, .04, 0]].map(p => H.p(...p));
    shape(H, R, tunnel, 'blue', 1);
    for (const i of [8.25, 11.03]) box(H, R, i, .13, .24, .26, 0, 2.75, 'coral', .7);
    box(H, R, 8.23, .1, 3.08, .29, 2.66, .24, 'sun', .65);
    for (const i of [8.4, 10.9]) H.line(R, [H.p(i, .12, 2.45), H.p(i + (i < 9 ? .5 : -.5), .12, 2.9)], 'coral', 4);
    plaque(H, R, 9.7, .06, 3.25, 'SEAM 04', 'sun', 65);
    for (let k = 0; k < 4; k++) crystal(H, R, 8.9 + k * .43, .4, 0, 23 + k % 2 * 14, 6, 'teal');
    box(H, R, 1.4, 1.15, 4.1, 1.05, 1.12, .16, 'coral', .5);
    for (let i = 1.45; i < 5.45; i += .38) H.line(R, [H.p(i, 1.2, 1.29), H.p(i, 2.18, 1.29)], 'blue', .8);
    rail(H, R, 1.45, 1.17, 4, 0, 1.29, .62);
    for (const i of [1.5, 5.25]) box(H, R, i, 1.3, .15, .17, 0, 1.12, 'blue', .85);
    for (const i of [5.38, 5.96]) H.line(R, [H.p(i, 2.1, 1.3), H.p(i, 3.5, .02)], 'sun', 3);
    for (let k = 0; k < 7; k++) H.line(R, [H.p(5.38, 2.1 + k * .22, 1.3 - k * .2), H.p(5.96, 2.1 + k * .22, 1.3 - k * .2)], 'coral', 2);
    for (const i of [1.45, 3.3]) box(H, R, i, 2.45, .18, .2, 0, 3.45, 'coral', .68);
    box(H, R, 1.3, 2.44, 2.4, .25, 3.35, .18, 'sun', .66);
    H.line(R, [H.p(1.55, 2.48, 2.9), H.p(2.2, 2.48, 3.42)], 'coral', 4);
    H.line(R, [H.p(3.3, 2.48, 2.9), H.p(2.8, 2.48, 3.42)], 'coral', 4);
    const pulley = H.p(2.45, 2.56, 3.36);
    oval(H, R, ...pulley, 11, 11, 'blue', .8);
    oval(H, R, ...pulley, 7, 7, 'sun', .65);
    box(H, R, 3.65, 1.4, .85, .65, 1.28, .45, 'teal', .6);
    const [wx, wy] = H.p(4.02, 2.07, 1.82);
    oval(H, R, wx, wy, 15, 10, 'coral', .7);
    for (let k = 0; k < 6; k++) H.line(R, [[wx - 9 + k * 3, wy - 7], [wx - 9 + k * 3, wy + 7]], 'blue', .8);
    stroke(H, R, [pulley, [wx - 7, wy - 13], [wx, wy]], 'sun', 1.4);
    plaque(H, R, 2.5, 2.6, 3.72, 'KEEP SINGING', 'paper', 86);
    for (const [i, j, h, w, ink] of [[.6, .8, 77, 13, 'teal'], [.6, 1.7, 55, 12, 'coral'], [.7, 3.9, 72, 13, 'sun'], [.45, 5.1, 93, 17, 'teal'], [1, 4.9, 47, 11, 'coral'], [.65, 6.3, 43, 11, 'sun'], [5.7, .65, 85, 14, 'teal'], [6.4, .7, 52, 12, 'coral'], [7.1, .65, 77, 13, 'sun'], [7.6, 1, 43, 10, 'teal'], [.6, 10.6, 51, 12, 'teal'], [1.1, 10.9, 35, 10, 'coral'], [11.3, 2.1, 54, 10, 'sun'], [11.4, 3.1, 33, 9, 'coral']]) crystal(H, R, i, j, 0, h, w, ink);
    const rift = [[4.5, 4.3], [5, 5.7], [4.6, 7], [5.5, 8.8], [5.2, 11.8], [6.4, 11.8], [6.6, 8.6], [5.8, 6.9], [6.2, 5.2], [5.6, 4]].map(p => H.p(...p, .015));
    shape(H, R, rift, 'blue', .98);
    stroke(H, R, [[5.2, 4.9], [5.5, 6.1], [5.2, 7.2], [6, 8.9], [5.9, 11.7]].map(p => H.p(...p, .02)), 'teal', 3, .8);
    for (let k = 0; k < 8; k++) {
      const i = 4.1 + k * .4;
      box(H, R, i, 7.55, .38, 1.2, .13, .12, k % 3 ? 'coral' : 'sun', .62);
    }
    rail(H, R, 4.12, 7.6, 3.1, 0, .26, .64);
    for (const [i, j, s] of [[4.3, 5.1, 12], [4.3, 6.4, 9], [6.6, 7.2, 10], [6.8, 10.5, 12], [4.7, 11.3, 8], [7.1, 2.6, 13], [8.1, 2, 7]]) stone(H, R, i, j, s);
    for (let j = 1.3; j < 11.7; j += .56) box(H, R, 9.2, j, 1.72, .13, .01, .08, 'coral', .5);
    for (const i of [9.42, 10.67]) H.line(R, [H.p(i, 1.1, .12), H.p(i, 11.7, .12)], 'paper', 2, { tone: .78 });
    for (const i of [9.3, 10.7]) box(H, R, i, 11.48, .2, .2, .03, .42, 'sun', .75);
    box(H, R, 9.25, 11.48, 1.65, .2, .34, .13, 'coral', .8);
    table(H, R, 1.45, 7.8, 2.7, 1.22, .86, 'sun');
    for (let k = 0; k < 6; k++) {
      const i = 1.58 + k % 3 * .78, j = 7.95 + Math.floor(k / 3) * .47;
      box(H, R, i, j, .65, .37, 1, .09, 'paper', 1);
      H.tint(H.tile(i + .04, j + .04, .56, .28, 1.1), 'blue', .15);
      for (let n = 0; n < 3; n++) crystal(H, R, i + .14 + n * .18, j + .19, 1.1, 8 + n * 3, 2.7, ['teal', 'coral', 'sun'][k % 3]);
      const [x, y] = H.p(i + .3, j + .37, 1.05);
      label(H, String(101 + k), x, y + 2, 4.7);
    }
    plaque(H, R, 3.4, 9.04, .85, 'SORT BY SONG', 'paper', 89);
    crate(H, R, 1.55, 9.5);
    crate(H, R, 2.45, 9.6, 0, 'teal');
    crate(H, R, 1.63, 9.53, .57, 'sun');
    table(H, R, 1.25, 5.25, 2.28, .94, .9, 'teal');
    box(H, R, 1.52, 5.43, .95, .59, 1.02, .24, 'coral', .68);
    const [px, py] = H.p(2.02, 5.93, 1.65);
    oval(H, R, px, py, 18, 18, 'paper', 1);
    oval(H, R, px, py, 12, 12, 'teal', .65);
    H.dot(px, py, 4, 'sun', .9);
    box(H, R, 2.78, 5.37, .45, .45, 1.02, .11, 'sun', .7);
    for (let n = 0; n < 4; n++) crystal(H, R, 2.83 + n % 2 * .17, 5.51 + Math.floor(n / 2) * .15, 1.13, 10, 3, 'teal');
    bottle(H, R, ...H.p(1.43, 5.5, 1.08), 'coral', .4);
    const [bx, by] = H.p(1.2, 6.4, .05);
    oval(H, R, bx, by - 7, 12, 8, 'coral', .75);
    oval(H, R, bx, by - 13, 12, 5, 'teal', .5);
    H.line(R, arcPts(bx, by - 14, 10, 10, Math.PI, TAU, 16), 'paper', 1.1);
    plaque(H, R, 2.4, 5.28, 2.2, 'POLISH + RINSE', 'paper', 88);
    table(H, R, 7.2, 3.55, 3.14, 1.23, .95, 'coral');
    box(H, R, 7.4, 3.68, .75, .62, 1.08, .43, 'teal', .76);
    const [mx, my] = H.p(7.79, 4.31, 1.4);
    dial(H, R, mx, my, 11, .42);
    label(H, 'Hz', mx, my + 16, 5.5);
    for (let k = 0; k < 3; k++) fork(H, R, ...H.p(8.5 + k * .43, 3.98, 1.1), .7 + k * .17);
    box(H, R, 8.36, 3.81, 1.25, .43, 1.08, .09, 'sun', .65);
    crystal(H, R, 9.93, 4.04, 1.08, 25, 7, 'coral');
    const page = H.tile(8.65, 4.26, .74, .45, 1.1);
    shape(H, R, page, 'paper', 1, .5);
    for (let n = 0; n < 4; n++) H.line(R, [H.p(8.73, 4.34 + n * .075, 1.11), H.p(9.24, 4.34 + n * .075, 1.11)], 'blue', .55);
    stroke(H, R, [H.p(7.5, 4.1, 1.1), H.p(6.75, 4.85, .12), H.p(6.45, 5.2, .45)], 'sun', 1.25);
    plaque(H, R, 8.65, 3.52, 2.7, 'RESONANCE LAB', 'paper', 100);
    for (let k = 0; k < 6; k++) {
      const i = 6.8 + k * .53;
      H.line(R, [H.p(i, .6, 3.35), H.p(i, .6, 2.48 - k % 2 * .22)], 'sun', .8);
      crystal(H, R, i, .6, 2.08 - k % 2 * .22, 24 + k % 3 * 4, 4.5, ['coral', 'teal', 'sun'][k % 3]);
    }
    for (const i of [7.5, 8.25]) H.line(R, [H.p(7.88, 6.07, 1.36), H.p(i, 6.42, .02)], 'sun', 1.8);
    H.line(R, [H.p(7.88, 6.07, 1.36), H.p(7.82, 5.66, .02)], 'sun', 1.8);
    const [sx, sy] = H.p(7.88, 6.07, 1.4);
    shape(H, R, [[sx - 15, sy - 6], [sx + 13, sy - 6], [sx + 13, sy + 3], [sx - 15, sy + 3]], 'teal', .75);
    oval(H, R, sx - 15, sy - 1, 4, 7, 'paper', 1);
    for (let n = 0; n < 4; n++) {
      const [x, y] = H.p(3.1, 10.9, .04);
      H.outline(R, ell(x, y, 12 - n * 2, 6 - n * .8), 'sun', 1.3);
    }
    box(H, R, 7.4, 9.5, 1.25, .85, 0, .48, 'coral', .7);
    const map = H.tile(7.43, 9.54, 1.18, .77, .5);
    shape(H, R, map, 'paper', 1, .65);
    stroke(H, R, [[7.55, 9.68], [7.85, 9.74], [7.96, 10.03], [8.33, 10.08], [8.47, 9.8]].map(p => H.p(...p, .52)), 'teal', 1);
    for (const [i, j] of [[7.74, 9.83], [8.17, 9.69], [8.38, 10.12]]) {
      const [x, y] = H.p(i, j, .53);
      H.line(R, [[x - 2, y - 2], [x + 2, y + 2]], 'coral', 1);
      H.line(R, [[x + 2, y - 2], [x - 2, y + 2]], 'coral', 1);
    }
    bottle(H, R, ...H.p(7.2, 10.1, .05), 'teal', .48);
    crate(H, R, 10.95, 7.2, 0, 'sun');
    crate(H, R, 10.91, 8.2, 0, 'coral');
    crate(H, R, 10.92, 8.2, .56, 'teal');
    plaque(H, R, 11.45, 7.5, 1.75, 'FRAGILE', 'paper', 53);
    for (const [i, j, n] of [[.85, 8.7, 'A'], [6.9, 10.8, 'B'], [6.8, 2.1, 'C']]) {
      H.line(R, [H.p(i, j, 0), H.p(i, j, .55)], 'sun', 1.1);
      const [x, y] = H.p(i, j, .63);
      shape(H, R, [[x - 8, y - 5], [x + 8, y - 5], [x + 8, y + 5], [x - 8, y + 5]], 'paper', 1, .6);
      label(H, n, x, y, 6);
    }
  }, (H, R, t) => {
    const pulse = .5 + Math.sin(t * 1.5) * .5;
    H.at(5.75, 5.15, 0, HH => {
      const [x, y] = HH.p(5.75, 5.15, .08);
      HH.glow(x, y - 45, 90, 69, 'teal', .2 + .13 * pulse);
      crystal(HH, R, 5.48, 5.35, .08, 60, 13, 'coral');
      crystal(HH, R, 5.85, 5.06, .08, 110, 24, 'teal', pulse);
      crystal(HH, R, 6.25, 5.42, .08, 45, 12, 'sun');
      for (let k = 0; k < 3; k++) {
        const u = cycle(t + k * 1.5, 4.5);
        HH.opacity((1 - u) * .65, () => HH.outline(R, ell(x, y - 54, 18 + u * 47, 8 + u * 20), 'sun', .65));
      }
    });
    const lift = .18 + (.5 + Math.sin(t * .42) * .5) * 1.08;
    H.at(2.4, 3.03, lift, HH => {
      box(HH, R, 1.78, 2.64, 1.2, 1.05, lift, .14, 'sun', .7);
      for (const i of [1.82, 2.9]) HH.line(R, [HH.p(i, 2.7, lift + .16), HH.p(2.44, 2.54, 3.34)], 'paper', 1.05);
      crate(HH, R, 1.96, 2.78, lift + .15, 'coral');
    });
    H.at(4.95, 1.9, 1.3, HH => miner(HH, R, 4.95, 1.9, t, 'hold', 'coral', 1.3, (H2, R2, p) => {
      const [x, y] = H2.p(4.38, 2.06, 1.76);
      const a = t * 1.5;
      H2.line(R2, [[x, y], [x + Math.cos(a) * 13, y + Math.sin(a) * 10]], 'sun', 2.4);
      H2.dot(x + Math.cos(a) * 13, y + Math.sin(a) * 10, 3, 'blue');
    }));
    H.at(7.33, 2.36, 0, HH => miner(HH, R, 7.33, 2.36, t * 1.4, 'reach', 'teal', 0, (H2, R2, p) => {
      const [x, y] = p.rhand, a = Math.sin(t * 2.5) * .6;
      const tx = x - 12 + a * 12, ty = y - 21;
      H2.line(R2, [[x + 8, y + 13], [tx, ty]], 'sun', 2.3);
      H2.line(R2, [[tx - 12, ty + 4], [tx, ty], [tx + 13, ty + 4]], 'paper', 3);
    }));
    H.at(3.65, 6.25, 0, HH => miner(HH, R, 3.65, 6.25, t, 'hold', 'coral', 0, (H2, R2, p) => {
      crystal(H2, R2, 3.32, 6.05, .8, 18, 5, 'teal');
    }));
    H.at(2.02, 5.92, 1.6, HH => {
      const [x, y] = HH.p(2.02, 5.93, 1.65);
      for (let k = 0; k < 6; k++) {
        const a = t * 3.2 + k * TAU / 6;
        HH.line(R, [[x + Math.cos(a) * 5, y + Math.sin(a) * 5], [x + Math.cos(a) * 15, y + Math.sin(a) * 15]], 'paper', .8, { tone: .9 });
      }
      for (let k = 0; k < 3; k++) {
        const u = cycle(t * 2 + k * .3, 1);
        HH.line(R, [[x + 14 + u * 10, y + 5 + u * 8 + k * 4], [x + 18 + u * 10, y + 7 + u * 8 + k * 4]], 'sun', 1.1, { tone: 1 - u });
      }
    });
    H.at(3.8, 9.85, 0, HH => miner(HH, R, 3.8, 9.85, t, 'kneel', 'teal', 0, (H2, R2, p) => {
      const [x, y] = p.rhand;
      H2.line(R2, [[x, y], [x - 13, y - 4]], 'paper', 1.1);
      H2.dot(x - 14, y - 5, 3, 'coral', .8);
    }));
    H.at(8.42, 5.8, 0, HH => miner(HH, R, 8.42, 5.8, t, 'think', 'sun', 0, (H2, R2, p) => {
      fork(H2, R2, ...p.lhand, .62);
    }));
    const j = 7.7 + Math.sin(t * .35) * .55;
    H.at(9.95, j + .55, .2, HH => cart(HH, R, 9.4, j));
    H.at(10.12, j + 2.12, 0, HH => miner(HH, R, 10.12, j + 2.12, t * .5, 'hold', 'coral'));
    for (const [i, j, z] of [[.8, 5.1, 1.9], [6.4, .7, 1.3], [11.3, 2.1, 1.2]]) {
      const [x, y] = H.p(i, j, z);
      const a = .35 + .2 * Math.sin(t * 2 + i);
      H.glow(x, y, 32, 25, 'teal', a);
    }
  });
  return { ...room, under: rich.under, live: rich.live };
}
