import { world, shape, oval, stroke, box, wallPt, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, cushion, drape, vessel, floorLight } from '../materials.js';
import { cabinetFrame } from '../structure.js';
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
  FIGURES.draw(H, R, { who: 'adult', x: root[0], y: root[1], ground: root, scale, face: opts.face || 'se', clip: name, phase: 0, opts });
}
function seat(H,R,i,j,ink='coral',patch=false) {
  for(const x of [i+.1,i+1]){
    bentTube(H,R,[[x,j+.07,.03],[x,j+.78,1.07],[x,j+.92,.04]],2.6,'blue');
    bentTube(H,R,[[x,j+.95,.04],[x,j+.13,.79],[x,j+.05,1.7]],2.5,'teal');
  }
  cushion(H,R,i,j,1.16,.92,.71,.17,ink);
  surface(H,R,H.faceI(i+.03,j+.07,1.1,1.1,1.68),ink,.55,.8);
  H.line(R,[H.p(i+.16,j+.08,1.2),H.p(i+1,j+.08,1.2)],'paper',.8);
  if(patch){surface(H,R,H.tile(i+.69,j+.65,.25,.19,.9),'teal',.7,.5);for(let n=0;n<4;n++)H.line(R,[H.p(i+.71+n*.055,j+.64,.91),H.p(i+.71+n*.055,j+.87,.91)],'paper',.55);}
  for(const x of [i+.1,i+1.05])bentTube(H,R,[[x,j+.16,1.13],[x,j+.83,1.08],[x,j+.85,.74]],2,'blue');
}
function screen(H,R,focus) {
  const Q=(u,v)=>wallPt(H,'nw',1.5+u,1.05+v,-.36);
  surface(H,R,[Q(0,0),Q(5.8,0),Q(5.8,2.4),Q(0,2.4)],'paper',1,.9);
  H.clip([Q(.08,.08),Q(5.72,.08),Q(5.72,2.32),Q(.08,2.32)],()=>{
    surface(H,R,[Q(.15,.12),Q(5.65,.12),Q(5.65,2.28),Q(.15,2.28)],'sun',.12,.3);
    for(let n=0;n<3;n++){
      const points=[];for(let k=0;k<36;k++){const a=k*Math.PI/18;points.push(Q(2.85+Math.cos(a)*(1.42-n*.37),1.21+Math.sin(a)*(.89-n*.23)));}
      H.outline(R,points,n===0?'coral':n===1?'teal':'blue',1.4+focus*1.8,{tone:.68-focus*.22});
    }
    shape(H,R,[Q(1.7,.49),Q(3.8,.49),Q(2.75,1.9)],'teal',.3,.65);
    shape(H,R,[Q(2.4,.91),Q(3.25,.91),Q(3.25,1.58),Q(2.4,1.58)],'sun',.5,.65);
    H.line(R,[Q(.38,.3),Q(1,.3),Q(1,.75)],'blue',1);
    H.line(R,[Q(4.85,1.66),Q(4.85,2.04),Q(5.45,2.04)],'blue',1);
  });
  H.line(R,[Q(-.06,-.025),Q(5.86,-.025)],'blue',3.1);
  H.line(R,[Q(-.07,.005),Q(5.87,.005)],'paper',.9);
}
const room=world('istanbul-cinema-corner','The lens finds the wall',{wall:'blue',wallTone:.64,height:4,floor:'blue',tone:.24,pattern:'boards',head:40},(H,R)=>{
  for(const side of ['nw','ne']){cornice(H,R,side,.15,11.8,3.98,'teal');H.line(R,[wallPt(H,side,.1,.38,-.11),wallPt(H,side,11.9,.38,-.11)],'sun',1.3);}
  for(let i=0;i<12;i++)for(const j of [.2,11.2])surface(H,R,H.tile(i+.04,j,.85,.61,.03),i%2?'teal':'sun',.2,.4);
  recessedFrame(H,R,'ne',.6,4.4,1.32,2.25,'teal',Q=>{
    shape(H,R,[Q(.1,.1),Q(4.3,.1),Q(4.3,2.15),Q(.1,2.15)],'blue',.94);
    for(let n=0;n<4;n++){H.line(R,[Q(.3+n,.27),Q(.6+n,1.89)],'paper',1);H.line(R,[Q(1+n,.1),Q(1+n,2.15)],'teal',2);}
    H.line(R,[Q(.1,.95),Q(4.3,.95)],'teal',2);
  });
  for(const j of [.85,7.5]){
    const Q=(u,v)=>wallPt(H,'nw',j+u,v,-.44);
    for(let k=0;k<5;k++){
      const a=k*.16;
      shape(H,R,[Q(a,.45),Q(a+.22,.5),Q(a+.22,3.78),Q(a,3.78)],k%2?'blue':'coral',k%2?.73:.38,.6);
      H.line(R,[Q(a+.1,.61),Q(a+.1,3.69)],'paper',.6,{tone:.4});
    }
  }
  metal(H,R,.15,1.32,.38,6.3,3.55,.21,'teal');
  for(const j of [1.5,4.4,7.25])bentTube(H,R,[[.04,j,3.83],[.55,j,3.83],[.55,j,3.6]],2,'blue');
  for(let j=1.48;j<7.5;j+=.5){const p=H.p(.51,j,3.6);H.outline(R,ell(...p,3,4),'sun',.8);}
  screen(H,R,0);
  bentTube(H,R,[[.12,8.58,3.82],[.12,8.58,.7],[.3,8.58,.62]],1.3,'sun');
  const tie=H.p(.24,8.58,.65);oval(H,R,...tie,4,6,'coral',.7);
  cabinetFrame(H,R,7.6,.24,4.05,1.5,.1,3.52,3,'teal',(i,j,w,d,z,h,n)=>{
    for(const level of [.86,1.75,2.66])timber(H,R,i,j,w,d,level,.1,'sun');
    if(n===0){
      for(let k=0;k<8;k++)box(H,R,i+.05+k*.13,j+.14,.095,.8,2.77,.61,k%3?'paper':'coral',.6);
      drape(H,R,i+.06,j+.1,.98,.85,1.87,.2,'paper');
      for(let k=0;k<3;k++)H.outline(R,ell(...H.p(i+.5,j+.7,1.05),11+k*3,4+k),'blue',1.2);
      box(H,R,i+.06,j+.1,1.03,.85,.26,.34,'sun',.7);
    }else if(n===1){
      metal(H,R,i+.12,j+.08,.9,.78,2.77,.59,'blue');
      oval(H,R,...H.p(i+.56,j+.88,3.04),9,10,'paper',.65);
      oval(H,R,...H.p(i+.56,j+.9,3.04),5,6,'blue',.75);
      box(H,R,i+.14,j+.1,.92,.82,1.87,.23,'teal',.6);
      H.line(R,[H.p(i+.25,j+.94,2),H.p(i+.75,j+.94,2)],'paper',1.2);
      vessel(H,R,i+.51,j+.55,1.04,10,15,'coral');
      drape(H,R,i+.13,j+.18,.9,.85,.33,.19,'blue');
    }else{
      box(H,R,i+.06,j+.1,1,.89,.24,.55,'blue',.65);
      const p=H.p(i+.57,j+.99,.74);stroke(H,R,[[p[0]-6,p[1]],[p[0]-7,p[1]-8],[p[0]+6,p[1]-8],[p[0]+7,p[1]]],'sun',1.8);
      shape(H,R,H.faceI(i+.2,j+.93,.53,.39,.64),'paper',1,.5);
      shape(H,R,H.faceI(i+.25,j+.95,.2,.44,.6),'teal',.6,.4);
      for(let k=0;k<4;k++)box(H,R,i+.13,j+.2,.84,.8,1.87+k*.09,.07,'paper',.9);
      shape(H,R,H.faceI(i+.13,j+.99,.73,2.75,3.26),'sun',.45,.6);
      shape(H,R,H.faceI(i+.23,j+1,.46,2.81,3.17),'blue',.8,.5);
    }
  });
  for(let k=0;k<11;k++)H.line(R,[H.p(7.84+k*.31,1.76,.28),H.p(7.84+k*.31,1.76,.67)],'paper',.8);
  for(const i of [2.45,4.55])for(const j of [5.2,7.7])seat(H,R,i,j,(i+j)%2?'coral':'teal',i===2.45&&j===7.7);
  cushion(H,R,4.7,5.32,.79,.7,.92,.24,'sun');
  drape(H,R,4.63,7.79,.63,.64,.92,.57,'paper');
  const hook=H.p(2.49,8.3,.74);stroke(H,R,[[hook[0],hook[1]],[hook[0]-5,hook[1]+6],[hook[0]-8,hook[1]+2]],'sun',1.6);
  floorShadow(H,7.25,4.4,3,2.45,.28);
  for(const i of [7.4,9.91])for(const j of [4.56,6.35])metal(H,R,i,j,.14,.14,.05,1.41,'blue');
  for(const i of [7.48,9.83])bentTube(H,R,[[i,4.56,.35],[i,6.34,1.14]],1.8,'teal');
  timber(H,R,7.25,4.4,2.95,2.25,1.45,.17,'sun');
  timber(H,R,7.4,4.55,2.61,1.95,.52,.12,'teal');
  box(H,R,8.05,4.84,1.15,1.05,.65,.38,'blue',.66);
  for(let k=0;k<6;k++)H.line(R,[H.p(8.15+k*.16,5.9,.73),H.p(8.15+k*.16,5.9,.93)],'paper',.6);
  for(const i of [7.86,9.12])for(const j of [4.82,5.82])metal(H,R,i,j,.19,.18,1.64,.13,'blue');
  metal(H,R,7.73,4.67,1.68,1.4,1.78,.7,'paper');
  for(let n=0;n<9;n++)H.line(R,[H.p(8.06+n*.13,6.08,1.91),H.p(8.06+n*.13,6.08,2.29)],'blue',.85);
  for(let n=0;n<4;n++)H.dot(...H.p(8.79+n*.13,5.07,2.5),1.3,n?'teal':'coral');
  surface(H,R,H.tile(7.91,4.9,.71,.71,2.5),'blue',.6,.7);
  const lens=H.p(7.7,5.25,2.12);
  shape(H,R,[[lens[0]-31,lens[1]-6],[lens[0],lens[1]-15],[lens[0]+9,lens[1]+4],[lens[0]-22,lens[1]+14]],'blue',.8);
  oval(H,R,lens[0]-25,lens[1]+3,10,13,'teal',.6);
  oval(H,R,lens[0]-27,lens[1]+3,7,9,'paper',1);
  oval(H,R,lens[0]-28,lens[1]+3,4.6,6.7,'blue',.72);
  H.line(R,[[lens[0]-30,lens[1]-2],[lens[0]-30,lens[1]+5]],'paper',1.5);
  metal(H,R,9.5,5.0,.44,.9,1.65,.08,'teal');
  for(let n=0;n<4;n++)H.dot(...H.p(9.7,5.17+n*.16,1.74),1.15,'paper');
  const cap=H.p(9.61,6.25,1.65);oval(H,R,...cap,10,3.7,'blue',.8);
  stroke(H,R,[[lens[0]+3,lens[1]+10],H.p(8.2,6.35,1.7),[cap[0]-4,cap[1]]],'blue',.85);
  for(const d of [-2,2])H.outline(R,ell(cap[0]-13+d,cap[1]-4,2.2,2),'blue',.7);
  stroke(H,R,[H.p(9.4,4.87,1.95),H.p(10,4.7,1.85),H.p(10.1,5.12,.15),H.p(10.1,3.5,.05),H.p(9.7,2,.05)],'blue',1.4);
  timber(H,R,.15,9.3,1.11,2.26,.55,.14,'sun');
  for(const j of [9.51,10.85])timber(H,R,.38,j,.15,.15,.05,.5,'teal');
  drape(H,R,.36,9.47,.56,.66,.72,.31,'paper');
  surface(H,R,H.tile(.31,10.29,.6,.54,.72),'sun',.55,.6);
  surface(H,R,H.tile(.38,10.36,.45,.37,.73),'teal',.2,.5);
  H.line(R,[H.p(.32,11.08,.76),H.p(.77,11.08,.76)],'blue',2);
  for(let n=0;n<4;n++)H.line(R,[H.p(.34,11.07+n*.03,.78),H.p(.53,11.07+n*.03,.78)],'sun',.8);
  floorLight(H,3.7,6.4,135,.25);
},(H,R,t)=>{
  const u=((t%20)+20)%20, turn=smooth(4,8,u)*(1-smooth(12,17,u));
  screen(H,R,turn*.35);
  const lens=H.p(7.7,5.25,2.12),beam=[lens[0]-27,lens[1]+3];
  H.tint([beam,wallPt(H,'nw',2.1,1.32,-.42),wallPt(H,'nw',6.65,3.18,-.42)],'sun',.07);
  for(let n=0;n<6;n++){const a=n*Math.PI/3+turn*.55;H.line(R,[[lens[0]-15+Math.cos(a)*8,lens[1]+Math.sin(a)*11],[lens[0]-20+Math.cos(a)*8,lens[1]+2+Math.sin(a)*11]],'paper',.7);}
  const root=H.p(6.4,5.7,0),contact=[lens[0]-25,lens[1]+3],take=smooth(0,4,u)*(1-smooth(17,18,u));
  const idle=[root[0]+9,root[1]-32],hand=[idle[0]+(contact[0]-idle[0])*take,idle[1]+(contact[1]-idle[1])*take];
  person(H,R,'istanbulCinemaVolunteer',root,{r:hand},{shirt:['coral',.7],pants:['blue',.65],hairStyle:'short'});
  person(H,R,'istanbulCinemaViewer',H.p(2.99,8.3,.36),{},{shirt:['teal',.65],pants:['blue',.6],hairStyle:'bun',face:'nw',head:-8+12*smooth(8,10,u)*(1-smooth(10,12,u))},true);
});
room.loopSeconds=20;
room.stillTime=18.5;
export default room;
