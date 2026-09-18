import { world, shape, oval, stroke, box, ell, loop, TAU, actor } from '../../worlds/common.js';
import { timber, metal, vessel, bentTube, drape, benchFrame, pendant } from '../materials.js';
import { cabinetFrame, basin, masonry } from '../structure.js';
import { windowBay, wallRack, hangingRail, panelFront } from '../joinery.js';

const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };

function plate(H, R, i, j, z, r = 10, repair = false) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y, r, r * .37, 'paper', 1);
  H.outline(R, ell(x, y, r * .73, r * .25), 'teal', .8);
  if (repair) H.line(R, [[x + r * .48, y + 2], [x + r * .76, y + 1]], 'coral', 1.3);
}
function basket(H, R, x, y, covered) {
  const bowl = loop([[x - 28, y - 17], [x + 29, y - 17], [x + 25, y + 2], [x + 16, y + 8], [x - 18, y + 7]], 1);
  shape(H, R, bowl, 'sun', .58, .9);
  H.clip(bowl, () => {
    for (let k = -5; k < 6; k++) H.line(R, [[x + k * 6, y - 21], [x + k * 5, y + 11]], 'coral', .8);
    for (let k = 0; k < 5; k++) stroke(H, R, [[x - 30, y - 14 + k * 4], [x, y - 9 + k * 4], [x + 30, y - 14 + k * 4]], 'blue', .55, .65);
  });
  oval(H, R, x, y - 16, 28, 8, 'paper', 1);
  oval(H, R, x, y - 16, 23, 5, 'blue', .46);
  if (covered) {
    shape(H, R, loop([[x - 28, y - 18], [x - 14, y - 24], [x + 16, y - 22], [x + 28, y - 15], [x + 20, y - 9], [x + 25, y + 3], [x + 11, y - 3], [x - 17, y - 9], [x - 24, y]], 1), 'paper', 1, .8);
    stroke(H, R, [[x - 23, y - 1], [x - 17, y - 11], [x + 8, y - 5], [x + 22, y + 1]], 'coral', 1);
    for (let k = 0; k < 5; k++) H.line(R, [[x + 12 + k * 2, y - 3], [x + 13 + k * 2, y]], 'teal', .75);
  }
  for (const s of [-1, 1]) stroke(H, R, [[x + s * 23, y - 13], [x + s * 33, y - 27], [x + s * 25, y - 29], [x + s * 19, y - 18]], 'sun', 2);
  return [[x - 29, y - 23], [x + 29, y - 23]];
}
function person(H, R, foot, hands, shirt = 'teal', scale = 1, head = 0) {
  const [x, y] = foot, P = (a, b) => [x + a * scale, y + b * scale];
  oval(H, R, x + 2, y + 2, 14 * scale, 4 * scale, 'blue', .18);
  for (const s of [-1, 1]) {
    stroke(H, R, [P(s * 5, -29), P(s * 6, -14), P(s * 8, -1)], 'blue', 6 * scale);
    oval(H, R, ...P(s * 8 + 2, 0), 5 * scale, 2.5 * scale, 'blue', .9);
  }
  shape(H, R, loop([P(-8, -56), P(8, -55), P(10, -28), P(-9, -28)], 1), shirt, .65, .9);
  H.line(R, [P(-6, -30), P(7, -30)], 'paper', .65);
  oval(H, R, ...P(head, -66), 7.5 * scale, 8 * scale, 'coral', .3);
  shape(H, R, [P(-8 + head, -67), P(-7 + head, -73), P(head, -76), P(7 + head, -71), P(8 + head, -66), P(head, -69), P(-5 + head, -64)], 'blue', .86, .5);
  H.dot(...P(3 + head, -66), .8 * scale, 'blue');
  H.line(R, [P(2 + head, -61), P(5 + head, -61)], 'blue', .5);
  hands.forEach((hand, n) => {
    const s = n ? 1 : -1, sh = P(s * 6, -52), el = [(sh[0] + hand[0]) / 2 + s * 5, (sh[1] + hand[1]) / 2 + 8];
    stroke(H, R, [sh, el, hand], 'blue', 5.8 * scale);
    stroke(H, R, [sh, el, hand], shirt, 4.2 * scale);
    oval(H, R, ...hand, 2.4 * scale, 2 * scale, 'coral', .38);
  });
}

function screen(H, R) {
  const face = H.faceI(8.2, 2.25, 3.3, .1, 3.65);
  shape(H, R, face, 'teal', .58, 1);
  for (let i = 8.29; i < 11.45; i += .25) H.line(R, [H.p(i, 2.28, .18), H.p(i, 2.28, 3.57)], 'paper', .7, { tone: .7 });
  for (const z of [.18, 3.5]) timber(H, R, 8.15, 2.2, 3.45, .12, z, .13, 'sun');
  for (const i of [8.2, 11.48]) timber(H, R, i, 2.2, .12, .14, .04, 3.62, 'sun');
  H.line(R, [H.p(8.32, 2.37, 1.6), H.p(8.32, 2.37, 1.93)], 'blue', 2);
}
const room = world('mexico-city-market-tortillas', 'The warm basket passes', { wall: 'paper', wallTone: .68, height: 4, floor: 'paper', tone: 1, pattern: 'tiles', accent: 'teal', head: 45 }, (H, R) => {
  masonry(H, R, 'nw', 0, 12, 0, .9, 'coral', .3);
  windowBay(H, R, 'nw', 1.2, 2.15, 1.7, 1.95, { ink: 'teal', divisions: 2 });
  box(H, R, 8.15, .1, 3.35, .12, .04, 3.68, 'blue', .7);
  for (const i of [8.02, 11.52]) timber(H, R, i, .11, .16, .49, .03, 3.84, 'sun');
  timber(H, R, 8.02, .1, 3.65, .52, 3.74, .13, 'sun');
  wallRack(H, R, 'ne', .55, 7, 2.03, 1.76, 2, 'teal', (P, base, row) => {
    if (row === 0) for (let n = 0; n < 5; n++) {
      const x = .5 + n * 1.29;
      shape(H, R, [P(x, base + .08), P(x + .72, base + .08), P(x + .72, base + .61), P(x, base + .61)], n % 2 ? 'paper' : 'sun', n % 2 ? 1 : .45, .6);
      H.line(R, [P(x - .04, base + .62), P(x + .76, base + .62)], 'blue', 2);
      H.line(R, [P(x + .15, base + .24), P(x + .5, base + .24)], 'teal', 2);
    } else {
      for (let n = 0; n < 4; n++) { const [x, y] = P(.7 + n * 1.32, base + .15); oval(H, R, x, y - 9, 9, 10, 'paper', 1); H.outline(R, ell(x, y - 9, 6, 7), 'coral', .75); }
      const [x, y] = P(6.24, base + .21); oval(H, R, x, y - 5, 5, 6, 'paper', 1);
    }
  });
  hangingRail(H, R, 'nw', 4.1, 3.8, 3.15, 4, (P, u, n) => {
    const [x, y] = P(u, -.24);
    H.line(R, [[x, y], [x, y + 20]], 'blue', 1.5);
    if (n === 1) oval(H, R, x, y + 26, 10, 8, 'blue', .65);
    else shape(H, R, [[x - 4, y + 19], [x + 4, y + 19], [x + 6, y + 34], [x - 5, y + 34]], 'paper', 1, .65);
  });
  cabinetFrame(H, R, .75, .65, 6.4, 1.54, .1, 1.56, 3, 'teal', (i, j, w, d, z, h, n) => {
    if (n === 0) for (let k = 0; k < 5; k++) metal(H, R, i + .1, j, w - .2, d - .04, z + .15 + k * .22, .06, 'paper');
    else if (n === 1) { vessel(H, R, i + .48, j + .63, z + .04, 14, 23, 'coral', false); vessel(H, R, i + 1.29, j + .64, z + .04, 10, 18, 'sun', false); }
    else drape(H, R, i + .05, j + .05, w - .13, d - .1, z + .6, .46, 'paper');
  });
  for (let i = .82; i < 7.05; i += .45) for (let j = .71; j < 2.07; j += .44) shape(H, R, H.tile(i, j, .42, .4, 1.69), 'paper', 1, .45);
  metal(H, R, 1.1, .88, 2.1, 1.06, 1.72, .26, 'blue');
  const gp = H.p(2.16, 1.44, 2.05); oval(H, R, ...gp, 34, 17, 'blue', .85); H.outline(R, ell(...gp, 31, 14), 'paper', .8);
  for (const x of [1.35, 2.86]) H.dot(...H.p(x, 2.02, 1.87), 2.2, 'coral');
  vessel(H, R, 4.1, 1.42, 1.75, 18, 13, 'paper');
  drape(H, R, 3.68, 1.1, .9, .76, 2.19, .22, 'paper');
  for (let n = 0; n < 4; n++) plate(H, R, 6.1, 1.42, 1.75 + n * .05, 14, n === 0);
  benchFrame(H, R, 1.55, 4.65, 4.8, 2.35, 1.25, 'sun');
  cabinetFrame(H, R, 1.68, 4.74, 4.52, 1.9, .2, .91, 3, 'coral', (i, j, w, d, z, h, n) => {
    if (n === 0) for (let k = 0; k < 5; k++) plate(H, R, i + w / 2, j + .78, z + .13 + k * .065, 13, k === 0);
    if (n === 1) drape(H, R, i, j, w, d - .1, z + .5, .22, 'paper');
    if (n === 2) for (let k = 0; k < 4; k++) timber(H, R, i + k * .31, j, .09, d - .14, z, .63, 'sun');
  });
  metal(H, R, 2.02, 5.05, 1.65, 1.36, 1.3, .14, 'blue');
  metal(H, R, 2.08, 5.1, 1.53, 1.23, 1.45, .13, 'teal');
  const hinge = H.p(2.85, 5.06, 1.63);
  shape(H, R, [H.p(2.08, 5.07, 1.6), H.p(3.61, 5.07, 1.6), H.p(3.61, 4.78, 2.52), H.p(2.08, 4.78, 2.52)], 'blue', .68, .9);
  H.line(R, [H.p(2.89, 4.84, 2.45), H.p(2.89, 4.72, 2.84)], 'blue', 4);
  H.line(R, [H.p(2.89, 4.72, 2.73), H.p(2.89, 4.72, 2.84)], 'sun', 4);
  H.line(R, [H.p(2.02, 5.05, 1.61), H.p(3.69, 5.05, 1.61)], 'paper', 2);
  H.dot(...hinge, 3.3, 'coral');
  for (let n = 0; n < 4; n++) shape(H, R, H.tile(4.22, 5.01 + n * .02, 1.19, .89, 1.31 + n * .025), 'paper', 1, .5);
  plate(H, R, 5.49, 6.38, 1.34, 12, true);
  bentTube(H, R, [[4.12, 6.25, 1.35], [4.6, 6.48, 1.36], [4.92, 6.33, 1.36]], 1.7, 'teal');
  timber(H, R, 6.14, 5.74, 1.49, 1.18, .79, .12, 'sun');
  for (const i of [6.22, 7.42]) timber(H, R, i, 5.91, .13, .87, .07, .72, 'teal');
  basin(H, R, 9.45, 7.68, 1.97, 1.49, 1.24, 'paper');
  for (const i of [9.55, 11.16]) timber(H, R, i, 7.81, .13, 1.18, .05, 1.17, 'teal');
  drape(H, R, 9.35, 9.27, 1.64, .9, .04, 0, 'teal');
  vessel(H, R, 10.16, 10.24, .06, 17, 18, 'paper');
  bentTube(H, R, [[11.43, 8.42, .08], [11.31, 8.32, 2.3]], 2.1, 'sun');
  for (let k = 0; k < 6; k++) H.line(R, [H.p(11.24 + k * .07, 8.45, .16), H.p(11.24 + k * .07, 8.45, .4)], 'blue', 1);
  pendant(H, R, 4.53, 3.12, 4.1, 2.82, 'sun', .85);
  for (let n = 0; n < 3; n++) { const [x, y] = H.p(.36, 8.8 + n * .64, 3.35); H.line(R, [[x, y - 12], [x, y + 5]], 'blue', .7); oval(H, R, x, y + 12, 5, 13, 'sun', .78); for (let k = 0; k < 5; k++) H.line(R, [[x - 4, y + 4 + k * 3], [x + 4, y + 4 + k * 3]], 'coral', .5); }
}, (H, R, t) => {
  const u = ((t % 30) + 30) % 30;
  let travel = 0;
  if (u >= 6 && u < 10) travel = ease(6, 9, u);
  else if (u >= 10 && u < 12) travel = 1 - ease(10, 12, u);
  else if (u >= 18 && u < 23) travel = ease(18, 21, u);
  else if (u >= 23 && u < 28) travel = 1 - ease(23, 27, u);
  const i = 7.15 + travel * 2.65, j = 6.62 - travel * 5.65;
  const held = ease(1, 5, u) * (1 - ease(27, 28, u));
  const foot = H.p(i, j, .02), bp = H.p(i - .36, j - .3, .95 + held * .17);
  const filled = u < 9.5 || u >= 22;
  const hands = [[bp[0] - 29, bp[1] - 23], [bp[0] + 29, bp[1] - 23]];
  person(H, R, foot, hands, 'coral', 1.3, travel * -1.5);
  basket(H, R, bp[0], bp[1], filled);
  for (const hand of hands) oval(H, R, ...hand, 2.9, 2.4, 'coral', .38);
  const corner=H.p(5.29,5.03,1.43), curl=Math.sin(u*TAU/30)*2;
  shape(H,R,[[corner[0]-5,corner[1]],[corner[0]+4,corner[1]-4-curl],[corner[0]+6,corner[1]+4]],'paper',1,.5);
  screen(H, R);
  actor(H, R, 4.14, 8.15, u * .96, 'talk', { shirt: ['teal', .56], face: 'ne' }, 0, 1.25);
});
room.loopSeconds = 30;
room.stillTime = 7.1;
export default room;
