import { world, actor, shape, oval, stroke, box, ell, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, bentTube, drape, slattedSeat, floorLight } from '../materials.js';
import { cabinetFrame, basin, boardFloor } from '../structure.js';
import { recessedFrame, windowBay, panelFront, hangingRail, taskLight } from '../joinery.js';

const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };
const rest = FIGURES.sample('idle', 0), sit = FIGURES.sample('sit', 0);
FIGURES.clips['london-barber-customer'] = { dur: 20, keys: [[0, { ...sit, head: 1, al: 15, ar: 14 }], [.4, { ...sit, head: -17, al: 15, ar: 14 }], [.6, { ...sit, head: -17, al: 15, ar: 14 }], [.9, { ...sit, head: 1, al: 15, ar: 14 }], [1, { ...sit, head: 1, al: 15, ar: 14 }]] };
FIGURES.clips['london-barber-mirror'] = { dur: 20, keys: [[0, { ...rest, al: 62, el: 25, ar: 65, er: 42 }], [.2, { ...rest, al: 68, el: 22, ar: 105, er: 24, head: 6 }], [.4, { ...rest, al: 72, el: 20, ar: 113, er: 24, head: 10 }], [.6, { ...rest, al: 72, el: 20, ar: 113, er: 24, head: 10 }], [.9, { ...rest, al: 62, el: 25, ar: 65, er: 42 }], [1, { ...rest, al: 62, el: 25, ar: 65, er: 42 }]] };
function comb(H, R, p, short = false) {
  const [x, y] = p; H.line(R, [[x - 11, y], [x + 11, y - 4]], 'blue', 2.1);
  for (let k = 0; k < 10; k++) H.line(R, [[x - 10 + k * 2.1, y - k * .4], [x - 9 + k * 2.1, y + (short && k === 3 ? 3 : 6) - k * .4]], k === 3 && short ? 'sun' : 'blue', .8);
}
function chair(H, R, turn, person, t) {
  const c = Math.cos(turn), s = Math.sin(turn), P = (x, y, z) => H.p(6.05 + x * c - y * s, 5.7 + x * s + y * c, z);
  const slab = (x, y, w, d, z, h, ink) => { shape(H, R, [P(x,y,z),P(x+w,y,z),P(x+w,y+d,z),P(x,y+d,z)], ink, .5); shape(H,R,[P(x,y+d,z-h),P(x+w,y+d,z-h),P(x+w,y+d,z),P(x,y+d,z)],ink,.7); };
  for (const x of [-.6,.6]) H.line(R,[P(x,-.48,.7),P(x,-.55,1.65)],'blue',3);
  shape(H,R,[P(-.66,-.53,.82),P(.66,-.53,.82),P(.63,-.56,1.58),P(-.63,-.56,1.58)],'coral',.68);
  for (const x of [-.45,0,.45]) H.line(R,[P(x,-.58,.89),P(x,-.58,1.48)],'sun',.8);
  slab(-.64,-.5,1.28,1.04,.76,.14,'coral');
  for(const x of [-.76,.7]) { H.line(R,[P(x,-.33,.6),P(x,-.33,1.09),P(x,.62,1.09)],'blue',3); slab(x-.07,-.38,.17,1.05,1.13,.13,'teal'); H.line(R,[P(x-.05,-.28,1.145),P(x-.05,.48,1.145)],'paper',1.2); }
  H.line(R,[P(-.42,.51,.59),P(-.42,1.02,.29),P(.42,1.02,.29),P(.42,.51,.59)],'blue',3);
  slab(-.53,.87,1.06,.48,.29,.075,'teal');
  for(let k=0;k<7;k++) H.line(R,[P(-.4+k*.13,.94,.301),P(-.4+k*.13,1.25,.301)],'paper',1);
  if(person) {
    actor(H,R,6.05,5.7,t,'london-barber-customer',{shirt:['paper',1],hairStyle:'short',skin:['coral',.58],face:'se'},.24,1.65);
    const flutter=Math.sin(t*Math.PI/10)*.025;
    const top=H.p(6.05,5.7,1.52),edge=[P(-.77,.18,.58),P(-.4,.9,.43+flutter),P(.12,1.0,.47-flutter),P(.72,.73,.52),P(.77,-.04,.81)];
    shape(H,R,[[top[0]-8,top[1]+2],[top[0]+8,top[1]+2],...edge], 'teal',.77);
    for(let n=0;n<5;n++) H.line(R,[[top[0]-5+n*2.5,top[1]+5],edge[n]],n%2?'paper':'blue',n%2?.8:1.1,{tone:.6});
    H.line(R,edge,'sun',1.1);
    oval(H,R,top[0]+7,top[1]+3,2.4,1.5,'sun');
  }
}
const room=world('london-corner-barber','A cape settles',{wall:'paper',wallTone:.8,height:3.9,floor:'paper',tone:.14,head:35},(H,R)=>{
  boardFloor(H,R,.15,.15,11.7,11.7,.03,'sun',.58);
  for(const side of ['ne','nw']) for(const z of [.16,1.13,3.73]) H.line(R,[wallPt(H,side,.1,z,-.12),wallPt(H,side,11.85,z,-.12)],'teal',z===1.13?4:2);
  recessedFrame(H,R,'ne',3.42,4.18,.6,2.96,'sun',P=>{
    shape(H,R,[P(.15,.15),P(4.02,.15),P(4.02,2.8),P(.15,2.8)],'paper',1);
    shape(H,R,[P(.35,.18),P(3.8,.18),P(3.8,.7),P(.35,1.4)],'teal',.18,.4);
    shape(H,R,[P(1.3,.15),P(2.65,.15),P(2.65,1.18),P(1.3,1.18)],'coral',.18,.4);
    H.line(R,[P(.3,.7),P(1.2,2.6)],'paper',5);
    shape(H,R,[P(3.67,2.63),P(4.06,2.63),P(4.06,2.85),P(3.67,2.85)],'coral',.55,.6);
    for(let n=0;n<4;n++) H.line(R,[P(3.7+n*.1,2.65),P(3.7+n*.1,2.8)],'sun',.8);
  });
  windowBay(H,R,'nw',1.05,3.18,1.55,1.83,{night:true,divisions:2});
  for(const pos of [4.75,6.18,7.61]) recessedFrame(H,R,'nw',pos,1.02,2.18,1.04,'teal',P=>{const p=P(.51,.61);oval(H,R,...p,9,11,'paper');shape(H,R,[[p[0]-10,p[1]-2],[p[0]-8,p[1]-12],[p[0],p[1]-15],[p[0]+10,p[1]-7],[p[0]+10,p[1]-1]],pos===6.18?'coral':'blue',.7);});
  for(const x of [3.1,7.95]) { const p=wallPt(H,'ne',x,2.18,-.36); H.line(R,[[p[0],p[1]+22],[p[0],p[1]-22]],'blue',4); oval(H,R,...p,6,19,'sun',.8); H.glow(p[0],p[1],34,56,'sun',.19); }
  box(H,R,2.7,.35,5.2,1.52,.1,.92,'teal',.6);
  panelFront(H,R,2.7,1.88,5.2,.13,.8,4,'teal');
  timber(H,R,2.62,.31,5.38,1.62,1.03,.13,'sun');
  basin(H,R,6.25,.53,1.43,1.18,1.16);
  metal(H,R,3.02,.59,1.3,.96,1.17,.55,'paper');
  shape(H,R,H.faceI(3.17,1.57,1.02,1.27,1.61),'blue',.62);
  for(let n=0;n<3;n++) { drape(H,R,3.23,.91,.87,.62,1.29+n*.085,.055,'paper'); }
  H.line(R,[H.p(3.35,1.59,1.58),H.p(3.96,1.59,1.58)],'sun',1.5);
  metal(H,R,4.72,.95,.53,.57,1.18,.12,'blue');
  metal(H,R,4.82,1.08,.29,.38,1.29,.13,'coral');
  bentTube(H,R,[[5.02,1.2,1.4],[5.48,1.44,1.19],[5.42,1.7,.61],[5.02,1.9,.42],[4.78,1.83,.55]],1.1,'blue');
  comb(H,R,H.p(5.37,1.62,1.18),true);
  vessel(H,R,5.88,.83,1.2,7,13,'teal');
  for(let n=0;n<5;n++) H.line(R,[H.p(5.81+n*.045,.83,1.5),H.p(5.72+n*.08,.83,1.86)],n%2?'sun':'blue',1.7);
  comb(H,R,H.p(6.08,.8,1.5));
  cabinetFrame(H,R,8.9,.36,2.35,1.45,.12,2.65,2,'sun',(i,j,w,d,z,h,n)=>{
    for(const zz of [.84,1.64]) timber(H,R,i,j,w,d,zz,.09,'sun');
    if(n) for(let k=0;k<4;k++) vessel(H,R,i+.17+k*.23,j+.69,1.75,3.7,12+k%2*7,['teal','coral','paper'][k%3]);
    else for(let k=0;k<4;k++) drape(H,R,i+.09,j+.14,.76,.77,1.75+k*.13,.08,'paper');
    box(H,R,i+.08,j+.16,w-.15,d-.06,.26,.42,'teal',.55);
    H.line(R,[H.p(i+.3,j+d+.12,.51),H.p(i+.65,j+d+.12,.51)],'sun',1.5);
  });
  hangingRail(H,R,'nw',9.3,1.55,2.48,2,(P,u,n)=>{const p=P(u,-.14); if(n) { H.line(R,[p,[p[0],p[1]+37]],'sun',2);shape(H,R,[[p[0]-9,p[1]+33],[p[0]+9,p[1]+33],[p[0]+9,p[1]+43],[p[0]-9,p[1]+43]],'teal',.6); } else shape(H,R,[[p[0]-7,p[1]],[p[0]+7,p[1]],[p[0]+8,p[1]+28],[p[0]-8,p[1]+28]],'paper',1);});
  slattedSeat(H,R,.7,7.1,3.38,.05,'teal',.74);
  for(let n=0;n<3;n++) box(H,R,1.2+n*.32,7.42,.7,.46,.74+n*.025,.035,['coral','paper','sun'][n],.65);
  timber(H,R,1.35,8.97,.74,.75,.05,.55,'sun');
  drape(H,R,1.3,8.92,.85,.86,.72,.12,'coral');
  bentTube(H,R,[[.6,9.2,.05],[.6,9.2,2.3],[.6,9.2,2.66]],2.8,'blue');
  for(const j of [8.85,9.5]) bentTube(H,R,[[.6,9.2,2.15],[.6,j,2.35]],1.7,'sun');
  const cv=wallPt(H,'ne',10.15,3.32,-.18);oval(H,R,...cv,12,12,'paper');H.line(R,[[cv[0],cv[1]-7],cv,[cv[0]+6,cv[1]+3]],'blue',1.2);
  for(let n=0;n<6;n++)H.line(R,[wallPt(H,'nw',10.57+n*.11,3.18,-.2),wallPt(H,'nw',10.57+n*.11,3.56,-.2)],'paper',1.2);
  box(H,R,9.15,5.9,1.14,.85,.25,.49,'teal',.5);
  metal(H,R,9.13,5.87,1.19,.91,.77,.065,'paper');
  for(const x of [9.17,10.16])for(const j of [5.94,6.63])metal(H,R,x,j,.09,.09,.07,.22,'blue');
  comb(H,R,H.p(9.73,6.38,.86));
  const sp=H.p(9.73,6.21,.89);oval(H,R,sp[0]-4,sp[1],2.5,2,'sun');oval(H,R,sp[0]+2,sp[1]+1,2.5,2,'sun');H.line(R,[[sp[0]-2,sp[1]],[sp[0]+10,sp[1]-7]],'blue',1.1);
  floorLight(H,6.0,5.6,110,.36);
  oval(H,R,...H.p(6.05,5.7,.08),33,15,'blue',.48);
  oval(H,R,...H.p(6.05,5.7,.15),27,12,'paper',1);
  metal(H,R,5.9,5.53,.3,.32,.18,.38,'teal');
  bentTube(H,R,[[6.08,5.7,.37],[6.95,5.6,.4],[7.02,5.84,.4]],2.1,'blue');
  vessel(H,R,10.15,5.17,.05,15,32,'teal',false);
  oval(H,R,...H.p(10.15,5.17,1.08),15,5,'paper');
  shape(H,R,H.tile(8.8,5.9,1.35,1.0,.04),'teal',.2);
  vessel(H,R,9.02,6.1,.08,7,14,'paper',false);
  for(let n=0;n<4;n++) H.line(R,[H.p(4.8+n*.13,8.15,.04),H.p(4.95+n*.13,8.12,.04)],'blue',.65);
},(H,R,t)=>{
  const u=((t%20)+20)%20,turn=.23*ease(4,8,u)*(1-ease(12,18,u));
  actor(H,R,5.0,4.91,t,'london-barber-mirror',{shirt:['paper',1],apron:['coral',.66],hairStyle:'curly',skin:['coral',.45],prop:(HH,RR,p)=>{
    const [x,y]=p.rhand;
    H.line(R,[[x,y],[x+3,y-10]],'sun',3);
    oval(HH,RR,x+5,y-19,10,13,'sun',.65);
    oval(HH,RR,x+5,y-19,7.3,10,'paper',1);
    H.line(R,[[x+1,y-22],[x+6,y-26]],'teal',1.1);
  }},0,1.62);
  chair(H,R,turn,true,t);
});
room.loopSeconds=20;
room.stillTime=10;
export default room;
