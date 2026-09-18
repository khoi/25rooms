import { world, shape, oval, stroke, box, ell, wallPt } from '../../worlds/common.js';
import { timber, metal, surface, vessel, drape, benchFrame, bentTube, pendant, slattedSeat } from '../materials.js';
import { windowBay, hangingRail, floorShadow, caster, panelFront, wallRack, cornice } from '../joinery.js';
import { masonry, cabinetFrame, archedBay } from '../structure.js';

const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };
function person(H, R, i, j, hands, shirt = 'teal', lean = 0) {
  const [x, y] = H.p(i, j, 0), c = [x + lean, y - 49];
  oval(H, R, x + 3, y + 2, 18, 5, 'blue', .18);
  for (const s of [-1, 1]) { stroke(H, R, [[x + s * 5, y - 27], [x + s * 7, y - 13], [x + s * 10, y]], 'blue', 7); oval(H, R, x + s * 10 + 2, y, 6, 2.6, 'blue', .9); }
  shape(H, R, [[c[0] - 10, c[1]], [c[0] + 10, c[1]], [x + 9, y - 23], [x - 9, y - 23]], shirt, .7);
  shape(H, R, [[c[0] - 4, c[1] + 4], [c[0] + 5, c[1] + 4], [x + 7, y - 21], [x - 7, y - 21]], 'paper', .95, .6);
  for (let n = 0; n < 2; n++) { const s = n ? 1 : -1, shoulder = [c[0] + s * 9, c[1] + 3], hand = hands[n]; stroke(H, R, [shoulder, [(shoulder[0] + hand[0]) / 2 + s * 5, (shoulder[1] + hand[1]) / 2 + 7], hand], 'blue', 6.4); stroke(H, R, [shoulder, [(shoulder[0] + hand[0]) / 2 + s * 5, (shoulder[1] + hand[1]) / 2 + 7], hand], shirt, 4.6); oval(H, R, ...hand, 3, 2.4, 'coral', .36); }
  oval(H, R, c[0] + 1, c[1] - 12, 8, 9, 'coral', .3);
  shape(H, R, [[c[0] - 7, c[1] - 13], [c[0] - 7, c[1] - 20], [c[0] + 5, c[1] - 22], [c[0] + 9, c[1] - 15], [c[0] + 1, c[1] - 17]], 'blue', .85);
  H.dot(c[0] + 5, c[1] - 11, .85, 'blue');
}
const room = world('paris-concierge-court', 'The latch knows the hand', { wall: 'paper', wallTone: .65, height: 4.8, head: 55, floor: 'paper', tone: .7, pattern: 'tiles' }, (H, R) => {
  masonry(H,R,'nw',0,11.8,0,4.7,'paper',.75);
  masonry(H,R,'ne',.05,11.8,0,4.7,'paper',.7);
  for(const side of ['nw','ne'])cornice(H,R,side,.15,11.75,4.57,'paper');
  for(const j of [6.65,10.7]){timber(H,R,.1,j,.29,.24,0,4.5,'paper');timber(H,R,.05,j-.1,.4,.44,1.4,.17,'teal');}
  archedBay(H,R,'nw',6.8,3.8,1.65,2.5,'teal',P=>{surface(H,R,[P(.1,.1),P(3.7,.1),P(3.7,2.5),P(.1,2.5)],'teal',.2);for(let n=0;n<4;n++)H.line(R,[P(.5+n*.75,.1),P(.5+n*.75,2.5)],'paper',2);});
  windowBay(H,R,'ne',7.8,2.8,3.1,1.35,{divisions:2});
  for(const i of [.2,5.25]) timber(H,R,i,.25,.24,3.8,0,4.35,'teal');
  timber(H,R,.2,.25,5.25,.3,4.2,.3,'teal');
  timber(H,R,.2,3.85,5.25,.3,4.2,.3,'teal');
  for(const i of [.3,2.1,4.9])bentTube(H,R,[[i,.4,4.25],[i,3.9,4.25]],2,'blue');
  floorShadow(H,.5,.5,4.1,3.5,.25);
  box(H,R,.55,.55,4.2,3.05,.07,.72,'teal',.6);
  panelFront(H,R,.67,3.62,3.9,.14,.52,4,'teal');
  timber(H,R,.6,.58,4.1,1.05,1.2,.1,'sun');
  for(let n=0;n<6;n++){const p=H.p(.95+n*.53,.85,1.62);H.line(R,[[p[0],p[1]],[p[0],p[1]+8]],'blue',1.3);oval(H,R,p[0],p[1]+10,3,4,'sun',.8);}
  for(let n=0;n<3;n++)box(H,R,1.1+n*1.02,1.2,.8,.6,.72,.38,n===1?'coral':'paper',.65);
  timber(H,R,.55,3.45,4.3,.5,.83,.13,'sun');
  for(const i of [.55,2.68,4.73])timber(H,R,i,3.48,.12,.18,.95,2.85,'teal');
  for(const z of [1.82,3.72])timber(H,R,.55,3.48,4.3,.18,z,.12,'teal');
  for(const i of [.72,2.86]){const q=H.faceI(i,3.52,1.74,1.96,3.6);H.tint(q,'sun',.09);H.line(R,[H.p(i+.22,3.54,2.05),H.p(i+.62,3.54,3.34)],'paper',2);}
  timber(H,R,4.84,1.6,.18,1.85,.95,2.88,'teal');
  timber(H,R,.4,.42,4.65,.24,3.85,.18,'teal');timber(H,R,.4,3.58,4.65,.24,3.85,.18,'teal');
  surface(H,R,[H.p(.4,.42,3.95),H.p(5.05,.42,3.95),H.p(4.75,1.95,4.38),H.p(.65,1.95,4.38)],'teal',.7);
  surface(H,R,[H.p(.4,3.77,3.95),H.p(5.05,3.77,3.95),H.p(4.75,1.95,4.38),H.p(.65,1.95,4.38)],'teal',.44);
  for(const i of [1.1,2.35,3.6,4.65])H.line(R,[H.p(i,.48,3.97),H.p(i,1.94,4.4),H.p(i,3.7,3.97)],'paper',.9);
  bentTube(H,R,[[.4,3.87,3.85],[5.05,3.87,3.85],[5.05,3.87,3.5]],3,'blue');
  for(const i of [.85,4.55])bentTube(H,R,[[i,3.5,3.55],[i,4.15,3.85]],2.1,'sun');
  for(let n=0;n<8;n++)H.line(R,[H.p(.77+n*.47,3.51,3.12),H.p(.77+n*.47,3.51,3.61)],'sun',1.2);
  timber(H,R,.68,3.54,4.04,.12,3.05,.12,'sun');
  const phone=H.p(3.56,3.55,1.02);surface(H,R,[[phone[0]-14,phone[1]],[phone[0]+13,phone[1]],[phone[0]+10,phone[1]-11],[phone[0]-10,phone[1]-11]],'teal',.8);stroke(H,R,[[phone[0]-12,phone[1]-11],[phone[0]-7,phone[1]-16],[phone[0]+8,phone[1]-16],[phone[0]+13,phone[1]-11]],'blue',3);stroke(H,R,[[phone[0]+11,phone[1]],[phone[0]+18,phone[1]+5],[phone[0]+14,phone[1]+13]],'blue',1);
  surface(H,R,H.tile(1.05,3.53,.95,.41,1.02),'paper',1);H.line(R,[H.p(1.48,3.57,1.04),H.p(1.48,3.91,1.04)],'coral',.8);
  timber(H,R,4.97,1.91,.2,1.29,.78,.08,'sun');
  surface(H,R,H.faceJ(5.03,1.87,1.46,.89,2.86),'teal',.44);surface(H,R,H.faceJ(5.05,2.02,1.15,1.7,2.65),'paper',.7);H.line(R,[H.p(5.07,2.99,1.28),H.p(5.07,2.99,1.56)],'sun',2);

  pendant(H,R,2.8,2.3,4,2.75,'sun',.55);
  for(const i of [5.45,8.03]){box(H,R,i,2.35,.36,.6,0,3.8,'paper',.85);metal(H,R,i+.02,2.94,.32,.08,1.26,.7,'sun');}
  timber(H,R,5.42,2.35,3.0,.6,3.7,.27,'paper');
  bentTube(H,R,[[.22,11.2,4.7],[.22,11.2,.35],[.7,11.2,.15]],4,'teal');
  for(const z of [.7,2.8,4.2])metal(H,R,.15,11.08,.24,.24,z,.13,'blue');
  metal(H,R,.2,10.1,.5,1.25,.01,.035,'blue');for(let n=0;n<8;n++)H.line(R,[H.p(.24,10.18+n*.14,.055),H.p(.64,10.18+n*.14,.055)],'paper',.8);
  cabinetFrame(H,R,8.9,.3,2.65,1.35,.13,2.65,2,'teal',(x,j,w,d,z,h,n)=>{if(n===0){for(let q=0;q<5;q++){timber(H,R,x,j,w,d,z+q*.43,.06,'sun');box(H,R,x+.1,j+.04,w-.18,d-.06,z+q*.43+.06,.22,q%2?'paper':'coral',.6);}}else{for(const a of [.23,.55])bentTube(H,R,[[x+a,j+.3,.3],[x+a,j+.3,2.45]],2,'sun');vessel(H,R,x+.4,j+.7,z,9,21,'teal');}});
  timber(H,R,8.8,.25,2.85,1.5,2.8,.14,'sun');
  for(let n=0;n<6;n++){const i=5.88+(n%3)*.54,z=3.7+Math.floor(n/3)*.47;surface(H,R,H.faceI(i,.19,.46,z,z+.39),'teal',.35,.6);H.line(R,[H.p(i+.08,.2,z+.23),H.p(i+.38,.2,z+.23)],'blue',1.4);H.dot(...H.p(i+.35,.21,z+.1),1.2,'sun');}
  timber(H,R,5.8,.16,1.43,.16,2.55,.68,'sun');for(let n=0;n<3;n++){const p=H.p(6.03+n*.39,.36,2.9);H.dot(...p,1.5,'blue');stroke(H,R,[p,[p[0]-3,p[1]+8],[p[0]+3,p[1]+8],p],n===1?'coral':'sun',1.3);H.line(R,[[p[0],p[1]+8],[p[0],p[1]+18],[p[0]+4,p[1]+18]],'blue',1.5);}
  wallRack(H,R,'nw',4.4,1.8,2.05,1.58,2,'sun',(Q,z,row)=>{
    surface(H,R,[Q(.22,z+.1),Q(1.12,z+.1),Q(1.12,z+.48),Q(.22,z+.48)],'paper',1);
    if(row===0){H.line(R,[Q(.27,z+.19),Q(.88,z+.38)],'coral',1.4);H.dot(...Q(1.42,z+.25),4,'sun');}else{const a=Q(1.28,z+.23);oval(H,R,...a,5,6,'teal',.8);}
  });
  const clock=H.p(5.6,.23,4.23);oval(H,R,...clock,12,12,'paper',1);oval(H,R,...clock,9,9,'sun',.2);H.line(R,[[clock[0],clock[1]-6],clock,[clock[0]+5,clock[1]+1]],'blue',1.3);
  for(const i of [9.1,10.8])bentTube(H,R,[[i,.32,2.94],[i,.32,3.08],[i,1.54,3.08]],1.6,'teal');
  drape(H,R,9.15,.5,1.1,.76,2.96,.2,'paper');vessel(H,R,10.93,.88,2.96,9,14,'sun',false);
  const broom=H.p(11.4,2.7,.14);bentTube(H,R,[[11.4,2.7,.3],[11.2,2.6,2.1]],2,'sun');surface(H,R,[[broom[0]-12,broom[1]],[broom[0]+12,broom[1]],[broom[0]+9,broom[1]-13],[broom[0]-9,broom[1]-13]],'sun',.6);for(let n=0;n<7;n++)H.line(R,[[broom[0]-9+n*3,broom[1]-9],[broom[0]-11+n*3.4,broom[1]]],'blue',.65);

  const hose=H.p(10.15,1.82,2.15);for(let n=0;n<4;n++)H.outline(R,ell(hose[0],hose[1],16-n*2,20-n*2),'teal',2);stroke(H,R,[[hose[0]+16,hose[1]],[hose[0]+22,hose[1]+22],[hose[0]+18,hose[1]+29]],'teal',2);
  cabinetFrame(H,R,8.37,8.66,2.82,.99,.08,.53,2,'teal',(x,j,w,d,z,h,n)=>{if(n===0){drape(H,R,x+.03,j+.12,w-.05,d-.18,z+.08,.1,'paper');}else{const a=H.p(x+.53,j+.62,z+.08);oval(H,R,...a,10,4,'blue',.8);oval(H,R,a[0]-4,a[1]-7,6,8,'coral',.6);}});
  slattedSeat(H,R,8.4,8.7,2.7,.03,'sun',.65);
  const satchel=H.p(10.35,9.04,.78);shape(H,R,[[satchel[0]-11,satchel[1]-19],[satchel[0]+10,satchel[1]-19],[satchel[0]+13,satchel[1]],[satchel[0]-12,satchel[1]]],'coral',.65);stroke(H,R,[[satchel[0]-6,satchel[1]-19],[satchel[0]-5,satchel[1]-30],[satchel[0]+5,satchel[1]-30],[satchel[0]+6,satchel[1]-19]],'blue',1.5);H.line(R,[[satchel[0]-10,satchel[1]-11],[satchel[0]+10,satchel[1]-11]],'paper',.8);
  const bike=H.p(2.58,5.95,.06),B=(x,y)=>[bike[0]+x,bike[1]+y];
  for(const x of [-34,36]){oval(H,R,...B(x,-16),21,21,'blue',.85);oval(H,R,...B(x,-16),18,18,'paper',1);for(let n=0;n<10;n++){const a=n*Math.PI/5;H.line(R,[B(x,-16),B(x+Math.cos(a)*17,-16+Math.sin(a)*17)],'teal',.6);}H.dot(...B(x,-16),2,'sun');}
  H.line(R,[B(-34,-16),B(-17,-49),B(5,-17),B(-34,-16),B(23,-48),B(5,-17),B(36,-16),B(23,-48),B(20,-57),B(30,-59)],'blue',4);H.line(R,[B(-34,-16),B(-17,-49),B(5,-17),B(-34,-16),B(23,-48),B(5,-17)],'coral',2.4);H.line(R,[B(-17,-49),B(-20,-58)],'blue',3);H.line(R,[B(-29,-59),B(-10,-59)],'blue',4);H.line(R,[B(5,-17),B(12,-11),B(18,-11)],'blue',2);
  shape(H,R,[B(18,-54),B(45,-51),B(42,-35),B(23,-38)],'sun',.6);for(let n=0;n<5;n++)H.line(R,[B(23+n*4,-52),B(25+n*3,-38)],'blue',.7);

  timber(H,R,.4,7.65,1.2,2.15,1,.12,'sun');vessel(H,R,1.0,8.0,1.15,9,7,'paper');
  vessel(H,R,.9,9.4,1.15,7,13,'teal');for(let n=0;n<3;n++){const p=H.p(.9,9.4,1.6);stroke(H,R,[p,[p[0]-8+n*7,p[1]-17-n%2*6]],'teal',1);oval(H,R,p[0]-8+n*7,p[1]-17-n%2*6,4,3,'coral',.7);}

  const wedge=H.p(.9,8.9,1.14);surface(H,R,[[wedge[0]-7,wedge[1]],[wedge[0]+6,wedge[1]+2],[wedge[0]+3,wedge[1]-8]],'sun',.7);
  for(const z of [.08,.62])metal(H,R,1.8,9.4,2.3,1.15,z,.08,'teal');for(const i of [1.9,3.95]){caster(H,R,i,10.35);bentTube(H,R,[[i,9.45,.15],[i,9.45,1.4]],2.4,'teal');}
  box(H,R,2,9.55,1.25,.85,.71,.7,'paper',.7);H.line(R,[H.p(2.6,9.55,1.43),H.p(2.6,10.4,1.43)],'coral',2);drape(H,R,3.35,9.5,.5,.95,.74,.43,'coral');
  vessel(H,R,4.5,7.4,.03,18,30,'teal');oval(H,R,...H.p(4.5,7.4,.99),19,6,'blue',.6);
  const sweep=[];for(let n=0;n<25;n++){const a=.15+n*.095;sweep.push(H.p(4.5+Math.cos(a)*1.1,7.4+Math.sin(a)*1.1,.03));}H.line(R,sweep,'sun',3,{tone:.3});
  H.tint(H.tile(6.35,9.3,1.7,1.3,.02),'teal',.23);for(let n=0;n<8;n++)H.line(R,[H.p(6.42+n*.2,9.35,.03),H.p(6.42+n*.2,10.55,.03)],'blue',.8,{tone:.5});
  metal(H,R,10.98,8.53,.67,1.23,.05,.12,'teal');vessel(H,R,11.3,9.1,.19,12,30,'paper');
  const umbrella=H.p(11.3,9.1,1.14);stroke(H,R,[[umbrella[0],umbrella[1]+6],[umbrella[0]-6,umbrella[1]-36],[umbrella[0]-6,umbrella[1]-48],[umbrella[0]+2,umbrella[1]-52],[umbrella[0]+7,umbrella[1]-45]],'blue',2);shape(H,R,[[umbrella[0]-6,umbrella[1]-36],[umbrella[0]-12,umbrella[1]-5],[umbrella[0]+4,umbrella[1]-3]],'coral',.7);
  benchFrame(H,R,4.5,10.65,2.1,.76,.63,'teal');surface(H,R,H.tile(4.64,10.77,1.83,.48,.66),'blue',.5);
  for(const i of [4.7,5.18,5.66]){const a=H.p(i,11.03,.71);H.line(R,[[a[0]-5,a[1]+3],[a[0]+6,a[1]-7]],'sun',2.5);oval(H,R,a[0]+7,a[1]-8,3,4,'teal',.8);}
  metal(H,R,6.05,10.72,.34,.49,.66,.14,'coral');
  const bell=H.p(8.25,2.95,2.5);oval(H,R,...bell,7,9,'sun',.8);H.dot(bell[0]+1,bell[1]+2,2,'blue');H.glow(bell[0],bell[1]+18,10,15,'sun',.2);
},(H,R,t)=>{
  const u=((t%20)+20)%20,a=ease(4,8,u)*(1-ease(12,18,u))*.64;
  const P=(s,z)=>H.p(5.8+s*Math.cos(a),2.95+s*Math.sin(a),z);
  surface(H,R,[P(0,.12),P(2.2,.12),P(2.2,3.5),P(0,3.5)],'teal',.58);
  surface(H,R,[P(.18,.36),P(2.02,.36),P(2.02,1.23),P(.18,1.23)],'teal',.3);
  surface(H,R,[P(.18,1.48),P(2.02,1.48),P(2.02,3.25),P(.18,3.25)],'paper',.5);
  for(const s of [.77,1.43])H.line(R,[P(s,1.5),P(s,3.24)],'teal',2.2);
  for(const z of [.4,2.9])H.line(R,[P(.02,z),P(.02,z+.23)],'sun',4);
  H.line(R,[P(1.88,1.3),P(1.88,1.65)],'sun',4);
  H.line(R,[H.p(5.95,2.85,3.64),P(.9,3.54),P(1.38,3.47)],'blue',2);
  person(H,R,8.3,4.25,[P(1.91,1.53),H.p(8.05,4.18,1.05)],'teal',-2);
  person(H,R,9.65,6.3,[H.p(9.4,6.4,.7),H.p(9.75,6.35,.73)],'coral',Math.sin(u/20*Math.PI*2)*.7);
  const key=H.p(6.42,.37,2.68),ks=Math.sin(u/20*Math.PI*2)*2;stroke(H,R,[[key[0],key[1]-6],[key[0]+ks,key[1]+4],[key[0]+ks+3,key[1]+8]],'coral',1.2);
  const bag=H.p(9.5,6.45,.65);shape(H,R,[[bag[0]-9,bag[1]],[bag[0]+9,bag[1]],[bag[0]+11,bag[1]+19],[bag[0]-9,bag[1]+20]],'sun',.6);stroke(H,R,[[bag[0]-6,bag[1]+1],[bag[0]-4,bag[1]-9],[bag[0]+5,bag[1]-9],[bag[0]+7,bag[1]+1]],'blue',1.2);
});
room.loopSeconds=20;
room.stillTime=6;
export default room;
