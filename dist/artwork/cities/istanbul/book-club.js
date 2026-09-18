import { world, box, shape, oval, stroke, ell } from '../../worlds/common.js';
import { timber, metal, bentTube, cushion, benchFrame, caneChair, spokedWheel, floorLight } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, cornice, radiator, wallRack, taskLight } from '../joinery.js';
const smooth=x=>{const v=Math.max(0,Math.min(1,x));return v*v*(3-2*v);};
function reader(H,R,i,j,hands,ink,lean=0,scale=1){
 const [x,y]=H.p(i,j),P=(a,b)=>[x+a*scale,y+b*scale],face=(a,b)=>P(a+lean,b);
 oval(H,R,x+4,y+2,16*scale,4*scale,'blue',.2);
 for(const s of [-1,1]){stroke(H,R,[P(s*6,-23),P(s*12,-14),P(s*14,0)],'blue',7*scale);oval(H,R,...P(s*14+3,0),7*scale,3*scale,'blue',.8);}
 shape(H,R,[face(-11,-43),face(10,-43),P(12,-21),P(-10,-21)],ink,.61);
 if(ink==='coral')shape(H,R,[face(-8,-44),face(9,-44),face(6,-39),face(1,-38),face(4,-22),face(-2,-22),face(-4,-40)],'teal',.62);
 oval(H,R,...face(0,-55),8.5*scale,10*scale,'paper',1);
 shape(H,R,[face(-8,-54),face(-8,-63),face(-2,-66),face(6,-64),face(9,-59),face(1,-60)],'blue',.8);
 H.dot(...face(4,-55),1.1*scale,'blue');
 for(const [n,p]of hands.entries()){const q=face(n?9:-9,-39),el=[(q[0]+p[0])*.5,(q[1]+p[1])*.5+7*scale];stroke(H,R,[q,el,p],'blue',7*scale);stroke(H,R,[q,el,p],ink,5*scale);oval(H,R,...p,3*scale,2.7*scale,'paper',1);}
}
function smallBook(H,R,i,j,z,w,h,ink){
 box(H,R,i,j,w,.45,z,h,ink,.62);shape(H,R,H.faceJ(i+w+.004,j+.045,.36,z+.05,z+h-.05),'paper',1,.45);
 for(const zz of [z+.13,z+h-.14])H.line(R,[H.p(i+.035,j+.46,zz),H.p(i+w-.025,j+.46,zz)],ink==='sun'?'coral':'sun',1);
}
const room=world('istanbul-book-club','The page faces everyone',{wall:false,floor:'paper',tone:.85,head:22},(H,R)=>{
 for(let i=0;i<12;i++)for(let j=0;j<12;j++)if(i<1||j<1||i>10||j>10){shape(H,R,H.tile(i+.02,j+.02,.96,.96,.025),(i+j)%2?'teal':'paper',(i+j)%2?.25:1,.5);const p=H.p(i+.5,j+.5,.03);shape(H,R,[[p[0],p[1]-5],[p[0]+8,p[1]],[p[0],p[1]+5],[p[0]-8,p[1]]],'coral',.33,.45);}
 masonry(H,R,'ne',0,12,0,3.84,'teal',.28);masonry(H,R,'nw',0,12,0,3.65,'paper',.9);
 const mat=H.tile(3.14,4.36,5.17,4.87,.03);shape(H,R,mat,'sun',.11,.6);H.outline(R,H.tile(3.3,4.54,4.86,4.53,.04),'coral',1,{tone:.38});
 cornice(H,R,'ne',0,12,3.82,'sun');cornice(H,R,'nw',0,12,3.64,'sun');
 windowBay(H,R,'nw',3,6.5,1.77,1.4,{ink:'teal',divisions:4});
 for(const j of [3.12,9.31])for(const z of [1.95,2.84])metal(H,R,.42,j,.09,.17,z,.15,'sun');
 radiator(H,R,'nw',3.25,2.57,.98);
 timber(H,R,.57,2.72,1.01,4.71,1.15,.15,'sun');
 for(const j of [2.89,5.15,7.19]){
   timber(H,R,.69,j,.18,.18,.06,1.1,'teal');timber(H,R,1.31,j,.18,.18,.06,1.1,'teal');
   stroke(H,R,[H.p(.68,j,.75),H.p(1.39,j,1.14)],'teal',2.2);
 }
 timber(H,R,.71,5.94,.78,1.19,.24,.09,'teal');
 for(let n=0;n<4;n++){
   box(H,R,.77,6.07+n*.22,.63,.16,.35,.44,['coral','teal','sun','paper'][n],n===3?1:.6);
   H.line(R,[H.p(1.42,6.09+n*.22,.41),H.p(1.42,6.19+n*.22,.41)],'sun',1);
 }
 cushion(H,R,.66,4.52,.83,1.09,1.31,.11,'teal');
 shape(H,R,H.tile(.76,4.66,.65,.75,1.44),'paper',1);H.line(R,[H.p(1.08,4.69,1.45),H.p(1.08,5.36,1.45)],'blue',.8);
 for(let n=0;n<3;n++)H.line(R,[H.p(.82,4.79+n*.15,1.45),H.p(1.02,4.79+n*.15,1.45)],'coral',.7);
 const phones=H.p(1.02,3.39,1.33);stroke(H,R,[[phones[0]-12,phones[1]-5],[phones[0]-12,phones[1]-19],[phones[0],phones[1]-24],[phones[0]+12,phones[1]-19],[phones[0]+12,phones[1]-5]],'teal',3.5);for(const d of [-11,11])oval(H,R,phones[0]+d,phones[1]-5,5,7,'blue',.7);
 stroke(H,R,[[phones[0]+12,phones[1]+1],[phones[0]+19,phones[1]+9],[phones[0]+7,phones[1]+12]],'coral',.8);
 const cup=H.p(1.04,5.93,1.31);oval(H,R,...cup,8,3,'paper',1);shape(H,R,[[cup[0]-5,cup[1]-1],[cup[0]+5,cup[1]-1],[cup[0]+4,cup[1]-12],[cup[0]-4,cup[1]-12]],'sun',.65);oval(H,R,cup[0],cup[1]-12,4,2,'blue',.6);stroke(H,R,[[cup[0]+5,cup[1]-11],[cup[0]+10,cup[1]-9],[cup[0]+9,cup[1]-3],[cup[0]+5,cup[1]-3]],'blue',.8);
 for(const j of [2.55,9.53]){const P=(a,z)=>H.p(.34+a,j,z);shape(H,R,[P(0,3.4),P(.14,3.4),P(.21,1.13),P(-.08,1.13)],'coral',.35);stroke(H,R,[P(.03,3.3),P(.09,2.19),P(.03,1.16)],'paper',1.3);}
 cabinetFrame(H,R,1.25,.68,10.17,1.24,.13,3.29,5,'sun',(i,j,w,d,z,h,n)=>{
   for(const zz of [.73,1.52,2.27])timber(H,R,i,j,w,d,z+zz,.09,'sun');
   for(let row=0;row<4;row++){
     const zz=z+.1+[0,.79,1.58,2.33][row];
     if(n===3&&row===0){box(H,R,i+.07,j+.1,w-.16,.76,zz,.49,'teal',.6);metal(H,R,i+.72,j+.89,.36,.07,zz+.27,.07,'sun');continue;}
     if(n===4&&row===0){cushion(H,R,i+.09,j+.1,w-.22,.71,zz,.12,'paper');cushion(H,R,i+.09,j+.1,w-.22,.71,zz+.14,.12,'coral');continue;}
     if((row+n)%4===1){
       for(let a=0;a<3;a++){box(H,R,i+.16+a*.026,j+.14,w*.63,.64,zz+a*.12,.085,['teal','paper','coral'][a],.55);H.line(R,[H.p(i+.22,j+.79,zz+a*.12+.035),H.p(i+w*.62,j+.79,zz+a*.12+.035)],'paper',.65);}
       smallBook(H,R,i+w-.47,j+.2,zz,.23,.57,'sun');
     }else if((row+n)%5===2){
       const f=H.faceI(i+.22,j+.86,w-.42,zz,zz+.55);shape(H,R,f,'paper',1);const p=H.p(i+w*.5,j+.87,zz+.25);oval(H,R,...p,9,9,'teal',.4);shape(H,R,[[p[0]-10,p[1]+6],[p[0]+11,p[1]+6],[p[0]+3,p[1]-10]],'coral',.45);
     }else{
       for(let a=0;a<7;a++)smallBook(H,R,i+.12+a*.22,j+.34,zz,.16,.46+(a%3)*.055,['teal','coral','paper','sun'][(a+n+row)%4]);
     }
   }
 });
 for(const i of [1.36,3.4,5.43,7.48,9.52]){
   shape(H,R,H.faceI(i,1.96,1.76,.19,.48),'teal',.5);
   shape(H,R,H.faceI(i+.13,1.98,1.5,.24,.42),'sun',.25);
   stroke(H,R,[H.p(i+.64,2.01,.33),H.p(i+1.07,2.01,.33)],'blue',1.6);
 }
 for(const i of [1.32,5.43,9.51,11.3]){
   shape(H,R,[H.p(i,1.95,3.36),H.p(i+.3,1.95,3.36),H.p(i,1.95,3.08)],'teal',.6);
 }
 timber(H,R,1.15,.62,10.38,1.34,3.42,.15,'sun');
 const globe=H.p(3.08,1.18,3.58);oval(H,R,globe[0],globe[1]-18,15,15,'teal',.4);stroke(H,R,[[globe[0]-5,globe[1]-6],[globe[0]+2,globe[1]+1],[globe[0]+7,globe[1]-5]],'sun',2);oval(H,R,globe[0]+8,globe[1]-20,2,2,'coral',.8);for(const n of [-1,0,1])stroke(H,R,[[globe[0]-12,globe[1]-18+n*6],[globe[0],globe[1]-16+n*6],[globe[0]+12,globe[1]-18+n*6]],'paper',.65);
 for(let n=0;n<7;n++){const i=4.75+n*.35,h=.22+(n%3)*.11;box(H,R,i,1.02,.27,.13,3.58,h,'paper',1);shape(H,R,[H.p(i,1.16,3.58+h),H.p(i+.13,1.16,3.7+h),H.p(i+.27,1.16,3.58+h)],'coral',.3);}
 for(const n of [0,1]){
   const i=7.51+n*.58;
   shape(H,R,H.faceI(i,1.46,.47,3.58,4.03),'paper',1);shape(H,R,H.faceI(i+.04,1.48,.39,3.62,3.99),n?'coral':'teal',.3);
   H.line(R,[H.p(i+.07,1.5,3.77),H.p(i+.34,1.5,3.84)],'sun',1.5);
 }
 const bird=H.p(9.22,1.2,3.65);shape(H,R,[[bird[0]-13,bird[1]],[bird[0]-3,bird[1]-9],[bird[0]+5,bird[1]-5],[bird[0]+11,bird[1]-7],[bird[0]+8,bird[1]+1],[bird[0]-5,bird[1]+4]],'teal',.65);stroke(H,R,[[bird[0]-3,bird[1]+3],[bird[0]-3,bird[1]+10]],'blue',.8);
 const cat=H.p(10.72,1.96,2.89);shape(H,R,[[cat[0]-6,cat[1]+4],[cat[0]-7,cat[1]-7],[cat[0]-2,cat[1]-3],[cat[0]+4,cat[1]-7],[cat[0]+6,cat[1]+4]],'paper',1);H.dot(cat[0]-2,cat[1],1,'blue');H.dot(cat[0]+3,cat[1],1,'blue');
 for(const j of [3.1,4.5,5.9]){const p=H.p(.48,j,1.43);stroke(H,R,[[p[0],p[1]-9],[p[0],p[1]],[p[0]+5,p[1]+3]],'blue',1.5);}
 benchFrame(H,R,1.02,6.65,2.4,1.43,.48,'teal');cushion(H,R,1.15,6.8,2.1,1.1,.49,.13,'paper');
 wallRack(H,R,'nw',9.91,1.61,1.3,1.76,2,'sun',(P,z,row)=>{
   for(let n=0;n<2;n++){
     const u=.19+n*.65;
     shape(H,R,[P(u,z+.05),P(u+.51,z+.05),P(u+.51,z+.65),P(u,z+.65)],'paper',1);
     const q=P(u+.26,z+.38);shape(H,R,[[q[0]-7,q[1]+5],[q[0]+7,q[1]+5],[q[0]+2,q[1]-8]],row?'teal':'coral',.6);
   }
 });
 caneChair(H,R,7.72,4.75,'sun');cushion(H,R,7.76,4.93,.84,.6,.68,.11,'paper');
 caneChair(H,R,3.04,7.52,'sun',true);cushion(H,R,3.08,7.65,.83,.67,.68,.12,'teal');
 benchFrame(H,R,6.15,9.4,1.16,1,.44,'sun');cushion(H,R,6.26,9.52,.93,.77,.45,.12,'paper');
 box(H,R,6.21,9.44,.1,.68,.13,.21,'teal',.6);smallBook(H,R,6.25,9.5,.17,.11,.39,'coral');
 cushion(H,R,4.3,9.42,1.27,1.09,.05,.18,'coral');
 for(const [i,j]of [[4.98,7.77],[7.22,8.17],[7.58,5.87]]){
   const q=H.p(i,j,.045);oval(H,R,...q,9,4,'blue',.65);
   bentTube(H,R,[[6.34,6.67,.43],[(i+6.34)*.5,(j+6.67)*.5,.23],[i,j,.11]],4,'teal');
   oval(H,R,...H.p(i,j,.1),5,2.5,'sun',.75);
 }
 const hub=H.p(6.34,6.67,.22);oval(H,R,...hub,11,5,'teal',.6);oval(H,R,hub[0],hub[1]-6,8,4,'sun',.6);
 metal(H,R,6.25,6.57,.19,.19,.15,1.08,'teal');
 for(const z of [.46,.88]){const p=H.p(6.34,6.67,z);oval(H,R,...p,5,2,'sun',.75);}
 metal(H,R,6.45,6.57,.26,.14,.78,.11,'sun');
 const lampBase=H.p(9.3,4.07,.06);oval(H,R,...lampBase,17,6,'teal',.55);bentTube(H,R,[[9.3,4.07,.1],[9.3,4.07,2.62],[8.35,4.75,2.83],[7.61,5.2,2.61]],3,'teal');
 const lamp=H.p(7.61,5.2,2.59);shape(H,R,[[lamp[0]-13,lamp[1]+5],[lamp[0]+13,lamp[1]+5],[lamp[0]+6,lamp[1]-11],[lamp[0]-5,lamp[1]-11]],'coral',.65);oval(H,R,lamp[0],lamp[1]+5,12,4,'paper',1);
 benchFrame(H,R,9.72,2.81,1.69,1.37,1.02,'sun');
 timber(H,R,9.83,3.01,1.44,1.02,.31,.09,'teal');
 for(let n=0;n<3;n++)box(H,R,9.96,3.1+n*.23,.97,.16,.41,.26,['paper','coral','teal'][n],n===0?1:.45);
 timber(H,R,9.89,3.02,1.25,.86,1.04,.075,'teal');
 for(const i of [9.96,10.9])metal(H,R,i,3.11,.07,.08,1.1,.64,'blue');
 timber(H,R,9.87,3.03,1.33,.84,1.35,.09,'sun');
 for(const i of [9.99,10.93]){
   const q=H.p(i,3.13,1.61);oval(H,R,...q,6,3,'teal',.6);stroke(H,R,[[q[0]-8,q[1]-4],[q[0]+8,q[1]-4]],'coral',2);stroke(H,R,[[q[0],q[1]-11],[q[0],q[1]+3]],'blue',1.2);
 }
 for(let n=0;n<3;n++)box(H,R,10.12+n*.012,3.14,.71,.58,1.13+n*.061,.048,n===1?'paper':'coral',n===1?1:.6);
 const brush=H.p(11.03,3.93,1.07);stroke(H,R,[[brush[0],brush[1]],[brush[0]+9,brush[1]-9]],'sun',2);for(let n=0;n<4;n++)stroke(H,R,[[brush[0]-5+n*2,brush[1]+3],[brush[0]-2+n*1.1,brush[1]-1]],'teal',1);
 const tape=H.p(9.96,3.94,1.06);oval(H,R,...tape,7,4,'sun',.6);oval(H,R,...tape,3.3,2,'paper',1);
 shape(H,R,[H.p(11.38,3.24,1.06),H.p(11.38,3.91,1.06),H.p(11.43,3.91,.64),H.p(11.43,3.24,.66)],'paper',1);
 taskLight(H,R,11.21,2.93,1.07,'teal',-.16);
 benchFrame(H,R,9.18,8.43,1.83,1.37,.94,'teal');timber(H,R,9.22,8.48,1.75,1.24,.28,.1,'teal');
 for(const i of [9.28,10.78])for(const j of [8.54,9.56]){const p=H.p(i,j,.08);spokedWheel(H,R,p[0],p[1],4,'blue',0,1);}
 for(let n=0;n<4;n++)box(H,R,9.35+n*.03,8.63,1.12,.73,.95+n*.105,.08,['teal','paper','coral','sun'][n],.6);
 box(H,R,9.33,8.7,1.1,.62,.39,.34,'paper',.8);stroke(H,R,[H.p(10.67,8.58,.99),H.p(10.71,8.58,1.42),H.p(9.38,8.58,1.42)],'teal',2);
 benchFrame(H,R,2.52,10.44,3.41,.91,.38,'sun');
 shape(H,R,H.faceI(2.61,11.31,3.17,.1,.38),'teal',.5);
 for(const i of [2.7,3.71,4.72]){
   shape(H,R,H.faceI(i,11.34,.85,.15,.32),'sun',.35);H.dot(...H.p(i+.43,11.36,.25),1.5,'blue');
 }
 box(H,R,2.56,10.47,.67,.75,.4,.09,'teal',.5);
 shape(H,R,H.faceI(2.54,10.46,.72,.49,1.25),'sun',.6);
 shape(H,R,H.faceI(2.63,10.48,.54,.59,1.12),'paper',1);
 const moon=H.p(2.91,10.49,.89);oval(H,R,...moon,8,7,'teal',.3);oval(H,R,moon[0]+3,moon[1]-2,6,6,'paper',1);

 const puppet=H.p(2.96,10.84,.43);shape(H,R,[[puppet[0]-6,puppet[1]+3],[puppet[0]-7,puppet[1]-13],[puppet[0]-1,puppet[1]-9],[puppet[0]+5,puppet[1]-14],[puppet[0]+8,puppet[1]+3]],'coral',.65);H.dot(puppet[0]+1,puppet[1]-4,1,'blue');
 cushion(H,R,3.46,10.62,.64,.58,.4,.07,'teal');metal(H,R,4.38,10.61,.28,.49,.39,.19,'sun');
 const mirror=H.p(5.07,10.88,.43);oval(H,R,...mirror,9,6,'sun',.75);oval(H,R,...mirror,6,4,'paper',1);
 for(const i of [3.53,3.68,3.83,3.98])H.line(R,[H.p(i,10.64,.48),H.p(i,11.14,.48)],'paper',.8);
 for(let n=0;n<3;n++)box(H,R,5.48+n*.025,10.6, .3,.39,.39+n*.13,.11,['teal','coral','paper'][n],n===2?1:.55);
 const shapeBlock=H.p(4.63,10.87,.43);shape(H,R,[[shapeBlock[0]-8,shapeBlock[1]],[shapeBlock[0]+8,shapeBlock[1]],[shapeBlock[0]+2,shapeBlock[1]-15],[shapeBlock[0]-6,shapeBlock[1]-11]],'coral',.6);
 for(let n=0;n<9;n++)H.line(R,[H.p(3.2+n*.53,9.0,.04),H.p(3.2+n*.53,9.24,.04)],'sun',1.2);
 box(H,R,10.11,10.18,1.06,.68,.025,.32,'paper',1);
 shape(H,R,H.faceI(10.24,10.89,.79,.1,.26),'teal',.3);
 stroke(H,R,[H.p(10.39,10.63,.36),H.p(10.39,10.63,.68),H.p(10.91,10.63,.68),H.p(10.91,10.63,.36)],'coral',1.8);
 for(let n=0;n<3;n++)box(H,R,10.28+n*.23,10.31,.16,.4,.36,.19+n*.06,['sun','teal','coral'][n],.5);
 floorLight(H,6.32,6.83,144,.43);
},(H,R,time)=>{
 const u=((time%24)+24)%24,p=smooth((u-4.8)/4.8)*(1-smooth((u-14.4)/7.6)),a=-.63*p;
 const Q=(x,y,z=0)=>H.p(6.34+x*Math.cos(a)-y*Math.sin(a),6.67+x*Math.sin(a)+y*Math.cos(a),z);
 const B=(x,y)=>Q(x,y,1.41-y*.42);
 for(const x of [-1.46,1.46])stroke(H,R,[Q(0,0,1.13),Q(x,.54,1.16),Q(x,-.64,1.68)],'sun',3.5);
 stroke(H,R,[Q(-1.42,.57,1.13),Q(1.42,.57,1.13)],'teal',3.2);
 for(const x of [-.71,.71]){
   stroke(H,R,[Q(x,.5,1.11),Q(x,-.4,1.54)],'teal',2.6);
   const q=Q(x,.5,1.16);oval(H,R,...q,4,3,'sun',.8);H.dot(...q,1.4,'blue');
 }
 const bearing=Q(0,0,1.14);oval(H,R,...bearing,9,4,'blue',.6);oval(H,R,bearing[0],bearing[1]-4,7,3,'sun',.7);

 shape(H,R,[B(-1.55,-.86),B(1.55,-.86),B(1.55,.92),B(-1.55,.92)],'teal',.6);
 for(const x of [-1.4,1.4])stroke(H,R,[B(x,-.7),B(x,.79)],'coral',3);
 stroke(H,R,[B(-1.49,.9),B(1.49,.9)],'sun',4.3);
 for(const x of [-1.45,1.45])for(const y of [-.73,.76]){const q=B(x,y);oval(H,R,...q,4,2,'paper',1);H.dot(...q,1.2,'teal');}
 for(const y of [-.8,-.84])stroke(H,R,[B(-1.35,y),B(-.05,y),B(.05,y),B(1.35,y)],'sun',.8);

 shape(H,R,[B(-1.34,-.73),B(-.05,-.77),B(-.05,.81),B(-1.34,.84)],'paper',1);
 shape(H,R,[B(.05,-.77),B(1.34,-.73),B(1.34,.84),B(.05,.81)],'paper',1);
 stroke(H,R,[B(0,-.78),B(0,.83)],'blue',1.2);
 for(const y of [.81,.85,.89])stroke(H,R,[B(-1.36,y),B(-.04,y),B(.03,y),B(1.37,y)],'blue',.55,.65);
 shape(H,R,[B(-1.1,-.32),B(-.65,-.62),B(-.23,-.29),B(-.4,.43),B(-1.02,.47)],'teal',.28);
 stroke(H,R,[B(-.66,.47),B(-.68,-.26),B(-.99,-.07),B(-.68,-.26),B(-.38,-.46)],'teal',1.8);
 const fox=[B(.39,.43),B(.25,-.18),B(.45,-.04),B(.75,-.33),B(.88,-.04),B(1.09,.1),B(.83,.44)];shape(H,R,fox,'coral',.66);
 oval(H,R,...B(.62,.03),1.5,1.3,'blue',1);oval(H,R,...B(.82,.04),1.5,1.3,'blue',1);
 stroke(H,R,[B(-.98,.58),B(-.76,.54),B(-.51,.59)],'sun',2);
 const bookmark=[B(-1.08,.8),B(-.9,.8),Q(-.88,1.17,.88),Q(-1.05,1.18,.88)];shape(H,R,bookmark,'coral',.6);
 const contact=smooth((u-.4)/2)*(1-smooth((u-20.4)/1.6)),target=B(1.45,.25),rest=H.p(8.07,5.88,1.02),hand=[rest[0]+(target[0]-rest[0])*contact,rest[1]+(target[1]-rest[1])*contact];
 reader(H,R,8.13,5.64,[B(1.41,-.46),hand],'teal',-p*2);
 const lean=smooth((u-7.7)/2.3)*(1-smooth((u-15.3)/2.2));reader(H,R,3.5,8.14,[H.p(3.99,8.23,.89),H.p(3.81,8.35,.89)],'coral',lean*3);
 reader(H,R,6.79,10.08,[H.p(6.73,9.8,.79),H.p(7.03,9.82,.81)],'sun',-lean*2,.73);
 const corner=Math.sin(u*Math.PI/12)*.018;shape(H,R,[B(1.05,.62),B(1.34,.62),Q(1.34,.84,1.41-.84*.42+corner)],'sun',.25);
 const strap=.02*Math.sin(u*Math.PI/12);stroke(H,R,[H.p(.52,5.86,1.4),H.p(.77+strap,5.95,.92),H.p(.88,5.89,1.39)],'coral',1.4);shape(H,R,[H.p(.69,5.61,.52),H.p(.69,6.31,.52),H.p(.82,6.31,1.02),H.p(.82,5.61,1.02)],'teal',.6);
});
room.loopSeconds=24;
room.stillTime=12;
export default room;
