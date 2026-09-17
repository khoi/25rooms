import { surface, timber } from '../materials.js';
import { panelFront, hangingRail, specimen } from '../joinery.js';
import { shelfUnit, shallowTray, liddedTin, foldedCloth, coiledLine, boundBook, satchel, handTool, framedPanel, servicePipe } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, ell, wallRect } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const hang = { ...rest, ar: 150, er: 0, al: 45, el: 35, head: -14 };
const check = { ...rest, ar: 52, er: 64, al: 65, el: 60, head: 18, lean: -5 };
FIGURES.clips.newYorkVestDry = { dur: 18, keys: [[0, hang], [.14, hang], [.3, check], [.43, { ...check, ar: 60, er: 38 }], [.57, check], [.76, hang], [1, hang]] };

function canoe(H, R, i, j, z, ink) {
  const P = (a, b, h = 0) => H.p(i + a, j + b, z + h);
  const edge = [];
  for (let n = 0; n <= 24; n++) {
    const f = n / 24;
    edge.push([f * 7.5, -(Math.sin(f * Math.PI) ** 0.73) * 0.61]);
  }
  for (let n = 24; n >= 0; n--) {
    const f = n / 24;
    edge.push([f * 7.5, Math.sin(f * Math.PI) ** 0.73 * 0.61]);
  }
  surface(
    H,
    R,
    edge.map(([a, b]) => P(a, b, -0.17)),
    ink,
    0.8,
    0.85
  );
  surface(
    H,
    R,
    edge.map(([a, b]) => P(a, b, 0.03)),
    ink,
    0.55,
    1
  );
  const inner = edge.map(([a, b]) => P(0.28 + a * 0.925, b * 0.72, 0.055));
  surface(H, R, inner, 'blue', 0.57, 0.6);
  H.clip(inner, () => {
    for (let n = 0; n < 15; n++) {
      const a = 0.45 + n * 0.46,
        bulge = Math.sin((a / 7.5) * Math.PI) * 0.45;
      H.line(R, [P(a, -bulge, 0.06), P(a + 0.035, 0, -0.05), P(a, bulge, 0.06)], 'sun', 1.3);
    }
    H.line(R, [P(0.6, 0, -0.01), P(6.91, 0, -0.01)], 'paper', 0.75);
  });
  for (const a of [1.65, 5.6]) {
    timber(H, R, i + a, j - 0.3, 0.42, 0.61, z + 0.07, 0.055, 'sun');
    const weave = H.tile(i + a + 0.07, j - 0.23, 0.28, 0.46, z + 0.13);
    surface(H, R, weave, 'sun', 0.28, 0.3);
    for (let n = 0; n < 5; n++) H.line(R, [P(a + 0.08 + n * 0.055, -0.23, 0.14), P(a + 0.08 + n * 0.055, 0.23, 0.14)], 'blue', 0.5);
    for (let n = 0; n < 5; n++) H.line(R, [P(a + 0.07, -0.2 + n * 0.09, 0.14), P(a + 0.35, -0.2 + n * 0.09, 0.14)], 'paper', 0.5);
  }
  timber(H, R, i + 3.57, j - 0.43, 0.16, 0.86, z + 0.09, 0.055, 'sun');
  H.outline(
    R,
    edge.map(([a, b]) => P(a, b, 0.045)),
    'paper',
    1.3,
    { tone: 0.9 }
  );
  for (const a of [0.4, 7.1]) H.outline(R, ell(...P(a, 0, 0.08), 4, 2), 'sun', 1.2);
}


function vest(H, R, x, y, ink = 'coral', twist = 0) {
  const p = (a, b) => [x + a + b * twist, y + b];
  shape(H, R, [p(-8, 1), p(-15, 8), p(-12, 31), p(-1, 34), p(0, 9)], ink, .84, .85);
  shape(H, R, [p(8, 1), p(15, 8), p(12, 31), p(1, 34), p(0, 9)], ink, .76, .85);
  stroke(H, R, [p(-8, 1), p(-7, -4), p(7, -4), p(8, 1)], 'blue', 1.4);
  for (const b of [16, 25]) {
    H.line(R, [p(-11, b), p(11, b)], 'blue', 2.1);
    shape(H, R, [p(-2, b - 2), p(3, b - 2), p(3, b + 2), p(-2, b + 2)], 'sun', .75, .5);
  }
  H.line(R, [p(-8, 7), p(-7, 12)], 'paper', 2.8);
  H.line(R, [p(8, 7), p(7, 12)], 'paper', 2.8);
}

function paddle(H, R, i, j, z, lean = 0, size = 1) {
  const [x, y] = H.p(i, j, z);
  H.line(R, [[x, y], [x + lean, y - 75 * size]], 'sun', 3);
  shape(H, R, [[x - 5, y + 2], [x - 6, y + 25], [x, y + 31], [x + 6, y + 25], [x + 5, y + 2]], 'coral', .63, .7);
  H.line(R, [[x + lean - 5, y - 76 * size], [x + lean + 5, y - 76 * size]], 'blue', 2.2);
}

function bronxBoathouseDetails(H, R) {
  shelfUnit(H, R, 4.11, 9.24, 2.63, 1.32, 0.03, [0.13, 1.05, 1.93], 'teal');
  for (let n = 0; n < 3; n++) coiledLine(H, R, 4.58 + n * 0.72, 9.88, 0.32, 10, ['sun', 'coral', 'blue'][n]);
  shallowTray(H, R, 4.28, 9.43, 1.32, 0.93, 1.2, 'paper');
  for (let n = 0; n < 3; n++) {
    const [x, y] = H.p(4.58 + n * 0.34, 9.87, 1.42);
    oval(H, R, x, y, 5, 8, n === 1 ? 'coral' : 'sun', 0.55);
    oval(H, R, x, y, 2.5, 5, 'paper', 1);
  }
  liddedTin(H, R, 6.13, 10.06, 1.23, 8, 23, 'teal');
  foldedCloth(H, R, 4.3, 9.41, 1.53, 0.95, 2.08, 'paper', 'coral');
  boundBook(H, R, 6.02, 9.5, 0.48, 0.7, 2.08, 'blue');
  framedPanel(H, R, 9.52, 0.21, 1.69, 2.0, 1.16, 'teal');
  for (let n = 0; n < 4; n++) H.line(R, [H.p(9.79 + n * 0.33, 0.34, 2.25), H.p(9.91 + n * 0.3, 0.34, 2.88)], 'coral', 0.6);
  shallowTray(H, R, 0.61, 9.83, 1.85, 0.91, 0.26, 'sun');
  handTool(H, R, 1.15, 10.2, 0.47, 'brush', 'teal');
  handTool(H, R, 1.96, 10.35, 0.47, 'spanner', 'coral');
  servicePipe(
    H,
    R,
    [
      [0.18, 8.16, 0.13],
      [0.18, 8.16, 1.7],
      [0.68, 8.16, 1.7]
    ],
    'teal',
    2.5
  );
  const [x, y] = H.p(1.44, 8.69, 0.04);
  oval(H, R, x, y - 7, 12, 9, 'paper', 1);
  oval(H, R, x, y - 14, 12, 4, 'teal', 0.25);
  stroke(
    H,
    R,
    [
      [x - 10, y - 13],
      [x - 8, y - 28],
      [x + 8, y - 28],
      [x + 10, y - 13]
    ],
    'blue',
    1
  );
  satchel(H, R, 8.14, 10.61, 0.03, 'coral', 0.9);
}

function construction(H, R) {
  for (const i of [0.42, 8.93]) {
    H.line(R, [H.p(i, 0.72, 2.96), H.p(i + (i < 1 ? 0.66 : -0.66), 0.72, 3.64)], 'sun', 2);
    for (const z of [0.17, 2.93, 3.52]) H.dot(...H.p(i + 0.09, 0.77, z), 1.5, 'paper');
  }
  for (let n = 0; n < 8; n++) {
    const j = 1.1 + n * 0.83;
    H.line(R, [H.p(0.18, j, 0.25), H.p(0.18, j, 3.43)], 'blue', 0.6, { tone: 0.35 });
  }
  hangingRail(H, R, 'nw', 1.71, 4.33, 2.8, 6, (P, u, n) => {
    const [x, y] = P(u, -0.15);
    if (n < 3) {
      oval(H, R, x, y + 11, 9, 11, 'coral', 0.65);
      oval(H, R, x, y + 12, 5, 6, 'paper', 1);
      H.line(
        R,
        [
          [x - 7, y + 17],
          [x, y + 29],
          [x + 7, y + 17]
        ],
        'blue',
        1
      );
    } else {
      H.line(
        R,
        [
          [x, y],
          [x - 1, y + 29]
        ],
        'sun',
        2.1
      );
      shape(
        H,
        R,
        [
          [x - 5, y + 28],
          [x + 4, y + 28],
          [x + 6, y + 41],
          [x - 5, y + 41]
        ],
        'teal',
        0.5,
        0.6
      );
    }
  });
  for (const i of [1.4, 7.37])
    for (const z of [0.65, 1.78, 2.7]) {
      for (const j of [0.85, 2.25]) {
        box(H, R, i - 0.05, j, 0.29, 0.32, z + 0.08, 0.1, 'paper', 1);
        H.dot(...H.p(i + 0.08, j + 0.15, z + 0.2), 1.2, 'sun');
      }
    }
  const [x, y] = H.p(10.73, 2.72, 0.9);
  oval(H, R, x, y, 9, 4, 'paper', 1);
  H.line(
    R,
    [
      [x - 8, y],
      [x - 7, y - 18],
      [x + 7, y - 18],
      [x + 8, y]
    ],
    'teal',
    1.4
  );
  oval(H, R, x, y - 18, 7, 3, 'blue', 0.6);
  H.line(
    R,
    [
      [x - 5, y - 12],
      [x + 5, y - 12]
    ],
    'coral',
    1.2
  );
  for (let n = 0; n < 5; n++) {
    const j = 9.4 + n * 0.23;
    H.line(R, [H.p(4.32, j, 1.18), H.p(6.5, j, 1.18)], 'paper', 0.7);
  }
  for (let n = 0; n < 4; n++) {
    const [px, py] = H.p(4.57 + n * 0.54, 9.85, 2.1);
    oval(H, R, px, py, 5, 4, 'sun', 0.6);
    H.line(
      R,
      [
        [px - 4, py],
        [px + 4, py]
      ],
      'blue',
      0.6
    );
  }
  panelFront(H, R, 9.66, 9.82, 1.77, 0.14, 0.51, 2, 'paper');
  for (const i of [9.76, 11.26]) for (const j of [8.81, 9.63]) H.dot(...H.p(i, j, 0.82), 1.3, 'sun');
  for (let n = 0; n < 6; n++) {
    const [px, py] = H.p(1.03 + n * 0.29, 10.17, 0.26);
    shape(
      H,
      R,
      [
        [px - 5, py],
        [px + 5, py],
        [px + 4, py - 11],
        [px - 4, py - 11]
      ],
      'teal',
      0.6,
      0.5
    );
    H.line(
      R,
      [
        [px - 4, py - 7],
        [px + 4, py - 7]
      ],
      'paper',
      0.9
    );
  }
  for (const j of [3.54, 7.53]) {
    const [px, py] = H.p(11.41, j, 0.04);
    specimen(H, R, px, py, 0.65, 'teal', false);
  }
  for (let n = 0; n < 5; n++) {
    const [px, py] = H.p(7.9 + n * 0.26, 7.22, 0.03);
    oval(H, R, px, py, 5 + (n % 2) * 3, 2, 'teal', 0.16);
  }
}

const room = world('new-york-bronx-boathouse', 'Bronx River · Back from the River', {
  floor: 'paper', tone: .85, wall: false, pattern: 'boards', head: 20,
}, (H, R) => {
  shape(H, R, wallRect(H, 'ne', 0, 12, 0, 3.7), 'teal', .15);
  for (let i = .2; i < 12; i += .65) H.line(R, [H.p(i, .02, .05), H.p(i, .02, 3.7)], 'blue', .65, { tone: .38 });
  shape(H, R, H.faceJ(0, 0, 7.8, 0, 3.7), 'teal', .38);
  shape(H, R, H.faceJ(.02, 1, 5.9, 1.08, 3.18), 'paper', 1);
  shape(H, R, H.faceJ(.03, 1.08, 5.72, 1.17, 2.95), 'teal', .45);
  H.clip(H.faceJ(.035, 1.08, 5.72, 1.17, 2.95), () => {
    for (let j = 1.2; j < 6.7; j += .8) {
      const [x, y] = H.p(.05, j, 1.4);
      stroke(H, R, [[x - 4, y], [x, y - 36], [x + 9, y - 60]], 'blue', 2.1, .6);
      oval(H, R, x + 7, y - 52, 20, 27, 'teal', .65);
    }
    shape(H, R, H.faceJ(.04, 1.08, 5.72, 1.17, 1.48), 'blue', .47);
  });
  for (const j of [1.05, 6.91]) box(H, R, .05, j, .16, .14, 0, 3.7, 'blue', .65);
  for (const i of [.35, 8.9]) box(H, R, i, .5, .2, .25, 0, 3.65, 'blue', .58);
  box(H, R, .2, .48, 9.0, .3, 3.62, .18, 'sun', .62);
  for (const i of [1.55, 6.5]) {
    box(H, R, i, 1.0, .18, 1.25, 0, 2.75, 'teal', .72);
    for (const z of [.65, 1.78, 2.7]) box(H, R, i, .6, .2, 2.15, z, .1, 'blue', .68);
  }
  canoe(H, R, .65, 1.5, .79, 'coral');
  canoe(H, R, .65, 1.5, 1.91, 'sun');
  canoe(H, R, .65, 1.5, 2.84, 'teal');
  for (let n = 0; n < 5; n++) paddle(H, R, 9.8 + n * .32, .8 + n * .07, .25, n % 2 ? 5 : -3, n === 2 ? .67 : 1);
  box(H, R, 9.6, .55, 2.1, .65, .25, .08, 'teal', .7);
  for (const i of [6.05, 10.9]) {
    box(H, R, i, 4.78, .14, .18, 0, 1.85, 'blue', .8);
    box(H, R, i - .28, 4.53, .72, .68, .03, .08, 'teal', .6);
  }
  H.line(R, [H.p(6.05, 4.87, 1.8), H.p(11.07, 4.87, 1.8)], 'blue', 3.1);
  const [hookX, hookY] = H.p(7.41, 4.87, 1.8);
  stroke(H, R, [[hookX, hookY], [hookX, hookY + 17], [hookX - 4, hookY + 19], [hookX - 5, hookY + 15]], 'blue', 1.3);
  for (const [i, ink] of [[6.6, 'sun'], [9.1, 'coral'], [10.45, 'teal']]) {
    const [x, y] = H.p(i, 4.85, 1.68);
    stroke(H, R, [[x, y - 3], [x - 4, y - 8], [x, y - 12], [x + 4, y - 8]], 'blue', 1.1);
    vest(H, R, x, y, ink);
  }
  table(H, R, .9, 6.6, 3.0, 1.1, .59, 'coral');
  shape(H, R, H.tile(1.04, 6.69, 1.4, .88, .73), 'paper', 1);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(1.14 + n * .24, 6.75, .75), H.p(1.14 + n * .24, 7.52, .75)], 'teal', 1.1);
  box(H, R, 2.74, 6.76, .72, .57, .73, .22, 'sun', .7);
  for (let n = 0; n < 3; n++) oval(H, R, ...H.p(3.08, 7.06, .97 + n * .035), 11 - n * 2, 5 - n, 'blue', .45);
  for (const [i, j] of [[1.12, 8.6], [1.65, 8.75]]) {
    box(H, R, i, j, .29, .55, 0, .13, 'blue', .84);
    box(H, R, i, j, .27, .24, .1, .48, 'teal', .7);
  }
  box(H, R, .45, 9.65, 2.2, 1.25, 0, .2, 'teal', .45);
  for (let n = 0; n < 8; n++) H.line(R, [H.p(.55 + n * .25, 9.72, .22), H.p(.55 + n * .25, 10.8, .22)], 'blue', 1.3);
  box(H, R, 9.6, 8.65, 1.9, 1.15, 0, .66, 'paper', 1);
  box(H, R, 9.55, 8.6, 2, 1.25, .66, .14, 'coral', .8);
  H.line(R, [H.p(10.25, 9.84, .36), H.p(10.84, 9.84, .36)], 'blue', 3.2);
  const [rx, ry] = H.p(8.96, 10.55, .09);
  for (let r = 6; r < 23; r += 4) H.outline(R, ell(rx, ry, r, r * .39), 'sun', 2.3, { tone: .78 });
  stroke(H, R, [[rx + 17, ry + 2], [rx + 33, ry + 13], [rx + 48, ry + 9]], 'sun', 2.4);
  box(H, R, 10.4, 2.4, .62, .64, 0, .8, 'teal', .7);
  const [bx, by] = H.p(10.72, 2.74, .82);
  oval(H, R, bx, by, 12, 6, 'paper', 1);
  stroke(H, R, [[bx - 10, by - 3], [bx - 6, by - 19], [bx + 8, by - 18], [bx + 10, by - 2]], 'blue', 1.5);
  for (const [i, j] of [[5.7, 5.8], [7.5, 6.5], [8.2, 7.1]]) H.tint(ell(...H.p(i, j, .025), 17, 5), 'teal', .16);
  const [lx, ly] = H.p(5.1, .35, 2.9);
  H.line(R, [[lx, ly - 22], [lx, ly]], 'blue', 1.2);
  shape(H, R, [[lx - 14, ly + 9], [lx + 14, ly + 9], [lx + 8, ly - 2], [lx - 8, ly - 2]], 'sun', .8);
  bronxBoathouseDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 18);
  actor(H, R, 7.45, 5.28, t, 'newYorkVestDry', {
    shirt: ['teal', .55], pants: ['blue', .66], hairStyle: 'pony', face: 'se',
    prop(HH, RR, points) {
      const [x, y] = points.nearHand;
      vest(HH, RR, x, y + 4, 'coral', u > .3 && u < .6 ? Math.sin(u * Math.PI * 12) * .09 : 0);
      if (u > .31 && u < .49) {
        const drop = (u - .31) / .18;
        HH.opacity(Math.sin(drop * Math.PI), () => {
          HH.dot(x - 5, y + 38 + drop * 36, 1.8, 'teal', .6);
          HH.dot(x + 7, y + 41 + drop * 29, 1.5, 'teal', .6);
        });
      }
    },
  }, 0, 1.25);
  actor(H, R, 3.54, 7.87, 0, 'sit', { shirt: ['sun', .62], hairStyle: 'cap', face: 'se', prop(HH, RR, points) {
    const [x, y] = points.nearHand;
    shape(HH, RR, [[x - 7, y - 3], [x + 7, y - 3], [x + 6, y + 4], [x - 6, y + 4]], 'paper', 1, .6);
  } }, .05, 1.19);
  for (let n = 0; n < 3; n++) {
    const p = cycle(t + n * 5, 18);
    H.opacity(Math.sin(p * Math.PI) * .3, () => H.outline(R, ell(...H.p(9.1 + n * .6, 5.2, .035), 3 + p * 9, 1 + p * 3), 'teal', .7));
  }
});
room.loopSeconds = 18;
export default room;
