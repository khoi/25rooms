import { world, box, table, shape, oval, stroke, actor, bottle, cycle, starPts, ell } from '../common.js';

const colors = ['coral', 'sun', 'teal'];

function ticket(H, R, i, j, z, text, ink = 'paper', w = 24) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - w / 2, y - 5], [x + w / 2, y - 5], [x + w / 2, y + 5], [x - w / 2, y + 5]], ink, .95, .6);
}

function parcel(H, R, i, j, z, w = .65, d = .65, h = .48, ink = 'coral', number = 'REM') {
  box(H, R, i, j, w, d, z, h, ink, .6);
  H.line(R, [H.p(i + w * .5, j, z + h + .01), H.p(i + w * .5, j + d, z + h + .01), H.p(i + w * .5, j + d, z)], 'paper', 2.3);
  H.line(R, [H.p(i, j + d * .5, z + h + .01), H.p(i + w, j + d * .5, z + h + .01)], 'paper', 1.4);
  ticket(H, R, i + w * .76, j + d + .015, z + h * .47, number, 'paper', 14);
}

function moon(H, R, x, y, r, ink = 'sun') {
  oval(H, R, x, y, r, r, ink, .9);
  oval(H, R, x + r * .42, y - r * .28, r * .8, r * .82, 'paper', 1);
}

function dream(H, R, i, j, z, kind = 0, size = 18, t = 0) {
  const [x, y] = H.p(i, j, z);
  oval(H, R, x, y, size, size * 1.04, 'paper', .94);
  H.tint(ell(x, y, size - 1, size * 1.04 - 1), kind === 3 ? 'coral' : 'teal', .13);
  stroke(H, R, [[x - size * .7, y - size * .1], [x - size * .65, y - size * .55], [x - size * .26, y - size * .8]], 'paper', 2.2);
  if (kind === 0) {
    moon(H, R, x - 1, y - 1, size * .5);
    shape(H, R, starPts(x + size * .4, y - size * .42, size * .2, size * .09, 5), 'coral', .9, .6);
  } else if (kind === 1) {
    shape(H, R, [[x - size * .65, y + size * .3], [x - size * .15, y - size * .35], [x + size * .2, y + size * .08], [x + size * .45, y - size * .18], [x + size * .7, y + size * .3]], 'teal', .65, .6);
    H.dot(x + size * .35, y - size * .5, 3, 'sun', 1);
  } else if (kind === 2) {
    oval(H, R, x - 1, y, size * .45, size * .24, 'coral', .8);
    shape(H, R, [[x + size * .3, y], [x + size * .63, y - size * .29], [x + size * .63, y + size * .24]], 'coral', .8, .6);
    H.dot(x - size * .26, y - 1, 1.1, 'blue', 1);
    stroke(H, R, [[x - size * .6, y + size * .46], [x, y + size * .36], [x + size * .5, y + size * .5]], 'blue', .7);
  } else {
    shape(H, R, starPts(x, y, size * .64, size * .35, 8), 'blue', .72, .7);
    for (const dx of [-4, 4]) {
      oval(H, R, x + dx, y - 2, 2.1, 3, 'paper', 1);
      H.dot(x + dx + Math.sin(t * 2), y - 1, 1, 'coral', 1);
    }
    stroke(H, R, [[x - 4, y + 6], [x, y + 3], [x + 4, y + 6]], 'paper', 1);
  }
}

function cart(H, R, i, j, ink, loaded = true) {
  for (const a of [.18, 1.28]) for (const b of [.12, 1.38]) {
    const [x, y] = H.p(i + a, j + b, .15);
    oval(H, R, x, y, 4.4, 5.3, 'blue', .8);
    H.dot(x, y, 1.5, 'paper', 1);
  }
  box(H, R, i, j, 1.55, 1.6, .32, .14, ink, .72);
  for (const a of [.08, 1.45]) H.line(R, [H.p(i + a, j, .46), H.p(i + a, j, 1.28)], 'blue', 2.4);
  H.line(R, [H.p(i + .08, j, 1.28), H.p(i + 1.45, j, 1.28)], ink, 3);
  if (loaded) {
    parcel(H, R, i + .12, j + .3, .48, .7, .6, .56, 'coral', '301');
    parcel(H, R, i + .83, j + .25, .48, .56, .7, .44, 'sun', '302');
    parcel(H, R, i + .32, j + 1, .48, .88, .45, .38, 'teal', 'SEA');
    parcel(H, R, i + .22, j + .36, 1.04, .54, .5, .34, 'paper', 'FLY');
  }
}

function chute(H, R, i, ink, title) {
  const surface = [H.p(i, 1.05, 2.14), H.p(i + 1.16, 1.05, 2.14), H.p(i + 1.16, 3.38, .99), H.p(i, 3.38, .99)];
  shape(H, R, surface, ink, .5);
  for (const x of [i, i + 1.16]) {
    shape(H, R, [H.p(x, 1.05, 2.14), H.p(x, 3.38, .99), H.p(x, 3.38, 1.24), H.p(x, 1.05, 2.4)], 'paper', .85, .7);
  }
  for (let n = 1; n < 7; n++) {
    const u = n / 7;
    H.line(R, [H.p(i + .08, 1.05 + u * 2.33, 2.15 - u * 1.15), H.p(i + 1.08, 1.05 + u * 2.33, 2.15 - u * 1.15)], 'blue', .75, { tone: .5 });
  }
  ticket(H, R, i + .58, 1, 2.64, title, 'paper', 47);
  box(H, R, i - .02, 3.38, 1.2, .78, .35, .65, ink, .5);
  shape(H, R, H.tile(i + .09, 3.49, .98, .57, 1.01), 'blue', .45, .7);
}

function depotUnder(H, R) {
  for (let n = 0; n < 4; n++) {
    const i = 1 + n * 1.65;
    box(H, R, i, .24, 1.48, .78, 0, 2.8, 'blue', .55);
    for (let row = 0; row < 3; row++) {
      box(H, R, i + .08, .31, 1.32, .77, .13 + row * .86, .69, colors[(n + row) % 3], .48);
      ticket(H, R, i + .75, 1.095, .49 + row * .86, `${101 + n * 3 + row}`, 'paper', 17);
      H.line(R, [H.p(i + .55, 1.1, .3 + row * .86), H.p(i + .86, 1.1, .3 + row * .86)], 'blue', 1.4);
    }
  }
  for (const [i, ink, title] of [[1.3, 'coral', 'FLYING'], [3.6, 'sun', 'REUNIONS'], [5.9, 'teal', 'OCEANS']]) chute(H, R, i, ink, title);
  const [bx, by] = H.p(.12, 4.9, 2.4);
  shape(H, R, [[bx - 58, by - 54], [bx + 58, by - 54], [bx + 58, by + 37], [bx - 58, by + 37]], 'blue', .8);

  for (let row = 0; row < 4; row++) {
    const y = by - 20 + row * 13;
    H.line(R, [[bx - 51, y + 7], [bx + 51, y + 7]], 'teal', .65);

    H.dot(bx - 48, y, 2, row === 2 ? 'coral' : 'sun', 1);
  }
  for (let n = 0; n < 3; n++) {
    const [x, y] = H.p(.1, 7.7 + n * 1.25, 3);
    oval(H, R, x, y, 12, 12, 'paper', 1);
    H.line(R, [[x, y - 8], [x, y], [x + 6 - n * 3, y + 3]], 'blue', 1);
  }
  ticket(H, R, 6.1, .22, 3.42, 'HANDLE WITH WONDER', 'paper', 136);
  box(H, R, 8.75, .4, 2.5, 1.12, 0, .78, 'teal', .55);
  table(H, R, 8.3, 1.9, 2.7, 1.1, .82, 'sun');
  for (let n = 0; n < 6; n++) {
    const i = 8.48 + n * .39;
    box(H, R, i, .54, .27, .65, .82, .74 + n % 2 * .22, colors[n % 3], .58);
    H.line(R, [H.p(i + .03, 1.21, 1.02), H.p(i + .23, 1.21, 1.02)], 'paper', 1.5);
  }
  for (let n = 0; n < 4; n++) box(H, R, 8.55, 2.3, .83, .49, .96 + n * .038, .022, 'paper', 1);
  box(H, R, 9.8, 2.27, .58, .37, .96, .18, 'blue', .6);
  for (let n = 0; n < 5; n++) H.line(R, [H.p(9.84 + n * .095, 2.32, 1.15), H.p(9.84 + n * .095, 2.56, 1.15)], 'paper', .65);
  const [mugX, mugY] = H.p(10.65, 2.36, 1.11);
  oval(H, R, mugX + 6, mugY - 4, 4, 4, 'coral', .8);
  shape(H, R, [[mugX - 5, mugY], [mugX + 5, mugY], [mugX + 6, mugY - 11], [mugX - 6, mugY - 11]], 'paper', 1, .7);
  oval(H, R, mugX, mugY - 11, 6, 2.1, 'blue', .8);
  ticket(H, R, 10.1, .55, 2.5, 'LOST & DREAMED', 'sun', 85);
  table(H, R, 2.1, 5.0, 6.15, 1.15, .82, 'blue');
  for (let i = 2.18; i < 8.2; i += .23) H.line(R, [H.p(i, 5.09, .98), H.p(i, 6.04, .98)], 'paper', 2.2, { tone: .8 });
  for (const j of [5, 6.15]) H.line(R, [H.p(2.1, j, 1.05), H.p(8.25, j, 1.05)], 'coral', 3);
  box(H, R, 7.8, 5.25, .7, .58, .25, .42, 'teal', .6);
  H.line(R, [H.p(8.3, 5.9, .5), H.p(8.62, 6.2, .5), H.p(8.62, 6.2, .8)], 'blue', 2);
  ticket(H, R, 5.15, 6.2, .65, 'SWEET DREAMS  →', 'sun', 107);
  table(H, R, .72, 5.3, 1.18, 1.55, .72, 'coral');
  box(H, R, .86, 5.46, .9, 1.0, .86, .14, 'blue', .75);
  const [sx, sy] = H.p(1.25, 5.93, 1.58);
  H.line(R, [H.p(1.25, 5.93, 1.02), [sx, sy - 8]], 'sun', 3);
  oval(H, R, sx, sy, 13, 13, 'paper', 1);
  for (let n = 0; n < 7; n++) {
    const a = Math.PI + n * Math.PI / 6;
    H.line(R, [[sx + Math.cos(a) * 8, sy + Math.sin(a) * 8], [sx + Math.cos(a) * 10.5, sy + Math.sin(a) * 10.5]], 'blue', .6);
  }

  oval(H, R, ...H.p(1.25, 6.12, 1.1), 19, 7, 'sun', .65);
  for (let n = 0; n < 3; n++) box(H, R, .8 + n * .31, 6.52, .21, .22, .86, .16 + n * .09, 'blue', .7);
  ticket(H, R, 1.25, 6.95, .86, 'FEATHERWEIGHT', 'paper', 73);
  table(H, R, 8.95, 4.05, 2.15, 1.6, 1.05, 'paper');
  for (let n = 0; n < 3; n++) bottle(H, R, ...H.p(9.08 + n * .39, 4.32, 1.22), colors[n], .4);
  box(H, R, 10.35, 4.33, .49, .74, 1.19, .06, 'coral', .65);
  H.line(R, [H.p(10.48, 4.4, 1.27), H.p(10.48, 4.96, 1.27)], 'paper', 1);
  const [lx, ly] = H.p(10.42, 5.23, 1.25);
  H.line(R, [[lx + 11, ly + 9], [lx + 1, ly - 2]], 'blue', 2.6);
  oval(H, R, lx - 5, ly - 8, 11, 11, 'teal', .18);
  oval(H, R, lx - 5, ly - 8, 8, 8, 'paper', .75);
  ticket(H, R, 9.96, 5.64, .94, 'QUALITY OF WONDER', 'sun', 101);
  H.line(R, [H.p(10.9, 4.15, 1.17), H.p(10.9, 4.15, 2.25), H.p(10.4, 4.65, 2.4)], 'blue', 2);
  const [ax, ay] = H.p(10.4, 4.65, 2.4);
  shape(H, R, [[ax - 13, ay + 6], [ax - 6, ay - 7], [ax + 6, ay - 7], [ax + 13, ay + 6]], 'sun', .9);
  table(H, R, 5.0, 8.35, 3.15, 1.55, .8, 'coral');
  for (let n = 0; n < 6; n++) {
    const i = 5.15 + n % 3 * .46, j = 8.54 + Math.floor(n / 3) * .5;
    oval(H, R, ...H.p(i + .2, j + .2, .98), 10, 5, 'paper', .85);
    oval(H, R, ...H.p(i + .2, j + .2, 1.01), 6, 3, 'teal', .22);
  }
  box(H, R, 6.83, 8.45, 1.1, 1.1, .94, .38, 'sun', .55);
  shape(H, R, H.tile(6.94, 8.56, .88, .86, 1.33), 'paper', 1, .6);
  for (const j of [8.45, 9.55]) shape(H, R, [H.p(6.83, j, 1.33), H.p(7.93, j, 1.33), H.p(7.93, j + (j > 9 ? .36 : -.36), 1.53), H.p(6.83, j + (j > 9 ? .36 : -.36), 1.53)], 'sun', .65, .7);
  const [tx, ty] = H.p(5.23, 9.65, 1.05);
  oval(H, R, tx, ty, 10, 7, 'sun', .8);
  oval(H, R, tx, ty, 4, 3, 'paper', 1);
  stroke(H, R, [[tx + 9, ty], [tx + 23, ty + 2], [tx + 27, ty + 8]], 'sun', 3);
  const [cx, cy] = H.p(6.0, 9.75, 1.01);
  for (const dx of [-3, 3]) oval(H, R, cx + dx, cy, 3, 3.8, 'paper', 1);
  H.line(R, [[cx - 3, cy], [cx + 9, cy - 11]], 'blue', 1.4);
  H.line(R, [[cx + 3, cy], [cx - 6, cy - 10]], 'blue', 1.4);
  ticket(H, R, 6.6, 9.99, .7, 'PACK IN SLEEP', 'paper', 80);
  for (const [i, j, ink, tag] of [[5.1, 10.25, 'teal', 'FRAGILE'], [6.4, 10.65, 'coral', 'HOME'], [7.45, 10.32, 'sun', 'WISH']]) parcel(H, R, i, j, 0, .9, .7, .58, ink, tag);
  box(H, R, .7, 8.5, 2.3, 1.65, .13, .33, 'blue', .8);
  shape(H, R, H.tile(.83, 8.63, 2.04, 1.39, .48), 'sun', .5);
  for (const i of [.8, 2.9]) for (const j of [8.6, 10.05]) H.line(R, [H.p(i, j, .48), H.p(i, j, 2.05)], 'coral', 2.3);
  shape(H, R, H.tile(.72, 8.53, 2.27, 1.61, 2.07), 'paper', .35);
  H.outline(R, H.faceI(.81, 10.03, 2.08, .49, 2.04), 'blue', .8);
  ticket(H, R, 1.84, 10.16, .72, 'NIGHTMARES', 'sun', 78);
  for (let n = 0; n < 7; n++) H.line(R, [H.p(.83 + n * .3, 10.17, .17), H.p(1.01 + n * .3, 10.17, .42)], 'sun', 2);
  box(H, R, 2.99, 8.81, .32, .69, .72, .65, 'teal', .8);
  for (const z of [1.03, 1.25]) H.dot(...H.p(3.18, 9.53, z), 2.4, z > 1.1 ? 'coral' : 'sun', 1);
  bottle(H, R, ...H.p(3.48, 9.62, .24), 'teal', .54);
  ticket(H, R, 3.48, 9.63, .64, 'CALM', 'paper', 22);
  cart(H, R, 9.57, 9.28, 'teal');
  cart(H, R, 3.07, 6.86, 'coral', false);
  for (let n = 0; n < 3; n++) dream(H, R, 3.48 + n % 2 * .65, 7.38 + Math.floor(n / 2) * .55, .9 + n * .07, n, 11);
  ticket(H, R, 4.01, 8.5, .12, 'AWAITING REM', 'paper', 75);
  for (const [i, j, ink] of [[1.7, 6.7, 'sun'], [9.97, 2.97, 'teal'], [3.69, 9.99, 'coral']]) {
    table(H, R, i, j, .55, .5, .39, ink);
    oval(H, R, ...H.p(i + .28, j + .25, .55), 11, 5.5, ink, .65);
  }
  parcel(H, R, 8.48, 10.6, 0, .65, .83, .39, 'paper', 'LINEN');
  for (let n = 0; n < 3; n++) {
    const [x, y] = H.p(8.83, 11.02, .53 + n * .09);
    shape(H, R, [[x - 12, y], [x - 8, y - 6], [x + 11, y - 5], [x + 14, y + 1], [x + 8, y + 5], [x - 8, y + 5]], 'paper', 1, .6);
    H.line(R, [[x - 7, y + 2], [x + 7, y + 2]], 'teal', .6);
  }
  for (const [i, j] of [[4.45, 4.4], [7.7, 7.08], [9.9, 7.78]]) {
    H.line(R, [H.p(i - .2, j, .02), H.p(i + .3, j, .02)], 'sun', 2.5);
    H.line(R, [H.p(i + .1, j - .15, .02), H.p(i + .3, j, .02), H.p(i + .1, j + .15, .02)], 'sun', 2.5);
  }
}

function depotLive(H, R, t) {
  for (let k = 0; k < 3; k++) {
    const u = cycle(t + k * 2, 7), i = 1.3 + k * 2.3;
    H.at(i + .6, 1.15 + u * 2.18, 2.36 - u * 1.1, HH => dream(HH, R, i + .6, 1.15 + u * 2.18, 2.36 - u * 1.1, k, 11));
  }
  for (let k = 0; k < 4; k++) {
    const u = cycle(t + k * 2.8, 11.2), i = 2.32 + u * 5.18;
    H.at(i + .35, 5.65, 1, HH => {
      parcel(HH, R, i, 5.23, 1.01, .64, .68, .42, colors[k % 3], ['FLY', 'SEA', 'HOME', 'REM'][k]);
      if (k === 0) {
        const [x, y] = HH.p(i + .31, 5.55, 1.64), flap = Math.sin(t * 5) * 4;
        for (const s of [-1, 1]) shape(HH, R, [[x + s * 8, y + 4], [x + s * 27, y - 5 - flap], [x + s * 21, y + 7], [x + s * 12, y + 10]], 'paper', 1, .7);
      } else if (k === 1) {
        const [x, y] = HH.p(i + .35, 5.55, 1.66);
        shape(HH, R, starPts(x, y, 9, 4, 5), 'sun', .9, .6);
      }
    });
  }
  H.at(1.25, 6.11, 1.1, HH => {
    dream(HH, R, 1.25, 6.11, 1.58 + Math.sin(t * 1.4) * .03, 0, 13);
    const [x, y] = HH.p(1.25, 5.93, 1.58);
    HH.line(R, [[x, y], [x + Math.sin(t * 1.5) * 7, y - 7]], 'coral', 1.5);
  });
  H.at(2.0, 6.85, 0, HH => actor(HH, R, 2.0, 6.85, t, 'write', { shirt: ['paper', 1], apron: ['coral', .72], face: 'nw', glasses: true }, .42, .83));
  H.at(9.55, 5.06, 1.5, HH => dream(HH, R, 9.55, 5.06, 1.67 + Math.sin(t * 1.1) * .1, 2, 18));
  H.at(11.13, 5.88, 0, HH => {
    actor(HH, R, 11.13, 5.88, t, 'hold', { shirt: ['paper', 1], apron: ['teal', .6], face: 'nw', glasses: true }, 0, .9);
    const [x, y] = HH.p(10.65, 4.98, 1.62);
    oval(HH, R, x + Math.sin(t * 1.7) * 2, y, 8, 8, 'teal', .12);
    HH.line(R, [[x - 4, y + 6], [x - 8, y + 20]], 'blue', 2);
  });
  H.at(10.26, 3.1, 0, HH => {
    actor(HH, R, 10.26, 3.1, t * .4, 'write', { shirt: ['coral', .65], face: 'nw', eyesClosed: true }, .36, .84);
    const [x, y] = HH.p(10.28, 3.1, 1.82);
  });
  H.at(7.38, 9.02, 1.7, HH => dream(HH, R, 7.38, 9.02, 1.65 + Math.sin(t * 1.3) * .09, 0, 19));
  H.at(8.64, 8.89, 0, HH => {
    actor(HH, R, 8.64, 8.89, t, 'hold', { shirt: ['sun', .8], apron: ['teal', .6], face: 'sw' }, 0, .87);
    const [x, y] = HH.p(8.12, 9, 1.15), dip = Math.sin(t * 2) * 4;
    stroke(HH, R, [[x + 19, y - 10], [x + 7, y - 8 + dip], [x - 1, y + 2 + dip]], 'sun', 2);
    shape(HH, R, starPts(x, y + 2 + dip, 5, 2.2, 5), 'coral', .8, .6);
  });
  H.at(1.9, 9.35, 1.2, HH => {
    dream(HH, R, 1.86 + Math.sin(t * 1.6) * .11, 9.35, 1.25 + Math.sin(t * 2.1) * .13, 3, 23, t);
    for (let n = 0; n < 4; n++) {
      const [x, y] = HH.p(1.08 + n * .53, 10.05, 1.23);
      HH.line(R, [[x, y - 21], [x, y + 21]], 'coral', 1.3, { tone: .8 });
    }
  });
  H.at(4.0, 10.12, 0, HH => {
    actor(HH, R, 4, 10.12, t, 'read', { shirt: ['teal', .7], face: 'nw' }, .42, .86);
    const [x, y] = HH.p(3.71, 9.99, 1.13);
    shape(HH, R, [[x - 8, y - 10], [x + 7, y - 6], [x + 5, y + 10], [x - 10, y + 6]], 'paper', 1, .6);
    for (let n = 0; n < 3; n++) HH.line(R, [[x - 5, y - 5 + n * 4], [x + 3, y - 3 + n * 4]], 'blue', .65);
  });
  H.at(10.3, 8.5, 0, HH => actor(HH, R, 10.3, 8.5, t, 'point', { shirt: ['coral', .7], face: 'sw' }, 0, .88));
  H.at(10.25, 9.6, 1.5, HH => {
    const [x, y] = HH.p(10.25, 9.6, 1.56), flap = Math.sin(t * 4.2) * 5;
    for (const s of [-1, 1]) shape(HH, R, [[x + s * 5, y], [x + s * 20, y - 10 - flap], [x + s * 19, y], [x + s * 10, y + 5]], 'paper', 1, .6);
  });
}

export default function enrich(room) {
  const depot = world(room.id, room.title, { floor: 'blue', tone: .26, wall: 'teal', wallTone: .36, height: 3.7, pattern: 'tiles' }, depotUnder, depotLive);
  return { ...room, under: depot.under, live: depot.live };
}
