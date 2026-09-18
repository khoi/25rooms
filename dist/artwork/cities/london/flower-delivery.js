import { world, shape, oval, stroke, box, ell, TAU, wallPt } from '../../worlds/common.js';
import { timber, metal, bentTube, drape, vessel, floorLight } from '../materials.js';
import { masonry, cabinetFrame, basin } from '../structure.js';
import { windowBay, panelFront, caster, taskLight, hangingRail } from '../joinery.js';
import { hands } from './umbrella-ribs.js';
const ease=x=>{const q=Math.max(0,Math.min(1,x));return q*q*(3-2*q);};
function bouquet(H,R,i,j,z,count=9,size=1,dry=false){const [x,y]=H.p(i,j,z);for(let n=0;n<count;n++){const dx=(n-(count-1)/2)*8.2*size,h=(47+(n*17)%39)*size,tip=[x+dx,y-h];stroke(H,R,[[x+(n%3-1)*3,y],[x+dx*.44,y-h*.56],tip],dry?'sun':'teal',1.4);for(let m=0;m<3;m++){const f=.32+m*.18,xx=x+dx*f,yy=y-h*f,s=(m+n)%2?1:-1;shape(H,R,[[xx,yy],[xx+s*13*size,yy-10*size],[xx+s*10*size,yy-2*size]],dry?'sun':'teal',.65,.5);}if(dry){for(let k=0;k<5;k++)H.dot(tip[0]+(k-2)*2,tip[1]-k%2*3,1.7,'sun');}else {for(let k=0;k<5;k++){const a=k*TAU/5;oval(H,R,tip[0]+Math.cos(a)*4*size,tip[1]+Math.sin(a)*3*size,4.3*size,3.2*size,n%3===0?'coral':n%3===1?'paper':'sun',.8);}H.dot(...tip,2.2*size,'sun');}if(n===2){H.line(R,[[tip[0]-2,tip[1]+12],[tip[0]-1,tip[1]+27]],'sun',2);for(const d of [15,23])H.line(R,[[tip[0]-4,tip[1]+d],[tip[0]+3,tip[1]+d]],'coral',1);}}}
function carrier(H,R){
 metal(H,R,4.01,4.85,3.12,2.7,.3,.1,'blue');
 for(const i of [4.1,6.96])for(const j of [4.99,7.36])caster(H,R,i,j,.1);
 for(const i of [4.08,6.99])bentTube(H,R,[[i,7.4,.28],[i,7.4,.68],[i,4.94,.68],[i,4.94,.28]],2.6,'teal');
 for(const j of [4.98,7.36])metal(H,R,4.05,j,3.04,.11,.39,.11,'teal');
 shape(H,R,H.tile(4.21,5.02,2.72,2.23,.42),'paper',1);H.tint(H.tile(4.38,5.27,2.14,1.67,.425),'teal',.18);
 for(const j of [5.13,7.04]){metal(H,R,4.21,j,2.72,.09,.43,.18,'teal');H.line(R,[H.p(4.34,j+.1,.62),H.p(6.82,j+.1,.62)],'paper',1.1);}
 for(const i of [4.39,6.72])metal(H,R,i,5.13,.12,1.94,.45,.13,'blue');
 for(const i of [4.66,6.47])bentTube(H,R,[[i,5.88,.54],[i,5.88,.89],[i,6.42,.89],[i,6.42,.54]],1.8,'teal');
 metal(H,R,6.64,6.93,.27,.24,.21,.14,'coral');
 const center=H.p(5.64,6.15,.53);oval(H,R,...center,31,13,'blue',.8);oval(H,R,...center,26,10,'paper',1);
 vessel(H,R,5.64,6.15,.57,25,42,'blue');
 bouquet(H,R,5.64,6.15,1.89,11,1.06);
 for(const [i,j,h]of [[5.3,6.11,2.85],[5.97,6.13,2.98],[5.6,6.38,2.59]]){const a=H.p(5.64,6.15,1.9),q=H.p(i,j,h);stroke(H,R,[a,[q[0]-3,q[1]+15],q],'teal',1.9);shape(H,R,[[q[0],q[1]+5],[q[0]-9,q[1]-6],[q[0]-4,q[1]-10],[q[0],q[1]-4],[q[0]+5,q[1]-12],[q[0]+11,q[1]-5]],'coral',.72);H.line(R,[[q[0],q[1]+3],[q[0]+2,q[1]-7]],'sun',1.3);}
 const sleeve=H.p(6.51,5.33,.66);shape(H,R,[[sleeve[0]-8,sleeve[1]],[sleeve[0]+7,sleeve[1]+2],[sleeve[0]+18,sleeve[1]-20],[sleeve[0]-14,sleeve[1]-25]],'paper',1);H.line(R,[[sleeve[0]-6,sleeve[1]-2],[sleeve[0]+12,sleeve[1]-17]],'sun',1);
 const bh=H.p(5.64,6.15,1.76);stroke(H,R,[[bh[0]-23,bh[1]+3],[bh[0]-24,bh[1]-8],[bh[0]-4,bh[1]-15],[bh[0]+21,bh[1]-9],[bh[0]+25,bh[1]+2]],'blue',2.4);H.line(R,[[bh[0]-20,bh[1]-7],[bh[0]-10,bh[1]-12]],'coral',4);
 bentTube(H,R,[[4.1,5.1,.4],[3.62,5.48,1.28],[3.62,6.25,1.28],[4.1,6.65,.43]],3,'teal');H.line(R,[H.p(3.62,5.55,1.29),H.p(3.62,6.18,1.29)],'blue',5);
 for(const i of [4.3,6.8])H.line(R,[H.p(i,5,.67),H.p(i,7.25,.41)],'blue',1.4);
}
const room=world('london-flower-delivery','The bucket stays upright',{wall:false,floor:'paper',tone:.9,head:50},(H,R)=>{
 masonry(H,R,'nw',0,12,0,3.7,'teal',.16);masonry(H,R,'ne',0,12,0,3.7,'paper',.95);
 windowBay(H,R,'ne',1.7,5.25,2.47,1.0,{divisions:4});
 for(let j=1;j<12;j+=1.4)H.line(R,[H.p(.1,j,.02),H.p(11.9,j,.02)],'blue',.7,{tone:.25});for(let i=1.2;i<12;i+=2.2)H.line(R,[H.p(i,.1,.02),H.p(i,11.8,.02)],'blue',.6,{tone:.25});
 metal(H,R,.02,9.43,1.45,.18,.04,.07,'teal');timber(H,R,.1,9.47,.22,2.23,0,3.14,'sun');
 for(const z of [.43,2.46])metal(H,R,.28,9.5,.23,.2,z,.18,'blue');
 for(const side of ['nw','ne'])H.line(R,[wallPt(H,side,.1,.14,-.11),wallPt(H,side,11.85,.14,-.11)],'teal',4);
 metal(H,R,7.3,.12,.43,.21,.18,3.09,'teal');
 for(let n=0;n<5;n++)H.line(R,[H.p(7.37,.34,2.8+n*.08),H.p(7.65,.34,2.8+n*.08)],'paper',1);
 timber(H,R,2.27,.2,5.01,1.58,1.02,.16,'sun');
 cabinetFrame(H,R,2.36,.26,3.18,1.35,.11,.91,2,'teal',(i,j,w,d,z,h,n)=>{box(H,R,i+.06,j+.08,w-.12,d-.15,z+.08,.66,'paper',.95);const q=H.p(i+w-.26,j+d,.61);oval(H,R,...q,3,3,'teal',.7);});
 panelFront(H,R,2.42,1.68,3.07,.18,.68,2,'teal');
 basin(H,R,5.67,.39,1.36,1.08,1.2);
 bentTube(H,R,[[6.29,.44,1.2],[6.29,.44,1.84],[6.55,.64,1.84],[6.55,.83,1.64]],2,'teal');
 bentTube(H,R,[[6.43,1.15,.97],[6.43,1.15,.36],[6.02,1.15,.36],[6.02,1.15,.14]],2,'blue');
 shape(H,R,H.tile(2.63,.47,1.47,1.1,1.2),'teal',.45);
 for(let n=0;n<5;n++){const a=H.p(2.81+n*.17,.74,1.22),b=H.p(3.21+n*.17,1.43,1.22);H.line(R,[a,b],'teal',1.4);if(n%2===0)oval(H,R,b[0],b[1],4,2,'coral',.7);}
 const shears=H.p(4.5,1.22,1.2);for(const d of [-4,4])oval(H,R,shears[0]+d,shears[1]+4,3,4,'coral',.7);H.line(R,[[shears[0]-5,shears[1]+3],[shears[0]+8,shears[1]-10]],'blue',1.8);H.line(R,[[shears[0]+5,shears[1]+3],[shears[0]-7,shears[1]-10]],'blue',1.8);
 drape(H,R,5.74,1.35,.58,.24,1.2,.42,'paper');
 hangingRail(H,R,'ne',2.66,3.15,2.13,4,(P,u,n)=>{const q=P(u,-.1);H.line(R,[q,[q[0],q[1]+6]],'blue',1);shape(H,R,[[q[0]-4,q[1]+4],[q[0]+4,q[1]+4],[q[0]+5,q[1]+22],[q[0]-4,q[1]+22]],n===2?'coral':'sun',.7);});
 floorLight(H,4.9,5.5,150,.6);
 cabinetFrame(H,R,8.23,.22,3.3,1.49,.13,3.08,3,'teal',(i,j,w,d,z,h,n)=>{
 for(const q of [1,1.96])timber(H,R,i,j,w,d,z+q,.09,'sun');
 if(n===0){for(let k=0;k<2;k++)vessel(H,R,i+.22+k*.4,j+.66,z+.1,7,20,'blue');vessel(H,R,i+.49,j+.72,z+1.09,11,29,'paper');bouquet(H,R,i+.49,j+.72,z+2.16,5,.44,true);}
 if(n===1){box(H,R,i+.05,j+.05,w-.1,d-.1,z,.88,'blue',.55);for(let k=0;k<4;k++)H.line(R,[H.p(i+.15+k*.16,j+d,z+.12),H.p(i+.15+k*.16,j+d,z+.65)],'paper',.7);for(let k=0;k<2;k++)vessel(H,R,i+.24+k*.41,j+.69,z+1.09,6,23,'teal');drape(H,R,i+.02,j+.1,w-.04,d-.18,z+2.13,.19,'coral');}
 if(n===2){for(let k=0;k<3;k++)box(H,R,i+.05,j+.07+k*.31,w-.1,.25,z+.08,.11,k===1?'paper':'sun',.5);vessel(H,R,i+.47,j+.68,z+1.07,9,31,'paper');const [x,y]=H.p(i+.47,j+.68,z+1.08);H.line(R,[[x-6,y-14],[x+6,y-14]],'teal',1.3);for(let k=0;k<4;k++)vessel(H,R,i+.15+k*.2,j+.6,z+2.05,3,10,k%2?'coral':'paper',false);}
 });
 panelFront(H,R,8.36,1.73,3.02,.15,.55,3,'teal');
 metal(H,R,8.25,2.06,3.05,.4,.02,.04,'blue');for(let n=0;n<13;n++)H.line(R,[H.p(8.35+n*.22,2.1,.07),H.p(8.35+n*.22,2.43,.07)],'paper',.75);
 timber(H,R,.2,1.4,1.54,5.95,1.0,.18,'sun');for(const j of [1.55,4.2,7.08])timber(H,R,.28,j,.17,.17,.07,.94,'teal');timber(H,R,.2,1.55,1.48,5.6,.39,.1,'teal');
 for(let n=0;n<3;n++)box(H,R,.3,1.74+n*1.68,1.16,1.3,.51,.38,n===1?'coral':'paper',.7);
 for(const j of [1.66,4.15])bentTube(H,R,[[.36,j,1.17],[.36,j,2.5],[1.23,j,2.5]],2,'teal');
 const roll=H.p(.9,2.24,2.39);oval(H,R,...roll,9,5,'paper',1);H.line(R,[H.p(.86,2.25,2.39),H.p(.86,3.97,2.39)],'sun',6);oval(H,R,...H.p(.86,3.97,2.39),9,5,'paper',1);oval(H,R,...H.p(.86,3.97,2.39),3,2,'blue',.7);
 const papers=[[[.32,2.1,1.21],[1.72,2.1,1.21],[1.3,1.8,2.28],[.36,1.8,2.51]],[[.29,3.14,1.22],[1.76,3.14,1.22],[1.72,2.95,2.17],[.35,2.95,2.35]],[[.3,4.1,1.22],[1.74,4.1,1.22],[1.58,3.92,1.96],[.36,3.92,2.27]]];
 for(const [n,points]of papers.entries()){shape(H,R,points.map(p=>H.p(...p)),'paper',1);H.line(R,[H.p(...points[2]),H.p(...points[3])],n===1?'coral':'sun',1.2);}
 for(let n=0;n<4;n++){const p=H.p(.86,4.67+n*.5,1.22);oval(H,R,...p,9,5,n===0?'coral':n===1?'sun':'teal',.65);oval(H,R,...p,3,1.6,'paper',1);H.line(R,[[p[0]+6,p[1]+2],[p[0]+14,p[1]+8]],'paper',1.4);}
 metal(H,R,.43,6.58,.85,.48,1.2,.06,'blue');H.line(R,[H.p(.5,6.75,1.28),H.p(1.16,6.87,1.28)],'sun',2);
 const hoop=wallPt(H,'nw',7.7,2.58,-.28);H.outline(R,ell(...hoop,22,29),'sun',2.2);H.line(R,[[hoop[0],hoop[1]-31],[hoop[0],hoop[1]-38]],'blue',1);
 for(let n=0;n<3;n++){const p=wallPt(H,'nw',1.7+n*.76,3.25,-.18);H.line(R,[[p[0],p[1]],[p[0]+2,p[1]+27]],'sun',1.3);for(let k=0;k<5;k++)oval(H,R,p[0]+(k%2?4:-4),p[1]+8+k*4,3,2,'sun',.65);}
 timber(H,R,9.4,6.03,1.55,1.32,.52,.12,'sun');for(const i of [9.54,10.7])for(const j of [6.14,7.15])timber(H,R,i,j,.12,.12,.03,.49,'sun');
 vessel(H,R,10.12,6.65,.65,6,13,'teal',false);box(H,R,10.5,6.54,.32,.29,.65,.06,'paper',1);
 const hook=wallPt(H,'ne',10.6,3.43,-.19);H.line(R,[hook,[hook[0],hook[1]+12]],'blue',2);
 vessel(H,R,1.07,8.54,.04,18,28,'teal');bouquet(H,R,1.07,8.54,.93,7,.77,true);
 const trimmings=H.p(2.07,8.87,.08);for(let n=0;n<4;n++){H.line(R,[[trimmings[0]-10+n*4,trimmings[1]-3],[trimmings[0]+2+n*3,trimmings[1]+4]],'teal',1.1);oval(H,R,trimmings[0]-9+n*4,trimmings[1]-3,3,1.4,'teal',.6);}
 timber(H,R,2.5,9.16,2.24,1.1,.07,.08,'sun');for(let n=0;n<3;n++){shape(H,R,H.tile(2.69+n*.62,9.28,.5,.75,.16),'paper',1);H.line(R,[H.p(2.73+n*.62,9.44,.17),H.p(3.1+n*.62,9.97,.17)],'coral',.8);}
 for(const i of [2.52,4.57])timber(H,R,i,9.17,.13,1.1,.15,.31,'sun');timber(H,R,2.5,9.16,2.24,.13,.15,.31,'sun');
 for(const i of [8.31,10.65])for(const j of [9.05,10.56])metal(H,R,i,j,.11,.11,.1,.77,'teal');
 metal(H,R,8.29,9.02,2.51,1.72,.14,.1,'teal');
 for(const j of [9.03,10.66]){metal(H,R,8.31,j,2.41,.08,.71,.1,'teal');metal(H,R,8.31,j,2.41,.08,.43,.07,'teal');}
 for(let n=0;n<3;n++){const q=H.p(8.81+n*.67,9.85,.32);shape(H,R,[[q[0]-8,q[1]],[q[0]+8,q[1]],[q[0]+16,q[1]-23],[q[0]-12,q[1]-28]],'paper',1);H.line(R,[[q[0]-4,q[1]-2],[q[0]+10,q[1]-20]],n===1?'coral':'sun',1.1);}
 drape(H,R,8.51,9.06,.66,1.36,.81,.21,'coral');
},(H,R,t)=>{
 const u=((t%16)+16)%16,test=ease((u-3.2)/3.2)*(1-ease((u-6.4)/2)),slack=ease((u-6.4)/3.2)*(1-ease((u-9.6)/4.4));
 const p=H.p(5.98,6.64,1.16),buckle=[p[0]+slack*7,p[1]+slack*6-test*2];
 hands(H,R,3.15,6.1,[H.p(3.62,5.55,1.29),H.p(3.62,6.18,1.29)],'teal',slack);
 carrier(H,R);
 hands(H,R,6.86,6.76,[[p[0]-17,p[1]-2],buckle],'coral',-test);
 const a=H.p(5.22,6.43,1.2),b=H.p(6.05,5.97,1.2);stroke(H,R,[a,[p[0]-18,p[1]+3+slack*8],buckle,b],'blue',5);stroke(H,R,[a,[p[0]-18,p[1]+3+slack*8],buckle,b],'sun',3);
 shape(H,R,[[buckle[0]-3,buckle[1]-3],[buckle[0]+4,buckle[1]-2],[buckle[0]+4,buckle[1]+3],[buckle[0]-3,buckle[1]+3]],'paper',1);H.line(R,[[buckle[0],buckle[1]-2],[buckle[0],buckle[1]+3]],'blue',.8);
 const rb=H.p(5.34,6.25,1.94);stroke(H,R,[rb,[rb[0]-8,rb[1]-3],[rb[0]-4,rb[1]+5],rb,[rb[0]+9,rb[1]-1],[rb[0]+5,rb[1]+6],rb,[rb[0]+4+slack*2,rb[1]+17]],'coral',1.9);
});room.loopSeconds=16;room.stillTime=14.8;export default room;
