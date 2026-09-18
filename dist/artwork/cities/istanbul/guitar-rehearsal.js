import { world, shape, oval, stroke, box, wallPt, ell } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, cushion, drape, vessel, pendant, floorLight } from '../materials.js';
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
  FIGURES.draw(H, R, { who: 'adult', x: root[0], y: root[1], ground: root, scale, face: 'se', clip: name, phase: 0, opts });
}
function guitar(H,R,x,y,scale=1) {
  const P=(a,b)=>[x+a*scale,y+b*scale];
  const body=[[-14,9],[-19,-2],[-16,-13],[-8,-18],[-8,-25],[-2,-31],[8,-29],[12,-22],[9,-14],[18,-9],[20,3],[14,14],[1,18]];
  shape(H,R,body.map(([a,b])=>P(a+3,b+2)),'coral',.6,.9);
  shape(H,R,body.map(([a,b])=>P(a,b)),'sun',.7,.9);
  stroke(H,R,[P(-11,11),P(-15,0),P(-11,-11),P(-3,-16)],'paper',1.2);
  const neck=[P(2,-23),P(27,-58),P(33,-54),P(8,-19)];
  shape(H,R,neck,'blue',.72,.6);
  shape(H,R,[P(26,-59),P(32,-69),P(41,-65),P(34,-53)],'sun',.78,.7);
  for(let n=0;n<6;n++){
    const a= n*.95;
    H.line(R,[P(-3+a,4),P(30+a,-60)],'paper',.42);
  }
  for(let n=0;n<9;n++) H.line(R,[P(6+n*2.8,-26-n*3.8),P(11+n*2.8,-22-n*3.8)],'sun',.62);
  for(const s of [-1,1])for(let n=0;n<3;n++){
    const p=P(31+n*2.2+s*5,-59-n*3.3+s*2);
    H.line(R,[p,[p[0]+s*3,p[1]+s*2]],'blue',.9);
    oval(H,R,p[0]+s*4,p[1]+s*2,2.2,1.5,'paper',1);
  }
  oval(H,R,...P(3,-9),7*scale,8*scale,'blue',.8);
  H.outline(R,ell(...P(3,-9),9*scale,10*scale),'coral',.8);
  shape(H,R,[P(-6,2),P(10,1),P(11,5),P(-5,7)],'blue',.76,.55);
  for(let n=0;n<6;n++) H.dot(...P(-3+n*2,4),.65,'paper');
  shape(H,R,[P(7,-3),P(12,-4),P(10,3)],'paper',1,.45);
  stroke(H,R,[P(-8,-17),P(-12,-35),P(-2,-53),P(14,-42)],'blue',2.5);
}
function amp(H,R,i,j,w=1.75,z=.12) {
  metal(H,R,i,j,w,1.08,z,1.35,'blue');
  surface(H,R,H.faceI(i+.12,j+1.09,w-.24,z+.12,z+1.04),'paper',.7,.7);
  for(let n=0;n<15;n++)H.line(R,[H.p(i+.17+n*(w-.35)/14,j+1.1,z+.18),H.p(i+.17+n*(w-.35)/14,j+1.1,z+1)],'blue',.45);
  for(let n=0;n<7;n++)H.line(R,[H.p(i+.16,j+1.11,z+.22+n*.11),H.p(i+w-.15,j+1.11,z+.22+n*.11)],'sun',.45);
  for(let n=0;n<4;n++)H.dot(...H.p(i+.22+n*.31,j+1.12,z+1.2),2.1,n?'paper':'coral');
  bentTube(H,R,[[i+.4,j+.6,z+1.38],[i+.4,j+.6,z+1.54],[i+1.2,j+.6,z+1.54],[i+1.2,j+.6,z+1.38]],1.8,'blue');
  drape(H,R,i,j+.74,.36,.34,z+1.39,.32,'coral');
}
const room=world('istanbul-guitar-rehearsal','A phrase behind the shop',{wall:'blue',wallTone:.48,height:3.85,floor:'sun',tone:.2,pattern:'boards',head:35},(H,R)=>{
  for(const side of ['nw','ne']){
    cornice(H,R,side,.1,11.9,3.85,'sun');
    for(let p=.6;p<11.7;p+=1.4){
      const Q=(u,z)=>wallPt(H,side,p+u,z,-.12);
      shape(H,R,[Q(0,.85),Q(1.18,.85),Q(1.18,3.4),Q(0,3.4)],'teal',.55,.85);
      shape(H,R,[Q(.1,.95),Q(1.05,.95),Q(1.05,3.3),Q(.1,3.3)],'blue',.47,.7);
      for(let n=0;n<6;n++)H.line(R,[Q(.16+n*.15,1),Q(.16+n*.15,3.22)],'sun',.65,{tone:.45});
      for(const z of [1.1,3.15])H.dot(...Q(.59,z),1.5,'coral');
    }
  }
  recessedFrame(H,R,'nw',8.5,2.45,1.65,1.7,'sun',Q=>{
    shape(H,R,[Q(.12,.12),Q(2.3,.12),Q(2.3,1.54),Q(.12,1.54)],'blue',.9);
    for(let n=0;n<4;n++)shape(H,R,[Q(.2+n*.54,.15),Q(.5+n*.54,.15),Q(.5+n*.54,.6+n%2*.3),Q(.2+n*.54,.6+n%2*.3)],'teal',.6,.4);
    H.line(R,[Q(1.22,.1),Q(1.22,1.6)],'paper',2.2);
    H.line(R,[Q(.1,.85),Q(2.3,.85)],'paper',2);
  });
  for(let n=0;n<5;n++) timber(H,R,.1,8.46+n*.47,.18,.42,1.65,1.7,'sun');
  recessedFrame(H,R,'nw',3.7,2.15,1.95,1.52,'coral',Q=>{
    shape(H,R,[Q(.12,.13),Q(2,.13),Q(2,1.4),Q(.12,1.4)],'paper',1);
    shape(H,R,[Q(.25,.28),Q(1.2,1.17),Q(1.79,.43)],'teal',.7);
    oval(H,R,...Q(1.35,1.08),7,7,'sun',.85);
    H.line(R,[Q(.36,.26),Q(1.8,.26)],'coral',1.6);
  });
  timber(H,R,.1,3.5,.72,3.5,1.37,.13,'sun');
  const pick=H.p(.45,4.0,1.51);shape(H,R,[[pick[0]-4,pick[1]-4],[pick[0]+5,pick[1]-3],[pick[0],pick[1]+5]],'coral',.8,.6);
  H.line(R,[[pick[0]-2,pick[1]-1],[pick[0]+2,pick[1]+2]],'paper',.8);
  amp(H,R,1.68,2.6,2.1);
  amp(H,R,9.15,1.1,1.35,2.06);
  const rug=H.tile(2.5,3.75,5.45,4.05,.03);surface(H,R,rug,'teal',.23,.7);
  H.outline(R,H.tile(2.67,3.9,5.1,3.75,.035),'sun',1.1);
  for(let n=0;n<24;n++)H.line(R,[H.p(2.65+n*.22,7.81,.03),H.p(2.65+n*.22,8.01,.03)],'coral',.75);
  floorShadow(H,4.25,4.1,3.2,1.8,.25);
  for(const x of [4.28,6.86])for(const j of [4.3,5.25])timber(H,R,x,j,.18,.18,.05,.86,'sun');
  timber(H,R,4.16,4.2,2.97,1.32,.83,.14,'sun');
  cushion(H,R,4.22,4.24,2.84,1.22,.98,.19,'coral');
  for(const x of [4.3,6.83]) bentTube(H,R,[[x,4.3,.85],[x,4.18,1.8]],2.4,'teal');
  surface(H,R,H.faceI(4.2,4.19,2.93,1.3,1.83),'coral',.57);
  drape(H,R,6.3,4.4,.6,.85,1.2,.59,'paper');
  for(const side of [-1,1])bentTube(H,R,[[3.3,4.62,.02],[3.3+side*.6,4.3,.02],[3.3,4.4,.15],[3.3,4.4,1.94]],2,'blue');
  bentTube(H,R,[[3.05,4.4,1.9],[3.1,4.4,1.8],[3.47,4.4,1.8],[3.54,4.4,1.94]],3.2,'coral');
  cabinetFrame(H,R,8.8,.2,2.9,1.65,.09,3.58,2,'sun',(i,j,w,d,z,h,n)=>{
    if(n===0){
      for(const level of [1.5,2.15,2.8])timber(H,R,i,j,w,d,level,.09,'sun');
      for(let k=0;k<7;k++)box(H,R,i+.08+k*.14,j+.3,.1,.9,2.91,.45,k%3?'paper':'coral',.65);
      box(H,R,i+.12,j+.15,.83,.62,2.29,.19,'teal',.6);
      const p=H.p(i+.47,j+.65,2.49); oval(H,R,...p,6,2,'blue',.8); H.dot(p[0]+10,p[1],1.8,'coral');
      drape(H,R,i+.1,j+.12,.88,.9,1.62,.25,'paper');
      box(H,R,i+.12,j+.13,.85,.85,.25,.52,'teal',.4);
      for(let k=0;k<3;k++)H.outline(R,ell(...H.p(i+.55,j+.65,.82),11-k*2,4-k*.7),'blue',1);
    }else{
      const p=H.p(i+.58,j+.75,.24);
      shape(H,R,[[p[0]-15,p[1]],[p[0]+16,p[1]],[p[0]+18,p[1]-36],[p[0]+9,p[1]-49],[p[0]+8,p[1]-82],[p[0]-7,p[1]-82],[p[0]-7,p[1]-49],[p[0]-18,p[1]-35]],'blue',.68);
      H.line(R,[[p[0]-10,p[1]-4],[p[0]-13,p[1]-30],[p[0]-4,p[1]-47],[p[0]-3,p[1]-76]],'sun',1.3);
      stroke(H,R,[[p[0]+13,p[1]-39],[p[0]+22,p[1]-39],[p[0]+22,p[1]-26],[p[0]+14,p[1]-26]],'coral',2.4);
      for(let k=0;k<5;k++)H.line(R,[[p[0]+17,p[1]-36+k*2],[p[0]+22,p[1]-34+k*2]],'paper',.65);
    }
  });
  timber(H,R,8.7,.15,3.1,1.8,3.71,.13,'sun');
  metal(H,R,9.0,.7,.55,.52,3.85,.54,'paper');
  oval(H,R,...H.p(9.28,1.23,4.1),6,7,'blue',.72);
  box(H,R,9.6,.8,1.25,.4,3.84,.13,'coral',.5);
  bentTube(H,R,[[7.5,.13,3.5],[7.5,.42,3.5],[7.5,.42,2.5]],1.8,'blue');
  drape(H,R,7.25,.3,.7,.3,3.42,1.23,'coral');
  for(const j of [8.52,9.4])for(const i of [3.65,6.3])timber(H,R,i,j,.15,.15,.05,.68,'teal');
  timber(H,R,3.55,8.4,3.02,1.27,.69,.15,'sun');
  const dish=H.p(4.02,8.82,.86);oval(H,R,...dish,13,5,'paper',1);
  for(const [x,y,ink]of [[-5,0,'coral'],[3,-1,'teal'],[7,2,'sun']])shape(H,R,[[dish[0]+x-3,dish[1]+y-2],[dish[0]+x+3,dish[1]+y-2],[dish[0]+x,dish[1]+y+4]],ink,.7,.4);
  drape(H,R,4.61,8.5,.71,.72,.86,.3,'paper');
  metal(H,R,5.6,8.75,.58,.35,.86,.08,'teal');
  H.line(R,[H.p(5.67,8.95,.97),H.p(5.99,8.95,.97)],'coral',2.5);
  for(let n=0;n<4;n++) H.line(R,[H.p(5.8+n*.15,8.56,.87),H.p(5.8+n*.15,8.95,.87)],'blue',.6);
  metal(H,R,5.9,6.85,.6,.84,.06,.19,'teal');
  surface(H,R,H.tile(5.97,7.03,.45,.48,.27),'coral',.7,.7);
  stroke(H,R,[H.p(2.8,3.7,.28),H.p(3.4,3.9,.03),H.p(3.55,6.8,.03),H.p(5.97,7.4,.1)],'blue',1.6);
  for(let n=0;n<3;n++)H.outline(R,ell(...H.p(2.5,6.2,.03),17+n*4,6+n*2),'blue',1.2);
  for(const i of [9.22,10.22])for(const j of [6.8,7.64])timber(H,R,i,j,.1,.1,.04,.73,'teal');
  cushion(H,R,9.1,6.7,1.34,1.13,.75,.16,'sun');
  for(const i of [9.23,10.25])timber(H,R,i,6.7,.1,.1,.72,.99,'teal');
  surface(H,R,H.faceI(9.15,6.75,1.2,1.23,1.75),'sun',.42);
  vessel(H,R,10.92,8.65,.05,10,23,'teal',false);
  oval(H,R,...H.p(9.47,9.4,.05),17,8,'blue',.55);
  oval(H,R,...H.p(9.47,9.4,.07),12,5,'coral',.6);
  pendant(H,R,5.9,.6,3.9,2.87,'coral',.9);
  floorLight(H,5.4,5.3,145,.4);
},(H,R,t)=>{
  const u=((t%18)+18)%18, beat=Math.max(0,Math.min(1,(u-3.6)/3.6)), phrase=Math.sin(beat*Math.PI*8)*Math.sin(beat*Math.PI)*3, relax=smooth(10.8,12.5,u)*(1-smooth(14.4,16,u));
  const root=H.p(5.55,5.17,.65), g=[root[0]+7,root[1]-21];
  const pick=[g[0]+3+phrase+relax*6,g[1]-7+phrase*.5+relax*5], fret=[g[0]+17-relax*3,g[1]-32+relax*4+phrase*.25];
  person(H,R,'istanbulGuitarPlayer',root,{l:pick,r:fret},{shirt:['paper',1],pants:['blue',.7],hairStyle:'curly'},true);
  guitar(H,R,...g,.78);

  H.dot(...pick,2.6,'coral',.35,{knock:true});
  H.dot(...fret,2.6,'coral',.35,{knock:true});
  person(H,R,'istanbulGuitarBandmate',H.p(9.72,7.42,.39),{},{shirt:['coral',.67],pants:['blue',.55],hairStyle:'pony',head:10+16*smooth(7.6,8.5,u)*(1-smooth(8.5,9.4,u))},true);
  const nod=smooth(7.6,8.5,u)*(1-smooth(8.5,9.4,u));
  H.line(R,[H.p(9.58,7.4,1.43+nod*.035),H.p(9.85,7.4,1.43+nod*.035)],'coral',.65);
  stroke(H,R,[H.p(7.35,.36,2.28),H.p(7.4,.42,2.15),H.p(7.4+Math.sin(u/18*Math.PI*2)*.08,.42,2.02)],'paper',1.4);
});
room.loopSeconds=18;
room.stillTime=9;
export default room;
