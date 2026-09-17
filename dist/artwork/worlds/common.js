import { strHash, slab, backWalls, boxAt, ell, loop, curve, arcPts, starPts, FIGURES, shadowAt, wallRect, wallPt, windowOn, plant, tree, lamp, stars, twinkle, rug } from '../drawings.js';
export { boxAt, ell, loop, curve, arcPts, starPts, wallRect, wallPt, windowOn, plant, tree, lamp, stars, twinkle, rug };
export const TAU = Math.PI * 2;
export const inks = ['coral', 'teal', 'sun', 'blue'];
export const mix = (a, b, t) => a + (b - a) * t;
export const cycle = (t, duration = 8) => ((t % duration) + duration) % duration / duration;

export function world(id, title, config, under, live) {
  return {
    id, title, seed: strHash(id), w: 12, d: 12, head: config.head || 20,
    under(H, R) {
      slab(H, R, this, { ink: config.floor || 'paper', tone: config.tone ?? .3 });
      const floor = H.tile(0, 0, 12, 12, .01);
      H.clip(floor, () => {
        if (config.pattern === 'boards') {
          for (let j = 0; j < 12; j += .45) {
            H.line(R, [H.p(0, j), H.p(12, j)], 'blue', .6, { tone: .5, amp: .08 });
            for (let i = j % 2; i < 12; i += 2.5) H.line(R, [H.p(i, j), H.p(i, j + .45)], 'blue', .6, { tone: .35 });
          }
        } else if (config.pattern === 'tiles') {
          for (let i = 0; i < 12; i++) for (let j = 0; j < 12; j++) {
            if ((i + j) % 2) H.tint(H.tile(i, j, 1, 1, .01), config.accent || 'blue', .1);
            H.outline(R, H.tile(i, j, 1, 1, .01), 'blue', .5, { tone: .3, amp: .06 });
          }
        } else {
          H.speckle(R, floor, config.accent || 'blue', 1000, .25, .9, .25);
          for (let i = 0; i < 25; i++) {
            const x = .3 + R() * 11.3, y = .3 + R() * 11.3;
            H.line(R, [H.p(x, y), H.p(x + .1 + R() * .4, y + .07)], 'blue', .5, { tone: .25 });
          }
        }
      });
      if (config.wall !== false) backWalls(H, R, this, config.height || 3.2, { ink: config.wall || 'teal', tone: config.wallTone ?? .45, style: config.wallStyle || 'plain', noNW: config.oneWall || false });
      under(H, R);
    },
    live,
  };
}

export function shape(H, R, points, ink = 'coral', tone = .75, width = 1) {
  H.fill(points, ink, tone);
  H.outline(R, points, 'blue', width, { tone: .88, amp: .2 });
}
export function oval(H, R, x, y, rx, ry, ink = 'teal', tone = .75) {
  shape(H, R, ell(x, y, rx, ry, 28), ink, tone);
}
export function stroke(H, R, points, ink = 'blue', width = 1.1, tone = .85) {
  H.line(R, curve(points, 2), ink, width, { tone, amp: .15 });
}

export function box(H, R, i, j, w, d, z, h, color = 'coral', tone = .65) {
  return boxAt(H, R, i, j, w, d, z, h, [color, tone], { lw: .85 });
}
export function table(H, R, i, j, w = 3, d = 1.8, z = 1.1, ink = 'coral') {
  for (const x of [i + .1, i + w - .2]) for (const y of [j + .1, j + d - .2]) box(H, R, x, y, .12, .12, 0, z, 'blue', .65);
  return box(H, R, i, j, w, d, z, .12, ink);
}
export function bench(H, R, i, j, w = 3, ink = 'coral') {
  table(H, R, i, j, w, .8, .55, ink);
  box(H, R, i, j, w, .12, .55, .65, ink);
}
export function actor(H, R, i, j, t, clip = 'idle', opts = {}, z = 0, scale = 1.35, who = 'adult') {
  const [x, y] = H.p(i, j, z);
  FIGURES.draw(H, R, { who, x, y, t, phase: t / (FIGURES.clips[clip]?.dur || 3), clip, scale, face: opts.face || 'se', opts, ground: H.p(i, j, 0), z });
}
export function glow(H, i, j, z, radius = 45, ink = 'sun') {
  const [x, y] = H.p(i, j, z); H.glow(x, y, radius, radius * .6, ink, .3);
}
export function steam(H, R, x, y, t, n = 4, ink = 'paper') {
  for (let i = 0; i < n; i++) {
    const p = cycle(t + i * 1.3, 5), dx = (i - (n - 1) / 2) * 13;
    H.opacity(Math.sin(p * Math.PI) * .6, () => stroke(H, R, [[x + dx, y - p * 55], [x + dx - 7, y - p * 55 - 10], [x + dx + 5, y - p * 55 - 23], [x + dx, y - p * 55 - 35]], ink, 2));
  }
}
export function lantern(H, R, i, j, z = 2.7, ink = 'sun') {
  const [x, y] = H.p(i, j, z);
  H.line(R, [[x, y - 35], [x, y - 15]], 'blue', .7);
  oval(H, R, x, y, 12, 17, ink, .8);
  for (const dx of [-6, 0, 6]) stroke(H, R, [[x + dx * .5, y - 16], [x + dx, y], [x + dx * .5, y + 16]], 'coral', .7, .6);
  H.line(R, [[x - 6, y - 17], [x + 6, y - 17]], 'blue', 2);
  H.line(R, [[x - 6, y + 17], [x + 6, y + 17]], 'blue', 2);
}
export function bottle(H, R, x, y, ink = 'teal', scale = 1, content = true) {
  const p = [[-9, 0], [9, 0], [10, -19], [4, -25], [4, -33], [-4, -33], [-4, -25], [-10, -19]].map(([a, b]) => [x + a * scale, y + b * scale]);
  shape(H, R, p, 'paper', 1);
  H.clip(p, () => {
    if (content) H.fill([[x - 11 * scale, y - 18 * scale], [x + 11 * scale, y - 18 * scale], [x + 11 * scale, y], [x - 11 * scale, y]], ink, .5);
    H.line(R, [[x - 6 * scale, y - 23 * scale], [x - 6 * scale, y - 5 * scale]], 'paper', 2);
  });
  H.line(R, [[x - 5 * scale, y - 33 * scale], [x + 5 * scale, y - 33 * scale]], 'blue', 3);
}
export function parcels(H, R, i, j, count = 5) {
  for (let k = 0; k < count; k++) {
    const x = i + (k % 3) * .65, y = j + Math.floor(k / 3) * .65, h = .3 + R() * .4;
    box(H, R, x, y, .55, .55, 0, h, inks[k % 3], .5);
    H.line(R, [H.p(x + .27, y, h), H.p(x + .27, y + .55, h)], 'paper', 2);
    const [px, py] = H.p(x + .4, y + .56, h * .55);
  }
}
export function strings(H, R, points, t = 0) {
  const p = points.map(([i, j, z]) => H.p(i, j, z));
  stroke(H, R, p, 'blue', .9);
  for (let k = 0; k < p.length - 1; k++) for (let q = 0; q < 5; q++) {
    const u = q / 5, x = mix(p[k][0], p[k + 1][0], u), y = mix(p[k][1], p[k + 1][1], u) + 6 * Math.sin(u * Math.PI);
    H.dot(x, y + 4, 2.6, inks[(q + k) % 3], .8, { knock: true });
  }
}
export function pool(H, R, i, j, w, d, color = 'teal') {
  const border = H.tile(i, j, w, d, .1);
  shape(H, R, border, 'paper', 1);
  shape(H, R, H.tile(i + .15, j + .15, w - .3, d - .3, .11), color, .6);
  for (let x = i + .3; x < i + w; x += .45) H.line(R, [H.p(x, j, .11), H.p(x, j + .12, .11)], 'blue', .6);
}
export function ripple(H, R, i, j, t, radius = 25, color = 'paper') {
  const [x, y] = H.p(i, j, .13);
  for (let n = 0; n < 3; n++) {
    const u = cycle(t + n * 1.2, 4);
    H.opacity(1 - u, () => H.outline(R, ell(x, y, radius * u, radius * u * .4), color, 1, { tone: .7, amp: .1 }));
  }
}
export function mushroom(H, R, x, y, size = 1, ink = 'coral') {
  const stem = [[x - 4 * size, y], [x + 5 * size, y], [x + 3 * size, y - 26 * size], [x - 3 * size, y - 26 * size]];
  shape(H, R, stem, 'paper', 1);
  const cap = loop([[x - 22 * size, y - 23 * size], [x - 15 * size, y - 45 * size], [x + 2 * size, y - 50 * size], [x + 20 * size, y - 32 * size], [x + 24 * size, y - 22 * size], [x, y - 16 * size]], 2);
  shape(H, R, cap, ink, .75);
  H.clip(cap, () => { for (let k = 0; k < 9; k++) H.dot(x + (R() - .5) * 45 * size, y - (22 + R() * 25) * size, (1.5 + R() * 2) * size, 'paper', 1); });
  stroke(H, R, [[x - 18 * size, y - 23 * size], [x, y - 19 * size], [x + 18 * size, y - 23 * size]], 'blue', .7);
}

export function creature(H, R, x, y, kind, t = 0, size = 1, ink = 'teal') {
  const p = (a, b) => [x + a * size, y + b * size];
  const poly = (points, color = ink, tone = .75) => shape(H, R, points.map(([a, b]) => p(a, b)), color, tone);
  const ov = (a, b, rx, ry, color = ink, tone = .75) => oval(H, R, ...p(a, b), rx * size, ry * size, color, tone);
  const ln = (points, color = 'blue', w = 1.2) => stroke(H, R, points.map(([a, b]) => p(a, b)), color, w * size);
  const dot = (a, b, r = 1.5, color = 'blue') => H.dot(...p(a, b), r * size, color, 1);
  shadowAt(H, x + 5 * size, y + 3, 23 * size, 5 * size, .18);
  if (kind === 'dragon') {
    ln([[-13, -8], [-29, -8], [-35, -23], [-41, -16]], ink, 7);
    poly([[-10, -18], [-22, -44], [-4, -36], [5, -47], [8, -20]], 'coral', .6);
    ov(0, -14, 20, 15); ov(15, -30, 13, 12); ov(27, -25, 11, 6);
    poly([[7, -39], [8, -51], [14, -40]], 'sun'); poly([[20, -40], [26, -49], [25, -35]], 'sun');
    for (let k = 0; k < 4; k++) poly([[-17 + k * 7, -22], [-18 + k * 7, -32], [-11 + k * 7, -25]], 'sun');
    ov(-10, -2, 8, 4); ov(15, -2, 8, 4); dot(20, -32, 2); dot(34, -25, 1);
    ln([[20, -20], [29, -18], [34, -21]], 'blue', .9);
    for (let k = 0; k < 6; k++) ln([[-11 + k * 4, -14], [-9 + k * 4, -11], [-7 + k * 4, -14]], 'blue', .55);
  } else if (kind === 'camel') {
    for (const a of [-19, -8, 9, 20]) ln([[a, -14], [a + Math.sin(t * 2 + a) * 3, -1]], ink, 5);
    ov(0, -25, 26, 13); ov(-10, -35, 12, 13); ov(12, -35, 11, 12);
    ln([[20, -28], [30, -48], [31, -64]], ink, 10); ov(37, -66, 12, 6);
    poly([[25, -69], [22, -80], [32, -70]], ink); dot(39, -68); ln([[46, -64], [52, -58], [33, -46]], 'coral', 1);
    poly([[-20, -34], [20, -34], [15, -16], [-17, -16]], 'coral', .8);
    for (let a = -12; a < 15; a += 6) ln([[a, -32], [a, -19]], 'sun', 2);
  } else if (kind === 'ghost') {
    const bob = Math.sin(t * 1.7) * 5;
    poly(loop([[-20, 0], [-18, -35 + bob], [-8, -48 + bob], [10, -45 + bob], [19, -31 + bob], [23, -4], [14, -8], [8, 0], [0, -7], [-10, 1]], 2), 'paper', 1);
    ov(-5, -31 + bob, 2, 4, 'blue'); ov(7, -31 + bob, 2, 4, 'blue');
    ln([[-17, -20], [-29, -30], [-33, -22]], 'paper', 5); ln([[17, -23], [30, -12], [35, -24]], 'paper', 5);
  } else if (kind === 'bee' || kind === 'beetle') {
    for (const side of [-1, 1]) for (let n = 0; n < 3; n++) ln([[side * 8, -8 - n * 6], [side * 22, -n * 8], [side * 26, 2 - n * 7]], 'blue', 1.5);
    if (kind === 'bee') {
      for (const side of [-1, 1]) ov(side * 15, -25 - Math.sin(t * 18) * 4, 14, 6, 'paper', .8);
    }
    ov(0, -16, 15, 22, kind === 'bee' ? 'sun' : ink);
    if (kind === 'bee') for (let a = -29; a < -2; a += 9) ln([[-11, a], [0, a + 3], [11, a]], 'blue', 4);
    else ln([[0, -36], [0, 3]], 'blue', 1.2);
    ov(0, -39, 11, 9, 'blue'); dot(-4, -40, 2.3, 'paper'); dot(4, -40, 2.3, 'paper');
    for (const side of [-1, 1]) ln([[side * 6, -43], [side * 12, -54], [side * 17, -52]], 'blue', 1);
  } else if (kind === 'jelly') {
    for (let k = 0; k < 7; k++) {
      const a = (k - 3) * 5;
      ln([[a, -18], [a + Math.sin(t * 2 + k) * 7, -3], [a - 5, 10], [a + Math.sin(t + k) * 9, 24]], ink, 1.4);
    }
    poly(loop([[-25, -17], [-20, -39], [-5, -48], [13, -44], [26, -20], [16, -12], [5, -18], [-5, -11], [-14, -18]], 2), ink, .5);
    ov(0, -31, 14, 10, 'paper', .4); dot(-5, -26); dot(6, -26);
  } else if (kind === 'robot') {
    for (const side of [-1, 1]) {
      ln([[side * 9, -15], [side * 11, -3]], 'blue', 5); ov(side * 12, 0, 8, 4, 'blue');
      const a = Math.sin(t * 4 + side) * 10;
      ln([[side * 14, -36], [side * (24 + a), -26], [side * (29 + a), -42]], 'blue', 4);
      ov(side * (29 + a), -43, 8, 7, 'coral');
    }
    poly([[-15, -41], [15, -41], [13, -14], [-13, -14]], ink);
    poly([[-12, -62], [12, -62], [12, -44], [-12, -44]], 'paper');
    dot(-5, -54, 2, 'coral'); dot(5, -54, 2, 'coral'); ln([[-6, -48], [6, -48]], 'blue', 1);
    ln([[0, -63], [0, -72]], 'blue', 1); dot(0, -74, 3, 'sun');
    for (const a of [-7, 0, 7]) dot(a, -32, 2, 'sun');
  } else if (kind === 'mouse') {
    ln([[-9, -2], [-24, -1], [-30, -10], [-24, -16]], 'coral', 1.2);
    ov(0, -12, 13, 14); ov(7, -27, 11, 10); ov(-1, -35, 7, 8, 'coral'); ov(13, -36, 6, 7, 'coral');
    dot(12, -28); dot(19, -24, 2); ov(-5, 0, 7, 3, 'blue'); ov(10, 0, 6, 3, 'blue');
    for (let n = -1; n <= 1; n++) ln([[17, -23], [30, -23 + n * 4]], 'blue', .5);
  } else if (kind === 'monster') {
    ov(0, -20, 27, 25); ov(-17, 2, 11, 5); ov(19, 2, 11, 5);
    for (const side of [-1, 1]) poly([[side * 13, -40], [side * 24, -57], [side * 25, -31]], 'sun');
    ov(-8, -30, 5, 6, 'paper'); ov(10, -30, 5, 6, 'paper'); dot(-7, -30, 2); dot(9, -30, 2);
    ov(2, -13, 16, 9, 'blue');
    for (let n = 0; n < 6; n++) poly([[-11 + n * 5, -20], [-7 + n * 5, -20], [-9 + n * 5, -11]], 'paper', 1);
    for (let n = 0; n < 12; n++) dot((R() - .5) * 45, -6 - R() * 32, 1.7, 'sun');
  }
}
