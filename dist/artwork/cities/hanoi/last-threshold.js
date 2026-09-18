import { world, shape, oval, stroke, actor, cycle, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, bentTube, drape, cushion, vessel, floorLight, branchSpray } from '../materials.js';
import { masonry, cabinetFrame, archedBay } from '../structure.js';
import { recessedFrame, wallRack, panelFront } from '../joinery.js';

const base=FIGURES.clips.idle.keys[0][1];
const seatPose={...base,drop:.47,ll:84,lr:100,kl:-84,kr:-123,lean:-6,head:16,al:24,ar:32,el:35,er:40};
FIGURES.clips.hanoiThresholdShoe={dur:16,keys:[[0,seatPose],[1,seatPose]]};
const ease=x=>{const a=Math.max(0,Math.min(1,x));return a*a*(3-2*a)};
FIGURES.clips.hanoiThresholdWelcome={dur:16,keys:[[0,{...base,lean:2,head:8,ar:40,er:40}],[.3,{...base,lean:2,head:8,ar:40,er:40}],[.5,{...base,lean:12,head:-5,ar:50,er:34}],[.65,{...base,lean:12,head:-5,ar:50,er:34}],[.875,{...base,lean:2,head:8,ar:40,er:40}],[1,{...base,lean:2,head:8,ar:40,er:40}]]};
function slipper(H,R,i,j,z,size=1,ink='sun'){
 const [x,y]=H.p(i,j,z);
 shape(H,R,[[x-11*size,y],[x-7*size,y-4*size],[x+4*size,y-4*size],[x+12*size,y],[x+10*size,y+4*size],[x-8*size,y+4*size]],ink,.64,.7);
 shape(H,R,[[x-3*size,y+2*size],[x-2*size,y-5*size],[x+5*size,y-6*size],[x+8*size,y+2*size]],'paper',.87,.6);
 H.line(R,[[x-8*size,y+3*size],[x+9*size,y+3*size]],'blue',.65);
}
function helmet(H,R,i,j,z,ink='coral',s=1){
 const [x,y]=H.p(i,j,z);
 shape(H,R,[[x-15*s,y+3*s],[x-15*s,y-7*s],[x-11*s,y-17*s],[x,y-21*s],[x+12*s,y-15*s],[x+16*s,y+2*s]],ink,.7);
 oval(H,R,x,y+3*s,15*s,5*s,'blue',.72);
 H.line(R,[[x-12*s,y-4*s],[x+12*s,y-4*s]],'paper',1.6);
 stroke(H,R,[[x-10*s,y+4*s],[x-4*s,y+14*s],[x+7*s,y+8*s]],'blue',1.1);
}
const room=world('hanoi-last-threshold','A light left for someone',{wall:false,floor:'blue',tone:.45,head:55},(H,R)=>{
 masonry(H,R,'nw',0,11.75,0,3.85,'blue',.55);
 masonry(H,R,'ne',0,11.75,0,3.85,'teal',.3);
 for(const side of ['nw','ne']){
  const P=(u,z)=>side==='nw'?H.p(.13,u,z):H.p(u,.13,z);
  H.line(R,[P(.05,3.6),P(11.6,3.6)],'blue',3.4);
  H.line(R,[P(.05,3.68),P(11.6,3.68)],'sun',1.2);
  for(let u=.3;u<11.4;u+=1.36)shape(H,R,[P(u,.08),P(u+1.12,.08),P(u+1.12,.4),P(u,.4)],'teal',.3,.6);
 }
 for(let i=.1;i<11.8;i+=2.35)for(let j=.1;j<11.8;j+=1.85){
  const x=i+(Math.floor(j/1.85)%2)*.3;
  shape(H,R,H.tile(x,j,Math.min(2.28,11.85-x),Math.min(1.78,11.85-j),.024),'paper',.18,.55);
  H.line(R,[H.p(x+.1,j+1.67,.032),H.p(x+.9,j+1.72,.032)],'sun',.6,{tone:.35});
 }
 archedBay(H,R,'nw',7.65,3.25,.08,3.35,'sun',P=>{
  shape(H,R,[P(.1,.1),P(3.1,.1),P(3.1,3.3),P(.1,3.3)],'blue',.91);
  shape(H,R,[P(.65,.12),P(2.9,.12),P(2.9,3.1),P(.65,3.1)],'sun',.12);
  for(const u of [.68,2.85])H.line(R,[P(u,.11),P(u,3.12)],'teal',3);
  for(const z of [.24,1.33,2.3])H.line(R,[P(.7,z),P(2.86,z)],'teal',1.8);
  shape(H,R,[P(.78,2.34),P(2.76,2.34),P(2.76,2.97),P(.78,2.97)],'paper',.5);
 });
 for(const j of [7.39,10.98]){
  timber(H,R,.06,j,.45,.22,.03,3.41,'sun');
  metal(H,R,.06,j-.06,.56,.34,.03,.21,'paper');
  metal(H,R,.06,j-.06,.56,.34,3.28,.14,'teal');
 }
 for(let n=0;n<13;n++){
  const a=n*Math.PI/12,u=9.27+Math.cos(a)*1.93,z=3.16+Math.sin(a)*.6;
  H.line(R,[H.p(.14,u,z),H.p(.14,9.27+Math.cos(a)*1.73,3.12+Math.sin(a)*.49)],'paper',2.8);
 }
 timber(H,R,.05,7.6,.68,3.38,.015,.12,'sun');
 for(const j of [7.72,10.87])timber(H,R,.3,j,.45,.16,.13,3.25,'teal');
 const latch=H.p(.5,8.1,1.13);
 shape(H,R,[[latch[0]-3,latch[1]-12],[latch[0]+3,latch[1]-12],[latch[0]+3,latch[1]+11],[latch[0]-3,latch[1]+11]],'sun',.8);
 H.line(R,[[latch[0],latch[1]],[latch[0]+9,latch[1]+2]],'paper',2);
 for(let n=0;n<6;n++)oval(H,R,...H.p(.51+n*.025,8.13+n*.055,1.65-Math.sin(n/5*Math.PI)*.1),2,1.2,'sun',.75);
 timber(H,R,5.7,.25,.33,3.52,.035,.15,'teal');
 timber(H,R,5.7,6.08,.33,2.76,.035,.15,'teal');
 masonry(H,R,'nw',.3,6.35,0,.45,'paper',.3);
 shape(H,R,H.tile(6.08,.3,5.28,5.62,.055),'teal',.19);
 for(let n=0;n<10;n++)H.line(R,[H.p(6.19,.5+n*.51,.061),H.p(11.25,.5+n*.51,.061)],'paper',.65,{tone:.38});
 H.line(R,[H.p(5.94,3.77,.185),H.p(5.94,6.08,.185)],'sun',1.5);
 floorLight(H,2.2,8.7,143,.74);
 H.tint(H.tile(.8,6.95,4.85,3.67,.04),'sun',.12);
 const lamp=H.p(.38,8.72,3.06);
 bentTube(H,R,[[.1,8.72,3.1],[.47,8.72,3.1]],2,'blue');
 shape(H,R,[[lamp[0]-5,lamp[1]-11],[lamp[0]+5,lamp[1]-11],[lamp[0]+17,lamp[1]+5],[lamp[0]-17,lamp[1]+5]],'sun',.7);
 oval(H,R,lamp[0],lamp[1]+5,17,5,'paper',1);H.glow(lamp[0],lamp[1]+29,58,54,'sun',.5);
 H.line(R,[H.p(.12,8.72,3.28),H.p(.12,8.72,3.6),H.p(.12,5.15,3.6)],'blue',1.2);
 const door=H.p(.44,8.75,2.54);
 shape(H,R,[[door[0]-4,door[1]-5],[door[0]+4,door[1]-5],[door[0]+4,door[1]+5],[door[0]-4,door[1]+5]],'paper',.85);
 H.dot(door[0],door[1],1.6,'sun');
 H.line(R,[H.p(.48,8.2,.31),H.p(.48,10.67,.31)],'sun',1.7);
 for(let n=0;n<7;n++)timber(H,R,1.58+n*.54,7.3,.34,1.37,.2,.08,'teal');
 for(const i of [1.57,3.35,5.15])for(const j of [7.34,8.48]){
  timber(H,R,i,j,.16,.16,.06,.58,'sun');
  if(i===5.15)metal(H,R,i-.035,j-.035,.23,.23,.13,.14,'teal');
 }
 for(const z of [.21,.65])for(let n=0;n<5;n++)timber(H,R,1.49,7.24+n*.31,3.94,.25,z,.075,'sun');
 for(const i of [1.57,5.15])timber(H,R,i,7.28,.15,1.44,.42,.11,'teal');
 timber(H,R,1.48,7.19,3.94,.12,.68,.18,'sun');
 for(const i of [1.71,4.86])metal(H,R,i,7.24,.32,.18,.72,.05,'teal');
 H.line(R,[H.p(1.64,8.78,.68),H.p(3,8.78,.68)],'paper',1.2);
 for(const j of [7.62,8.31])slipper(H,R,4.46,j,.3,.62,'sun');
 for(const i of [1.7,5.13])H.line(R,[H.p(i,7.43,.56),H.p(i,8.55,.56)],'blue',1.2);
 H.line(R,[H.p(1.58,7.36,.69),H.p(5.32,7.36,.69)],'blue',1.3);
 for(const i of [2.1,4.4])metal(H,R,i,7.28,.34,.21,.69,.04,'teal');
 slipper(H,R,2.01,8.22,.3,.75,'blue');slipper(H,R,2.6,8.3,.3,.75,'blue');slipper(H,R,4.7,8.28,.3,.42,'coral');
 timber(H,R,2.8,8.09,.98,.8,.04,.56,'sun');
 H.line(R,[H.p(2.89,8.24,.61),H.p(3.65,8.24,.61)],'paper',1.1);
 cabinetFrame(H,R,7.22,.47,3.96,1.8,.08,3.4,3,'teal',(i,j,w,d,z,h,n)=>{
  for(let row=0;row<3;row++){
   const zz=z+row*1.02;timber(H,R,i,j,w,d,zz,.12,'sun');
   if(row===0){if(n===0)slipper(H,R,i+.52,j+.96,zz+.14,.47,'coral');else panelFront(H,R,i+.04,j+d,w-.08,zz+.2,.68,1,'teal');}
   else if(row===1){if(n===1)helmet(H,R,i+.52,j+.78,zz+.2,'coral',.75);else for(let k=0;k<3;k++)drape(H,R,i+.11,j+.2,w-.24,.89,zz+.17+k*.16,.09,k%2?'paper':'teal');}
   else {if(n===2){shape(H,R,H.faceI(i+.12,j+.8,w-.25,zz+.15,zz+.86),'paper',.6);H.line(R,[H.p(i+.23,j+.82,zz+.2),H.p(i+.64,j+.82,zz+.8)],'paper',2.3);}else vessel(H,R,i+.53,j+.75,zz+.2,11,20,n?'sun':'teal',false);}
  }
 });
 timber(H,R,7.15,.37,4.12,2.03,3.52,.16,'sun');
 for(let n=0;n<5;n++){
  const q=H.p(7.84+n*.58,1.11,3.71);oval(H,R,...q,8,4,'sun',.53);
  H.line(R,[[q[0]-5,q[1]-2],[q[0]-5,q[1]-11],[q[0]+5,q[1]-11],[q[0]+5,q[1]-2]],'paper',1.5);
 }
 timber(H,R,7.42,2.06,1.12,.76,.32,.13,'sun');
 shape(H,R,H.faceI(7.45,2.83,1.06,.39,.74),'teal',.6);
 const scoop=H.p(7.98,2.85,.71);oval(H,R,...scoop,5,2.5,'blue',.7);
 slipper(H,R,7.98,2.43,.49,.42,'coral');
 shape(H,R,H.faceI(8.68,2.3,1.04,1.39,2.85),'sun',.58);
 shape(H,R,H.faceI(8.79,2.32,.82,1.51,2.74),'paper',.65);
 H.line(R,[H.p(8.93,2.34,1.63),H.p(9.43,2.34,2.58)],'paper',2.1);
 for(const z of [1.31,2.92])H.line(R,[H.p(8.54,2.35,z),H.p(9.87,2.35,z)],'blue',2.1);
 for(let n=0;n<7;n++)H.line(R,[H.p(11.2,.8+n*.2,.4),H.p(11.2,.8+n*.2,2.95)],'blue',.75);
 wallRack(H,R,'ne',1,4.96,1.83,1.47,2,'sun',(P,z,row)=>{
  if(row===0){for(let n=0;n<2;n++){
   const u=.3+n*1.5;shape(H,R,[P(u,z+.1),P(u+1.05,z+.1),P(u+1.05,z+.6),P(u,z+.6)],'paper',1);
   for(const a of [.29,.69]){oval(H,R,...P(u+a,z+.4),3,4,'teal',.5);H.line(R,[P(u+a,z+.28),P(u+a,z+.14)],'coral',3);}
  }} else {
   shape(H,R,[P(.45,z+.1),P(1.65,z+.1),P(1.58,z+.43),P(.49,z+.43)],'teal',.55);
   shape(H,R,[P(2.1,z+.15),P(2.72,z+.53),P(2.9,z+.25),P(3.25,z+.53),P(3.52,z+.16),P(2.84,z+.08)],'paper',1);
   H.line(R,[P(2.72,z+.53),P(2.84,z+.08)],'coral',.75);
   for(let n=0;n<5;n++)oval(H,R,...P(4.13,z+.15+n*.045),7,3,'sun',.6);
  }
 });
 cabinetFrame(H,R,7.33,3.23,3.48,1.2,.07,.81,3,'teal',(i,j,w,d,z,h,n)=>{
  if(n===1){drape(H,R,i+.04,j+.17,w-.08,d-.19,z+.09,.12,'paper');drape(H,R,i+.04,j+.17,w-.08,d-.19,z+.23,.11,'coral');}
  else panelFront(H,R,i,j+d,w,z,.54,1,'teal');
 });
 timber(H,R,7.25,3.17,3.64,1.35,.89,.12,'sun');
 vessel(H,R,10.2,3.86,1.03,10,22,'paper',true);
 vessel(H,R,9.5,3.86,1.03,6,13,'paper',true);
 oval(H,R,...H.p(8.22,3.8,1.05),18,7,'paper',1);
 oval(H,R,...H.p(8.22,3.8,1.17),15,8,'teal',.3);
 H.dot(...H.p(8.22,3.8,1.43),2.8,'sun');
 const hair=H.p(10.42,4.26,1.03);
 oval(H,R,...hair,4.5,7,'sun',.7);H.line(R,[[hair[0],hair[1]+6],[hair[0]+4,hair[1]+15]],'teal',2.2);
 for(let n=-3;n<=3;n+=2)H.line(R,[[hair[0]+n,hair[1]-4],[hair[0]+n,hair[1]+3]],'blue',.6);
 slipper(H,R,7.9,4.85,.05,.72,'paper');
 const key=H.p(6.02,5.1,1.1);
 for(const i of [5.76,6.81])for(const j of [4.78,5.39])timber(H,R,i,j,.13,.13,.03,.8,'sun');
 timber(H,R,5.76,5.05,1.16,.13,.2,.12,'sun');
 timber(H,R,5.65,4.69,1.38,.9,.82,.19,'sun');
 oval(H,R,...key,15,6,'paper',1);
 for(const dx of [-5,5]){oval(H,R,key[0]+dx,key[1]-1,2.6,2,'sun',.8);H.line(R,[[key[0]+dx+2,key[1]],[key[0]+dx+7,key[1]+3]],'blue',1.1);}
 stroke(H,R,[[key[0]+8,key[1]+4],[key[0]+16,key[1]+7],[key[0]+19,key[1]+13]],'coral',2.8);
 timber(H,R,8.2,7.22,2.77,1.43,.06,.58,'teal');
 shape(H,R,H.tile(8.33,7.35,2.49,1.15,.65),'blue',.65);
 for(const i of [8.2,10.83])timber(H,R,i,7.22,.14,1.43,.63,.24,'sun');
 drape(H,R,8.48,7.52,1.06,.74,.7,.18,'paper');
 for(const i of [9.99,10.4]){
  const q=H.p(i,7.98,.74);oval(H,R,...q,6.5,10,'teal',.55);H.line(R,[[q[0]-2,q[1]-5],[q[0]+2,q[1]+6]],'paper',1.1);
 }
 shape(H,R,H.faceI(8.2,7.21,2.77,.89,1.58),'teal',.54);
 shape(H,R,H.faceI(8.42,7.23,2.32,1.03,1.44),'sun',.35);
 for(const i of [8.51,10.49])metal(H,R,i,8.67,.16,.045,.32,.18,'sun');
 const patch=H.p(8.84,7.85,.72);shape(H,R,[[patch[0]-8,patch[1]-3],[patch[0]+6,patch[1]-6],[patch[0]+9,patch[1]+3],[patch[0]-6,patch[1]+6]],'coral',.6);
 for(let n=0;n<4;n++)H.line(R,[[patch[0]-5+n*3,patch[1]-3],[patch[0]-4+n*3,patch[1]+3]],'paper',.8);
 metal(H,R,5.93,9.8,1.6,1.42,.03,.1,'teal');
 vessel(H,R,6.68,10.48,.15,20,33,'teal',true);
 for(const [i,j,ink] of [[6.5,10.4,'sun'],[6.8,10.54,'coral'],[6.64,10.69,'paper']]){
  bentTube(H,R,[[i,j,.3],[i,j,1.63],[i-.15,j,1.77],[i-.28,j,1.63]],2,ink);
  shape(H,R,[H.p(i-.1,j,.45),H.p(i+.1,j,.45),H.p(i+.15,j,1.43),H.p(i-.12,j,1.43)],ink,.55);
 }
 metal(H,R,.88,10.97,3.53,.6,.04,.1,'teal');
 for(let n=0;n<13;n++)H.line(R,[H.p(1.05+n*.25,11.01,.15),H.p(1.05+n*.25,11.51,.15)],'blue',1.2);
 shape(H,R,[H.p(1.38,10.65,.03),H.p(1.84,10.65,.03),H.p(1.84,10.9,.21),H.p(1.38,10.9,.21)],'sun',.6);
 bentTube(H,R,[[10.98,6.7,.12],[10.98,6.7,2.43]],3,'sun');
 const broom=H.p(10.98,6.7,.16);shape(H,R,[[broom[0]-3,broom[1]-16],[broom[0]+3,broom[1]-16],[broom[0]+16,broom[1]+3],[broom[0]-16,broom[1]+3]],'sun',.55);
 for(let n=-12;n<=12;n+=4)H.line(R,[[broom[0]+n*.2,broom[1]-13],[broom[0]+n,broom[1]+2]],'blue',.55);
 recessedFrame(H,R,'nw',1.0,3.32,2.73,.69,'teal',P=>{for(let n=0;n<10;n++)H.line(R,[P(.16+n*.3,.12),P(.16+n*.3,.58)],'paper',2.1)});
 timber(H,R,.19,1.32,.56,4.79,1.8,.14,'sun');
 helmet(H,R,.45,2.1,1.99,'teal',.72);helmet(H,R,.45,3.53,1.99,'coral',.78);
 for(const j of [4.82,5.66])bentTube(H,R,[[.15,j,1.94],[.52,j,1.78],[.52,j,1.66]],1.8,'sun');
 const coat=H.p(.5,4.77,1.73);
 shape(H,R,[[coat[0]-5,coat[1]],[coat[0]+5,coat[1]],[coat[0]+16,coat[1]+14],[coat[0]+11,coat[1]+21],[coat[0]+5,coat[1]+17],[coat[0]+11,coat[1]+58],[coat[0]-17,coat[1]+58],[coat[0]-11,coat[1]+16],[coat[0]-18,coat[1]+22],[coat[0]-23,coat[1]+14]],'coral',.6);
 H.line(R,[[coat[0]-3,coat[1]+5],[coat[0]-2,coat[1]+55]],'paper',1.2);
 for(const dx of [-10,5])H.line(R,[[coat[0]+dx,coat[1]+23],[coat[0]+dx+2,coat[1]+51]],'blue',.65,{tone:.55});
 const bag=H.p(.5,5.71,1.55);
 stroke(H,R,[[bag[0]-10,bag[1]+11],[bag[0]-8,bag[1]-8],[bag[0]+8,bag[1]-8],[bag[0]+10,bag[1]+11]],'sun',2);
 shape(H,R,[[bag[0]-18,bag[1]+7],[bag[0]+18,bag[1]+7],[bag[0]+14,bag[1]+38],[bag[0]-14,bag[1]+38]],'paper',1);
 H.line(R,[[bag[0]-12,bag[1]+12],[bag[0]-10,bag[1]+33]],'teal',1.1);
 const mirror=H.p(.24,6.75,1.96);
 oval(H,R,...mirror,12,18,'sun',.6);oval(H,R,...mirror,8,13,'paper',.65);
 H.line(R,[[mirror[0]-4,mirror[1]+8],[mirror[0]+3,mirror[1]-8]],'paper',2);
 timber(H,R,.62,5.55,1.32,1.2,.03,.57,'sun');
 for(let n=0;n<8;n++)H.line(R,[H.p(.7+n*.15,6.76,.12),H.p(.7+n*.15,6.76,.53)],'teal',.7);
 drape(H,R,.6,5.57,1.34,1.22,.62,.11,'paper');
 metal(H,R,10.85,6.56,.3,.3,.08,.16,'teal');
 const glove=H.p(.48,6.3,1.62);
 H.line(R,[H.p(.13,6.3,1.86),[glove[0],glove[1]-15]],'sun',1.4);
 shape(H,R,[[glove[0]-7,glove[1]-12],[glove[0]+5,glove[1]-12],[glove[0]+7,glove[1]+3],[glove[0]+13,glove[1]+6],[glove[0]+11,glove[1]+12],[glove[0]+5,glove[1]+8],[glove[0]+3,glove[1]+18],[glove[0]-6,glove[1]+17]],'paper',.86);
 H.line(R,[[glove[0]-4,glove[1]],[glove[0]-3,glove[1]+13]],'teal',.8);
 const strap=H.p(9.05,2.4,2.15);stroke(H,R,[[strap[0],strap[1]],[strap[0]-9,strap[1]+25],[strap[0]+7,strap[1]+36],[strap[0]+13,strap[1]+12]],'coral',4);
 for(let n=0;n<3;n++)H.line(R,[[strap[0]+3+n*2,strap[1]+31],[strap[0]+5+n*2,strap[1]+35]],'paper',.85);
},(H,R,t)=>{
 actor(H,R,.56,9.08,t,'hanoiThresholdWelcome',{shirt:['sun',.6],pants:['teal',.7],hairStyle:'bun'},.12,1.5);
 const u=cycle(t,16)*16,bend=ease((u-3.2)/1.6)*(1-ease((u-6.4)/1))+ease((u-9.6)/1.6)*(1-ease((u-12.8)/1.2));
 seatPose.lean=-6-64*bend;seatPose.head=16-25*ease((u-6.4)/1)*(1-ease((u-9.6)/1));
 const lean=seatPose.lean*Math.PI/180,sh=[-Math.sin(lean)*15-Math.cos(lean)*5.2-Math.sin(lean)*1.5,-10.07-Math.cos(lean)*15-Math.sin(lean)*5.2+Math.cos(lean)*1.5],foot=[2.34+Math.sin(100*Math.PI/180)*9.88+Math.sin(-23*Math.PI/180)*9.5,-10.07+Math.cos(100*Math.PI/180)*9.88+Math.cos(-23*Math.PI/180)*9.5];
 const dx=foot[0]-sh[0],dy=foot[1]-sh[1],d=Math.min(8.55,Math.max(.1,Math.hypot(dx,dy))),a=Math.atan2(dx,dy)-Math.acos(Math.max(-1,Math.min(1,(4.368**2+d*d-4.2**2)/(2*4.368*d))));
 seatPose.al=24*(1-bend)+a*180/Math.PI*bend;seatPose.el=35*(1-bend)+(Math.atan2(dx-Math.sin(a)*4.368,dy-Math.cos(a)*4.368)-a)*180/Math.PI*bend;
 actor(H,R,3.15,8.06,t,'hanoiThresholdShoe',{shirt:['paper',1],pants:['blue',.7],hairStyle:'short',face:'sw'},.2,1.5);
 const origin=H.p(3.15,8.06,.2),p=[origin[0]-foot[0]*1.5,origin[1]+foot[1]*1.5],s=Math.sin(u*Math.PI/8)*2*bend;
 stroke(H,R,[[p[0]-3,p[1]],[p[0]-7-s,p[1]-5],[p[0]+3,p[1]-3],[p[0]+7+s,p[1]-7]],'paper',.8);
 const cloth=H.p(.36,10.55,2.1),wave=Math.sin(t*Math.PI/8)*1.6;
 shape(H,R,[[cloth[0]-14,cloth[1]-25],[cloth[0]+5,cloth[1]-25],[cloth[0]+8+wave,cloth[1]+23],[cloth[0]-11+wave,cloth[1]+25]],'coral',.5);
 for(const dx of [-8,-2,4])H.line(R,[[cloth[0]+dx,cloth[1]-21],[cloth[0]+dx+wave,cloth[1]+20]],'paper',.65,{tone:.5});
});
room.loopSeconds=16;
room.stillTime=8;
export default room;
