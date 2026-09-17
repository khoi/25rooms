import { world, shape, oval, stroke, box, table, actor, cycle, bottle } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const clamp = n => Math.max(0, Math.min(1, n));
const ease = n => { const x = clamp(n); return x * x * (3 - 2 * x); };
const balcony = H => H.faceI(4.96, .045, 6.62, .35, 3.67);

function cup(H, R, i, j, z, glass = false) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 5, y], [x + 5, y], [x + 7, y - 13], [x - 7, y - 13]], glass ? 'teal' : 'paper', glass ? .34 : .96, .65);
  oval(H, R, x, y - 13, 6.5, 2.4, glass ? 'paper' : 'blue', glass ? .8 : .6);
  if (glass) for (let k = 0; k < 4; k++) {
    H.line(R, [[x - 5 + k * 3, y - 1], [x - 1 + k * 3, y - 11]], 'paper', .9);
    H.line(R, [[x - 5 + k * 3, y - 11], [x - 1 + k * 3, y - 1]], 'blue', .5, { tone: .5 });
  }
}

function bag(H, R, i, j, z) {
  box(H, R, i, j, .67, .5, z, .63, 'sun', .5);
  stroke(H, R, [H.p(i + .1, j + .28, z + .63), H.p(i + .3, j + .28, z + .91), H.p(i + .57, j + .28, z + .63)], 'blue', 1.1);
  oval(H, R, ...H.p(i + .28, j + .26, z + .7), 5, 3, 'teal', .68);
}

function balconyFrame(H, R) {
  H.outline(R, balcony(H), 'paper', 3.2);
  for (const i of [5.02, 8.19, 8.36, 11.49]) H.line(R, [H.p(i, .08, .38), H.p(i, .08, 3.64)], 'blue', 2.2);
  H.line(R, [H.p(8.03, .1, 1.62), H.p(8.03, .1, 1.99)], 'sun', 2.3);
  H.line(R, [H.p(8.5, .1, 1.62), H.p(8.5, .1, 1.99)], 'sun', 2.3);
  H.line(R, [H.p(5.04, .1, .51), H.p(11.49, .1, .51)], 'blue', 1.5);
}

function teaPot(H, R, i, j, z, tilt = 0) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y - 7, 10, 10, 'teal', .6);
  shape(H, R, [[x + 7, y - 11], [x + 19, y - 15 + tilt], [x + 13, y - 5], [x + 8, y]], 'teal', .6, .7);
  stroke(H, R, [[x - 8, y - 14], [x - 17, y - 14], [x - 17, y - 3], [x - 8, y]], 'blue', 1.6);
  oval(H, R, x, y - 16, 6, 2.7, 'paper');
  H.dot(x, y - 20, 2.5, 'blue', .8, { knock: true });
}

export default world('tokyo-sangenjaya-home', 'Sangenjaya · The last light at home', { floor: 'paper', tone: .65, wall: 'blue', wallTone: .32, pattern: 'boards', height: 4.35, head: 20 }, (H, R) => {
  shape(H, R, balcony(H), 'blue', .88);
  H.clip(balcony(H), () => {
    for (let k = 0; k < 5; k++) {
      const i = 4.75 + k * 1.5;
      shape(H, R, H.faceI(i, .035, 1.26, .62, 2.82 + k % 2 * .55), k % 2 ? 'teal' : 'blue', .63);
      for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) shape(H, R, H.faceI(i + .16 + c * .55, .04, .32, .94 + r * .68, 1.32 + r * .68), 'blue', .87);
      H.line(R, [H.p(i, .041, .78), H.p(i + 1.26, .041, .78)], 'paper', .8, { tone: .45 });
    }
    box(H, R, 9.98, .06, 1.22, .04, .53, .67, 'paper', .65);
    const [x, y] = H.p(10.58, .105, .87);
    oval(H, R, x, y, 12, 12, 'blue', .5);
    for (let k = 0; k < 6; k++) H.line(R, [[x - 10, y - 8 + k * 3], [x + 10, y - 8 + k * 3]], 'paper', .65);
    H.line(R, [H.p(5.12, .11, 1.05), H.p(11.47, .11, 1.05)], 'teal', 2);
    for (let k = 0; k < 13; k++) H.line(R, [H.p(5.17 + k * .51, .12, .39), H.p(5.17 + k * .51, .12, 1.03)], 'teal', .85);
  });
  balconyFrame(H, R);
  for (const i of [4.58, 11.66]) {
    shape(H, R, H.faceI(i, .18, .35, .39, 3.76), 'paper', .88);
    for (let k = 0; k < 3; k++) H.line(R, [H.p(i + .04 + k * .11, .2, .4), H.p(i + .04 + k * .11, .2, 3.73)], 'blue', .6, { tone: .45 });
  }
  for (const [i, ink] of [[5.4, 'coral'], [6.2, 'teal']]) {
    box(H, R, i, .28, .53, .53, .2, .43, ink, .5);
    for (let k = 0; k < 5; k++) {
      const [x, y] = H.p(i + .12 + k % 3 * .13, .39 + Math.floor(k / 3) * .17, .66);
      stroke(H, R, [[x, y], [x + k - 2, y - 15 - k % 2 * 6]], 'teal', 1);
      oval(H, R, x - 3 + k, y - 10 - k % 2 * 5, 4, 2, 'teal', .7);
    }
  }
  shape(H, R, H.faceI(.43, .12, 2.33, .02, 3.01), 'paper', .88);
  H.outline(R, H.faceI(.59, .14, 2.01, .12, 2.84), 'blue', 1);
  oval(H, R, ...H.p(2.27, .18, 1.36), 3, 3, 'sun');
  shape(H, R, H.faceI(1.05, .17, 1.13, 2.07, 2.55), 'teal', .3);
  for (let k = 0; k < 5; k++) H.line(R, [H.p(.77 + k * .36, .18, .27), H.p(.99 + k * .36, .18, .27)], 'blue', .7);
  box(H, R, 2.97, .12, 1.04, .48, 0, 1.68, 'paper', .84);
  for (let k = 0; k < 4; k++) {
    H.line(R, [H.p(3.04, .62, .22 + k * .35), H.p(3.91, .62, .22 + k * .35)], 'blue', .65);
    H.dot(...H.p(3.76, .64, .37 + k * .35), 1.3, 'coral');
  }
  box(H, R, .2, 2.39, 1.39, 4.08, 0, 1.08, 'paper', .84);
  for (const j of [2.55, 3.8, 5.14]) H.outline(R, H.faceJ(1.61, j, 1.12, .17, .94), 'blue', .7);
  shape(H, R, H.tile(.39, 2.63, 1.02, 1.06, 1.1), 'blue', .7);
  oval(H, R, ...H.p(.91, 3.18, 1.14), 15, 8, 'paper', .75);
  oval(H, R, ...H.p(.91, 3.18, 1.17), 10, 5, 'blue', .72);
  teaPot(H, R, .91, 3.12, 1.24);
  shape(H, R, H.tile(.42, 4.07, .96, 1.04, 1.11), 'teal', .5);
  shape(H, R, H.tile(.54, 4.2, .72, .76, 1.12), 'blue', .6);
  stroke(H, R, [H.p(.44, 4.6, 1.17), H.p(.44, 4.6, 1.72), H.p(.93, 4.6, 1.72), H.p(.93, 4.6, 1.47)], 'blue', 2);
  for (let k = 0; k < 5; k++) H.line(R, [H.p(.47 + k * .19, 5.24, 1.14), H.p(.47 + k * .19, 6.19, 1.14)], 'blue', 1);
  for (let k = 0; k < 3; k++) oval(H, R, ...H.p(.89, 5.37 + k * .25, 1.25), 10, 12, 'paper', .9);
  bottle(H, R, ...H.p(.47, 4.01, 1.16), 'teal', .35);
  box(H, R, .24, 6.73, 1.41, 1.13, 0, 1.92, 'paper');
  H.line(R, [H.p(.3, 7.89, 1.32), H.p(1.59, 7.89, 1.32)], 'blue', 1.1);
  H.line(R, [H.p(1.43, 7.91, .91), H.p(1.43, 7.91, 1.12)], 'teal', 2);
  const [rx, ry] = H.p(.9, 7.3, 1.95);
  oval(H, R, rx, ry - 6, 16, 12, 'paper');
  oval(H, R, rx, ry - 12, 15, 7, 'teal', .45);
  H.line(R, [[rx - 5, ry - 13], [rx + 5, ry - 13]], 'blue', 2);
  H.dot(rx + 9, ry + 1, 1.7, 'coral', 1);
  for (const [j, ink] of [[8.26, 'teal'], [9.13, 'coral']]) {
    box(H, R, .26, j, .75, .69, 0, .71, 'paper');
    box(H, R, .22, j - .02, .82, .74, .71, .09, ink, .6);
  }
  shape(H, R, H.tile(.03, 10.06, 3.1, 1.78, .015), 'teal', .2);
  box(H, R, 3.04, 10.01, .13, 1.84, 0, .17, 'coral', .45);
  for (let k = 0; k < 4; k++) {
    const [x, y] = H.p(1.11 + k % 2 * .37, 10.41 + Math.floor(k / 2) * .62, .08);
    oval(H, R, x, y, 8, 4, k < 2 ? 'blue' : 'paper', .7);
    oval(H, R, x - 3, y - 2, 3.6, 2.2, 'blue', .78);
  }
  box(H, R, 2.47, 10.54, .48, .74, 0, .48, 'teal', .38);
  const [ux, uy] = H.p(2.67, 10.87, .12);
  stroke(H, R, [[ux, uy], [ux - 3, uy - 57], [ux + 3, uy - 63], [ux + 9, uy - 58]], 'blue', 1.7);
  shape(H, R, [[ux - 6, uy - 3], [ux - 8, uy - 48], [ux - 2, uy - 54], [ux + 6, uy - 46], [ux + 4, uy - 3]], 'coral', .74);
  H.line(R, [[ux - 1, uy - 48], [ux + 1, uy - 5]], 'paper', .9);
  box(H, R, 4.19, 3.51, 2.73, 3.69, 0, .18, 'paper');
  box(H, R, 4.25, 3.59, 2.61, 2.68, .18, .15, 'teal', .33);
  for (let k = 0; k < 9; k++) H.line(R, [H.p(4.29 + k * .31, 3.63, .35), H.p(4.29 + k * .31, 6.23, .35)], 'paper', .8);
  box(H, R, 4.55, 3.72, 1.94, .72, .33, .18, 'paper');
  for (let k = 0; k < 6; k++) oval(H, R, ...H.p(4.43 + k * .44, 6.65, .32), 10, 13, 'paper', .9);
  H.line(R, [H.p(4.25, 6.43, .38), H.p(6.86, 6.43, .38)], 'teal', 1.2);
  table(H, R, 8.28, 2.4, 3.02, 1.61, 1.05, 'coral');
  table(H, R, 9.19, 4.66, .93, .88, .49, 'teal');
  box(H, R, 10.81, 2.12, .23, .25, 0, 2.45, 'blue', .65);
  box(H, R, 8.49, 2.11, 2.55, .59, 2.08, .09, 'paper');
  for (let k = 0; k < 6; k++) box(H, R, 8.62 + k * .14, 2.22, .1, .41, 2.18, .52 + k % 3 * .06, ['teal', 'coral', 'paper'][k % 3], .68);
  cup(H, R, 9.85, 2.4, 2.2, true);
  const [bx, by] = H.p(10.46, 2.4, 2.18);
  FIGURES.draw(H, R, { who: 'bird', x: bx, y: by, t: 0, scale: .56, face: 'se', clip: 'sit', opts: { feather: ['teal', .7] } });
  const [lx, ly] = H.p(10.76, 3.43, 1.2);
  oval(H, R, lx, ly, 10, 4, 'blue', .7);
  stroke(H, R, [[lx, ly], [lx - 4, ly - 26], [lx - 17, ly - 38]], 'blue', 2);
  shape(H, R, [[lx - 33, ly - 33], [lx - 22, ly - 47], [lx - 10, ly - 38], [lx - 17, ly - 27]], 'sun', .8);
  H.glow(lx - 20, ly - 18, 51, 31, 'sun', .3);
  box(H, R, 8.54, 3.39, .65, .45, 1.19, .06, 'paper');
  H.line(R, [H.p(8.6, 3.43, 1.26), H.p(9.1, 3.74, 1.26)], 'blue', .8);
  const [hx, hy] = H.p(10.3, 3.58, 1.21);
  stroke(H, R, [[hx - 9, hy], [hx - 8, hy - 12], [hx, hy - 17], [hx + 9, hy - 12], [hx + 9, hy]], 'blue', 2);
  oval(H, R, hx - 9, hy, 3, 5, 'teal'); oval(H, R, hx + 9, hy, 3, 5, 'teal');
  stroke(H, R, [H.p(9.89, 3.78, 1.2), H.p(10.42, 4.12, .31), H.p(10.95, 4.58, .07), H.p(11.38, 3.98, .06)], 'blue', 1);
  table(H, R, 4.54, 8.31, 2.51, 1.46, .43, 'sun');
  cup(H, R, 6.08, 8.83, .58);
  box(H, R, 4.75, 8.51, .82, .77, .58, .09, 'paper');
  H.line(R, [H.p(5.16, 8.53, .69), H.p(5.16, 9.25, .69)], 'blue', .65);
  for (let k = 0; k < 3; k++) H.line(R, [H.p(4.85, 8.66 + k * .14, .69), H.p(5.09, 8.73 + k * .14, .69)], 'teal', .7);
  box(H, R, 7.69, 8.47, 1.03, .76, 0, .12, 'paper');
  shape(H, R, H.tile(7.88, 8.55, .5, .22, .14), 'teal', .48);
  H.line(R, [H.p(8.2, 8.56, .15), H.p(8.2, 9.15, .15)], 'blue', .7);
  box(H, R, 1.96, 7.78, .75, .56, .02, .11, 'paper');
  shape(H, R, H.tile(2.04, 7.86, .59, .4, .14), 'teal', .3);
  box(H, R, .06, 2.9, .52, 2.67, 3.23, .63, 'paper');
  for (let k = 0; k < 8; k++) H.line(R, [H.p(.6, 3.01 + k * .31, 3.34), H.p(.6, 3.2 + k * .31, 3.34)], 'blue', .7);
  const [ax, ay] = H.p(3.36, 1.25, 3.31);
  stroke(H, R, [[ax, ay - 6], [ax + 4, ay - 11], [ax + 8, ay - 6], [ax + 3, ay - 1], [ax - 17, ay + 12], [ax + 21, ay + 12], [ax + 3, ay - 1]], 'blue', .9);
  for (const dx of [-12, 13]) H.line(R, [[ax + dx, ay + 9], [ax + dx, ay + 17]], 'coral', 2.6);
}, (H, R, t) => {
  const u = cycle(t, 24) * 24;
  H.clip(balcony(H), () => {
    for (let k = 0; k < 8; k++) {
      const on = (1 - ease((u - 5 - k * 1.9) / .6)) * ease(u / .9);
      H.opacity(on * .65, () => shape(H, R, H.faceI(5.08 + k % 4 * 1.5, .05, .38, 1.37 + Math.floor(k / 4) * .7, 1.75 + Math.floor(k / 4) * .7), 'sun', .72));
    }
    if (u > 8 && u < 11) {
      const i = 3.65 + (u - 8) * 3.2;
      H.opacity(.28, () => {
        for (let k = 0; k < 5; k++) shape(H, R, H.faceI(i + k * .42, .06, .31, 2.3, 2.44), 'paper', .85);
      });
    }
    for (let k = 0; k < 7; k++) {
      const z = 3.6 - cycle(t + k * .61, 3.1) * 3.2;
      H.line(R, [H.p(5.29 + k * .85, .055, z), H.p(5.27 + k * .85, .055, z - .11)], 'paper', .6, { tone: .38 });
    }
  });
  balconyFrame(H, R);
  const a = ease((u - 1) / 3), b = ease((u - 9) / 4), c = ease((u - 18) / 3);
  const i = 3.39 + a * 2.13 + b * 3.81 - c * 2.12;
  const j = 10.06 - a * 2.24 - b * 2.7 + c * .82;
  const moving = (u > 1 && u < 4) || (u > 9 && u < 13) || (u > 18 && u < 21);
  const opacity = ease(u / .65) * (1 - ease((u - 23) / 1));
  H.opacity(opacity, () => actor(H, R, i, j, t * .55, moving ? 'walk' : u < 1 || u >= 5 && u < 8 ? 'water' : u >= 14 && u < 18 ? 'hold' : 'idle', { shirt: ['teal', .61], pants: ['blue', .68], face: u >= 18 ? 'nw' : u > 10 ? 'ne' : 'nw' }, 0, 1.23));
  bag(H, R, 3.6, 10.16, .02 + (1 - ease((u - .3) / .7)) * .36);
  const pouring = ease((u - 5) / .9) * (1 - ease((u - 7.1) / .9));
  teaPot(H, R, 5.39 + pouring * .16, 8.66, .62 + pouring * .27, pouring * 3);
  if (pouring > .3) stroke(H, R, [H.p(5.99, 8.67, .91), H.p(6.04, 8.78, .65)], 'sun', 1);
  const lid = 1 - ease((u - 15.3) / 1.2);
  box(H, R, 9.08, 2.96, 1.22, .74, 1.2, .045, 'blue', .75);
  shape(H, R, [H.p(9.08, 2.96, 1.26), H.p(10.3, 2.96, 1.26), H.p(10.3, 2.96 + (1 - lid) * .7, 1.26 + lid * .74), H.p(9.08, 2.96 + (1 - lid) * .7, 1.26 + lid * .74)], 'teal', .47);
  if (lid > .2) H.line(R, [H.p(9.38, 3, 1.52), H.p(10.01, 3, 1.52)], 'paper', .8, { tone: .6 });
  const [sx, sy] = H.p(6.08, 8.83, .99);
  if (u > 6) for (let k = 0; k < 2; k++) {
    const p = cycle(t + k * 1.5, 4);
    H.opacity(Math.sin(p * Math.PI) * .36, () => stroke(H, R, [[sx + k * 5, sy - p * 18], [sx + k * 5 - 3, sy - p * 18 - 7], [sx + k * 5 + 2, sy - p * 18 - 13]], 'paper', 1));
  }
});
