import { shape, oval, stroke, box, table, bench, creature, bottle, ell, loop, cycle, inks } from '../common.js';
import { slab, backWalls } from '../../drawings.js';

const paper = (H, R, x, y, title, w = 21, h = 27) => {
  shape(H, R, [[x - w / 2, y], [x + w / 2, y], [x + w / 2, y - h], [x - w / 2, y - h]], 'paper', 1, .6);

  H.line(R, [[x - w / 2 + 3, y - h + 9], [x + w / 2 - 3, y - h + 9]], 'coral', 1.2);
  for (let n = 0; n < 4; n++) for (const s of [-1, 1]) H.line(R, [[x + s * 2, y - h + 13 + n * 3], [x + s * (w / 2 - 3), y - h + 13 + n * 3]], 'blue', .45);
};

function suitcase(H, R, i, j, z, ink = 'coral', w = .55) {
  box(H, R, i, j, w, .34, z, .52, ink, .65);
  for (const q of [.16, w - .16]) H.line(R, [H.p(i + q, j, z + .53), H.p(i + q, j + .35, z + .53), H.p(i + q, j + .35, z)], 'sun', 1.3);
  stroke(H, R, [H.p(i + w * .35, j + .1, z + .53), H.p(i + w * .35, j + .1, z + .67), H.p(i + w * .7, j + .1, z + .67), H.p(i + w * .7, j + .1, z + .53)], 'blue', 1.5);
  const [x, y] = H.p(i + w * .65, j + .36, z + .3);
  shape(H, R, [[x - 3, y - 2], [x + 3, y - 2], [x + 3, y + 3], [x - 3, y + 3]], 'paper', 1, .4);
}

function coral(H, R, i, j, z, height, ink) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y + 2, 16, 5, 'blue', .2);
  for (let n = 0; n < 5; n++) {
    const end = (n - 2) * 10, top = height * (1 - Math.abs(n - 2) * .12);
    stroke(H, R, [[x, y], [x + end * .4, y - 10], [x + end, y - top]], ink, 4.2);
    for (const side of [-1, 1]) stroke(H, R, [[x + end * .7, y - top * .64], [x + end + side * 8, y - top * .76], [x + end + side * 9, y - top * .92]], ink, 2.1);
  }
}

function train(H, R) {
  for (const j of [1.7, 3.6]) H.line(R, [H.p(.3, j, .08), H.p(11.7, j, .08)], 'sun', 2);
  for (let i = .5; i < 12; i += .65) H.line(R, [H.p(i, 1.4, .07), H.p(i, 3.9, .07)], 'teal', 3, { tone: .6 });
  box(H, R, 1.1, 1.35, 9.75, 2.55, .28, 1.82, 'teal', .48);
  box(H, R, 1.2, 1.45, 9.55, 2.35, 2.1, .13, 'paper', .7);
  for (const x of [2.3, 4.7, 7.2, 9.6]) {
    box(H, R, x, 2.05, .7, .95, 2.24, .12, 'blue', .3);
    for (let n = 0; n < 4; n++) H.line(R, [H.p(x + .1 + n * .15, 2.16, 2.37), H.p(x + .1 + n * .15, 2.87, 2.37)], 'blue', .7);
  }
  shape(H, R, H.faceI(1.1, 3.91, 9.75, .4, .64), 'coral', .75);
  shape(H, R, H.faceI(1.1, 3.92, 9.75, 1.9, 2.03), 'sun', .7);
  for (const i of [1.62, 3.9, 8.6, 10.1]) {
    const [x, y] = H.p(i, 3.94, .23);
    oval(H, R, x, y, 9, 10, 'blue', .8);
    oval(H, R, x, y, 3.5, 4, 'teal', .7);
  }
  for (const [n, i] of [1.4, 2.65, 4.05, 5.3, 8.3, 9.55].entries()) {
    const glass = H.faceI(i, 3.94, 1.02, .83, 1.78);
    shape(H, R, glass, 'sun', .28);
    H.clip(glass, () => {
      H.line(R, [H.p(i + .15, 3.94, 1.07), H.p(i + .88, 3.94, 1.07)], 'coral', 3);
      H.line(R, [H.p(i + .56, 3.94, 1.72), H.p(i + .56, 3.94, 1.46)], 'blue', .6);
      const [hx, hy] = H.p(i + .56, 3.94, 1.4);
      H.outline(R, ell(hx, hy, 3, 4, 12), 'blue', .7);
      if (n % 2 === 0) creature(H, R, ...H.p(i + .5, 3.94, .71), 'jelly', 0, .29, n === 2 ? 'coral' : 'teal');
      H.line(R, [H.p(i + .1, 3.94, 1.48), H.p(i + .3, 3.94, 1.7)], 'paper', 1.5);
    });
    H.outline(R, glass, 'blue', 1.25);
    for (const q of [.16, .88]) H.dot(...H.p(i + q, 3.95, .72), .65, 'blue');
  }
  shape(H, R, H.faceI(6.65, 3.95, 1.4, .34, 1.84), 'blue', .8);
  shape(H, R, H.tile(6.65, 3.96, 1.4, .66, .35), 'sun', .58);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(6.75 + n * .26, 4.03, .36), H.p(6.75 + n * .26, 4.53, .36)], 'blue', .5);
  const [dx, dy] = H.p(10.86, 2.57, 1.7);
  shape(H, R, H.faceJ(10.87, 1.68, 1.87, 1.03, 1.81), 'blue', .72);

  for (const j of [1.65, 3.5]) H.dot(...H.p(10.88, j, .73), 3.3, 'sun', 1, { knock: true });
  const [nx, ny] = H.p(4.77, 3.95, .64);
}

function kiosk(H, R) {
  box(H, R, .6, 7, 1.55, 1.6, .35, .95, 'coral', .66);
  box(H, R, .6, 7, 1.55, 1.6, 1.3, .08, 'sun', .6);
  for (const i of [.66, 2.05]) box(H, R, i, 7.07, .08, .08, 1.38, 1.18, 'blue', .7);
  box(H, R, .4, 6.82, 1.95, 1.93, 2.54, .12, 'paper', .8);
  for (let i = .42; i < 2.3; i += .3) shape(H, R, H.tile(i, 6.83, .15, 1.91, 2.67), 'coral', .6);

  for (let n = 0; n < 3; n++) {
    const [x, y] = H.p(.9 + n * .44, 8.33, 1.4);
    paper(H, R, x, y, ['TIDE', 'INK', 'REEF'][n], 15, 21);
  }
  box(H, R, .7, 9, 1.45, .45, .35, .16, 'teal', .65);
  for (let n = 0; n < 5; n++) {
    const [x, y] = H.p(.81 + n * .27, 9.38, .9);
    paper(H, R, x, y, n % 2 ? 'MAP' : 'SEA', 11, 20);
  }
  const [x, y] = H.p(1.6, 7.62, 1.38);
  box(H, R, 1.4, 7.2, .42, .35, 1.39, .28, 'teal', .75);
  H.line(R, [[x - 7, y - 11], [x + 2, y - 15]], 'blue', 2);
  for (let n = 0; n < 3; n++) bottle(H, R, ...H.p(.77, 7.1 + n * .27, 1.39), inks[n], .21);
}

function vending(H, R) {
  box(H, R, 10.2, 7.27, 1.2, 1.02, .35, 1.92, 'coral', .66);
  shape(H, R, H.faceI(10.3, 8.31, .7, 1.0, 2.08), 'blue', .7);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
    const [x, y] = H.p(10.44 + c * .2, 8.32, 1.19 + r * .27);
    bottle(H, R, x, y, inks[(c + r) % 3], .14);
  }
  for (let n = 0; n < 3; n++) H.dot(...H.p(11.18, 8.32, 1.65 - n * .15), 1.8, n === 1 ? 'sun' : 'paper', 1, { knock: true });
  shape(H, R, H.faceI(10.48, 8.32, .43, .59, .77), 'blue', .75);

  box(H, R, 11.45, 8.55, .38, .42, .35, .66, 'teal', .7);
  H.line(R, [H.p(11.5, 8.8, 1.02), H.p(11.76, 8.8, 1.02)], 'blue', 2);
}

function station(H, R, room) {
  slab(H, R, room, { ink: 'blue', tone: .66 });
  backWalls(H, R, room, 3.8, { ink: 'teal', tone: .4, style: 'tile' });
  box(H, R, .25, 4.6, 11.5, 7.15, 0, .35, 'paper', .8);
  for (let j = 5.15; j < 11.7; j += .75) H.line(R, [H.p(.3, j, .36), H.p(11.7, j, .36)], 'teal', .45, { tone: .24 });
  for (let i = .45; i < 11.7; i += .75) H.line(R, [H.p(i, 4.64, .36), H.p(i, 11.7, .36)], 'teal', .45, { tone: .24 });
  shape(H, R, H.tile(.3, 4.7, 11.4, .33, .36), 'sun', .64);
  for (let i = .4; i < 11.7; i += .21) for (const j of [4.76, 4.92]) H.dot(...H.p(i, j, .37), .85, 'blue', .65);
  H.line(R, [H.p(.3, 5.07, .36), H.p(11.7, 5.07, .36)], 'blue', 1);
  shape(H, R, H.faceI(3.3, .15, 6.2, 2.64, 3.3), 'paper', .9);

  for (let i = 1.3; i < 10.8; i += 1.5) {
    H.dot(...H.p(i, .13, 2.5), 3, 'sun', 1, { knock: true });
    if (i < 10) H.line(R, [H.p(i, .13, 2.5), H.p(i + 1.5, .13, 2.5)], 'sun', 1.4);
  }
  const [tx, ty] = H.p(.14, 3.2, 2.2);
  shape(H, R, [[tx - 45, ty - 27], [tx + 45, ty - 27], [tx + 45, ty + 28], [tx - 45, ty + 28]], 'blue', .8);

  for (const [n, text] of ['REEF END    02', 'MIDNIGHT    06', 'THE TRENCH  12'].entries()) {

    H.line(R, [[tx - 37, ty + n * 11], [tx + 37, ty + n * 11]], 'teal', .5);
  }
  const [cx, cy] = H.p(.12, 5.2, 2.87);
  oval(H, R, cx, cy, 15, 15, 'paper', 1);
  for (let k = 0; k < 12; k++) H.dot(cx + Math.cos(k * Math.PI / 6) * 11, cy + Math.sin(k * Math.PI / 6) * 11, .85, 'blue');
  H.line(R, [[cx, cy - 8], [cx, cy], [cx + 6, cy + 3]], 'blue', 1.4);
  for (const j of [1.2, 10.5]) {
    stroke(H, R, [H.p(.15, j, .42), H.p(.15, j, 2.7), H.p(.15, j + .6, 3.15)], 'sun', 5);
    const [x, y] = H.p(.15, j, 1.45);
    oval(H, R, x, y, 8, 8, 'coral', .7);
    H.line(R, [[x - 6, y], [x + 6, y]], 'blue', 1.2);
    H.line(R, [[x, y - 6], [x, y + 6]], 'blue', 1.2);
    for (const z of [.72, 2.12]) H.line(R, [H.p(.1, j - .14, z), H.p(.1, j + .14, z)], 'blue', 2);
  }
  train(H, R);
  coral(H, R, 11.2, 1.1, .05, 32, 'coral');
  coral(H, R, .58, 5.1, .35, 31, 'coral');
  bench(H, R, 3.1, 7.6, 3.05, 'teal');
  for (let i = 3.2; i < 6; i += .24) H.line(R, [H.p(i, 7.76, .69), H.p(i, 8.3, .69)], 'blue', .6);
  for (const i of [3.2, 4.6, 6.05]) H.line(R, [H.p(i, 7.9, .77), H.p(i, 8.25, .94), H.p(i, 8.38, .77)], 'blue', 2.1);
  suitcase(H, R, 6.25, 7.45, .35, 'sun', .7);
  suitcase(H, R, 6.32, 7.53, .88, 'coral', .55);
  suitcase(H, R, 5.9, 8.7, .35, 'teal', .6);
  kiosk(H, R);
  vending(H, R);
  for (let n = 0; n < 3; n++) {
    const i = 8.2 + n * 1.05;
    box(H, R, i, 10.04, .37, 1.27, .35, .9, 'teal', .7);
    box(H, R, i, 10.08, .37, .35, 1.25, .05, 'sun', .8);
    const [x, y] = H.p(i + .18, 10.23, 1.31);
    oval(H, R, x, y, 4, 2, 'blue', .7);
    H.line(R, [H.p(i + .38, 10.65, 1.01), H.p(i + .95, 10.65, 1.01)], 'coral', 2.4);
  }

  box(H, R, 7.2, 10.34, .48, .46, .35, .65, 'sun', .7);
  suitcase(H, R, 7.1, 10.29, 1.0, 'coral', .7);
  const [mx, my] = H.p(3.65, 10.02, .36);
  shape(H, R, loop([[mx - 25, my], [mx - 15, my - 7], [mx + 17, my - 4], [mx + 25, my + 5], [mx + 9, my + 12], [mx - 17, my + 9]], 2), 'blue', .6);
  oval(H, R, mx, my + 2, 19, 6, 'coral', .45);
  for (const [dx, dy] of [[-7, 0], [2, 4], [9, -1], [-1, -2]]) H.dot(mx + dx, my + dy, 1.5, 'sun', 1, { knock: true });
  paper(H, R, mx + 26, my + 4, 'TIPS', 16, 16);
  table(H, R, 1.25, 5.6, 1.4, .6, .74, 'sun');
  for (let n = 0; n < 5; n++) {
    const [x, y] = H.p(1.42 + n * .23, 5.85, .88);
    H.line(R, [[x - 4, y + 3], [x + 4, y - 4]], n % 2 ? 'blue' : 'coral', 1.4);
    H.outline(R, ell(x + 4, y - 4, 2, 2, 10), 'blue', .7);
  }
  box(H, R, 1.08, 6.25, .72, .5, .35, .3, 'coral', .75);
  const [bx, by] = H.p(1.44, 6.53, .68);
  stroke(H, R, [[bx - 6, by], [bx - 6, by - 6], [bx + 5, by - 6], [bx + 5, by]], 'blue', 1.2);
  for (const i of [2.6, 3.2]) {
    const [x, y] = H.p(i, 5.5, .36);
    shape(H, R, [[x - 7, y + 2], [x + 7, y + 2], [x, y - 17]], 'sun', .8);
    H.line(R, [[x - 4, y - 6], [x + 4, y - 6]], 'coral', 3);
  }
  box(H, R, 1.45, 10.3, 1.62, .76, .5, .08, 'teal', .6);
  for (const i of [1.6, 2.9]) for (const j of [10.38, 10.93]) oval(H, R, ...H.p(i, j, .41), 3.2, 4, 'blue', .75);
  for (const j of [10.35, 10.99]) H.line(R, [H.p(1.48, j, .59), H.p(1.48, j, 1.4)], 'blue', 1.5);
  H.line(R, [H.p(1.48, 10.35, 1.4), H.p(1.48, 10.99, 1.4)], 'coral', 3);
  suitcase(H, R, 1.72, 10.32, .59, 'sun', .75);
  suitcase(H, R, 2.08, 10.64, .59, 'teal', .74);
  suitcase(H, R, 1.88, 10.48, 1.11, 'coral', .53);
  coral(H, R, 11.2, 11.25, .35, 28, 'coral');
}

function live(H, R, t) {
  const u = cycle(t, 12), open = Math.max(0, Math.min(1, Math.sin(Math.PI * Math.min(1, u / .72)) * 3));
  for (const side of [-1, 1]) {
    const i = 7.35 + side * .35 + side * open * .56;
    shape(H, R, H.faceI(i - .32, 3.99, .64, .36, 1.83), 'teal', .5);
    shape(H, R, H.faceI(i - .24, 4, .46, 1.06, 1.67), 'sun', .4);
    H.line(R, [H.p(i - side * .23, 4.01, .85), H.p(i - side * .23, 4.01, 1.04)], 'blue', 1.1);
  }
  const board = cycle(t + 1, 12), bj = 6.4 - Math.min(1, board / .53) * 2.3;
  if (board < .6) H.at(7.25, bj, .6, HH => HH.opacity(Math.min(1, (1 - board / .6) * 5), () => {
    creature(HH, R, ...HH.p(7.25, bj, .92 + Math.sin(t * 2) * .05), 'jelly', t, .56, 'coral');
    suitcase(HH, R, 7.63, bj + .2, .36, 'sun', .36);
  }));
  H.at(4.1, 8.18, .4, HH => {
    const [x, y] = HH.p(4.1, 8.18, 1.0);
    creature(HH, R, x, y, 'jelly', t + 2, .54, 'sun');
    paper(HH, R, x + 3, y + 2, 'TIDE', 26, 21);
  });
  H.at(8.8, 6.55, .6, HH => {
    creature(HH, R, ...HH.p(8.8, 6.55, .9 + Math.sin(t + 1) * .08), 'jelly', t + 1, .62, 'teal');
    suitcase(HH, R, 9.27, 6.85, .35, 'coral', .53);
  });
  H.at(1.25, 7.58, .6, HH => {
    const [x, y] = HH.p(1.25, 7.58, 1.54);
    creature(HH, R, x, y, 'jelly', t + 4, .35, 'sun');
    oval(HH, R, x, y - 16, 10, 3, 'blue', .65);
  });
  H.at(3.6, 9.45, .7, HH => {
    const [x, y] = HH.p(3.6, 9.45, .9 + Math.sin(t * 2) * .03);
    creature(HH, R, x, y, 'jelly', t, .6, 'coral');
    const squeeze = Math.sin(t * 3) * 3;
    shape(HH, R, [[x - 12 - squeeze, y - 5], [x + 12 + squeeze, y - 5], [x + 12 + squeeze, y + 9], [x - 12 - squeeze, y + 9]], 'sun', .75);
    for (let n = -3; n <= 3; n++) HH.line(R, [[x + n * (2 + squeeze * .15), y - 5], [x + n * (2 + squeeze * .15), y + 9]], 'blue', .7);
    for (const dx of [-15 - squeeze, 15 + squeeze]) shape(HH, R, [[x + dx - 3, y - 7], [x + dx + 3, y - 7], [x + dx + 3, y + 11], [x + dx - 3, y + 11]], 'teal', .8);
    for (let n = 0; n < 3; n++) {
      const a = cycle(t + n * .8, 3), px = x + 17 + a * 17, py = y - 16 - a * 31;
      HH.opacity(1 - a, () => { HH.dot(px, py, 2, 'blue'); HH.line(R, [[px + 2, py], [px + 2, py - 8], [px + 6, py - 6]], 'blue', .7); });
    }
  });
  H.at(2.05, 6.13, .65, HH => {
    const [x, y] = HH.p(2.05, 6.13, .9);
    creature(HH, R, x, y, 'jelly', t + 1, .5, 'teal');
    shape(HH, R, loop([[x - 13, y - 20], [x - 10, y - 30], [x + 7, y - 32], [x + 14, y - 20]], 2), 'sun', .85);
    HH.line(R, [[x - 15, y - 20], [x + 15, y - 20]], 'blue', 1.5);
    const dx = Math.sin(t * 3) * 5;
    stroke(HH, R, [[x + 8, y - 4], [x + 18 + dx, y - 5], [x + 21 + dx, y - 18]], 'teal', 2);
    HH.line(R, [[x + 18 + dx, y - 16], [x + 26 + dx, y - 23]], 'blue', 2);
    HH.outline(R, ell(x + 27 + dx, y - 25, 3, 3), 'blue', 1);
  });
  H.at(10.0, 9.05, .7, HH => {
    const [x, y] = HH.p(10, 9.05, .91);
    creature(HH, R, x, y, 'jelly', t + 3, .53, 'sun');
    const [vx, vy] = HH.p(10.88, 8.32, 1.35);
    stroke(HH, R, [[x + 8, y], [x + 23, y - 4], [vx, vy + Math.sin(t * 2) * 3]], 'sun', 1.2);
    const sip = cycle(t, 5);
    bottle(HH, R, x - 10, y + 3 - Math.sin(sip * Math.PI) * 7, 'coral', .25);
    if (sip < .18) HH.dot(vx + 3, vy - 5, 2, 'sun', 1, { knock: true });
  });
  H.at(8.85, 10.88, .6, HH => {
    const [x, y] = HH.p(8.85, 10.88, .95);
    creature(HH, R, x, y, 'jelly', t + 5, .48, 'coral');
    const [tx, ty] = HH.p(8.39, 10.24, 1.35);
    stroke(HH, R, [[x - 6, y], [x - 16, y - 2], [tx, ty]], 'coral', 1.3);
    shape(HH, R, [[tx - 5, ty - 2], [tx + 3, ty - 4], [tx + 5, ty], [tx - 3, ty + 2]], 'paper', 1, .5);
    HH.dot(tx + 6, ty, 1.8, Math.sin(t * 2) > 0 ? 'sun' : 'teal', 1, { knock: true });
  });
  for (let n = 0; n < 8; n++) {
    const b = cycle(t + n * .83, 8), [x, y] = H.p(.3 + n * 1.57, 1.1 + n % 2 * .4, .45 + b * 2.7);
    H.outline(R, ell(x + Math.sin(t + n) * 3, y, 1.7 + n % 3, 1.9 + n % 3), 'paper', .7, { tone: .6 });
  }
}

export default function enrich(room) {
  return { ...room, under(H, R) { station(H, R, this); }, live };
}
