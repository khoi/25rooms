import { world, shape, stroke, oval, ell, loop, actor, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, vessel, cushion, bentTube, drape } from '../materials.js';
import { boardFloor, cabinetFrame } from '../structure.js';

const smooth = (a, b, t) => { const q = Math.max(0, Math.min(1, (t - a) / (b - a))); return q * q * (3 - 2 * q); };
const rest = FIGURES.sample('idle', 0);
FIGURES.clips.mexicoBoatKeeper = { dur: 24, keys: [[0, rest], [1, rest]] };

function keeper(H, R, t, rise, slack) {
  const i = 6.6, j = 7.2, z = .52 + rise, scale = 1.55;
  const base = H.p(i, j, z), left = [base[0] - 8, base[1] - 55 - slack * 2], right = [base[0] + 10, base[1] - 57 + slack * 5];
  const pose = { ...rest, head: -12 + slack * 15, drop: .14, ll: 33, lr: 28, kl: -42, kr: -35 };
  for (const [s, target] of [['l', left], ['r', right]]) {
    const dx = (target[0] - base[0]) / scale - (s === 'l' ? -5.2 : 5.2), dy = (target[1] - base[1]) / scale + 32.5 - pose.drop * 19;
    const a = 8.4 * .52, b = 8.4 * .5, distance = Math.min(a + b - .001, Math.hypot(dx, dy)), bend = Math.acos(Math.max(-1, Math.min(1, (distance * distance - a * a - b * b) / (2 * a * b))));
    pose['a' + s] = (Math.atan2(dx, dy) - Math.atan2(b * Math.sin(bend), a + b * Math.cos(bend))) * 180 / Math.PI;
    pose['e' + s] = bend * 180 / Math.PI;
  }
  FIGURES.clips.mexicoBoatKeeper.keys = [[0, pose], [1, pose]];
  actor(H, R, i, j, t, 'mexicoBoatKeeper', { shirt: ['paper', 1], apron: ['teal', .72], hairStyle: 'cap', face: 'se' }, z, scale);
  return { left, right };
}

function rope(H, R, x, y, radius, turns = 4) {
  for (let n = 0; n < turns; n++) H.outline(R, ell(x, y + n * 1.5, radius - n, (radius - n) * .38), 'sun', 2, { tone: .9 });
  H.line(R, [[x + radius, y], [x + radius + 5, y + 7], [x + radius + 2, y + 13]], 'blue', .8);
}

function hull(H, R, rise) {
  const P = (i, j, z) => H.p(i, j, z + rise);
  const rim = [[1.35, 6.05], [2.05, 4.55], [8.95, 4.55], [10.3, 5.4], [10.55, 7.35], [9.7, 8.45], [2.1, 8.45], [1.35, 7.2]];
  const inner = [[1.8, 6.05], [2.4, 4.9], [8.85, 4.9], [9.96, 5.57], [10.12, 7.2], [9.48, 8.02], [2.36, 8.02], [1.8, 7.05]];
  shape(H, R, rim.map(([i,j]) => P(i,j,.9)), 'teal', .82, 1.2);
  shape(H, R, inner.map(([i,j]) => P(i,j,.76)), 'blue', .68);
  shape(H, R, inner.map(([i,j]) => P(i,j,.36)), 'sun', .5);
  for (let j = 5.12; j < 7.95; j += .35) H.line(R, [P(2.32,j,.38),P(9.45,j,.38)], 'blue', .65, { tone: .65 });
  for (const i of [2.65,4.25,6.1,8.45]) {
    shape(H,R,[P(i,4.97,.42),P(i+.13,4.97,.42),P(i+.13,8,.42),P(i,8,.42)],'teal',.7);
    H.line(R,[P(i,4.86,.78),P(i,5.14,.37),P(i,7.78,.37),P(i,8.1,.8)],'sun',2);
  }
  for (const i of [3.4,6.1,8.6]) {
    timber(H,R,i,5.08,.17,2.83,.38+rise,.28,'teal');
    timber(H,R,i-.16,4.96,.62,3.1,.67+rise,.12,'sun');
    H.line(R,[P(i-.12,7.94,.8),P(i+.39,7.94,.8)],'paper',2.4);
  }
  shape(H,R,[P(1.35,7.2,.9),P(2.1,8.45,.9),P(9.7,8.45,.9),P(10.55,7.35,.9),P(9.55,8.15,.1),P(2.5,8.15,.1)],'teal',.8,1.2);
  for (const z of [.28,.49,.7]) H.line(R,[P(2.28,8.34,z),P(9.6,8.34,z)],'blue',.8);
  H.line(R,[P(1.45,7.22,.92),P(2.18,8.5,.92),P(9.75,8.5,.92),P(10.56,7.36,.92)],'sun',3);
  for (const i of [2.7,4.2,6.1,7.8,9.2]) for (const z of [.28,.69]) H.dot(...P(i,8.4,z),1.25,'paper',.85);
  for(const i of [3.02,8.89]) {const [x,y]=P(i,8.47,.61);stroke(H,R,[P(i,8.33,.94),[x,y-4],[x+4,y+6]],'sun',1.2);oval(H,R,x+4,y+12,6,13,'sun',.75);for(let n=0;n<6;n++)H.line(R,[[x-1,y+3+n*3],[x+9,y+6+n*3]],'blue',.65);}
  for (const i of [2.9,7.6,9.05]) H.line(R,[P(i,8.43,.88),P(i+.27,8.43,.85)],'paper',2);
  shape(H,R,[P(7.35,6.35,.42),P(8.4,6.35,.42),P(8.4,7.45,.42),P(7.35,7.45,.42)],'sun',.32);
  H.line(R,[P(7.8,6.7,.43),P(8,6.7,.43)],'blue',2);
  for(const j of [5.15,7.8]) {
    timber(H,R,2.45,j,6.65,.16,.43+rise,.14,'teal');
    for(const i of [3.25,4.92,7.45,8.86]) {metal(H,R,i,j-.035,.24,.22,.58+rise,.1,'sun');H.dot(...P(i+.12,j+.08,.7),1.1,'blue');}
  }
  const lid=[P(7.38,6.38,.45),P(8.35,6.38,.45),P(8.35,6.77,1.05),P(7.38,6.77,1.05)];
  shape(H,R,[P(7.35,6.35,.44),P(8.4,6.35,.44),P(8.4,7.45,.44),P(7.35,7.45,.44)],'blue',.82);
  rope(H,R,...P(7.85,7.14,.45),9,3);shape(H,R,lid,'sun',.65);
  H.line(R,[P(7.85,6.57,.75),P(8.07,6.57,.75)],'blue',2);
  for(const i of [7.52,8.15])metal(H,R,i,6.34,.16,.2,.45+rise,.07,'teal');
  for(const [i,j] of [[2.2,5.25],[9.38,7.32]]) {const [x,y]=P(i,j,.91);oval(H,R,x,y,6,2.7,'blue');H.line(R,[[x-8,y-3],[x+8,y-3]],'sun',2.2);}
  const [bx,by]=P(9.28,5.73,.4);shape(H,R,[[bx-10,by-2],[bx+11,by-2],[bx+8,by-13],[bx-8,by-13]],'paper',1);oval(H,R,bx,by-12,9,4,'teal',.4);H.line(R,[[bx+7,by-12],[bx+17,by-19]],'sun',2.3);
  const [ux,uy]=P(2.72,5.55,.43);shape(H,R,[[ux-9,uy],[ux+10,uy],[ux+7,uy-23],[ux-6,uy-24]],'coral',.62);H.line(R,[[ux-3,uy-20],[ux+3,uy-20]],'paper',2);stroke(H,R,[[ux-7,uy-19],[ux-12,uy-30],[ux+7,uy-29],[ux+9,uy-19]],'blue',1.3);
  cushion(H,R,3.3,6.2,.75,1.28,.8+rise,.11,'paper');
  vessel(H,R,9.15,6.15,.4+rise,9,12,'coral');
  rope(H,R,...P(2.5,6.6,.47),11,3);
}

const room = world('mexico-city-boat-canopy', 'The shade stays on the boat', { wall: false, floor: 'teal', tone: .53, head: 10 }, (H,R) => {
  H.tint(H.tile(0,3.5,12,8.5,.015),'blue',.17);
  for (let j=4.1;j<11.9;j+=.65) for (let i=.2;i<11.9;i+=2.2) H.line(R,[H.p(i,j,.025),H.p(i+1.05,j-.08,.025),H.p(i+1.5,j,.025)],'paper',.7,{tone:.55});
  timber(H,R,0,0,12,3.75,.06,.42,'sun');
  boardFloor(H,R,0,0,12,3.75,.49,'sun',.42);
  for (const i of [.25,4,8.25,11.6]) { timber(H,R,i,3.2,.2,.22,-.05,1.15,'teal'); oval(H,R,...H.p(i+.1,3.31,1.1),4,2,'paper'); }
  bentTube(H,R,[[.3,.25,.65],[.3,.25,2.2],[4,.25,2.37],[8,.25,2.2],[11.6,.25,1.9]],3,'teal');
  for (const i of [2.2,5,8,11.6]) bentTube(H,R,[[i,.25,.5],[i,.25,2.2]],2,'teal');
  for (let i=.5;i<4.3;i+=.22) H.line(R,[H.p(i,.38,1.05),H.p(i+.04,.38,2.84-(i%1)*.18)],'sun',2.1);
  H.line(R,[H.p(.5,.38,1.55),H.p(4.3,.38,1.55)],'blue',1.2);
  H.line(R,[H.p(.5,.38,2.26),H.p(4.3,.38,2.26)],'blue',1.2);
  cabinetFrame(H,R,5.35,.38,5.6,1.17,.5,1.92,3,'teal',(x,j,w,d,z,h,n)=>{
    timber(H,R,x,j,w,d,z+.68,.08,'sun');
    if(n===0){ drape(H,R,x+.12,j,w-.2,d,.5+1.28,.35,'coral'); rope(H,R,...H.p(x+.48,j+.55,z+.14),12,4); }
    if(n===1){ metal(H,R,x+.08,j+.1,w-.15,d*.7,z,.36,'blue'); H.line(R,[H.p(x+.35,j+d*.72,z+.23),H.p(x+.8,j+d*.72,z+.23)],'sun',2); vessel(H,R,x+.5,j+.5,z+.8,9,9,'paper'); }
    if(n===2){ shape(H,R,H.faceI(x+.13,j+.13,w-.28,z+.83,z+1.4),'coral',.5); for(const a of [.27,.67]) H.line(R,[H.p(x+a,j+.15,z+.86),H.p(x+a,j+.15,z+1.35)],'paper',1.2); }
  });
  timber(H,R,5.25,.3,5.82,.11,2.51,.17,'sun');
  shape(H,R,[H.p(5.15,.13,2.75),H.p(11.1,.13,2.75),H.p(11.28,1.75,2.55),H.p(5.08,1.75,2.55)],'teal',.47);
  H.line(R,[H.p(5.08,1.75,2.55),H.p(11.28,1.75,2.55)],'sun',2.6);
  for(const i of [5.35,10.88])bentTube(H,R,[[i,1.46,2.51],[i,.49,1.98]],2,'teal');
  bentTube(H,R,[[11.21,1.75,2.58],[11.28,1.8,2.08],[11.62,1.87,2.08],[11.65,1.9,.67]],2.5,'teal');
  for(const i of [5.84,7.7,9.54]) {H.line(R,[H.p(i,1.5,.54),H.p(i,1.5,1.13)],'blue',1.1);H.dot(...H.p(i,1.51,.75),1.5,'sun');}
  for(const i of [3.38,4.76])bentTube(H,R,[[i,.33,.51],[i,.33,2.58]],1.7,'teal');
  const net=[H.p(3.38,.33,.8),H.p(4.76,.33,.8),H.p(4.76,.33,2.5),H.p(3.38,.33,2.5)];
  shape(H,R,net,'teal',.15);H.clip(net,()=>{for(let k=0;k<14;k++){H.line(R,[H.p(3.3+k*.16,.34,.7),H.p(2.8+k*.16,.34,2.58)],'blue',.7);H.line(R,[H.p(2.8+k*.16,.34,.7),H.p(3.5+k*.16,.34,2.58)],'blue',.7);}});
  const [rx,ry]=H.p(.44,1.03,1.68);oval(H,R,rx,ry,23,21,'coral',.7);oval(H,R,rx,ry,13,12,'paper',1);for(const a of [0,Math.PI/2,Math.PI,Math.PI*1.5])H.line(R,[[rx+Math.cos(a)*14,ry+Math.sin(a)*13],[rx+Math.cos(a)*22,ry+Math.sin(a)*20]],'sun',3);stroke(H,R,[[rx-19,ry-12],[rx-24,ry+16],[rx+4,ry+27],[rx+24,ry+11]],'sun',1.3);H.line(R,[[rx,ry-21],H.p(.44,.93,2.44)],'blue',1);
  for(let n=0;n<4;n++) { bentTube(H,R,[[10.65+n*.22,.7,.54],[10.85+n*.17,.7,3.83+n*.17]],1.8,'sun'); for(let a=0;a<5;a++) H.line(R,[H.p(10.73+n*.22,.71,2.6+a*.045),H.p(10.96+n*.2,.71,2.62+a*.045)],'coral',.9); }
  const toy=H.p(8.05,.92,2.63); shape(H,R,[[toy[0]-13,toy[1]],[toy[0]+13,toy[1]],[toy[0]+8,toy[1]+6],[toy[0]-8,toy[1]+6]],'teal',.75); H.line(R,[[toy[0],toy[1]],[toy[0],toy[1]-14]],'blue',1); shape(H,R,[[toy[0],toy[1]-14],[toy[0]+10,toy[1]-3],[toy[0],toy[1]-3]],'paper',1);
  for(const [i,j] of [[.82,1.82],[2.92,1.82],[.82,2.88],[2.92,2.88]])timber(H,R,i,j,.16,.15,.5,.62,'sun');
  timber(H,R,.75,1.75,2.38,1.32,1.02,.14,'teal');
  timber(H,R,.84,1.88,2.19,.94,.65,.09,'sun');
  for(const i of [1,1.54,2.08])shape(H,R,H.faceI(i,2.93,.45,.72,.96),'paper',.9);
  metal(H,R,1.1,2.04,1.85,1.02,1.16,.12,'teal');
  shape(H,R,H.tile(1.3,2.14,.7,.65,1.3),'coral',.52); for(let n=0;n<7;n++) H.line(R,[H.p(1.35+n*.08,2.22,1.31),H.p(1.35+n*.08,2.35,1.31)],'paper',.9);
  oval(H,R,...H.p(2.45,2.5,1.32),5,3,'sun'); H.dot(...H.p(2.45,2.5,1.32),2,'blue');
  bentTube(H,R,[[1.3,2.9,1.32],[1.6,2.84,1.44],[2.22,2.9,1.32]],1.5,'sun');
  rope(H,R,...H.p(4,2.95,.51),17,5);
  const [sx,sy]=H.p(1.68,2.48,1.3);oval(H,R,sx,sy,5,3,'blue');H.line(R,[[sx-2,sy],[sx+11,sy-10]],'sun',1.7);H.line(R,[[sx+1,sy+1],[sx+13,sy+9]],'sun',1.7);
  shape(H,R,H.tile(2.18,1.86,.67,.32,1.3),'paper',1);for(let k=0;k<4;k++)H.dot(...H.p(2.26+k*.15,2.03,1.31),1.5,'blue');
  const [cx,cy]=H.p(4.3,1.22,.52);vessel(H,R,4.3,1.22,.52,15,17,'sun');stroke(H,R,[[cx-14,cy-14],[cx-13,cy-34],[cx+13,cy-34],[cx+14,cy-14]],'teal',2);for(let k=0;k<6;k++)H.line(R,[[cx-12+k*5,cy-13],[cx-10+k*4,cy-2]],'blue',.65);
  const [lx,ly]=H.p(4.56,.34,2.03);H.line(R,[[lx,ly-16],H.p(4.56,.34,2.83),H.p(4.76,.34,2.83),H.p(4.76,.34,2.5)],'blue',1.2);shape(H,R,[[lx-8,ly-14],[lx+8,ly-14],[lx+7,ly+6],[lx-7,ly+6]],'paper',1);oval(H,R,lx,ly-15,9,3,'teal');H.line(R,[[lx-4,ly-11],[lx-4,ly+3]],'sun',2);H.glow(lx,ly,24,26,'sun',.23);
  for(const i of [.1,3.3,7.1,11.35]) {timber(H,R,i,3.65,.2,.26,-.2,.7,'teal');H.line(R,[H.p(i+.1,3.7,.02),H.p(i+.1,3.7,.32)],'paper',.7);}
  const steps=[[10.7,3.65,.18],[10.7,3.38,.35]];for(const [i,j,z] of steps)timber(H,R,i,j,1.13,.36,z,.1,'sun');
  bentTube(H,R,[[11.95,2.75,.51],[11.95,2.75,1.36],[11.95,3.9,1.02]],2.2,'teal');
  drape(H,R,9.35,2.1,1.75,1.08,.64,.13,'paper');
  for(let n=0;n<6;n++) H.line(R,[H.p(11.18,2.58+n*.14,.51),H.p(11.72,2.58+n*.14,.51)],'blue',2);
  H.tint(H.tile(1.8,4.9,8.8,3.65,.025),'blue',.28);
}, (H,R,t) => {
  const u=((t%24)+24)%24, rise=.055*Math.sin(TAU*u/24), slack=smooth(4.8,9.6,u)*(1-smooth(14.4,22,u));
  hull(H,R,rise);
  const P=(i,j,z)=>H.p(i,j,z+rise);
  for(const i of [2.6,5.5,9.1]) {
    const rib=[]; for(let n=0;n<=20;n++){const q=n/20; rib.push(P(i,4.85+q*3.3,1.02+2.36*Math.sin(Math.PI*q)));}
    stroke(H,R,rib,'blue',3.6); stroke(H,R,rib,'sun',1.8);
    for(const j of [4.85,8.15]) metal(H,R,i-.09,j-.07,.18,.18,.84+rise,.27,'teal');
  }
  const roof=[]; for(let n=0;n<=20;n++){const q=n/20;roof.push(P(2.42,4.88+q*2.66,1.08+2.37*Math.sin(Math.PI*q*.8)));} for(let n=20;n>=0;n--){const q=n/20;roof.push(P(9.24,4.88+q*2.66,1.08+2.37*Math.sin(Math.PI*q*.8)));}
  shape(H,R,roof,'coral',.56,1.2);
  for(const i of [2.6,4,5.5,7.3,9.1]) { const seam=[];for(let n=0;n<=16;n++){const q=n/16;seam.push(P(i,4.88+q*2.66,1.1+2.37*Math.sin(Math.PI*q*.8)));} stroke(H,R,seam,'sun',1.2); }
  for(const i of [2.6,4,5.5,7.3,9.1])for(const q of [.1,.88]) {const j=4.88+q*2.66,z=1.1+2.37*Math.sin(Math.PI*q*.8),[x,y]=P(i,j,z);oval(H,R,x,y,2.6,2,'sun',1);H.dot(x,y,.9,'blue');}
  for(const i of [2.8,4.5,7.7,8.8]){stroke(H,R,[P(i,7.33,2.71),P(i+.06,7.48,2.51),P(i+.07,7.54,2.43)],'paper',1);}
  const patch=[P(5.82,7.07,2.34),P(6.7,7.07,2.34),P(6.7,7.47,1.96),P(5.82,7.47,1.96)];shape(H,R,patch,'paper',1);H.outline(R,patch,'teal',1,{dash:[2,3]});
  const hands=keeper(H,R,u,rise,slack), corner=[hands.left[0]-3,hands.left[1]-3+slack*2];
  shape(H,R,[P(5.5,7.54,2.48),P(7.18,7.54,2.48),corner], 'coral', .5);
  stroke(H,R,[corner,hands.right,[hands.right[0]+5,hands.right[1]+8+slack*8],P(6.6,7.25,1.6)],'sun',1.7);
  oval(H,R,hands.right[0]+2,hands.right[1]+4,3+slack*3,2+slack*2,'paper',.9);
  for(const [i,j,a,b] of [[2.1,4.61,1.4,3.2],[9.2,4.6,8.36,3.24]]) stroke(H,R,[P(i,j,.86),H.p((i+a)/2,(j+b)/2,.78),H.p(a,b,.83)],'sun',2);
  for(let n=0;n<3;n++){const q=(u/24+n/3)%1;H.opacity(.48*(1-q),()=>H.outline(R,ell(...H.p(10.6,9.4,.04),15+q*35,4+q*10),'paper',.8));}
});
room.loopSeconds=24;
room.stillTime=22.5;
export default room;
