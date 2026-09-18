import { world, actor, shape, oval, stroke, ell, wallPt, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, benchFrame, drape, cushion, vessel } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';
import { recessedFrame, hangingRail, floorShadow, wallRack } from '../joinery.js';

const duration=24;
const ease=(a,b,t)=>{const p=Math.max(0,Math.min(1,(t-a)/(b-a)));return p*p*(3-2*p);};
const base={x:0,y:0,drop:0,lean:0,head:0,al:44,ar:49,el:65,er:61,ll:-5,lr:5,kl:0,kr:0,roll:0};
const look={...base,al:128,ar:123,el:35,er:41,head:-9};
FIGURES.clips.londonWetlandVisitor={dur:duration,keys:[[0,{...base}],[.2,{...base}],[.39,look],[.6,look],[.73,{...base}],[1,{...base}]]};
FIGURES.clips.londonWetlandChild={dur:duration,keys:[[0,{...base,al:40,ar:40,el:25,er:25}],[.3,{...base,head:-3,al:40,ar:40,el:25,er:25}],[.47,{...base,head:-20,al:40,ar:40,el:25,er:25}],[.7,{...base,head:-20,al:40,ar:40,el:25,er:25}],[1,{...base,al:40,ar:40,el:25,er:25}]]};

function reed(H,R,P,u,h,lean=0){
  stroke(H,R,[P(u,.04),P(u+lean*.35,h*.55),P(u+lean,h)],'teal',1.2,.8);
  for(const [v,s]of[[.25,-1],[.48,1],[.72,-1]])shape(H,R,[P(u+lean*v,h*v),P(u+lean*v+s*.27,h*v+.22),P(u+lean*v+s*.1,h*v+.09)],'teal',.63,.4);
  const [x,y]=P(u+lean,h);oval(H,R,x,y,2.7,8,'coral',.46);
}
function cards(H,R,i,j,z){
  for(let n=0;n<3;n++){
    const x=i+n*.41;shape(H,R,H.tile(x,j,.34,.49,z),'paper',1,.5);const[a,b]=H.p(x+.18,j+.25,z+.015);
    stroke(H,R,[[a-5,b+1],[a-2,b-2],[a+2,b],[a+6,b-3]],'blue',1.1);
  }
}
function binocular(H,R,x,y){
  for(const d of[-4,5]){shape(H,R,[[x+d-3,y-2],[x+d+3,y-2],[x+d+4,y+10],[x+d-4,y+10]],'blue',.9,.6);oval(H,R,x+d,y+10,4,2.5,'teal',.55);H.line(R,[[x+d-1,y],[x+d-1,y+7]],'paper',.65);}
  H.line(R,[[x-4,y+1],[x+5,y+1]],'blue',3);stroke(H,R,[[x-7,y+4],[x-12,y+20],[x+7,y+24],[x+9,y+5]],'blue',1);H.line(R,[[x-2,y+23],[x+3,y+24]],'coral',2.3);
}

const room=world('london-wetland-listen','A window at reed height',{wall:false,floor:'teal',tone:.18,head:36},(H,R)=>{
  boardFloor(H,R,0,0,12,12,.015,'sun',.67);
  for(const side of['nw','ne']){
    shape(H,R,[wallPt(H,side,0,0,-.03),wallPt(H,side,12,0,-.03),wallPt(H,side,12,3.45,-.03),wallPt(H,side,0,3.45,-.03)],'teal',.61,.9);
    for(let u=.18;u<12;u+=.62)H.line(R,[wallPt(H,side,u,.05,-.06),wallPt(H,side,u,3.4,-.06)],'blue',.75,{tone:.5});
    H.line(R,[wallPt(H,side,0,3.45,-.18),wallPt(H,side,12,3.45,-.18)],'blue',4.5);
    H.line(R,[wallPt(H,side,0,.12,-.18),wallPt(H,side,12,.12,-.18)],'sun',2.5);
  }
  for(const j of[.16,5.6,11.75]){
    timber(H,R,.08,j,.23,.24,.06,3.48,'sun');
    bentTube(H,R,[[.22,j,2.75],[1.25,j,3.45]],3.4,'sun');
    for(const z of[.22,2.8,3.3])metal(H,R,.07,j+.25,.27,.045,z,.13,'blue');
  }
  for(const i of[.12,11.7])timber(H,R,i,.05,.23,.22,.06,3.45,'sun');
  shape(H,R,[H.p(.28,5.35,1.43),H.p(.28,10.1,1.43),H.p(.28,10.1,2.75),H.p(.28,5.35,2.75)],'sun',.35,.9);
  for(const [j,w,h,ink]of[[5.62,1.13,.89,'paper'],[6.95,1.04,.68,'teal'],[8.2,1.49,.9,'paper']]){
    const Q=(u,z)=>H.p(.31,j+u,1.64+z);
    shape(H,R,[Q(0,0),Q(w,0),Q(w,h),Q(0,h)],ink,.93,.7);
    H.dot(...Q(.09,h-.09),1.7,'coral');H.dot(...Q(w-.09,h-.09),1.5,'blue');
    if(j>8){for(let n=0;n<3;n++){const[x,y]=Q(.22+n*.48,.46);oval(H,R,x,y,5,3.4,'teal',.65);stroke(H,R,[[x-5,y],[x-8,y-4],[x-7,y+2],[x,y+3],[x+5,y+1],[x+9,y-1]],'blue',.8);H.line(R,[[x,y+3],[x-2,y+7]],'blue',.7);}}
    else {stroke(H,R,[Q(.12,.11),Q(.48,.23),Q(.38,.45),Q(w-.13,h-.16)],'teal',3);for(let n=0;n<3;n++)H.line(R,[Q(.1,.18+n*.15),Q(w-.15,.2+n*.12)],'sun',.8);}
  }
  const P=recessedFrame(H,R,'ne',2.15,8.9,1.48,1.54,'sun',Q=>{
    shape(H,R,[Q(.11,.08),Q(8.8,.08),Q(8.8,1.45),Q(.11,1.45)],'paper',1,.3);
    shape(H,R,[Q(.1,.05),Q(8.8,.05),Q(8.8,.53),Q(.1,.43)],'teal',.25,.3);
    shape(H,R,[Q(.1,.41),Q(1.7,.61),Q(3.4,.49),Q(5.1,.68),Q(7,.51),Q(8.8,.72),Q(8.8,.93),Q(6.4,.81),Q(4.6,.95),Q(2.1,.76),Q(.1,.85)],'teal',.24,.3);
    shape(H,R,[Q(.1,.06),Q(8.8,.06),Q(8.8,.26),Q(6.6,.36),Q(4.5,.19),Q(2.4,.34),Q(.1,.21)],'blue',.31,.3);
    for(const [start,count,height]of[[.2,4,.8],[1.42,3,.58],[3.35,5,.98],[6.1,3,.7],[7.8,4,1.07]])for(let n=0;n<count;n++)reed(H,R,Q,start+n*.18,height+(n*7%5)*.065,(n%3-1)*.16);
    for(const [u,z,w]of[[.5,.14,.5],[2.2,.21,.75],[4.7,.11,.9],[5.4,.37,.45],[7.1,.18,.8]])H.line(R,[Q(u,z),Q(u+w,z)],'paper',1.2);
    const duck=Q(2.5,.34);oval(H,R,...duck,8,3.6,'blue',.8);oval(H,R,duck[0]+6,duck[1]-5,3.4,3.2,'teal',.85);H.line(R,[[duck[0]+8,duck[1]-5],[duck[0]+12,duck[1]-4]],'sun',1.7);H.line(R,[[duck[0]-7,duck[1]],[duck[0]-12,duck[1]-4]],'blue',1.7);
    const heron=Q(5.33,.48);stroke(H,R,[[heron[0]-3,heron[1]+8],[heron[0]-1,heron[1]-5],[heron[0]+5,heron[1]-15],[heron[0]+2,heron[1]-24],[heron[0]+8,heron[1]-29]],'blue',1.6);oval(H,R,heron[0]-3,heron[1]-7,6,9,'paper',1);H.line(R,[[heron[0]+7,heron[1]-28],[heron[0]+17,heron[1]-27]],'sun',1.4);H.line(R,[[heron[0]-4,heron[1]+1],[heron[0]-7,heron[1]+10]],'blue',1);
    for(const [u,z]of[[2,.99],[6.7,1.2]]){const[x,y]=Q(u,z);stroke(H,R,[[x-5,y],[x,y-2],[x+5,y]],'blue',1.1);}

  });
  for(const i of[2.45,5.2,8.5,10.7]){metal(H,R,i,.2,.22,.28,2.88,.13,'blue');H.line(R,[P(i-2.15,.11),P(i-2.15,.23)],'paper',.9);}
  timber(H,R,2.0,.08,9.22,1.02,1.37,.14,'sun');
  for(const i of[2.6,5.25,8.8]){bentTube(H,R,[[i,.15,1.34],[i,.98,1.13],[i,.98,1.37]],2.3,'blue');}
  for(const i of[4.9,7.9,9.35]){shape(H,R,H.tile(i,.51,.95,.45,1.54),'blue',.55,.6);shape(H,R,H.tile(i+.035,.51,.87,.4,1.57),i===9.35?'coral':'paper',.9,.5);H.line(R,[H.p(i+.08,.87,1.59),H.p(i+.8,.87,1.59)],'sun',.75);}
  for(const i of[3.15,6.3,10.55]){
    timber(H,R,i,2.12,.24,.79,.04,.54,'sun');
    shape(H,R,[H.p(i,2.17,.1),H.p(i,2.84,.1),H.p(i,2.65,.59),H.p(i,2.36,.59)],'sun',.63,.8);
    for(const z of[.16,.48])H.dot(...H.p(i+.25,2.56,z),1.9,'blue');
  }
  timber(H,R,3.1,2.34,7.55,.16,.22,.19,'sun');
  for(const j of[2.1,2.4,2.7])timber(H,R,3,j,7.9,.275,.58,.14,'sun');
  for(const i of[3.4,5.4,9.9])cushion(H,R,i,2.19,1.25,.66,.74,.09,i>9?'teal':'paper');
  for(const i of[3.55,7.8]){
    timber(H,R,i,1.96,1.14,.66,.08,.12,'sun');
    shape(H,R,H.faceI(i+.04,2.65,1.06,.2,.49),'teal',.55,.7);
    for(let n=0;n<4;n++)H.line(R,[H.p(i+.16+n*.23,2.66,.23),H.p(i+.16+n*.23,2.66,.46)],'sun',1);
    H.line(R,[H.p(i+.43,2.68,.38),H.p(i+.72,2.68,.38)],'paper',2);
  }
  timber(H,R,8.3,3.0,1.43,.71,.02,.23,'sun');
  for(const j of[3.06,3.3,3.54])shape(H,R,H.tile(8.43,j,1.17,.11,.26),'blue',.58,.4);
  timber(H,R,3,3,7.9,.08,.06,.16,'sun');
  for(const i of[3.35,6.35,10.2])bentTube(H,R,[[i,2.78,.57],[i,2.02,1.09]],2,'teal');
  drape(H,R,8.65,2.15,1.15,.69,.73,.13,'coral');
  shape(H,R,H.tile(7.05,2.53,.36,.24,.021),'blue',.34,.4);shape(H,R,H.tile(7.6,2.5,.36,.24,.021),'blue',.26,.4);
  metal(H,R,3.25,.62,.52,.52,1.5,.15,'teal');bentTube(H,R,[[3.5,.86,1.65],[3.5,.86,2.12],[3.72,.86,2.18]],2.6,'blue');
  const [sx,sy]=H.p(3.75,.86,2.19);shape(H,R,[[sx-13,sy-5],[sx+12,sy-13],[sx+19,sy-4],[sx-9,sy+4]],'blue',.9,.7);oval(H,R,sx+15,sy-8,5,5,'paper',1);
  cabinetFrame(H,R,.42,.65,1.45,4.6,0,2.65,1,'sun',(i,j,w,d,z,h)=>{
    for(const zz of[.42,1.13,1.84])timber(H,R,i,j,w,d,zz,.08,'sun');
    for(let n=0;n<3;n++){drape(H,R,i+.08,j+.2+n*.95,w-.16,.66,.53,.17,n%2?'paper':'teal');}
    for(let n=0;n<4;n++){metal(H,R,i+.05,j+.12+n*.98,w-.08,.85,1.23,.32,n%2?'teal':'blue');const[x,y]=H.p(i+w,j+.54+n*.98,1.4);H.line(R,[[x,y-3],[x,y+3]],'sun',1.4);}
    cards(H,R,i+.04,j+.2,1.96);
  });
  for(const j of[1.05,2.9,4.6]){const[x,y]=H.p(1.8,j,2.7);shape(H,R,[[x-7,y],[x+7,y],[x+8,y-19],[x-7,y-17]],j<2?'coral':'blue',.65,.7);stroke(H,R,[[x-5,y-17],[x-6,y-26],[x+5,y-26],[x+6,y-18]],'blue',1.5);}
  hangingRail(H,R,'nw',6.1,3.5,3.12,3,(Q,u,n)=>{const[x,y]=Q(u,-.12);shape(H,R,[[x-12,y],[x+12,y],[x+10,y+23],[x-9,y+26]],n===1?'paper':'sun',.66,.7);if(n===1)stroke(H,R,[[x-6,y+15],[x-3,y+5],[x+1,y+20],[x+6,y+9]],'teal',1.2);else for(let k=0;k<3;k++)stroke(H,R,[[x-8,y+5+k*6],[x,y+2+k*6],[x+8,y+6+k*6]],'blue',.7);});
  wallRack(H,R,'nw',6.0,4.15,.43,.85,1,'sun',(Q,z)=>{
    for(const [u,h,ink]of[[.38,.5,'coral'],[1.02,.44,'sun'],[2.03,.48,'teal']]){const[x,y]=Q(u,z+.2);oval(H,R,x,y,7,3,'paper',1);stroke(H,R,[[x-5,y],[x-1,y-11],[x+6,y-17]],ink,1.4);H.line(R,[[x+4,y-13],[x+9,y-12]],'blue',.9);}
    for(let n=0;n<4;n++)shape(H,R,[Q(2.65+n*.25,z),Q(2.84+n*.25,z),Q(2.84+n*.25,z+.45),Q(2.65+n*.25,z+.42)],n%2?'paper':'teal',.75,.5);
  });
  benchFrame(H,R,.65,7.4,1.25,3.5,.85,'sun');
  timber(H,R,.75,7.6,1.05,2.96,.21,.07,'sun');
  for(const j of[8.1,9.3]){
    const[x,y]=H.p(1.3,j,.29);shape(H,R,[[x-13,y-2],[x+9,y-1],[x+10,y-12],[x-12,y-14]],'teal',.58,.7);shape(H,R,[[x-12,y-14],[x-6,y-20],[x+6,y-18],[x+10,y-12]],'paper',.94,.6);stroke(H,R,[[x-7,y-5],[x-7,y-13],[x+5,y-12],[x+5,y-4]],'sun',1.3);
  }
  const [fx,fy]=H.p(1.25,8.2,.88);shape(H,R,[[fx-9,fy],[fx-3,fy-11],[fx+5,fy-6],[fx+11,fy+1],[fx+3,fy+7],[fx-6,fy+6]],'paper',1,.7);for(const [dx,dy]of[[-3,-4],[1,-5],[5,-2]])oval(H,R,fx+dx,fy+dy,1.5,2,'blue',.5);
  const [bx,by]=H.p(1.2,9.5,.9);shape(H,R,[[bx-6,by-12],[bx+6,by-9],[bx+5,by+9],[bx-8,by+6]],'coral',.52,.7);for(let k=0;k<4;k++)stroke(H,R,[[bx-4+k*3,by-10],[bx-2+k*2,by-1],[bx-4+k*3,by+6]],'blue',.7);
  stroke(H,R,[H.p(1.2,10.1,.88),H.p(1.21,10.18,1.25),H.p(1.4,10.22,1.4)],'teal',1.5);
  benchFrame(H,R,3.65,8.65,3.7,1.9,1.03,'teal');
  timber(H,R,3.92,8.9,3.16,1.28,.29,.09,'sun');
  drape(H,R,3.91,8.84,1.51,1.34,1.06,.27,'paper');
  shape(H,R,H.tile(4.0,8.94,1.31,1.12,1.08),'sun',.17,.65);
  stroke(H,R,[H.p(4.08,9.2,1.1),H.p(4.42,9.42,1.1),H.p(4.5,9.8,1.1),H.p(5.17,9.89,1.1)],'teal',3.2);
  for(const [i,j]of[[4.2,9.72],[4.85,9.22]])oval(H,R,...H.p(i,j,1.11),4,2.5,'coral',.55);
  cards(H,R,5.72,9.11,1.06);
  binocular(H,R,...H.p(6.02,9.89,1.16));
  const[ex,ey]=H.p(4.75,9.79,.39);shape(H,R,[[ex-22,ey],[ex+20,ey],[ex+18,ey-15],[ex-20,ey-17]],'teal',.67,.9);shape(H,R,[[ex-18,ey-15],[ex-16,ey-23],[ex+13,ey-22],[ex+18,ey-15]],'sun',.45,.65);stroke(H,R,[[ex-10,ey-19],[ex-8,ey-29],[ex+7,ey-29],[ex+9,ey-19]],'blue',2.1);H.line(R,[[ex-6,ey-6],[ex+7,ey-6]],'paper',1.4);
  const[tx,ty]=H.p(6.88,9.05,1.06);shape(H,R,[[tx-5,ty],[tx+5,ty],[tx+4,ty-22],[tx-4,ty-22]],'coral',.62,.7);oval(H,R,tx,ty-22,4,2,'blue',.8);oval(H,R,tx+11,ty+3,4,2.5,'paper',1);H.line(R,[[tx+7,ty+2],[tx+8,ty-4],[tx+14,ty-4],[tx+15,ty+2]],'blue',.8);
  H.line(R,[H.p(5.0,10.11,1.1),H.p(5.45,10.05,1.1)],'coral',1.8);
  for(const i of[9.68,11.1])bentTube(H,R,[[i,8.35,.05],[i,8.35,1.68],[i,9.55,1.68],[i,9.55,.05]],2.7,'teal');
  timber(H,R,9.58,8.45,1.7,1.12,.43,.12,'sun');
  for(const [i,ink]of[[9.93,'coral'],[10.63,'teal']]){const[x,y]=H.p(i,9.19,.57);shape(H,R,[[x-9,y],[x+8,y+2],[x+9,y-8],[x+3,y-12],[x+3,y-27],[x-6,y-27],[x-6,y-7],[x-10,y-4]],ink,.7,.8);oval(H,R,x-1, y-27,5,2.3,'blue',.8);H.line(R,[[x-8,y],[x+7,y+1]],'sun',1.2);}
  drape(H,R,9.84,8.37,1.03,.25,1.7,.71,'paper');
  vessel(H,R,10.9,8.05,.03,9,22,'teal');
  bentTube(H,R,[[11.05,8.16,.12],[11.22,8.32,1.78]],1.8,'sun');
  const[rx,ry]=H.p(11.22,8.32,1.78);shape(H,R,[[rx-4,ry+2],[rx+4,ry+3],[rx+7,ry-8],[rx-1,ry-11]],'sun',.68,.6);for(let n=0;n<4;n++)H.line(R,[[rx+n*2-2,ry-5],[rx+n*2,ry+4]],'blue',.7);
  for(const [i,j]of[[10.45,7.4],[10.82,7.72],[10.1,7.92]]){oval(H,R,...H.p(i,j,.027),4.7,2.1,'blue',.19);}
  shape(H,R,H.tile(10.55,5.0,1.2,2.2,.02),'blue',.46,.8);for(let j=5.1;j<7.2;j+=.22)H.line(R,[H.p(10.64,j,.03),H.p(11.63,j,.03)],'sun',.7);
  for(const j of[.15,2.1]){
    bentTube(H,R,[[.05,j,3.49],[6,j,3.83],[11.95,j,3.49]],4.1,'sun');
    bentTube(H,R,[[.05,j,3.49],[11.95,j,3.49]],2.5,'blue');
    for(const i of[2,6,10])bentTube(H,R,[[i-1,j,3.51],[i,j,3.64],[i+1,j,3.51]],1.2,'sun');
  }
  for(const i of[.4,5.9,11.5])bentTube(H,R,[[i,.1,3.55],[i,2.15,3.55]],2.1,'teal');
  bentTube(H,R,[[.03,11.8,3.46],[.03,11.8,.06]],3.4,'blue');
  const [hx,hy]=H.p(9.4,.39,1.51);stroke(H,R,[[hx-8,hy],[hx+8,hy-7]],'blue',.75);for(let k=0;k<5;k++)H.line(R,[[hx-6+k*3,hy-k],[hx-4+k*3,hy-6-k]],'paper',.8);
},(H,R,time)=>{
  const t=((time%duration)+duration)%duration,opening=ease(.6,4.8,t)*(1-ease(17,22,t)),angle=opening*2.8;
  const panel=(i,v)=>H.p(i,.3-v*Math.sin(angle),3-v*Math.cos(angle));
  shape(H,R,[panel(2.3,0),panel(10.92,0),panel(10.92,1.36),panel(2.3,1.36)],'sun',.61,.9);
  for(let i=2.5;i<10.9;i+=.71)H.line(R,[panel(i,.04),panel(i,1.32)],'blue',.55,{tone:.35});
  for(const i of[2.6,10.6]){H.line(R,[H.p(i,.32,1.6),panel(i,1.18)],'blue',2);oval(H,R,...panel(i,1.18),2,2,'paper',1);}
  const handle=panel(6.2,1.21);H.line(R,[[handle[0]-6,handle[1]],[handle[0]+6,handle[1]+5]],'blue',3);H.line(R,[[handle[0]-4,handle[1]],[handle[0]+4,handle[1]+3]],'paper',1.4);
  actor(H,R,6.15,3.45,t,'londonWetlandVisitor',{face:'ne',shirt:['blue',.75],pants:['teal',.75],hairStyle:'short',prop:(HH,RR,pts)=>{const release=ease(4.6,5.2,t)*(1-ease(16.6,17.2,t)),pulley=HH.p(6.2,.3,3.12),cleat=HH.p(6.5,3.1,1.61),end=pts.nearHand.map((v,k)=>v+(cleat[k]-v)*release);stroke(HH,RR,[handle,pulley,[pulley[0]+7,pulley[1]+9],end],'blue',.85);oval(HH,RR,pulley[0],pulley[1],3.1,3.1,'sun',.8);binocular(HH,RR,pts.farHand[0]+(pts.nearHand[0]-pts.farHand[0])*.5*release,pts.farHand[1]+(pts.nearHand[1]-pts.farHand[1])*.5*release);}},0,1.8);
  actor(H,R,8.75,3.45,t,'londonWetlandChild',{face:'ne',shirt:['coral',.77],pants:['blue',.8],hairStyle:'curly'},0,1.65,'child');
  const sway=.05*Math.sin(t*TAU/duration);shape(H,R,[H.p(.3,10.3,3.4),H.p(.3,10.95,3.4),H.p(.38+sway,10.95,3.15),H.p(.36+sway,10.3,3.15)],'paper',.9,.6);
  for(let n=0;n<4;n++)H.line(R,[H.p(3+n*.65,1.15,1.52),H.p(3.2+n*.65+sway,1.5,1.52)],'teal',.9,{tone:.33*opening});
});
room.loopSeconds=duration;
room.stillTime=11;
export default room;
