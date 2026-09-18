import { world, shape, oval, stroke, box, ell, mix, cycle } from '../../worlds/common.js';
import { surface, timber, metal, vessel, benchFrame, bentTube } from '../materials.js';
import { masonry, basin } from '../structure.js';
import { windowBay, hangingRail, floorShadow } from '../joinery.js';

const ease = (a,b,t) => { const u=Math.max(0,Math.min(1,(t-a)/(b-a))); return u*u*(3-2*u); };
const blend = (a,b,u) => a.map((v,n)=>mix(v,b[n],u));
function basket(H,R,i,j,z,w=1.8,d=1.2,h=.65) {
  const p=[H.p(i,j,z+h),H.p(i+w,j,z+h),H.p(i+w-.14,j+d,z),H.p(i+.14,j+d,z)];
  shape(H,R,p,'sun',.58,.8);
  H.clip(p,()=>{ for(let n=0;n<10;n++) H.line(R,[H.p(i+n*w/9,j,z+h),H.p(i+.14+n*(w-.28)/9,j+d,z)],'coral',.65,{tone:.7}); for(let n=0;n<5;n++) H.line(R,[blend(p[0],p[3],n/5),blend(p[1],p[2],n/5)],'paper',1,{tone:.8}); });
  const rim=[H.p(i,j,z+h),H.p(i+w,j,z+h),H.p(i+w,j+d,z+h),H.p(i,j+d,z+h)];
  surface(H,R,rim,'sun',.45); H.line(R,rim.concat([rim[0]]),'blue',2); H.line(R,rim.concat([rim[0]]),'sun',1);
  H.fill(H.tile(i+.12,j+.12,w-.24,d-.24,z+h+.01),'blue',.3);
}
function leaf(H,R,x,y,s=1,a=0,ink='teal') {
  const c=Math.cos(a),q=Math.sin(a),P=(u,v)=>[x+(u*c-v*q)*s,y+(u*q+v*c)*s];
  shape(H,R,[[0,0],[-8,-7],[-9,-19],[-3,-27],[4,-23],[10,-13],[6,-4]].map(p=>P(...p)),ink,.7,.65);
  stroke(H,R,[P(0,0),P(-1,-11),P(-3,-25)],'sun',.65,.8);
  for(let n=0;n<3;n++) H.line(R,[P(-1,-6-n*5),P(n%2?5:-6,-10-n*5)],'paper',.45,{tone:.55});
}
function greens(H,R,i,j,z,s=1) {
  const [x,y]=H.p(i,j,z);
  for(let n=0;n<7;n++) leaf(H,R,x+(n-3)*4*s,y-2*(n%2),s*(.7+(n%3)*.16),(n-3)*.22);
}
function cabbage(H,R,i,j,z,s=1) {
  const [x,y]=H.p(i,j,z); oval(H,R,x,y-7*s,11*s,9*s,'teal',.54);
  for(let k=0;k<4;k++) stroke(H,R,[[x-8*s+k*3*s,y-3*s],[x-10*s+k*4*s,y-10*s],[x-2*s+k*3*s,y-15*s],[x+5*s,y-6*s]],k%2?'paper':'blue',.65,.6);
}
function seller(H,R,x,y,left,right,look) {
  const s=1.5,P=(a,b)=>[x+a*s,y+b*s];
  H.tint(ell(x+2,y+2,20,6),'blue',.18);
  for(const side of [-1,1]) { stroke(H,R,[P(side*5,-26),P(side*6,-13),P(side*7,0)],'blue',8); oval(H,R,...P(side*7+2,0),7,3.5,'blue',.9); }
  shape(H,R,[[-9,-53],[8,-53],[10,-24],[-10,-24]].map(p=>P(...p)),'coral',.72);
  shape(H,R,[[-6,-45],[5,-45],[8,-26],[-8,-26]].map(p=>P(...p)),'paper',.92);
  oval(H,R,...P(look*2,-63),12,13.5,'coral',.35); shape(H,R,[[-9,-62],[-8,-71],[3,-75],[10,-68],[9,-64],[-3,-68]].map(p=>P(...p)),'blue',.82); H.dot(...P(5,-63),1.5,'blue');
  for(const [side,target] of [[-1,left],[1,right]]) { const shoulder=P(side*8,-49), elbow=[mix(shoulder[0],target[0],.47)+side*5,mix(shoulder[1],target[1],.47)+8]; stroke(H,R,[shoulder,elbow,target],'blue',8); stroke(H,R,[shoulder,elbow,target],'coral',6); oval(H,R,...target,3.7,3.3,'coral',.36); }
}
function crate(H,R,i,j,z,w,d,h,ink='coral') {
  floorShadow(H,i,j,w,d,.11); surface(H,R,H.tile(i,j,w,d,z),ink,.28);
  for(const x of [i,i+w-.1]) for(const y of [j,j+d-.1]) timber(H,R,x,y,.1,.1,z,h,ink);
  for(let k=0;k<3;k++) { timber(H,R,i,j+d-.08,w,.08,z+.12+k*h/3,.13,ink); timber(H,R,i+w-.08,j,.08,d,z+.12+k*h/3,.13,ink); }
}
function rack(H,R) {
  for(const x of [1.0,7.3]) { timber(H,R,x,1.9,.19,4.5,0,.16,'sun'); timber(H,R,x,1.9,.19,.19,0,2.3,'sun'); bentTube(H,R,[[x,2,2.1],[x,6.2,.75]],2,'blue'); }
  for(let level=2;level>=0;level--) { const j=2.0+(2-level)*1.35,z=.78+level*.65; timber(H,R,.95,j,6.6,1.27,z,.14,'sun'); timber(H,R,.95,j+1.19,6.6,.12,z+.14,.18,'coral');
    if(level===2) { for(let n=0;n<3;n++){basket(H,R,1.15+n*2.07,j+.13,z+.15,1.9,.83,.25); greens(H,R,2+n*2.07,j+.6,z+.42,.95);} }
    if(level===1) { for(let n=0;n<3;n++){basket(H,R,1.15+n*2.07,j+.1,z+.15,1.9,.88,.22); cabbage(H,R,1.7+n*2.07,j+.55,z+.4,.82); cabbage(H,R,2.35+n*2.07,j+.62,z+.42,.9);} }
    if(level===0) { basket(H,R,1.15,j+.15,z+.15,2.1,.82,.28); for(let n=0;n<8;n++){const p=H.p(1.35+n*.19,j+.5,z+.46); shape(H,R,[[p[0]-2,p[1]-10],[p[0]+2,p[1]-10],[p[0]+1,p[1]+5]],'coral',.9,.4); H.line(R,[[p[0],p[1]-10],[p[0]-3,p[1]-16]],'teal',1.3);} for(let n=0;n<3;n++){const p=H.p(4.1+n*.85,j+.65,z+.4); oval(H,R,p[0],p[1]-5,10,8,'sun',.7); stroke(H,R,[[p[0]-4,p[1]-10],[p[0]-3,p[1]+2]],'coral',.6);H.line(R,[[p[0],p[1]-12],[p[0]+2,p[1]-15]],'teal',2);} }
  }
  for(const x of [1.1,7.2]) for(const j of [3.1,4.45,5.85]) H.dot(...H.p(x,j,1.0+(5.85-j)*.5),1.5,'blue');
}
const room=world('cape-town-philippi-produce','The leaves stay above the rim',{wall:false,floor:'paper',tone:.5,head:30},(H,R)=>{
  masonry(H,R,'ne',0,12,0,3.7,'paper',.8); masonry(H,R,'nw',0,9,0,2.8,'teal',.25);
  windowBay(H,R,'ne',.8,5.0,2.45,.9,{divisions:4,ink:'teal',view:P=>{shape(H,R,[P(0,.1),P(5,.1),P(5,.7),P(0,.7)],'sun',.25,.3);}});
  for(let n=0;n<12;n++) { surface(H,R,H.tile(n,11.45,.92,.45,.025),n%2?'coral':'teal',.34,.5); }
  for(const x of [.55,8.0]) { timber(H,R,x,1.4,.18,.18,0,4.25,'teal'); bentTube(H,R,[[x,1.5,3.6],[x+.5,1.5,4.2]],2); }
  timber(H,R,.55,1.4,7.65,.17,4.15,.14,'teal');
  rack(H,R);
  for(const x of [8.4,11.6]) timber(H,R,x,.8,.16,3.5,0,.16,'sun');
  for(const x of [8.4,11.6]) for(const j of [.8,4.1]) timber(H,R,x,j,.15,.15,0,3.9,'teal');
  for(const z of [.3,1.4,2.65,3.75]) timber(H,R,8.4,.8,3.35,3.45,z,.12,'sun');
  surface(H,R,H.faceI(8.55,.85,3.03,.4,3.72),'blue',.28);
  for(let n=0;n<2;n++) { crate(H,R,8.65+n*1.5,1.15,1.53,1.25,1.65,.85); crate(H,R,8.65+n*1.5,1.25,2.77,1.25,1.65,.68,'teal'); }
  for(let n=0;n<4;n++) H.line(R,[H.p(8.6+n*.8,.85,.4),H.p(8.6+n*.8,.85,3.7)],'blue',1.2);
  metal(H,R,9,3.45,.45,.16,1.71,.35,'blue');
  bentTube(H,R,[[8.6,1,4.0],[11.8,1,4.0],[11.8,1,.7]],2.5);
  const cart=H.p(10,3.9,.3); for(const dx of [-17,17]) oval(H,R,cart[0]+dx,cart[1],5,7,'blue',.9); bentTube(H,R,[[9.2,3.5,.35],[10.7,3.5,.35],[10.7,3.5,1.25],[10.7,4.0,1.45]],2.5);
  benchFrame(H,R,3.0,6.7,4.0,1.65,1.18,'sun');
  for(const i of [3.45,6.2]) timber(H,R,i,6.8,.18,1.45,1.18,.12,'blue');
  metal(H,R,3.45,6.85,2.9,1.24,1.32,.5,'teal'); surface(H,R,H.tile(3.6,6.96,2.6,1.0,1.825),'blue',.5); greens(H,R,4.35,7.45,1.83,.9); greens(H,R,5.55,7.35,1.83,.8);
  for(const x of [3.33,6.42]) bentTube(H,R,[[x,7.12,1.7],[x,7.12,2.0],[x,7.63,2.0],[x,7.63,1.7]],1.7,'paper');
  H.line(R,[H.p(6.65,7.8,1.7),H.p(6.8,7.8,1.95),H.p(7.0,7.8,1.95)],'blue',2.4);
  const repair=H.p(1.22,5.42,1.07); stroke(H,R,[[repair[0]-4,repair[1]-5],[repair[0]+5,repair[1]+5],[repair[0]+7,repair[1]-3],[repair[0]-2,repair[1]+5]],'blue',1.1);
  basket(H,R,1.0,8.4,0,1.55,1.1,.65); basket(H,R,.75,7.5,1.2,.65,.5,.36); bentTube(H,R,[[.85,7.7,1.5],[.85,7.7,2.0],[1.25,7.7,2.0],[1.25,7.7,1.5]],1.5,'sun');
  benchFrame(H,R,.6,10.0,1.4,1.0,.66,'coral'); oval(H,R,...H.p(1.3,10.5,.7),11,5,'paper',1);
  benchFrame(H,R,9.1,6.7,2.4,1.65,1.05,'teal'); basin(H,R,9.3,6.9,1.8,1.15,1.06); vessel(H,R,11.05,8.7,0,10,24,'paper');
  basket(H,R,9.2,9.45,0,1.65,1.15,.4); const pad=H.tile(10.3,2.35,1.0,.5,2.9); surface(H,R,pad,'paper',1); oval(H,R,...H.p(10.8,2.6,2.99),8,6,'sun',.65);
  hangingRail(H,R,'nw',4.5,2.4,2.6,3,(P,u,n)=>{ if(n===0){const p=P(u,-.25); oval(H,R,p[0],p[1],6,4,'sun',.6);for(let k=0;k<4;k++)H.line(R,[[p[0]-4+k*2,p[1]-4],[p[0]-4+k*2,p[1]+4]],'blue',.5);}else shape(H,R,[P(u-.18,-.15),P(u+.18,-.15),P(u+.24,-.8),P(u-.2,-.75)],n===1?'paper':'coral',.5,.6); });
  const [lx,ly]=H.p(.75,4.9,2.55); leaf(H,R,lx,ly,.35,-.7,'sun');
  floorShadow(H,2.7,6.65,4.8,2.2,.1);
},(H,R,t)=>{
  const u=cycle(t,22)*22,lift=ease(.7,4.4,u)*(1-ease(16.5,20,u)),spread=ease(4.4,8.8,u)*(1-ease(13.2,16.5,u));
  const hook=H.p(6.9,7.8,1.94),center=H.p(4.9,7.45,2.75),p=blend(hook,center,lift),w=mix(7,40,spread),h=mix(15,11,spread);
  const canopy=[H.p(.45,1.35,4.3),H.p(8.2,1.35,4.3),H.p(8.2,2.5,4.0),H.p(.45,2.5,4.0)];
  surface(H,R,canopy,'paper',.94,.8); for(let n=0;n<6;n++) { const a=blend(canopy[0],canopy[1],n/6),b=blend(canopy[3],canopy[2],n/6);H.line(R,[a,b],n%2?'sun':'teal',6,{tone:.25}); }
  const flap=canopy[3].map((v,n)=>v+(n===1?5+Math.sin(t*2*Math.PI/22)*2:0)); H.line(R,[flap,[canopy[2][0],flap[1]+canopy[2][1]-canopy[3][1]]],'blue',1.3);
  const mesh=[[p[0]-w,p[1]],[p[0]+w,p[1]-h],[p[0]+w*.83,p[1]+h],[p[0]-w*.8,p[1]+h+5]];
  H.fill(mesh,'paper',.24); H.outline(R,mesh,'blue',1,{tone:.6}); H.clip(mesh,()=>{ for(let k=-9;k<11;k++) { H.line(R,[[p[0]+k*6-30,p[1]-30],[p[0]+k*6+30,p[1]+35]],'teal',.5,{tone:.5});H.line(R,[[p[0]+k*6+30,p[1]-30],[p[0]+k*6-30,p[1]+35]],'teal',.5,{tone:.5}); }});
  const patch=[blend(mesh[1],mesh[2],.42),blend(mesh[1],mesh[2],.72),[p[0]+w*.5,p[1]+h*.6],[p[0]+w*.53,p[1]]]; H.outline(R,patch,'coral',1.3); H.line(R,[mesh[0],mesh[1]],'paper',1.2);
  const body=H.p(6.65,6.75,0); seller(H,R,body[0],body[1],mesh[1],mesh[2],ease(9,11,u)*(1-ease(12,13.2,u)));
});
room.loopSeconds=22;
room.stillTime=10.8;
export default room;
