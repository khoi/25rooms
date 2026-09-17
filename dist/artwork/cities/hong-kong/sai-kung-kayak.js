import { cornice, recessedFrame, hangingRail } from '../joinery.js';
import { shelfUnit, shallowTray, liddedTin, foldedCloth, coiledLine, boundBook, satchel, handTool, servicePipe, slattedCrate } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, wallRect, wallPt, ell, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const rinse = { ...rest, al: 22, ar: 74, el: 34, er: 12, lean: -7, head: 7 };
FIGURES.clips.hongKongKayakRinse = { dur: 16, keys: [[0, rinse], [.12, rinse], [.31, { ...rinse, ar: 97, er: 8, lean: -11, head: 10 }], [.49, { ...rinse, ar: 58, er: 9, lean: -5, head: 14 }], [.66, { ...rinse, ar: 95, er: 8, lean: -9 }], [.79, rinse], [1, rinse]] };

function kayak(H, R, i, j, length, width, z, ink) {
  const hull = [], under = [];
  for (let q = 0; q <= 22; q++) {
    const f = q / 22, bulge = Math.sin(Math.PI * f) ** .72 * width;
    hull.push(H.p(i + f * length, j - bulge, z + Math.sin(Math.PI * f) * .13));
    under.push(H.p(i + f * length, j - bulge * .7, z - .19));
  }
  for (let q = 22; q >= 0; q--) {
    const f = q / 22, bulge = Math.sin(Math.PI * f) ** .72 * width;
    hull.push(H.p(i + f * length, j + bulge, z + Math.sin(Math.PI * f) * .13));
    under.push(H.p(i + f * length, j + bulge * .7, z - .19));
  }
  shape(H, R, under, 'blue', .64, .8);
  shape(H, R, hull, ink, .68, .9);
  H.line(R, [H.p(i + .2, j, z + .04), H.p(i + length - .2, j, z + .04)], 'paper', 1.1, { tone: .7 });
  const cockpit = [];
  for (let q = 0; q < 30; q++) {
    const a = q * TAU / 30;
    cockpit.push(H.p(i + length * .51 + Math.cos(a) * .91, j + Math.sin(a) * width * .65, z + .18));
  }
  shape(H, R, cockpit, 'blue', .73, .85);
  H.outline(R, cockpit, 'paper', 2.1, { tone: .85, amp: .1 });
  box(H, R, i + length * .52, j - width * .43, .38, width * .86, z + .18, .13, 'teal', .65);
  for (const pos of [.2, .8]) {
    const hatch = [];
    for (let q = 0; q < 20; q++) {
      const a = q * TAU / 20;
      hatch.push(H.p(i + length * pos + Math.cos(a) * .33, j + Math.sin(a) * .32, z + .16));
    }
    shape(H, R, hatch, 'teal', .64, .65);
  }
  for (const pos of [.14, .7]) for (let q = 0; q < 3; q++) {
    const a = i + length * pos + q * .3;
    H.line(R, [H.p(a, j - width * .62, z + .16), H.p(a + .38, j + width * .62, z + .16)], 'blue', .9);
    H.line(R, [H.p(a, j + width * .62, z + .16), H.p(a + .38, j - width * .62, z + .16)], 'blue', .9);
  }
  for (const a of [i + .14, i + length - .2]) stroke(H, R, [H.p(a, j - .14, z), H.p(a, j, z + .16), H.p(a, j + .14, z)], 'blue', 1.3);
}

function vest(H, R, i, z, ink) {
  const [x, y] = H.p(i, .35, z);
  H.line(R, [[x, y - 8], [x, y], [x - 13, y + 7], [x + 13, y + 7], [x, y]], 'blue', .8);
  shape(H, R, [[x - 10, y + 5], [x - 4, y + 4], [x - 2, y + 15], [x + 2, y + 15], [x + 4, y + 4], [x + 10, y + 5], [x + 15, y + 32], [x - 15, y + 32]], ink, .73, .8);
  H.line(R, [[x, y + 16], [x, y + 31]], 'blue', 1.2);
  for (const dy of [21, 27]) {
    H.line(R, [[x - 12, y + dy], [x + 12, y + dy]], 'blue', 2.2);
    shape(H, R, [[x - 3, y + dy - 2], [x + 3, y + dy - 2], [x + 3, y + dy + 2], [x - 3, y + dy + 2]], 'paper', 1, .5);
  }
}

function cradle(H, R, i, j, width = 1.85, height = .72) {
  for (const sign of [-1, 1]) H.line(R, [H.p(i, j + sign * width * .5, .03), H.p(i, j - sign * width * .34, height)], 'blue', 2.5);
  H.line(R, [H.p(i, j - width * .41, height), H.p(i, j + width * .41, height)], 'teal', 4);
  H.line(R, [H.p(i, j - width * .3, .24), H.p(i, j + width * .3, .24)], 'sun', 1.8);
}

function saiKungKayakDetails(H, R) {
  shelfUnit(H, R, 0.22, 7.95, 2.03, 1.18, 0.05, [0.15, 1.05, 1.97], 'teal');
  for (let n = 0; n < 3; n++) coiledLine(H, R, 0.62 + n * 0.59, 8.55, 0.33, 8, ['sun', 'coral', 'blue'][n]);
  foldedCloth(H, R, 0.4, 8.09, 1.62, 0.89, 1.2, 'paper', 'teal');
  for (let n = 0; n < 2; n++) satchel(H, R, 0.79 + n * 0.83, 8.59, 2.13, ['sun', 'coral'][n], 0.72);
  shallowTray(H, R, 7.21, 9.87, 1.73, 1.02, 0.04, 'teal');
  handTool(H, R, 7.72, 10.23, 0.25, 'spanner', 'coral');
  liddedTin(H, R, 8.55, 10.37, 0.25, 6, 16, 'paper', true);
  slattedCrate(H, R, 9.3, 6.85, 1.95, 1.25, 0.04, 0.68, 'sun');
  for (let n = 0; n < 3; n++) {
    const [x, y] = H.p(9.65 + n * 0.57, 7.39, 0.76);
    oval(H, R, x, y - 5, 9, 10, 'teal', 0.55);
    oval(H, R, x, y - 13, 5, 3, 'blue', 0.6);
    H.line(
      R,
      [
        [x - 6, y - 8],
        [x + 6, y - 8]
      ],
      n === 1 ? 'coral' : 'paper',
      1
    );
  }
  servicePipe(
    H,
    R,
    [
      [0.11, 6.44, 0.06],
      [0.11, 6.44, 2.37],
      [0.6, 6.44, 2.37]
    ],
    'teal',
    2.6
  );
  oval(H, R, ...H.p(0.14, 6.44, 1.89), 5, 5, 'coral', 0.7);
  shallowTray(H, R, 2.86, 10.38, 1.68, 0.92, 0.02, 'blue');
  for (const i of [3.22, 3.84]) oval(H, R, ...H.p(i, 10.79, 0.2), 10, 4, 'teal', 0.55);
  boundBook(H, R, 10.7, 9.79, 0.58, 0.69, 1.05, 'blue');
}

function construction(H, R) {
  cornice(H, R, 'nw', 0.2, 11.8, 3.45, 'teal');
  for (const i of [1.16, 3.44, 5.74, 7.26]) {
    box(H, R, i, 0.05, 0.12, 0.32, 0.05, 3.1, 'blue', 0.54);
    for (const z of [0.72, 1.81, 2.85]) {
      H.dot(...H.p(i + 0.06, 0.39, z), 1.4, 'sun');
      H.line(R, [H.p(i + 0.06, 0.36, z), H.p(i + 0.36, 0.74, z + 0.2)], 'teal', 1.5);
    }
  }
  hangingRail(H, R, 'nw', 1.3, 5.8, 2.65, 6, (P, u, n) => {
    const [x, y] = P(u, -0.16);
    if (n < 3) {
      oval(H, R, x, y + 14, 10, 12, n % 2 ? 'sun' : 'coral', 0.7);
      oval(H, R, x, y + 16, 6, 7, 'paper', 1);
      H.line(
        R,
        [
          [x - 8, y + 20],
          [x, y + 33],
          [x + 8, y + 20]
        ],
        'blue',
        1.1
      );
    } else {
      shape(
        H,
        R,
        [
          [x - 7, y + 3],
          [x + 7, y],
          [x + 8, y + 33],
          [x - 6, y + 35]
        ],
        'paper',
        1,
        0.6
      );
      for (let q = 0; q < 4; q++)
        H.line(
          R,
          [
            [x - 4 + q * 3, y + 7],
            [x - 3 + q * 3, y + 28]
          ],
          'teal',
          0.5
        );
    }
  });
  recessedFrame(H, R, 'ne', 8.12, 3.55, 0.9, 2.48, 'teal', (P) => {
    shape(H, R, [P(0.12, 0.13), P(3.4, 0.13), P(3.4, 2.32), P(0.12, 2.32)], 'paper', 1, 0.5);
    shape(H, R, [P(0.12, 0.15), P(3.4, 0.15), P(3.4, 0.72), P(2.9, 1.1), P(2.3, 0.87), P(1.72, 1.25), P(0.85, 0.7), P(0.12, 0.91)], 'teal', 0.3, 0.6);
    for (let n = 0; n < 5; n++) H.line(R, [P(0.35 + n * 0.61, 0.35), P(0.62 + n * 0.61, 0.35)], 'paper', 1);
    H.line(R, [P(1.8, 0.14), P(1.8, 2.3)], 'blue', 2.8);
  });
  for (const [i, j] of [
    [3.5, 4.36],
    [7.5, 4.36],
    [3.5, 6.48],
    [7.5, 6.48]
  ]) {
    H.line(R, [H.p(i - 0.25, j, 0.13), H.p(i + 0.25, j, 0.13)], 'blue', 3);
    H.dot(...H.p(i, j, 0.23), 1.8, 'sun');
  }
  const [x, y] = H.p(10.91, 2.88, 0.93);
  oval(H, R, x, y - 14, 11, 11, 'paper', 1);
  oval(H, R, x, y - 14, 8, 8, 'teal', 0.35);
  H.line(
    R,
    [
      [x, y - 14],
      [x + 5, y - 20]
    ],
    'coral',
    1.4
  );
  for (let n = 0; n < 6; n++) {
    const a = (n * TAU) / 6;
    H.dot(x + Math.cos(a) * 6, y - 14 + Math.sin(a) * 6, 0.7, 'blue');
  }
  H.line(
    R,
    [
      [x - 10, y + 2],
      [x + 9, y + 2]
    ],
    'blue',
    1.6
  );
  stroke(H, R, [[x + 9, y - 5], H.p(11.44, 3.65, 0.2), H.p(11.13, 4.02, 0.06)], 'teal', 2);
  for (let n = 0; n < 6; n++) {
    const [px, py] = H.p(3.95 + n * 0.48, 10.23, 0.035);
    shape(
      H,
      R,
      [
        [px - 5, py],
        [px + 8, py - 3],
        [px + 9, py + 2],
        [px - 2, py + 4]
      ],
      'teal',
      0.17,
      0.4
    );
  }
  box(H, R, 8.74, 8.99, 0.54, 0.44, 0.06, 0.88, 'paper', 1);
  shape(H, R, H.faceI(8.8, 9.445, 0.42, 0.32, 0.75), 'coral', 0.45, 0.6);
  H.line(R, [H.p(8.92, 9.19, 0.98), H.p(9.22, 9.19, 0.98)], 'blue', 2);
}

const room = world('hong-kong-sai-kung-kayak', 'Sai Kung · Salt rinsed away', { floor: 'paper', tone: .58, wall: 'paper', wallTone: .83, height: 3.65, head: 20 }, (H, R) => {
  shape(H, R, wallRect(H, 'nw', .13, 11.84, .08, .86, .02), 'teal', .43);
  for (const j of [.4, 1.2, 2.0, 2.8, 3.6, 4.4, 5.2, 6.0, 6.8, 7.6, 8.4, 9.2, 10, 10.8, 11.6]) H.line(R, [wallPt(H, 'nw', j, .12, .04), wallPt(H, 'nw', j, .84, .04)], 'paper', .8);
  shape(H, R, wallRect(H, 'ne', 8.12, 11.67, .9, 3.38, .035), 'teal', .18);
  shape(H, R, [H.p(8.14, .06, 1.6), H.p(8.78, .06, 2.04), H.p(9.32, .06, 1.93), H.p(9.94, .06, 2.45), H.p(10.72, .06, 2.03), H.p(11.65, .06, 2.2), H.p(11.65, .06, 1.26), H.p(8.14, .06, 1.26)], 'teal', .44, .7);
  shape(H, R, wallRect(H, 'ne', 8.16, 11.63, .92, 1.48, .08), 'blue', .18);
  for (let i = 8.4; i < 11.6; i += .43) H.line(R, [H.p(i, .1, 1.14), H.p(i + .2, .1, 1.14)], 'paper', .9);
  for (const i of [8.11, 9.88, 11.66]) H.line(R, [H.p(i, .12, .86), H.p(i, .12, 3.42)], 'paper', 3);
  box(H, R, .24, .18, 7.48, .25, 3.05, .12, 'teal', .62);
  for (let q = 0; q < 5; q++) vest(H, R, .9 + q * 1.37, 2.94, q % 2 ? 'sun' : 'coral');
  for (const i of [1.18, 6.65]) {
    box(H, R, i, 1.12, .13, .16, .03, 2.23, 'blue', .6);
    for (const z of [1.2, 2.17]) {
      H.line(R, [H.p(i, .83, z), H.p(i, 2.33, z)], 'blue', 2.5);
      H.line(R, [H.p(i, 1.12, z - .51), H.p(i, 2.13, z)], 'teal', 1.8);
    }
  }
  kayak(H, R, .51, 1.77, 6.95, .55, 2.26, 'teal');
  kayak(H, R, .51, 1.77, 6.95, .55, 1.28, 'sun');
  for (let q = 0; q < 4; q++) {
    const [x, y] = H.p(.28, 5.08 + q * .82, .39);
    H.line(R, [[x, y], [x + 11, y - 98]], 'blue', 2.4);
    H.line(R, [[x + 1, y - 14], [x + 9, y - 81]], 'sun', .9);
    shape(H, R, [[x + 7, y - 79], [x + 4, y - 103], [x + 12, y - 112], [x + 19, y - 105], [x + 14, y - 78]], q % 2 ? 'coral' : 'teal', .71, .7);
    shape(H, R, [[x - 4, y + 5], [x - 5, y - 11], [x + 4, y - 19], [x + 9, y - 10], [x + 5, y + 7]], q % 2 ? 'coral' : 'teal', .71, .7);
  }
  shape(H, R, H.tile(2.51, 4.33, 7.64, 3.72, .015), 'teal', .11, .5);
  for (const i of [3.2, 8.92]) cradle(H, R, i, 5.84, 1.82, .73);
  kayak(H, R, 2.14, 5.84, 7.93, .79, .89, 'coral');
  shape(H, R, H.tile(2.72, 8.62, 7.17, .45, .025), 'blue', .7, .7);
  for (let q = 0; q < 30; q++) H.line(R, [H.p(2.8 + q * .235, 8.66, .033), H.p(2.8 + q * .235, 9.01, .033)], 'paper', .85);
  for (let q = 0; q < 7; q++) {
    const i = 3.1 + q * .92, j = 7.3 + q % 2 * .59;
    H.tint(ell(...H.p(i, j, .026), 13 + q % 3 * 5, 3.1), 'teal', .2);
    H.line(R, [H.p(i, j + .09, .03), H.p(i + .38, j + .19, .03)], 'paper', .9, { tone: .65 });
  }
  const [hx, hy] = H.p(.27, 9.78, 1.68);
  oval(H, R, hx, hy, 22, 23, 'teal', .55);
  for (const rad of [8, 12, 16, 20]) H.outline(R, ell(hx, hy, rad, rad * 1.03), 'blue', 1.5, { tone: .72, amp: .1 });
  H.line(R, [[hx, hy - 28], [hx, hy - 32], [hx + 10, hy - 32]], 'blue', 2.2);
  oval(H, R, hx + 11, hy - 32, 5, 5, 'sun', .75);
  for (const a of [0, Math.PI / 2]) H.line(R, [[hx + 11 - Math.cos(a) * 4, hy - 32 - Math.sin(a) * 4], [hx + 11 + Math.cos(a) * 4, hy - 32 + Math.sin(a) * 4]], 'blue', .85);
  box(H, R, 10.38, 2.25, 1.06, 1.19, .02, .82, 'teal', .65);
  for (const i of [10.5, 10.86]) for (const j of [2.4, 2.9]) {
    const [x, y] = H.p(i, j, .87);
    oval(H, R, x, y - 13, 7, 15, i > 10.6 ? 'sun' : 'paper', .82);
    H.line(R, [[x - 5, y - 27], [x + 5, y - 27]], 'blue', 2.3);
    H.line(R, [[x - 4, y - 12], [x + 4, y - 12]], 'teal', 1.4);
  }
  table(H, R, 9.72, 9.65, 1.74, 1.1, .58, 'sun');
  for (let q = 0; q < 3; q++) box(H, R, 9.93, 9.81, .67, .62, .72 + q * .09, .07, q % 2 ? 'teal' : 'paper', .88);
  const [sx, sy] = H.p(10.88, 10.22, .73);
  shape(H, R, [[sx - 8, sy], [sx + 8, sy], [sx + 10, sy - 14], [sx - 10, sy - 14]], 'coral', .66, .6);
  oval(H, R, sx, sy - 14, 10, 3, 'paper', 1);
  stroke(H, R, [[sx - 9, sy - 13], [sx - 9, sy - 25], [sx + 9, sy - 25], [sx + 9, sy - 13]], 'blue', .9);
  for (const i of [7.85, 8.28]) {
    const [x, y] = H.p(i, 10.74, .02);
    oval(H, R, x, y - 1, 7, 3, 'blue', .7);
    H.line(R, [[x - 2, y - 3], [x + 4, y - 3]], 'teal', 2.2);
  }
  const [bx, by] = H.p(1.08, 10.86, .03);
  shape(H, R, [[bx - 10, by], [bx + 10, by], [bx + 12, by - 20], [bx - 12, by - 20]], 'sun', .64);
  oval(H, R, bx, by - 20, 12, 4, 'teal', .54);
  H.line(R, [[bx - 7, by - 22], [bx - 3, by - 32], [bx + 11, by - 30]], 'blue', 1.2);
  const [fx, fy] = H.p(10.55, 7.55, .06);
  shape(H, R, [[fx - 4, fy + 8], [fx + 5, fy + 8], [fx + 5, fy - 8], [fx + 16, fy - 20], [fx + 17, fy - 27], [fx + 8, fy - 25], [fx - 5, fy - 11]], 'teal', .6, .65);
  saiKungKayakDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 16), spraying = u > .15 && u < .73;
  H.at(5.93, 8.03, 0, HH => actor(HH, R, 5.93, 8.03, t, 'hongKongKayakRinse', { shirt: ['paper', 1], pants: ['teal', .72], hairStyle: 'cap', face: 'nw', prop(h, r, p) {
    const [x, y] = p.farHand;
    const [sx, sy] = h.p(.27, 9.78, 1.68);
    stroke(h, r, [[sx + 14, sy + 15], h.p(1.6, 10.1, .05), h.p(4.3, 9.46, .05), [x + 9, y + 18], [x + 1, y + 3]], 'teal', 2.7);
    h.line(r, [[x + 3, y + 5], [x - 6, y - 8], [x - 11, y - 10]], 'blue', 3.4);
    h.line(r, [[x - 6, y - 8], [x - 11, y - 10]], 'sun', 2.1);
    if (spraying) {
      const phase = (u - .15) / .58, target = h.p(4.1 + (1 - Math.cos(phase * TAU)) * 1.1, 5.77, 1.1);
      for (let q = 0; q < 5; q++) {
        const px = target[0] + (q - 2) * 3.3, py = target[1] + q % 2 * 2;
        h.line(r, [[x - 12, y - 11], [px, py]], 'paper', .8, { tone: .66, amp: .15 });
        h.dot(px, py + 2, 1.3, 'paper', .86, { knock: true });
      }
    }
  } }, 0, 1.33));
  H.at(10.7, 4.65, 0, HH => actor(HH, R, 10.7, 4.65, 0, 'hold', { shirt: ['sun', .66], hairStyle: 'pony', face: 'sw', prop(h, r, p) {
    const [x, y] = p.nearHand;
    shape(h, r, [[x - 10, y - 7], [x + 9, y - 6], [x + 12, y + 10], [x - 10, y + 12]], 'teal', .53, .6);
    for (let q = 0; q < 3; q++) h.line(r, [[x - 7, y - 3 + q * 4], [x + 7, y - 2 + q * 4]], 'paper', .8);
  } }, 0, 1.22));
});
room.loopSeconds = 16;
export default room;
