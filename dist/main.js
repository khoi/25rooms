import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const stage = document.querySelector('#stage');
const paper = '#f3ebdd';
const colors = { blue: '#344a80', coral: '#ee6852', sun: '#ffd428', teal: '#008c8a', paper };
const scene = new THREE.Scene();
scene.background = new THREE.Color(paper);
const camera = new THREE.OrthographicCamera(-40, 40, 30, -30, .1, 500);
camera.position.set(80, 76, 80);
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
} catch {
  const error = document.querySelector('#error');
  error.hidden = false;
  error.textContent = 'This little world needs WebGL. Try opening it in a browser with hardware acceleration enabled.';
  throw new Error('WebGL is unavailable');
}
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
stage.appendChild(renderer.domElement);
scene.add(new THREE.HemisphereLight(0xfff6df, 0x627093, 2.7));
const sunlight = new THREE.DirectionalLight(0xfff5dc, 2.3);
sunlight.position.set(-20, 65, 35);
scene.add(sunlight);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = false;
controls.enableDamping = true;
controls.dampingFactor = .1;
controls.minZoom = .6;
controls.maxZoom = 9;
controls.mouseButtons.LEFT = THREE.MOUSE.PAN;
controls.mouseButtons.RIGHT = THREE.MOUSE.PAN;
controls.touches.ONE = THREE.TOUCH.PAN;
controls.touches.TWO = THREE.TOUCH.DOLLY_PAN;
const materialCache = new Map();
function material(color) {
  if (materialCache.has(color)) return materialCache.get(color);
  const m = new THREE.MeshStandardMaterial({ color: colors[color] || color, roughness: 1, metalness: 0 });
  m.onBeforeCompile = shader => {
    shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', `
      #include <dithering_fragment>
      vec2 inkUV = gl_FragCoord.xy;
      float grain = fract(sin(dot(floor(inkUV), vec2(12.9898, 78.233))) * 43758.5453);
      vec2 screenUV = mat2(.966, -.259, .259, .966) * inkUV / 3.4;
      float dotInk = smoothstep(.30, .47, length(fract(screenUV) - .5));
      float luminance = dot(gl_FragColor.rgb, vec3(.299, .587, .114));
      gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(.953, .922, .867), dotInk * .15 + step(.975, grain) * .24);
      gl_FragColor.rgb *= .96 + grain * .08;
    `);
  };
  materialCache.set(color, m);
  return m;
}
const edgeMaterial = new THREE.LineBasicMaterial({ color: colors.blue, transparent: true, opacity: .42 });
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxEdges = new THREE.EdgesGeometry(boxGeometry);
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 16);
const sphereGeometry = new THREE.SphereGeometry(1, 12, 8);
const animations = [];
function mesh(parent, geometry, color, x, y, z, sx = 1, sy = 1, sz = 1) {
  const object = new THREE.Mesh(geometry, material(color));
  object.position.set(x, y, z);
  object.scale.set(sx, sy, sz);
  parent.add(object);
  return object;
}
function box(p, x, y, z, w, h, d, color = 'paper', outline = true) {
  const object = mesh(p, boxGeometry, color, x, y, z, w, h, d);
  if (outline) object.add(new THREE.LineSegments(boxEdges, edgeMaterial));
  return object;
}
function cyl(p, x, y, z, r, h, color = 'blue') {
  return mesh(p, cylinderGeometry, color, x, y, z, r, h, r);
}
function ball(p, x, y, z, r, color = 'teal', stretch = 1) {
  return mesh(p, sphereGeometry, color, x, y, z, r, r * stretch, r);
}
function line(p, points, color = 'blue') {
  const geometry = new THREE.BufferGeometry().setFromPoints(points.map(v => new THREE.Vector3(...v)));
  const object = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: colors[color] || color }));
  p.add(object);
  return object;
}
function torus(p, x, y, z, radius, tube, color = 'blue', horizontal = false) {
  const o = mesh(p, new THREE.TorusGeometry(radius, tube, 6, 32), color, x, y, z);
  if (horizontal) o.rotation.x = Math.PI / 2;
  return o;
}
let seed = 819;
function random() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
}
function plant(p, x, z, size = 1, y = .1) {
  cyl(p, x, y + .3 * size, z, .35 * size, .6 * size, 'coral');
  cyl(p, x, y + 1.1 * size, z, .045 * size, 1.5 * size, 'blue');
  for (let i = 0; i < 5; i++) {
    const a = i * 2.4;
    const leaf = ball(p, x + Math.cos(a) * .3 * size, y + (.8 + i * .23) * size, z + Math.sin(a) * .3 * size, .3 * size, i % 2 ? 'teal' : 'sun', .55);
    leaf.rotation.z = Math.sin(a) * .8;
  }
}
function table(p, x, z, w = 2.5, d = 1.5, color = 'sun', y = 1.3) {
  box(p, x, y, z, w, .18, d, color);
  for (const dx of [-1, 1]) for (const dz of [-1, 1]) box(p, x + dx * (w / 2 - .15), y / 2, z + dz * (d / 2 - .15), .12, y, .12, 'blue');
}
function chair(p, x, z, color = 'coral') {
  box(p, x, .8, z, .8, .15, .8, color);
  box(p, x, 1.3, z - .35, .8, 1, .12, color);
  for (const dx of [-.3, .3]) for (const dz of [-.3, .3]) box(p, x + dx, .4, z + dz, .09, .8, .09, 'blue');
}
function lamp(p, x, z, height = 2.7) {
  cyl(p, x, .12, z, .45, .15, 'blue');
  cyl(p, x, height / 2, z, .045, height, 'blue');
  mesh(p, new THREE.ConeGeometry(.65, .65, 16, 1, true), 'sun', x, height, z);
  ball(p, x, height - .16, z, .17, 'paper');
  cyl(p, x, .03, z, 1, .015, '#f5d991');
}
function books(p, x, y, z, count = 8) {
  for (let i = 0; i < count; i++) {
    const h = .5 + random() * .35;
    box(p, x + i * .25, y + h / 2, z, .19, h, .48, ['blue', 'coral', 'sun', 'teal', 'paper'][i % 5]);
  }
}
function shelf(p, x, z) {
  box(p, x, 1.9, z, 2.8, 3.8, .6, 'blue');
  for (let k = 0; k < 4; k++) {
    box(p, x, .3 + k * .85, z + .15, 2.7, .1, .75, 'sun');
    books(p, x - 1.15, .36 + k * .85, z + .28, 9);
  }
}
function picture(p, x, y, color = 'coral', z = -3.79) {
  box(p, x, y, z, 1.5, 1.5, .09, 'blue');
  box(p, x, y, z + .06, 1.3, 1.3, .04, 'paper');
  const art = cyl(p, x, y, z + .1, .43, .03, color);
  art.rotation.x = Math.PI / 2;
}
function rug(p, color = 'coral', x = 0, z = 1, w = 4.4, d = 3.2) {
  box(p, x, .035, z, w, .025, d, color);
  for (let i = -2; i <= 2; i++) line(p, [[x - w / 2, .056, z + i * .45], [x + w / 2, .056, z + i * .45]], 'paper');
}
const rooms = [];
function room(id, title, floor, wall, build, wallHeight = 2.8) {
  const index = rooms.length;
  const group = new THREE.Group();
  group.position.set((index % 5 - 2) * 8.9, 0, (Math.floor(index / 5) - 2) * 8.9);
  scene.add(group);
  box(group, 0, -.2, 0, 8.3, .4, 8.3, 'blue');
  box(group, 0, .015, 0, 8.2, .05, 8.2, floor);
  if (wallHeight) {
    box(group, 0, wallHeight / 2, -4, 8.15, wallHeight, .15, wall);
    box(group, -4, wallHeight / 2, 0, .15, wallHeight, 8.15, wall);
  }
  for (let i = -3; i <= 3; i++) {
    line(group, [[i, .047, -3.9], [i, .047, 3.9]], floor === 'blue' ? 'teal' : '#aaad9e');
    line(group, [[-3.9, .047, i], [3.9, .047, i]], floor === 'blue' ? 'teal' : '#aaad9e');
  }
  const data = { id, title, group, index };
  group.userData.room = data;
  rooms.push(data);
  build(group);
}

room('apartments', '01 / Windows into other lives', 'paper', 'blue', p => {
  for (let row = 0; row < 4; row++) for (let col = 0; col < 4; col++) {
    const x = -2.8 + col * 1.8, y = 1 + row * 1.5;
    box(p, x, y, -3.85, 1.25, 1.1, .12, (row + col) % 3 ? 'sun' : 'coral');
    box(p, x, y, -3.74, .07, 1.1, .1, 'paper');
    box(p, x, y, -3.74, 1.25, .07, .1, 'paper');
    box(p, x, y - .6, -3.6, 1.5, .12, .45, 'paper');
  }
  table(p, 0, 0); chair(p, 0, 1.2); plant(p, -2.6, 2, 1.1); lamp(p, 2.5, -2);
}, 6.6);
room('bigroom', '02 / A room to make things', 'sun', 'teal', p => {
  rug(p, 'coral'); table(p, 0, -1, 4, 2); chair(p, 0, .6); shelf(p, -2, -3.4); plant(p, 2.7, 2.5);
  for (let i = 0; i < 5; i++) box(p, -1 + i * .45, 1.44, -1, .35, .08, .6, i % 2 ? 'paper' : 'blue');
});
room('tide', '03 / The tide remembers', 'teal', 'paper', p => {
  for (let z = -3.5; z < 4; z += .35) {
    const pts = [];
    for (let x = -3.8; x < 4; x += .2) pts.push([x, .13 + Math.sin(x * 2 + z) * .04, z]);
    const wave = line(p, pts, 'paper');
    animations.push(t => { wave.position.y = Math.sin(t + z) * .05; });
  }
  box(p, .6, .4, -.5, 2.1, .35, .9, 'sun');
  cyl(p, .6, 1.6, -.5, .04, 2.4, 'blue');
  const sail = new THREE.Shape(); sail.moveTo(0, 0); sail.lineTo(0, 1.8); sail.lineTo(1.2, 0); sail.closePath();
  mesh(p, new THREE.ShapeGeometry(sail), 'coral', .65, .8, -.5);
}, .6);
room('well', '04 / A wish held in water', 'paper', 'blue', p => {
  torus(p, 0, .85, 0, 1.25, .3, 'coral', true); cyl(p, 0, .35, 0, 1.1, .6, 'teal');
  for (const x of [-1.6, 1.6]) box(p, x, 1.7, 0, .2, 3.4, .2, 'blue');
  box(p, 0, 3.3, 0, 3.8, .2, .4, 'sun');
  line(p, [[0, 3.3, 0], [0, 1.1, 0]]); cyl(p, 0, 1.25, 0, .3, .5, 'sun');
  plant(p, -2.8, 2.6); plant(p, 2.5, -2.5);
});
room('door', '05 / There is always another door', 'paper', 'paper', p => {
  box(p, 0, 1.7, -1, 2.4, 3.4, .3, 'blue');
  const door = box(p, -.45, 1.65, -.55, 1.8, 3.15, .12, 'sun'); door.rotation.y = -.55;
  ball(p, .1, 1.6, -.08, .09, 'coral');
  for (let i = 0; i < 5; i++) box(p, i * .45 - .5, .03, i * .7, 1.8, .03, .5, 'sun');
  plant(p, -2.5, -.5); picture(p, 2.6, 1.7, 'teal');
}, 1);
room('press', '06 / An impression of something', 'paper', 'blue', p => {
  table(p, 0, 0, 3.5, 2.8, 'coral');
  for (const x of [-1.2, 1.2]) box(p, x, 2, -.7, .15, 2, .15, 'blue');
  box(p, 0, 2.6, -.7, 3, .4, 1.2, 'blue');
  const roller = cyl(p, 0, 1.75, -.4, .35, 2.5, 'teal'); roller.rotation.z = Math.PI / 2;
  box(p, .2, 1.43, 1, 1.7, .04, 1.3, 'paper');
  for (let i = 0; i < 3; i++) box(p, 2.8, .2 + i * .18, 2, 1.3, .13, 1.7, ['sun', 'coral', 'paper'][i]);
});
room('record', '07 / The song you put on again', 'coral', 'paper', p => {
  rug(p, 'teal'); table(p, 0, -1, 3, 1.8, 'blue');
  cyl(p, 0, 1.42, -1, .68, .08, 'blue'); cyl(p, 0, 1.48, -1, .18, .03, 'sun');
  for (const x of [-2.8, 2.8]) {
    box(p, x, 1, -2, 1, 2, .9, 'blue');
    for (const y of [.55, 1.4]) { const cone = cyl(p, x, y, -1.5, .3, .06, 'sun'); cone.rotation.x = Math.PI / 2; }
  }
  chair(p, 0, 1.5); picture(p, 0, 1.8);
});
room('blot', '08 / Permission to make a mess', 'sun', 'coral', p => {
  rug(p, 'paper', 0, .4, 5, 5);
  for (let i = 0; i < 27; i++) {
    const drop = cyl(p, (random() - .5) * 5, .08, (random() - .5) * 5, .12 + random() * .45, .04, ['blue', 'coral', 'teal'][i % 3]);
    drop.scale.z *= .7;
  }
  table(p, -1, -2.7, 3, 1); for (let i = 0; i < 4; i++) cyl(p, -2 + i * .55, 1.65, -2.7, .19, .6, ['blue', 'coral', 'sun', 'teal'][i]);
});
room('cranes', '09 / A thousand possible flights', 'paper', 'teal', p => {
  for (let i = 0; i < 16; i++) {
    const x = (i % 4 - 1.5) * 1.7, z = (Math.floor(i / 4) - 1.5) * 1.7, y = 1 + random() * 2;
    const bird = new THREE.Group(); bird.position.set(x, y, z); p.add(bird);
    const shape = new THREE.Shape(); shape.moveTo(-.6, .1); shape.lineTo(0, .35); shape.lineTo(.6, .1); shape.lineTo(0, -.2); shape.closePath();
    const wing = mesh(bird, new THREE.ShapeGeometry(shape), ['coral', 'sun', 'paper'][i % 3], 0, 0, 0); wing.rotation.x = -Math.PI / 3;
    line(p, [[x, y, z], [x, 4, z]], '#a7ada6');
    animations.push(t => { bird.rotation.y = Math.sin(t * .35 + i) * .3; });
  }
}, 1.2);
room('lab', '10 / Little experiments', 'paper', 'blue', p => {
  table(p, 0, -1, 5.8, 1.8, 'paper');
  for (let i = 0; i < 7; i++) {
    const x = -2.4 + i * .8;
    ball(p, x, 1.65, -1, .28, i % 2 ? 'teal' : 'coral'); cyl(p, x, 2, -1, .1, .45, 'paper');
  }
  chair(p, 0, .8); shelf(p, -2.4, -3.4); lamp(p, 2.7, 2.5);
});
room('terminal', '11 / A thought becoming real', 'teal', 'paper', p => {
  table(p, 0, -1, 3.5, 1.7); box(p, 0, 1.95, -1.2, 1.9, 1.25, .8, 'paper');
  box(p, 0, 2, -.77, 1.55, .9, .04, 'blue');
  for (let i = 0; i < 4; i++) box(p, -.35 + i * .08, 2.25 - i * .17, -.73, .7 + i * .13, .045, .02, 'teal', false);
  box(p, 0, 1.45, -.15, 1.6, .12, .55, 'paper'); chair(p, 0, 1.2); plant(p, 2.5, -2.7); rug(p, 'coral', 0, 1.5);
});
room('kitchen', '12 / Something warm on the stove', 'coral', 'paper', p => {
  for (let x = -2.5; x <= 2.5; x += 1.25) box(p, x, .8, -2.8, 1.2, 1.6, 1.6, 'teal');
  box(p, 0, 1.65, -2.8, 6.4, .15, 1.8, 'paper');
  cyl(p, -1.2, 1.95, -2.8, .48, .5, 'blue');
  torus(p, -1.2, 2.23, -2.8, .4, .05, 'sun', true);
  table(p, 0, 1, 2.6, 1.8); chair(p, -1.7, 1); chair(p, 1.7, 1);
  cyl(p, 0, 1.45, 1, .4, .08, 'coral'); plant(p, 3, 2.7, .7);
});
room('bridge', '13 / Meeting in the middle', 'blue', 'paper', p => {
  for (let z = -3.5; z < 4; z += .5) line(p, [[-3.8, .09, z], [3.8, .09, z]], 'teal');
  for (let i = 0; i < 15; i++) {
    const x = -3.7 + i * .52, y = .4 + Math.sin(i / 14 * Math.PI) * 1.3;
    box(p, x, y, 0, .5, .16, 2, 'sun');
    for (const z of [-.9, .9]) box(p, x, y + .6, z, .07, 1.2, .07, 'coral');
  }
  for (const z of [-.9, .9]) line(p, Array.from({ length: 29 }, (_, i) => [-3.7 + i * .26, 1.5 + Math.sin(i / 28 * Math.PI) * 1.3, z]), 'coral');
}, .5);
room('arch', '14 / Holding space', 'paper', 'coral', p => {
  for (const x of [-1.7, 1.7]) box(p, x, 1.4, -.7, .7, 2.8, .8, 'sun');
  const arch = mesh(p, new THREE.TorusGeometry(1.7, .36, 6, 28, Math.PI), 'sun', 0, 2.8, -.7);
  arch.scale.z = 1.2; plant(p, -2.8, 2.4); rug(p, 'teal');
  for (let i = 0; i < 5; i++) box(p, 2.8, .2 + i * .25, -2, 1, .25, 1, i % 2 ? 'coral' : 'paper');
});
room('wheel', '15 / Around, and around again', 'paper', 'blue', p => {
  const wheel = new THREE.Group(); wheel.position.set(0, 2.5, 0); p.add(wheel);
  torus(wheel, 0, 0, 0, 2, .12, 'coral');
  for (let i = 0; i < 10; i++) {
    const a = i / 10 * Math.PI * 2;
    line(wheel, [[0, 0, 0], [Math.cos(a) * 2, Math.sin(a) * 2, 0]], 'sun');
    box(wheel, Math.cos(a) * 2, Math.sin(a) * 2, 0, .55, .4, .55, 'teal');
  }
  for (const x of [-1, 1]) { const leg = box(p, x * .6, 1.2, .4, .2, 2.7, .25, 'blue'); leg.rotation.z = x * .3; }
  animations.push(t => { wheel.rotation.z = t * .1; });
});
room('skyblue', '16 / A small piece of sky', 'paper', 'teal', p => {
  rug(p, 'teal', 0, .5, 5, 5);
  for (let i = 0; i < 5; i++) {
    const cloud = new THREE.Group(); cloud.position.set((random() - .5) * 5, 2 + random(), (random() - .5) * 5); p.add(cloud);
    for (let j = 0; j < 4; j++) ball(cloud, j * .35 - .5, Math.sin(j) * .15, 0, .45, 'paper', .55);
    animations.push(t => { cloud.position.x += Math.sin(t * .3 + i) * .0009; });
  }
  chair(p, 0, 1.5, 'sun');
}, 1.3);
room('map', '17 / Places we have yet to go', 'coral', 'paper', p => {
  table(p, 0, 0, 4.6, 3, 'blue'); box(p, 0, 1.41, 0, 4, .025, 2.6, 'paper');
  for (let i = 0; i < 7; i++) {
    const x = (random() - .5) * 3, z = (random() - .5) * 2;
    cyl(p, x, 1.44, z, .2 + random() * .25, .02, 'teal');
    line(p, [[x, 1.45, z], [x, 1.8, z]], 'coral');
    ball(p, x, 1.82, z, .06, 'coral');
  }
  chair(p, 0, 2); shelf(p, -2.5, -3.4); lamp(p, 2.8, -2);
});
room('lighthouse', '18 / A light to come home to', 'blue', 'blue', p => {
  for (let i = 0; i < 5; i++) cyl(p, 0, .5 + i * .7, 0, .8 - i * .055, .7, i % 2 ? 'coral' : 'paper');
  cyl(p, 0, 4, 0, .65, .6, 'sun');
  mesh(p, new THREE.ConeGeometry(.95, .7, 16), 'blue', 0, 4.65, 0);
  torus(p, 0, 3.7, 0, 1.1, .06, 'paper', true);
  for (let i = 0; i < 9; i++) torus(p, 0, .08, 0, 1.3 + i * .3, .016, i % 2 ? 'teal' : 'paper', true);
}, 1.3);
room('hello', '19 / There is room for you', 'paper', 'coral', p => {
  rug(p, 'sun'); table(p, 0, 0, 2.7, 2.7, 'teal');
  chair(p, -2, 0); chair(p, 2, 0); chair(p, 0, 2);
  for (const x of [-.7, .7]) cyl(p, x, 1.5, 0, .17, .3, 'paper');
  plant(p, -2.7, -2.7, 1.2); lamp(p, 2.6, -2.6); picture(p, 0, 1.8, 'sun');
});
room('kite', '20 / The tug of an open sky', 'teal', 'paper', p => {
  for (let i = 0; i < 5; i++) {
    const x = (i - 2) * 1.2, y = 2 + random() * 2, z = (random() - .5) * 4;
    const shape = new THREE.Shape(); shape.moveTo(0, .8); shape.lineTo(.5, 0); shape.lineTo(0, -.6); shape.lineTo(-.5, 0); shape.closePath();
    const kite = mesh(p, new THREE.ShapeGeometry(shape), i % 2 ? 'sun' : 'coral', x, y, z); kite.rotation.y = .7;
    line(p, [[x, y, z], [x - .4, 1, z + .5], [x - .1, .2, z + 1]]);
    animations.push(t => { kite.rotation.z = Math.sin(t + i) * .12; });
  }
}, .7);
room('library', '21 / All the worlds on a shelf', 'blue', 'blue', p => {
  shelf(p, -2.3, -3.3); shelf(p, .9, -3.3); rug(p, 'coral');
  chair(p, -.6, .8, 'teal'); table(p, 1.5, 1, 1.5, 1.2, 'sun', .85); books(p, 1.1, .97, 1, 3); lamp(p, -2.5, 1.5);
}, 4);
room('engines', '22 / The pleasure of finding out', 'paper', 'teal', p => {
  table(p, 0, 0, 4.8, 2.5, 'sun');
  for (let i = 0; i < 3; i++) {
    const gear = new THREE.Group(); gear.position.set(-1.4 + i * 1.4, 2.05, 0); p.add(gear);
    torus(gear, 0, 0, 0, .55, .17, i % 2 ? 'coral' : 'blue');
    for (let j = 0; j < 10; j++) { const a = j / 10 * Math.PI * 2; const tooth = box(gear, Math.cos(a) * .65, Math.sin(a) * .65, 0, .25, .2, .22, 'blue'); tooth.rotation.z = a; }
    animations.push(t => { gear.rotation.z = t * (i % 2 ? -.5 : .5); });
  }
  plant(p, 2.8, -2.7); box(p, -2, .4, 2.7, 1.5, .8, 1, 'coral');
});
room('loom', '23 / One thread at a time', 'coral', 'paper', p => {
  for (const x of [-1.6, 1.6]) box(p, x, 1.8, 0, .2, 3.6, .3, 'blue');
  for (const y of [.8, 3.3]) box(p, 0, y, 0, 3.6, .2, .3, 'sun');
  for (let i = 0; i < 20; i++) line(p, [[-1.4 + i * .15, .8, 0], [-1.4 + i * .15, 3.3, 0]], i % 2 ? 'paper' : 'blue');
  for (let i = 0; i < 15; i++) box(p, 0, .95 + i * .1, .03, 2.9, .07, .06, ['teal', 'sun', 'coral'][Math.floor(i / 5)]);
  chair(p, 0, 1.6); for (let i = 0; i < 4; i++) ball(p, 2.5, .3, -2 + i * .7, .3, ['teal', 'sun', 'coral', 'paper'][i]);
});
room('constellations', '24 / A way through the dark', 'blue', 'blue', p => {
  const points = [];
  for (let i = 0; i < 18; i++) {
    const x = (random() - .5) * 7, y = .8 + random() * 3, z = (random() - .5) * 7;
    ball(p, x, y, z, .07, 'sun'); points.push([x, y, z]);
    if (i % 4 === 3) { line(p, points.splice(0), 'paper'); }
  }
  torus(p, 0, .09, 0, 2.3, .045, 'sun', true);
  const telescope = cyl(p, .3, 1.8, .3, .24, 1.7, 'paper'); telescope.rotation.z = -.8;
  for (const x of [-.5, .5]) line(p, [[.3, 1.6, .3], [x, .1, 1]], 'sun');
}, 2.5);
room('greenhouse', '25 / Quiet things keep growing', 'sun', 'teal', p => {
  for (let x = -2.8; x <= 3; x += 1.4) for (let z = -2.5; z <= 3; z += 1.7) plant(p, x, z, .65 + random() * .55);
  for (let x = -3.7; x < 4; x += 1.85) line(p, [[x, 0, -3.7], [x, 3.5, -3.7], [x, 4.5, 0], [x, 3.5, 3.7], [x, 0, 3.7]], 'paper');
  for (const z of [-3.7, 0, 3.7]) line(p, [[-3.7, z === 0 ? 4.5 : 3.5, z], [3.7, z === 0 ? 4.5 : 3.5, z]], 'paper');
}, 1.2);

let activeIndex = -1;
let tour = false;
let nextRoomTime = 0;
let transition = null;
let fittedSpan = 65;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const tourButton = document.querySelector('#tour');
function stopTour() {
  tour = false;
  tourButton.textContent = 'Take a tour';
  tourButton.setAttribute('aria-pressed', 'false');
}
function moveTo(target, zoom) {
  transition = { start: performance.now(), from: controls.target.clone(), to: target, zoomFrom: camera.zoom, zoomTo: zoom, duration: reducedMotion ? 0 : 1100 };
}
function focusRoom(index) {
  activeIndex = (index + rooms.length) % rooms.length;
  const room = rooms[activeIndex];
  moveTo(room.group.position.clone().add(new THREE.Vector3(0, 1, 0)), Math.min(7.5, fittedSpan / 15));
  document.querySelector('#room-name').textContent = room.title;
  history.replaceState(null, '', `#${room.id}`);
}
function viewAll() {
  stopTour(); activeIndex = -1;
  moveTo(new THREE.Vector3(0, .8, 0), 1);
  document.querySelector('#room-name').textContent = '25 rooms, a world within each';
  history.replaceState(null, '', location.pathname + location.search);
}
document.querySelector('#reset').addEventListener('click', viewAll);
document.querySelector('#previous').addEventListener('click', () => { stopTour(); focusRoom(activeIndex < 0 ? 24 : activeIndex - 1); });
document.querySelector('#next').addEventListener('click', () => { stopTour(); focusRoom(activeIndex + 1); });
tourButton.addEventListener('click', () => {
  if (tour) return stopTour();
  tour = true; tourButton.textContent = 'Pause tour'; tourButton.setAttribute('aria-pressed', 'true');
  focusRoom(activeIndex + 1); nextRoomTime = performance.now() + 6000;
});
controls.addEventListener('start', () => { stopTour(); transition = null; });
const raycaster = new THREE.Raycaster();
stage.addEventListener('dblclick', event => {
  const rect = stage.getBoundingClientRect();
  raycaster.setFromCamera(new THREE.Vector2((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1), camera);
  const hit = raycaster.intersectObjects(rooms.map(r => r.group), true)[0];
  if (!hit) return;
  let object = hit.object;
  while (object && !object.userData.room) object = object.parent;
  if (object) { stopTour(); focusRoom(object.userData.room.index); }
});
stage.addEventListener('keydown', event => {
  if (event.metaKey || event.ctrlKey || event.altKey) return;
  const key = event.key.toLowerCase();
  if (!['0', '+', '=', '-', 'arrowleft', 'arrowright', 'arrowup', 'arrowdown', 'w', 'a', 's', 'd', 'escape'].includes(key)) return;
  event.preventDefault(); stopTour(); transition = null;
  if (key === '0' || key === 'escape') return viewAll();
  if (['+', '=', '-'].includes(key)) {
    camera.zoom = THREE.MathUtils.clamp(camera.zoom * (key === '-' ? .85 : 1.15), .6, 9); camera.updateProjectionMatrix(); return;
  }
  const delta = new THREE.Vector3();
  const step = 1.4 / camera.zoom;
  if (['arrowleft', 'a'].includes(key)) delta.set(-step, 0, step);
  if (['arrowright', 'd'].includes(key)) delta.set(step, 0, -step);
  if (['arrowup', 'w'].includes(key)) delta.set(-step, 0, -step);
  if (['arrowdown', 's'].includes(key)) delta.set(step, 0, step);
  camera.position.add(delta); controls.target.add(delta);
});
function resize() {
  const { width, height } = stage.getBoundingClientRect();
  const aspect = width / height;
  fittedSpan = Math.max(46, 68 / aspect);
  camera.left = -fittedSpan * aspect / 2; camera.right = fittedSpan * aspect / 2;
  camera.top = fittedSpan / 2; camera.bottom = -fittedSpan / 2;
  camera.updateProjectionMatrix(); renderer.setSize(width, height);
  if (activeIndex >= 0) camera.zoom = Math.min(7.5, fittedSpan / 15);
  camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(stage);
controls.target.set(0, .8, 0);
controls.update();
resize();
const initial = rooms.findIndex(room => room.id === location.hash.slice(1));
if (initial >= 0) focusRoom(initial);
renderer.setAnimationLoop(now => {
  if (document.hidden) return;
  if (transition) {
    const elapsed = transition.duration ? Math.min(1, (now - transition.start) / transition.duration) : 1;
    const eased = elapsed * elapsed * (3 - 2 * elapsed);
    const next = transition.from.clone().lerp(transition.to, eased);
    camera.position.add(next.clone().sub(controls.target));
    controls.target.copy(next);
    camera.zoom = THREE.MathUtils.lerp(transition.zoomFrom, transition.zoomTo, eased);
    camera.updateProjectionMatrix();
    if (elapsed === 1) transition = null;
  }
  if (tour && now >= nextRoomTime) { focusRoom(activeIndex + 1); nextRoomTime = now + 6000; }
  if (!reducedMotion) for (const animate of animations) animate(now / 1000);
  controls.update(); renderer.render(scene, camera);
});
