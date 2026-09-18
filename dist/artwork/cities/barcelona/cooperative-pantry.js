import { world, box, shape, oval, stroke, ell, cycle, wallPt, wallRect } from '../../worlds/common.js';
import { timber, metal, benchFrame, drape, floorLight, vessel, bentTube } from '../materials.js';
import { cabinetFrame, basin } from '../structure.js';
import { windowBay, wallRack, caster, hangingRail } from '../joinery.js';

const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };

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

function jar(H, R, i, j, z, r = 9, h = 20, lid = 'teal', full = false) {
  const [x, y] = H.p(i, j, z);
  const q = [[x-r,y-2],[x+r,y-2],[x+r,y-h+4],[x+r-3,y-h],[x-r+3,y-h],[x-r,y-h+4]];
  shape(H, R, q, 'paper', 1, .7);
  H.tint(q, 'teal', .1);
  if (full) { H.clip(q, () => { H.fill([[x-r,y-2],[x+r,y-2],[x+r,y-h*.65],[x-r,y-h*.65]], 'sun', .65); for (let n=0;n<13;n++) H.dot(x-r+3+(n*7)%(r*2-5),y-3-((n*11)%(h*.55)),1.25,'coral',.5); }); }
  oval(H, R, x, y-h, r-2, 2.5, lid, .65);
  H.line(R, [[x-r+3,y-h+5],[x-r+3,y-5]], 'paper', 2.2);
  H.line(R, [[x-r+1,y-3],[x+r-1,y-3]], 'blue', .55, {tone:.35});
}

function sack(H, R, i, j, z, ink = 'paper', patch = false) {
  const [x,y]=H.p(i,j,z), q=[[x-16,y],[x+15,y],[x+18,y-27],[x+10,y-35],[x-9,y-35],[x-18,y-25]];
  shape(H,R,q,ink,ink==='paper'?1:.6); stroke(H,R,[[x-10,y-31],[x,y-27],[x+10,y-31]],'blue',.7);
  stroke(H,R,[[x-10,y-26],[x-12,y-8],[x-6,y-2]],'sun',1.1); stroke(H,R,[[x+11,y-24],[x+9,y-4]],'blue',.7,.4);
  if(patch){shape(H,R,[[x-9,y-12],[x+6,y-12],[x+7,y-3],[x-8,y-3]],'coral',.4,.5);for(let n=0;n<5;n++) H.line(R,[[x-8+n*3,y-12],[x-7+n*3,y-10]],'blue',.55);}
}

const room = world('barcelona-cooperative-pantry', 'A jar for everyone', {floor:'sun',tone:.16,pattern:'tiles',accent:'teal',wall:'paper',wallTone:.85,height:3.8,head:28}, (H,R)=>{
  for(const side of ['ne','nw']) { shape(H,R,wallRect(H,side,.08,11.9,.08,.65,-.07),'teal',.28); H.line(R,[wallPt(H,side,.1,.67,-.12),wallPt(H,side,11.9,.67,-.12)],'blue',1.6); }
  windowBay(H,R,'nw',1,4.2,2.25,1.28,{ink:'teal',divisions:4});
  windowBay(H,R,'ne',1,4.9,2.5,1.08,{ink:'sun',divisions:4});
  for(const side of ['nw','ne']) {
    H.line(R,[wallPt(H,side,.05,3.7,-.1),wallPt(H,side,11.94,3.7,-.1)],'teal',5);
    H.line(R,[wallPt(H,side,.05,3.74,-.12),wallPt(H,side,11.94,3.74,-.12)],'sun',1.6);
  }
  shape(H,R,wallRect(H,'nw',5.65,11.5,.82,2.38,-.11),'paper',1,.7);
  for(let u=5.7;u<11.5;u+=.45)for(let z=.86;z<2.3;z+=.38) H.outline(R,wallRect(H,'nw',u,Math.min(u+.44,11.5),z,z+.36,-.12),'teal',.55,{tone:.5});
  bentTube(H,R,[[.22,5.72,.08],[.22,5.72,1.72],[.22,7.07,1.72]],2.4,'teal');
  for(const j of [5.75,6.25,6.75])metal(H,R,.16,j,.12,.09,1.62,.2,'paper');
  wallRack(H,R,'ne',6.72,4.57,3.35,.39,1,'sun',(P,z)=>{
    for(let n=0;n<3;n++){const q=P(.45+n*.85,z+.03);oval(H,R,q[0],q[1]-5,6,4,n===1?'coral':'teal',.6);oval(H,R,q[0],q[1]-5,3,2,'paper',1);}
    const q=P(3.6,z+.05);shape(H,R,[[q[0]-7,q[1]-16],[q[0]+7,q[1]-16],[q[0]+2,q[1]-5],[q[0]+2,q[1]+2],[q[0]-2,q[1]+2],[q[0]-2,q[1]-5]],'paper',1,.7);
  });
  floorLight(H,4.8,5,140,.34);
  cabinetFrame(H,R,.4,.65,5.45,2.1,.02,1.11,4,'sun',(i,j,w,d,z,h,n)=>{
    timber(H,R,i,j,w,d,.23,.07,'sun');
    if(n===1){
      shape(H,R,H.faceI(i+.08,j+d+.01,w-.16,.32,.95),'blue',.65,.7);
      for(let k=0;k<3;k++)jar(H,R,i+.24+k*.32,j+d-.25,.34,5.8,15,k===2?'coral':'teal');
      timber(H,R,i-.06,j+d+.03,w+.02,.1,.28,.13,'sun');
    } else for(let r=0;r<2;r++){
      const z0=.3+r*.36;shape(H,R,H.faceI(i+.07,j+d+.035,w-.14,z0,z0+.29),'sun',.38,.8);
      shape(H,R,H.faceI(i+.14,j+d+.045,w-.28,z0+.05,z0+.23),'sun',.22,.6);
      H.line(R,[H.p(i+w*.36,j+d+.065,z0+.18),H.p(i+w*.65,j+d+.065,z0+.18)],'blue',2.1);
      H.line(R,[H.p(i+w*.36,j+d+.07,z0+.21),H.p(i+w*.65,j+d+.07,z0+.21)],'paper',.7);
    }
  });
  timber(H,R,.3,.53,5.67,2.33,1.13,.16,'sun');
  for(let n=0;n<4;n++) {
    const i=1+n*1.35;
    metal(H,R,i-.28,1.05,.56,.58,1.29,.15,'teal');
    for(const dx of [-.32,.32]) metal(H,R,i+dx,1.05,.09,.09,1.3,1.48,'teal');
    const [x,y]=H.p(i,1.9,2.65), h=40;
    shape(H,R,[[x-16,y-4],[x+16,y-4],[x+16,y-h],[x-16,y-h]],'paper',1);
    H.fill([[x-13,y-4],[x+13,y-4],[x+13,y-h*(.5+n*.09)],[x-13,y-h*(.5+n*.09)]],n%2?'coral':'sun',.55);
    H.clip([[x-13,y-4],[x+13,y-4],[x+13,y-h],[x-13,y-h]],()=>{for(let k=0;k<32;k++) { const py=y-7-(k*11)%Math.floor(h*(.46+n*.09)); oval(H,R,x-10+(k*7)%22,py,1.9,1.25,n%2?'sun':'coral',.6); }});
    oval(H,R,x,y-h,17,5,'teal',.55); oval(H,R,x,y-h-3,8,3,'paper',1); H.line(R,[[x-10,y-9],[x-10,y-h+6]],'paper',2.4);
    shape(H,R,[[x-14,y],[x+14,y],[x+5,y+14],[x-5,y+14]],'teal',.4);
    H.line(R,[[x,y+13],[x,y+24]],'blue',4); H.line(R,[[x-2,y+15],[x+15,y+15]],'blue',2.5); oval(H,R,x+15,y+15,4,2,'coral');
    for(const side of [-1,1])H.line(R,[H.p(i+side*.29,1.08,1.44),H.p(i+side*.29,1.08,2.75),H.p(i+side*.29,1.72,2.75)],'teal',2.5);
    H.line(R,[[x-14,y-h+8],[x+14,y-h+8]],'sun',1.2);
    for(let z=0;z<4;z++)H.line(R,[[x+7,y-7-z*7],[x+12,y-7-z*7]],'blue',.6);
    oval(H,R,x+1,y+9,3,2,'sun',.7);
    metal(H,R,i-.32,1.54,.64,.8,1.29,.035,'blue');
    for(let k=0;k<4;k++) H.line(R,[H.p(i-.25+k*.16,1.65,1.335),H.p(i-.25+k*.16,2.17,1.335)],'paper',.7);
  }
  cabinetFrame(H,R,6.6,.35,4.9,1.25,.05,3.18,3,'teal',(i,j,w,d,z,h,n)=>{
    for(const level of [z+1.63,z+.81,z]) {
      timber(H,R,i,j,w,d,level,.07,'sun');
      if(level<1.5) for(let k=0;k<3;k++) jar(H,R,i+.21+k*.42,j+.42,level+.09,6.2,15+k%2*4,k===1?'coral':'teal');
      else if(n===0) sack(H,R,i+.5,j+.4,level+.1,'paper',true);
      else { drape(H,R,i+.1,j+.15,w-.2,.55,level+.15,.24,n===1?'coral':'paper'); }
    }
    if(n===2) for(let x=i+.05;x<i+w;x+=.14) H.line(R,[H.p(x,j+d,1),H.p(x,j+d,2.92)],'paper',.55,{tone:.65});
  });
  hangingRail(H,R,'nw',6,4.6,2.83,4,(P,u,n)=>{
    const p=P(u,-.23); if(n<2) { oval(H,R,p[0],p[1]+12,6,5,'sun',.7);H.line(R,[p,[p[0],p[1]+10]],'blue',3); } else {shape(H,R,[[p[0]-7,p[1]],[p[0]+7,p[1]],[p[0]+9,p[1]+27],[p[0]-9,p[1]+27]],n===2?'paper':'coral',.65);H.line(R,[[p[0]-5,p[1]+20],[p[0]+6,p[1]+20]],'blue',.6);}
  });
  cabinetFrame(H,R,.45,6.05,1.95,3.35,.03,.88,1,'teal',(i,j,w,d)=>{
    timber(H,R,i,j+.1,w,d-.2,.2,.09,'sun');
    vessel(H,R,i+.55,j+2.35,.3,11,19,'paper',false);
    drape(H,R,i+.92,j+2.23,.56,.71,.32,.13,'coral');
    bentTube(H,R,[[1.4,6.98,.89],[1.4,6.98,.44],[1.6,6.98,.34],[1.84,6.98,.45],[1.84,6.1,.43]],2.2,'paper');
  });
  metal(H,R,.39,5.98,2.07,3.48,.88,.065,'teal');
  for(const j of [8.08,8.29,8.5,8.71,8.92])H.line(R,[H.p(.64,j,.96),H.p(2.16,j,.96)],'paper',1.3);
  hangingRail(H,R,'nw',7.4,3.72,2.17,4,(P,u,n)=>{
    const [x,y]=P(u,-.17);
    if(n<2){stroke(H,R,[[x-7,y],[x-8,y+8],[x,y+12],[x+8,y+8],[x+7,y]],'blue',1.4);H.line(R,[[x,y+11],[x,y+25]],'sun',2.4);}
    else {shape(H,R,[[x-8,y],[x+7,y],[x+10,y+27],[x-7,y+30]],n===2?'paper':'coral',.8,.7);for(let k=0;k<3;k++)H.line(R,[[x-5+k*4,y+3],[x-3+k*4,y+26]],'teal',.8);}
  });
  timber(H,R,3.05,9.15,2.31,1.24,.15,.1,'sun');
  for(const i of [3.1,5.22])timber(H,R,i,9.19,.12,1.19,.25,.68,'sun');
  for(const j of [9.18,10.25])for(let z=.31;z<.9;z+=.2)timber(H,R,3.13,j,2.19,.09,z,.11,'teal');
  jar(H,R,3.63,9.72,.29,11,28,'coral');jar(H,R,4.36,9.71,.28,10,32,'teal');
  jar(H,R,4.83,9.94,.29,7,22,'sun');
  stroke(H,R,[H.p(3.63,9.72,1.18),H.p(4.06,9.72,1.4),H.p(4.51,9.72,1.19)],'blue',2);
  vessel(H,R,2.8,8.25,.04,13,21,'paper');
  const mop=H.p(2.81,8.28,.07);H.line(R,[mop,H.p(2.44,7.94,1.52)],'sun',3);for(let n=0;n<7;n++)H.line(R,[[mop[0]-8+n*2.5,mop[1]-5],[mop[0]-10+n*3,mop[1]+7]],'paper',1.4);
  basin(H,R,.59,6.4,1.66,1.3,.94);
  for(let n=0;n<4;n++) jar(H,R,1.06+(n%2)*.7,8.27+Math.floor(n/2)*.45,.96,7,18,n===0?'coral':'teal');
  timber(H,R,8.45,4.1,2.5,1.2,.91,.15,'sun');for(const i of [8.65,10.65]) metal(H,R,i,4.28,.12,.8,0,.91,'teal');
  drape(H,R,8.6,4.22,1.3,.85,1.08,.2,'paper');
  for(let n=0;n<3;n++) {oval(H,R,...H.p(9.0+n*.54,4.77,1.11),6,2.8,n%2?'coral':'teal',.6);}
  const brush=H.p(10.5,4.45,1.09);H.line(R,[[brush[0],brush[1]],[brush[0]+10,brush[1]-14]],'sun',3);for(let n=0;n<5;n++)H.line(R,[[brush[0]+6+n,brush[1]-11],[brush[0]+9+n,brush[1]-18]],'blue',.75);
  benchFrame(H,R,5.65,4.25,2.47,1.31,1.02,'teal');
  timber(H,R,5.78,4.39,2.18,1.05,.44,.08,'sun');
  for(let n=0;n<2;n++)box(H,R,5.93+n*.98,4.58,.77,.72,.53,.26,n?'paper':'coral',.5);
  const scale=H.p(6.35,4.74,1.08);
  shape(H,R,[[scale[0]-15,scale[1]+2],[scale[0]+16,scale[1]+2],[scale[0]+11,scale[1]-21],[scale[0]-9,scale[1]-21]],'teal',.65,.8);
  oval(H,R,scale[0]+1,scale[1]-11,8,7,'paper',1);H.line(R,[[scale[0]+1,scale[1]-11],[scale[0]+5,scale[1]-15]],'coral',1.2);
  oval(H,R,scale[0],scale[1]-24,22,7,'sun',.48);oval(H,R,scale[0],scale[1]-26,18,5,'paper',1);
  jar(H,R,7.65,4.58,1.05,7,18,'coral');
  shape(H,R,H.tile(7.21,4.99,.57,.41,1.04),'paper',1,.5);H.line(R,[H.p(7.2,5.05,1.06),H.p(7.8,5.27,1.06)],'coral',1.6);
  cabinetFrame(H,R,7.7,8.8,3.35,1.75,.03,.54,2,'sun',(i,j,w,d)=>{
    timber(H,R,i,j,w,d,.15,.06,'sun');
    for(let n=0;n<2;n++) {const p=H.p(i+.43+n*.6,j+.83,.25);shape(H,R,[[p[0]-9,p[1]],[p[0]+8,p[1]],[p[0]+11,p[1]-13],[p[0]-8,p[1]-13]],n?'coral':'paper',.65,.65);}
  });
  timber(H,R,7.61,8.74,3.54,1.87,.54,.08,'sun');
  for(const i of [7.72,11.0])H.line(R,[H.p(i,8.91,.65),H.p(i,10.29,.65)],'teal',3);
  sack(H,R,8.45,9.6,.62,'paper',true); jar(H,R,9.55,9.4,.62,10,22,'coral'); jar(H,R,10.3,9.25,.62,7,18,'sun');
  oval(H,R,...H.p(10.5,10.02,.63),10,4,'teal',.6); for(let n=0;n<4;n++)H.dot(...H.p(10.38+n*.08,9.99,.67),1.7,'sun');
  metal(H,R,9.15,2.1,1.65,1.35,.18,.1,'teal');for(const i of [9.3,10.6]) for(const j of [2.26,3.23])caster(H,R,i,j);
  stroke(H,R,[H.p(10.67,2.23,.25),H.p(10.67,2.23,1.5),H.p(9.3,2.23,1.5),H.p(9.3,2.23,.25)],'blue',3);
  sack(H,R,9.8,2.8,.32,'sun');
  wallRack(H,R,'nw',6.2,4.55,3.14,.6,1,'sun',(P,z)=>{for(let n=0;n<4;n++) {const [x,y]=P(.5+n, z+.03);oval(H,R,x,y-6,5,6,n%2?'paper':'sun',.7);H.line(R,[[x-5,y-12],[x+5,y-12]],'blue',1.2);}});
  const deposit=H.p(7.95,9.8,.65);oval(H,R,...deposit,11,4,'paper',1);for(let n=0;n<3;n++)oval(H,R,deposit[0]-5+n*4,deposit[1]-1,2.5,1.5,'coral',.7);
  const bag=H.p(6.37,9.85,.04);shape(H,R,[[bag[0]-18,bag[1]],[bag[0]+17,bag[1]],[bag[0]+21,bag[1]-29],[bag[0]-19,bag[1]-31]],'paper',1,.9);
  stroke(H,R,[[bag[0]-12,bag[1]-27],[bag[0]-10,bag[1]-42],[bag[0]+9,bag[1]-42],[bag[0]+12,bag[1]-27]],'teal',2.3);
  shape(H,R,[[bag[0]-11,bag[1]-16],[bag[0]+8,bag[1]-14],[bag[0]+8,bag[1]-4],[bag[0]-12,bag[1]-5]],'coral',.38,.6);
  for(let n=0;n<5;n++)H.line(R,[[bag[0]-11+n*4,bag[1]-15],[bag[0]-10+n*4,bag[1]-12]],'blue',.65);
  for(let n=0;n<5;n++) H.line(R,[wallPt(H,'ne',11.5,2.35+n*.08,-.08),wallPt(H,'ne',10.8,2.35+n*.08,-.08)],'blue',1);
},(H,R,t)=>{
  const u=cycle(t,22)*22, a=ease(.9,4.4,u), b=ease(4.4,8.8,u), c=ease(13.2,17,u), d=ease(17,20,u);
  const move=b*(1-c), lift=.25*a*(1-b)+.25*c*(1-d), ji=4.6-.9*move, jj=2.5-.6*move, z=1.3+lift;
  const hand=H.p(ji,jj,z+.22), footI=ji+.24,footJ=jj+1.14;
  person(H,R,footI,footJ,[[hand[0]-7,hand[1]],[hand[0]+7,hand[1]]],'teal');
  jar(H,R,ji,jj,z,8,19,'paper');
  const q=H.p(6.65,5.1,1.08), nod=2*Math.sin(Math.PI*ease(8.8,12.3,u))*(1-ease(12.3,14,u));
  person(H,R,6.9,5.7,[[q[0]-7,q[1]+nod],[q[0]+8,q[1]+nod]],'coral');
  jar(H,R,6.5,5.6,.55,8,18,'sun');
  const [x,y]=H.p(8.45,9.6,.62);stroke(H,R,[[x-7,y-34],[x-7,y-45+Math.sin(t*2*Math.PI/22)*1.4],[x+7,y-45],[x+7,y-34]],'blue',1.1);
  const p=H.p(10.15,.9,2.72);H.line(R,[p,[p[0]+10,p[1]+5+Math.sin(t*2*Math.PI/22)*1.1]],'paper',1.6);
});
room.loopSeconds=22;
room.stillTime=10.8;
export default room;
