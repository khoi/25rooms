import { world, actor, shape, oval, stroke, ell, wallPt, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, benchFrame, drape } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';
import { recessedFrame, hangingRail, floorShadow } from '../joinery.js';

const duration=24;
const ease=(a,b,t)=>{const p=Math.max(0,Math.min(1,(t-a)/(b-a)));return p*p*(3-2*p);};
const base={x:0,y:0,drop:0,lean:0,head:0,al:44,ar:49,el:65,er:61,ll:-5,lr:5,kl:0,kr:0,roll:0};
const look={...base,al:128,ar:123,el:35,er:41,head:-9};
FIGURES.clips.londonWetlandVisitor={dur:duration,keys:[[0,{...base}],[.2,{...base}],[.39,look],[.6,look],[.73,{...base}],[1,{...base}]]};
FIGURES.clips.londonWetlandChild={dur:duration,keys:[[0,{...base,al:40,ar:40,el:25,er:25}],[.3,{...base,head:-3,al:40,ar:40,el:25,er:25}],[.47,{...base,head:-20,al:40,ar:40,el:25,er:25}],[.7,{...base,head:-20,al:40,ar:40,el:25,er:25}],[1,{...base,al:40,ar:40,el:25,er:25}]]};

function reed(H,R,P,u,h,lean=0){
  stroke(H,R,[P(u,.04),P(u+lean*.35,h*.55),P(u+lean,h)],'teal',1.2,.8);
  for(const [v,s]of[[.25,-1],[.48,1],[.72,-1]])shape(H,R,[P(u+lean*v,h*v),P(u+lean*v+s*.27,h*v+.22),P(u+lean*v+s*.1,h*v+.09)],'teal',.63,.4);
  const [x,y]=P(u+lean,h);oval(H,R,x,y,2.7,8,'coral',.46);
}
function cards(H,R,i,j,z){
  for(let n=0;n<3;n++){
    const x=i+n*.41;shape(H,R,H.tile(x,j,.34,.49,z),'paper',1,.5);const[a,b]=H.p(x+.18,j+.25,z+.015);
    stroke(H,R,[[a-5,b+1],[a-2,b-2],[a+2,b],[a+6,b-3]],'blue',1.1);
  }
}
function binocular(H,R,x,y){
  for(const d of[-4,5]){shape(H,R,[[x+d-3,y-2],[x+d+3,y-2],[x+d+4,y+10],[x+d-4,y+10]],'blue',.9,.6);oval(H,R,x+d,y+10,4,2.5,'teal',.55);H.line(R,[[x+d-1,y],[x+d-1,y+7]],'paper',.65);}
  H.line(R,[[x-4,y+1],[x+5,y+1]],'blue',3);stroke(H,R,[[x-7,y+4],[x-12,y+20],[x+7,y+24],[x+9,y+5]],'blue',1);H.line(R,[[x-2,y+23],[x+3,y+24]],'coral',2.3);
}

const room=world('london-wetland-listen','A window at reed height',{wall:false,floor:'teal',tone:.18,head:36},(H,R)=>{
  boardFloor(H,R,0,0,12,12,.015,'sun',.67);
  for(const side of['nw','ne']){
    shape(H,R,[wallPt(H,side,0,0,-.03),wallPt(H,side,12,0,-.03),wallPt(H,side,12,3.45,-.03),wallPt(H,side,0,3.45,-.03)],'teal',.61,.9);
    for(let u=.18;u<12;u+=.62)H.line(R,[wallPt(H,side,u,.05,-.06),wallPt(H,side,u,3.4,-.06)],'blue',.75,{tone:.5});
    H.line(R,[wallPt(H,side,0,3.45,-.18),wallPt(H,side,12,3.45,-.18)],'blue',4.5);
    H.line(R,[wallPt(H,side,0,.12,-.18),wallPt(H,side,12,.12,-.18)],'sun',2.5);
  }
  const P=recessedFrame(H,R,'ne',2.15,8.9,1.48,1.54,'sun',Q=>{
    shape(H,R,[Q(.11,.08),Q(8.8,.08),Q(8.8,1.45),Q(.11,1.45)],'paper',1,.3);
    shape(H,R,[Q(.1,.05),Q(8.8,.05),Q(8.8,.53),Q(.1,.43)],'teal',.25,.3);
    for(let n=0;n<25;n++){const u=.18+n*.34;reed(H,R,Q,u,.55+(n*7%11)*.078,(n%4-1.5)*.085);}
    for(let n=0;n<8;n++)H.line(R,[Q(.4+n*1.1,.15+(n%3)*.07),Q(.95+n*1.1,.15+(n%3)*.07)],'paper',1);
    for(const [u,z]of[[2,.72],[6.7,.86]]){const[x,y]=Q(u,z);stroke(H,R,[[x-5,y],[x,y-2],[x+5,y]],'blue',1.1);}
  });
  for(const i of[2.45,5.2,8.5,10.7]){metal(H,R,i,.2,.22,.28,2.88,.13,'blue');H.line(R,[P(i-2.15,.11),P(i-2.15,.23)],'paper',.9);}
  timber(H,R,2.0,.08,9.22,1.02,1.37,.14,'sun');
  for(const i of[2.6,5.25,8.8]){bentTube(H,R,[[i,.15,1.34],[i,.98,1.13],[i,.98,1.37]],2.3,'blue');}
  for(const i of[4.9,7.9,9.35]){shape(H,R,H.tile(i,.51,.95,.45,1.54),'blue',.55,.6);shape(H,R,H.tile(i+.035,.51,.87,.4,1.57),i===9.35?'coral':'paper',.9,.5);H.line(R,[H.p(i+.08,.87,1.59),H.p(i+.8,.87,1.59)],'sun',.75);}
  benchFrame(H,R,3.0,2.1,7.9,.88,.69,'sun');
  timber(H,R,3,3,7.9,.08,.06,.16,'sun');
  for(const i of[3.35,6.35,10.2])bentTube(H,R,[[i,2.78,.57],[i,2.02,1.09]],2,'teal');
  drape(H,R,8.65,2.15,1.15,.69,.73,.13,'coral');
  shape(H,R,H.tile(7.05,2.53,.36,.24,.021),'blue',.34,.4);shape(H,R,H.tile(7.6,2.5,.36,.24,.021),'blue',.26,.4);
  metal(H,R,3.25,.62,.52,.52,1.5,.15,'teal');bentTube(H,R,[[3.5,.86,1.65],[3.5,.86,2.12],[3.72,.86,2.18]],2.6,'blue');
  const [sx,sy]=H.p(3.75,.86,2.19);shape(H,R,[[sx-13,sy-5],[sx+12,sy-13],[sx+19,sy-4],[sx-9,sy+4]],'blue',.9,.7);oval(H,R,sx+15,sy-8,5,5,'paper',1);
  cabinetFrame(H,R,.42,.65,1.45,4.6,0,2.65,1,'sun',(i,j,w,d,z,h)=>{
    for(const zz of[.42,1.13,1.84])timber(H,R,i,j,w,d,zz,.08,'sun');
    for(let n=0;n<3;n++){drape(H,R,i+.08,j+.2+n*.95,w-.16,.66,.53,.17,n%2?'paper':'teal');}
    for(let n=0;n<4;n++){metal(H,R,i+.05,j+.12+n*.98,w-.08,.85,1.23,.32,n%2?'teal':'blue');const[x,y]=H.p(i+w,j+.54+n*.98,1.4);H.line(R,[[x,y-3],[x,y+3]],'sun',1.4);}
    cards(H,R,i+.04,j+.2,1.96);
  });
  for(const j of[1.05,2.9,4.6]){const[x,y]=H.p(1.8,j,2.7);shape(H,R,[[x-7,y],[x+7,y],[x+8,y-19],[x-7,y-17]],j<2?'coral':'blue',.65,.7);stroke(H,R,[[x-5,y-17],[x-6,y-26],[x+5,y-26],[x+6,y-18]],'blue',1.5);}
  hangingRail(H,R,'nw',6.1,3.5,2.7,3,(Q,u,n)=>{const[x,y]=Q(u,-.12);shape(H,R,[[x-12,y],[x+12,y],[x+10,y+23],[x-9,y+26]],n===1?'paper':'sun',.66,.7);if(n===1)stroke(H,R,[[x-6,y+15],[x-3,y+5],[x+1,y+20],[x+6,y+9]],'teal',1.2);else for(let k=0;k<3;k++)stroke(H,R,[[x-8,y+5+k*6],[x,y+2+k*6],[x+8,y+6+k*6]],'blue',.7);});
  benchFrame(H,R,.65,7.4,1.25,3.5,.85,'sun');
  const [fx,fy]=H.p(1.25,8.2,.88);shape(H,R,[[fx-9,fy],[fx-3,fy-11],[fx+5,fy-6],[fx+11,fy+1],[fx+3,fy+7],[fx-6,fy+6]],'paper',1,.7);for(const [dx,dy]of[[-3,-4],[1,-5],[5,-2]])oval(H,R,fx+dx,fy+dy,1.5,2,'blue',.5);
  const [bx,by]=H.p(1.2,9.5,.9);shape(H,R,[[bx-6,by-12],[bx+6,by-9],[bx+5,by+9],[bx-8,by+6]],'coral',.52,.7);for(let k=0;k<4;k++)stroke(H,R,[[bx-4+k*3,by-10],[bx-2+k*2,by-1],[bx-4+k*3,by+6]],'blue',.7);
  stroke(H,R,[H.p(1.2,10.1,.88),H.p(1.21,10.18,1.25),H.p(1.4,10.22,1.4)],'teal',1.5);
  const [ex,ey]=H.p(5.3,8.4,.14);shape(H,R,[[ex-24,ey],[ex+24,ey],[ex+23,ey-13],[ex-21,ey-16]],'teal',.6,.8);oval(H,R,ex-8,ey-12,7,9,'blue',.8);oval(H,R,ex+8,ey-12,7,9,'blue',.8);stroke(H,R,[[ex-8,ey-19],[ex-4,ey-30],[ex+5,ey-30],[ex+8,ey-19]],'blue',2.2);shape(H,R,[[ex+14,ey-4],[ex+23,ey-3],[ex+23,ey-10],[ex+15,ey-11]],'paper',1,.5);
  cards(H,R,5.9,8.6,.05);H.line(R,[H.p(6.1,8.2,.06),H.p(6.8,8.4,.06)],'coral',1.7);
  shape(H,R,H.tile(10.55,5.0,1.2,2.2,.02),'blue',.46,.8);for(let j=5.1;j<7.2;j+=.22)H.line(R,[H.p(10.64,j,.03),H.p(11.63,j,.03)],'sun',.7);
  for(const j of[.15,6.1,11.7])bentTube(H,R,[[.05,j,3.49],[6,j,3.83],[11.95,j,3.49]],3.5,'sun');
  bentTube(H,R,[[.03,11.8,3.46],[.03,11.8,.06]],3.4,'blue');
  const [hx,hy]=H.p(9.4,.39,1.51);stroke(H,R,[[hx-8,hy],[hx+8,hy-7]],'blue',.75);for(let k=0;k<5;k++)H.line(R,[[hx-6+k*3,hy-k],[hx-4+k*3,hy-6-k]],'paper',.8);
},(H,R,time)=>{
  const t=((time%duration)+duration)%duration,opening=ease(.6,4.8,t)*(1-ease(17,22,t)),angle=opening*2.8;
  const panel=(i,v)=>H.p(i,.3-v*Math.sin(angle),3-v*Math.cos(angle));
  shape(H,R,[panel(2.3,0),panel(10.92,0),panel(10.92,1.36),panel(2.3,1.36)],'sun',.61,.9);
  for(let i=2.5;i<10.9;i+=.71)H.line(R,[panel(i,.04),panel(i,1.32)],'blue',.55,{tone:.35});
  for(const i of[2.6,10.6]){H.line(R,[H.p(i,.32,1.6),panel(i,1.18)],'blue',2);oval(H,R,...panel(i,1.18),2,2,'paper',1);}
  const handle=panel(6.2,1.21);H.line(R,[[handle[0]-6,handle[1]],[handle[0]+6,handle[1]+5]],'blue',3);H.line(R,[[handle[0]-4,handle[1]],[handle[0]+4,handle[1]+3]],'paper',1.4);
  actor(H,R,6.15,3.45,t,'londonWetlandVisitor',{face:'ne',shirt:['blue',.75],pants:['teal',.75],hairStyle:'short',prop:(HH,RR,pts)=>{const release=ease(4.6,5.2,t)*(1-ease(16.6,17.2,t)),pulley=HH.p(6.2,.3,3.12),cleat=HH.p(6.5,3.1,1.61),end=pts.nearHand.map((v,k)=>v+(cleat[k]-v)*release);stroke(HH,RR,[handle,pulley,[pulley[0]+7,pulley[1]+9],end],'blue',.85);oval(HH,RR,pulley[0],pulley[1],3.1,3.1,'sun',.8);binocular(HH,RR,pts.farHand[0]+(pts.nearHand[0]-pts.farHand[0])*.5*release,pts.farHand[1]+(pts.nearHand[1]-pts.farHand[1])*.5*release);}},0,1.8);
  actor(H,R,8.75,3.45,t,'londonWetlandChild',{face:'ne',shirt:['coral',.77],pants:['blue',.8],hairStyle:'curly'},0,1.65,'child');
  const sway=.05*Math.sin(t*TAU/duration);shape(H,R,[H.p(.3,10.3,3.4),H.p(.3,10.95,3.4),H.p(.38+sway,10.95,3.15),H.p(.36+sway,10.3,3.15)],'paper',.9,.6);
  for(let n=0;n<4;n++)H.line(R,[H.p(3+n*.65,1.15,1.52),H.p(3.2+n*.65+sway,1.5,1.52)],'teal',.9,{tone:.33*opening});
});
room.loopSeconds=duration;
room.stillTime=11;
export default room;
