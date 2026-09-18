import { world, box, shape, stroke, oval, actor, wallPt, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, benchFrame, bentTube, drape, floorLight } from '../materials.js';
import { cabinetFrame, archedBay, masonry } from '../structure.js';
import { recessedFrame, cornice, taskLight } from '../joinery.js';

const ease=v=>{const q=Math.max(0,Math.min(1,v));return q*q*(3-2*q);};
const rest={...FIGURES.clips.idle.keys[0][1]};
FIGURES.clips.mexicoBookSeller={dur:16,keys:[[0,{...rest,head:18,ar:-40,er:-30}],[.3,{...rest,head:20,ar:-84,er:-24,lean:-5}],[.6,{...rest,head:18,ar:-84,er:-24,lean:-5}],[1,{...rest,head:18,ar:-40,er:-30}]]};
FIGURES.clips.mexicoBookReader={dur:16,keys:[[0,{...rest,head:10,al:28,el:65}],[.48,{...rest,head:18,lean:-7,al:28,el:65}],[.65,{...rest,head:18,lean:-7,al:28,el:65}],[1,{...rest,head:10,al:28,el:65}]]};
const colors=['coral','teal','sun','paper','blue'];
function spines(H,R,i,j,w,z,h,count=10){
  for(let k=0;k<count;k++) {
    const bw=w/count*.86, x=i+k*w/count, bh=h*(.67+((k*7)%5)*.064);
    const front=H.faceI(x,j,bw,z,z+bh);
    surface(H,R,front,colors[k%5],k%5===3?1:.6,.5);
    surface(H,R,H.tile(x,j-.31,bw,.31,z+bh),'paper',.9,.45);
    for(const f of [.15,.77]) H.line(R,[H.p(x+.02,j+.005,z+bh*f),H.p(x+bw-.02,j+.005,z+bh*f)],k%2?'sun':'paper',.75);
    if(k===3) surface(H,R,H.faceI(x-.01,j+.01,bw+.02,z+bh*.3,z+bh*.6),'coral',.45,.45);
  }
}
function bird(H,R,i,j,z){
  const p=H.p(i,j,z);
  shape(H,R,[[p[0]-7,p[1]],[p[0]-2,p[1]-7],[p[0]+3,p[1]-3],[p[0]+9,p[1]-5],[p[0]+5,p[1]+1]],'paper',1,.65);
  H.line(R,[[p[0]-3,p[1]-1],[p[0]+3,p[1]-3]],'coral',.65);
  H.dot(p[0]+4,p[1]-3,.7,'blue');
}
function cabinet(H,R){
  H.tint(H.tile(3.15,3.14,3.93,2.04,.015),'blue',.21);
  for(const x of [3.45,6.62]) for(const y of [3.18,4.45]) {
    metal(H,R,x-.08,y-.09,.16,.17,.22,.18,'teal');
    oval(H,R,...H.p(x,y,.16),5,5.8,'blue',.9);
    oval(H,R,...H.p(x,y,.16),2.1,2.5,'paper',1);
    H.line(R,[H.p(x-.15,y+.06,.17),H.p(x+.14,y+.06,.17)],'coral',2.2);
  }
  cabinetFrame(H,R,3.18,3.0,3.94,1.72,.37,1.79,3,'sun',(i,j,w,d,z,h,n)=>{
    timber(H,R,i,j,w,d,z+.68,.085,'sun');
    spines(H,R,i+.035,j+d-.03,w-.07,z+.78,.57,6);
    if(n===1) for(let k=0;k<4;k++) box(H,R,i+.05+k*.02,j+.17,w-.1,d-.35,z+.06+k*.11,.09,colors[k],.61);
    else spines(H,R,i+.04,j+d-.025,w-.08,z+.07,.54,4);
  });
  for(const x of [3.18,6.96]) {
    timber(H,R,x,3.03,.16,1.65,.4,1.76,'sun');
    for(const z of [.56,1.98]) metal(H,R,x-.035,4.71,.23,.08,z,.14,'teal');
  }
  surface(H,R,H.faceJ(7.14,3.18,1.28,.59,1.84),'teal',.31,.65);
  for(let n=0;n<3;n++) H.line(R,[H.p(7.16,3.34+n*.35,.73),H.p(7.16,3.34+n*.35,1.64)],'sun',1.1);
  timber(H,R,3.12,2.96,4.06,1.81,2.16,.1,'sun');
  for(const x of [3.24,5.24]) {
    surface(H,R,[H.p(x,3.0,2.27),H.p(x+1.55,3.0,2.27),H.p(x+1.55,2.6,2.93),H.p(x,2.6,2.93)],'teal',.48);
    surface(H,R,[H.p(x+.11,2.98,2.32),H.p(x+1.4,2.98,2.32),H.p(x+1.4,2.65,2.86),H.p(x+.11,2.65,2.86)],'paper',1,.55);
    surface(H,R,[H.p(x+.3,2.96,2.36),H.p(x+1.12,2.96,2.36),H.p(x+1.12,2.72,2.75),H.p(x+.3,2.72,2.75)],x<4?'coral':'sun',.43,.45);
    timber(H,R,x,2.96,1.55,.16,2.24,.1,'sun');
  }

  surface(H,R,H.tile(3.39,3.22,1.61,.93,2.27),'paper',1);
  surface(H,R,H.tile(3.48,3.28,1.42,.8,2.278),'teal',.22,.55);
  surface(H,R,[H.p(3.57,3.93,2.285),H.p(3.86,3.5,2.285),H.p(4.21,3.77,2.285),H.p(4.74,3.49,2.285),H.p(4.74,3.97,2.285)],'coral',.58,.55);
  for(let k=0;k<3;k++) box(H,R,5.55+k*.03,3.18,1.19,.78,2.26+k*.1,.085,colors[k],.55);
  bentTube(H,R,[[7.21,3.2,1.44],[7.43,3.2,1.44],[7.43,4.4,1.44],[7.21,4.4,1.44]],2.6,'blue');
}
const room=world('mexico-city-book-arcade','The drawer hides another cover',{wall:'paper',wallTone:.7,height:4.3,head:42,floor:'sun',tone:.15,pattern:'tiles'},(H,R)=>{
  for(const side of ['ne','nw']) cornice(H,R,side,.18,11.65,4.04,'sun');
  for(const j of [.24,5.31,10.91]) {
    box(H,R,.12,j,.43,.31,.05,3.93,'paper',1);
    box(H,R,.1,j-.12,.53,.56,.11,.22,'sun',.38);
    box(H,R,.1,j-.1,.52,.52,3.74,.19,'sun',.4);
  }
  masonry(H,R,'ne',.1,11.8,0,.73,'coral',.24);
  cornice(H,R,'ne',.2,11.8,4.08,'sun');
  archedBay(H,R,'ne',.82,5.6,.35,3.64,'blue',P=>{
    surface(H,R,[P(.14,.13),P(5.46,.13),P(5.46,3.5),P(.14,3.5)],'sun',.21);
    surface(H,R,[P(.2,.19),P(1.9,.19),P(1.9,2.81),P(.2,2.81)],'blue',.38);
    for(let n=0;n<5;n++) H.line(R,[P(2.15+n*.58,.19),P(2.15+n*.58,1.13)],'teal',2);
  });
  for(let n=0;n<13;n++) {
    const a=Math.PI*n/12;
    H.line(R,[wallPt(H,'ne',3.62+Math.cos(a)*2.75,3.03+Math.sin(a)*.96,-.29),wallPt(H,'ne',3.62+Math.cos(a)*3.0,3.03+Math.sin(a)*1.15,-.3)],'coral',.9,{tone:.56});
  }
  surface(H,R,H.tile(.82,.1,5.6,1.7,.055),'sun',.18,.65);
  for(let n=0;n<5;n++) H.line(R,[H.p(.96+n*1.08,.1,.063),H.p(.96+n*1.08,1.75,.063)],'blue',.7,{tone:.32});
  for(const x of [.46,6.5]) {
    box(H,R,x,.08,.38,.54,.03,3.64,'paper',1);
    box(H,R,x-.09,.07,.58,.65,.08,.29,'sun',.31);
    box(H,R,x-.07,.07,.54,.65,3.48,.22,'sun',.31);
  }
  cabinetFrame(H,R,7.18,.36,4.12,1.46,.1,3.57,3,'coral',(i,j,w,d,z,h,n)=>{
    for(let row=0;row<4;row++) {
      const level=z+row*.83;
      timber(H,R,i,j,w,d,level,.1,'coral');
      if(row===0&&n===2) { box(H,R,i+.08,j+.17,w-.16,d-.32,level+.11,.48,'paper',1); H.line(R,[H.p(i+.18,j+d-.12,level+.35),H.p(i+w-.2,j+d-.12,level+.35)],'teal',1.4); }
      else if(row===2&&n===1) { for(let k=0;k<4;k++) box(H,R,i+.09+k*.016,j+.12,w-.18,d-.2,level+.1+k*.1,.085,colors[k],.7); bird(H,R,i+w-.17,j+d-.13,level+.6); }
      else spines(H,R,i+.02,j+d-.03,w-.04,level+.11,.66,6+n);
    }
  });
  recessedFrame(H,R,'nw',1.5,4.5,1.62,2.1,'teal',P=>{
    for(let n=0;n<2;n++) {
      const x=.26+n*2.05;
      surface(H,R,[P(x,.2),P(x+1.74,.2),P(x+1.74,1.88),P(x,1.88)],'paper',1);
      surface(H,R,[P(x+.15,.42),P(x+1.59,.42),P(x+1.59,1.67),P(x+.15,1.67)],n?'sun':'teal',.2);
      for(let k=0;k<4;k++) surface(H,R,[P(x+.2+k*.32,.48),P(x+.46+k*.32,.48),P(x+.46+k*.32,.87+k%2*.2),P(x+.2+k*.32,1.09+k%2*.16)],n?'coral':'blue',.5,.55);
      H.line(R,[P(x+.35,.44),P(x+.97,1.66)],'paper',2);
    }
  });
  surface(H,R,H.faceJ(.3,5.71,3.09,.17,.78),'blue',.65);
  benchFrame(H,R,.4,5.6,1.38,3.4,.88,'teal');
  for(let n=0;n<3;n++) {
    const j=5.77+n*.99;
    surface(H,R,H.faceJ(1.79,j,.86,.2,.75),'sun',.52,.7);
    for(const z of [.36,.57]) { H.line(R,[H.p(1.805,j+.07,z),H.p(1.805,j+.78,z)],'blue',.75); H.line(R,[H.p(1.81,j+.32,z+.1),H.p(1.81,j+.57,z+.1)],'blue',1.5); }
  }
  for(const j of [5.73,8.68]) timber(H,R,.45,j,1.2,.11,.9,.27,'teal');
  surface(H,R,H.tile(.51,5.73,1.11,2.95,.9),'paper',1,.55);
  for(let n=0;n<3;n++) box(H,R,.64,6.08+n*.35,.78,.3,.92,.16,n===1?'sun':'coral',.42);
  taskLight(H,R,.84,8.52,.94,'teal',.4);
  metal(H,R,.46,5.88,.17,2.63,1.39,.1,'teal');
  for(let n=0;n<4;n++) {
    surface(H,R,[H.p(.49,6.01+n*.49,1.49),H.p(.49,6.38+n*.49,1.49),H.p(.46,6.38+n*.49,1.91),H.p(.46,6.01+n*.49,1.91)],n===2?'sun':'paper',.9,.45);
    H.line(R,[H.p(.5,6.1+n*.49,1.6),H.p(.5,6.3+n*.49,1.79)],'coral',.8);
  }

  for(let k=0;k<3;k++) box(H,R,.72,5.87+k*.05,.8,.6,.93+k*.1,.08,colors[k],.55);
  for(let k=0;k<4;k++) {
    bentTube(H,R,[[.31,9.15+k*.33,.1],[.25,9.15+k*.33,1.38+k%2*.2]],7,'paper');
    oval(H,R,...H.p(.25,9.15+k*.33,1.38+k%2*.2),4,1.8,'blue',.55);
  }
  timber(H,R,.05,8.98,.8,1.7,.04,.12,'sun');
  floorLight(H,5.24,5.59,116,.43);
  cabinet(H,R);
  benchFrame(H,R,2.25,9.1,3.3,1.6,.8,'sun');
  timber(H,R,2.42,9.22,2.89,1.12,.27,.1,'sun');
  for(let n=0;n<3;n++) {
    box(H,R,2.6+n*.04,9.37,1.12,.82,.39+n*.12,.095,colors[n],.51);
    box(H,R,4.1+n*.015,9.33,.83,.99,.39+n*.1,.08,colors[4-n],.51);
  }
  for(const x of [2.28,5.37]) timber(H,R,x,9.19,.13,1.37,.81,.19,'sun');
  drape(H,R,2.62,10.12,.5,.55,.84,.38,'teal');

  box(H,R,2.48,9.35,1.34,1.02,.81,.2,'paper',1);
  for(const d of [.24,.69]) H.line(R,[H.p(2.5,9.35+d,1.03),H.p(3.8,9.35+d,1.03)],'coral',1.6);
  surface(H,R,H.tile(4.08,9.35,1.1,.97,.82),'paper',1);
  for(let k=0;k<5;k++) H.line(R,[H.p(4.19+k*.11,9.39,.83),H.p(4.19+k*.11,10.26,.83)],'blue',.55,{tone:.6});
  bentTube(H,R,[[4.17,10.37,.81],[4.17,10.39,.57],[4.78,10.39,.57],[4.78,10.37,.81]],1.2,'teal');
  timber(H,R,9.87,3.26,1.21,2.77,.14,.12,'sun');
  for(const x of [9.89,10.94]) bentTube(H,R,[[x,3.35,.24],[x,3.35,1.91],[x,5.89,.24]],2,'teal');
  for(let n=0;n<4;n++) {
    const y=3.58+n*.5;
    surface(H,R,[H.p(9.97,y,.33),H.p(10.83,y,.33),H.p(10.83,y-.28,1.32),H.p(9.97,y-.28,1.32)],'paper',1,.7);
    surface(H,R,[H.p(10.08,y-.04,.48),H.p(10.7,y-.04,.48),H.p(10.7,y-.24,1.17),H.p(10.08,y-.24,1.17)],colors[n],.36,.5);
    bentTube(H,R,[[9.9,y+.05,.34],[10.94,y+.05,.34]],1.4,'sun');
  }
  box(H,R,7.54,9.4,.76,.66,0,.45,'coral',.43);
  for(const x of [7.57,8.24]) bentTube(H,R,[[x,9.43,0],[x,9.98,.45],[x,9.98,0],[x,9.43,.45]],1.7,'blue');
  const mag=H.p(7.88,9.73,.48); oval(H,R,...mag,7,4,'paper',.55); H.line(R,[[mag[0]+6,mag[1]+3],[mag[0]+14,mag[1]+9]],'blue',2.8);
  surface(H,R,H.tile(8.46,9.35,.93,.58,.02),'paper',1);
  H.line(R,[H.p(8.58,9.45,.04),H.p(9.26,9.83,.04)],'teal',2.4);
  box(H,R,9.87,9.44,1.31,1.16,.04,.55,'sun',.35);
  surface(H,R,H.tile(9.99,9.56,1.06,.92,.6),'blue',.68);
  for(let n=0;n<3;n++) box(H,R,10.08+n*.05,9.65,.8,.62,.62+n*.12,.09,colors[n],.45);
  surface(H,R,[H.p(9.87,9.44,.61),H.p(9.87,10.6,.61),H.p(9.52,10.6,.91),H.p(9.52,9.44,.91)],'paper',.9,.6);
  surface(H,R,[H.p(11.18,9.44,.61),H.p(11.18,10.6,.61),H.p(11.44,10.6,.78),H.p(11.44,9.44,.78)],'sun',.34,.6);
  bentTube(H,R,[[10.32,10.72,.63],[10.11,10.92,.13],[10.54,11.14,.05],[10.96,10.86,.05]],1.2,'teal');

},(H,R,t)=>{
  const u=((t%16)+16)%16;
  const draw=ease((u-3.2)/1.8)*(1-ease((u-12)/2));
  const spread=ease((u-4.7)/1.7)*(1-ease((u-9.6)/2.4));
  const j=4.46+1.15*draw,z=1.48;
  for(const x of [3.67,6.63]) {
    metal(H,R,x,4.25,.1,.8+draw*1.2,1.34,.11,'blue');
    H.line(R,[H.p(x+.02,4.25,1.46),H.p(x+.02,4.88+draw*1.2,1.46)],'paper',1.2);
  }
  timber(H,R,3.47,j-.87,3.26,1.25,z-.11,.11,'sun');
  timber(H,R,3.47,j+.37,3.26,.12,z-.13,.35,'sun');
  H.line(R,[H.p(4.67,j+.505,z),H.p(5.49,j+.505,z)],'blue',2.8);
  if(draw>.02) for(const x of [3.63,6.41]) bentTube(H,R,[[x,4.4,.84],[x,j+.3,z-.12],[x,4.4,z-.12]],2.2,'teal');
  for(const x of [3.65,6.35]) {
    surface(H,R,[H.p(x,j-.71,z+.005),H.p(x+.14,j-.71,z+.04),H.p(x+.14,j+.2,z+.04),H.p(x,j+.2,z+.005)],'teal',.4,.4);
  }
  for(const x of [4.3,5.6]) box(H,R,x,j-.71,.22,.9,z+.003,.025,'teal',.22);
  const spine=4.98;
  box(H,R,spine,j-.72,1.3,.94,z+.018,.075,'coral',.65);
  surface(H,R,H.tile(spine+.035,j-.69,1.23,.88,z+.1),'paper',1);
  const a=spread*Math.PI;
  const P=(x,y,h=0)=>H.p(spine+x*Math.cos(a),j-.72+y,z+.112+x*Math.sin(a)+h);
  surface(H,R,[P(0,0),P(1.3,0),P(1.3,.94),P(0,.94)],'coral',.75,.8);
  if(spread>.5)surface(H,R,[P(.035,.035,.007),P(1.26,.035,.007),P(1.26,.89,.007),P(.035,.89,.007)],'paper',1,.6);
  for(let k=0;k<4;k++) {
    const x=spine+.11+k*.27;
    surface(H,R,[H.p(x,j-.5,z+.118),H.p(x+.21,j-.5,z+.118),H.p(x+.21,j-.1,z+.118),H.p(x,j-.18,z+.118)],colors[k],.44,.45);
  }
  if(spread>.52) {
    const Q=(x,y)=>P(x,y,.02);
    surface(H,R,[Q(.15,.15),Q(.98,.15),Q(.98,.67),Q(.15,.67)],'teal',.21,.45);
    stroke(H,R,[Q(.17,.59),Q(.41,.36),Q(.63,.51),Q(.95,.23)],'coral',1.4);
  }
  const atBook=ease((u-4.1)/.6)*(1-ease((u-12)/.7));
  const si=7-1.7*atBook,sj=4.9+draw*.95+atBook*.2;
  actor(H,R,si,sj,t,'mexicoBookSeller',{face:'sw',shirt:['teal',.77],apron:['sun',.42],hairStyle:'bun'});
  const pull=H.p(6.67,j+.35,1.56),hinge=P(.08,.85,.025);
  const hand=[pull[0]+(hinge[0]-pull[0])*atBook,pull[1]+(hinge[1]-pull[1])*atBook],shoulder=H.p(si,sj,1.34);
  stroke(H,R,[shoulder,[hand[0]+9,hand[1]+7],hand],'teal',4.9);
  oval(H,R,...hand,2.3,2.3,'coral',.3);
  actor(H,R,8.59,7.36,t,'mexicoBookReader',{face:'sw',shirt:['coral',.67],hairStyle:'curly'});
  const sway=Math.sin(t*Math.PI*2/16)*.04;
  surface(H,R,[H.p(.18,6.5,2.82),H.p(.18,7.47,2.82),H.p(.29+sway,7.51,1.71),H.p(.23+sway,6.47,1.68)],'paper',.85,.7);
  for(let n=0;n<5;n++) H.line(R,[H.p(.19,6.58+n*.17,2.77),H.p(.26+sway,6.6+n*.17,1.74)],'teal',.65,{tone:.6});
});
room.loopSeconds=16;
room.stillTime=8;
export default room;
