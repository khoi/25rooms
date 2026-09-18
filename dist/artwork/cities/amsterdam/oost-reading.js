import { world, actor, shape, oval, stroke, ell, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, cushion, drape, caneChair } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, cityView, hangingRail, caster, radiator } from '../joinery.js';

const T=24;
const ease=(a,b,t)=>{const x=Math.max(0,Math.min(1,(t-a)/(b-a)));return x*x*(3-2*x);};
const state=t=>{const u=((t%T)+T)%T;return {u,turn:ease(4.8,9.6,u)*(1-ease(14.4,22,u))};};
const rest={x:0,y:0,drop:0,lean:0,head:8,al:20,ar:25,el:30,er:30,ll:-5,lr:5,kl:0,kr:0,roll:0};
const clip='amsterdamOostLibrarian';
FIGURES.clips[clip]={dur:T,keys:[[0,{...rest}],[1,{...rest}]]};
const seat={...rest,drop:.6,ll:80,lr:78,kl:-70,kr:-70,al:30,ar:35,el:30,er:30};
FIGURES.clips.amsterdamOostTrace={dur:T,keys:[[0,seat],[.4,{...seat,head:-8}],[.48,{...seat,head:-5,ar:100,er:10}],[.6,{...seat,head:-5,ar:100,er:10}],[.91,seat],[1,seat]]};
FIGURES.clips.amsterdamOostListen={dur:T,keys:[[0,seat],[.44,{...seat,head:-11,al:43}],[.65,{...seat,head:-7,al:50}],[.91,seat],[1,seat]]};
function librarian(H,R,t,turn,targets){const s=1.85,x=(targets.l[0]+targets.r[0])/2,y=(targets.l[1]+targets.r[1])/2+51.1,i=(y/16+x/32)/2,j=(y/16-x/32)/2,q={...rest,head:12};for(const [side,p] of Object.entries(targets)){const dx=(p[0]-x)/s-(side==='l'?-5.2:5.2),dy=(p[1]-y)/s+32.5,a=4.368,b=4.2,c=Math.max(.2,Math.min(a+b-.001,Math.hypot(dx,dy))),e=Math.acos((c*c-a*a-b*b)/(2*a*b));q['a'+side]=(Math.atan2(dx,dy)-Math.atan2(b*Math.sin(e),a+b*Math.cos(e)))*180/Math.PI;q['e'+side]=e*180/Math.PI;}FIGURES.clips[clip].keys=[[0,q],[1,q]];actor(H,R,i,j,t,clip,{shirt:['teal',.7],pants:['blue',.67],hairStyle:'bun',glasses:true},0,s);}
function books(H,R,i,j,z,w,count=6){for(let n=0;n<count;n++){const x=i+n*w/count,bw=w/count*.75,h=.37+(n%3)*.1;timber(H,R,x,j,bw,.4,z,h,['coral','sun','teal','paper'][n%4]);H.line(R,[H.p(x+.03,j+.42,z+h*.74),H.p(x+bw-.03,j+.42,z+h*.74)],'paper',.7);}}
function bridge(H,R,i,j,z,s=1){const P=(a,b,c)=>H.p(i+a*s,j+b*s,z+c*s);shape(H,R,[P(0,0,0),P(.3,0,.46),P(.7,0,.53),P(1,0,0),P(.75,0,0),P(.56,0,.31),P(.36,0,.28),P(.24,0,0)],'paper',1,.65);for(const a of [.04,.24,.73,.91])H.line(R,[P(a,.02,.03),P(a,.02,.21)],'coral',.5);H.line(R,[P(.2,0,.5),P(.74,0,.57)],'teal',.6);}
const room=world('amsterdam-oost-reading','A window for the story',{floor:'paper',tone:.95,wall:false,head:45},(H,R)=>{
  masonry(H,R,'nw',0,12,0,4.15,'paper',1);masonry(H,R,'ne',0,12,0,4.15,'teal',.2);
  for(let n=0;n<12;n++){shape(H,R,H.tile(n,11.1,.92,.74,.015),n%3===0?'coral':'teal',.35,.5);shape(H,R,H.tile(11.1,n,.74,.92,.015),n%3===1?'sun':'teal',.35,.5);}
  windowBay(H,R,'nw',.75,7.1,1.47,2.42,{ink:'teal',divisions:4,view:P=>cityView(H,R,P,7.1,2.42)});
  radiator(H,R,'nw',8.55,2.35,.92);
  timber(H,R,.14,.75,1.72,7.24,.06,.74,'sun');
  for(let n=0;n<5;n++){const j=.94+n*1.35;shape(H,R,H.faceJ(1.88,j,1.18,.2,.71),'teal',.6,.6);shape(H,R,H.faceJ(1.9,j+.12,.94,.3,.62),'paper',1,.6);if(n===3){H.line(R,[H.p(1.93,j+.31,.48),H.p(1.93,j+.48,.48)],'coral',1.6);H.line(R,[H.p(1.93,j+.7,.48),H.p(1.93,j+.86,.48)],'coral',1.6);}else H.line(R,[H.p(1.93,j+.45,.48),H.p(1.93,j+.71,.48)],'blue',1.7);}
  for(let n=0;n<4;n++)cushion(H,R,.33,1.0+n*1.62,1.41,1.43,.82,.15,n===2?'coral':'paper');
  timber(H,R,1.94,2.43,2.11,.46,.03,.19,'sun');
  shape(H,R,H.faceJ(1.96,3.32,.8,.48,.87),'coral',.4,.6);for(let n=0;n<3;n++)shape(H,R,[H.p(1.98,3.43+n*.16,.54),H.p(1.98,3.56+n*.16,.54),H.p(1.98,3.57+n*.16,.89),H.p(1.98,3.44+n*.16,.94)],n%2?'teal':'sun',.7,.4);
  cabinetFrame(H,R,4.14,.3,6.85,1.54,.09,3.58,4,'teal',(x,j,w,d,z,h,n)=>{
    timber(H,R,x,j,w,d,z+.99,.1,'sun');timber(H,R,x,j,w,d,z+2.15,.1,'sun');
    if(n===0){for(let k=0;k<3;k++)timber(H,R,x+.1,j+.2,w-.2,.94,z+.14+k*.22,.15,'paper');books(H,R,x+.13,j+.59,z+1.12,w-.25,6);bridge(H,R,x+.2,j+.72,z+2.28,1.2);}
    else if(n===1){metal(H,R,x+.1,j+.1,w-.2,.98,z+.13,.63,'coral');H.line(R,[H.p(x+.33,j+1.09,z+.62),H.p(x+1.17,j+1.09,z+.62)],'blue',3);books(H,R,x+.15,j+.6,z+1.12,w-.3,5);const [px,py]=H.p(x+.76,j+.75,z+2.33);shape(H,R,[[px-12,py],[px+12,py],[px+10,py-22],[px-8,py-22]],'coral',.7,.7);oval(H,R,px,py-29,8,9,'paper',1);shape(H,R,[[px-10,py-16],[px-22,py-23],[px-25,py-18],[px-12,py-8]],'coral',.6,.5);H.line(R,[[px-19,py-20],[px-16,py-17]],'sun',2);H.dot(px+3,py-30,1.2,'blue');}
    else if(n===2){for(let k=0;k<2;k++){timber(H,R,x+.12,j+.17,w-.24,.9,z+.14+k*.35,.28,'sun');for(const q of [.42,.96])H.line(R,[H.p(x+q,j+1.09,z+.31+k*.35),H.p(x+q+.11,j+1.09,z+.31+k*.35)],'teal',1.7);}for(let k=0;k<2;k++){const [px,py]=H.p(x+.43+k*.68,j+.72,z+1.17);shape(H,R,[[px-10,py],[px+10,py],[px+8,py-29],[px-7,py-26]],k?'sun':'paper',k?.6:1,.7);H.line(R,[[px-6,py-4],[px+6,py-19]],'teal',1.3);}books(H,R,x+.12,j+.61,z+2.28,w-.24,6);}
    else{for(let k=0;k<2;k++)metal(H,R,x+.13+k*.72,j+.12,.63,.86,z+.13,.66,k?'coral':'sun');books(H,R,x+.12,j+.6,z+1.12,w-.24,5);const [gx,gy]=H.p(x+.75,j+.67,z+2.31);H.line(R,[[gx,gy],[gx,gy-13]],'sun',2.2);oval(H,R,gx,gy,13,4,'teal',.6);oval(H,R,gx,gy-26,17,17,'paper',1);shape(H,R,[[gx-13,gy-34],[gx-6,gy-41],[gx+1,gy-34],[gx-3,gy-27],[gx-11,gy-26]],'teal',.55,.5);shape(H,R,[[gx+3,gy-25],[gx+12,gy-32],[gx+15,gy-25],[gx+8,gy-14]],'coral',.55,.5);stroke(H,R,[[gx-17,gy-38],[gx-24,gy-25],[gx-16,gy-10],[gx,gy-8]],'sun',1.8);H.line(R,[[gx-21,gy-20],[gx-18,gy-15]],'coral',2.4);}
  });
  hangingRail(H,R,'ne',1.05,2.3,3.15,3,(P,u,n)=>{const [x,y]=P(u,-.17);shape(H,R,[[x-8,y],[x-14,y+10],[x-9,y+17],[x-8,y+33],[x+8,y+33],[x+9,y+17],[x+14,y+10],[x+8,y]],n===1?'coral':'paper',n===1?.6:1,.6);});
  for(let n=0;n<3;n++){const [x,y]=H.p(1.6+n*.65,.25,3.58);shape(H,R,[[x-8,y],[x+9,y],[x+6,y-10],[x-5,y-16]],n%2?'sun':'coral',.6,.6);}
  shape(H,R,H.tile(2.53,4.2,5.7,4.0,.025),'teal',.12,.8);for(const i of [2.67,8.1])H.line(R,[H.p(i,4.36,.03),H.p(i,8.0,.03)],'coral',1.2);
  for(const i of [4.55,6.4]){timber(H,R,i,5.34,.29,.87,.04,.17,'sun');bentTube(H,R,[[i+.12,5.78,.2],[5.63,5.66,.95]],2.7,'teal');}
  metal(H,R,5.44,5.46,.39,.39,.7,.57,'teal');oval(H,R,...H.p(5.63,5.66,1.21),18,9,'sun',.7);
  for(const [i,j,ink] of [[4.1,7.36,'coral'],[6.8,7.25,'sun']])cushion(H,R,i,j,1.27,1.12,.03,.17,ink);
  timber(H,R,9.02,5.47,2.0,1.5,.27,.13,'teal');timber(H,R,9.02,5.47,2.0,1.5,1.18,.13,'sun');
  for(const i of [9.04,10.89])for(const j of [5.49,6.82]){metal(H,R,i,j,.1,.1,.15,1.13,'teal');caster(H,R,i,j);}
  bentTube(H,R,[[9.04,5.49,1.27],[9.04,5.49,1.85],[10.97,5.49,1.85],[10.97,5.49,1.27]],2.6,'teal');books(H,R,9.14,5.78,.43,1.69,7);books(H,R,9.17,5.94,1.33,1.65,6);
  timber(H,R,2.35,9.57,2.75,1.42,.04,.2,'sun');shape(H,R,H.tile(2.49,9.7,2.46,1.15,.26),'paper',1,.6);const P=(i,j,h=0)=>H.p(i,j,.28+h);shape(H,R,[P(2.77,9.92),P(3.43,9.92),P(3.43,9.92,.57),P(3.1,9.92,.9),P(2.77,9.92,.57)],'teal',.55,.6);shape(H,R,[P(2.99,9.91),P(3.23,9.91),P(3.23,9.91,.4),P(2.99,9.91,.4)],'paper',1,.6);shape(H,R,H.tile(3.53,10.39,.24,.25,.29),'coral',.7,.5);oval(H,R,...P(4.36,10.06,.08),13,7,'sun',.6);oval(H,R,...P(4.36,10.06,.1),9,4.5,'paper',1);H.line(R,[P(4.08,10.16,.14),P(4.51,9.95,.14)],'teal',.8);
  drape(H,R,3.65,10.27,.5,.52,.32,.18,'coral');
  metal(H,R,8.48,9.36,2.64,1.63,.02,.04,'teal');caneChair(H,R,9.0,9.58,'sun');bentTube(H,R,[[10.9,9.8,.02],[10.9,9.8,1.72],[10.74,9.8,1.89],[10.6,9.8,1.83]],2,'sun');metal(H,R,10.81,9.72,.18,.18,1.17,.1,'coral');
},(H,R,t)=>{
  const {turn}=state(t),angle=-.24+turn*.5,P=(u,v,h=0)=>{const x=u*Math.cos(angle)-v*Math.sin(angle),y=u*Math.sin(angle)+v*Math.cos(angle);return H.p(5.63+x,5.66+y,1.32-v*.51+h);};
  shape(H,R,[P(-1.72,-.95),P(1.72,-.95),P(1.72,.79),P(-1.72,.79)],'sun',.7,.9);
  for(const side of [-1,1]){const a=side<0?-1.59:.035,b=side<0?-.035:1.59;shape(H,R,[P(a,-.83,.045),P(b,-.83,.045),P(b,.64,.045),P(a,.64,.045)],'paper',1,.65);for(let n=0;n<3;n++)H.line(R,[P(a,.66,.018-n*.025),P(b,.66,.018-n*.025)],'coral',.55);}
  H.line(R,[P(0,-.83,.08),P(0,.65,.08)],'blue',1.2);
  shape(H,R,[P(-1.48,.39,.08),P(-.97,-.04,.08),P(-.56,.14,.08),P(-.1,-.35,.08),P(.57,-.19,.08),P(.9,-.56,.08),P(1.43,-.1,.08),P(1.43,.53,.08),P(-1.48,.53,.08)],'teal',.52,.45);
  shape(H,R,[P(-.53,.45,.1),P(-.22,-.12,.1),P(.2,-.15,.1),P(.55,.45,.1),P(.33,.45,.1),P(.13,.1,.1),P(-.09,.12,.1),P(-.28,.45,.1)],'coral',.65,.5);
  const [sx,sy]=P(1.06,-.56,.08);oval(H,R,sx,sy,9,7,'sun',.8);
  shape(H,R,[P(-1.59,.42,.09),P(-1.3,.64,.09),P(-1.59,.64,.09)],'coral',.63,.4);
  for(const u of [-1.49,1.49])H.line(R,[P(u,-.84,.1),P(u,.65,.1)],'sun',2.4);
  for(const u of [-1.76,1.76])H.line(R,[P(u,-.8,-.12),P(u,.81,-.12)],'teal',3.2);
  H.line(R,[P(-1.78,.8,-.02),P(1.78,.8,-.02)],'sun',3.6);
  librarian(H,R,t,turn,{l:P(-1.77,.2),r:P(-1.57,.48)});
  for(const point of [P(-1.77,.2),P(-1.57,.48)])H.dot(...point,2.4,'coral',.3,{knock:true});
  actor(H,R,4.63,7.67,t,'amsterdamOostTrace',{shirt:['coral',.7],pants:['blue',.7],hairStyle:'curly'},.18,1.6,'child');
  actor(H,R,7.33,7.57,t,'amsterdamOostListen',{shirt:['sun',.8],pants:['teal',.65],hairStyle:'pony',skin:['coral',.55]},.18,1.6,'child');
  const [x,y]=H.p(.2,6.7,3.9),sway=Math.sin(t/T*TAU)*4;H.line(R,[[x,y],[x,y+24]],'blue',.7);H.line(R,[[x-21,y+24],[x+21,y+24]],'sun',1.4);for(const d of [-1,1]){H.line(R,[[x+d*18,y+24],[x+d*18+sway,y+44]],'blue',.6);shape(H,R,[[x+d*18+sway,y+39],[x+d*18+sway-12,y+47],[x+d*18+sway,y+44],[x+d*18+sway+9,y+50]],d<0?'coral':'teal',.6,.5);}
});
room.loopSeconds=T;room.stillTime=12;
export default room;
