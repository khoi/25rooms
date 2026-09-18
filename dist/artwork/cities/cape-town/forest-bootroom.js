import { world, shape, oval, stroke, box, ell, mix, cycle } from '../../worlds/common.js';
import { surface, timber, metal, vessel, benchFrame, bentTube } from '../materials.js';
import { masonry, boardFloor } from '../structure.js';
import { windowBay, wallRack, hangingRail, floorShadow } from '../joinery.js';
const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
const blend=(a,b,t)=>a.map((v,n)=>mix(v,b[n],t));
function boot(H,R,x,y,s=1){
  shape(H,R,[[-7,-20],[5,-20],[5,-9],[13,-4],[13,0],[-8,0]].map(([a,b])=>[x+a*s,y+b*s]),'coral',.58);stroke(H,R,[[x-8*s,y],[x+13*s,y]],'blue',3*s);for(let n=0;n<4;n++)H.line(R,[[x-4*s,y-16*s+n*3*s],[x+3*s,y-14*s+n*3*s]],'sun',1);stroke(H,R,[[x,y-8*s],[x+7*s,y-8*s],[x+5*s,y-3*s]],'paper',.8);H.dot(x+3*s,y-8*s,1.4*s,'blue');
}
function pack(H,R,x,y,s=1,ink='teal'){
  shape(H,R,[[-12,0],[-15,-29],[-10,-38],[9,-38],[15,-30],[12,0]].map(([a,b])=>[x+a*s,y+b*s]),ink,.64);shape(H,R,[[-9,-5],[-10,-18],[10,-18],[9,-5]].map(([a,b])=>[x+a*s,y+b*s]),ink,.44);for(const d of [-7,7])stroke(H,R,[[x+d*s,y-35*s],[x+d*s,y-9*s]],'paper',1.1);H.line(R,[[x-7*s,y-20*s],[x+8*s,y-20*s]],'blue',1.3);shape(H,R,[[x-5*s,y-10*s],[x,y-15*s],[x+6*s,y-10*s]],'sun',.8,.4);stroke(H,R,[[x-4*s,y-39*s],[x-3*s,y-43*s],[x+4*s,y-43*s],[x+5*s,y-39*s]],'blue',1.4);
}
function walker(H,R,x,y,hand,foot,brush,lean){
  H.tint(ell(x+6,y+3,23,6),'blue',.16);
  stroke(H,R,[[x-8,y-35],[x-10,y-17],[x-11,y]],'blue',8);boot(H,R,x-12,y,1.08);
  stroke(H,R,[[x+8,y-35],[x+23,y-26],foot],'blue',8);boot(H,R,...foot,1.08);
  shape(H,R,[[x-13+lean*15,y-79+lean*40],[x+10+lean*18,y-79+lean*40],[x+14,y-34],[x-13,y-34]],'teal',.7);H.line(R,[[x+lean*16,y-73+lean*40],[x,y-36]],'paper',1);
  oval(H,R,x+lean*18,y-94+lean*40,12,13,'coral',.35);shape(H,R,[[x-14+lean*18,y-96+lean*40],[x-10+lean*18,y-108+lean*40],[x+6+lean*18,y-109+lean*40],[x+13+lean*18,y-99+lean*40]],'coral',.7);H.line(R,[[x-17+lean*18,y-96+lean*40],[x+18+lean*18,y-96+lean*40]],'blue',1.2);H.dot(x+6+lean*18,y-92+lean*40,1.4,'blue');
  for(const [s,target]of[[-1,hand],[1,brush]]){const sh=[x+s*11+lean*16,y-73+lean*40],el=[mix(sh[0],target[0],.4)+s*8,mix(sh[1],target[1],.4)+10];stroke(H,R,[sh,el,target],'blue',8);stroke(H,R,[sh,el,target],'teal',6);oval(H,R,...target,3.8,3.3,'coral',.35);}
}
function companion(H,R,x,y,left,right,look) {
  const s=1.5,P=(a,b)=>[x+a*s,y+b*s];
  H.tint(ell(x+2,y+2,20,6),'blue',.18);
  for(const side of [-1,1]) { stroke(H,R,[P(side*5,-26),P(side*6,-13),P(side*7,0)],'blue',8); oval(H,R,...P(side*7+2,0),7,3.5,'blue',.9); }
  shape(H,R,[[-9,-53],[8,-53],[10,-24],[-10,-24]].map(p=>P(...p)),'teal',.72);
  shape(H,R,[[-6,-45],[5,-45],[8,-26],[-8,-26]].map(p=>P(...p)),'paper',.92);
  oval(H,R,...P(look*2,-63),12,13.5,'coral',.35); shape(H,R,[[-9,-62],[-8,-71],[3,-75],[10,-68],[9,-64],[-3,-68]].map(p=>P(...p)),'blue',.82); H.dot(...P(5,-63),1.5,'blue');
  for(const [side,target] of [[-1,left],[1,right]]) { const shoulder=P(side*8,-49), elbow=[mix(shoulder[0],target[0],.47)+side*5,mix(shoulder[1],target[1],.47)+8]; stroke(H,R,[shoulder,elbow,target],'blue',8); stroke(H,R,[shoulder,elbow,target],'teal',6); oval(H,R,...target,3.7,3.3,'coral',.36); }
}
const room=world('cape-town-forest-bootroom','The mud stops at the step',{wall:false,floor:'teal',tone:.22,head:30},(H,R)=>{
  masonry(H,R,'nw',0,12,0,3.65,'paper',.8);masonry(H,R,'ne',0,12,0,3.85,'teal',.28);
  box(H,R,0,0,12,6.4,0,.22,'sun',.4);boardFloor(H,R,.2,.2,11.6,6.1,.235,'sun',.55);
  for(let i=0;i<12;i++)for(let j=7;j<12;j++){surface(H,R,H.tile(i+.025,j+.025,.95,.95,.018),(i+j)%4===0?'coral':'paper',(i+j)%4===0?.3:.85,.45);}
  windowBay(H,R,'nw',2.0,5.3,1.45,1.85,{divisions:3,ink:'sun',view:P=>{for(let n=0;n<9;n++){const u=.3+n*.55;stroke(H,R,[P(u,.1),P(u+.17,.9),P(u,1.8)],'teal',4,.55);stroke(H,R,[P(u+.1,.9),P(u-.25,1.35)],'teal',1.4,.7);}}});
  for(let n=0;n<5;n++){const i=.4+n*2.6;timber(H,R,i,.2,.13,2.0,3.95,.16,'sun');bentTube(H,R,[[i,.2,3.95],[i,.2,3.4],[i,.75,3.92]],2,'blue');}
  bentTube(H,R,[[.25,.2,4.12],[11.75,.2,4.12],[11.75,.2,2.2]],2.8,'teal');
  benchFrame(H,R,1.0,3.5,6.1,1.8,.88,'sun');for(let n=0;n<3;n++){box(H,R,1.3+n*1.8,3.8,1.5,1.1,.3,.45,'teal',.43);for(let k=0;k<4;k++)H.line(R,[H.p(1.5+n*1.8+k*.25,4.91,.45),H.p(1.5+n*1.8+k*.25,4.91,.66)],'blue',.8);}
  surface(H,R,H.tile(1.3,3.65,1.7,1.45,.9),'coral',.34);for(let n=0;n<4;n++)H.line(R,[H.p(1.5+n*.32,3.8,.92),H.p(1.5+n*.32,4.9,.92)],'paper',1.2);
  box(H,R,3.4,3.6,1.4,1.15,.91,.15,'paper',1);const map=H.tile(3.5,3.7,1.2,.9,1.07);surface(H,R,map,'paper',1);stroke(H,R,[H.p(3.55,4.45,1.09),H.p(3.9,3.9,1.09),H.p(4.3,4.15,1.09),H.p(4.6,3.83,1.09)],'teal',1);for(let n=0;n<3;n++)H.line(R,[H.p(3.6+n*.3,3.75,1.09),H.p(3.6+n*.3,4.55,1.09)],'coral',.55);
  vessel(H,R,5.3,4.2,.9,6,23,'teal',false);oval(H,R,...H.p(6.0,4.2,.95),11,7,'coral',.6);
  wallRack(H,R,'ne',7.4,4.25,.7,2.9,3,'sun',(P,z,row)=>{if(row===0){for(let n=0;n<3;n++){const p=P(.65+n*1.2,z+.13);boot(H,R,p[0],p[1],.66);}}else if(row===1){for(let n=0;n<3;n++){const p=P(.7+n*1.15,z+.15);pack(H,R,p[0],p[1],.56,n===1?'coral':'teal');}}else{for(let n=0;n<4;n++)shape(H,R,[P(.3+n*.9,z+.08),P(1+n*.9,z+.08),P(1+n*.9,z+.42),P(.3+n*.9,z+.42)],n%2?'paper':'coral',.6,.5);}});
  for(const i of [7.6,11.55])timber(H,R,i,.35,.12,.3,.18,3.65,'teal');
  hangingRail(H,R,'ne',1.05,5.3,3.15,4,(P,u,n)=>{if(n<2){shape(H,R,[P(u-.25,-.18),P(u-.5,-.55),P(u-.27,-.68),P(u-.22,-1.25),P(u+.3,-1.25),P(u+.32,-.64),P(u+.52,-.55),P(u+.26,-.18)],n?'coral':'sun',.45,.7);H.line(R,[P(u,-.23),P(u,-1.19)],'blue',.65);}else{const p=P(u,-.32);pack(H,R,p[0],p[1]+27,.65,n===2?'teal':'coral');}});
  for(let k=0;k<3;k++){timber(H,R,3.4,6.1+k*.43,4.8,.5,.0,.31-k*.09,'sun');}
  metal(H,R,3.3,7.43,5.1,.95,0,.08,'blue');surface(H,R,H.tile(3.42,7.52,4.85,.72,.09),'teal',.2);for(let n=0;n<25;n++)H.line(R,[H.p(3.46+n*.192,7.5,.1),H.p(3.46+n*.192,8.22,.1)],'paper',1);
  box(H,R,5.9,6.88,1.9,.48,.2,.19,'teal',.42);for(const i of [6.02,7.45]){metal(H,R,i,6.85,.15,.6,.2,.14,'blue');H.dot(...H.p(i+.05,7.2,.35),1.4,'sun');}H.line(R,[H.p(6.08,7.12,.49),H.p(7.48,7.12,.49)],'blue',4);H.line(R,[H.p(6.08,7.12,.5),H.p(7.48,7.12,.5)],'paper',.9);
  for(const p of [[4.4,6.2],[4.4,8.2]]){metal(H,R,p[0]-.07,p[1]-.07,.2,.2,0,.1,'blue');bentTube(H,R,[[...p,.1],[...p,1.8]],2.8,'teal');}bentTube(H,R,[[4.4,6.2,1.8],[4.4,8.2,1.8]],3.3,'teal');
  metal(H,R,6.65,7.0,.75,.6,.15,.14,'blue');surface(H,R,H.tile(6.73,7.07,.57,.44,.3),'sun',.4);
  const leaf=H.p(4.6,7.9,.075);shape(H,R,[[leaf[0]-6,leaf[1]],[leaf[0]+1,leaf[1]-5],[leaf[0]+8,leaf[1]+1],[leaf[0],leaf[1]+3]],'sun',.65,.5);
  const mat=H.tile(.7,9.05,2.5,1.65,.035);surface(H,R,mat,'sun',.4);for(let n=0;n<12;n++)H.line(R,[H.p(.8+n*.18,9.1,.04),H.p(.8+n*.18,10.6,.04)],'coral',.8);boot(H,R,...H.p(1.2,9.8,.08),.7);const sole=H.p(2.5,9.8,.08);oval(H,R,...sole,8,13,'blue',.8);oval(H,R,sole[0],sole[1]-2,4,5,'paper',1);for(let n=0;n<3;n++)H.line(R,[[sole[0]-5,sole[1]+4+n*3],[sole[0]+5,sole[1]+4+n*3]],'sun',1);
  bentTube(H,R,[[.8,6.0,.24],[.65,6.0,2.9]],2,'blue');const grip=H.p(.68,6,2.7);H.line(R,[[grip[0],grip[1]],[grip[0],grip[1]+14]],'coral',5);for(let n=0;n<4;n++)H.line(R,[[grip[0]-3,grip[1]+n*3],[grip[0]+3,grip[1]+n*3]],'sun',.8);
},(H,R,t)=>{
  const u=cycle(t,18)*18,lift=ease(.6,3.6,u)*(1-ease(13.2,16,u)),clean=ease(7.2,8.1,u)*(1-ease(10.8,12.3,u));
  const root=H.p(5.5,7.2,0),rest=[root[0]+12,root[1]],step=H.p(6.35,7.12,.49),scrape=u>3.6&&u<7.2?Math.sin((u-3.6)/3.6*Math.PI*2)*5:0,foot=blend(rest,[step[0]+scrape,step[1]],lift),rail=H.p(4.4,7.5,1.8);
  const socket=H.p(7.0,7.3,.35),brushed=[foot[0]+7,foot[1]+7+Math.sin(u*5)*clean*2],brush=blend(socket,brushed,clean);
  const take=ease(6.8,7.2,u)*(1-ease(12.3,13.2,u)),hand=blend([root[0]+15,root[1]-56],brush,take);walker(H,R,...root,rail,foot,hand,clean);
  shape(H,R,[[brush[0]-7,brush[1]-4],[brush[0]+7,brush[1]-4],[brush[0]+7,brush[1]+2],[brush[0]-7,brush[1]+2]],'sun',.7);for(let n=0;n<7;n++)H.line(R,[[brush[0]-6+n*2,brush[1]+2],[brush[0]-6+n*2,brush[1]+5]],'blue',.9);
  const person=H.p(9.5,5.4,0),bag=[person[0]-18,person[1]-32];companion(H,R,...person,[bag[0]-5,bag[1]-39],[bag[0]+7,bag[1]-39],.2);pack(H,R,...bag,.85);
});
room.loopSeconds=18;
room.stillTime=6.7;
export default room;
