import { world, shape, oval, stroke, box, ell, mix, cycle } from '../../worlds/common.js';
import { surface, timber, metal, vessel, benchFrame, bentTube, drape, cushion } from '../materials.js';
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
function specimenCabinet(H,R) {
  const i=.18,j=.8,d=1.27,w=6.65;
  surface(H,R,H.faceJ(i+.06,j,w,.2,3.34),'blue',.48);
  for(let bay=0;bay<3;bay++){
    const y=j+bay*2.2;
    for(const z of [.24,1.02,2.04,3.18])timber(H,R,i,y,d,2.17,z,.1,'sun');
    for(let row=0;row<2;row++){
      surface(H,R,H.faceJ(i+d+.014,y+.09,1.99,.4+row*.26,.61+row*.26),'teal',.55);
      H.line(R,[H.p(i+d+.03,y+.8,.5+row*.26),H.p(i+d+.03,y+1.27,.5+row*.26)],'sun',1.8);
    }
    if(bay===0){for(let n=0;n<3;n++){const q=H.p(i+.78,y+.4+n*.59,2.19);vessel(H,R,i+.78,y+.4+n*.59,2.15,6,18,n===1?'paper':'teal',false);oval(H,R,q[0],q[1]-6,3,3,'sun',.7);H.line(R,[[q[0]-6,q[1]-12],[q[0]+6,q[1]-12]],'coral',2);}}
    else if(bay===1){for(let n=0;n<2;n++){surface(H,R,H.faceJ(i+1.01,y+.16+n*.95,.78,2.17,2.89),'paper',1);specimenLeaf(H,R,...H.p(i+1.03,y+.52+n*.95,2.24),.41,n===1);}}
    else{for(let n=0;n<2;n++){const q=H.p(i+.85,y+.5+n*.9,2.17);pod(H,R,q[0],q[1]-4,.4);}}
    for(let n=0;n<4;n++){const y0=y+.16+n*.47;surface(H,R,H.faceJ(i+1.02,y0,.35,1.15,1.77+n%2*.15),n%2?'paper':'sun',n%2?1:.35);H.line(R,[H.p(i+1.04,y0+.05,1.22),H.p(i+1.04,y0+.3,1.22)],'coral',1.2);}
  }
  for(const y of [.8,3.0,5.2,7.36])timber(H,R,i,y,.3,.11,.18,3.17,'teal');
  timber(H,R,.12,.76,1.4,6.77,3.36,.15,'teal');
  const hoop=H.p(.84,6.65,3.51);H.outline(R,ell(hoop[0],hoop[1]-13,13,13),'sun',3);H.line(R,[[hoop[0]+9,hoop[1]-4],[hoop[0]+21,hoop[1]+8]],'coral',3);
  surface(H,R,H.tile(.35,1.17,.98,1.17,3.52),'paper',1);specimenLeaf(H,R,...H.p(.91,1.78,3.54),.42,true);
}
function tactileConsole(H,R) {
  benchFrame(H,R,2.22,9.16,4.7,1.87,.9,'teal');timber(H,R,2.4,9.32,4.3,1.5,.29,.11,'sun');
  for(let n=0;n<3;n++){surface(H,R,H.faceI(2.5+n*1.32,10.71,1.19,.44,.77),'sun',.47);H.line(R,[H.p(2.88+n*1.32,10.74,.61),H.p(3.24+n*1.32,10.74,.61)],'teal',2);}
  surface(H,R,H.tile(2.39,9.32,4.34,1.54,.92),'paper',1);
  for(let n=0;n<3;n++)timber(H,R,3.44+n*1.02,9.35,.055,1.43,.93,.055,'sun');
  pod(H,R,...H.p(2.98,10.08,.98),.44);specimenLeaf(H,R,...H.p(3.95,10.02,.98),.58,true);
  const bark=H.p(5.01,10.08,.98);shape(H,R,[[bark[0]-12,bark[1]-5],[bark[0]+11,bark[1]-9],[bark[0]+15,bark[1]+8],[bark[0]-10,bark[1]+12]],'coral',.45);for(let n=0;n<5;n++)stroke(H,R,[[bark[0]-8+n*4,bark[1]+7],[bark[0]-7+n*4,bark[1]-5]],'blue',.85);
  const wing=H.p(6.07,10.04,.98);shape(H,R,[[wing[0]-11,wing[1]+7],[wing[0]+13,wing[1]-8],[wing[0]+14,wing[1]+1],[wing[0]-3,wing[1]+9]],'sun',.56);H.line(R,[[wing[0]-8,wing[1]+6],[wing[0]+10,wing[1]-4]],'coral',.75);
  for(let n=0;n<4;n++)metal(H,R,2.53+n*1.04,9.32,.21,.12,.96,.04,'teal');
}
const room=world('cape-town-botanical-lens','A leaf fills the circle',{wall:false,floor:'paper',tone:.6,head:35},(H,R)=>{
  masonry(H,R,'ne',0,12,0,4.3,'paper',.8);masonry(H,R,'nw',0,11.5,0,3.65,'teal',.28);
  windowBay(H,R,'ne',.6,10.7,.7,3.25,{divisions:7,ink:'teal',view:P=>{for(let n=0;n<16;n++){const u=.4+n*.65;stroke(H,R,[P(u,.15),P(u+.12,.85),P(u-.14,1.65)],'teal',1.7,.5);shape(H,R,[P(u+.04,.65),P(u-.32,1.03),P(u-.28,.53)],'teal',.3,.3);shape(H,R,[P(u,.96),P(u+.4,1.4),P(u+.31,.89)],'sun',.3,.3);}surface(H,R,[P(0,2),P(10.7,2),P(10.7,3.2),P(0,3.2)],'paper',.65,.1);}});
  bentTube(H,R,[[9.6,.25,1.9],[10.25,.6,1.75],[10.6,.3,2.25]],1.5,'sun');
  for(let n=0;n<12;n++){surface(H,R,H.tile(n,11.35,.96,.6,.02),n%3===0?'coral':'teal',.25,.4);H.line(R,[H.p(n+.2,11.65,.03),H.p(n+.5,11.4,.03),H.p(n+.8,11.65,.03)],'paper',.9);}
  specimenCabinet(H,R);
  recessedFrame(H,R,'nw',8.2,2.8,1.3,1.65,'coral',P=>{surface(H,R,[P(.15,.15),P(2.65,.15),P(2.65,1.5),P(.15,1.5)],'paper',1,.3);const p=P(1.3,.48);specimenLeaf(H,R,p[0],p[1],1.1,true);H.line(R,[P(.4,.3),P(.8,.3)],'sun',2);});
  for(const i of [1.35,4.45,7.6,10.7]){timber(H,R,i,.12,.18,.47,4.0,.23,'teal');bentTube(H,R,[[i,.24,3.7],[i,.88,3.98]],1.7,'teal');}
  timber(H,R,1.58,.2,8.5,1.1,.69,.13,'sun');for(const x of [1.84,9.69])bentTube(H,R,[[x,.19,.39],[x,.93,.68]],2,'teal');
  surface(H,R,H.tile(2.15,.39,1.5,.65,.83),'paper',1);
  const clipping=H.p(2.82,.7,.87);specimenLeaf(H,R,...clipping,.46);stroke(H,R,[[clipping[0],clipping[1]+4],[clipping[0]+7,clipping[1]+10],[clipping[0]+17,clipping[1]+12]],'teal',1.3);
  surface(H,R,H.tile(4.62,.39,1.5,.65,.83),'paper',1);
  const opened=H.p(5.08,.7,.87);pod(H,R,opened[0],opened[1]-3,.42);
  for(let n=0;n<3;n++){const seed=H.p(5.61+n*.12,.64,.88);oval(H,R,...seed,2.3,1.6,'coral',.8);}
  H.line(R,[H.p(5.48,.82,.88),H.p(5.89,.82,.88)],'blue',.7);
  surface(H,R,H.tile(7.09,.39,1.5,.65,.83),'paper',1);
  const pressed=H.p(7.79,.7,.87);specimenLeaf(H,R,...pressed,.4,true);
  for(const dy of [-7,1])shape(H,R,[[pressed[0]-7,pressed[1]+dy],[pressed[0]+6,pressed[1]+dy+2],[pressed[0]+6,pressed[1]+dy+4],[pressed[0]-7,pressed[1]+dy+2]],'paper',1,.4);
  metal(H,R,8.23,.7,.25,.14,.85,.015,'coral');
  const mesh=[H.p(9.3,.36,1.17),H.p(10.9,.36,1.17),H.p(10.9,.36,2.68),H.p(9.3,.36,2.68)];surface(H,R,mesh,'paper',.3);H.outline(R,mesh,'sun',2.5);H.clip(mesh,()=>{for(let n=0;n<9;n++){H.line(R,[blend(mesh[0],mesh[1],n/8),blend(mesh[3],mesh[2],n/8)],'teal',.6);H.line(R,[blend(mesh[0],mesh[3],n/8),blend(mesh[1],mesh[2],n/8)],'teal',.6);}});
  benchFrame(H,R,2.8,3.7,6.9,3.1,1.35,'sun');surface(H,R,H.tile(2.95,3.85,6.6,2.8,1.36),'paper',1,.75);
  timber(H,R,2.98,3.88,6.51,2.64,.31,.12,'teal');
  for(let n=0;n<3;n++){box(H,R,3.16+n*1.95,4.0,1.67,1.76,.45,.42,n%2?'paper':'sun',n%2?1:.4);H.line(R,[H.p(3.66+n*1.95,5.79,.65),H.p(4.31+n*1.95,5.79,.65)],'teal',2);}
  for(const x of [2.94,9.35])bentTube(H,R,[[x,4.0,.44],[x,6.47,1.13]],1.7,'teal');
  metal(H,R,4.2,5.1,3.75,.16,1.4,.065,'teal');metal(H,R,4.2,6.25,3.75,.16,1.4,.065,'teal');for(const i of [4.15,7.88])metal(H,R,i,5.08,.14,1.3,1.4,.16,'coral');
  surface(H,R,H.tile(3.08,4.07,1.85,1.0,1.39),'sun',.15);specimenLeaf(H,R,...H.p(3.75,4.7,1.42),.66,true);
  const bark=H.p(8.5,4.5,1.41);shape(H,R,[[bark[0]-15,bark[1]-4],[bark[0]+14,bark[1]-8],[bark[0]+16,bark[1]+8],[bark[0]-12,bark[1]+11]],'coral',.44);for(let n=0;n<7;n++)stroke(H,R,[[bark[0]-12+n*4,bark[1]+6],[bark[0]-13+n*4,bark[1]],[bark[0]-9+n*4,bark[1]-6]],'blue',.65,.6);
  const fragment=H.p(8.7,6.1,1.4);oval(H,R,...fragment,12,7,'teal',.2);shape(H,R,[[fragment[0]-4,fragment[1]+2],[fragment[0]-2,fragment[1]-4],[fragment[0]+7,fragment[1]],[fragment[0]+3,fragment[1]+4]],'sun',.6);
  timber(H,R,5.45,4.8,1.15,.82,1.39,.17,'blue');bentTube(H,R,[[6.0,5.2,1.6],[6.0,5.2,2.6],[6.0,5.85,2.6]],3.2,'teal');metal(H,R,5.65,4.65,.22,1.22,1.2,.19,'blue');
  const pivot=H.p(6,5.2,2.2);oval(H,R,...pivot,6,5,'coral',.7);H.dot(...pivot,2,'sun');bentTube(H,R,[[5.75,4.76,1.59],[5.75,4.76,2.25],[6,5.2,2.25]],1.6,'blue');
  metal(H,R,5.4,4.72,.17,1.02,1.6,.08,'teal');for(let n=0;n<7;n++)H.line(R,[H.p(5.43,4.88,1.75+n*.11),H.p(5.68,4.88,1.75+n*.11)],'sun',.6);
  for(const i of [4.35,7.66])for(const j of [5.18,6.33])H.dot(...H.p(i,j,1.48),1.8,'sun');
  for(const i of [6.3,6.55])H.line(R,[H.p(i,4.7,1.4),H.p(i,5.0,1.4)],'coral',1.8);
  benchFrame(H,R,6.7,6.75,1.35,1.2,.5,'coral');surface(H,R,H.tile(6.78,6.82,1.15,1.0,.52),'teal',.3);
  drape(H,R,8.65,5.82,.78,.75,1.39,.56,'paper');
  const nest=H.p(9.13,4.58,1.41);oval(H,R,...nest,13,9,'coral',.4);oval(H,R,nest[0],nest[1]-1,9,5,'paper',1);H.line(R,[[nest[0]-10,nest[1]+2],[nest[0]-6,nest[1]+5]],'teal',.8);
  benchFrame(H,R,9.9,7.4,1.4,1.4,.58,'sun');const card=H.tile(10.0,7.5,1.2,.95,.6);surface(H,R,card,'paper',1);stroke(H,R,[H.p(10.2,8.1,.62),H.p(10.55,7.7,.62),H.p(10.85,7.95,.62)],'teal',1);H.line(R,[H.p(10.2,8.45,.63),H.p(11.1,8.35,.63)],'coral',2.5);
  box(H,R,3.05,4.1,1.2,1.5,.38,.15,'paper',1);for(let n=0;n<4;n++)H.line(R,[H.p(3.05,5.61,.42+n*.026),H.p(4.25,5.61,.42+n*.026)],'coral',.5);
  tactileConsole(H,R);
  vessel(H,R,11.15,8.53,.02,7,23,'teal',false);
  const pencil=H.p(10.44,8.01,.63);H.line(R,[[pencil[0]-11,pencil[1]-6],[pencil[0]+12,pencil[1]+7]],'sun',3);H.line(R,[[pencil[0]+12,pencil[1]+7],[pencil[0]+16,pencil[1]+9]],'blue',1.3);
  const stool=H.p(10.5,9.62,.02);for(const x of [10.08,10.82])for(const j of [9.3,10.0])bentTube(H,R,[[x,j,.02],[x,j,.59]],1.8,'teal');cushion(H,R,9.98,9.22,1.07,.9,.59,.13,'sun');

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
