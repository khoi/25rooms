import { world, actor, shape, oval, stroke, ell, loop, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, benchFrame, drape } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { hangingRail, floorShadow } from '../joinery.js';

const duration=22;
const ease=(a,b,t)=>{const p=Math.max(0,Math.min(1,(t-a)/(b-a)));return p*p*(3-2*p);};
const base={x:0,y:0,drop:0,lean:5,head:8,al:55,ar:72,el:35,er:10,ll:-5,lr:5,kl:0,kr:0,roll:0};
FIGURES.clips.londonSkateMechanic={dur:duration,keys:[[0,{...base}],[.2,{...base,ar:86,er:6}],[.4,{...base,ar:96,er:-4,head:12}],[.6,{...base,ar:96,er:-4,head:12}],[.9,{...base}],[1,{...base}]]};
FIGURES.clips.londonSkateFriend={dur:duration,keys:[[0,{...base,drop:.47,ll:82,lr:78,kl:-82,kr:-78,lean:0,ar:25,al:20,el:30,er:30}],[.47,{...base,drop:.47,ll:82,lr:78,kl:-82,kr:-78,lean:0,ar:25,al:20,el:30,er:30,head:18}],[.64,{...base,drop:.47,ll:82,lr:78,kl:-82,kr:-78,lean:0,ar:25,al:20,el:30,er:30,head:3}],[1,{...base,drop:.47,ll:82,lr:78,kl:-82,kr:-78,lean:0,ar:25,al:20,el:30,er:30}]]};
const deck=[[0,.35],[.15,.09],[.5,0],[3.6,0],[3.96,.09],[4.15,.35],[4.15,.6],[3.98,.86],[3.6,.95],[.5,.95],[.13,.86],[0,.6]];
const boardP=(H,u,v,off=0)=>H.p(3.08+u,5.55+off,1.65+v);
function board(H,R){
  for(const off of[-.13,-.09,-.045,0])shape(H,R,loop(deck.map(([u,v])=>boardP(H,u,v,off)),2),off===0?'sun':off===-.09?'coral':'paper',off===0?.76:1,.7);
  const P=(u,v)=>boardP(H,u,v,.018);
  shape(H,R,[P(.5,.18),P(1.7,.81),P(2.4,.18),P(3.6,.79),P(3.0,.28),P(2.43,.66),P(1.75,.28),P(1.4,.72)],'coral',.67,.6);
  H.line(R,[P(1.9,.2),P(2.04,.59),P(1.76,.35),P(2.18,.34),P(1.85,.56)],'paper',1.3);
  for(const u of[.85,3.25])for(const d of[-.14,.14])for(const z of[.27,.65])H.dot(...P(u+d,z),1.4,'blue');
  for(const u of[1.7,2.5]){metal(H,R,3.08+u,5.27,.17,.44,1.21,.63,'blue');const[x,y]=P(u,.01);H.line(R,[[x-6,y],[x+7,y]],'teal',5);H.line(R,[[x-5,y],[x+6,y]],'paper',1.3);}
}
function truck(H,R,u,tilt,turn,odd=false){
  const P=(a,v,off=.13)=>boardP(H,u+a,v,off);
  shape(H,R,[P(-.2,.29),P(.2,.29),P(.2,.65),P(-.2,.65)],'blue',.88,.65);
  const [x,y]=P(0,.47,.24);oval(H,R,x,y,6,4.5,'coral',.78);H.dot(x,y,2,'sun');
  const dx=Math.cos(tilt)*24,dy=Math.sin(tilt)*24;
  H.line(R,[[x-dx,y-dy],[x+dx,y+dy]],'blue',5.2);H.line(R,[[x-dx+2,y-dy-1],[x+dx-2,y+dy-1]],'paper',1.2);
  for(const s of[-1,1]){
    const wx=x+s*dx,wy=y+s*dy;oval(H,R,wx,wy,7.8,10.5,odd&&s===1?'coral':'teal',.7);oval(H,R,wx,wy,4.2,6,'paper',1);oval(H,R,wx,wy,2.7,4,'blue',.7);H.dot(wx,wy,1.2,'sun');
    const a=turn+(s===1?.6:0);H.line(R,[[wx+Math.cos(a)*4.7,wy+Math.sin(a)*7.4],[wx+Math.cos(a)*6.8,wy+Math.sin(a)*9.2]],'sun',1.3);
    if(odd&&s===-1)H.line(R,[[wx-4,wy+9],[wx+4,wy+9]],'blue',1.7);
  }
}
function helmet(H,R,x,y,ink='coral',patched=false){
  shape(H,R,loop([[x-13,y],[x-12,y-13],[x-4,y-20],[x+7,y-19],[x+14,y-9],[x+13,y+1],[x+3,y+4],[x-8,y+2]],2),ink,.72,.7);
  for(const dx of[-6,0,6])H.line(R,[[x+dx-1,y-14],[x+dx+1,y-7]],'blue',1.5);stroke(H,R,[[x-9,y+1],[x-3,y+19],[x+7,y+3]],'blue',1.2);if(patched)H.line(R,[[x-4,y+11],[x,y+13]],'paper',2.4);
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

const room=world('london-skate-bench','A truck turns smoothly',{wall:false,floor:'paper',tone:1,head:42},(H,R)=>{
  for(let i=0;i<12;i+=2)for(let j=0;j<12;j+=1.6)shape(H,R,H.tile(i+.035,j+.035,1.93,1.53,.01),'teal',((i+j)%3===0)?.15:.06,.45);
  masonry(H,R,'ne',0,12,0,3.25,'paper',1);masonry(H,R,'nw',0,8.4,0,2.95,'teal',.31);
  for(const [i,j]of[[.1,.1],[11.7,.1],[.1,8.3]])timber(H,R,i,j,.24,.24,0,3.65,'sun');
  timber(H,R,0,0,12,.28,3.57,.24,'sun');timber(H,R,0,0,.28,8.7,3.57,.24,'sun');
  for(let i=.45;i<11.8;i+=1.27)timber(H,R,i,.04,.13,2.17,3.55,.13,'teal');
  bentTube(H,R,[[.2,8.6,3.72],[.2,9.15,3.72],[.2,9.15,.18]],3.4,'blue');
  for(const j of[9.55,11.5])timber(H,R,.12,j,.24,.24,0,2.53,'sun');
  for(let j=9.65;j<11.5;j+=.31)bentTube(H,R,[[.23,j,.14],[.23,j,2.14]],1.7,'teal');
  for(const z of[.23,2.1])bentTube(H,R,[[.23,9.6,z],[.23,11.64,z]],2.8,'teal');
  metal(H,R,.28,11.31,.08,.29,1.18,.13,'blue');H.line(R,[H.p(.29,11.42,1.2),H.p(.29,11.74,1.2)],'sun',2.5);
  cabinetFrame(H,R,8.35,.45,3.18,1.68,0,3.1,2,'teal',(i,j,w,d,z,h,n)=>{
    for(const zz of[.6,1.55,2.35])timber(H,R,i,j,w,d,zz,.1,'teal');
    if(n===0){for(let k=0;k<3;k++){const[x,y]=H.p(i+.22+k*.41,j+.7,.72);shape(H,R,loop([[x-5,y],[x-8,y-8],[x-7,y-43],[x-2,y-48],[x+5,y-45],[x+7,y-7],[x+5,y]],2),'sun',.61,.7);H.line(R,[[x-3,y-38],[x+3,y-12]],k%2?'coral':'teal',2.7);}for(let k=0;k<3;k++){const[x,y]=H.p(i+.23+k*.4,j+.87,1.87);oval(H,R,x,y,8,9,k===1?'coral':'teal',.7);oval(H,R,x,y,3,3.4,'blue',.8);}}
    else{for(let k=0;k<2;k++){const[x,y]=H.p(i+.37+k*.65,j+.8,.29);shape(H,R,[[x-9,y],[x+10,y],[x+11,y-8],[x+3,y-12],[x-6,y-8]],'blue',.7,.6);H.line(R,[[x-4,y-6],[x+6,y-6]],'paper',.8);}for(let k=0;k<2;k++){metal(H,R,i+.05,j,w-.1,d,1.65+k*.22,.2,'sun');H.line(R,[H.p(i+.43,j+d,1.74+k*.22),H.p(i+.88,j+d,1.74+k*.22)],'blue',1.5);}drape(H,R,i+.06,j,w-.12,d,2.48,.17,'coral');}
    if(n===0)helmet(H,R,...H.p(i+.72,j+.74,2.51),'sun',true);
  });
  hangingRail(H,R,'ne',1.15,5.9,2.8,4,(P,u,n)=>{
    const[x,y]=P(u,-.11);shape(H,R,loop([[x-8,y],[x-10,y+7],[x-10,y+36],[x-4,y+43],[x+5,y+41],[x+10,y+35],[x+10,y+7],[x+6,y]],2),n%2?'coral':'sun',.63,.7);stroke(H,R,[[x-7,y+13],[x+6,y+24],[x-6,y+35]],n%2?'paper':'teal',2.2);
  });
  timber(H,R,.16,5.7,.62,2.2,1.95,.12,'sun');
  const P=(u,v)=>H.p(.49,5.9+u,2.08+v);shape(H,R,[P(0,0),P(1.65,0),P(1.65,.13),P(.43,.63),P(0,.65)],'teal',.55,.8);H.line(R,[P(0,.65),P(.43,.63),P(1.65,.13)],'paper',1.3);shape(H,R,[P(.05,.6),P(.26,.6),P(.26,.52),P(.05,.52)],'coral',.65,.4);
  for(const j of[5.95,7.55]){const[x,y]=H.p(.66,j,1.93);shape(H,R,[[x,y],[x-10,y+19],[x-7,y+23]],'sun',.76,.6);H.line(R,[[x-3,y+9],[x-8,y+18]],'coral',1.2);}
  benchFrame(H,R,2.6,4.28,5.32,2.3,1.11,'sun');
  metal(H,R,3.84,5.13,1.3,.77,1.11,.14,'blue');metal(H,R,4.15,5.03,.31,1.15,1.23,.18,'teal');
  const [vx,vy]=H.p(4.2,6.21,1.25);H.line(R,[[vx-19,vy],[vx+18,vy]],'blue',2.2);oval(H,R,vx-19,vy,3,3,'coral',.8);oval(H,R,vx+18,vy,3,3,'coral',.8);
  board(H,R);
  const[tx,ty]=H.p(6.87,6.12,1.15);H.line(R,[[tx-10,ty],[tx+10,ty]],'blue',2.4);H.line(R,[[tx,ty],[tx,ty-12]],'blue',2.4);for(const [x,y]of[[tx-10,ty],[tx+10,ty],[tx,ty-12]])oval(H,R,x,y,3,2.5,'sun',.7);
  const [dx,dy]=H.p(3.1,6.06,1.15);oval(H,R,dx,dy,15,7,'paper',1);for(let n=0;n<5;n++){oval(H,R,dx-8+n*4,dy-1,2.1,2,'blue',.7);H.dot(dx-8+n*4,dy-1,.7,'sun');}
  helmet(H,R,...H.p(7.2,4.83,1.2),'coral');
  benchFrame(H,R,1.3,9.06,3.45,1.5,.66,'teal');
  const[cx,cy]=H.p(2.02,9.67,.69);oval(H,R,cx,cy,15,11,'teal',.67);oval(H,R,cx,cy,8,6,'paper',1);shape(H,R,[[cx,cy],[cx+17,cy-9],[cx+17,cy+9]],'paper',1,.7);oval(H,R,cx+1,cy,4.5,3.5,'blue',.8);
  const [sx,sy]=H.p(3.17,9.66,.72);oval(H,R,sx,sy,7,4,'coral',.7);oval(H,R,sx,sy,3,2,'blue',.8);
  shape(H,R,[H.p(3.65,9.24,.7),H.p(4.43,9.24,.7),H.p(4.4,10.05,.75),H.p(4.1,10.1,.86),H.p(3.65,10.02,.73)],'blue',.83,.6);H.line(R,[H.p(3.67,10,.74),H.p(4.11,10.08,.88),H.p(4.42,10.01,.77)],'paper',1.2);
  for(const i of[6.5,10.9])bentTube(H,R,[[i,9.7,.03],[i,9.7,.73],[i+.16,9.7,.73]],4,'teal');bentTube(H,R,[[6.45,9.7,.74],[11.05,9.7,.74]],4.7,'blue');H.line(R,[H.p(6.5,9.68,.78),H.p(10.95,9.68,.78)],'paper',1.3);
  drape(H,R,10.2,7.2,1.17,.76,.31,.13,'coral');metal(H,R,10.1,7.14,1.35,.88,0,.29,'teal');
  const [fx,fy]=H.p(10.65,7.6,.35);shape(H,R,[[fx-12,fy],[fx+12,fy],[fx+10,fy-18],[fx-9,fy-17]],'paper',1,.7);H.line(R,[[fx,fy-13],[fx,fy-4]],'coral',2.5);H.line(R,[[fx-4,fy-8],[fx+4,fy-8]],'coral',2.5);
  shape(H,R,H.tile(.52,10.9,1.54,.45,.025),'blue',.65,.6);for(let i=.63;i<2.03;i+=.14)H.line(R,[H.p(i,10.94,.04),H.p(i,11.3,.04)],'paper',.65);
},(H,R,time)=>{
  const t=((time%duration)+duration)%duration,tilt=ease(4.4,8.8,t)*(1-ease(13.2,20,t))*.23,turn=TAU*2*ease(4.4,18.8,t);
  truck(H,R,.87,0,0);truck(H,R,3.25,tilt,turn,true);
  const wrist=boardP(H,3.25,.47,.13),grip=[wrist[0]+Math.cos(tilt)*24,wrist[1]+Math.sin(tilt)*24];
  reachPose(H,'londonSkateContact',FIGURES.sample('londonSkateMechanic',t/duration),7.19,6.45,0,1.95,'sw',{r:grip,l:boardP(H,3.05,.17,.02)});
  actor(H,R,7.19,6.45,t,'londonSkateContact',{face:'sw',shirt:['coral',.68],pants:['blue',.8],skin:['coral',.47],hairStyle:'cap'},0,1.95);
  actor(H,R,8.64,9.58,t,'londonSkateFriend',{face:'sw',shirt:['teal',.75],pants:['blue',.74],skin:['coral',.27],hairStyle:'curly'},.62,1.72);
  const sway=.05*Math.sin(TAU*t/duration);const [x,y]=H.p(8.65,2.1,2.6);shape(H,R,[[x-11,y],[x+10,y],[x+11+sway*12,y+30],[x-8+sway*12,y+31]],'teal',.32,.6);for(let n=0;n<5;n++){H.line(R,[[x-9+n*4,y+3],[x-7+n*4+sway*12,y+28]],'blue',.45);H.line(R,[[x-8,y+7+n*4],[x+9,y+7+n*4]],'blue',.45);}
});
room.loopSeconds=duration;
room.stillTime=20.4;
export default room;
