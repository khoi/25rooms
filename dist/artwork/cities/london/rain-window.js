import { world, actor, shape, oval, stroke, box, wallPt, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, vessel, drape, benchFrame, floorLight, cushion } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';
import { windowBay, cityView, radiator, taskLight, hangingRail, caster, recessedFrame, panelFront } from '../joinery.js';

const ease=(a,b,t)=>{const x=Math.max(0,Math.min(1,(t-a)/(b-a)));return x*x*(3-2*x)};
const sit=FIGURES.sample('sit',0),pose={...sit,head:12,al:58,ar:62,el:30,er:32};
FIGURES.clips['london-rain-stretch']={dur:22,keys:[[0,pose],[.2,pose],[.4,{...sit,al:-164,ar:166,el:-5,er:5,head:-16,lean:5}],[.52,{...sit,al:-158,ar:160,el:-10,er:10,head:-18,lean:5}],[.6,{...sit,al:18,ar:22,el:25,er:25,head:-20,lean:6}],[.9,pose],[1,pose]]};
function chair(H,R,i,j){
  const [x,y]=H.p(i,j,.11);
  for(let n=0;n<5;n++){const a=n*Math.PI*2/5;bentTube(H,R,[[i,j,.32],[i+Math.cos(a)*.62,j+Math.sin(a)*.62,.11]],2,'teal');caster(H,R,i+Math.cos(a)*.62,j+Math.sin(a)*.62,.06);}
  metal(H,R,i-.08,j-.08,.16,.16,.25,.41,'blue');
  cushion(H, R, i - .57, j - .44, 1.14, .88, .63, .15, 'teal');
  for (const side of [-1, 1]) {
    bentTube(H, R, [[i + side * .46, j + .14, .54], [i + side * .69, j + .1, 1.01], [i + side * .69, j - .39, 1.01]], 2.4, 'teal');
    H.line(R, [H.p(i + side * .69, j + .07, 1.04), H.p(i + side * .69, j - .35, 1.04)], 'sun', 3.2);
  }
  oval(H, R, ...H.p(i, j + .49, .76), 4, 3.2, 'sun');
  bentTube(H,R,[[i,j+.37,.52],[i,j+.53,1.32]],3,'blue');
  shape(H,R,H.faceI(i-.51,j+.55,1.02,.95,1.54),'teal',.66);
  shape(H,R,H.faceI(i-.35,j+.565,.65,1.07,1.43),'coral',.55);
  for(let n=0;n<4;n++) H.line(R,[H.p(i-.31+n*.18,j+.575,1.1),H.p(i-.31+n*.18,j+.575,1.4)],'sun',.7);
  bentTube(H,R,[[i+.48,j,.68],[i+.78,j,.67]],2,'blue');
}
const room=world('london-rain-window','The storm stays outside',{wall:'teal',wallTone:.22,height:4.15,floor:'paper',tone:.18,head:45},(H,R)=>{
  boardFloor(H,R,.15,.15,11.7,11.7,.03,'sun',.78);
  for(let n=0;n<12;n++) for(const [i,j] of [[n,.12],[.12,n]]) shape(H,R,H.tile(i,j,.7,.5,.035),n%2?'teal':'coral',.27,.5);
  for (const side of ['ne', 'nw']) {
    H.line(R, [wallPt(H, side, .1, 4.05, -.12), wallPt(H, side, 11.9, 4.05, -.12)], 'blue', 5);
    H.line(R, [wallPt(H, side, .1, 4.1, -.13), wallPt(H, side, 11.9, 4.1, -.13)], 'paper', 1.6);
  }
  for (const x of [2.15, 10.32]) timber(H, R, x, .08, .17, .46, .09, 3.94, 'paper');
  windowBay(H,R,'ne',2.36,7.85,1.23,2.55,{night:true,divisions:4,view:P=>cityView(H,R,P,7.85,2.5,true)});
  const P=(u,z)=>wallPt(H,'ne',u,z,-.54);
  H.line(R,[P(2.28,3.94),P(10.28,3.94)],'blue',6);
  H.line(R,[P(2.28,3.98),P(10.28,3.98)],'sun',2);
  H.line(R,[P(10.28,3.92),P(10.28,2.66)],'blue',.75);
  oval(H,R,...P(10.28,2.63),2.6,4,'coral');
  for(const u of [4.1,8.1]) bentTube(H,R,[[u,.18,2.16],[u+.35,.4,2.18],[u+.35,.4,2.02]],2,'sun');
  for (const u of [2.52, 4.48, 6.44, 8.4]) {
    for (const z of [1.67, 3.31]) {
      metal(H, R, u, .33, .13, .12, z, .19, 'teal');
      H.dot(...H.p(u + .06, .47, z + .06), .9, 'sun');
    }
  }
  for (const x of [2.41, 9.84]) {
    const Q = (j, z) => H.p(x, j, z);
    shape(H, R, [Q(.58, 3.91), Q(1.11, 3.91), Q(.95, 2.8), Q(1.12, 1.12), Q(.59, 1.15)], 'paper', 1, .6);
    for (let n = 0; n < 3; n++) H.line(R, [Q(.66 + n * .14, 3.83), Q(.7 + n * .08, 2.73), Q(.67 + n * .17, 1.22)], 'teal', .7);
    H.line(R, [Q(.59, 2.71), Q(.98, 2.71)], 'coral', 2.4);
  }
  radiator(H,R,'ne',3.2,5.8,.83);
  timber(H,R,2.95,.31,6.35,.7,1.07,.12,'sun');
  cabinetFrame(H,R,.42,.3,1.65,1.5,.1,3.65,2,'sun',(i,j,w,d,z,h,n)=>{
    for(const zz of [.75,1.54,2.47]) timber(H,R,i,j,w,d,zz,.09,'sun');
    if(!n){for(let k=0;k<4;k++) box(H,R,i+.04+k*.14,j+.42,.09,.78,1.67,.57+k%2*.15,['paper','coral','teal'][k%3],.6);drape(H,R,i+.05,j+.24,.56,.84,2.6,.27,'teal');}
    else{for(let k=0;k<3;k++){box(H,R,i+.03,j+.2,.61,.97,.2+k*.16,.12,'coral',.45);H.dot(...H.p(i+.33,j+1.19,.26+k*.16),1.2,'sun');}box(H,R,i+.04,j+.22,.6,.79,1.7,.18,'blue',.6);bentTube(H,R,[[i+.35,j+.7,2.59],[i+.35,j+.7,3.1],[i+.09,j+.7,3.21],[i-.02,j+.7,2.99]],1.6,'blue');}
  });
  recessedFrame(H,R,'nw',2.55,3.16,1.71,1.68,'coral',Q=>{
    shape(H,R,[Q(.14,.14),Q(3.01,.14),Q(3.01,1.52),Q(.14,1.52)],'paper',1);
    for(let n=0;n<4;n++){const x=.34+n*.64;shape(H,R,[Q(x,.39),Q(x+.4,.35),Q(x+.36,1.16),Q(x,1.2)],n%2?'teal':'sun',.27,.5);H.dot(...Q(x+.2,1.2),1.5,'coral');}
    const q=Q(2.57,.73);shape(H,R,[[q[0]-8,q[1]+5],[q[0]+7,q[1]+4],[q[0]+1,q[1]-9]],'coral',.8);H.line(R,[[q[0],q[1]+4],[q[0]+1,q[1]+13],[q[0]+4,q[1]+15]],'blue',.8);
  });
  const S = { ...H, p: (i, j, z) => H.p(j, i, z), tile: (i, j, w, d, z) => H.tile(j, i, d, w, z), faceI: (i, j, w, z0, z1) => H.faceJ(j, i, w, z0, z1), faceJ: (i, j, d, z0, z1) => H.faceI(j, i, d, z0, z1) };
  cabinetFrame(S, R, 2.48, .27, 4.52, 1.24, .09, 1.29, 3, 'teal', (i, j, w, d, z, h, n) => {
    if (n === 0) {
      timber(S, R, i, j, w, d, .73, .08, 'sun');
      for (let k = 0; k < 3; k++) box(S, R, i + .12, j + .08, 1.1, .76, .24 + k * .14, .1, k === 1 ? 'coral' : 'paper', .6);
      box(S, R, i + .14, j + .09, 1.04, .73, .87, .27, 'teal', .6);
    } else if (n === 1) {
      for (let k = 0; k < 5; k++) {
        box(S, R, i + .1 + k * .24, j + .14, .18, .86, .23, .86 - k % 2 * .1, ['paper', 'coral', 'sun'][k % 3], .65);
        H.line(R, [S.p(i + .15 + k * .24, j + .99, .44), S.p(i + .15 + k * .24, j + .99, .65)], 'teal', 1.2);
      }
    } else panelFront(S, R, i, 1.54, w, .16, 1.11, 1, 'teal');
  });
  timber(S, R, 2.42, .2, 4.66, 1.37, 1.39, .11, 'sun');
  shape(H, R, S.tile(3.02, .41, 1.28, .87, 1.515), 'paper', 1);
  for (let n = 0; n < 4; n++) H.line(R, [S.p(3.14, .55 + n * .15, 1.52), S.p(3.94 + n % 2 * .22, .55 + n * .15, 1.52)], 'teal', .7);
  for (const u of [4.72, 5.11]) {
    box(S, R, u, .52, .22, .68, 1.52, .27, 'coral', .56);
    H.line(R, [S.p(u + .09, 1.21, 1.56), S.p(u + .09, 1.21, 1.73)], 'paper', 1);
  }
  const headphones = S.p(6.27, .85, 1.55);
  H.line(R, [[headphones[0] - 8, headphones[1] - 2], [headphones[0] - 9, headphones[1] - 17], [headphones[0], headphones[1] - 24], [headphones[0] + 9, headphones[1] - 17], [headphones[0] + 8, headphones[1] - 2]], 'blue', 3);
  for (const dx of [-8, 8]) oval(H, R, headphones[0] + dx, headphones[1] - 4, 4, 7, 'coral', .65);
  benchFrame(H,R,2.88,2.13,5.82,1.64,1.16,'sun');
  metal(H,R,3.23,2.29,4.94,.18,.92,.13,'teal');
  for (const x of [4.24, 6.6, 8.07]) metal(H, R, x, 2.34, .13, .34, .81, .18, 'blue');
  metal(H, R, 6.79, 2.45, 1.44, .34, .72, .11, 'paper');
  for (let n = 0; n < 4; n++) H.line(R, [H.p(6.9 + n * .31, 2.46, .84), H.p(6.9 + n * .31, 2.75, .84)], 'coral', 1.5);
  bentTube(H, R, [[7.63, 2.57, .73], [8.46, 2.55, .59], [8.51, 2.13, .13], [8.91, .47, .13], [9.27, .47, .5]], 1.2, 'blue');
  metal(H, R, 9.1, .38, .42, .12, .36, .36, 'paper');
  for (let n = 0; n < 2; n++) H.dot(...H.p(9.23 + n * .16, .51, .52), 1, 'blue');
  for (const x of [4.17, 6.52]) bentTube(H, R, [[x, 2.6, .12], [x, 3.27, .27]], 2, 'teal');
  timber(H, R, 4.13, 2.8, 2.51, .46, .21, .08, 'teal');
  for (let n = 0; n < 8; n++) H.line(R, [H.p(4.29 + n * .29, 2.84, .31), H.p(4.29 + n * .29, 3.21, .31)], 'paper', .6);
  box(H,R,3.12,2.24,1.05,1.39,.7,.34,'teal',.56);
  H.line(R,[H.p(3.3,3.66,.88),H.p(3.87,3.66,.88)],'sun',2);
  shape(H,R,H.tile(4.48,2.7,2.36,.77,1.172),'blue',.67);
  shape(H,R,H.tile(4.57,2.77,2.17,.62,1.205),'paper',1);
  for(let k=0;k<4;k++) H.line(R,[H.p(4.72,2.93+k*.105,1.212),H.p(5.22+k%2*.84,2.93+k*.105,1.212)],'teal',.8);
  H.line(R,[H.p(5.84,3.52,1.185),H.p(6.4,3.49,1.185)],'sun',2.2);
  metal(H,R,7.15,2.36,1.19,.83,1.17,.065,'blue');
  H.line(R,[H.p(7.25,2.42,1.24),H.p(8.24,2.42,1.24)],'paper',.75);
  const q=H.p(3.78,2.56,1.18);H.outline(R,ell(...q,10,4.5),'coral',1,{tone:.3});
  taskLight(H,R,3.87,2.59,1.19,'coral',1.18);
  vessel(H,R,7.83,3.42,1.19,6,14,'teal');
  for(let k=0;k<5;k++) H.line(R,[H.p(7.74+k*.05,3.42,1.54),H.p(7.63+k*.1,3.43,1.98-k%2*.14)],k%2?'sun':'blue',1.4);
  const ca=H.p(4.1,3.81,1.1);shape(H,R,[[ca[0]-3,ca[1]-3],[ca[0]+3,ca[1]-3],[ca[0]+3,ca[1]+5],[ca[0]-3,ca[1]+5]],'coral',.7,.5);
  bentTube(H,R,[[3.85,2.6,1.16],[3.85,3.72,1.1],[4.1,3.82,.97],[4.1,3.88,.22],[3.02,3.85,.12]],1,'blue');
  for(const j of [5.44,7.67]) {
    bentTube(H,R,[[9.08,j,.06],[10.67,j,1.88],[11.26,j,.06],[9.55,j,1.88]],2.1,'teal');
    for(const x of [9.55,9.83,10.11,10.39,10.67]) bentTube(H,R,[[x,5.42,1.88],[x,7.68,1.88]],1.2,'blue');
  }
  drape(H,R,9.67,5.62,.65,1.55,1.91,.95,'paper');
  drape(H,R,10.39,5.73,.42,.72,1.91,.66,'coral');
  for (const [x, j, ink] of [[9.69, 5.7, 'sun'], [10.25, 7.05, 'coral'], [10.43, 5.81, 'teal']]) {
    metal(H, R, x, j, .075, .17, 1.88, .15, ink);
  }
  for (const j of [6.73, 7.25]) {
    const q = H.p(10.57, j, 1.87);
    shape(H, R, [[q[0] - 4, q[1]], [q[0] + 4, q[1]], [q[0] + 4, q[1] + 15], [q[0] + 10, q[1] + 17], [q[0] + 10, q[1] + 22], [q[0] - 4, q[1] + 22]], 'teal', .47, .6);
    H.line(R, [[q[0] - 3, q[1] + 4], [q[0] + 3, q[1] + 4]], 'paper', 1.5);
  }
  box(H, R, 9.55, 7.72, 1.47, .88, .08, .64, 'sun', .36);
  shape(H, R, H.tile(9.67, 7.84, 1.22, .62, .73), 'blue', .5);
  for (let n = 0; n < 7; n++) H.line(R, [H.p(9.66 + n * .19, 8.61, .18), H.p(9.66 + n * .19, 8.61, .62)], 'teal', .8);
  for (let n = 0; n < 3; n++) H.line(R, [H.p(9.6, 8.62, .23 + n * .16), H.p(10.96, 8.62, .23 + n * .16)], 'paper', .85);
  drape(H, R, 9.7, 7.91, .89, .6, .81, .27, 'paper');
  bentTube(H, R, [[9.54, 8.11, .66], [9.33, 8.11, .88], [9.54, 8.11, .95]], 1.7, 'teal');
  hangingRail(H,R,'nw',7.58,2.35,2.51,2,(Q,u,n)=>{
    const a=Q(u,-.12);shape(H,R,[[a[0]-8,a[1]],[a[0]+8,a[1]],[a[0]+13,a[1]+14],[a[0]+8,a[1]+20],[a[0]+7,a[1]+40],[a[0]-8,a[1]+40],[a[0]-9,a[1]+18],[a[0]-13,a[1]+14]],n?'teal':'coral',.6);
    H.line(R,[[a[0],a[1]+4],[a[0],a[1]+37]],'paper',.8);if(!n)shape(H,R,[[a[0]+2,a[1]+26],[a[0]+7,a[1]+26],[a[0]+7,a[1]+34],[a[0]+2,a[1]+34]],'teal',.7,.5);
  });
  shape(H,R,H.tile(.75,8.38,2.66,1.41,.06),'blue',.52);
  for(const i of [1.08,1.94]) { metal(H,R,i,8.62,.57,.92,.1,.25,'teal');box(H,R,i,8.61,.54,.45,.35,.49,'teal',.62); }
  bentTube(H,R,[[3.72,8.2,.08],[3.72,8.2,1.61],[3.58,8.2,1.7],[3.41,8.2,1.6]],2.3,'sun');
  shape(H,R,[H.p(3.52,8.21,.24),H.p(3.9,8.21,.24),H.p(3.75,8.21,1.27)],'blue',.64);
  benchFrame(H,R,4.2,8.92,2.07,1.02,.62,'sun');
  shape(H, R, H.tile(4.38, 9.02, 1.45, .72, .645), 'blue', .68);
  const Q = (x, y) => H.p(4.42 + x, 9.05 + y, .67);
  for (const [points, ink] of [[[[0, 0], [.7, 0], [0, .63]], 'sun'], [[[.05, .63], [.73, .03], [.73, .63]], 'teal'], [[[.78, 0], [1.34, 0], [1.34, .27], [.78, .27]], 'paper'], [[[.83, .33], [1.31, .33], [1.31, .61]], 'coral']]) shape(H, R, points.map(([x, y]) => Q(x, y)), ink, .7, .55);
  shape(H, R, [H.p(5.93, 9.01, .65), H.p(6.16, 9.11, .65), H.p(5.93, 9.34, .65)], 'teal', .55);
  vessel(H,R,6.03,9.45,.65,3,5,'paper');
  oval(H,R,...H.p(6.89,9.88,.09),8,5,'teal',.7);
  box(H,R,8.16,8.7,.84,.55,.1,.75,'coral',.64);
  oval(H,R,...H.p(8.62,9.28,.58),5,5,'sun',.86);
  for (const x of [1.34, 2.57]) for (const j of [10.35, 11.16]) timber(H, R, x, j, .12, .12, .05, .48, 'teal');
  cushion(H, R, 1.22, 10.24, 1.5, 1.1, .44, .22, 'coral');
  shape(H, R, H.faceI(1.19, 10.17, 1.56, .64, 1.45), 'coral', .5);
  for (const x of [1.19, 2.62]) timber(H, R, x, 10.26, .15, 1.13, .79, .13, 'sun');
  drape(H, R, 1.32, 10.34, .61, .7, .69, .31, 'paper');
  const brush = H.p(2.98, 9.59, .13);
  shape(H, R, [[brush[0] - 7, brush[1] - 5], [brush[0] + 6, brush[1] - 7], [brush[0] + 9, brush[1]], [brush[0] - 5, brush[1] + 2]], 'sun', .7);
  for (let n = 0; n < 5; n++) H.line(R, [[brush[0] - 5 + n * 2.5, brush[1]], [brush[0] - 5 + n * 2.5, brush[1] + 4]], 'blue', .8);
  floorLight(H,5.9,3.9,90,.5);
},(H,R,t)=>{
  const u=((t%22)+22)%22,shift=.68*ease(4.4,8.8,u)*(1-ease(13.2,20,u));
  for(let n=0;n<19;n++) {
    const f=(u/22+n*.137)%1,uu=2.62+n*.388,z=3.46-f*2.08;
    const p=wallPt(H,'ne',uu,z,-.24),q=wallPt(H,'ne',uu-.04,z-.17,-.24);
    H.opacity(Math.sin(f*Math.PI)*.55,()=>H.line(R,[p,q],'paper',.8));
  }
  const cr=H.p(6.7,3.39,1.21),flutter=Math.sin(u*Math.PI/11)*1.5;
  shape(H,R,[[cr[0]-5,cr[1]],[cr[0]+2,cr[1]-3],[cr[0]+2,cr[1]-6+flutter]],'paper',1,.5);
  chair(H,R,5.88+shift,4.27+shift);
  actor(H,R,5.88+shift,4.27+shift,t,'london-rain-stretch',{shirt:['coral',.66],skin:['coral',.35],hairStyle:'bun',face:'nw'},.25,1.58);
});
room.loopSeconds=22;
room.stillTime=13.15;
export default room;
