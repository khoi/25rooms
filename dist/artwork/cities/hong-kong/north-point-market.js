import { world, shape, oval, stroke, box, table, actor, cycle, ell, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const weigh = { ...rest, al: 58, el: 53, ar: 62, er: 50, lean: -7, head: 14 };
FIGURES.clips.hongKongMarketWeigh = { dur: 15, keys: [[0, weigh], [.12, weigh], [.21, { ...weigh, ar: 69, er: 53, al: 65, el: 58 }], [.41, { ...weigh, ar: 68, er: 54, al: 63, el: 58 }], [.49, weigh], [.68, weigh], [.77, { ...weigh, ar: 70, er: 53, al: 65, el: 58 }], [.93, weigh], [1, weigh]] };
const ease = u => (1 - Math.cos(Math.PI * Math.max(0, Math.min(1, u)))) / 2;

function leafy(H, R, x, y, size = 1, ink = 'teal') {
  for (let n = 0; n < 5; n++) {
    const a = -.95 + n * .43;
    const tx = x + Math.sin(a) * 12 * size, ty = y - (15 + n % 2 * 4) * size;
    stroke(H, R, [[x, y], [x + Math.sin(a) * 5 * size, y - 6 * size], [tx, ty]], 'paper', 2.2 * size);
    shape(H, R, [[tx, ty + 8 * size], [tx - 6 * size, ty + 2 * size], [tx - 5 * size, ty - 5 * size], [tx + 2 * size, ty - 8 * size], [tx + 6 * size, ty - 1 * size], [tx + 4 * size, ty + 4 * size]], ink, .58 + n % 2 * .16, .55);
    H.line(R, [[tx, ty + 6 * size], [tx, ty - 5 * size]], 'blue', .55);
  }
}

function crate(H, R, i, j, w, d, z, kind) {
  box(H, R, i, j, w, d, z, .32, 'teal', .5);
  shape(H, R, H.tile(i + .09, j + .08, w - .18, d - .16, z + .34), 'blue', .3);
  for (let x = i + .15; x < i + w; x += .27) H.line(R, [H.p(x, j + d + .02, z + .06), H.p(x, j + d + .02, z + .25)], 'paper', 1.4);
  for (let y = j + .15; y < j + d; y += .27) H.line(R, [H.p(i + w + .02, y, z + .06), H.p(i + w + .02, y, z + .25)], 'paper', 1.1);
  for (let n = 0; n < 9; n++) {
    const [x, y] = H.p(i + .29 + n % 3 * (w - .6) / 2, j + .24 + Math.floor(n / 3) * (d - .5) / 2, z + .38);
    if (kind === 'greens') leafy(H, R, x, y, .63);
    if (kind === 'tomato') {
      oval(H, R, x, y - 3, 6.5, 5.7, 'coral', .75);
      H.line(R, [[x - 3, y - 7], [x, y - 10], [x + 2, y - 7]], 'teal', 1.1);
    }
    if (kind === 'aubergine') {
      oval(H, R, x, y - 4, 5, 11, 'blue', .78);
      shape(H, R, [[x - 4, y - 12], [x - 1, y - 17], [x + 4, y - 13], [x + 1, y - 10]], 'teal', .7, .4);
      H.line(R, [[x - 2, y - 7], [x - 2, y + 1]], 'paper', .8);
    }
    if (kind === 'radish') {
      shape(H, R, [[x - 5, y - 10], [x + 5, y - 10], [x + 4, y + 2], [x, y + 9], [x - 3, y + 2]], 'paper', .96, .5);
      for (const a of [-1, 0, 1]) stroke(H, R, [[x, y - 10], [x + a * 5, y - 17], [x + a * 7, y - 21]], 'teal', 2);
    }
    if (kind === 'ginger') {
      stroke(H, R, [[x - 7, y + 2], [x - 2, y - 7], [x + 4, y - 2], [x + 8, y - 9]], 'sun', 6.4);
      H.line(R, [[x - 3, y - 4], [x + 1, y - 1]], 'blue', .7);
    }
    if (kind === 'onion') {
      oval(H, R, x, y - 3, 6.5, 7.5, 'sun', .67);
      H.line(R, [[x - 2, y - 9], [x - 2, y + 1]], 'coral', .75);
      H.line(R, [[x, y - 10], [x + 1, y - 15]], 'blue', .65);
    }
  }
}

function basket(H, R, x, y) {
  for (let k = 0; k < 4; k++) leafy(H, R, x - 12 + k * 8, y + 12, .78);
  shape(H, R, [[x - 22, y + 7], [x + 23, y + 7], [x + 17, y + 28], [x - 16, y + 28]], 'sun', .58);
  for (let q = 0; q < 7; q++) H.line(R, [[x - 17 + q * 5.6, y + 10], [x - 13 + q * 4.3, y + 26]], 'blue', .7, { tone: .66 });
  for (const n of [14, 19, 24]) H.line(R, [[x - 19 + (n - 14) * .18, y + n], [x + 20 - (n - 14) * .18, y + n]], 'paper', .9);
  stroke(H, R, [[x - 17, y + 9], [x - 12, y - 6], [x + 11, y - 6], [x + 18, y + 9]], 'coral', 2.2);
}

const room = world('hong-kong-north-point-market', 'North Point · A basket of greens', { floor: 'paper', tone: .55, wall: 'teal', wallTone: .34, height: 3.6, oneWall: true, pattern: 'tiles', head: 20 }, (H, R) => {
  box(H, R, .34, .34, 10.8, 1.23, 0, 1.24, 'blue', .56);
  box(H, R, .34, 1.56, 10.8, 1.24, 0, .86, 'blue', .47);
  box(H, R, .34, 2.79, 10.8, 1.29, 0, .47, 'blue', .42);
  const produce = [['greens', 'radish', 'aubergine'], ['ginger', 'greens', 'onion'], ['tomato', 'radish', 'greens']];
  for (let row = 0; row < 3; row++) for (let col = 0; col < 3; col++) crate(H, R, .55 + col * 3.5, .44 + row * 1.25, 3.24, 1.08, 1.25 - row * .385, produce[row][col]);
  for (const i of [.28, 5.84, 11.41]) {
    box(H, R, i, .18, .11, .11, .05, 3.58, 'blue', .7);
    stroke(H, R, [H.p(i, .25, 3.48), H.p(i, 4.21, 3.07), H.p(i, 4.21, 2.76)], 'blue', 1.9);
  }
  shape(H, R, [H.p(.15, .15, 3.58), H.p(11.57, .15, 3.58), H.p(11.57, 4.28, 3.09), H.p(.15, 4.28, 3.09)], 'paper', .87);
  for (let i = .17; i < 11.5; i += .77) shape(H, R, [H.p(i, .16, 3.6), H.p(i + .37, .16, 3.6), H.p(i + .37, 4.3, 3.11), H.p(i, 4.3, 3.11)], 'coral', .53, .5);
  for (let i = .18; i < 11.5; i += .55) {
    const a = H.p(i, 4.3, 3.08), b = H.p(i + .5, 4.3, 3.08), c = H.p(i + .25, 4.3, 2.84);
    shape(H, R, [a, b, c], i % 1.1 < .55 ? 'paper' : 'coral', .65, .5);
  }
  stroke(H, R, [H.p(.22, 4.35, 3.09), H.p(11.48, 4.35, 3.09), H.p(11.48, 4.48, .16)], 'blue', 2.4);
  for (const i of [2.1, 5.65, 9.1]) {
    H.line(R, [H.p(i, 4.07, 1.08), H.p(i, 4.07, 1.48)], 'blue', .8);
    shape(H, R, H.faceI(i - .25, 4.08, .5, 1.27, 1.6), 'sun', .6, .65);
  }
  table(H, R, 6.26, 4.82, 2.55, 1.37, .62, 'paper');
  box(H, R, 6.86, 5.03, 1.0, .77, .78, .24, 'teal', .64);
  const [sx, sy] = H.p(7.35, 5.4, 1.08);
  oval(H, R, sx, sy, 25, 10.5, 'paper', .92);
  oval(H, R, sx, sy, 19, 7, 'blue', .18);
  box(H, R, 7.99, 5.08, .3, .57, .78, .52, 'blue', .81);
  shape(H, R, H.faceI(8.02, 5.68, .25, 1.03, 1.23), 'sun', .5);
  for (let k = 0; k < 3; k++) H.dot(...H.p(8.065 + k * .065, 5.7, 1.13), 1, 'teal');
  table(H, R, 5.4, 6.72, 2.39, 1.36, .69, 'sun');
  shape(H, R, H.tile(6.04, 7.05, 1.13, .64, .84), 'paper', .93);
  for (let k = 0; k < 5; k++) H.line(R, [H.p(6.07 + k * .21, 7.06, .86), H.p(6.07 + k * .21, 7.66, .86)], 'teal', .65);
  const [ox, oy] = H.p(6.7, 7.42, .9);
  stroke(H, R, [[ox - 19, oy + 2], [ox + 5, oy - 6], [ox + 12, oy - 19]], 'paper', 3);
  stroke(H, R, [[ox + 5, oy - 6], [ox + 22, oy - 18]], 'teal', 2);
  stroke(H, R, [[ox + 5, oy - 6], [ox + 15, oy - 23]], 'teal', 2);
  table(H, R, .64, 5.76, 2.12, 1.76, .9, 'teal');
  oval(H, R, ...H.p(1.64, 6.58, 1.07), 22, 10, 'paper', .9);
  oval(H, R, ...H.p(1.64, 6.58, 1.07), 16, 6, 'teal', .35);
  const [px, py] = H.p(2.26, 6.07, 1.07);
  shape(H, R, [[px - 6, py], [px + 6, py], [px + 5, py - 18], [px + 2, py - 22], [px + 2, py - 28], [px - 3, py - 28], [px - 3, py - 22], [px - 5, py - 18]], 'paper', .88);
  H.line(R, [[px - 4, py - 28], [px + 8, py - 28]], 'coral', 3);
  stroke(H, R, [H.p(.2, 6.2, 1.39), H.p(.79, 6.2, 1.39), H.p(.79, 6.2, 1.19)], 'blue', 2.2);
  box(H, R, .24, 5.42, .21, 1.78, 1.2, .82, 'paper', .78);
  for (let j = 5.48; j < 7.2; j += .38) H.line(R, [H.p(.47, j, 1.24), H.p(.47, j, 1.95)], 'teal', .6);
  for (const z of [1.48, 1.77]) H.line(R, [H.p(.48, 5.43, z), H.p(.48, 7.18, z)], 'teal', .6);
  for (let k = 0; k < 3; k++) {
    box(H, R, .69 + k * .72, 8.61, .62, 1.12, .03, .75, 'sun', .39);
    for (let j = 8.75; j < 9.7; j += .2) H.line(R, [H.p(.75 + k * .72, j, .81), H.p(1.22 + k * .72, j, .81)], 'blue', .8);
  }
  for (const i of [9.1, 10.41]) for (const j of [9.2, 10.3]) oval(H, R, ...H.p(i, j, .13), 4, 6, 'blue', .8);
  box(H, R, 8.93, 9.03, 1.7, 1.48, .24, .14, 'teal', .6);
  crate(H, R, 9.01, 9.09, 1.48, 1.23, .41, 'onion');
  for (const i of [9.02, 10.53]) H.line(R, [H.p(i, 10.39, .37), H.p(i, 10.39, 1.52)], 'blue', 2.4);
  H.line(R, [H.p(9.02, 10.39, 1.52), H.p(10.53, 10.39, 1.52)], 'coral', 3);
  shape(H, R, H.tile(3.53, 9.63, 3.13, .33, .03), 'blue', .63);
  for (let i = 3.59; i < 6.62; i += .18) H.line(R, [H.p(i, 9.65, .05), H.p(i, 9.94, .05)], 'paper', .7);
  for (const i of [3.32, 3.83]) {
    box(H, R, i, 5.09, .26, .4, .03, .49, 'blue', .79);
    box(H, R, i, 5.34, .26, .24, .03, .16, 'blue', .85);
  }
}, (H, R, t) => {
  const u = cycle(t, 15);
  const move = u < .18 ? 0 : u < .46 ? ease((u - .18) / .28) : u < .69 ? 1 : u < .95 ? 1 - ease((u - .69) / .26) : 0;
  const j = 5.0 + move * 1.7;
  H.at(6.2, j, 0, HH => actor(HH, R, 6.2, j, u * 15, 'hongKongMarketWeigh', { shirt: ['paper', .9], apron: ['coral', .69], hairStyle: 'short', prop: (h, r, p) => {
    basket(h, r, p.nearHand[0] + 6, p.nearHand[1] + 1);
  } }, 0, 1.3));
  H.at(8.96, 7.61, 0, HH => actor(HH, R, 8.96, 7.61, u * 3, 'hold', { shirt: ['sun', .57], hairStyle: 'bun', face: 'sw', prop: (h, r, p) => {
    const [x, y] = p.nearHand;
    const spread = 2 + Math.sin(u * TAU) ** 2 * 3;
    stroke(h, r, [[x - 9, y + 8], [x - spread, y - 3], [x + spread, y - 3], [x + 10, y + 8]], 'coral', 1.6);
    shape(h, r, [[x - 12, y + 7], [x + 12, y + 7], [x + 10, y + 30], [x - 10, y + 30]], 'paper', .9);
    h.line(r, [[x - 3, y + 10], [x - 4, y + 27]], 'teal', .8);
  } }, 0, 1.2));
  const q = cycle(u * 15, 3);
  const [x, y] = H.p(11.48, 4.48, 2.72 - q * 2.48);
  H.opacity(Math.sin(q * Math.PI) * .65, () => H.line(R, [[x, y - 5], [x, y]], 'paper', 1.5));
});
room.loopSeconds = 15;
export default room;
