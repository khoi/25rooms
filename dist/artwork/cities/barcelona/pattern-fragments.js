import { world, shape, oval, stroke, actor, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, bentTube, benchFrame, cushion } from '../materials.js';
import { archedBay, cabinetFrame } from '../structure.js';
import { windowBay, taskLight, hangingRail, recessedFrame } from '../joinery.js';

const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
const samplePose={...FIGURES.clips.idle.keys[0][1],al:24,el:40,head:10};
FIGURES.clips['barcelona-pattern-turn']={dur:18,keys:[[0,samplePose],[1,samplePose]]};
function contact(H,target){const p=H.p(3.75,5.73),s=1.65,dx=-(target[0]-p[0])/s-5.2,dy=(target[1]-p[1])/s+32.5,a=4.368,b=4.2,d=Math.min(8.55,Math.hypot(dx,dy)),v=Math.acos(Math.max(-1,Math.min(1,(d*d-a*a-b*b)/(2*a*b))));samplePose.ar=(Math.atan2(dx,dy)-Math.atan2(b*Math.sin(v),a+b*Math.cos(v)))*180/Math.PI;samplePose.er=v*180/Math.PI;}
function tray(H,R,i,j,z,ink='coral',stray=false){timber(H,R,i,j,1.35,1,z,.09,'sun');for(const y of[j,j+.92])timber(H,R,i,y,1.35,.08,z,.19,'sun');for(const x of[i,i+1.27])timber(H,R,x,j,.08,1,z,.19,'sun');for(let n=0;n<6;n++){const x=i+.2+(n%3)*.36,y=j+.2+Math.floor(n/3)*.45;shape(H,R,[H.p(x,y,z+.15),H.p(x+.27,y-.04,z+.17),H.p(x+.22,y+.26,z+.16),H.p(x-.04,y+.2,z+.15)],stray&&n===3?'blue':ink,.58,.5);}}
function wave(H,R,i,j,z,a,pattern=true){const P=(u,v,off=0)=>H.p(i+(u-1.8)*Math.cos(a)+v*.2*Math.sin(a),j+(u-1.8)*Math.sin(a)-v*.2*Math.cos(a)+off,z+v*.95+.48*Math.sin(u/3.6*Math.PI));
  const outline=[P(0,0),P(3.6,0),...Array.from({length:19},(_,n)=>P(3.6-n*.2,1))];shape(H,R,outline,'sun',.64,1.2);if(pattern)for(let row=0;row<4;row++)for(let n=0;n<12;n++){const u=n*.3+.025,v=row*.245+.02,ink=['teal','paper','coral','sun'][((n+row*2)%7===0)?2:(n+row)%4];shape(H,R,[P(u,v,-.025),P(u+.27,v,-.025),P(u+.27,v+.212,-.025),P(u+(n===7&&row===1?.085:0),v+.212,-.025)],ink,ink==='paper'?1:.63,.45);H.line(R,[P(u,v+.21,-.03),P(u+.26,v+.21,-.03)],'paper',.65);}else{for(let n=0;n<7;n++)H.line(R,[P(.2+n*.5,.07),P(.2+n*.5,.91)],'coral',.65,{tone:.45});}H.line(R,Array.from({length:20},(_,n)=>P(n*3.6/19,1.025,-.035)),'paper',1.4);return P;}
const room=world('barcelona-pattern-fragments','A tile turns into a corner',{wall:'paper',wallTone:.69,floor:'paper',tone:.4,pattern:'tiles',accent:'sun',height:3.84,head:50},(H,R)=>{
  windowBay(H,R,'nw',1.35,6.85,1.55,2.05,{divisions:3,ink:'teal'});
  for(const z of[.19,.74,1.2])timber(H,R,.31,1.7,1.07,6.28,z,.09,'teal');
  for(const j of[1.76,3.37,5.11,7.82])timber(H,R,.3,j,1.1,.12,.08,1.19,'sun');
  for(let n=0;n<5;n++){
    const j=1.94+n*1.16,z=n%2?.28:.82;
    shape(H,R,[H.p(.48,j,z),H.p(1.07,j,z),H.p(.93,j+.46,z+.55),H.p(.34,j+.46,z+.55)],['coral','sun','paper','teal','paper'][n],.66);
    H.line(R,[H.p(.48,j+.05,z+.08),H.p(.9,j+.39,z+.48)],'blue',.7);
    shape(H,R,[H.p(.38,j+.13,z),H.p(.94,j+.13,z),H.p(.9,j+.19,z+.5),H.p(.36,j+.19,z+.5)],'paper',.8);
  }
  for(const j of[2.43,6.91]){const p=H.p(1.08,j,.36);oval(H,R,...p,6,3,'sun');H.dot(...p,2,'blue');}
  for(const j of[1.38,8])bentTube(H,R,[[.25,j,1.9],[.9,j,1.7],[.25,j,1.55]],1.5,'blue');
  archedBay(H,R,'ne',7.2,3.82,.71,2.93,'sun',P=>{shape(H,R,[P(.2,.18),P(3.6,.18),P(3.6,2.78),P(.2,2.78)],'blue',.49);for(const z of[.6,1.42,2.13]){H.line(R,[P(.2,z),P(3.58,z)],'sun',4);for(let n=0;n<4;n++){const u=.35+n*.76;shape(H,R,[P(u,z+.06),P(u+.61,z+.06),P(u+.61,z+.62),P(u,z+.62)],['paper','teal','sun','coral'][n],.7);H.line(R,[P(u+.1,z+.11),P(u+.51,z+.56)],'blue',.6,{tone:.6});}}});
  cabinetFrame(H,R,6.75,.53,4.78,1.27,.08,.83,5,'teal',(i,j,w,d,z,h,n)=>{shape(H,R,H.faceI(i+.05,j+d,w-.1,z+.06,z+h-.06),'teal',.44);H.line(R,[H.p(i+.22,j+d+.02,z+.4),H.p(i+.55,j+d+.02,z+.4)],'sun',2.2);if(n===3)tray(H,R,i+.03,j+d-.2,z+.15,'coral',true);});
  recessedFrame(H,R,'ne',1.08,4.96,1.75,1.68,'teal',P=>{for(let n=0;n<4;n++){const u=.23+n*1.15;shape(H,R,[P(u,.18),P(u+.87,.18),P(u+.87,1.45),P(u,1.45)],'paper',1);H.line(R,[P(u+.12,.4),P(u+.48,1.2),P(u+.75,.4)],['sun','teal','coral','blue'][n],2);H.dot(...P(u+.43,1.4),1.7,'sun');}});
  timber(H,R,.32,8.79,1.35,2.13,.9,.14,'sun');for(const j of[8.95,10.65])timber(H,R,.45,j,.18,.2,.03,.86,'teal');tray(H,R,.45,8.93,1.07,'sun');vessel(H,R,1.12,10.47,1.08,9,16,'paper',false);
  for(const [i,j,w,d]of[[2.5,3.92,1.56,1.65],[6.02,3.93,1.39,1.63]]){
    timber(H,R,i,j,w,d,.2,.11,'teal');
    for(const z of[.4,.62,.84]){
      timber(H,R,i,j,w,d,z,.07,'sun');
      shape(H,R,H.faceI(i+.07,j+d+.03,w-.14,z+.03,z+.2),'teal',.48);H.line(R,[H.p(i+w*.35,j+d+.07,z+.13),H.p(i+w*.65,j+d+.07,z+.13)],'sun',2);
    }
    for(const x of[i,i+w-.1])timber(H,R,x,j,.1,d,.29,.71,'sun');
  }
  for(const i of[2.32,7.56]){bentTube(H,R,[[i,3.57,.04],[i,4.38,.96],[i,6.32,.04]],5,'teal');timber(H,R,i-.26,3.42,.55,2.97,.92,.21,'sun');}
  const outline=[[2.02,3.25],[7.83,3.25],[8.15,3.66],[8.15,5.96],[7.78,6.5],[2.12,6.5],[1.79,6.02],[1.79,3.7]];shape(H,R,outline.map(([i,j])=>H.p(i,j,1.1)),'sun',.54,1.2);shape(H,R,outline.map(([i,j])=>H.p(i,j,1.25)),'sun',.38,1.1);H.line(R,[H.p(2.15,6.48,1.26),H.p(7.8,6.48,1.26)],'paper',1.7);
  for(let j=3.64;j<6.3;j+=.38)H.line(R,[H.p(2.04,j,1.27),H.p(7.88,j,1.27)],'coral',.5,{tone:.3});
  taskLight(H,R,2.35,3.65,1.29,'sun',.45);
  timber(H,R,4.04,4.11,1.19,.63,1.3,.11,'teal');
  for(const i of[4.16,4.94]){const p=H.p(i,4.56,1.48);oval(H,R,...p,5.5,4,'sun');oval(H,R,...p,2.4,2,'paper',1);H.line(R,[[p[0]-4,p[1]],[p[0]+4,p[1]]],'blue',1);}
  oval(H,R,...H.p(4.6,4.37,1.3),39,17,'blue',.55);oval(H,R,...H.p(4.6,4.37,1.4),36,15,'paper',1);for(const [i,j]of[[3.8,4.42],[5.12,4.66]])metal(H,R,i,j,.18,.3,1.37,.36,'teal');
  wave(H,R,7.64,2.38,.9,-.28,false);timber(H,R,6.65,1.96,2.21,.97,.63,.15,'sun');
  tray(H,R,2.18,5.14,1.29,'coral',true);tray(H,R,6.55,5.03,1.29,'teal');
  metal(H,R,7.29,3.66,.45,.71,1.29,.19,'paper');const glue=H.p(7.5,4.04,1.55);oval(H,R,...glue,5,2,'teal');H.line(R,[[glue[0]-4,glue[1]],[glue[0]+4,glue[1]]],'sun',1.2);
  shape(H,R,H.tile(5.67,3.71,1.0,.66,1.29),'paper',1);H.line(R,[H.p(5.78,3.78,1.31),H.p(6.45,4.26,1.31)],'coral',1);for(const i of[5.92,6.12,6.32])H.line(R,[H.p(i,3.84,1.31),H.p(i,4.16,1.31)],'teal',.65);
  const nip=H.p(5.83,5.79,1.29);stroke(H,R,[[nip[0]-13,nip[1]+7],[nip[0],nip[1]],[nip[0]+4,nip[1]-9]],'blue',2.2);stroke(H,R,[[nip[0]-1,nip[1]-9],[nip[0],nip[1]],[nip[0]+13,nip[1]+6]],'coral',2.2);H.dot(...nip,2,'sun');
  benchFrame(H,R,1.4,8.33,3.5,2.0,.66,'teal');shape(H,R,H.tile(1.57,8.47,3.13,1.67,.68),'paper',1);const c=H.p(2.9,9.18,.7);H.outline(R,ell(...c,32,15),'blue',.85);H.outline(R,ell(...c,24,11),'teal',.75);H.line(R,[[c[0]-7,c[1]+10],[c[0]+4,c[1]-18],[c[0]+20,c[1]+6]],'blue',1.6);H.dot(c[0]+4,c[1]-18,2.2,'sun');
  shape(H,R,H.tile(1.8,8.65,.88,.76,.72),'paper',1);const gauge=H.p(2.24,9.03,.75);stroke(H,R,[[gauge[0]-8,gauge[1]+4],[gauge[0]-10,gauge[1]-4],[gauge[0]-3,gauge[1]-8],[gauge[0]+8,gauge[1]-4],[gauge[0]+6,gauge[1]+5]],'teal',2.3);
  H.line(R,[H.p(1.76,9.88,.73),H.p(3.68,9.88,.73)],'sun',3);for(let i=1.87;i<3.64;i+=.17)H.line(R,[H.p(i,9.85,.75),H.p(i,9.94,.75)],'blue',.65);
  const template=H.p(4.13,9.47,.72);shape(H,R,[[template[0]-15,template[1]+8],[template[0]+14,template[1]+8],[template[0]+14,template[1]-9]],'coral',.4);
  timber(H,R,8.31,9.16,2.65,2.2,.09,.19,'sun');
  shape(H,R,H.tile(8.48,9.33,2.31,1.87,.29),'blue',.54);
  for(const i of[8.31,10.83])timber(H,R,i,9.16,.13,2.2,.28,.56,'sun');
  timber(H,R,8.31,9.16,2.65,.13,.28,.56,'sun');
  const lid=[H.p(8.31,9.15,.84),H.p(10.96,9.15,.84),H.p(10.96,8.61,1.48),H.p(8.31,8.61,1.48)];shape(H,R,lid,'teal',.53);
  shape(H,R,[H.p(8.51,9.1,.98),H.p(10.76,9.1,.98),H.p(10.76,8.7,1.35),H.p(8.51,8.7,1.35)],'paper',1);H.line(R,[H.p(8.71,9.07,1.09),H.p(10.55,8.78,1.26)],'coral',1.1);
  for(const i of[8.72,10.27]){metal(H,R,i,9.07,.25,.22,.8,.12,'sun');bentTube(H,R,[[i,8.24,.41],[i,7.89,1.08]],1.6,'coral');}
  cushion(H,R,8.6,9.5,2.05,1.58,.3,.13,'paper');
  for(const j of[8.64,9.53]){const p=H.p(9.61,j,.53);shape(H,R,[[p[0]-23,p[1]],[p[0]-23,p[1]-10],[p[0]-14,p[1]-10],[p[0]-10,p[1]-4],[p[0]+10,p[1]-4],[p[0]+14,p[1]-10],[p[0]+23,p[1]-10],[p[0]+23,p[1]]],'teal',.36);}
  shape(H,R,H.tile(8.98,9.74,1.34,1.08,.49),'sun',.32);oval(H,R,...H.p(9.2,10.24,.5),12,5,'blue',.55);stroke(H,R,[H.p(8.6,9.6,.57),H.p(8.8,10.1,.7),H.p(10.39,10.7,.56)],'coral',2.1);
  timber(H,R,8.31,11.23,2.65,.13,.28,.56,'sun');
  const grip=H.p(9.61,11.38,.6);stroke(H,R,[[grip[0]-10,grip[1]],[grip[0]-9,grip[1]+8],[grip[0]+9,grip[1]+8],[grip[0]+10,grip[1]]],'blue',2.1);for(const i of[8.72,10.4])metal(H,R,i,11.35,.18,.07,.63,.25,'teal');
  hangingRail(H,R,'nw',9.35,1.9,2.83,2,(P,u,n)=>{shape(H,R,[P(u-.26,-.13),P(u+.26,-.13),P(u+.36,-1.06),P(u-.36,-1.06)],n?'paper':'coral',.65);});
},(H,R,time)=>{const t=((time%18)+18)%18,u=ease(3.6,7.2,t)*(1-ease(10.8,16,t)),a=-.25+.53*u;
  wave(H,R,4.6,4.37,1.61,a,true);bentTube(H,R,[[4.22,4.48,1.39],[4.4,4.49,1.81],[4.85,4.49,1.81],[5.03,4.48,1.4]],2.6,'teal');
  const hand=H.p(3.2,5.53,1.5);bentTube(H,R,[[4.34,4.5,1.43],[3.2,5.53,1.43]],2.8,'teal');contact(H,hand);actor(H,R,3.75,5.73,0,'barcelona-pattern-turn',{face:'sw',shirt:['coral',.68],apron:['paper',.8]},0,1.65);
  actor(H,R,9.5,6.55,u,'think',{face:'sw',shirt:['teal',.62]},0,1.55);
  const corner=H.p(1.58,8.48,.7);shape(H,R,[corner,[corner[0]+14,corner[1]+6],[corner[0]+4,corner[1]-4-Math.sin(t*Math.PI/9)*2]],'paper',1,.5);
});
room.loopSeconds=18;
room.stillTime=9;
export default room;
