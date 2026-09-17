import { stroke, ell, TAU } from '../worlds/common.js';

export function surface(H, R, points, ink, tone = 0.7, width = 0.75) {
  H.fill(points, ink, tone, { fine: true });
  H.outline(R, points, 'blue', width, { tone: 0.85, amp: 0.12 });
}

function block(H, R, i, j, w, d, z, h, ink, tone) {
  const top = H.tile(i, j, w, d, z + h),
    front = H.faceI(i, j + d, w, z, z + h),
    side = H.faceJ(i + w, j, d, z, z + h);
  surface(H, R, front, ink, tone, 0.7);
  H.tint(front, 'blue', 0.14, { fine: true });
  surface(H, R, side, ink, tone, 0.7);
  H.tint(side, 'blue', 0.28, { fine: true });
  surface(H, R, top, ink, tone, 0.65);
}

export function timber(H, R, i, j, w, d, z, h, ink = 'sun') {
  block(H, R, i, j, w, d, z, h, ink, 0.58);
  const top = H.tile(i + 0.035, j + 0.035, Math.max(0.01, w - 0.07), Math.max(0.01, d - 0.07), z + h + 0.008);
  surface(H, R, top, ink, 0.42, 0.45);
  const along = w > d;
  for (let n = 0; n < 3; n++) {
    const f = 0.2 + n * 0.29;
    const a = along ? H.p(i + 0.07, j + d * f, z + h + 0.018) : H.p(i + w * f, j + 0.07, z + h + 0.018);
    const b = along ? H.p(i + w * 0.43, j + d * f + 0.025, z + h + 0.018) : H.p(i + w * f + 0.025, j + d * 0.43, z + h + 0.018);
    const c = along ? H.p(i + w - 0.06, j + d * f, z + h + 0.018) : H.p(i + w * f, j + d - 0.06, z + h + 0.018);
    stroke(H, R, [a, b, c], 'coral', 0.45, 0.55);
  }
  H.line(R, [H.p(i, j + d, z + h), H.p(i + w, j + d, z + h)], 'paper', 1.1);
  for (const x of [i + w * 0.14, i + w * 0.86]) H.dot(...H.p(x, j + d + 0.008, z + h * 0.5), 0.85, 'blue');
}

export function metal(H, R, i, j, w, d, z, h, ink = 'teal') {
  block(H, R, i, j, w, d, z, h, ink, 0.65);
  surface(H, R, H.tile(i + 0.035, j + 0.035, Math.max(0.01, w - 0.07), Math.max(0.01, d - 0.07), z + h + 0.008), ink, 0.46, 0.5);
  H.line(R, [H.p(i, j + d, z + h), H.p(i + w, j + d, z + h)], 'paper', 1);
  H.line(R, [H.p(i + w, j, z + h), H.p(i + w, j + d, z + h)], 'sun', 0.8);
  if (h > 0.25)
    for (const x of [i + 0.09, i + w - 0.09])
      for (const a of [z + 0.1, z + h - 0.1]) H.dot(...H.p(x, j + d + 0.008, a), 1.1, 'sun', 0.9, { knock: true });
}

export function vessel(H, R, i, j, z, radius, height, ink = 'teal', open = true) {
  const [x, y] = H.p(i, j, z),
    w = radius,
    h = height;
  surface(
    H,
    R,
    [
      [x - w, y - h],
      [x + w, y - h],
      [x + w * 0.91, y],
      [x - w * 0.91, y]
    ],
    ink,
    0.68
  );
  surface(H, R, ell(x, y, w * 0.91, w * 0.3), ink, 0.65, 0.6);
  H.tint(
    [
      [x + w * 0.25, y - h],
      [x + w, y - h],
      [x + w * 0.91, y],
      [x + w * 0.18, y]
    ],
    'blue',
    0.25,
    { fine: true }
  );
  H.line(
    R,
    [
      [x - w * 0.64, y - h + 4],
      [x - w * 0.58, y - 4]
    ],
    'paper',
    1.4
  );
  surface(H, R, ell(x, y - h, w, w * 0.34), 'paper', 1, 0.7);
  surface(H, R, ell(x, y - h, w * 0.79, w * 0.24), open ? 'blue' : ink, open ? 0.78 : 0.5, 0.5);
  H.line(
    R,
    [
      [x - w * 0.8, y - h + 3],
      [x - w * 0.9, y - h + 7],
      [x + w * 0.9, y - h + 7],
      [x + w * 0.8, y - h + 3]
    ],
    'blue',
    0.65
  );
  for (const a of [-1, 1])
    stroke(
      H,
      R,
      [
        [x + a * w * 0.89, y - h + 8],
        [x + a * w * 1.2, y - h + 10],
        [x + a * w * 1.22, y - h + 19],
        [x + a * w * 0.87, y - h + 20]
      ],
      'blue',
      1.1
    );
}

export function bentTube(H, R, points, width = 3, ink = 'teal') {
  stroke(
    H,
    R,
    points.map((p) => H.p(...p)),
    'blue',
    width + 1.2
  );
  stroke(
    H,
    R,
    points.map((p) => H.p(...p)),
    ink,
    width
  );
  stroke(
    H,
    R,
    points.map((p) => {
      const [x, y] = H.p(...p);
      return [x - 1, y - 1];
    }),
    'paper',
    Math.max(0.55, width * 0.22),
    0.75
  );
}

export function spokedWheel(H, R, x, y, r, ink = 'sun', turn = 0, ratio = 0.8) {
  surface(H, R, ell(x, y, r, r * ratio), 'blue', 0.7, 1);
  surface(H, R, ell(x, y, r - 3, (r - 3) * ratio), ink, 0.45, 0.6);
  for (let n = 0; n < 10; n++) {
    const a = (n * TAU) / 10 + turn;
    H.line(
      R,
      [
        [x, y],
        [x + Math.cos(a) * (r - 4), y + Math.sin(a) * (r - 4) * ratio]
      ],
      'blue',
      0.65
    );
  }
  surface(H, R, ell(x, y, 4, 3.5), 'paper', 1, 0.6);
  H.dot(x, y, 1.6, 'coral', 1, { knock: true });
}

export function drape(H, R, i, j, w, d, z, drop, ink = 'coral') {
  surface(H, R, H.tile(i, j, w, d, z), ink, 0.48, 0.65);
  const front = [H.p(i, j + d, z), H.p(i + w, j + d, z)];
  for (let n = 10; n >= 0; n--) {
    const f = n / 10;
    front.push(H.p(i + w * f, j + d + 0.04 + Math.sin(f * TAU * 3) * 0.045, z - drop + Math.sin(f * TAU * 3) * 0.055));
  }
  surface(H, R, front, ink, 0.56, 0.7);
  for (let n = 0; n < 7; n++) {
    const f = (n + 0.5) / 7;
    H.line(
      R,
      [H.p(i + w * f, j + 0.03, z + 0.01), H.p(i + w * f, j + d, z + 0.01), H.p(i + w * f + 0.02, j + d + 0.07, z - drop + 0.08)],
      n % 2 ? 'paper' : 'blue',
      n % 2 ? 1 : 0.55,
      { tone: 0.7 }
    );
  }
  H.line(R, [H.p(i + 0.04, j + d + 0.065, z - drop + 0.055), H.p(i + w - 0.04, j + d + 0.065, z - drop + 0.055)], 'sun', 0.8);
}

export function benchFrame(H, R, i, j, w, d, top, ink = 'sun') {
  H.tint(H.tile(i + 0.16, j + 0.19, w + 0.2, d + 0.15, 0.018), 'blue', 0.22);
  for (const y of [j + 0.12, j + d - 0.31])
    for (const x of [i + 0.13, i + w - 0.32]) {
      timber(H, R, x, y, 0.2, 0.21, 0.04, top - 0.2, ink);
      metal(H, R, x - 0.02, y - 0.01, 0.24, 0.23, 0.07, 0.12, 'blue');
    }
  for (const y of [j + 0.19, j + d - 0.26]) {
    timber(H, R, i + 0.19, y, w - 0.38, 0.16, 0.25, 0.17, ink);
    timber(H, R, i + 0.11, y, w - 0.22, 0.15, top - 0.45, 0.25, ink);
  }
  for (const x of [i + 0.15, i + w - 0.31]) timber(H, R, x, j + 0.17, 0.15, d - 0.34, 0.34, 0.13, ink);
  for (let n = 0; n < 5; n++) timber(H, R, i + (n * w) / 5, j, w / 5 - 0.025, d, top - 0.19, 0.19, ink);
  for (const x of [i + 0.24, i + w - 0.24])
    for (const y of [j + 0.23, j + d - 0.23]) {
      H.dot(...H.p(x, y, top + 0.012), 1.4, 'blue');
      H.line(R, [H.p(x - 0.025, y, top + 0.018), H.p(x + 0.025, y, top + 0.018)], 'paper', 0.6);
    }
}

export function pendant(H, R, i, j, top, bottom, ink = 'coral', size = 1) {
  const [x, y] = H.p(i, j, bottom),
    a = H.p(i, j, top);
  H.line(R, [a, [x, y - 12 * size]], 'blue', 1.2);
  surface(
    H,
    R,
    [
      [x - 5 * size, y - 12 * size],
      [x + 5 * size, y - 12 * size],
      [x + 19 * size, y + 7 * size],
      [x - 19 * size, y + 7 * size]
    ],
    ink,
    0.76,
    0.9
  );
  surface(H, R, ell(x, y + 7 * size, 19 * size, 5 * size), 'paper', 1, 0.7);
  surface(H, R, ell(x, y + 7 * size, 14 * size, 3 * size), 'sun', 0.8, 0.5);
  H.glow(x, y + 15 * size, 37 * size, 24 * size, 'sun', 0.2);
}

export function floorLight(H, i, j, radius = 95, strength = 0.5) {
  const [x, y] = H.p(i, j, 0.02);
  H.light(x, y, radius, radius * 0.49, strength);
  H.glow(x, y, radius * 0.9, radius * 0.43, 'sun', strength * 0.55);
}

export function slattedSeat(H, R, i, j, w, z = 0.05, ink = 'sun', back = 0.74) {
  for (const x of [i + 0.23, i + w - 0.28]) {
    bentTube(
      H,
      R,
      [
        [x, j + 0.79, z],
        [x, j + 0.66, z + 0.63],
        [x, j + 0.15, z + 0.66],
        [x, j + 0.06, z + 0.1]
      ],
      3,
      'teal'
    );
    bentTube(
      H,
      R,
      [
        [x, j + 0.15, z + 0.62],
        [x, j + 0.05, z + 0.97],
        [x, j - 0.04, z + 0.68 + back]
      ],
      2.6,
      'teal'
    );
    metal(H, R, x - 0.12, j + 0.72, 0.26, 0.2, z, 0.07, 'teal');
  }
  for (let n = 0; n < 5; n++) timber(H, R, i, j + n * 0.16, w, 0.135, z + 0.62 + Math.sin((n / 4) * Math.PI) * 0.035, 0.085, ink);
  for (let n = 0; n < 4; n++) timber(H, R, i, j + 0.03 - n * 0.027, w, 0.105, z + 0.83 + (n * (back - 0.13)) / 3, 0.12, ink);
  for (const x of [i + 0.2, i + w - 0.25])
    bentTube(
      H,
      R,
      [
        [x, j + 0.7, z + 0.69],
        [x, j + 0.72, z + 0.99],
        [x, j + 0.07, z + 1.06]
      ],
      2.5,
      'teal'
    );
}

export function cushion(H, R, i, j, w, d, z, h, ink = 'paper') {
  const edge = [
    [0.09, 0],
    [0.91, 0],
    [1, 0.1],
    [1, 0.87],
    [0.9, 1],
    [0.1, 1],
    [0, 0.9],
    [0, 0.12]
  ];
  surface(
    H,
    R,
    edge.map(([a, b]) => H.p(i + a * w, j + b * d, z)),
    ink,
    0.62,
    0.7
  );
  const top = edge.map(([a, b]) => H.p(i + 0.025 + a * (w - 0.05), j + 0.025 + b * (d - 0.05), z + h));
  surface(H, R, [...edge.slice(2, 7).map(([a, b]) => H.p(i + a * w, j + b * d, z)), ...top.slice(2, 7).reverse()], ink, 0.7, 0.55);
  surface(H, R, top, ink, ink === 'paper' ? 1 : 0.45, 0.7);
  H.line(
    R,
    edge.slice(2, 7).map(([a, b]) => H.p(i + 0.02 + a * (w - 0.04), j + 0.02 + b * (d - 0.04), z + 0.04)),
    'paper',
    0.8
  );
  for (const [a, b, c, e] of [
    [0.06, 0.17, 0.2, 0.25],
    [0.08, 0.84, 0.21, 0.75],
    [0.92, 0.12, 0.79, 0.24],
    [0.94, 0.88, 0.78, 0.73]
  ])
    H.line(R, [H.p(i + a * w, j + b * d, z + h - 0.025), H.p(i + c * w, j + e * d, z + h + 0.005)], 'blue', 0.55, { tone: 0.55 });
}

export function branchSpray(H, R, x, y, size = 1, ink = 'teal', direction = 1) {
  const tip = [x + direction * 19 * size, y - 36 * size];
  stroke(H, R, [[x, y], [x + direction * 8 * size, y - 19 * size], tip], 'blue', 0.8 * size);
  for (let n = 0; n < 7; n++) {
    const f = (n + 1) / 8,
      side = n % 2 ? 1 : -1;
    const a = [x + direction * 19 * size * f, y - 36 * size * f],
      b = [a[0] + side * (10 - n * 0.6) * size, a[1] - (6 + n * 0.3) * size];
    surface(H, R, [a, [a[0] + side * 4 * size, a[1] - 7 * size], b, [a[0] + side * 7 * size, a[1] + 1 * size]], ink, 0.4 + (n % 3) * 0.14, 0.35);
    H.line(R, [a, b], 'paper', 0.45 * size);
  }
}

export function caneChair(H, R, i, j, ink = 'coral', front = false) {
  const J = (a) => j + (front ? 0.85 - a : a);
  for (const x of [i + 0.06, i + 0.81]) {
    bentTube(
      H,
      R,
      [
        [x, J(0.03), 0.02],
        [x, J(0.1), 0.62],
        [x, J(0.13), 1.21],
        [x + (x < i + 0.4 ? 0.06 : -0.06), J(0.14), 1.4]
      ],
      2.5,
      ink
    );
    bentTube(
      H,
      R,
      [
        [x, J(0.8), 0.02],
        [x, J(0.7), 0.59]
      ],
      2.5,
      ink
    );
    bentTube(
      H,
      R,
      [
        [x, J(0.08), 0.28],
        [x, J(0.77), 0.28]
      ],
      1.8,
      ink
    );
  }
  cushion(H, R, i, j, 0.92, 0.85, 0.54, 0.12, 'sun');
  const P = (a, z) => H.p(i + a, J(0.12), z),
    frame = [P(0.04, 0.88), P(0.86, 0.88), P(0.87, 1.22), P(0.74, 1.4), P(0.2, 1.4), P(0.04, 1.22)];
  surface(H, R, frame, 'sun', 0.25, 0.7);
  H.clip(frame, () => {
    for (let n = 0; n < 9; n++) {
      H.line(R, [P(-0.12 + n * 0.15, 0.85), P(0.22 + n * 0.15, 1.43)], 'coral', 0.55);
      H.line(R, [P(0.16 + n * 0.15, 0.85), P(-0.18 + n * 0.15, 1.43)], 'coral', 0.55);
    }
  });
  H.outline(R, frame, ink, 2, { tone: 0.8, amp: 0.08 });
}
