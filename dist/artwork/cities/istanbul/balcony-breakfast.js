import { world, actor, shape, oval, stroke, cycle, wallPt, plant } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, benchFrame, caneChair, drape, bentTube, cushion } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { recessedFrame, panelFront, hangingRail, floorShadow } from '../joinery.js';

const smooth=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
const base=FIGURES.sample('idle',0);
const seated={...FIGURES.sample('sit',0),al:55,ar:58,el:55,er:55};
FIGURES.clips['istanbul-balcony-plate']={dur:16,keys:[[0,seated],[.5,{...seated,head:8}],[1,seated]]};
FIGURES.clips['istanbul-balcony-cord']={dur:16,keys:[[0,{...base,ar:155,er:8,head:-12}],[.2,{...base,ar:155,er:8,head:-12}],[.4,{...base,ar:60,er:45,head:7}],[.6,{...base,ar:60,er:45,head:7}],[.875,{...base,ar:155,er:8,head:-12}],[1,{...base,ar:155,er:8,head:-12}]]};

function breakfast(H,R){
  for(const [i,j] of [[4.2,5.75],[6.4,5.76]]){oval(H,R,...H.p(i,j,1.25),21,10,'paper',1);oval(H,R,...H.p(i,j,1.27),17,7,'sun',.14);}
  vessel(H,R,5.3,5.5,1.29,15,5,'paper');const [x,y]=H.p(5.3,5.5,1.32);for(const [a,b] of [[-6,-3],[1,-5],[7,-1],[-3,1],[4,3]])oval(H,R,x+a,y+b,3,2,'teal',.8);
  const [cx,cy]=H.p(5.7,6.5,1.28);shape(H,R,[[cx-12,cy],[cx+14,cy+3],[cx+10,cy-10],[cx-4,cy-13]],'paper',1,.65);H.line(R,[[cx-4,cy-13],[cx-3,cy+1]],'sun',1.3);
  vessel(H,R,3.9,6.65,1.26,7,13,'paper');vessel(H,R,6.9,6.35,1.26,7,13,'paper');
  drape(H,R,4.45,6.05,1.1,.8,1.3,.14,'paper');
  const [bx,by]=H.p(4.95,6.4,1.32);oval(H,R,bx,by,17,10,'sun',.46);for(let n=-2;n<=2;n++)stroke(H,R,[[bx-14,by+n*3],[bx,by+n*3-2],[bx+14,by+n*3]],'paper',.7);H.line(R,[[bx+12,by+2],[bx+22,by+6]],'blue',.9);oval(H,R,bx+24,by+6,3,2,'sun',.8);
}

function awning(H,R,open){
  const front=3.55+open*1.43,back=.7,z=3.62;
  const P=(i,j)=>H.p(i,j,z-.12*(j-back));
  for(let n=0;n<7;n++){const i=2.55+n*.83;shape(H,R,[P(i,back),P(i+.82,back),P(i+.82,front),P(i,front)],n%2?'paper':'coral',n%2?1:.61,.55);}
  for(let n=0;n<7;n++){const i=2.55+n*.83;shape(H,R,[P(i,front),P(i+.82,front),H.p(i+.82,front,3.62-.12*(front-back)-.25),H.p(i,front,3.62-.12*(front-back)-.25)],n%2?'paper':'coral',n%2?1:.67,.6);}
  bentTube(H,R,[[2.45,back,3.65],[8.55,back,3.65]],5,'coral');
  for(const i of [2.48,8.48])bentTube(H,R,[[i,back,3.5],[i,front,3.53-.12*(front-back)]],2.3,'blue');
  const P0=H.p(8.52,.8,3.62);oval(H,R,P0[0],P0[1],8,5,'blue',.8);oval(H,R,P0[0],P0[1],4,2.5,'coral',.8);
  for(let n=0;n<7;n++)H.line(R,[H.p(6.58+n*.1,front,3.62-.12*(front-back)-.08),H.p(6.59+n*.1,front,3.62-.12*(front-back)-.18)],'coral',.7);
}

const room=world('istanbul-balcony-breakfast','The shade reaches the plate',{wall:false,floor:'paper',tone:.75,head:50},(H,R)=>{
  for(let i=0;i<12;i++)for(let j=0;j<12;j++){shape(H,R,H.tile(i+.025,j+.025,.95,.95,.02),'paper',1,.5);if((i===0||j===11||i===11)&&((i+j)%2))shape(H,R,H.tile(i+.2,j+.2,.6,.6,.026),'coral',.45,.5);}
  const wall=[H.p(0,0,0),H.p(12,0,0),H.p(12,0,4),H.p(0,0,4)];shape(H,R,wall,'paper',1,.85);
  shape(H,R,[H.p(0,0,0),H.p(0,7.5,0),H.p(0,7.5,4),H.p(0,0,4)],'coral',.18,.85);
  recessedFrame(H,R,'nw',1.05,5.8,1.6,1.88,'teal',P=>{
    shape(H,R,[P(.13,.13),P(5.67,.13),P(5.67,1.76),P(.13,1.76)],'blue',.72,.7);
    for(let n=0;n<6;n++){const [x,y]=P(.5+n*.88,.48);oval(H,R,x,y,12,17,'paper',1);oval(H,R,x,y,8,13,'sun',.2);}
    H.line(R,[P(.17,.31),P(5.64,.31)],'sun',4);
    for(let n=0;n<6;n++){const [x,y]=P(.55+n*.9,1.4);stroke(H,R,[[x-4,y-2],[x-6,y+10],[x+6,y+10],[x+4,y-2]],'paper',2);}
    H.line(R,[P(3.58,.15),P(3.58,1.74)],'paper',5);
    shape(H,R,[P(3.65,.2),P(5.58,.2),P(5.58,1.68),P(3.65,1.68)],'teal',.3,.6);
    H.line(R,[P(3.88,.85),P(3.88,1.16)],'sun',2.5);
  });
  cabinetFrame(H,R,.3,1.05,1.35,5.65,.1,1.4,1,'teal',(x,y,w,d,z)=>{
    timber(H,R,x,y,w,d,z+.64,.09,'sun');
    for(let n=0;n<3;n++){vessel(H,R,x+.65,y+.65+n*1.4,z+.16,12,15,n===1?'sun':'paper');}
  });
  timber(H,R,.22,.96,1.48,5.85,1.5,.13,'sun');
  vessel(H,R,.98,2,1.63,14,25,'paper');
  drape(H,R,.4,4.73,1.15,1.55,1.64,.7,'paper');
  for(let n=0;n<4;n++)H.line(R,[H.p(.42,5+n*.22,1.66),H.p(1.51,5+n*.22,1.66)],'teal',.8);
  for(const j of [7.8,11.65]){
    bentTube(H,R,[[.08,j,.03],[.08,j,1.4],[11.8,j,1.4],[11.8,j,.03]],2.7,'blue');
    for(let i=.4;i<12;i+=.72)bentTube(H,R,[[i,j,.12],[i,j,1.34]],1.8,'blue');
  }
  for(let j=8;j<11.8;j+=.75)bentTube(H,R,[[11.78,j,.1],[11.78,j,1.4]],1.8,'blue');
  bentTube(H,R,[[11.78,7.78,1.4],[11.78,11.78,1.4]],2.7,'blue');
  for(const [i,j] of [[1.2,8.0],[9.65,8.0]]){
    metal(H,R,i,j,1.55,.58,1.01,.53,'coral');
    for(const x of [i+.18,i+1.36])bentTube(H,R,[[x,j+.51,.92],[x,j+.67,1.52],[x,j+.27,1.53]],1.7,'blue');
    for(let n=0;n<3;n++)plant(H,R,...H.p(i+.27+n*.52,j+.24,1.59),.8);
  }
  for(const x of [2.4,8.6])timber(H,R,x,.4,.17,.3,0,3.88,'teal');
  timber(H,R,2.4,.37,6.36,.3,3.75,.18,'teal');
  bentTube(H,R,[[11.52,.2,3.95],[11.52,.2,3.46],[11.72,.38,3.23],[11.72,.38,.12]],3,'teal');
  benchFrame(H,R,3.2,4.8,4.2,2.05,1.14,'sun');
  timber(H,R,3.18,4.76,4.28,2.14,1.14,.11,'sun');
  timber(H,R,7.49,4.8,.8,2.05,1.14,.11,'sun');
  bentTube(H,R,[[7.54,5,1.04],[7.34,5,.49],[6.86,5,.98]],2,'blue');
  for(const j of [5.1,6.55])metal(H,R,7.38,j,.25,.16,1.25,.025,'blue');
  caneChair(H,R,3.78,7.07,'teal');caneChair(H,R,6.87,3.39,'sun');
  cushion(H,R,3.82,7.13,.85,.73,.7,.09,'paper');
  for(let n=0;n<5;n++)H.line(R,[H.p(4.31+n*.065,7.23,.81),H.p(4.31+n*.065,7.68,.81)],'teal',.7);
  metal(H,R,4.58,7.65,.2,.11,.27,.14,'paper');
  breakfast(H,R);
  benchFrame(H,R,9.67,3.55,1.56,2.4,.95,'teal');
  vessel(H,R,10.4,4.13,.98,13,23,'paper');vessel(H,R,10.25,5.08,.97,8,5,'sun');
  drape(H,R,9.72,4.5,1.39,.9,.99,.64,'paper');
  benchFrame(H,R,2.4,9.48,2.13,1.1,.45,'sun');drape(H,R,2.49,9.56,1.48,.8,.48,.29,'coral');
  const [bx,by]=H.p(4.08,9.88,.49);shape(H,R,[[bx-9,by],[bx+11,by+5],[bx+16,by-6],[bx-4,by-11]],'teal',.7,.7);H.line(R,[[bx-4,by-9],[bx+13,by-5]],'paper',1);
  for(const i of [5.16,5.74]){const [x,y]=H.p(i,9.83,.045);oval(H,R,x,y,7,13,'coral',.58);oval(H,R,x,y-4,5,7,'blue',.6);}
},(H,R,t)=>{
  const u=cycle(t,16)*16,open=smooth((u-3.2)/3.2)*(1-smooth((u-9.6)/4.4));
  H.tint(H.tile(3.1,4.25,5.1,1.1+open*2.4,.025),'blue',.14);
  awning(H,R,open);
  const ribbon=H.p(8.48,3.55+open*1.43,3.25),flutter=Math.sin(t*Math.PI*2/16)*3;
  stroke(H,R,[ribbon,[ribbon[0]+flutter,ribbon[1]+11],[ribbon[0]-flutter*.5,ribbon[1]+23]],'sun',2.4);
  const corner=H.p(10.98,5.38,.42);
  shape(H,R,[corner,[corner[0]+7,corner[1]-6],[corner[0]+9+flutter*.3,corner[1]+3]],'paper',1,.5);
  actor(H,R,8.8,3.35,t,'istanbul-balcony-cord',{shirt:['teal',.65],hairStyle:'curly',prop:(HH,RR,p)=>{
    const top=H.p(8.57,.8,3.63);stroke(HH,RR,[top,[top[0]+4,top[1]+36],p.rhand,[p.rhand[0]-3,p.rhand[1]+20]],'blue',.9);
    HH.line(RR,[[p.rhand[0]-7,p.rhand[1]+13],[p.rhand[0]+2,p.rhand[1]+17]],'sun',2);
  }},0,1.58);
  actor(H,R,4.16,7.47,t,'istanbul-balcony-plate',{shirt:['coral',.63],hairStyle:'bun',prop:(HH,RR,p)=>{oval(HH,RR,(p.lhand[0]+p.rhand[0])/2,(p.lhand[1]+p.rhand[1])/2+4,15,6,'paper',1);}},0,1.45);
});
room.loopSeconds=16;room.stillTime=8;
export default room;
