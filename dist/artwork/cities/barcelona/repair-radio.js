import { world, box, shape, oval, stroke, ell, cycle, wallPt, wallRect } from '../../worlds/common.js';
import { timber, metal, benchFrame, drape, floorLight, slattedSeat, vessel } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, wallRack, taskLight, hangingRail } from '../joinery.js';

const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};

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

function dial(H,R,i,j,z,r,angle=0){
  const circle=(d)=>Array.from({length:32},(_,n)=>{const a=n*Math.PI/16;return H.p(i+Math.cos(a)*r*d,j,z+Math.sin(a)*r*d);});
  shape(H,R,circle(1),'sun',.55,.8);shape(H,R,circle(.82),'paper',1,.7);
  for(let n=0;n<10;n++){const a=n*Math.PI/5;H.line(R,[H.p(i+Math.cos(a)*r*.67,j+.01,z+Math.sin(a)*r*.67),H.p(i+Math.cos(a)*r*.77,j+.01,z+Math.sin(a)*r*.77)],'blue',.8);}
  H.line(R,[H.p(i,j+.02,z),H.p(i+Math.sin(angle)*r*.62,j+.02,z+Math.cos(angle)*r*.62)],'coral',1.7);H.dot(...H.p(i,j+.03,z),2,'blue');
}

function radio(H,R,i,j,z,w=2.8,d=1.38){
  timber(H,R,i,j,w,d,z,.16,'sun');
  shape(H,R,H.faceI(i+.12,j+.12,w-.24,z+.17,z+1.64),'teal',.25,.7);
  for(const x of [i,i+w-.13])timber(H,R,x,j,.13,d,z,1.7,'sun');
  timber(H,R,i,j,w,.15,z+1.56,.17,'sun');timber(H,R,i,j+d-.16,w,.16,z+1.56,.17,'sun');
  timber(H,R,i+.12,j+d-.15,1.33,.14,z+.15,1.42,'sun');
  const P=(u,v)=>H.p(i+.8+u,j+d+.015,z+.87+v), grille=Array.from({length:40},(_,n)=>{const a=n*Math.PI/20;return P(Math.cos(a)*.53,Math.sin(a)*.53);});
  shape(H,R,grille,'blue',.7,1);
  H.clip(grille,()=>{for(let v=-.55;v<.6;v+=.085)H.line(R,[P(-.6,v),P(.6,v)],'paper',1.2,{tone:.65});for(let u=-.6;u<.6;u+=.1)H.line(R,[P(u,-.6),P(u,.6)],'sun',.55);});
  shape(H,R,[P(-.29,-.33),P(-.07,-.33),P(-.07,-.19),P(-.29,-.19)],'coral',.38,.5);
  metal(H,R,i+1.58,j+.38,1.02,.85,z+.18,.15,'teal');
  for(let n=0;n<3;n++){vessel(H,R,i+1.77+n*.3,j+.71,z+.34,4.4,19+n%2*8,'paper',false);}
  for(let n=0;n<4;n++)stroke(H,R,[H.p(i+1.65,j+.51+n*.14,z+.35),H.p(i+2.47,j+.51+n*.14,z+.38),H.p(i+2.57,j+.7,z+.72)],['coral','sun','blue','teal'][n],1.2);
  metal(H,R,i+1.67,j+d-.16,.94,.15,z+.83,.56,'blue');dial(H,R,i+2.12,j+d+.015,z+1.11,.2);
  for(const x of [i+.12,i+w-.21]) for(const y of [j+.1,j+d-.22])metal(H,R,x,y,.15,.14,z-.1,.1,'blue');
}

const room=world('barcelona-repair-radio','A switch clicks softly',{floor:'paper',tone:.8,pattern:'tiles',accent:'sun',wall:'paper',wallTone:.86,height:3.45,head:25},(H,R)=>{
  for(const side of ['nw','ne'])shape(H,R,wallRect(H,side,.05,11.9,.1,.82,-.08),'teal',.24,.7);
  windowBay(H,R,'nw',6.6,3.9,1.36,1.8,{ink:'teal',divisions:3});
  for(let n=0;n<5;n++)H.line(R,[wallPt(H,'ne',10.2,2.85+n*.065,-.08),wallPt(H,'ne',11.25,2.85+n*.065,-.08)],'blue',.75);
  cabinetFrame(H,R,3.15,.24,8.3,1.25,.08,1.48,5,'teal',(i,j,w,d,z,h,n)=>{
    for(let row=0;row<3;row++){const zz=z+row*.43;box(H,R,i+.035,j+.13,w-.1,d-.14,zz,.35,'sun',.42);shape(H,R,H.faceI(i+.16,j+d+.005,w-.33,zz+.08,zz+.29),'paper',.9,.5);H.line(R,[H.p(i+w*.36,j+d+.02,zz+.18),H.p(i+w*.59,j+d+.02,zz+.18)],'blue',2);}
  });
  timber(H,R,3.04,.14,8.51,1.55,1.55,.16,'sun');
  wallRack(H,R,'ne',3.3,6.28,1.92,1.3,2,'sun',(P,z,row)=>{
    for(let n=0;n<6;n++){const [x,y]=P(.4+n*.97,z+.04);if(row){oval(H,R,x,y-7,7,6,n%2?'sun':'teal',.65);oval(H,R,x,y-7,3,2,'blue');}else {shape(H,R,[[x-6,y],[x+6,y],[x+5,y-13],[x-5,y-13]],'paper',1,.55);H.line(R,[[x-3,y-4],[x+3,y-9]],'coral',1.2);}}
  });
  hangingRail(H,R,'nw',.6,4.8,2.97,6,(P,u,n)=>{const [x,y]=P(u,-.16);H.line(R,[[x,y],[x,y+20]],n%2?'sun':'teal',3);H.line(R,[[x,y+19],[x+6,y+28]],'blue',1.6);if(n===2)for(let k=0;k<3;k++)H.line(R,[[x-3,y+3+k*4],[x+3,y+3+k*4]],['coral','sun','teal'][k],1.8);});
  const sheet=wallRect(H,'nw',1.02,3.85,1.25,2.47,-.16);shape(H,R,sheet,'paper',1,.7);
  const P=(u,z)=>wallPt(H,'nw',u,z,-.2);shape(H,R,[P(1.4,1.46),P(3.4,1.46),P(3.4,2.2),P(1.4,2.2)],'sun',.1,.8);oval(H,R,...P(2.15,1.83),10,11,'blue',.08);H.line(R,[P(1.32,1.41),P(3.55,1.41)],'blue',.6);
  floorLight(H,5.6,6.1,138,.4);
  benchFrame(H,R,2.25,4.23,6.55,2.6,1.22,'sun');
  drape(H,R,2.52,4.52,3.02,1.91,1.24,.23,'paper');
  radio(H,R,2.7,4.6,1.28);
  timber(H,R,6.13,4.54,1.6,1.15,1.25,.07,'sun');
  for(let n=0;n<7;n++)H.line(R,[H.p(6.25+n*.18,4.69,1.33),H.p(6.25+n*.18,5.47,1.33)],'blue',.65);
  const speaker=H.p(7.94,4.94,1.28);oval(H,R,...speaker,19,10,'blue',.8);oval(H,R,speaker[0],speaker[1]-2,14,7,'paper',.65);oval(H,R,speaker[0],speaker[1]-3,5,3,'blue',.65);
  metal(H,R,5.92,5.98,.94,.6,1.23,.1,'teal');
  metal(H,R,6.04,6.08,.18,.34,1.33,.24,'blue');metal(H,R,6.66,6.08,.15,.34,1.33,.24,'blue');
  metal(H,R,6.2,6.14,.48,.2,1.48,.12,'paper');
  const cap=H.p(7.36,6.27,1.27);oval(H,R,...cap,8,4,'coral',.65);H.line(R,[[cap[0]-3,cap[1]+1],[cap[0]+3,cap[1]-1]],'blue',1);H.dot(cap[0]+1,cap[1]-.5,1.3,'sun');
  timber(H,R,7.83,6.43,.56,.46,1.24,.06,'sun');oval(H,R,...H.p(8.1,6.65,1.31),5,2.5,'blue',.5);
  taskLight(H,R,8.36,4.35,1.27,'coral',-.7);
  for(let n=0;n<3;n++){H.line(R,[H.p(3.12+n*.43,6.3,1.27),H.p(3.45+n*.43,6.1,1.27)],'blue',1.8);H.line(R,[H.p(3.03+n*.43,6.35,1.27),H.p(3.21+n*.43,6.24,1.27)],n===1?'teal':'coral',3);}
  metal(H,R,3.2,5.3,1.9,.92,.26,.08,'teal');for(let n=0;n<3;n++)box(H,R,3.36+n*.53,5.4,.43,.63,.35,.21,n%2?'paper':'sun',.6);
  slattedSeat(H,R,.7,8.6,2.1,.04,'sun',.7);drape(H,R,.8,8.8,1.3,.6,.75,.25,'coral');
  box(H,R,1.25,9.1,.7,.4,.85,.46,'sun',.7);dial(H,R,1.58,9.515,1.11,.16);
  stroke(H,R,[H.p(1.37,9.2,1.31),H.p(1.37,9.2,1.53),H.p(1.83,9.2,1.53),H.p(1.83,9.2,1.31)],'blue',1.8);
  benchFrame(H,R,8.75,9.1,2.5,1.53,.66,'teal');
  for(let n=0;n<4;n++){const [x,y]=H.p(9.14+n*.48,9.76,.7);oval(H,R,x,y,7,3,n===0?'sun':n===1?'blue':'teal',.65);H.line(R,[[x,y],[x+1,y-5]],'paper',1);}
  drape(H,R,9.0,9.22,1.9,.96,.69,.22,'paper');
  for(let n=0;n<4;n++){const p=H.p(9.22+n*.45,9.8,.72);oval(H,R,...p,5.2,3,n%2?'coral':'sun',.7);}
  box(H,R,9.75,2.37,1.16,.77,.02,.75,'sun',.4);shape(H,R,H.faceI(9.91,3.15,.82,.15,.66),'blue',.65);dial(H,R,10.32,3.17,.41,.2);
},(H,R,t)=>{
  const u=cycle(t,16)*16, twist=ease(3.2,6.4,u)*(1-ease(9.6,14,u)), pick=ease(6.4,8,u)*(1-ease(10.1,13.8,u));
  const shaft=H.p(6.44,6.25,1.65), knob=H.p(7.98-.92*pick,6.65,1.32+.33*pick);
  person(H,R,6.2,7.46,[[shaft[0]-6,shaft[1]+6],[shaft[0]+2,shaft[1]-2]],'teal');
  person(H,R,8.06,7.12,[[knob[0]-5,knob[1]-2],[knob[0]+5,knob[1]-2]],'coral');
  oval(H,R,shaft[0],shaft[1],6,5,'blue',.85);H.line(R,[[shaft[0],shaft[1]],[shaft[0]+Math.sin(twist*.7)*8,shaft[1]-Math.cos(twist*.7)*8]],'paper',2);
  oval(H,R,knob[0],knob[1]-2,6,5,'sun',.75);H.line(R,[[knob[0]-3,knob[1]-2],[knob[0]+3,knob[1]-3]],'blue',.7);
  const p=wallPt(H,'ne',10.46,2.69,-.24), sway=Math.sin(t*Math.PI*2/16)*1.4;stroke(H,R,[p,[p[0]+12+sway,p[1]+15],[p[0]+7,p[1]+27],[p[0]-4,p[1]+24],[p[0]-5,p[1]+6]],'blue',1.4);
});
room.loopSeconds=16;
room.stillTime=8.5;
export default room;
