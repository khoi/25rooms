import { world, shape, oval, stroke, box, table, actor, bottle, lantern, cycle, TAU } from '../../worlds/common.js';
import { FIGURES, loop, ell } from '../../drawings.js';

const sitting = FIGURES.sample('sitfloor', 0);
FIGURES.clips.tokyoRiverWatch = {
  dur: 22,
  keys: [[0, { head: 4 }], [.58, { head: 4 }], [.67, { head: -24, lean: 8 }], [.81, { head: -24, lean: 8 }], [.91, { head: 4 }], [1, { head: 4 }]].map(([u, pose]) => [u, { ...sitting, ...pose }]),
};

function bowl(H, R, i, j, z, ink = 'teal', size = 1) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, loop([[x - 7 * size, y - 3], [x + 7 * size, y - 3], [x + 5 * size, y + 4 * size], [x - 4 * size, y + 4 * size]], 1), ink, .65, .6);
  oval(H, R, x, y - 3, 7 * size, 2.6 * size, 'paper', 1);
  oval(H, R, x, y - 3, 4.5 * size, 1.6 * size, 'sun', .4);
}

function meal(H, R, i, j) {
  box(H, R, i, j, 1.4, 1.2, .94, .04, 'coral', .65);
  H.outline(R, H.tile(i + .08, j + .08, 1.24, 1.04, .99), 'sun', .7);
  const [x, y] = H.p(i + .65, j + .46, 1.03);
  oval(H, R, x, y, 15, 7, 'sun', .48);
  for (let k = -2; k <= 2; k++) stroke(H, R, [[x - 11, y + k * 1.7], [x + 12, y + k * 1.7]], 'coral', .55, .6);
  for (let k = 0; k < 3; k++) {
    stroke(H, R, [[x - 8 + k * 6, y], [x - 4 + k * 6, y - 7]], 'sun', 4.3);
    stroke(H, R, [[x - 5 + k * 6, y - 5], [x - 3 + k * 6, y - 9]], 'coral', 2);
  }
  bowl(H, R, i + 1.02, j + .88, 1.04, 'blue', .55);
  bowl(H, R, i + .21, j + .97, 1.06, 'teal', .43);
  for (const off of [0, .07]) H.line(R, [H.p(i + .17, j + 1.05 + off, 1.07), H.p(i + .94, j + 1.05 + off, 1.07)], 'sun', 1.2);
  box(H, R, i + .31, j + 1.02, .11, .18, 1.01, .05, 'paper', 1);
}

function cabinWindows(H, R) {
  for (let k = 0; k < 4; k++) {
    const i = 1.28 + k * 2.15;
    shape(H, R, H.faceI(i, 1.92, 1.93, 1.43, 3.11), 'blue', .8);
    H.tint(H.faceI(i, 1.93, 1.93, 1.43, 2.08), 'teal', .32);
    H.line(R, [H.p(i + .93, 1.94, 1.43), H.p(i + .93, 1.94, 3.11)], 'sun', 2);
    for (let n = 0; n < 6; n++) H.line(R, [H.p(i, 1.97, 3.16 - n * .048), H.p(i + 1.93, 1.97, 3.16 - n * .048)], 'sun', 1, { tone: .65 });
    stroke(H, R, [H.p(i + 1.74, 2, 3.14), H.p(i + 1.74, 2, 2.65), H.p(i + 1.67, 2, 2.61)], 'paper', .6);
  }
}

export default world('tokyo-sumida-yakatabune', 'Sumida · Lanterns on the river', { wall: false, floor: 'blue', tone: .78, head: 20 }, (H, R) => {
  for (let k = 0; k < 24; k++) {
    const i = .4 + R() * 11, j = R() < .5 ? .2 + R() : 11.2 + R() * .6;
    H.line(R, [H.p(i, j, .03), H.p(i + .3 + R() * .4, j, .03)], k % 3 ? 'teal' : 'coral', 1.6, { tone: .65 });
  }
  const deck = [H.p(.7, 1.5, .4), H.p(10.35, 1.5, .4), H.p(11.55, 3.1, .4), H.p(11.6, 8.8, .4), H.p(10.35, 10.9, .4), H.p(1.45, 10.9, .4), H.p(.7, 9.7, .4)];
  shape(H, R, deck, 'sun', .35);
  H.clip(deck, () => {
    for (let i = 1; i < 11; i += .42) H.line(R, [H.p(i, 1.5, .42), H.p(i, 11, .42)], 'blue', .55, { tone: .45 });
  });
  box(H, R, 1.03, 1.56, 8.95, .28, .4, 3.08, 'sun', .38);
  cabinWindows(H, R);
  for (const i of [1.03, 3.16, 5.31, 7.46, 9.72]) box(H, R, i, 1.73, .15, .2, .47, 2.98, 'coral', .46);
  box(H, R, .89, 1.53, 9.28, .63, 3.47, .15, 'teal', .6);
  shape(H, R, H.tile(1.48, 2.35, 7.68, 7.2, .44), 'sun', .24);
  for (let col = 0; col < 3; col++) for (let row = 0; row < 2; row++) {
    const i = 1.48 + col * 2.56, j = 2.35 + row * 3.6;
    H.outline(R, H.tile(i, j, 2.56, 3.6, .45), 'teal', 2.3);
    for (let n = 0; n < 21; n++) H.line(R, [H.p(i + .09, j + n * .17, .46), H.p(i + 2.45, j + n * .17, .46)], 'blue', .45, { tone: .26 });
  }
  for (const [i, j] of [[2.25, 4.6], [5.55, 6.9]]) {
    table(H, R, i, j, 3, 1.65, .81, 'coral');
    meal(H, R, i + .09, j + .1);
    meal(H, R, i + 1.52, j + .1);
  }
  for (const [i, j, ink] of [[2.6, 3.15, 'teal'], [4.05, 3.15, 'blue'], [5.7, 8.96, 'teal'], [7.5, 8.96, 'blue']]) {
    box(H, R, i, j, 1.05, .9, .47, .13, ink, .56);
    H.outline(R, H.tile(i + .1, j + .1, .85, .7, .61), 'paper', .6, { tone: .7 });
  }
  table(H, R, 9.57, 3.18, 1.3, 2.5, 1.08, 'sun');
  for (let k = 0; k < 4; k++) {
    bowl(H, R, 10, 3.55 + k * .45, 1.29, 'paper', .58);
    box(H, R, 10.44, 3.45 + k * .47, .31, .28, 1.22, .1, 'paper', 1);
  }
  const [bx, by] = H.p(9.98, 5.16, 1.2);
  shape(H, R, [[bx - 13, by - 19], [bx + 13, by - 19], [bx + 10, by], [bx - 10, by]], 'teal', .56);
  oval(H, R, bx, by - 19, 13, 5, 'paper', 1);
  bottle(H, R, bx - 4, by - 15, 'blue', .45);
  bottle(H, R, bx + 6, by - 14, 'coral', .42);
  box(H, R, 9.55, 7.76, 1.08, .85, .44, 1.34, 'sun', .45);
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(9.76 + k * .25, 8.64, 1.5);
    shape(H, R, [[x - 6, y - 6], [x - 3, y - 12], [x + 3, y - 12], [x + 6, y - 6], [x + 6, y + 18], [x + 1, y + 18], [x, y + 1], [x - 1, y + 18], [x - 6, y + 18]], 'coral', .78, .65);
    H.line(R, [[x - 6, y + 6], [x + 6, y + 6]], 'paper', 1.5);
  }
  box(H, R, 8.88, 9.82, 1.75, .86, .43, .35, 'blue', .55);
  for (let k = 0; k < 4; k++) {
    const i = 9.02 + k * .37;
    shape(H, R, H.faceI(i, 10.69, .31, .5, .71), 'paper', 1);
    oval(H, R, ...H.p(i + .14, 10.72, .56), 4.3, 2.4, 'coral', .6);
  }
  for (let k = 0; k < 5; k++) H.outline(R, ell(...H.p(1.51, 10.14, .45 + k * .025), 18 - k * 2, 7 - k * .6), 'sun', 1.4);
  stroke(H, R, [H.p(1.15, 10.1, .49), H.p(.9, 10.4, .51), H.p(.71, 10.63, .21)], 'sun', 1.6);
}, (H, R, t) => {
  const u = cycle(t, 22);
  for (let k = 0; k < 4; k++) {
    const i = 1.28 + k * 2.15;
    H.clip(H.faceI(i, 1.93, 1.93, 1.44, 2.86), () => {
      for (let n = 0; n < 5; n++) {
        const a = i + ((n * .52 + t * .1) % 2.1);
        H.line(R, [H.p(a, 1.94, 1.54 + n * .1), H.p(a + .39, 1.94, 1.54 + n * .1)], n % 2 ? 'coral' : 'sun', 1.3, { tone: .5 });
      }
      if (u > .22 && u < .45) {
        const a = i - 1 + (u - .22) * 18;
        H.fill(H.faceI(a, 1.95, .55, 1.4, 3), 'blue', .95);
      }
      if (k === 2 && u > .66 && u < .79) {
        const f = (u - .66) / .13;
        const [x, y] = H.p(i + 1, 1.95, 2.42);
        H.opacity(Math.sin(f * Math.PI), () => {
          for (let n = 0; n < 16; n++) {
            const a = n * TAU / 16, r = 7 + f * 26;
            H.line(R, [[x + Math.cos(a) * r * .62, y + Math.sin(a) * r * .62], [x + Math.cos(a) * r, y + Math.sin(a) * r]], n % 3 ? 'sun' : 'coral', 1.4);
          }
        });
      }
    });
    H.line(R, [H.p(i + .93, 1.97, 1.43), H.p(i + .93, 1.97, 3.11)], 'sun', 2);
  }
  actor(H, R, 3.15, 3.62, t, 'tokyoRiverWatch', { shirt: ['teal', .6], face: 'nw' }, .61, 1.16);
  actor(H, R, 4.57, 3.62, t + .6, 'tokyoRiverWatch', { shirt: ['paper', 1], face: 'nw', hairStyle: 'bun' }, .61, 1.16);
  actor(H, R, 6.23, 9.41, t, 'sitfloor', { shirt: ['coral', .53], face: 'ne' }, .61, 1.14);
  actor(H, R, 8.05, 9.41, t, 'sitfloor', { shirt: ['teal', .55], face: 'nw', glasses: true }, .61, 1.14, 'elder');
  actor(H, R, 9.05, 6.21, t, 'hold', {
    shirt: ['paper', 1], pants: ['blue', .76], apron: ['coral', .6], face: 'sw',
    prop: (HH, RR, pts) => {
      const [x, y] = pts.nearHand;
      shape(HH, RR, [[x - 21, y], [x + 12, y - 6], [x + 23, y], [x - 10, y + 7]], 'blue', .74, .7);
      oval(HH, RR, x + 2, y - 2, 7, 3, 'paper', 1);
      oval(HH, RR, x + 2, y - 4, 5, 2.3, 'sun', .63);
    },
  }, .45, 1.16);
  if (u > .22 && u < .45) {
    const i = (u - .22) * 46;
    H.clip(H.tile(1.4, 2.25, 7.8, 7.45, .48), () => H.tint(H.tile(i, 2.3, .48, 7.3, .48), 'blue', .16));
  }
  for (const i of [2.15, 5.35, 8.55]) {
    const [x, y] = H.p(i, 2.48, 2.95);
    H.glow(x, y, 45, 36, 'sun', .14);
    lantern(H, R, i, 2.48, 2.95, 'sun');
  }
  const hull = [H.p(.7, 9.7, .43), H.p(1.45, 10.9, .43), H.p(10.35, 10.9, .43), H.p(11.6, 8.8, .43), H.p(11.4, 9.48, -.1), H.p(10.2, 11.03, -.17), H.p(1.55, 11.03, -.17), H.p(.9, 10.09, -.1)];
  shape(H, R, hull, 'blue', .78);
  stroke(H, R, [H.p(.7, 9.7, .43), H.p(1.45, 10.9, .43), H.p(10.35, 10.9, .43), H.p(11.6, 8.8, .43)], 'coral', 3);
  for (const i of [2.2, 5.6, 9]) oval(H, R, ...H.p(i, 11.04, .15), 3.7, 7, 'paper', 1);
});
