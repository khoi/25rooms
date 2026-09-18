import { world, actor, shape, oval, stroke, ell, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, bentTube, drape, vessel } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, cityView, hangingRail, taskLight } from '../joinery.js';

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
  cabinetFrame(H,R,3.15,.35,7.55,1.5,.1,3.6,4,'sun',(x,j,w,d,z,h,n)=>{
    timber(H,R,x,j,w,d,z+1.05,.1,'sun');timber(H,R,x,j,w,d,z+2.16,.1,'sun');
    if(n===0){metal(H,R,x+.1,j+.16,w-.2,.9,z+.16,.55,'teal');H.line(R,[H.p(x+.5,j+1.07,z+.56),H.p(x+1.05,j+1.07,z+.56)],'paper',1.8);for(let k=0;k<3;k++)vessel(H,R,x+.3+k*.47,j+.62,z+1.2,7,15,k===1?'coral':'paper',false);basin(H,R,x+.81,j+.72,z+2.28,.2,.31,true);}
    else if(n===1){for(let k=0;k<4;k++)timber(H,R,x+.11,j+.18,w-.23,.88,z+.13+k*.16,.1,'paper');for(let k=0;k<3;k++){const [px,py]=H.p(x+.31+k*.47,j+.7,z+1.3);shape(H,R,[[px-7,py],[px+7,py],[px+7,py-15],[px-7,py-13]],['teal','coral','sun'][k],.6,.5);}for(let k=0;k<3;k++)vessel(H,R,x+.25+k*.51,j+.63,z+2.3,6,18,'paper');}
    else if(n===2){for(let k=0;k<3;k++){timber(H,R,x+.11,j+.1,w-.2,.95,z+.14+k*.29,.22,'teal');H.line(R,[H.p(x+.58,j+1.05,z+.29+k*.29),H.p(x+1.01,j+1.05,z+.29+k*.29)],'sun',1.4);}const [px,py]=H.p(x+.75,j+.74,z+1.31);for(let k=0;k<3;k++)oval(H,R,px+k*2,py-k*5,17-k*3,6-k,'paper',1);drape(H,R,x+.12,j+.12,w-.24,.8,z+2.6,.3,'paper');}
    else{for(let k=0;k<2;k++)metal(H,R,x+.18+k*.76,j+.23,.56,.72,z+.12,.63,'paper');for(let k=0;k<4;k++)H.line(R,[H.p(x+.24+k*.33,j+.45,z+1.2),H.p(x+.24+k*.33,j+.45,z+1.87)],'blue',2);for(let k=0;k<2;k++)metal(H,R,x+.1+k*.81,j+.3,.67,.67,z+2.3,.48,k?'teal':'coral');}
  });
  hangingRail(H,R,'nw',6.6,4.6,3.57,7,(P,u,n)=>{shape(H,R,[P(u-.2,-.16),P(u+.2,-.16),P(u+.2,-.66),P(u-.2,-.66)],n===5?'sun':['coral','teal','paper'][n%3],n===5?.27:.67,.6);if(n===5){for(let k=0;k<3;k++)H.line(R,[P(u-.15,-.26-k*.1),P(u+.13,-.29-k*.1)],'coral',.6);}else H.line(R,[P(u-.1,-.23),P(u-.1,-.52)],'paper',1);});
  timber(H,R,.2,6.4,1.35,4.9,.1,.7,'teal');timber(H,R,.15,6.32,1.5,5.04,.8,.16,'sun');
  for(let n=0;n<4;n++){const j=6.52+n*1.13;shape(H,R,H.faceJ(1.56,j,1.03,.2,.71),'paper',1,.6);H.line(R,[H.p(1.59,j+.35,.5),H.p(1.59,j+.65,.5)],'blue',1.4);}
  for(let n=0;n<4;n++){const [x,y]=H.p(.85,6.8+n*1.18,1.0);const q=[[x-13,y],[x-13,y-29],[x-6,y-30],[x-5,y-13],[x+4,y-4],[x+16,y-4],[x+16,y]];shape(H,R,q,'paper',1,.7);H.line(R,[[x-9,y-26],[x-8,y-11],[x,y-1],[x+13,y-1]],n%2?'teal':'coral',2);}
  benchFrame(H,R,2.7,3.48,5.85,3.82,1.1,'sun');
  for(const i of [3.0,6.8]){timber(H,R,i,3.74,1.3,2.93,.4,.12,'teal');for(let n=0;n<3;n++)metal(H,R,i+.1,3.96+n*.78,1.0,.63,.53,.17,'paper');}
  metal(H,R,4.85,5.08,.88,.88,1.1,.27,'teal');
  const C=H.p(5.28,5.5,1.4);oval(H,R,...C,85,39,'sun',.65);oval(H,R,C[0],C[1]-2,81,36,'paper',1);
  metal(H,R,4.84,7.0,.56,.25,1.11,.17,'coral');H.line(R,[H.p(5.0,7.14,1.3),H.p(5.16,7.14,1.3)],'sun',1.5);
  timber(H,R,4.1,6.78,.5,.39,1.11,.15,'sun');H.line(R,[H.p(4.17,7.02,1.27),H.p(4.5,7.02,1.27)],'blue',2.2);
  taskLight(H,R,8.14,3.56,1.1,'coral',-.5);
  metal(H,R,8.96,7.9,2.37,2.42,.08,.2,'teal');shape(H,R,H.tile(9.08,8.03,2.13,2.15,.3),'blue',.45,.6);
  const [nx,ny]=H.p(10.13,9.05,.33);oval(H,R,nx,ny,52,25,'paper',1);oval(H,R,nx,ny,37,17,'teal',.15);H.line(R,[[nx-42,ny+5],[nx-39,ny-1],[nx-33,ny-3]],'blue',1.1);
  timber(H,R,9.0,10.5,2.3,.13,.1,.94,'sun');shape(H,R,H.faceI(9.13,10.66,2.03,.22,.96),'paper',1,.6);drape(H,R,10.7,8.06,.49,1.55,.65,.48,'coral');
  benchFrame(H,R,2.8,9.5,2.6,1.15,.58,'teal');
  const [px,py]=H.p(3.3,10.0,.6);shape(H,R,[[px-12,py],[px-11,py-20],[px-6,py-20],[px-5,py-8],[px+10,py-5],[px+10,py]],'paper',1);stroke(H,R,[[px-9,py-19],[px-7,py-5],[px+7,py-3]],'teal',2);H.dot(px-6,py+1,2.4,'teal');
  const [dx,dy]=H.p(4.8,10.0,.64);shape(H,R,[[dx-12,dy],[dx-12,dy-8],[dx-6,dy-12],[dx,dy-12],[dx,dy-7],[dx-6,dy-5],[dx-6,dy]],'paper',1,.6);H.line(R,[[dx-9,dy-8],[dx-9,dy-2]],'coral',2);
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
