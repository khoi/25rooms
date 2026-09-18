import { world, shape, oval, stroke, actor, cycle, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, bentTube, vessel, drape, cushion, pendant, floorLight } from '../materials.js';
import { masonry, cabinetFrame, basin } from '../structure.js';
import { windowBay, hangingRail, panelFront, wallRack, recessedFrame } from '../joinery.js';

const base=FIGURES.clips.idle.keys[0][1],pose={...base,head:12,al:-20,el:30,ar:15,er:10};
FIGURES.clips.hanoiSoupCover={dur:24,keys:[[0,pose],[1,pose]]};
FIGURES.clips.hanoiSoupArrival={dur:24,keys:[[0,{...base,drop:.47,ll:84,lr:65,kl:-84,kr:-100,lean:-12,head:18,al:30,el:30,ar:35,er:25}],[.4,{...base,drop:.47,ll:84,lr:65,kl:-84,kr:-100,lean:-17,head:24,al:23,el:12,ar:30,er:14}],[.6,{...base,drop:.47,ll:84,lr:65,kl:-84,kr:-100,lean:-7,head:-10,al:30,el:30,ar:35,er:25}],[1,{...base,drop:.47,ll:84,lr:65,kl:-84,kr:-100,lean:-12,head:18,al:30,el:30,ar:35,er:25}]]};
const ease=x=>{const u=Math.max(0,Math.min(1,x));return u*u*(3-2*u)};
function bowl(H,R,i,j,z,r=12,ink='paper'){
 const [x,y]=H.p(i,j,z);
 shape(H,R,[[x-r,y-8],[x+r,y-8],[x+r*.64,y+2],[x-r*.64,y+2]],ink,.94);
 oval(H,R,x,y-8,r,r*.37,'sun',.2);oval(H,R,x,y-8,r*.78,r*.24,'teal',.32);
 H.line(R,[[x-r*.7,y+2],[x+r*.7,y+2]],'sun',1.2);
}
function cover(H,R,x,y,lift=0){
 y-=lift;
 const p=[];for(let n=0;n<=20;n++){const a=Math.PI+n*Math.PI/20;p.push([x+Math.cos(a)*21,y+Math.sin(a)*17]);}
 p.push([x+21,y+2],[x-21,y+2]);shape(H,R,p,'paper',.96);
 oval(H,R,x,y+1,21,6,'paper',.8);
 for(const a of [-.7,-.35,0,.35,.7])stroke(H,R,[[x+a*20,y],[x+a*13,y-11],[x+a*4,y-16]],'teal',.65,.7);
 oval(H,R,x,y-17,4.2,2.5,'coral',.73);
 H.line(R,[[x-3,y-19],[x+3,y-19]],'sun',1.3);
}
const room=world('hanoi-night-soup-table','The last bowl is covered',{wall:false,floor:'blue',tone:.31,head:55},(H,R)=>{
 masonry(H,R,'nw',0,11.7,0,3.6,'blue',.42);
 masonry(H,R,'ne',0,11.7,0,3.6,'blue',.5);
 for(const side of ['nw','ne']){
  const P=(u,z)=>side==='nw'?H.p(.12,u,z):H.p(u,.12,z);
  shape(H,R,[P(.1,.1),P(11.6,.1),P(11.6,.84),P(9.7,.84),P(9.3,.96),P(6.4,.86),P(3.2,.95),P(.1,.86)],'paper',.35);
 }
 for(let i=0;i<12;i++)for(let j=0;j<12;j++)H.outline(R,H.tile(i,j,.97,.97,.015),'paper',.45,{tone:.17});
 H.tint(H.tile(7.75,4.8,2.05,6.55,.026),'paper',.12);
 floorLight(H,5.15,5.8,130,.63);floorLight(H,8.7,1.9,95,.53);
 recessedFrame(H,R,'ne',.86,3.28,2.53,.68,'teal',P=>{
  for(let n=0;n<10;n++)H.line(R,[P(.21+n*.3,.13),P(.33+n*.3,.53)],'paper',2.1);
 });
 for(const z of [3.38,3.47])H.line(R,[H.p(.14,.14,z),H.p(11.58,.14,z)],z===3.38?'blue':'sun',z===3.38?2.8:1.1);
 bentTube(H,R,[[.14,5.5,.17],[.14,5.5,3.24],[3.83,.14,3.24],[3.83,.14,2.83]],1.6,'teal');
 for(const j of [1.51,4.66])timber(H,R,.13,j,.41,.16,1.38,1.68,'sun');
 windowBay(H,R,'nw',1.4,3.45,1.47,1.6,{night:true,ink:'teal',divisions:2});
 timber(H,R,.18,1.25,.88,3.75,1.35,.14,'sun');
 bowl(H,R,.5,2.0,1.51,7);
 metal(H,R,.38,3.83,.24,.16,1.53,.06,'teal');
 H.line(R,[H.p(.5,3.92,1.6),H.p(.5,3.92,1.83)],'sun',1.4);
 cabinetFrame(H,R,5.68,.4,5.52,1.63,.08,1.15,3,'teal',(i,j,w,d,z,h,n)=>{
  if(n===0){vessel(H,R,i+.48,j+.61,z+.15,15,16,'blue',false);vessel(H,R,i+1.12,j+1.26,z+.14,9,19,'sun',false);drape(H,R,i+.15,j+1.17,.56,.37,z+.77,.3,'paper');H.line(R,[H.p(i+.1,j+d,z+.7),H.p(i+w-.1,j+d,z+.7)],'paper',1);}
  else if(n===1){
   timber(H,R,i,j,w,d,z+.3,.08,'sun');
   for(let k=0;k<4;k++)bowl(H,R,i+.47,j+.67,z+.44+k*.085,10,'paper');
   for(let k=0;k<6;k++)H.line(R,[H.p(i+.12+k*.23,j+d,z+.12),H.p(i+.12+k*.23,j+d,z+.28)],'paper',1.2);
  }else panelFront(H,R,i,j+d,w,z+.12,h-.22,1,'teal');
 });
 metal(H,R,5.57,.31,5.75,1.86,1.25,.15,'paper');
 for(let i=5.6;i<11.3;i+=.47)for(let z=1.43;z<2.39;z+=.34)shape(H,R,H.faceI(i,.16,.44,z,z+.31),'teal',.22,.5);
 basin(H,R,6.0,.53,1.89,1.37,1.39,'paper');
 bentTube(H,R,[[6.97,1.42,1.37],[6.97,1.42,.61],[7.36,1.42,.61],[7.36,1.42,.21],[7.75,.28,.21]],2.7,'teal');
 metal(H,R,7.73,1.13,.41,.4,1.43,.05,'coral');
 H.line(R,[H.p(7.79,1.18,1.51),H.p(8.05,1.38,1.51)],'paper',1.6);
 metal(H,R,8.28,.56,2.52,1.3,1.41,.07,'teal');
 for(let n=0;n<8;n++)H.line(R,[H.p(8.43+n*.27,.64,1.49),H.p(8.43+n*.27,1.75,1.49)],'paper',1);
 for(let n=0;n<4;n++){
  const p=H.p(8.7+n*.44,1.08,1.52);oval(H,R,...p,9,15,'paper',1);H.line(R,ell(...p,6,11),'sun',.8,{closed:true});
 }
 hangingRail(H,R,'ne',5.95,4.9,2.8,5,(P,u,n)=>{
  if(n<2){const p=P(u,-.69);oval(H,R,...p,12,14,n?'blue':'teal',.6);H.line(R,[P(u,-.14),P(u,-.49)],'blue',2.8);oval(H,R,...p,8,9,'paper',.3);}
  else if(n===2){H.line(R,[P(u,-.15),P(u,-.63)],'sun',2);oval(H,R,...P(u,-.75),5,9,'paper',1);}
  else {H.line(R,[P(u,-.15),P(u,-.58)],'blue',1.5);oval(H,R,...P(u,-.71),8,10,'paper',.85);for(let a=-6;a<=6;a+=3)H.line(R,[[P(u,-.71)[0]+a,P(u,-.71)[1]-7],[P(u,-.71)[0]+a,P(u,-.71)[1]+7]],'teal',.5);}
 });
 wallRack(H,R,'nw',6.65,3.8,1.62,1.62,2,'sun',(P,z,row)=>{
  for(let n=0;n<3;n++){
   const u=.3+n*1.1;
   if(row===0){shape(H,R,[P(u,z+.1),P(u+.65,z+.1),P(u+.65,z+.58),P(u,z+.58)],n===1?'coral':'paper',.8);H.line(R,[P(u-.02,z+.6),P(u+.69,z+.6)],'blue',2);}
   else {shape(H,R,[P(u,z+.1),P(u+.75,z+.1),P(u+.68,z+.44),P(u+.08,z+.44)],'teal',.5);H.line(R,[P(u+.1,z+.35),P(u+.66,z+.2)],'sun',1.1);}
  }
 });
 timber(H,R,1.32,.43,3.48,1.18,.06,.12,'teal');
 for(const [i,r,h] of [[1.88,17,28],[3.08,13,21],[4.08,10,17]]){
  vessel(H,R,i,1.03,.19,r,h,i<2?'sun':'teal',false);
  const q=H.p(i,1.03,.19);oval(H,R,q[0],q[1]-h,r*.94,r*.3,'paper',.9);
  H.line(R,[[q[0]-r*.7,q[1]-h+3],[q[0]+r*.7,q[1]-h+3]],'coral',1.4);
  shape(H,R,[[q[0]-5,q[1]-h+8],[q[0]+5,q[1]-h+8],[q[0]+5,q[1]-5],[q[0]-5,q[1]-5]],'paper',.9);
 }
 timber(H,R,1.1,.2,3.76,.64,1.56,.1,'sun');
 for(const [i,ink,h] of [[1.46,'coral',17],[2.05,'teal',24],[2.68,'sun',14]]){
  vessel(H,R,i,.55,1.67,7,h,ink,false);const q=H.p(i,.55,1.67);H.line(R,[[q[0]-4,q[1]-h],[q[0]+4,q[1]-h]],'blue',3);
 }
 metal(H,R,3.24,.31,1.21,.52,1.68,.08,'paper');
 for(let n=0;n<4;n++)oval(H,R,...H.p(3.42+n*.24,.58,1.79),4,3,'coral',.6);
 const strainer=H.p(4.83,.24,2.39);oval(H,R,...strainer,13,16,'sun',.7);oval(H,R,...strainer,10,13,'paper',.7);
 for(let n=-6;n<=6;n+=3)H.line(R,[[strainer[0]+n,strainer[1]-10],[strainer[0]+n,strainer[1]+10]],'teal',.6);
 H.line(R,[[strainer[0],strainer[1]-16],[strainer[0],strainer[1]-33]],'sun',2.8);
 for(const j of [4.72,6.85]){
  bentTube(H,R,[[3.85,j,.08],[6.75,j,.74]],3.2,'sun');
  bentTube(H,R,[[6.75,j,.08],[3.85,j,.74]],3.2,'sun');
  const q=H.p(5.3,j,.41);oval(H,R,...q,3.8,3.8,'paper',1);H.dot(...q,1.6,'blue');
  for(const i of [3.78,6.7])metal(H,R,i,j-.08,.25,.23,.045,.065,'teal');
 }
 bentTube(H,R,[[4.05,4.76,.25],[4.05,6.86,.25]],2.4,'teal');
 bentTube(H,R,[[6.52,4.76,.25],[6.52,6.86,.25]],2.4,'teal');
 timber(H,R,3.6,4.48,3.55,2.8,.68,.15,'sun');
 for(let n=0;n<5;n++)H.line(R,[H.p(3.64+n*.69,4.51,.84),H.p(3.64+n*.69,7.23,.84)],'coral',.7,{tone:.35});
 for(const j of [4.74,6.97]){
  bentTube(H,R,[[3.91,j,.12],[6.8,j,.71]],2.5,'teal');
  metal(H,R,5.27,j-.06,.21,.13,.42,.12,'sun');
 }
 drape(H,R,4.72,4.54,.73,2.7,.84,.23,'paper');
 for(const x of [4.79,5.33])H.line(R,[H.p(x,4.55,.85),H.p(x,7.22,.85)],'coral',.75);
 oval(H,R,...H.p(5.1,5.8,.86),26,12,'sun',.6);
 for(let n=0;n<6;n++)H.line(R,ell(...H.p(5.1,5.8,.867),5+n*3.4,2+n*1.5),'teal',.55,{closed:true});
 bowl(H,R,5.1,5.8,.88,15);
 bowl(H,R,4.17,5.15,.88,8);bowl(H,R,6.3,6.62,.88,8);
 const greens=H.p(6.22,5.02,.88);oval(H,R,...greens,20,9,'paper',1);
 for(const [x,y,a] of [[-10,0,-.2],[-4,-2,.3],[4,1,.2],[10,-1,-.3]])shape(H,R,[[greens[0]+x-5,greens[1]+y],[greens[0]+x,greens[1]+y-5],[greens[0]+x+6,greens[1]+y],[greens[0]+x,greens[1]+y+4]],'teal',.6,.5);
 H.line(R,[H.p(4.15,6.5,.91),H.p(4.15,5.92,.91)],'sun',1.5);
 H.line(R,[H.p(4.25,6.5,.91),H.p(4.25,5.92,.91)],'sun',1.5);
 shape(H,R,H.tile(6.24,6.08,.37,.2,.87),'coral',.6);
 for(const i of [6.3,6.4])H.line(R,[H.p(i,6.09,.89),H.p(i,5.7,.89)],'sun',1.1);
 for(let n=0;n<3;n++)H.line(R,[H.p(6.25+n*.11,6.25,.885),H.p(6.28+n*.11,6.3,.885)],'paper',.6);
 cabinetFrame(H,R,8.92,2.48,2.44,2.07,.08,.83,2,'teal',(i,j,w,d,z,h,n)=>{
  if(n===0){
   timber(H,R,i,j,w,d,z+.32,.07,'sun');
   for(let k=0;k<3;k++)bowl(H,R,i+.43,j+1.49,z+.43+k*.09,11,'paper');
   vessel(H,R,i+.45,j+1.42,z+.08,10,9,'coral',false);
  }
  else panelFront(H,R,i,j+d,w,z+.08,.54,1,'teal');
 });
 metal(H,R,8.85,2.43,2.57,2.2,.91,.09,'paper');
 const tray=H.p(9.45,3.26,1.02);
 oval(H,R,...tray,12,5,'sun',.55);H.line(R,[[tray[0]-8,tray[1]],[tray[0]+8,tray[1]]],'blue',.8);
 metal(H,R,9.38,2.87,1.7,1.48,1,.14,'teal');
 vessel(H,R,10.2,3.6,1.24,20,25,'paper',false);
 oval(H,R,...H.p(10.2,3.6,2.04),19,7,'paper',1);
 H.line(R,[H.p(10.05,3.6,2.18),H.p(10.36,3.6,2.18)],'blue',3);
 oval(H,R,...H.p(10.2,4.1,1.7),3,3,'coral',.7);
 stroke(H,R,[H.p(10.98,3.8,1.42),H.p(11.5,3.8,1.28),H.p(11.5,2.38,.12),H.p(11.2,.28,.12)],'blue',1);
 const socket=H.p(11.2,.26,1.08);shape(H,R,[[socket[0]-5,socket[1]-7],[socket[0]+5,socket[1]-7],[socket[0]+5,socket[1]+5],[socket[0]-5,socket[1]+5]],'paper',.9);
 for(const x of [-2,2])H.line(R,[[socket[0]+x,socket[1]-3],[socket[0]+x,socket[1]+1]],'blue',1);
 benchFrame(H,R,8.75,8.51,2.15,1.16,.62,'sun');
 cushion(H,R,8.85,8.62,1.95,.94,.63,.1,'teal');
 metal(H,R,9.5,9.93,.77,.92,.06,.34,'coral');
 bentTube(H,R,[[9.7,10.11,.39],[9.7,10.11,.61],[10.04,10.11,.61],[10.04,10.11,.39]],1.8,'blue');
 for(const i of [8.8,9.3])oval(H,R,...H.p(i,10.35,.04),12,5,'sun',.65);
 drape(H,R,10.33,8.6,.5,.8,.75,.52,'paper');
 cabinetFrame(H,R,.5,6.13,1.79,3.33,.06,1.04,1,'teal',(i,j,w,d,z,h)=>{
  panelFront(H,R,i,j+d,w,z+.05,.75,2,'teal');
 });
 timber(H,R,.43,6.06,1.93,3.48,1.1,.13,'sun');
 metal(H,R,.68,6.4,1.19,.75,1.24,.32,'paper');
 metal(H,R,.62,6.35,1.29,.85,1.56,.045,'teal');
 for(const i of [.85,1.45])metal(H,R,i,6.4,.2,.07,1.5,.14,'coral');
 for(let n=0;n<3;n++)oval(H,R,...H.p(1.26,7.66,1.25+n*.08),17,6,'paper',1);
 drape(H,R,.78,8.47,1.32,.84,1.24,.46,'paper');
 for(const j of [6.42,9.22]){
  H.line(R,[H.p(.17,j,1.87),H.p(.52,j,1.65)],'sun',1.8);
 }
 timber(H,R,.18,6.39,.44,2.98,1.86,.11,'sun');
 for(let n=0;n<4;n++){
  const q=H.p(.4,6.84+n*.62,1.99);oval(H,R,...q,7,11,'paper',.9);H.line(R,[[q[0]-2,q[1]-7],[q[0]+2,q[1]+5]],'coral',.8);
 }
 timber(H,R,1.0,9.87,1.8,1.2,.04,.6,'teal');
 drape(H,R,1.03,9.91,1.74,1.07,.65,.28,'paper');
 for(let n=0;n<3;n++)oval(H,R,...H.p(1.6,10.43,.71+n*.065),15,6,'paper',1);
 vessel(H,R,2.22,10.45,.72,8,12,'teal',false);
 const bag=H.p(.34,10.58,1.34);
 stroke(H,R,[[bag[0]-7,bag[1]],[bag[0]-9,bag[1]-18],[bag[0]+5,bag[1]-19],[bag[0]+8,bag[1]]],'sun',2);
 shape(H,R,[[bag[0]-17,bag[1]],[bag[0]+17,bag[1]],[bag[0]+12,bag[1]+31],[bag[0]-12,bag[1]+31]],'sun',.56);
 for(let n=-12;n<=12;n+=4)H.line(R,[[bag[0]+n,bag[1]+2],[bag[0]+n*.7,bag[1]+28]],'teal',.7);
 H.line(R,[[bag[0]-2,bag[1]-21],[bag[0]+3,bag[1]-25],[bag[0]+4,bag[1]-20]],'blue',1.2);
 metal(H,R,3.35,9.91,2.1,1.15,.04,.06,'teal');
 const basket=H.p(4.4,10.46,.12);
 shape(H,R,[[basket[0]-23,basket[1]-22],[basket[0]+23,basket[1]-22],[basket[0]+18,basket[1]],[basket[0]-18,basket[1]]],'sun',.56);
 oval(H,R,basket[0],basket[1]-22,23,8,'paper',1);
 for(let n=-16;n<19;n+=5)H.line(R,[[basket[0]+n,basket[1]-19],[basket[0]+n*.82,basket[1]-2]],'teal',.8);
 for(const dy of [-15,-8])H.line(R,[[basket[0]-19,basket[1]+dy],[basket[0]+19,basket[1]+dy]],'blue',.7);
 shape(H,R,[[basket[0]-14,basket[1]-23],[basket[0]-10,basket[1]-36],[basket[0]+4,basket[1]-37],[basket[0]+17,basket[1]-26],[basket[0]+6,basket[1]-17]],'paper',.93);
 H.line(R,[[basket[0]-8,basket[1]-32],[basket[0]+8,basket[1]-23]],'coral',1.6);
 pendant(H,R,5.1,5.1,4.2,3.1,'paper',.85);pendant(H,R,8.4,1.6,3.9,2.98,'sun',.67);
 const lamp=H.p(5.1,5.1,3.1);H.line(R,[[lamp[0]+4,lamp[1]-10],[lamp[0]+10,lamp[1]+6]],'coral',1.3);
},(H,R,t)=>{
 const u=cycle(t,24)*24,lift=ease((u-4.8)/4.8)*(1-ease((u-14.4)/7.6)),p=H.p(5.1,5.8,.9);
 const target=[p[0],p[1]-24-lift*13],root=H.p(5.28,5.405,0),dx=(target[0]-root[0])/1.7+5.2,dy=(target[1]-root[1])/1.7+32.5;
 const d=Math.min(8.55,Math.max(.1,Math.hypot(dx,dy))),a=Math.atan2(dx,dy)-Math.acos(Math.max(-1,Math.min(1,(4.368**2+d*d-4.2**2)/(2*4.368*d))));
 pose.al=a*180/Math.PI;pose.el=(Math.atan2(dx-Math.sin(a)*4.368,dy-Math.cos(a)*4.368)-a)*180/Math.PI;pose.head=12-lift*18;
 H.clip([[-400,-300],[400,-300],[400,151],[-400,151]],()=>actor(H,R,5.28,5.405,t,'hanoiSoupCover',{shirt:['coral',.63],pants:['blue',.65],hairStyle:'bun'},0,1.7));
 cover(H,R,p[0],p[1]-5,lift*13);
 actor(H,R,9.25,9.04,t,'hanoiSoupArrival',{shirt:['paper',1],pants:['teal',.64],hairStyle:'short',face:'sw'},.16,1.5);
 const shoe=H.p(8.81,9.61,.12);stroke(H,R,[[shoe[0]-3,shoe[1]-3],[shoe[0]+Math.sin(u*Math.PI/12)*2,shoe[1]-7],[shoe[0]+4,shoe[1]-3]],'paper',.8);
});
room.loopSeconds=24;
room.stillTime=23;
export default room;
