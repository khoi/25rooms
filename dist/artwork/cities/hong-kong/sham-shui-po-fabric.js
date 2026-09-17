import { world, shape, oval, stroke, box, table, actor, cycle, wallRect, wallPt, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const measure = { ...rest, lean: -11, head: 15, al: 66, ar: 78, el: 30, er: 14 };
FIGURES.clips.hongKongFabricMeasure = { dur: 16, keys: [[0, measure], [.1, measure], [.28, { ...measure, al: 85, ar: 100, el: 6, er: -5, lean: -17 }], [.48, { ...measure, al: 85, ar: 100, el: 6, er: -5, lean: -17 }], [.63, { ...measure, al: 57, ar: 56, el: 57, er: 60, lean: -4 }], [.8, { ...measure, al: 57, ar: 56, el: 57, er: 60, lean: -4, head: -2 }], [.95, measure], [1, measure]] };

function bolt(H, R, i, j, z, width, height, ink, pattern = 0) {
  box(H, R, i, j, width, .76, z, height, ink, .48);
  const face = H.faceI(i + .03, j + .775, width - .06, z + .04, z + height - .04);
  H.clip(face, () => {
    if (pattern % 3 === 0) for (let q = 0; q < 7; q++) H.line(R, [H.p(i + .02, j + .79, z + .08 + q * .15), H.p(i + width, j + .79, z + .08 + q * .15)], 'paper', 1.1);
    else if (pattern % 3 === 1) for (let q = 0; q < 12; q++) H.dot(...H.p(i + .08 + q % 3 * width / 3, j + .79, z + .13 + Math.floor(q / 3) * .19), 1.6, 'paper', 1);
    else for (let q = 0; q < 4; q++) H.line(R, [H.p(i + .1 + q * width / 4, j + .79, z), H.p(i + .1 + q * width / 4, j + .79, z + height)], 'blue', .6, { tone: .5 });
  });
  shape(H, R, H.tile(i + width * .3, j + .07, width * .4, .56, z + height + .015), 'paper', .85, .4);
}

function roll(H, R, i, j, z, length, ink, stripe = false) {
  const a = H.p(i, j, z), b = H.p(i + length, j, z);
  shape(H, R, [[a[0], a[1] - 13], [b[0], b[1] - 13], [b[0], b[1] + 9], [a[0], a[1] + 9]], ink, .6, .75);
  oval(H, R, ...a, 9, 13, ink, .7);
  oval(H, R, ...b, 9, 13, 'paper', 1);
  for (const rad of [3, 5, 7]) H.outline(R, Array.from({ length: 24 }, (_, q) => [b[0] + Math.cos(q * TAU / 24) * rad, b[1] + Math.sin(q * TAU / 24) * rad * 1.4]), ink, .8, { tone: .65 });
  H.dot(...b, 2.2, 'blue', .9);
  if (stripe) for (let q = 0; q < 3; q++) H.line(R, [[a[0], a[1] - 8 + q * 6], [b[0], b[1] - 8 + q * 6]], 'paper', 1.1);
}

const room = world('hong-kong-sham-shui-po-fabric', 'Sham Shui Po · Twelve blue metres', { floor: 'paper', tone: .5, wall: 'paper', wallTone: .82, pattern: 'tiles', height: 3.72, head: 20 }, (H, R) => {
  for (const i of [.35, 2.7, 5.05, 7.4]) box(H, R, i, .17, .1, 1.23, .02, 3.52, 'teal', .7);
  for (const z of [.24, 1.34, 2.44, 3.54]) box(H, R, .35, .17, 7.15, 1.24, z, .12, 'teal', .6);
  for (let row = 0; row < 3; row++) for (let q = 0; q < 11; q++) bolt(H, R, .53 + q * .62, .41, .38 + row * 1.1, .52, .77 + q % 3 * .06, ['blue', 'paper', 'teal', 'coral', 'sun'][q % 5], row + q);
  shape(H, R, wallRect(H, 'ne', 8.23, 11.55, 1.55, 3.42), 'teal', .24, .7);
  for (const i of [8.34, 9.35, 10.4, 11.42]) H.line(R, [wallPt(H, 'ne', i, 1.62, .05), wallPt(H, 'ne', i, 3.32, .05)], 'paper', 2.1);
  H.line(R, [wallPt(H, 'ne', 8.33, 2.52, .05), wallPt(H, 'ne', 11.42, 2.52, .05)], 'paper', 2);
  for (const j of [1.8, 3.27, 4.74, 6.21, 7.68]) {
    box(H, R, .1, j, .91, 1.22, .1, .18, 'teal', .6);
    for (let q = 0; q < 3; q++) {
      const [x, y] = H.p(.56, j + .27 + q * .33, .25);
      shape(H, R, [[x - 8, y], [x + 8, y], [x + 8, y - 59], [x - 8, y - 59]], ['teal', 'sun', 'coral'][q], .42, .8);
      oval(H, R, x, y - 59, 8, 4, 'paper', 1);
      H.dot(x, y - 59, 2.2, 'blue', .8);
      H.line(R, [[x + 3, y - 5], [x + 3, y - 54]], 'paper', .9);
    }
  }
  table(H, R, 2.36, 4.1, 7.73, 2.04, 1.02, 'paper');
  shape(H, R, H.tile(3.1, 4.3, 5.96, 1.53, 1.155), 'blue', .6, .7);
  for (let q = 0; q < 12; q++) H.line(R, [H.p(3.13 + q * .48, 4.34, 1.17), H.p(3.13 + q * .48, 5.8, 1.17)], 'paper', .7, { tone: .6 });
  for (let q = 0; q < 4; q++) H.line(R, [H.p(3.14, 4.43 + q * .38, 1.18), H.p(9.01, 4.43 + q * .38, 1.18)], 'teal', .8);
  shape(H, R, [H.p(3.1, 5.83, 1.17), H.p(5.1, 5.83, 1.17), H.p(5.1, 6.2, .4), H.p(3.1, 6.2, .4)], 'blue', .6, .7);
  for (let q = 0; q < 5; q++) H.line(R, [H.p(3.16 + q * .4, 5.84, 1.17), H.p(3.16 + q * .4, 6.19, .41)], 'paper', .7);
  roll(H, R, 2.72, 4.49, 1.58, .88, 'blue', true);
  shape(H, R, H.tile(2.58, 6.02, 7.28, .1, 1.17), 'sun', .65, .4);
  for (let q = 0; q < 45; q++) H.line(R, [H.p(2.63 + q * .16, 6.015, 1.19), H.p(2.63 + q * .16, q % 5 ? 6.06 : 6.11, 1.19)], 'blue', .65);
  const [sx, sy] = H.p(9.62, 4.86, 1.19);
  for (const dx of [-5, 5]) oval(H, R, sx + dx, sy, 4.5, 3, 'coral', .65);
  H.line(R, [[sx - 2, sy - 1], [sx + 13, sy - 16]], 'blue', 2.1);
  H.line(R, [[sx + 2, sy - 1], [sx - 8, sy - 17]], 'blue', 2.1);
  shape(H, R, H.tile(9.43, 5.3, .22, .2, 1.18), 'paper', 1, .5);
  box(H, R, 9.42, 5.61, .37, .28, 1.16, .13, 'coral', .7);
  table(H, R, 8.22, 1.93, 2.85, 1.23, .83, 'teal');
  for (let q = 0; q < 3; q++) roll(H, R, 8.5, 2.2 + q * .3, 1.15 + q * .04, 1.65, ['coral', 'sun', 'paper'][q], q === 0);
  box(H, R, 9.5, 7.28, 1.55, 1.42, .08, .83, 'teal', .4);
  for (let q = 0; q < 3; q++) box(H, R, 9.62, 7.38, 1.22, 1.2, .93 + q * .09, .07, ['coral', 'paper', 'sun'][q], .56);
  for (let q = 0; q < 7; q++) {
    const [x, y] = H.p(1.74 + q % 4 * .29, 9.51 + Math.floor(q / 4) * .4, .17);
    oval(H, R, x, y, 5, 3, 'blue', .65);
    shape(H, R, [[x - 4, y], [x + 4, y], [x + 4, y - 11], [x - 4, y - 11]], ['teal', 'coral', 'sun'][q % 3], .7, .5);
    oval(H, R, x, y - 11, 5, 3, 'paper', 1);
  }
  box(H, R, 1.51, 9.22, 1.5, 1.21, .02, .12, 'coral', .5);
  shape(H, R, H.tile(5.55, 9.62, 1.92, 1.13, .03), 'paper', 1, .6);
  for (let q = 0; q < 5; q++) shape(H, R, H.tile(5.69 + q * .29, 9.74, .23, .87, .05), ['blue', 'teal', 'coral', 'sun', 'paper'][q], .6, .4);
  const [bx, by] = H.p(10.95, 10.5, .04);
  oval(H, R, bx, by - 4, 12, 5, 'paper', 1);
  shape(H, R, [[bx - 11, by - 4], [bx + 11, by - 4], [bx + 9, by - 23], [bx - 9, by - 23]], 'blue', .25, .7);
  oval(H, R, bx, by - 23, 9, 4, 'paper', 1);
  for (let q = 0; q < 5; q++) stroke(H, R, [[bx - 6 + q * 3, by - 22], [bx - 8 + q * 3, by - 30], [bx - 2 + q * 2, by - 26]], q % 2 ? 'coral' : 'teal', 2);
}, (H, R, t) => {
  const u = cycle(t, 16);
  actor(H, R, 7.44, 6.91, t, 'hongKongFabricMeasure', { shirt: ['coral', .58], apron: ['paper', 1], glasses: true, hairStyle: 'short', face: 'nw', prop(HH, RR, points) {
    const a = points.nearHand, b = points.farHand, anchor = HH.p(6.15, 5.51, 1.2);
    stroke(HH, RR, [anchor, [a[0] - 17, a[1] + 5], a, [b[0] - 5, b[1] + 2], b], 'sun', 3.1);
    for (let q = 1; q < 9; q++) {
      const x = anchor[0] + (a[0] - anchor[0]) * q / 9, y = anchor[1] + (a[1] - anchor[1]) * q / 9;
      HH.line(RR, [[x, y - 1.5], [x + .8, y + 1.5]], 'blue', .6);
    }
  } }, 0, 1.4);
  actor(H, R, 4.17, 8.47, 0, 'hold', { shirt: ['teal', .63], hairStyle: 'pony', face: 'nw', prop(HH, RR, points) {
    const [x, y] = points.nearHand;
    shape(HH, RR, [[x - 17, y - 9], [x + 10, y - 3], [x + 8, y + 15], [x - 19, y + 9]], 'paper', 1, .8);
    for (let q = 0; q < 4; q++) shape(HH, RR, [[x - 13 + q * 5, y - 6], [x - 9 + q * 5, y - 5], [x - 10 + q * 5, y + 8], [x - 14 + q * 5, y + 7]], ['teal', 'sun', 'coral', 'blue'][q], .62, .4);
  } }, 0, 1.25);
  const [x, y] = H.p(1.61, 8.78, 1.01);
  stroke(H, R, [[x, y], [x + 10, y + 8 + Math.sin(u * TAU) * 1.5], [x + 6, y + 24]], 'coral', 1.2);
});

room.loopSeconds = 16;
export default room;
