import { world, shape, oval, stroke, box, table, actor, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -8, head: 16, al: 54, ar: 62, el: 62, er: 37 };
const holding = { ...rest, al: 54, ar: 58, el: 70, er: 60, head: -9 };
FIGURES.clips.newYorkKiteSlack = { dur: 18, keys: [[0, seated], [.14, seated], [.33, { ...seated, ar: 75, er: 16, al: 59, el: 51 }], [.5, { ...seated, ar: 75, er: 16, al: 59, el: 51 }], [.68, { ...seated, ar: 46, er: 75, al: 47, el: 68, head: 21 }], [.84, seated], [1, seated]] };
FIGURES.clips.newYorkKiteHold = { dur: 18, keys: [[0, holding], [.22, holding], [.4, { ...holding, al: 57, ar: 61, head: -14 }], [.64, { ...holding, al: 57, ar: 61, head: -14 }], [.83, holding], [1, holding]] };

function boardwalkBench(H, R) {
  for (const i of [2.75, 7.2]) {
    for (const j of [5.77, 6.69]) {
      box(H, R, i, j, .19, .25, .03, .61, 'blue', .74);
      oval(H, R, ...H.p(i + .1, j + .13, .02), 6, 3, 'blue', .43);
    }
    H.line(R, [H.p(i + .1, 5.8, .13), H.p(i + .1, 6.8, .13)], 'blue', 2.2);
    H.line(R, [H.p(i + .1, 5.87, .03), H.p(i + .1, 5.74, 1.56)], 'blue', 2.7);
  }
  for (let j = 5.65; j < 6.96; j += .29) box(H, R, 2.44, j, 5.52, .23, .6, .1, 'sun', .39);
  for (const z of [.86, 1.13, 1.4]) box(H, R, 2.44, 5.65, 5.52, .16, z, .18, 'sun', .44);
  for (const i of [2.71, 7.25]) {
    stroke(H, R, [H.p(i, 5.78, .89), H.p(i, 5.83, 1.05), H.p(i, 6.85, 1.02), H.p(i, 6.94, .75)], 'blue', 2.8);
    for (const z of [.92, 1.19, 1.47]) H.dot(...H.p(i, 5.83, z), 1.4, 'blue', .7);
  }
  const [x, y] = H.p(3.57, 5.84, 1.19);
  oval(H, R, x, y, 9, 3, 'paper', .8);
  H.line(R, [[x - 5, y], [x + 5, y]], 'blue', .6);
}

function bag(H, R, i, j) {
  const [x, y] = H.p(i, j, .05);
  shape(H, R, [[x - 17, y - 3], [x + 14, y + 5], [x + 18, y - 27], [x - 15, y - 35]], 'coral', .7, .9);
  stroke(H, R, [[x - 10, y - 32], [x - 10, y - 49], [x + 9, y - 43], [x + 12, y - 28]], 'blue', 2.2);
  for (const dx of [-7, 2, 11]) H.line(R, [[x + dx - 5, y - 30], [x + dx - 7, y - 1]], 'paper', 2.1, { tone: .8 });
  shape(H, R, [[x - 2, y - 33], [x + 16, y - 28], [x + 12, y - 42], [x - 5, y - 46]], 'teal', .59, .6);
}

function gull(H, R, x, y, turn = 0) {
  oval(H, R, x, y - 4, 10, 6, 'paper', 1);
  oval(H, R, x + 7 + turn, y - 10, 5, 5, 'paper', 1);
  shape(H, R, [[x + 11 + turn, y - 11], [x + 18 + turn, y - 8], [x + 11 + turn, y - 7]], 'sun', .8, .55);
  shape(H, R, [[x - 8, y - 7], [x - 17, y - 12], [x - 11, y - 2]], 'blue', .65, .6);
  stroke(H, R, [[x - 5, y - 5], [x + 1, y - 1], [x + 7, y - 4]], 'blue', .7);
  H.dot(x + 8 + turn, y - 12, 1, 'blue', 1);
  for (const dx of [-4, 4]) H.line(R, [[x + dx, y], [x + dx, y + 6], [x + dx + 5, y + 6]], 'coral', 1.1);
}

function kite(H, R, x, y, u, hand, parentHand) {
  const a = Math.sin(u * TAU) * .035;
  const pt = (dx, dy) => [x + dx * Math.cos(a) - dy * Math.sin(a), y + dx * Math.sin(a) + dy * Math.cos(a)];
  const top = pt(0, -37), right = pt(28, -3), bottom = pt(0, 39), left = pt(-28, -3), center = pt(0, -3);
  shape(H, R, [top, right, bottom, left], 'paper', 1, 1.05);
  shape(H, R, [top, center, left], 'coral', .76, .5);
  shape(H, R, [right, center, bottom], 'teal', .75, .5);
  shape(H, R, [top, right, center], 'sun', .7, .5);
  H.line(R, [top, bottom], 'blue', 1.05);
  stroke(H, R, [left, pt(0, -8), right], 'blue', 1.05);
  H.dot(...center, 2.2, 'paper', 1);
  H.line(R, [bottom, hand], 'blue', .7);
  const wave = Math.sin(u * TAU) * 8;
  const tail = [bottom, pt(16 + wave * .4, 56), pt(4 + wave * .6, 77), pt(26 + wave, 92), pt(22 + wave, 115)];
  stroke(H, R, tail, 'blue', .85);
  for (const [dx, dy, ink] of [[15 + wave * .4, 55, 'coral'], [9 + wave * .6, 78, 'sun'], [24 + wave, 102, 'teal']]) {
    const [tx, ty] = pt(dx, dy);
    shape(H, R, [[tx, ty], [tx - 8, ty - 5], [tx - 7, ty + 5], [tx, ty], [tx + 8, ty - 5], [tx + 7, ty + 5]], ink, .74, .55);
  }
  if (parentHand) {
    const pull = Math.sin(Math.PI * Math.max(0, Math.min(1, (u - .14) / .7))) ** 2;
    const target = pt(-14, 7), middle = [(target[0] + parentHand[0]) / 2, (target[1] + parentHand[1]) / 2 + 15 - pull * 11];
    stroke(H, R, [parentHand, middle, target, pt(-2, 12), center], 'blue', .85);
    const [lx, ly] = pt(-8, 11);
    stroke(H, R, [[lx, ly], [lx - 7, ly + 7 - pull * 4], [lx + 5, ly + 10 - pull * 6], [lx + 1, ly]], 'paper', 1.3);
  }
}

const room = world('new-york-coney-kites', 'Coney Island · Wind at the Bench', { floor: 'paper', tone: .8, wall: false, pattern: 'boards', head: 20 }, (H, R) => {
  shape(H, R, H.tile(.03, .03, 11.93, 1.72, .023), 'teal', .32, .6);
  for (let k = 0; k < 15; k++) H.line(R, [H.p(.4 + k * .75, .55 + k % 3 * .33, .033), H.p(.78 + k * .75, .55 + k % 3 * .33, .033)], 'paper', 1.4, { tone: .9 });
  shape(H, R, H.tile(.05, 1.78, 11.88, 1.68, .025), 'sun', .17, .4);
  for (let k = 0; k < 85; k++) {
    const [x, y] = H.p(.2 + R() * 11.6, 1.85 + R() * 1.5, .04);
    H.dot(x, y, .45 + R() * .6, 'blue', .3);
  }
  for (const i of [.37, 2.61, 4.85, 7.09, 9.33, 11.58]) {
    box(H, R, i, 3.28, .16, .21, .03, 1.15, 'blue', .73);
    box(H, R, i - .04, 3.23, .25, .31, 1.18, .1, 'paper', 1);
  }
  for (const z of [.35, .91]) box(H, R, .33, 3.29, 11.42, .15, z, .14, 'paper', 1);
  for (let i = .6; i < 11.6; i += .47) H.line(R, [H.p(i, 3.37, .16), H.p(i, 3.37, .93)], 'blue', 1);
  for (let j = 3.72; j < 12; j += .45) {
    for (let i = j % 2; i < 12; i += 2.8) {
      const [x, y] = H.p(i + .2, j + .08, .04);
      H.dot(x, y, .75, 'blue', .55);
      H.dot(x + 5, y + 2.5, .75, 'blue', .55);
    }
  }
  shape(H, R, [H.p(1.18, 8.6, .026), H.p(1.42, 8.72, .026), H.p(7.55, 4.33, .026), H.p(7.31, 4.2, .026)], 'teal', .07, .2);
  boardwalkBench(H, R);
  bag(H, R, 3.17, 7.54);
  box(H, R, 7.83, 9.09, 1.55, 1.0, .03, .57, 'teal', .65);
  box(H, R, 7.77, 9.03, 1.67, 1.12, .61, .13, 'paper', 1);
  H.line(R, [H.p(8.12, 10.18, .65), H.p(8.12, 10.18, .91), H.p(9.08, 10.18, .91), H.p(9.08, 10.18, .65)], 'blue', 2);
  for (const i of [8.04, 9.03]) box(H, R, i, 10.14, .13, .06, .38, .28, 'coral', .6);
  const [bx, by] = H.p(9.03, 9.55, .77);
  shape(H, R, [[bx - 5, by], [bx + 5, by], [bx + 5, by - 20], [bx + 3, by - 23], [bx + 3, by - 29], [bx - 3, by - 29], [bx - 3, by - 23], [bx - 5, by - 20]], 'paper', 1, .65);
  H.line(R, [[bx - 4, by - 28], [bx + 4, by - 28]], 'teal', 2.8);
  shape(H, R, [[bx - 4, by - 4], [bx + 4, by - 4], [bx + 4, by - 16], [bx - 4, by - 16]], 'teal', .25, .3);
  for (const [i, j, ink] of [[4.1, 8.87, 'coral'], [4.67, 9.05, 'sun']]) {
    const [x, y] = H.p(i, j, .04);
    oval(H, R, x, y, 7, 12, ink, .7);
    stroke(H, R, [[x - 5, y + 2], [x, y - 6], [x + 5, y + 2]], 'blue', 1.3);
  }
  const [hx, hy] = H.p(2.07, 10.2, .04);
  oval(H, R, hx, hy, 19, 8, 'paper', 1);
  oval(H, R, hx, hy - 6, 12, 11, 'sun', .55);
  stroke(H, R, [[hx - 11, hy - 3], [hx, hy + 1], [hx + 11, hy - 3]], 'blue', 2.1);
  for (let k = 0; k < 3; k++) H.line(R, [[hx + 11, hy], [hx + 19 + k * 4, hy + 6 + k * 2]], 'coral', .7);
  const [sx, sy] = H.p(10.36, 4.4, .04);
  oval(H, R, sx, sy, 17, 7, 'blue', .58);
  box(H, R, 10.02, 4.05, .69, .69, .02, 1.05, 'teal', .62);
  for (let k = 0; k < 5; k++) H.line(R, [H.p(10.06 + k * .14, 4.77, .12), H.p(10.06 + k * .14, 4.77, .98)], 'paper', .65);
  oval(H, R, ...H.p(10.36, 4.41, 1.1), 16, 7, 'paper', 1);
  oval(H, R, ...H.p(10.36, 4.41, 1.11), 10, 4, 'blue', .7);
  const [wx, wy] = H.p(1.48, 1.12, .04);
  H.line(R, [[wx - 18, wy + 1], [wx + 12, wy - 14]], 'blue', 1.5);
  shape(H, R, [[wx - 9, wy - 2], [wx - 9, wy - 31], [wx + 12, wy - 14]], 'paper', 1, .65);
  H.line(R, [[wx - 13, wy + 4], [wx + 13, wy - 9]], 'coral', 3);
  const [fx, fy] = H.p(10.15, .6, .02);
  H.line(R, [[fx - 11, fy + 10], [fx, fy - 30], [fx + 12, fy + 10]], 'blue', .85);
  H.outline(R, Array.from({ length: 28 }, (_, k) => [fx + Math.cos(k * TAU / 28) * 19, fy - 23 + Math.sin(k * TAU / 28) * 19]), 'coral', 1, { tone: .45, amp: .05 });
  for (let k = 0; k < 8; k++) {
    const a = k * TAU / 8;
    H.line(R, [[fx, fy - 23], [fx + Math.cos(a) * 18, fy - 23 + Math.sin(a) * 18]], 'blue', .45, { tone: .5 });
  }
}, (H, R, t) => {
  const u = cycle(t, 18);
  let parentHand;
  H.at(6.02, 6.48, 0, h => actor(h, R, 6.02, 6.48, t, 'newYorkKiteSlack', { shirt: ['teal', .68], hairStyle: 'curly', face: 'se', prop(hh, rr, points) {
    parentHand = points.nearHand;
    const [x, y] = points.farHand;
    shape(hh, rr, [[x - 9, y - 6], [x + 8, y - 2], [x + 8, y + 5], [x - 9, y + 1]], 'sun', .77, .6);
    for (let k = 0; k < 5; k++) hh.line(rr, [[x - 5 + k * 2, y - 5], [x - 5 + k * 2, y + 2]], 'paper', .9);
  } }, .25, 1.37));
  H.at(8.33, 6.68, 0, h => actor(h, R, 8.33, 6.68, t, 'newYorkKiteHold', { shirt: ['coral', .74], hairStyle: 'short', face: 'se', prop(hh, rr, points) {
    const [x, y] = points.nearHand;
    kite(hh, rr, x + 2, y - 42, u, points.nearHand, parentHand);
  } }, 0, 1.47, 'child'));
  gull(H, R, ...H.p(9.62, 10.87, .035), Math.sin(u * TAU) * 1.2);
  const [x, y] = H.p(3.87, 7.76, .04), wave = Math.sin(u * TAU) * 2;
  shape(H, R, [[x - 11, y - 3], [x + 13, y + 3], [x + 15, y - 2 + wave], [x - 8, y - 8]], 'paper', 1, .6);
  H.line(R, [[x - 6, y - 3], [x + 8, y]], 'coral', 1.1);
});

room.loopSeconds = 18;
export default room;
