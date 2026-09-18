import { world, shape, oval, stroke, box, table, bench, actor, steam, bottle, inks, ell, TAU, windowOn, plant, rug } from '../common.js';

function towel(H, R, i, j, z, ink, w = .7, d = .6) {
  box(H, R, i, j, w, d, z, .075, ink, .62);
  H.line(R, [H.p(i + .1, j + d, z + .04), H.p(i + w - .1, j + d, z + .04)], 'paper', 1.1);
}

function garment(H, R, x, y, ink, s = 1, sway = 0) {
  const p = [[-9, 0], [-17, 7], [-12, 15], [-8, 11], [-9 + sway, 31], [10 + sway, 31], [9, 11], [13, 15], [18, 7], [9, 0], [4, 4], [-3, 4]].map(([a, b]) => [x + a * s, y + b * s]);
  shape(H, R, p, ink, .64, .7);
  stroke(H, R, [[x - 3 * s, y + 4 * s], [x, y + 7 * s], [x + 4 * s, y + 4 * s]], 'blue', .7);
  for (const d of [12, 19, 26]) H.line(R, [[x - 8 * s, y + d * s], [x + 9 * s, y + d * s]], 'paper', .8, { tone: .7 });
}

function basket(H, R, i, j, ink, n = 6) {
  const w = 1.12, d = .96;
  for (const [a, b] of [[.12, .12], [.9, .12], [.12, .8], [.9, .8]]) oval(H, R, ...H.p(i + a, j + b, .12), 3, 4, 'blue');
  box(H, R, i, j, w, d, .24, .73, ink, .27);
  for (let q = 1; q < 6; q++) {
    H.line(R, [H.p(i + q * w / 6, j + d, .3), H.p(i + q * w / 6, j + d, .9)], 'blue', .75);
    H.line(R, [H.p(i + w, j + q * d / 6, .3), H.p(i + w, j + q * d / 6, .9)], 'blue', .75);
  }
  for (const z of [.43, .62, .81]) {
    H.line(R, [H.p(i, j + d, z), H.p(i + w, j + d, z), H.p(i + w, j, z)], 'blue', .7);
  }
  shape(H, R, H.tile(i + .06, j + .06, w - .12, d - .12, .98), 'paper', 1, .7);
  for (let k = 0; k < n; k++) {
    const [x, y] = H.p(i + .25 + k % 3 * .3, j + .2 + Math.floor(k / 3) * .3, 1.03 + k % 2 * .06);
    oval(H, R, x, y, 9, 5, inks[k % 3], .63);
    stroke(H, R, [[x - 5, y], [x, y - 2], [x + 6, y + 1]], 'paper', .8);
  }
  H.line(R, [H.p(i + w, j + .15, .83), H.p(i + w + .22, j + .15, 1.25), H.p(i + w + .22, j + .82, 1.25), H.p(i + w, j + .82, .83)], 'blue', 1.7);
}

function mug(H, R, i, j, z, ink = 'sun') {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 3, y], [x + 3, y], [x + 4, y - 8], [x - 4, y - 8]], ink, .75, .65);
  oval(H, R, x, y - 8, 3.6, 1.3, 'paper', .8);
  stroke(H, R, [[x + 4, y - 7], [x + 8, y - 7], [x + 8, y - 2], [x + 3, y - 2]], 'blue', .9);
}

function washer(H, R, i, k) {
  box(H, R, i + .08, .59, 1.44, 1.42, .08, .12, 'blue', .85);
  box(H, R, i, .52, 1.6, 1.52, .2, 1.74, 'paper', 1);
  box(H, R, i + .06, .57, 1.48, 1.44, 1.94, .09, 'teal', .54);
  shape(H, R, H.faceI(i + .1, 2.055, 1.4, .28, 1.56), 'sun', .16);
  for (const a of [.14, 1.46]) for (const z of [.32, 1.51]) H.dot(...H.p(i + a, 2.065, z), 1.2, 'blue');
  shape(H, R, H.faceI(i + .12, 2.07, .43, 1.7, 1.88), 'teal', .65);
  H.line(R, [H.p(i + .2, 2.08, 1.77), H.p(i + .46, 2.08, 1.77)], 'paper', 1.5);
  for (const a of [.2, .55, .9]) H.line(R, [H.p(i + 1.605, .7 + a, .45), H.p(i + 1.605, .7 + a, 1.65)], 'blue', .6, {tone:.45});
  const [x, y] = H.p(i + .8, 2.06, 1.01);
  oval(H, R, x, y, 20, 23, 'blue', .9);
  oval(H, R, x, y, 16.8, 20, 'teal', .4);
  oval(H, R, x + 15, y + 1, 2.5, 5, 'sun', .8);
  H.line(R, [H.p(i + .12, 2.07, 1.62), H.p(i + 1.47, 2.07, 1.62)], 'blue', .8);

  const [cx, cy] = H.p(i + 1.16, 2.08, 1.76);
  oval(H, R, cx, cy, 3.2, 3.2, 'coral');
  H.line(R, [[cx, cy - 2], [cx + 1.8, cy + 1]], 'paper', .7);
  H.line(R, [H.p(i + .74, 2.09, 1.72), H.p(i + .74, 2.09, 1.82)], 'blue', 2);
  for (let q = 0; q < 5; q++) H.line(R, [H.p(i + .15 + q * .25, 2.08, .16), H.p(i + .28 + q * .25, 2.08, .16)], 'blue', .65);
  box(H, R, i + .15, .87, .7, .55, 1.94, .12, k % 2 ? 'teal' : 'coral', .44);
}

function furnishings(H, R) {
  box(H, R, .06, .06, 11.8, .13, 3.22, .15, 'teal', .8);
  box(H, R, .06, .06, .13, 11.8, 3.22, .15, 'teal', .8);
  for (const i of [.25, 3.5, 7, 11.5]) box(H, R, i, .08, .14, .18, 0, 3.23, 'teal', .63);
  shape(H, R, H.faceI(.4, .13, 8.8, 2.15, 3.05), 'paper', .9);
  for (let i = .5; i < 9.2; i += .44) H.line(R, [H.p(i, .14, 2.16), H.p(i, .14, 3.04)], 'teal', .55);
  H.line(R, [H.p(.4, .15, 2.62), H.p(9.2, .15, 2.62)], 'teal', .75);
  stroke(H, R, [H.p(.8, .28, 2.36), H.p(8.85, .28, 2.36), H.p(8.85, .28, .24)], 'sun', 3.5);
  for (let k = 0; k < 5; k++) {
    const i = 1.3 + k * 1.78;
    stroke(H, R, [H.p(i, .3, 2.36), H.p(i, .4, 2.1), H.p(i + .35, .7, 1.9)], 'blue', 1.8);
    oval(H, R, ...H.p(i, .3, 2.37), 4, 4, 'coral', .8);
    const [x,y] = H.p(i, .24, 2.82);
    box(H, R, i - .42, .12, .84, .24, 2.83, .1, 'blue', .8);
    H.line(R, [[x - 15,y],[x + 15,y + 15]], 'sun', 2.5);
    H.glow(x,y + 22,34,22,'sun',.23);
  }
  box(H, R, 9.46, .12, 1.9, .18, 2.49, .61, 'teal', .64);
  for (let n = 0; n < 8; n++) H.line(R, [H.p(9.6 + n * .2, .32, 2.59), H.p(9.6 + n * .2, .32, 3)], 'blue', 1);
  for (const j of [2.6,5.4]) box(H, R, .08, j, .13, .13, 0, 2.7, 'teal', .75);
  box(H, R, 3.57, 5.11, 2.65, 1.35, .56, .08, 'teal', .7);

  windowOn(H, R, 'nw', 8.6, 1.35, 3.25, 1.7, { skyTone: .98, frameInk: 'teal', inside() {
    for (let q = 0; q < 9; q++) H.dot(...H.p(-.04, 7.1 + q * .34, 1.6 + q % 3 * .39), .9, 'sun', .8);
  } });

  for (let k = 0; k < 5; k++) washer(H, R, .5 + k * 1.78, k);
  const [cx, cy] = H.p(9.85, .05, 2.83);
  oval(H, R, cx, cy, 13, 13, 'paper', 1);
  for (let q = 0; q < 12; q++) H.dot(cx + Math.sin(q * TAU / 12) * 10, cy - Math.cos(q * TAU / 12) * 10, .8, 'blue');
  H.line(R, [[cx - 5, cy - 7], [cx, cy], [cx + 7, cy - 3]], 'blue', 1.2);
  box(H, R, 10.1, .55, 1.25, 1.1, 0, 2.32, 'coral', .68);
  const front = H.faceI(10.23, 1.66, 1.0, .45, 1.98);
  shape(H, R, front, 'sun', .75);

  shape(H, R, H.faceI(10.42, 1.68, .63, 1.22, 1.59), 'blue', .9);

  for (let q = 0; q < 3; q++) H.line(R, [H.p(10.45 + q * .19, 1.7, .96), H.p(10.57 + q * .19, 1.7, .96)], 'blue', 1.4);
  shape(H, R, H.faceI(10.4, 1.69, .7, .57, .77), 'blue', .87);

  for (let q = 0; q < 3; q++) oval(H, R, ...H.p(10.65 + q * .17, 1.9, .03), 2.4, 1.3, 'sun');
  table(H, R, .22, 2.85, 1.1, 2.75, 1.05, 'teal');
  for (const z of [1.17, 1.86, 2.5]) {
    box(H, R, .1, 2.65, .65, 2.8, z, .09, 'sun', .65);
    for (let k = 0; k < 7; k++) {
      const j = 2.78 + k * .37;
      if (z === 1.86) bottle(H, R, ...H.p(.48, j, z + .09), inks[k % 3], .3);
      else {
        box(H, R, .24, j, .3, .28, z + .09, .36, inks[(k + 1) % 3], .65);
        const [x, y] = H.p(.55, j + .13, z + .27);
        oval(H, R, x, y, 2, 2.6, 'paper', .95);
      }
    }
  }
  for (let k = 0; k < 3; k++) bottle(H, R, ...H.p(1.02, 3.1 + k * .7, 1.17), inks[k], .42);
  shape(H, R, H.faceJ(.13, 5.75, 1, 1.7, 2.4), 'paper', 1);

  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(.18, 5.9 + k * .25, 1.92);
    shape(H, R, [[x - 2, y], [x + 3, y], [x + 3, y + 11], [x + 8, y + 12], [x + 7, y + 16], [x - 2, y + 14]], inks[k], .7, .6);
  }
  table(H, R, 3.5, 5, 2.85, 1.65, 1.02, 'sun');
  for (let k = 0; k < 8; k++) towel(H, R, 3.68 + k % 2 * .92, 5.15, 1.15 + Math.floor(k / 2) * .075, inks[k % 3], .77, .75);
  shape(H, R, H.tile(5.62, 5.17, .51, 1.1, 1.16), 'paper', 1, .7);
  H.line(R, [H.p(5.87, 5.17, 1.17), H.p(5.87, 6.27, 1.17)], 'coral', .7);
  box(H, R, 3.64, 5.3, 1.1, .85, .15, .47, 'teal', .35);
  for (const i of [3.76,5.06]) {
    box(H, R, i, 6.48, 1.04, .3, .64, .29, 'coral', .75);
    shape(H, R, H.tile(i + .05, 6.49, .94, .24, .94), 'blue', .75);
    for (let n = 0; n < 3; n++) towel(H, R, i + .12, 6.52, .95 + n * .055, n % 2 ? 'teal' : 'paper', .52, .18);
    H.line(R, [H.p(i + .34, 6.8, .78), H.p(i + .7, 6.8, .78)], 'sun', 1.7);
  }
  box(H, R, 5.0, 5.3, .98, .85, .15, .47, 'coral', .35);

  table(H, R, .82, 6.35, 1.8, 1.38, 1.04, 'coral');
  box(H, R, 1.05, 6.56, .93, .62, 1.16, .1, 'blue', .78);
  const [sx, sy] = H.p(1.56, 6.95, 1.3);
  shape(H, R, [[sx - 14, sy], [sx + 15, sy], [sx + 15, sy - 18], [sx + 7, sy - 23], [sx - 12, sy - 23], [sx - 12, sy - 17], [sx + 2, sy - 17], [sx + 2, sy - 4], [sx - 14, sy - 4]], 'teal', .78);
  oval(H, R, sx + 15, sy - 14, 4, 6, 'sun');
  H.line(R, [[sx - 10, sy - 16], [sx - 10, sy - 2]], 'blue', 1.2);
  shape(H, R, H.tile(1.0, 7.05, .8, .56, 1.28), 'sun', .6, .65);
  for (let k = 0; k < 4; k++) {
    const [x, y] = H.p(2.22, 6.52 + k * .24, 1.19);
    shape(H, R, [[x - 3, y], [x + 3, y], [x + 3, y - 8], [x - 3, y - 8]], inks[k % 3], .65, .55);
    H.line(R, [[x - 4, y], [x + 4, y]], 'blue', .8);
    H.line(R, [[x - 4, y - 8], [x + 4, y - 8]], 'blue', .8);
  }
  const [tx, ty] = H.p(2.15, 7.39, 1.19);
  oval(H, R, tx - 4, ty, 2.3, 2, 'paper'); oval(H, R, tx + 3, ty, 2.3, 2, 'paper');
  H.line(R, [[tx - 4, ty], [tx + 4, ty - 10]], 'blue', .9);
  H.line(R, [[tx + 3, ty], [tx - 5, ty - 10]], 'blue', .9);
  for (const j of [6.58,7.55]) H.line(R, [H.p(1.02,j,.15),H.p(2.35,j,.82)], 'blue', 1.2);
  shape(H, R, H.tile(1.2,6.74,.63,.5,.13), 'teal', .7);
  for (let n = 0; n < 5; n++) H.line(R,[H.p(1.24 + n * .11,6.78,.14),H.p(1.24 + n * .11,7.18,.14)],'sun',.8);
  stroke(H,R,[H.p(1.5,6.9,.2),H.p(1.4,6.9,.8),H.p(1.65,6.85,1.2)],'blue',1.2);
  box(H, R, 1.06, 7.91, .65, .68, 0, .48, 'sun', .7);
  basket(H, R, 2.64, 8.25, 'sun', 5);
  for (const [i, j] of [[7.6, 4.7], [9.9, 4.7]]) {
    H.line(R, [H.p(i, j, 0), H.p(i + .5, j + .58, 1.06)], 'blue', 2);
    H.line(R, [H.p(i + .5, j + .58, 0), H.p(i, j, 1.06)], 'blue', 2);
  }
  shape(H, R, [H.p(7.3, 4.57, 1.09), H.p(10.25, 4.57, 1.09), H.p(10.68, 4.96, 1.09), H.p(10.25, 5.39, 1.09), H.p(7.3, 5.39, 1.09)], 'teal', .55);
  shape(H, R, H.tile(7.5, 4.68, 1.4, .6, 1.12), 'paper', 1);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(7.6 + k * .3, 4.7, 1.13), H.p(7.6 + k * .3, 5.28, 1.13)], 'coral', .75);
  bottle(H, R, ...H.p(10.09, 4.9, 1.12), 'sun', .3);
  stroke(H, R, [H.p(8.1, 4.95, 1.13), H.p(8.8, 5.5, .7), H.p(9.6, 5.55, .1), H.p(10.3, 5.65, .06)], 'blue', 1);
  basket(H, R, 10.16, 6.54, 'coral', 6);
  basket(H, R, 8.42, 8.19, 'teal', 7);
  box(H, R, 9.8, 9.1, .75, .75, 0, .3, 'sun', .6);
  for (let k = 0; k < 5; k++) towel(H, R, 9.84, 9.13, .3 + k * .09, inks[k % 3], .65, .68);
  bench(H, R, .86, 9.69, 3.2, 'coral');
  towel(H, R, 3.18, 9.82, .71, 'teal', .7, .48);
  table(H, R, 4.8, 9.45, 1.7, 1.17, .64, 'sun');
  const board = H.tile(5.02, 9.57, .92, .83, .78);
  shape(H, R, board, 'paper', 1, .7);
  for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) {
    if ((a + b) % 2) shape(H, R, H.tile(5.02 + a * .23, 9.57 + b * .2075, .23, .2075, .79), 'blue', .7, .15);
    if (a === 0 || a === 3) oval(H, R, ...H.p(5.13 + a * .23, 9.67 + b * .2075, .81), 2.3, 1.5, a ? 'coral' : 'teal');
  }
  mug(H, R, 6.18, 10.15, .78, 'coral');
  box(H, R, 4.9, 10.9, .69, .55, 0, .43, 'teal', .6);
  rug(H, R, 6.7, 10.08, 1.4, 1.08, 'coral', .26, { border: 'teal' });
  for (let k = 0; k < 3; k++) {
    box(H, R, .76 + k * .13, 10.8 + k * .05, .55, .7, .04 + k * .03, .04, inks[k], .6);
  }
  mug(H, R, 2.85, 10.64, .06);
  plant(H, R, ...H.p(.54, 11.24), .72);
  const [rx, ry] = H.p(4.12, 10.85, .06);
  shape(H, R, [[rx - 9, ry], [rx + 8, ry], [rx + 11, ry - 21], [rx - 9, ry - 21]], 'teal', .7);
  stroke(H, R, [[rx - 5, ry - 21], [rx - 5, ry - 29], [rx + 5, ry - 29], [rx + 5, ry - 21]], 'blue', 1.3);
  H.line(R, [[rx - 6, ry - 8], [rx + 6, ry - 8]], 'paper', 1);
  box(H, R, 1.96, 3.8, .94, .6, 0, .25, 'coral', .78);
  const [wx, wy] = H.p(2.39, 4.2, .29);
  H.line(R, [[wx - 8, wy - 3], [wx + 8, wy + 3]], 'blue', 2);
  oval(H, R, wx - 9, wy - 3, 3, 2.4, 'paper');
  H.line(R, [[wx - 5, wy + 3], [wx + 5, wy - 6]], 'sun', 2.4);
  for (let k = 0; k < 3; k++) oval(H, R, ...H.p(3.11 + k * .12, 4.21, .03), 1.4, .8, 'blue');
  box(H, R, 10.97, 3.4, .49, .66, 0, .61, 'teal', .4);
  H.line(R, [H.p(11.27, 3.73, .2), H.p(11.42, 3.5, 2.15)], 'sun', 2);
  for (let k = 0; k < 6; k++) H.line(R, [H.p(11.13 + k * .045, 3.74, .2), H.p(11.08 + k * .067, 3.75, .04)], 'paper', 1.4);
  shape(H, R, [H.p(9.84, 3.09), H.p(10.35, 3.09), H.p(10.11, 3.09, .67)], 'sun', .8);
}

export default function enrich(room) {
  const detailed = world(room.id, room.title, { floor: 'teal', tone: .2, wall: 'blue', wallTone: .75, pattern: 'tiles', height: 3.4 }, furnishings, (H, R, t) => {
    for (let k = 0; k < 5; k++) {
      const [x, y] = H.p(1.3 + k * 1.78, 2.06, 1.01);
      H.clip(ell(x, y, 15.5, 18.5), () => {
        for (let n = 0; n < 5; n++) {
          const a = t * (k % 2 ? -1.4 : 1.7) + n * TAU / 5;
          oval(H, R, x + Math.cos(a) * 10, y + Math.sin(a) * 12, 6.5, 4, inks[n % 3], .72);
        }
      });
      stroke(H, R, [[x - 10, y - 12], [x - 13, y], [x - 10, y + 7]], 'paper', 1.3);
    }
    stroke(H, R, [H.p(.18, 6.8, 3.1), H.p(.25, 8.6, 2.93), H.p(.25, 10.65, 3.08)], 'sun', 1.4);
    for (let k = 0; k < 5; k++) {
      const [x, y] = H.p(.24, 7.08 + k * .66, 3.01 - Math.sin(k * .7) * .08);
      garment(H, R, x, y + 3, inks[k % 3], .72, Math.sin(t * .8 + k) * 1.4);
      H.line(R, [[x - 5, y - 2], [x - 5, y + 6]], 'coral', 2);
      H.line(R, [[x + 5, y - 2], [x + 5, y + 6]], 'coral', 2);
    }
    actor(H, R, 2.18, 3.45, t, 'kneel', { shirt: ['sun', .7], hat: true }, 0, .98);
    actor(H, R, 6.76, 3.07, t, 'hold', { shirt: ['coral', .7], face: 'sw' }, 0, 1.01);
    const [lx, ly] = H.p(6.63, 3.29, .99);
    towel(H, R, 6.35, 3.18, .88, 'teal', .61, .44);
    H.line(R, [[lx - 7, ly - 2], [lx + 6, ly + 3]], 'paper', 1);
    actor(H, R, 3.23, 6.05, t, 'hold', { shirt: ['teal', .72], face: 'se' }, 0, 1.06);
    const [fx, fy] = H.p(3.65, 6.1, 1.2);
    shape(H, R, [[fx - 8, fy - 9], [fx + 15, fy - 2], [fx + 10, fy + 7], [fx - 12, fy + 1 + Math.sin(t * 1.5) * 2]], 'coral', .65);
    actor(H, R, 1.54, 8.0, t, 'type', { shirt: ['sun', .68], glasses: true, face: 'ne' }, .4, .95);
    actor(H, R, 8.36, 6.0, t, 'hold', { shirt: ['coral', .72], face: 'nw' }, 0, 1.06);
    const [ix, iy] = H.p(8.14 + Math.sin(t * 1.3) * .2, 5.02, 1.16);
    shape(H, R, [[ix - 11, iy + 3], [ix + 11, iy + 3], [ix + 6, iy - 6], [ix - 4, iy - 8]], 'blue', .82);
    stroke(H, R, [[ix - 3, iy - 6], [ix - 3, iy - 13], [ix + 5, iy - 13], [ix + 7, iy - 5]], 'coral', 2.2);
    steam(H, R, ix, iy - 9, t, 2);
    actor(H, R, 1.8, 10.08, t, 'read', { shirt: ['teal', .7], glasses: true }, .48, 1.03);
    const [bx, by] = H.p(1.98, 10.24, .98);
    shape(H, R, [[bx - 12, by - 7], [bx - 1, by - 4], [bx + 10, by - 10], [bx + 10, by + 1], [bx, by + 6], [bx - 12, by + 2]], 'paper', 1);
    H.line(R, [[bx, by - 3], [bx, by + 5]], 'blue', .6);
    for (let k = 0; k < 3; k++) H.line(R, [[bx - 10, by - 3 + k * 2], [bx - 3, by - 1 + k * 2]], 'blue', .5);
    actor(H, R, 5.23, 11.09, t, 'think', { shirt: ['sun', .73], face: 'nw' }, .1, .9, 'child');
    actor(H, R, 6.87, 9.43, t, 'sitfloor', { shirt: ['coral', .65], face: 'sw' }, 0, .91, 'child');
  });
  return { ...room, under: detailed.under, live: detailed.live };
}
