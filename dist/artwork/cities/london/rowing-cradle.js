import { world, actor, shape, oval, stroke, ell, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, benchFrame, drape } from '../materials.js';
import { masonry, rackFrame } from '../structure.js';
import { windowBay, hangingRail, floorShadow, caster } from '../joinery.js';

const duration=18;
const ease=(a,b,t)=>{const p=Math.max(0,Math.min(1,(t-a)/(b-a)));return p*p*(3-2*p);};
const base={x:0,y:0,drop:.47,lean:-9,head:7,al:55,ar:67,el:24,er:18,ll:85,lr:83,kl:-70,kr:-66,roll:0};
FIGURES.clips.londonRowingRower={dur:duration,keys:[[0,{...base}],[.2,{...base,head:12}],[.4,{...base,lean:-2,ll:100,lr:96,kl:-108,kr:-105,al:49,ar:55}],[.6,{...base,lean:-2,ll:100,lr:96,kl:-108,kr:-105,al:49,ar:55}],[.89,{...base}],[1,{...base}]]};
FIGURES.clips.londonRowingMate={dur:duration,keys:[[0,{...base,drop:0,ll:-5,lr:5,kl:0,kr:0,lean:8,head:12,al:52,ar:65,el:30,er:18}],[.46,{...base,drop:0,ll:-5,lr:5,kl:0,kr:0,lean:8,head:17,al:52,ar:65,el:30,er:18}],[.63,{...base,drop:0,ll:-5,lr:5,kl:0,kr:0,lean:8,head:2,al:52,ar:65,el:30,er:18}],[1,{...base,drop:0,ll:-5,lr:5,kl:0,kr:0,lean:8,head:12,al:52,ar:65,el:30,er:18}]]};
const hullPoint=(H,u,v,z)=>H.p(1.32+u,3.68+v+u*.12,z);
const hullPlan=[[0,.83],[.63,.3],[1.7,.03],[6.35,0],[7.65,.35],[8.9,.83],[7.65,1.38],[6.35,1.68],[1.7,1.67],[.63,1.36]];
function oar(H,R,i,j,z,length,ink='coral'){
  const P=(u,h)=>H.p(i+u,j,z+h);
  H.line(R,[P(0,0),P(.15,length)],'blue',2.6);H.line(R,[P(.015,0),P(.165,length)],'sun',1.1);
  shape(H,R,[P(.05,length*.76),P(.49,length*.83),P(.58,length),P(.14,length+.13)],ink,.7,.7);
  for(let n=0;n<4;n++)H.line(R,[P(.05,length*.08+n*.035),P(.19,length*.08+n*.035)],n%2?'teal':'coral',2.4);
}
function hull(H,R,front=false){
  const top=hullPlan.map(([u,v])=>hullPoint(H,u,v,1.4));
  if(!front){
    const keel=hullPlan.map(([u,v])=>hullPoint(H,u*.97+.13,v*.63+.3,.98));
    shape(H,R,keel,'teal',.73,1);shape(H,R,top,'paper',1,1.1);
    shape(H,R,hullPlan.map(([u,v])=>hullPoint(H,u*.95+.22,v*.76+.2,1.38)),'blue',.53,.8);
    shape(H,R,hullPlan.map(([u,v])=>hullPoint(H,u*.92+.35,v*.56+.38,1.19)),'teal',.28,.7);
    for(let u=1.1;u<8.3;u+=.9){stroke(H,R,[hullPoint(H,u,.24,1.36),hullPoint(H,u,.54,1.17),hullPoint(H,u,1.12,1.17),hullPoint(H,u,1.43,1.37)],'sun',2.8);stroke(H,R,[hullPoint(H,u,.24,1.36),hullPoint(H,u,.54,1.17),hullPoint(H,u,1.12,1.17),hullPoint(H,u,1.43,1.37)],'blue',.7);}
    for(const u of[3.25,4.15,5.05,5.95])H.line(R,[hullPoint(H,u,.25,1.4),hullPoint(H,u,.25,1.65)],'blue',1.5);
    H.line(R,[hullPoint(H,3.2,.25,1.65),hullPoint(H,6,.25,1.65)],'teal',3.4);H.line(R,[hullPoint(H,3.2,.25,1.68),hullPoint(H,6,.25,1.68)],'paper',1.1);
    for(const v of[.58,1.08]){H.line(R,[hullPoint(H,2.9,v,1.29),hullPoint(H,6.6,v,1.29)],'blue',3.5);H.line(R,[hullPoint(H,2.9,v,1.31),hullPoint(H,6.6,v,1.31)],'paper',1.2);for(const u of[3.0,6.4])H.dot(...hullPoint(H,u,v,1.32),1.3,'sun');}
    shape(H,R,[hullPoint(H,5.8,.4,1.21),hullPoint(H,6.2,.4,1.8),hullPoint(H,6.2,1.25,1.8),hullPoint(H,5.8,1.25,1.21)],'sun',.56,.9);
    for(const v of[.54,.95]){const[x,y]=hullPoint(H,5.96,v,1.43);shape(H,R,[[x-6,y+8],[x+4,y+9],[x+8,y-11],[x-2,y-12]],'blue',.8,.65);H.line(R,[[x-5,y],[x+6,y+2]],'coral',2.2);H.outline(R,[[x-1,y-1],[x+3,y],[x+3,y+4],[x-1,y+3]],'paper',.7);}
    for(const u of[2.6,6.4]){bentTube(H,R,[[1.32+u,3.55+u*.12,1.35],[1.32+u+.25,2.94+u*.12,1.77],[1.32+u+1,3.5+u*.12,1.4]],2.1,'teal');const[x,y]=hullPoint(H,u+.25,-.69,1.77);H.line(R,[[x,y],[x,y-11]],'blue',2);stroke(H,R,[[x-5,y-11],[x-5,y-19],[x+6,y-19],[x+6,y-11]],'sun',2);}
  }else{
    const rim=[...hullPlan.slice(4).map(([u,v])=>hullPoint(H,u,v,1.4)),...hullPlan.slice(4).reverse().map(([u,v])=>hullPoint(H,u*.97+.13,v*.7+.25,1.03))];shape(H,R,rim,'teal',.67,.9);
    H.line(R,hullPlan.slice(4).map(([u,v])=>hullPoint(H,u,v,1.43)),'paper',2.2);
    const patch=[hullPoint(H,6.05,1.7,1.34),hullPoint(H,6.69,1.7,1.34),hullPoint(H,6.68,1.6,1.11),hullPoint(H,6.04,1.6,1.11)];shape(H,R,patch,'paper',1,.6);for(let n=0;n<4;n++)H.line(R,[hullPoint(H,6.1+n*.15,1.68,1.3),hullPoint(H,6.17+n*.15,1.62,1.15)],'coral',.65);
  }
}
function reachPose(H, name, pose, i, j, z, scale, face, targets) {
  const origin=H.p(i,j,z), mirror=face==='sw'||face==='nw'?-1:1, a=pose.lean*Math.PI/180;
  for(const [side,target] of Object.entries(targets)){
    const sign=side==='l'?-1:1, sx=-Math.sin(a)*15+sign*5.2*Math.cos(a)-1.5*Math.sin(a), sy=pose.drop*19-19-Math.cos(a)*15+sign*5.2*Math.sin(a)+1.5*Math.cos(a);
    const dx=(target[0]-origin[0])/scale*mirror-sx,dy=(target[1]-origin[1])/scale-sy,L=4.368,M=4.2,d=Math.min(L+M-.001,Math.max(.01,Math.hypot(dx,dy))),bend=Math.acos(Math.max(-1,Math.min(1,(d*d-L*L-M*M)/(2*L*M))));
    pose['a'+side]=(Math.atan2(dx,dy)-Math.acos(Math.max(-1,Math.min(1,(L*L+d*d-M*M)/(2*L*d)))))*180/Math.PI;
    pose['e'+side]=bend*180/Math.PI;
  }
  FIGURES.clips[name]={dur:duration,keys:[[0,pose],[1,pose]]};
}

const room=world('london-rowing-cradle','Two hands on the stretcher',{wall:false,floor:'blue',tone:.14,head:48},(H,R)=>{
  masonry(H,R,'ne',0,12,0,3.7,'paper',1);masonry(H,R,'nw',0,12,0,3.7,'teal',.38);
  for(const j of[2,5,8,11])H.line(R,[H.p(0,j),H.p(12,j)],'blue',.6,{tone:.4});
  for(const i of[3,7,10])H.line(R,[H.p(i,0),H.p(i,12)],'blue',.55,{tone:.3});
  windowBay(H,R,'nw',1.1,7.45,2.76,.8,{divisions:5,view:P=>{shape(H,R,[P(.1,.12),P(7.3,.12),P(7.3,.46),P(.1,.37)],'teal',.3,.3);for(let n=0;n<12;n++)H.line(R,[P(.3+n*.59,.27),P(.64+n*.59,.27)],'paper',1);}});
  for(const j of[.14,10.8]){bentTube(H,R,[[.2,j,3.72],[6,j,4.2],[11.8,j,3.72]],4,'blue');bentTube(H,R,[[.2,j,3.72],[11.8,j,3.72]],3.3,'teal');for(let i=.5;i<10;i+=2.7)bentTube(H,R,[[i,j,3.76],[i+1.35,j,4.06],[i+2.7,j,3.76]],1.4,'blue');}
  rackFrame(H,R,7.5,.5,3.8,1.7,.08,[.35,1.22,2.1], 'teal',(i,j,w,d,z,row)=>{
    if(row===0){for(let n=0;n<3;n++)drape(H,R,i+n*1.1,j,.92,d,z+.22,.15,n%2?'coral':'paper');}
    if(row===1){for(let n=0;n<4;n++){metal(H,R,i+n*.85,j,.72,d,z,.39,n%2?'teal':'sun');const[x,y]=H.p(i+.32+n*.85,j+d,z+.2);H.line(R,[[x-4,y],[x+4,y]],'blue',1.5);}}
    if(row===2){drape(H,R,i,j,w,d,z+.13,.45,'paper');for(let n=0;n<5;n++)H.line(R,[H.p(i+n*.7,j,z+.15),H.p(i+n*.7,j+d,z+.15)],'teal',1);}
  });
  hangingRail(H,R,'ne',1.6,5.25,3.15,4,(P,u,n)=>{const[x,y]=P(u,-.1);shape(H,R,[[x-11,y],[x-4,y-4],[x+5,y-4],[x+12,y],[x+14,y+26],[x+3,y+30],[x,y+10],[x-2,y+30],[x-13,y+27]],n===2?'sun':'coral',.69,.75);H.line(R,[[x-10,y+13],[x+11,y+13]],'blue',2);H.outline(R,[[x-3,y+10],[x+3,y+10],[x+3,y+16],[x-3,y+16]],'paper',.7);});
  for(let n=0;n<4;n++)oar(H,R,10.4+n*.31,2.05+n*.08,.25,3.6-n*.18,n%2?'sun':'coral');
  for(const i of[3.0,8.85]){
    floorShadow(H,i-.55,4,1.5,2.65,.2);
    for(const j of[3.55,5.9])bentTube(H,R,[[i-.48,j,.03],[i,j,1.02],[i+.48,j,.03]],4,'teal');
    timber(H,R,i-.17,3.4,.34,2.7,.93,.16,'sun');drape(H,R,i-.22,3.4,.44,2.7,1.13,.12,'paper');
    H.line(R,[H.p(i-.25,5.85,1.12),H.p(i+.26,5.85,1.12)],'coral',2);for(let n=0;n<5;n++)H.line(R,[H.p(i-.2+n*.08,5.78,1.14),H.p(i-.16+n*.08,5.91,1.14)],'blue',.5);
  }
  hull(H,R);
  benchFrame(H,R,.55,8.1,3.6,1.55,.71,'sun');
  shape(H,R,H.tile(.78,8.29,.83,.68,.75),'paper',1,.7);shape(H,R,H.tile(.9,8.41,.57,.45,.79),'teal',.48,.65);
  const[x,y]=H.p(2.05,8.9,.8);shape(H,R,[[x-9,y],[x+8,y],[x+5,y-12],[x-7,y-11]],'coral',.65,.7);stroke(H,R,[[x-6,y-9],[x-1,y-19],[x+5,y-12]],'blue',1.4);
  const card=H.faceI(2.8,8.85,.69,.76,1.28);shape(H,R,card,'paper',1,.55);stroke(H,R,[H.p(2.9,8.86,.93),H.p(3.1,8.86,1.12),H.p(3.4,8.86,1.03)],'teal',1.2);oval(H,R,...H.p(3.1,8.83,.77),8,4,'sun',.72);
  benchFrame(H,R,7.7,9.5,3.7,.92,.64,'sun');drape(H,R,9.7,9.5,1.4,.91,.67,.2,'coral');
  const[bx,by]=H.p(8.5,10.1,.68);shape(H,R,[[bx-15,by],[bx+16,by],[bx+13,by-22],[bx-11,by-20]],'blue',.72,.8);stroke(H,R,[[bx-8,by-20],[bx-7,by-30],[bx+6,by-30],[bx+9,by-21]],'teal',2);
  for(let n=0;n<3;n++){const[fx,fy]=H.p(10.6,8.2+n*.36,.3);oval(H,R,fx,fy,4.5,5,'coral',.67);H.line(R,[[fx,fy],[fx,fy-14]],'paper',5);H.line(R,[[fx-2,fy-15],[fx+2,fy-15]],'blue',2);}
  bentTube(H,R,[[9.95,7.97,.07],[9.95,8.95,.07],[11.14,8.95,.07],[11.14,7.97,.07],[9.95,7.97,.07]],2,'teal');
  const [mx,my]=H.p(8.15,.6,2.92);shape(H,R,[[mx-9,my],[mx-4,my-14],[mx+4,my-14],[mx+9,my],[mx+3,my+4],[mx-3,my+4]],'coral',.67,.7);for(const dx of[-3,3])H.dot(mx+dx,my-6,1.3,'paper',1);
  const [hx,hy]=H.p(.22,8.65,2.18); for(let n=0;n<4;n++)H.outline(R,ell(hx,hy,15+n*2,21+n*2),'blue',1.1);H.line(R,[[hx-3,hy-24],[hx+4,hy-24]],'sun',3);stroke(H,R,[[hx,hy+27],[hx+10,hy+38],[hx+2,hy+55]],'teal',2);
  const [px,py]=H.p(4.3,.28,3.43);H.line(R,[[px,py-11],[px,py]],'blue',2);oval(H,R,px,py+10,10,12,'sun',.6);oval(H,R,px,py+10,5,6,'blue',.7);stroke(H,R,[[px-9,py+10],[px-8,py+37],[px+8,py+40],[px+10,py+10]],'coral',1);
  metal(H,R,.2,10.6,5,.19,.015,.03,'blue');for(let i=.3;i<5.15;i+=.22)H.line(R,[H.p(i,10.61,.06),H.p(i,10.77,.06)],'paper',.55);
},(H,R,time)=>{
  const t=((time%duration)+duration)%duration,slide=ease(3.6,7.2,t)*(1-ease(10.8,16,t)),u=4.0+1.04*slide;
  for(const v of[.57,1.09])oval(H,R,...hullPoint(H,u,v,1.35),4,3,'blue',.8);
  const seat=[hullPoint(H,u-.32,.44,1.51),hullPoint(H,u+.36,.44,1.51),hullPoint(H,u+.36,1.25,1.51),hullPoint(H,u-.32,1.25,1.51)];shape(H,R,seat,'sun',.75,.8);H.line(R,[hullPoint(H,u-.25,.52,1.53),hullPoint(H,u+.28,.52,1.53)],'paper',1.1);
  const rowPose=FIGURES.sample('londonRowingRower',t/duration);rowPose.lean=-38+8*slide;
  reachPose(H,'londonRowingContact',rowPose,1.32+u,4.5+u*.12,.975,1.7,'se',{l:hullPoint(H,u-.15,.25,1.66),r:hullPoint(H,u+.15,.25,1.66)});
  actor(H,R,1.32+u,4.5+u*.12,t,'londonRowingContact',{shirt:['paper',1],pants:['blue',.82],skin:['coral',.4],hairStyle:'pony'},.975,1.7);
  hull(H,R,true);
  const matePose=FIGURES.sample('londonRowingMate',t/duration);matePose.lean=-70;
  reachPose(H,'londonRowingMateContact',matePose,2.38,5.6,0,1.8,'se',{r:H.p(3.05,5.58,1.4),l:H.p(2.92,5.52,1.13)});
  actor(H,R,2.38,5.6,t,'londonRowingMateContact',{shirt:['coral',.74],pants:['teal',.8],skin:['coral',.63],hairStyle:'curly'},0,1.8);
  const sway=.05*Math.sin(TAU*t/duration);stroke(H,R,[H.p(9.1,2.2,2.31),H.p(9.06+sway,2.3,1.87),H.p(9.15+sway,2.34,1.59)],'coral',1.7);
  if(t>15){const p=(t-15)/3;H.opacity(Math.sin(p*Math.PI)*.5,()=>H.line(R,[hullPoint(H,1.4+p*5,1.67,1.2),hullPoint(H,2.35+p*5,1.67,1.2)],'paper',2));}
});
room.loopSeconds=duration;
room.stillTime=5.4;
export default room;
