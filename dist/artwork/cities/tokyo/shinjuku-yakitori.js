import { world, shape, oval, stroke, box, table, actor, cycle, bottle, lantern, ell } from '../../worlds/common.js';

function glass(H, R, i, j, z, filled = true) {
  const [x, y] = H.p(i, j, z);
  const body = [[x - 4, y], [x + 4, y], [x + 6, y - 17], [x - 6, y - 17]];
  shape(H, R, body, 'paper', .85, .65);
  if (filled) H.clip(body, () => {
    shape(H, R, [[x - 6, y - 2], [x + 6, y - 2], [x + 6, y - 13], [x - 6, y - 13]], 'sun', .7, .5);
    oval(H, R, x, y - 13, 5.5, 2.3, 'paper');
  });
  H.line(R, [[x - 2, y - 3], [x - 3, y - 10]], 'paper', 1);
  for (const [dx, dy] of [[2, -7], [-3, -12], [3, -3]]) H.dot(x + dx, y + dy, .8, 'teal', .5);
}

function skewer(H, R, i, j, z, rotation = 0, kind = 0) {
  const [x, y] = H.p(i, j, z), dx = Math.cos(rotation), dy = Math.sin(rotation) * .5;
  H.line(R, [[x - dx * 15, y - dy * 15], [x + dx * 17, y + dy * 17]], 'sun', 1.3);
  for (let k = 0; k < 4; k++) {
    const px = x + dx * (k * 6 - 8), py = y + dy * (k * 6 - 8);
    oval(H, R, px, py, 4, kind === 1 ? 3.8 : 3, kind === 1 ? 'blue' : k % 2 ? 'teal' : 'coral', kind === 1 ? .56 : .67);
    H.line(R, [[px - 2, py - 1], [px + 1, py + 1]], 'blue', .65);
  }
}

function plate(H, R, i, j, z, food = true) {
  oval(H, R, ...H.p(i, j, z), 17, 7, 'paper');
  H.outline(R, ell(...H.p(i, j, z), 13, 4.8), 'teal', .65);
  if (food) skewer(H, R, i, j, z + .035, -.18);
}

function foreground(H, R) {
  shape(H, R, H.faceI(1.65, 6.12, 8.85, .12, 1.19), 'coral', .62);
  for (let k = 0; k < 14; k++) H.line(R, [H.p(1.7 + k * .62, 6.13, .18), H.p(1.7 + k * .62, 6.13, 1.16)], 'blue', .65, { tone: .45 });
  H.line(R, [H.p(1.65, 6.14, 1.19), H.p(10.5, 6.14, 1.19)], 'sun', 1.4);
}

export default world('tokyo-shinjuku-yakitori', 'Omoide Yokocho · Six stools and a charcoal grill', { floor: 'blue', tone: .45, wall: 'blue', wallTone: .82, pattern: 'boards', height: 3.45, head: 20 }, (H, R) => {
  for (const i of [.2, 3.8, 7.4, 11.3]) box(H, R, i, .05, .15, .18, 0, 3.38, 'coral', .45);
  box(H, R, .1, .08, 11.7, .38, 3.15, .24, 'coral', .58);
  box(H, R, .07, .16, .25, 9.5, 3.12, .23, 'coral', .6);
  for (let k = 0; k < 9; k++) {
    shape(H, R, H.faceI(1.14 + k * .73, .2, .44, 2.32, 2.91), 'paper', .9);
    H.dot(...H.p(1.36 + k * .73, .21, 2.86), 1.1, 'coral');
  }
  box(H, R, 9.8, .24, 1.62, 1.33, 0, 2.05, 'paper', .84);
  H.line(R, [H.p(9.86, 1.59, 1.38), H.p(11.34, 1.59, 1.38)], 'blue', 1.3);
  for (const z of [.95, 1.73]) H.line(R, [H.p(10.03, 1.6, z), H.p(10.03, 1.6, z + .21)], 'blue', 2.4);
  box(H, R, .6, 1.3, 2.1, 1.2, 0, 1.17, 'teal', .45);
  shape(H, R, H.tile(.85, 1.5, 1.48, .75, 1.19), 'blue', .8);
  shape(H, R, H.tile(.99, 1.6, 1.19, .49, 1.2), 'paper', .8);
  stroke(H, R, [H.p(1.93, 1.42, 1.2), H.p(1.93, 1.42, 1.75), H.p(1.49, 1.68, 1.75), H.p(1.49, 1.68, 1.53)], 'blue', 2.3);
  table(H, R, 3.16, 1.19, 5.65, 1.25, 1.08, 'teal');
  for (let k = 0; k < 3; k++) {
    box(H, R, 3.4 + k * 1.2, 1.33, 1.04, .77, 1.21, .07, 'paper');
    for (let q = 0; q < 4; q++) skewer(H, R, 3.89 + k * 1.2, 1.49 + q * .16, 1.3, .5, k === 1 ? 1 : 0);
  }
  box(H, R, 2.24, 3.76, 4.16, 1.12, .52, .64, 'blue', .87);
  shape(H, R, H.tile(2.39, 3.86, 3.86, .88, 1.18), 'blue', .96);
  for (let k = 0; k < 14; k++) {
    const i = 2.5 + k % 7 * .52, j = 3.99 + Math.floor(k / 7) * .34;
    box(H, R, i, j, .37, .23, 1.2, .11, k % 3 ? 'coral' : 'blue', .65);
  }
  for (let k = 0; k < 12; k++) H.line(R, [H.p(2.43 + k * .32, 3.83, 1.34), H.p(2.43 + k * .32, 4.78, 1.34)], 'blue', 1.15);
  for (let k = 0; k < 5; k++) skewer(H, R, 2.85 + k * .57, 4.26, 1.43, -.45, k === 4 ? 1 : 0);
  shape(H, R, [H.p(2.01, 3.49, 2.54), H.p(6.65, 3.49, 2.54), H.p(6.14, 2.88, 3.03), H.p(2.6, 2.88, 3.03)], 'blue', .66);
  box(H, R, 3.67, 2.55, 1.13, .61, 3.03, .38, 'teal', .48);
  for (let k = 0; k < 7; k++) H.line(R, [H.p(2.4 + k * .57, 3.5, 2.57), H.p(2.59 + k * .51, 3.01, 2.92)], 'paper', .7, { tone: .4 });
  table(H, R, 1.65, 5.1, 8.85, 1.02, 1.18, 'sun');
  foreground(H, R);
  for (let k = 0; k < 6; k++) {
    const i = 2.02 + k * 1.45;
    table(H, R, i, 6.77, .77, .77, .55, 'coral');
    H.line(R, [H.p(i + .08, 6.89, .23), H.p(i + .7, 6.89, .23)], 'blue', 1.8);
    if (k !== 2 && k !== 4) {
      plate(H, R, i + .39, 5.55, 1.33, k !== 1);
      glass(H, R, i + .8, 5.6, 1.33);
      box(H, R, i + .05, 5.94, .42, .2, 1.33, .065, 'paper');
    }
  }
  for (const i of [3.1, 8.9]) {
    const [x, y] = H.p(i, 5.18, 1.34);
    oval(H, R, x, y, 6, 3, 'teal');
    shape(H, R, [[x - 5, y], [x + 5, y], [x + 6, y - 13], [x - 6, y - 13]], 'teal', .65);
    for (let k = 0; k < 6; k++) H.line(R, [[x - 4 + k * 1.6, y - 9], [x - 6 + k * 2, y - 28 - k % 2 * 3]], 'sun', .8);
  }
  const [px, py] = H.p(7.08, 4.94, 1.34);
  oval(H, R, px, py, 12, 6, 'blue', .8);
  oval(H, R, px, py - 7, 12, 6, 'coral', .45);
  stroke(H, R, [[px + 10, py - 4], [px + 21, py - 8]], 'blue', 2.4);
  H.line(R, [H.p(7.59, 5.07, 1.34), H.p(8.09, 4.77, 1.34), H.p(7.72, 5.22, 1.34)], 'blue', 1.7);
  const [fx, fy] = H.p(6.84, 5.26, 1.34);
  shape(H, R, [[fx - 13, fy - 13], [fx + 11, fy - 17], [fx + 9, fy + 1], [fx, fy + 5]], 'paper', .8);
  for (let k = 0; k < 5; k++) H.line(R, [[fx, fy + 9], [fx - 12 + k * 5, fy - 14]], 'coral', .7);
  for (const [i, j] of [[8.68, 2.93], [10.35, 3.56]]) {
    box(H, R, i, j, 1.1, .88, 0, .61, 'coral', .5);
    for (let k = 0; k < 6; k++) bottle(H, R, ...H.p(i + .22 + k % 3 * .32, j + .22 + Math.floor(k / 3) * .38, .65), 'teal', .42);
    for (let k = 0; k < 4; k++) H.line(R, [H.p(i + .12 + k * .27, j + .89, .13), H.p(i + .12 + k * .27, j + .89, .55)], 'blue', .7);
  }
  box(H, R, 7.7, 7.02, .52, .42, 0, .63, 'blue', .6);
  stroke(H, R, [H.p(7.74, 7.23, .63), H.p(7.96, 7.23, .87), H.p(8.18, 7.23, .63)], 'sun', 1.1);
  for (const j of [4.2, 5.35, 6.5]) {
    const [x, y] = H.p(.17, j, 2.15);
    stroke(H, R, [[x, y - 7], [x, y], [x + 6, y + 3]], 'sun', 1.4);
    shape(H, R, [[x - 4, y + 4], [x - 14, y + 13], [x - 10, y + 38], [x + 9, y + 38], [x + 13, y + 13], [x + 4, y + 4]], j === 5.35 ? 'teal' : 'paper', .7);
  }
  shape(H, R, H.tile(.35, 10.33, 11.12, 1.13, .025), 'blue', .72);
  for (let k = 0; k < 12; k++) H.line(R, [H.p(.58 + k * .86, 10.5, .035), H.p(.95 + k * .86, 11.23, .035)], 'teal', 1, { tone: .5 });
  for (const i of [.72, 3.27]) box(H, R, i, 9.94, .15, .18, 0, 2.58, 'coral', .65);
  H.line(R, [H.p(.65, 10.06, 2.61), H.p(3.5, 10.06, 2.61)], 'blue', 3);
  lantern(H, R, 10.84, 8.27, 2.63, 'sun');
}, (H, R, t) => {
  const u = cycle(t, 13) * 13;
  actor(H, R, 4.51, 3.17, t * .35, u < 5 ? 'water' : 'hold', { shirt: ['paper', 1], apron: ['teal', .72], hairStyle: 'cap', face: 'se' }, 0, 1.3);
  for (let k = 0; k < 8; k++) {
    const [x, y] = H.p(2.55 + k % 4 * .85, 4.09 + Math.floor(k / 4) * .27, 1.31);
    H.glow(x, y, 7, 4, 'coral', .12 + .07 * Math.sin(t * 1.3 + k));
  }
  const turning = u < 4 ? Math.sin(u * Math.PI / 4) : 0;
  skewer(H, R, 4.45, 4.22, 1.44 + turning * .13, -.45 + turning * .9);
  for (let k = 0; k < 5; k++) {
    const p = cycle(t + k * .87, 4.5), [x, y] = H.p(2.83 + k * .61, 4.2 - p * .36, 1.48 + p * 1.08);
    H.opacity(Math.sin(p * Math.PI) * .32, () => stroke(H, R, [[x - 5, y], [x + 4, y - 8], [x - 3, y - 18]], 'paper', 2));
  }
  foreground(H, R);
  const slide = Math.max(0, Math.min(1, (u - 6) / 2));
  plate(H, R, 4.25, 5.17 + slide * .52, 1.34);
  for (const [i, ink, delay] of [[2.42, 'teal', 0], [3.87, 'coral', 1], [6.77, 'paper', 2], [9.67, 'teal', 3]]) {
    actor(H, R, i, 7.1 + (i === 3.87 && u > 5 && u < 9 ? .12 : 0), t * .2 + delay, i === 3.87 && u > 5 && u < 9 ? 'sit' : 'drink', { shirt: [ink, .68], face: 'nw' }, .2, 1.2);
  }
  for (let k = 0; k < 3; k++) {
    const sway = Math.sin(t * .9 + k) * .06 + (u > 9 && u < 11 ? Math.sin((u - 9) * Math.PI / 2) * .25 : 0);
    shape(H, R, [H.p(.87 + k * .77, 10.05, 2.58), H.p(1.57 + k * .77, 10.05, 2.58), H.p(1.57 + k * .77, 10.05 + sway, 1.72), H.p(.87 + k * .77, 10.05 + sway, 1.69)], 'teal', .72);
  }
});
