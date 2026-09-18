import { world, shape, oval, stroke, box, wallPt, TAU } from '../../worlds/common.js';
import { timber, metal, benchFrame, drape, vessel, floorLight, bentTube } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { radiator, panelFront, taskLight } from '../joinery.js';
import { hands } from './umbrella-ribs.js';
const ease=x=>{const q=Math.max(0,Math.min(1,x));return q*q*(3-2*q);};
function cup(H,R,i,j,z,ink='paper',repair=false){const p=H.p(i,j,z);vessel(H,R,i,j,z,6,9,ink);stroke(H,R,[[p[0]+5,p[1]-8],[p[0]+11,p[1]-8],[p[0]+11,p[1]-2],[p[0]+5,p[1]-2]],repair?'coral':'blue',1.7);}
const room=world('london-bay-window','The table catches the rain light',{wall:false,pattern:'boards',floor:'sun',tone:.16,head:35},(H,R)=>{
 masonry(H,R,'nw',0,12,0,3.65,'paper',.98);masonry(H,R,'ne',0,12,0,3.65,'teal',.14);
 for(const j of [.15,11.1])for(let i=.15;i<11.5;i+=.5)shape(H,R,H.tile(i,j,.36,.35,.02),i%1<.5?'teal':'coral',.4);
 floorLight(H,5.8,4.5,145,.7);
 timber(H,R,.13,4.6,.51,4.4,2.59,.11,'sun');
 for(const j of [4.8,8.65])bentTube(H,R,[[.12,j,2.28],[.55,j,2.6]],1.4,'blue');
 for(let n=0;n<3;n++){const p=wallPt(H,'nw',5.0+n*.93,2.86,-.27);shape(H,R,[[p[0]-9,p[1]-13],[p[0]+9,p[1]-13],[p[0]+9,p[1]+10],[p[0]-9,p[1]+10]],'sun',.5);shape(H,R,[[p[0]-6,p[1]-10],[p[0]+6,p[1]-10],[p[0]+6,p[1]+7],[p[0]-6,p[1]+7]],'paper',1);oval(H,R,p[0],p[1]-3,3,4,n===1?'coral':'blue',.7);H.line(R,[[p[0]-4,p[1]+5],[p[0]+4,p[1]+5]],'teal',3);}
 vessel(H,R,.38,8,2.71,4,7,'paper');const cutting=H.p(.38,8,2.93);stroke(H,R,[cutting,[cutting[0]+2,cutting[1]-12],[cutting[0]+8,cutting[1]-17]],'teal',1);oval(H,R,cutting[0]+7,cutting[1]-15,4,2,'teal',.7);
 const clock=wallPt(H,'nw',9.77,3.04,-.14);oval(H,R,...clock,11,11,'paper',1);H.line(R,[[clock[0],clock[1]-7],clock,[clock[0]+5,clock[1]+3]],'blue',1.2);

 const fronts=[[2.65,.15,3.95,.72],[3.95,.72,7.65,.72],[7.65,.72,9.12,.15]];
 for(const [a,b,c,d]of fronts){const P=(u,z)=>H.p(a+(c-a)*u,b+(d-b)*u,z);shape(H,R,[P(0,1.2),P(1,1.2),P(1,3.43),P(0,3.43)],'paper',1);shape(H,R,[P(.04,1.37),P(.96,1.37),P(.96,3.28),P(.04,3.28)],'teal',.17);for(const v of [0,.5,1]){H.line(R,[P(v,1.2),P(v,3.43)],'blue',4);H.line(R,[P(v,1.23),P(v,3.4)],'paper',1.4);}H.line(R,[P(0,2.34),P(1,2.34)],'blue',3);H.line(R,[P(.13,1.57),P(.31,3.16)],'paper',3);}
 timber(H,R,2.62,.2,6.55,1.3,1.03,.17,'sun');
 box(H,R,2.78,.28,6.15,1.1,.12,.82,'teal',.36);panelFront(H,R,2.92,1.4,5.92,.24,.56,4,'sun');
 timber(H,R,3.2,1.24,1.22,.55,.39,.15,'sun');box(H,R,3.3,1.37,.97,.49,.55,.1,'paper',1);
 for(let n=0;n<3;n++)box(H,R,3.38+n*.25,1.48,.18,.23,.65,.12,n===1?'coral':'teal',.7);
 for(const i of [2.35,9.2]) {const P=(j,z)=>H.p(i,j,z);shape(H,R,[P(.38,3.43),P(1.08,3.43),P(1.12,1.24),P(.82,1.11),P(.42,1.29)],'paper',1);for(let n=0;n<4;n++)H.line(R,[P(.45+n*.16,3.4),P(.46+n*.16,1.28)],n===1?'coral':'blue',.75);H.line(R,[P(.43,1.35),P(1.03,1.28)],'coral',1.4);oval(H,R,...P(.55,1.25),3,2,'sun',.8);}
 radiator(H,R,'ne',9.4,2.1,.97);
 const bus=H.p(10.38,.47,1.04);shape(H,R,[[bus[0]-13,bus[1]-4],[bus[0]+12,bus[1]-4],[bus[0]+12,bus[1]-11],[bus[0]-13,bus[1]-11]],'coral',.8);for(const d of [-8,7])oval(H,R,bus[0]+d,bus[1]-1,2.4,2.4,'blue',.8);
 cabinetFrame(H,R,.18,2.5,1.68,1.45,.13,3.0,1,'teal',(i,j,w,d,z)=>{for(const h of [.58,1.3,2.06])timber(H,R,i,j,w,d,z+h,.08,'sun');for(let n=0;n<5;n++){const p=H.p(i+.17+n*.24,j+.72,z+1.39);oval(H,R,...p,5.2,12,'paper',1);H.line(R,[[p[0],p[1]-8],[p[0]+1,p[1]+8]],'teal',.6);}for(let n=0;n<3;n++)cup(H,R,i+.17+n*.39,j+.65,z+2.15,n===1?'coral':'paper');box(H,R,i+.07,j+.05,w-.14,d-.13,z+.05,.44,'sun',.58);for(let n=0;n<5;n++)H.line(R,[H.p(i+.12+n*.23,j+d-.06,z+.15),H.p(i+.12+n*.23,j+d-.06,z+.4)],'blue',.6);});
 timber(H,R,.17,4.05,1.62,3.7,.95,.15,'sun');for(const j of [4.1,7.55])timber(H,R,.24,j,.16,.16,.04,.91,'teal');
 box(H,R,.27,4.25,1.31,1.26,1.1,.46,'paper',.95);const bread=H.p(.89,4.92,1.58);oval(H,R,...bread,17,10,'sun',.6);for(let n=0;n<3;n++)H.line(R,[[bread[0]-8+n*7,bread[1]-7],[bread[0]-5+n*7,bread[1]+5]],'coral',.7);
 cup(H,R,.8,5.96,1.11,'teal');box(H,R,.4,6.65,.85,.63,1.12,.13,'paper',1);drape(H,R,.34,7.04,1.23,.5,1.13,.27,'paper');
 benchFrame(H,R,3.9,3.28,4.2,2.65,1.13,'sun');
 for(const i of [4.07,7.7])bentTube(H,R,[[i,3.55,.36],[i,5.66,.36]],1.8,'teal');
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
},(H,R,t)=>{
 const u=((t%20)+20)%20,a=ease((u-4)/4)*(1-ease((u-12)/6)),book=ease((u-7)/3)*(1-ease((u-15)/3));
 const P=(x,z)=>H.p(x,.76+(x-4)*.04*a,z);const pane=[P(4,1.37),P(5.76,1.37),P(5.76,2.3),P(4,2.3)];shape(H,R,pane,'paper',1);H.tint(pane,'teal',.13);H.line(R,[P(4,1.37),P(5.76,1.37),P(5.76,2.3)],'blue',2.1);const catchP=P(5.65,1.61);H.line(R,[[catchP[0]-3,catchP[1]],[catchP[0]+5,catchP[1]-a*3]],'sun',2.1);
 hands(H,R,5.93,1.48,[catchP,H.p(5.8,1.32,1.15)],'teal',-book*2);
 const bx=6.03-.22*book,bj=5.88-.12*book,z=1.17;
 const left=H.tile(bx-.54,bj-.36,.53,.54,z),right=H.tile(bx,bj-.36,.53,.54,z+.025);shape(H,R,left,'paper',1);shape(H,R,right,'paper',1);H.line(R,[H.p(bx,bj-.36,z+.03),H.p(bx,bj+.18,z+.03)],'coral',1);
 for(const [i,j,ink]of [[bx-.31,bj-.09,'teal'],[bx+.27,bj-.07,'sun']])oval(H,R,...H.p(i,j,z+.04),5,3,ink,.7);
 hands(H,R,6.15,6.38,[H.p(bx+.5,bj-.02,z),H.p(bx-.5,bj-.03,z)],'coral',0,.75);
});room.loopSeconds=20;room.stillTime=19.2;export default room;
