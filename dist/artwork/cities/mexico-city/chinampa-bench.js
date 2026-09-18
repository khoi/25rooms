import { world, shape, oval, stroke, box, ell, loop, TAU } from '../../worlds/common.js';
import { timber, metal, vessel, bentTube, benchFrame, drape, branchSpray } from '../materials.js';
import { boardFloor, cabinetFrame, basin } from '../structure.js';

const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };

function sprout(H, R, i, j, z, size = 1, lean = 0) {
  const [x, y] = H.p(i, j, z);
  stroke(H, R, [[x, y], [x + lean, y - 9 * size], [x + lean * 1.3, y - 20 * size]], 'teal', 1.15);
  for (const [dx, dy, k] of [[-8, -8, 1], [9, -12, -1], [-5, -18, 1]]) {
    shape(H, R, loop([[x + lean, y + dy + 3], [x + dx * size, y + dy - 5 * size], [x + dx * size + k * 7, y + dy - 7 * size], [x + lean, y + dy]], 1), 'teal', .67, .55);
    H.line(R, [[x + lean, y + dy + 2], [x + dx * size + k * 2, y + dy - 4]], 'sun', .55);
  }
}

function grower(H, R, i, j, hands, look = 0) {
  const [x, y] = H.p(i, j, .18), skin = 'coral';
  oval(H, R, x + 3, y + 2, 15, 4, 'blue', .18);
  for (const side of [-1, 1]) {
    stroke(H, R, [[x + side * 5, y - 34.56], [x + side * 7, y - 15.36], [x + side * 10, y]], 'blue', 7);
    oval(H, R, x + side * 10 + 2, y, 6, 3, 'blue', .88);
  }
  shape(H, R, loop([[x - 9, y - 67.84], [x + 9, y - 65.28], [x + 11, y - 32.0], [x - 9, y - 32.0]], 1), 'teal', .7);
  shape(H, R, [[x - 5, y - 60.160000000000004], [x + 6, y - 58.88], [x + 9, y - 32.0], [x - 6, y - 32.0]], 'sun', .53, .6);
  oval(H, R, x + look * 2, y - 79.36 + look, 8, 8, skin, .34);
  shape(H, R, [[x - 9, y - 83.2], [x - 4, y - 92.16], [x + 7, y - 89.60000000000001], [x + 10, y - 81.92], [x + 3, y - 83.2], [x - 3, y - 79.36]], 'blue', .85, .55);
  H.dot(x + 4 + look * 2, y - 79.36 + look, .85, 'blue');
  H.line(R, [[x + 3, y - 72.96000000000001 + look], [x + 6, y - 72.96000000000001 + look]], 'blue', .55);
  hands.forEach((p, n) => {
    const side = n ? 1 : -1, shoulder = [x + side * 7, y - 62.72], elbow = [(shoulder[0] + p[0]) / 2 + side * 6, (shoulder[1] + p[1]) / 2 + 9];
    stroke(H, R, [shoulder, elbow, p], 'blue', 6.3);
    stroke(H, R, [shoulder, elbow, p], 'teal', 4.6);
    oval(H, R, ...p, 2.7, 2.2, skin, .42);
  });
}

function tray(H, R, j, z) {
  const i = 3.2, w = 3.25, d = 1.35;
  for (let n = 0; n < 7; n++) {
    const x = i + .19 + n * .44;
    stroke(H, R, [H.p(x, j + d - .15, z), H.p(x + .08, j + d - .12, z - .29), H.p(x - .03, j + d - .05, z - .57)], 'paper', 1.35);
    H.line(R, [H.p(x + .07, j + d - .12, z - .28), H.p(x + .23, j + d - .06, z - .45)], 'sun', .7);
  }
  metal(H, R, i, j, w, d, z, .12, 'teal');
  shape(H, R, H.tile(i + .12, j + .12, w - .24, d - .24, z + .13), 'blue', .6, .6);
  for (let n = 0; n < 6; n++) for (let m = 0; m < 2; m++) {
    const x = i + .18 + n * .48, y = j + .17 + m * .52;
    box(H, R, x, y, .4, .4, z + .14, .16, 'coral', .28);
    sprout(H, R, x + .19, y + .19, z + .3, .65 + (n % 3) * .12, n === 5 ? 4 : 0);
  }
  for (const y of [j, j + d]) metal(H, R, i, y - .035, w, .08, z + .1, .13, 'teal');
  for (const x of [i, i + w]) bentTube(H, R, [[x, j + .4, z + .15], [x, j + .4, z + .36], [x, j + .85, z + .36], [x, j + .85, z + .15]], 1.7, 'teal');
  for (let n = 0; n < 4; n++) H.line(R, [H.p(i + w - .3 + n * .07, j + d + .02, z + .05), H.p(i + w - .27 + n * .07, j + d + .02, z + .27)], 'paper', 1.05);
  for (const x of [i + 1.28, i + 2.06]) bentTube(H, R, [[x, j + d, z + .12], [x, j + d + .12, z + .29], [x + .24, j + d + .12, z + .29], [x + .24, j + d, z + .12]], 1.5, 'teal');
  return [H.p(i + 1.4, j + d + .12, z + .29), H.p(i + 2.18, j + d + .12, z + .29)];
}

const room = world('mexico-city-chinampa-bench', 'Roots above the water', { wall: false, floor: 'teal', tone: .2, head: 60 }, (H, R) => {
  shape(H, R, H.tile(0, 0, 2.05, 12, .025), 'teal', .61, .8);
  for (let n = 0; n < 22; n++) H.line(R, [H.p(.15 + (n % 3) * .12, .3 + n * .51, .04), H.p(1.7, .5 + n * .51, .04)], n % 3 ? 'paper' : 'sun', .7, { tone: .55 });
  boardFloor(H, R, 2.1, 0, 9.9, 12, .18, 'sun', .54);
  timber(H, R, 1.9, .03, .22, 11.9, .05, .32, 'teal');
  for (const j of [.2, 4.1, 8.1, 11.55]) {
    timber(H, R, 1.88, j, .19, .19, .03, 1.13, 'sun');
    H.line(R, [H.p(1.86, j, .16), H.p(2.1, j, .16)], 'blue', 2.8);
  }
  stroke(H, R, [H.p(1.98, .3, 1.12), H.p(1.98, 5.9, .9), H.p(1.98, 11.6, 1.12)], 'sun', 4);
  shape(H, R, H.faceI(2.1, .16, 9.8, .2, 3.75), 'teal', .23, .8);
  for (let x = 2.3; x < 12; x += .47) H.line(R, [H.p(x, .2, .32), H.p(x, .2, 3.68)], 'sun', 1.4, { tone: .75 });
  for (const x of [2.28, 8, 11.65]) timber(H, R, x, .3, .18, .18, .18, 4.6, 'sun');
  timber(H, R, 2.1, .18, 9.75, .3, 4.65, .22, 'sun');
  timber(H, R, 2.1, 2.3, 6.3, .16, 4.25, .2, 'sun');
  for (const x of [2.4, 5.1, 7.95]) bentTube(H, R, [[x, .3, 3.8], [x, 2.42, 4.34]], 2.1, 'sun');
  for (let x = 2.25; x < 8.25; x += .2) if (Math.abs(x - 6.65) > .15) {
    const points = [H.p(x, .23, 4.82), H.p(x + .08, 2.6, 4.4)];
    H.line(R, points, 'sun', 2.6); H.line(R, points, 'blue', .4, { tone: .4 });
  }
  timber(H, R, 3.05, .46, 4.6, .65, 2.52, .11, 'sun');
  for (const x of [3.3, 7.4]) bentTube(H, R, [[x, .45, 2.05], [x, .96, 2.54]], 2, 'teal');
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(3.55 + k * 1.3, .86, 2.67);
    oval(H, R, x, y, 9, 5, 'sun', .48);
    for (let n = 0; n < 4; n++) H.outline(R, ell(x, y, 8 - n * 1.5, 4 - n * .65), 'coral', .65);
    stroke(H, R, [[x + 7, y], [x + 14, y + 9], [x + 8, y + 17]], 'coral', .7);
  }
  for (const x of [4.1, 5.35, 6.65]) {
    const [px, py] = H.p(x, .38, 3.55);
    H.line(R, [[px, py - 15], [px, py + 5]], 'blue', .8);
    for (let k = 0; k < 4; k++) oval(H, R, px - 5 + k * 3, py + 5 + (k % 2) * 3, 2.4, 8, 'sun', .65);
  }
  cabinetFrame(H, R, 8.8, .6, 2.65, 1.6, .42, 3.3, 2, 'teal', (x, j, w, d, z, h, n) => {
    for (const dz of [.7, 1.6, 2.4]) timber(H, R, x, j, w, d, z + dz, .08, 'sun');
    for (let k = 0; k < 4; k++) metal(H, R, x + .08, j + .15, w - .16, d - .3, z + .13 + k * .13, .075, k === 2 ? 'coral' : 'teal');
    if (!n) {
      vessel(H, R, x + w / 2, j + .6, z + .86, 10, 17, 'paper', false);
      for (let k = 0; k < 3; k++) vessel(H, R, x + .17 + k * .29, j + .5, z + 1.74, 4, 7, 'coral');
    } else {
      drape(H, R, x + .1, j + .12, w - .18, d - .18, z + 1.72, .3, 'paper');
      for (let k = 0; k < 3; k++) box(H, R, x + .12 + k * .22, j + .25, .18, .6, z + 2.51, .23, 'sun', .5);
    }
  });
  const mesh = H.faceI(8.95, 2.24, 1.12, .59, 3.46);
  H.tint(mesh, 'teal', .12);
  H.clip(mesh, () => { for (let k = -10; k < 25; k++) { H.line(R, [H.p(8.95 + k * .14, 2.25, .59), H.p(10.1 + k * .14, 2.25, 3.5)], 'paper', .45); H.line(R, [H.p(8.95 + k * .14, 2.25, 3.5), H.p(10.1 + k * .14, 2.25, .59)], 'blue', .35, { tone: .5 }); } });
  H.outline(R, mesh, 'teal', 2);
  H.dot(...H.p(9.95, 2.27, 1.96), 2, 'sun');
  for (let k = 0; k < 5; k++) bentTube(H, R, [[8.2 + k * .1, 1.65, .27], [8.05 + k * .12, 1.5, 3.7]], 1.2, 'sun');
  const [px, py] = H.p(11.65, 3.25, .25);
  stroke(H, R, [[px, py], [px - 17, py - 113]], 'sun', 3);
  shape(H, R, loop([[px - 17, py - 109], [px - 26, py - 132], [px - 21, py - 149], [px - 13, py - 138], [px - 13, py - 111]], 1), 'sun', .65, .8);
  benchFrame(H, R, 3.03, 1.17, 4.9, 1.27, 1.34, 'sun');
  timber(H, R, 3.18, 1.27, 4.55, 1.04, .45, .09, 'teal');
  for (let k = 0; k < 3; k++) {
    const x = 3.32 + k * 1.39;
    box(H, R, x, 1.37, 1.14, .76, .55, .48, k === 1 ? 'paper' : 'sun', .5);
    shape(H, R, H.tile(x + .09, 1.44, .96, .61, 1.04), 'blue', .61, .6);
    H.line(R, [H.p(x + .35, 2.16, .8), H.p(x + .77, 2.16, .8)], 'blue', 2);
  }
  basin(H, R, 3.12, 1.28, 1.45, 1.06, 1.38, 'paper');
  bentTube(H, R, [[3.7, 1.66, 1.36], [3.7, 1.66, .42], [3.32, 1.66, .42], [3.32, 1.66, .2]], 2.2, 'teal');
  metal(H, R, 4.9, 1.3, 1.67, 1.02, 1.37, .16, 'sun');
  shape(H, R, H.tile(5.04, 1.42, 1.38, .75, 1.55), 'blue', .65, .6);
  for (let k = 0; k < 4; k++) box(H, R, 5.13 + k * .29, 1.6, .23, .38, 1.55, .12, 'coral', .48);
  const sieve = H.tile(6.8, 1.42, .92, .76, 1.55);
  shape(H, R, sieve, 'paper', 1, 1.6);
  H.clip(sieve, () => { for (let k = 0; k < 9; k++) { H.line(R, [H.p(6.78 + k * .13, 1.38, 1.56), H.p(6.78 + k * .13, 2.23, 1.56)], 'teal', .65); H.line(R, [H.p(6.79, 1.38 + k * .1, 1.56), H.p(7.76, 1.38 + k * .1, 1.56)], 'blue', .45); } });
  bentTube(H, R, [[7.72, 1.7, 1.56], [8.1, 1.7, 1.56]], 3, 'sun');
  for (const x of [3.2, 5.8, 7.7]) {
    const p = H.p(x, .46, 2.14);
    H.line(R, [[p[0], p[1] - 14], [p[0], p[1] + 11]], 'sun', 3);
    shape(H, R, [[p[0] - 5, p[1] + 8], [p[0] + 5, p[1] + 8], [p[0] + 4, p[1] + 22], [p[0], p[1] + 27], [p[0] - 4, p[1] + 22]], 'teal', .6, .7);
  }
  for (const x of [2.38, 7.8]) {
    bentTube(H, R, [[x, .33, 4.66], [x, .33, 3.9], [x + .65, .33, 4.66]], 2.3, 'teal');
    for (const z of [4.03, 4.46]) H.dot(...H.p(x, .52, z), 1.8, 'paper');
  }
  const lamp = H.p(7.63, 1.18, 3.68);
  H.line(R, [H.p(7.63, 1.18, 4.59), [lamp[0], lamp[1] - 14]], 'blue', 1.1);
  shape(H, R, [[lamp[0] - 12, lamp[1] + 5], [lamp[0] + 12, lamp[1] + 5], [lamp[0] + 7, lamp[1] - 13], [lamp[0] - 7, lamp[1] - 13]], 'sun', .78, .8);
  for (const dx of [-7, 0, 7]) H.line(R, [[lamp[0] + dx, lamp[1] - 12], [lamp[0] + dx, lamp[1] + 6]], 'blue', 1);
  H.glow(lamp[0], lamp[1] + 16, 40, 30, 'sun', .3);
  H.tint(H.tile(2.92, 3.99, 5.4, 3.07, .19), 'blue', .17);
  for (const x of [3.02, 7.74]) for (const j of [3.95, 6.16]) timber(H, R, x, j, .19, .19, .19, 1.15, 'sun');
  for (const j of [3.92, 6.16]) {
    timber(H, R, 3.04, j, 4.84, .17, .48, .17, 'teal');
    bentTube(H, R, [[3.1, j, .55], [4.55, j, 1.24]], 2.4, 'sun');
    bentTube(H, R, [[7.75, j, .55], [6.3, j, 1.24]], 2.4, 'sun');
  }
  timber(H, R, 2.85, 3.8, 5.15, 2.65, 1.23, .1, 'sun');
  for (let k = 0; k < 3; k++) {
    metal(H, R, 3.26 + k * 1.35, 4.05, 1.08, 1.94, .65, .09, 'teal');
    shape(H, R, H.tile(3.37 + k * 1.35, 4.18, .85, 1.68, .75), k === 1 ? 'paper' : 'blue', k === 1 ? 1 : .49, .5);
  }
  for (const x of [3.13, 7.67]) {
    metal(H, R, x, 6.46, .25, .1, .37, .63, 'teal');
    H.line(R, [H.p(x + .02, 6.58, .28), H.p(x + .23, 6.58, .28)], 'coral', 2.2);
  }
  shape(H, R, H.tile(3.05, 4, 4.73, 2.25, 1.33), 'blue', .4, .5);
  for (const x of [3.35, 6.6]) timber(H, R, x, 3.8, .16, 2.6, 1.34, .16, 'teal');
  for (const x of [3.1, 7.6]) box(H, R, x, 4, .16, .21, 1.36, .35, 'teal', .7);
  metal(H, R, 2.86, 6.37, 5.1, .15, 1.12, .18, 'teal');
  bentTube(H, R, [[2.96, 6.49, 1.23], [2.4, 6.49, 1.1], [2.05, 6.6, .5]], 2.4, 'teal');
  for (const x of [3.02, 7.76]) H.line(R, [H.p(x, 6.26, .22), H.p(x + .18, 6.26, .22)], 'teal', 3);
  for (let n = 0; n < 4; n++) sprout(H, R, 7.04 + (n % 2) * .47, 4.23 + Math.floor(n / 2) * .65, 1.53, .8);
  for (const x of [3.08, 6.79]) for (const j of [8.92, 9.64]) timber(H, R, x, j, .16, .16, .18, .84, 'sun');
  timber(H, R, 3, 8.85, 4.05, 1.1, .99, .13, 'sun');
  timber(H, R, 3.1, 8.91, 3.77, .82, .4, .1, 'teal');
  for (let k = 0; k < 3; k++) metal(H, R, 3.32, 9.03, 1.2, .63, .51 + k * .09, .07, 'teal');
  drape(H, R, 5.18, 8.98, 1.07, .69, .51, .24, 'paper');
  for (let k = 0; k < 2; k++) vessel(H, R, 6.57, 9.24, .51 + k * .19, 7 - k, 7, 'coral', false);
  for (const x of [3.13, 6.8]) timber(H, R, x, 8.9, .14, .9, .19, .16, 'teal');
  vessel(H, R, 3.56, 9.3, 1.15, 12, 4, 'paper');
  bentTube(H, R, [[4.28, 9.18, 1.17], [4.92, 9.18, 1.17]], 2.6, 'sun');
  for (let n = 0; n < 6; n++) H.line(R, [H.p(4.84, 9.01 + n * .075, 1.18), H.p(5.25, 9.01 + n * .075, 1.18)], 'blue', 1);
  shape(H, R, H.tile(5.55, 9.08, .65, .56, 1.16), 'paper', 1, .65);
  H.line(R, [H.p(5.6, 9.15, 1.17), H.p(6.13, 9.53, 1.17)], 'teal', 1.6);
  metal(H, R, 6.45, 9.08, .18, .53, 1.14, .32, 'blue');
  drape(H, R, 7.7, 8.9, .75, .8, .44, .2, 'coral');
  for (const j of [8.75, 9.55]) bentTube(H, R, [[9.2, j, .2], [9.2, j, 1.1], [10.3, j, 1.1], [10.3, j, .2]], 2, 'sun');
  for (const z of [.44, .7]) timber(H, R, 9.12, 8.72, 1.32, .14, z, .09, 'sun');
  stroke(H, R, [H.p(9.2, 9.52, 1.1), H.p(9.75, 9.62, 1.44), H.p(10.3, 9.52, 1.1)], 'coral', 1.7);
  for (const x of [10.65, 11.16]) { const [bx, by] = H.p(x, 10.15, .2); shape(H, R, loop([[bx - 5, by], [bx + 9, by], [bx + 10, by - 5], [bx + 3, by - 8], [bx + 3, by - 21], [bx - 5, by - 21]], 1), 'blue', .65, .7); H.line(R, [[bx - 3, by - 18], [bx + 2, by - 18]], 'sun', 1); }
  for (const j of [10.48, 10.72]) { const p = H.p(7.7, j, .2); H.line(R, [[p[0], p[1]], [p[0] + 3, p[1] - 4], [p[0] + 4, p[1] + 2]], 'blue', .65); }
  for (const x of [9.23, 11.41]) for (const j of [4.2, 6.55]) timber(H, R, x, j, .18, .18, .18, 1.63, 'sun');
  shape(H, R, H.tile(9.28, 4.25, 2.16, 2.32, 1.24), 'blue', .73, .6);
  for (let k = 0; k < 4; k++) {
    timber(H, R, 9.23, 6.6, 2.35, .15, .32 + k * .33, .25, 'sun');
    timber(H, R, 11.42, 4.2, .15, 2.4, .32 + k * .33, .25, 'sun');
  }
  for (let k = 0; k < 7; k++) {
    const x = 9.43 + (k % 3) * .63, j = 4.56 + Math.floor(k / 3) * .62;
    const [px, py] = H.p(x, j, 1.43);
    shape(H, R, [[px - 8, py], [px - 3, py - 7], [px + 7, py - 4], [px + 10, py + 3]], k % 2 ? 'teal' : 'coral', .4, .6);
  }
  for (let k = 0; k < 5; k++) timber(H, R, 9.19 + k * .48, 4.18, .39, .92, 1.92 + k * .013, .1, 'sun');
  bentTube(H, R, [[11.3, 4.98, 1.93], [11.3, 5.5, 1.57]], 2, 'teal');
  vessel(H, R, 8.89, 6.16, .19, 13, 25, 'teal', false);
  const can = H.p(8.89, 6.16, .19);
  stroke(H, R, [[can[0] + 10, can[1] - 14], [can[0] + 22, can[1] - 21], [can[0] + 29, can[1] - 31]], 'teal', 5);
  oval(H, R, can[0] + 29, can[1] - 32, 5, 2, 'sun', .68);
  stroke(H, R, [[can[0] - 10, can[1] - 19], [can[0] - 19, can[1] - 36], [can[0] + 7, can[1] - 39], [can[0] + 11, can[1] - 23]], 'blue', 2);
  const hull = [[.84, 7.08], [1.55, 7.72], [1.64, 10.7], [.97, 11.65], [.32, 10.94], [.3, 7.98]].map(([i, j]) => H.p(i, j, .15));
  shape(H, R, hull, 'sun', .56, 1.6);
  const inner = [[.85, 7.49], [1.35, 7.93], [1.43, 10.58], [.97, 11.23], [.52, 10.72], [.51, 8.08]].map(([i, j]) => H.p(i, j, .17));
  shape(H, R, inner, 'blue', .6, .7);
  for (const j of [8.25, 10.25]) timber(H, R, .47, j, 1.01, .32, .25, .13, 'sun');
  stroke(H, R, [H.p(1.2, 7.71, .3), H.p(1.59, 7.36, .19), H.p(1.98, 8.1, 1.1)], 'coral', 1.5);
  for (let k = 0; k < 3; k++) { const [x, y] = H.p(.5 + k * .48, 1.3 + k * .9, .08); branchSpray(H, R, x, y, .7, 'teal', -1); }
}, (H, R, t) => {
  const u = ((t % 18) + 18) % 18;
  const slide = ease(0, 3.6, u) * (1 - ease(13.2, 16, u));
  const lift = ease(3.6, 7.2, u) * (1 - ease(10.8, 13.2, u));
  const j = 4.12 + slide * .74, z = 1.51 + lift * .52;
  const hands = tray(H, R, j, z);
  grower(H, R, 6.15, 6.65, hands, lift * 2);
  const [x, y] = H.p(10.45, 2.23, 3.45), sway = Math.sin(u * TAU / 18) * 2.5;
  shape(H, R, [[x, y], [x + 20, y + 10], [x + 22 + sway, y + 38], [x + sway, y + 26]], 'paper', .48, .6);
  for (let k = 1; k < 5; k++) H.line(R, [[x + k * 4, y + k * 2], [x + k * 4 + sway, y + 27 + k * 2]], 'teal', .45);
});
room.loopSeconds = 18;
room.stillTime = 8.6;
export default room;
