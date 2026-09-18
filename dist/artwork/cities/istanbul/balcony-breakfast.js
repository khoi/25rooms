import { world, actor, shape, oval, stroke, cycle, wallPt, plant } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, benchFrame, caneChair, drape, bentTube, cushion } from '../materials.js';
import { cabinetFrame, basin } from '../structure.js';
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
  recessedFrame(H,R,'ne',9.35,2.06,.12,3.64,'teal',P=>{
    shape(H,R,[P(.14,.14),P(1.92,.14),P(1.92,3.49),P(.14,3.49)],'blue',.73,.8);
    for(const z of [.34,1.15])shape(H,R,[P(.3,z),P(1.74,z),P(1.74,z+.58),P(.3,z+.58)],'teal',.55,.7);
    shape(H,R,[P(.3,2.04),P(1.74,2.04),P(1.74,3.3),P(.3,3.3)],'sun',.15,.6);
    H.line(R,[P(1,2.05),P(1,3.3)],'paper',2.3);H.line(R,[P(.31,2.67),P(1.72,2.67)],'paper',2.3);
    H.line(R,[P(.36,1.75),P(.7,1.75)],'sun',2.6);
  });
  metal(H,R,9.27,.34,2.31,.54,.025,.12,'teal');
  for(let n=0;n<4;n++)H.line(R,[H.p(9.39,.41+n*.1,.17),H.p(11.44,.41+n*.1,.17)],'paper',.8);
  for(const j of [.48,6.94])timber(H,R,.08,j,.3,.18,.05,3.92,'teal');
  timber(H,R,.07,.49,.32,6.62,3.78,.17,'teal');
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
  basin(H,R,.4,1.36,1.09,1.64,1.64,'paper');
  vessel(H,R,.99,3.63,1.64,12,23,'paper');
  const [wx,wy]=H.p(.99,3.63,1.64);stroke(H,R,[[wx+10,wy-20],[wx+20,wy-21],[wx+18,wy-7],[wx+10,wy-6]],'teal',2);
  bentTube(H,R,[[.72,2.2,1.62],[.72,2.2,.59],[.86,2.2,.48],[.86,2.55,.39]],2,'blue');
  shape(H,R,H.faceJ(1.66,3.04,1.3,.81,1.31),'teal',.6,.7);bentTube(H,R,[[1.69,3.37,1.07],[1.69,3.85,1.07]],1.5,'sun');
  timber(H,R,1.49,5.72,.74,.88,1.08,.07,'sun');
  timber(H,R,2.18,5.72,.1,.88,1.08,.24,'teal');
  for(let n=0;n<3;n++)bentTube(H,R,[[1.7,5.91+n*.19,1.17],[2.03,5.91+n*.19,1.17]],1.3,n===1?'sun':'paper');
  hangingRail(H,R,'nw',6.95,.39,3.45,1,(P,u)=>{const [x,y]=P(u,-.1);shape(H,R,[[x-10,y+7],[x+9,y+7],[x+10,y+44],[x-12,y+44]],'sun',.42,.7);for(let n=0;n<4;n++)H.line(R,[[x-8,y+13+n*7],[x+8,y+13+n*7]],'paper',1);});
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
  for(const j of [5.06,6.64]){
    timber(H,R,3.45,j,3.63,.12,.91,.22,'sun');
    bentTube(H,R,[[3.54,j,.12],[5.25,j,.96],[6.9,j,.13]],2.7,'teal');
  }
  timber(H,R,3.18,4.76,4.28,2.14,1.14,.11,'sun');
  timber(H,R,7.49,4.8,.8,2.05,1.14,.11,'sun');
  bentTube(H,R,[[7.54,5,1.04],[7.34,5,.49],[6.86,5,.98]],2,'blue');
  for(const j of [5.1,6.55])metal(H,R,7.38,j,.25,.16,1.25,.025,'blue');
  caneChair(H,R,3.78,7.07,'teal');caneChair(H,R,6.87,3.39,'sun');
  cushion(H,R,3.82,7.13,.85,.73,.7,.09,'paper');
  for(let n=0;n<5;n++)H.line(R,[H.p(4.31+n*.065,7.23,.81),H.p(4.31+n*.065,7.68,.81)],'teal',.7);
  metal(H,R,4.58,7.65,.2,.11,.27,.14,'paper');
  breakfast(H,R);
  const [egx,egy]=H.p(7.78,5.56,1.27);oval(H,R,egx,egy,15,7,'paper',1);for(const dx of [-6,6])oval(H,R,egx+dx,egy-4,5,7,'sun',.32);
  const [cvx,cvy]=H.p(7.71,6.48,1.27);oval(H,R,cvx,cvy,16,7,'teal',.6);shape(H,R,[[cvx-13,cvy-2],[cvx-8,cvy-15],[cvx+6,cvy-19],[cvx+13,cvy-3]],'paper',.6,.7);H.dot(cvx,cvy-21,2,'sun');
  const [jmx,jmy]=H.p(3.65,5.07,1.27);vessel(H,R,3.65,5.07,1.27,7,11,'coral');oval(H,R,jmx+12,jmy+5,6,2,'sun',.8);H.line(R,[[jmx-1,jmy-10],[jmx+5,jmy-22]],'blue',1);
  metal(H,R,8.52,.71,.1,.53,3.48,.32,'blue');
  const [cpx,cpy]=H.p(8.57,1.26,2.1);H.line(R,[[cpx-4,cpy-6],[cpx+4,cpy+6]],'sun',3);H.line(R,[[cpx-5,cpy+6],[cpx+5,cpy-6]],'blue',1.2);
  for(const z of [.42,1.38,2.55,3.43])metal(H,R,11.52,.31,.33,.17,z,.1,'blue');
  cabinetFrame(H,R,9.67,3.55,1.56,2.4,.06,.89,1,'teal',(x,y,w,d,z)=>{
    timber(H,R,x,y,w,d,z+.42,.075,'sun');
    for(let n=0;n<3;n++)oval(H,R,...H.p(x+.63,y+.57,z+.06+n*.045),12,5,'paper',1);
    drape(H,R,x+.09,y+.45,w-.18,1.15,z+.51,.18,'sun');
  });
  vessel(H,R,10.4,4.13,.98,13,23,'paper');vessel(H,R,10.25,5.08,.97,8,5,'sun');
  drape(H,R,9.72,4.5,1.39,.9,.99,.64,'paper');
  benchFrame(H,R,2.4,9.48,2.13,1.1,.45,'sun');drape(H,R,2.49,9.56,1.48,.8,.48,.29,'coral');
  const [bx,by]=H.p(4.08,9.88,.49);shape(H,R,[[bx-9,by],[bx+11,by+5],[bx+16,by-6],[bx-4,by-11]],'teal',.7,.7);H.line(R,[[bx-4,by-9],[bx+13,by-5]],'paper',1);
  benchFrame(H,R,7.69,9.13,2.12,1.44,.44,'teal');
  cushion(H,R,7.71,9.15,2.05,1.38,.46,.2,'coral');
  drape(H,R,8.52,9.26,.74,1.16,.68,.46,'paper');
  for(let n=0;n<5;n++)H.line(R,[H.p(8.58+n*.11,9.36,.7),H.p(8.58+n*.11,10.31,.7)],'teal',.7);
  const [sbx,sby]=H.p(7.13,10.45,.05);shape(H,R,[[sbx-14,sby],[sbx+15,sby],[sbx+16,sby-24],[sbx-14,sby-24]],'sun',.55,.8);stroke(H,R,[[sbx-9,sby-23],[sbx-9,sby-37],[sbx+9,sby-37],[sbx+10,sby-23]],'teal',2);H.line(R,[[sbx-8,sby-18],[sbx+9,sby-17]],'coral',1);
  vessel(H,R,11.03,7.05,.07,13,18,'teal');
  bentTube(H,R,[[11.24,7.3,.11],[11.49,6.76,1.35]],1.8,'sun');
  const [ptx,pty]=H.p(11.3,7.47,.1);oval(H,R,ptx,pty,10,4,'sun',.7);H.line(R,[[ptx-5,pty],[ptx+5,pty]],'blue',1);
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
