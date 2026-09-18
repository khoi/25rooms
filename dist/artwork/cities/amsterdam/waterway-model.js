import { world, actor, shape, oval, stroke, ell, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, bentTube, drape } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, cityView, taskLight, recessedFrame } from '../joinery.js';

const T = 24;
const ease = (a,b,t) => { const u=Math.max(0,Math.min(1,(t-a)/(b-a))); return u*u*(3-2*u); };
const state = t => { const u=((t%T)+T)%T; return {u, lift:ease(4.8,9.6,u)*(1-ease(14.4,22,u))}; };
const rest = {x:0,y:0,drop:0,lean:0,head:0,al:-10,ar:12,el:-6,er:6,ll:-5,lr:5,kl:0,kr:0,roll:0};
const clip='amsterdamWaterwayMaker';
FIGURES.clips[clip]={dur:T,keys:[[0,{...rest}],[1,{...rest}]]};
function worker(H,R,t,target){
  const i=4.95,j=7.4,s=1.65,[x,y]=H.p(i,j),q={...rest,head:state(t).lift*12};
  for(const side of ['l','r']){
    const tip=side==='r'?target:H.p(4.56,6.96,1.31),sx=x+(side==='l'?-5.2:5.2)*s,sy=y-32.5*s;
    const dx=(tip[0]-sx)/s,dy=(tip[1]-sy)/s,a=4.368,b=4.2,c=Math.min(a+b-.001,Math.max(.4,Math.hypot(dx,dy))),el=Math.acos((c*c-a*a-b*b)/(2*a*b));
    q['a'+side]=(Math.atan2(dx,dy)-Math.atan2(b*Math.sin(el),a+b*Math.cos(el)))*180/Math.PI;q['e'+side]=el*180/Math.PI;
  }
  FIGURES.clips[clip].keys=[[0,q],[1,q]];
  actor(H,R,i,j,t,clip,{shirt:['coral',.75],pants:['blue',.65],apron:['paper',1],hairStyle:'curly',glasses:true},0,s);
}
function gear(H,R,x,y,r,turn=0){
  const points=Array.from({length:32},(_,n)=>{const a=n/32*TAU+turn,k=n%4<2?r:r*.84;return [x+Math.cos(a)*k,y+Math.sin(a)*k*.78];});
  shape(H,R,points,'sun',.8,.7);oval(H,R,x,y,r*.62,r*.49,'paper',1);
  for(let n=0;n<6;n++){const a=n/6*TAU+turn;H.line(R,[[x,y],[x+Math.cos(a)*r*.58,y+Math.sin(a)*r*.45]],'blue',.8);}
  H.dot(x,y,2,'coral');
}
function boat(H,R,i,j,z,s=1){
  const P=(a,b,h=0)=>H.p(i+a*s,j+b*s,z+h*s);
  shape(H,R,[P(-.5,0),P(.3,-.16),P(.6,0),P(.26,.2),P(-.43,.15)],'paper',1);
  shape(H,R,[P(-.43,.15),P(.26,.2),P(.6,0),P(.36,.27,-.13),P(-.32,.23,-.13)],'coral',.55);
  H.line(R,[P(-.33,.02,.02),P(-.25,.13,.02)],'teal',2.8);H.line(R,[P(-.37,.05,.03),P(-.3,.11,.03)],'sun',1);
}
const room=world('amsterdam-waterway-model','The gate makes a passage',{floor:'paper',pattern:'tiles',accent:'teal',wall:false,head:40},(H,R)=>{
  masonry(H,R,'nw',0,12,0,4.6,'paper',1);masonry(H,R,'ne',0,12,0,4.6,'paper',1);
  windowBay(H,R,'ne',1.1,6.2,1.9,2.4,{ink:'teal',view:P=>cityView(H,R,P,6.2,2.4)});
  const drawing=recessedFrame(H,R,'nw',1.1,4.4,2.4,1.75,'sun',P=>{
    shape(H,R,[P(.16,.15),P(4.24,.15),P(4.24,1.57),P(.16,1.57)],'paper',1);
    for(let n=0;n<3;n++){const z=.35+n*.4;stroke(H,R,[P(.3,z),P(1.2,z+.16),P(2.05,z-.09),P(3.15,z+.15),P(4.0,z+.07)],n===1?'teal':'blue',n===1?3:.7);}
    for(let n=0;n<4;n++)H.line(R,[P(.65+n*.9,.3),P(.65+n*.9,1.35)],'coral',.7);
  });
  cabinetFrame(H,R,8.45,.35,3.1,1.65,.1,3.65,2,'teal',(x,j,w,d,z,h,n)=>{
    for(const level of [.3,1.18,2.12])timber(H,R,x,j,w,d,z+level,.1,'sun');
    if(n===0){for(let k=0;k<3;k++){metal(H,R,x+.08+k*.35,j+.2,.22,.7,z+.41,.56,k===1?'coral':'paper');H.line(R,[H.p(x+.08+k*.35,j+.92,z+.47),H.p(x+.3+k*.35,j+.92,z+.85)],'blue',.6);}for(let k=0;k<2;k++)gear(H,R,...H.p(x+.35+k*.65,j+.78,z+1.56),8-k*2,k);for(let k=0;k<4;k++)timber(H,R,x+.08+k*.28,j+.08,.16,.9,z+2.23,.8,'sun');}
    else{for(let k=0;k<3;k++){timber(H,R,x+.1,j+.08,w-.14,d-.1,z+.42+k*.19,.13,k===1?'coral':'paper');H.line(R,[H.p(x+.4,j+d,z+.5+k*.19),H.p(x+.72,j+d,z+.5+k*.19)],'blue',1.2);}boat(H,R,x+.66,j+.63,z+1.53,.85);for(let k=0;k<3;k++){metal(H,R,x+.1+k*.34,j+.2,.23,.63,z+2.23,.17,'teal');bentTube(H,R,[[x+.15+k*.34,j+.3,z+2.4],[x+.15+k*.34,j+.3,z+2.93]],1.3);}}
  });
  const [gx,gy]=H.p(9.1,.7,3.84);shape(H,R,[[gx-13,gy],[gx+13,gy],[gx+13,gy-26],[gx,gy-39],[gx-13,gy-26]],'coral',.65);for(const dx of [-7,5])for(const dy of [-9,-22])shape(H,R,[[gx+dx,gy+dy],[gx+dx+4,gy+dy],[gx+dx+4,gy+dy-7],[gx+dx,gy+dy-7]],'paper',1,.4);
  timber(H,R,.2,5.95,1.12,5.55,.12,.96,'teal');
  for(let n=0;n<5;n++){const j=6.06+n*1.06;shape(H,R,H.faceJ(1.33,j,.95,.24,.95),'paper',1,.65);H.line(R,[H.p(1.35,j+.3,.64),H.p(1.35,j+.61,.64)],'blue',2);H.line(R,[H.p(1.35,j+.1,.34),H.p(1.35,j+.83,.34)],'teal',.65);}
  timber(H,R,.13,5.88,1.28,5.69,1.08,.14,'sun');
  for(const z of [2.13,3.18]){timber(H,R,.15,6.1,.56,5.1,z,.11,'sun');for(const j of [6.4,8.5,10.65])bentTube(H,R,[[.15,j,z-.45],[.65,j,z]],1.6,'teal');}
  for(let n=0;n<4;n++){const j=6.4+n*1.14;const P=(a,h)=>H.p(.46,j+a,2.26+h);shape(H,R,[P(0,0),P(.82,0),P(.82,.62),P(0,.62)],'paper',1,.5);H.line(R,[P(.07,.06),P(.42,.5),P(.75,.06),P(.07,.06)],n%2?'coral':'teal',1.4);for(const a of [.1,.4,.7])H.dot(...P(a,.1),1,'blue');}
  for(let n=0;n<3;n++){const j=6.7+n*1.7;metal(H,R,.2,j,.31,.7,3.31,.5,n===1?'coral':'paper');for(const k of [.12,.35,.58])H.line(R,[H.p(.53,j+k,3.38),H.p(.53,j+k,3.73)],'blue',1);}
  timber(H,R,.25,6.4,1.05,3.8,1.23,.14,'teal');
  for(let n=0;n<4;n++){const j=6.65+n*.76;shape(H,R,[H.p(.43,j,1.38),H.p(.88,j,1.38),H.p(.88,j+.54,1.38),H.p(.43,j+.54,1.38)],'paper',1,.5);bentTube(H,R,[[.48,j+.04,1.41],[.48,j+.45,1.93],[.87,j+.45,1.41]],1.2,'sun');}
  benchFrame(H,R,2.15,3.35,6.2,3.9,1.1,'sun');
  metal(H,R,2.4,3.6,5.7,3.38,1.11,.17,'teal');
  shape(H,R,H.tile(2.62,3.77,5.24,2.96,1.29),'blue',.82);
  shape(H,R,[H.p(2.7,4.55,1.3),H.p(3.5,4.36,1.3),H.p(5.1,4.55,1.3),H.p(6.25,4.4,1.3),H.p(7.72,4.62,1.3),H.p(7.72,5.5,1.3),H.p(6.2,5.2,1.3),H.p(5,5.44,1.3),H.p(3.3,5.23,1.3),H.p(2.7,5.4,1.3)],'teal',.7);
  for(const j of [3.95,6.18]){timber(H,R,4.36,j,.48,.3,1.3,.63,'sun');metal(H,R,4.35,j,.5,.31,1.8,.17,'paper');timber(H,R,7.47,j,.3,.3,1.3,.35,'sun');}
  timber(H,R,3.08,5.78,.35,.85,1.3,.5,'paper');for(let n=0;n<3;n++)H.line(R,[H.p(3.1,6.64,1.42+n*.1),H.p(3.41,6.64,1.43+n*.1)],'coral',.8);
  for(const j of [3.94,6.38])bentTube(H,R,[[3.43,j,1.3],[3.43,j,3.3]],2,'blue');
  for(const j of [3.99,6.33])H.line(R,[H.p(3.36,j,1.37),H.p(3.36,j,3.3)],'paper',.8);
  bentTube(H,R,[[4.59,3.75,1.9],[4.59,6.9,1.9],[4.59,6.9,1.36]],3.8,'sun');
  metal(H,R,4.28,6.82,.65,.22,1.13,.33,'teal');
  boat(H,R,6.25,4.98,1.36,.76);
  taskLight(H,R,7.92,3.47,1.12,'coral',-.4);
  timber(H,R,8.85,7.85,2.32,2.32,.07,.18,'teal');shape(H,R,H.tile(9.0,8.0,2.0,2.0,.26),'blue',.5);
  for(const i of [9.08,10.41])for(const j of [8.1,9.32])metal(H,R,i,j,.52,.58,.27,.25,'paper');
  timber(H,R,8.76,10.25,2.54,.12,.04,1.17,'sun');shape(H,R,H.faceI(8.93,10.4,2.14,.21,1.05),'paper',1,.6);
  H.line(R,[H.p(9.15,10.42,.97),H.p(9.15,10.42,.47),H.p(10.8,10.42,.47),H.p(10.8,10.42,.96)],'blue',1.1);
  drape(H,R,9.03,8.2,1.6,.64,.6,.4,'paper');
  benchFrame(H,R,2.0,9.4,2.5,1.25,.64,'teal');
  const A=H.p(2.23,9.62,.68),B=H.p(3.92,9.62,.68),C=H.p(3.16,10.3,1.38);shape(H,R,[A,B,C],'paper',.2,.5);for(const [p,q] of [[A,B],[B,C],[C,A]])H.line(R,[p,q],'coral',2.5);for(const p of [A,B,C]){H.dot(...p,2.2,'sun');H.dot(...p,.8,'blue');}
  metal(H,R,2.1,10.36,.55,.23,.68,.11,'blue');for(let n=0;n<4;n++)H.line(R,[H.p(2.19+n*.1,10.6,.7),H.p(2.19+n*.1,10.6,.89)],'paper',.65);
  oval(H,R,...H.p(3.99,10.2,.68),7,3,'sun',.8);oval(H,R,...H.p(3.99,10.2,.69),4.2,1.6,'paper',1);
},(H,R,t)=>{
  const {lift}=state(t),a=lift*.91,P=(u,v,z=0)=>H.p(4.59+u*Math.cos(a),v,1.91+u*Math.sin(a)+z);
  H.tint([H.p(4.59,4.04,1.305),H.p(7.5+lift*.4,4.04+lift*.4,1.305),H.p(7.5+lift*.4,6.35+lift*.4,1.305),H.p(4.59,6.35,1.305)],'blue',.22);
  for(let n=0;n<10;n++){const u=n*.286;shape(H,R,[P(u,4.03),P(u+.27,4.03),P(u+.27,6.33),P(u,6.33)],'sun',.6,.6);H.line(R,[P(u+.04,4.15,.008),P(u+.09,5.8,.008)],'coral',.5);}
  for(const j of [4.03,6.33]){H.line(R,[P(0,j),P(2.87,j)],'blue',2.7);H.line(R,[P(0,j,.36),P(2.87,j,.36)],'teal',2);for(let n=0;n<7;n++)H.line(R,[P(n*.478,j),P(n*.478,j,.37)],'blue',1.2);}
  const weightZ=2.7-lift*1.22;metal(H,R,3.2,4.17,.54,1.91,weightZ,.37,'blue');drape(H,R,3.17,4.18,.6,1.88,weightZ+.38,.12,'coral');
  for(const j of [4.0,6.34]){H.line(R,[P(1.47,j,.06),H.p(3.5,j,weightZ+.39)],'sun',2.1);H.dot(...P(1.47,j,.06),2.1,'blue');}
  const [cx,cy]=H.p(4.59,7.0,1.35),turn=lift*TAU*1.2;gear(H,R,cx,cy,11,turn);const handle=[cx+Math.cos(turn)*7,cy+Math.sin(turn)*5.8];H.line(R,[[cx,cy],handle],'coral',2.2);H.dot(...handle,2.8,'blue');
  worker(H,R,t,handle);H.dot(...handle,2,'coral',.5);
  const [x,y]=H.p(9.43,8.87,.4),sway=Math.sin(t/T*TAU)*1.5;stroke(H,R,[[x,y-6],[x+sway,y+4],[x+5+sway,y+8]],'paper',1.5);
});
room.loopSeconds=T;room.stillTime=7.2;
export default room;
