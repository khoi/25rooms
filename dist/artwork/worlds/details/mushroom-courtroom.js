import { world, shape, oval, stroke, box, table, bench, creature, mushroom, lantern, ell, loop, cycle } from '../common.js';

const palette = ['coral', 'teal', 'sun', 'blue'];

function sheet(H, R, i, j, z, w = .52, d = .68, seal = false) {
  shape(H, R, H.tile(i, j, w, d, z), 'paper', 1, .6);
  for (let k = 0; k < 3; k++) H.line(R, [H.p(i + .09, j + .18 + k * .12, z + .01), H.p(i + w - .08, j + .18 + k * .12, z + .01)], 'blue', .55, { tone: .7 });
  if (seal) H.dot(...H.p(i + w - .13, j + d - .13, z + .02), 2.5, 'coral');
}

function book(H, R, i, j, z, ink = 'coral', w = .5, d = .68) {
  box(H, R, i, j, w, d, z, .12, ink, .78);
  H.line(R, [H.p(i + .06, j + d + .005, z + .045), H.p(i + w - .04, j + d + .005, z + .045)], 'paper', 1.4);
  H.line(R, [H.p(i + .09, j, z + .13), H.p(i + .09, j + d, z + .13)], 'sun', .8);
}

function scroll(H, R, x, y, size = 1, open = false) {
  if (open) {
    shape(H, R, [[x - 10 * size, y - 17 * size], [x + 13 * size, y - 17 * size], [x + 11 * size, y + 4 * size], [x - 12 * size, y + 4 * size]], 'paper', 1, .6);
    for (let k = 0; k < 4; k++) H.line(R, [[x - 6 * size, y + (k * 4 - 11) * size], [x + 7 * size, y + (k * 4 - 11) * size]], 'blue', .55);
    for (const dy of [-17, 4]) oval(H, R, x, y + dy * size, 13 * size, 2.3 * size, 'sun', .6);
  } else {
    shape(H, R, [[x - 12 * size, y - 3 * size], [x + 10 * size, y - 8 * size], [x + 12 * size, y - 2 * size], [x - 10 * size, y + 3 * size]], 'paper', 1, .6);
    oval(H, R, x - 11 * size, y, 2.5 * size, 3.5 * size, 'sun', .6);
    H.line(R, [[x, y - 6 * size], [x + 2 * size, y + 1 * size]], 'coral', 2);
  }
}

function acorn(H, R, x, y, s = 1) {
  oval(H, R, x, y - 3 * s, 4 * s, 5 * s, 'sun', .85);
  oval(H, R, x, y - 6 * s, 4.8 * s, 2.5 * s, 'coral', .8);
  stroke(H, R, [[x, y - 8 * s], [x + 1 * s, y - 11 * s]], 'blue', .8);
}

function jar(H, R, i, j, z, n) {
  const [x, y] = H.p(i, j, z);
  const contour = loop([[x - 9, y], [x - 10, y - 18], [x - 6, y - 22], [x + 6, y - 22], [x + 10, y - 18], [x + 9, y]], 1);
  shape(H, R, contour, 'paper', .95, .75);
  oval(H, R, x, y - 2, 9, 3, 'teal', .2);
  if (n % 3 === 0) acorn(H, R, x, y - 5, .9);
  else if (n % 3 === 1) {
    stroke(H, R, [[x - 3, y - 5], [x + 3, y - 18]], 'blue', .8);
    for (let a = 0; a < 4; a++) stroke(H, R, [[x - 4, y - 9 - a * 2], [x + a - 1, y - 6 - a * 3], [x + 5, y - 9 - a * 3]], 'teal', .65);
  } else for (let a = 0; a < 5; a++) H.dot(x + Math.sin(a * 3) * 5, y - 5 - a * 2.5, 1.8, 'coral');
  shape(H, R, [[x - 10, y - 23], [x + 10, y - 23], [x + 10, y - 19], [x - 10, y - 19]], 'coral', .7, .6);
  shape(H, R, [[x + 5, y - 11], [x + 14, y - 9], [x + 12, y - 1], [x + 4, y - 3]], 'sun', .8, .5);
}

function quill(H, R, x, y, tilt = 0) {
  oval(H, R, x, y, 4, 3, 'blue', .9);
  stroke(H, R, [[x, y], [x + 6 + tilt, y - 18]], 'blue', .8);
  shape(H, R, [[x + 2, y - 7], [x + 2 + tilt, y - 19], [x + 10 + tilt, y - 25], [x + 8 + tilt, y - 12]], 'paper', 1, .6);
}

function rabbit(H, R, x, y, t, s = .7, ink = 'paper', wave = false) {
  oval(H, R, x, y - 12 * s, 12 * s, 15 * s, ink, .9);
  oval(H, R, x + 2 * s, y - 29 * s, 11 * s, 10 * s, ink, .9);
  for (const a of [-4, 7]) {
    oval(H, R, x + a * s, y - 45 * s, 3.8 * s, 12 * s, ink, .9);
    H.line(R, [[x + a * s, y - 51 * s], [x + a * s, y - 39 * s]], 'coral', 1.4);
  }
  H.dot(x + 7 * s, y - 30 * s, 1.3 * s, 'blue');
  H.dot(x + 13 * s, y - 25 * s, 1.6 * s, 'coral');
  for (const a of [-7, 8]) oval(H, R, x + a * s, y, 7 * s, 3 * s, 'blue', .8);
  if (wave) {
    const lift = Math.sin(t * 2) * 4;
    stroke(H, R, [[x - 8 * s, y - 20 * s], [x - 19 * s, y - 22 * s], [x - 20 * s, y - (37 + lift) * s]], 'blue', 2 * s);
    oval(H, R, x - 20 * s, y - (39 + lift) * s, 4 * s, 5 * s, ink, .9);
  }
}

function hedgehog(H, R, x, y, s = .8) {
  const spines = [];
  for (let k = 0; k < 17; k++) {
    const a = Math.PI + k / 16 * Math.PI;
    const r = k % 2 ? 15 : 22;
    spines.push([x + Math.cos(a) * r * s, y - 8 * s + Math.sin(a) * r * s]);
  }
  shape(H, R, [...spines, [x + 18 * s, y], [x - 18 * s, y]], 'coral', .85);
  oval(H, R, x + 9 * s, y - 9 * s, 13 * s, 10 * s, 'sun', .8);
  H.dot(x + 16 * s, y - 12 * s, 1.4 * s, 'blue');
  H.dot(x + 23 * s, y - 7 * s, 2 * s, 'blue');
  for (const a of [-8, 12]) oval(H, R, x + a * s, y + 1, 5 * s, 2.5 * s, 'blue', .8);
}

function rail(H, R, i, j, w, z = 0, ink = 'coral') {
  for (let k = 0; k <= w; k += .42) box(H, R, i + k, j, .075, .08, z, .7, ink, .6);
  box(H, R, i - .08, j - .035, w + .2, .16, z + .68, .12, ink, .78);
}

function sealStand(H, R, i, j, text) {
  box(H, R, i, j, .08, .08, 0, .8, 'blue', .8);
}

function scales(H, R, i, j, z, t) {
  const [x, y] = H.p(i, j, z), tilt = Math.sin(t * 1.3) * 4;
  oval(H, R, x, y, 13, 5, 'blue', .85);
  stroke(H, R, [[x, y], [x, y - 49]], 'sun', 4);
  H.dot(x, y - 47, 4, 'coral');
  H.line(R, [[x - 29, y - 38 - tilt], [x + 29, y - 38 + tilt]], 'blue', 2);
  for (const side of [-1, 1]) {
    const px = x + side * 26, py = y - 38 + side * tilt;
    H.line(R, [[px, py], [px - 9, py + 21], [px + 9, py + 21], [px, py]], 'blue', .7);
    shape(H, R, [[px - 12, py + 21], [px + 12, py + 21], [px + 7, py + 27], [px - 7, py + 27]], 'sun', .85, .7);
    if (side < 0) acorn(H, R, px, py + 20, .9);
    else {
      stroke(H, R, [[px - 5, py + 19], [px + 5, py + 9]], 'blue', .7);
      shape(H, R, [[px - 5, py + 18], [px - 3, py + 9], [px + 8, py + 7], [px + 4, py + 16]], 'paper', 1, .55);
    }
  }
}

export default function enrich(room) {
  const detailed = world(room.id, room.title, { floor: 'teal', tone: .2, wall: false }, (H, R) => {
    for (const [i, j, s, ink] of [[.5,.6,.7,'sun'],[3.1,.5,.8,'coral'],[7.8,.5,.7,'sun'],[11.4,.7,.9,'coral'],[.4,10.8,.65,'coral'],[2.6,11.4,.55,'sun'],[8.4,11.3,.65,'coral'],[11.5,10.3,.9,'sun']]) mushroom(H, R, ...H.p(i, j), s, ink);
    for (const j of [.6, 1.4, 2.2, 3]) {
      const [x, y] = H.p(.3, j);
      stroke(H, R, [[x, y], [x - 8, y - 17], [x - 13, y - 19], [x - 10, y - 12], [x, y - 6], [x + 7, y - 18]], 'teal', 2);
    }
    box(H, R, 4.15, 1.05, 4.6, 2.8, 0, .35, 'coral', .65);
    box(H, R, 5.4, 3.85, 2, .45, 0, .17, 'sun', .7);
    for (let k = 0; k < 8; k++) H.line(R, [H.p(4.3 + k * .55, 1.1, .36), H.p(4.3 + k * .55, 3.8, .36)], 'blue', .65, { tone: .35 });
    mushroom(H, R, ...H.p(6.2, 2, .35), 3.05, 'coral');
    const [mx, my] = H.p(6.2, 2, .35);
    for (let k = 0; k < 12; k++) stroke(H, R, [[mx - 53 + k * 9, my - 67], [mx - 37 + k * 6, my - 57]], 'blue', .7, .6);

    box(H, R, 5.05, 2.85, 2.95, .9, .35, 1, 'blue', .72);
    box(H, R, 4.94, 2.78, 3.17, 1.06, 1.35, .13, 'sun', .8);

    for (const i of [5.28, 7.67]) {
      const [x, y] = H.p(i, 3.77, .9);
      oval(H, R, x, y, 6, 8, 'coral', .8);
      H.line(R, [[x - 3, y + 7], [x - 5, y + 15], [x, y + 12], [x + 4, y + 16], [x + 3, y + 6]], 'sun', 2);
    }
    book(H, R, 5.15, 3, 1.49, 'teal', .57, .55);
    book(H, R, 5.17, 3.02, 1.61, 'coral', .52, .53);
    sheet(H, R, 6.5, 3.03, 1.49, .54, .6, true);
    quill(H, R, ...H.p(7.63, 3, 1.52));
    oval(H, R, ...H.p(7.12, 3.57, 1.5), 9, 4, 'coral', .8);
    table(H, R, .65, 1.05, 2.85, 1.05, .88, 'teal');
    for (const i of [.68, 3.3]) box(H, R, i, 1.05, .1, .12, .88, 1.1, 'blue', .6);
    box(H, R, .6, 1.06, 2.98, .72, 1.75, .12, 'sun', .6);
    for (let k = 0; k < 6; k++) jar(H, R, .94 + k % 3 * .9, k < 3 ? 1.78 : 1.49, k < 3 ? 1.01 : 1.88, k);

    table(H, R, .8, 2.6, 2.5, 1.05, .65, 'sun');
    sheet(H, R, 1, 2.72, .79, .8, .64, true);
    jar(H, R, 2.84, 2.9, .78, 6);
    for (let k = 0; k < 3; k++) acorn(H, R, ...H.p(2.15 + k * .27, 3.18, .82), .7);
    table(H, R, 9.3, .7, 1.9, 1, .6, 'coral');
    for (const z of [.72, 1.42, 2.12]) {
      box(H, R, 9.3, .7, 1.9, .75, z, .1, 'teal', .65);
      for (let k = 0; k < 5; k++) scroll(H, R, ...H.p(9.48 + k * .32, 1.16, z + .2), .52);
    }
    for (const i of [9.25, 11.1]) box(H, R, i, .68, .13, .18, .55, 1.85, 'blue', .7);

    for (let k = 0; k < 5; k++) book(H, R, 10.45, 2.15, k * .13, palette[k % 4], .6, .82);
    box(H, R, 1.05, 4.3, 1.85, 1.6, 0, .25, 'sun', .5);
    rail(H, R, 1.05, 5.78, 1.85, .25);
    box(H, R, 1.05, 4.3, .13, 1.6, .25, .68, 'coral', .6);
    book(H, R, 1.13, 5.15, .98, 'blue', .46, .43);

    table(H, R, 4.05, 4.85, 1.85, 1.08, .67, 'sun');
    box(H, R, 4.45, 5.18, 1.02, .6, .8, .2, 'blue', .9);
    box(H, R, 4.53, 5.03, .85, .16, 1, .2, 'teal', .8);
    for (let k = 0; k < 12; k++) H.dot(...H.p(4.56 + k % 4 * .2, 5.4 + Math.floor(k / 4) * .13, 1.01), 1.35, 'paper');
    const paper = [[4.68,5.04,1.04],[5.19,5.04,1.04],[5.19,5.03,1.85],[4.68,5.03,1.85]].map(p => H.p(...p));
    shape(H, R, paper, 'paper', 1, .6);
    for (let k = 0; k < 6; k++) H.line(R, [H.p(4.74, 5.02, 1.16 + k * .1), H.p(5.11, 5.02, 1.16 + k * .1)], 'blue', .45);
    scroll(H, R, ...H.p(5.63, 5.4, .81), .55);

    table(H, R, 7.15, 4.8, 2.05, 1.22, .85, 'coral');
    sheet(H, R, 7.32, 5.1, .99, .64, .7, true);
    for (let k = 0; k < 3; k++) book(H, R, 8.35, 5.17, .98 + k * .12, palette[k], .55, .7);
    scroll(H, R, ...H.p(8.15, 4.98, 1.02), .72, true);
    quill(H, R, ...H.p(7.42, 4.91, 1.03));
    table(H, R, 10.05, 3.45, 1.25, 1.3, .65, 'sun');

    for (const j of [7.45, 9.4]) {
      bench(H, R, 1.1, j, 3.3, 'coral');
      rail(H, R, 1, j + 1.05, 3.5, 0, 'teal');
      for (let k = 0; k < 3; k++) {
        const [x, y] = H.p(1.62 + k, j + .14, .7);
        oval(H, R, x, y, 9, 4, palette[k], .65);
      }
    }
    sealStand(H, R, .8, 6.83, 'THE JURY');
    for (let k = 0; k < 3; k++) sheet(H, R, 1.6 + k * .75, 8.8, .03, .38, .4, k === 1);
    bench(H, R, 7.6, 8.45, 3.1, 'teal');
    bench(H, R, 7.6, 10.15, 3.1, 'coral');
    rail(H, R, 7.4, 7.4, 3.6, 0, 'sun');
    sealStand(H, R, 10.95, 7.44, 'QUIET PLEASE');
    for (let k = 0; k < 3; k++) book(H, R, 9.88, 8.68, .7 + k * .12, palette[k], .5, .56);
    box(H, R, 7.9, 10.9, .7, .47, 0, .4, 'blue', .8);
    stroke(H, R, [H.p(8.03, 11.12, .42), H.p(8.03, 11.12, .59), H.p(8.45, 11.12, .59), H.p(8.45, 11.12, .42)], 'sun', 1.5);
    for (let k = 0; k < 3; k++) scroll(H, R, ...H.p(10.5 + k * .2, 10.96, .06), .55);
    box(H, R, 4.2, 6.5, .1, .1, 0, 1.55, 'blue', .7);
    const [ex, ey] = H.p(4.25, 6.55, 1.7);
    shape(H, R, [[ex - 22, ey - 21], [ex + 22, ey - 21], [ex + 22, ey + 14], [ex - 22, ey + 14]], 'paper', 1);

    stroke(H, R, [[ex - 17, ey + 6], [ex - 7, ey - 3], [ex + 5, ey + 5], [ex + 15, ey - 4]], 'teal', 1.2);
    acorn(H, R, ex + 12, ey + 10, .65);
    for (const [dx, dy] of [[-13,3],[-5,-2],[3,3]]) { H.dot(ex + dx, ey + dy, 1.4, 'coral'); H.dot(ex + dx + 2, ey + dy + 2, 1, 'coral'); }
    for (const [i, j] of [[.4, 6.5],[11.5, 6.05]]) lantern(H, R, i, j, 1.25, 'sun');
    box(H, R, 5.7, 10.35, 1.2, .75, .16, .4, 'sun', .7);
    for (let k = 0; k < 4; k++) scroll(H, R, ...H.p(5.9 + k % 2 * .45, 10.58 + Math.floor(k / 2) * .3, .65), .62);
    for (const i of [5.92, 6.75]) oval(H, R, ...H.p(i, 11.1, .14), 5, 5, 'blue', .8);
  }, (H, R, t) => {
    const [jx, jy] = H.p(6.1, 3, 1.48);
    creature(H, R, jx, jy, 'mouse', t, .92, 'blue');
    for (let k = 0; k < 7; k++) oval(H, R, jx - 5 + k * 3.9, jy - 33 - Math.sin(k / 6 * Math.PI) * 7, 3.5, 4, 'paper', 1);
    shape(H, R, [[jx - 3,jy - 21],[jx + 11,jy - 21],[jx + 6,jy - 10]], 'paper', 1, .5);
    const [gx, gy] = H.p(7.02, 3.28, 1.52), lift = Math.max(0, Math.sin(t * 2.2)) * 15;
    stroke(H, R, [[jx + 13, jy - 14],[gx - 5, gy - 7 - lift],[gx + 9, gy - 14 - lift]], 'blue', 2.4);
    oval(H, R, gx + 10, gy - 14 - lift, 7, 4, 'sun', .9);
    const [cx, cy] = H.p(2.0, 3.23, .79);
    creature(H, R, cx, cy, 'mouse', t, .57, 'teal');
    const glassX = cx + 18 + Math.sin(t * 1.2) * 3;
    H.outline(R, ell(glassX, cy - 14, 6, 6), 'blue', 1.2);
    H.line(R, [[glassX - 4,cy - 9],[glassX - 10,cy - 2]], 'blue', 2);
    rabbit(H, R, ...H.p(2.05, 5.1, .56), t, .72, 'paper', true);
    const [sx, sy] = H.p(4.34, 5.2, .78);
    creature(H, R, sx - 5, sy - 1, 'mouse', t, .65, 'coral');
    for (const side of [-1,1]) stroke(H, R, [[sx + 6,sy - 14],[sx + 14 + side * 5,sy - 6 + Math.sin(t * 12 + side) * 2]], 'blue', 2);
    hedgehog(H, R, ...H.p(7.44, 5.57, 1), .74);
    const [lx, ly] = H.p(7.97, 5.86, 1.1);
    scroll(H, R, lx + Math.sin(t * 1.6) * 2, ly - 5, .6, true);
    const [bx, by] = H.p(9.35, 6.48, .05);
    creature(H, R, bx, by, 'beetle', t, .7, 'teal');
    shape(H, R, [[bx - 10,by - 29],[bx + 10,by - 29],[bx + 8,by - 24],[bx - 8,by - 24]], 'blue', .9, .6);
    H.dot(bx, by - 17, 3.3, 'sun');
    stroke(H, R, [[bx + 19,by],[bx + 19,by - 49]], 'blue', 2);
    oval(H, R, bx + 19, by - 51, 4, 6, 'sun', .9);
    scales(H, R, 10.7, 4.15, .82, t);
    for (const [i,j,kind,ink,phase] of [[1.67,7.86,'mouse','sun',0],[2.78,7.87,'rabbit','paper',1],[3.85,7.87,'hedgehog','coral',2],[1.64,9.8,'rabbit','sun',3],[2.76,9.81,'mouse','teal',4],[3.85,9.81,'mouse','paper',5]]) {
      const [x,y] = H.p(i,j,.72);
      if (kind === 'rabbit') rabbit(H,R,x,y,t + phase,.58,ink,j < 8);
      else if (kind === 'hedgehog') hedgehog(H,R,x,y,.62);
      else creature(H,R,x,y,'mouse',t + phase,.57,ink);
      if (j < 8 && i < 2) {
        scroll(H,R,x - 14,y - 3,.45,true);
        stroke(H,R,[[x + 8,y - 14],[x + 20,y - 22 + Math.sin(t * 2) * 4]],'blue',1.3);
      }
    }
    const hand = cycle(t,6), noteI = 2.88 + Math.sin(hand * Math.PI) * .74;
    sheet(H,R,noteI,9.97,.98,.32,.3,true);
    stroke(H,R,[H.p(2.91,9.91,1.04),H.p(noteI + .12,10.04,1.01)],'blue',1.5);
    creature(H,R,...H.p(8.22,8.9,.7),'mouse',t,.65,'paper');
    scroll(H,R,...H.p(8.56,9.05,1),.63,true);
    hedgehog(H,R,...H.p(9.34,10.62,.7),.72);
    const [rx,ry] = H.p(8.25,10.57,.7);
    rabbit(H,R,rx,ry,t,.6,'teal');

    const [nx,ny] = H.p(5.22 + Math.sin(t * .65) * .13,10.9,.04);
    stroke(H,R,[[nx - 11,ny],[nx + 14,ny],[nx + 19,ny - 9]],'teal',5);
    oval(H,R,nx - 1,ny - 9,10,10,'coral',.8);
    stroke(H,R,[[nx + 3,ny - 13],[nx - 3,ny - 15],[nx - 6,ny - 9],[nx - 1,ny - 5],[nx + 4,ny - 8],[nx + 1,ny - 11]],'blue',.8);
    for (const a of [13,20]) { H.line(R,[[nx + a,ny - 7],[nx + a + Math.sin(t * 2) * 2,ny - 19]],'blue',.7); H.dot(nx + a + Math.sin(t * 2) * 2,ny - 20,1.8,'sun'); }
    H.line(R,[[nx + 23,ny - 1],H.p(5.72,10.72,.3)],'blue',.8);
  });
  return { ...room, under: detailed.under, live: detailed.live };
}
