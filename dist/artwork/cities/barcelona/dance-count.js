import { world, box, shape, oval, stroke, ell, cycle, wallPt, wallRect } from '../../worlds/common.js';
import { timber, metal, benchFrame, drape, floorLight, slattedSeat, cushion, vessel, bentTube } from '../materials.js';
import { cabinetFrame, boardFloor } from '../structure.js';
import { windowBay, hangingRail, wallRack, radiator } from '../joinery.js';

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
  for(const side of ['nw','ne']){
    H.line(R,[wallPt(H,side,.05,3.34,-.08),wallPt(H,side,11.95,3.34,-.08)],'teal',4.2);
    H.line(R,[wallPt(H,side,.05,3.4,-.1),wallPt(H,side,11.95,3.4,-.1)],'sun',1.3);
  }
  for(const side of ['nw','ne'])for(let p=.1;p<11.8;p+=1.21){shape(H,R,wallRect(H,side,p,p+1.06,.24,.84,-.1),'teal',.13,.6);H.line(R,[wallPt(H,side,p+.12,.29,-.12),wallPt(H,side,p+.12,.78,-.12)],'paper',1);}
  radiator(H,R,'nw',2.1,2.52,.84);
  bentTube(H,R,[[.14,1.31,.13],[.14,1.31,1.06],[.14,2.05,1.06]],2.1,'teal');
  windowBay(H,R,'nw',1.2,7.1,2.12,1.05,{ink:'teal',divisions:6});
  for(const side of ['ne','nw']) {H.line(R,[wallPt(H,side,.1,.14,-.09),wallPt(H,side,11.9,.14,-.09)],'teal',4);H.line(R,[wallPt(H,side,.1,.2,-.1),wallPt(H,side,11.9,.2,-.1)],'paper',1);}
  cabinetFrame(H,R,5.1,.3,6.28,1.06,.05,2.84,4,'teal',(i,j,w,d,z,h,n)=>{
    for(const level of [z+.03,z+.52]){timber(H,R,i,j,w,d,level,.07,'sun');shoe(H,R,i+.43,j+.45,level+.08,'paper',n%2?'teal':'coral');shoe(H,R,i+.91,j+.49,level+.08,'paper',n%2?'coral':'sun');}
    if(n===2){
      timber(H,R,i,j,w,d,z+1.21,.07,'sun');timber(H,R,i,j,w,d,z+2.16,.08,'sun');
      const p=H.p(i+w*.54,j+.53,z+1.34);shape(H,R,[[p[0]-13,p[1]],[p[0]+14,p[1]],[p[0]+17,p[1]-22],[p[0]-13,p[1]-23]],'coral',.58,.75);stroke(H,R,[[p[0]-8,p[1]-19],[p[0]-7,p[1]-32],[p[0]+9,p[1]-32],[p[0]+10,p[1]-19]],'blue',1.6);H.line(R,[[p[0]-9,p[1]-8],[p[0]+10,p[1]-8]],'sun',1.3);
      drape(H,R,i+.19,j+.24,w-.38,.57,z+2.25,.17,'paper');
      return;
    }
    if(n<3){shape(H,R,H.faceI(i+.07,j+d,w-.17,z+1.23,z+2.6),n===1?'sun':'teal',.35,.75);H.line(R,[H.p(i+w-.27,j+d+.01,z+1.85),H.p(i+w-.27,j+d+.01,z+2.11)],'blue',2);for(let k=0;k<3;k++)H.line(R,[H.p(i+.21,j+d+.02,z+2.29+k*.06),H.p(i+w-.28,j+d+.02,z+2.29+k*.06)],'blue',.7);}
    else {drape(H,R,i+.15,j+.18,w-.32,.64,z+1.33,.35,'coral');box(H,R,i+.25,j+.21,w-.5,.52,z+2.1,.3,'sun',.55);}
  });
  slattedSeat(H,R,5.22,1.69,5.75,.02,'sun',.52);
  for(let n=0;n<3;n++){
    const i=5.43+n*1.78;box(H,R,i,1.85,1.45,.64,.11,.28,'teal',.3);H.line(R,[H.p(i+.56,2.505,.27),H.p(i+.89,2.505,.27)],'sun',2);
  }
  cushion(H,R,9.41,1.76,1.23,.55,.76,.14,'paper');
  const ribbons=H.p(6.56,2.08,.8);for(let n=0;n<3;n++)stroke(H,R,[[ribbons[0]-6+n*5,ribbons[1]],[ribbons[0]-8+n*5,ribbons[1]+9],[ribbons[0]-3+n*5,ribbons[1]+16]],['coral','sun','teal'][n],1.3);
  box(H,R,7.61,2.11,.55,.48,.01,.25,'coral',.55);
  hangingRail(H,R,'ne',.75,3.67,2.65,4,(P,u,n)=>{const p=P(u,-.16);if(n<2){stroke(H,R,[[p[0]-5,p[1]],[p[0]-10,p[1]+14],[p[0]-2,p[1]+29],[p[0]+7,p[1]+14],[p[0]+4,p[1]]],n?'sun':'coral',4);}else {shape(H,R,[[p[0]-9,p[1]+3],[p[0]+9,p[1]+3],[p[0]+10,p[1]+23],[p[0]-10,p[1]+23]],n===2?'teal':'paper',.7);stroke(H,R,[[p[0]-6,p[1]+4],[p[0]-4,p[1]-4],[p[0]+4,p[1]-4],[p[0]+6,p[1]+4]],'blue',1.2);}});
  shape(H,R,wallRect(H,'nw',8.93,11.23,.64,2.93,-.14),'sun',.6,1);shape(H,R,wallRect(H,'nw',9.1,11.06,.81,2.76,-.17),'paper',1,.7);
  for(const p of [9.04,11.09])H.line(R,[wallPt(H,'nw',p,.73,-.2),wallPt(H,'nw',p,2.85,-.2)],'paper',1.2);
  for(const p of [9.0,11.17])for(const z of [.8,2.78])H.dot(...wallPt(H,'nw',p,z,-.22),1.9,'teal');
  H.line(R,[wallPt(H,'nw',8.89,.64,-.21),wallPt(H,'nw',11.27,.64,-.21)],'sun',4.2);
  for(let n=0;n<3;n++)H.line(R,[wallPt(H,'nw',9.27+n*.42,.97,-.19),wallPt(H,'nw',9.83+n*.42,2.59,-.19)],'teal',1.1,{tone:.38});
  for(const p of [1.3,4.4,7.5]){H.line(R,[wallPt(H,'nw',p,1.29,-.17),wallPt(H,'nw',p,1.29,-.52)],'blue',2.5);H.line(R,[wallPt(H,'nw',p,1.29,-.52),wallPt(H,'nw',p,1.04,-.17)],'blue',1.5);}
  H.line(R,[wallPt(H,'nw',.8,1.32,-.52),wallPt(H,'nw',8.13,1.32,-.52)],'sun',5);H.line(R,[wallPt(H,'nw',.8,1.36,-.52),wallPt(H,'nw',8.13,1.36,-.52)],'paper',1.2);
  wallRack(H,R,'ne',5.1,6.28,3.0,.42,1,'sun',(P,z)=>{for(let n=0;n<4;n++){const p=P(.6+n*1.35,z+.03);shape(H,R,[[p[0]-8,p[1]],[p[0]+8,p[1]],[p[0]+8,p[1]-8],[p[0]-8,p[1]-8]],n%2?'paper':'teal',.8,.5);}const p=P(5.9,z+.1);H.line(R,[[p[0]-11,p[1]],[p[0]+10,p[1]-9]],'blue',3);for(let k=0;k<4;k++)H.dot(p[0]-7+k*4,p[1]-2-k*1.8,1.1,'sun');});
  hangingRail(H,R,'ne',.77,3.63,1.56,3,(P,u,n)=>{
    const q=P(u,-.15);
    if(n===1){shape(H,R,[[q[0]-8,q[1]],[q[0]+8,q[1]],[q[0]+13,q[1]+11],[q[0]+7,q[1]+14],[q[0]+7,q[1]+29],[q[0]-7,q[1]+29],[q[0]-8,q[1]+13],[q[0]-13,q[1]+11]],'paper',1,.7);H.line(R,[[q[0],q[1]+3],[q[0],q[1]+26]],'teal',.85);}
    else {stroke(H,R,[[q[0]-7,q[1]],[q[0]-12,q[1]+19],[q[0]+1,q[1]+25],[q[0]+10,q[1]+13],[q[0]+6,q[1]]],n?'coral':'sun',3);}
  });
  benchFrame(H,R,.64,2.65,1.18,1.17,.57,'sun');
  cushion(H,R,.65,2.7,1.15,1.03,.61,.17,'teal');
  const roll=H.p(1.24,3.87,.13);oval(H,R,...roll,13,4,'sun',.55);for(let n=0;n<5;n++)H.line(R,[[roll[0]-10+n*5,roll[1]-3],[roll[0]-9+n*5,roll[1]+3]],'teal',1.1);
  shape(H,R,wallRect(H,'ne',.94,3.88,2.96,3.27,-.18),'sun',.36,.7);for(let n=0;n<6;n++){const q=wallPt(H,'ne',1.18+n*.47,3.08,-.2);shape(H,R,[[q[0]-4,q[1]],[q[0],q[1]-4],[q[0]+4,q[1]],[q[0],q[1]+4]],n%2?'paper':'coral',.6,.4);}
  floorLight(H,6.1,6.5,186,.29);
  const ring=Array.from({length:65},(_,n)=>{const a=-Math.PI*.1+n*Math.PI*1.65/64;return H.p(6.2+Math.cos(a)*3.35,6.1+Math.sin(a)*3.03,.043);});
  H.line(R,ring,'teal',2.6,{tone:.5});H.line(R,ring.map(([x,y])=>[x,y+2]),'sun',1.1);
  for(let n=0;n<7;n++){const a=.4+n*.57, i=6.2+Math.cos(a)*3.23,j=6.1+Math.sin(a)*2.94;shape(H,R,H.tile(i,j,.3,.3,.05),n===3?'coral':'paper',n===3?.55:1,.55);if(n===3)H.line(R,[H.p(i+.04,j+.05,.055),H.p(i+.26,j+.25,.055)],'sun',1);}
  chair(H,R,1.3,7.2);chair(H,R,2.02,9.13,'coral');chair(H,R,9.9,4.38);chair(H,R,9.8,7.4,'sun');
  box(H,R,.78,5.37,1.17,.93,.53,.56,'teal',.65);timber(H,R,.6,5.17,1.53,1.28,.46,.12,'sun');for(const j of [5.33,6.22])metal(H,R,.79,j,.1,.1,.02,.44,'blue');
  for(const z of [.69,.98]){const p=H.p(1.35,6.31,z);oval(H,R,...p,7,6,'blue',.75);oval(H,R,...p,3.5,3,'paper',.6);}
  const buttons=H.p(1.34,5.86,1.11);for(let n=0;n<4;n++)H.dot(buttons[0]-7+n*5,buttons[1],1.8,n===3?'coral':'paper');
  metal(H,R,.51,5.22,1.72,.13,.31,.09,'teal');
  shape(H,R,H.faceI(.71,6.44,1.27,.1,.39),'blue',.55,.7);for(let n=0;n<3;n++)H.line(R,[H.p(.81,6.45,.16+n*.07),H.p(1.82,6.45,.16+n*.07)],'sun',.8);
  const cable=H.p(.54,4.86,.035);stroke(H,R,[[cable[0]-8,cable[1]],[cable[0]-3,cable[1]-7],[cable[0]+9,cable[1]-3],[cable[0]+6,cable[1]+4],[cable[0]-7,cable[1]+2]],'blue',1.4);
  H.line(R,[H.p(1.2,5.1,.05),H.p(1.2,4.4,.05),H.p(.16,4.4,.05)],'blue',1.1);
  const fan=H.p(10.8,3.12,.73);H.line(R,[[fan[0],fan[1]+20],[fan[0],fan[1]]],'blue',2.6);oval(H,R,fan[0],fan[1]+20,10,3,'teal',.65);oval(H,R,...fan,15,16,'paper',.9);for(let n=0;n<12;n++){const a=n*Math.PI/6;H.line(R,[[fan[0],fan[1]],[fan[0]+Math.cos(a)*14,fan[1]+Math.sin(a)*15]],'teal',.55);}H.dot(...fan,3,'coral');
  benchFrame(H,R,6.8,9.58,2.56,1.13,.53,'sun');
  const drum=H.p(7.42,10.02,.57);shape(H,R,[[drum[0]-18,drum[1]-19],[drum[0]+18,drum[1]-19],[drum[0]+15,drum[1]+2],[drum[0]-15,drum[1]+2]],'coral',.62);oval(H,R,drum[0],drum[1]-19,18,6,'paper',1);oval(H,R,drum[0],drum[1]+1,15,4,'sun',.45);for(let n=0;n<6;n++)H.line(R,[[drum[0]-15+n*6,drum[1]-17],[drum[0]-12+n*5,drum[1]+1]],n===2?'teal':'paper',1.1);
  for(let n=0;n<6;n++){const x=drum[0]-15+n*6;oval(H,R,x,drum[1]-12,2,2.5,'sun',.6);H.line(R,[[x,drum[1]-14],[x,drum[1]-5]],'blue',.6);}
  stroke(H,R,[[drum[0]-13,drum[1]-19],[drum[0]-26,drum[1]-8],[drum[0]-20,drum[1]+5],[drum[0]+10,drum[1]+7],[drum[0]+15,drum[1]-1]],'teal',2);
  const tamb=H.p(8.86,10.5,.57);oval(H,R,...tamb,17,8,'sun',.65);oval(H,R,tamb[0],tamb[1]-1,13,5,'paper',1);for(let n=0;n<6;n++){const a=n*Math.PI/3;oval(H,R,tamb[0]+Math.cos(a)*15,tamb[1]+Math.sin(a)*6,2.5,1.7,'teal',.65);}
  for(let n=0;n<2;n++)timber(H,R,8.15+n*.3,9.85,.14,.56,.57,.09,'sun');
  shape(H,R,H.tile(8.9,9.9,.36,.7,.58),'coral',.55,.6);for(let n=0;n<4;n++)H.line(R,[H.p(9.08,10.54,.6),H.p(8.93+n*.09,9.94,.6)],'sun',.75);
  timber(H,R,1.37,10.31,1.37,.94,.04,.1,'teal');
  for(const i of [1.39,2.59])timber(H,R,i,10.3,.13,.96,.14,.4,'teal');
  for(const j of [10.31,11.15])timber(H,R,1.4,j,1.32,.12,.15,.39,'teal');
  const ties=H.p(2.03,10.8,.26);for(let n=0;n<3;n++)stroke(H,R,[[ties[0]-11+n*7,ties[1]-6],[ties[0]-7+n*7,ties[1]-12],[ties[0]-2+n*7,ties[1]-3],[ties[0]-8+n*7,ties[1]+4]],n===1?'coral':'sun',2);
  shape(H,R,H.tile(4.33,9.78,1.03,.71,.05),'paper',1,.65);for(let n=0;n<3;n++)H.line(R,[H.p(4.48,9.89+n*.14,.07),H.p(5.2,9.89+n*.14,.07)],'teal',.8);
  shoe(H,R,3.34,10.17,.05,'paper','teal');shoe(H,R,3.78,10.34,.05,'paper','coral');
  stroke(H,R,[H.p(10.88,8.87,.05),H.p(10.88,8.75,1.68),H.p(10.64,8.75,1.79),H.p(10.48,8.75,1.65)],'sun',3);
  vessel(H,R,10.84,10.43,.04,17,19,'sun');drape(H,R,10.35,10.06,.95,.74,.63,.19,'coral');
  const flask=H.p(9.88,10.74,.04);shape(H,R,[[flask[0]-6,flask[1]],[flask[0]+6,flask[1]],[flask[0]+7,flask[1]-24],[flask[0]-6,flask[1]-24]],'teal',.55,.7);oval(H,R,flask[0],flask[1]-24,7,2.5,'paper',1);H.line(R,[[flask[0]-3,flask[1]-21],[flask[0]-3,flask[1]-4]],'sun',1.1);
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
