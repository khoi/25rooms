import { world, shape, oval, stroke, box, actor, wallPt, TAU } from '../../worlds/common.js';
import { timber, metal, drape, bentTube, floorLight, vessel } from '../materials.js';
import { masonry, rackFrame } from '../structure.js';
import { windowBay, caster, panelFront } from '../joinery.js';
import { hands } from './umbrella-ribs.js';
const ease=x=>{const q=Math.max(0,Math.min(1,x));return q*q*(3-2*q);};
function shoe(H,R,x,y,s=1,ink='coral',flex=0){
 const P=(a,b)=>[x+a*s,y+b*s];shape(H,R,[P(-15,0),P(16,-flex),P(20,-4-flex),P(13,-10-flex),P(2,-13),P(-6,-21),P(-15,-18)],ink,.66);
 stroke(H,R,[P(-15,1),P(-2,2),P(13,-flex),P(20,-4-flex)],'blue',3*s);stroke(H,R,[P(-14,-2),P(0,-2),P(15,-3-flex)],'paper',1*s);
 shape(H,R,[P(-12,-17),P(-6,-18),P(1,-12),P(-7,-10)],'blue',.5);
 for(let n=0;n<4;n++)H.line(R,[P(-4+n*3,-11+n*.7),P(-7+n*3,-6+n*.7)],n%2?'sun':'paper',1*s);
 H.line(R,[P(9,-10-flex),P(7,-4-flex)],'blue',.6*s);
}
function last(H,R,i,j,z,s=1){const [x,y]=H.p(i,j,z);shape(H,R,[[x-13*s,y],[x+17*s,y-2*s],[x+19*s,y-7*s],[x+8*s,y-12*s],[x-2*s,y-11*s],[x-7*s,y-19*s],[x-14*s,y-16*s]],'sun',.6);H.line(R,[[x-9*s,y-4*s],[x+11*s,y-6*s]],'coral',.7);H.dot(x-7*s,y-15*s,1.6,'blue');}
const room=world('london-market-shoes','The sole bends back',{wall:false,floor:'paper',tone:.8,head:55},(H,R)=>{
 masonry(H,R,'ne',0,12,0,3.4,'paper',.96);masonry(H,R,'nw',0,12,0,3.4,'teal',.2);
 windowBay(H,R,'nw',2.8,4.8,2.12,.92,{divisions:4});
 for(let n=0;n<22;n++)shape(H,R,H.tile(.2+n*.51,11.16,.33,.44,.02),n%2?'coral':'teal',.45);
 for(const i of [.3,11.7]) metal(H,R,i,.25,.13,.13,0,3.8,'blue');
 const roof=[H.p(.15,.1,3.75),H.p(11.85,.1,3.75),H.p(11.85,2,3.4),H.p(.15,2,3.4)];shape(H,R,roof,'coral',.5);
 for(let n=0;n<12;n++) {const i=.2+n*.96;shape(H,R,[H.p(i,.1,3.76),H.p(i+.43,.1,3.76),H.p(i+.43,2,3.41),H.p(i,2,3.41)],'paper',1);}
 for(const i of [.5,11.5])bentTube(H,R,[[i,.3,2.8],[i,1.9,3.35]],2,'blue');
 H.line(R,[H.p(.15,2,3.4),H.p(11.85,2,3.4)],'blue',2);
 rackFrame(H,R,8.42,.43,3.04,1.92,.04,[.25,1.02,1.9,2.8],'teal',(i,j,w,d,z,n)=>{
  if(n===0){for(let k=0;k<3;k++){const p=H.p(i+.4+k*.87,j+.75,z);shoe(H,R,...p,.65,k===1?'blue':'coral');bentTube(H,R,[[i+.22+k*.87,j+.68,z+.13],[i+.22+k*.87,j+.68,z+.65]],2,'sun');}}
  else if(n===3){for(let k=0;k<3;k++)box(H,R,i+.06+k*.95,j+.16,.8,1.13,z,.4,k===1?'paper':'sun',.65);}
  else for(let k=0;k<3;k++){box(H,R,i+.05+k*.96,j+.16,.83,1.3,z,.35,k===1?'coral':'paper',.55);box(H,R,i+.02+k*.96,j+.12,.89,1.36,z+.35,.05,'paper',1);H.line(R,[H.p(i+.35+k*.96,j+1.48,z+.18),H.p(i+.56+k*.96,j+1.48,z+.18)],'blue',1.2);}
 });
 for(const i of [8.5,11.4])for(const j of [.52,2.28])caster(H,R,i,j);
 drape(H,R,8.44,.38,.5,1.96,3.14,2.83,'paper');
 timber(H,R,.12,1.4,1.17,6.13,.93,.13,'sun');for(const j of [1.65,4.1,7.17])timber(H,R,.25,j,.18,.18,.05,.9,'sun');
 for(let n=0;n<5;n++){last(H,R,.65,1.75+n*1.12,1.08,n===3?.45:.8);}
 for(let n=0;n<4;n++){const p=wallPt(H,'nw',1.2+n*1.5,1.86,-.27);H.line(R,[[p[0],p[1]-4],[p[0],p[1]+4]],'blue',1);shape(H,R,[[p[0]-10,p[1]+3],[p[0]+9,p[1]+2],[p[0]+13,p[1]+18],[p[0]-7,p[1]+21]],n===1?'coral':'paper',.75);for(let k=0;k<4;k++)H.line(R,[[p[0]-5+k*4,p[1]+4],[p[0]-3+k*4,p[1]+18]],k===1?'sun':'blue',.7);}
 floorLight(H,4.6,6,140,.5);
 const ci=4.35,cj=4.7;
 for(let n=0;n<7;n++){
  const a=Math.PI*.92+n*.31, i=ci+Math.cos(a)*2.25,j=cj+Math.sin(a)*2.25,h=.38+n*.14;
  timber(H,R,i,j,.95,1.22,.06,h,'sun');metal(H,R,i+.38,j+.48,.12,.14,h+.06,.25,'teal');last(H,R,i+.48,j+.58,h+.36,.73+n*.055);
  for(let k=0;k<2;k++)H.line(R,[H.p(i+.14,j+1.24,.17+k*.15),H.p(i+.77,j+1.24,.17+k*.15)],'coral',.6);
 }
 timber(H,R,3.92,5.42,3.25,1.12,.18,.46,'teal');panelFront(H,R,4.02,6.55,3.04,.26,.29,3,'teal');
 timber(H,R,3.84,5.35,3.45,1.26,.66,.14,'sun');drape(H,R,3.99,5.49,3.1,.99,.81,.12,'paper');
 metal(H,R,6.53,5.77,.24,.3,.83,.27,'blue');last(H,R,6.65,5.94,1.13,.72);
 for(const i of [4.25,6.78])timber(H,R,i,5.52,.15,.88,.05,.62,'sun');
 timber(H,R,4.2,7,1.68,1.2,.06,.35,'sun');shape(H,R,H.tile(4.31,7.12,1.44,.94,.42),'blue',.24);H.line(R,[H.p(4.49,7.88,.44),H.p(5.63,7.52,.44)],'paper',2.8);
 const gauge=H.p(5.9,6.5,.81);H.line(R,[[gauge[0]-17,gauge[1]],[gauge[0]+12,gauge[1]-12]],'blue',1.4);for(let n=0;n<5;n++)H.line(R,[[gauge[0]-12+n*5,gauge[1]-n*2],[gauge[0]-13+n*5,gauge[1]-4-n*2]],'blue',.7);
 timber(H,R,8.83,6.3,1.67,1.46,.52,.14,'sun');for(const i of [8.96,10.24])for(const j of [6.46,7.52])timber(H,R,i,j,.14,.14,.04,.48,'sun');drape(H,R,8.89,6.38,1.5,1.3,.68,.14,'coral');
 const mirror=[H.p(10.5,6.4,.23),H.p(10.5,7.56,.23),H.p(10.5,7.56,1.66),H.p(10.5,6.4,1.66)];shape(H,R,mirror,'sun',.6);const mp=H.p(10.52,7,1);oval(H,R,mp[0],mp[1],10,19,'paper',1);shoe(H,R,mp[0],mp[1]+10,.35,'blue');
 vessel(H,R,1.27,9.2,0,10,20,'teal');bentTube(H,R,[[1.25,9.2,.3],[1.25,9.2,1.9],[1.57,9.2,1.97]],2,'sun');
 timber(H,R,3.18,8.88,2.27,1.38,.13,.11,'sun');for(let n=0;n<4;n++)box(H,R,3.34+n*.45,9.05,.34,.8,.26,.09,n===2?'coral':'paper',.7);
 const brush=H.p(4.7,9.91,.3);oval(H,R,...brush,11,4,'sun',.65);for(let n=0;n<7;n++)H.line(R,[[brush[0]-8+n*2.4,brush[1]+3],[brush[0]-8+n*2.4,brush[1]+8]],'blue',.8);
},(H,R,t)=>{
 const u=((t%22)+22)%22,lift=ease(u/4.4)*(1-ease((u-13.2)/6.8)),flex=ease((u-4.4)/4.4)*(1-ease((u-13.2)/6.8));
 const [x,y]=H.p(6.7,5.93,1.12+.35*lift);hands(H,R,7.46,5.99,[[x-13,y-8],[x+14,y-7-3*flex]],'teal',-lift);
 shoe(H,R,x,y,.9,'coral',5*flex);
 actor(H,R,4.52,7.32,flex,'sit',{shirt:['coral',.65],face:'se',hairStyle:'curly'},.16,1.45);
 const lace=H.p(6.79,5.92,1.32+.35*lift);stroke(H,R,[lace,[lace[0]+5,lace[1]+6],[lace[0]+3+Math.sin(u*TAU/22)*1.2,lace[1]+11]],'sun',.8);
});room.loopSeconds=22;room.stillTime=11;export default room;
