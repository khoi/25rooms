import { shallowTray, foldedCloth, handTool, servicePipe, slattedCrate } from '../furnishings.js';
import { world, shape, oval, stroke, box, actor, plant, cycle, TAU, wallRect, wallPt, windowOn, table } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const ready = { ...rest, lean: -4, al: 16, ar: 50, er: 38, head: 10 };
FIGURES.clips.newYorkStoopWater = { dur: 16, keys: [[0, ready], [.13, ready], [.26, { ...ready, lean: -11, ar: 71, er: 12, head: 18 }], [.58, { ...ready, lean: -11, ar: 71, er: 12, head: 18 }], [.74, ready], [.87, { ...ready, head: -8 }], [1, ready]] };
FIGURES.clips.newYorkStoopNeighbor = { dur: 16, keys: [[0, { ...rest, head: -10, al: 19, ar: 16, er: 13 }], [.48, { ...rest, head: -14, al: 19, ar: 16, er: 13 }], [.67, { ...rest, head: -14, al: 19, ar: 32, er: 22 }], [.82, { ...rest, head: -10, al: 19, ar: 16, er: 13 }], [1, { ...rest, head: -10, al: 19, ar: 16, er: 13 }]] };

function pot(H, R, i, j, z, size = 15, ink = 'coral', herbs = false) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - size * .84, y - 20], [x + size * .84, y - 20], [x + size * .63, y], [x - size * .63, y]], ink, .65, .8);
  oval(H, R, x, y - 20, size, 5, ink, .76);
  oval(H, R, x, y - 21, size * .79, 3.6, 'blue', .54);
  if (herbs) for (let k = 0; k < 7; k++) {
    const dx = (k - 3) * 4, top = y - 29 - (k * 7 % 17);
    H.line(R, [[x + dx * .3, y - 21], [x + dx, top]], 'blue', .8);
    oval(H, R, x + dx - 3, top + 4, 4.5, 2.5, 'teal', .76);
    oval(H, R, x + dx + 2, top, 4, 2.8, 'teal', .7);
  } else for (let k = 0; k < 6; k++) {
    const dx = (k - 2.5) * 7, top = y - 37 - Math.sin(k / 5 * Math.PI) * 17;
    stroke(H, R, [[x, y - 20], [x + dx * .4, top - 1], [x + dx, top + 8]], 'teal', 1.3);
    for (let q = 0; q < 4; q++) {
      const px = x + dx * q / 4, py = y - 22 + (top - y + 27) * q / 4;
      H.line(R, [[px - 6, py - 1], [px, py + 2], [px + 6, py - 2]], 'teal', 2.5, { tone: .72 });
    }
  }
  oval(H, R, x + 1, y + 1, size * .8, 3, 'sun', .43);
}

function stairRail(H, R, i) {
  const top = [];
  for (let k = 0; k < 8; k++) {
    const j = 2.95 + k * .78, z = 2.07 - k * .235;
    H.line(R, [H.p(i, j, z), H.p(i, j, z + .89)], 'blue', 2.1);
    oval(H, R, ...H.p(i, j, z + .83), 3.4, 3.4, 'blue', .8);
    if (k % 2 === 0) {
      const [x, y] = H.p(i, j, z + .43);
      stroke(H, R, [[x, y - 8], [x - 6, y - 1], [x, y + 7], [x + 5, y]], 'blue', 1.1);
    }
    top.push(H.p(i, j, z + .94));
  }
  H.line(R, top, 'blue', 3.2, { amp: .07 });
}

function bedStuyStoopDetails(H, R) {
  box(H, R, 8.06, 0.43, 3.36, 0.74, 0.04, 0.11, 'blue', 0.62);
  shape(H, R, H.faceI(8.23, 0.47, 2.98, 0.19, 1.35), 'teal', 0.3, 0.7);
  for (let n = 0; n < 7; n++) H.line(R, [H.p(8.39 + n * 0.43, 0.53, 0.23), H.p(8.39 + n * 0.43, 0.53, 1.26)], 'blue', 1.4);
  H.line(R, [H.p(8.2, 0.57, 0.86), H.p(11.25, 0.57, 0.86)], 'blue', 1.7);
  table(H, R, 9.48, 7.61, 1.72, 0.92, 0.61, 'teal');
  foldedCloth(H, R, 9.64, 7.73, 0.64, 0.59, 0.75, 'coral', 'paper');
  shallowTray(H, R, 10.43, 7.75, 0.55, 0.58, 0.75, 'sun');
  handTool(H, R, 10.7, 8.02, 0.94, 'trowel', 'teal');
  slattedCrate(H, R, 1.12, 8.49, 1.48, 1.16, 0.02, 0.59, 'sun');
  for (let n = 0; n < 3; n++) pot(H, R, 1.42 + n * 0.36, 8.94, 0.68, 6, 'coral', false);
  const [x, y] = H.p(1.3, 10.4, 0.03);
  H.line(
    R,
    [
      [x, y],
      [x + 4, y - 53]
    ],
    'sun',
    2.2
  );
  shape(
    H,
    R,
    [
      [x - 12, y],
      [x + 12, y],
      [x + 7, y - 16],
      [x - 6, y - 17]
    ],
    'teal',
    0.6,
    0.7
  );
  for (let n = 0; n < 6; n++)
    H.line(
      R,
      [
        [x - 9 + n * 3.6, y],
        [x - 5 + n * 2, y - 13]
      ],
      'blue',
      0.7
    );
  box(H, R, 7.45, 0.31, 0.49, 0.18, 2.68, 0.76, 'blue', 0.6);
  for (let n = 0; n < 3; n++) H.dot(...H.p(7.67, 0.51, 2.83 + n * 0.18), 1.7, 'sun');
  servicePipe(
    H,
    R,
    [
      [11.54, 0.3, 0.14],
      [11.54, 0.3, 2.11],
      [11.54, 0.3, 4.54]
    ],
    'teal',
    2.4
  );
  for (const [i, j] of [
    [8.49, 10.8],
    [9.43, 11.1],
    [2.96, 10.92]
  ])
    shape(H, R, H.tile(i, j, 0.28, 0.14, 0.04), 'sun', 0.4, 0.3);
}

const room = world('new-york-bed-stuy-stoop', 'Bedford-Stuyvesant · The Extra Step', {
  floor: 'paper', tone: 1, wall: false, head: 20,
}, (H, R) => {
  shape(H, R, H.faceI(.08, .08, 11.84, 0, 4.85), 'coral', .49);
  shape(H, R, H.faceJ(.08, .08, 3.65, 0, 4.85), 'coral', .38);
  for (const side of ['ne', 'nw']) for (let z = .32; z < 4.8; z += .28) {
    const end = side === 'ne' ? 11.9 : 3.7;
    H.line(R, [wallPt(H, side, .08, z, .09), wallPt(H, side, end, z, .09)], 'paper', .8, { tone: .67 });
    for (let i = Math.round(z / .28) % 2 * .55; i < end; i += 1.1) H.line(R, [wallPt(H, side, i, z, .09), wallPt(H, side, i, z + .28, .09)], 'blue', .6, { tone: .3 });
  }
  for (const z of [.85, 2.03, 4.54, 4.77]) box(H, R, .05, .05, 11.9, .35, z, .13, z > 4 ? 'sun' : 'coral', .55);
  shape(H, R, H.faceI(3.76, .41, 3.32, 2.05, 4.55), 'sun', .6);
  shape(H, R, H.faceI(4.07, .44, 2.7, 2.1, 4.29), 'blue', .82);
  shape(H, R, H.faceI(4.3, .46, 2.26, 2.1, 4.12), 'teal', .7);
  for (const i of [4.43, 5.57]) {
    shape(H, R, H.faceI(i, .49, .83, 2.39, 3.07), 'blue', .59, .7);
    shape(H, R, H.faceI(i, .49, .83, 3.31, 3.93), 'sun', .27, .7);
  }
  H.line(R, [H.p(5.43, .51, 2.1), H.p(5.43, .51, 4.13)], 'paper', 1.1);
  for (const i of [5.17, 5.71]) H.dot(...H.p(i, .53, 3.11), 2, 'sun');
  for (const i of [3.79, 6.85]) box(H, R, i, .32, .23, .3, 2.06, 2.43, 'coral', .68);
  for (const p of [1.76, 9.48]) {
    shape(H, R, H.faceI(p - 1.17, .12, 2.34, 1.88, 4.37), 'sun', .62, .8);
    windowOn(H, R, 'ne', p, 2.18, 1.91, 1.87, { sky: 'blue', skyTone: .7, frameInk: 'paper' });
    box(H, R, p - 1.25, .18, 2.5, .47, 1.97, .18, 'coral', .7);
    for (const i of [p - .61, p, p + .61]) H.line(R, [H.p(i, .29, 2.2), H.p(i, .29, 3.58)], 'blue', 1.5);
    const [x, y] = H.p(p, .32, 2.65);
    stroke(H, R, [[x - 12, y + 9], [x - 12, y - 5], [x, y - 13], [x + 12, y - 4], [x + 12, y + 9]], 'blue', 1.4);
  }
  shape(H, R, H.faceI(8.45, .41, 2.25, .05, 1.57), 'blue', .82);
  shape(H, R, H.faceI(8.63, .44, 1.91, .07, 1.42), 'teal', .61);
  H.line(R, [H.p(10.3, .49, .48), H.p(10.3, .49, .85)], 'sun', 2);
  for (let q = 0; q < 6; q++) H.line(R, [H.p(8.72 + q * .3, .48, .96), H.p(8.72 + q * .3, .48, 1.34)], 'blue', 1.4);
  box(H, R, 3.04, .44, 4.15, 2.39, .02, 2.06, 'coral', .57);
  for (let k = 0; k < 8; k++) {
    const j = 2.83 + k * .78, height = 1.96 - k * .235;
    box(H, R, 3.03, j, 4.16, .79, .02, height, 'coral', .54);
    H.line(R, [H.p(3.14, j + .72, height + .04), H.p(7.09, j + .72, height + .04)], 'sun', 1.2, { tone: .6 });
    H.tint(H.tile(4.24, j + .15, 1.66, .53, height + .041), 'paper', .36);
  }
  stairRail(H, R, 3.15);
  stairRail(H, R, 7.07);
  shape(H, R, H.tile(4.36, .9, 1.88, .92, 2.1), 'sun', .49, .7);
  for (let q = 0; q < 9; q++) H.line(R, [H.p(4.43 + q * .2, .98, 2.11), H.p(4.43 + q * .2, 1.71, 2.11)], 'blue', .5, { tone: .4 });
  pot(H, R, 3.38, 5.6, 1.27, 13, 'coral', true);
  pot(H, R, 6.7, 2.21, 2.1, 17, 'teal');
  pot(H, R, 2.06, 2.72, .02, 20, 'coral');
  pot(H, R, 8.0, 3.73, .02, 20, 'paper', true);
  for (let k = 0; k < 5; k++) {
    const [x, y] = H.p(.2, 1.0 + k * .49, 1.12 + k * .44);
    stroke(H, R, [[x - 4, y + 15], [x + 2, y - 10], [x + 5, y - 25]], 'teal', 1.2);
    oval(H, R, x - 3, y - 8, 7, 4, 'teal', .7);
    oval(H, R, x + 6, y - 20, 6, 4, 'teal', .65);
  }
  for (const j of [4.17, 5.05]) {
    box(H, R, .41, j, .13, .13, .01, 1.36, 'blue', .78);
    H.line(R, [H.p(.48, j, 1.34), H.p(2.4, j, 1.34)], 'blue', 2.3);
    for (let i = .6; i < 2.5; i += .31) H.line(R, [H.p(i, j, .08), H.p(i, j, 1.34)], 'blue', 1.4);
  }
  for (let i = .05; i < 11.9; i += 2.0) H.line(R, [H.p(i, 9.68, .01), H.p(i, 11.94, .01)], 'blue', .65, { tone: .37 });
  for (const j of [9.66, 11.6]) H.line(R, [H.p(.08, j, .01), H.p(11.93, j, .01)], 'blue', .8, { tone: .4 });
  box(H, R, .05, 11.62, 11.9, .33, -.02, .14, 'sun', .39);
  box(H, R, 9.16, 2.32, 1.06, .84, .02, .61, 'teal', .58);
  for (const i of [9.25, 10.08]) {
    H.line(R, [H.p(i, 2.92, .15), H.p(i, 2.64, 1.52)], 'blue', 1.9);
    oval(H, R, ...H.p(i, 2.93, .16), 4, 5, 'blue', .87);
  }
  H.line(R, [H.p(9.25, 2.64, 1.52), H.p(10.08, 2.64, 1.52)], 'coral', 3);
  const [bx, by] = H.p(7.97, 1.03, .08);
  H.line(R, [[bx - 10, by - 3], [bx + 12, by + 3]], 'sun', 7);
  H.line(R, [[bx + 1, by], [bx + 12, by - 42]], 'blue', 2.1);
  for (let q = 0; q < 5; q++) H.line(R, [[bx - 8 + q * 4, by + 1], [bx - 9 + q * 4, by + 5]], 'blue', .65);
  const [px, py] = H.p(2.74, 8.12, .02);
  H.line(R, [[px, py], [px + 2, py - 11]], 'teal', .8);
  oval(H, R, px - 2, py - 8, 4, 2, 'teal', .63);
  oval(H, R, px + 5, py - 12, 4.5, 2.2, 'teal', .68);
  box(H, R, 8.62, 5.47, .89, .74, .52, .1, 'sun', .56);
  for (const i of [8.7, 9.34]) for (const j of [5.56, 6.02]) box(H, R, i, j, .1, .1, .02, .5, 'blue', .65);
  const [lx, ly] = H.p(7.56, 1.02, 2.77);
  H.line(R, [[lx, ly - 10], [lx + 13, ly - 10], [lx + 13, ly + 6]], 'blue', 1.8);
  shape(H, R, [[lx + 5, ly + 1], [lx + 22, ly + 1], [lx + 19, ly + 18], [lx + 8, ly + 18]], 'sun', .56, .8);
  bedStuyStoopDetails(H, R);
}, (H, R, t) => {
  const u = cycle(t, 16);
  const tilt = u < .26 ? Math.max(0, (u - .13) / .13) : u < .58 ? 1 : Math.max(0, 1 - (u - .58) / .16);
  H.at(4.67, 4.82, 1.52, HH => actor(HH, R, 4.67, 4.82, u * 16, 'newYorkStoopWater', {
    face: 'sw', shirt: ['sun', .65], pants: ['blue', .7], hairStyle: 'curly', skin: ['coral', .65], prop(h, r, p) {
      const [hx, hy] = p.nearHand, angle = tilt * .42;
      const q = (x, y) => [hx + x * Math.cos(angle) + y * Math.sin(angle), hy - x * Math.sin(angle) + y * Math.cos(angle)];
      shape(h, r, [q(-12, 4), q(11, 4), q(9, 23), q(-10, 23)], 'teal', .72, .8);
      oval(h, r, ...q(0, 4), 11, 4, 'teal', .78);
      stroke(h, r, [q(-6, 4), q(-9, -6), q(8, -7), q(8, 5)], 'blue', 1.8);
      shape(h, r, [q(-10, 12), q(-27, 3), q(-30, 6), q(-11, 21)], 'teal', .72, .7);
      const spout = q(-29, 5), target = h.p(3.38, 5.6, 1.91);
      if (tilt > .72) {
        const opacity = Math.min(1, (tilt - .72) / .2);
        h.opacity(opacity, () => {
          stroke(h, r, [spout, [(spout[0] + target[0]) / 2 - 2, spout[1] + 8], target], 'teal', 1.1, .55);
          for (let k = 0; k < 3; k++) {
            const f = cycle(u * 16 + k * .4, 1.2);
            h.dot(spout[0] + (target[0] - spout[0]) * f, spout[1] + (target[1] - spout[1]) * f, 1.1, 'paper', .8);
          }
        });
      }
    },
  }, 1.52, 1.4));
  H.at(7.7, 9.65, 0, HH => actor(HH, R, 7.7, 9.65, u * 16, 'newYorkStoopNeighbor', {
    face: 'sw', shirt: ['paper', 1], pants: ['teal', .77], hairStyle: 'bun', skin: ['coral', .48], prop(h, r, p) {
      const [x, y] = p.nearHand;
      stroke(h, r, [[x - 7, y + 10], [x - 4, y], [x + 5, y + 1], [x + 8, y + 11]], 'blue', 1.3);
      shape(h, r, [[x - 11, y + 9], [x + 12, y + 11], [x + 13, y + 33], [x - 10, y + 31]], 'coral', .65, .8);
      h.line(r, [[x - 7, y + 26], [x + 10, y + 27]], 'paper', 1.4);
      for (let k = 0; k < 3; k++) h.line(r, [[x - 5 + k * 5, y + 10], [x - 8 + k * 5, y - 1]], 'teal', 2);
    },
  }, 0, 1.36));
  const [x, y] = H.p(6.69, 2.18, 3.0);
  stroke(H, R, [[x - 6, y + 8], [x, y - Math.sin(u * TAU) * 2], [x + 8, y + 4]], 'teal', 1.8);
});

room.loopSeconds = 16;
export default room;
