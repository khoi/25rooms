import { world, box, shape, oval, stroke, ell } from '../../worlds/common.js';
import { timber, metal, benchFrame, spokedWheel, floorLight } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, recessedFrame, wallRack, taskLight } from '../joinery.js';

const smooth = x => { const v = Math.max(0, Math.min(1, x)); return v * v * (3 - 2 * v); };
const travel = u => smooth((u - 4.8) / 4.8) * (1 - smooth((u - 14.4) / 7.6));

function maker(H, R, i, j, hands, child = false, lean = 0, shirt = 'coral', stride = 0) {
  const [x, y] = H.p(i, j, child ? .35 : 0), s = child ? .85 : 1.35;
  oval(H, R, x + 5, y + 3, 14 * s, 4 * s, 'blue', .2);
  for (const side of [-1, 1]) {
    stroke(H, R, [[x + side * 5 * s, y - 24 * s], [x + side * (6 + stride * 3) * s, y - 10 * s], [x + side * (8 + stride * 5) * s, y - Math.max(0, side * stride) * 3]], 'blue', 7 * s);
    oval(H, R, x + side * (8 + stride * 5) * s + 3, y - Math.max(0, side * stride) * 3, 6 * s, 2.5 * s, 'blue', .8);
  }
  shape(H, R, [[x - 9 * s, y - 45 * s], [x + 8 * s, y - 46 * s], [x + 10 * s, y - 22 * s], [x - 9 * s, y - 23 * s]], child ? 'sun' : shirt, .67);
  if (!child) shape(H, R, [[x - 5, y - 41], [x + 5, y - 41], [x + 8, y - 24], [x - 7, y - 24]], 'paper', .9);
  oval(H, R, x + lean, y - 55 * s, 8 * s, 9 * s, 'paper', 1);
  shape(H, R, [[x - 8 * s + lean, y - 55 * s], [x - 7 * s + lean, y - 63 * s], [x + 3 * s + lean, y - 65 * s], [x + 8 * s + lean, y - 59 * s], [x - 3 * s + lean, y - 58 * s]], 'blue', .85);
  H.dot(x + 4 * s + lean, y - 54 * s, 1.1, 'blue');
  for (const [n, target] of hands.entries()) {
    const shoulder = [x + (n ? 8 : -8) * s, y - 41 * s], elbow = [(shoulder[0] + target[0]) * .5 + (n ? 4 : -4), (shoulder[1] + target[1]) * .5 + 8];
    stroke(H, R, [shoulder, elbow, target], 'blue', 7 * s);
    stroke(H, R, [shoulder, elbow, target], child ? 'sun' : shirt, 5 * s);
    oval(H, R, ...target, 3 * s, 2.7 * s, 'paper', 1);
  }
}

function facade(H, R, i, j, z, width, height, ink) {
  const f = H.faceI(i, j, width, z, z + height);
  shape(H, R, f, ink, .45);
  H.line(R, [H.p(i, j, z + height), H.p(i + width, j, z + height)], 'paper', 3);
  for (let n = 0; n < 3; n++) {
    const a = i + .13 + n * width / 3;
    shape(H, R, H.faceI(a, j + .025, width / 3 - .19, z + .3, z + height - .22), 'blue', .55);
    H.line(R, [H.p(a + .09, j + .04, z + .4), H.p(a + .09, j + .04, z + height - .27)], 'paper', 1);
  }
  metal(H, R, i - .05, j - .07, width + .1, .18, z + height, .09, ink);
}

const room = world('istanbul-tram-model', 'The little tram returns', { wall: false, floor: 'paper', tone: .7, head: 45 }, (H, R) => {
  masonry(H, R, 'ne', 0, 12, 0, 4.1, 'paper', .85);
  masonry(H, R, 'nw', 0, 12, 0, 3.9, 'teal', .28);
  windowBay(H, R, 'ne', 1.1, 7.7, 2.85, 1.02, { ink: 'teal', divisions: 5 });
  for (const j of [.3, 8.3]) {
    stroke(H, R, [H.p(.25, j, 4), H.p(6, j, 4.7), H.p(11.8, j, 4)], 'blue', 4);
    stroke(H, R, [H.p(.25, j, 4), H.p(11.8, j, 4)], 'teal', 3);
    for (let i = 1; i < 11; i += 2) stroke(H, R, [H.p(i, j, 4), H.p(i + 1, j, 4.6 - Math.abs(i - 5) * .09), H.p(i + 2, j, 4)], 'blue', 1.5);
  }
  stroke(H, R, [H.p(.13, .22, .3), H.p(.13, .22, 2.6), H.p(.13, 10.7, 2.6)], 'blue', 2);
  for (let j = 1; j < 11; j += 1.7) metal(H, R, .08, j, .17, .12, 2.54, .13, 'teal');
  box(H, R, 1, 10.7, 10, .32, 0, .05, 'blue', .35);
  for (let i = 1.1; i < 11; i += .25) H.line(R, [H.p(i, 10.75, .055), H.p(i, 10.98, .055)], 'paper', 1);
  floorLight(H, 7, 5, 160, .55);
  for (const j of [.5, 7.9, 11.6]) {
    metal(H, R, .16, j, .2, .24, .07, 3.87, 'teal');
    shape(H, R, [H.p(.34,j,3.75),H.p(1.24,j,3.75),H.p(.34,j,3.01)], 'teal', .65);
    for (const z of [.22, 3.56]) H.dot(...H.p(.37,j+.16,z), 2.2, 'sun');
  }
  box(H,R,.49,2.12,1.23,5.04,.06,1.1,'teal',.6);
  timber(H,R,.43,2.06,1.41,5.17,1.16,.16,'sun');
  for (let n=0;n<4;n++) {
    const j=2.22+n*1.18;
    shape(H,R,H.faceJ(1.73,j,1.04,.17,1.06),'blue',.72);
    for (const z of [.23,.66]) {
      shape(H,R,H.faceJ(1.76,j+.055,.93,z,z+.31),n===2&&z>.5?'paper':'teal',n===2&&z>.5?1:.55);
      stroke(H,R,[H.p(1.8,j+.35,z+.16),H.p(1.8,j+.65,z+.16)],'sun',2.2);
    }
  }
  wallRack(H,R,'nw',7.25,3.98,1.75,1.61,2,'sun',(P,z,row)=>{
    if(row===0)for(let n=0;n<4;n++) {
      const u=.24+n*.89;
      shape(H,R,[P(u,z+.08),P(u+.66,z+.08),P(u+.66,z+.54),P(u,z+.54)],n%2?'paper':'teal',n%2?1:.35);
      for(let a=0;a<3;a++)stroke(H,R,[P(u+.1+a*.2,z+.13),P(u+.1+a*.2,z+.47)],'blue',.8);
    }
    else for(let n=0;n<6;n++) {
      const u=.27+n*.57;
      stroke(H,R,[P(u,z+.51),P(u,z+.29)],'blue',1);
      const q=P(u,z+.22);oval(H,R,...q,6+n%2*2,4+n%2*2,'teal',.45);oval(H,R,...q,3,2,'paper',1);
    }
  });
  shape(H,R,H.tile(.62,3.01,.97,1.84,1.33),'teal',.2);
  for(let n=0;n<6;n++) H.line(R,[H.p(.66,3.14+n*.26,1.34),H.p(1.49,3.14+n*.26,1.34)],'paper',.65);
  shape(H,R,[H.p(.73,3.28,1.35),H.p(1.32,3.28,1.35),H.p(1.32,4.36,1.35),H.p(.73,4.36,1.35)],'paper',1);
  for(const j of [3.5,3.81,4.12])shape(H,R,H.tile(.89,j,.3,.18,1.37),'coral',.28);
  metal(H,R,1.42,4.05,.13,.61,1.35,.05,'blue');
  for(let n=0;n<7;n++) H.line(R,[H.p(1.42,4.08+n*.08,1.42),H.p(1.51,4.08+n*.08,1.42)],'paper',.65);
  metal(H,R,1.31,5.61,.38,.73,1.31,.18,'teal');
  for(const j of [5.64,6.15])metal(H,R,1.28,j,.46,.14,1.49,.23,'blue');
  stroke(H,R,[H.p(1.72,5.99,1.43),H.p(2.01,5.99,1.43)],'sun',2.2);
  stroke(H,R,[H.p(2.01,5.99,1.23),H.p(2.01,5.99,1.66)],'coral',2.3);
  timber(H,R,1.38,5.73,.17,.47,1.54,.13,'sun');
  taskLight(H,R,.91,6.78,1.34,'coral',.45);
  stroke(H,R,[H.p(.92,6.78,1.34),H.p(.6,6.95,.82),H.p(.39,7.1,.81)],'blue',1.2);
  box(H,R,.17,7.05,.25,.43,.64,.33,'paper',1);H.dot(...H.p(.45,7.28,.82),1.6,'blue');
  const pencil=H.p(1.12,2.55,1.34);oval(H,R,...pencil,8,3,'coral',.6);
  for(let n=0;n<5;n++)stroke(H,R,[[pencil[0]-5+n*2,pencil[1]],[pencil[0]-8+n*4,pencil[1]-16-n%2*7]],n%2?'sun':'blue',1.4);
  for(const n of [0,1]){const q=H.p(.8+n*.53,6.4,1.34);oval(H,R,...q,6,3,'paper',1);oval(H,R,q[0],q[1]-4,5,2,n?'coral':'teal',.7);}

  cabinetFrame(H, R, 1.15, .65, 8.9, 1.05, .22, 2.15, 4, 'teal', (i, j, w, d, z, h, n) => {
    timber(H, R, i, j, w, d, z + .85, .09, 'teal');
    if (n < 2) {
      for (let a = 0; a < 3; a++) facade(H, R, i + .11 + a * .58, j + .16 + a * .08, z + .96, .49, .68 + (a % 2) * .2, a === 1 ? 'sun' : 'paper');
      for (let a = 0; a < 4; a++) box(H, R, i + .05 + a * .43, j + .14, .35, .6, z, .55, ['sun', 'teal', 'paper', 'coral'][a], .45);
    } else if (n === 2) {
      for (let a = 0; a < 5; a++) timber(H, R, i + .08 + a * .27, j, .13, .7, z, .75, 'sun');
      for (let a = 0; a < 3; a++) { const p = H.p(i + .28 + a * .48, j + .3, z + 1.03); oval(H, R, ...p, 8, 3, 'sun', .8); spokedWheel(H, R, p[0], p[1] - 4, 5, 'blue'); }
    } else {
      box(H, R, i + .07, j + .05, w - .12, .66, z, .61, 'blue', .5);
      metal(H, R, i + .7, j + .73, .45, .1, z + .23, .14, 'sun');
      facade(H, R, i + .15, j + .6, z + .97, 1.4, .61, 'coral');
    }
  });
  recessedFrame(H, R, 'nw', 2.45, 3.9, 1.7, 1.65, 'sun', P => {
    shape(H, R, [P(.18, .18), P(3.72, .18), P(3.72, 1.46), P(.18, 1.46)], 'paper', 1);
    for (let n = 0; n < 5; n++) {
      const a = .35 + n * .67;
      shape(H, R, [P(a, .31), P(a + .46, .31), P(a + .46, 1.15), P(a, 1.15)], n % 2 ? 'teal' : 'coral', .27);
      H.line(R, [P(a, .69), P(a + .46, .69)], 'blue', .8);
    }
  });
  benchFrame(H, R, 2.7, 4.45, 6.7, 2.5, 1.35, 'sun');
  for(const i of [2.9,9.08]){
    stroke(H,R,[H.p(i,4.72,.36),H.p(i,6.7,1.17)],'teal',3.2);
    stroke(H,R,[H.p(i,6.7,.36),H.p(i,4.72,1.17)],'teal',3.2);
  }
  timber(H,R,3.12,4.77,5.73,1.6,.34,.12,'sun');
  for(const [i,w,ink] of [[3.3,1.48,'paper'],[5.02,1.39,'coral'],[6.7,1.74,'teal']]) {
    box(H,R,i,4.9,w,1.1,.46,.38,ink,ink==='paper'?1:.45);
    stroke(H,R,[H.p(i+.25,6.02,.65),H.p(i+w-.25,6.02,.65)],'blue',1.5);
    shape(H,R,H.faceI(i+.15,6.03,.35,.49,.58),'paper',1);
  }
  metal(H,R,2.87,6.79,6.28,.1,1.12,.16,'teal');
  for(let n=0;n<8;n++) H.dot(...H.p(3.1+n*.83,6.91,1.21),1.5,'sun');

  box(H, R, 2.78, 4.53, 6.54, 2.34, 1.35, .14, 'paper', .8);
  for (let i = 3; i < 9.1; i += .32) timber(H, R, i, 5.08, .11, 1.23, 1.49, .06, 'sun');
  for (const j of [5.25, 6.09]) metal(H, R, 2.95, j, 6.15, .065, 1.56, .06, 'blue');
  for (const i of [3, 8.92]) { metal(H, R, i, 5.15, .12, 1.1, 1.59, .18, 'coral'); for (const j of [5.25, 6.07]) H.dot(...H.p(i + .08, j, 1.76), 1.5, 'sun'); }
  metal(H, R, 3.1, 4.6, 5.8, .3, 1.49, .09, 'teal');
  stroke(H,R,[H.p(3.01,5.27,1.67),H.p(3.33,5.27,1.67)],'paper',1.2);
  for (const i of [3.6, 8.55]) { metal(H, R, i, 4.67, .09, .09, 1.56, 1.02, 'teal'); stroke(H, R, [H.p(i, 4.7, 2.6), H.p(i, 5, 2.66)], 'blue', 1.2); }
  stroke(H, R, [H.p(3.6, 4.95, 2.65), H.p(6, 4.95, 2.57), H.p(8.55, 4.95, 2.65)], 'blue', .8);
  for (let n = 0; n < 4; n++) {
    const x=3.05+n*1.3, h=.75+(n%2)*.3;
    box(H,R,x,3.78,1.05,.53,1.42,h,n%2?'coral':'paper',n%2?.3:.8);
    facade(H,R,x,4.32,1.42,1.05,h,n%2?'coral':'paper');
    shape(H,R,[H.p(x-.06,3.73,1.45+h),H.p(x+.53,3.73,1.77+h),H.p(x+1.11,3.73,1.45+h),H.p(x+1.11,4.35,1.45+h),H.p(x+.53,4.35,1.77+h),H.p(x-.06,4.35,1.45+h)],'teal',.52);
    for(const a of [.22,.61])shape(H,R,H.faceI(x+a,4.35,.18,1.6,1.83),'paper',1);
    if(n===0){timber(H,R,x+.2,4.52,.64,.2,1.49,.1,'sun');for(const a of [.23,.72])metal(H,R,x+a,4.56,.05,.05,1.43,.15,'blue');}
  }
  shape(H,R,H.tile(3.03,6.3,5.96,.42,1.505),'teal',.24);
  for(let n=0;n<8;n++)H.line(R,[H.p(3.05+n*.73,6.34,1.52),H.p(3.05+n*.73,6.66,1.52)],'paper',.8);
  metal(H,R,8.85,6.36,.18,.24,1.53,.44,'teal');
  shape(H,R,H.faceI(8.65,6.57,.55,1.97,2.16),'paper',1);

  for(const i of [10.0,11.16]){
    stroke(H,R,[H.p(i,3.29,.02),H.p(i,4.13,2.64)],'sun',4);
    stroke(H,R,[H.p(i,5.37,.02),H.p(i,4.13,2.64)],'teal',3);
    metal(H,R,i-.12,3.22,.26,.22,.025,.1,'blue');
  }
  timber(H,R,9.94,4.03,1.42,.11,.84,.12,'teal');
  shape(H,R,[H.p(9.76,3.63,1.05),H.p(11.42,3.63,1.05),H.p(11.42,4.12,2.71),H.p(9.76,4.12,2.71)],'sun',.55);
  shape(H,R,[H.p(9.87,3.68,1.17),H.p(11.31,3.68,1.17),H.p(11.31,4.08,2.58),H.p(9.87,4.08,2.58)],'paper',1);
  const plan=(x,z)=>H.p(9.93+x,3.71+(z-1.26)*.282,z);
  shape(H,R,[plan(.04,1.49),plan(1.22,1.49),plan(1.22,1.98),plan(.04,1.98)],'teal',.14);
  for(let n=0;n<4;n++)shape(H,R,[plan(.12+n*.28,1.65),plan(.29+n*.28,1.65),plan(.29+n*.28,1.9),plan(.12+n*.28,1.9)],'paper',1);
  for(const x of [.27,1])oval(H,R,...plan(x,1.43),5,4,'blue',.55);
  stroke(H,R,[plan(.1,2.23),plan(.59,2.45),plan(1.21,2.2)],'coral',1.1);
  for(const i of [9.96,11.11])metal(H,R,i,4.16,.18,.04,2.55,.11,'teal');
  timber(H,R,9.7,3.52,1.78,.24,.98,.12,'teal');
  metal(H,R,10.35,3.53,.64,.06,1.12,.045,'sun');
  box(H,R,10.07,4.48,1.01,.62,.06,.29,'teal',.45);
  stroke(H,R,[H.p(10.25,5.11,.25),H.p(10.82,5.11,.25)],'sun',1.6);
  benchFrame(H, R, 1.15, 7.5, 1.45, 1.3, .62, 'teal');
  box(H, R, 1.4, 7.68, .9, .57, .62, .43, 'sun', .45);
  for (let n = 0; n < 3; n++) shape(H, R, H.faceI(1.48 + n * .24, 8.255, .17, .81, .98), 'paper', 1);
  timber(H, R, 1.3, 7.64, 1.1, .65, 1.03, .08, 'coral');
  box(H, R, 5.25, 7.45, 1.7, 1.05, 0, .32, 'teal', .5);
  for(const j of [7.59,7.85,8.11])H.line(R,[H.p(5.36,j,.33),H.p(6.83,j,.33)],'paper',1.3);
  box(H,R,2.15,9.61,2.54,1.13,.04,.14,'teal',.6);
  shape(H,R,H.tile(2.26,9.72,2.3,.87,.19),'blue',.75);
  for(const i of [2.16,4.56])timber(H,R,i,9.62,.12,1.1,.16,.36,'sun');
  timber(H,R,2.17,10.62,2.5,.13,.16,.35,'sun');
  shape(H,R,H.faceI(2.2,9.64,2.45,.19,1.37),'teal',.5);
  shape(H,R,H.faceI(2.34,9.67,2.17,.32,1.2),'blue',.48);
  for(let n=0;n<3;n++){
    const q=H.p(2.67+n*.68,10.13,.2);oval(H,R,...q,11,5,'paper',.7);spokedWheel(H,R,q[0],q[1]-3,8,'sun',n,.65);
  }
  metal(H,R,3.04,10.77,.76,.09,.27,.15,'blue');
  for(const i of [2.57,4.18])metal(H,R,i,10.75,.22,.06,.24,.24,'sun');
  shape(H,R,[H.p(1.53,8.83,.18),H.p(1.72,8.83,.66),H.p(2.04,8.83,.73),H.p(2.32,8.83,.5),H.p(2.33,8.83,.16)],'paper',1);
  stroke(H,R,[H.p(1.69,8.85,.53),H.p(1.92,8.85,.47),H.p(2.18,8.85,.25)],'coral',1.5);

  benchFrame(H, R, 8.8, 8.75, 2.2, 1.2, .66, 'sun');
  for (const n of [0, 1]) { const [x, y] = H.p(9.25 + n * .8, 9.1, .77); spokedWheel(H, R, x, y, 10 - n * 2, n ? 'teal' : 'blue', .3); }
  metal(H, R, 9.4, 9.55, 1.2, .12, .67, .09, 'blue');
  stroke(H, R, [H.p(10.3, 8.96, .72), H.p(10.75, 9.25, .72), H.p(10.68, 9.52, .72)], 'coral', 3);
}, (H, R, time) => {
  const u = ((time % 24) + 24) % 24, p = travel(u), i = 3.36 + 3.9 * p, j = 5.21, z = 1.64;
  box(H, R, i, j, 1.48, .94, z + 0.0952, .09, 'blue', .8);
  for (const a of [.27, 1.19]) {
    metal(H, R, i + a - .04, j + .02, .07, .9, z + 0.0136, .055, 'blue');
    for (const b of [.06, .91]) { const [x, y] = H.p(i + a, j + b, z + 0.068); spokedWheel(H, R, x, y, 5.4, 'blue', -p * 19, .95); }
  }
  box(H, R, i + .04, j + .07, 1.4, .8, z + 0.1564, .33, 'teal', .7);
  shape(H, R, H.faceI(i + .07, j + .89, 1.34, z + 0.3876, z + 0.6868), 'blue', .7);
  for (let n = 0; n < 4; n++) {
    shape(H, R, H.faceI(i + .11 + n * .32, j + .9, .24, z + 0.4216, z + 0.6664), n === 1 ? 'sun' : 'paper', .68);
    const [x, y] = H.p(i + .21 + n * .32, j + .92, z + 0.5372);
    oval(H, R, x + (n === 2 ? 2 : 0), y - (n===3?5:2), 2.3, n===3?4.3:3, 'coral', .6);
    stroke(H, R, [[x, y], [x + (n === 2 ? 3 : 0), y + 5]], 'blue', 3);
  }
  shape(H, R, H.faceJ(i + 1.43, j + .12, .69, z + 0.34, z + 1), 'paper', .7);
  H.line(R, [H.p(i + 1.445, j + .48, z + 0.3468), H.p(i + 1.445, j + .48, z + 1)], 'teal', 1.8);
  metal(H, R, i - .02, j + .01, 1.54, .98, z + 0.6868, .1, 'teal');
  for (let n = 0; n < 6; n++) H.line(R, [H.p(i + .1 + n * .25, j + .08, z + 0.7684), H.p(i + .1 + n * .25, j + .92, z + 0.7684)], 'paper', .65);
  metal(H, R, i + .59, j + .19, .36, .52, z + 0.748, .075, 'sun');
  for(const x of [.14,1.31])for(const y of [.17,.78])H.dot(...H.p(i+x,j+y,z+.81),.85,'blue');
  stroke(H,R,[H.p(i+1.47,j+.2,z+.3),H.p(i+1.59,j+.2,z+.3),H.p(i+1.59,j+.69,z+.3),H.p(i+1.47,j+.69,z+.3)],'sun',1.4);
  for(const b of [.22,.69])oval(H,R,...H.p(i+1.45,j+b,z+.36),2.4,2.5,'sun',.8);
  for(const a of [.25,1.17]){stroke(H,R,[H.p(i+a-.11,j+.97,z+.19),H.p(i+a,j+.97,z+.12),H.p(i+a+.11,j+.97,z+.19)],'paper',1);}

  shape(H, R, H.tile(i + .15, j + .23, .17, .43, z + 0.7616), 'coral', .65);
  const release = 1 - smooth((u - .4) / 2) * (1 - smooth((u - 20.7) / 1.3)), hand = H.p(i + .73 - release * .1, j + .7 + release * .65, z + 0.816 - release * .8);
  maker(H, R, i + .5, 7.08, [H.p(i + .29, 6.55, 1.4), hand], false, p * 2,'coral',Math.sin(p*Math.PI*12)*Math.sin(p*Math.PI));
  maker(H, R, 5.85, 8.05, [H.p(6.2, 7.6, .9), H.p(6.35, 7.64, .95)], true, smooth((u - 9.6) / 2) * (1 - smooth((u - 14.4) / 2)) * 3);
  const settle=smooth((u-20)/1)*(1-smooth((u-23)/1))*.055;
  shape(H,R,[H.p(9.78,9.6,.76),H.p(10.54,9.6,.76),H.p(10.54,9.86,.76+settle),H.p(9.78,9.86,.76)],'paper',1);
  stroke(H,R,[H.p(9.88,9.67,.78),H.p(10.37,9.67,.78),H.p(10.43,9.77,.78)],'teal',.7);
  const awning = .02 * Math.sin(u * Math.PI / 12);
  shape(H, R, [H.p(6.05, 4.23, 2.27), H.p(7.1, 4.23, 2.27), H.p(7.1, 4.65, 2.12 + awning), H.p(6.05, 4.65, 2.12 + awning)], 'coral', .6);
});
room.loopSeconds = 24;
room.stillTime = 11;
export default room;
