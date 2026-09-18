import { world, shape, oval, stroke, box, ell, mix, cycle } from '../../worlds/common.js';
import { surface, timber, metal, benchFrame, bentTube, drape, vessel } from '../materials.js';
import { masonry, archedBay, cabinetFrame } from '../structure.js';
import { wallRack, hangingRail, floorShadow, taskLight, recessedFrame } from '../joinery.js';
const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};
const blend=(a,b,t)=>a.map((v,n)=>mix(v,b[n],t));
function wheel(H,R,i,j,z,r=.96){
  const ring=radius=>Array.from({length:40},(_,n)=>H.p(i+radius*Math.cos(n*Math.PI/20),j,z+radius*Math.sin(n*Math.PI/20)));
  H.outline(R,ring(r),'blue',6);H.outline(R,ring(r-.09),'paper',1.4);H.outline(R,ring(r-.14),'blue',1);
  for(let n=0;n<18;n++)H.line(R,[H.p(i,j,z),H.p(i+(r-.14)*Math.cos(n*Math.PI/9),j,z+(r-.14)*Math.sin(n*Math.PI/9))],'blue',.55,{tone:.6});
  oval(H,R,...H.p(i,j,z),4,3,'sun',.85);
}
function frame(H,R){
  const j=5.9,P=(i,z)=>H.p(i,j,z),tube=pts=>{H.line(R,pts.map(p=>P(...p)),'blue',5);H.line(R,pts.map(p=>{const q=P(...p);return[q[0]-1,q[1]-1]}),'teal',2.5);};
  wheel(H,R,3,j,1.02);wheel(H,R,8.6,j,1.02);
  tube([[3,1.02],[5.5,.86],[4.5,2.24],[3,1.02]]);tube([[4.5,2.24],[7.55,2.16],[5.5,.86]]);tube([[7.55,2.16],[8.6,1.02]]);tube([[7.65,2.18],[7.9,2.8],[8.5,2.82]]);
  H.line(R,[P(8.1,2.85),H.p(8.1,6.3,2.85)],'blue',4);H.line(R,[P(4.5,2.24),P(4.4,2.54)],'blue',3);shape(H,R,[P(4.02,2.52),P(4.65,2.52),P(4.88,2.65),P(4.16,2.7)],'coral',.8);
  const crank=P(5.5,.86);oval(H,R,...crank,9,7,'paper',1);oval(H,R,...crank,6,4,'blue',.55);H.line(R,[crank,[crank[0]+13,crank[1]+7]],'blue',2);H.line(R,[[crank[0]+9,crank[1]+7],[crank[0]+18,crank[1]+7]],'coral',3);
  H.line(R,[P(3,1.02),P(5.5,1.06),P(5.5,.67),P(3,.9)],'blue',.8);
  for(const c of [3,8.6]){
    const arc=Array.from({length:23},(_,n)=>H.p(c+1.055*Math.cos(Math.PI*.05+n*Math.PI*.9/22),j,1.02+1.055*Math.sin(Math.PI*.05+n*Math.PI*.9/22)));H.line(R,arc,'blue',4);H.line(R,arc,'paper',1.8);
    for(const dx of [-.65,.65])H.line(R,[P(c,1.02),P(c+dx,1.88)],'teal',1.3);
    const valve=P(c+.69,.35);H.line(R,[valve,[valve[0],valve[1]-6]],'sun',1.6);
  }
  for(const z of [.84,1.02])H.line(R,[P(3,z),P(5.5,z-.12)],'sun',.55);
  oval(H,R,...P(3,1.02),7,5,'teal',.6);oval(H,R,...P(3,1.02),4,2.8,'sun',.7);
  bentTube(H,R,[[4.75,5.9,1.65],[5.26,5.9,1.44],[5.49,5.9,1.96]],1.2,'sun');
  const bottle=P(5.09,1.7);shape(H,R,[[bottle[0]-4,bottle[1]+10],[bottle[0]+4,bottle[1]+10],[bottle[0]+5,bottle[1]-8],[bottle[0]+2,bottle[1]-12],[bottle[0]-2,bottle[1]-12],[bottle[0]-4,bottle[1]-8]],'coral',.7);H.line(R,[[bottle[0]-3,bottle[1]-13],[bottle[0]+3,bottle[1]-13]],'blue',2);
  stroke(H,R,[P(8.35,2.82),P(7.05,2.64),P(7.24,1.75),P(8.44,1.25)],'blue',1.1);
  stroke(H,R,[P(8.22,2.8),P(6.92,2.47),P(4.6,2.32),P(3,1.23)],'blue',.85);
  for(const x of [4.6,7.6]){const q=P(x,2.22);H.line(R,[[q[0]-3,q[1]-2],[q[0]+4,q[1]+2]],'sun',2.4);}
  const light=P(8.6,2.32);oval(H,R,...light,7,6,'blue',.9);oval(H,R,light[0]+2,light[1],5,4.5,'sun',.8);H.line(R,[P(8.58,2.25),P(8.26,2.14)],'blue',2);
  for(let n=0;n<5;n++)H.line(R,[H.p(1.86+n*.62,5.07,1.96),H.p(1.86+n*.62,6.8,1.96)],'sun',1.5);

  for(const i of [2.6,4.0])bentTube(H,R,[[3,5.9,1.02],[i,5.1,1.88],[i,6.8,1.88]],2,'blue');
  metal(H,R,1.65,5.02,3.45,1.9,1.86,.1,'blue');
  bentTube(H,R,[[5.35,5.9,.8],[5.25,6.5,.06],[5.95,6.5,.06]],2.5,'blue');
  metal(H,R,2.45,5.5,.38,.4,0,.2,'teal');metal(H,R,8.55,5.5,.35,.4,0,.2,'teal');
  metal(H,R,1.45,6.4,.2,.4,1.8,.17,'teal');box(H,R,1.39,6.43,.16,.3,1.9,.21,'coral',.9);H.line(R,[P(7.85,2.7),P(7.65,1.8),P(8.6,1.14)],'blue',.7);
}
function courier(H,R,x,y,left,right,look) {
  const s=1.5,P=(a,b)=>[x+a*s,y+b*s];
  H.tint(ell(x+2,y+2,20,6),'blue',.18);
  for(const side of [-1,1]) { stroke(H,R,[P(side*5,-26),P(side*6,-13),P(side*7,0)],'blue',8); oval(H,R,...P(side*7+2,0),7,3.5,'blue',.9); }
  shape(H,R,[[-9,-53],[8,-53],[10,-24],[-10,-24]].map(p=>P(...p)),'teal',.72);
  shape(H,R,[[-6,-45],[5,-45],[8,-26],[-8,-26]].map(p=>P(...p)),'paper',.92);
  oval(H,R,...P(look*2,-63),12,13.5,'coral',.35); shape(H,R,[[-9,-62],[-8,-71],[3,-75],[10,-68],[9,-64],[-3,-68]].map(p=>P(...p)),'blue',.82); H.dot(...P(5,-63),1.5,'blue');
  for(const [side,target] of [[-1,left],[1,right]]) { const shoulder=P(side*8,-49), elbow=[mix(shoulder[0],target[0],.47)+side*5,mix(shoulder[1],target[1],.47)+8]; stroke(H,R,[shoulder,elbow,target],'blue',8); stroke(H,R,[shoulder,elbow,target],'teal',6); oval(H,R,...target,3.7,3.3,'coral',.36); }
}
function dispatchCabinet(H,R) {
  cabinetFrame(H,R,7.1,.65,4.4,1.7,.12,3.64,3,'teal',(i,j,w,d,z,h,n)=>{
    for(let row=0;row<3;row++){
      const base=z+.2+row*.89;timber(H,R,i,j,w,d,base,.09,'sun');
      if(n===0&&row===1){const q=H.p(i+.52,j+.86,base+.12);oval(H,R,q[0],q[1]-9,15,11,'sun',.63);for(let k=0;k<4;k++)stroke(H,R,[[q[0]-10+k*6,q[1]-3],[q[0]-7+k*4,q[1]-17]],'blue',.8);stroke(H,R,[[q[0]-10,q[1]-2],[q[0]-4,q[1]+10],[q[0]+9,q[1]-1]],'coral',1.3);}
      else if(n===1&&row===0){surface(H,R,H.tile(i+.12,j+.08,w-.22,d-.18,base+.105),'coral',.24);for(let k=0;k<4;k++)H.line(R,[H.p(i+.15+k*.2,j+.16,base+.13),H.p(i+.15+k*.2,j+d-.18,base+.13)],'paper',1.2);}
      else {box(H,R,i+.11,j+.15,w-.22,d-.27,base+.1,.34+row*.05,n===2?'paper':'sun',n===2?1:.5);H.line(R,[H.p(i+w*.51,j+.12,base+.51),H.p(i+w*.51,j+d-.1,base+.51),H.p(i+w*.51,j+d-.1,base+.12)],'coral',1.5);H.line(R,[H.p(i+.13,j+d-.08,base+.27),H.p(i+w-.11,j+d-.08,base+.27)],'teal',1);}
    }
  });
  for(const x of [7.34,11.16]){metal(H,R,x,2.18,.14,.17,.3,.31,'blue');H.dot(...H.p(x+.07,2.38,.47),1.7,'sun');}
  drape(H,R,7.45,.82,1.28,1.71,3.8,.45,'coral');
  for(let n=0;n<3;n++)box(H,R,9.35+n*.07,.85+n*.02,1.3,1.2,3.81+n*.1,.075,'paper',1);
  const pouch=H.p(11.14,2.4,2.16);shape(H,R,[[pouch[0]-11,pouch[1]],[pouch[0]+10,pouch[1]],[pouch[0]+9,pouch[1]+22],[pouch[0]-8,pouch[1]+24]],'coral',.55);H.line(R,[[pouch[0]-9,pouch[1]+7],[pouch[0]+9,pouch[1]+7]],'sun',1.1);
}
function packingBench(H,R) {
  benchFrame(H,R,.7,9.05,4.6,1.87,.95,'sun');timber(H,R,.86,9.17,4.25,1.6,.27,.1,'teal');
  for(let n=0;n<3;n++){box(H,R,1.0+n*.055,9.38+n*.045,1.55,1.1,.4+n*.1,.075,'paper',1);}
  const sleeve=[H.p(3.08,9.5,.41),H.p(4.65,9.5,.41),H.p(4.78,10.5,.41),H.p(3.03,10.5,.41)];surface(H,R,sleeve,'coral',.4);H.line(R,[H.p(3.08,9.98,.44),H.p(4.73,9.98,.44)],'sun',2);
  drape(H,R,.85,9.2,1.6,1.7,.97,.26,'coral');
  for(let n=0;n<3;n++)H.line(R,[H.p(1.0+n*.49,9.24,.99),H.p(1.0+n*.49,10.79,.99)],'paper',1.5);
  const roll=H.p(3.15,9.7,.98);oval(H,R,roll[0],roll[1],13,7,'sun',.65);oval(H,R,roll[0],roll[1]-12,13,7,'sun',.65);oval(H,R,roll[0],roll[1]-12,6,3,'paper',1);H.line(R,[[roll[0]+12,roll[1]-8],[roll[0]+28,roll[1]+1],[roll[0]+22,roll[1]+7]],'sun',5);
  const knife=H.p(4.25,10.43,.99);H.line(R,[[knife[0]-12,knife[1]-7],[knife[0]+4,knife[1]+2]],'teal',5);shape(H,R,[[knife[0]+2,knife[1]-1],[knife[0]+13,knife[1]+3],[knife[0]+4,knife[1]+4]],'blue',.6);
  for(const x of [3.93,4.56]){const q=H.p(x,9.51,1.01);H.outline(R,ell(...q,6,4),'blue',2);H.line(R,[[q[0],q[1]-4],[q[0],q[1]+4]],'sun',1.5);}
  const wrap=H.tile(3.5,10.55,1.42,.22,1.0);surface(H,R,wrap,'paper',1);H.line(R,[H.p(3.55,10.67,1.02),H.p(4.78,10.67,1.02)],'coral',1.1);
}
const room=world('cape-town-delivery-bicycle','The carrier closes flat',{wall:false,floor:'paper',tone:.7,head:45},(H,R)=>{
  masonry(H,R,'nw',0,11.7,0,4.4,'paper',.85);masonry(H,R,'ne',0,12,0,4.2,'coral',.23);
  archedBay(H,R,'nw',1.0,7.3,.25,3.5,'teal',P=>{surface(H,R,[P(0,0),P(7.3,0),P(7.3,4.3),P(0,4.3)],'sun',.16);for(let n=0;n<7;n++)surface(H,R,[P(n,.05),P(n+.6,.05),P(n+.6,1.2+n%3*.45),P(n,1.2+n%3*.45)],'teal',.17,.5);});
  for(let n=0;n<10;n++)surface(H,R,H.tile(.3+n*1.12,10.8,1,.84,.03),'teal',n%2?.13:.22,.5);
  for(let j=1;j<11;j+=2.0)H.line(R,[H.p(0,j,.01),H.p(12,j,.01)],'blue',.6,{tone:.3});
  for(let n=0;n<4;n++) {const x=8.2+n*.75;H.line(R,[H.p(x,.22,3.7),H.p(x,.22,4.0)],'blue',3);}
  dispatchCabinet(H,R);
  hangingRail(H,R,'ne',1.0,4.8,3.4,4,(P,u,n)=>{if(n===0){const p=P(u,-.32);oval(H,R,p[0],p[1],13,9,'sun',.65);for(let k=0;k<4;k++)stroke(H,R,[[p[0]-9+k*5,p[1]+4],[p[0]-6+k*4,p[1]-7]],'blue',.65);}else if(n===1){H.line(R,[P(u,-.2),P(u,-1.4)],'blue',4);H.line(R,[P(u-.15,-.2),P(u+.15,-.2)],'coral',3);}else{shape(H,R,[P(u-.28,-.2),P(u+.27,-.2),P(u+.35,-.94),P(u-.32,-.95)],n===2?'coral':'teal',.47,.7);for(let k=0;k<3;k++)H.line(R,[P(u-.2+k*.18,-.3),P(u-.2+k*.18,-.8)],'paper',.7);}});
  const toy=H.p(5.3,.45,3.67);for(const x of [-11,11])oval(H,R,toy[0]+x,toy[1],6,6,'sun',.5);H.line(R,[[toy[0]-11,toy[1]],[toy[0]-3,toy[1]-11],[toy[0]+4,toy[1]],[toy[0]-11,toy[1]],[toy[0]+9,toy[1]-10],[toy[0]+11,toy[1]]],'coral',1.5);timber(H,R,4.6,.3,1.5,.55,3.45,.1,'sun');
  recessedFrame(H,R,'ne',.8,4.85,.52,1.02,'teal',P=>{
    for(let n=0;n<4;n++){const q=P(.55+n*1.18,.18);shape(H,R,[[q[0]-8,q[1]],[q[0]+8,q[1]],[q[0]+8,q[1]-13],[q[0]-8,q[1]-13]],n===1?'coral':'paper',n===1?.65:1);H.line(R,[[q[0]-4,q[1]-7],[q[0]+4,q[1]-7]],'sun',1.6);if(n===2)stroke(H,R,[[q[0]+8,q[1]-2],[q[0]+15,q[1]+6],[q[0]+20,q[1]-4]],'blue',.9);}
  });
  const spare=H.p(.62,3.15,1.77);H.outline(R,ell(...spare,26,39),'blue',4);H.outline(R,ell(...spare,23,35),'paper',1);H.line(R,[H.p(.3,3.15,2.8),H.p(.76,3.15,2.8)],'sun',3);
  for(let n=0;n<3;n++){const y=1.25+n*2.25;timber(H,R,.14,y,.2,.14,3.76,.53,'teal');bentTube(H,R,[[.2,y,3.95],[1.1,y,4.2]],2,'teal');}
  surface(H,R,[H.p(.18,1,4.27),H.p(.18,7.7,4.27),H.p(1.28,7.7,4.1),H.p(1.28,1,4.1)],'paper',.85);
  for(let n=0;n<5;n++)H.line(R,[H.p(.2,1.35+n*1.32,4.28),H.p(1.25,1.35+n*1.32,4.12)],n%2?'coral':'teal',5,{tone:.3});
  floorShadow(H,1.55,5.2,8.1,2.1,.18);frame(H,R);
  packingBench(H,R);
  benchFrame(H,R,9.6,8.3,1.45,1.1,.6,'coral');box(H,R,10.05,8.5,.36,.36,.61,.8,'teal',.64);const clip=H.p(10.75,8.8,.62);H.outline(R,ell(clip[0],clip[1],5,4),'blue',1.5);H.line(R,[H.p(9.65,9.05,.7),H.p(10.0,9.05,.7)],'sun',3);
  const bag=H.p(10.18,9.7,.02);shape(H,R,[[bag[0]-18,bag[1]],[bag[0]+18,bag[1]],[bag[0]+15,bag[1]-28],[bag[0]-14,bag[1]-28]],'teal',.62);surface(H,R,[[bag[0]-14,bag[1]-29],[bag[0]+15,bag[1]-29],[bag[0]+11,bag[1]-42],[bag[0]-10,bag[1]-43]],'teal',.4);H.line(R,[[bag[0]-9,bag[1]-42],[bag[0]+10,bag[1]-41]],'sun',2);for(const dx of [-9,9]){H.line(R,[[bag[0]+dx,bag[1]-24],[bag[0]+dx,bag[1]-2]],'coral',3);shape(H,R,[[bag[0]+dx-3,bag[1]-14],[bag[0]+dx+3,bag[1]-14],[bag[0]+dx+3,bag[1]-9],[bag[0]+dx-3,bag[1]-9]],'paper',1);}
  const brush=H.p(10.86,10.47,.03);shape(H,R,[[brush[0]-8,brush[1]-5],[brush[0]+8,brush[1]-5],[brush[0]+8,brush[1]],[brush[0]-8,brush[1]]],'sun',.6);for(let n=0;n<6;n++)H.line(R,[[brush[0]-7+n*3,brush[1]],[brush[0]-7+n*3,brush[1]+4]],'blue',.8);
  taskLight(H,R,10.0,1.7,3.85,'coral',.8);bentTube(H,R,[[1,.15,4.37],[11.8,.15,4.37],[11.8,.15,3.9]],2.5,'teal');
},(H,R,t)=>{
  const u=cycle(t,16)*16,open=ease(3.2,6.4,u)*(1-ease(10.5,14,u)),angle=open*Math.PI/2;
  const i=1.8,j=5.1,w=3.05,d=1.66,z=2.0,h=.83;
  surface(H,R,H.tile(i,j,w,d,z),'coral',.23);for(let n=0;n<7;n++)H.line(R,[H.p(i+.1+n*.42,j+.1,z+.015),H.p(i+.1+n*.42,j+d-.1,z+.015)],'paper',1.1);H.line(R,[H.p(i,j+d*.5,z+.02),H.p(i+w,j+d*.5,z+.02)],'teal',1);
  const panels=[];for(const [edge,sign] of [[j,-1],[j+d,1]]){const outside=edge+sign*h*Math.cos(angle);panels.push([H.p(i,edge,z),H.p(i+w,edge,z),H.p(i+w,outside,z+h*Math.sin(angle)),H.p(i,outside,z+h*Math.sin(angle))]);}
  for(const p of panels){surface(H,R,p,'sun',.65);H.line(R,[blend(p[0],p[3],.16),blend(p[2],p[1],.16)],'teal',2);for(const f of [.08,.91]){const q=blend(p[0],p[1],f);H.line(R,[q,blend(q,blend(p[3],p[2],f),.22)],'blue',3);H.dot(...q,1.2,'sun');}for(let n=1;n<5;n++)H.line(R,[blend(p[0],p[1],n/5),blend(p[3],p[2],n/5)],'coral',.65);H.line(R,[p[3],p[2]],'paper',1.3);for(const k of [.18,.8])H.line(R,[blend(p[0],p[1],k),blend(p[3],p[2],k)],'blue',1);}
  for(const [edge,sign]of[[i,-1],[i+w,1]]){const out=edge+sign*h*Math.cos(angle),p=[H.p(edge,j,z+.03),H.p(edge,j+d,z+.03),H.p(out,j+d,z+h*Math.sin(angle)+.03),H.p(out,j,z+h*Math.sin(angle)+.03)];surface(H,R,p,'sun',.55);H.line(R,[p[3],p[2]],'paper',1.4);}
  for(const p of panels){const a=blend(p[3],p[2],.42),b=blend(p[3],p[2],.61);H.line(R,[[a[0],a[1]+4],[b[0],b[1]+4]],'blue',3.5);H.line(R,[[a[0],a[1]+4],[b[0],b[1]+4]],'paper',1.4);}
  for(const x of [2.1,3.9])metal(H,R,x,6.65,.18,.18,1.98,.11,x===2.1?'coral':'blue');
  const latch=H.p(i+w,j+d,z+h*Math.sin(angle));H.line(R,[latch,[latch[0]+6,latch[1]+(open>.94?5:-4)]],'blue',2);H.dot(...latch,2.2,'sun');
  const body=H.p(5.0,6.45,0);courier(H,R,...body,panels[1][2],latch,open);
  const grip=H.p(8.1,6.3,2.85),helper=H.p(8.2,4.9,0);courier(H,R,...helper,grip,[grip[0]+11,grip[1]+2],open*.4);
  const strap=[H.p(1.75,6.3,2),H.p(2.7,6.95,1.85+open*.4),H.p(3.8,6.9,1.92)];stroke(H,R,strap,'coral',4);stroke(H,R,strap,'sun',.9,.75);
});
room.loopSeconds=16;
room.stillTime=8.0;
export default room;
