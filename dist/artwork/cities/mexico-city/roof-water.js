import { world, shape, oval, stroke, box, ell, cycle } from '../../worlds/common.js';

import { surface, timber, metal, bentTube, benchFrame, vessel, drape, caneChair } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { recessedFrame, taskLight, floorShadow } from '../joinery.js';

const ease=(a,b,t)=>{const p=Math.max(0,Math.min(1,(t-a)/(b-a)));return p*p*(3-2*p);};
function disc(H,i,j,r,z){return Array.from({length:48},(_,n)=>{const a=n*Math.PI/24;return H.p(i+Math.cos(a)*r,j+Math.sin(a)*r,z);});}
function ring(H,R,x,y,rx,ry,ink='blue'){surface(H,R,ell(x,y,rx,ry),ink,.76,.8);surface(H,R,ell(x,y,rx*.74,ry*.72),'paper',1,.6);}
const room=world('mexico-city-roof-water','The lid keeps out the leaves',{wall:false,floor:'paper',tone:.91,head:55},(H,R)=>{
  for(let i=0;i<12;i+=1.5)for(let j=0;j<12;j+=1.5){surface(H,R,H.tile(i+.03,j+.03,1.44,1.44,.014),'paper',1,.4);if((i+j)%3===0)H.line(R,[H.p(i+.1,j+1.35,.02),H.p(i+.6,j+1.38,.02)],'sun',.75);}
  masonry(H,R,'nw',0,12,0,1.18,'paper',.91);masonry(H,R,'ne',0,12,0,1.28,'paper',.96);
  for(let j=0;j<12;j+=1.18)box(H,R,.0,j,.43,1.16,1.15,.12,'sun',.25);
  for(let i=0;i<12;i+=1.18)box(H,R,i,0,1.16,.43,1.25,.12,'sun',.28);
  masonry(H,R,'ne',8.25,3.55,1.3,2.82,'paper',.92);
  recessedFrame(H,R,'ne',8.63,2.65,.15,3.6,'teal',P=>{
    surface(H,R,[P(.15,.12),P(2.5,.12),P(2.5,3.42),P(.15,3.42)],'teal',.58,.7);
    for(let n=0;n<6;n++)H.line(R,[P(.35,2.9+n*.06),P(2.31,2.9+n*.06)],'blue',.8);
    H.line(R,[P(2.24,1.24),P(2.24,1.61)],'sun',2.3);
  });
  metal(H,R,8.4,.05,3.14,.88,3.88,.12,'blue');
  bentTube(H,R,[[10.9,.7,.03],[10.9,.7,3.67],[8.15,.7,3.67]],1.8,'blue');
  for(const x of [8.8,10,10.9])metal(H,R,x,.61,.11,.18,3.62,.12,'coral');
  const repair=H.faceJ(.02,4.6,2.1,.26,.78);surface(H,R,repair,'coral',.28,.5);
  bentTube(H,R,[[.42,2,.2],[.42,4.2,.2],[.75,4.5,.2],[.75,6.8,.2],[.42,7.1,.2],[.42,10.9,.2]],4,'teal');
  for(const j of [2.6,4.1,7.2,9.6])metal(H,R,.25,j,.45,.17,.17,.13,'blue');
  floorShadow(H,1.45,1.6,4.7,4.7,.23);
  box(H,R,1.75,1.65,4.1,4.0,.03,.35,'paper',.8);
  for(const i of [2,5.15])for(const j of [1.9,4.9])metal(H,R,i,j,.4,.35,.03,.26,'blue');
  const c=H.p(3.78,3.6,.39),top=H.p(3.78,3.6,3.18),rx=86,ry=42;
  const shell=[[c[0]-rx,c[1]],[c[0]-rx,top[1]],[c[0]+rx,top[1]],[c[0]+rx,c[1]],...ell(c[0],c[1],rx,ry,48).filter(p=>p[1]>=c[1]).reverse()];
  surface(H,R,shell,'blue',.77,1.1);
  H.clip(shell,()=>{for(const dx of [-63,-56,-49])H.line(R,[[c[0]+dx,top[1]+9],[c[0]+dx,c[1]+22]],'paper',dx===-56?2.2:.8,{tone:.74});H.tint([[c[0]+25,top[1]],[c[0]+rx,top[1]],[c[0]+rx,c[1]+ry],[c[0]+25,c[1]+ry]],'teal',.25);});
  for(const z of [.59,1.26,1.95,2.61]){const e=disc(H,3.78,3.6,1.9,z);H.line(R,e.filter(p=>p[1]>=H.p(3.78,3.6,z)[1]),'teal',2.3,{tone:.75});}
  surface(H,R,ell(top[0],top[1],rx,ry),'teal',.56,1.1);
  surface(H,R,ell(top[0],top[1]-2,rx-6,ry-5),'blue',.64,.8);
  const lid=H.p(3.78,3.6,3.27);surface(H,R,ell(lid[0],lid[1],31,15),'paper',1,.8);surface(H,R,ell(lid[0],lid[1]-5,30,14),'teal',.7,.8);
  bentTube(H,R,[[3.52,3.64,3.29],[3.52,3.64,3.44],[3.97,3.64,3.44],[3.97,3.64,3.29]],2,'blue');
  for(let n=0;n<8;n++){const a=n*Math.PI/4;H.dot(lid[0]+Math.cos(a)*26,lid[1]-5+Math.sin(a)*11,1.1,'sun');}
  for(const i of [1.48,2.12])bentTube(H,R,[[i,4.65,.12],[i,4.47,3.38],[i,4.12,3.58]],3,'blue');
  for(let z=.3;z<3.3;z+=.4){H.line(R,[H.p(1.48,4.65-z*.053,z),H.p(2.12,4.65-z*.053,z)],'blue',3);H.line(R,[H.p(1.5,4.65-z*.053,z+.015),H.p(2.1,4.65-z*.053,z+.015)],z<1.6?'paper':'teal',1.4);}
  for(const z of [.52,2.6])bentTube(H,R,[[1.65,4.58,z],[2.45,4.1,z]],2,'blue');
  bentTube(H,R,[[5.12,3.55,2.87],[6.15,3.55,2.87],[6.15,3.55,.62],[6.15,4.3,.62]],6,'teal');
  for(const z of [1.2,2.3])metal(H,R,5.94,3.39,.43,.3,z,.16,'blue');
  benchFrame(H,R,5.3,4.4,2.9,2.65,.34,'sun');
  bentTube(H,R,[[6.55,5.55,.39],[6.55,5.55,.95],[6.2,5.1,1.02]],5,'teal');
  const inlet=H.p(6.55,5.55,1.0);ring(H,R,...inlet,21,10,'blue');H.line(R,[[inlet[0]+13,inlet[1]-5],[inlet[0]+18,inlet[1]-9]],'sun',2.2);
  cabinetFrame(H,R,8.6,2.2,2.66,1.3,.28,2.6,2,'teal',(x,y,w,d,z,h,n)=>{
    for(const zz of [.66,1.44,2.1])timber(H,R,x,y,w,d,z+zz,.08,'sun');
    if(n===0){for(let k=0;k<3;k++){const p=H.p(x+.26+k*.24,y+.46,z+.22);ring(H,R,...p,5,3,'blue');}drape(H,R,x+.08,y+.07,w-.17,d-.13,z+.75,.29,'paper');const p=H.p(x+.5,y+.6,z+1.62);for(let k=0;k<4;k++)H.outline(R,ell(...p,10+k*2,7+k*1.4),'blue',1.5);}else{for(let k=0;k<3;k++){const p=H.p(x+.21+k*.27,y+.6,z+.08);vessel(H,R,x+.21+k*.27,y+.6,z+.08,4,12+k*6,'teal',false);}for(let k=0;k<3;k++)H.line(R,[H.p(x+.2+k*.26,y+.7,z+.75),H.p(x+.2+k*.26,y+.7,z+1.23)],'blue',2);box(H,R,x+.12,y+.2,w-.24,.6,z+1.57,.38,'coral',.5);}
  });
  metal(H,R,8.45,2.03,2.96,1.67,3.0,.1,'blue');taskLight(H,R,8.4,3.1,2.94,'sun',-.55);
  benchFrame(H,R,2.5,8.8,4.7,1.1,.61,'teal');
  const mesh=H.tile(2.7,9,.8,.65,.63);surface(H,R,mesh,'paper',1,.6);H.hatch(R,mesh,'blue',3,.45,.55);H.hatch(R,mesh,'blue',3,-.45,.55);
  const old=H.p(4.1,9.45,.65);ring(H,R,...old,12,7,'coral');H.line(R,[[old[0]-7,old[1]+3],[old[0]+8,old[1]-4]],'blue',2.3);
  vessel(H,R,5.1,9.3,.65,7,16,'teal',true);
  H.line(R,[H.p(5.8,9.3,.65),H.p(6.5,9.3,.65)],'sun',3);for(let n=0;n<6;n++)H.line(R,[H.p(6.4+n*.06,9.2,.66),H.p(6.4+n*.06,9.48,.66)],'blue',.9);
  caneChair(H,R,9.35,8.3,'sun');vessel(H,R,10.95,9.8,0,13,18,'coral',true);
  box(H,R,9.1,10.2,1.4,.85,.02,.43,'teal',.4);
  const truck=H.p(10.96,1.3,.12);shape(H,R,[[truck[0]-12,truck[1]-7],[truck[0]+4,truck[1]-7],[truck[0]+4,truck[1]-14],[truck[0]+10,truck[1]-14],[truck[0]+14,truck[1]-7],[truck[0]+14,truck[1]]],'coral',.8,.6);for(const x of [-7,9])oval(H,R,truck[0]+x,truck[1],3,3,'blue',.85);
  bentTube(H,R,[[.24,1,1.3],[.24,1,4.1]],1.8,'blue');for(const z of [3.3,3.7,4])H.line(R,[H.p(.24,.5,z),H.p(.24,1.5,z)],'blue',1);
},(H,R,t)=>{
  const u=cycle(t,22)*22,f=ease(4.4,8.8,u)*(1-ease(13.2,20,u));
  const collar=H.p(6.55,5.55,1.015),lift=22*f,rot=Math.sin(ease(8.8,13.2,u)*Math.PI)*f*.45;
  const C=[collar[0]+f*5,collar[1]-lift],rx=20,ry=9+rot*17;
  const screen=ell(C[0],C[1],rx,ry);surface(H,R,screen,'paper',.85,.8);H.hatch(R,screen,'blue',4,.5,.65);H.hatch(R,screen,'blue',4,-.5,.65);H.outline(R,screen,'blue',2.1);H.line(R,[[C[0]+13,C[1]-ry*.65],[C[0]+18,C[1]-ry*.3],[C[0]+14,C[1]+1]],'coral',1.2);
  const foot=H.p(6.9,6.7,.35),hip=[foot[0]-2,foot[1]-27],chest=[hip[0]-4,hip[1]-24],head=[chest[0],chest[1]-14];
  for(const d of [-7,7]){H.line(R,[[hip[0]+d,hip[1]],[foot[0]+d,foot[1]-13],[foot[0]+d+3,foot[1]]],'blue',8);oval(H,R,foot[0]+d+3,foot[1],5,2,'blue',.9);}
  shape(H,R,[[chest[0]-9,chest[1]],[chest[0]+9,chest[1]],[hip[0]+10,hip[1]+2],[hip[0]-10,hip[1]+2]],'coral',.74);
  oval(H,R,...head,8,9,'coral',.42);shape(H,R,[[head[0]-8,head[1]-2],[head[0]-7,head[1]-10],[head[0]+5,head[1]-11],[head[0]+8,head[1]-4]],'blue',.85,.7);H.dot(head[0]-3,head[1]+1,1,'blue');
  for(const s of [-1,1]){const target=[C[0]+s*18,C[1]],shoulder=[chest[0]+s*8,chest[1]+3],elbow=[(shoulder[0]+target[0])/2+s*4,Math.max(shoulder[1],target[1])+9];H.line(R,[shoulder,elbow,target],'blue',6);H.line(R,[shoulder,elbow,target],'coral',4.1);oval(H,R,...target,2.6,2.5,'coral',.42);}
  const p=H.p(9.1,10.2,.47),s=Math.sin(u*Math.PI/11)*2;shape(H,R,[[p[0],p[1]],[p[0]+31,p[1]+15],[p[0]+27,p[1]+24+s],[p[0]-6,p[1]+6]],'paper',1,.6);H.line(R,[[p[0]+4,p[1]+3],[p[0]+22,p[1]+19+s]],'blue',.7);
  const q=H.p(10.5,3.57,1.5);stroke(H,R,[[q[0],q[1]],[q[0]+5+Math.sin(u*Math.PI/11)*1.4,q[1]+13],[q[0]+2,q[1]+22]],'blue',1.1);
});
room.loopSeconds=22;
room.stillTime=10.7;
export default room;
