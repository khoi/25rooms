import { wallCourse, cornice, recessedFrame, wallRack, taskLight, caster } from '../joinery.js';
import { shelfUnit, shallowTray, boundBook, satchel, framedPanel } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const reading = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, lean: -8, head: 15, al: 59, el: 40, ar: 72, er: 15 };
FIGURES.clips.newYorkMapTrace = { dur: 12, keys: [[0, reading], [.17, reading], [.38, { ...reading, ar: 92, er: -2, head: 8 }], [.58, { ...reading, ar: 86, er: 15, head: 8 }], [.71, { ...reading, ar: 47, er: 115, head: -9 }], [.86, { ...reading, ar: 47, er: 115, head: -9 }], [1, reading]] };
FIGURES.clips.newYorkMapLibrarian = { dur: 12, keys: [[0, { ...rest, al: 52, el: 75, ar: 52, er: 75, head: 10 }], [.35, { ...rest, al: 52, el: 75, ar: 69, er: 30, head: 17 }], [.6, { ...rest, al: 52, el: 75, ar: 69, er: 30, head: 17 }], [.8, { ...rest, al: 52, el: 75, ar: 52, er: 75, head: -4 }], [1, { ...rest, al: 52, el: 75, ar: 52, er: 75, head: 10 }]] };

function cabinet(H, R, i, j, w, d, count = 7) {
  box(H, R, i, j, w, d, .05, 1.42, 'teal', .6);
  for (let q = 0; q < count; q++) {
    const z = .15 + q * 1.15 / count;
    shape(H, R, H.faceI(i + .09, j + d + .02, w - .18, z, z + 1.08 / count), 'paper', .88, .55);
    for (const x of [i + w * .28, i + w * .72]) {
      H.line(R, [H.p(x - .16, j + d + .05, z + .08), H.p(x + .16, j + d + .05, z + .08)], 'blue', 1.4);
      H.dot(...H.p(x - .16, j + d + .05, z + .1), .9, 'sun');
      H.dot(...H.p(x + .16, j + d + .05, z + .1), .9, 'sun');
    }
    shape(H, R, H.faceI(i + w / 2 - .12, j + d + .06, .24, z + .025, z + .1), 'sun', .4, .4);
  }
  box(H, R, i - .04, j - .04, w + .08, d + .08, 1.46, .1, 'sun', .52);
}

function map(H, R) {
  const frame = H.tile(3.28, 4.03, 5.48, 3.69, 1.08);
  shape(H, R, frame, 'paper', 1);
  const water = [[3.48, 4.21], [4.34, 4.21], [5.05, 4.68], [5.25, 5.18], [6.62, 6.3], [7.85, 7.5], [6.98, 7.5], [5.88, 6.41], [4.64, 5.66], [4.38, 5.13]].map(([i, j]) => H.p(i, j, 1.1));
  H.clip(frame, () => {
    shape(H, R, water, 'teal', .32, .65);
    for (let i = 3.5; i < 8.6; i += .35) for (let j = 4.23; j < 7.48; j += .28) {
      if (i > 4.1 && i < 5.3 && j < 5.5 || i > 5.1 && i < 7.35 && j > 5.5) continue;
      shape(H, R, H.tile(i, j, .27, .2, 1.11), (Math.round(i * 10) + Math.round(j * 10)) % 7 === 0 ? 'teal' : 'sun', .18, .37);
    }
    for (const [i, j] of [[4.7, 5.28], [6.24, 6.15]]) {
      H.line(R, [H.p(i - .42, j + .25, 1.12), H.p(i + .58, j - .3, 1.12)], 'blue', 2);
      H.line(R, [H.p(i - .42, j + .25, 1.12), H.p(i + .58, j - .3, 1.12)], 'paper', .9);
    }
    shape(H, R, H.tile(7.51, 4.27, .82, .63, 1.13), 'teal', .36, .45);
    for (let n = 0; n < 3; n++) H.line(R, [H.p(3.65, 7.0 + n * .13, 1.12), H.p(4.83 - n * .16, 7.0 + n * .13, 1.12)], 'blue', .5);
  });
  for (const [i, j] of [[3.49, 4.3], [8.4, 4.25], [3.53, 7.45], [8.45, 7.45]]) {
    oval(H, R, ...H.p(i, j, 1.15), 6, 3, 'blue', .58);
    H.line(R, [H.p(i - .12, j, 1.17), H.p(i + .12, j, 1.17)], 'paper', .75);
  }
}

function readingLamp(H, R, i, j) {
  const [x, y] = H.p(i, j, 1.1);
  oval(H, R, x, y, 10, 4, 'blue', .8);
  stroke(H, R, [[x, y], [x - 1, y - 24], [x + 9, y - 29]], 'sun', 2.2);
  shape(H, R, [[x - 9, y - 39], [x + 16, y - 37], [x + 24, y - 23], [x - 16, y - 26]], 'teal', .8, .85);
  H.line(R, [[x - 14, y - 25], [x + 22, y - 23]], 'sun', 1.6);
}

function mapRoomDetails(H, R) {
  shelfUnit(H, R, 5.56, 0.3, 3.18, 0.91, 1.64, [0, 0.84], 'teal');
  for (let n = 0; n < 5; n++) {
    const [x, y] = H.p(5.9 + n * 0.57, 0.69, 1.82);
    H.line(
      R,
      [
        [x, y],
        [x + 4, y - 28 - (n % 2) * 8]
      ],
      'paper',
      8
    );
    oval(H, R, x + 4, y - 28 - (n % 2) * 8, 4, 2, 'sun', 0.5);
    H.dot(x + 4, y - 28 - (n % 2) * 8, 1.3, 'blue');
  }
  for (let n = 0; n < 3; n++) boundBook(H, R, 5.75 + n * 0.96, 0.44, 0.78, 0.61, 2.63, ['coral', 'teal', 'sun'][n]);
  table(H, R, 4.29, 9.73, 2.25, 1.49, 0.64, 'teal');
  boundBook(H, R, 4.47, 9.91, 1.27, 1.11, 0.79, 'coral');
  shallowTray(H, R, 5.95, 9.94, 0.39, 0.92, 0.79, 'paper');
  for (let n = 0; n < 3; n++) H.line(R, [H.p(6.03 + n * 0.1, 10.07, 0.99), H.p(6.03 + n * 0.1, 10.71, 0.99)], 'sun', 1.4);
  for (const i of [4.46, 6.29]) for (const j of [9.88, 11.03]) oval(H, R, ...H.p(i, j, 0.08), 4, 5, 'blue', 0.75);
  for (let n = 0; n < 3; n++) boundBook(H, R, 4.51, 9.98, 1.45, 0.94, 0.14 + n * 0.17, ['paper', 'teal', 'sun'][n]);
  framedPanel(H, R, 9.03, 0.18, 2.12, 1.85, 1.27, 'teal');
  for (let n = 0; n < 4; n++) H.line(R, [H.p(9.33, 0.31, 2.1 + n * 0.2), H.p(10.86, 0.31, 2.1 + n * 0.2)], 'blue', 0.5);
  satchel(H, R, 10.64, 9.77, 0.05, 'blue', 0.8);
  const [x, y] = H.p(9.96, 6.35, 0.96);
  oval(H, R, x, y, 7, 5, 'paper', 1);
  oval(H, R, x, y, 4, 3, 'teal', 0.15);
  H.line(
    R,
    [
      [x + 6, y + 2],
      [x + 16, y + 7]
    ],
    'sun',
    2
  );
}

function construction(H, R) {
  cornice(H, R, 'nw', 0.1, 11.8, 3.64, 'sun');
  wallCourse(H, R, 'nw', 0.1, 11.8, 0.79, 'teal');
  wallRack(H, R, 'ne', 0.45, 3.03, 2.16, 1.06, 2, 'teal', (P, z, row) => {
    for (let n = 0; n < 6; n++) {
      const u = 0.28 + n * 0.46;
      shape(H, R, [P(u, z + 0.05), P(u + 0.29, z + 0.05), P(u + 0.29, z + 0.38), P(u, z + 0.38)], n % 3 ? 'paper' : 'coral', 0.75, 0.5);
      H.line(R, [P(u + 0.04, z + 0.24), P(u + 0.25, z + 0.24)], row ? 'sun' : 'teal', 1.3);
    }
  });
  recessedFrame(H, R, 'ne', 8.98, 2.28, 1.75, 1.51, 'sun', (P) => {
    shape(H, R, [P(0.12, 0.13), P(2.16, 0.13), P(2.16, 1.38), P(0.12, 1.38)], 'paper', 1, 0.5);
    for (let n = 0; n < 6; n++) {
      H.line(R, [P(0.21 + n * 0.35, 0.2), P(0.21 + n * 0.35, 1.3)], 'teal', 0.6);
      H.line(R, [P(0.2, 0.25 + n * 0.19), P(2.08, 0.25 + n * 0.19)], 'teal', 0.6);
    }
    stroke(H, R, [P(0.35, 0.23), P(0.58, 0.57), P(1.1, 0.63), P(1.43, 1.12), P(1.94, 1.24)], 'coral', 2);
    H.dot(...P(1.1, 0.63), 2.4, 'sun');
  });
  for (const i of [3.15, 8.72]) {
    H.line(R, [H.p(i, 3.91, 0.18), H.p(i, 7.76, 0.18)], 'blue', 2);
    H.line(R, [H.p(i, 3.91, 0.2), H.p(i, 7.76, 0.89)], 'teal', 1.3);
  }
  for (let n = 0; n < 5; n++) {
    const i = 3.27 + n * 1.08;
    shape(H, R, H.faceI(i, 7.985, 0.9, 0.51, 0.86), 'sun', 0.38, 0.6);
    H.line(R, [H.p(i + 0.27, 8.0, 0.7), H.p(i + 0.64, 8.0, 0.7)], 'blue', 1.6);
  }
  const [x, y] = H.p(4.33, 4.67, 1.12);
  oval(H, R, x, y, 8, 6, 'paper', 1);
  oval(H, R, x, y, 5.5, 4, 'teal', 0.15);
  H.line(
    R,
    [
      [x + 5, y + 4],
      [x + 17, y + 12]
    ],
    'blue',
    2.5
  );
  for (let n = 0; n < 3; n++) {
    const [px, py] = H.p(5.1 + n * 0.76, 7.39, 1.1);
    shape(
      H,
      R,
      [
        [px - 7, py],
        [px + 7, py],
        [px + 5, py - 5],
        [px - 5, py - 5]
      ],
      'teal',
      0.7,
      0.6
    );
    H.line(
      R,
      [
        [px - 3, py - 3],
        [px + 3, py - 3]
      ],
      'sun',
      0.7
    );
  }
  for (let n = 0; n < 7; n++) {
    const [px, py] = H.p(6.03 + n * 0.36, 0.77, 2.7);
    shape(
      H,
      R,
      [
        [px - 4, py],
        [px + 4, py],
        [px + 4, py - 18 - (n % 2) * 5],
        [px - 4, py - 18 - (n % 2) * 5]
      ],
      'paper',
      1,
      0.5
    );
    oval(H, R, px, py - 18 - (n % 2) * 5, 4, 2, 'teal', 0.4);
    H.line(
      R,
      [
        [px - 4, py - 8],
        [px + 4, py - 8]
      ],
      n % 2 ? 'coral' : 'sun',
      1.2
    );
  }
  taskLight(H, R, 4.64, 10.03, 0.83, 'teal', 0.55);
  for (let n = 0; n < 4; n++) {
    const [px, py] = H.p(10.66, 6.77, 0.94 + n * 0.08);
    shape(
      H,
      R,
      [
        [px - 12, py],
        [px + 12, py],
        [px + 12, py - 3],
        [px - 12, py - 3]
      ],
      'paper',
      1,
      0.5
    );
    H.line(
      R,
      [
        [px - 8, py - 1],
        [px + 8, py - 1]
      ],
      'coral',
      0.55
    );
  }
  for (const i of [9.68, 11.16]) for (const j of [6.21, 7.91]) caster(H, R, i, j);
}

const room = world('new-york-map-room', 'Midtown · Find Our Block', {
  floor: 'sun', tone: .17, pattern: 'tiles', accent: 'coral', wall: 'paper', wallTone: .94, height: 3.9,
}, (H, R) => {
  for (const j of [2.13, 5.73, 9.32]) {
    const p = (a, z) => H.p(.07, j + a, z);
    const arch = [p(-1.36, 1.33), p(1.36, 1.33), p(1.36, 2.68), ...Array.from({ length: 17 }, (_, k) => { const a = k / 16 * Math.PI; return p(Math.cos(a) * 1.36, 2.68 + Math.sin(a) * .95); })];
    shape(H, R, arch, 'teal', .28, 1.1);
    H.clip(arch, () => {
      for (const a of [-.88, 0, .88]) H.line(R, [p(a, 1.35), p(a, 3.56)], 'paper', 2.4);
      for (const z of [1.46, 2.34, 2.79]) H.line(R, [p(-1.35, z), p(1.35, z)], 'paper', 2.6);
      H.tint([p(-1.36, 1.35), p(-.54, 1.35), p(1.36, 3.59), p(.54, 3.59)], 'sun', .13);
    });
    box(H, R, .06, j - 1.45, .38, 2.9, 1.22, .12, 'sun', .46);
  }
  for (const i of [.2, 3.95, 7.75, 11.45]) box(H, R, i, .02, .25, .23, 0, 3.88, 'paper', 1);
  box(H, R, .12, .03, 11.72, .23, 3.45, .22, 'sun', .35);
  cabinet(H, R, 1.05, .7, 3.25, 1.55);
  cabinet(H, R, 4.55, .7, 3.25, 1.55);
  cabinet(H, R, 8.05, .7, 3.25, 1.55);
  for (let q = 0; q < 3; q++) {
    box(H, R, 1.33 + q * .68, .98, .51, .83, 1.58, .05, ['paper', 'teal', 'coral'][q], .7);
    H.line(R, [H.p(1.4 + q * .68, 1.27, 1.64), H.p(1.7 + q * .68, 1.27, 1.64)], 'blue', .6);
  }
  shape(H, R, H.faceI(4.8, .09, 2.51, 2.0, 3.23), 'teal', .4, .7);
  shape(H, R, H.faceI(4.92, .12, 2.27, 2.1, 3.11), 'paper', 1, .5);
  stroke(H, R, [H.p(5.05, .15, 2.37), H.p(5.44, .15, 2.58), H.p(6.15, .15, 2.29), H.p(6.53, .15, 2.73), H.p(7, .15, 2.82)], 'teal', 4.5);
  for (let q = 0; q < 7; q++) H.line(R, [H.p(5.04 + q * .3, .17, 2.14), H.p(5.04 + q * .3, .17, 3.07)], 'coral', .45, { tone: .55 });
  table(H, R, 3.0, 3.77, 6.06, 4.19, .94, 'sun');
  map(H, R);
  readingLamp(H, R, 3.5, 3.92);
  readingLamp(H, R, 8.6, 3.92);
  for (const i of [3.2, 8.5]) H.line(R, [H.p(i, 7.97, .85), H.p(i, 7.97, .1)], 'blue', 1.6);
  box(H, R, 7.41, 8.25, 1.05, 1.03, .45, .13, 'teal', .68);
  box(H, R, 7.41, 9.19, 1.05, .11, .5, .75, 'teal', .68);
  for (const i of [7.51, 8.28]) for (const j of [8.38, 9.09]) H.line(R, [H.p(i, j, .06), H.p(i, j, .45)], 'blue', 1.7);
  table(H, R, 9.56, 6.1, 1.78, 2.0, .79, 'teal');
  const [gx, gy] = H.p(10.42, 6.66, 1.39);
  oval(H, R, gx, gy, 22, 22, 'teal', .34);
  H.clip(ell(gx, gy, 22, 22), () => {
    for (const r of [8, 15]) H.outline(R, ell(gx, gy, r, 22), 'blue', .6, { tone: .6 });
    for (const y of [-10, 0, 10]) H.outline(R, ell(gx, gy + y, Math.sqrt(484 - y * y), 4), 'blue', .6, { tone: .6 });
    shape(H, R, [[gx - 17, gy - 11], [gx - 1, gy - 17], [gx + 9, gy - 4], [gx + 2, gy + 4], [gx + 8, gy + 16], [gx - 3, gy + 10], [gx - 8, gy - 2]], 'sun', .58, .6);
  });
  stroke(H, R, [[gx - 9, gy - 24], [gx + 22, gy - 16], [gx + 24, gy + 11], [gx + 4, gy + 25], [gx - 12, gy + 18]], 'blue', 1.6);
  H.line(R, [[gx + 2, gy + 24], [gx + 2, gy + 36]], 'blue', 2.5);
  oval(H, R, gx + 2, gy + 36, 12, 4, 'sun', .7);
  for (let q = 0; q < 3; q++) box(H, R, 9.7, 7.24, .94, .6, .95 + q * .07, .05, q === 1 ? 'coral' : 'paper', .85);
  shape(H, R, [H.p(1.12, 8.79, .7), H.p(2.3, 8.79, .7), H.p(2.3, 9.95, 1.19), H.p(1.12, 9.95, 1.19)], 'teal', .65, .7);
  box(H, R, 1.21, 8.83, .99, .95, .9, .11, 'paper', .92);
  for (let q = 0; q < 6; q++) H.line(R, [H.p(1.32, 8.95 + q * .13, 1.06), H.p(2.08, 8.95 + q * .13, 1.06)], 'blue', .55);
  box(H, R, 1.03, 8.68, 1.4, 1.48, .51, .12, 'sun', .55);
  for (const i of [1.14, 2.21]) for (const j of [8.78, 10.05]) H.line(R, [H.p(i, j, .05), H.p(i, j, .56)], 'blue', 1.4);
  const [px, py] = H.p(5.72, 9.93, .09);
  shape(H, R, [[px - 14, py + 3], [px + 12, py + 3], [px + 10, py - 18], [px - 10, py - 18]], 'coral', .6, .8);
  stroke(H, R, [[px - 8, py - 16], [px - 7, py - 28], [px + 7, py - 28], [px + 8, py - 16]], 'blue', 1.4);
  for (let q = 0; q < 3; q++) H.line(R, [[px - 10, py - 9 + q * 4], [px + 11, py - 9 + q * 4]], 'paper', .7);
  mapRoomDetails(H, R);
  construction(H, R);
}, (H, R, t) => {
  const u = cycle(t, 12);
  H.at(7.94, 8.71, 0, HH => actor(HH, R, 7.94, 8.71, t, 'newYorkMapTrace', {
    face: 'nw', shirt: ['coral', .65], hairStyle: 'pony', pants: ['blue', .64],
    prop: (h, r, p) => {
      const [x, y] = p.farHand;
      const lift = u < .6 ? 0 : u < .71 ? (1 - Math.cos((u - .6) / .11 * Math.PI)) / 2 : u < .86 ? 1 : (1 + Math.cos((u - .86) / .14 * Math.PI)) / 2;
      const tip = [x - 25 + lift * 16, y - 3 - lift * 11];
      h.line(r, [[x + 3, y + 2], tip], 'sun', 2.1);
      h.dot(...tip, 1.1, 'blue');
    },
  }, 0, 1.4));
  H.at(9.45, 4.39, 0, HH => actor(HH, R, 9.45, 4.39, t, 'newYorkMapLibrarian', {
    face: 'sw', shirt: ['teal', .72], hairStyle: 'short', glasses: true, skin: ['coral', .45],
    prop: (h, r, p) => {
      const [x, y] = p.farHand;
      shape(h, r, [[x - 5, y - 10], [x + 13, y - 7], [x + 11, y + 9], [x - 7, y + 6]], 'paper', 1, .6);
      for (let q = 0; q < 3; q++) h.line(r, [[x - 2, y - 5 + q * 4], [x + 8, y - 3 + q * 4]], 'blue', .5);
    },
  }, 0, 1.33));
});
room.loopSeconds = 12;
export default room;
