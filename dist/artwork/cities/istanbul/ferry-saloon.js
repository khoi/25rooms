import { world, shape, oval, stroke, ell, wallPt, cycle, actor } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, cushion, drape, bentTube, slattedSeat } from '../materials.js';
import { boardFloor } from '../structure.js';
import { windowBay, recessedFrame, floorShadow } from '../joinery.js';

const rest=FIGURES.sample('sit',0);
const poseA={...rest,al:75,ar:85,el:30,er:25,lean:-5};
const poseB={...rest,al:110,ar:122,el:28,er:18,lean:-7};
for(const n of ['left','right'])FIGURES.clips[`istanbul-ferry-${n}`]={dur:24,keys:[[0,poseA],[.2,poseA],[.235,poseB],[.27,poseA],[.305,poseB],[.34,poseA],[.38,poseB],[.4,poseA],[.6,{...poseA,head:6,lean:1}],[.91,poseA],[1,poseA]]};

function seat(H,R,i,j,w){
  floorShadow(H,i,j,w,1.65,.16);
  for(const x of [i+.23,i+w-.36]){metal(H,R,x,j+.25,.17,1.24,.08,.49,'teal');metal(H,R,x-.06,j+.13,.29,1.5,.05,.11,'blue');}
  timber(H,R,i,j,w,1.62,.56,.16,'sun');
  cushion(H,R,i,j,w,1.62,.72,.19,'coral');
  timber(H,R,i,j,w,.18,.74,1.15,'sun');
  cushion(H,R,i+.07,j+.13,w-.14,.3,1.02,.81,'paper');
  for(let x=i+1.28;x<i+w-.3;x+=1.3)bentTube(H,R,[[x,j+1.5,.9],[x,j+1.5,1.27],[x,j+.2,1.38]],2.5,'blue');
  for(let x=i+.35;x<i+w;x+=1.3)H.line(R,[H.p(x,j+.3,1.71),H.p(x,j+.3,1.12)],'coral',.7);
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
  seat(H,R,.65,2.1,6.5);
  seat(H,R,6.35,1.15,4.85);
  seat(H,R,1.75,8.55,5.25);
  const patch=H.tile(2,9.75,.52,.39,.94);shape(H,R,patch,'coral',.78,.7);for(let k=0;k<4;k++)H.line(R,[H.p(2.02+k*.12,9.74,.95),H.p(2.04+k*.12,10.16,.95)],'paper',.6);
  for(const x of [1.25,6.95,11.05])bentTube(H,R,[[x,1.1,.05],[x,1.1,3.48]],3.4,'sun');
  bentTube(H,R,[[.7,1.12,3.48],[11.1,1.12,3.48]],2.7,'sun');
  for(const x of [1.75,4.2,6.4,9.4]){bentTube(H,R,[[x,1.2,3.5],[x,1.2,3.11]],1.6,'blue');oval(H,R,...H.p(x,1.2,3.02),8,11,'paper',.65);}
  metal(H,R,4.48,5.25,2.87,1.87,.035,.12,'blue');
  metal(H,R,5.52,5.68,.72,.72,.12,1.01,'teal');
  const [tx,ty]=H.p(5.9,6.1,1.15);oval(H,R,tx,ty+5,51,26,'blue',.8);oval(H,R,tx,ty,51,25,'sun',.61);
  for(const dx of [-31,31]){oval(H,R,tx+dx,ty,7,4,'blue',.72);oval(H,R,tx+dx,ty-1,5,3,'paper',1);}
  H.line(R,[[tx-27,ty+20],[tx-12,ty+22]],'paper',1.5);
  metal(H,R,4.7,6.7,.72,.2,.65,.25,'coral');
  const [hx,hy]=H.p(6.7,6.1,.91);stroke(H,R,[[hx,hy],[hx,hy+12],[hx+7,hy+15],[hx+9,hy+7]],'blue',1.4);H.line(R,[[hx+1,hy+11],[hx+6,hy+13]],'paper',2);
  satchel(H,R,5.75,6.05,.05);satchel(H,R,9.8,3.45,.07);
  drape(H,R,7.35,1.5,.9,.8,.95,.66,'teal');
  const [bx,by]=H.p(7.85,2.32,.76);shape(H,R,[[bx-9,by],[bx+10,by],[bx+7,by-5],[bx-5,by-5]],'paper',1,.5);shape(H,R,[[bx-4,by-5],[bx+6,by-5],[bx+4,by-10],[bx-2,by-10]],'coral',.6,.4);
  timber(H,R,9.1,8.45,2.22,1.7,.25,.11,'sun');
  for(const i of [9.23,11.06])bentTube(H,R,[[i,8.55,.04],[i,8.55,1.2],[i,9.82,1.21]],2.2,'teal');
  drape(H,R,9.5,8.65,.92,.85,.38,.15,'paper');
  const [ux,uy]=H.p(10.1,9.3,.4);stroke(H,R,[[ux,uy],[ux-18,uy-46],[ux-12,uy-50]],'blue',2);shape(H,R,[[ux-17,uy-46],[ux-11,uy-46],[ux+3,uy-2],[ux-1,uy]],'coral',.56,.7);
  bentTube(H,R,[[9.4,5.9,.06],[9.4,5.9,1.1],[10.5,6.4,1.45],[10.6,6.85,.07]],2.6,'blue');
  bentTube(H,R,[[9.25,6.15,.1],[10.73,6.8,1.35],[11,6.85,1.8]],2.6,'blue');
  for(const [i,j] of [[9.4,5.9],[10.6,6.85]])oval(H,R,...H.p(i,j,.1),5,7,'blue',.85);
  cushion(H,R,9.8,6.2,.45,.68,.6,.14,'coral');
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
