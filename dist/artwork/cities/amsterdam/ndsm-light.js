import { world, actor, shape, oval, stroke, ell, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, drape, cushion } from '../materials.js';
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
  for(const i of [1.6,8.0]){metal(H,R,i,1.0,.17,1.65,.06,.12,'blue');metal(H,R,i,1.46,.14,.16,.12,4.62,'teal');bentTube(H,R,[[i,1.15,.2],[i,1.49,1.5],[i,2.49,.17]],1.8,'teal');}
  const screen=[H.p(1.65,1.53,.64),H.p(8.05,1.53,.64),H.p(8.05,1.53,4.73),H.p(1.65,1.53,4.73)];shape(H,R,screen,'paper',1,1.2);H.tint(screen,'sun',.1);
  for(const z of [.64,4.73]){H.line(R,[H.p(1.59,1.55,z),H.p(8.12,1.55,z)],'blue',4);H.line(R,[H.p(1.61,1.56,z+.015),H.p(8.1,1.56,z+.015)],'paper',1.1);}
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
  for(const i of [4.9,6.25])for(const j of [4.4,5.62])bentTube(H,R,[[i,j,.03],[5.7,5.0,1.06]],3,'teal');
  metal(H,R,5.48,4.78,.44,.44,.68,.52,'blue');oval(H,R,...H.p(5.7,5,1.25),47,24,'sun',.7);oval(H,R,...H.p(5.7,5,1.34),44,21,'teal',.65);oval(H,R,...H.p(5.7,5,1.46),19,9,'paper',1);
  metal(H,R,6.24,5.63,.35,.28,1.22,.17,'coral');
  H.outline(R,H.tile(6.7,8.52,1.09,.89,.021),'paper',1,{tone:.35});
  metal(H,R,6.02,8.3,.83,.82,.02,.17,'blue');bentTube(H,R,[[6.05,8.51,.19],[6.05,8.51,.96],[6.73,8.51,.96],[6.73,8.51,.19]],3.1,'teal');
  const [lx,ly]=H.p(...lamp);shape(H,R,[[lx-16,ly+7],[lx-13,ly-10],[lx+12,ly-15],[lx+17,ly+4]],'blue',.85,1);oval(H,R,lx,ly-7,12,8,'sun',.85);oval(H,R,lx,ly-7,7,4.6,'paper',1);H.glow(lx,ly-6,36,25,'sun',.34);
  stroke(H,R,[H.p(6.4,8.5,.14),H.p(7.4,8.63,.02),H.p(8.33,7.16,.02),H.p(8.35,2.6,.02),H.p(9.0,1.92,.04)],'blue',2);
  timber(H,R,1.2,8.2,3.5,1.82,.08,.22,'sun');shape(H,R,H.tile(1.34,8.33,3.22,1.54,.31),'blue',.35,.6);
  for(let n=0;n<3;n++){const [x,y]=H.p(1.77+n*.91,8.85,.34);shape(H,R,[[x-12,y+6],[x+14,y+6],[x+12,y-17],[x-12,y-13]],n===0?'paper':n===1?'coral':'teal',n===0?1:.26,.6);if(n===0)shape(H,R,[[x-5,y],[x+6,y],[x+1,y-9]],'blue',.5,.5);if(n===1){H.line(R,[[x-10,y-11],[x-10,y-19]],'blue',2.5);H.dot(x-10,y-19,2,'sun');}if(n===2)H.line(R,[[x-8,y-10],[x+7,y+2]],'paper',2);}
  metal(H,R,8.7,8.05,2.6,2.24,.04,.16,'teal');cushion(H,R,8.84,8.2,2.3,1.95,.21,.23,'paper');
  const [fx,fy]=H.p(9.93,9.12,.46);shape(H,R,[[fx-32,fy+8],[fx+32,fy+8],[fx+42,fy-6],[fx+13,fy-12],[fx+4,fy-33],[fx-18,fy-15],[fx-37,fy-19]],'blue',.22,.7);drape(H,R,10.83,8.3,.42,1.62,.62,.46,'coral');
  timber(H,R,8.72,10.56,2.55,.14,.06,.95,'sun');shape(H,R,H.faceI(8.87,10.71,2.25,.2,.89),'paper',1,.6);
},(H,R,t)=>{
  const {turn}=state(t),angle=.64-turn*.56;
  const Q=[H.p(1.72,1.535,.7),H.p(7.98,1.535,.7),H.p(7.98,1.535,4.67),H.p(1.72,1.535,4.67)];
  H.clip(Q,()=>{const [cx,cy]=H.p(4.68,1.54,2.55);H.glow(cx,cy,166,145,'sun',.2);for(const face of faces){const shadow=face.map(([u,v])=>{const p=solid(u,v,angle),k=(1.54-lamp[1])/(p[1]-lamp[1]);return H.p(lamp[0]+(p[0]-lamp[0])*k,1.54,lamp[2]+(p[2]-lamp[2])*k);});shape(H,R,shadow,'blue',.74,.5);}});
  for(const face of faces){const q=face.map(([u,v])=>H.p(...solid(u,v,angle)));shape(H,R,q,'blue',.82,.8);H.line(R,q.slice(1,3),'paper',1.1);}
  const seam=[solid(-.75,.56,angle),solid(-.61,.79,angle)];H.line(R,seam.map(p=>H.p(...p)),'coral',2);for(let k=0;k<3;k++){const p=solid(-.75+k*.045,.56+k*.074,angle);H.dot(...H.p(...p),1,'sun');}
  bentTube(H,R,[[5.7,5,1.34],[5.7,5,1.58]],3,'sun');
  const grip=H.p(6.35+turn*.05,5.72,1.32);artist(H,R,t,grip);
  const [x,y]=H.p(.27,9.1,2.54),s=Math.sin(t/T*TAU)*2;stroke(H,R,[[x,y],[x-8+s,y+10],[x+s,y+21],[x+9+s,y+10],[x,y]],'coral',1.1);
});
room.loopSeconds=T;room.stillTime=11;
export default room;
