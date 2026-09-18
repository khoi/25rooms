import { world, shape, oval, stroke, box, ell, mix, cycle } from '../../worlds/common.js';
import { surface, timber, metal, vessel, benchFrame, bentTube } from '../materials.js';
import { masonry } from '../structure.js';
import { windowBay, wallRack, recessedFrame, floorShadow, taskLight } from '../joinery.js';
const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
const blend=(a,b,t)=>a.map((v,n)=>mix(v,b[n],t));
function specimenLeaf(H,R,x,y,s=1,hole=false){
  shape(H,R,[[0,10],[-12,0],[-15,-18],[-5,-30],[9,-25],[17,-12],[10,1]].map(([a,b])=>[x+a*s,y+b*s]),'teal',.62);stroke(H,R,[[x,y+8*s],[x-1*s,y-6*s],[x-4*s,y-27*s]],'sun',1);for(let n=0;n<4;n++){H.line(R,[[x-1*s,y-4*s-n*5*s],[x+(n%2?9:-10)*s,y-11*s-n*4*s]],'paper',.6);}if(hole)oval(H,R,x+6*s,y-11*s,3*s,4*s,'paper',1);
}
function pod(H,R,x,y,s=1){
  shape(H,R,[[-18,4],[-13,-8],[0,-15],[17,-8],[21,2],[9,12],[-5,13]].map(([a,b])=>[x+a*s,y+b*s]),'sun',.6);stroke(H,R,[[x-15*s,y+3*s],[x,y-4*s],[x+18*s,y+1*s]],'blue',2*s);for(let n=0;n<5;n++)oval(H,R,x+(-11+n*6)*s,y+(-1+Math.sin(n)*2)*s,2.7*s,2*s,'coral',.7);for(let n=0;n<6;n++)stroke(H,R,[[x+(-12+n*5)*s,y+5*s],[x+(-13+n*5)*s,y+9*s]],'coral',.6);
}
function observer(H,R,x,y,left,right,look,scale=1.5) {
  const s=scale,P=(a,b)=>[x+a*s,y+b*s];
  H.tint(ell(x+2,y+2,20,6),'blue',.18);
  for(const side of [-1,1]) { stroke(H,R,[P(side*5,-26),P(side*6,-13),P(side*7,0)],'blue',8); oval(H,R,...P(side*7+2,0),7,3.5,'blue',.9); }
  shape(H,R,[[-9,-53],[8,-53],[10,-24],[-10,-24]].map(p=>P(...p)),'teal',.72);
  shape(H,R,[[-6,-45],[5,-45],[8,-26],[-8,-26]].map(p=>P(...p)),'paper',.92);
  oval(H,R,...P(look*2,-63),12,13.5,'coral',.35); shape(H,R,[[-9,-62],[-8,-71],[3,-75],[10,-68],[9,-64],[-3,-68]].map(p=>P(...p)),'blue',.82); H.dot(...P(5,-63),1.5,'blue');
  for(const [side,target] of [[-1,left],[1,right]]) { const shoulder=P(side*8,-49), elbow=[mix(shoulder[0],target[0],.47)+side*5,mix(shoulder[1],target[1],.47)+8]; stroke(H,R,[shoulder,elbow,target],'blue',8); stroke(H,R,[shoulder,elbow,target],'teal',6); oval(H,R,...target,3.7,3.3,'coral',.36); }
}
const room=world('cape-town-botanical-lens','A leaf fills the circle',{wall:false,floor:'paper',tone:.6,head:35},(H,R)=>{
  masonry(H,R,'ne',0,12,0,4.3,'paper',.8);masonry(H,R,'nw',0,11.5,0,3.65,'teal',.28);
  windowBay(H,R,'ne',.6,10.7,.7,3.25,{divisions:7,ink:'teal',view:P=>{for(let n=0;n<16;n++){const u=.4+n*.65;stroke(H,R,[P(u,.15),P(u+.12,.85),P(u-.14,1.65)],'teal',1.7,.5);shape(H,R,[P(u+.04,.65),P(u-.32,1.03),P(u-.28,.53)],'teal',.3,.3);shape(H,R,[P(u,.96),P(u+.4,1.4),P(u+.31,.89)],'sun',.3,.3);}surface(H,R,[P(0,2),P(10.7,2),P(10.7,3.2),P(0,3.2)],'paper',.65,.1);}});
  bentTube(H,R,[[9.6,.25,1.9],[10.25,.6,1.75],[10.6,.3,2.25]],1.5,'sun');
  for(let n=0;n<12;n++){surface(H,R,H.tile(n,11.35,.96,.6,.02),n%3===0?'coral':'teal',.25,.4);H.line(R,[H.p(n+.2,11.65,.03),H.p(n+.5,11.4,.03),H.p(n+.8,11.65,.03)],'paper',.9);}
  wallRack(H,R,'nw',1.0,6.6,.45,2.7,4,'sun',(P,z,row)=>{for(let n=0;n<5;n++){const u=.35+n*1.22,p=P(u,z+.14);if(row===0){shape(H,R,[P(u,z+.05),P(u+.88,z+.05),P(u+.88,z+.44),P(u,z+.44)],'teal',.48,.5);H.line(R,[P(u+.3,z+.23),P(u+.58,z+.23)],'sun',1.7);}else if(row===2){shape(H,R,[P(u,z+.05),P(u+.9,z+.05),P(u+.9,z+.43),P(u,z+.43)],'paper',1,.5);specimenLeaf(H,R,p[0]+9,p[1]-2,.29,n===2);}else{oval(H,R,p[0],p[1],6,2.5,'coral',.3);shape(H,R,[[p[0]-5,p[1]],[p[0]+5,p[1]],[p[0]+5,p[1]-14],[p[0]-5,p[1]-14]],'paper',.86,.5);H.line(R,[[p[0]-6,p[1]-14],[p[0]+6,p[1]-14]],'teal',2);for(let k=0;k<3;k++)oval(H,R,p[0]-2+k*2,p[1]-4-k*2,1.4,2,'sun',.8);}}});
  recessedFrame(H,R,'nw',8.2,2.8,1.3,1.65,'coral',P=>{surface(H,R,[P(.15,.15),P(2.65,.15),P(2.65,1.5),P(.15,1.5)],'paper',1,.3);const p=P(1.3,.48);specimenLeaf(H,R,p[0],p[1],1.1,true);H.line(R,[P(.4,.3),P(.8,.3)],'sun',2);});
  benchFrame(H,R,2.8,3.7,6.9,3.1,1.35,'sun');surface(H,R,H.tile(2.95,3.85,6.6,2.8,1.36),'paper',1,.75);
  metal(H,R,4.2,5.1,3.75,.16,1.4,.065,'teal');metal(H,R,4.2,6.25,3.75,.16,1.4,.065,'teal');for(const i of [4.15,7.88])metal(H,R,i,5.08,.14,1.3,1.4,.16,'coral');
  surface(H,R,H.tile(3.08,4.07,1.85,1.0,1.39),'sun',.15);specimenLeaf(H,R,...H.p(3.75,4.7,1.42),.66,true);
  const bark=H.p(8.5,4.5,1.41);shape(H,R,[[bark[0]-15,bark[1]-4],[bark[0]+14,bark[1]-8],[bark[0]+16,bark[1]+8],[bark[0]-12,bark[1]+11]],'coral',.44);for(let n=0;n<7;n++)stroke(H,R,[[bark[0]-12+n*4,bark[1]+6],[bark[0]-13+n*4,bark[1]],[bark[0]-9+n*4,bark[1]-6]],'blue',.65,.6);
  const fragment=H.p(8.7,6.1,1.4);oval(H,R,...fragment,12,7,'teal',.2);shape(H,R,[[fragment[0]-4,fragment[1]+2],[fragment[0]-2,fragment[1]-4],[fragment[0]+7,fragment[1]],[fragment[0]+3,fragment[1]+4]],'sun',.6);
  timber(H,R,5.45,4.8,1.15,.82,1.39,.17,'blue');bentTube(H,R,[[6.0,5.2,1.6],[6.0,5.2,2.6],[6.0,5.85,2.6]],3.2,'teal');metal(H,R,5.65,4.65,.22,1.22,1.2,.19,'blue');
  for(const i of [6.3,6.55])H.line(R,[H.p(i,4.7,1.4),H.p(i,5.0,1.4)],'coral',1.8);
  benchFrame(H,R,6.7,6.75,1.35,1.2,.5,'coral');surface(H,R,H.tile(6.78,6.82,1.15,1.0,.52),'teal',.3);
  benchFrame(H,R,9.9,7.4,1.4,1.4,.58,'sun');const card=H.tile(10.0,7.5,1.2,.95,.6);surface(H,R,card,'paper',1);stroke(H,R,[H.p(10.2,8.1,.62),H.p(10.55,7.7,.62),H.p(10.85,7.95,.62)],'teal',1);H.line(R,[H.p(10.2,8.45,.63),H.p(11.1,8.35,.63)],'coral',2.5);
  box(H,R,3.05,4.1,1.2,1.5,.38,.15,'paper',1);for(let n=0;n<4;n++)H.line(R,[H.p(3.05,5.61,.42+n*.026),H.p(4.25,5.61,.42+n*.026)],'coral',.5);
  timber(H,R,2.4,9.4,4.6,1.3,.05,.14,'sun');surface(H,R,H.tile(2.52,9.53,4.35,1.0,.2),'paper',1);const p=H.p(3.2,10,.22);pod(H,R,...p,.4);specimenLeaf(H,R,...H.p(4.8,10,.22),.48);const seed=H.p(6.1,9.9,.22);shape(H,R,[[seed[0]-8,seed[1]+3],[seed[0]+11,seed[1]-7],[seed[0]+15,seed[1]+2],[seed[0],seed[1]+7]],'sun',.5);H.line(R,[[seed[0]-5,seed[1]+4],[seed[0]+11,seed[1]-3]],'coral',.7);
  taskLight(H,R,9.05,4.15,1.4,'coral',.6);
},(H,R,t)=>{
  const u=cycle(t,20)*20,slide=ease(4,8,u)*(1-ease(12,18,u)),i=4.48+slide*1.4;
  timber(H,R,i,5.28,1.95,.89,1.49,.08,'sun');const nest=H.p(i+.95,5.73,1.59);oval(H,R,...nest,24,12,'teal',.19);pod(H,R,nest[0],nest[1]-3,.77);
  const lens=H.p(6.0,5.85,2.6);H.tint(ell(lens[0]+3,lens[1]+49,27,9),'blue',.12);H.fill(ell(...lens,32,32),'paper',.16);H.clip(ell(...lens,28,28),()=>{if(slide>.05)H.opacity(slide,()=>pod(H,R,lens[0]+(1-slide)*28,lens[1]+4,1.35));});H.outline(R,ell(...lens,32,32),'blue',4.5);H.outline(R,ell(...lens,29,29),'sun',1.3);H.line(R,[[lens[0]-21,lens[1]-19],[lens[0]-16,lens[1]-25],[lens[0]-7,lens[1]-28]],'paper',2.6);for(const dx of [-33,33])oval(H,R,lens[0]+dx,lens[1],4,4,'coral',.8);
  const learner=H.p(7.12,7.32,.52),edge=H.p(i+1.55,6.14,1.58);observer(H,R,...learner,[edge[0]-8,edge[1]],[edge[0]+6,edge[1]+3],slide,.99);
  const educator=H.p(8.2,6.9,0),trace=H.p(i+1.5,5.5,1.9);trace[0]+=Math.sin((u-8)*2)*3*ease(8,9,u)*(1-ease(11,12,u));observer(H,R,...educator,[trace[0]-7,trace[1]+8],trace,slide,1.42);
});
room.loopSeconds=20;
room.stillTime=10;
export default room;
