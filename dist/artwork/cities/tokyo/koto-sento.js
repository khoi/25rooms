import { world, shape, oval, stroke, box, table, bench, actor, bottle, steam, cycle, TAU } from '../../worlds/common.js';
import { FIGURES, loop, ell } from '../../drawings.js';

const seated = FIGURES.sample('sit', 0);
FIGURES.clips.tokyoSentoRinse = {
  dur: 18,
  keys: [[0, { ar: 35, er: 50 }], [.18, { ar: 35, er: 50 }], [.31, { ar: 146, er: 40, head: 12 }], [.46, { ar: 151, er: 28, head: 15 }], [.61, { ar: 48, er: 20 }], [.76, { ar: 35, er: 50 }], [1, { ar: 35, er: 50 }]].map(([u, pose]) => [u, { ...seated, lean: -6, ...pose }]),
};

function towel(H, R, i, j, z, ink = 'paper') {
  box(H, R, i, j, .71, .46, z, .1, ink, ink === 'paper' ? 1 : .45);
  for (const off of [.07, .14]) H.line(R, [H.p(i + .04, j + off, z + .11), H.p(i + .67, j + off, z + .11)], 'teal', .8);
}

function basin(H, R, x, y, size = 1, tilt = 0) {
  const top = [[x - 10 * size, y - 8 * size + tilt], [x + 10 * size, y - 8 * size - tilt], [x + 7 * size, y + 2 * size], [x - 7 * size, y + 2 * size]];
  shape(H, R, top, 'sun', .56, .7);
  oval(H, R, x, y - 8 * size, 10 * size, 3.8 * size, 'paper', 1);
  oval(H, R, x, y - 8 * size, 7.4 * size, 2.5 * size, 'teal', .27);
}

function bathEdge(H, R) {
  for (const [i, j, w, d] of [[3.1, 1.1, 8.4, .28], [3.1, 1.1, .28, 3.7], [11.22, 1.1, .28, 3.7], [3.1, 4.53, 8.4, .28]]) box(H, R, i, j, w, d, .02, .63, 'paper', 1);
  for (let k = 0; k < 16; k++) H.line(R, [H.p(3.15 + k * .52, 4.83, .1), H.p(3.15 + k * .52, 4.83, .65)], 'teal', .65, { tone: .6 });
}

function bathingRoutines(H, R) {
  box(H, R, 4.08, 5.73, 1.94, .48, .04, 1.76, 'teal', .35);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(4.15 + k * .47, 6.23, .08), H.p(4.15 + k * .47, 6.23, 1.76)], 'blue', .65, { tone: .45 });
  for (let z = .18; z < 1.77; z += .32) H.line(R, [H.p(4.11, 6.23, z), H.p(5.98, 6.23, z)], 'blue', .55, { tone: .4 });
  shape(H, R, H.faceI(4.31, 6.25, 1.42, .86, 1.63), 'paper', 1);
  H.tint(H.faceI(4.34, 6.26, 1.36, .9, 1.59), 'blue', .18);
  box(H, R, 4.11, 6.21, 1.88, .4, .64, .09, 'paper', 1);
  for (const i of [4.43, 5.23]) {
    const [x, y] = H.p(i, 6.43, .93);
    stroke(H, R, [[x - 3, y - 4], [x - 3, y + 5], [x + 5, y + 7]], 'blue', 2);
    H.line(R, [[x - 7, y - 4], [x + 2, y - 4]], i < 5 ? 'coral' : 'teal', 2.5);
  }
  table(H, R, 4.71, 7.02, .72, .64, .31, 'teal');
  basin(H, R, ...H.p(5.76, 7.26, .04), .92);
  for (let k = 0; k < 3; k++) bottle(H, R, ...H.p(4.3 + k * .27, 6.5, .78), ['teal', 'coral', 'sun'][k], .26 + k * .04);
  const [sx, sy] = H.p(5.61, 6.46, .81);
  oval(H, R, sx, sy, 6, 3, 'paper', 1);
  oval(H, R, sx, sy - 2, 4, 2, 'coral', .6);
  box(H, R, 3.51, 8.82, 2.78, 2.7, .01, .58, 'paper', 1);
  shape(H, R, H.tile(3.77, 9.08, 2.26, 2.18, .6), 'teal', .65);
  for (let k = 0; k < 6; k++) H.line(R, [H.p(3.6 + k * .45, 11.54, .03), H.p(3.6 + k * .45, 11.54, .58)], 'teal', .9);
  for (let k = 0; k < 5; k++) H.line(R, [H.p(6.31, 8.91 + k * .48, .03), H.p(6.31, 8.91 + k * .48, .58)], 'teal', .9);
  stroke(H, R, [H.p(5.67, 8.77, .07), H.p(5.67, 8.77, 1.01), H.p(5.67, 9.42, 1.01), H.p(5.67, 9.55, .6)], 'blue', 2.5);
  towel(H, R, 3.83, 8.84, .62);
  bench(H, R, .61, 10.37, 2.18, 'paper');
  for (let k = 0; k < 3; k++) towel(H, R, .77 + k * .57, 10.58, .72, k % 2 ? 'coral' : 'paper');
  for (const j of [9.73, 10.24, 10.75]) basin(H, R, ...H.p(.48, j, .07), .68);
  box(H, R, 2.06, 9.53, .64, .53, .03, .74, 'teal', .43);
  for (let k = 0; k < 2; k++) bottle(H, R, ...H.p(2.22 + k * .24, 9.86, .79), k ? 'sun' : 'coral', .39);
  const [hx, hy] = H.p(2.73, 9.84, .08);
  H.line(R, [[hx, hy], [hx - 12, hy - 61]], 'sun', 1.8);
  for (let k = 0; k < 7; k++) H.line(R, [[hx - 8 + k * 2.6, hy], [hx - 12 + k * 3.5, hy + 8]], 'paper', 1.5);
  box(H, R, 6.69, 8.51, .13, 2.6, .03, 1.89, 'sun', .4);
  for (let k = 0; k < 15; k++) H.line(R, [H.p(6.84, 8.57 + k * .17, .09), H.p(6.84, 8.57 + k * .17, 1.89)], 'coral', .75);
  table(H, R, 7.12, 10.62, .74, .83, .85, 'sun');
  shape(H, R, H.faceJ(7.08, 10.56, .98, 1.05, 2.14), 'paper', 1);
  H.tint(H.faceJ(7.1, 10.63, .84, 1.14, 2.06), 'teal', .23);
  const [dx, dy] = H.p(7.59, 11.05, 1.08);
  oval(H, R, dx, dy, 7, 5, 'coral', .55);
  stroke(H, R, [[dx + 1, dy + 2], [dx + 5, dy + 12]], 'coral', 4);
  stroke(H, R, [[dx + 4, dy + 13], [dx + 13, dy + 21], [dx + 4, dy + 29], [dx + 13, dy + 36]], 'blue', .8);
  bottle(H, R, ...H.p(7.38, 10.92, 1), 'teal', .28);
  for (let k = 0; k < 5; k++) {
    const i = 8.39 + k * .55;
    box(H, R, i, 7.26, .47, .38, 2.15, .24, 'paper', 1);
    for (let n = 0; n < 3; n++) H.line(R, [H.p(i + .05 + n * .14, 7.66, 2.18), H.p(i + .05 + n * .14, 7.66, 2.36)], 'coral', .65);
  }
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(8.36 + k * .38, 8.13, .12);
    shape(H, R, [[x - 6, y], [x + 6, y], [x + 4, y - 18], [x - 4, y - 18]], ['coral', 'teal', 'sun'][k], .48);
    stroke(H, R, [[x - 3, y - 18], [x - 3, y - 25], [x + 3, y - 25], [x + 4, y - 18]], 'blue', .7);
  }
  for (const [i, j] of [[10.84, 11.23], [11.2, 11.23], [8.21, 11.41], [8.54, 11.41]]) {
    oval(H, R, ...H.p(i, j, .06), 7, 3, 'coral', .6);
    oval(H, R, ...H.p(i + .03, j, .1), 3.5, 1.8, 'paper', 1);
  }
}

export default world('tokyo-koto-sento', 'Koto · The neighborhood unwinds', { wall: false, floor: 'teal', tone: .19, pattern: 'tiles', accent: 'teal', head: 20 }, (H, R) => {
  shape(H, R, H.faceI(.1, .1, 11.8, 0, 4.55), 'paper', 1);
  shape(H, R, H.faceJ(.1, .1, 9.75, 0, 2.85), 'teal', .24);
  for (let j = .2; j < 9.8; j += .55) H.line(R, [H.p(.12, j, .05), H.p(.12, j, 2.8)], 'blue', .6, { tone: .34 });
  for (let z = .15; z < 2.85; z += .45) H.line(R, [H.p(.12, .1, z), H.p(.12, 9.82, z)], 'blue', .6, { tone: .34 });
  for (const i of [.18, 2.42, 11.64]) box(H, R, i, .1, .18, .21, 1.88, 2.59, 'teal', .42);
  box(H, R, .11, .13, 11.73, .24, 4.38, .16, 'blue', .6);
  for (let k = 0; k < 4; k++) {
    const j = .39 + k * 2.22;
    shape(H, R, H.faceJ(.14, j, 1.86, 2.02, 2.76), 'blue', .55);
    shape(H, R, H.faceJ(.19, j + .1, 1.66, 2.13, 2.66), 'paper', 1);
    for (const off of [.64, 1.23]) H.line(R, [H.p(.22, j + off, 2.1), H.p(.22, j + off, 2.68)], 'teal', 1.5);
    box(H, R, .12, j - .04, .31, 1.95, 1.97, .1, 'paper', 1);
  }
  const mural = H.faceI(2.5, .13, 9.1, 1.92, 4.32);
  shape(H, R, mural, 'teal', .23);
  H.clip(mural, () => {
    shape(H, R, [H.p(3.3, .16, 2.45), H.p(6.85, .16, 4.05), H.p(7.65, .16, 4.05), H.p(10.98, .16, 2.45)], 'blue', .67);
    shape(H, R, [H.p(5.56, .17, 3.49), H.p(6.85, .17, 4.05), H.p(7.65, .17, 4.05), H.p(8.92, .17, 3.46), H.p(8.11, .17, 3.56), H.p(7.72, .17, 3.37), H.p(7.05, .17, 3.66), H.p(6.25, .17, 3.48)], 'paper', 1);
    for (let row = 0; row < 4; row++) {
      const points = [];
      for (let k = 0; k < 41; k++) points.push(H.p(2.4 + k * .24, .18, 2.04 + row * .13 + Math.sin(k * .68 + row) * .09));
      stroke(H, R, points, row % 2 ? 'paper' : 'blue', 1.3, .65);
    }
  });
  H.outline(R, mural, 'blue', 1);
  for (let i = .2; i < 11.9; i += .5) H.line(R, [H.p(i, .2, .1), H.p(i, .2, 1.82)], 'teal', .7, { tone: .45 });
  for (let z = .2; z < 1.9; z += .4) H.line(R, [H.p(.2, .2, z), H.p(11.8, .2, z)], 'teal', .7, { tone: .45 });
  box(H, R, 3.1, 1.1, 8.4, 3.7, 0, .18, 'blue', .53);
  shape(H, R, H.tile(3.38, 1.38, 7.84, 3.15, .42), 'teal', .51);
  bathEdge(H, R);
  box(H, R, 7.22, .27, .97, .63, .04, 1.54, 'teal', .4);
  shape(H, R, H.faceI(7.37, .92, .67, .22, 1.41), 'paper', 1);
  stroke(H, R, [H.p(7.71, .96, 1.32), H.p(7.71, 1.39, 1.32), H.p(7.71, 1.47, 1.06)], 'blue', 4);
  for (let n = 0; n < 3; n++) H.line(R, [H.p(7.67 + n * .045, 1.48, 1.06), H.p(7.67 + n * .045, 1.51, .44)], 'paper', 1.2);
  oval(H, R, ...H.p(7.71, 1.57, .44), 13, 4, 'paper', .65);
  for (const i of [3.55, 10.91]) {
    stroke(H, R, [H.p(i, 4.89, .06), H.p(i, 4.89, 1.16), H.p(i, 4.38, 1.16), H.p(i, 4.15, .66)], 'blue', 3);
    for (const j of [4.24, 4.87]) oval(H, R, ...H.p(i, j, .66), 5, 2, 'paper', 1);
  }
  for (let n = 0; n < 16; n++) {
    const i = 3.28 + n * .5;
    shape(H, R, H.tile(i, 4.61, .44, .14, .66), n === 4 ? 'coral' : 'teal', n === 4 ? .35 : .25, .5);
  }
  towel(H, R, 10.38, 1.16, .66);
  towel(H, R, 4.2, 1.15, .66, 'coral');
  const [tx, ty] = H.p(11.55, .2, 1.75);
  shape(H, R, [[tx - 3, ty - 19], [tx + 3, ty - 19], [tx + 3, ty + 9], [tx - 3, ty + 9]], 'paper', 1, .6);
  H.line(R, [[tx, ty + 6], [tx, ty - 9]], 'coral', 1.4);
  for (let k = 0; k < 6; k++) H.line(R, [[tx - 2, ty - 14 + k * 4], [tx, ty - 14 + k * 4]], 'blue', .5);
  for (const j of [3.82, 5.96, 8.08]) {
    const mirror = H.faceJ(.15, j, 1.15, 1.04, 2.18);
    shape(H, R, mirror, 'paper', 1);
    H.tint(mirror, 'blue', .15);
    H.line(R, [H.p(.18, j + .17, 1.19), H.p(.18, j + .83, 1.95)], 'paper', 2.2);
    box(H, R, .12, j - .06, .64, 1.28, .69, .09, 'paper', 1);
    for (const off of [.35, .82]) {
      const [x, y] = H.p(.4, j + off, .89);
      stroke(H, R, [[x - 2, y - 7], [x - 2, y + 1], [x + 5, y + 3]], 'blue', 2.2);
      H.line(R, [[x - 5, y - 7], [x + 3, y - 7]], off < .5 ? 'coral' : 'teal', 2.3);
    }
    const [hx, hy] = H.p(.2, j + 1.13, 1.29);
    stroke(H, R, [[hx, hy], [hx + 16, hy + 29], [hx + 6, hy + 43], [hx - 2, hy + 19]], 'blue', 1.2);
    oval(H, R, hx, hy - 2, 4.5, 2.4, 'paper', 1);
    table(H, R, 1.37, j + .17, .65, .63, .3, 'sun');
    if (j !== 5.96) basin(H, R, ...H.p(1.45, j + 1.05, .03), .83);
    for (let k = 0; k < 3; k++) bottle(H, R, ...H.p(.48, j + .18 + k * .28, .8), ['coral', 'teal', 'sun'][k], .22 + k * .06);
  }
  box(H, R, 2.61, 3.7, .21, 5.95, .01, .015, 'blue', .5);
  for (let k = 0; k < 24; k++) H.line(R, [H.p(2.62, 3.75 + k * .24, .04), H.p(2.81, 3.75 + k * .24, .04)], 'paper', .7);
  const [hx, hy] = H.p(.8, 2.28, .68);
  for (let k = 0; k < 4; k++) H.outline(R, ell(hx, hy, 13 - k * 2, 16 - k * 2.3), 'teal', 1.7);
  stroke(H, R, [[hx + 12, hy], [hx + 16, hy + 17], [hx + 24, hy + 25]], 'teal', 1.7);
  shape(H, R, H.tile(7.25, 6.91, 4.45, 4.79, .05), 'sun', .27);
  for (let j = 7; j < 11.8; j += .36) H.line(R, [H.p(7.3, j, .06), H.p(11.7, j, .06)], 'blue', .5, { tone: .35 });
  box(H, R, 7.12, 6.75, 4.58, .17, .02, .93, 'sun', .43);
  for (let k = 0; k < 4; k++) {
    const i = 8.31 + k * .78;
    box(H, R, i, 7.1, .72, .65, .07, 2.05, 'sun', .4);
    for (let row = 0; row < 2; row++) {
      H.outline(R, H.faceI(i + .07, 7.76, .58, .18 + row * .95, 1.04 + row * .95), 'blue', .7);
      H.dot(...H.p(i + .53, 7.79, .52 + row * .95), 1.6, 'coral', .8);
      for (let n = 0; n < 3; n++) H.line(R, [H.p(i + .17, 7.8, .81 + row * .95 - n * .075), H.p(i + .46, 7.8, .81 + row * .95 - n * .075)], 'blue', .55);
    }
  }
  for (const i of [8.34, 10.93]) box(H, R, i, 9.23, .16, .66, .06, .48, 'blue', .6);
  for (let k = 0; k < 4; k++) box(H, R, 8.25, 9.18 + k * .2, 2.9, .15, .55, .12, 'sun', .5);
  box(H, R, 8.35, 9.2, 2.67, .64, .12, .08, 'teal', .5);
  for (const i of [8.48, 9.38, 10.28]) {
    box(H, R, i, 9.31, .69, .47, .22, .2, 'paper', 1);
    H.line(R, [H.p(i + .12, 9.81, .32), H.p(i + .57, 9.81, .32)], 'coral', 1);
  }
  for (const i of [8.37, 10.15]) {
    box(H, R, i, 10.27, .89, .78, .09, .36, 'paper', 1);
    for (let k = 0; k < 5; k++) H.line(R, [H.p(i + .08 + k * .16, 11.06, .17), H.p(i + .08 + k * .16, 11.06, .41)], 'coral', .55);
    towel(H, R, i + .05, 10.35, .45, i < 9 ? 'teal' : 'paper');
  }
  box(H, R, 10.85, 5.07, .93, 1.18, .02, 1.56, 'paper', 1);
  shape(H, R, H.faceI(10.94, 6.26, .75, .41, 1.41), 'blue', .65);
  for (const z of [.46, .88, 1.28]) box(H, R, 10.97, 5.71, .66, .53, z, .04, 'paper', 1);
  for (let n = 0; n < 3; n++) bottle(H, R, ...H.p(11.06 + n * .22, 6.23, .95), n === 1 ? 'coral' : 'teal', .23);
  H.line(R, [H.p(11.03, 6.28, .68), H.p(11.48, 6.28, 1.31)], 'paper', 1.2);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(10.98 + n * .13, 6.27, .13), H.p(10.98 + n * .13, 6.27, .3)], 'blue', .9);
  for (let k = 0; k < 3; k++) bottle(H, R, ...H.p(11.06 + k * .24, 6.27, .5), ['sun', 'coral', 'paper'][k], .24);
  H.line(R, [H.p(11.65, 6.29, .65), H.p(11.65, 6.29, 1.19)], 'blue', 1.7);
  const [cx, cy] = H.p(1.64, .18, 3.26);
  oval(H, R, cx, cy, 16, 16, 'paper', 1);
  for (let k = 0; k < 12; k++) H.dot(cx + Math.sin(k * TAU / 12) * 12, cy - Math.cos(k * TAU / 12) * 12, .9, 'blue');
  stroke(H, R, [[cx, cy - 8], [cx, cy], [cx + 6, cy + 4]], 'blue', 1.2);
  box(H, R, 9.1, 11.18, 1.59, .64, .04, .68, 'sun', .43);
  for (let k = 0; k < 3; k++) {
    shape(H, R, H.faceI(9.19 + k * .49, 11.83, .41, .16, .6), 'blue', .53);
    oval(H, R, ...H.p(9.38 + k * .49, 11.86, .25), 5, 2.5, 'coral', .7);
  }
  bathingRoutines(H, R);
}, (H, R, t) => {
  const u = cycle(t, 18);
  actor(H, R, 1.77, 4.36, t + 3, 'tokyoSentoRinse', { shirt: ['coral', .3], pants: ['paper', 1], skin: ['coral', .3], sleeve: ['coral', .3], face: 'nw' }, .29, 1.1);
  actor(H, R, 5.1, 7.43, t, 'sit', { shirt: ['coral', .28], pants: ['paper', 1], skin: ['coral', .28], sleeve: ['coral', .28], face: 'nw', prop: (HH, RR, pts) => {
    const [x, y] = pts.nearHand;
    oval(HH, RR, x - 1, y + Math.sin(t * 2) * 2, 5, 3, 'paper', 1);
    for (let k = 0; k < 3; k++) H.dot(x - 5 + k * 4, y - 3 - Math.sin(t * 1.5 + k) * 3, 1.4, 'paper', 1, { knock: true });
  } }, .3, 1.12);
  actor(H, R, 10.76, 8.63, t, 'hold', { shirt: ['teal', .45], pants: ['blue', .56], face: 'sw', prop: (HH, RR, pts) => {
    const [x, y] = pts.nearHand;
    shape(HH, RR, [[x - 12, y - 3], [x + 10, y - 3], [x + 9, y + 16], [x - 11, y + 14]], 'paper', 1, .65);
    H.line(R, [[x - 10, y + 10], [x + 9, y + 12]], 'teal', 1.2);
  } }, .05, 1.13);
  H.clip(H.tile(3.78, 9.09, 2.24, 2.16, .61), () => {
    for (let k = 0; k < 3; k++) {
      const f = cycle(t + k * 1.4, 4.2);
      H.opacity(1 - f, () => H.outline(R, ell(...H.p(4.85, 10.16, .64), 5 + f * 46, 3 + f * 18), 'paper', .8));
    }
  });
  const [bx, by] = H.p(4.8, 9.94, .65);
  shape(H, R, loop([[bx - 16, by + 2], [bx - 14, by - 10], [bx - 5, by - 14], [bx + 8, by - 14], [bx + 17, by], [bx + 11, by + 4]], 1), 'coral', .27);
  oval(H, R, bx, by - 20, 7, 8, 'coral', .28);
  shape(H, R, loop([[bx - 7, by - 19], [bx - 8, by - 28], [bx + 1, by - 31], [bx + 7, by - 26], [bx + 6, by - 23]], 1), 'blue', .7, .6);
  H.line(R, [[bx + 1, by - 19], [bx + 4, by - 19]], 'blue', .65);
  stroke(H, R, [[bx - 21, by + 1], [bx, by + 5], [bx + 23, by]], 'paper', 1.2);
  H.clip(H.tile(3.4, 1.39, 7.8, 3.12, .43), () => {
    for (let k = 0; k < 4; k++) {
      const f = cycle(t + k * 1.4, 5.6);
      H.opacity((1 - f) * .62, () => H.outline(R, ell(...H.p(8.2, 3.2, .45), 9 + f * 96, 4 + f * 37), 'paper', .9));
    }
    const [x, y] = H.p(8.2, 3.22, .43);
    shape(H, R, loop([[x - 21, y + 4], [x - 18, y - 10], [x - 8, y - 16], [x + 8, y - 16], [x + 20, y - 8], [x + 22, y + 4]], 1), 'coral', .29);
    oval(H, R, x, y - 24, 8, 9, 'coral', .3);
    shape(H, R, loop([[x - 8, y - 23], [x - 8, y - 33], [x + 3, y - 36], [x + 8, y - 30], [x + 7, y - 27], [x - 2, y - 30]], 1), 'blue', .77, .6);
    H.line(R, [[x + 1, y - 22], [x + 5, y - 22]], 'blue', .7);
    H.line(R, [[x + 1, y - 18], [x + 4, y - 17]], 'blue', .6);
    stroke(H, R, [[x - 25, y + 2], [x, y + 6], [x + 25, y + 1]], 'paper', 1.2);
  });
  actor(H, R, 1.8, 6.43, t, 'tokyoSentoRinse', {
    shirt: ['coral', .3], pants: ['paper', 1], skin: ['coral', .3], sleeve: ['coral', .3], face: 'nw',
    prop: (HH, RR, pts) => {
      const [x, y] = pts.nearHand;
      basin(HH, RR, x, y - 1, .76, u > .31 && u < .47 ? 3 : 0);
      if (u > .32 && u < .48) {
        const [hx, hy] = pts.head;
        for (let k = 0; k < 4; k++) stroke(HH, RR, [[x - 6 + k * 2, y], [hx - 6 + k * 3, hy + 9], [hx - 7 + k * 3, hy + 24]], 'teal', .85, .6);
      }
    },
  }, .29, 1.14);
  towel(H, R, 1.72, 6.55, .41);
  actor(H, R, 9.1, 9.63, t, 'drink', {
    shirt: ['coral', .52], pants: ['blue', .57], face: 'se',
    prop: (HH, RR, pts) => {
      const [x, y] = pts.nearHand;
      bottle(HH, RR, x, y + 6, 'sun', .27);
    },
  }, .55, 1.14);
  const [fx, fy] = H.p(7.73, 8.33, .08);
  oval(H, R, fx, fy, 15, 5, 'teal', .5);
  stroke(H, R, [[fx, fy - 2], [fx, fy - 53]], 'blue', 3);
  oval(H, R, fx, fy - 64, 19, 19, 'paper', 1);
  for (let k = 0; k < 3; k++) {
    const a = t * 5 + k * TAU / 3;
    shape(H, R, loop([[fx, fy - 64], [fx + Math.cos(a) * 15, fy - 64 + Math.sin(a) * 15], [fx + Math.cos(a + .85) * 14, fy - 64 + Math.sin(a + .85) * 14]], 1), 'teal', .45, .5);
  }
  for (const r of [7, 13, 18]) H.outline(R, ell(fx, fy - 64, r, r), 'blue', .55, { tone: .55 });
  for (let k = 0; k < 8; k++) H.line(R, [[fx, fy - 64], [fx + Math.cos(k * TAU / 8) * 18, fy - 64 + Math.sin(k * TAU / 8) * 18]], 'blue', .55, { tone: .5 });
  H.dot(fx, fy - 64, 3, 'sun', .75, { knock: true });
  steam(H, R, ...H.p(6.5, 2.5, .69), t * .43, 3);
});
