import { world, shape, oval, stroke, actor, cycle, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, benchFrame, bentTube, caneChair, drape, cushion, vessel, floorLight } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { recessedFrame, wallRack, taskLight, panelFront } from '../joinery.js';

const base=FIGURES.clips.idle.keys[0][1],listener={...base,al:45,el:40,ar:87,er:16,head:12};
FIGURES.clips.hanoiRadioTune={dur:22,keys:[[0,listener],[1,listener]]};
FIGURES.clips.hanoiRadioPartner={dur:22,keys:[[0,{...base,drop:.47,ll:84,lr:80,kl:-84,kr:-80,al:22,ar:27,el:30,er:36,head:-5}],[.43,{...base,drop:.47,ll:84,lr:80,kl:-84,kr:-80,al:22,ar:27,el:30,er:36,head:-5}],[.62,{...base,drop:.47,ll:84,lr:80,kl:-84,kr:-80,al:22,ar:27,el:30,er:36,head:17}],[1,{...base,drop:.47,ll:84,lr:80,kl:-84,kr:-80,al:22,ar:27,el:30,er:36,head:-5}]]};
const ease=x=>{const a=Math.max(0,Math.min(1,x));return a*a*(3-2*a)};
function cassette(H,R,i,j,z,ink='teal'){
 metal(H,R,i,j,.65,.18,z,.36,ink);
 shape(H,R,H.faceI(i+.06,j+.19,.52,z+.07,z+.26),'paper',1,.5);
 for(const x of [i+.2,i+.46])oval(H,R,...H.p(x,j+.2,z+.17),2.3,2.3,'blue',.8);
 H.line(R,[H.p(i+.2,j+.2,z+.16),H.p(i+.46,j+.2,z+.16)],'coral',.7);
}
const room=world('hanoi-window-radio','A signal after dinner',{wall:false,floor:'blue',tone:.22,head:55},(H,R)=>{
 masonry(H,R,'nw',0,11.65,0,3.6,'teal',.25);
 masonry(H,R,'ne',0,11.65,0,3.6,'teal',.32);
 for(const i of [.05,10.85])for(let j=.1;j<11.1;j+=.82){
  shape(H,R,H.tile(i,j,.92,.78,.03),'paper',.9);
  shape(H,R,[H.p(i+.18,j+.4,.035),H.p(i+.46,j+.16,.035),H.p(i+.74,j+.4,.035),H.p(i+.46,j+.64,.035)],'coral',.35,.4);
 }
 for(let i=1;i<11;i+=2)for(let j=.5;j<11;j+=2)H.outline(R,H.tile(i,j,1.95,1.95,.025),'blue',.6,{tone:.3});
 floorLight(H,6.5,4.4,135,.55);
 recessedFrame(H,R,'ne',3.45,6.4,1.45,1.78,'sun',P=>{
  shape(H,R,[P(.1,.1),P(6.3,.1),P(6.3,1.7),P(.1,1.7)],'blue',.83);
  for(let n=0;n<6;n++){
   const z=.16+n*.25;
   shape(H,R,[P(.13,z),P(6.25,z),P(6.25,z+.13),P(.13,z+.13)],'teal',.38);
   H.line(R,[P(.13,z+.14),P(6.25,z+.14)],'paper',1.4,{tone:.65});
  }
  for(const u of [.16,3.17,6.18])H.line(R,[P(u,.1),P(u,1.72)],'sun',3);
  H.line(R,[P(5.84,.52),P(5.84,1.37)],'blue',2.1);
 });
 bentTube(H,R,[[9.85,.45,1.74],[9.31,.89,1.74],[9.63,.98,1.74]],1.6,'teal');
 timber(H,R,3.3,.14,6.77,.68,1.35,.15,'sun');
 timber(H,R,9.52,.35,.68,.17,1.52,.08,'paper');
 H.line(R,[H.p(9.65,.4,1.6),H.p(9.65,.4,1.9)],'blue',1.3);
 cabinetFrame(H,R,.42,.62,2.12,1.55,.08,3.2,2,'teal',(i,j,w,d,z,h,n)=>{
  for(let row=0;row<5;row++){
   const zz=z+.12+row*.58;
   timber(H,R,i,j,w,d,zz,.09,'sun');
   if(row<3){cassette(H,R,i+.06,j+.69,zz+.1,['coral','teal','paper'][(row+n)%3]);if(row!==1)cassette(H,R,i+.14,j+.99,zz+.1,'sun');}
   else if(row===3){for(let k=0;k<3;k++)H.line(R,ell(...H.p(i+.4,j+.6,zz+.25),8-k*1.5,5-k*.8),'blue',.8,{closed:true});}
   else {shape(H,R,H.faceI(i+.12,j+.7,.57,zz+.1,zz+.5),'paper',1);oval(H,R,...H.p(i+.38,j+.71,zz+.37),3.4,4,'coral',.4);}
  }
 });
 timber(H,R,.36,.58,2.24,1.67,3.3,.16,'sun');
 wallRack(H,R,'nw',4.2,3.3,1.65,1.45,2,'sun',(P,z,row)=>{
  if(row===0)for(let n=0;n<4;n++){
   const u=.25+n*.72;
   shape(H,R,[P(u,z+.1),P(u+.5,z+.1),P(u+.5,z+.47),P(u,z+.47)],n%2?'coral':'paper',.7,.5);
   for(const d of [.16,.36])oval(H,R,...P(u+d,z+.28),1.7,2,'blue',.7);
  }
  else for(let n=0;n<2;n++){
   const u=.36+n*1.28;
   shape(H,R,[P(u-.09,z+.03),P(u+1,z+.03),P(u+1,z+.57),P(u-.09,z+.57)],'sun',.17,.4);
   shape(H,R,[P(u,z+.04),P(u+.7,z+.04),P(u+.7,z+.54),P(u,z+.54)],'paper',1);
   oval(H,R,...P(u+.32,z+.34),4,5,'teal',.45);
   H.line(R,[P(u+.16,z+.12),P(u+.3,z+.24),P(u+.5,z+.1)],'coral',2.3);
  }
 });
 for(const i of [4.5,6.05,7.6])timber(H,R,i,3.13,1.13,1.24,.32,.11,'sun');
 timber(H,R,4.57,3.24,1,.94,.44,.14,'paper');
 H.line(R,[H.p(4.58,4.18,.52),H.p(5.57,4.18,.52)],'coral',1.3);
 for(let n=0;n<3;n++)H.line(R,ell(...H.p(6.53,3.8,.48),15-n*3,7-n*1.4),'blue',1,{closed:true});
 H.line(R,[H.p(6.25,3.84,.51),H.p(6.73,3.84,.51)],'sun',2.4);
 metal(H,R,7.71,3.24,.86,.95,.44,.23,'teal');
 for(let n=0;n<3;n++)H.line(R,[H.p(7.83+n*.22,4.2,.47),H.p(7.83+n*.22,4.2,.62)],'paper',.8);
 benchFrame(H,R,3.8,2.73,5.1,2.25,1.08,'sun');
 drape(H,R,4.13,3.09,4.1,1.23,1.09,.12,'teal');
 for(const i of [4.62,7.35])metal(H,R,i,3.68,.28,.32,1.11,.12,'blue');
 timber(H,R,4.42,3.23,3.49,1.13,1.22,1.18,'sun');
 const face=H.faceI(4.54,4.38,3.2,1.32,2.31);
 shape(H,R,face,'blue',.65);
 const speaker=H.p(5.3,4.42,1.82);
 oval(H,R,...speaker,25,24,'sun',.45);
 H.clip(ell(...speaker,23,22),()=>{
  for(let n=-24;n<25;n+=3){H.line(R,[[speaker[0]-28,speaker[1]+n],[speaker[0]+28,speaker[1]+n]],'blue',.5,{tone:.55});H.line(R,[[speaker[0]+n,speaker[1]-28],[speaker[0]+n,speaker[1]+28]],'paper',.7);}
 });
 shape(H,R,[[speaker[0]+6,speaker[1]+3],[speaker[0]+16,speaker[1]+3],[speaker[0]+16,speaker[1]+10],[speaker[0]+6,speaker[1]+10]],'paper',.8,.4);
 for(let n=0;n<4;n++)H.line(R,[[speaker[0]+7+n*2,speaker[1]+3],[speaker[0]+7+n*2,speaker[1]+10]],'teal',.5);
 shape(H,R,H.faceI(6.35,4.41,1.17,1.87,2.22),'paper',.82);
 for(let n=0;n<12;n++)H.line(R,[H.p(6.42+n*.084,4.44,1.96),H.p(6.42+n*.084,4.44,2.03+(n%3===0?.07:0))],'blue',.7);
 H.line(R,[H.p(6.43,4.46,2.16),H.p(7.36,4.46,2.16)],'sun',1.8);
 for(const i of [6.55,7.23])oval(H,R,...H.p(i,4.43,1.58),7,7,'sun',.55);
 const stop=H.p(7.47,4.44,1.57);shape(H,R,[[stop[0]-2,stop[1]-4],[stop[0]+3,stop[1]-4],[stop[0]+3,stop[1]+4],[stop[0]-2,stop[1]+4]],'teal',.8);
 bentTube(H,R,[[4.7,3.61,2.44],[4.7,3.61,2.63],[7.62,3.61,2.63],[7.62,3.61,2.44]],2.8,'blue');
 metal(H,R,7.95,3.25,.7,1.13,1.14,.07,'teal');
 for(let n=0;n<3;n++)vessel(H,R,8.12+n*.14,3.72,1.23,2.1,8,'blue',false);
 H.line(R,[H.p(4.54,3.44,2.46),H.p(4.05,3.4,3.08)],'blue',2);
 H.dot(...H.p(4.54,3.44,2.46),2,'sun');
 taskLight(H,R,8.55,3.02,1.1,'coral',.6);
 bentTube(H,R,[[3.9,3.4,1.0],[3.52,3.4,.89],[3.52,3.4,.67]],2,'sun');
 const hp=H.p(3.53,3.4,.73);
 stroke(H,R,[[hp[0]-9,hp[1]+9],[hp[0]-12,hp[1]-6],[hp[0],hp[1]-13],[hp[0]+10,hp[1]-6],[hp[0]+9,hp[1]+9]],'blue',3);
 for(const a of [-9,9]){oval(H,R,hp[0]+a,hp[1]+8,4.4,7,'teal',.7);for(let k=0;k<3;k++)H.line(R,[[hp[0]+a-2,hp[1]+5+k*2],[hp[0]+a+2,hp[1]+6+k*2]],'paper',.6);}
 caneChair(H,R,2.7,7.85,'sun');
 drape(H,R,2.62,8.02,.32,.75,.64,.37,'coral');
 benchFrame(H,R,2.68,9.64,1.2,.87,.34,'teal');
 cushion(H,R,2.68,9.64,1.2,.87,.35,.15,'sun');
 benchFrame(H,R,7.7,8.75,2.15,1.1,.64,'sun');
 shape(H,R,H.tile(7.9,8.9,1.05,.72,.65),'paper',1);
 for(let n=0;n<4;n++)H.line(R,[H.p(8,8.99+n*.13,.66),H.p(8.74,8.99+n*.13,.66)],'teal',.6);
 oval(H,R,...H.p(9.23,9.22,.67),6,3,'paper',1);
 H.line(R,[H.p(9.05,9.22,.67),H.p(9.63,9.49,.67)],'blue',.7);
 const model=H.p(8.22,3.4,1.27);
 H.line(R,[[model[0],model[1]],[model[0],model[1]-16]],'sun',1.1);
 H.line(R,[[model[0]-7,model[1]-14],[model[0]+7,model[1]-14]],'blue',1.1);
 for(const y of [-14,-10])H.line(R,[[model[0]-6,model[1]+y],[model[0]-6,model[1]+y-3]],'teal',.8);
 metal(H,R,9.25,5.8,1.58,1.55,.07,.13,'teal');
 for(let n=0;n<4;n++){const i=9.4+(n%2)*.6,j=6+Math.floor(n/2)*.5;oval(H,R,...H.p(i,j,.23),5,3,'sun',.7);H.line(R,[H.p(i-.1,j,.24),H.p(i+.1,j,.24)],'blue',1);}
 shape(H,R,H.tile(9.34,7,.68,.32,.23),'paper',1);
 H.line(R,[H.p(9.35,7.01,.24),H.p(10,7.29,.24),H.p(9.98,7.01,.24)],'coral',.7);
},(H,R,t)=>{
 const u=cycle(t,22)*22,turn=ease((u-4.4)/4.4)*(1-ease((u-13.2)/6.8));
 listener.head=12+turn*14;
 const root=H.p(7.18,4.91,0),target=H.p(7.23,4.45,1.58),dx=(target[0]-root[0])/1.5-5.2,dy=(target[1]-root[1])/1.5+32.5,d=Math.min(8.56,Math.hypot(dx,dy)),a0=Math.atan2(dx,dy)-Math.acos(Math.max(-1,Math.min(1,(4.368**2+d*d-4.2**2)/(2*4.368*d))));
 listener.ar=a0*180/Math.PI;listener.er=(Math.atan2(dx-Math.sin(a0)*4.368,dy-Math.cos(a0)*4.368)-a0)*180/Math.PI;
 actor(H,R,7.18,4.91,t,'hanoiRadioTune',{shirt:['paper',1],pants:['teal',.7],hairStyle:'short'},0,1.5);
 const p=H.p(7.23,4.45,1.58),a=-.9+turn*1.55;
 oval(H,R,...p,7,7,'sun',.7);H.line(R,[p,[p[0]+Math.sin(a)*5,p[1]-Math.cos(a)*5]],'coral',1.8);
 const dial=H.p(6.5+turn*.75,4.46,2.06);H.line(R,[[dial[0],dial[1]-4],[dial[0],dial[1]+4]],'coral',1.4);
 actor(H,R,3.16,8.29,t,'hanoiRadioPartner',{shirt:['coral',.62],pants:['blue',.65],face:'sw',glasses:true},.16,1.5);
 const tip=H.p(4.05,3.4,3.08);H.line(R,[H.p(4.16,3.41,2.93),[tip[0]+Math.sin(t*Math.PI/11)*.6,tip[1]]],'paper',1);
});
room.loopSeconds=22;
room.stillTime=11;
export default room;
