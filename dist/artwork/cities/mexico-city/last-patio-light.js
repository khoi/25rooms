import { world, shape, oval, stroke, box, ell, cycle, actor } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { surface, timber, metal, bentTube, benchFrame, cushion, drape, vessel, pendant } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { recessedFrame, panelFront, caster } from '../joinery.js';

const ease=(a,b,t)=>{const p=Math.max(0,Math.min(1,(t-a)/(b-a)));return p*p*(3-2*p);};
const welcome={...FIGURES.sample('idle',0),al:28,el:35,ar:35,er:35,head:0};
FIGURES.clips.mexicoPatioWelcome={dur:16,keys:[[0,welcome],[.42,welcome],[.48,{...welcome,head:9,ar:52,er:50}],[.57,{...welcome,head:0,ar:52,er:50}],[.85,welcome],[1,welcome]]};
function chair(H,R,i,j){for(const a of [0,.9])for(const b of [0,.85]){timber(H,R,i+a,j+b,.1,.12,.04,.68,'sun');if(b===0)timber(H,R,i+a,j+b,.1,.12,.68,.73,'sun');}for(const b of [.08,.83])timber(H,R,i+.03,j+b,.92,.1,.28,.1,'sun');timber(H,R,i-.08,j-.07,1.16,1.13,.64,.11,'sun');cushion(H,R,i-.01,j,1.02,.96,.76,.12,'paper');for(let n=0;n<4;n++)H.line(R,[H.p(i+.12+n*.23,j+.04,.89),H.p(i+.12+n*.23,j+.94,.89)],'coral',1.1);for(const a of [.27,.63])timber(H,R,i+a,j,.1,.12,.91,.35,'sun');timber(H,R,i-.03,j-.02,1.07,.16,1.23,.16,'sun');for(const a of [.09,.9])stroke(H,R,[H.p(i+a,j+.13,.84),H.p(i+a,j+.06,.6),H.p(i+a+.12,j+.13,.55)],'coral',.9);}
function cup(H,R,i,j,z,ink='teal',s=1){const p=H.p(i,j,z);surface(H,R,[[p[0]-5*s,p[1]-10*s],[p[0]+5*s,p[1]-10*s],[p[0]+4*s,p[1]],[p[0]-4*s,p[1]]],ink,.68,.7);oval(H,R,p[0],p[1]-10*s,5*s,2.5*s,'paper',1);oval(H,R,p[0],p[1]-10*s,3.6*s,1.4*s,'blue',.5);stroke(H,R,[[p[0]+5*s,p[1]-8*s],[p[0]+10*s,p[1]-8*s],[p[0]+10*s,p[1]-3*s],[p[0]+5*s,p[1]-2*s]],'blue',1.3);H.line(R,[[p[0]+8*s,p[1]-8*s],[p[0]+10*s,p[1]-6*s]],'sun',1.7);}
const room=world('mexico-city-last-patio-light','A place beside the kitchen',{wall:false,floor:'blue',tone:.22,head:50},(H,R)=>{
  for(let i=0;i<12;i+=1.5)for(let j=0;j<12;j+=1.5){surface(H,R,H.tile(i+.035,j+.035,1.43,1.43,.015),'paper',.6,.5);if((i+j)%3===0)H.line(R,[H.p(i+.1,j+.1,.02),H.p(i+.5,j+.14,.02)],'sun',.6);}
  masonry(H,R,'nw',0,12,0,3.3,'teal',.36);masonry(H,R,'ne',0,12,0,3.88,'paper',.92);
  for(const j of [.4,6.2,11.55])timber(H,R,.1,j,.2,.2,.05,3.2,'sun');
  timber(H,R,.11,.16,.3,11.65,3.28,.16,'sun');
  for(let j=.35;j<11.6;j+=.66){surface(H,R,H.faceJ(.14,j,.58,.09,.4),'coral',.4,.6);const p=H.p(.15,j+.29,.25);oval(H,R,...p,2,2,'sun',.7);}
  recessedFrame(H,R,'ne',.5,1.95,1.09,2.24,'coral',P=>{
    surface(H,R,[P(.15,.13),P(1.8,.13),P(1.8,2.08),P(.15,2.08)],'teal',.42,.6);
    for(const h of [.61,1.27])H.line(R,[P(.15,h),P(1.8,h)],'sun',3.2);
    for(let n=0;n<4;n++){const p=P(.34+n*.38,.89);oval(H,R,...p,5,12,'paper',1);H.line(R,[[p[0],p[1]-8],[p[0],p[1]+8]],'blue',.6);}
    const p=P(.9,.33);oval(H,R,...p,14,6,'sun',.8);oval(H,R,p[0],p[1]-4,12,5,'paper',1);for(let n=0;n<3;n++)H.line(R,[[p[0]-9,p[1]-2+n*2],[p[0]+9,p[1]-2+n*2]],'teal',.7);
    const q=P(.96,1.7);surface(H,R,[[q[0]-10,q[1]],[q[0]+10,q[1]],[q[0]+8,q[1]-14],[q[0]-8,q[1]-14]],'coral',.7,.7);oval(H,R,q[0],q[1]-14,8,3,'sun',.7);stroke(H,R,[[q[0]+9,q[1]-10],[q[0]+14,q[1]-11],[q[0]+16,q[1]-3],[q[0]+10,q[1]-3]],'blue',1.2);
  });
  timber(H,R,.54,.23,1.85,.92,.7,.13,'sun');
  for(const x of [.66,2.12])timber(H,R,x,.35,.12,.68,.05,.64,'teal');
  const fruit=H.p(1.44,.74,.87);oval(H,R,...fruit,15,7,'teal',.65);for(const [dx,dy]of [[-7,-3],[1,-6],[8,-2]]){oval(H,R,fruit[0]+dx,fruit[1]+dy,4,4,'sun',.9);H.line(R,[[fruit[0]+dx,fruit[1]+dy-3],[fruit[0]+dx+2,fruit[1]+dy-7]],'blue',.7);}
  recessedFrame(H,R,'ne',2.8,4.1,.06,3.53,'sun',P=>{
    surface(H,R,[P(.13,.06),P(3.97,.06),P(3.97,3.35),P(.13,3.35)],'sun',.43,.8);
    surface(H,R,[P(.23,.06),P(3.78,.06),P(3.78,3.3),P(.23,3.3)],'paper',1,.6);
    for(const x of [.31,1.51,2.71]){
      surface(H,R,[P(x,.08),P(x+1.01,.08),P(x+1.01,.91),P(x,.91)],'teal',.5,.7);
      surface(H,R,[P(x+.1,.17),P(x+.91,.17),P(x+.91,.66),P(x+.1,.66)],'blue',.35,.5);
      H.line(R,[P(x+.3,.76),P(x+.73,.76)],'sun',1.8);
    }
    for(let x=.3;x<3.8;x+=.45)H.line(R,[P(x,.1),P(x,1.05)],'coral',.65,{tone:.43});
    surface(H,R,[P(.25,.45),P(3.74,.45),P(3.74,1.15),P(.25,1.15)],'teal',.5,.6);
    H.line(R,[P(.22,1.17),P(3.8,1.17)],'sun',3);
    for(let n=0;n<4;n++){const p=P(.7+n*.8,1.46);oval(H,R,...p,6,7,'paper',1);H.line(R,[[p[0],p[1]-9],[p[0],p[1]-16]],'blue',.9);}
    H.line(R,[P(.3,2.2),P(3.8,2.2)],'blue',3);for(let n=0;n<5;n++){const p=P(.55+n*.65,2.38);surface(H,R,[[p[0]-6,p[1]],[p[0]+6,p[1]],[p[0]+5,p[1]-12],[p[0]-5,p[1]-12]],n%2?'coral':'teal',.62,.5);}
  });
  timber(H,R,2.7,.27,4.35,.63,.03,.12,'sun');
  H.tint([H.p(3,.45,.021),H.p(6.63,.45,.021),H.p(8.6,9.4,.021),H.p(4.5,9.4,.021)],'sun',.24);
  const glow=H.p(5,4.6,.02);H.glow(...glow,140,90,'sun',.13);
  bentTube(H,R,[[2.78,.32,3.39],[6.86,.32,3.39]],2.4,'blue');
  surface(H,R,H.tile(2.77,1.02,4.2,.3,.023),'blue',.55,.6);for(let n=0;n<22;n++)H.line(R,[H.p(2.86+n*.18,1.07,.03),H.p(2.86+n*.18,1.27,.03)],'paper',.7);
  timber(H,R,.1,.1,11.7,.33,3.79,.23,'sun');for(const x of [1.1,7.2,11.4])timber(H,R,x,.1,.15,1.65,3.91,.1,'sun');
  bentTube(H,R,[[.2,1.62,3.89],[11.63,1.62,3.89],[11.63,1.62,.08],[11.63,3.6,.08]],2.4,'teal');
  cabinetFrame(H,R,8.22,.28,3.26,1.22,.12,3.44,3,'teal',(x,y,w,d,z,h,col)=>{
    for(const zz of [.62,1.4,2.32])timber(H,R,x,y,w,d,z+zz,.09,'sun');
    if(col===0){for(let n=0;n<4;n++){const p=H.p(x+.14+n*.19,y+.5,z+1.76);oval(H,R,...p,4,13,'paper',1);H.line(R,[[p[0]-2,p[1]-8],[p[0]-2,p[1]+8]],'teal',.65);}drape(H,R,x+.06,y+.09,w-.1,d-.1,z+.74,.26,'paper');}
    if(col===1){const p=H.p(x+.47,y+.64,z+.97);oval(H,R,...p,15,8,'sun',.73);for(let n=0;n<6;n++)H.line(R,[[p[0]-12+n*4,p[1]-5],[p[0]-10+n*4,p[1]+5]],'coral',.75);for(let n=0;n<2;n++)cup(H,R,x+.25+n*.44,y+.44,z+2.39,'coral',.7);}
    if(col===2){for(const zz of [.22,1.8]){const p=H.p(x+.5,y+.58,z+zz);oval(H,R,...p,10,13,'blue',.65);H.line(R,[[p[0],p[1]-12],[p[0],p[1]-23]],'sun',2);}box(H,R,x+.08,y+.2,w-.16,.6,z+.7,.42,'coral',.54);}
  });
  panelFront(H,R,8.29,1.51,3.12,.15,.57,3,'teal');
  recessedFrame(H,R,'nw',2.3,3.3,1.23,1.45,'sun',P=>{
    surface(H,R,[P(.15,.13),P(3.14,.13),P(3.14,1.28),P(.15,1.28)],'blue',.54,.5);
    for(let n=0;n<3;n++){const p=P(.62+n*1.02,.64);surface(H,R,[[p[0]-10,p[1]-12],[p[0]+10,p[1]-12],[p[0]+10,p[1]+12],[p[0]-10,p[1]+12]],'paper',1,.6);oval(H,R,p[0],p[1]-2,4,5,'teal',.7);shape(H,R,[[p[0]-7,p[1]+9],[p[0]-5,p[1]+3],[p[0]+4,p[1]+3],[p[0]+7,p[1]+9]],'coral',.6,.4);}
  });
  timber(H,R,.16,6.45,.9,3.1,1.65,.12,'sun');vessel(H,R,.55,7.07,1.78,8,19,'coral',false);cup(H,R,.6,8.05,1.79,'teal',.95);box(H,R,.25,8.57,.55,.55,1.78,.32,'sun',.6);
  for(const j of [4.54,8.13])for(const x of [.67,1.76])timber(H,R,x,j,.14,.14,.04,.54,'sun');
  timber(H,R,.62,4.45,1.32,3.92,.11,.1,'teal');
  for(const j of [4.52,5.74,7.0,8.16])timber(H,R,.7,j,1.17,.12,.2,.31,'sun');
  for(let n=0;n<4;n++)timber(H,R,.63+n*.33,4.43,.28,3.98,.52,.12,'sun');
  for(const j of [4.52,8.14])timber(H,R,.67,j,.13,.13,.6,.58,'teal');
  for(const z of [.82,1.11])timber(H,R,.66,4.46,.15,3.83,z,.14,'teal');
  drape(H,R,.7,4.65,1.04,.62,.65,.21,'paper');

  for(let n=0;n<3;n++){const p=H.p(1.25,4.95+n*1.05,.12);oval(H,R,p[0]-4,p[1],8,4,'teal',.66);oval(H,R,p[0]+7,p[1]+6,8,4,'coral',.55);}
  const key=H.p(1.38,7.65,.55);oval(H,R,...key,9,5,'sun',.65);H.outline(R,ell(key[0]-2,key[1],2.4,2),'blue',.8);H.line(R,[[key[0],key[1]],[key[0]+6,key[1]+3]],'blue',1.2);
  const bag=H.p(.65,10.18,1.15);shape(H,R,[[bag[0]-13,bag[1]],[bag[0]-12,bag[1]-27],[bag[0]+13,bag[1]-27],[bag[0]+15,bag[1]]],'sun',.6,.8);stroke(H,R,[[bag[0]-7,bag[1]-25],[bag[0]-8,bag[1]-39],[bag[0]+7,bag[1]-39],[bag[0]+9,bag[1]-25]],'blue',2);for(let n=0;n<8;n++)H.line(R,[[bag[0]-11+n*3,bag[1]-23],[bag[0]-9+n*3,bag[1]-20]],'coral',.8);
  for(const x of [3.73,7.23])for(const j of [4.3,6.34]){
    timber(H,R,x,j,.2,.22,.05,.89,'sun');
    metal(H,R,x-.03,j-.03,.26,.28,.77,.14,'blue');
  }
  for(const j of [4.34,6.34])timber(H,R,3.77,j,3.64,.15,.77,.18,'coral');
  for(const x of [3.81,7.27])timber(H,R,x,4.38,.14,2.13,.79,.15,'sun');
  for(let n=0;n<5;n++)timber(H,R,3.53,4.09+n*.51,4.13,.48,.98,.14,'sun');
  for(const x of [3.69,7.44])for(const j of [4.23,6.4])H.dot(...H.p(x,j,1.13),1.3,'blue');
  for(const j of [4.45,6.22])H.line(R,[H.p(3.82,j,1.126),H.p(4.62,j+.025,1.126)],'coral',.7);

  for(const j of [4.42,6.3])bentTube(H,R,[[3.82,j,.18],[5.6,j,.78],[7.31,j,.18]],2.6,'coral');
  drape(H,R,4.93,4.15,1.15,2.48,1.13,.28,'paper');
  const bowl=H.p(5.56,5.22,1.19);oval(H,R,...bowl,22,11,'teal',.7);surface(H,R,[[bowl[0]-20,bowl[1]-1],[bowl[0]-14,bowl[1]-13],[bowl[0]+1,bowl[1]-18],[bowl[0]+16,bowl[1]-12],[bowl[0]+21,bowl[1]-1]],'paper',1,.8);oval(H,R,bowl[0],bowl[1]-18,4,2,'coral',.7);
  cup(H,R,4.08,6.13,1.15,'teal',1.15);cup(H,R,7.07,4.58,1.15,'coral',.9);vessel(H,R,7.06,5.48,1.14,8,23,'teal',false);
  const bread=H.p(4.28,4.87,1.16);oval(H,R,...bread,16,9,'coral',.6);oval(H,R,bread[0],bread[1]-3,14,7,'paper',1);for(const [dx,dy]of [[-6,-4],[4,-6],[7,0]]){oval(H,R,bread[0]+dx,bread[1]+dy,7,4,'sun',.8);H.line(R,[[bread[0]+dx-3,bread[1]+dy-2],[bread[0]+dx+2,bread[1]+dy+1]],'coral',.7);}
  surface(H,R,H.tile(6.21,5.67,.48,.61,1.15),'paper',1,.5);H.line(R,[H.p(6.38,5.72,1.16),H.p(6.38,6.19,1.16)],'blue',1.3);oval(H,R,...H.p(6.38,5.71,1.16),3,1.6,'blue',.6);
  const spoon=H.p(5.72,6.12,1.16);H.line(R,[[spoon[0]-8,spoon[1]-4],[spoon[0]+10,spoon[1]+6]],'sun',2);oval(H,R,spoon[0]-10,spoon[1]-5,5,3,'teal',.6);

  chair(H,R,3.0,3.05);
  for(const x of [9.18,10.33])for(const j of [5.34,8.4])caster(H,R,x,j,.11);
  for(const x of [9.17,10.32])for(const j of [5.3,8.37])timber(H,R,x,j,.11,.12,.23,.5,'teal');
  timber(H,R,9.17,5.3,1.22,3.13,.31,.08,'teal');
  for(let n=0;n<3;n++)drape(H,R,9.28,5.66+n*.66,.92,.49,.4,.18,['coral','paper','sun'][n]);
  timber(H,R,9.1,5.19,1.43,3.44,.73,.11,'sun');
  bentTube(H,R,[[9.18,5.32,.84],[9.18,5.32,1.22],[10.31,5.32,1.22],[10.31,5.32,.84]],2.1,'teal');

  for(let n=0;n<3;n++)drape(H,R,9.32,5.5+n*.38,.85,.33,.76+n*.02,.12,n%2?'coral':'paper');
  surface(H,R,H.tile(9.35,7.0,.85,1.05,.76),'paper',1,.6);H.line(R,[H.p(9.6,7.17,.79),H.p(9.6,7.79,.79)],'blue',1.6);oval(H,R,...H.p(9.6,7.81,.79),4,2.2,'blue',.7);cup(H,R,10.08,7.54,.8,'paper',.8);
  const tray=H.tile(1.78,9.64,1.58,1.84,.035);surface(H,R,tray,'teal',.45,.8);H.outline(R,H.tile(1.88,9.73,1.38,1.64,.055),'sun',1.2);
  for(const j of [9.93,10.7]){const p=H.p(2.45,j,.07);surface(H,R,ell(...p,12,5),'blue',.7,.8);surface(H,R,[[p[0]-10,p[1]],[p[0]-8,p[1]-7],[p[0]+6,p[1]-7],[p[0]+11,p[1]]],'coral',.64,.7);H.line(R,[[p[0]-7,p[1]-4],[p[0]+7,p[1]-4]],'sun',1.2);}
  benchFrame(H,R,.62,10.24,.86,.99,.63,'sun');
  const brush=H.p(1.05,10.71,.65);surface(H,R,ell(...brush,9,5),'sun',.7,.7);for(let n=0;n<6;n++)H.line(R,[[brush[0]-7+n*2.4,brush[1]-2],[brush[0]-7+n*2.4,brush[1]+4]],'blue',.6);
  bentTube(H,R,[[.24,1.1,2.47],[.49,1.1,2.47],[.49,2.02,2.47]],2,'blue');
  const coat=H.p(.5,1.6,2.3);surface(H,R,[[coat[0]-11,coat[1]],[coat[0]-5,coat[1]-6],[coat[0]+5,coat[1]-6],[coat[0]+12,coat[1]],[coat[0]+15,coat[1]+18],[coat[0]+8,coat[1]+17],[coat[0]+9,coat[1]+39],[coat[0]-9,coat[1]+39],[coat[0]-8,coat[1]+15],[coat[0]-14,coat[1]+17]],'coral',.6,.8);H.line(R,[[coat[0],coat[1]-2],[coat[0],coat[1]+34]],'sun',1);H.line(R,[[coat[0]-7,coat[1]+26],[coat[0]-2,coat[1]+26]],'blue',1.2);
  vessel(H,R,10.7,9.8,.0,11,27,'teal',true);for(const i of [10.6,10.9])bentTube(H,R,[[i,9.8,.15],[i,9.8,1.4],[i+.15,9.8,1.58],[i+.29,9.8,1.45]],1.8,'blue');
  box(H,R,.08,11.4,.37,.37,0,1.55,'teal',.7);H.line(R,[H.p(.42,11.5,1.1),H.p(.81,11.5,1.1)],'sun',3);
  pendant(H,R,6.54,.68,3.73,2.95,'coral',.65);
  const bird=H.p(4.6,.35,3.69);surface(H,R,[[bird[0]-13,bird[1]],[bird[0]-3,bird[1]-6],[bird[0]+4,bird[1]-2],[bird[0]+11,bird[1]-9],[bird[0]+16,bird[1]-4],[bird[0]+9,bird[1]],[bird[0],bird[1]+7]],'coral',.7,.6);H.line(R,[[bird[0]-4,bird[1]-4],[bird[0]+1,bird[1]+5]],'sun',.8);H.dot(bird[0]+11,bird[1]-5,.8,'blue');
},(H,R,t)=>{
  const u=cycle(t,16)*16,f=ease(3.2,6.4,u)*(1-ease(9.6,14,u)),j=7.22+f*.62;
  const sway=Math.sin(u*Math.PI/8)*.045;
  const cloth=[H.p(2.97,.45,3.34),H.p(3.78,.45,3.34),H.p(3.66,.64+sway,.3),H.p(2.92,.61+sway,.22)];surface(H,R,cloth,'paper',1,.8);for(let n=0;n<5;n++){const x=3.02+n*.14;H.line(R,[H.p(x,.46,3.28),H.p(x-.05,.6+sway,.34)],n%2?'sun':'blue',.7,{tone:.44});}H.line(R,[cloth[2],cloth[3]],'sun',1.7);
  actor(H,R,5.55,1.42,t,'mexicoPatioWelcome',{shirt:['teal',.72],pants:['blue',.65],apron:['sun',.65],hairStyle:'bun',face:'sw'},.13,1.47);
  chair(H,R,5.5,j);
  const foot=H.p(6.2,8.32+f*.62,.02),hip=[foot[0],foot[1]-28],chest=[hip[0]-3,hip[1]-23],head=[chest[0],chest[1]-14],hand=H.p(6.07,j+.05,1.4);
  for(const s of [-1,1]){H.line(R,[[hip[0]+s*6,hip[1]],[foot[0]+s*8,foot[1]-13],[foot[0]+s*10,foot[1]]],'blue',8);oval(H,R,foot[0]+s*10,foot[1],5,2.5,'blue',.9);}
  shape(H,R,[[chest[0]-9,chest[1]],[chest[0]+9,chest[1]],[hip[0]+10,hip[1]+3],[hip[0]-10,hip[1]+3]],'coral',.74);
  oval(H,R,...head,8,9,'coral',.44);shape(H,R,[[head[0]-8,head[1]],[head[0]-8,head[1]-7],[head[0]+2,head[1]-11],[head[0]+8,head[1]-5]],'blue',.86,.7);H.dot(head[0]+3,head[1],1,'blue');
  const elbow=[(chest[0]+hand[0])/2-4,(chest[1]+hand[1])/2+9];H.line(R,[[chest[0]-8,chest[1]+4],elbow,hand],'blue',6);H.line(R,[[chest[0]-8,chest[1]+4],elbow,hand],'coral',4.2);oval(H,R,...hand,2.7,2.3,'coral',.44);
  const greet=ease(6.4,7.2,u)*(1-ease(9.1,9.6,u)),other=[chest[0]+17,chest[1]+18-greet*19];H.line(R,[[chest[0]+8,chest[1]+4],[chest[0]+19,chest[1]+15],other],'blue',5.7);H.line(R,[[chest[0]+8,chest[1]+4],[chest[0]+19,chest[1]+15],other],'coral',4);oval(H,R,...other,2.5,2.7,'coral',.4);
  const p=H.p(.65,10.18,1.15);stroke(H,R,[[p[0]+8,p[1]-37],[p[0]+18+Math.sin(u*Math.PI/8)*1.3,p[1]-18],[p[0]+14,p[1]-8]],'blue',1.2);
});
room.loopSeconds=16;
room.stillTime=8;
export default room;
