import { world, shape, oval, stroke, box, ell, wallPt } from '../../worlds/common.js';
import { timber, metal, surface, vessel, drape, benchFrame, bentTube, pendant, slattedSeat } from '../materials.js';
import { windowBay, hangingRail, floorShadow, caster, panelFront } from '../joinery.js';
import { masonry, cabinetFrame, archedBay } from '../structure.js';

const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };
function person(H, R, i, j, hands, shirt = 'teal', lean = 0) {
  const [x, y] = H.p(i, j, 0), c = [x + lean, y - 49];
  oval(H, R, x + 3, y + 2, 18, 5, 'blue', .18);
  for (const s of [-1, 1]) { stroke(H, R, [[x + s * 5, y - 27], [x + 18 + s * 5, y - 23], [x + 18 + s * 5, y]], 'blue', 7); oval(H, R, x + 20 + s * 5, y, 6, 2.6, 'blue', .9); }
  shape(H, R, [[c[0] - 10, c[1]], [c[0] + 10, c[1]], [x + 9, y - 23], [x - 9, y - 23]], shirt, .7);
  shape(H, R, [[c[0] - 4, c[1] + 4], [c[0] + 5, c[1] + 4], [x + 7, y - 21], [x - 7, y - 21]], 'paper', .95, .6);
  for (let n = 0; n < 2; n++) { const s = n ? 1 : -1, shoulder = [c[0] + s * 9, c[1] + 3], hand = hands[n]; stroke(H, R, [shoulder, [(shoulder[0] + hand[0]) / 2 + s * 5, (shoulder[1] + hand[1]) / 2 + 7], hand], 'blue', 6.4); stroke(H, R, [shoulder, [(shoulder[0] + hand[0]) / 2 + s * 5, (shoulder[1] + hand[1]) / 2 + 7], hand], shirt, 4.6); oval(H, R, ...hand, 3, 2.4, 'coral', .36); }
  oval(H, R, c[0] + 1, c[1] - 12, 8, 9, 'coral', .3);
  shape(H, R, [[c[0] - 7, c[1] - 13], [c[0] - 7, c[1] - 20], [c[0] + 5, c[1] - 22], [c[0] + 9, c[1] - 15], [c[0] + 1, c[1] - 17]], 'blue', .85);
  H.dot(c[0] + 5, c[1] - 11, .85, 'blue');
}
const room = world('paris-canal-cabin', 'A table on the water', { wall:false, height:3.8, head:38, floor:'sun',tone:.3,pattern:'boards' },(H,R)=>{
  for(const j of [.1,.4]){const pts=[];for(let n=0;n<=24;n++){const i=n*.5,z=3.45+.55*Math.sin(n/24*Math.PI);pts.push(H.p(i,j,z));}surface(H,R,[H.p(0,j,0),H.p(12,j,0),...pts.reverse()],'teal',j===.1?.65:.4,1);}
  surface(H,R,[H.p(.2,.4,0),H.p(.2,11.8,0),H.p(.2,11.8,2.7),H.p(.2,8,3.3),H.p(.2,.4,3.55)],'teal',.38,1);
  for(const j of [1.4,3.9,6.4,8.9,11.3])bentTube(H,R,[[.23,j,.1],[.45,j,1.2],[.45,j,2.65],[.2,j,3.25]],4.2,'sun');
  for(const z of [.28,.62,1.0])H.line(R,[H.p(.45,.4,z),H.p(.45,11.6,z)],'blue',.7,{tone:.45});
  for(const i of [3.0,6.4,9.7]){
    const P=(a,r=.86)=>H.p(i+Math.cos(a)*r,.44,2.75+Math.sin(a)*r);
    const ring=Array.from({length:40},(_,n)=>P(n/40*Math.PI*2));surface(H,R,ring,'sun',.7,1.8);
    const glass=Array.from({length:40},(_,n)=>P(n/40*Math.PI*2,.66));surface(H,R,glass,'paper',1,.9);
    H.clip(glass,()=>{surface(H,R,[H.p(i-1,.45,2.45),H.p(i+1,.45,2.45),H.p(i+1,.45,2.1),H.p(i-1,.45,2.1)],'teal',.65);for(let n=0;n<3;n++)H.line(R,[H.p(i-.7,.46,2.24+n*.12),H.p(i+.7,.46,2.24+n*.12)],'paper',1);H.line(R,[H.p(i-.38,.47,2.4),H.p(i-.1,.47,3.25)],'paper',2.5);});
    for(let n=0;n<8;n++)H.dot(...P(n*Math.PI/4,.77),1.4,'blue');
    bentTube(H,R,[[i+.75,.47,2.58],[i+.9,.49,2.52],[i+.93,.5,2.36]],2.6,'sun');
    timber(H,R,i-1,.34,2,.45,1.72,.14,'sun');
  }
  for(const i of [.9,11.55])bentTube(H,R,[[i,.5,3.5],[i,2.3,3.15]],3,'sun');
  timber(H,R,1,1.35,2.1,7.6,.34,.22,'sun');
  box(H,R,.9,2.0,2.2,6.2,.1,.62,'sun',.6);
  surface(H,R,H.faceJ(3.13,2.2,2.3,.2,.56),'blue',.6);timber(H,R,3.11,2.34,.2,2.05,.22,.28,'sun');H.line(R,[H.p(3.35,3,.37),H.p(3.35,3.65,.37)],'teal',2.2);
  drape(H,R,1.03,2.2,2.12,4.75,.86,.45,'paper');
  for(let n=0;n<7;n++)H.line(R,[H.p(1.07,2.4+n*.61,.88),H.p(3.1,2.4+n*.61,.88)],n%2?'teal':'sun',2,{tone:.6});
  surface(H,R,H.tile(2.55,6.15,.57,.58,.88),'coral',.65);H.outline(R,H.tile(2.6,6.2,.46,.47,.9),'paper',.9);
  vessel(H,R,1.75,1.75,.76,19,11,'paper',false);
  timber(H,R,.6,9.65,2.5,1.75,.76,.1,'sun');
  for(const i of [.8,2.75])for(const j of [9.85,11.12])timber(H,R,i,j,.14,.14,.03,.73,'sun');
  metal(H,R,.85,10,1.95,1.18,.87,.07,'blue');
  for(let n=0;n<9;n++)H.line(R,[H.p(1+n*.18,10.03,.96),H.p(1+n*.18,11.1,.96)],'teal',1);
  cabinetFrame(H,R,8.85,.8,2.75,2.1,.15,1.32,2,'sun',(x,j,w,d,z,h,n)=>{for(const zz of [z+.1,z+.61]){timber(H,R,x,j,w,d,zz,.08,'sun');if(n===0)for(let k=0;k<3;k++)vessel(H,R,x+.2+k*.3,j+.9,zz+.09,5,13,k%2?'teal':'paper',false);else drape(H,R,x+.1,j+.2,w-.2,d-.35,zz+.12,.1,'paper');}});
  metal(H,R,8.75,.73,2.95,2.28,1.5,.14,'teal');
  metal(H,R,9.1,1.2,1.15,1.15,1.68,.09,'blue');vessel(H,R,9.65,1.75,1.78,15,17,'paper',false);
  const kettle=H.p(9.65,1.75,2.29);stroke(H,R,[[kettle[0]-10,kettle[1]],[kettle[0]-12,kettle[1]-13],[kettle[0]+6,kettle[1]-16],[kettle[0]+12,kettle[1]-4]],'blue',2.4);stroke(H,R,[[kettle[0]+9,kettle[1]+8],[kettle[0]+24,kettle[1]-1],[kettle[0]+24,kettle[1]-8]],'teal',5);
  for(const j of [1,2.84])bentTube(H,R,[[8.84,j,1.65],[8.84,j,2.02],[10.7,j,2.02]],2,'sun');
  const sink=H.tile(10.6,1.3,.85,1.1,1.69);surface(H,R,sink,'paper',1);surface(H,R,H.tile(10.71,1.41,.63,.87,1.7),'blue',.6);bentTube(H,R,[[10.74,1.16,1.7],[10.74,1.16,2.27],[11.03,1.39,2.27],[11.03,1.5,2.08]],2,'teal');
  timber(H,R,8.8,3.2,2.5,.85,2.1,.13,'sun');for(const i of [9,9.7,10.4]){vessel(H,R,i,3.6,2.25,9,18,'teal');bentTube(H,R,[[i-.3,3.97,2.23],[i+.3,3.97,2.23]],1.6,'sun');}
  for(const i of [10.35,11.5])bentTube(H,R,[[i,5.35,.1],[i,4.05,3.48]],4,'sun');for(let n=0;n<6;n++)timber(H,R,10.27,5.2-n*.19,1.33,.27,.25+n*.5,.12,'sun');
  surface(H,R,H.tile(10.05,3.6,1.8,1.3,3.55),'blue',.7);
  timber(H,R,4.1,.75,3.5,.22,.85,.2,'sun');for(const i of [4.2,7.35])metal(H,R,i,.67,.14,.42,.8,.27,'teal');
  box(H,R,4.4,8.7,3.3,2.15,.01,.09,'teal',.35);H.outline(R,H.tile(4.6,8.9,2.9,1.75,.12),'sun',1.1);H.line(R,[H.p(5.75,9.72,.13),H.p(6.2,9.72,.13)],'blue',2.5);
  for(let n=0;n<4;n++){const p=H.p(10.7,9.3,.06);H.outline(R,ell(p[0],p[1],25-n*4,11-n*1.5),'sun',2.1);}
  bentTube(H,R,[[10.2,10.3,.1],[10.2,10.3,.43],[10.8,10.3,.43],[10.8,10.3,.1]],3,'teal');
  timber(H,R,.6,7.3,.85,1.3,2.1,.12,'sun');
  timber(H,R,.55,2.1,.84,4.1,2.75,.11,'sun');
  for(let n=0;n<8;n++)H.line(R,[H.p(.62,2.2+n*.45,2.9),H.p(1.38,2.2+n*.45,2.77)],'blue',.8);for(let n=0;n<5;n++)H.line(R,[H.p(.62+n*.16,2.1,2.82),H.p(.62+n*.16,6.1,2.82)],'sun',1.2);
  for(const j of [2.65,3.8,4.95]){const p=H.p(.91,j,2.99);oval(H,R,p[0],p[1],14,7,'paper',1);H.outline(R,ell(p[0],p[1],7,3.5),'teal',.9);H.line(R,[[p[0]-12,p[1]],[p[0]+12,p[1]]],'coral',1.8);}
  for(const j of [2.18,6.03])bentTube(H,R,[[.18,j,3.35],[1.36,j,2.86]],1.5,'blue');
  cabinetFrame(H,R,5.8,9.6,2.5,1.5,.06,.72,3,'sun',(x,j,w,d,z,h,n)=>{const p=H.p(x+.28,j+.65,z+.15);oval(H,R,...p,9,4,n===1?'coral':'blue',.65);oval(H,R,p[0]+4,p[1]-4,5,3,'paper',1);});
  drape(H,R,5.8,9.6,2.5,1.5,.82,.1,'teal');
  timber(H,R,2.0,.47,1.0,.66,1.27,.1,'sun');for(let n=0;n<2;n++){surface(H,R,H.faceI(2.07+n*.43,.9,.34,1.39,1.8),'paper',1,.6);oval(H,R,...H.p(2.24+n*.43,.92,1.65),3,4,'teal',.6);}

  const boat=H.p(1.0,7.8,2.28);shape(H,R,[[boat[0]-12,boat[1]],[boat[0]+13,boat[1]],[boat[0]+6,boat[1]+6],[boat[0]-6,boat[1]+6]],'blue',.65);shape(H,R,[[boat[0]-6,boat[1]],[boat[0]+2,boat[1]-12],[boat[0]+8,boat[1]]],'paper',1);
  pendant(H,R,6.5,1.9,3.9,2.7,'sun',.54);
},(H,R,t)=>{
  const u=((t%22)+22)%22,f=ease(4.4,8.8,u)*(1-ease(13.2,20,u)),a=f*Math.PI/2;
  const P=(x,v,z=0)=>H.p(4.2+x,.9+v*Math.sin(a),1.0+v*Math.cos(a)+z);
  surface(H,R,[P(0,0),P(3.2,0),P(3.2,1.95),P(0,1.95)],'sun',.5,1.1);
  H.line(R,[P(0,1.95),P(3.2,1.95)],'paper',2.1);
  for(let n=0;n<4;n++)H.line(R,[P(.2,.28+n*.42),P(3,.28+n*.42)],'coral',.5,{tone:.55});
  for(const x of [.12,3.08]){const top=H.p(4.2+x,.91,3.1),end=P(x,1.82);stroke(H,R,[top,[(top[0]+end[0])/2,(top[1]+end[1])/2+8*(1-f)],end],'blue',1.6);for(let n=0;n<9;n++){const k=n/8;H.dot(top[0]+(end[0]-top[0])*k,top[1]+(end[1]-top[1])*k+Math.sin(k*Math.PI)*8*(1-f),1.3,'sun');}}
  benchFrame(H,R,7.55,1.7,.75,.75,.7,'teal');
  person(H,R,7.85,2.0,[P(2.85,.48),H.p(7.8,2.1,1.08)],'coral',-2);
  H.clip(H.tile(1,2,10,8,.04),()=>{for(let n=0;n<3;n++){const y=2.3+n*2.5+.15*Math.sin(u/22*Math.PI*2+n);H.line(R,[H.p(1.3,y,.04),H.p(5,y+.2,.04)],'paper',2,{tone:.5});}});
});
room.loopSeconds=22;
room.stillTime=10.5;
export default room;
