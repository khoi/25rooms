import { world, box, shape, oval, stroke, ell } from '../../worlds/common.js';
import { timber, metal, bentTube, cushion, benchFrame, vessel, branchSpray, floorLight } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, hangingRail } from '../joinery.js';
const smooth=x=>{const v=Math.max(0,Math.min(1,x));return v*v*(3-2*v);};
function maker(H, R, i, j, hands, child = false, lean = 0, shirt = 'coral') {
  const [x, y] = H.p(i, j, child ? .35 : 0), s = child ? .85 : 1.2;
  oval(H, R, x + 5, y + 3, 14 * s, 4 * s, 'blue', .2);
  for (const side of [-1, 1]) {
    stroke(H, R, [[x + side * 5 * s, y - 24 * s], [x + side * 6 * s, y - 10 * s], [x + side * 8 * s, y]], 'blue', 7 * s);
    oval(H, R, x + side * 8 * s + 3, y, 6 * s, 2.5 * s, 'blue', .8);
  }
  shape(H, R, [[x - 9 * s, y - 45 * s], [x + 8 * s, y - 46 * s], [x + 10 * s, y - 22 * s], [x - 9 * s, y - 23 * s]], child ? 'sun' : shirt, .67);
  if (!child) shape(H, R, [[x - 5, y - 41], [x + 5, y - 41], [x + 8, y - 24], [x - 7, y - 24]], 'paper', .9);
  oval(H, R, x + lean, y - 55 * s, 8 * s, 9 * s, 'paper', 1);
  shape(H, R, [[x - 8 * s + lean, y - 55 * s], [x - 7 * s + lean, y - 63 * s], [x + 3 * s + lean, y - 65 * s], [x + 8 * s + lean, y - 59 * s], [x - 3 * s + lean, y - 58 * s]], 'blue', .85);
  H.dot(x + 4 * s + lean, y - 54 * s, 1.1, 'blue');
  for (const [n, target] of hands.entries()) {
    const shoulder = [x + (n ? 8 : -8) * s, y - 41 * s], elbow = [(shoulder[0] + target[0]) * .5 + (n ? 4 : -4), (shoulder[1] + target[1]) * .5 + 8];
    stroke(H, R, [shoulder, elbow, target], 'blue', 7 * s);
    stroke(H, R, [shoulder, elbow, target], child ? 'sun' : shirt, 5 * s);
    oval(H, R, ...target, 3 * s, 2.7 * s, 'paper', 1);
  }
}

function leaf(H,R,x,y,size,turn,ink='teal'){
 const c=Math.cos(turn),s=Math.sin(turn),P=(a,b)=>[x+(a*c-b*s)*size,y+(a*s+b*c)*size];
 shape(H,R,[P(0,0),P(-7,-3),P(-10,-11),P(-3,-14),P(0,-10),P(4,-14),P(10,-11),P(7,-4)],ink,.52,.65);
 stroke(H,R,[P(0,0),P(0,-11)],'sun',.55);for(const q of [-1,1])stroke(H,R,[P(0,-4),P(q*6,-9)],'paper',.4,.6);
}
function gloves(H,R,i,j,z,size,ink){
 const [x,y]=H.p(i,j,z),P=(a,b)=>[x+a*size,y+b*size];
 shape(H,R,[P(-6,0),P(5,0),P(5,-12),P(9,-15),P(8,-19),P(3,-15),P(3,-26),P(0,-27),P(-1,-17),P(-2,-28),P(-5,-27),P(-5,-17),P(-7,-26),P(-10,-25),P(-8,-15)],ink,.6);
}
const room=world('istanbul-small-garden','The bean reaches the string',{wall:false,floor:'paper',tone:.76,head:28},(H,R)=>{
 for(let i=0;i<12;i+=1.4)for(let j=0;j<12;j+=1.2)shape(H,R,H.tile(i+.035,j+.035,Math.min(1.32,12-i),Math.min(1.12,12-j),.025),'paper',1,.45);
 for(const [i,j]of [[.8,7.2],[2.8,10.8],[5.6,9.6],[9.8,2.4],[11.2,8.4]]){const p=H.p(i,j,.03);for(let a=-1;a<=1;a++)stroke(H,R,[[p[0]+a*3,p[1]],[p[0]+a*6,p[1]-7-Math.abs(a)*3]],'teal',1);}
 masonry(H,R,'nw',0,11.6,0,2.35,'coral',.23);masonry(H,R,'ne',0,12,0,3.4,'paper',.9);
 windowBay(H,R,'ne',1.2,3.35,1.65,1.36,{ink:'teal',divisions:3});
 timber(H,R,.18,.22,11.6,.22,3.44,.17,'teal');
 bentTube(H,R,[[.2,.1,3.64],[6.2,.1,3.64],[6.2,.24,1.42],[5.9,.65,1.42]],3.5,'teal');
 vessel(H,R,5.5,1.04,.02,27,52,'teal',true);
 const lid=H.p(5.5,1.04,1.19);oval(H,R,...lid,29,9,'teal',.55);oval(H,R,lid[0],lid[1]-1,25,6,'paper',.7);stroke(H,R,[[lid[0]-7,lid[1]],[lid[0]-7,lid[1]-6],[lid[0]+7,lid[1]-6],[lid[0]+7,lid[1]]],'blue',1.5);
 const inlet=H.p(5.94,.76,1.35);oval(H,R,...inlet,7,3,'blue',.65);stroke(H,R,[H.p(5.9,.65,1.42),H.p(5.93,.76,1.34)],'teal',3.5);
 for(const i of [5.08,5.85])timber(H,R,i,.75,.17,.73,.015,.09,'sun');
 shape(H,R,H.tile(5.2,1.68,.81,.59,.025),'teal',.2);

 for(const z of [.38,1.05]){const [x,y]=H.p(5.5,1.04,z);oval(H,R,x,y,27,8,'teal',.13);}
 metal(H,R,5.53,1.73,.1,.34,.29,.11,'coral');
 cabinetFrame(H,R,7.1,.7,4.06,1.28,.23,2.57,3,'sun',(i,j,w,d,z,h,n)=>{
   for(const zz of [.8,1.62])timber(H,R,i,j,w,d,z+zz,.08,'sun');
   if(n===0){for(const [a,b,r]of [[.35,.4,8],[.85,.5,10]])vessel(H,R,i+a,j+b,z+.05,r,15,'paper',true);for(let a=0;a<4;a++)box(H,R,i+.12+a*.23,j+.23,.17,.43,z+.93,.49,'paper',1);}
   if(n===1){for(let a=0;a<3;a++){const p=H.p(i+.18+a*.36,j+.43,z+.09);stroke(H,R,[[p[0],p[1]],[p[0],p[1]-25]],'sun',2);shape(H,R,[[p[0]-4,p[1]-25],[p[0]+4,p[1]-25],[p[0]+3,p[1]-37],[p[0]-3,p[1]-37]],'teal',.6);}cushion(H,R,i+.08,j+.15,w-.16,.69,z+.95,.12,'coral');}
   if(n===2){box(H,R,i+.08,j+.09,w-.16,.72,z+.07,.65,'teal',.6);metal(H,R,i+.45,j+.83,.24,.08,z+.44,.08,'sun');for(let a=0;a<3;a++)cushion(H,R,i+.1,j+.1,w-.2,.77,z+.94+a*.14,.11,'paper');}
   const p=H.p(i+w/2,j+.42,z+1.78);oval(H,R,...p,13,4,'sun',.55);for(let a=-3;a<4;a++)H.line(R,[[p[0]+a*3,p[1]-3],[p[0]+a*3+3,p[1]+3]],'teal',.65);
 });
 hangingRail(H,R,'ne',7.21,3.81,3.04,6,(P,u,n)=>{
   if(n<4){shape(H,R,[P(u-.16,-.18),P(u+.16,-.18),P(u+.18,-.66),P(u-.17,-.62)],'paper',1);const q=P(u,-.4);oval(H,R,...q,4,6,n%2?'coral':'teal',.55);}
   else {const q=P(u,-.4);oval(H,R,...q,8,8,'sun',.55);oval(H,R,...q,4,4,'blue',.6);stroke(H,R,[P(u,-.15),P(u,-.21)],'coral',1);}
 });
 const mesh=H.faceI(9.87,2.01,1.1,.38,1.12);shape(H,R,mesh,'teal',.12);H.clip(mesh,()=>{for(let a=0;a<11;a++){H.line(R,[H.p(9.84+a*.15,2.02,.35),H.p(9.36+a*.15,2.02,1.15)],'blue',.45,{tone:.45});H.line(R,[H.p(9.84+a*.15,2.02,1.15),H.p(9.36+a*.15,2.02,.35)],'blue',.45,{tone:.45});}});
 benchFrame(H,R,.58,5.95,1.13,3.57,1.13,'sun');
 timber(H,R,.67,6.13,.89,3.11,.31,.1,'teal');
 for(const j of [6.31,7.29,8.37]){
   const q=H.p(1.06,j,.43);oval(H,R,...q,13,5,'coral',.5);shape(H,R,[[q[0]-12,q[1]],[q[0]+12,q[1]],[q[0]+9,q[1]-17],[q[0]-9,q[1]-17]],'paper',1);oval(H,R,q[0],q[1]-17,10,3,'blue',.6);
 }
 shape(H,R,H.tile(.68,6.14,.89,1.33,1.15),'blue',.62);
 const sieve=H.p(1.14,6.87,1.23);oval(H,R,...sieve,20,11,'sun',.6);oval(H,R,...sieve,16,8,'paper',1);
 for(let n=-3;n<=3;n++){
   stroke(H,R,[[sieve[0]-13,sieve[1]+n*2],[sieve[0]+13,sieve[1]+n*2]],'teal',.6);
   stroke(H,R,[[sieve[0]+n*4,sieve[1]-6],[sieve[0]+n*4,sieve[1]+6]],'teal',.6);
 }
 metal(H,R,.72,7.81,.73,.84,1.15,.055,'teal');
 shape(H,R,H.tile(.8,7.88,.56,.65,1.21),'coral',.4);
 for(const j of [7.99,8.29]){const q=H.p(1.02,j,1.22);shape(H,R,[[q[0]-5,q[1]],[q[0]+6,q[1]-3],[q[0]+2,q[1]-8]],'blue',.65);stroke(H,R,[[q[0]+2,q[1]-6],[q[0]+7,q[1]-17]],'sun',2);}
 const coil=H.p(1.08,9.12,1.16);for(let n=0;n<4;n++)oval(H,R,coil[0],coil[1]-n*2.5,10,4,'sun',.45);stroke(H,R,[[coil[0]+9,coil[1]-2],[coil[0]+18,coil[1]+5],[coil[0]+15,coil[1]+12]],'coral',.9);
 benchFrame(H,R,2.12,4.3,6.25,1.56,.7,'sun');
 timber(H,R,2.42,4.56,5.29,1.01,.25,.085,'sun');
 for(let n=0;n<4;n++){
   const i=2.66+n*1.2;box(H,R,i,4.66,.91,.81,.35,.23,n===1?'coral':'paper',n===1?.35:1);
   shape(H,R,H.faceI(i+.13,5.48,.66,.4,.52),'teal',.4);
 }


 box(H,R,2.25,4.4,5.99,1.35,.71,.39,'teal',.55);
 shape(H,R,H.tile(2.39,4.51,5.72,1.08,1.11),'blue',.8);
 shape(H,R,H.tile(2.5,4.61,5.5,.86,1.12),'coral',.38);
 for(let n=0;n<9;n++){
   const i=2.32+n*.65;
   shape(H,R,H.faceI(i,5.77,.56,.75,1.04),'teal',.55);
   H.line(R,[H.p(i+.1,5.79,.79),H.p(i+.45,5.79,.99)],'sun',.7);
 }
 for(const i of [2.29,5.14,8.08]){
   metal(H,R,i,5.76,.14,.04,.71,.38,'blue');
   for(const z of [.78,1.02])H.dot(...H.p(i+.07,5.81,z),1.4,'sun');
 }
 for(const j of [4.38,5.67])timber(H,R,2.23,j,6.01,.12,1.1,.075,'sun');
 bentTube(H,R,[[3.43,5.81,.82],[3.43,6.05,.82],[3.43,6.05,.41]],2.2,'teal');
 const dish=H.p(3.43,6.09,.035);oval(H,R,...dish,16,6,'paper',1);oval(H,R,dish[0],dish[1]-2,12,4,'teal',.3);
 for(let n=0;n<18;n++){const i=2.55+(n%9)*.6,j=4.74+Math.floor(n/9)*.41;stroke(H,R,[H.p(i,j,1.13),H.p(i+.15,j+.02,1.13)],'blue',.8,.6);}
 for(const i of [2.25,5.2,8.18])timber(H,R,i,4.32,.13,.13,.13,3.69,'sun');
 for(const z of [1.4,2.32,3.65])timber(H,R,2.2,4.31,6.23,.14,z,.12,'sun');
 for(let i=2.62;i<8.2;i+=.63)stroke(H,R,[H.p(i,4.36,1.14),H.p(i+.035,4.36,2.3),H.p(i,4.36,3.65)],'paper',1.1);
 for(const i of [2.3,5.24,8.21])for(const z of [2.36,3.68])for(let n=0;n<4;n++)stroke(H,R,[H.p(i-.07,4.47,z-.12+n*.055),H.p(i+.19,4.47,z-.01+n*.055)],'coral',1);
 for(let n=0;n<7;n++){
   const i=2.65+n*.78,top=2.7+(n%3)*.39;const vine=[];
   for(let k=0;k<14;k++){const z=1.16+k*(top-1.16)/13;vine.push(H.p(i+Math.sin(k*.86+n)*.1,4.42+(k%2)*.025,z));}
   stroke(H,R,vine,'teal',1.8);
   for(let k=0;k<5;k++){const z=1.36+k*(top-1.3)/5,side=(k+n)%2?1:-1;const p=H.p(i+side*.11,4.49,z);stroke(H,R,[H.p(i,4.44,z-.04),[p[0]+side*8,p[1]-3]],'teal',1);leaf(H,R,p[0]+side*8,p[1]-3,.65+(k%2)*.25,side*.6,k===4&&n%2?'sun':'teal');}
   if(n%2===0){const p=H.p(i+.15,4.48,top-.31);stroke(H,R,[[p[0],p[1]],[p[0]+6,p[1]+9],[p[0]+4,p[1]+19]],'teal',3);}
 }
 for(const n of [0,1,2,3,4,5]){
   const i=2.96+n*.82, h=2.48+(n%3)*.42;
   stroke(H,R,[H.p(i,4.86,1.15),H.p(i-.2,4.82,1.72),H.p(i+.05,4.76,h)],'teal',1.6);
   for(let k=0;k<4;k++){
     const z=1.41+k*(h-1.35)/4, side=(n+k)%2?1:-1;
     const q=H.p(i+side*.19,4.88,z);leaf(H,R,q[0],q[1],.82+k*.07,side*.71,k===3&&n===1?'sun':'teal');
   }
   if(n%2){const q=H.p(i+.18,4.87,h-.17);for(const a of [-1,1]){oval(H,R,q[0]+a*3,q[1]-2,3,4,'paper',1);oval(H,R,q[0],q[1]+2,3,4,'sun',.6);}H.dot(q[0],q[1],1.4,'coral');}
 }
 for(const i of [2.62,4.35]){
   const hoop=[];for(let n=0;n<=16;n++){const a=n/16*Math.PI;hoop.push(H.p(i,4.97+Math.cos(a)*.48,1.12+Math.sin(a)*.71));}stroke(H,R,hoop,'sun',2);
 }
 stroke(H,R,[H.p(7.7,4.55,3.72),H.p(8.75,4.55,3.56),H.p(9.57,4.55,3.11)],'sun',2);
 const bell=H.p(9.57,4.55,2.81);stroke(H,R,[H.p(9.57,4.55,3.11),[bell[0],bell[1]-5]],'blue',.8);shape(H,R,[[bell[0]-5,bell[1]],[bell[0]+5,bell[1]],[bell[0]+3,bell[1]-8],[bell[0]-3,bell[1]-8]],'sun',.7);
 timber(H,R,.33,6.2,.16,3.2,2.35,.12,'sun');
 for(let n=0;n<4;n++){const p=H.p(.51,6.5+n*.48,2.34);stroke(H,R,[[p[0],p[1]],[p[0]+2,p[1]+9]],'blue',.7);stroke(H,R,[[p[0]+2,p[1]+9],[p[0]+6,p[1]+22],[p[0]+3,p[1]+31]],'sun',2.5);}
 gloves(H,R,.56,8.95,2.11,1.1,'teal');gloves(H,R,.62,8.97,1.92,.54,'coral');
 benchFrame(H,R,2.1,8.9,3.14,1.7,.58,'teal');
 metal(H,R,2.3,9.09,1.6,1.21,.59,.1,'teal');for(let i=0;i<4;i++)for(let j=0;j<3;j++){const p=H.p(2.52+i*.36,9.29+j*.32,.7);oval(H,R,...p,4,2,'blue',.7);stroke(H,R,[[p[0],p[1]],[p[0],p[1]-8]],'teal',.8);leaf(H,R,p[0],p[1]-6,.28,(i+j)%2?.7:-.7);}
 for(const i of [2.36,3.75])stroke(H,R,[H.p(i,9.11,.73),H.p(i,9.11,1.13),H.p(i,10.19,1.13),H.p(i,10.19,.73)],'sun',1.6);
 for(let n=0;n<6;n++)H.line(R,[H.p(2.42+n*.25,9.13,1.14),H.p(2.42+n*.25,10.17,1.14)],'teal',.45,{tone:.4});
 vessel(H,R,4.43,9.77,.6,10,24,'paper',true);const jar=H.p(4.43,9.77,.6);for(let n=0;n<3;n++)stroke(H,R,[[jar[0]-5+n*4,jar[1]-22],[jar[0]-6+n*4,jar[1]-11],[jar[0]-2+n*3,jar[1]-2]],'sun',.85);oval(H,R,jar[0],jar[1]-15,11,3,'coral',.18);
 stroke(H,R,[H.p(4.17,9.76,.76),H.p(4.68,9.76,.76)],'coral',3.5);
 metal(H,R,4.59,9.79,.12,.08,.72,.14,'sun');
 shape(H,R,H.tile(4.65,9.19,.42,.47,.61),'paper',1);const seed=H.p(4.86,9.38,.62);oval(H,R,...seed,3,4,'coral',.65);
 vessel(H,R,5.54,9.87,.04,16,22,'paper',true);const pot=H.p(5.54,9.87,.04);stroke(H,R,[[pot[0]+7,pot[1]-20],[pot[0]+3,pot[1]-13],[pot[0]+7,pot[1]-5]],'coral',1.1);
 for(let n=0;n<3;n++)H.line(R,[[pot[0]+2,pot[1]-16+n*4],[pot[0]+9,pot[1]-16+n*4]],'sun',1.1);
 benchFrame(H,R,9.12,8.77,2.03,1.22,.55,'sun');cushion(H,R,9.27,8.87,1.2,.92,.56,.11,'paper');
 const hat=H.p(10.52,9.45,.59);oval(H,R,...hat,17,6,'sun',.55);oval(H,R,hat[0],hat[1]-7,9,8,'sun',.55);stroke(H,R,[[hat[0]-8,hat[1]-4],[hat[0]+8,hat[1]-4]],'coral',2);
 vessel(H,R,10.69,7.32,.02,7,12,'coral',true);stroke(H,R,[H.p(10.78,7.3,.23),H.p(11.02,7.25,.42),H.p(11.22,7.22,.4)],'coral',3);
 const grate=H.tile(9.1,10.65,1.15,.45,.03);shape(H,R,grate,'blue',.6);for(let n=0;n<8;n++)H.line(R,[H.p(9.16+n*.13,10.68,.04),H.p(9.16+n*.13,11.05,.04)],'paper',.9);
 box(H,R,.89,10.2,1.4,1.14,.05,.48,'sun',.5);
 shape(H,R,H.tile(1.01,10.31,1.16,.91,.54),'blue',.72);
 for(let n=0;n<7;n++){
   const q=H.p(1.15+n%3*.34,10.44+Math.floor(n/3)*.27,.55);leaf(H,R,q[0],q[1],.3+n%2*.12,n*.8,n%3?'teal':'coral');
 }
 for(const z of [.16,.32,.46])H.line(R,[H.p(.97,11.36,z),H.p(2.24,11.36,z)],'paper',1);
 const fork=H.p(2.06,10.52,.6);stroke(H,R,[[fork[0],fork[1]],[fork[0]+5,fork[1]-23]],'sun',2.3);for(const d of [-3,0,3])stroke(H,R,[[fork[0]+d,fork[1]+3],[fork[0]+d,fork[1]-7]],'blue',1);
 const hose=[];for(let n=0;n<40;n++){const a=n/39*Math.PI*4.2;hose.push(H.p(6.16+Math.cos(a)*(.37+n*.003),1.87+Math.sin(a)*(.28+n*.002),.07));}stroke(H,R,hose,'teal',2.2);
 stroke(H,R,[H.p(5.62,1.9,.35),H.p(5.74,2.2,.13),H.p(6.13,2.15,.08)],'teal',2.2);
 floorLight(H,6.35,6.8,150,.36);
},(H,R,time)=>{
 const u=((time%22)+22)%22,p=smooth((u-4.4)/4.4)*(1-smooth((u-13.2)/6.8));
 const stem=[];for(let n=0;n<13;n++)stem.push(H.p(7.46+Math.sin(n*.5)*.035,5.35,1.12+n*.09));stroke(H,R,stem,'teal',1.8);
 for(const [z,side]of [[1.45,-1],[1.72,1],[2.03,-1]]){const p=H.p(7.46,5.35,z);leaf(H,R,p[0]+side*7,p[1]-.5,.65,side*.7);}
 stroke(H,R,[H.p(7.57,5.32,1.1),H.p(7.57,5.32,2.7)],'sun',2);
 const a=H.p(7.43-p*.16,5.41,1.82),b=H.p(7.72+p*.24,5.43,1.82),middle=H.p(7.57,5.39,1.73-p*.09);
 stroke(H,R,[a,[a[0]+3,a[1]-5-p*4],b,middle,a],'coral',1.25);
 const contact=smooth((u-.5)/2)*(1-smooth((u-18.5)/1.5));const rest=H.p(7.65,6.14,1.05),hand=[rest[0]+(a[0]-rest[0])*contact,rest[1]+(a[1]-rest[1])*contact];
 maker(H,R,7.71,6.03,[H.p(7.72,5.62,1.68),hand],false,p*1.4);
 const end=H.p(8.67,5.6,1.78);stroke(H,R,[b,H.p(8.12,5.54,1.54-p*.08),end],'coral',1.1);
 maker(H,R,9.02,5.72,[end,H.p(8.62,5.91,1.06)],false,-p*2,'teal');
 const tendril=[];for(let n=0;n<18;n++){const f=n/17;tendril.push(H.p(7.17+f*.5+Math.sin(f*12)*.04,5.62+f*.47,.9-f*.77));}stroke(H,R,tendril,'teal',1.1);
 const lace=H.p(7.77,6.04,.03);stroke(H,R,[[lace[0]-5,lace[1]-2],[lace[0]-13,lace[1]-8],[lace[0]-16,lace[1]-4]],'paper',1.1);
 const bag=.035*Math.sin(u*Math.PI/11);const f=[H.p(.6,9.49,2.26),H.p(.6,9.98,2.26),H.p(.7+bag,10.01,1.64),H.p(.7+bag,9.49,1.64)];shape(H,R,f,'paper',.5);for(let n=0;n<7;n++)stroke(H,R,[H.p(.62,9.53+n*.065,2.22),H.p(.72+bag,9.53+n*.065,1.67)],'teal',.6);
});
room.loopSeconds=22;
room.stillTime=10.5;
export default room;
