import { world, box, shape, stroke, oval, actor, wallPt, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, benchFrame, bentTube, cushion, drape, floorLight } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { windowBay, recessedFrame } from '../joinery.js';

const ease=v=>{const q=Math.max(0,Math.min(1,v));return q*q*(3-2*q);};
const rest={...FIGURES.clips.idle.keys[0][1]};
const fit={...rest};
FIGURES.clips.mexicoPoolFit={dur:20,keys:[[0,fit],[1,fit]]};
FIGURES.clips.mexicoPoolFriend={dur:20,keys:[[0,{...rest,al:50,ar:-46,el:40,er:-40,head:0}],[.44,{...rest,al:50,ar:-46,el:40,er:-40,head:16}],[.6,{...rest,al:50,ar:-46,el:40,er:-40,head:16}],[1,{...rest,al:50,ar:-46,el:40,er:-40,head:0}]]};
function kickboard(H,R,i,j,z,ink='sun',scale=1){
  const p=H.p(i,j,z),P=(x,y)=>[p[0]+x*scale,p[1]+y*scale];
  shape(H,R,[P(-9,0),P(9,0),P(10,-20),P(7,-27),P(-7,-27),P(-10,-20)],ink,.72,.9);
  stroke(H,R,[P(-6,-4),P(-6,-19),P(-3,-23),P(3,-23)],'paper',1.4);
  for(const x of [-4,4]) oval(H,R,...P(x,-18),1.5*scale,3*scale,'blue',.55);
}
function slippers(H,R,i,j,z){
  for(const d of [0,.37]) {
    const p=H.p(i+d,j,z);
    shape(H,R,[[p[0]-4,p[1]+6],[p[0]+2,p[1]+7],[p[0]+5,p[1]-6],[p[0]+3,p[1]-11],[p[0]-2,p[1]-12],[p[0]-5,p[1]-6]],'coral',.6,.65);
    stroke(H,R,[[p[0]-4,p[1]-4],[p[0],p[1]-1],[p[0]+4,p[1]-5]],'blue',1.5);
  }
}
const room=world('mexico-city-community-pool','The goggles find their fit',{wall:'paper',wallTone:.75,height:3.8,head:24,floor:'paper',tone:.18,pattern:'tiles',accent:'teal'},(H,R)=>{
  for(const side of ['ne','nw']) {
    masonry(H,R,side,.1,11.8,0,1.14,'teal',.27);
    H.line(R,[wallPt(H,side,.1,1.16,-.12),wallPt(H,side,11.8,1.16,-.12)],'paper',3.5);
  }
  windowBay(H,R,'ne',1.23,6.51,1.42,1.92,{divisions:4,ink:'teal',view:P=>{
    surface(H,R,[P(.16,.17),P(6.32,.17),P(6.32,1.74),P(.16,1.74)],'paper',1);
    surface(H,R,[P(.16,.16),P(6.32,.16),P(6.32,.93),P(.16,.57)],'teal',.5);
    for(let k=0;k<4;k++) H.line(R,[P(.14,.26+k*.15),P(6.34,.62+k*.15)],'paper',2,{tone:.8});
    for(let k=0;k<5;k++) H.line(R,[P(.5+k*1.25,.24),P(1.1+k*1.25,.76)],'blue',1.5,{tone:.7});
    H.line(R,[P(.2,.95),P(6.34,1.29)],'coral',2.4);
  }});
  recessedFrame(H,R,'nw',1.3,3.5,1.69,1.3,'teal',P=>{
    surface(H,R,[P(.15,.15),P(3.34,.15),P(3.34,1.14),P(.15,1.14)],'paper',1);
    for(let k=0;k<3;k++) surface(H,R,[P(.3+k*1.03,.2),P(.71+k*1.03,.2),P(1.13+k*1.03,1.08),P(.89+k*1.03,1.08)],'teal',.15,.4);
    H.line(R,[P(.18,.18),P(3.32,1.1)],'paper',2.5);
  });
  for(const x of [.65,6.45]) { metal(H,R,x,.17,.95,.28,3.51,.14,'paper'); H.line(R,[H.p(x+.08,.46,3.55),H.p(x+.88,.46,3.55)],'sun',2.2); }
  for(let n=0;n<5;n++) {
    const j=5.1+n*1.14;
    metal(H,R,.14,j,1.0,1.04,.2,2.74,n%2?'teal':'paper');
    surface(H,R,H.faceJ(1.15,j+.09,.86,.33,2.81),n%2?'teal':'paper',n%2?.47:1,.7);
    for(const z of [.57,.68,.79,2.45,2.56]) H.line(R,[H.p(1.159,j+.24,z),H.p(1.159,j+.76,z)],'blue',.85,{tone:.64});
    bentTube(H,R,[[1.2,j+.84,1.5],[1.26,j+.84,1.5],[1.26,j+.84,1.78],[1.2,j+.84,1.78]],1.8,n===2?'coral':'blue');
    if(n===2) for(let k=0;k<3;k++) H.line(R,[H.p(1.27,j+.82,1.56+k*.06),H.p(1.27,j+.87,1.56+k*.06)],'sun',1);
  }
  metal(H,R,.1,5.02,1.14,5.86,.1,.11,'blue');
  cabinetFrame(H,R,8.47,.55,2.9,1.77,.35,3.05,2,'teal',(i,j,w,d,z,h,n)=>{
    timber(H,R,i,j,w,d,z+.92,.1,'paper');timber(H,R,i,j,w,d,z+1.85,.1,'paper');
    if(n===0){
      for(let k=0;k<3;k++) kickboard(H,R,i+.2+k*.33,j+d-.12,z+.1, k%2?'coral':'sun',.85);
      for(let k=0;k<3;k++) cushion(H,R,i+.08,j+.22,w-.16,d-.45,z+1.04+k*.16,.13,k%2?'paper':'sun');
      for(let k=0;k<4;k++) oval(H,R,...H.p(i+.2+(k%2)*.53,j+.36+Math.floor(k/2)*.58,z+2.15),7,4,k%2?'sun':'coral',.63);
    }else{
      box(H,R,i+.08,j+.16,w-.16,d-.25,z+.1,.58,'paper',1);
      for(let k=0;k<3;k++) { H.line(R,[H.p(i+.13,j+d-.06,z+.2+k*.16),H.p(i+w-.14,j+d-.06,z+.2+k*.16)],'blue',.55); H.dot(...H.p(i+w*.5,j+d-.06,z+.28+k*.16),1.2,'coral'); }
      for(let k=0;k<3;k++) bentTube(H,R,[[i+.15,j+.25+k*.44,z+1.18],[i+w-.15,j+.25+k*.44,z+1.18]],2,'teal');
      for(let k=0;k<4;k++) stroke(H,R,[H.p(i+.09+k*.29,j+d,z+2),H.p(i+.09+k*.29,j+.15,z+2.66)],'blue',.7);
      for(let k=0;k<4;k++) H.line(R,[H.p(i+.09,j+d,z+2.05+k*.16),H.p(i+w-.06,j+.15,z+2.05+k*.16)],'blue',.7);
      oval(H,R,...H.p(i+w*.5,j+.7,z+2.38),10,6,'sun',.8);
      surface(H,R,H.faceI(i+w*.4,j+1.02,.22,z+2.28,z+2.45),'paper',1,.4);
    }
  });
  metal(H,R,8.32,.41,3.19,2.04,.18,.17,'blue');
  for(let n=0;n<14;n++) {
    const i=2.22+n*.54;
    surface(H,R,H.tile(i,3.37,.48,.46,.035),'blue',.55,.45);
    for(let k=0;k<3;k++) H.line(R,[H.p(i+.07+k*.13,3.43,.041),H.p(i+.07+k*.13,3.76,.041)],'paper',.85);
  }
  benchFrame(H,R,2.65,5.04,5.64,1.31,.68,'teal');
  for(const y of [5.13,5.47,5.8,6.13]) {
    timber(H,R,2.65,y,5.64,.24,.69,.08,'teal');
    for(const x of [3.05,7.85]) H.dot(...H.p(x,y+.1,.785),1.1,'blue');
  }
  for(const x of [3.3,6.9]) bentTube(H,R,[[x,5.13,.7],[x,5.13,1.65],[x,5.13,2.5]],2.4,'teal');
  bentTube(H,R,[[3.3,5.13,2.5],[6.9,5.13,2.5]],2.4,'teal');
  for(const x of [3.6,4.3,5.0,5.7,6.4]) bentTube(H,R,[[x,5.13,2.38],[x,5.34,2.33],[x,5.39,2.43]],1.8,'sun');
  const bag=[H.p(3.82,5.48,1.25),H.p(4.63,5.48,1.25),H.p(4.53,5.43,2.08),H.p(3.93,5.43,2.08)];surface(H,R,bag,'coral',.62);
  stroke(H,R,[H.p(4.06,5.43,2.05),H.p(4.13,5.36,2.27),H.p(4.39,5.35,2.27),H.p(4.46,5.43,2.05)],'blue',1.9);
  box(H,R,2.97,5.41,.46,.55,.79,.08,'paper',1);
  cushion(H,R,6.95,5.36,.92,.82,.79,.1,'sun');
  shape(H,R,[H.p(7.08,5.48,.91),H.p(7.58,5.48,.91),H.p(7.53,5.91,.94),H.p(7.13,5.91,.92)],'coral',.46);
  H.line(R,[H.p(7.13,5.79,.94),H.p(7.55,5.79,.94)],'paper',1.1);
  box(H,R,3.0,6.27,1.04,.47,.04,.16,'sun',.48);
  oval(H,R,...H.p(6.15,5.72,.26),11,6,'sun',.8);
  slippers(H,R,3.45,8.52,.025);
  bentTube(H,R,[[9.3,3.88,.03],[9.3,3.88,1.5],[10.91,3.88,1.5],[10.91,3.88,.03]],3.5,'teal');
  surface(H,R,[H.p(11.5,3.0,.23),H.p(11.5,6.28,.23),H.p(11.5,6.28,2.96),H.p(11.5,3.0,2.96)],'paper',.64,.9);
  for(let k=0;k<7;k++) H.line(R,[H.p(11.505,3.14+k*.45,.33),H.p(11.505,3.14+k*.45,2.86)],'teal',.65,{tone:.4});
  benchFrame(H,R,9.25,9.21,1.93,1.1,.58,'sun');
  cushion(H,R,9.37,9.34,.94,.81,.6,.16,'coral');
  box(H,R,10.6,9.46,.37,.5,.59,.24,'paper',1);
  H.line(R,[H.p(10.63,9.98,.73),H.p(10.94,9.98,.73)],'teal',1.2);
  floorLight(H,6.18,7.36,114,.27);
},(H,R,t)=>{
  const u=((t%20)+20)%20;
  const lift=ease(u/4)*(1-ease((u-12)/6));
  Object.assign(fit,rest,{head:3,al:40+lift*111,ar:-40-lift*111,el:65-lift*28,er:-65+lift*28});
  actor(H,R,5.89,7.77,t,'mexicoPoolFit',{shirt:['teal',.65],pants:['blue',.42],hairStyle:'short'},0,1.55);
  const p=H.p(5.89,7.77,0),gy=p[1]-46-lift*23,gx=p[0]+2;
  stroke(H,R,[[gx-10,gy],[gx-13,gy-4],[gx-7,gy-8],[gx+8,gy-8],[gx+13,gy-3],[gx+10,gy]],'blue',1.6);
  for(const x of [-4.8,4.8]) {
    oval(H,R,gx+x,gy,4.7,3.5,'blue',.8);oval(H,R,gx+x,gy-.3,3,2.1,'paper',.85);
    H.line(R,[[gx+x-2,gy-.9],[gx+x+.4,gy-1.7]],'teal',.8);
  }
  H.line(R,[[gx-1.5,gy],[gx+1.5,gy]],'blue',1.2);
  for(const side of [-1,1]) {const sh=[p[0]+side*8,p[1]-50],hand=[gx+side*11,gy-1];stroke(H,R,[sh,[p[0]+side*16,gy+9],hand],'teal',5.1);oval(H,R,...hand,2.1,2.2,'coral',.3);}
  actor(H,R,8.26,7.93,t,'mexicoPoolFriend',{shirt:['coral',.68],pants:['blue',.5],hairStyle:'curly'},0,1.4);
  kickboard(H,R,8.29,7.98,.48,'sun',1.0);
  const sway=Math.sin(t*Math.PI*2/20)*.055;
  surface(H,R,[H.p(5.39,5.15,2.37),H.p(6.28,5.15,2.37),H.p(6.3+sway,5.29,1.2),H.p(5.39+sway,5.29,1.25)],'paper',1,.8);
  for(let k=0;k<5;k++) H.line(R,[H.p(5.46+k*.17,5.17,2.33),H.p(5.47+k*.17+sway,5.3,1.28)],'teal',.7,{tone:.65});
  H.line(R,[H.p(5.42+sway,5.31,1.38),H.p(6.26+sway,5.31,1.33)],'coral',1.4);
});
room.loopSeconds=20;
room.stillTime=19;
export default room;
