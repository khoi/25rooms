import { world, shape, oval, stroke, box, actor, cycle, TAU, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const hold = { ...rest, lean: -7, al: 55, el: 58, ar: 58, er: 54, head: 13 };
FIGURES.clips.hongKongMooring = { dur: 16, keys: [[0, hold], [.12, hold], [.3, { ...hold, lean: -14, ar: 83, er: 8, al: 66, el: 24 }], [.48, { ...hold, lean: -12, ar: 73, er: 25, al: 56, el: 45 }], [.66, hold], [.82, { ...hold, head: -12 }], [1, hold]] };

function ropeCoil(H, R, x, y, rx, ry, ink = 'sun') {
  for (let k = 0; k < 5; k++) H.outline(R, ell(x + k * .7, y - k * .4, rx - k * 2.1, ry - k * .8), ink, 2, { tone: .8, amp: .15 });
}

function deck(H, R) {
  const hull = [[2.2, 1.3], [6.7, 1.3], [7.8, 3], [7.4, 9.2], [4.8, 11], [2.1, 9.4], [1.6, 3.2]];
  shape(H, R, hull.map(([i, j]) => H.p(i, j, .28)), 'blue', .75, 1.2);
  const rim = [[2.3, 1.4], [6.5, 1.4], [7.4, 3.1], [7.05, 9.1], [4.8, 10.5], [2.45, 9.2], [1.96, 3.2]];
  shape(H, R, rim.map(([i, j]) => H.p(i, j, .64)), 'coral', .61);
  const inner = [[2.5, 1.7], [6.3, 1.7], [7.06, 3.1], [6.73, 8.85], [4.8, 10.06], [2.77, 8.93], [2.27, 3.2]].map(([i, j]) => H.p(i, j, .65));
  shape(H, R, inner, 'sun', .46);
  H.clip(inner, () => {
    for (let j = 1.75; j < 10.4; j += .4) H.line(R, [H.p(2.1, j, .67), H.p(7.3, j, .67)], 'blue', .7, { tone: .5 });
    for (let j = 2.05; j < 9.8; j += .8) for (const i of [2.65, 6.66]) H.dot(...H.p(i, j, .68), 1.2, 'blue', .5);
  });
  for (const j of [3.6, 6.3, 8.4]) {
    const [x, y] = H.p(7.25, j, .47);
    oval(H, R, x, y + 8, 8, 13, 'blue', .81);
    oval(H, R, x, y + 8, 3.5, 7, 'teal', .6);
    stroke(H, R, [H.p(7.1, j, .8), [x - 3, y - 3], [x + 2, y + 1]], 'sun', 1.3);
  }
  for (const i of [2.65, 6.5]) {
    for (const j of [2.1, 5.65]) box(H, R, i, j, .1, .1, .7, 2.25, 'blue', .6);
    stroke(H, R, [H.p(i, 2.15, 2.9), H.p(i, 3.65, 3.25), H.p(i, 5.7, 2.9)], 'sun', 2);
  }
  const roof = [H.p(2.5, 1.8, 2.91), H.p(6.75, 1.8, 2.91), H.p(6.75, 5.7, 2.91), H.p(2.5, 5.7, 2.91)];
  shape(H, R, roof, 'teal', .58);
  for (let j = 1.86; j < 5.7; j += .35) H.line(R, [H.p(2.5, j, 2.93), H.p(6.75, j, 2.93)], 'paper', .8, { tone: .53 });
  shape(H, R, [H.p(2.5, 1.8, 2.91), H.p(6.75, 1.8, 2.91), H.p(6.75, 1.8, 2.54), H.p(2.5, 1.8, 2.54)], 'coral', .53);
  box(H, R, 2.75, 2.05, 3.65, .64, .68, .46, 'teal', .65);
  for (let i = 2.82; i < 6.4; i += .38) H.line(R, [H.p(i, 2.1, 1.15), H.p(i, 2.61, 1.15)], 'paper', .7);
  box(H, R, 2.8, 4.37, 1.25, .87, .68, .45, 'paper', 1);
  H.line(R, [H.p(3.42, 4.4, 1.15), H.p(3.42, 5.18, 1.15)], 'coral', 2);
  box(H, R, 2.85, 5.9, 1.18, .84, .69, .2, 'blue', .62);
  for (let k = 0; k < 6; k++) H.line(R, [H.p(2.91 + k * .18, 5.95, .92), H.p(2.91 + k * .18, 6.69, .92)], 'teal', 2);
  const [rx, ry] = H.p(2.77, 7.52, 1.04);
  oval(H, R, rx, ry, 19, 16, 'coral', .85);
  oval(H, R, rx, ry, 11, 9, 'paper', 1);
  for (const a of [0, Math.PI / 2, Math.PI, Math.PI * 1.5]) H.line(R, [[rx + Math.cos(a) * 12, ry + Math.sin(a) * 11], [rx + Math.cos(a) * 18, ry + Math.sin(a) * 16]], 'paper', 4);
  stroke(H, R, [H.p(2.62, 6.63, 1.03), H.p(2.74, 7.7, 1.66), H.p(2.88, 8.55, .96)], 'sun', 1.2);
  const [bx, by] = H.p(4.9, 9.38, .7);
  shape(H, R, [[bx - 13, by - 19], [bx + 13, by - 19], [bx + 10, by], [bx - 10, by]], 'paper', 1);
  oval(H, R, bx, by - 19, 13, 5, 'teal', .54);
  stroke(H, R, [[bx - 12, by - 17], [bx - 10, by - 34], [bx + 10, by - 34], [bx + 12, by - 17]], 'blue', 1.2);
  H.line(R, [H.p(3.2, 8.7, .78), H.p(3.3, 3.5, 1.04)], 'sun', 3);
  shape(H, R, [H.p(3.12, 8.65, .81), H.p(3.43, 8.64, .81), H.p(3.48, 9.58, .81), H.p(3.12, 9.58, .81)], 'coral', .65);
  for (const [i, j] of [[5.9, 2.9], [5.9, 3.4]]) {
    const [x, y] = H.p(i, j, .69);
    oval(H, R, x, y - 4, 7, 4, 'blue', .8);
    H.line(R, [[x - 5, y - 5], [x + 4, y - 7]], 'paper', 1);
  }
  const [tx, ty] = H.p(6.15, 4.87, .72);
  shape(H, R, [[tx - 5, ty], [tx + 5, ty], [tx + 5, ty - 21], [tx - 5, ty - 21]], 'sun', .7);
  oval(H, R, tx, ty - 21, 5, 2, 'blue', .8);
  ropeCoil(H, R, ...H.p(4.56, 7.98, .7), 25, 10);
}

const room = world('hong-kong-aberdeen-mooring', 'Aberdeen · First rope ashore', { floor: 'teal', tone: .4, wall: false, head: 20 }, (H, R) => {
  for (let j = .3; j < 12; j += .62) for (let i = .1; i < 12; i += 1.4) H.line(R, [H.p(i, j, .03), H.p(i + .62, j, .03)], 'paper', 1, { tone: .36 });
  box(H, R, 8.4, .4, 3.25, 11.05, .09, .65, 'blue', .57);
  box(H, R, 8.4, .4, 3.25, 11.05, .75, .12, 'paper', .84);
  for (let j = .55; j < 11.5; j += .48) H.line(R, [H.p(8.47, j, .9), H.p(11.58, j, .9)], 'blue', .7, { tone: .5 });
  for (const j of [1.2, 4.6, 8.15, 10.55]) {
    box(H, R, 8.71, j, .27, .3, .88, .42, 'blue', .84);
    box(H, R, 8.55, j + .06, .62, .19, 1.25, .12, 'blue', .85);
    H.line(R, [H.p(8.58, j + .12, 1.4), H.p(9.12, j + .12, 1.4)], 'paper', 1);
  }
  for (const j of [1.1, 3.8, 6.3]) {
    H.line(R, [H.p(11.4, j, .88), H.p(11.4, j, 1.88)], 'blue', 2.5);
    if (j < 6) H.line(R, [H.p(11.4, j, 1.85), H.p(11.4, j + 2.7, 1.85)], 'teal', 2.2);
  }
  box(H, R, 10.14, 1.05, 1.0, 1.18, .89, .64, 'sun', .5);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(10.22 + k * .25, 2.25, 1.0), H.p(10.22 + k * .25, 2.25, 1.5)], 'blue', .8);
  box(H, R, 9.85, 2.7, .89, .75, .9, .19, 'teal', .7);
  ropeCoil(H, R, ...H.p(10.3, 4.45, .91), 20, 8, 'coral');
  const [cx, cy] = H.p(10.5, 10.15, .9);
  shape(H, R, [[cx - 10, cy], [cx + 10, cy], [cx + 8, cy - 25], [cx - 6, cy - 25]], 'teal', .58);
  stroke(H, R, [[cx - 6, cy - 24], [cx - 5, cy - 32], [cx + 6, cy - 31], [cx + 8, cy - 24]], 'blue', 1.5);
  deck(H, R);
}, (H, R, t) => {
  const u = cycle(t, 16);
  for (const [i, j, phase] of [[1, 7.2, 0], [7.5, 10.8, .35], [6.5, .7, .65]]) {
    const q = (u + phase) % 1;
    const [x, y] = H.p(i, j, .04);
    H.opacity(Math.sin(q * Math.PI) * .6, () => H.outline(R, ell(x, y, 12 + q * 23, 3 + q * 5), 'paper', 1, { amp: .1 }));
  }
  H.at(6.36, 7.43, .68, HH => actor(HH, R, 6.36, 7.43, u * 16, 'hongKongMooring', { shirt: ['paper', 1], pants: ['teal', .7], hairStyle: 'cap', prop: (h, r, p) => {
    const [x, y] = p.nearHand;
    const end = h.p(8.76, 8.27, 1.4);
    stroke(h, r, [end, [end[0] - 17, end[1] + 15], [x + 26, y + 17], [x, y]], 'sun', 2.4);
    stroke(h, r, [p.farHand, [x - 10, y + 21], h.p(4.6, 7.95, .73)], 'sun', 2);
    ropeCoil(h, r, x + 2, y + 11, 14, 7);
  } }, .68, 1.3));
  H.at(10.17, 6.0, .89, HH => actor(HH, R, 10.17, 6.0, u * 3, 'hold', { shirt: ['coral', .67], hairStyle: 'short', prop: (h, r, p) => {
    const [x, y] = p.nearHand;
    shape(h, r, [[x - 8, y], [x + 7, y], [x + 5, y + 14], [x - 6, y + 14]], 'sun', .57);
    stroke(h, r, [[x - 7, y], [x - 4, y - 10], [x + 4, y - 10], [x + 7, y]], 'blue', 1);
  } }, .89, 1.2));
});
room.loopSeconds = 16;
export default room;
