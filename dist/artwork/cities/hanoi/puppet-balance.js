import { world, shape, oval, stroke, actor, cycle, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, bentTube, drape, cushion, vessel, floorLight } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, hangingRail, taskLight, caster, wallRack, panelFront } from '../joinery.js';

const base=FIGURES.clips.idle.keys[0][1],tech={...base,al:28,el:45,ar:80,er:20,head:12};
FIGURES.clips.hanoiPuppetTech={dur:18,keys:[[0,tech],[1,tech]]};
FIGURES.clips.hanoiPuppetBrace={dur:18,keys:[[0,{...base,drop:.34,ll:78,kl:-150,lr:-12,kr:100,al:55,ar:62,el:25,er:20,head:10}],[.5,{...base,drop:.34,ll:78,kl:-150,lr:-12,kr:100,al:55,ar:62,el:25,er:20,head:-8}],[1,{...base,drop:.34,ll:78,kl:-150,lr:-12,kr:100,al:55,ar:62,el:25,er:20,head:10}]]};
const ease=x=>{const u=Math.max(0,Math.min(1,x));return u*u*(3-2*u)};
function puppet(H,R,x,y,s=1,angle=0,ink='teal',repair=false){
 const P=(a,b)=>[x+(a*Math.cos(angle)-b*Math.sin(angle))*s,y+(a*Math.sin(angle)+b*Math.cos(angle))*s];
 const poly=(a,c,t=.75)=>shape(H,R,a.map(p=>P(...p)),c,t,.85);
 const ovalAt=(a,b,rx,ry,c,t=.75)=>poly(ell(a,b,rx,ry,28),c,t);
 poly([[-17,-3],[17,-3],[14,-39],[8,-47],[-9,-47],[-15,-37]],ink);
 ovalAt(0,-4,17,5,'sun',.64);
 for(const a of [-1,1]){
  ovalAt(a*13,-38,5,5,'sun',.7);
  poly([[a*13,-37],[a*23,-18],[a*18,-14],[a*9,-32]],ink,.7);
  ovalAt(a*21,-14,4,4,'sun',.5);
  H.line(R,[P(a*13,-41),P(a*13,-35)],'blue',1);
 }
 ovalAt(0,-53,16,18,'sun',.63);
 poly([[-15,-54],[-16,-65],[-9,-72],[8,-71],[16,-64],[14,-54],[10,-62],[-9,-62]],'blue',.85);
 H.line(R,[P(-9,-56),P(-4,-58)],'blue',1.2);
 H.line(R,[P(3,-58),P(9,-57)],'blue',1.2);
 for(const a of [-6,6])ovalAt(a,-53,1.3,1.7,'blue',1);
 ovalAt(1,-48,2.5,2,'coral',.6);
 stroke(H,R,[P(-5,-43),P(0,-41),P(7,-44)],'blue',1);
 H.line(R,[P(-9,-31),P(8,-31)],'paper',1.2);
 poly([[-9,-28],[9,-28],[9,-22],[-9,-22]],'coral',.72);
 for(const a of [-6,0,6])H.dot(...P(a,-24),1.2,'sun');
 poly([[-10,-8],[-7,-10],[-6,-6],[-11,-5]],'sun',.9);
 if(repair){ovalAt(7,-3,3.8,2.4,'paper',1);H.line(R,[P(4,-3),P(10,-3)],'coral',.6);}
 poly([[-11,-38],[-7,-33],[0,-35],[7,-33],[11,-38],[7,-42],[-7,-42]],'paper',.9);
 for(const a of [-1,1]){
  H.line(R,[P(a*7,-30),P(a*9,-16),P(a*12,-9)],'sun',1.2);
  for(const yy of [-30,-18])H.dot(...P(a*10,yy),1.2,'paper');
  poly([[a*12,-47],[a*18,-47],[a*20,-52],[a*16,-55]],'sun',.65);
 }
 for(const a of [-8,-3,3,8])H.line(R,[P(a,-64),P(a+1,-68)],'paper',.7);
 H.line(R,[P(-8,-19),P(7,-19)],'blue',.8);
 ovalAt(0,0,4.4,2.1,'blue',.88);
}
const room=world('hanoi-puppet-balance','The character rests',{wall:false,floor:'blue',tone:.12,head:80},(H,R)=>{
 masonry(H,R,'nw',0,11.8,0,4.35,'paper',.68);
 masonry(H,R,'ne',0,11.8,0,4.35,'teal',.3);
 windowBay(H,R,'ne',1,7.2,3.2,.92,{night:true,ink:'paper',divisions:5});
 for(const i of [.5,11.3]){
  metal(H,R,i-.1,8.3,.2,.2,.03,4.1,'teal');
  metal(H,R,i-.22,8.18,.44,.44,.025,.07,'sun');
  bentTube(H,R,[[i,.4,3.96],[i,4.1,4.85],[i,8.4,4.12]],3.2,'teal');
  bentTube(H,R,[[i,.4,3.96],[i,8.4,4.12]],2.2,'teal');
  for(const j of [2.1,4.1,6.2])bentTube(H,R,[[i,j,4.04],[i,j+(j<4?1:-1),4.57]],1.2,'teal');
 }
 bentTube(H,R,[[.2,.2,3.05],[11.4,.2,3.05],[11.4,.2,.1]],1.5,'blue');
 for(const j of [1.8,4.1,6.4]){
  metal(H,R,.15,j,.13,.16,3.72,.28,'sun');
  H.line(R,[H.p(.21,j,3.74),H.p(.21,j,3.98)],'paper',1.1);
 }
 wallRack(H,R,'nw',8.17,3.05,2.28,1.54,2,'teal',(P,z,row)=>{
  if(row===0){for(let n=0;n<4;n++){const q=P(.34+n*.7,z+.2);oval(H,R,...q,6,5,n%2?'paper':'sun',.8);oval(H,R,...q,2,2,'blue',.7);H.line(R,[P(.34+n*.7,z+.25),P(.34+n*.7,z+.51)],'coral',1.2);}}
  else {for(let n=0;n<3;n++){const u=.31+n*.86;shape(H,R,[P(u,z+.1),P(u+.6,z+.1),P(u+.62,z+.49),P(u+.09,z+.55)],n===1?'coral':'paper',.8);H.line(R,[P(u+.13,z+.2),P(u+.46,z+.37)],'teal',2);}}
 });
 cabinetFrame(H,R,.4,2.25,1.4,4.8,.08,1.1,1,'teal',(i,j,w,d,z)=>{
  panelFront(H,R,i,j+d,w,z,.78,1,'teal');
 });
 timber(H,R,.34,2.18,1.52,4.92,1.19,.13,'sun');
 for(const j of [2.65,3.75]){
  const q=H.p(1.03,j,1.34);oval(H,R,...q,14,6,'paper',1);
  for(let k=0;k<3;k++)H.line(R,[[q[0]-10+k*7,q[1]+2],[q[0]-8+k*7,q[1]-8]],['coral','teal','sun'][k],3);
 }
 const collar=H.p(1.1,5.05,1.34);
 shape(H,R,[[collar[0]-17,collar[1]-5],[collar[0]-9,collar[1]-12],[collar[0],collar[1]-5],[collar[0]+10,collar[1]-12],[collar[0]+18,collar[1]-4],[collar[0]+2,collar[1]+8]],'coral',.65);
 H.line(R,[[collar[0]-12,collar[1]-4],[collar[0]+2,collar[1]+4],[collar[0]+13,collar[1]-4]],'sun',1.4);
 vessel(H,R,1.1,6.3,1.34,8,17,'paper',false);
 bentTube(H,R,[[1.1,6.3,1.8],[1.1,6.3,2.14]],2,'sun');
 const wig=H.p(1.1,6.3,2.24);oval(H,R,...wig,11,13,'blue',.8);
 for(let n=-7;n<9;n+=3)stroke(H,R,[[wig[0]+n,wig[1]-8],[wig[0]+n+2,wig[1]+3],[wig[0]+n-1,wig[1]+13]],'paper',.65,.5);
 floorLight(H,5,5,130,.34);
 cabinetFrame(H,R,5.6,.45,5.55,1.55,.12,3.05,3,'teal',(i,j,w,d,z,h,n)=>{
  timber(H,R,i,j,w,d,z+.4,.1,'sun');
  cushion(H,R,i+.14,j+.3,w-.3,.65,z+.52,.15,'paper');
  const p=H.p(i+w*.5,j+.65,z+.7);
  puppet(H,R,p[0],p[1],.55,(n-1)*.08,['coral','teal','sun'][n]);
  bentTube(H,R,[[i+.15,j+.7,z+1.5],[i+w*.45,j+.76,z+1.37],[i+w-.15,j+.7,z+1.5]],2.8,'paper');
  for(const u of [i+.17,i+w-.2]){H.line(R,[H.p(u,j+d-.12,z+1.23),H.p(u,j+d-.12,z+2.49)],'coral',2.2);metal(H,R,u-.035,j+d-.16,.11,.1,z+1.62,.16,'sun');}
  H.line(R,[H.p(i+.07,j+d,z+.4),H.p(i+w-.06,j+d,z+.4)],'sun',1.3);
  shape(H,R,H.faceI(i+.08,j+d,w-.16,z+.07,z+.33),'teal',.6);
  H.line(R,[H.p(i+w*.4,j+d+.02,z+.23),H.p(i+w*.65,j+d+.02,z+.23)],'sun',2.1);
 });
 timber(H,R,5.5,.4,5.8,1.73,3.15,.16,'sun');
 for(const i of [6,8.1,10.2]){
  metal(H,R,i,.76,1.05,.75,3.32,.4,'paper');
  H.line(R,[H.p(i+.25,1.52,3.44),H.p(i+.8,1.52,3.44)],'teal',2);
 }
 hangingRail(H,R,'nw',.9,6.5,3.65,4,(P,u,n)=>{
  H.line(R,[P(u,-.1),P(u-.3,-.32),P(u+.3,-.32),P(u,-.1)],'sun',1);
  const color=['paper','coral','teal','paper'][n];
  shape(H,R,[P(u-.27,-.23),P(u-.56,-.48),P(u-.37,-.72),P(u-.22,-.6),P(u-.26,-1.35),P(u+.34,-1.35),P(u+.24,-.6),P(u+.47,-.69),P(u+.6,-.44),P(u+.26,-.23)],color,color==='paper'?1:.55);
  for(const d of [-.15,.06,.23])H.line(R,[P(u+d,-.48),P(u+d+.04,-1.27)],'blue',.55,{tone:.45});
  H.line(R,[P(u-.23,-1.27),P(u+.32,-1.27)],'sun',1.1);
 });
 benchFrame(H,R,1.3,7.8,2.7,1.4,.88,'sun');
 cushion(H,R,1.4,7.9,1.25,1.08,.89,.09,'paper');
 for(let k=0;k<5;k++){
  const p=H.p(1.6+k*.22,8.2,.99);
  oval(H,R,...p,3.5,2.4,['coral','sun','paper','teal','blue'][k],.7);
 }
 vessel(H,R,3.35,8.25,.9,7,15,'teal');
 for(let k=0;k<3;k++)H.line(R,[H.p(3.33+k*.08,8.25,1.1),H.p(3.23+k*.08,8.25,1.63)],'sun',1.3);
 const joint=H.p(2.8,8.7,.91);
 oval(H,R,...joint,10,6,'sun',.6);oval(H,R,...joint,4,2.8,'blue',.8);
 H.line(R,[[joint[0]-13,joint[1]+6],[joint[0]+13,joint[1]-6]],'coral',2);
 bentTube(H,R,[[1.2,9.65,.06],[3.8,9.65,.06]],3.4,'sun');
 for(let k=0;k<4;k++)bentTube(H,R,[[1.35,9.45+k*.11,.08],[3.75,9.45+k*.11,.08]],1.5,'sun');
 H.line(R,[H.p(2.1,9.44,.12),H.p(2.1,9.86,.12)],'coral',3);
 timber(H,R,3.42,5.12,.51,.79,.025,.13,'sun');
 for(const i of [4.17,6.55])for(const j of [4.35,6.15])caster(H,R,i,j,.14);
 for(const i of [4.03,6.61])for(const j of [4.16,6.11]){
  timber(H,R,i,j,.18,.2,.12,.48,'sun');
  metal(H,R,i-.025,j-.03,.23,.25,.46,.14,'teal');
 }
 for(const j of [4.18,6.12]){
  timber(H,R,4.02,j,2.8,.18,.26,.17,'sun');
  bentTube(H,R,[[4.2,j,.2],[6.58,j,.61]],1.6,'teal');
  bentTube(H,R,[[6.58,j,.2],[4.2,j,.61]],1.6,'teal');
 }
 timber(H,R,3.9,4.05,3.08,2.45,.56,.11,'sun');
 for(const i of [4.1,6.58]){
  metal(H,R,i,4.29,.16,1.62,.67,.12,'teal');
  for(const j of [4.55,5.54])H.dot(...H.p(i+.08,j,.81),1.8,'sun');
 }
 for(const j of [4.25,5.91]){
  shape(H,R,[H.p(5.76,j,.69),H.p(6.3,j,.69),H.p(6.3,j,1.07)],'sun',.68);
  H.line(R,[H.p(5.92,j,.81),H.p(6.32,j,.81)],'paper',1.4);
 }
 metal(H,R,6.57,5.07,.39,.39,.79,.12,'teal');
 bentTube(H,R,[[6.74,5.25,.82],[6.74,5.25,1.18]],1.8,'sun');
 H.line(R,[H.p(6.56,5.25,1.18),H.p(6.95,5.25,1.18)],'blue',2.6);
 for(const j of [4.12,6.08]){
  shape(H,R,[H.p(4.15,j,.67),H.p(4.38,j,1.17),H.p(4.62,j,.89),H.p(5.9,j,.89),H.p(6.4,j,1.17),H.p(6.66,j,.67)],'sun',.6);
  H.line(R,[H.p(4.4,j,1.16),H.p(4.65,j,.96),H.p(5.9,j,.96),H.p(6.36,j,1.16)],'paper',5);
 }
 for(const i of [4.26,6.45])metal(H,R,i,4.7,.16,.9,.76,.42,'teal');
 const saddle=H.p(4.5,5.2,.84);
 oval(H,R,saddle[0],saddle[1]+3,26,11,'sun',.58);
 oval(H,R,...saddle,26,10,'paper',.96);
 oval(H,R,saddle[0],saddle[1]-1,18,6,'blue',.48);
 for(let n=0;n<12;n++){
  const a=n*Math.PI/6;
  H.line(R,[[saddle[0]+Math.cos(a)*21,saddle[1]+Math.sin(a)*8],[saddle[0]+Math.cos(a)*24,saddle[1]+Math.sin(a)*9]],'coral',.75);
 }
 for(const j of [4.44,5.71]){
  cushion(H,R,4.4,j,1.35,.25,.72,.14,'paper');
  H.line(R,[H.p(4.58,j+.26,.82),H.p(5.5,j+.26,.82)],'coral',.7);
 }
 metal(H,R,5.82,4.76,.55,.55,.69,.06,'teal');
 oval(H,R,...H.p(6.1,5.05,.77),7,4,'sun',.72);
 oval(H,R,...H.p(6.1,5.05,.775),3,2,'blue',.8);
 bentTube(H,R,[[5.81,5.57,.72],[6.35,5.83,.72]],1.6,'sun');
 metal(H,R,5.89,5.6,.19,.12,.73,.065,'coral');
 bentTube(H,R,[[4.05,6.52,.2],[4.05,6.52,.82],[6.85,6.52,.82],[6.85,6.52,.2]],2.5,'teal');
 H.line(R,[H.p(4.13,6.52,.76),H.p(6.74,6.52,.76)],'sun',1);
 taskLight(H,R,3.76,4.46,.77,'coral',.7);
 metal(H,R,9.05,5.5,2.35,2.15,.04,.08,'teal');
 drape(H,R,9.2,5.65,1.9,1.3,.21,.13,'paper');
 for(const i of [9.45,10.1,10.75]){oval(H,R,...H.p(i,6,.33),6,11,'blue',.7);H.line(R,[H.p(i-.12,6,.63),H.p(i+.12,6,.63)],'sun',.8);}
 for(let n=0;n<3;n++){
  const j=8.05+n*.47;
  timber(H,R,9,j,2.2,.09,.08,1.7,'teal');
  shape(H,R,H.faceI(9.12,j+.06,1.98,.24,1.6),'paper',.8);
 }
 vessel(H,R,10.65,4.9,.06,8,24,'coral',false);
 const fish=H.p(10.76,1.95,.29);
 shape(H,R,[[fish[0]-14,fish[1]],[fish[0]-4,fish[1]-6],[fish[0]+9,fish[1]],[fish[0]+15,fish[1]-5],[fish[0]+15,fish[1]+5],[fish[0]+9,fish[1]+1],[fish[0]-4,fish[1]+6]],'teal',.55);
 H.dot(fish[0]-8,fish[1]-1,1,'blue');
 timber(H,R,5.25,9.16,3.15,1.98,.07,.2,'sun');
 for(const i of [5.25,8.24])timber(H,R,i,9.16,.16,1.98,.27,.69,'teal');
 timber(H,R,5.25,9.16,3.15,.15,.27,.69,'teal');
 cushion(H,R,5.46,9.4,2.7,1.43,.28,.17,'paper');
 for(const j of [9.66,10.51]){
  const q=H.p(6.88,j,.5);oval(H,R,...q,23,8,'blue',.4);oval(H,R,...q,15,5,'sun',.55);
 }
 shape(H,R,H.faceI(5.25,9.15,3.15,.97,2.12),'teal',.55);
 shape(H,R,H.faceI(5.48,9.17,2.68,1.15,1.93),'paper',.86);
 for(const i of [5.56,7.99]){
  H.line(R,[H.p(i,9.2,1.17),H.p(i,9.2,1.9)],'coral',2.4);
  metal(H,R,i-.1,9.08,.25,.25,.91,.09,'sun');
 }
 timber(H,R,5.25,11.01,3.15,.15,.27,.48,'teal');
 for(const i of [5.63,7.81])metal(H,R,i,11.19,.18,.04,.5,.18,'sun');
 const hand=H.p(7.35,10.04,.5);
 shape(H,R,[[hand[0]-10,hand[1]+5],[hand[0]-6,hand[1]-7],[hand[0]-7,hand[1]-15],[hand[0]-3,hand[1]-16],[hand[0],hand[1]-8],[hand[0]+4,hand[1]-16],[hand[0]+7,hand[1]-14],[hand[0]+5,hand[1]-2],[hand[0]+10,hand[1]-7],[hand[0]+12,hand[1]-3],[hand[0]+7,hand[1]+7]],'sun',.68);
 H.line(R,[[hand[0]-7,hand[1]+5],[hand[0]+7,hand[1]+7]],'coral',2);
 metal(H,R,.3,11.4,10.6,.13,.015,.035,'blue');
},(H,R,t)=>{
 const u=cycle(t,18)*18,tilt=ease((u-3.6)/3.6)*(1-ease((u-10.8)/5.2));
 const root=H.p(3.73,5.46,0),body=H.p(4.5,5.2,.88),a0=-tilt*.14;
 const target=[body[0]+(-14*Math.cos(a0)+25*Math.sin(a0))*1.04,body[1]+(-14*Math.sin(a0)-25*Math.cos(a0))*1.04];
 const dx=(target[0]-root[0])/1.5-5.2,dy=(target[1]-root[1])/1.5+32.5,d=Math.min(8.56,Math.max(.1,Math.hypot(dx,dy))),a=Math.atan2(dx,dy)-Math.acos(Math.max(-1,Math.min(1,(4.368**2+d*d-4.2**2)/(2*4.368*d))));
 tech.ar=a*180/Math.PI;tech.er=(Math.atan2(dx-Math.sin(a)*4.368,dy-Math.cos(a)*4.368)-a)*180/Math.PI;tech.head=12+tilt*7;
 actor(H,R,3.73,5.46,t,'hanoiPuppetTech',{shirt:['paper',1],apron:['coral',.62],hairStyle:'short'},0,1.5);
 const [x,y]=H.p(4.5,5.2,.88);
 puppet(H,R,x,y,1.04,-tilt*.14,'teal',true);
 actor(H,R,6.95,6.82,t,'hanoiPuppetBrace',{shirt:['coral',.6],pants:['teal',.7],face:'sw',hairStyle:'pony'},0,1.5);
 const anchor=H.p(6.78,6.53,.8);
 oval(H,R,...anchor,2.6,2.1,'coral',.4);
 const p=H.p(.55,7.1,2.62),s=Math.sin(t*Math.PI/9)*2;
 shape(H,R,[[p[0],p[1]],[p[0]+12,p[1]+5],[p[0]+14+s,p[1]+21],[p[0]+3+s,p[1]+20]],'paper',1);
 H.line(R,[[p[0]+5+s,p[1]+7],[p[0]+7+s,p[1]+18]],'sun',.8);
});
room.loopSeconds=18;
room.stillTime=1.8;
export default room;
