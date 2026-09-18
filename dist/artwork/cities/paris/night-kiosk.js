import { world, box, shape, oval, stroke, actor, wallPt, wallRect, ell, starPts } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, drape, floorLight } from '../materials.js';
import { masonry, archedBay, cabinetFrame } from '../structure.js';
import { panelFront, caster, taskLight, hangingRail, wallRack } from '../joinery.js';

const contactPose={...FIGURES.sample('idle',0)};
FIGURES.clips.parisKioskContact={dur:1,keys:[[0,contactPose],[1,contactPose]]};
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

  FIGURES.draw(H,R,{who:'adult',x:base[0],y:base[1],t:0,phase:0,clip:'parisKioskContact',scale,face:options.face||'se',ground:base,opts:options});
}
const T=22,rest=FIGURES.sample('idle',0),ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
FIGURES.clips.parisKioskVisitor={dur:T,keys:[[0,{...rest,al:20,el:80,head:6}],[.4,{...rest,al:20,el:80,head:6}],[.57,{...rest,al:20,el:80,head:-4,lean:4}],[.75,{...rest,al:20,el:80,head:-4,lean:4}],[.91,{...rest,al:20,el:80,head:6}],[1,{...rest,al:20,el:80,head:6}]]};
function paper(H,R,i,j,z,w,d,h,ink='paper'){
  box(H,R,i,j,w,d,z,h,ink,ink==='paper'?1:.42);
  for(let n=1;n<4;n++)H.line(R,[H.p(i+.04,j+d+.015,z+h*n/4),H.p(i+w-.04,j+d+.015,z+h*n/4)],'blue',.45,{tone:.42});
  H.line(R,[H.p(i+w*.5,j,z+h+.012),H.p(i+w*.5,j+d,z+h+.012)],'coral',1.2);
}
function display(H,R){
  for(const x of [2.45,7.85])metal(H,R,x,2.62,.19,.28,.15,3.42,'teal');
  shape(H,R,H.faceI(2.59,2.82,5.23,1.26,3.43),'blue',.84,.7);
  for(let row=0;row<3;row++){
    const z=1.42+row*.61;
    timber(H,R,2.57,2.75,5.21,.75,z-.07,.09,'teal');
    for(let n=0;n<6;n++){
      const x=2.66+n*.82,ink=['paper','coral','sun','teal','paper','sun'][(n+row)%6];
      shape(H,R,[H.p(x,3.41,z),H.p(x+.7,3.41,z),H.p(x+.7,3.08,z+.61),H.p(x,3.08,z+.61)],ink,ink==='paper'?1:.65,.7);
      const a=H.p(x+.35,3.23,z+.35);oval(H,R,...a,6,4,n%2?'paper':'blue',.53);
      H.line(R,[H.p(x+.1,3.38,z+.11),H.p(x+.59,3.38,z+.11)],'blue',.8,{tone:.6});
    }
    metal(H,R,2.52,3.46,5.34,.1,z-.02,.08,'teal');
  }
  timber(H,R,2.27,2.52,5.91,1.42,1.13,.18,'teal');
  panelFront(H,R,2.48,3.8,5.44,.22,.85,3,'teal');
  const [sx,sy]=H.p(7.43,2.91,3.17);shape(H,R,starPts(sx,sy,7,3,5),'sun',.8,.6);H.line(R,[[sx,sy-8],[sx+2,sy-13]],'coral',1.6);
  for(let k=0;k<4;k++)paper(H,R,2.9+k*.9,3.14,1.31,.75,.67,.14,k===0?'sun':'paper');
  const [rx,ry]=H.p(6.63,3.57,1.33);H.outline(R,ell(rx,ry,8,3),'coral',.8,{tone:.4});
  metal(H,R,7.51,3.73,.26,.22,1.29,.12,'sun');
}
function cover(H,R,t){
  const u=t%T,lower=ease(4.4,8.8,u)-ease(13.2,17.6,u),a=.95-lower*.84;
  const Q=(x,v)=>H.p(x,2.93+Math.sin(a)*v,3.49-Math.cos(a)*v);
  const glass=[Q(2.45,0),Q(7.92,0),Q(7.92,2.09),Q(2.45,2.09)];
  H.tint(glass,'teal',.085);H.outline(R,glass,'blue',1.4,{tone:.88});
  H.line(R,[Q(2.55,.06),Q(7.8,.06)],'paper',2.4);
  H.line(R,[Q(2.49,1.99),Q(7.88,1.99)],'teal',3.2);
  for(const x of [2.9,7.5]){H.line(R,[Q(x,-.06),Q(x,.12)],'sun',4);H.dot(...Q(x,.03),1.1,'blue');}
  shape(H,R,[Q(7.49,1.79),Q(7.89,1.79),Q(7.89,2.04),Q(7.49,2.04)],'teal',.28,.6);
  for(const x of [7.56,7.83])for(const v of [1.84,1.99])H.dot(...Q(x,v),1,'sun');
  H.line(R,[Q(7.61,1.83),Q(7.68,1.93),Q(7.81,1.97)],'paper',.9);
  const wipe=ease(17.6,18.5,u)-ease(19.2,20,u),p=Q(7.71-wipe*.47,1.99);
  shape(H,R,[[p[0]-5,p[1]-2],[p[0]+4,p[1]-4],[p[0]+7,p[1]+4],[p[0]-4,p[1]+6]],'paper',1,.6);
}
const room=world('paris-night-kiosk','The last paper stays dry',{wall:false,floor:'blue',tone:.12,head:95},(H,R)=>{
  for(let x=0;x<12;x+=1.5)for(let y=0;y<12;y+=1.3)shape(H,R,H.tile(x,y,Math.min(1.47,12-x),Math.min(1.27,12-y),.026),'paper',.7,.55);
  masonry(H,R,'nw',0,11,0,3.7,'paper',.72);
  archedBay(H,R,'nw',4.95,4.32,.08,3.58,'teal',P=>{
    shape(H,R,[P(.12,.1),P(4.18,.1),P(4.18,3.7),P(.12,3.7)],'blue',.82,.5);
    for(const n of [0,1,2]){H.line(R,[P(.6+n*1.05,.1),P(.6+n*1.05,2.8)],'teal',3);H.line(R,[P(.6+n*1.05,2.2),P(.89+n*1.05,2.2)],'sun',2.2);}
  });
  metal(H,R,.15,4.75,.52,4.66,.02,.1,'teal');
  for(const x of [1.75,8.3])metal(H,R,x,.67,.26,.33,0,4.02,'teal');
  metal(H,R,1.58,.5,7.18,2.25,3.8,.25,'teal');
  shape(H,R,[H.p(1.32,.4,4.02),H.p(8.9,.4,4.02),H.p(8.7,3.11,3.76),H.p(1.52,3.11,3.76)],'teal',.76,1.1);
  for(let n=0;n<6;n++)H.line(R,[H.p(1.5+n*1.43,.42,4.04),H.p(1.7+n*1.37,3.1,3.78)],'paper',.75,{tone:.68});
  bentTube(H,R,[[1.53,3.14,3.77],[8.77,3.14,3.77],[8.86,3.01,3.45]],2.8,'teal');
  for(let n=0;n<11;n++){metal(H,R,1.88,.85,6.2,.2,1.41+n*.19,.15,'teal');H.line(R,[H.p(2,.99,1.48+n*.19),H.p(8,.99,1.48+n*.19)],'paper',.55,{tone:.5});}
  cabinetFrame(H,R,9.2,.63,2.21,1.63,.1,3.36,2,'teal',(x,y,w,d,z,h,n)=>{
    for(let row=0;row<3;row++){timber(H,R,x,y,w,d,z+row*1.02,.09,'teal');for(let k=0;k<3;k++)paper(H,R,x+.06,y+.15,w*.12+z+row*1.02+k*.12,w-.12,d-.23,.1,row===0&&n===0?'sun':'paper');}
  });
  metal(H,R,9.24,.72,.28,1.38,3.5,.12,'teal');
  hangingRail(H,R,'ne',10.03,1.1,3.13,2,(P,u,n)=>{if(n===0){stroke(H,R,[P(u,-.04),P(u-.09,-.18),P(u,-.3),P(u,-1.51)],'sun',1.8);shape(H,R,[P(u-.15,-.4),P(u+.15,-.4),P(u+.05,-1.49),P(u-.05,-1.49)],'coral',.7,.6);}else{shape(H,R,[P(u-.26,-.3),P(u+.25,-.3),P(u+.29,-.95),P(u-.23,-.95)],'sun',.5,.7);}},2.1);
  taskLight(H,R,7.39,2.02,3.51,'sun',-.6);
  display(H,R);
  timber(H,R,1.5,4.38,1.88,1.14,1.03,.12,'teal');
  metal(H,R,2.39,4.89,.09,.1,1.15,1.18,'teal');
  for(let row=0;row<2;row++)for(let n=0;n<4;n++){
    if(row===0&&n===2)continue;
    const a=n*Math.PI/2, P=(q,z)=>H.p(2.43+Math.cos(a)*q,4.94+Math.sin(a)*q,z);
    shape(H,R,[P(.08,1.45+row*.5),P(.68,1.45+row*.5),P(.68,1.89+row*.5),P(.08,1.89+row*.5)],n%2?'paper':'coral',n%2?1:.62,.7);
    H.line(R,[P(.18,1.67+row*.5),P(.57,1.67+row*.5)],'teal',2);
  }
  oval(H,R,...H.p(2.43,4.94,2.4),4,2,'sun',.8);
  timber(H,R,7.9,7.45,3.4,1.5,.85,.15,'sun');
  for(const x of [8.03,11.04])for(const y of [7.59,8.67])metal(H,R,x,y,.12,.12,.05,.8,'teal');
  shape(H,R,H.tile(8.11,7.6,1.76,.98,1.01),'paper',1,.7);H.line(R,[H.p(8.2,7.63,1.02),H.p(9.71,8.49,1.02)],'teal',.6);
  oval(H,R,...H.p(10.53,7.99,1.07),8,4,'sun',.75);oval(H,R,...H.p(10.53,7.99,1.08),2,1,'blue',.8);
  stroke(H,R,[H.p(10.5,8,1.09),H.p(10,8.62,1.03),H.p(9.59,8.79,1.02)],'coral',.7);
  H.line(R,[H.p(10.21,8.61,1.03),H.p(10.93,8.47,1.03)],'blue',2.6);
  timber(H,R,8.65,9.4,2.01,1.15,.17,.13,'teal');for(const x of [8.8,10.5])for(const y of [9.49,10.38])caster(H,R,x,y);
  paper(H,R,8.8,9.54,.32,1.7,.85,.44,'paper');
  metal(H,R,4.1,7.84,2.22,.62,.07,.09,'teal');shape(H,R,H.tile(4.28,7.92,1.08,.44,.18),'paper',1,.5);
  for(const x of [5.8,6.05])H.outline(R,ell(...H.p(x,8.08,.19),3,1.6),'blue',.9);
  for(const [j,z,w,h] of [[1.03,1.2,1.95,1.49],[3.26,1.37,1.38,1.13],[9.59,.91,1.1,1.62]]){
    shape(H,R,wallRect(H,'nw',j,j+w,z,z+h,-.18),'teal',.66,.8);
    shape(H,R,wallRect(H,'nw',j+.12,j+w-.12,z+.11,z+h-.12,-.2),'paper',1,.6);
    const P=(u,v)=>wallPt(H,'nw',j+u,z+v,-.23);
    shape(H,R,[P(.2,.2),P(w-.2,.2),P(w*.5,h-.25)],'coral',.52,.7);
    oval(H,R,...P(w*.47,h*.58),w*6,w*6,'sun',.74);
  }
  timber(H,R,.48,9.13,2.77,1.18,.19,.12,'teal');
  for(let k=0;k<4;k++)paper(H,R,.67,9.29,.32+k*.17,2.33,.81,.14,k===0?'sun':'paper');
  bentTube(H,R,[[.65,10.17,.04],[.65,10.17,1.58],[2.99,10.17,1.58],[2.99,10.17,.04]],2.4,'teal');
  for(const x of [.66,2.98])caster(H,R,x,10.15);
  shape(H,R,H.tile(4.45,9.31,2.31,1.37,.055),'teal',.18,.7);
  for(let n=0;n<12;n++)H.line(R,[H.p(4.54+n*.18,9.36,.07),H.p(4.54+n*.18,10.61,.07)],'blue',.6,{tone:.4});
  floorLight(H,5.5,4.2,155,.47);
},(H,R,t)=>{
  cover(H,R,t);
  const u=t%T,lower=ease(4.4,8.8,u)-ease(13.2,17.6,u),a=.95-lower*.84,wipe=ease(17.6,18.5,u)-ease(19.2,20,u);
  const target=H.p(7.71-wipe*.47,2.93+Math.sin(a)*1.99,3.49-Math.cos(a)*1.99);
  contactPerson(H,R,target,{shirt:['coral',.62],pants:['blue',.73],hairStyle:'short'},1.76,undefined,{head:7,al:20,el:40});
  actor(H,R,1.89,6.37,t,'parisKioskVisitor',{shirt:['teal',.65],pants:['blue',.7],hairStyle:'cap',face:'se'},0,1.72);
  const paperSway=Math.sin(t*Math.PI/11)*.04;
  shape(H,R,[H.p(3.81,3.15,1.47),H.p(4.23,3.15,1.47),H.p(4.23,3.54,1.47+paperSway)],'paper',1,.5);

});
room.loopSeconds=T;room.stillTime=11;
export default room;
