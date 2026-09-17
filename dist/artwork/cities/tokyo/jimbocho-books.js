import { world, box, table, shape, oval, stroke, wallRect, wallPt, lamp, cycle } from '../../worlds/common.js';
import { FIGURES, arcPts } from '../../drawings.js';

const colors = ['coral', 'blue', 'paper', 'sun', 'teal'];

function volume(H, R, i, j, z, w, h, ink) {
  box(H, R, i, j, w, .49, z, h, ink, .58);
  for (const d of [.08, h - .08]) H.line(R, [H.p(i + .02, j + .5, z + d), H.p(i + w - .02, j + .5, z + d)], 'sun', .65, { tone: .7 });
}

function stack(H, R, i, j, z, n, tied = false) {
  for (let k = 0; k < n; k++) {
    box(H, R, i + (k % 2) * .035, j, .76, .62, z + k * .105, .09, colors[k % 5], .62);
    H.line(R, [H.p(i + .05, j + .63, z + k * .105 + .045), H.p(i + .7, j + .63, z + k * .105 + .045)], 'paper', .8);
  }
  if (tied) for (const di of [.22, .55]) H.line(R, [H.p(i + di, j, z + n * .105), H.p(i + di, j + .64, z + n * .105), H.p(i + di, j + .64, z)], 'paper', 1.2);
}

function repairDesk(H, R) {
  table(H, R, 1.2, 5.55, 3.65, 1.75, 1.04, 'sun');
  shape(H, R, H.tile(2, 5.78, 2, 1.28, 1.17), 'teal', .5);
  const [x, y] = H.p(2.9, 6.45, 1.19);
  shape(H, R, [[x - 24, y - 5], [x, y - 11], [x + 22, y - 4], [x + 20, y + 10], [x, y + 5], [x - 24, y + 10]], 'paper', 1);
  H.line(R, [[x, y - 10], [x, y + 5]], 'blue', .65);
  for (let k = 0; k < 4; k++) H.line(R, [[x - 19, y - 2 + k * 2.1], [x - 5, y - 5 + k * 2.1]], 'blue', .4, { tone: .35 });
  for (const d of [-18, 17]) oval(H, R, x + d, y + 3, 3, 6, 'blue', .65);
  shape(H, R, H.tile(3.8, 6.3, .68, .54, 1.2), 'paper', 1);
  const [gx, gy] = H.p(1.65, 6.6, 1.18);
  oval(H, R, gx, gy - 8, 5, 7, 'paper', 1);
  oval(H, R, gx, gy - 15, 5, 2, 'sun', .6);
  H.line(R, [[gx + 9, gy + 3], [gx + 18, gy - 8]], 'blue', 1.6);
  oval(H, R, gx + 20, gy - 11, 6, 5, 'paper', .9);
  const [lx, ly] = H.p(1.6, 5.95, 1.17);
  lamp(H, R, lx, ly, 37, { ink: 'teal' });
  H.glow(lx, ly - 10, 43, 22, 'sun', .19);
  const [tx, ty] = H.p(4.5, 5.93, 1.17);
  shape(H, R, [[tx - 5, ty], [tx + 5, ty], [tx + 6, ty - 10], [tx - 6, ty - 10]], 'paper', 1);
  oval(H, R, tx, ty - 10, 6, 2, 'coral', .3);
  H.line(R, arcPts(tx + 6, ty - 6, 3, 3, -Math.PI / 2, Math.PI / 2, 9), 'blue', 1);
}

const room = world('tokyo-jimbocho-books', 'One book too many — Jimbocho secondhand bookshop', { floor: 'sun', tone: .24, wall: 'paper', wallTone: 1, height: 4.4, head: 20, pattern: 'boards' }, (H, R) => {
  for (const i of [.38, 3.05, 5.75, 8.5, 11.45]) box(H, R, i, .3, .13, .77, .15, 3.85, 'blue', .75);
  for (let row = 0; row < 4; row++) {
    const z = .35 + row * .94;
    box(H, R, .38, .3, 11.2, .82, z, .1, 'coral', .45);
    for (let k = 0; k < 37; k++) {
      if (row === 1 && k > 22 && k < 26) continue;
      const w = .18 + (k % 3) * .035;
      volume(H, R, .57 + k * .287, .54, z + .11, w, .5 + (k * 7 % 6) * .042, colors[(k + row) % 5]);
    }
  }
  for (let row = 0; row < 3; row++) {
    const z = .4 + row * 1.06;
    box(H, R, .28, 1.4, .8, 3.5, z, .1, 'sun', .58);
    for (let k = 0; k < 12; k++) box(H, R, .4, 1.57 + k * .265, .48, .2, z + .1, .55 + k % 3 * .09, colors[(row + k) % 5], .5);
  }
  H.line(R, [H.p(.4, 1.25, 3.5), H.p(11.3, 1.25, 3.5)], 'blue', 2);
  for (const i of [4.35, 5.15]) H.line(R, [H.p(i, 2.18, .06), H.p(i, 1.3, 3.62)], 'sun', 4);
  for (let k = 0; k < 9; k++) H.line(R, [H.p(4.35, 2.14 - k * .098, .16 + k * .39), H.p(5.15, 2.14 - k * .098, .16 + k * .39)], 'blue', 2);
  for (const i of [4.35, 5.15]) oval(H, R, ...H.p(i, 2.18, .07), 4, 4, 'blue', .8);
  const print = wallRect(H, 'nw', 5.3, 7.55, 1.1, 2.6, -.02);
  shape(H, R, print, 'sun', .2);
  H.clip(print, () => {
    shape(H, R, wallRect(H, 'nw', 5.4, 7.45, 1.2, 1.62, -.025), 'teal', .35);
    stroke(H, R, [wallPt(H, 'nw', 5.4, 1.65), wallPt(H, 'nw', 6.35, 2.15), wallPt(H, 'nw', 7.45, 1.67)], 'coral', 4);
    for (let k = 0; k < 7; k++) H.line(R, [wallPt(H, 'nw', 5.55 + k * .28, 1.55), wallPt(H, 'nw', 5.55 + k * .28, 1.87)], 'blue', .8);
  });
  shape(H, R, wallRect(H, 'nw', 8.35, 11.4, .05, 3.4), 'teal', .15);
  for (const j of [8.35, 9.85, 11.4]) H.line(R, [H.p(.02, j, .05), H.p(.02, j, 3.4)], 'blue', 2.5);
  H.tint(H.tile(.1, 8.5, 4.5, 2.3, .03), 'sun', .16);
  for (const [i, j] of [[6.2, 3.5], [8.5, 6.1]]) {
    table(H, R, i, j, 2.05, 1.45, .62, 'coral');
    for (const di of [.14, 1.8]) for (const dj of [.1, 1.3]) oval(H, R, ...H.p(i + di, j + dj, .08), 3, 4, 'blue', .8);
    for (let k = 0; k < 6; k++) volume(H, R, i + .13 + k * .29, j + .12, .75, .2, .43 + k % 2 * .12, colors[k % 5]);
    for (let k = 0; k < 4; k++) box(H, R, i + .13 + k * .43, j + .82, .37, .48, .75, .07, colors[(k + 2) % 5], .5);
    H.line(R, [H.p(i, j + 1.47, .72), H.p(i + 2, j + 1.47, .72)], 'blue', 1.8);
  }
  stack(H, R, 10.65, 2.1, 0, 5, true);
  stack(H, R, 9.7, 2.2, 0, 4, true);
  box(H, R, 9.7, 3.15, 1.48, .7, 0, .65, 'sun', .55);
  for (let k = 0; k < 6; k++) {
    const [x, y] = H.p(9.84 + k * .22, 3.55, .65);
    H.line(R, [[x, y], [x + 6 - k, y - 27 - k % 2 * 8]], 'paper', 5);
    oval(H, R, x + 6 - k, y - 27 - k % 2 * 8, 3, 2, 'sun', .45);
  }
  table(H, R, 3.05, 4.7, .65, .62, .5, 'teal');
  repairDesk(H, R);
  stack(H, R, 1.42, 7.75, 0, 6, true);
  box(H, R, 2.75, 8.2, .85, .38, 0, .9, 'paper', 1);
  for (let k = 0; k < 6; k++) H.line(R, [H.p(2.84 + k * .12, 8.59, .13), H.p(2.84 + k * .12, 8.59, .75)], 'coral', 1.2, { tone: .5 });
  const [bx, by] = H.p(7.4, 9.15, 0);
  shape(H, R, [[bx - 12, by], [bx + 12, by], [bx + 10, by - 25], [bx - 10, by - 25]], 'blue', .7);
  H.line(R, arcPts(bx, by - 25, 7, 10, Math.PI, Math.PI * 2, 10), 'blue', 2);
  H.line(R, [[bx - 6, by - 9], [bx + 6, by - 11]], 'paper', .8);
}, (H, R, t) => {
  const u = cycle(t, 15), lift = Math.sin(Math.PI * Math.min(1, Math.max(0, (u - .15) / .65)));
  H.at(3.35, 4.8, 0, HH => {
    FIGURES.draw(HH, R, { who: 'elder', x: HH.p(3.35, 4.8)[0], y: HH.p(3.35, 4.8)[1], t, clip: 'write', phase: t / 4, scale: 1.2, face: 'se', opts: { shirt: ['coral', .65], apron: ['paper', 1], glasses: true, prop: (A, B, p) => {
      const [x, y] = p.nearHand;
      A.line(B, [[x, y], [x + 12, y + 9 + Math.sin(t * 1.1) * 2]], 'sun', 1.5);
      A.line(B, [[x + 12, y + 9], [x + 15, y + 12]], 'blue', 2);
    } } });
    repairDesk(HH, R);
  });
  H.at(7.25, 7.7, 0, HH => {
    const [x, y] = HH.p(7.25, 7.7);
    FIGURES.draw(HH, R, { who: 'adult', x, y, t, clip: u < .25 ? 'think' : 'hold', phase: t / 7, scale: 1.25, face: 'se', opts: { shirt: ['teal', .7], hairStyle: 'pony', prop: (A, B, p) => {
      const [hx, hy] = p.farHand;
      for (let k = 0; k < 3; k++) shape(A, B, [[hx - 13, hy - k * 4], [hx + 12, hy - k * 4], [hx + 12, hy - 3 - k * 4], [hx - 13, hy - 3 - k * 4]], colors[k], .65, .65);
      const [qx, qy] = p.nearHand;
      shape(A, B, [[qx - 8, qy - lift * 11], [qx + 9, qy - 2 - lift * 11], [qx + 10, qy - 18 - lift * 11], [qx - 7, qy - 16 - lift * 11]], 'sun', .65, .7);
      A.line(B, [[qx + 6, qy - 4 - lift * 11], [qx + 7, qy - 15 - lift * 11]], 'paper', 1);
    } } });
  });
  H.at(.1, 9.8, 3, HH => {
    const sway = Math.sin(t * .42) * 2;
    for (let k = 0; k < 3; k++) {
      const a = HH.p(.03, 8.45 + k * .94, 3.15), b = HH.p(.03, 9.32 + k * .94, 3.15);
      shape(HH, R, [a, b, [b[0] + sway, b[1] + 20], [a[0] + sway, a[1] + 20]], 'coral', .55, .65);
    }
  });
});

export default room;
