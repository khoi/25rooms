import { world, shape, oval, stroke, box, actor, ell, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, cushion, caneChair, drape, floorLight, benchFrame, vessel } from '../materials.js';
import { cabinetFrame, masonry } from '../structure.js';
import { recessedFrame } from '../joinery.js';

const rest={...FIGURES.clips.idle.keys[0][1]},seat={drop:.47,ll:84,lr:80,kl:-84,kr:-80};
const base={...rest,...seat,head:12,al:20,ar:28,el:30,er:30};
for(const [name,extra]of[['left',0],['right',7]])FIGURES.clips['cape-town-seam-'+name]={dur:18,keys:[[0,base],[.2,{...base,al:65,ar:68,el:52,er:50}],[.4,{...base,al:94,ar:99,el:40,er:40,head:8}],[.6,{...base,al:94,ar:99,el:40,er:40,head:extra}],[.82,{...base,al:65,ar:68,el:52,er:50}],[.889,base],[1,base]]};
const smooth=(a,b,t)=>{const v=Math.max(0,Math.min(1,(t-a)/(b-a)));return v*v*(3-2*v);};
function quilt(H,R,P,shade=.6){
  shape(H,R,[P(0,0),P(1,0),P(1,1),P(0,1)],'paper',1,.8);
  const inks=['coral','teal','sun','paper'];
  for(let y=0;y<3;y++)for(let x=0;x<5;x++){
    const a=x/5+.008,b=y/3+.008,w=.183,h=.315;
    shape(H,R,[P(a,b),P(a+w,b),P(a+w,b+h),P(a,b+h)],inks[(x+y*2)%4],shade,.45);
    shape(H,R,[P(a+.02,b+.04),P(a+w-.02,b+.04),P(a+w*.5,b+h-.04)],inks[(x+y*2+1)%4],shade*.8,.4);
    for(let k=0;k<4;k++)H.line(R,[P(a+.02+k*.045,b+.012),P(a+.035+k*.045,b+.012)],'blue',.5);
  }
}
const room=world('cape-town-sewing-circle','A seam shared between chairs',{wall:false,floor:'paper',tone:.45,head:65},(H,R)=>{
  masonry(H,R,'ne',0,12,0,3.7,'paper',.7);
  masonry(H,R,'nw',0,12,0,1.1,'teal',.26);
  for(let i=0;i<12;i+=1.1)for(let j=0;j<12;j+=1.1)H.outline(R,H.tile(i,j,1.04,1.04,.015),'blue',.4,{tone:.17});
  for(const [i,j]of[[.15,.15],[.15,11.65],[11.65,.15]])timber(H,R,i,j,.18,.18,0,4.5,'teal');
  timber(H,R,.12,.12,.22,11.8,4.45,.22,'teal');
  timber(H,R,.12,.12,11.8,.22,4.45,.22,'teal');
  const roof=[H.p(.1,.1,4.7),H.p(11.9,.1,4.7),H.p(11.9,1.8,4.35),H.p(.1,1.8,4.35)];shape(H,R,roof,'paper',.9,.8);
  for(let i=.5;i<11.8;i+=.7)H.line(R,[H.p(i,.1,4.72),H.p(i,1.8,4.37)],'teal',.8,{tone:.6});
  bentTube(H,R,[[.15,1.9,4.35],[11.7,1.9,4.35],[11.7,1.9,3.95],[11.7,.35,3.7],[11.7,.35,.15]],3,'blue');
  shape(H,R,H.tile(10.65,.3,.9,.55,.04),'blue',.65);for(let i=10.7;i<11.5;i+=.12)H.line(R,[H.p(i,.32,.05),H.p(i,.83,.05)],'paper',.6);
  recessedFrame(H,R,'ne',.8,3.5,1.2,2.1,'coral',P=>{quilt(H,R,(u,v)=>P(.15+u*3.2,.15+v*1.8),.42);});
  cabinetFrame(H,R,5.3,.25,6.25,1.2,.12,3.2,3,'coral',(x,y,w,d,z,h,n)=>{
    for(const zz of[z+.55,z+1.3,z+2.14])timber(H,R,x,y,w,d,zz,.08,'sun');
    if(n===0){for(let k=0;k<5;k++)drape(H,R,x+.12+(k%2)*.08,y+.07,w-.25,.65,z+.15+k*.09,.12,['teal','sun','coral','paper'][k%4]);for(let k=0;k<4;k++)box(H,R,x+.14+k*.39,y+.15,.26,.6,z+1.4,.42,['sun','teal','paper','coral'][k],.5);}
    if(n===1){const p=H.p(x+.8,y+.5,z+1.39);shape(H,R,[[p[0]-19,p[1]],[p[0]+19,p[1]],[p[0]+19,p[1]-7],[p[0]+9,p[1]-7],[p[0]+9,p[1]-24],[p[0]-13,p[1]-24],[p[0]-16,p[1]-19],[p[0]+2,p[1]-18],[p[0]+2,p[1]-4],[p[0]-19,p[1]-4]],'blue',.85);oval(H,R,p[0]+19,p[1]-18,9,10,'sun',.5);oval(H,R,p[0]+19,p[1]-18,6,7,'blue',.8);H.line(R,[[p[0]-13,p[1]-17],[p[0]-13,p[1]-2]],'paper',1);cushion(H,R,x+.13,y+.14,w-.25,.67,z+.62,.18,'paper');}
    if(n===2){for(let k=0;k<3;k++){box(H,R,x+.08,y+.15,w-.16,.8,z+.12+k*.22,.19,'teal',.5);const p=H.p(x+w/2,y+.97,z+.2+k*.22);oval(H,R,...p,4,1.8,'sun');}const p=H.p(x+.8,y+.8,z+1.58);H.outline(R,ell(...p,16,12),'sun',3);H.line(R,[[p[0]+12,p[1]-9],[p[0]+18,p[1]-12]],'blue',1);}
    for(let k=0;k<3;k++){const p=H.p(x+.3+k*.51,y+.6,z+2.25);oval(H,R,p[0],p[1],4,2,'sun');shape(H,R,[[p[0]-3,p[1]],[p[0]+3,p[1]],[p[0]+3,p[1]-9],[p[0]-3,p[1]-9]],k%2?'coral':'teal',.65,.4);oval(H,R,p[0],p[1]-9,4,2,'paper');}
  });
  for(const j of[1.55,4.6,7.65]){
    timber(H,R,.3,j,.15,.15,1.08,2.7,'teal');
    bentTube(H,R,[[.35,j,3.8],[.7,j,3.2],[.7,j,1.2]],1.3,'sun');
  }
  timber(H,R,.3,1.55,.18,6.3,3.74,.13,'sun');
  timber(H,R,.28,1.62,.62,6.2,2.42,.1,'teal');
  for(let k=0;k<6;k++){
    const j=1.95+k*.88,p=H.p(.62,j,2.57);
    oval(H,R,p[0],p[1],7,3.2,'sun',.7);shape(H,R,[[p[0]-5,p[1]],[p[0]+5,p[1]],[p[0]+5,p[1]-15],[p[0]-5,p[1]-15]],['coral','teal','paper'][k%3],.75,.6);oval(H,R,p[0],p[1]-15,7,3.2,'sun',.7);
    for(let m=0;m<3;m++)H.line(R,[[p[0]-5,p[1]-4-m*4],[p[0]+5,p[1]-4-m*4]],'paper',.55);
  }
  for(const j of[2.1,5.1]){
    const P=(u,v)=>H.p(.46,j+u,3.52-v);
    H.line(R,[P(0,0),P(1.45,0)],'blue',2);
    quilt(H,R,(u,v)=>P(u*1.45,.05+v*.78),.55);
    for(const u of[.15,1.3])H.line(R,[P(u,-.03),P(u,.17)],'coral',2.5);
  }
  for(const j of[2,5.75])for(const i of[.4,1.9])timber(H,R,i,j,.14,.15,.05,.92,'sun');
  timber(H,R,.35,1.95,1.8,4.1,.93,.15,'sun');
  timber(H,R,.42,2,1.62,4.03,.25,.08,'coral');
  for(let k=0;k<3;k++){
    const j=2.18+k*1.22;
    shape(H,R,H.faceJ(2.04,j,1.06,.39,.84),'coral',.6,.7);
    H.line(R,[H.p(2.06,j+.36,.69),H.p(2.06,j+.7,.69)],'sun',2.4);
  }
  const machine=H.p(1.13,3.6,1.15);
  shape(H,R,[[machine[0]-26,machine[1]+4],[machine[0]+28,machine[1]+4],[machine[0]+28,machine[1]-3],[machine[0]+14,machine[1]-3],[machine[0]+14,machine[1]-31],[machine[0]+7,machine[1]-38],[machine[0]-21,machine[1]-35],[machine[0]-26,machine[1]-29],[machine[0]-24,machine[1]-20],[machine[0]-16,machine[1]-20],[machine[0]-16,machine[1]-27],[machine[0]+3,machine[1]-27],[machine[0]+3,machine[1]-2],[machine[0]-26,machine[1]-2]],'blue',.87,1);
  oval(H,R,machine[0]+18,machine[1]-25,13,14,'sun',.7);oval(H,R,machine[0]+18,machine[1]-25,9,10,'blue',.8);
  for(let k=0;k<6;k++){const a=k*Math.PI/3;H.line(R,[[machine[0]+18,machine[1]-25],[machine[0]+18+Math.cos(a)*10,machine[1]-25+Math.sin(a)*11]],'paper',.8);}
  stroke(H,R,[[machine[0]+28,machine[1]-25],[machine[0]+34,machine[1]-25],[machine[0]+34,machine[1]-16],[machine[0]+40,machine[1]-16]],'sun',2.1);
  H.line(R,[[machine[0]-21,machine[1]-21],[machine[0]-21,machine[1]+1]],'paper',1.1);
  H.line(R,[[machine[0]-12,machine[1]-36],[machine[0]-12,machine[1]-44]],'sun',3);
  stroke(H,R,[[machine[0]-12,machine[1]-42],[machine[0]-24,machine[1]-32],[machine[0]-21,machine[1]-20]],'coral',.7);
  drape(H,R,1.2,3.85,.75,.9,1.1,.52,'teal');
  shape(H,R,H.tile(.62,5.13,1.16,.66,1.1),'paper',1,.6);
  for(let k=0;k<3;k++)shape(H,R,H.tile(.74+k*.2,5.2,.3,.42,1.12+k*.01),['coral','sun','teal'][k],.45,.5);
  const scissors=H.p(1.72,5.48,1.16);for(const dx of[-4,4])H.outline(R,ell(scissors[0]+dx,scissors[1]+4,4,3),'blue',1.3);H.line(R,[[scissors[0]-4,scissors[1]+1],[scissors[0]+8,scissors[1]-12]],'paper',2);H.line(R,[[scissors[0]+4,scissors[1]+1],[scissors[0]-6,scissors[1]-12]],'blue',1.4);
  const hammock=[H.p(10.15,1.48,1.04),H.p(10.75,1.48,1.04),H.p(10.55,1.49,.79),H.p(10.3,1.49,.78)];shape(H,R,hammock,'paper',.9);oval(H,R,...H.p(10.45,1.5,.98),7,4,'sun',.6);
  floorLight(H,4.8,6.4,170,.42);
  const i=3.1,j=4.55,w=4.7,d=2.45,z=1.02;
  for(const x of[i+.2,i+w-.2]){bentTube(H,R,[[x,j+.2,.08],[x,j+d-.2,z],[x,j+d-.1,.08],[x,j+.2,z]],3,'teal');metal(H,R,x-.09,j+d/2,.18,.17,.55,.12,'coral');}
  for(const y of[j+.35,j+d-.35])timber(H,R,i+.2,y,w-.4,.1,.32,.08,'teal');
  for(let k=0;k<4;k++)drape(H,R,i+.35+k*.23,j+.55,1.3,1.28,.42+k*.095,.14,['paper','teal','sun','coral'][k]);
  for(const x of[i+.2,i+w-.2])H.line(R,[H.p(x,j+.32,.23),H.p(x,j+d-.3,.9)],'sun',1.5);
  for(const y of[j,j+d])timber(H,R,i,y,w,.15,z,.14,'sun');for(const x of[i,i+w-.14])timber(H,R,x,j,.14,d,z,.14,'sun');
  for(const x of[i+.15,i+w-.15])for(const y of[j+.12,j+d-.04])metal(H,R,x-.09,y-.07,.18,.2,z+.14,.055,'teal');
  quilt(H,R,(u,v)=>H.p(i+.2+u*(w-.4),j+.15+v*1.2,z+.16),.53);
  for(const x of[3.4,7.45])for(const y of[4.73,6.8])metal(H,R,x,y,.12,.2,1.18,.06,'blue');
  metal(H,R,7.45,4.52,.27,.23,1.17,.09,'blue');oval(H,R,...H.p(7.57,4.63,1.32),5,3,'sun',.75);
  benchFrame(H,R,9.5,10.85,.78,.68,.34,'coral');cushion(H,R,9.52,10.88,.72,.62,.35,.09,'sun');
  for(const [ci,cj]of[[3.55,7.65],[7.35,7.65]])caneChair(H,R,ci-.45,cj-.3,'coral');
  benchFrame(H,R,.7,8.6,1.75,1.25,.62,'teal');
  timber(H,R,.8,8.7,1.55,1.04,.22,.09,'teal');
  for(let k=0;k<4;k++)box(H,R,.9+k*.32,8.83,.26,.72,.32,.18,['sun','paper','teal','coral'][k],.7);
  shape(H,R,H.faceJ(2.4,8.65,1.1,.68,1.34),'sun',.46,.7);
  for(const j of[8.8,9.45]){const p=H.p(2.41,j,1.13);H.outline(R,ell(...p,4,4),'blue',1.1);H.dot(...p,1.2,'coral');}
  const egg=H.p(2.12,9.65,.69);oval(H,R,...egg,6,9,'sun',.85);H.line(R,[[egg[0],egg[1]+7],[egg[0]-2,egg[1]+15]],'blue',2);

  const hoop=H.p(1.48,9.15,.71);oval(H,R,...hoop,17,10,'paper',1);H.outline(R,ell(...hoop,17,10),'sun',3);H.line(R,[[hoop[0]-10,hoop[1]],[hoop[0],hoop[1]-5],[hoop[0]+10,hoop[1]+2]],'coral',1.2);H.line(R,[[hoop[0]+11,hoop[1]+4],[hoop[0]+19,hoop[1]+12]],'blue',.6);
  box(H,R,.95,10.05,.75,.3,.01,.18,'paper',1);for(let k=0;k<3;k++)H.line(R,[H.p(1.02,10.15,.2+k*.01),H.p(1.52,10.16,.2+k*.01)],k?'teal':'blue',1.4);
  benchFrame(H,R,9,7.8,2.15,1.5,.68,'sun');
  cushion(H,R,9.15,8,.6,.5,.7,.12,'coral');vessel(H,R,10.4,8.3,.75,7,14,'teal',false);
  for(const i of[9.4,10]){const p=H.p(i,8.7,.72);oval(H,R,...p,6,2,'paper');shape(H,R,[[p[0]-4,p[1]],[p[0]+4,p[1]],[p[0]+4,p[1]-8],[p[0]-4,p[1]-8]],'sun',.65,.5);}
  bentTube(H,R,[[11.2,7.6,.05],[10.9,7.55,1.9],[10.7,7.55,2]],2,'coral');
  for(let k=0;k<3;k++)cushion(H,R,9.2,9.7,1.3,.9,.08+k*.14,.14,['teal','coral','paper'][k]);
  const basket=H.p(5.4,10.52,.1);
  shape(H,R,[[basket[0]-27,basket[1]-19],[basket[0]+28,basket[1]-19],[basket[0]+23,basket[1]+3],[basket[0]-22,basket[1]+3]],'sun',.62,.9);
  oval(H,R,basket[0],basket[1]-19,28,11,'blue',.65);
  for(let k=0;k<5;k++)H.line(R,[[basket[0]-24+k*11,basket[1]-17],[basket[0]-20+k*10,basket[1]+2]],'coral',.8);
  for(let k=0;k<3;k++)H.line(R,[[basket[0]-25,basket[1]-13+k*6],[basket[0]+26,basket[1]-13+k*6]],'paper',.8);
  drape(H,R,4.85,10.15,1.12,.65,.64,.57,'teal');
  shape(H,R,H.tile(5.8,10.29,.7,.62,.69),'coral',.58,.6);
  for(const j of[10.3,10.8])bentTube(H,R,[[4.8,j,.58],[4.8,j,1],[6.2,j,1],[6.2,j,.58]],1.6,'sun');
  timber(H,R,.25,11.3,.22,.22,0,2.6,'teal');metal(H,R,.4,11.35,.3,.15,1.24,.16,'sun');
},(H,R,t)=>{
  const u=((t%18)+18)%18,contact=smooth(.6,3.6,u)*(1-smooth(14.8,16,u));
  const left={who:'adult',at:[3.55,7.7,.24],face:'se',clip:'cape-town-seam-left',scale:1.55};
  const right={who:'adult',at:[7.35,7.7,.24],face:'sw',clip:'cape-town-seam-right',scale:1.55};
  const L=FIGURES.pose(left,t,room,H).nearHand,Q=FIGURES.pose(right,t,room,H).nearHand;
  const baseL=H.p(3.32,6.95,1.2),baseR=H.p(7.56,6.95,1.2);
  const a=baseL.map((v,k)=>v+(L[k]-v)*contact),b=baseR.map((v,k)=>v+(Q[k]-v)*contact),backL=H.p(3.32,5.86,1.2),backR=H.p(7.56,5.86,1.2);
  const P=(x,y)=>[backL[0]*(1-x)*(1-y)+backR[0]*x*(1-y)+a[0]*(1-x)*y+b[0]*x*y,backL[1]*(1-x)*(1-y)+backR[1]*x*(1-y)+a[1]*(1-x)*y+b[1]*x*y+Math.sin(x*Math.PI)*5*contact*y];
  quilt(H,R,P,.58);
  shape(H,R,[P(.32,.78),P(.59,.78),P(.59,.97),P(.32,.97)],'teal',.8,.6);
  shape(H,R,[P(.38,.8),P(.48,.8),P(.48,.92),P(.38,.92)],'sun',.8,.5);
  for(let k=0;k<11;k++)H.line(R,[P(.32+k*.025,.76),P(.328+k*.025,.79)],'paper',.9);
  actor(H,R,...left.at.slice(0,2),t,left.clip,{shirt:['teal',.8],hairStyle:'bun',glasses:true},.24,1.55);
  actor(H,R,...right.at.slice(0,2),t,right.clip,{face:'sw',shirt:['coral',.7],hairStyle:'curly'},.24,1.55);
  for(const p of[a,b])oval(H,R,p[0],p[1],2.6,2.2,'coral',.35);
  for(const [i,j]of[[3.4,6.8],[7.45,6.8]]){const p=H.p(i,j,1.25);H.line(R,[[p[0]-3,p[1]],[p[0]+3,p[1]-contact*6]],'blue',2);}
  const first=H.p(1,.3,3.7),last=H.p(4.6,.3,3.7);stroke(H,R,[first,[(first[0]+last[0])/2,(first[1]+last[1])/2+12],last],'blue',.7);for(let k=0;k<6;k++){const f=(k+1)/7,x=first[0]+(last[0]-first[0])*f,y=first[1]+(last[1]-first[1])*f+Math.sin(f*Math.PI)*12;oval(H,R,x+Math.sin(u*Math.PI/9+k)*1.2,y+4,3,4,k%2?'teal':'coral',.6);}
});
room.loopSeconds=18;
room.stillTime=8.8;
export default room;
