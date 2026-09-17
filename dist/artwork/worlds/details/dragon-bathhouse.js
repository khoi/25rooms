import { world, shape, oval, stroke, box, table, bench, actor, creature, steam, lantern, bottle, cycle, pool, ripple, TAU } from '../common.js';

function pipe(H, R, points, width = 5) {
  const p = points.map(([i, j, z]) => H.p(i, j, z));
  H.line(R, p, 'blue', width + 1.5, { amp: .1 });
  H.line(R, p, 'sun', width, { amp: .1, tone: .8 });
  H.line(R, p.map(([x, y]) => [x - 1, y - 1]), 'paper', .7, { amp: .1, tone: .8 });
}

function wheel(H, R, i, j, z, radius = 7) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y, radius, radius, 'coral', .9);
  oval(H, R, x, y, radius - 2, radius - 2, 'paper', 1);
  for (let k = 0; k < 4; k++) {
    const a = k * TAU / 4;
    stroke(H, R, [[x, y], [x + Math.cos(a) * radius, y + Math.sin(a) * radius]], 'coral', 1.5);
  }
  H.dot(x, y, 2, 'blue');
}

function towel(H, R, i, j, z, ink = 'paper', w = .65, d = .4) {
  box(H, R, i, j, w, d, z, .11, ink, ink === 'paper' ? 1 : .55);
  H.line(R, [H.p(i + w * .14, j + d, z + .08), H.p(i + w * .9, j + d, z + .08)], 'blue', .55, { tone: .7 });
  for (let k = 0; k < 4; k++) H.line(R, [H.p(i + .08 + k * w / 5, j + d, z), H.p(i + .08 + k * w / 5, j + d + .06, z - .02)], 'blue', .45);
}

function bucket(H, R, i, j, z = 0, ink = 'sun', size = 1) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 9 * size, y - 14 * size], [x + 9 * size, y - 14 * size], [x + 7 * size, y], [x - 7 * size, y]], ink, .6);
  oval(H, R, x, y - 14 * size, 9 * size, 3.6 * size, 'paper', 1);
  oval(H, R, x, y - 14 * size, 6.5 * size, 2.5 * size, 'teal', .55);
  stroke(H, R, [[x - 8 * size, y - 10 * size], [x - 8 * size, y - 22 * size], [x + 7 * size, y - 22 * size], [x + 8 * size, y - 10 * size]], 'blue', .8);
  for (let k = -1; k <= 1; k++) stroke(H, R, [[x + k * 4 * size, y - 10 * size], [x + k * 3 * size, y - 2 * size]], 'coral', .5);
}

function soap(H, R, i, j, z, ink = 'coral') {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y, 8, 4, 'paper', 1);
  oval(H, R, x, y - 2, 5, 2.8, ink, .6);
  H.line(R, [[x - 2, y - 3], [x + 2, y - 3]], 'paper', .7);
}

function brush(H, R, x, y, tilt = 0) {
  const dx = Math.sin(tilt), dy = Math.cos(tilt);
  stroke(H, R, [[x, y], [x + dx * 13, y - dy * 13]], 'sun', 3);
  oval(H, R, x + dx * 16, y - dy * 16, 6, 3.5, 'coral', .75);
  for (let k = -2; k <= 2; k++) stroke(H, R, [[x + dx * 16 + k * 2, y - dy * 16], [x + dx * 16 + k * 2, y - dy * 16 - 4]], 'blue', .6);
}

function slipper(H, R, i, j, ink = 'coral') {
  const [x, y] = H.p(i, j, .03);
  oval(H, R, x, y, 6.5, 3, ink, .65);
  oval(H, R, x + 2, y - 1, 3.5, 2, 'paper', 1);
  stroke(H, R, [[x - 1, y - 3], [x + 2, y + 1]], ink, 2.5);
}

function bubbles(H, R, x, y, t, count = 6, reach = 34) {
  for (let k = 0; k < count; k++) {
    const u = cycle(t + k * .55, 4.4);
    const bx = x + Math.sin(k * 1.7 + u * 2) * reach + u * 12;
    const by = y - u * 54;
    const r = 2 + u * 4;
    H.opacity(Math.sin(u * Math.PI) * .85, () => {
      oval(H, R, bx, by, r, r, 'paper', .9);
      stroke(H, R, [[bx - r * .45, by], [bx - r * .4, by - r * .5], [bx, by - r * .65]], 'teal', .65);
    });
  }
}

function duck(H, R, i, j, t, scale = 1) {
  const [x, y] = H.p(i, j, .16 + Math.sin(t * 2) * .015);
  oval(H, R, x, y, 7 * scale, 3.8 * scale, 'sun', .9);
  oval(H, R, x + 4 * scale, y - 5 * scale, 3.6 * scale, 4 * scale, 'sun', .9);
  shape(H, R, [[x + 7 * scale, y - 5 * scale], [x + 11 * scale, y - 4 * scale], [x + 7 * scale, y - 2.5 * scale]], 'coral', .8);
  H.dot(x + 5 * scale, y - 6 * scale, .8 * scale, 'blue');
}

export default function enrich(room) {
  const detailed = world(room.id, room.title, { floor: 'sun', tone: .25, wall: 'coral', wallStyle: 'tile', pattern: 'tiles', height: 3.5 }, (H, R) => {
    pool(H, R, 3.1, 3.5, 5.3, 4.1);
    pool(H, R, 9.1, 2.5, 2.3, 2.5);
    pool(H, R, 5.7, .8, 2, 1.9);
    shape(H, R, H.faceI(3.6, .1, 4.5, 2.85, 3.45), 'paper', 1);

    for (const i of [3.4, 8.15]) lantern(H, R, i, .35, 3.15, 'sun');
    pipe(H, R, [[1.6, 1.1, 2.4], [1.6, .45, 2.55], [5.2, .45, 2.55], [5.2, .45, .45], [5.2, 3.5, .45], [5.2, 3.5, .2]]);
    pipe(H, R, [[5.2, .45, 2.55], [8.4, .45, 2.55], [8.4, 1.8, 2.55], [9.25, 2.55, 2.55], [9.25, 2.55, .5]], 3.5);
    wheel(H, R, 5.2, .45, 1.9);
    wheel(H, R, 8.4, .6, 2.5, 5);
    const [bx, by] = H.p(1.8, 1.7, 0);
    box(H, R, .7, .7, 2.1, 1.6, 0, .26, 'blue', .6);
    shape(H, R, [[bx - 26, by - 12], [bx - 29, by - 83], [bx - 18, by - 99], [bx + 20, by - 99], [bx + 29, by - 83], [bx + 26, by - 12]], 'sun', .65);
    oval(H, R, bx, by - 90, 27, 10, 'sun', .55);
    oval(H, R, bx, by - 15, 25, 8, 'coral', .55);
    for (const dy of [-79, -39]) {
      stroke(H, R, [[bx - 27, by + dy], [bx, by + dy + 7], [bx + 27, by + dy]], 'blue', 2);
      for (let k = -2; k <= 2; k++) H.dot(bx + k * 10, by + dy + 4, 1.3, 'paper');
    }
    oval(H, R, bx + 5, by - 63, 11, 11, 'paper', 1);
    for (let k = 0; k < 5; k++) {
      const a = Math.PI + k * Math.PI / 4;
      H.line(R, [[bx + 5 + Math.cos(a) * 7, by - 63 + Math.sin(a) * 7], [bx + 5 + Math.cos(a) * 9, by - 63 + Math.sin(a) * 9]], 'blue', .6);
    }
    shape(H, R, [[bx - 16, by - 32], [bx + 13, by - 32], [bx + 13, by - 9], [bx - 16, by - 9]], 'blue', .85);
    for (let k = -1; k <= 1; k++) H.line(R, [[bx + k * 8, by - 32], [bx + k * 8, by - 9]], 'sun', 1.4);

    wheel(H, R, 2.8, 1.6, 1.15, 8);
    bucket(H, R, 3.15, 1.05, 0, 'blue', .75);
    for (let k = 0; k < 6; k++) {
      const [x, y] = H.p(2.3 + k % 3 * .23, 2.65 + Math.floor(k / 3) * .19, .13);
      oval(H, R, x, y, 6, 2.2, 'coral', .7);
      oval(H, R, x + 4, y, 2.1, 2.1, 'sun', .7);
    }
    stroke(H, R, [H.p(2.9, 2.8, 0), H.p(2.9, 2.8, .85)], 'blue', 2);
    const [sx, sy] = H.p(2.9, 2.8, 0);
    shape(H, R, [[sx - 4, sy], [sx + 5, sy], [sx + 7, sy - 8], [sx - 3, sy - 8]], 'blue', .7);
    pipe(H, R, [[6.15, .98, .3], [6.15, .98, 2.8], [6.7, 1.6, 2.8]], 3);
    const [shx, shy] = H.p(6.7, 1.6, 2.8);
    oval(H, R, shx, shy, 13, 4.5, 'paper', 1);
    for (let k = -2; k <= 2; k++) H.dot(shx + k * 4, shy + 1, .7, 'blue');
    wheel(H, R, 6.15, .98, .9, 4);
    soap(H, R, 7.3, 1.1, .15, 'sun');
    bottle(H, R, ...H.p(7.3, .9, .14), 'coral', .4);
    for (let k = 0; k < 3; k++) {
      const j = 3.0 + k * 1.02;
      box(H, R, .2, j, 1, .94, 0, 2.0, 'teal', .43);
      const door = H.faceJ(1.21, j + .08, .77, .17, 1.83);
      H.outline(R, door, 'blue', .75, { tone: .8 });

      H.dot(...H.p(1.24, j + .72, .96), 1.9, 'sun');
      for (let n = 0; n < 3; n++) H.line(R, [H.p(1.23, j + .18, 1.36 - n * .12), H.p(1.23, j + .65, 1.36 - n * .12)], 'blue', .65);
    }
    for (let k = 0; k < 3; k++) {
      const [x, y] = H.p(.12, 6.1 + k * .6, 2.35);
      stroke(H, R, [[x, y - 3], [x, y + 4], [x + 5, y + 1]], 'blue', 1.2);
      shape(H, R, [[x - 9, y + 7], [x + 7, y + 4], [x + 10, y + 33], [x - 6, y + 36]], k % 2 ? 'coral' : 'paper', k % 2 ? .5 : 1);
      for (const dy of [26, 29]) H.line(R, [[x - 6, y + dy], [x + 8, y + dy - 3]], 'teal', 1.2);
    }
    table(H, R, 1.4, 7.7, 2.2, 1.3, .57, 'sun');
    shape(H, R, H.tile(1.55, 7.8, 1.9, 1.05, .72), 'paper', 1);
    for (let k = 0; k < 4; k++) H.line(R, [H.p(1.6, 7.9 + k * .22, .74), H.p(3.3, 7.9 + k * .22, .74)], 'teal', .55, { tone: .4 });
    table(H, R, .3, 9.3, 1.6, .85, .6, 'teal');
    for (let k = 0; k < 3; k++) bottle(H, R, ...H.p(.52 + k * .4, 9.5, .76), ['teal', 'coral', 'sun'][k], .37);
    soap(H, R, 1.5, 9.75, .74);
    brush(H, R, ...H.p(.7, 10.0, .74), 1.3);
    bucket(H, R, 2.05, 9.6, 0, 'coral', .8);
    const [hx, hy] = H.p(.9, 10.7, .06);
    for (let k = 0; k < 3; k++) oval(H, R, hx + k * 8, hy - k * 2, 3, 1.8, 'sun', .6);
    bench(H, R, 4.3, 10.15, 3.4, 'coral');
    for (let k = 0; k < 9; k++) towel(H, R, 4.5 + k % 3 * .87, 10.32, .7 + Math.floor(k / 3) * .13, k % 3 === 1 ? 'teal' : 'paper', .72, .46);
    box(H, R, 3.65, 10.3, .65, .75, 0, .65, 'sun', .55);
    for (let k = 0; k < 5; k++) H.line(R, [H.p(3.69 + k * .13, 11.06, .08), H.p(3.69 + k * .13, 11.06, .62)], 'blue', .6);
    towel(H, R, 3.56, 10.5, .62, 'coral', .65, .5);
    for (const [i, j, ink] of [[4.2, 11.35, 'teal'], [4.52, 11.4, 'teal'], [7.3, 11.2, 'coral'], [7.6, 11.25, 'coral'], [8.8, 5.7, 'sun'], [9.05, 5.85, 'sun']]) slipper(H, R, i, j, ink);
    table(H, R, 9.7, 6.3, 1.45, 1.8, .9, 'teal');
    for (const i of [9.88, 10.98]) for (const j of [6.48, 7.82]) oval(H, R, ...H.p(i, j, .05), 4, 5, 'blue', .8);
    box(H, R, 9.8, 6.45, 1.22, 1.45, .36, .08, 'sun', .5);
    for (let k = 0; k < 5; k++) bottle(H, R, ...H.p(10 + k % 3 * .35, 6.75 + Math.floor(k / 3) * .6, .49), 'coral', .34);
    const [tx, ty] = H.p(10.45, 6.67, 1.02);
    oval(H, R, tx, ty, 13, 6, 'paper', 1);
    for (let k = 0; k < 5; k++) {
      const x = tx - 8 + k % 3 * 7, y = ty - Math.floor(k / 3) * 5;
      oval(H, R, x, y - 3, 4, 3.5, 'sun', .8);
      stroke(H, R, [[x - 2, y - 5], [x, y - 3], [x + 1, y - 6]], 'coral', .6);
    }
    const [kx, ky] = H.p(10.5, 7.4, 1.04);
    oval(H, R, kx, ky - 7, 8, 9, 'coral', .6);
    oval(H, R, kx, ky - 15, 6, 2, 'sun', .9);
    H.dot(kx, ky - 18, 2, 'blue');
    stroke(H, R, [[kx + 6, ky - 10], [kx + 14, ky - 17], [kx + 14, ky - 20]], 'coral', 3);
    stroke(H, R, [[kx - 6, ky - 12], [kx - 14, ky - 13], [kx - 14, ky - 3], [kx - 6, ky - 3]], 'blue', 1.2);
    for (let k = 0; k < 3; k++) {
      const [x, y] = H.p(9.95 + k * .35, 7.85, 1.04);
      shape(H, R, [[x - 3, y - 7], [x + 3, y - 7], [x + 2, y], [x - 2, y]], 'paper', 1);
      oval(H, R, x, y - 7, 3, 1.2, 'coral', .7);
    }

    bench(H, R, 9.05, 9.9, 2.0, 'sun');
    towel(H, R, 10.4, 10.15, .69, 'paper', .6, .4);
    box(H, R, 10.2, .6, .9, .7, 0, .6, 'teal', .5);
    for (let k = 0; k < 4; k++) towel(H, R, 10.25, .69, .61 + k * .12, k % 2 ? 'paper' : 'coral', .7, .45);
    bucket(H, R, 11.25, 1.5, 0, 'sun', .65);
    bottle(H, R, ...H.p(8.95, 1.75, .12), 'teal', .45);
    soap(H, R, 11.25, 5.35, .1, 'sun');
    for (const [i, j] of [[8.7, 4.8], [3, 7.9], [7.8, 2.9]]) {
      const [x, y] = H.p(i, j, .03);
      oval(H, R, x, y, 7, 3, 'blue', .35);
      for (let k = -2; k <= 2; k++) H.line(R, [[x - 5, y + k], [x + 5, y + k]], 'paper', .55);
    }
    for (const i of [3.45, 7.85]) {
      pipe(H, R, [[i, 7.63, .05], [i, 7.63, .77], [i, 7.17, .77], [i, 6.85, .17]], 2);
    }
    for (let k = 0; k < 4; k++) H.line(R, [H.p(7.85, 7.08 - k * .13, .15), H.p(8.23, 7.08 - k * .13, .15)], 'paper', 2.5);
  }, (H, R, t) => {
    const [bx, by] = H.p(1.8, 1.7, 0);
    const flicker = Math.sin(t * 9) * 3;
    shape(H, R, [[bx - 12, by - 11], [bx - 11, by - 22], [bx - 5, by - 18], [bx - 1, by - 29 - flicker], [bx + 3, by - 19], [bx + 9, by - 25 + flicker], [bx + 11, by - 11]], 'coral', .85);
    shape(H, R, [[bx - 8, by - 11], [bx - 3, by - 23 + flicker], [bx + 1, by - 16], [bx + 6, by - 21], [bx + 8, by - 11]], 'sun', 1);
    for (let k = -1; k <= 1; k++) H.line(R, [[bx + k * 8, by - 32], [bx + k * 8, by - 9]], 'sun', 1.4);
    stroke(H, R, [[bx + 5, by - 63], [bx + 9 + Math.sin(t) * 2, by - 69]], 'coral', 1.5);
    steam(H, R, ...H.p(1.8, 1.2, 2.8), t, 2);
    H.at(3.2, 2.1, 0, HH => {
      actor(HH, R, 3.2, 2.1, t, 'reach', { shirt: ['teal', .6], hat: true }, 0, .87);
      const [x, y] = HH.p(3.2, 2.1, .9);
      stroke(HH, R, [[x - 3, y], [x - 16, y - 2 + Math.sin(t * 2) * 3]], 'blue', 2);
    });
    const [shx, shy] = H.p(6.7, 1.6, 2.8);
    for (let k = 0; k < 7; k++) {
      const u = cycle(t * 1.5 + k * .16, .85);
      const x = shx + (k - 3) * (2.2 + u);
      H.line(R, [[x, shy + 8 + u * 61], [x + .5, shy + 13 + u * 61]], 'teal', .75, { tone: .7 });
    }
    H.at(6.7, 1.9, .12, HH => {
      creature(HH, R, ...HH.p(6.7, 1.9, .14), 'dragon', t, .7, 'coral');
      const [x, y] = HH.p(6.7, 1.9, .14);
      for (let k = 0; k < 5; k++) oval(HH, R, x + 4 + k * 4, y - 30 - Math.sin(k * 2) * 2, 3, 2.2, 'paper', 1);
    });
    for (const [i, j, ink, phase, size] of [[4.7, 5.0, 'teal', 0, 1.0], [6.9, 6.35, 'coral', 2, .91]]) {
      ripple(H, R, i, j, t + phase, 33);
      H.at(i, j, .2, HH => {
        creature(HH, R, ...HH.p(i, j, .25 + Math.sin(t + phase) * .035), 'dragon', t, size, ink);
        const [x, y] = HH.p(i, j, .25);
        for (let k = 0; k < 4; k++) oval(HH, R, x - 17 + k * 8, y - 8, 4.3, 2.8, 'paper', .85);
        if (phase === 0) {
          oval(HH, R, x + 18, y - 43, 8, 4, 'paper', 1);
          stroke(HH, R, [[x + 12, y - 45], [x + 19, y - 47], [x + 24, y - 43]], 'teal', 1);
        } else {
          bubbles(HH, R, x + 30, y - 24, t, 6, 19);
          const sneeze = cycle(t, 8);
          if (sneeze > .72 && sneeze < .9) {
            const u = (sneeze - .72) / .18;
            for (let k = 0; k < 5; k++) {
              const dx = 28 + u * 38 + k * 3;
              oval(HH, R, x + dx, y - 25 + (k - 2) * u * 9, 2.8 * (1 - u) + 1, 2.8 * (1 - u) + 1, 'paper', 1);
            }
            stroke(HH, R, [[x + 40, y - 28], [x + 49 + u * 14, y - 31]], 'sun', 1.5);
          }
        }
      });
    }
    duck(H, R, 5.9 + Math.sin(t * .7) * .2, 4.1, t);
    steam(H, R, ...H.p(4.0, 4.1, .7), t, 2);
    ripple(H, R, 10.2, 3.8, t, 21);
    for (const [i, j, ink, phase] of [[9.8, 3.3, 'sun', 0], [10.65, 4.25, 'teal', 2]]) {
      H.at(i, j, .14, HH => {
        const hop = Math.max(0, Math.sin(t * 2 + phase)) * .05;
        creature(HH, R, ...HH.p(i, j, .18 + hop), 'dragon', t, .48, ink);
        const [x, y] = HH.p(i, j, .2 + hop);
        oval(HH, R, x, y - 2, 13, 4.5, 'coral', .7);
        oval(HH, R, x, y - 3, 7, 2.6, 'teal', .5);
      });
    }
    duck(H, R, 10.8, 2.85, t + 2, .7);
    bubbles(H, R, ...H.p(9.7, 3.4, .4), t + 1, 4, 15);
    H.at(8.6, 3.0, 0, HH => {
      actor(HH, R, 8.6, 3.0, t, 'kneel', { shirt: ['paper', 1], pants: ['teal', .65] }, 0, .88);
      const [x, y] = HH.p(8.7, 3.2, .6);
      stroke(HH, R, [[x, y], [x + 14, y - 8]], 'sun', 1.3);
      oval(HH, R, x + 15, y - 9, 4, 4, 'paper', .5);
    });
    H.at(2.6, 8.4, .73, HH => {
      creature(HH, R, ...HH.p(2.6, 8.4, .75), 'dragon', t, .72, 'sun');
      const [x, y] = HH.p(2.6, 8.4, .75);
      shape(HH, R, [[x - 11, y - 19], [x + 6, y - 23], [x + 13, y - 8], [x - 5, y - 4]], 'paper', 1);
      for (let k = 0; k < 3; k++) stroke(HH, R, [[x - 8, y - 16 + k * 3], [x + 7, y - 19 + k * 3]], 'coral', .65);
    });
    H.at(3.5, 9.0, 0, HH => {
      actor(HH, R, 3.5, 9.0, t, 'reach', { shirt: ['teal', .7], apron: true }, 0, .96);
      const [x, y] = HH.p(3.1, 8.8, 1.1);
      brush(HH, R, x - 2 + Math.sin(t * 3) * 5, y, -.5);
    });
    H.at(6.75, 9.2, 0, HH => {
      actor(HH, R, 6.75, 9.2, t, 'idle', { shirt: ['coral', .6], apron: true }, 0, .9);
      const [x, y] = HH.p(6.75, 9.2, .9);
      const fold = Math.sin(t * 1.7) * 3;
      shape(HH, R, [[x - 14, y - 3], [x + 10, y - 1], [x + 8 - fold, y + 12], [x - 12 + fold, y + 9]], 'paper', 1);
      H.line(R, [[x - 12, y + 6], [x + 8, y + 8]], 'teal', 1.3);
    });
    H.at(9.85, 10.15, .68, HH => {
      creature(HH, R, ...HH.p(9.85, 10.15, .7), 'dragon', t, .67, 'teal');
      const [x, y] = HH.p(9.85, 10.15, .7);
      oval(HH, R, x + 26, y - 14 + Math.sin(t * 1.4) * 2, 5, 4, 'sun', .8);
      stroke(HH, R, [[x + 23, y - 16], [x + 26, y - 13], [x + 28, y - 17]], 'coral', .65);
    });
    H.at(11.3, 8.8, 0, HH => {
      actor(HH, R, 11.3, 8.8, t, 'idle', { shirt: ['paper', 1], pants: ['coral', .65] }, 0, .86);
      const [x, y] = HH.p(11.3, 8.8, 1);
      oval(HH, R, x - 9, y + 3, 8, 2.5, 'sun', .8);
      oval(HH, R, x - 9, y, 3, 3, 'coral', .7);
    });
    steam(H, R, ...H.p(10.5, 7.4, 1.5), t + 3, 1);
  });
  return { ...room, under: detailed.under, live: detailed.live };
}
