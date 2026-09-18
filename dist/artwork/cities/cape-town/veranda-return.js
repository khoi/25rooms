import { world, shape, oval, stroke, cycle, mix, wallPt, wallRect } from '../../worlds/common.js';
import { timber, metal, bentTube, cushion, drape, slattedSeat, vessel, floorLight } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { recessedFrame, panelFront, taskLight, wallRack } from '../joinery.js';
import { foldedCloth, shallowTray, satchel, slattedCrate, handTool } from '../furnishings.js';

const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };
function person(H, R, i, j, ink, rise = 0, nod = 0) {
  const [x, y] = H.p(i, j), h = 54 + rise * 21, hip = y - (13 + rise * 19), sy = y - h + 23;
  H.tint([[x - 14, y + 1], [x + 22, y + 3], [x + 30, y + 9], [x - 3, y + 8]], 'blue', .16);
  for (const s of [-1, 1]) {
    stroke(H, R, [[x + s * 5, hip], [x + s * 10 + (1-rise)*7, y - 14], [x + s * 10 + (1-rise)*9, y - 2]], 'blue', 7);
    oval(H, R, x + s * 10 + 3+(1-rise)*9, y, 7, 3, 'blue', .8);
  }
  shape(H, R, [[x - 10, sy], [x + 10, sy], [x + 12, hip + 3], [x - 11, hip + 3]], ink, .68, .8);
  const hy = y - h + 10 + nod;
  oval(H, R, x + 1, hy, 9, 10, 'coral', .36);
  shape(H, R, [[x - 8, hy], [x - 10, hy - 7], [x - 3, hy - 12], [x + 7, hy - 10], [x + 10, hy - 4], [x + 4, hy - 5]], 'blue', .82, .6);
  H.dot(x + 5, hy + 1, 1, 'blue'); stroke(H, R, [[x + 5, hy + 5], [x + 2, hy + 6], [x, hy + 5]], 'blue', .6);
  return (left, right) => {
    for (const [s, hand] of [[-1, left], [1, right]]) {
      const target = hand || [x + s * 14, hip - 2];
      stroke(H, R, [[x + s * 9, sy + 3], [mix(x + s * 14, target[0], .45), Math.max(sy + 12, target[1] + 8)], target], 'blue', 6.5);
      stroke(H, R, [[x + s * 9, sy + 3], [mix(x + s * 14, target[0], .45), Math.max(sy + 12, target[1] + 8)], target], ink, 4.8);
      oval(H, R, ...target, 3.2, 3, 'coral', .38);
    }
  };
}

function boot(H,R,i,j,z,size=1,ink='blue') {
  const [x,y]=H.p(i,j,z);shape(H,R,[[x-4*size,y-18*size],[x+4*size,y-18*size],[x+4*size,y-6*size],[x+11*size,y-4*size],[x+12*size,y],[x-4*size,y]],ink,.67,.7);
  oval(H,R,x,y-18*size,4*size,1.7*size,'blue',.83);H.line(R,[[x-2*size,y-15*size],[x-2*size,y-3*size],[x+9*size,y-2*size]],'paper',.8);
}
function bench(H,R) {
  timber(H,R,6.42,3.61,4.5,1.73,.1,.45,'teal');
  panelFront(H,R,6.48,5.37,2.56,.16,.36,2,'teal');
  shape(H,R,H.faceI(9.15,5.39,1.55,.18,.54),'blue',.75,.65);
  shallowTray(H,R,9.2,5.3,1.46,.62,.19,'teal');
  foldedCloth(H,R,9.35,5.4,.83,.42,.34,'paper','coral');
  H.line(R,[H.p(9.62,5.95,.3),H.p(10.11,5.95,.3)],'sun',1.7);

  for(const i of [6.5,10.62])timber(H,R,i,3.66,.18,.18,.28,1.38,'sun');
  for(let n=0;n<5;n++)timber(H,R,6.4,3.67+n*.31,4.53,.28,.59,.1,'sun');
  for(let n=0;n<3;n++)timber(H,R,6.4,3.67,.12+4.41,.1,.98+n*.26,.17,'sun');
  for(const i of [6.46,10.8])bentTube(H,R,[[i,5.08,.68],[i,5.08,1.01],[i,3.74,1.17]],2.9,'teal');
  for(const i of [7.28,8.26,9.24,10.22]){
    timber(H,R,i,3.68,.1,.14,.82,.85,'teal');
    H.dot(...H.p(i+.05,3.85,1.53),1.3,'sun');
  }
  for(const i of [6.52,10.69]){const p=H.p(i,4.82,1.0);oval(H,R,...p,5.4,3.2,'sun',.75);H.line(R,[[p[0]-3,p[1]],[p[0]+3,p[1]]],'paper',1);}
  cushion(H,R,7.55,3.95,2.0,1.14,.71,.13,'paper');
  cushion(H,R,6.83,3.9,.58,.83,.76,.26,'coral');
  for(let n=0;n<5;n++)H.line(R,[H.p(7.7+n*.34,5.11,.84),H.p(7.7+n*.34,5.11,.74)],'teal',.7);

  shape(H,R,H.faceI(10.07,5.39,.52,.25,.49),'blue',.46,.6);H.line(R,[H.p(10.18,5.41,.39),H.p(10.43,5.41,.39)],'sun',1.8);
  metal(H,R,10.58,3.76,.22,.31,.74,.13,'coral');
  drape(H,R,9.62,4.12,1.08,1.19,.72,.34,'paper');
}
function door(H,R,angle) {
  const P=(u,z,d=0)=>H.p(4.22+u*Math.cos(angle)-d*Math.sin(angle),.32+u*Math.sin(angle)+d*Math.cos(angle),z);
  const leaf=[P(0,.08),P(2.66,.08),P(2.66,2.91),P(0,2.91)];shape(H,R,leaf,'teal',.68,.9);
  shape(H,R,[P(.17,.24,.02),P(2.5,.24,.02),P(2.5,1.11,.02),P(.17,1.11,.02)],'teal',.37,.65);
  for(let n=0;n<6;n++)H.line(R,[P(.29+n*.39,.31,.03),P(.29+n*.39,1.05,.03)],'blue',.85,{tone:.6});
  shape(H,R,[P(.2,1.32,.025),P(2.47,1.32,.025),P(2.47,2.72,.025),P(.2,2.72,.025)],'paper',.53,.65);
  H.line(R,[P(1.31,1.33,.04),P(1.31,2.72,.04)],'teal',3.1);
  H.line(R,[P(.24,2.05,.04),P(2.43,2.05,.04)],'teal',3.1);
  H.line(R,[P(.42,1.43,.04),P(.79,2.52,.04)],'paper',2.5,{tone:.7});
  H.line(R,[P(2.33,1.16,.08),P(2.33,1.42,.08)],'sun',3.5);
  for(const z of [.48,2.45]) {
    shape(H,R,[P(-.13,z-.09,.03),P(.27,z-.09,.03),P(.27,z+.09,.03),P(-.13,z+.09,.03)],'sun',.77,.6);
    for(const u of [-.05,.17])H.dot(...P(u,z,.05),1.1,'blue');
    H.line(R,[P(0,z-.12,.06),P(0,z+.12,.06)],'blue',3);
  }
  shape(H,R,[P(.16,.16,.03),P(2.49,.16,.03),P(2.49,.36,.03),P(.16,.36,.03)],'blue',.47,.65);
  for(const u of [.28,2.37])H.dot(...P(u,.26,.04),1.2,'sun');
  shape(H,R,[P(2.26,1.57,.05),P(2.55,1.57,.05),P(2.55,1.91,.05),P(2.26,1.91,.05)],'sun',.67,.6);
  H.dot(...P(2.4,1.83,.07),1.4,'blue');
  H.line(R,[P(.16,2.86,.04),P(2.5,2.86,.04)],'paper',1.1);
  return P(2.49,1.75,.08);
}
function strap(H,R,from,to,taut) {
  const middle=[mix(from[0],to[0],.5),mix(from[1],to[1],.5)+(1-taut)*13];
  stroke(H,R,[from,middle,to],'blue',6.3);stroke(H,R,[from,middle,to],'coral',4.9);
  H.line(R,[[from[0]-1,from[1]-1],[middle[0]-1,middle[1]-1],[to[0]-1,to[1]-1]],'paper',.75,{tone:.77});
  for(const [f,ink]of[[.23,'paper'],[.48,'sun'],[.74,'teal']]) {
    const p=[mix(from[0],to[0],f),mix(from[1],to[1],f)+(1-taut)*13*Math.sin(Math.PI*f)];
    for(let n=-1;n<2;n++)H.line(R,[[p[0]-2+n*2,p[1]-3],[p[0]+1+n*2,p[1]+3]],ink,.9);
  }
  oval(H,R,...to,3.5,4.1,'coral',.55);oval(H,R,...to,1.8,2.5,'blue',.72);
}
const room=world('cape-town-veranda-return','The strap holds the door',{floor:'blue',tone:.35,wall:false,head:105},(H,R)=>{
  for(let a=0;a<8;a++)for(let b=0;b<10;b++){const i=a*1.5,j=b*1.2;shape(H,R,H.tile(i+.035,j+.035,1.41,1.11,.017),(Math.floor(i+j)%4===0?'coral':'paper'),.32,.7);}
  masonry(H,R,'ne',0,12,0,3.7,'coral',.36);masonry(H,R,'nw',0,10.5,0,1.08,'teal',.43);
  for(const j of [.22,10.26]) {timber(H,R,.18,j,.27,.28,.1,3.76,'teal');metal(H,R,.13,j-.04,.38,.36,.07,.15,'blue');}
  timber(H,R,.17,.18,.31,10.38,3.53,.27,'sun');
  timber(H,R,.13,.39,.39,9.67,1.08,.15,'paper');
  for(const j of [.55,1.77,2.99,4.21,5.43,6.65,7.87,9.09]){
    bentTube(H,R,[[.31,j,1.2],[.31,j,1.76],[.31,j+.26,1.92],[.31,j+.52,1.76],[.31,j+.52,1.2]],1.8,'teal');
    H.line(R,[H.p(.31,j+.26,1.28),H.p(.31,j+.26,1.87)],'sun',1.1);
  }
  timber(H,R,.17,.47,.31,9.43,1.92,.1,'teal');
  for(const j of [.55,1.69,2.83,3.97,5.11,6.25,7.39,8.53,9.67]){
    const p=H.p(.33,j,3.48),q=H.p(.33,j+.55,3.48),r=H.p(.33,j+.28,3.11);
    shape(H,R,[p,q,r],'paper',.67,.7);H.line(R,[[p[0]+(r[0]-p[0])*.35,p[1]+(r[1]-p[1])*.35],[q[0]+(r[0]-q[0])*.35,q[1]+(r[1]-q[1])*.35]],'teal',1);
  }
  const blind=(u,z)=>wallPt(H,'nw',6.82+u,z,-.39);
  shape(H,R,[blind(0,3.45),blind(2.55,3.45),blind(2.55,2.38),blind(0,2.38)],'sun',.31,.7);
  for(let n=0;n<9;n++)H.line(R,[blind(.04,2.43+n*.115),blind(2.51,2.43+n*.115)],'teal',.8,{tone:.7});
  for(const u of [.25,2.29])H.line(R,[blind(u,3.47),blind(u,2.31)],'coral',1.2);
  stroke(H,R,[blind(2.51,3.39),blind(2.79,2.31),blind(2.71,1.87)],'sun',1.1);

  for(const j of [.46,9.88])bentTube(H,R,[[.36,j,3.52],[.36,j+.47*(j<5?1:-1),2.93]],3.2,'teal');
  for(let i=0;i<12;i+=.66){const P=[H.p(i,.05,3.93),H.p(i+.62,.05,3.93),H.p(i+.62,1.23,3.62),H.p(i,1.23,3.62)];shape(H,R,P,'teal',.48,.7);H.line(R,[P[0],P[3]],'paper',1,{tone:.5});}
  metal(H,R,.02,1.2,11.95,.18,3.55,.14,'blue');H.line(R,[H.p(.08,1.23,3.7),H.p(11.88,1.23,3.7)],'paper',1.3);
  bentTube(H,R,[[11.7,1.28,3.6],[11.7,1.28,2.96],[11.43,1.28,2.71],[11.43,1.28,.13]],4,'teal');
  for(const z of [.47,1.76,2.67])metal(H,R,11.34,1.2,.26,.18,z,.09,'sun');
  const P=(u,z)=>wallPt(H,'ne',4.04+u,z,-.19);
  shape(H,R,[P(0,.07),P(3.14,.07),P(3.14,3.12),P(0,3.12)],'sun',.85,1.1);
  shape(H,R,[P(.16,.11),P(2.97,.11),P(2.97,2.99),P(.16,2.99)],'blue',.6,.7);
  shape(H,R,[P(.23,.19),P(2.89,.19),P(2.89,2.91),P(.23,2.91)],'sun',.22,.5);
  timber(H,R,4.02,.03,3.18,.63,.02,.14,'paper');
  shape(H,R,[H.p(4.3,.39,.17),H.p(6.82,.39,.17),H.p(8.3,5.74,.019),H.p(4.02,5.52,.019)],'sun',.2,.1);
  metal(H,R,4.11,.87,3.02,.31,.01,.06,'blue');for(let i=4.2;i<7.1;i+=.2)H.line(R,[H.p(i,.9,.08),H.p(i,1.14,.08)],'paper',.8);
  slattedSeat(H,R,5.71,.27,1.66,.02,'sun',.63);
  cabinetFrame(H,R,8.33,.27,2.86,1.23,.15,3.05,2,'teal',(i,j,w,d,z,h,col)=>{
    for(const level of [.62,1.31,2.05])timber(H,R,i,j,w,d,z+level,.08,'sun');
    if(!col){
      shallowTray(H,R,i+.09,j+.1,w-.17,.86,z+.04,'teal');boot(H,R,i+.38,j+.62,z+.21,.8);boot(H,R,i+.87,j+.62,z+.21,.8,'teal');
      shallowTray(H,R,i+.08,j+.12,.43,.72,z+.73,'coral');boot(H,R,i+.25,j+.54,z+.82,.43,'sun');
      foldedCloth(H,R,i+.62,j+.15,.52,.7,z+.74,'paper','coral');
      for(const [x,ink]of[[.31,'coral'],[.86,'sun']]){const p=H.p(i+x,j+.5,z+1.63);vessel(H,R,i+x,j+.5,z+1.47,6,8,ink);stroke(H,R,[[p[0]+5,p[1]+3],[p[0]+11,p[1]+3],[p[0]+11,p[1]+10],[p[0]+5,p[1]+10]],x<.5?'teal':'sun',1.5);}
      slattedCrate(H,R,i+.08,j+.11,w-.16,.87,z+2.14,.4,'sun');
    }else{
      vessel(H,R,i+.59,j+.54,z+.05,12,25,'teal');bentTube(H,R,[[i+.55,j+.5,z+.35],[i+.55,j+.5,z+1.25],[i+.4,j+.5,z+1.4],[i+.28,j+.5,z+1.3]],2.7,'sun');
      foldedCloth(H,R,i+.09,j+.09,w-.19,.88,z+1.43,'paper','teal');
      panelFront(H,R,i,j+d,w,z+2.13,.58,1,'teal');for(let n=0;n<5;n++)H.line(R,[H.p(i+.19+n*.17,j+d+.03,z+2.23),H.p(i+.19+n*.17,j+d+.03,z+2.51)],'blue',.85);
    }
  });
  wallRack(H,R,'ne',.73,2.69,2.38,.8,1,'sun',(P,z)=>{
    shape(H,R,[P(.13,z+.06),P(.95,z+.06),P(.95,z+.59),P(.13,z+.59)],'paper',1,.5);const p=P(.5,z+.31);oval(H,R,p[0],p[1]-3,3,3.5,'blue',.7);H.line(R,[[p[0]-4,p[1]+6],[p[0]+4,p[1]+6]],'coral',5);
    const q=P(1.52,z+.22);oval(H,R,q[0],q[1]-7,7,7,'paper',1);H.line(R,[[q[0]-5,q[1]-9],[q[0]+5,q[1]-1]],'sun',1.3);stroke(H,R,[[q[0]+6,q[1]-12],[q[0]+11,q[1]-11],[q[0]+11,q[1]-3],[q[0]+6,q[1]-3]],'coral',1.3);
    const b=P(2.21,z+.26);shape(H,R,[[b[0]-9,b[1]+2],[b[0]+7,b[1]-3],[b[0]+11,b[1]-11],[b[0]-1,b[1]-5]],'paper',1,.6);H.line(R,[[b[0]-1,b[1]-5],[b[0]+1,b[1]+1]],'teal',.7);
  });
  const hooks=(u,z)=>wallPt(H,'ne',.95+u,z,-.25);
  H.line(R,[hooks(0,2.05),hooks(2.39,2.05)],'sun',3);
  for(const u of [.29,1.12,2.02]){
    const p=hooks(u,2.06);stroke(H,R,[[p[0],p[1]-2],[p[0]+4,p[1]+5],[p[0]+8,p[1]+1]],'blue',1.8);
  }
  const coat=hooks(.37,1.96);shape(H,R,[[coat[0]-4,coat[1]+5],[coat[0]-14,coat[1]+12],[coat[0]-20,coat[1]+28],[coat[0]-12,coat[1]+32],[coat[0]-8,coat[1]+21],[coat[0]-9,coat[1]+49],[coat[0]+12,coat[1]+49],[coat[0]+10,coat[1]+21],[coat[0]+16,coat[1]+30],[coat[0]+23,coat[1]+25],[coat[0]+15,coat[1]+10],[coat[0]+5,coat[1]+4]],'teal',.64,.8);
  H.line(R,[[coat[0]+1,coat[1]+8],[coat[0]+2,coat[1]+46]],'sun',1.2);
  const hat=hooks(1.91,1.95);oval(H,R,hat[0],hat[1]+15,15,5,'sun',.65);shape(H,R,[[hat[0]-10,hat[1]+13],[hat[0]-7,hat[1]+1],[hat[0]+6,hat[1]-2],[hat[0]+11,hat[1]+12]],'sun',.63,.7);H.line(R,[[hat[0]-9,hat[1]+10],[hat[0]+10,hat[1]+9]],'coral',2);
  bench(H,R);
  timber(H,R,5.65,3.1,.23,.23,.05,2.91,'teal');metal(H,R,5.6,3.06,.34,.31,.05,.15,'blue');
  bentTube(H,R,[[5.77,3.17,2.89],[6.33,3.17,3.36]],3,'teal');
  const hp=H.p(5.9,3.22,1.76);stroke(H,R,[[hp[0]-4,hp[1]-4],[hp[0],hp[1]+3],[hp[0]+5,hp[1]],[hp[0]+5,hp[1]-5]],'sun',2.4);
  const lamp=H.p(5.88,3.12,2.47);H.line(R,[[lamp[0],lamp[1]-13],[lamp[0],lamp[1]+6]],'blue',2);shape(H,R,[[lamp[0]-13,lamp[1]-7],[lamp[0]+13,lamp[1]-7],[lamp[0]+8,lamp[1]-17],[lamp[0]-8,lamp[1]-17]],'coral',.8,.8);oval(H,R,lamp[0],lamp[1]-7,12,4,'sun',.9);H.glow(lamp[0],lamp[1]+8,42,48,'sun',.4);
  slattedSeat(H,R,2.26,3.48,1.78,.03,'coral',.9);cushion(H,R,2.39,3.65,1.47,.59,.72,.12,'paper');
  timber(H,R,8.91,7.83,1.7,1.11,.26,.09,'teal');
  foldedCloth(H,R,9.03,7.94,1.45,.81,.37,'paper','teal');
  timber(H,R,8.73,7.64,2.09,1.52,.75,.13,'sun');for(const i of [8.9,10.54])for(const j of [7.81,8.89])timber(H,R,i,j,.13,.13,.03,.73,'teal');
  shallowTray(H,R,8.91,7.84,1.69,1.16,.9,'teal');vessel(H,R,9.44,8.38,1.1,12,8,'paper',false);oval(H,R,...H.p(9.44,8.38,1.42),3,2,'coral',.8);
  vessel(H,R,10.1,8.1,1.1,6,19,'teal');vessel(H,R,10.1,8.64,1.1,5,9,'paper');foldedCloth(H,R,9.7,8.66,.37,.23,1.1,'paper','coral');
  shape(H,R,H.tile(3.82,6.6,4.03,2.05,.03),'teal',.44,.75);for(let n=0;n<17;n++)H.line(R,[H.p(3.94+n*.22,6.72,.04),H.p(3.94+n*.22,8.53,.04)],'sun',.9,{tone:.65});
  timber(H,R,.92,7.93,2.68,.91,.49,.13,'sun');
  for(const i of [1.03,3.33])for(const j of [8.02,8.63])timber(H,R,i,j,.13,.13,.03,.48,'teal');
  for(let n=0;n<4;n++)timber(H,R,1.04,8.03+n*.17,2.43,.11,.17,.055,'teal');
  foldedCloth(H,R,1.2,8.04,.83,.58,.65,'paper','coral');
  shallowTray(H,R,2.31,8.04,1.03,.54,.65,'teal');
  handTool(H,R,2.78,8.3,.85,'brush','coral',.5);
  vessel(H,R,1.28,10.06,.03,17,22,'teal');
  const bucket=H.p(1.28,10.06,.03);stroke(H,R,[[bucket[0]-14,bucket[1]-19],[bucket[0]-12,bucket[1]-37],[bucket[0]+10,bucket[1]-38],[bucket[0]+15,bucket[1]-19]],'sun',1.7);
  H.line(R,[H.p(1.64,10.31,.02),H.p(1.44,9.9,1.56)],'sun',3);const brush=H.p(1.64,10.31,.06);shape(H,R,[[brush[0]-10,brush[1]-6],[brush[0]+10,brush[1]-8],[brush[0]+12,brush[1]+1],[brush[0]-9,brush[1]+3]],'coral',.74,.6);
  for(let n=0;n<7;n++)H.line(R,[[brush[0]-8+n*3,brush[1]-4],[brush[0]-7+n*3,brush[1]+2]],'sun',.75);
  for(const i of [2.0,2.32])boot(H,R,i,8.9,.03,1.0,'blue');boot(H,R,2.82,8.88,.03,.52,'sun');
  metal(H,R,3.2,9.88,1.52,.5,.02,.11,'blue');for(let n=0;n<7;n++)bentTube(H,R,[[3.31+n*.19,9.9,.13],[3.31+n*.19,10.23,.23]],1.8,'sun');
  handTool(H,R,4.22,9.46,.09,'brush','coral',.9);satchel(H,R,10.18,6.29,.02,'sun',.68);
  metal(H,R,10.95,1.65,.81,.93,.02,.07,'blue');
  for(let n=0;n<5;n++)H.line(R,[H.p(11.07+n*.13,1.72,.1),H.p(11.07+n*.13,2.49,.1)],'paper',.9);
  timber(H,R,.21,10.38,.44,.46,.03,1.44,'coral');H.line(R,[H.p(.64,10.39,1.05),H.p(.64,10.9,1.05)],'sun',3);floorLight(H,5.35,4.8,154,.55);
},(H,R,time)=>{
  const t=cycle(time,28)*28,rise=ease(.6,5.6,t)*(1-ease(22.4,26,t)),open=ease(5.6,11.2,t)*(1-ease(17.4,23.1,t));
  const angle=.34+open*.77,bodyI=mix(7.2,mix(7.42,6.08,open),rise),bodyJ=mix(4.72,mix(2.01,3.86,open),rise);
  H.clip(H.tile(3.82,6.6,4.03,2.05,.04),()=>H.tint([H.p(4.3,.4,.045),H.p(6.82,.4,.045),H.p(7.54+open*.22,8.64,.045),H.p(5.63-open*.92,8.64,.045)],'sun',.27));
  const greet=Math.sin(Math.PI*ease(11.7,16.7,t));
  const answer=person(H,R,6.27,.81,'teal',greet*.17,0);
  answer(H.p(6.3,.83,.73),H.p(6.61,.8,.85+greet*.56));
  const attachment=door(H,R,angle),hook=H.p(5.9,3.22,1.76),contact=ease(2.2,5.6,t)*(1-ease(23.1,25.1,t));
  const arms=person(H,R,bodyI,bodyJ,'coral',rise,0);
  const free=[attachment[0]+11,attachment[1]+21];
  const held=free.map((v,n)=>mix(v,hook[n],open));
  strap(H,R,attachment,held,open);
  const hand=H.p(bodyI-.22,bodyJ-.17,.89+rise*.3);arms(null,held.map((v,n)=>mix(hand[n],v,contact)));
  const P=(u,z)=>wallPt(H,'ne',7.1+u,z,-.28);shape(H,R,[P(0,.25),P(.26,.26),P(.27,2.87),P(-.13,2.87),P(-.08,1.38)],'paper',.6,.55);
  H.line(R,[P(.06,.35),P(.13+Math.sin(time*Math.PI/14)*.025,1.5),P(.12,2.8)],'sun',.9);
});
room.loopSeconds=28;
room.stillTime=13.2;
export default room;
