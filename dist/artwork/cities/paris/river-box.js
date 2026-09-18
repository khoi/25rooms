import { world, shape, oval, stroke, box, ell, wallPt } from '../../worlds/common.js';
import { timber, metal, surface, vessel, drape, benchFrame, bentTube, pendant, slattedSeat } from '../materials.js';
import { windowBay, hangingRail, floorShadow, caster, panelFront } from '../joinery.js';
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
function book(H,R,i,j,z,w=.22,h=.72,ink='coral'){
  box(H,R,i,j,w,.65,z,h,ink,.65);surface(H,R,H.faceJ(i+w+.006,j+.05,.55,z+.05,z+h-.05),'paper',1,.4);for(const a of [.14,.27])H.line(R,[H.p(i+.02,j+.66,z+a),H.p(i+w-.02,j+.66,z+a)],'sun',.7);H.line(R,[H.p(i+w-.04,j+.65,z+.06),H.p(i+w-.04,j+.65,z+h-.06)],'blue',.55);
}
function print(H,R,P,w,h,flower=false){
  surface(H,R,[P(0,0),P(w,0),P(w,h),P(0,h)],'paper',1,.7);
  const pts=[P(.15,.15),P(w-.15,.15),P(w-.15,h-.15),P(.15,h-.15)];H.outline(R,pts,'teal',.7);
  surface(H,R,[P(w*.18,h*.2),P(w*.47,h*.67),P(w*.75,h*.23)],'teal',.58,.6);oval(H,R,...P(w*.7,h*.68),w*4,w*4,'sun',.65);
  if(flower){const a=P(.31,.25),b=P(.43,h*.75);stroke(H,R,[a,b],'teal',.8);for(let n=0;n<5;n++){const q=n*Math.PI*2/5;oval(H,R,b[0]+Math.cos(q)*3,b[1]+Math.sin(q)*3,2,1.4,'coral',.6);}}
}
const room=world('paris-river-box','The bookstall lid rises',{wall:false,head:18,floor:'paper',tone:.7},(H,R)=>{
  surface(H,R,H.tile(0,0,12,1.1,.02),'teal',.6,.8);for(let n=0;n<14;n++)H.line(R,[H.p(n*.9,.14,.05),H.p(n*.9+.5,.8,.05)],'paper',1,{tone:.6});
  masonry(H,R,'ne',0,12,0,1.4,'paper',.8);
  timber(H,R,0,.15,12,.8,1.35,.25,'paper');
  for(const i of [1.6,5.6,9.6]){timber(H,R,i,.06,.34,.98,.1,1.42,'paper');metal(H,R,i+.08,.89,.18,.1,.5,.6,'teal');}
  for(let n=0;n<6;n++){const p=H.p(n*2+.4,.4,1.62);H.line(R,[[p[0]-10,p[1]],[p[0]+10,p[1]+10]],'blue',.5,{tone:.25});}
  masonry(H,R,'nw',.1,6.0,0,3.25,'paper',.75);
  archedBay(H,R,'nw',1.0,3.8,.32,2.4,'teal',P=>{surface(H,R,[P(.1,.1),P(3.7,.1),P(3.7,2.4),P(.1,2.4)],'blue',.62);for(let n=0;n<5;n++)H.line(R,[P(.4+n*.68,.3),P(.4+n*.68,2.2)],'teal',2);});
  for(const j of [.74,4.89]){timber(H,R,.07,j,.29,.28,.05,2.54,'paper');timber(H,R,.03,j-.1,.42,.48,2.51,.17,'paper');}
  for(let n=0;n<9;n++){const a=n*Math.PI/8;const j=2.9+Math.cos(a)*2.08,z=2.07+Math.sin(a)*.7;H.line(R,[H.p(.28,j,z),H.p(.28,2.9+Math.cos(a)*2.27,2.07+Math.sin(a)*.89)],'blue',.8);}
  timber(H,R,.05,.83,.5,4.14,.25,.16,'paper');
  for(let i=0;i<12;i+=1.8)for(let j=1.3;j<12;j+=1.5)H.outline(R,H.tile(i+.02,j+.02,1.75,1.45,.01),'blue',.55,{tone:.3});
  floorShadow(H,1.7,3,5.8,2.5,.25);
  for(const i of [2.05,7.0])for(const j of [3.35,5.15]){metal(H,R,i,j,.16,.16,.1,1.15,'teal');metal(H,R,i-.05,j-.03,.26,.23,.04,.11,'blue');}
  for(const j of [3.4,5.12])bentTube(H,R,[[2.15,j,.3],[6.98,j,1.04]],2,'teal');
  metal(H,R,1.93,3.24,5.21,1.97,.36,.08,'teal');
  timber(H,R,2.08,3.4,2.23,1.51,.45,.09,'sun');for(let n=0;n<4;n++){box(H,R,2.19+n*.03,3.48+n*.03,1.64,1.1,.56+n*.13,.1,n%2?'coral':'paper',.8);}
  drape(H,R,4.87,3.54,1.44,1.14,.49,.13,'teal');
  metal(H,R,6.57,3.3,.45,1.77,.45,.36,'teal');for(let n=0;n<3;n++)book(H,R,6.63,3.49+n*.48,.83,.23,.24,n%2?'sun':'paper');
  for(const i of [2.1,7.01])metal(H,R,i,5.25,.18,.22,.82,.2,'sun');
  metal(H,R,1.8,3.05,5.6,2.45,1.1,.13,'teal');
  surface(H,R,H.tile(1.96,3.2,5.28,2.1,1.24),'blue',.7);
  for(const j of [3.05,5.36])metal(H,R,1.8,j,5.6,.14,1.23,.58,'teal');
  for(const i of [1.8,7.25])metal(H,R,i,3.08,.15,2.33,1.23,.58,'teal');
  for(let n=0;n<15;n++){const i=2.04+n*.32;book(H,R,i,3.32,1.26,.24,.45+(n%3)*.12,['coral','teal','sun','paper'][n%4]);}
  for(const i of [3.64,5.17,6.58])timber(H,R,i,3.18,.08,2.06,1.24,.54,'sun');
  for(let n=0;n<5;n++){const i=2.1+n*.91;surface(H,R,H.tile(i,4.37,.68,.76,1.27),'paper',1,.7);H.line(R,[H.p(i+.05,4.57,1.3),H.p(i+.57,4.57,1.3)],n%2?'coral':'teal',2);}
  metal(H,R,1.7,5.43,5.8,.22,1.13,.09,'teal');for(const i of [2,4.6,7])H.line(R,[H.p(i,5.45,1.8),H.p(i+.2,5.45,1.8)],'paper',1.3);
  for(const i of [2.38,5.42]){surface(H,R,H.faceI(i,5.52,1.3,1.32,1.64),'teal',.36);H.line(R,[H.p(i+.15,5.54,1.37),H.p(i+.9,5.54,1.37)],'paper',.7);}
  const chain=H.p(4.55,5.6,1.46);stroke(H,R,[chain,[chain[0]+9,chain[1]+15],[chain[0]+21,chain[1]+17],[chain[0]+27,chain[1]+3]],'blue',1.1);for(let n=0;n<4;n++)H.outline(R,ell(chain[0]+9+n*4,chain[1]+15+Math.sin(n)*2,2,3),'sun',.8);
  oval(H,R,...H.p(4.45,5.55,1.49),4,5,'sun',.9);stroke(H,R,[H.p(4.4,5.55,1.57),H.p(4.45,5.55,1.7),H.p(4.5,5.55,1.57)],'blue',1);
  for(const i of [2.2,6.8])metal(H,R,i,2.98,.4,.23,1.73,.13,'sun');
  cabinetFrame(H,R,8.65,1.8,2.6,2.9,.3,1.9,2,'teal',(x,j,w,d,z,h,n)=>{timber(H,R,x,j,w,d,z+.75,.1,'sun');if(n===0){for(let q=0;q<4;q++)book(H,R,x+.08+q*.2,j+.2,z,.16,.64,['coral','paper','teal','sun'][q]);for(let q=0;q<3;q++)box(H,R,x+.1,j+.4,.78,.5,z+.92+q*.1,.08,'paper',1);}else for(let q=0;q<4;q++)print(H,R,(u,v)=>H.p(x+.1+u,j+.3+q*.14,z+.15+v),.75,1.4,q===1);});
  for(const i of [8.75,11])for(const j of [1.9,4.45])caster(H,R,i,j,.17);
  for(const j of [2.02,4.43])bentTube(H,R,[[8.8,j,.46],[11.09,j,2.14]],1.4,'sun');
  timber(H,R,10.08,3.2,1.05,1.42,.7,.12,'sun');surface(H,R,H.faceI(10.08,4.65,1.05,.82,1.1),'coral',.5);H.line(R,[H.p(10.41,4.67,.99),H.p(10.82,4.67,.99)],'sun',1.5);
  for(const i of [8.85,11.08]){metal(H,R,i,4.52,.21,.25,.23,.08,'sun');H.dot(...H.p(i+.1,4.8,.27),1.5,'blue');}
  timber(H,R,8.55,1.7,2.8,3.1,2.25,.12,'sun');for(let n=0;n<4;n++)box(H,R,8.8+n*.03,2.3+n*.02,1.5,.9,2.38+n*.12,.1,n%2?'paper':'coral',.85);
  bentTube(H,R,[[11.15,4.1,.4],[11.5,4.1,2.78],[11.5,2.2,2.78]],3,'teal');
  const umbrella=H.p(11,2.0,2.45);stroke(H,R,[[umbrella[0],umbrella[1]+5],[umbrella[0]-5,umbrella[1]-63],[umbrella[0]-1,umbrella[1]-69],[umbrella[0]+5,umbrella[1]-67]],'blue',2);shape(H,R,[[umbrella[0]-7,umbrella[1]-9],[umbrella[0]-12,umbrella[1]-58],[umbrella[0]+2,umbrella[1]-61],[umbrella[0]+4,umbrella[1]-10]],'coral',.6);
  for(const i of [1.4,4.65])bentTube(H,R,[[i,8.44,.07],[i,9.93,1.0],[i,8.44,1.0],[i,9.93,.07]],3,'sun');
  timber(H,R,1.3,8.4,3.6,1.65,.91,.12,'sun');timber(H,R,1.32,8.43,3.55,.12,1.03,.16,'teal');
  timber(H,R,1.48,8.64,3.17,1.17,.31,.09,'sun');for(let n=0;n<3;n++)box(H,R,1.7+n*.08,8.7,2.24,.91,.4+n*.12,.09,n===1?'coral':'paper',.8);

  print(H,R,(u,v)=>H.p(1.5+u,8.5+v,1.045),1.6,1.25,true);
  print(H,R,(u,v)=>H.p(3.3+u,8.6+v,1.065),1.25,.9);
  const glass=H.p(4.2,9.1,1.1);oval(H,R,...glass,6,4,'paper',.55);stroke(H,R,[[glass[0]+4,glass[1]+2],[glass[0]+12,glass[1]+9]],'blue',2);
  drape(H,R,1.8,8.7,1.8,1.1,.25,.13,'paper');
  timber(H,R,8.52,8.37,2.84,1.79,.1,.16,'sun');timber(H,R,8.52,8.36,2.84,.13,.26,.57,'teal');timber(H,R,8.52,8.37,.14,1.83,.26,.57,'teal');
  for(let n=0;n<3;n++)box(H,R,8.7+n*.06,8.6-n*.03,2.1,1.4,.12+n*.11,.1,'paper',1);drape(H,R,9,8.7,1.2,1.2,.48,.2,'teal');
  vessel(H,R,10.4,9.35,.54,7,13,'sun',false);const tie=H.p(9.2,9.5,.57);stroke(H,R,[[tie[0]-12,tie[1]],[tie[0]+6,tie[1]-2],[tie[0]+13,tie[1]+6]],'coral',1.1);
  for(const i of [9.0,10.37])for(const j of [8.74,9.71])metal(H,R,i,j,.15,.16,.13,.22,'teal');
  timber(H,R,8.52,10.07,2.84,.13,.26,.57,'teal');timber(H,R,11.22,8.37,.14,1.83,.26,.57,'teal');
  const tissue=H.p(10.8,8.68,.78);surface(H,R,[[tissue[0]-14,tissue[1]],[tissue[0]+5,tissue[1]-7],[tissue[0]+18,tissue[1]+3],[tissue[0]+1,tissue[1]+10]],'paper',1);H.line(R,[[tissue[0]+1,tissue[1]+8],[tissue[0]+4,tissue[1]-5]],'teal',.7);
  for(let n=0;n<3;n++){const a=H.p(10.93,9.01+n*.3,.89);oval(H,R,...a,4,3,'paper',1);H.line(R,[[a[0]-2,a[1]],[a[0]-2,a[1]-23-n*4]],'paper',6);oval(H,R,a[0],a[1]-23-n*4,4,3,'sun',.6);}
  for(const i of [1.05,2.93])bentTube(H,R,[[i,10.76,.05],[i,10.22,1.85],[i,11.39,.05]],3,'teal');
  timber(H,R,.93,10.18,2.19,.17,.47,1.43,'sun');
  surface(H,R,H.faceI(1.08,10.39,1.87,.6,1.72),'blue',.6);print(H,R,(u,v)=>H.p(1.21+u,10.41,.73+v),1.59,.87,true);
  bentTube(H,R,[[1.18,10.3,.75],[2.95,10.3,.75]],2.1,'sun');
  const stool=H.p(10.2,6.45,.57);oval(H,R,...stool,20,10,'sun',.6);for(const i of [9.88,10.5])bentTube(H,R,[[i,6.08,.04],[i,6.82,.62],[i,6.09,.62],[i,6.81,.04]],2.6,'teal');
  vessel(H,R,10.12,6.39,.68,7,13,'teal',false);const thermos=H.p(10.42,6.24,.64);oval(H,R,...thermos,6,3,'paper',1);H.line(R,[[thermos[0]-5,thermos[1]],[thermos[0]-5,thermos[1]-22]],'teal',9);oval(H,R,thermos[0],thermos[1]-22,6,3,'sun',.7);
  const tote=H.p(4.7,10.1,.12);shape(H,R,[[tote[0]-15,tote[1]-24],[tote[0]+9,tote[1]-21],[tote[0]+13,tote[1]],[tote[0]-14,tote[1]-3]],'paper',1);stroke(H,R,[[tote[0]-10,tote[1]-23],[tote[0]-8,tote[1]-38],[tote[0]+6,tote[1]-35],[tote[0]+8,tote[1]-22]],'teal',2);
},(H,R,t)=>{
  const u=((t%16)+16)%16,f=ease(.6,6.4,u)*(1-ease(9.6,14,u)),a=.06+f*1.08;
  const P=(x,v,z=0)=>H.p(1.8+x,3.03+v*Math.cos(a),1.84+v*Math.sin(a)+z);
  surface(H,R,[P(0,0),P(5.6,0),P(5.6,2.47),P(0,2.47)],'teal',.57,1.2);
  for(const x of [.15,2.85,5.46]){
    surface(H,R,[P(x,0,.03),P(x+.09,0,.03),P(x+.09,2.38,.03),P(x,2.38,.03)],'teal',.8,.6);
    for(const v of [.14,2.23])H.dot(...P(x+.04,v,.05),1.4,'sun');
  }
  for(const x of [.45,4.8]){H.line(R,[P(x,.04,.03),P(x+.34,.04,.03)],'sun',4);for(let n=0;n<4;n++)H.line(R,[P(x+n*.1,0,.035),P(x+n*.1,.11,.035)],'blue',.8);}
  H.line(R,[P(.12,2.41,.025),P(5.49,2.41,.025)],'blue',3.5);H.line(R,[P(.12,2.44,.03),P(5.49,2.44,.03)],'paper',1.3);
  const brush=P(4.76,.52,.05);H.line(R,[[brush[0],brush[1]],[brush[0]+11,brush[1]-5]],'sun',2.5);for(let n=0;n<5;n++)H.line(R,[[brush[0]-4+n*2,brush[1]-1],[brush[0]-6+n*2,brush[1]+7]],'paper',1.1);
  for(const x of [.1,5.5])H.line(R,[P(x,.05),P(x,2.39)],'sun',2);H.line(R,[P(.1,2.36),P(5.5,2.36)],'paper',1.4);
  print(H,R,(x,v)=>P(1.2+x,.32+v,.015),1.8,1.35);
  H.outline(R,[P(3.48,.5,.02),P(4.7,.5,.02),P(4.7,1.63,.02),P(3.48,1.63,.02)],'sun',.6,{tone:.5});
  surface(H,R,[P(0,2.04,.02),P(.58,2.04,.02),P(.58,2.47,.02),P(0,2.47,.02)],'paper',.8);for(const x of [.11,.47])for(const v of [2.13,2.38])H.dot(...P(x,v,.03),1.3,'blue');
  const notch=H.p(7.14,4.68,1.32),end=P(5.3,1.75,.025);H.line(R,[notch,end],'blue',3);H.line(R,[[notch[0]-1,notch[1]],[end[0]-1,end[1]]],'sun',1.3);for(const q of [.23,.4])H.dot(notch[0]+(end[0]-notch[0])*q,notch[1]+(end[1]-notch[1])*q,1.6,'paper');
  const grip=P(5.55,1.7,.035),handle=H.p(7.64,4.4,1.65);
  stroke(H,R,[grip,[grip[0]+5,grip[1]+12],handle],'sun',2.3);
  person(H,R,8.0,4.45,[handle,H.p(7.35,4.7,1.49)],'teal',-2);
  const cover=H.p(9.1,9.7,.5);stroke(H,R,[cover,[cover[0]+10,cover[1]+5+Math.sin(u/16*Math.PI*2)],[cover[0]+18,cover[1]+3]],'paper',1.2);
  person(H,R,5.9,7.5,[H.p(5.7,7.48,1),H.p(6.1,7.65,.85)],'coral',Math.sin(u/16*Math.PI*2));
});
room.loopSeconds=16;
room.stillTime=8;
export default room;
