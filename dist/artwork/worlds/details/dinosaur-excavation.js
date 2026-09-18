import { world, shape, oval, stroke, box, table, actor, bottle, ell, cycle } from '../common.js';

function bone(H, R, x, y, length = 18, angle = -.35, width = 3) {
  const dx = Math.cos(angle) * length * .5, dy = Math.sin(angle) * length * .5;
  H.line(R, [[x - dx, y - dy], [x + dx, y + dy]], 'blue', width + 2, { tone: .75, amp: .1 });
  H.line(R, [[x - dx, y - dy], [x + dx, y + dy]], 'paper', width, { tone: 1, amp: .08 });
  for (const s of [-1, 1]) oval(H, R, x + dx * s, y + dy * s, width * .75, width, 'paper', 1);
}

function tag(H, R, i, j, number, z = .22) {
  const [x, y] = H.p(i, j, z);
  shape(H, R, [[x - 7, y], [x + 8, y + 1], [x + 6, y - 11], [x - 5, y - 12]], 'sun', .85);
}

function tray(H, R, i, j, number, z = 1.12, ink = 'coral') {
  box(H, R, i, j, .72, .58, z, .1, ink, .5);
  shape(H, R, H.tile(i + .05, j + .05, .62, .48, z + .105), 'paper', .9);
  const [x, y] = H.p(i + .35, j + .26, z + .13);
  const kind = Number(number.slice(-1)) % 4;
  if (kind === 0) {
    oval(H, R, x, y, 6, 4, 'sun', .6);
    stroke(H, R, [[x + 4, y], [x + 2, y - 2], [x - 3, y - 2], [x - 4, y + 1], [x, y + 2], [x + 2, y], [x, y - 1]], 'blue', .65);
  } else if (kind === 1) bone(H, R, x, y, 13, -.25, 2.2);
  else if (kind === 2) shape(H, R, [[x - 5, y - 3], [x + 5, y - 3], [x + 1, y + 5]], 'paper', 1);
  else {
    H.line(R, [[x - 6, y + 3], [x + 6, y - 3]], 'teal', 1);
    for (let n = 0; n < 4; n++) stroke(H, R, [[x - 5 + n * 3, y - n], [x - 4 + n * 3, y + 2 - n], [x - 1 + n * 3, y + 3 - n]], 'teal', .7);
  }
}

function brush(H, R, x, y, angle = -.5, size = 1) {
  const a = [x + Math.cos(angle) * 15 * size, y + Math.sin(angle) * 15 * size];
  H.line(R, [[x, y], a], 'coral', 2.2 * size, { tone: .95 });
  for (let n = -2; n <= 2; n++) H.line(R, [a, [a[0] + Math.cos(angle) * 6 * size + Math.sin(angle) * n * size, a[1] + Math.sin(angle) * 6 * size - Math.cos(angle) * n * size]], 'blue', .7, { tone: .7 });
}

function bucket(H, R, i, j, ink = 'teal') {
  const [x, y] = H.p(i, j, .06);
  shape(H, R, [[x - 8, y - 12], [x + 8, y - 12], [x + 6, y + 2], [x - 6, y + 2]], ink, .65);
  oval(H, R, x, y - 12, 8, 3.3, 'blue', .55);
  stroke(H, R, [[x - 7, y - 10], [x - 6, y - 22], [x + 6, y - 22], [x + 7, y - 10]], 'blue', .7);
}

function notebook(H, R, i, j, z, w = .7, d = .55) {
  shape(H, R, H.tile(i, j, w, d, z), 'paper', 1);
  H.line(R, [H.p(i + w * .46, j, z), H.p(i + w * .46, j + d, z)], 'blue', .6);
  for (let n = 1; n < 5; n++) H.line(R, [H.p(i + .08, j + n * d / 5, z), H.p(i + w * .38, j + n * d / 5, z)], 'blue', .55, { tone: .6 });
}

function tent(H, R) {
  const a = H.p(8.3, .6), b = H.p(11.3, .6), c = H.p(11.3, 2.7), d = H.p(8.3, 2.7);
  const u = H.p(9.8, .6, 2.2), v = H.p(9.8, 2.7, 2.2);
  shape(H, R, [a, u, v, d], 'teal', .58);
  shape(H, R, [u, b, c, v], 'paper', .8);
  shape(H, R, [d, v, c], 'sun', .65);
  shape(H, R, [H.p(9, 2.71), H.p(9.8, 2.71, 1.65), H.p(10.55, 2.71)], 'blue', .75);
  for (let n = 1; n < 5; n++) H.line(R, [H.p(8.3 + n * .3, .6, n * .44), H.p(8.3 + n * .3, 2.7, n * .44)], 'blue', .6, { tone: .45 });
  for (const [i, j, x, y] of [[8.3, .6, 7.85, .35], [8.3, 2.7, 7.65, 3.25], [11.3, 2.7, 11.65, 3.1]]) {
    H.line(R, [H.p(i, j, 1), H.p(x, y, .08)], 'blue', .7);
    H.line(R, [H.p(x, y, 0), H.p(x, y, .22)], 'coral', 2);
  }

  box(H, R, 10.1, 3, .75, .55, 0, .5, 'teal');

  bottle(H, R, ...H.p(11.35, 3.6, .06), 'teal', .42);
}

function skeleton(H, R) {
  for(const [i,j,w,d] of [[3.68,6.12,.75,.47],[6.05,6.48,.9,.54],[5.55,4.02,.6,.6]]) {
    shape(H,R,H.tile(i-.1,j-.1,w+.2,d+.2,.145),'coral',.6);
    shape(H,R,H.tile(i,j,w,d,.15),'paper',.88);
    for(let n=0;n<3;n++) H.line(R,[H.p(i+.08+n*.2,j,.16),H.p(i+.11+n*.2,j+d,.16)],'teal',.6);
  }

  for (let n = 0; n < 9; n++) {
    const [x, y] = H.p(3.4 + n * .43, 5.3, .16);
    oval(H, R, x, y, 4.7, 3.1, 'paper', 1);
    if (n > 1 && n < 8) {
      const reach = 22 - Math.abs(4.5 - n) * 2.7;
      stroke(H, R, [[x, y], [x - reach, y - 10], [x - reach - 8, y + 1], [x - 13, y + 11]], 'blue', 4.8);
      stroke(H, R, [[x, y], [x - reach, y - 10], [x - reach - 8, y + 1], [x - 13, y + 11]], 'paper', 3.2);
      stroke(H, R, [[x, y], [x + 15, y + 7], [x + 13, y + 22], [x + 4, y + 24]], 'blue', 4.8);
      stroke(H, R, [[x, y], [x + 15, y + 7], [x + 13, y + 22], [x + 4, y + 24]], 'paper', 3.2);
    }
  }
  for (let n = 0; n < 7; n++) {
    const [x, y] = H.p(3.35 - n * .23, 5.3 + Math.sin(n * .35) * .3, .15);
    bone(H, R, x, y, 9 - n * .6, -.4, 2.3 - n * .15);
  }
  const [x, y] = H.p(7.62, 5.3, .18);
  shape(H, R, [[x - 15, y - 6], [x - 5, y - 20], [x + 14, y - 15], [x + 30, y - 3], [x + 28, y + 8], [x + 8, y + 14], [x - 7, y + 6]], 'paper', 1);
  stroke(H,R,[[x-9,y+7],[x+4,y+19],[x+23,y+16],[x+30,y+8]],'blue',4.5);
  stroke(H,R,[[x-9,y+7],[x+4,y+19],[x+23,y+16],[x+30,y+8]],'paper',3);
  H.line(R,[[x-7,y-12],[x-2,y-4],[x-8,y+4]],'coral',.85);
  H.line(R,[[x+12,y-12],[x+14,y-5],[x+23,y+2]],'coral',.85);
  oval(H, R, x + 3, y - 7, 6, 5, 'blue', .8);
  oval(H, R, x + 24, y - 1, 2.5, 2, 'blue', .8);
  for (let n = 0; n < 6; n++) H.line(R, [[x + 3 + n * 4, y + 8], [x + 5 + n * 4, y + 12]], 'blue', .85);
  for (const [i, j, len, angle] of [[4, 6.25, 25, .5], [4.7, 7.05, 21, -.4], [6.25, 6.6, 25, .8], [6.65, 7.6, 20, -.15], [5.85, 4.25, 23, -.9], [6.25, 3.6, 17, .2]]) bone(H, R, ...H.p(i, j, .16), len, angle, 3.8);
  for (const [i, j] of [[4.95, 7.35], [6.95, 7.75]]) for (let n = 0; n < 3; n++) bone(H, R, ...H.p(i + n * .1, j + n * .09, .16), 9, .2 + n * .3, 1.8);
}

export default function enrich(room) {
  const detailed = world(room.id, room.title, { floor: 'sun', tone: .3, wall: 'coral', wallTone: .24, wallStyle: 'brick', height: 1.1 }, (H, R) => {

    for (const [i,j,w,d,h] of [[.05,.08,7.6,.65,1.7],[.08,.7,.6,2.4,1.35],[.08,8.9,.65,2.9,.85]]) {
      box(H,R,i,j,w,d,0,h,'coral',.46);
      for (let z=.17;z<h;z+=.25) {
        stroke(H,R,[H.p(i,j+d+.01,z),H.p(i+w*.25,j+d+.01,z+.05),H.p(i+w*.7,j+d+.01,z-.04),H.p(i+w,j+d+.01,z+.02)],z% .5>.2?'sun':'paper',1.4,.65);
      }
    }
    for(const i of [1,3.65,7.4]) {
      box(H,R,i,.82,.12,.13,0,1.5,'teal',.8);
      H.line(R,[H.p(i,.9,.25),H.p(i+.6,1.55,.04)],'sun',2);
    }
    box(H,R,.88,.78,6.8,.18,1.4,.12,'teal',.7);
    for(let n=0;n<4;n++) {
      const [x,y]=H.p(1.3+n*1.4,.77,.88);
      shape(H,R,[[x-12,y-6],[x+4,y-14],[x+14,y],[x+3,y+9],[x-11,y+4]],'sun',.65);
      bone(H,R,x,y,15+n*2,-.45,2.5);
    }
    box(H, R, 2.15, 3.1, 6.7, 5.6, 0, .12, 'coral', .4);
    shape(H, R, H.tile(2.4, 3.35, 6.2, 5.1, .125), 'sun', .42);
    for (let i = 2.4; i < 8.7; i += 1.04) H.line(R, [H.p(i, 3.35, .14), H.p(i, 8.45, .14)], 'paper', .6, { tone: .9 });
    for (let j = 3.35; j < 8.5; j += 1.02) H.line(R, [H.p(2.4, j, .14), H.p(8.6, j, .14)], 'paper', .6, { tone: .9 });

    for (const [i, j, number] of [[3.25, 4.8, '01'], [4.45, 4.65, '02'], [6.8, 4.95, '03'], [8.1, 5.8, '04'], [4.5, 7.7, '05'], [7.15, 8, '06'], [6.3, 3.2, '07']]) tag(H, R, i, j, number);
    for (const [i,j,w,d] of [[2.22,3.16,2,.25],[7.3,6.5,1.45,.42],[2.27,6.6,.37,1.4]]) {
      box(H,R,i,j,w,d,.13,.22,'coral',.55);
      shape(H,R,H.tile(i+.04,j+.04,w-.08,d-.08,.36),'sun',.48);
      for(let n=0;n<4;n++) H.line(R,[H.p(i+n*w/4,j+d,.2),H.p(i+(n+.55)*w/4,j+d,.28)],'paper',.9);
    }
    skeleton(H, R);
    for (const i of [2.15, 8.85]) for (const j of [3.1, 8.7]) {
      box(H, R, i, j, .08, .08, 0, .52, 'blue');
      oval(H, R, ...H.p(i + .04, j + .04, .55), 3, 2, 'coral', .9);
    }
    for (let n = 0; n < 8; n++) {
      box(H, R, 2.15 + n * .8, 8.77, .7, .23, 0, .13, 'paper', .8);
      H.line(R, [H.p(2.25 + n * .8, 8.8, .14), H.p(2.25 + n * .8, 8.97, .14)], 'blue', .65);
    }
    for(const i of [.65,3.6]) H.line(R,[H.p(i,.75,.14),H.p(i,1.8,.82)],'sun',1.4);
    box(H,R,.68,.78,3.08,.93,.19,.1,'coral',.62);
    for(let n=0;n<3;n++) {
      box(H,R,.8+n*.91,.82,.8,.74,.3,.35,'paper',.85);
      H.line(R,[H.p(1.03+n*.91,1.57,.47),H.p(1.39+n*.91,1.57,.47)],'teal',2);
    }
    table(H, R, .55, .65, 3.35, 1.3, .85, 'teal');
    for (let n = 0; n < 4; n++) tray(H, R, .7 + n * .77, .75, `F${n + 1}`, .98, n % 2 ? 'sun' : 'coral');
    for (let n = 0; n < 4; n++) bottle(H, R, ...H.p(.85 + n * .45, 1.7, 1), ['teal', 'sun', 'coral', 'teal'][n], .28);
    notebook(H, R, 2.7, 1.35, .99, .9, .4);
    for (let n = 0; n < 3; n++) brush(H, R, ...H.p(3.15 + n * .15, 1.7, 1), -.45, .48);

    box(H, R, .75, 2.3, .75, .65, 0, .55, 'coral', .55);
    box(H, R, .8, 2.34, .65, .54, .55, .08, 'paper', 1);
    bone(H, R, ...H.p(1.13, 2.6, .67), 17, .4, 3);

    tent(H, R);
    box(H,R,9.08,2.53,1.3,.65,.03,.1,'teal',.7);
    for(let n=0;n<4;n++) H.line(R,[H.p(9.2+n*.24,2.57,.14),H.p(9.2+n*.24,3.14,.14)],'sun',.7);
    for (const i of [8.5,11.1]) H.line(R,[H.p(i,.68,.05),H.p(9.8,.68,2.18)],'sun',1.5);
    const [lanX,lanY]=H.p(9.8,2.76,1.48);
    H.line(R,[H.p(9.8,2.7,2.18),[lanX,lanY]],'blue',1);
    shape(H,R,[[lanX-6,lanY],[lanX+6,lanY],[lanX+8,lanY+17],[lanX-8,lanY+17]],'sun',.88);
    H.glow(lanX,lanY+12,27,20,'sun',.25);
    const map = H.tile(4.9, .55, 2.15, 1.35, .25);
    shape(H, R, map, 'paper', .95);
    for (let n = 1; n < 5; n++) H.line(R, [H.p(4.9 + n * .42, .55, .26), H.p(4.9 + n * .42, 1.9, .26)], 'teal', .6);
    for (let n = 1; n < 4; n++) H.line(R, [H.p(4.9, .55 + n * .33, .26), H.p(7.05, .55 + n * .33, .26)], 'teal', .6);
    oval(H, R, ...H.p(5.95, 1.25, .27), 17, 7, 'coral', .3);
    for (const [i, j] of [[4.92, .57], [6.98, .62], [5, 1.85], [6.98, 1.8]]) oval(H, R, ...H.p(i, j, .3), 3.5, 2, 'blue', .5);
    box(H, R, 6.55, 2.05, .55, .4, 0, .32, 'coral');

    bucket(H, R, .65, 4.7, 'coral');
    bucket(H, R, 1.45, 5.3, 'teal');
    for (let n = 0; n < 3; n++) {
      const [x, y] = H.p(.4 + n * .42, 3.65 + n * .23, .05);
      H.line(R, [[x, y], [x + 14, y - 35]], 'blue', 2);
      shape(H, R, [[x - 4, y - 2], [x + 5, y + 2], [x + 2, y + 10], [x - 3, y + 11]], n === 1 ? 'teal' : 'coral', .65);
      oval(H, R, x + 14, y - 37, 4, 3, 'sun', .7);
    }
    for (const [i, j] of [[.65, 6.8], [1.75, 6.8], [.65, 8], [1.75, 8]]) box(H, R, i, j, .08, .08, 0, .95, 'blue');
    box(H, R, .6, 6.75, 1.25, 1.4, .18, .08, 'coral', .5);
    for (let n = 0; n < 6; n++) oval(H, R, ...H.p(.85 + (n % 3) * .27, 7.15 + Math.floor(n / 3) * .5, .29), 3, 2, 'sun', .7);
    bucket(H, R, .65, 8.75, 'teal');
    table(H, R, 1.8, 9.65, 3.85, 1.45, .95, 'teal');
    for (let n = 0; n < 4; n++) tray(H, R, 1.97 + n * .85, 9.8, `027-${n + 8}`, 1.08);
    notebook(H, R, 4.25, 10.45, 1.09, 1.05, .48);
    for (let n = 0; n < 3; n++) brush(H, R, ...H.p(2.1 + n * .32, 10.6, 1.12), -.65, .6);
    box(H,R,1.87,9.74,3.62,1.18,.48,.08,'coral',.7);
    for(const i of [2.05,3.2,4.4]) {
      box(H,R,i,10.97,.85,.3,.63,.23,'sun',.6);
      H.line(R,[H.p(i+.25,11.28,.75),H.p(i+.6,11.28,.75)],'blue',1.6);
    }
    const [mx, my] = H.p(3.6, 10.65, 1.15);
    H.outline(R, ell(mx, my, 6, 4.5), 'blue', 1.6);
    H.line(R, [[mx - 5, my + 4], [mx - 12, my + 10]], 'coral', 2.8);

    for (let n = 0; n < 4; n++) box(H, R, 2.1 + n * .77, 10, .66, .74, 0, .4, n % 2 ? 'sun' : 'coral', .45);
    box(H, R, 5.5, 9.55, .55, .65, 0, .45, 'sun');
    for (const [i, j, z] of [[9.3, 4.25, 0], [11.25, 4.25, 0], [10.3, 6.4, 0]]) H.line(R, [H.p(i, j, z), H.p(10.2, 4.95, 2.9)], 'blue', 4, { tone: .85 });
    const [hx, hy] = H.p(10.2, 4.95, 2.9);
    oval(H, R, hx, hy, 7, 7, 'sun', .9);
    oval(H, R, hx, hy, 3, 3, 'blue', .8);
    for(const [i,j] of [[9.3,4.25],[11.25,4.25],[10.3,6.4]]) {
      box(H,R,i-.18,j-.16,.4,.35,0,.12,'sun',.7);
      H.line(R,[H.p(i-.2,j-.16,.14),H.p(i+.17,j+.15,.14)],'blue',1.1);
    }
    H.line(R,[H.p(9.8,4.5,.85),H.p(10.85,4.5,.85)],'coral',2);
    const [winX,winY]=H.p(10.9,4.5,.9);
    oval(H,R,winX,winY,10,10,'teal',.8);
    oval(H,R,winX,winY,6,6,'sun',.8);
    H.line(R,[[winX,winY],[winX+16,winY+5],[winX+16,winY+13]],'blue',2);
    stroke(H,R,[H.p(10.2,4.95,2.9),H.p(10.9,4.5,1),H.p(10.9,4.5,.9)],'sun',1.2);
    box(H, R, 10.35, 6.7, .85, .7, 0, .37, 'coral');

    for (let n = 0; n < 3; n++) oval(H, R, ...H.p(11.15, 7.8 + n * .24, .06), 8, 4, 'paper', .9);
    box(H, R, 9.1, 9.5, 1.8, 1.05, .35, .18, 'teal');
    for (const i of [9.25, 10.65]) for (const j of [9.6, 10.5]) oval(H, R, ...H.p(i, j, .17), 6, 7, 'blue', .8);
    for (const i of [9.1, 10.8]) H.line(R, [H.p(i, 10.6, .55), H.p(i, 11.35, .95)], 'blue', 2);
    for (let n = 0; n < 3; n++) {
      box(H, R, 9.2 + n * .53, 9.65, .47, .7, .53, .45, n % 2 ? 'sun' : 'coral', .5);
    }
    const [sx, sy] = H.p(7.8, 10.55, 1.25);
    for (const [i, j] of [[7.35, 10.4], [8.1, 10.3], [7.8, 11.1]]) H.line(R, [H.p(i, j), [sx, sy]], 'blue', 1.7);
    box(H, R, 7.52, 10.37, .58, .35, 1.28, .28, 'sun');
    oval(H, R, sx + 9, sy - 7, 5, 5, 'blue', .85);
    H.line(R, [H.p(8.6, 8.4, .1), H.p(8.6, 8.4, 1.2)], 'paper', 3);
    for (let n = 0; n < 6; n++) H.line(R, [H.p(8.6, 8.4, .2 + n * .17), H.p(8.6, 8.4, .29 + n * .17)], 'coral', 3);
  }, (H, R, t) => {
    actor(H, R, 3.8, 2.6, t, 'hold', { hat: true, face: 'nw', shirt: ['coral', .65] }, 0, .8);
    actor(H, R, 5.7, 8.1, t, 'kneel', { hat: true, shirt: ['teal', .7] }, 0, .82);
    const [bx, by] = H.p(5.95, 7.55, .22);
    const sweep = Math.sin(t * 2.8) * 6;
    brush(H, R, bx - 17 + sweep, by - 13, .4, .82);
    bone(H, R, bx + 6, by + 1, 15, -.4, 2.7);
    for (let n = 0; n < 5; n++) {
      const u = cycle(t + n * .25, 1.5);
      H.opacity((1 - u) * .7, () => H.dot(bx + 12 + u * 14 + n * 2, by + 3 - u * 9, 1, 'sun'));
    }
    actor(H, R, 1.95, 7.05, t, 'hold', { hat: true, face: 'sw', shirt: ['sun', .75] }, 0, .78);
    const shift = Math.sin(t * 5) * .06;
    box(H, R, .55 + shift, 6.65, 1.3, 1.4, .95, .1, 'coral', .65);
    shape(H, R, H.tile(.64 + shift, 6.74, 1.12, 1.22, 1.06), 'paper', .65);
    for (let n = 0; n < 7; n++) {
      H.line(R, [H.p(.67 + shift + n * .16, 6.75, 1.065), H.p(.67 + shift + n * .16, 7.95, 1.065)], 'blue', .45, { tone: .55 });
      H.line(R, [H.p(.65 + shift, 6.75 + n * .18, 1.065), H.p(1.77 + shift, 6.75 + n * .18, 1.065)], 'blue', .45, { tone: .55 });
    }
    bone(H, R, ...H.p(1.1 + shift, 7.2, 1.1), 11, -.4, 2);
    for (let n = 0; n < 9; n++) {
      const u = cycle(t * 1.8 + n * .13, 1.1);
      H.dot(...H.p(.8 + n % 3 * .25, 7 + Math.floor(n / 3) * .3, .93 - u * .58), .8, 'sun', .8);
    }
    actor(H, R, 5.65, 10.4, t, 'write', { face: 'sw', glasses: true, shirt: ['coral', .65] }, .43, .82);
    actor(H, R, 8.45, 11.3, t, 'think', { hat: true, face: 'nw', shirt: ['teal', .65] }, 0, .8);
    actor(H, R, 11.1, 5.6, t, 'hold', { face: 'sw', hat: true, shirt: ['coral', .7] }, 0, .78);
    const lift = .9 + Math.sin(t * .62) * .2;
    const [hx, hy] = H.p(10.2, 4.95, 2.9), [px, py] = H.p(10.2, 5.1, lift);
    H.line(R, [[hx, hy + 5], [px, py - 19]], 'blue', 1.1);
    H.line(R, [[hx + 5, hy + 5], H.p(11.05, 5.4, .9)], 'blue', 1);
    shape(H, R, [[px - 21, py - 3], [px - 14, py - 14], [px + 8, py - 15], [px + 23, py - 4], [px + 13, py + 10], [px - 13, py + 8]], 'paper', 1);
    for (const dx of [-12, 10]) stroke(H, R, [[px + dx, py + 9], [px + dx - 2, py - 10], [px, py - 20]], 'teal', 1.6);
    for (let n = 0; n < 4; n++) H.line(R, [[px - 14 + n * 8, py - 8], [px - 12 + n * 8, py + 5]], 'blue', .45, { tone: .4 });
  });
  return { ...room, under: detailed.under, live: detailed.live };
}
