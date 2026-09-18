import { world, shape, oval, stroke, actor, cycle, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, bentTube, drape, cushion, vessel, floorLight } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, hangingRail, taskLight, caster } from '../joinery.js';

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
 floorLight(H,5,5,130,.34);
 cabinetFrame(H,R,5.6,.45,5.55,1.55,.12,3.05,3,'teal',(i,j,w,d,z,h,n)=>{
  timber(H,R,i,j,w,d,z+.4,.1,'sun');
  cushion(H,R,i+.14,j+.3,w-.3,.65,z+.52,.15,'paper');
  const p=H.p(i+w*.5,j+.65,z+.7);
  puppet(H,R,p[0],p[1],.55,(n-1)*.08,['coral','teal','sun'][n]);
  bentTube(H,R,[[i+.15,j+.7,z+1.5],[i+w*.45,j+.76,z+1.37],[i+w-.15,j+.7,z+1.5]],2.8,'paper');
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
 benchFrame(H,R,3.9,4.05,3.08,2.45,.65,'sun');
 for(const j of [4.12,6.08]){
  shape(H,R,[H.p(4.15,j,.67),H.p(4.38,j,1.17),H.p(4.62,j,.89),H.p(5.9,j,.89),H.p(6.4,j,1.17),H.p(6.66,j,.67)],'sun',.6);
  H.line(R,[H.p(4.4,j,1.16),H.p(4.65,j,.96),H.p(5.9,j,.96),H.p(6.36,j,1.16)],'paper',5);
 }
 for(const i of [4.26,6.45])metal(H,R,i,4.7,.16,.9,.76,.42,'teal');
 cushion(H,R,4.15,4.35,1.72,1.7,.7,.16,'paper');
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
