import { world, shape, oval, stroke, box, ell, mix, cycle } from '../../worlds/common.js';
import { surface, timber, metal, vessel, benchFrame, bentTube } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, wallRack, recessedFrame, hangingRail, taskLight } from '../joinery.js';
const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
const blend=(a,b,t)=>a.map((v,n)=>mix(v,b[n],t));
function grapeLeaf(H,R,x,y,s=1,torn=false){
  const a=[[0,5],[-12,1],[-7,-7],[-15,-12],[-4,-14],[0,-24],[6,-16],[15,-16],[10,-7],[16,-3],[7,2]];if(torn)a.splice(7,0,[4,-10],[8,-9]);shape(H,R,a.map(([u,v])=>[x+u*s,y+v*s]),'teal',.56,.65);stroke(H,R,[[x,y+5*s],[x,y-19*s]],'sun',.8);for(const [u,v]of[[-9,-10],[10,-10],[-8,0],[9,-1]])H.line(R,[[x,y-7*s],[x+u*s,y+v*s]],'paper',.5);
}
function bunch(H,R,x,y,s=1){
  for(let row=0;row<5;row++)for(let n=0;n<5-row;n++){const px=x+(n-(4-row)/2)*7*s,py=y+row*5.5*s;oval(H,R,px,py,4.7*s,5*s,row%2?'teal':'blue',row%2?.7:.62);H.line(R,[[px-2*s,py-2*s],[px,py-3*s]],'paper',.6);}
  stroke(H,R,[[x,y-1*s],[x-2*s,y-10*s],[x+8*s,y-15*s]],'coral',2*s);grapeLeaf(H,R,x-5*s,y-6*s,.5*s);
}
function basket(H,R,i,j,z,w=1.8,d=1.1){
  surface(H,R,H.faceI(i,j+d,w,z,z+.65),'sun',.5);surface(H,R,H.faceJ(i+w,j,d,z,z+.65),'sun',.43);surface(H,R,H.tile(i,j,w,d,z+.65),'sun',.6);H.fill(H.tile(i+.1,j+.1,w-.2,d-.2,z+.66),'blue',.27);
  for(let n=0;n<8;n++)H.line(R,[H.p(i+.1+n*(w-.2)/7,j+d+.01,z+.07),H.p(i+.1+n*(w-.2)/7,j+d+.01,z+.58)],'coral',.7);for(let n=0;n<4;n++)H.line(R,[H.p(i,j+d+.02,z+.1+n*.13),H.p(i+w,j+d+.02,z+.1+n*.13)],'paper',.8);
  const a=H.p(i+.3,j+d*.5,z+.65),b=H.p(i+w-.3,j+d*.5,z+.65);stroke(H,R,[a,[a[0]-3,a[1]-18],[b[0]+2,b[1]-19],b],'blue',3);stroke(H,R,[a,[a[0]-3,a[1]-18],[b[0]+2,b[1]-19],b],'sun',1.9);for(let n=0;n<4;n++)H.line(R,[[a[0]-5+n*2,a[1]-15],[a[0]-2+n*2,a[1]-21]],'coral',.8);
}
function tutor(H,R,x,y,left,right,look,scale=1.5) {
  const s=scale,P=(a,b)=>[x+a*s,y+b*s];
  H.tint(ell(x+2,y+2,20,6),'blue',.18);
  for(const side of [-1,1]) { stroke(H,R,[P(side*5,-26),P(side*6,-13),P(side*7,0)],'blue',8); oval(H,R,...P(side*7+2,0),7,3.5,'blue',.9); }
  shape(H,R,[[-9,-53],[8,-53],[10,-24],[-10,-24]].map(p=>P(...p)),'teal',.72);
  shape(H,R,[[-6,-45],[5,-45],[8,-26],[-8,-26]].map(p=>P(...p)),'paper',.92);
  oval(H,R,...P(look*2,-63),12,13.5,'coral',.35); shape(H,R,[[-9,-62],[-8,-71],[3,-75],[10,-68],[9,-64],[-3,-68]].map(p=>P(...p)),'blue',.82); H.dot(...P(5,-63),1.5,'blue');
  for(const [side,target] of [[-1,left],[1,right]]) { const shoulder=P(side*8,-49), elbow=[mix(shoulder[0],target[0],.47)+side*5,mix(shoulder[1],target[1],.47)+8]; stroke(H,R,[shoulder,elbow,target],'blue',8); stroke(H,R,[shoulder,elbow,target],'teal',6); oval(H,R,...target,3.7,3.3,'coral',.36); }
}
const room=world('cape-town-constantia-grapes','A bunch beside the frame',{wall:false,floor:'paper',tone:.65,head:35},(H,R)=>{
  masonry(H,R,'ne',0,12,0,4.1,'paper',.88);masonry(H,R,'nw',0,11.5,0,3.7,'teal',.24);
  for(let i=0;i<12;i+=1.2)for(let j=0;j<12;j+=1.2){H.outline(R,H.tile(i+.02,j+.02,1.16,1.16,.012),'coral',.5,{tone:.32});if((i+j)%3<.2)H.tint(H.tile(i+.05,j+.05,1.1,1.1,.013),'sun',.09);}
  windowBay(H,R,'nw',1.2,5.8,1.3,2.05,{divisions:4,ink:'sun',view:P=>{for(let n=0;n<6;n++){stroke(H,R,[P(n*.95,.1),P(n*.95+.3,.7),P(n*.95+.15,1.8)],'teal',1.7,.45);for(let q=0;q<3;q++)shape(H,R,[P(n*.95+.2,.3+q*.4),P(n*.95-.1,.6+q*.4),P(n*.95+.5,.63+q*.4)],'teal',.25,.3);}H.line(R,[P(0,.7),P(5.8,.7)],'coral',.7);}});
  bentTube(H,R,[[.22,6.3,1.78],[.65,6.7,1.62],[.3,7.0,1.8]],1.5,'blue');
  wallRack(H,R,'ne',7.9,3.65,.7,2.9,3,'teal',(P,z,row)=>{for(let n=0;n<3;n++){const u=.3+n*1.08,p=P(u,z+.13);if(row===0){shape(H,R,[P(u,z+.03),P(u+.85,z+.03),P(u+.85,z+.45),P(u,z+.45)],'sun',.45,.5);H.line(R,[P(u+.27,z+.25),P(u+.6,z+.25)],'blue',1.4);}else if(row===1){shape(H,R,[[p[0]-5,p[1]],[p[0]+5,p[1]],[p[0]+5,p[1]-15],[p[0]-5,p[1]-15]],'paper',1,.5);H.line(R,[[p[0]-5,p[1]-15],[p[0]+5,p[1]-15]],'coral',2);H.fill([[p[0]-4,p[1]-6],[p[0]+4,p[1]-6],[p[0]+4,p[1]-1],[p[0]-4,p[1]-1]],'blue',.3);}else{shape(H,R,[P(u,z+.03),P(u+.85,z+.03),P(u+.85,z+.48),P(u,z+.48)],'paper',1,.5);grapeLeaf(H,R,p[0]+8,p[1]-2,.33,n===1);}}});
  benchFrame(H,R,8.25,.65,3.1,1.6,.6,'sun');basket(H,R,8.5,.9,.61,1.15,1.05);basket(H,R,9.9,.9,.61,1.15,1.05);
  hangingRail(H,R,'ne',1.0,5.9,3.3,5,(P,u,n)=>{if(n<2){shape(H,R,[P(u-.16,-.2),P(u+.2,-.2),P(u+.14,-.95),P(u-.1,-1.0)],'coral',.45,.7);H.line(R,[P(u-.05,-.3),P(u+.05,-.8)],'paper',.8);}else if(n===2){const p=P(u,-.4);oval(H,R,...p,14,6,'sun',.7);oval(H,R,p[0],p[1]-3,8,8,'sun',.65);}else {shape(H,R,[P(u-.2,-.16),P(u+.2,-.16),P(u+.28,-.65),P(u-.23,-.68)],n===3?'teal':'paper',.5,.6);}});
  for(let n=0;n<3;n++)timber(H,R,8.8+n*.28,.3,.12,.15,3.58,.48,'sun');timber(H,R,8.6,.25,2.2,.45,3.55,.1,'teal');
  const field=recessedFrame(H,R,'ne',4.4,2.5,1.5,1.15,'sun',P=>{surface(H,R,[P(.12,.12),P(2.38,.12),P(2.38,1.03),P(.12,1.03)],'paper',1,.3);for(let n=0;n<5;n++)H.line(R,[P(.25+n*.4,.25),P(.4+n*.4,.85)],'teal',1.2);const p=P(1.9,.42);bunch(H,R,...p,.22);});
  benchFrame(H,R,2.0,3.65,6.2,2.9,1.12,'sun');surface(H,R,H.tile(2.12,3.79,5.94,2.62,1.135),'paper',1,.6);
  for(const x of [2.8,7.2]){timber(H,R,x,5.28,.2,.3,1.15,1.88,'sun');metal(H,R,x-.06,5.15,.33,.6,1.12,.09,'blue');bentTube(H,R,[[x+.08,5.48,2.1],[x+.65*(x<5?1:-1),6.15,1.16]],1.8,'blue');}
  surface(H,R,[H.p(2.9,5.32,1.6),H.p(7.2,5.32,1.6),H.p(7.2,5.32,2.98),H.p(2.9,5.32,2.98)],'sun',.13,.6);
  for(let n=0;n<6;n++)H.line(R,[H.p(3.05+n*.67,5.33,1.65),H.p(3.05+n*.67,5.33,2.91)],'coral',.5,{tone:.32});
  for(const z of [2.2,2.75]){H.line(R,[H.p(2.95,5.62,z),H.p(7.28,5.62,z)],'blue',1.3);H.line(R,[H.p(2.95,5.62,z+.02),H.p(7.28,5.62,z+.02)],'paper',.5);for(const x of [2.95,7.28])H.outline(R,ell(...H.p(x,5.62,z),3,3),'coral',1);}
  surface(H,R,H.tile(2.5,4.07,2.1,.9,1.16),'teal',.14);const grapes=H.p(3.45,4.5,1.2);bunch(H,R,...grapes,.85);
  for(const x of [4.65,6.8]){timber(H,R,x,4.22,.28,.9,1.17,.18,'teal');H.line(R,[H.p(x+.14,4.3,1.36),H.p(x+.14,4.95,1.36)],'sun',1);}
  stroke(H,R,[H.p(4.6,4.6,1.41),H.p(5.4,4.55,1.43),H.p(6.4,4.65,1.45),H.p(7.25,4.45,1.45)],'coral',3);const vine=H.p(6.1,4.62,1.47);grapeLeaf(H,R,vine[0]+9,vine[1]-5,.58,true);const tendril=Array.from({length:30},(_,n)=>[vine[0]-10+Math.cos(n*.48)*(8-n*.16),vine[1]-4+Math.sin(n*.48)*(8-n*.16)]);H.line(R,tendril,'teal',.9);
  basket(H,R,2.15,6.85,0,2.25,1.5);basket(H,R,8.65,3.0,0,2.05,1.45);
  const tray=H.tile(2.0,9.15,4.75,1.55,.09);surface(H,R,tray,'sun',.35,.7);surface(H,R,H.tile(2.13,9.28,4.49,1.28,.11),'paper',1);const section=H.p(2.85,9.85,.15);oval(H,R,...section,13,7,'teal',.22);oval(H,R,...section,9,5,'sun',.65);for(let n=0;n<3;n++)H.outline(R,ell(...section,3+n*2,1.5+n),'coral',.6);grapeLeaf(H,R,...H.p(4.2,9.9,.16),.55,true);const drawing=H.tile(5.4,9.5,.95,.78,.15);surface(H,R,drawing,'paper',1);for(let n=0;n<4;n++)stroke(H,R,[H.p(5.9,9.62,.17),H.p(5.7+n*.13,9.88,.17),H.p(5.55+n*.2,10.17,.17)],'teal',.55);
  benchFrame(H,R,9.7,7.75,1.5,1.45,.6,'sun');box(H,R,10.0,7.9,.95,.8,.62,.56,'coral',.45);bentTube(H,R,[[10.18,8.1,1.2],[10.18,8.1,1.43],[10.66,8.1,1.43],[10.66,8.1,1.2]],1.4,'blue');vessel(H,R,11.3,8.85,0,5,21,'teal',false);
  taskLight(H,R,7.7,3.95,1.17,'teal',.4);
},(H,R,t)=>{
  const u=cycle(t,22)*22,take=ease(.6,4.4,u)*(1-ease(17.7,20,u)),wrap=ease(4.4,8.8,u)*(1-ease(13.2,17.7,u));
  const flat=H.p(5.9,6.0,1.18),wire=H.p(5.9,5.62,2.2),c=blend(flat,wire,take),tie=[];
  for(let n=0;n<32;n++){const f=n/31,straight=[c[0]-20+f*42,c[1]+5*Math.sin(f*Math.PI)],a=-Math.PI/2+f*Math.PI*2.2,loop=[c[0]+Math.cos(a)*12,c[1]+Math.sin(a)*12+10];tie.push(blend(straight,loop,wrap));}
  stroke(H,R,tie,'blue',5);stroke(H,R,tie,'paper',3.8);stroke(H,R,tie,'sun',.65,.9);oval(H,R,...tie[4],3.4,2.2,'coral',.7);
  const worker=H.p(7.4,6.05,0);tutor(H,R,...worker,tie[0],tie[tie.length-1],wrap,1.42);
  const learner=H.p(8.4,6.95,0),point=[learner[0]-19,learner[1]-65];const see=ease(9,10.5,u)*(1-ease(12,13.2,u));tutor(H,R,...learner,[learner[0]-12,learner[1]-42],blend([learner[0]+8,learner[1]-44],point,see),see,1.02);
});
room.loopSeconds=22;
room.stillTime=10.5;
export default room;
