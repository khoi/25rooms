import { world, shape, oval, stroke, box, table, bench, actor, creature, bottle, steam, loop, wallRect, starPts } from '../common.js';

const toothOutline = [[-15, -34], [-6, -39], [0, -34], [9, -39], [18, -32], [16, -19], [11, -2], [5, 0], [2, -17], [-3, -20], [-7, -2], [-13, 0], [-16, -19]];

function tooth(H, R, x, y, size = 1, ink = 'paper') {
  shape(H, R, loop(toothOutline.map(([a, b]) => [x + a * size, y + b * size]), 2), ink, 1);
  stroke(H, R, [[x - 9 * size, y - 29 * size], [x, y - 26 * size], [x + 11 * size, y - 30 * size]], 'teal', .8);
  stroke(H, R, [[x - 10 * size, y - 25 * size], [x - 9 * size, y - 13 * size]], 'sun', 1.4);
}

function tray(H, R, i, j, w, d, z, count = 5) {
  box(H, R, i, j, w, d, z, .065, 'paper', 1);
  shape(H, R, H.tile(i + .07, j + .07, w - .14, d - .14, z + .08), 'teal', .16);
  for (let k = 0; k < count; k++) {
    const [x, y] = H.p(i + .18 + k * (w - .35) / count, j + d * .6, z + .09);
    stroke(H, R, [[x - 3, y + 2], [x + 6, y - 9], [x + 6, y - 13], [x + 2, y - 15]], 'blue', .85);
    if (k % 2) oval(H, R, x + 3, y - 13, 2.5, 2.5, 'paper', 1);
    else H.line(R, [[x, y - 3], [x + 2, y - 1]], 'sun', 2);
  }
}

function cup(H, R, x, y, ink = 'paper', size = 1) {
  shape(H, R, [[x - 6 * size, y - 13 * size], [x + 6 * size, y - 13 * size], [x + 4 * size, y], [x - 4 * size, y]], ink, .8);
  oval(H, R, x, y - 13 * size, 6 * size, 2.2 * size, 'paper', 1);
  H.line(R, [[x - 3 * size, y - 8 * size], [x + 3 * size, y - 8 * size]], 'coral', .75);
}

function magazine(H, R, x, y, text, ink = 'coral', tilt = 0) {
  shape(H, R, [[x - 13, y - 8 + tilt], [x, y - 5], [x + 13, y - 10 - tilt], [x + 13, y + 8 - tilt], [x, y + 12], [x - 13, y + 8 + tilt]], 'paper', 1);
  shape(H, R, [[x - 11, y - 5 + tilt], [x - 2, y - 3], [x - 2, y + 7], [x - 11, y + 5 + tilt]], ink, .65);
  H.line(R, [[x, y - 4], [x, y + 10]], 'blue', .8);

  for (let k = 0; k < 3; k++) H.line(R, [[x + 3, y + k * 3], [x + 10, y - 2 + k * 3]], 'blue', .55);
}

function stool(H, R, i, j, ink = 'teal') {
  const [x, y] = H.p(i, j, .62);
  for (const [a, b] of [[-.32, -.2], [.32, -.2], [0, .32]]) H.line(R, [H.p(i + a, j + b, 0), [x, y]], 'blue', 1.7);
  oval(H, R, x, y, 14, 7, ink, .7);
}

function xray(H, R, j, z, w, h, number, twin = false) {
  shape(H, R, wallRect(H, 'nw', j, j + w, z, z + h), 'teal', .35);
  shape(H, R, wallRect(H, 'nw', j + .1, j + w - .1, z + .1, z + h - .1), 'blue', .9);
  const project = (a, b, center) => H.p(.025, j + center + a * .025, z + .25 - b * .042);
  for (const center of twin ? [w * .31, w * .73] : [w * .52]) {
    shape(H, R, loop(toothOutline.map(([a, b]) => project(a, b, center)), 2), 'paper', 1);
    stroke(H, R, [[0, -28], [-5, -24], [-4, -12], [-9, -4]].map(([a, b]) => project(a, b, center)), 'teal', 1);
    stroke(H, R, [[0, -28], [6, -22], [8, -6]].map(([a, b]) => project(a, b, center)), 'teal', 1);
    const [cx, cy] = project(8, -29, center);
    H.dot(cx, cy, 3, 'coral', .8);
    H.outline(R, [[cx - 5, cy - 4], [cx + 5, cy - 4], [cx + 5, cy + 4], [cx - 5, cy + 4]], 'sun', .7);
  }
  const [x, y] = H.p(.05, j + w * .5, z + h - .15);
}

function clinicUnder(H, R) {
  for (const z of [.14, 3.25]) {
    box(H, R, .03, .03, 11.85, .13, z, .12, 'teal', .6);
    box(H, R, .03, .03, .13, 11.85, z, .12, 'teal', .6);
  }
  for (const i of [7, 8.35, 9.7]) {
    box(H, R, i, .06, 1.25, .52, 2.05, 1.08, 'teal', .65);
    shape(H, R, H.faceI(i + .09, .59, 1.07, 2.15, 3.02), 'paper', .9);
    H.line(R, [H.p(i + .12, .61, 2.55), H.p(i + 1.12, .61, 2.55)], 'blue', 1.4);
    for (let k = 0; k < 3; k++) {
      const [x, y] = H.p(i + .26 + k * .34, .63, 2.25);
      tooth(H, R, x, y, .19 + k * .04);
    }
    H.line(R, [H.p(i + .15, .63, 2.76), H.p(i + .94, .63, 2.76)], 'coral', 3);
    H.dot(...H.p(i + 1.02, .65, 2.85), 2, 'sun');
  }
  box(H, R, .15, 7.1, .55, 1.8, .9, .12, 'sun', .65);
  for (const j of [7.2, 8.7]) H.line(R, [H.p(.05, j, 1), H.p(.62, j, .94), H.p(.05, j, .55)], 'blue', 1.3);
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(.42, 7.4 + k * .55, 1.04);
    cup(H, R, x, y, k === 1 ? 'sun' : 'paper', .8);
    H.line(R, [[x, y - 8], [x + 4, y - 29]], 'teal', 2);
    H.line(R, [[x + 2, y - 29], [x + 9, y - 29]], 'paper', 3);
  }

  xray(H, R, 1, 1.25, 2.4, 2.12, '01');
  xray(H, R, 3.65, 1.25, 2.7, 2.12, '02', true);

  const [clockX, clockY] = H.p(.05, 10.75, 2.7);
  oval(H, R, clockX, clockY, 16, 16, 'paper', 1);
  for (let n = 0; n < 12; n++) H.dot(clockX + Math.sin(n * Math.PI / 6) * 12, clockY + Math.cos(n * Math.PI / 6) * 12, 1, 'teal');
  H.line(R, [[clockX - 7, clockY + 4], [clockX, clockY], [clockX, clockY - 9]], 'blue', 1);

  for (let k = 0; k < 6; k++) {
    const i = .65 + k * 1.7;
    box(H, R, i, .55, 1.55, 1.22, 0, 1.23, 'teal', .38);
    box(H, R, i - .04, .51, 1.63, 1.3, 1.23, .11, 'paper', 1);
    for (const z of [.28, .68, 1.05]) {
      H.line(R, [H.p(i + .1, 1.78, z), H.p(i + 1.45, 1.78, z)], 'blue', .6);
      H.line(R, [H.p(i + .56, 1.79, z - .12), H.p(i + .94, 1.79, z - .12)], 'sun', 2);
    }
  }
  const [sinkX, sinkY] = H.p(1.5, 1.15, 1.38);
  oval(H, R, sinkX, sinkY, 17, 8, 'blue', .65);
  oval(H, R, sinkX, sinkY, 12, 5, 'teal', .35);
  stroke(H, R, [[sinkX + 14, sinkY - 2], [sinkX + 14, sinkY - 21], [sinkX + 3, sinkY - 26], [sinkX - 1, sinkY - 15]], 'blue', 2);
  bottle(H, R, ...H.p(.86, .8, 1.35), 'coral', .36);
  box(H, R, 2.75, .65, 1.48, .96, 1.35, .91, 'paper', 1);
  const [sterX, sterY] = H.p(3.44, 1.63, 1.8);
  oval(H, R, sterX, sterY, 17, 13, 'blue', .65);
  oval(H, R, sterX, sterY, 13, 9, 'teal', .25);
  H.line(R, [[sterX - 7, sterY - 2], [sterX + 7, sterY - 2]], 'sun', 2);
  for (const dx of [-10, -3, 4, 11]) H.line(R, [[sterX + dx, sterY - 5], [sterX + dx, sterY + 6]], 'paper', 1);
  H.dot(sterX + 23, sterY - 7, 2, 'coral');
  H.dot(sterX + 23, sterY + 1, 2, 'sun');

  tray(H, R, 4.4, .72, 1.1, .76, 1.36, 5);
  for (let k = 0; k < 6; k++) {
    const [x, y] = H.p(6.1 + k * .38, .82 + k % 2 * .3, 1.35);
    bottle(H, R, x, y, ['coral', 'teal', 'sun'][k % 3], .35);
  }
  for (let k = 0; k < 3; k++) {
    box(H, R, 8.65 + k * .62, .77, .52, .65, 1.35, .1, 'sun', .6);
    tooth(H, R, ...H.p(8.91 + k * .62, 1.11, 1.49), .36 + k * .06);
  }
  box(H, R, 10.52, .6, .53, .68, 1.35, .4, 'coral', .7);
  const [brushX, brushY] = H.p(10.75, .91, 1.77);
  for (let k = 0; k < 5; k++) {
    const dx = (k - 2) * 3;
    H.line(R, [[brushX + dx, brushY + 5], [brushX + dx + k - 2, brushY - 20]], k % 2 ? 'sun' : 'teal', 1.4);
    H.line(R, [[brushX + dx + k - 2, brushY - 19], [brushX + dx + k + 1, brushY - 19]], 'paper', 3);
  }
  table(H, R, 1.05, 5.65, 2.1, 1.25, 1.1, 'sun');
  box(H, R, 1.05, 6.78, 2.1, .13, .15, 1.06, 'coral', .55);

  box(H, R, 1.27, 5.78, .67, .12, 1.25, .63, 'blue', .75);
  shape(H, R, H.faceI(1.33, 5.91, .54, 1.35, 1.79), 'teal', .35);
  for (let k = 0; k < 3; k++) H.line(R, [H.p(1.39, 5.93, 1.43 + k * .1), H.p(1.8, 5.93, 1.43 + k * .1)], 'paper', .8);
  for (let k = 0; k < 4; k++) box(H, R, 2.25 + k * .035, 5.97 + k * .015, .55, .49, 1.25 + k * .035, .025, k % 2 ? 'paper' : 'teal', .75);
  const [bellX, bellY] = H.p(2.86, 6.38, 1.28);
  oval(H, R, bellX, bellY, 6, 3, 'blue', .8);
  oval(H, R, bellX, bellY - 3, 4, 4, 'sun', .8);
  H.dot(bellX, bellY - 7, 1.4, 'coral');
  for (let k = 0; k < 4; k++) {
    box(H, R, .3, 4.2 + k * .25, .37, .18, .8, .66, ['coral', 'teal', 'sun', 'paper'][k], .6);
  }
  table(H, R, 6.9, 2.5, 2.25, 1.1, 1.15, 'paper');
  for (let k = 0; k < 5; k++) cup(H, R, ...H.p(7.1 + k * .4, 2.74, 1.3), ['teal', 'sun', 'coral'][k % 3], .44);
  const [mixX, mixY] = H.p(7.9, 3.08, 1.29);
  oval(H, R, mixX, mixY, 11, 5, 'coral', .6);
  oval(H, R, mixX, mixY - 3, 10, 4, 'paper', 1);
  oval(H, R, mixX, mixY - 3, 6, 2, 'sun', .8);
  tray(H, R, 8.38, 2.86, .6, .53, 1.29, 2);
  box(H, R, 4.68, 4.45, 2.8, 2.65, .72, .3, 'coral', .65);
  box(H, R, 4.68, 4.45, 2.8, .37, 1, 1.35, 'coral', .65);
  oval(H, R, ...H.p(6, 5.85, .11), 38, 18, 'blue', .65);
  oval(H, R, ...H.p(6, 5.85, .2), 29, 13, 'paper');
  box(H, R, 5.7, 5.5, .55, .55, .2, .53, 'teal', .6);
  for (const z of [.27, .4, .53, .66]) H.line(R, [H.p(5.7, 6.06, z), H.p(6.25, 6.06, z)], 'paper', 1.5);
  for (const i of [4.8, 7.15]) {
    H.line(R, [H.p(i, 4.83, 1.17), H.p(i, 4.83, 2.13)], 'sun', 2);
    H.line(R, [H.p(i, 4.95, .87), H.p(i, 6.9, .87)], 'paper', 1.2);
  }
  shape(H, R, H.tile(5.28, 7.02, 1.58, .48, .86), 'blue', .65);
  for (let k = 0; k < 6; k++) H.line(R, [H.p(5.38 + k * .25, 7.04, .87), H.p(5.38 + k * .25, 7.46, .87)], 'paper', .8);
  stroke(H, R, [H.p(6.3, 5.8, .35), H.p(7.4, 6.8, .08), H.p(8.45, 6.4, .08), H.p(8.5, 5.9, .5)], 'blue', 2);
  box(H, R, 7.8, 7.1, .55, .65, .04, .12, 'teal', .6);
  H.line(R, [H.p(7.85, 7.2, .19), H.p(8.24, 7.2, .19)], 'sun', 3);
  box(H, R, 5.15, 6.96, 1.85, .64, .66, .18, 'teal', .65);
  for (const i of [4.59, 7.42]) {
    box(H, R, i, 5.09, .18, .12, .98, .66, 'blue', .75);
    box(H, R, i - .04, 5.0, .26, 1.45, 1.58, .13, 'sun', .7);
  }
  for (const i of [3.3, 4.1]) H.line(R, [H.p(i, 6.9), H.p(i, 6.15, 1.65)], 'sun', 2.5);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(3.3, 6.9 - n * .15, n * .33), H.p(4.1, 6.9 - n * .15, n * .33)], 'blue', 1.5);
  box(H, R, 8.2, 5.05, 1.28, 1.07, .12, 1.17, 'teal', .55);
  box(H, R, 8.16, 5.01, 1.36, 1.15, 1.29, .11, 'paper', 1);
  for (const i of [8.3, 9.3]) for (const j of [5.17, 5.9]) oval(H, R, ...H.p(i, j, .12), 3, 4, 'blue', .8);
  const [unitX, unitY] = H.p(8.82, 6.14, .95);
  for (let n = 0; n < 3; n++) H.dot(unitX - 8 + n * 8, unitY, 2.2, n === 0 ? 'coral' : 'sun');
  const [gaugeX, gaugeY] = H.p(8.62, 6.14, .57);
  oval(H, R, gaugeX, gaugeY, 8, 8, 'paper', 1);
  H.line(R, [[gaugeX, gaugeY], [gaugeX + 4, gaugeY - 4]], 'blue', 1);
  for (let n = 0; n < 3; n++) {
    const [x, y] = H.p(8.45 + n * .31, 5.4, 1.42);
    stroke(H, R, [[x, y], [x + 8, y + 30 + n * 5], [x + 20, y + 34 + n * 5], [x + 22, y + 13], [x + 12, y - 8]], n === 1 ? 'coral' : 'blue', 2);
    H.line(R, [[x + 12, y - 8], [x + 10, y - 17]], 'teal', 3.3);
    H.line(R, [[x + 10, y - 17], [x + 6, y - 20]], 'blue', 1);
  }
  const [bowlX, bowlY] = H.p(7.89, 6.47, 1.25);
  H.line(R, [H.p(7.89, 6.47), [bowlX, bowlY]], 'blue', 3);
  oval(H, R, bowlX, bowlY, 15, 7, 'paper', 1);
  oval(H, R, bowlX, bowlY, 10, 4, 'teal', .25);
  cup(H, R, bowlX + 12, bowlY - 5, 'sun', .6);
  H.line(R, [H.p(8.4, 4.15), H.p(8.4, 4.15, 2.8), H.p(8.25, 3.95, 3.95), H.p(7.35, 4.2, 3.7)], 'blue', 3);
  for (const pos of [[8.4, 4.15, 2.8], [8.25, 3.95, 3.95]]) oval(H, R, ...H.p(...pos), 4, 4, 'coral', .8);
  const [lightX, lightY] = H.p(7.35, 4.2, 3.7);
  oval(H, R, lightX, lightY, 22, 10, 'teal', .6);
  oval(H, R, lightX, lightY + 3, 17, 7, 'sun', .85);
  H.line(R, [[lightX - 26, lightY + 1], [lightX - 28, lightY + 8], [lightX - 18, lightY + 9]], 'blue', 1.3);
  table(H, R, 9.42, 7.02, 1.84, 1.32, .93, 'sun');
  box(H, R, 9.92, 7.5, .64, .59, 1.06, .22, 'teal', .6);
  tooth(H, R, ...H.p(10.25, 7.8, 1.32), .76);
  tray(H, R, 9.48, 7.12, .63, .79, 1.08, 3);
  bottle(H, R, ...H.p(10.96, 7.38, 1.08), 'coral', .34);

  for (const i of [9.48, 11.08]) for (const j of [7.08, 8.15]) oval(H, R, ...H.p(i, j, .09), 3, 4, 'blue');
  box(H, R, 9.48, 7.07, 1.7, 1.14, .3, .08, 'teal', .6);
  for (let k = 0; k < 3; k++) box(H, R, 9.65, 7.25, .66, .7, .4 + k * .1, .08, 'paper');
  H.line(R, [H.p(10.95, 7, 1.03), H.p(11.38, 7, 1.4), H.p(11.38, 8.15, 1.4), H.p(10.95, 8.15, 1.03)], 'blue', 1.5);
  box(H, R, 10.45, 5.3, .71, .75, .05, .72, 'paper', 1);
  oval(H, R, ...H.p(10.82, 5.68, .8), 12, 6, 'coral', .7);

  bench(H, R, 1.32, 9.45, 3.75, 'teal');
  for (let k = 0; k < 3; k++) box(H, R, 1.43 + k * 1.22, 9.62, 1.05, .56, .7, .06, ['sun', 'paper', 'coral'][k], .55);
  table(H, R, 5.55, 9.36, 1.4, 1.35, .54, 'coral');
  for (let k = 0; k < 4; k++) {
    box(H, R, 5.79 + k * .045, 9.65 + k * .02, .75, .54, .68 + k * .028, .027, ['paper', 'teal', 'sun', 'paper'][k], .7);
  }

  cup(H, R, ...H.p(5.82, 10.44, .7), 'teal', .6);
  box(H, R, 1.1, 8.06, .67, .73, 0, 1.2, 'paper', 1);
  bottle(H, R, ...H.p(1.44, 8.42, 1.24), 'teal', .7);
  for (let k = 0; k < 4; k++) cup(H, R, ...H.p(1.84, 8.42, .8 + k * .055), 'paper', .45);
  stool(H, R, 8.3, 10.12, 'sun');
  box(H, R, 7.25, 10.75, 1.1, .67, 0, .35, 'teal', .5);
  for (let k = 0; k < 7; k++) {
    const [x, y] = H.p(7.4 + k % 4 * .23, 10.9 + Math.floor(k / 4) * .22, .45);
    shape(H, R, starPts(x, y, 4.6, 2.3, 5), ['coral', 'sun', 'paper'][k % 3], .8);
  }

  const [modelX, modelY] = H.p(3.1, 3.1, .36);
  box(H, R, 2.75, 2.74, .7, .7, 0, .36, 'sun', .6);
  tooth(H, R, modelX, modelY, 1.02);
}

function clinicLive(H, R, t) {
  const [sx, sy] = H.p(3.44, 1.38, 2.25);
  steam(H, R, sx, sy, t, 2, 'teal');
  actor(H, R, 4.52, 2.35, t, 'reach', { shirt: ['paper', 1], pants: ['teal', .8], face: 'nw' }, 0, 1.05);
  const [sterX, sterY] = H.p(4.22, 2.01, 1.55);
  tray(H, R, 4.16, 1.82, .63, .44, 1.43 + Math.sin(t * 1.5) * .04, 3);
  H.line(R, [[sterX + 13, sterY + 5], [sterX - 3, sterY - 5]], 'sun', 1.4);
  actor(H, R, 7.02, 2.46, t, 'reach', { shirt: ['paper', 1], pants: ['coral', .65] }, 0, 1.12);
  const [mx, my] = H.p(7.9, 3.08, 1.29);
  const stir = Math.sin(t * 4) * 5;
  H.line(R, [[mx + stir, my - 5], [mx - 9 + stir, my - 23]], 'blue', 1.5);
  oval(H, R, mx + stir, my - 5, 3, 1.8, 'sun', .85);
  creature(H, R, ...H.p(2.2, 5.25, .5), 'monster', t, .74, 'coral');
  const [rx, ry] = H.p(2.2, 5.25, .5);
  shape(H, R, [[rx - 12, ry - 17], [rx + 12, ry - 17], [rx + 12, ry - 3], [rx - 12, ry - 3]], 'paper', 1);
  H.line(R, [[rx - 8, ry - 10], [rx + 6, ry - 10]], 'teal', .8);
  stroke(H, R, [[rx + 18, ry - 24], [rx + 23, ry - 10], [rx + 14 + Math.sin(t * 4) * 3, ry + 3]], 'coral', 3);
  H.line(R, [[rx + 15 + Math.sin(t * 4) * 3, ry - 2], [rx + 11, ry + 9]], 'blue', 1);
  creature(H, R, ...H.p(6.07, 5.76, 1.07), 'monster', t, 1.58, 'teal');
  const [px, py] = H.p(6.07, 5.76, 1.07);
  shape(H, R, [[px - 23, py - 8], [px + 27, py - 8], [px + 21, py + 13], [px - 16, py + 13]], 'paper', 1);
  H.line(R, [[px - 14, py - 2], [px + 15, py - 2]], 'coral', 1);
  actor(H, R, 3.68, 6.45, t, 'reach', { shirt: ['paper', 1], pants: ['blue', .8] }, .92, 1.17);
  const [dx, dy] = H.p(3.68, 6.45, 1.65);
  const drill = Math.sin(t * 5) * 2;
  stroke(H, R, [[dx + 18, dy - 6], [px - 27 + drill, py - 18], [px - 13, py - 22]], 'sun', 3);
  H.line(R, [[px - 14, py - 22], [px - 6, py - 21]], 'blue', 1.1);
  stroke(H, R, [[px - 30 + drill, py - 18], [px - 37, py + 31], [px + 27, py + 61], H.p(8.39, 5.32, .4)], 'blue', 1.5);
  stroke(H, R, [H.p(8.86, 5.42, 1.4), [px + 68, py + 11], [px + 51, py - 21], [px + 21, py - 19]], 'teal', 2.4);
  actor(H, R, 10.87, 8.6, t, 'reach', { shirt: ['paper', 1], pants: ['teal', .7], face: 'nw' }, 0, 1.04);
  const [tx, ty] = H.p(10.25, 7.8, 1.32);
  const polish = Math.sin(t * 4.2) * 5;
  H.line(R, [[tx + 25, ty + 5], [tx + 9 + polish, ty - 16]], 'coral', 2.2);
  oval(H, R, tx + 9 + polish, ty - 16, 4, 3, 'paper', 1);
  for (let n = 0; n < 3; n++) {
    const a = t * 3 + n * 2.1;
    H.line(R, [[tx + 8 + Math.cos(a) * 9, ty - 19 + Math.sin(a) * 9], [tx + 8 + Math.cos(a) * 13, ty - 19 + Math.sin(a) * 13]], 'sun', .85);
  }
  creature(H, R, ...H.p(2.16, 9.83, .78), 'monster', t, .78, 'sun');
  const [wx, wy] = H.p(2.16, 9.83, .78);
  magazine(H, R, wx + 2, wy - 5, 'MOLAR', 'teal', Math.sin(t * .9));
  creature(H, R, ...H.p(4.24, 9.87, .77), 'monster', t, .82, 'coral');
  const [vx, vy] = H.p(4.24, 9.87, .77);
  magazine(H, R, vx, vy - 6, 'FANG', 'sun', -Math.sin(t * 1.1));
  stroke(H, R, [[vx + 18, vy - 22], [vx + 30, vy - 30], [vx + 31, vy - 36]], 'coral', 3);
  shape(H, R, [[vx + 24, vy - 39], [vx + 39, vy - 39], [vx + 37, vy - 29], [vx + 26, vy - 29]], 'paper', 1);

  creature(H, R, ...H.p(8.3, 10.12, .66), 'monster', t, .68, 'coral');
  const [cx, cy] = H.p(8.3, 10.12, .66);
  shape(H, R, starPts(cx + 2, cy - 7, 9, 4.2, 5), 'sun', .9);

  stroke(H, R, [[cx + 17, cy - 12], [cx + 29, cy - 20 + Math.sin(t * 2) * 2]], 'coral', 4);
  H.line(R, [[cx + 29, cy - 19 + Math.sin(t * 2) * 2], [cx + 31, cy - 29 + Math.sin(t * 2) * 2]], 'teal', 2);
  H.line(R, [[cx + 28, cy - 30 + Math.sin(t * 2) * 2], [cx + 34, cy - 30 + Math.sin(t * 2) * 2]], 'paper', 4);
}

export default function enrich(room) {
  const clinic = world(room.id, room.title, { floor: 'teal', tone: .2, wall: 'paper', wallTone: .8, wallStyle: 'tile', height: 3.5, pattern: 'tiles' }, clinicUnder, clinicLive);
  return { ...room, under: clinic.under, live: clinic.live };
}
