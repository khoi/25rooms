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


function stableDetails(H, R) {
  box(H, R, .28, 6.9, .95, 3.75, .02, .81, 'coral', .44);
  for (const j of [7.05, 8.18, 9.32]) {
    shape(H, R, H.faceJ(1.245, j, 1.0, .16, .66), 'blue', .65, .65);
    for (let k = 0; k < 4; k++) {
      const [x, y] = H.p(1.25, j + .17 + k * .23, .38);
      oval(H, R, x, y, 5.5, 4.5, k % 2 ? 'paper' : 'sun', k % 2 ? 1 : .32);
      oval(H, R, x, y, 2.5, 2, 'coral', .25);
    }
  }
  for (let k = 0; k < 5; k++) box(H, R, .39, 7.1, .7, 1.12, .85 + k * .1, .09, k === 2 ? 'coral' : 'paper', k === 2 ? .55 : 1);
  for (let k = 0; k < 4; k++) box(H, R, .42, 9.36, .65, .95, .84 + k * .1, .08, k % 2 ? 'teal' : 'paper', k % 2 ? .35 : 1);
  for (const j of [7.22, 10.25]) line(H, R, [H.p(.2, j, 1.71), H.p(.2, j, 2.38)], 1.4);
  line(H, R, [H.p(.2, 7.18, 2.33), H.p(.2, 10.32, 2.33)], 1.7);
  for (let k = 0; k < 4; k++) {
    const j = 7.44 + k * .7;
    shape(H, R, H.faceJ(.24, j, .52, 1.17, 2.32), k === 1 ? 'coral' : 'paper', k === 1 ? .55 : 1, .6);
    for (const z of [1.26, 1.37]) line(H, R, [H.p(.25, j + .03, z), H.p(.25, j + .49, z)], .8, 'teal');
  }
  for (const i of [1.6, 3.1, 7.05]) {
    box(H, R, i, .73, 1.1, .89, .38, .11, i > 5 ? 'teal' : 'paper', i > 5 ? .45 : .85);
    H.outline(R, H.tile(i + .1, .83, .9, .67, .51), 'coral', .7, {tone: .4, amp: .1});
  }
  box(H, R, 3.88, .14, 1.65, .53, 1.71, .1, 'coral', .5);
  for (let k = 0; k < 7; k++) {
    box(H, R, 3.98 + k * .2, .21, .14, .39, 1.83, .42 + k % 3 * .08, k % 2 ? 'paper' : 'teal', k % 2 ? 1 : .5);
  }
  shape(H, R, H.faceI(6.38, .12, 1.2, 1.16, 1.92), 'paper', 1, .7);
  for (let row = 0; row < 4; row++) for (let col = 0; col < 5; col++) {
    const [x, y] = H.p(6.51 + col * .2, .14, 1.28 + row * .15);
    H.dot(x, y, 1.4, col === 4 ? 'coral' : 'blue', .5);
  }
  box(H, R, 8.17, .15, .7, .38, 1.65, .54, 'blue', .55);
  shape(H, R, H.faceI(8.28, .55, .49, 1.76, 2.06), 'paper', 1, .5);
  for (let k = 0; k < 3; k++) line(H, R, [H.p(8.35, .57, 1.81 + k * .07), H.p(8.68, .57, 1.81 + k * .07)], .5, 'teal');
  box(H, R, 10.22, 7.13, 1.13, 1.25, .02, .49, 'teal', .45);
  for (let k = 0; k < 4; k++) {
    const [x, y] = H.p(10.43 + k % 2 * .5, 7.4 + Math.floor(k / 2) * .56, .54);
    oval(H, R, x, y - 5, 8, 6, 'paper', 1);
    oval(H, R, x, y - 5, 4, 2.8, 'blue', .25);
    line(H, R, [[x - 7, y], [x + 7, y]], 1, 'coral', .6);
  }
  box(H, R, 10.56, 2.28, .67, 1.67, .03, .56, 'sun', .48);
  for (let k = 0; k < 5; k++) {
    const [x, y] = H.p(10.9, 2.5 + k * .27, .59);
    oval(H, R, x, y - 10, 7, 11, 'paper', .86);
    for (let n = 0; n < 5; n++) line(H, R, [[x - 5 + n * 2.5, y - 18], [x - 5 + n * 2.5, y - 3]], .5, 'coral', .55);
    line(H, R, [[x - 7, y - 9], [x + 7, y - 9]], 1.2, 'blue');
  }
  box(H, R, 1.2, 10.52, 2.7, 1.08, .08, .75, 'teal', .62);
  box(H, R, 1.12, 10.44, 2.87, 1.25, .85, .13, 'paper', 1);
  for (const i of [1.3, 3.61]) for (const j of [10.66, 11.46]) oval(H, R, ...H.p(i, j, .1), 4, 5, 'blue', .8);
  const [px, py] = H.p(2.05, 11.0, 1.02);
  shape(H, R, [[px - 21, py - 20], [px + 21, py - 20], [px + 19, py + 2], [px - 18, py + 2]], 'paper', 1, .9);
  oval(H, R, px, py - 20, 21, 9, 'sun', .28);
  for (const dx of [-24, 24]) line(H, R, [[px + dx, py - 16], [px + dx * 1.22, py - 16], [px + dx * 1.22, py - 9], [px + dx, py - 9]], 1.8);
  for (let k = 0; k < 8; k++) oval(H, R, px - 13 + k % 4 * 8, py - 23 + Math.floor(k / 4) * 6, 3.5, 2, k % 3 ? 'teal' : 'coral', .55);
  const [lx, ly] = H.p(3.23, 11.06, 1.0);
  oval(H, R, lx, ly, 15, 7, 'paper', 1);
  H.dot(lx, ly - 5, 3, 'blue', .7);
  for (let k = 0; k < 4; k++) {
    const [x, y] = H.p(3.46, 10.65, 1.01 + k * .08);
    shape(H, R, [[x - 8, y - 4], [x + 8, y - 4], [x + 5, y + 3], [x - 5, y + 3]], 'paper', 1, .55);
    oval(H, R, x, y - 4, 8, 3, 'teal', .25);
  }
  for (let k = 0; k < 5; k++) line(H, R, [H.p(3.69, 11.22 + k * .07, 1.02), H.p(3.3, 11.22 + k * .07, 1.02)], 1.1, 'coral');
  box(H, R, 4.42, 10.56, 1.2, .78, .02, .54, 'sun', .4);
  for (let k = 0; k < 4; k++) {
    const [x, y] = H.p(4.64 + k % 2 * .47, 10.73 + Math.floor(k / 2) * .32, .59);
    shape(H, R, [[x - 7, y], [x + 7, y], [x + 6, y - 20], [x - 5, y - 22]], 'paper', 1, .6);
    line(H, R, [[x - 4, y - 9], [x + 4, y - 9]], 3, 'coral');
  }
  box(H, R, 7.3, 10.64, 1.65, .91, .02, .34, 'coral', .4);
  for (let k = 0; k < 4; k++) {
    box(H, R, 7.45, 10.77, 1.36, .64, .38 + k * .15, .12, k % 2 ? 'teal' : 'paper', k % 2 ? .38 : 1);
    line(H, R, [H.p(7.53, 11.43, .43 + k * .15), H.p(8.75, 11.43, .43 + k * .15)], .6, 'coral');
  }
  for (const i of [9.05, 9.4]) {
    const [x, y] = H.p(i, 10.92, .02);
    oval(H, R, x, y - 2, 7, 4, 'sun', .5);
    line(H, R, [[x - 3, y + 1], [x, y - 5], [x + 4, y]], 1.2, 'blue');
  }
}

function seatedWrestler(H, R, i, j, t, towel = false) {
  const [x, y] = H.p(i, j, .48);
  oval(H, R, x, y - 4, 28, 9, 'blue', .8);
  for (const side of [-1, 1]) {
    oval(H, R, x + side * 18, y - 3, 15, 7, 'coral', .28);
    oval(H, R, x + side * 9, y + 2, 9, 4, 'paper', .85);
  }
  oval(H, R, x, y - 27, 20, 24, 'coral', .26);
  oval(H, R, x, y - 53, 9, 11, 'coral', .28);
  shape(H, R, [[x - 10, y - 54], [x - 8, y - 63], [x, y - 68], [x + 8, y - 62], [x + 9, y - 55], [x + 1, y - 59]], 'blue', .9, .7);
  oval(H, R, x - 3, y - 67, 4, 3, 'blue', .9);
  for (const dx of [-3, 3]) H.dot(x + dx, y - 51, .9, 'blue', .9);
  line(H, R, [[x - 3, y - 45], [x + 3, y - 45]], .7);
  const wipe = towel ? (Math.sin(t * .5) + 1) * 9 : 0;
  for (const side of [-1, 1]) {
    const path = [[x + side * 15, y - 39], [x + side * 25, y - 23], [x + side * 17, y - 11 - wipe]];
    line(H, R, path, 9, 'paper', 1);
    line(H, R, path, 7, 'coral', .3);
  }
  shape(H, R, [[x - 18, y - 11 - wipe], [x + 18, y - 11 - wipe], [x + 16, y + 1 - wipe], [x - 16, y + 1 - wipe]], 'paper', 1, .6);
  for (const dx of [-13, 12]) line(H, R, [[x + dx, y - 9 - wipe], [x + dx, y - 1 - wipe]], 1.2, towel ? 'coral' : 'teal');
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
  stableDetails(H, R);
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
  H.at(2.22, 1.36, .48, HH => seatedWrestler(HH, R, 2.22, 1.36, t, true));
  H.at(7.35, 1.4, .48, HH => seatedWrestler(HH, R, 7.35, 1.4, t, false));
  H.at(2.5, 10.1, 0, HH => {
    actor(HH, R, 2.5, 10.1, t * .22, 'water', {shirt: ['paper', 1], apron: ['teal', .65], hairStyle: 'short'}, 0, 1.23);
    const [x, y] = HH.p(2.09 + Math.sin(t * .8) * .13, 10.87, 1.55);
    line(HH, R, [[x, y + 13], [x - 10, y - 20]], 2, 'coral');
    oval(HH, R, x, y + 14, 4.5, 2, 'paper', 1);
    const p = cycle(t, 5);
    HH.opacity(Math.sin(p * Math.PI) * .48, () => stroke(HH, R, [[x + 8, y + 4 - p * 18], [x + 13, y - 8 - p * 18], [x + 5, y - 20 - p * 18]], 'paper', 1.7));
  });
  H.at(10.7, 8.68, 0, HH => actor(HH, R, 10.7, 8.68, t * .21, 'kneel', {shirt: ['blue', .64], pants: ['paper', 1], hairStyle: 'short'}, 0, 1.1));
  const [x, y] = H.p(8.6, 1.3, .38);
  H.clip(ell(x, y - 44, 15, 15), () => {
    for (let k = 0; k < 3; k++) {
      const a = t * 2 + k * TAU / 3;
      shape(H, R, [[x, y - 44], [x + Math.cos(a) * 13, y - 44 + Math.sin(a) * 13], [x + Math.cos(a + .6) * 10, y - 44 + Math.sin(a + .6) * 10]], 'teal', .24, .4);
    }
    H.dot(x, y - 44, 2, 'blue', .6);
  });
});
