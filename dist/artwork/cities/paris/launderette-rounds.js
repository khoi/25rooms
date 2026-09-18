import { world, box, shape, oval, stroke, actor, wallPt, wallRect, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { metal, timber, bentTube, cushion, drape, floorLight, slattedSeat, vessel } from '../materials.js';
import { cabinetFrame, rackFrame } from '../structure.js';
import { windowBay, cityView, panelFront, radiator, wallRack, taskLight, hangingRail } from '../joinery.js';

const contactPose={...FIGURES.sample('idle',0)};
FIGURES.clips.parisLaundryContact={dur:1,keys:[[0,contactPose],[1,contactPose]]};
function contactPerson(H,R,target,options={},scale=1.72,root,pose={}){
  Object.assign(contactPose,FIGURES.sample('idle',0),pose);
  const base=root||[target[0]+scale*2,target[1]+scale*28];
  const a=contactPose.lean*Math.PI/180,cx=contactPose.x-Math.sin(a)*15,cy=contactPose.y+contactPose.drop*19-19-Math.cos(a)*15;
  const sx=cx+5.2*Math.cos(a)-1.5*Math.sin(a),sy=cy+5.2*Math.sin(a)+1.5*Math.cos(a);
  const dx=(target[0]-base[0])/scale-sx,dy=(target[1]-base[1])/scale-sy,l=4.368,r=4.2;
  const bend=Math.acos(Math.max(-1,Math.min(1,(dx*dx+dy*dy-l*l-r*r)/(2*l*r))));
  contactPose.ar=(Math.atan2(dx,dy)-Math.atan2(r*Math.sin(bend),l+r*Math.cos(bend)))*180/Math.PI;
  contactPose.er=bend*180/Math.PI;
  if(options.leftTarget){
    const sx=cx-5.2*Math.cos(a)-1.5*Math.sin(a),sy=cy-5.2*Math.sin(a)+1.5*Math.cos(a),dx=(options.leftTarget[0]-base[0])/scale-sx,dy=(options.leftTarget[1]-base[1])/scale-sy;
    const bend=-Math.acos(Math.max(-1,Math.min(1,(dx*dx+dy*dy-l*l-r*r)/(2*l*r))));
    contactPose.al=(Math.atan2(dx,dy)-Math.atan2(r*Math.sin(bend),l+r*Math.cos(bend)))*180/Math.PI;
    contactPose.el=bend*180/Math.PI;
  }

  FIGURES.draw(H,R,{who:'adult',x:base[0],y:base[1],t:0,phase:0,clip:'parisLaundryContact',scale,face:options.face||'se',ground:base,opts:options});
}
const T=20,rest=FIGURES.sample('idle',0),ease=(a,b,t)=>{const q=Math.max(0,Math.min(1,(t-a)/(b-a)));return q*q*(3-2*q);};
function basket(H,R,i,j,z,w=1.6,d=1.2){
  shape(H,R,H.faceI(i,j+d,w,z,z+.65),'sun',.2,.8);shape(H,R,H.faceJ(i+w,j,d,z,z+.65),'teal',.21,.7);
  shape(H,R,H.tile(i,j,w,d,z+.65),'blue',.4,.8);
  shape(H,R,H.tile(i+.12,j+.12,w-.24,d-.24,z+.6),'paper',.65,.6);
  for(let n=0;n<7;n++)H.line(R,[H.p(i+.08+n*w/7,j+d+.01,z+.05),H.p(i+.08+n*w/7,j+d+.01,z+.6)],'teal',1);
  for(const h of [.15,.31,.47])H.line(R,[H.p(i+.02,j+d+.02,z+h),H.p(i+w-.02,j+d+.02,z+h)],'teal',1.1);
  bentTube(H,R,[[i+.35,j+d,z+.66],[i+.4,j+d,z+.94],[i+w-.4,j+d,z+.94],[i+w-.35,j+d,z+.66]],2.1,'teal');
  for(let n=0;n<4;n++)H.line(R,[H.p(i+.42+n*.1,j+d-.03,z+.94),H.p(i+.46+n*.1,j+d+.03,z+.86)],'coral',1.2);
}
function washer(H,R,t){
  const u=t%T,open=(ease(.7,4,u)-ease(15.6,18,u))*1.25,turn=(ease(4,8,u)-ease(12,14.5,u))*.68;
  for(const x of [1.72,5.16])for(const y of [1.45,3.5])metal(H,R,x,y,.2,.2,.03,.17,'blue');
  for(const x of [1.81,5.05]){
    bentTube(H,R,[[x,1.24,.52],[x,.46,.52],[x,.46,2.16]],3,'teal');
    metal(H,R,x-.09,.41,.24,.19,1.76,.16,'coral');
  }
  metal(H,R,1.5,1.2,3.95,2.5,.18,2.45,'paper');
  shape(H,R,H.faceJ(5.47,1.36,2.13,.34,2.44),'teal',.12,.65);
  for(const z of [.44,2.28])H.line(R,[H.p(5.49,1.48,z),H.p(5.49,3.36,z)],'blue',.55);
  for(const j of [1.48,3.33])for(const z of [.5,2.22])H.dot(...H.p(5.5,j,z),1.2,'blue');
  for(let n=0;n<9;n++)H.line(R,[H.p(5.51,1.57+n*.19,1.69),H.p(5.51,1.64+n*.19,1.85)],'teal',1.1);
  metal(H,R,1.43,3.65,4.09,.19,.16,.12,'teal');
  timber(H,R,1.42,1.13,4.11,2.64,2.64,.12,'sun');
  for(let n=0;n<3;n++)cushion(H,R,1.73,1.43,2.23,1.33,2.78+n*.14,.12,n===1?'sun':'paper');
  drape(H,R,4.2,1.84,1.05,1.73,2.79,.49,'paper');
  for(let n=0;n<5;n++)H.line(R,[H.p(5.47,1.57+n*.35,.38),H.p(5.47,1.76+n*.35,.38)],'blue',.9);
  shape(H,R,H.faceI(1.68,3.73,3.59,.32,2.42),'paper',1,1);
  const P=(x,z)=>H.p(x,3.76,z),ring=r=>Array.from({length:48},(_,k)=>P(3.43+r*Math.cos(k*Math.PI/24),1.28+r*Math.sin(k*Math.PI/24)));
  shape(H,R,ring(1.04),'teal',.36,1.2);shape(H,R,ring(.99),'blue',.84,1.2);shape(H,R,ring(.88),'teal',.65,.8);shape(H,R,ring(.77),'blue',.91,.7);
  for(let n=0;n<12;n++){
    const a=n*Math.PI/6;H.dot(...P(3.43+1.01*Math.cos(a),1.28+1.01*Math.sin(a)),1.1,'paper');
  }
  for(const r of [.79,.83])H.line(R,Array.from({length:18},(_,n)=>P(3.43+r*Math.cos(.3+n*.09),1.28+r*Math.sin(.3+n*.09))),'paper',.65,{tone:.7});
  shape(H,R,[P(4.67,.42),P(5.14,.42),P(5.14,.82),P(4.67,.82)],'teal',.22,.65);
  oval(H,R,...P(4.88,.62),4.7,4.1,'paper',1);H.line(R,[P(4.78,.62),P(4.98,.62)],'blue',1.1);
  for(const x of [1.78,5.16])for(const z of [.41,2.14])H.dot(...P(x,z),1,'blue');
  for(let n=0;n<3;n++){
    const a=n*Math.PI*2/3+turn;H.line(R,[P(3.43+Math.cos(a)*.2,1.28+Math.sin(a)*.2),P(3.43+Math.cos(a)*.69,1.28+Math.sin(a)*.69)],n===0?'paper':'teal',n===0?3:2);
  }
  for(let k=0;k<20;k++){const a=k*Math.PI/10;H.dot(...P(3.43+Math.cos(a)*.61,1.28+Math.sin(a)*.61),.7,'paper',.55);}
  shape(H,R,[P(3.26,1.01),P(3.59,1.01),P(3.59,1.43),P(3.26,1.43)],'teal',.45,.5);H.line(R,[P(3.29,1.05),P(3.29,1.37)],'paper',1.2);
  shape(H,R,H.faceI(1.76,3.765,1.08,2.23,2.49),'teal',.3,.7);H.line(R,[P(1.96,2.3),P(2.63,2.3)],'blue',1.6);
  oval(H,R,...P(4.44,2.36),6,6,'teal',.65);H.line(R,[P(4.44,2.36),P(4.44,2.49)],'sun',1.5);
  H.dot(...P(4.94,2.38),2.1,'sun',1);
  for(let n=0;n<7;n++){const a=-2.5+n*.6;H.dot(...P(4.44+Math.cos(a)*.21,2.36+Math.sin(a)*.2),.7,'blue');}
  shape(H,R,[P(3.11,2.26),P(3.91,2.26),P(3.91,2.51),P(3.11,2.51)],'blue',.78,.6);
  for(let n=0;n<3;n++)H.line(R,[P(3.27+n*.19,2.32),P(3.27+n*.19,2.43)],'sun',1.6);
  H.line(R,[P(2.88,2.24),P(2.88,2.49)],'blue',.7);
  H.line(R,[P(1.95,2.54),P(2.56,2.54)],'paper',1.1);
  for(const z of [.76,1.7])metal(H,R,2.39,3.7,.19,.26,z,.13,'teal');
  const D=(a,r=.94)=>H.p(2.48+(r+r*Math.cos(a))*Math.cos(open),3.81+(r+r*Math.cos(a))*Math.sin(open),1.28+r*Math.sin(a));
  const door=Array.from({length:48},(_,k)=>D(k*Math.PI/24));
  H.tint(door,'teal',.12);H.outline(R,door,'blue',3,{tone:.88});
  H.outline(R,Array.from({length:48},(_,k)=>D(k*Math.PI/24,.86)),'paper',2,{tone:.92});
  H.line(R,[D(-.7,.74),D(-.35,.74),D(0,.74)],'paper',2.4,{tone:.8});
  H.line(R,[D(.15),D(-.15)],'coral',4);
  H.line(R,[P(5.15,.5),P(5.15,.85)],'teal',2);
  const fold=ease(8,9.6,u)-ease(15,17.5,u);
  const Q=(x,y,z=1.48)=>H.p(x,y,z);
  shape(H,R,[Q(8.4,2.06),Q(10.34,2.06),Q(10.34,2.88),Q(8.4,2.88)],'paper',1,.7);
  shape(H,R,[Q(8.4,2.48),Q(10.34,2.48),Q(10.34,3.32-fold*.83,1.48+Math.sin(fold*Math.PI)*.52),Q(8.4,3.32-fold*.83,1.48+Math.sin(fold*Math.PI)*.52)],'paper',1,.7);
  for(const x of [8.55,10.17])H.line(R,[Q(x,2.1),Q(x,3.22-fold*.74,1.49+Math.sin(fold*Math.PI)*.47)],'coral',1.1);
}
const room=world('paris-launderette-rounds','The drum shows the room',{wall:'teal',wallTone:.2,height:3.7,floor:'paper',pattern:'tiles',head:65},(H,R)=>{
  for(const side of ['ne','nw']){
    shape(H,R,wallRect(H,side,.1,11.9,.15,1.75,-.08),'paper',.72,.6);
    for(let row=0;row<4;row++)for(let n=0;n<14;n++){
      const x=.1+n*.84+(row%2)*.42;
      if(x<11.8)H.line(R,[wallPt(H,side,x,.2+row*.37,-.1),wallPt(H,side,x,.57+row*.37,-.1)],'teal',.45,{tone:.5});
    }
    for(let row=0;row<5;row++)H.line(R,[wallPt(H,side,.1,.2+row*.37,-.1),wallPt(H,side,11.9,.2+row*.37,-.1)],'teal',.5,{tone:.4});
    H.line(R,[wallPt(H,side,.1,1.76,-.12),wallPt(H,side,11.9,1.76,-.12)],'coral',2.4);
    H.line(R,[wallPt(H,side,.15,3.57,-.14),wallPt(H,side,11.84,3.57,-.14)],'blue',2.2);
    for(let n=0;n<7;n++)H.line(R,[wallPt(H,side,.8+n*1.55,3.52,-.16),wallPt(H,side,.8+n*1.55,3.63,-.16)],'sun',2);
  }
  bentTube(H,R,[[.18,.5,2.35],[.18,2.71,2.35],[.18,2.71,.28],[.18,5.48,.28]],3,'teal');
  for(const j of [1.17,2.6,4.82])metal(H,R,.15,j,.19,.18,.22,.15,'sun');
  windowBay(H,R,'ne',1.3,5.4,2.67,.86,{night:true,divisions:4,view:P=>cityView(H,R,P,5.4,.86,true)});
  for(const s of ['ne','nw']){H.line(R,[wallPt(H,s,.1,.15,-.13),wallPt(H,s,11.8,.15,-.13)],'teal',3);}
  cabinetFrame(H,R,7.5,.55,3.92,2.02,.12,1.19,2,'teal',(x,y,w,d,z,h,n)=>{basket(H,R,x+.11,y+.08,z+.02,w-.2,d-.28);});
  timber(H,R,7.4,.48,4.12,2.27,1.31,.14,'sun');
  panelFront(H,R,10.47,2.62,.79,.23,1.0,1,'teal');
  for(const x of [7.61,9.39,11.23])metal(H,R,x,2.63,.12,.15,.16,1.08,'teal');
  H.line(R,[H.p(7.55,2.71,.21),H.p(11.39,2.71,.21)],'paper',1.2);
  metal(H,R,11.38,.67,.12,1.84,1.44,.3,'teal');
  for(let n=0;n<6;n++)H.line(R,[H.p(11.51,.8+n*.26,1.48),H.p(11.51,.8+n*.26,1.69)],'paper',.8);
  for(const x of [7.54,11.36]){
    bentTube(H,R,[[x,.67,1.44],[x,.67,3.45]],2.1,'teal');
    bentTube(H,R,[[x,.67,2.52],[x,1.19,2.91]],1.5,'teal');
  }
  timber(H,R,7.48,.61,3.98,.69,3.05,.11,'sun');
  for(let n=0;n<3;n++)cushion(H,R,7.65,.66,1.19,.51,3.18+n*.105,.09,n===1?'teal':'paper');
  box(H,R,9.15,.68,.73,.49,3.18,.42,'sun',.35);
  H.line(R,[H.p(9.29,1.18,3.25),H.p(9.74,1.18,3.25)],'coral',1.8);
  for(let n=0;n<3;n++)H.line(R,[H.p(10.18+n*.29,.79,3.17),H.p(10.38+n*.29,.86,3.48),H.p(10.43+n*.29,1.08,3.17)],'teal',1.3);
  bentTube(H,R,[[7.64,2.77,.89],[9.8,2.77,.89]],2.4,'teal');
  drape(H,R,7.94,2.62,.67,.27,.91,.47,'paper');
  for(let n=0;n<4;n++)cushion(H,R,7.75,.74,1.46,.96,1.47+n*.12,.1,n%2?'paper':'sun');
  cushion(H,R,9.62,.64,1.15,.82,1.47,.24,'paper');
  taskLight(H,R,10.9,.76,1.49,'coral',-.5);
  wallRack(H,R,'ne',8.1,3.16,2.46,.98,2,'teal',(P,z,row)=>{
    if(row===0)for(const [x,c] of [[.45,'coral'],[1.32,'sun']])shape(H,R,[P(x,z+.3),P(x+.27,z+.3),P(x+.27,z+.1),P(x+.47,z+.07),P(x+.47,z-.02),P(x,z-.02)],c,.65,.6);
    else for(let n=0;n<3;n++){shape(H,R,[P(.3+n*.83,z+.02),P(.89+n*.83,z+.02),P(.89+n*.83,z+.29),P(.3+n*.83,z+.29)],'paper',1,.5);H.line(R,[P(.36+n*.83,z+.15),P(.83+n*.83,z+.15)],'teal',.9);}
  });
  cabinetFrame(H,R,.41,.49,1.04,1.32,.06,2.33,1,'teal',(x,y,w,d,z,h)=>{
    timber(H,R,x,y,w,d,z+.61,.075,'teal');
    vessel(H,R,x+.42,y+.46,z+.7,5.5,14,'paper',false);
    bentTube(H,R,[[x+.26,y+.65,z+.09],[x+.24,y+.47,z+2.08]],1.8,'sun');
    drape(H,R,x+.09,y+.61,.64,.34,z+.5,.31,'paper');
  });
  shape(H,R,[H.p(1.46,.51,.12),H.p(1.69,1.6,.12),H.p(1.69,1.6,2.25),H.p(1.46,.51,2.25)],'teal',.42,.8);
  H.line(R,[H.p(1.68,1.44,.96),H.p(1.68,1.44,1.26)],'sun',2.2);
  bentTube(H,R,[[.91,2.1,.05],[.9,1.55,2.6]],2.2,'sun');
  shape(H,R,H.tile(.61,2.03,.79,.4,.06),'coral',.5,.6);
  radiator(H,R,'nw',3.15,2.35,.81);
  hangingRail(H,R,'nw',3.1,3.18,3.36,4,(P,u,n)=>{if(n===0){H.line(R,[P(u,-.07),P(u+.35,-.55),P(u-.37,-.55),P(u,-.07)],'sun',1.2);}else {H.line(R,[P(u,-.04),P(u,-.32)],'blue',.7);H.line(R,[P(u-.03,-.3),P(u+.03,-.45)],'coral',2.4);}});
  const dispenser=(j,z)=>wallPt(H,'nw',j,z,-.25);
  shape(H,R,wallRect(H,'nw',8.79,10.13,1.21,2.71,-.21),'teal',.67,.9);
  shape(H,R,wallRect(H,'nw',8.91,10.01,1.38,2.56,-.26),'paper',1,.7);
  for(let n=0;n<3;n++){
    shape(H,R,wallRect(H,'nw',9.02,9.86,1.54+n*.3,1.75+n*.3,-.28),['sun','teal','coral'][n],.37,.5);
    H.dot(...dispenser(9.74,1.65+n*.3),1.5,'blue');
  }
  H.line(R,[dispenser(9.2,1.29),dispenser(9.7,1.29)],'blue',2.3);
  const fan=wallPt(H,'nw',7.5,2.88,-.3);oval(H,R,...fan,17,17,'paper',1);oval(H,R,...fan,14,14,'teal',.3);for(let n=0;n<8;n++){const a=n*Math.PI/4;H.line(R,[fan,[fan[0]+Math.cos(a)*14,fan[1]+Math.sin(a)*14]],'blue',.6);}H.dot(...fan,3.4,'sun');
  slattedSeat(H,R,.7,8.3,3.36,0,'sun',.55);
  drape(H,R,1,8.32,1.12,.7,.8,.43,'teal');
  box(H,R,2.49,8.53,.65,.5,.8,.08,'coral',.5);H.line(R,[H.p(2.53,8.58,.9),H.p(3.02,8.94,.9)],'paper',1.2);
  oval(H,R,...H.p(3.42,8.61,.92),6,7,'sun',.65);oval(H,R,...H.p(3.42,8.61,1.19),5,5,'sun',.65);H.dot(...H.p(3.47,8.62,1.2),.9,'blue');
  for(const x of [5.99,7.89])for(const j of [8.33,9.71]){
    oval(H,R,...H.p(x,j,.14),3.6,4.5,'blue',.8);
    bentTube(H,R,[[x,j,.16],[x,j,.42]],1.5,'teal');
  }
  metal(H,R,5.9,8.25,2.2,1.64,.34,.09,'teal');
  basket(H,R,5.9,8.25,.44,2.2,1.64);
  drape(H,R,6.12,8.47,1.39,.82,1.11,.37,'paper');
  for(const x of [6.2,7.44])H.line(R,[H.p(x,8.53,1.13),H.p(x,9.23,1.13)],'coral',1.2);
  shape(H,R,H.tile(8.85,8.85,1.8,1.22,.09),'teal',.25,.7);
  for(let n=0;n<8;n++){H.line(R,[H.p(8.93+n*.2,8.91,.11),H.p(8.93+n*.2,10,.11)],'paper',.7);H.line(R,[H.p(8.91,8.96+n*.13,.11),H.p(10.58,8.96+n*.13,.11)],'paper',.7);}
  H.line(R,[H.p(9.3,9.18,.12),H.p(9.77,9.53,.12),H.p(9.5,9.8,.12)],'coral',1.4);
  metal(H,R,9.04,7.7,1.2,.66,.07,.08,'teal');oval(H,R,...H.p(9.56,8.03,.18),4.4,2.6,'sun',.6);
  cabinetFrame(H,R,.29,5.9,1.31,1.22,.04,2.55,1,'teal',(x,y,w,d,z,h)=>{
    timber(H,R,x,y,w,d,z+1.26,.08,'teal');
    for(let n=0;n<3;n++)cushion(H,R,x+.08,y+.12,w-.16,d-.22,z+.06+n*.18,.15,n%2?'paper':'coral');
    for(let n=0;n<2;n++)box(H,R,x+.12+n*.4,y+.16,.29,.49,z+1.37,.67,n?'sun':'teal',.45);
  });
  metal(H,R,5.53,.76,1.45,1.14,.14,2.18,'teal');
  shape(H,R,H.faceI(5.66,1.92,1.17,.28,1.86),'blue',.74,.8);
  const dp=H.p(6.24,1.94,1.12);oval(H,R,...dp,14,15,'paper',1);oval(H,R,...dp,10,11,'blue',.6);
  H.line(R,[[dp[0]-6,dp[1]-6],[dp[0]+6,dp[1]+6]],'teal',2.5);
  metal(H,R,5.67,1.9,1.12,.06,1.98,.14,'paper');
  for(let n=0;n<5;n++)H.line(R,[H.p(5.8+n*.22,1.98,2.03),H.p(5.8+n*.22,1.98,2.09)],'blue',1.6);
  const net=[H.p(3.9,8.17,.13),H.p(5.5,8.17,.13),H.p(5.43,9.35,.13),H.p(4,9.35,.13)];shape(H,R,net,'paper',1,.7);
  H.clip(net,()=>{for(let n=0;n<9;n++){H.line(R,[H.p(3.9+n*.2,8.17,.15),H.p(3.9+n*.2,9.35,.15)],'teal',.65);H.line(R,[H.p(3.9,8.17+n*.15,.15),H.p(5.5,8.17+n*.15,.15)],'teal',.65);}});
  H.line(R,[H.p(4.4,8.66,.16),H.p(4.65,8.99,.16),H.p(4.94,8.75,.16)],'coral',1.4);
  bentTube(H,R,[[10.72,5.01,.05],[10.72,5.01,2.84],[11.66,5.01,2.84],[11.66,5.01,.05]],2.6,'teal');
  for(const x of [10.72,11.66])metal(H,R,x-.1,4.66,.2,.72,.025,.09,'teal');
  H.line(R,[H.p(10.86,5.01,2.68),H.p(11.01,5.01,2.82),H.p(11.26,5.01,2.62)],'sun',1.2);
  shape(H,R,[H.p(10.77,5.04,2.51),H.p(11.28,5.04,2.51),H.p(11.46,5.04,2.11),H.p(11.39,5.04,.72),H.p(10.7,5.04,.72),H.p(10.63,5.04,2.11)],'paper',1,.8);
  H.line(R,[H.p(11.03,5.05,2.45),H.p(11.03,5.05,.83)],'teal',1.3);
  H.line(R,[H.p(10.7,5.06,.86),H.p(11.35,5.06,.86)],'coral',1);
  for(let n=0;n<4;n++)H.dot(...H.p(11.04,5.06,1.05+n*.26),.8,'sun');
  metal(H,R,10.52,5.58,1.19,.64,.04,.08,'teal');
  box(H,R,10.72,5.75,.59,.29,.13,.16,'sun',.45);
  const pouch=H.p(3.66,8.73,.79);shape(H,R,[[pouch[0]-6,pouch[1]],[pouch[0]+7,pouch[1]],[pouch[0]+6,pouch[1]-12],[pouch[0]-4,pouch[1]-11]],'coral',.6,.7);
  for(const dx of [-2,3])H.line(R,[[pouch[0]+dx,pouch[1]-8],[pouch[0]+dx+4,pouch[1]-21]],'sun',1.2);
  vessel(H,R,3.86,8.52,.78,3,13,'teal',false);
  metal(H,R,5.95,10.47,2.29,.22,.026,.04,'teal');
  for(let n=0;n<11;n++)H.line(R,[H.p(6.05+n*.19,10.51,.08),H.p(6.05+n*.19,10.65,.08)],'blue',.8);
  floorLight(H,8.9,4.5,120,.34);
},(H,R,t)=>{
  washer(H,R,t);
  const u=t%T,open=(ease(.7,4,u)-ease(15.6,18,u))*1.25,turn=(ease(4,8,u)-ease(12,14.5,u))*.68,reach=ease(4,5.4,u)-ease(14.5,15.6,u);
  const handle=H.p(2.48+1.88*Math.cos(open),3.81+1.88*Math.sin(open),1.28),rib=H.p(3.43+.64*Math.cos(turn),3.76,1.28+.64*Math.sin(turn));
  const target=handle.map((v,k)=>v+(rib[k]-v)*reach);
  contactPerson(H,R,target,{shirt:['coral',.64],pants:['blue',.7],hairStyle:'pony'},2,[target[0]-5,147+open*3],{head:18,al:20,el:30,ll:-5+Math.sin(u*4)*5*(ease(.7,1.3,u)-ease(3.4,4,u)),lr:5-Math.sin(u*4)*5*(ease(.7,1.3,u)-ease(3.4,4,u))});
  const fold=ease(8,9.6,u)-ease(15,17.5,u),foldTarget=H.p(9.82,3.32-fold*.83,1.48+Math.sin(fold*Math.PI)*.52);
  contactPerson(H,R,foldTarget,{shirt:['teal',.67],pants:['blue',.63],hairStyle:'curly',leftTarget:H.p(9.1,3.32-fold*.83,1.48+Math.sin(fold*Math.PI)*.52)},2.05,[204+fold*26,222],{head:15});
  const netSway=Math.sin(t*Math.PI/10)*.08;
  stroke(H,R,[H.p(5.48,8.23,.15),H.p(5.78+netSway,8.47,.19),H.p(5.91+netSway,8.76,.13)],'teal',1.1);

});
room.loopSeconds=T;room.stillTime=10;
export default room;
