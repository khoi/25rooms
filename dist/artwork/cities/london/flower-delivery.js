import { world, shape, oval, stroke, box, ell, TAU, wallPt } from '../../worlds/common.js';
import { timber, metal, bentTube, drape, vessel, floorLight } from '../materials.js';
import { masonry, cabinetFrame } from '../structure.js';
import { windowBay, panelFront, caster, taskLight } from '../joinery.js';
import { hands } from './umbrella-ribs.js';
const ease=x=>{const q=Math.max(0,Math.min(1,x));return q*q*(3-2*q);};
function bouquet(H,R,i,j,z,count=9,size=1,dry=false){const [x,y]=H.p(i,j,z);for(let n=0;n<count;n++){const dx=(n-(count-1)/2)*8.2*size,h=(47+(n*17)%39)*size,tip=[x+dx,y-h];stroke(H,R,[[x+(n%3-1)*3,y],[x+dx*.44,y-h*.56],tip],dry?'sun':'teal',1.4);for(let m=0;m<3;m++){const f=.32+m*.18,xx=x+dx*f,yy=y-h*f,s=(m+n)%2?1:-1;shape(H,R,[[xx,yy],[xx+s*13*size,yy-10*size],[xx+s*10*size,yy-2*size]],dry?'sun':'teal',.65,.5);}if(dry){for(let k=0;k<5;k++)H.dot(tip[0]+(k-2)*2,tip[1]-k%2*3,1.7,'sun');}else {for(let k=0;k<5;k++){const a=k*TAU/5;oval(H,R,tip[0]+Math.cos(a)*4*size,tip[1]+Math.sin(a)*3*size,4.3*size,3.2*size,n%3===0?'coral':n%3===1?'paper':'sun',.8);}H.dot(...tip,2.2*size,'sun');}if(n===2){H.line(R,[[tip[0]-2,tip[1]+12],[tip[0]-1,tip[1]+27]],'sun',2);for(const d of [15,23])H.line(R,[[tip[0]-4,tip[1]+d],[tip[0]+3,tip[1]+d]],'coral',1);}}}
function carrier(H,R){
 metal(H,R,4.01,4.85,3.12,2.7,.3,.1,'blue');
 for(const i of [4.1,6.96])for(const j of [4.99,7.36])caster(H,R,i,j,.1);
 for(const i of [4.08,6.99])bentTube(H,R,[[i,7.4,.28],[i,7.4,.68],[i,4.94,.68],[i,4.94,.28]],2.6,'teal');
 for(const j of [4.98,7.36])metal(H,R,4.05,j,3.04,.11,.39,.11,'teal');
 shape(H,R,H.tile(4.21,5.02,2.72,2.23,.42),'paper',1);H.tint(H.tile(4.38,5.27,2.14,1.67,.425),'teal',.18);
 const center=H.p(5.64,6.15,.53);oval(H,R,...center,31,13,'blue',.8);oval(H,R,...center,26,10,'paper',1);
 vessel(H,R,5.64,6.15,.57,25,42,'blue');
 bouquet(H,R,5.64,6.15,1.89,11,1.06);
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
 const papers=[[[.32,2.1,1.21],[1.72,2.1,1.21],[1.3,1.8,2.28],[.36,1.8,2.51]],[[.29,3.14,1.22],[1.76,3.14,1.22],[1.72,2.95,2.17],[.35,2.95,2.35]],[[.3,4.1,1.22],[1.74,4.1,1.22],[1.58,3.92,1.96],[.36,3.92,2.27]]];
 for(const [n,points]of papers.entries()){shape(H,R,points.map(p=>H.p(...p)),'paper',1);H.line(R,[H.p(...points[2]),H.p(...points[3])],n===1?'coral':'sun',1.2);}
 for(let n=0;n<4;n++){const p=H.p(.86,4.67+n*.5,1.22);oval(H,R,...p,9,5,n===0?'coral':n===1?'sun':'teal',.65);oval(H,R,...p,3,1.6,'paper',1);H.line(R,[[p[0]+6,p[1]+2],[p[0]+14,p[1]+8]],'paper',1.4);}
 metal(H,R,.43,6.58,.85,.48,1.2,.06,'blue');H.line(R,[H.p(.5,6.75,1.28),H.p(1.16,6.87,1.28)],'sun',2);
 const hoop=wallPt(H,'nw',7.7,2.58,-.28);H.outline(R,ell(...hoop,22,29),'sun',2.2);H.line(R,[[hoop[0],hoop[1]-31],[hoop[0],hoop[1]-38]],'blue',1);
 for(let n=0;n<3;n++){const p=wallPt(H,'nw',1.7+n*.76,3.25,-.18);H.line(R,[[p[0],p[1]],[p[0]+2,p[1]+27]],'sun',1.3);for(let k=0;k<5;k++)oval(H,R,p[0]+(k%2?4:-4),p[1]+8+k*4,3,2,'sun',.65);}
 timber(H,R,9.4,6.03,1.55,1.32,.52,.12,'sun');for(const i of [9.54,10.7])for(const j of [6.14,7.15])timber(H,R,i,j,.12,.12,.03,.49,'sun');
 vessel(H,R,10.12,6.65,.65,6,13,'teal',false);box(H,R,10.5,6.54,.32,.29,.65,.06,'paper',1);
 const hook=wallPt(H,'ne',10.6,3.43,-.19);H.line(R,[hook,[hook[0],hook[1]+12]],'blue',2);
 timber(H,R,2.5,9.16,2.24,1.1,.07,.08,'sun');for(let n=0;n<3;n++){shape(H,R,H.tile(2.69+n*.62,9.28,.5,.75,.16),'paper',1);H.line(R,[H.p(2.73+n*.62,9.44,.17),H.p(3.1+n*.62,9.97,.17)],'coral',.8);}
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
