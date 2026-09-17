import { world, shape, oval, stroke, box, table, actor, cycle, bottle, ell, TAU } from '../../worlds/common.js';

function recordSleeve(H, R, i, j, z, ink, art = 0) {
  const cover = H.faceI(i, j, .81, z, z + .78);
  shape(H, R, cover, ink, .63, .8);
  H.clip(cover, () => {
    const [x, y] = H.p(i + .4, j + .01, z + .41);
    oval(H, R, x, y, 9 + art * 2, 10 - art, art % 2 ? 'sun' : 'paper', .8);
    H.line(R, [[x - 15, y + 8], [x + 14, y - 9]], 'blue', 3);
    H.dot(x + 5, y - 7, 4, 'coral', .8, { knock: true });
  });
}

function tumbler(H, R, i, j, z, ink = 'sun') {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y + 1, 8, 3, 'coral', .38);
  shape(H, R, [[x - 5, y], [x + 5, y], [x + 6, y - 13], [x - 6, y - 13]], 'paper', .75, .6);
  shape(H, R, [[x - 4, y - 1], [x + 4, y - 1], [x + 5, y - 8], [x - 5, y - 8]], ink, .42, .4);
  for (const dx of [-2, 2]) shape(H, R, [[x + dx - 2, y - 4], [x + dx + 2, y - 4], [x + dx + 1, y - 9], [x + dx - 3, y - 8]], 'paper', .76, .5);
}

function counterFront(H, R) {
  shape(H, R, H.faceI(2.08, 6.08, 8.64, .1, 1.21), 'blue', .78);
  H.line(R, [H.p(2.08, 6.1, 1.2), H.p(10.72, 6.1, 1.2)], 'coral', 2.1);
  for (let k = 0; k < 13; k++) H.line(R, [H.p(2.23 + k * .66, 6.1, .15), H.p(2.23 + k * .66, 6.1, 1.1)], 'teal', .7, { tone: .28 });
}

export default world('tokyo-golden-gai-records', 'Golden Gai · The record after the conversation', { floor: 'blue', tone: .66, wall: 'blue', wallTone: .92, pattern: 'boards', height: 3.75, head: 20 }, (H, R) => {
  box(H, R, .05, .09, 11.8, .38, 3.47, .26, 'coral', .46);
  box(H, R, .04, .05, .3, 9.42, 3.45, .23, 'coral', .45);
  shape(H, R, H.faceJ(.045, .61, 3.17, 2.4, 3.13), 'teal', .58);
  H.clip(H.faceJ(.045, .61, 3.17, 2.4, 3.13), () => {
    for (let k = 0; k < 14; k++) H.line(R, [H.p(.05, .65 + k * .23, 2.41), H.p(.05, .65 + k * .23, 3.11)], 'paper', .8, { tone: .55 });
  });
  H.outline(R, H.faceJ(.06, .61, 3.17, 2.4, 3.13), 'coral', 2);
  for (const z of [.6, 1.54, 2.48]) {
    box(H, R, 1.01, .08, 8.65, .66, z, .1, 'coral', .49);
    for (let k = 0; k < 38; k++) {
      const i = 1.12 + k * .218;
      shape(H, R, H.faceI(i, .76, .12 + k % 3 * .022, z + .11, z + .8 - k % 5 * .025), ['blue', 'paper', 'teal', 'coral', 'sun'][k % 5], k % 5 === 1 ? .85 : .52, .45);
    }
  }
  for (const i of [1, 3.94, 6.91, 9.57]) box(H, R, i, .09, .1, .66, .6, 2.83, 'blue', .9);
  recordSleeve(H, R, 3.03, .86, 1.66, 'teal', 1);
  recordSleeve(H, R, 7.64, .86, 2.61, 'coral', 2);
  shape(H, R, H.faceI(6.08, .83, .94, 1.67, 2.32), 'sun', .5);
  shape(H, R, H.faceI(6.16, .85, .78, 1.73, 2.25), 'paper', .9);
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(6.32 + k * .21, .87, 1.85 + k % 2 * .07);
    oval(H, R, x, y - 7, 2.3, 3, 'blue', .52);
    oval(H, R, x, y, 4.2, 5.4, 'teal', .5);
  }
  recordSleeve(H, R, 6.47, .94, 1.66, 'blue');
  for (const [i, j] of [[.42, 3.87], [10.23, .4]]) {
    box(H, R, i, j, 1.1, .85, 1.57, 1.26, 'blue', .92);
    const [x, y] = H.p(i + .55, j + .88, 2.15);
    oval(H, R, x, y, 13, 15, 'teal', .42);
    oval(H, R, x, y, 7.5, 9, 'blue', .88);
    H.dot(x, y - 20, 3.5, 'sun', .6, { knock: true });
  }
  table(H, R, 3.07, 2.07, 5.68, 1.31, 1.09, 'blue');
  box(H, R, 4.5, 2.14, 2.16, 1.09, 1.22, .16, 'coral', .55);
  box(H, R, 7.06, 2.13, 1.43, .96, 1.22, .37, 'blue', .8);
  for (let k = 0; k < 5; k++) {
    const [x, y] = H.p(7.22 + k * .23, 3.11, 1.39);
    H.dot(x, y, k === 4 ? 3.6 : 1.5, k === 4 ? 'paper' : 'sun', .85, { knock: true });
  }
  box(H, R, 3.34, 2.4, .76, .22, 1.22, .12, 'paper', .8);
  for (let k = 0; k < 7; k++) H.line(R, [H.p(3.38 + k * .1, 2.61, 1.23), H.p(3.38 + k * .1, 2.61, 1.17)], 'blue', .55);
  table(H, R, 2.08, 5.02, 8.64, 1.06, 1.2, 'coral');
  table(H, R, 9.64, 3.26, 1.08, 1.9, 1.2, 'coral');
  counterFront(H, R);
  for (let k = 0; k < 6; k++) {
    const i = 2.49 + k * 1.37;
    table(H, R, i, 6.87, .73, .73, .57, k === 2 ? 'teal' : 'coral');
    if (k === 2) {
      shape(H, R, H.tile(i + .1, 7.01, .39, .33, .705), 'paper', .7);
      for (let q = 0; q < 5; q++) H.line(R, [H.p(i + .12 + q * .07, 7, .72), H.p(i + .12 + q * .07, 7.12, .72)], 'blue', .6);
    }
    if (k % 2 === 0) tumbler(H, R, i + .46, 5.65, 1.34, k === 2 ? 'teal' : 'sun');
  }
  box(H, R, 10.35, 1.91, .58, .58, 0, .51, 'teal', .43);
  for (let k = 0; k < 4; k++) bottle(H, R, ...H.p(10.48 + k % 2 * .21, 2.02 + Math.floor(k / 2) * .24, .59), ['sun', 'teal'][k % 2], .43);
  for (const z of [1.17, 2.12]) {
    box(H, R, .14, 7.55, .56, 2.84, z, .09, 'coral', .5);
    for (let k = 0; k < 7; k++) bottle(H, R, ...H.p(.43, 7.72 + k * .37, z + .09), ['sun', 'teal', 'coral'][k % 3], .42 + k % 3 * .05);
  }
  const [ix, iy] = H.p(9.24, 5.38, 1.34);
  shape(H, R, [[ix - 9, iy], [ix + 9, iy], [ix + 12, iy - 17], [ix - 12, iy - 17]], 'teal', .5);
  oval(H, R, ix, iy - 17, 12, 4.5, 'paper');
  for (let k = 0; k < 4; k++) oval(H, R, ix - 7 + k * 4.5, iy - 17 + k % 2 * 2, 3, 2, 'paper');
  stroke(H, R, [[ix - 11, iy - 12], [ix - 17, iy - 20], [ix, iy - 27], [ix + 17, iy - 20], [ix + 11, iy - 12]], 'blue', 1);
  bottle(H, R, ...H.p(10.05, 4.31, 1.34), 'teal', .68, false);
  const [mx, my] = H.p(8.55, 5.42, 1.34);
  shape(H, R, [[mx - 5, my], [mx + 5, my], [mx + 2, my - 7], [mx + 5, my - 14], [mx - 5, my - 14], [mx - 2, my - 7]], 'paper', .9, .6);
  stroke(H, R, [H.p(8.31, 5.53, 1.36), H.p(8.22, 5.37, 1.39), H.p(8.39, 5.26, 1.38), H.p(8.55, 5.3, 1.36)], 'sun', 2.5);
  box(H, R, 9.83, 3.69, .63, .45, 1.34, .055, 'paper');
  for (let k = 0; k < 4; k++) H.line(R, [H.p(9.88 + k * .14, 3.72, 1.41), H.p(9.88 + k * .14, 4.1, 1.41)], 'teal', .65);
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(7.29 + k * .22, 5.2, 1.35);
    oval(H, R, x, y, 2.8, 2, 'sun', .7);
    H.line(R, [[x, y], [x, y - 4]], 'blue', 2);
  }
  for (const [i, ink] of [[3.57, 'teal'], [6.4, 'paper'], [9.05, 'coral']]) {
    const [x, y] = H.p(i, 5.22, 1.34);
    shape(H, R, [[x - 4, y], [x + 4, y], [x + 5, y - 9], [x - 5, y - 9]], ink, .72, .6);
    oval(H, R, x, y - 9, 4.7, 1.8, 'blue', .75);
  }
  H.line(R, [H.p(10.9, 8.4, .06), H.p(10.9, 8.4, 2.18)], 'coral', 2.8);
  for (let k = 0; k < 3; k++) stroke(H, R, [H.p(10.9, 8.4, 1.92), H.p(10.55 + k * .3, 8.48, 2.14), H.p(10.53 + k * .3, 8.56, 1.92)], 'sun', 1.2);
  const [cx, cy] = H.p(10.77, 8.48, 1.9);
  shape(H, R, [[cx - 3, cy], [cx - 14, cy + 11], [cx - 10, cy + 40], [cx + 10, cy + 40], [cx + 13, cy + 11], [cx + 3, cy]], 'teal', .56);
  const [ux, uy] = H.p(11.18, 9.27, 0);
  stroke(H, R, [[ux, uy], [ux - 3, uy - 45], [ux + 3, uy - 50], [ux + 7, uy - 46]], 'sun', 1.1);
  shape(H, R, [[ux - 5, uy - 2], [ux - 6, uy - 38], [ux, uy - 42], [ux + 5, uy - 36], [ux + 3, uy - 2]], 'blue', .6);
  shape(H, R, H.tile(2, 9.6, 3.44, 1.5, .02), 'teal', .25);
  const [lx, ly] = H.p(6.51, 5.34, 3.44);
  H.line(R, [[lx, ly - 7], [lx, ly + 15]], 'blue', 1.2);
  shape(H, R, [[lx - 18, ly + 36], [lx - 9, ly + 14], [lx + 9, ly + 14], [lx + 18, ly + 36]], 'sun', .76);
  oval(H, R, lx, ly + 36, 18, 5, 'paper');
  H.glow(lx, ly + 48, 69, 41, 'sun', .18);
}, (H, R, t) => {
  const u = cycle(t, 18) * 18, listening = u >= 4;
  const [x, y] = H.p(5.32, 2.72, 1.41);
  oval(H, R, x, y, 28, 13.7, 'blue', .96);
  for (const r of [12, 18, 23]) H.outline(R, ell(x, y, r, r * .49), 'paper', .55, { tone: .25, amp: .05 });
  oval(H, R, x, y, 7, 3.5, 'coral', .66);
  const a = listening ? (u - 4) * .8 : 0;
  H.line(R, [[x + Math.cos(a) * 3, y + Math.sin(a) * 1.5], [x + Math.cos(a) * 22, y + Math.sin(a) * 11]], 'sun', .65, { tone: .7 });
  const drop = Math.max(0, Math.min(1, (u - 2) / 2));
  const [ax, ay] = H.p(6.25, 2.38, 1.45);
  stroke(H, R, [[ax, ay], [ax - 9 - drop * 10, ay + 7 + drop * 5], [ax - 23 - drop * 9, ay + 8 + drop * 7]], 'paper', 2);
  H.dot(ax, ay, 3.5, 'blue', .9, { knock: true });
  H.line(R, [[ax + 6, ay + 4], [ax + 6, ay - 4 + drop * 5]], 'sun', 1.1);
  actor(H, R, 5.66, 3.98, t * .17, u < 4 ? 'water' : 'idle', { shirt: ['coral', .45], face: 'nw', glasses: true }, 0, 1.25);
  if (u > 4) recordSleeve(H, R, 3.32, 3.03, 1.24, 'teal', 1);
  counterFront(H, R);
  for (const [i, ink, delay] of [[2.85, 'paper', 0], [5.59, 'teal', 2], [8.33, 'coral', 4]]) {
    actor(H, R, i, 7.22, t * .12 + delay, i === 2.85 && u > 4 && u < 6 ? 'read' : 'sit', { shirt: [ink, .65], face: i === 2.85 && u > 4 && u < 7 ? 'ne' : 'nw' }, .23, 1.19);
  }
  if (u > 7 && u < 8) {
    const [fx, fy] = H.p(5.95, 5.96, 1.37);
    H.line(R, [[fx, fy - Math.sin((u - 7) * Math.PI) * 3], [fx + 4, fy]], 'coral', 2);
  }
  const [ix, iy] = H.p(5.69, 5.66, 1.37);
  H.dot(ix + Math.sin(t * .4) * 2, iy - 7, 1.05, 'paper', 1, { knock: true });
});
