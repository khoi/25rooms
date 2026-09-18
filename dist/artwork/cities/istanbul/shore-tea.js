import { world, actor, shape, oval, stroke, ell, wallPt, wallRect, cycle, mix } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, drape, benchFrame, pendant, cushion, caneChair, bentTube } from '../materials.js';
import { boardFloor, cabinetFrame } from '../structure.js';
import { windowBay, wallRack, hangingRail, floorShadow, panelFront } from '../joinery.js';

const smooth = x => { const v = Math.max(0, Math.min(1, x)); return v * v * (3 - 2 * v); };
const rest = FIGURES.sample('hold', 0);
FIGURES.clips['istanbul-shore-carry'] = { dur: 30, keys: [[0, rest], [1, rest]] };
FIGURES.clips['istanbul-shore-guest'] = { dur: 30, keys: [[0, FIGURES.sample('sit', 0)], [.28, FIGURES.sample('sit', 0)], [.38, {...FIGURES.sample('sit', 0), head: 13}], [.55, FIGURES.sample('sit', 0)], [1, FIGURES.sample('sit', 0)]] };

function glass(H, R, x, y, s = 1, filled = true) {
  oval(H, R, x, y + 1, 8 * s, 3 * s, 'paper', 1);
  H.outline(R, ell(x, y + 1, 6 * s, 2 * s), 'coral', .6);
  shape(H, R, [[x - 4 * s, y], [x - 3 * s, y - 7 * s], [x - 5 * s, y - 15 * s], [x + 5 * s, y - 15 * s], [x + 3 * s, y - 7 * s], [x + 4 * s, y]], 'paper', 1, .65);
  if (filled) shape(H, R, [[x - 3 * s, y - 1 * s], [x - 2 * s, y - 7 * s], [x - 3.5 * s, y - 11 * s], [x + 3.5 * s, y - 11 * s], [x + 2 * s, y - 7 * s], [x + 3 * s, y - 1 * s]], 'coral', .64, .3);
  H.line(R, [[x - 2 * s, y - 13 * s], [x - 1.5 * s, y - 3 * s]], 'paper', 1);
  oval(H, R, x, y - 15 * s, 5 * s, 1.5 * s, 'paper', .45);
}

function pot(H, R, x, y, s = 1, color = 'sun') {
  oval(H, R, x, y - 8 * s, 12 * s, 10 * s, color, .72);
  stroke(H, R, [[x + 10 * s, y - 13 * s], [x + 20 * s, y - 20 * s], [x + 22 * s, y - 24 * s]], color, 4 * s);
  stroke(H, R, [[x - 10 * s, y - 15 * s], [x - 19 * s, y - 17 * s], [x - 18 * s, y - 3 * s], [x - 10 * s, y - 4 * s]], 'blue', 2 * s);
  oval(H, R, x, y - 17 * s, 9 * s, 3 * s, color, .9);
  H.dot(x, y - 22 * s, 2.4 * s, 'blue');
  stroke(H, R, [[x, y - 22 * s], [x - 10 * s, y - 27 * s], [x - 15 * s, y - 16 * s]], 'coral', .65);
  H.line(R, [[x - 7 * s, y - 12 * s], [x - 6 * s, y - 5 * s]], 'paper', 1.3);
}

function tray(H, R, x, y, loaded) {
  oval(H, R, x, y + 3, 29, 12, 'blue', .65);
  oval(H, R, x, y, 29, 12, 'sun', .8);
  oval(H, R, x, y - 1, 25, 9, 'sun', .35);
  for (const a of [-1, 1]) stroke(H, R, [[x + a * 24, y - 3], [x + a * 34, y - 6], [x + a * 35, y], [x + a * 26, y + 4]], 'blue', 1.6);
  for (let n = 0; n < 5; n++) H.line(R, [[x - 33 + n, y - 4], [x - 32 + n, y + 1]], 'paper', .8);
  H.line(R, [[x + 9, y + 9], [x + 18, y + 7]], 'paper', 1.9);
  if (loaded) { glass(H, R, x - 12, y - 1, .9); glass(H, R, x + 9, y + 1, .9); }
}

function serviceScreen(H, R, t) {
  const P = (u, z) => H.p(7.9 + u, 2.5, z);
  for (const i of [7.82, 10.68]) timber(H, R, i, 2.38, .17, .26, 0, 3.75, 'teal');
  timber(H, R, 7.8, 2.38, 3.1, .26, 3.62, .17, 'teal');
  const edge = .045 * Math.sin(t * Math.PI * 2 / 30);
  shape(H, R, [P(.13, 3.58), P(2.69, 3.58), P(2.63 + edge, .25), P(.2 + edge, .22)], 'coral', .64, .8);
  for (let n = 0; n < 9; n++) stroke(H, R, [P(.25 + n * .27, 3.54), P(.24 + n * .27 + edge, 2), P(.27 + n * .27 + edge, .29)], n % 2 ? 'paper' : 'blue', n % 2 ? .8 : .6, .6);
  H.line(R, [P(.2, .3), P(2.62, .3)], 'sun', 1.3);
}

const room = world('istanbul-shore-tea', 'Two glasses face the water', { wall: 'paper', wallTone: .8, height: 3.7, floor: 'sun', tone: .12, head: 35 }, (H, R) => {
  boardFloor(H, R, 0, 0, 12, 12, .02, 'sun', .55);
  for (const side of ['ne', 'nw']) windowBay(H, R, side, .6, side === 'ne' ? 6.9 : 10.7, 1.65, 1.65, { divisions: side === 'ne' ? 3 : 4, view: P => {
    shape(H, R, [P(.1, .1), P(11, .1), P(11, .8), P(.1, .8)], 'teal', .36, .4);
    for (let k = 0; k < 13; k++) H.line(R, [P(.2 + k * .85, .24 + k % 3 * .14), P(.7 + k * .85, .24 + k % 3 * .14)], 'paper', 1.4);
    const B = (u, z) => P(u + 3.2, z + .66);
    shape(H, R, [B(0, 0), B(1.2, 0), B(1.08, -.13), B(.15, -.13)], 'blue', .68, .5);
    shape(H, R, [B(.27, .01), B(.93, .01), B(.86, .18), B(.36, .18)], 'paper', 1, .4);
  }});
  for (const side of ['ne', 'nw']) {
    shape(H, R, wallRect(H, side, .3, 11.75, .18, 1.43, -.1), 'teal', .21, .7);
    H.line(R, [wallPt(H, side, .3, 1.47, -.15), wallPt(H, side, 11.75, 1.47, -.15)], 'blue', 3);
    for (let n = .7; n < 11.7; n += .85) H.line(R, [wallPt(H, side, n, .22, -.12), wallPt(H, side, n, 1.4, -.12)], 'blue', .7, {tone:.45});
  }
  floorShadow(H, 1.1, 2, 5.7, 2.5, .2);
  cabinetFrame(H, R, 1, .7, 6, 1.35, .08, 1.4, 3, 'teal', (x,y,w,d,z,h,n) => {
    timber(H,R,x,y,w,d,z+.58,.09,'sun');
    if(n === 0) for(let k=0;k<4;k++) oval(H,R,...H.p(x+.35+k*.37,y+.64,z+.14),8,3,'paper',1);
    if(n === 1) { drape(H,R,x+.15,y+.12,.9,.55,z+.69,.35,'paper'); vessel(H,R,x+1.1,y+.55,z+.68,10,17,'sun',false); }
    if(n === 2) for(let k=0;k<3;k++) metal(H,R,x+.13,y+.13,w-.25,d-.1,z+.14+k*.14,.08,'sun');
  });
  timber(H,R,.95,.65,6.1,1.48,1.48,.17,'sun');
  wallRack(H,R,'ne',1.1,5.8,2.1,1.4,2,'teal',(P,z,row)=>{
    if(row === 0) for(let n=0;n<8;n++) glass(H,R,...P(.4+n*.65,z+.08),.75,false);
    else for(let n=0;n<3;n++) pot(H,R,...P(.75+n*1.7,z+.05),.7,n===1?'paper':'sun');
  });
  vessel(H,R,5.85,1.38,1.67,21,39,'sun',false);
  const [ux,uy]=H.p(5.85,1.38,1.67);
  oval(H,R,ux,uy-41,17,5,'sun',.85); H.dot(ux,uy-47,3,'blue');
  stroke(H,R,[[ux+14,uy-13],[ux+25,uy-11],[ux+25,uy-6]],'blue',2); H.line(R,[[ux+21,uy-16],[ux+30,uy-16]],'coral',2.5);
  metal(H,R,5.55,1.75,1,.38,1.65,.07,'blue');
  pot(H,R,...H.p(3.55,1.45,1.65),1.05); pot(H,R,...H.p(3.55,1.45,2.26),.67,'paper');
  drape(H,R,1.45,1.2,1.15,.75,1.66,.48,'paper');
  hangingRail(H,R,'nw',1.1,3.5,3.48,3,(P,u,n)=>{const [x,y]=P(u,-.15); if(n<2){oval(H,R,x,y+20,17,22,'sun',.35); oval(H,R,x,y+20,13,18,'paper',.4);}else{H.line(R,[[x,y],[x+2,y+18]],'blue',1.6); oval(H,R,x+2,y+21,3,5,'sun',.8);}});
  for(const [i,j] of [[2.35,7.1],[5.8,8.3]]) caneChair(H,R,i,j,'teal');
  floorShadow(H,3.05,6.3,2.6,2.6,.14);
  for(const [i,j] of [[3.65,6.95],[4.9,7.8],[3.4,8]]) bentTube(H,R,[[4.1,7.25,.78],[i,j,0]],3,'teal');
  oval(H,R,...H.p(4.15,7.35,.9),58,28,'sun',.65); oval(H,R,...H.p(4.15,7.35,.93),53,24,'paper',.8);
  glass(H,R,...H.p(4.05,7,.98),1.05); glass(H,R,...H.p(4.9,7.6,.98),1.05);
  const [tx,ty]=H.p(4.5,7.2,.99); H.line(R,[[tx,ty],[tx+13,ty+5]],'blue',1); oval(H,R,tx+14,ty+5,3,1.7,'sun',.7);
  cushion(H,R,2.35,7.1,.85,.78,.67,.11,'coral');
  drape(H,R,5.9,8.3,.72,.65,.7,.47,'teal');
  benchFrame(H,R,.65,5.2,1.6,1.7,.6,'sun');
  drape(H,R,.75,5.35,1.35,1.35,.62,.22,'paper');
  for(let n=0;n<6;n++) H.line(R,[H.p(.83,5.52+n*.13,.64),H.p(1.88,5.52+n*.13,.64)],'blue',.5,{tone:.55});
  bentTube(H,R,[[1.1,6.9,.03],[.98,6.55,.7],[1.06,6.4,1.18],[1.27,6.43,1.2]],2,'sun');
  benchFrame(H,R,9.35,7.05,1.85,2.35,1.05,'teal');
  for(let n=0;n<5;n++) timber(H,R,9.5+n*.3,7.2,.09,2,.4,.1,'sun');
  vessel(H,R,10.2,7.8,1.07,17,11,'paper');
  drape(H,R,9.4,8.15,1.5,.9,1.07,.55,'paper');
  bentTube(H,R,[[9.4,7.2,1.1],[9.4,7.2,1.75],[11,7.2,1.75],[11,7.2,1.1]],2,'teal');
  pendant(H,R,5.9,3.3,4.25,3.15,'sun',.7);
  H.light(...H.p(6.2,4.7,0),125,67,.22);
  for(let k=0;k<5;k++) metal(H,R,10.75+k*.16,10.9,.09,.7,.025,.025,'blue');
}, (H,R,t) => {
  const u=cycle(t,30)*30;
  let travel=0, loaded=true;
  if(u>=6&&u<9) travel=smooth((u-6)/3);
  else if(u>=9&&u<12) {travel=1-smooth((u-9)/3);loaded=false;}
  else if(u>=12&&u<15) loaded=false;
  else if(u>=15&&u<18){travel=smooth((u-15)/3);loaded=false;}
  else if(u>=18&&u<22) travel=1;
  else if(u>=22&&u<28) travel=1-smooth((u-22)/6);
  const walking=Math.sin(travel*Math.PI),stride=Math.sin(t*Math.PI*2);
  Object.assign(rest,{ll:-5+stride*19*walking,lr:5-stride*19*walking,kl:Math.max(0,-stride)*18*walking,kr:Math.max(0,stride)*18*walking,y:-Math.abs(stride)*.5*walking});
  const i=mix(7.1,8.6,travel),j=mix(4.65,1.95,travel);
  actor(H,R,i,j,t,'istanbul-shore-carry',{shirt:['paper',1],apron:['coral',.75],hairStyle:'bun',prop:(HH,RR,p)=>tray(HH,RR,(p.lhand[0]+p.rhand[0])/2+5,(p.lhand[1]+p.rhand[1])/2+2,loaded)},0,1.55);
  serviceScreen(H,R,t);
  actor(H,R,2.72,7.56,t,'istanbul-shore-guest',{face:'se',shirt:['teal',.7],hairStyle:'bald',glasses:true},.17,1.45,'elder');
});
room.loopSeconds=30;
room.stillTime=3;
export default room;
