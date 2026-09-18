import { world, shape, oval, stroke, box, cycle, actor, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, cushion, benchFrame, drape } from '../materials.js';
import { masonry } from '../structure.js';


const ease = (a, b, u) => { const q = Math.max(0, Math.min(1, (u - a) / (b - a))); return q * q * (3 - 2 * q); };
const base = { x: 0, y: 0, drop: 0, lean: 0, head: -5, al: 15, ar: 34, el: 35, er: 30, ll: -8, lr: 10, kl: 0, kr: 0, roll: 0 };
const raised = { ...base, lean: 3, head: -24, ar: 156, er: -8, al: 35, el: 30, y: -2 };
FIGURES.clips.hanoiTerraceFirst = { dur: 24, keys: [[0, base], [.2, base], [.4, raised], [.6, raised], [.91, base], [1, base]] };
FIGURES.clips.hanoiTerraceSecond = { dur: 24, keys: [[0, base], [.4, base], [.6, raised], [.65, raised], [.91, base], [1, base]] };
function racket(H, R, p, lifted, ink, small = false, direction = 1) {
  const s = small ? .48 : 1, angle = -.2 - lifted * .9, dx = Math.cos(angle) * direction, dy = Math.sin(angle), hx = p[0], hy = p[1], x = hx + dx * 36 * s, y = hy + dy * 36 * s;
  H.line(R, [[hx - dx * 4 * s, hy - dy * 4 * s], [x, y]], 'blue', 2.4 * s); H.line(R, [[hx - dx * 3 * s, hy - dy * 3 * s], [hx + dx * 8 * s, hy + dy * 8 * s]], ink, 4 * s);
  H.line(R, [[hx + dx * 1 * s, hy + dy * 1 * s], [hx + dx * 5 * s, hy + dy * 5 * s]], 'sun', 2 * s);
  const P = (a, b) => [x + (a * dx - b * dy) * s, y + (a * dy + b * dx) * s], ring = Array.from({ length: 33 }, (_, n) => P(Math.cos(n * Math.PI / 16) * 15, Math.sin(n * Math.PI / 16) * 11));
  shape(H, R, ring, 'paper', .36, .9); H.clip(ring, () => { for (let n = -12; n < 15; n += 4) { H.line(R, [P(n, -13), P(n, 13)], 'teal', .55); H.line(R, [P(-17, n), P(17, n)], 'teal', .55); } }); H.outline(R, ring, ink, 2.1 * s);
}
function target(H, R, u) {
  const pulse = ease(7.7, 8.8, u) * (1 - ease(19.5, 22, u)), swing = Math.sin((u - 8.8) * 2.1) * pulse * Math.exp(-Math.max(0, u - 14.4) * .3), anchor = H.p(6.4, 5.1, 3.58), tip = [anchor[0] + swing * 10, anchor[1] + 34];
  stroke(H, R, [anchor, [anchor[0] + swing * 4, anchor[1] + 16], tip], 'blue', .8); oval(H, R, anchor[0], anchor[1], 3, 4, 'coral', .65); H.line(R, [[anchor[0] - 3, anchor[1] - 3], [anchor[0] + 3, anchor[1] + 2]], 'sun', 1.3);
  for (let n = -2; n <= 2; n++) { const q = [[tip[0] + n, tip[1] + 7], [tip[0] + n * 4.3 - 2.1, tip[1] - 11], [tip[0] + n * 4.3 + 2.1, tip[1] - 11]]; shape(H, R, q, n === 2 ? 'sun' : 'paper', 1, .5); H.line(R, [[tip[0] + n, tip[1] + 6], [tip[0] + n * 4.3, tip[1] - 10]], 'teal', .5); } oval(H, R, tip[0], tip[1] + 7, 4, 4, 'coral', .7);
}
const room = world('hanoi-terrace-shuttle', 'One feather caught', { floor: 'paper', tone: .65, wall: false, head: 28 }, (H, R) => {
  for (let i = 0; i < 12; i += 1.5) for (let j = 0; j < 12; j += 1.5) { shape(H, R, H.tile(i + .02, j + .02, 1.46, 1.46, .012), 'blue', (i + j) % 3 ? .04 : .1, .4); H.line(R, [H.p(i + .3, j + .18, .022), H.p(i + 1.2, j + .25, .022)], 'paper', .7); }
  masonry(H, R, 'nw', .1, 11.75, .02, 1.0, 'paper', .9); masonry(H, R, 'ne', .1, 11.75, .02, 1.0, 'paper', .9);
  for (const i of [.15, 1.62, 3.09, 4.56, 6.03, 7.5, 8.97, 10.44]) timber(H, R, i, .06, 1.4, .35, 1.02, .13, 'sun'); for (const j of [.3, 1.77, 3.24, 4.71, 6.18, 7.65, 9.12, 10.59]) timber(H, R, .06, j, .35, 1.4, 1.02, .13, 'sun');
  for (const i of [1.4, 3.6, 5.8, 8]) {
    shape(H, R, [H.p(i, .38, .15), H.p(i + .9, .38, .15), H.p(i + .9, .38, .82), H.p(i, .38, .82)], 'teal', .18, .6);
    H.line(R, [H.p(i + .08, .4, .75), H.p(i + .79, .4, .75)], 'paper', 1.2);
  }
  bentTube(H, R, [[3.69, .48, .14], [3.69, .48, .72], [8.85, .48, .72], [8.85, .48, 1.46]], 2.3, 'teal');
  for (const i of [4.19, 6.5, 8.19]) metal(H, R, i, .41, .16, .16, .66, .16, 'sun');
  metal(H, R, 8.62, .4, .43, .27, 1.38, .45, 'paper');
  H.line(R, [H.p(8.71, .69, 1.56), H.p(8.94, .69, 1.56)], 'teal', 1.2);
  for (const j of [1.2, 4.7]) metal(H, R, .26, j, .14, .14, 1.13, 2.63, 'teal');
  const screen = [H.p(.3, 1.2, 1.41), H.p(.3, 4.85, 1.41), H.p(.3, 4.85, 3.61), H.p(.3, 1.2, 3.61)]; shape(H, R, screen, 'teal', .3); H.clip(screen, () => { for (let j = 1.37; j < 4.8; j += .33) for (let z = 1.55; z < 3.55; z += .32) oval(H, R, ...H.p(.31, j, z), 2.5, 3.5, 'paper', 1); });
  for (const j of [1.37, 4.54]) {
    bentTube(H, R, [[.28, j, 1.15], [.67, j, 1.15], [.28, j, 1.83]], 1.6, 'blue');
    metal(H, R, .12, j - .11, .32, .27, 1.02, .09, 'sun');
  }
  for (let z = 1.59; z < 3.56; z += .31) H.line(R, [H.p(.33, 1.22, z), H.p(.33, 4.78, z)], 'teal', .5, {tone:.35});
  H.line(R, [H.p(.27, 1.15, 3.7), H.p(.27, 4.86, 3.7)], 'sun', 2.2);
  metal(H, R, 1.28, .49, .35, .42, 1.15, .13, 'blue');
  bentTube(H, R, [[1.44, .68, 1.28], [1.44, .68, 3.36]], 1.9, 'teal');
  H.line(R, [H.p(.83, .68, 3.08), H.p(2.14, .68, 3.08)], 'blue', 1.4);
  for (const i of [1.01, 1.27, 1.57, 1.9]) H.line(R, [H.p(i, .48, 3.08), H.p(i, .94, 3.08)], 'sun', 1.3);
  stroke(H, R, [H.p(1.45, .68, 2.97), H.p(1.7, .6, 1.37), H.p(2.16, .44, 1.14)], 'blue', .85);
  box(H, R, 9.14, .65, 2.34, 1.93, .25, 2.79, 'teal', .5); for (const i of [9.21, 11.13]) for (const j of [.73, 2.28]) metal(H, R, i, j, .21, .21, .04, .24, 'blue'); metal(H, R, 9.04, .57, 2.55, 2.09, 3.02, .11, 'blue');
  shape(H, R, H.faceI(9.26, 2.61, .91, .75, 2.89), 'blue', .48);
  for (let z = .86; z < 2.85; z += .18) { H.line(R, [H.p(9.31, 2.64, z), H.p(10.12, 2.64, z)], 'sun', 2.4); H.line(R, [H.p(9.33, 2.65, z + .035), H.p(10.1, 2.65, z + .035)], 'paper', .7); }
  H.line(R, [H.p(10.01, 2.69, 1.5), H.p(10.01, 2.69, 1.86)], 'blue', 2);
  shape(H, R, H.faceI(10.31, 2.61, 1.02, .73, 2.9), 'blue', .73);
  for (const z of [.79, 1.53, 2.27]) timber(H, R, 10.32, 1.79, .98, .88, z, .08, 'sun');
  for (let n = 0; n < 3; n++) { const p = H.p(10.57 + n * .27, 2.42, 1.63); H.line(R, [p, [p[0], p[1] - 17 - n % 2 * 4]], n === 1 ? 'coral' : 'paper', 6); oval(H, R, p[0], p[1] - 17 - n % 2 * 4, 3, 2, 'sun', .7); }
  drape(H, R, 10.44, 1.97, .72, .51, 2.36, .21, 'paper');
  const spool = H.p(10.79, 2.37, 1.02); oval(H, R, ...spool, 12, 8, 'teal', .65); oval(H, R, spool[0], spool[1] - 4, 12, 8, 'paper', 1); oval(H, R, spool[0], spool[1] - 4, 4, 3, 'blue', .65);
  H.line(R, [[spool[0] + 9, spool[1]], [spool[0] + 18, spool[1] + 9]], 'teal', 1.2);
  const door = [H.p(11.35, 2.63, .75), H.p(11.69, 3.69, .75), H.p(11.69, 3.69, 2.87), H.p(11.35, 2.63, 2.87)];
  shape(H, R, door, 'teal', .52);
  for (let z = .91; z < 2.74; z += .18) H.line(R, [H.p(11.4, 2.77, z), H.p(11.64, 3.52, z)], 'sun', 1.9);
  for (const z of [.98, 2.56]) H.line(R, [H.p(11.3, 2.58, z), H.p(11.44, 2.92, z)], 'blue', 2.4);
  timber(H, R, 9.24, 2.56, 2.01, .2, .35, .25, 'teal'); H.line(R, [H.p(10.02, 2.78, .48), H.p(10.48, 2.78, .48)], 'sun', 2.2);
  const cover = H.p(11.38, 2.31, 2.43); shape(H, R, [[cover[0] - 8, cover[1]], [cover[0] + 8, cover[1]], [cover[0] + 9, cover[1] + 22], [cover[0] + 3, cover[1] + 29], [cover[0] + 3, cover[1] + 44], [cover[0] - 3, cover[1] + 44], [cover[0] - 3, cover[1] + 29], [cover[0] - 9, cover[1] + 22]], 'coral', .55, .7); H.line(R, [[cover[0], cover[1] + 3], [cover[0], cover[1] + 23]], 'paper', .8);
  for (let n = 0; n < 4; n++) H.line(R, [H.p(11.52, 1.11 + n * .26, .48), H.p(11.52, 1.11 + n * .26, 2.56)], 'coral', 3);
  for (const j of [7.3, 10.51]) box(H, R, .15, j, 1.03, .19, .05, 3.51, 'teal', .6);
  timber(H, R, .43, 7.45, 1.32, 3.05, .06, .16, 'sun');
  const access = [H.p(.4, 7.45, .21), H.p(.4, 10.5, .21), H.p(.4, 10.5, 3.57), H.p(.4, 7.45, 3.57)]; shape(H, R, access, 'blue', .7); shape(H, R, [H.p(.53, 7.59, .28), H.p(.53, 10.37, .28), H.p(.53, 10.37, 3.43), H.p(.53, 7.59, 3.43)], 'teal', .4); H.line(R, [H.p(.55, 9.93, 2.03), H.p(.55, 9.93, 2.29)], 'sun', 2.4); timber(H, R, .32, 7.3, 1.1, 3.33, 3.56, .12, 'paper');
  shape(H, R, [H.p(.23, 7.18, 3.72), H.p(.23, 10.79, 3.72), H.p(1.58, 10.79, 3.53), H.p(1.58, 7.18, 3.53)], 'paper', 1);
  H.line(R, [H.p(1.59, 7.17, 3.52), H.p(1.59, 10.8, 3.52)], 'teal', 4);
  for (const j of [7.42, 10.51]) bentTube(H, R, [[.53, j, 2.95], [1.4, j, 3.5]], 1.8, 'sun');
  bentTube(H, R, [[1.53, 10.68, 3.51], [1.53, 10.68, .27], [1.9, 10.72, .16]], 2.8, 'teal');
  for (const z of [.83, 2.72]) H.line(R, [H.p(1.42, 10.69, z), H.p(1.66, 10.69, z)], 'sun', 2);
  for (const z of [.59, 2.91]) H.line(R, [H.p(.56, 7.69, z), H.p(.56, 7.87, z)], 'sun', 2.1);
  shape(H, R, H.tile(.61, 7.61, 1.88, 2.77, .04), 'teal', .26); for (let n = 0; n < 7; n++) H.line(R, [H.p(.77, 7.8 + n * .35, .05), H.p(2.2, 7.8 + n * .35, .05)], 'paper', .9);
  timber(H, R, 1.05, 10.58, 2.47, .92, .06, .17, 'sun'); for (let n = 0; n < 2; n++) { const p = H.p(1.5 + n * .8, 10.96, .25); oval(H, R, ...p, 10, 5, n ? 'coral' : 'teal', .65); H.line(R, [[p[0] - 5, p[1] - 3], [p[0] + 3, p[1] + 3]], 'paper', 2); }
  timber(H, R, .32, 5.32, 1.19, 1.53, 1.2, .12, 'sun');
  for (const j of [5.5, 6.47]) bentTube(H, R, [[.19, j, .92], [1.26, j, 1.2]], 1.5, 'blue');
  const mat = H.p(.85, 5.75, 1.47); H.line(R, [[mat[0] - 13, mat[1] + 4], [mat[0] + 14, mat[1] - 8]], 'coral', 15); oval(H, R, mat[0] + 14, mat[1] - 8, 7, 5, 'sun', .6); oval(H, R, mat[0] + 14, mat[1] - 8, 3, 2, 'paper', 1);
  for (const d of [-6, 5]) H.line(R, [[mat[0] + d - 3, mat[1] - 5], [mat[0] + d + 4, mat[1] + 4]], 'blue', 1.8);
  const bag = H.p(1.08, 6.47, 1.35); shape(H, R, [[bag[0] - 12, bag[1]], [bag[0] + 12, bag[1]], [bag[0] + 9, bag[1] - 19], [bag[0] - 9, bag[1] - 19]], 'teal', .6); stroke(H, R, [[bag[0] - 6, bag[1] - 18], [bag[0], bag[1] - 30], [bag[0] + 6, bag[1] - 18]], 'sun', 1.8);
  for (const i of [3.0, 8.72]) { metal(H, R, i - .47, 3.54, .94, .95, .03, .22, 'blue'); metal(H, R, i - .29, 3.7, .58, .59, .25, .16, 'sun'); bentTube(H, R, [[i, 4, .38], [i, 4, 2.62]], 4, 'blue'); H.line(R, [H.p(i, 4, 1.7), H.p(i + .13, 4, 1.7)], 'coral', 2.2); oval(H, R, ...H.p(i, 4, 2.62), 4, 2.5, 'sun', .8); }
  for (const i of [3.0, 8.72]) {
    metal(H, R, i - .11, 3.89, .22, .22, 1.62, .19, 'paper');
    H.line(R, [H.p(i - .13, 4.01, 1.74), H.p(i + .25, 4.01, 1.74)], 'coral', 2.1);
    bentTube(H, R, [[i - .36, 3.67, .25], [i, 4, .89], [i + .34, 4.35, .25]], 1.4, 'teal');
    for (const dx of [-.3, .3]) H.dot(...H.p(i + dx, 3.76, .28), 2, 'sun');
  }
  const winch = H.p(3.02, 4.02, 2.1); oval(H, R, ...winch, 6, 5, 'sun', .8); H.line(R, [[winch[0], winch[1]], [winch[0] - 10, winch[1] + 6], [winch[0] - 10, winch[1] + 12]], 'blue', 1.8);
  const P = (i, z) => H.p(i, 4.02, z), net = [P(3.04, 1.06), P(8.66, 1.06), P(8.66, 2.5), P(5.85, 2.37), P(3.04, 2.5)];
  shape(H, R, net, 'paper', .16, .65); H.clip(net, () => { for (let i = 3.1; i < 8.7; i += .23) H.line(R, [P(i, .98), P(i, 2.55)], 'teal', .6); for (let z = 1.13; z < 2.55; z += .2) H.line(R, [P(3.03, z), P(8.68, z)], 'teal', .6); }); stroke(H, R, [P(3.0, 2.52), P(5.85, 2.39), P(8.72, 2.52)], 'paper', 4); H.line(R, [P(3.0, 1.05), P(8.72, 1.05)], 'blue', 1.5);
  H.line(R, [P(6.01, 1.75), P(6.48, 1.75), P(6.48, 2.14), P(6.01, 2.14), P(6.01, 1.75)], 'coral', 1.15);
  for (let i = 3.1; i < 8.7; i += .47) H.line(R, [H.p(i, 4.3, .022), H.p(i + .7, 6.05, .022)], 'blue', .7, { tone: .18 });
  metal(H, R, 9.1, 4.76, .91, .84, .03, .24, 'blue'); bentTube(H, R, [[9.51, 5.16, .23], [9.51, 5.16, 3.62], [6.4, 5.1, 3.62]], 2.8, 'teal'); H.line(R, [H.p(9.5, 5.16, 3.0), H.p(8.6, 5.14, 3.62)], 'blue', 1.4);
  for (const z of [1.7, 2.91]) metal(H, R, 9.43, 5.07, .17, .17, z, .14, 'paper');
  H.line(R, [H.p(9.51, 5.16, 3.57), H.p(9.51, 4.98, 3.57)], 'sun', 2.1);
  H.outline(R, ell(...H.p(9.91, 6.6, .024), 14, 7), 'blue', 1, { tone: .17 });
  for (const [i, j] of [[4.16, 9.0], [8.57, 8.7]]) { shape(H, R, H.tile(i, j, .43, .43, .03), 'coral', .58); cushion(H, R, i + .05, j + .05, .34, .34, .05, .05, 'sun'); }
  benchFrame(H, R, 6.33, 10.12, 2.75, .85, .59, 'sun'); drape(H, R, 7.7, 10.18, 1.03, .69, .6, .29, 'paper'); box(H, R, 9.65, 9.82, 1.44, 1.16, .03, .34, 'sun', .5);
  for (const i of [6.49, 8.7]) bentTube(H, R, [[i, 10.19, .12], [i + .14, 10.69, .54], [i + .29, 10.19, .12]], 1.4, 'teal');
  timber(H, R, 6.52, 10.24, 2.33, .51, .2, .09, 'teal');
  const roll = H.p(7.07, 10.55, .36); oval(H, R, ...roll, 9, 5, 'coral', .6); oval(H, R, ...roll, 4, 2.8, 'paper', 1);
  for (const j of [9.92, 10.26, 10.6]) timber(H, R, 9.65, j, 1.44, .1, .1, .31, 'sun');
  for (const i of [9.68, 11.01]) timber(H, R, i, 9.85, .1, 1.09, .1, .33, 'sun');
  for (const [i, j] of [[9.98, 10.16], [10.59, 10.18], [10.29, 10.58]]) { oval(H, R, ...H.p(i, j, .46), 6, 5, 'coral', .55); H.line(R, [H.p(i, j, .51), H.p(i + .04, j, .58)], 'teal', 1); }
  const hamper = H.p(4.39, 10.48, .09); oval(H, R, ...hamper, 20, 10, 'teal', .7); shape(H, R, [[hamper[0] - 20, hamper[1]], [hamper[0] + 20, hamper[1]], [hamper[0] + 17, hamper[1] - 26], [hamper[0] - 17, hamper[1] - 26]], 'sun', .47); oval(H, R, hamper[0], hamper[1] - 26, 17, 8, 'blue', .55);
  for (let n = -2; n < 3; n++) H.line(R, [[hamper[0] + n * 7, hamper[1] - 2], [hamper[0] + n * 6, hamper[1] - 23]], 'teal', 1);
  for (const y of [-6, -13, -20]) H.line(R, [[hamper[0] - 17, hamper[1] + y], [hamper[0] + 17, hamper[1] + y]], 'paper', .8);
  drape(H, R, 4.12, 10.12, .78, .55, .73, .32, 'paper');
  const fan = H.p(6.85, 10.6, .64); shape(H, R, [[fan[0] - 1, fan[1] + 6], [fan[0] - 15, fan[1] - 7], [fan[0] - 6, fan[1] - 15], [fan[0] + 10, fan[1] - 12], [fan[0] + 16, fan[1] - 4]], 'paper', 1); for (let n = -2; n < 3; n++) H.line(R, [[fan[0], fan[1] + 5], [fan[0] + n * 6, fan[1] - 11 + Math.abs(n) * 2]], 'teal', .6);
  racket(H, R, H.p(2.43, 10.58, .28), .45, 'sun', true);
  bentTube(H, R, [[.21, 6.5, 1.06], [.21, 6.5, .35], [.83, 6.5, .24]], 3.2, 'blue');
}, (H, R, t) => {
  const u = cycle(t, 24) * 24, a = ease(4.8, 9.6, u) * (1 - ease(14.4, 22, u)), b = ease(9.6, 14.4, u) * (1 - ease(15.6, 22, u));
  actor(H, R, 6.15, 6.4, u, 'hanoiTerraceFirst', { face: 'se', shirt: ['coral', .68], pants: ['blue', .73], hairStyle: 'pony', prop: (HH, RR, pts) => racket(HH, RR, pts.nearHand, a, 'teal') }, 0, 1.8);
  actor(H, R, 8.3, 6, u, 'hanoiTerraceSecond', { face: 'sw', shirt: ['teal', .7], pants: ['blue', .66], hairStyle: 'short', prop: (HH, RR, pts) => racket(HH, RR, pts.nearHand, b, 'coral', false, -1) }, 0, 1.8);
  target(H, R, u);
  const p = H.p(.31, 4.78, 3.7), sway = Math.sin(u * Math.PI / 12) * 7; shape(H, R, [[p[0], p[1]], [p[0] + 19, p[1] + 5], [p[0] + 35, p[1] + sway], [p[0] + 31, p[1] + 9 + sway], [p[0] + 15, p[1] + 12], [p[0], p[1] + 6]], 'coral', .57, .55);
});
room.loopSeconds = 24;
room.stillTime = 2;
export default room;
