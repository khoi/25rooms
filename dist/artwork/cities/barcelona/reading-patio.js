import { world, box, shape, oval, stroke, ell, cycle, wallPt, wallRect } from '../../worlds/common.js';
import { timber, metal, benchFrame, drape, floorLight, slattedSeat } from '../materials.js';
import { cabinetFrame, archedBay, masonry } from '../structure.js';
import { caster, hangingRail, specimen } from '../joinery.js';

const ease = (a,b,t) => {const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};

function person(H, R, i, j, hands, ink = 'teal', lean = 0) {
  const [x, y] = H.p(i, j), P = (a, b) => [x + a * 1.1 + lean, y + b * 1.4];
  H.tint(ell(x + 4, y + 2, 17, 5), 'blue', .18);
  for (const s of [-1, 1]) { stroke(H, R, [P(s * 5, -28), P(s * 7, -14), [x + s * 8, y - 2]], 'blue', 7); oval(H, R, x + s * 8 + 2, y - 1, 6, 2.5, 'blue'); }
  shape(H, R, [P(-10, -49), P(9, -49), P(12, -26), P(-10, -26)], ink, .75);
  shape(H, R, [P(-5, -46), P(5, -46), P(7, -26), P(-6, -26)], 'paper', .8, .7);
  for (let n = 0; n < 2; n++) { const a = P(n ? 9 : -9, -46), b = hands[n]; stroke(H, R, [a, [(a[0] + b[0]) / 2, Math.max(a[1], b[1]) + 5], b], ink, 6); oval(H, R, ...b, 2.5, 2.2, 'coral', .35); }
  oval(H, R, ...P(0, -60), 9, 11, 'paper', 1);
  shape(H, R, [P(-9, -61), P(-8, -70), P(1, -74), P(9, -69), P(10, -63), P(3, -67), P(-4, -65)], 'blue', .8);
  H.dot(...P(4, -59), 1, 'blue'); stroke(H, R, [P(3, -54), P(6, -53), P(8, -55)], 'blue', .6);
}

function book(H,R,i,j,z,w=.4,d=.6,ink='coral',open=false){
  box(H,R,i,j,w,d,z,.065,ink,.66);
  if(open){
    for(const side of [0,1]) {const x=i+w*side/2;shape(H,R,[H.p(x,j,z+.09),H.p(x+w/2,j,z+.11),H.p(x+w/2,j+d,z+.11),H.p(x,j+d,z+.09)],'paper',1,.6);}
    H.line(R,[H.p(i+w/2,j,z+.12),H.p(i+w/2,j+d,z+.12)],'blue',.8);
    shape(H,R,[H.p(i+.13,j+.13,z+.12),H.p(i+w*.4,j+.13,z+.12),H.p(i+w*.4,j+d*.7,z+.12),H.p(i+.13,j+d*.7,z+.12)],'teal',.35,.5);
    oval(H,R,...H.p(i+w*.74,j+d*.42,z+.13),7,4,'coral',.65);
    for(let n=0;n<3;n++) H.line(R,[H.p(i+w*.58,j+d*(.65+n*.09),z+.12),H.p(i+w*.88,j+d*(.65+n*.09),z+.12)],'blue',.55,{tone:.5});
  } else {H.line(R,[H.p(i+.035,j+d+.008,z+.025),H.p(i+w-.035,j+d+.008,z+.025)],'paper',1.2);}
}

const room=world('barcelona-reading-patio','The book crosses the table',{floor:'paper',tone:.85,wall:false,pattern:'tiles',accent:'teal',head:32},(H,R)=>{
  masonry(H,R,'nw',0,12,0,3.2,'paper',.85);masonry(H,R,'ne',0,12,0,2.7,'coral',.25);
  archedBay(H,R,'nw',1.6,5,0,3.08,'teal',P=>{
    shape(H,R,[P(.17,.1),P(4.83,.1),P(4.83,2.8),P(.17,2.8)],'teal',.15);
    for(let n=0;n<3;n++)shape(H,R,[P(.4+n*1.45,.2),P(1.45+n*1.45,.2),P(1.45+n*1.45,1.9),P(.4+n*1.45,1.9)],'paper',.8);
  });
  for(const j of [.25,6.2]) {timber(H,R,.2,j,11.6,.18,3.23,.15,'sun');for(const i of [.35,11.5])timber(H,R,i,j,.16,.18,.1,3.2,'teal');}
  for(let i=.6;i<11.6;i+=1.3){timber(H,R,i,.3,.14,6.05,3.27,.1,'sun');H.tint(H.tile(i+.2,1.6,.09,5.3,.02),'blue',.065);}
  metal(H,R,.12,.12,.22,11.65,3.22,.14,'teal');stroke(H,R,[H.p(.3,10.9,3.25),H.p(.3,10.9,.23),H.p(.75,11.1,.15)],'teal',4);
  for(let n=0;n<6;n++) H.line(R,[H.p(.25+n*.15,10.5,.02),H.p(.25+n*.15,11.4,.02)],'blue',1.2);
  cabinetFrame(H,R,3.9,.22,7.55,1.23,.08,2.28,4,'teal',(i,j,w,d,z,h,n)=>{
    for(const level of [z,z+.7,z+1.42]){
      timber(H,R,i,j,w,d,level,.07,'sun');
      if(level>1.4&&n===3){metal(H,R,i+.3,j+.2,.06,.45,level+.07,.35,'coral');metal(H,R,i+.9,j+.2,.06,.45,level+.07,.35,'coral');timber(H,R,i+.2,j+.3,.95,.4,level+.4,.05,'sun');}
      else for(let k=0;k<5;k++){const ink=['coral','sun','teal','paper','blue'][(k+n)%5], h=.28+(k%3)*.1;box(H,R,i+.1+k*.23,j+.5,.15,.37,level+.08,h,ink,.65);H.line(R,[H.p(i+.15+k*.23,j+.875,level+.16),H.p(i+.15+k*.23,j+.875,level+h-.01)],'paper',.65);}
    }
  });
  timber(H,R,4.1,1.51,7.12,.72,.44,.14,'sun');
  for(const i of [4.25,7.45,10.8])timber(H,R,i,1.65,.16,.4,.02,.43,'teal');
  drape(H,R,4.45,1.53,1.2,.55,.61,.11,'coral');drape(H,R,8.4,1.53,1.75,.55,.61,.12,'paper');
  shape(H,R,wallRect(H,'ne',.8,2.9,.42,2.35,-.13),'teal',.23);
  for(let n=0;n<7;n++)H.line(R,[wallPt(H,'ne',1+n*.25,.45,-.16),wallPt(H,'ne',1+n*.25,2.3,-.16)],'blue',.6,{tone:.4});
  hangingRail(H,R,'ne',.8,2.3,2.52,3,(P,u,n)=>{const [x,y]=P(u,-.15);shape(H,R,[[x-7,y],[x+7,y],[x+9,y+28],[x-8,y+28]],n===1?'coral':'paper',.85);H.line(R,[[x-6,y+20],[x+7,y+20]],'teal',1.7);});
  floorLight(H,6.2,6.3,160,.38);
  benchFrame(H,R,2.45,4.85,6.75,2.18,1.08,'sun');
  metal(H,R,2.75,5.09,6.13,.32,1.083,.055,'teal');
  for(const i of [2.65,8.9]) {H.line(R,[H.p(i,5.15,.26),H.p(i,6.8,.26)],'blue',3);H.dot(...H.p(i,6.85,.86),2,'coral');}
  benchFrame(H,R,8.95,5.75,1.78,1.25,.66,'sun');
  box(H,R,9.8,6.75,.46,.35,.04,.3,'coral',.6);
  slattedSeat(H,R,2.75,8.3,2.15,.02,'sun',.52);
  slattedSeat(H,R,8.0,8.05,2.1,.02,'coral',.58);
  for(let n=0;n<3;n++) book(H,R,2.8+n*.04,5.4,1.16+n*.075,.62,.8,['teal','coral','sun'][n]);
  drape(H,R,4.05,5.67,2.5,1.05,1.095,.14,'paper');
  const fish=H.p(3.63,6.84,1.15);shape(H,R,[[fish[0]-10,fish[1]],[fish[0]-3,fish[1]-4],[fish[0]+4,fish[1]],[fish[0]-3,fish[1]+4]],'teal',.7,.6);shape(H,R,[[fish[0]+3,fish[1]],[fish[0]+9,fish[1]-4],[fish[0]+9,fish[1]+4]],'teal',.7,.5);H.dot(fish[0]-5,fish[1],.7,'paper');
  timber(H,R,9.75,2.8,1.25,.72,.23,.08,'teal');timber(H,R,9.75,2.8,1.25,.72,.9,.08,'teal');
  for(const i of [9.8,10.9])for(const j of [2.88,3.45]){metal(H,R,i,j,.07,.07,.1,1.21,'coral');caster(H,R,i,j);}
  for(let n=0;n<5;n++) book(H,R,9.9+(n%2)*.03,2.95,.98+n*.07,.65,.48,n%2?'coral':'sun');
  shape(H,R,H.tile(.95,8.6,3.2,2.24,.035),'teal',.22);
  for(let n=0;n<6;n++)H.line(R,[H.p(1.1+n*.43,10.6,.05),H.p(1.1+n*.43,10.76,.05)],'paper',1.4);
  timber(H,R,1.35,9.1,1.3,.85,.06,.09,'sun');
  for(let n=0;n<3;n++) {const [x,y]=H.p(1.59+n*.36,9.5,.17);shape(H,R,[[x-5,y+3],[x+5,y+3],[x+5,y-5],[x-5,y-5]],n%2?'coral':'teal',.65,.55);}
  book(H,R,2.9,9.25,.05,.72,.8,'coral',true);
  const m=H.p(3.5,8.83,.5);oval(H,R,...m,13,17,'sun',.55);oval(H,R,m[0],m[1],10,14,'paper',1);H.line(R,[[m[0]-5,m[1]+8],[m[0]+5,m[1]-8]],'teal',1.2);
  box(H,R,.6,3.4,.95,1.7,.05,.45,'coral',.38);specimen(H,R,...H.p(1.1,4.2,.53),.92,'teal');
  metal(H,R,10.5,8.7,.85,1.35,.04,.07,'teal');for(const i of [10.55,11.24])stroke(H,R,[H.p(i,8.8,.08),H.p(i,8.65,1.66),H.p(i,10,.08)],'blue',2.1);
  shape(H,R,[H.p(10.53,8.7,1.57),H.p(11.25,8.7,1.57),H.p(11.25,9.4,.5),H.p(10.53,9.4,.5)],'paper',1,.8);
  shape(H,R,[H.p(10.67,8.91,1.24),H.p(11.07,8.91,1.24),H.p(11.07,9.2,.8),H.p(10.67,9.2,.8)],'teal',.5,.6);
},(H,R,t)=>{
  const u=cycle(t,24)*24, slide=ease(4.8,9.6,u)*(1-ease(14.4,22,u)), i=4.7+.66*slide;
  const p=H.p(i+.14,6.22,1.24), q=H.p(i+1.25,6.22,1.24);
  person(H,R,5.05,7.03,[[p[0]-4,p[1]+1],[p[0]+4,p[1]-1]],'teal');
  person(H,R,7.12,6.64,[[q[0]-4,q[1]],[q[0]+4,q[1]+2]],'coral',-2*slide);
  book(H,R,i,5.89,1.14,1.4,.84,'teal',true);
  const x=H.p(5,.95,3.3), b=Math.sin(t*Math.PI*2/24)*5;H.line(R,[x,[x[0],x[1]+26]],'blue',.75);H.line(R,[[x[0]-23,x[1]+26],[x[0]+23,x[1]+26]],'blue',1);
  for(let n=0;n<3;n++){const xx=x[0]+(n-1)*22, yy=x[1]+40+n%2*9;H.line(R,[[xx,x[1]+26],[xx+b*.2,yy]],'blue',.6);shape(H,R,[[xx+b*.2-7,yy],[xx+b*.2,yy-6],[xx+b*.2+7,yy],[xx+b*.2,yy+6]],n===1?'coral':'sun',.65,.6);}
  const c=H.p(10.78,9.05,1.04);H.line(R,[[c[0]-4,c[1]-2],[c[0]+4,c[1]+Math.sin(t*Math.PI*2/24)*.6]],'paper',1.5);
});
room.loopSeconds=24;
room.stillTime=11;
export default room;
