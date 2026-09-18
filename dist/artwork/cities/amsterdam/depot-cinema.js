import { world, box, shape, oval, stroke, actor, wallPt, cycle, mix } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, drape, benchFrame, vessel } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { wallRack, recessedFrame, panelFront, taskLight, floorShadow } from '../joinery.js';

const base={...FIGURES.clips.idle.keys[0][1]},volunteerPose={...base};
FIGURES.clips['amsterdam-depot-volunteer']={dur:24,keys:[[0,volunteerPose],[1,volunteerPose]]};
FIGURES.clips['amsterdam-depot-visitor']={dur:24,keys:[[0,{...base,head:-12,al:23,el:60,ar:18,er:60}],[.4,{...base,head:14,lean:6,al:23,el:60,ar:18,er:60}],[.6,{...base,head:14,lean:6,al:23,el:60,ar:18,er:60}],[1,{...base,head:-12,al:23,el:60,ar:18,er:60}]]};
const smooth=(a,b,t)=>{let f=Math.max(0,Math.min(1,(t-a)/(b-a)));return f*f*(3-2*f)};
function arch(H,R){
 const P=(u,z,d=.12)=>H.p(u,d,z),outer=[P(1,.04),P(7.8,.04),P(7.8,2.9)];
 for(let n=0;n<=36;n++){const a=n*Math.PI/36;outer.push(P(4.4+3.4*Math.cos(a),2.9+1.65*Math.sin(a)))}
 shape(H,R,outer,'coral',.58,1.25);
 const inner=[P(1.65,.06,.15),P(7.15,.06,.15),P(7.15,2.85,.15)];
 for(let n=0;n<=36;n++){const a=n*Math.PI/36;inner.push(P(4.4+2.75*Math.cos(a),2.85+1.18*Math.sin(a),.15))}
 shape(H,R,inner,'blue',.68);
 const reveal=inner.map(([x,y])=>[x+12,y+7]); shape(H,R,reveal,'paper',.92);
 H.clip(outer,()=>{
  for(let z=.35;z<3.1;z+=.31){H.line(R,[P(1,z,.18),P(7.8,z,.18)],'paper',.9,{tone:.75});for(let x=1+(Math.round(z/.31)%2)*.5;x<7.8;x+=1)H.line(R,[P(x,z,.19),P(x,z+.3,.19)],'blue',.6,{tone:.4})}
 });
 shape(H,R,inner,'blue',.68);
 shape(H,R,reveal,'paper',.88);
 for(let n=0;n<=18;n++){const a=n*Math.PI/18;H.line(R,[P(4.4+2.8*Math.cos(a),2.88+1.24*Math.sin(a),.2),P(4.4+3.34*Math.cos(a),2.88+1.61*Math.sin(a),.2)],'paper',1.25)}
 for(const x of [1.13,7.45]) metal(H,R,x,.1,.28,.55,2.75,.18,'blue');
 metal(H,R,1.55,.14,5.7,.24,2.7,.14,'blue');
 for(let x=1.8;x<7;x+=.52)H.dot(...P(x,2.77,.4),1.3,'sun');
 shape(H,R,[P(1.06,1.28,.2),P(1.58,1.28,.2),P(1.58,1.58,.2),P(1.06,1.58,.2)],'paper',.9);
}
function film(H,R,i,j,z,w=1.04,h=.69){
 shape(H,R,H.faceI(i,j,w,z,z+h),'blue',.65);
 shape(H,R,H.faceI(i+.08,j+.01,w-.16,z+.075,z+h-.075),'paper',1);
 shape(H,R,[H.p(i+.12,j+.025,z+.12),H.p(i+.45,j+.025,z+.52),H.p(i+.68,j+.025,z+.25),H.p(i+.93,j+.025,z+.42),H.p(i+.93,j+.025,z+.12)],'teal',.55);
 H.dot(...H.p(i+.7,j+.03,z+.48),3.5,'coral',.8);
}
function projector(H,R,i,j,z){
 metal(H,R,i,j,.85,.65,z,.45,'teal');
 for(const x of [i+.1,i+.68]) {const [px,py]=H.p(x,j+.2,z+.77);oval(H,R,px,py,11,10,'paper',1);for(let n=0;n<5;n++){let a=n*Math.PI*2/5;oval(H,R,px+Math.cos(a)*6,py+Math.sin(a)*5.5,2.1,2,'blue',.65)}}
 const a=H.p(i+.82,j+.44,z+.25);oval(H,R,...a,7,5,'blue',.8);oval(H,R,a[0]+3,a[1]+1,4,3,'paper',1);
 for(const x of [i+.1,i+.7])H.line(R,[H.p(x,j+.15,z),H.p(x-.07,j+.16,z-.18)],'blue',1.6);
}
const room=world('amsterdam-depot-cinema','The arch keeps the light',{floor:'paper',tone:.3,wall:'paper',wallTone:.55,height:3.55,head:65},(H,R)=>{
 for(let x=0;x<12;x+=2)for(let j=0;j<12;j+=1.5)H.outline(R,H.tile(x,j,2,1.5,.01),'blue',.65,{tone:.2});
 masonry(H,R,'nw',.1,11.75,0,3.55,'paper',.58);
 arch(H,R);
 for(const x of [.4,8.1,11.4]){
  metal(H,R,x,.12,.14,.24,0,3.6,'teal');
  H.line(R,[H.p(x,.2,3.5),H.p(x+1.5,.2,3.8),H.p(Math.min(11.8,x+3),.2,3.5)],'blue',2.8);
 }
 bentTube(H,R,[[8,.1,3.2],[8,1,3.2],[10.8,1,3.2],[10.8,1,1.1]],1.9,'teal');
 for(const z of [1.6,2.4,3.1])metal(H,R,10.73,.9,.18,.17,z,.08,'paper');
 floorShadow(H,2,1.1,5,1.7,.22);
 cabinetFrame(H,R,2,1.12,5,1.15,.17,2.38,2,'sun',(i,j,w,d,z,h,n)=>{
  timber(H,R,i,j,w,d,z+.7,.08,'sun');
  if(n===0){projector(H,R,i+.42,j+.22,z+.84);film(H,R,i+.26,j+.91,z+.05,1.5,.55)}
  else {film(H,R,i+.12,j+.9,z+1.02,1.78,.77);box(H,R,i+.26,j+.35,.9,.52,z,.52,'paper',1);shape(H,R,H.faceI(i+.32,j+.88,.77,z+.11,z+.43),'blue',.6);for(let n=0;n<3;n++)box(H,R,i+.34+n*.23,j+.86,.17,.17,z+.05,.13,'coral',.6)}
 });
 metal(H,R,2,1.07,5,1.26,.02,.15,'blue');
 const fixed=[H.p(4.51,2.33,.4),H.p(6.88,2.33,.4),H.p(6.88,2.33,2.48),H.p(4.51,2.33,2.48)];
 H.tint(fixed,'teal',.075);H.outline(R,fixed,'blue',2.1);
 H.line(R,[H.p(5.2,2.35,.48),H.p(5.74,2.35,2.35)],'paper',2);

 for(const z of [.75,2.04])metal(H,R,2.03,2.28,.12,.08,z,.22,'blue');
 H.dot(...H.p(1.66,.27,2.06),3.6,'blue',.75);
 H.dot(...H.p(1.66,.27,2.06),1.5,'paper',1);
 taskLight(H,R,6.55,1.42,2.56,'coral',-.65);
 shape(H,R,H.faceI(5.99,1.86,.5,1.19,1.61),'coral',.27);
 H.tint(H.tile(5.81,1.56,.8,.55,1.12),'sun',.6);
 H.line(R,[H.p(5.99,1.86,1.19),H.p(6.49,1.86,1.19)],'blue',1.2);

 cabinetFrame(H,R,8.2,.55,3,1.45,.08,3.35,2,'teal',(i,j,w,d,z,h,n)=>{
  for(const zz of [z+.84,z+1.8])timber(H,R,i,j,w,d,zz,.1,'teal');
  if(n===0){for(let k=0;k<3;k++)metal(H,R,i+.1+k*.32,j+.15,.14,.87,z,.7,'blue');box(H,R,i+.06,j+.18,w-.13,.87,z+1.93,.77,'blue',.65);oval(H,R,...H.p(i+w*.5,j+1.09,z+2.3),15,15,'paper',.65);oval(H,R,...H.p(i+w*.5,j+1.11,z+2.3),7,7,'blue',.8)}
  else{for(let k=0;k<4;k++)timber(H,R,i+.13+k*.22,j+.1,.1,.83,z,.69,'sun');for(let k=0;k<3;k++)box(H,R,i+.05,j+.07,w-.1,.9,z+.98+k*.19,.16,k===1?'coral':'paper',.8);box(H,R,i+.05,j+.1,w-.1,.85,z+1.96,.32,'teal',.5)}
 });
 wallRack(H,R,'nw',1.15,4.2,1.05,1.8,2,'teal',(P,z,n)=>{
  if(n===0)for(let k=0;k<3;k++){let u=.45+k*1.2;stroke(H,R,[P(u,z+.08),P(u-.2,z+.34),P(u,z+.57),P(u+.3,z+.34),P(u,z+.08)],'blue',2)}
  else for(let k=0;k<3;k++)shape(H,R,[P(.28+k*1.27,z+.04),P(1.22+k*1.27,z+.04),P(1.22+k*1.27,z+.49),P(.28+k*1.27,z+.49)],['paper','sun','coral'][k],.6);
 });
 benchFrame(H,R,.45,7.65,2.2,2.5,.65,'sun');
 drape(H,R,.51,7.73,1.02,2.22,.68,.13,'teal');
 drape(H,R,1.53,7.73,1.02,2.22,.68,.13,'coral');
 H.line(R,[H.p(1.55,7.82,.7),H.p(1.55,9.8,.7)],'paper',1.1);
 box(H,R,.45,5.55,1.3,1.5,0,.76,'teal',.35);
 drape(H,R,.47,5.57,1.26,1.46,.79,.18,'paper');
 H.line(R,[H.p(.45,7.18,.36),H.p(1.77,7.18,.36)],'blue',2.6);
 const rail=H.p(.24,9.9,2.42);H.line(R,[rail,H.p(.24,11.5,2.42)],'blue',2.5);
 for(const j of [10.25,11.03])H.line(R,[H.p(.24,j,2.42),H.p(.48,j,2.26)],'sun',2);
 benchFrame(H,R,7.7,8.55,3.2,1.7,.8,'sun');
 for(let n=0;n<3;n++)film(H,R,7.92+n*.93,10.12,.84,.77,.55);
 oval(H,R,...H.p(8.55,9.19,.85),9,5,'blue',.7);
 oval(H,R,...H.p(8.55,9.19,.86),5,2.8,'paper',.9);
 shape(H,R,H.tile(9.4,8.92,.66,.52,.83),'coral',.3);
 shape(H,R,H.tile(10.12,9.17,.57,.57,.83),'sun',.5);
 metal(H,R,10.82,6.35,.35,1.1,.02,.12,'blue');
 metal(H,R,10.77,6.64,.46,.35,.14,.24,'blue');
},(H,R,t)=>{
 const u=cycle(t,24)*24,open=smooth(4.8,9.6,u)*(1-smooth(15,22,u)),angle=open*1.18, w=2.32;
 const P=(x,z)=>H.p(2.1+x*Math.cos(angle),2.32+x*Math.sin(angle),z);
 const leaf=[P(0,.4),P(w,.4),P(w,2.48),P(0,2.48)];
 H.tint(leaf,'teal',.08);
 H.outline(R,leaf,'blue',2.7);
 H.line(R,[P(.08,.46),P(w-.08,.46),P(w-.08,2.4),P(.08,2.4)],'sun',1.5);
 H.clip(leaf,()=>{
  H.line(R,[P(.8+open*.5,.5),P(2.1+open*.6,2.4)],'paper',2.6,{tone:.8});
  stroke(H,R,[P(.3,1.72),P(1.4,2.23),P(2.6,2.34),P(4.05,1.84)],'coral',1.6,.3);
 });
 const handle=P(w-.15,1.23);H.line(R,[P(w-.15,1.08),P(w-.15,1.41)],'blue',3.3);
 const shift=.18*smooth(9.6,11.4,u)*(1-smooth(14.4,16,u));
 metal(H,R,3.58+shift,2.08,.18,.2,1.57,.13,'coral');
 H.line(R,[H.p(3.38,2.11,1.59),H.p(4.05,2.11,1.59)],'blue',1.1);
 for(const x of [3.52,3.7])H.line(R,[H.p(x,2.15,1.59),H.p(x,2.15,1.74)],'paper',1.1);
 const adjust=smooth(9.6,10.8,u)*(1-smooth(14.4,16,u));
 const ai=mix(2.1+w*Math.cos(angle)+.22,3.64,adjust),aj=mix(2.32+w*Math.sin(angle)+.31,2.68,adjust);
 const target=[mix(handle[0],H.p(3.68+shift,2.24,1.64)[0],adjust),mix(handle[1],H.p(3.68+shift,2.24,1.64)[1],adjust)];
 const origin=H.p(ai,aj),scale=1.85;
 Object.assign(volunteerPose,base,{head:12});
 for(const [n,side]of ['l','r'].entries()){
  const dx=(target[0]-origin[0])/-scale-(n?1:-1)*5.2,dy=(target[1]-origin[1])/scale+32.5;
  const d=Math.min(8.54,Math.max(.2,Math.hypot(dx,dy))),a=4.368,b=4.2;
  volunteerPose['a'+side]=(Math.atan2(dx,dy)-Math.acos(Math.max(-1,Math.min(1,(a*a+d*d-b*b)/(2*a*d)))))*180/Math.PI;
  volunteerPose['e'+side]=180-Math.acos(Math.max(-1,Math.min(1,(a*a+b*b-d*d)/(2*a*b))))*180/Math.PI;
 }
 actor(H,R,ai,aj,u,'amsterdam-depot-volunteer',{face:'sw',shirt:['coral',.64],hairStyle:'bun',pants:['blue',.7]},0,scale);
 actor(H,R,8.8,6.7,u,'amsterdam-depot-visitor',{face:'sw',shirt:['teal',.7],skin:['coral',.46],hairStyle:'curly',glasses:true},0,1.55);
 const sway=Math.sin(u*Math.PI/12)*2;
 const [x,y]=H.p(.45,10.25,2.18);
 shape(H,R,[[x-8,y],[x+7,y],[x+12+sway,y+20],[x+6,y+37],[x-10,y+31],[x-13,y+12]],'coral',.6);
 H.line(R,[[x-5,y+5],[x-7,y+30]],'paper',1);
 stroke(H,R,[H.p(3.17,1.88,1.5),H.p(3.27,2,1.35),H.p(3.13+.025*Math.sin(u*Math.PI/12),2.06,1.24)],'blue',.7);
});
room.loopSeconds=24;
room.stillTime=12;
export default room;
