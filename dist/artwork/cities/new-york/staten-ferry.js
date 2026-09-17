import { shallowTray, foldedCloth, boundBook, satchel, framedPanel, servicePipe } from '../furnishings.js';
import { world, shape, oval, stroke, box, table, actor, cycle, TAU, wallRect, wallPt, windowOn } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';

const rest = FIGURES.clips.idle.keys[0][1];
const seated = { ...rest, drop: .47, ll: 84, lr: 80, kl: -84, kr: -80, al: 36, el: 76, ar: 28, er: 88, head: 9 };
FIGURES.clips.newYorkFerrySip = { dur: 16, keys: [[0, seated], [.14, seated], [.29, { ...seated, ar: 57, er: 119, head: -5 }], [.43, { ...seated, ar: 57, er: 119, head: -5 }], [.57, seated], [.7, { ...seated, head: -22, lean: 3 }], [.88, { ...seated, head: -22, lean: 3 }], [1, seated]] };
FIGURES.clips.newYorkFerryDoze = { dur: 16, keys: [[0, { ...seated, head: 20, ar: 15, er: 43, al: 15, el: 40 }], [.5, { ...seated, head: 26, ar: 15, er: 43, al: 15, el: 40, y: -.5 }], [1, { ...seated, head: 20, ar: 15, er: 43, al: 15, el: 40 }]] };

function seatRow(H, R, i, j, length) {
  for (const x of [i + .25, i + length * .5, i + length - .3]) {
    box(H, R, x, j + .1, .16, .7, 0, .5, 'blue', .75);
    box(H, R, x, j + .08, .15, .12, .5, .69, 'blue', .8);
  }
  box(H, R, i, j, length, .86, .46, .12, 'coral', .74);
  box(H, R, i, j, length, .1, .61, .62, 'coral', .75);
  for (let k = .4; k < length; k += .87) {
    H.line(R, [H.p(i + k, j + .02, .68), H.p(i + k, j + .02, 1.17)], 'sun', .8, { tone: .7 });
    H.line(R, [H.p(i + k, j + .12, .59), H.p(i + k, j + .77, .59)], 'blue', .55, { tone: .4 });
  }
  for (const x of [i, i + length]) stroke(H, R, [H.p(x, j + .7, .55), H.p(x, j + .7, .96), H.p(x, j + .06, .96)], 'blue', 2.2);
}

function harbor(H, R, polygon, shift = 0) {
  const xs = polygon.map(p => p[0]), ys = polygon.map(p => p[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  H.clip(polygon, () => {
    shape(H, R, [[x0 - 8, y1 - 30], [x1 + 8, y1 - 30], [x1 + 8, y1 + 8], [x0 - 8, y1 + 8]], 'teal', .43, .4);
    for (let n = 0; n < 14; n++) {
      const x = x0 - 20 + n * 16, h = 8 + (n * 13 % 29);
      shape(H, R, [[x, y1 - 31], [x, y1 - 31 - h], [x + 11, y1 - 31 - h], [x + 11, y1 - 31]], 'blue', .3, .4);
    }
    oval(H, R, x1 - 19, y0 + 24, 13, 13, 'sun', .64);
    for (let k = 0; k < 8; k++) {
      const x = x0 - 45 + ((k * 37 + shift * (x1 - x0 + 90)) % (x1 - x0 + 90));
      H.line(R, [[x, y1 - 22 + k % 3 * 7], [x + 15 + k % 2 * 7, y1 - 22 + k % 3 * 7]], 'paper', 1.3, { tone: .72, amp: .1 });
    }
  });
}

function luggage(H, R, i, j) {
  box(H, R, i, j, .72, .55, .04, .67, 'teal', .7);
  const [x, y] = H.p(i + .37, j + .3, .71);
  stroke(H, R, [[x - 7, y], [x - 7, y - 9], [x + 7, y - 9], [x + 7, y]], 'blue', 2);
  shape(H, R, H.faceI(i + .09, j + .56, .51, .15, .42), 'coral', .62, .6);
  H.line(R, [H.p(i + .36, j + .57, .16), H.p(i + .36, j + .57, .36)], 'sun', 1.4);
  for (const a of [.16, .58]) H.dot(...H.p(i + a, j + .48, .04), 2.5, 'blue');
}

function statenFerryDetails(H, R) {
  box(H, R, 9.58, 9.3, 1.76, 1.63, 0.02, 0.16, 'teal', 0.52);
  for (let n = 0; n < 4; n++) H.line(R, [H.p(9.68, 9.45 + n * 0.36, 0.2), H.p(11.24, 9.45 + n * 0.36, 0.2)], 'paper', 0.8);
  const [x, y] = H.p(10.48, 10.11, 0.22);
  for (const dx of [-15, 15]) {
    oval(H, R, x + dx, y, 5, 5, dx < 0 ? 'teal' : 'blue', 0.8);
    H.line(
      R,
      [
        [x + dx, y - 4],
        [x - dx * 0.5, y - 47]
      ],
      'blue',
      2
    );
  }
  shape(
    H,
    R,
    [
      [x - 12, y - 43],
      [x + 11, y - 38],
      [x + 5, y - 9],
      [x - 9, y - 15]
    ],
    'coral',
    0.62,
    0.8
  );
  stroke(
    H,
    R,
    [
      [x - 5, y - 43],
      [x - 8, y - 60],
      [x + 9, y - 59]
    ],
    'teal',
    2
  );
  boundBook(H, R, 2.15, 6.52, 0.67, 0.45, 0.6, 'sun');
  framedPanel(H, R, 10.67, 0.24, 0.91, 0.93, 0.53, 'teal');
  for (const j of [4.07, 8.03]) {
    shallowTray(H, R, 10.13, j, 0.93, 0.3, 0.02, 'blue');
    for (let n = 0; n < 5; n++) H.line(R, [H.p(10.24 + n * 0.16, j + 0.04, 0.2), H.p(10.24 + n * 0.16, j + 0.26, 0.2)], 'paper', 0.6);
  }
  servicePipe(
    H,
    R,
    [
      [0.31, 10.23, 0.15],
      [0.31, 10.23, 2.72],
      [0.31, 6.36, 2.72]
    ],
    'paper',
    2
  );
  oval(H, R, ...H.p(0.35, 6.36, 2.58), 8, 8, 'blue', 0.6);
  oval(H, R, ...H.p(0.35, 6.36, 2.58), 5, 5, 'sun', 0.45);
}

const room = world('new-york-staten-ferry', 'Staten Island Ferry · First Crossing', {
  floor: 'blue', tone: .23, wall: false, head: 20,
}, (H, R) => {
  shape(H, R, H.faceI(.12, .12, 11.76, 0, 3.42), 'paper', 1);
  shape(H, R, H.faceJ(.12, .12, 10.72, 0, 3.42), 'paper', 1);
  for (const side of ['ne', 'nw']) {
    shape(H, R, wallRect(H, side, .15, 11.78, .12, .78, .15), 'coral', .73, .7);
    H.line(R, [wallPt(H, side, .2, .9, .16), wallPt(H, side, 11.8, .9, .16)], 'blue', 1.8);
    H.line(R, [wallPt(H, side, .2, 3.32, .16), wallPt(H, side, 11.8, 3.32, .16)], 'sun', 2);
  }
  for (const p of [2.15, 5.85, 9.55]) {
    const pane = windowOn(H, R, 'ne', p, 1.26, 3.2, 1.64, { sky: 'sun', skyTone: .15, frame: 0, inside: P => harbor(H, R, P) });
    H.outline(R, pane, 'paper', 3, { tone: 1, amp: .08 });
    H.outline(R, pane, 'blue', 1, { tone: .78, amp: .08 });
    for (const x of [p - 1.46, p + 1.46]) H.dot(...H.p(x, .18, 2.97), 1.8, 'blue');
  }
  shape(H, R, H.faceJ(.18, 1.16, 2.1, .1, 2.95), 'teal', .61);
  shape(H, R, H.faceJ(.2, 1.43, 1.56, 1.26, 2.58), 'sun', .24);
  H.line(R, [H.p(.24, 2.92, .92), H.p(.24, 2.92, 1.43)], 'paper', 3);
  for (const j of [1.23, 3.21]) box(H, R, .19, j, .12, .1, .1, 2.9, 'blue', .63);
  const [lx, ly] = H.p(.22, 5.12, 2.16);
  oval(H, R, lx, ly, 28, 29, 'coral', .82);
  oval(H, R, lx, ly, 14, 15, 'paper', 1);
  for (let k = 0; k < 4; k++) {
    const a = k * TAU / 4 + .2;
    H.line(R, [[lx + Math.cos(a) * 16, ly + Math.sin(a) * 17], [lx + Math.cos(a) * 27, ly + Math.sin(a) * 28]], 'paper', 6);
  }
  stroke(H, R, [[lx - 25, ly - 8], [lx - 35, ly - 20], [lx - 36, ly + 19], [lx - 21, ly + 31], [lx + 27, ly + 25], [lx + 31, ly - 16]], 'sun', 1.5);
  shape(H, R, H.faceJ(.22, 7.15, 2.84, 1.46, 2.43), 'blue', .68);
  for (let k = 0; k < 8; k++) H.line(R, [H.p(.24, 7.34 + k * .34, 1.6), H.p(.24, 7.34 + k * .34, 2.29)], 'paper', 1.3, { tone: .6 });
  for (let j = .9; j < 11.7; j += .55) H.line(R, [H.p(.8, j, .015), H.p(11.5, j, .015)], 'blue', .55, { tone: .3, amp: .05 });
  for (const j of [4.5, 8.35]) {
    shape(H, R, H.tile(1.2, j, 10.25, .13, .02), 'sun', .65, .4);
    for (let i = 1.5; i < 11.3; i += 1.1) H.line(R, [H.p(i, j + .21, .02), H.p(i + .35, j + .21, .02)], 'paper', 1);
  }
  seatRow(H, R, 1.3, 2.7, 9.85);
  seatRow(H, R, 1.3, 6.34, 9.85);
  for (const j of [1.12, 9.7]) {
    box(H, R, 1.04, j, .17, .17, 0, 3.3, 'paper', 1);
    box(H, R, 10.78, j, .17, .17, 0, 3.3, 'paper', 1);
    H.line(R, [H.p(1.14, j + .1, 3.29), H.p(10.88, j + .1, 3.29)], 'blue', 2.4);
    box(H, R, 4.2, j - .06, 3.0, .3, 3.18, .1, 'paper', 1);
    H.line(R, [H.p(4.3, j + .25, 3.2), H.p(7.1, j + .25, 3.2)], 'sun', 2.1);
  }
  luggage(H, R, 5.8, 6.4);
  luggage(H, R, 8.96, 3.2);
  box(H, R, .82, 10.53, .75, .72, .03, 1.03, 'teal', .62);
  oval(H, R, ...H.p(1.2, 10.89, 1.07), 12, 6, 'blue', .8);
  for (let k = 0; k < 4; k++) H.line(R, [H.p(1.59, 10.6 + k * .16, .15), H.p(1.59, 10.6 + k * .16, .88)], 'paper', .8);
  const [ux, uy] = H.p(7.55, 6.61, .59);
  stroke(H, R, [[ux - 27, uy - 8], [ux + 28, uy + 11]], 'blue', 3);
  stroke(H, R, [[ux + 27, uy + 11], [ux + 34, uy + 9], [ux + 34, uy + 1]], 'coral', 3);
  H.line(R, [[ux - 27, uy - 8], [ux - 8, uy - 2]], 'sun', 5);
  statenFerryDetails(H, R);
}, (H, R, t) => {
  const u = cycle(t, 16);
  for (const p of [2.15, 5.85, 9.55]) {
    const pane = wallRect(H, 'ne', p - 1.58, p + 1.58, 1.29, 2.88, .031);
    harbor(H, R, pane, u);
  }
  H.at(4.72, 6.72, 0, HH => actor(HH, R, 4.72, 6.72, u * 16, 'newYorkFerrySip', {
    shirt: ['teal', .68], pants: ['blue', .72], hairStyle: 'curly', skin: ['coral', .52], prop(h, r, points) {
      const [x, y] = points.nearHand;
      shape(h, r, [[x - 5, y + 5], [x + 5, y + 5], [x + 5, y - 12], [x - 5, y - 12]], 'paper', 1, .7);
      oval(h, r, x, y - 12, 5, 2, 'teal', .75);
      h.line(r, [[x - 5, y - 5], [x + 5, y - 5]], 'coral', 2);
      const [bx, by] = points.farHand;
      shape(h, r, [[bx - 15, by - 3], [bx + 6, by + 3], [bx + 5, by + 12], [bx - 16, by + 6]], 'sun', .64, .7);
      h.line(r, [[bx - 12, by + 1], [bx + 2, by + 5]], 'paper', 2);
      h.line(r, [[bx - 5, by + 6], [bx - 6, by + 15]], 'coral', 1.5);
    },
  }, .1, 1.4));
  H.at(8.5, 3.1, 0, HH => actor(HH, R, 8.5, 3.1, u * 16, 'newYorkFerryDoze', { shirt: ['sun', .66], hairStyle: 'cap', eyesClosed: true }, .1, 1.3));
  const [wx, wy] = H.p(10.93, 9.82, 2.1);
  stroke(H, R, [[wx, wy - 11], [wx + Math.sin(u * TAU) * 2, wy + 3], [wx + 1, wy + 14]], 'coral', 1.6);
});

room.over = (H, R) => {
  for (const i of [2.02, 7.24]) {
    const points = [H.p(i, 0.43, 3.34), H.p(i, 0.94, 3.18), H.p(i + 2.43, 0.94, 3.18), H.p(i + 2.43, 0.43, 3.34)];
    shape(H, R, points, 'paper', 0.9, 0.7);
    for (let n = 0; n < 8; n++) H.line(R, [H.p(i + 0.13 + n * 0.29, 0.46, 3.35), H.p(i + 0.13 + n * 0.29, 0.88, 3.23)], 'blue', 0.8);
    for (const x of [i + 0.12, i + 2.28]) H.line(R, [H.p(x, 0.24, 2.94), H.p(x, 0.93, 3.19)], 'teal', 1.4);
  }
  satchel(H, R, 2.78, 0.79, 3.32, 'teal', 0.57);
  foldedCloth(H, R, 7.6, 0.5, 0.95, 0.39, 3.37, 'coral', 'paper');
};
room.loopSeconds = 16;
export default room;
