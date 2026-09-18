import { world, shape, oval, stroke, box, ell, mix, cycle } from '../../worlds/common.js';
import { surface, timber, metal, vessel, benchFrame, bentTube, drape, cushion } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, wallRack, recessedFrame, hangingRail, taskLight, floorShadow } from '../joinery.js';
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
function cultivationCabinet(H,R) {
  cabinetFrame(H,R,8.35,.6,3.17,1.28,.12,3.59,2,'teal',(i,j,w,d,z,h,n)=>{
    for(let row=0;row<3;row++){
      const base=z+.2+row*.94;timber(H,R,i,j,w,d,base,.09,'sun');
      if(row===0){surface(H,R,H.faceI(i+.07,j+d-.03,w-.15,base+.14,base+.63),'sun',.46);surface(H,R,H.faceI(i+.18,j+d-.01,w-.38,base+.27,base+.52),'sun',.22);H.line(R,[H.p(i+.47,j+d+.02,base+.42),H.p(i+.87,j+d+.02,base+.42)],'teal',2);}
      else if(row===1&&n===0){for(let k=0;k<2;k++){vessel(H,R,i+.29+k*.65,j+.74,base+.1,7,18,'paper',false);const q=H.p(i+.29+k*.65,j+.74,base+.1);H.fill([[q[0]-5,q[1]-11],[q[0]+5,q[1]-11],[q[0]+5,q[1]-2],[q[0]-5,q[1]-2]],k?'teal':'coral',.5);}}
      else if(row===1){for(let k=0;k<3;k++){const p=H.p(i+.27+k*.36,j+.76,base+.14);shape(H,R,[[p[0]-3,p[1]],[p[0]+5,p[1]-1],[p[0]+4,p[1]-23],[p[0]-3,p[1]-25]],'coral',.58);H.line(R,[[p[0]-2,p[1]-21],[p[0]+4,p[1]-21]],'sun',1.5);}}
      else {for(let k=0;k<4;k++){surface(H,R,H.faceI(i+.11+k*.025,j+.9-k*.035,w-.22,base+.12+k*.085,base+.19+k*.085),k%2?'paper':'sun',k%2?1:.4);}}
    }
  });
  for(let n=0;n<2;n++){const q=H.p(8.92+n*1.47,1.22,3.74);oval(H,R,...q,14,7,'paper',1);for(let k=0;k<4;k++)H.outline(R,ell(...q,4+k*2.7,2+k*1.2),'teal',.65);H.line(R,[[q[0]-8,q[1]-7],[q[0]+8,q[1]+6]],'coral',2);}
  const door=[H.p(11.57,1.87,.34),H.p(11.57,3.0,.34),H.p(11.57,3.0,3.44),H.p(11.57,1.87,3.44)];surface(H,R,door,'sun',.15);H.outline(R,door,'sun',3);H.clip(door,()=>{for(let n=0;n<11;n++)H.line(R,[blend(door[0],door[1],n/10),blend(door[3],door[2],n/10)],'teal',.6);for(let n=0;n<22;n++)H.line(R,[blend(door[0],door[3],n/21),blend(door[1],door[2],n/21)],'teal',.6);});H.line(R,[H.p(11.59,2.81,1.7),H.p(11.59,2.81,2.02)],'blue',2);
}
function fieldStudy(H,R) {
  floorShadow(H,1.77,9.05,4.8,1.93,.16);benchFrame(H,R,1.8,9.08,4.8,1.9,.9,'teal');
  timber(H,R,1.96,9.23,4.44,1.56,.32,.1,'sun');
  for(let n=0;n<2;n++){surface(H,R,H.faceI(2.15+n*2.01,10.63,1.83,.44,.77),'coral',.37);H.line(R,[H.p(2.71+n*2.01,10.66,.6),H.p(3.24+n*2.01,10.66,.6)],'sun',2);}
  surface(H,R,H.tile(1.97,9.24,4.46,1.57,.92),'paper',1);
  for(const x of [3.23,4.59])timber(H,R,x,9.35,.075,1.34,.94,.08,'sun');
  const section=H.p(2.61,10.02,.97);oval(H,R,...section,14,8,'teal',.28);oval(H,R,...section,10,6,'sun',.65);for(let n=0;n<4;n++)H.outline(R,ell(...section,2+n*2,1+n),'coral',.65);
  grapeLeaf(H,R,...H.p(3.84,10.04,.97),.68,true);
  const card=H.tile(4.93,9.68,1.11,.79,.96);surface(H,R,card,'paper',1);for(let n=0;n<5;n++)stroke(H,R,[H.p(5.55,9.78,.98),H.p(5.3+n*.13,10.01,.98),H.p(5.05+n*.21,10.4,.98)],'teal',.75);
  const tie=H.p(5.44,9.45,.97);stroke(H,R,[[tie[0]-20,tie[1]],[tie[0]-5,tie[1]+5],[tie[0]+5,tie[1]-1],[tie[0]+19,tie[1]+4]],'sun',3);oval(H,R,tie[0]-5,tie[1]+4,3,2,'coral',.7);
  const cane=H.p(2.43,10.65,.97);stroke(H,R,[[cane[0]-12,cane[1]-6],[cane[0]+14,cane[1]+7]],'coral',3.5);for(let n=0;n<3;n++)H.line(R,[[cane[0]-7+n*7,cane[1]-5+n*4],[cane[0]-9+n*7,cane[1]-1+n*4]],'sun',1.2);
}
const room=world('cape-town-constantia-grapes','A bunch beside the frame',{wall:false,floor:'paper',tone:.65,head:35},(H,R)=>{
  masonry(H,R,'ne',0,12,0,4.1,'paper',.88);masonry(H,R,'nw',0,11.5,0,3.7,'teal',.24);
  for(let i=0;i<12;i+=1.2)for(let j=0;j<12;j+=1.2){H.outline(R,H.tile(i+.02,j+.02,1.16,1.16,.012),'coral',.5,{tone:.32});if((i+j)%3<.2)H.tint(H.tile(i+.05,j+.05,1.1,1.1,.013),'sun',.09);}
  windowBay(H,R,'nw',1.2,5.8,1.3,2.05,{divisions:4,ink:'sun',view:P=>{for(let n=0;n<6;n++){stroke(H,R,[P(n*.95,.1),P(n*.95+.3,.7),P(n*.95+.15,1.8)],'teal',1.7,.45);for(let q=0;q<3;q++)shape(H,R,[P(n*.95+.2,.3+q*.4),P(n*.95-.1,.6+q*.4),P(n*.95+.5,.63+q*.4)],'teal',.25,.3);}H.line(R,[P(0,.7),P(5.8,.7)],'coral',.7);}});
  bentTube(H,R,[[.22,6.3,1.78],[.65,6.7,1.62],[.3,7.0,1.8]],1.5,'blue');
  cultivationCabinet(H,R);
  hangingRail(H,R,'ne',2.18,4.61,.84,4,(P,u,n)=>{const q=P(u,-.14);if(n<2){shape(H,R,[P(u-.13,-.13),P(u+.15,-.13),P(u+.23,-.54),P(u-.18,-.58)],'teal',.5);H.line(R,[P(u-.1,-.22),P(u+.12,-.46)],'sun',1);}else{oval(H,R,q[0],q[1]+5,7,5,'coral',.5);oval(H,R,q[0],q[1]+5,4,2,'paper',1);}});

  hangingRail(H,R,'ne',1.0,5.9,3.3,5,(P,u,n)=>{if(n<2){shape(H,R,[P(u-.16,-.2),P(u+.2,-.2),P(u+.14,-.95),P(u-.1,-1.0)],'coral',.45,.7);H.line(R,[P(u-.05,-.3),P(u+.05,-.8)],'paper',.8);}else if(n===2){const p=P(u,-.4);oval(H,R,...p,14,6,'sun',.7);oval(H,R,p[0],p[1]-3,8,8,'sun',.65);}else {shape(H,R,[P(u-.2,-.16),P(u+.2,-.16),P(u+.28,-.65),P(u-.23,-.68)],n===3?'teal':'paper',.5,.6);}});
  for(let n=0;n<3;n++)timber(H,R,8.8+n*.28,.3,.12,.15,3.58,.48,'sun');timber(H,R,8.6,.25,2.2,.45,3.55,.1,'teal');
  const field=recessedFrame(H,R,'ne',4.4,2.5,1.5,1.15,'sun',P=>{surface(H,R,[P(.12,.12),P(2.38,.12),P(2.38,1.03),P(.12,1.03)],'paper',1,.3);for(let n=0;n<5;n++)H.line(R,[P(.25+n*.4,.25),P(.4+n*.4,.85)],'teal',1.2);const p=P(1.9,.42);bunch(H,R,...p,.22);});
  timber(H,R,.24,1.44,1.05,5.28,1.07,.14,'sun');for(const y of [1.65,6.34])bentTube(H,R,[[.22,y,.72],[1.14,y,1.06]],1.8,'teal');
  const rest=H.p(.78,2.36,1.23);for(let n=0;n<5;n++){const x=rest[0]-14+n*6;stroke(H,R,[[x,rest[1]+8],[x+8,rest[1]-29]],'coral',2.2);for(let k=0;k<3;k++)H.line(R,[[x+k*2,rest[1]-k*12],[x+4+k*2,rest[1]-k*12-2]],'sun',.8);}H.line(R,[[rest[0]-10,rest[1]-8],[rest[0]+17,rest[1]-9]],'paper',2.3);
  basket(H,R,.3,4.0,1.24,.9,1.24);bunch(H,R,...H.p(.76,4.58,1.95),.55);
  drape(H,R,.31,5.56,.86,.98,1.24,.37,'paper');
  benchFrame(H,R,2.0,3.65,6.2,2.9,1.12,'sun');surface(H,R,H.tile(2.12,3.79,5.94,2.62,1.135),'paper',1,.6);
  timber(H,R,2.17,3.82,5.86,2.52,.34,.12,'teal');
  basket(H,R,2.35,4.27,.47,1.84,1.18);basket(H,R,4.62,4.27,.47,1.85,1.18);
  for(const x of [2.12,7.85])bentTube(H,R,[[x,3.86,.26],[x,6.24,.86]],2,'teal');
  timber(H,R,2.12,6.36,5.91,.12,.85,.2,'sun');for(const x of [2.34,7.77])metal(H,R,x,6.34,.15,.18,.66,.39,'teal');
  for(const x of [2.8,7.2]){timber(H,R,x,5.28,.2,.3,1.15,1.88,'sun');metal(H,R,x-.06,5.15,.33,.6,1.12,.09,'blue');bentTube(H,R,[[x+.08,5.48,2.1],[x+.65*(x<5?1:-1),6.15,1.16]],1.8,'blue');}
  timber(H,R,2.78,5.22,4.67,.23,2.98,.16,'sun');
  for(const x of [2.82,7.23]){metal(H,R,x-.07,5.19,.29,.36,2.94,.2,'teal');for(const z of [1.68,2.85])H.dot(...H.p(x,5.57,z),1.7,'sun');}
  for(const z of [2.2,2.75]){bentTube(H,R,[[2.86,5.65,z],[3.38,5.65,z]],1.8,'blue');const q=H.p(3.17,5.65,z);oval(H,R,...q,6,3,'sun',.7);H.line(R,[[q[0]-4,q[1]],[q[0]+4,q[1]]],'blue',1);}
  surface(H,R,[H.p(2.9,5.32,1.6),H.p(7.2,5.32,1.6),H.p(7.2,5.32,2.98),H.p(2.9,5.32,2.98)],'sun',.13,.6);
  for(let n=0;n<6;n++)H.line(R,[H.p(3.05+n*.67,5.33,1.65),H.p(3.05+n*.67,5.33,2.91)],'coral',.5,{tone:.32});
  for(const z of [2.2,2.75]){H.line(R,[H.p(2.95,5.62,z),H.p(7.28,5.62,z)],'blue',1.3);H.line(R,[H.p(2.95,5.62,z+.02),H.p(7.28,5.62,z+.02)],'paper',.5);for(const x of [2.95,7.28])H.outline(R,ell(...H.p(x,5.62,z),3,3),'coral',1);}
  for(const j of [3.9,6.1])timber(H,R,2.33,j,5.52,.11,1.16,.08,'teal');
  for(let n=0;n<3;n++)surface(H,R,H.tile(2.6+n*.03,3.93+n*.035,1.8,.27,1.18+n*.035),'paper',1);
  surface(H,R,H.tile(2.5,4.07,2.1,.9,1.16),'teal',.14);const grapes=H.p(3.45,4.5,1.2);bunch(H,R,...grapes,.85);
  for(const x of [4.65,6.8]){timber(H,R,x,4.22,.28,.9,1.17,.18,'teal');H.line(R,[H.p(x+.14,4.3,1.36),H.p(x+.14,4.95,1.36)],'sun',1);}
  stroke(H,R,[H.p(4.6,4.6,1.41),H.p(5.4,4.55,1.43),H.p(6.4,4.65,1.45),H.p(7.25,4.45,1.45)],'coral',3);const vine=H.p(6.1,4.62,1.47);grapeLeaf(H,R,vine[0]+9,vine[1]-5,.58,true);const tendril=Array.from({length:30},(_,n)=>[vine[0]-10+Math.cos(n*.48)*(8-n*.16),vine[1]-4+Math.sin(n*.48)*(8-n*.16)]);H.line(R,tendril,'teal',.9);
  basket(H,R,2.15,6.85,0,2.25,1.5);drape(H,R,2.36,7.03,.94,1.29,.67,.36,'paper');basket(H,R,9.3,4.12,0,1.87,1.45);
  const clip=H.p(7.73,4.33,1.18);for(let n=0;n<3;n++)H.outline(R,ell(clip[0]+n*5,clip[1]+n*2,4,3),'teal',1.3);

  fieldStudy(H,R);
  benchFrame(H,R,9.7,7.75,1.5,1.45,.6,'sun');cushion(H,R,9.77,7.79,1.31,1.33,.6,.12,'sun');box(H,R,10.0,7.9,.95,.8,.74,.56,'coral',.45);bentTube(H,R,[[10.18,8.1,1.32],[10.18,8.1,1.55],[10.66,8.1,1.55],[10.66,8.1,1.32]],1.4,'blue');vessel(H,R,11.3,8.85,0,5,21,'teal',false);
  const gloves=H.p(10.6,8.35,1.31);for(let n=0;n<2;n++){shape(H,R,[[gloves[0]+n*7,gloves[1]],[gloves[0]+n*7+6,gloves[1]-1],[gloves[0]+n*7+7,gloves[1]+10],[gloves[0]+n*7,gloves[1]+11]],'paper',1);for(let k=0;k<3;k++)H.line(R,[[gloves[0]+n*7+1+k*2,gloves[1]+1],[gloves[0]+n*7+1+k*2,gloves[1]+6]],'blue',.5);}
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
