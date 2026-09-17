import { world, shape, oval, stroke, box, actor, plant, cycle } from '../../worlds/common.js';
import { FIGURES, loop, ell } from '../../drawings.js';

const standing = FIGURES.sample('idle', 0);
FIGURES.clips.tokyoShibaLaundry = {
  dur: 20,
  keys: [[0, { ar: 30 }], [.2, { ar: 30 }], [.32, { ar: 154, er: 0, al: 135, el: 8, head: -15 }], [.42, { ar: 144, er: 16, al: 124, el: 25 }], [.54, { ar: 55, er: 54, al: 55, el: 54 }], [.66, { ar: 61, er: 81, al: 59, el: 72 }], [.79, { ar: 25, er: 4, lean: -18, head: 12 }], [.87, {}], [1, { ar: 30 }]].map(([u, pose]) => [u, { ...standing, ...pose }]),
};

function tomato(H, R, i, j, ripe = false) {
  box(H, R, i, j, 1.48, 1.01, .08, .57, 'coral', .38);
  shape(H, R, H.tile(i + .11, j + .11, 1.26, .79, .67), 'blue', .42);
  for (const off of [.26, 1.08]) {
    const [x, y] = H.p(i + off, j + .53, .69);
    stroke(H, R, [[x, y], [x - 2, y - 47], [x + 2, y - 91]], 'sun', 1.7);
    stroke(H, R, [[x, y], [x + 7, y - 32], [x - 5, y - 66], [x + 4, y - 83]], 'teal', 2);
    for (let k = 0; k < 6; k++) {
      const side = k % 2 ? 1 : -1, yy = y - 18 - k * 11;
      stroke(H, R, [[x + 2, yy + 6], [x + side * 15, yy - 4]], 'teal', 1.2);
      shape(H, R, loop([[x + side * 5, yy], [x + side * 18, yy - 12], [x + side * 19, yy - 3], [x + side * 9, yy + 4]], 1), 'teal', .7, .65);
      if (k === 1 || k === 3) {
        const px = x + side * 13, py = yy + 9;
        oval(H, R, px, py, 4.5, 4, ripe && k === 1 ? 'coral' : 'sun', ripe && k === 1 ? .94 : .48);
        stroke(H, R, [[px - 3, py - 3], [px, py - 5], [px + 3, py - 3]], 'teal', 1);
      }
    }
    for (const dy of [-24, -52, -75]) H.line(R, [[x - 4, y + dy], [x + 4, y + dy]], 'paper', 1.3);
  }
}

function tower(H, R, light = 0) {
  const [x, y] = H.p(8.15, .15, .62);
  const tiers = [[0, 46], [-67, 20], [-127, 13], [-178, 5.5], [-218, 2]];
  for (const side of [-1, 1]) stroke(H, R, tiers.map(([dy, w]) => [x + side * w, y + dy]), 'coral', 5);
  for (let k = 0; k < tiers.length - 1; k++) {
    const [y0, w0] = tiers[k], [y1, w1] = tiers[k + 1];
    for (let n = 0; n < 4; n++) {
      const f = n / 4, next = (n + 1) / 4;
      const yy = y + y0 + (y1 - y0) * f, yn = y + y0 + (y1 - y0) * next;
      const w = w0 + (w1 - w0) * f, wn = w0 + (w1 - w0) * next;
      H.line(R, [[x - w, yy], [x + w, yy]], k % 2 ? 'paper' : 'coral', 1.7);
      H.line(R, [[x - w, yy], [x + wn, yn]], 'coral', 1.5);
      H.line(R, [[x + w, yy], [x - wn, yn]], 'coral', 1.5);
    }
  }
  for (const [dy, w, h] of [[-78, 28, 12], [-157, 12, 8]]) {
    shape(H, R, [[x - w, y + dy], [x + w, y + dy], [x + w, y + dy - h], [x - w, y + dy - h]], 'paper', 1, .7);
    for (let k = 0; k < 7; k++) H.line(R, [[x - w + 3 + k * (w * 2 - 6) / 7, y + dy - 3], [x - w + 3 + k * (w * 2 - 6) / 7, y + dy - h + 3]], 'blue', 2.2);
  }
  H.line(R, [[x, y - 218], [x, y - 246]], 'paper', 3);
  H.line(R, [[x, y - 232], [x, y - 246]], 'coral', 2.6);
  if (light) {
    for (const side of [-1, 1]) H.line(R, tiers.map(([dy, w]) => [x + side * w, y + dy]), 'sun', 1.6, { tone: .5 + light * .35 });
    H.glow(x, y - 79, 35, 17, 'sun', .06 + light * .12);
  }
}

function washing(H, R, i, ink, t, width = 29, length = 40) {
  const [x, y] = H.p(i, 7.77, 2.86);
  const sway = Math.sin(t * .9 + i) * 3;
  shape(H, R, [[x - width / 2, y], [x + width / 2, y - 3], [x + width / 2 + sway, y + length], [x - width / 2 + sway, y + length + 3]], ink, ink === 'paper' ? 1 : .48, .7);
  for (const dy of [length - 7, length - 3]) stroke(H, R, [[x - width / 2 + sway, y + dy + 2], [x + sway, y + dy + 3], [x + width / 2 + sway, y + dy]], ink === 'teal' ? 'paper' : 'teal', 1);
  for (const dx of [-width / 2 + 4, width / 2 - 4]) H.line(R, [[x + dx, y - 4], [x + dx, y + 6]], 'coral', 2.3);
}

export default world('tokyo-shiba-rooftop', 'Shiba · The tower beyond the tomatoes', { wall: false, floor: 'paper', tone: 1, head: 20 }, (H, R) => {
  for (let k = 0; k < 6; k++) {
    const i = .35 + k * 1.92, h = .8 + (k % 3) * .28;
    box(H, R, i, .05, 1.6, .35, .08, h, 'teal', .34);
    for (let n = 0; n < 3; n++) shape(H, R, H.faceI(i + .2 + n * .43, .41, .16, .24, .55), 'sun', .75, .4);
  }
  tower(H, R);
  box(H, R, .12, .57, 11.76, .28, .02, .79, 'teal', .43);
  box(H, R, .12, .57, .26, 11.14, .02, .79, 'teal', .35);
  box(H, R, .08, .52, 11.86, .41, .81, .1, 'paper', 1);
  box(H, R, .07, .61, .41, 11.17, .81, .1, 'paper', 1);
  for (const i of [4, 8]) H.line(R, [H.p(i, .95, .025), H.p(i, 11.8, .025)], 'blue', .65, { tone: .33 });
  for (const j of [4.1, 8]) H.line(R, [H.p(.5, j, .025), H.p(11.8, j, .025)], 'blue', .65, { tone: .33 });
  box(H, R, .75, 1.15, 2.45, 2.42, .03, 2.95, 'paper', 1);
  box(H, R, .61, 1.01, 2.73, 2.69, 2.98, .15, 'teal', .6);
  shape(H, R, H.faceI(1.08, 3.59, 1.74, .12, 2.54), 'blue', .59);
  shape(H, R, H.faceI(1.25, 3.62, 1.4, 1.39, 2.27), 'teal', .39);
  H.line(R, [H.p(2.57, 3.64, .89), H.p(2.57, 3.64, 1.15)], 'sun', 2);
  box(H, R, 1.02, 3.61, 1.84, .48, .02, .17, 'teal', .35);
  box(H, R, 3.72, 1.3, 1.75, 1.34, .12, 1.46, 'paper', 1);
  box(H, R, 3.65, 1.23, 1.89, 1.48, 1.58, .13, 'teal', .49);
  for (const i of [4.03, 5.03]) stroke(H, R, [H.p(i, 1.38, .2), H.p(i, 1.38, 1.84), H.p(i + .38, 1.38, 1.84)], 'blue', 2.6);
  box(H, R, 10.03, 1.32, 1.59, .93, .1, 1.05, 'paper', 1);
  for (let k = 0; k < 6; k++) H.line(R, [H.p(10.18, 2.27, .24 + k * .13), H.p(11.45, 2.27, .24 + k * .13)], 'blue', .8, { tone: .6 });
  stroke(H, R, [H.p(11.6, 1.71, .45), H.p(11.78, 1.9, .25), H.p(11.78, 3.1, .07)], 'teal', 2);
  const [ax, ay] = H.p(2.62, 1.54, 3.1);
  stroke(H, R, [[ax, ay], [ax, ay - 53]], 'blue', 1.5);
  H.line(R, [[ax - 31, ay - 39], [ax + 31, ay - 49]], 'blue', 1.4);
  for (let k = 0; k < 6; k++) H.line(R, [[ax - 24 + k * 9, ay - 48 - k * 1.5], [ax - 24 + k * 9, ay - 31 - k * 1.5]], 'blue', .9);
  tomato(H, R, 1.06, 5.02);
  tomato(H, R, 1.06, 7.08, true);
  for (const [i, j, size] of [[1.45, 9.5, .87], [2.57, 9.73, .73], [1.24, 10.8, .66]]) {
    oval(H, R, ...H.p(i, j, .02), 12 * size, 5 * size, 'blue', .33);
    plant(H, R, ...H.p(i, j, .09), size);
  }
  const [rx, ry] = H.p(3.3, 5.35, .31);
  oval(H, R, rx, ry, 16, 17, 'teal', .6);
  for (let k = 0; k < 5; k++) H.outline(R, ell(rx, ry, 13 - k * 2.1, 14 - k * 2.1), 'sun', 1.2);
  stroke(H, R, [[rx + 12, ry + 7], [rx + 24, ry + 22], [rx + 43, ry + 29], [rx + 51, ry + 19]], 'teal', 1.8);
  box(H, R, 3.16, 8.99, 1.03, .69, .04, .22, 'sun', .5);
  box(H, R, 3.2, 9.08, 1.02, .67, .27, .18, 'paper', 1);
  for (const [i, j] of [[4.41, 10.85], [11.18, 3.38]]) {
    shape(H, R, H.tile(i, j, .58, .58, .03), 'blue', .6);
    for (let k = 0; k < 5; k++) H.line(R, [H.p(i + .05 + k * .1, j + .04, .05), H.p(i + .05 + k * .1, j + .54, .05)], 'paper', .7);
  }
  const [sx, sy] = H.p(3.58, 9.4, .47);
  for (const dx of [-4, 4]) oval(H, R, sx + dx, sy, 3, 2, 'coral', .7);
  stroke(H, R, [[sx - 3, sy], [sx + 7, sy - 9]], 'blue', 1.1);
  stroke(H, R, [[sx + 3, sy], [sx - 7, sy - 9]], 'blue', 1.1);
  const [cx, cy] = H.p(10.17, 9.7, .03);
  for (const dx of [-14, 14]) {
    stroke(H, R, [[cx + dx, cy], [cx - dx, cy - 27], [cx - dx, cy - 52]], 'blue', 2);
    stroke(H, R, [[cx - dx, cy], [cx + dx, cy - 28]], 'blue', 2);
  }
  shape(H, R, [[cx - 15, cy - 51], [cx + 15, cy - 51], [cx + 14, cy - 31], [cx - 14, cy - 31]], 'coral', .42);
  shape(H, R, [[cx - 15, cy - 28], [cx + 15, cy - 28], [cx + 21, cy - 18], [cx - 9, cy - 18]], 'coral', .42);
  for (const i of [5.22, 10.3]) box(H, R, i, 7.73, .12, .12, .04, 3.03, 'blue', .6);
  stroke(H, R, [H.p(5.28, 7.79, 2.91), H.p(7.85, 7.79, 2.79), H.p(10.36, 7.79, 2.91)], 'blue', 1);
  box(H, R, 7.87, 10.35, 1.43, 1.07, .06, .45, 'paper', 1);
  for (let k = 0; k < 7; k++) H.line(R, [H.p(7.99 + k * .18, 11.44, .12), H.p(7.99 + k * .18, 11.44, .46)], 'teal', .9);
  for (const z of [.21, .35]) H.line(R, [H.p(7.93, 11.44, z), H.p(9.24, 11.44, z)], 'teal', .8);
  box(H, R, 8.03, 10.57, .88, .54, .47, .16, 'coral', .34);
}, (H, R, t) => {
  const u = cycle(t, 20);
  tower(H, R, .4 + Math.sin(t * .15) * .2);
  box(H, R, 7.11, .57, 3.08, .28, .02, .79, 'teal', .43);
  box(H, R, 7.08, .52, 3.14, .41, .81, .1, 'paper', 1);
  washing(H, R, 9.65, 'teal', t, 24, 36);
  const [sx, sy] = H.p(8.48, 7.77, 2.85);
  const sway = Math.sin(t * .9) * 2;
  shape(H, R, [[sx - 8, sy], [sx - 18, sy + 8], [sx - 14, sy + 18], [sx - 7, sy + 15], [sx - 8 + sway, sy + 37], [sx + 10 + sway, sy + 37], [sx + 9, sy + 15], [sx + 16, sy + 18], [sx + 20, sy + 8], [sx + 8, sy], [sx + 2, sy + 4]], 'coral', .37, .7);
  for (const dx of [-7, 7]) H.line(R, [[sx + dx, sy - 4], [sx + dx, sy + 5]], 'sun', 2.3);
  if (u < .38 || u > .93) washing(H, R, 6.71, 'paper', t);
  actor(H, R, 6.72, 8.9, t, 'tokyoShibaLaundry', {
    shirt: ['teal', .63], pants: ['blue', .63], face: 'nw', hairStyle: 'bun',
    prop: (HH, RR, pts) => {
      if (u < .38 || u > .79) return;
      const [x, y] = pts.nearHand;
      const folded = u > .6, w = folded ? 18 : 29, h = folded ? 15 : 33;
      shape(HH, RR, [[x - w / 2, y - 3], [x + w / 2, y], [x + w / 2, y + h], [x - w / 2, y + h - 3]], 'paper', 1, .7);
      H.line(R, [[x - w / 2, y + h - 7], [x + w / 2, y + h - 4]], 'teal', 1.1);
    },
  }, 0, 1.19);
  if (u > .79 && u < .94) box(H, R, 8.14, 10.62, .82, .48, .64, .12, 'paper', 1);
  actor(H, R, 3.18, 7.61, t, 'water', {
    shirt: ['sun', .54], pants: ['blue', .66], face: 'sw',
    prop: (HH, RR, pts) => {
      const [x, y] = pts.nearHand;
      shape(HH, RR, [[x - 10, y - 4], [x + 9, y - 4], [x + 9, y + 13], [x - 9, y + 13]], 'teal', .7, .7);
      stroke(HH, RR, [[x + 8, y], [x + 15, y - 3], [x + 14, y + 8], [x + 9, y + 9]], 'blue', 1.4);
      stroke(HH, RR, [[x - 8, y + 4], [x - 22, y - 3], [x - 27, y - 2]], 'teal', 3);
      if (u > .07 && u < .76) for (let k = 0; k < 4; k++) stroke(HH, RR, [[x - 28, y - 2], [x - 33 - k * 2, y + 11], [x - 33 - k * 3, y + 23]], 'blue', .65, .55);
    },
  }, 0, 1.15);
  if (u > .07 && u < .76) H.tint(H.tile(1.46, 7.33, .65, .47, .68), 'blue', .26);
});
