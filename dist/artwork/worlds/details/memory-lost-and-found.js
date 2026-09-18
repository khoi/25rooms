import { world, box, table, bench, shape, oval, stroke, actor, creature, bottle, ell, starPts, wallRect, wallPt, rug } from '../common.js';

const ink = ['teal', 'coral', 'sun', 'paper'];

function card(H, R, i, j, z, color = 'paper', number = '') {
  const p = H.tile(i, j, .48, .37, z);
  shape(H, R, p, color, color === 'paper' ? 1 : .48, .55);
  H.line(R, [H.p(i + .07, j + .1, z), H.p(i + .39, j + .1, z)], 'blue', .6, { tone: .7 });
  H.line(R, [H.p(i + .07, j + .19, z), H.p(i + .29, j + .19, z)], 'blue', .5, { tone: .6 });
  if (number) {}
}

function tag(H, R, x, y, text, color = 'paper', size = 1) {
  H.line(R, [[x, y - 8 * size], [x + 3 * size, y]], 'blue', .65, { amp: 0 });
  shape(H, R, [[x - 5 * size, y], [x + 5 * size, y], [x + 5 * size, y + 9 * size], [x - 3 * size, y + 9 * size], [x - 5 * size, y + 6 * size]], color, .85, .55);
  H.dot(x, y + 2 * size, .65, 'blue');
}

function folder(H, R, i, j, z, color = 'sun') {
  const p = [H.p(i, j, z), H.p(i + .58, j, z), H.p(i + .58, j, z + .47), H.p(i + .32, j, z + .47), H.p(i + .28, j, z + .56), H.p(i + .05, j, z + .56), H.p(i, j, z + .47)];
  shape(H, R, p, color, .7, .65);
  shape(H, R, H.faceI(i + .08, j + .005, .38, z + .18, z + .29), 'paper', 1, .35);
}

function spool(H, R, x, y, radius, a = 0) {
  oval(H, R, x, y, radius, radius, 'paper', 1);
  oval(H, R, x, y, radius * .78, radius * .78, 'teal', .4);
  H.dot(x, y, radius * .17, 'blue');
  for (let n = 0; n < 5; n++) {
    const angle = a + n * Math.PI * 2 / 5;
    H.dot(x + Math.cos(angle) * radius * .48, y + Math.sin(angle) * radius * .48, radius * .17, 'blue', .9);
  }
}

function deskLamp(H, R, i, j, z, direction = 1) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y, 8, 3, 'blue', .8);
  stroke(H, R, [[x, y], [x + 2, y - 22], [x + 17 * direction, y - 34]], 'blue', 1.8);
  for (const [a, b] of [[x + 2, y - 22], [x + 17 * direction, y - 34]]) H.dot(a, b, 2, 'sun');
  shape(H, R, [[x + 9 * direction, y - 30], [x + 13 * direction, y - 39], [x + 21 * direction, y - 39], [x + 27 * direction, y - 30]], 'teal', .8, .8);
  H.dot(x + 18 * direction, y - 29, 2.2, 'sun');
}

function birthday(H, R, x, y, t, scale = 1) {
  const p = (a, b) => [x + a * scale, y + b * scale];
  shape(H, R, [p(-17, 2), p(16, 2), p(16, -17), p(-17, -17)], 'coral', .58, .6);
  oval(H, R, ...p(0, -17), 17 * scale, 5 * scale, 'paper', 1);
  stroke(H, R, [p(-16, -8), p(-9, -5), p(-3, -8), p(4, -5), p(11, -8), p(16, -5)], 'paper', 1.7);
  for (const k of [-10, 0, 10]) {
    H.line(R, [p(k, -18), p(k, -28)], k === 0 ? 'teal' : 'sun', 2 * scale, { amp: 0 });
    H.dot(...p(k + Math.sin(t * 4 + k), -31), 2.1 * scale, 'sun');
  }
  for (const side of [-1, 1]) {
    const yy = -42 + Math.sin(t + side) * 2;
    oval(H, R, ...p(side * 29, yy), 6 * scale, 9 * scale, side < 0 ? 'teal' : 'coral', .7);
    stroke(H, R, [p(side * 29, yy + 9), p(side * 26, -20), p(side * 29, 0)], 'blue', .6);
  }
}

function archive(H, R) {
  box(H, R, 2.85, .12, 8.8, 1.08, .08, .42, 'coral', .65);
  box(H, R, 2.85, .12, 8.8, 1.08, 3.3, .18, 'sun', .7);
  for (const i of [2.85, 5.05, 7.25, 9.45, 11.5]) {
    box(H, R, i, .12, .13, 1.08, .5, 2.8, 'coral', .65);
    box(H, R, i - .04, .1, .23, 1.15, 3.14, .15, 'sun', .65);
  }
  for (let n = 0; n < 4; n++) {
    shape(H, R, H.faceI(3.08 + n * 2.15, 1.22, 1.84, .16, .4), 'teal', .7);
    H.line(R, [H.p(3.75 + n * 2.15, 1.24, .28), H.p(4.2 + n * 2.15, 1.24, .28)], 'sun', 2);
  }
  for (const j of [.3, 5.2]) box(H, R, .18, j, 1, .16, .1, 3.2, 'coral', .7);
  box(H, R, .18, .3, 1, 5.1, 3.18, .17, 'sun', .7);
  for (const j of [6, 10.85]) box(H, R, .03, j, .14, .13, .12, 3.65, 'coral', .6);
  box(H, R, .03, 5.9, .18, 5.1, 3.5, .13, 'sun', .6);

  for (let column = 0; column < 5; column++) {
    const j = .65 + column * .92;
    box(H, R, .25, j, .86, .88, .12, 2.65, column % 2 ? 'teal' : 'sun', .5);
    for (let row = 0; row < 5; row++) {
      const z = .22 + row * .49;
      const pulled = column === 3 && row === 2 ? .46 : 0;
      if (pulled) box(H, R, 1.09, j + .06, pulled, .74, z, .42, 'sun', .6);
      shape(H, R, H.faceJ(1.13 + pulled, j + .055, .76, z, z + .41), row % 3 === 1 ? 'teal' : 'sun', .5, .65);
      const p = H.p(1.15 + pulled, j + .43, z + .22);
      shape(H, R, [[p[0] - 7, p[1] - 3], [p[0] + 7, p[1] - 3], [p[0] + 7, p[1] + 3], [p[0] - 7, p[1] + 3]], 'paper', 1, .45);

      H.line(R, [[p[0] - 3, p[1] + 5], [p[0] + 3, p[1] + 5]], 'blue', 1, { amp: 0 });
      if (pulled) for (let k = 0; k < 4; k++) folder(H, R, 1.17, j + .18 + k * .13, z + .41, ink[k]);
    }
    const [x, y] = H.p(.67, j + .37, 2.95);
  }
  for (let row = 0; row < 3; row++) {
    const z = .57 + row * .89;
    box(H, R, 3.0, .28, 8.5, .76, z, .11, 'teal', .58);
    for (let k = 0; k < 12; k++) {
      const i = 3.28 + k * .68;
      bottle(H, R, ...H.p(i, .72, z + .14), ink[(k + row) % 3], .5);
      const [x, y] = H.p(i, .72, z + .14);
      tag(H, R, x + 5, y - 12, `${row + 1}${k + 1}`, 'paper', .66);
    }
  }

  const board = wallRect(H, 'nw', 6, 10.9, 1.03, 3.18, -.07);
  shape(H, R, board, 'sun', .48, 2);
  for (let n = 0; n < 12; n++) {
    const j = 6.15 + n % 4 * 1.16;
    const z = 1.2 + Math.floor(n / 4) * .58;
    const p = wallRect(H, 'nw', j, j + .95, z, z + .44, .11);
    shape(H, R, p, n % 4 === 0 ? 'coral' : 'paper', n % 4 === 0 ? .45 : 1, .5);
    const [x, y] = wallPt(H, 'nw', j + .46, z + .29, .12);
    H.dot(x, y - 3, 1.6, n % 2 ? 'coral' : 'teal');
    if (n % 3 === 0) {
      oval(H, R, x, y + 2, 4, 4, 'teal', .4);
      H.line(R, [[x - 5, y + 8], [x + 4, y + 3]], 'blue', .7);
    } else {
      for (let line = 0; line < 3; line++) H.line(R, [wallPt(H, 'nw', j + .13, z + .08 + line * .08, .13), wallPt(H, 'nw', j + .72, z + .08 + line * .08, .13)], 'blue', .5, { tone: .6, amp: 0 });
    }
  }
  stroke(H, R, [wallPt(H, 'nw', 6.6, 2.7, .15), wallPt(H, 'nw', 8.9, 1.5, .15), wallPt(H, 'nw', 9.8, 2.6, .15), wallPt(H, 'nw', 7.6, 2.1, .15)], 'coral', 1.1);
  const [bx, by] = wallPt(H, 'nw', 8.4, 3.4, .1);
}

function furniture(H, R) {
  rug(H, R, 2, 6.6, 4.3, 4.6, 'teal', .16, { border: 'teal' });
  rug(H, R, 8.1, 7.7, 3.25, 3.5, 'sun', .2, { border: 'coral' });
  box(H, R, 1.78, 7.08, 1, 1.24, .05, .93, 'coral', .62);
  box(H, R, 4.24, 7.08, .95, 1.24, .05, .93, 'teal', .65);
  table(H, R, 1.7, 7.0, 3.6, 1.45, 1.03, 'sun');
  for (const i of [1.85, 4.31]) for (let n = 0; n < 3; n++) {
    shape(H, R, H.faceI(i, 8.34, .78, .13 + n * .27, .34 + n * .27), 'sun', .45);
    H.line(R, [H.p(i + .28, 8.36, .25 + n * .27), H.p(i + .52, 8.36, .25 + n * .27)], 'blue', 1.5);
  }
  H.line(R, [H.p(2.9, 7.95, .14), H.p(4.12, 7.95, .14)], 'sun', 3);

  box(H, R, 1.77, 8.35, 3.45, .14, .25, .76, 'coral', .45);

  for (let k = 0; k < 6; k++) card(H, R, 1.91 + k % 3 * .63, 7.25 + Math.floor(k / 3) * .43, 1.16, 'paper', `${k + 41}`);
  box(H, R, 4.05, 7.13, .92, .55, 1.15, .13, 'teal', .6);
  for (let k = 0; k < 5; k++) folder(H, R, 4.2, 7.2 + k * .065, 1.3, ink[k % 4]);
  deskLamp(H, R, 1.91, 7.16, 1.18, 1);
  const [sx, sy] = H.p(3.78, 7.8, 1.18);
  oval(H, R, sx, sy, 6, 2, 'blue', .8);
  H.line(R, [[sx, sy], [sx, sy - 8]], 'coral', 3, { amp: 0 });
  oval(H, R, sx, sy - 9, 5, 3, 'sun', .8);
  const [bellx, belly] = H.p(4.95, 8.1, 1.18);
  oval(H, R, bellx, belly, 7, 3, 'blue', .8);
  shape(H, R, [[bellx - 6, belly], [bellx - 4, belly - 6], [bellx, belly - 9], [bellx + 4, belly - 6], [bellx + 6, belly]], 'sun', .85, .7);
  H.dot(bellx, belly - 10, 1.4, 'blue');
  bench(H, R, 1.25, 10.1, 2.5, 'teal');
  for (let k = 0; k < 4; k++) card(H, R, 1.46 + k * .51, 10.2, .69, ink[k]);
  box(H, R, 4.75, 10.35, .56, .52, 0, .57, 'coral', .5);
  const [ux, uy] = H.p(5.2, 10.7, .63);
  tag(H, R, ux, uy, '41');
  table(H, R, 6.05, 4.4, 3.2, 1.45, 1.06, 'teal');
  box(H, R, 6.15, 4.48, 2.96, 1.22, .22, .09, 'coral', .7);
  for (let n = 0; n < 4; n++) {
    box(H, R, 6.3 + n * .7, 5, .54, .58, .32, .36, ink[n], .6);
    spool(H, R, ...H.p(6.57 + n * .7, 5.62, .55), 5);
  }
  for (const i of [6.18, 9.05]) H.line(R, [H.p(i, 4.53, .1), H.p(i, 5.63, .97)], 'sun', 1.5);


  for (let k = 0; k < 5; k++) card(H, R, 6.25 + k * .49, 5.12, 1.2, k === 2 ? 'coral' : 'paper');
  deskLamp(H, R, 6.26, 4.64, 1.21, 1);
  for (let k = 0; k < 3; k++) bottle(H, R, ...H.p(8.51 + k * .22, 4.69, 1.2), ink[k], .23);
  const [mx, my] = H.p(7.5, 4.9, 1.21);
  spool(H, R, mx - 10, my - 7, 8);
  spool(H, R, mx + 12, my + 4, 6);
  stroke(H, R, [[mx - 16, my], [mx - 8, my + 10], [mx + 10, my + 10], [mx + 14, my + 6]], 'blue', 1.2);
  H.line(R, [[mx + 33, my], [mx + 45, my - 4]], 'blue', .9);
  H.line(R, [[mx + 33, my + 2], [mx + 45, my - 4]], 'blue', .9);
  const [gx, gy] = H.p(8.8, 5.45, 1.2);
  oval(H, R, gx, gy, 7, 5, 'paper', .65);
  H.line(R, [[gx + 5, gy + 4], [gx + 14, gy + 10]], 'blue', 2);
  for (let k = 0; k < 4; k++) box(H, R, 6.24 + k * .65, 4.63, .48, .37, .08, .35 + k % 2 * .14, ink[k], .5);
  table(H, R, 9.8, 6.7, 1.15, 1.02, .81, 'sun');
  box(H, R, 9.98, 6.9, .73, .52, .94, .48, 'teal', .7);
  box(H, R, 9.87, 6.8, .96, .74, .89, .08, 'coral', .8);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(10.02 + n * .11, 7.43, 1.04), H.p(10.02 + n * .11, 7.43, 1.22)], 'blue', .7);
  stroke(H, R, [H.p(10.15, 6.93, 1), H.p(9.75, 7.2, .05), H.p(9.35, 6.5, .05)], 'blue', 1.2);
  const lens = H.p(10.73, 7.19, 1.2);
  oval(H, R, lens[0] + 15, lens[1], 7, 9, 'coral', .75);
  oval(H, R, lens[0] + 15, lens[1], 4, 6, 'sun', .8);

  const [px, py] = H.p(10.33, 7.18, 1.2);
  shape(H, R, [[px + 8, py - 2], [px + 19, py - 5], [px + 19, py + 5], [px + 8, py + 4]], 'blue', .8, .8);
  H.dot(px + 20, py, 4, 'sun', .9);
  for (const dj of [.2, 2.9]) {
    const a = H.p(11.35, 1.8 + dj, 0), b = H.p(11.35, 1.8 + dj, 3.18);
    H.line(R, [a, b], 'blue', 2, { amp: 0 });
    H.line(R, [[a[0] - 8, a[1] + 4], a, [a[0] + 8, a[1] + 4]], 'blue', 1.5);
  }
  shape(H, R, H.faceJ(11.35, 2, 2.7, 1.09, 3.13), 'paper', 1, 2.2);
  shape(H, R, H.faceJ(11.37, 2.15, 2.4, 1.21, 2.98), 'sun', .16, .6);
  const [vx, vy] = H.p(11.39, 3.4, 1.65);
  birthday(H, R, vx, vy, 0, .79);

  bench(H, R, 8.55, 8.4, 1.6, 'teal');
  box(H, R, 8.0, 10.24, 1.42, .92, .04, .35, 'coral', .65);
  shape(H, R, H.faceI(8, 10.24, 1.42, .4, 1.13), 'sun', .58, 1.1);
  shape(H, R, H.faceI(8.12, 10.23, 1.18, .49, 1.03), 'teal', .32, .7);
  const [cx, cy] = H.p(8.69, 10.22, .8);

  shape(H, R, H.tile(8.1, 10.3, 1.22, .72, .41), 'teal', .5, .8);
  for (let k = 0; k < 3; k++) tag(H, R, ...H.p(8.23 + k * .39, 11.18, .29), ['Z', 'Z', '?'][k], 'paper', .8);
  box(H, R, 10.22, 10.32, .72, .63, 0, .38, 'sun', .7);
  const [tx, ty] = H.p(10.54, 10.59, .42);
  birthday(H, R, tx, ty, 0, .27);
  tag(H, R, tx + 8, ty, '7');
  const [clockx, clocky] = H.p(2.25, .08, 3.01);
  oval(H, R, clockx, clocky, 14, 14, 'paper', 1);
  for (let k = 0; k < 12; k++) H.dot(clockx + Math.sin(k * Math.PI / 6) * 11, clocky + Math.cos(k * Math.PI / 6) * 11, .7, 'blue');
  H.line(R, [[clockx - 5, clocky - 5], [clockx, clocky], [clockx + 7, clocky - 1]], 'coral', 1.2);
  tag(H, R, clockx + 15, clocky + 11, 'LATE');
}

function visitor(H, R, i, j, t, clip, color, who = 'adult', scale = 1.15, z = 0) {
  H.at(i, j, z, HH => actor(HH, R, i, j, t, clip, { shirt: [color, .75], pants: ['blue', .75], face: 'se' }, z, scale, who));
}

function live(H, R, t) {
  visitor(H, R, 2.72, 6.62, t, 'write', 'teal', 'adult', 1.15, .65);
  visitor(H, R, 3.9, 9.12, t, 'hold', 'coral', 'elder', 1.16);
  visitor(H, R, 7.7, 3.97, t, 'write', 'paper', 'adult', 1.12, .65);
  visitor(H, R, 8.7, 8.95, t, 'sit', 'sun', 'elder', 1.12, .27);
  visitor(H, R, 10.32, 9.35, t, 'point', 'coral', 'child', 1.2);
  visitor(H, R, 1.93, 2.7, t, 'reach', 'coral', 'adult', 1.12);
  const shift = Math.sin(t * .31) * .6;
  H.at(4.1 + shift, 3.05, 0, HH => {
    const i = 3.78 + shift, j = 3.04;
    actor(HH, R, i - .57, j -.06, t, 'carry', { shirt: ['paper', 1], face: 'se' }, 0, 1.08);
    for (const a of [i + .08, i + 1.04]) for (const b of [j + .1, j + .67]) oval(HH, R, ...HH.p(a, b, .12), 3.5, 4, 'blue', .9);
    box(HH, R, i, j, 1.15, .81, .27, .11, 'teal', .7);
    box(HH, R, i, j, 1.15, .81, .88, .1, 'teal', .7);
    for (const b of [j + .04, j + .76]) HH.line(R, [HH.p(i, b, .3), HH.p(i, b, 1.33)], 'blue', 1.6, { amp: 0 });
    HH.line(R, [HH.p(i, j, 1.33), HH.p(i, j + .8, 1.33)], 'blue', 1.6, { amp: 0 });
    for (let k = 0; k < 5; k++) folder(HH, R, i + .16, j + .14 + k * .12, .99, ink[k % 4]);
    for (let k = 0; k < 3; k++) box(HH, R, i + .13 + k * .3, j + .16, .25, .52, .4, .31, ink[k], .5);
    tag(HH, R, ...HH.p(i + 1.12, j + .65, .88), 'TO FILE');
  });
  H.at(3.9, 9.2, 1.3, HH => {
    const p = .5 + Math.sin(t * .65) * .5;
    const [x, y] = HH.p(3.55 + p * .5, 8.81, 1.47 + Math.sin(t * 1.1) * .07);
    HH.glow(x, y, 23, 18, 'sun', .2);
    oval(HH, R, x, y, 13, 14, 'paper', .87);
    shape(HH, R, [[x - 8, y], [x, y - 7], [x + 8, y], [x + 6, y], [x + 6, y + 8], [x - 6, y + 8], [x - 6, y]], 'coral', .65, .7);
    HH.line(R, [[x, y + 2], [x, y + 8]], 'paper', 2);
    tag(HH, R, x + 14, y + 6, '41', 'sun', .8);
  });
  H.at(10.4, 7.22, 1.5, HH => {
    const [x, y] = HH.p(10.33, 7.1, 1.49);
    spool(HH, R, x - 8, y - 9, 8, t * .8);
    spool(HH, R, x + 12, y - 11, 7, -t * .7);
    stroke(HH, R, [[x - 14, y - 3], [x - 12, y + 7], [x + 8, y + 5], [x + 16, y - 5]], 'blue', 1);
  });
  H.at(8.65, 10.67, .7, HH => {
    const [x, y] = HH.p(8.67, 10.67, .72 + Math.sin(t * 1.3) * .13);
    creature(HH, R, x, y, 'ghost', t, .54, 'paper');
    tag(HH, R, x + 9, y - 16, 'Z', 'sun', .7);
  });
  H.at(6.58, 10.84, 0, HH => {
    const [x, y] = HH.p(6.58, 10.84, .03);
    creature(HH, R, x, y, 'dragon', t, .52, 'teal');
    const [a, b] = HH.p(6.92, 10.47, .4);
    shape(HH, R, starPts(a, b + Math.sin(t * 2) * 2, 5, 2.5, 5), 'sun', .85, .7);
    tag(HH, R, x - 14, y - 4, 'DREAM', 'paper', .85);
  });
  H.at(6.75, 5.2, 1.2, HH => {
    const [x, y] = HH.p(7.83, 5.1, 1.23);
    const a = Math.sin(t * 2) * 2;
    HH.line(R, [[x - 8, y - 4], [x + 2 + a, y - 6]], 'blue', .8);
    HH.line(R, [[x - 8, y - 2], [x + 2 + a, y - 6]], 'blue', .8);
    HH.dot(x + 4 + a, y - 6, 2.3, 'coral');
  });
}

export default function enrich(room) {
  const enriched = world(room.id, room.title, { floor: 'coral', tone: .23, wall: 'blue', wallTone: .76, pattern: 'boards', height: 3.8 }, (H, R) => {
    archive(H, R);
    furniture(H, R);
  }, live);
  return { ...room, under: enriched.under, live: enriched.live };
}
