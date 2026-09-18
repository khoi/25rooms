import { FIGURES } from '../../drawings.js';
import { world, shape, oval, stroke, box, actor, ell } from '../../worlds/common.js';
import { surface, timber, metal, vessel, cushion, drape, benchFrame, floorLight, bentTube } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, wallCourse, hangingRail, taskLight, floorShadow, recessedFrame } from '../joinery.js';

const clientRest={...FIGURES.clips.think.keys[0][1]};
FIGURES.clips.hanoiSilkClient={dur:20,keys:[[0,clientRest],[.4,clientRest],[.53,{...clientRest,head:18}],[.7,clientRest],[1,clientRest]]};
const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
function bag(H,R,x,y,strap,t) {
  const p=[[x-17,y-30],[x+16,y-30],[x+19,y-3],[x+11,y+2],[x-14,y],[x-19,y-4]];
  surface(H,R,p,'paper',1);surface(H,R,[[x+11,y-29],[x+16,y-30],[x+19,y-3],[x+11,y+2]],'sun',.3);
  surface(H,R,[[x-16,y-30],[x-9,y-35],[x+12,y-34],[x+16,y-30],[x+10,y-25],[x-9,y-25]],'coral',.54);
  surface(H,R,[[x-8,y-33],[x+5,y-33],[x+5,y-27],[x-8,y-27]],'teal',.6);H.dot(x+2,y-29,1.8,'sun');
  shape(H,R,[[x-13,y-7],[x-8,y-2],[x-15,y-2]],'teal',.22,.4);
  H.line(R,[[x-12,y-26],[x-13,y-9],[x-9,y-5]],'sun',1);H.line(R,[[x+10,y-26],[x+9,y-8]],'blue',.55,{tone:.4});
  H.line(R,[[x-7,y-23],[x-8,y-14],[x-3,y-7]],'teal',.55,{tone:.65});surface(H,R,[[x+2,y-33],[x+8,y-32],[x+8,y-27],[x+3,y-28]],'paper',1,.4);H.dot(x+6,y-30,1,'sun');
  H.line(R,[[x-17,y-4],[x+11,y+1],[x+18,y-3]],'coral',.7);
  const apex=[x+strap*.8,y-50-strap*6];
  stroke(H,R,[[x-11,y-29],[x-8,y-44],apex,[x+10,y-43],[x+12,y-29]],'blue',3.2);stroke(H,R,[[x-11,y-29],[x-8,y-44],apex,[x+10,y-43],[x+12,y-29]],'sun',1.8);
  for(const d of[-11,12])for(let n=0;n<3;n++)H.line(R,[[x+d-2,y-27+n*2],[x+d+2,y-27+n*2]],'teal',.55);
  stroke(H,R,[[x+12,y-29],[x+19+Math.sin(t*Math.PI*2/20)*2,y-17],[x+19,y-8]],'teal',1.1);
  return apex;
}
const room=world('hanoi-silk-bag-fitting','The strap sits right',{floor:'paper',tone:.45,pattern:'tiles',accent:'coral',wall:'paper',wallTone:.9,height:3.9,head:30},(H,R)=>{
  wallCourse(H,R,'nw',0,12,.56,'teal');wallCourse(H,R,'ne',0,12,.56,'teal');
  windowBay(H,R,'nw',5.6,4.95,1.62,1.9,{ink:'teal',divisions:3});floorLight(H,6.4,5.6,132,.46);
  recessedFrame(H,R,'ne',3.1,2.59,2.38,.63,'sun',P=>{for(const [u,c]of[[.17,'coral'],[.81,'teal'],[1.45,'sun'],[2.03,'paper']]){surface(H,R,[P(u,.13),P(u+.39,.13),P(u+.39,.47),P(u,.47)],c,c==='paper'?1:.45,.4);H.line(R,[P(u+.04,.16),P(u+.34,.44)],'blue',.6);H.dot(...P(u+.2,.47),1.3,'blue');}});
  bentTube(H,R,[[3.0,.17,3.67],[11.54,.17,3.67],[11.54,.17,.63],[10.58,.43,.63]],1.2,'blue');metal(H,R,10.32,.24,.41,.13,.58,.34,'paper');for(const i of[10.43,10.62])H.dot(...H.p(i,.39,.76),1.3,'blue');
  benchFrame(H,R,3.15,.4,8.33,1.8,1.12,'sun');
  for(const [i,w]of[[3.28,1.4],[9.72,1.45]]){box(H,R,i,.6,w,1.29,.2,.75,'teal',.36);for(const z of[.27,.51,.75]){surface(H,R,H.faceI(i+.07,1.91,w-.14,z,z+.18),'teal',.24);H.dot(...H.p(i+w*.54,1.95,z+.11),1.5,'sun');}}
  metal(H,R,5.82,.7,2.54,1.16,1.15,.1,'blue');
  const M=(i,j,z)=>H.p(5.96+i,.86+j,1.26+z);
  surface(H,R,[M(.12,.55,0),M(.47,.55,0),M(.47,.55,.64),M(1.61,.55,.64),M(1.61,.55,.26),M(1.98,.55,.26),M(1.98,.55,.94),M(.12,.55,.94)],'blue',.72);
  surface(H,R,[M(.12,.2,.94),M(1.98,.2,.94),M(1.98,.55,.94),M(.12,.55,.94)],'teal',.58);
  H.line(R,[M(.48,.55,.04),M(.48,.55,.54)],'paper',1.2);H.line(R,[M(.39,.55,.04),M(.64,.55,.04)],'sun',1.4);
  const wheel=M(2.04,.55,.64);H.outline(R,ell(...wheel,11,12),'blue',3);H.outline(R,ell(...wheel,7,8),'sun',.8);
  surface(H,R,[M(.17,.57,.39),M(.4,.57,.39),M(.4,.57,.8),M(.17,.57,.8)],'teal',.7);for(const h of[.49,.67])H.dot(...M(.27,.58,h),1.2,'sun');
  const dial=M(1.48,.59,.75);oval(H,R,...dial,4,4,'paper',1);H.line(R,[[dial[0],dial[1]],[dial[0]+2,dial[1]-2]],'coral',.8);
  stroke(H,R,[M(2.05,.58,.6),M(2.15,.78,-.65),M(1.61,.78,-.86)],'blue',1.1);H.outline(R,ell(...M(2.11,.78,-.65),7,8),'sun',.8);
  metal(H,R,5.61,1.59,.62,.43,1.17,.06,'paper');for(let n=0;n<4;n++)H.line(R,[H.p(5.72+n*.11,1.67,1.24),H.p(5.8+n*.11,1.87,1.24)],'blue',.7);
  const spool=M(1.14,.3,1.03);H.line(R,[[spool[0],spool[1]+1],[spool[0],spool[1]-12]],'blue',1);surface(H,R,[[spool[0]-4,spool[1]-8],[spool[0]+4,spool[1]-8],[spool[0]+4,spool[1]],[spool[0]-4,spool[1]]],'coral',.6);
  stroke(H,R,[[spool[0],spool[1]-8],M(.62,.39,1.09),M(.46,.55,.32),M(.47,.55,.08)],'paper',.8);
  drape(H,R,5.94,1.1,1.08,.77,1.27,.22,'coral');
  metal(H,R,6.53,1.48,.92,.5,.12,.07,'blue');for(let n=0;n<5;n++)H.line(R,[H.p(6.63+n*.15,1.53,.2),H.p(6.63+n*.15,1.87,.2)],'paper',.65);stroke(H,R,[H.p(7.12,1.7,.2),H.p(7.34,1.06,.48),H.p(7.78,1.06,1.18)],'blue',.9);
  taskLight(H,R,9.4,1.05,1.15,'coral',-.65);
  surface(H,R,H.tile(10.29,.78,.88,.94,1.14),'blue',.16);for(let n=0;n<5;n++)H.line(R,[H.p(10.38+n*.13,.9,1.16),H.p(10.38+n*.13,1.57,1.16)],'sun',1.4);
  cabinetFrame(H,R,.31,.42,2.45,2.35,.05,3.12,2,'sun',(i,j,w,d,z,h,n)=>{for(const lev of[.15,1.11,2.13]){timber(H,R,i,j,w,d,z+lev,.1,'sun');for(let q=0;q<3;q++)cushion(H,R,i+.08,j+.42,w-.16,d-.5,z+lev+.11+q*.13,.09,['coral','teal','paper'][(q+n)%3]);}});
  for(const [i,j,h,c]of[[.76,3.31,2.18,'coral'],[1.39,3.35,2.68,'teal'],[2.0,3.44,2.33,'paper']]){vessel(H,R,i,j,.12,10,h*32,c,false);H.line(R,[H.p(i-.15,j,.27),H.p(i-.15,j,h)],'paper',1);}
  for(const j of[3.1,3.92]){for(const i of[.31,2.61])timber(H,R,i,j,.13,.13,.07,2.92,'teal');for(const z of[.17,2.82])timber(H,R,.31,j,2.43,.13,z,.12,'sun');}
  for(const [i,j,h,c]of[[.76,3.31,2.18,'coral'],[1.39,3.35,2.68,'teal'],[2.0,3.44,2.33,'paper']]){const p=H.p(i,j,.12+h);oval(H,R,...p,10,4,'paper',1);oval(H,R,...p,6,2.4,c,.5);H.dot(...p,2.2,'blue');stroke(H,R,[[p[0]-9,p[1]+4],[p[0]-7,p[1]+26]],'paper',1.7);}
  const sample=H.p(2.14,3.95,1.99);surface(H,R,[[sample[0]-8,sample[1]],[sample[0]+8,sample[1]],[sample[0]+9,sample[1]+31],[sample[0]-8,sample[1]+29]],'coral',.36);for(let n=0;n<4;n++)H.line(R,[[sample[0]-6+n*4,sample[1]+3],[sample[0]-6+n*4,sample[1]+25]],'paper',.75);
  timber(H,R,.31,2.86,2.41,.18,.04,.19,'sun');timber(H,R,.31,3.97,2.41,.18,.04,.19,'sun');
  hangingRail(H,R,'ne',3.55,7.6,3.29,6,(P,u,n)=>{const [x,y]=P(u,-.18);if(n<3){surface(H,R,[[x-10,y+3],[x+9,y+3],[x+14,y+30],[x-13,y+30]],n===1?'paper':'sun',n===1?1:.38);H.outline(R,[[x-7,y+7],[x+6,y+7],[x+10,y+25],[x-9,y+25]],'blue',.6,{tone:.5});}else{surface(H,R,[[x-8,y+5],[x+8,y+5],[x+11,y+27],[x-10,y+27]],n===4?'teal':'paper',n===4?.28:1);stroke(H,R,[[x-6,y+5],[x-4,y-2],[x+4,y-2],[x+6,y+5]],'blue',.75);if(n===5)for(let k=0;k<3;k++)H.line(R,[[x-6+k*4,y+9],[x-6+k*4,y+25]],'coral',.65);}});
  floorShadow(H,3.26,4.02,5.88,3.37,.17);benchFrame(H,R,3.12,3.74,6.07,3.3,1.08,'sun');
  timber(H,R,3.31,4.04,5.65,2.66,.29,.13,'sun');
  for(const i of[3.37,5.25,7.13]){surface(H,R,H.faceI(i,6.77,1.66,.32,.69),'blue',.6);timber(H,R,i,6.74,1.66,.17,.33,.29,'teal');const p=H.p(i+.82,6.94,.49);stroke(H,R,[[p[0]-5,p[1]],[p[0],p[1]+3],[p[0]+5,p[1]]],'sun',1.5);}
  timber(H,R,3.4,6.77,1.55,.62,.75,.06,'sun');surface(H,R,H.tile(3.5,6.86,1.33,.43,.82),'blue',.6);for(const [i,c]of[[3.68,'coral'],[4.01,'paper'],[4.35,'teal'],[4.66,'sun']]){const p=H.p(i,7.05,.83);oval(H,R,...p,4,2,c,c==='paper'?1:.6);H.line(R,[[p[0]-3,p[1]],[p[0]+3,p[1]]],'blue',.5);}
  const pattern=[H.p(3.45,4.33,1.11),H.p(4.06,4.22,1.11),H.p(4.64,4.51,1.11),H.p(4.64,5.58,1.11),H.p(4.33,5.8,1.11),H.p(3.5,5.69,1.11)];surface(H,R,pattern,'paper',1);H.line(R,[H.p(3.56,4.5,1.12),H.p(4.24,4.46,1.12),H.p(4.5,4.63,1.12),H.p(4.48,5.47,1.12),H.p(4.2,5.64,1.12)],'coral',.7);for(const [i,j]of[[3.8,4.57],[4.29,5.43]])oval(H,R,...H.p(i,j,1.14),4,2,'blue',.7);
  metal(H,R,3.28,6.61,2.09,.32,.83,.11,'blue');for(let n=0;n<6;n++){const p=H.p(3.47+n*.27,6.76,.96);oval(H,R,...p,3.2,2.4,n%2?'coral':'sun',.6);}
  cushion(H,R,6.91,4.27,1.55,1.34,1.1,.09,'teal');
  timber(H,R,4.72,4.52,1.22,.87,1.1,.14,'sun');metal(H,R,4.93,4.73,.75,.44,1.25,.09,'blue');
  timber(H,R,5.13,4.91,.21,.21,1.3,.72,'sun');
  for(const z of[1.45,1.66,1.87])H.dot(...H.p(5.35,5.04,z),1.4,'blue');
  const adjust=H.p(5.35,5.04,1.71);oval(H,R,...adjust,4,4,'coral',.7);H.line(R,[[adjust[0]-3,adjust[1]],[adjust[0]+3,adjust[1]]],'paper',.8);
  surface(H,R,[H.p(4.75,4.94,1.88),H.p(4.86,4.94,2.05),H.p(5.54,4.94,2.05),H.p(5.66,4.94,1.88),H.p(5.5,4.94,1.59),H.p(4.91,4.94,1.59)],'teal',.24);

  const shoulder=[H.p(4.62,4.99,1.91),H.p(4.82,4.99,2.2),H.p(5.54,4.99,2.2),H.p(5.82,4.99,1.91)];surface(H,R,shoulder,'sun',.5);H.line(R,[shoulder[0],shoulder[3]],'paper',1);
  bentTube(H,R,[[4.66,5.01,2.13],[5.81,5.01,2.13]],1.8,'blue');
  const thread=H.p(5.52,5.28,1.26);stroke(H,R,[[thread[0]-9,thread[1]],[thread[0]-3,thread[1]+3],[thread[0]+6,thread[1]-1],[thread[0]+12,thread[1]+3]],'coral',.7);
  H.line(R,[H.p(3.7,4.52,1.13),H.p(4.31,5.38,1.13)],'teal',.8);surface(H,R,[H.p(4.34,5.59,1.13),H.p(4.64,5.57,1.13),H.p(4.58,5.84,1.13)],'coral',.35);
  const shears=H.p(7.67,6.42,1.12);for(const d of[-4,4])H.outline(R,ell(shears[0]+d,shears[1],4,3),'blue',1);H.line(R,[[shears[0]-2,shears[1]-1],[shears[0]+13,shears[1]-8]],'blue',1.4);H.line(R,[[shears[0]+2,shears[1]-1],[shears[0]-11,shears[1]-8]],'blue',1.4);
  const ring=H.p(8.53,5.57,1.11);H.outline(R,ell(...ring,6,3),'blue',1);for(let n=0;n<5;n++)surface(H,R,[[ring[0]+n*3-6,ring[1]],[ring[0]+n*3-1,ring[1]+1],[ring[0]+n*4+1,ring[1]+15],[ring[0]+n*4-5,ring[1]+14]],['coral','teal','sun','paper','coral'][n],.55);
  timber(H,R,.34,5.13,1.47,1.69,.92,.12,'sun');for(const j of[5.26,6.62])bentTube(H,R,[[.37,j,.12],[1.56,j,.93],[1.56,j,.12],[.37,j,.93]],2,'teal');
  const iron=H.p(.92,5.85,1.05);surface(H,R,[[iron[0]-13,iron[1]+2],[iron[0]+13,iron[1]-2],[iron[0]+5,iron[1]-11],[iron[0]-11,iron[1]-9]],'blue',.65);stroke(H,R,[[iron[0]-7,iron[1]-9],[iron[0]-5,iron[1]-19],[iron[0]+5,iron[1]-17],[iron[0]+7,iron[1]-7]],'sun',3);stroke(H,R,[[iron[0]-11,iron[1]-6],H.p(.28,5.27,.55),H.p(.14,5.2,1.53)],'blue',.8);metal(H,R,.11,5.04,.21,.34,1.32,.31,'paper');
  drape(H,R,.78,6.07,.72,.63,1.06,.48,'paper');
  timber(H,R,.46,9.61,2.38,1.1,.51,.13,'sun');for(const i of[.66,2.33])timber(H,R,i,9.76,.19,.83,0,.51,'sun');cushion(H,R,.67,9.73,1.34,.81,.66,.1,'teal');
  const mirror=[H.p(1.52,9.2,.73),H.p(2.57,9.2,.73),H.p(2.4,8.96,2.37),H.p(1.68,8.96,2.37)];surface(H,R,mirror,'sun',.5);surface(H,R,[H.p(1.67,9.18,.87),H.p(2.41,9.18,.87),H.p(2.29,8.97,2.2),H.p(1.78,8.97,2.2)],'paper',1);H.line(R,[H.p(1.82,9.14,1),H.p(2.02,8.99,2.1)],'teal',1.4,{tone:.25});
  for(const i of[9.85,11.22])for(const j of[7.83,10.58])metal(H,R,i,j,.12,.12,.02,1.73,'teal');
  bentTube(H,R,[[9.85,7.83,.18],[11.22,7.83,1.68]],1.2,'teal');
  for(const z of[.4,1.09,1.75]){timber(H,R,9.8,7.78,1.58,2.91,z,.11,'sun');if(z>.5){for(const j of[8.05,9.28]){surface(H,R,H.tile(9.96,j,1.25,.96,z+.13),'paper',1);if(z<1.5){for(let n=0;n<4;n++)stroke(H,R,[H.p(10.08+n*.22,j+.12,z+.14),H.p(10.1+n*.22,j+.77,z+.14)],n%2?'coral':'teal',1.8);}else{cushion(H,R,10.06,j+.06,1.06,.77,z+.14,.09,j<9?'coral':'paper');H.line(R,[H.p(10.61,j+.05,z+.25),H.p(10.61,j+.84,z+.25)],'sun',1.5);}}}}
  box(H,R,9.88,7.86,1.37,2.7,.15,.23,'teal',.4);for(const j of[8.0,9.25,10.41]){timber(H,R,9.87,j,1.38,.12,.39,.19,'sun');for(let n=0;n<4;n++)oval(H,R,...H.p(10.04+n*.28,j+.39,.42),3,2.1,n%2?'blue':'sun',.65);}
  for(const j of[8.26,9.5,10.46])vessel(H,R,10.81,j,.43,4,8,'paper',false);
},(H,R,time)=>{
  const t=((time%20)+20)%20,m=ease(4,8,t)*(1-ease(12,18,t)),lift=ease(0,3.9,t)*(1-ease(4,7.7,t))+ease(12,14,t)*(1-ease(14,18,t));
  const a=H.p(7.6,4.94,1.21),b=H.p(5.21,5.03,1.29),x=a[0]*(1-m)+b[0]*m,y=a[1]*(1-m)+b[1]*m-lift*14;
  const hand=[x+m*.8,y-50-m*6],foot=[hand[0]+18,hand[1]+55+lift*14],pi=(foot[1]/16+foot[0]/32)/2,pj=(foot[1]/16-foot[0]/32)/2;
  H.clip([[foot[0]-45,foot[1]-100],[foot[0]+30,foot[1]-100],[foot[0]+30,foot[1]-22],[foot[0]-45,foot[1]-22]],()=>actor(H,R,pi,pj,0,'hold',{shirt:['coral',.5],face:'sw',hairStyle:'bun',prop:(A,B,p)=>{stroke(A,B,[p.nearHand,[(p.nearHand[0]+hand[0])/2,p.nearHand[1]-6],hand],'coral',3.4);stroke(A,B,[p.farHand,[(p.farHand[0]+hand[0])/2,p.farHand[1]-5],[hand[0]-4,hand[1]+3]],'coral',3);}},0,1.4));
  bag(H,R,x,y,m,t);oval(H,R,...hand,2.4,2.4,'coral',.3);
  const lp=H.p(10.93,.32,2.73),ls=Math.sin(t*Math.PI*2/20)*1.4;stroke(H,R,[[lp[0],lp[1]-14],[lp[0],lp[1]]],'blue',.7);surface(H,R,[[lp[0]-8,lp[1]],[lp[0]+8,lp[1]],[lp[0]+9+ls,lp[1]+21],[lp[0]-8+ls,lp[1]+23]],'coral',.19);H.line(R,[[lp[0]-5+ls,lp[1]+18],[lp[0]+7+ls,lp[1]+17]],'paper',1);
  actor(H,R,5.78,8.21,t,'hanoiSilkClient',{shirt:['teal',.55],face:'sw',prop:(A,B,p)=>{const h=p.nearHand;stroke(A,B,[[h[0]-2,h[1]],[h[0]-8,h[1]+12],[h[0]-6,h[1]+29]],'sun',1.3);}},0,1.38);
});
room.loopSeconds=20;
room.stillTime=10;
export default room;
