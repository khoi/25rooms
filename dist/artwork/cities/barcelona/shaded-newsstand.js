import { world, shape, oval, stroke, actor, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, drape, cushion } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { recessedFrame, cornice, caster, wallRack, taskLight } from '../joinery.js';

const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
function cover(H,R,P,u,z,w=.58,h=.73,n=0){shape(H,R,[P(u,z),P(u+w,z),P(u+w,z+h),P(u,z+h)],'paper',1);shape(H,R,[P(u+.05,z+.07),P(u+w-.05,z+.07),P(u+w-.05,z+h-.08),P(u+.05,z+h-.08)],['coral','sun','teal'][n%3],.45);const p=P(u+w*.53,z+h*.62);oval(H,R,...p,3.5,3.5,'sun');shape(H,R,[P(u+.08,z+.1),P(u+w-.08,z+.1),P(u+w*.63,z+h*.48),P(u+w*.36,z+h*.32)],'blue',.6,.4);}
function paperStack(H,R,i,j,z,w,d,n=5){for(let k=0;k<n;k++)metal(H,R,i+(k%2)*.03,j-k*.012,w,d,z+k*.032,.023,'paper');H.line(R,[H.p(i+w*.52,j,z+n*.032),H.p(i+w*.52,j+d,z+n*.032)],'coral',1.8);}
const room=world('barcelona-shaded-newsstand','The awning finds shade',{wall:'paper',wallTone:.48,oneWall:true,height:3.8,floor:'paper',tone:.4,head:50},(H,R)=>{
  for(let i=.7;i<12;i+=1.15)H.line(R,[H.p(i,0),H.p(i,12)],'blue',.5,{tone:.24});for(let j=.5;j<12;j+=1.15)H.line(R,[H.p(0,j),H.p(12,j)],'blue',.5,{tone:.24});
  recessedFrame(H,R,'ne',9.32,2.14,.49,2.93,'teal',P=>{shape(H,R,[P(.13,.13),P(2.01,.13),P(2.01,2.79),P(.13,2.79)],'blue',.55);for(const v of[.66,1.55,2.4]){H.line(R,[P(.14,v),P(1.98,v)],'sun',3);if(v<2){for(let n=0;n<2;n++){const u=.27+n*.86;shape(H,R,[P(u,v+.07),P(u+.68,v+.07),P(u+.68,v+.68),P(u,v+.68)],n?'paper':'sun',.68);H.line(R,[P(u+.32,v+.08),P(u+.32,v+.67)],'coral',1.2);}}else{const p=P(1.12,v+.2);oval(H,R,...p,12,6,'paper',1);oval(H,R,...p,4,2,'blue');}}});
  metal(H,R,9.26,.21,2.24,.49,3.43,.12,'teal');
  for(let z=.56;z<3.19;z+=.16)H.line(R,[H.p(11.52,.48,z),H.p(11.78,.48,z)],'sun',1.8);
  timber(H,R,1.05,.5,7.45,1.75,0,.28,'teal');
  cabinetFrame(H,R,1.17,.65,7.08,1.42,.28,3.48,4,'teal',(i,j,w,d,z,h,n)=>{
    for(const h0 of[.42,1.44,2.47]){timber(H,R,i,j-.03,w,d+.13,z+h0,.08,'teal');const P=(u,v)=>H.p(i+u,j+.77,v);for(let q=0;q<2;q++)cover(H,R,P,.05+q*.76,z+h0+.08,.61,.73,(q+n+Math.round(h0))%3);}
    shape(H,R,H.faceI(i+.06,j+d+.08,w-.1,z+.07,z+.35),'teal',.42);H.line(R,[H.p(i+.45,j+d+.1,z+.2),H.p(i+.85,j+d+.1,z+.2)],'sun',2.1);
  });
  timber(H,R,1.02,2.09,7.46,.76,.19,.13,'teal');
  for(const i of[1.04,3.39,5.7,8.33])timber(H,R,i,2.1,.14,.7,.29,.71,'teal');
  for(const i of[1.24,3.55]){shape(H,R,H.faceI(i,2.85,2.03,.38,.93),'teal',.48);shape(H,R,H.faceI(i+.12,2.87,1.79,.47,.84),'teal',.24);H.line(R,[H.p(i+.62,2.9,.76),H.p(i+1.38,2.9,.76)],'sun',2.5);}
  shape(H,R,H.faceI(5.87,2.19,2.33,.32,.95),'blue',.7);
  for(const i of[5.91,7.5]){paperStack(H,R,i,2.35,.37,.56,.38,4);}
  timber(H,R,6.05,2.36,1.1,1.11,.82,.08,'sun');shape(H,R,H.tile(6.12,2.47,.95,.88,.91),'blue',.6);
  for(const j of[2.5,2.83,3.12])metal(H,R,6.17,j,.84,.06,.92,.09,'teal');
  for(const [i,j]of[[6.34,2.66],[6.68,2.65],[6.57,3.02]])oval(H,R,...H.p(i,j,.98),3.8,1.8,'sun');
  shape(H,R,H.faceI(6.01,3.5,1.19,.8,1.03),'teal',.62);H.line(R,[H.p(6.37,3.54,.94),H.p(6.87,3.54,.94)],'sun',2.3);
  timber(H,R,1,2.08,7.5,.7,1.03,.14,'sun');
  for(const i of[1.39,3.72,7.51])bentTube(H,R,[[i,2.16,1.21],[i,2.79,1.21],[i,2.85,1.1]],1.6,'blue');
  const weight=H.p(3.38,2.5,1.46);oval(H,R,...weight,7,3,'teal',.8);H.line(R,[[weight[0]-3,weight[1]],[weight[0]+3,weight[1]]],'paper',1);
  for(let n=0;n<3;n++){const P=(u,z)=>H.p(2.84+n*1.6+u,1.88,z);shape(H,R,[P(0,3.68),P(.42,3.68),P(.42,3.9),P(0,3.9)],'sun',.65);H.line(R,[P(.06,3.74),P(.35,3.74)],'blue',.8);}
  taskLight(H,R,7.68,2.31,1.2,'sun',.32);
  paperStack(H,R,1.3,2.2,1.19,1.22,.48);paperStack(H,R,3.02,2.21,1.19,1.28,.47,7);
  const fan=H.p(5.19,2.48,1.19);for(let n=0;n<5;n++)shape(H,R,[[fan[0]+n*4,fan[1]],[fan[0]-6+n*3,fan[1]-13-n],[fan[0]+3+n*4,fan[1]-17+n],[fan[0]+10+n*4,fan[1]-3]],n%2?'paper':'sun',.9,.6);
  metal(H,R,6.78,2.35,.24,.45,1.2,.13,'blue');metal(H,R,6.78,2.35,.24,.16,1.34,.11,'sun');
  for(const i of[1.1,8.19])metal(H,R,i,.61,.18,.18,.26,4.23,'teal');
  timber(H,R,1.06,.52,7.5,.18,3.79,.18,'sun');
  bentTube(H,R,[[.64,.46,4.19],[8.68,.46,4.19],[8.68,.46,.42],[9,.76,.3]],3.4,'teal');
  for(let i=1.2;i<8.5;i+=1.4){metal(H,R,i,.48,.2,.21,4.11,.21,'sun');}
  for(const i of[1.03,8.53]){metal(H,R,i,.64,.14,.37,3.91,.3,'blue');const p=H.p(i,.85,4.15);oval(H,R,...p,6,6,'sun');oval(H,R,...p,2.5,2.5,'teal');}
  shape(H,R,[H.p(.94,.33,4.36),H.p(8.71,.33,4.36),H.p(8.71,.96,4.26),H.p(.94,.96,4.26)],'teal',.65);H.line(R,[H.p(.94,.99,4.29),H.p(8.71,.99,4.29)],'paper',1.4);
  bentTube(H,R,[[8.69,.65,4.31],[8.99,.65,4.31],[8.99,.65,3.63]],2.8,'teal');
  wallRack(H,R,'nw',3.75,5.2,.4,2.77,3,'teal',(P,z,row)=>{for(let n=0;n<4;n++){const u=.25+n*1.17;if(row===0){shape(H,R,[P(u,z+.04),P(u+.9,z+.04),P(u+.9,z+.53),P(u,z+.53)],'sun',.44);H.line(R,[P(u+.15,z+.31),P(u+.73,z+.31)],'blue',1.2);}else cover(H,R,P,u,z+.06,.83,.7,n+row);}});
  for(const j of[4.1,8.2])timber(H,R,.18,j,.83,.2,0,.4,'teal');
  paperStack(H,R,.24,9.54,.04,1.68,1.2,9);bentTube(H,R,[[.7,10,.6],[.7,10,1.45],[1.75,10,1.45],[1.75,10,.22]],2,'blue');for(const i of[.62,1.87])caster(H,R,i,10.67);
  metal(H,R,8.6,2.84,.17,.16,.01,2.8,'teal');metal(H,R,10.8,4.02,.17,.16,.01,2.8,'teal');
  const P=(u,z)=>H.p(8.61+u,2.86+u*.53,z);shape(H,R,[P(0,.72),P(2.2,.72),P(2.2,2.7),P(0,2.7)],'teal',.66);
  for(let row=0;row<2;row++){for(let n=0;n<3;n++)cover(H,R,P,.13+n*.68,.85+row*.89,.55,.72,row+n);H.line(R,[P(.07,.81+row*.89),P(2.13,.81+row*.89)],'sun',2.5);}
  for(const z of[.92,2.46]){const p=P(.01,z);H.line(R,[[p[0],p[1]-6],[p[0],p[1]+6]],'sun',3);}
  bentTube(H,R,[[8.8,3.05,.05],[8.45,3.85,.04],[8.72,3.82,.75]],2.3,'blue');
  const foot=H.p(3.78,6.64,.1);oval(H,R,...foot,24,9,'blue',.5);metal(H,R,3.7,6.53,.17,.17,.1,2.47,'teal');
  for(const z of[.75,1.56]){
    const Q=(u,v)=>H.p(2.82+u,6.41+.21*v,z+v);
    shape(H,R,[Q(0,0),Q(1.88,0),Q(1.88,.81),Q(0,.81)],'teal',.47);
    for(let n=0;n<3;n++){cover(H,R,Q,.07+n*.61,.09,.51,.66,n+(z>1?1:0));H.line(R,[Q(.01+n*.61,.03),Q(.01+n*.61,.81)],'sun',1.2);}
    H.line(R,[Q(-.02,.03),Q(1.93,.03)],'blue',3.2);
    const W=(u,v)=>H.p(4.72+.18*v,6.42+u,z+v);
    shape(H,R,[W(0,0),W(1.27,0),W(1.27,.81),W(0,.81)],'teal',.57);for(let n=0;n<2;n++)cover(H,R,W,.07+n*.59,.1,.49,.65,n+1);H.line(R,[W(0,.02),W(1.3,.02)],'sun',2.6);
  }
  const head=H.p(3.8,6.63,2.62);oval(H,R,...head,4,3,'sun');
  metal(H,R,5.65,9.8,3.8,1.03,.92,.11,'sun');
  for(const i of[5.91,8.7])bentTube(H,R,[[i,9.9,.17],[i,10.33,.71]],1.9,'teal');
  timber(H,R,5.8,9.94,3.1,.36,.18,.07,'teal');paperStack(H,R,6,9.96,.27,1.78,.32,5);
  const cord=H.p(7.75,10.05,.34);oval(H,R,...cord,8,4,'sun',.7);oval(H,R,...cord,3,1.5,'blue');stroke(H,R,[[cord[0]+6,cord[1]],[cord[0]+12,cord[1]+5],[cord[0]+15,cord[1]+2]],'coral',1);
  metal(H,R,.38,8.93,.58,.53,.04,1.04,'teal');for(let n=0;n<3;n++){const p=H.p(.64,9.18,.15);stroke(H,R,[[p[0]+n*4,p[1]],[p[0]-8+n*4,p[1]-52],[p[0]-4+n*4,p[1]-59],[p[0]+n*4,p[1]-54]],n===1?'coral':'blue',2);}
for(const i of[5.88,8.72])metal(H,R,i,10.51,.13,.16,0,.94,'teal');paperStack(H,R,5.8,9.88,1.05,1.15,.71,3);paperStack(H,R,7.3,9.88,1.05,1.32,.71,2);
  const spread=H.p(8.13,10.27,1.18);shape(H,R,[[spread[0]-21,spread[1]-6],[spread[0]-2,spread[1]-2],[spread[0]+17,spread[1]-9],[spread[0]+20,spread[1]+6],[spread[0]+1,spread[1]+12],[spread[0]-19,spread[1]+7]],'paper',1);H.line(R,[[spread[0]-2,spread[1]-2],[spread[0]+1,spread[1]+12]],'blue',.9);shape(H,R,[[spread[0]-15,spread[1]-2],[spread[0]-6,spread[1]],[spread[0]-5,spread[1]+6],[spread[0]-14,spread[1]+4]],'teal',.5);for(const dy of[-2,1,4])H.line(R,[[spread[0]+4,spread[1]+dy],[spread[0]+14,spread[1]+dy-3]],'coral',.8);
  const bag=H.p(8.5,10.05,.42);shape(H,R,[[bag[0]-10,bag[1]-17],[bag[0]+10,bag[1]-17],[bag[0]+8,bag[1]+7],[bag[0]-8,bag[1]+7]],'coral',.6);stroke(H,R,[[bag[0]-6,bag[1]-15],[bag[0]-5,bag[1]-24],[bag[0]+5,bag[1]-24],[bag[0]+6,bag[1]-15]],'blue',1);
  const wind=H.p(7.8,1.4,3.8);H.line(R,[[wind[0],wind[1]+5],[wind[0],wind[1]-20]],'blue',1);for(let n=0;n<4;n++){const a=n*Math.PI/2;shape(H,R,[wind,[wind[0]+Math.cos(a)*13,wind[1]+Math.sin(a)*13],[wind[0]+Math.cos(a+.6)*8,wind[1]+Math.sin(a+.6)*8]],n%2?'coral':'paper',.9,.6);}
},(H,R,time)=>{
  const t=((time%22)+22)%22,u=ease(4.4,8.8,t)*(1-ease(13.2,20,t)),depth=1.08+u*1.06;
  H.tint(H.tile(1.2,1.2,7.4,depth+1.4,.02),'blue',.1+.05*u);
  for(let n=0;n<10;n++){const i=1.02+n*.76;shape(H,R,[H.p(i,.67,4.26),H.p(i+.76,.67,4.26),H.p(i+.76,.67+depth,3.82),H.p(i,.67+depth,3.82)],n%2?'paper':'coral',n%2?1:.57);shape(H,R,[H.p(i,.67+depth,3.82),H.p(i+.76,.67+depth,3.82),H.p(i+.76,.67+depth,3.55),H.p(i,.67+depth,3.55)],n%2?'paper':'coral',n%2?1:.68);}
  for(const i of[1.06,8.61])bentTube(H,R,[[i,.7,3.89],[i,1.47+depth*.33,3.26],[i,.65+depth,3.78]],2.4,'teal');
  bentTube(H,R,[[1.03,.65+depth,3.84],[8.63,.65+depth,3.84]],2.6,'blue');
  shape(H,R,[H.p(2.64,.67+depth,3.81),H.p(3.05,.67+depth,3.81),H.p(3.05,.67+depth,3.58),H.p(2.64,.67+depth,3.58)],'sun',.62);H.line(R,[H.p(2.72,.67+depth,3.59),H.p(2.96,.67+depth,3.79)],'paper',2);
  const socket=H.p(10.18,3.54,1.86),angle=u*Math.PI*2,grip=[socket[0]+Math.cos(angle)*9,socket[1]+Math.sin(angle)*9];stroke(H,R,[H.p(8.63,.7,4.2),socket,grip],'blue',2.4);oval(H,R,...socket,5,5,'sun');oval(H,R,...grip,3,3,'coral');
  actor(H,R,10.6,3.85,0,'hold',{face:'sw',shirt:['teal',.6],prop:(A,B,p)=>{stroke(A,B,[p.nearHand,grip],'coral',3);oval(A,B,...grip,2.5,2.5,'coral',.35);}},0,1.65);
  actor(H,R,10.25,7.25,u,'idle',{face:'sw',shirt:['sun',.72],prop:(A,B,p)=>{shape(A,B,[[p.nearHand[0]-7,p.nearHand[1]],[p.nearHand[0]+8,p.nearHand[1]-3],[p.nearHand[0]+8,p.nearHand[1]+10],[p.nearHand[0]-7,p.nearHand[1]+13]],'paper',1);}},0,1.6);
});
room.loopSeconds=22;
room.stillTime=11;
export default room;
