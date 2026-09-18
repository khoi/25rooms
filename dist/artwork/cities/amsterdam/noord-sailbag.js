import { world, box, shape, oval, stroke, actor, cycle, mix, wallPt, loop } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, drape, vessel, bentTube } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, wallRack, hangingRail, taskLight, floorShadow, caster } from '../joinery.js';

const base={...FIGURES.clips.idle.keys[0][1]},makerPose={...base},customerPose={...base};
FIGURES.clips['amsterdam-sailbag-maker']={dur:16,keys:[[0,makerPose],[1,makerPose]]};
FIGURES.clips['amsterdam-sailbag-customer']={dur:16,keys:[[0,customerPose],[1,customerPose]]};
const smooth=(a,b,t)=>{const f=Math.max(0,Math.min(1,(t-a)/(b-a)));return f*f*(3-2*f)};
function sewing(H,R,i,j,z){
 metal(H,R,i,j,1.6,.95,z,.14,'paper');
 const pts=[[0,0],[.42,0],[.42,.71],[1.18,.71],[1.18,.39],[1.45,.39],[1.45,1.04],[0,1.04]].map(([x,h])=>H.p(i+x,j+.68,z+.14+h));
 shape(H,R,pts,'teal',.65);
 H.line(R,[H.p(i+.41,j+.7,z+.79),H.p(i+1.26,j+.7,z+.79)],'paper',1.8);
 H.line(R,[H.p(i+1.27,j+.71,z+.54),H.p(i+1.27,j+.71,z+.18)],'blue',1.6);
 oval(H,R,...H.p(i+.14,j+.71,z+.76),10,10,'paper',1);
 oval(H,R,...H.p(i+.14,j+.72,z+.76),5,5,'blue',.7);
 const wheel=H.p(i+.14,j+.73,z+.76);
 for(let n=0;n<6;n++){const a=n*Math.PI/3;H.line(R,[[wheel[0]+Math.cos(a)*3,wheel[1]+Math.sin(a)*3],[wheel[0]+Math.cos(a)*8,wheel[1]+Math.sin(a)*8]],'blue',1)}
 metal(H,R,i+1.01,j+.53,.39,.27,z+.15,.035,'blue');
 for(let n=0;n<4;n++)H.line(R,[H.p(i+1.04+n*.075,j+.56,z+.2),H.p(i+1.04+n*.075,j+.76,z+.2)],'paper',.6);
 metal(H,R,i+1.15,j+.6,.26,.18,z+.23,.04,'paper');
 for(const [x,h] of [[.58,.93],[.77,.93],[1.34,.86]]){
   oval(H,R,...H.p(i+x,j+.7,z+h),3.2,3.2,'sun',.8);
   H.dot(...H.p(i+x,j+.72,z+h),1,'blue');
 }
 shape(H,R,H.faceI(i+.48,j+.7,.47,z+1.03,z+1.13),'paper',1);
 for(let n=0;n<5;n++)H.line(R,[H.p(i+.51+n*.08,j+.72,z+1.05),H.p(i+.51+n*.08,j+.72,z+1.1)],'teal',.55);
 stroke(H,R,[H.p(i+.12,j+.13,z+.79),H.p(i-.03,j+.11,z+.12),H.p(i-.15,j+.35,z-.68)],'blue',1.8);
 metal(H,R,i+.08,j+.1,.14,.2,z+1.18,.26,'coral');
 stroke(H,R,[H.p(i+.15,j+.2,z+1.44),H.p(i+1.12,j+.45,z+1.29),H.p(i+1.3,j+.69,z+.62)],'blue',.65);
 drape(H,R,i+.92,j+.57,.76,.52,z+.17,.19,'paper');
}
function bag(H,R,i,j,z,slack=0){
 const Q=(x,y,h)=>H.p(i+x,j+y,z+h),w=2.65,d=1.28;
 shape(H,R,[Q(0,.14,.13),Q(.25,0,.87),Q(w-.23,0,.91),Q(w,.18,.15),Q(w-.18,d,.1),Q(.23,d,.1)],'coral',.62);
 shape(H,R,[Q(.23,d,.1),Q(w-.18,d,.1),Q(w-.1,d-.06,.78),Q(.32,d-.02,.87)],'coral',.52);
 shape(H,R,[Q(w-.18,d,.1),Q(w,.18,.15),Q(w-.23,0,.91),Q(w-.1,d-.06,.78)],'coral',.75);
 shape(H,R,[Q(.32,d-.02,.87),Q(w-.1,d-.06,.78),Q(w-.23,0,.91),Q(.25,0,.87)],'blue',.55);
 shape(H,R,[Q(.47,d-.19,.81),Q(w-.28,d-.2,.74),Q(w-.38,.16,.84),Q(.42,.17,.81)],'paper',.8);
 for(const x of [.38,w-.33]){
  stroke(H,R,[Q(x,.04,.88),Q(x+.04,.38,.88),Q(x+.1,d-.05,.77),Q(x,d,.15)],'paper',1.6);
  for(let y=.15;y<d;y+=.13)H.line(R,[Q(x+.04,y,.85-y*.04),Q(x+.08,y+.04,.85-y*.04)],'blue',.6);
 }
 stroke(H,R,[Q(.29,d+.01,.26),Q(1.32,d+.025,.22),Q(w-.22,d+.01,.25)],'paper',1);
 shape(H,R,[Q(1.88,d+.015,.13),Q(2.48,d+.015,.13),Q(2.42,d+.015,.47),Q(2.07,d+.015,.52)],'teal',.62);
 H.line(R,[Q(2,d+.025,.23),Q(2.43,d+.025,.39)],'coral',1.4);
 for(const x of [.31,2.34]){
   shape(H,R,[Q(x-.13,d+.02,.12),Q(x+.17,d+.02,.12),Q(x+.17,d+.02,.41),Q(x-.13,d+.02,.32)],'paper',.56);
   H.line(R,[Q(x-.08,d+.035,.16),Q(x+.12,d+.035,.33)],'blue',.8);
   H.line(R,[Q(x+.12,d+.035,.16),Q(x-.08,d+.035,.29)],'blue',.8);
 }
 stroke(H,R,[Q(.72,d+.03,.38),Q(1.14,d+.04,.32),Q(1.73,d+.04,.37)],'coral',.9);
 for(let x=.46;x<2.27;x+=.16)H.line(R,[Q(x,d+.03,.16),Q(x+.05,d+.03,.165)],'blue',.65);
 H.line(R,[Q(.51,.24,.84),Q(.62,.92,.8)],'teal',1.3);
 for(const side of [.09,d-.05]){
  stroke(H,R,[Q(.77,side,.8),Q(.85,side,.98+.28*(1-slack)),Q(1.56,side,1.16-.3*slack),Q(1.89,side,.83)],'blue',5);
  stroke(H,R,[Q(.77,side,.8),Q(.85,side,.98+.28*(1-slack)),Q(1.56,side,1.16-.3*slack),Q(1.89,side,.83)],'paper',3);
  for(const x of [.77,1.89])shape(H,R,[Q(x-.1,side,.64),Q(x+.1,side,.64),Q(x+.1,side,.87),Q(x-.1,side,.87)],'coral',.75);
 }
 stroke(H,R,[Q(.48,.66,.88),Q(1.15,.61,.88),Q(2.3,.63,.84)],'blue',1.8);
 for(let x=.56;x<2.26;x+=.11)H.line(R,[Q(x,.59,.9),Q(x,.68,.9)],'paper',.7);
 stroke(H,R,[Q(2.26,.63,.87),Q(2.45,.72,.71),Q(2.51,.8,.61)],'sun',2);
}
const room=world('amsterdam-noord-sailbag','The seam holds the shape',{floor:'paper',tone:.18,wall:'teal',wallTone:.19,height:3.65,pattern:'boards',head:50},(H,R)=>{
 windowBay(H,R,'ne',1.35,6.3,2.0,1.32,{divisions:3,ink:'paper',view:P=>{
  shape(H,R,[P(.12,.12),P(6.12,.12),P(6.12,.57),P(.12,.57)],'teal',.26);
  for(let n=0;n<5;n++)H.line(R,[P(.25+n*1.17,.32),P(1.03+n*1.17,.32)],'paper',1.4);
  shape(H,R,[P(3.1,.6),P(3.7,1.06),P(3.7,.6)],'paper',1);
 }});
 for(const x of [1.27,7.69])timber(H,R,x,.1,.1,.25,1.85,1.64,'paper');
 timber(H,R,1.15,.07,6.64,.46,1.85,.13,'sun');
 hangingRail(H,R,'nw',1.2,5.1,3.15,4,(P,u,n)=>{
  const width=[.71,.89,.65,.86][n],height=[1.01,1.42,1.25,1.1][n];
  shape(H,R,[P(u-width/2,-.18),P(u+width/2,-.18),P(u+width*.62,-height*.7),P(u+width*.35,-height),P(u-width*.46,-height*.89)],n===2?'coral':'paper',n===2?.3:1);
  H.line(R,[P(u,-.25),P(u,-height*.85)],'blue',.55,{tone:.55});
  H.dot(...P(u,-.2),1.4,'blue');
 });
 const CP=(y,z)=>H.p(.19,y,z);
 shape(H,R,H.faceJ(.18,1.1,5.92,.09,1.19),'blue',.6);
 for(const y of [1.1,3.11,5.08,7.03])timber(H,R,.17,y,1.26,.13,.06,1.16,'teal');
 for(const z of [.06,1.17])timber(H,R,.17,1.1,1.31,6.05,z,.11,'sun');
 for(let n=0;n<5;n++){
  const y=1.4+n*.3,p=H.p(.88,y,.23);
  shape(H,R,[[p[0]-7,p[1]-25],[p[0]+7,p[1]-25],[p[0]+8,p[1]+4],[p[0]-7,p[1]+4]],n%2?'paper':'teal',.6);
  oval(H,R,p[0],p[1]-25,7,3,'paper',1);oval(H,R,p[0],p[1]-25,3,1.4,'blue',.8);
  H.line(R,[[p[0]-6,p[1]-5],[p[0]+7,p[1]-5]],'coral',2);
 }
 for(let n=0;n<3;n++)drape(H,R,.38,3.31,.91,1.35,.29+n*.2,.1,['paper','teal','coral'][n]);
 for(const y of [5.39,6.15]){
  shape(H,R,H.faceJ(1.51,y,.66,.28,.93),'sun',.6);
  H.line(R,[H.p(1.53,y+.13,.59),H.p(1.53,y+.52,.59)],'blue',1.8);
 }
 const cutter=H.p(.87,4.12,1.3);
 oval(H,R,...cutter,7,4,'blue',.72);
 H.line(R,[[cutter[0],cutter[1]],[cutter[0]+20,cutter[1]+8]],'coral',4);
 H.dot(...cutter,2,'sun');
 shape(H,R,H.tile(.39,1.3,.93,1.43,1.3),'paper',1);
 for(let n=0;n<3;n++)shape(H,R,[H.p(.44,1.42+n*.3,1.32),H.p(1.21,1.42+n*.3,1.32),H.p(1.21,1.6+n*.3,1.32),H.p(.75,1.68+n*.3,1.32)],n===1?'coral':'teal',.28);
 metal(H,R,.42,5.32,.64,1.19,1.3,.07,'teal');
 for(let n=0;n<6;n++)H.line(R,[H.p(.46,5.4+n*.16,1.39),H.p(.77,5.4+n*.16,1.39)],'paper',.8);
 const scissors=H.p(.91,6.54,1.34);
 for(const dx of [-4,4])oval(H,R,scissors[0]+dx,scissors[1]+6,3.6,4.2,'paper',1);
 H.line(R,[[scissors[0]-5,scissors[1]+2],[scissors[0]+6,scissors[1]-13]],'blue',1.5);
 H.line(R,[[scissors[0]+5,scissors[1]+2],[scissors[0]-6,scissors[1]-13]],'blue',1.5);
 wallRack(H,R,'nw',7.4,3.5,1.73,1.58,2,'sun',(P,z,row)=>{
  for(let n=0;n<3;n++){
   const u=.27+n*1.03;
   if(row)shape(H,R,[P(u,z+.1),P(u+.7,z+.1),P(u+.55,z+.5),P(u+.14,z+.46)],n===1?'teal':'coral',.5);
   else stroke(H,R,[P(u,z+.09),P(u+.11,z+.47),P(u+.46,z+.55),P(u+.67,z+.07)],'paper',3.5);
  }
 });
 cabinetFrame(H,R,8.15,.35,3.25,1.68,.08,3.45,2,'teal',(i,j,w,d,z,h,n)=>{
  for(const zz of [z+.78,z+2.08])timber(H,R,i,j,w,d,zz,.09,'sun');
  if(n===0){for(let k=0;k<3;k++) {box(H,R,i+.13+k*.4,j+.1,.3,1.1,z,.68,['paper','coral','teal'][k],.5);oval(H,R,...H.p(i+.28+k*.4,j+1.21,z+.42),4,9,'paper',.6)}for(let k=0;k<3;k++)box(H,R,i+.08,j+.06,w-.12,1.1,z+2.19+k*.24,.19,k===1?'teal':'paper',.75)}
  else{box(H,R,i+.05,j+.1,w-.1,1.23,z,.65,'coral',.4);for(let k=0;k<3;k++){H.line(R,[H.p(i+.08,j+1.35,z+.18+k*.17),H.p(i+w-.05,j+1.35,z+.18+k*.17)],'blue',.7);H.dot(...H.p(i+w*.5,j+1.36,z+.24+k*.17),1.7,'sun')}for(let k=0;k<4;k++)vessel(H,R,i+.15+k*.3,j+.57,z+2.19,4,13,['sun','coral','paper','teal'][k],false)}
 });
 timber(H,R,8.2,1.65,3.3,1.4,1.11,.14,'sun');
 for(const x of [8.32,11.3]){
  metal(H,R,x,2.73,.1,.12,.06,1.05,'teal');
  H.line(R,[H.p(x,2.73,.16),H.p(x,1.64,1.05)],'blue',1.8);
 }
 metal(H,R,9.46,2.67,.76,.46,.15,.07,'blue');
 for(let n=0;n<6;n++)H.line(R,[H.p(9.51+n*.11,2.73,.24),H.p(9.51+n*.11,3.02,.24)],'paper',.8);
 stroke(H,R,[H.p(9.7,2.72,.18),H.p(9.53,2.18,.35),H.p(9.18,2.03,1.28)],'blue',1.2);
 bentTube(H,R,[[10.82,2.02,1.26],[10.82,2.02,2.68],[9.95,2.02,2.68]],1.6,'teal');
 for(const x of [10.25,10.75]){
  vessel(H,R,x,2.35,1.28,6,18,x<10.5?'coral':'paper',false);
  stroke(H,R,[H.p(x,2.35,1.72),H.p(10.54,2.02,2.67),H.p(9.91,2.05,2.58)],'blue',.6);
 }
 sewing(H,R,8.7,1.82,1.25);
 H.line(R,[H.p(8.32,1.95,.86),H.p(11.37,1.95,.86)],'blue',3);
 for(const x of [8.65,9.65,10.62]){const [px,py]=H.p(x,2,.55);shape(H,R,[[px-12,py-11],[px+12,py-11],[px+15,py+10],[px-13,py+12]],x<9?'paper':'coral',.55);stroke(H,R,[[px-6,py-10],[px-4,py-19],[px+5,py-19],[px+7,py-10]],'blue',1.3)}
 for(const x of [2.87,8.17])for(const y of [3.75,5.87])metal(H,R,x,y,.2,.18,.06,.23,'teal');
 timber(H,R,2.96,3.8,5.01,1.8,.34,.11,'teal');
 for(let n=0;n<4;n++){
   const x=3.32+n*1.12;
   box(H,R,x,4.06,.81,1.26,.46,.28,n%2?'paper':'coral',.45);
   H.line(R,[H.p(x+.12,5.34,.59),H.p(x+.64,5.34,.59)],'blue',1.6);
 }
 benchFrame(H,R,2.65,3.48,5.9,2.75,1.25,'sun');
 H.line(R,[H.p(2.66,3.7,1.27),H.p(8.54,3.7,1.27)],'blue',1);
 for(let n=0;n<22;n++)H.line(R,[H.p(2.8+n*.25,3.5,1.28),H.p(2.8+n*.25,3.5+(n%4?.09:.18),1.28)],'blue',.65);
 drape(H,R,2.71,5.03,2.93,1.13,1.28,.17,'paper');
 for(const x of [4.45,5.15,5.85,6.55]){
  const rib=[H.p(x,4.35,1.3),H.p(x,4.47,1.58),H.p(x,4.95,1.73),H.p(x,5.42,1.58),H.p(x,5.53,1.3)];
  H.line(R,rib,'blue',5.5);H.line(R,rib,'sun',3.5);H.line(R,rib.slice(1,4),'paper',5);
 }
 timber(H,R,4.3,4.89,2.57,.13,1.3,.17,'sun');
 for(const x of [4.5,6.5])metal(H,R,x,4.87,.25,.3,1.29,.15,'teal');
 taskLight(H,R,7.95,3.75,1.28,'coral',-.65);
 shape(H,R,H.tile(7.22,5.47,1.11,.82,1.27),'paper',1);
 for(let n=0;n<5;n++){const x=7.33+n*.18;H.line(R,[H.p(x,5.55,1.28),H.p(x,6.18,1.28)],'coral',1)}
 shape(H,R,H.tile(7.41,5.8,.7,.3,1.29),'teal',.3);
 for(const x of [7.45,7.79,8.07]){
  timber(H,R,x,5.53,.055,.61,1.29,.09,'paper');
  oval(H,R,...H.p(x+.12,5.69,1.31),3.2,1.8,'sun',.8);
  oval(H,R,...H.p(x+.12,5.69,1.32),1.5,.8,'blue',.8);
 }
 shape(H,R,[H.p(3.14,5.1,1.32),H.p(3.79,5.1,1.32),H.p(3.79,5.52,1.32),H.p(3.6,5.39,1.32),H.p(3.39,5.43,1.32),H.p(3.14,5.7,1.32)],'teal',.2);

 benchFrame(H,R,.53,8.9,2.52,1.7,.72,'sun');
 for(let n=0;n<3;n++)shape(H,R,H.tile(.7+n*.72,9.13,.56,1.06,.75),['paper','teal','coral'][n],.6);
 H.line(R,[H.p(.82,9.25,.77),H.p(.82,9.94,.77)],'blue',2);
 for(let n=0;n<8;n++)H.line(R,[H.p(1.56,9.27+n*.08,.78),H.p(1.86,9.27+n*.08,.78)],'paper',.7);
 oval(H,R,...H.p(2.61,9.65,.77),8,4,'sun',.6);
 const cut=(x,y,z)=>H.p(x,y,z);
 for(const [x,z,col] of [[.74,.81,'teal'],[.81,.86,'paper'],[.88,.91,'coral']]){
   shape(H,R,[cut(x,9.19,z),cut(x+.43,9.19,z),cut(x+.43,9.76,z),cut(x+.28,9.89,z+.13),cut(x,9.89,z+.13)],col,.62);
   H.line(R,[cut(x+.1,9.25,z+.02),cut(x+.1,9.77,z+.02)],'blue',.65);
 }
 const rope=H.p(2.62,9.65,.82);
 for(let n=0;n<4;n++)oval(H,R,rope[0]+n*2,rope[1]-n,7,3.3,'paper',1);
 H.line(R,[[rope[0]-4,rope[1]-6],[rope[0]+11,rope[1]+3]],'teal',2.1);
 shape(H,R,H.faceJ(.16,10.98,.67,1.24,2.14),'paper',1);
 for(const z of [1.43,1.66,1.9])H.line(R,[H.p(.18,11.1,z),H.p(.18,11.5,z)],'coral',1.2);
 H.dot(...H.p(.18,11.31,2.04),1.6,'sun');
 for(const x of [9.15,11.18])for(const y of [8.25,10.23])caster(H,R,x,y,.1);
 timber(H,R,9.12,8.22,2.15,2.1,.16,.12,'teal');
 shape(H,R,H.tile(9.23,8.32,1.93,1.87,.29),'blue',.56);
 for(const x of [9.12,11.1])timber(H,R,x,8.22,.17,2.1,.28,.58,'sun');
 for(const y of [8.22,10.15])timber(H,R,9.12,y,2.15,.17,.28,.58,'sun');
 for(const x of [9.23,10.97])metal(H,R,x,10.33,.17,.05,.42,.26,'blue');
 shape(H,R,[H.p(9.12,8.22,.86),H.p(11.27,8.22,.86),H.p(11.27,7.92,1.87),H.p(9.12,7.92,1.87)],'teal',.5);
 shape(H,R,[H.p(9.27,8.19,.99),H.p(11.11,8.19,.99),H.p(11.11,7.98,1.71),H.p(9.27,7.98,1.71)],'paper',1);
 H.line(R,[H.p(9.37,8.03,1.49),H.p(9.81,8.13,1.13),H.p(10.33,8.04,1.52),H.p(10.95,8.15,1.1)],'coral',2.2);
 for(let n=0;n<3;n++)drape(H,R,9.36,8.63,1.34,1.22,.4+n*.12,.05,n===1?'coral':'paper');
 drape(H,R,10.19,9.11,.83,1.13,.89,.32,'teal');
 const ribbon=H.p(9.68,9.42,.81);
 oval(H,R,...ribbon,10,5,'paper',1);oval(H,R,...ribbon,5,2.5,'blue',.6);
 stroke(H,R,[[ribbon[0]+8,ribbon[1]+2],[ribbon[0]+19,ribbon[1]+6],[ribbon[0]+24,ribbon[1]+17]],'paper',2.4);
 shape(H,R,H.tile(9.42,9.83,.58,.25,.85),'sun',.7);
 H.dot(...H.p(9.49,9.89,.87),1.2,'blue');
 metal(H,R,11.5,8.4,.16,3.3,.01,.035,'blue');
},(H,R,t)=>{
 const u=cycle(t,16)*16,travel=smooth(3.2,6.4,u)*(1-smooth(10.6,14,u));
 const lift=.5*smooth(.7,3.2,u)*(1-smooth(4.8,6.4,u))+.5*smooth(9.6,10.6,u)*(1-smooth(12.2,14,u));
 const i=mix(2.86,4.2,travel),j=mix(4.9,4.29,travel),z=1.3+lift;
 bag(H,R,i,j,z,.8*smooth(6.4,7.3,u)*(1-smooth(9,9.6,u)));
 const cast=[{p:makerPose,i:i+1.05,j:6.53,face:'se',name:'amsterdam-sailbag-maker',ink:'teal',targets:[[i+.79,j+1.24,z+.25],[i+1.1,j+1.24,z+.26]]},{p:customerPose,i:7.0,j:6.52,face:'sw',name:'amsterdam-sailbag-customer',ink:'coral',targets:[[6.57,5.52,1.44],[6.77,5.52,1.44]]}];
 for(const [n,c]of cast.entries()){
  const origin=H.p(c.i,c.j),scale=2.05,mirror=n?-1:1;
  Object.assign(c.p,base,{head:13});
  for(const [k,side]of ['l','r'].entries()){
   const q=H.p(...c.targets[k]),dx=(q[0]-origin[0])/scale*mirror-(k?1:-1)*5.2,dy=(q[1]-origin[1])/scale+32.5;
   const d=Math.min(8.54,Math.max(.2,Math.hypot(dx,dy))),a=4.368,b=4.2;
   c.p['a'+side]=(Math.atan2(dx,dy)-Math.acos(Math.max(-1,Math.min(1,(a*a+d*d-b*b)/(2*a*d)))))*180/Math.PI;
   c.p['e'+side]=180-Math.acos(Math.max(-1,Math.min(1,(a*a+b*b-d*d)/(2*a*b))))*180/Math.PI;
  }
  actor(H,R,c.i,c.j,u,c.name,{face:c.face,shirt:[c.ink,.66],apron:n?undefined:['paper',.9],skin:['coral',n?.5:.33],hairStyle:n?'curly':'bun'},0,scale);
 }
 const [x,y]=H.p(.25,8.0,2.55),s=Math.sin(u*Math.PI/8)*2;
 stroke(H,R,[[x,y],[x-9+s,y+11],[x-7+s,y+30],[x+8+s,y+29],[x+11+s,y+12],[x,y]],'blue',4.5);
 stroke(H,R,[[x,y],[x-9+s,y+11],[x-7+s,y+30],[x+8+s,y+29],[x+11+s,y+12],[x,y]],'paper',2.5);
});
room.loopSeconds=16;
room.stillTime=7;
export default room;
