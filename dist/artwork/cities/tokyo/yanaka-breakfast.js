import { world, shape, oval, stroke, box, actor, steam, cycle, plant, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

function line(H, R, points, width = 1, ink = 'blue', tone = .8) {
  H.line(R, points, ink, width, { tone, amp: .1 });
}

function bowl(H, R, i, j, z, ink = 'paper', rice = false) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 9, y - 5], [x + 9, y - 5], [x + 6, y + 3], [x - 5, y + 3]], ink, .9, .6);
  oval(H, R, x, y - 5, 9, 4, rice ? 'paper' : 'coral', rice ? 1 : .38);
  if (rice) for (let k = 0; k < 8; k++) {
    const dx = (k % 4) * 3 - 5, dy = Math.floor(k / 4) * 2 - 6;
    line(H, R, [[x + dx, y + dy], [x + dx + 1, y + dy - 1.5]], .5, 'sun', .6);
  }
  else for (const dx of [-4, 2, 5]) H.dot(x + dx, y - 5 + dx % 2, 1.1, 'teal', .8);
}

function cup(H, R, i, j, z, ink = 'teal') {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 5, y], [x + 5, y], [x + 6, y - 10], [x - 6, y - 10]], 'paper', 1, .55);
  oval(H, R, x, y - 10, 6, 2.5, 'sun', .5);
  line(H, R, [[x - 4, y - 4], [x + 4, y - 4]], 1.1, ink);
}

function mat(H, R, i, j, w, d) {
  shape(H, R, H.tile(i, j, w, d, .35), 'sun', .22, .7);
  for (let n = .11; n < d; n += .12) line(H, R, [H.p(i + .09, j + n, .36), H.p(i + w - .09, j + n, .36)], .4, 'teal', .4);
  for (const x of [i + .05, i + w - .05]) line(H, R, [H.p(x, j, .37), H.p(x, j + d, .37)], 2.8, 'teal', .7);
}

function table(H, R) {
  for (const i of [2.85, 6.5]) for (const j of [4.8, 7]) box(H, R, i, j, .17, .17, .35, .65, 'coral', .5);
  box(H, R, 2.6, 4.65, 4.35, 2.65, 1, .14, 'coral', .38);
  for (const [i, j] of [[3.5, 5.25], [5.7, 5.35], [4.85, 6.8]]) {
    bowl(H, R, i, j, 1.2, 'paper', true);
    bowl(H, R, i + .55, j + .18, 1.2, 'blue');
    shape(H, R, H.tile(i - .3, j + .5, .8, .35, 1.16), 'paper', 1, .5);
    for (let k = 0; k < 3; k++) box(H, R, i - .24 + k * .21, j + .54, .17, .24, 1.18, .1, 'sun', .85);
    box(H, R, i - .32, j + .3, .13, .08, 1.17, .06, 'teal', .65);
    for (const d of [0, .055]) line(H, R, [H.p(i - .4, j + .26 + d, 1.22), H.p(i + .35, j + .26 + d, 1.22)], 1.1, 'blue');
  }
  bowl(H, R, 6.45, 6.7, 1.2, 'teal');
  const [x, y] = H.p(6.45, 6.7, 1.25);
  for (let k = 0; k < 5; k++) oval(H, R, x - 5 + k * 2.5, y - 5, 2, 3, k % 2 ? 'teal' : 'coral', .7);
  cup(H, R, 3.25, 6.45, 1.16);
  cup(H, R, 4.75, 5.12, 1.16, 'coral');
  box(H, R, 6.05, 4.78, .65, .42, 1.16, .025, 'paper', 1);
  for (let k = 0; k < 4; k++) line(H, R, [H.p(6.1 + k * .13, 4.8, 1.2), H.p(6.1 + k * .13, 5.17, 1.2)], .55, 'teal', .55);
}


function homeDetails(H, R) {
  for (const z of [2.02, 2.82]) {
    box(H, R, .65, .13, 5.8, .52, z, .1, 'coral', .52);
    for (const i of [.82, 3.6, 6.1]) line(H, R, [H.p(i, .15, z), H.p(i, .15, z - .28), H.p(i, .63, z)], 1.1);
  }
  for (let k = 0; k < 6; k++) {
    const i = .88 + k * .69;
    const [x, y] = H.p(i, .39, 2.14);
    if (k < 3) {
      for (let n = 0; n < 4; n++) oval(H, R, x, y - n * 3, 10, 4, 'paper', 1);
      line(H, R, [[x - 7, y - 7], [x + 7, y - 7]], .8, k % 2 ? 'coral' : 'teal');
    } else {
      shape(H, R, [[x - 6, y], [x + 6, y], [x + 6, y - 21], [x - 6, y - 21]], k % 2 ? 'paper' : 'teal', k % 2 ? 1 : .5, .6);
      oval(H, R, x, y - 21, 7, 3, 'sun', .6);
      line(H, R, [[x - 4, y - 8], [x + 4, y - 8]], 2, 'coral');
    }
  }
  for (let k = 0; k < 7; k++) {
    const i = .9 + k * .74;
    const [x, y] = H.p(i, .4, 2.95);
    if (k % 3 === 0) {
      box(H, R, i - .18, .25, .38, .32, 2.94, .49, 'paper', 1);
      line(H, R, [H.p(i - .12, .58, 3.17), H.p(i + .12, .58, 3.17)], 3, 'teal');
    } else {
      oval(H, R, x, y - 6, 9, 7, k % 2 ? 'coral' : 'sun', .55);
      oval(H, R, x, y - 12, 6, 2, 'paper', 1);
      H.dot(x, y - 15, 2, 'blue', .7);
    }
  }
  for (const [i, radius] of [[4.6, 14], [5.65, 11]]) {
    const [x, y] = H.p(i, .13, 1.58);
    oval(H, R, x, y, radius, radius, 'blue', .66);
    oval(H, R, x, y, radius - 3, radius - 3, 'paper', .65);
    line(H, R, [[x, y - radius], [x, y - radius - 20]], 3, 'blue');
    H.outline(R, ell(x, y - radius - 20, 2, 3), 'paper', .8, {tone: 1, amp: .06});
  }
  for (let k = 0; k < 5; k++) {
    const [x, y] = H.p(2.35 + k * .26, .12, 1.73);
    line(H, R, [[x, y], [x, y - 21]], 1.1);
    if (k % 2) oval(H, R, x, y + 3, 3, 5, 'paper', 1);
    else shape(H, R, [[x - 3, y - 1], [x + 3, y - 1], [x + 4, y + 8], [x - 4, y + 8]], 'sun', .5, .5);
  }
  box(H, R, 1.98, .92, .6, 1.1, 1.31, .05, 'sun', .4);
  for (let k = 0; k < 5; k++) {
    const [x, y] = H.p(2.15 + k % 2 * .19, 1.2 + Math.floor(k / 2) * .23, 1.39);
    oval(H, R, x, y, 4, 2, k % 2 ? 'coral' : 'teal', .75);
  }
  line(H, R, [H.p(2.41, 1.13, 1.41), H.p(2.41, 1.64, 1.41)], 3, 'paper');
  line(H, R, [H.p(2.41, 1.66, 1.41), H.p(2.41, 1.9, 1.41)], 3, 'blue');
  bowl(H, R, .88, 1.83, 1.34, 'teal', true);
  const [sx, sy] = H.p(3.9, .9, 1.32);
  shape(H, R, [[sx - 4, sy], [sx + 5, sy], [sx + 5, sy - 18], [sx - 4, sy - 18]], 'teal', .6, .6);
  line(H, R, [[sx, sy - 18], [sx, sy - 24], [sx + 8, sy - 24]], 1.3);
  box(H, R, 3.6, 1.86, .43, .21, 1.33, .09, 'sun', .8);
  for (let k = 0; k < 3; k++) box(H, R, 6.35, 1.56, .29, .34, 1.34 + k * .13, .1, 'paper', 1);
  shape(H, R, H.faceI(7.38, 1.961, .56, 1.19, 1.92), 'paper', 1, .5);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) {
    const [x, y] = H.p(7.46 + i * .16, 1.97, 1.31 + j * .13);
    H.dot(x, y, 1.2, i === 2 ? 'coral' : 'teal', .75);
  }
  for (const [i, z, ink] of [[7.52, 2.45, 'coral'], [7.92, 2.61, 'sun']]) {
    const [x, y] = H.p(i, 1.98, z);
    shape(H, R, [[x - 5, y], [x, y - 6], [x + 5, y], [x, y + 5]], ink, .8, .5);
  }
  box(H, R, .45, 9.08, 2.14, 1.23, .35, .78, 'coral', .53);
  for (const z of [.5, .79]) {
    line(H, R, [H.p(.5, 10.32, z), H.p(2.52, 10.32, z)], .7);
    for (const i of [.85, 1.91]) line(H, R, [H.p(i, 10.34, z + .13), H.p(i + .24, 10.34, z + .13)], 1.6);
  }
  box(H, R, .73, 9.2, .78, .41, 1.15, .49, 'blue', .72);
  const [rx, ry] = H.p(1.1, 9.62, 1.41);
  oval(H, R, rx - 6, ry, 6, 6, 'paper', .7);
  for (let k = 0; k < 5; k++) line(H, R, [[rx - 10 + k * 2, ry - 4], [rx - 10 + k * 2, ry + 4]], .65);
  H.dot(rx + 11, ry, 2.2, 'sun', .8);
  line(H, R, [H.p(1.35, 9.3, 1.62), H.p(1.21, 9.3, 2.2)], 1);
  for (let k = 0; k < 5; k++) box(H, R, 1.68, 9.3, .66, .72, 1.15 + k * .07, .065, ['paper', 'teal', 'coral'][k % 3], k % 3 ? .6 : 1);
  const [px, py] = H.p(.65, 10.01, 1.17);
  shape(H, R, [[px - 9, py], [px + 9, py + 4], [px + 9, py - 20], [px - 9, py - 24]], 'paper', 1, .7);
  for (const dx of [-4, 4]) { H.dot(px + dx, py - 13 + dx * .22, 2.5, 'coral', .5); line(H, R, [[px + dx, py - 10], [px + dx, py - 3]], 3, dx < 0 ? 'teal' : 'blue'); }
  box(H, R, .33, 6.6, .65, 1.65, 1.85, .1, 'sun', .5);
  for (let k = 0; k < 7; k++) box(H, R, .45, 6.72 + k * .2, .42, .16, 1.97, .5 + k % 3 * .08, ['teal', 'coral', 'paper'][k % 3], k % 3 === 2 ? 1 : .58);
  box(H, R, 3.1, 9.23, 1.44, 1.03, .35, .11, 'teal', .52);
  for (let k = 0; k < 8; k++) line(H, R, [H.p(3.18 + k * .16, 9.31, .48), H.p(3.18 + k * .16, 10.17, .48)], .6, 'paper', .6);
  box(H, R, 4.7, 9.78, 1.17, .63, .35, .08, 'paper', 1);
  for (let k = 0; k < 4; k++) line(H, R, [H.p(4.84, 9.87 + k * .11, .45), H.p(5.69, 9.87 + k * .11, .45)], .6);
  cup(H, R, 4.7, 9.38, .4, 'coral');
  const [bx, by] = H.p(6.7, 9.82, .35);
  oval(H, R, bx, by - 5, 17, 8, 'sun', .35);
  shape(H, R, [[bx - 16, by - 5], [bx - 12, by + 8], [bx + 12, by + 8], [bx + 17, by - 5]], 'sun', .4, .7);
  for (let k = 0; k < 5; k++) line(H, R, [[bx - 10 + k * 5, by - 2], [bx - 9 + k * 4.5, by + 6]], .65, 'coral');
  for (let k = 0; k < 3; k++) box(H, R, 6.52, 9.6, .7, .46, .62 + k * .08, .07, k % 2 ? 'teal' : 'paper', k % 2 ? .35 : 1);
  box(H, R, 10.65, 3.26, .98, 2.8, .02, .8, 'coral', .38);
  for (let j = 3.45; j < 5.95; j += .65) {
    shape(H, R, H.faceJ(11.65, j, .5, .18, .61), 'blue', .48, .5);
    for (let n = 0; n < 2; n++) oval(H, R, ...H.p(11.67, j + .13 + n * .23, .26), 5, 2.7, 'paper', .7);
  }
  plant(H, R, ...H.p(11.2, 3.75, .85), .85);
  for (const j of [4.4, 5.3]) {
    const [x, y] = H.p(11.35, j, .85);
    shape(H, R, [[x - 8, y], [x + 8, y], [x + 10, y - 15], [x - 8, y - 15]], 'paper', 1, .55);
    line(H, R, [[x - 4, y - 16], [x - 4, y - 25], [x + 4, y - 25], [x + 4, y - 16]], 1);
    line(H, R, [[x - 5, y - 6], [x + 5, y - 6]], 2, 'coral');
  }
  for (const [i, ink] of [[9.05, 'teal'], [9.85, 'paper']]) {
    const [x, y] = H.p(i, .16, 2.35);
    line(H, R, [[x, y - 13], [x - 9, y - 3], [x + 9, y - 3], [x, y - 13]], .9);
    shape(H, R, [[x - 11, y - 1], [x - 20, y + 9], [x - 14, y + 15], [x - 9, y + 10], [x - 7, y + 31], [x + 9, y + 31], [x + 11, y + 9], [x + 17, y + 15], [x + 22, y + 9], [x + 11, y - 1]], ink, ink === 'paper' ? 1 : .65, .7);
  }
}

const room = world('tokyo-yanaka-breakfast', 'Yanaka · Breakfast with the door open', {
  floor: 'teal', tone: .26, wall: 'sun', wallTone: .2, height: 3.45, head: 20,
}, (H, R) => {
  box(H, R, .2, .2, 8.45, 11.4, 0, .32, 'coral', .38);
  for (let j = .35; j < 11.6; j += .5) line(H, R, [H.p(.22, j, .33), H.p(8.64, j, .33)], .6, 'coral', .5);
  for (const [i, j, w, d] of [[.7, 3.05, 3.65, 2.2], [4.4, 3.05, 3.65, 2.2], [.7, 5.32, 2.2, 4.4], [2.96, 5.32, 2.75, 4.4], [5.77, 5.32, 2.27, 4.4]]) mat(H, R, i, j, w, d);
  for (const i of [.15, 4.45, 8.62, 11.7]) box(H, R, i, .03, .17, .18, .02, 3.53, 'blue', .58);
  for (const j of [.1, 5.2, 10.95]) box(H, R, .05, j, .18, .18, .03, 3.48, 'blue', .58);
  box(H, R, .02, .05, 11.83, .18, 3.33, .24, 'blue', .64);
  box(H, R, .05, .03, .18, 11.05, 3.33, .24, 'blue', .64);
  for (const j of [1.04, 4.64]) box(H, R, .11, j, .24, .13, 1.03, 2.03, 'coral', .6);
  for (const z of [1.04, 3.04]) box(H, R, .1, 1.03, .31, 3.74, z, .12, 'sun', .5);
  box(H, R, .1, 1.03, .55, 3.74, .94, .12, 'coral', .52);
  const shoji = H.faceJ(.2, 1.1, 3.55, 1.15, 3.02);
  shape(H, R, shoji, 'paper', 1, .8);
  for (let j = 1.1; j <= 4.66; j += .45) line(H, R, [H.p(.23, j, 1.15), H.p(.23, j, 3.02)], 1.1, 'coral', .65);
  for (let z = 1.15; z < 3.03; z += .36) line(H, R, [H.p(.23, 1.1, z), H.p(.23, 4.65, z)], 1.1, 'coral', .65);
  box(H, R, .55, .65, 6.2, 1.55, .33, .15, 'blue', .6);
  box(H, R, .6, .7, 6.05, 1.43, .48, .68, 'blue', .6);
  for (const i of [.58, 2.05, 4.3, 5.6, 6.65]) box(H, R, i, .67, .09, 1.53, .46, .73, 'paper', 1);
  for (const i of [.7, 4.41, 5.71]) {
    shape(H, R, H.faceI(i, 2.23, i < 1 ? 1.22 : 1.12, .52, 1.1), 'paper', 1, .7);
    shape(H, R, H.faceI(i + .1, 2.24, i < 1 ? 1.02 : .92, .62, .98), 'sun', .17, .5);
  }
  box(H, R, 2.2, .85, 1.91, 1.14, .52, .07, 'paper', 1);
  for (const i of [2.35, 2.9]) {
    const [x, y] = H.p(i, 1.55, .62);
    oval(H, R, x, y - 10, 7, 11, 'teal', .45);
    oval(H, R, x, y - 21, 5, 2, 'paper', 1);
  }
  stroke(H, R, [H.p(3.42, 1.38, 1.2), H.p(3.42, 1.38, .73), H.p(3.77, 1.38, .65), H.p(3.77, .79, .65)], 'paper', 3);
  shape(H, R, [H.p(3.93, 2.2, .51), H.p(4.35, 2.75, .51), H.p(4.35, 2.75, 1.12), H.p(3.93, 2.2, 1.12)], 'paper', 1, .7);
  box(H, R, .48, .6, 6.35, 1.7, 1.19, .1, 'teal', .45);
  for (const i of [.55, 2.05, 3.55, 5.05]) {
    line(H, R, [H.p(i, 2.21, .4), H.p(i, 2.21, 1.13)], .7);
    line(H, R, [H.p(i + .35, 2.23, 1), H.p(i + .95, 2.23, 1)], 1.3);
  }
  shape(H, R, H.tile(2.65, .85, 1.5, 1, 1.31), 'blue', .65, .6);
  shape(H, R, H.tile(2.78, .95, 1.22, .76, 1.32), 'paper', .8, .55);
  stroke(H, R, [H.p(3.3, .8, 1.33), H.p(3.3, .8, 1.87), H.p(3.3, 1.08, 1.9), H.p(3.3, 1.28, 1.66)], 'blue', 2.4);
  for (const i of [4.55, 5.55]) {
    const [x, y] = H.p(i, 1.38, 1.33);
    oval(H, R, x, y, 12, 5, 'blue', .65);
    H.outline(R, ell(x, y, 8, 3), 'paper', 1, { tone: 1, amp: .1 });
  }
  const [kx, ky] = H.p(5.55, 1.38, 1.4);
  oval(H, R, kx, ky - 8, 13, 10, 'paper', 1);
  oval(H, R, kx, ky - 16, 7, 3, 'blue', .5);
  stroke(H, R, [[kx - 8, ky - 13], [kx - 9, ky - 28], [kx + 9, ky - 28], [kx + 10, ky - 13]], 'blue', 1.8);
  shape(H, R, [[kx + 11, ky - 8], [kx + 19, ky - 15], [kx + 21, ky - 10], [kx + 13, ky - 2]], 'paper', 1, .7);
  const [rx, ry] = H.p(1.45, 1.4, 1.3);
  shape(H, R, [[rx - 15, ry - 17], [rx + 15, ry - 17], [rx + 15, ry], [rx - 15, ry]], 'paper', 1, .8);
  oval(H, R, rx, ry - 17, 15, 7, 'paper', 1);
  line(H, R, [[rx - 9, ry - 18], [rx + 9, ry - 18]], 2, 'blue');
  H.dot(rx + 8, ry - 5, 2, 'coral', .8);
  box(H, R, 6.95, .6, 1.27, 1.33, .33, 2.6, 'paper', .9);
  line(H, R, [H.p(7, 1.94, 2.07), H.p(8.22, 1.94, 2.07)], 1);
  for (const z of [1.3, 2.55]) line(H, R, [H.p(7.15, 1.97, z), H.p(7.15, 1.97, z - .35)], 2);
  for (let k = 0; k < 5; k++) {
    const [x, y] = H.p(6.12 + k * .08, 1.02 + k * .13, 1.33);
    oval(H, R, x, y - 10, 6, 11, 'paper', 1);
    line(H, R, [[x - 8, y], [x + 8, y]], .8, 'teal');
  }
  box(H, R, 9.2, .5, 2.15, 1.65, .02, 2.9, 'blue', .7);
  box(H, R, 9.16, .46, .16, 1.75, .03, 2.96, 'coral', .65);
  box(H, R, 11.22, .46, .16, 1.75, .03, 2.96, 'coral', .65);
  for (const z of [.17, 1.64, 2.92]) box(H, R, 9.2, .44, 2.14, 1.79, z, .12, 'sun', .5);
  for (let k = 0; k < 3; k++) {
    box(H, R, 9.46 + k * .53, .82, .43, 1.1, 1.79, .73, ['paper', 'teal', 'coral'][k], k ? .4 : 1);
    line(H, R, [H.p(9.51 + k * .53, 1.93, 2.17), H.p(9.81 + k * .53, 1.93, 2.17)], 2, 'sun');
  }
  shape(H, R, H.faceI(10.66, 2.24, .51, .2, 2.77), 'paper', .86, .7);
  for (let k = 0; k < 4; k++) box(H, R, 9.46, .85, 1.55, 1.15, .35 + k * .21, .2, k % 2 ? 'teal' : 'paper', k % 2 ? .28 : 1);
  box(H, R, 9.52, 1.18, 1.37, .65, 1.27, .22, 'paper', 1);
  box(H, R, 10.61, 2.18, .68, .08, .16, 2.62, 'sun', .25);
  for (let z = .6; z < 2.7; z += .52) line(H, R, [H.p(10.64, 2.28, z), H.p(11.25, 2.28, z)], .7);
  for (const [i, j, ink] of [[3.1, 4.12, 'teal'], [7.25, 5.8, 'coral'], [4.1, 7.75, 'teal']]) {
    box(H, R, i, j, 1.04, .85, .35, .12, ink, .48);
    H.outline(R, H.tile(i + .08, j + .08, .87, .68, .49), 'paper', .6, { tone: .7, amp: .08 });
  }
  for (let k = 0; k < 6; k++) line(H, R, [H.p(7.33 + k * .07, 6.46, .5), H.p(7.35 + k * .07, 6.57, .5)], .7, 'paper');
  for (let i = 8.75; i < 11.9; i += .6) for (let j = 5.6; j < 10.7; j += .6) H.outline(R, H.tile(i, j, .6, .6, .02), 'paper', .6, { tone: .65, amp: .07 });
  box(H, R, 8.2, 7.8, .46, 2.65, .01, .16, 'coral', .35);
  for (const [i, j, ink] of [[9.1, 8.2, 'blue'], [9.5, 8.2, 'blue'], [10.3, 8.8, 'coral'], [10.62, 8.8, 'coral']]) {
    const [x, y] = H.p(i, j, .04);
    oval(H, R, x, y - 3, 7, 4, ink, .75);
    oval(H, R, x - 2, y - 5, 3.5, 2, 'paper', .6);
  }
  for (const j of [9.2, 9.7]) {
    const [x, y] = H.p(7.6, j, .36);
    shape(H, R, [[x - 8, y - 3], [x + 5, y - 5], [x + 9, y + 1], [x - 5, y + 6]], 'paper', 1, .6);
    line(H, R, [[x - 5, y - 1], [x + 5, y]], 2.4, 'teal');
  }
  box(H, R, 7.5, 3, .74, .58, .34, .85, 'coral', .8);
  box(H, R, 7.53, 3.45, .67, .17, .69, .44, 'coral', .85);
  for (const i of [7.65, 8.02]) line(H, R, [H.p(i, 3, .6), H.p(i, 3, 1.3)], 1.5, 'blue');
  box(H, R, 8.75, 3.35, .95, .8, .03, .66, 'sun', .5);
  for (let z = .16; z < .64; z += .14) line(H, R, [H.p(8.77, 4.16, z), H.p(9.69, 4.16, z)], .7);
  stroke(H, R, [H.p(8.93, 3.7, .67), H.p(8.97, 3.7, 1.08), H.p(9.48, 3.7, 1.08), H.p(9.53, 3.7, .67)], 'coral', 1.6);
  plant(H, R, ...H.p(.95, 10.7, .34), 1.1);
  for (const i of [9.2, 11.65]) box(H, R, i, 10.85, .14, .18, .03, 2.8, 'blue', .55);
  box(H, R, 9.2, 10.85, 2.6, .18, 2.78, .17, 'blue', .6);
  line(H, R, [H.p(8.85, 10.83, .03), H.p(11.8, 10.83, .03)], 2, 'blue');
  shape(H, R, H.tile(8.8, 11.1, 3.1, .72, .03), 'teal', .45, .5);
  plant(H, R, ...H.p(11.5, 11.5, .05), .85);
  const [bx, by] = H.p(9.2, 11.5, .15);
  H.outline(R, ell(bx, by - 15, 15, 19), 'blue', 1.8, { tone: .8, amp: .08 });
  for (let k = 0; k < 8; k++) line(H, R, [[bx, by - 15], [bx + Math.sin(k * Math.PI / 4) * 15, by - 15 + Math.cos(k * Math.PI / 4) * 19]], .5);
  line(H, R, [[bx, by - 15], [bx + 10, by - 45], [bx + 24, by - 48]], 2.2, 'teal');
  const [mx, my] = H.p(11.5, 7.5, .02);
  line(H, R, [[mx, my], [mx - 7, my - 72]], 1.8, 'coral');
  for (let k = 0; k < 8; k++) line(H, R, [[mx - 3, my - 15], [mx - 11 + k * 3, my + 3]], .8, 'sun');
  homeDetails(H, R);
  box(H, R, .25, 6.48, .74, 1.96, 2.79, .12, 'coral', .6);
  for (const j of [6.55, 8.3]) box(H, R, .25, j, .74, .1, 1.85, .94, 'coral', .6);
  box(H, R, .34, 6.72, .48, .61, 2.04, .3, 'paper', 1);
  line(H, R, [H.p(.85, 6.8, 2.15), H.p(.85, 7.22, 2.15)], 2, 'coral');
  const [nx, ny] = H.p(6.68, 10.83, .35);
  oval(H, R, nx, ny, 14, 6, 'paper', 1);
  oval(H, R, nx, ny - 10, 8, 6, 'teal', .55);
  for (let k = 0; k < 5; k++) line(H, R, [[nx - 7 + k * 3, ny - 13], [nx - 5 + k * 2, ny - 5]], .7, 'paper');
  line(H, R, [[nx, ny - 13], [nx + 10, ny - 22], [nx + 21, ny - 13]], 1.2, 'coral');
  const [qx, qy] = H.p(5.35, 10.78, .37);
  shape(H, R, [[qx - 17, qy], [qx + 14, qy + 6], [qx + 11, qy - 14], [qx - 10, qy - 18]], 'sun', .35, .7);
  for (let k = 0; k < 5; k++) line(H, R, [[qx - 7 + k * 4, qy - 12], [qx - 7 + k * 4, qy - 4]], .7, 'teal');
  table(H, R);
}, (H, R, t) => {
  const u = cycle(t, 12), pour = Math.sin(Math.PI * Math.max(0, Math.min(1, (u - .12) / .47))) ** 2;
  H.at(3.6, 4.25, .35, HH => {
    const a = HH.p(2.6, 4.65, 1.14), b = HH.p(6.95, 4.65, 1.14);
    HH.clip([[a[0], a[1] - 200], [b[0], b[1] - 200], b, a], () => actor(HH, R, 3.6, 4.25, pour * 1.2, 'kneel', { shirt: ['teal', .7], hairStyle: 'bun' }, .35, 1.26));
  });
  H.at(7.4, 6.25, .35, HH => actor(HH, R, 7.4, 6.25, pour * 1.5, 'sitfloor', { shirt: ['sun', .68], face: 'nw' }, .35, 1.15, 'child'));
  H.at(9.2, 6.55, 0, HH => actor(HH, R, 9.2, 6.55, t * .35, 'kneel', { shirt: ['paper', 1], pants: ['blue', .7], hairStyle: 'short' }, 0, 1.15));
  H.at(4.8, 6.1, 1.15, HH => {
    const [x, y] = HH.p(4.08 + pour * .17, 4.9 + pour * .17, 1.45 + pour * .13);
    oval(HH, R, x, y, 11, 8, 'teal', .6);
    oval(HH, R, x, y - 7, 7, 2, 'paper', 1);
    HH.dot(x, y - 10, 2.1, 'blue', .8);
    stroke(HH, R, [[x - 9, y - 3], [x - 17, y - 10], [x - 20, y + 2], [x - 11, y + 5]], 'blue', 1.6);
    shape(HH, R, [[x + 8, y - 3], [x + 21, y + 1 + pour * 5], [x + 17, y + 5 + pour * 5], [x + 7, y + 4]], 'teal', .6, .7);
    if (pour > .35) line(HH, R, [[x + 19, y + 4 + pour * 5], HH.p(4.75, 5.12, 1.43)], 1, 'sun', .7);
  });
  H.at(2.7, 2.8, .35, HH => {
    actor(HH, R, 2.7, 2.8, t * .32, 'water', {shirt: ['paper', 1], apron: ['coral', .65], hairStyle: 'short', face: 'nw'}, .35, 1.25);
    const stir = Math.sin(t * .8) * .1;
    const [x, y] = HH.p(2.45 + stir, 2.2, 1.55);
    line(HH, R, [[x - 6, y + 9], [x + 7, y - 8]], 1.7, 'coral');
    oval(HH, R, x - 7, y + 10, 4, 2, 'paper', 1);
  });
  H.at(3.8, 9.72, .47, HH => actor(HH, R, 3.8, 9.72, t * .18, 'sitfloor', {shirt: ['paper', 1], hair: ['blue', .3], glasses: true, prop: (h, r, p) => {
    const [x, y] = p.nearHand;
    shape(h, r, [[x - 16, y - 7], [x + 14, y - 4], [x + 11, y + 10], [x - 17, y + 6]], 'paper', 1, .65);
    for (let k = 0; k < 4; k++) line(h, r, [[x - 12, y - 2 + k * 2.5], [x + 9, y + k * 2.5]], .5);
    line(h, r, [[x - 1, y - 5], [x - 2, y + 9]], .6);
  }}, .47, 1.18, 'elder'));
  const [wx, wy] = H.p(3.3, 1.1, 1.62);
  line(H, R, [[wx, wy], [wx, wy + 10 + Math.sin(t * 2) * 2]], .8, 'paper', .75);
  steam(H, R, ...H.p(1.45, 1.4, 1.75), t * .65, 1, 'paper');
  steam(H, R, ...H.p(5.72, 5.52, 1.45), t, 2, 'paper');
  H.at(10.7, 11.32, .04, HH => {
    const [x, y] = HH.p(10.7, 11.32, .04);
    FIGURES.draw(HH, R, { who: 'cat', x, y, t: t * .4, phase: u, clip: 'idle', scale: 1.03, face: u > .45 ? 'nw' : 'se', opts: { coat: ['paper', 1] } });
  });
  H.at(10.7, 10.9, 0, HH => {
    const shift = .16 + .32 * (1 - Math.cos(u * Math.PI * 2)) / 2;
    shape(HH, R, HH.faceI(9.25 + shift, 10.88, .68, .1, 2.7), 'paper', .76, .8);
    for (let z = .45; z < 2.7; z += .42) line(HH, R, [HH.p(9.25 + shift, 10.9, z), HH.p(9.93 + shift, 10.9, z)], .7, 'coral');
    line(HH, R, [HH.p(9.6 + shift, 10.9, .12), HH.p(9.6 + shift, 10.9, 2.68)], 1, 'coral');
  });
  H.opacity(.18, () => {
    for (let k = 0; k < 5; k++) H.tint(ell(...H.p(1.2 + k * .23, 8.6 + Math.sin(t * .3 + k) * .15, .38), 8, 3), 'teal', .25);
  });
});

export default room;
