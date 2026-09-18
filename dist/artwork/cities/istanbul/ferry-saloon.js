import { world, shape, oval, stroke, ell, wallPt, cycle, actor } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, cushion, drape, bentTube, slattedSeat } from '../materials.js';
import { boardFloor, cabinetFrame } from '../structure.js';
import { windowBay, recessedFrame, floorShadow, hangingRail } from '../joinery.js';

const rest=FIGURES.sample('sit',0);
const poseA={...rest,al:75,ar:85,el:30,er:25,lean:-5};
const poseB={...rest,al:110,ar:122,el:28,er:18,lean:-7};
for(const n of ['left','right'])FIGURES.clips[`istanbul-ferry-${n}`]={dur:24,keys:[[0,poseA],[.2,poseA],[.235,poseB],[.27,poseA],[.305,poseB],[.34,poseA],[.38,poseB],[.4,poseA],[.6,{...poseA,head:6,lean:1}],[.91,poseA],[1,poseA]]};

function seat(H,R,i,j,w){
  floorShadow(H,i,j,w,1.65,.16);
  for(const x of [i+.23,i+w-.36]){metal(H,R,x,j+.25,.17,1.24,.08,.49,'teal');metal(H,R,x-.06,j+.13,.29,1.5,.05,.11,'blue');}
  timber(H,R,i,j,w,1.62,.56,.16,'sun');
  for(const h of [.24,.39])bentTube(H,R,[[i+.2,j+1.48,h],[i+w-.2,j+1.48,h]],1.4,'teal');
  for(let x=i+.28;x<i+w-.2;x+=.38)bentTube(H,R,[[x,j+.25,.3],[x,j+1.42,.3]],1,'blue');
  for(let n=0;n<Math.floor(w/1.2);n++){
    const xx=i+n*w/Math.floor(w/1.2);
    cushion(H,R,xx,j,w/Math.floor(w/1.2)-.04,1.62,.72,.19,'coral');
    H.line(R,[H.p(xx+.08,j+1.52,.93),H.p(xx+w/Math.floor(w/1.2)-.13,j+1.52,.93)],'paper',.9);
  }
  timber(H,R,i,j,w,.18,.74,1.15,'sun');
  cushion(H,R,i+.07,j+.13,w-.14,.3,1.02,.81,'paper');
  for(let x=i+1.28;x<i+w-.3;x+=1.3)bentTube(H,R,[[x,j+1.5,.9],[x,j+1.5,1.27],[x,j+.2,1.38]],2.5,'blue');
  for(let x=i+.35;x<i+w;x+=1.3)H.line(R,[H.p(x,j+.3,1.71),H.p(x,j+.3,1.12)],'coral',.7);
}

function vesselBag(H,R,i,j,z){
  const [x,y]=H.p(i,j,z);
  shape(H,R,[[x-10,y],[x+10,y],[x+12,y-19],[x-11,y-20]],'sun',.56,.7);
  stroke(H,R,[[x-8,y-19],[x-7,y-27],[x+7,y-27],[x+9,y-19]],'blue',1.5);
  H.line(R,[[x-6,y-15],[x+7,y-13]],'paper',.8);
}

function satchel(H,R,i,j,z=0){
  const [x,y]=H.p(i,j,z);
  shape(H,R,[[x-17,y],[x+18,y],[x+20,y-26],[x+11,y-32],[x-12,y-29],[x-18,y-21]],'teal',.65,.85);
  stroke(H,R,[[x-9,y-28],[x-11,y-39],[x+9,y-39],[x+12,y-30]],'blue',2);
  shape(H,R,[[x-11,y-16],[x+12,y-16],[x+11,y-3],[x-10,y-3]],'teal',.42,.6);
  H.line(R,[[x-10,y-17],[x+13,y-17]],'sun',1);H.line(R,[[x+5,y-38],[x+9,y-34],[x+3,y-34]],'paper',1);
}

const room=world('istanbul-ferry-saloon','A table between shores',{wall:false,floor:'paper',tone:.85,head:52},(H,R)=>{
  boardFloor(H,R,.08,.08,11.84,11.84,.023,'paper',.72);
  for(const side of ['nw','ne']){
    const P=(u,z,d=.08)=>wallPt(H,side,u,z,-d);
    shape(H,R,[P(0,0),P(12,0),P(12,3.7),P(11.4,4.07),P(.6,4.07),P(0,3.7)],'paper',1,.9);
    shape(H,R,[P(.05,.1),P(11.95,.1),P(11.95,1.23),P(.05,1.23)],'teal',.56,.7);
    H.line(R,[P(.1,1.27,.14),P(11.9,1.27,.14)],'sun',3.8);
    H.line(R,[P(.08,3.78,.18),P(11.92,3.78,.18)],'teal',7);
    H.line(R,[P(.08,3.88,.18),P(11.92,3.88,.18)],'sun',2);
    for(const u of [.25,3,5.8,8.6,11.6]){H.line(R,[P(u,.1,.14),P(u,3.65,.14)],'blue',1.7);H.line(R,[P(u,3.65,.14),P(u+.25,4.01,.05)],'paper',4.4);}
  }
  for(const side of ['nw','ne'])windowBay(H,R,side,.65,10.7,1.67,1.76,{divisions:4,view:P=>{
    shape(H,R,[P(.12,.12),P(10.55,.12),P(10.55,.72),P(.12,.72)],'teal',.35,.5);
    for(let k=0;k<10;k++){const u=.2+k*1.06;shape(H,R,[P(u,.65),P(u+.8,.65),P(u+.8,.92+k%3*.09),P(u+.42,1.05+k%3*.12),P(u,.9)],k%2?'coral':'blue',.24,.4);}
    for(let k=0;k<12;k++)H.line(R,[P(.3+k*.86,.3+(k%3)*.11),P(.78+k*.86,.3+(k%3)*.11)],'paper',1.2);
  }});
  recessedFrame(H,R,'ne',9.2,2.04,.16,1.07,'teal',P=>{
    const [x,y]=P(1,.55);oval(H,R,x,y,24,19,'coral',.7);oval(H,R,x,y,14,10,'paper',1);
    for(const a of [0,Math.PI/2,Math.PI,Math.PI*1.5])H.line(R,[[x+Math.cos(a)*17,y+Math.sin(a)*13],[x+Math.cos(a)*25,y+Math.sin(a)*20]],'paper',3);
  });
  for(const side of ['ne','nw']){
    const P=(u,z,d=.22)=>wallPt(H,side,u,z,-d);
    H.line(R,[P(.45,3.5,.23),P(11.4,3.5,.23)],'blue',2.3);
    for(const u of [1,3.65,6.3,8.95,11.25]){
      H.line(R,[P(u,3.58),P(u,3.92,.7),P(u,3.95,1.36)],'teal',3);
      H.line(R,[P(u,3.78,.6),P(u,3.95,1.36)],'paper',1.2);
    }
    H.line(R,[P(.5,3.61,.85),P(11.4,3.61,.85)],'teal',2.2);
    for(let u=.6;u<11.45;u+=.4)H.line(R,[P(u,3.62,.28),P(u,3.62,.83)],'blue',.6);
  }
  for(const j of [3.75,8.25]){
    const [lx,ly]=wallPt(H,'nw',j,3.73,-.55);shape(H,R,[[lx-16,ly-4],[lx+16,ly-4],[lx+14,ly+5],[lx-14,ly+5]],'sun',.8,.7);H.line(R,[[lx-12,ly],[lx+12,ly]],'paper',2);
  }
  for(const side of ['ne','nw']){
    recessedFrame(H,R,side,7.65,1.31,3.75,.28,'paper',P=>{for(let n=0;n<6;n++)H.line(R,[P(.15+n*.19,.06),P(.15+n*.19,.22)],'blue',.9);});
  }
  seat(H,R,.65,2.1,6.5);
  seat(H,R,6.35,1.15,4.85);
  seat(H,R,1.75,8.55,5.25);
  const patch=H.tile(2,9.75,.52,.39,.94);shape(H,R,patch,'coral',.78,.7);for(let k=0;k<4;k++)H.line(R,[H.p(2.02+k*.12,9.74,.95),H.p(2.04+k*.12,10.16,.95)],'paper',.6);
  for(const x of [1.25,6.95,11.05])bentTube(H,R,[[x,1.1,.05],[x,1.1,3.48]],3.4,'sun');
  bentTube(H,R,[[.7,1.12,3.48],[11.1,1.12,3.48]],2.7,'sun');
  for(const x of [1.75,4.2,6.4,9.4]){bentTube(H,R,[[x,1.2,3.5],[x,1.2,3.11]],1.6,'blue');oval(H,R,...H.p(x,1.2,3.02),8,11,'paper',.65);}
  metal(H,R,4.48,5.25,2.87,1.87,.035,.12,'blue');
  metal(H,R,5.52,5.68,.72,.72,.12,1.01,'teal');
  for(const i of [4.62,7.02])for(const j of [5.39,6.75]){oval(H,R,...H.p(i,j,.18),3,1.5,'sun',.8);H.line(R,[H.p(i-.04,j,.19),H.p(i+.04,j,.19)],'blue',.8);}
  for(const i of [4.57,7.25])bentTube(H,R,[[i,5.7,.2],[i,6.72,.2],[5.91,6.42,.72]],2.5,'teal');
  shape(H,R,H.faceI(5.62,6.43,.51,.36,.9),'blue',.6,.7);
  for(const z of [.43,.54,.65])H.line(R,[H.p(5.7,6.46,z),H.p(6.04,6.46,z)],'paper',.9);
  const [tx,ty]=H.p(5.9,6.1,1.15);oval(H,R,tx,ty+5,51,26,'blue',.8);oval(H,R,tx,ty,51,25,'sun',.61);
  for(const dx of [-31,31]){oval(H,R,tx+dx,ty,7,4,'blue',.72);oval(H,R,tx+dx,ty-1,5,3,'paper',1);}
  H.line(R,[[tx-27,ty+20],[tx-12,ty+22]],'paper',1.5);
  metal(H,R,4.7,6.7,.72,.2,.65,.25,'coral');
  const [hx,hy]=H.p(6.7,6.1,.91);stroke(H,R,[[hx,hy],[hx,hy+12],[hx+7,hy+15],[hx+9,hy+7]],'blue',1.4);H.line(R,[[hx+1,hy+11],[hx+6,hy+13]],'paper',2);
  satchel(H,R,5.75,6.05,.05);satchel(H,R,9.8,3.45,.07);
  drape(H,R,7.35,1.5,.9,.8,.95,.66,'teal');
  const [bx,by]=H.p(7.85,2.32,.76);shape(H,R,[[bx-9,by],[bx+10,by],[bx+7,by-5],[bx-5,by-5]],'paper',1,.5);shape(H,R,[[bx-4,by-5],[bx+6,by-5],[bx+4,by-10],[bx-2,by-10]],'coral',.6,.4);
  cabinetFrame(H,R,9.1,8.45,2.22,2.31,.13,.93,2,'teal',(x,y,w,d,z,h,n)=>{
    timber(H,R,x,y,w,d,z+.36,.07,'sun');
    if(n===0){drape(H,R,x+.1,y+.12,w-.2,d-.3,z+.47,.18,'paper');}
    else{vesselBag(H,R,x+.45,y+.76,z+.16);}
  });
  for(const i of [9.15,11.27])bentTube(H,R,[[i,8.48,1.04],[i,8.48,1.58],[i,10.69,1.58],[i,10.69,1.05]],2,'teal');
  for(let j=8.57;j<10.7;j+=.23)bentTube(H,R,[[9.2,j,1.07],[11.24,j,1.07]],1.2,'sun');
  satchel(H,R,9.83,9.1,1.12);
  drape(H,R,10.35,9.43,.74,.98,1.11,.48,'coral');
  const [ux,uy]=H.p(10.88,10.32,1.14);stroke(H,R,[[ux,uy],[ux-18,uy-46],[ux-12,uy-50]],'blue',2);shape(H,R,[[ux-17,uy-46],[ux-11,uy-46],[ux+3,uy-2],[ux-1,uy]],'coral',.56,.7);
  metal(H,R,9.24,10.88,1.96,.45,.06,.09,'blue');
  bentTube(H,R,[[9.4,5.9,.06],[9.4,5.9,1.1],[10.5,6.4,1.45],[10.6,6.85,.07]],2.6,'blue');
  bentTube(H,R,[[9.25,6.15,.1],[10.73,6.8,1.35],[11,6.85,1.8]],2.6,'blue');
  for(const [i,j] of [[9.4,5.9],[10.6,6.85]])oval(H,R,...H.p(i,j,.1),5,7,'blue',.85);
  cushion(H,R,9.8,6.2,.45,.68,.6,.14,'coral');
  bentTube(H,R,[[9.38,5.88,.3],[10.74,6.69,.3],[10.8,6.86,.6]],1.5,'sun');
  shape(H,R,[H.p(9.5,6.03,.55),H.p(10.53,6.69,.55),H.p(10.64,6.59,1.12),H.p(9.68,6.11,1.32)],'coral',.65,.75);
  H.line(R,[H.p(9.58,6.13,.65),H.p(10.46,6.64,.65)],'paper',1);
  drape(H,R,9.82,6.38,.61,.47,1.1,.35,'paper');
  for(let n=0;n<4;n++)H.line(R,[H.p(9.86+n*.11,6.41,1.12),H.p(9.86+n*.11,6.8,1.12)],'teal',.65);
  const [ex,ey]=H.p(3.9,9.15,.98);shape(H,R,[[ex-16,ey+2],[ex+13,ey+8],[ex+21,ey-7],[ex-9,ey-14]],'paper',1,.65);
  shape(H,R,[[ex-10,ey-7],[ex-1,ey-4],[ex+3,ey-10],[ex-6,ey-12]],'coral',.6,.4);
  for(let n=0;n<4;n++)H.line(R,[[ex-8,ey+n*2],[ex+11,ey+5+n*2]],'blue',.5);
  const [boatx,boaty]=H.p(5.57,9.53,.98);shape(H,R,[[boatx-11,boaty],[boatx+12,boaty],[boatx+7,boaty+6],[boatx-6,boaty+6]],'sun',.8,.55);shape(H,R,[[boatx,boaty-15],[boatx,boaty],[boatx+9,boaty]],'paper',1,.5);
  for(const i of [2.03,6.64])bentTube(H,R,[[i,8.79,.18],[i,10.29,.18]],2,'teal');
  const [cx,cy]=H.p(7.25,2.43,.23);oval(H,R,cx,cy,8,4,'sun',.6);H.line(R,[[cx-7,cy],[cx+7,cy]],'paper',1);
  H.light(...H.p(5.8,6.5,0),160,85,.2);
},(H,R,t)=>{
  const [x,y]=H.p(5.9,6.1,0);
  for(const offset of [-26,26]){
    shape(H,R,[[x+offset-13,y-2],[x+offset+14,y-2],[x+offset+13,y+14],[x+offset+9,y+14],[x+offset+9,y+2],[x+offset-9,y+2],[x+offset-9,y+14],[x+offset-13,y+14]],'teal',.7,.7);
    oval(H,R,x+offset,y-4,16,8,'blue',.7);oval(H,R,x+offset,y-7,15,7,'coral',.65);
  }
  for(const [offset,face,name,shirt] of [[-26,'se','left','coral'],[26,'sw','right','teal']])FIGURES.draw(H,R,{who:'adult',x:x+offset,y:y+10,t,clip:`istanbul-ferry-${name}`,phase:t/24,scale:1.8,face,z:0,ground:[x+offset,y+10],opts:{shirt:[shirt,.72],hairStyle:name==='left'?'pony':'curly'}});
  const u=cycle(t,24);for(let n=0;n<4;n++){const p=wallPt(H,'nw',1.4+n*2.35,2.37,-.2);H.opacity(.13*Math.sin(u*Math.PI),()=>H.line(R,[[p[0]+u*15,p[1]-8],[p[0]+u*15+18,p[1]-2]],'paper',2));}
});
room.loopSeconds=24;room.stillTime=2;
export default room;
