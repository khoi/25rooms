import { box, shape, oval, stroke, wallPt, wallRect } from '../worlds/common.js';

export function wallCourse(H, R, side, start, end, height, ink = 'teal') {
  shape(H, R, wallRect(H, side, start, end, 0.04, height, -0.08), ink, 0.32, 0.7);
  for (let p = start + 0.16; p < end; p += 0.78) {
    shape(H, R, wallRect(H, side, p, Math.min(p + 0.58, end - 0.06), 0.18, height - 0.12, -0.1), ink, 0.18, 0.65);
  }
  H.line(R, [wallPt(H, side, start, height, -0.16), wallPt(H, side, end, height, -0.16)], 'blue', 3);
  H.line(R, [wallPt(H, side, start, height + 0.035, -0.16), wallPt(H, side, end, height + 0.035, -0.16)], 'paper', 1);
  H.line(R, [wallPt(H, side, start, 0.06, -0.16), wallPt(H, side, end, 0.06, -0.16)], 'blue', 2.3);
}

export function cornice(H, R, side, start, end, z, ink = 'paper') {
  for (const [height, width, color] of [
    [z, 5, 'blue'],
    [z + 0.04, 3.4, ink],
    [z + 0.12, 1.4, 'blue']
  ]) {
    H.line(R, [wallPt(H, side, start, height, -0.12), wallPt(H, side, end, height, -0.12)], color, width);
  }
  for (let p = start + 0.35; p < end; p += 0.8) H.line(R, [wallPt(H, side, p, z, -0.12), wallPt(H, side, p, z - 0.13, -0.12)], ink, 2);
}

export function recessedFrame(H, R, side, pos, width, z, height, ink = 'teal', contents) {
  const outer = wallRect(H, side, pos, pos + width, z, z + height, -0.14);
  shape(H, R, outer, ink, 0.64, 1.3);
  const inside = wallRect(H, side, pos + 0.13, pos + width - 0.13, z + 0.13, z + height - 0.13, -0.16);
  shape(H, R, inside, 'blue', 0.62, 0.8);
  const P = (u, v, depth = 0.17) => wallPt(H, side, pos + u, z + v, -depth);
  H.clip(inside, () => contents?.(P));
  for (const edge of [
    [P(0.06, 0.08), P(width - 0.07, 0.08)],
    [P(0.06, 0.08), P(0.06, height - 0.08)]
  ])
    H.line(R, edge, 'paper', 1.1);
  for (const u of [0.065, width - 0.065]) for (const v of [0.09, height - 0.09]) H.dot(...P(u, v), 0.9, 'sun');
  if (side === 'nw') box(H, R, 0.07, pos - 0.06, 0.47, width + 0.12, z - 0.045, 0.09, ink, 0.54);
  else box(H, R, pos - 0.06, 0.07, width + 0.12, 0.47, z - 0.045, 0.09, ink, 0.54);
  return P;
}

export function windowBay(H, R, side, pos, width, z, height, { ink = 'teal', night = false, divisions = 3, view } = {}) {
  const P = recessedFrame(H, R, side, pos, width, z, height, ink, (Q) => {
    shape(
      H,
      R,
      [Q(0.13, 0.13), Q(width - 0.13, 0.13), Q(width - 0.13, height - 0.13), Q(0.13, height - 0.13)],
      night ? 'blue' : 'paper',
      night ? 0.85 : 1,
      0.5
    );
    view?.(Q);
    for (let n = 0; n < divisions; n++) {
      const u = 0.14 + (n * (width - 0.28)) / divisions;
      H.line(R, [Q(u + 0.1, 0.3), Q(u + 0.36, height - 0.28)], 'paper', 2.1, { tone: 0.7 });
    }
  });
  for (let n = 1; n < divisions; n++) {
    const u = (width * n) / divisions;
    H.line(R, [P(u, 0.1, 0.21), P(u, height - 0.1, 0.21)], 'blue', 3.8);
    H.line(R, [P(u + 0.026, 0.1, 0.22), P(u + 0.026, height - 0.1, 0.22)], 'paper', 1.2);
    H.line(R, [P(u - 0.08, height * 0.43, 0.25), P(u + 0.08, height * 0.43, 0.25)], 'sun', 2.1);
  }
  H.line(R, [P(0.08, height * 0.51, 0.22), P(width - 0.08, height * 0.51, 0.22)], ink, 3);
  H.line(R, [P(0.08, height * 0.51 + 0.035, 0.22), P(width - 0.08, height * 0.51 + 0.035, 0.22)], 'paper', 0.8);
  return P;
}

export function cityView(H, R, P, width, height, night = false) {
  for (let n = 0; n < 7; n++) {
    const u = 0.15 + (n * (width - 0.3)) / 7,
      w = (width - 0.3) / 7 - 0.04,
      h = height * (0.25 + ((n * 7) % 5) * 0.105);
    shape(H, R, [P(u, 0.12), P(u + w, 0.12), P(u + w, h), P(u, h)], n % 3 === 1 ? 'coral' : 'teal', night ? 0.45 : 0.24, 0.45);
    for (let v = 0.27; v < h - 0.1; v += 0.27)
      for (const f of [0.27, 0.7]) {
        H.line(R, [P(u + w * f, v), P(u + w * f, v + 0.11)], night ? 'sun' : 'paper', 1.7);
      }
    H.line(R, [P(u - 0.03, h + 0.03), P(u + w + 0.04, h + 0.03)], 'blue', 0.7);
  }
}

export function panelFront(H, R, i, j, width, z, height, count = 3, ink = 'teal') {
  for (let n = 0; n < count; n++) {
    const x = i + (n * width) / count,
      w = width / count;
    shape(H, R, H.faceI(x + 0.04, j, w - 0.08, z + 0.05, z + height - 0.05), ink, 0.4, 0.8);
    shape(H, R, H.faceI(x + 0.12, j + 0.015, w - 0.24, z + 0.15, z + height - 0.16), ink, 0.2, 0.65);
    H.line(R, [H.p(x + w - 0.19, j + 0.03, z + height * 0.55), H.p(x + w - 0.19, j + 0.03, z + height * 0.74)], 'blue', 2.1);
    for (const h of [z + 0.2, z + height - 0.2]) H.line(R, [H.p(x + 0.07, j + 0.02, h), H.p(x + 0.13, j + 0.02, h)], 'sun', 2.4);
  }
}

export function wallRack(H, R, side, pos, width, z, height, rows, ink = 'teal', contents) {
  const P = recessedFrame(H, R, side, pos, width, z, height, ink, (Q) => {
    shape(H, R, [Q(0.12, 0.12), Q(width - 0.12, 0.12), Q(width - 0.12, height - 0.12), Q(0.12, height - 0.12)], ink, 0.18, 0.4);
    for (let row = 0; row < rows; row++) {
      const base = 0.16 + (row * (height - 0.22)) / rows;
      contents?.(Q, base, row, (height - 0.22) / rows);
      H.line(R, [Q(0.1, base, 0.3), Q(width - 0.1, base, 0.3)], 'blue', 3.5);
      H.line(R, [Q(0.1, base + 0.035, 0.31), Q(width - 0.1, base + 0.035, 0.31)], 'sun', 1.2);
    }
  });
  for (const u of [0.18, width - 0.18]) H.line(R, [P(u, 0.02, 0.33), P(u, -0.18, 0.14)], 'blue', 1.8);
  return P;
}

export function hangingRail(H, R, side, pos, width, z, count, item, depth = 0.3) {
  const P = (u, v, inset = depth) => wallPt(H, side, pos + u, z + v, -inset);
  H.line(R, [P(0, 0), P(width, 0)], 'blue', 2.6);
  H.line(R, [P(0, 0.025), P(width, 0.025)], 'paper', 0.8);
  for (const u of [0, width]) {
    H.line(R, [P(u, 0), P(u, -0.15, Math.max(0.07, depth - 0.23))], 'blue', 2);
    H.dot(...P(u, -0.15, Math.max(0.07, depth - 0.23)), 1.7, 'sun');
  }
  for (let n = 0; n < count; n++) {
    const u = ((n + 0.5) * width) / count;
    stroke(H, R, [P(u, 0.04), P(u - 0.055, -0.06), P(u + 0.04, -0.14)], 'blue', 1.1);
    item(P, u, n);
  }
}

export function taskLight(H, R, i, j, z, ink = 'coral', reach = 0.75) {
  const P = (x, y, h) => H.p(i + x, j + y, z + h);
  oval(H, R, ...P(0, 0, 0.025), 8, 3.5, 'blue', 0.6);
  const points = [P(0, 0, 0), P(-0.2, 0, 0.63), P(reach, 0.05, 1.04)];
  H.line(R, points, 'blue', 3);
  H.line(
    R,
    points.map(([x, y]) => [x + 2, y]),
    'sun',
    1
  );
  for (const point of points.slice(1)) {
    H.dot(...point, 3.3, ink, 0.85, { knock: true });
    H.dot(...point, 1, 'blue');
  }
  const [x, y] = points[2];
  shape(
    H,
    R,
    [
      [x - 5, y - 4],
      [x + 5, y - 4],
      [x + 11, y + 9],
      [x - 11, y + 9]
    ],
    ink,
    0.72,
    0.8
  );
  oval(H, R, x, y + 9, 11, 3.5, 'sun', 0.9);
  H.glow(x, y + 20, 26, 21, 'sun', 0.2);
  stroke(H, R, [P(0, 0, 0), P(0.2, -0.15, 0), P(0.25, -0.1, -0.6)], 'blue', 0.7);
}

export function caster(H, R, i, j, z = 0.08) {
  const [x, y] = H.p(i, j, z);
  shape(
    H,
    R,
    [
      [x - 3, y - 7],
      [x + 3, y - 7],
      [x + 3, y + 1],
      [x - 3, y + 1]
    ],
    'paper',
    1,
    0.7
  );
  oval(H, R, x + 1, y + 1, 3.5, 4.5, 'blue', 0.8);
  H.dot(x + 1, y + 1, 1.1, 'sun');
}

export function radiator(H, R, side, pos, width, height = 0.8) {
  const P = (u, v) => wallPt(H, side, pos + u, v, -0.4);
  for (let u = 0.08; u < width; u += 0.18) {
    H.line(
      R,
      [P(u, 0.13), P(u - 0.035, 0.23), P(u - 0.035, height), P(u + 0.06, height + 0.07), P(u + 0.11, height), P(u + 0.11, 0.22), P(u + 0.04, 0.17)],
      'blue',
      3.3
    );
    H.line(R, [P(u, 0.22), P(u, height)], 'paper', 1.6);
  }
  H.line(R, [P(-0.14, 0.06), P(-0.14, 0.43), P(0.03, 0.43)], 'teal', 2.4);
  oval(H, R, ...P(-0.14, 0.48), 3.5, 2.6, 'coral', 0.8);
  for (const u of [0.16, width - 0.15]) H.line(R, [P(u, 0.16), P(u, 0.01)], 'blue', 3.1);
}

export function floorShadow(H, i, j, w, d, strength = 0.15) {
  H.tint(H.tile(i + 0.15, j + 0.1, w, d, 0.018), 'blue', strength);
}

export function specimen(H, R, x, y, size = 1, ink = 'teal', flowers = false) {
  for (let n = 0; n < 5; n++) {
    const dx = (n - 2) * 7 * size,
      top = y - (29 + ((n * 7) % 4) * 6) * size;
    stroke(
      H,
      R,
      [
        [x, y],
        [x + dx * 0.65, y - 17 * size],
        [x + dx, top]
      ],
      ink,
      1.3 * size
    );
    for (let m = 0; m < 3; m++) {
      const yy = top + (m + 1) * 7 * size,
        xx = x + dx * (1 - m * 0.16),
        direction = (m + n) % 2 ? 1 : -1;
      shape(
        H,
        R,
        [
          [xx, yy],
          [xx + direction * 10 * size, yy - 8 * size],
          [xx + direction * 8 * size, yy - 1 * size]
        ],
        ink,
        0.7,
        0.45
      );
    }
    if (flowers)
      for (let petal = 0; petal < 5; petal++) {
        const a = (petal * Math.PI * 2) / 5;
        oval(H, R, x + dx + Math.cos(a) * 4 * size, top + Math.sin(a) * 4 * size, 3 * size, 2 * size, n % 2 ? 'paper' : 'coral', 0.9);
      }
    if (flowers) H.dot(x + dx, top, 1.7 * size, 'sun', 1, { knock: true });
  }
}

