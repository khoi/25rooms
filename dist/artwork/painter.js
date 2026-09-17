import { FIGURES, mkHand, streamOf, PAPER, rgb, rect, circ } from './drawings.js';
import { overlaps } from './layout.js';

function canvas(width, height) {
  const element = document.createElement('canvas');
  element.width = Math.max(1, Math.ceil(width));
  element.height = Math.max(1, Math.ceil(height));
  return element;
}

export class RoomPainter {
  constructor(room, layout) {
    this.room = room;
    this.layout = layout;
    this.canvas = canvas(1, 1);
    this.context = this.canvas.getContext('2d');
    this.active = null;
    this.pending = null;
    this.lastPaint = -Infinity;
    this.revision = 0;
    this.outputRevision = -1;
    this.disposed = false;
  }

  prepare(ratio) {
    if (this.pending?.ratio === ratio || this.active?.ratio === ratio) return;
    this.cancel();
    const { local, definition } = this.room;
    const scope = Object.create(definition);
    this.pending = { ratio, scope, layers: [], index: 0 };
    for (const name of ['under', 'over']) {
      const target = canvas((local.x1 - local.x0) * ratio, (local.y1 - local.y0) * ratio);
      const context = target.getContext('2d');
      context.setTransform(ratio, 0, 0, ratio, -local.x0 * ratio, -local.y0 * ratio);
      this.pending.layers.push({ name, canvas: target, context, operations: null, index: 0 });
    }
  }

  service(deadline) {
    const job = this.pending;
    if (!job) return false;
    const definition = this.room.definition;
    while (job.index < job.layers.length && performance.now() < deadline) {
      const layer = job.layers[job.index];
      if (!layer.operations) {
        layer.operations = [];
        if (typeof definition[layer.name] === 'function') {
          const hand = mkHand({ sink: layer.operations, boil: 0 });
          definition[layer.name].call(job.scope, hand, streamOf(definition.seed, layer.name));
        }
      }
      while (layer.index < layer.operations.length && performance.now() < deadline) {
        layer.operations[layer.index](layer.context);
        layer.operations[layer.index++] = null;
      }
      if (layer.index === layer.operations.length) {
        layer.operations = null;
        job.index++;
      }
    }
    if (job.index < job.layers.length) return false;
    this.release(this.active);
    this.active = job;
    this.pending = null;
    this.canvas.width = job.layers[0].canvas.width;
    this.canvas.height = job.layers[0].canvas.height;
    this.revision++;
    this.lastPaint = -Infinity;
    return true;
  }

  protect(context) {
    const room = this.room;
    const others = this.layout.drawOrder.filter(other => other !== room && other.column + other.row < room.column + room.row && overlaps(other.bounds, room.bounds) && overlaps(other.card, room.bounds));
    if (!others.length) return;
    const b = room.bounds;
    context.beginPath();
    context.rect(b.x0 - 50, b.y0 - 50, b.x1 - b.x0 + 100, b.y1 - b.y0 + 100);
    for (const other of others) {
      const d = other.diamond;
      const points = [d[0], d[1], [d[1][0], d[1][1] + 13], [d[2][0], d[2][1] + 13], [d[3][0], d[3][1] + 13], d[3]];
      context.moveTo(...points[0]);
      for (let i = 1; i < points.length; i++) context.lineTo(...points[i]);
      context.closePath();
    }
    context.clip('evenodd');
  }

  paint(time, frame) {
    if (!this.active) return false;
    const { ratio, scope, layers } = this.active;
    const { definition, bounds, local, ox, oy } = this.room;
    const context = this.context;
    const boil = Math.floor(frame / 4);
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    context.save();
    context.setTransform(ratio, 0, 0, ratio, -bounds.x0 * ratio, -bounds.y0 * ratio);
    this.protect(context);
    context.translate(ox, oy);
    context.drawImage(layers[0].canvas, local.x0, local.y0, local.x1 - local.x0, local.y1 - local.y0);
    const hand = mkHand({ sink: context, boil, cull: local });
    if (typeof definition.live === 'function') definition.live.call(scope, hand, streamOf(definition.seed, 'live', boil), time);
    const pieces = hand.pieces.map(piece => ({ key: piece.key, draw: () => piece.fn(hand) }));
    for (const [index, figure] of (definition.figures || []).entries()) {
      const state = FIGURES.state(figure, time, definition);
      if (state.hidden) continue;
      const [x, y] = hand.p(state.i, state.j, state.z);
      const ground = figure.groundZ ?? state.groundZ ?? 0;
      pieces.push({
        key: state.i + state.j + state.z * .001 + (figure.who === 'spark' ? .02 : 0),
        draw: () => FIGURES.draw(hand, streamOf(definition.seed, 'fig', index, boil), {
          ...state, who: figure.who, x, y, time, t: time, scale: figure.scale ?? FIGURES.SCALE,
          z: state.z - ground, ground: hand.p(state.i, state.j, ground),
        }),
      });
    }
    pieces.sort((a, b) => a.key - b.key);
    for (const piece of pieces) piece.draw();
    context.drawImage(layers[1].canvas, local.x0, local.y0, local.x1 - local.x0, local.y1 - local.y0);
    context.restore();
    this.lastPaint = performance.now();
    this.outputRevision = this.revision;
    return true;
  }

  release(job) {
    if (!job) return;
    for (const layer of job.layers) {
      layer.canvas.width = layer.canvas.height = 1;
      layer.operations = null;
    }
  }

  cancel() {
    this.release(this.pending);
    this.pending = null;
  }

  dispose() {
    this.cancel();
    this.release(this.active);
    this.active = null;
    this.canvas.width = this.canvas.height = 1;
  }
}

export function paintSheet(bounds) {
  const ratio = .5;
  const result = canvas((bounds.x1 - bounds.x0) * ratio, (bounds.y1 - bounds.y0) * ratio);
  const context = result.getContext('2d');
  context.fillStyle = rgb(PAPER);
  context.fillRect(0, 0, result.width, result.height);
  const random = streamOf('stock');
  for (let n = 0; n < result.width * result.height / 60; n++) {
    const x = random() * result.width, y = random() * result.height;
    context.fillStyle = random() < .5 ? 'rgba(255,255,255,.35)' : 'rgba(120,96,70,.07)';
    context.fillRect(x, y, random() * 2 + .5, random() * 1.2 + .4);
  }
  for (let n = 0; n < result.width * result.height / 9000; n++) {
    context.strokeStyle = 'rgba(120,96,70,.08)'; context.lineWidth = .6;
    const x = random() * result.width, y = random() * result.height, angle = random() * Math.PI * 2, length = 3 + random() * 9;
    context.beginPath(); context.moveTo(x, y);
    context.quadraticCurveTo(x + Math.cos(angle + .6) * length * .5, y + Math.sin(angle + .6) * length * .5, x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    context.stroke();
  }
  context.setTransform(ratio, 0, 0, ratio, -bounds.x0 * ratio, -bounds.y0 * ratio);
  const hand = mkHand({ sink: context, boil: 0 });
  const ink = streamOf('sheet', 0);
  const b = bounds, inset = 110;
  for (const [x, y, sx, sy] of [[b.x0 + inset, b.y0 + inset, -1, -1], [b.x1 - inset, b.y0 + inset, 1, -1], [b.x1 - inset, b.y1 - inset, 1, 1], [b.x0 + inset, b.y1 - inset, -1, 1]]) {
    for (const color of ['blue', 'coral', 'sun', 'teal']) {
      hand.line(ink, [[x + sx * 12, y], [x + sx * 82, y]], color, 2, { amp: 0 });
      hand.line(ink, [[x, y + sy * 12], [x, y + sy * 82]], color, 2, { amp: 0 });
    }
  }
  for (const [x, y] of [[(b.x0 + b.x1) / 2, b.y0 + inset], [(b.x0 + b.x1) / 2, b.y1 - inset], [b.x0 + inset, (b.y0 + b.y1) / 2], [b.x1 - inset, (b.y0 + b.y1) / 2]]) {
    for (const color of ['blue', 'coral', 'sun', 'teal']) {
      hand.line(ink, circ(x, y, 26, 40), color, 2, { closed: true, amp: 0 });
      hand.line(ink, [[x - 42, y], [x + 42, y]], color, 2, { amp: 0 });
      hand.line(ink, [[x, y - 42], [x, y + 42]], color, 2, { amp: 0 });
    }
  }
  const bx = b.x1 - inset - 40, by = b.y1 - inset - 90;
  let swatch = 0;
  const drawSwatch = draw => {
    const polygon = rect(bx - (swatch + 1) * 50, by, bx - swatch * 50 - 6, by + 44);
    draw(polygon); hand.outline(ink, polygon, 'blue', .6, { tone: .4, amp: 0 }); swatch++;
  };
  for (const color of ['blue', 'coral', 'sun', 'teal']) for (const tone of [1, .5, .2]) drawSwatch(polygon => hand.fill(polygon, color, tone));
  for (const [first, second] of [['coral', 'sun'], ['blue', 'sun'], ['coral', 'blue'], ['teal', 'coral']]) drawSwatch(polygon => { hand.fill(polygon, first, 1); hand.tint(polygon, second, 1); });
  FIGURES.draw(hand, ink, { who: 'spark', x: b.x0 + inset + 60, y: b.y1 - inset - 60, t: 0, scale: 3, opts: { mood: 'idle', noShadow: true } });
  return result;
}
