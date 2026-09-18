import { world, shape, oval, stroke, box, wallPt, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, cushion, drape, vessel, pendant, floorLight } from '../materials.js';
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
function slipper(H,R,i,j,z,ink='coral',small=false){
  const p=H.p(i,j,z),s=small?.65:1;
  shape(H,R,[[p[0]-9*s,p[1]],[p[0]+5*s,p[1]+5*s],[p[0]+12*s,p[1]+2*s],[p[0]+10*s,p[1]-4*s],[p[0]-5*s,p[1]-8*s]],ink,.65,.65);
  oval(H,R,p[0]-2*s,p[1]-3*s,4*s,2*s,'blue',.6);
  H.line(R,[[p[0]+3*s,p[1]-2*s],[p[0]+8*s,p[1]+1*s]],'paper',.6);
}
function door(H,R,open){
  const a=open*.31, P=(u,z)=>H.p(.38+Math.sin(a)*u,3.06+Math.cos(a)*u,z);
  surface(H,R,[P(0,.18),P(3.26,.18),P(3.26,3.76),P(0,3.76)],'teal',.6,1.05);
  surface(H,R,[P(.19,.33),P(3.05,.33),P(3.05,1.07),P(.19,1.07)],'teal',.25,.7);
  H.line(R,[P(.27,.39),P(2.94,.39),P(2.94,.98)],'sun',.8);
  const glass=[P(.18,1.28),P(3.06,1.28),P(3.06,3.55),P(.18,3.55)];
  surface(H,R,glass,'sun',.23,.85);
  H.clip(glass,()=>{
    const p=H.p(.13,4.05,0);
    person(H,R,'istanbulLatchInside',p,{},{shirt:['coral',.7],pants:['blue',.7],hairStyle:'curly'});
    const lamp=P(2.54,2.76);oval(H,R,...lamp,6,8,'sun',.7);H.glow(...lamp,20,22,'sun',.3);
  });
  H.line(R,[P(.18,2.43),P(3.06,2.43)],'paper',2.7);
  H.line(R,[P(1.62,1.28),P(1.62,3.55)],'teal',2.5);
  H.line(R,[P(.45,2.57),P(.72,3.3)],'paper',1.3);
  H.line(R,[P(2.04,1.48),P(2.3,2.18)],'paper',1.1);
  for(const z of [.64,3.18]){H.line(R,[P(.02,z),P(.02,z+.28)],'sun',3);H.line(R,[P(.04,z+.04),P(.04,z+.24)],'paper',1);}
  const latch=P(2.88,1.18);
  shape(H,R,[[latch[0]-4,latch[1]-7],[latch[0]+4,latch[1]-7],[latch[0]+4,latch[1]+9],[latch[0]-4,latch[1]+9]],'sun',.7,.6);
  H.line(R,[[latch[0]-7,latch[1]],[latch[0]+4,latch[1]]],'blue',2.4);
  H.dot(latch[0],latch[1]+6,1.3,'blue');
  const closer=P(1.94,3.66);
  stroke(H,R,[H.p(.3,5.74,3.89),H.p(.57+open*.14,5.72,3.73),closer],'blue',1.9);
  metal(H,R,.22,5.6,.14,.62,3.82,.13,'teal');
  stroke(H,R,[H.p(.33,6.07,2.89),H.p(.45+open*.15,5.97,2.76),P(2.54,2.92)],'sun',1.1);
  H.line(R,[P(.13,.21),P(3.12,.21)],'sun',1.6);
  for(const u of [.28,1.64,2.94])for(const z of [.35,1.08,3.49])H.dot(...P(u,z),.8,'sun');
  const plate=P(2.84,1.18);oval(H,R,plate[0]+1,plate[1]-4,1.3,1.2,'paper',1);
  H.line(R,[P(.1,1.23),P(.1,3.61)],'sun',.8);
  const bumper=P(.14,.71);H.line(R,[[bumper[0]-3,bumper[1]],[bumper[0]+3,bumper[1]+2]],'paper',2.1);
  H.line(R,[P(.24,.28),P(.57,.28)],'paper',1.2);
  return latch;
}
const room=world('istanbul-family-latch','The door is nearly closed',{wall:'paper',wallTone:.6,height:4.25,floor:'teal',tone:.2,pattern:'tiles',accent:'blue',head:57},(H,R)=>{
  for(const side of ['nw','ne']){
    masonry(H,R,side,0,12,0,.93,'blue',.24);
    cornice(H,R,side,.08,11.91,4.2,'paper');
    H.line(R,[wallPt(H,side,.08,.96,-.12),wallPt(H,side,11.91,.96,-.12)],'sun',1.5);
  }
  const Q=(u,z)=>wallPt(H,'nw',2.83+u,z,-.2);
  surface(H,R,[Q(0,.1),Q(3.73,.1),Q(3.73,4.02),Q(0,4.02)],'blue',.89,1);
  surface(H,R,[Q(.15,.18),Q(3.6,.18),Q(3.6,3.8),Q(.15,3.8)],'sun',.5,.8);
  for(const j of [2.8,6.42])timber(H,R,.04,j,.66,.24,.06,4.04,'teal');
  timber(H,R,.04,2.73,.66,3.99,4,.19,'sun');
  timber(H,R,.07,2.68,.72,.13,.04,4.18,'paper');
  timber(H,R,.07,6.65,.72,.13,.04,4.18,'paper');
  box(H,R,.15,2.72,.9,4.12,.025,.17,'paper',.85);
  for(let n=0;n<11;n++)H.line(R,[H.p(.65,2.97+n*.3,.2),H.p(.99,2.97+n*.3,.2)],'blue',.75);
  metal(H,R,.57,6.23,.13,.17,1.03,.31,'sun');
  const padding=H.p(.51,3.02,.8);shape(H,R,[[padding[0]-3,padding[1]-4],[padding[0]+4,padding[1]-4],[padding[0]+4,padding[1]+7],[padding[0]-3,padding[1]+7]],'paper',1,.5);
  timber(H,R,.02,2.71,.86,4.07,4.19,.09,'sun');
  for(const j of [2.88,6.49]){
    timber(H,R,.45,j,.18,.16,3.82,.39,'paper');
    H.line(R,[H.p(.65,j,3.87),H.p(.65,j,4.12)],'sun',1.4);
  }
  recessedFrame(H,R,'nw',.42,1.93,1.32,2.38,'teal',P=>{
    for(const z of [.2,.92,1.63]){
      surface(H,R,[P(.13,z),P(1.79,z),P(1.79,z+.52),P(.13,z+.52)],'sun',.42,.6);
      for(let n=0;n<3;n++)surface(H,R,[P(.26+n*.18,z+.19),P(1.14+n*.18,z+.19),P(1.14+n*.18,z+.64),P(.26+n*.18,z+.64)],n%2?'paper':'teal',.62,.45);
      H.line(R,[P(.13,z+.19),P(1.79,z+.19)],'paper',1.4);
      const k=P(1.48,z+.36);oval(H,R,...k,2.4,2.1,'coral',.8);
    }
  });
  const switchP=H.p(.19,7.01,2.08);shape(H,R,[[switchP[0]-5,switchP[1]-8],[switchP[0]+5,switchP[1]-8],[switchP[0]+5,switchP[1]+8],[switchP[0]-5,switchP[1]+8]],'paper',1,.7);H.line(R,[[switchP[0]-2,switchP[1]-4],[switchP[0]+2,switchP[1]+3]],'teal',2);
  recessedFrame(H,R,'ne',2.4,3.35,2.02,1.7,'sun',P=>{
    surface(H,R,[P(.12,.1),P(3.22,.1),P(3.22,1.58),P(.12,1.58)],'blue',.86,.55);
    surface(H,R,[P(.18,.14),P(1.01,.14),P(1.01,.73),P(.18,.73)],'teal',.4,.4);
    for(const u of [1.12,2.23])H.line(R,[P(u,.12),P(u,1.58)],'paper',2.4);
    H.line(R,[P(.12,.77),P(3.22,.77)],'sun',2);
    H.line(R,[P(.54,.22),P(.86,1.37)],'paper',1.2);
  });
  for(let n=0;n<4;n++){
    timber(H,R,.25,.32+n*.66,2.43,.69,.04,n*.22+.14,'sun');
    H.line(R,[H.p(.27,1+n*.66,n*.22+.19),H.p(2.63,1+n*.66,n*.22+.19)],'paper',1.2);
  }
  for(let n=0;n<4;n++){
    const j=.38+n*.66,z=.17+n*.22;
    surface(H,R,H.faceI(.39,j+.66,2.13,.045,z-.04),'teal',.37,.6);
    H.line(R,[H.p(.53,j+.68,z-.06),H.p(2.51,j+.68,z-.06)],'sun',1.4);
    if(n>1){const p=H.p(1.57,j+.69,z*.52);stroke(H,R,[[p[0]-5,p[1]],[p[0]-5,p[1]+3],[p[0]+5,p[1]+3],[p[0]+5,p[1]]],'sun',1.3);}
  }
  timber(H,R,2.52,2.43,.29,.32,.14,1.99,'teal');
  const newel=H.p(2.68,2.59,2.17);oval(H,R,...newel,6,5,'sun',.75);
  bentTube(H,R,[[2.64,.43,.19],[2.64,.43,1.38],[2.64,2.65,2.07]],3,'teal');
  for(const j of [.48,1.47,2.5])bentTube(H,R,[[2.64,j,.2+(j-.45)*.32],[2.64,j,1.39+(j-.45)*.32]],1.9,'blue');
  cabinetFrame(H,R,8.29,.32,3.27,1.83,.12,3.63,3,'teal',(i,j,w,d,z,h,n)=>{
    for(const level of [.82,1.57,2.41])timber(H,R,i,j,w,d,level,.1,'sun');
    if(n===0){
      for(let k=0;k<3;k++)drape(H,R,i+.1,j+.15,.74,1.03,.93+k*.14,.1,k%2?'paper':'coral');
      metal(H,R,i+.1,j+.23,.78,.89,1.7,.25,'sun');
      H.line(R,[H.p(i+.28,j+1.14,1.81),H.p(i+.63,j+1.14,1.81)],'blue',1.3);
      const p=H.p(i+.5,j+.65,2.55);oval(H,R,p[0],p[1]-9,13,13,'paper',1);shape(H,R,[[p[0]-13,p[1]-8],[p[0]+13,p[1]-8],[p[0]+10,p[1]],[p[0]-10,p[1]]],'teal',.6,.6);
      slipper(H,R,i+.18,j+.7,.27,'coral',true);slipper(H,R,i+.5,j+.7,.27,'sun',true);
      H.line(R,[H.p(i+.28,j+1.61,.27),H.p(i+.48,j+1.61,.28)],'paper',2.6);
    }else if(n===1){
      surface(H,R,H.faceI(i+.06,j+1.17,w-.11,1.7,3.31),'sun',.56,.65);
      surface(H,R,H.faceI(i+.13,j+1.19,w-.25,1.83,3.18),'paper',.55,.65);
      H.line(R,[H.p(i+.2,j+1.2,1.96),H.p(i+.53,j+1.2,2.96)],'paper',1.3);
      metal(H,R,i+.08,j+1.2,.68,.08,1.72,.09,'teal');
      box(H,R,i+.11,j+.13,.73,1.25,.95,.3,'sun',.5);
      drape(H,R,i+.15,j+.14,.64,1.02,.99,.13,'paper');
      vessel(H,R,i+.48,j+.65,1.11,10,13,'teal',false);
      oval(H,R,...H.p(i+.48,j+.65,1.55),11,4,'coral',.85);
      for(let k=0;k<4;k++)H.outline(R,ell(...H.p(i+.43,j+.67,.32),10+k*2.1,4+k*.7),'blue',.8);
    }else{
      for(const h of [1.07,1.2,1.34])drape(H,R,i+.08,j+.2,.81,1.05,h,.08,'paper');
      for(let k=0;k<4;k++)box(H,R,i+.05+k*.18,j+.23,.13,.65,2.53,.65,k%2?'paper':'teal',.57);
      box(H,R,i+.12,j+.11,.76,1.19,.24,.45,'blue',.5);
      H.line(R,[H.p(i+.23,j+1.34,.54),H.p(i+.7,j+1.34,.54)],'sun',1.3);
    }
  });
  timber(H,R,8.18,.23,3.49,2.02,3.76,.17,'sun');
  const keepsake=H.p(9.1,.97,3.96);oval(H,R,...keepsake,12,4.4,'teal',.7);shape(H,R,[[keepsake[0]-12,keepsake[1]],[keepsake[0]+12,keepsake[1]],[keepsake[0]+12,keepsake[1]-10],[keepsake[0]-12,keepsake[1]-10]],'teal',.7,.7);oval(H,R,keepsake[0],keepsake[1]-10,12,4,'coral',.75);
  const bird=H.p(10.28,.97,3.96);shape(H,R,[[bird[0]-14,bird[1]],[bird[0]-3,bird[1]-15],[bird[0]+1,bird[1]-5],[bird[0]+16,bird[1]-11],[bird[0]+8,bird[1]+1]],'paper',1,.6);
  vessel(H,R,11.04,.93,3.96,10,21,'sun',false);H.line(R,[H.p(10.89,.96,4.16),H.p(11.04,.96,4.32),H.p(10.99,.96,4.49)],'paper',1.2);
  for(const [pos,w,z]of [[6.26,.8,2.78],[7.21,.59,2.63]])recessedFrame(H,R,'ne',pos,w,z,.66,'sun',P=>{
    surface(H,R,[P(.08,.08),P(w-.08,.08),P(w-.08,.58),P(.08,.58)],'paper',1,.4);
    const p=P(w*.49,.37);oval(H,R,...p,3.1,3.8,'blue',.76);
    shape(H,R,[P(w*.2,.14),P(w*.76,.14),P(w*.59,.32),P(w*.35,.32)],'teal',.6,.4);
  });
  const C=(u,z)=>wallPt(H,'ne',3.94+u,z,-.15);
  surface(H,R,[C(0,1.07),C(3.92,1.07),C(3.92,2.01),C(0,2.01)],'teal',.27,.7);
  H.line(R,[C(.08,1.17),C(3.83,1.17)],'sun',2.2);
  for(const u of [.12,3.77])H.dot(...C(u,1.88),1.5,'sun');
  timber(H,R,4.02,.22,3.8,.41,1.34,.13,'sun');
  for(let n=0;n<4;n++){
    const p=H.p(4.4+n*.83,.51,1.76);H.line(R,[[p[0],p[1]],[p[0],p[1]-17]],'blue',1);H.dot(p[0],p[1]-17,2,'sun');
    if(n<2){shape(H,R,[[p[0]-10,p[1]-11],[p[0]+8,p[1]-11],[p[0]+13,p[1]+4],[p[0]+8,p[1]+29],[p[0]-8,p[1]+29],[p[0]-13,p[1]+2]],n?'coral':'teal',.65,.7);H.line(R,[[p[0],p[1]-8],[p[0],p[1]+27]],'paper',.7);}
  }
  const B=(u,z)=>H.p(.55,7.35+u,z);
  surface(H,R,[B(0,.94),B(3.91,.94),B(3.91,3.91),B(0,3.91)],'teal',.39,.9);
  for(const u of [0,1.67,3.8])timber(H,R,.54,7.35+u,.17,.14,.93,3.05,'sun');
  timber(H,R,.4,7.25,.78,4.18,3.91,.14,'sun');
  surface(H,R,[B(.16,1.7),B(1.55,1.7),B(1.55,3.6),B(.16,3.6)],'sun',.68,.8);
  surface(H,R,[B(.27,1.83),B(1.43,1.83),B(1.43,3.46),B(.27,3.46)],'paper',.52,.7);
  H.line(R,[B(.4,1.99),B(.78,3.25)],'paper',1.7);
  for(const u of [2.04,2.89,3.44]){
    const hook=B(u,3.32);stroke(H,R,[[hook[0],hook[1]-5],[hook[0]+5,hook[1]],[hook[0]+5,hook[1]+5],[hook[0],hook[1]+7]],'sun',1.7);
    const p=B(u,3.19),ink=u<2.5?'coral':'paper';
    shape(H,R,[[p[0]-7,p[1]],[p[0]+7,p[1]],[p[0]+14,p[1]+12],[p[0]+11,p[1]+19],[p[0]+7,p[1]+15],[p[0]+9,p[1]+44],[p[0]-10,p[1]+45],[p[0]-8,p[1]+15],[p[0]-12,p[1]+20],[p[0]-15,p[1]+12]],ink,.65,.8);
    H.line(R,[[p[0],p[1]+4],[p[0],p[1]+42]],'teal',.8);
    for(const y of [14,23,32])H.dot(p[0]+2,p[1]+y,1,'sun');
    H.line(R,[[p[0]-7,p[1]+28],[p[0]-1,p[1]+28]],'blue',.7);
  }
  const bag=H.p(.83,9.91,4.08);shape(H,R,[[bag[0]-15,bag[1]],[bag[0]+15,bag[1]],[bag[0]+13,bag[1]-19],[bag[0]-13,bag[1]-19]],'coral',.62,.8);stroke(H,R,[[bag[0]-7,bag[1]-18],[bag[0]-7,bag[1]-27],[bag[0]+7,bag[1]-27],[bag[0]+7,bag[1]-18]],'blue',1.5);H.line(R,[[bag[0]-14,bag[1]-11],[bag[0]+14,bag[1]-11]],'sun',1);
  drape(H,R,.54,7.61,.54,.67,4.07,.21,'paper');
  floorShadow(H,1.4,7.05,3.9,2.12,.24);
  cabinetFrame(H,R,1.4,7.08,3.8,1.84,.1,.85,3,'sun',(i,j,w,d,z,h,n)=>{
    slipper(H,R,i+.22,j+.72,.27,n===1?'paper':'blue');slipper(H,R,i+.65,j+.86,.27,n===1?'paper':'teal');
    if(n===2){timber(H,R,i,j,w,d,.58,.08,'sun');slipper(H,R,i+.18,j+.75,.72,'coral',true);}
  });
  timber(H,R,1.34,7.03,3.93,1.94,.96,.16,'sun');
  timber(H,R,1.34,8.72,.39,.25,.94,.19,'paper');
  H.line(R,[H.p(1.35,8.9,1.08),H.p(1.71,8.9,1.08)],'blue',.7);
  for(const i of [1.47,5.05])H.line(R,[H.p(i,7.18,1.12),H.p(i,8.69,1.12)],'blue',.7);
  cushion(H,R,1.57,7.27,2.05,1.32,1.15,.14,'paper');
  drape(H,R,3.8,7.24,.85,1.29,1.16,.49,'coral');
  for(const x of [1.43,2.66,3.92,5.12]){
    timber(H,R,x,8.83,.075,.11,.2,.75,'teal');
    for(const z of [.29,.79])H.dot(...H.p(x+.04,8.96,z),1.2,'sun');
  }
  for(const x of [1.89,4.52])metal(H,R,x,7.01,.29,.14,1.13,.04,'blue');
  const hinge=H.p(3.18,8.97,.99);H.line(R,[[hinge[0]-6,hinge[1]],[hinge[0]+6,hinge[1]]],'sun',2.4);
  const brush=H.p(4.77,7.73,1.15);H.line(R,[[brush[0]-8,brush[1]],[brush[0]+8,brush[1]+6]],'sun',4);for(let n=0;n<5;n++)H.line(R,[[brush[0]-7+n*3,brush[1]+2+n],[brush[0]-10+n*3,brush[1]+7+n]],'blue',.8);
  vessel(H,R,1.7,10.06,.11,19,31,'teal');
  for(const [i,j,ink]of [[1.61,10.03,'blue'],[1.83,10.06,'coral']])bentTube(H,R,[[i,j,.83],[i-.11,j,2.13],[i+.04,j,2.27],[i+.16,j,2.12]],2.2,ink);
  metal(H,R,1.04,9.45,1.49,1.35,.035,.07,'blue');
  for(let n=0;n<7;n++)H.line(R,[H.p(1.13+n*.19,9.54,.11),H.p(1.13+n*.19,10.67,.11)],'paper',.65);
  bentTube(H,R,[[.74,11.29,.05],[.74,11.29,.98],[2.46,11.29,.98],[2.46,11.29,.05]],2,'teal');
  for(const i of [1.17,1.85]){
    const p=H.p(i,11.28,.98);H.line(R,[[p[0],p[1]-2],[p[0],p[1]+8]],'sun',1);
    shape(H,R,[[p[0]-7,p[1]+7],[p[0]+5,p[1]+7],[p[0]+5,p[1]+13],[p[0]+9,p[1]+17],[p[0]+6,p[1]+21],[p[0]+3,p[1]+18],[p[0]+1,p[1]+30],[p[0]-7,p[1]+29]],i<1.5?'coral':'paper',.65,.7);
    H.line(R,[[p[0]-6,p[1]+9],[p[0]+4,p[1]+9]],'teal',1);
  }
  metal(H,R,6.8,10.13,2.6,.65,.04,.06,'blue');
  for(let n=0;n<12;n++)H.line(R,[H.p(6.91+n*.2,10.22,.11),H.p(6.91+n*.2,10.67,.11)],'sun',.65);
  const wedge=H.p(5.62,9.68,.04);shape(H,R,[[wedge[0]-9,wedge[1]+3],[wedge[0]+8,wedge[1]+3],[wedge[0]+7,wedge[1]-5],[wedge[0]-9,wedge[1]]],'sun',.65,.6);
  bentTube(H,R,[[10.24,4.2,.08],[10.17,4.18,1.85],[10.42,4.19,2.14],[10.66,4.19,2.13]],2.3,'blue');
  drape(H,R,9.99,4.07,.53,.32,1.64,1.03,'teal');
  for(const i of [9.98,10.5])oval(H,R,...H.p(i,4.44,.12),5,6,'blue',.75);
  timber(H,R,8.87,6.35,2.35,1.54,.68,.13,'sun');
  for(const i of [9.01,10.94])for(const j of [6.51,7.59])timber(H,R,i,j,.15,.15,.03,.63,'teal');
  timber(H,R,8.98,6.47,2.09,1.14,.26,.1,'teal');
  for(let n=0;n<3;n++)drape(H,R,9.12,6.59,1.71,.9,.37+n*.09,.065,n===1?'coral':'paper');
  surface(H,R,H.faceI(9.04,7.9,1.96,.49,.71),'teal',.45,.7);
  H.line(R,[H.p(9.79,7.92,.61),H.p(10.27,7.92,.61)],'sun',1.7);
  for(const i of [9,11.01])H.line(R,[H.p(i,6.43,.84),H.p(i,7.82,.84)],'sun',1.1);
  const dish=H.p(9.47,7.02,.84);oval(H,R,...dish,17,6,'paper',1);oval(H,R,dish[0],dish[1]-7,16,6,'teal',.45);H.dot(dish[0],dish[1]-11,2,'coral');
  vessel(H,R,10.47,7.08,.84,8,26,'paper',false);vessel(H,R,10.82,7.41,.84,5,11,'teal');
  slipper(H,R,9.32,7.54,.84,'coral',true);
  box(H,R,9.65,6.46,.49,.42,.84,.18,'teal',.55);
  const key=H.p(3.14,8.71,1.16);oval(H,R,...key,4,2.5,'sun',.8);H.line(R,[[key[0]+4,key[1]],[key[0]+10,key[1]-2],[key[0]+11,key[1]+1]],'sun',1.4);stroke(H,R,[[key[0]-3,key[1]-1],[key[0]-8,key[1]-5],[key[0]-12,key[1]-3]],'coral',1.2);
  for(let n=0;n<5;n++)H.line(R,[[key[0]-12,key[1]-3],[key[0]-15+n*1.8,key[1]+6]],'coral',.8);
  pendant(H,R,.73,7.11,3.85,2.95,'sun',.64);
  floorLight(H,3.9,5.9,170,.41);
},(H,R,t)=>{
  const u=((t%16)+16)%16,open=smooth(3.2,6.4,u)*(1-smooth(9.6,13.3,u));
  const latch=door(H,R,open);
  const root=H.p(.98+open*.18,5.8,0),idle=[root[0]+10,root[1]-31],take=smooth(0,3.2,u)*(1-smooth(13.3,14,u));
  const hand=[idle[0]+(latch[0]-idle[0])*take,idle[1]+(latch[1]-idle[1])*take];
  person(H,R,'istanbulLatchResident',root,{l:hand},{shirt:['teal',.64],pants:['blue',.64],hairStyle:'bun'});
  const p=H.p(3.14,8.71,1.16),sway=Math.sin(u/16*Math.PI*2)*2;
  stroke(H,R,[[p[0]-4,p[1]-1],[p[0]-8,p[1]+3],[p[0]-10+sway,p[1]+10]],'coral',.8);
});
room.loopSeconds=16;
room.stillTime=14.5;
export default room;
