import { recessedFrame, specimen } from '../joinery.js';
import { shallowTray, foldedCloth, boundBook, satchel, handTool, framedPanel, servicePipe, slattedCrate } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, plant, cycle, TAU, ell, bottle } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -9, head: 17, al: 44, ar: 72, el: 42, er: 27 };
const hover = { ...seated, ar: 82, er: 14, lean: -12 };
FIGURES.clips.hongKongPingShanConsider = { dur: 18, keys: [[0, seated], [.16, seated], [.32, hover], [.47, hover], [.58, { ...hover, head: -8 }], [.72, { ...seated, ar: 61, er: 49, head: -8 }], [.86, seated], [1, seated]] };
const companion = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, head: 9, al: 24, ar: 41, el: 28, er: 50 };
FIGURES.clips.hongKongPingShanRespond = { dur: 18, keys: [[0, companion], [.35, companion], [.49, { ...companion, ar: 87, er: 17, head: -3 }], [.62, companion], [.71, { ...companion, ar: 34, er: 39 }], [.78, companion], [1, companion]] };

function stool(H, R, i, j, ink = 'sun', repaired = false) {
  table(H, R, i, j, 1.15, 1.07, .55, ink);
  for (const x of [i + .1, i + 1.02]) H.line(R, [H.p(x, j + .08, .3), H.p(x, j + .94, .3)], 'blue', 1.1);
  if (repaired) for (let k = 0; k < 3; k++) box(H, R, i + .03, j + .81, .26, .28, k * .022, .02, k % 2 ? 'coral' : 'paper', .54);
}

function cup(H, R, i, j, z) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y + 2, 8, 3, 'paper', 1);
  shape(H, R, [[x - 5, y - 10], [x + 5, y - 10], [x + 4, y + 1], [x - 4, y + 1]], 'paper', 1, .6);
  oval(H, R, x, y - 10, 5, 2, 'sun', .45);
}

function courtyardTree(H, R) {
  const [x, y] = H.p(2.24, 2.66, .15);
  oval(H, R, x, y, 43, 20, 'blue', .22);
  oval(H, R, x, y - 4, 39, 17, 'paper', 1);
  oval(H, R, x, y - 5, 32, 13, 'sun', .31);
  shape(H, R, [[x - 7, y - 6], [x + 9, y - 6], [x + 3, y - 63], [x + 23, y - 94], [x + 17, y - 98], [x - 5, y - 71], [x - 17, y - 103], [x - 23, y - 99], [x - 7, y - 59]], 'coral', .41);
  stroke(H, R, [[x - 3, y - 8], [x - 2, y - 58], [x + 21, y - 94]], 'blue', .8, .64);
  stroke(H, R, [[x - 3, y - 53], [x - 23, y - 83], [x - 37, y - 89]], 'blue', 2.4, .63);
  stroke(H, R, [[x + 2, y - 66], [x + 29, y - 83], [x + 45, y - 87]], 'blue', 2.1, .63);
  for (const [dx, dy, rx, ry, tone] of [[-36, -98, 26, 16, .51], [-16, -113, 28, 19, .62], [14, -113, 31, 19, .57], [41, -98, 26, 17, .48], [8, -94, 27, 17, .59]]) {
    oval(H, R, x + dx, y + dy, rx, ry, 'teal', tone);
    for (let k = 0; k < 6; k++) {
      const a = k * TAU / 6;
      stroke(H, R, [[x + dx + Math.cos(a) * rx * .34, y + dy + Math.sin(a) * ry * .34], [x + dx + Math.cos(a) * rx * .61, y + dy + Math.sin(a) * ry * .56]], 'paper', .75, .52);
    }
  }
  for (let k = 0; k < 8; k++) oval(H, R, ...H.p(2.61 + k % 4 * .61, 3.56 + Math.floor(k / 4) * .46, .023), 13 + k % 3 * 4, 5, 'teal', .11);
}

function courtyard(H, R) {
  for (let i = 0; i < 12; i += 1.48) for (let j = 0; j < 12; j += 1.19) {
    H.outline(R, H.tile(i + .02, j + .02, Math.min(1.42, 11.96 - i), Math.min(1.13, 11.96 - j), .02), 'blue', .65, { tone: .24 });
  }
  box(H, R, .02, .02, .18, 11.53, .02, 2.42, 'paper', .92);
  box(H, R, .02, .02, 6.86, .18, .02, 2.12, 'paper', .92);
  box(H, R, 9.18, .02, 2.68, .18, .02, 2.12, 'paper', .92);
  for (let row = 0; row < 7; row++) {
    const z = .14 + row * .24;
    H.line(R, [H.p(.23, .22, z), H.p(.23, 11.49, z)], 'blue', .7, { tone: .42 });
    for (let j = .25 + row % 2 * .42; j < 11.45; j += .84) H.line(R, [H.p(.24, j, z), H.p(.24, j, z + .22)], 'blue', .65, { tone: .34 });
    for (const [i, width] of [[.25, 6.47], [9.34, 2.39]]) {
      H.line(R, [H.p(i, .24, z), H.p(i + width, .24, z)], 'blue', .7, { tone: .42 });
      for (let p = i + row % 2 * .42; p < i + width; p += .84) H.line(R, [H.p(p, .24, z), H.p(p, .24, z + .22)], 'blue', .65, { tone: .34 });
    }
  }
  for (const [i, width] of [[.01, 6.86], [9.18, 2.69]]) {
    box(H, R, i, -.01, width, .47, 2.14, .1, 'teal', .58);
    for (let p = i + .11; p < i + width; p += .24) H.line(R, [H.p(p, .01, 2.27), H.p(p, .44, 2.27)], 'blue', .65, { tone: .5 });
  }
  box(H, R, -.02, .02, .44, 11.55, 2.44, .1, 'teal', .57);
  for (let j = .15; j < 11.5; j += .26) H.line(R, [H.p(.01, j, 2.56), H.p(.41, j, 2.56)], 'blue', .6, { tone: .52 });
  box(H, R, 6.81, .01, .29, .47, .01, 3.01, 'blue', .38);
  box(H, R, 8.91, .01, .29, .47, .01, 3.01, 'blue', .38);
  box(H, R, 6.78, .01, 2.44, .47, 2.79, .24, 'paper', .93);
  shape(H, R, [H.p(6.63, -.02, 3.15), H.p(9.37, -.02, 3.15), H.p(9.37, .94, 2.92), H.p(6.63, .94, 2.92)], 'teal', .48);
  for (let k = 0; k < 11; k++) H.line(R, [H.p(6.7 + k * .25, 0, 3.17), H.p(6.7 + k * .25, .89, 2.94)], 'blue', .75, { tone: .65 });
  shape(H, R, H.faceI(7.1, .14, 1.8, .09, 2.77), 'teal', .18);
  shape(H, R, [H.p(7.12, .19, .12), H.p(7.56, .96, .12), H.p(7.56, .96, 2.68), H.p(7.12, .19, 2.68)], 'coral', .34);
  for (let z = .31; z < 2.59; z += .34) H.line(R, [H.p(7.15, .21, z), H.p(7.54, .92, z)], 'blue', .55, { tone: .39 });
  box(H, R, 6.88, .42, 2.26, .79, .02, .13, 'sun', .26);
  courtyardTree(H, R);
  table(H, R, 4.37, 4.48, 3.4, 3.05, .97, 'paper');
  shape(H, R, H.tile(4.61, 4.73, 2.54, 2.54, 1.12), 'sun', .38);
  for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) if ((i + j) % 2) shape(H, R, H.tile(4.65 + i * .31, 4.77 + j * .31, .31, .31, 1.135), 'teal', .4, .22);
  H.outline(R, H.tile(4.6, 4.72, 2.57, 2.57, 1.14), 'blue', .9);
  for (const [i, j, ink] of [[0, 1, 'coral'], [1, 2, 'coral'], [3, 0, 'coral'], [2, 3, 'coral'], [4, 3, 'coral'], [6, 5, 'blue'], [7, 4, 'blue'], [5, 6, 'blue'], [3, 6, 'blue'], [7, 6, 'blue']]) {
    const [x, y] = H.p(4.81 + i * .31, 4.92 + j * .31, 1.16);
    oval(H, R, x, y, 4.2, 2.6, ink, .71);
    H.line(R, [[x - 2.2, y - .5], [x + 2.2, y - .5]], 'paper', .55);
  }
  stool(H, R, 5.09, 7.88, 'sun', true);
  stool(H, R, 8.13, 5.2, 'paper');
  shape(H, R, H.tile(5.16, 7.94, 1.0, .94, .7), 'coral', .37);
  for (let k = 0; k < 7; k++) H.line(R, [H.p(5.2 + k * .13, 7.99, .72), H.p(5.2 + k * .13, 8.82, .72)], 'sun', .8);
  box(H, R, 7.27, 6.24, .33, .61, 1.11, .13, 'teal', .68);
  shape(H, R, H.tile(7.32, 6.3, .22, .47, 1.26), 'paper', 1, .3);
  cup(H, R, 7.37, 5.51, 1.12);
  cup(H, R, 4.68, 7.3, 1.12);
  table(H, R, 9.82, 1.54, 1.28, 1.66, .63, 'teal');
  bottle(H, R, ...H.p(10.29, 2.0, .81), 'sun', .66);
  shape(H, R, H.tile(9.98, 2.45, .91, .61, .79), 'coral', .22);
  const [ax, ay] = H.p(9.54, 5.72, .06);
  stroke(H, R, [[ax, ay], [ax - 4, ay - 49], [ax - 9, ay - 60], [ax - 18, ay - 58]], 'blue', 2.2);
  H.line(R, [[ax - 18, ay - 58], [ax - 24, ay - 57]], 'sun', 3.4);
  const [bx, by] = H.p(.79, 8.65, .04);
  H.line(R, [[bx, by], [bx + 8, by - 81]], 'sun', 2.1);
  shape(H, R, [[bx - 10, by + 1], [bx + 12, by + 1], [bx + 5, by - 24], [bx - 3, by - 23]], 'sun', .64);
  for (let k = 0; k < 6; k++) H.line(R, [[bx - 8 + k * 3.6, by], [bx - 2 + k, by - 21]], 'blue', .55);
  for (const [i, j] of [[.94, 5.02], [1.27, 6.23], [10.85, 3.96]]) plant(H, R, ...H.p(i, j, .05), 1.35);
  const [wx, wy] = H.p(2.09, 6.48, .06);
  oval(H, R, wx, wy - 7, 13, 11, 'teal', .57);
  stroke(H, R, [[wx + 10, wy - 14], [wx + 21, wy - 22], [wx + 28, wy - 28]], 'teal', 3.5);
  oval(H, R, wx + 29, wy - 29, 5, 3, 'paper', 1);
  stroke(H, R, [[wx - 8, wy - 15], [wx - 13, wy - 29], [wx + 4, wy - 34], [wx + 11, wy - 16]], 'blue', 1.5);
  shape(H, R, H.tile(.33, 10.79, 10.4, .29, .025), 'blue', .55);
  for (let k = 0; k < 40; k++) H.line(R, [H.p(.43 + k * .25, 10.82, .04), H.p(.43 + k * .25, 11.04, .04)], 'paper', .65);
  const [dx, dy] = H.p(7.51, 1.36, .08);
  oval(H, R, dx, dy - 5, 9, 5, 'sun', .71);
  oval(H, R, dx + 7, dy - 10, 4, 4, 'sun', .71);
  shape(H, R, [[dx + 10, dy - 11], [dx + 16, dy - 8], [dx + 10, dy - 7]], 'coral', .67, .45);
  H.dot(dx + 8, dy - 11, .8, 'blue');
  shape(H, R, [[dx - 7, dy - 5], [dx - 16, dy - 10], [dx - 12, dy - 1]], 'teal', .6, .6);
  shape(H, R, H.tile(10.21, 8.1, 1.05, .71, .07), 'coral', .3);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(10.31, 8.21 + k * .13, .09), H.p(11.16, 8.21 + k * .13, .09)], 'blue', .55, { tone: .35 });
  pingShanCourtyardDetails(H, R);
  construction(H, R);
}

function pingShanCourtyardDetails(H, R) {
  table(H, R, 0.63, 9.21, 3.06, 0.83, 0.58, 'teal');
  foldedCloth(H, R, 0.84, 9.34, 1.13, 0.54, 0.73, 'coral', 'sun');
  boundBook(H, R, 2.27, 9.32, 0.89, 0.56, 0.73, 'teal');
  shallowTray(H, R, 9.53, 8.92, 1.77, 1.15, 0.05, 'sun');
  for (let n = 0; n < 5; n++) {
    const [x, y] = H.p(9.83 + (n % 3) * 0.46, 9.22 + Math.floor(n / 3) * 0.43, 0.24);
    oval(H, R, x, y, 5, 3, n % 2 ? 'blue' : 'coral', 0.65);
  }
  slattedCrate(H, R, 10.07, 5.95, 1.39, 1.2, 0.04, 0.53, 'teal');
  foldedCloth(H, R, 10.22, 6.1, 1.06, 0.87, 0.61, 'paper', 'coral');
  servicePipe(
    H,
    R,
    [
      [0.22, 7.09, 0.1],
      [0.22, 7.09, 1.8],
      [0.72, 7.09, 1.8]
    ],
    'teal',
    2.6
  );
  const [x, y] = H.p(0.77, 7.36, 0.08);
  oval(H, R, x, y - 8, 13, 9, 'paper', 1);
  oval(H, R, x, y - 15, 13, 4, 'teal', 0.3);
  handTool(H, R, 1.84, 7.77, 0.08, 'trowel', 'coral');
  for (let n = 0; n < 3; n++) {
    box(H, R, 9.47 + n * 0.6, 0.56, 0.49, 0.58, 0.02, 0.21, 'sun', 0.32);
    H.line(R, [H.p(9.51 + n * 0.6, 0.59, 0.25), H.p(9.91 + n * 0.6, 1.08, 0.25)], 'teal', 0.7);
  }
  framedPanel(H, R, 4.77, 0.24, 1.42, 1.03, 0.81, 'coral');
  satchel(H, R, 3.32, 8.49, 0.05, 'sun', 0.8);
  for (const [i, j] of [
    [2.42, 10.53],
    [8.78, 10.59],
    [9.8, 4.56]
  ])
    oval(H, R, ...H.p(i, j, 0.05), 4, 2, 'teal', 0.25);
}

function construction(H, R) {
  for (let row = 0; row < 7; row++)
    for (let n = 0; n < 14; n++) {
      const j = 0.28 + n * 0.81 + (row % 2) * 0.4,
        z = 0.12 + row * 0.3;
      if (j < 11.45) H.line(R, [H.p(0.22, j, z), H.p(0.22, Math.min(j + 0.72, 11.45), z)], 'blue', 0.55, { tone: 0.3 });
      if (j < 11.45) H.line(R, [H.p(0.22, j, z), H.p(0.22, j, z + 0.25)], 'teal', 0.45);
    }
  for (const [a, b] of [
    [0.2, 6.73],
    [9.23, 11.74]
  ])
    for (let n = a; n < b; n += 0.26) {
      H.line(R, [H.p(n, 0.15, 2.26), H.p(n, 0.52, 2.26)], 'paper', 1.1);
      H.line(R, [H.p(n + 0.09, 0.17, 2.2), H.p(n + 0.09, 0.54, 2.2)], 'blue', 0.8);
    }
  for (let j = 0.15; j < 11.5; j += 0.27) H.line(R, [H.p(0.02, j, 2.58), H.p(0.45, j, 2.58)], 'paper', 1.2);
  for (const i of [6.83, 8.98]) {
    shape(H, R, H.faceI(i, 0.5, 0.17, 0.32, 2.6), 'teal', 0.18, 0.6);
    for (const z of [0.51, 2.3]) H.dot(...H.p(i + 0.08, 0.52, z), 1.7, 'sun');
  }
  recessedFrame(H, R, 'ne', 2.46, 2.16, 0.84, 1.06, 'teal', (P) => {
    for (let n = 0; n < 6; n++)
      for (let q = 0; q < 3; q++) {
        const u = 0.23 + n * 0.31,
          z = 0.2 + q * 0.25;
        shape(H, R, [P(u, z), P(u + 0.2, z), P(u + 0.2, z + 0.17), P(u, z + 0.17)], 'paper', 1, 0.4);
      }
  });
  for (const [i, j, s] of [
    [0.9, 6.75, 0.83],
    [1.19, 7.98, 0.58],
    [9.93, 0.98, 0.54],
    [10.66, 0.98, 0.7]
  ]) {
    const [x, y] = H.p(i, j, 0.1);
    shape(
      H,
      R,
      [
        [x - 10 * s, y],
        [x + 10 * s, y],
        [x + 13 * s, y - 18 * s],
        [x - 13 * s, y - 18 * s]
      ],
      'coral',
      0.45,
      0.6
    );
    oval(H, R, x, y - 18 * s, 13 * s, 4 * s, 'blue', 0.45);
    specimen(H, R, x, y - 18 * s, s, 'teal', j < 7);
  }
  for (const i of [4.52, 7.55]) {
    H.line(R, [H.p(i, 4.67, 0.16), H.p(i, 7.23, 0.16)], 'teal', 2);
    H.line(R, [H.p(i, 4.67, 0.2), H.p(i, 7.23, 0.9)], 'sun', 1.3);
  }
  for (let n = 0; n < 5; n++) {
    const [x, y] = H.p(6.6 + n * 0.14, 4.94, 1.14);
    oval(H, R, x, y, 3, 2, 'sun', 0.7);
  }
  const [x, y] = H.p(10.53, 2.44, 0.81);
  oval(H, R, x, y, 11, 5, 'paper', 1);
  oval(H, R, x, y - 9, 8, 4, 'teal', 0.45);
  H.line(
    R,
    [
      [x - 7, y - 9],
      [x - 6, y],
      [x + 6, y],
      [x + 7, y - 9]
    ],
    'blue',
    0.7
  );
  H.line(
    R,
    [
      [x + 7, y - 7],
      [x + 14, y - 15]
    ],
    'sun',
    1.7
  );
  for (let n = 0; n < 5; n++) {
    const [px, py] = H.p(1.08 + n * 0.64, 10.51, 0.03);
    shape(
      H,
      R,
      [
        [px - 5, py],
        [px + 1, py - 3],
        [px + 5, py + 1],
        [px - 1, py + 3]
      ],
      n % 2 ? 'sun' : 'teal',
      0.35,
      0.4
    );
  }
  shape(H, R, H.tile(5.95, 10.06, 0.9, 0.65, 0.025), 'paper', 1, 0.5);
  H.line(R, [H.p(6.1, 10.17, 0.04), H.p(6.6, 10.58, 0.04)], 'coral', 1.1);
}

const room = world('hong-kong-ping-shan-courtyard', 'Ping Shan · Shade for two', { floor: 'paper', tone: .74, wall: false, head: 20 }, courtyard, (H, R, t) => {
  const u = cycle(t, 18);
  H.at(5.63, 8.31, .12, HH => actor(HH, R, 5.63, 8.31, t, 'hongKongPingShanConsider', { shirt: ['paper', 1], hairStyle: 'short', glasses: true, face: 'nw', prop(h, r, p) {
    const [x, y] = p.nearHand;
    oval(h, r, x - 1, y + 1, 4.6, 2.9, 'coral', .73);
    h.line(r, [[x - 3, y], [x + 1, y]], 'paper', .6);
  } }, .12, 1.36, 'elder'));
  H.at(8.69, 5.67, .1, HH => actor(HH, R, 8.69, 5.67, t, 'hongKongPingShanRespond', { shirt: ['teal', .58], hairStyle: 'bun', face: 'sw', prop(h, r, p) {
    const [x, y] = p.farHand;
    shape(h, r, [[x - 2, y + 3], [x + 3, y + 3], [x + 8, y - 18], [x - 1, y - 20]], 'sun', .63, .6);
    for (let k = 0; k < 3; k++) h.line(r, [[x + k, y + 1], [x + k * 2, y - 16]], 'blue', .45);
  } }, .1, 1.34, 'elder'));
  const [x, y] = H.p(2.24, 2.66, .15), swing = Math.sin(u * TAU) * 2;
  stroke(H, R, [[x + 41, y - 96], [x + 57 + swing, y - 87], [x + 61 + swing, y - 82]], 'blue', .7, .63);
  oval(H, R, x + 60 + swing, y - 85, 6, 3, 'teal', .57);
});

room.loopSeconds = 18;
export default room;
