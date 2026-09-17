import { world, box, table, shape, oval, stroke, windowOn, cycle, lamp, ell } from '../../worlds/common.js';
import { FIGURES, arcPts } from '../../drawings.js';

function glass(H, R, x, y, ink = 'blue', s = 1, cut = 2, turn = 0) {
  const p = (a, b) => [x + a * s, y + b * s];
  const body = [p(-9, -24), p(9, -24), p(7, 0), p(-7, 0)];
  shape(H, R, body, ink, .64, .7);
  H.clip(body, () => {
    if (cut) {
      for (let k = -3; k < 5; k++) {
        const a = k * 7 + turn % 7;
        H.line(R, [p(a - 13, -25), p(a + 12, 2)], 'paper', 1.1 * s, { tone: .9, amp: 0 });
        if (cut > 1) H.line(R, [p(a + 13, -25), p(a - 12, 2)], 'paper', 1.1 * s, { tone: .9, amp: 0 });
      }
    }
    H.line(R, [p(-5, -21), p(-4, -4)], 'paper', 1.5 * s, { tone: .7 });
  });
  oval(H, R, x, y - 24 * s, 9 * s, 3 * s, 'paper', 1);
  oval(H, R, x, y - 24 * s, 7 * s, 1.5 * s, ink, .3);
  H.line(R, arcPts(x, y - 1, 7 * s, 2 * s, 0, Math.PI, 10), 'paper', 1.2);
}

function basin(H, R, i, j, z, w = 1.4) {
  box(H, R, i, j, w, .9, z, .12, 'blue', .55);
  shape(H, R, H.tile(i + .09, j + .09, w - .18, .72, z + .13), 'teal', .2);
  for (let k = 0; k < 3; k++) H.line(R, [H.p(i + .2, j + .2 + k * .2, z + .14), H.p(i + w - .17, j + .2 + k * .2, z + .14)], 'paper', .8);
}

function wheelBench(H, R) {
  table(H, R, 1, 3.7, 4.3, 1.6, 1.05, 'paper');
  box(H, R, 2.05, 3.95, 1.08, .87, 1.18, .55, 'teal', .75);
  basin(H, R, 3.02, 4.02, 1.18, 1.6);
  const [x, y] = H.p(3.1, 4.53, 1.68);
  oval(H, R, x, y - 11, 7, 23, 'blue', .8);
  oval(H, R, x + 4, y - 11, 5, 22, 'paper', .8);
  H.line(R, arcPts(x + 3, y - 11, 12, 28, Math.PI, Math.PI * 2, 18), 'teal', 5);
  H.line(R, [H.p(2.12, 4.27, 1.6), [x - 3, y - 11]], 'blue', 4);
  stroke(H, R, [H.p(1.4, 3.9, 1.2), H.p(1.4, 3.9, 2.6), H.p(3.4, 4.1, 2.6), [x + 6, y - 31]], 'blue', 2);
  const [vx, vy] = H.p(1.4, 3.9, 2.25);
  oval(H, R, vx, vy, 5, 4, 'coral', .8);
  H.line(R, [[vx - 7, vy], [vx + 7, vy]], 'coral', 2);
  glass(H, R, ...H.p(1.55, 4.65, 1.18), 'coral', .55, 1);
  const [lx, ly] = H.p(4.85, 4.07, 1.18);
  lamp(H, R, lx, ly, 29, { ink: 'sun' });
  const [cx, cy] = H.p(4.82, 4.86, 1.19);
  H.line(R, [[cx - 13, cy + 5], [cx + 9, cy - 5]], 'blue', 1.2);
  for (const dx of [-9, 6]) H.line(R, [[cx + dx, cy + 7], [cx + dx - 3, cy - 5]], 'blue', 1.2);
}

const room = world('tokyo-sumida-kiriko', 'Light through cut glass — Sumida Edo kiriko workshop', { floor: 'paper', tone: 1, wall: 'paper', wallTone: 1, pattern: 'tiles', accent: 'teal', height: 4.2, head: 20 }, (H, R) => {
  windowOn(H, R, 'nw', 3.45, 1.6, 5.5, 2.15, { sky: 'sun', skyTone: .16, frameInk: 'teal' });
  for (const j of [1.5, 3.4, 5.3]) H.line(R, [H.p(.03, j, 1.62), H.p(.03, j, 3.73)], 'teal', 1.7);
  H.tint([H.p(.1, 1, .02), H.p(.1, 5.8, .02), H.p(6, 8.1, .02), H.p(7.1, 4.6, .02)], 'sun', .11);
  for (const z of [.55, 1.65, 2.75]) {
    box(H, R, 1.2, .32, 10.1, .83, z, .12, 'sun', .4);
    for (let k = 0; k < 10; k++) glass(H, R, ...H.p(1.7 + k * .97, .8, z + .13), k % 2 ? 'blue' : 'coral', .63 + k % 3 * .05, z > 2 ? 0 : k % 3);
  }
  for (const i of [1.2, 6.1, 11.14]) box(H, R, i, .28, .13, .88, .1, 3.62, 'teal', .65);
  shape(H, R, H.tile(1.65, 5.4, 3.8, 1.6, .015), 'blue', .25);
  for (let k = 0; k < 10; k++) H.line(R, [H.p(1.8 + k * .34, 5.5, .02), H.p(1.8 + k * .34, 6.8, .02)], 'paper', .8);
  wheelBench(H, R);
  table(H, R, 7.7, 3.65, 3.2, 1.65, 1.07, 'sun');
  box(H, R, 8.02, 3.95, .7, .77, 1.2, .38, 'coral', .5);
  const [px, py] = H.p(8.6, 4.25, 1.6);
  oval(H, R, px, py, 14, 15, 'paper', 1);
  for (let k = 0; k < 12; k++) H.line(R, [[px + Math.cos(k * Math.PI / 6) * 5, py + Math.sin(k * Math.PI / 6) * 5], [px + Math.cos(k * Math.PI / 6) * 13, py + Math.sin(k * Math.PI / 6) * 14]], 'sun', .8);
  basin(H, R, 9.22, 3.93, 1.2, 1.35);
  for (let k = 0; k < 5; k++) H.line(R, [H.p(9.33 + k * .24, 3.95, 1.36), H.p(9.33 + k * .24, 4.75, 1.36)], 'blue', 1);
  glass(H, R, ...H.p(9.65, 4.31, 1.4), 'coral', .53, 2);
  shape(H, R, H.tile(8.05, 4.82, 1.1, .38, 1.21), 'paper', 1);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(8.08, 4.88 + k * .07, 1.22), H.p(9.07, 4.88 + k * .07, 1.22)], 'teal', .65);
  const [gx, gy] = H.p(10.45, 5, 1.21);
  for (const dx of [-5, 5]) oval(H, R, gx + dx, gy, 4, 3, 'paper', 1);
  H.line(R, [[gx - 1, gy], [gx + 1, gy]], 'blue', 1);
  box(H, R, 9.7, 6.05, .7, .72, 0, .8, 'blue', .55);
  const [ax, ay] = H.p(.15, 7.4, 2.15);
  shape(H, R, [[ax - 7, ay], [ax + 7, ay], [ax + 14, ay + 42], [ax - 14, ay + 42]], 'coral', .5);
  H.line(R, arcPts(ax, ay, 6, 9, Math.PI, Math.PI * 2, 10), 'blue', 1);
  table(H, R, 1.05, 9.2, 5.2, 1.45, .63, 'teal');
  for (let k = 0; k < 6; k++) {
    box(H, R, 1.2 + k * .83, 9.35, .67, .9, .77, .06, 'paper', 1);
    glass(H, R, ...H.p(1.53 + k * .83, 9.8, .84), k % 2 ? 'coral' : 'blue', .68, 2);
  }
  table(H, R, 8, 8.25, 3.3, 2, .85, 'paper');
  for (let k = 0; k < 3; k++) {
    box(H, R, 8.15 + k * .96, 8.47, .8, .85, .98, .17, 'sun', .5);
    shape(H, R, H.tile(8.22 + k * .96, 8.54, .65, .7, 1.16), 'paper', 1);
    if (k < 2) glass(H, R, ...H.p(8.54 + k * .96, 8.9, 1.18), k ? 'coral' : 'blue', .47, 2);
  }
  shape(H, R, H.tile(8.17, 9.54, 1.2, .51, .99), 'paper', 1);
  glass(H, R, ...H.p(10.65, 9.72, .99), 'coral', .65, 1);
  const [qx, qy] = H.p(10.65, 9.72, .99);
  for (let k = 0; k < 4; k++) H.line(R, [[qx - 4 + k * 3, qy - 11], [qx - 7 + k * 4, qy - 33 - k % 2 * 4]], k % 2 ? 'blue' : 'sun', 1.4);
  H.line(R, [[qx + 3, qy - 17], [qx - 1, qy - 8], [qx + 2, qy - 3]], 'blue', .65);
}, (H, R, t) => {
  const u = cycle(t, 14), inspection = Math.max(0, Math.sin(Math.PI * Math.min(1, Math.max(0, (u - .42) / .42))));
  H.at(3.85, 5.65, 0, HH => {
    const [x, y] = HH.p(3.85, 5.65);
    FIGURES.draw(HH, R, { who: 'adult', x, y, t, clip: inspection > .3 ? 'hold' : 'water', phase: t / 6, scale: 1.25, face: 'nw', opts: { shirt: ['paper', 1], apron: ['blue', .65], glasses: true, prop: (A, B, p) => {
      const [hx, hy] = p.nearHand;
      glass(A, B, hx - 2, hy - inspection * 14, 'blue', .55, 2, t * 2);
      A.line(B, [p.farHand, [hx - 7, hy - inspection * 14 - 5]], 'coral', 3, { tone: .3 });
    } } });
  });
  H.at(3.15, 4.6, 1.2, HH => {
    const [x, y] = HH.p(3.1, 4.53, 1.68);
    for (let k = 0; k < 3; k++) {
      const a = t * 2 + k * Math.PI * 2 / 3;
      HH.line(R, [[x + 4, y - 11], [x + 4 + Math.cos(a) * 4, y - 11 + Math.sin(a) * 20]], 'blue', .7, { tone: .35 });
    }
    for (let k = 0; k < 5; k++) {
      const v = cycle(t + k * .28, 1.7);
      HH.dot(x + 8 + k % 2 * 2, y - 30 + v * 49, .8, 'teal', .7);
    }
  });
  H.at(8.1, 6.3, 0, HH => {
    const [x, y] = HH.p(8.1, 6.3);
    FIGURES.draw(HH, R, { who: 'adult', x, y, t, clip: 'hold', phase: t / 5, scale: 1.18, face: 'se', opts: { shirt: ['teal', .6], apron: ['paper', 1], hairStyle: 'bun', prop: (A, B, p) => {
      const [hx, hy] = p.nearHand;
      shape(A, B, [[hx - 11, hy + 3], [hx + 12, hy + 3], [hx + 6, hy - 15], [hx - 8, hy - 12]], 'paper', 1, .6);
      glass(A, B, hx, hy - 3, 'coral', .46, 2, Math.sin(t) * 3);
    } } });
  });
  H.at(4.6, 4.9, 1.22, HH => {
    for (let k = 0; k < 5; k++) {
      const [x, y] = HH.p(4.15 + k * .16, 4.75, 1.22);
      HH.tint([[x, y - 3], [x + 5, y], [x, y + 4], [x - 5, y]], k % 2 ? 'coral' : 'blue', .08 + inspection * .15);
    }
  });
});

export default room;
