import { world, shape, oval, stroke, label, plaque, box, table, bench, actor, creature, bottle, ell, wallRect, TAU } from '../common.js';

function towel(H, R, i, j, z, ink = 'paper') {
  const points = [H.p(i, j, z), H.p(i + .62, j, z), H.p(i + .62, j + .25, z), H.p(i + .62, j + .28, z - .36), H.p(i, j + .28, z - .36), H.p(i, j + .25, z)];
  shape(H, R, points, ink, .95);
  for (const x of [.08, .15, .47, .54]) H.line(R, [H.p(i + x, j, z + .01), H.p(i + x, j + .28, z - .33)], 'coral', .65);
}

function dumbbell(H, R, i, j, z = .16, size = 1) {
  const [x, y] = H.p(i, j, z);
  H.line(R, [[x - 13 * size, y - 5 * size], [x + 13 * size, y + 5 * size]], 'paper', 3 * size);
  for (const d of [-1, 1]) {
    oval(H, R, x + d * 12 * size, y + d * 4.6 * size, 4.8 * size, 9 * size, 'blue', .9);
    oval(H, R, x + d * 15 * size, y + d * 5.8 * size, 3.5 * size, 8 * size, 'teal', .7);
    H.dot(x + d * 15 * size, y + d * 5.8 * size, 1.5 * size, 'paper');
  }
}

function glove(H, R, x, y, ink = 'coral', size = 1) {
  oval(H, R, x, y - 5 * size, 7 * size, 8 * size, ink, .85);
  oval(H, R, x - 5 * size, y - 1 * size, 3 * size, 4 * size, ink, .85);
  shape(H, R, [[x - 4 * size, y], [x + 5 * size, y], [x + 4 * size, y + 7 * size], [x - 4 * size, y + 7 * size]], 'paper', .95);
  H.line(R, [[x - 3 * size, y + 3 * size], [x + 3 * size, y + 3 * size]], 'blue', .7);
}

function robot(H, R, i, j, t, ink, pose = 'skip', z = 0) {
  const jump = pose === 'skip' ? Math.max(0, Math.sin(t * 7)) * 4 : 0;
  const [x, fy] = H.p(i, j, z), y = fy - jump;
  const punch = Math.sin(t * 9), arm = pose === 'bag' ? punch * 7 : 0;
  oval(H, R, x, fy + 3, 17, 5, 'blue', .3);
  for (const d of [-1, 1]) {
    stroke(H, R, [[x + d * 6, y - 13], [x + d * 7, y - 5], [x + d * 10, y]], 'blue', 4);
    oval(H, R, x + d * 10, y, 6, 3, 'paper');
  }
  shape(H, R, [[x - 11, y - 39], [x + 11, y - 39], [x + 10, y - 15], [x - 10, y - 15]], ink, .8);
  for (const d of [-1, 1]) {
    const hx = pose === 'bag' ? x + d * 14 + arm : x + d * 22;
    const hy = pose === 'bag' ? y - 46 - d * arm : y - 25;
    stroke(H, R, [[x + d * 11, y - 35], [x + d * 18, y - 29], [hx, hy]], 'blue', 3);
    oval(H, R, x + d * 18, y - 29, 3, 3, 'paper');
    glove(H, R, hx, hy, 'coral', .65);
  }
  shape(H, R, [[x - 10, y - 57], [x + 10, y - 57], [x + 10, y - 42], [x - 10, y - 42]], 'paper', 1);
  for (const d of [-1, 1]) H.dot(x + d * 4, y - 50, 1.8, 'teal');
  H.line(R, [[x - 5, y - 45], [x + 5, y - 45]], 'blue', 1);
  H.line(R, [[x, y - 57], [x + 2, y - 64]], 'blue', 1);
  H.dot(x + 2, y - 65, 2, 'sun');
  for (let n = 0; n < 3; n++) H.dot(x - 5 + n * 5, y - 29, 1.5, 'sun');
  if (pose === 'skip') {
    const depth = Math.cos(t * 7), rope = [];
    for (let n = 0; n <= 28; n++) {
      const a = n / 28 * Math.PI;
      rope.push([x - Math.cos(a) * 25, y - 24 + Math.sin(a) * (depth * 44)]);
    }
    H.line(R, rope, 'sun', 1.5, { amp: .1 });
  }
}

const gym = world('robot-boxing', 'Underground boxing club', { floor: 'blue', tone: .48, wall: 'coral', wallTone: .56, wallStyle: 'brick', height: 3.2, pattern: 'boards' }, (H, R) => {
  shape(H, R, wallRect(H, 'nw', .35, 11.65, .08, .45), 'blue', .78);
  shape(H, R, wallRect(H, 'ne', .35, 11.65, .08, .45), 'blue', .78);
  plaque(H, R, 5.8, .15, 2.65, 'NO HARD FEELINGS', 'sun', 122);
  for (const [i, j] of [[3.1, .1], [7.6, .1], [.1, 7.6]]) {
    const [x, y] = H.p(i, j, 3.08);
    H.line(R, [[x, y - 12], [x, y + 1]], 'blue', 1);
    shape(H, R, [[x - 15, y + 8], [x - 8, y], [x + 8, y], [x + 15, y + 8]], 'paper', 1);
    H.line(R, [[x - 13, y + 8], [x + 13, y + 8]], 'sun', 3);
  }
  for (let k = 0; k < 4; k++) {
    const i = .45 + k * .82;
    box(H, R, i, .18, .72, .68, 0, 2.08, k % 2 ? 'teal' : 'paper', .65);
    const face = [H.p(i + .05, .87, .12), H.p(i + .67, .87, .12), H.p(i + .67, .87, 2), H.p(i + .05, .87, 2)];
    shape(H, R, face, k % 2 ? 'teal' : 'paper', .72);
    for (let z = 1.64; z < 1.92; z += .09) H.line(R, [H.p(i + .17, .88, z), H.p(i + .54, .88, z)], 'blue', .8);
    H.dot(...H.p(i + .55, .89, 1), 1.5, 'sun');
    label(H, String(11 + k), ...H.p(i + .34, .9, 1.45), 6);
  }
  towel(H, R, 1.27, .35, 2.12);
  const score = H.p(10.12, .09, 2.05);
  shape(H, R, [[score[0] - 48, score[1] - 28], [score[0] + 48, score[1] - 28], [score[0] + 48, score[1] + 25], [score[0] - 48, score[1] + 25]], 'blue', .95);
  label(H, 'ROUND 08', score[0], score[1] - 17, 9, '#f3ebdd');
  label(H, 'BOLT   NUT', score[0], score[1] - 3, 7, '#ffd428');
  label(H, '12 : 09', score[0], score[1] + 12, 13, '#f3ebdd');
  for (const [j, text] of [[2.2, 'KEEP IT CLEAN'], [6, 'TRAIN / REPEAT'], [10.2, 'IRON LEAGUE']]) {
    const [x, y] = H.p(.03, j, 2.07);
    shape(H, R, [[x - 22, y - 27], [x + 22, y - 27], [x + 22, y + 19], [x - 22, y + 19]], 'paper', .95);
    label(H, text, x, y - 16, 5.5);
    glove(H, R, x - 7, y + 2, 'coral', .68);
    glove(H, R, x + 8, y - 1, 'teal', .68);
    H.line(R, [[x - 16, y + 13], [x + 16, y + 13]], 'blue', .7);
  }
  table(H, R, 8.8, 1.02, 2.6, 1, .79, 'teal');
  for (let k = 0; k < 3; k++) {
    box(H, R, 9 + k * .7, 1.4, .56, .47, .91, .18, k === 1 ? 'sun' : 'coral');
    for (let n = 0; n < 3; n++) H.dot(...H.p(9.1 + k * .7 + n * .12, 1.64, 1.13), 1.8, 'blue');
  }
  for (const i of [9.05, 9.65, 10.25, 10.85]) {
    const [x, y] = H.p(i, .1, 1.75);
    H.line(R, [[x - 4, y - 9], [x + 4, y + 9]], 'blue', 2.7);
    H.outline(R, ell(x - 4, y - 9, 4, 3), 'paper', 1.5);
    H.dot(x + 4, y + 9, 2, 'sun');
  }
  box(H, R, 10.65, 2.5, .72, .62, 0, .34, 'coral');
  box(H, R, 10.65, 2.5, .72, .1, .34, .36, 'coral');
  for (let k = 0; k < 4; k++) H.line(R, [H.p(10.74 + k * .14, 2.6, .4), H.p(10.8 + k * .14, 2.97, .4)], k % 2 ? 'paper' : 'sun', 2);
  shape(H, R, H.tile(.85, 2.2, 2.2, 2.4, .02), 'teal', .28);
  shape(H, R, H.tile(.8, 5.25, 2.5, 2.8, .02), 'teal', .28);
  const [sx, sy] = H.p(1.6, 2.7, 1.95);
  H.line(R, [H.p(.1, 2.7, 1.95), [sx, sy]], 'blue', 4);
  oval(H, R, sx, sy, 26, 11, 'paper');
  H.line(R, [H.p(.12, 2.7, 1.55), [sx, sy + 3]], 'blue', 2);
  table(H, R, .6, 8.9, 2.4, .64, .72, 'blue');
  for (let k = 0; k < 4; k++) dumbbell(H, R, .95 + k * .55, 9.15, .97, .47 + k * .055);
  for (const [i, j, r] of [[.8, 10.2, 10], [1.4, 10.7, 12], [2.2, 10.9, 8]]) {
    const [x, y] = H.p(i, j, .06);
    oval(H, R, x, y, r, r * .43, 'blue');
    H.outline(R, ell(x, y - 1, r * .6, r * .23), 'paper', 1);
    H.dot(x, y - 1, 1.6, 'sun');
  }
  dumbbell(H, R, 2.8, 10.15, .13, .76);
  box(H, R, 3.8, 3.5, 5.4, 5.5, 0, .5, 'teal', .62);
  shape(H, R, H.tile(4, 3.7, 5, 5.1, .51), 'teal', .35);
  const [cx, cy] = H.p(6.5, 6.25, .53);
  H.outline(R, ell(cx, cy, 42, 19), 'paper', 2.5);
  label(H, 'IRON / 08', cx, cy, 8, '#f3ebdd');
  for (const i of [3.85, 9.12]) for (const j of [3.55, 8.92]) {
    box(H, R, i, j, .17, .17, .5, 1.68, i === 3.85 ? 'coral' : 'sun');
    for (const z of [.9, 1.4, 1.9]) H.dot(...H.p(i + .08, j + .08, z), 2.3, 'paper');
  }
  for (const z of [.9, 1.4, 1.9]) {
    H.line(R, [H.p(3.93, 3.63, z), H.p(9.2, 3.63, z)], 'paper', 1.4);
    H.line(R, [H.p(3.93, 3.63, z), H.p(3.93, 9, z)], 'paper', 1.4);
  }
  for (let n = 0; n < 3; n++) box(H, R, 8.15, 9 + n * .3, .8, .3, 0, .45 - n * .14, 'coral');
  towel(H, R, 4.1, 8.97, 1.92);
  for (const [i, j] of [[4.2, 4], [8.7, 8.5]]) {
    box(H, R, i, j, .38, .38, .5, .44, 'coral');
    bottle(H, R, ...H.p(i + .2, j + .2, .95), 'teal', .31);
  }
  table(H, R, 10.08, 5.45, 1.27, 2.6, .77, 'coral');
  const [bx, by] = H.p(10.55, 5.85, .92);
  oval(H, R, bx, by, 10, 4, 'blue');
  oval(H, R, bx, by - 3, 8, 5, 'sun');
  H.dot(bx, by - 8, 2, 'blue');
  for (let k = 0; k < 4; k++) {
    shape(H, R, H.tile(10.2 + k % 2 * .48, 6.45 + Math.floor(k / 2) * .48, .38, .31, .91), 'paper', 1);
    H.line(R, [H.p(10.26 + k % 2 * .48, 6.55 + Math.floor(k / 2) * .48, .92), H.p(10.5 + k % 2 * .48, 6.55 + Math.floor(k / 2) * .48, .92)], 'blue', .7);
  }
  for (let k = 0; k < 7; k++) {
    const [x, y] = H.p(10.3 + k % 3 * .18, 7.45 + Math.floor(k / 3) * .15, .94);
    oval(H, R, x, y, 3, 1.6, k % 2 ? 'sun' : 'teal');
  }
  bottle(H, R, ...H.p(11.02, 7.8, .91), 'teal', .42);
  const [ticketX, ticketY] = H.p(11.34, 6.9, .42);
  label(H, 'BETS', ticketX, ticketY, 7);
  bench(H, R, 4.2, 10.35, 5.15, 'coral');
  for (const [i, j] of [[4.4, 11.23], [6.3, 11.24], [8.8, 11.16], [2.65, 8.4]]) bottle(H, R, ...H.p(i, j, .02), 'teal', .4);
  towel(H, R, 8.4, 10.51, .73);
  const [gx, gy] = H.p(3.37, 10.79);
  oval(H, R, gx, gy - 7, 17, 10, 'teal');
  H.outline(R, ell(gx, gy - 18, 8, 7), 'blue', 2);
  glove(H, R, gx + 8, gy - 4, 'coral', .8);
  glove(H, R, gx - 9, gy - 4, 'coral', .8);
  const [wx, wy] = H.p(9.7, 10.8);
  shape(H, R, [[wx - 12, wy - 20], [wx + 12, wy - 20], [wx + 9, wy], [wx - 9, wy]], 'paper', .9);
  oval(H, R, wx, wy - 20, 12, 5, 'blue', .5);
  for (let k = 0; k < 4; k++) stroke(H, R, [[wx - 8 + k * 5, wy - 20], [wx - 3 + k * 4, wy - 28], [wx + k * 4, wy - 20]], 'coral', 2);
}, (H, R, t) => {
  H.at(1.6, 3.25, 0, HH => {
    robot(HH, R, 1.8, 3.15, t, 'teal', 'bag');
    const [x, y] = HH.p(1.6, 2.7, 1.89), swing = Math.sin(t * 9) * 8;
    stroke(HH, R, [[x, y], [x + swing * .5, y + 7], [x + swing, y + 15]], 'blue', 1.4);
    oval(HH, R, x + swing, y + 22, 7, 11, 'coral');
    HH.line(R, [[x + swing, y + 14], [x + swing, y + 29]], 'paper', 1);
  });
  H.at(2, 6.65, 0, HH => robot(HH, R, 2, 6.65, t, 'sun'));
  H.at(9.25, 2.5, 0, HH => {
    const [x, y] = HH.p(9.35, 2.58);
    creature(HH, R, x, y, 'robot', 0, .79, 'coral');
    shape(HH, R, [[x - 9, y - 30], [x + 9, y - 30], [x + 8, y - 13], [x - 8, y - 13]], 'blue', .95);
    for (const k of [-1, 0, 1]) stroke(HH, R, [[x - 5, y - 25 + k * 4], [x + 3, y - 20 + k * 4], [x + 11, y - 25 + k * 3]], k % 2 ? 'sun' : 'paper', 1);
    const [mx, my] = HH.p(10.15, 3.11);
    actor(HH, R, 10.15, 3.11, t, 'kneel', { shirt: ['teal', .85], hairStyle: 'cap', face: 'sw' }, 0, .9);
    stroke(HH, R, [[mx - 10, my - 20], [x + 15, y - 23], [x + 7, y - 22]], 'paper', 2.5);
    HH.outline(R, ell(x + 7, y - 22, 3, 3), 'sun', 1.7);
    if (Math.sin(t * 5) > .82) for (let n = 0; n < 4; n++) {
      const a = n / 4 * TAU + t;
      HH.line(R, [[x + 9 + Math.cos(a) * 5, y - 23 + Math.sin(a) * 5], [x + 9 + Math.cos(a) * 10, y - 23 + Math.sin(a) * 10]], 'sun', 1);
    }
  });
  H.at(5.35, 5.9, .55, HH => creature(HH, R, ...HH.p(5.35 + Math.sin(t * 2.5) * .14, 5.9, .55), 'robot', t, 1.02, 'teal'));
  H.at(7.45, 6.3, .55, HH => creature(HH, R, ...HH.p(7.45 - Math.sin(t * 2.5) * .14, 6.3, .55), 'robot', t + .8, 1.06, 'sun'));
  H.at(10.25, 4.65, 0, HH => actor(HH, R, 10.25, 4.65, t, 'write', { shirt: ['paper', 1], face: 'sw' }, .4, 1));
  H.at(11.14, 8.66, 0, HH => {
    actor(HH, R, 11.14, 8.66, t, 'talk', { shirt: ['sun', .9], face: 'sw' }, 0, .96);
    const [x, y] = HH.p(11.14, 8.66);
    shape(HH, R, [[x - 18, y - 29], [x - 5, y - 32], [x - 4, y - 24], [x - 17, y - 21]], 'paper', 1);
    label(HH, '08', x - 11, y - 26, 5);
  });
  H.at(9.24, 9.04, 0, HH => {
    for (const z of [.9, 1.4, 1.9]) {
      HH.line(R, [HH.p(9.2, 3.63, z), HH.p(9.2, 9, z)], 'paper', 1.4);
      HH.line(R, [HH.p(3.93, 9, z), HH.p(9.2, 9, z)], 'paper', 1.4);
    }
  });
  for (const [i, clip, ink] of [[4.8, 'cheer', 'sun'], [6.45, 'sit', 'teal'], [7.65, 'point', 'paper']]) H.at(i, 10.93, 0, HH => actor(HH, R, i, 10.93, t + i, clip, { shirt: [ink, .9], face: 'nw' }, clip === 'sit' ? .12 : 0, .93));
  H.at(10.3, 10.57, 0, HH => actor(HH, R, 10.3, 10.57, t, 'cheer', { shirt: ['coral', .9], face: 'nw' }, 0, .93));
});

export default function enrich(room) {
  return { ...room, under: gym.under, live: gym.live };
}
