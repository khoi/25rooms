import { world, shape, oval, stroke, actor, ell, wallPt } from '../../worlds/common.js';
import { FIGURES } from '../../drawings.js';
import { timber, metal, bentTube, benchFrame, drape, cushion } from '../materials.js';
import { masonry, rackFrame } from '../structure.js';
import { windowBay, caster, taskLight, hangingRail } from '../joinery.js';

const rest = { ...FIGURES.clips.idle.keys[0][1] };
const rig = { ...rest, head: 12, al: 24, el: 40 };
FIGURES.clips['barcelona-factory-hinge'] = { dur: 20, keys: [[0, rig], [1, rig]] };
const ease = (a, b, t) => { const u = Math.max(0, Math.min(1, (t - a) / (b - a))); return u * u * (3 - 2 * u); };
const foldAt = t => ease(4, 8, t) * (1 - ease(12, 18, t));
function contact(H, target) {
  const p = H.p(3.85, 3.15), s = 1.65, dx = (target[0] - p[0]) / s - 5.2, dy = (target[1] - p[1]) / s + 32.5;
  const a = 4.368, b = 4.2, d = Math.min(8.55, Math.hypot(dx, dy));
  const bend = Math.acos(Math.max(-1, Math.min(1, (d * d - a * a - b * b) / (2 * a * b))));
  rig.ar = (Math.atan2(dx, dy) - Math.atan2(b * Math.sin(bend), a + b * Math.cos(bend))) * 180 / Math.PI;
  rig.er = bend * 180 / Math.PI;
}
function shade(H, R, p, w = 25, crooked = false) {
  const q = [[p[0] - w * .38, p[1] - 14], [p[0] + w * .38, p[1] - 14], [p[0] + w, p[1] + 12], [p[0] - w, p[1] + 12]];
  shape(H, R, q, 'paper', 1);
  H.clip(q, () => { for (let n = -4; n <= 4; n++) H.line(R, [[p[0] + n * w * .09, p[1] - 14], [p[0] + n * w * .22 + (crooked && n === 1 ? 4 : 0), p[1] + 12]], n % 2 ? 'sun' : 'blue', n % 2 ? 2.5 : .65, { tone: .5 }); });
  oval(H, R, p[0], p[1] + 12, w, 5, 'paper', 1);
  oval(H, R, p[0], p[1] + 12, w * .7, 2.7, 'blue', .35);
}
function smallLamp(H, R, i, j, z) {
  metal(H, R, i, j, .8, .65, z, .11, 'sun');
  bentTube(H, R, [[i + .4, j + .3, z + .1], [i + .55, j + .3, z + .65], [i + .9, j + .3, z + .77]], 2, 'sun');
  shade(H, R, H.p(i + .9, j + .3, z + .77), 9, true);
}
const room = world('barcelona-factory-prototype', 'The lamp folds flat', { wall: 'paper', wallTone: .85, floor: 'paper', tone: .4, height: 4.9, head: 65 }, (H, R) => {
  masonry(H, R, 'nw', 0, 12, 0, 4.85, 'paper', .72);
  windowBay(H, R, 'nw', 1.15, 8.8, 3.46, 1.17, { divisions: 6, ink: 'blue' });
  for (const j of [.4, 10.9]) {
    metal(H, R, .14, j, .24, .24, 0, 4.9, 'blue');
    bentTube(H, R, [[.35, j, 4.55], [2, j, 4.2], [4, j, 4.75]], 3.1, 'blue');
  }
  for(const j of[.45,10.9]){
    bentTube(H,R,[[.34,j,4.77],[3.86,j,4.77]],3.2,'teal');
    for(const i of[1.14,2.4,3.62])bentTube(H,R,[[i,j,4.75],[i-.72,j,4.32]],1.6,'blue');
    for(const i of[.5,3.52]){const p=H.p(i,j,4.77);shape(H,R,[[p[0]-6,p[1]-4],[p[0]+6,p[1]-4],[p[0]+6,p[1]+7],[p[0]-6,p[1]+7]],'sun',.55);H.dot(p[0],p[1],1.5,'blue');}
  }
  metal(H,R,6.4,.16,1.14,.39,3.2,1.32,'teal');for(let z=3.33;z<4.4;z+=.15)H.line(R,[H.p(6.51,.58,z),H.p(7.42,.58,z)],'blue',1.3);metal(H,R,6.43,.09,.18,.14,2.62,.45,'paper');bentTube(H,R,[[6.51,.17,2.65],[6.51,.17,2.35],[5.98,.17,2.35]],1.5,'blue');
  const pulley=H.p(2.1,10.9,4.13);H.line(R,[H.p(2.1,10.9,4.75),pulley],'blue',2);oval(H,R,...pulley,10,10,'sun');oval(H,R,...pulley,6.6,6.6,'blue');oval(H,R,...pulley,3.2,3.2,'paper',1);stroke(H,R,[[pulley[0]-8,pulley[1]],[pulley[0]-8,pulley[1]+35],[pulley[0]+6,pulley[1]+41],[pulley[0]+9,pulley[1]+31]],'teal',1.2);
  bentTube(H, R, [[.29, .45, 3.12], [.29, 10.6, 3.12], [.29, 10.6, .6]], 2.1, 'teal');
  for (const j of [1, 3.3, 5.5, 8.3, 10.6]) metal(H, R, .21, j, .17, .13, 3.04, .17, 'sun');
  shape(H, R, H.tile(.5, 3.1, 8.7, 3.3, .02), 'sun', .18, .1);
  for (let i = 1; i < 11; i += 2.1) H.line(R, [H.p(i, .1), H.p(i, 11.8)], 'blue', .5, { tone: .22 });
  metal(H, R, 10.95, .5, .18, 10.5, .01, .04, 'blue');
  for (let j = .7; j < 10.8; j += .28) H.line(R, [H.p(10.95, j, .07), H.p(11.13, j, .07)], 'paper', .7);
  rackFrame(H, R, 8.1, .48, 3.1, 1.27, .2, [.12, 1.03, 2.05, 3.15, 4.03], 'teal', (i, j, w, d, z, row) => {
    if (row === 0) for (let n = 0; n < 3; n++) { metal(H, R, i + n * .89, j + .1, .76, .8, z, .52, n === 1 ? 'sun' : 'paper'); H.line(R, [H.p(i + n * .89 + .2, j + .92, z + .28), H.p(i + n * .89 + .54, j + .92, z + .28)], 'blue', 2); }
    if (row === 1) { smallLamp(H, R, i + .05, j + .1, z); cushion(H, R, i + 1.4, j, 1.15, .85, z, .1); shade(H, R, H.p(i + 1.9, j + .45, z + .3), 18, true); }
    if (row === 2) for (let n = 0; n < 4; n++) { timber(H, R, i + n * .61, j + .05, .48, .85, z, .05 + n * .05, 'sun'); H.line(R, [H.p(i + n * .61, j + .65, z + .22), H.p(i + n * .61 + .48, j + .65, z + .22)], 'coral', 1.3); }
    if (row === 3) { for (let n = 0; n < 3; n++) shape(H, R, H.faceI(i + n * .85, j + .7, .68, z, z + .61), 'paper', 1); bentTube(H, R, [[i + 2.5, j, z], [i + 2.6, j + .3, z + .6], [i + 2.8, j + .5, z + .3]], 2.3, 'coral'); }
    if (row === 4) { timber(H, R, i + .1, j + .2, 2.2, .5, z, .11, 'sun'); }
  });
  for (const i of [8.1, 11.2]) caster(H, R, i, 1.7);
  for (let n = 0; n < 4; n++) { const p = H.p(8.05, .6 + n * .26, 2.7); stroke(H, R, [[p[0], p[1]], [p[0] - 10, p[1] - 3], [p[0] - 12, p[1] + 15], [p[0] - 5, p[1] + 14]], 'blue', 2); H.line(R, [[p[0] - 17, p[1] + 8], [p[0] - 2, p[1] + 8]], 'coral', 2.4); }
  for (let n=0;n<3;n++) {
    const i=.8+n*1.95, P=(u,z)=>H.p(i+u,.22,z);
    shape(H,R,[P(0,1.1),P(1.6,1.1),P(1.6,3.16),P(0,3.16)],'sun',.25);
    shape(H,R,[P(.09,1.2),P(1.5,1.2),P(1.5,3.04),P(.09,3.04)],'paper',1);
    for(const u of[.13,1.43])H.dot(...P(u,2.97),2,'coral');
    H.line(R,[P(.26,1.56),P(.66,2.35),P(1.1,2.7-n*.3)],'teal',3.2);
    for(const [u,z]of[[.26,1.56],[.66,2.35],[1.1,2.7-n*.3]])oval(H,R,...P(u,z),4,3,'sun');
    shape(H,R,[P(.95,2.65-n*.3),P(1.22,2.65-n*.3),P(1.39,2.3-n*.3),P(.78,2.3-n*.3)],'coral',.3);
    for(let h=1.28;h<1.47;h+=.065)H.line(R,[P(.24,h),P(1.3,h)],'blue',.5,{tone:.38});
  }
  timber(H,R,.4,6.6,.58,3.2,1.35,.13,'teal');
  for(let n=0;n<4;n++){const p=H.p(.65,6.9+n*.7,1.5);oval(H,R,...p,9,5,n===1?'coral':'paper');H.dot(...p,3,'blue');bentTube(H,R,[[.65,6.9+n*.7,1.5],[.65,6.9+n*.7,2+n*.1]],2,'sun');}
  benchFrame(H, R, 2.6, 3.9, 5.3, 2.5, 1.07, 'sun');
  timber(H,R,3.12,6.31,1.59,.72,.61,.07,'sun');shape(H,R,H.tile(3.24,6.43,1.35,.52,.69),'blue',.64);
  for(const i of[3.3,3.72,4.16])metal(H,R,i,6.5,.31,.32,.72,.07,'paper');
  for(const i of[3.48,4.28]){const p=H.p(i,6.65,.82);oval(H,R,...p,4,2,'sun');oval(H,R,...p,1.8,.9,'blue');}
  shape(H,R,H.faceI(3.09,7.06,1.67,.59,.86),'teal',.55);H.line(R,[H.p(3.61,7.09,.75),H.p(4.22,7.09,.75)],'sun',2.4);
  for(const i of[3.07,4.85,6.91])for(const j of[4.15,6.18]){const p=H.p(i,j,1.09);oval(H,R,...p,2.2,1.2,'blue');}
  for(const i of[2.86,7.57])bentTube(H,R,[[i,4.12,.14],[i,5.89,.86]],2.1,'teal');
  metal(H,R,7.12,4.14,.51,.75,1.08,.18,'teal');
  metal(H,R,7.12,4.18,.18,.54,1.27,.29,'blue');metal(H,R,7.53,4.18,.16,.54,1.27,.29,'blue');
  bentTube(H,R,[[7.28,4.47,1.38],[7.89,4.47,1.38]],2.3,'sun');const vice=H.p(7.97,4.47,1.38);H.line(R,[[vice[0]-4,vice[1]-11],[vice[0]+4,vice[1]+10]],'blue',2);for(const y of[-12,11])H.dot(vice[0]+(y<0?-4:4),vice[1]+y,2,'coral');
  const measure=H.p(6.64,5.99,1.12);stroke(H,R,[[measure[0]-13,measure[1]-5],[measure[0]+13,measure[1]+5]],'blue',2.3);for(const dx of[-7,6])H.line(R,[[measure[0]+dx,measure[1]+dx*.38],[measure[0]+dx-4,measure[1]+dx*.38+8]],'teal',2);
  taskLight(H,R,7.46,6.05,1.1,'coral',.34);
  timber(H, R, 3.1, 4.35, 4.3, 1.5, .35, .09, 'teal');
  smallLamp(H, R, 3.3, 4.95, .44);
  for (let n = 0; n < 3; n++) metal(H, R, 6.1 + n * .33, 4.83, .25, .7, .45, .15 + .06 * n, 'paper');
  shape(H, R, H.tile(5.5, 4.3, 1.8, 1.6, 1.081), 'paper', 1);
  for(let n=0;n<3;n++){H.line(R,[H.p(5.69+n*.23,5.62,1.11),H.p(5.84+n*.24,4.95,1.11),H.p(6.44+n*.19,4.61,1.11),H.p(6.77+n*.15,5.21,1.11)],n===1?'coral':'teal',.85);}
  for(const [i,j]of[[5.98,5.39],[6.4,4.8]])oval(H,R,...H.p(i,j,1.12),4,2,'sun');
  for(let j=4.49;j<5.72;j+=.16)H.line(R,[H.p(7.02,j,1.11),H.p(7.19,j,1.11)],'blue',.55);
  metal(H, R, 7.15, 5.66, .56, .47, 1.08, .08, 'coral');
  for (const [i,j] of [[7.3,5.84],[7.52,5.96]]) { oval(H,R,...H.p(i,j,1.18),4,2,'sun'); H.dot(...H.p(i,j,1.18),1.2,'blue'); }
  bentTube(H, R, [[2.75, 5.8, 1.1], [2.75, 5.8, .86], [2.52, 5.8, .84], [2.52, 5.8, 1.21]], 2, 'blue');
  metal(H,R,2.55,5.8,.55,.11,1.19,.08,'teal');
  benchFrame(H, R, 7.7, 8.2, 2.8, 1.75, .63, 'teal');
  shape(H, R, H.tile(7.82, 8.3, 2.4, 1.46, .65), 'paper', 1);
  shade(H, R, H.p(8.8, 8.95, .86), 20, true);
  drape(H, R, 9.27, 8.39, .77, 1.36, .69, .35, 'coral');
  for (let n = 0; n < 3; n++) shape(H, R, H.tile(9.5 + n * .06, 6.1 + n * .04, 1.4, 1.3, .08 + n * .05), 'sun', .45);
  for(const i of[1.39,3.83])for(const j of[9.02,10.36])metal(H,R,i,j,.12,.14,.04,.47,'teal');
  metal(H,R,1.34,9.18,2.54,1.04,.17,.06,'sun');
  for(const n of[0,1,2]){const p=H.p(1.85+n*.69,9.68,.25);oval(H,R,...p,9,4,n===1?'coral':'paper');oval(H,R,...p,3,1.5,'blue');}
  metal(H, R, 1.25, 8.9, 2.8, 1.7, .51, .07, 'blue');
  shape(H, R, H.tile(1.42, 9.02, 2.4, 1.36, .6), 'paper', 1);
  const g = H.p(2.1, 9.6, .62); H.line(R, [[g[0]-14,g[1]+5],[g[0],g[1]-14],[g[0]+14,g[1]+5],[g[0]-14,g[1]+5]], 'teal', 2);
  oval(H, R, ...H.p(3.3, 9.7, .62), 8, 3, 'sun');
  H.line(R, [H.p(1.5, 10.3, .65), H.p(3.6, 10.3, .65)], 'coral', 2.2);
  const cut=H.p(2.79,9.46,.65);oval(H,R,...cut,8,4,'teal');oval(H,R,cut[0],cut[1]-5,7,3,'sun');oval(H,R,cut[0],cut[1]-10,7,3,'paper',1);H.line(R,[[cut[0],cut[1]-15],[cut[0],cut[1]+2]],'blue',2);H.line(R,[[cut[0]-4,cut[1]-15],[cut[0]+4,cut[1]-15]],'coral',2);
  const shadowCard=[H.p(1.39,9.07,.63),H.p(3.63,9.07,.63),H.p(3.63,8.68,1.91),H.p(1.39,8.68,1.91)];shape(H,R,shadowCard,'paper',1);
  for(const offset of[0,.21,.42])H.line(R,[H.p(1.6+offset,9.03,.71),H.p(1.95+offset,8.85,1.31),H.p(2.54+offset,8.78,1.61),H.p(3.11+offset,8.9,1.09)],offset===.21?'coral':'teal',1,{tone:.62});
  for(const i of[1.57,3.35])bentTube(H,R,[[i,8.99,.62],[i,8.52,.59],[i,8.74,1.47]],1.4,'teal');
  shape(H,R,H.tile(8.13,8.41,.51,.85,.67),'sun',.7);const grip=H.p(8.34,8.86,.71);stroke(H,R,[[grip[0]-8,grip[1]+3],[grip[0]-4,grip[1]-7],[grip[0]+6,grip[1]-5],[grip[0]+8,grip[1]+2]],'teal',3);
  shape(H,R,H.faceI(8.1,9.93,1.42,.12,.43),'teal',.45);H.line(R,[H.p(8.57,9.96,.31),H.p(9.03,9.96,.31)],'sun',2.5);
  hangingRail(H,R,'ne',1.14,4.7,.84,4,(P,u,n)=>{const p=P(u,-.19);if(n===3){stroke(H,R,[P(u,-.14),P(u-.15,-.47),P(u+.24,-.48)],'sun',2.5);}else{H.line(R,[P(u,-.12),P(u,-.59)],'blue',1.8);H.line(R,[P(u-.16,-.22),P(u+.16,-.22)],n===1?'coral':'sun',3);}});
}, (H, R, time) => {
  const t = ((time % 20) + 20) % 20, f = foldAt(t), base = H.p(4.1, 4.22, 1.16), hinge = H.p(4.75, 4.22, 3.0), tip = H.p(4.75 + Math.sin(.63 + f * 1.35) * 2.25, 4.22, 3.0 + Math.cos(.63 + f * 1.35) * 2.25);
  const sh = [H.p(.12,6.2,.3),H.p(.12,5.2,2.7),H.p(.12,5.2-Math.sin(.63+f*1.35)*2.25,2.7+Math.cos(.63+f*1.35)*2.25)];
  H.clip(H.faceJ(.13,.12,11.76,.05,4.82),()=>H.opacity(.2, () => { stroke(H,R,sh,'blue',8); shape(H,R,[[sh[2][0]-20,sh[2][1]-16],[sh[2][0]+15,sh[2][1]-16],[sh[2][0]+35,sh[2][1]+15],[sh[2][0]-30,sh[2][1]+15]],'blue',.6); }));
  contact(H, hinge); rig.head = 10 + 8 * f;
  H.clip([[-500,-500],[500,-500],[500,340],[-500,-160]],()=>actor(H,R,3.85,3.15,t,'barcelona-factory-hinge',{shirt:['coral',.72],apron:['paper',.8]},0,1.65));
  metal(H, R, 3.62, 3.78, 1.22, .95, 1.08, .13, 'blue');
  for(const p of [H.p(3.8,4.59,1.08),H.p(4.65,4.59,1.08)]) oval(H,R,...p,3,2,'blue');
  for(const offset of [-4,4]) { const a=[base[0]+offset,base[1]],b=[hinge[0]+offset,hinge[1]],c=[tip[0]+offset,tip[1]]; stroke(H,R,[a,b,c],'blue',5); stroke(H,R,[[a[0]-1,a[1]],[b[0]-1,b[1]],[c[0]-1,c[1]]],'paper',1.1); }
  stroke(H,R,[[base[0]-7,base[1]+1],[hinge[0]-9,hinge[1]+8],[hinge[0]+5,hinge[1]+10],[tip[0]+3,tip[1]+3]],'coral',1.6);
  for(const p of [base,hinge,tip]) { oval(H,R,...p,6,5,'sun'); oval(H,R,...p,3.8,3.2,'paper'); H.dot(...p,1.6,'blue'); }
  const springStart=[base[0]+10,base[1]-7],springEnd=[hinge[0]+10,hinge[1]+18];const coil=[];for(let n=0;n<=18;n++){const u=n/18;coil.push([springStart[0]+(springEnd[0]-springStart[0])*u+(n%2?3:-3),springStart[1]+(springEnd[1]-springStart[1])*u]);}H.line(R,coil,'sun',1.4);stroke(H,R,[springStart,[base[0]+9,base[1]-2]],'blue',1.1);
  H.line(R, [[hinge[0]-8,hinge[1]],[hinge[0]+8,hinge[1]]], 'coral',2.2);
  shade(H,R,tip,41);
  stroke(H,R,[[hinge[0]+5,hinge[1]+5],[tip[0]-6,tip[1]+5]],'teal',3.5);
  const midway=[(hinge[0]+tip[0])*.5,(hinge[1]+tip[1])*.5];H.line(R,[[midway[0]-6,midway[1]+6],[midway[0]+6,midway[1]-6]],'sun',4);
  H.line(R,[[hinge[0]-9,hinge[1]+11],[hinge[0]+10,hinge[1]+11]],'blue',2);
  actor(H,R,7.15,7.6,0,'think',{face:'sw',shirt:['teal',.65]},0,1.55);
  const flap=H.p(10.4,6.4,.18); shape(H,R,[[flap[0],flap[1]],[flap[0]+16,flap[1]-8],[flap[0]+14,flap[1]-19-Math.sin(t*Math.PI/10)*1.6],[flap[0]-2,flap[1]-10]],'sun',.46);
});
room.loopSeconds = 20;
room.stillTime = 6;
export default room;
