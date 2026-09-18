import { world, box, shape, oval, stroke, actor, cycle, mix, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, drape, benchFrame, bentTube, vessel } from '../materials.js';
import { masonry, rackFrame } from '../structure.js';
import { windowBay, hangingRail, floorShadow } from '../joinery.js';

const base={...FIGURES.clips.idle.keys[0][1]},rower={...base};
FIGURES.clips['amsterdam-rowing-seat']={dur:20,keys:[[0,rower],[1,rower]]};
FIGURES.clips['amsterdam-rowing-mate']={dur:20,keys:[[0,{...base,lean:7,al:70,ar:78,el:38,er:25,head:17}],[.5,{...base,lean:11,al:73,ar:80,el:36,er:23,head:12}],[.9,{...base,lean:7,al:70,ar:78,el:38,er:25,head:17}],[1,{...base,lean:7,al:70,ar:78,el:38,er:25,head:17}]]};
const smooth=(a,b,t)=>{const f=Math.max(0,Math.min(1,(t-a)/(b-a)));return f*f*(3-2*f)};
function hull(H,R,front=false){
 const P=(x,y,z)=>H.p(x,y,z);
 const rear=[P(2.3,5.22,1.52),P(3.08,4.6,1.62),P(8.77,4.6,1.62),P(9.56,5.23,1.51),P(8.83,5.6,1.02),P(3.2,5.59,1.03)];
 const near=[P(2.3,5.22,1.52),P(3.07,6.02,1.57),P(8.76,6.02,1.57),P(9.56,5.23,1.51),P(8.62,5.9,.95),P(3.28,5.9,.94)];
 if(front){shape(H,R,near,'sun',.68);H.line(R,[P(2.3,5.22,1.54),P(3.07,6.02,1.59),P(8.76,6.02,1.59),P(9.56,5.23,1.54)],'paper',2.6);for(let n=0;n<8;n++)H.line(R,[P(3.3+n*.7,5.99,1.11),P(3.44+n*.7,6.02,1.45)],'coral',.65,{tone:.45});return}
 shape(H,R,rear,'sun',.75);
 shape(H,R,[P(2.4,5.23,1.48),P(3.25,4.78,1.48),P(8.6,4.78,1.48),P(9.43,5.23,1.47),P(8.54,5.83,1.15),P(3.37,5.83,1.15)],'paper',1);
 shape(H,R,H.tile(3.4,4.95,5.1,.58,1.12),'teal',.21);
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
 benchFrame(H,R,8.95,8.1,2.2,2.2,.62,'sun');
 drape(H,R,9.03,8.2,1.9,1.87,.65,.15,'teal');
 drape(H,R,10.13,8.32,.71,1.57,.69,.26,'paper');
 vessel(H,R,9.3,9.27,.7,6,23,'coral',false);
 box(H,R,9.2,10.38,1.62,.9,.02,.12,'blue',.45);
 for(const x of [9.55,10.25])oval(H,R,...H.p(x,10.78,.2),10,5,'paper',1);
 benchFrame(H,R,2.12,8.85,3.8,1.63,.68,'sun');
 oval(H,R,...H.p(2.73,9.38,.72),13,8,'paper',1);
 for(const [i,l] of [[3.37,.85],[4.46,1.12]]){timber(H,R,i,9.18,l,.17,.74,.14,'sun');H.line(R,[H.p(i+.04,9.28,.9),H.p(i+l*.73,9.28,.9)],'blue',4)}
 shape(H,R,H.tile(4.83,9.68,.61,.54,.72),'teal',.5);
 stroke(H,R,[H.p(5.02,9.8,.73),H.p(5.25,9.78,.96),H.p(5.45,9.84,.78)],'coral',2.5);
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
