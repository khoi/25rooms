import { actor, bottle, box, creature, ell, lantern, oval, rug, shape, steam, stroke, table } from '../common.js';

const colors = ['coral', 'sun', 'teal', 'blue'];

function bowl(H, R, i, j, z, color = 'sun', r = 8, filled = false) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - r, y - 3], [x - r * .7, y + 4], [x + r * .65, y + 4], [x + r, y - 3]], color, .72, .7);
  oval(H, R, x, y - 3, r, r * .38, 'paper', .9);
  if (filled) {
    shape(H, R, [[x - r * .8, y - 4], [x - 1, y - r * .95], [x + r * .8, y - 4]], color, .88, .6);
    for (let n = 0; n < 5; n++) H.dot(x - r * .45 + n * r * .2, y - 5 - n % 2, .65, 'blue', .7);
  }
}

function sack(H, R, i, j, color = 'sun', scale = 1, contents = 'grain') {
  const [x, y] = H.p(i, j, .03), w = 9 * scale, h = 19 * scale;
  const P = [[x - w, y], [x - w - 2, y - h * .5], [x - w * .65, y - h], [x + w * .7, y - h], [x + w + 2, y - h * .5], [x + w, y]];
  shape(H, R, P, color, .46, .85);
  oval(H, R, x, y - h, w * .72, w * .3, 'blue', .65);
  if (contents === 'grain') for (let n = 0; n < 10; n++) H.dot(x + Math.sin(n * 2.3) * w * .57, y - h + Math.cos(n * 2) * w * .18, .9, 'sun', .95);
  else for (let n = 0; n < 6; n++) oval(H, R, x + Math.sin(n * 2.3) * w * .6, y - h + Math.cos(n * 2) * w * .2, 1.8, .9, 'coral', .95);
  stroke(H, R, [[x - w * .55, y - h + 4], [x - w * .35, y - 4]], 'blue', .5, .5);
  const [lx, ly] = [x + 1, y - h * .4];
  shape(H, R, [[lx - 4, ly - 3], [lx + 4, ly - 3], [lx + 4, ly + 3], [lx - 4, ly + 3]], 'paper', .9, .5);
  H.line(R, [[lx - 2, ly], [lx + 2, ly]], 'blue', .6);
}

function jug(H, R, i, j, z = 0, color = 'coral', scale = 1) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x + 7 * scale, y - 11 * scale, 5 * scale, 7 * scale, color, .5);
  oval(H, R, x, y - 9 * scale, 8 * scale, 11 * scale, color, .75);
  shape(H, R, [[x - 4 * scale, y - 16 * scale], [x - 3 * scale, y - 24 * scale], [x + 3 * scale, y - 24 * scale], [x + 4 * scale, y - 16 * scale]], color, .75, .7);
  oval(H, R, x, y - 24 * scale, 4 * scale, 1.8 * scale, 'blue', .65);
  stroke(H, R, [[x - 5 * scale, y - 12 * scale], [x - 5 * scale, y - 6 * scale]], 'paper', 1.1, .7);
}

function textile(H, R, i, j, w, d, color = 'coral', z = .025) {
  rug(H, R, i, j, w, d, color, .54, { border: 'sun', z });
  for (let n = .25; n < w; n += .45) {
    const x = i + n;
    shape(H, R, [H.p(x, j + d * .26, z), H.p(x + .16, j + d * .5, z), H.p(x, j + d * .74, z), H.p(x - .16, j + d * .5, z)], 'paper', .72, .5);
    H.line(R, [H.p(x, j - .13, z), H.p(x, j + .05, z)], color, 1);
    H.line(R, [H.p(x, j + d - .04, z), H.p(x, j + d + .13, z)], color, 1);
  }
}

function bedroll(H, R, i, j, color, length = 1.2, z = .06) {
  const [x, y] = H.p(i, j, z), [a, b] = H.p(i + length, j, z);
  shape(H, R, [[x - 5, y - 10], [a + 5, b - 10], [a + 5, b], [x - 5, y]], color, .64, .8);
  oval(H, R, a, b - 5, 6, 6, color, .66);
  H.outline(R, ell(a, b - 5, 3.2, 3.2), 'paper', .7);
  for (const u of [.25, .75]) H.line(R, [[x + (a - x) * u, y + (b - y) * u - 10], [x + (a - x) * u, y + (b - y) * u]], 'blue', 1.3);
}

function person(H, R, i, j, t, clip, color, opts = {}) {
  actor(H, R, i, j, t, clip, {
    shirt: [color, .76], pants: ['blue', .68], dress: true, hairStyle: 'bald', ...opts,
    prop(h, r, p) {
      const [x, y] = p.head;
      oval(h, r, x, y - 4, 6.5, 3.4, opts.wrap || 'paper', .92);
      stroke(h, r, [[x - 5.5, y - 4], [x + 4, y - 2.5]], 'blue', .6, .7);
      shape(h, r, [[x - 5, y - 2], [x - 7, y + 11], [x - 3, y + 12], [x - 2, y]], opts.wrap || 'paper', .85, .5);
      if (opts.tool) opts.tool(h, r, p);
    },
  }, 0, .91);
}

function kettle(H, R, x, y, color = 'teal', tilt = 0) {
  oval(H, R, x + 8, y - 7, 5, 7, color, .7);
  shape(H, R, [[x - 7, y - 4], [x - 13, y - 11 - tilt], [x - 15, y - 10 - tilt], [x - 10, y + 1]], color, .78, .7);
  oval(H, R, x, y - 4, 9, 8, color, .75);
  oval(H, R, x, y - 11, 7, 2.5, 'sun', .85);
  H.dot(x, y - 14, 2, 'blue', .9, { knock: true });
  stroke(H, R, [[x - 4, y - 6], [x - 4, y - 2]], 'paper', 1.2, .8);
}

export default function enrich(room) {
  return {
    ...room,
    under(H, R) {
      room.under.call(this, H, R);
      shape(H, R, H.faceJ(.045, 7.55, 2, .55, 2.42), 'teal', .58, .8);
      for (let j = 7.75; j < 9.45; j += .35) {
        for (const z of [.95, 1.55, 2.1]) {
          shape(H, R, [H.p(.05, j, z + .13), H.p(.05, j + .12, z), H.p(.05, j, z - .13), H.p(.05, j - .12, z)], 'sun', .85, .45);
        }
        H.line(R, [H.p(.05, j, .55), H.p(.05, j, .38)], 'coral', 1.1);
      }
      H.line(R, [H.p(.06, 7.45, 2.48), H.p(.06, 9.65, 2.48)], 'sun', 2);
      for (let n = 0; n < 3; n++) {
        const [x, y] = H.p(.08, 10.05 + n * .57, 1.75);
        stroke(H, R, [[x, y - 19], [x, y - 7]], 'blue', 1.5);
        oval(H, R, x, y, 8, 9, n === 1 ? 'blue' : 'sun', .8);
        H.outline(R, ell(x, y, 5.5, 6.5), 'coral', .7);
      }
      textile(H, R, .55, 4.8, 2.0, 1.9, 'teal');
      textile(H, R, 5.9, 8.9, 2.3, 2.25, 'teal');
      for (const i of [.75, 4.55]) box(H, R, i, 2.9, .1, .1, 0, 2.6, 'blue', .64);
      for (let n = 0; n < 8; n++) {
        const i = .7 + n * .5;
        const P = [H.p(i, .8, 2.85), H.p(i + .5, .8, 2.85), H.p(i + .5, 3.1, 2.6), H.p(i, 3.1, 2.6)];
        shape(H, R, P, n % 2 ? 'paper' : 'coral', n % 2 ? .92 : .6, .7);
        const a = H.p(i, 3.1, 2.6), b = H.p(i + .5, 3.1, 2.6);
        shape(H, R, [a, b, [b[0] - 2, b[1] + 6], [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 9], [a[0], a[1] + 5]], n % 2 ? 'paper' : 'coral', .7, .6);
      }
      table(H, R, 3.33, 2.86, .48, .48, .36, 'coral');
      table(H, R, 1.65, 3.55, 3.15, 1.05, .72, 'sun');
      const [sx, sy] = H.p(4.42, 3.66, .88);
      H.line(R, [[sx, sy], [sx, sy - 20]], 'blue', 1.5);
      H.line(R, [[sx - 12, sy - 18], [sx + 12, sy - 18]], 'sun', 1.7);
      for (const side of [-1, 1]) {
        stroke(H, R, [[sx + side * 12, sy - 18], [sx + side * 12 - 5, sy - 8], [sx + side * 12 + 5, sy - 8], [sx + side * 12, sy - 18]], 'blue', .55);
        oval(H, R, sx + side * 12, sy - 7, 6, 2, 'sun', .85);
      }
      for (let n = 0; n < 3; n++) H.dot(sx + 11 + n * 1.2, sy - 9, 1.2, 'coral', .9);
      for (let n = 0; n < 6; n++) {
        bowl(H, R, 1.96 + n * .48, 4.05, .86, colors[n % 4], 7.2, true);
        const [x, y] = H.p(2.02 + n * .48, 4.58, .74);
        shape(H, R, [[x - 6, y], [x + 6, y], [x + 6, y + 7], [x - 6, y + 7]], 'paper', .95, .45);
      }
      for (let n = 0; n < 5; n++) sack(H, R, 1.8 + n * .63, 4.98, colors[n % 3], .8, n === 3 ? 'dates' : 'grain');
      box(H, R, 4.9, 1.1, 1.2, .55, 0, 1.5, 'teal', .45);
      for (const z of [.52, 1.06, 1.6]) {
        box(H, R, 4.85, 1.07, 1.35, .65, z, .08, 'sun', .75);
        for (let n = 0; n < 3; n++) bottle(H, R, ...H.p(5.02 + n * .43, 1.4, z + .08), colors[(n + Math.round(z)) % 4], .36);
      }
      for (let n = 0; n < 3; n++) {
        sack(H, R, 6.65 + n * .68, 1.45, 'sun', .93, 'dates');
        const [x, y] = H.p(6.7 + n * .65, .3, 2.25);
        stroke(H, R, [[x, y - 10], [x, y + 18]], 'blue', .8);
        for (let k = 0; k < 9; k++) oval(H, R, x + Math.sin(k * 3) * 5, y + k * 2.4, 2.1, 3, k % 2 ? 'coral' : 'sun', .87);
      }
      for (let n = 0; n < 3; n++) {
        const i = 8.4 + n * 1.0;
        shape(H, R, H.faceI(i, .3, .82, .35, 2.38 - n * .12), colors[n], .62, .9);
        for (let z = .55; z < 2.3 - n * .12; z += .32) {
          const p = H.p(i + .41, .31, z);
          shape(H, R, [[p[0], p[1] - 5], [p[0] + 5, p[1]], [p[0], p[1] + 5], [p[0] - 5, p[1]]], 'paper', .8, .4);
        }
        H.line(R, [H.p(i - .08, .3, 2.5), H.p(i + .91, .3, 2.5)], 'blue', 2);
      }
      for (let n = 0; n < 4; n++) bedroll(H, R, .65, 5.1 + n * .35, colors[n], 1.6);
      bedroll(H, R, 9.0, 2.25, 'teal', 1.5);
      bedroll(H, R, 9.15, 2.55, 'coral', 1.5);
      box(H, R, 10.5, 2.9, .65, .85, 0, .8, 'sun', .6);
      H.line(R, [H.p(10.8, 2.88, .85), H.p(10.8, 3.76, .85)], 'blue', 1.4);
      jug(H, R, 10.6, 4, 0, 'teal', .8);
      for (const i of [5.1, 6.95]) box(H, R, i, 5.18, .12, .12, .05, 1.72, 'sun', .62);
      box(H, R, 5.02, 5.18, 2.15, .14, 1.77, .14, 'coral', .65);
      const [wx, wy] = H.p(6.05, 5.28, 1.78);
      oval(H, R, wx, wy + 1, 6, 6, 'sun', .78);
      H.outline(R, ell(wx, wy + 1, 3, 3), 'blue', .75);
      for (const [i, j, c] of [[4.7, 6.6, 'coral'], [6.5, 7.08, 'teal'], [7.05, 6.78, 'sun']]) jug(H, R, i, j, 0, c, .77);
      const [rx, ry] = H.p(7.0, 5.9, .05);
      for (let n = 0; n < 4; n++) H.outline(R, ell(rx, ry, 5 + n * 2.3, 2.4 + n), 'coral', .85);
      bowl(H, R, 8.4, 5.6, .03, 'teal', 12, true);
      const [hx, hy] = H.p(10.6, 6.7, .1);
      for (let n = 0; n < 11; n++) H.line(R, [[hx - 12 + n * 2, hy], [hx - 8 + n * 1.7, hy - 7 - n % 3]], 'sun', 1.5);
      box(H, R, 10.2, 6.75, 1.1, .5, 0, .24, 'coral', .52);
      for (let n = 0; n < 3; n++) {
        const i = 8.5 + n * .75;
        H.line(R, [H.p(i + .3, 9.47, .72), H.p(i + .3, 10.6, .72), H.p(i + .3, 10.6, .12)], 'paper', 1.6);
        const [x, y] = H.p(i + .32, 10.63, .43);
        shape(H, R, [[x - 5, y - 4], [x + 5, y - 4], [x + 5, y + 4], [x - 5, y + 4]], 'sun', .83, .6);
      }
      bedroll(H, R, 8.55, 9.8, 'teal', 1.5);
      const [tx, ty] = H.p(2.9, 8.85, .58);
      oval(H, R, tx, ty, 24, 10, 'sun', .75);
      H.outline(R, ell(tx, ty, 21, 8), 'blue', .75);
      for (let n = 0; n < 5; n++) {
        const a = n * 1.2, x = tx + Math.cos(a) * 16, y = ty + Math.sin(a) * 5;
        shape(H, R, [[x - 2.5, y - 7], [x + 2.5, y - 7], [x + 2, y], [x - 2, y]], n % 2 ? 'teal' : 'paper', .7, .5);
        H.line(R, [[x - 2, y - 3], [x + 2, y - 3]], 'coral', .8);
      }
      bowl(H, R, 3.8, 9.2, .58, 'sun', 8, true);
      const [fx, fy] = H.p(1.2, 10.75, .03);
      oval(H, R, fx, fy - 6, 17, 12, 'coral', .6);
      oval(H, R, fx, fy - 10, 12, 5, 'blue', .86);
      shape(H, R, [[fx - 7, fy + 2], [fx - 6, fy - 6], [fx, fy - 10], [fx + 6, fy - 6], [fx + 7, fy + 2]], 'blue', .84, .8);
      for (let n = 0; n < 5; n++) stroke(H, R, [[fx - 25, fy + n * 2 - 2], [fx - 10, fy + n * 2 + 3]], n % 2 ? 'sun' : 'coral', 2.1);
      jug(H, R, .5, 9.1, 0, 'coral', .8);
      bowl(H, R, .55, 10.2, .04, 'teal', 8);
      table(H, R, 6.15, 9.15, 1.9, 1.3, .4, 'sun');
      const P = H.tile(6.28, 9.28, 1.58, 1.0, .54);
      shape(H, R, P, 'paper', .95, .6);
      stroke(H, R, [H.p(6.4, 9.8, .55), H.p(6.75, 9.5, .55), H.p(7.15, 10, .55), H.p(7.7, 9.55, .55)], 'coral', .9);
      for (const [i, j] of [[6.6, 9.6], [7.3, 9.7], [7.65, 10.1]]) {
        const [x, y] = H.p(i, j, .55);
        shape(H, R, [[x - 4, y + 2], [x, y - 5], [x + 4, y + 2]], 'teal', .5, .55);
      }
      const [cx, cy] = H.p(7.7, 9.05, .56);
      oval(H, R, cx, cy, 5, 3.5, 'sun', .8);
      H.line(R, [[cx - 3, cy + 1], [cx + 3, cy - 1]], 'coral', 1);
      bottle(H, R, ...H.p(6.12, 10.75, 0), 'teal', .48);
      for (const [i, j] of [[5.9, 10.95], [8.2, 8.75]]) {
        const [x, y] = H.p(i, j, .02);
        for (const dx of [-3, 4]) oval(H, R, x + dx, y, 2.2, 4.5, 'coral', .77);
      }
      lantern(H, R, 6.15, .7, 2.4, 'teal');
    },
    live(H, R, t) {
      const sway = Math.sin(t * 1.2);
      H.at(3.6, 3.1, 0, h => person(h, R, 3.6, 3.1, t, 'write', 'teal', {
        tool(hh, r, p) {
          const [x, y] = p.nearHand;
          stroke(hh, r, [[x, y], [x - 7, y + 7]], 'sun', 2);
          oval(hh, r, x - 8, y + 8, 4, 2, 'sun', .9);
          if (Math.sin(t * 1.7) > .4) for (let n = 0; n < 4; n++) hh.dot(x - 8 + n % 2, y + 12 + n * 2, .75, 'coral', .8);
        },
      }));
      H.at(6, 5.4, 0, h => {
        const z = .25 + (.5 + .5 * Math.sin(t * .8)) * .8;
        const [x, y] = h.p(6.04, 5.52, z), a = h.p(6.05, 5.28, 1.78);
        stroke(h, R, [a, [x, y - 15]], 'blue', .9);
        stroke(h, R, [[x - 6, y - 10], [x, y - 17], [x + 6, y - 10]], 'blue', .8);
        shape(h, R, [[x - 7, y - 10], [x + 7, y - 10], [x + 5, y + 1], [x - 5, y + 1]], 'sun', .72, .8);
        oval(h, R, x, y - 10, 7, 2.6, 'teal', .75);
        for (const dx of [-3, 2]) h.line(R, [[x + dx, y - 7], [x + dx * .7, y]], 'blue', .55);
      });
      H.at(4.75, 5.65, 0, h => person(h, R, 4.75, 5.65, t, 'reach', 'coral', {
        tool(hh, r, p) { stroke(hh, r, [hh.p(6.05, 5.28, 1.78), p.nearHand, hh.p(4.8, 5.9, .07)], 'coral', 1); },
      }));
      H.at(8.65, 4.25, 0, h => {
        const [x, y] = h.p(8.65, 4.25);
        creature(h, R, x, y, 'camel', t * .15, 1.02, 'sun');
        for (const dx of [-13, 11]) {
          shape(h, R, [[x + dx - 6, y - 34], [x + dx + 7, y - 34], [x + dx + 6, y - 15], [x + dx - 6, y - 14]], dx < 0 ? 'teal' : 'paper', .8, .7);
          stroke(h, R, [[x + dx - 4, y - 28], [x + dx + 5, y - 28]], 'coral', 1.8);
          h.dot(x + dx, y - 19, 1.3, 'sun', .9);
        }
        stroke(h, R, [[x + 49, y - 59], h.p(10.35, 3.9, .4)], 'coral', .8);
      });
      H.at(8.0, 5.0, 0, h => person(h, R, 8, 5, t, 'water', 'teal', {
        wrap: 'sun', face: 'se',
        tool(hh, r, p) {
          const [x, y] = hh.p(8.65, 4.25);
          const bx = x - 17 + Math.sin(t * 2.1) * 5, by = y - 22;
          stroke(hh, r, [p.nearHand, [bx, by]], 'coral', 3);
          shape(hh, r, [[bx - 4, by - 3], [bx + 4, by - 3], [bx + 4, by + 2], [bx - 4, by + 2]], 'sun', .85, .6);
          for (let n = -2; n < 3; n++) hh.line(r, [[bx + n * 1.5, by + 2], [bx + n * 1.5, by + 5]], 'blue', .5);
        },
      }));
      H.at(10, 7.6, 0, h => {
        const [x, y] = h.p(10, 7.6);
        creature(h, R, x, y, 'camel', t * .1 + 2, .96, 'coral');
        bedroll(h, R, 9.35, 7.6, 'teal', 1.0, .7);
      });
      H.at(1.9, 9.55, 0, h => person(h, R, 1.9, 9.55, t, 'hold', 'sun', {
        tool(hh, r, p) {
          const [x, y] = p.nearHand;
          kettle(hh, r, x + 3, y + 6, 'teal', sway * 2);
          stroke(hh, r, [p.farHand, [x - 17, y + 20]], 'coral', 2.7);
          shape(hh, r, [[x - 21, y + 14], [x - 13, y + 14], [x - 14, y + 23], [x - 20, y + 23]], 'paper', .92, .7);
          hh.line(r, [[x - 20, y + 19], [x - 14, y + 19]], 'coral', 1.2);
          if (sway > -.4) stroke(hh, r, [[x - 11, y - 4 - sway * 2], [x - 17, y + 15]], 'coral', 1, .68);
        },
      }));
      H.at(1.2, 10.75, 0, h => {
        const [x, y] = h.p(1.2, 10.75, .34);
        for (let n = 0; n < 3; n++) shape(h, R, [[x - 5 + n * 4, y + 4], [x - 3 + n * 4, y - 7 - Math.sin(t * 5 + n) * 3], [x + n * 4, y + 4]], n % 2 ? 'coral' : 'sun', .85, .5);
        kettle(h, R, x, y - 4, 'blue');
        steam(h, R, x, y - 16, t, 2, 'paper');
      });
      H.at(6.05, 10.9, 0, h => person(h, R, 6.05, 10.9, t, 'point', 'coral', {
        tool(hh, r, p) { stroke(hh, r, [p.nearHand, hh.p(6.95 + Math.sin(t * .9) * .15, 9.7, .56)], 'blue', 1); },
      }));
      H.at(7.7, 8.75, 0, h => person(h, R, 7.7, 8.75, t + .6, 'talk', 'teal', { wrap: 'sun', face: 'sw' }));
      const [x, y] = H.p(6, 5.5, .12);
      for (let n = 0; n < 3; n++) {
        const u = ((t * .28 + n / 3) % 1);
        H.opacity((1 - u) * .6, () => H.outline(R, ell(x, y, 4 + u * 16, 2 + u * 7), 'paper', .8));
      }
    },
  };
}
