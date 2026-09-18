import { world, shape, oval, stroke, cycle, mix, wallPt, wallRect } from '../../worlds/common.js';
import { timber, metal, bentTube, vessel, benchFrame, cushion, drape, pendant, floorLight } from '../materials.js';
import { cabinetFrame, basin, masonry } from '../structure.js';
import { windowBay, wallRack, recessedFrame, caster, cornice, panelFront } from '../joinery.js';
import { foldedCloth, shallowTray, liddedTin, slattedCrate, handTool } from '../furnishings.js';

const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };
function person(H, R, i, j, ink, seated = false, nod = 0) {
  const [x, y] = H.p(i, j), h = seated ? 54 : 75, hip = y - (seated ? 13 : 32), sy = y - h + 23;
  H.tint([[x - 14, y + 1], [x + 22, y + 3], [x + 30, y + 9], [x - 3, y + 8]], 'blue', .16);
  for (const s of [-1, 1]) {
    stroke(H, R, [[x + s * 5, hip], [x + s * 10 + (seated ? 7 : 0), y - 14], [x + s * 10 + (seated ? 9 : 0), y - 2]], 'blue', 7);
    oval(H, R, x + s * 10 + (seated ? 12 : 3), y, 7, 3, 'blue', .8);
  }
  shape(H, R, [[x - 10, sy], [x + 10, sy], [x + 12, hip + 3], [x - 11, hip + 3]], ink, .68, .8);
  shape(H,R,[[x-4,sy+7],[x+4,sy+7],[x+7,hip+1],[x-6,hip+1]],'paper',.88,.55);
  H.line(R,[[x-5,hip-8],[x+5,hip-8]],ink,.8);
  const hy = y - h + 10 + nod;
  oval(H, R, x + 1, hy, 9, 10, 'coral', .36);
  shape(H, R, [[x - 8, hy], [x - 10, hy - 7], [x - 3, hy - 12], [x + 7, hy - 10], [x + 10, hy - 4], [x + 4, hy - 5]], 'blue', .82, .6);
  H.dot(x + 5, hy + 1, 1, 'blue'); stroke(H, R, [[x + 5, hy + 5], [x + 2, hy + 6], [x, hy + 5]], 'blue', .6);
  return (left, right) => {
    for (const [s, hand] of [[-1, left], [1, right]]) {
      const target = hand || [x + s * 14, hip - 2];
      stroke(H, R, [[x + s * 9, sy + 3], [mix(x + s * 14, target[0], .45), Math.max(sy + 12, target[1] + 8)], target], 'blue', 6.5);
      stroke(H, R, [[x + s * 9, sy + 3], [mix(x + s * 14, target[0], .45), Math.max(sy + 12, target[1] + 8)], target], ink, 4.8);
      oval(H, R, ...target, 3.2, 3, 'coral', .38);
    }
  };
}

function dish(H, R, i, j, z, size = 10, ink = 'paper') {
  const p = H.p(i, j, z); oval(H, R, ...p, size, size * .41, ink, .94); oval(H, R, p[0], p[1] - .7, size * .71, size * .25, ink === 'paper' ? 'teal' : 'paper', .24);
}
function pot(H, R, i, j, z) {
  vessel(H, R, i, j, z, 22, 27, 'blue', false);
  const [x,y] = H.p(i,j,z); oval(H,R,x,y-28,23,8,'teal',.65); oval(H,R,x,y-32,5,3,'blue',.85);
  H.line(R,[[x-16,y-29],[x-3,y-33],[x+13,y-29]],'paper',1.2);
  for(let n=0;n<4;n++) H.line(R,[[x+21,y-18+n*2],[x+28,y-18+n*2]],'sun',1.1);
}
function ledge(H,R) {
  timber(H,R,2.48,5.35,6.8,1.17,.3,.11,'teal');
  for(const i of [4.72,7.06])timber(H,R,i,5.24,.1,1.32,.32,.85,'teal');
  for(let n=0;n<5;n++)dish(H,R,3.54,6.12,.44+n*.08,14);
  for(let n=0;n<3;n++)dish(H,R,5.74,6.18,.44+n*.07,10,'coral');
  foldedCloth(H,R,7.48,5.77,1.52,.71,.43,'paper','teal');
  benchFrame(H,R,2.35,5.15,7.1,1.53,1.37,'sun');
  timber(H,R,2.24,5.05,.24,1.74,.2,1.25,'teal');
  for(const i of [2.85,5.12,7.37]) {
    foldedCloth(H,R,i,5.38,1.34,.89,1.4,'paper','teal');
    H.line(R,[H.p(i,5.35,1.52),H.p(i+1.34,5.35,1.52)],'coral',1.1);
  }
  shape(H,R,H.faceI(8.2,6.75,.81,.67,1.08),'teal',.36,.7);
  bentTube(H,R,[[8.41,6.76,.91],[8.41,6.85,.91],[8.79,6.85,.91],[8.79,6.76,.91]],1.6,'sun');
  timber(H,R,2.35,6.69,7.1,.055,1.11,.17,'sun');
  for(const i of [2.56,4.7,7.09,9.11]){metal(H,R,i,6.64,.18,.08,.99,.24,'teal');for(const z of [1.04,1.18])H.dot(...H.p(i+.09,6.74,z),.9,'sun');}
  for(const i of [4.8,7.04])H.line(R,[H.p(i,5.21,1.39),H.p(i,6.54,1.39)],'blue',.7);
  for(const i of [2.65,8.96])H.line(R,[H.p(i,5.37,1.4),H.p(i,6.31,1.4)],'paper',1.5);
  const p=H.p(3.03,6.77,1.2); stroke(H,R,[[p[0],p[1]],[p[0]+2,p[1]+12],[p[0]+3,p[1]+25]],'blue',2.2); oval(H,R,p[0]+3,p[1]+29,5,6,'teal',.6);
  for(let n=0;n<5;n++) H.line(R,[[p[0]-2,p[1]+4+n*2],[p[0]+4,p[1]+4+n*2]],'paper',1.2);
}
function tray(H,R,i,z) {
  const j=5.56;
  metal(H,R,i-1.06,j-.42,2.12,.85,z,.08,'blue');
  shape(H,R,H.tile(i-.91,j-.31,1.82,.62,z+.085),'teal',.18,.55);
  for(const x of [i-1.12,i+1.01]) {
    bentTube(H,R,[[x,j-.24,z+.06],[x+(x<i?-.16:.16),j-.24,z+.14],[x+(x<i?-.16:.16),j+.24,z+.14],[x,j+.24,z+.06]],2.8,'paper');
    for(let n=0;n<5;n++) H.line(R,[H.p(x+(x<i?-.18:.18),j-.15+n*.07,z+.14),H.p(x+(x<i?-.09:.09),j-.12+n*.07,z+.14)],x<i?'sun':'coral',1.4);
  }
  H.line(R,[H.p(i-.9,j+.43,z+.1),H.p(i+.56,j+.43,z+.1)],'paper',1.5);
  shape(H,R,H.tile(i+.81,j+.19,.22,.22,z+.1),'sun',.7,.5);
  for(const a of [.85,.99]) H.dot(...H.p(i+a,j+.26,z+.12),.8,'blue');
}
const room = world('cape-town-shared-kitchen','A tray wide enough for three',{floor:'paper',tone:.9,wall:'paper',wallTone:.8,height:3.7,pattern:'tiles',accent:'teal',head:40},(H,R)=>{
  for(const side of ['ne','nw']) {
    shape(H,R,wallRect(H,side,0,12,.04,.69,-.08),'teal',.3,.6);
    cornice(H,R,side,0,12,3.58,'paper');
  }
  windowBay(H,R,'nw',1.0,2.45,1.05,2.17,{divisions:2,view:P=>{shape(H,R,[P(.14,.13),P(2.31,.13),P(2.31,.72),P(1.8,.92),P(1.25,.58),P(.14,.72)],'coral',.23,.4);}});
  recessedFrame(H,R,'nw',5.1,4.7,1.1,1.85,'sun',P=>{
    shape(H,R,[P(.14,.14),P(4.56,.14),P(4.56,1.7),P(.14,1.7)],'blue',.56,.5);
    for(const z of [.53,1.12]){
      H.line(R,[P(.17,z),P(4.5,z)],'sun',4);
      for(const u of [.55,2.08,3.64]){
        const q=P(u,z+.1);oval(H,R,q[0],q[1]-3,12,4,'paper',.98);oval(H,R,q[0],q[1]-6,10,3,'teal',.3);
        if(z<1)for(let n=0;n<3;n++)H.line(R,[[q[0]-9,q[1]+n*2],[q[0]+9,q[1]+n*2]],'paper',1.5);
      }
    }
    for(const u of [1.43,3.01])H.line(R,[P(u,.15),P(u,1.66)],'teal',3);
    const q=P(4.1,1.47);oval(H,R,...q,5,4,'coral',.7);

  });
  timber(H,R,.09,5.02,.86,4.91,1.03,.16,'sun');
  for(const j of [5.35,9.5]) bentTube(H,R,[[.7,j,1.0],[.13,j,.6]],2.8,'teal');
  cabinetFrame(H,R,6.9,.18,4.7,1.45,.12,3.37,3,'teal',(i,j,w,d,z,h,col)=>{
    for(const level of [.73,1.54,2.3]) timber(H,R,i,j,w,d,z+level,.085,'sun');
    if(col===0) {
      for(let n=0;n<5;n++) {const x=i+.15+n*.2; metal(H,R,x,j+.12,.07,.86,z+1.64,.56,'blue'); H.line(R,[H.p(x,j+.98,z+1.7),H.p(x,j+.98,z+2.15)],'paper',1);}
      for(let n=0;n<3;n++) dish(H,R,i+.65,j+.5,z+.83+n*.07,13);
      vessel(H,R,i+.68,j+.5,z+.5,15,16,'coral');
      dish(H,R,i+.68,j+.5,z+2.6,9,'sun');
    } else if(col===1) {
      for(let n=0;n<2;n++) liddedTin(H,R,i+.35+n*.65,j+.6,z+1.62,9,17,n?'sun':'teal');
      slattedCrate(H,R,i+.08,j+.12,w-.13,.95,z+.81,.44,'sun');
      for(let n=0;n<4;n++) {const p=H.p(i+.23+n*.24,j+.55,z+1.32);oval(H,R,p[0],p[1],5,3,'paper',.9);H.line(R,[[p[0]-2,p[1]-1],[p[0]+1,p[1]+2]],'coral',.7);}
      panelFront(H,R,i,j+d,w,z,.68,1,'teal');
    } else {
      foldedCloth(H,R,i+.07,j+.12,w-.17,.9,z+1.63,'paper','coral');
      metal(H,R,i+.08,j+.08,w-.16,.97,z,.53,'teal'); for(const x of [i+.18,i+w-.22]) caster(H,R,x,j+.88,z-.05);
      bentTube(H,R,[[i+.12,j+.9,z+.52],[i+.12,j+.9,z+1.0],[i+w-.13,j+.9,z+1.0],[i+w-.13,j+.9,z+.52]],1.8,'blue');
      vessel(H,R,i+.6,j+.53,z+2.54,10,13,'paper');
    }
  });
  cabinetFrame(H,R,1.58,1.58,4.72,1.8,.08,1.15,3,'teal',(i,j,w,d,z,h,col)=>{
    if(col===0){
      metal(H,R,i+.05,j+.18,w-.1,1.21,z+.03,.71,'blue');
      shape(H,R,H.faceI(i+.18,j+1.44,w-.36,z+.15,z+.57),'blue',.9,.6);
      H.line(R,[H.p(i+.19,j+1.48,z+.66),H.p(i+w-.18,j+1.48,z+.66)],'paper',2);
      for(const x of [.31,.72,1.08])oval(H,R,...H.p(i+x,j+1.47,z+.82),2.5,2.5,'sun',.8);
    }else if(col===1){
      panelFront(H,R,i,j+1.5,w,z,.8,1,'teal');
      for(let n=0;n<3;n++)H.line(R,[H.p(i+.17,j+1.54,z+.16+n*.14),H.p(i+w-.17,j+1.54,z+.16+n*.14)],'blue',.8);
    }else{
      bentTube(H,R,[[i+.7,j+.6,z+.95],[i+.7,j+.6,z+.53],[i+.38,j+.6,z+.4],[i+.38,j+.13,z+.4]],3.2,'paper');
      vessel(H,R,i+.93,j+.82,z+.08,9,15,'coral');
      foldedCloth(H,R,i+.12,j+.29,.49,.72,z+.09,'paper','teal');
    }
  });
  timber(H,R,1.51,1.52,4.86,1.91,1.19,.13,'paper');
  basin(H,R,4.43,1.69,1.65,1.43,1.23);
  metal(H,R,1.78,1.78,2.26,1.44,1.25,.12,'blue');
  for(const x of [2.35,3.4]) oval(H,R,...H.p(x,2.44,1.38),15,7,'blue',.8);
  pot(H,R,2.88,2.37,1.4); liddedTin(H,R,1.95,2.6,1.4,8,12,'coral');
  bentTube(H,R,[[2.25,1.6,.17],[2.25,1.6,1.1],[3.75,1.6,1.1]],2.2,'teal');
  const vent=(u,z)=>wallPt(H,'nw',.35+u,z,-.18);
  shape(H,R,[vent(0,2.63),vent(.52,2.63),vent(.52,3.22),vent(0,3.22)],'teal',.35,.7);
  for(let n=0;n<6;n++)H.line(R,[vent(.07,2.72+n*.08),vent(.46,2.72+n*.08)],'blue',.9);
  bentTube(H,R,[[.14,3.93,.23],[.14,3.93,3.26],[.14,.14,3.26],[4.96,.14,3.26],[4.96,.14,2.1]],1.8,'teal');
  metal(H,R,4.81,.13,.33,.12,1.91,.38,'paper');
  for(const z of [2.04,2.15])H.dot(...H.p(4.99,.29,z),1.2,'blue');
  for(const j of [3.91,4.45]){
    const q=H.p(.32,j,2.11);H.line(R,[[q[0],q[1]],[q[0]+4,q[1]+9]],'blue',1.3);
    shape(H,R,[[q[0]-6,q[1]+10],[q[0]+7,q[1]+9],[q[0]+11,q[1]+34],[q[0]-8,q[1]+36]],j<4?'coral':'paper',.7,.7);
    H.line(R,[[q[0],q[1]+14],[q[0]+2,q[1]+31]],'sun',1);
  }
  wallRack(H,R,'ne',1.1,5.1,2.39,1.12,1,'sun',(P,z)=>{
    const [x,y]=P(.6,z+.13); oval(H,R,x,y-13,7,8,'paper',.9); stroke(H,R,[[x+6,y-17],[x+12,y-18],[x+12,y-8],[x+6,y-8]],'coral',1.6);
    H.line(R,[[x-6,y-14],[x+5,y-7]],'sun',1.2);
    const q=P(2.05,z+.24);oval(H,R,q[0],q[1],9,10,'paper',.95);H.line(R,[[q[0],q[1]-6],[q[0],q[1]],[q[0]+4,q[1]+2]],'blue',.8);
    shape(H,R,[P(3.0,z+.07),P(4.22,z+.07),P(4.22,z+.77),P(3,z+.77)],'paper',1,.6);
    for(let n=0;n<3;n++){const p=P(3.3+n*.32,z+.39);oval(H,R,p[0],p[1]-3,2.6,3,'coral',.6);H.line(R,[[p[0],p[1]],[p[0],p[1]+9]],n===1?'teal':'sun',4);}
  });
  benchFrame(H,R,1.0,8.25,3.72,2.08,.91,'sun');
  timber(H,R,1.17,8.44,3.35,1.68,.28,.11,'teal');
  slattedCrate(H,R,1.25,8.53,1.67,1.26,.4,.37,'sun');
  for(let n=0;n<4;n++){const q=H.p(1.47+n*.36,8.96,.83);oval(H,R,...q,7,5,n%2?'sun':'coral',.7);}
  vessel(H,R,3.66,9.21,.4,16,15,'paper');
  timber(H,R,3.33,8.47,1.13,.9,.93,.09,'sun');
  for(let n=0;n<4;n++){const q=H.p(3.63+n*.16,8.94,1.07);oval(H,R,...q,3.7,3,'coral',.75);}
  const knife=H.p(4.02,8.68,1.05);shape(H,R,[[knife[0]-9,knife[1]+3],[knife[0]+7,knife[1]-5],[knife[0]+10,knife[1]-1],[knife[0]-5,knife[1]+7]],'paper',1,.6);H.line(R,[[knife[0]-8,knife[1]+6],[knife[0]-18,knife[1]+11]],'teal',3);
  drape(H,R,3.53,9.6,1.02,.59,.97,.52,'paper');
  for(let n=0;n<5;n++)H.line(R,[H.p(3.64+n*.17,10.2,.49),H.p(3.64+n*.17,10.2,.9)],'coral',.8);

  timber(H,R,1.23,8.57,1.04,.94,.92,.08,'sun'); handTool(H,R,1.6,9.0,1.02,'brush','teal',.45);
  vessel(H,R,2.88,9.2,.95,15,9,'paper',false); oval(H,R,...H.p(2.88,9.2,1.25),3,2,'coral',.75);
  vessel(H,R,2.83,8.6,.97,7,10,'teal');
  vessel(H,R,1.83,9.62,.96,13,8,'paper');for(const [dx,dy,ink]of[[-6,-5,'teal'],[1,-7,'coral'],[7,-4,'sun']]){const p=H.p(1.83,9.62,1.2);oval(H,R,p[0]+dx,p[1]+dy,5,4,ink,.67);H.line(R,[[p[0]+dx,p[1]+dy-3],[p[0]+dx+2,p[1]+dy-7]],'teal',.9);}
  for(const i of [9.74,11.25])for(const j of [6.82,8.57]){metal(H,R,i,j,.09,.09,.15,1.06,'teal');caster(H,R,i+.045,j+.045,.08);}
  metal(H,R,9.7,6.78,1.69,1.89,.24,.06,'teal');
  metal(H,R,9.7,6.78,1.69,1.89,1.03,.07,'paper');
  foldedCloth(H,R,9.96,7.05,1.07,1.09,.33,'paper','teal');
  bentTube(H,R,[[9.75,6.86,1.1],[9.75,6.86,1.52],[9.75,8.44,1.52],[9.75,8.44,1.1]],2.3,'teal');
  shallowTray(H,R,9.73,6.75,1.7,2.19,1.11,'teal'); cushion(H,R,9.85,6.88,1.45,1.83,1.29,.1,'paper');
  shape(H,R,H.tile(10.01,7.03,1.03,1.07,1.41),'blue',.34,.55); shape(H,R,H.tile(10.95,7.95,.23,.6,1.41),'blue',.4,.45);
  foldedCloth(H,R,9.98,8.14,.86,.43,1.43,'paper','coral');
  drape(H,R,10.0,9.3,1.28,.72,.66,.47,'coral'); slattedCrate(H,R,9.85,9.25,1.6,1.01,.03,.53,'sun');
  metal(H,R,4.22,11.0,3.97,.65,.015,.08,'paper'); floorLight(H,5.6,5.7,177,.53);
  pendant(H,R,5.7,5.3,4.2,2.95,'sun',.8);
},(H,R,time)=>{
  const t=cycle(time,16)*16;
  const travel=ease(3.2,6.4,t)*(1-ease(9.6,13.1,t));
  const i=3.72+travel*4.02,z=1.53+.24*ease(.8,2.7,t)*(1-ease(13.1,14,t));
  const arms=[];
  for(const [n,x] of [3.6,5.83,8.04].entries()) arms.push(person(H,R,x,4.83,['coral','teal','sun'][n],false,n===2?Math.sin(Math.PI*ease(7.2,8.8,t))*2:0));
  ledge(H,R); tray(H,R,i,z);
  for(const [n,x] of [3.6,5.83,8.04].entries()) {
    const d=x-i,near=1-ease(1.18,2.14,Math.abs(d)),both=1-ease(.45,.92,Math.abs(d));
    const a=H.p(x-.16,5.08,1.31),b=H.p(x+.35,5.08,1.31),left=H.p(i-1.19+both*.94,5.51-both*.07,z+.12-both*.08),right=H.p(i+1.19,5.64,z+.12);
    const wl=near*Math.max(both,1-ease(-.1,.5,d)),wr=near*Math.max(both,ease(-.5,.1,d));
    arms[n](a.map((v,k)=>mix(v,left[k],wl)),b.map((v,k)=>mix(v,right[k],wr)));
  }
});
room.loopSeconds=16;
room.stillTime=4.3;
export default room;
