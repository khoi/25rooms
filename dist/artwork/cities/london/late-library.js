import { world, actor, shape, oval, stroke, box, wallPt, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, drape, benchFrame, floorLight, cushion } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';
import { wallRack, windowBay, caster, taskLight, panelFront } from '../joinery.js';

const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u)};
const pose={...FIGURES.sample('sit',0),head:14,al:44,el:63};
FIGURES.clips['london-library-reader']={dur:24,keys:[[0,pose],[1,pose]]};
const rest=FIGURES.sample('idle',0);
FIGURES.clips['london-library-librarian']={dur:24,keys:[[0,{...rest,ar:54,er:30,head:9}],[.4,{...rest,ar:54,er:30,head:-12}],[.6,{...rest,ar:54,er:30,head:-12}],[.91,{...rest,ar:54,er:30,head:9}],[1,{...rest,ar:54,er:30,head:9}]]};
function books(H,R,i,j,w,z,row=0){
  for(let n=0;n<Math.floor(w/.22);n++){const x=i+n*.22,h=.38+(n*7%5)*.075;box(H,R,x,j,.16,.5,z,h,['coral','paper','teal','sun','blue'][(n+row)%5],.64);H.line(R,[H.p(x+.02,j+.51,z+.12),H.p(x+.14,j+.51,z+.12)],'sun',.7);if(n%3===0)H.line(R,[H.p(x+.02,j+.51,z+h-.07),H.p(x+.14,j+.51,z+h-.07)],'paper',.6);}
}
function table(H,R){
  benchFrame(H,R,3.48,3.77,4.52,1.98,1.04,'sun');
  shape(H,R,H.tile(3.68,3.95,4.07,1.55,1.052),'teal',.16,.5);
  for (const x of [3.79, 6.82]) {
    timber(H, R, x, 4.05, 1.03, 1.6, .71, .19, 'sun');
    shape(H, R, H.faceI(x + .08, 5.68, .85, .76, .9), 'teal', .45, .55);
    H.line(R, [H.p(x + .36, 5.7, .82), H.p(x + .68, 5.7, .82)], 'paper', 1.5);
  }
  for (const x of [4.9, 5.72]) {
    shape(H, R, [H.p(x, 3.75, 1.06), H.p(x + .16, 3.75, 1.06), H.p(x + .16, 4.4, 1.095), H.p(x, 4.4, 1.095)], 'sun', .65, .5);
  }
  timber(H, R, 4.86, 4.43, 1.17, .07, 1.058, .039, 'teal');
  cushion(H, R, 5.0, 4.93, 1.22, .29, 1.061, .05, 'paper');
  shape(H, R, H.tile(6.3, 4.09, .79, .71, 1.066), 'paper', 1);
  H.line(R, [H.p(6.72, 4.11, 1.071), H.p(6.72, 4.77, 1.071)], 'blue', .6);
  shape(H, R, [H.p(6.39, 4.31, 1.075), H.p(6.55, 4.2, 1.075), H.p(6.65, 4.45, 1.075), H.p(6.4, 4.53, 1.075)], 'teal', .6, .5);
  for (let n = 0; n < 3; n++) H.line(R, [H.p(6.77, 4.21 + n * .16, 1.072), H.p(7.02, 4.21 + n * .16, 1.072)], 'coral', .6);
  bentTube(H, R, [[6.37, 4.87, 1.08], [6.41, 5.16, 1.08], [6.67, 5.28, 1.08]], 2.1, 'sun');
  const q=H.p(4.05,4.23,1.07);oval(H,R,...q,8,3,'sun');H.line(R,[[q[0],q[1]],[q[0],q[1]-37]],'blue',2.7);
  shape(H,R,[[q[0]-16,q[1]-34],[q[0]+16,q[1]-34],[q[0]+9,q[1]-54],[q[0]-9,q[1]-54]],'teal',.77);
  oval(H,R,q[0],q[1]-33,16,4,'sun',.9);H.glow(q[0]+20,q[1]+4,77,34,'sun',.32);H.light(q[0]+20,q[1]+4,74,32,.65);
  H.line(R,[[q[0]+9,q[1]-32],[q[0]+9,q[1]-19]],'sun',.8);oval(H,R,q[0]+9,q[1]-17,1.6,2.2,'coral');
  const m=H.p(7.22,4.54,1.09);oval(H,R,...m,9,5,'paper');H.outline(R,ell(...m,7,3.8),'teal',1.3);H.line(R,[[m[0]+6,m[1]+3],[m[0]+17,m[1]+9]],'blue',3);
  shape(H,R,H.tile(6.85,5.05,.7,.29,1.08),'coral',.6);
  for(let n=0;n<7;n++) H.dot(...H.p(6.92+n*.075,5.12,1.09),.8,'sun');
  drape(H,R,3.6,5.21,.64,.4,1.07,.23,'paper');
  for(let n=0;n<3;n++) box(H,R,7.1+n*.02,3.91+n*.02,.58,.45,1.07+n*.09,.08,['coral','teal','sun'][n],.6);
}
function spread(H,R,turn,t){
  const P=(x,y,z=0)=>H.p(5.42+x,4.03+y,1.1+z);
  shape(H,R,[P(-.52,-.29),P(.52,-.29),P(.52,.4),P(-.52,.4)],'coral',.7);
  for(const side of [-1,1]){
    shape(H,R,[P(0,-.28,.02),P(side*.34,-.28,.055),P(side*.34,.36,.055),P(0,.36,.02)],'paper',1);
    shape(H,R,[P(side*.08,-.16,.058),P(side*.37,-.16,.058),P(side*.37,.1,.058),P(side*.08,.1,.058)],side<0?'teal':'sun',.4,.5);
    for(let n=0;n<3;n++)H.line(R,[P(side*.09,.18+n*.048,.06),P(side*.38,.18+n*.048,.06)],'blue',.6);
  }
  const a=Math.PI*turn,w=.34;
  const leaf=[P(0,-.28,.07),P(w*Math.cos(a),-.28,.07+Math.sin(a)*w),P(w*Math.cos(a),.36,.07+Math.sin(a)*w),P(0,.36,.07)];
  shape(H,R,leaf,'paper',1,.6);
  if(turn<.35||turn>.75) H.line(R,[leaf[1],leaf[2]],'sun',1);
  const tag=P(-.14+Math.sin(t*Math.PI/12)*.015,.52,.055);shape(H,R,[P(-.2,.34,.06),P(-.08,.34,.06),tag,[tag[0]-4,tag[1]+3]],'coral',.7,.5);
  return leaf[1];
}
const room=world('london-late-library','One lamp left on',{wall:'blue',wallTone:.55,height:4.25,floor:'blue',tone:.27,head:45},(H,R)=>{
  shape(H,R,H.tile(.1,.1,11.8,11.8,.03),'blue',.51,.5);
  for(let i=0;i<12;i+=1.5)for(let j=0;j<12;j+=1.4)H.outline(R,H.tile(i+.05,j+.05,1.4,1.3,.035),'paper',.6,{tone:.25});
  const arch=(x,w,bottom,h,depth)=>{
    const P=(u,z)=>wallPt(H,'ne',x+u,z,-depth),pts=[P(0,bottom),P(w,bottom),P(w,bottom+h-1)];
    for(let n=0;n<=24;n++){const a=n*Math.PI/24;pts.push(P(w/2+Math.cos(a)*w/2,bottom+h-1+Math.sin(a)));}
    return pts;
  };
  for (const side of ['ne', 'nw']) {
    H.line(R, [wallPt(H, side, .07, 4.12, -.17), wallPt(H, side, 11.91, 4.12, -.17)], 'sun', 6);
    H.line(R, [wallPt(H, side, .07, 4.22, -.19), wallPt(H, side, 11.91, 4.22, -.19)], 'paper', 1.2);
  }
  shape(H,R,arch(3.15,5.38,.12,4.03,.12),'sun',.55,1.3);
  shape(H,R,arch(3.34,4.74,.18,3.65,.18),'paper',1,1);
  shape(H,R,arch(3.67,4.34,.25,3.4,.23),'blue',.72,1);
  for (const x of [3.17, 8.12]) {
    timber(H, R, x, .15, .29, 1.12, .08, 2.98, 'paper');
    timber(H, R, x - .11, .1, .5, 1.23, .13, .21, 'sun');
    timber(H, R, x - .06, .11, .4, 1.2, 2.69, .22, 'sun');
    for (const z of [.75, 1.44, 2.12]) H.line(R, [H.p(x + .015, 1.28, z), H.p(x + .275, 1.28, z)], 'teal', .7);
  }
  for(let n=0;n<12;n++){const a=n*Math.PI/12;const P=(r,z)=>wallPt(H,'ne',5.84+Math.cos(a)*r,z,-.25);H.line(R,[P(2.38,3.02+Math.sin(a)*1.01),P(2.64,3.1+Math.sin(a)*1.07)],'blue',.7);}
  shape(H,R,[wallPt(H,'ne',3.72,.25,-.24),wallPt(H,'ne',8,.25,-.24),wallPt(H,'ne',8,2.46,-.24),wallPt(H,'ne',3.72,2.46,-.24)],'teal',.3,.5);
  for(const x of [3.77,7.62]) timber(H,R,x,.28,.29,1.53,.14,1.83,'sun');
  timber(H,R,3.85,.34,3.91,1.36,.11,.55,'sun');
  panelFront(H,R,3.89,1.72,3.78,.14,.46,3,'sun');
  for(const z of [.3,.48]) H.line(R,[H.p(6.77,1.76,z),H.p(7.17,1.76,z)],'blue',1.8);
  drape(H,R,4.04,.5,3.44,1.08,.72,.17,'coral');
  for (let n = 0; n < 3; n++) {
    const x = 4.23 + n * 1.05;
    cushion(H, R, x, .37, .87, .46, .84, .17, n === 1 ? 'teal' : 'paper');
    shape(H, R, H.faceI(x, .78, .86, 1.0, 1.54), n === 1 ? 'teal' : 'paper', .7, .65);
    H.line(R, [H.p(x + .11, .8, 1.13), H.p(x + .17, .8, 1.44), H.p(x + .68, .8, 1.41)], 'sun', .6);
  }
  timber(H,R,3.83,.34,3.96,.34,2.5,.11,'sun');
  books(H,R,4.06,.36,2.64,2.62);
  const q=H.p(7.34,.59,2.65);shape(H,R,[[q[0]-9,q[1]],[q[0]-2,q[1]-7],[q[0]+4,q[1]-3],[q[0]+13,q[1]-8],[q[0]+7,q[1]+2]],'paper',1,.6);
  for(const [i,w] of [[.4,2.37],[8.94,2.58]]) cabinetFrame(H,R,i,.27,w,1.14,.08,3.98,2,'sun',(x,j,cw,d,z,h,n)=>{for(let row=0;row<5;row++){const zz=.32+row*.69;timber(H,R,x,j,cw,d,zz,.09,'sun');books(H,R,x+.05,j+.18,cw-.08,zz+.1,row+n);} });
  wallRack(H,R,'nw',2.0,8.45,.17,3.58,4,'sun',(P,z,row)=>{
    for (let group = 0; group < 4; group++) {
      const start = .21 + group * 2.04;
      if ((group + row) % 4 === 1) {
        for (let n = 0; n < 3; n++) {
          const u = start + n * .05;
          shape(H, R, [P(u, z + .09 + n * .14), P(u + 1.03, z + .09 + n * .14), P(u + 1.03, z + .2 + n * .14), P(u, z + .2 + n * .14)], n === 1 ? 'paper' : 'coral', .67, .5);
          H.line(R, [P(u + .11, z + .14 + n * .14), P(u + .87, z + .14 + n * .14)], 'sun', .6);
        }
        shape(H, R, [P(start + 1.24, z + .08), P(start + 1.58, z + .08), P(start + 1.39, z + .68), P(start + 1.08, z + .68)], 'teal', .6, .55);
      } else if (group === 2 && row === 2) {
        shape(H, R, [P(start + .22, z + .08), P(start + 1.58, z + .08), P(start + 1.58, z + .68), P(start + .22, z + .68)], 'paper', 1, .6);
        H.line(R, [P(start + .34, z + .2), P(start + .75, z + .47), P(start + 1.02, z + .29), P(start + 1.46, z + .57)], 'teal', 2);
        oval(H, R, ...P(start + 1.3, z + .53), 3, 3, 'coral');
      } else {
        for (let n = 0; n < 6; n++) {
          const u = start + n * .29, h = .39 + (n * 3 % 4) * .08;
          shape(H, R, [P(u, z + .08), P(u + .22, z + .08), P(u + .22, z + h), P(u, z + h)], ['teal', 'coral', 'paper', 'sun'][(n + row) % 4], .62, .5);
          H.line(R, [P(u + .03, z + .2), P(u + .19, z + .2)], 'paper', .65);
        }
      }
    }
  });
  for (const y of [2.06, 4.09, 6.12, 8.15, 10.27]) timber(H, R, .2, y, .49, .13, .13, 3.67, 'sun');
  timber(H, R, .17, 1.99, .62, 8.56, 3.82, .13, 'sun');
  timber(H, R, .15, 2.0, .7, 8.51, .06, .16, 'teal');
  windowBay(H,R,'nw',10.6,1.17,1.29,2.51,{night:true,divisions:1});
  drape(H,R,.21,10.59,.2,.39,3.9,2.6,'coral');
  timber(H,R,.68,6.7,.73,2.5,.1,.6,'sun');
  drape(H,R,.7,6.72,.68,2.4,.74,.13,'teal');
  floorLight(H,5.27,4.9,116,.45);
  for(const x of [4.86,5.95]) for(const j of [2.99,3.68]) timber(H,R,x,j,.14,.14,.06,.58,'sun');
  cushion(H,R,4.8,3.01,1.34,.89,.58,.2,'coral');
  box(H,R,4.76,2.93,1.42,.21,.72,1.0,'coral',.62);
  for(const x of [4.73,6.05]) timber(H,R,x,3.03,.17,.94,.94,.15,'sun');
  const p=H.p(4.78,3.76,1.12);shape(H,R,[[p[0]-4,p[1]-2],[p[0]+5,p[1]-2],[p[0]+5,p[1]+4],[p[0]-4,p[1]+4]],'paper',.8,.5);for(let n=0;n<4;n++)H.line(R,[[p[0]-3+n*2,p[1]-3],[p[0]-3+n*2,p[1]+4]],'coral',.55);
  benchFrame(H,R,2.32,8.33,3.62,1.16,.83,'sun');
  shape(H,R,[H.p(2.75,8.52,.86),H.p(5.42,8.52,.86),H.p(5.42,9.25,1.29),H.p(2.75,9.25,1.29)],'teal',.55);
  for(let n=0;n<3;n++) shape(H,R,[H.p(2.94+n*.72,8.58,.92),H.p(3.54+n*.72,8.58,.92),H.p(3.54+n*.72,9.13,1.24),H.p(2.94+n*.72,9.13,1.24)],'paper',1,.6);
  for (let n = 0; n < 3; n++) {
    const x = 2.94 + n * .72;
    H.line(R, [H.p(x + .11, 8.66, .98), H.p(x + .24, 8.79, 1.06), H.p(x + .17, 8.91, 1.16), H.p(x + .48, 9.05, 1.21)], n === 1 ? 'coral' : 'teal', 1.5);
    for (let k = 0; k < 3; k++) H.line(R, [H.p(x + .28, 8.65 + k * .13, .99 + k * .067), H.p(x + .53, 8.66 + k * .13, .99 + k * .067)], 'blue', .5);
  }
  for (const x of [2.59, 5.42]) bentTube(H, R, [[x, 8.49, .84], [x, 8.76, .91], [x, 9.21, 1.28]], 1.7, 'sun');
  timber(H, R, 2.64, 9.23, 2.89, .1, 1.22, .1, 'sun');
  metal(H,R,5.25,8.25,.31,.63,.89,.08,'coral');
  cabinetFrame(H, R, 9.15, 3.28, 2.02, 1.38, .1, 1.13, 2, 'teal', (i, j, w, d, z, h, n) => {
    for (let k = 0; k < 3; k++) {
      box(H, R, i + .09, j + .08, w - .19, d - .18, .22 + k * .26, .21, n ? 'paper' : 'sun', .65);
      H.line(R, [H.p(i + .26, j + d -.08, .31 + k * .26), H.p(i + .6, j + d -.08, .31 + k * .26)], 'teal', 1.4);
    }
  });
  timber(H, R, 9.08, 3.21, 2.15, 1.55, 1.25, .1, 'sun');
  for (const x of [9.23, 10.95]) bentTube(H, R, [[x, 3.38, 1.35], [x, 3.38, 2.26]], 2, 'teal');
  shape(H, R, [H.p(9.23, 3.38, 1.63), H.p(10.97, 3.38, 1.63), H.p(10.97, 3.14, 2.24), H.p(9.23, 3.14, 2.24)], 'sun', .58);
  for (let n = 0; n < 2; n++) {
    const x = 9.33 + n * .8;
    shape(H, R, [H.p(x, 3.36, 1.68), H.p(x + .68, 3.36, 1.68), H.p(x + .68, 3.14, 2.17), H.p(x, 3.14, 2.17)], n ? 'coral' : 'paper', .75, .6);
    oval(H, R, ...H.p(x + .35, 3.23, 1.94), 6, 5, n ? 'paper' : 'teal');
  }
  for (let n = 0; n < 3; n++) box(H, R, 9.3 + n * .05, 3.86, 1.07, .63, 1.37 + n * .08, .065, n === 1 ? 'teal' : 'paper', .75);
  drape(H, R, 10.6, 3.81, .47, .68, 1.38, .31, 'coral');
  const globe = H.p(10.08, .73, 4.09);
  oval(H, R, globe[0], globe[1] - 10, 10, 10, 'teal', .5);
  H.outline(R, ell(globe[0], globe[1] - 10, 5, 10), 'sun', .8);
  H.line(R, [[globe[0] - 10, globe[1] - 10], [globe[0] + 10, globe[1] - 10]], 'paper', .7);
  H.line(R, [[globe[0], globe[1]], [globe[0], globe[1] + 5]], 'sun', 2);
  oval(H, R, globe[0], globe[1] + 5, 7, 2.5, 'sun');
  box(H,R,8.82,7.18,2.0,1.2,.25,.13,'teal',.5);
  for(const x of [8.82,10.68]) for(const j of [7.18,8.25]) {caster(H,R,x,j);metal(H,R,x,j,.09,.09,.19,1.16,'teal');}
  timber(H,R,8.74,7.12,2.13,1.26,1.26,.09,'sun');
  bentTube(H,R,[[10.72,7.18,1.23],[10.72,7.18,1.75],[10.72,8.31,1.75],[10.72,8.31,1.23]],2,'teal');
  books(H,R,8.95,7.39,1.61,.4,2);
  for(let n=0;n<3;n++)box(H,R,9.05+n*.06,7.55+n*.02,1.25,.61,1.36+n*.08,.07,['paper','coral','teal'][n],.65);
  drape(H,R,8.93,7.3,.42,.55,1.37,.27,'coral');
},(H,R,t)=>{
  const u=((t%24)+24)%24,turn=ease(4.8,9.6,u)*(1-ease(14.4,22,u));
  const a=Math.PI*turn,target=H.p(5.42+.34*Math.cos(a),3.75,1.17+.34*Math.sin(a));
  const origin=H.p(5.43,3.49,0),sc=1.5,dx=-(target[0]-origin[0])/sc-5.2,dy=(target[1]-origin[1])/sc+23.57,r=Math.min(8.5,Math.hypot(dx,dy)),e=Math.acos(Math.max(-1,Math.min(1,(r*r-4.368**2-4.2**2)/(2*4.368*4.2))));
  pose.ar=(Math.atan2(dx,dy)-Math.atan2(4.2*Math.sin(e),4.368+4.2*Math.cos(e)))*180/Math.PI;pose.er=e*180/Math.PI;
  let hands;
  actor(H,R,5.43,3.49,t,'london-library-reader',{shirt:['paper',1],skin:['coral',.56],face:'sw',hairStyle:'curly',prop:(HH,RR,p)=>{hands=p}},0,1.5);
  table(H,R);spread(H,R,turn,t);
  const elbow=hands.D.pt([5.2+Math.sin(pose.ar*Math.PI/180)*4.368,-23.57+Math.cos(pose.ar*Math.PI/180)*4.368]);
  H.line(R,[elbow,hands.nearHand],'blue',4.2);H.line(R,[elbow,hands.nearHand],'paper',2.6);oval(H,R,...hands.nearHand,2.7,2.3,'coral',.56);
  actor(H,R,10.25,8.73,t,'london-library-librarian',{shirt:['teal',.7],hairStyle:'bun',skin:['coral',.33],face:'nw'},0,1.5);
});
room.loopSeconds=24;
room.stillTime=12;
export default room;
