import { world, shape, oval, stroke, actor, ell } from '../../worlds/common.js';
import { timber, metal, vessel, bentTube, drape, cushion, benchFrame } from '../materials.js';
import { basin, archedBay } from '../structure.js';
import { cornice, caster, hangingRail, recessedFrame } from '../joinery.js';

const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
function basket(H,R,i,j,z,w=1.8,d=1.25){const a=H.tile(i,j,w,d,z),b=H.tile(i-.08,j-.08,w+.16,d+.16,z+.56);shape(H,R,[a[0],a[1],a[2],a[3],b[3],b[2],b[1],b[0]],'sun',.55);shape(H,R,b,'blue',.4);for(let n=0;n<8;n++){const u=n/7;H.line(R,[H.p(i+w*u,j+d,z+.03),H.p(i-.08+(w+.16)*u,j+d+.08,z+.55)],'paper',1);}for(const h of[.13,.28,.43])H.line(R,[H.p(i,j+d+.04,z+h),H.p(i+w,j+d+.04,z+h)],'coral',.8);stroke(H,R,[H.p(i+.2,j+d/2,z+.55),H.p(i+.3,j+d/2,z+1.02),H.p(i+w-.3,j+d/2,z+1.02),H.p(i+w-.2,j+d/2,z+.55)],'sun',2.8);}
function sheet(H,R,t){const P=(u,z)=>H.p(4.35+u,.68+.03*Math.sin(u*3+t*Math.PI/8),z);const p=[P(0,3.75),P(4.56,3.75),P(4.56,1.27),P(3.8,1.35),P(3.2,1.22),P(2.4,1.32),P(1.6,1.23),P(.8,1.33),P(0,1.24)];shape(H,R,p,'paper',1);for(let u=.15;u<4.5;u+=.51){H.line(R,[P(u,3.72),P(u+.06,2.3),P(u,1.35)],'teal',2.2,{tone:.4});H.line(R,[P(u+.14,3.72),P(u+.17,2.3),P(u+.14,1.35)],'sun',1.5,{tone:.45});}H.line(R,[P(.05,1.38),P(4.5,1.4)],'blue',.8);shape(H,R,[P(3.28,1.83),P(3.79,1.83),P(3.79,2.3),P(3.28,2.3)],'paper',1);for(let u=3.28;u<3.8;u+=.1)H.line(R,[P(u,1.8),P(u,1.88)],'coral',.75);for(const u of[.13,1.32,3.25,4.42]){H.line(R,[P(u,3.63),P(u,3.9)],u===3.25?'coral':'sun',3.1);H.dot(...P(u,3.74),1.1,'blue');}}
const room=world('barcelona-linen-balcony','A breeze through the sheets',{wall:'paper',wallTone:.56,height:4.22,floor:'paper',tone:.45,head:65},(H,R)=>{
  for(const side of['nw','ne'])cornice(H,R,side,0,12,4.24,'teal');
  archedBay(H,R,'ne',1.1,10.2,.65,3.42,'teal',P=>{shape(H,R,[P(.17,.16),P(10,.16),P(10,3.22),P(.17,3.22)],'sun',.12);for(let u=.35;u<10;u+=1.3){H.line(R,[P(u,.2),P(u,1.1)],'teal',1.1,{tone:.35});shape(H,R,[P(u, .2),P(u+.78,.2),P(u+.78,.73),P(u,.73)],'coral',.16,.4);}});
  for(let i=.5;i<11.5;i+=.8){shape(H,R,H.tile(i,10.98,.74,.66,.03),'teal',.27);H.line(R,[H.p(i+.1,11.08,.04),H.p(i+.65,11.53,.04)],'sun',1.1);}
  shape(H,R,H.faceJ(.36,1.27,7.76,.2,3.83),'blue',.48);
  metal(H,R,.4,1.25,1.45,7.8,.05,.16,'teal');
  for(const j of[1.55,4.92]){
    shape(H,R,H.faceJ(1.74,j,1.23,.29,1.81),'teal',.51);
    for(let z=.42;z<1.64;z+=.17){shape(H,R,[H.p(1.76,j+.09,z),H.p(1.76,j+1.12,z),H.p(1.8,j+1.12,z+.1),H.p(1.8,j+.09,z+.1)],'paper',.75);}
    H.line(R,[H.p(1.82,j+1.06,.93),H.p(1.82,j+1.06,1.15)],'sun',2.8);
  }
  for(const j of[1.33,5.05,8.93])metal(H,R,1.64,j,.15,.12,.24,.12,'blue');
  for(const j of[1.3,5.1,8.85])timber(H,R,.3,j,1.37,.15,.21,3.64,'teal');
  timber(H,R,.26,1.27,1.51,7.75,3.76,.17,'teal');
  for(const z of[.82,1.9,2.83])timber(H,R,.38,1.4,1.33,7.37,z,.11,'sun');
  for(let n=0;n<6;n++){
    const j=1.52+n*1.15,w=n===2?.67:.94,d=n===4?.86:.7;
    if(n===1||n===4){
      for(let k=0;k<3;k++){const q=H.p(.99,j+.14+k*.23,3.08);oval(H,R,...q,8,7,n===1?'paper':'coral',.85);H.line(R,ell(...q,4,3),'teal',.8);}
    }else{
      for(let k=0;k<(n===3?3:2);k++)cushion(H,R,.6+k*.035,j+.06,w,d,2.97+k*.13,.1,k===1&&n!==0?'teal':'paper');
      for(const a of [.2,.7])H.line(R,[H.p(.65+a*w,j+.07,3.25),H.p(.65+a*w,j+d+.04,3.25)],n===5?'coral':'sun',1.7);
    }
  }
  basket(H,R,.57,2.92,.96,.99,.87);
  drape(H,R,.64,3.01,.78,.67,1.46,.24,'coral');
  for(let n=0;n<3;n++)cushion(H,R,.62,5.53,1.0,.84,.96+n*.13,.1,n===1?'teal':'paper');
  metal(H,R,.62,7.73,.9,.73,.96,.38,'paper');
  for(const j of [7.82,8.07,8.32])H.line(R,[H.p(1.53,j,1.01),H.p(1.53,j,1.31)],'coral',1.3);
  const brush=H.p(1.12,1.96,1.06);oval(H,R,...brush,11,5,'sun',.75);
  for(let n=-7;n<=7;n+=2)H.line(R,[[brush[0]+n,brush[1]+2],[brush[0]+n,brush[1]+8]],'blue',.7);
  metal(H,R,.72,2.18,.65,.38,.96,.18,'teal');
  shape(H,R,H.tile(.79,2.22,.5,.27,1.15),'paper',.9);

  for(const [j,n]of[[1.6,0],[3.3,1],[5.8,2],[7.5,3]]){vessel(H,R,.95,j,2.02,8,18,n%2?'paper':'sun');H.line(R,[H.p(.85,j,2.45),H.p(1.1,j,2.45)],'teal',3);}
  const apron=[H.p(1.77,4.4,2.84),H.p(1.77,5.01,2.84),H.p(1.77,5.15,1.83),H.p(1.77,4.28,1.83)];shape(H,R,apron,'coral',.47);H.line(R,[H.p(1.79,4.35,2.32),H.p(1.79,5.07,2.32)],'sun',1.4);
  const board=[H.p(1.72,6.82,.92),H.p(1.72,7.54,.92),H.p(1.2,7.54,1.72),H.p(1.2,6.82,1.72)];shape(H,R,board,'sun',.57);for(let n=0;n<6;n++){const f=n/6;H.line(R,[H.p(1.68-.43*f,6.91,.99+.65*f),H.p(1.68-.43*f,7.46,.99+.65*f)],'blue',1);}
  const spare=H.p(.96,3.46,2.82);for(let r=6;r<16;r+=3)H.outline(R,ell(...spare,r,r*.5),'sun',1.5);stroke(H,R,[[spare[0]+15,spare[1]],[spare[0]+20,spare[1]+9],[spare[0]+10,spare[1]+14]],'blue',1);
  const sewing=H.p(1.04,5.92,2.1);metal(H,R,.72,5.51,.53,.71,2.02,.11,'sun');for(const [dx,dy]of[[-5,-4],[3,-7],[7,-1]]){oval(H,R,sewing[0]+dx,sewing[1]+dy,2.8,4,'coral');H.line(R,[[sewing[0]+dx-3,sewing[1]+dy-4],[sewing[0]+dx+3,sewing[1]+dy-4]],'paper',1);}
  for(let j=1.5;j<4.7;j+=.21)H.line(R,[H.p(1.7,j,.3),H.p(1.7,j,.73)],'teal',1.7);basket(H,R,.55,5.3,.25,1.05,2.35);
  for(let j=7.92;j<8.72;j+=.17)H.line(R,[H.p(1.76,j,.29),H.p(1.76,j,1.76)],'teal',3);H.line(R,[H.p(1.81,8.46,.87),H.p(1.81,8.46,1.14)],'sun',2.6);
  for(const j of[2.2,4.6])metal(H,R,2.04,j,.2,.2,0,1.02,'blue');basin(H,R,1.95,2.02,1.41,2.94,1.02,'paper');bentTube(H,R,[[2.69,3.8,1.03],[2.69,3.8,.43],[2.18,3.8,.43],[2.18,3.8,.08]],2.8,'teal');
  metal(H,R,3.62,1.27,7.18,1.03,.58,.12,'teal');for(const i of[3.8,10.5])metal(H,R,i,1.36,.17,.17,.08,.55,'blue');
  for(let i=3.85;i<10.5;i+=.23)H.line(R,[H.p(i,1.38,.72),H.p(i,2.11,.72)],'blue',.75);
  bentTube(H,R,[[4.22,.68,3.88],[9.04,.68,3.88]],1.5,'blue');
  for(const i of[4.06,9.38]){metal(H,R,i,1.65,.24,.24,3.96,.18,'teal');const p=H.p(i,1.78,3.91);oval(H,R,...p,7,7,'sun');oval(H,R,...p,3.2,3.2,'blue');bentTube(H,R,[[i,.19,4.15],[i,1.9,4.15]],2.3,'teal');}
  bentTube(H,R,[[3.57,.58,4.07],[10.48,.58,4.07]],5.3,'sun');
  for(const i of[3.64,10.42]){metal(H,R,i,.38,.2,.63,3.96,.18,'teal');H.dot(...H.p(i+.1,1.04,4.03),1.6,'sun');}
  shape(H,R,[H.p(9.81,.75,3.83),H.p(10.75,.75,3.83),H.p(10.75,.75,2.77),H.p(9.81,.75,2.77)],'teal',.3);for(let z=2.86;z<3.75;z+=.13)H.line(R,[H.p(9.85,.77,z),H.p(10.72,.77,z)],'sun',1.3);
  bentTube(H,R,[[10.91,.41,.63],[11.45,.41,.63],[11.45,.41,.21]],2.4,'teal');metal(H,R,11.14,.55,.54,.85,.03,.06,'blue');for(let i=11.2;i<11.65;i+=.11)H.line(R,[H.p(i,.58,.11),H.p(i,1.33,.11)],'paper',.8);
  const cleat=H.p(9.68,3.28,1.75);H.line(R,[[cleat[0]-7,cleat[1]+5],[cleat[0]+7,cleat[1]-5]],'blue',3.5);H.line(R,[[cleat[0]-7,cleat[1]+2],[cleat[0]+7,cleat[1]-2]],'sun',1.5);
  benchFrame(H,R,6.1,8.05,3.8,1.65,.93,'teal');
  timber(H,R,6.32,8.29,3.28,1.12,.25,.1,'sun');
  metal(H,R,6.46,8.36,1.2,.94,.36,.39,'sun');for(let i=6.56;i<7.55;i+=.17)H.line(R,[H.p(i,9.32,.42),H.p(i,9.32,.68)],'blue',.8);cushion(H,R,7.98,8.48,1.3,.86,.36,.16,'paper');cushion(H,R,7.98,8.48,1.3,.86,.53,.13,'coral');
  for(const i of[6.3,9.54])bentTube(H,R,[[i,8.17,.85],[i,8.47,.53],[i,9.34,.4]],1.5,'sun');
drape(H,R,6.28,8.12,1.65,1.48,.94,.52,'paper');for(let n=0;n<3;n++)cushion(H,R,8.36,8.3,1.26,1.02,.95+n*.13,.12,n===1?'teal':'paper');
  basket(H,R,2.6,8.8,.08,2.12,1.44);cushion(H,R,2.71,8.97,1.79,1.07,.63,.16,'paper');
  for(const i of[2.58,4.69])caster(H,R,i,10.26);
  const boardTop=[[8.36,6.54],[9.21,6.54],[9.62,6.78],[9.77,7.11],[9.55,7.38],[8.36,7.38]];
  for(const i of[8.54,9.2]){bentTube(H,R,[[i,6.61,.06],[i,7.31,.91]],2.5,'teal');bentTube(H,R,[[i,7.37,.06],[i,6.67,.91]],2.5,'teal');H.dot(...H.p(i,6.98,.49),2.2,'sun');}
  shape(H,R,boardTop.map(([i,j])=>H.p(i,j,.91)),'sun',.6);shape(H,R,boardTop.map(([i,j])=>H.p(i,j,.98)),'paper',1);
  for(let i=8.45;i<9.52;i+=.21)H.line(R,[H.p(i,6.64,.995),H.p(i,7.28,.995)],'teal',.65,{tone:.42});
  const iron=H.p(9.07,7.05,1.06);shape(H,R,[[iron[0]-14,iron[1]+5],[iron[0]+12,iron[1]+5],[iron[0]+5,iron[1]-7],[iron[0]-12,iron[1]-5]],'paper',1);stroke(H,R,[[iron[0]-7,iron[1]-5],[iron[0]-6,iron[1]-13],[iron[0]+4,iron[1]-12],[iron[0]+5,iron[1]-6]],'blue',2);H.dot(iron[0]-7,iron[1]-1,2,'coral');
  stroke(H,R,[[iron[0]-12,iron[1]-4],H.p(8.49,6.77,1.03),H.p(8.2,6.65,.62),H.p(8.36,6.57,.51)],'blue',1.1);
  metal(H,R,8.17,6.65,.2,.44,.8,.1,'teal');
  const peg=H.p(7.82,8.84,1.03);shape(H,R,[[peg[0]-10,peg[1]-7],[peg[0]+11,peg[1]-5],[peg[0]+10,peg[1]+4],[peg[0]-9,peg[1]+3]],'sun',.6);for(const [dx,dy]of[[-5,-2],[2,0],[7,-2]]){H.line(R,[[peg[0]+dx,peg[1]+dy],[peg[0]+dx+2,peg[1]+dy-7]],'coral',2.3);H.dot(peg[0]+dx+1,peg[1]+dy-3,1,'blue');}
  const spring=H.p(8.03,9.2,.99);oval(H,R,...spring,3.5,2,'blue');H.line(R,[[spring[0]-4,spring[1]-2],[spring[0]+3,spring[1]+3]],'paper',1);
  stroke(H,R,[H.p(6.76,8.62,1.06),H.p(7.11,9.51,1.06),H.p(7.18,9.75,.65)],'sun',3);for(let n=0;n<5;n++)H.line(R,[H.p(6.78+n*.07,8.69+n*.15,1.08),H.p(6.88+n*.07,8.68+n*.15,1.08)],'blue',.7);
  hangingRail(H,R,'ne',9.6,1.1,2.92,2,(P,u,n)=>{shape(H,R,[P(u-.12,-.13),P(u+.12,-.13),P(u+.12,-.48),P(u+.3,-.48),P(u+.3,-.68),P(u-.12,-.68)],n?'coral':'paper',.9);});
  recessedFrame(H,R,'nw',10.1,1.15,1.28,1.49,'sun',P=>{shape(H,R,[P(.13,.13),P(1.02,.13),P(1.02,1.35),P(.13,1.35)],'paper',1);H.line(R,[P(.2,.22),P(.86,1.16)],'teal',1.5);});
},(H,R,time)=>{const t=((time%16)+16)%16,u=ease(3.2,6.4,t)*(1-ease(9.6,14,t)),z=3.44-u*1.15;sheet(H,R,t);
  for(let i=4.08;i<9.46;i+=.63)bentTube(H,R,[[i,1.9,z],[i,4.15,z]],2.8,'paper');for(const j of[1.9,4.15])bentTube(H,R,[[4.04,j,z],[9.5,j,z]],3.2,'blue');
  for(const i of[4.06,9.38]){stroke(H,R,[H.p(i,1.78,3.9),H.p(i,1.9,z)],'sun',1.3);stroke(H,R,[H.p(i,1.78,3.9),H.p(i,4.12,z)],'sun',1.3);}
  const grip=H.p(9.7,3.28,1.6+.25*u);for(const dx of[-2,2])stroke(H,R,[H.p(9.38,1.78,3.9),[grip[0]+dx,grip[1]-4],[grip[0]+dx,grip[1]+24-u*12]],'sun',1.6);
  actor(H,R,10.07,3.23,0,'hold',{face:'sw',shirt:['coral',.7],prop:(A,B,p)=>{stroke(A,B,[p.nearHand,grip],'coral',3.1);oval(A,B,...grip,2.5,2.5,'coral',.32);}},0,1.65);
  for(let n=0;n<6;n++)H.tint(H.tile(4.1+n*.8,4.3,.075,2.5-u*.6,.02),'blue',.15);
});
room.loopSeconds=16;
room.stillTime=8;
export default room;
