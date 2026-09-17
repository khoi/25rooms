import { world, shape, oval, stroke, box, table, actor, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const drummer = { ...rest, drop: .47, ll: 78, lr: 85, kl: -76, kr: -85, al: 76, ar: 77, el: 48, er: 46 };
const guitarist = { ...rest, al: 93, ar: 55, el: 56, er: 39, head: 10 };
const bassist = { ...rest, al: 87, ar: 48, el: 58, er: 53, head: 7 };
FIGURES.clips.tokyoRehearsalDrums = { dur: 16, keys: [[0, { ...drummer, ar: 125, er: 25 }], [.07, { ...drummer, ar: 90, er: 30 }], [.14, { ...drummer, ar: 125, er: 25 }], [.18, drummer], ...Array.from({ length: 12 }, (_, q) => [.2 + q * .03, { ...drummer, ar: q % 2 ? 63 : 105, al: q % 2 ? 102 : 67, er: q % 2 ? 43 : 25, el: q % 2 ? 23 : 47 }]), [.58, drummer], [.72, { ...drummer, head: -17, ar: 38, al: 32 }], [.89, { ...drummer, head: -17, ar: 38, al: 32 }], [1, { ...drummer, ar: 125, er: 25 }]] };
FIGURES.clips.tokyoRehearsalGuitar = { dur: 16, keys: [[0, { ...guitarist, al: 137, el: 15 }], [.13, { ...guitarist, al: 137, el: 20 }], [.19, guitarist], ...Array.from({ length: 10 }, (_, q) => [.22 + q * .036, { ...guitarist, ar: q % 2 ? 59 : 45, er: q % 2 ? 44 : 55, head: 7, lean: q % 2 ? -2 : 0 }]), [.59, guitarist], [.73, { ...guitarist, head: -12, ar: 38, er: 64 }], [.9, { ...guitarist, head: -12, ar: 38, er: 64 }], [1, { ...guitarist, al: 137, el: 15 }]] };
FIGURES.clips.tokyoRehearsalBass = { dur: 16, keys: [[0, bassist], [.19, bassist], ...Array.from({ length: 9 }, (_, q) => [.23 + q * .04, { ...bassist, ar: q % 2 ? 42 : 54, er: q % 2 ? 60 : 43 }]), [.6, bassist], [.72, { ...bassist, head: -15, ar: 32, er: 69 }], [.92, { ...bassist, head: -15, ar: 32, er: 69 }], [1, bassist]] };

function amplifier(H, R, i, j, w, h) {
  box(H, R, i, j, w, .96, 0, h, 'blue', .88);
  const front = H.faceI(i + .09, j + .98, w - .18, .16, h - .22);
  shape(H, R, front, 'paper', .45);
  H.hatch(R, front, 'blue', 4, .7, .55, { tone: .6, amp: .05 });
  const count = w > 1.5 ? 2 : 1;
  for (let q = 0; q < count; q++) {
    const [x, y] = H.p(i + w * (q + .5) / count, j + 1, h * .51);
    oval(H, R, x, y, 14, 17, 'blue', .58);
    oval(H, R, x, y, 6, 8, 'teal', .52);
  }
  for (let q = 0; q < 5; q++) H.dot(...H.p(i + .2 + q * (w - .4) / 4, j + 1, h - .1), 1.6, q ? 'paper' : 'sun');
  H.line(R, [H.p(i + w * .32, j + .4, h + .02), H.p(i + w * .32, j + .4, h + .13), H.p(i + w * .68, j + .4, h + .13), H.p(i + w * .68, j + .4, h + .02)], 'blue', 2);
}

function drum(H, R, i, j, z, rx, ry, height, ink = 'coral') {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - rx, y], [x + rx, y], [x + rx, y + height], [x - rx, y + height]], ink, .68);
  oval(H, R, x, y + height, rx, ry, ink, .6);
  oval(H, R, x, y, rx, ry, 'paper', 1);
  oval(H, R, x, y, rx - 3, ry - 2, 'paper', .85);
  for (const side of [-1, 1]) H.line(R, [[x + side * (rx - 3), y + 3], [x + side * (rx - 3), y + height - 2]], 'blue', 1.6);
}

function cymbal(H, R, i, j, z, s, angle = 0) {
  const [x, y] = H.p(i, j, z), ground = H.p(i, j, .08);
  H.line(R, [[x, y], ground], 'blue', 1.4);
  for (const a of [-1, 0, 1]) H.line(R, [ground, [ground[0] + a * 13, ground[1] + 7 - Math.abs(a) * 3]], 'blue', 1.1);
  const points = Array.from({ length: 36 }, (_, q) => { const a = q * TAU / 36; return [x + Math.cos(a) * 27 * s, y + Math.sin(a) * (7 + angle) * s + Math.cos(a) * angle]; });
  shape(H, R, points, 'sun', .8, .8);
  oval(H, R, x, y - 1, 5 * s, 2 * s, 'paper');
  H.line(R, [[x, y + 1], [x, y - 7]], 'blue', 1);
}

function guitar(H, R, x, y, ink, bass = false, s = 1) {
  const P = points => points.map(([a, b]) => [x + a * s, y + b * s]);
  shape(H, R, P([[-10, 9], [-16, 1], [-15, -10], [-8, -15], [-3, -10], [2, -20], [8, -17], [7, -9], [16, -10], [19, -2], [17, 8], [7, 16], [-4, 17]]), ink, .78);
  shape(H, R, P([[1, -12], [-15, bass ? -62 : -52], [-10, bass ? -64 : -54], [7, -14]]), 'sun', .64, .6);
  shape(H, R, P([[-16, bass ? -61 : -51], [-20, bass ? -73 : -63], [-10, bass ? -75 : -65], [-8, bass ? -64 : -54]]), ink, .7, .6);
  for (let q = 0; q < (bass ? 4 : 6); q++) H.line(R, P([[-13 + q * .7, bass ? -67 : -57], [3 + q * .7, 7]]), 'paper', .4);
  for (let q = 0; q < 3; q++) {
    H.line(R, P([[-19 - q * .7, -55 - q * 3], [-22 - q * .7, -54 - q * 3]]), 'blue', 1.1);
    H.line(R, P([[-10 - q * .7, -56 - q * 3], [-7 - q * .7, -57 - q * 3]]), 'blue', 1.1);
  }
  H.line(R, P([[-1, 3], [10, 0]]), 'blue', 2.5);
  H.dot(x + 11 * s, y + 7 * s, 1.9 * s, 'sun');
}

function furnishings(H, R) {
  for (let row = 0; row < 2; row++) for (let col = 0; col < 4; col++) {
    const panel = H.faceI(.35 + col * 1.76, .06, 1.58, .9 + row * 1.07, 1.83 + row * 1.07);
    shape(H, R, panel, 'coral', .37 + col % 2 * .12);
    H.hatch(R, panel, 'blue', 7, 1.05, .65, { tone: .42 });
  }
  for (let q = 0; q < 5; q++) {
    const panel = H.faceJ(.07, .45 + q * 1.83, 1.55, .8, 2.65);
    shape(H, R, panel, q % 2 ? 'teal' : 'coral', .35);
    H.hatch(R, panel, 'blue', 7, -.5, .6, { tone: .48 });
  }
  shape(H, R, H.faceI(2.48, .09, .59, 2.02, 2.42), 'paper', 1);
  H.line(R, [H.p(2.5, .11, 2.08), H.p(3.03, .11, 2.35)], 'teal', 1.8);
  box(H, R, .05, .08, 11.68, .31, 3.09, .25, 'blue', .82);
  box(H, R, .08, .16, .26, 11.47, 3.09, .25, 'blue', .82);
  box(H, R, .41, .58, 6.24, .34, 2.8, .28, 'paper', .7);
  for (let q = 0; q < 9; q++) H.line(R, [H.p(.6 + q * .66, .94, 2.84), H.p(.6 + q * .66, .94, 3.07)], 'blue', .8);
  shape(H, R, H.faceI(8.25, .04, 3.0, .06, 3.09), 'paper', .5);
  for (let q = 0; q < 6; q++) box(H, R, 8.38, .1 + q * .43, 2.39, .44, 0, 2.33 - q * .36, 'paper', .85);
  H.line(R, [H.p(11.06, .32, 2.82), H.p(11.06, 2.86, .62)], 'sun', 2.2);
  const [cx, cy] = H.p(7.36, .07, 2.58);
  oval(H, R, cx, cy, 14, 14, 'paper');
  for (let q = 0; q < 12; q++) H.dot(cx + Math.sin(q * TAU / 12) * 10.5, cy - Math.cos(q * TAU / 12) * 10.5, .8, 'blue');
  H.line(R, [[cx - 6, cy - 6], [cx, cy], [cx + 7, cy - 2]], 'blue', 1.2);
  amplifier(H, R, .75, 5.26, 1.98, 1.66);
  amplifier(H, R, 9.4, 5.21, 1.74, 1.93);
  box(H, R, 9.55, 5.36, 1.37, .58, 1.93, .41, 'paper', .8);
  for (let q = 0; q < 6; q++) H.dot(...H.p(9.67 + q * .2, 5.96, 2.13), 1.7, q ? 'blue' : 'sun');
  box(H, R, 4.9, 2.57, .75, .74, 0, .72, 'teal', .6);
  const [bx, by] = H.p(5.26, 4.57, .65);
  oval(H, R, bx, by, 38, 34, 'coral', .69);
  oval(H, R, bx, by, 31, 29, 'paper', 1);
  oval(H, R, bx + 9, by + 11, 8, 8, 'blue', .86);
  H.line(R, [[bx - 25, by + 24], [bx - 37, by + 40]], 'blue', 2);
  H.line(R, [[bx + 26, by + 24], [bx + 38, by + 40]], 'blue', 2);
  drum(H, R, 4.62, 3.69, 1.36, 23, 10, 24);
  drum(H, R, 5.82, 3.72, 1.42, 24, 11, 24);
  drum(H, R, 6.71, 4.2, .9, 25, 12, 30);
  drum(H, R, 3.87, 4.21, 1.0, 20, 8, 13, 'paper');
  for (let q = 0; q < 2; q++) H.line(R, [H.p(6.43 + q * .48, 4.24, .75), H.p(6.31 + q * .7, 4.34, .05)], 'blue', 1.3);
  for (const [i, j, w] of [[2.9, 7.64, 1.48], [8.2, 7.98, 1.52]]) {
    box(H, R, i, j, w, .74, .03, .08, 'blue', .86);
    for (let q = 0; q < 4; q++) {
      box(H, R, i + .1 + q * .34, j + .13, .27, .43, .12, .1, ['coral', 'teal', 'sun', 'paper'][q], .62);
      H.dot(...H.p(i + .22 + q * .34, j + .29, .24), 1.3, 'blue');
    }
  }
  shape(H, R, H.tile(3.67, 7.94, .27, .12, .25), 'paper', 1, .4);
  stroke(H, R, [H.p(3.1, 7.84, .05), H.p(3.08, 6.73, .04), H.p(2.1, 6.95, .04), H.p(1.87, 6.3, .2)], 'blue', 1.2);
  stroke(H, R, [H.p(8.36, 8.14, .05), H.p(7.72, 8.58, .04), H.p(6.28, 7.81, .04), H.p(6.35, 6.66, .04), H.p(9.6, 6.17, .1)], 'blue', 1.4);
  for (let q = 0; q < 3; q++) H.line(R, [H.p(6.44 + q * .12, 7.7, .07), H.p(6.6 + q * .12, 7.88, .07)], 'paper', 3);
  for (const [i, j] of [[5.21, 6.64], [8.46, 6.12]]) {
    const [x, y] = H.p(i, j, 1.89), g = H.p(i, j, .06);
    H.line(R, [[x, y], g], 'blue', 1.4);
    for (const d of [-15, 0, 15]) H.line(R, [g, [g[0] + d, g[1] + 6]], 'blue', 1);
    H.line(R, [[x, y], [x - 25, y - 9]], 'blue', 1.6);
    H.line(R, [[x - 26, y - 9], [x - 35, y - 12]], 'blue', 4);
    stroke(H, R, [[x - 34, y - 10], [x - 19, y + 14], [g[0] + 5, g[1]]], 'blue', .8);
  }
  table(H, R, 3.98, 10.2, 3.1, 1.1, .84, 'teal');
  box(H, R, 4.15, 10.32, 2.49, .8, .98, .11, 'blue', .77);
  for (let q = 0; q < 8; q++) {
    for (let n = 0; n < 2; n++) H.dot(...H.p(4.31 + q * .28, 10.43 + n * .18, 1.11), 1.6, n ? 'sun' : 'paper');
    H.line(R, [H.p(4.31 + q * .28, 10.81, 1.11), H.p(4.31 + q * .28, 11.04, 1.11)], 'paper', .6);
    H.line(R, [H.p(4.24 + q * .28, 10.84 + q % 3 * .06, 1.12), H.p(4.38 + q * .28, 10.84 + q % 3 * .06, 1.12)], 'coral', 1.8);
  }
  const [hx, hy] = H.p(6.85, 10.79, 1.0);
  stroke(H, R, [[hx - 9, hy], [hx - 12, hy - 13], [hx, hy - 19], [hx + 12, hy - 13], [hx + 9, hy]], 'blue', 3);
  oval(H, R, hx - 9, hy, 4, 7, 'coral'); oval(H, R, hx + 9, hy, 4, 7, 'coral');
  for (let q = 0; q < 2; q++) {
    const [x, y] = H.p(1.73 + q * .83, 9.45, .05);
    shape(H, R, [[x - 15, y], [x + 15, y], [x + 18, y - 22], [x + 8, y - 38], [x + 7, y - 77], [x - 7, y - 77], [x - 8, y - 38], [x - 18, y - 22]], 'blue', .65);
    H.line(R, [[x - 11, y - 18], [x + 11, y - 18]], 'paper', 1);
  }
  guitar(H, R, ...H.p(.65, 8.81, .5), 'sun', false, .7);
  oval(H, R, ...H.p(7.76, 3.04, .1), 24, 28, 'blue', .64);
  H.line(R, [H.p(7.58, 3.05, 1.04), H.p(7.75, 3.05, 1.19), H.p(7.97, 3.05, 1.03)], 'coral', 1.2);
  box(H, R, 9.13, 10.34, .86, .82, 0, .6, 'sun', .48);
  const [jx, jy] = H.p(9.61, 10.37, 1.02);
  shape(H, R, [[jx - 11, jy], [jx + 12, jy], [jx + 19, jy + 19], [jx + 9, jy + 17], [jx + 12, jy + 42], [jx - 12, jy + 42], [jx - 9, jy + 17], [jx - 20, jy + 23]], 'coral', .57);
  for (let q = 0; q < 3; q++) {
    const [x, y] = H.p(10.49 + q % 2 * .46, 8.68 + Math.floor(q / 2) * .54, .03);
    shape(H, R, [[x - 4, y], [x + 4, y], [x + 4, y - 16], [x + 2, y - 22], [x - 2, y - 22], [x - 4, y - 16]], q % 2 ? 'paper' : 'teal', .66, .6);
  }
  shape(H, R, H.tile(7.44, 10.55, .43, .51, .04), 'paper', 1);
  oval(H, R, ...H.p(7.59, 10.79, .08), 2, 3, 'coral'); oval(H, R, ...H.p(7.78, 10.81, .08), 2, 3, 'coral');
  for (let q = 0; q < 3; q++) {
    shape(H, R, H.faceJ(.1, 9.13 + q * .68, .56, 1.18, 1.97), 'paper', 1);
    const [x, y] = H.p(.12, 9.42 + q * .68, 1.6);
    shape(H, R, [[x - 5, y + 10], [x, y - 12], [x + 6, y + 7]], q % 2 ? 'teal' : 'coral', .7);
    H.line(R, [[x - 6, y + 14], [x + 6, y + 10]], 'sun', 2);
  }
}

export default world('tokyo-shimokitazawa-rehearsal', 'Shimokitazawa · One more take', { floor: 'blue', tone: .36, wall: 'blue', wallTone: .73, height: 3.38, head: 20 }, furnishings, (H, R, t) => {
  const u = cycle(t, 16), playing = u >= .19 && u < .59;
  actor(H, R, 5.28, 2.93, t, 'tokyoRehearsalDrums', { shirt: ['paper', 1], hairStyle: 'curly', face: 'se', prop(HH, RR, points) {
    for (const [x, y] of [points.nearHand, points.farHand]) HH.line(RR, [[x, y], [x + (playing ? Math.sin(t * 12) * 8 : 1), y - 23]], 'sun', 1.7);
  } }, .16, 1.18);
  const settle = playing ? Math.sin(t * 15) * 1.3 : u >= .59 ? Math.max(0, 1 - (u - .59) * 20) * Math.sin(t * 15) : 0;
  cymbal(H, R, 3.22, 3.7, 1.87, .94, settle);
  cymbal(H, R, 6.78, 3.26, 1.96, 1.04, -settle);
  cymbal(H, R, 3.57, 4.99, 1.33, .62, settle * .7);
  actor(H, R, 3.53, 6.55, t, 'tokyoRehearsalGuitar', { shirt: ['teal', .66], hairStyle: 'long', face: 'se', prop(HH, RR, points) {
    const [x, y] = points.chest;
    stroke(HH, RR, [[x - 8, y - 3], [x + 14, y + 24], [x - 8, y + 34]], 'blue', 3);
    guitar(HH, RR, x + 3, y + 24, 'coral', false, .92);
  } }, 0, 1.25);
  actor(H, R, 8.23, 6.81, t, 'tokyoRehearsalBass', { shirt: ['sun', .6], hairStyle: 'short', face: 'sw', prop(HH, RR, points) {
    const [x, y] = points.chest;
    stroke(HH, RR, [[x - 8, y - 4], [x + 11, y + 29], [x - 9, y + 36]], 'blue', 3);
    guitar(HH, RR, x + 1, y + 24, 'teal', true, .94);
  } }, 0, 1.25);
  for (let q = 0; q < 8; q++) H.dot(...H.p(4.31 + q * .28, 10.33, 1.13), 1.5, playing && Math.sin(t * 9 + q * 1.9) > -.2 ? 'sun' : 'blue', 1);
});
