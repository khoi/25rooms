import { world, actor, shape, oval, stroke, ell, cycle, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, drape, benchFrame, bentTube, vessel, caneChair } from '../materials.js';
import { boardFloor, cabinetFrame } from '../structure.js';
import { windowBay, wallRack, recessedFrame, taskLight, panelFront, caster, floorShadow } from '../joinery.js';

const smooth=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
const base=FIGURES.sample('hold',0);
FIGURES.clips['istanbul-record-inspect']={dur:18,keys:[[0,{...base,ar:55,er:45,head:14}],[.2,{...base,ar:55,er:45,head:14}],[.4,{...base,ar:132,er:32,head:4}],[.6,{...base,ar:135,er:30,head:8}],[.89,{...base,ar:55,er:45,head:14}],[1,{...base,ar:55,er:45,head:14}]]};

function record(H,R,x,y,r,ratio=.48,turn=0){
  oval(H,R,x,y,r,r*ratio,'blue',.91);
  for(let n=0;n<5;n++)H.outline(R,ell(x,y,r-3-n*2,(r-3-n*2)*ratio),'paper',.45,{tone:.29});
  oval(H,R,x,y,r*.28,r*.28*ratio,'coral',.8);H.dot(x,y,1.2,'paper');
  const a=turn+.2;H.clip(ell(x,y,r,r*ratio),()=>shape(H,R,[[x,y],[x+Math.cos(a)*r*1.1,y+Math.sin(a)*r*ratio*1.1],[x+Math.cos(a+.31)*r*1.1,y+Math.sin(a+.31)*r*ratio*1.1]],'paper',.38,.2));
}

function sleeve(H,R,P,x,z,w,h,ink,design=0){
  shape(H,R,[P(x,z),P(x+w,z),P(x+w,z+h),P(x,z+h)],ink,ink==='paper'?1:.7,.55);
  const [cx,cy]=P(x+w*.5,z+h*.48);
  if(design%3===0){oval(H,R,cx,cy,w*11,h*8,'paper',.76);oval(H,R,cx,cy,w*4,h*3,'coral',.8);}
  else if(design%3===1)shape(H,R,[P(x+w*.15,z+h*.2),P(x+w*.85,z+h*.3),P(x+w*.45,z+h*.84)],'sun',.78,.45);
  else for(let n=0;n<3;n++)H.line(R,[P(x+w*.18,z+h*(.25+n*.21)),P(x+w*.82,z+h*(.35+n*.21))],'paper',1.2);
}

function bins(H,R,i,j,w,d,z){
  timber(H,R,i,j,w,d,z,.12,'sun');
  for(const x of [i,i+w-.13])timber(H,R,x,j,.13,d,z,.96,'teal');
  timber(H,R,i,j,w,.13,z,1.08,'teal');
  for(let bay=0;bay<3;bay++){
    const x=i+.15+bay*(w-.3)/3,bw=(w-.3)/3-.13;
    if(bay)timber(H,R,x-.09,j,.1,d,z,.93,'sun');
    for(let n=0;n<8;n++){
      const y=j+.25+n*(d-.5)/8,zz=z+.15+n*.042;
      const P=(u,h)=>H.p(x+u,y+.13*h,h+zz);
      sleeve(H,R,P,0,0,bw,.73,['paper','coral','teal','sun'][(n+bay)%4],n+bay);
      H.line(R,[P(.05,.75),P(bw-.05,.75)],'paper',.7);
    }
  }
  timber(H,R,i,j+d-.11,w,.14,z,.37,'teal');
  H.line(R,[H.p(i+.1,j+d+.03,z+.4),H.p(i+w-.1,j+d+.03,z+.4)],'paper',1.2);
}

const room=world('istanbul-record-sleeves','One sleeve catches the light',{wall:'teal',wallTone:.3,height:4.05,floor:'sun',tone:.12,head:48},(H,R)=>{
  boardFloor(H,R,0,0,12,12,.02,'sun',.58);
  windowBay(H,R,'nw',.8,3.7,2.85,.88,{divisions:2,view:P=>{shape(H,R,[P(.1,.1),P(3.6,.1),P(3.6,.45),P(.1,.61)],'coral',.21,.4);}});
  wallRack(H,R,'ne',.65,10.8,1.12,2.65,2,'sun',(P,z,row)=>{
    for(let n=0;n<8;n++)sleeve(H,R,P,.23+n*1.3,z+.07,1.11,.98,['teal','paper','coral','sun'][(n+row)%4],n+row*2);
  });
  for(const p of [1.1,9.7])recessedFrame(H,R,'ne',p,1.3,3.25,.7,'blue',P=>{
    const [x,y]=P(.65,.35);oval(H,R,x,y,12,9,'blue',.96);oval(H,R,x,y,8,6,'teal',.45);H.dot(x,y,3,'blue');
    for(let n=-3;n<=3;n++)H.line(R,[[x-11,y+n*2],[x+11,y+n*2]],'paper',.4,{tone:.4});
  });
  cabinetFrame(H,R,.65,.52,10.72,1.39,.1,.92,6,'teal',(x,y,w,d,z,h,n)=>{
    if(n<4){for(let k=0;k<7;k++)timber(H,R,x+.08+k*.2,y+.08,.12,d-.12,z+.06,.58,['paper','coral','sun','teal'][(n+k)%4]);}
    else{metal(H,R,x+.05,y+.05,w-.1,d-.1,z,.55,n===4?'paper':'teal');H.line(R,[H.p(x+.5,y+d,z+.28),H.p(x+.94,y+d,z+.28)],'blue',2);}
  });
  const [ox,oy]=H.p(.6,5.5,2.2);record(H,R,ox,oy,28,.55);timber(H,R,.35,5.2,.75,1.25,2.15,.07,'sun');
  for(let k=0;k<4;k++)timber(H,R,.55,5.45+k*.17,.24,.1,2.22,.3,['paper','coral','teal','sun'][k]);
  bins(H,R,.8,4.7,5.08,2.65,.73);
  for(const x of [1,5.5])for(const y of [4.9,7.05])timber(H,R,x,y,.18,.18,0,.73,'sun');
  bins(H,R,6.58,2.15,4.83,2.48,.67);
  for(const x of [6.76,11.05])for(const y of [2.35,4.33])timber(H,R,x,y,.18,.18,0,.67,'sun');
  benchFrame(H,R,3.1,7.6,5.5,2.45,1.16,'sun');
  panelFront(H,R,3.2,10.05,5.3,.62,.33,4,'teal');
  drape(H,R,6.75,7.86,1.46,1.78,1.18,.33,'paper');
  const [mx,my]=H.p(7.37,8.65,1.2);oval(H,R,mx,my,31,14,'blue',.35);H.line(R,[[mx-22,my+8],[mx-10,my+11]],'paper',1.2);
  metal(H,R,3.48,7.9,2.8,1.87,1.18,.19,'teal');
  const [tx,ty]=H.p(4.83,8.8,1.4);record(H,R,tx,ty,31,.5,.8);
  bentTube(H,R,[[5.97,8.09,1.41],[5.97,8.09,1.69],[5.72,8.85,1.62],[5.32,9.11,1.51]],1.7,'paper');
  metal(H,R,5.85,8.8,.23,.2,1.41,.15,'sun');
  for(const i of [3.73,5.98])metal(H,R,i,7.91,.24,.22,1.39,.08,'blue');
  const cover=[H.p(3.5,7.96,1.45),H.p(6.28,7.96,1.45),H.p(6.28,7.31,2.56),H.p(3.5,7.31,2.56)];shape(H,R,cover,'paper',.16,.8);H.line(R,[H.p(3.7,7.93,1.58),H.p(4.48,7.43,2.4)],'paper',1.6);
  taskLight(H,R,8.15,7.77,1.24,'coral',-.6);
  const [hx,hy]=H.p(8.46,9.7,1);stroke(H,R,[[hx-13,hy+2],[hx-15,hy-17],[hx,hy-28],[hx+16,hy-15],[hx+13,hy+4]],'blue',4);oval(H,R,hx-12,hy+3,6,9,'coral',.65);oval(H,R,hx+12,hy+3,6,9,'teal',.6);for(let n=-2;n<3;n++)H.line(R,[[hx+10,hy+n*3],[hx+15,hy+n*3]],'paper',.7);
  benchFrame(H,R,.73,9.46,1.7,1.74,.67,'teal');
  drape(H,R,.9,9.63,1.27,1.08,.69,.25,'paper');
  const [bx,by]=H.p(1.3,10,.72);shape(H,R,[[bx-10,by],[bx+11,by+6],[bx+16,by-3],[bx-5,by-9]],'sun',.65,.6);for(let n=0;n<6;n++)H.line(R,[[bx-5+n*3,by],[bx-3+n*3,by+5]],'blue',.7);oval(H,R,bx+18,by+8,7,4,'blue',.6);
  caneChair(H,R,9.8,7.25,'coral');
  metal(H,R,9.82,9.4,1.57,1.57,.34,.09,'teal');metal(H,R,9.82,9.4,1.57,1.57,.99,.09,'teal');for(const i of [9.9,11.22])for(const j of [9.47,10.78]){metal(H,R,i,j,.075,.075,.15,1.16,'teal');caster(H,R,i,j,.12);}
  for(let n=0;n<4;n++)timber(H,R,10.04+n*.29,9.63,.18,1.05,1.1,.63,['coral','sun','paper','teal'][n]);
  vessel(H,R,10.5,10.1,.47,7,15,'teal',false);
  H.light(...H.p(6.8,8.6,0),141,69,.22);
},(H,R,t)=>{
  const [cableX,cableY]=H.p(8.46,9.7,1),sway=Math.sin(t*Math.PI*2/18)*2;
  stroke(H,R,[[cableX+12,cableY+10],[cableX+18+sway,cableY+35],[cableX-6+sway,cableY+45],[cableX+2,cableY+19]],'blue',1);
  const u=cycle(t,18)*18,lift=smooth((u-3.6)/3.6)*(1-smooth((u-10.8)/5.2));
  const counterClip=[H.p(3,7.58,1.3),H.p(8.75,7.58,1.3),[500,-500],[-500,-500]];
  H.clip(counterClip,()=>actor(H,R,7.2,6.72,t,'istanbul-record-inspect',{shirt:['paper',1],apron:['teal',.62],hairStyle:'curly',prop:(HH,RR,p)=>{
    const x=p.chest[0]+25,y=p.chest[1]+25;
    shape(HH,RR,[[x-16,y+17],[x+16,y+17],[x+16,y-13],[x-16,y-13]],'paper',1,.65);
    record(HH,RR,x,y+5-lift*22,14,.92,.4+lift*.9);
    shape(HH,RR,[[x-16,y+17],[x+16,y+17],[x+16,y-5],[x+9,y-8],[x-2,y-6],[x-16,y-8]],'paper',1,.65);
    HH.line(RR,[[x-14,y+14],[x-14,y-5]],'teal',.8);
    shape(HH,RR,[[x-16,y+17],[x-9,y+17],[x-16,y+9]],'coral',.56,.4);
  }},0,1.6));
  actor(H,R,9.15,6.1,cycle(t,18)*4,'think',{shirt:['coral',.7],hairStyle:'pony',face:'sw'},0,1.46);
});
room.loopSeconds=18;room.stillTime=9;
export default room;
