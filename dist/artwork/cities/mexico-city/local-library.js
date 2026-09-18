import { world, shape, stroke, oval, ell, loop, actor, TAU } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, benchFrame, cushion, slattedSeat, drape, vessel } from '../materials.js';
import { windowBay, wallRack, caster, hangingRail, taskLight } from '../joinery.js';

const ease=(a,b,t)=>{const q=Math.max(0,Math.min(1,(t-a)/(b-a)));return q*q*(3-2*q);};
const base=FIGURES.sample('idle',0),seat=FIGURES.sample('sit',0);
FIGURES.clips.mexicoLibraryReader={dur:22,keys:[[0,{...base,head:13,al:-50,ar:55,el:-45,er:40}],[.2,{...base,head:8,al:-82,ar:91,el:-25,er:21}],[.4,{...base,head:10,al:-88,ar:90,el:-20,er:22}],[.6,{...base,head:15,al:-88,ar:90,el:-20,er:22}],[.91,{...base,head:13,al:-50,ar:55,el:-45,er:40}],[1,{...base,head:13,al:-50,ar:55,el:-45,er:40}]]};
FIGURES.clips.mexicoLibraryChildOne={dur:22,keys:[[0,{...seat,head:-12,ar:25,er:30}],[.4,{...seat,head:-14,ar:25,er:30}],[.48,{...seat,head:-12,ar:116,er:8}],[.63,{...seat,head:-12,ar:116,er:8}],[.78,{...seat,head:-12,ar:25,er:30}],[1,{...seat,head:-12,ar:25,er:30}]]};
FIGURES.clips.mexicoLibraryChildTwo={dur:22,keys:[[0,{...seat,head:-10,al:30,ar:35}],[.45,{...seat,head:-14,al:30,ar:35}],[.63,{...seat,head:-4,al:102,el:20,ar:35}],[.88,{...seat,head:-10,al:30,ar:35}],[1,{...seat,head:-10,al:30,ar:35}]]};

function cardBird(H,R,x,y,s=1,ink='coral') {
  shape(H,R,[[x-12*s,y],[x-8*s,y-10*s],[x,y-6*s],[x+7*s,y-17*s],[x+13*s,y-10*s],[x+19*s,y-10*s],[x+13*s,y-6*s],[x+9*s,y+2*s],[x-2*s,y+5*s]],ink,.65,.75);
  shape(H,R,[[x-9*s,y-8*s],[x+5*s,y-1*s],[x-2*s,y+4*s]],'paper',1,.5);H.dot(x+10*s,y-11*s,s,'blue');H.line(R,[[x+3*s,y+4*s],[x+3*s,y+10*s],[x+8*s,y+10*s]],'blue',.8);
}

function bookRow(H,R,P,z,width,seed) {
  let x=.18,n=0;while(x<width-.23){const w=.12+(n%3)*.035,h=.35+((n*3+seed)%5)*.055,ink=['paper','coral','teal','sun','teal'][n%5];shape(H,R,[P(x,z),P(x+w,z),P(x+w,z+h),P(x,z+h)],ink,ink==='paper'?1:.64,.45);H.line(R,[P(x+.025,z+.08),P(x+w-.02,z+.08)],'sun',.7);x+=w+.032;n++;if(n===5)x+=.13;}
}

const room=world('mexico-city-local-library','The story has a wide page',{wall:'paper',wallTone:1,height:4.1,floor:'paper',tone:.7,head: 10},(H,R)=>{
  windowBay(H,R,'ne',3.2,7.7,2.1,1.67,{divisions:4,view:P=>{for(let n=0;n<4;n++){shape(H,R,[P(n*1.8,.1),P(n*1.8+1.2,.1),P(n*1.8+1.2,.68),P(n*1.8+.1,.85)],'teal',.22);H.line(R,[P(n*1.8+.7,.1),P(n*1.8+.7,.5)],'paper',2);}}});
  for(const side of ['nw','ne'])for(let n=.5;n<12;n+=.75){const q=side==='nw'?H.tile(.1,n,.45,.58,.015):H.tile(n,.1,.58,.45,.015);shape(H,R,q,'teal',.2);H.dot(...q[0],1.1,'coral');}
  wallRack(H,R,'nw',.65,9.8,.15,3.33,4,'sun',(P,z,row,gap)=>{
    for(let bay=0;bay<4;bay++){
      const off=bay*2.35+.12,Q=(u,v,d)=>P(off+u,v,d);
      H.line(R,[Q(0,z),Q(0,z+gap-.08)],'blue',2.2);
      if(row===0&&bay===0){shape(H,R,[Q(.15,z+.05),Q(2.02,z+.05),Q(2.02,z+.59),Q(.15,z+.59)],'teal',.55);H.line(R,[Q(.68,z+.31),Q(1.4,z+.31)],'blue',2.3);}
      else if(row===0&&bay===2){for(let k=0;k<3;k++){const [x,y]=Q(1.07,z+.12+k*.14,.4);oval(H,R,x,y,17,5,['coral','paper','teal'][k],.68);}}
      else if(row===2&&bay===3){for(let k=0;k<3;k++){const [x,y]=Q(.4+k*.63,z+.13,.4);cardBird(H,R,x,y,.4,['paper','sun','teal'][k]);}}
      else if(row===1&&bay===1){for(let k=0;k<3;k++){const q=[Q(.15+k*.68,z+.05),Q(.75+k*.68,z+.05),Q(.75+k*.68,z+.59),Q(.15+k*.68,z+.59)];shape(H,R,q,'paper',1);H.dot(...Q(.44+k*.68,z+.41),4,['coral','sun','teal'][k]);}}
      else if(row===3&&bay===0){const [x,y]=Q(1,z+.18,.42);oval(H,R,x,y,11,13,'teal',.7);oval(H,R,x,y-15,9,8,'paper');H.dot(x-3,y-17,1.3,'blue');H.dot(x+3,y-17,1.3,'blue');shape(H,R,[[x-6,y-1],[x+1,y-2],[x+2,y+5],[x-5,y+6]],'coral',.5);H.line(R,[[x-10,y-7],[x-17,y+1]],'teal',3);H.line(R,[[x+10,y-7],[x+17,y+1]],'teal',3);}
      else bookRow(H,R,Q,z+.05,2.12,bay+row);
    }
  });
  for(const j of [.64,3.04,5.38,7.73,10.13])timber(H,R,.12,j,.5,.12,.16,3.33,'sun');
  timber(H,R,.1,.61,.58,9.94,.08,.12,'teal');
  timber(H,R,.09,.61,.58,9.94,3.49,.11,'teal');
  timber(H,R,3.16,.18,7.77,.2,1.83,.17,'teal');
  for(const i of [3.25,5.65,8.03,10.48])timber(H,R,i,.19,.13,1.53,.15,1.07,'sun');
  timber(H,R,3.19,.16,7.53,1.67,.16,.12,'teal');
  for(const [i,ink] of [[3.51,'coral'],[5.99,'teal'],[8.29,'paper']])for(let k=0;k<2;k++)cushion(H,R,i+.15,.6,1.45,1.0,.29+k*.2,.16,k?'paper':ink);
  timber(H,R,3.17,.15,7.64,1.69,1.18,.16,'sun');
  for(const [i,ink] of [[3.51,'coral'],[5.99,'teal'],[8.29,'paper']])cushion(H,R,i,.38,1.72,1.22,1.35,.17,ink);
  const ledge=H.p(6.98,.63,1.37);shape(H,R,[[ledge[0]-7,ledge[1]-2],[ledge[0]+7,ledge[1]-2],[ledge[0]+7,ledge[1]-16],[ledge[0]-7,ledge[1]-16]],'paper',1);oval(H,R,ledge[0]+9,ledge[1]-10,4,5,'sun',.5);
  timber(H,R,.2,10.8,.8,.76,.05,1.6,'teal');shape(H,R,H.faceJ(1,10.86,.6,.77,1.06),'blue',.72);H.line(R,[H.p(1.015,10.92,1.02),H.p(1.015,11.36,1.02)],'sun',1.2);
  const [bx,by]=H.p(.6,8.8,3.58);cardBird(H,R,bx,by,.55,'coral');
  const [gx,gy]=H.p(2.25,.55,2.22);oval(H,R,gx,gy,18,17,'teal',.43);H.outline(R,ell(gx,gy,9,17),'paper',1);H.line(R,[[gx-16,gy-4],[gx+16,gy+4]],'sun',1.2);stroke(H,R,[[gx-15,gy-19],[gx-22,gy],[gx-9,gy+20],[gx+18,gy+11]],'blue',1.6);H.line(R,[[gx,gy+18],[gx,gy+29]],'blue',2);oval(H,R,gx,gy+31,11,4,'sun');
  const rug=[];for(let n=0;n<=24;n++){const a=Math.PI*n/24;rug.push(H.p(6.3+Math.cos(a)*4.5,6.65+Math.sin(a)*3.75,.025));}rug.push(H.p(1.8,5.65,.025),H.p(10.8,5.65,.025));shape(H,R,rug,'teal',.17);H.outline(R,rug,'coral',1.6);for(const a of [.3,.7,1.1,1.5,1.9,2.3,2.7])H.line(R,[H.p(6.3+Math.cos(a)*3.96,6.65+Math.sin(a)*3.3,.027),H.p(6.3+Math.cos(a)*4.27,6.65+Math.sin(a)*3.57,.027)],'sun',2);
  for(const [i,j,ink] of [[4.2,8,'sun'],[7.7,8.2,'coral'],[6.1,9.7,'teal']]){benchFrame(H,R,i,j,1.25,1.08,.45,ink);cushion(H,R,i-.02,j-.02,1.29,1.12,.46,.12,'paper');}
  drape(H,R,4.17,8.05,1.3,.88,.6,.35,'teal');H.line(R,[H.p(4.2,8.7,.61),H.p(5.4,8.7,.61)],'sun',1.5);
  shape(H,R,H.faceI(6.18,10.79,.85,.12,.34),'blue',.6);shape(H,R,H.faceI(6.24,10.8,.56,.14,.33),'coral',.64);
  H.tint(H.tile(4.87,5.03,2.64,2.58,.028),'blue',.13);
  for(const x of [5.02,7.0]){timber(H,R,x,5.15,.22,2.16,.05,.18,'sun');bentTube(H,R,[[x+.12,5.35,.2],[x+.12,6.17,1.25],[x+.12,7.16,.2]],2.7,'teal');}
  for(const x of [5.14,7.12]){shape(H,R,[H.p(x,5.68,.2),H.p(x,6.19,1.21),H.p(x,6.53,1.21),H.p(x,7.13,.2)],'sun',.43);H.line(R,[H.p(x,6.01,.55),H.p(x,6.64,.55)],'teal',1.3);H.dot(...H.p(x,6.21,1.07),3,'teal');H.dot(...H.p(x,6.21,1.07),1.1,'sun');}
  timber(H,R,5.12,6.1,2.02,.18,.68,.14,'sun');metal(H,R,6.01,5.98,.48,.48,.75,.44,'teal');oval(H,R,...H.p(6.24,6.22,1.21),15,7,'blue');oval(H,R,...H.p(6.24,6.22,1.23),12,5,'sun');
  bentTube(H,R,[[6.24,6.32,1.1],[6.85,6.73,.86],[7.05,6.76,.88]],1.8,'teal');metal(H,R,6.82,6.62,.24,.24,.85,.1,'coral');
  metal(H,R,5.58,6.57,.26,.21,.61,.12,'coral');bentTube(H,R,[[5.7,6.67,.69],[6.05,6.84,.8],[6.38,6.54,1.02]],1.6,'teal');
  const [lockx,locky]=H.p(5.7,6.7,.7);oval(H,R,lockx,locky,4,3,'sun');H.line(R,[[lockx,locky],[lockx+8,locky+3]],'blue',1.1);
  slattedSeat(H,R,10.22,4.9,1.47,.02,'sun',.85);shape(H,R,H.tile(10.05,6.0,1.62,1.63,.025),'teal',.16);bentTube(H,R,[[11.37,5.94,.07],[11.4,5.94,1.23],[11.1,5.94,1.31]],1.8,'coral');
  hangingRail(H,R,'ne',10.8,.8,1.75,2,(P,u,n)=>{if(n===0){shape(H,R,[P(u-.21,-.22),P(u+.2,-.22),P(u+.29,-.86),P(u-.24,-.85)],'coral',.54);}else H.line(R,[P(u,-.18),P(u,-.95)],'teal',2.5);});
  for(const p of [[9.33,2.07],[10.93,2.07],[9.33,3.7],[10.93,3.7]])caster(H,R,...p);metal(H,R,9.18,1.94,1.9,1.86,.3,.08,'teal');metal(H,R,9.18,1.94,1.9,1.86,1.12,.08,'teal');for(const x of [9.23,10.92])metal(H,R,x,2.03,.1,1.65,.3,.94,'teal');for(let n=0;n<6;n++)shape(H,R,H.faceI(9.36+n*.23,3.25,.17,1.2,1.72+(n%3)*.1),['paper','coral','sun'][n%3],.65,.55);
  for(const j of [6.56,7.72]){const [x,y]=H.p(11.41,j,.12);oval(H,R,x,y,7,7,'blue',.75);oval(H,R,x,y,3,3,'sun');}
  bentTube(H,R,[[11.37,6.57,.1],[10.48,7.34,.9],[10.28,7.9,1.47]],2,'teal');
  bentTube(H,R,[[11.38,7.7,.1],[10.45,6.67,1.0],[10.12,6.67,1.47]],2,'teal');
  shape(H,R,[H.p(10.54,6.68,.96),H.p(11.2,6.85,.56),H.p(11.19,7.64,.56),H.p(10.5,7.58,.94)],'coral',.43);drape(H,R,10.71,6.88,.55,.56,.69,.15,'paper');
  const [tbx,tby]=H.p(11.12,5.47,.73);vessel(H,R,11.12,5.47,.73,5,16,'teal',false);
  benchFrame(H,R,1.39,7.58,2.0,1.4,.95,'teal');
  for(let k=0;k<3;k++){timber(H,R,1.51+k*.05,7.68+k*.04,1.11,.9,.99+k*.055,.045,'coral');shape(H,R,H.tile(1.57+k*.05,7.74+k*.04,.98,.78,1.039+k*.055),'paper',1);}
  const [rrx,rry]=H.p(2.86,8.14,.98);oval(H,R,rrx,rry,9,4,'sun');oval(H,R,rrx,rry-5,9,4,'paper');oval(H,R,rrx,rry-5,4,2,'teal');stroke(H,R,[[rrx+7,rry-2],[rrx+20,rry+4],[rrx+17,rry+9]],'coral',2);
  taskLight(H,R,1.77,7.62,1.0,'sun',.47);
  drape(H,R,1.55,8.58,.74,.27,.97,.4,'paper');H.line(R,[H.p(1.61,8.88,.67),H.p(2.21,8.88,.67)],'coral',2);
  benchFrame(H,R,2.2,9.7,1.45,1.1,.41,'sun');const [tx,ty]=H.p(2.73,10.18,.43);cardBird(H,R,tx,ty,.43,'sun');shape(H,R,H.tile(2.97,9.84,.43,.5,.45),'teal',.42);oval(H,R,...H.p(2.47,10.5,.44),7,5,'paper');H.outline(R,ell(...H.p(2.47,10.5,.445),5,3),'teal',1);
  timber(H,R,8.84,10.25,2.39,1.1,.06,.18,'teal');shape(H,R,H.tile(8.95,10.34,2.17,.9,.25),'paper',1);
  shape(H,R,H.tile(9.08,10.51,.62,.52,.27),'coral',.6);shape(H,R,[H.p(9.88,10.5,.27),H.p(10.46,10.5,.27),H.p(10.17,10.93,.27)],'sun',.7);oval(H,R,...H.p(10.78,10.73,.27),7,4,'teal',.5);
  shape(H,R,H.tile(9.19,10.58,.23,.3,.28),'paper',1);shape(H,R,H.tile(8.48,10.42,.23,.3,.04),'coral',.65);
  const [nbx,nby]=H.p(7.57,10.53,.04);shape(H,R,[[nbx-11,nby],[nbx+11,nby],[nbx+13,nby-18],[nbx-12,nby-18]],'sun',.5);oval(H,R,nbx,nby-18,12,4,'paper');H.line(R,[[nbx-10,nby-8],[nbx+10,nby-8]],'teal',1.2);cardBird(H,R,nbx,nby-21,.49,'teal');
  const mobile=H.p(7.7,.65,3.9);H.line(R,[[mobile[0],mobile[1]],[mobile[0],mobile[1]+27]],'blue',.7);H.line(R,[[mobile[0]-24,mobile[1]+24],[mobile[0]+23,mobile[1]+31]],'sun',1.2);for(let n=0;n<3;n++){const x=mobile[0]-21+n*21;H.line(R,[[x,mobile[1]+25+n*3],[x,mobile[1]+47+n*3]],'blue',.6);shape(H,R,[[x-7,mobile[1]+46+n*3],[x,mobile[1]+37+n*3],[x+7,mobile[1]+46+n*3]],['teal','coral','paper'][n],.6);}
},(H,R,t)=>{
  const u=((t%22)+22)%22,turn=ease(4.4,8.8,u)*(1-ease(13.2,20,u)),a=-.93+.29*turn;
  actor(H,R,6.27,5.58,u,'mexicoLibraryReader',{shirt:['coral',.58],hairStyle:'short',glasses:true,face:'se'},0,1.68);
  const P=(x,v,h=0)=>H.p(6.24+Math.cos(a)*x-Math.sin(a)*v*.27,6.22+Math.sin(a)*x+Math.cos(a)*v*.27,1.2+v*.84+h);
  shape(H,R,[P(-2.2,-.07,-.1),P(2.2,-.07,-.1),P(2.2,1.47,-.1),P(-2.2,1.47,-.1)],'sun',.65,1.2);
  for(let k=0;k<3;k++)shape(H,R,[P(-2.12,-.02+k*.014,-.045+k*.014),P(2.12,-.02+k*.014,-.045+k*.014),P(2.12,1.43,-.045+k*.014),P(-2.12,1.43,-.045+k*.014)],'paper',1,.55);
  shape(H,R,[P(-2.12,0),P(2.12,0),P(2.12,1.43),P(-2.12,1.43)],'teal',.75,1.2);
  for(const s of [-1,1]){
    shape(H,R,[P(.05*s,.1,.025),P(2.01*s,.1,.025),P(2.01*s,1.35,.025),P(.05*s,1.35,.075)],'paper',1,.8);
    H.line(R,[P(.14*s,.14,.06),P(1.94*s,.14,.045)],'sun',1.5);
  }
  H.line(R,[P(0,.08,.08),P(0,1.39,.08)],'blue',1.2);
  shape(H,R,[P(-1.9,.22,.055),P(-.25,.22,.055),P(-.25,.5,.055),P(-.85,1.1,.055),P(-1.2,.65,.055),P(-1.7,1.02,.055),P(-1.9,.62,.055)],'teal',.55);
  shape(H,R,[P(.19,.2,.055),P(1.86,.2,.055),P(1.86,.53,.055),P(1.2,.92,.055),P(.62,.54,.055),P(.19,.71,.055)],'coral',.62);
  const sun=[];for(let n=0;n<20;n++){const b=n*TAU/20;sun.push(P(1.42+Math.cos(b)*.22,1.02+Math.sin(b)*.22,.055));}shape(H,R,sun,'sun',.86,.6);
  shape(H,R,[P(.52,.28,.06),P(.89,.28,.06),P(.89,.7,.06),P(.52,.7,.06)],'paper',1,.6);shape(H,R,[P(.62,.28,.07),P(.77,.28,.07),P(.77,.5,.07),P(.62,.5,.07)],'blue',.63,.45);
  for(const x of [-1.82,1.82]){H.line(R,[P(x,0,.09),P(x,.2,.09)],'coral',3);H.line(R,[P(x,1.19,.09),P(x,1.41,.09)],'coral',3);}
  shape(H,R,[P(-2.02,.12,.08),P(-1.66,.12,.08),P(-1.66,.39,.08),P(-2.02,.39,.08)],'coral',.4,.55);H.outline(R,[P(-2.02,.12,.08),P(-1.66,.12,.08),P(-1.66,.39,.08),P(-2.02,.39,.08)],'teal',.7,{dash:[2,3]});
  actor(H,R,4.8,8.46,u,'mexicoLibraryChildOne',{shirt:['sun',.7],hairStyle:'curly',face:'se'},.2,1.7,'child');
  actor(H,R,8.24,8.65,u,'mexicoLibraryChildTwo',{shirt:['teal',.65],hairStyle:'pony',face:'sw'},.2,1.7,'child');
  const [cx,cy]=H.p(11.06,.3,2.37);shape(H,R,[[cx-6,cy-43],[cx+8,cy-41],[cx+8+Math.sin(TAU*u/22)*2,cy+11],[cx-8,cy+9]],'paper',1,.7);H.line(R,[[cx,cy-40],[cx+2,cy+7]],'sun',.7);
});
room.loopSeconds=22;
room.stillTime=11;
export default room;
