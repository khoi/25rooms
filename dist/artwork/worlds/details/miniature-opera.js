import { world, box, table, shape, oval, stroke, creature, cycle, loop, starPts } from '../common.js';

function sheet(H, R, i, j, z, title = '', spread = false) {
  const [x, y] = H.p(i, j, z);
  const w = spread ? 20 : 13;
  shape(H, R, [[x - w / 2, y - 10], [x + w / 2, y - 8], [x + w / 2 - 1, y + 3], [x - w / 2 - 1, y + 1]], 'paper', 1, .6);
  for (let n = 0; n < 4; n++) H.line(R, [[x - w / 2 + 3, y - 6 + n * 2], [x + w / 2 - 3, y - 5 + n * 2]], 'blue', .5, { tone: .7 });
  if (spread) H.line(R, [[x, y - 9], [x - 1, y + 2]], 'coral', .6);
  if (title) {}
}

function seat(H, R, i, j, z = 0, ink = 'coral') {
  for (const x of [i + .08, i + .65]) box(H, R, x, j + .12, .09, .5, z, .4, 'blue', .65);
  box(H, R, i, j, .78, .7, z + .38, .13, ink, .76);
  box(H, R, i, j + .58, .78, .11, z + .46, .53, ink, .78);
  for (const x of [i, i + .71]) box(H, R, x, j + .08, .08, .59, z + .6, .08, 'sun', .65);
  const [x, y] = H.p(i + .4, j + .7, z + .72);
  oval(H, R, x, y, 4, 3, 'sun', .65);
}

function stand(H, R, i, j, z = 0) {
  const [x, y] = H.p(i, j, z);
  H.line(R, [[x - 8, y], [x, y - 3], [x + 9, y + 1]], 'blue', 1.1);
  H.line(R, [[x, y], [x, y - 25]], 'sun', 1.7);
  shape(H, R, [[x - 13, y - 34], [x + 12, y - 31], [x + 10, y - 19], [x - 14, y - 22]], 'blue', .8);
  sheet(H, R, i, j, z + .76, '', true);
}

function violin(H, R, x, y, t, large = false) {
  const s = large ? 1.3 : .7;
  const body = loop([[-8, 3], [-11, -5], [-7, -12], [-4, -16], [-8, -21], [-4, -27], [4, -27], [8, -21], [4, -16], [7, -12], [11, -5], [8, 3]], 2);
  shape(H, R, body.map(([a, b]) => [x + a * s, y + b * s]), 'coral', .88);
  H.line(R, [[x, y + 2 * s], [x, y - 39 * s]], 'blue', 2 * s);
  for (const d of [-2, 2]) H.line(R, [[x + d * s, y - 3 * s], [x + d * s, y - 30 * s]], 'sun', .6);
  oval(H, R, x, y - 39 * s, 3 * s, 4 * s, 'sun', .7);
  const bow = Math.sin(t * 3) * 5;
  H.line(R, [[x - 15 * s + bow, y - 20 * s], [x + 19 * s + bow, y - 11 * s]], 'paper', 1.8);
  H.line(R, [[x - 15 * s + bow, y - 22 * s], [x + 19 * s + bow, y - 13 * s]], 'blue', .8);
  if (large) H.line(R, [[x, y + 3], [x, y + 12]], 'blue', 1.2);
}

function balcony(H, R, i, j, d, z) {
  box(H, R, i, j, 1.45, d, z, .2, 'sun', .7);
  for (let n = 0; n < 2; n++) seat(H, R, i + .24, j + .45 + n * 1.28, z + .2, 'teal');
  box(H,R,i,j,1.45,.12,z+.2,.17,'coral',.73);
  for(const y of [j+.5,j+d-.5]) {
    shape(H,R,[H.p(i+.2,y,z-.03),H.p(i+1.3,y,z-.03),H.p(i+.2,y,z-.88)],'teal',.7);
    H.line(R,[H.p(i+.35,y,z-.15),H.p(i+.35,y,z-.61)],'sun',1.1);
  }
  for (let p = j + .14; p < j + d; p += .38) {
    H.line(R, [H.p(i + 1.42, p, z + .2), H.p(i + 1.42, p, z + .88)], 'sun', 2);
    const [x, y] = H.p(i + 1.42, p, z + .52);
    oval(H, R, x, y, 2, 5, 'coral', .78);
  }
  H.line(R, [H.p(i + 1.42, j, z + .88), H.p(i + 1.42, j + d, z + .88)], 'sun', 3);
  for (const pos of [j + .2, j + d - .2]) {
    H.line(R, [H.p(i + .2, pos, 0), H.p(i + .2, pos, z)], 'blue', 3);
    shape(H, R, [H.p(i + .1, pos, z), H.p(i + 1.3, pos, z), H.p(i + .1, pos, z - .6)], 'coral', .65);
  }
}

function stageCurtain(H, R, left) {
  const a = left ? 1.9 : 8.2, b = a + 1.75;
  shape(H, R, [H.p(a, 1.48, .58), H.p(b, 1.48, .58), H.p(left ? b - .75 : a + .75, 1.48, 2.1), H.p(b, 1.48, 4.12), H.p(a, 1.48, 4.12)], 'coral', .9);
  for (let n = 0; n < 6; n++) {
    const p = a + .13 + n * .26;
    stroke(H, R, [H.p(p, 1.49, 4.08), H.p(left ? p - .1 : p + .1, 1.49, 2.9), H.p(left ? a + .2 + n * .13 : b - .2 - n * .13, 1.49, 2.06), H.p(p, 1.49, .65)], n % 2 ? 'sun' : 'blue', 1.1, .68);
  }
  const [x, y] = H.p(left ? a + .6 : b - .6, 1.52, 2.1);
  H.line(R, [[x - 15, y], [x + 13, y + 3]], 'sun', 4);
  H.line(R, [[x + 8, y + 2], [x + 13, y + 25]], 'sun', 1.4);
  shape(H, R, [[x + 9, y + 22], [x + 17, y + 23], [x + 16, y + 34], [x + 11, y + 33]], 'sun', .9);
}

function scenery(H, R) {
  shape(H, R, [H.p(2, 1.25, .6), H.p(9.9, 1.25, .6), H.p(9.9, 1.25, 4), H.p(2, 1.25, 4)], 'teal', .4);
  const [mx, my] = H.p(6.45, 1.23, 3.14);
  oval(H, R, mx, my, 29, 29, 'sun', .82);
  oval(H, R, mx + 10, my - 8, 25, 25, 'teal', .62);
  for (const [i, z] of [[3.8, 3.6], [4.7, 2.9], [5.3, 3.75], [7.9, 3.5], [8.7, 2.7]]) shape(H, R, starPts(...H.p(i, 1.26, z), 5, 2, 5, -.3), 'paper', 1, .5);
  for (const [i, h] of [[4.1, 1.4], [4.8, 1.9], [5.5, 1.1], [7.5, 1.1], [8.15, 1.55]]) {
    shape(H, R, [H.p(i, 1.3, .6), H.p(i + .5, 1.3, .6), H.p(i + .5, 1.3, h), H.p(i + .25, 1.3, h + .35), H.p(i, 1.3, h)], 'blue', .75);
    const [x, y] = H.p(i + .25, 1.31, h - .25);
    shape(H, R, [[x - 2, y - 3], [x + 2, y - 3], [x + 2, y + 3], [x - 2, y + 3]], 'sun', .86, .4);
  }
}

function architecture(H, R) {
  for(const j of [.35,2.9,5.8,8.3,11.6]) {
    box(H,R,.03,j,.24,.2,0,4.12,'coral',.7);
    for(const z of [.2,1.15,3.75]) box(H,R,.02,j-.07,.35,.35,z,.14,'sun',.83);
  }
  box(H,R,.04,.08,.22,11.74,4.02,.16,'sun',.83);
  box(H,R,.04,.08,11.76,.22,4.02,.16,'sun',.83);
  for(const j of [8.4,10.55]) {
    box(H,R,.04,j-.65,.16,1.3,.12,1.1,'coral',.58);
    shape(H,R,H.faceJ(.22,j-.53,1.06,.27,1.05),'teal',.66);
    H.line(R,[H.p(.24,j-.48,.93),H.p(.24,j+.48,.93)],'sun',1.1);
  }
  for(const i of [2.25,4.65,7.05,9.45]) {
    box(H,R,i,.16,.15,.18,3.45,.52,'coral',.7);
    const [x,y]=H.p(i,.4,3.5);
    oval(H,R,x,y,7,8,'blue',.85);
    oval(H,R,x,y+2,5,5,'sun',.95);
    H.glow(x,y+22,28,19,'sun',.2);
  }

  box(H, R, 1.65, .9, 8.65, 3.65, 0, .56, 'coral', .58);
  for (let j = 1.3; j < 4.5; j += .45) H.line(R, [H.p(1.8, j, .57), H.p(10.1, j, .57)], 'sun', .7, { tone: .65 });
  for(let n=0;n<7;n++) {
    const i=2+n*1.13;
    shape(H,R,H.faceI(i,4.56,.89,.12,.43),'blue',.73);
    H.line(R,[H.p(i+.12,4.57,.2),H.p(i+.76,4.57,.2)],'sun',.8);
  }
  scenery(H, R);
  for(const i of [2.1,9.65]) {
    box(H,R,i,1.12,.1,.1,.55,3.45,'coral',.8);
    H.line(R,[H.p(i,1.2,1.1),H.p(i+.12,2.15,.6)],'sun',1.6);
  }
  box(H,R,2.05,1.1,7.7,.12,3.94,.12,'blue',.85);
  stageCurtain(H, R, true); stageCurtain(H, R, false);
  for (const i of [1.55, 9.95]) {
    box(H, R, i, 4.25, .35, .36, .55, 3.55, 'sun', .77);
    box(H, R, i - .12, 4.18, .59, .5, .5, .22, 'paper', .9);
    box(H, R, i - .13, 4.18, .61, .5, 3.98, .25, 'sun', .8);
    for (let n = 0; n < 3; n++) H.line(R, [H.p(i + .05 + n * .1, 4.62, .9), H.p(i + .05 + n * .1, 4.62, 3.85)], 'coral', .8);
  }
  box(H, R, 1.52, 4.2, 8.81, .22, 4.08, .25, 'sun', .85);
  box(H,R,1.41,4.12,9.03,.4,4.31,.11,'coral',.8);
  for(let n=0;n<9;n++) {
    const [x,y]=H.p(1.98+n*.96,4.47,4.2);
    shape(H,R,[[x-5,y],[x,y-5],[x+5,y],[x,y+5]],'paper',.95,.6);
  }
  for (let n = 0; n < 6; n++) {
    const a = 1.9 + n * 1.3;
    shape(H, R, [H.p(a, 4.43, 4.15), H.p(a + 1.25, 4.43, 4.15), H.p(a + .97, 4.43, 3.83), H.p(a + .5, 4.43, 3.72), H.p(a + .14, 4.43, 3.91)], 'coral', .88);
    stroke(H, R, [H.p(a + .12, 4.44, 4.05), H.p(a + .6, 4.44, 3.76), H.p(a + 1.13, 4.44, 4.05)], 'sun', 1.2);
  }
  for (let k = 0; k < 13; k++) {
    const [x, y] = H.p(2.1 + k * .61, 4.56, .6);
    oval(H, R, x, y - 2, 5, 4, 'blue', .8);
    H.dot(x, y - 3, 2.5, 'sun', 1, { knock: true });
  }
  for (let n = 0; n < 3; n++) box(H, R, 8.6, 4.6 + n * .25, 1.2, .26, 0, .5 - n * .15, 'sun', .6);
  for (const [j, ink, text] of [[8.5, 'coral', 'LA LUNE'], [10.35, 'teal', 'ENCORE']]) {
    const frame = [H.p(.035, j - .65, 1.35), H.p(.035, j + .65, 1.35), H.p(.035, j + .65, 3.15), H.p(.035, j - .65, 3.15)];
    shape(H, R, frame, 'sun', .8);
    const inner = [H.p(.05, j - .51, 1.49), H.p(.05, j + .51, 1.49), H.p(.05, j + .51, 3.01), H.p(.05, j - .51, 3.01)];
    shape(H, R, inner, ink, .69);
    const [x, y] = H.p(.07, j, 2.35);
    oval(H, R, x, y, 10, 15, 'paper', .99);
    for (const dx of [-4, 4]) H.dot(x + dx, y - 3, 1.8, 'blue', .95);
    stroke(H, R, [[x - 5, y + 4], [x, y + (j < 9 ? 10 : 1)], [x + 5, y + 4]], 'coral', 1.3);
  }
  balcony(H, R, .1, 4.2, 3.35, 1.75);
  balcony(H, R, 10.4, .8, 3.75, 2.1);
  for (const [i, j] of [[.25, 3.15], [10.7, .3]]) {
    const [x, y] = H.p(i, j, 3.35);
    H.line(R, [[x, y - 29], [x, y - 8]], 'sun', 1.3);
    stroke(H, R, [[x - 16, y - 10], [x - 12, y + 2], [x, y + 7], [x + 12, y + 2], [x + 16, y - 10]], 'sun', 2.1);
    for (const dx of [-16, 0, 16]) { H.line(R, [[x + dx, y - 8], [x + dx, y - 19]], 'paper', 3); H.dot(x + dx, y - 21, 2.5, 'sun', .9); }
    for (const dx of [-10, 0, 10]) shape(H, R, [[x + dx, y + 4], [x + dx + 3, y + 10], [x + dx, y + 15], [x + dx - 3, y + 10]], 'paper', .9, .5);
  }
}

function furnishings(H, R) {
  shape(H, R, H.tile(1.9, 5, 7.85, 2.3, .025), 'teal', .38);
  box(H, R, 1.8, 7.2, 8, .16, 0, .3, 'sun', .64);
  for (let n = 0; n < 12; n++) H.line(R, [H.p(2.05 + n * .63, 7.36, .08), H.p(2.05 + n * .63, 7.36, .26)], 'coral', 1);
  for (const [i, j] of [[2.6, 5.8], [4, 5.5], [5.35, 5.85], [6.9, 5.6]]) { seat(H, R, i - .28, j - .14, 0, 'blue'); stand(H, R, i + .38, j + .48); }
  for(const i of [8.15,9.28]) for(const j of [5.3,6.01]) {
    box(H,R,i,j,.09,.09,0,.48,'blue',.85);
    oval(H,R,...H.p(i,j,.035),3,3,'sun',.8);
  }
  for(const i of [8.47,8.74,9]) H.line(R,[H.p(i,6.49,.07),H.p(i,6.32,.2)],'sun',2);
  const [hx, hy] = H.p(2.4, 5.85, .18);
  stroke(H, R, [[hx - 17, hy], [hx - 18, hy - 53], [hx + 11, hy - 42], [hx + 11, hy + 2]], 'sun', 4);
  stroke(H, R, [[hx - 18, hy - 53], [hx - 11, hy - 59], [hx + 12, hy - 44]], 'coral', 2);
  for (let n = 0; n < 7; n++) H.line(R, [[hx - 13 + n * 3.7, hy - 48 + n], [hx - 13 + n * 3.7, hy - 2]], 'paper', .8);
  box(H, R, 8, 5.15, 1.5, 1.1, .35, .55, 'blue', .9);
  box(H, R, 8, 6.18, 1.5, .31, .72, .1, 'paper', 1);
  for (let n = 0; n < 15; n++) H.line(R, [H.p(8.03 + n * .095, 6.19, .83), H.p(8.03 + n * .095, 6.46, .83)], 'blue', .55);
  for (let n = 0; n < 10; n++) if (n % 3 !== 2) box(H, R, 8.05 + n * .135, 6.2, .065, .14, .83, .06, 'blue', .9);
  shape(H, R, [H.p(8, 5.15, .9), H.p(9.5, 5.15, 1.9), H.p(9.5, 6.14, 1.9), H.p(8, 6.14, .9)], 'blue', .82);
  H.line(R, [H.p(9.38, 5.9, .9), H.p(9.38, 5.9, 1.82)], 'sun', 1.2);
  sheet(H, R, 8.5, 6.2, 1.19, '', true);
  box(H, R, 5.25, 7, .8, .7, 0, .16, 'coral', .7);
  for (let j = 8.05; j < 11.5; j += 1.45) for (const i of [2.3, 3.65, 6.5, 7.85]) seat(H, R, i, j);
  shape(H, R, H.tile(5.05, 7.7, .96, 4, .02), 'coral', .45);
  for (const i of [5.13, 5.91]) H.line(R, [H.p(i, 7.75, .03), H.p(i, 11.65, .03)], 'sun', 1);
  for (const [i, j] of [[2.7, 8.5], [4.05, 9.96], [6.9, 11.4], [8.3, 8.5]]) sheet(H, R, i, j, .63, 'ACT II');
  table(H, R, 10.15, 9.3, 1.4, 1.45, .75, 'teal');
  for (let n = 0; n < 4; n++) sheet(H, R, 10.45 + n * .22, 9.68, .91 + n * .025, 'OPERA');

  for (const j of [9.32, 10.44]) {
    const [x, y] = H.p(11.35, j, .93);
    oval(H, R, x, y, 5, 3, 'paper', 1); H.line(R, [[x - 3, y], [x - 2, y - 7], [x + 3, y - 7], [x + 4, y]], 'coral', .8);
  }
  box(H, R, 10.15, 6.4, 1.4, .88, 0, .7, 'coral', .76);
  box(H, R, 10.15, 6.38, 1.4, .1, .7, .67, 'teal', .68);
  for (const i of [10.3, 11.26]) H.line(R, [H.p(i, 6.4, .73), H.p(i, 7.27, .73), H.p(i, 7.27, .09)], 'sun', 2);
  const [cx, cy] = H.p(10.9, 6.81, .88);
  shape(H, R, [[cx - 17, cy], [cx - 12, cy - 20], [cx - 4, cy - 16], [cx + 5, cy - 21], [cx + 12, cy + 4]], 'paper', .98);
  for (let n = 0; n < 3; n++) H.dot(cx - 5 + n * 5, cy - 10 + n * 3, 1.8, 'coral', .85);
  const [rx, ry] = H.p(10.75, 5.6, .04);
  for (let n = 0; n < 5; n++) oval(H, R, rx, ry - n * 1.8, 16 - n * 1.1, 5, 'sun', .42);
  for (let n = 0; n < 3; n++) {
    const i = 10.5 + n * .45;
    H.line(R, [H.p(i, .45, 3.9), H.p(i, .45, .55)], 'sun', 1.1);
    oval(H, R, ...H.p(i, .45, 3.92), 4, 4, 'paper', .9);
    box(H, R, i - .08, .4, .15, .16, .62 + n * .15, .4, 'blue', .85);
  }
  const [fx, fy] = H.p(7.4, 3.6, .59);
  for (let n = 0; n < 6; n++) { H.line(R, [[fx, fy], [fx + (n - 2) * 4, fy - 11 - n % 3 * 4]], 'teal', .9); H.dot(fx + (n - 2) * 4, fy - 11 - n % 3 * 4, 3.2, n % 2 ? 'sun' : 'paper', .9); }
  const [tx, ty] = H.p(3.1, 2.1, .65);
  H.line(R, [[tx, ty], [tx, ty - 43]], 'coral', 4);
  for (const [dx, dy, r] of [[-15, -38, 14], [5, -49, 18], [20, -34, 14]]) oval(H, R, tx + dx, ty + dy, r, r * .8, 'teal', .77);
  box(H, R, 8.5, 2, .95, .9, .56, .55, 'sun', .55);
  box(H,R,8.53,2.91,.89,.09,.67,.34,'coral',.7);
  for(const i of [8.62,9.22]) H.line(R,[H.p(i,2.94,.68),H.p(i,2.94,1)],'blue',1.4);
  H.line(R,[H.p(8.85,2.99,.82),H.p(9.1,2.99,.82)],'sun',1.5);
  for(let n=0;n<3;n++) {
    const i=10.45+n*.44;
    const [x,y]=H.p(i,.46,2.9);
    oval(H,R,x,y,5,5,'sun',.8);
    oval(H,R,x,y,2,2,'blue',.8);
    H.line(R,[H.p(i,.45,3.9),[x-4,y],[x-4,y+48]],'paper',.85);
  }
  const [caseX,caseY]=H.p(10.75,11.1,.06);
  shape(H,R,[[caseX-22,caseY],[caseX-17,caseY-12],[caseX+18,caseY-9],[caseX+25,caseY+4],[caseX+11,caseY+10],[caseX-16,caseY+7]],'coral',.75);
  shape(H,R,[[caseX-19,caseY-2],[caseX-15,caseY-9],[caseX+16,caseY-6],[caseX+20,caseY+3],[caseX+10,caseY+6],[caseX-14,caseY+4]],'blue',.85);
  violin(H,R,caseX,caseY+3,0,false);
  for(const dx of [-13,12]) H.line(R,[[caseX+dx,caseY+7],[caseX+dx+2,caseY+10]],'sun',1.5);
}

function performers(H, R, t) {
  H.at(5.45, 3.03, .6, () => {
    const [x, y] = H.p(5.45, 3.03, .6);
    const b = Math.sin(t * 2) * 1.6;
    creature(H, R, x, y, 'mouse', t, 1.08, 'paper');
    shape(H, R, [[x - 8, y - 28], [x + 9, y - 28], [x + 22, y + 2], [x - 21, y + 2]], 'coral', .88);
    for (let n = 0; n < 5; n++) stroke(H, R, [[x - 6 + n * 3, y - 23], [x - 17 + n * 8, y]], 'sun', .8);
    shape(H, R, [[x - 4, y - 46 + b], [x - 7, y - 57 + b], [x, y - 52 + b], [x + 5, y - 60 + b], [x + 10, y - 51 + b], [x + 15, y - 55 + b], [x + 12, y - 43 + b]], 'sun', .9);
    stroke(H, R, [[x - 9, y - 23], [x - 27, y - 30 - b], [x - 36, y - 41 - b]], 'paper', 3);
    stroke(H, R, [[x + 10, y - 23], [x + 27, y - 31 + b], [x + 33, y - 43 + b]], 'paper', 3);
  });
  H.at(7.25, 2.55, .6, () => {
    const [x, y] = H.p(7.25, 2.55, .6);
    creature(H, R, x, y, 'mouse', t, .84, 'teal');
    shape(H, R, [[x - 5, y - 28], [x - 25, y - 7], [x - 14, y + 3], [x + 4, y - 17]], 'coral', .8);
    H.line(R, [[x + 9, y - 23], [x + 26, y - 38 + Math.sin(t * 2) * 4]], 'paper', 3);
    H.line(R, [[x + 25, y - 38], [x + 36, y - 52]], 'sun', 1.4);
    sheet(H, R, 7.1, 2.65, 1.25, '', true);
  });
  H.at(3.55, 3.6, .6, () => {
    const [x, y] = H.p(3.55, 3.6, .65 + Math.max(0, Math.sin(t * 2.4)) * .1);
    creature(H, R, x, y, 'mouse', t, .7, 'sun');
    shape(H, R, [[x - 5, y - 17], [x - 21, y - 5], [x + 21, y - 5], [x + 6, y - 17]], 'paper', .92);
    for (let n = 0; n < 6; n++) H.dot(x - 15 + n * 6, y - 6, 1.7, 'coral', .9);
    stroke(H, R, [[x - 8, y - 22], [x - 20, y - 37], [x - 13, y - 46]], 'sun', 2.5);
    stroke(H, R, [[x + 8, y - 22], [x + 20, y - 36], [x + 13, y - 46]], 'sun', 2.5);
  });
  H.at(10.75, 4.96, 0, () => {
    creature(H, R, ...H.p(10.75, 4.96), 'mouse', t, .66, 'blue');
    const [x, y] = H.p(10.75, 4.96, .7);
    const pull = Math.sin(t * 1.3) * 5;
    stroke(H, R, [[x + 10, y - 15], [x + 24, y - 26 + pull], [x + 24, y + 7 + pull]], 'paper', 2);
    stroke(H, R, [H.p(10.08, 4.37, 4.26), [x + 24, y - 48], [x + 24, y + 25 + pull]], 'sun', 1.3);
  });
}

function live(H, R, t) {
  performers(H, R, t);
  for (const [i, j, ink] of [[2.6, 5.8, 'paper'], [4, 5.5, 'sun'], [5.35, 5.85, 'teal'], [6.9, 5.6, 'coral']]) H.at(i, j, .1, () => {
    const [x, y] = H.p(i, j, .45);
    creature(H, R, x, y, 'mouse', t, .57, ink);
    if (i === 4) violin(H, R, x + 11, y + 1, t, true);
    if (i === 5.35) violin(H, R, x + 13, y - 15, t + 1);
    if (i === 6.9) {
      stroke(H, R, [[x + 8, y - 21], [x + 24, y - 18], [x + 17, y - 6], [x + 8, y - 9], [x + 29, y - 15]], 'sun', 3);
      shape(H, R, [[x + 27, y - 19], [x + 38, y - 23], [x + 36, y - 10], [x + 27, y - 13]], 'sun', .85);
      for (let n = 0; n < 3; n++) H.line(R, [[x + 14 + n * 3, y - 17], [x + 14 + n * 3, y - 23]], 'paper', 1);
    }
  });
  H.at(8.65, 6.8, .1, () => {
    creature(H, R, ...H.p(8.65, 6.8, .35), 'mouse', t, .59, 'paper');
    const [x, y] = H.p(8.65, 6.5, .8);
    stroke(H, R, [[x - 14, y + 4], [x - 10, y - 7 + Math.sin(t * 5) * 2], [x - 2, y - 8]], 'paper', 2);
    stroke(H, R, [[x + 7, y + 7], [x + 13, y - 3 + Math.cos(t * 5) * 2], [x + 20, y - 2]], 'paper', 2);
  });
  H.at(5.7, 7.31, .16, () => {
    const [x, y] = H.p(5.7, 7.31, .16);
    creature(H, R, x, y, 'mouse', t, .75, 'blue');
    const b = Math.sin(t * 3.3) * 9;
    stroke(H, R, [[x - 7, y - 24], [x - 18, y - 33 - b], [x - 23, y - 46 - b]], 'paper', 2.5);
    stroke(H, R, [[x + 9, y - 24], [x + 19, y - 30 + b], [x + 28, y - 45 + b]], 'paper', 2.5);
    H.line(R, [[x + 27, y - 45 + b], [x + 37, y - 66 + b]], 'sun', 1.2);
    shape(H, R, [[x - 4, y - 28], [x, y - 25], [x + 4, y - 28], [x + 3, y - 21], [x, y - 24], [x - 4, y - 22]], 'paper', 1);
  });
  const patrons = [[2.7, 8.42, 'sun'], [4.05, 8.42, 'teal'], [6.9, 8.42, 'paper'], [8.25, 8.42, 'sun'], [2.7, 9.87, 'paper'], [4.05, 9.87, 'coral'], [6.9, 9.87, 'teal'], [8.25, 9.87, 'paper'], [2.7, 11.32, 'coral'], [6.9, 11.32, 'sun'], [8.25, 11.32, 'teal']];
  patrons.forEach(([i, j, ink], n) => H.at(i, j, .5, () => {
    const [x, y] = H.p(i, j, .52);
    creature(H, R, x, y, 'mouse', t + n, .49, ink);
    if (n % 4 === 0) sheet(H, R, i + .12, j + .16, .81, '', true);
    if (n === 6) {
      const b = Math.sin(t * .8) * .08;
      for (const dx of [-3, 4]) oval(H, R, x + dx + 7, y - 15 - b, 3.4, 2.7, 'blue', .96);
      H.line(R, [[x + 3, y - 12], [x + 3, y - 20]], 'sun', .8);
    }
    if (n === 9) {
      const f = Math.sin(t * 2) * 3;
      shape(H, R, [[x + 9, y - 9], [x + 7 + f, y - 25], [x + 17 + f, y - 26], [x + 24 + f, y - 19]], 'paper', .98);
      for (let k = 0; k < 4; k++) H.line(R, [[x + 9, y - 9], [x + 7 + f + k * 5, y - 24 + k]], 'coral', .7);
    }
  }));
  for (const [i, j, z, ink] of [[.75, 4.95, 2.4, 'coral'], [.75, 6.2, 2.4, 'paper'], [11.03, 1.55, 2.75, 'sun'], [11.03, 2.86, 2.75, 'paper']]) H.at(i, j, z, () => creature(H, R, ...H.p(i, j, z), 'mouse', t, .53, ink));
  H.at(9.8, 10.3, 0, () => {
    creature(H, R, ...H.p(9.8, 10.3), 'mouse', t, .67, 'teal');
    const [x, y] = H.p(9.8, 10.3, .93);
    shape(H, R, [[x - 5, y - 2], [x + 12, y - 2], [x + 9, y - 12], [x - 2, y - 12]], 'coral', .9);
    sheet(H, R, 9.99, 10.37, .65, 'OPERA', true);
  });
  H.at(4.5, 11.37, 0, () => {
    creature(H, R, ...H.p(4.5, 11.37), 'mouse', t, .58, 'paper');
    const [x, y] = H.p(4.5, 11.37, .55);
    stroke(H, R, [[x - 7, y - 1], [x - 19, y - 5], [x - 23, y - 10 + Math.sin(t * 2.1) * 2]], 'paper', 2);
  });
}

export default function enrich(room) {
  const detailed = world(room.id, room.title, { floor: 'blue', tone: .38, wall: 'blue', wallTone: .5, height: 4.2, pattern: 'boards', head: 60 }, (H, R) => {
    architecture(H, R);
    furnishings(H, R);
  }, live);
  return { ...room, under: detailed.under, live: detailed.live };
}
