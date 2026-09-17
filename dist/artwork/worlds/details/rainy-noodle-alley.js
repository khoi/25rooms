import { actor, box, table, oval, shape, stroke, label, plaque, bottle, steam, lantern, curve, cycle, ripple, wallRect, windowOn } from '../common.js';

function bowl(H, R, i, j, z = 1.1, ink = 'coral', size = 1) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 10 * size, y], [x - 7 * size, y + 8 * size], [x + 6 * size, y + 8 * size], [x + 10 * size, y]], ink, .82);
  oval(H, R, x, y, 10 * size, 4 * size, 'paper', 1);
  oval(H, R, x, y, 7.5 * size, 2.5 * size, 'sun', .65);
  for (let k = 0; k < 3; k++) stroke(H, R, [[x - 5 + k * 4, y - 1], [x - 3 + k * 3, y + 2], [x - 1 + k * 3, y]], 'coral', .5);
  H.dot(x + 2 * size, y - 1, 2.1 * size, 'teal', .9);
  H.line(R, [[x + 3 * size, y], [x + 15 * size, y - 9 * size]], 'blue', .9);
  H.line(R, [[x + 6 * size, y + 1], [x + 17 * size, y - 7 * size]], 'blue', .9);
}

function plates(H, R, i, j, z, count = 4) {
  const [x, y] = H.p(i, j, z);
  for (let n = 0; n < count; n++) oval(H, R, x, y - n * 2.2, 9, 3, 'paper', 1);
  oval(H, R, x, y - (count - 1) * 2.2, 6, 1.5, 'teal', .3);
}

function cup(H, R, i, j, z, ink = 'paper') {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 4, y - 9], [x + 4, y - 9], [x + 3, y], [x - 3, y]], ink, .85);
  oval(H, R, x, y - 9, 4, 1.7, 'blue', .7);
}

function crate(H, R, i, j, type, ink = 'coral') {
  box(H, R, i, j, 1.1, .85, 0, .45, ink, .7);
  for (const z of [.13, .3]) H.line(R, [H.p(i, j + .86, z), H.p(i + 1.1, j + .86, z)], 'blue', .75);
  for (let n = 0; n < 6; n++) {
    const [x, y] = H.p(i + .22 + n % 3 * .3, j + .2 + Math.floor(n / 3) * .35, .48);
    if (type === 'greens') {
      for (let s = 0; s < 3; s++) stroke(H, R, [[x, y], [x - 6 + s * 5, y - 13], [x - 3 + s * 4, y - 18]], 'teal', 3);
      H.line(R, [[x, y], [x + 1, y - 10]], 'paper', 1.1);
    } else if (type === 'eggs') oval(H, R, x, y - 3, 3, 4, 'paper', 1);
    else {
      oval(H, R, x, y - 3, 4.5, 4.2, type === 'onions' ? 'sun' : 'coral', .85);
      stroke(H, R, [[x, y - 6], [x + 1, y - 10], [x + 4, y - 8]], 'teal', .8);
    }
  }
}

function bicycle(H, R, i, j, ink, bag = false) {
  const [x, y] = H.p(i, j, .1);
  for (const dx of [-23, 23]) {
    oval(H, R, x + dx, y, 14, 14, 'blue', .9);
    oval(H, R, x + dx, y, 11, 11, 'paper', .6);
    for (let k = 0; k < 8; k++) H.line(R, [[x + dx, y], [x + dx + Math.cos(k * Math.PI / 4) * 11, y + Math.sin(k * Math.PI / 4) * 11]], 'blue', .4);
  }
  stroke(H, R, [[x - 23, y], [x - 8, y - 25], [x + 3, y], [x - 23, y], [x + 15, y - 24], [x + 3, y], [x + 23, y], [x + 13, y - 33]], ink, 2.8);
  stroke(H, R, [[x + 13, y - 33], [x + 20, y - 35], [x + 24, y - 30]], 'blue', 2);
  H.line(R, [[x - 15, y - 26], [x - 2, y - 26]], 'blue', 3);
  H.line(R, [[x + 3, y], [x + 10, y + 3]], 'blue', 2);
  H.line(R, [[x - 32, y - 19], [x - 12, y - 19]], 'blue', 2);
  if (bag) {
    shape(H, R, [[x - 35, y - 21], [x - 13, y - 21], [x - 13, y - 43], [x - 35, y - 43]], 'sun', .9);
    H.line(R, [[x - 34, y - 37], [x - 14, y - 37]], 'coral', 1.5);
    label(H, 'SOUP', x - 24, y - 29, 5);
  }
}

function stool(H, R, i, j, ink = 'coral') {
  for (const x of [-.2, .2]) for (const y of [-.18, .18]) H.line(R, [H.p(i + x, j + y), H.p(i + x * .8, j + y * .8, .48)], 'blue', 1.5);
  oval(H, R, ...H.p(i, j, .5), 11, 5, ink, .8);
}

function cook(H, R, i, j, t, activity, ink = 'paper') {
  actor(H, R, i, j, t, activity === 'chop' ? 'water' : 'hold', {
    shirt: [ink, .9], apron: ['paper', 1], hairStyle: 'cap',
    prop: (HH, RR, p) => {
      if (activity === 'pull') {
        const y = p.chest[1] - 5 + Math.sin(t * 2) * 6;
        for (const side of [-1, 1]) {
          stroke(HH, RR, [[p.chest[0] + side * 5, p.chest[1]], [p.chest[0] + side * 15, y + 4], [p.chest[0] + side * 24, y]], ink, 5);
          oval(HH, RR, p.chest[0] + side * 24, y, 2.4, 2.2, 'coral', .4);
        }
        for (let n = 0; n < 7; n++) stroke(HH, RR, [[p.chest[0] - 23, y + n * .9], [p.chest[0] - 10, y + 18 + n], [p.chest[0] + 8, y + 21 + n], [p.chest[0] + 24, y + n * .9]], 'sun', 1.1);
      } else if (activity === 'wok') {
        const x = p.nearHand[0] + 20, y = p.nearHand[1] + 5;
        HH.line(RR, [p.nearHand, [x - 6, y]], 'blue', 3);
        shape(HH, RR, [[x - 14, y], [x - 9, y + 10], [x + 9, y + 10], [x + 16, y]], 'blue', .9);
        oval(HH, RR, x, y, 15, 4.5, 'teal', .7);
        const jump = Math.max(0, Math.sin(t * 3));
        for (let n = 0; n < 8; n++) {
          const px = x - 10 + n * 3, py = y - 5 - jump * (12 + (n % 3) * 5);
          HH.line(RR, [[px, py], [px + 4, py - 3]], n % 3 === 0 ? 'teal' : 'sun', 1.8);
        }
      } else if (activity === 'chop') {
        const x = p.nearHand[0] + 6, y = p.nearHand[1] + Math.sin(t * 9) * 4;
        HH.line(RR, [p.nearHand, [x, y]], 'blue', 2);
        shape(HH, RR, [[x, y - 7], [x + 12, y - 5], [x + 11, y + 3], [x, y + 1]], 'paper', 1);
      } else if (activity === 'wash') {
        const x = p.nearHand[0] + 4, y = p.nearHand[1];
        oval(HH, RR, x, y, 8, 7, 'paper', 1);
        oval(HH, RR, x, y, 5, 4.5, 'teal', .2);
        HH.dot(x - 4 + Math.sin(t * 7) * 4, y, 3, 'sun', .85);
      }
    }
  }, .15, 1.15);
}

export default function enrich(room) {
  return {
    ...room,
    under(H, R) {
      room.under.call(this, H, R);
      windowOn(H, R, 'nw', 5.4, 2.15, 1.45, 1.25, { frameInk: 'coral', skyTone: .7 });
      windowOn(H, R, 'nw', 9.1, 2.2, 1.5, 1.3, { frameInk: 'sun', skyTone: .7 });
      for (const j of [3.7, 8]) {
        stroke(H, R, [H.p(.05, j, 3.75), H.p(.05, j, .35), H.p(.45, j, .12)], 'blue', 5);
        stroke(H, R, [H.p(.07, j, 3.75), H.p(.07, j, .35)], 'paper', 1.1);
        for (const z of [.7, 1.9, 3.1]) H.line(R, [H.p(.05, j - .13, z), H.p(.05, j + .13, z)], 'coral', 2);
      }
      const menu = wallRect(H, 'nw', 6.6, 7.65, 1.1, 2.7);
      shape(H, R, menu, 'paper', .95);
      const [mx, my] = H.p(.02, 7.14, 2.4);
      label(H, 'MENU', mx, my, 8, '#ee6852', -.46);
      for (let n = 0; n < 5; n++) H.line(R, [H.p(.02, 6.8, 2.12 - n * .18), H.p(.02, 7.4, 2.12 - n * .18)], 'blue', .7);
      stroke(H, R, [H.p(.15, 4.6, 3.65), H.p(.3, 7.2, 3.25), H.p(.1, 10.8, 3.55)], 'blue', 1);
      for (let n = 0; n < 5; n++) {
        const j = 5.2 + n * 1.05, z = 3.45 - Math.sin(n / 4 * Math.PI) * .16;
        const [x, y] = H.p(.2, j, z);
        shape(H, R, [[x - 9, y], [x + 9, y + 7], [x + 7, y + 24], [x - 10, y + 17]], n % 2 ? 'coral' : 'paper', .8);
        H.line(R, [[x - 6, y - 1], [x - 6, y + 4]], 'sun', 2);
        H.line(R, [[x + 6, y + 4], [x + 6, y + 9]], 'sun', 2);
      }
      for (const [i, j, w, d] of [[.6, 10.9, 2.6, .4], [8.7, 10.7, 2.2, .45], [10.8, 5.2, .5, 2.6]]) {
        shape(H, R, H.tile(i, j, w, d, .035), 'blue', .95);
        for (let n = .12; n < w; n += .2) H.line(R, [H.p(i + n, j, .05), H.p(i + n, j + d, .05)], 'paper', .8);
      }
      for (let n = 0; n < 3; n++) {
        const [x, y] = H.p(.8 + n * .5, 1.12, 1.8);
        bottle(H, R, x, y, n % 2 ? 'coral' : 'teal', .42);
      }
      for (const [i, j] of [[5, 3], [6.6, 3], [10.1, 3]]) {
        cup(H, R, i, j, 1.35, 'coral');
        const [x, y] = H.p(i, j, 1.35);
        for (let n = 0; n < 5; n++) H.line(R, [[x - 3 + n, y - 8], [x - 5 + n * 2, y - 22]], 'sun', .9);
      }
      table(H, R, .8, 5.6, 2.5, 1.2, .85, 'teal');
      shape(H, R, H.tile(1.2, 5.9, 1.1, .65, 1), 'sun', .72);
      for (let n = 0; n < 8; n++) {
        const [x, y] = H.p(1.5 + n % 4 * .14, 6.05 + Math.floor(n / 4) * .18, 1.025);
        oval(H, R, x, y, 2.2, 1.3, 'teal', .85);
      }
      bowl(H, R, 2.8, 6.25, 1, 'paper', .65);
      plates(H, R, 1, 6, 1, 3);
      crate(H, R, .6, 8.3, 'greens');
      crate(H, R, .8, 9.45, 'onions', 'sun');
      crate(H, R, 2.1, 9.6, 'eggs');
      crate(H, R, .6, 7.2, 'tomatoes', 'sun');
      for (let n = 0; n < 3; n++) {
        const [x, y] = H.p(2 + n * .42, 5.78, 1.03);
        bottle(H, R, x, y, n % 2 ? 'coral' : 'teal', .34);
      }
      table(H, R, 4.5, 4.7, 2.4, 1.25, .9, 'sun');
      shape(H, R, H.tile(4.75, 4.95, 1.6, .65, 1.04), 'paper', .98);
      for (let n = 0; n < 6; n++) {
        const [x, y] = H.p(5 + n * .19, 5.45, 1.06);
        oval(H, R, x, y, 4, 1.8, 'sun', .8);
      }
      const [rx, ry] = H.p(6.25, 5.1, 1.1);
      H.line(R, [[rx - 10, ry - 6], [rx + 10, ry + 5]], 'coral', 4);
      plates(H, R, 6.55, 5.7, 1.05, 4);
      plaque(H, R, 5.7, 6, .57, 'HAND PULLED', 'paper', 72);
      box(H, R, 4.8, 5.1, .7, .6, 0, .48, 'paper', .9);
      label(H, 'FLOUR', ...H.p(5.15, 5.72, .25), 6);
      box(H, R, 10, 4.4, 1.4, 2.0, 0, .88, 'teal', .65);
      shape(H, R, H.tile(10.17, 4.7, .96, 1.08, .9), 'blue', .7);
      shape(H, R, H.tile(10.27, 4.8, .76, .88, .91), 'paper', .65);
      stroke(H, R, [H.p(10.2, 4.55, .9), H.p(10.2, 4.55, 1.6), H.p(10.5, 4.75, 1.6), H.p(10.5, 4.75, 1.3)], 'blue', 2.5);
      plates(H, R, 10.65, 6.13, .99, 7);
      cup(H, R, 11.13, 6.1, .99, 'sun');
      box(H, R, 11.5, 4.5, .33, .8, 0, .7, 'coral', .8);
      const [bx, by] = H.p(11.65, 5.2, .75);
      oval(H, R, bx, by, 8, 4, 'blue', .9);
      for (const [i, j, ink] of [[8.25, 7.5, 'coral'], [4.25, 8.45, 'sun']]) {
        table(H, R, i, j, 2.3, 1.15, .78, ink);
        bowl(H, R, i + .55, j + .4, .92, 'paper', .8);
        bowl(H, R, i + 1.65, j + .85, .92, 'coral', .8);
        bottle(H, R, ...H.p(i + 1.1, j + .65, .92), 'coral', .32);
        cup(H, R, i + .3, j + .8, .92, 'paper');
        cup(H, R, i + 1.8, j + .3, .92, 'sun');
        shape(H, R, H.tile(i + 1.3, j + .25, .4, .4, .925), 'paper', .95);
        stool(H, R, i + .6, j - .38, ink);
        stool(H, R, i + 1.65, j + 1.5, ink);
      }
      bicycle(H, R, 3.1, 10.7, 'coral', true);
      bicycle(H, R, 8.2, 10.5, 'teal');
      box(H, R, 10.6, 8.95, .8, .6, 0, .68, 'sun', .8);
      box(H, R, 10.65, 9, .7, .5, .7, .4, 'paper', .95);
      H.line(R, [H.p(10.9, 9, .7), H.p(10.9, 9.5, 1.1)], 'coral', 2);
      bowl(H, R, 9.8, 10.7, .1, 'coral', .55);
      stool(H, R, 3.8, 7.1, 'sun');
      const [ux, uy] = H.p(.4, 10.4, .1);
      oval(H, R, ux, uy - 11, 9, 6, 'teal', .8);
      for (const dx of [-5, 0, 5]) stroke(H, R, [[ux + dx, uy - 14], [ux + dx - 2, uy - 38], [ux + dx + 3, uy - 42]], 'coral', 2.2);
      lantern(H, R, .4, 9.7, 2.3, 'coral');
    },
    live(H, R, t) {
      cook(H, R, 2.5, 2.4, t, 'wok');
      cook(H, R, 8.2, 2.45, t + 1.2, 'wok', 'coral');
      cook(H, R, 1.85, 5.5, t, 'chop', 'sun');
      cook(H, R, 5.6, 4.6, t, 'pull', 'teal');
      cook(H, R, 10.6, 4.1, t, 'wash', 'coral');
      for (const [i, j, ink, phase] of [[8.85, 7.12, 'paper', 0], [9.9, 9, 'sun', 1.1], [4.85, 8.05, 'coral', 2.1], [5.9, 9.95, 'teal', .8]]) {
        actor(H, R, i, j, t + phase, 'drink', {
          shirt: [ink, .85], hairStyle: phase > 1 ? 'bun' : 'short', glasses: phase === 0,
          prop: (HH, RR, p) => {
            const [x, y] = p.nearHand;
            shape(HH, RR, [[x - 5, y - 2], [x + 6, y - 2], [x + 3, y + 4], [x - 3, y + 4]], 'paper', 1);
            stroke(HH, RR, [[x + 3, y - 2], [x + 9, y - 9]], 'blue', .7);
          }
        }, .25, 1.05, phase === 0 ? 'elder' : 'adult');
      }
      actor(H, R, 7.05, 10.25, t, 'phone', { shirt: ['sun', .9], hairStyle: 'cap' }, .15, 1.1);
      actor(H, R, 3.05, 7.8, t, 'talk', { shirt: ['teal', .85] }, .1, 1.1);
      const [ux, uy] = H.p(3.05, 7.8, 1.9);
      const umbrella = curve([[ux - 30, uy], [ux - 22, uy - 16], [ux, uy - 24], [ux + 23, uy - 16], [ux + 31, uy]], 3);
      shape(H, R, umbrella.concat([[ux + 15, uy - 4], [ux, uy + 1], [ux - 15, uy - 4]]), 'sun', .86);
      H.line(R, [[ux, uy - 21], [ux, uy + 32]], 'blue', 1.2);
      actor(H, R, 9.65, 10.5, t, 'idle', { fur: ['coral', .8] }, .06, .87, 'cat');
      actor(H, R, 1.5, 8.75, t + 1.5, 'idle', { fur: ['paper', 1] }, .5, .7, 'cat');
      for (const [i, j] of [[2.6, 3], [8.8, 3], [5.65, 5.5], [8.9, 7.9]]) steam(H, R, ...H.p(i, j, 1.15), t + i, 2);
      const [fx, fy] = H.p(10.5, 4.75, 1.3);
      H.line(R, [[fx, fy], [fx, fy + 13]], 'paper', 1.2, { tone: .65 });
      for (let n = 0; n < 5; n++) {
        const u = cycle(t + n * .5, 2), [x, y] = H.p(10.55 + Math.sin(n) * .2, 5 + Math.cos(n) * .2, .95 + u * .2);
        H.opacity(1 - u, () => oval(H, R, x, y, 1.6 + u * 2, 1.6 + u * 2, 'paper', .8));
      }
      for (const [i, j] of [[3.8, 9.6], [7.4, 6.6], [10.8, 10.4], [2.1, 11.3]]) ripple(H, R, i, j, t + i, 16, 'paper');
      for (let k = 0; k < 75; k++) {
        const u = cycle(t * 2 + k * .31, 3), [x, y] = H.p((k * 1.73) % 12, (k * 2.31) % 12, 4 * (1 - u));
        H.line(R, [[x, y], [x - 3, y + 10]], 'paper', .65, { tone: .55 });
      }
    }
  };
}
