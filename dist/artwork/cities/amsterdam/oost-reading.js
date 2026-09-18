import { world, actor, shape, oval, stroke, ell, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, cushion, drape, caneChair, benchFrame } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, cityView, hangingRail, caster, radiator, recessedFrame } from '../joinery.js';

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
  timber(H,R,.07,.62,.27,7.49,3.97,.18,'sun');
  for(const j of [.62,7.9]){
    timber(H,R,.08,j,.63,.19,.78,3.36,'teal');
    H.line(R,[H.p(.73,j+.05,1.0),H.p(.73,j+.05,3.88)],'paper',1.5);
    const P=(u,z)=>H.p(.76,j+u,z);
    const q=[P(-.1,3.83),P(.45,3.83),P(.39,1.37),P(.05,1.34),P(-.12,1.43)];shape(H,R,q,j<1?'coral':'sun',.38,.6);
    for(let n=0;n<3;n++)stroke(H,R,[P(n*.15,3.76),P(n*.13+.06,2.85),P(n*.13+.04,1.47)],'paper',1.2);
    H.line(R,[P(-.08,2.32),P(.4,2.25)],'teal',2.1);
  }
  for(const j of [.87,7.4]){
    const [x,y]=H.p(.35,j,1.53);oval(H,R,x,y,8,3.3,'sun',.58);H.line(R,[[x-4,y],[x+5,y]],'coral',1.4);
  }
  radiator(H,R,'nw',8.55,2.35,.92);
  recessedFrame(H,R,'nw',8.69,2.36,1.72,2.14,'sun',P=>{
    shape(H,R,[P(.13,.12),P(2.23,.12),P(2.23,2.0),P(.13,2.0)],'paper',1,.5);
    for(let n=0;n<3;n++){
      const u=.37+n*.63;
      shape(H,R,[P(u-.2,.35),P(u+.24,.35),P(u+.24,1.44+n*.12),P(u-.2,1.6-n*.14)],['teal','coral','sun'][n],.58,.5);
      shape(H,R,[P(u-.16,.8),P(u+.19,.8),P(u,1.12)],'paper',1,.4);
      H.dot(...P(u,1.72),1.8,'blue');
    }
  });
  timber(H,R,.14,.75,1.72,7.24,.06,.74,'sun');
  for(let n=0;n<5;n++){const j=.94+n*1.35;shape(H,R,H.faceJ(1.88,j,1.18,.2,.71),'teal',.6,.6);shape(H,R,H.faceJ(1.9,j+.12,.94,.3,.62),n===1?'blue':'paper',n===1?.74:1,.6);if(n===1){for(let k=0;k<5;k++){const y=j+.23+k*.14;H.line(R,[H.p(1.94,y,.32),H.p(1.94,y+.055,.59)],['sun','paper','coral'][k%3],3.5);} }else if(n===3){H.line(R,[H.p(1.93,j+.31,.48),H.p(1.93,j+.48,.48)],'coral',1.6);H.line(R,[H.p(1.93,j+.7,.48),H.p(1.93,j+.86,.48)],'coral',1.6);}else H.line(R,[H.p(1.93,j+.45,.48),H.p(1.93,j+.71,.48)],'blue',1.7);}
  timber(H,R,1.88,5.15,1.07,1.09,.16,.12,'sun');
  for(const j of [5.15,6.15])timber(H,R,1.9,j,1.09,.08,.28,.18,'teal');
  shape(H,R,H.faceJ(3.0,5.15,1.08,.21,.46),'paper',1,.6);
  for(const j of [5.45,5.83])H.line(R,[H.p(3.03,j,.35),H.p(3.03,j+.11,.35)],'coral',1.7);
  for(let n=0;n<3;n++)timber(H,R,2.04+n*.23,5.29,.2,.73,.3,.16,['sun','coral','teal'][n]);
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
  for(let n=0;n<3;n++){
    const x=4.76+n*2.02;
    timber(H,R,x,.49,1.42,.94,3.69,.08,'sun');
    if(n===0){bridge(H,R,x+.15,1.11,3.78,1.12);}
    if(n===1){const [px,py]=H.p(x+.72,1.04,3.8);shape(H,R,[[px-20,py-6],[px+1,py-19],[px+19,py-7],[px+2,py-10],[px-2,py+3]],'paper',1,.6);H.line(R,[[px-14,py-6],[px+1,py-16],[px+1,py-1]],'coral',1.1);}
    if(n===2){for(let k=0;k<3;k++){timber(H,R,x+.12+k*.08,.71,1.12,.63,3.78+k*.12,.09,k%2?'paper':'coral');}}
  }
  timber(H,R,.66,.23,2.93,1.18,.07,.17,'sun');
  for(let n=0;n<3;n++){
    const i=.77+n*.92;
    timber(H,R,i,.3,.09,.99,.24,.81,'teal');
    shape(H,R,H.faceI(i+.1,1.3,.72,.25,.92),'blue',.47,.5);
    const [bx,by]=H.p(i+.5,.89,.34);shape(H,R,[[bx-9,by],[bx+10,by],[bx+10,by-18],[bx-8,by-20]],n===1?'sun':'coral',.61,.6);stroke(H,R,[[bx-5,by-19],[bx-4,by-26],[bx+5,by-26],[bx+7,by-18]],'paper',1.4);
  }
  timber(H,R,.64,.2,2.98,1.23,1.03,.14,'sun');
  hangingRail(H,R,'ne',1.05,2.3,3.15,3,(P,u,n)=>{const [x,y]=P(u,-.17);shape(H,R,[[x-8,y],[x-14,y+10],[x-9,y+17],[x-8,y+33],[x+8,y+33],[x+9,y+17],[x+14,y+10],[x+8,y]],n===1?'coral':'paper',n===1?.6:1,.6);});
  for(let n=0;n<3;n++){const [x,y]=H.p(1.6+n*.65,.25,3.58);shape(H,R,[[x-8,y],[x+9,y],[x+6,y-10],[x-5,y-16]],n%2?'sun':'coral',.6,.6);}
  shape(H,R,H.tile(2.53,4.2,5.7,4.0,.025),'teal',.12,.8);for(const i of [2.67,8.1])H.line(R,[H.p(i,4.36,.03),H.p(i,8.0,.03)],'coral',1.2);
  for(const j of [4.28,8.08])for(let n=0;n<17;n++)H.line(R,[H.p(2.69+n*.32,j,.035),H.p(2.69+n*.32,j+(j<5?-.12:.12),.035)],'sun',.9);
  for(const i of [2.67,8.08])H.line(R,[H.p(i,4.3,.034),H.p(i,8.0,.034)],'sun',2.4);
  for(const i of [4.55,6.4]){timber(H,R,i,5.34,.29,.87,.04,.17,'sun');bentTube(H,R,[[i+.12,5.78,.2],[5.63,5.66,.95]],2.7,'teal');}
  timber(H,R,4.91,5.23,1.43,.85,.12,.14,'teal');
  for(const i of [5.02,6.17])timber(H,R,i,5.29,.1,.67,.27,.52,'sun');
  timber(H,R,4.96,5.27,1.31,.76,.76,.11,'sun');
  const [hx,hy]=H.p(5.62,5.55,.81);oval(H,R,hx,hy,12,6,'blue',.6);oval(H,R,hx,hy-4,10,5,'sun',.65);
  for(let n=0;n<3;n++)H.line(R,[H.p(5.19+n*.21,6.04,.34),H.p(5.19+n*.21,6.04,.65)],['coral','paper','teal'][n],4.6);
  metal(H,R,5.44,5.46,.39,.39,.7,.57,'teal');oval(H,R,...H.p(5.63,5.66,1.21),18,9,'sun',.7);
  for(const [i,j,ink] of [[4.1,7.36,'coral'],[6.8,7.25,'sun']])cushion(H,R,i,j,1.27,1.12,.03,.17,ink);
  timber(H,R,9.02,5.47,2.0,1.5,.27,.13,'teal');timber(H,R,9.02,5.47,2.0,1.5,1.18,.13,'sun');
  for(const i of [9.04,10.89])for(const j of [5.49,6.82]){metal(H,R,i,j,.1,.1,.15,1.13,'teal');caster(H,R,i,j);}
  bentTube(H,R,[[9.04,5.49,1.27],[9.04,5.49,1.85],[10.97,5.49,1.85],[10.97,5.49,1.27]],2.6,'teal');books(H,R,9.14,5.78,.43,1.69,7);books(H,R,9.17,5.94,1.33,1.65,6);
  benchFrame(H,R,1.77,9.21,4.12,1.71,.54,'sun');
  shape(H,R,H.tile(1.92,9.34,3.82,1.42,.56),'paper',1,.6);
  const P=(i,j,h=0)=>H.p(i,j,.58+h);
  for(const [i,j,w] of [[2.08,9.48,.77],[3.02,9.45,.87]]){
    timber(H,R,i-.05,j-.12,w+.13,.26,.57,.13,'teal');
    shape(H,R,[P(i,j),P(i+w,j),P(i+w,j,.67),P(i+w*.55,j,1.11),P(i,j,.67)],i<3?'teal':'coral',.6,.7);
    shape(H,R,[P(i+w*.35,j+.01),P(i+w*.67,j+.01),P(i+w*.67,j+.01,.43),P(i+w*.35,j+.01,.43)],'paper',1,.5);
    for(const x of [i+.14,i+w-.21])shape(H,R,[P(x,j+.02,.55),P(x+.13,j+.02,.55),P(x+.13,j+.02,.75),P(x,j+.02,.75)],'sun',.76,.4);
  }
  bridge(H,R,4.03,9.69,.63,1.23);
  shape(H,R,H.tile(2.17,10.09,.95,.61,.59),'sun',.28,.5);
  shape(H,R,[P(2.29,10.49),P(2.85,10.49),P(2.85,10.49,.39),P(2.55,10.49,.6),P(2.29,10.49,.39)],'teal',.7,.6);
  drape(H,R,3.16,10.31,.66,.49,.59,.32,'coral');
  for(let n=0;n<4;n++)H.line(R,[P(3.2+n*.14,10.5,.01),P(3.2+n*.14,10.75,-.18)],'sun',.75);
  for(let n=0;n<3;n++){
    const [x,y]=P(4.55+n*.24,10.3,.03);oval(H,R,x,y,14-n*3,7-n*1.4,['teal','sun','paper'][n],n===2?1:.6);
  }
  const [mx,my]=P(5.33,10.46,.07);oval(H,R,mx,my,11,7,'sun',.66);oval(H,R,mx,my,7.7,4.5,'paper',1);H.line(R,[[mx-5,my+3],[mx+5,my-3]],'teal',1);H.line(R,[[mx+8,my+2],[mx+17,my+9]],'sun',3);
  metal(H,R,8.48,9.36,2.64,1.63,.02,.04,'teal');caneChair(H,R,9.0,9.58,'sun');bentTube(H,R,[[10.9,9.8,.02],[10.9,9.8,1.72],[10.74,9.8,1.89],[10.6,9.8,1.83]],2,'sun');metal(H,R,10.81,9.72,.18,.18,1.17,.1,'coral');
  const [bagX,bagY]=H.p(10.58,10.18,.06);
  shape(H,R,[[bagX-14,bagY],[bagX+14,bagY],[bagX+14,bagY-30],[bagX-11,bagY-31]],'coral',.55,.7);
  stroke(H,R,[[bagX-8,bagY-29],[bagX-9,bagY-44],[bagX+10,bagY-45],[bagX+10,bagY-29]],'sun',2);
  H.line(R,[[bagX-7,bagY-16],[bagX+7,bagY-16]],'paper',1.1);
  timber(H,R,9.16,8.21,1.14,.8,.04,.12,'sun');
  for(const i of [9.23,10.14])for(const j of [8.29,8.85])timber(H,R,i,j,.11,.1,.1,.47,'teal');
  cushion(H,R,9.1,8.18,1.24,.86,.58,.14,'paper');
  metal(H,R,10.64,8.67,.22,.25,.03,.62,'teal');metal(H,R,10.68,8.7,.14,.18,.65,.1,'sun');
},(H,R,t)=>{
  const {turn}=state(t),angle=-.24+turn*.5,P=(u,v,h=0)=>{const x=u*Math.cos(angle)-v*Math.sin(angle),y=u*Math.sin(angle)+v*Math.cos(angle);return H.p(5.63+x,5.66+y,1.32-v*.51+h);};
  shape(H,R,[P(-1.72,-.95),P(1.72,-.95),P(1.72,.79),P(-1.72,.79)],'sun',.7,.9);
  for(let n=0;n<5;n++)H.line(R,[P(-1.66,.7,-.025-n*.022),P(1.65,.7,-.025-n*.022)],n%2?'paper':'coral',.75);
  for(const side of [-1,1]){const a=side<0?-1.59:.035,b=side<0?-.035:1.59;shape(H,R,[P(a,-.83,.045),P(b,-.83,.045),P(b,.64,.045),P(a,.64,.045)],'paper',1,.65);for(let n=0;n<3;n++)H.line(R,[P(a,.66,.018-n*.025),P(b,.66,.018-n*.025)],'coral',.55);}
  H.line(R,[P(0,-.83,.08),P(0,.65,.08)],'blue',1.2);
  shape(H,R,[P(-1.48,.39,.08),P(-.97,-.04,.08),P(-.56,.14,.08),P(-.1,-.35,.08),P(.57,-.19,.08),P(.9,-.56,.08),P(1.43,-.1,.08),P(1.43,.53,.08),P(-1.48,.53,.08)],'teal',.52,.45);
  shape(H,R,[P(-.53,.45,.1),P(-.22,-.12,.1),P(.2,-.15,.1),P(.55,.45,.1),P(.33,.45,.1),P(.13,.1,.1),P(-.09,.12,.1),P(-.28,.45,.1)],'coral',.65,.5);
  for(const u of [-1.2,-.7,.66,1.15]){
    shape(H,R,[P(u,.26,.105),P(u+.23,.26,.105),P(u+.23,-.03,.105),P(u+.11,-.2,.105),P(u,-.03,.105)],u<0?'sun':'paper',u<0?.75:1,.45);
    H.line(R,[P(u+.06,.03,.11),P(u+.16,.03,.11)],'coral',.7);
  }
  H.line(R,[P(-1.45,.54,.12),P(-.98,.48,.12),P(-.56,.56,.12),P(.34,.49,.12),P(1.38,.55,.12)],'paper',1.7);
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
