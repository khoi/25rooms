import { world, shape, oval, stroke, box, wallPt, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, drape, vessel, pendant, floorLight } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { cornice, recessedFrame, floorShadow } from '../joinery.js';

const smooth = (a, b, t) => { const f = Math.max(0, Math.min(1, (t - a) / (b - a))); return f * f * (3 - 2 * f); };
const rest = { x: 0, y: 0, drop: 0, lean: 0, head: 10, al: -10, ar: 12, el: -6, er: 6, ll: -5, lr: 5, kl: 0, kr: 0, roll: 0 };
function person(H, R, name, root, targets, opts, seated = false) {
  const scale = 1.65, pose = { ...rest, head:opts.head ?? 10, y:opts.y ?? 0, ...(seated ? { drop: .47, ll: 84, lr: 80, kl: -84, kr: -80 } : {}) };
  for (const [side, target] of Object.entries(targets)) {
    const dx = (target[0] - root[0]) / scale - (side === 'l' ? -5.2 : 5.2), dy = (target[1] - root[1]) / scale + 32.5 - pose.drop * 19;
    const a = 4.368, b = 4.2, d = Math.max(.3, Math.min(a + b - .01, Math.hypot(dx, dy))), bend = Math.acos((a * a + b * b - d * d) / (2 * a * b));
    pose['a' + side] = (Math.atan2(dx, dy) - Math.acos((a * a + d * d - b * b) / (2 * a * d))) * 180 / Math.PI;
    pose['e' + side] = 180 - bend * 180 / Math.PI;
  }
  FIGURES.clips[name] = { dur: 1, keys: [[0, pose], [1, pose]] };
  FIGURES.draw(H, R, { who: 'adult', x: root[0], y: root[1], ground: root, scale, face: 'se', clip: name, phase: 0, opts });
}
function drawer(H,R,i,j,w,z,h,ink='sun',knob='sun'){
  surface(H,R,H.faceI(i,j,w,z,z+h),ink,.46,.8);
  surface(H,R,H.faceI(i+.09,j+.012,w-.18,z+.08,z+h-.08),ink,.3,.55);
  const p=H.p(i+w*.52,j+.03,z+h*.54);
  if(knob==='door'){stroke(H,R,[[p[0]-5,p[1]],[p[0]-5,p[1]+4],[p[0]+6,p[1]+4],[p[0]+6,p[1]]],'blue',2);oval(H,R,p[0]-5,p[1],2.4,3.5,'sun',.8);}
  else{oval(H,R,...p,3.2,2.5,knob,.9);H.dot(p[0],p[1],.7,'blue');}
}
function frame(H,R,P,w,h,ink='sun',portrait=false){
  surface(H,R,[P(0,0),P(w,0),P(w,h),P(0,h)],ink,.75,.9);
  surface(H,R,[P(.1,.12),P(w-.1,.12),P(w-.1,h-.12),P(.1,h-.12)],'blue',portrait?.63:.22,.55);
  H.line(R,[P(.05,.07),P(.05,h-.06),P(w-.05,h-.06)],'paper',.8);
  if(portrait){const p=P(w*.5,h*.58);oval(H,R,...p,w*8,h*6,'blue',.85);shape(H,R,[P(w*.2,.18),P(w*.78,.18),P(w*.65,h*.46),P(w*.35,h*.46)],'blue',.86,.6);}
}
function lamp(H,R,bend){
  const base=H.p(4.7,5.18,1.14), joint=[base[0]-1,base[1]-32], tip=[joint[0]+7+bend*24,joint[1]-35+bend*13];
  oval(H,R,base[0],base[1]+3,18,7,'blue',.6);
  oval(H,R,base[0],base[1],16,6,'paper',1);
  shape(H,R,[[base[0]-12,base[1]-1],[base[0]+12,base[1]-1],[base[0]+8,base[1]-14],[base[0]-7,base[1]-14]],'teal',.52);
  oval(H,R,base[0],base[1]-14,8,3,'paper',1);
  for(const offset of [-2,2])H.line(R,[[base[0]+offset,base[1]-14],[joint[0]+offset,joint[1]], [tip[0]+offset,tip[1]]],'blue',2.1);
  H.line(R,[[base[0]-1,base[1]-14],[joint[0]-1,joint[1]],[tip[0]-1,tip[1]]],'sun',1.8);
  oval(H,R,...joint,6,6,'sun',.8);oval(H,R,...joint,3,3,'blue',.7);
  H.line(R,[[joint[0]-1,joint[1]-3],[joint[0]+1,joint[1]+3]],'paper',1);
  shape(H,R,[[tip[0]-10,tip[1]-10],[tip[0]+10,tip[1]-10],[tip[0]+25,tip[1]+17],[tip[0]-25,tip[1]+17]],'paper',1,.95);
  for(let k=0;k<9;k++)H.line(R,[[tip[0]-9+k*2.2,tip[1]-9],[tip[0]-23+k*5.8,tip[1]+16]],k%2?'sun':'blue',k%2?1.2:.55,{tone:.6});
  oval(H,R,tip[0],tip[1]+17,25,7,'sun',.35);
  oval(H,R,tip[0],tip[1]+17,19,4.2,'blue',.28);
  H.line(R,[[tip[0]+12,tip[1]+12],[tip[0]+18,tip[1]+14]],'teal',1);
  for(let n=0;n<3;n++)H.line(R,[[tip[0]+13+n*2,tip[1]+10],[tip[0]+14+n*2,tip[1]+15]],'coral',.65);
  oval(H,R,base[0],base[1]-5,10,3,'teal',.7);
  for(const x of [-5,0,5])H.line(R,[[base[0]+x,base[1]-11],[base[0]+x*1.5,base[1]-2]],'sun',.65);
  stroke(H,R,[[base[0]+8,base[1]-9],[base[0]+12,base[1]-21],[joint[0]+7,joint[1]+1],[tip[0]+5,tip[1]-3]],'coral',1.1);
  H.line(R,[[joint[0]-7,joint[1]-3],[joint[0]+7,joint[1]+3]],'sun',.8);
  oval(H,R,tip[0],tip[1]-11,8,2,'teal',.6);
  H.line(R,[[tip[0]-20,tip[1]+17],[tip[0]+20,tip[1]+17]],'paper',1.1);
  H.line(R,[[joint[0]+5,joint[1]+1],[joint[0]+10,joint[1]+5]],'blue',1.6);
  return {base,joint,tip};
}
const room=world('istanbul-antique-lamp','The shade turns amber',{wall:'paper',wallTone:.7,height:4.3,floor:'sun',tone:.21,pattern:'tiles',accent:'teal',head:62},(H,R)=>{
  masonry(H,R,'nw',0,12,0,.7,'teal',.3);masonry(H,R,'ne',0,12,0,.7,'blue',.2);
  for(const side of ['nw','ne'])cornice(H,R,side,.05,11.9,4.29,'sun');
  recessedFrame(H,R,'nw',8.5,2.26,1.08,2.55,'sun',Q=>{
    shape(H,R,[Q(.1,.1),Q(2.1,.1),Q(2.1,2.41),Q(.1,2.41)],'blue',.82);
    shape(H,R,[Q(.2,.2),Q(.88,.2),Q(.88,1.27),Q(.2,1.27)],'teal',.5);
    H.line(R,[Q(1.13,.1),Q(1.13,2.4)],'paper',2.5);H.line(R,[Q(.1,1.15),Q(2.1,1.15)],'sun',2.5);
    H.line(R,[Q(.45,.3),Q(.73,2.21)],'paper',1.4);
  });
  for(let n=0;n<7;n++)H.line(R,[wallPt(H,'nw',8.5+n*.3,.45,-.15),wallPt(H,'nw',8.5+n*.3,.77,-.15)],'blue',.8);
  frame(H,R,(u,z)=>wallPt(H,'nw',2.2+u,1.5+z,-.2),2.5,2.15,'sun',true);
  frame(H,R,(u,z)=>wallPt(H,'nw',5.4+u,1.67+z,-.24),1.78,1.48,'coral');
  H.line(R,[wallPt(H,'nw',5.6,1.87,-.26),wallPt(H,'nw',6.8,2.92,-.26)],'paper',1.1);
  frame(H,R,(u,z)=>wallPt(H,'ne',2.65+u,1.31+z,-.16),3.18,2.35,'teal');
  const mirror=(u,z)=>wallPt(H,'ne',2.84+u,1.51+z,-.19);
  H.line(R,[mirror(.2,.15),mirror(.85,1.94)],'paper',2.2);
  H.line(R,[mirror(2.12,.14),mirror(2.65,1.47)],'paper',1.2);
  H.line(R,[wallPt(H,'ne',4.24,3.66,-.18),wallPt(H,'ne',4.24,3.85,-.13)],'blue',1);
  timber(H,R,.08,1.65,.74,6.12,3.95,.16,'sun');
  const cage=H.p(.45,2.4,4.13);
  oval(H,R,cage[0],cage[1],15,6,'teal',.5);
  for(let k=0;k<7;k++){const x=cage[0]-13+k*4.3;stroke(H,R,[[x,cage[1]],[x,cage[1]-28],[cage[0],cage[1]-40]],'blue',.8);}
  oval(H,R,cage[0],cage[1]-16,15,5,'paper',.12);
  H.line(R,[[cage[0]-9,cage[1]-17],[cage[0]+10,cage[1]-17]],'sun',1.2);
  H.line(R,[[cage[0],cage[1]-40],[cage[0],cage[1]-45]],'blue',1);
  const hat=H.p(.42,4.36,4.13);oval(H,R,...hat,18,5,'sun',.7);oval(H,R,hat[0],hat[1]-11,11,15,'paper',.9);
  H.line(R,[[hat[0]-9,hat[1]-3],[hat[0]+9,hat[1]-3]],'teal',2);
  drape(H,R,.2,5.35,.5,1.1,4.13,.36,'coral');
  bentTube(H,R,[[.45,6.95,4.13],[.45,6.95,4.6]],2,'blue');
  const tel=H.p(.45,6.95,4.61);H.line(R,[[tel[0]-17,tel[1]+6],[tel[0]+18,tel[1]-7]],'blue',7);H.line(R,[[tel[0]-16,tel[1]+4],[tel[0]+16,tel[1]-9]],'sun',3.8);
  floorShadow(H,.13,1.49,1.55,6.47,.16);
  for(const j of [1.61,4.52,7.51])timber(H,R,.25,j,1.18,.16,.07,1.2,'sun');
  timber(H,R,.18,1.56,1.32,6.2,1.23,.17,'sun');
  for(const j of [1.72,3.13,4.68,6.2]){
    surface(H,R,H.faceJ(1.44,j,1.27,.27,1.1),'teal',.42,.8);
    surface(H,R,H.faceJ(1.455,j+.1,1.06,.35,.98),'sun',.24,.6);
    const p=H.p(1.48,j+.62,.76);oval(H,R,...p,3,3,'sun',.85);
  }
  for(const [j,ink]of [[1.99,'coral'],[3.48,'teal'],[5.12,'paper']]){
    const p=H.p(.75,j,1.43);
    shape(H,R,[[p[0]-13,p[1]],[p[0]+12,p[1]],[p[0]+11,p[1]-20],[p[0]+5,p[1]-26],[p[0]+5,p[1]-37],[p[0]-4,p[1]-37],[p[0]-5,p[1]-27],[p[0]-12,p[1]-20]],ink,.6,.8);
    oval(H,R,p[0],p[1]-36,5,2,'blue',.7);H.line(R,[[p[0]-7,p[1]-20],[p[0]-8,p[1]-5]],'paper',1.2);
    stroke(H,R,[[p[0]+11,p[1]-20],[p[0]+19,p[1]-22],[p[0]+19,p[1]-9],[p[0]+10,p[1]-7]],'sun',1.6);
  }
  const clock=H.p(.76,6.71,1.43);
  shape(H,R,[[clock[0]-19,clock[1]],[clock[0]+20,clock[1]],[clock[0]+15,clock[1]-11],[clock[0]+15,clock[1]-34],[clock[0]+8,clock[1]-43],[clock[0]-8,clock[1]-43],[clock[0]-16,clock[1]-33],[clock[0]-15,clock[1]-11]],'sun',.7,.9);
  oval(H,R,clock[0],clock[1]-28,10,11,'paper',1);H.line(R,[[clock[0],clock[1]-34],[clock[0],clock[1]-28],[clock[0]+5,clock[1]-26]],'blue',1);
  surface(H,R,[[clock[0]-7,clock[1]-14],[clock[0]+7,clock[1]-14],[clock[0]+7,clock[1]-3],[clock[0]-7,clock[1]-3]],'blue',.7,.5);
  H.line(R,[[clock[0],clock[1]-14],[clock[0],clock[1]-7]],'sun',1);oval(H,R,clock[0],clock[1]-6,4,3,'sun',.8);
  for(const j of [2.77,5.79]){
    const p=H.p(1.04,j,1.43);oval(H,R,...p,14,5,'sun',.7);oval(H,R,p[0],p[1]-3,12,4,'teal',.35);
  }
  for(const z of [1.65,2.6]){
    const p=H.p(.09,.66,z);H.line(R,[[p[0]-12,p[1]],[p[0]+12,p[1]]],'sun',2);
    H.line(R,[[p[0]-6,p[1]],[p[0]-10,p[1]+19]],'blue',1.3);H.line(R,[[p[0]+6,p[1]],[p[0]+10,p[1]+19]],'blue',1.3);
    oval(H,R,p[0],p[1]+20,14,6,'coral',.6);
  }
  cabinetFrame(H,R,8.1,.35,3.55,1.68,.12,3.69,3,'sun',(i,j,w,d,z,h,n)=>{
    for(const level of [.94,1.88,2.8])timber(H,R,i,j,w,d,level,.1,'sun');
    if(n===0){
      for(let k=0;k<4;k++)frame(H,R,(u,h)=>H.p(i+.11+u+k*.16,j+.12+k*.13,1.05+h),.54,.69,'coral');
      const p=H.p(i+.46,j+.72,2.92);shape(H,R,[[p[0]-12,p[1]],[p[0]+12,p[1]],[p[0]+12,p[1]-21],[p[0],p[1]-31],[p[0]-12,p[1]-21]],'sun',.65);
      oval(H,R,p[0],p[1]-16,7,8,'paper',1);H.line(R,[[p[0],p[1]-16],[p[0]+4,p[1]-20]],'blue',.8);
      drape(H,R,i+.06,j+.17,.9,.92,2,.23,'teal');drawer(H,R,i+.02,j+d,w,.3,.43,'sun','door');
    }else if(n===1){
      for(let k=0;k<3;k++){vessel(H,R,i+.23+k*.26,j+.65,2,.12*60,13+k*4,'paper',false);H.dot(...H.p(i+.23+k*.26,j+.65,2.54+k*.12),2,'teal');}
      frame(H,R,(u,h)=>H.p(i+.12+u,j+.85,2.94+h),.7,.62,'teal');
      drawer(H,R,i+.01,j+d,w,1.08,.58,'teal','coral');
      drawer(H,R,i+.01,j+d,w,.28,.57,'sun');
    }else{
      const p=H.p(i+.53,j+.7,.28);shape(H,R,[[p[0]-12,p[1]],[p[0]+13,p[1]],[p[0]+11,p[1]-33],[p[0]+5,p[1]-42],[p[0]+4,p[1]-69],[p[0]-5,p[1]-69],[p[0]-6,p[1]-43],[p[0]-12,p[1]-33]],'blue',.6);
      stroke(H,R,[[p[0]+10,p[1]-33],[p[0]+17,p[1]-33],[p[0]+17,p[1]-23],[p[0]+10,p[1]-23]],'sun',1.7);
      vessel(H,R,i+.51,j+.6,2,14,22,'paper',false);
      drape(H,R,i+.07,j+.12,.84,.92,2.92,.15,'paper');
    }
  });
  timber(H,R,8.0,.23,3.77,1.87,3.8,.19,'sun');
  for(let n=0;n<8;n++)timber(H,R,8.2+n*.43,.3,.17,.27,3.99,.14,'sun');
  floorShadow(H,3.18,4.0,4.93,2.35,.24);
  cabinetFrame(H,R,3.1,4.08,4.97,1.87,.13,.98,3,'sun',(i,j,w,d,z,h,n)=>{
    if(n===0){drawer(H,R,i,j+d,w,.26,.3,'teal');drawer(H,R,i,j+d,w,.63,.3,'sun','door');}
    if(n===1){
      surface(H,R,H.faceI(i,j+d,w,.26,.94),'blue',.85,.7);
      timber(H,R,i+.05,j+.21,w-.1,d+.55,.32,.08,'sun');
      for(const x of [i+.05,i+w-.13])timber(H,R,x,j+.21,.08,d+.55,.39,.27,'sun');
      for(let k=0;k<3;k++){
        const p=H.p(i+.29+k*.36,j+d+.26,.42);oval(H,R,...p,5+k,3,'teal',.65);H.dot(...p,1.3,'sun');
      }
      drawer(H,R,i,j+d+.57,w,.28,.39,'sun','coral');
      H.line(R,[H.p(i+.1,j+d+.58,.63),H.p(i+w-.1,j+d+.58,.63)],'paper',1.1);
    }
    if(n===2){timber(H,R,i,j,w,d,.63,.08,'sun');drape(H,R,i+.12,j+.21,w-.2,d-.3,.3,.1,'paper');box(H,R,i+.12,j+.21,w-.2,d-.3,.72,.12,'coral',.45);}
  });
  timber(H,R,3.03,4,5.12,2.06,1.11,.13,'sun');
  timber(H,R,3.1,5.85,.28,.21,1.1,.15,'paper');
  const tray=H.p(6.54,5.12,1.26);oval(H,R,...tray,32,12,'sun',.75);oval(H,R,...tray,27,9,'blue',.16);
  for(const a of [-10,5]){oval(H,R,tray[0]+a,tray[1]-5,6,9,'blue',.8);oval(H,R,tray[0]+a,tray[1]-12,5,3,'paper',1);}
  H.line(R,[[tray[0]-10,tray[1]-6],[tray[0]+5,tray[1]-6]],'blue',4);
  box(H,R,6.9,4.3,.83,.73,1.25,.3,'sun',.5);
  surface(H,R,H.tile(7,4.4,.64,.55,1.56),'blue',.58,.6);
  const key=H.p(7.24,4.72,1.58);oval(H,R,key[0]-3,key[1],2.8,2,'sun',.8);H.line(R,[[key[0],key[1]],[key[0]+7,key[1]-2],[key[0]+7,key[1]+1]],'sun',1.3);
  surface(H,R,H.tile(6.89,4.15,.86,.15,1.73),'sun',.65,.6);
  oval(H,R,...H.p(3.76,4.7,1.25),17,6,'paper',.5);
  H.outline(R,ell(...H.p(3.76,4.7,1.26),15,5),'blue',.55,{tone:.2});
  stroke(H,R,[H.p(4.7,5.17,1.28),H.p(5.45,5.7,1.27),H.p(5.5,6.2,.5),H.p(6.2,6.64,.03),H.p(6.7,6.74,.03)],'blue',1.2);
  const plug=H.p(6.7,6.74,.035);shape(H,R,[[plug[0]-4,plug[1]-3],[plug[0]+3,plug[1]-3],[plug[0]+5,plug[1]+3],[plug[0]-3,plug[1]+3]],'blue',.8,.65);
  for(const x of [0,3])H.line(R,[[plug[0]+x,plug[1]-3],[plug[0]+x+2,plug[1]-7]],'sun',1);
  timber(H,R,1.65,9,2.55,1.32,.66,.15,'sun');
  timber(H,R,1.78,9.12,2.21,.95,.25,.12,'teal');
  for(let n=0;n<3;n++){
    surface(H,R,H.faceI(1.79+n*.72,10.24,.68,.29,.59),'sun',.65,.7);
    const p=H.p(2.12+n*.72,10.26,.44);oval(H,R,...p,3,2,'blue',.8);
  }
  for(const i of [1.75,4.03])timber(H,R,i,9.04,.08,1.2,.81,.13,'sun');
  timber(H,R,1.75,9.02,2.35,.07,.81,.22,'teal');
  for(const i of [2.71,3.43])timber(H,R,i,9.14,.06,1.03,.81,.07,'sun');
  const handle=H.p(3.09,9.6,.85);stroke(H,R,[[handle[0]-8,handle[1]+2],[handle[0]-5,handle[1]-8],[handle[0]+6,handle[1]-11],[handle[0]+10,handle[1]-3]],'coral',3);
  const knob=H.p(2.02,9.89,.85);oval(H,R,...knob,5,4,'sun',.8);H.dot(knob[0],knob[1]-3,2,'paper');
  for(const i of [1.79,3.93])for(const j of [9.1,10.07])timber(H,R,i,j,.13,.13,.05,.6,'teal');
  const sample=H.p(2.3,9.54,.84);oval(H,R,...sample,18,7,'paper',1);
  for(const [x,y]of[[-6,0],[7,-1]]){oval(H,R,sample[0]+x,sample[1]+y,3,2,'sun',.8);H.line(R,[[sample[0]+x+2,sample[1]+y],[sample[0]+x+9,sample[1]+y+2]],'blue',1);}
  const stopper=H.p(3.5,9.61,.85);oval(H,R,...stopper,4,3,'teal',.3);shape(H,R,[[stopper[0]-2,stopper[1]],[stopper[0]+3,stopper[1]],[stopper[0]+5,stopper[1]-10],[stopper[0]-3,stopper[1]-9]],'paper',1,.6);
  for(const i of [9.62,11.03])for(const j of [4.29,6.31])timber(H,R,i,j,.15,.15,.03,.51,'teal');
  timber(H,R,9.5,4.18,1.79,2.36,.52,.16,'sun');
  for(let n=0;n<4;n++){
    const j=4.37+n*.32;
    frame(H,R,(u,h)=>H.p(9.65+u,j-h*.18,.71+h),1.38,1.57-n*.19,['coral','paper','sun','teal'][n]);
    H.line(R,[H.p(9.8,j-.22,1.99-n*.19),H.p(10.2,j-.18,1.67-n*.1)],'paper',1);
  }
  surface(H,R,H.faceI(9.62,6.49,1.54,.14,.47),'blue',.6,.7);
  drape(H,R,9.67,5.99,1.08,.5,.71,.49,'coral');
  const spool=H.p(10.85,7.81,.04);oval(H,R,...spool,10,4,'sun',.7);H.line(R,[[spool[0]-6,spool[1]],[spool[0]-6,spool[1]-13]],'coral',5);H.line(R,[[spool[0]+6,spool[1]],[spool[0]+6,spool[1]-13]],'coral',5);oval(H,R,spool[0],spool[1]-14,10,4,'sun',.7);stroke(H,R,[[spool[0]+9,spool[1]-5],[spool[0]+17,spool[1]+1],[spool[0]+12,spool[1]+10]],'coral',.8);
  vessel(H,R,10.0,9.2,.12,26,20,'sun');drape(H,R,9.43,8.83,1.1,.84,.78,.44,'paper');
  for(let n=0;n<5;n++)H.outline(R,ell(...H.p(9.57,10.39,.08),11+n*1.7,4+n*.55),'coral',.8);
  const mag=H.p(10.58,10.1,.09);oval(H,R,...mag,8,5,'paper',1);H.line(R,[[mag[0]+6,mag[1]+3],[mag[0]+16,mag[1]+10]],'blue',3);
  pendant(H,R,6.6,.8,4.3,3.16,'coral',.9);floorLight(H,5.6,5.5,180,.35);
},(H,R,t)=>{
  const u=((t%22)+22)%22,bend=smooth(4.4,8.8,u)*(1-smooth(13.2,19,u));
  const base=H.p(4.7,5.18,1.14),root=[base[0]-25,base[1]+24],joint=[base[0]-1,base[1]-32];
  const take=smooth(0,4.4,u)*(1-smooth(19,20,u));
  const hand=[root[0]+10+(joint[0]-root[0]-10)*take,root[1]-32+(joint[1]-root[1]+32)*take];
  person(H,R,'istanbulLampDealer',root,{r:hand,l:[base[0]-13,base[1]-12]},{shirt:['teal',.67],pants:['blue',.7],hairStyle:'short'});
  lamp(H,R,bend);
  H.dot(...hand,2.6,'coral',.35,{knock:true});
  person(H,R,'istanbulLampCustomer',H.p(7.8,7.2,0),{},{shirt:['coral',.63],pants:['blue',.7],hairStyle:'bun',head:10-24*bend});
  const p=H.p(10.58,10.1,.09);H.line(R,[[p[0]-3,p[1]-2],[p[0]+2,p[1]+2]],'sun',.7,{tone:.55+.25*Math.sin(u/22*Math.PI*2)});
});
room.loopSeconds=22;
room.stillTime=11;
export default room;
