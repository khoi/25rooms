import { world, shape, oval, stroke, actor, cycle, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, slattedSeat, cushion, surface, vessel } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';
const ease=x=>{const v=Math.max(0,Math.min(1,x));return v*v*(3-2*v);};
const fold=t=>ease((t-4.4)/4.4)*(1-ease((t-13.2)/6.8));
const rest=FIGURES.clips.idle.keys[0][1];
FIGURES.clips.amsterdamFerryFold={dur:22,keys:[[0,{...rest,al:70,ar:75,el:50,er:45,head:12}],[.2,{...rest,al:85,ar:92,el:38,er:32,head:14}],[.4,{...rest,al:64,ar:65,el:76,er:80}],[.6,{...rest,al:64,ar:65,el:76,er:80}],[.91,{...rest,al:70,ar:75,el:50,er:45,head:12}],[1,{...rest,al:70,ar:75,el:50,er:45,head:12}]]};
function bike(H,R,i,j,ink){
  metal(H,R,i-.75,j-.16,4.65,.32,.02,.08,'teal');
  for(const x of[i,i+3]){const C=H.p(x,j,.77);const Q=Array.from({length:36},(_,n)=>H.p(x+Math.cos(n*TAU/36)*.75,j,.77+Math.sin(n*TAU/36)*.75));H.outline(R,Q,'blue',3.3,{amp:.05});H.outline(R,Q.map(([x,y])=>[C[0]+(x-C[0])*.88,C[1]+(y-C[1])*.88]),'paper',1,{amp:.05});for(let n=0;n<12;n++)H.line(R,[C,Q[n*3]],'blue',.65);oval(H,R,...C,2.5,2.5,'sun');}
  bentTube(H,R,[[i,j,.77],[i+1.1,j,1.68],[i+1.7,j,.69],[i,j,.77],[i+1.7,j,.69],[i+2.6,j,1.73],[i+1.1,j,1.68]],2.4,ink);
  bentTube(H,R,[[i+3,j,.77],[i+2.6,j,1.73],[i+2.52,j,2.0],[i+2.26,j+.13,2.05]],2.4,'blue');
  bentTube(H,R,[[i+1.1,j,1.5],[i+1.08,j,1.93]],1.9,'blue');cushion(H,R,i+.72,j-.22,.72,.42,1.88,.1,'coral');
  H.line(R,[H.p(i+2.25,j+.12,2.04),H.p(i+2.49,j+.12,2.04)],'coral',4.2);
  oval(H,R,...H.p(i+2.55,j+.12,2.1),3.2,2.4,'sun');
  stroke(H,R,[H.p(i+2.52,j+.13,2.07),H.p(i+2.3,j+.25,1.84),H.p(i+2.6,j+.17,1.88)],'paper',.9);
  bentTube(H,R,[[i-.35,j,.97],[i-.31,j,1.54],[i+.66,j,1.54]],1.8,'blue');
  shape(H,R,H.faceI(i-.31,j+.07,.98,1.08,1.49),ink,.55);
  H.line(R,[H.p(i-.12,j+.08,1.35),H.p(i+.54,j+.08,1.35)],'paper',1.1);
  for(const x of[i,i+3]){stroke(H,R,[H.p(x-.24,j-.12,.12),H.p(x-.22,j,.52),H.p(x+.18,j+.16,.12)],'coral',2);metal(H,R,x-.38,j-.29,.19,.59,.015,.06,'blue');}
}
function shell(H,R){
  surface(H,R,H.tile(0,0,12,1.7,.02),'teal',.54);boardFloor(H,R,0,1.72,12,10.28,.07,'sun',.42);
  for(let n=0;n<12;n++)H.line(R,[H.p(.3+n*.95,.2+(n%3)*.43,.04),H.p(.8+n*.95,.2+(n%3)*.43,.04)],'paper',.9);
  surface(H,R,H.faceI(.35,1.77,11.1,.25,2.95),'paper',.5);
  for(const x of[.5,4.15,7.8,11.4]){metal(H,R,x,1.8,.15,.2,.08,3.28,'teal');for(const z of[.85,2.62])metal(H,R,x-.04,1.94,.23,.08,z,.18,'blue');}
  for(const z of[.6,2.9])bentTube(H,R,[[.5,1.93,z],[11.48,1.93,z]],2.5,'teal');
  for(const i of[.8,4.4,8.1])H.line(R,[H.p(i,1.95,.8),H.p(i+.7,1.95,2.7)],'paper',3,{tone:.7});
  surface(H,R,[H.p(.28,1.48,3.22),H.p(11.8,1.48,3.22),H.p(11.8,3.14,3.55),H.p(.28,3.14,3.55)],'teal',.22);
  for(const x of[.4,4.2,7.9,11.5])bentTube(H,R,[[x,1.5,3.2],[x,3.14,3.53],[x,3.31,3.37]],2.3,'paper');
  bentTube(H,R,[[.3,3.15,3.51],[11.7,3.15,3.51],[11.8,3.15,2.8]],2.2,'blue');
  for(const j of[3.5,5.8,8.1,10.5]){metal(H,R,.1,j,.17,.18,.08,1.25,'teal');metal(H,R,.03,j-.09,.31,.36,.075,.07,'blue');}
  bentTube(H,R,[[.22,2.2,1.3],[.22,10.8,1.3],[.7,11.2,1.3]],3,'blue');
  slattedSeat(H,R,1.4,2.65,6.8,.08,'sun',.72);
  for(const i of[3.1,5.5])bentTube(H,R,[[i,2.7,1.42],[i,3.24,1.16],[i,3.24,.91]],2.6,'teal');
  cushion(H,R,4.86,2.79,.71,.41,.82,.08,'coral');
  cabinetFrame(H,R,9.26,2.22,2.05,1.29,.08,2.66,1,'teal',(i,j,w,d,z)=>{
    const [x,y]=H.p(i+w/2,j+.87,z+1.95);oval(H,R,x,y,22,22,'paper');oval(H,R,x,y,15,15,'coral');oval(H,R,x,y,8,8,'teal');for(const a of[0,Math.PI/2,Math.PI,Math.PI*1.5])H.line(R,[[x+Math.cos(a)*10,y+Math.sin(a)*10],[x+Math.cos(a)*20,y+Math.sin(a)*20]],'paper',3);
    timber(H,R,i,j,w,d,z+.65,.08,'sun');vessel(H,R,i+.34,j+.5,z+.1,6,15,'sun');bentTube(H,R,[[i+1,j+.4,z+.1],[i+1,j+.4,z+.58]],1.8,'coral');
  });
  for(let n=0;n<5;n++)H.line(R,[H.p(9.52+n*.3,3.53,.35),H.p(9.52+n*.3,3.53,.57)],'blue',1);
  metal(H,R,9.6,2.48,1.27,.51,2.86,.15,'blue');surface(H,R,H.faceI(9.7,3.0,1.08,2.88,2.98),'sun',.85);
  metal(H,R,8.85,9.57,2.25,1.24,.08,.08,'blue');for(let n=0;n<9;n++)H.line(R,[H.p(9.02+n*.22,9.66,.17),H.p(9.02+n*.22,10.69,.17)],'paper',1);
  surface(H,R,H.tile(8.85,9.57,.48,.36,.18),'teal',.65);
  cushion(H,R,1.1,8.4,.68,1.14,.1,.15,'coral');
  const [x,y]=H.p(1.51,9.76,.1);shape(H,R,[[x-10,y],[x+10,y],[x+9,y-25],[x-7,y-28]],'teal',.64);shape(H,R,[[x-7,y-3],[x+7,y-3],[x+6,y-14],[x-5,y-14]],'coral',.65);stroke(H,R,[[x-5,y-26],[x-4,y-34],[x+5,y-34],[x+7,y-26]],'blue',1.2);shape(H,R,[[x-4,y-15],[x+6,y-15],[x+3,y-20],[x-3,y-20]],'paper',1);
  metal(H,R,6.9,9.54,.33,1.63,.12,.15,'teal');bentTube(H,R,[[7.1,9.7,.28],[7.1,9.7,1.11],[7.24,9.67,1.21],[7.37,9.67,1.12]],1.6,'sun');
}
function cape(H,R,t){
  const f=fold(t),left=2.15+f*1.64,w=2.7-f*1.64,drop=.94-f*.67;
  const P=(u,v)=>H.p(left+u*w,5.26+Math.sin(u*Math.PI*6)*.035,1.45-v*drop);
  const Q=[P(0,0),P(1,0),...Array.from({length:15},(_,n)=>P(1-n/14,1+.045*Math.sin(n*1.7)))];surface(H,R,Q,'coral',.62);
  for(let n=0;n<7;n++)H.line(R,[P((n+.3)/7,.05),P((n+.4)/7,.94)],n%2?'paper':'blue',n%2?1.1:.65);
  H.line(R,[P(.02,.9),P(.99,.9)],'sun',1);
  surface(H,R,[P(.64,.35),P(.86,.35),P(.86,.69),P(.64,.69)],'paper',.48);
  for(const u of[0,1])oval(H,R,...P(u,0),2.4,2.4,'sun');
}
const room=world('amsterdam-ferry-waiting','Two bicycles face the water',{wall:false,floor:'paper',tone:.15,head:40},(H,R)=>{
  shell(H,R);
  bentTube(H,R,[[2.07,5.28,.08],[2.07,5.28,1.47],[4.95,5.28,1.47],[4.95,5.28,.08]],2.7,'blue');
  surface(H,R,H.tile(2.2,3.01,1.06,.54,.83),'paper',1);H.line(R,[H.p(2.31,3.06,.85),H.p(3.13,3.42,.85)],'blue',.7);
  vessel(H,R,5.82,3.08,.83,4,15,'teal',false);
},(H,R,time)=>{
  const t=cycle(time,22)*22;
  H.clip(H.faceI(.56,1.78,8.3,1.55,2.88),()=>{for(let n=0;n<10;n++){const x=((n*1.67-(cycle(time,22)*16.7))%16.7+16.7)%16.7-2.7;shape(H,R,[H.p(x,1.79,1.62),H.p(x+1.25,1.79,1.62),H.p(x+1.25,1.79,1.96+n%3*.16),H.p(x+.6,1.79,2.2+n%3*.16),H.p(x,1.79,1.96+n%3*.16)],'teal',.18,.5);}});
  H.at(5.3,5.45,0,HH=>actor(HH,R,5.3,5.45,t,'amsterdamFerryFold',{shirt:['sun',.7],hairStyle:'cap',face:'sw'},0,1.43));
  H.at(4.85,5.3,0,HH=>cape(HH,R,t));
  H.at(6.6,5.1,0,HH=>bike(HH,R,6.6,5.1,'coral'));
  H.at(6.1,7.51,0,HH=>bike(HH,R,6.1,7.51,'teal'));
  actor(H,R,9.65,4.05,4*Math.sin(t*Math.PI/22)**2,'lookup',{shirt:['coral',.65],hairStyle:'pony',face:'nw'},0,1.4);
});
room.loopSeconds=22;room.stillTime=10.5;
export default room;
