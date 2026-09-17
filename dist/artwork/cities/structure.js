import { wallPt, ell } from '../worlds/common.js';
import { surface, timber, metal, bentTube } from './materials.js';

export function masonry(H, R, side, start, length, z, height, ink = 'paper', tone = 0.75) {
  const P = (u, h, depth = 0.05) => wallPt(H, side, start + u, z + h, -depth);
  surface(H, R, [P(0, 0), P(length, 0), P(length, height), P(0, height)], ink, tone);
  surface(H, R, [P(0, height), P(length, height), P(length, height, -0.19), P(0, height, -0.19)], 'paper', 1);
  surface(H, R, [P(length, 0), P(length, height), P(length, height, -0.19), P(length, 0, -0.19)], 'teal', 0.24);
  H.clip([P(0, 0), P(length, 0), P(length, height), P(0, height)], () => {
    for (let row = 0; row < height / 0.34; row++) {
      const h = row * 0.34;
      H.line(R, [P(0, h, 0.07), P(length, h, 0.07)], ink === 'coral' ? 'paper' : 'blue', 0.5, { tone: 0.22 });
      for (let u = (row % 2) * 0.53; u < length; u += 1.06) H.line(R, [P(u, h, 0.07), P(u, h + 0.34, 0.07)], 'blue', 0.45, { tone: 0.19 });
    }
  });
  H.line(R, [P(0, 0.07, 0.13), P(length, 0.07, 0.13)], 'blue', 2);
}

export function archedBay(H, R, side, pos, width, z, height, ink = 'teal', view) {
  const P = (u, v, depth = 0.21) => wallPt(H, side, pos + u, z + v, -depth);
  const outline = (margin) => {
    const pts = [P(margin, margin), P(width - margin, margin), P(width - margin, height - width * 0.17)];
    for (let n = 0; n <= 24; n++) {
      const a = (n * Math.PI) / 24;
      pts.push(P(width / 2 + Math.cos(a) * (width / 2 - margin), height - width * 0.17 + Math.sin(a) * width * 0.17));
    }
    return pts;
  };
  surface(H, R, outline(0), 'blue', 0.8, 1.2);
  surface(H, R, outline(0.13), 'paper', 1, 0.7);
  H.clip(outline(0.17), () => {
    view?.(P);
    const count = Math.max(2, Math.round(width / 1.15));
    for (let n = 1; n < count; n++) H.line(R, [P((width * n) / count, 0.14, 0.25), P((width * n) / count, height, 0.25)], ink, 2.4);
    for (const h of [height * 0.4, height * 0.72]) H.line(R, [P(0.1, h, 0.25), P(width - 0.1, h, 0.25)], ink, 2);
    for (let n = 0; n < count; n++) H.line(R, [P(0.25 + (n * width) / count, 0.32), P(0.55 + (n * width) / count, height * 0.65)], 'paper', 1.8);
  });
  if (side === 'ne') timber(H, R, pos - 0.05, 0.08, width + 0.1, 0.49, z - 0.1, 0.13, ink);
  else timber(H, R, 0.08, pos - 0.05, 0.49, width + 0.1, z - 0.1, 0.13, ink);
  for (const u of [0.22, width - 0.22]) H.line(R, [P(u, -0.05, 0.4), P(u, -0.38, 0.12)], 'blue', 2);
  return P;
}

export function cabinetFrame(H, R, i, j, w, d, z, h, columns, ink, contents) {
  surface(H, R, H.faceI(i + 0.08, j + 0.06, w - 0.16, z + 0.12, z + h - 0.1), 'blue', 0.56);
  for (const x of [i, i + w - 0.13]) timber(H, R, x, j, 0.13, d, z, h, ink);
  timber(H, R, i, j, w, d, z, 0.13, ink);
  timber(H, R, i - 0.04, j - 0.03, w + 0.08, d + 0.06, z + h - 0.13, 0.13, ink);
  for (let n = 0; n < columns; n++) {
    const x = i + 0.14 + (n * (w - 0.28)) / columns,
      cw = (w - 0.28) / columns;
    if (n) timber(H, R, x - 0.04, j, 0.08, d, z + 0.13, h - 0.26, ink);
    contents?.(x, j + 0.13, cw - 0.08, d - 0.23, z + 0.15, h - 0.31, n);
  }
  for (const x of [i + 0.12, i + w - 0.25]) metal(H, R, x, j + d - 0.22, 0.16, 0.16, z - 0.06, 0.12, 'blue');
}

export function rackFrame(H, R, i, j, w, d, z, levels, ink, contents) {
  const h = Math.max(...levels) + 0.2;
  for (const x of [i, i + w]) for (const y of [j, j + d]) metal(H, R, x - 0.045, y - 0.045, 0.09, 0.09, z, h, ink);
  bentTube(
    H,
    R,
    [
      [i, j, z + 0.13],
      [i + w, j, z + h - 0.12]
    ],
    1.2,
    ink
  );
  for (const [row, level] of levels.entries()) {
    metal(H, R, i - 0.07, j - 0.07, w + 0.14, d + 0.14, z + level, 0.06, ink);
    contents?.(i + 0.08, j + 0.08, w - 0.16, d - 0.16, z + level + 0.075, row);
  }
}

export function basin(H, R, i, j, w, d, z, ink = 'paper') {
  metal(H, R, i, j, w, d, z, 0.18, ink);
  surface(H, R, H.tile(i + 0.11, j + 0.11, w - 0.22, d - 0.22, z + 0.185), 'blue', 0.7);
  surface(H, R, H.tile(i + 0.24, j + 0.24, w - 0.48, d - 0.48, z + 0.12), 'teal', 0.2);
  const p = H.p(i + w * 0.52, j + d * 0.55, z + 0.13);
  surface(H, R, ell(...p, 3, 1.5), 'blue', 0.85, 0.4);
  bentTube(
    H,
    R,
    [
      [i + 0.23, j + 0.15, z + 0.19],
      [i + 0.23, j + 0.15, z + 0.94],
      [i + w * 0.5, j + 0.33, z + 1.01],
      [i + w * 0.5, j + 0.48, z + 0.71]
    ],
    2.3,
    'teal'
  );
  for (const x of [i + 0.1, i + 0.43])
    bentTube(
      H,
      R,
      [
        [x, j + 0.15, z + 0.22],
        [x, j + 0.15, z + 0.43]
      ],
      1.7,
      'coral'
    );
}

export function boardFloor(H, R, i, j, w, d, z, ink = 'sun', step = 0.48) {
  for (let n = 0; n < Math.ceil(d / step); n++) {
    const y = j + n * step,
      depth = Math.min(step - 0.022, j + d - y);
    if (depth <= 0) continue;
    surface(H, R, H.tile(i, y, w, depth, z), ink, n % 4 === 0 ? 0.12 : 0.22, 0.45);
    for (let x = i + 0.7 + (n % 3) * 0.6; x < i + w; x += 2.7) {
      H.line(R, [H.p(x, y, z + 0.005), H.p(x, y + depth, z + 0.005)], 'blue', 0.45, { tone: 0.5 });
      H.dot(...H.p(x + 0.09, y + 0.1, z + 0.01), 0.7, 'blue', 0.45);
    }
    H.line(R, [H.p(i + 0.1, y + depth * 0.6, z + 0.01), H.p(i + w * 0.39, y + depth * 0.65, z + 0.01)], 'coral', 0.4, { tone: 0.38 });
  }
}
