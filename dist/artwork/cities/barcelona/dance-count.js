import { world, box, shape, oval, stroke, ell, cycle, wallPt, wallRect } from '../../worlds/common.js';
import { timber, metal, benchFrame, drape, floorLight, slattedSeat } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';
import { windowBay, hangingRail, wallRack } from '../joinery.js';

const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};

function shoe(H,R,i,j,z,ink='paper',patch='coral'){
  const [x,y]=H.p(i,j,z);shape(H,R,[[x-10,y+2],[x+9,y+2],[x+12,y-2],[x+3,y-7],[x-7,y-6]],ink,ink==='paper'?1:.7,.7);
  H.line(R,[[x-9,y+3],[x+9,y+3]],'blue',1.5);shape(H,R,[[x-6,y+1],[x-2,y+1],[x-2,y+4],[x-6,y+4]],patch,.7,.4);
  for(let n=0;n<3;n++)H.line(R,[[x-1+n*2,y-5],[x-4+n*2,y-2]],'blue',.6);
}

function chair(H,R,i,j,ink='sun'){
  for(const x of [i,i+1.06]) {stroke(H,R,[H.p(x,j,.02),H.p(x,j+.88,.83),H.p(x,j+.96,1.54)],'teal',2.6);stroke(H,R,[H.p(x,j+.97,.02),H.p(x,j+.16,.83)],'teal',2.6);H.dot(...H.p(x,j+.48,.43),2,'coral');}
  for(let n=0;n<4;n++)timber(H,R,i-.06,j+.14+n*.18,1.18,.15,.73,.07,ink);
  for(let n=0;n<3;n++)timber(H,R,i-.06,j+.92,1.18,.09,1.03+n*.17,.12,ink);
}

function dancer(H,R,position,shift,hands,ink,index){
  const [x,y]=H.p(...position), dx=shift*12, lean=shift*(index===1?2:4), P=(a,b)=>[x+a+dx,y+b];
  H.tint(ell(x+dx+2,y+2,19,5),'blue',.14);
  for(const s of [-1,1]){const fx=x+s*8+(s===1?shift*23:0), fy=y-(s===1?Math.sin(shift*Math.PI)*3:0);stroke(H,R,[P(s*5,-31),[x+s*6+dx*.4,y-15],[fx,fy-2]],'blue',7);oval(H,R,fx+3,fy-1,7,2.5,'paper',1);H.line(R,[[fx-3,fy+1],[fx+9,fy+1]],'blue',1.2);}
  shape(H,R,[P(-11+lean,-58),P(10+lean,-58),P(12,-29),P(-11,-29)],ink,.67);
  H.line(R,[P(-9,-33),P(10,-33)],'paper',1.1);
  for(let n=0;n<2;n++){const a=P((n?10:-10)+lean,-54),b=hands[n];stroke(H,R,[a,[(a[0]+b[0])/2,(a[1]+b[1])/2+4],b],ink,6);oval(H,R,...b,2.6,2.3,'paper',1);}
  oval(H,R,...P(lean,-70),9,10,'paper',1);shape(H,R,[P(-9+lean,-70),P(-8+lean,-78),P(lean,-83),P(8+lean,-77),P(10+lean,-70),P(2+lean,-75)],index===2?'sun':'blue',.8,.7);
  H.dot(...P(lean+4,-69),1,'blue');stroke(H,R,[P(lean+2,-63),P(lean+5,-62),P(lean+7,-64)],'blue',.6);
}

const room=world('barcelona-dance-count','The circle leaves a gap',{floor:'paper',tone:.83,wall:'paper',wallTone:.81,height:3.45,head:26},(H,R)=>{
  boardFloor(H,R,.65,.65,10.65,10.65,.025,'sun',.56);
  for(let n=0;n<12;n++)for(const side of [0,1]){
    const i=side?.1:n,j=side?n:.1;shape(H,R,H.tile(i,j,side?.45:.8,side?.8:.45,.04),'teal',.42,.55);
    const p=H.p(i+(side?.23:.4),j+(side?.4:.23),.05);shape(H,R,[[p[0]-5,p[1]],[p[0],p[1]-3],[p[0]+5,p[1]],[p[0],p[1]+3]],'paper',1,.45);
  }
  windowBay(H,R,'nw',1.2,7.1,2.12,1.05,{ink:'teal',divisions:6});
  for(const side of ['ne','nw']) {H.line(R,[wallPt(H,side,.1,.14,-.09),wallPt(H,side,11.9,.14,-.09)],'teal',4);H.line(R,[wallPt(H,side,.1,.2,-.1),wallPt(H,side,11.9,.2,-.1)],'paper',1);}
  cabinetFrame(H,R,5.1,.3,6.28,1.06,.05,2.84,4,'teal',(i,j,w,d,z,h,n)=>{
    for(const level of [z+.03,z+.52]){timber(H,R,i,j,w,d,level,.07,'sun');shoe(H,R,i+.43,j+.45,level+.08,'paper',n%2?'teal':'coral');shoe(H,R,i+.91,j+.49,level+.08,'paper',n%2?'coral':'sun');}
    if(n<3){shape(H,R,H.faceI(i+.07,j+d,w-.17,z+1.23,z+2.6),n===1?'sun':'teal',.35,.75);H.line(R,[H.p(i+w-.27,j+d+.01,z+1.85),H.p(i+w-.27,j+d+.01,z+2.11)],'blue',2);for(let k=0;k<3;k++)H.line(R,[H.p(i+.21,j+d+.02,z+2.29+k*.06),H.p(i+w-.28,j+d+.02,z+2.29+k*.06)],'blue',.7);}
    else {drape(H,R,i+.15,j+.18,w-.32,.64,z+1.33,.35,'coral');box(H,R,i+.25,j+.21,w-.5,.52,z+2.1,.3,'sun',.55);}
  });
  slattedSeat(H,R,5.22,1.69,5.75,.02,'sun',.52);
  box(H,R,7.61,2.11,.55,.48,.01,.25,'coral',.55);
  hangingRail(H,R,'ne',.75,3.67,2.65,4,(P,u,n)=>{const p=P(u,-.16);if(n<2){stroke(H,R,[[p[0]-5,p[1]],[p[0]-10,p[1]+14],[p[0]-2,p[1]+29],[p[0]+7,p[1]+14],[p[0]+4,p[1]]],n?'sun':'coral',4);}else {shape(H,R,[[p[0]-9,p[1]+3],[p[0]+9,p[1]+3],[p[0]+10,p[1]+23],[p[0]-10,p[1]+23]],n===2?'teal':'paper',.7);stroke(H,R,[[p[0]-6,p[1]+4],[p[0]-4,p[1]-4],[p[0]+4,p[1]-4],[p[0]+6,p[1]+4]],'blue',1.2);}});
  shape(H,R,wallRect(H,'nw',8.93,11.23,.64,2.93,-.14),'sun',.6,1);shape(H,R,wallRect(H,'nw',9.1,11.06,.81,2.76,-.17),'paper',1,.7);
  for(let n=0;n<3;n++)H.line(R,[wallPt(H,'nw',9.27+n*.42,.97,-.19),wallPt(H,'nw',9.83+n*.42,2.59,-.19)],'teal',1.1,{tone:.38});
  for(const p of [1.3,4.4,7.5]){H.line(R,[wallPt(H,'nw',p,1.29,-.17),wallPt(H,'nw',p,1.29,-.52)],'blue',2.5);H.line(R,[wallPt(H,'nw',p,1.29,-.52),wallPt(H,'nw',p,1.04,-.17)],'blue',1.5);}
  H.line(R,[wallPt(H,'nw',.8,1.32,-.52),wallPt(H,'nw',8.13,1.32,-.52)],'sun',5);H.line(R,[wallPt(H,'nw',.8,1.36,-.52),wallPt(H,'nw',8.13,1.36,-.52)],'paper',1.2);
  wallRack(H,R,'ne',5.1,6.28,3.0,.42,1,'sun',(P,z)=>{for(let n=0;n<4;n++){const p=P(.6+n*1.35,z+.03);shape(H,R,[[p[0]-8,p[1]],[p[0]+8,p[1]],[p[0]+8,p[1]-8],[p[0]-8,p[1]-8]],n%2?'paper':'teal',.8,.5);}const p=P(5.9,z+.1);H.line(R,[[p[0]-11,p[1]],[p[0]+10,p[1]-9]],'blue',3);for(let k=0;k<4;k++)H.dot(p[0]-7+k*4,p[1]-2-k*1.8,1.1,'sun');});
  floorLight(H,6.1,6.5,186,.29);
  const ring=Array.from({length:65},(_,n)=>{const a=-Math.PI*.1+n*Math.PI*1.65/64;return H.p(6.2+Math.cos(a)*3.35,6.1+Math.sin(a)*3.03,.043);});
  H.line(R,ring,'teal',2.6,{tone:.5});H.line(R,ring.map(([x,y])=>[x,y+2]),'sun',1.1);
  for(let n=0;n<7;n++){const a=.4+n*.57, i=6.2+Math.cos(a)*3.23,j=6.1+Math.sin(a)*2.94;shape(H,R,H.tile(i,j,.3,.3,.05),n===3?'coral':'paper',n===3?.55:1,.55);if(n===3)H.line(R,[H.p(i+.04,j+.05,.055),H.p(i+.26,j+.25,.055)],'sun',1);}
  chair(H,R,1.3,7.2);chair(H,R,2.02,9.13,'coral');chair(H,R,9.9,4.38);chair(H,R,9.8,7.4,'sun');
  box(H,R,.78,5.37,1.17,.93,.53,.56,'teal',.65);timber(H,R,.6,5.17,1.53,1.28,.46,.12,'sun');for(const j of [5.33,6.22])metal(H,R,.79,j,.1,.1,.02,.44,'blue');
  for(const z of [.69,.98]){const p=H.p(1.35,6.31,z);oval(H,R,...p,7,6,'blue',.75);oval(H,R,...p,3.5,3,'paper',.6);}
  H.line(R,[H.p(1.2,5.1,.05),H.p(1.2,4.4,.05),H.p(.16,4.4,.05)],'blue',1.1);
  const fan=H.p(10.8,3.12,.73);H.line(R,[[fan[0],fan[1]+20],[fan[0],fan[1]]],'blue',2.6);oval(H,R,fan[0],fan[1]+20,10,3,'teal',.65);oval(H,R,...fan,15,16,'paper',.9);for(let n=0;n<12;n++){const a=n*Math.PI/6;H.line(R,[[fan[0],fan[1]],[fan[0]+Math.cos(a)*14,fan[1]+Math.sin(a)*15]],'teal',.55);}H.dot(...fan,3,'coral');
  benchFrame(H,R,6.8,9.58,2.56,1.13,.53,'sun');
  const drum=H.p(7.42,10.02,.57);shape(H,R,[[drum[0]-18,drum[1]-19],[drum[0]+18,drum[1]-19],[drum[0]+15,drum[1]+2],[drum[0]-15,drum[1]+2]],'coral',.62);oval(H,R,drum[0],drum[1]-19,18,6,'paper',1);oval(H,R,drum[0],drum[1]+1,15,4,'sun',.45);for(let n=0;n<6;n++)H.line(R,[[drum[0]-15+n*6,drum[1]-17],[drum[0]-12+n*5,drum[1]+1]],n===2?'teal':'paper',1.1);
  for(let n=0;n<2;n++)timber(H,R,8.15+n*.3,9.85,.14,.56,.57,.09,'sun');
  shape(H,R,H.tile(8.9,9.9,.36,.7,.58),'coral',.55,.6);for(let n=0;n<4;n++)H.line(R,[H.p(9.08,10.54,.6),H.p(8.93+n*.09,9.94,.6)],'sun',.75);
  shoe(H,R,3.34,10.17,.05,'paper','teal');shoe(H,R,3.78,10.34,.05,'paper','coral');
  stroke(H,R,[H.p(10.88,8.87,.05),H.p(10.88,8.75,1.68),H.p(10.64,8.75,1.79),H.p(10.48,8.75,1.65)],'sun',3);
  drape(H,R,10.03,7.65,.75,.63,.84,.27,'paper');
},(H,R,t)=>{
  const u=cycle(t,20)*20, shifts=[0,.15,.45].map(delay=>ease(4+delay,8+delay,u)*(1-ease(12,18,u)));
  const at=[[3.8,5.8],[5.2,4.8],[6.6,3.8]],p=at.map((q,n)=>{const a=H.p(...q);return [a[0]+shifts[n]*12,a[1]-56];});
  const joins=[[ (p[0][0]+p[1][0])/2,(p[0][1]+p[1][1])/2 ],[(p[1][0]+p[2][0])/2,(p[1][1]+p[2][1])/2]];
  dancer(H,R,at[0],shifts[0],[[p[0][0]-29,p[0][1]+9],joins[0]],'coral',0);
  dancer(H,R,at[1],shifts[1],[joins[0],joins[1]],'teal',1);
  dancer(H,R,at[2],shifts[2],[joins[1],[p[2][0]+29,p[2][1]+9]],'sun',2);
  for(const q of joins)oval(H,R,...q,3,2.5,'paper',1);
  const s=wallPt(H,'ne',1.6,2.46,-.3);stroke(H,R,[s,[s[0]+4+Math.sin(t*Math.PI*2/20)*2,s[1]+13],[s[0]+2,s[1]+25]],'coral',2.4);
  const f=H.p(9.07,10.54,.61);stroke(H,R,[f,[f[0]+6,f[1]+5],[f[0]+9+Math.sin(t*Math.PI*2/20),f[1]+4]],'teal',1);
});
room.loopSeconds=20;
room.stillTime=2;
export default room;
