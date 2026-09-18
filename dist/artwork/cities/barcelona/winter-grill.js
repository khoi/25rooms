import { world, shape, oval, stroke, ell, actor, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, benchFrame, vessel, drape, caneChair, cushion } from '../materials.js';
import { cabinetFrame, masonry, basin } from '../structure.js';
import { hangingRail, floorShadow, recessedFrame } from '../joinery.js';

const smooth=(a,b,t)=>{const q=Math.max(0,Math.min(1,(t-a)/(b-a)));return q*q*(3-2*q);};
const sit={x:0,y:0,drop:.47,lean:0,head:0,al:20,ar:28,el:30,er:30,ll:84,lr:80,kl:-84,kr:-80,roll:0};
FIGURES.clips.barcelonaWinterFriend={dur:18,keys:[[0,sit],[.4,sit],[.5,{...sit,lean:-5,head:8}],[.65,{...sit,lean:-5,head:8}],[.9,sit],[1,sit]]};

function plate(H,R,i,j,z,size=.8,ink='paper') {
  const p=H.p(i,j,z);oval(H,R,...p,12*size,5.6*size,ink,ink==='paper'?1:.5);oval(H,R,p[0],p[1]-.7,8.8*size,3.6*size,'paper',1);H.line(R,ell(p[0],p[1]-.5,7.7*size,3.1*size),'teal',.55,{closed:true});
}

function cook(H,R,a,b,lean) {
  const [x,y]=H.p(5.02,6.76,0);
  H.tint(ell(x,y+2,14,4),'blue',.2);
  for(const s of [-1,1]) {stroke(H,R,[[x+s*4,y-27],[x+s*6,y]],'blue',7);oval(H,R,x+s*6+2,y,5,2.5,'blue',.8);}
  shape(H,R,[[x-10-lean,y-50],[x+9-lean,y-50],[x+10,y-25],[x-8,y-25]],'teal',.65,.85);
  shape(H,R,[[x-5,y-46],[x+5,y-46],[x+8,y-24],[x-7,y-24]],'paper',1,.6);
  H.line(R,[[x-4,y-32],[x+4,y-32],[x+4,y-27],[x-4,y-27],[x-4,y-32]],'coral',.7);
  for(let n=0;n<3;n++)H.line(R,[[x-3+n*2,y-45],[x-2+n*2,y-42]],'coral',.55);
  for(const [s,p] of [[-1,a],[1,b]]) {const shoulder=[x+s*9-lean,y-46];stroke(H,R,[shoulder,[shoulder[0]+s*4,y-39],p],'blue',7);stroke(H,R,[shoulder,[shoulder[0]+s*4,y-39],p],'teal',5);oval(H,R,...p,2.7,2.1,'paper',1);}
  oval(H,R,x-lean,y-59,7.5,8.5,'paper',1);
  shape(H,R,[[x-8-lean,y-59],[x-7-lean,y-66],[x+3-lean,y-67],[x+8-lean,y-61],[x+2-lean,y-62],[x-4-lean,y-63]],'blue',.85,.6);
  H.dot(x+3-lean,y-58,1,'blue');
  stroke(H,R,[[x-5,y-51],[x+1,y-48],[x+6,y-52]],'coral',3);
}

function grate(H,R,lift) {
  const z=1.13+lift;
  for(const j of [3.65,5.72]) metal(H,R,2.65,j,4.7,.07,z,.055,'blue');
  for(const i of [2.65,7.28]) metal(H,R,i,3.65,.07,2.14,z,.055,'blue');
  for(let i=2.86;i<7.2;i+=.24) bentTube(H,R,[[i,3.69,z+.06],[i,5.72,z+.06]],1.4,'paper');
  for(const i of [4.56,5.24]) bentTube(H,R,[[i,5.75,z],[i,5.99,z+.14],[i+.25,5.99,z+.14],[i+.25,5.75,z]],2.4,'blue');
}

const room=world('barcelona-winter-grill','The onion bundle waits',{wall:false,floor:'paper',tone:.72,pattern:'tiles',accent:'sun',head:45},(H,R)=>{
  masonry(H,R,'nw',0,11.8,0,3.15,'paper',.7);
  masonry(H,R,'ne',0,12,0,3.3,'coral',.27);
  timber(H,R,.16,.1,11.55,.24,3.41,.22,'sun');
  for(const x of [.25,11.52]) {timber(H,R,x,.13,.19,.28,.05,3.4,'sun');bentTube(H,R,[[x,.21,2.73],[x+(x<5?.64:-.64),.21,3.4]],2.3,'teal');}
  for(let i=.3;i<11.6;i+=1.4) {surface(H,R,[H.p(i,.29,3.58),H.p(i+1.3,.29,3.58),H.p(i+1.3,1.73,3.29),H.p(i,1.73,3.29)],i%2?'paper':'teal',.25,.7);H.line(R,[H.p(i+.07,.31,3.6),H.p(i+.07,1.68,3.34)],'paper',1.2);}
  bentTube(H,R,[[.13,1.82,3.26],[11.73,1.82,3.26],[11.73,1.82,.15],[11.33,2.1,.13]],2,'blue');
  const cable=[];for(let n=0;n<=30;n++){const x=.5+n*.35;cable.push(H.p(x,2.27,3.04-.18*Math.sin(n/30*Math.PI)));}stroke(H,R,cable,'blue',1);
  for(let n=0;n<9;n++){const p=H.p(.68+n*1.25,2.27,2.94-.17*Math.sin(n/8*Math.PI));H.line(R,[p,[p[0],p[1]+5]],'blue',1);oval(H,R,p[0],p[1]+9,3.5,5,'sun',.45);}
  recessedFrame(H,R,'nw',1.08,4.88,1.68,1.22,'teal',P=>{
    surface(H,R,[P(.13,.13),P(4.74,.13),P(4.74,1.08),P(.13,1.08)],'blue',.57,.5);
    for(const u of [.3,1.21,2.75,4.2]) {
      const p=P(u,.24);oval(H,R,...p,7,11,'paper',1);oval(H,R,p[0],p[1],4.7,8,'coral',.2);
    }
    for(const u of [1.78,2.29,3.36]) {
      const p=P(u,.19);shape(H,R,[[p[0]-5,p[1]],[p[0]+5,p[1]],[p[0]+5,p[1]-18],[p[0]-5,p[1]-18]],'teal',.55,.6);oval(H,R,p[0],p[1]-18,5,2,'paper',1);
    }
    H.line(R,[P(.1,.13,.45),P(4.77,.13,.45)],'sun',3);
  });
  cabinetFrame(H,R,.25,1.24,1.39,3.7,.05,1.12,1,'teal',(x,j,w,d,z)=>{
    timber(H,R,x,j,w,d,.27,.09,'sun');
    for(let n=0;n<3;n++){const p=H.p(x+.49,j+.38+n*.84,.4);oval(H,R,...p,10,4,'sun',.65);H.line(R,[[p[0]-8,p[1]],[p[0]-7,p[1]-10],[p[0]+7,p[1]-10],[p[0]+8,p[1]]],'blue',.8);}
  });
  timber(H,R,.2,1.18,1.49,3.83,1.17,.13,'paper');
  basin(H,R,.31,1.39,1.17,1.45,1.3,'paper');
  bentTube(H,R,[[1.12,2.28,1.38],[1.12,2.28,.38],[.53,2.28,.38],[.53,2.28,.07]],1.8,'teal');
  drape(H,R,.38,3.79,1.04,.56,1.32,.47,'paper');
  for(const j of [3.91,4.13])H.line(R,[H.p(.42,j,1.33),H.p(1.37,j,1.33)],'coral',1.3);
  vessel(H,R,.89,3.23,1.32,8,13,'coral');
  const scoop=H.p(1.17,3.5,1.33);H.line(R,[[scoop[0],scoop[1]],[scoop[0]+10,scoop[1]-12]],'sun',2);oval(H,R,scoop[0]+12,scoop[1]-14,4,2,'paper',1);
  hangingRail(H,R,'nw',6.9,3.95,2.58,3,(P,u,n)=>{
    const c=n===1?'coral':'teal';surface(H,R,[P(u-.32,-.18),P(u-.56,-.36),P(u-.53,-.79),P(u-.33,-.69),P(u-.34,-1.41),P(u+.31,-1.41),P(u+.31,-.69),P(u+.54,-.79),P(u+.53,-.37),P(u+.28,-.18)],c,.58,.8);
    H.line(R,[P(u,-.22),P(u,-1.35)],'blue',.8);
    for(const z of [-.6,-.85,-1.1])H.dot(...P(u+.07,z),1,'sun');
  });
  const shovel=H.p(.45,5.72,.06),stop=H.p(.28,5.54,1.91);
  H.line(R,[shovel,stop],'sun',2.2);
  surface(H,R,[[shovel[0]-8,shovel[1]],[shovel[0]+8,shovel[1]],[shovel[0]+7,shovel[1]-16],[shovel[0]-7,shovel[1]-15]],'blue',.66,.75);
  H.line(R,[[shovel[0]-5,shovel[1]-2],[shovel[0]+5,shovel[1]-2]],'paper',1.1);
  H.line(R,[[stop[0]-5,stop[1]+5],[stop[0]-5,stop[1]-5],[stop[0]+5,stop[1]-5],[stop[0]+5,stop[1]+5]],'teal',1.7);
  const brush=H.p(.72,6.27,.09);surface(H,R,[[brush[0]-9,brush[1]],[brush[0]+8,brush[1]],[brush[0]+8,brush[1]-8],[brush[0]-8,brush[1]-8]],'sun',.65,.6);
  for(let n=0;n<6;n++)H.line(R,[[brush[0]-6+n*2.2,brush[1]-1],[brush[0]-7+n*2.3,brush[1]+4]],'blue',.6);
  H.line(R,[[brush[0],brush[1]-7],[brush[0]-4,brush[1]-43]],'coral',2.4);
  cabinetFrame(H,R,6.72,.37,4.69,1.18,.08,2.94,3,'teal',(x,j,w,d,z,h,n)=>{
    for(const level of [.28,1.18,2.12])timber(H,R,x,j,w,d,level,.075,'sun');
    if(n===0){for(let k=0;k<5;k++){const xx=x+.17+k*.23;const [a,b]=H.p(xx,j+.7,1.75);oval(H,R,a,b,5,15,'paper',1);H.line(R,[[a-2,b-10],[a-2,b+10]],'teal',.55);}cushion(H,R,x+.14,j+.09,w-.26,.66,.37,.3,'sun');}
    if(n===1){vessel(H,R,x+.45,j+.49,2.2,10,24,'paper');vessel(H,R,x+.91,j+.65,1.3,7,11,'coral');H.line(R,[H.p(x+.42,j+.76,1.3),H.p(x+.64,j+.76,1.3)],'teal',1.5);for(let k=0;k<3;k++)plate(H,R,x+.48,j+.48,.45+k*.055,.65);}
    if(n===2){for(let k=0;k<4;k++)timber(H,R,x+.13+k*.27,j+.13,.17,.71,1.27,.58,k===1?'coral':'paper');drape(H,R,x+.11,j+.1,w-.2,.8,2.24,.19,'paper');}
  });
  timber(H,R,6.7,.34,4.73,1.26,3.03,.14,'sun');
  for(const x of [6.8,8.23,9.78,11.25]) {
    for(const z of [.37,1.29,2.23])H.dot(...H.p(x,1.57,z),1.1,'sun');
  }
  for(let n=0;n<5;n++)H.line(R,[H.p(6.93+n*.23,1.47,1.3),H.p(6.93+n*.23,1.47,2.01)],'sun',1.1);
  for(const x of [7.5,10.6]) {const p=H.p(x,.82,3.22);H.line(R,[[p[0]-6,p[1]],[p[0]+6,p[1]]],'blue',1);surface(H,R,[[p[0]-8,p[1]-3],[p[0],p[1]-20],[p[0]+8,p[1]-3],[p[0],p[1]+7]],'coral',.6,.6);}
  floorShadow(H,2.48,3.45,5.1,2.67,.23);
  for(const x of [2.66,7.11]) for(const j of [3.64,5.51]) {metal(H,R,x,j,.14,.15,.08,.82,'blue');metal(H,R,x-.11,j-.08,.38,.34,.03,.08,'teal');}
  bentTube(H,R,[[2.75,5.62,.15],[7.19,5.62,.73]],1.6,'teal');
  for(const j of [3.73,5.43]) {
    bentTube(H,R,[[2.77,j,.18],[7.14,j,.18]],2,'teal');
    bentTube(H,R,[[2.77,j,.16],[4.05,j,.8]],1.8,'teal');
    bentTube(H,R,[[7.15,j,.16],[5.96,j,.8]],1.8,'teal');
  }
  metal(H,R,2.56,3.51,4.95,2.39,.8,.13,'blue');
  surface(H,R,H.tile(2.73,3.69,4.58,2.03,.94),'blue',.85,.7);
  for(const j of [3.48,5.82])metal(H,R,2.51,j,5.03,.12,.93,.22,'blue');
  for(const x of [2.51,7.42])metal(H,R,x,3.5,.12,2.44,.93,.22,'blue');
  surface(H,R,H.faceI(2.68,5.96,4.6,.62,.92),'blue',.7,.8);
  for(let n=0;n<10;n++)surface(H,R,H.faceI(2.83+n*.43,5.975,.24,.7,.81),'paper',.42,.5);
  for(const x of [2.7,7.14])for(const z of [.65,1.03])H.dot(...H.p(x,5.99,z),1.6,'sun');
  for(const x of [2.89,7.03]) {
    metal(H,R,x,3.67,.18,2.04,1.03,.065,'teal');
    for(const j of [3.82,5.57])metal(H,R,x-.03,j,.24,.14,1.08,.08,'paper');
  }
  for(let x=2.8;x<7.2;x+=.45)H.line(R,[H.p(x,5.96,.93),H.p(x+.2,5.96,1.03)],'paper',1);
  metal(H,R,3.3,5.92,2.7,.5,.52,.11,'teal');
  bentTube(H,R,[[4.16,6.44,.55],[4.16,6.6,.55],[5.05,6.6,.55],[5.05,6.44,.55]],2,'blue');
  timber(H,R,2.02,3.78,.41,1.64,1.07,.11,'sun');
  surface(H,R,H.tile(2.08,3.92,.31,1.29,1.19),'paper',1,.7);
  timber(H,R,7.59,3.76,1.44,1.77,1.04,.12,'sun');
  for(const j of [3.93,5.3])bentTube(H,R,[[7.53,j,.59],[8.98,j,1.05]],1.8,'teal');
  surface(H,R,H.tile(7.78,3.94,1.05,1.1,1.175),'paper',1,.6);
  for(const x of [7.99,8.17])bentTube(H,R,[[x,4.13,1.2],[x+.17,4.72,1.2],[x+.12,4.97,1.2]],1.6,'blue');
  H.line(R,[H.p(8,4.13,1.2),H.p(8.19,4.13,1.2)],'teal',2.1);
  const glove=H.p(8.55,5.19,1.18);surface(H,R,[[glove[0]-5,glove[1]],[glove[0]+5,glove[1]],[glove[0]+6,glove[1]-11],[glove[0]+2,glove[1]-13],[glove[0],glove[1]-8],[glove[0]-4,glove[1]-10],[glove[0]-7,glove[1]-7]],'sun',.68,.7);
  benchFrame(H,R,3.37,8.5,7.14,1.91,.98,'sun');
  drape(H,R,4.86,8.54,1.7,1.84,1.005,.42,'paper');
  for(const x of [4.99,5.22,5.47,5.72,5.97,6.22,6.46])H.line(R,[H.p(x,8.57,1.015),H.p(x,10.36,1.015),H.p(x,10.42,.66)],'coral',.7);
  for(const [x,j] of [[3.91,9.06],[7.1,9.36],[9.49,9.23]]) {surface(H,R,H.tile(x-.44,j-.37,.91,.76,1.015),'paper',1,.7);H.line(R,[H.p(x-.37,j+.31,1.03),H.p(x+.36,j+.31,1.03)],'sun',1.2);}
  const chip=H.p(7.55,9.67,1.026);shape(H,R,[[chip[0],chip[1]],[chip[0]-4,chip[1]-1],[chip[0]-1,chip[1]-4]],'sun',.7,.4);
  for(let n=0;n<9;n++) {const p=H.p(4.07+n*.093,9.21,1.08);stroke(H,R,[[p[0],p[1]],[p[0]-8,p[1]-8],[p[0]-18,p[1]-13]],'paper',3);stroke(H,R,[[p[0]-16,p[1]-12],[p[0]-25-n%3*3,p[1]-17],[p[0]-32,p[1]-17-n%2*4]],'teal',1.8);}
  H.line(R,[H.p(3.92,9.02,1.13),H.p(4.47,9.02,1.13)],'coral',2.5);
  const bread=H.p(5.9,9.29,1.04);oval(H,R,bread[0],bread[1],17,8,'sun',.58);oval(H,R,bread[0],bread[1]-6,15,7,'paper',1);
  for(let n=0;n<4;n++){const x=bread[0]-9+n*6;oval(H,R,x,bread[1]-8-n%2*2,6,5,'sun',.63);H.line(R,[[x-2,bread[1]-10],[x+1,bread[1]-7]],'paper',1);}
  for(let n=0;n<7;n++)H.line(R,[[bread[0]-14+n*4,bread[1]-1],[bread[0]-12+n*4,bread[1]+5]],'coral',.7);
  vessel(H,R,7.26,9.25,1.06,10,9,'coral');vessel(H,R,9.73,8.94,1.04,9,23,'paper');
  plate(H,R,8.4,9.53,1.05,.92);plate(H,R,8.4,9.53,1.1,.88);
  bentTube(H,R,[[6.67,9.12,1.04],[7.25,9.15,1.24]],1.5,'sun');
  const [lx,ly]=H.p(6.69,9.13,1.04);oval(H,R,lx,ly,4,2,'coral',.7);
  caneChair(H,R,8.25,6.97,'teal');caneChair(H,R,10.53,9.16,'coral');
  cushion(H,R,10.53,9.18,.9,.74,.67,.2,'paper');
  for(let n=0;n<3;n++)H.line(R,[H.p(10.58+n*.26,9.19,.89),H.p(10.58+n*.26,9.87,.89)],'teal',1.3);
  benchFrame(H,R,.71,10.35,1.85,1,.62,'teal');drape(H,R,.86,10.42,1.45,.82,.65,.34,'coral');
  for(const j of [10.5,10.82]) H.line(R,[H.p(.92,j,.67),H.p(2.23,j,.67)],'sun',2);
  metal(H,R,1.03,8.5,1.35,1.24,.07,.62,'blue');
  surface(H,R,H.tile(1.12,8.58,1.17,1.06,.72),'teal',.38,.6);
  for(let n=0;n<5;n++)H.line(R,[H.p(1.17+n*.22,8.61,.73),H.p(1.17+n*.22,9.6,.73)],'sun',1.2);
  for(const x of [4.09,7.64]) {
    for(const dx of [0,.63])for(const j of [10.84,11.33])bentTube(H,R,[[x+dx,j,.06],[x+dx,j,.54]],2,'teal');
    cushion(H,R,x-.12,10.74,.92,.81,.53,.1,'sun');
    H.line(R,[H.p(x+.06,11.57,.64),H.p(x+.59,11.57,.64)],'coral',1.2);
  }
  const hats=H.p(1.51,10.79,.69);oval(H,R,...hats,11,5,'sun',.7);oval(H,R,hats[0],hats[1]-6,8,7,'teal',.57);H.line(R,[[hats[0]-7,hats[1]-3],[hats[0]+7,hats[1]-3]],'coral',1.6);
  for(const j of [7.52,8.11])bentTube(H,R,[[.19,j,.2],[.83,j,.2]],2.3,'teal');
  const boot=H.p(.53,7.81,.22);surface(H,R,[[boot[0]-6,boot[1]],[boot[0]+10,boot[1]],[boot[0]+10,boot[1]-5],[boot[0]+3,boot[1]-7],[boot[0]+2,boot[1]-17],[boot[0]-6,boot[1]-17]],'blue',.62,.7);
  H.line(R,[[boot[0]-5,boot[1]-2],[boot[0]+9,boot[1]-2]],'paper',1);
  bentTube(H,R,[[9.18,.19,3.43],[9.18,.49,3.74],[10.02,.49,3.74],[10.02,.19,3.43]],1.7,'teal');
  for(let n=0;n<4;n++){const p=H.p(9.31+n*.16,.43,3.73);H.line(R,[[p[0],p[1]],[p[0]+13,p[1]+6]],'paper',5);}
  metal(H,R,10.62,5.5,.97,1.07,.06,.055,'blue');
  for(let n=0;n<6;n++)H.line(R,[H.p(10.67+n*.15,5.56,.12),H.p(10.67+n*.15,6.5,.12)],'paper',.7);
},(H,R,t)=>{
  const u=((t%18)+18)%18,q=smooth(3.6,7.2,u)*(1-smooth(10.8,16,u)),lift=.33*q;
  const a=H.p(4.67,5.99,1.27+lift),b=H.p(5.35,5.99,1.27+lift);
  grate(H,R,lift);cook(H,R,a,b,1.6*q);for(const p of [a,b])oval(H,R,...p,2.6,2,'paper',1);
  actor(H,R,8.7,7.38,u,'barcelonaWinterFriend',{shirt:['coral',.65],hairStyle:'curly',face:'sw'},.66-FIGURES.seatZ(),1.35);
  const p=wallPt(H,'nw',7.65,1.23,-.28),s=Math.sin(u*Math.PI/9)*1.4;
  surface(H,R,[[p[0]-3,p[1]-22],[p[0]+3,p[1]-22],[p[0]+4+s,p[1]+8],[p[0]-3+s,p[1]+9]],'sun',.66,.5);
  H.line(R,[[p[0]-3+s,p[1]+4],[p[0]+4+s,p[1]+3]],'paper',1.3);
});
room.loopSeconds=18;
room.stillTime=1.8;
export default room;
