import { world, actor, shape, oval, stroke, ell, wallPt, cycle } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, drape, benchFrame, pendant, bentTube } from '../materials.js';
import { masonry, archedBay, cabinetFrame } from '../structure.js';
import { hangingRail, floorShadow, panelFront } from '../joinery.js';

const smooth=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
const base=FIGURES.sample('hold',0);
FIGURES.clips['istanbul-bread-baker']={dur:20,keys:[[0,{...base,head:12}],[.2,{...base,head:12}],[.4,{...base,ar:132,er:28,head:6}],[.6,{...base,ar:132,er:28,head:6}],[.9,{...base,head:12}],[1,{...base,head:12}]]};

function ring(H,R,x,y,r=12){
  oval(H,R,x,y,r,r*.53,'sun',.87);
  oval(H,R,x,y,r*.47,r*.23,'blue',.62);
  for(let n=0;n<16;n++){const a=n*Math.PI/8;H.line(R,[[x+Math.cos(a)*r*.76,y+Math.sin(a)*r*.39],[x+Math.cos(a+.08)*r*.87,y+Math.sin(a+.08)*r*.45]],'paper',1.1);}
  H.line(R,[[x-r*.6,y+r*.35],[x-r*.25,y+r*.46]],'coral',1.4);
}

function weave(H,R,x,y,w,h,top=false){
  const edge=ell(x,y,w,h,40);
  shape(H,R,edge,'sun',.55,.95);
  H.clip(edge,()=>{
    for(let n=-w;n<w;n+=5) H.line(R,[[x+n,y-h],[x+n+9,y+h]],'coral',.75);
    for(let n=-h;n<h;n+=4) stroke(H,R,[[x-w,y+n],[x,y+n+2],[x+w,y+n]],'paper',1.05);
  });
  H.outline(R,edge,'blue',1.8);
  if(top){stroke(H,R,[[x-5,y-3],[x-3,y-11],[x+5,y-11],[x+7,y-4]],'blue',2);}
}

function basket(H,R,x,y,turn){
  shape(H,R,[[x-48,y-6],[x+48,y-6],[x+39,y+23],[x-39,y+23]],'sun',.65,.9);
  for(let n=0;n<14;n++) stroke(H,R,[[x-44+n*6.6,y-4],[x-41+n*6.2,y+8],[x-37+n*5.7,y+22]],'blue',.6);
  for(let n=0;n<5;n++) stroke(H,R,[[x-45+n*.9,y+1+n*4.2],[x,y+7+n*4.2],[x+45-n*.9,y+1+n*4.2]],'paper',1);
  oval(H,R,x,y-5,48,21,'sun',.75);oval(H,R,x,y-5,43,17,'blue',.53);
  shape(H,R,[[x-34,y-13],[x-10,y-19],[x+29,y-13],[x+37,y+2],[x+6,y+17],[x-30,y+9]],'paper',1,.6);
  for(const [a,b,r] of [[-25,-10,11],[-2,-15,13],[23,-9,12],[-15,0,14],[12,4,14]])ring(H,R,x+a+turn*2,y+b,r);
  stroke(H,R,[[x-47,y-3],[x-34,y+11],[x,y+18],[x+34,y+11],[x+47,y-3]],'sun',4.3);
  for(let k=0;k<7;k++) H.line(R,[[x-31+k*1.7,y+10],[x-33+k*1.7,y+15]],'paper',.9);
  H.dot(x+7,y+15,1.1,'sun');
}

const room=world('istanbul-bread-ring','A ring in the basket',{wall:'paper',wallTone:.85,height:4.1,floor:'paper',tone:.6,head:42},(H,R)=>{
  for(let j=0;j<12;j+=1.3)for(let i=0;i<12;i+=1.65)shape(H,R,H.tile(i+.025,j+.025,1.57,1.22,.02),(Math.floor(i+j)%4===0?'sun':'paper'),.3,.55);
  masonry(H,R,'nw',.15,7.3,.03,4.05,'coral',.27);
  archedBay(H,R,'nw',1.1,5.1,.65,2.75,'blue',P=>{
    shape(H,R,[P(0,0),P(5.2,0),P(5.2,3),P(0,3)],'blue',.9,.5);
    shape(H,R,[P(.7,.3),P(4.4,.3),P(4.05,1.7),P(1.02,1.7)],'coral',.35,.4);
    for(let n=0;n<5;n++)H.line(R,[P(.75,.43+n*.23),P(4.35,.43+n*.23)],'sun',.75,{tone:.5});
  });
  timber(H,R,.15,.65,.95,6.15,.54,.17,'sun');
  for(let n=0;n<4;n++)metal(H,R,.6,1.3+n*1.1,.7,.85,.76,.055,'blue');
  cabinetFrame(H,R,7.15,.45,4.35,1.55,.1,3.55,2,'teal',(x,y,w,d,z,h,col)=>{
    for(const h0 of [.78,1.55,2.28]) timber(H,R,x,y,w,d,z+h0,.09,'sun');
    if(col===0){
      for(let k=0;k<4;k++)metal(H,R,x+.12,y+.14,w-.25,d-.22,z+.19+k*.12,.055,'blue');
      drape(H,R,x+.13,y+.15,w-.3,d-.23,z+.89,.25,'paper');
      for(let k=0;k<3;k++)timber(H,R,x+.1+k*.48,y+.3,.36,.8,z+1.69,.45,'sun');
      weave(H,R,...H.p(x+.9,y+.8,z+2.49),25,11,true);
    }else{
      metal(H,R,x+.1,y+.1,w-.22,d-.15,z,.7,'paper');
      const [a,b]=H.p(x+.7,y+d,z+.43);H.line(R,[[a-9,b],[a+9,b]],'blue',2);
      vessel(H,R,x+.65,y+.6,z+.9,13,17,'sun');
      for(let k=0;k<8;k++)timber(H,R,x+.12+k*.18,y+.2,.11,.82,z+1.72,.5,'paper');
      ring(H,R,...H.p(x+.8,y+.6,z+2.43),14);
    }
  });
  hangingRail(H,R,'ne',2.1,4.25,3.65,4,(P,u,n)=>{
    const [x,y]=P(u,-.15);H.line(R,[[x,y],[x,y+25+n*3]],'blue',2);
    if(n<2){oval(H,R,x,y+34,10,14,'sun',.6);H.line(R,[[x-5,y+31],[x+5,y+38]],'coral',.7);}
    else {H.line(R,[[x,y+12],[x-7,y+33]],'sun',3);H.line(R,[[x,y+12],[x+7,y+33]],'sun',3);}
  });
  floorShadow(H,2.5,4.25,5.65,3.1,.19);
  benchFrame(H,R,2.25,4.05,5.65,2.9,1.23,'sun');
  timber(H,R,2.38,4.19,5.4,2.62,.4,.1,'sun');
  for(let n=0;n<3;n++){weave(H,R,...H.p(3.1+n*1.65,5.35,.5),24,12);}
  panelFront(H,R,2.3,6.94,5.55,.5,.49,4,'teal');
  timber(H,R,2.16,3.98,5.85,3.07,1.2,.18,'sun');
  drape(H,R,2.5,4.35,1.45,2.43,1.39,.44,'paper');
  for(let n=0;n<4;n++)H.line(R,[H.p(2.7+n*.24,4.47,1.4),H.p(2.7+n*.24,6.72,1.4)],'coral',.7);
  const [tx,ty]=H.p(7.2,5.05,1.41);H.line(R,[[tx-11,ty-3],[tx+9,ty+8]],'sun',3);H.line(R,[[tx-11,ty-3],[tx+15,ty+4]],'sun',3);H.dot(tx-10,ty-3,2,'blue');H.dot(tx-10,ty-3,.8,'paper');
  vessel(H,R,6.96,6.45,1.4,13,5,'paper');
  const [sx,sy]=H.p(6.96,6.45,1.4);for(let k=0;k<14;k++)H.line(R,[[sx-9+k%5*4,sy-5+Math.floor(k/5)*2],[sx-7+k%5*4,sy-4+Math.floor(k/5)*2]],'sun',.8);
  benchFrame(H,R,9.25,5.2,1.9,3.8,1.03,'teal');
  timber(H,R,9.35,5.45,1.7,2.75,1.03,.1,'paper');
  metal(H,R,9.65,6.15,.6,.75,1.14,.05,'blue');
  timber(H,R,9.8,5.92,.32,.15,1.2,.18,'sun');
  drape(H,R,9.45,7.45,1.35,1.12,1.15,.7,'paper');
  for(let k=0;k<4;k++)shape(H,R,H.tile(9.3+k*.03,5.23+k*.06,1.32,.6,1.13+k*.035),'paper',1,.5);
  benchFrame(H,R,2,9.5,2.8,1.15,.63,'teal');
  oval(H,R,...H.p(3.2,10,.67),22,10,'paper',1);ring(H,R,...H.p(3.2,10,.72),12);
  const [bx,by]=H.p(4.1,10,.67);shape(H,R,[[bx-10,by],[bx+12,by],[bx+9,by-22],[bx-8,by-23]],'paper',1,.6);H.line(R,[[bx-8,by-17],[bx+10,by-16]],'coral',.8);
  pendant(H,R,5.2,3.3,4.5,3.2,'sun',.82);
  H.light(...H.p(5.2,5.6,0),147,70,.24);
},(H,R,t)=>{
  const u=cycle(t,20)*20,open=smooth((u-4)/4)*(1-smooth((u-12)/6));
  const [x,y]=H.p(5.7,4.7,1.48);basket(H,R,x,y,open);
  const cut=[H.p(2.1,4.03,1.65),H.p(8.1,4.03,1.65),[500,-500],[-500,-500]];
  H.clip(cut,()=>actor(H,R,5.2,3.25,t,'istanbul-bread-baker',{shirt:['paper',1],apron:['teal',.7],hairStyle:'cap',face:'sw',prop:(HH,RR,p)=>{
    const cx=x-open*45,cy=y-10-open*26;
    weave(HH,RR,cx,cy,46,18-open*8,true);
    stroke(HH,RR,[p.rhand,[cx+42,cy+2]],'coral',2.5);
  }},0,1.5));
  const cx=x-open*45,cy=y-10-open*26;
  weave(H,R,cx,cy,46,18-open*8,true);
  actor(H,R,8.05,8.05,cycle(t,20)*4,'think',{shirt:['coral',.65],hairStyle:'pony',face:'sw'},0,1.48);
});
room.loopSeconds=20;
room.stillTime=10;
export default room;
