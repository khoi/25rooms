import { world, shape, stroke, oval, ell, loop, actor, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, bentTube, benchFrame, cushion, drape } from '../materials.js';
import { cabinetFrame, basin, masonry } from '../structure.js';
import { windowBay, caster, specimen } from '../joinery.js';

const ease=(a,b,t)=>{const q=Math.max(0,Math.min(1,(t-a)/(b-a)));return q*q*(3-2*q);};
const rest=FIGURES.sample('idle',0);
FIGURES.clips.mexicoPlantSeller={dur:16,keys:[[0,{...rest,al:80,ar:-65,el:45,er:-60,head:9}],[.2,{...rest,al:95,ar:-70,el:30,er:-75,head:13}],[.4,{...rest,al:109,ar:-95,el:25,er:-45,head:9}],[.6,{...rest,al:109,ar:-95,el:25,er:-45,head:9}],[.875,{...rest,al:80,ar:-65,el:45,er:-60,head:9}],[1,{...rest,al:80,ar:-65,el:45,er:-60,head:9}]]};
FIGURES.clips.mexicoPlantCustomer={dur:16,keys:[[0,{...rest,head:12,al:18}],[.4,{...rest,head:8,al:18}],[.53,{...rest,head:-5,al:120,el:20}],[.7,{...rest,head:3,al:80,el:45}],[.875,{...rest,head:12,al:18}],[1,{...rest,head:12,al:18}]]};

function leaf(H,R,x,y,dx,dy,size,ink='teal',torn=false) {
  const tip=[x+dx,y+dy], mid=[x+dx*.55,y+dy*.45], perp=[-dy*.14*size,dx*.14*size];
  const points=loop([[x,y],[mid[0]+perp[0],mid[1]+perp[1]],[tip[0],tip[1]],[mid[0]-perp[0],mid[1]-perp[1]]],2);
  shape(H,R,points,ink,.7,.65);H.line(R,[[x,y],tip],'sun',.65,{tone:.65});
  if(torn)shape(H,R,[[mid[0]+perp[0],mid[1]+perp[1]],[mid[0]-2,mid[1]+2],[mid[0]+perp[0]+4,mid[1]+perp[1]+3]],'paper',1,.35);
}

function greenery(H,R,i,j,z,size=1,type=0,turn=0) {
  const [x,y]=H.p(i,j,z);vessel(H,R,i,j,z,11*size,17*size,type===2?'paper':'coral');
  if(type===1) {
    for(let n=0;n<7;n++){const dx=(n-3)*8*size, dy=(-23-Math.sin(n*.6)*15)*size;stroke(H,R,[[x,y-17*size],[x+dx*.65,y-30*size],[x+dx,y+dy-16*size]],'teal',1.1);for(let a=0;a<5;a++){const f=(a+1)/6,px=x+dx*f,py=y-17*size+(dy)*f;leaf(H,R,px,py,5*size,-5*size,.65);leaf(H,R,px,py,-7*size,-3*size,.65);}}
  } else if(type===2) {
    specimen(H,R,x,y-17*size,size*.65,'teal',true);
  } else {
    for(let n=0;n<6;n++){const a=n*TAU/6+turn,dx=Math.cos(a)*(23+(n%2)*11)*size,dy=(-35-Math.sin(a)*18)*size;stroke(H,R,[[x,y-16*size],[x+dx*.22,y-35*size],[x+dx*.52,y+dy]],'teal',1.2);leaf(H,R,x+dx*.35,y+dy*.75,dx*.77,dy*.43,1.4,'teal',n===3);}
    H.line(R,[[x+6*size,y-17*size],[x+6*size,y-70*size]],'sun',1.5);H.line(R,[[x+2*size,y-43*size],[x+10*size,y-43*size]],'coral',1.2);
  }
}

const room=world('mexico-city-market-plants','A leaf beyond the sleeve',{wall:'paper',wallTone:1,height:3.8,floor:'paper',tone:.6,head: 10},(H,R)=>{
  masonry(H,R,'ne',0,12,0,1.25,'coral',.24);
  windowBay(H,R,'ne',1.1,6.6,2.2,1.25,{divisions:4,view:P=>{for(let n=0;n<5;n++)shape(H,R,[P(n*1.3+.1,.1),P(n*1.3+.8,.1),P(n*1.3+.9,.55),P(n*1.3+.3,.7)],'teal',.2);}});
  for(const side of ['nw','ne'])for(let a=.4;a<11.7;a+=.72){const P=side==='ne'?H.tile(a,.1,.55,.47,.02):H.tile(.1,a,.47,.55,.02);shape(H,R,P,'teal',.23);H.line(R,[P[0],P[2]],'coral',.6);}
  const mesh=[H.p(.7,.7,4.1),H.p(8.6,.7,4.1),H.p(8.6,3.7,3.8),H.p(.7,3.7,3.8)];shape(H,R,mesh,'teal',.15);H.hatch(R,mesh,'blue',9,.46,.6,{tone:.34});H.hatch(R,mesh,'blue',12,-.46,.6,{tone:.24});
  for(const j of [5.5,7.5])bentTube(H,R,[[.35,j,.08],[.35,j,3.05]],2.3,'sun');
  for(let n=0;n<7;n++)bentTube(H,R,[[.35,5.5,.3+n*.38],[.35,7.5,.3+n*.38]],1.8,'sun');
  for(const [j,z] of [[5.87,1.06],[6.57,1.84],[7.16,2.59]]){
    const [x,y]=H.p(.58,j,z);stroke(H,R,[[x-6,y-14],[x-5,y-26],[x+5,y-26],[x+6,y-14]],'blue',.7);vessel(H,R,.58,j,z,10,14,'paper');
    for(let n=0;n<4;n++)stroke(H,R,[[x-6+n*4,y-2],[x-9+n*5,y+11],[x-4+n*3,y+23],[x-7+n*5,y+30]],'sun',.85);
    leaf(H,R,x,y-14,-14,-16,1.2);leaf(H,R,x,y-15,15,-21,1.2);
  }
  const pod=H.p(.5,9.57,2.67);H.line(R,[[pod[0]-20,pod[1]-12],[pod[0]+22,pod[1]-3]],'teal',1.2);for(let n=0;n<4;n++){const x=pod[0]-16+n*10,y=pod[1]-9+n*2;H.line(R,[[x,y],[x,y+12]],'sun',.7);oval(H,R,x,y+17,4,8,'coral',.6);H.line(R,[[x,y+10],[x,y+23]],'paper',.6);}
  for(const i of [.7,8.6])bentTube(H,R,[[i,.7,.04],[i,.7,4.1],[i,3.7,3.8]],2,'teal');
  for(let row=0;row<3;row++){
    const j=.98+row*1.17,z=2.2-row*.59,w=6.7-row*.45;
    for(const x of [1.1,1.1+w])for(const y of [j,j+.95])metal(H,R,x,y,.1,.1,.06,z,'teal');
    metal(H,R,1.02,j-.03,w+.24,1.1,z,.085,'teal');
    for(let n=0;n<4;n++){const x=1.55+n*(w-.6)/4;metal(H,R,x-.41,j+.18,.86,.64,z+.09,.07,'blue');greenery(H,R,x,j+.48,z+.17,.7+(n%2)*.2,(n+row)%3);}
  }
  cabinetFrame(H,R,9.2,.65,2.3,2.15,.08,3.14,2,'teal',(x,j,w,d,z,h,n)=>{
    if(n===0){for(let k=0;k<3;k++){metal(H,R,x,j,w,d,z+k*.5,.38,'sun');H.line(R,[H.p(x+.2,j+d,z+k*.5+.2),H.p(x+w-.2,j+d,z+k*.5+.2)],'blue',1.8);}vessel(H,R,x+w*.5,j+.75,z+1.6,10,15,'paper');}
    else{timber(H,R,x,j,w,d,z+.96,.09,'sun');for(let k=0;k<4;k++)vessel(H,R,x+w*.5,j+.65,z+.96+k*.13,12-k*.6,10,'coral');}
  });
  for(let n=0;n<3;n++){const [x,y]=H.p(9.35+n*.64,1.5,3.3);H.line(R,[[x,y],[x,y-18]],'blue',1);oval(H,R,x,y,6,3,'paper');stroke(H,R,[[x-3,y],[x-4,y+16],[x+2,y+24],[x-1,y+32]],'sun',1.2);}
  basin(H,R,9.35,3.2,2,1.25,1,'paper');for(const i of [9.48,10.94])metal(H,R,i,3.3,.14,.16,.03,1,'teal');
  const hose=H.p(11.35,2.22,2.05);for(let n=0;n<3;n++)H.outline(R,ell(hose[0],hose[1]+n*3,10+n,15+n),'teal',2);
  benchFrame(H,R,4.18,5.05,3.25,1.75,1.1,'sun');
  metal(H,R,4.32,5.2,2.88,1.47,1.11,.045,'teal');
  for(const x of [4.55,6.87])timber(H,R,x,5.55,.12,.12,.12,.65,'teal');
  drape(H,R,4.46,5.55,2.62,.86,.42,.22,'paper');
  shape(H,R,H.tile(6.33,5.27,.56,.94,1.17),'paper',1);shape(H,R,H.tile(6.45,5.37,.4,.67,1.19),'sun',.32);
  for(let n=0;n<5;n++)H.line(R,[H.p(6.4,5.32+n*.15,1.2),H.p(6.7,5.32+n*.15,1.2)],'blue',.5);
  for(const p of [[1.7,7.35],[3.1,7.35],[1.7,8.82],[3.1,8.82]])caster(H,R,...p);
  metal(H,R,1.45,7.15,1.92,1.94,.26,.08,'teal');bentTube(H,R,[[1.48,8.95,.35],[1.48,8.95,1.3],[3.23,8.95,1.3],[3.23,8.95,.35]],2.3,'teal');
  for(let n=0;n<3;n++){vessel(H,R,2.4,8.1,.35+n*.17,19-n,15,'paper');}
  vessel(H,R,1.54,8.95,1.3,4,7,'coral');
  benchFrame(H,R,9.4,7.28,1.1,1.12,.62,'sun');cushion(H,R,9.37,7.25,1.16,1.18,.64,.1,'paper');
  shape(H,R,H.tile(7.2,9.3,1.4,1.05,.05),'paper',1);for(let n=0;n<3;n++)leaf(H,R,...H.p(7.5+n*.35,9.65,.065),5,-10,1);
  metal(H,R,10.05,5.26,1.42,.9,.06,.14,'teal');stroke(H,R,[H.p(10.1,5.54,.22),H.p(10.8,5.4,.3),H.p(11.2,5.57,.24)],'sun',2.3);for(let n=0;n<7;n++)H.line(R,[H.p(10.1+n*.1,5.54,.22),H.p(10.1+n*.1,5.72,.22)],'blue',1.1);
  const tiny=H.p(3.96,3.1,.09);stroke(H,R,[[tiny[0],tiny[1]],[tiny[0]+1,tiny[1]-12]],'teal',1);leaf(H,R,tiny[0]+1,tiny[1]-7,-7,-4,1);leaf(H,R,tiny[0]+1,tiny[1]-9,6,-5,1);
},(H,R,t)=>{
  const u=((t%16)+16)%16,turn=ease(0,3.2,u)*(1-ease(10.8,14,u)),lift=ease(3.2,6.4,u)*(1-ease(9.6,12.2,u));
  const [x,y]=H.p(5.36,5.98,1.19);oval(H,R,x,y,24,10,'blue',.6);oval(H,R,x,y-2,22,8,'paper');
  greenery(H,R,5.36,5.98,1.23,1.22,0,turn*.8);
  H.line(R,[[x-12,y-17],[x-14,y-10],[x-9,y-3]],'teal',1.5);for(let n=0;n<4;n++)H.line(R,[[x-15+n*2,y-15+n*2],[x-11+n*2,y-16+n*2]],'sun',.9);
  const h=9+lift*17, sleeve=[[x-21,y-2],[x+20,y-2],[x+24,y-h],[x+5,y-h-4],[x-8,y-h-1],[x-23,y-h-5]];shape(H,R,sleeve,'paper',1);H.tint([sleeve[0],sleeve[1],sleeve[2],sleeve[3]],'sun',.17);H.line(R,[[x-12,y-1],[x-10,y-h-2],[x-5,y-h-3]],'blue',.75);H.line(R,[[x+13,y-1],[x+18,y-h]],'teal',.7);
  actor(H,R,6.32,6.62,u,'mexicoPlantSeller',{shirt:['coral',.65],apron:['paper',1],hairStyle:'bun',face:'sw'},0,1.6);
  actor(H,R,8.32,8.1,u,'mexicoPlantCustomer',{shirt:['teal',.5],pants:['blue',.7],hairStyle:'curly',face:'sw'},0,1.58);
  const [fx,fy]=H.p(2.1,1.46,2.44);stroke(H,R,[[fx,fy-24],[fx-18,fy-33],[fx-32,fy-24+Math.sin(TAU*u/16)*2]],'teal',1.7);
});
room.loopSeconds=16;
room.stillTime=7.7;
export default room;
