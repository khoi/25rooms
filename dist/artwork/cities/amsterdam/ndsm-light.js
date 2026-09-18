import { world, actor, shape, oval, stroke, ell, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, drape, cushion, benchFrame, vessel } from '../materials.js';
import { masonry } from '../structure.js';
import { windowBay, hangingRail, caster } from '../joinery.js';

const T=22;
const ease=(a,b,t)=>{const x=Math.max(0,Math.min(1,(t-a)/(b-a)));return x*x*(3-2*x);};
const state=t=>{const u=((t%T)+T)%T;return {u,turn:ease(4.4,8.8,u)*(1-ease(13.2,20,u))};};
const rest={x:0,y:0,drop:0,lean:0,head:0,al:20,ar:25,el:30,er:30,ll:-5,lr:5,kl:0,kr:0,roll:0};
const clip='amsterdamNdsmLightArtist';
FIGURES.clips[clip]={dur:T,keys:[[0,{...rest}],[1,{...rest}]]};
const faces=[[[ -.95,.05],[.8,.05],[1.12,.48],[-1.16,.48]],[[-1.16,.48],[-.92,1.13],[-.52,.97],[-.05,1.8],[-.17,.9],[-.42,.48]],[[.47,.48],[1.12,.48],[.76,.83],[-.05,1.8],[.22,.91]]];
const solid=(u,v,a)=>[5.7+u*Math.cos(a),5+u*Math.sin(a),1.48+v];
const lamp=[6.4,8.7,1.08];
function artist(H,R,t,target){const s=1.8,[x,y]=H.p(6.6,5.65),q={...rest,head:-state(t).turn*13};const dx=(target[0]-x)/s+5.2,dy=(target[1]-y)/s+32.5,a=4.368,b=4.2,c=Math.max(.2,Math.min(a+b-.001,Math.hypot(dx,dy))),e=Math.acos((c*c-a*a-b*b)/(2*a*b));q.al=(Math.atan2(dx,dy)-Math.atan2(b*Math.sin(e),a+b*Math.cos(e)))*180/Math.PI;q.el=e*180/Math.PI;FIGURES.clips[clip].keys=[[0,q],[1,q]];actor(H,R,6.6,5.65,t,clip,{shirt:['coral',.78],pants:['blue',.78],hairStyle:'curly',skin:['coral',.45]},0,s);}
const room=world('amsterdam-ndsm-light','The shadow is bigger',{floor:'blue',tone:.3,wall:false,head:80},(H,R)=>{
  masonry(H,R,'nw',0,12,0,4.9,'teal',.35);masonry(H,R,'ne',0,12,0,4.9,'blue',.4);
  windowBay(H,R,'nw',.55,7.0,3.76,.9,{ink:'teal',divisions:5,view:P=>{shape(H,R,[P(.1,.13),P(6.9,.13),P(6.9,.78),P(.1,.78)],'paper',1,.4);for(let n=0;n<7;n++)H.line(R,[P(n+.3,.14),P(n+.5,.67)],'teal',.5);}});
  for(const z of [4.73,5.24])metal(H,R,.12,.3,11.45,.14,z,.14,'blue');
  for(let i=.2;i<11.1;i+=1.5){bentTube(H,R,[[i,.39,4.85],[i+.73,.39,5.23],[i+1.4,.39,4.85]],2.5,'teal');H.dot(...H.p(i+.73,.4,5.23),2,'sun');}
  bentTube(H,R,[[11.2,.25,.17],[11.2,.25,4.34],[6.45,.25,4.34]],1.6,'paper');for(let z=.7;z<4.3;z+=.85)metal(H,R,11.1,.21,.24,.1,z,.055,'sun');
  for(const i of [.18,8.44,11.65]){
    metal(H,R,i,.14,.18,.32,.04,4.72,'teal');
    for(const z of [.28,3.65,4.62]){metal(H,R,i-.09,.43,.36,.09,z,.18,'blue');for(const dx of [-.04,.22])H.dot(...H.p(i+dx,.54,z+.09),1.5,'sun');}
  }
  metal(H,R,.19,7.43,.26,3.85,3.53,.19,'blue');
  for(const j of [7.65,10.8]){const [x,y]=H.p(.45,j,3.62);oval(H,R,x,y,7,7,'sun',.66);oval(H,R,x,y,3,3,'blue',.8);H.line(R,[[x,y+6],[x,y+17]],'teal',2);}
  shape(H,R,H.faceJ(.22,10.82,1.08,.08,3.4),'teal',.36,.8);
  for(let n=0;n<6;n++)H.line(R,[H.p(.28,10.95+n*.15,.16),H.p(.28,10.95+n*.15,3.3)],'blue',1.1);
  metal(H,R,.31,11.4,.1,.33,1.4,.54,'sun');
  for(const i of [1.6,8.0]){metal(H,R,i,1.0,.17,1.65,.06,.12,'blue');metal(H,R,i,1.46,.14,.16,.12,4.62,'teal');bentTube(H,R,[[i,1.15,.2],[i,1.49,1.5],[i,2.49,.17]],1.8,'teal');}
  const screen=[H.p(1.65,1.53,.64),H.p(8.05,1.53,.64),H.p(8.05,1.53,4.73),H.p(1.65,1.53,4.73)];shape(H,R,screen,'paper',1,1.2);H.tint(screen,'sun',.1);
  for(const z of [.64,4.73]){H.line(R,[H.p(1.59,1.55,z),H.p(8.12,1.55,z)],'blue',4);H.line(R,[H.p(1.61,1.56,z+.015),H.p(8.1,1.56,z+.015)],'paper',1.1);}
  for(const i of [1.62,8.07]){
    H.line(R,[H.p(i,1.54,.61),H.p(i,1.54,4.77)],'teal',5);
    for(let n=0;n<10;n++){
      const z=.84+n*.39;
      const inner=i<2?i+.12:i-.12,outer=i<2?i-.1:i+.1;
      stroke(H,R,[H.p(outer,1.56,z),H.p(inner,1.56,z+.14),H.p(outer,1.56,z+.28)],'sun',1.1);
      H.dot(...H.p(inner,1.57,z+.14),1.2,'blue');
    }
  }
  for(const i of [1.68,7.97]){
    metal(H,R,i-.24,1.04,.52,1.82,.04,.12,'blue');
    metal(H,R,i-.17,1.44,.38,.27,.21,.39,'teal');
    H.line(R,[H.p(i,1.15,.2),H.p(i,1.51,.82)],'paper',2);
  }
  for(let n=0;n<13;n++){const i=1.83+n*.5;H.line(R,[H.p(i,1.55,.7),H.p(i,1.55,.83)],'coral',.65);H.line(R,[H.p(i,1.55,4.58),H.p(i,1.55,4.68)],'coral',.65);}
  shape(H,R,H.faceI(7.32,1.56,.39,1.03,1.53),'sun',.19,.5);for(let n=0;n<4;n++)H.line(R,[H.p(7.3,1.57,1.08+n*.11),H.p(7.75,1.57,1.08+n*.11)],'paper',.65);
  for(const i of [9.0,11.35])for(const j of [.55,2.3])metal(H,R,i,j,.1,.1,.08,3.74,'teal');
  for(const z of [.18,1.2,2.33,3.67]){metal(H,R,8.95,.5,2.56,1.95,z,.1,'teal');H.line(R,[H.p(9.0,.5,z+.11),H.p(11.47,.5,z+.11)],'paper',1);}
  for(let n=0;n<5;n++){const i=9.15+n*.43;const q=[H.p(i,.72,.29),H.p(i,1.85,.29),H.p(i,1.72,1.09),H.p(i,.85,1.19)];shape(H,R,q,n%2?'paper':'coral',n%2?1:.65,.6);}
  for(let n=0;n<3;n++){metal(H,R,9.08+n*.79,.68,.68,1.25,1.33,.53,['coral','teal','sun'][n]);H.line(R,[H.p(9.25+n*.79,1.95,1.62),H.p(9.59+n*.79,1.95,1.62)],'paper',1.5);}
  for(let n=0;n<3;n++){const [x,y]=H.p(9.34+n*.76,1.27,2.5);shape(H,R,[[x-12,y],[x+11,y],[x+13,y-17],[x-7,y-30],[x-5,y-12]],n===1?'sun':'paper',n===1?.5:1,.7);shape(H,R,[[x-3,y-8],[x+5,y-10],[x+1,y-18]],'blue',.65,.5);}
  for(let n=0;n<3;n++)metal(H,R,9.13+n*.75,.71,.64,1.16,3.81,.39,n%2?'paper':'teal');
  hangingRail(H,R,'nw',8.1,2.8,3.2,4,(P,u,n)=>{stroke(H,R,[P(u,-.12),P(u-.25,-.5),P(u,-.8),P(u+.24,-.55),P(u,-.12)],n===1?'coral':'blue',2);});
  timber(H,R,.18,1.3,.77,5.55,.08,.54,'teal');
  timber(H,R,.14,1.25,.9,5.66,.62,.12,'sun');
  for(let n=0;n<4;n++){const j=1.46+n*1.33;shape(H,R,H.faceJ(.98,j,1.17,.17,.57),'paper',1,.55);H.line(R,[H.p(1.0,j+.4,.4),H.p(1.0,j+.76,.4)],'coral',1.4);}
  for(let n=0;n<3;n++){const j=1.7+n*1.65,P=(u,z)=>H.p(.17,j+u,z);shape(H,R,[P(0,1.18),P(1.2,1.18),P(1.2,2.78),P(0,2.78)],'sun',.54,.8);shape(H,R,[P(.07,1.25),P(1.13,1.25),P(1.13,2.71),P(.07,2.71)],'paper',1,.5);shape(H,R,[P(.18,1.47),P(.99,1.47),P(.81,1.81),P(.3,2.49),P(.53,1.81)],n===1?'coral':'blue',.55,.5);H.line(R,[P(.12,2.03),P(1.07,2.43)],'teal',.65);for(const u of [.13,1.05])H.dot(...P(u,2.63),1.3,'coral');}
  benchFrame(H,R,1.18,3.13,1.72,3.33,1.14,'sun');
  timber(H,R,1.31,3.31,1.43,2.99,.32,.1,'teal');
  for(let n=0;n<3;n++){
    const j=3.52+n*.88;
    shape(H,R,H.faceJ(2.9,j,.73,.48,.92),'paper',1,.5);
    H.line(R,[H.p(2.94,j+.23,.69),H.p(2.94,j+.5,.69)],'coral',1.6);
  }
  shape(H,R,H.tile(1.29,3.25,1.45,1.12,1.16),'blue',.57,.5);
  const [vx,vy]=H.p(2.42,4.63,1.16);
  metal(H,R,2.1,4.42,.67,.46,1.16,.18,'teal');
  metal(H,R,2.08,4.35,.17,.62,1.34,.29,'blue');metal(H,R,2.59,4.35,.17,.62,1.34,.29,'teal');
  H.line(R,[[vx-9,vy-18],[vx+22,vy-6]],'sun',2.4);H.line(R,[[vx+22,vy-14],[vx+22,vy+4]],'blue',2.2);
  shape(H,R,[H.p(2.32,4.64,1.49),H.p(2.47,4.64,1.49),H.p(2.66,4.64,2.18),H.p(2.21,4.64,2.02)],'paper',1,.8);
  vessel(H,R,1.66,5.23,1.15,8,15,'coral');
  for(let n=0;n<4;n++)H.line(R,[H.p(1.58+n*.08,5.23,1.49),H.p(1.5+n*.16,5.23,1.97)],n%2?'blue':'sun',1.5);
  const [fx0,fy0]=H.p(2.18,5.83,1.18);shape(H,R,[[fx0-16,fy0],[fx0+13,fy0],[fx0+15,fy0-16],[fx0-8,fy0-22],[fx0-7,fy0-8]],'paper',1,.7);H.line(R,[[fx0-12,fy0+3],[fx0+15,fy0+8]],'coral',2.2);
  drape(H,R,1.44,6.04,.87,.41,1.17,.47,'paper');
  for(const i of [4.9,6.25])for(const j of [4.4,5.62])bentTube(H,R,[[i,j,.03],[5.7,5.0,1.06]],3,'teal');
  metal(H,R,5.48,4.78,.44,.44,.68,.52,'blue');oval(H,R,...H.p(5.7,5,1.25),47,24,'sun',.7);oval(H,R,...H.p(5.7,5,1.34),44,21,'teal',.65);oval(H,R,...H.p(5.7,5,1.46),19,9,'paper',1);
  const [bearingX,bearingY]=H.p(5.7,5,1.2);
  for(let n=0;n<10;n++){const a=n/10*TAU;H.dot(bearingX+Math.cos(a)*39,bearingY+Math.sin(a)*18,1.7,'paper');}
  bentTube(H,R,[[5.32,4.96,.7],[5.32,4.96,1.17]],2,'sun');
  metal(H,R,6.24,5.63,.35,.28,1.22,.17,'coral');
  H.outline(R,H.tile(6.7,8.52,1.09,.89,.021),'paper',1,{tone:.35});
  metal(H,R,6.02,8.3,.83,.82,.02,.17,'blue');bentTube(H,R,[[6.05,8.51,.19],[6.05,8.51,.96],[6.73,8.51,.96],[6.73,8.51,.19]],3.1,'teal');
  const [lx,ly]=H.p(...lamp);
  shape(H,R,[[lx-17,ly+8],[lx-18,ly-10],[lx+10,ly-25],[lx+23,ly-8],[lx+18,ly+11]],'blue',.8,1);
  oval(H,R,lx+4,ly-10,18,13,'teal',.8);oval(H,R,lx+4,ly-10,13,9,'sun',.8);oval(H,R,lx+4,ly-10,8,5.5,'paper',1);
  for(const pts of [[[lx-12,ly-21],[lx-22,ly-32],[lx+4,ly-36],[lx+12,ly-23]],[[lx+17,ly-16],[lx+31,ly-22],[lx+35,ly-1],[lx+20,ly+2]],[[lx-9,ly],[lx-16,ly+14],[lx+17,ly+17],[lx+16,ly+2]]])shape(H,R,pts,'blue',.67,.7);
  H.dot(lx-19,ly+1,4,'coral');H.dot(lx-19,ly+1,1.4,'sun');
  H.line(R,[[lx-15,ly-8],[lx-10,ly-13]],'paper',1.3);H.glow(lx+4,ly-10,37,26,'sun',.36);
  stroke(H,R,[H.p(6.4,8.5,.14),H.p(7.4,8.63,.02),H.p(8.33,7.16,.02),H.p(8.35,2.6,.02),H.p(9.0,1.92,.04)],'blue',2);
  benchFrame(H,R,1.24,8.49,3.68,2.0,.81,'teal');
  timber(H,R,1.41,8.65,3.34,1.66,.28,.1,'sun');
  for(let n=0;n<4;n++)timber(H,R,1.58+n*.74,8.88,.62,1.09,.39,.16,n%2?'paper':'coral');
  shape(H,R,H.tile(1.39,8.63,3.36,1.7,.83),'blue',.43,.6);
  for(let n=0;n<3;n++){
    const i=1.66+n*1.03;
    metal(H,R,i,8.92,.75,.62,.85,.09,'teal');
    for(const x of [i+.09,i+.62])bentTube(H,R,[[x,9.19,.94],[x,9.19,2.1]],1.8,'sun');
    const P=(u,z)=>H.p(i+u,9.2,z);
    const q=[P(.01,1.17),P(.72,1.17),P(.72,1.99),P(.01,1.99)];
    shape(H,R,q,n===1?'coral':n===2?'teal':'paper',n===0?1:.35,.7);
    if(n===0)shape(H,R,[P(.14,1.33),P(.61,1.34),P(.51,1.77),P(.26,1.86)],'blue',.85,.5);
    if(n===1)H.line(R,[P(.05,1.26),P(.65,1.91)],'paper',2);
    if(n===2){H.line(R,[P(.1,1.27),P(.24,1.79)],'paper',2.6);H.line(R,[P(.35,1.6),P(.49,1.91)],'paper',1.3);}
    for(const u of [.03,.67])metal(H,R,i+u,9.13,.1,.12,1.9,.15,'blue');
  }
  const [wx,wy]=H.p(2.16,10.04,.85);stroke(H,R,[[wx-16,wy],[wx-19,wy-20],[wx-2,wy-31],[wx+17,wy-15],[wx+12,wy],[wx-16,wy]],'sun',2.2);stroke(H,R,[[wx-14,wy-3],[wx+15,wy-17],[wx-3,wy-27],[wx-14,wy-3]],'paper',1.1);
  metal(H,R,3.13,9.88,.94,.5,.86,.03,'paper');H.line(R,[H.p(3.18,9.93,.91),H.p(3.93,10.28,.91)],'teal',2);
  const [clipX,clipY]=H.p(4.4,10.12,.87);oval(H,R,clipX,clipY,6,4,'coral',.66);H.line(R,[[clipX-5,clipY-2],[clipX+7,clipY+4]],'sun',1.3);
  metal(H,R,8.7,8.05,2.6,2.24,.04,.16,'teal');cushion(H,R,8.84,8.2,2.3,1.95,.21,.23,'paper');
  const [fx,fy]=H.p(9.93,9.12,.46);shape(H,R,[[fx-32,fy+8],[fx+32,fy+8],[fx+42,fy-6],[fx+13,fy-12],[fx+4,fy-33],[fx-18,fy-15],[fx-37,fy-19]],'blue',.22,.7);drape(H,R,10.83,8.3,.42,1.62,.62,.46,'coral');
  for(const i of [8.83,10.91]){
    metal(H,R,i,8.24,.21,1.71,.26,.09,'teal');
    H.line(R,[H.p(i+.1,8.38,.38),H.p(i+.1,9.73,.38)],'sun',2.2);
  }
  for(const i of [9.2,10.46]){
    bentTube(H,R,[[i,8.6,.29],[i,8.6,.7],[i+.22,8.85,.75]],2.3,'teal');
    H.dot(...H.p(i+.22,8.85,.75),3.2,'paper');
  }
  timber(H,R,8.72,10.56,2.55,.14,.06,.95,'sun');shape(H,R,H.faceI(8.87,10.71,2.25,.2,.89),'paper',1,.6);
},(H,R,t)=>{
  const {turn}=state(t),angle=.64-turn*.56;
  const Q=[H.p(1.72,1.535,.7),H.p(7.98,1.535,.7),H.p(7.98,1.535,4.67),H.p(1.72,1.535,4.67)];
  H.clip(Q,()=>{const [cx,cy]=H.p(4.68,1.54,2.55);H.glow(cx,cy,166,145,'sun',.2);for(const face of faces){const shadow=face.map(([u,v])=>{const p=solid(u,v,angle),k=(1.54-lamp[1])/(p[1]-lamp[1]);return H.p(lamp[0]+(p[0]-lamp[0])*k,1.54,lamp[2]+(p[2]-lamp[2])*k);});shape(H,R,shadow,'blue',.74,.5);}});
  for(const face of faces){const q=face.map(([u,v])=>H.p(...solid(u,v,angle)));shape(H,R,q,'blue',.82,.8);H.line(R,q.slice(1,3),'paper',1.1);}
  const seam=[solid(-.75,.56,angle),solid(-.61,.79,angle)];H.line(R,seam.map(p=>H.p(...p)),'coral',2);for(let k=0;k<3;k++){const p=solid(-.75+k*.045,.56+k*.074,angle);H.dot(...H.p(...p),1,'sun');}
  bentTube(H,R,[[5.7,5,1.34],[5.7,5,1.58]],3,'sun');
  for(const u of [-.38,.38]){
    const a=solid(u,.07,angle),b=solid(u,.22,angle);
    H.line(R,[H.p(...a),H.p(...b)],'sun',3.2);H.dot(...H.p(...b),1.4,'paper');
  }
  const grip=H.p(6.35+turn*.05,5.72,1.32);artist(H,R,t,grip);
  const [x,y]=H.p(.27,9.1,2.54),s=Math.sin(t/T*TAU)*2;stroke(H,R,[[x,y],[x-8+s,y+10],[x+s,y+21],[x+9+s,y+10],[x,y]],'coral',1.1);
});
room.loopSeconds=T;room.stillTime=11;
export default room;
