import { world, shape, oval, stroke, box, wallPt, TAU } from '../../worlds/common.js';
import { timber, metal, benchFrame, drape, vessel, floorLight, bentTube } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { radiator, panelFront, taskLight, wallRack, hangingRail, caster } from '../joinery.js';
import { hands } from './umbrella-ribs.js';
const ease=x=>{const q=Math.max(0,Math.min(1,x));return q*q*(3-2*q);};
function cup(H,R,i,j,z,ink='paper',repair=false){const p=H.p(i,j,z);vessel(H,R,i,j,z,6,9,ink);stroke(H,R,[[p[0]+5,p[1]-8],[p[0]+11,p[1]-8],[p[0]+11,p[1]-2],[p[0]+5,p[1]-2]],repair?'coral':'blue',1.7);}
const room=world('london-bay-window','The table catches the rain light',{wall:false,pattern:'boards',floor:'sun',tone:.16,head:35},(H,R)=>{
 masonry(H,R,'nw',0,12,0,3.65,'paper',.98);masonry(H,R,'ne',0,12,0,3.65,'teal',.14);
 for(const j of [.15,11.1])for(let i=.15;i<11.5;i+=.5)shape(H,R,H.tile(i,j,.36,.35,.02),i%1<.5?'teal':'coral',.4);
 floorLight(H,5.8,4.5,145,.7);
 for(const side of ['nw','ne']){H.line(R,[wallPt(H,side,.05,.12,-.12),wallPt(H,side,11.9,.12,-.12)],'blue',4);H.line(R,[wallPt(H,side,.05,3.48,-.1),wallPt(H,side,11.9,3.48,-.1)],'sun',4);H.line(R,[wallPt(H,side,.05,3.58,-.06),wallPt(H,side,11.9,3.58,-.06)],'paper',3);}
 wallRack(H,R,'nw',4.45,3.2,1.55,.82,1,'teal',(P,z)=>{
   for(let n=0;n<5;n++){const q=P(.35+n*.55,z+.08);oval(H,R,...q,6,8,n===1?'coral':'paper',.9);H.line(R,[[q[0]-4,q[1]+7],[q[0]+4,q[1]+7]],'sun',1);}
 });
 hangingRail(H,R,'nw',4.55,2.95,1.48,4,(P,u,n)=>{const q=P(u,-.09);H.line(R,[q,[q[0],q[1]+6]],'blue',1);oval(H,R,q[0],q[1]+11,4,6,n===2?'teal':'paper',.9);});
 timber(H,R,.13,4.6,.51,4.4,2.59,.11,'sun');
 for(const j of [4.8,8.65])bentTube(H,R,[[.12,j,2.28],[.55,j,2.6]],1.4,'blue');
 for(let n=0;n<3;n++){const p=wallPt(H,'nw',5.0+n*.93,2.86,-.27);shape(H,R,[[p[0]-9,p[1]-13],[p[0]+9,p[1]-13],[p[0]+9,p[1]+10],[p[0]-9,p[1]+10]],'sun',.5);shape(H,R,[[p[0]-6,p[1]-10],[p[0]+6,p[1]-10],[p[0]+6,p[1]+7],[p[0]-6,p[1]+7]],'paper',1);oval(H,R,p[0],p[1]-3,3,4,n===1?'coral':'blue',.7);H.line(R,[[p[0]-4,p[1]+5],[p[0]+4,p[1]+5]],'teal',3);}
 vessel(H,R,.38,8,2.71,4,7,'paper');const cutting=H.p(.38,8,2.93);stroke(H,R,[cutting,[cutting[0]+2,cutting[1]-12],[cutting[0]+8,cutting[1]-17]],'teal',1);oval(H,R,cutting[0]+7,cutting[1]-15,4,2,'teal',.7);
 const clock=wallPt(H,'nw',9.77,3.04,-.14);oval(H,R,...clock,11,11,'paper',1);H.line(R,[[clock[0],clock[1]-7],clock,[clock[0]+5,clock[1]+3]],'blue',1.2);

 const fronts=[[2.65,.15,3.95,.72],[3.95,.72,7.65,.72],[7.65,.72,9.12,.15]];
 for(const [a,b,c,d]of fronts){const P=(u,z)=>H.p(a+(c-a)*u,b+(d-b)*u,z);shape(H,R,[P(0,1.2),P(1,1.2),P(1,3.43),P(0,3.43)],'paper',1);shape(H,R,[P(.04,1.37),P(.96,1.37),P(.96,3.28),P(.04,3.28)],'teal',.17);for(const v of [0,.5,1]){H.line(R,[P(v,1.2),P(v,3.43)],'blue',4);H.line(R,[P(v,1.23),P(v,3.4)],'paper',1.4);}H.line(R,[P(0,2.34),P(1,2.34)],'blue',3);H.line(R,[P(.13,1.57),P(.31,3.16)],'paper',3);}
 for(const [a,b,c,d]of fronts){const P=(u,z,off=0)=>H.p(a+(c-a)*u,b+(d-b)*u+off,z);shape(H,R,[P(0,3.41),P(1,3.41),P(1,3.58,.14),P(0,3.58,.14)],'sun',.6);H.line(R,[P(0,1.17,.17),P(1,1.17,.17)],'blue',5);H.line(R,[P(0,1.22,.17),P(1,1.22,.17)],'paper',2);for(const u of [.06,.94])H.line(R,[P(u,1.2,.08),P(u,3.44,.08)],'sun',2);}
 timber(H,R,2.62,.2,6.55,1.3,1.03,.17,'sun');
 for(const i of [4.58,6.73]){drape(H,R,i,.84,1.76,.6,1.24,.12,'teal');H.line(R,[H.p(i+.1,1.39,1.28),H.p(i+1.58,1.39,1.28)],'paper',1);}
 const cushion=H.p(3.17,.81,1.52);shape(H,R,[[cushion[0]-17,cushion[1]+8],[cushion[0]+13,cushion[1]+12],[cushion[0]+20,cushion[1]-9],[cushion[0]-10,cushion[1]-14]],'coral',.55);H.line(R,[[cushion[0]-8,cushion[1]-8],[cushion[0]+11,cushion[1]+5]],'paper',2);
 for(const i of [3.22,8.55])bentTube(H,R,[[i,.46,3.5],[i,1.08,3.5]],2,'sun');
 const blind=H.p(8.7,.9,3.34);stroke(H,R,[blind,[blind[0]+1,blind[1]+31],[blind[0]-3,blind[1]+35],[blind[0]-6,blind[1]+31],[blind[0]-5,blind[1]]],'blue',.8);
 box(H,R,2.78,.28,6.15,1.1,.12,.82,'teal',.36);panelFront(H,R,2.92,1.4,5.92,.24,.56,4,'sun');
 timber(H,R,3.2,1.24,1.22,.55,.39,.15,'sun');box(H,R,3.3,1.37,.97,.49,.55,.1,'paper',1);
 for(let n=0;n<3;n++)box(H,R,3.38+n*.25,1.48,.18,.23,.65,.12,n===1?'coral':'teal',.7);
 for(const i of [2.35,9.2]) {const P=(j,z)=>H.p(i,j,z);shape(H,R,[P(.38,3.43),P(1.08,3.43),P(1.12,1.24),P(.82,1.11),P(.42,1.29)],'paper',1);for(let n=0;n<4;n++)H.line(R,[P(.45+n*.16,3.4),P(.46+n*.16,1.28)],n===1?'coral':'blue',.75);H.line(R,[P(.43,1.35),P(1.03,1.28)],'coral',1.4);oval(H,R,...P(.55,1.25),3,2,'sun',.8);}
 radiator(H,R,'ne',9.4,2.1,.97);
 const bus=H.p(10.38,.47,1.04);shape(H,R,[[bus[0]-13,bus[1]-4],[bus[0]+12,bus[1]-4],[bus[0]+12,bus[1]-11],[bus[0]-13,bus[1]-11]],'coral',.8);for(const d of [-8,7])oval(H,R,bus[0]+d,bus[1]-1,2.4,2.4,'blue',.8);
 cabinetFrame(H,R,.15,.5,1.66,3.38,.13,3.14,1,'teal',(i,j,w,d,z)=>{
   for(const h of [.66,1.43,2.26])timber(H,R,i,j,w,d,z+h,.1,'sun');
   for(let n=0;n<6;n++){const q=H.p(i+.63,j+.38+n*.44,z+1.59);oval(H,R,...q,8,13,n===4?'sun':'paper',.95);H.line(R,[[q[0],q[1]-9],[q[0]+2,q[1]+10]],'teal',.7);}
   for(let n=0;n<4;n++)cup(H,R,i+.62,j+.48+n*.71,z+2.38,n===1?'coral':'paper');
   box(H,R,i+.09,j+.1,w-.18,1.42,z+.06,.54,'sun',.52);box(H,R,i+.09,j+1.7,w-.18,1.4,z+.06,.54,'paper',.8);
   for(let n=0;n<7;n++)H.line(R,[H.p(i+w,j+.21+n*.41,z+.17),H.p(i+w,j+.21+n*.41,z+.52)],'blue',.7);
   for(let n=0;n<3;n++)box(H,R,i+.2,j+.23+n*.88,.84,.69,z+.8,.36,n===1?'teal':'paper',.8);
 });
 timber(H,R,.4,3.17,1.4,1.29,1.38,.11,'sun');shape(H,R,H.tile(.51,3.29,1.16,.99,1.5),'blue',.4);
 for(let n=0;n<4;n++){const q=H.p(.8+n*.18,3.67,1.51);H.line(R,[[q[0]-6,q[1]-5],[q[0]+6,q[1]+5]],'paper',1.5);}
 H.line(R,[H.p(.88,4.48,1.43),H.p(1.43,4.48,1.43)],'teal',2);
 timber(H,R,.17,4.05,1.62,3.7,.95,.15,'sun');for(const j of [4.1,7.55])timber(H,R,.24,j,.16,.16,.04,.91,'teal');
 box(H,R,.27,4.25,1.31,1.26,1.1,.46,'paper',.95);const bread=H.p(.89,4.92,1.58);oval(H,R,...bread,17,10,'sun',.6);for(let n=0;n<3;n++)H.line(R,[[bread[0]-8+n*7,bread[1]-7],[bread[0]-5+n*7,bread[1]+5]],'coral',.7);
 cup(H,R,.8,5.96,1.11,'teal');box(H,R,.4,6.65,.85,.63,1.12,.13,'paper',1);drape(H,R,.34,7.04,1.23,.5,1.13,.27,'paper');
 benchFrame(H,R,3.9,3.28,4.2,2.65,1.13,'sun');
 for(const i of [4.07,7.7])bentTube(H,R,[[i,3.55,.36],[i,5.66,.36]],1.8,'teal');
 for(const j of [3.39,5.67])timber(H,R,4.07,j,3.8,.13,.69,.27,'sun');
 for(const i of [4.12,7.66])for(const j of [3.52,5.56]){const q=H.p(i,j,.68);oval(H,R,...q,4,5,'sun',.6);}
 for(const [i,j]of [[3.02,4.48],[8.37,4.6]]){
   for(const x of [i,i+.74])for(const y of [j,j+.67])timber(H,R,x,y,.1,.1,.02,.7,'sun');
   timber(H,R,i-.08,j-.06,.95,.9,.7,.13,'teal');
   for(const y of [j+.07,j+.66])bentTube(H,R,[[i+.84,y,.78],[i+.88,y,1.64]],2,'sun');
   for(const z of [1.05,1.32,1.61])H.line(R,[H.p(i+.88,j+.07,z),H.p(i+.88,j+.66,z)],'blue',2);
 }
 drape(H,R,4.27,3.57,1.5,1.6,1.14,.08,'paper');
 const tp=H.p(5.02,4.35,1.19);oval(H,R,...tp,14,13,'coral',.75);oval(H,R,tp[0],tp[1]-13,7,3,'paper',1);H.dot(tp[0],tp[1]-17,2.5,'blue');stroke(H,R,[[tp[0]+11,tp[1]-5],[tp[0]+21,tp[1]-11],[tp[0]+24,tp[1]-16]],'coral',4);stroke(H,R,[[tp[0]-12,tp[1]-9],[tp[0]-22,tp[1]-14],[tp[0]-24,tp[1]-3],[tp[0]-13,tp[1]+3]],'blue',2);
 cup(H,R,6.15,4.03,1.15,'paper',true);cup(H,R,6.6,4.83,1.15,'teal');
 box(H,R,7.12,3.7,.58,.79,1.15,.09,'paper',1);for(let n=0;n<4;n++){const p=H.p(7.35,3.85+n*.15,1.25);shape(H,R,[[p[0]-7,p[1]],[p[0]-7,p[1]-12],[p[0]+5,p[1]-13],[p[0]+7,p[1]]],'sun',.65);}
 box(H,R,6.75,5.1,.65,.43,1.15,.16,'paper',1);oval(H,R,...H.p(7.08,5.3,1.38),3,1.5,'coral',.7);
 taskLight(H,R,8.7,1.08,1.2,'coral',.25);
 timber(H,R,.14,8.54,1.47,2.4,.35,.13,'sun');for(const j of [8.66,10.67])timber(H,R,.25,j,.16,.16,.03,.31,'sun');
 for(let n=0;n<3;n++){const p=H.p(.81,8.9+n*.65,.48);oval(H,R,...p,12,5,n===0?'coral':'blue',.65);H.line(R,[[p[0]-2,p[1]-6],[p[0]+1,p[1]-14]],'blue',2);}
 const coat=wallPt(H,'nw',9.7,2.7,-.28);H.line(R,[[coat[0],coat[1]-4],[coat[0],coat[1]+5]],'blue',1.4);shape(H,R,[[coat[0]-4,coat[1]],[coat[0]-15,coat[1]+10],[coat[0]-10,coat[1]+17],[coat[0]-7,coat[1]+11],[coat[0]-7,coat[1]+43],[coat[0]+10,coat[1]+43],[coat[0]+8,coat[1]+10],[coat[0]+16,coat[1]+16],[coat[0]+20,coat[1]+9],[coat[0]+5,coat[1]]],'coral',.5);
 box(H,R,1.42,9.78,.83,.6,.07,.62,'teal',.5);stroke(H,R,[H.p(1.53,9.88,.71),H.p(1.61,9.91,.91),H.p(2.09,9.91,.91),H.p(2.15,9.88,.71)],'blue',1.4);
 for(const i of [8.5,10.72])for(const j of [8.42,9.6])caster(H,R,i,j);
 for(const z of [.23,.81])timber(H,R,8.37,8.28,2.54,1.5,z,.12,'sun');
 for(const i of [8.45,10.71])for(const j of [8.35,9.59])timber(H,R,i,j,.12,.12,.17,.76,'teal');
 bentTube(H,R,[[10.8,8.4,.96],[10.8,8.4,1.39],[10.8,9.55,1.39],[10.8,9.55,.96]],2.2,'teal');
 drape(H,R,8.49,8.41,1.03,1.14,.96,.25,'paper');
 box(H,R,8.62,8.6,.69,.81,.99,.26,'coral',.7);oval(H,R,...H.p(8.96,9.03,1.28),8,3,'paper',1);
 for(let n=0;n<3;n++)box(H,R,9.75,8.46,.75,.96,.95+n*.07,.055,n===1?'teal':'paper',.9);
 cup(H,R,10.06,9.36,.96,'sun');
 box(H,R,8.73,8.54,1.51,.95,.37,.28,'teal',.65);
 timber(H,R,3.11,9.68,2.21,1.36,.07,.1,'sun');
 box(H,R,3.28,9.87,.89,.69,.2,.22,'paper',1);shape(H,R,H.tile(3.34,9.93,.78,.55,.43),'coral',.35);
 const bag=H.p(4.75,10.39,.2);shape(H,R,[[bag[0]-12,bag[1]],[bag[0]+12,bag[1]],[bag[0]+10,bag[1]-26],[bag[0]-9,bag[1]-26]],'teal',.66);stroke(H,R,[[bag[0]-7,bag[1]-24],[bag[0]-6,bag[1]-33],[bag[0]+7,bag[1]-33],[bag[0]+8,bag[1]-24]],'coral',2);shape(H,R,[[bag[0]-7,bag[1]-6],[bag[0]+7,bag[1]-6],[bag[0]+6,bag[1]-16],[bag[0]-6,bag[1]-16]],'paper',1);
},(H,R,t)=>{
 const u=((t%20)+20)%20,a=ease((u-4)/4)*(1-ease((u-12)/6)),book=ease((u-7)/3)*(1-ease((u-15)/3));
 const P=(x,z)=>H.p(x,.76+(x-4)*.04*a,z);const pane=[P(4,1.37),P(5.76,1.37),P(5.76,2.3),P(4,2.3)];shape(H,R,pane,'paper',1);H.tint(pane,'teal',.13);H.line(R,[P(4,1.37),P(5.76,1.37),P(5.76,2.3)],'blue',2.1);const catchP=P(5.65,1.61);H.line(R,[[catchP[0]-3,catchP[1]],[catchP[0]+5,catchP[1]-a*3]],'sun',2.1);
 hands(H,R,5.93,1.48,[catchP,H.p(5.8,1.32,1.15)],'teal',-book*2);
 const bx=6.03-.22*book,bj=5.88-.12*book,z=1.17;
 const left=H.tile(bx-.54,bj-.36,.53,.54,z),right=H.tile(bx,bj-.36,.53,.54,z+.025);shape(H,R,left,'paper',1);shape(H,R,right,'paper',1);H.line(R,[H.p(bx,bj-.36,z+.03),H.p(bx,bj+.18,z+.03)],'coral',1);
 for(const [i,j,ink]of [[bx-.31,bj-.09,'teal'],[bx+.27,bj-.07,'sun']])oval(H,R,...H.p(i,j,z+.04),5,3,ink,.7);
 hands(H,R,6.15,6.38,[H.p(bx+.5,bj-.02,z),H.p(bx-.5,bj-.03,z)],'coral',0,.75);
});room.loopSeconds=20;room.stillTime=19.2;export default room;
