import { world, shape, oval, stroke, box, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, cushion, drape, vessel, pendant, floorLight } from '../materials.js';
import { masonry, archedBay, cabinetFrame } from '../structure.js';
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
function shoes(H, R, i, j, z, size = 1, ink = 'blue') {
  for (const a of [0, .29 * size]) {
    const [x, y] = H.p(i + a, j, z);
    shape(H, R, [[x - 6 * size, y], [x + 9 * size, y + 4 * size], [x + 12 * size, y], [x + 5 * size, y - 7 * size], [x - 4 * size, y - 9 * size]], ink, .7, .65);
    oval(H, R, x - 1, y - 6 * size, 3 * size, 1.8 * size, 'paper', .8);
    H.line(R, [[x + 2, y - 3], [x + 6, y - 1]], 'paper', .7);
  }
}
function shelf(H, R, j) {
  for (let n = 0; n < 5; n++) timber(H, R, 3.2 + n * .38, j, .34, 1.12, .87, .12, 'sun');
  timber(H, R, 3.15, j + 1.1, 1.98, .13, .8, .23, 'sun');
  H.line(R, [H.p(3.8, j + 1.25, .89), H.p(4.5, j + 1.25, .89)], 'blue', 2.3);
  H.line(R, [H.p(3.85, j + 1.26, .92), H.p(4.4, j + 1.26, .92)], 'paper', 1);
}
const room = world('istanbul-shoe-vestibule', 'The threshold stays clear', { wall: 'paper', wallTone: .62, height: 4.15, floor: 'paper', tone: .62, head: 52 }, (H, R) => {
  for (let i = 0; i < 12; i += 1.5) for (let j = 0; j < 12; j += 1.8) {
    surface(H, R, H.tile(i + .025, j + .025, 1.44, 1.74, .02), (i + j) % 3 < 1 ? 'sun' : 'paper', .28, .5);
  }
  masonry(H, R, 'nw', 0, 12, 0, .86, 'teal', .25);
  masonry(H, R, 'ne', 0, 12, 0, .86, 'blue', .19);
  cornice(H, R, 'nw', .1, 11.9, 4.13);
  cornice(H, R, 'ne', .1, 11.9, 4.13);
  const P = archedBay(H, R, 'nw', 3.1, 4.45, .25, 3.75, 'teal', Q => {
    shape(H, R, [Q(.15,.14),Q(4.3,.14),Q(4.3,3.8),Q(.15,3.8)], 'blue', .7);
    shape(H, R, [Q(.2,.2),Q(4.2,.2),Q(4.2,2.6),Q(.2,2.6)], 'teal', .35);
    for (let n = 0; n < 11; n++) H.line(R,[Q(n*.43,2.85),Q(n*.43+.8,3.7)],'sun',.85);
  });
  for (const u of [.1,4.3]) H.line(R,[P(u,.2),P(u,2.78)],'paper',3);
  for (let n = 0; n < 9; n++) H.line(R,[P(.25+n*.44, .25),P(.25+n*.44,2.55)],'blue',1.3);
  surface(H,R,[P(.13,2.55),P(4.3,2.55),P(4.3,2.67),P(.13,2.67)],'sun',.7);
  box(H,R,.1,3.02,.65,4.65,0,.16,'paper',.9);
  for (const j of [3.02,7.57]) box(H,R,.02,j,.57,.31,.17,3.9,'paper',.85);
  H.line(R,[H.p(.48,7.75,3.5),H.p(.58,7.7,3.23),H.p(.5,7.86,3.05)],'coral',1);
  recessedFrame(H,R,'ne',1.2,6.35,1.65,1.8,'sun',Q=>{
    for(let n=0;n<6;n++) {
      shape(H,R,[Q(.18+n, .19),Q(.95+n,.19),Q(.95+n,1.55),Q(.18+n,1.55)],'teal',.22,.45);
      if(n%2) for(const z of [.55,.88,1.2]) H.line(R,[Q(.26+n,z),Q(.85+n,z)],'paper',1.5);
    }
  });
  floorShadow(H,1.05,1.7,6.5,2,.2);
  cabinetFrame(H,R,1.05,1.6,6.45,1.25,.08,1.42,6,'sun',(i,j,w,d,z,h,n)=>{
    timber(H,R,i,j,w,d,.64,.08,'sun');
    if(n!==2&&n!==3) shoes(H,R,i+.16,j+.65,.78,n===5?.63:1,n%2?'coral':'blue');
    if(n<4) shoes(H,R,i+.15,j+.45,.23,n===0?.65:.9,n%2?'teal':'blue');
    if(n===5) H.line(R,[H.p(i+.25,j+d,.4),H.p(i+.45,j+d,.43)],'paper',2);
  });
  for(const i of [3.22,5.03]) { timber(H,R,i,1.84,.085,1.72,.74,.09,'blue'); metal(H,R,i,3.3,.1,.13,.78,.13,'teal'); }
  timber(H,R,1.02,1.48,6.54,1.48,1.49,.15,'sun');
  bentTube(H,R,[[1.32,2.7,1.62],[1.32,2.7,2.05],[7.14,2.7,2.05],[7.14,2.7,1.62]],2.7,'teal');
  floorShadow(H,.5,8,2.2,2.9,.2);
  for(const j of [8.05,10.35]) timber(H,R,.62,j,1.85,.23,.08,.8,'sun');
  timber(H,R,.5,7.9,2.05,2.9,.85,.2,'sun');
  cushion(H,R,.62,8.05,1.77,2.45,1.05,.12,'paper');
  drape(H,R,.69,10.15,.8,.43,1.2,.48,'coral');
  shoes(H,R,1.0,10.96,.06,.78,'teal');
  const bag=H.p(2.3,8.5,1.2);
  shape(H,R,[[bag[0]-9,bag[1]],[bag[0]+9,bag[1]],[bag[0]+7,bag[1]-17],[bag[0]-8,bag[1]-17]],'teal',.6);
  stroke(H,R,[[bag[0]-5,bag[1]-16],[bag[0]-6,bag[1]-25],[bag[0]+4,bag[1]-25],[bag[0]+5,bag[1]-16]],'blue',1.2);
  cabinetFrame(H,R,8.65,.5,2.85,1.62,.08,3.46,2,'teal',(i,j,w,d,z,h,n)=>{
    for(const level of [.65,1.45,2.2]) timber(H,R,i,j,w,d,level,.1,'sun');
    if(n===0){
      for(let k=0;k<4;k++) drape(H,R,i+.1,j+.1+k*.19,.8,.15,2.31,.16,k%2?'paper':'coral');
      vessel(H,R,i+.5,j+.45,1.56,12,23,'paper',false);
      bentTube(H,R,[[i+.5,j+.84,1.55],[i+.5,j+.99,1.55],[i+.5,j+.99,1.42]],1.3,'teal');
      for(let k=0;k<3;k++) box(H,R,i+.1,j+.13,.85,.32,.76+k*.12,.09,'paper',.7);
      box(H,R,i+.06,j,.9,d,.19,.37,'sun',.5);
      H.line(R,[H.p(i+.3,j+d,.35),H.p(i+.62,j+d,.35)],'blue',1.7);
    }else{
      for(let k=0;k<4;k++) box(H,R,i+.07+k*.23,j+.12,.18,.62,2.32,.44,'paper',.85);
      metal(H,R,i+.74,j+.65,.1,.08,2.65,.1,'coral');
      drape(H,R,i+.1,j+.1,.8,.75,1.57,.37,'paper');
      bentTube(H,R,[[i+.3,j+.8,.22],[i+.3,j+.6,1.32]],2,'coral');
      shape(H,R,H.faceI(i+.12,j+.9,.44,.22,.43),'sun',.75);
    }
  });
  for(let n=0;n<7;n++) H.line(R,[H.p(8.88+n*.35,2.14,.16),H.p(8.88+n*.35,2.14,.5)],'blue',.7);
  const fan=H.p(9.9,.28,3.94); oval(H,R,...fan,14,14,'paper',1);
  for(let n=0;n<6;n++){const a=n*Math.PI/3;H.line(R,[[fan[0]-Math.cos(a)*13,fan[1]-Math.sin(a)*13],[fan[0]+Math.cos(a)*13,fan[1]+Math.sin(a)*13]],'blue',.5)}
  H.dot(...fan,3.1,'teal');
  vessel(H,R,10.5,3.2,.12,17,15,'teal');
  bentTube(H,R,[[10.4,3.2,.38],[10.3,3.1,1.7],[10.5,3.1,1.88],[10.65,3.1,1.73]],2.1,'blue');
  metal(H,R,9.6,2.85,1.5,.9,.025,.06,'blue');
  for(let k=0;k<6;k++) H.line(R,[H.p(9.73+k*.22,2.95,.09),H.p(9.73+k*.22,3.6,.09)],'paper',.6);
  timber(H,R,8.8,4.35,1.34,1.02,.03,.32,'sun');
  timber(H,R,8.77,4.32,1.41,1.08,.35,.1,'paper');
  H.line(R,[H.p(8.88,4.36,.46),H.p(10.04,4.36,.46)],'blue',1);
  bentTube(H,R,[[.8,9.6,.05],[.8,9.6,1.87],[.95,9.6,2.02],[1.12,9.6,1.85]],2,'sun');
  drape(H,R,.7,9.48,.35,.2,1.79,.13,'paper');
  const horn=H.p(2.47,10.58,1.11); shape(H,R,[[horn[0]-2,horn[1]-1],[horn[0]+2,horn[1]-1],[horn[0]+3,horn[1]+15],[horn[0]-1,horn[1]+18]],'sun',.7);
  surface(H,R,H.tile(4.5,7.1,4.6,3.3,.055),'blue',.23,.8);
  surface(H,R,H.tile(4.62,7.22,4.35,3.05,.06),'paper',1,.6);
  for(let n=0;n<17;n++) H.line(R,[H.p(4.72,7.35+n*.17,.065),H.p(8.86,7.35+n*.17,.065)],'sun',.65,{tone:.55});
  for(let n=0;n<17;n++) H.line(R,[H.p(4.8+n*.24,10.3,.07),H.p(4.8+n*.24,10.5,.07)],'paper',.9);
  metal(H,R,4.0,11.36,5.5,.21,0,.04,'blue');
  for(let n=0;n<22;n++) H.line(R,[H.p(4.1+n*.24,11.39,.05),H.p(4.1+n*.24,11.52,.05)],'paper',.6);
  pendant(H,R,4.2,.42,4.2,3.14,'sun',.7);
  floorLight(H,5.3,4.7,150,.35);
},(H,R,t)=>{
  const u=((t%16)+16)%16, pull=.42*smooth(3.2,6.4,u)*(1-smooth(9.6,13,u)), wipe=Math.sin(Math.PI*2*Math.max(0,Math.min(1,(u-6.4)/3.2)))*.15;
  shelf(H,R,1.92+pull);
  const contact=H.p(4.23+wipe,3.17+pull,.97), root=H.p(4.72,3.86,0);
  const restHand=[root[0]+8,root[1]-33], take=smooth(0,3.2,u)*(1-smooth(13,14,u));
  const hand=[restHand[0]+(contact[0]-restHand[0])*take,restHand[1]+(contact[1]-restHand[1])*take];
  person(H,R,'istanbulShoeCaretaker',root,{r:hand},{shirt:['coral',.65],pants:['blue',.7],hairStyle:'bun'});
  shape(H,R,[[hand[0]-4,hand[1]-2],[hand[0]+5,hand[1]-2],[hand[0]+6,hand[1]+6],[hand[0]-3,hand[1]+7]],'paper',1,.5);
  person(H,R,'istanbulShoeVisitor',H.p(1.66,8.75,.65),{},{shirt:['teal',.65],pants:['blue',.55],hairStyle:'short',y:-.8*smooth(6.6,8,u)*(1-smooth(8,9.2,u))},true);
  const sway=Math.sin(u/16*Math.PI*2)*.05;
  shape(H,R,[wallPt(H,'nw',3.3,3.1,-.3),wallPt(H,'nw',3.88,3.1,-.3),wallPt(H,'nw',3.74+sway,1.3,-.3),wallPt(H,'nw',3.3,1.4,-.3)],'paper',.9,.6);
});
room.loopSeconds=16;
room.stillTime=8;
export default room;
