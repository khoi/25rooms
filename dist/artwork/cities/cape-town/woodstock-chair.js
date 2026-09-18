import { world, shape, stroke, oval, ell, loop, box, mix } from '../../worlds/common.js';
import { timber, metal, benchFrame, cushion, drape, bentTube, vessel, caneChair, floorLight } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { wallRack, floorShadow, taskLight, windowBay } from '../joinery.js';
import { person } from './surf-store.js';
const ease=x=>{const u=Math.max(0,Math.min(1,x));return u*u*(3-2*u);};
function frame(H,R,i,j,w=1.9,d=2.05,z=0,scale=1){
  for(const x of [i+.12,i+w-.26])for(const y of [j+.17,j+d-.28])bentTube(H,R,[[x-.08,y+.06,z+.03],[x,y,z+.95],[x+.03,y,z+1.24]],3*scale,'sun');
  for(const y of [j+.13,j+d-.28])timber(H,R,i+.03,y,w-.02,.2,z+.94,.24,'sun');
  for(const x of [i+.03,i+w-.19])timber(H,R,x,j+.1,.2,d-.14,z+.94,.24,'sun');
  for(let k=0;k<4;k++)shape(H,R,H.tile(i+.22+k*(w-.35)/4,j+.18,.18,d-.4,z+1.18),'teal',.62,.45);
  for(let k=0;k<5;k++)shape(H,R,H.tile(i+.22,j+.28+k*(d-.48)/5,w-.43,.14,z+1.19),'paper',.85,.45);
  for(const x of [i+.15,i+w-.27])for(const y of [j+.21,j+d-.4])shape(H,R,[H.p(x,y,z+.96),H.p(x+.27,y,z+.96),H.p(x,y+.29,z+.96)],'coral',.48,.5);
  for(const x of [i+.1,i+w-.2])bentTube(H,R,[[x,j+.2,z+1.1],[x,j+.07,z+2.2],[x+.07,j+.12,z+2.85]],3,'sun');
  shape(H,R,[H.p(i+.1,j+.09,z+1.7),H.p(i+w-.13,j+.09,z+1.7),H.p(i+w-.15,j+.1,z+2.72),H.p(i+.3,j+.1,z+2.84)],'teal',.43,.8);
  for(let k=0;k<4;k++)stroke(H,R,[H.p(i+.3+k*.36,j+.1,z+1.78),H.p(i+.33+k*.34,j+.1,z+2.68)],'paper',1);
  for(const x of [i+.08,i+w-.18])bentTube(H,R,[[x,j+d-.22,z+1.13],[x,j+d-.24,z+1.72],[x,j+.15,z+1.8]],3,'sun');
}
const room=world('cape-town-woodstock-chair','A chair keeps its shape',{wall:false,floor:'paper',tone:.3,head:44},(H,R)=>{
  masonry(H,R,'ne',0,12,0,4.15,'paper',.8);masonry(H,R,'nw',0,9.65,0,2.8,'teal',.28);
  windowBay(H,R,'ne',1.15,5.1,1.45,2.3,{ink:'teal',divisions:3,view:P=>{shape(H,R,[P(.12,.12),P(4.96,.12),P(4.96,.8),P(3.8,1.23),P(2.8,.75),P(1.6,1.2),P(.12,.8)],'teal',.2,.3);}});
  for(const i of [.25,6.8]){timber(H,R,i,.18,.23,.3,.02,4.42,'sun');bentTube(H,R,[[i+.12,.4,3.62],[i+.12,2.15,4.14]],2.5,'sun');}
  timber(H,R,.18,.25,7.2,.2,4.4,.19,'sun');
  shape(H,R,[H.p(.18,.26,4.61),H.p(7.4,.26,4.61),H.p(7.4,1.54,4.26),H.p(.18,1.54,4.26)],'paper',.8,.8);
  metal(H,R,.13,1.52,7.4,.14,4.2,.14,'teal');bentTube(H,R,[[.21,1.6,4.24],[.21,1.6,.24],[.5,1.72,.1]],2.8,'teal');
  for(let i=.5;i<11.5;i+=1.9)for(let j=.5;j<11.5;j+=1.25){H.outline(R,H.tile(i,j,Math.min(1.83,11.9-i),Math.min(1.19,11.9-j),.035),'blue',.55,{tone:.25});}
  floorLight(H,5.2,4.8,150,.6);
  cabinetFrame(H,R,8.23,.38,3.35,1.6,.14,4.02,3,'teal',(x,j,w,d,z,h,n)=>{
    if(n===0){timber(H,R,x,j,w,d,z+1.25,.09,'sun');timber(H,R,x,j,w,d,z+2.45,.09,'sun');for(let k=0;k<3;k++){vessel(H,R,x+.22+k*.26,j+.5,z+1.34,4.7,31,['paper','coral','teal'][k],false);vessel(H,R,x+.23+k*.27,j+.5,z+2.54,4.3,22,['sun','paper','teal'][k],false);}drape(H,R,x,j,w,.8,z+.4,.3,'paper');}
    else if(n===1){for(let k=0;k<3;k++){const p=H.p(x+.22+k*.23,j+.42,z+.3);shape(H,R,loop([[p[0]-7,p[1]],[p[0]+8,p[1]],[p[0]+12,p[1]-48],[p[0]+2,p[1]-58],[p[0]-10,p[1]-40]],2),'sun',.35,.7);}timber(H,R,x,j,w,d,z+2.9,.08,'sun');cushion(H,R,x,j,w,.8,z+3,.17,'paper');}
    else{for(const zz of [.6,1.1,1.6,2.8])timber(H,R,x,j,w,d,z+zz,.08,'sun');for(let k=0;k<3;k++){box(H,R,x+.04,j,w-.08,.83,z+.19+k*.51,.33,k===2?'coral':'teal',.45);H.line(R,[H.p(x+.3,j+.84,z+.35+k*.51),H.p(x+.6,j+.84,z+.35+k*.51)],'sun',1.5);}drape(H,R,x,j,w,.8,z+2.92,.3,'coral');}
  });
  wallRack(H,R,'nw',1.25,5.55,1.8,1.2,1,'sun',(P,b)=>{
    for(let k=0;k<3;k++){const u=.3+k*1.7;shape(H,R,[P(u,.18),P(u+1.3,.18),P(u+1.3,.96),P(u,.96)],'paper',1,.6);stroke(H,R,[P(u+.25,.3),P(u+.35,.7),P(u+.75,.7),P(u+.96,.3)],'teal',1.3);stroke(H,R,[P(u+.38,.68),P(u+.35,.87),P(u+.74,.87)],'coral',1.1);}
  });
  benchFrame(H,R,2.33,4.3,3.1,1.72,1.3,'sun');cushion(H,R,2.39,4.34,2.98,1.63,1.31,.09,'paper');
  shape(H,R,H.tile(3.66,4.48,1.53,1.32,1.42),'teal',.14,.6);
  box(H,R,2.57,4.53,.6,.52,1.43,.21,'blue',.68);metal(H,R,2.64,4.6,.45,.05,1.65,.03,'paper');
  drape(H,R,2.5,5.4,.78,.45,1.43,.5,'coral');
  for(let k=0;k<3;k++)cushion(H,R,2.65,4.46,.38,.38,1.44+k*.13,.12,k===1?'sun':'paper');
  floorShadow(H,5.58,4.17,2.1,2.2,.24);frame(H,R,5.6,4.05);
  for(const z of [1.0,1.08,1.16])H.line(R,[H.p(5.77,6.02,z),H.p(6.15,6.02,z)],'coral',.8);
  for(let k=0;k<3;k++)H.line(R,[H.p(5.84+k*.08,6.04,1.01),H.p(5.92+k*.08,6.04,1.2)],'blue',.6);
  benchFrame(H,R,.78,8.2,3.9,1.1,.73,'teal');
  for(let k=0;k<3;k++){cushion(H,R,1.02+k*.63,8.38,.53,.56,.75,.1+k*.06,k===2?'coral':'paper');}
  timber(H,R,3.12,8.31,1.15,.1,.77,.13,'sun');timber(H,R,3.12,8.31,.12,.72,.77,.13,'sun');timber(H,R,4.16,8.31,.12,.72,.77,.13,'sun');timber(H,R,3.12,8.91,1.15,.1,.77,.13,'sun');
  for(let k=0;k<4;k++)shape(H,R,H.tile(3.3+k*.22,8.37,.11,.49,.9),'teal',.58,.4);
  const loose=H.p(3.85,9.3,.78);stroke(H,R,[[loose[0]-10,loose[1]],[loose[0],loose[1]+4],[loose[0]+13,loose[1]-1]],'teal',3);
  caneChair(H,R,9.2,6.4,'coral');cushion(H,R,9.2,6.48,.87,.64,.68,.1,'paper');
  benchFrame(H,R,9.12,8.33,1.35,1,.47,'sun');box(H,R,9.18,8.4,1.15,.74,.49,.1,'paper',1);for(let k=0;k<4;k++)shape(H,R,H.tile(9.23+k*.18,8.49,.16,.56,.61),['coral','teal','sun','paper'][k],.65,.4);
  vessel(H,R,10.9,7.5,.03,8,22,'teal');
  timber(H,R,.4,7.2,.45,1.8,1.21,.12,'sun');
  frame(H,R,.6,7.4,.58,.6,1.34,.6);
  taskLight(H,R,2.47,4.4,1.43,'teal',.6);
  metal(H,R,.75,10.55,3.8,.33,.025,.065,'blue');for(let i=.86;i<4.4;i+=.17)H.line(R,[H.p(i,10.57,.1),H.p(i,10.85,.1)],'paper',.7);
},(H,R,t)=>{
  const s=((t%16)+16)%16,u=s<6.4?ease(s/6.4):s<9.6?1:s<14?1-ease((s-9.6)/4.4):0,c=s>6.4&&s<9.6?Math.sin((s-6.4)/3.2*Math.PI)*.14:0;
  const i=mix(3.7,5.82,u),j=mix(4.6,4.38,u),z=mix(1.43,1.2,u)+Math.sin(Math.PI*u)*.55;
  const a=H.p(i+.28,j+1.18,z+.27-c),b=H.p(i+1.3,j+1.18,z+.27-c);
  person(H,R,4.9+u*1.7,6.05,a,b,'teal',3,Math.sin(u*Math.PI*4)*4);
  cushion(H,R,i,j,1.45,1.4,z,.29-c,'paper');
  stroke(H,R,[H.p(i+.07,j+1.42,z+.1),H.p(i+1.35,j+1.42,z+.1)],'coral',1.2);
  for(let k=0;k<4;k++)H.line(R,[H.p(i+.4+k*.12,j+1.43,z+.06),H.p(i+.43+k*.12,j+1.43,z+.16)],'teal',.6);
  person(H,R,8.4,6.75,H.p(8.04,6.5,1.11),null,'coral',-u*3);
});
room.loopSeconds=16;
room.stillTime=7.8;
export default room;
