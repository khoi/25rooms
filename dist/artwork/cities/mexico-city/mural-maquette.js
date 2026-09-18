import { world, shape, stroke, oval, ell, actor, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, drape, vessel, slattedSeat, pendant } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { windowBay, taskLight, caster } from '../joinery.js';

const ease=(a,b,t)=>{const q=Math.max(0,Math.min(1,(t-a)/(b-a)));return q*q*(3-2*q);};
const base=FIGURES.sample('idle',0);
FIGURES.clips.mexicoMuralSteady={dur:20,keys:[[0,{...base,al:88,el:35,ar:58,er:48,head:9}],[.2,{...base,al:88,el:35,ar:58,er:48,head:9}],[.5,{...base,al:88,el:35,ar:118,er:2,head:-10}],[.65,{...base,al:88,el:35,ar:118,er:2,head:-10}],[.9,{...base,al:88,el:35,ar:58,er:48,head:9}],[1,{...base,al:88,el:35,ar:58,er:48,head:9}]]};
FIGURES.clips.mexicoMuralLeaf={dur:20,keys:[[0,{...base,al:-72,el:-40,ar:-30,er:-45,head:8}],[.2,{...base,al:-72,el:-40,ar:-30,er:-45,head:8}],[.4,{...base,al:-80,el:-30,ar:-40,er:-35,head:-4}],[.6,{...base,al:-80,el:-30,ar:-40,er:-35,head:-4}],[.9,{...base,al:-72,el:-40,ar:-30,er:-45,head:8}],[1,{...base,al:-72,el:-40,ar:-30,er:-45,head:8}]]};

function painting(H,R,P,w,h,side=0) {
  shape(H,R,[P(0,0),P(w,0),P(w,h),P(0,h)],'paper',1,1.1);
  H.clip([P(.06,.06),P(w-.06,.06),P(w-.06,h-.06),P(.06,h-.06)],()=>{
    shape(H,R,[P(-.1,.2),P(w,.2),P(w,h*.6),P(w*.68,h*.75),P(w*.38,h*.34),P(w*.12,h*.62),P(-.1,h*.35)],'teal',.65);
    shape(H,R,[P(-.2,h*.47),P(w*.22,h*.57),P(w*.55,h*.38),P(w+.1,h*.75),P(w+.1,h*.54),P(w*.5,h*.18),P(w*.18,h*.36),P(-.2,h*.25)],'coral',.8);
    const sun=[];for(let n=0;n<24;n++){const a=n*TAU/24;sun.push(P(w*.63+Math.cos(a)*.36,h*.76+Math.sin(a)*.34));}shape(H,R,sun,'sun',.9);
    const cx=side?w*.42:w*.25;
    shape(H,R,[P(cx-.25,.12),P(cx+.24,.12),P(cx+.35,.89),P(cx+.1,1.11),P(cx-.18,.86)],'blue',.7);
    const head=[];for(let n=0;n<20;n++){const a=n*TAU/20;head.push(P(cx+.05+Math.cos(a)*.19,1.28+Math.sin(a)*.2));}shape(H,R,head,'coral',.74);
    H.line(R,[P(cx-.11,.86),P(cx-.55,1.14),P(cx-.66,1.48)],'paper',3.2);
    for(let n=0;n<4;n++)H.line(R,[P(w*.48+n*.2,.1),P(w*.54+n*.2,.48)],'sun',1.2);
    if(!side){shape(H,R,[P(.54,.38),P(1.18,.38),P(1.18,1.12),P(.54,1.12)],'blue',.82);shape(H,R,[P(.64,.49),P(1.06,.49),P(1.06,1.02),P(.64,1.02)],'paper',1);H.line(R,[P(.85,.5),P(.85,1.01)],'teal',1.6);}
  });
  H.line(R,[P(.07,.06),P(w-.07,.06),P(w-.07,h-.06)],'sun',1.3);
}

const room=world('mexico-city-mural-maquette','A wall small enough to hold',{wall:'paper',height:4.3,wallTone:1,floor:'paper',tone:.55,head: 10},(H,R)=>{
  masonry(H,R,'nw',0,12,0,1.3,'paper',.65);
  windowBay(H,R,'nw',1.1,9.8,3.22,.81,{divisions:6});
  for(const i of [.45,6,11.5]){metal(H,R,i,.35,.16,.2,.03,4.52,'teal');bentTube(H,R,[[i,.4,4.34],[i,5.15,4.54],[i,10.3,4.34]],2.4,'teal');bentTube(H,R,[[i,.4,4.34],[i,5.15,3.91],[i,10.3,4.34]],1.3,'blue');}
  bentTube(H,R,[[.5,.38,2.74],[4.5,.38,2.74],[4.5,.38,4.24],[10.8,.38,4.24]],1.5,'teal');for(const i of [1.5,3,6,8.5,10.5])metal(H,R,i,.31,.08,.13,2.65,.18,'sun');
  pendant(H,R,6.4,2.6,4.4,3.56,'sun',.75);
  cabinetFrame(H,R,8.15,.55,3.5,1.8,.08,3.02,3,'teal',(x,j,w,d,z,h,n)=>{
    if(n===0){for(let k=0;k<4;k++){timber(H,R,x,j,w,d,z+k*.44,.35,'sun');H.line(R,[H.p(x+.24,j+d,z+k*.44+.18),H.p(x+w-.2,j+d,z+k*.44+.18)],'blue',1.4);}timber(H,R,x,j,w,d,z+2.03,.09,'teal');for(let k=0;k<4;k++)shape(H,R,H.faceI(x+.12+k*.2,j+.7,.16,z+2.1,z+2.53),'paper',1);}
    if(n===1){for(const a of [.17,1.28]){timber(H,R,x,j,w,d,z+a,.1,'sun');for(let k=0;k<2;k++)vessel(H,R,x+.28+k*.46,j+.7,z+a+.15,7,11,['coral','teal'][k],false);}}
    if(n===2){for(let k=0;k<3;k++){const [a,b]=H.p(x+.2+k*.23,j+.65,z+.09);shape(H,R,[[a-5,b],[a+5,b],[a+5,b-53],[a-5,b-53]],'paper',1);oval(H,R,a,b-53,5,2,'sun');}timber(H,R,x,j,w,d,z+2.1,.08,'sun');}
  });
  const child=H.p(8.65,1.1,3.3);shape(H,R,[[child[0]-18,child[1]-22],[child[0]+20,child[1]-22],[child[0]+20,child[1]],[child[0]-18,child[1]]],'paper',1);shape(H,R,[[child[0]-15,child[1]-3],[child[0]-4,child[1]-17],[child[0]+6,child[1]-7],[child[0]+15,child[1]-14],[child[0]+17,child[1]-2]],'coral',.5);H.dot(child[0]+11,child[1]-17,3,'sun');
  drape(H,R,.65,4.4,1.15,2.0,2.2,1.67,'paper');bentTube(H,R,[[.7,4.42,2.34],[.7,6.6,2.34]],2,'teal');
  for(const i of [2.2,5.9]){timber(H,R,i,4.34,.28,1.9,.04,.22,'sun');bentTube(H,R,[[i+.13,4.5,.18],[i+.13,4.85,1.22],[i+.13,6.03,.17]],2.5,'teal');}
  for(const i of [2.3,5.98])metal(H,R,i,4.82,.24,.21,.22,.58,'teal');
  painting(H,R,(u,v)=>H.p(1.9+u,4.9,.76+v),4.48,2.55);
  timber(H,R,1.9,4.79,4.49,.18,.61,.15,'sun');
  for(const z of [1,1.67,2.8]){metal(H,R,6.3,4.8,.18,.15,z,.29,'sun');H.line(R,[H.p(6.4,4.89,z-.02),H.p(6.4,4.89,z+.32)],'blue',1.7);}
  metal(H,R,6.49,4.54,.55,.3,.55,.2,'teal');cushionPad(H,R,6.5,4.6,.5,.2,.76);
  const sample=H.tile(2.2,8.35,3.25,1.6,.1);shape(H,R,sample,'paper',1);for(const [x,j,ink] of [[2.4,8.53,'teal'],[3.3,8.8,'coral'],[4.25,8.52,'sun']])shape(H,R,H.tile(x,j,.85,.84,.13),ink,.65);shape(H,R,[H.p(3.6,8.77,.15),H.p(4.1,8.81,.15),H.p(3.99,9.42,.15),H.p(3.65,9.52,.15)],'blue',.65);
  shape(H,R,H.tile(5.95,8.37,.66,1,.09),'teal',.66);shape(H,R,H.faceI(6.63,8.39,.64,.1,.66),'coral',.52);H.line(R,[H.p(6.59,8.37,.09),H.p(6.59,9.35,.09)],'blue',2);
  slattedSeat(H,R,9.5,7.9,1.8,.03,'sun',.77);slattedSeat(H,R,10.3,5.65,1.24,.03,'paper',.7);
  for(const p of [[9.05,3.35],[10.76,3.35],[9.05,4.65],[10.76,4.65]])caster(H,R,...p);metal(H,R,8.9,3.2,2.02,1.62,.24,.08,'teal');vessel(H,R,9.52,3.93,.33,15,18,'coral',false);vessel(H,R,10.27,4.15,.33,12,14,'paper',false);
  const brush=H.p(7.25,9.37,.05);shape(H,R,[[brush[0]-8,brush[1]],[brush[0]+9,brush[1]],[brush[0]+9,brush[1]-9],[brush[0]-8,brush[1]-9]],'sun',.6);H.line(R,[[brush[0],brush[1]-8],[brush[0],brush[1]-26]],'coral',3);for(let k=0;k<7;k++)H.line(R,[[brush[0]-7+k*2,brush[1]],[brush[0]-7+k*2,brush[1]+5]],'blue',.6);
  H.line(R,[H.p(1,11.2,.02),H.p(11.6,11.2,.02)],'blue',2);H.line(R,[H.p(1,11.35,.02),H.p(11.6,11.35,.02)],'teal',1);
},(H,R,t)=>{
  const u=((t%20)+20)%20,open=ease(4,8,u)*(1-ease(12,18,u)),a=-1.05+open*1.34,w=2.65;
  const P=(x,z)=>H.p(6.4+Math.cos(a)*x,4.9+Math.sin(a)*x,.76+z);
  H.tint([H.p(6.4,4.9,.025),H.p(6.4+Math.cos(a)*w,4.9+Math.sin(a)*w,.025),H.p(7.1+Math.cos(a)*w,6.1+Math.sin(a)*w,.025),H.p(7.1,6.1,.025)],'blue',.14);
  painting(H,R,P,w,2.55,1);H.line(R,[P(0,.04),P(0,2.54)],'blue',3);for(const h of [.25,1.1,2.02])H.line(R,[P(.02,h),P(.15,h)],'sun',3);
  const endI=6.4+Math.cos(a)*w,endJ=4.9+Math.sin(a)*w;
  actor(H,R,4.86,6.08,u,'mexicoMuralSteady',{shirt:['sun',.75],pants:['blue',.75],face:'se',hairStyle:'curly'},0,1.65);
  actor(H,R,endI+.31,endJ+.58,u,'mexicoMuralLeaf',{shirt:['coral',.6],apron:['paper',1],face:'sw',hairStyle:'short'},0,1.65);
  stroke(H,R,[P(1.72,.11),P(1.77,-.1),P(2.16,-.11+Math.sin(TAU*u/20)*.025),P(2.21,.11)],'paper',3);H.line(R,[P(w-.1,.66),P(w-.1,1.1)],'sun',2);
  const [x,y]=H.p(.7,6.45,.55);stroke(H,R,[[x-6,y-22],[x+Math.sin(TAU*u/20)*2,y-10],[x+6,y]],'coral',.8);
});
function cushionPad(H,R,i,j,w,d,z){shape(H,R,H.tile(i,j,w,d,z),'paper',1);H.line(R,[H.p(i+.04,j+d,z),H.p(i+w-.04,j+d,z)],'coral',1.3);}
room.loopSeconds=20;
room.stillTime=10;
export default room;
