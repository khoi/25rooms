import { box, shape, oval, stroke } from '../worlds/common.js';

export function shelfUnit(H, R, i, j, w, d, z, heights, ink = 'teal') {
  const top = Math.max(...heights) + 0.12;
  for (const x of [i, i + w - 0.1]) for (const y of [j, j + d - 0.1]) box(H, R, x, y, 0.1, 0.1, z, top, ink, 0.65);
  for (const h of heights) {
    box(H, R, i - 0.04, j - 0.03, w + 0.08, d + 0.06, z + h, 0.09, ink, 0.48);
    H.line(R, [H.p(i + 0.12, j + d + 0.04, z + h + 0.07), H.p(i + w - 0.12, j + d + 0.04, z + h + 0.07)], 'paper', 0.7);
  }
  H.line(R, [H.p(i + 0.08, j + 0.04, z + 0.15), H.p(i + w - 0.08, j + 0.04, z + top)], 'blue', 1.1);
}

export function drawerUnit(H, R, i, j, w, d, h, rows = 3, ink = 'teal', z = 0.05) {
  box(H, R, i, j, w, d, z, h, ink, 0.52);
  box(H, R, i - 0.05, j - 0.04, w + 0.1, d + 0.08, z + h, 0.1, 'sun', 0.45);
  for (let row = 0; row < rows; row++) {
    const a = z + 0.08 + (row * (h - 0.12)) / rows,
      b = a + (h - 0.12) / rows - 0.045;
    shape(H, R, H.faceI(i + 0.08, j + d + 0.02, w - 0.16, a, b), ink, 0.36, 0.6);
    H.line(R, [H.p(i + w * 0.38, j + d + 0.04, (a + b) / 2), H.p(i + w * 0.62, j + d + 0.04, (a + b) / 2)], 'blue', 1.6);
    for (const x of [i + 0.14, i + w - 0.14]) H.dot(...H.p(x, j + d + 0.045, a + 0.06), 0.8, 'sun');
  }
}

export function shallowTray(H, R, i, j, w, d, z, ink = 'teal') {
  box(H, R, i, j, w, d, z, 0.07, ink, 0.55);
  for (const x of [i, i + w - 0.055]) box(H, R, x, j, 0.055, d, z + 0.07, 0.12, ink, 0.58);
  for (const y of [j, j + d - 0.055]) box(H, R, i, y, w, 0.055, z + 0.07, 0.12, ink, 0.58);
}

export function liddedTin(H, R, i, j, z, radius = 9, height = 20, ink = 'teal', open = false) {
  const [x, y] = H.p(i, j, z);
  shape(
    H,
    R,
    [
      [x - radius, y - height],
      [x + radius, y - height],
      [x + radius, y],
      [x - radius, y]
    ],
    ink,
    0.52,
    0.6
  );
  oval(H, R, x, y, radius, radius * 0.36, ink, 0.55);
  oval(H, R, x, y - height, radius, radius * 0.36, open ? 'blue' : 'paper', open ? 0.6 : 0.92);
  if (open) oval(H, R, x + radius * 1.65, y - 2, radius, radius * 0.36, 'paper', 0.96);
  else
    H.line(
      R,
      [
        [x - radius * 0.4, y - height - 2],
        [x + radius * 0.4, y - height - 2]
      ],
      'blue',
      1.3
    );
  H.line(
    R,
    [
      [x - radius + 3, y - height + 4],
      [x - radius + 3, y - 3]
    ],
    'paper',
    0.8
  );
}

export function foldedCloth(H, R, i, j, w, d, z, ink = 'paper', stripe = 'teal') {
  box(H, R, i, j, w, d, z, 0.1, ink, ink === 'paper' ? 1 : 0.52);
  for (let n = 1; n < 5; n++)
    H.line(R, [H.p(i + (w * n) / 6, j + 0.03, z + 0.12), H.p(i + (w * n) / 6, j + d - 0.03, z + 0.12)], stripe, 0.9, { tone: 0.6 });
  H.line(R, [H.p(i + 0.04, j + d + 0.02, z + 0.04), H.p(i + w - 0.04, j + d + 0.02, z + 0.04)], stripe, 0.7);
}

export function coiledLine(H, R, i, j, z, size = 16, ink = 'sun') {
  const [x, y] = H.p(i, j, z);
  for (let n = 0; n < 4; n++)
    H.outline(
      R,
      Array.from({ length: 32 }, (_, q) => [
        x + Math.cos((q * Math.PI) / 16) * (size - n * 2),
        y + Math.sin((q * Math.PI) / 16) * (size * 0.42 - n * 0.7)
      ]),
      ink,
      1.4,
      { tone: 0.7 }
    );
  stroke(
    H,
    R,
    [
      [x + size, y],
      [x + size + 8, y + 4],
      [x + size + 10, y + 10]
    ],
    ink,
    1.3
  );
}

export function boundBook(H, R, i, j, w, d, z, ink = 'coral') {
  box(H, R, i, j, w, d, z, 0.16, ink, 0.63);
  H.line(R, [H.p(i + 0.07, j + d + 0.02, z + 0.08), H.p(i + w - 0.04, j + d + 0.02, z + 0.08)], 'paper', 1.5);
  H.line(R, [H.p(i + 0.12, j + 0.05, z + 0.18), H.p(i + 0.12, j + d - 0.05, z + 0.18)], 'blue', 0.7);
  shape(H, R, H.tile(i + w * 0.62, j + d * 0.65, 0.12, d * 0.5, z + 0.19), 'sun', 0.7, 0.3);
}

export function satchel(H, R, i, j, z, ink = 'coral', size = 1) {
  const [x, y] = H.p(i, j, z),
    p = (a, b) => [x + a * size, y + b * size];
  shape(H, R, [p(-14, 0), p(14, 0), p(13, -26), p(-11, -27)], ink, 0.62, 0.8);
  stroke(H, R, [p(-9, -25), p(-7, -38), p(8, -38), p(11, -25)], 'blue', 1.5);
  shape(H, R, [p(-9, -4), p(9, -4), p(9, -15), p(-9, -15)], 'paper', 0.7, 0.5);
  H.line(R, [p(-9, -16), p(9, -16)], 'blue', 1);
  H.dot(...p(2, -19), 1.5, 'sun');
}

export function handTool(H, R, i, j, z, kind = 'brush', ink = 'coral', angle = -0.5) {
  const [x, y] = H.p(i, j, z),
    p = (a, b) => [x + a * Math.cos(angle) - b * Math.sin(angle), y + a * Math.sin(angle) + b * Math.cos(angle)];
  H.line(R, [p(-13, 0), p(4, 0)], ink, 3.4);
  H.line(R, [p(-11, -1), p(-2, -1)], 'paper', 0.7);
  if (kind === 'brush') {
    shape(H, R, [p(3, -5), p(14, -5), p(15, 5), p(3, 5)], 'sun', 0.5, 0.6);
    for (let n = -3; n < 5; n += 2) H.line(R, [p(7, n), p(15, n)], 'blue', 0.55);
  } else if (kind === 'spanner') {
    H.line(R, [p(3, 0), p(12, 0)], 'blue', 3);
    stroke(H, R, [p(17, -5), p(10, -5), p(8, 0), p(11, 5), p(17, 5)], 'blue', 2);
  } else if (kind === 'hammer') H.line(R, [p(6, -8), p(6, 8)], 'blue', 5);
  else if (kind === 'trowel') shape(H, R, [p(3, -5), p(16, 0), p(3, 5)], 'paper', 1, 0.7);
  else if (kind === 'scissors') {
    for (const a of [-4, 4]) oval(H, R, ...p(-8, a), 4, 3, ink, 0.55);
    H.line(R, [p(-3, -3), p(15, 4)], 'blue', 1.4);
    H.line(R, [p(-3, 3), p(15, -4)], 'blue', 1.4);
  }
}

export function framedPanel(H, R, i, j, w, z, h, ink = 'teal') {
  box(H, R, i, j, w, 0.07, z, h, 'blue', 0.65);
  shape(H, R, H.faceI(i + 0.09, j + 0.09, w - 0.18, z + 0.09, z + h - 0.09), 'paper', 0.95, 0.5);
  shape(H, R, H.faceI(i + 0.2, j + 0.11, w * 0.28, z + 0.2, z + h * 0.65), ink, 0.4, 0.4);
  H.line(R, [H.p(i + w * 0.5, j + 0.12, z + h * 0.68), H.p(i + w * 0.83, j + 0.12, z + h * 0.3)], 'coral', 2);
}

export function servicePipe(H, R, points, ink = 'teal', width = 3) {
  const p = points.map((point) => H.p(...point));
  H.line(R, p, 'blue', width + 1.2);
  H.line(R, p, ink, width);
  for (const [x, y] of p.slice(1, -1)) {
    H.line(
      R,
      [
        [x - 4, y - 1],
        [x + 4, y + 1]
      ],
      'blue',
      1.5
    );
    H.dot(x, y, 1.1, 'paper');
  }
}

export function slattedCrate(H, R, i, j, w, d, z, h, ink = 'sun') {
  box(H, R, i, j, w, d, z, 0.08, ink, 0.46);
  for (const x of [i, i + w - 0.1]) for (const y of [j, j + d - 0.1]) box(H, R, x, y, 0.1, 0.1, z, h, ink, 0.56);
  for (let row = 0; row < 3; row++) {
    const a = z + 0.09 + (row * (h - 0.15)) / 3;
    for (const y of [j, j + d - 0.06]) box(H, R, i, y, w, 0.06, a, (h - 0.15) / 4, ink, 0.43);
    for (const x of [i, i + w - 0.06]) box(H, R, x, j, 0.06, d, a, (h - 0.15) / 4, ink, 0.43);
  }
}
