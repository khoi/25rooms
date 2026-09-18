import { world, box, shape, oval, stroke, ell } from '../../worlds/common.js';
import { timber, metal, bentTube, cushion, benchFrame, caneChair, spokedWheel, floorLight } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, cornice } from '../joinery.js';
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
 timber(H,R,1.15,.62,10.38,1.34,3.42,.15,'sun');
 const globe=H.p(3.08,1.18,3.58);oval(H,R,globe[0],globe[1]-18,15,15,'teal',.4);stroke(H,R,[[globe[0]-5,globe[1]-6],[globe[0]+2,globe[1]+1],[globe[0]+7,globe[1]-5]],'sun',2);oval(H,R,globe[0]+8,globe[1]-20,2,2,'coral',.8);for(const n of [-1,0,1])stroke(H,R,[[globe[0]-12,globe[1]-18+n*6],[globe[0],globe[1]-16+n*6],[globe[0]+12,globe[1]-18+n*6]],'paper',.65);
 for(let n=0;n<7;n++){const i=4.75+n*.35,h=.22+(n%3)*.11;box(H,R,i,1.02,.27,.13,3.58,h,'paper',1);shape(H,R,[H.p(i,1.16,3.58+h),H.p(i+.13,1.16,3.7+h),H.p(i+.27,1.16,3.58+h)],'coral',.3);}
 const bird=H.p(9.22,1.2,3.65);shape(H,R,[[bird[0]-13,bird[1]],[bird[0]-3,bird[1]-9],[bird[0]+5,bird[1]-5],[bird[0]+11,bird[1]-7],[bird[0]+8,bird[1]+1],[bird[0]-5,bird[1]+4]],'teal',.65);stroke(H,R,[[bird[0]-3,bird[1]+3],[bird[0]-3,bird[1]+10]],'blue',.8);
 const cat=H.p(10.72,1.96,2.89);shape(H,R,[[cat[0]-6,cat[1]+4],[cat[0]-7,cat[1]-7],[cat[0]-2,cat[1]-3],[cat[0]+4,cat[1]-7],[cat[0]+6,cat[1]+4]],'paper',1);H.dot(cat[0]-2,cat[1],1,'blue');H.dot(cat[0]+3,cat[1],1,'blue');
 for(const j of [3.1,4.5,5.9]){const p=H.p(.48,j,1.43);stroke(H,R,[[p[0],p[1]-9],[p[0],p[1]],[p[0]+5,p[1]+3]],'blue',1.5);}
 benchFrame(H,R,1.02,6.65,2.4,1.43,.48,'teal');cushion(H,R,1.15,6.8,2.1,1.1,.49,.13,'paper');
 caneChair(H,R,7.72,4.75,'sun');cushion(H,R,7.76,4.93,.84,.6,.68,.11,'paper');
 caneChair(H,R,3.04,7.52,'sun',true);cushion(H,R,3.08,7.65,.83,.67,.68,.12,'teal');
 benchFrame(H,R,6.15,9.4,1.16,1,.44,'sun');cushion(H,R,6.26,9.52,.93,.77,.45,.12,'paper');
 box(H,R,6.21,9.44,.1,.68,.13,.21,'teal',.6);smallBook(H,R,6.25,9.5,.17,.11,.39,'coral');
 cushion(H,R,4.3,9.42,1.27,1.09,.05,.18,'coral');
 metal(H,R,5.6,6.02,1.46,1.39,.04,.07,'teal');
 for(const [i,j]of [[5.72,6.17],[6.81,6.17],[5.72,7.24],[6.81,7.24]])metal(H,R,i,j,.15,.15,.11,.08,'blue');
 metal(H,R,6.25,6.57,.19,.19,.15,1.08,'teal');
 for(const z of [.46,.88]){const p=H.p(6.34,6.67,z);oval(H,R,...p,5,2,'sun',.75);}
 metal(H,R,6.45,6.57,.26,.14,.78,.11,'sun');
 const lampBase=H.p(9.3,4.07,.06);oval(H,R,...lampBase,17,6,'teal',.55);bentTube(H,R,[[9.3,4.07,.1],[9.3,4.07,2.62],[8.35,4.75,2.83],[7.61,5.2,2.61]],3,'teal');
 const lamp=H.p(7.61,5.2,2.59);shape(H,R,[[lamp[0]-13,lamp[1]+5],[lamp[0]+13,lamp[1]+5],[lamp[0]+6,lamp[1]-11],[lamp[0]-5,lamp[1]-11]],'coral',.65);oval(H,R,lamp[0],lamp[1]+5,12,4,'paper',1);
 benchFrame(H,R,9.18,8.43,1.83,1.37,.94,'teal');timber(H,R,9.22,8.48,1.75,1.24,.28,.1,'teal');
 for(const i of [9.28,10.78])for(const j of [8.54,9.56]){const p=H.p(i,j,.08);spokedWheel(H,R,p[0],p[1],4,'blue',0,1);}
 for(let n=0;n<4;n++)box(H,R,9.35+n*.03,8.63,1.12,.73,.95+n*.105,.08,['teal','paper','coral','sun'][n],.6);
 box(H,R,9.33,8.7,1.1,.62,.39,.34,'paper',.8);stroke(H,R,[H.p(10.67,8.58,.99),H.p(10.71,8.58,1.42),H.p(9.38,8.58,1.42)],'teal',2);
 benchFrame(H,R,2.52,10.44,3.41,.91,.38,'sun');
 const puppet=H.p(2.96,10.84,.43);shape(H,R,[[puppet[0]-6,puppet[1]+3],[puppet[0]-7,puppet[1]-13],[puppet[0]-1,puppet[1]-9],[puppet[0]+5,puppet[1]-14],[puppet[0]+8,puppet[1]+3]],'coral',.65);H.dot(puppet[0]+1,puppet[1]-4,1,'blue');
 cushion(H,R,3.46,10.62,.64,.58,.4,.07,'teal');metal(H,R,4.38,10.61,.28,.49,.39,.19,'sun');
 const mirror=H.p(5.07,10.88,.43);oval(H,R,...mirror,9,6,'sun',.75);oval(H,R,...mirror,6,4,'paper',1);
 floorLight(H,6.32,6.83,144,.43);
},(H,R,time)=>{
 const u=((time%24)+24)%24,p=smooth((u-4.8)/4.8)*(1-smooth((u-14.4)/7.6)),a=-.63*p;
 const Q=(x,y,z=0)=>H.p(6.34+x*Math.cos(a)-y*Math.sin(a),6.67+x*Math.sin(a)+y*Math.cos(a),z);
 const B=(x,y)=>Q(x,y,1.41-y*.42);
 for(const x of [-1.46,1.46])stroke(H,R,[Q(0,0,1.13),Q(x,.54,1.16),Q(x,-.64,1.68)],'sun',3.5);
 shape(H,R,[B(-1.55,-.86),B(1.55,-.86),B(1.55,.92),B(-1.55,.92)],'teal',.6);
 for(const x of [-1.4,1.4])stroke(H,R,[B(x,-.7),B(x,.79)],'coral',3);
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
