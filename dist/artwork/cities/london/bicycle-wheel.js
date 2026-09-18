import { world, shape, stroke, oval, ell, TAU, wallPt, cycle } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, benchFrame, vessel, drape } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { wallRack, hangingRail, taskLight, floorShadow, recessedFrame, caster } from '../joinery.js';

const smooth = v => { const a = Math.max(0, Math.min(1, v)); return a * a * (3 - 2 * a); };
const base = FIGURES.clips.idle.keys[0][1];
const workerClip = 'londonWheelMechanic';
const pupilClip = 'londonWheelApprentice';
for (const name of [workerClip, pupilClip]) FIGURES.clips[name] = { dur: 24, keys: [[0, { ...base }], [1, { ...base }]] };
function person(H, R, i, j, name, target, shirt, head = 8) {
  const [x, y] = H.p(i, j), scale = 1.8;
  const q = { ...base, head, al: 20, el: 40 };
  const dx = (target[0] - x) / scale - 5.2, dy = (target[1] - y) / scale + 32.5;
  const a = 4.368, b = 4.2, len = Math.min(a + b - .001, Math.max(.2, Math.hypot(dx, dy)));
  const bend = Math.acos((len * len - a * a - b * b) / (2 * a * b));
  q.ar = (Math.atan2(dx, dy) - Math.atan2(b * Math.sin(bend), a + b * Math.cos(bend))) * 180 / Math.PI;
  q.er = bend * 180 / Math.PI;
  FIGURES.clips[name].keys = [[0, q], [1, q]];
  FIGURES.draw(H, R, { who: 'adult', x, y, t: 0, phase: 0, clip: name, scale, face: 'se', ground: [x, y], opts: { shirt: [shirt, .7], apron: ['paper', .85], hairStyle: name === pupilClip ? 'curly' : 'short' } });
}
function wheel(H, R, x, y, radius, turn = 0, rear = false) {
  H.outline(R, ell(x, y, radius, radius * .9), 'blue', rear ? 5 : 6, { tone: .92, amp: .13 });
  H.outline(R, ell(x, y, radius - 4, (radius - 4) * .9), 'teal', 2.3, { tone: .68, amp: .1 });
  H.outline(R, ell(x, y, radius - 7, (radius - 7) * .9), 'paper', 1.6, { tone: 1, amp: .04 });
  for (let n = 0; n < 28; n++) {
    const a = TAU * n / 28 + turn, h = a + (n % 2 ? .4 : -.4);
    H.line(R, [[x + Math.cos(h) * 5, y + Math.sin(h) * 3], [x + Math.cos(a) * (radius - 7), y + Math.sin(a) * (radius - 7) * .9]], n % 3 ? 'blue' : 'paper', .65, { tone: .65, amp: .03 });
  }
  oval(H, R, x, y, 7, 5, 'sun', .75);
  oval(H, R, x, y, 2.8, 2.4, 'blue', .8);
  const valve = [x + Math.cos(turn + Math.PI / 2) * (radius - 8), y + Math.sin(turn + Math.PI / 2) * (radius - 8) * .9];
  H.line(R, [valve, [x + Math.cos(turn + Math.PI / 2) * (radius - 16), y + Math.sin(turn + Math.PI / 2) * (radius - 16) * .9]], 'blue', 1.8);
  H.dot(...valve, 2.6, 'coral', 1, { knock: true });
}
function frame(H, R, x, y, size = 1, ink = 'coral') {
  const P = (a, b) => [x + a * size, y + b * size];
  for (const points of [[[-33, 17], [-12, -17], [5, 17], [-33, 17]], [[-12, -17], [27, -18], [5, 17]], [[27, -18], [38, 17]], [[23, -26], [33, -27], [35, -21]], [[-12, -17], [-15, -27]]]) {
    H.line(R, points.map(([a, b]) => P(a, b)), 'blue', 3.5 * size);
    H.line(R, points.map(([a, b]) => P(a, b)), ink, 2 * size);
  }
  H.line(R, [P(-22, -28), P(-8, -28)], 'blue', 4 * size);
  oval(H, R, ...P(5, 17), 5 * size, 4 * size, 'sun', .7);
}
const room = world('london-bicycle-wheel', 'The wheel holds the light', { wall: false, floor: 'paper', tone: .55, head: 45 }, (H, R) => {
  for (let i = 0; i < 12; i += 1.5) for (let j = 0; j < 12; j += 1.6) surface(H, R, H.tile(i + .02, j + .02, 1.46, 1.56, .015), 'blue', (i + j) % 3 < 1 ? .14 : .06, .45);
  masonry(H, R, 'nw', 0, 12, 0, 3.65, 'coral', .25);
  masonry(H, R, 'ne', 0, 12, 0, 3.55, 'paper', .8);
  for (const u of [.4, 11.35]) {
    timber(H, R, .12, u, .45, .36, .04, 3.59, 'paper');
    timber(H, R, u, .12, .36, .45, .04, 3.49, 'paper');
  }
  bentTube(H, R, [[.36, 11.45, 3.37], [.36, .4, 3.37], [11.55, .4, 3.37], [11.55, .4, 1.26]], 2.8, 'teal');
  for (const i of [1.7, 4.9, 8.2, 10.5]) metal(H, R, i, .32, .12, .15, 3.28, .16, 'sun');
  recessedFrame(H, R, 'ne', 1.0, 3.65, 1.69, 1.43, 'sun', Q => {
    surface(H, R, [Q(.13,.13),Q(3.52,.13),Q(3.52,1.3),Q(.13,1.3)], 'teal', .5, .6);
    for (let n = 0; n < 6; n++) {
      const u = .44 + n * .54, h = .45 + n % 3 * .2;
      H.line(R, [Q(u,1.13),Q(u,1.2)], 'sun', 2);
      H.line(R, [Q(u,1.03),Q(u,1.03-h)], 'paper', 2.6);
      const [x,y] = Q(u,1.03-h);
      if (n < 3) { H.outline(R,ell(x,y,4.5,4.2),'blue',2.3); H.line(R,[[x-2,y-4],[x+2,y-4]],'teal',2); }
      else { H.line(R,[[x-5,y-4],[x-3,y+2],[x+3,y+2],[x+5,y-4]],'sun',2); }
    }
  });
  const P = (u, z) => wallPt(H, 'nw', u, z, -.18);
  const arch = [P(2.6, .35), P(9.2, .35), P(9.2, 2.15)];
  for (let n = 0; n <= 32; n++) { const a = Math.PI * n / 32; arch.push(P(5.9 + Math.cos(a) * 3.3, 2.15 + Math.sin(a) * 1.4)); }
  surface(H, R, arch, 'blue', .65, 1.5);
  H.outline(R, arch, 'sun', 8, { tone: .42, amp: .1 });
  for (let n = 0; n < 17; n++) { const a = n * Math.PI / 16; H.line(R, [P(5.9 + Math.cos(a) * 3.3, 2.15 + Math.sin(a) * 1.4), P(5.9 + Math.cos(a) * 3.52, 2.15 + Math.sin(a) * 1.57)], 'blue', .8); }
  for (let n = 0; n < 7; n++) H.line(R, [P(4.4 + n * .42, 2.48), P(4.4 + n * .42, 3.0)], 'teal', 3);
  timber(H, R, .05, 2.5, .65, 6.9, .34, .14, 'sun');
  for (let n = 0; n < 3; n++) { const [x, y] = H.p(.48, 4 + n * 1.25, 1.2); wheel(H, R, x, y, 26, n * .4, true); }
  wallRack(H, R, 'ne', 7.35, 4.05, .45, 2.75, 3, 'teal', (Q, z, row) => {
    if (row === 0) for (let n = 0; n < 5; n++) { const u = .2 + n * .72; surface(H, R, [Q(u, z + .04), Q(u + .58, z + .04), Q(u + .58, z + .53), Q(u, z + .53)], n === 2 ? 'coral' : 'sun', .36); H.line(R, [Q(u + .19, z + .28), Q(u + .39, z + .28)], 'blue', 1.4); }
    if (row === 1) for (let n = 0; n < 3; n++) { const [x, y] = Q(.6 + n * 1.18, z + .42); shape(H, R, [[x - 12, y], [x + 13, y + 2], [x + 8, y - 7], [x - 6, y - 10]], n === 1 ? 'coral' : 'blue', .65); H.line(R, [[x - 8, y - 2], [x + 5, y - 5]], 'paper', .8); }
    if (row === 2) for (let n = 0; n < 4; n++) { const [x, y] = Q(.48 + n * .95, z + .38); for (let k = 0; k < 3; k++) H.outline(R, ell(x, y, 9 + k * 2, 6 + k), n % 2 ? 'coral' : 'blue', .7); }
  });
  cabinetFrame(H, R, 5.0, .36, 2.15, 1.15, .1, .76, 2, 'teal', (i,j,w,d,z,h,n) => {
    surface(H,R,H.faceI(i,j+d,w,.22,.7),'sun',.45,.65);
    H.line(R,[H.p(i+.2,j+d+.01,.48),H.p(i+w-.2,j+d+.01,.48)],'blue',1.6);
    if(n===1) drape(H,R,i+.08,j+.2,w-.16,d-.16,.81,.25,'paper');
  });
  const [fx, fy] = H.p(6.5, .5, 1.9); frame(H, R, fx, fy, 1.0, 'coral');
  wheel(H, R, fx - 33, fy + 17, 23, .3, true);
  wheel(H, R, fx + 38, fy + 17, 23, .5, true);
  frame(H, R, fx, fy, 1, 'coral');
  H.line(R, [[fx - 29, fy + 20], [fx + 4, fy + 22], [fx + 8, fy + 13], [fx - 29, fy + 14]], 'blue', 1.1);
  H.line(R, [[fx + 5, fy + 17], [fx + 15, fy + 24], [fx + 23, fy + 24]], 'blue', 2);
  bentTube(H, R, [[5.6, .15, 3.15], [5.6, .4, 2.75], [5.75, .52, 2.65]], 2, 'blue');
  const [mx, my] = H.p(9.0, .45, 3.53); frame(H, R, mx, my, .28, 'sun');
  cabinetFrame(H, R, 1.05, .8, 3.65, 1.21, .16, .71, 3, 'teal', (i,j,w,d,z,h,n) => {
    if(n<2) { surface(H,R,H.faceI(i,j+d,w,.23,.7),'sun',.52,.6); H.line(R,[H.p(i+.28,j+d+.01,.47),H.p(i+w-.28,j+d+.01,.47)],'blue',1.7); }
    else { vessel(H,R,i+.4,j+.55,.24,9,15,'coral',false); H.line(R,[H.p(i+.4,j+.55,.73),H.p(i+.48,j+.53,.9)],'sun',2); }
  });
  benchFrame(H, R, 1.0, .65, 3.9, 1.5, 1.12, 'sun');
  vessel(H, R, 1.55, 1.22, 1.14, 10, 13, 'teal');
  for (let n = 0; n < 4; n++) H.line(R, [H.p(1.55, 1.22, 1.35), H.p(1.45 + n * .08, 1.17, 1.85)], 'blue', 1.2);
  metal(H, R, 2.2, 1, 1.4, .72, 1.13, .09, 'blue');
  for (let n = 0; n < 8; n++) H.outline(R, ell(...H.p(2.4 + n * .13, 1.32, 1.25), 2.4, 1.5), 'sun', 1.0);
  drape(H, R, 3.9, 1.13, .58, .74, 1.15, .5, 'paper');
  taskLight(H, R, 2.8, .94, 1.14, 'coral', 1.1);
  const service = H.p(4.2, 1.38, 1.2);
  H.outline(R, ell(service[0],service[1],8,5),'blue',1.5);
  H.line(R,[[service[0]+5,service[1]-2],[service[0]+16,service[1]-8]],'sun',2);
  floorShadow(H, 3.1, 3.9, 4.25, 3.45, .13);
  for (const x of [4.0, 6.2]) { metal(H, R, x, 4.45, .22, 2.1, .04, .13, 'teal'); metal(H, R, x + .04, 5.12, .14, .2, .17, 1.66, 'teal'); }
  timber(H, R, 6.15, 6.27, .37, .4, .025, .065, 'sun');
  metal(H, R, 4.03, 5.14, 2.35, .16, .15, .14, 'teal');
  const c = H.p(5.1, 5.12, 1.95);
  for (const dx of [-35, 35]) { H.line(R, [[c[0] + dx, c[1] + 56], [c[0] + dx, c[1] + 1], [c[0] + Math.sign(dx) * 8, c[1]]], 'blue', 5); H.line(R, [[c[0] + dx - 1, c[1] + 53], [c[0] + dx - 1, c[1] + 2]], 'paper', 1); oval(H, R, c[0] + dx, c[1] + 1, 4, 3, 'sun', .8); }
  metal(H, R, 4.37, 5.55, 1.59, .72, .5, .1, 'teal');
  surface(H,R,H.tile(4.5,5.66,1.33,.48,.62),'blue',.75,.6);
  for (let n=0;n<4;n++) { const [x,y]=H.p(4.7+n*.3,5.85,.65); oval(H,R,x,y,3.4,2,'sun',.85); }
  const gauge=H.p(6.23,5.33,1.31);
  H.line(R,[[gauge[0]-12,gauge[1]],[gauge[0]+12,gauge[1]]],'blue',3);
  oval(H,R,gauge[0]+13,gauge[1],6,7,'coral',.7);
  for(let k=0;k<5;k++) H.line(R,[[gauge[0]-8+k*4,gauge[1]-3],[gauge[0]-8+k*4,gauge[1]+3]],'paper',.7);
  cabinetFrame(H, R, 7.9, 8.55, 2.7, 1.5, .08, .71, 2, 'sun', (i,j,w,d,z,h,n) => {
    if(n===0) { surface(H,R,H.faceI(i,j+d,w,.19,.63),'teal',.6,.7); H.line(R,[H.p(i+.3,j+d+.01,.4),H.p(i+w-.3,j+d+.01,.4)],'sun',2); }
    else { for(let q=0;q<3;q++) H.line(R,[H.p(i+.15,j+.3,.2+q*.12),H.p(i+w-.1,j+.55,.2+q*.12)],'blue',3); }
  });
  timber(H,R,7.83,8.49,2.84,1.62,.72,.09,'sun');
  const [sx, sy] = H.p(8.62, 9.25, .82);
  H.line(R, [[sx - 18, sy + 1], [sx - 12, sy - 14], [sx + 4, sy - 20], [sx + 19, sy - 7]], 'blue', 8);
  H.line(R, [[sx - 18, sy + 1], [sx - 12, sy - 14], [sx + 4, sy - 20], [sx + 19, sy - 7]], 'teal', 3);
  for (const x of [9.55, 10.08]) oval(H, R, ...H.p(x, 9.35, .88), 6, 3, 'sun', .8);
  H.line(R, [H.p(9.4, 8.9, .86), H.p(10.15, 8.9, .86)], 'coral', 2.5);
  const rim=H.p(8.52,8.88,.84);
  surface(H,R,[[rim[0]-12,rim[1]+9],[rim[0]-12,rim[1]-15],[rim[0]+9,rim[1]-20],[rim[0]+9,rim[1]+3]],'teal',.5,.8);
  H.line(R,[[rim[0]-12,rim[1]+9],[rim[0]-7,rim[1]+6],[rim[0]-7,rim[1]-12],[rim[0]+9,rim[1]-16]],'paper',2.3);
  metal(H,R,9.37,9.57,.84,.48,.84,.09,'teal');
  for(let n=0;n<7;n++) { const [x,y]=H.p(9.49+n*.09,9.78,.95); H.outline(R,ell(x,y,2.4,1.7),'sun',1); }
  H.line(R,[H.p(10.32,8.9,.85),H.p(10.32,9.56,.85)],'blue',2);
  H.line(R,[H.p(10.25,9.56,.85),H.p(10.39,9.56,.85)],'coral',3);
  for(const i of [8.18,10.2]) metal(H,R,i,10.05,.17,.11,.58,.12,'teal');
  metal(H, R, 10.85, 4.25, .62, .65, .05, .12, 'blue');
  bentTube(H, R, [[11.1, 4.52, .2], [11.1, 4.52, 1.45]], 4, 'teal');
  H.line(R, [H.p(10.8, 4.52, 1.47), H.p(11.4, 4.52, 1.47)], 'blue', 4);
  stroke(H, R, [H.p(11.05, 4.6, .2), H.p(10.7, 4.7, .2), H.p(10.6, 4.55, .7), H.p(11.0, 4.45, 1.15)], 'blue', 1.1);
  const [cx,cy]=H.p(10.97,3.33,2.68);
  for(let n=0;n<4;n++) H.outline(R,ell(cx,cy,17-n*3,26-n*3),'coral',1.5);
  H.line(R,[[cx,cy-26],[cx-2,cy-33],[cx+5,cy-35]],'blue',2);
  stroke(H,R,[[cx+9,cy+19],[cx+15,cy+31],[cx+12,cy+48]],'coral',1.4);
  bentTube(H,R,[[10.92,3.35,3.42],[10.92,3.35,2.69]],2,'teal');
  benchFrame(H, R, .9, 9.8, 2.55, .85, .64, 'teal');
  drape(H, R, 1.1, 9.84, .6, .63, .66, .3, 'coral');
  for(const i of [1.22,2.32]) { const [x,y]=H.p(i,10.1,.24); shape(H,R,[[x-10,y],[x+11,y],[x+10,y-7],[x+1,y-9],[x-6,y-5]],'blue',.65,.65); H.line(R,[[x-6,y-3],[x+6,y-3]],'paper',.7); }
  const [bx,by]=H.p(1.56,10.35,1.35);
  shape(H,R,[[bx-12,by],[bx+13,by],[bx+14,by+25],[bx-13,by+25]],'teal',.52,.8);
  stroke(H,R,[[bx-7,by],[bx-8,by-10],[bx+7,by-10],[bx+8,by]],'sun',2);
  H.line(R,[[bx-11,by+12],[bx+12,by+12]],'paper',1);
  const [hx, hy] = H.p(2.75, 10.15, .72); shape(H, R, [[hx - 14, hy], [hx - 13, hy - 10], [hx - 4, hy - 17], [hx + 10, hy - 14], [hx + 16, hy - 2]], 'sun', .7); for (let n = 0; n < 4; n++) H.line(R, [[hx - 8 + n * 5, hy - 12], [hx - 6 + n * 5, hy - 3]], 'blue', 1.1);
}, (H, R, t) => {
  const u = cycle(t, 24) * 24;
  const run = u < 4.8 ? 0 : u < 9.6 ? .3 * smooth((u - 4.8) / 4.8) : u < 14.4 ? .3 + .38 * (u - 9.6) / 4.8 : u < 22 ? .68 + .32 * smooth((u - 14.4) / 7.6) : 1;
  const c = H.p(5.1, 5.12, 1.95);
  const push = smooth((u - 4.8) / 2.4) * (1 - smooth((u - 7.2) / 2.4)), release = smooth((u - 7.2) / 2.4) * (1 - smooth((u - 14.4) / 7.6));
  const target = [c[0] + 40 - 6 * push + 7 * release, c[1] + 38 + 4 * push + 5 * release];
  wheel(H, R, ...c, 58, run * TAU * 2);
  person(H, R, 3.6, 5.35, pupilClip, [c[0] - 45, c[1] - 4], 'coral', 8 + 5 * smooth((u - 9.6) / 2) * (1 - smooth((u - 19) / 3)));
  person(H, R, 6.72, 5.52, workerClip, target, 'teal', 12);
  H.line(R, [[c[0] - 40, c[1] + 48], [c[0] - 20, c[1] + 48], [c[0] - 18, c[1] + 48]], 'blue', 2.1);
  H.line(R, [[c[0] + 40, c[1] + 48], [c[0] + 21, c[1] + 48]], 'blue', 2.1);
  oval(H, R, c[0] + 43, c[1] + 48, 4, 3, 'coral', .85);
  H.dot(...target, 3.2, 'coral', .35, { knock: true });
  const [x, y] = H.p(10.15, .6, 2.4), sway = Math.sin(TAU * u / 24) * 2 * Math.sin(Math.PI * Math.min(1, u / 5));
  stroke(H, R, [[x, y], [x + 5 + sway, y + 7], [x + 3, y + 17]], 'coral', 1.2);
});
room.loopSeconds = 24;
room.stillTime = 23;
export default room;
