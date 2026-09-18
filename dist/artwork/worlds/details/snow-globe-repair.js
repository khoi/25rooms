import { world, box, table, bench, shape, oval, stroke, ell, arcPts, actor, cycle } from '../common.js';

function village(H, R, x, y, s = 1, variant = 0) {
  oval(H, R, x, y, 16 * s, 4 * s, 'paper', 1);
  const point = (a, b) => [x + a * s, y + b * s];
  if (variant % 4 === 1) {
    H.fill(ell(x, y - 2 * s, 17 * s, 4 * s), 'teal', .6, { fine: true });
    shape(H, R, [[-7, -3], [-5, -25], [4, -25], [7, -3]].map(p => point(...p)), 'paper', 1, .65);
    for (const z of [-8, -16]) shape(H, R, [[-6, z], [5, z], [5, z - 4], [-5, z - 4]].map(p => point(...p)), 'coral', .8, .4);
    shape(H, R, [[-6, -25], [-6, -32], [5, -32], [5, -25]].map(p => point(...p)), 'sun', .85, .5);
    shape(H, R, [[-8, -32], [0, -38], [8, -32]].map(p => point(...p)), 'blue', 1, .6);
    H.line(R, [point(0, -25), point(0, -32)], 'blue', .65);
    H.line(R, [point(-12, 0), point(-8, -4), point(-4, 0)], 'paper', 1.1);
    return;
  }
  if (variant % 4 === 2) {
    H.fill(ell(x, y - 2 * s, 17 * s, 4 * s), 'teal', .5, { fine: true });
    shape(H, R, [[-15, -8], [14, -8], [9, -2], [-9, -2]].map(p => point(...p)), 'coral', .8, .6);
    H.line(R, [point(0, -7), point(0, -31)], 'blue', 1.1);
    shape(H, R, [[-2, -29], [-2, -11], [-14, -11]].map(p => point(...p)), 'paper', 1, .5);
    shape(H, R, [[2, -26], [13, -11], [2, -11]].map(p => point(...p)), 'sun', .7, .5);
    H.line(R, [point(-14, 1), point(-8, -1), point(-3, 1), point(3, -1), point(10, 1)], 'paper', 1);
    return;
  }
  if (variant % 4 === 3) {
    shape(H, R, [[-16, 0], [-9, -23], [-2, -10], [7, -32], [17, 0]].map(p => point(...p)), 'teal', .8, .6);
    shape(H, R, [[2, -20], [7, -32], [12, -18], [8, -21], [5, -19]].map(p => point(...p)), 'paper', 1, .4);
    shape(H, R, [[-13, -12], [-9, -23], [-4, -13], [-9, -16]].map(p => point(...p)), 'paper', 1, .4);
    oval(H, R, ...point(-6, -4), 4 * s, 2 * s, 'sun', .8);
    return;
  }
  for (let k = 0; k < 3; k++) {
    const tx = x + (-12 + k * 12) * s, ty = y - (k % 2) * 3 * s;
    if ((k + variant) % 3 === 0) {
      stroke(H, R, [[tx, ty], [tx, ty - 17 * s]], 'blue', .8);
      shape(H, R, [[tx - 6 * s, ty - 3 * s], [tx, ty - 20 * s], [tx + 6 * s, ty - 3 * s]], 'teal', .8);
      stroke(H, R, [[tx - 3 * s, ty - 12 * s], [tx, ty - 16 * s], [tx + 2 * s, ty - 12 * s]], 'paper', 1.2);
    } else {
      shape(H, R, [[tx - 5 * s, ty], [tx + 5 * s, ty], [tx + 5 * s, ty - 10 * s], [tx - 5 * s, ty - 10 * s]], variant % 2 ? 'sun' : 'coral', .75);
      shape(H, R, [[tx - 7 * s, ty - 10 * s], [tx, ty - 17 * s], [tx + 7 * s, ty - 10 * s]], 'blue', .75);
      H.line(R, [[tx - 6 * s, ty - 11 * s], [tx, ty - 17 * s], [tx + 6 * s, ty - 11 * s]], 'paper', 1.5 * s);
      H.dot(tx - 2 * s, ty - 6 * s, 1.3 * s, 'sun');
      H.line(R, [[tx + 2 * s, ty], [tx + 2 * s, ty - 5 * s]], 'blue', 2 * s);
    }
  }
}

function globe(H, R, i, j, z, r = 17, variant = 0, t = 0, cracked = false) {
  const [x, y] = H.p(i, j, z), cy = y - r * 1.02;
  const glass = ell(x, cy, r, r * 1.1, 32);
  H.fill(glass, 'teal', .16, { fine: true });
  H.outline(R, glass, 'blue', .8);
  H.line(R, arcPts(x + 1, cy, r * .92, r * 1.02, -.65, 1.14, 12), 'teal', 1.6);
  H.clip(glass, () => {
    village(H, R, x, y - 4, r / 22, variant);
    for (let k = 0; k < 15; k++) {
      const u = cycle(t + k * .39, 5);
      H.dot(x + Math.sin(k * 8.3 + variant) * r * .82, y - r * 2.04 + u * r * 1.95, r > 24 ? 1.25 : .7, 'paper', 1);
    }
  });
  H.line(R, arcPts(x - 2, cy, r * .74, r * .83, 3.35, 4.4, 10), 'paper', 2.2);
  if (cracked) stroke(H, R, [[x + r * .3, cy - r * .88], [x, cy - r * .35], [x + r * .22, cy], [x + r * .08, cy + r * .48]], 'blue', .9);
  shape(H, R, [[x - r * .88, y - 3], [x + r * .88, y - 3], [x + r * .95, y + 3], [x - r * .95, y + 3]], variant % 2 ? 'blue' : 'coral', .85);
  H.line(R, [[x - r * .75, y], [x + r * .75, y]], 'blue', .65);
}

function tray(H, R, i, j, w, d, z, ink = 'sun') {
  box(H, R, i, j, w, d, z, .07, ink, .7);
  shape(H, R, H.tile(i + .06, j + .06, w - .12, d - .12, z + .08), 'paper', .9, .6);
}

function tool(H, R, x, y, kind, angle = 0) {
  const p = (a, b) => [x + a * Math.cos(angle) - b * Math.sin(angle), y + a * Math.sin(angle) + b * Math.cos(angle)];
  if (kind === 0) {
    H.line(R, [p(-8, 0), p(8, 0)], 'blue', 1.3);
    H.line(R, [p(-8, 0), p(-1, 0)], 'coral', 3.4);
  } else if (kind === 1) {
    H.line(R, [p(-8, -2), p(7, 0), p(-8, 3)], 'blue', 1.1);
    H.line(R, [p(-8, -2), p(-10, -2)], 'coral', 1.7);
  } else if (kind === 2) {
    H.line(R, [p(-8, 0), p(5, 0)], 'sun', 2);
    H.line(R, [p(5, -3), p(5, 3)], 'blue', 4);
  } else {
    H.line(R, [p(-8, 0), p(7, 0)], 'coral', 2);
    H.line(R, [p(7, -2), p(10, 0), p(7, 2)], 'blue', .8);
  }
}

function jar(H, R, i, j, z, ink, text) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 7, y], [x + 7, y], [x + 7, y - 17], [x - 7, y - 17]], 'paper', 1, .8);
  shape(H, R, [[x - 5, y - 2], [x + 5, y - 2], [x + 5, y - 12], [x - 5, y - 12]], ink, .5, .4);
  H.line(R, [[x - 8, y - 18], [x + 8, y - 18]], ink, 3);
}

function tag(H, R, i, j, z, text, ink = 'paper') {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 10, y - 6], [x + 10, y - 6], [x + 10, y + 5], [x - 10, y + 5]], ink, 1, .6);
}

function stool(H, R, i, j) {
  for (const d of [-.22, .22]) box(H, R, i + d, j, .08, .08, 0, .55, 'blue', .7);
  const [x, y] = H.p(i, j, .58);
  oval(H, R, x, y, 11, 5, 'sun', .8);
}

function shell(H, R, i, j, z, r = 17) {
  const [x, y] = H.p(i, j, z);
  const dome = arcPts(x, y - 4, r, r * 1.05, Math.PI, Math.PI * 2, 20).concat([[x + r, y], [x - r, y]]);
  shape(H, R, dome, 'paper', .85, .8);
  H.tint(dome, 'teal', .1);
  oval(H, R, x, y, r, 4, 'paper', .7);
  H.line(R, arcPts(x - 2, y - 4, r * .73, r * .8, 3.3, 4.4, 8), 'paper', 2);
}

export default function enrich(room) {
  const richer = world(room.id, room.title, { floor: 'blue', tone: .43, wall: 'blue', wallTone: .75, height: 3.8, pattern: 'boards' }, (H, R) => {
    const [lightX, lightY] = H.p(5.1, 6.35, .03);
    H.light(lightX, lightY, 190, 91, .88);
    H.glow(lightX, lightY, 155, 72, 'sun', .16);
    for (const [i, j, w, d] of [[3.3, 5.1, 4.45, 2.25], [8.75, 2.9, 2.4, 1.5], [7.95, 9.55, 3, 1.5]]) H.tint(H.tile(i + .25, j + .35, w, d, .04), 'blue', .4, { fine: true });
    H.fill(H.faceI(.5, .5, 10.76, .35, 3.48), 'blue', .95, { fine: true });
    box(H, R, .45, .46, 10.94, 1.06, 0, .3, 'teal', .6);
    for (const i of [.47, 3.14, 5.81, 8.48, 11.15]) {
      box(H, R, i, .49, .16, .95, .3, 3.16, 'coral', .75);
      H.line(R, [H.p(i + .04, 1.45, .38), H.p(i + .04, 1.45, 3.4)], 'sun', 1);
    }
    box(H, R, .43, .44, 11, 1.1, 3.49, .16, 'teal', .65);
    for (let n = 0; n < 8; n++) {
      const i = .64 + n * 1.31;
      shape(H, R, H.faceI(i, 1.53, 1.16, .08, .53), 'coral', .65);
      H.line(R, [H.p(i + .43, 1.55, .34), H.p(i + .72, 1.55, .34)], 'sun', 2);
    }
    for (const z of [.7, 1.8, 2.9]) {
      box(H, R, .55, .65, 10.7, .76, z, .12, 'teal', .68);
      for (let k = 0; k < 8; k++) {
        globe(H, R, 1 + k * 1.36, 1.02, z + .14, 13 + k % 3, k + Math.round(z * 2), k * .3);
        tag(H, R, 1 + k * 1.36, 1.42, z + .08, String(11 + k + Math.floor(z) * 8));
      }
    }

    const peg = [H.p(.04, 2.25, 1.5), H.p(.04, 5.15, 1.5), H.p(.04, 5.15, 3.4), H.p(.04, 2.25, 3.4)];
    shape(H, R, peg, 'teal', .4);
    for (let j = 2.4; j < 5; j += .38) for (let z = 1.7; z < 3.3; z += .32) H.dot(...H.p(.05, j, z), .6, 'blue', .5);
    for (let k = 0; k < 7; k++) {
      const [x, y] = H.p(.06, 2.55 + k % 4 * .64, 2.9 - Math.floor(k / 4) * .7);
      tool(H, R, x, y, k % 4, Math.PI / 2);
    }
    const [cx, cy] = H.p(.08, 5.7, 2.7);
    oval(H, R, cx, cy, 14, 14, 'paper', 1);
    H.line(R, [[cx, cy - 9], [cx, cy], [cx + 6, cy + 3]], 'blue', 1.2);
    for (let n = 0; n < 12; n++) H.dot(cx + Math.sin(n * Math.PI / 6) * 11, cy + Math.cos(n * Math.PI / 6) * 11, .65, 'blue');
    table(H, R, .45, 3, 1.9, 3.5, 1, 'coral');
    for (let k = 0; k < 6; k++) jar(H, R, .85 + k % 2 * .9, 3.3 + Math.floor(k / 2) * .72, 1.13, ['teal', 'sun', 'coral'][k % 3], ['FIR', 'SNOW', 'ROOF', 'GLUE', 'LAKE', 'GOLD'][k]);
    tray(H, R, .7, 5.15, 1.35, .8, 1.14, 'teal');
    for (let k = 0; k < 3; k++) village(H, R, ...H.p(.92 + k * .38, 5.5, 1.26), .45, k);
    box(H, R, .7, 6.05, 1.25, .33, 1.16, .2, 'sun', .6);

    for (let k = 0; k < 3; k++) {
      box(H, R, .52, 3.2 + k, 1.65, .74, .2, .47, k % 2 ? 'teal' : 'sun', .5);
      tag(H, R, 1.32, 3.96 + k, .45, ['TREES', 'HOMES', 'BASES'][k]);
    }
    table(H, R, 8.65, 2.8, 2.45, 1.6, 1.02, 'teal');
    box(H, R, 9.5, 3.07, 1.1, .75, 1.16, 1.1, 'coral', .7);
    box(H, R, 10.06, 3.12, .14, .16, 2.16, .71, 'blue', .7);
    const [fx, fy] = H.p(9.72, 3.34, 2.9);
    shape(H, R, [[fx - 22, fy - 36], [fx + 22, fy - 36], [fx + 17, fy - 13], [fx + 5, fy], [fx - 5, fy], [fx - 17, fy - 13]], 'paper', .85);
    for (let k = 0; k < 30; k++) H.dot(fx + Math.sin(k * 9.7) * 16, fy - 14 - (k % 5) * 4, 1.1, 'sun', .8);
    oval(H, R, fx, fy - 36, 22, 6, 'sun', .7);

    stroke(H, R, [[fx, fy + 6], [fx - 1, fy + 12], [fx - 33, fy + 12], [fx - 33, fy + 18]], 'blue', 4);
    for (const i of [9.54, 10.52]) {
      H.line(R, [H.p(i, 3.1, 1.28), H.p(i, 3.1, 2.6)], 'sun', 2);
      H.dot(...H.p(i, 3.84, 1.36), 1.8, 'paper');
    }
    stroke(H, R, [H.p(10.7, 3.65, 1.4), H.p(11.05, 3.65, 1.2), H.p(11.05, 3.65, .2), H.p(10.3, 4.25, .12)], 'blue', 2.5);
    box(H, R, 9.07, 2.98, 1.58, .7, .2, .18, 'blue', .8);
    for (const i of [9.16, 9.55, 9.94, 10.33]) jar(H, R, i, 3.34, .42, 'teal', '');
    globe(H, R, 9, 3.77, 1.18, 19, 2, 0);
    const [gx, gy] = H.p(10.55, 3.84, 1.83);
    oval(H, R, gx, gy, 9, 9, 'paper', 1);
    H.line(R, [[gx, gy], [gx + 4, gy - 4]], 'coral', 1.2);
    H.dot(gx, gy, 1.5, 'blue');
    jar(H, R, 10.75, 4.1, 1.18, 'teal', 'WATER');
    H.fill(H.faceI(4.1, 6.85, 2.6, .1, 1.06), 'blue', .94, { fine: true });
    for (const i of [3.35, 6.63]) {
      box(H, R, i, 5.04, .78, 1.97, .1, .85, 'coral', .68);
      for (const z of [.23, .49, .75]) {
        shape(H, R, H.faceI(i + .07, 7.02, .64, z - .1, z + .1), 'sun', .63);
        H.line(R, [H.p(i + .25, 7.03, z), H.p(i + .51, 7.03, z)], 'blue', 1.8);
      }
    }
    box(H, R, 3.25, 4.95, 4.35, 2.2, 1.07, .14, 'teal', .7);
    box(H, R, 3.31, 5.01, 4.22, .12, 1.21, .13, 'sun', .75);
    H.line(R, [H.p(4.14, 5.24, .3), H.p(6.63, 5.24, .3)], 'blue', 3);
    shape(H, R, H.tile(4.25, 5.25, 2.22, 1.4, .32), 'sun', .5);
    for (let n = 0; n < 3; n++) shell(H, R, 4.65 + n * .64, 6.3, .34, 10);
    box(H, R, 3.05, 6.48, .37, .4, 1.18, .2, 'blue', .8);
    box(H, R, 2.94, 6.54, .22, .26, .72, .53, 'coral', .8);
    const [vx, vy] = H.p(3.04, 6.68, .91);
    H.line(R, [[vx - 8, vy], [vx + 9, vy]], 'sun', 2);
    for (const dx of [-8, 9]) H.dot(vx + dx, vy, 2.2, 'blue');
    const benchTop = H.tile(3.25, 4.95, 4.35, 2.2, 1.22);
    H.clip(benchTop, () => {
      const [x, y] = H.p(5.1, 6.05, 1.22);
      H.light(x, y, 115, 49, .98);
      H.glow(x, y, 96, 42, 'sun', .18);
    });
    shape(H, R, H.tile(3.45, 5.15, 1.6, 1.7, 1.23), 'paper', .98, .6);
    for (let k = 0; k < 5; k++) H.line(R, [H.p(3.53, 5.3 + k * .25, 1.22), H.p(4.85, 5.3 + k * .25, 1.22)], 'teal', .5);
    const [bx, by] = H.p(4.3, 5.85, 1.24);
    H.outline(R, ell(bx, by - 10, 18, 20), 'blue', .7);
    H.line(R, [[bx - 15, by + 11], [bx + 15, by + 11]], 'blue', 2);

    const [sx, sy] = H.p(4.86, 5.15, 1.24);
    oval(H, R, sx, sy, 14, 6, 'sun', .7);
    for (let k = 0; k < 4; k++) shape(H, R, [[sx - 10 + k * 6, sy + 1], [sx - 7 + k * 6, sy - 5], [sx - 4 + k * 6, sy + 2]], 'paper', 1, .6);
    tray(H, R, 5.75, 5.17, 1.46, 1.05, 1.2);
    village(H, R, ...H.p(6.46, 5.65, 1.34), .8, 2);
    shell(H, R, 7.12, 6.1, 1.22, 18);
    for (let k = 0; k < 5; k++) tool(H, R, ...H.p(3.55 + k * .59, 6.72, 1.24), k % 4, -.4 + k * .2);
    jar(H, R, 7.12, 6.78, 1.23, 'coral', 'SEAL');
    const [mx, my] = H.p(3.57, 5.25, 1.23);
    oval(H, R, mx, my, 11, 4, 'coral', .8);
    stroke(H, R, [[mx, my], [mx - 7, my - 36], [mx + 10, my - 52], [mx + 27, my - 42]], 'blue', 2);
    oval(H, R, mx + 29, my - 35, 14, 12, 'paper', .75);
    H.outline(R, ell(mx + 29, my - 35, 11, 9), 'teal', 1.2);
    stroke(H, R, [[mx - 4, my - 4], [mx - 17, my - 56], [mx + 12, my - 77], [mx + 44, my - 68]], 'blue', 3);
    for (const [dx, dy] of [[-17, -56], [12, -77]]) oval(H, R, mx + dx, my + dy, 3.5, 3.5, 'sun', .9);
    shape(H, R, [[mx + 34, my - 72], [mx + 48, my - 75], [mx + 62, my - 61], [mx + 32, my - 54]], 'teal', .9);
    H.line(R, [[mx + 34, my - 54], [mx + 61, my - 60]], 'paper', 2.4);
    const [repairX, repairY] = H.p(6.9, 5.27, 1.35);
    shape(H, R, [[repairX - 8, repairY - 6], [repairX + 5, repairY - 8], [repairX + 8, repairY + 1], [repairX - 6, repairY + 2]], 'paper', 1, .5);
    H.line(R, [[repairX - 4, repairY - 4], [repairX + 3, repairY - 5]], 'coral', 2);
    H.line(R, [[repairX - 2, repairY - 7], [repairX - 2, repairY + 1]], 'blue', .6);
    stool(H, R, 4.3, 7.65);
    stool(H, R, 6.85, 7.75);
    table(H, R, 9, 6.05, 2.05, 1.52, 1.05, 'sun');
    box(H, R, 9.18, 6.3, .74, .62, 1.18, .3, 'teal', .8);
    const [px, py] = H.p(9.55, 6.62, 1.64);
    oval(H, R, px, py, 18, 17, 'paper', 1);
    oval(H, R, px, py, 12, 11, 'coral', .25);
    H.dot(px, py, 3, 'blue');
    globe(H, R, 10.56, 6.75, 1.21, 15, 4);
    shape(H, R, H.tile(9.35, 7.05, .65, .34, 1.21), 'paper', 1, .6);
    jar(H, R, 10.6, 7.3, 1.21, 'sun', 'WAX');

    box(H, R, 9.35, 6.4, 1.2, .65, .1, .65, 'coral', .5);
    for (let k = 0; k < 4; k++) H.line(R, [H.p(9.4, 6.5 + k * .14, .54), H.p(10.45, 6.5 + k * .14, .54)], 'paper', 2);
    box(H, R, .1, 6.5, .26, 1.05, 1.25, 1.28, 'coral', .65);
    shape(H, R, H.faceJ(.38, 6.58, .86, 1.34, 2.44), 'blue', .82);
    for (let n = 0; n < 4; n++) {
      const [x, y] = H.p(.4, 6.72 + n * .19, 2.27);
      H.line(R, [[x, y], [x, y + 19 + n % 2 * 8]], 'sun', 1.3);
      oval(H, R, x, y + 21 + n % 2 * 8, 3, 5, 'paper', 1);
    }
    shape(H, R, [H.p(.39, 7.55, 1.25), H.p(.39, 7.55, 2.54), H.p(.97, 7.86, 2.54), H.p(.97, 7.86, 1.25)], 'coral', .6);
    bench(H, R, .75, 9.25, 2.9, 'sun');
    globe(H, R, 1.07, 9.64, .7, 14, 5, 0, true);
    tag(H, R, 1.38, 9.94, .69, '18');
    box(H, R, .88, 8.25, .75, .58, 0, .5, 'teal', .65);
    shell(H, R, 1.25, 8.57, .53, 13);

    table(H, R, 7.85, 9.45, 3.1, 1.48, .9, 'coral');
    for (let k = 0; k < 3; k++) {
      box(H, R, 8.03 + k * .86, 9.72, .68, .62, 1.04, .42, 'sun', .65);
      H.line(R, [H.p(8.37 + k * .86, 9.72, 1.48), H.p(8.37 + k * .86, 10.34, 1.48)], 'paper', 3);
      tag(H, R, 8.37 + k * .86, 10.35, 1.23, String(51 + k));
    }
    const [rx, ry] = H.p(10.58, 10.62, 1.04);
    oval(H, R, rx, ry, 8, 5, 'teal', .8);
    oval(H, R, rx, ry, 3, 2, 'paper', 1);
    tool(H, R, ...H.p(9.98, 10.58, 1.06), 1, .4);
    shape(H, R, H.tile(8.05, 10.49, .8, .36, 1.05), 'paper', 1, .5);
    for (let k = 0; k < 3; k++) {
      box(H, R, 11.2, 8.3 + k * .68, .66, .55, 0, .55 + k * .05, 'sun', .6);
      H.line(R, [H.p(11.53, 8.3 + k * .68, .55 + k * .05), H.p(11.53, 8.85 + k * .68, .55 + k * .05)], 'paper', 2);
    }
    box(H, R, 6.1, 10.15, .86, .76, 0, .65, 'teal', .65);
    const [wx, wy] = H.p(6.53, 10.55, .67);
    oval(H, R, wx, wy, 18, 8, 'paper', .8);
    for (let k = 0; k < 8; k++) stroke(H, R, [[wx - 12 + k * 3.5, wy], [wx - 15 + k * 3.5, wy - 8 - k % 3 * 3], [wx - 9 + k * 3, wy - 10]], 'sun', 1.5);
  }, (H, R, t) => {
    H.at(5.3, 6.08, 1.25, HH => globe(HH, R, 5.3, 6.08, 1.25, 29, 1, t, true));
    H.at(4.2, 7.55, .1, HH => {
      actor(HH, R, 4.2, 7.55, t, 'write', { shirt: ['sun', .8], hair: ['blue', .8], face: 'ne' }, .12, 1.08, 'elder');
      const [x, y] = HH.p(4.2, 7.55, .12);
      oval(HH, R, x - 2, y - 34, 9, 3, 'paper', 1);
      HH.line(R, [[x + 8, y - 27], [x + 24 + Math.sin(t * 5) * 2, y - 36]], 'blue', 1.1);
    });
    H.at(7.1, 7.7, .1, HH => {
      actor(HH, R, 7.1, 7.3, t + 1, 'water', { shirt: ['coral', .85], face: 'nw' }, .05, 1.15);
      const [x, y] = HH.p(6.53, 6.32, 1.36);
      HH.line(R, [[x + 17, y + 18], [x + 5 + Math.sin(t * 3) * 2, y - 6]], 'coral', 1.3);
      HH.dot(x + 5 + Math.sin(t * 3) * 2, y - 6, 1.6, 'paper');
    });
    H.at(9, 3.77, 1.22, HH => {
      const [x, y] = HH.p(9, 3.77, 1.22);
      for (let k = 0; k < 9; k++) {
        const u = cycle(t * 1.9 + k * .23, 2);
        HH.dot(x - 2 + Math.sin(k * 4) * 3, y - 33 + u * 24, 1.15, 'paper', 1);
      }
    });
    H.at(8.45, 4.6, 0, HH => actor(HH, R, 8.45, 4.6, t, 'point', { shirt: ['teal', .9], face: 'ne' }, 0, 1.04));
    H.at(9.55, 6.62, 1.64, HH => {
      const [x, y] = HH.p(9.55, 6.62, 1.64);
      for (let k = 0; k < 7; k++) {
        const a = t * 2.8 + k * Math.PI * 2 / 7;
        HH.line(R, [[x + Math.cos(a) * 5, y + Math.sin(a) * 5], [x + Math.cos(a) * 15, y + Math.sin(a) * 14]], 'sun', 1.1);
      }
    });
    H.at(10.1, 8.2, 0, HH => {
      actor(HH, R, 10.1, 8.2, t + .4, 'hold', { shirt: ['paper', 1], face: 'nw' }, 0, 1.05);
      const [x, y] = HH.p(10.1, 8.2, 0);
      oval(HH, R, x - 14 + Math.sin(t * 3) * 2, y - 27, 8, 6, 'teal', .6);
    });
    H.at(2.6, 10.35, 0, HH => actor(HH, R, 2.6, 10.35, t, 'hold', { shirt: ['coral', .7], face: 'ne' }, 0, 1.12));
    H.at(3.55, 10.3, 0, HH => {
      actor(HH, R, 3.55, 10.3, t + .4, 'lookup', { shirt: ['teal', .7], face: 'ne' }, 0, 1.08, 'child');
      globe(HH, R, 3.44, 10.25, .65 + Math.sin(t * 1.4) * .025, 10, 2, t);
    });
    H.at(8.2, 11.32, 0, HH => {
      actor(HH, R, 8.2, 11.32, t, 'hold', { shirt: ['blue', .7], face: 'ne' }, 0, 1.05);
      const [x, y] = HH.p(8.2, 11.32, .85);
      stroke(HH, R, [[x - 8, y], [x + Math.sin(t * 2) * 3, y - 6], [x + 10, y + 1]], 'sun', 2);
    });
  });
  return { ...room, under: richer.under, live: richer.live };
}
