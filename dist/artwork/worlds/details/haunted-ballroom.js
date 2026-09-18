import { shape, oval, stroke, box, table, bench, bottle, ell, loop, wallPt, wallRect, TAU } from '../common.js';

function ghost(H, R, i, j, t, size = 1, costume = 'coral') {
  const [x, ground] = H.p(i, j, .25), y = ground + Math.sin(t * 1.5) * 3;
  const p = (a, b) => [x + a * size, y + b * size];
  H.opacity(.88, () => {
    shape(H, R, loop([[-15, 0], [-13, -27], [-9, -44], [0, -49], [11, -42], [13, -20], [19, -1], [8, -5], [2, 2], [-5, -5]].map(q => p(...q)), 2), 'paper', 1);
    stroke(H, R, [[-9, -29], [-15, -23], [-23, -27]].map(q => p(...q)), 'paper', 4 * size);
    stroke(H, R, [[10, -29], [18, -20], [24, -26]].map(q => p(...q)), 'paper', 4 * size);
    shape(H, R, [[-10, -28], [0, -24], [9, -29], [10, -13], [-8, -14]].map(q => p(...q)), costume, .62);
    shape(H, R, [[-5, -31], [0, -28], [5, -32], [5, -26], [0, -28], [-5, -26]].map(q => p(...q)), 'blue', .9);
    H.dot(...p(-4, -37), 1.5 * size, 'blue');
    H.dot(...p(5, -37), 1.5 * size, 'blue');
    stroke(H, R, [[-2, -32], [1, -30], [4, -32]].map(q => p(...q)), 'blue', .7);
    for (const dy of [-21, -17]) H.dot(...p(1, dy), .9 * size, 'sun');
  });
  return [x, y];
}

function candle(H, R, x, y, t = 0, size = 1) {
  shape(H, R, [[x - 2 * size, y], [x + 2 * size, y], [x + 2 * size, y - 12 * size], [x - 2 * size, y - 12 * size]], 'paper', 1);
  stroke(H, R, [[x, y - 12 * size], [x + 1, y - 7 * size], [x + 2, y - 10 * size]], 'coral', .7);
  const f = Math.sin(t * 7 + x) * 1.3;
  shape(H, R, [[x - 2 * size, y - 14 * size], [x + f, y - 21 * size], [x + 2.5 * size, y - 14 * size]], 'sun', .9, .55);
}

function candelabra(H, R, i, j, z = 0, t = 0, size = 1) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y, 10 * size, 4 * size, 'sun', .75);
  stroke(H, R, [[x, y], [x, y - 31 * size]], 'paper', 4 * size);
  stroke(H, R, [[x, y], [x, y - 31 * size]], 'sun', 3 * size);
  for (const side of [-1, 1]) {
    stroke(H, R, [[x, y - 15 * size], [x + side * 13 * size, y - 13 * size], [x + side * 17 * size, y - 27 * size]], 'paper', 3.6 * size);
    stroke(H, R, [[x, y - 15 * size], [x + side * 13 * size, y - 13 * size], [x + side * 17 * size, y - 27 * size]], 'sun', 2.4 * size);
    candle(H, R, x + side * 17 * size, y - 27 * size, t, size);
  }
  candle(H, R, x, y - 34 * size, t, size);
}

function glass(H, R, x, y, ink = 'coral') {
  shape(H, R, loop([[x - 4, y - 13], [x + 4, y - 13], [x + 3, y - 7], [x, y - 5], [x - 3, y - 7]], 1), 'paper', 1, .6);
  H.line(R, [[x - 2, y - 9], [x + 2, y - 9]], ink, 2);
  H.line(R, [[x, y - 5], [x, y]], 'sun', 1);
  oval(H, R, x, y, 4, 1.5, 'sun', .7);
}

function plate(H, R, i, j, z, size = 9) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y, size, size * .46, 'paper', 1);
  H.outline(R, ell(x, y, size * .7, size * .3), 'sun', .75);
  return [x, y];
}

function portrait(H, R, side, pos, z, type) {
  const outer = wallRect(H, side, pos - .45, pos + .45, z, z + 1.15, .055);
  shape(H, R, outer, 'sun', .9);
  const inner = wallRect(H, side, pos - .34, pos + .34, z + .1, z + 1.05, .07);
  shape(H, R, inner, type % 2 ? 'coral' : 'blue', .66, .7);
  const [x, y] = wallPt(H, side, pos, z + .6, .08);
  H.clip(inner, () => {
    oval(H, R, x, y + 15, 12, 12, type % 2 ? 'teal' : 'coral');
    oval(H, R, x, y - 3, 7, 10, 'paper', 1);
    if (type % 2) {
      for (const dx of [-6, 6]) oval(H, R, x + dx, y - 6, 4, 5, 'paper', 1);
    } else {
      shape(H, R, [[x - 8, y - 10], [x + 7, y - 10], [x + 5, y - 20], [x - 5, y - 20]], 'blue', .9);
      H.line(R, [[x - 11, y - 10], [x + 11, y - 10]], 'blue', 2);
    }
    H.dot(x - 2.5, y - 4, 1, 'blue'); H.dot(x + 3, y - 4, 1, 'blue');
    stroke(H, R, [[x - 4, y + 3], [x, y + 6], [x + 4, y + 3]], 'blue', .7);
  });
  for (const p of outer) H.dot(...p, 2, 'sun', 1, { knock: true });
  const [tx, ty] = wallPt(H, side, pos, z - .1, .08);
}

function cobweb(H, R, side, pos, z, sign = 1) {
  const center = wallPt(H, side, pos, z, .09);
  const ends = Array.from({ length: 6 }, (_, k) => wallPt(H, side, pos + sign * Math.cos(k * Math.PI / 10) * 1.35, z - Math.sin(k * Math.PI / 10) * 1.2, .09));
  for (const end of ends) H.line(R, [center, end], 'paper', .6, { tone: .55 });
  for (const u of [.26, .49, .73, 1]) stroke(H, R, ends.map(([x, y]) => [center[0] + (x - center[0]) * u, center[1] + (y - center[1]) * u]), 'paper', .55, .65);
}

function stand(H, R, i, j) {
  const [x, y] = H.p(i, j, .25);
  H.line(R, [[x, y], [x, y - 28]], 'sun', 1.5);
  H.line(R, [[x - 8, y + 3], [x, y - 1], [x + 9, y + 3]], 'blue', 1.2);
  shape(H, R, [[x - 13, y - 43], [x + 11, y - 40], [x + 13, y - 24], [x - 12, y - 27]], 'paper', 1, .7);
  H.line(R, [[x, y - 41], [x + 1, y - 26]], 'blue', .6);
  for (let n = 0; n < 4; n++) for (const dx of [-9, 3]) H.line(R, [[x + dx, y - 36 + n * 2.4], [x + dx + 6, y - 35 + n * 2.4]], 'blue', .35);
  H.dot(x - 6, y - 33, 1, 'blue'); H.dot(x + 6, y - 30, 1, 'blue');
}

function piano(H, R) {
  for (const [i, j] of [[8.2, 1.7], [10.3, 1.7], [8.2, 3.2], [10.3, 3.2]]) box(H, R, i, j, .14, .14, 0, 1, 'blue', .8);
  const rim = [[8.05, 1.55], [9.5, 1.4], [10.6, 1.8], [10.75, 2.4], [10.75, 3.25], [8.05, 3.25]];
  shape(H, R, rim.map(([i, j]) => H.p(i, j, 1.25)), 'sun', .7);
  for (let k = 0; k < rim.length; k++) {
    const a = rim[k], b = rim[(k + 1) % rim.length];
    shape(H, R, [H.p(...a, .92), H.p(...b, .92), H.p(...b, 1.3), H.p(...a, 1.3)], 'blue', .86);
  }
  shape(H, R, [[8.22, 1.77], [9.4, 1.63], [10.36, 1.95], [10.49, 3.05], [8.22, 3.05]].map(([i, j]) => H.p(i, j, 1.32)), 'coral', .55);
  for (let n = 0; n < 15; n++) H.line(R, [H.p(8.32 + n * .14, 3.02, 1.34), H.p(8.32 + n * .12, 1.83 + n * .02, 1.34)], 'sun', .7);
  for (const i of [8.6, 9.3, 10]) H.line(R, [H.p(i, 1.95, 1.35), H.p(i + .12, 2.97, 1.35)], 'blue', 2);
  for (const i of [8.95, 9.25, 9.55]) {
    H.line(R, [H.p(i, 3.38, .91), H.p(i, 3.45, .18), H.p(i, 3.78, .14)], 'sun', 2);
    oval(H, R, ...H.p(i, 3.78, .14), 4, 2, 'sun', .9);
  }
  shape(H, R, [H.p(8.05, 1.55, 1.4), H.p(10.75, 1.55, 2.35), H.p(10.75, 2.05, 2.35), H.p(8.05, 2.05, 1.4)], 'blue', .8);
  H.line(R, [H.p(10.45, 3.05, 1.32), H.p(10.45, 3.05, 2.02)], 'sun', 1.5);
  box(H, R, 8.05, 3.25, 2.7, .52, .92, .15, 'sun', .8);
  for (let k = 0; k < 18; k++) {
    const i = 8.09 + k * .145;
    shape(H, R, H.tile(i, 3.27, .14, .45, 1.08), 'paper', 1, .35);
    if (k % 7 !== 2 && k % 7 !== 6) shape(H, R, H.tile(i + .095, 3.28, .07, .25, 1.1), 'blue', .98, .2);
  }
  bench(H, R, 8.85, 4.05, 1.2, 'coral');
  const [x, y] = H.p(9.4, 2.85, 1.75);
  shape(H, R, [[x - 17, y], [x + 15, y + 5], [x + 13, y - 16], [x - 17, y - 20]], 'paper', 1, .7);
  H.line(R, [[x - 2, y + 2], [x - 3, y - 18]], 'blue', .6);
  for (let n = 0; n < 5; n++) H.line(R, [[x - 13, y - 15 + n * 3], [x + 11, y - 12 + n * 3]], 'blue', .4);
  const [lx, ly] = H.p(10.5, 3.38, .6);
}

function buffet(H, R) {
  table(H, R, .85, 6.6, 1.35, 4, 1.05, 'coral');
  shape(H, R, [H.p(.81, 6.56, 1.2), H.p(2.25, 6.56, 1.2), H.p(2.25, 10.65, 1.2), H.p(.81, 10.65, 1.2)], 'paper', 1);
  for (let n = 0; n < 6; n++) {
    const j = 6.8 + n * .6;
    H.line(R, [H.p(2.26, j, 1.2), H.p(2.26, j + .2, .68), H.p(2.26, j + .4, 1.2)], 'sun', 1.4);
  }
  for (let k = 0; k < 3; k++) {
    const [x, y] = plate(H, R, 1.35, 7 + k * 1.3, 1.23, 15);
    if (k === 0) {
      for (let n = 0; n < 6; n++) bottle(H, R, x - 10 + n * 4, y - (n % 2) * 6, ['coral', 'teal', 'sun'][n % 3], .3);
    } else if (k === 1) {
      shape(H, R, [[x - 11, y - 3], [x + 10, y + 1], [x + 10, y - 16], [x - 11, y - 19]], 'coral', .7);
      oval(H, R, x, y - 18, 12, 5, 'paper', 1);
      for (let n = 0; n < 4; n++) H.dot(x - 8 + n * 5, y - 19, 2, 'coral');
    } else for (let n = 0; n < 5; n++) oval(H, R, x - 8 + n * 4, y - (n % 2) * 4, 4, 3, 'sun', .8);
  }
  for (let n = 0; n < 6; n++) {
    const [x, y] = H.p(1.94, 6.95 + n * .54, 1.23);
    if (n < 3) glass(H, R, x, y);
    else {
      for (let k = 0; k < 3; k++) oval(H, R, x, y - k * 2, 8, 3.5, 'paper', 1);
    }
  }
  for (const j of [6.72, 8.48, 10.18]) {
    box(H, R, .95, j, 1.15, .28, .25, .12, 'sun', .6);
    H.line(R, [H.p(1, j, .23), H.p(2.05, j, 1.0)], 'blue', 2);
  }
  box(H, R, .96, 9.13, .92, .7, .38, .2, 'blue', .8);
  for (let n = 0; n < 4; n++) oval(H, R, ...H.p(1.4, 9.45, .62 + n * .05), 13, 5, 'paper', 1);
  const [x, y] = H.p(1.52, 10.57, .86);
}

export default function enrich(room) {
  return {
    ...room,
    under(H, R) {
      room.under.call(this, H, R);
      for (const side of ['nw', 'ne']) {
        for (const p of [.3, 5.1, 8.65, 11.75]) {
          shape(H, R, wallRect(H, side, p - .17, p + .17, .1, 4.25, .16), 'paper', .65);
          for (const q of [-.08, .08]) H.line(R, [wallPt(H, side, p + q, .42, .18), wallPt(H, side, p + q, 4.04, .18)], 'sun', 1);
          for (const z of [.1, .33, 3.98, 4.18]) shape(H, R, wallRect(H, side, p - .28, p + .28, z, z + .13, .21), 'sun', .8);
        }
      }
      for (const inset of [.18, .32]) H.outline(R, H.tile(2 + inset, 4 + inset, 8.5 - inset * 2, 6.8 - inset * 2, .025), 'sun', .85, { tone: .65 });
      const [mx, my] = H.p(6.3, 7.3, .035);
      for (const r of [59, 64, 79]) H.outline(R, ell(mx, my, r, r * .48), 'sun', 1, { tone: .55 });
      for (let k = 0; k < 16; k++) {
        const a = k * TAU / 16, x = mx + Math.cos(a) * 71, y = my + Math.sin(a) * 34;
        shape(H, R, [[x - 4, y], [x, y - 3], [x + 4, y], [x, y + 3]], 'sun', .48, .45);
      }
      for (const side of ['nw', 'ne']) {
        for (const z of [.2, .73, 4.25, 4.4]) H.line(R, [wallPt(H, side, .05, z, .06), wallPt(H, side, 11.95, z, .06)], 'sun', z > 4 ? 1.8 : 1.1, { tone: .7 });
        for (let p = .4; p < 12; p += .8) H.outline(R, wallRect(H, side, p, p + .52, .25, .66, .07), 'sun', .6, { tone: .65 });
        for (const p of [3, 7, 10.3]) {
          for (const sign of [-1, 1]) {
            const a = p + sign * 1.03;
            shape(H, R, [wallPt(H, side, a, 3.9, .1), wallPt(H, side, a + sign * .25, 3.85, .1), wallPt(H, side, a + sign * .14, 1.02, .1), wallPt(H, side, a - sign * .17, 1.2, .1), wallPt(H, side, a - sign * .04, 2.6, .1)], 'coral', .74, .75);
            H.line(R, [wallPt(H, side, a, 2.5, .11), wallPt(H, side, a + sign * .19, 2.6, .11)], 'sun', 2);
          }
        }
      }
      portrait(H, R, 'nw', 5.1, 1.7, 0);
      portrait(H, R, 'nw', 8.65, 1.8, 1);
      portrait(H, R, 'ne', 4.8, 1.7, 2);
      portrait(H, R, 'ne', 8.65, 1.8, 3);
      cobweb(H, R, 'nw', .08, 4.35);
      cobweb(H, R, 'ne', 11.9, 4.35, -1);
      cobweb(H, R, 'nw', 11.85, 4.35, -1);
      for (const [i, j] of [[1.4, 4.5], [6.2, 1.7], [11.05, 5.3]]) candelabra(H, R, i, j, 0, 0, .8);
      box(H, R, 1.65, 1.7, 4.45, 2.85, 0, .22, 'coral', .48);
      for (let n = 0; n < 14; n++) {
        const [x, y] = H.p(1.8 + n * .3, 4.56, .1);
        H.dot(x, y, 1.9, 'sun', 1, { knock: true });
      }
      piano(H, R);
      for (const [i, j] of [[2.4, 3.7], [3.9, 3.8], [5.3, 3.4]]) stand(H, R, i, j);
      const [sx, sy] = H.p(4.25, 1.9, .3);
      oval(H, R, sx, sy - 17, 17, 19, 'sun', .65);
      oval(H, R, sx, sy - 17, 13, 15, 'paper', 1);

      for (const d of [-1, 1]) H.line(R, [[sx + d * 10, sy - 3], [sx + d * 16, sy + 4]], 'blue', 1.2);
      buffet(H, R);
      table(H, R, 7.2, 10.1, 2.9, 1.1, .78, 'coral');
      for (const i of [7.7, 8.55, 9.4]) {
        const [x, y] = plate(H, R, i, 10.65, .92, 9);
        glass(H, R, x + 9, y - 5, 'teal');
        H.line(R, [[x - 12, y - 4], [x - 12, y + 6]], 'sun', 1.2);
        H.line(R, [[x + 12, y], [x + 12, y + 8]], 'sun', 1.2);
        shape(H, R, [[x - 3, y - 7], [x + 4, y - 7], [x + 2, y - 13]], 'coral', .7, .5);
      }
      candelabra(H, R, 8.6, 10.25, .94, 0, .48);
      table(H, R, 4.3, 10.6, 1.1, .75, .75, 'teal');
      const [gx, gy] = H.p(4.83, 10.96, .91);
      shape(H, R, [[gx - 16, gy - 5], [gx, gy - 10], [gx + 17, gy - 3], [gx + 1, gy + 6]], 'paper', 1, .7);
      H.line(R, [[gx, gy - 10], [gx + 1, gy + 6]], 'blue', .7);
      for (let n = 0; n < 4; n++) H.line(R, [[gx - 10, gy - 4 + n * 2], [gx - 3, gy - 6 + n * 2]], 'blue', .4);
      const [hx, hy] = H.p(10.8, 7.3);
      oval(H, R, hx, hy, 16, 6, 'blue', .7);
      H.line(R, [[hx, hy], [hx, hy - 66]], 'sun', 2);
      for (const d of [-1, 1]) stroke(H, R, [[hx, hy - 48], [hx + d * 17, hy - 56], [hx + d * 19, hy - 66]], 'sun', 2);
      shape(H, R, [[hx + 8, hy - 53], [hx + 21, hy - 53], [hx + 25, hy - 19], [hx + 7, hy - 21]], 'coral', .68);
      oval(H, R, hx - 15, hy - 62, 12, 3, 'blue', .9);
      shape(H, R, [[hx - 22, hy - 63], [hx - 8, hy - 63], [hx - 9, hy - 74], [hx - 21, hy - 74]], 'blue', .9);
      for (const [i, j] of [[6.8, 8.9], [5, 9.5], [6.2, 6.2]]) {
        const [x, y] = H.p(i, j, .05);
        shape(H, R, [[x - 8, y], [x, y - 4], [x + 8, y + 1], [x, y + 5]], 'paper', 1, .5);
        H.line(R, [[x - 4, y], [x + 3, y + 1]], 'blue', .5);
      }
    },
    live(H, R, t) {
      H.at(6.2, 4.8, 6.1, HH => {
        const [cx, cy] = HH.p(6.2 + Math.sin(t * .45) * .06, 4.8, 6.1);
        HH.line(R, [[cx, cy - 49], [cx, cy - 3]], 'paper', 3.6);
        HH.line(R, [[cx, cy - 49], [cx, cy - 3]], 'sun', 2.2);
        oval(HH, R, cx, cy - 5, 8, 5, 'sun', .9);
        for (let k = 0; k < 6; k++) {
          const a = k * TAU / 6, x = cx + Math.cos(a) * 43, y = cy + Math.sin(a) * 16;
          stroke(HH, R, [[cx, cy - 7], [(cx + x) / 2, y + 13], [x, y + 6], [x, y - 5]], 'paper', 3.6);
          stroke(HH, R, [[cx, cy - 7], [(cx + x) / 2, y + 13], [x, y + 6], [x, y - 5]], 'sun', 2);
          candle(HH, R, x, y - 4, t + k, .7);
          shape(HH, R, [[x, y + 9], [x + 3, y + 15], [x, y + 23], [x - 3, y + 15]], 'paper', .9, .6);
        }
        HH.line(R, [[cx, cy + 6], [cx, cy + 30]], 'sun', 1);
        shape(HH, R, [[cx, cy + 22], [cx + 5, cy + 29], [cx, cy + 37], [cx - 5, cy + 29]], 'teal', .3, .6);
      });
      for (const [k, i, j] of [[0, 2.35, 2.8], [1, 3.75, 2.6], [2, 5.1, 2.4]]) H.at(i, j, .3, HH => {
        const [x, y] = ghost(HH, R, i, j, t + k, .8, ['teal', 'coral', 'sun'][k]);
        if (k === 0) {
          oval(HH, R, x + 10, y - 22, 7, 12, 'coral', .8);
          HH.line(R, [[x + 10, y - 31], [x + 4, y - 47]], 'sun', 2);
          HH.line(R, [[x - 4, y - 29 + Math.sin(t * 4) * 4], [x + 23, y - 18 + Math.sin(t * 4) * 4]], 'sun', 1.2);
          HH.line(R, [[x + 10, y - 31], [x + 10, y - 14]], 'blue', .6);
        } else if (k === 1) {
          HH.line(R, [[x - 10, y - 24], [x - 24, y - 35 - Math.sin(t * 5) * 6]], 'sun', 1.4);
          HH.line(R, [[x + 10, y - 24], [x + 24, y - 32 + Math.sin(t * 5) * 6]], 'sun', 1.4);
          oval(HH, R, x, y - 15, 13, 6, 'coral', .8);
        } else {
          stroke(HH, R, [[x + 1, y - 31], [x + 8, y - 25], [x + 19, y - 28]], 'sun', 4);
          shape(HH, R, [[x + 17, y - 30], [x + 28, y - 36], [x + 28, y - 21], [x + 17, y - 26]], 'sun', .9);
        }
      });
      for (let k = 0; k < 4; k++) {
        const u = (t * .22 + k * .27) % 1;
        const [x, y] = H.p(3.25 + k * .5, 3.1, 2.1 + u * .8);
        H.opacity(1 - u, () => { oval(H, R, x, y, 3, 2, 'sun', .9); H.line(R, [[x + 2, y], [x + 2, y - 10], [x + 7, y - 7]], 'sun', 1); });
      }
      for (let k = 0; k < 18; k++) if (Math.sin(t * 5 + k * 2.1) > .72) shape(H, R, H.tile(8.09 + k * .145, 3.37, .135, .3, 1.084), 'teal', .35, .25);
      const page = Math.sin(t * 1.4), [px, py] = H.p(9.4, 2.85, 1.76);
      H.line(R, [[px - 2, py - 17], [px + 9 * page, py - 24], [px + 13 * page, py - 3]], 'paper', 2);
      for (let k = 0; k < 2; k++) {
        const a = t * .28 + k * Math.PI, i = 6.1 + Math.cos(a) * 1.4, j = 6.95 + Math.sin(a) * 1.45;
        H.at(i, j, .2, HH => {
          const [x, y] = ghost(HH, R, i - .42, j, t + k, .95, 'coral');
          const [xx, yy] = ghost(HH, R, i + .42, j + .3, t + k + 1.3, .88, 'teal');
          stroke(HH, R, [[x + 13, y - 25], [(x + xx) / 2, Math.min(y, yy) - 35], [xx - 12, yy - 24]], 'paper', 3);
          shape(HH, R, [[xx - 6, yy - 41], [xx - 2, yy - 47], [xx + 2, yy - 42], [xx + 5, yy - 46], [xx + 9, yy - 40]], 'sun', .9, .6);
        });
      }
      const si = 3 + Math.sin(t * .42) * .35, sj = 7.5 + Math.cos(t * .42) * .75;
      H.at(si, sj, .3, HH => {
        const [x, y] = ghost(HH, R, si, sj, t + 2, .85, 'blue');
        oval(HH, R, x + 23, y - 24, 16, 4, 'sun', .75);
        for (const dx of [15, 26, 34]) glass(HH, R, x + dx, y - 26);
      });
      for (let n = 0; n < 3; n++) {
        const i = 3 + n * .75, j = 9.75 + Math.sin(t * .7 + n) * .18, z = 1.05 + Math.sin(t * 1.2 + n) * .2;
        H.at(i, j, z, HH => {
          const [x, y] = plate(HH, R, i, j, z, 9);
          HH.line(R, [[x - 13, y - 2], [x - 13 + Math.sin(t + n) * 3, y - 13]], 'sun', 1.5);
          if (n === 1) glass(HH, R, x + 2, y - 4, 'teal');
        });
      }
      H.at(10.35, 9.25, .1, HH => {
        const z = .13 + (Math.sin(t * .85) + 1) * .19;
        box(HH, R, 10.05, 8.55, .95, .16, z + .55, 1, 'sun', .7);
        box(HH, R, 10.05, 8.55, .95, .95, z + .55, .12, 'coral', .7);
        for (const i of [10.1, 10.88]) for (const j of [8.61, 9.37]) box(HH, R, i, j, .08, .08, z, .56, 'sun', .8);
        const [x, y] = HH.p(10.52, 8.63, z + 1.3);
        HH.outline(R, ell(x, y, 8, 10), 'blue', 1);
      });
      const [qx, qy] = H.p(4.85, 10.95, 1.18);
      stroke(H, R, [[qx + 6, qy + 7], [qx + 13 + Math.sin(t * 2) * 3, qy - 13]], 'sun', 1.4);
      shape(H, R, [[qx + 11, qy - 7], [qx + 15 + Math.sin(t * 2) * 3, qy - 26], [qx + 22, qy - 27], [qx + 20, qy - 15]], 'paper', 1, .6);
      const spider = wallPt(H, 'nw', 11.1, 2.7 + Math.sin(t * .5) * .25, .12);
      H.line(R, [wallPt(H, 'nw', 11.1, 3.9, .1), spider], 'paper', .5);
      H.dot(...spider, 2.5, 'blue');
      for (const d of [-1, 1]) for (const dy of [-3, 0, 3]) H.line(R, [spider, [spider[0] + d * 5, spider[1] + dy]], 'blue', .7);
    },
  };
}
