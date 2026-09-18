import { world, shape, oval, stroke, ell, actor } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, benchFrame, slattedSeat, cushion, vessel } from '../materials.js';
import { cabinetFrame, masonry, basin } from '../structure.js';

const smooth=(a,b,t)=>{const x=Math.max(0,Math.min(1,(t-a)/(b-a)));return x*x*(3-2*x);};
const rest={x:0,y:0,drop:.47,lean:0,head:0,al:42,ar:48,el:50,er:60,ll:84,lr:80,kl:-84,kr:-80,roll:0};
FIGURES.clips.barcelonaCourtFriend={dur:22,keys:[[0,rest],[.35,rest],[.5,{...rest,al:50,el:66,head:8}],[.66,{...rest,al:50,el:66,head:8}],[.91,rest],[1,rest]]};

function paddle(H,R,x,y,angle=0,size=1,ink='sun') {
  const P=(a,b)=>[x+(a*Math.cos(angle)-b*Math.sin(angle))*size,y+(a*Math.sin(angle)+b*Math.cos(angle))*size];
  H.line(R,[P(0,12),P(0,0)],'blue',5.4*size);
  H.line(R,[P(0,11),P(0,2)],'coral',3*size);
  for(let n=0;n<3;n++) H.line(R,[P(-2,3+n*3),P(2,4+n*3)],'paper',.6);
  surface(H,R,ell(x,y-7*size,10*size,13*size).map(([a,b])=>P((a-x)/size,(b-y)/size)),ink,.6,.8);
  H.line(R,[P(-3,-17),P(-4,-5),P(-2,2)],'paper',1.2);
  for(let n=0;n<3;n++) H.line(R,[P(2+n*1.2,-16),P(3+n*1.1,1)],'coral',.45,{tone:.55});
}

function player(H,R,hand,lean) {
  const [x,y]=H.p(5.96,6.03,0);
  H.tint(ell(x+2,y+1,15,4),'blue',.18);
  for(const s of [-1,1]){stroke(H,R,[[x+s*5,y-29],[x+s*8+lean*.6,y-14],[x+s*10,y]],'blue',7);oval(H,R,x+s*10+2,y,6,2.7,'paper',1);}
  shape(H,R,[[x-9+lean,y-52],[x+9+lean,y-52],[x+8,y-29],[x-8,y-29]],'coral',.64,.8);
  H.line(R,[[x-7+lean,y-46],[x+7+lean,y-46]],'paper',2);
  stroke(H,R,[[x+8+lean,y-47],[x+16,y-35],hand],'blue',7);
  stroke(H,R,[[x+8+lean,y-47],[x+16,y-35],hand],'paper',5);
  stroke(H,R,[[x-8+lean,y-47],[x-16,y-34],[x-10,y-30]],'blue',6.5);
  stroke(H,R,[[x-8+lean,y-47],[x-16,y-34],[x-10,y-30]],'paper',4.7);
  oval(H,R,...hand,2.8,2.3,'paper',1);
  oval(H,R,x+lean,y-61,7.5,8.4,'paper',1);
  surface(H,R,[[x-8+lean,y-61],[x-7+lean,y-68],[x+lean,y-71],[x+8+lean,y-66],[x+7+lean,y-62],[x+3+lean,y-65],[x-3+lean,y-64]],'blue',.83,.6);
  H.dot(x+4+lean,y-59,1,'blue');
}

const room=world('barcelona-ball-wall','One bounce under the canopy',{wall:false,floor:'paper',tone:.8,pattern:'tiles',accent:'teal',head:50},(H,R)=>{
  masonry(H,R,'nw',0,11.5,0,1.38,'teal',.35);
  masonry(H,R,'ne',0,12,0,1.62,'paper',.8);
  for(const [i,j] of [[.35,.5],[.35,9.8],[11.57,.5]]) {metal(H,R,i,j,.16,.16,.06,3.61,'teal');metal(H,R,i-.14,j-.14,.44,.44,.04,.09,'blue');}
  bentTube(H,R,[[.44,9.78,3.61],[.44,.53,3.61],[11.65,.53,3.61]],3.2,'teal');
  for(let n=0;n<5;n++) {
    const i=.52+n*2.18;
    surface(H,R,[H.p(i,.58,3.61),H.p(i+2.05,.58,3.61),H.p(i+2.05,2.03,3.37),H.p(i,2.03,3.37)],n%2?'paper':'sun',.28,.7);
    bentTube(H,R,[[i,.58,3.59],[i,2.06,3.37]],1.6,'teal');
  }
  for(const j of [2.9,5.2,7.6]) {
    metal(H,R,.4,j,.08,.08,1.42,2.12,'teal');
    for(let n=0;n<6;n++) H.line(R,[H.p(.43,j,1.55+n*.31),H.p(.43,j+2,1.55+n*.31)],'blue',.55,{tone:.5});
    for(let n=0;n<5;n++) H.line(R,[H.p(.43,j+n*.43,1.43),H.p(.43,j+n*.43,3.46)],'teal',.6);
  }
  for(const x of [.48,11.59]) {
    bentTube(H,R,[[x,.48,3.63],[x,2.18,3.32]],2.1,'teal');
    bentTube(H,R,[[x,.49,2.72],[x,1.64,3.4]],1.8,'teal');
  }
  metal(H,R,.49,1.98,11.11,.13,3.26,.16,'teal');
  for(let n=0;n<15;n++)H.line(R,[H.p(.66+n*.73,.66,3.63),H.p(.66+n*.73,1.99,3.4)],'sun',.65);
  bentTube(H,R,[[11.69,1.97,3.26],[11.69,1.97,.21],[11.47,2.32,.08]],1.8,'blue');
  surface(H,R,H.tile(.56,2.84,.59,6.67,.035),'blue',.39,.55);
  for(let n=0;n<26;n++)H.line(R,[H.p(.62,2.94+n*.245,.05),H.p(1.07,2.94+n*.245,.05)],'paper',.7);
  for(const j of [3.05,5.03]) {
    bentTube(H,R,[[.62,j,.12],[.88,j,.95],[.57,j,1.81],[.81,j,1.96]],2.2,'teal');
    bentTube(H,R,[[.88,j,.95],[.77,j+.47,.13]],2,'teal');
    surface(H,R,[H.p(.63,j,1.05),H.p(.62,j+.58,1.05),H.p(.49,j+.57,1.76),H.p(.49,j,1.76)],'sun',.44,.75);
    H.line(R,[H.p(.58,j+.12,1.11),H.p(.49,j+.12,1.66)],'paper',1.2);
  }
  H.tint(H.tile(1.4,2.63,6.51,5.1,.04),'sun',.1);
  surface(H,R,H.tile(1.51,2.65,6.35,5.1,.05),'paper',1,.6);
  for(const i of [1.59,7.75])H.line(R,[H.p(i,2.72,.055),H.p(i,7.7,.055)],'coral',2.6);
  H.line(R,[H.p(1.6,7.7,.055),H.p(7.75,7.7,.055)],'coral',2.6);
  surface(H,R,H.tile(4.32,2.87,.53,4.66,.057),'paper',1,.5);
  for(let n=0;n<4;n++)H.line(R,[H.p(4.34,3.2+n*.95,.06),H.p(4.8,3.2+n*.95,.06)],'teal',.55);
  for(const x of [1.68,7.2])surface(H,R,[H.p(x,2.28,.1),H.p(x+.3,2.28,.1),H.p(x+.3,1.61,.1),H.p(x+.3,2.28,1.62)],'teal',.3,.7);
  metal(H,R,1.52,2.21,6.22,.42,.06,2.27,'paper');
  surface(H,R,H.faceI(1.71,2.66,5.84,.31,2.12),'paper',1,.7);
  for(const x of [1.68,7.2]) {
    metal(H,R,x+.06,2.65,.11,.17,.29,1.66,'paper');
  }
  for(const x of [2.48,4.9,6.9])H.line(R,[H.p(x,2.682,.43),H.p(x,2.682,2.06)],'blue',.45,{tone:.22});
  for(const [x,z] of [[2.84,.52],[6.12,1.26],[6.65,.83]]) {
    const p=H.p(x,2.69,z);H.line(R,[[p[0]-5,p[1]-1],[p[0]+3,p[1]+2],[p[0]+7,p[1]]],'teal',.7,{tone:.44});
  }
  surface(H,R,H.faceI(1.87,2.69,.76,.69,1.22),'paper',1,.4);
  H.line(R,[H.p(1.94,2.7,.74),H.p(2.55,2.7,1.16)],'teal',.65);
  metal(H,R,1.51,2.19,6.25,.47,2.32,.13,'teal');
  metal(H,R,1.59,2.65,6.08,.15,.14,.17,'blue');
  for(const x of [1.74,7.21])metal(H,R,x,2.67,.28,.19,.13,.38,'teal');
  const scuff=H.p(5.01,2.68,1.01);H.line(R,ell(scuff[0],scuff[1],8,9),'teal',.6,{closed:true,tone:.27});
  H.line(R,[H.p(4.85,2.69,1.07),H.p(5.15,2.69,.94)],'coral',.5,{tone:.35});
  surface(H,R,H.faceI(3.18,2.69,1.31,.64,1.42),'sun',.12,.35);
  for(const z of [.73,1.03,1.32])H.line(R,[H.p(3.33,2.7,z),H.p(4.2,2.7,z)],'teal',.65);
  bentTube(H,R,[[5.4,2.39,2.46],[5.4,2.39,3.13],[5.4,3,3.13]],3,'teal');
  metal(H,R,5.13,2.21,.54,.28,2.48,.34,'blue');
  for(const x of [5.21,5.57])for(const z of [2.56,2.75])H.dot(...H.p(x,2.51,z),1.3,'sun');
  bentTube(H,R,[[5.4,2.41,2.79],[5.4,2.88,3.12]],1.8,'teal');
  metal(H,R,5.29,2.89,.23,.19,3.1,.12,'sun');
  const sw=H.p(5.4,3,3.1);oval(H,R,...sw,4.2,5,'sun',.8);H.dot(...sw,1.6,'blue');
  cabinetFrame(H,R,8.8,.79,2.65,2.15,.1,2.98,2,'teal',(x,j,w,d,z,h,n)=>{
    timber(H,R,x,j,w,d,.36,.08,'sun');timber(H,R,x,j,w,d,1.45,.08,'sun');
    if(n===0){for(let k=0;k<3;k++){const p=H.p(x+.18+k*.34,j+1.63,.68);paddle(H,R,p[0],p[1]-.7,k===2?-.18:0,.6,k===1?'paper':'sun');}for(let k=0;k<3;k++){const p=H.p(x+.24+k*.28,j+.64,1.77);oval(H,R,...p,5,5,'blue',.7);}}
    else {for(let k=0;k<3;k++){const p=H.p(x+.23,j+.43+k*.4,.43);surface(H,R,[[p[0]-7,p[1]],[p[0]+8,p[1]],[p[0]+2,p[1]-17],[p[0]-1,p[1]-17]],k===1?'paper':'coral',.6,.7);}vessel(H,R,x+.57,j+.9,1.53,8,25,'teal');}
  });
  const mesh=H.faceI(8.97,2.96,2.3,.4,2.81);H.tint(mesh,'teal',.1);H.outline(R,mesh,'blue',1.4);
  H.clip(mesh,()=>{for(let n=-5;n<20;n++){const x=8.8+n*.22;H.line(R,[H.p(x,2.97,.3),H.p(x+2.2,2.97,2.9)],'blue',.4,{tone:.45});H.line(R,[H.p(x,2.97,.3),H.p(x-2.2,2.97,2.9)],'blue',.4,{tone:.45});}});
  H.line(R,[H.p(10.15,2.99,.44),H.p(10.15,2.99,2.79)],'teal',2.2);
  metal(H,R,10.13,3.01,.2,.13,1.39,.3,'sun');
  for(const x of [9.25,10.75]) {
    const p=H.p(x,1.43,3.16);surface(H,R,[[p[0]-9,p[1]],[p[0]+9,p[1]],[p[0]+8,p[1]-13],[p[0]-8,p[1]-13]],'paper',1,.65);
    H.line(R,[[p[0]-6,p[1]-5],[p[0]+6,p[1]-5]],'coral',1.3);
  }
  for(const j of [1.12,2.26])bentTube(H,R,[[11.43,j,2.41],[11.67,j,2.41],[11.67,j,2.13]],1.4,'sun');
  const sack=H.p(11.61,1.48,1.31);surface(H,R,[[sack[0]-9,sack[1]],[sack[0]+10,sack[1]],[sack[0]+7,sack[1]-28],[sack[0]-7,sack[1]-27]],'coral',.48,.75);
  stroke(H,R,[[sack[0]-6,sack[1]-26],[sack[0]-7,sack[1]-42],[sack[0]+5,sack[1]-41],[sack[0]+7,sack[1]-26]],'blue',1.2);
  H.line(R,[[sack[0]-6,sack[1]-10],[sack[0]+7,sack[1]-10]],'paper',2);
  benchFrame(H,R,8.6,3.95,2.77,1.42,.77,'teal');
  for(const x of [8.8,11.01])H.line(R,[H.p(x,4.03,.8),H.p(x+.18,4.03,.8)],'sun',2);
  cushion(H,R,8.76,4.12,1.07,.99,.8,.12,'paper');
  for(let n=0;n<3;n++)H.line(R,[H.p(8.84+n*.28,4.16,.93),H.p(8.84+n*.28,5.06,.93)],'coral',1.2);
  benchFrame(H,R,9.04,6.16,2.41,1.24,1.01,'sun');
  timber(H,R,9.2,6.33,2.03,.92,.27,.11,'teal');
  for(const x of [9.27,10.3]) {
    metal(H,R,x,6.52,.78,.75,.39,.24,'paper');
    H.line(R,[H.p(x+.18,7.29,.52),H.p(x+.58,7.29,.52)],'teal',1.8);
  }
  metal(H,R,11.06,6.28,.29,.39,1.03,.21,'blue');
  bentTube(H,R,[[11.18,6.55,1.16],[11.5,6.55,1.16],[11.5,6.55,1.04]],1.6,'sun');
  const pad=H.p(9.87,6.81,1.06);paddle(H,R,pad[0],pad[1],.4,.72,'paper');
  for(const [i,j,c] of [[9.42,6.53,'coral'],[10.95,6.87,'teal']]) {const p=H.p(i,j,1.05);oval(H,R,...p,6,3,c,.6);oval(H,R,...p,2.2,1.2,'paper',1);}
  timber(H,R,10.42,6.3,.45,.31,1.05,.12,'paper');
  for(let n=0;n<5;n++)H.line(R,[H.p(10.49+n*.07,6.34,1.2),H.p(10.49+n*.07,6.58,1.2)],'coral',.7);
  slattedSeat(H,R,1.11,9.64,3.96,.05,'sun');
  cushion(H,R,1.26,9.83,.96,.49,.8,.13,'coral');
  benchFrame(H,R,5.7,9.72,1.01,.96,.53,'teal');timber(H,R,5.85,10.54,.69,.37,.14,.11,'sun');
  for(const x of [5.94,6.33]) H.dot(...H.p(x,10.68,.26),1.1,'blue');
  const fan=H.p(3.84,10.21,.82);surface(H,R,[[fan[0],fan[1]],[fan[0]-12,fan[1]-7],[fan[0]-6,fan[1]-17],[fan[0]+6,fan[1]-17],[fan[0]+12,fan[1]-7]],'paper',1,.7);
  for(let n=0;n<5;n++)H.line(R,[[fan[0],fan[1]],[fan[0]-9+n*4.5,fan[1]-13]],'coral',.7);
  metal(H,R,9.83,9.2,1.87,1.98,.05,.16,'teal');
  for(const x of [10.04,11.35])for(const j of [9.38,10.72])bentTube(H,R,[[x,j,.21],[x,j,.89]],2.6,'teal');
  metal(H,R,9.91,9.27,1.69,1.75,.93,.12,'paper');
  basin(H,R,10.03,9.88,1.4,.98,1.06,'paper');
  vessel(H,R,10.77,9.54,1.06,11,25,'teal');
  oval(H,R,...H.p(10.77,9.54,1.83),11,3.5,'sun',.56);
  bentTube(H,R,[[11.18,10.2,1.17],[11.18,10.2,.45],[10.52,10.2,.45],[10.52,10.69,.21]],1.6,'teal');
  const tap=H.p(10.41,10.42,1.4);H.line(R,[[tap[0]-3,tap[1]],[tap[0]+3,tap[1]]],'coral',2);
  for(const x of [10.12,11.01]){const p=H.p(x,9.62,1.08);surface(H,R,[[p[0]-3,p[1]],[p[0]+3,p[1]],[p[0]+4,p[1]-9],[p[0]-4,p[1]-9]],'paper',1,.6);oval(H,R,p[0],p[1]-9,4,1.5,'blue',.25);}
  cushion(H,R,9.32,9.55,.42,1.01,.1,.13,'paper');
  for(const x of [9.38,9.55])H.line(R,[H.p(x,9.63,.25),H.p(x,10.45,.25)],'coral',.9);
  const shoes=H.p(4.67,10.33,.05);
  for(const dx of [-5,5]) {
    oval(H,R,shoes[0]+dx,shoes[1],4.6,8,'paper',1);H.line(R,[[shoes[0]+dx-2,shoes[1]-3],[shoes[0]+dx+2,shoes[1]-1],[shoes[0]+dx-2,shoes[1]+1]],'coral',.8);
  }
  const pouch=H.p(1.62,10.87,.05);surface(H,R,[[pouch[0]-11,pouch[1]],[pouch[0]+12,pouch[1]],[pouch[0]+10,pouch[1]-20],[pouch[0]-8,pouch[1]-22]],'coral',.62,.8);
  stroke(H,R,[[pouch[0]-7,pouch[1]-21],[pouch[0]-4,pouch[1]-32],[pouch[0]+7,pouch[1]-30],[pouch[0]+8,pouch[1]-19]],'blue',1.3);
  H.line(R,[[pouch[0]-7,pouch[1]-7],[pouch[0]+9,pouch[1]-7]],'sun',1.5);
},(H,R,t)=>{
  const u=((t%22)+22)%22,out=smooth(4.4,8.8,u),back=smooth(8.8,13.2,u),theta=.84-.88*out*(1-back),r=2.69;
  const ball=[5.4,3+r*Math.sin(theta),3.1-r*Math.cos(theta)],p=H.p(...ball),anchor=H.p(5.4,3,3.1),ready=H.p(5.4,3+r*Math.sin(.84),3.1-r*Math.cos(.84));
  const strike=smooth(4,4.8,u)*(1-smooth(5.7,7,u)),hand=[ready[0]-3-strike*12,ready[1]+18+strike*3];
  stroke(H,R,[anchor,[anchor[0]+(p[0]-anchor[0])*.52+Math.sin(u*Math.PI/11)*.7,anchor[1]+(p[1]-anchor[1])*.52],p],'blue',1);
  H.line(R,[[anchor[0],anchor[1]+4],[anchor[0]+2,anchor[1]+11]],'coral',2);
  const ground=H.p(ball[0]+.15,ball[1]+.12,.035);H.tint(ell(...ground,8-ball[2]*1.2,3),'blue',.22);
  player(H,R,hand,-strike*4);
  paddle(H,R,hand[0]+2,hand[1]-13,-.12-strike*.46,1);
  oval(H,R,...p,6.2,6.2,'blue',.64);H.line(R,[[p[0]-4,p[1]+1],[p[0]-1,p[1]+3],[p[0]+4,p[1]+1]],'teal',1.5);
  actor(H,R,2.9,10.01,u,'barcelonaCourtFriend',{shirt:['teal',.66],face:'se',hairStyle:'curly',prop:(Q,S,pts)=>{paddle(Q,S,pts.nearHand[0],pts.nearHand[1]-10,.3,.54);}},.79-FIGURES.seatZ(),1.35);
  const [nx,ny]=H.p(8.52,4.28,1.47),s=Math.sin(u*Math.PI/11)*1.2;
  surface(H,R,[[nx-9,ny-20],[nx+8,ny-20],[nx+7+s,ny+1],[nx-7+s,ny+3]],'teal',.2,.65);
  for(let n=0;n<4;n++){H.line(R,[[nx-7+n*4,ny-18],[nx-6+n*4+s,ny+1]],'paper',.65);H.line(R,[[nx-8,ny-16+n*5],[nx+7+s,ny-16+n*5]],'blue',.5);}
});
room.loopSeconds=22;
room.stillTime=1.5;
export default room;
