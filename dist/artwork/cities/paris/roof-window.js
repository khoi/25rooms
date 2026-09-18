import { world, box, shape, oval, stroke, actor, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, cushion, drape, vessel, branchSpray, floorLight } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';
import { panelFront, taskLight, specimen } from '../joinery.js';

const contactPose={...FIGURES.sample('idle',0)};
FIGURES.clips.parisRoofContact={dur:1,keys:[[0,contactPose],[1,contactPose]]};
function contactPerson(H,R,target,options={},scale=1.72,root,pose={}){
  Object.assign(contactPose,FIGURES.sample('idle',0),pose);
  const base=root||[target[0]+scale*2,target[1]+scale*28];
  const a=contactPose.lean*Math.PI/180,cx=contactPose.x-Math.sin(a)*15,cy=contactPose.y+contactPose.drop*19-19-Math.cos(a)*15;
  const sx=cx+5.2*Math.cos(a)-1.5*Math.sin(a),sy=cy+5.2*Math.sin(a)+1.5*Math.cos(a);
  const dx=(target[0]-base[0])/scale-sx,dy=(target[1]-base[1])/scale-sy,l=4.368,r=4.2;
  const bend=Math.acos(Math.max(-1,Math.min(1,(dx*dx+dy*dy-l*l-r*r)/(2*l*r))));
  contactPose.ar=(Math.atan2(dx,dy)-Math.atan2(r*Math.sin(bend),l+r*Math.cos(bend)))*180/Math.PI;
  contactPose.er=bend*180/Math.PI;
  if(options.leftTarget){
    const sx=cx-5.2*Math.cos(a)-1.5*Math.sin(a),sy=cy-5.2*Math.sin(a)+1.5*Math.cos(a),dx=(options.leftTarget[0]-base[0])/scale-sx,dy=(options.leftTarget[1]-base[1])/scale-sy;
    const bend=-Math.acos(Math.max(-1,Math.min(1,(dx*dx+dy*dy-l*l-r*r)/(2*l*r))));
    contactPose.al=(Math.atan2(dx,dy)-Math.atan2(r*Math.sin(bend),l+r*Math.cos(bend)))*180/Math.PI;
    contactPose.el=bend*180/Math.PI;
  }

  FIGURES.draw(H,R,{who:'adult',x:base[0],y:base[1],t:0,phase:0,clip:'parisRoofContact',scale,face:options.face||'se',ground:base,opts:options});
}
const T=24,rest=FIGURES.sample('idle',0),sit=FIGURES.sample('sit',0),ease=(a,b,t)=>{const q=Math.max(0,Math.min(1,(t-a)/(b-a)));return q*q*(3-2*q);};
FIGURES.clips.parisRoofResident={dur:T,keys:[[0,{...sit,al:30,ar:38,el:35,er:45,head:12}],[.13,{...rest,al:16,ar:-70,er:-30,head:-8}],[.2,{...rest,al:16,ar:-135,er:-15,head:-18}],[.4,{...rest,al:16,ar:-145,er:-10,head:-20}],[.6,{...rest,al:16,ar:-145,er:-10,head:-14}],[.78,{...rest,al:16,ar:-135,er:-15,head:-18}],[.89,{...sit,al:30,ar:38,el:35,er:45,head:12}],[1,{...sit,al:30,ar:38,el:35,er:45,head:12}]]};
function jar(H,R,i,j,z){
 const [x,y]=H.p(i,j,z);const a=[[x-6,y],[x+6,y],[x+6,y-19],[x-6,y-19]];H.tint(a,'teal',.18);H.outline(R,a,'blue',.8);oval(H,R,x,y-19,6,2,'paper',1);H.line(R,[[x-4,y-14],[x+4,y-14]],'teal',1);stroke(H,R,[[x,y-20],[x-2,y-10],[x+3,y-6],[x-2,y-3]],'sun',.8);H.line(R,[[x-4,y-16],[x-4,y-5]],'paper',1.3);
 branchSpray(H,R,x,y-21,.47,'teal',-1);
}
function plant(H,R,i,j,z,size=1){
 vessel(H,R,i,j,z,10*size,14*size,'coral');const [x,y]=H.p(i,j,z);branchSpray(H,R,x,y-14*size,size,'teal',-1);branchSpray(H,R,x+3,y-14*size,size*.86,'teal',1);
 H.line(R,[[x+10*size,y-31*size],[x+14*size,y-35*size]],'paper',1.1);
}
function sash(H,R,t){
 const u=t%T,open=ease(4.8,9.6,u)-ease(14.4,18.4,u),P=(x,v)=>H.p(x,.52+v*(.94-open*.08),4.21-v*(.49-open*.11));
 const outside=[P(2.25,0),P(7.82,0),P(7.82,2.98),P(2.25,2.98)];H.tint(outside,'teal',.1);H.outline(R,outside,'blue',4.3,{tone:.88});
 H.line(R,[P(2.3,.06),P(7.76,.06)],'paper',2.5);H.line(R,[P(2.3,2.92),P(7.76,2.92)],'paper',2.4);
 for(const x of [4.1,5.96])H.line(R,[P(x,.05),P(x,2.95)],'teal',3.7);
 H.line(R,[P(2.32,1.49),P(7.77,1.49)],'teal',3.4);
 for(const x of [2.7,4.52,6.38])H.line(R,[P(x,.28),P(x+.33,1.31)],'paper',1.8,{tone:.6});
 for(const x of [2.62,7.42]){H.line(R,[H.p(x,3.61,2.55),P(x,2.74)],'blue',2);H.line(R,[H.p(x,3.64,2.57),P(x,2.72)],'sun',.9);for(let n=0;n<5;n++)H.dot(...H.p(x,3.61-n*.15,2.55+n*.06),.8,'blue');}
 H.line(R,[P(5.1,2.83),P(5.1,3.02)],'coral',3);
 H.line(R,[H.p(7.42,3.53,2.6),H.p(7.42,3.66,2.53)],'coral',3.1);
 return P;
}
const room=world('paris-roof-window','The moon in a water glass',{wall:false,floor:'sun',tone:.16,head:105},(H,R)=>{
 boardFloor(H,R,0,0,12,12,.02,'sun',.6);
 shape(H,R,[H.p(0,0,0),H.p(12,0,0),H.p(12,0,4.32),H.p(0,0,4.32)],'paper',.78,1.2);
 shape(H,R,[H.p(0,0,0),H.p(0,9.3,0),H.p(0,9.3,1.76),H.p(0,0,4.32)],'paper',.72,1.1);
 for(const x of [.14,8.55,11.72])bentTube(H,R,[[x,.12,4.35],[x,4.48,2.16]],5.5,'sun');
 timber(H,R,.1,.03,11.77,.25,4.23,.2,'sun');
 const roof=(x,j)=>H.p(x,j,4.34-j*.53);
 for(const [i,w] of [[.34,1.62],[8.12,3.43]]){
   shape(H,R,[roof(i,.3),roof(i+w,.3),roof(i+w,3.66),roof(i,3.66)],'paper',.9,.8);
   for(let n=0;n<5;n++)H.line(R,[roof(i,.5+n*.66),roof(i+w,.5+n*.66)],'blue',.55,{tone:.33});
 }
 const opening=[roof(2.07,.35),roof(8.04,.35),roof(8.04,3.72),roof(2.07,3.72)];shape(H,R,opening,'blue',.88,1.6);
 H.clip(opening,()=>{
   oval(H,R,...roof(6.95,1.2),10,10,'paper',.92);
   for(let n=0;n<6;n++){
     const x=2.2+n*.95;shape(H,R,[roof(x,2.56),roof(x+.45,1.86-(n%2)*.24),roof(x+.87,2.56),roof(x+.87,3.78),roof(x,3.78)],'teal',.45,.65);
     H.line(R,[roof(x+.4,2.65),roof(x+.4,2.9)],'sun',2.2);
   }
 });
 for(const x of [2.03,7.99])bentTube(H,R,[[x,.29,4.2],[x,3.8,2.34]],5.3,'sun');
 timber(H,R,1.99,3.69,6.12,.61,2.24,.2,'sun');
 metal(H,R,2.25,3.79,5.49,.42,2.43,.08,'teal');
 for(const x of [3.15,4.05,5.06])jar(H,R,x,3.99,2.53);
 const boat=H.p(5.85,4.01,2.55);shape(H,R,[[boat[0]-11,boat[1]],[boat[0]+11,boat[1]],[boat[0]+6,boat[1]+5],[boat[0]-6,boat[1]+5]],'paper',1,.6);shape(H,R,[[boat[0]-7,boat[1]],[boat[0]+3,boat[1]-8],[boat[0]+6,boat[1]]],'paper',1,.5);H.line(R,[[boat[0]+2,boat[1]-3],[boat[0]+4,boat[1]+3]],'blue',1.8);
 metal(H,R,2.01,.29,6.01,.24,4.2,.13,'teal');
 for(let k=0;k<4;k++)H.line(R,[H.p(2.3,.36,4.34-k*.065),H.p(7.7,.36,4.34-k*.065)],'sun',1.3);
 timber(H,R,1.42,4.5,6.78,2.59,.12,.46,'sun');
 panelFront(H,R,1.56,7.1,6.5,.2,.3,4,'sun');
 cushion(H,R,1.6,4.7,3.02,2.17,.61,.18,'paper');cushion(H,R,4.77,4.7,3.18,2.17,.61,.18,'sun');
 drape(H,R,1.72,5.08,1.46,1.83,.81,.38,'teal');
 for(let n=0;n<8;n++)H.line(R,[H.p(1.83+n*.15,5.16,.84),H.p(1.83+n*.15,6.84,.84)],'sun',.65);
 shape(H,R,H.tile(3.25,5.77,1.16,.88,.84),'coral',.51,.7);
 const B=(x,y,z)=>H.p(x,y,z);shape(H,R,[B(3.37,5.91,.89),B(3.92,5.91,.94),B(3.92,6.6,.94),B(3.37,6.6,.89)],'paper',1,.7);shape(H,R,[B(3.92,5.91,.94),B(4.48,5.91,.88),B(4.48,6.6,.88),B(3.92,6.6,.94)],'paper',1,.7);
 branchSpray(H,R,...H.p(4.13,6.2,.96),.19,'teal',1);
 cabinetFrame(H,R,9.12,.58,2.48,1.71,.07,3.4,2,'teal',(x,y,w,d,z,h,n)=>{
   for(let row=0;row<3;row++){
     timber(H,R,x,y,w,d,z+row*1.03,.09,'teal');
     if(row===0){box(H,R,x+.1,y+.13,w-.2,d-.25,z+.12,.52,'sun',.4);for(let k=0;k<5;k++)H.line(R,[H.p(x+.2+k*.14,y+d-.06,z+.17),H.p(x+.2+k*.14,y+d-.06,z+.54)],'teal',.8);}
     else if(n===0)plant(H,R,x+w*.48,y+.71,z+row*1.03+.11,.66+row*.06);
     else if(row===1)jar(H,R,x+.55,y+.76,z+row*1.03+.12);
     else {for(let k=0;k<3;k++)cushion(H,R,x+.1,y+.22,w-.2,.98,z+row*1.03+.12+k*.08,.07,k%2?'paper':'teal');}
   }
 });
 metal(H,R,9.26,2.45,2.18,.68,.06,.08,'teal');
 plant(H,R,8.37,3.82,.06,1.42);
 bentTube(H,R,[[8.37,3.82,.25],[8.37,3.8,2.16]],1.1,'sun');
 timber(H,R,.4,7.48,1.72,1.15,.05,.28,'sun');cushion(H,R,.45,7.51,1.61,1.08,.34,.12,'paper');
 timber(H,R,8.55,8.4,2.72,1.38,.06,.17,'teal');
 vessel(H,R,9.06,8.91,.24,9,16,'paper',false);stroke(H,R,[H.p(9.1,8.9,.66),H.p(9.5,8.9,.79),H.p(9.69,8.9,.62)],'teal',2);
 oval(H,R,...H.p(10.22,8.85,.24),13,5,'coral',.4);H.line(R,[H.p(10.02,8.77,.25),H.p(10.33,8.95,.25)],'blue',1.4);
 H.line(R,[H.p(10.51,9.24,.24),H.p(10.98,9.51,.24)],'sun',2);H.line(R,[H.p(10.51,9.24,.24),H.p(10.35,9.16,.24)],'teal',4.2);
 taskLight(H,R,1.27,5.1,.83,'coral',.75);  cabinetFrame(H,R,.29,8.92,4.76,1.59,.06,.94,3,'sun',(x,y,w,d,z,h,n)=>{
    if(n===0){for(let k=0;k<4;k++)box(H,R,x+.09,y+.09,w-.18,d-.2,z+.07+k*.16,.12,['paper','coral','sun','paper'][k],.6);}
    else if(n===1){for(let k=0;k<5;k++)box(H,R,x+.1+k*.24,y+.2,.18,d-.25,z+.06,.62+(k%2)*.12,['teal','paper','coral'][k%3],.59);}
    else {drape(H,R,x+.08,y+.13,w-.15,d-.23,z+.53,.35,'paper');}
  });
  timber(H,R,.22,8.86,4.9,1.7,1.03,.13,'sun');
  cushion(H,R,.44,9.04,1.69,1.28,1.18,.14,'teal');
  const specs=H.p(3.38,9.57,1.19);for(const dx of [-3.2,3.2])H.outline(R,ell(specs[0]+dx,specs[1],3,1.9),'blue',.9);H.line(R,[[specs[0]-6,specs[1]],[specs[0]-10,specs[1]-4]],'blue',.8);
  shape(H,R,[H.p(.16,3.93,1.6),H.p(.16,7.71,.47),H.p(.16,7.71,1.61),H.p(.16,3.93,2.75)],'teal',.18,.8);
  for(let n=0;n<5;n++){const j=4.1+n*.7;H.line(R,[H.p(.19,j,1.74-(j-4.1)*.27),H.p(.19,j,2.56-(j-4.1)*.27)],'sun',2);}
floorLight(H,3.35,6.15,135,.32);
},(H,R,t)=>{
 sash(H,R,t);
 const u=t%T,rise=ease(0,4.8,u)-ease(18.4,22,u),target=H.p(7.42,3.61,2.56),s=1.78,seated=H.p(6.79,5.57,.8),standing=[target[0]-s*3,target[1]+s*40],root=seated.map((v,k)=>v+(standing[k]-v)*rise);
 const pose=FIGURES.sample('parisRoofResident',t/T);
 if(rise>.99)contactPerson(H,R,target,{shirt:['coral',.58],pants:['blue',.64],hairStyle:'bun'},s,root,{head:-15,al:15,el:20});
 else {Object.assign(contactPose,pose);FIGURES.draw(H,R,{who:'adult',x:root[0],y:root[1],t:0,phase:0,clip:'parisRoofContact',scale:s,face:'se',ground:root,opts:{shirt:['coral',.58],pants:['blue',.64],hairStyle:'bun'}});}
 const sway=Math.sin(t*Math.PI/12)*.12,P=(x,z)=>H.p(8.37+x,3.8,z);
 stroke(H,R,[P(0,.88),P(.04,1.26),P(.18+sway,1.47)],'teal',1.2);
 shape(H,R,[P(.18+sway,1.47),P(.54+sway,1.7),P(.61+sway,1.55),P(.37+sway,1.43)],'teal',.53,.6);
 H.line(R,[P(.4+sway,1.56),P(.45+sway,1.47)],'paper',1);

});
room.loopSeconds=T;room.stillTime=23;
export default room;
