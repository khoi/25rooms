import { FIGURES } from '../../drawings.js';
import { world, shape, oval, stroke, box, actor, ell } from '../../worlds/common.js';
import { surface, timber, metal, bentTube, cushion, vessel, benchFrame, drape } from '../materials.js';
import { masonry, archedBay, cabinetFrame } from '../structure.js';
import { recessedFrame, hangingRail, floorShadow, taskLight } from '../joinery.js';

const colleagueRest={...FIGURES.clips.hold.keys[0][1]};
FIGURES.clips.hanoiCycloColleague={dur:16,keys:[[0,colleagueRest],[.35,colleagueRest],[.52,{...colleagueRest,head:-12}],[.7,colleagueRest],[1,colleagueRest]]};
const ease=(a,b,t)=>{const p=Math.max(0,Math.min(1,(t-a)/(b-a)));return p*p*(3-2*p);};
function wheel(H,R,i,j,z=.88,r=28) {
  const [x,y]=H.p(i,j,z);H.outline(R,ell(x,y,r*.63,r),'blue',4,{amp:.05});H.outline(R,ell(x,y,r*.63-3,r-3),'paper',1.5,{amp:.05});
  for(let n=0;n<14;n++){const a=n*Math.PI*2/14;H.line(R,[[x,y],[x+Math.cos(a)*(r*.63-3),y+Math.sin(a)*(r-3)]],n===4?'coral':'blue',n===4?1.8:.6);}
  oval(H,R,x,y,4,4,'sun',.8);H.dot(x,y,1.3,'blue');
}
const room=world('hanoi-cyclo-canopy','Shade for the next ride',{floor:'blue',tone:.07,wall:false,head:70},(H,R)=>{
  masonry(H,R,'nw',0,12,0,3.65,'paper',.9);masonry(H,R,'ne',0,3.1,0,3.65,'paper',.9);masonry(H,R,'ne',9.9,2.1,0,3.65,'paper',.9);
  bentTube(H,R,[[.13,.41,3.43],[.13,10.8,3.43],[.13,10.8,1.44]],1.6,'blue');
  for(const j of[.66,3.86,7.14,10.62]){metal(H,R,.09,j,.17,.14,3.34,.2,'teal');}
  metal(H,R,.11,10.61,.21,.36,1.24,.47,'paper');for(const z of[1.37,1.54])H.dot(...H.p(.33,10.78,z),1.7,'blue');
  cabinetFrame(H,R,.26,.33,1.66,1.33,.06,2.59,1,'teal',(i,j,w,d,z)=>{for(const level of[.14,.88,1.64]){timber(H,R,i,j,w,d,z+level,.09,'sun');if(level<1){vessel(H,R,i+.36,j+.61,z+level+.1,8,14,level?'coral':'paper',false);const p=H.p(i+.96,j+.7,z+level+.11);for(let n=0;n<3;n++)H.outline(R,ell(p[0],p[1]-n*4,7,3),'blue',1.5);}else{for(let n=0;n<3;n++)box(H,R,i+.08+n*.37,j+.22,.31,.67,z+level+.1,.42,n===1?'sun':'paper',.8);}}});
  for(const i of[3.0,9.77])metal(H,R,i,.1,.2,.32,0,4.05,'teal');
  metal(H,R,2.96,.1,7.0,.28,4.0,.2,'teal');
  for(const i of[3.1,6.3,9.7]){bentTube(H,R,[[i,.2,3.98],[i+1.0,1.45,4.52],[i+2.0,.2,3.98]],2,'blue');}
  surface(H,R,[H.p(3.15,.06,.1),H.p(9.67,.06,.1),H.p(9.67,.06,3.8),H.p(3.15,.06,3.8)],'sun',.13);
  for(const i of[3.48,4.95,7.6,9.07]){surface(H,R,[H.p(i,.07,.1),H.p(i+.74,.07,.1),H.p(i+.74,.07,.8+(i%2)),H.p(i,.07,.8+(i%2))],'teal',.13);}
  archedBay(H,R,'nw',1.1,2.5,2.32,.93,'teal');
  metal(H,R,3.0,.45,6.9,.22,.015,.055,'blue');for(let n=0;n<10;n++)H.line(R,[H.p(3.2+n*.66,.48,.08),H.p(3.2+n*.66,.67,.08)],'paper',.65);
  for(let j=2.2;j<11.9;j+=1.6)H.line(R,[H.p(.1,j,.015),H.p(11.9,j,.015)],'blue',.5,{tone:.22});
  for(const i of[1.0,9.9])H.line(R,[H.p(i,2,.018),H.p(i,11.7,.018)],'blue',.5,{tone:.22});
  floorShadow(H,2.07,1.95,4.82,6.3,.16);
  wheel(H,R,4.35,2.05,.85,27);
  bentTube(H,R,[[4.35,2.05,.86],[4.35,3.6,.63],[3.1,5.65,.86],[6.08,5.65,.86],[4.35,3.6,.63],[4.35,2.05,.86]],3.4,'teal');
  bentTube(H,R,[[4.35,2.05,.86],[4.35,2.62,1.67],[4.35,3.92,1.68],[4.35,3.6,.63]],3.1,'teal');
  cushion(H,R,3.96,2.45,.9,.58,1.73,.12,'blue');
  const crank=H.p(4.35,3.48,.7);oval(H,R,...crank,10,9,'blue',.7);H.outline(R,ell(crank[0],crank[1],7,6),'sun',.9);stroke(H,R,[[crank[0]-3,crank[1]-4],[crank[0]+8,crank[1]+7],[crank[0]+16,crank[1]+7]],'paper',2);
  const hub=H.p(4.35,2.05,.86);H.line(R,[[hub[0],hub[1]-5],[crank[0],crank[1]-9]],'blue',1);H.line(R,[[hub[0],hub[1]+5],[crank[0],crank[1]+9]],'blue',1);
  bentTube(H,R,[[3.71,3.9,1.68],[3.64,3.65,1.94],[5.1,3.65,1.94],[5.07,3.9,1.68]],2.5,'blue');
  const bell=H.p(5.04,3.67,2);oval(H,R,...bell,5,3.2,'sun',.7);H.line(R,[[bell[0]-2,bell[1]-1],[bell[0]+2,bell[1]-1]],'paper',1.3);
  bentTube(H,R,[[4.35,2.07,1.08],[4.01,2.8,1.22],[4.01,3.35,.8]],1.8,'blue');
  const cog=H.p(4.36,2.13,.86);for(let n=0;n<8;n++){const a=n*Math.PI/4;H.line(R,[[cog[0]+Math.cos(a)*4,cog[1]+Math.sin(a)*5],[cog[0]+Math.cos(a)*7,cog[1]+Math.sin(a)*8]],'sun',1);}
  box(H,R,2.65,4.23,3.64,2.37,.76,.28,'teal',.45);
  for(const i of[2.9,5.82])for(const j of[4.45,6.16]){const [x,y]=H.p(i,j,.65);for(let n=0;n<4;n++)H.outline(R,ell(x,y-n*3,4,1.6),'blue',.75);}
  cushion(H,R,2.79,4.4,3.37,1.87,1.06,.21,'paper');
  surface(H,R,[H.p(2.8,4.28,1.09),H.p(6.14,4.28,1.09),H.p(6.14,4.06,2.01),H.p(2.8,4.06,2.01)],'coral',.48);
  for(let i=3.0;i<6.05;i+=.48)H.line(R,[H.p(i,4.11,1.23),H.p(i,4.07,1.91)],'paper',.7);
  H.line(R,[H.p(3.65,5.18,1.29),H.p(4.58,5.27,1.29)],'coral',1);for(let n=0;n<5;n++)H.line(R,[H.p(3.71+n*.16,5.13,1.3),H.p(3.71+n*.16,5.3,1.3)],'blue',.45);
  for(const i of[2.62,6.23])bentTube(H,R,[[i,6.37,.96],[i,6.36,1.56],[i,4.28,1.56],[i,4.28,.86]],3.5,'blue');
  metal(H,R,2.81,6.44,3.34,1.43,.35,.1,'teal');for(let i=3.04;i<6.05;i+=.3)H.line(R,[H.p(i,6.65,.46),H.p(i,7.68,.46)],'blue',1.1);
  for(const i of[3.1,5.83])metal(H,R,i,6.43,.38,.17,.43,.06,'sun');
  wheel(H,R,2.36,5.77);wheel(H,R,6.48,5.77);
  for(const i of[2.42,6.4]){bentTube(H,R,[[i,5.77,.88],[i,5.24,1.43],[i,6.22,1.42],[i,5.77,.88]],2.4,'teal');surface(H,R,H.tile(i-.19,6.41,.38,.34,.03),'sun',.6);}
  for(const i of[2.36,6.48]){const [x,y]=H.p(i,5.77,.88),arc=[];for(let n=0;n<=16;n++){const a=Math.PI+n*Math.PI/16;arc.push([x+Math.cos(a)*20,y+Math.sin(a)*31]);}H.line(R,arc,'blue',5);H.line(R,arc,'teal',3);H.line(R,[[x-17,y-9],[x,y],[x+16,y-11]],'blue',1.1);const p=H.p(i,6.09,.4);surface(H,R,[[p[0]-7,p[1]],[p[0]+7,p[1]],[p[0]+6,p[1]+12],[p[0]-6,p[1]+12]],'blue',.67);}
  for(const i of[3.2,5.7]){const p=H.p(i,6.58,.49);H.outline(R,ell(...p,3,3),'sun',1.4);}
  recessedFrame(H,R,'ne',8.11,3.56,2.37,1.18,'teal',P=>{for(const [u,h,k]of[[.28,.56,0],[.81,.73,1],[1.43,.57,2],[2.14,.65,3],[2.76,.71,4]]){const p=P(u,.84);stroke(H,R,[[p[0],p[1]],[p[0]+2,p[1]+h*24]],k%2?'sun':'paper',2.5);if(k%2)H.outline(R,ell(p[0]+2,p[1]+h*24+3,4,5),'blue',1.6);else stroke(H,R,[[p[0]-3,p[1]+h*24],[p[0]+2,p[1]+h*24+4],[p[0]+6,p[1]+h*24-2]],'blue',2);}});
  benchFrame(H,R,8.19,.91,3.21,2.17,1.16,'sun');metal(H,R,8.4,2.7,2.74,.34,1.17,.1,'blue');
  for(const x of[8.61,10.95])metal(H,R,x,1.08,.13,.13,1.15,1.35,'teal');
  metal(H,R,8.58,1.05,2.52,.23,2.47,.16,'teal');
  bentTube(H,R,[[9.65,1.33,1.23],[9.65,1.33,2.02],[10.1,1.33,2.04]],4,'blue');metal(H,R,9.88,1.14,.46,.45,1.91,.23,'sun');
  const knob=H.p(10.26,1.47,2.06);oval(H,R,...knob,5,5,'teal',.8);H.outline(R,ell(...knob,7,7),'coral',1.2);
  for(let n=0;n<7;n++){const [x,y]=H.p(8.61+n*.31,1.14,2.37);stroke(H,R,[[x,y],[x+2,y+19]],n%3?'blue':'coral',1.7);oval(H,R,x+2,y+22,3,4,'paper',1);}
  taskLight(H,R,8.56,1.41,1.3,'sun',.15);
  surface(H,R,H.tile(10.28,1.99,.71,.61,1.18),'paper',1);for(let n=0;n<3;n++){const p=H.p(10.41+n*.19,2.19,1.2);H.outline(R,ell(...p,3,2),'blue',.7);H.dot(p[0],p[1],1,'sun');}
  timber(H,R,8.38,2.65,1.52,.86,.61,.13,'sun');for(let n=0;n<8;n++)H.line(R,[H.p(8.51+n*.13,2.75,.75),H.p(8.64+n*.13,3.3,.75)],'blue',.65);
  metal(H,R,10.59,2.13,.16,.16,.02,.98,'blue');stroke(H,R,[H.p(10.2,2.12,1.04),H.p(11.1,2.12,1.04)],'blue',2);stroke(H,R,[H.p(10.64,2.18,.21),H.p(11.28,3.04,.1),H.p(11.16,3.59,.3)],'blue',1.2);
  benchFrame(H,R,.27,3.82,1.47,1.91,.93,'teal');
  const rim=H.p(.87,4.54,1.03);H.outline(R,ell(...rim,17,9),'sun',2.1);H.outline(R,ell(...rim,13,6),'blue',.7);stroke(H,R,[[rim[0]-8,rim[1]+2],[rim[0]+4,rim[1]-7],[rim[0]+14,rim[1]+2]],'paper',1.8);
  timber(H,R,.25,4.02,1.51,1.42,.21,.12,'sun');drape(H,R,.42,4.33,.91,1.22,1.0,.38,'paper');
  timber(H,R,.19,4.33,.69,4.19,3.43,.11,'sun');for(const j of[4.58,8.24])bentTube(H,R,[[.19,j,3.1],[.78,j,3.43]],1.6,'blue');
  for(const j of[4.87,6.64,7.76]){const p=H.p(.51,j,3.55);oval(H,R,...p,8,7,'paper',1);surface(H,R,[[p[0]-8,p[1]],[p[0]-26,p[1]-9],[p[0]-24,p[1]-22],[p[0]+3,p[1]-9]],j<6?'coral':'teal',.4);oval(H,R,p[0]-25,p[1]-15,6,7,'paper',1);}
  hangingRail(H,R,'nw',4.8,3.8,2.94,4,(P,u,n)=>{const [x,y]=P(u,-.15);if(n<2){surface(H,R,[[x-6,y],[x+6,y],[x+8,y+27],[x-7,y+27]],n?'paper':'coral',.43);H.line(R,[[x-3,y],[x-3,y+25]],'paper',1);}else{H.outline(R,ell(x,y+16,10,15),'sun',1.4);H.dot(x,y+31,2,'blue');}});
  timber(H,R,.37,9.19,2.94,1.2,.6,.15,'sun');for(const i of[.55,2.84])timber(H,R,i,9.3,.2,.98,0,.6,'sun');cushion(H,R,.55,9.29,1.11,.97,.76,.1,'paper');
  const hat=H.p(2.48,9.71,.85);oval(H,R,...hat,14,6,'sun',.55);oval(H,R,hat[0],hat[1]-5,8,6,'sun',.55);vessel(H,R,3.0,9.25,.79,4,15,'teal',false);
  timber(H,R,8.5,8.25,2.54,1.93,.08,.15,'sun');
  surface(H,R,H.tile(8.68,8.4,2.18,1.59,.25),'blue',.7);for(const i of[8.5,10.89])timber(H,R,i,8.25,.15,1.93,.22,.7,'teal');timber(H,R,8.5,10.03,2.54,.15,.22,.7,'teal');
  for(const i of[9.33,10.1])timber(H,R,i,8.4,.1,1.55,.25,.49,'sun');
  surface(H,R,[H.p(8.5,8.25,.9),H.p(11.04,8.25,.9),H.p(11.04,7.88,2.11),H.p(8.5,7.88,2.11)],'teal',.4);
  surface(H,R,[H.p(8.67,8.21,1.08),H.p(10.87,8.21,1.08),H.p(10.87,7.94,1.95),H.p(8.67,7.94,1.95)],'blue',.32);
  for(const [i,j]of[[8.94,9.15],[9.72,9.42],[10.43,9.12]]){const p=H.p(i,j,.47);H.outline(R,ell(...p,6,4),'sun',1.4);stroke(H,R,[[p[0]-6,p[1]+4],[p[0]+6,p[1]-5]],'paper',2);}
  const tools=H.p(9.63,8.12,1.57);stroke(H,R,[[tools[0]-9,tools[1]-7],[tools[0]+10,tools[1]+9]],'sun',2.5);H.outline(R,ell(tools[0]-11,tools[1]-9,4,4),'paper',1.3);
  const spanner=H.p(8.96,9.33,.71);stroke(H,R,[[spanner[0]-12,spanner[1]-7],[spanner[0]+9,spanner[1]+6]],'paper',3.5);H.outline(R,ell(spanner[0]-13,spanner[1]-8,5,4),'blue',1.5);H.line(R,[[spanner[0]+7,spanner[1]+4],[spanner[0]+11,spanner[1]+2],[spanner[0]+15,spanner[1]+6]],'blue',2);
  const pedal=H.p(10.42,8.94,.72);surface(H,R,[[pedal[0]-10,pedal[1]-4],[pedal[0]+7,pedal[1]-7],[pedal[0]+11,pedal[1]+2],[pedal[0]-7,pedal[1]+5]],'blue',.7);for(let n=0;n<4;n++)H.line(R,[[pedal[0]-7+n*4,pedal[1]-3],[pedal[0]-5+n*4,pedal[1]+3]],'sun',.8);stroke(H,R,[[pedal[0]+9,pedal[1]],[pedal[0]+18,pedal[1]-3]],'paper',2.2);
  drape(H,R,10.45,9.6,.43,.49,.96,.48,'paper');
  const tyre=H.p(.9,6.18,.9);H.outline(R,ell(...tyre,16,28),'blue',4);H.outline(R,ell(...tyre,12,23),'paper',1);
  metal(H,R,.39,6.17,1.31,.35,.06,.14,'teal');vessel(H,R,1.13,7.55,.05,7,6,'coral',false);for(const [i,j]of[[1.63,7.38],[2.07,7.58]])oval(H,R,...H.p(i,j,.07),4,3,'sun',.8);
},(H,R,time)=>{
  const t=((time%16)+16)%16,u=ease(3.2,6.4,t)*(1-ease(9.6,14,t)),theta=1.37-u*.76;
  const bow=(i,f)=>H.p(i,4.25+Math.sin(theta*f)*2.52,1.48+Math.cos(theta*f)*2.52+Math.sin((i-2.6)/3.66*Math.PI)*.29+Math.sin(t*Math.PI*4/16+i)*.018*f);
  const rows=[.2,.58,1].map(f=>Array.from({length:19},(_,n)=>bow(2.6+n*3.66/18,f)));
  for(let n=0;n<2;n++){surface(H,R,[...rows[n],...rows[n+1].slice().reverse()],'coral',.46+n*.12);for(let k=1;k<8;k++)H.line(R,[rows[n][k*2],rows[n+1][k*2]],'paper',.8,{tone:.65});}
  for(const f of[.38,.8]){const seam=Array.from({length:19},(_,n)=>bow(2.6+n*3.66/18,f));H.line(R,seam,'sun',.65);}
  const patch=[bow(3.18,.62),bow(3.67,.62),bow(3.67,.82),bow(3.18,.82)];surface(H,R,patch,'paper',.63,.5);for(let n=0;n<4;n++)H.line(R,[bow(3.2+n*.12,.62),bow(3.2+n*.12,.66)],'blue',.55);
  for(const row of rows)H.line(R,row,'blue',2.2);
  for(const i of[2.6,6.26]){const pivot=H.p(i,4.25,1.48);H.line(R,[pivot,bow(i,1)],'blue',3);H.line(R,[pivot,bow(i,1)],'sun',1.2);oval(H,R,...pivot,4,4,'paper',1);H.dot(...pivot,1.5,'coral');}
  const latch=H.p(6.26,4.25+Math.sin(theta)*.65,1.48+Math.cos(theta)*.65);
  stroke(H,R,[H.p(6.26,4.25,1.48),latch,bow(6.26,.65)],'blue',1.8);H.dot(...latch,2.1,u>.8?'sun':'coral');
  actor(H,R,7.15,4.67,0,'hold',{shirt:['paper',1],pants:['blue',.55],face:'sw',prop:(A,B,p)=>{stroke(A,B,[p.nearHand,[(p.nearHand[0]+latch[0])/2,p.nearHand[1]-4],latch],'paper',3.5);oval(A,B,...latch,2.4,2.5,'coral',.3);}},0,1.4);
  actor(H,R,2.5,8.4,t,'hanoiCycloColleague',{shirt:['teal',.55],prop:(A,B,p)=>{const x=(p.nearHand[0]+p.farHand[0])/2,y=(p.nearHand[1]+p.farHand[1])/2;surface(A,B,[[x-16,y-5],[x+16,y-5],[x+16,y+5],[x-16,y+5]],'coral',.45);oval(A,B,x+16,y,5,5,'paper',1);}},0,1.32);
  const [bx,by]=H.p(5.04,3.67,2);stroke(H,R,[[bx,by+3],[bx+Math.sin(t*Math.PI*2/16)*1.7,by+16]],'coral',1.1);
});
room.loopSeconds=16;
room.stillTime=8;
export default room;
