import { world, shape, oval, stroke, box, ell, mix, cycle } from '../../worlds/common.js';
import { surface, timber, metal, benchFrame, bentTube } from '../materials.js';
import { masonry, archedBay } from '../structure.js';
import { wallRack, hangingRail, floorShadow, taskLight } from '../joinery.js';
const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
const blend=(a,b,t)=>a.map((v,n)=>mix(v,b[n],t));
function wheel(H,R,i,j,z,r=.96){
  const ring=radius=>Array.from({length:40},(_,n)=>H.p(i+radius*Math.cos(n*Math.PI/20),j,z+radius*Math.sin(n*Math.PI/20)));
  H.outline(R,ring(r),'blue',6);H.outline(R,ring(r-.09),'paper',1.4);H.outline(R,ring(r-.14),'blue',1);
  for(let n=0;n<18;n++)H.line(R,[H.p(i,j,z),H.p(i+(r-.14)*Math.cos(n*Math.PI/9),j,z+(r-.14)*Math.sin(n*Math.PI/9))],'blue',.55,{tone:.6});
  oval(H,R,...H.p(i,j,z),4,3,'sun',.85);
}
function frame(H,R){
  const j=5.9,P=(i,z)=>H.p(i,j,z),tube=pts=>{H.line(R,pts.map(p=>P(...p)),'blue',5);H.line(R,pts.map(p=>{const q=P(...p);return[q[0]-1,q[1]-1]}),'teal',2.5);};
  wheel(H,R,3,j,1.02);wheel(H,R,8.6,j,1.02);
  tube([[3,1.02],[5.5,.86],[4.5,2.24],[3,1.02]]);tube([[4.5,2.24],[7.55,2.16],[5.5,.86]]);tube([[7.55,2.16],[8.6,1.02]]);tube([[7.65,2.18],[7.9,2.8],[8.5,2.82]]);
  H.line(R,[P(8.1,2.85),H.p(8.1,6.3,2.85)],'blue',4);H.line(R,[P(4.5,2.24),P(4.4,2.54)],'blue',3);shape(H,R,[P(4.02,2.52),P(4.65,2.52),P(4.88,2.65),P(4.16,2.7)],'coral',.8);
  const crank=P(5.5,.86);oval(H,R,...crank,9,7,'paper',1);oval(H,R,...crank,6,4,'blue',.55);H.line(R,[crank,[crank[0]+13,crank[1]+7]],'blue',2);H.line(R,[[crank[0]+9,crank[1]+7],[crank[0]+18,crank[1]+7]],'coral',3);
  H.line(R,[P(3,1.02),P(5.5,1.06),P(5.5,.67),P(3,.9)],'blue',.8);
  for(const i of [2.6,4.0])bentTube(H,R,[[3,5.9,1.02],[i,5.1,1.88],[i,6.8,1.88]],2,'blue');
  metal(H,R,1.65,5.02,3.45,1.9,1.86,.1,'blue');
  bentTube(H,R,[[5.35,5.9,.8],[5.25,6.5,.06],[5.95,6.5,.06]],2.5,'blue');
  metal(H,R,2.45,5.5,.38,.4,0,.2,'teal');metal(H,R,8.55,5.5,.35,.4,0,.2,'teal');
  metal(H,R,1.45,6.4,.2,.4,1.8,.17,'teal');box(H,R,1.39,6.43,.16,.3,1.9,.21,'coral',.9);H.line(R,[P(7.85,2.7),P(7.65,1.8),P(8.6,1.14)],'blue',.7);
}
function courier(H,R,x,y,left,right,look) {
  const s=1.5,P=(a,b)=>[x+a*s,y+b*s];
  H.tint(ell(x+2,y+2,20,6),'blue',.18);
  for(const side of [-1,1]) { stroke(H,R,[P(side*5,-26),P(side*6,-13),P(side*7,0)],'blue',8); oval(H,R,...P(side*7+2,0),7,3.5,'blue',.9); }
  shape(H,R,[[-9,-53],[8,-53],[10,-24],[-10,-24]].map(p=>P(...p)),'teal',.72);
  shape(H,R,[[-6,-45],[5,-45],[8,-26],[-8,-26]].map(p=>P(...p)),'paper',.92);
  oval(H,R,...P(look*2,-63),12,13.5,'coral',.35); shape(H,R,[[-9,-62],[-8,-71],[3,-75],[10,-68],[9,-64],[-3,-68]].map(p=>P(...p)),'blue',.82); H.dot(...P(5,-63),1.5,'blue');
  for(const [side,target] of [[-1,left],[1,right]]) { const shoulder=P(side*8,-49), elbow=[mix(shoulder[0],target[0],.47)+side*5,mix(shoulder[1],target[1],.47)+8]; stroke(H,R,[shoulder,elbow,target],'blue',8); stroke(H,R,[shoulder,elbow,target],'teal',6); oval(H,R,...target,3.7,3.3,'coral',.36); }
}
const room=world('cape-town-delivery-bicycle','The carrier closes flat',{wall:false,floor:'paper',tone:.7,head:45},(H,R)=>{
  masonry(H,R,'nw',0,11.7,0,4.4,'paper',.85);masonry(H,R,'ne',0,12,0,4.2,'coral',.23);
  archedBay(H,R,'nw',1.0,7.3,.25,3.5,'teal',P=>{surface(H,R,[P(0,0),P(7.3,0),P(7.3,4.3),P(0,4.3)],'sun',.16);for(let n=0;n<7;n++)surface(H,R,[P(n,.05),P(n+.6,.05),P(n+.6,1.2+n%3*.45),P(n,1.2+n%3*.45)],'teal',.17,.5);});
  for(let n=0;n<10;n++)surface(H,R,H.tile(.3+n*1.12,10.8,1,.84,.03),'teal',n%2?.13:.22,.5);
  for(let j=1;j<11;j+=2.0)H.line(R,[H.p(0,j,.01),H.p(12,j,.01)],'blue',.6,{tone:.3});
  for(let n=0;n<4;n++) {const x=8.2+n*.75;H.line(R,[H.p(x,.22,3.7),H.p(x,.22,4.0)],'blue',3);}
  wallRack(H,R,'ne',6.5,5,1.2,2.3,3,'teal',(P,z,row)=>{for(let n=0;n<3;n++){const x=.3+n*1.5,h=.35+(n%2)*.13;shape(H,R,[P(x,z+.05),P(x+1.2,z+.05),P(x+1.2,z+h),P(x,z+h)],row===1?'sun':'paper',row===1?.52:1,.7);H.line(R,[P(x+.6,z+.05),P(x+.6,z+h)],'coral',1.2);H.line(R,[P(x,z+.15),P(x+1.2,z+.15)],'teal',1);}});
  benchFrame(H,R,7.4,.8,4,1.65,1.0,'sun');for(let n=0;n<3;n++){box(H,R,7.7+n*1.1,1,.92,1.1,.35,.44,'teal',.6);H.line(R,[H.p(7.97+n*1.1,2.14,.62),H.p(8.4+n*1.1,2.14,.62)],'sun',2);}
  hangingRail(H,R,'ne',1.0,4.8,3.4,4,(P,u,n)=>{if(n===0){const p=P(u,-.32);oval(H,R,p[0],p[1],13,9,'sun',.65);for(let k=0;k<4;k++)stroke(H,R,[[p[0]-9+k*5,p[1]+4],[p[0]-6+k*4,p[1]-7]],'blue',.65);}else if(n===1){H.line(R,[P(u,-.2),P(u,-1.4)],'blue',4);H.line(R,[P(u-.15,-.2),P(u+.15,-.2)],'coral',3);}else{shape(H,R,[P(u-.28,-.2),P(u+.27,-.2),P(u+.35,-.94),P(u-.32,-.95)],n===2?'coral':'teal',.47,.7);for(let k=0;k<3;k++)H.line(R,[P(u-.2+k*.18,-.3),P(u-.2+k*.18,-.8)],'paper',.7);}});
  const toy=H.p(5.3,.45,3.67);for(const x of [-11,11])oval(H,R,toy[0]+x,toy[1],6,6,'sun',.5);H.line(R,[[toy[0]-11,toy[1]],[toy[0]-3,toy[1]-11],[toy[0]+4,toy[1]],[toy[0]-11,toy[1]],[toy[0]+9,toy[1]-10],[toy[0]+11,toy[1]]],'coral',1.5);timber(H,R,4.6,.3,1.5,.55,3.45,.1,'sun');
  floorShadow(H,1.55,5.2,8.1,2.1,.18);frame(H,R);
  benchFrame(H,R,1.0,9,2.8,1.35,.56,'sun');surface(H,R,H.tile(1.12,9.12,1.5,.98,.57),'coral',.3);for(let n=0;n<3;n++)H.line(R,[H.p(1.3+n*.35,9.15,.6),H.p(1.3+n*.35,10.0,.6)],'paper',1);for(const i of [2.9,3.36]){const p=H.p(i,9.5,.6);shape(H,R,[[p[0]-5,p[1]-3],[p[0]+5,p[1]-3],[p[0]+5,p[1]+3],[p[0]-5,p[1]+3]],'blue',.6);H.line(R,[[p[0],p[1]-3],[p[0],p[1]+3]],i===2.9?'coral':'sun',1.1);}
  const mini=H.p(2.7,9.8,.7);shape(H,R,[[mini[0]-10,mini[1]],[mini[0],mini[1]-5],[mini[0]+10,mini[1]],[mini[0],mini[1]+5]],'sun',.65);H.line(R,[[mini[0]-10,mini[1]],[mini[0]-10,mini[1]-7],[mini[0],mini[1]-12],[mini[0],mini[1]-5]],'coral',1.5);
  benchFrame(H,R,9.6,8.3,1.45,1.1,.6,'coral');box(H,R,10.05,8.5,.36,.36,.61,.8,'teal',.64);const clip=H.p(10.75,8.8,.62);H.outline(R,ell(clip[0],clip[1],5,4),'blue',1.5);H.line(R,[H.p(9.65,9.05,.7),H.p(10.0,9.05,.7)],'sun',3);
  taskLight(H,R,10.0,1.7,1.05,'coral',.8);bentTube(H,R,[[1,.15,4.37],[11.8,.15,4.37],[11.8,.15,3.9]],2.5,'teal');
},(H,R,t)=>{
  const u=cycle(t,16)*16,open=ease(3.2,6.4,u)*(1-ease(10.5,14,u)),angle=open*Math.PI/2;
  const i=1.8,j=5.1,w=3.05,d=1.66,z=2.0,h=.83;
  surface(H,R,H.tile(i,j,w,d,z),'coral',.23);for(let n=0;n<7;n++)H.line(R,[H.p(i+.1+n*.42,j+.1,z+.015),H.p(i+.1+n*.42,j+d-.1,z+.015)],'paper',1.1);H.line(R,[H.p(i,j+d*.5,z+.02),H.p(i+w,j+d*.5,z+.02)],'teal',1);
  const panels=[];for(const [edge,sign] of [[j,-1],[j+d,1]]){const outside=edge+sign*h*Math.cos(angle);panels.push([H.p(i,edge,z),H.p(i+w,edge,z),H.p(i+w,outside,z+h*Math.sin(angle)),H.p(i,outside,z+h*Math.sin(angle))]);}
  for(const p of panels){surface(H,R,p,'sun',.65);for(let n=1;n<5;n++)H.line(R,[blend(p[0],p[1],n/5),blend(p[3],p[2],n/5)],'coral',.65);H.line(R,[p[3],p[2]],'paper',1.3);for(const k of [.18,.8])H.line(R,[blend(p[0],p[1],k),blend(p[3],p[2],k)],'blue',1);}
  for(const [edge,sign]of[[i,-1],[i+w,1]]){const out=edge+sign*h*Math.cos(angle),p=[H.p(edge,j,z+.03),H.p(edge,j+d,z+.03),H.p(out,j+d,z+h*Math.sin(angle)+.03),H.p(out,j,z+h*Math.sin(angle)+.03)];surface(H,R,p,'sun',.55);H.line(R,[p[3],p[2]],'paper',1.4);}
  for(const x of [2.1,3.9])metal(H,R,x,6.65,.18,.18,1.98,.11,x===2.1?'coral':'blue');
  const latch=H.p(i+w,j+d,z+h*Math.sin(angle));H.line(R,[latch,[latch[0]+6,latch[1]+(open>.94?5:-4)]],'blue',2);H.dot(...latch,2.2,'sun');
  const body=H.p(5.0,6.45,0);courier(H,R,...body,panels[1][2],latch,open);
  const grip=H.p(8.1,6.3,2.85),helper=H.p(8.2,4.9,0);courier(H,R,...helper,grip,[grip[0]+11,grip[1]+2],open*.4);
  const strap=[H.p(1.75,6.3,2),H.p(2.7,6.95,1.85+open*.4),H.p(3.8,6.9,1.92)];stroke(H,R,strap,'coral',4);stroke(H,R,strap,'sun',.9,.75);
});
room.loopSeconds=16;
room.stillTime=8.0;
export default room;
