import { world, shape, oval, stroke, label, plaque, box, table, bench, rug, windowOn, wallRect, wallPt, lamp, ell, TAU } from '../common.js';

const palette = ['coral', 'teal', 'sun', 'blue'];

function piece(H, R, i, j, kind, ink, t = 0, scale = .9, z = 0) {
  const [x, y] = H.p(i, j, z);
  const lean = Math.sin(t * .7 + i) * .8;
  const p = (a, b) => [x + a * scale, y + b * scale];
  const poly = (v, color = ink, tone = .8) => shape(H, R, v.map(([a, b]) => p(a, b)), color, tone, .85);
  const ov = (a, b, rx, ry, color = ink, tone = .8) => oval(H, R, ...p(a, b), rx * scale, ry * scale, color, tone);
  H.tint(ell(x + 3, y + 2, 16 * scale, 5 * scale), 'blue', .15);
  ov(0, -2, 15, 5);
  poly([[-12, -5], [-8, -13], [-5 + lean, -31], [5 + lean, -31], [8, -13], [12, -5]]);
  ov(0, -12, 9, 3);
  if (kind === 'rook') {
    poly([[-11, -30], [-12, -46], [-7, -46], [-7, -41], [-3, -41], [-3, -46], [3, -46], [3, -41], [7, -41], [7, -46], [12, -46], [11, -30]]);
  } else if (kind === 'bishop') {
    poly([[-10, -33], [-8, -46], [0, -58], [8, -46], [10, -33]]);
    H.line(R, [p(2, -51), p(-3, -42)], ink === 'blue' ? 'paper' : 'blue', 1.5);
    ov(0, -56, 3, 3, 'sun');
  } else {
    ov(lean, -36, kind === 'pawn' ? 9 : 10, 11);
    if (kind === 'queen') {
      poly([[-10, -45], [-14, -58], [-5, -52], [0, -63], [5, -52], [14, -58], [10, -45]], 'sun', .95);
      for (const [a, b] of [[-14, -59], [0, -64], [14, -59]]) ov(a, b, 2, 2, 'coral');
    }
    if (kind === 'king') {
      H.line(R, [p(0, -46), p(0, -62)], 'sun', 3 * scale);
      H.line(R, [p(-6, -56), p(6, -56)], 'sun', 3 * scale);
    }
  }
  const eye = ink === 'blue' ? 'paper' : 'blue';
  H.dot(...p(-4 + lean, -36), 1.1 * scale, eye);
  H.dot(...p(4 + lean, -36), 1.1 * scale, eye);
  for (const a of [-4, 4]) H.outline(R, ell(...p(a + lean, -36), 3.5 * scale, 3 * scale), eye, .65, { amp: .05 });
  H.line(R, [p(-1, -36), p(1, -36)], eye, .65);
  stroke(H, R, [p(-3, -30), p(0, -28.5), p(3, -30)], eye, .7);
  return { x, y, p };
}

function chair(H, R, i, j, ink = 'teal', w = 1.15) {
  for (const a of [0, w - .15]) for (const b of [0, .9]) box(H, R, i + a, j + b, .12, .12, 0, .55, 'blue', .55);
  box(H, R, i, j, w, .18, .45, 1.15, ink, .6);
  box(H, R, i, j, w, 1.1, .48, .2, ink, .75);
  for (const a of [0, w - .15]) box(H, R, i + a, j + .12, .15, .94, .66, .32, ink, .6);
  for (let k = 0; k < 3; k++) H.dot(...H.p(i + .28 + k * .3, j + .2, 1.22), 1.3, 'sun');
}

function cup(H, R, i, j, z, ink = 'paper', s = 1) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y + 1, 8 * s, 3 * s, 'paper', 1);
  oval(H, R, x + 6 * s, y - 5 * s, 3 * s, 3 * s, ink, .9);
  shape(H, R, [[x - 5 * s, y - 9 * s], [x + 5 * s, y - 9 * s], [x + 4 * s, y - 1 * s], [x - 4 * s, y - 1 * s]], ink, .95, .6);
  oval(H, R, x, y - 9 * s, 5 * s, 2 * s, 'blue', .45);
}

function pot(H, R, i, j, z, n, flowers = false) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 7, y - 9], [x + 7, y - 9], [x + 5, y + 2], [x - 5, y + 2]], 'coral', .75);
  oval(H, R, x, y - 9, 8, 3, 'blue', .75);
  for (let k = 0; k < 3; k++) {
    const dx = (k - 1) * 6, top = y - 23 - ((k + n) % 3) * 5;
    stroke(H, R, [[x, y - 10], [x + dx, y - 17], [x + dx, top]], 'teal', 1.2);
    shape(H, R, [[x + dx, top + 6], [x + dx - 7, top + 1], [x + dx - 5, top + 8]], 'teal', .85, .5);
    shape(H, R, [[x + dx, top + 10], [x + dx + 6, top + 4], [x + dx + 7, top + 10]], 'teal', .75, .5);
    if (flowers) {
      for (let a = 0; a < 5; a++) H.dot(x + dx + Math.cos(a * TAU / 5) * 3, top + Math.sin(a * TAU / 5) * 3, 2.5, n % 2 ? 'coral' : 'sun');
      H.dot(x + dx, top, 1.7, 'blue');
    }
  }
}

function cards(H, R, x, y, count = 3, angle = 0) {
  for (let k = 0; k < count; k++) {
    const dx = (k - (count - 1) / 2) * 7;
    shape(H, R, [[x + dx - 4, y - 10 - k], [x + dx + 5, y - 9 + angle], [x + dx + 4, y + 3], [x + dx - 5, y + 2]], 'paper', 1, .55);
    label(H, k % 2 ? '♥' : '♠', x + dx, y - 3, 6, k % 2 ? '#ee6852' : '#344a80');
  }
}

function yarn(H, R, x, y, ink, s = 1) {
  oval(H, R, x, y, 7 * s, 6 * s, ink, .85);
  for (let k = -1; k < 2; k++) stroke(H, R, [[x - 5 * s, y + k * 2], [x, y - 5 * s + k * 2], [x + 5 * s, y + k * 2]], 'blue', .5);
}

function walker(H, R, i, j) {
  for (const a of [0, .65]) {
    H.line(R, [H.p(i + a, j, .08), H.p(i + a, j, .8), H.p(i + a, j + .65, .8), H.p(i + a, j + .65, .08)], 'blue', 1.7);
    for (const b of [0, .65]) oval(H, R, ...H.p(i + a, j + b, .05), 2.8, 2.8, 'blue');
  }
  H.line(R, [H.p(i, j, .66), H.p(i + .65, j, .66)], 'coral', 2.4);
}

function details(H, R) {
  for (const side of ['ne', 'nw']) {
    H.line(R, [wallPt(H, side, 0, .65), wallPt(H, side, 12, .65)], 'coral', 2);
    for (let k = .3; k < 12; k += .7) H.line(R, [wallPt(H, side, k, .05), wallPt(H, side, k, .62)], 'blue', .6, { tone: .35 });
  }
  windowOn(H, R, 'ne', 9.1, 1.55, 4.2, 1.35, { sky: 'sun', skyTone: .25 });
  for (const i of [6.9, 11.35]) shape(H, R, wallRect(H, 'ne', i, i + .45, 1.45, 3.05), 'coral', .45);
  plaque(H, R, 3.4, .05, 3.05, 'NO MORE CHECKMATES', 'sun', 138);
  shape(H, R, wallRect(H, 'nw', 4.25, 6.4, 1.65, 2.85), 'sun', .6);
  shape(H, R, wallRect(H, 'nw', 4.4, 6.25, 1.8, 2.7), 'paper', 1);
  label(H, 'DAILY MOVES', ...H.p(.01, 5.32, 2.48), 7);
  for (const [n, text] of ['TEA 10', 'CARDS 11', 'STRETCH 2'].entries()) label(H, text, ...H.p(.01, 5.32, 2.23 - n * .17), 5.3);
  const [cx, cy] = H.p(.02, 7.45, 2.35);
  oval(H, R, cx, cy, 19, 19, 'sun', .75);
  oval(H, R, cx, cy, 15, 15, 'paper', 1);
  for (let k = 0; k < 12; k++) H.dot(cx + Math.sin(k * TAU / 12) * 12, cy - Math.cos(k * TAU / 12) * 12, 1, 'blue');
  H.line(R, [[cx, cy - 9], [cx, cy], [cx + 7, cy + 4]], 'blue', 1.2);
  rug(H, R, .55, 4.55, 3.1, 2.8, 'sun', .2, { border: 'coral' });
  rug(H, R, 4.05, 4.05, 4.1, 3.4, 'coral', .15, { border: 'teal' });
  rug(H, R, .55, 8, 3.3, 3.4, 'teal', .18, { border: 'sun' });
  rug(H, R, 7.25, 8.75, 4.05, 2.25, 'coral', .22, { border: 'paper' });
  table(H, R, .65, .6, 3.45, 1.2, 1.05, 'sun');
  for (let k = 0; k < 3; k++) {
    box(H, R, .75 + k * 1.06, .65, 1, 1.05, .12, .75, 'teal', .55);
    H.line(R, [H.p(1.08 + k * 1.06, 1.72, .65), H.p(1.45 + k * 1.06, 1.72, .65)], 'sun', 2);
  }
  const [tx, ty] = H.p(1.22, 1.15, 1.23);
  oval(H, R, tx, ty - 12, 10, 13, 'paper');
  oval(H, R, tx, ty - 24, 11, 3, 'blue');
  shape(H, R, [[tx + 8, ty - 19], [tx + 16, ty - 20], [tx + 17, ty - 15], [tx + 10, ty - 10]], 'paper');
  H.line(R, [[tx - 10, ty - 17], [tx - 16, ty - 17], [tx - 16, ty - 7], [tx - 10, ty - 6]], 'blue', 1.6);
  for (const [i, ink, name] of [[2, 'coral', 'TEA'], [2.7, 'teal', 'DECAF'], [3.4, 'sun', 'BISCUITS']]) {
    box(H, R, i, .84, .5, .45, 1.2, .48, ink, .7);
    label(H, name, ...H.p(i + .25, 1.3, 1.42), 4.4);
  }
  for (let k = 0; k < 4; k++) cup(H, R, 1.8 + k * .57, 1.61, 1.19, 'paper', .65);
  box(H, R, 4.65, .65, 2.05, .9, 0, 1.15, 'coral', .55);
  for (const i of [4.75, 5.4, 6.05]) {
    shape(H, R, H.faceI(i, 1.56, .52, .2, .9), 'paper', .8);
    H.dot(...H.p(i + .4, 1.58, .6), 1.6, 'blue');
  }
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(4.98 + k * .6, 1.03, 1.2);
    box(H, R, 4.8 + k * .6, .87, .32, .32, 1.2, .09, 'blue');
    H.line(R, [[x, y - 4], [x, y - 18]], 'sun', 4);
    shape(H, R, [[x - 8, y - 25], [x + 8, y - 25], [x + 5, y - 15], [x - 5, y - 15]], 'sun', .85);
    for (const side of [-1, 1]) stroke(H, R, [[x + side * 7, y - 24], [x + side * 13, y - 21], [x + side * 6, y - 15]], 'blue', .9);
  }
  shape(H, R, wallRect(H, 'ne', 4.8, 6.15, 1.88, 2.65), 'blue', .8);
  shape(H, R, wallRect(H, 'ne', 4.91, 6.04, 1.98, 2.54), 'paper', 1);
  label(H, 'CLASS OF 64', ...H.p(5.48, 0, 2.18), 5.3);
  for (let k = 0; k < 4; k++) { const [x, y] = H.p(5.05 + k * .25, 0, 2.32); oval(H, R, x, y, 3, 4, k % 2 ? 'blue' : 'coral'); }
  table(H, R, 8, .75, 3.3, 1.12, 1, 'teal');
  for (let k = 0; k < 5; k++) pot(H, R, 8.2 + k * .68, 1.15, 1.15, k, k > 2);
  for (let k = 0; k < 3; k++) {
    box(H, R, 8.14 + k * .65, 1.55, .46, .3, 1.13, .05, 'paper');
    label(H, ['PEAS', 'SAGE', 'MINT'][k], ...H.p(8.37 + k * .65, 1.76, 1.2), 4.6);
  }
  box(H, R, 10.4, .95, .6, .55, .05, .35, 'sun', .6);
  label(H, 'SEEDS', ...H.p(10.7, 1.53, .27), 5);
  for (const j of [1.2, 1.65]) pot(H, R, 8.35, j, .08, 2);
  table(H, R, .3, 2.3, .82, 1.6, 1.15, 'coral');
  for (const z of [.25, 1.24, 2.15]) {
    box(H, R, .3, 2.3, .82, 1.6, z, .1, 'coral', .7);
    for (let k = 0; k < 7; k++) {
      box(H, R, .4, 2.39 + k * .19, .53, .14, z + .1, .52 + (k % 3) * .1, palette[k % 4], .68);
      H.line(R, [H.p(.95, 2.43 + k * .19, z + .22), H.p(.95, 2.51 + k * .19, z + .22)], 'paper', 1);
    }
  }
  box(H, R, .3, 2.3, .12, 1.7, .2, 2.7, 'sun', .65);
  box(H, R, .3, 3.9, .82, .12, .2, 2.7, 'sun', .65);
  chair(H, R, 1.25, 5.25, 'coral', 1.3);
  box(H, R, 1.82, 6.77, .8, .65, 0, .45, 'sun', .6);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(1.82, 6.9 + k * .12, .47), H.p(2.62, 6.9 + k * .12, .47)], 'coral', 1);
  const [bx, by] = H.p(3.2, 6.5, .02);
  shape(H, R, [[bx - 13, by - 13], [bx + 14, by - 13], [bx + 10, by + 5], [bx - 10, by + 5]], 'sun', .6);
  for (let k = -9; k <= 9; k += 4) H.line(R, [[bx + k, by - 12], [bx + k, by + 3]], 'blue', .55);
  for (let k = -7; k < 4; k += 4) H.line(R, [[bx - 10, by + k], [bx + 11, by + k]], 'coral', .7);
  yarn(H, R, bx - 6, by - 12, 'coral'); yarn(H, R, bx + 4, by - 15, 'teal'); yarn(H, R, bx + 10, by - 8, 'blue', .8);
  stroke(H, R, [[bx - 6, by - 12], [bx - 25, by - 8], [bx - 20, by + 7], [bx - 46, by + 4]], 'coral', .8);
  lamp(H, R, ...H.p(.65, 6.5), 66, { ink: 'sun' });
  walker(H, R, 3.35, 7.5);
  chair(H, R, 3.35, 4.22, 'teal');
  chair(H, R, 7.35, 5.15, 'sun');
  table(H, R, 4.45, 4.25, 2.55, 2.25, .95, 'coral');
  shape(H, R, H.tile(4.62, 4.44, 2.21, 1.86, 1.09), 'teal', .62);
  for (const [i, j, suit] of [[4.9, 4.85, '♠'], [5.5, 5.14, '♥'], [6.05, 5, '♦'], [5.85, 5.7, '♣']]) {
    shape(H, R, H.tile(i, j, .35, .52, 1.12), 'paper', 1, .5);
    label(H, suit, ...H.p(i + .16, j + .25, 1.14), 7, suit === '♥' || suit === '♦' ? '#ee6852' : '#344a80');
  }
  box(H, R, 6.3, 5.7, .35, .5, 1.11, .08, 'paper', 1);
  for (let k = 0; k < 5; k++) oval(H, R, ...H.p(4.9 + k * .17, 6.13, 1.15), 2.3, 1.3, k % 2 ? 'sun' : 'blue');
  cup(H, R, 4.8, 4.45, 1.12, 'paper', .7); cup(H, R, 6.62, 5.3, 1.12, 'sun', .7);
  shape(H, R, H.tile(6.0, 4.44, .6, .35, 1.12), 'paper', 1);
  label(H, '7 : 7', ...H.p(6.3, 4.62, 1.15), 5.5);
  table(H, R, 3.55, 2.48, 1.38, .9, .84, 'sun');
  box(H, R, 3.55, 2.48, 1.38, .9, .25, .07, 'teal', .6);
  for (const i of [3.65, 4.72]) for (const j of [2.62, 3.25]) oval(H, R, ...H.p(i, j, .11), 3.5, 4, 'blue');
  for (const [i, j] of [[3.83, 2.8], [4.33, 2.78], [4.68, 3.03]]) cup(H, R, i, j, .97, 'paper', .7);
  oval(H, R, ...H.p(4.05, 3.18, 1), 9, 4, 'paper');
  for (let k = 0; k < 4; k++) oval(H, R, ...H.p(3.91 + k * .13, 3.15, 1.04), 3, 2, 'sun');
  box(H, R, 3.78, 2.64, .6, .4, .36, .1, 'paper');
  H.line(R, [H.p(3.55, 3.3, .9), H.p(3.35, 3.3, 1.25), H.p(4.8, 3.3, 1.25)], 'blue', 1.6);
  chair(H, R, 1.2, 8.75, 'teal', 1.45);
  table(H, R, 2.85, 9.3, .8, .8, .7, 'sun');
  cup(H, R, 3.2, 9.75, .84, 'paper', .8);
  for (let k = 0; k < 3; k++) box(H, R, 2.98, 9.42, .5, .48, .84 + k * .06, .04, palette[k], .75);
  box(H, R, .4, 10.4, 1.05, .75, .05, .38, 'coral', .55);
  for (let k = 0; k < 5; k++) {
    const [x, y] = H.p(.53 + k * .17, 10.74, .42);
    shape(H, R, [[x - 3, y - 18], [x + 6, y - 18], [x + 5, y], [x - 4, y]], 'paper', 1, .5);
    H.line(R, [[x - 1, y - 13], [x + 4, y - 13]], 'blue', .7);
  }
  label(H, 'THE DAILY ROOK', ...H.p(.91, 11.2, .26), 5.2);
  lamp(H, R, ...H.p(.63, 8.6), 66, { ink: 'sun' });
  const [wx, wy] = H.p(2.75, 8.55);
  stroke(H, R, [[wx, wy], [wx, wy - 35], [wx + 5, wy - 40], [wx + 10, wy - 35]], 'coral', 2.2);
  table(H, R, 4.7, 8.35, 1.95, 1.65, .78, 'sun');
  for (let a = 0; a < 6; a++) for (let b = 0; b < 6; b++) shape(H, R, H.tile(4.88 + a * .25, 8.53 + b * .22, .25, .22, .92), (a + b) % 2 ? 'blue' : 'paper', (a + b) % 2 ? .6 : 1, .2);
  for (const [a, b, ink] of [[0, 1, 'coral'], [2, 2, 'coral'], [4, 4, 'coral'], [1, 0, 'sun'], [3, 1, 'sun'], [5, 2, 'sun'], [2, 5, 'sun']]) oval(H, R, ...H.p(5 + a * .25, 8.64 + b * .22, .95), 3.8, 2.5, ink);
  bench(H, R, 4.05, 9.9, 1.1, 'coral'); bench(H, R, 6.92, 9.05, 1.1, 'teal');
  for (const i of [8.35, 9.98]) {
    for (const j of [9.05, 10.5]) H.line(R, [H.p(i, j, .05), H.p(i, j, 1)], 'blue', 2);
    H.line(R, [H.p(i, 8.92, 1), H.p(i, 10.7, 1)], 'sun', 4);
  }
  for (let k = 0; k < 4; k++) {
    const [x, y] = H.p(8.82 + k % 2 * .43, 9.35 + Math.floor(k / 2) * .67, .035);
    oval(H, R, x, y, 5, 2.6, 'paper');
  }
  table(H, R, 10.2, 6.55, 1.2, 1.1, .65, 'teal');
  for (let k = 0; k < 3; k++) {
    const [x, y] = H.p(10.45 + k * .28, 6.96, .8);
    H.line(R, [[x - 5, y - 3], [x + 5, y - 3]], 'blue', 2);
    for (const side of [-1, 1]) oval(H, R, x + side * 5, y - 3, 2, 4, palette[k]);
  }
  oval(H, R, ...H.p(10.65, 9.8, .18), 13, 12, 'sun');
  H.line(R, [H.p(10.55, 9.65, .52), H.p(10.6, 9.88, .18), H.p(10.85, 10.08, .12)], 'coral', 1.4);
  box(H, R, 10.4, 7.8, .9, .68, .05, .4, 'paper', 1);
  label(H, 'GENTLE MOVES', ...H.p(10.85, 8.5, .32), 5);
  for (const [i, j, ink] of [[10.48, 8, 'coral'], [10.77, 8, 'teal'], [11.02, 8, 'sun']]) yarn(H, R, ...H.p(i, j, .53), ink, .7);
  walker(H, R, 10.25, 10.55);
  pot(H, R, 11.1, 4.6, .06, 1, true);
}

function life(H, R, t) {
  H.at(2.25, 2.8, 0, HH => {
    const { x, y, p } = piece(HH, R, 2.25, 2.8, 'rook', 'paper', t, .95);
    shape(HH, R, [p(-7, -29), p(7, -29), p(8, -8), p(-9, -8)], 'coral', .65);
    HH.line(R, [p(-7, -27), p(7, -27)], 'paper', 1.2);
    stroke(HH, R, [p(10, -25), p(19, -22), p(25, -31 + Math.sin(t) * 2)], 'blue', 1.4);
    const u = Math.sin(t * .8) * 1.5;
    oval(HH, R, x + 26, y - 31 + u, 9, 7, 'sun');
    stroke(HH, R, [[x + 32, y - 33 + u], [x + 40, y - 38 + u], [x + 41, y - 35 + u]], 'blue', 1.8);
    oval(HH, R, x + 25, y - 39 + u, 6, 2, 'paper');
    HH.dot(x + 25, y - 42 + u, 2, 'sun');
    stroke(HH, R, [[x + 18, y - 35 + u], [x + 12, y - 38 + u], [x + 13, y - 28 + u], [x + 18, y - 29 + u]], 'blue', 1);
  });
  H.at(9.45, 2.48, 0, HH => {
    const { x, y, p } = piece(HH, R, 9.45, 2.48, 'pawn', 'blue', t, .92);
    shape(HH, R, [p(-9, -29), p(8, -29), p(9, -8), p(-10, -8)], 'sun', .8);
    oval(HH, R, x, y - 46, 15, 3.4, 'sun');
    shape(HH, R, [[x - 8, y - 47], [x - 6, y - 56], [x + 6, y - 56], [x + 8, y - 47]], 'sun', .9);
    const pour = (Math.sin(t * 1.5) + 1) / 2;
    stroke(HH, R, [p(-8, -25), p(-17, -20), [x - 24, y - 21 - pour * 3]], 'blue', 1.6);
    box(HH, R, 8.62, 2.22, .34, .34, .48 + pour * .08, .3, 'teal', .75);
    HH.line(R, [[x - 28, y - 25], [x - 42, y - 32]], 'teal', 3);
    for (let k = 0; k < 4; k++) HH.dot(x - 45 - k * 2, y - 30 + k * 4 + ((t * 5) % 4), 1, 'teal', .4 + pour * .5);
  });
  H.at(1.94, 5.96, .61, HH => {
    const { x, y, p } = piece(HH, R, 1.94, 5.96, 'queen', 'paper', t, .97, .61);
    shape(HH, R, [[x - 15, y - 14], [x + 14, y - 13], [x + 10, y + 14], [x - 13, y + 13]], 'coral', .65);
    for (let k = 0; k < 5; k++) stroke(HH, R, [[x - 13, y - 8 + k * 4], [x - 7, y - 6 + k * 4], [x, y - 8 + k * 4], [x + 7, y - 6 + k * 4], [x + 13, y - 8 + k * 4]], 'sun', .65);
    const a = Math.sin(t * 3) * 3;
    stroke(HH, R, [p(-10, -27), [x - 20, y - 18], [x - 7, y - 13 + a]], 'blue', 1.5);
    stroke(HH, R, [p(10, -27), [x + 19, y - 20], [x + 5, y - 14 - a]], 'blue', 1.5);
    HH.line(R, [[x - 15, y - 26 + a], [x + 14, y - 4]], 'blue', 1.1);
    HH.line(R, [[x + 16, y - 26 - a], [x - 14, y - 4]], 'blue', 1.1);
    for (const dx of [-15, 16]) HH.dot(x + dx, y - 26 + (dx < 0 ? a : -a), 1.9, 'sun');
  });
  H.at(3.88, 4.89, .6, HH => {
    const { x, y, p } = piece(HH, R, 3.88, 4.89, 'king', 'paper', t, .95, .6);
    cards(HH, R, x + 20, y - 18, 4);
    stroke(HH, R, [p(9, -25), [x + 19, y - 15], [x + 25, y - 17]], 'blue', 1.5);
    const a = Math.sin(t * 1.2) * 5;
    stroke(HH, R, [p(-10, -26), [x - 20, y - 24], [x - 22, y - 40 - a]], 'blue', 1.5);
    HH.dot(x - 22, y - 40 - a, 2.5, 'coral');
  });
  H.at(7.87, 5.83, .6, HH => {
    const { x, y, p } = piece(HH, R, 7.87, 5.83, 'bishop', 'blue', t, .92, .6);
    cards(HH, R, x - 21, y - 19, 3, 2);
    stroke(HH, R, [p(-9, -25), [x - 16, y - 14], [x - 24, y - 16]], 'blue', 1.5);
    const a = Math.sin(t * 1.2 + 2) * 5;
    stroke(HH, R, [p(9, -25), [x + 18, y - 30], [x + 22, y - 42 + a]], 'blue', 1.5);
    HH.dot(x + 22, y - 42 + a, 2.5, 'sun');
    const [sx, sy] = HH.p(6.3, 5.5, 1.3);
    cards(HH, R, sx + Math.sin(t) * 2, sy, 1);
  });
  H.at(1.9, 9.5, .62, HH => {
    const { x, y } = piece(HH, R, 1.9, 9.5, 'rook', 'paper', t, 1, .62);
    const page = Math.sin(t * .7) * 2;
    shape(HH, R, [[x - 24, y - 29], [x, y - 24], [x + 24, y - 31 + page], [x + 23, y - 5], [x, y + 1], [x - 22, y - 4]], 'paper', 1);
    HH.line(R, [[x, y - 23], [x, y]], 'blue', .8);
    label(HH, 'ROOK POST', x, y - 22, 6);
    for (let k = 0; k < 5; k++) for (const side of [-1, 1]) HH.line(R, [[x + side * 3, y - 17 + k * 3], [x + side * 19, y - 19 + k * 3]], 'blue', .45);
  });
  H.at(4.5, 10.1, .58, HH => {
    const { x, y, p } = piece(HH, R, 4.5, 10.1, 'pawn', 'blue', t, .8, .58);
    stroke(HH, R, [p(9, -25), [x + 17, y - 22], [x + 26 + Math.sin(t * .9) * 3, y - 28]], 'blue', 1.6);
  });
  H.at(7.4, 9.55, .6, HH => {
    const { x, y, p } = piece(HH, R, 7.4, 9.55, 'pawn', 'paper', t, .82, .6);
    stroke(HH, R, [p(-9, -25), [x - 17, y - 24], [x - 22, y - 32]], 'blue', 1.5);
  });
  H.at(9.18, 9.92, 0, HH => {
    const step = Math.sin(t * 1.4) * .18;
    const { x, y, p } = piece(HH, R, 9.18, 9.92 + step, 'king', 'blue', t, .94);
    shape(HH, R, [p(-8, -28), p(8, -28), p(10, -14), p(-8, -14)], 'paper', .95);
    for (const [side, i] of [[-1, 8.35], [1, 9.98]]) stroke(HH, R, [p(side * 9, -25), [x + side * 20, y - 26], HH.p(i, 9.92 + step, 1)], 'blue', 1.6);
    HH.line(R, [[x - 6, y + 1], [x - 8, y + 6 + Math.sin(t * 1.4) * 3]], 'coral', 3);
    HH.line(R, [[x + 6, y + 1], [x + 8, y + 6 - Math.sin(t * 1.4) * 3]], 'coral', 3);
  });
  H.at(10.48, 8.9, 0, HH => {
    const { x, y, p } = piece(HH, R, 10.48, 8.9, 'pawn', 'paper', t, .87);
    shape(HH, R, [p(-9, -27), p(9, -27), p(10, -11), p(-10, -11)], 'teal', .75);
    HH.line(R, [p(-6, -25), p(6, -25)], 'sun', 2);
    stroke(HH, R, [p(-9, -25), [x - 19, y - 28], [x - 23, y - 36 + Math.sin(t * 1.4) * 6]], 'blue', 1.5);
    shape(HH, R, [[x + 9, y - 29], [x + 23, y - 27], [x + 22, y - 9], [x + 8, y - 12]], 'sun', .8);
    for (let k = 0; k < 3; k++) HH.line(R, [[x + 12, y - 23 + k * 4], [x + 20, y - 22 + k * 4]], 'blue', .6);
  });
}

export default function enrich(room) {
  const enriched = world(room.id, room.title, { floor: 'paper', tone: 1, wall: 'teal', wallTone: .28, height: 3.2, pattern: 'tiles', accent: 'blue' }, details, life);
  return { ...room, under: enriched.under, live: enriched.live };
}
