import { world, shape, oval, stroke, box, table, actor, creature, bottle, windowOn, ell, starPts, cycle } from '../common.js';

function passport(H, R, i, j, z, ink = 'coral', open = false) {
  const w = open ? .52 : .29;
  shape(H, R, H.tile(i, j, w, .38, z), ink, .85, .65);
  if (open) {
    shape(H, R, H.tile(i + .04, j + .03, .44, .31, z + .01), 'paper', 1, .45);
    H.line(R, [H.p(i + .26, j + .04, z + .02), H.p(i + .26, j + .33, z + .02)], 'blue', .6);
    oval(H, R, ...H.p(i + .15, j + .16, z + .03), 2.2, 2, 'coral');
    for (let k = 0; k < 3; k++) H.line(R, [H.p(i + .3, j + .09 + k * .07, z + .02), H.p(i + .43, j + .09 + k * .07, z + .02)], 'blue', .5);
  } else {
    oval(H, R, ...H.p(i + .145, j + .19, z + .01), 2.3, 2.3, 'sun');
  }
}

function luggage(H, R, i, j, z, ink = 'coral', w = .72) {
  box(H, R, i, j, w, .44, z, .47, ink, .72);
  for (const a of [.14, w - .15]) H.line(R, [H.p(i + a, j, z + .48), H.p(i + a, j + .44, z + .48), H.p(i + a, j + .44, z + .03)], 'paper', 1.5);
  stroke(H, R, [H.p(i + w * .35, j + .18, z + .48), H.p(i + w * .35, j + .18, z + .63), H.p(i + w * .65, j + .18, z + .63), H.p(i + w * .65, j + .18, z + .48)], 'blue', 1.2);
  for (const a of [.12, w - .12]) H.dot(...H.p(i + a, j + .44, z), 2, 'blue');
  const [x, y] = H.p(i + w * .8, j + .47, z + .26);
  shape(H, R, [[x - 3, y - 3], [x + 4, y - 2], [x + 3, y + 3], [x - 3, y + 3]], 'paper', 1, .5);
}

function terminal(H, R, i, j, z, n) {
  box(H, R, i + .19, j + .2, .28, .23, z, .1, 'blue');
  box(H, R, i, j, .69, .16, z + .1, .48, 'paper', 1);
  shape(H, R, H.faceI(i + .07, j + .17, .55, z + .17, z + .51), 'blue', .9, .55);

  for (let k = 0; k < 3; k++) H.line(R, [H.p(i + .14, j + .19, z + .2 + k * .06), H.p(i + .44, j + .19, z + .2 + k * .06)], 'teal', .6);
  box(H, R, i + .1, j + .42, .56, .24, z, .04, 'blue');
  for (let k = 0; k < 5; k++) H.line(R, [H.p(i + .16 + k * .08, j + .44, z + .05), H.p(i + .16 + k * .08, j + .61, z + .05)], 'paper', .5);
}

function helmeted(H, R, i, j, t, ink, clip = 'idle', scale = .88, z = 0) {
  actor(H, R, i, j, t, clip, { shirt: [ink, .82], pants: ['paper', 1], hair: ['blue', .7] }, z, scale);
  const [x, y] = H.p(i, j, z);
  H.outline(R, ell(x + 1, y - 41.5 * scale, 9.2 * scale, 9.8 * scale), 'teal', 1.8, { tone: .85 });
  H.line(R, [[x - 6 * scale, y - 47 * scale], [x - 8 * scale, y - 43 * scale]], 'paper', 1.4);
  H.line(R, [[x - 9 * scale, y - 39 * scale], [x - 15 * scale, y - 34 * scale], [x - 12 * scale, y - 25 * scale]], 'blue', 1);
}

function jar(H, R, i, j, z, ink, n) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 5, y], [x + 5, y], [x + 5, y - 17], [x - 5, y - 17]], 'paper', 1, .6);
  oval(H, R, x, y - 6, 3.4, 3.2, ink, .7);
  H.line(R, [[x - 5, y - 17], [x + 5, y - 17]], 'coral', 2.4);
  H.line(R, [[x - 3, y - 14], [x - 3, y - 7]], 'teal', .65);
}

const detailed = world('moon-customs', 'Moon customs office', { floor: 'paper', tone: 1, wall: 'blue', wallTone: .95, height: 3.4, pattern: 'tiles' }, (H, R) => {
  windowOn(H, R, 'ne', 8.4, 1.35, 5.5, 1.75, { skyTone: 1, frameInk: 'paper', inside: () => {
    for (let k = 0; k < 48; k++) H.dot(...H.p(5.8 + R() * 5.2, .015, 1.45 + R() * 1.5), .7, 'paper');
    const [x, y] = H.p(9.7, .015, 2.35);
    oval(H, R, x, y, 21, 21, 'teal', .72);
    shape(H, R, [[x - 15, y - 10], [x - 5, y - 16], [x + 1, y - 8], [x - 4, y], [x - 11, y + 4]], 'sun', .65, .5);
    H.line(R, [[x - 18, y + 8], [x + 13, y + 8]], 'paper', 1);
  } });

  shape(H, R, H.faceJ(.09, 1.1, 3.65, 1.65, 2.95), 'paper', 1);
  for (let k = 0; k < 4; k++) {
    const [x, y] = H.p(.13, 1.5 + k * .8, 2.46 - k * .07);

    H.dot(x + 26, y, 1.8, k === 3 ? 'coral' : 'teal');
  }

  box(H, R, .3, 1.35, 1.2, 3.4, 0, .8, 'coral', .55);
  for (const z of [.88, 1.6]) {
    box(H, R, .3, 1.35, 1.2, 3.4, z, .09, 'sun', .72);
    for (let k = 0; k < 5; k++) {
      const i = .93, j = 1.65 + k * .57;
      const [x, y] = H.p(i, j, z + .1);
      if (k % 3 === 0) {
        oval(H, R, x, y - 7, 6, 7, 'paper', 1);
        oval(H, R, x, y - 7, 4, 4, 'teal', .35);
        oval(H, R, x, y, 7, 2, 'coral', .75);
        H.dot(x, y - 8, 2, 'sun');
      } else if (k % 3 === 1) {
        bottle(H, R, x, y, 'blue', .28);
      } else {
        H.line(R, [[x, y], [x, y - 16]], 'blue', 1);
        shape(H, R, [[x, y - 16], [x + 9, y - 13], [x, y - 10]], 'coral', .8, .6);
        oval(H, R, x, y, 5, 2.5, 'paper');
      }
    }
  }

  for (let k = 0; k < 5; k++) passport(H, R, .4 + k * .18, 4.18, .9, k % 2 ? 'teal' : 'coral');
  for (const i of [2.7, 5.7]) {
    box(H, R, i, 2.9, 2.7, 1.35, 0, .99, 'teal', .5);
    box(H, R, i - .05, 2.85, 2.8, 1.45, .99, .12, 'paper', 1);
    terminal(H, R, i + 1.74, 3, 1.12, i < 3 ? 'ENTRY' : 'VISA');
    for (let k = 0; k < 3; k++) passport(H, R, i + .22 + k * .04, 3.14 - k * .05, 1.13 + k * .04, 'coral');
    passport(H, R, i + .91, 3.62, 1.13, 'teal', true);
    box(H, R, i + .44, 3.67, .38, .31, 1.12, .06, 'blue');
    box(H, R, i + 1.65, 3.84, .52, .21, 1.13, .05, 'sun');
    const [x, y] = H.p(i + 1.98, 3.87, 1.24);
    oval(H, R, x, y, 4.3, 2.2, 'paper');
    stroke(H, R, [[x + 4, y], [x + 8, y + 1], [x + 6, y + 6], [x + 3, y + 5]], 'blue', .7);
    H.line(R, [H.p(i + .3, 4.26, .62), H.p(i + 2.4, 4.26, .62)], 'paper', 1.3);
  }
  box(H, R, 2.7, .45, 2.5, .63, 0, 1.2, 'teal', .55);
  for (let k = 0; k < 7; k++) {
    box(H, R, 2.84 + k * .3, .56, .23, .38, 1.2, .4 + k % 2 * .12, k % 2 ? 'sun' : 'paper');
    H.line(R, [H.p(2.96 + k * .3, .96, 1.29), H.p(2.96 + k * .3, .96, 1.52)], 'coral', .75);
  }
  for (let k = 0; k < 4; k++) {
    const i = 9.75 + k % 2 * .69, j = 1.12 + Math.floor(k / 2) * 1.15;
    table(H, R, i, j, .6, .88, .8, 'sun');
    jar(H, R, i + .3, j + .45, .94, ['coral', 'teal', 'sun', 'blue'][k], `Q${k + 1}`);
  }
  table(H, R, 9.3, 3.65, 2.1, 1, .86, 'paper');
  for (let k = 0; k < 5; k++) jar(H, R, 9.5 + k * .33, 4.08, .99, k % 2 ? 'teal' : 'coral', String(k + 5));

  box(H, R, 10.58, 4.38, .43, .32, .99, .17, 'blue');
  box(H, R, 10.72, 4.47, .16, .13, 1.16, .32, 'paper');
  const [mx, my] = H.p(10.8, 4.48, 1.5);
  H.line(R, [[mx, my], [mx - 6, my - 9], [mx - 13, my - 6]], 'blue', 3);
  for (const [i, j] of [[4.5, 5.2], [4.5, 7.5], [4.5, 9.7], [7.3, 5.2], [7.3, 7.5], [7.3, 9.7]]) {
    oval(H, R, ...H.p(i, j), 5, 2.5, 'blue');
    box(H, R, i, j, .06, .06, .04, .65, 'coral');
    H.dot(...H.p(i + .03, j + .03, .72), 2.8, 'sun');
  }
  for (const i of [4.5, 7.3]) for (const j of [5.2, 7.5]) stroke(H, R, [H.p(i, j, .64), H.p(i, j + 1.1, .5), H.p(i, j + 2.2, .64)], 'coral', 1.5);
  for (let k = 0; k < 4; k++) {
    const i = 5.85, j = 5.2 + k * 1.4;
    shape(H, R, [H.p(i - .2, j + .25, .02), H.p(i, j, .02), H.p(i + .2, j + .25, .02), H.p(i, j + .12, .02)], 'teal', .3, .35);
  }
  table(H, R, 1.1, 5.1, 1.7, 4.5, .5, 'blue');
  shape(H, R, H.tile(1.17, 5.15, 1.56, 4.4, .65), 'teal', .42, .8);
  for (let j = 5.2; j < 9.55; j += .22) H.line(R, [H.p(1.2, j, .67), H.p(2.7, j, .67)], 'paper', .75);
  luggage(H, R, 1.54, 5.28, .68, 'teal', .79);
  box(H, R, 1.04, 6.2, 1.83, 1.4, .69, 1.15, 'sun', .8);
  shape(H, R, H.faceI(1.19, 7.61, 1.5, .72, 1.57), 'blue', .95, .7);
  for (let k = 0; k < 7; k++) H.line(R, [H.p(1.27 + k * .2, 7.62, .73), H.p(1.27 + k * .2, 7.62, 1.51)], 'teal', 1.1);
  for (let k = 0; k < 5; k++) box(H, R, 1.13 + k * .33, 6.32, .2, .3, 1.85, .05, k % 2 ? 'coral' : 'blue');

  terminal(H, R, 2.92, 6.85, .78, 'X-RAY');
  box(H, R, 3.05, 7.04, .15, .15, 0, .78, 'blue');
  for (let k = 0; k < 3; k++) box(H, R, .4, 8.6 + k * .4, .6, .32, .02 + k * .09, .14, 'paper', 1);

  table(H, R, 8.45, 6.72, 2.65, 1.85, .79, 'coral');
  shape(H, R, H.tile(8.7, 7.08, 1.53, 1.1, .95), 'sun', .85, 1);
  shape(H, R, H.tile(8.83, 7.21, 1.28, .83, .96), 'blue', .82, .7);
  shape(H, R, [H.p(8.7, 7.08, .96), H.p(10.23, 7.08, .96), H.p(10.23, 6.88, 1.68), H.p(8.7, 6.88, 1.68)], 'sun', .75, 1);
  for (let k = 0; k < 3; k++) {
    const i = 8.91 + k * .34;
    box(H, R, i, 7.72, .29, .25, .98, .16, k % 2 ? 'paper' : 'teal');
    H.line(R, [H.p(i, 7.9, 1.16), H.p(i + .28, 7.9, 1.16)], 'coral', .7);
  }
  passport(H, R, 10.39, 7.66, .93, 'coral', true);
  bottle(H, R, ...H.p(10.54, 7.12, .92), 'teal', .36);

  table(H, R, 8.8, 10.06, 2.3, 1.15, .56, 'teal');
  for (let k = 0; k < 4; k++) {
    const [x, y] = H.p(9.02 + k * .52, 10.64, .69);
    oval(H, R, x, y, 7.5, 3.4, 'paper', 1);
    if (k % 2) bottle(H, R, x, y, 'sun', .26);
    else shape(H, R, starPts(x, y - 8, 6, 2.5, 5), k ? 'coral' : 'sun', .8, .6);
  }

  table(H, R, 2.78, 10.3, 4.8, .94, .35, 'teal');
  for (let k = 0; k < 19; k++) H.line(R, [H.p(2.85 + k * .24, 10.37, .51), H.p(2.85 + k * .24, 11.16, .51)], 'blue', .8);

  box(H, R, .6, 10.34, 1.35, 1.05, 0, .23, 'coral');
  luggage(H, R, .72, 10.4, .24, 'sun', .87);
  luggage(H, R, .92, 10.42, .73, 'teal', .72);
  H.line(R, [H.p(.6, 10.35, .25), H.p(.6, 10.35, 1.3), H.p(1.9, 10.35, 1.3)], 'blue', 2);
  for (const i of [.8, 1.7]) H.dot(...H.p(i, 11.18, .03), 3, 'blue');
}, (H, R, t) => {
  for (const [i, phase] of [[3.88, 0], [6.86, 2.4]]) H.at(i, 3.15, 0, HH => {
    actor(HH, R, i, 2.62, t + phase, 'write', { shirt: ['coral', .75], pants: ['blue', .8], glasses: true }, .8, .84);
    box(HH, R, i - 1.18, 2.9, 2.7, 1.35, 0, .99, 'teal', .5);
    box(HH, R, i - 1.23, 2.85, 2.8, 1.45, .99, .12, 'paper', 1);
    terminal(HH, R, i + .56, 3, 1.12, phase ? 'VISA' : 'ENTRY');
    passport(HH, R, i - .28, 3.62, 1.13, 'teal', true);
    for (let k = 0; k < 3; k++) passport(HH, R, i - .96 + k * .03, 3.14 - k * .03, 1.13 + k * .025, 'coral');
    box(HH, R, i - .74, 3.67, .38, .31, 1.12, .06, 'blue');
    const lift = .08 + .18 * Math.max(0, Math.sin((t + phase) * 2));
    box(HH, R, i - .05, 3.81, .29, .24, 1.15 + lift, .08, 'coral');
    box(HH, R, i + .03, 3.87, .11, .1, 1.23 + lift, .21, 'blue');
    const a = HH.p(i + .02, 3.17, 1.6), b = HH.p(i + .1, 3.9, 1.45 + lift);
    stroke(HH, R, [a, [(a[0] + b[0]) / 2 - 6, (a[1] + b[1]) / 2], b], 'coral', 4);
  });
  for (const [i, j, ink, phase] of [[4.08, 4.95, 'sun', 0], [5.63, 6.15, 'paper', 1.4], [6.03, 8.15, 'teal', 2.8]]) H.at(i, j, 0, HH => {
    helmeted(HH, R, i, j, t + phase, ink, phase ? 'idle' : 'wave', .86, .025 + Math.sin(t + phase) * .025);
    luggage(HH, R, i + .45, j + .18, .04, phase ? 'coral' : 'teal', .57);
    passport(HH, R, i - .23, j -.03, .96, 'coral');
  });
  H.at(6.84, 9.14, 0, HH => {
    actor(HH, R, 6.84, 9.14, t, 'wave', { shirt: ['sun', .85], pants: ['teal', .8] }, 0, .87, 'child');
    const [x, y] = HH.p(6.92, 9.06, 1.25 + Math.sin(t * .9) * .07);
    stroke(HH, R, [HH.p(6.84, 9.1, .45), [x - 4, y + 16], [x, y]], 'blue', .6);
    oval(HH, R, x, y - 8, 9, 11, 'sun', .7);
    oval(HH, R, x - 2, y - 11, 2, 2.3, 'paper');
    oval(HH, R, x + 4, y - 5, 2.4, 2, 'coral', .3);
  });
  H.at(2.45, 4.73, 0, HH => helmeted(HH, R, 2.45, 4.73, t + 1, 'coral', 'idle', .75));
  H.at(9.21, 3.5, 0, HH => {
    actor(HH, R, 9.21, 3.5, t, 'write', { shirt: ['paper', 1], pants: ['teal', .75], glasses: true }, 0, .8);
    const [x, y] = HH.p(9.37, 3.93, 1.25);
    stroke(HH, R, [[x - 8, y - 7], [x + 5, y + Math.sin(t * 2) * 3]], 'blue', 1.1);
    HH.dot(x + 6, y + Math.sin(t * 2) * 3, 2, 'coral');
  });
  for (let k = 0; k < 2; k++) {
    const j = 5.25 + cycle(t + k * 5, 10) * 3.6;
    if (j > 7.62) H.at(1.6, j + .3, .7, HH => luggage(HH, R, 1.54, j, .68, k ? 'coral' : 'teal', .79));
  }
  H.at(2.02, 7.63, 1, HH => {
    const a = .25 + .65 * Math.abs(Math.sin(t * 1.4));
    HH.line(R, [HH.p(1.28 + a, 7.635, .76), HH.p(1.28 + a, 7.635, 1.5)], 'sun', 1.5);
    const [x, y] = HH.p(1.92, 7.64, 1.14);
    HH.outline(R, ell(x, y, 10, 4.5), 'paper', .8);
    HH.line(R, [[x - 6, y - 6], [x + 6, y + 6]], 'paper', 1);
  });
  H.at(3.39, 8.17, 0, HH => {
    creature(HH, R, ...HH.p(3.39, 8.17), 'robot', t * .42, .58, 'teal');
  });
  H.at(8.03, 7.34, 0, HH => helmeted(HH, R, 8.03, 7.34, t + 3, 'paper', 'wave', .88));
  H.at(10.86, 9.27, 0, HH => {
    creature(HH, R, ...HH.p(10.86, 9.27), 'robot', t * .35 + 3, .68, 'coral');
    const [x, y] = HH.p(10.62, 8.78, 1.4);
    stroke(HH, R, [HH.p(10.7, 9.2, .7), [x, y]], 'blue', 1.6);
    HH.outline(R, ell(x, y - 9, 12, 15), 'teal', 1.3);
    for (let k = 0; k < 4; k++) HH.line(R, [[x - 9 + k * 6, y - 20], [x - 9 + k * 6, y + 2]], 'teal', .4);
  });
  H.at(9.5, 7.62, 2, HH => {
    const [x, y] = HH.p(9.86, 7.92, 2.96 + Math.sin(t * .85) * .16);
    creature(HH, R, x, y, 'jelly', t, .49, 'teal');
    for (let k = 0; k < 3; k++) {
      const [sx, sy] = HH.p(9.1 + k * .46, 7.73 + Math.sin(t + k) * .11, 2.12 + k * .27 + Math.sin(t * .7 + k) * .16);
      shape(HH, R, starPts(sx, sy, 5.4 + k, 2.3, 5), k % 2 ? 'coral' : 'sun', .85, .6);
    }
  });
  for (let k = 0; k < 3; k++) {
    const i = 2.95 + cycle(t + k * 4, 12) * 3.7;
    H.at(i + .2, 10.9, .5, HH => luggage(HH, R, i, 10.49, .53, ['coral', 'sun', 'teal'][k], .64));
  }
});

export default function enrich(room) {
  return { ...room, under: detailed.under, live: detailed.live };
}
