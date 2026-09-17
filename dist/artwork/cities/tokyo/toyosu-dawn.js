import { world, shape, oval, stroke, box, table, actor, steam, cycle, ell, wallRect, wallPt } from '../../worlds/common.js';

function line(H, R, points, width = 1, ink = 'blue', tone = .75) {
  H.line(R, points, ink, width, { tone, amp: .09 });
}

function tub(H, R, i, j, z = 0, ice = false) {
  box(H, R, i, j, 1.15, .85, z, .43, 'paper', .9);
  shape(H, R, H.tile(i + .08, j + .08, .99, .69, z + .44), 'blue', .45, .6);
  for (let k = 0; k < 5; k++) line(H, R, [H.p(i + .1 + k * .22, j + .86, z + .1), H.p(i + .1 + k * .22, j + .86, z + .35)], .6);
  if (ice) for (let k = 0; k < 18; k++) {
    const [x, y] = H.p(i + .12 + R() * .85, j + .12 + R() * .57, z + .46);
    shape(H, R, [[x - 3, y], [x, y - 3], [x + 5, y], [x + 1, y + 3]], 'paper', 1, .4);
  }
}

function tuna(H, R, i, j, turn = 0) {
  const [x, y] = H.p(i, j, .27);
  const p = (a, b) => [x + a, y + b + a * turn];
  const body = [[-52, 0], [-39, -13], [-12, -19], [20, -17], [41, -8], [47, 0], [35, 8], [4, 13], [-28, 11]].map(([a, b]) => p(a, b));
  shape(H, R, body, 'blue', .73, 1.1);
  shape(H, R, [[-51, 0], [-69, -17], [-65, 0], [-71, 15]].map(([a, b]) => p(a, b)), 'teal', .6, .9);
  H.clip(body, () => {
    shape(H, R, [[-49, 4], [-20, 2], [14, 0], [43, -2], [30, 12], [-22, 15]].map(([a, b]) => p(a, b)), 'paper', .8, .4);
    line(H, R, [p(-39, -8), p(-10, -13), p(23, -10)], 1.6, 'teal', .6);
    for (let k = 0; k < 7; k++) line(H, R, [p(-34 + k * 8, -3), p(-28 + k * 8, 2)], .5, 'paper', .7);
  });
  shape(H, R, [p(4, -15), p(-3, -31), p(19, -15)], 'blue', .8, .6);
  shape(H, R, [p(20, 1), p(4, 18), p(29, 7)], 'teal', .6, .6);
  stroke(H, R, [p(31, -10), p(27, 0), p(31, 7)], 'blue', 1);
  H.dot(...p(37, -4), 2.1, 'paper', 1, { knock: true });
  H.dot(...p(37, -4), .9, 'blue', 1);
  line(H, R, [p(40, 3), p(46, 0)], .8);
  shape(H, R, [p(-6, 10), p(6, 9), p(8, 17), p(-4, 18)], 'sun', .7, .5);
}

function cart(H, R, i, j) {
  for (const a of [i + .15, i + 1.35]) for (const b of [j + .15, j + 1]) oval(H, R, ...H.p(a, b, .14), 4, 6, 'blue', .9);
  box(H, R, i, j, 1.55, 1.2, .28, .13, 'teal', .6);
  tub(H, R, i + .15, j + .1, .42, true);
  for (const a of [i + .12, i + 1.42]) line(H, R, [H.p(a, j + 1.15, .35), H.p(a, j + 1.15, 1.3)], 2.1);
  line(H, R, [H.p(i + .12, j + 1.15, 1.3), H.p(i + 1.42, j + 1.15, 1.3)], 2.8);
  box(H, R, i + 1.3, j + .2, .12, .4, .44, .16, 'coral', .8);
}

export default world('tokyo-toyosu-dawn', 'Toyosu · Before the first bid', {
  floor: 'blue', tone: .2, wall: 'paper', wallTone: .82, height: 3.8, head: 20,
}, (H, R) => {
  for (const side of ['nw', 'ne']) {
    for (let p = 0; p < 12; p += 1.25) line(H, R, [wallPt(H, side, p, .25, .02), wallPt(H, side, p, 3.8, .02)], .75, 'blue', .42);
    shape(H, R, wallRect(H, side, .05, 11.95, .15, .65), 'blue', .5, .7);
  }
  for (const p of [1.1, 3.25]) {
    shape(H, R, wallRect(H, 'ne', p, p + 2.05, .68, 3.5), 'blue', .35, 1.1);
    shape(H, R, wallRect(H, 'ne', p + .1, p + 1.95, .8, 3.36, .04), 'paper', .9, .7);
    line(H, R, [wallPt(H, 'ne', p + 1.7, 1.5, .07), wallPt(H, 'ne', p + 1.7, 2.2, .07)], 3);
    shape(H, R, wallRect(H, 'ne', p + .2, p + 1.8, 2.45, 3.1, .06), 'teal', .35, .75);
  }
  shape(H, R, wallRect(H, 'ne', 6.25, 11.45, 2.4, 3.45), 'blue', .75, .9);
  for (let p = 6.5; p < 11.5; p += 1.1) line(H, R, [wallPt(H, 'ne', p, 2.4, .04), wallPt(H, 'ne', p, 3.45, .04)], 1.8, 'paper');
  line(H, R, [H.p(6.3, .6, 1.05), H.p(11.5, .6, 1.05)], 2, 'teal');
  for (const i of [6.3, 8.8, 11.5]) line(H, R, [H.p(i, .6, .03), H.p(i, .6, 1.05)], 2);
  for (const j of [2.5, 6.7]) {
    line(H, R, [H.p(.3, j, 3.65), H.p(10.6, j, 3.65)], 2.5);
    for (const i of [1.2, 6.6]) {
      box(H, R, i, j - .11, 2.7, .22, 3.58, .1, 'paper', 1);
      line(H, R, [H.p(i + .1, j + .12, 3.6), H.p(i + 2.6, j + .12, 3.6)], 2.2, 'paper');
    }
  }
  const [cx, cy] = wallPt(H, 'nw', 2.35, 2.8, .09);
  oval(H, R, cx, cy, 16, 16, 'paper', 1);
  for (let k = 0; k < 12; k++) {
    const a = k * Math.PI / 6;
    line(H, R, [[cx + Math.sin(a) * 12, cy + Math.cos(a) * 12], [cx + Math.sin(a) * 14, cy + Math.cos(a) * 14]], .7);
  }
  line(H, R, [[cx, cy - 8], [cx, cy], [cx - 8, cy + 3]], 1.4);
  for (let k = 0; k < 3; k++) {
    tub(H, R, .5, 3.45 + k * 1.08, 0, k === 2);
    if (k !== 2) tub(H, R, .5, 3.45 + k * 1.08, .5);
  }
  table(H, R, .7, 7.1, 2.3, 1.45, .9, 'paper');
  box(H, R, .9, 7.25, 1.5, .9, 1.04, .17, 'blue', .5);
  box(H, R, .95, 7.3, 1.4, .8, 1.22, .07, 'paper', 1);
  line(H, R, [H.p(2.5, 7.2, 1), H.p(2.5, 7.2, 1.85)], 2.6);
  box(H, R, 2.23, 7.08, .68, .15, 1.7, .38, 'blue', .75);
  const [sx, sy] = H.p(2.61, 7.25, 1.92);
  for (let n = 0; n < 3; n++) H.dot(sx - 6 + n * 5, sy, 1.3, 'sun', 1);
  for (let k = 0; k < 3; k++) {
    const i = 4.45 + k * 1.85, j = 3.75 + k * .9;
    box(H, R, i - 1.45, j - .6, 2.9, 1.12, .02, .13, 'paper', .82);
    for (let n = 0; n < 7; n++) line(H, R, [H.p(i - 1.3 + n * .4, j - .55, .16), H.p(i - 1.3 + n * .4, j + .47, .16)], .7, 'teal', .5);
    tuna(H, R, i, j, .15);
  }
  for (const j of [8.85, 10.55]) line(H, R, [H.p(3.4, j, .01), H.p(11.6, j, .01)], 2, 'paper', .8);
  for (const i of [4.1, 6.2, 8.3, 10.4]) {
    const p = H.p(i, 9.7, .02);
    shape(H, R, [[p[0] - 8, p[1] - 3], [p[0] + 10, p[1] + 3], [p[0] + 2, p[1] + 8], [p[0] + 1, p[1] + 2]], 'paper', .5, .3);
  }
  for (const j of [6.75, 11.3]) {
    shape(H, R, H.tile(3.6, j, 7.3, .25, .02), 'blue', .72, .5);
    for (let i = 3.7; i < 10.8; i += .18) line(H, R, [H.p(i, j, .03), H.p(i, j + .25, .03)], .8, 'paper');
  }
  for (const j of [9.1, 9.65]) stroke(H, R, [H.p(5.2, j, .03), H.p(7.2, j - .4, .03), H.p(10.2, j - .5, .03)], 'teal', 2.1, .28);
  for (let k = 0; k < 10; k++) H.tint(ell(...H.p(3.9 + R() * 6, 7.2 + R() * 3, .02), 10 + R() * 15, 2 + R() * 2), 'paper', .3);
  const [hx, hy] = wallPt(H, 'nw', 9.2, 1.55, .1);
  oval(H, R, hx, hy, 21, 23, 'blue', .7);
  for (const r of [8, 12, 16, 19]) H.outline(R, ell(hx, hy, r, r * 1.05), 'teal', 2, { tone: .8, amp: .1 });
  stroke(H, R, [[hx + 16, hy + 8], [hx + 23, hy + 50], [hx + 65, hy + 69], [hx + 72, hy + 59]], 'teal', 2.4);
  for (const i of [.7, 1.15]) {
    box(H, R, i, 10.4, .29, .44, .02, .48, 'blue', .85);
    box(H, R, i, 10.66, .3, .3, .02, .17, 'blue', .9);
  }
  for (const [i, ink] of [[8.25, 'coral'], [9.2, 'paper']]) {
    line(H, R, [wallPt(H, 'ne', i, 2.05, .06), wallPt(H, 'ne', i, 1.75, .08)], .8);
    shape(H, R, [H.p(i - .17, .09, 1.82), H.p(i + .17, .09, 1.82), H.p(i + .38, .09, .85), H.p(i - .38, .09, .85)], ink, .85, .7);
  }
  box(H, R, 10.65, 1.65, .3, 1.45, .1, .12, 'sun', .6);
  box(H, R, 11.15, 1.65, .3, 1.45, .1, .12, 'sun', .6);
  stroke(H, R, [H.p(10.88, 1.5, .2), H.p(10.85, 1.5, 1.15), H.p(11.38, 1.5, 1.2), H.p(11.38, 1.5, .6)], 'blue', 2.4);
  table(H, R, .55, .75, 1.15, .75, .87, 'teal');
  const [tx, ty] = H.p(1.1, 1.05, 1.02);
  shape(H, R, [[tx - 5, ty], [tx + 5, ty], [tx + 5, ty - 23], [tx - 5, ty - 23]], 'paper', 1, .6);
  oval(H, R, tx, ty - 23, 5, 2, 'blue', .6);
  oval(H, R, tx + 17, ty + 3, 5, 3, 'sun', .8);
  line(H, R, [[tx + 13, ty + 1], [tx + 13, ty - 6], [tx + 21, ty - 6], [tx + 21, ty + 1]], .7);
  box(H, R, 2.05, 7.9, .63, .42, 1.03, .07, 'paper', 1);
  const [gx, gy] = H.p(1.9, 8.2, 1.08);
  for (let k = 0; k < 4; k++) line(H, R, [[gx + k * 2.5, gy], [gx + k * 2.5 - 3, gy - 7]], 2.5, 'sun', .6);
}, (H, R, t) => {
  const u = cycle(t, 14), inspect = Math.sin(Math.PI * Math.max(0, Math.min(1, (u - .12) / .62))) ** 2;
  H.at(5.35, 2.85, 0, HH => {
    actor(HH, R, 5.35, 2.85, inspect * 1.5, 'water', { shirt: ['blue', .62], hairStyle: 'cap', apron: ['paper', 1] }, 0, 1.2);
    const [x, y] = HH.p(4.55 + inspect * .9, 3.75, .56);
    shape(HH, R, [[x - 5, y - 12], [x + 8, y - 9], [x + 6, y - 3], [x - 6, y - 5]], 'blue', .9, .65);
    HH.tint([[x - 3, y - 3], [x - 24, y + 10], [x + 23, y + 18], [x + 7, y]], 'sun', .3);
  });
  H.at(8.1, 4.05, 0, HH => actor(HH, R, 8.1, 4.05, t * .5, 'think', { shirt: ['teal', .8], hairStyle: 'cap' }, 0, 1.2));
  const park = u < .17 ? (1 - Math.cos(u / .17 * Math.PI)) / 2 : u < .85 ? 1 : (1 + Math.cos((u - .85) / .15 * Math.PI)) / 2;
  const j = 9.35 - park * 1.4;
  H.at(10.45, j + 1.75, 0, HH => actor(HH, R, 10.45, j + 1.75, (u < .17 || u > .85) ? t : 2, 'hold', { shirt: ['paper', 1], apron: ['coral', .78], hairStyle: 'cap' }, 0, 1.2));
  H.at(10.2, j + .7, 0, HH => cart(HH, R, 9.55, j));
  steam(H, R, ...H.p(1.5, 1.1, 1.2), t, 1, 'paper');
});
