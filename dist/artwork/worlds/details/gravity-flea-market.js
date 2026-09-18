import { world, shape, oval, stroke, box, table, actor, bottle, plant, ell, loop, inks } from '../common.js';

function antique(H, R, x, y, kind, ink = 'coral', s = 1, angle = 0) {
  const p = (a, b) => [x + (a * Math.cos(angle) - b * Math.sin(angle)) * s, y + (a * Math.sin(angle) + b * Math.cos(angle)) * s];
  const poly = (a, color = ink, tone = .72) => shape(H, R, a.map(q => p(...q)), color, tone, .8);
  const line = (a, color = 'blue', width = 1) => stroke(H, R, a.map(q => p(...q)), color, width * s);
  const disk = (a, b, rx, ry, color = ink, tone = .75) => shape(H, R, ell(a, b, rx, ry, 24).map(q => p(...q)), color, tone, .7);
  const dot = (a, b, r, color = 'blue') => H.dot(...p(a, b), r * s, color, .95);
  if (kind === 'clock') {
    poly([[-13, 0], [13, 0], [12, -28], [7, -35], [-7, -35], [-12, -28]]);
    disk(0, -22, 9, 10, 'paper', 1);
    for (let k = 0; k < 12; k++) dot(Math.sin(k * Math.PI / 6) * 6.9, -22 - Math.cos(k * Math.PI / 6) * 7.7, .7);
    line([[0, -29], [0, -22], [5, -20]]);
    disk(0, -6, 3, 4, 'sun');
    line([[0, -12], [0, -8]], 'sun');
  } else if (kind === 'guitar') {
    poly(loop([[-7, 1], [-15, -5], [-12, -17], [-7, -20], [-10, -28], [-3, -34], [6, -32], [9, -25], [6, -19], [13, -12], [12, -4], [5, 1]], 2));
    poly([[-2, -24], [3, -24], [4, -52], [-1, -52]], 'coral');
    disk(0, -19, 4, 4, 'blue');
    for (const a of [-1, 1, 3]) line([[a, -8], [a, -49]], 'paper', .5);
    for (const a of [-1, 1]) for (let k = 0; k < 3; k++) dot(a < 0 ? -3 : 6, -47 + k * 3, 1, 'sun');
    line([[-4, -7], [5, -7]], 'blue', 2);
  } else if (kind === 'horn') {
    poly([[-14, 0], [14, 0], [14, -10], [-14, -10]], 'coral');
    disk(0, -11, 11, 3, 'blue'); disk(0, -11, 3, 1, 'sun');
    line([[5, -11], [10, -19], [4, -24], [-4, -23]], 'sun', 4);
    poly([[-4, -21], [-8, -34], [-29, -44], [-27, -22]], 'sun');
    disk(-28, -33, 5, 11, 'coral');
    line([[15, -5], [20, -5], [20, -9]], 'blue', 1.2);
  } else if (kind === 'tea') {
    disk(-13, -12, 7, 8, 'paper', 1); disk(-13, -12, 3.5, 5, 'blue', .25);
    poly([[8, -10], [19, -22], [22, -22], [18, -11], [9, -5]]);
    disk(0, -10, 12, 10); disk(0, -21, 8, 3, 'sun'); dot(0, -25, 2.2);
    line([[-7, -12], [0, -16], [7, -12]], 'paper', 1.6);
  } else if (kind === 'cup') {
    disk(7, -7, 4, 4, 'paper', 1); disk(7, -7, 2, 2, 'blue', .4); disk(0, 0, 9, 3, ink);
    poly([[-6, -13], [6, -13], [5, -3], [-4, -3]], 'paper', 1);
    disk(0, -13, 6, 2, 'coral', .5); line([[-3, -10], [-3, -5]], ink, 1.5);
  } else if (kind === 'chair') {
    poly([[-17, -18], [5, -13], [21, -21], [-1, -26]]);
    poly([[-17, -18], [-17, -49], [3, -44], [5, -13]]);
    for (const a of [-12, -6, 0]) line([[a, -42], [a + 1, -23]], 'paper', 1.6);
    for (const [a, b] of [[-15, -17], [4, -12], [18, -19]]) line([[a, b], [a + 1, b + 20]], 'blue', 2.4);
  } else if (kind === 'radio') {
    poly([[-18, 0], [18, 0], [18, -25], [-18, -25]]);
    poly([[-13, -5], [2, -5], [2, -20], [-13, -20]], 'paper', .9);
    for (let k = 0; k < 5; k++) line([[-11, -7 - k * 2.5], [0, -7 - k * 2.5]], 'blue', .6);
    disk(10, -7, 3, 3, 'sun'); poly([[6, -22], [15, -22], [15, -14], [6, -14]], 'blue');
    line([[-9, -26], [-9, -31], [9, -31], [9, -26]]); line([[12, -26], [19, -46]], 'blue', .8);
  } else if (kind === 'case') {
    poly([[-18, 0], [18, 0], [18, -23], [-18, -23]]);
    for (const a of [-11, 11]) line([[a, -22], [a, 0]], 'sun', 2.2);
    line([[-6, -24], [-6, -29], [6, -29], [6, -24]], 'blue', 1.6);
    poly([[-1, -16], [8, -14], [6, -5], [-3, -7]], 'paper', 1); line([[-18, -3], [18, -3]], 'blue', .7);
  } else if (kind === 'books') {
    for (let k = 0; k < 4; k++) {
      const dx = k % 2 * 3;
      poly([[-15 + dx, -k * 6], [14 + dx, -k * 6], [14 + dx, -5 - k * 6], [-15 + dx, -5 - k * 6]], inks[k % 4]);
      line([[-10 + dx, -3 - k * 6], [11 + dx, -3 - k * 6]], 'paper', 1.3);
    }
  } else if (kind === 'lamp') {
    disk(0, 0, 10, 3, 'blue'); line([[0, -2], [0, -32]], 'blue', 2.4);
    poly([[-16, -28], [16, -28], [9, -47], [-9, -47]], 'sun');
    for (const a of [-8, 0, 8]) line([[a * .55, -45], [a, -29]], 'coral', .9);
  } else if (kind === 'vase') {
    poly(loop([[-8, 0], [8, 0], [14, -14], [5, -24], [6, -30], [-6, -30], [-5, -24], [-14, -14]], 2));
    line([[-9, -12], [0, -16], [9, -12]], 'paper', 2); disk(0, -29, 6, 2, 'blue', .5);
  } else if (kind === 'fan') {
    disk(0, 0, 12, 3, ink); line([[0, -2], [0, -24]], 'blue', 2); disk(0, -29, 17, 17, 'paper', 1);
    for (let k = 0; k < 3; k++) {
      const a = k * Math.PI * 2 / 3;
      poly([[0, -29], [Math.cos(a) * 14, -29 + Math.sin(a) * 14], [Math.cos(a + .8) * 11, -29 + Math.sin(a + .8) * 11]], 'teal', .65);
    }
    disk(0, -29, 3, 3, 'sun');
    for (const r of [7, 12, 16]) line(ell(0, -29, r, r, 25).concat([[r, -29]]), 'blue', .5);
  } else if (kind === 'sewing') {
    poly([[-22, 0], [21, 0], [21, -6], [-22, -6]], 'coral');
    poly([[-17, -7], [-17, -30], [10, -30], [16, -24], [16, -7], [5, -7], [5, -21], [-9, -21], [-9, -7]], 'blue', .8);
    disk(16, -24, 7, 7, 'sun'); disk(16, -24, 3, 3, 'blue'); line([[-12, -21], [-12, -5]], 'blue', .7);
    poly([[-20, -5], [-4, -6], [0, 8], [-16, 10]], 'teal', .7); line([[0, -31], [0, -37]], 'blue');
    poly([[-4, -37], [4, -37], [4, -31], [-4, -31]], 'sun');
  } else if (kind === 'globe') {
    disk(0, -17, 15, 15, 'paper', 1); disk(0, -17, 11, 15, 'teal', .3);
    line([[-15, -17], [15, -17]], 'blue', .6); line([[0, -32], [0, -2]], 'blue', .6);
    poly([[-9, -26], [-2, -28], [4, -20], [-1, -16], [-9, -18]], 'coral');
    poly([[3, -16], [10, -19], [8, -8], [3, -6]], 'sun');
    line([[-13, -32], [17, -3], [0, 1], [0, 6]], 'blue', 1.5); disk(0, 7, 10, 3, ink);
  }
}

function tag(H, R, x, y, value) {
  stroke(H, R, [[x, y - 8], [x + 3, y - 1]], 'blue', .6);
  shape(H, R, [[x - 5, y], [x + 7, y], [x + 7, y + 8], [x - 5, y + 8]], 'paper', 1, .6);
}

function canopy(H, R, i, j, w, d, z, ink) {
  for (const x of [i, i + w]) box(H, R, x, j, .075, .075, 0, z, 'blue');
  const roof = [H.p(i, j, z), H.p(i + w, j, z), H.p(i + w, j + d, z - .28), H.p(i, j + d, z - .28)];
  shape(H, R, roof, 'paper', 1);
  H.clip(roof, () => {
    for (let k = 0; k < 8; k += 2) shape(H, R, [H.p(i + w * k / 8, j, z), H.p(i + w * (k + 1) / 8, j, z), H.p(i + w * (k + 1) / 8, j + d, z - .28), H.p(i + w * k / 8, j + d, z - .28)], ink, .7, .5);
  });
  for (let k = 0; k < 8; k++) {
    const a = H.p(i + w * k / 8, j + d, z - .28), b = H.p(i + w * (k + 1) / 8, j + d, z - .28);
    shape(H, R, [a, b, [b[0], b[1] + 8], [a[0], a[1] + 8]], k % 2 ? 'paper' : ink, .8, .6);
  }
}

function inverted(H, R, i, j, z, t, ink, angle = Math.PI, clip = 'talk') {
  const [x, y] = H.p(i, j, z);
  H.op(c => { c.save(); c.translate(x, y); c.rotate(angle); c.translate(-x, -y); });
  actor(H, R, i, j, t, clip, { shirt: [ink, .8], noShadow: true }, z, .82);
  H.op(c => c.restore());
}

export default function enrich(room) {
  const bazaar = world(room.id, room.title, { floor: 'paper', tone: 1, wall: 'blue', wallTone: .38, height: 4.8, pattern: 'tiles', head: room.head }, (H, R) => {
    for (const j of [.6, 5.5, 11.4]) {
      box(H, R, .04, j, .24, .19, .03, 4.65, 'sun', .65);
      H.line(R, [H.p(.3, j, 4), H.p(.3, j + .45, 4.57)], 'coral', 2);
    }
    box(H, R, .03, .5, .27, 11.1, 4.62, .12, 'coral', .7);
    box(H, R, .05, .03, 11.4, .27, 4.62, .12, 'sun', .7);
    for (const i of [5.5, 8.3, 11.4]) box(H, R, i, .06, .16, .35, 3.5, 1.1, 'coral', .6);
    for (const j of [1, 3, 6.5, 9.5]) for (const z of [1.12, 2.52, 3.4]) H.line(R, [H.p(.05, j, z - .4), H.p(.55, j, z), H.p(.05, j, z)], 'sun', 1.5);
    shape(H, R, H.tile(4.3, 4.6, 3.3, 4.3, .02), 'coral', .19);
    for (let k = 0; k < 8; k++) H.line(R, [H.p(4.3, 4.7 + k * .55, .025), H.p(7.6, 4.7 + k * .55, .025)], 'sun', 1.2, { tone: .7 });

    for (const [j, name] of [[2.7, 'LOST HOURS'], [8.5, 'SECOND HAND SOUND']]) {
      const [x, y] = H.p(.18, j, 4.4);
      shape(H, R, [H.p(.18, j - 1.6, 4.19), H.p(.18, j + 1.6, 4.19), H.p(.18, j + 1.6, 4.61), H.p(.18, j - 1.6, 4.61)], 'paper', 1);
    }
    for (const z of [1.25, 2.4, 3.5]) {
      box(H, R, .04, .7, .48, 4.2, z, .08, 'coral', .6);
      for (let k = 0; k < 4; k++) {
        const [x, y] = H.p(.3, 1.05 + k * 1.04, z + .08);
        antique(H, R, x, y, k % 2 ? 'clock' : 'radio', inks[(k + Math.round(z)) % 4], .55);
        tag(H, R, x + 10, y + 4, `${12 + k * 7}`);
      }
    }
    for (const z of [1.1, 2.65]) {
      box(H, R, .06, 6.1, .55, 4.9, z, .1, 'sun', .7);
      for (let k = 0; k < 5; k++) antique(H, R, ...H.p(.36, 6.45 + k, z + .1), ['guitar', 'horn', 'books', 'radio', 'guitar'][k], inks[k % 4], k === 1 ? .53 : .6);
    }
    box(H, R, 1.5, .06, 3.35, .38, 1.1, .12, 'sun', .7);
    box(H, R, 1.5, .06, 3.35, .22, 3.48, .12, 'coral', .7);
    for (const i of [1.5, 4.7]) box(H, R, i, .06, .15, .38, 1.15, 2.33, 'sun', .65);
    for (let k = 0; k < 3; k++) {
      const [x, y] = H.p(2.1 + k * 1.06, .34, 2.15);
      oval(H, R, x, y, 17, 23, 'paper');
      oval(H, R, x, y, 12, 18, 'teal', .35);
      antique(H, R, x, y + 10, ['clock', 'fan', 'globe'][k], 'coral', .48);
      H.line(R, [[x, y - 23], [x, y - 39]], 'sun', 1);
    }
    const [scaleX, scaleY] = H.p(3.2, .38, 1.24);
    H.line(R, [[scaleX, scaleY], [scaleX, scaleY - 29]], 'blue', 2);
    H.line(R, [[scaleX - 23, scaleY - 29], [scaleX + 23, scaleY - 29]], 'sun', 3);
    for (const dx of [-21, 21]) {
      H.line(R, [[scaleX + dx, scaleY - 29], [scaleX + dx - 9, scaleY - 7], [scaleX + dx + 9, scaleY - 7], [scaleX + dx, scaleY - 29]], 'blue', .7);
      oval(H, R, scaleX + dx, scaleY - 7, 10, 4, 'coral');
    }
    box(H, R, 5.7, .08, 5.6, .48, 3.65, .12, 'sun', .85);
    for (let k = 0; k < 6; k++) {
      const [x, y] = H.p(6.05 + k * .96, .35, 3.64);
      antique(H, R, x, y + 4, ['cup', 'vase', 'tea', 'lamp', 'case', 'chair'][k], inks[k % 4], .57, Math.PI);
      stroke(H, R, [[x, y], [x - 3, y + 32]], 'paper', .7);
    }

    box(H, R, 1.25, 3.65, 2.8, 1.6, 0, .18, 'blue', .15);
    table(H, R, 1.3, 3.7, 2.65, 1.45, .86, 'coral');
    box(H, R, 1.4, 3.8, 2.4, 1.2, .2, .08, 'sun', .6);
    antique(H, R, ...H.p(1.9, 4.6, .3), 'case', 'teal', .55);
    antique(H, R, ...H.p(3.1, 4.5, .3), 'books', 'coral', .6);
    box(H, R, 1.35, 3.68, 2.55, .12, .98, .7, 'teal', .65);
    for (let k = 0; k < 5; k++) {
      const [x, y] = H.p(1.62 + k * .46, 3.84, 1.47);
      H.line(R, [[x, y], [x, y + 17]], 'sun', 2);
      oval(H, R, x, y + 19, 3 + k % 2 * 2, 4, 'paper');
      H.dot(x, y - 3, 1.6, 'blue');
    }
    box(H, R, 3.62, 4.8, .33, .48, .96, .2, 'blue');
    H.line(R, [H.p(3.8, 5, 1.18), H.p(3.8, 5, 1.5)], 'sun', 2);
    H.line(R, [H.p(3.65, 5, 1.5), H.p(4, 5, 1.5)], 'blue', 2);
    for (let k = 0; k < 3; k++) antique(H, R, ...H.p(1.6 + k * .78, 4.38, 1), ['clock', 'sewing', 'radio'][k], 'teal', .62);
    for (let k = 0; k < 5; k++) {
      const [x, y] = H.p(1.5 + k * .44, 4.9, 1);
      oval(H, R, x, y, 3.3, 2.1, k % 2 ? 'sun' : 'blue', .75);
      H.line(R, [[x - 3, y - 2], [x + 4, y + 2]], 'paper', .7);
    }
    const [rx, ry] = H.p(2.6, 5.2, .7);
    box(H, R, 1.1, 5.5, .75, .7, 0, .5, 'sun');
    for (let k = 0; k < 4; k++) {
      const [x, y] = H.p(1.3 + k * .11, 5.7, .52);
      stroke(H, R, [[x, y], [x - 4 + k * 2, y - 17]], 'blue', 1.5);
    }
    canopy(H, R, 7.75, .9, 3.4, 1.2, 2.8, 'teal');
    table(H, R, 7.7, 1.9, 3.4, 1.6, .85, 'teal');
    for (let k = 0; k < 5; k++) bottle(H, R, ...H.p(8.02 + k * .6, 2.12, .99), inks[k % 3], .44);
    for (let k = 0; k < 4; k++) antique(H, R, ...H.p(8.1 + k * .67, 3.05, .99), k === 3 ? 'tea' : 'cup', inks[k % 3], .7);

    box(H, R, 10.5, 3.75, .8, .85, 0, .55, 'coral');
    antique(H, R, ...H.p(10.85, 4.2, .56), 'books', 'sun', .7);
    plant(H, R, ...H.p(11.1, 1.15, .1), .8);
    table(H, R, 4.35, 5.3, 2.6, 1.4, .83, 'sun');
    antique(H, R, ...H.p(4.6, 5.7, .98), 'horn', 'coral', .77);
    antique(H, R, ...H.p(6.05, 5.65, .98), 'globe', 'teal', .78);
    antique(H, R, ...H.p(6.65, 6.25, .98), 'vase', 'coral', .65);
    for (let k = 0; k < 4; k++) oval(H, R, ...H.p(5.05 + k * .31, 6.35, .99), 3, 1.7, 'sun');
    for (const [i, j, kind] of [[4.45, 7.05, 'case'], [6.45, 7.02, 'books'], [7.28, 5.9, 'lamp']]) antique(H, R, ...H.p(i, j, .05), kind, 'coral', .85);
    const [hx, hy] = H.p(5.7, 6.73, .56);
    table(H, R, 1.35, 8.4, 2.8, 1.2, .7, 'coral');
    antique(H, R, ...H.p(1.7, 8.65, .85), 'horn', 'sun', .75);
    antique(H, R, ...H.p(2.75, 8.75, .85), 'radio', 'teal', .7);
    antique(H, R, ...H.p(3.7, 9.05, .85), 'books', 'sun', .67);
    for (let k = 0; k < 3; k++) tag(H, R, ...H.p(1.7 + k * .95, 9.6, .48), `${8 + k * 5}`);
    for (const [i, j, ink] of [[.95, 10.3, 'teal'], [2.35, 10.6, 'coral']]) {
      const [x, y] = H.p(i, j, .1);
      antique(H, R, x, y, 'guitar', ink, .91, -.15);
      stroke(H, R, [[x - 13, y + 3], [x, y - 10], [x + 14, y + 3]], 'blue', 1.7);
    }
    shape(H, R, H.tile(8.15, 7.5, 3.05, 3.35, .035), 'teal', .21);
    for (let k = 0; k < 7; k++) H.line(R, [H.p(8.17 + k * .47, 7.51, .04), H.p(8.17 + k * .47, 10.82, .04)], 'paper', 1.3);
    antique(H, R, ...H.p(10.7, 8.6, .06), 'chair', 'coral', 1.12);
    antique(H, R, ...H.p(9.85, 10.25, .06), 'lamp', 'sun', 1.1);
    box(H, R, 8.05, 10.55, 1.35, .75, .03, .3, 'sun', .6);
    box(H, R, 8.05, 10.5, 1.35, .09, .35, .68, 'teal', .65);
    for (const i of [8.2, 9.17]) {
      H.line(R, [H.p(i, 10.6, .4), H.p(i, 10.6, .93)], 'sun', 2);
      oval(H, R, ...H.p(i, 10.6, .68), 5, 6, 'paper');
    }
    for (let k = 0; k < 3; k++) {
      const [x, y] = H.p(8.25 + k * .36, 10.96, .38);
      oval(H, R, x, y, 7, 4, 'coral');
      oval(H, R, x, y - 2, 3, 2, 'blue');
    }
    antique(H, R, ...H.p(8.7, 9.85, .06), 'case', 'teal', .9);
    antique(H, R, ...H.p(10.8, 10.2, .06), 'fan', 'coral', .8);
    box(H, R, 9.2, 6.25, 1.25, .75, .05, .6, 'coral');
    box(H, R, 9.23, 6.3, 1.18, .12, .67, .7, 'coral');
    for (let k = 0; k < 2; k++) box(H, R, 9.3 + k * .55, 6.49, .5, .4, .7, .15, 'sun');
    const [fx, fy] = H.p(10, 8, .1);
    for (const [i, j] of [[7.7, 8], [8.5, 11], [10.8, 7.1]]) {
      const [x, y] = H.p(i, j, .1);
      oval(H, R, x, y, 9, 4, 'blue'); oval(H, R, x, y - 3, 7, 5, 'coral');
      for (let k = -2; k <= 2; k++) stroke(H, R, [[x - 5, y - 3 + k], [x + 5, y - 3 + k]], 'sun', .6);
    }

    for (const [i, j, kind] of [[5.8, .5, 'books'], [10.75, 5.3, 'case'], [3.3, 7.7, 'vase']]) antique(H, R, ...H.p(i, j, .1), kind, 'sun', .58);
  }, (H, R, t) => {
    actor(H, R, 2.05, 3.45, t, 'kneel', { shirt: ['teal', .8], glasses: true }, .62, .85);
    const [wx, wy] = H.p(2.35, 4.25, 1.23), tap = Math.sin(t * 5) * 4;
    stroke(H, R, [[wx - 7, wy - 3], [wx + 8, wy - 10 - tap]], 'blue', 1.8);
    shape(H, R, [[wx + 4, wy - 17 - tap], [wx + 14, wy - 13 - tap], [wx + 12, wy - 7 - tap], [wx + 3, wy - 11 - tap]], 'sun');
    actor(H, R, 4.25, 6.9, t, 'talk', { shirt: ['coral', .9], face: 'se' }, 0, .86);
    actor(H, R, 7.1, 5.35, t + 1, 'think', { shirt: ['blue', .8], face: 'sw', glasses: true }, 0, .83);
    const [tx, ty] = H.p(9.2, 4.75, 1.67);
    actor(H, R, 8.85, 4.58, t, 'hold', { shirt: ['teal', .8] }, 0, .85);
    antique(H, R, tx, ty, 'tea', 'coral', .85, .12 + Math.sin(t * .9) * .08);
    antique(H, R, tx + 70, ty - 9, 'cup', 'teal', .9, -Math.PI / 2);
    for (let k = 0; k < 9; k++) {
      const u = ((t * .45 + k / 9) % 1);
      oval(H, R, tx + 18 + u * 44, ty - 16 + Math.sin(u * Math.PI) * 5, 2.1, 1.2, 'sun', .95);
    }
    inverted(H, R, 11.05, 3.9, 1.05, t, 'sun', Math.PI / 2, 'drink');
    actor(H, R, 3.6, 10.2, t, 'hold', { shirt: ['sun', .9] }, 0, .9);
    const [gx, gy] = H.p(3.6, 10.2, .77);
    antique(H, R, gx + 4, gy + 5, 'guitar', 'coral', .72, -.6);
    for (let k = 0; k < 3; k++) {
      const u = (t * .33 + k / 3) % 1, nx = gx + 27 + u * 28, ny = gy - 26 - u * 30;
      H.opacity(1 - u, () => { oval(H, R, nx, ny, 3, 2, 'blue'); stroke(H, R, [[nx + 2, ny], [nx + 2, ny - 11], [nx + 7, ny - 8]], 'blue', 1.2); });
    }
    const drift = Math.sin(t * .7) * .16, chair = H.p(7.3 + drift, 9.6, 1.25 + Math.sin(t) * .16);
    stroke(H, R, [H.p(8.5, 11, .16), [chair[0] - 12, chair[1] + 18], chair], 'blue', .7);
    antique(H, R, ...chair, 'chair', 'sun', .9, -.25 + Math.sin(t * .7) * .12);
    tag(H, R, chair[0] + 19, chair[1] + 8, '35');
    actor(H, R, 7.75, 9.95, t, 'reach', { shirt: ['teal', .8] }, 0, .8);
    for (const [k, i, j, z, kind] of [[0, 5.15, 3.8, 2.7, 'clock'], [1, 6.25, 8, 2.9, 'case'], [2, 8.3, 6.5, 3.15, 'globe']]) {
      const lift = z + Math.sin(t * .85 + k) * .19, [x, y] = H.p(i, j, lift);
      stroke(H, R, [H.p(i + .4, j + .4, .08), [x + 20, y + 37], [x, y]], 'blue', .65, .6);
      antique(H, R, x, y, kind, inks[k], .72, Math.sin(t * .43 + k) * .18);
      tag(H, R, x + 17, y + 3, `${17 + k * 6}`);
    }
    inverted(H, R, 6.05, 1.1, 4.47, t, 'coral', Math.PI, 'reach');
    inverted(H, R, 9.7, 6.85, 4.23, t + 2, 'teal', Math.PI + Math.sin(t * .5) * .07, 'walk');
    const [ux, uy] = H.p(9.7, 6.85, 4.23);
    stroke(H, R, [H.p(10.8, 7.1, .2), [ux + 25, uy + 78], [ux, uy + 18]], 'blue', .7);
    const chase = Math.sin(t * .8), ci = 5.65 + chase * .62;
    actor(H, R, ci, 10.85, t, 'run', { shirt: ['coral', .85], face: chase > 0 ? 'se' : 'nw' }, .03, .95, 'child');
    for (let k = 0; k < 5; k++) {
      const [x, y] = H.p(ci + .8 + k * .22, 10.55 - k * .2, .28 + k * .19 + Math.sin(t * 2 + k) * .07);
      oval(H, R, x, y, 2 + Math.abs(Math.sin(t * 2 + k)) * 2, 4, 'sun'); H.line(R, [[x, y - 2], [x, y + 2]], 'coral', .6);
    }
    actor(H, R, 9.82, 6.87, t, 'sit', { shirt: ['coral', .8], face: 'sw' }, .83, .82);
  });
  return { ...room, under: bazaar.under, live: bazaar.live };
}
