import { world, shape, oval, stroke, box, table, actor, cycle, ell, windowOn, glow, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -6, al: 68, ar: 65, el: 27, er: 32, head: 12 };
const released = { ...seated, al: 43, ar: 44, el: 64, er: 64, head: -4, lean: 0 };
const high = { ...released, al: 132, el: 4, head: -13, lean: -5 };
const low = { ...released, al: 77, el: 18, head: 8, lean: -5 };
FIGURES.clips.newYorkLastChord = { dur: 18, keys: [[0, seated], [.13, seated], [.24, released], [.35, high], [.48, low], [.62, low], [.76, high], [.86, released], [1, seated]] };
const ease = x => { const v = Math.max(0, Math.min(1, x)); return v * v * (3 - 2 * v); };

function glass(H, R, i, j, z, ink = 'sun') {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 5, y - 14], [x + 5, y - 14], [x + 4, y], [x - 4, y]], 'paper', .95, .6);
  shape(H, R, [[x - 4, y - 8], [x + 4, y - 8], [x + 3, y - 1], [x - 3, y - 1]], ink, .46, .3);
  H.line(R, [[x - 2, y - 11], [x - 2, y - 2]], 'paper', 1);
}

function chair(H, R, i, j, ink = 'teal') {
  table(H, R, i, j, .92, .89, .56, ink);
  box(H, R, i, j + .77, .92, .12, .68, .72, ink, .65);
}

function piano(H, R) {
  for (const i of [3.76, 7.77]) {
    box(H, R, i, 1.02, .29, 1.76, .19, .24, 'blue', .85);
    box(H, R, i, 2.66, .24, .25, .2, .78, 'blue', .9);
  }
  box(H, R, 3.71, .99, 4.4, 1.52, .36, 1.62, 'blue', .81);
  box(H, R, 3.64, .92, 4.55, 1.65, 1.97, .16, 'teal', .78);
  shape(H, R, H.faceI(3.93, 2.53, 3.94, 1.23, 1.87), 'teal', .58, .8);
  shape(H, R, H.faceI(4.03, 2.55, 3.74, 1.31, 1.79), 'blue', .77, .6);
  for (const i of [4.07, 5.87, 7.66]) H.line(R, [H.p(i, 2.57, 1.35), H.p(i, 2.57, 1.76)], 'teal', 1, { tone: .6 });
  box(H, R, 3.71, 2.47, 4.4, .73, .87, .11, 'blue', .88);
  shape(H, R, H.tile(3.97, 2.51, 3.9, .61, .99), 'paper', 1, .8);
  for (let n = 0; n < 28; n++) {
    const i = 3.97 + n * .139;
    H.line(R, [H.p(i, 2.55, 1), H.p(i, 3.1, 1)], 'blue', .65);
    if (![2, 6].includes(n % 7)) box(H, R, i + .09, 2.52, .065, .34, 1.01, .035, 'blue', .96);
  }
  for (const i of [5.47, 5.85, 6.23]) box(H, R, i, 2.57, .17, .52, .24, .08, 'sun', .69);
  box(H, R, 3.94, 2.54, 3.95, .03, .48, .18, 'teal', .45);
  shape(H, R, H.faceI(5.02, 1.42, 1.82, 2.15, 2.87), 'blue', .72, .8);
  shape(H, R, H.faceI(5.11, 1.44, .78, 2.2, 2.8), 'paper', 1, .7);
  shape(H, R, H.faceI(5.93, 1.44, .78, 2.2, 2.8), 'paper', 1, .7);
  for (const i of [5.23, 6.05]) for (let n = 0; n < 4; n++) {
    H.line(R, [H.p(i, 1.45, 2.32 + n * .1), H.p(i + .51, 1.45, 2.32 + n * .1)], 'blue', .45, { tone: .4 });
    oval(H, R, ...H.p(i + .09 + n % 3 * .12, 1.46, 2.35 + n * .1), 1.5, 1, 'blue', .66);
  }
  table(H, R, 5.5, 3.3, 1.72, .81, .69, 'blue');
  shape(H, R, H.tile(5.57, 3.39, 1.58, .61, .83), 'coral', .65, .6);
  for (const i of [5.84, 6.5]) H.dot(...H.p(i, 3.68, .84), 1.3, 'blue', .8);
  const [vx, vy] = H.p(7.64, 1.38, 2.16);
  oval(H, R, vx, vy - 3, 5, 6, 'coral', .6);
  stroke(H, R, [[vx, vy - 8], [vx + 2, vy - 26], [vx - 4, vy - 37]], 'teal', 1.1);
  shape(H, R, [[vx + 2, vy - 20], [vx + 12, vy - 26], [vx + 7, vy - 15]], 'teal', .65, .5);
  oval(H, R, vx - 5, vy - 38, 7, 5, 'sun', .7);
}

const room = world('new-york-harlem-piano', 'Harlem · One Last Chord', {
  floor: 'paper', tone: .82, wall: 'coral', wallTone: .24, wallStyle: 'brick', pattern: 'boards', height: 3.85, head: 20,
}, (H, R) => {
  windowOn(H, R, 'ne', 10.36, 1.69, 2.06, 1.72, { sky: 'blue', skyTone: .84, inside() {
    for (let n = 0; n < 4; n++) {
      const i = 9.43 + n * .48;
      shape(H, R, H.faceI(i, -.05, .36, 1.7, 2.1 + n % 2 * .37), 'teal', .48, .4);
      H.dot(...H.p(i + .16, -.07, 2.02), 1.4, 'sun', .6);
    }
  } });
  for (const j of [1.0, 4.08, 7.2]) {
    shape(H, R, H.faceJ(.04, j, 2.35, 1.25, 3.31), 'blue', .59, .8);
    shape(H, R, H.faceJ(.07, j + .14, 2.07, 1.4, 3.17), 'teal', .47, .7);
    for (let q = 0; q < 8; q++) H.line(R, [H.p(.1, j + .2 + q * .26, 1.46), H.p(.1, j + .2 + q * .26, 3.11)], 'blue', .7, { tone: .45 });
  }
  box(H, R, 2.62, .37, 6.52, 4.55, .02, .18, 'teal', .41);
  for (let j = .55; j < 4.83; j += .43) H.line(R, [H.p(2.7, j, .21), H.p(9.04, j, .21)], 'blue', .7, { tone: .44 });
  piano(H, R);
  const [lx, ly] = H.p(9.17, 1.6, .24);
  oval(H, R, lx, ly, 15, 6, 'blue', .73);
  H.line(R, [[lx, ly], [lx, ly - 78]], 'blue', 2.4);
  shape(H, R, [[lx - 24, ly - 70], [lx + 24, ly - 70], [lx + 13, ly - 95], [lx - 13, ly - 95]], 'sun', .72);
  H.line(R, [[lx + 14, ly - 70], [lx + 15, ly - 54]], 'blue', .7);
  H.dot(lx + 15, ly - 53, 1.6, 'coral');
  const [dx, dy] = H.p(1.83, 5.41, .11);
  for (const a of [-.9, .8, 2.4]) H.line(R, [[dx, dy - 22], [dx + Math.cos(a) * 23, dy + Math.sin(a) * 8]], 'blue', 1.5);
  shape(H, R, [[dx - 18, dy - 44], [dx + 18, dy - 44], [dx + 18, dy - 25], [dx - 18, dy - 25]], 'coral', .64);
  oval(H, R, dx, dy - 44, 18, 8, 'paper', 1);
  oval(H, R, dx, dy - 25, 18, 7, 'blue', .48);
  for (const d of [-14, -7, 7, 14]) H.line(R, [[dx + d, dy - 42], [dx + d, dy - 27]], 'blue', 1.1);
  H.line(R, [[dx - 11, dy - 43], [dx + 8, dy - 48]], 'blue', 1.5);
  for (let n = 0; n < 5; n++) H.line(R, [[dx + 6, dy - 48], [dx + 13 + n * 2, dy - 52 + n]], 'paper', .75);
  const [mx, my] = H.p(2.23, 3.39, .21);
  for (const [a, b] of [[-17, 6], [15, 6], [4, -10]]) H.line(R, [[mx, my - 8], [mx + a, my + b]], 'blue', 1.4);
  H.line(R, [[mx, my - 8], [mx, my - 57], [mx + 20, my - 69]], 'blue', 1.9);
  stroke(H, R, [[mx + 17, my - 69], [mx + 29, my - 75]], 'blue', 5.1);
  stroke(H, R, [[mx + 18, my - 70], [mx + 23, my - 47], [mx + 4, my - 2], [mx + 35, my + 13], [mx + 45, my + 35]], 'blue', .8, .63);
  for (let n = 0; n < 3; n++) H.outline(R, ell(mx + 47, my + 37, 9 + n * 4, 3 + n * 1.5), 'blue', .85, { tone: .64 });
  box(H, R, 9.78, 3.73, 1.67, .81, .02, 1.01, 'blue', .78);
  shape(H, R, H.faceI(9.91, 4.57, 1.4, .15, .88), 'teal', .58, .7);
  for (let n = 0; n < 8; n++) H.line(R, [H.p(9.98 + n * .18, 4.58, .21), H.p(9.98 + n * .18, 4.58, .82)], 'blue', .6);
  for (let n = 0; n < 4; n++) H.dot(...H.p(10.07 + n * .28, 4.59, .96), 1.7, 'sun', .7);
  table(H, R, 7.59, 7.16, 2.08, 1.6, .84, 'coral');
  glass(H, R, 7.96, 7.54, .99);
  glass(H, R, 8.83, 8.11, .99, 'teal');
  shape(H, R, H.tile(8.62, 7.34, .65, .51, .99), 'paper', 1, .6);
  chair(H, R, 8.39, 9.11, 'teal');
  chair(H, R, 6.16, 7.04, 'coral');
  table(H, R, 2.15, 9.26, 1.83, 1.48, .78, 'teal');
  glass(H, R, 2.53, 9.68, .93);
  oval(H, R, ...H.p(3.27, 10.11, .94), 9, 5, 'paper', 1);
  shape(H, R, H.tile(2.63, 9.52, .56, .62, .94), 'sun', .46, .5);
  chair(H, R, .85, 9.23, 'coral');
  const [cx, cy] = H.p(.77, 11.23, .09);
  oval(H, R, cx, cy, 14, 5, 'blue', .64);
  H.line(R, [[cx, cy], [cx, cy - 77]], 'blue', 2.6);
  stroke(H, R, [[cx - 15, cy - 73], [cx - 9, cy - 62], [cx, cy - 69], [cx + 14, cy - 75]], 'blue', 2.2);
  shape(H, R, [[cx - 13, cy - 67], [cx - 22, cy - 54], [cx - 19, cy - 28], [cx - 6, cy - 28], [cx - 5, cy - 55]], 'teal', .68, .75);
  H.line(R, [[cx - 12, cy - 57], [cx - 12, cy - 32]], 'paper', .8);
  box(H, R, 10.01, 10.27, 1.56, 1.08, .02, .6, 'coral', .42);
  for (let n = 0; n < 5; n++) box(H, R, 10.15 + n * .25, 10.41, .17, .79, .63, .4 + n % 2 * .12, n % 2 ? 'blue' : 'paper', .82);
  const [wx, wy] = H.p(4.92, .09, 3.4);
  oval(H, R, wx, wy, 13, 13, 'paper', 1);
  H.line(R, [[wx, wy - 9], [wx, wy], [wx - 5, wy + 5]], 'blue', 1.3);
}, (H, R, t) => {
  const u = cycle(t, 18), closed = ease((u - .35) / .13) * (1 - ease((u - .62) / .14));
  glow(H, 8.95, 1.8, 2.24, 49, 'sun');
  const angle = (1 - closed) * Math.PI / 2, frontJ = 2.52 + Math.cos(angle) * .62, frontZ = 1.035 + Math.sin(angle) * .62;
  shape(H, R, [H.p(3.89, 2.52, 1.035), H.p(7.97, 2.52, 1.035), H.p(7.97, frontJ, frontZ), H.p(3.89, frontJ, frontZ)], 'teal', .73, .85);
  H.line(R, [H.p(4.03, frontJ, frontZ), H.p(7.83, frontJ, frontZ)], 'sun', .8, { tone: .62 });
  actor(H, R, 6.35, 3.67, t, 'newYorkLastChord', { shirt: ['paper', 1], pants: ['blue', .79], hairStyle: 'curly', face: 'ne' }, .24, 1.27);
  actor(H, R, 8.86, 9.48, Math.sin(u * TAU) * .08, 'sit', { shirt: ['teal', .69], pants: ['blue', .68], hairStyle: 'bun', face: 'nw', eyesClosed: u > .13 && u < .29 }, .02, 1.22);
  const [x, y] = H.p(8.92, 8.12, 1.15);
  H.opacity(.16 + Math.sin(u * TAU) * .02, () => H.glow(x, y - 6, 12, 10, 'sun', .28));
});
room.loopSeconds = 18;
export default room;
