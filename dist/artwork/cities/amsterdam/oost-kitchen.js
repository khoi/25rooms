import { world, box, shape, oval, stroke, actor, cycle, mix, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, drape, benchFrame, bentTube, vessel, pendant } from '../materials.js';
import { cabinetFrame, basin } from '../structure.js';
import { windowBay, recessedFrame, wallRack, hangingRail, panelFront, caster, floorShadow } from '../joinery.js';

const base={...FIGURES.clips.idle.keys[0][1]};
const rigs=Array.from({length:3},(_,n)=>{const pose={...base};FIGURES.clips['amsterdam-oost-neighbour-'+n]={dur:22,keys:[[0,pose],[1,pose]]};return pose});
const smooth=(a,b,t)=>{const f=Math.max(0,Math.min(1,(t-a)/(b-a)));return f*f*(3-2*f)};
function bowl(H,R,i,j,z,r=10,ink='paper'){
 const [x,y]=H.p(i,j,z);shape(H,R,[[x-r,y-7],[x+r,y-7],[x+r*.63,y+5],[x-r*.63,y+5]],ink,.8);oval(H,R,x,y-7,r,r*.36,'blue',.55);oval(H,R,x,y-7,r*.81,r*.26,'paper',1);
}
function pot(H,R,i,j,z){
 vessel(H,R,i,j,z,24,30,'teal',false);
 const [x,y]=H.p(i,j,z);oval(H,R,x,y-31,25,9,'paper',1);oval(H,R,x,y-34,21,8,'teal',.45);
 stroke(H,R,[[x-5,y-39],[x-4,y-46],[x+5,y-46],[x+6,y-39]],'blue',3);
 for(const dx of [-1,1])stroke(H,R,[[x+dx*22,y-20],[x+dx*33,y-21],[x+dx*34,y-12],[x+dx*23,y-11]],'blue',3.2);
 H.line(R,[[x+25,y-18],[x+31,y-17]],'coral',3.3);
}
function tray(H,R,i,j,z){
 const P=(x,y,h=0)=>H.p(i+x,j+y,z+h);
 shape(H,R,[P(0,.1),P(.1,0),P(1.46,0),P(1.57,.12),P(1.57,.74),P(1.46,.83),P(.1,.83),P(0,.72)],'blue',.65);
 shape(H,R,[P(.11,.14,.045),P(1.46,.14,.045),P(1.46,.7,.045),P(.11,.7,.045)],'paper',.85);
 H.line(R,[P(.15,.2,.055),P(1.4,.2,.055),P(1.4,.62,.055)],'teal',1);
 for(const x of [-.13,1.7]){
  stroke(H,R,[P(x<0?.03:1.55,.21),P(x,.21,.09),P(x,.63,.09),P(x<0?.03:1.55,.63)],'blue',3);
  if(x<0){H.line(R,[P(x,.28,.1),P(x,.56,.1)],'paper',5);for(let y=.3;y<.57;y+=.07)H.line(R,[P(x-.025,y,.11),P(x+.025,y,.11)],'sun',.7)}
 }
 shape(H,R,[P(.1,.79,-.01),P(.63,.79,-.01),P(.57,.81,-.12),P(.13,.81,-.12)],'coral',.35);
}
const room=world('amsterdam-oost-kitchen','A tray between neighbours',{floor:'paper',tone:.32,wall:'paper',wallTone:.82,height:3.8,pattern:'tiles',accent:'teal',head:50},(H,R)=>{
 for(const side of ['nw','ne']){
  const P=(u,z)=>wallPt(H,side,u,z,-.075);
  for(let u=.1;u<11.9;u+=.53)for(let z=.13;z<1.7;z+=.35)H.outline(R,[P(u,z),P(u+.49,z),P(u+.49,z+.31),P(u,z+.31)],'teal',.55,{tone:.33});
 }
 windowBay(H,R,'nw',1.0,5.4,1.65,1.74,{divisions:3,ink:'teal',view:P=>{
  shape(H,R,[P(.13,.13),P(5.23,.13),P(5.23,.88),P(.13,.7)],'teal',.15);
  for(let n=0;n<4;n++)shape(H,R,[P(.3+n*1.2,.3),P(.3+n*1.2,1.13),P(.92+n*1.2,1.13),P(.92+n*1.2,.3)],n%2?'paper':'coral',n%2?1:.2);
 }});
 cabinetFrame(H,R,.42,.35,10.7,1.3,.07,1.18,5,'teal',(i,j,w,d,z,h,n)=>{
  if(n===0){for(let k=0;k<4;k++)metal(H,R,i+.15+k*.39,j+.16,.16,.94,z,.78,'blue')}
  else if(n===1){box(H,R,i+.1,j+.07,w-.2,.97,z,.83,'paper',1);for(let k=0;k<3;k++){H.line(R,[H.p(i+.13,j+1.05,z+.25+k*.23),H.p(i+w-.13,j+1.05,z+.25+k*.23)],'blue',.8);H.dot(...H.p(i+w*.5,j+1.07,z+.16+k*.23),1.7,'coral')}}
  else if(n===2){bowl(H,R,i+w*.5,j+.64,z+.27,19,'coral');timber(H,R,i+.1,j+.1,.16,d,z,.85,'sun')}
  else if(n===3){for(let k=0;k<2;k++)box(H,R,i+.12+k*.85,j+.13,.74,.84,z,.79,k?'sun':'paper',.65)}
  else {for(let k=0;k<3;k++)box(H,R,i+.11,j+.1,w-.19,.96,z+.12+k*.2,.17,k===1?'teal':'paper',.8)}
 });
 timber(H,R,.32,.27,10.92,1.51,1.25,.16,'sun');
 cabinetFrame(H,R,.44,.13,2.37,.57,1.91,1.65,2,'teal',(i,j,w,d,z,h,n)=>{
  timber(H,R,i,j,w,d,z+.66,.07,'sun');
  if(n===0){
   for(let k=0;k<3;k++)bowl(H,R,i+.27+k*.24,j+.19,z+.76,7,k===1?'coral':'paper');
   box(H,R,i+.08,j+.05,w-.16,d-.08,z,.46,'paper',1);
   shape(H,R,H.faceI(i+.2,j+d+.01,w-.4,z+.1,z+.31),'sun',.5);
  }else{
   for(let k=0;k<3;k++){
    const p=H.p(i+.46,j+.24,z+.8+k*.15);oval(H,R,...p,9,4,'paper',1);
   }
   for(let k=0;k<2;k++)vessel(H,R,i+.2+k*.41,j+.19,z+.08,5,15,k?'teal':'coral',false);
  }
 });
 for(const x of [.57,2.59])H.line(R,[H.p(x,.7,1.99),H.p(x,.16,1.73)],'blue',1.7);
 shape(H,R,H.tile(3.03,.66,2.54,1.1,1.43),'paper',1);
 const loaf=H.p(3.96,1.29,1.46);
 shape(H,R,[[loaf[0]-24,loaf[1]+3],[loaf[0]+21,loaf[1]+2],[loaf[0]+25,loaf[1]-5],[loaf[0]+13,loaf[1]-15],[loaf[0]-9,loaf[1]-16],[loaf[0]-25,loaf[1]-5]],'sun',.66);
 for(let n=0;n<4;n++)H.line(R,[[loaf[0]-14+n*9,loaf[1]-12],[loaf[0]-18+n*9,loaf[1]-4]],'paper',1.5);
 H.line(R,[H.p(4.72,.86,1.47),H.p(4.72,1.52,1.47)],'blue',2.3);
 H.line(R,[H.p(4.72,1.51,1.47),H.p(4.72,1.75,1.47)],'coral',3.5);
 for(const x of [5.17,5.47]){
  const p=H.p(x,1.47,1.45);oval(H,R,...p,7,4,'sun',.66);H.line(R,[[p[0]-5,p[1]-1],[p[0]+4,p[1]+2]],'paper',1.2);
 }
 for(const x of [1.12,1.74,2.36]){
  vessel(H,R,x,.87,1.44,8,17,x<1.5?'coral':'paper',false);
  H.line(R,[H.p(x-.14,.9,1.67),H.p(x+.13,.9,1.67)],'teal',1.1);
 }
 drape(H,R,5.96,.49,1.17,.88,1.45,.14,'paper');
 stroke(H,R,[H.p(6.04,.63,1.51),H.p(6.54,.63,1.82),H.p(7.01,.65,1.51)],'sun',2);
 vessel(H,R,7.38,.93,1.43,8,15,'teal',false);

 basin(H,R,8.09,.48,2.7,1.04,1.4,'paper');
 metal(H,R,10.86,.5,.48,1.02,1.45,.055,'teal');
 for(let n=0;n<6;n++)H.line(R,[H.p(10.9,.56+n*.16,1.52),H.p(11.3,.56+n*.16,1.52)],'paper',.8);
 const sponge=H.tile(10.95,1.01,.3,.34,1.54);shape(H,R,sponge,'sun',.65);
 stroke(H,R,[H.p(9.29,.59,1.59),H.p(9.29,.59,.72),H.p(9.73,.65,.55),H.p(9.95,.73,.72)],'blue',3);
 H.line(R,[H.p(9.29,.59,.74),H.p(9.29,.59,.61)],'paper',1.4);
 for(const x of [10.3,10.56]){
  vessel(H,R,x,.72,1.66,4.6,14,x<10.4?'coral':'teal',false);
  H.line(R,[H.p(x,.73,1.98),H.p(x,.85,1.98)],'blue',1.2);
 }
 recessedFrame(H,R,'ne',3.3,4.4,1.83,1.82,'sun',P=>{
  shape(H,R,[P(.14,.14),P(4.27,.14),P(4.27,1.68),P(.14,1.68)],'blue',.46);
  shape(H,R,[P(.14,.15),P(4.27,.15),P(4.27,.92),P(.14,.92)],'sun',.18);
  for(const x of [.4,1.62,2.84]){
   shape(H,R,[P(x,.14),P(x+.94,.14),P(x+.94,.48),P(x,.48)],'paper',.75);
   H.line(R,[P(x+.04,.52),P(x+.9,.52)],'coral',1.4);
   for(let n=0;n<3;n++)oval(H,R,...P(x+.2+n*.27,.44),3.8,5.5,'sun',.7);
  }
  H.line(R,[P(.24,1.2),P(4.06,1.2)],'paper',3);
  for(const x of [.52,1.32,2.12,2.92,3.72]){
   shape(H,R,[P(x-.2,1.24),P(x+.2,1.24),P(x+.15,1.49),P(x-.15,1.49)],'paper',1);
   H.line(R,[P(x-.14,1.38),P(x+.14,1.38)],'teal',1.1);
  }
 });
 timber(H,R,3.26,.12,4.51,.79,1.79,.14,'sun');
 wallRack(H,R,'ne',8.1,3.14,2.25,1.2,2,'teal',(P,z,row)=>{
  if(row){for(let n=0;n<3;n++){const x=.3+n*.86;shape(H,R,[P(x,z+.05),P(x+.62,z+.05),P(x+.54,z+.31),P(x+.09,z+.34)],n===1?'coral':'paper',.8)}}
  else for(let n=0;n<5;n++)oval(H,R,...P(.37+n*.56,z+.16),5,4,'paper',.9);
 });
 hangingRail(H,R,'nw',7.03,4.15,3.15,5,(P,u,n)=>{
  if(n===0){stroke(H,R,[P(u,-.1),P(u,-.73)],'blue',1.3);oval(H,R,...P(u,-.8),4,7,'paper',.8)}
  else if(n===1){stroke(H,R,[P(u,-.15),P(u,-.45)],'blue',1.3);for(let k=-2;k<=2;k++)stroke(H,R,[P(u,-.42),P(u+k*.07,-.67),P(u,-.8)],'blue',.7)}
  else {shape(H,R,[P(u-.3,-.2),P(u+.3,-.2),P(u+.37,-1.03),P(u-.37,-1.03)],n===3?'coral':'teal',.4);H.line(R,[P(u-.22,-.74),P(u+.22,-.74)],'paper',1)}
 });
 shape(H,R,H.faceJ(.17,7.09,3.79,.1,1.27),'blue',.58);
 for(const j of [7.09,8.84,10.74])timber(H,R,.15,j,1.33,.14,.07,1.21,'teal');
 timber(H,R,.15,7.09,1.43,3.79,.08,.13,'teal');
 shape(H,R,H.faceJ(1.5,7.28,1.37,.29,.99),'blue',.78);
 shape(H,R,H.faceJ(1.52,7.42,1.08,.39,.78),'teal',.37);
 H.line(R,[H.p(1.54,7.4,1.03),H.p(1.54,8.58,1.03)],'paper',2.3);
 for(const j of [7.47,7.88,8.29])H.dot(...H.p(1.54,j,1.16),2.8,'sun');
 for(const j of [9.1,9.89]){
  shape(H,R,H.faceJ(1.5,j,.69,.25,1.17),'teal',.43);
  shape(H,R,H.faceJ(1.51,j+.09,.51,.37,1.02),'teal',.2);
  H.line(R,[H.p(1.54,j+.51,.78),H.p(1.54,j+.51,.99)],'sun',2.1);
 }
 timber(H,R,.11,7.04,1.48,3.89,1.27,.14,'sun');
 const hood=[H.p(.22,7.21,2.31),H.p(1.27,7.21,2.31),H.p(1.27,8.72,2.31),H.p(.22,8.72,2.31)];
 shape(H,R,hood,'blue',.65);
 shape(H,R,[H.p(.22,7.21,2.31),H.p(1.27,7.21,2.31),H.p(.72,7.51,2.64),H.p(.22,7.51,2.64)],'paper',1);
 shape(H,R,[H.p(1.27,7.21,2.31),H.p(1.27,8.72,2.31),H.p(.72,8.41,2.64),H.p(.72,7.51,2.64)],'teal',.42);
 metal(H,R,.24,7.52,.48,.85,2.64,.47,'paper');
 H.line(R,[H.p(1.28,7.29,2.32),H.p(1.28,8.63,2.32)],'sun',2.3);
 for(let n=0;n<4;n++)H.line(R,[H.p(.83,7.48+n*.26,2.32),H.p(1.12,7.48+n*.26,2.32)],'paper',.7);
 metal(H,R,.32,7.2,1.05,1.56,1.42,.06,'paper');
 for(const j of [7.65,8.3]){
  oval(H,R,...H.p(.85,j,1.5),12,6,'blue',.69);oval(H,R,...H.p(.85,j,1.51),7,3.5,'paper',1);
 }
 const pan=H.p(.85,7.68,1.56);
 oval(H,R,...pan,13,6,'teal',.6);oval(H,R,pan[0],pan[1]-5,13,6,'blue',.6);
 H.line(R,[[pan[0]+12,pan[1]-3],[pan[0]+28,pan[1]+5]],'blue',4);
 for(const j of [9.14,9.91,10.51])bowl(H,R,.83,j,1.46,11,j===9.91?'coral':'paper');
 bentTube(H,R,[[1.65,9.27,1.17],[1.65,10.36,1.17]],1.7,'teal');
 shape(H,R,H.faceJ(1.69,9.49,.58,.49,1.18),'paper',1);
 for(let n=0;n<3;n++)H.line(R,[H.p(1.7,9.59+n*.16,.55),H.p(1.7,9.59+n*.16,1.12)],'coral',1.1);
 floorShadow(H,2.6,4.52,6.62,2.5,.2);
 timber(H,R,2.83,4.8,6.09,1.78,.32,.12,'teal');
 for(const [x,ink] of [[3.02,'sun'],[4.67,'teal'],[6.33,'coral']]){
  box(H,R,x,4.96,1.35,1.43,.46,.39,ink,.4);
  shape(H,R,H.tile(x+.08,5.05,1.19,1.24,.87),'blue',.54);
  for(let n=0;n<3;n++){
   const p=H.p(x+.26+n*.35,5.66,.91);
   oval(H,R,...p,6,4,n===1?'coral':'sun',.7);
   H.line(R,[[p[0],p[1]-3],[p[0]+2,p[1]-8]],'teal',1);
  }
 }
 benchFrame(H,R,2.6,4.5,6.6,2.4,1.33,'sun');
 for(const x of [2.72,8.22]){
  shape(H,R,H.faceI(x,6.84,.8,.95,1.18),'teal',.4);
  H.line(R,[H.p(x+.19,6.86,1.07),H.p(x+.61,6.86,1.07)],'blue',1.8);
 }
 shape(H,R,H.tile(5.89,4.61,1.25,1.04,1.38),'teal',.22);
 const chopped=H.p(6.45,4.96,1.41);
 for(const [dx,dy] of [[-9,-2],[0,2],[9,5],[-4,8]]){
  oval(H,R,chopped[0]+dx,chopped[1]+dy,5,2.7,'coral',.7);
  H.line(R,[[chopped[0]+dx-2,chopped[1]+dy],[chopped[0]+dx+2,chopped[1]+dy]],'paper',.8);
 }
 H.line(R,[H.p(6.97,4.69,1.42),H.p(6.97,5.31,1.42)],'blue',2.8);
 H.line(R,[H.p(6.97,5.31,1.42),H.p(6.97,5.58,1.42)],'coral',3.5);
 bowl(H,R,7.42,5.05,1.39,9,'paper');
 for(const x of [2.86,8.85])for(const y of [4.69,6.62]){metal(H,R,x-.02,y-.02,.23,.23,1.06,.16,'blue');H.dot(...H.p(x+.11,y+.23,1.13),2.3,'sun')}
 bentTube(H,R,[[2.86,6.61,.28],[8.96,6.61,.28]],2.5,'teal');
 metal(H,R,7.82,4.66,1.09,1.12,1.35,.07,'blue');
 for(let n=0;n<4;n++)H.line(R,[H.p(7.88+n*.27,4.68,1.44),H.p(7.88+n*.27,5.72,1.44)],'paper',1.1);
 pot(H,R,8.35,5.13,1.47);
 const ring=H.p(3.48,5.12,1.36);oval(H,R,...ring,23,11,'blue',.65);oval(H,R,...ring,17,7.5,'paper',1);bowl(H,R,3.48,5.12,1.39,14,'paper');
 shape(H,R,H.tile(4.31,4.67,1.37,.85,1.37),'paper',1);
 for(let n=0;n<3;n++){const p=H.p(4.58+n*.33,4.99,1.39);oval(H,R,...p,5.1,3.3,['coral','teal','sun'][n],.7);H.line(R,[[p[0],p[1]-2],[p[0]+2,p[1]-7]],'teal',.8)}
 shape(H,R,H.tile(4.3,4.67,.26,.24,1.39),'coral',.4);
 for(const i of [3.0,4.8,6.6])drape(H,R,i,6.08,1.6,.83,1.36,.06,'paper');
 bentTube(H,R,[[9.6,8.28,.13],[9.6,8.28,1.76],[10.87,8.28,1.76],[10.87,8.28,.13]],2.5,'teal');
 for(const z of [.23,.94])metal(H,R,9.43,8.31,1.59,1.87,z,.08,'paper');
 for(const x of [9.54,10.88])for(const j of [8.41,10.04])caster(H,R,x,j,.13);
 for(let n=0;n<3;n++)box(H,R,9.58,8.45,1.22,1.45,.36+n*.18,.14,n===1?'coral':'teal',.35);
 for(let n=0;n<4;n++){const [x,y]=H.p(9.66+n*.31,9.12,1.24);oval(H,R,x,y,4.5,14,'paper',1);H.line(R,[[x-3,y-10],[x+3,y+10]],'blue',.7)}
 drape(H,R,9.49,8.4,1.51,.31,1.01,.16,'paper');
 timber(H,R,1.23,9.25,2.43,1.12,.25,.1,'teal');
 for(let n=0;n<3;n++)box(H,R,1.46,9.38,1.65,.82,.37+n*.1,.075,n===1?'coral':'paper',.7);
 benchFrame(H,R,1.06,9.02,2.8,1.59,.73,'sun');
 shape(H,R,H.tile(1.25,9.23,1.52,.87,.76),'paper',1);
 const dough=H.p(1.95,9.65,.8);
 oval(H,R,...dough,14,7,'sun',.36);
 for(const dx of [-7,0,7])H.line(R,[[dough[0]+dx-3,dough[1]-3],[dough[0]+dx+3,dough[1]+3]],'paper',1.3);
 timber(H,R,1.14,9.99,1.65,.13,.8,.08,'sun');
 for(const x of [1.14,2.68])H.line(R,[H.p(x,10.06,.83),H.p(x-.17,10.06,.83)],'coral',2.6);
 for(let n=0;n<3;n++){
  const p=H.p(3.42,9.22+n*.19,.79);oval(H,R,...p,4,2.2,'sun',.52);
 }
 oval(H,R,...H.p(3.28,9.47,.77),8,4,'teal',.6);
 H.line(R,[H.p(3.29,9.52,.81),H.p(3.29,10.13,.81)],'sun',3);
 drape(H,R,2.78,9.85,.86,.47,.76,.18,'paper');
 pendant(H,R,5.96,5.2,3.84,2.83,'coral',1.1);
 const p=wallPt(H,'nw',10.27,3.47,-.22);oval(H,R,...p,10,9,'paper',1);H.line(R,[[p[0],p[1]],[p[0],p[1]-5],[p[0]+3,p[1]-2]],'blue',1.1);
},(H,R,t)=>{
 const u=cycle(t,22)*22,out=smooth(4.4,8.8,u),back=smooth(13.2,19,u),travel=out*(1-back),lift=.1*smooth(.6,3.7,u)*(1-smooth(18.8,20,u));
 const ti=3.05+3.55*travel,tj=6.12,tz=1.37+lift;
 tray(H,R,ti,tj,tz);
 const positions=[3.43,5.28,7.18];
 for(let n=0;n<3;n++){
  const i=positions[n],j=6.99,pose=rigs[n],scale=1.8,origin=H.p(i,j);
  const left=[ti-.13,tj+.43,tz+.09],right=[ti+1.7,tj+.43,tz+.09],hand=Math.abs(i-left[0])<Math.abs(i-right[0])?left:right;
  const distance=Math.abs(i-hand[0]),grip=Math.max(0,Math.min(1,(1.32-distance)/.34));
  Object.assign(pose,base,{head:n===2?12*smooth(8.8,10.5,u)*(1-smooth(13.2,15,u)):8,al:24,ar:26,el:47,er:45});
  for(const [k,side]of ['l','r'].entries()){
   const target=H.p(hand[0],hand[1]+(k?-.08:.08),hand[2]),dx=(target[0]-origin[0])/scale-(k?1:-1)*5.2,dy=(target[1]-origin[1])/scale+32.5;
   const d=Math.min(8.54,Math.max(.2,Math.hypot(dx,dy))),a=4.368,b=4.2;
   const alpha=(Math.atan2(dx,dy)-Math.acos(Math.max(-1,Math.min(1,(a*a+d*d-b*b)/(2*a*d)))))*180/Math.PI,beta=180-Math.acos(Math.max(-1,Math.min(1,(a*a+b*b-d*d)/(2*a*b))))*180/Math.PI;
   pose['a'+side]=mix(pose['a'+side],alpha,grip);pose['e'+side]=mix(pose['e'+side],beta,grip);
  }
  actor(H,R,i,j,u,'amsterdam-oost-neighbour-'+n,{face:'se',shirt:[['teal','coral','paper'][n],n===2?1:.64],apron:[n===2?'coral':'paper',.8],skin:['coral',[.48,.25,.56][n]],hairStyle:['curly','bun','short'][n],glasses:n===2},0,scale);
 }
 const P=(x,z)=>wallPt(H,'nw',8.23+x,z,-.32),s=.045*Math.sin(u*Math.PI/11);
 shape(H,R,[P(-.3,2.75),P(.3,2.75),P(.35+s,2.15),P(-.35+s,2.15)],'teal',.4);
 H.line(R,[P(-.23,2.33),P(.22+s,2.33)],'paper',1);
});
room.loopSeconds=22;
room.stillTime=6.6;
export default room;
