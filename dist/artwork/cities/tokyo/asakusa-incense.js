import { world, shape, oval, stroke, box, actor, cycle, ell, TAU } from '../../worlds/common.js';

function line(H, R, points, width = 1, ink = 'blue', tone = .8) {
  H.line(R, points, ink, width, { tone, amp: .12 });
}

function roof(H, R, i, j, w, d, z, rise, small = false) {
  const points = [H.p(i, j, z + rise), H.p(i + w, j, z + rise), H.p(i + w + .25, j + d, z + .18), H.p(i + w * .78, j + d, z), H.p(i + w * .22, j + d, z), H.p(i - .25, j + d, z + .18)];
  shape(H, R, points, 'blue', .78, 1.1);
  const rows = small ? 4 : 7;
  H.clip(points, () => {
    for (let n = 0; n < rows; n++) {
      const v = n / rows;
      line(H, R, [H.p(i - .25, j + d * v, z + rise * (1 - v)), H.p(i + w + .25, j + d * v, z + rise * (1 - v))], .65, 'paper', .5);
    }
    for (let n = 0; n <= w / .3; n++) {
      const x = i + n * .3;
      stroke(H, R, [H.p(x, j, z + rise), H.p(x, j + d * .55, z + rise * .5), H.p(x, j + d, z + (n < 2 || x > i + w - .6 ? .12 : 0))], 'paper', .9, .55);
    }
  });
  line(H, R, [H.p(i - .25, j + d, z + .18), H.p(i + .3, j + d, z), H.p(i + w - .3, j + d, z), H.p(i + w + .25, j + d, z + .18)], 3, 'blue');
  box(H, R, i + .12, j + .02, w - .24, .2, z + rise, .16, 'paper', .72);
  for (const x of [i + .03, i + w - .18]) box(H, R, x, j, .18, .22, z + rise + .04, .26, 'blue', .75);
}

function bowl(H, R, i, j, z, radius = 14) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - radius, y - 4], [x + radius, y - 4], [x + radius * .65, y + 10], [x - radius * .65, y + 10]], 'teal', .5, .7);
  oval(H, R, x, y - 4, radius, radius * .35, 'sun', .26);
}

function burner(H, R) {
  box(H, R, 4.65, 5.02, 3.2, 2.75, .02, .19, 'paper', .85);
  for (const [i, j] of [[5.15, 5.5], [7.22, 5.5], [5.25, 7.1], [7.12, 7.1]]) {
    const [x, y] = H.p(i, j, .24);
    shape(H, R, [[x - 5, y], [x + 5, y], [x + 8, y - 25], [x - 6, y - 25]], 'teal', .65, .75);
  }
  const [x, y] = H.p(6.25, 6.25, 1.35);
  shape(H, R, [[x - 57, y], [x - 51, y + 23], [x - 28, y + 35], [x + 30, y + 35], [x + 53, y + 23], [x + 58, y]], 'teal', .6, 1.1);
  oval(H, R, x, y, 59, 28, 'teal', .8);
  oval(H, R, x, y, 51, 22, 'paper', .95);
  H.speckle(R, ell(x, y, 49, 20), 'blue', 95, .4, 1, .26);
  for (const dx of [-41, -21, 0, 21, 41]) {
    line(H, R, [[x + dx, y + 20], [x + dx * .9, y + 29]], .8, 'sun', .5);
    H.dot(x + dx, y + 23, 1.8, 'sun', .65);
  }
  for (const side of [-1, 1]) stroke(H, R, [[x + side * 54, y + 8], [x + side * 72, y - 4], [x + side * 75, y + 14], [x + side * 57, y + 20]], 'teal', 3.5);
  for (let k = 0; k < 18; k++) {
    const dx = (k % 6) * 12 - 32, dy = Math.floor(k / 6) * 9 - 7;
    line(H, R, [[x + dx, y + dy], [x + dx + (k % 3 - 1) * 2, y + dy - 18 - k % 4 * 3]], 1.1, k % 3 ? 'coral' : 'blue', .7);
    H.dot(x + dx + (k % 3 - 1) * 2, y + dy - 18 - k % 4 * 3, .9, 'sun', .9);
  }
}

const room = world('tokyo-asakusa-incense', 'Asakusa · Incense before the crowds', {
  floor: 'paper', tone: 1, wall: false, head: 20,
}, (H, R) => {
  for (let j = 0; j < 12; j += .85) for (let i = (Math.round(j / .85) % 2) * -1.05; i < 12; i += 2.1) {
    const a = Math.max(0, i), w = Math.min(12, i + 2.1) - a;
    H.outline(R, H.tile(a, j, w, Math.min(.85, 12 - j), .01), 'blue', .65, { tone: .4, amp: .16 });
  }
  box(H, R, .55, .1, 10.9, 2.05, 0, .42, 'paper', .85);
  box(H, R, 3.9, 2.05, 5.35, .47, .01, .25, 'paper', .85);
  box(H, R, 4.15, 2.51, 4.85, .45, .01, .12, 'paper', .85);
  shape(H, R, H.faceI(.55, .05, 10.9, .4, 3.3), 'coral', .54, 1);
  for (const i of [1.28, 5.65, 10.05]) {
    box(H, R, i - .12, .5, .66, .66, .42, .19, 'paper', 1);
    box(H, R, i, .58, .42, .44, .6, 2.79, 'coral', .85);
    box(H, R, i - .22, .48, .85, .67, 3.2, .18, 'coral', .75);
    box(H, R, i - .34, .35, 1.06, .86, 3.37, .15, 'paper', .86);
    box(H, R, i - .15, .35, .67, .84, 3.52, .16, 'coral', .8);
    for (const dx of [-.18, .37]) box(H, R, i + dx, .72, .26, .65, 3.04, .16, 'coral', .8);
  }
  for (const i of [2.1, 6.55]) {
    shape(H, R, H.faceI(i, .1, 2.9, .7, 3.03), 'blue', .73, .8);
    for (let x = i + .13; x < i + 2.8; x += .2) line(H, R, [H.p(x, .15, .75), H.p(x, .15, 2.97)], 1.1, 'sun', .45);
  }
  box(H, R, .7, .4, 10.8, .7, 3.66, .17, 'coral', .8);
  roof(H, R, .55, .12, 10.8, 2.15, 3.65, .88);
  box(H, R, 7.1, 1.05, 2.25, 1, .44, .92, 'coral', .58);
  box(H, R, 6.99, .96, 2.46, 1.15, 1.35, .12, 'sun', .32);
  for (let i = 7.12; i < 9.35; i += .2) line(H, R, [H.p(i, 1, 1.5), H.p(i, 2.02, 1.5)], 2, 'blue');
  for (let k = 0; k < 5; k++) line(H, R, [H.p(7.3 + k * .39, 2.07, .53), H.p(7.3 + k * .39, 2.07, 1.25)], .6);
  box(H, R, .45, 3.25, 1.05, 3.95, .04, 2.15, 'coral', .36);
  box(H, R, .33, 3.15, 1.29, 4.14, 2.2, .14, 'blue', .62);
  for (let row = 0; row < 5; row++) for (let col = 0; col < 6; col++) {
    const j = 3.36 + col * .62, z = .18 + row * .385;
    shape(H, R, H.faceJ(1.515, j, .56, z, z + .33), 'sun', .23, .55);
    const [x, y] = H.p(1.53, j + .29, z + .17);
    oval(H, R, x, y, 2.2, 1.5, 'blue', .8);
  }
  box(H, R, 1.5, 3.15, .75, 1.3, .04, .93, 'coral', .42);
  const [sx, sy] = H.p(1.86, 3.75, 1.04);
  shape(H, R, [[sx - 8, sy], [sx + 8, sy], [sx + 8, sy - 24], [sx - 8, sy - 24]], 'sun', .58, .7);
  oval(H, R, sx, sy - 24, 8, 3, 'blue', .55);
  for (let k = 0; k < 7; k++) line(H, R, [[sx - 5 + k * 1.6, sy - 23], [sx - 5 + k * 1.6, sy - 32 - k % 3 * 2]], .75, 'paper');
  box(H, R, 1.7, 4.72, .72, .52, .06, .45, 'teal', .45);
  for (let k = 0; k < 6; k++) box(H, R, 1.73, 4.75, .61, .39, .53 + k * .025, .02, 'paper', 1);
  for (const j of [8.15, 10.85]) box(H, R, .68, j, .17, .17, .02, 2.0, 'blue', .55);
  for (const z of [.85, 1.45, 1.93]) {
    line(H, R, [H.p(.76, 8.2, z), H.p(.76, 10.91, z)], 1.3);
    for (let n = 0; n < 7; n++) {
      const [x, y] = H.p(.77, 8.35 + n * .37, z);
      shape(H, R, [[x - 3, y - 4], [x + 4, y - 1], [x + 2, y + 13 + n % 3 * 2], [x - 2, y + 12]], 'paper', 1, .5);
      line(H, R, [[x - 4, y + 1], [x + 4, y + 2]], .7, 'coral', .45);
    }
  }
  for (const [i, j] of [[4.25, 4.65], [8.2, 4.65], [4.25, 8.1], [8.2, 8.1]]) box(H, R, i, j, .2, .2, .03, 3.2, 'blue', .6);
  for (const i of [4.2, 8.25]) {
    line(H, R, [H.p(i, 5.2, .7), H.p(i, 7.55, .7)], 1.8, 'teal');
    for (const j of [5.2, 7.55]) line(H, R, [H.p(i, j, .03), H.p(i, j, .7)], 1.8, 'teal');
  }
  burner(H, R);
  box(H, R, 9.95, 3.5, 1.35, .8, .02, .78, 'paper', .95);
  for (let k = 0; k < 6; k++) {
    const [x, y] = H.p(10.17 + k * .15, 3.8, .82);
    line(H, R, [[x - 1, y], [x + 1, y - 17]], 2.2, 'coral', .7);
    line(H, R, [[x - 3, y - 7], [x + 3, y - 7]], 1.3, 'paper');
  }
  bowl(H, R, 10.8, 4, .82, 8);
  const [rx, ry] = H.p(10.65, 4.8, .04);
  line(H, R, [[rx, ry], [rx - 9, ry - 53]], 1.4);
  for (let k = 0; k < 5; k++) line(H, R, [[rx - 8 + k * 4, ry], [rx - 8 + k * 4, ry + 7]], .8);
  line(H, R, [[rx - 9, ry], [rx + 9, ry]], 1.6);
  box(H, R, 10.55, 10.8, .76, .5, .02, .13, 'blue', .6);
  line(H, R, [H.p(10.9, 11, .15), H.p(10.9, 11, .8)], 1.3);
  for (const [i, j, turn] of [[2.7, 9.9, .3], [9.25, 9.55, -.4], [3.5, 2.8, .2], [11.2, 6.7, .5]]) {
    const [x, y] = H.p(i, j, .04);
    shape(H, R, [[x - 4, y], [x + turn * 4, y - 4], [x + 5, y + 1], [x, y + 3]], 'sun', .55, .5);
  }
}, (H, R, t) => {
  const u = cycle(t, 16), waft = Math.sin(u * Math.PI * 2) * .5 + .5;
  H.at(8.8, 6.5, 0, HH => actor(HH, R, 8.8, 6.5, waft * 1.2, 'talk', { shirt: ['teal', .6], hairStyle: 'pony', face: 'nw' }, 0, 1.2));
  H.at(2.8, 7.4, 0, HH => actor(HH, R, 2.8, 7.4, t * .16, 'hold', {
    shirt: ['paper', 1], pants: ['blue', .7], glasses: true,
    prop: (h, r, p) => {
      const [x, y] = p.nearHand;
      shape(h, r, [[x - 3, y - 11], [x + 7, y - 8], [x + 5, y + 12], [x - 4, y + 10]], 'paper', 1, .55);
      line(h, r, [[x - 1, y - 5], [x + 4, y - 3]], .5, 'coral', .45);
    },
  }, 0, 1.15));
  H.at(10.05, 9.15, 0, HH => {
    actor(HH, R, 10.05, 9.15, waft * 1.2, 'water', { shirt: ['blue', .58], apron: ['paper', 1], hairStyle: 'cap' }, 0, 1.15);
    const [x, y] = HH.p(9.85 - waft * .3, 9.65 + waft * .14, .02);
    line(HH, R, [[x, y], [x + 20, y - 54]], 1.7, 'coral');
    for (let k = 0; k < 9; k++) line(HH, R, [[x + 4, y - 10], [x - 10 + k * 3, y + 2]], .85, 'sun');
    const leap = Math.max(0, Math.sin(u * Math.PI * 2));
    const [lx, ly] = HH.p(9.4 - leap * .8, 10.05 + leap * .18, .04 + leap * .12);
    shape(HH, R, [[lx - 4, ly], [lx, ly - 4], [lx + 5, ly], [lx, ly + 3]], 'sun', .65, .5);
  });
  for (let k = 0; k < 5; k++) {
    const p = cycle(t + k * 2.5, 9);
    const [x, y] = H.p(6.25 + (k - 2) * .17, 6.25, 1.43 + p * 1.25);
    H.opacity(Math.sin(p * Math.PI) * .5, () => stroke(H, R, [[x, y], [x + 8 * Math.sin(t * .4 + k), y - 13], [x - 8, y - 23], [x + 3, y - 36]], k % 2 ? 'paper' : 'sun', 2, .65));
  }
  const [x, y] = H.p(.8, 9.55, 1.93);
  shape(H, R, [[x - 2, y], [x + 3, y + 1], [x + Math.sin(t * .8) * 3 + 3, y + 22], [x + Math.sin(t * .8) * 3 - 2, y + 20]], 'paper', 1, .5);
});

room.over = (H, R) => {
  roof(H, R, 4.06, 4.45, 4.3, 3.9, 3.2, .37, true);
  line(H, R, [H.p(4.25, 8.1, .22), H.p(4.25, 8.1, 3.22)], 3.5, 'blue', .8);
};

export default room;
