import { world, shape, oval, stroke, box, ell, mix, cycle } from '../../worlds/common.js';
import { surface, timber, metal, vessel, benchFrame, bentTube, spokedWheel } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, hangingRail, floorShadow, taskLight } from '../joinery.js';
const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
const blend=(a,b,t)=>a.map((v,n)=>mix(v,b[n],t));
function tool(H,R,i,j,z,height,kind=0) {
  const a=H.p(i,j,z),b=H.p(i,j,z+height);
  stroke(H,R,[a,b],'blue',4); stroke(H,R,[[a[0]-1,a[1]],[b[0]-1,b[1]]],'sun',2.6);
  oval(H,R,b[0],b[1]-5,6,8,'sun',.6); oval(H,R,b[0],b[1]-5,3.6,5.5,'paper',1);
  if(kind===0){shape(H,R,[[a[0]-7,a[1]-8],[a[0]+7,a[1]-8],[a[0]+8,a[1]+8],[a[0],a[1]+14],[a[0]-8,a[1]+8]],'blue',.72);H.line(R,[[a[0]-5,a[1]+5],[a[0],a[1]+11],[a[0]+6,a[1]+6]],'paper',.7);}
  else {H.line(R,[[a[0]-9,a[1]],[a[0]+9,a[1]]],'blue',3);for(let n=0;n<4;n++)H.line(R,[[a[0]-8+n*5,a[1]],[a[0]-8+n*5,a[1]+12]],kind===2?'coral':'blue',2);}
  H.line(R,[[a[0]-2,a[1]-12],[a[0]+2,a[1]-12]],'paper',1.3);
}
function vice(H,R){
  metal(H,R,3.2,5.5,1.4,.72,1.4,.14,'blue');metal(H,R,3.35,5.55,.4,.58,1.54,.38,'teal');metal(H,R,4.1,5.55,.32,.58,1.54,.38,'teal');
  for(const i of [3.72,4.02])surface(H,R,H.faceJ(i,5.54,.65,1.65,1.91),'coral',.55);
  bentTube(H,R,[[3.78,5.8,1.66],[4.8,5.8,1.66]],2.4,'blue');bentTube(H,R,[[4.75,5.8,1.39],[4.75,5.8,1.94]],1.5,'sun');
  for(const z of [1.39,1.94])oval(H,R,...H.p(4.75,5.8,z),3,2,'blue',.8);
  for(const x of [3.28,4.5])H.dot(...H.p(x,6.08,1.55),1.8,'sun');
}
function gardener(H,R,x,y,left,right,look) {
  const s=1.5,P=(a,b)=>[x+a*s,y+b*s];
  H.tint(ell(x+2,y+2,20,6),'blue',.18);
  for(const side of [-1,1]) { stroke(H,R,[P(side*5,-26),P(side*6,-13),P(side*7,0)],'blue',8); oval(H,R,...P(side*7+2,0),7,3.5,'blue',.9); }
  shape(H,R,[[-9,-53],[8,-53],[10,-24],[-10,-24]].map(p=>P(...p)),'teal',.72);
  shape(H,R,[[-6,-45],[5,-45],[8,-26],[-8,-26]].map(p=>P(...p)),'paper',.92);
  oval(H,R,...P(look*2,-63),12,13.5,'coral',.35); shape(H,R,[[-9,-62],[-8,-71],[3,-75],[10,-68],[9,-64],[-3,-68]].map(p=>P(...p)),'blue',.82); H.dot(...P(5,-63),1.5,'blue');
  for(const [side,target] of [[-1,left],[1,right]]) { const shoulder=P(side*8,-49), elbow=[mix(shoulder[0],target[0],.47)+side*5,mix(shoulder[1],target[1],.47)+8]; stroke(H,R,[shoulder,elbow,target],'blue',8); stroke(H,R,[shoulder,elbow,target],'teal',6); oval(H,R,...target,3.7,3.3,'coral',.36); }
}
const room=world('cape-town-garden-tools','The handle fits the palm',{wall:false,floor:'paper',tone:.65,head:45},(H,R)=>{
  masonry(H,R,'ne',0,12,0,4.4,'teal',.28);masonry(H,R,'nw',0,10.8,0,3.3,'paper',.85);
  for(let i=0;i<12;i+=1.55)for(let j=0;j<12;j+=1.4)H.outline(R,H.tile(i+.06,j+.06,1.43,1.28,.018),'blue',.55,{tone:.35});
  const P=windowBay(H,R,'nw',1.0,5.0,1.4,1.7,{divisions:4,ink:'sun',view:Q=>{shape(H,R,[Q(.1,.1),Q(4.9,.1),Q(4.9,1.6),Q(.1,1.6)],'teal',.18); for(let n=0;n<5;n++)stroke(H,R,[Q(n,.1),Q(n+.6,.8),Q(n+.3,1.6)],'teal',2,.5);}});
  for(let n=0;n<8;n++){H.line(R,[P(n*.6,.12),P(n*.6+1,1.57)],'sun',2);H.line(R,[P(n*.6,1.55),P(n*.6+1,.12)],'sun',2);}
  for(const x of [.45,11.35])timber(H,R,x,.3,.2,.2,0,4.65,'sun');timber(H,R,.4,.3,11.2,.27,4.4,.25,'sun');
  bentTube(H,R,[[.3,.15,4.62],[11.6,.15,4.62],[11.6,.15,1.0]],3,'teal');
  for(const x of [1.0,10.75])bentTube(H,R,[[x,.6,3.75],[x+(.5*(x<5?1:-1)),.6,4.4]],2.4,'blue');
  for(const z of [1.4,2.6])timber(H,R,2.9,.22,4.9,.24,z,.15,'sun');
  for(let n=0;n<6;n++){const i=3.2+n*.75;tool(H,R,i,.7,.48,2.55+(n%3)*.25,n%3===0?1:0);const p=H.p(i,.75,2.65);stroke(H,R,[[p[0]-4,p[1]-2],[p[0],p[1]+4],[p[0]+4,p[1]-2]],'coral',2);}
  const hose=H.p(8.4,.65,3.5);for(let n=0;n<5;n++)H.outline(R,ell(hose[0],hose[1],17+n*2,23+n*2),'teal',2.3,{tone:.8});stroke(H,R,[[hose[0]+24,hose[1]],[hose[0]+26,hose[1]+35],[hose[0]+13,hose[1]+49]],'blue',2.8);H.line(R,[[hose[0]-4,hose[1]-29],[hose[0]+5,hose[1]-29]],'sun',5);
  metal(H,R,.48,5.4,1.0,2.2,.1,.6,'teal');surface(H,R,H.tile(.58,5.5,.8,2,.72),'blue',.42);for(let n=0;n<3;n++)vessel(H,R,.9,5.9+n*.5,.74,4,8,'coral');
  floorShadow(H,1.6,4.0,6.8,2.8,.16);benchFrame(H,R,1.65,3.8,6.45,2.65,1.38,'sun');
  for(let n=0;n<4;n++){metal(H,R,1.95+n*1.3,4.1,1.1,1.6,.32,.46,n%2?'teal':'coral');H.line(R,[H.p(2.3+n*1.3,5.74,.61),H.p(2.75+n*1.3,5.74,.61)],'sun',2.2);}
  for(let n=0;n<5;n++)H.line(R,[H.p(2+n*.2,6.48,1.18),H.p(2+n*.2,6.48,.97)],'coral',.7);
  surface(H,R,H.tile(3.0,4.8,4.55,1.45,1.395),'paper',1,.7);vice(H,R);
  const head=H.p(4.0,5.81,1.96);shape(H,R,[[head[0]-30,head[1]-4],[head[0]-11,head[1]-9],[head[0]+2,head[1]-3],[head[0]-5,head[1]+10],[head[0]-19,head[1]+15],[head[0]-30,head[1]+6]],'blue',.75);H.line(R,[[head[0]-28,head[1]+3],[head[0]-19,head[1]+12],[head[0]-7,head[1]+7]],'paper',1.3);
  oval(H,R,head[0]+1,head[1],5,3.7,'paper',1);oval(H,R,head[0]+2,head[1],3.1,2.3,'blue',.9);
  for(const x of [5.05,6.8]) {timber(H,R,x,5.63,.23,.6,1.4,.16,'coral');H.line(R,[H.p(x+.12,5.65,1.58),H.p(x+.12,6.1,1.58)],'paper',1);}
  const wedge=H.p(4.8,4.98,1.42);shape(H,R,[[wedge[0]-5,wedge[1]-3],[wedge[0]+10,wedge[1]],[wedge[0]-5,wedge[1]+4]],'sun',.8);H.line(R,[[wedge[0]-2,wedge[1]],[wedge[0]+7,wedge[1]]],'coral',.6);
  tool(H,R,1.05,2.0,.35,2.8);tool(H,R,1.1,3.05,.35,2.65,1);tool(H,R,1.15,4.0,.35,1.7,2);
  for(const j of [1.8,3.0,4.1]){const q=H.p(.65,j,2.25);H.line(R,[[q[0]-7,q[1]-2],[q[0]+8,q[1]+3]],'coral',4);}
  cabinetFrame(H,R,8.55,.65,3.15,2.9,.14,4.05,2,'teal',(i,j,w,d,z,h,n)=>{
    if(n===0){for(let k=0;k<4;k++)tool(H,R,i+.15+k*.24,j+2.2,z+.4,2.5-k*.16,k%2);timber(H,R,i,j+1.5,w,.16,2.48,.14,'coral');}
    else {for(let k=0;k<3;k++){timber(H,R,i,j,w,d,z+.65+k*.8,.1,'sun');if(k===0){for(let p=0;p<3;p++)vessel(H,R,i+.2+p*.32,j+.6,z+.78,4,10,'coral');}else if(k===1){surface(H,R,H.faceI(i+.1,j+1.1,w-.2,z+1.0,z+1.55),'sun',.5);for(let q=0;q<7;q++)H.line(R,[H.p(i+.1+q*.11,j+1.1,z+1.0),H.p(i+.1+q*.11,j+1.1,z+1.55)],'blue',.6);}else{box(H,R,i+.1,j+.4,w-.2,.7,z+2.37,.32,'paper',1);}}}
  });
  for(let n=0;n<5;n++)H.line(R,[H.p(8.7+n*.5,.8,4.35),H.p(8.7+n*.5,3.2,4.35)],'blue',1);
  const q=H.p(10.3,4.6,.42);spokedWheel(H,R,q[0],q[1],12,'sun',0,.72);bentTube(H,R,[[9.1,4.15,.5],[11.0,4.15,.5],[11.8,5.3,1.15]],2.4);surface(H,R,[H.p(9,4.0,1),H.p(10.9,4,1),H.p(10.6,5,.55),H.p(9.3,5,.55)],'coral',.65);
  vessel(H,R,10.7,6.2,0,18,38,'teal');const barrel=H.p(10.7,6.2,0);for(const dy of [-28,-10])H.line(R,[[barrel[0]-17,barrel[1]+dy],[barrel[0]+17,barrel[1]+dy]],'blue',2);bentTube(H,R,[[10.9,6.15,.18],[11.25,6.15,.18],[11.25,6.15,.35]],2,'sun');
  benchFrame(H,R,.65,8.7,2.8,1.2,.6,'sun');oval(H,R,...H.p(1.4,9.3,.65),15,6,'sun',.65);oval(H,R,...H.p(1.4,9.3,.75),8,7,'sun',.6);box(H,R,2.45,9.0,.45,.5,.61,.58,'teal',.6);
  const glove=H.p(7.3,4.4,1.41);for(let n=0;n<2;n++){shape(H,R,[[glove[0]+n*9,glove[1]],[glove[0]+n*9+7,glove[1]-2],[glove[0]+n*9+7,glove[1]+10],[glove[0]+n*9+2,glove[1]+12]],'coral',.36);for(let k=0;k<3;k++)H.line(R,[[glove[0]+n*9+2+k*2,glove[1]+1],[glove[0]+n*9+2+k*2,glove[1]+7]],'blue',.5);}
  vessel(H,R,2.4,4.55,1.4,8,7,'coral');for(let n=0;n<5;n++)H.dot(...H.p(2.2+n*.09,4.48,1.68),1.3,'blue');
  const old=H.p(2.9,6.0,1.43);stroke(H,R,[[old[0]-20,old[1]-11],[old[0]+9,old[1]+4]],'sun',6);stroke(H,R,[[old[0]-10,old[1]-7],[old[0],old[1]-1]],'paper',3);
  timber(H,R,4.6,9.15,2.65,1.15,.04,.19,'sun');surface(H,R,H.tile(4.74,9.26,2.37,.9,.24),'paper',1);const study=H.p(5.35,9.7,.27);oval(H,R,study[0],study[1],10,6,'sun',.6);for(let n=0;n<3;n++)H.outline(R,ell(study[0],study[1],3+n*2,2+n),'coral',.6);const collar=H.p(6.35,9.7,.3);oval(H,R,collar[0],collar[1],7,5,'blue',.8);oval(H,R,collar[0],collar[1]-1,4.6,2.9,'paper',1);H.line(R,[H.p(6.1,9.25,.27),H.p(6.9,9.25,.27),H.p(6.9,9.75,.27)],'teal',2);for(let n=0;n<4;n++)H.line(R,[H.p(6.2+n*.16,9.24,.28),H.p(6.2+n*.16,9.38,.28)],'blue',.6);
  const sieve=[H.p(.6,7.8,.15),H.p(2.2,7.8,.15),H.p(2.2,7.45,1.25),H.p(.6,7.45,1.25)];surface(H,R,sieve,'paper',.7);H.outline(R,sieve,'sun',3);H.clip(sieve,()=>{for(let n=0;n<10;n++){H.line(R,[blend(sieve[0],sieve[1],n/9),blend(sieve[3],sieve[2],n/9)],'blue',.6);H.line(R,[blend(sieve[0],sieve[3],n/9),blend(sieve[1],sieve[2],n/9)],'blue',.6);}});
  taskLight(H,R,2.7,4.2,1.4,'coral',.7);
  for(let n=0;n<8;n++)metal(H,R,8.2+n*.25,10.75,.1,.58,0,.025,'blue');
},(H,R,t)=>{
  const u=cycle(t,24)*24,up=ease(.6,4.8,u)*(1-ease(18,22,u)),fit=ease(4.8,9.6,u)*(1-ease(14.4,18,u));
  const a=H.p(4.5-fit*.45,5.81,1.6+up*.36),b=H.p(7.3-fit*.45,5.81,1.6+up*.36);
  H.line(R,[a,b],'blue',7);H.line(R,[[a[0],a[1]-1],[b[0],b[1]-1]],'sun',5);H.line(R,[[a[0]+8,a[1]+3],[b[0]-9,b[1]-7]],'coral',.65);
  oval(H,R,b[0],b[1],9,6,'sun',.65);oval(H,R,b[0],b[1],5.5,3.1,'paper',1);H.line(R,[blend(a,b,.13),blend(a,b,.15)],'paper',4);
  const body=H.p(7.6,6.65,0);gardener(H,R,...body,blend(a,b,.64),blend(a,b,.89),ease(9.6,11,u)*(1-ease(13,14.4,u)));
  const shift=Math.sin(t*Math.PI*2/24)*.07;H.tint([H.p(.7,2.5,.028),H.p(1.1,2.5,.028),H.p(5.2+shift,7.5,.028),H.p(4.8+shift,7.5,.028)],'teal',.05);
});
room.loopSeconds=24;
room.stillTime=11.8;
export default room;
