import { world, shape, oval, stroke, box, actor, cycle, wallRect, wallPt, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

function line(H, R, points, width = 1, ink = 'blue', tone = .8) {
  H.line(R, points, ink, width, { tone, amp: .06 });
}

function panel(H, R, side, a, b, z0, z1, ink = 'paper', tone = 1, off = .04) {
  shape(H, R, wallRect(H, side, a, b, z0, z1, off), ink, tone, .65);
}

function bag(H, R, i, j, z, ink = 'blue') {
  box(H, R, i, j, .58, .3, z, .56, ink, .8);
  stroke(H, R, [H.p(i + .12, j + .12, z + .57), H.p(i + .17, j + .12, z + .79), H.p(i + .43, j + .12, z + .79), H.p(i + .48, j + .12, z + .57)], ink, 1.4);
  line(H, R, [H.p(i + .09, j + .31, z + .29), H.p(i + .49, j + .31, z + .29)], .7, 'paper');
}

function bench(H, R, i, j, count, rear = true) {
  box(H, R, i, j, count * 1.15, 1.24, .38, .2, 'blue', .55);
  box(H, R, i, rear ? j : j + 1.03, count * 1.15, .2, .57, .86, 'teal', .73);
  for (let k = 0; k < count; k++) {
    box(H, R, i + k * 1.15 + .035, j + .2, 1.07, .99, .59, .19, 'teal', .62);
    line(H, R, [H.p(i + k * 1.15 + .15, j + .23, .8), H.p(i + k * 1.15 + .93, j + .23, .8)], .7, 'paper', .55);
  }
  for (const x of [i - .05, i + count * 1.15]) {
    line(H, R, [H.p(x, j + .2, .54), H.p(x, j + .2, 1.65), H.p(x, j + .97, 1.65), H.p(x, j + 1.06, .6)], 2.7, 'paper');
    line(H, R, [H.p(x, j + .2, .54), H.p(x, j + .2, 1.65), H.p(x, j + .97, 1.65), H.p(x, j + 1.06, .6)], .8);
  }
}

function windowView(H, R, shift) {
  const bounds = wallRect(H, 'ne', 1.35, 10.9, 1.65, 3.08, .06);
  H.clip(bounds, () => {
    H.fill(bounds, 'paper', 1);
    for (let k = -1; k < 4; k++) {
      const x = k * 6 + shift;
      panel(H, R, 'ne', x, x + 3.05, 1.63, 2.41, 'teal', .2, .08);
      panel(H, R, 'ne', x + 3.15, x + 5.85, 1.63, 2.1, 'blue', .22, .08);
      for (let n = 0; n < 4; n++) panel(H, R, 'ne', x + .23 + n * .68, x + .57 + n * .68, 1.92, 2.15, 'blue', .45, .09);
      const [tx, ty] = wallPt(H, 'ne', x + 1.3, 2.48, .1);
      shape(H, R, [[tx - 7, ty], [tx + 7, ty + 4], [tx + 7, ty - 13], [tx - 7, ty - 17]], 'paper', 1, .6);
      oval(H, R, tx, ty - 15, 7, 3, 'blue', .35);
      line(H, R, [[tx - 5, ty + 1], [tx - 5, ty + 7]], .8);
      line(H, R, [[tx + 5, ty + 4], [tx + 5, ty + 10]], .8);
      line(H, R, [wallPt(H, 'ne', x + 4.8, 1.5, .12), wallPt(H, 'ne', x + 4.8, 3.35, .12)], 2);
      line(H, R, [wallPt(H, 'ne', x + 4.15, 2.9, .12), wallPt(H, 'ne', x + 5.45, 2.9, .12)], 1.2);
      line(H, R, [wallPt(H, 'ne', x + 3, 3.05, .12), wallPt(H, 'ne', x + 6, 3.05, .12)], .6);
    }
    panel(H, R, 'ne', .7, 11.4, 1.64, 1.88, 'blue', .3, .13);
  });
  for (const i of [1.35, 4.5, 7.65, 10.9]) line(H, R, [wallPt(H, 'ne', i, 1.63, .15), wallPt(H, 'ne', i, 3.1, .15)], 4.5, 'paper');
  H.outline(R, bounds, 'blue', 1.5, { tone: .9, amp: .05 });
  for (const i of [2.3, 5.5, 8.7]) line(H, R, [wallPt(H, 'ne', i, 1.95, .16), wallPt(H, 'ne', i + .5, 2.72, .16)], 1.3, 'paper', .55);
}

function stroller(H, R) {
  const p = (a, b, z) => H.p(9.3 + a, 5.3 + b, z);
  for (const a of [0, .65]) for (const b of [0, .45]) oval(H, R, ...p(a, b, .1), 4, 5, 'blue', .8);
  line(H, R, [p(0, 0, .12), p(.22, .16, 1.43), p(.55, .15, 1.43)], 2.3);
  line(H, R, [p(.65, .45, .12), p(.3, .13, 1.3)], 2.3);
  shape(H, R, [p(.1, .1, .38), p(.53, .17, .38), p(.46, .15, 1.12), p(.16, .12, 1.15)], 'coral', .5, .8);
  line(H, R, [p(.1, .1, .65), p(.53, .17, .65)], 2, 'blue');
}

const room = world('tokyo-yamanote-carriage', 'Yamanote Line · The city between stations', {
  wall: false, floor: 'blue', tone: .16, head: 20,
}, (H, R) => {
  shape(H, R, H.faceI(0, 0, 12, 0, 3.7), 'paper', 1, 1);
  shape(H, R, H.faceJ(0, 0, 12, 0, 3.7), 'paper', .87, 1);
  panel(H, R, 'ne', 0, 12, .04, .45, 'teal', .55);
  panel(H, R, 'nw', 0, 12, .04, .45, 'teal', .55);
  panel(H, R, 'ne', 0, 12, 3.42, 3.7, 'blue', .18);
  for (let i = .35; i < 11.7; i += .3) line(H, R, [wallPt(H, 'ne', i, 3.49, .06), wallPt(H, 'ne', i + .12, 3.64, .06)], .7);
  panel(H, R, 'nw', 4.2, 7.7, .05, 3.33, 'blue', .7);
  panel(H, R, 'nw', 4.27, 7.63, .08, 3.24, 'paper', 1, .06);
  panel(H, R, 'nw', 4.27, 7.63, .1, .48, 'sun', .55, .08);
  for (let j = 4.4; j < 7.55; j += .26) line(H, R, [H.p(.02, j, .14), H.p(.28, j, .14)], .7);
  panel(H, R, 'nw', 4.14, 7.75, 3.3, 3.49, 'teal', .8, .1);
  for (let k = 0; k < 8; k++) H.dot(...wallPt(H, 'nw', 4.5 + k * .38, 3.6, .08), k === 3 ? 2.6 : 1.7, k === 3 ? 'coral' : 'teal', .8);
  for (const j of [2, 9.45]) {
    panel(H, R, 'nw', j - .8, j + .8, 1.62, 2.9, 'blue', .24);
    line(H, R, [wallPt(H, 'nw', j - .7, 1.82, .08), wallPt(H, 'nw', j + .25, 2.71, .08)], 1.2, 'paper');
  }
  for (const j of [3.8, 8.05]) line(H, R, [wallPt(H, 'nw', j, .55, .08), wallPt(H, 'nw', j, 3.21, .08)], 2.4);
  bench(H, R, 1.25, .68, 8);
  for (const i of [1.3, 5.75, 10.4]) line(H, R, [H.p(i, 2.45, 0), H.p(i, 2.45, 3.52)], 3, 'paper');
  for (const i of [1.3, 5.75, 10.4]) line(H, R, [H.p(i, 2.45, 0), H.p(i, 2.45, 3.52)], .95);
  for (const j of [2.5, 8.2]) {
    line(H, R, [H.p(1.3, j, 3.53), H.p(10.45, j, 3.53)], 2.4);
    box(H, R, 1.45, j - .12, 8.9, .23, 3.65, .08, 'paper', 1);
  }
  for (let i = 1.5; i < 10.7; i += .4) line(H, R, [H.p(i, .15, 3.18), H.p(i, 1.15, 3.18)], .85);
  line(H, R, [H.p(1.3, 1.15, 3.18), H.p(10.7, 1.15, 3.18)], 2.1);
  for (const i of [1.4, 4.5, 7.65, 10.65]) line(H, R, [H.p(i, .1, 3.58), H.p(i, 1.14, 3.18)], 1.2);
  box(H, R, 7.9, .35, 1.25, .48, 3.22, .35, 'blue', .6);
  line(H, R, [H.p(8.2, .6, 3.56), H.p(8.24, .6, 3.75), H.p(8.75, .6, 3.75), H.p(8.8, .6, 3.56)], 1.1);
  bag(H, R, 4.4, 2.0, .01, 'blue');
  bag(H, R, 10.1, 2.2, .01, 'coral');
  box(H, R, 6.05, 1.0, .5, .46, .79, .65, 'sun', .65);
  line(H, R, [H.p(6.08, 1.47, 1.2), H.p(6.53, 1.47, 1.2)], .9, 'paper');
  const [ux, uy] = H.p(4.12, 1.65, .07);
  shape(H, R, [[ux - 5, uy - 9], [ux - 3, uy - 41], [ux + 2, uy - 41], [ux + 6, uy - 9], [ux, uy]], 'coral', .85, .65);
  stroke(H, R, [[ux, uy - 40], [ux, uy - 51], [ux + 7, uy - 52], [ux + 7, uy - 46]], 'blue', 1.5);
  for (const dx of [-2, 2]) line(H, R, [[ux + dx, uy - 38], [ux + dx * 1.8, uy - 10]], .45, 'paper');
  const [cx, cy] = H.p(2.1, 2.35, .05);
  stroke(H, R, [[cx, cy], [cx - 2, cy - 46], [cx + 6, cy - 49], [cx + 9, cy - 44]], 'blue', 2.4);
  stroller(H, R);
  for (const i of [1.7, 2.4]) {
    const [x, y] = wallPt(H, 'ne', i, 3.31, .1);
    H.dot(x, y - 3, 2, 'teal', .8);
    line(H, R, [[x, y], [x, y + 6], [x + 5, y + 6], [x + 6, y + 10]], 1.5, 'teal');
    line(H, R, [[x - 3, y + 1], [x - 3, y + 8], [x + 3, y + 8]], 1, 'teal');
  }
  line(H, R, [H.p(.55, 3.5, .01), H.p(.55, 8.15, .01)], 2, 'sun');
  for (let i = .8; i < 11.6; i += .8) line(H, R, [H.p(i, 3.65, .01), H.p(i + .3, 3.65, .01)], .5, 'blue', .25);
  for (const j of [9.7, 10.9]) line(H, R, [H.p(5.8, j, .02), H.p(11.7, j, .02)], 1, 'blue', .28);
}, (H, R, t) => {
  const s = cycle(t, 18) * 18;
  const distance = s < 4 ? s - s * s / 8 : s < 12 ? 2 : s < 16 ? 2 + (s - 12) ** 2 / 8 : 4 + s - 16;
  const moving = s < 4 ? 1 - s / 4 : s < 12 ? 0 : s < 16 ? (s - 12) / 4 : 1;
  const opening = s < 4.6 ? 0 : s < 5.6 ? (s - 4.6) : s < 10.2 ? 1 : s < 11.2 ? 11.2 - s : 0;
  const door = opening * opening * (3 - 2 * opening);
  windowView(H, R, -(distance * 2 % 6));
  H.clip(wallRect(H, 'nw', 4.2, 7.7, .05, 3.28, .1), () => {
    for (const [a, b, offset] of [[4.22, 5.95, -door * 1.7], [5.95, 7.68, door * 1.7]]) {
      panel(H, R, 'nw', a + offset, b + offset, .08, 3.27, 'paper', .88, .14);
      panel(H, R, 'nw', a + .23 + offset, b - .23 + offset, 1.48, 2.85, 'blue', .26, .16);
      panel(H, R, 'nw', a + offset, b + offset, .59, .85, 'teal', .85, .17);
      line(H, R, [wallPt(H, 'nw', b - .04 + offset, .08, .18), wallPt(H, 'nw', b - .04 + offset, 3.25, .18)], 1.8);
    }
  });
  for (const j of [2.5, 8.2]) for (let k = 0; k < 7; k++) {
    const i = 1.6 + k * 1.36, z = k % 3 ? 2.68 : 2.48;
    const [x, y] = H.p(i, j, z), sway = Math.sin(t * 1.65) * 3.5 * moving;
    line(H, R, [H.p(i, j, 3.52), [x + sway, y - 8]], 1.7, 'paper');
    line(H, R, [H.p(i, j, 3.52), [x + sway, y - 8]], .55);
    H.outline(R, [[x + sway, y - 9], [x - 6 + sway, y + 2], [x + 6 + sway, y + 2]], 'paper', 3.2, { tone: 1, amp: .05 });
    H.outline(R, [[x + sway, y - 9], [x - 6 + sway, y + 2], [x + 6 + sway, y + 2]], 'blue', .65, { tone: .8, amp: .05 });
  }
  H.at(2.65, 1.55, .78, HH => actor(HH, R, 2.65, 1.55, s * .2, 'read', {
    shirt: ['paper', 1], glasses: true, hairStyle: 'short', hair: ['blue', .35], prop: (h, r, p) => {
      const [x, y] = p.nearHand;
      shape(h, r, [[x - 16, y - 8], [x, y - 5], [x + 14, y - 10], [x + 13, y + 7], [x, y + 10], [x - 15, y + 6]], 'paper', 1, .6);
      line(h, r, [[x, y - 5], [x, y + 10]], .65);
      for (let k = 0; k < 4; k++) line(h, r, [[x - 12, y - 3 + k * 2.5], [x - 3, y - 1 + k * 2.5]], .4, 'blue', .5);
    },
  }, .78, 1.15, 'elder'));
  H.at(7.3, 3.2, 0, HH => actor(HH, R, 7.3, 3.2, moving ? t * .2 : 0, 'reach', { shirt: ['blue', .68], hairStyle: 'short' }, 0, 1.32));
  H.at(10.1, 5.8, 0, HH => actor(HH, R, 10.1, 5.8, moving ? t * .16 : 0, 'hold', { shirt: ['teal', .7], hairStyle: 'pony' }, 0, 1.23));
  if (s < 7.4) {
    const progress = Math.max(0, Math.min(1, (s - 6) / 1.4));
    const i = 2.7 * (1 - progress);
    H.at(i, 5.85, 0, HH => {
      HH.opacity(Math.min(1, (1 - progress) * 5), () => actor(HH, R, i, 5.85, s > 6 ? t : 0, s > 6 ? 'walk' : 'idle', { shirt: ['coral', .7], face: s > 6 ? 'nw' : 'se' }, 0, 1.17));
    });
  }
  if (s > 8) {
    const progress = Math.max(0, Math.min(1, (s - 8) / 1.7));
    const i = .15 + progress * 2.55;
    H.at(i, 5.85, 0, HH => {
      const [x, y] = HH.p(i, 5.85, 0);
      FIGURES.draw(HH, R, { who: 'adult', x, y, t, clip: progress < 1 ? 'walk' : 'idle', phase: progress < 1 ? t : 0, scale: 1.17, face: 'se', opacity: Math.min(1, progress * 6), opts: { shirt: ['coral', .7] } });
    });
  }
});

room.over = (H, R) => {
  bench(H, R, 6.2, 9.35, 4, false);
  bag(H, R, 10.7, 9.7, .01, 'blue');
  box(H, R, 5.85, 11.63, 5.8, .24, 0, .4, 'paper', .85);
  box(H, R, 5.85, 11.66, 5.8, .25, .17, .1, 'teal', .85);
};

export default room;
