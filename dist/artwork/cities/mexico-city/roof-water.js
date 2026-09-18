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
  for(const j of [3.1,7.75,10.75]){
    surface(H,R,H.faceJ(.13,j,.63,.18,.97),'blue',.5,.8);
    surface(H,R,H.faceJ(.16,j+.08,.47,.3,.85),'teal',.28,.6);
    H.line(R,[H.p(.18,j+.17,.45),H.p(.18,j+.48,.45)],'sun',2);
  }
  for(const j of [1.35,6.93,10.8])H.line(R,[H.p(.48,j,.02),H.p(1.18,j,.02),H.p(1.4,j+.18,.02)],'blue',.65,{tone:.32});
  const drain=H.tile(.68,10.3,1.14,1.04,.035);surface(H,R,drain,'blue',.6,.9);for(let n=0;n<7;n++)H.line(R,[H.p(.8+n*.14,10.39,.05),H.p(.8+n*.14,11.23,.05)],'paper',1.1);
  bentTube(H,R,[[.4,8.08,.61],[1.13,8.08,.61],[1.13,8.08,.28]],3.5,'teal');
  const tap=H.p(.83,8.08,.72);H.line(R,[[tap[0]-6,tap[1]],[tap[0]+6,tap[1]]],'coral',2.5);H.dot(...tap,2,'sun');
  floorShadow(H,1.45,1.6,4.7,4.7,.23);
  box(H,R,1.75,1.65,4.1,4.0,.03,.35,'paper',.8);
  for(const i of [2,5.15])for(const j of [1.9,4.9])metal(H,R,i,j,.4,.35,.03,.26,'blue');
  for(const j of [1.78,5.42]){
    surface(H,R,H.faceI(1.88,j,3.83,.09,.31),'teal',.28,.7);
    for(const x of [2.14,3.73,5.28])H.dot(...H.p(x,j+.02,.19),1.3,'blue');
  }
  surface(H,R,H.tile(1.55,5.78,4.7,.42,.035),'blue',.38,.7);for(let n=0;n<19;n++)H.line(R,[H.p(1.68+n*.23,5.83,.05),H.p(1.68+n*.23,6.11,.05)],'paper',.8);
  const c=H.p(3.78,3.6,.39),top=H.p(3.78,3.6,3.18),rx=86,ry=42;
  const shell=[[c[0]-rx,c[1]],[c[0]-rx,top[1]],[c[0]+rx,top[1]],[c[0]+rx,c[1]],...ell(c[0],c[1],rx,ry,48).filter(p=>p[1]>=c[1]).reverse()];
  surface(H,R,shell,'blue',.77,1.1);
  H.clip(shell,()=>{for(const dx of [-63,-56,-49])H.line(R,[[c[0]+dx,top[1]+9],[c[0]+dx,c[1]+22]],'paper',dx===-56?2.2:.8,{tone:.74});H.tint([[c[0]+25,top[1]],[c[0]+rx,top[1]],[c[0]+rx,c[1]+ry],[c[0]+25,c[1]+ry]],'teal',.25);});
  for(const z of [.59,1.26,1.95,2.61]){const e=disc(H,3.78,3.6,1.9,z);H.line(R,e.filter(p=>p[1]>=H.p(3.78,3.6,z)[1]),'teal',2.3,{tone:.75});}
  surface(H,R,ell(top[0],top[1],rx,ry),'teal',.56,1.1);
  surface(H,R,ell(top[0],top[1]-2,rx-6,ry-5),'blue',.64,.8);
  for(let n=0;n<16;n++){const a=n*Math.PI/8,x=top[0]+Math.cos(a)*(rx-9),y=top[1]+Math.sin(a)*(ry-6);H.line(R,[[x,y],[top[0]+Math.cos(a)*(rx-18),top[1]+Math.sin(a)*(ry-14)]],'teal',1.5);}
  for(const z of [.71,2.51]){
    const p=H.p(5.12,4.85,z);surface(H,R,[[p[0]-7,p[1]-5],[p[0]+7,p[1]-5],[p[0]+7,p[1]+5],[p[0]-7,p[1]+5]],'teal',.6,.7);H.dot(p[0]-3,p[1],1.1,'sun');H.dot(p[0]+3,p[1],1.1,'sun');
  }

  const lid=H.p(3.78,3.6,3.27);surface(H,R,ell(lid[0],lid[1],31,15),'paper',1,.8);surface(H,R,ell(lid[0],lid[1]-5,30,14),'teal',.7,.8);
  bentTube(H,R,[[3.52,3.64,3.29],[3.52,3.64,3.44],[3.97,3.64,3.44],[3.97,3.64,3.29]],2,'blue');
  for(let n=0;n<8;n++){const a=n*Math.PI/4;H.dot(lid[0]+Math.cos(a)*26,lid[1]-5+Math.sin(a)*11,1.1,'sun');}
  for(const i of [1.48,2.12])bentTube(H,R,[[i,4.65,.12],[i,4.47,3.38],[i,4.12,3.58]],3,'blue');
  for(let z=.3;z<3.3;z+=.4){H.line(R,[H.p(1.48,4.65-z*.053,z),H.p(2.12,4.65-z*.053,z)],'blue',3);H.line(R,[H.p(1.5,4.65-z*.053,z+.015),H.p(2.1,4.65-z*.053,z+.015)],z<1.6?'paper':'teal',1.4);}
  for(const z of [.52,2.6])bentTube(H,R,[[1.65,4.58,z],[2.45,4.1,z]],2,'blue');
  bentTube(H,R,[[5.12,3.55,2.87],[6.15,3.55,2.87],[6.15,3.55,.62],[6.15,4.3,.62]],6,'teal');
  for(const z of [1.2,2.3])metal(H,R,5.94,3.39,.43,.3,z,.16,'blue');
  for(const i of [5.32,7.91])for(const j of [4.45,6.78])metal(H,R,i,j,.21,.22,.03,.27,'blue');
  for(let n=0;n<7;n++)timber(H,R,5.3,4.39+n*.38,2.94,.33,.29,.15,'sun');
  for(const x of [5.51,7.92])for(const j of [4.58,6.63])H.dot(...H.p(x,j,.45),1.4,'blue');
  timber(H,R,5.31,6.88,2.9,.55,.03,.14,'teal');
  metal(H,R,6.0,4.56,.48,.68,.45,.1,'blue');
  for(const x of [5.93,7.74])bentTube(H,R,[[x,4.6,.46],[x,4.6,.86],[x,5.15,.86]],1.7,'teal');

  bentTube(H,R,[[6.55,5.55,.39],[6.55,5.55,.95],[6.2,5.1,1.02]],5,'teal');
  const inlet=H.p(6.55,5.55,1.0);ring(H,R,...inlet,21,10,'blue');H.line(R,[[inlet[0]+13,inlet[1]-5],[inlet[0]+18,inlet[1]-9]],'sun',2.2);
  cabinetFrame(H,R,8.6,2.2,2.66,1.3,.28,2.6,2,'teal',(x,y,w,d,z,h,n)=>{
    for(const zz of [.66,1.44,2.1])timber(H,R,x,y,w,d,z+zz,.08,'sun');
    if(n===0){for(let k=0;k<3;k++){const p=H.p(x+.26+k*.24,y+.46,z+.22);ring(H,R,...p,5,3,'blue');}drape(H,R,x+.08,y+.07,w-.17,d-.13,z+.75,.29,'paper');const p=H.p(x+.5,y+.6,z+1.62);for(let k=0;k<4;k++)H.outline(R,ell(...p,10+k*2,7+k*1.4),'blue',1.5);}else{for(let k=0;k<3;k++){const p=H.p(x+.21+k*.27,y+.6,z+.08);vessel(H,R,x+.21+k*.27,y+.6,z+.08,4,12+k*6,'teal',false);}for(let k=0;k<3;k++)H.line(R,[H.p(x+.2+k*.26,y+.7,z+.75),H.p(x+.2+k*.26,y+.7,z+1.23)],'blue',2);box(H,R,x+.12,y+.2,w-.24,.6,z+1.57,.38,'coral',.5);}
  });
  metal(H,R,8.45,2.03,2.96,1.67,3.0,.1,'blue');taskLight(H,R,8.4,3.1,2.94,'sun',-.55);
  for(const i of [2.21,6.9])for(const j of [8.43,9.9])metal(H,R,i,j,.15,.15,.025,.77,'teal');
  timber(H,R,2.23,8.46,4.84,1.61,.24,.1,'teal');
  for(const i of [2.25,3.9,5.64,7.0])timber(H,R,i,8.45,.12,1.59,.34,.43,'teal');
  for(let n=0;n<3;n++){
    const p=H.p(2.63+n*.35,9.41,.44);surface(H,R,ell(...p,6,3),'paper',1,.6);H.line(R,[[p[0]-6,p[1]],[p[0]-6,p[1]-17]],'teal',1.4);H.line(R,[[p[0]+6,p[1]],[p[0]+6,p[1]-17]],'teal',1.4);oval(H,R,p[0],p[1]-17,6,3,'teal',.45);
  }
  box(H,R,4.08,8.69,1.35,1.03,.35,.3,'coral',.5);const handle=H.p(4.74,9.73,.51);H.line(R,[[handle[0]-7,handle[1]],[handle[0]+7,handle[1]]],'blue',2);
  drape(H,R,5.81,8.57,1.0,1.15,.35,.3,'paper');
  timber(H,R,2.1,8.3,5.13,1.93,.8,.14,'sun');
  const mesh=H.tile(2.28,8.52,1.03,1.27,.96);surface(H,R,mesh,'paper',1,.7);H.hatch(R,mesh,'blue',3,.45,.55);H.hatch(R,mesh,'blue',3,-.45,.55);for(const j of [8.53,9.71])metal(H,R,2.26,j,1.08,.075,.96,.035,'teal');
  const old=H.p(3.82,9.41,.99);ring(H,R,...old,15,9,'coral');H.line(R,[[old[0]-9,old[1]+4],[old[0]+10,old[1]-5]],'blue',3);H.line(R,[[old[0]-6,old[1]+5],[old[0]+12,old[1]-4]],'sun',1.1);
  vessel(H,R,4.84,9.36,.96,9,21,'teal',true);
  H.line(R,[H.p(5.65,9.24,.97),H.p(6.6,9.24,.97)],'sun',3.7);for(let n=0;n<7;n++)H.line(R,[H.p(6.29+n*.065,9.1,.98),H.p(6.29+n*.065,9.52,.98)],'blue',1.1);
  const rag=H.tile(5.37,8.61,1.19,.4,.96);surface(H,R,rag,'paper',1,.6);for(let n=0;n<4;n++)H.line(R,[H.p(5.49+n*.26,8.65,.98),H.p(5.49+n*.26,8.96,.98)],'coral',.7);
  bentTube(H,R,[[2.14,8.34,.14],[2.14,8.34,1.19],[2.14,9.74,1.19]],1.8,'blue');
  for(let n=0;n<3;n++){const p=H.p(2.18,8.59+n*.38,1.16);H.outline(R,ell(p[0],p[1]+8,5,8),'blue',1.3);}
  surface(H,R,H.tile(6.18,10.58,1.83,.8,.04),'coral',.5,.8);
  const tool=H.p(7.02,10.9,.08);H.line(R,[[tool[0]-18,tool[1]-7],[tool[0]+8,tool[1]+6]],'blue',3);H.line(R,[[tool[0]+8,tool[1]+6],[tool[0]+15,tool[1]+3],[tool[0]+11,tool[1]-1]],'blue',2);for(let n=0;n<3;n++)ring(H,R,tool[0]-10+n*12,tool[1]-10,4,2,'teal');
  const hose=H.p(1.1,7.11,.57);for(let n=0;n<5;n++)H.outline(R,ell(hose[0]+n*1.3,hose[1]-n*.5,18-n,12-n*.5),'teal',2.6);bentTube(H,R,[[.58,6.64,.38],[.58,6.64,1.14],[1.32,6.64,1.14],[1.32,6.64,.38]],2.2,'blue');
  caneChair(H,R,9.35,8.3,'sun');vessel(H,R,10.95,9.8,0,13,18,'coral',true);
  box(H,R,9.1,10.2,1.4,.85,.02,.43,'teal',.4);
  for(const j of [10.26,10.94])timber(H,R,9.17,j,1.27,.08,.08,.29,'sun');
  const pan=H.p(9.78,10.58,.45);oval(H,R,...pan,13,7,'blue',.65);oval(H,R,pan[0],pan[1]-2,10,5,'paper',1);H.line(R,[[pan[0]-8,pan[1]],[pan[0]-17,pan[1]-8]],'sun',2);
  for(const j of [7.7,8.15,8.6]){const p=H.p(11.37,j,.3);surface(H,R,ell(...p,5,3),'paper',1,.7);H.line(R,[[p[0]-5,p[1]],[p[0]-5,p[1]-19],[p[0]+5,p[1]-19],[p[0]+5,p[1]]],'teal',1.5);}
  timber(H,R,11.2,7.43,.51,1.82,.07,.13,'sun');

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
