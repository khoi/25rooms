import { world, shape, oval, stroke, box, ell, wallPt } from '../../worlds/common.js';
import { timber, metal, surface, vessel, drape, benchFrame, bentTube, pendant, slattedSeat } from '../materials.js';
import { windowBay, hangingRail, floorShadow, caster, panelFront, wallRack, taskLight } from '../joinery.js';
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
const room=world('paris-attic-pattern','A sleeve against the skylight',{wall:'paper',wallTone:.7,height:3.35,head:62,floor:'sun',tone:.18,pattern:'boards'},(H,R)=>{
  const roof=(i,j,offset=0)=>H.p(i,j,4.75-i*.3+offset);
  surface(H,R,[roof(0,0),roof(3.5,0),roof(3.5,10.8),roof(0,10.8)],'paper',1,1.1);
  for(const j of [.2,3.1,7.5,10.6])bentTube(H,R,[[.12,j,4.71],[3.5,j,3.7]],5,'sun');
  for(let j=.5;j<10.5;j+=.8)H.line(R,[roof(.25,j,.01),roof(3.25,j,.01)],'sun',.5,{tone:.3});
  for(const i of [.2,3.35])bentTube(H,R,[[i,.2,4.75-i*.3],[i,10.7,4.75-i*.3]],3,'sun');
  const skylight=[roof(.5,3.45,.025),roof(2.92,3.45,.025),roof(2.92,6.9,.025),roof(.5,6.9,.025)];surface(H,R,skylight,'teal',.48,2);surface(H,R,[roof(.65,3.62,.04),roof(2.76,3.62,.04),roof(2.76,6.72,.04),roof(.65,6.72,.04)],'paper',1,.8);
  for(const j of [4.6,5.77])H.line(R,[roof(.6,j,.06),roof(2.85,j,.06)],'teal',3);H.line(R,[roof(1.75,3.53,.07),roof(1.75,6.8,.07)],'teal',3);
  H.line(R,[roof(.83,3.83,.1),roof(1.35,6.1,.1)],'paper',2.5);
  drape(H,R,.65,3.25,2.2,.28,4.48,.2,'paper');surface(H,R,H.faceI(1.9,3.55,.45,4.2,4.43),'coral',.55);
  for(const j of [3.42,6.9]){surface(H,R,[roof(.49,j,.025),roof(2.93,j,.025),roof(2.93,j,.13),roof(.49,j,.13)],'teal',.55);}
  const catchPoint=roof(2.77,5.17,.14);stroke(H,R,[catchPoint,[catchPoint[0]+9,catchPoint[1]+4],[catchPoint[0]+5,catchPoint[1]+11]],'sun',2.2);
  for(const j of [3.54,6.76])H.line(R,[roof(.6,j,.14),roof(.89,j,.14)],'sun',3);
  windowBay(H,R,'ne',8,3.0,1.85,1.3,{divisions:2});
  cabinetFrame(H,R,4.8,.45,6.4,1.65,.08,1.25,4,'teal',(x,j,w,d,z,h,n)=>{if(n<2){for(let q=0;q<3;q++){timber(H,R,x,j,w,d,z+q*.33,.08,'sun');for(let k=0;k<5;k++){const p=H.p(x+.2+k*.24,j+d,.24+q*.33);oval(H,R,p[0],p[1],3,5,['coral','sun','teal'][k%3],.65);}}}else{timber(H,R,x,j,w,d,.6,.07,'sun');for(let q=0;q<3;q++)drape(H,R,x+.1,j+.12,w-.2,d-.24,.19+q*.14,.07,q%2?'coral':'paper');}});
  timber(H,R,4.7,.37,6.65,1.85,1.39,.16,'sun');
  metal(H,R,5.38,.17,.34,.14,1.79,.48,'paper');H.dot(...H.p(5.55,.34,2.06),1.3,'blue');stroke(H,R,[H.p(5.55,.34,1.85),H.p(5.83,.53,1.6),H.p(5.91,1.1,.16)],'blue',1.1);
  surface(H,R,H.tile(5.68,1.19,.75,.48,.15),'teal',.8);for(let n=0;n<5;n++)H.line(R,[H.p(5.74+n*.12,1.24,.17),H.p(5.74+n*.12,1.61,.17)],'paper',.8);
  metal(H,R,5.15,.7,1.95,1.12,1.57,.09,'teal');
  const sew=H.p(6.05,1.3,1.66);surface(H,R,[[sew[0]-24,sew[1]],[sew[0]+21,sew[1]],[sew[0]+21,sew[1]-18],[sew[0]+7,sew[1]-21],[sew[0]+7,sew[1]-10],[sew[0]-9,sew[1]-10],[sew[0]-9,sew[1]-28],[sew[0]-21,sew[1]-28]],'teal',.68,1);oval(H,R,sew[0]+19,sew[1]-13,7,10,'blue',.75);oval(H,R,sew[0]+19,sew[1]-13,3,5,'sun',.8);H.line(R,[[sew[0]-15,sew[1]-13],[sew[0]-15,sew[1]+2]],'blue',1.1);H.line(R,[[sew[0]-8,sew[1]-27],[sew[0]-8,sew[1]-37]],'blue',1);oval(H,R,sew[0]-8,sew[1]-33,4,6,'coral',.8);
  H.line(R,[[sew[0]-9,sew[1]-33],[sew[0]-15,sew[1]-29],[sew[0]-15,sew[1]-3]],'sun',.8);H.line(R,[[sew[0]-21,sew[1]-1],[sew[0]-9,sew[1]-1]],'paper',2);
  taskLight(H,R,7.63,.94,1.59,'coral',.45);
  const snip=H.p(7.22,1.38,1.64);for(const dx of [-5,5])oval(H,R,snip[0]+dx,snip[1]+4,4,3,'paper',1);H.line(R,[[snip[0]-5,snip[1]+1],[snip[0]+5,snip[1]-12]],'blue',1.4);H.line(R,[[snip[0]+5,snip[1]+1],[snip[0]-4,snip[1]-12]],'blue',1.4);
  drape(H,R,5.0,1.05,1.4,1.15,1.71,.42,'paper');
  timber(H,R,9.15,1.25,1.65,1.03,1.57,.08,'sun');const iron=H.p(9.85,1.73,1.7);surface(H,R,[[iron[0]-14,iron[1]],[iron[0]+15,iron[1]],[iron[0]+7,iron[1]-11],[iron[0]-8,iron[1]-11]],'paper',1);stroke(H,R,[[iron[0]-5,iron[1]-8],[iron[0]-4,iron[1]-18],[iron[0]+6,iron[1]-18],[iron[0]+9,iron[1]-9]],'teal',2.5);
  hangingRail(H,R,'ne',4.9,2.55,2.8,4,(P,u,n)=>{const a=P(u,-.13);shape(H,R,[[a[0]-7,a[1]],[a[0]+7,a[1]],[a[0]+10,a[1]+22],[a[0]-8,a[1]+25]],n%2?'paper':'coral',.55);});
  floorShadow(H,.52,7.9,1.37,3.17,.24);
  surface(H,R,H.faceJ(.66,7.85,3.0,.1,2.44),'blue',.65);
  for(const z of [.16,.9,1.64,2.38])timber(H,R,.56,7.8,1.15,3.15,z,.11,'sun');
  for(const j of [7.81,9.32,10.81])timber(H,R,.55,j,1.13,.13,.17,2.25,'teal');
  for(const [j,z,ink] of [[8.0,.36,'coral'],[8.75,.35,'paper'],[9.55,.36,'teal'],[10.25,.36,'paper'],[8.2,1.14,'sun'],[9.55,1.14,'paper']]){
    const a=H.p(1.76,j,z);oval(H,R,...a,8,11,ink,.65);oval(H,R,...a,3,5,'blue',.65);H.line(R,[[a[0]-6,a[1]-7],[a[0]-2,a[1]-10]],'paper',1);
  }
  for(let n=0;n<3;n++)drape(H,R,.66,9.61,1.04,.91,1.81+n*.14,.1,n===1?'coral':'paper');
  const boxPin=H.p(1.5,8.34,1.81);shape(H,R,[[boxPin[0]-9,boxPin[1]],[boxPin[0]+9,boxPin[1]],[boxPin[0]+7,boxPin[1]-15],[boxPin[0]-8,boxPin[1]-15]],'teal',.6);H.line(R,[[boxPin[0]-6,boxPin[1]-7],[boxPin[0]+6,boxPin[1]-7]],'sun',1.5);
  timber(H,R,.45,8.3,1.3,2.4,2.45,.13,'sun');for(let n=0;n<4;n++){const p=H.p(1,8.55+n*.53,2.66);oval(H,R,p[0],p[1],10,5,'paper',1);H.outline(R,ell(p[0],p[1],5,2.5),'blue',.7);}
  const pattern=H.p(.7,8.4,3.45);shape(H,R,[[pattern[0]-12,pattern[1]],[pattern[0]-5,pattern[1]-8],[pattern[0]+5,pattern[1]-8],[pattern[0]+13,pattern[1]],[pattern[0]+7,pattern[1]+8],[pattern[0]+10,pattern[1]+27],[pattern[0]-10,pattern[1]+27],[pattern[0]-7,pattern[1]+8]],'paper',1,.8);
  for(const i of [3.62,8.23]){metal(H,R,i,2.5,.38,.75,.06,.09,'blue');bentTube(H,R,[[i+.19,2.8,.12],[i+.19,2.8,2.72]],3,'teal');}
  bentTube(H,R,[[3.81,2.8,2.72],[8.42,2.8,2.72]],3,'sun');
  for(const [i,w,h,ink] of [[4.22,.91,1.48,'paper'],[5.62,1.09,1.83,'coral'],[7.17,.87,1.38,'teal']]){
    const A=(x,z)=>H.p(i+x,2.81,z);stroke(H,R,[A(.44,2.7),A(.34,2.83),A(.52,2.9)],'blue',1);H.line(R,[A(-.07,2.34),A(.43,2.63),A(w+.07,2.34),A(-.07,2.34)],'sun',1.5);
    surface(H,R,[A(0,2.34),A(w*.29,2.55),A(w*.7,2.55),A(w,2.34),A(w-.1,2.03),A(w*.87,2.5-h),A(.1,2.5-h),A(.1,2.03)],ink,ink==='paper'?1:.52);
    H.line(R,[A(w*.48,2.48),A(w*.48,2.6-h)],'blue',.7);for(const z of [1.36,1.67,1.98])H.dot(...A(w*.52,z),1,'sun');
  }
  benchFrame(H,R,.5,1.05,1.7,5.8,.83,'teal');
  for(const j of [1.35,3.0,4.7]){
    timber(H,R,.66,j,1.34,1.32,.22,.1,'sun');
    for(let n=0;n<3;n++)drape(H,R,.71,j+.09,1.21,1.1,.35+n*.13,.08,n===1?'coral':'paper');
  }
  const draft=(i,j)=>H.p(i,j,.88);
  surface(H,R,[draft(.62,2.0),draft(2.08,2.0),draft(2.08,4.67),draft(.62,4.67)],'paper',1,.6);
  stroke(H,R,[draft(.83,2.23),draft(1.4,2.23),draft(1.67,2.75),draft(1.45,3.12),draft(1.91,4.31),draft(.81,4.31),draft(.97,3.09),draft(.83,2.23)],'teal',1.1);
  for(const j of [2.46,3.41,4.12])oval(H,R,...draft(1.29,j),4,2.4,'blue',.65);
  H.line(R,[draft(.68,4.91),draft(2.0,4.91)],'sun',4);
  for(let n=0;n<7;n++)H.line(R,[draft(.74+n*.18,4.83),draft(.74+n*.18,5.0)],'blue',.65);
  for(let n=0;n<3;n++){
    const q=H.p(1.25,5.55+n*.34,.99);oval(H,R,...q,10,4,'paper',1);H.line(R,[[q[0]-9,q[1]],[q[0]-9,q[1]-16]],'sun',2);oval(H,R,q[0],q[1]-16,10,4,n===1?'coral':'paper',.85);
  }
  floorShadow(H,4.6,3.7,2.8,2.2,.23);
  const base=H.p(4.3,5.4,.12);oval(H,R,...base,36,13,'blue',.68);oval(H,R,base[0]-2,base[1]-2,32,11,'sun',.6);bentTube(H,R,[[4.3,5.4,.17],[4.3,5.4,1.34]],5,'sun');
  const form=H.p(4.3,5.4,2.56);shape(H,R,[[form[0]-7,form[1]],[form[0]+7,form[1]],[form[0]+19,form[1]+11],[form[0]+13,form[1]+29],[form[0]+21,form[1]+46],[form[0]-21,form[1]+46],[form[0]-13,form[1]+29],[form[0]-19,form[1]+11]],'paper',1,1.2);
  shape(H,R,[[form[0]-18,form[1]+12],[form[0]-12,form[1]+29],[form[0]-28,form[1]+70],[form[0]-14,form[1]+76],[form[0]+3,form[1]+73],[form[0]+26,form[1]+76],[form[0]+16,form[1]+48],[form[0]+13,form[1]+29],[form[0]+18,form[1]+12],[form[0]+8,form[1]+17],[form[0],form[1]+25],[form[0]-8,form[1]+17]],'coral',.54,1);
  for(const dx of [-17,-7,8,19])H.line(R,[[form[0]+dx*.45,form[1]+32],[form[0]+dx,form[1]+69]],'paper',1);
  H.line(R,[[form[0]-14,form[1]+30],[form[0]+13,form[1]+30]],'sun',3);
  shape(H,R,[[form[0]-5,form[1]+25],[form[0]+5,form[1]+25],[form[0]+9,form[1]+66],[form[0]+1,form[1]+69]],'paper',1,.4);
  H.line(R,[[form[0],form[1]+3],[form[0],form[1]+45]],'teal',.9);stroke(H,R,[[form[0]-17,form[1]+14],[form[0],form[1]+21],[form[0]+17,form[1]+14]],'blue',.8);H.line(R,[[form[0]-13,form[1]+29],[form[0]+13,form[1]+29]],'coral',1);
  for(const side of [-1,1])stroke(H,R,[[form[0]+side*8,form[1]+8],[form[0]+side*10,form[1]+24],[form[0]+side*6,form[1]+41]],'sun',.85);
  for(const y of [7,12,17])H.line(R,[[form[0]-4,form[1]+y],[form[0]+4,form[1]+y]],'coral',.65);
  const adjust=H.p(4.3,5.4,.83);H.line(R,[adjust,[adjust[0]+13,adjust[1]]],'blue',2);oval(H,R,adjust[0]+15,adjust[1],3,4,'teal',.8);
  for(const [i,j] of [[3.59,5.22],[4.74,4.9],[4.6,6.06]])bentTube(H,R,[[4.3,5.4,.34],[i,j,.14]],3,'teal');
  oval(H,R,form[0],form[1]-3,7,3,'sun',.65);H.line(R,[[form[0]-21,form[1]+46],[form[0]+21,form[1]+46]],'sun',2);
  const pin=H.p(4.0,5.15,.17);H.line(R,[pin,[pin[0]+9,pin[1]-7]],'blue',.8);H.dot(pin[0]+9,pin[1]-7,1.8,'coral');
  benchFrame(H,R,4.6,6.0,1.45,.85,1.12,'sun');drape(H,R,4.62,6.02,1.4,.82,1.14,.22,'coral');
  cabinetFrame(H,R,6.45,8.56,4.48,1.85,.1,.75,3,'sun',(x,j,w,d,z,h,n)=>{if(n<2){timber(H,R,x,j,w,d,z+.15,.08,'teal');for(let q=0;q<3;q++)box(H,R,x+.09,j+.2,w-.17,d-.27,z+.25+q*.1,.08,q===n?'coral':'paper',.8);}else{for(let q=0;q<3;q++)booklet(x+.08+q*.37,j+d-.08,z+.07,q);}
    function booklet(i,j,z,n){surface(H,R,H.faceI(i,j,.28,z,z+.48),'paper',1);H.line(R,[H.p(i+.03,j+.02,z+.36),H.p(i+.25,j+.02,z+.36)],n===1?'teal':'coral',1.3);}
  });
  timber(H,R,6.35,8.46,4.71,2.09,.89,.13,'sun');

  surface(H,R,H.tile(6.55,8.63,2.4,1.65,1.02),'paper',1,.7);
  const cut=(i,j)=>H.p(i,j,1.045);stroke(H,R,[cut(6.7,8.83),cut(7.4,8.78),cut(7.6,9.28),cut(8.3,9.3),cut(8.62,10.08),cut(6.83,10.04),cut(6.7,8.83)],'teal',1);H.line(R,[cut(7.35,8.88),cut(7.6,9.9)],'coral',.8);
  for(let n=0;n<3;n++){const q=H.p(6.8+n*.48,9.5,.25);oval(H,R,...q,9,5,'paper',1);H.line(R,[[q[0]-8,q[1]],[q[0]-8,q[1]-32]],'paper',15);oval(H,R,q[0],q[1]-32,9,5,'coral',.4);}
  drape(H,R,9,8.8,1.9,1.1,1.02,.37,'paper');
  for(let n=0;n<6;n++){const p=H.p(9.2+(n%3)*.48,9+Math.floor(n/3)*.43,1.09);oval(H,R,...p,4,3,n%2?'coral':'teal',.7);H.dot(p[0]-1,p[1],.6,'paper');H.dot(p[0]+1,p[1],.6,'paper');}
  vessel(H,R,10.6,9.5,1.05,8,5,'paper');
  const ham=H.p(10.47,8.89,1.1);oval(H,R,...ham,13,8,'coral',.6);stroke(H,R,[[ham[0]-9,ham[1]+4],[ham[0]-1,ham[1]-5],[ham[0]+9,ham[1]-4]],'paper',1);
  const tape=[H.p(8.82,8.8,1.09),H.p(8.81,9.6,1.09),H.p(8.72,10.53,1.09),H.p(8.72,10.57,.46)];H.line(R,tape,'sun',4);for(let n=0;n<7;n++)H.line(R,[H.p(8.71,8.9+n*.23,1.1),H.p(8.89,8.9+n*.23,1.1)],'blue',.7);
  const pinTray=H.p(5.29,6.38,1.2);oval(H,R,...pinTray,9,5,'teal',.8);for(let n=0;n<4;n++){H.line(R,[[pinTray[0]-5+n*3,pinTray[1]+1],[pinTray[0]-3+n*3,pinTray[1]-6]],'paper',.7);H.dot(pinTray[0]-3+n*3,pinTray[1]-6,1.2,'coral');}

  const mirror=[H.p(.7,10.7,.2),H.p(2.5,10.7,.2),H.p(2.2,10.3,2.4),H.p(.85,10.3,2.4)];surface(H,R,mirror,'sun',.7,2);surface(H,R,[H.p(.86,10.71,.36),H.p(2.3,10.71,.36),H.p(2.07,10.34,2.23),H.p(1,10.34,2.23)],'paper',1,.7);H.line(R,[H.p(1.15,10.35,.53),H.p(1.67,10.35,2.1)],'teal',2,{tone:.2});
  for(const i of [3.1,3.85]){const p=H.p(i,9.8,.06);oval(H,R,...p,12,5,'blue',.75);oval(H,R,p[0]-4,p[1]-4,7,4,'coral',.65);}
  timber(H,R,3.65,8.8,1.4,.75,.03,.22,'sun');
},(H,R,t)=>{
  const u=((t%18)+18)%18,f=ease(3.6,7.2,u)*(1-ease(10.8,16,u));
  const anchor=H.p(4.77,5.62,1.35+f*.82),x=anchor[0],y=anchor[1];
  stroke(H,R,[[x-8,y],[x+11,y-1],[x+25,y+12]],'sun',4);
  shape(H,R,[[x-10,y-5],[x+10,y-8],[x+28,y+16],[x+17,y+25],[x+2,y+8],[x-12,y+5]],'paper',1,1);
  shape(H,R,[[x+16,y+18],[x+27,y+15],[x+21,y+25],[x+16,y+25]],'coral',.7,.6);
  stroke(H,R,[[x-6,y-3],[x+7,y+2],[x+19,y+21]],'teal',.9);stroke(H,R,[[x-8,y+3],[x+2,y+9],[x+17,y+24]],'sun',.9);
  person(H,R,5.55,5.22,[[x+11,y-4],[x+19,y+18]],'teal',-2);
  H.line(R,[[x+11,y-5],[x+5,y+3]],'blue',.9);H.dot(x+11,y-5,1.9,'coral');
  person(H,R,8.3,7.4,[H.p(8.12,7.55,1.02),H.p(8.5,7.6,.83)],'coral',Math.sin(u/18*Math.PI*2)*.9);
  const corner=H.p(.7,8.4,2.8);stroke(H,R,[corner,[corner[0]+7,corner[1]+3+Math.sin(u/18*Math.PI*2)*1.3],[corner[0]+12,corner[1]+1]],'paper',1.3);
});
room.loopSeconds=18;
room.stillTime=9;
export default room;
