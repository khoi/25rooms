import { world, shape, oval, stroke, box, ell, actor, TAU } from '../../worlds/common.js';
import { timber, metal, bentTube, drape, vessel, floorLight } from '../materials.js';
import { boardFloor, cabinetFrame } from '../structure.js';
import { panelFront, taskLight } from '../joinery.js';
import { hands } from './umbrella-ribs.js';
const ease=x=>{const q=Math.max(0,Math.min(1,x));return q*q*(3-2*q);};
function rope(H,R,pts,ink='sun',w=2.8){stroke(H,R,pts,'blue',w+1.1);stroke(H,R,pts,ink,w);for(let n=1;n<pts.length-1;n+=2)H.line(R,[[pts[n][0]-1.2,pts[n][1]-1.2],[pts[n][0]+1.2,pts[n][1]+1.2]],'blue',.45);}
function cleat(H,R,i,j,z,small=false){metal(H,R,i-.29,j-.22,.58,.44,z,.07,'blue');const p=H.p(i,j,z+.11);H.line(R,[[p[0],p[1]],[p[0],p[1]-7]],'blue',5);stroke(H,R,[[p[0]-13,p[1]-12],[p[0]-9,p[1]-6],[p[0]+9,p[1]-6],[p[0]+14,p[1]-11]],small?'blue':'sun',4);for(const x of [-6,6])H.dot(p[0]+x,p[1]+1,1.3,'sun');}
const room=world('london-canal-line','A loop over the cleat',{wall:false,floor:'teal',tone:.16,head:65},(H,R)=>{
 shape(H,R,H.tile(.1,.1,11.8,2.1,.015),'teal',.43);
 for(let n=0;n<15;n++)H.line(R,[H.p(.4+n*.76,.7+(n%3)*.35,.02),H.p(.82+n*.76,.7+(n%3)*.35,.02)],'paper',1.2,{tone:.65});
 boardFloor(H,R,0,2.25,12,9.75,.11,'sun',.52);
 timber(H,R,0,2.18,12,.24,.06,.25,'teal');
 for(const i of [.3,3.4,7.85,11.72]) {metal(H,R,i,1.94,.15,.2,.14,2.93,'teal');metal(H,R,i-.08,1.86,.31,.36,.12,.14,'blue');}
 bentTube(H,R,[[.35,1.98,1.65],[3.6,1.8,1.83],[7.7,1.87,1.75],[11.77,1.98,1.64]],3.4,'teal');
 bentTube(H,R,[[.35,1.98,3.05],[6.3,1.98,3.3],[11.77,1.98,3.05]],4,'blue');
 for(let n=0;n<12;n++) H.line(R,[H.p(.55+n*.94,1.9,3.04),H.p(.55+n*.94,1.65,3.23)],'sun',1.3);
 const hull=[H.p(.45,.13,.42),H.p(6.88,.13,.42),H.p(6.65,2.6,.42),H.p(1,2.6,.42)];shape(H,R,hull,'blue',.72);
 shape(H,R,H.faceI(.9,2.57,5.8,.45,2.51),'teal',.54);
 for(const i of [1.04,6.55])metal(H,R,i,2.57,.13,.15,.47,2.02,'blue');
 const roof=[];for(let n=0;n<=10;n++){const j=.1+n*.247;roof.push(H.p(.88,j,2.52+.26*Math.sin(n*Math.PI/10)));}for(let n=10;n>=0;n--){const j=.1+n*.247;roof.push(H.p(6.72,j,2.52+.26*Math.sin(n*Math.PI/10)));}shape(H,R,roof,'paper',1);
 for(const i of [1.16,2.28,3.4,4.52,5.64,6.5]){const seam=[];for(let n=0;n<=12;n++){const j=.13+n*.197;seam.push(H.p(i,j,2.55+.25*Math.sin(n*Math.PI/12)));}H.line(R,seam,'teal',1.2);}
 metal(H,R,2.36,.61,1.78,1.19,2.79,.1,'teal');shape(H,R,H.tile(2.52,.73,1.46,.91,2.91),'blue',.6);
 for(const i of [2.65,3.37])shape(H,R,H.tile(i,.83,.55,.68,2.93),'paper',1);
 H.line(R,[H.p(3.32,.73,2.96),H.p(3.32,1.64,2.96)],'sun',2.4);
 const chimney=H.p(5.51,1.02,2.79);vessel(H,R,5.51,1.02,2.78,7,21,'blue',false);oval(H,R,chimney[0],chimney[1]-23,11,4,'teal',.75);H.line(R,[[chimney[0]-8,chimney[1]-21],[chimney[0]+8,chimney[1]-21]],'paper',1.2);
 for(const i of [1.13,6.46])bentTube(H,R,[[i,.22,2.67],[i,.22,2.96],[i,2.2,2.96],[i,2.2,2.67]],1.9,'sun');
 metal(H,R,1.0,2.61,5.64,.11,.43,.1,'blue');
 for(const z of [.57,2.34])H.line(R,[H.p(1.11,2.73,z),H.p(6.53,2.73,z)],'sun',1.4);
 for(const i of [2.63,4.22,6.24])H.line(R,[H.p(i,2.7,.66),H.p(i,2.7,2.29)],'blue',.9);
 shape(H,R,H.faceI(1.3,2.6,1.18,.7,2.18),'blue',.8);shape(H,R,H.faceI(1.45,2.62,.88,.91,1.94),'sun',.22);
 H.line(R,[H.p(1.56,2.64,1.1),H.p(1.56,2.64,1.5)],'paper',2);
 for(const i of [3.25,5.27]){const p=H.p(i,2.63,1.75);oval(H,R,...p,18,19,'sun',.65);oval(H,R,...p,13.5,14.5,'paper',1);H.line(R,[[p[0]-7,p[1]+7],[p[0]+7,p[1]-6]],'teal',2);for(let n=0;n<8;n++)H.dot(p[0]+Math.cos(n*TAU/8)*16,p[1]+Math.sin(n*TAU/8)*17,1,'blue');}
 timber(H,R,2.05,3.0,2.26,2.7,.23,.12,'sun');
 for(const i of [2.16,4.06])timber(H,R,i,3.03,.16,2.6,.13,.11,'teal');
 for(let n=0;n<7;n++)H.line(R,[H.p(2.13,3.17+n*.35,.37),H.p(4.2,3.17+n*.35,.37)],'blue',1.1);
 bentTube(H,R,[[2.13,3.11,.37],[2.13,3.11,1.54],[2.13,5.62,1.16],[2.13,5.62,.2]],2.5,'sun');
 for(const i of [2.18,4.06]){metal(H,R,i,3.12,.18,.27,.25,.2,'blue');metal(H,R,i,5.38,.18,.27,.25,.2,'blue');}
 for(const i of [2.55,3.58])H.line(R,[H.p(i,3.0,.33),H.p(i,5.68,.33)],'paper',2.3);
 timber(H,R,3.72,5.03,3.64,2.18,.13,.23,'teal');
 boardFloor(H,R,3.68,5.0,3.71,2.2,.39,'sun',.43);
 timber(H,R,3.68,7.18,3.71,.22,.12,.26,'sun');
 H.line(R,[H.p(4.6,7.43,.35),H.p(5.3,7.43,.29),H.p(5.9,7.43,.34)],'paper',2);
 shape(H,R,H.tile(4.02,5.22,.94,1.26,.405),'blue',.25);metal(H,R,4.02,5.26,.12,.12,.41,.08,'sun');
 for(const i of [3.88,7.02]){timber(H,R,i,5.17,.17,1.9,.12,.28,'blue');H.line(R,[H.p(i,5.25,.17),H.p(i,6.95,.34)],'sun',1.4);}
 shape(H,R,H.faceI(4.35,7.42,2.06,.12,.31),'blue',.5);for(let n=0;n<6;n++)H.line(R,[H.p(4.48+n*.31,7.44,.16),H.p(4.48+n*.31,7.44,.26)],'paper',.9);
 metal(H,R,5.56,5.42,1.14,.85,.4,.05,'teal');
 for(const i of [5.65,6.53])for(const j of [5.52,6.16]){const q=H.p(i,j,.46);oval(H,R,...q,2,1.2,'paper',1);}
 cleat(H,R,6.12,5.87,.42);cleat(H,R,1.0,3.38,.14,true);
 const fixed=[];for(let n=0;n<=35;n++){const a=n/35*TAU*2.7;fixed.push(H.p(1+Math.cos(a)*.3,3.36+Math.sin(a)*.2,.35+n*.001));}rope(H,R,fixed,'blue',3);rope(H,R,[H.p(1.15,3.35,.35),H.p(1.1,2.9,.6),H.p(.86,2.61,.63)],'blue',3.5);
 cabinetFrame(H,R,8.56,.29,3.07,1.76,.24,2.67,2,'teal',(i,j,w,d,z,h,n)=>{
 timber(H,R,i,j,w,d,z+1.03,.1,'sun');timber(H,R,i,j,w,d,z+1.91,.08,'sun');
 if(n===0){for(let k=0;k<3;k++){const p=H.p(i+.34+k*.32,j+.78,z+.18);oval(H,R,...p,7,18,k===1?'coral':'paper',.8);H.line(R,[[p[0],p[1]-17],[p[0],p[1]+16]],'blue',.6);}for(let k=0;k<4;k++)H.outline(R,ell(...H.p(i+.66,j+.8,z+1.19),15-k*2,7-k),'sun',1.4);drape(H,R,i+.03,j+.1,w-.08,d-.15,z+2.0,.23,'coral');}
 else{for(let k=0;k<3;k++)box(H,R,i+.03,j+.1+k*.39,w-.09,.33,z+.1,.15,k===0?'sun':'paper',.65);const p=H.p(i+.64,j+.68,z+1.25);for(let k=0;k<3;k++)H.outline(R,ell(...p,15-k*3,17-k*3),'teal',2);timber(H,R,i+.18,j+.4,.91,.37,z+2.05,.09,'sun');for(let k=0;k<4;k++)H.line(R,[H.p(i+.23+k*.21,j+.42,z+2.15),H.p(i+.23+k*.21,j+.72,z+2.15)],'blue',.6);}
 });
  panelFront(H,R,8.68,2.06,2.84,.3,.39,2,'teal');
  for(const i of [2.78,6.21]){const p=H.p(i,2.74,.69);rope(H,R,[H.p(i,2.73,1.04),[p[0],p[1]-9]],'sun',1.3);oval(H,R,p[0],p[1]+6,7,21,'paper',1);for(let n=0;n<6;n++)H.line(R,[[p[0]-5,p[1]-7+n*5],[p[0]+5,p[1]-7+n*5]],n===3?'coral':'blue',.65);}
 timber(H,R,8.42,.2,3.34,1.98,2.94,.13,'sun');
 for(const i of [8.57,11.49])bentTube(H,R,[[i,1.97,2.87],[i,2.52,2.71]],1.5,'teal');
 shape(H,R,[H.p(11.66,.61,.74),H.p(11.66,2.1,.74),H.p(11.99,2.69,2.44),H.p(11.99,1.2,2.44)],'teal',.42);
 H.line(R,[H.p(11.99,1.35,1.34),H.p(11.99,1.73,1.73)],'sun',2);
 for(let n=0;n<9;n++)H.line(R,[H.p(8.75+n*.3,2.08,.32),H.p(8.75+n*.3,2.25,.32)],'blue',1.1);
 const fender=H.p(8.12,2.14,1.4);rope(H,R,[H.p(8.1,1.98,2.8),[fender[0],fender[1]-21]],'sun',1.6);oval(H,R,...fender,12,25,'coral',.5);for(let n=0;n<8;n++)H.line(R,[[fender[0]-9,fender[1]-17+n*5],[fender[0]+9,fender[1]-17+n*5]],'paper',.8);shape(H,R,[[fender[0]-6,fender[1]-4],[fender[0]+6,fender[1]-4],[fender[0]+6,fender[1]+7],[fender[0]-6,fender[1]+7]],'teal',.8);
  const tiny=H.p(9.27,.95,3.14);
  shape(H,R,[[tiny[0]-14,tiny[1]-3],[tiny[0]+14,tiny[1]-3],[tiny[0]+7,tiny[1]+4],[tiny[0]-8,tiny[1]+4]],'sun',.7);
  shape(H,R,[[tiny[0]-6,tiny[1]-4],[tiny[0]+7,tiny[1]-4],[tiny[0]+6,tiny[1]-9],[tiny[0]-5,tiny[1]-9]],'teal',.5);
 taskLight(H,R,11.29,1.8,2.94,'sun',-.45);
 for(const j of [3.88,6.68])timber(H,R,.12,j,.16,.18,.1,2.52,'teal');
 for(const z of [.35,.96,1.58,2.2])timber(H,R,.15,3.84,.13,3.01,z,.3,'sun');
 timber(H,R,.16,3.83,.72,3.06,2.55,.1,'sun');
 for(let n=0;n<3;n++){const q=H.p(.55,4.25+n*.79,2.66);oval(H,R,...q,8,4,n===1?'coral':'teal',.7);oval(H,R,q[0],q[1]-6,6,3,'paper',1);}
 const sample=H.p(.37,5.21,1.85);rope(H,R,ell(sample[0],sample[1],15,22,32),'sun',2.2);rope(H,R,[[sample[0]+10,sample[1]+16],[sample[0]+15,sample[1]+30],[sample[0]+8,sample[1]+35]],'sun',2.2);
 timber(H,R,.18,7.35,1.6,3.14,.59,.13,'sun');for(const j of [7.45,10.22])timber(H,R,.29,j,.16,.16,.13,.47,'teal');
 drape(H,R,.27,8.98,1.37,1.2,.73,.15,'coral');
 vessel(H,R,1.0,7.86,.74,8,15,'teal',false);H.line(R,[H.p(1,7.86,1.24),H.p(1,7.86,1.59)],'blue',1);
 const splice=H.p(.84,9.34,.76);rope(H,R,[[splice[0]-17,splice[1]],[splice[0]-3,splice[1]-6],[splice[0]+14,splice[1]-2]],'sun',3);for(let n=0;n<4;n++)H.line(R,[[splice[0]-3+n*3,splice[1]-7],[splice[0]-2+n*3,splice[1]+1]],'coral',1);
 box(H,R,8.94,9.24,2.1,1.2,.13,.14,'blue',.23);for(let n=0;n<9;n++)metal(H,R,9.06+n*.2,9.38,.055,.83,.28,.04,'teal');
  vessel(H,R,6.89,6.71,.4,19,16,'sun');for(let n=0;n<6;n++)H.line(R,[H.p(6.65+n*.08,6.99,.49),H.p(6.65+n*.08,6.99,.83)],'blue',.65);
  timber(H,R,2.8,8.9,2.95,1.22,.14,.1,'teal');
  timber(H,R,2.8,8.9,2.95,.13,.24,.22,'sun');
  for(const i of [2.8,5.61])timber(H,R,i,8.9,.14,1.22,.24,.22,'sun');
  const sp=H.p(3.47,9.55,.31);rope(H,R,ell(...sp,13,6,26),'sun',2.1);H.outline(R,ell(...sp,8,4,26),'blue',1.2);
  const fid=H.p(4.79,9.52,.32);shape(H,R,[[fid[0]-18,fid[1]],[fid[0]+14,fid[1]-4],[fid[0]+19,fid[1]-2],[fid[0]+11,fid[1]+1],[fid[0]-18,fid[1]+3]],'sun',.7);
  shape(H,R,H.tile(5.13,9.03,.43,.63,.32),'coral',.6);
 for(const j of [7.52,10.12])bentTube(H,R,[[.35,j,.7],[.35,j,1.05],[1.65,j,1.05],[1.65,j,.72]],2,'teal');
 timber(H,R,.35,7.53,1.29,2.61,.22,.08,'teal');
 const boots=H.p(.95,8.2,.34);for(const d of [-7,7])shape(H,R,[[boots[0]+d-5,boots[1]],[boots[0]+d+7,boots[1]],[boots[0]+d+8,boots[1]-5],[boots[0]+d+2,boots[1]-9],[boots[0]+d+2,boots[1]-23],[boots[0]+d-6,boots[1]-23]],'blue',.72);
 bentTube(H,R,[[1.67,10.2,.1],[1.5,10.2,1.76],[1.35,10.2,1.93],[1.14,10.2,1.78]],2.5,'sun');
 metal(H,R,8.51,9.1,.22,1.5,.15,.1,'blue');metal(H,R,11.08,9.1,.22,1.5,.15,.1,'blue');
 for(let n=0;n<7;n++)H.line(R,[H.p(8.64,9.3+n*.16,.26),H.p(8.92,9.3+n*.16,.26)],'sun',1.2);
 const lantern=H.p(10.92,10.97,.19);shape(H,R,[[lantern[0]-9,lantern[1]],[lantern[0]+9,lantern[1]],[lantern[0]+7,lantern[1]-24],[lantern[0]-7,lantern[1]-24]],'blue',.7);shape(H,R,[[lantern[0]-5,lantern[1]-5],[lantern[0]+5,lantern[1]-5],[lantern[0]+4,lantern[1]-20],[lantern[0]-4,lantern[1]-20]],'sun',.8);stroke(H,R,[[lantern[0]-6,lantern[1]-26],[lantern[0]-7,lantern[1]-34],[lantern[0]+7,lantern[1]-34],[lantern[0]+6,lantern[1]-26]],'blue',1.5);
},(H,R,t)=>{
 const u=((t%24)+24)%24,p=ease((u-4.8)/4.8)*(1-ease((u-14.4)/7.6)),rise=ease(u/3.3)*(1-ease((u-18.5)/3.5));
 const i=6.87-.75*p,j=6.69-.82*p,z=.84+.42*rise-.64*p,center=H.p(i,j,z),left=[center[0]-12,center[1]],right=[center[0]+12,center[1]];
 hands(H,R,7.53,6.34,[right,H.p(7.02,6.51,.93)],'coral',-p);
 const loop=ell(center[0],center[1],13,6,32);rope(H,R,loop,'sun',2.3);
 const tail=H.p(7.02,6.51,.93),basket=H.p(6.89,6.71,.86);rope(H,R,[right,[center[0]+17,center[1]+10],tail,[tail[0]+3,tail[1]+13],basket],'sun',2.3);
 H.line(R,[[center[0]-3,center[1]-6],[center[0]+4,center[1]-5]],'coral',3);
 actor(H,R,9.11,6.94,p,'point',{shirt:['teal',.7],face:'sw'},0,1.35);
 for(let n=0;n<3;n++){const drift=((u/24+n*.31)%1),pos=H.p(7.1+drift*1.2,.5+n*.43,.035);H.opacity(Math.sin(drift*Math.PI)*.55,()=>H.line(R,[pos,[pos[0]+17,pos[1]+3]],'paper',1.1));}
});room.loopSeconds=24;room.stillTime=12;export default room;
