import { world, box, shape, stroke, oval, actor, wallPt, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, benchFrame, bentTube, cushion, floorLight } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { windowBay, recessedFrame } from '../joinery.js';

const smooth=v=>{const q=Math.max(0,Math.min(1,v));return q*q*(3-2*q);};
const rest={...FIGURES.clips.idle.keys[0][1]};
FIGURES.clips.mexicoSeedGrower={dur:22,keys:[[0,{...rest,al:52,ar:-65,el:48,er:-25,head:16}],[.44,{...rest,al:56,ar:-72,el:40,er:-30,head:23}],[.62,{...rest,al:56,ar:-72,el:40,er:-30,head:23}],[1,{...rest,al:52,ar:-65,el:48,er:-25,head:16}]]};
function jar(H,R,i,j,z,ink='coral',scale=1){
  const p=H.p(i,j,z),P=(x,y)=>[p[0]+x*scale,p[1]+y*scale];
  surface(H,R,[P(-5,0),P(5,0),P(5.5,-12),P(4,-15),P(-4,-15),P(-5.5,-12)],'paper',1,.65);
  surface(H,R,[P(-4,0),P(4,0),P(4,-8),P(-4,-8)],ink,.46,.4);
  for(let n=0;n<7;n++) {const x=-2.5+(n%3)*2.5,y=-2-Math.floor(n/3)*2.4; oval(H,R,...P(x,y),.9*scale,.65*scale,ink,.85);}
  oval(H,R,...P(0,-15),5*scale,1.9*scale,'teal',.67);
  H.line(R,[P(-3.2,-11),P(-3.2,-2)],'paper',1.5);
  H.line(R,[P(-4,-13),P(4,-13)],'blue',.65);
}
function basket(H,R,i,j,z,w=1.2,d=.85,h=.5){
  box(H,R,i,j,w,d,z,h,'sun',.37);
  surface(H,R,H.tile(i+.1,j+.1,w-.2,d-.2,z+h+.01),'blue',.55,.6);
  for(let k=0;k<7;k++) H.line(R,[H.p(i+.08+k*(w-.16)/6,j+d+.008,z+.06),H.p(i+.08+k*(w-.16)/6,j+d+.008,z+h-.01)],'coral',.65,{tone:.67});
  for(let k=0;k<4;k++) H.line(R,[H.p(i+.04,j+d+.016,z+.08+k*(h-.12)/3),H.p(i+w-.04,j+d+.016,z+.08+k*(h-.12)/3)],'paper',.75);
  for(const x of [i+.16,i+w-.16]) bentTube(H,R,[[x,j+.2,z+h],[x,j+.2,z+h+.2],[x,j+d-.2,z+h+.2],[x,j+d-.2,z+h]],1.3,'sun');
}
function cob(H,R,i,j,z){
  const pts=[];for(let n=0;n<24;n++){const a=n*Math.PI*2/24;pts.push(H.p(i+Math.cos(a)*.47,j+Math.sin(a)*.15,z+.06));}
  surface(H,R,pts,'sun',.8,.7);
  for(let r=0;r<3;r++) for(let n=0;n<8;n++) {
    if(r===1&&n===5)continue;
    oval(H,R,...H.p(i-.36+n*.1,j-.085+r*.082+(n===4?.025:0),z+.072),1.35,1.05,r===1?'coral':'paper',.58);
  }
  surface(H,R,[H.p(i-.42,j,z),H.p(i-.8,j+.08,z+.04),H.p(i-.65,j-.12,z+.06)],'paper',1,.55);
}
function dryingHead(H,R,i,j,z,size=1,sway=0){
  const P=(x,y,h)=>H.p(i+x+Math.sin(sway)*h*.02,j+y,z-h);
  stroke(H,R,[P(0,0,0),P(.02,0,.54*size),P(.14,0,1.05*size)],'coral',1.5);
  for(let k=0;k<7;k++) {
    const h=.35+k*.095;
    for(const side of [-1,1]) {const a=P(.025,0,h*size),b=P(side*(.19-k*.015)*size,0,(h+.13)*size);stroke(H,R,[a,b],'sun',1.2);oval(H,R,...b,2.7*size,1.8*size,k%2?'sun':'coral',.61);}
  }
}
function mat(H,R,P){
  surface(H,R,[P(.08,.04),P(2.32,.04),P(2.32,1.17),P(.08,1.17)],'sun',.42,.7);
  for(let k=0;k<13;k++) H.line(R,[P(.12+k*.17,.08),P(.12+k*.17,1.12)],'coral',.6,{tone:.56});
  for(let k=0;k<7;k++) H.line(R,[P(.11,.09+k*.16),P(2.28,.09+k*.16)],'paper',.75);
  for(const y of [.07,1.14]) H.line(R,[P(.1,y),P(2.3,y)],'blue',1);
}
const room=world('mexico-city-seed-drawers','The next crop fits a drawer',{wall:'paper',wallTone:.74,height:4.1,head:40,floor:'sun',tone:.13,pattern:'tiles',accent:'teal'},(H,R)=>{
  masonry(H,R,'nw',.1,11.8,0,.65,'coral',.17);
  surface(H,R,[wallPt(H,'ne',.12,.12,-.13),wallPt(H,'ne',11.85,.12,-.13),wallPt(H,'ne',11.85,.62,-.13),wallPt(H,'ne',8.4,.69,-.13),wallPt(H,'ne',7.1,.53,-.13),wallPt(H,'ne',3.8,.66,-.13),wallPt(H,'ne',.12,.58,-.13)],'teal',.16,.5);
  recessedFrame(H,R,'nw',7.33,3.22,1.62,1.48,'sun',P=>{
    surface(H,R,[P(.13,.12),P(3.08,.12),P(3.08,1.34),P(.13,1.34)],'paper',1);
    for(let n=0;n<2;n++){
      const cx=.86+n*1.47, ring=[];
      for(let k=0;k<32;k++){const a=k*Math.PI*2/32;ring.push(P(cx+Math.cos(a)*.53,.71+Math.sin(a)*.48));}
      surface(H,R,ring,'sun',.24,.65);
      H.clip(ring,()=>{
        for(let k=0;k<8;k++){
          H.line(R,[P(cx-.7+k*.17,.12),P(cx-.7+k*.17,1.3)],'teal',.55,{tone:.58});
          H.line(R,[P(cx-.65,.15+k*.16),P(cx+.65,.15+k*.16)],'teal',.55,{tone:.58});
        }
      });
      H.outline(R,ring,'coral',2,{tone:.65,amp:.1});
      H.line(R,[P(cx,1.19),P(cx,1.33)],'blue',1.3);
      H.dot(...P(cx,1.34),1.5,'blue');
    }
  });
  windowBay(H,R,'nw',2.08,3.64,1.72,1.9,{divisions:2,ink:'teal',view:P=>{
    for(let n=0;n<6;n++) { H.line(R,[P(.3+n*.57,.16),P(.45+n*.57,.82+n%2*.2)],'teal',1.2); H.line(R,[P(.42+n*.57,.59),P(.12+n*.57,.82)],'teal',1); }
  }});
  recessedFrame(H,R,'ne',1.15,2.82,3.15,.53,'teal',P=>{for(let n=0;n<9;n++)H.line(R,[P(.19+n*.3,.12),P(.19+n*.3,.42)],'blue',1.2);});
  for(const x of [2.0,6.77]) timber(H,R,x,.29,.19,.21,.12,3.73,'sun');
  timber(H,R,1.94,.23,5.1,.3,3.62,.16,'sun');
  for(const x of [2.02,6.72]) bentTube(H,R,[[x,.3,3.18],[x+.33,.3,3.6]],2,'blue');
  for(let n=0;n<6;n++) dryingHead(H,R,2.38+n*.76,.47,3.55,.75+n%2*.16);
  for(const x of [3.03,7.34]) timber(H,R,x,3.34,.21,1.8,.1,1.68,'sun');
  cabinetFrame(H,R,3.0,3.33,4.62,1.82,.24,1.57,3,'sun',(i,j,w,d,z,h,n)=>{
    for(let row=0;row<4;row++) {
      const level=z+.05+row*.32;
      if(n===0&&row>=2) {surface(H,R,H.faceI(i,j+d,w,level,level+.29),'blue',.84);continue;}
      box(H,R,i+.025,j+.07,w-.05,d-.08,level,.27,n===1?'sun':'paper',n===1?.37:1);
      const pull=H.p(i+w*.5,j+d+.015,level+.14);
      if(n===2&&row===1) stroke(H,R,[[pull[0]-4,pull[1]],[pull[0]-4,pull[1]+5],[pull[0]+4,pull[1]+5],[pull[0]+4,pull[1]]],'coral',1.1);
      else {oval(H,R,...pull,3,1.5,'blue',.64);H.line(R,[[pull[0]-2,pull[1]-.5],[pull[0]+2,pull[1]-.5]],'paper',.7);}
    }
  });
  surface(H,R,[H.p(2.94,3.27,1.94),H.p(7.69,3.27,1.94),H.p(7.69,5.2,1.82),H.p(2.94,5.2,1.82)],'sun',.46,.95);
  surface(H,R,[H.p(2.94,5.2,1.82),H.p(7.69,5.2,1.82),H.p(7.69,5.2,1.73),H.p(2.94,5.2,1.73)],'blue',.42,.7);
  box(H,R,3.35,3.75,1.48,.98,1.9,.11,'paper',1);
  for(let k=0;k<6;k++) H.line(R,[H.p(3.45+k*.24,3.79,2.02),H.p(3.45+k*.24,4.66,2.02)],'teal',.6);
  cob(H,R,6.64,4.94,1.87);
  jar(H,R,5.18,3.96,1.94,'sun',.9);
  cabinetFrame(H,R,8.41,.48,2.96,1.69,.15,3.31,2,'teal',(i,j,w,d,z,h,n)=>{
    for(const a of [1.05,2.18]) timber(H,R,i,j,w,d,z+a,.1,'sun');
    if(n===0){basket(H,R,i+.06,j+.13,z+.1,w-.12,d-.2,.65);for(let k=0;k<3;k++)jar(H,R,i+.23+k*.4,j+d-.2,z+1.16,k%2?'coral':'sun',.8);basket(H,R,i+.06,j+.13,z+2.29,w-.12,d-.2,.59);}
    else{
      cushion(H,R,i+.08,j+.11,w-.16,d-.2,z+.1,.2,'paper');cushion(H,R,i+.08,j+.11,w-.16,d-.2,z+.32,.19,'paper');
      for(let k=0;k<3;k++){metal(H,R,i+.12+k*.3,j+.16,.06,d-.25,z+1.15,.73,'teal');for(let q=0;q<5;q++)H.line(R,[H.p(i+.14+k*.3,j+.22,z+1.2+q*.13),H.p(i+.14+k*.3,j+d-.16,z+1.2+q*.13)],'blue',.5);}
      box(H,R,i+.09,j+.18,w-.18,d-.35,z+2.28,.19,'sun',.5);shape(H,R,[H.p(i+.28,j+.52,z+2.48),H.p(i+.88,j+.52,z+2.48),H.p(i+.88,j+.89,z+2.48),H.p(i+.28,j+.89,z+2.48)],'paper',1,.6);H.line(R,[H.p(i+.28,j+.52,z+2.49),H.p(i+.59,j+.75,z+2.49),H.p(i+.88,j+.52,z+2.49)],'teal',.6);
    }
  });
  benchFrame(H,R,.48,7.01,1.86,3.24,.68,'sun');
  surface(H,R,H.tile(.67,7.24,1.49,1.41,.7),'paper',1);
  cob(H,R,1.3,7.86,.75);
  basket(H,R,.75,9.04,.7,1.1,.81,.17);
  bentTube(H,R,[[1.04,9.32,.92],[1.57,9.64,.92]],1.5,'teal');oval(H,R,...H.p(1.62,9.67,.93),4,2,'sun',.7);
  for(const [i,j]of[[.83,8.77],[1.2,8.92]])shape(H,R,[H.p(i,j,.72),H.p(i+.56,j+.05,.72),H.p(i+.31,j+.21,.76)],'coral',.47,.6);
  bentTube(H,R,[[10.8,6.7,.04],[10.8,6.7,2.96]],3,'sun');
  bentTube(H,R,[[10.4,6.87,.04],[10.4,6.87,1.96],[10.06,6.87,2.1]],2,'blue');
  for(const i of [9.13,9.72]){
    box(H,R,i,9.14,.44,.79,.05,.29,'blue',.62);box(H,R,i,9.14,.43,.4,.3,.61,'teal',.47);
    H.line(R,[H.p(i+.03,9.57,.86),H.p(i+.4,9.57,.86)],'sun',1.2);
  }
  benchFrame(H,R,8.83,7.24,1.68,1.06,.51,'sun');
  cushion(H,R,9.08,7.46,1.11,.69,.54,.19,'coral');
  stroke(H,R,[H.p(9.23,7.47,.75),H.p(9.68,8.06,.75),H.p(9.95,7.46,.75)],'paper',1.5);
  floorLight(H,4.89,6.24,123,.41);
},(H,R,t)=>{
  const u=((t%22)+22)%22;
  const opened=smooth(u/3.4)*(1-smooth((u-18.2)/1.8));
  const tray=smooth((u-.8)/3.6)*(1-smooth((u-17.5)/2.5));
  const a=smooth((u-4.4)/1.95)*(1-smooth((u-15.4)/1.95));
  const b=smooth((u-6.65)/1.95)*(1-smooth((u-13.2)/1.95));
  const positions=[{i:3.56+(5.28-3.56)*a,j:4.7+opened*.72+(5.77-5.42)*a,z:1.2+Math.sin(a*Math.PI)*.28,v:a,ink:'coral'}, {i:4.14+(6.15-4.14)*b,j:4.7+opened*.72+(5.78-5.42)*b,z:1.2+Math.sin(b*Math.PI)*.28,v:b,ink:'sun'}];
  let active=(u>=6.65&&u<15.4)?1:0;
  const q=positions[active],moving=(u>=4.4&&u<8.8)||(u>=13.2&&u<17.4);
  const walk=[[0,4.14,6.32],[4.4,4.14,6.32],[6.25,5.86,6.67],[6.65,4.72,6.32],[8.6,6.73,6.67],[9.1,7.15,7.1],[12.7,7.15,7.1],[13.2,6.73,6.67],[15.15,4.72,6.32],[15.4,5.86,6.67],[17.35,4.14,6.32],[22,4.14,6.32]];
  let first=walk[0],last=walk[1];for(let n=1;n<walk.length;n++)if(u<=walk[n][0]){first=walk[n-1];last=walk[n];break;}
  const f=smooth((u-first[0])/(last[0]-first[0]));
  const person=[first[1]+(last[1]-first[1])*f,first[2]+(last[2]-first[2])*f];
  const j=5.01+opened*.72;
  metal(H,R,3.16,4.82,.075,.54+opened*.73,.94,.06,'blue');metal(H,R,4.35,4.82,.075,.54+opened*.73,.94,.06,'blue');
  timber(H,R,3.15,j-.85,1.26,1.02,1.01,.08,'sun');
  for(const x of [3.15,4.36]) timber(H,R,x,j-.87,.06,1.1,1.08,.17,'sun');
  timber(H,R,3.15,j+.17,1.27,.075,1.0,.3,'sun');
  oval(H,R,...H.p(3.78,j+.25,1.16),4,1.8,'blue',.75);
  for(const i of [3.56,4.14]) {oval(H,R,...H.p(i,4.7+opened*.72,1.11),7,3,'blue',.7);oval(H,R,...H.p(i,4.7+opened*.72,1.12),5,2,'sun',.32);}
  const angle=(1-tray)*Math.PI*.49;
  const P=(x,y)=>H.p(4.91+x,5.2+y*Math.cos(angle),1.2-y*Math.sin(angle));
  surface(H,R,[P(0,0),P(2.45,0),P(2.45,1.27),P(0,1.27)],'sun',.55,.9);mat(H,R,P);
  for(const x of [5.06,7.15]) bentTube(H,R,[[x,5.12,.59],[x,5.21+tray*1.1,1.14],[x,5.13,1.14]],1.8,'teal');
  for(const q of positions) jar(H,R,q.i,q.j,q.z,q.ink,.91);
  actor(H,R,...person,t,'mexicoSeedGrower',{face:'sw',shirt:['teal',.72],apron:['paper',.87],hairStyle:'bun'},0,1.5);
  const hand=moving?H.p(q.i,q.j,q.z+.32):H.p(person[0]-.3,person[1]-.27,1.39),shoulder=H.p(...person,1.52);
  stroke(H,R,[shoulder,[hand[0]+7,hand[1]+8],hand],'teal',4.8);oval(H,R,...hand,2.2,2.3,'coral',.31);
  dryingHead(H,R,6.36,.48,3.55,.93,Math.sin(t*Math.PI*2/22));
  const pull=H.p(7.21,5.17,1.14),s=Math.sin(t*Math.PI*2/22)*1.3;
  stroke(H,R,[[pull[0]-4,pull[1]],[pull[0]-3+s,pull[1]+5],[pull[0]+3+s,pull[1]+5],[pull[0]+4,pull[1]]],'coral',1.1);
});
room.loopSeconds=22;
room.stillTime=11;
export default room;
