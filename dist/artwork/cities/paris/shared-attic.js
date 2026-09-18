import { world, box, shape, oval, stroke, actor, ell, wallPt, wallRect } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, cushion, drape, vessel, pendant, floorLight } from '../materials.js';
import { cabinetFrame, basin } from '../structure.js';
import { windowBay, cityView, panelFront, wallRack, hangingRail, caster } from '../joinery.js';

const contactPose={...FIGURES.sample('idle',0)};
FIGURES.clips.parisAtticContact={dur:1,keys:[[0,contactPose],[1,contactPose]]};
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

  FIGURES.draw(H,R,{who:'adult',x:base[0],y:base[1],t:0,phase:0,clip:'parisAtticContact',scale,face:options.face||'se',ground:base,opts:options});
}
const T=16,rest=FIGURES.sample('idle',0),ease=(a,b,t)=>{const q=Math.max(0,Math.min(1,(t-a)/(b-a)));return q*q*(3-2*q);};
FIGURES.clips.parisAtticGuest={dur:T,keys:[[0,{...rest,al:22,el:53,ar:18,head:8}],[.4,{...rest,al:22,el:53,ar:18,head:-8}],[.6,{...rest,al:22,el:53,ar:18,head:-8}],[.875,{...rest,al:22,el:53,ar:18,head:8}],[1,{...rest,al:22,el:53,ar:18,head:8}]]};
function chair(H,R,i,j){
 for(const x of [i+.08,i+.96])for(const y of [j+.08,j+.93])timber(H,R,x,y,.12,.12,.03,.72,'sun');
 bentTube(H,R,[[i+.13,j+.84,.22],[i+1.01,j+.84,.22]],2,'sun');
 metal(H,R,i+.51,j+.78,.29,.16,.16,.13,'teal');
 timber(H,R,i,j,1.15,1.1,.69,.13,'sun');
 cushion(H,R,i+.09,j+.12,.97,.85,.83,.08,'coral');
 for(const x of [i+.08,i+.96])timber(H,R,x,j+.03,.12,.15,.79,.91,'sun');
 for(const z of [1.03,1.31,1.56])timber(H,R,i+.08,j,1.01,.18,z,.14,'sun');
 for(const x of [i+.14,i+.94])H.line(R,[H.p(x,j+.06,.99),H.p(x,j+.06,1.66)],'paper',.9);
 for(const z of [.25,.54])H.line(R,[H.p(i+.12,j+.92,z),H.p(i+1.03,j+.92,z)],'sun',1.7);
 for(let n=0;n<4;n++)H.line(R,[H.p(i+.51+n*.055,j+.95,.24),H.p(i+.53+n*.055,j+.87,.21)],'paper',.85);
 for(const x of [i+.23,i+.91])H.dot(...H.p(x,j+.04,1.4),.9,'blue');
}
function cup(H,R,i,j,z,side,repair=false){
 const [x,y]=H.p(i,j,z);shape(H,R,[[x-5,y-10],[x+5,y-10],[x+4,y],[x-4,y]],'paper',1,.7);oval(H,R,x,y-10,5,2,'paper',1);oval(H,R,x,y-10,3.9,1.3,'sun',.48);
 if(side===1)H.outline(R,ell(x+6.4,y-5.4,3,3.6),'blue',.8);else stroke(H,R,[[x-5,y-8],[x-9,y-8],[x-9,y-2],[x-4,y-2]],'teal',1.3);
 if(repair){H.line(R,[[x-2,y-8],[x-1,y-5],[x-2,y-2]],'teal',.8);H.line(R,[[x+1,y-8],[x+2,y-6]],'sun',1);}
 H.line(R,[[x-3,y+1],[x+3,y+1]],'coral',1.4);
}
function kettle(H,R){
 const [x,y]=H.p(4.26,4.51,1.3);oval(H,R,x,y,13,4,'blue',.65);shape(H,R,[[x-12,y-3],[x-11,y-19],[x-6,y-24],[x+6,y-24],[x+11,y-19],[x+12,y-3]],'teal',.6,.9);
 oval(H,R,x,y-4,12,4,'teal',.6);oval(H,R,x,y-23,7,2.6,'paper',1);H.dot(x,y-27,2,'blue');
 shape(H,R,[[x+8,y-16],[x+18,y-23],[x+20,y-22],[x+12,y-8]],'teal',.6,.8);
 stroke(H,R,[[x-9,y-19],[x-17,y-23],[x-19,y-9],[x-11,y-5]],'blue',3);
 H.line(R,[[x-7,y-17],[x-6,y-7]],'paper',1.8);
}
const room=world('paris-shared-attic','The kettle waits for two',{wall:'paper',wallTone:.72,height:3.65,floor:'paper',pattern:'tiles',head:100},(H,R)=>{
 for(const side of ['nw','ne']){
   H.line(R,[wallPt(H,side,.1,.13,-.1),wallPt(H,side,11.85,.13,-.1)],'teal',4);
   H.line(R,[wallPt(H,side,.1,3.57,-.11),wallPt(H,side,11.85,3.57,-.11)],'sun',3);
 }
 shape(H,R,wallRect(H,'ne',3.14,6.13,.32,1.43,-.12),'teal',.22,.7);
 for(let n=0;n<4;n++)shape(H,R,wallRect(H,'ne',3.26+n*.69,3.84+n*.69,.47,1.26,-.15),'paper',.78,.6);
 timber(H,R,3.13,.16,3.03,.31,1.43,.12,'sun');
 windowBay(H,R,'ne',3.45,2.54,1.8,1.66,{night:true,divisions:2,view:P=>cityView(H,R,P,2.54,1.66,true)});
 for(let n=0;n<5;n++)H.line(R,[wallPt(H,'ne',3.5,3.41-n*.07,-.34),wallPt(H,'ne',5.91,3.41-n*.07,-.34)],'sun',1.9);
 const b=H.p(5.33,.39,1.82);shape(H,R,[[b[0]-11,b[1]],[b[0]+11,b[1]],[b[0]+6,b[1]+5],[b[0]-6,b[1]+5]],'teal',.68,.6);shape(H,R,[[b[0]-8,b[1]],[b[0]+1,b[1]-8],[b[0]+4,b[1]]],'paper',1,.5);
 for(let row=0;row<4;row++)for(let n=0;n<7;n++)shape(H,R,wallRect(H,'ne',6.25+n*.76,6.96+n*.76,.16+row*.36,.47+row*.36,-.15),'paper',1,.5);
 cabinetFrame(H,R,6.24,.45,5.26,1.73,.08,1.16,3,'teal',(x,y,w,d,z,h,n)=>{
   if(n===0){for(let k=0;k<2;k++)timber(H,R,x,y,w,d,z+.15+k*.48,.07,'teal');for(let k=0;k<3;k++){const p=H.p(x+.24+k*.41,y+d-.16,z+.57);oval(H,R,...p,5,7,'sun',.5);H.line(R,[[p[0]-2,p[1]-4],[p[0]+2,p[1]-2]],'paper',.9);}}
   else if(n===1){
     bentTube(H,R,[[x+w*.44,y+.51,z+.97],[x+w*.44,y+.51,z+.33],[x+w*.8,y+.51,z+.33],[x+w*.8,y+.38,z+.7]],2.7,'teal');
     vessel(H,R,x+.31,y+.73,z+.05,5,12,'paper',false);
     shape(H,R,[H.p(x+w-.1,y+d,z),H.p(x+w+.45,y+d+.3,z),H.p(x+w+.45,y+d+.3,z+h),H.p(x+w-.1,y+d,z+h)],'teal',.42,.7);
     H.line(R,[H.p(x+w+.34,y+d+.29,z+.4),H.p(x+w+.34,y+d+.29,z+.64)],'sun',1.6);
   }
   else {
     metal(H,R,x+.07,y+.37,w-.14,d+.17,z+.09,.23,'teal');
     vessel(H,R,x+.57,y+.94,z+.34,9,8,'teal',false);
     H.line(R,[H.p(x+.71,y+1.01,z+.47),H.p(x+1.29,y+1.03,z+.47)],'blue',2.1);
     shape(H,R,H.faceI(x+.06,y+d+.55,w-.13,z+.2,z+.55),'teal',.42,.7);
     H.line(R,[H.p(x+.47,y+d+.57,z+.4),H.p(x+.99,y+d+.57,z+.4)],'sun',2.3);
   }
 });
 timber(H,R,6.13,.36,5.53,1.98,1.24,.15,'sun');
 basin(H,R,8.11,.66,1.56,1.19,1.4,'paper');
 metal(H,R,7.86,.74,.18,.38,1.43,.19,'teal');
 shape(H,R,H.tile(7.54,1.5,.34,.44,1.43),'sun',.54,.6);
 for(let n=0;n<4;n++)H.line(R,[H.p(7.59+n*.07,1.53,1.44),H.p(7.59+n*.07,1.87,1.44)],'coral',.55);
 metal(H,R,6.38,.92,1.25,1.05,1.39,.065,'teal');
 for(let n=0;n<6;n++)H.line(R,[H.p(6.45+n*.18,1,1.46),H.p(6.45+n*.18,1.87,1.46)],'paper',.8);
 shape(H,R,H.faceI(6.24,2.22,5.27,.09,.24),'teal',.65,.7);
 for(let n=0;n<7;n++)H.line(R,[H.p(10.2+n*.17,2.24,.14),H.p(10.2+n*.17,2.24,.22)],'paper',.7);
 metal(H,R,10.01,.68,1.3,1.3,1.41,.06,'blue');oval(H,R,...H.p(10.65,1.31,1.49),13,6,'teal',.5);vessel(H,R,10.65,1.31,1.49,8,9,'teal',false);H.line(R,[H.p(10.75,1.31,1.65),H.p(11.42,1.31,1.65)],'blue',2.2);
 for(let n=0;n<5;n++){H.line(R,[H.p(6.49+n*.22,1.1,1.43),H.p(6.49+n*.22,1.7,1.88)],'teal',1.5);shape(H,R,[H.p(6.53+n*.22,1.17,1.46),H.p(6.63+n*.22,1.18,1.5),H.p(6.63+n*.22,1.56,1.91),H.p(6.53+n*.22,1.62,1.86)],'paper',1,.5);}
 wallRack(H,R,'ne',6.48,4.92,2.46,1.05,2,'teal',(P,z,row)=>{
   if(row===0)for(let n=0;n<5;n++){const p=P(.55+n*.8,z+.07);oval(H,R,...p,6,3,'paper',1);H.line(R,[[p[0]-5,p[1]-6],[p[0]-5,p[1]],[p[0]+5,p[1]],[p[0]+5,p[1]-6]],'teal',.7);}
   else for(let n=0;n<3;n++){shape(H,R,[P(.4+n*1.45,z+.04),P(1.52+n*1.45,z+.04),P(1.52+n*1.45,z+.3),P(.4+n*1.45,z+.3)],n===1?'coral':'sun',.48,.7);H.line(R,[P(.9+n*1.45,z+.07),P(.9+n*1.45,z+.24)],'paper',1.1);}
 });
 for(const x of [6.42,9.51,11.46])bentTube(H,R,[[x,.12,2.36],[x,.61,2.45]],1.4,'teal');
 cabinetFrame(H,R,6.4,.16,2.52,.53,2.79,.65,2,'sun',(x,y,w,d,z,h,n)=>{
   if(n===0){for(let k=0;k<3;k++)box(H,R,x+.09+k*.27,y+.05,.2,.25,z+.03,.3,['teal','paper','coral'][k],.55);}
   else{for(let k=0;k<2;k++)cushion(H,R,x+.07,y+.03,w-.14,.28,z+.04+k*.12,.1,'paper');}
 });
 shape(H,R,[H.p(9.99,.19,2.51),H.p(11.52,.19,2.51),H.p(11.52,.88,2.51),H.p(9.99,.88,2.51)],'teal',.55,.8);
 shape(H,R,[H.p(9.99,.88,2.51),H.p(11.52,.88,2.51),H.p(11.52,.88,2.66),H.p(9.99,.88,2.66)],'teal',.68,.7);
 for(let n=0;n<8;n++)H.line(R,[H.p(10.13+n*.16,.91,2.54),H.p(10.13+n*.16,.91,2.62)],'paper',.7);
 shape(H,R,[H.p(10.35,.19,2.53),H.p(11.2,.19,2.53),H.p(11.04,.19,3.11),H.p(10.5,.19,3.11)],'teal',.38,.7);
 metal(H,R,10.49,.11,.55,.29,3.09,.45,'teal');
 hangingRail(H,R,'ne',8.05,2.95,2.2,3,(P,u,n)=>{if(n===0){shape(H,R,[P(u-.22,-.12),P(u+.22,-.12),P(u+.26,-.73),P(u-.25,-.69)],'paper',1,.7);H.line(R,[P(u-.15,-.2),P(u-.12,-.64)],'teal',1.3);}else{H.line(R,[P(u,-.12),P(u,-.57)],'sun',1.7);oval(H,R,...P(u,-.63),n===1?4:2.6,n===1?6:4,'teal',.6);}},.5);
 cabinetFrame(H,R,.38,1.37,2.25,1.19,.11,1.66,2,'teal',(x,y,w,d,z,h,n)=>{
   timber(H,R,x,y,w,d,z+.71,.075,'teal');
   if(n===0){for(let k=0;k<4;k++)box(H,R,x+.09+k*.19,y+.17,.14,d-.2,z+.05,.52,['paper','sun','coral','teal'][k],.62);}
   else{for(let k=0;k<3;k++)cushion(H,R,x+.09,y+.15,w-.18,d-.2,z+.07+k*.13,.1,'paper');}
   for(let k=0;k<2;k++)box(H,R,x+.12+k*.34,y+.11,.27,.64,z+.82,.37,k?'sun':'teal',.42);
 });
 timber(H,R,.43,2.65,2.15,.82,.11,.13,'sun');
 shape(H,R,H.faceI(.54,3.45,1.92,.27,.67),'teal',.42,.8);
 for(let n=0;n<7;n++)H.line(R,[H.p(.67+n*.24,3.46,.31),H.p(.67+n*.24,3.46,.61)],'sun',.8);
 drape(H,R,.62,2.78,1.36,.54,.49,.22,'paper');
 for(let n=0;n<10;n++){
   const y=.3+n*.65,z=3.67-n*.32;
   timber(H,R,.23,y,2.7,.68,z,.14,'sun');
   shape(H,R,H.faceI(.27,y+.67,2.63,z-.24,z),'sun',.32,.7);
   H.line(R,[H.p(.34,y+.67,z+.15),H.p(2.83,y+.67,z+.15)],'paper',1.2);
 }
 for(const n of [0,2,4,6,8]){
   const j=.47+n*.65,z=3.72-n*.32;
   for(const x of [.4,2.73])H.dot(...H.p(x,j,z),1.2,'blue');
 }
 for(const x of [.23,2.86])shape(H,R,[H.p(x,.18,3.52),H.p(x,6.98,.19),H.p(x,6.98,.49),H.p(x,.18,3.82)],'sun',.7,1.1);
 bentTube(H,R,[[.38,.55,4.65],[.38,6.4,1.76]],3,'teal');
 for(const n of [0,2,4,6,8])bentTube(H,R,[[.39,.56+n*.65,3.68-n*.32],[.39,.56+n*.65,4.64-n*.32]],2,'teal');
 shape(H,R,[H.p(.14,.03,3.9),H.p(2.98,.03,3.9),H.p(2.98,.91,3.9),H.p(.14,.91,3.9)],'sun',.64,.9);
 wallRack(H,R,'nw',1.1,2.28,2.74,.63,1,'teal',(P,z)=>{
   for(let n=0;n<5;n++)shape(H,R,[P(.19+n*.16,z+.04),P(.3+n*.16,z+.04),P(.3+n*.16,z+.42),P(.19+n*.16,z+.42)],['coral','paper','sun'][n%3],.7,.5);
   shape(H,R,[P(1.28,z+.04),P(1.98,z+.04),P(1.98,z+.29),P(1.28,z+.29)],'teal',.6,.6);oval(H,R,...P(1.53,z+.17),3,3,'blue',.7);H.line(R,[P(1.91,z+.28),P(2.04,z+.48)],'blue',.8);
 });
 const home=H.p(2.24,1.03,3.3);shape(H,R,[[home[0]-9,home[1]],[home[0]+8,home[1]],[home[0]+8,home[1]-9],[home[0]-9,home[1]-9]],'paper',1,.6);shape(H,R,[[home[0]-11,home[1]-9],[home[0]-5,home[1]-18],[home[0]+11,home[1]-9]],'coral',.5,.6);
  const stairEdge=(j,z)=>H.p(2.96,j,z);
  shape(H,R,[stairEdge(2.61,.12),stairEdge(6.96,.12),stairEdge(6.96,.47),stairEdge(2.61,2.63)],'blue',.72,.85);
  for(const [j,h] of [[2.67,2.5],[3.72,1.98],[4.77,1.46],[5.82,.94],[6.83,.43]]){
    timber(H,R,2.77,j,.25,.13,.11,h,'teal');
  }
  for(const [j,h] of [[2.79,2.33],[3.85,1.78],[4.9,1.27],[5.95,.76]]){
    timber(H,R,2.65,j,.36,.87,.12,.12,'sun');
    if(j<3){
      for(let n=0;n<4;n++)box(H,R,2.72,j+.09+n*.17,.29,.13,.26,1.03+(n%2)*.16,['teal','paper','sun','coral'][n],.57);
      timber(H,R,2.67,j,.35,.87,1.56,.08,'sun');
      for(let n=0;n<2;n++)cushion(H,R,2.71,j+.08,.28,.65,1.65+n*.12,.1,'paper');
    }else if(j<4){
      shape(H,R,H.faceJ(3.04,j,.84,.26,1.4),'sun',.25,.7);
      for(let n=0;n<5;n++)H.line(R,[H.p(3.05,j+.08+n*.15,.33),H.p(3.05,j+.08+n*.15,1.33)],'teal',.85);
      H.line(R,[H.p(3.07,j+.26,1.11),H.p(3.07,j+.62,1.11)],'sun',2.3);
      drape(H,R,2.72,j+.13,.32,.59,1.48,.23,'paper');
    }else if(j<5){
      shape(H,R,H.faceJ(3.04,j,.84,.26,.96),'teal',.43,.7);
      H.line(R,[H.p(3.06,j+.28,.63),H.p(3.06,j+.62,.63)],'sun',2.1);
    }else{
      for(const y of [j+.23,j+.61]){const q=H.p(2.92,y,.29);shape(H,R,[[q[0]-5,q[1]],[q[0]+7,q[1]],[q[0]+7,q[1]-5],[q[0],q[1]-9],[q[0]-5,q[1]-8]],'coral',.52,.6);}
    }
  }
  H.line(R,[stairEdge(2.6,2.67),stairEdge(6.97,.5)],'sun',3.1);
  H.line(R,[stairEdge(2.6,.14),stairEdge(6.97,.14)],'teal',3);
 for(const x of [3.11,5.82])for(const y of [3.78,6.03])timber(H,R,x,y,.16,.18,.03,1.12,'sun');
 timber(H,R,3.03,3.74,3.03,2.46,1.02,.24,'sun');
 timber(H,R,3.21,6.14,2.6,.12,.82,.23,'sun');
 for(const y of [3.88,5.92]){
   timber(H,R,3.2,y,2.67,.12,.3,.11,'sun');
   for(const x of [3.25,5.68])shape(H,R,[H.p(x,y,.84),H.p(x+.22,y,.84),H.p(x,y,.58)],'teal',.5,.6);
 }
 timber(H,R,3.96,3.94,.13,2.01,.3,.12,'sun');
 timber(H,R,3.6,6.25,1.72,.68,.87,.08,'sun');
 for(let n=0;n<3;n++)H.line(R,[H.p(3.8+n*.42,6.31,.97),H.p(3.8+n*.42,6.78,.97)],n===2?'teal':'blue',1.6);
 shape(H,R,H.faceI(3.57,6.92,1.8,.9,1.14),'sun',.53,.7);
 H.line(R,[H.p(4.14,6.95,1.01),H.p(4.75,6.95,1.01)],'teal',2);
 for(const x of [3.13,5.86])H.line(R,[H.p(x,6.22,.89),H.p(x,6.22,1.13)],'paper',1.1);
 timber(H,R,6.09,3.78,.82,2.38,1.1,.16,'sun');
 bentTube(H,R,[[5.82,5.65,.77],[6.8,5.65,1.08]],2.3,'teal');
 for(const y of [4.2,5.7])metal(H,R,6, y,.19,.26,1.07,.14,'sun');
 kettle(H,R);cup(H,R,5.59,5.33,1.3,1,true);cup(H,R,4.5,5.79,1.3,-1);
 timber(H,R,3.43,5.34,.8,.67,1.28,.04,'sun');oval(H,R,...H.p(3.83,5.62,1.34),11,4,'paper',1);
 const bread=H.p(3.83,5.62,1.35);shape(H,R,[[bread[0]-9,bread[1]],[bread[0]-8,bread[1]-6],[bread[0]-3,bread[1]-10],[bread[0]+5,bread[1]-9],[bread[0]+10,bread[1]-4],[bread[0]+9,bread[1]+1]],'sun',.53,.7);
 for(let n=0;n<3;n++)H.line(R,[[bread[0]-5+n*4,bread[1]-7],[bread[0]-3+n*4,bread[1]-3]],'paper',1.2);
 H.line(R,[H.p(3.56,5.99,1.33),H.p(4.22,5.99,1.33)],'blue',1.2);H.line(R,[H.p(3.56,5.99,1.34),H.p(3.75,5.99,1.34)],'teal',2.8);
 oval(H,R,...H.p(4.26,4.51,1.28),16,5.5,'sun',.47);
 stroke(H,R,[H.p(4.12,4.27,1.31),H.p(3.14,4.04,1.3),H.p(3.05,3.77,.27),H.p(2.94,2.6,.09)],'blue',.8);
 drape(H,R,5.15,3.98,.59,.84,1.29,.21,'paper');
 metal(H,R,5.85,4.09,.44,.45,1.31,.1,'teal');
 chair(H,R,3.65,7.01);
 pendant(H,R,5.08,4.91,3.45,2.6,'coral',.83);
 timber(H,R,.73,9.14,3.1,1.05,.58,.14,'sun');for(const x of [.88,3.51])for(const y of [9.3,9.96])timber(H,R,x,y,.16,.16,.03,.55,'sun');
 shape(H,R,H.faceI(1.17,9.78,1.17,.74,1.4),'teal',.61,.8);stroke(H,R,[H.p(1.31,9.78,1.4),H.p(1.4,9.78,1.7),H.p(2.09,9.78,1.7),H.p(2.18,9.78,1.4)],'sun',1.5);
 for(const x of [2.8,3.35])oval(H,R,...H.p(x,10.51,.045),8,3.6,'coral',.62);
 oval(H,R,...H.p(3.14,9.64,.75),7,3,'paper',1);H.line(R,[H.p(3.05,9.61,.77),H.p(3.26,9.7,.77)],'blue',1.5);
 for(const x of [9.25,11.14])for(const j of [8.32,9.03]){
   metal(H,R,x,j,.1,.1,.15,.79,'teal');caster(H,R,x,j,.08);
 }
 timber(H,R,9.18,8.25,2.15,.96,.94,.14,'teal');
 timber(H,R,9.23,8.31,2.05,.85,.29,.08,'sun');
 for(let n=0;n<3;n++)oval(H,R,...H.p(9.81,8.7,.39+n*.055),12,5,'paper',1);
 box(H,R,10.48,8.39,.64,.55,.39,.24,'sun',.38);
 bentTube(H,R,[[11.22,8.28,1.03],[11.22,8.28,1.48],[11.22,9.12,1.48],[11.22,9.12,1.03]],2.1,'teal');vessel(H,R,10.02,8.68,1.11,8,18,'paper',false);drape(H,R,9.36,8.4,.57,.58,1.1,.25,'paper');
 for(let n=0;n<5;n++)H.line(R,[H.p(.4+n*.25,11.48,.03),H.p(.4+n*.25,11.78,.03)],'teal',1.3);
  hangingRail(H,R,'nw',8.03,2.79,2.24,3,(P,u,n)=>{
    if(n===0){shape(H,R,[P(u-.21,-.12),P(u+.21,-.12),P(u+.4,-.46),P(u+.25,-1.06),P(u-.24,-1.06),P(u-.4,-.46)],'coral',.55,.8);H.line(R,[P(u,-.26),P(u,-.99)],'sun',1.2);}
    else if(n===1){shape(H,R,[P(u-.12,-.17),P(u+.11,-.17),P(u+.19,-.94),P(u-.1,-1.06)],'teal',.55,.7);}
    else{H.line(R,[P(u,-.15),P(u,-.64)],'sun',1.7);oval(H,R,...P(u,-.68),3,4,'blue',.7);}
  });
  metal(H,R,9.08,6.16,2.26,.97,.11,.13,'teal');
  cushion(H,R,9.25,6.29,1.13,.64,.25,.18,'paper');
  shape(H,R,H.tile(10.54,6.34,.51,.6,.26),'sun',.3,.6);
  H.line(R,[H.p(10.55,6.59,.28),H.p(10.98,6.65,.28)],'blue',1.8);
  metal(H,R,.83,9.28,2.79,.84,.15,.075,'teal');
  for(const x of [1.08,1.59,2.75]){
    const p=H.p(x,9.74,.25);shape(H,R,[[p[0]-5,p[1]],[p[0]+8,p[1]],[p[0]+8,p[1]-4],[p[0]+2,p[1]-7],[p[0]+2,p[1]-14],[p[0]-5,p[1]-14]],'teal',.6,.65);
  }
  drape(H,R,2.55,9.21,.45,.88,.74,.32,'paper');
  shape(H,R,wallRect(H,'nw',10.82,11.49,.2,2.83,-.16),'sun',.33,.7);
  for(const z of [.61,2.39])H.line(R,[wallPt(H,'nw',11.28,z,-.18),wallPt(H,'nw',11.42,z,-.18)],'teal',2.6);
  const keys=wallPt(H,'nw',10.31,1.83,-.27);H.outline(R,ell(...keys,2.7,3.3),'sun',1);
  H.line(R,[[keys[0],keys[1]+3],[keys[0],keys[1]+11],[keys[0]+4,keys[1]+11]],'blue',1.2);
  H.line(R,[[keys[0]+3,keys[1]+3],[keys[0]+5,keys[1]+9]],'sun',1.2);
  oval(H,R,...H.p(10.7,8.7,1.12),9,3.5,'paper',1);
  cushion(H,R,10.44,8.45,.58,.43,1.13,.13,'sun');
  H.line(R,[H.p(9.25,9.03,1.12),H.p(9.81,9.03,1.12)],'teal',1.7);
  oval(H,R,...H.p(9.91,9.03,1.12),3.6,2,'teal',.55);
  shape(H,R,wallRect(H,'ne',11.57,11.87,1.75,2.04,-.2),'paper',1,.5);
  H.dot(...wallPt(H,'ne',11.66,1.9,-.23),.85,'blue');H.dot(...wallPt(H,'ne',11.77,1.9,-.23),.85,'blue');
  stroke(H,R,[wallPt(H,'ne',11.68,1.81,-.25),H.p(11.69,.26,1.47),H.p(11.28,.65,1.47)],'blue',.8);
  floorLight(H,5.12,5.75,155,.41);
},(H,R,t)=>{
 const u=t%T,slide=(ease(3.2,6.4,u)-ease(9.6,14,u))*.93;
 chair(H,R,6.72,5.69+slide);
 contactPerson(H,R,H.p(7.75,5.74+slide,1.66),{shirt:['coral',.64],pants:['blue',.7],hairStyle:'bun'},1.75,undefined,{head:-8,al:12,el:25});
 actor(H,R,5.53,8.31,t,'parisAtticGuest',{shirt:['teal',.68],pants:['blue',.63],hairStyle:'curly',face:'sw'},0,1.75);
 const flutter=Math.sin(t*Math.PI/8)*.045,Q=(x,z)=>wallPt(H,'ne',8.54+x,z,-.5);
 shape(H,R,[Q(-.21,1.53),Q(.24,1.5),Q(.26+flutter,1.39),Q(-.23+flutter,1.42)],'paper',1,.55);
 H.line(R,[Q(-.15+flutter,1.43),Q(.18+flutter,1.4)],'teal',1.1);
 const reflection=H.p(4.26,4.51,1.3);H.line(R,[[reflection[0]-3+Math.sin(t*Math.PI/8),reflection[1]-17],[reflection[0]-2+Math.sin(t*Math.PI/8),reflection[1]-8]],'paper',1.2,{tone:.6});

});
room.loopSeconds=T;room.stillTime=8;
export default room;
