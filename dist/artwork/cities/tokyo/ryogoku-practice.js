import { world, shape, oval, stroke, box, actor, cycle, ell, windowOn, TAU } from '../../worlds/common.js';

function line(H, R, points, width = 1, ink = 'blue', tone = .8) {
  H.line(R, points, ink, width, { tone, amp: .1 });
}

function bucket(H, R, i, j, z = 0, ink = 'paper') {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 12, y - 19], [x + 12, y - 19], [x + 9, y], [x - 9, y]], ink, .85, .8);
  oval(H, R, x, y - 19, 12, 5, 'teal', .25);
  stroke(H, R, [[x - 12, y - 16], [x - 10, y - 33], [x + 9, y - 33], [x + 12, y - 16]], 'blue', 1);
  for (const dx of [-6, 0, 6]) line(H, R, [[x + dx, y - 15], [x + dx * .8, y - 2]], .5, 'blue', .45);
}

function wrestler(H, R, i, j, lift, pose = 'practice', size = 1) {
  const [x, y] = H.p(i, j, .08);
  const lean = pose === 'practice' ? -lift * 4 : pose === 'footwork' ? -lift * 1.5 : 0;
  const p = (a, b) => [x + (a + lean) * size, y + b * size];
  const ov = (a, b, rx, ry, ink = 'coral', tone = .3) => oval(H, R, ...p(a, b), rx * size, ry * size, ink, tone);
  const limb = (points, width) => {
    const path = points.map(([a, b]) => p(a, b));
    line(H, R, path, (width + 2) * size, 'blue', .65);
    line(H, R, path, width * size, 'paper', 1);
    line(H, R, path, width * size, 'coral', .28);
  };
  H.tint(ell(x + 3, y + 4, 34 * size, 9 * size), 'blue', .16);
  const shuffle = pose === 'footwork' ? lift : 0;
  limb([[-10, -25], [-21 - shuffle * 2, -12], [-26 - shuffle * 5, -2 - Math.max(0, -shuffle) * 4]], 13);
  if (pose === 'practice') limb([[11, -25], [24 + lift * 10, -16 - lift * 22], [29 + lift * 20, -3 - lift * 44]], 13);
  else limb([[11, -25], [18 + shuffle * 2, -12], [22 + shuffle * 5, -2 - Math.max(0, shuffle) * 4]], 13);
  ov(-28 - shuffle * 5, -1 - Math.max(0, -shuffle) * 4, 11, 4);
  if (pose === 'practice') ov(32 + lift * 20, -2 - lift * 44, 11, 4);
  else ov(25 + shuffle * 5, -1 - Math.max(0, shuffle) * 4, 11, 4);
  limb([[-16, -48], [-31, -35], [-26, -22]], 9);
  limb([[16, -48], [31, -37 - lift * 7], [31 + lift * 8, -25 - lift * 15]], 9);
  ov(0, -38, 23, 25);
  ov(1, -31, 21, 19, 'paper', .85);
  H.tint(ell(...p(3, -29), 18 * size, 16 * size), 'coral', .2);
  stroke(H, R, [p(-13, -44), p(-5, -42), p(0, -44), p(6, -42), p(14, -44)], 'blue', .65, .55);
  H.dot(...p(2, -27), .85 * size, 'blue', .75);
  shape(H, R, [[-21, -24], [0, -19], [22, -24], [21, -14], [0, -10], [-20, -15]].map(([a, b]) => p(a, b)), 'blue', .86, .9);
  shape(H, R, [[-6, -17], [7, -17], [7, -7], [-4, -6]].map(([a, b]) => p(a, b)), 'blue', .85, .6);
  line(H, R, [p(-19, -20), p(-2, -15), p(18, -20)], .6, 'paper', .5);
  ov(-1, -65, 10, 12);
  shape(H, R, [[-11, -66], [-11, -75], [-3, -80], [7, -77], [10, -68], [4, -71], [-6, -70]].map(([a, b]) => p(a, b)), 'blue', .9, .7);
  ov(-4, -79, 5, 3, 'blue', .9);
  for (const a of [-4, 4]) H.dot(...p(a, -64), 1 * size, 'blue', .9);
  line(H, R, [p(-2, -58), p(4, -58)], .75);
  ov(-26, -22, 5.5, 4.2);
  ov(31 + lift * 8, -25 - lift * 15, 5.5, 4.2);
  if (pose === 'waiting') {
    shape(H, R, [[-20, -56], [-13, -53], [-15, -29], [-23, -29]].map(([a, b]) => p(a, b)), 'paper', 1, .6);
    shape(H, R, [[12, -53], [20, -56], [24, -29], [16, -29]].map(([a, b]) => p(a, b)), 'paper', 1, .6);
    for (const a of [-20, 19]) line(H, R, [p(a, -34), p(a + 2, -31)], 1.1, 'coral');
  }
}

export default world('tokyo-ryogoku-practice', 'Ryogoku · Morning practice', {
  floor: 'sun', tone: .16, wall: 'paper', wallTone: .9, height: 3.5, pattern: 'boards', head: 20,
}, (H, R) => {
  for (const i of [.13, 4.8, 9.0, 11.7]) box(H, R, i, .05, .18, .22, .01, 3.5, 'blue', .66);
  for (const j of [4.9, 9.7, 11.7]) box(H, R, .05, j, .22, .18, .01, 3.5, 'blue', .66);
  box(H, R, .08, .05, 11.72, .24, 3.3, .26, 'blue', .7);
  box(H, R, .05, .08, .24, 11.72, 3.3, .26, 'blue', .7);
  for (const z of [.7, 2.85]) {
    box(H, R, .1, .1, 11.68, .1, z, .13, 'coral', .35);
    box(H, R, .1, .1, .1, 11.68, z, .13, 'coral', .35);
  }
  windowOn(H, R, 'nw', 3.0, 1.1, 3.3, 1.68, { sky: 'paper', skyTone: 1, frameInk: 'blue' });
  for (let j = 1.45; j < 4.7; j += .44) line(H, R, [H.p(.055, j, 1.12), H.p(.055, j, 2.76)], 1, 'coral', .7);
  line(H, R, [H.p(.065, 1.4, 1.65), H.p(.065, 4.65, 1.65)], 1.2, 'coral');
  H.tint([H.p(.25, 1.4, .02), H.p(.25, 4.8, .02), H.p(6.1, 7, .02), H.p(6.1, 4.5, .02)], 'paper', .4);
  box(H, R, .45, .45, 10.55, 1.55, .01, .35, 'coral', .33);
  for (let i = .7; i < 10.9; i += .48) line(H, R, [H.p(i, .45, .38), H.p(i, 2, .38)], .5, 'blue', .5);
  box(H, R, 2.1, 1.96, 1.85, .43, .01, .17, 'coral', .35);
  shape(H, R, H.faceI(9.45, .09, 1.75, .38, 2.78), 'blue', .77, .8);
  box(H, R, 10.6, .18, .61, .1, .38, 2.43, 'sun', .22);
  for (let z = .6; z < 2.79; z += .45) line(H, R, [H.p(10.64, .3, z), H.p(11.16, .3, z)], .75);
  box(H, R, 2.15, 2.6, 7.65, 7.7, .01, .1, 'sun', .33);
  const circle = radius => Array.from({ length: 80 }, (_, k) => H.p(6.02 + Math.cos(k * TAU / 80) * radius, 6.45 + Math.sin(k * TAU / 80) * radius, .14));
  shape(H, R, circle(3.41), 'sun', .2, .65);
  H.speckle(R, circle(3.26), 'coral', 230, .4, 1, .22);
  for (let k = 0; k < 20; k++) {
    const a = k * TAU / 20;
    const points = [];
    for (const [r, angle] of [[3.2, a - .13], [3.43, a - .13], [3.43, a + .13], [3.2, a + .13]]) points.push(H.p(6.02 + Math.cos(angle) * r, 6.45 + Math.sin(angle) * r, .17));
    shape(H, R, points, 'paper', .88, .7);
    for (let n = -2; n <= 2; n++) line(H, R, [H.p(6.02 + Math.cos(a + n * .04) * 3.21, 6.45 + Math.sin(a + n * .04) * 3.21, .18), H.p(6.02 + Math.cos(a + n * .04) * 3.42, 6.45 + Math.sin(a + n * .04) * 3.42, .18)], .65, 'coral', .45);
  }
  for (const i of [5.53, 6.54]) line(H, R, [H.p(i, 5.96, .15), H.p(i, 6.85, .15)], 3.5, 'paper');
  for (let k = 0; k < 8; k++) {
    const i = 3.65 + k * .48, j = 8.18 + Math.sin(k * .6) * .28;
    const [x, y] = H.p(i, j, .15);
    H.tint(ell(x, y, 4.3, 2), 'blue', .11);
    for (let n = 0; n < 3; n++) H.dot(x + 3.5 + n * 1.4, y - 1 + n * .6, .7, 'blue', .12);
  }
  const worn = H.tile(.55, 5.65, 1.75, 1.8, .02);
  H.tint(worn, 'coral', .18);
  H.speckle(R, worn, 'blue', 50, .4, 1.1, .2);
  box(H, R, .95, 5.8, .42, .46, .02, 2.5, 'coral', .45);
  for (const z of [.63, .88, 1.12, 1.38, 1.59]) line(H, R, [H.p(.98, 6.28, z), H.p(1.34, 6.28, z + .08)], .7, 'paper', .65);
  for (let k = 0; k < 7; k++) line(H, R, [H.p(1 + k * .046, 6.28, 1.85), H.p(1 + k * .046, 6.28, 2.42)], .5, 'blue', .4);
  box(H, R, 5.05, .85, 1.23, .89, .38, .12, 'coral', .58);
  H.outline(R, H.tile(5.15, .95, 1.03, .68, .51), 'paper', .7, { tone: .8, amp: .1 });
  for (let k = 0; k < 5; k++) box(H, R, 7.6, .8, 1.06, .7, .39 + k * .09, .075, k === 3 ? 'coral' : 'paper', k === 3 ? .6 : 1);
  bucket(H, R, 1.1, 8.6);
  bucket(H, R, 1.55, 9.6, 0, 'teal');
  const [lx, ly] = H.p(1.12, 8.65, .65);
  line(H, R, [[lx - 8, ly + 11], [lx + 19, ly - 23]], 1.7, 'coral');
  oval(H, R, lx + 20, ly - 24, 6, 3, 'paper', 1);
  const [rx, ry] = H.p(10.6, 5.2, .05);
  line(H, R, [[rx, ry], [rx - 18, ry - 76]], 1.8, 'coral');
  line(H, R, [[rx - 17, ry], [rx + 19, ry]], 2.2, 'blue');
  for (let k = 0; k < 9; k++) line(H, R, [[rx - 15 + k * 4, ry], [rx - 15 + k * 4, ry + 6]], 1.1, 'blue');
  const [bx, by] = H.p(11.15, 6.25, .02);
  line(H, R, [[bx, by], [bx - 4, by - 65]], 1.5, 'coral');
  for (let k = 0; k < 8; k++) line(H, R, [[bx, by - 12], [bx - 10 + k * 3, by + 3]], .85, 'sun');
  const [cx, cy] = H.p(6.85, .06, 2.62);
  oval(H, R, cx, cy, 16, 16, 'paper', 1);
  for (let k = 0; k < 12; k++) {
    const a = k * TAU / 12;
    line(H, R, [[cx + Math.cos(a) * 12, cy + Math.sin(a) * 12], [cx + Math.cos(a) * 14, cy + Math.sin(a) * 14]], .6);
  }
  line(H, R, [[cx - 7, cy + 5], [cx, cy], [cx + 2, cy - 11]], 1.3);
  const [fx, fy] = H.p(8.6, 1.3, .38);
  oval(H, R, fx, fy, 12, 4, 'blue', .6);
  line(H, R, [[fx, fy - 3], [fx, fy - 31]], 2.5);
  oval(H, R, fx, fy - 44, 18, 18, 'paper', .82);
  for (let k = 0; k < 10; k++) {
    const a = k * TAU / 10;
    line(H, R, [[fx + Math.sin(a) * 3, fy - 44 + Math.cos(a) * 3], [fx + Math.sin(a) * 17, fy - 44 + Math.cos(a) * 17]], .55);
  }
  box(H, R, 10.25, 9.15, 1.12, .85, .02, .65, 'blue', .7);
  stroke(H, R, [H.p(10.48, 9.6, .67), H.p(10.53, 9.6, .96), H.p(11.05, 9.6, .96), H.p(11.1, 9.6, .67)], 'blue', 1.5);
  box(H, R, 10.4, 9.58, .77, .25, .54, .25, 'paper', 1);
  for (const [i, j] of [[9.6, .9], [9.95, .9], [10.3, 1.5], [10.65, 1.5]]) {
    const [x, y] = H.p(i, j, .39);
    oval(H, R, x, y, 8, 4, 'sun', .4);
    line(H, R, [[x - 3, y + 2], [x, y - 3], [x + 5, y]], 1.2, 'blue');
  }
  const [tx, ty] = H.p(4.45, 1.5, .42);
  shape(H, R, [[tx - 5, ty], [tx + 5, ty], [tx + 5, ty - 9], [tx - 5, ty - 9]], 'paper', 1, .6);
  oval(H, R, tx, ty - 9, 5, 2, 'teal', .4);
}, (H, R, t) => {
  const s = cycle(t, 12) * 12;
  const smooth = v => v * v * (3 - 2 * v);
  const lift = s < 2 ? 0 : s < 5 ? smooth((s - 2) / 3) : s < 6.6 ? 1 : s < 8.6 ? 1 - smooth((s - 6.6) / 2) : 0;
  H.at(5.8, 6.7, .14, HH => wrestler(HH, R, 5.8, 6.7, lift, 'practice', 1.08));
  const step = Math.sin(t * Math.PI / 6) * .16;
  H.at(7.98 + step, 4.25, .14, HH => wrestler(HH, R, 7.98 + step, 4.25, Math.sin(t * Math.PI / 3), 'footwork', .94));
  H.at(2.3, 3.8, 0, HH => wrestler(HH, R, 2.3, 3.8, 0, 'waiting', .94));
  H.at(5.7, 1.35, .49, HH => actor(HH, R, 5.7, 1.35, t * .2, 'sitfloor', { shirt: ['blue', .67], hairStyle: 'short', glasses: true }, .49, 1.17, 'elder'));
  if (s > 8.6 && s < 9.5) {
    const v = (s - 8.6) / .9;
    const [x, y] = H.p(6.7, 6.6, .16);
    H.opacity((1 - v) * .3, () => {
      for (let k = 0; k < 5; k++) oval(H, R, x - 13 + k * 7 + (k - 2) * v * 5, y - v * (7 + k % 2 * 4), 3 + v * 7, 2 + v * 4, 'paper', .8);
    });
  }
  const [x, y] = H.p(8.6, 1.3, .38);
  H.clip(ell(x, y - 44, 15, 15), () => {
    for (let k = 0; k < 3; k++) {
      const a = t * 2 + k * TAU / 3;
      shape(H, R, [[x, y - 44], [x + Math.cos(a) * 13, y - 44 + Math.sin(a) * 13], [x + Math.cos(a + .6) * 10, y - 44 + Math.sin(a + .6) * 10]], 'teal', .24, .4);
    }
    H.dot(x, y - 44, 2, 'blue', .6);
  });
});
