import { world, shape, oval, stroke, actor, cycle, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, cushion, benchFrame, drape, floorLight, vessel } from '../materials.js';
import { masonry, cabinetFrame, boardFloor } from '../structure.js';
import { recessedFrame, windowBay, hangingRail, taskLight, panelFront, wallRack } from '../joinery.js';

const rest=FIGURES.clips.idle.keys[0][1],pose={...rest,al:60,el:55,ar:18,er:15,head:-3};
FIGURES.clips.hanoiOperaRise={dur:20,keys:[[0,pose],[1,pose]]};
FIGURES.clips.hanoiOperaWatch={dur:20,keys:[[0,{...rest,al:30,el:80,ar:30,er:90,head:5}],[.42,{...rest,al:30,el:80,ar:30,er:90,head:5}],[.55,{...rest,al:30,el:80,ar:30,er:90,head:13}],[.75,{...rest,al:30,el:80,ar:30,er:90,head:5}],[1,{...rest,al:30,el:80,ar:30,er:90,head:5}]]};
const smooth=x=>{const u=Math.max(0,Math.min(1,x));return u*u*(3-2*u)};
function shoe(H,R,i,j,z,ink='coral',size=1){
 const [x,y]=H.p(i,j,z);
 shape(H,R,[[x-10*size,y],[x-8*size,y-4*size],[x+3*size,y-5*size],[x+9*size,y-2*size],[x+12*size,y+2*size],[x+8*size,y+4*size],[x-8*size,y+3*size]],ink,.6,.7);
 oval(H,R,x-3*size,y-2*size,4*size,2.1*size,'blue',.62);
 H.line(R,[[x-7*size,y+2*size],[x+9*size,y+2*size]],'paper',.7);
 stroke(H,R,[[x-4*size,y-3*size],[x-10*size,y-9*size],[x-1*size,y-11*size],[x+4*size,y-4*size]],'sun',.65);
}
const room=world('hanoi-opera-shoes','Before the next entrance',{wall:false,floor:'paper',tone:.65,head:60},(H,R)=>{
 masonry(H,R,'nw',0,11.7,0,3.7,'paper',.84);
 masonry(H,R,'ne',0,11.7,0,3.7,'paper',.8);
 for(let i=0;i<12;i++)for(const j of [.05,10.9]){
  shape(H,R,H.tile(i,j,.96,.9,.03),'teal',.2);
  shape(H,R,[H.p(i+.18,j+.45,.035),H.p(i+.48,j+.17,.035),H.p(i+.8,j+.45,.035),H.p(i+.48,j+.72,.035)],'coral',.26,.5);
 }
 for(const side of ['nw','ne']){
  const P=(u,z)=>side==='nw'?H.p(.17,u,z):H.p(u,.17,z);
  H.line(R,[P(.15,3.56),P(11.6,3.56)],'blue',4);
  H.line(R,[P(.15,3.61),P(11.6,3.61)],'sun',1.7);
  for(let u=.35;u<11.2;u+=1.25){
   shape(H,R,[P(u,.12),P(u+1.02,.12),P(u+1.02,.78),P(u,.78)],'teal',.21,.6);
   H.line(R,[P(u+.11,.22),P(u+.9,.22),P(u+.9,.66)],'paper',1);
  }
 }
 for(const j of [6.55,10.9]){
  timber(H,R,.16,j,.31,.23,.08,3.41,'sun');
  metal(H,R,.12,j-.04,.4,.32,.08,.19,'teal');
 }
 wallRack(H,R,'nw',.68,4.85,1.21,.9,1,'sun',(P,z)=>{
  for(const [u,w] of [[.25,.85],[1.44,.55],[2.33,.85]]){
   shape(H,R,[P(u,z+.09),P(u+w,z+.09),P(u+w,z+.49),P(u,z+.49)],'paper',.8);
   H.line(R,[P(u+.12,z+.18),P(u+w-.08,z+.4)],'coral',2.4);
  }
  const q=P(4.13,z+.26);oval(H,R,...q,8,6,'sun',.65);H.line(R,[[q[0]-6,q[1]],[q[0]+6,q[1]]],'blue',.9);
 });
 boardFloor(H,R,1.25,2.2,7.45,6.7,.16,'sun',.55);
 timber(H,R,1.2,8.87,7.58,.18,.02,.16,'teal');
 for(const j of [2.32,8.57])timber(H,R,1.28,j,7.35,.15,.06,.09,'teal');
 for(const i of [1.38,8.54])for(const j of [2.45,4.45,6.45,8.54]){
  metal(H,R,i,j,.12,.14,.165,.018,'teal');
  H.dot(...H.p(i+.05,j+.07,.188),.8,'sun');
 }
 timber(H,R,3.25,9.05,3.25,.75,.015,.09,'sun');
 H.line(R,[H.p(3.32,9.77,.11),H.p(6.42,9.77,.11)],'paper',1.4);
 H.tint(H.tile(1.35,2.4,7.4,6.45,.175),'sun',.1);
 floorLight(H,5.4,4.5,143,.4);
 recessedFrame(H,R,'ne',1.05,7.35,.5,2.35,'sun',P=>{
  shape(H,R,[P(.13,.12),P(7.2,.12),P(7.2,2.23),P(.13,2.23)],'teal',.13);
  shape(H,R,[P(3.7,.14),P(4.1,.14),P(4.1,1.56),P(3.87,1.77),P(3.64,1.55)],'blue',.12,.3);
  oval(H,R,...P(3.86,1.85),6,7,'coral',.16);
  for(const u of [.4,2.8,5.3])H.line(R,[P(u,.2),P(u+.9,2.17)],'paper',2.2,{tone:.65});
 });
 for(const i of [1.21,3.63,6.05,8.21]){
  metal(H,R,i,.24,.075,.16,.64,2.05,'sun');
  for(const z of [.7,2.63])H.dot(...H.p(i+.04,.41,z),1.3,'blue');
 }
 H.line(R,[H.p(1.23,.32,.65),H.p(8.24,.32,.65)],'blue',2.2);
 windowBay(H,R,'nw',.75,5.4,2.62,.8,{ink:'teal',night:true,divisions:4});
 for(const i of [1.5,3.65,6,8.25]){
  metal(H,R,i-.1,2.9,.23,.25,.18,.045,'teal');
  bentTube(H,R,[[i,2.99,.2],[i,2.99,1.03],[i,3.15,1.08]],2.5,'teal');
  H.line(R,[H.p(i,2.99,.48),H.p(i,2.99,.61)],'paper',1.2);
  H.dot(...H.p(i,2.99,.65),1.5,'sun');
  metal(H,R,i-.085,2.89,.18,.22,.71,.17,'paper');
  H.line(R,[H.p(i-.13,3.02,.8),H.p(i+.19,3.02,.8)],'sun',2);
  for(const z of [.38,.49,.59])H.dot(...H.p(i,3.025,z),.8,'blue');
  bentTube(H,R,[[i,2.99,.91],[i,.49,.91]],1.5,'teal');
 }
 bentTube(H,R,[[1.34,3.15,.92],[1.34,3.15,1.08],[8.44,3.15,1.08],[8.44,3.15,.92]],4.3,'sun');
 H.line(R,[H.p(1.5,3.29,.2),H.p(8.4,3.29,.2)],'blue',1,{tone:.26});
 for(const [i,j] of [[4.9,4.4],[5.8,5.5],[3.1,6.5]]){
  H.line(R,[H.p(i,j,.18),H.p(i+.45,j,.18)],'coral',2.6,{tone:.5});
  H.line(R,[H.p(i+.22,j-.17,.18),H.p(i+.22,j+.2,.18)],'coral',2.6,{tone:.5});
 }
 for(const [i,j] of [[4.2,4.2],[6.6,4.9],[3.4,7]]){
  const [x,y]=H.p(i,j,.18);
  stroke(H,R,[[x-8,y-3],[x-2,y+1],[x+9,y]],'blue',.8,.2);
 }
 cabinetFrame(H,R,9,.35,2.43,2.03,.08,3.58,2,'teal',(i,j,w,d,z,h,n)=>{
  for(let row=0;row<5;row++){
   const zz=z+row*.59;
   shape(H,R,[H.p(i,j+.79,zz+.19),H.p(i+w,j+.79,zz+.19),H.p(i+w,j+d,zz),H.p(i,j+d,zz)],'sun',.5);
   timber(H,R,i,j+d-.11,w,.1,zz,.12,'sun');
   for(const ii of [i+.22,i+w-.22])H.line(R,[H.p(ii,j+.98,zz+.15),H.p(ii,j+1.52,zz+.06)],'paper',1.4);
   const p=H.p(i+.48,j+d-.25,zz+.16);
   H.line(R,[[p[0]-13,p[1]+5],[p[0]+12,p[1]+5]],'blue',3.5);
   shoe(H,R,i+.35,j+d-.42,zz+.16,row%2?'paper':'coral',.57);
   shoe(H,R,i+.69,j+d-.15,zz+.16,row%2?'paper':'coral',.57);
  }
 });
 timber(H,R,8.88,.3,2.66,2.14,3.62,.14,'sun');
 shoe(H,R,9.41,1.75,3.79,'paper',.44);shoe(H,R,9.73,1.88,3.79,'paper',.44);
 const hat=H.p(10.6,1.33,3.82);oval(H,R,...hat,13,6,'sun',.5);shape(H,R,[[hat[0]-7,hat[1]],[hat[0]-6,hat[1]-11],[hat[0]+5,hat[1]-11],[hat[0]+7,hat[1]]],'paper',1);

 const mesh=H.faceJ(11.5,.65,1.68,.38,3.4);
 shape(H,R,mesh,'paper',.28);
 H.clip(mesh,()=>{for(let z=.42;z<3.5;z+=.17)H.line(R,[H.p(11.51,.5,z),H.p(11.51,2.45,z+.9)],'teal',.55);for(let z=.42;z<4.5;z+=.17)H.line(R,[H.p(11.51,.5,z),H.p(11.51,2.45,z-.9)],'teal',.55)});
 for(const z of [.21,.29])H.line(R,[H.p(9.12,2.4,z),H.p(11.33,2.4,z)],'blue',1.5);
 timber(H,R,9.2,2.1,1.9,.78,.25,.12,'sun');
 for(let k=0;k<4;k++)stroke(H,R,[H.p(9.4+k*.36,2.28,.4),H.p(9.49+k*.36,2.6,.4),H.p(9.6+k*.36,2.68,.4)],k%2?'coral':'paper',1.3);
 hangingRail(H,R,'nw',6.8,3.8,3.25,3,(P,u,n)=>{
  H.line(R,[P(u,-.06),P(u-.34,-.3),P(u+.34,-.3),P(u,-.06)],'sun',1.1);
  shape(H,R,[P(u-.28,-.25),P(u+.28,-.25),P(u+.5,-1.55),P(u-.45,-1.55)],n===1?'coral':'paper',n===1?.4:1);
  for(const a of [-.15,0,.15])H.line(R,[P(u+a,-.4),P(u+a*1.7,-1.47)],'blue',.5,{tone:.4});
  H.line(R,[P(u-.4,-1.48),P(u+.45,-1.48)],'sun',1);
  if(n===1){const p=P(u+.19,-.86);for(let k=0;k<5;k++){const a=k*Math.PI*2/5;oval(H,R,p[0]+Math.cos(a)*3,p[1]+Math.sin(a)*3,2.5,2.2,'paper',1)}H.dot(...p,1.5,'sun');}
 });
 metal(H,R,.8,8.05,2.3,1.4,.03,.08,'teal');
 cushion(H,R,.91,8.14,2.07,1.19,.12,.15,'coral');
 const b=H.p(1.3,9.82,.16);oval(H,R,...b,10,5,'paper',1);oval(H,R,b[0]+5,b[1]-4,5,5,'teal',.55);
 bentTube(H,R,[[2,9.4,.15],[2.8,9.4,.15]],7,'sun');
 for(const i of [2,2.8])oval(H,R,...H.p(i,9.4,.15),5,8,'teal',.5);
 stroke(H,R,[H.p(1.3,9.1,.32),H.p(1.7,8.4,.32),H.p(2.6,8.65,.32),H.p(2.4,9.12,.32)],'blue',3);
 benchFrame(H,R,9.05,7.15,1.92,1.25,.6,'sun');
 drape(H,R,9.12,7.27,1.72,.89,.61,.24,'paper');
 vessel(H,R,9.8,8.97,.04,22,10,'paper',true);
 shape(H,R,H.tile(10.27,7.46,.47,.6,.65),'coral',.6);
 stroke(H,R,[H.p(10.3,7.7,.66),H.p(10.6,7.4,.66),H.p(10.8,7.6,.66)],'sun',1.4);
 cabinetFrame(H,R,9.18,3.45,2.07,2.4,.07,1.19,2,'teal',(i,j,w,d,z,h,n)=>{
  if(n===0)panelFront(H,R,i,j+d,w,z,.87,1,'teal');
  else for(let k=0;k<3;k++){
   shape(H,R,H.faceI(i,j+d,w,z+k*.32,z+.27+k*.32),'sun',.52);
   H.line(R,[H.p(i+.27,j+d+.02,z+.13+k*.32),H.p(i+.53,j+d+.02,z+.13+k*.32)],'blue',1.8);
  }
 });
 timber(H,R,9.1,3.38,2.24,2.53,1.26,.13,'sun');
 recessedFrame(H,R,'ne',9.31,1.81,1.55,1.7,'sun',P=>{
  shape(H,R,[P(.14,.15),P(1.67,.15),P(1.67,1.55),P(.14,1.55)],'paper',.68);
  H.line(R,[P(.31,.26),P(.94,1.39)],'paper',2.5);
 });
 metal(H,R,9.36,3.78,.72,.54,1.4,.53,'blue');
 for(const x of [9.51,9.82])oval(H,R,...H.p(x,4.34,1.65),4,5,'teal',.5);
 metal(H,R,10.35,4.22,.61,.92,1.4,.05,'teal');
 for(let n=0;n<3;n++){const q=H.p(10.48+n*.14,4.7,1.47);oval(H,R,...q,3.4,4,'coral',.65);H.line(R,[[q[0],q[1]-4],[q[0],q[1]-10]],'paper',1);}
 const comb=H.p(9.74,5.37,1.42);
 H.line(R,[[comb[0]-11,comb[1]-4],[comb[0]+11,comb[1]+4]],'sun',3);
 for(let n=-9;n<11;n+=3)H.line(R,[[comb[0]+n,comb[1]+n*.35],[comb[0]+n-3,comb[1]+n*.35+5]],'blue',.8);
 drape(H,R,10.57,5.23,.57,.54,1.42,.65,'coral');
 H.line(R,[H.p(9.4,3.76,1.4),H.p(9.03,3.76,1.35),H.p(9.03,3.76,.09),H.p(8.86,3.76,.09)],'blue',.9);
 taskLight(H,R,8.95,1.8,3.76,'coral',.5);
 const worn=H.p(5.87,4.65,.18);oval(H,R,...worn,5,2.2,'paper',.65);H.line(R,[[worn[0]-7,worn[1]+1],[worn[0]+8,worn[1]+5]],'blue',.55,{tone:.35});
 H.line(R,[H.p(4.83,3.15,1.11),H.p(6.32,3.15,1.11)],'paper',2.2);
 timber(H,R,4.49,10.05,2.1,1.1,.04,.51,'teal');
 shape(H,R,H.tile(4.64,10.2,1.8,.82,.57),'blue',.56);
 drape(H,R,4.71,10.26,1.18,.7,.62,.3,'paper');
 for(let n=0;n<5;n++)H.line(R,[H.p(4.75+n*.21,10.3,.64),H.p(4.86+n*.21,10.88,.64)],'coral',1.2);
 shape(H,R,H.faceI(4.49,10.05,2.1,.61,1.37),'teal',.54);
 shape(H,R,H.faceI(4.7,10.07,1.67,.78,1.21),'paper',.67);
 for(const i of [4.7,6.19])metal(H,R,i,11.17,.18,.04,.19,.21,'sun');
 const spool=H.p(6.16,10.6,.67);oval(H,R,...spool,6,3,'sun',.75);H.line(R,[[spool[0]-4,spool[1]-1],[spool[0]-4,spool[1]-10],[spool[0]+4,spool[1]-10],[spool[0]+4,spool[1]-1]],'coral',2.1);oval(H,R,spool[0],spool[1]-10,6,3,'sun',.75);
 const repair=H.p(7.7,9.73,.04);shape(H,R,[[repair[0]-9,repair[1]-9],[repair[0]-4,repair[1]-11],[repair[0]-2,repair[1]-5],[repair[0]-7,repair[1]-4]],'coral',.7,.4);
 for(let n=0;n<3;n++)H.line(R,[[repair[0]-8+n*2,repair[1]-8],[repair[0]-7+n*2,repair[1]-5]],'paper',.6);
 shoe(H,R,7.7,9.73,.04,'paper',.8);shoe(H,R,8.25,9.82,.04,'paper',.8);
},(H,R,t)=>{
 const u=cycle(t,20)*20,rise=smooth((u-4)/4)*(1-smooth((u-12)/6));
 const z=.16+rise*.095,root=H.p(6,3.5,z),target=H.p(5.7,3.15,1.08),dx=(target[0]-root[0])/1.5+5.2,dy=(target[1]-root[1])/1.5+32.5;
 const d=Math.min(8.56,Math.hypot(dx,dy)),a=Math.atan2(dx,dy)-Math.acos(Math.max(-1,Math.min(1,(4.368**2+d*d-4.2**2)/(2*4.368*d))));
 pose.al=a*180/Math.PI;pose.el=(Math.atan2(dx-Math.sin(a)*4.368,dy-Math.cos(a)*4.368)-a)*180/Math.PI;
 actor(H,R,6,3.5,t,'hanoiOperaRise',{shirt:['coral',.58],pants:['blue',.8],hairStyle:'bun',shoe:['sun',.6]},z,1.5);
 for(const x of [root[0]-3,root[0]+5])shape(H,R,[[x-2,root[1]-rise*2],[x+6,root[1]+3+rise*3],[x-2,root[1]+3+rise*3]],'sun',.7,.5);
 actor(H,R,8.45,6.18,t,'hanoiOperaWatch',{shirt:['teal',.55],pants:['blue',.55],face:'sw',hairStyle:'short'},.16,1.5);
 const p=H.p(.25,9.3,2.42),s=Math.sin(t*Math.PI/10)*1.8;
 stroke(H,R,[[p[0],p[1]],[p[0]+6+s,p[1]+14],[p[0]+3+s,p[1]+25]],'coral',1.2);
});
room.loopSeconds=20;
room.stillTime=10;
export default room;
