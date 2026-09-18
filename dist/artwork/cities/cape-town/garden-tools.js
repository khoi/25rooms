import { world, shape, oval, stroke, box, ell, mix, cycle } from '../../worlds/common.js';
import { surface, timber, metal, vessel, benchFrame, bentTube, spokedWheel, drape, cushion } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, hangingRail, floorShadow, taskLight, recessedFrame } from '../joinery.js';
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
  for(let n=0;n<11;n++){const x=3.82+n*.085;H.line(R,[H.p(x,5.77,1.6),H.p(x+.06,5.85,1.72)],'paper',.6);}
  for(const x of [3.4,4.15]){metal(H,R,x,5.7,.15,.23,1.52,.16,'blue');H.dot(...H.p(x+.07,5.96,1.59),1.6,'sun');}
  metal(H,R,3.17,6.17,1.55,.12,1.04,.27,'blue');bentTube(H,R,[[3.4,6.19,1.2],[3.4,6.19,.82],[3.72,6.19,.82]],1.8,'teal');
  for(const x of [3.32,4.37])H.line(R,[H.p(x,6.32,1.08),H.p(x,6.32,1.24)],'sun',1.4);

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
function joineryChest(H,R) {
  const i=3.8,j=9.25,w=3.55,d=1.62;
  floorShadow(H,i,j,w,d,.17);surface(H,R,H.faceI(i+.1,j+.1,w-.2,.16,.76),'blue',.55);
  for(const x of [i,i+w-.12])timber(H,R,x,j,.12,d,.12,.67,'teal');
  timber(H,R,i,j,w,d,.12,.1,'sun');timber(H,R,i,j+d-.14,w,.14,.15,.58,'teal');
  const lid=[H.p(i,j,.8),H.p(i+w,j,.8),H.p(i+w,j-.25,1.77),H.p(i,j-.25,1.77)];surface(H,R,lid,'sun',.47);H.outline(R,lid,'teal',3);
  for(const x of [i+.22,i+w-.22])bentTube(H,R,[[x,j+.75,.74],[x,j-.18,1.54]],1.7,'blue');
  surface(H,R,H.tile(i+.18,j+.13,w-.36,d-.29,.5),'paper',1);
  for(let n=0;n<2;n++)timber(H,R,i+1.08+n*1.03,j+.13,.075,d-.3,.52,.22,'sun');
  const study=H.p(4.33,10.05,.57);oval(H,R,...study,12,7,'sun',.68);for(let n=0;n<4;n++)H.outline(R,ell(...study,3+n*2,1.5+n),'coral',.65);
  const collar=H.p(5.5,10,.59);oval(H,R,...collar,9,6,'blue',.8);oval(H,R,collar[0],collar[1]-2,5,3,'paper',1);H.line(R,[H.p(5.14,9.64,.56),H.p(5.89,9.64,.56),H.p(5.89,10.3,.56)],'teal',2);
  const grip=H.p(6.66,10.06,.58);stroke(H,R,[[grip[0]-12,grip[1]-10],[grip[0]+12,grip[1]+5]],'sun',7);for(let n=0;n<4;n++)H.line(R,[[grip[0]-3+n*3,grip[1]-5+n*2],[grip[0]-5+n*3,grip[1]+n*2]],'coral',.7);
  for(const x of [4.05,6.98]){metal(H,R,x,10.76,.13,.13,.31,.3,'blue');H.dot(...H.p(x+.07,10.92,.47),1.5,'sun');}
  const straps=[H.p(4.35,9.04,1.16),H.p(6.72,9.04,1.16)];for(const q of straps)H.line(R,[[q[0]-7,q[1]-2],[q[0]+8,q[1]+4]],'coral',4);
  H.line(R,[H.p(4.08,9.05,1.4),H.p(6.99,9.05,1.4)],'blue',1.1);
}
function pottingReturn(H,R) {
  benchFrame(H,R,.4,6.65,1.55,2.12,1.34,'teal');
  surface(H,R,H.tile(.52,6.77,1.29,1.88,1.355),'paper',1);metal(H,R,.48,6.75,.15,1.95,1.37,.31,'teal');metal(H,R,.48,6.7,1.37,.13,1.37,.31,'teal');
  vessel(H,R,1.06,7.4,1.37,11,17,'coral');const soil=H.p(1.06,7.4,1.37);for(let n=0;n<5;n++)H.dot(soil[0]-5+n*2.2,soil[1]-17,1.2,'blue');
  const trowel=H.p(1.28,8.15,1.4);stroke(H,R,[[trowel[0]-11,trowel[1]-7],[trowel[0],trowel[1]+1]],'sun',4);shape(H,R,[[trowel[0]-1,trowel[1]-2],[trowel[0]+10,trowel[1]+1],[trowel[0]+14,trowel[1]+8],[trowel[0]+3,trowel[1]+7]],'blue',.67);H.line(R,[[trowel[0]+2,trowel[1]+1],[trowel[0]+11,trowel[1]+6]],'paper',.8);
  drape(H,R,.6,8.38,.73,.48,1.39,.68,'paper');timber(H,R,.51,6.85,1.29,1.69,.3,.1,'sun');vessel(H,R,1.2,7.9,.4,10,23,'teal');
}
const room=world('cape-town-garden-tools','The handle fits the palm',{wall:false,floor:'paper',tone:.65,head:45},(H,R)=>{
  masonry(H,R,'ne',0,12,0,4.4,'teal',.28);masonry(H,R,'nw',0,10.8,0,3.3,'paper',.85);
  for(let i=0;i<12;i+=1.55)for(let j=0;j<12;j+=1.4)H.outline(R,H.tile(i+.06,j+.06,1.43,1.28,.018),'blue',.55,{tone:.35});
  const P=windowBay(H,R,'nw',1.0,5.0,1.4,1.7,{divisions:4,ink:'sun',view:Q=>{shape(H,R,[Q(.1,.1),Q(4.9,.1),Q(4.9,1.6),Q(.1,1.6)],'teal',.18); for(let n=0;n<5;n++)stroke(H,R,[Q(n,.1),Q(n+.6,.8),Q(n+.3,1.6)],'teal',2,.5);}});
  for(let n=0;n<8;n++){H.line(R,[P(n*.6,.12),P(n*.6+1,1.57)],'sun',2);H.line(R,[P(n*.6,1.55),P(n*.6+1,.12)],'sun',2);}
  recessedFrame(H,R,'nw',7.05,3.2,1.47,1.55,'teal',Q=>{
    for(let n=0;n<3;n++){const p=Q(.48+n*.94,.99);H.line(R,[Q(.48+n*.94,1.29),p],'coral',2.2);H.dot(...Q(.48+n*.94,1.3),1.8,'sun');if(n===0){H.outline(R,ell(p[0],p[1]+12,8,6),'sun',3);H.line(R,[[p[0],p[1]+3],[p[0],p[1]-5]],'blue',2);}else if(n===1){H.line(R,[[p[0],p[1]],[p[0]+2,p[1]+23]],'sun',4);shape(H,R,[[p[0]-6,p[1]+23],[p[0]+9,p[1]+23],[p[0]+4,p[1]+34]],'blue',.7);}else{for(const dx of [-4,4])H.outline(R,ell(p[0]+dx,p[1]+19,4,6),'sun',1.5);H.line(R,[[p[0]-4,p[1]+12],[p[0]+6,p[1]-2],[p[0],p[1]+11],[p[0]-7,p[1]-1]],'paper',1.3);}}
  });
  for(const x of [.45,11.35])timber(H,R,x,.3,.2,.2,0,4.65,'sun');timber(H,R,.4,.3,11.2,.27,4.4,.25,'sun');
  bentTube(H,R,[[.3,.15,4.62],[11.6,.15,4.62],[11.6,.15,1.0]],3,'teal');
  for(const x of [1.0,10.75])bentTube(H,R,[[x,.6,3.75],[x+(.5*(x<5?1:-1)),.6,4.4]],2.4,'blue');
  for(const z of [1.4,2.6])timber(H,R,2.9,.22,4.9,.24,z,.15,'sun');
  for(let n=0;n<6;n++){const i=3.2+n*.75;tool(H,R,i,.7,.48,2.55+(n%3)*.25,n%3===0?1:0);const p=H.p(i,.75,2.65);stroke(H,R,[[p[0]-4,p[1]-2],[p[0],p[1]+4],[p[0]+4,p[1]-2]],'coral',2);}
  const hose=H.p(8.4,.65,3.5);for(let n=0;n<5;n++)H.outline(R,ell(hose[0],hose[1],17+n*2,23+n*2),'teal',2.3,{tone:.8});stroke(H,R,[[hose[0]+24,hose[1]],[hose[0]+26,hose[1]+35],[hose[0]+13,hose[1]+49]],'blue',2.8);H.line(R,[[hose[0]-4,hose[1]-29],[hose[0]+5,hose[1]-29]],'sun',5);
  pottingReturn(H,R);
  metal(H,R,.48,5.4,1.0,2.2,.1,.6,'teal');surface(H,R,H.tile(.58,5.5,.8,2,.72),'blue',.42);for(let n=0;n<3;n++)vessel(H,R,.9,5.9+n*.5,.74,4,8,'coral');
  floorShadow(H,1.6,4.0,6.8,2.8,.16);benchFrame(H,R,1.65,3.8,6.45,2.65,1.38,'sun');
  for(let n=0;n<4;n++){metal(H,R,1.95+n*1.3,4.1,1.1,1.6,.32,.46,n%2?'teal':'coral');H.line(R,[H.p(2.3+n*1.3,5.74,.61),H.p(2.75+n*1.3,5.74,.61)],'sun',2.2);}
  for(const x of [1.83,7.78])bentTube(H,R,[[x,4.0,.32],[x,6.17,1.05]],2,'teal');
  timber(H,R,1.82,6.35,6.1,.15,.93,.25,'sun');
  for(let n=0;n<3;n++){surface(H,R,H.faceI(5.55,6.52,1.98,.35+n*.18,.5+n*.18),'teal',.45);H.line(R,[H.p(6.25,6.55,.43+n*.18),H.p(6.83,6.55,.43+n*.18)],'sun',1.8);}
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
  for(let n=0;n<3;n++){const z=1.06+n*.8;vessel(H,R,10.55,2.63,z,7,12,n===1?'teal':'coral');vessel(H,R,11.18,2.49,z,5,8,'coral');}
  const cloth=H.tile(10.55,2.3,1,.88,2.69);surface(H,R,cloth,'paper',1);H.line(R,[H.p(10.63,2.4,2.7),H.p(11.44,3.0,2.7)],'coral',1.3);
  for(let n=0;n<5;n++)H.line(R,[H.p(8.7+n*.5,.8,4.35),H.p(8.7+n*.5,3.2,4.35)],'blue',1);
  const q=H.p(10.3,4.6,.42);spokedWheel(H,R,q[0],q[1],12,'sun',0,.72);bentTube(H,R,[[9.1,4.15,.5],[11.0,4.15,.5],[11.8,5.3,1.15]],2.4);surface(H,R,[H.p(9,4.0,1),H.p(10.9,4,1),H.p(10.6,5,.55),H.p(9.3,5,.55)],'coral',.65);
  vessel(H,R,10.7,6.2,0,18,38,'teal');const barrel=H.p(10.7,6.2,0);for(const dy of [-28,-10])H.line(R,[[barrel[0]-17,barrel[1]+dy],[barrel[0]+17,barrel[1]+dy]],'blue',2);bentTube(H,R,[[10.9,6.15,.18],[11.25,6.15,.18],[11.25,6.15,.35]],2,'sun');
  benchFrame(H,R,.65,8.7,2.8,1.2,.6,'sun');oval(H,R,...H.p(1.4,9.3,.65),15,6,'sun',.65);oval(H,R,...H.p(1.4,9.3,.75),8,7,'sun',.6);box(H,R,2.45,9.0,.45,.5,.61,.58,'teal',.6);
  const glove=H.p(7.3,4.4,1.41);for(let n=0;n<2;n++){shape(H,R,[[glove[0]+n*9,glove[1]],[glove[0]+n*9+7,glove[1]-2],[glove[0]+n*9+7,glove[1]+10],[glove[0]+n*9+2,glove[1]+12]],'coral',.36);for(let k=0;k<3;k++)H.line(R,[[glove[0]+n*9+2+k*2,glove[1]+1],[glove[0]+n*9+2+k*2,glove[1]+7]],'blue',.5);}
  vessel(H,R,2.4,4.55,1.4,8,7,'coral');for(let n=0;n<5;n++)H.dot(...H.p(2.2+n*.09,4.48,1.68),1.3,'blue');
  const old=H.p(2.9,6.0,1.43);stroke(H,R,[[old[0]-20,old[1]-11],[old[0]+9,old[1]+4]],'sun',6);stroke(H,R,[[old[0]-10,old[1]-7],[old[0],old[1]-1]],'paper',3);
  joineryChest(H,R);
  const sieve=[H.p(.6,5.2,.15),H.p(2.2,5.2,.15),H.p(2.2,4.85,1.25),H.p(.6,4.85,1.25)];surface(H,R,sieve,'paper',.7);H.outline(R,sieve,'sun',3);H.clip(sieve,()=>{for(let n=0;n<10;n++){H.line(R,[blend(sieve[0],sieve[1],n/9),blend(sieve[3],sieve[2],n/9)],'blue',.6);H.line(R,[blend(sieve[0],sieve[3],n/9),blend(sieve[1],sieve[2],n/9)],'blue',.6);}});
  cushion(H,R,2.15,8.87,.86,.8,.63,.14,'teal');
  const bundle=H.p(10.6,2.55,3.58);for(let n=0;n<7;n++)stroke(H,R,[[bundle[0]-17+n*4,bundle[1]+10],[bundle[0]-14+n*4,bundle[1]-30]],'sun',2);H.line(R,[[bundle[0]-16,bundle[1]-10],[bundle[0]+11,bundle[1]-6]],'coral',3);
  const roll=H.p(10.23,2.05,4.2);oval(H,R,...roll,14,7,'paper',1);for(let n=0;n<3;n++)H.outline(R,ell(...roll,4+n*3,2+n),'teal',.65);
  drape(H,R,9.07,1.08,1.13,1.75,2.67,.55,'paper');
  bentTube(H,R,[[10.8,5.2,1.1],[11.5,5.2,1.1],[11.8,6.0,.4]],2,'blue');
  const can=H.p(9.8,7.15,.03);vessel(H,R,9.8,7.15,.03,11,22,'sun');stroke(H,R,[[can[0]-8,can[1]-19],[can[0]-16,can[1]-32],[can[0]-27,can[1]-35]],'teal',4);stroke(H,R,[[can[0]+6,can[1]-20],[can[0]+19,can[1]-27],[can[0]+20,can[1]-8],[can[0]+9,can[1]-4]],'blue',2);
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
