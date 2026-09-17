import * as THREE from 'three';
import { createLayout, collectionForRoom, overlaps } from './artwork/layout.js';
import { COLLECTIONS } from './artwork/collections.js';
import { RoomPainter, paintSheet } from './artwork/painter.js';

const stage = document.querySelector('#stage');
const status = document.querySelector('#status');
const tourButton = document.querySelector('#tour');
const query = new URLSearchParams(location.search);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const initialId = query.get('room') || location.hash.slice(1);
const selectedCollection = COLLECTIONS.find(entry => entry.id === query.get('collection'))
  || COLLECTIONS.find(entry => entry.id === collectionForRoom(initialId))
  || COLLECTIONS[0];
const collection = selectedCollection.id;
const layout = createLayout(5, collection);
const caption = document.querySelector('#room-caption');
for (const link of document.querySelectorAll('[data-collection]')) {
  if (link.dataset.collection === collection) link.setAttribute('aria-current', 'page');
}
document.title = selectedCollection.title;
const scene = new THREE.Scene();
scene.background = new THREE.Color('#262320');
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, .1, 100);
camera.position.z = 10;
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas: stage, antialias: true, alpha: false });
} catch {
  status.hidden = true;
  const error = document.querySelector('#error');
  error.hidden = false;
  error.textContent = 'This print needs WebGL. Enable hardware acceleration in your browser and reload.';
  throw new Error('WebGL is unavailable');
}
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor('#262320');
const geometry = new THREE.PlaneGeometry(1, 1);
const errors = [];
let width = innerWidth, height = innerHeight;
let dpr = Math.min(devicePixelRatio || 1, 2);
const view = { x: 0, y: 0, zoom: 1 };
const pointers = new Map();
const velocity = { x: 0, y: 0 };
let drag = null, pinch = null, tween = null, lastFrame = 0;
let tour = !reduceMotion && !query.has('nowander') && !query.has('fit');
let tourIndex = -1, tourNext = Infinity, idleSince = 0;
let loaded = false, started = performance.now(), lastStatus = null;
let controlsTimer;
const minimumZoom = .06, maximumZoom = 5;
const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
const lerp = (a, b, t) => a + (b - a) * t;

function textureFrom(canvas) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

function plane(bounds, order, map = null) {
  const material = new THREE.MeshBasicMaterial({ map, transparent: true, depthWrite: false, depthTest: false, toneMapped: false });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(bounds.x1 - bounds.x0, bounds.y1 - bounds.y0, 1);
  mesh.position.set((bounds.x0 + bounds.x1) / 2, -(bounds.y0 + bounds.y1) / 2, 0);
  mesh.renderOrder = order;
  scene.add(mesh);
  return mesh;
}

const shadow = plane({ x0: layout.sheet.x0 + 18, y0: layout.sheet.y0 + 24, x1: layout.sheet.x1 + 18, y1: layout.sheet.y1 + 24 }, 0);
shadow.material.color.set('#080604');
shadow.material.opacity = .35;
const paper = plane(layout.sheet, 1, textureFrom(paintSheet(layout.sheet)));
const inspectionRoom = query.has('solo') ? layout.rooms.find(room => room.id === initialId) : null;
const entries = layout.drawOrder.filter(room => !inspectionRoom || room === inspectionRoom).map((room, index) => {
  const painter = new RoomPainter(room, inspectionRoom ? { ...layout, drawOrder: [room] } : layout);
  const mesh = plane(room.bounds, index + 2);
  mesh.visible = false;
  return { room, painter, mesh, texture: null, textureWidth: 0, textureHeight: 0, failed: false, painted: false, ratio: .5 };
});

function fitTarget() {
  const b = layout.world;
  return { x: (b.x0 + b.x1) / 2, y: (b.y0 + b.y1) / 2, zoom: clamp(Math.min((width - 80) / (b.x1 - b.x0 + 500), (height - 80) / (b.y1 - b.y0 + 500)), minimumZoom, maximumZoom) };
}

function roomZoom(room) {
  const b = room.local;
  return clamp(Math.min((width - 60) / (b.x1 - b.x0), (height - 60) / (b.y1 - b.y0)), minimumZoom, maximumZoom) * .94;
}

function moveCamera(target, duration = 1100) {
  velocity.x = velocity.y = 0;
  target.zoom = clamp(target.zoom, fitTarget().zoom, maximumZoom);
  if (reduceMotion || duration <= 0) { Object.assign(view, target); tween = null; return; }
  tween = { from: { ...view }, to: target, start: performance.now(), duration };
}

function setTour(value) {
  tour = value;
  tourButton.textContent = value ? 'Pause' : 'Tour';
  tourButton.setAttribute('aria-pressed', String(value));
  tourButton.setAttribute('aria-label', value ? 'Pause automatic tour' : 'Start automatic tour');
  idleSince = 0;
  tourNext = loaded ? performance.now() + (value ? 100 : 14000) : Infinity;
}

function focusRoom(index, duration = 1100) {
  tourIndex = (index + layout.rooms.length) % layout.rooms.length;
  const room = layout.rooms[tourIndex];
  moveCamera({ ...room.center, zoom: roomZoom(room) }, duration);
  caption.textContent = `${String(tourIndex + 1).padStart(2, '0')} / ${room.definition.title || room.id.replaceAll('-', ' ')}`;
  caption.hidden = false;
  const parameters = new URLSearchParams(location.search);
  parameters.delete('room');
  parameters.set('collection', collection);
  history.replaceState(null, '', `${location.pathname}?${parameters}#${room.id}`);
}

function viewAll() {
  setTour(false);
  tourIndex = -1;
  caption.hidden = true;
  moveCamera(fitTarget(), 900);
  const parameters = new URLSearchParams(location.search);
  parameters.delete('room');
  parameters.set('collection', collection);
  history.replaceState(null, '', `${location.pathname}?${parameters}`);
}

function interrupt() {
  tween = null;
  idleSince = performance.now();
}

function toWorld(x, y) {
  return { x: view.x + (x - width / 2) / view.zoom, y: view.y + (y - height / 2) / view.zoom };
}

function resize() {
  const wasFit = Math.abs(view.zoom - fitTarget().zoom) < .0001 && !tween;
  width = Math.max(1, innerWidth); height = Math.max(1, innerHeight);
  dpr = Math.min(devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.setSize(width, height);
  camera.left = -width / 2; camera.right = width / 2;
  camera.top = height / 2; camera.bottom = -height / 2;
  if (wasFit) Object.assign(view, fitTarget());
  camera.updateProjectionMatrix();
}

function report(entry, error) {
  entry.failed = true;
  entry.painter.cancel();
  const message = `${entry.room.id}: ${error.stack || error}`;
  errors.push(message);
  console.error(message);
  status.textContent = 'A room could not finish printing. Reload to try again.';
  status.hidden = false;
}

function upload(entry) {
  const canvas = entry.painter.canvas;
  if (!entry.texture || entry.textureWidth !== canvas.width || entry.textureHeight !== canvas.height) {
    entry.texture?.dispose();
    entry.texture = textureFrom(canvas);
    entry.textureWidth = canvas.width; entry.textureHeight = canvas.height;
    entry.mesh.material.map = entry.texture;
    entry.mesh.material.needsUpdate = true;
  } else entry.texture.needsUpdate = true;
  entry.mesh.visible = true;
  entry.painted = true;
}

function updateArtwork(now) {
  const bounds = { x0: view.x - width / (2 * view.zoom), y0: view.y - height / (2 * view.zoom), x1: view.x + width / (2 * view.zoom), y1: view.y + height / (2 * view.zoom) };
  const visible = entries.filter(entry => overlaps(entry.room.bounds, bounds));
  const focus = visible.slice().sort((a, b) => Math.hypot(a.room.center.x - view.x, a.room.center.y - view.y) - Math.hypot(b.room.center.x - view.x, b.room.center.y - view.y))[0];
  const desired = [.5, 1, 1.5, 2, 3].find(ratio => ratio >= Math.min(view.zoom * dpr, 3)) || 3;
  const stable = !tween && !pointers.size && now - idleSince > 200;
  const tasks = entries.slice().sort((a, b) => {
    const score = entry => !entry.painted ? -100000 : entry === focus ? -10000 : visible.includes(entry) ? -1000 : 0;
    return score(a) - score(b) || Math.hypot(a.room.center.x - view.x, a.room.center.y - view.y) - Math.hypot(b.room.center.x - view.x, b.room.center.y - view.y);
  });
  let deadline = performance.now() + 7;
  for (const entry of tasks) {
    if (entry.failed || performance.now() >= deadline) continue;
    const targetRatio = stable && visible.includes(entry) ? desired : entry.painter.active?.ratio || .5;
    try {
      if (!entry.painter.active || stable && entry.painter.active.ratio !== targetRatio) {
        entry.painter.prepare(targetRatio);
      }
      if (entry.painter.pending) entry.painter.service(deadline);
    } catch (error) { report(entry, error); }
  }
  const time = query.has('t') ? Number(query.get('t')) || 0 : reduceMotion ? 0 : (now - started) / 1000;
  const frame = Math.floor(time * 12);
  const priority = visible.filter(entry => entry.painter.active && !entry.failed).sort((a, b) => {
    if (!a.painted || a.painter.outputRevision !== a.painter.revision) return -1;
    if (!b.painted || b.painter.outputRevision !== b.painter.revision) return 1;
    return a.painter.lastPaint - b.painter.lastPaint;
  });
  deadline = performance.now() + 10;
  for (const entry of priority) {
    if (performance.now() >= deadline) break;
    const interval = visible.length <= 2 ? 83 : Math.max(100, visible.length * 18);
    if (entry.painted && entry.painter.outputRevision === entry.painter.revision && (reduceMotion || query.has('t') || now - entry.painter.lastPaint < interval)) continue;
    try {
      if (entry.painter.paint(frame / 12, frame)) upload(entry);
    } catch (error) { report(entry, error); }
  }
  const count = entries.filter(entry => entry.painter.active).length;
  const message = count === entries.length ? '' : `Printing the rooms… ${count} / ${entries.length}`;
  if (message !== lastStatus && !errors.length) { status.textContent = message; status.hidden = !message; lastStatus = message; }
  if (!loaded && count === entries.length) { loaded = true; tourNext = now + 3200; }
  for (const entry of entries) {
    if (!visible.includes(entry) && !entry.painter.pending && entry.painter.active?.ratio > .5) {
      entry.painter.prepare(.5);
    }
  }
}

stage.addEventListener('pointerdown', event => {
  interrupt(); event.preventDefault(); stage.focus({ preventScroll: true }); stage.setPointerCapture(event.pointerId);
  pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  velocity.x = velocity.y = 0;
  drag = { x: event.clientX, y: event.clientY, time: performance.now() };
  if (pointers.size === 2) {
    const [a, b] = [...pointers.values()];
    pinch = { distance: Math.hypot(a.x - b.x, a.y - b.y), zoom: view.zoom, anchor: toWorld((a.x + b.x) / 2, (a.y + b.y) / 2) };
  }
  stage.classList.add('drag');
});
stage.addEventListener('pointermove', event => {
  if (!pointers.has(event.pointerId)) return;
  interrupt(); pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
  if (pointers.size >= 2 && pinch) {
    const [a, b] = [...pointers.values()];
    const x = (a.x + b.x) / 2, y = (a.y + b.y) / 2;
    view.zoom = clamp(pinch.zoom * Math.hypot(a.x - b.x, a.y - b.y) / Math.max(1, pinch.distance), fitTarget().zoom, maximumZoom);
    view.x = pinch.anchor.x - (x - width / 2) / view.zoom; view.y = pinch.anchor.y - (y - height / 2) / view.zoom;
    return;
  }
  if (!drag) return;
  const now = performance.now(), dx = event.clientX - drag.x, dy = event.clientY - drag.y, dt = Math.max(8, now - drag.time);
  view.x -= dx / view.zoom; view.y -= dy / view.zoom;
  velocity.x = lerp(velocity.x, -dx / view.zoom / dt, .6); velocity.y = lerp(velocity.y, -dy / view.zoom / dt, .6);
  drag = { x: event.clientX, y: event.clientY, time: now };
});
function releasePointer(event) {
  if (!pointers.has(event.pointerId)) return;
  pointers.delete(event.pointerId);
  if (pointers.size) {
    pinch = null;
    const point = [...pointers.values()][0];
    drag = { ...point, time: performance.now() };
    return;
  }
  if (!drag || performance.now() - drag.time > 90) velocity.x = velocity.y = 0;
  drag = null; pinch = null; stage.classList.remove('drag'); interrupt();
}
stage.addEventListener('pointerup', releasePointer);
stage.addEventListener('pointercancel', releasePointer);
stage.addEventListener('lostpointercapture', releasePointer);
stage.addEventListener('wheel', event => {
  event.preventDefault(); interrupt(); velocity.x = velocity.y = 0;
  const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? height : 1);
  const anchor = toWorld(event.clientX, event.clientY);
  view.zoom = clamp(view.zoom * Math.exp(-clamp(delta, -600, 600) * .0015), fitTarget().zoom, maximumZoom);
  view.x = anchor.x - (event.clientX - width / 2) / view.zoom;
  view.y = anchor.y - (event.clientY - height / 2) / view.zoom;
}, { passive: false });
stage.addEventListener('dblclick', event => {
  event.preventDefault();
  const point = toWorld(event.clientX, event.clientY);
  const room = layout.roomAt(point.x, point.y);
  if (room) { focusRoom(room.index); idleSince = performance.now(); }
});
addEventListener('keydown', event => {
  if (event.metaKey || event.ctrlKey || event.altKey || event.target instanceof HTMLButtonElement) return;
  const key = event.key.toLowerCase(), step = 120 / view.zoom;
  if (!['arrowleft', 'arrowright', 'arrowup', 'arrowdown', 'w', 'a', 's', 'd', '+', '=', '-', '_', '0', 'escape', ' '].includes(key)) return;
  event.preventDefault(); interrupt();
  if (['arrowleft', 'a'].includes(key)) view.x -= step;
  else if (['arrowright', 'd'].includes(key)) view.x += step;
  else if (['arrowup', 'w'].includes(key)) view.y -= step;
  else if (['arrowdown', 's'].includes(key)) view.y += step;
  else if (['+', '='].includes(key)) view.zoom = clamp(view.zoom * 1.2, fitTarget().zoom, maximumZoom);
  else if (['-', '_'].includes(key)) view.zoom = clamp(view.zoom / 1.2, fitTarget().zoom, maximumZoom);
  else if (key === ' ') setTour(!tour);
  else viewAll();
});
document.querySelector('#previous').addEventListener('click', () => { setTour(false); focusRoom(tourIndex < 0 ? layout.rooms.length - 1 : tourIndex - 1); });
document.querySelector('#next').addEventListener('click', () => { setTour(false); focusRoom(tourIndex + 1); });
document.querySelector('#reset').addEventListener('click', viewAll);
tourButton.addEventListener('click', () => setTour(!tour));
addEventListener('pointermove', () => {
  document.body.classList.add('show-controls');
  clearTimeout(controlsTimer);
  controlsTimer = setTimeout(() => document.body.classList.remove('show-controls'), 1800);
});
addEventListener('resize', resize);
stage.addEventListener('webglcontextlost', event => {
  event.preventDefault(); status.hidden = false; status.textContent = 'Restoring the print…';
});
stage.addEventListener('webglcontextrestored', () => {
  paper.material.map.needsUpdate = true;
  for (const entry of entries) if (entry.texture) entry.texture.needsUpdate = true;
  status.hidden = loaded;
});
resize();
Object.assign(view, fitTarget());
const initialRoom = layout.rooms.findIndex(room => room.id === initialId);
if (initialRoom >= 0) focusRoom(initialRoom, 0);
setTour(tour);
renderer.setAnimationLoop(now => {
  if (document.hidden) { lastFrame = now; return; }
  const delta = lastFrame ? Math.min(64, now - lastFrame) : 16.7;
  lastFrame = now;
  if (tour && loaded && (!idleSince || now - idleSince > 30000) && now >= tourNext && !tween) {
    focusRoom(tourIndex + 1, tourIndex < 0 ? 4200 : 3400);
    tourNext = now + 14000;
    idleSince = 0;
  }
  if (tween) {
    const u = clamp((now - tween.start) / tween.duration, 0, 1);
    const eased = u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
    const lift = Math.sin(u * Math.PI) * Math.min(.35, Math.hypot(tween.to.x - tween.from.x, tween.to.y - tween.from.y) / 6000);
    view.x = lerp(tween.from.x, tween.to.x, eased); view.y = lerp(tween.from.y, tween.to.y, eased);
    view.zoom = lerp(tween.from.zoom, tween.to.zoom, eased) * (1 - lift);
    if (u >= 1) tween = null;
  } else if (!pointers.size) {
    view.x += velocity.x * delta; view.y += velocity.y * delta;
    velocity.x *= Math.exp(-delta / 200); velocity.y *= Math.exp(-delta / 200);
  }
  const overview = fitTarget();
  view.zoom = clamp(view.zoom, overview.zoom, maximumZoom);
  if (view.zoom <= overview.zoom + .000001) {
    view.x = overview.x;
    view.y = overview.y;
    velocity.x = velocity.y = 0;
  }
  updateArtwork(now);
  camera.position.set(view.x, -view.y, 10);
  camera.zoom = view.zoom;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});
globalThis.PRINT = {
  view,
  focus: id => { const index = layout.rooms.findIndex(room => room.id === id); if (index >= 0) { setTour(false); focusRoom(index); } },
  fit: viewAll,
  inspect: () => ({ renderer: 'Three.js', collection, rooms: entries.length, ready: entries.filter(entry => entry.painted).length, pending: entries.filter(entry => entry.painter.pending).length, textures: renderer.info.memory.textures, calls: renderer.info.render.calls, errors: errors.slice(), view: { ...view }, roomDetails: entries.map(entry => ({ id: entry.room.id, ready: entry.painted, ratio: entry.painter.active?.ratio || 0, pending: Boolean(entry.painter.pending), time: entry.painter.animationTime ?? null, paintMs: entry.painter.paintMs || 0 })) }),
};
