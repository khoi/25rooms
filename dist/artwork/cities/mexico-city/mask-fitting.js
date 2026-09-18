import { world, shape, stroke, oval, ell, loop, actor, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, cushion, drape, bentTube, vessel } from '../materials.js';
import { windowBay, wallRack, hangingRail, taskLight, panelFront } from '../joinery.js';

const rest=FIGURES.sample('idle',0);
const relaxed={...rest,al:-50,ar:-58,el:-20,er:-35,head:12}, lifted={...rest,al:-130,ar:-122,el:-15,er:-30,head:-8}, fitted={...rest,al:-104,ar:-108,el:-16,er:-30,head:5};
FIGURES.clips.mexicoMaskMaker={dur:18,keys:[[0,relaxed],[.2,lifted],[.4,fitted],[.6,fitted],[.74,lifted],[.89,relaxed],[1,relaxed]]};
const maker={who:'adult',i:6.6,j:6.7,z:0,scale:1.75,clip:'mexicoMaskMaker',face:'se',opts:{shirt:['teal',.65],apron:['paper',1],hairStyle:'bun'}};

function mask(H,R,x,y,size=1,fold=0,ink='paper') {
  const P=(a,b)=>[x+a*size,y+b*size];
  const shell=loop([P(-18,-10),P(-12,-24),P(3,-29),P(17,-21),P(20,-8),P(15,12-fold*6),P(0,18-fold*9),P(-15,11-fold*5)],2);
  shape(H,R,shell,ink,ink==='paper'?1:.68,1);
  H.tint([P(9,-23),P(18,-16),P(18,6),P(1,16-fold*8),P(6,-4)],'sun',.34);
  const eyes=[[-9,-9],[8,-10]];
  for(const [a,b] of eyes){shape(H,R,loop([P(a-6,b),P(a,b-5),P(a+6,b-1),P(a+2,b+3),P(a-5,b+2)],2),'coral',.52,.75);shape(H,R,loop([P(a-4,b),P(a,b-3),P(a+4,b),P(a+1,b+1.5),P(a-3,b+1)],2),'blue',.8,.5);}
  stroke(H,R,[P(-1,-24),P(-1,-10),P(3,-1),P(-1,4)],'teal',.8);stroke(H,R,[P(-8,8-fold*3),P(0,10-fold*4),P(7,7-fold*3)],'blue',.75);
  for(let n=0;n<8;n++)H.line(R,[P(-15+n*4,11-fold*4),P(-14+n*4,13-fold*4)],'teal',.6);
  shape(H,R,[P(-17,-2),P(-11,-3),P(-10,3),P(-16,4)],'coral',.4,.5);H.outline(R,[P(-17,-2),P(-11,-3),P(-10,3),P(-16,4)],'teal',.55,{dash:[1,2]});
  stroke(H,R,[P(17,4),P(24,7),P(22,16),P(16,12)],'blue',1);stroke(H,R,[P(-16,6),P(-24,10),P(-22,16),P(-15,11)],'sun',1.2);
}

function makerAt(t) {
  const smooth=(a,b)=>{const q=Math.max(0,Math.min(1,(t-a)/(b-a)));return q*q*(3-2*q);},move=smooth(0,7.2)*(1-smooth(10.8,16));
  return {...maker,i:maker.i+.7*(1-move),j:maker.j-.7*(1-move)};
}

function handPosition(H,t) {
  const position=makerAt(t),p=FIGURES.pose({...position,at:[position.i,position.j,0]},t,{},H);
  return [(p.lhand[0]+p.rhand[0])/2-14,(p.lhand[1]+p.rhand[1])/2-3];
}

const room=world('mexico-city-mask-fitting','The eye opening catches light',{wall:'paper',height:4.05,wallTone:1,floor:'sun',tone:.1,head: 10},(H,R)=>{
  windowBay(H,R,'ne',1.4,9.3,2.55,1.2,{divisions:6});
  for(const side of ['nw','ne'])for(let n=.2;n<12;n+=.65){const q=side==='nw'?H.tile(.08,n,.45,.55,.018):H.tile(n,.08,.55,.45,.018);shape(H,R,q,'coral',.2);H.line(R,[q[1],q[3]],'teal',.7);}
  wallRack(H,R,'nw',.8,6.6,.3,3.05,4,'coral',(P,z,row,gap)=>{
    if(row===0){for(let n=0;n<5;n++){shape(H,R,[P(n*1.22+.12,z+.05),P(n*1.22+1.2,z+.05),P(n*1.22+1.2,z+.5),P(n*1.22+.12,z+.5)],'sun',.35);H.line(R,[P(n*1.22+.55,z+.25),P(n*1.22+.9,z+.25)],'blue',1.7);}}
    if(row===1){for(let n=0;n<8;n++){const [x,y]=P(.4+n*.72,z+.06,.45);oval(H,R,x,y-12,6,13,['teal','paper','coral'][n%3],.7);oval(H,R,x,y-24,6,2,'paper');H.dot(x,y-24,2,'blue');}}
    if(row===2){for(let n=0;n<4;n++){const [x,y]=P(.9+n*1.5,z+.16,.4);shape(H,R,[[x-9,y],[x-8,y-11],[x-11,y-17],[x-7,y-20],[x-3,y-14],[x-1,y-26],[x+3,y-26],[x+4,y-10],[x+8,y-20],[x+11,y-18],[x+9,y-4],[x+7,y]],'paper',1);}}
    if(row===3){for(let n=0;n<3;n++){const [x,y]=P(1+n*1.9,z+.25,.4);mask(H,R,x,y,.37,n===1?.5:0,['paper','coral','teal'][n]);}}
  });
  hangingRail(H,R,'nw',8.0,3.25,2.78,3,(P,u,n)=>{
    const q=[P(u-.36,-.2),P(u+.36,-.2),P(u+.31,-1.67),P(u-.32,-1.6)];shape(H,R,q,['paper','coral','teal'][n],.58);for(let k=0;k<4;k++)H.line(R,[P(u-.23+k*.14,-.22),P(u-.21+k*.14,-1.56)],'blue',.55,{tone:.4});
  });
  metal(H,R,.4,8.6,1.45,2.05,.1,.65,'blue');panelFront(H,R,.4,10.65,1.45,.15,.52,2,'teal');H.line(R,[H.p(.8,9.3,.79),H.p(1.3,9.3,.79)],'sun',2.3);
  const screens=[[3.1,3.3,2.3,.12],[5.4,3.3,2.3,.12],[7.7,3.3,1.4,.75]];
  for(const [i,j,w,angle] of screens){const A=H.p(i,j,.4),B=H.p(i+w,j+angle,.4),C=H.p(i+w,j+angle,3),D=H.p(i,j,3);shape(H,R,[A,B,C,D],'paper',1);H.line(R,[A,D,C,B],'sun',3.2);for(let n=0;n<6;n++)H.line(R,[H.p(i+.13+n*w/6,j+n*angle/6,.6),H.p(i+.13+n*w/6,j+n*angle/6,2.88)],'blue',.5,{tone:.16});for(const x of [i,i+w])timber(H,R,x,j-.15,.13,.5,.03,.48,'sun');}
  for(const p of [[5.4,3.31],[7.7,3.31]])for(const z of [.65,2.65])metal(H,R,p[0]-.06,p[1],.12,.08,z,.15,'teal');
  benchFrame(H,R,4.28,5.0,4.9,2.18,1.06,'sun');
  drape(H,R,4.55,5.2,1.23,1.53,1.08,.3,'teal');
  cushion(H,R,6.4,6.02,1.04,.75,1.08,.13,'coral');
  const [fx,fy]=handPosition(H,8);oval(H,R,fx,fy+28,23,8,'blue',.67);oval(H,R,fx,fy+26,21,7,'sun',.55);stroke(H,R,[[fx,fy+26],[fx,fy+12]],'teal',7);oval(H,R,fx,fy-5,18,25,'paper',1);H.tint(ell(fx+7,fy-4,9,21),'sun',.27);shape(H,R,[[fx-14,fy-6],[fx-8,fy-9],[fx-5,fy-3],[fx-12,fy+1]],'coral',.22);H.line(R,[[fx-11,fy-20],[fx-8,fy-27],[fx,fy-30],[fx+11,fy-22]],'teal',.7,{dash:[2,3]});
  const [mx,my]=H.p(8.2,5.63,1.08);shape(H,R,[[mx-12,my],[mx-13,my-27],[mx-7,my-33],[mx+8,my-33],[mx+14,my-26],[mx+13,my]],'teal',.7);shape(H,R,[[mx-7,my-5],[mx-8,my-25],[mx+8,my-25],[mx+8,my-5]],'paper',1);H.line(R,[[mx-6,my-23],[mx+6,my-8]],'sun',1.2);oval(H,R,mx,my+3,17,5,'teal');
  const [sx,sy]=H.p(3,8.6,1.05);benchFrame(H,R,2.05,7.82,2.35,1.65,1.05,'teal');metal(H,R,2.3,8.2,1.9,.9,1.07,.08,'blue');shape(H,R,[[sx-21,sy-5],[sx-21,sy-34],[sx-11,sy-43],[sx+18,sy-43],[sx+24,sy-35],[sx+24,sy-9],[sx+12,sy-9],[sx+12,sy-30],[sx-10,sy-30],[sx-10,sy-5]],'paper',1);oval(H,R,sx+25,sy-28,8,11,'teal');H.line(R,[[sx-17,sy-6],[sx-17,sy-18]],'blue',1.2);H.line(R,[[sx-25,sy-2],[sx+6,sy-2]],'sun',1.5);bentTube(H,R,[[2.6,8.5,.9],[2.7,8.6,.1],[3.3,8.6,.1]],1,'blue');
  taskLight(H,R,8.8,5.11,1.08,'coral',-.8);
  for(const [i,j,ink] of [[4.85,6.15,'coral'],[5.2,6.25,'paper'],[5.48,5.8,'teal']]){const [x,y]=H.p(i,j,1.13);oval(H,R,x,y,5,3,ink);H.line(R,[[x-4,y],[x-4,y-10],[x+4,y-10],[x+4,y]],ink,2);oval(H,R,x,y-10,5,2,'sun');}
  const foam=H.p(8.15,6.54,1.09);shape(H,R,loop([[foam[0]-12,foam[1]],[foam[0]-11,foam[1]-15],[foam[0]+4,foam[1]-19],[foam[0]+15,foam[1]-5],[foam[0]+10,foam[1]+4]],2),'sun',.35);shape(H,R,[[foam[0]-1,foam[1]-17],[foam[0]+12,foam[1]-5],[foam[0]+9,foam[1]+3],[foam[0]-2,foam[1]]],'paper',1);
  const seam=H.tile(4.5,9.55,1.85,.68,.07);shape(H,R,seam,'coral',.35);for(let n=0;n<14;n++)H.line(R,[H.p(4.61+n*.115,9.73,.08),H.p(4.65+n*.115,9.88+(n%3)*.025,.08)],'paper',1.1);
  for(let n=0;n<3;n++){const [x,y]=H.p(9.6+n*.48,.4,1.68);H.line(R,[[x,y],[x,y-20]],'blue',.7);mask(H,R,x,y,.24,n===1?.6:0,n===1?'coral':'paper');}
},(H,R,t)=>{
  const u=((t%18)+18)%18,p=handPosition(H,u),fold=u<3.6||u>13.4?.34:0;
  const position=makerAt(u);actor(H,R,position.i,position.j,u,'mexicoMaskMaker',maker.opts,0,maker.scale);
  mask(H,R,p[0],p[1],1,fold);
  const template=H.p(7.34,6.57,1.13),blend=(a,b)=>{const q=Math.max(0,Math.min(1,(u-a)/(b-a)));return q*q*(3-2*q);},w=blend(5.2,7.2)*(1-blend(10.8,12.8));
  const tx=template[0]*(1-w)+(p[0]+27)*w,ty=template[1]*(1-w)+(p[1]-6)*w;
  shape(H,R,[[tx-8,ty-4],[tx+9,ty-5],[tx+11,ty+5],[tx-9,ty+6]],'sun',.42,.7);shape(H,R,loop([[tx-5,ty],[tx,ty-3],[tx+7,ty],[tx+1,ty+3]],1),'paper',1,.55);
  const [ex,ey]=H.p(5.2,6.25,1.13);stroke(H,R,[[ex,ey-5],[ex+7,ey+2],[ex+16+Math.sin(u*TAU/18)*2,ey+7],[ex+19,ey+4]],'coral',.9);
});
room.loopSeconds=18;
room.stillTime=9;
export default room;
