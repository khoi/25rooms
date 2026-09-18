import { world, box, shape, oval, stroke, ell, cycle, wallPt, wallRect } from '../../worlds/common.js';
import { timber, metal, benchFrame, drape, floorLight } from '../materials.js';
import { cabinetFrame } from '../structure.js';
import { windowBay, caster, wallRack, hangingRail } from '../joinery.js';

const ease=(a,b,t)=>{const u=Math.max(0,Math.min(1,(t-a)/(b-a)));return u*u*(3-2*u);};

function person(H, R, i, j, hands, ink = 'teal', lean = 0) {
  const [x, y] = H.p(i, j), P = (a, b) => [x + a * 1.1 + lean, y + b * 1.18];
  H.tint(ell(x + 4, y + 2, 17, 5), 'blue', .18);
  for (const s of [-1, 1]) { stroke(H, R, [P(s * 5, -28), P(s * 7, -14), [x + s * 8, y - 2]], 'blue', 7); oval(H, R, x + s * 8 + 2, y - 1, 6, 2.5, 'blue'); }
  shape(H, R, [P(-10, -49), P(9, -49), P(12, -26), P(-10, -26)], ink, .75);
  shape(H, R, [P(-5, -46), P(5, -46), P(7, -26), P(-6, -26)], 'paper', .8, .7);
  for (let n = 0; n < 2; n++) { const a = P(n ? 9 : -9, -46), b = hands[n]; stroke(H, R, [a, [(a[0] + b[0]) / 2, Math.max(a[1], b[1]) + 5], b], ink, 6); oval(H, R, ...b, 2.5, 2.2, 'coral', .35); }
  oval(H, R, ...P(0, -60), 9, 11, 'paper', 1);
  shape(H, R, [P(-9, -61), P(-8, -70), P(1, -74), P(9, -69), P(10, -63), P(3, -67), P(-4, -65)], 'blue', .8);
  H.dot(...P(4, -59), 1, 'blue'); stroke(H, R, [P(3, -54), P(6, -53), P(8, -55)], 'blue', .6);
}

function costume(H,R,i,j,z,ink='coral',small=false){
  const [x,y]=H.p(i,j,z),s=small?.65:1;
  const p=(a,b)=>[x+a*s,y+b*s];
  stroke(H,R,[p(-22,-48),p(0,-57),p(22,-48)],'sun',2);
  shape(H,R,[p(-9,-51),p(9,-51),p(15,-31),p(29,0),p(-30,0),p(-16,-31)],ink,.6,.8);
  for(let n=0;n<7;n++)stroke(H,R,[p((n-3)*4,-29),p((n-3)*7,-2)],n%2?'paper':'blue',.7,.6);
  H.line(R,[p(-28,-3),p(28,-3)],'sun',1.2);
  shape(H,R,[p(-13,-45),p(-23,-36),p(-29,-16),p(-20,-12),p(-11,-29)],ink,.55,.7);
  shape(H,R,[p(13,-45),p(24,-35),p(31,-17),p(22,-13),p(10,-29)],ink,.55,.7);
  shape(H,R,[p(-24,-22),p(-19,-20),p(-21,-15),p(-26,-17)],'paper',.8,.4);
  for(let n=0;n<3;n++)H.line(R,[p(-24+n*2,-22),p(-24+n*2,-19)],'blue',.5);
}

function faceStudy(H,R,x,y,s=1){
  oval(H,R,x,y,10*s,13*s,'paper',1);oval(H,R,x+10*s,y+3*s,7*s,4*s,'sun',.6);H.dot(x+4*s,y-3*s,1.2*s,'blue');stroke(H,R,[[x-5*s,y+7*s],[x+4*s,y+9*s]],'coral',1*s);
}

const room=world('barcelona-giant-store','A head above the doorway',{floor:'paper',tone:.68,wall:'paper',wallTone:.75,height:4.55,head:78},(H,R)=>{
  for(const side of ['ne','nw']) {
    for(let z=.25;z<4.5;z+=.58)H.line(R,[wallPt(H,side,.05,z,-.04),wallPt(H,side,11.9,z,-.04)],'blue',.5,{tone:.18});
    metal(H,R,side==='ne'?0:.13,side==='ne'?.13:0,side==='ne'?11.85:.13,side==='ne'?.13:11.85,4.38,.13,'teal');
    H.line(R,[wallPt(H,side,.35,4.42,-.25),wallPt(H,side,5.8,3.62,-.25),wallPt(H,side,11.55,4.42,-.25)],'blue',3);
    H.line(R,[wallPt(H,side,5.8,3.62,-.25),wallPt(H,side,5.8,4.4,-.25)],'teal',2);
  }
  windowBay(H,R,'nw',1,5.7,3.2,.82,{ink:'teal',divisions:5});
  shape(H,R,wallRect(H,'nw',8.2,11.6,.06,3.35,-.08),'blue',.42);
  for(let p=8.4;p<11.6;p+=.38)H.line(R,[wallPt(H,'nw',p,.14,-.11),wallPt(H,'nw',p,3.26,-.11)],'teal',1.1);
  H.line(R,[wallPt(H,'nw',8,3.5,-.28),wallPt(H,'nw',11.8,3.5,-.28)],'blue',3);
  box(H,R,.18,8.2,.78,3.45,0,.1,'sun',.44);
  for(let j=3;j<9;j+=.18)H.line(R,[H.p(10.92,j,.025),H.p(11.18,j,.025)],'blue',.65);
  cabinetFrame(H,R,8.24,.35,3.22,1.68,.08,4.18,2,'teal',(i,j,w,d,z,h,n)=>{
    timber(H,R,i,j,w,d,z+.65,.09,'sun');timber(H,R,i,j,w,d,z+3.15,.09,'sun');
    H.line(R,[H.p(i+.12,j+.4,z+2.99),H.p(i+w-.12,j+.4,z+2.99)],'blue',2.5);
    costume(H,R,i+w*.52,j+.58,z+.79,n?'teal':'coral');
    for(let k=0;k<2;k++) {const p=H.p(i+.3+k*.6,j+.5,z+.18);oval(H,R,...p,10,5,'blue',.75);H.line(R,[[p[0]-6,p[1]-3],[p[0]+4,p[1]-3]],'paper',.8);}
    drape(H,R,i+.12,j+.14,w-.25,.95,z+3.28,.21,n?'coral':'paper');
  });
  for(const j of [.45,1.92])for(const i of [8.3,11.36])metal(H,R,i,j,.08,.08,.15,4.3,'blue');
  wallRack(H,R,'ne',1.1,6.8,3.37,.9,1,'sun',(P,z)=>{
    for(let n=0;n<4;n++){const [x,y]=P(.58+n*1.5,z+.05);if(n===2)shape(H,R,[[x-13,y],[x-15,y-16],[x-5,y-7],[x,y-21],[x+6,y-6],[x+15,y-17],[x+13,y]],'sun',.65);else faceStudy(H,R,x,y-12,n===3?.7:1);}
  });
  floorLight(H,4.5,5.5,163,.43);
  metal(H,R,2.15,3.45,4.55,3.2,.17,.2,'teal');
  for(const i of [2.4,6.38])for(const j of [3.7,6.37]){caster(H,R,i,j,.14);metal(H,R,i-.12,j-.07,.24,.22,.22,.13,'coral');}
  for(const i of [2.85,5.85]) for(const j of [3.9,5.8])timber(H,R,i,j,.22,.24,.4,2.48,'sun');
  for(const j of [3.97,5.85]){
    timber(H,R,2.86,j,3.21,.21,1.2,.15,'sun');timber(H,R,2.8,j,3.35,.25,2.59,.2,'sun');
    H.line(R,[H.p(2.98,j+.12,.56),H.p(5.96,j+.12,2.57)],'blue',4);H.line(R,[H.p(5.95,j+.12,.56),H.p(2.98,j+.12,2.57)],'sun',2.5);
  }
  for(const i of [2.84,5.87])timber(H,R,i,3.92,.24,2.1,2.58,.21,'sun');
  metal(H,R,3.64,4.21,1.64,1.27,2.79,.16,'teal');drape(H,R,3.71,4.22,1.48,1.18,2.97,.22,'paper');
  const [x,y]=H.p(4.46,4.67,3.3);
  oval(H,R,x-41,y-18,11,22,'sun',.4);oval(H,R,x+40,y-18,10,20,'sun',.4);
  shape(H,R,[[x-39,y-40],[x-26,y-58],[x+5,y-66],[x+30,y-51],[x+39,y-26],[x+30,y+3],[x+10,y+20],[x-17,y+16],[x-35,y-3]],'paper',1,1.6);
  shape(H,R,[[x-39,y-39],[x-33,y-56],[x-9,y-70],[x+17,y-66],[x+35,y-49],[x+40,y-31],[x+28,y-38],[x+17,y-48],[x+2,y-45],[x-10,y-55],[x-22,y-44]],'teal',.65,1);
  for(let n=0;n<8;n++)oval(H,R,x-29+n*8,y-51-Math.sin(n/7*Math.PI)*11,6.7,6,'teal',.7);
  for(const dx of [-16,17]) {oval(H,R,x+dx,y-24,10,6,'sun',.35);oval(H,R,x+dx+2,y-23,3,4,'blue',.8);H.line(R,[[x+dx-9,y-35],[x+dx+8,y-37]],'blue',2.4);}
  shape(H,R,[[x+2,y-29],[x+15,y-11],[x+10,y-4],[x-2,y-7]],'sun',.35,.8);
  stroke(H,R,[[x-13,y+1],[x+1,y+7],[x+19,y+1]],'coral',2.5);stroke(H,R,[[x-11,y+1],[x+1,y+3],[x+16,y]],'blue',.8);
  oval(H,R,x-25,y-5,9,5,'coral',.25);oval(H,R,x+26,y-4,7,4,'coral',.28);
  shape(H,R,[[x-47,y-19],[x-40,y-25],[x-35,y-15],[x-39,y-5],[x-46,y-7]],'paper',1,.7);
  for(let n=0;n<4;n++)H.line(R,[[x-46+n*3,y-17+n],[x-44+n*3,y-14+n]],'coral',.7);
  const hole=H.p(4.5,5.51,2.9);oval(H,R,...hole,20,7,'blue',.7);oval(H,R,hole[0],hole[1]+1,13,3,'sun',.5);
  benchFrame(H,R,2.34,6.64,4.5,1.18,.7,'sun');drape(H,R,2.43,6.68,4.25,.99,.72,.21,'paper');
  benchFrame(H,R,8.02,5.5,3,1.83,.79,'sun');drape(H,R,8.15,5.65,2.2,1.5,.81,.46,'teal');
  timber(H,R,9.2,5.82,1.2,.86,.83,.13,'sun');H.line(R,[H.p(9.3,6.05,1),H.p(9.97,6.45,1)],'coral',2);
  box(H,R,9.26,7.65,1.6,1.15,.05,.46,'teal',.4);drape(H,R,9.3,7.7,1.49,1.03,.54,.21,'paper');
  for(let n=0;n<3;n++)H.line(R,[H.p(8.2+n*.16,8.1,.13),H.p(11.1+n*.08,8.6,.13)],n===1?'sun':'blue',3);
  shape(H,R,H.tile(1.16,9.17,3.58,1.75,.04),'coral',.2);
  drape(H,R,1.52,9.45,1.2,.78,.15,.1,'paper');
  const mirror=H.p(3.4,9.77,.16);oval(H,R,...mirror,13,8,'sun',.65);oval(H,R,...mirror,9.5,5.5,'paper',1);H.line(R,[[mirror[0]+10,mirror[1]],[mirror[0]+23,mirror[1]+6]],'blue',3);
  for(let n=0;n<3;n++)H.line(R,[H.p(1.7+n*.28,10.12,.18),H.p(1.86+n*.28,10.4,.18)],'teal',1.8);
  const pad=H.p(4.15,9.62,.18);oval(H,R,...pad,14,8,'teal',.45);H.line(R,[[pad[0]-4,pad[1]],[pad[0],pad[1]-4],[pad[0]+4,pad[1]]],'sun',1.2);
},(H,R,t)=>{
  const u=cycle(t,18)*18,lift=ease(3.6,7.2,u)*(1-ease(10.8,16,u)), z=.87+1.78*lift;
  const p=H.p(4.55,6.76-.72*lift,z), left=[p[0]-45,p[1]+1], right=[p[0]+45,p[1]+1];
  person(H,R,3.2+.3*lift,7.85-lift,[[left[0]-5,left[1]+2],[left[0]+4,left[1]+2]],'teal');
  person(H,R,6.4-.55*lift,6.4-.87*lift,[[right[0]-5,right[1]+2],[right[0]+4,right[1]+2]],'coral');
  oval(H,R,p[0],p[1],48,19,'sun',.42);oval(H,R,p[0],p[1]-3,39,14,'paper',1);oval(H,R,p[0],p[1]-5,21,7,'blue',.5);
  for(let n=0;n<12;n++){const a=n*Math.PI/6;H.line(R,[[p[0]+Math.cos(a)*26,p[1]-3+Math.sin(a)*9],[p[0]+Math.cos(a)*43,p[1]+Math.sin(a)*17]],'coral',.7);}
  for(const q of [left,right]) {H.line(R,[[q[0]-4,q[1]+4],[q[0]-4,q[1]+9],[q[0]+4,q[1]+9],[q[0]+4,q[1]+4]],'blue',2.2);oval(H,R,q[0],q[1]+5,4,2,'paper',1);}
  const s=H.p(9.8,.85,2.52);H.line(R,[[s[0],s[1]],[s[0]+8+Math.sin(t*Math.PI*2/18)*2,s[1]+14]],'coral',3);
  const q=H.p(10.44,6.77,.82);stroke(H,R,[q,[q[0]+7,q[1]+16],[q[0]+9+Math.sin(t*Math.PI*2/18),q[1]+24]],'paper',1.4);
});
room.loopSeconds=18;
room.stillTime=9;
export default room;
