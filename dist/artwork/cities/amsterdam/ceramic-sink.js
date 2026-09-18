import { world, actor, shape, oval, stroke, ell, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, bentTube, drape, vessel } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, cityView, hangingRail, taskLight, recessedFrame, radiator } from '../joinery.js';

const T=18;
const ease=(a,b,t)=>{const x=Math.max(0,Math.min(1,(t-a)/(b-a)));return x*x*(3-2*x);};
const state=t=>{const u=((t%T)+T)%T;return {u,turn:ease(3.6,7.2,u)*(1-ease(10.8,16,u)),template:ease(7.2,8.3,u)*(1-ease(12.3,15,u))};};
const clip='amsterdamCeramicDesigner',rest={x:0,y:0,drop:0,lean:0,head:0,al:20,ar:25,el:30,er:30,ll:-5,lr:5,kl:0,kr:0,roll:0};
FIGURES.clips[clip]={dur:T,keys:[[0,{...rest}],[1,{...rest}]]};
function designer(H,R,t,left,right){const s=1.7,[x,y]=H.p(5.32,7.47),q={...rest,head:8+state(t).template*5};for(const [side,p] of [['l',left],['r',right]]){const dx=(p[0]-x)/s-(side==='l'?-5.2:5.2),dy=(p[1]-y)/s+32.5,a=4.368,b=4.2,c=Math.max(.2,Math.min(a+b-.001,Math.hypot(dx,dy))),e=Math.acos((c*c-a*a-b*b)/(2*a*b));q['a'+side]=(Math.atan2(dx,dy)-Math.atan2(b*Math.sin(e),a+b*Math.cos(e)))*180/Math.PI;q['e'+side]=e*180/Math.PI;}FIGURES.clips[clip].keys=[[0,q],[1,q]];actor(H,R,5.32,7.47,t,clip,{shirt:['teal',.65],apron:['coral',.7],pants:['blue',.65],hairStyle:'pony',skin:['coral',.3]},0,s);}
function basin(H,R,i,j,z,angle=0,size=1,rough=false){
  const P=(r,a,h)=>{const xx=Math.cos(a)*r*2.08,yy=Math.sin(a)*r*1.45;return H.p(i+(xx*Math.cos(angle)-yy*Math.sin(angle))*size,j+(xx*Math.sin(angle)+yy*Math.cos(angle))*size,z+(h+.1*Math.cos(a+angle))*size);};
  const outer=Array.from({length:48},(_,n)=>P(1,n/48*TAU,.9)),foot=Array.from({length:48},(_,n)=>P(.43,n/48*TAU,.09)),inner=Array.from({length:48},(_,n)=>P(.86,n/48*TAU,.91));
  shape(H,R,outer.concat(foot.slice().reverse()),rough?'sun':'paper',rough?.3:1,.85);H.tint(outer.concat(foot.slice().reverse()),'blue',.06);
  shape(H,R,outer,rough?'sun':'paper',rough?.35:1,1.2);shape(H,R,inner,'teal',rough?.22:.18,.8);
  H.clip(inner,()=>{shape(H,R,Array.from({length:30},(_,n)=>P(.9,n/29*Math.PI+Math.PI,.88)).concat(Array.from({length:30},(_,n)=>P(.52,Math.PI*2-n/29*Math.PI,.33))),'blue',.22,.3);H.line(R,Array.from({length:24},(_,n)=>P(.77,n/23*Math.PI*.7+.1,.71)),'paper',2.5);});
  const drain=P(.19,1.5,.41);oval(H,R,...drain,8*size,4*size,'paper',1);oval(H,R,...drain,5.2*size,2.6*size,'blue',.9);H.line(R,[P(.99,3.1,.94),P(.99,3.45,.94),P(.99,3.7,.94)],'sun',1.7);
  H.line(R,[P(.83,4.5,.83),P(.83,4.74,.83)],'blue',2.8);H.line(R,[P(.84,4.5,.85),P(.84,4.74,.85)],'paper',.7);
  for(let n=0;n<3;n++)H.line(R,[P(.46,1.0+n*.35,.12),P(.57,1.0+n*.35,.27)],'coral',.55);
}
const room=world('amsterdam-ceramic-sink','The water follows the rim',{floor:'paper',pattern:'tiles',accent:'coral',wall:false,head:45},(H,R)=>{
  masonry(H,R,'nw',0,12,0,4.3,'paper',1);masonry(H,R,'ne',0,12,0,4.3,'paper',1);
  windowBay(H,R,'nw',.8,5.05,1.65,2.35,{ink:'teal',divisions:3,view:P=>cityView(H,R,P,5.05,2.35)});
  for(const side of ['nw','ne']){const P=(u,z)=>side==='nw'?H.p(.14,u,z):H.p(u,.14,z);H.line(R,[P(.1,.2),P(11.9,.2)],'teal',4);H.line(R,[P(.1,4.17),P(11.9,4.17)],'sun',2.3);}
  radiator(H,R,'nw',1.25,2.67,.77);
  recessedFrame(H,R,'ne',.51,2.05,1.55,2.38,'teal',P=>{
    shape(H,R,[P(.14,.13),P(1.9,.13),P(1.9,2.22),P(.14,2.22)],'paper',1,.4);
    for(let n=0;n<3;n++){
      stroke(H,R,[P(.28,.38+n*.62),P(.47,.62+n*.62),P(.98,.66+n*.62),P(1.62,.36+n*.62)],n===1?'coral':'teal',1.5);
      H.line(R,[P(.28,.25+n*.62),P(1.68,.25+n*.62)],'blue',.65);
    }
  });
  cabinetFrame(H,R,3.15,.35,7.55,1.5,.1,3.6,4,'sun',(x,j,w,d,z,h,n)=>{
    timber(H,R,x,j,w,d,z+1.05,.1,'sun');timber(H,R,x,j,w,d,z+2.16,.1,'sun');
    if(n===0){metal(H,R,x+.1,j+.16,w-.2,.9,z+.16,.55,'teal');H.line(R,[H.p(x+.5,j+1.07,z+.56),H.p(x+1.05,j+1.07,z+.56)],'paper',1.8);for(let k=0;k<3;k++)vessel(H,R,x+.3+k*.47,j+.62,z+1.2,7,15,k===1?'coral':'paper',false);basin(H,R,x+.81,j+.72,z+2.28,.2,.31,true);}
    else if(n===1){for(let k=0;k<4;k++)timber(H,R,x+.11,j+.18,w-.23,.88,z+.13+k*.16,.1,'paper');for(let k=0;k<3;k++){const [px,py]=H.p(x+.31+k*.47,j+.7,z+1.3);shape(H,R,[[px-7,py],[px+7,py],[px+7,py-15],[px-7,py-13]],['teal','coral','sun'][k],.6,.5);}for(let k=0;k<3;k++)vessel(H,R,x+.25+k*.51,j+.63,z+2.3,6,18,'paper');}
    else if(n===2){for(let k=0;k<3;k++){timber(H,R,x+.11,j+.1,w-.2,.95,z+.14+k*.29,.22,'teal');H.line(R,[H.p(x+.58,j+1.05,z+.29+k*.29),H.p(x+1.01,j+1.05,z+.29+k*.29)],'sun',1.4);}const [px,py]=H.p(x+.75,j+.74,z+1.31);for(let k=0;k<3;k++)oval(H,R,px+k*2,py-k*5,17-k*3,6-k,'paper',1);drape(H,R,x+.12,j+.12,w-.24,.8,z+2.6,.3,'paper');}
    else{for(let k=0;k<2;k++)metal(H,R,x+.18+k*.76,j+.23,.56,.72,z+.12,.63,'paper');for(let k=0;k<4;k++)H.line(R,[H.p(x+.24+k*.33,j+.45,z+1.2),H.p(x+.24+k*.33,j+.45,z+1.87)],'blue',2);for(let k=0;k<2;k++)metal(H,R,x+.1+k*.81,j+.3,.67,.67,z+2.3,.48,k?'teal':'coral');}
  });
  for(let n=0;n<3;n++){
    const x=3.64+n*2.08;
    timber(H,R,x,.47,1.45,.97,3.72,.09,'teal');
    const [px,py]=H.p(x+.7,.93,3.87);
    if(n===0){shape(H,R,[[px-15,py],[px-12,py-21],[px-2,py-29],[px+10,py-22],[px+15,py]],'paper',1,.8);oval(H,R,px,py-10,9,5,'teal',.3);}
    if(n===1){for(let k=0;k<4;k++){const xx=px-15+k*10;shape(H,R,[[xx,py],[xx+8,py],[xx+8,py-19-k*2],[xx,py-17-k*2]],k%2?'teal':'coral',.5,.5);H.dot(xx+4,py-13-k*2,1.5,'paper');}}
    if(n===2){stroke(H,R,[[px-17,py],[px-17,py-26],[px-8,py-31],[px+2,py-21],[px+17,py-21],[px+17,py]],'sun',5);stroke(H,R,[[px-12,py-2],[px-12,py-22],[px-7,py-24],[px+4,py-16],[px+12,py-16]],'paper',1.6);}
  }
  hangingRail(H,R,'nw',6.6,4.6,3.57,7,(P,u,n)=>{shape(H,R,[P(u-.2,-.16),P(u+.2,-.16),P(u+.2,-.66),P(u-.2,-.66)],n===5?'sun':['coral','teal','paper'][n%3],n===5?.27:.67,.6);if(n===5){for(let k=0;k<3;k++)H.line(R,[P(u-.15,-.26-k*.1),P(u+.13,-.29-k*.1)],'coral',.6);}else H.line(R,[P(u-.1,-.23),P(u-.1,-.52)],'paper',1);});
  timber(H,R,.2,6.4,1.35,4.9,.1,.7,'teal');timber(H,R,.15,6.32,1.5,5.04,.8,.16,'sun');
  for(let n=0;n<4;n++){const j=6.52+n*1.13;shape(H,R,H.faceJ(1.56,j,1.03,.2,.71),'paper',1,.6);H.line(R,[H.p(1.59,j+.35,.5),H.p(1.59,j+.65,.5)],'blue',1.4);}
  hangingRail(H,R,'nw',6.91,3.98,2.45,3,(P,u,n)=>{
    const [x,y]=P(u,-.15);
    const curve=[[x-11,y],[x-11,y+12],[x-4,y+24],[x+16,y+30],[x+16,y+22],[x+2,y+17],[x-3,y+8],[x-3,y]];
    shape(H,R,curve,n===1?'teal':'sun',.48,.7);H.dot(x-7,y+4,1.6,'blue');
    H.line(R,[[x-7,y+12],[x,y+21],[x+12,y+26]],'paper',1.2);
  });
  for(let n=0;n<4;n++){const [x,y]=H.p(.85,6.8+n*1.18,1.0);const q=[[x-13,y],[x-13,y-29],[x-6,y-30],[x-5,y-13],[x+4,y-4],[x+16,y-4],[x+16,y]];shape(H,R,q,'paper',1,.7);H.line(R,[[x-9,y-26],[x-8,y-11],[x,y-1],[x+13,y-1]],n%2?'teal':'coral',2);}
  timber(H,R,.23,4.4,1.37,1.64,.05,.96,'teal');
  timber(H,R,.17,4.34,1.52,1.78,1.01,.12,'sun');
  {
    const P=(u,v,h=0)=>H.p(.39+u,4.51+v,1.91-u*.72+h);
    shape(H,R,[P(0,0),P(1.02,0),P(1.02,1.27),P(0,1.27)],'sun',.55,.8);
    shape(H,R,[P(.09,.1,.012),P(.93,.1,.012),P(.93,1.17,.012),P(.09,1.17,.012)],'paper',1,.5);
    stroke(H,R,[P(.24,.34,.02),P(.13,.67,.02),P(.41,.93,.02),P(.78,.76,.02),P(.76,.39,.02),P(.24,.34,.02)],'teal',1.3);
    H.line(R,[P(.14,.19,.02),P(.83,1.08,.02)],'coral',.8);
    for(const v of [.24,1.04])H.line(R,[P(.02,v,.03),P(.14,v,.03)],'blue',3.5);
    H.line(R,[H.p(.43,4.59,1.15),P(.04,.08)],'teal',2.7);
  }
  for(let n=0;n<3;n++){const j=4.5+n*.47;shape(H,R,H.faceJ(1.63,j,.39,.2,.85),'paper',1,.5);H.line(R,[H.p(1.66,j+.12,.67),H.p(1.66,j+.27,.67)],'coral',1.3);}
  benchFrame(H,R,2.7,3.48,5.85,3.82,1.1,'sun');
  for(const i of [3.0,6.8]){timber(H,R,i,3.74,1.3,2.93,.4,.12,'teal');for(let n=0;n<3;n++)metal(H,R,i+.1,3.96+n*.78,1.0,.63,.53,.17,'paper');}
  for(const [x,w] of [[2.91,1.45],[5.94,2.31]]){
    shape(H,R,H.faceI(x,7.13,w,.27,.81),'teal',.68,.7);
    shape(H,R,H.faceI(x+.1,7.15,w-.2,.38,.72),'paper',1,.5);
    H.line(R,[H.p(x+w*.36,7.18,.56),H.p(x+w*.66,7.18,.56)],'blue',2);
  }
  shape(H,R,H.tile(4.5,3.87,1.4,.57,1.11),'teal',.27,.6);
  for(let n=0;n<3;n++){
    const [x,y]=H.p(4.78+n*.43,4.13,1.14);
    oval(H,R,x,y,6,3,'paper',1);oval(H,R,x,y-4,6,3,'paper',1);oval(H,R,x,y-4,3.1,1.5,'blue',.66);
  }
  const [calX,calY]=H.p(3.0,6.06,1.14);
  H.line(R,[[calX-3,calY-20],[calX+17,calY+6]],'blue',2.3);H.line(R,[[calX-3,calY-20],[calX-11,calY-13]],'sun',2);H.line(R,[[calX+10,calY-3],[calX+2,calY+4]],'sun',2);
  drape(H,R,7.15,6.27,.83,.69,1.13,.43,'paper');
  metal(H,R,4.85,5.08,.88,.88,1.1,.27,'teal');
  const [spx,spy]=H.p(5.28,5.5,1.3);
  oval(H,R,spx,spy,40,19,'blue',.68);oval(H,R,spx,spy-4,36,17,'coral',.5);
  for(let n=0;n<8;n++){const a=n/8*TAU;H.dot(spx+Math.cos(a)*29,spy-4+Math.sin(a)*13,2,'sun');}
  const C=H.p(5.28,5.5,1.4);oval(H,R,...C,85,39,'sun',.65);oval(H,R,C[0],C[1]-2,81,36,'paper',1);
  metal(H,R,4.84,7.0,.56,.25,1.11,.17,'coral');H.line(R,[H.p(5.0,7.14,1.3),H.p(5.16,7.14,1.3)],'sun',1.5);
  timber(H,R,4.1,6.78,.5,.39,1.11,.15,'sun');H.line(R,[H.p(4.17,7.02,1.27),H.p(4.5,7.02,1.27)],'blue',2.2);
  taskLight(H,R,8.14,3.56,1.1,'coral',-.5);
  metal(H,R,8.96,7.9,2.37,2.42,.08,.2,'teal');shape(H,R,H.tile(9.08,8.03,2.13,2.15,.3),'blue',.45,.6);
  const [nx,ny]=H.p(10.13,9.05,.33);oval(H,R,nx,ny,52,25,'paper',1);oval(H,R,nx,ny,37,17,'teal',.15);H.line(R,[[nx-42,ny+5],[nx-39,ny-1],[nx-33,ny-3]],'blue',1.1);
  timber(H,R,9.0,10.5,2.3,.13,.1,.94,'sun');shape(H,R,H.faceI(9.13,10.66,2.03,.22,.96),'paper',1,.6);drape(H,R,10.7,8.06,.49,1.55,.65,.48,'coral');
  benchFrame(H,R,2.05,9.27,4.28,1.67,.72,'teal');
  timber(H,R,2.2,9.42,3.97,1.36,.25,.1,'sun');
  for(let n=0;n<3;n++)timber(H,R,2.39+n*1.12,9.64,.94,.9,.36,.15,n===1?'paper':'teal');
  const [px,py]=H.p(2.74,9.75,.75);
  shape(H,R,[[px-18,py],[px-19,py-40],[px-9,py-43],[px-7,py-22],[px+2,py-11],[px+24,py-8],[px+25,py]],'paper',1,1);
  stroke(H,R,[[px-14,py-39],[px-13,py-22],[px-3,py-8],[px+20,py-4]],'teal',3.5);
  stroke(H,R,[[px-9,py-40],[px-7,py-22],[px+2,py-11],[px+24,py-8]],'coral',1.3);
  for(let k=0;k<4;k++)H.line(R,[[px-18,py-9-k*6],[px-13,py-12-k*6]],'sun',.8);
  basin(H,R,4.65,9.81,.75,-.2,.37,true);
  const [dx,dy]=H.p(5.57,10.3,.76);
  shape(H,R,[[dx-14,dy],[dx-14,dy-11],[dx-6,dy-17],[dx+2,dy-17],[dx+2,dy-8],[dx-6,dy-5],[dx-6,dy]],'paper',1,.7);
  H.line(R,[[dx-10,dy-11],[dx-10,dy-2]],'coral',2.6);H.dot(dx+7,dy+2,3,'teal');
  const [tx,ty]=H.p(3.63,10.45,.77);oval(H,R,tx,ty,11,4.5,'paper',1);oval(H,R,tx,ty,6,2.5,'blue',.75);H.line(R,[[tx-11,ty],[tx-3,ty+4]],'coral',2);
  metal(H,R,4.01,10.48,.79,.27,.74,.04,'teal');
  for(let n=0;n<4;n++)H.line(R,[H.p(4.1+n*.17,10.54,.8),H.p(4.1+n*.17,10.69,.8)],'sun',1.4);
  drape(H,R,2.28,10.43,.64,.4,.76,.38,'paper');
  for(const i of [9.17,11.0]){metal(H,R,i,10.62,.22,.13,.29,.31,'teal');H.line(R,[H.p(i+.03,10.77,.43),H.p(i+.2,10.77,.43)],'sun',1.4);}
  H.line(R,[H.p(9.32,10.68,.65),H.p(10.93,10.68,.65)],'sun',1.1);
},(H,R,t)=>{
  const {turn,template}=state(t),angle=turn*.59;
  basin(H,R,5.28,5.5,1.37,angle,1);
  const mark=H.p(5.28+Math.sin(angle)*.9,5.5+Math.cos(angle)*1.42,1.415);H.line(R,[mark,[mark[0]+5,mark[1]+2]],'coral',2.4);
  const left=H.p(4.35,7.03-template*.06,1.27+template*.14),right=H.p(5.45,7.05,1.3);designer(H,R,t,left,right);
  const [x,y]=left,curve=[[x-11,y+2],[x-12,y-9],[x-7,y-20],[x+2,y-23],[x+9,y-17],[x+8,y-6],[x+4,y+1]];shape(H,R,curve,'sun',.68,.8);stroke(H,R,[[x-8,y-1],[x-9,y-9],[x-5,y-17],[x+2,y-19],[x+5,y-14]],'paper',1.9);oval(H,R,x-3,y-7,2.4,3.7,'coral',.35);H.dot(x,y+1,2.2,'coral',.3);
  const [sx,sy]=H.p(11.15,9.2,.62),sway=Math.sin(t/T*TAU)*1.6;stroke(H,R,[[sx,sy],[sx+sway,sy+11],[sx+5+sway,sy+16]],'coral',2);
});
room.loopSeconds=T;room.stillTime=9;
export default room;
