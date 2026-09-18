import { world, actor, shape, oval, stroke, ell, loop, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, drape, bentTube, cushion } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { windowBay, hangingRail, floorShadow, wallRack, taskLight, radiator } from '../joinery.js';

const duration=16;
const ease=(a,b,t)=>{const p=Math.max(0,Math.min(1,(t-a)/(b-a)));return p*p*(3-2*p);};
const mix=(a,b,p)=>a+(b-a)*p;
const base={x:0,y:0,drop:0,lean:-4,head:13,al:55,ar:67,el:40,er:28,ll:-5,lr:5,kl:0,kr:0,roll:0};
FIGURES.clips.londonViolinMaker={dur:duration,keys:[[0,{...base}],[.2,{...base,ar:92,er:0,head:17}],[.4,{...base,al:91,el:8,ar:74,er:17}],[.6,{...base,al:91,el:8,ar:74,er:17}],[.77,{...base,ar:94,er:8}],[.88,{...base}],[1,{...base}]]};
FIGURES.clips.londonViolinCustomer={dur:duration,keys:[[0,{...base,al:18,ar:22,el:12,er:16,head:2}],[.38,{...base,al:18,ar:22,el:12,er:16,head:2}],[.52,{...base,al:18,ar:22,el:12,er:16,head:15}],[.8,{...base,al:18,ar:22,el:12,er:16,head:2}],[1,{...base,al:18,ar:22,el:12,er:16,head:2}]]};
const shell=[[0,.52],[.2,.16],[.75,0],[3.52,0],[4.15,.23],[4.48,.59],[4.48,.95],[4.15,1.31],[3.52,1.49],[.75,1.49],[.2,1.29],[0,.98]];
const violin=[[0,-.2],[.43,-.23],[.62,-.42],[.96,-.45],[1.15,-.2],[1.4,-.33],[1.63,-.58],[2.07,-.6],[2.43,-.37],[2.5,0],[2.43,.37],[2.07,.6],[1.63,.58],[1.4,.33],[1.15,.2],[.96,.45],[.62,.42],[.43,.23],[0,.2]];
function outline(H,R,i,j,z,scale=1,ink='sun'){
  const pts=loop(violin.map(([a,b])=>H.p(i+a*scale,j+b*scale,z)),2);shape(H,R,pts,ink,.68,.85);
  H.line(R,[H.p(i+.15*scale,j,z+.01),H.p(i+2.22*scale,j,z+.01)],'coral',.7);
  const p=H.p(i+1.52*scale,j,z+.02);H.dot(...p,2,'paper',1);
}
function caseBase(H,R){
  const P=(a,b,z=1.46)=>H.p(2.95+a,4.35+b,z);
  const top=loop(shell.map(([a,b])=>P(a,b)),2),bottom=loop(shell.map(([a,b])=>P(a,b,1.25)),2);
  shape(H,R,bottom,'blue',.8,1);shape(H,R,top,'sun',.63,1);
  const inner=loop(shell.map(([a,b])=>P(.13+a*.94,.1+b*.85,1.47)),2);shape(H,R,inner,'blue',.7,.8);
  const velvet=loop(shell.map(([a,b])=>P(.25+a*.88,.2+b*.71,1.45)),2);shape(H,R,velvet,'coral',.31,.7);
  const cavity=loop(violin.map(([a,b])=>P(.69+a*1.21,.74+b*.91,1.48)),2);shape(H,R,cavity,'blue',.78,.75);
  const lining=loop(violin.map(([a,b])=>P(.73+a*1.17,.74+b*.82,1.49)),2);shape(H,R,lining,'teal',.36,.55);
  for(let n=0;n<7;n++)H.line(R,[P(1.1+n*.38,.16,1.49),P(1.16+n*.38,.35,1.49)],'paper',.75,{tone:.65});
  shape(H,R,H.tile(3.13,4.78,.46,.55,1.52),'coral',.52,.7);shape(H,R,H.tile(3.21,4.88,.26,.33,1.54),'paper',1,.45);
  shape(H,R,H.tile(3.7,4.88,.34,.34,1.5),'paper',1,.55);for(let n=0;n<4;n++)H.line(R,[H.p(3.7+n*.08,4.9,1.51),H.p(3.7+n*.08,5.2,1.51)],'sun',.55);
  for(const i of[3.65,6.65]){metal(H,R,i,5.82,.25,.1,1.25,.19,'sun');H.dot(...H.p(i+.12,5.94,1.34),1.25,'blue');}
  const [hx,hy]=H.p(5.1,5.9,1.34);stroke(H,R,[[hx-12,hy],[hx-12,hy+8],[hx+11,hy+8],[hx+12,hy]],'blue',3.7);for(let n=0;n<9;n++)H.line(R,[[hx-10+n*2.4,hy+5],[hx-8+n*2.4,hy+10]],n%2?'sun':'coral',.8);
  const lid=(a,b)=>H.p(2.95+a,4.35-b*.23,1.5+b*.86);
  shape(H,R,loop(shell.map(([a,b])=>lid(a,b)),2),'blue',.83,1);
  shape(H,R,loop(shell.map(([a,b])=>lid(.12+a*.94,.07+b*.88)),2),'sun',.68,.8);
  shape(H,R,loop(shell.map(([a,b])=>lid(.22+a*.90,.16+b*.75)),2),'paper',1,.7);
  for(let a=.45;a<4;a+=.37)H.line(R,[lid(a,.27),lid(a+.13,1.23)],'coral',.6,{tone:.45});
  for(const i of[3.65,6.35]){H.line(R,[H.p(i,4.43,1.46),H.p(i,4.09,2.47)],'coral',2);metal(H,R,i,4.28,.25,.19,1.48,.09,'sun');}
  for(const b of[.43,.75]){
    H.line(R,[lid(.62,b),lid(3.78,b)],'blue',3.1);H.line(R,[lid(.62,b+.025),lid(3.78,b+.025)],'sun',1.3);
    for(const a of[1.1,3.1])shape(H,R,[lid(a,b-.08),lid(a+.18,b-.08),lid(a+.18,b+.08),lid(a,b+.08)],'coral',.72,.5);
  }
  shape(H,R,[lid(1.1,.92),lid(3.4,.92),lid(3.33,1.25),lid(1.17,1.25)],'teal',.38,.6);
  for(let a=1.21;a<3.3;a+=.16)H.line(R,[lid(a,1.19),lid(a+.05,1.22)],'paper',.6);
  for(const a of[.4,4.04]){H.line(R,[P(a,.28,1.51),P(a,1.16,1.51)],'sun',1);for(const b of[.35,1.1])H.dot(...P(a,b,1.52),1.6,'paper');}
  for(const a of[.84,3.66]){shape(H,R,[P(a,.1,1.51),P(a+.12,.1,1.51),P(a+.12,.48,1.5),P(a,.48,1.5)],'paper',1,.4);}

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

const room=world('london-violin-case','The case fits the curve',{wall:'paper',wallTone:1,height:3.6,floor:'sun',tone:.12,pattern:'tiles',head:26},(H,R)=>{
  for(const side of['nw','ne']){const P=(u,z)=>side==='ne'?H.p(u,.13,z):H.p(.13,u,z);H.line(R,[P(0,.16),P(12,.16)],'teal',4);H.line(R,[P(0,3.54),P(12,3.54)],'blue',2);}
  for(let i=0;i<12;i++){shape(H,R,H.tile(i,.07,.8,.36,.025),i%2?'teal':'coral',.2,.4);shape(H,R,H.tile(.07,i,.36,.8,.025),i%2?'teal':'coral',.2,.4);}
  windowBay(H,R,'nw',2.1,6,1.97,1.31,{divisions:4,view:P=>{shape(H,R,[P(.12,.12),P(5.88,.12),P(5.88,.43),P(.12,.7)],'teal',.13,.4);for(const u of[.5,2.6,4.8])shape(H,R,[P(u,.12),P(u,.5),P(u+.7,.68),P(u+1,.5),P(u+1,.12)],'coral',.2,.4);}});
  for(const u of[.15,8.0,11.82]){timber(H,R,.06,u,.15,.18,.08,3.5,'teal');timber(H,R,u,.06,.18,.15,.08,3.5,'teal');}
  radiator(H,R,'nw',9.65,1.66,.91);
  benchFrame(H,R,.37,1.12,1.18,5.87,1.25,'teal');
  timber(H,R,.48,1.25,.95,5.5,.26,.09,'teal');
  for(const [j,ink]of[[1.45,'sun'],[2.55,'coral'],[3.65,'teal']]){
    const[x,y]=H.p(1.0,j,1.29);oval(H,R,x,y,8,4,ink,.65);shape(H,R,[[x-8,y],[x+8,y],[x+7,y-28],[x-7,y-28]],ink,.5,.7);oval(H,R,x,y-28,7,3.5,'paper',1);oval(H,R,x,y-28,3,1.6,'blue',.65);H.line(R,[[x-5,y-24],[x-5,y-2]],'paper',1.1);
  }
  for(let n=0;n<5;n++){const j=1.35+n*.95;shape(H,R,H.faceJ(1.48,j,.76,.38,.98),n%2?'paper':'sun',.7,.65);H.line(R,[H.p(1.5,j+.31,.8),H.p(1.5,j+.53,.8)],'blue',2);}
  shape(H,R,H.tile(.53,4.4,.87,1.55,1.29),'blue',.35,.6);
  for(let n=0;n<5;n++)H.line(R,[H.p(.63,4.53+n*.24,1.31),H.p(1.3,4.53+n*.24,1.31)],'paper',.7);
  const[scx,scy]=H.p(.95,5.42,1.32);for(const d of[-4,4])oval(H,R,scx+d,scy+4,3,4,'sun',.72);H.line(R,[[scx-3,scy+1],[scx+8,scy-13]],'blue',1.3);H.line(R,[[scx+3,scy+1],[scx-8,scy-13]],'blue',1.3);
  drape(H,R,.53,6.0,.91,.76,1.3,.38,'coral');
  wallRack(H,R,'ne',1.0,5.95,.75,.95,1,'teal',(Q,z)=>{
    for(let n=0;n<5;n++){const[x,y]=Q(.38+n*.55,z+.08);oval(H,R,x,y-6,6,7,n%2?'coral':'paper',.8);oval(H,R,x,y-6,2.2,3,'blue',.65);H.line(R,[[x-4,y+1],[x+5,y+1]],'sun',1);}
    for(const u of[3.55,4.4,5.15]){const[x,y]=Q(u,z+.2);stroke(H,R,[[x-7,y],[x-7,y-13],[x+5,y-17],[x+9,y]],'blue',3);H.line(R,[[x-6,y-12],[x+5,y-15]],'sun',1.2);}
  });
  cabinetFrame(H,R,8.2,.42,3.28,1.62,0,3.55,2,'teal',(i,j,w,d,z,h,n)=>{
    for(const height of[.65,1.55,2.5])timber(H,R,i,j,w,d,height,.1,'teal');
    if(n===0){for(let k=0;k<3;k++){const[x,y]=H.p(i+.22+k*.42,j+.8,.85);oval(H,R,x,y,7,10,'paper',1);oval(H,R,x,y,3,5,'sun',.65);H.line(R,[[x,y+10],[x,y+26]],'blue',.8);}for(let k=0;k<4;k++)outline(H,R,i+.1,j+.38+k*.22,1.68,.46,k===2?'coral':'sun');for(let k=0;k<3;k++){const[x,y]=H.p(i+.28+k*.45,j+.76,2.84);oval(H,R,x,y,6,15,k%2?'coral':'paper',.85);oval(H,R,x,y-13,6,3,'blue',.65);}}
    else{for(let k=0;k<3;k++){metal(H,R,i,j+.05,w,d-.1,z+k*.17,.15,'sun');const[x,y]=H.p(i+w*.5,j+d,z+k*.17+.07);H.line(R,[[x-4,y],[x+4,y]],'blue',1.5);}for(let k=0;k<3;k++){const [x,y]=H.p(i+.2+k*.45,j+.7,1.93);stroke(H,R,[[x-5,y],[x-5,y-10],[x+4,y-13],[x+6,y]],'blue',3);H.line(R,[[x-4,y-9],[x+4,y-11]],'sun',1);}drape(H,R,i,j,w,d,2.74,.13,'coral');}
  });
  hangingRail(H,R,'ne',1.3,5.5,3.16,5,(P,u,n)=>{const[x,y]=P(u,-.18);shape(H,R,[[x-13,y],[x+10,y],[x+11,y+27],[x-10,y+31]],n%2?'coral':'teal',.48,.65);H.line(R,[[x-8,y+25],[x+8,y+22]],'sun',1);if(n===3){shape(H,R,[[x-6,y+12],[x+7,y+12],[x+5,y+17],[x-4,y+18]],'paper',1,.4);}});
  const [tx,ty]=H.p(5.15,.32,1.68);shape(H,R,[[tx-22,ty-16],[tx+21,ty-1],[tx+21,ty+30],[tx-22,ty+14]],'paper',1,.65);stroke(H,R,[[tx-15,ty+5],[tx-8,ty-2],[tx,ty+11],[tx+9,ty+11],[tx+15,ty+21]],'blue',1);
  benchFrame(H,R,2.35,3.4,5.8,3.35,1.2,'sun');
  timber(H,R,2.64,3.7,5.2,2.65,.32,.1,'sun');
  for(const [i,w]of[[2.7,1.28],[4.08,1.45],[5.64,1.96]]){
    shape(H,R,H.faceI(i,6.42,w,.45,.91),'teal',.52,.75);shape(H,R,H.faceI(i+.09,6.43,w-.18,.53,.82),'teal',.24,.5);H.line(R,[H.p(i+w*.36,6.47,.7),H.p(i+w*.66,6.47,.7)],'sun',2.3);
  }
  for(const i of[2.56,7.71]){bentTube(H,R,[[i,3.57,.35],[i,6.4,.95]],1.8,'teal');}
  timber(H,R,2.65,3.66,5.18,.15,.45,.15,'teal');drape(H,R,2.55,3.6,5.25,2.9,1.215,.16,'paper');
  caseBase(H,R);
  taskLight(H,R,7.9,3.6,1.22,'coral',-.7);
  shape(H,R,H.tile(7.25,5.9,.49,.56,1.24),'blue',.62,.5);for(let n=0;n<3;n++)oval(H,R,...H.p(7.35+n*.12,6.18,1.27),2.5,1.4,'sun',.8);
  const[qx,qy]=H.p(6.25,6.27,1.27);oval(H,R,qx,qy,5.5,3,'sun',.7);oval(H,R,qx,qy,2.6,1.4,'blue',.7);stroke(H,R,[[qx+5,qy],[qx+12,qy+1],[qx+14,qy-3]],'paper',1.2);

  const pads=[H.tile(6.78,6.13,.78,.43,1.23),H.tile(2.78,6.0,2.25,.65,1.23)];for(const pts of pads)H.outline(R,pts,'teal',.8,{tone:.6});
  for(const [i,j]of[[2.8,3.65],[7.55,3.75]]){metal(H,R,i,j,.2,.33,1.18,.2,'blue');H.line(R,[H.p(i+.1,j+.16,1.3),H.p(i+.1,j+.16,1.61)],'blue',1.3);H.line(R,[H.p(i,j+.16,1.61),H.p(i+.2,j+.16,1.61)],'sun',2);}
  benchFrame(H,R,.5,8.0,2.8,2.35,.76,'teal');outline(H,R,.7,8.95,.79,.83);outline(H,R,.74,8.94,.81,.7,'paper');
  shape(H,R,H.tile(1.9,9.5,.72,.57,.78),'paper',1,.6);H.line(R,[H.p(2,9.58,.79),H.p(2.52,9.58,.79),H.p(2.52,9.99,.79)],'blue',1.2);drape(H,R,.7,9.7,.73,.55,.78,.2,'coral');
  const [gx,gy]=H.p(2.85,8.45,.83);stroke(H,R,[[gx-11,gy],[gx-4,gy-8],[gx+7,gy-2]],'sun',4);stroke(H,R,[[gx-11,gy],[gx-4,gy-8],[gx+7,gy-2]],'blue',.6);
  benchFrame(H,R,9.22,7.9,2.2,2.78,.76,'sun');
  for(const z of[.79,.85,.91])shape(H,R,H.tile(9.34,8.04,1.86,1.87,z),'paper',1,.5);
  const[bx,by]=H.p(10.3,8.94,.94);stroke(H,R,[[bx-21,by],[bx-28,by-16],[bx-10,by-26],[bx+17,by-19],[bx+22,by]],'blue',3);stroke(H,R,[[bx-21,by],[bx-26,by-14],[bx-10,by-24],[bx+17,by-17],[bx+22,by]],'coral',1.1);
  for(const i of[9.65,10.55]){shape(H,R,H.tile(i,9.76,.55,.5,.94),'teal',.4,.6);cushion(H,R,i+.04,9.78,.47,.43,.97,.14,'paper');}
  drape(H,R,9.44,8.17,1.68,1.7,.38,.12,'teal');
  shape(H,R,H.tile(10.64,8.12,.32,.42,.95),'coral',.64,.5);H.dot(...H.p(10.76,8.26,.98),1.2,'paper',1);
  for(const j of[8.43,9.36]){metal(H,R,11.14,j,.29,.18,.75,.27,'blue');H.line(R,[H.p(11.27,j+.09,1.02),H.p(11.27,j+.09,1.3)],'sun',1.4);}
  floorShadow(H,5.7,9.57,1.3,1.3,.16);
  for(const [i,j]of[[5.85,9.84],[6.9,9.84],[5.85,10.73],[6.9,10.73]])bentTube(H,R,[[i,j,.03],[i-.07,j-.07,.65]],2.1,'teal');
  cushion(H,R,5.65,9.58,1.45,1.3,.65,.22,'coral');
  shape(H,R,H.tile(5.84,9.82,.91,.61,.91),'paper',1,.5);H.line(R,[H.p(5.92,10.08,.93),H.p(6.49,10.03,.93)],'teal',1.2);
  const[cx,cy]=H.p(5.34,10.88,.14);shape(H,R,[[cx-13,cy],[cx+13,cy],[cx+11,cy-13],[cx-12,cy-14]],'sun',.6,.7);oval(H,R,cx-5,cy-12,4,4,'coral',.7);oval(H,R,cx+5,cy-13,4,4,'teal',.7);H.line(R,[[cx-12,cy-16],[cx-8,cy-30],[cx+15,cy-29],[cx+13,cy-14]],'blue',1.4);
  const mini=(a,b)=>H.p(10+a,1.0+b,3.6);shape(H,R,loop(shell.map(([a,b])=>mini(a*.21,b*.23)),2),'coral',.65,.65);H.line(R,[mini(.3,.35),mini(.6,.35)],'blue',1.4);
  const [sx,sy]=H.p(.7,11.0,.06);shape(H,R,[[sx-7,sy],[sx+10,sy],[sx+5,sy-7],[sx-10,sy-6]],'sun',.7,.7);H.line(R,[[sx-7,sy-2],[sx+7,sy-1]],'coral',.7);
},(H,R,time)=>{
  const t=((time%duration)+duration)%duration;
  const pad=ease(.4,3.2,t)*(1-ease(12,14,t));
  const template=ease(3.8,6.4,t)*(1-ease(9.6,11.5,t));
  const pi=mix(4.3,4.15,pad),pj=mix(6.25,5.1,pad),pz=1.33+.25*pad+.18*Math.sin(pad*Math.PI);
  shape(H,R,H.tile(pi,pj,.62,.39,pz),'paper',1,.7);shape(H,R,H.faceI(pi,pj+.39,.62,pz-.11,pz),'teal',.43,.6);H.line(R,[H.p(pi+.08,pj+.2,pz+.02),H.p(pi+.53,pj+.2,pz+.02)],'blue',.7);
  outline(H,R,mix(2.87,3.8,template),mix(6.25,5.1,template),1.29+.35*template+.18*Math.sin(template*Math.PI),1.07);
  const padHand=H.p(pi+.3,pj+.2,pz),templateHand=H.p(mix(2.87,3.8,template)+.42,mix(6.25,5.1,template),1.29+.35*template+.18*Math.sin(template*Math.PI)),restHand=H.p(3.29,6.25,1.29);
  let target=padHand;
  if(t>=3.2&&t<3.8){const p=ease(3.2,3.8,t);target=padHand.map((v,k)=>mix(v,restHand[k],p));}
  else if(t>=3.8&&t<11.5)target=templateHand;
  else if(t>=11.5&&t<12){const p=ease(11.5,12,t);target=restHand.map((v,k)=>mix(v,padHand[k],p));}
  const makerI=(11.3125+(target[0]-11)/32)/2,makerJ=11.3125-makerI;
  reachPose(H,'londonViolinContact',FIGURES.sample('londonViolinMaker',t/duration),makerI,makerJ,0,2.2,'se',{r:target});
  actor(H,R,makerI,makerJ,t,'londonViolinContact',{shirt:['teal',.72],pants:['blue',.7],apron:['paper',1],skin:['coral',.5],hairStyle:'bun'},0,2.2);
  actor(H,R,8.65,6.27,t,'londonViolinCustomer',{face:'sw',shirt:['coral',.74],pants:['blue',.65],skin:['coral',.26],hairStyle:'curly'},0,1.8);
  const sway=.025*Math.sin(TAU*t/duration);stroke(H,R,[H.p(9.6,1.92,2.25),H.p(9.57+sway,2.04,1.98),H.p(9.64+sway,2.0,1.76)],'coral',2);
});
room.loopSeconds=duration;
room.stillTime=5.8;
export default room;
