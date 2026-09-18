import { world, shape, stroke, oval, ell, loop, box, mix } from '../../worlds/common.js';
import { timber, metal, benchFrame, cushion, bentTube, drape, vessel, floorLight } from '../materials.js';
import { cabinetFrame, masonry, basin } from '../structure.js';
import { windowBay, taskLight, floorShadow, recessedFrame, hangingRail } from '../joinery.js';

const ease = x => { const u = Math.max(0, Math.min(1, x)); return u * u * (3 - 2 * u); };
const blend = (a, b, u) => a.map((v, k) => mix(v, b[k], u));
export function person(H, R, i, j, a, b, shirt = 'teal', lean = 0, stride = 0, size = 1) {
  H.pieces.push({key:i+j,fn:h=>drawPerson(h,R,i,j,a,b,shirt,lean,stride,size)});
}
function drawPerson(H, R, i, j, a, b, shirt, lean, stride, size) {
  const [x, y] = H.p(i, j), X = x + lean;
  const P=(dx,dy)=>[X+dx*size,y+dy*size];
  H.tint(ell(x + 4, y + 2, 15*size, 4*size), 'blue', .18);
  for (const s of [-1, 1]) {
    stroke(H,R,[P(s*5,-27),[x+s*7*size+stride*s*.3,y-12*size],[x+s*8*size+stride*s,y-Math.max(0,stride*s)*.25]],'blue',6*size);
    oval(H,R,x+s*8*size+2+stride*s,y-Math.max(0,stride*s)*.25,5*size,2*size,'blue');
  }
  shape(H,R,[P(-10,-48),P(10,-48),P(8,-25),P(-8,-25)],shirt,.72);
  oval(H,R,...P(0,-59),9*size,10*size,'coral',.34);
  shape(H,R,[P(-9,-59),P(-8,-67),P(3,-70),P(10,-64),P(6,-61),P(-3,-65)],'blue',.85);
  H.dot(...P(4,-58),.85*size,'blue');
  stroke(H,R,[P(3,-54),P(6,-53)],'blue',.6*size);
  for (const [s, hand] of [[-1, a], [1, b]]) {
    const p=hand||P(s*13,-28);
    const arm=[P(s*8,-45),[(X+s*10*size+p[0])/2,(y-42*size+p[1])/2+6*size],p];
    stroke(H,R,arm,'blue',7*size);stroke(H,R,arm,shirt,5.2*size);oval(H,R,...p,2.6*size,2.5*size,'coral',.34);
  }
}
function board(H, R, i, j, h, ink, patched = false) {
  const P = (u, z) => H.p(i + u, j + z * .025, z);
  const points = loop([P(-.12,.18),P(-.5,.55),P(-.57,h*.55),P(-.42,h-.45),P(0,h),P(.4,h-.43),P(.52,h*.55),P(.37,.4),P(.08,.18)],2);
  shape(H,R,points,ink,.55,1.1);
  stroke(H,R,[P(0,.25),P(-.04,h*.5),P(0,h-.18)],'paper',2);
  stroke(H,R,[P(.32,.48),P(.43,h*.5),P(.29,h-.55)],'blue',.65,.6);
  if (patched) shape(H,R,[P(-.29,h-.62),P(.04,h-.83),P(.24,h-.53),P(-.08,h-.34)],'teal',.2,.7);
  oval(H,R,...P(.07,.38),2.3,1.6,'blue',.8);
}
function wetsuit(H,R,x,y,ink) {
  shape(H,R,[[x-4,y],[x-12,y+5],[x-18,y+27],[x-12,y+29],[x-7,y+16],[x-6,y+39],[x-8,y+67],[x-2,y+69],[x+3,y+43],[x+6,y+68],[x+12,y+67],[x+10,y+34],[x+9,y+16],[x+16,y+27],[x+22,y+24],[x+15,y+5],[x+6,y]],ink,.72,.9);
  stroke(H,R,[[x+1,y+5],[x+2,y+31]],'paper',.9);
  stroke(H,R,[[x-7,y+34],[x+1,y+30],[x+10,y+34]],'teal',1.2);
}
const room = world('cape-town-surf-store','The board waits for daylight',{wall:false,floor:'paper',tone:.3,head:42},(H,R)=>{
  masonry(H,R,'ne',0,12,0,4.2,'paper',.72); masonry(H,R,'nw',0,9.7,0,3.8,'teal',.23);
  windowBay(H,R,'ne',1.2,6.3,3.05,.95,{ink:'teal',divisions:5,view:P=>{
    shape(H,R,[P(.13,.12),P(6.16,.12),P(6.16,.45),P(3.5,.39),P(.13,.47)],'teal',.2,.3);
    stroke(H,R,[P(.2,.3),P(2,.34),P(3.5,.29),P(6,.35)],'paper',1.4);
  }});
  for(const i of [.45,5.7,11.7]) {
    bentTube(H,R,[[i,.05,4.35],[i,3.1,4.0],[i,5.9,3.7]],2.5,'blue');
    bentTube(H,R,[[i,.05,3.95],[i,2.7,4.03],[i,.05,4.35]],1.5,'blue');
  }
  metal(H,R,.1,.1,11.8,.14,4.3,.1,'teal');
  bentTube(H,R,[[.18,.1,1],[.18,.1,3.6],[9.5,.1,3.6]],1.3,'teal');
  for(let i=1;i<10;i+=1.3) H.dot(...H.p(i,.11,3.6),1.5,'sun');
  recessedFrame(H,R,'nw',1.25,3.35,1.25,1.35,'teal',P=>{
    for(let k=0;k<5;k++) { const u=.24+k*.58; shape(H,R,[P(u,.19),P(u+.36,.19),P(u+.38,.64),P(u+.18,.78),P(u-.02,.54)],['sun','paper','coral','paper','teal'][k],.64,.65); H.line(R,[P(u,.32),P(u+.35,.32)],'blue',.55); }
    H.line(R,[P(.1,.88),P(3.25,.88)],'sun',2.4);
    for(let k=0;k<3;k++){const u=.45+k*.85;shape(H,R,[P(u,.93),P(u+.51,.93),P(u+.51,1.15),P(u,1.15)],'paper',1,.6);}
  });
  for(const j of [5.1,7.55])metal(H,R,.67,j,.14,.16,.03,2.7,'teal');
  for(const z of [.4,2.58])metal(H,R,.67,5.1,.15,2.6,z,.1,'teal');
  shape(H,R,[H.p(.77,5.2,2.52),H.p(.77,7.55,2.52),H.p(.77,7.55,.5),H.p(.77,5.2,.46)],'paper',.75,.8);
  for(let j=5.25;j<7.5;j+=.26)stroke(H,R,[H.p(.8,j,2.5),H.p(.85,j+.04,1.5),H.p(.79,j,.51)],'teal',1.1,.35);
  timber(H,R,.3,1.1,.65,3.6,.5,.12,'teal');
  for(const j of [1.4,2.4,3.4]) {const p=H.p(.65,j,.64);oval(H,R,p[0],p[1],6,3,'blue',.6);stroke(H,R,[[p[0]-6,p[1]],[p[0]-5,p[1]-8],[p[0]+5,p[1]-8],[p[0]+7,p[1]]],'coral',2);}
  hangingRail(H,R,'nw',1.35,3.5,3.25,4,(P,u,n)=>{
    const p=P(u,-.15);H.outline(R,ell(p[0],p[1]+15,9,16),'blue',2.3);H.outline(R,ell(p[0],p[1]+15,6.5,14),'sun',1.1);
    shape(H,R,[[p[0]-6,p[1]+24],[p[0]+8,p[1]+25],[p[0]+7,p[1]+35],[p[0]-7,p[1]+33]],n%2?'teal':'coral',.68,.7);
    H.line(R,[[p[0]-3,p[1]+27],[p[0]+4,p[1]+28]],'paper',1.2);
  });
  timber(H,R,.08,8.05,.19,1.55,.06,3.52,'teal');
  timber(H,R,.09,8.03,.18,1.59,3.57,.13,'sun');
  for(const z of [.77,1.76,2.69])timber(H,R,.15,8.07,.88,1.48,z,.11,'sun');
  for(const j of [8.17,8.85]) {const p=H.p(.62,j,2.84);shape(H,R,[[p[0]-9,p[1]],[p[0]+8,p[1]],[p[0]+8,p[1]-17],[p[0]-6,p[1]-20]],'teal',.62,.7);stroke(H,R,[[p[0]-5,p[1]-19],[p[0]-4,p[1]-25],[p[0]+5,p[1]-25],[p[0]+7,p[1]-17]],'blue',1.2);}
  drape(H,R,.28,8.25,.61,1.08,1.89,.32,'coral');
  for(const j of [8.34,8.97]) {const p=H.p(.65,j,.91);shape(H,R,[[p[0]-9,p[1]],[p[0]+10,p[1]],[p[0]+8,p[1]-9],[p[0],p[1]-12],[p[0]-8,p[1]-7]],'blue',.75,.6);}
  floorLight(H,5,5.4,115,.55);
  floorShadow(H,1.5,1,6.5,2.4,.19);
  for(const i of [1.65,4.45,7.35]) {
    metal(H,R,i,.8,.17,.3,.12,3.1,'teal'); metal(H,R,i,1,1.15,.16,.25,.18,'teal');
    bentTube(H,R,[[i+.08,1.1,.3],[i+.08,1.85,1.12],[i+.08,1.4,2.55]],2.3,'teal');
    for(const z of [1.05,2.2]) { metal(H,R,i-.13,1.1,1.05,.2,z,.12,'teal'); cushion(H,R,i-.14,1.2,1.05,.21,z+.1,.08,'blue'); }
  }
  metal(H,R,1.35,1.1,6.9,.2,.4,.16,'teal');
  metal(H,R,1.5,1.12,6.4,1.05,.07,.09,'blue');
  for(let i=1.67;i<7.8;i+=.3)H.line(R,[H.p(i,1.26,.18),H.p(i,2.02,.18)],'paper',1.3);
  for(const i of [1.65,4.45,7.35]) {metal(H,R,i-.14,.71,.46,.52,.035,.075,'sun');for(const j of [.76,1.12])H.dot(...H.p(i+.06,j,.12),1.5,'blue');shape(H,R,[H.p(i,.92,.3),H.p(i,1.7,.3),H.p(i,1.15,1.08)],'teal',.5,.7);}

  for(const [i,h,ink,p] of [[2.1,4.2,'paper',false],[3.22,4.65,'sun',false],[4.43,4.9,'teal',true],[5.7,4.45,'paper',false],[6.88,3.9,'coral',false]]) board(H,R,i,1.58,h,ink,p);
  cushion(H,R,4.28,1.3,1,.26,2.33,.12,'paper');
  stroke(H,R,[H.p(1.65,1.82,2.02),H.p(4.5,1.82,2.02),H.p(7.4,1.82,2.02)],'coral',4);
  for(const i of [2.8,3.05,5.4]) for(let k=0;k<5;k++) H.line(R,[H.p(i+k*.035,1.835,1.97),H.p(i+k*.035,1.835,2.08)],'paper',.65);
  cabinetFrame(H,R,8.75,.35,2.85,1.65,.17,3.7,2,'teal',(x,j,w,d,z,h,n)=>{
    if(n===0) {
      metal(H,R,x,j,w,d,z+.6,.08,'teal'); metal(H,R,x,j,w,d,z+1,.07,'teal');
      for(let k=0;k<2;k++){const p=H.p(x+.25+k*.5,j+.6,z+.7);shape(H,R,[[p[0]-4,p[1]],[p[0]+7,p[1]],[p[0]+7,p[1]-7],[p[0]+1,p[1]-10],[p[0]-3,p[1]-6]],'blue',.75,.5);}
      const p=H.p(x+.48,j+.5,z+2.8); wetsuit(H,R,...p,'blue');
      bentTube(H,R,[[x+.1,j+.1,z+2.94],[x+w-.1,j+.1,z+2.94]],1.8,'sun');
    } else {
      const p=H.p(x+.42,j+.3,z+.18); shape(H,R,loop([[p[0]-10,p[1]],[p[0]+10,p[1]],[p[0]+11,p[1]-75],[p[0]+1,p[1]-91],[p[0]-11,p[1]-74]],2),'paper',.8,.7);
      stroke(H,R,[[p[0],p[1]-8],[p[0],p[1]-80]],'coral',1.1);
      metal(H,R,x,j,w,d,z+2.95,.06,'teal'); drape(H,R,x,j,w,.8,z+3.05,.27,'sun');
    }
  });
  const mesh=H.faceI(8.8,2.05,1.35,.38,3.46); H.tint(mesh,'teal',.1); H.outline(R,mesh,'blue',1);
  H.clip(mesh,()=>{for(let i=8.8;i<10.2;i+=.17)H.line(R,[H.p(i,2.055,.4),H.p(i,2.055,3.5)],'paper',.5,{tone:.6});for(let z=.5;z<3.5;z+=.22)H.line(R,[H.p(8.8,2.055,z),H.p(10.2,2.055,z)],'paper',.5,{tone:.6});});
  benchFrame(H,R,2.7,4.0,4.9,1.75,1.22,'sun');
  timber(H,R,2.98,5.72,1.02,.5,.75,.09,'sun');
  shape(H,R,H.tile(3.05,5.77,.86,.34,.85),'blue',.72,.5);
  for(let k=0;k<3;k++){metal(H,R,3.11+k*.25,5.82,.12,.22,.86,.035,'paper');H.dot(...H.p(3.17+k*.25,5.9,.91),1.5,'sun');}
  timber(H,R,2.99,6.14,1.02,.1,.76,.29,'teal');
  bentTube(H,R,[[3.31,6.25,.9],[3.31,6.29,.82],[3.7,6.29,.82],[3.7,6.25,.9]],1.4,'sun');
  for(const i of [3.0,7.22])bentTube(H,R,[[i,4.2,.42],[i,5.5,1.0]],1.5,'teal');
  metal(H,R,6.75,4.37,.47,.65,1.23,.23,'blue');
  timber(H,R,6.7,4.98,.6,.16,1.19,.38,'sun');
  bentTube(H,R,[[7.03,4.95,1.35],[7.03,5.48,1.35]],2.5,'paper');
  bentTube(H,R,[[7.03,5.48,1.1],[7.03,5.48,1.65]],1.6,'blue');
  for(const z of [1.1,1.65])oval(H,R,...H.p(7.03,5.48,z),2.4,2.4,'sun');
  timber(H,R,2.95,4.15,3.95,1.32,.42,.09,'teal');
  for(let k=0;k<4;k++) box(H,R,3.1+k*.6,4.32,.49,.8,.52,.11,['paper','teal','coral','blue'][k],.45);
  cushion(H,R,3.23,4.62,.85,.72,1.23,.08,'blue');
  metal(H,R,4.62,4.45,1.24,.63,1.23,.17,'teal');
  shape(H,R,H.tile(4.81,4.66,.86,.15,1.41),'blue',.9,.5);
  for(const i of [4.72,5.76]){bentTube(H,R,[[i,4.7,1.4],[i,4.7,1.57],[i,5.15,1.57],[i,5.15,1.04]],1.7,'blue');oval(H,R,...H.p(i,5.15,1.07),3,1.5,'sun');}
  oval(H,R,...H.p(6.08,4.77,1.24),3.8,2.1,'blue'); H.line(R,[H.p(6,4.77,1.25),H.p(6.15,4.77,1.25)],'paper',1.2);
  shape(H,R,[H.p(5.9,4.3,1.23),H.p(6.55,4.3,1.23),H.p(5.95,4.3,1.8)],'paper',1,.7);
  taskLight(H,R,3,4.12,1.24,'coral',.75);
  benchFrame(H,R,1.1,8.2,3.6,.8,.63,'teal');
  for(let k=0;k<3;k++)shape(H,R,[H.p(1.5+k*.65,8.38,.65),H.p(2+k*.65,8.48,.65),H.p(1.8+k*.65,8.47,.97)],['paper','blue','sun'][k],.65,.7);
  drape(H,R,3.5,8.3,.67,.45,.67,.23,'blue');
  for(let k=0;k<7;k++)H.line(R,[H.p(3.52+k*.085,8.79,.47),H.p(3.55+k*.085,8.79,.6)],'paper',.6);
  box(H,R,1.22,8.28,.28,.25,.66,.12,'coral',.55);
  cushion(H,R,.8,5.7,.9,1,.16,.17,'coral'); vessel(H,R,1.2,6.9,.04,9,19,'teal');
  const model=H.p(.7,4.5,1.4); shape(H,R,loop([[model[0]-7,model[1]],[model[0]+7,model[1]],[model[0]+10,model[1]-39],[model[0],model[1]-50],[model[0]-9,model[1]-38]],2),'sun',.55,.7);
  for(const i of [4.45,7.14]) {
    for(const j of [8.57,9.84])bentTube(H,R,[[i,j,.03],[i,j<9?8.98:9.43,.98]],3.4,'teal');
    timber(H,R,i-.13,8.85,.26,.9,.91,.16,'sun');cushion(H,R,i-.15,8.9,.3,.8,1.07,.13,'coral');
    bentTube(H,R,[[i,8.62,.22],[i,9.75,.22]],1.4,'blue');
  }
  const Q=(x,y,z=1.22)=>H.p(x,y,z);
  const flat=loop([Q(3.55,9.27),Q(4.18,8.75),Q(6.98,8.65),Q(8.3,9.0),Q(8.73,9.28),Q(8.22,9.61),Q(6.9,9.83),Q(4.11,9.77)],2);
  shape(H,R,flat,'paper',1,1.2);stroke(H,R,[Q(3.7,9.27),Q(6.2,9.24),Q(8.5,9.29)],'sun',2.5);
  shape(H,R,[Q(4.1,9.16),Q(5.1,8.88),Q(5.6,8.91),Q(4.57,9.43)],'teal',.42,.6);
  shape(H,R,[Q(6.96,9.05),Q(7.52,9.12),Q(7.59,9.4),Q(6.98,9.43)],'coral',.27,.7);
  for(let k=0;k<4;k++)H.line(R,[Q(7.03+k*.12,9.12),Q(7.09+k*.12,9.36)],'paper',.7);
  oval(H,R,...Q(4.05,9.42),3.2,2,'blue',.65);
  stroke(H,R,[Q(4.05,9.42),Q(3.69,9.84,.85),Q(3.9,10.14,.12),Q(4.39,10.0,.09),Q(4.2,9.78,.1)],'blue',1.4);
  metal(H,R,9.35,8.37,1.98,1.45,.15,.1,'teal');
  for(const i of [9.48,11.12])for(const j of [8.5,9.63])metal(H,R,i,j,.12,.12,.06,1.02,'teal');
  basin(H,R,9.38,8.4,1.91,1.31,1.08,'paper');
  bentTube(H,R,[[10.31,9.06,1.08],[10.31,9.06,.55],[10.65,9.07,.55],[10.66,9.58,.18]],2.4,'blue');
  const hose=H.p(10.9,7.5,1.25);for(let k=0;k<4;k++)H.outline(R,ell(hose[0],hose[1],16+k*2,11+k*2),'teal',1.7);
  bentTube(H,R,[[10.9,7.5,.15],[10.9,7.5,1.82],[11.17,7.5,1.82]],2,'sun');
  drape(H,R,9.38,8.62,.38,.6,1.3,.4,'coral');
  metal(H,R,1.1,10.7,9.9,.13,.02,.05,'blue');
  for(let i=1.2;i<11;i+=.3) H.line(R,[H.p(i,10.68,.07),H.p(i+.1,10.85,.07)],'paper',.8);
  metal(H,R,10.9,3,.13,6.9,.02,.05,'teal');
},(H,R,t)=>{
  const s=((t%18)+18)%18;
  const u=s<3.6?ease(s/3.6)*.35:s<7.2?.35+.65*ease((s-3.6)/3.6):s<10.8?1:s<16?1-ease((s-10.8)/5.2):0;
  const pos=blend([3.65,4.94,1.34],[5.23,4.73,1.48],u); pos[2]+=.52*Math.sin(Math.PI*u);
  const p=H.p(...pos), hand=[p[0]+1,p[1]-10];
  person(H,R,4.25+u*1.1,5.83,hand,H.p(5.72,5.38,1.35),'teal',u*8);
  shape(H,R,[[p[0]-10,p[1]+1],[p[0]+10,p[1]+1],[p[0]+4,p[1]-10],[p[0]+3,p[1]-28],[p[0]-4,p[1]-20]],'blue',.74,1);
  stroke(H,R,[[p[0]-6,p[1]-1],[p[0]+4,p[1]-3],[p[0],p[1]-20]],'paper',.85);
  person(H,R,8.9,5.8,H.p(8.4,5.4,1.1),null,'coral',Math.sin(Math.PI*u)*2);
  const [cx,cy]=H.p(7.97,5.55,.2); const sway=Math.sin(t*Math.PI/9)*1.5;
  shape(H,R,loop([[cx-10,cy],[cx+10,cy],[cx+12+sway,cy-51],[cx+2+sway,cy-71],[cx-9+sway,cy-52]],2),'paper',.8,.9);
  stroke(H,R,[[cx-6,cy-35],[cx+1,cy-40],[cx+7,cy-35],[cx+7,cy-29],[cx-6,cy-29],[cx-6,cy-35]],'sun',.9);
  stroke(H,R,[[cx-5,cy-35],[cx-5,cy-43],[cx-1,cy-39],[cx+3,cy-44],[cx+7,cy-35]],'sun',.8);
  const [rx,ry]=H.p(6.2,.35,4.32), w=Math.sin(t*Math.PI/9)*4;
  shape(H,R,[[rx,ry],[rx+35,ry+5+w],[rx+30,ry+13+w],[rx,ry+5]],'coral',.65,.6);
});
room.loopSeconds=18;
room.stillTime=8.8;
export default room;
