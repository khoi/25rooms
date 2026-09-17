import { world, shape, oval, stroke, box, table, actor, cycle, bottle, plant } from '../../worlds/common.js';

const pane = H => H.faceI(.28, .035, 11.38, 1.25, 4.8);
const view = (H, u, v) => H.p(.28 + u * 11.38, .035, 1.25 + v * 3.55);
const screenShape = (H, R, points, ink, tone = .7) => shape(H, R, points.map(([u, v]) => view(H, u, v)), ink, tone, .65);

function cup(H, R, i, j, z, ink = 'paper') {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y + 1, 8, 3, 'paper');
  shape(H, R, [[x - 5, y], [x + 5, y], [x + 6, y - 10], [x - 6, y - 10]], ink, .9, .65);
  oval(H, R, x, y - 10, 5.6, 2, 'blue', .75);
  stroke(H, R, [[x + 5, y - 8], [x + 10, y - 8], [x + 10, y - 2], [x + 5, y - 2]], 'blue', .8);
}

function umbrella(H, R, i, j, ink, open = false) {
  const [x, y] = H.p(i, j, .08);
  stroke(H, R, [[x, y], [x - 2, y - 45], [x + 3, y - 51], [x + 8, y - 47]], 'blue', 1.4);
  shape(H, R, [[x - 5, y - 4], [x - 8, y - 39], [x - 2, y - 45], [x + 6, y - 37], [x + 3, y - 3]], ink, open ? .22 : .78, .7);
  H.line(R, [[x - 2, y - 42], [x, y - 6]], 'paper', .9);
}

function windowFrame(H, R) {
  H.outline(R, pane(H), 'blue', 4, { amp: .08 });
  for (const u of [.34, .68]) H.line(R, [view(H, u, 0), view(H, u, 1)], 'paper', 4, { amp: .06 });
  H.line(R, [view(H, 0, .32), view(H, 1, .32)], 'blue', 2);
}

function crossing(H, R) {
  shape(H, R, pane(H), 'blue', .87);
  H.clip(pane(H), () => {
    for (let k = 0; k < 9; k++) {
      const u = k * .13;
      screenShape(H, R, [[u, .62], [u + .1, .62], [u + .1, 1.05], [u, 1.05]], k % 2 ? 'teal' : 'blue', .7);
      screenShape(H, R, [[u + .015, .73], [u + .085, .73], [u + .085, .94], [u + .015, .94]], k % 3 ? 'coral' : 'sun', .58);
      for (let q = 0; q < 3; q++) H.line(R, [view(H, u + .02, .64 + q * .035), view(H, u + .08, .64 + q * .035)], 'paper', .8, { tone: .4 });
    }
    screenShape(H, R, [[-.05, .03], [.12, -.08], [1.1, .43], [.94, .58]], 'teal', .5);
    screenShape(H, R, [[-.06, .49], [.04, .63], [1.06, .03], [.95, -.08]], 'blue', .85);
    for (let k = 0; k < 10; k++) {
      const u = .09 + k * .082;
      screenShape(H, R, [[u, .09 + u * .42], [u + .024, .1 + u * .42], [u + .06, .23 + u * .42], [u + .035, .22 + u * .42]], 'paper', 1);
      screenShape(H, R, [[u, .54 - u * .44], [u + .025, .53 - u * .44], [u + .072, .40 - u * .44], [u + .047, .41 - u * .44]], 'paper', .9);
    }
  });
  windowFrame(H, R);
}

function smallTable(H, R, i, j) {
  table(H, R, i, j, 2.4, 1.55, .82, 'paper');
  box(H, R, i + .82, j + 1.92, .8, .7, 0, .43, 'coral', .55);
  cup(H, R, i + .4, j + .62, .96);
}

function cafeDetails(H, R) {
  box(H, R, .47, 8.38, 1.43, 1.18, 1.21, .85, 'teal', .24);
  for (const z of [1.38, 1.78]) {
    shape(H, R, H.tile(.57, 8.46, 1.22, .97, z), 'paper', .9);
    for (let k = 0; k < 6; k++) {
      const [x, y] = H.p(.75 + k % 2 * .65, 8.62 + Math.floor(k / 2) * .29, z + .04);
      if (z < 1.5) {
        oval(H, R, x, y, 8, 4, 'sun', .62);
        for (let q = 0; q < 3; q++) H.line(R, [[x - 4 + q * 3, y - 3], [x - 1 + q * 3, y + 2]], 'coral', .8);
      } else {
        shape(H, R, [[x - 6, y + 3], [x + 6, y + 3], [x + 5, y - 7], [x - 5, y - 7]], 'paper');
        oval(H, R, x, y - 7, 6, 3, 'coral', .56);
        H.dot(x, y - 10, 2, 'teal', .8);
      }
    }
  }
  H.outline(R, H.faceJ(1.92, 8.38, 1.18, 1.24, 2.06), 'blue', 1.2);
  H.line(R, [H.p(1.93, 8.56, 1.37), H.p(1.93, 9.24, 1.96)], 'paper', 1.6);
  for (let k = 0; k < 3; k++) box(H, R, .62, 9.73, .95, .43, 1.2 + k * .11, .1, k % 2 ? 'teal' : 'paper', .65);
  table(H, R, 1.04, 10.55, 3.72, .96, .53, 'coral');
  box(H, R, 1.03, 10.53, 3.74, .14, .55, .92, 'teal', .6);
  for (const [i, ink] of [[1.25, 'paper'], [2.48, 'sun'], [3.7, 'coral']]) {
    box(H, R, i, 10.73, .91, .63, .66, .17, ink, .57);
    H.line(R, [H.p(i + .1, 11.35, .76), H.p(i + .8, 11.35, .76)], 'blue', .7);
  }
  table(H, R, 5.03, 10.4, 2.06, 1.12, .57, 'teal');
  for (let k = 0; k < 4; k++) box(H, R, 5.18 + k % 2 * .82, 10.58, .72, .64, .71 + Math.floor(k / 2) * .065, .055, ['paper', 'coral', 'sun', 'blue'][k], .6);
  cup(H, R, 6.55, 11.19, .71);
  oval(H, R, ...H.p(5.66, 11.17, .87), 12, 5, 'paper');
  oval(H, R, ...H.p(5.66, 11.17, .92), 7, 3.5, 'sun', .7);
  box(H, R, 4.55, 10.89, .7, .54, .03, .69, 'blue', .52);
  stroke(H, R, [H.p(4.59, 11.14, .72), H.p(4.83, 11.14, 1), H.p(5.17, 11.14, .72)], 'coral', 1.3);
  table(H, R, 10.08, 5.41, 1.46, 1.32, .93, 'teal');
  shape(H, R, H.tile(10.2, 5.54, 1.2, 1.07, .41), 'sun', .5);
  for (const i of [10.22, 11.36]) for (const j of [5.52, 6.61]) oval(H, R, ...H.p(i, j, .08), 3, 4, 'blue');
  for (let k = 0; k < 4; k++) cup(H, R, 10.4 + k % 2 * .67, 5.67 + Math.floor(k / 2) * .64, 1.08, k % 2 ? 'teal' : 'paper');
  for (let k = 0; k < 5; k++) oval(H, R, ...H.p(10.82, 6.08, .48 + k * .035), 10, 4, 'paper');
  bottle(H, R, ...H.p(11.25, 6.35, 1.08), 'teal', .47, false);
  box(H, R, 10.43, 5.61, .79, .58, .46, .23, 'paper');
  shape(H, R, H.faceJ(.08, 6.41, 1.03, 2.21, 3.13), 'coral', .4);
  shape(H, R, H.faceJ(.1, 6.55, .75, 2.34, 2.99), 'paper');
  const [px, py] = H.p(.12, 6.92, 2.66);
  oval(H, R, px, py, 10, 13, 'teal', .6);
  H.line(R, [[px - 13, py + 8], [px + 12, py - 8]], 'sun', 2.5);
  for (const j of [7.75, 8.76, 9.77]) {
    box(H, R, .09, j, .45, .86, 2.41, .08, 'sun', .6);
    for (let k = 0; k < 3; k++) bottle(H, R, ...H.p(.34, j + .16 + k * .24, 2.5), ['teal', 'sun', 'coral'][k], .36);
  }
  box(H, R, .7, 7.46, .49, .46, 1.2, .54, 'blue', .65);
  oval(H, R, ...H.p(.96, 7.7, 1.88), 9, 7, 'paper', .6);
  oval(H, R, ...H.p(.96, 7.7, 1.91), 7, 4, 'coral', .5);
  plant(H, R, ...H.p(.84, 5.13, 0), 1.7);
  plant(H, R, ...H.p(10.92, 7.39, 0), 1.3);
  plant(H, R, ...H.p(11.08, 1.15, 1.25), .65);
  for (let k = 0; k < 3; k++) box(H, R, 5.02, .77, .64, .46, 1.27 + k * .065, .055, ['teal', 'paper', 'coral'][k], .6);
  box(H, R, 6.02, .77, .82, .57, 1.27, .04, 'blue', .65);
  shape(H, R, H.faceI(6.02, .78, .82, 1.32, 1.93), 'paper');
  H.line(R, [H.p(6.21, .79, 1.51), H.p(6.66, .79, 1.74)], 'teal', 1.3);
  box(H, R, 6.26, 2.38, .81, .59, .02, .58, 'sun', .5);
  stroke(H, R, [H.p(6.36, 2.65, .62), H.p(6.66, 2.65, .9), H.p(6.95, 2.65, .62)], 'blue', 1.2);
  for (let k = 0; k < 4; k++) oval(H, R, ...H.p(7.72, 1.06, 1.28 + k * .04), 9, 4, 'paper');
}

export default world('tokyo-shibuya-window', 'Shibuya · A window above the crossing', { floor: 'paper', tone: .8, wall: 'teal', wallTone: .28, height: 5, head: 20, pattern: 'boards' }, (H, R) => {
  crossing(H, R);
  const side = H.faceJ(.04, .3, 5.5, 1.28, 4.74);
  shape(H, R, side, 'blue', .75);
  H.clip(side, () => {
    for (let k = 0; k < 6; k++) {
      shape(H, R, H.faceJ(.04, .48 + k * .87, .54, 1.5 + k % 2 * .2, 4.3 - k % 3 * .3), k % 2 ? 'teal' : 'coral', .46);
      H.line(R, [H.p(.04, .55 + k * .86, 2.02), H.p(.04, 1 + k * .86, 2.02)], 'sun', 1.2);
    }
  });
  H.outline(R, side, 'blue', 4);
  for (const j of [2.12, 3.94]) H.line(R, [H.p(.06, j, 1.28), H.p(.06, j, 4.74)], 'paper', 3);
  table(H, R, .65, .62, 10.35, .88, 1.12, 'sun');
  for (const i of [2.6, 5.4, 8.1]) {
    table(H, R, i, 2.05, .72, .72, .58, 'coral');
    H.line(R, [H.p(i + .05, 2.09, .27), H.p(i + .67, 2.09, .27)], 'blue', 1.8);
  }
  cup(H, R, 2.9, 1.08, 1.27);
  cup(H, R, 5.6, 1.06, 1.27, 'teal');
  box(H, R, 8.05, .76, 1.08, .6, 1.25, .045, 'blue', .65);
  shape(H, R, H.faceI(8.05, .76, 1.08, 1.29, 1.94), 'paper', .9);
  const [hx, hy] = H.p(9.36, 1.15, 1.28);
  stroke(H, R, [[hx - 9, hy], [hx - 9, hy - 12], [hx, hy - 17], [hx + 9, hy - 12], [hx + 9, hy]], 'blue', 2.4);
  oval(H, R, hx - 9, hy, 3, 5, 'coral'); oval(H, R, hx + 9, hy, 3, 5, 'coral');
  box(H, R, 8.23, 2.29, .55, .4, .05, .57, 'teal', .5);
  stroke(H, R, [H.p(8.25, 2.4, .6), H.p(8.36, 2.4, .86), H.p(8.73, 2.4, .6)], 'blue', 1.2);
  table(H, R, .44, 5.94, 1.52, 3.7, 1.07, 'teal');
  box(H, R, .55, 6.08, 1.13, 1.02, 1.2, .88, 'blue', .75);
  oval(H, R, ...H.p(1.16, 7.12, 1.63), 4, 4, 'sun');
  for (let k = 0; k < 3; k++) cup(H, R, .78 + k * .36, 8.1, 1.2);
  bottle(H, R, ...H.p(.9, 9, 1.2), 'teal', .65, false);
  shape(H, R, H.tile(1.06, 8.52, .64, .48, 1.21), 'paper', 1);
  smallTable(H, R, 3.55, 5.8);
  smallTable(H, R, 7.35, 7.3);
  const book = H.tile(4.38, 6.04, 1.1, .88, .97);
  shape(H, R, book, 'paper', 1);
  H.line(R, [H.p(4.93, 6.04, .98), H.p(4.93, 6.92, .98)], 'blue', .65);
  for (let k = 0; k < 5; k++) H.line(R, [H.p(4.48 + k * .17, 6.12, .99), H.p(4.59 + k * .17, 6.63, .99)], 'blue', 1.2);
  for (let k = 0; k < 3; k++) oval(H, R, ...H.p(4.62 + k * .22, 6.34, 1), 3, 1.8, 'coral', .48);
  oval(H, R, ...H.p(8.76, 7.9, .97), 15, 7, 'paper');
  box(H, R, 8.5, 7.7, .47, .4, .97, .24, 'sun', .68);
  shape(H, R, H.tile(8.5, 7.7, .47, .4, 1.22), 'paper');
  H.dot(...H.p(8.77, 7.88, 1.27), 3.3, 'coral');
  for (let k = 0; k < 4; k++) H.dot(...H.p(9.05 + k * .06, 7.9 + k % 2 * .11, .98), .8, 'coral');
  box(H, R, 7.9, 7.53, .5, .38, .97, .25, 'blue', .8);
  oval(H, R, ...H.p(8.15, 7.94, 1.13), 5, 5, 'teal', .65);
  shape(H, R, H.tile(9.11, 8.13, .42, .42, .96), 'paper');
  box(H, R, 9.97, 8.55, .64, .6, 0, .87, 'sun', .45);
  stroke(H, R, [H.p(10.06, 8.83, .88), H.p(10.25, 8.83, 1.15), H.p(10.53, 8.83, .88)], 'blue', 1.1);
  box(H, R, 10.6, 3.67, .84, .78, 0, .18, 'blue', .55);
  umbrella(H, R, 10.76, 3.85, 'paper', true);
  umbrella(H, R, 11.12, 3.83, 'paper', true);
  umbrella(H, R, 11.02, 4.16, 'coral');
  for (let k = 0; k < 3; k++) box(H, R, 10.62, 4.62 + k * .16, .8, .1, 0, .035, 'paper', 1);
  const [cx, cy] = H.p(.17, 10.51, 2.28);
  H.line(R, [[cx, cy - 14], [cx, cy + 4]], 'blue', 1.6);
  shape(H, R, [[cx - 4, cy], [cx - 18, cy + 12], [cx - 12, cy + 24], [cx - 8, cy + 20], [cx - 9, cy + 48], [cx + 11, cy + 48], [cx + 9, cy + 18], [cx + 17, cy + 24], [cx + 20, cy + 11], [cx + 4, cy]], 'coral', .58);
  plant(H, R, ...H.p(10.75, 10.63, 0), 1);
  const [lx, ly] = H.p(10.25, 1.06, 1.26);
  H.line(R, [[lx, ly], [lx, ly - 27]], 'blue', 2);
  shape(H, R, [[lx - 13, ly - 25], [lx - 7, ly - 40], [lx + 7, ly - 40], [lx + 13, ly - 25]], 'sun', .8);
  H.glow(lx, ly - 23, 42, 25, 'sun', .22);
  cafeDetails(H, R);
}, (H, R, t) => {
  const u = cycle(t, 24) * 24;
  H.clip(pane(H), () => {
    if (u < 8) {
      for (let k = 0; k < 2; k++) {
        const travel = (u - k * 3.5) / 4;
        if (travel < 0 || travel > 1) continue;
        const q = -.12 + travel * 1.38;
        screenShape(H, R, [[q - .2, .3], [q + .06, .3], [q + .06, .42], [q - .2, .42]], k ? 'sun' : 'teal', .88);
        for (let n = 0; n < 4; n++) screenShape(H, R, [[q - .18 + n * .055, .36], [q - .139 + n * .055, .36], [q - .139 + n * .055, .4], [q - .18 + n * .055, .4]], 'paper', .8);
      }
    }
    if (u >= 10 && u < 20) {
      for (let k = 0; k < 15; k++) {
        const progress = Math.max(0, Math.min(1, (u - 10 - k % 4 * .35) / 7.6));
        const q = -.18 + progress * 1.36;
        const a = k % 2 ? 1 - q : q, b = k % 2 ? .53 - a * .4 : .12 + a * .39;
        const [x, y] = view(H, .08 + a * .84, b + Math.floor(k / 4) * .026);
        H.opacity(Math.min(1, progress / .06, (1 - progress) / .06), () => {
          H.line(R, [[x, y - 1], [x + Math.sin(t * 5 + k) * 2, y + 7]], 'blue', 1.2);
          oval(H, R, x, y - 4, 5.1, 2.9, ['paper', 'teal', 'coral', 'sun'][k % 4], .8);
          H.line(R, [[x, y - 7], [x, y - 3]], 'blue', .5);
        });
      }
    }
    for (let k = 0; k < 14; k++) {
      const v = 1 - cycle(t + k * .71, 4.8);
      H.line(R, [view(H, .03 + k * .071, v), view(H, .027 + k * .071, v - .07)], 'paper', .75, { tone: .6 });
    }
    H.opacity(.13, () => screenShape(H, R, [[cycle(t, 17) - .1, 0], [cycle(t, 17) + .06, 0], [cycle(t, 17) + .24, 1], [cycle(t, 17) + .08, 1]], 'coral', .6));
    const [sx, sy] = view(H, .93, .57);
    oval(H, R, sx, sy, 3, 6, 'blue', .95);
    H.dot(sx, sy + (u >= 10 && u < 20 ? 2 : -2), 1.8, u >= 10 && u < 20 ? 'teal' : 'coral', 1, { knock: true });
  });
  windowFrame(H, R);
  actor(H, R, 3.06, 2.42, t * .2, 'drink', { shirt: ['teal', .65], face: 'nw' }, .25, 1.2);
  actor(H, R, 4.67, 7.97, t * .3, u > 10 && u < 13 ? 'write' : 'read', { shirt: ['coral', .68], face: 'nw', glasses: true }, .04, 1.21);
  actor(H, R, 2.36, 7.83, t * .25, 'hold', { shirt: ['paper', 1], apron: ['teal', .7], face: 'nw' }, 0, 1.2);
  const [wx, wy] = H.p(1.88, 7.52 + Math.sin(t * .5) * .12, 1.23);
  oval(H, R, wx, wy, 7, 3, 'paper');
  actor(H, R, 5.81, 2.45, t * .28, 'type', { shirt: ['sun', .68], face: 'nw', glasses: true }, .25, 1.17);
  actor(H, R, 8.42, 2.43, t * .2, 'phone', { shirt: ['paper', .9], face: 'nw' }, .25, 1.17);
  actor(H, R, 2.24, 11.06, t * .19, 'read', { shirt: ['teal', .62], face: 'se' }, .23, 1.19);
  actor(H, R, 3.55, 11.05, t * .3, 'drink', { shirt: ['sun', .66], face: 'se' }, .31, 1.07, 'child');
  const serving = Math.sin(cycle(t, 16) * Math.PI * 2), serverI = 7 + serving * .46;
  actor(H, R, serverI, 4.59, t * .4, 'hold', { shirt: ['paper', 1], apron: ['teal', .7], face: 'se' }, 0, 1.18);
  oval(H, R, ...H.p(serverI + .35, 4.83, 1.19), 21, 8, 'coral', .55);
  cup(H, R, serverI + .28, 4.85, 1.25);
  cup(H, R, serverI + .74, 4.82, 1.25, 'teal');
  const [vx, vy] = H.p(serverI + .27, 4.86, 1.57);
  for (let k = 0; k < 2; k++) {
    const rise = cycle(t + k * 1.2, 3.2);
    H.opacity(Math.sin(rise * Math.PI) * .5, () => stroke(H, R, [[vx + k * 6, vy - rise * 18], [vx + k * 6 - 3, vy - rise * 18 - 7], [vx + k * 6 + 1, vy - rise * 18 - 13]], 'paper', 1));
  }
  const [gx, gy] = H.p(.96, 7.7, 1.93);
  const grind = Math.min(1, cycle(t, 9) / .24);
  const turn = (grind * grind * (3 - 2 * grind)) * Math.PI * 2;
  H.line(R, [[gx, gy], [gx + Math.cos(turn) * 14, gy + Math.sin(turn) * 6]], 'blue', 1.5);
  H.dot(gx + Math.cos(turn) * 14, gy + Math.sin(turn) * 6, 2.5, 'coral', .8, { knock: true });
});
