import { world, box, shape, oval, stroke, actor, cycle, mix, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, drape, benchFrame, bentTube, vessel } from '../materials.js';
import { masonry, rackFrame, cabinetFrame } from '../structure.js';
import { windowBay, hangingRail, floorShadow, caster } from '../joinery.js';

const base={...FIGURES.clips.idle.keys[0][1]},rower={...base};
FIGURES.clips['amsterdam-rowing-seat']={dur:20,keys:[[0,rower],[1,rower]]};
FIGURES.clips['amsterdam-rowing-mate']={dur:20,keys:[[0,{...base,lean:7,al:70,ar:78,el:38,er:25,head:17}],[.5,{...base,lean:11,al:73,ar:80,el:36,er:23,head:12}],[.9,{...base,lean:7,al:70,ar:78,el:38,er:25,head:17}],[1,{...base,lean:7,al:70,ar:78,el:38,er:25,head:17}]]};
const smooth=(a,b,t)=>{const f=Math.max(0,Math.min(1,(t-a)/(b-a)));return f*f*(3-2*f)};
function hull(H,R,front=false){
 const P=(x,y,z)=>H.p(x,y,z);
 const rear=[P(2.3,5.22,1.52),P(3.08,4.6,1.62),P(8.77,4.6,1.62),P(9.56,5.23,1.51),P(8.83,5.6,1.02),P(3.2,5.59,1.03)];
 const near=[P(2.3,5.22,1.52),P(3.07,6.02,1.57),P(8.76,6.02,1.57),P(9.56,5.23,1.51),P(8.62,5.9,.95),P(3.28,5.9,.94)];
 if(front){
  shape(H,R,near,'sun',.68);
  H.line(R,[P(2.3,5.22,1.54),P(3.07,6.02,1.59),P(8.76,6.02,1.59),P(9.56,5.23,1.54)],'paper',2.6);
  H.line(R,[P(2.73,5.67,1.18),P(3.44,5.93,1.1),P(8.61,5.93,1.1),P(9.17,5.62,1.24)],'teal',2.1);
  for(let n=0;n<8;n++)H.line(R,[P(3.3+n*.7,5.99,1.11),P(3.44+n*.7,6.02,1.45)],'coral',.65,{tone:.45});
  shape(H,R,[P(4.53,6.03,1.17),P(4.94,6.03,1.17),P(4.96,6.03,1.44),P(4.52,6.03,1.43)],'paper',.66);
  H.line(R,[P(4.59,6.04,1.21),P(4.86,6.04,1.39)],'coral',.8);
  for(const x of [3.22,8.57])H.dot(...P(x,6.025,1.47),1.9,'blue');
  return;
 }
 shape(H,R,rear,'sun',.75);
 shape(H,R,[P(2.4,5.23,1.48),P(3.25,4.78,1.48),P(8.6,4.78,1.48),P(9.43,5.23,1.47),P(8.54,5.83,1.15),P(3.37,5.83,1.15)],'paper',1);
 shape(H,R,H.tile(3.4,4.95,5.1,.58,1.12),'teal',.21);
 for(const y of [5.03,5.51])H.line(R,[P(3.32,y,1.13),P(8.64,y,1.13)],'sun',2.3);
 shape(H,R,[P(2.5,5.24,1.48),P(3.18,4.86,1.49),P(3.19,5.71,1.35)],'teal',.39);
 oval(H,R,...P(2.99,5.29,1.5),8,4,'paper',1);oval(H,R,...P(2.99,5.29,1.52),4,2,'blue',.8);
 stroke(H,R,[P(2.58,5.25,1.53),P(2.26,5.25,1.72),P(2.15,5.25,1.6),P(2.39,5.25,1.5)],'blue',2.1);
 shape(H,R,[P(8.66,4.83,1.53),P(9.37,5.24,1.49),P(8.65,5.73,1.3)],'sun',.38);
 for(const x of [3.5,8.2]){
  H.line(R,[P(x,4.86,1.34),P(x+.2,4.86,1.34)],'blue',2.3);
  H.line(R,[P(x,4.86,1.34),P(x,4.86,1.47)],'blue',1.1);
 }
 for(const x of [3.4,4.25,5.1,5.95,6.8,7.65,8.5]){
  const rib=[P(x,4.69,1.62),P(x,4.91,1.16),P(x,5.32,1.08),P(x,5.8,1.17),P(x,6.0,1.56)];
  H.line(R,rib,'blue',3.4);H.line(R,rib,'sun',1.9);
 }
 for(const y of [5.0,5.57]){
  metal(H,R,5.56,y,1.85,.095,1.18,.08,'blue');
  H.line(R,[P(5.6,y+.035,1.28),P(7.35,y+.035,1.28)],'paper',1.6);
  for(const x of [5.54,7.36])metal(H,R,x,y-.055,.13,.19,1.23,.13,'coral');
 }
}
function oar(H,R,i,j,z,long=3.1){
 bentTube(H,R,[[i,j,z],[i+long,j+.16,z+.07]],2.7,'sun');
 shape(H,R,[H.p(i+long-.2,j+.15,z+.1),H.p(i+long+.85,j+.15,z+.11),H.p(i+long+1,j+.45,z-.05),H.p(i+long-.1,j+.42,z-.05)],'coral',.66);
 H.line(R,[H.p(i+.1,j,z),H.p(i+.65,j+.03,z+.01)],'blue',4.3);
}
const room=world('amsterdam-sloterplas-rowing','The seat finds its run',{floor:'paper',tone:.27,wall:'paper',wallTone:.6,height:3.6,head:60},(H,R)=>{
 masonry(H,R,'nw',.05,11.9,0,3.5,'paper',.65);
 windowBay(H,R,'ne',.8,10.65,1.34,2.07,{divisions:5,ink:'teal',view:P=>{
  shape(H,R,[P(.13,.13),P(10.5,.13),P(10.5,1.1),P(.13,1.1)],'teal',.25);
  shape(H,R,[P(.13,1.05),P(2.2,1.18),P(3.9,1.02),P(6,1.22),P(8.8,1.08),P(10.5,1.26),P(10.5,1.5),P(.13,1.5)],'teal',.4);
  for(let n=0;n<12;n++){const x=.25+n*.83;H.line(R,[P(x,.24+(n%3)*.16),P(x+.52,.24+(n%3)*.16)],'paper',1.1)}
  shape(H,R,[P(6.6,.72),P(7.3,.72),P(7.15,.6),P(6.71,.6)],'coral',.5);
 }});
 for(const x of [.45,6.1,11.65]){
  metal(H,R,x,.06,.11,.3,0,3.8,'teal');
  H.line(R,[H.p(x,.1,3.74),H.p(Math.min(11.7,x+2.8),.1,4.09),H.p(Math.min(11.7,x+5.5),.1,3.74)],'blue',3);
 }
 H.line(R,[H.p(.45,.1,3.75),H.p(11.7,.1,3.75)],'blue',3.2);
 for(let x=1.7;x<11.4;x+=1.7)H.line(R,[H.p(x,.1,3.75),H.p(x+.55,.1,4.03)],'teal',1.7);
 for(let j=0;j<12;j+=2)H.line(R,[H.p(0,j),H.p(12,j)],'blue',.55,{tone:.24});
 shape(H,R,H.tile(10.98,.7,.2,10.8,.012),'blue',.5);
 for(let j=1;j<11.4;j+=.3)H.line(R,[H.p(10.98,j,.019),H.p(11.18,j+.05,.019)],'paper',.8);
 H.tint(H.tile(2,2,8,5,.02),'sun',.1);
 cabinetFrame(H,R,3.04,.51,7.39,1.38,.08,.99,4,'teal',(i,j,w,d,z,h,n)=>{
  if(n===0){
   for(let k=0;k<3;k++)box(H,R,i+.08,j+.1,w-.17,d-.13,z+k*.18,.15,k===1?'paper':'sun',.55);
  }else if(n===1){
   for(let k=0;k<3;k++){
    const p=H.p(i+.35+k*.43,j+d,z+.27);
    oval(H,R,...p,6,10,'paper',1);oval(H,R,...p,3,6,'blue',.68);
   }
  }else if(n===2){
   box(H,R,i+.05,j+.08,w-.1,d-.05,z+.06,.57,'sun',.57);
   H.line(R,[H.p(i+.24,j+d+.03,z+.38),H.p(i+w-.22,j+d+.03,z+.38)],'blue',1.9);
  }else{
   drape(H,R,i+.06,j+.1,w-.12,d-.14,z+.17,.12,'paper');
   drape(H,R,i+.08,j+.1,w-.16,d-.16,z+.44,.1,'coral');
  }
 });
 timber(H,R,2.99,.48,7.5,1.48,1.08,.12,'sun');
 shape(H,R,H.tile(3.21,.66,1.82,1.07,1.22),'paper',1);
 for(let n=0;n<4;n++){
  const x=3.41+n*.37;
  H.line(R,[H.p(x,.86,1.23),H.p(x,1.53,1.23)],'blue',2.2);
  H.line(R,[H.p(x-.09,.86,1.23),H.p(x+.09,.86,1.23)],'teal',2.8);
 }
 const spool=H.p(5.77,1.12,1.24);
 oval(H,R,...spool,14,6,'teal',.6);oval(H,R,...spool,9,4,'paper',1);oval(H,R,...spool,4,2,'blue',.72);
 stroke(H,R,[[spool[0]+11,spool[1]+1],[spool[0]+23,spool[1]+5],[spool[0]+26,spool[1]+16]],'coral',2);
 metal(H,R,6.49,.69,1.37,.96,1.22,.13,'paper');
 for(let n=0;n<3;n++){
  const x=6.68+n*.35;
  H.line(R,[H.p(x,.84,1.37),H.p(x,1.45,1.37)],'blue',1.8);
  oval(H,R,...H.p(x,1.52,1.37),3.4,2,'sun',.7);
 }
 vessel(H,R,8.25,1.06,1.22,8,14,'teal',false);
 const brush=H.p(8.84,1.11,1.23);
 H.line(R,[[brush[0],brush[1]],[brush[0]+14,brush[1]+7]],'sun',3.3);
 shape(H,R,[[brush[0]-7,brush[1]-4],[brush[0]+2,brush[1]-1],[brush[0]+6,brush[1]-9],[brush[0]-3,brush[1]-12]],'paper',1);
 for(let n=0;n<4;n++)H.line(R,[[brush[0]-5+n*2,brush[1]-5],[brush[0]-2+n*2,brush[1]-10]],'blue',.65);
 const lamp=H.p(9.45,1.22,2.8);
 H.line(R,[H.p(9.45,1.22,3.88),[lamp[0],lamp[1]-12]],'blue',1.4);
 oval(H,R,...lamp,12,14,'sun',.5);
 for(const dx of [-7,0,7])stroke(H,R,[[lamp[0]+dx*.55,lamp[1]-13],[lamp[0]+dx,lamp[1]+1],[lamp[0]+dx*.55,lamp[1]+14]],'blue',.8);
 H.line(R,[[lamp[0]-10,lamp[1]+6],[lamp[0]+10,lamp[1]+6]],'blue',1.3);
 H.glow(lamp[0],lamp[1]+10,29,21,'sun',.18);
 for(const x of [3.67,8.13]){
  const P=(i,j,z)=>H.p(i,j,z);
  for(const y of [4.1,6.5])timber(H,R,x-.18,y,.22,.2,0,1.2,'teal');
  timber(H,R,x-.18,4.05,.22,2.71,1.14,.2,'teal');
  timber(H,R,x-.2,4.25,.25,2.1,.27,.14,'sun');
  H.line(R,[P(x,4.2,.3),P(x,6.4,1.13)],'blue',2.1);
  for(const y of [4.2,6.3])H.dot(...P(x+.05,y,1.21),2.1,'sun');
  drape(H,R,x-.25,4.45,.41,1.83,1.38,.13,'paper');
  shape(H,R,H.tile(x-.23,5.3,.37,.45,1.4),'coral',.4);
  H.line(R,[P(x-.2,5.39,1.42),P(x+.1,5.72,1.42)],'blue',.7);
 }
 hull(H,R);
 for(const y of [5.04,5.53]){
  const p=H.p(7.31,y,1.29);shape(H,R,[[p[0]-7,p[1]+5],[p[0]+7,p[1]+5],[p[0]+8,p[1]-12],[p[0]-5,p[1]-13]],'blue',.75);
  oval(H,R,p[0]+1,p[1]-8,5,5,'paper',.8);
  H.line(R,[[p[0]-6,p[1]-5],[p[0]+7,p[1]-5]],'coral',3);
  H.outline(R,[[p[0]-1,p[1]-8],[p[0]+5,p[1]-8],[p[0]+5,p[1]-2],[p[0]-1,p[1]-2]],'paper',.8);
 }
 metal(H,R,7.12,4.9,.22,.91,1.12,.23,'teal');
 bentTube(H,R,[[6.25,4.67,1.42],[6.25,3.6,1.65],[6.83,3.61,1.75]],2.6,'teal');
 metal(H,R,6.77,3.5,.16,.2,1.74,.26,'blue');
 oval(H,R,...H.p(6.85,3.6,2.04),5,3,'sun',.8);
 oar(H,R,3.1,3.31,1.62,3.7);
 rackFrame(H,R,.38,1.16,1.54,5.21,.06,[.15,1.42,2.8],'teal',(i,j,w,d,z,row)=>{
  if(row===2){drape(H,R,i,j,w,2.5,z,.23,'paper');const p=H.p(i+.6,j+3.75,z);shape(H,R,[[p[0]-16,p[1]],[p[0]+19,p[1]],[p[0]+10,p[1]+8],[p[0]-11,p[1]+7]],'sun',.65)}
  if(row===1){for(let n=0;n<3;n++){const p=H.p(i+.5,j+.6+n*1.2,z);shape(H,R,[[p[0]-14,p[1]-24],[p[0]-3,p[1]-20],[p[0]+3,p[1]-20],[p[0]+14,p[1]-24],[p[0]+16,p[1]+2],[p[0]-16,p[1]+2]],'coral',.65);H.line(R,[[p[0],p[1]-16],[p[0],p[1]]],'paper',1.6)}}
  if(row===0){box(H,R,i,j,w,1.2,z,.58,'teal',.4);for(const y of [j+1.8,j+2.85]){oval(H,R,...H.p(i+.6,y,z+.12),13,6,'paper',1);oval(H,R,...H.p(i+.6,y,z+.15),9,4,'blue',.4)}}
 });
 for(const j of [1.65,3.14,4.63]){
  const P=(y,z)=>H.p(2.03,j+y,z);
  H.line(R,[P(.37,2.95),P(.37,2.67)],'blue',1);
  shape(H,R,[P(0,2.59),P(.23,2.63),P(.34,2.36),P(.47,2.36),P(.61,2.63),P(.84,2.59),P(.92,1.71),P(-.07,1.71)],'coral',.66);
  H.line(R,[P(.41,2.28),P(.41,1.76)],'blue',1.2);
  for(const z of [1.95,2.19]){H.line(R,[P(.06,z),P(.77,z)],'paper',2);H.outline(R,[P(.29,z-.07),P(.49,z-.07),P(.49,z+.07),P(.29,z+.07)],'blue',.7)}
 }
 for(const j of [10.37,11.05]){
  H.line(R,[H.p(.19,j,.34),H.p(.19,j,3.22)],'blue',3.1);
  shape(H,R,[H.p(.19,j-.2,2.48),H.p(.19,j+.2,2.48),H.p(.19,j+.24,3.25),H.p(.19,j-.24,3.25)],'sun',.55);
  H.line(R,[H.p(.19,j,2.55),H.p(.19,j,3.17)],'paper',1.4);
 }
 for(const x of [9.07,10.9]){
  timber(H,R,x,8.12,.12,.12,.1,1.34,'teal');
  timber(H,R,x,8.12,.12,2,.24,.12,'teal');
 }
 timber(H,R,9.07,8.12,1.96,.14,1.03,.35,'sun');
 benchFrame(H,R,8.95,8.1,2.2,2.2,.62,'sun');
 drape(H,R,9.03,8.2,1.9,1.87,.65,.15,'teal');
 drape(H,R,10.13,8.32,.71,1.57,.69,.26,'paper');
 vessel(H,R,9.3,9.27,.7,6,23,'coral',false);
 box(H,R,9.2,10.38,1.62,.9,.02,.12,'blue',.45);
 for(const x of [9.55,10.25]){
  const p=H.p(x,10.78,.2);
  shape(H,R,[[p[0]-9,p[1]+3],[p[0]+12,p[1]+3],[p[0]+12,p[1]-3],[p[0]+3,p[1]-8],[p[0]-7,p[1]-9]],'paper',1);
  for(let n=0;n<3;n++)H.line(R,[[p[0]-4+n*3,p[1]-6],[p[0]-1+n*3,p[1]-2]],'coral',.9);
 }
 const dry=H.p(10.96,8.88,.71);
 shape(H,R,[[dry[0]-12,dry[1]],[dry[0]+12,dry[1]],[dry[0]+13,dry[1]-27],[dry[0]-10,dry[1]-29]],'coral',.64);
 H.line(R,[[dry[0]-12,dry[1]-29],[dry[0]+13,dry[1]-27]],'blue',5);
 H.line(R,[[dry[0]-10,dry[1]-29],[dry[0]+10,dry[1]-27]],'paper',1.5);
 stroke(H,R,[[dry[0]-9,dry[1]-26],[dry[0]-8,dry[1]-37],[dry[0]+8,dry[1]-36],[dry[0]+10,dry[1]-26]],'blue',1.4);
 timber(H,R,2.34,9.02,3.35,1.21,.22,.1,'teal');
 for(let n=0;n<3;n++)box(H,R,2.45+n*.98,9.16,.81,.94,.34,.19,n===1?'paper':'sun',.46);
 benchFrame(H,R,2.12,8.85,3.8,1.63,.68,'sun');
 shape(H,R,H.tile(2.22,8.98,3.59,1.23,.7),'paper',1);
 metal(H,R,2.21,8.89,3.63,.12,.72,.09,'teal');
 for(let n=0;n<20;n++)H.line(R,[H.p(2.31+n*.172,8.92,.83),H.p(2.31+n*.172,9.02+(n%5?.02:.08),.83)],'paper',.7);
 for(const x of [3.05,4.46]){
  const Q=(dx,dy)=>H.p(x+dx,9.6+dy,.74);
  shape(H,R,[Q(0,.5),Q(.42,.5),Q(.48,.2),Q(.36,-.1),Q(.13,-.14),Q(-.05,.17)],'teal',.22);
  H.line(R,[Q(.2,-.06),Q(.2,.43)],'blue',.7);
 }
 const pad=H.p(5.56,9.7,.75);
 oval(H,R,...pad,9,5,'blue',.7);oval(H,R,...pad,6,3,'paper',1);
 oval(H,R,...H.p(2.73,9.38,.72),13,8,'paper',1);
 for(const [i,l] of [[3.37,.85],[4.46,1.12]]){timber(H,R,i,9.18,l,.17,.74,.14,'sun');H.line(R,[H.p(i+.04,9.28,.9),H.p(i+l*.73,9.28,.9)],'blue',4)}
 shape(H,R,H.tile(4.83,9.68,.61,.54,.72),'teal',.5);
 stroke(H,R,[H.p(5.02,9.8,.73),H.p(5.25,9.78,.96),H.p(5.45,9.84,.78)],'coral',2.5);
 const TP=(u,z)=>wallPt(H,'nw',6.86+u,z,-.16);
 shape(H,R,[TP(0,.67),TP(2.81,.67),TP(2.81,1.79),TP(0,1.79)],'teal',.42);
 H.line(R,[TP(.1,1.64),TP(2.7,1.64)],'paper',2.2);
 for(const [x,h,col] of [[.41,.61,'sun'],[1.06,.45,'paper'],[1.78,.73,'coral'],[2.38,.49,'sun']]){
  H.dot(...TP(x,1.6),2,'blue');
  H.line(R,[TP(x,1.57),TP(x,1.57-h)],col,3.3);
  H.line(R,[TP(x-.1,1.01-h*.15),TP(x,1.15-h*.19),TP(x+.11,1.01-h*.15)],'blue',1.6);
 }
 metal(H,R,.21,6.82,.22,.67,.29,.24,'paper');
 for(const j of [7.01,7.3])H.dot(...H.p(.45,j,.42),2,'blue');
 const p=H.p(.38,7.9,2.6);H.line(R,[H.p(.38,7.9,3.7),p],'blue',1);oval(H,R,...p,10,9,'sun',.55);oval(H,R,...p,5,4,'blue',.7);
 stroke(H,R,[H.p(.4,8.7,2.9),H.p(.42,8.55,2.4),H.p(.41,9.04,2.15),H.p(.42,9.54,2.42),H.p(.4,9.38,2.8)],'teal',4);
},(H,R,t)=>{
 const u=cycle(t,20)*20,move=smooth(4,8,u)*(1-smooth(12,18,u)),i=6.04+.57*move,j=5.3;
 for(const y of [5.02,5.59]){
  const p=H.p(i,y,1.34);oval(H,R,...p,4.3,4.3,'blue',.8);H.dot(...p,1.5,'sun');
 }
 box(H,R,i-.27,4.94,.63,.83,1.36,.12,'teal',.6);
 shape(H,R,H.tile(i-.23,4.98,.55,.75,1.5),'paper',1);
 const root=H.p(i,j,.77),scale=1.8;
 Object.assign(rower,base,{drop:.47,lean:-move*8,head:10+move*7,al:48,ar:56,el:48,er:39});
 for(const [n,side]of ['l','r'].entries()){
  const f=H.p(7.27,5.06+n*.48,1.29),dx=(f[0]-root[0])/scale-(n?1:-1)*5.2*.45,dy=(f[1]-root[1])/scale+19-.47*19;
  const a=9.88,b=9.5,d=Math.min(19.35,Math.max(.2,Math.hypot(dx,dy)));
  rower['l'+side]=(Math.atan2(dx,dy)+Math.acos(Math.max(-1,Math.min(1,(a*a+d*d-b*b)/(2*a*d)))))*180/Math.PI;
  rower['k'+side]=-(180-Math.acos(Math.max(-1,Math.min(1,(a*a+b*b-d*d)/(2*a*b))))*180/Math.PI);
 }
 actor(H,R,i,j,u,'amsterdam-rowing-seat',{face:'se',shirt:['coral',.7],pants:['blue',.76],hairStyle:'pony',skin:['coral',.36]},.77,scale);
 hull(H,R,true);
 actor(H,R,3.63,6.89,u,'amsterdam-rowing-mate',{face:'se',shirt:['teal',.65],skin:['coral',.53],hairStyle:'curly'},0,1.8);
 const s=.04*Math.sin(u*Math.PI/10);
 drape(H,R,.53,1.31,1.19,.93,2.95,.24+s,'paper');
 stroke(H,R,[H.p(7.43,5.53,1.27),H.p(7.58+s,5.58,1.15),H.p(7.65+s,5.6,1.13)],'coral',1.5);
});
room.loopSeconds=20;
room.stillTime=6;
export default room;
