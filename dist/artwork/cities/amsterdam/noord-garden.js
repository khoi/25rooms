import { world, actor, shape, oval, stroke, ell, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, vessel, slattedSeat, drape, branchSpray } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { hangingRail, specimen } from '../joinery.js';

const T=20;
const ease=(a,b,t)=>{const x=Math.max(0,Math.min(1,(t-a)/(b-a)));return x*x*(3-2*x);};
const state=t=>{const u=((t%T)+T)%T;return {u,open:ease(4,8,u)*(1-ease(12,18,u))};};
const rest={x:0,y:0,drop:0,lean:0,head:8,al:20,ar:25,el:30,er:30,ll:-5,lr:5,kl:0,kr:0,roll:0};
const clip='amsterdamNoordGardener';
FIGURES.clips[clip]={dur:T,keys:[[0,{...rest}],[1,{...rest}]]};
FIGURES.clips.amsterdamNoordChild={dur:T,keys:[[0,{...rest,al:60,ar:65,el:70,er:60,head:8}],[.4,{...rest,al:60,ar:65,el:70,er:60,head:-9}],[.6,{...rest,al:60,ar:65,el:70,er:60,head:-9}],[1,{...rest,al:60,ar:65,el:70,er:60,head:8}]]};
function gardener(H,R,t,open,targets){const i=7.7,j=6-open*.25,s=2.1,[x,y]=H.p(i,j),q={...rest,head:8+open*7};for(const [side,p] of Object.entries(targets)){const dx=(p[0]-x)/s-(side==='l'?-5.2:5.2),dy=(p[1]-y)/s+32.5,a=4.368,b=4.2,c=Math.max(.2,Math.min(a+b-.001,Math.hypot(dx,dy))),e=Math.acos((c*c-a*a-b*b)/(2*a*b));q['a'+side]=(Math.atan2(dx,dy)-Math.atan2(b*Math.sin(e),a+b*Math.cos(e)))*180/Math.PI;q['e'+side]=e*180/Math.PI;}FIGURES.clips[clip].keys=[[0,q],[1,q]];actor(H,R,i,j,t,clip,{shirt:['paper',1],apron:['teal',.7],pants:['blue',.65],hairStyle:'bun',skin:['coral',.48]},0,s);}
function seedling(H,R,i,j,z,n=0,s=1){const [x,y]=H.p(i,j,z);stroke(H,R,[[x,y],[x-1*s,y-12*s],[x+2*s,y-24*s]],'teal',1.2);for(let k=0;k<4;k++){const sign=k%2?1:-1,yy=y-(7+k*4)*s;shape(H,R,[[x,yy],[x+sign*10*s,yy-8*s],[x+sign*13*s,yy-4*s],[x+sign*6*s,yy+2*s]],n%3===1?'sun':'teal',.45+k*.07,.5);H.line(R,[[x,yy],[x+sign*10*s,yy-4*s]],'paper',.55);} }
function trowel(H,R,x,y,s=1){H.line(R,[[x,y],[x+6*s,y-15*s]],'sun',3*s);shape(H,R,[[x+2*s,y-12*s],[x+11*s,y-11*s],[x+14*s,y-23*s],[x+9*s,y-27*s],[x+4*s,y-23*s]],'paper',1,.7);H.line(R,[[x+8*s,y-14*s],[x+10*s,y-22*s]],'teal',.7);}
const room=world('amsterdam-noord-garden','The seedling has a roof',{floor:'paper',tone:.92,wall:false,head:45},(H,R)=>{
  masonry(H,R,'nw',0,11.1,0,3.15,'coral',.2);masonry(H,R,'ne',0,12,0,3.8,'paper',1);
  for(let j=.12;j<12;j+=.82)for(let i=(Math.floor(j/.82)%2)*.58;i<12;i+=1.2){shape(H,R,H.tile(i,j,Math.min(1.12,12-i),Math.min(.74,12-j),.015),'paper',1,.4);if((Math.floor(j*10)+Math.floor(i*10))%7===0)H.line(R,[H.p(i+.08,j+.77,.02),H.p(i+.63,j+.77,.02)],'teal',1.1,{tone:.4});}
  timber(H,R,.28,.3,.2,10.5,3.3,.22,'teal');timber(H,R,.28,.3,8.4,.2,3.3,.22,'teal');
  for(const j of [.4,10.6])timber(H,R,.28,j,.2,.2,.01,3.3,'teal');
  for(let j=.4;j<10.7;j+=1.4)bentTube(H,R,[[.41,j,3.37],[1.73,j,3.69],[3.05,j,3.37]],2.2,'teal');
  bentTube(H,R,[[.18,.3,3.53],[.18,10.7,3.53],[.18,10.7,.3],[.58,10.7,.2]],2.5,'blue');
  metal(H,R,.5,10.1,1.8,.48,.03,.035,'blue');for(let n=0;n<9;n++)H.line(R,[H.p(.61+n*.19,10.15,.07),H.p(.61+n*.19,10.54,.07)],'paper',.8);
  cabinetFrame(H,R,3.65,.38,6.92,1.55,.12,2.94,4,'teal',(x,j,w,d,z,h,n)=>{
    timber(H,R,x,j,w,d,z+.96,.1,'sun');timber(H,R,x,j,w,d,z+1.96,.1,'sun');
    if(n===0){metal(H,R,x+.1,j+.13,w-.2,.93,z+.1,.58,'coral');shape(H,R,H.tile(x+.14,j+.18,w-.27,.83,z+.7),'blue',.47,.5);shape(H,R,[H.p(x+.2,j+.26,z+.72),H.p(x+.73,j+.26,z+.72),H.p(x+.73,j+.85,z+.82),H.p(x+.2,j+.85,z+.82)],'sun',.6,.4);for(let k=0;k<4;k++)H.dot(...H.p(x+.3+k*.23,j+.48,z+.74),1.7,'sun');for(let k=0;k<2;k++)vessel(H,R,x+.44+k*.69,j+.65,z+1.1,10,16,'coral');for(let k=0;k<3;k++)vessel(H,R,x+.3+k*.45,j+.63,z+2.1,7,12,'paper');}
    else if(n===1){for(let k=0;k<3;k++)timber(H,R,x+.13,j+.13,w-.26,.9,z+.13+k*.24,.16,'sun');const [sx,sy]=H.p(x+.7,j+.74,z+1.16);oval(H,R,sx,sy,22,11,'sun',.55);for(let k=-2;k<=2;k++)H.line(R,[[sx-16,sy+k*3],[sx+16,sy+k*3]],'blue',.55);for(let k=-3;k<=3;k++)H.line(R,[[sx+k*4,sy-8],[sx+k*4,sy+8]],'blue',.55);shape(H,R,[[sx+8,sy],[sx+16,sy],[sx+14,sy+6],[sx+8,sy+6]],'coral',.62,.4);for(let k=0;k<4;k++)timber(H,R,x+.08,j+.1,w-.16,.89,z+2.09+k*.15,.1,'paper');}
    else if(n===2){for(let k=0;k<3;k++)vessel(H,R,x+.28+k*.47,j+.59,z+.12,8,20,'coral');vessel(H,R,x+.8,j+.66,z+1.12,13,21,'teal');bentTube(H,R,[[x+1.13,j+.65,z+1.3],[x+1.45,j+.65,z+1.73]],2);drape(H,R,x+.12,j+.2,w-.26,.78,z+2.31,.19,'paper');}
    else{for(let k=0;k<3;k++)metal(H,R,x+.15+k*.41,j+.2,.31,.7,z+.13,.67,k===1?'sun':'paper');for(let k=0;k<3;k++)trowel(H,R,...H.p(x+.3+k*.4,j+.72,z+1.16),.65);for(let k=0;k<5;k++)H.line(R,[H.p(x+.15+k*.27,j+.3,z+2.08),H.p(x+.22+k*.27,j+.3,z+2.63)],'sun',1.8);}
  });
  hangingRail(H,R,'ne',4.0,6.1,3.55,6,(P,u,n)=>{if(n<3){const [x,y]=P(u,-.65);branchSpray(H,R,x,y,.6,n===1?'coral':'teal');}else{H.line(R,[P(u,-.12),P(u,-.71)],'sun',2.6);H.line(R,[P(u-.1,-.21),P(u+.1,-.21)],'coral',1.1);}});
  hangingRail(H,R,'nw',1.05,4.8,2.58,5,(P,u,n)=>{const [x,y]=P(u,-.56);if(n===4)trowel(H,R,x,y,.56);else {H.line(R,[[x,y-5],[x+4,y-28]],'sun',2);shape(H,R,[[x-7,y-4],[x+7,y-4],[x+5,y+9],[x,y+13],[x-5,y+9]],n%2?'teal':'paper',n%2?.6:1,.6);}});
  slattedSeat(H,R,.76,7.9,3.9,0,'sun',.6);drape(H,R,1.0,8.0,1.0,.65,.84,.39,'teal');
  const [hx,hy]=H.p(3.75,8.22,.82);oval(H,R,hx,hy,16,6,'sun',.6);oval(H,R,hx,hy-6,9,7,'sun',.7);H.line(R,[[hx-7,hy-3],[hx+7,hy-3]],'coral',2);
  vessel(H,R,1.35,8.29,.87,5,21,'blue',false);
  for(const i of [2.54,7.0])for(const j of [4.2,6.43])timber(H,R,i,j,.22,.22,.04,.52,'teal');
  timber(H,R,2.5,4.18,4.8,2.45,.46,.18,'sun');
  shape(H,R,H.tile(2.65,4.33,4.5,2.12,.65),'blue',.52,.6);
  for(const i of [2.6,7.09])timber(H,R,i,4.24,.11,2.31,.67,.9,'sun');
  timber(H,R,2.5,4.16,4.8,.18,.65,1.2,'sun');timber(H,R,2.5,6.47,4.8,.18,.65,.72,'sun');
  for(let n=0;n<4;n++){const i=2.72+n*1.06;metal(H,R,i,4.5,.91,1.7,1.08,.1,'teal');shape(H,R,H.tile(i+.06,4.56,.79,1.55,1.19),'blue',.55,.5);for(let k=0;k<3;k++)seedling(H,R,i+.45,4.79+k*.56,1.23,n,.7+(k%2)*.18);}
  for(const i of [2.77,6.76]){metal(H,R,i,4.12,.34,.32,1.8,.1,'blue');for(const x of [i+.07,i+.26])H.dot(...H.p(x,4.17,1.91),1.2,'sun');}
  for(let i=2.85;i<7;i+=.68)H.line(R,[H.p(i,6.67,.73),H.p(i+.31,6.67,.73)],'teal',1.1);
  const [px,py]=H.p(2.89,7.33,.04);vessel(H,R,2.89,7.33,.04,12,22,'coral');stroke(H,R,[[px-4,py-16],[px-3,py-2],[px+5,py+3],[px+10,py-3],[px+8,py-11]],'sun',1.6);H.line(R,[[px+2,py-22],[px+3,py]],'blue',.8);
  metal(H,R,9.1,3.2,1.8,2.25,.28,.12,'teal');shape(H,R,[H.p(9.1,3.2,.4),H.p(10.9,3.2,.4),H.p(10.55,5.2,1.03),H.p(9.38,5.2,1.03)],'sun',.5,.8);bentTube(H,R,[[9.25,3.2,.5],[9.2,5.85,.75]],2.5);bentTube(H,R,[[10.72,3.2,.5],[10.72,5.85,.75]],2.5);oval(H,R,...H.p(10.0,3.45,.15),10,11,'blue',.85);H.dot(...H.p(10.0,3.45,.15),3,'sun');
  metal(H,R,5.5,9.1,1.93,1.45,.02,.09,'teal');trowel(H,R,...H.p(6.7,9.75,.13),.72);oval(H,R,...H.p(5.96,9.48,.13),7,4,'coral',.7);H.dot(...H.p(5.96,9.48,.14),2.2,'paper');
  const [rx,ry]=H.p(7.12,10.23,.03);oval(H,R,rx,ry,16,7,'sun',.6);oval(H,R,rx,ry,11,4.3,'paper',1);
},(H,R,t)=>{
  const {open}=state(t),a=open*.36,P=(u,v,h=0)=>H.p(2.5+u,4.2+v*Math.cos(a),1.85+v*Math.sin(a)-v/2.4*.2*Math.cos(a)+h);
  for(let n=0;n<3;n++){const l=n*1.6;const Q=[P(l+.08,.1),P(l+1.52,.1),P(l+1.52,2.3),P(l+.08,2.3)];H.tint(Q,n===1?'teal':'paper',n===1?.18:.12);H.outline(R,Q,'teal',.8);H.line(R,[P(l+.23,.25,.014),P(l+.5,1.24,.014)],'paper',2.1);}
  for(const u of [0,1.6,3.2,4.8]){H.line(R,[P(u,0),P(u,2.4)],'blue',4);H.line(R,[P(u+.015,0,.012),P(u+.015,2.4,.012)],'sun',1.8);}
  for(const v of [0,2.4]){H.line(R,[P(0,v),P(4.8,v)],'blue',4.5);H.line(R,[P(0,v,.02),P(4.8,v,.02)],'sun',2.6);}
  const support=H.p(7.23,5.18,1.66),tip=P(4.74,1.86);H.line(R,[support,tip],'blue',2);H.line(R,[[support[0]+1,support[1]], [tip[0]+1,tip[1]]],'paper',.75);H.dot(...support,2.2,'sun');H.dot(...tip,2.1,'sun');
  gardener(H,R,t,open,{l:P(4.73,1.5),r:H.p(7.55,5.72,1.82)});
  actor(H,R,5.7,8.2,t,'amsterdamNoordChild',{shirt:['sun',.7],pants:['coral',.65],hairStyle:'cap',prop:(HH,RR,pts)=>{const x=(pts.lhand[0]+pts.rhand[0])/2,y=(pts.lhand[1]+pts.rhand[1])/2;shape(HH,RR,[[x-8,y-5],[x+8,y-5],[x+6,y+8],[x-6,y+8]],'coral',.55,.6);oval(HH,RR,x,y-5,8,3,'paper',1);oval(HH,RR,x,y-5,5.7,1.7,'blue',.55);}},0,1.6,'child');
  const [leafX,leafY]=H.p(4.22,5.35,1.73),leafSway=Math.sin(t/T*TAU*2)*1.6*open;stroke(H,R,[[leafX,leafY+10],[leafX+leafSway,leafY]],'teal',1);shape(H,R,[[leafX+leafSway,leafY],[leafX-7+leafSway,leafY-7],[leafX-11+leafSway,leafY-4],[leafX-4+leafSway,leafY+2]],'teal',.72,.5);
  const [x,y]=H.p(2.2,8.06,.91),d=Math.sin(t/T*TAU)*1.7;stroke(H,R,[[x,y],[x+d,y+12],[x+4+d,y+19]],'teal',1.2);
});
room.loopSeconds=T;room.stillTime=10;
export default room;
