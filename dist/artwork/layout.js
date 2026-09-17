import { ROOMS, iso, isoX, isoY, pip } from './drawings.js';

export function createLayout(columns = 5) {
  const definitions = ROOMS.slice().sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  const rows = Math.ceil(definitions.length / columns);
  const rooms = definitions.map((definition, index) => {
    const row = rows - 1 - Math.floor(index / columns);
    const column = row % 2 ? columns - 1 - index % columns : index % columns;
    const ox = isoX(column * 16, row * 16);
    const oy = isoY(column * 16, row * 16, 0);
    const head = 210 + Math.max(0, definition.head || 0);
    const local = { x0: isoX(0, definition.d) - 24, y0: -head, x1: isoX(definition.w, 0) + 24, y1: isoY(definition.w, definition.d, 0) + 34 };
    const diamond = [iso(0, 0, 0), iso(definition.w, 0, 0), iso(definition.w, definition.d, 0), iso(0, definition.d, 0)].map(([x, y]) => [x + ox, y + oy]);
    const bounds = { x0: ox + local.x0, y0: oy + local.y0, x1: ox + local.x1, y1: oy + local.y1 };
    return {
      id: definition.id, definition, index, column, row, ox, oy, local, diamond, bounds,
      center: { x: ox + (local.x0 + local.x1) / 2, y: oy + (local.y0 + local.y1) / 2 + 60 * 210 / head },
      card: { x0: diamond[3][0], y0: diamond[0][1], x1: diamond[1][0], y1: diamond[2][1] + 13 },
    };
  });
  const drawOrder = rooms.slice().sort((a, b) => a.column + a.row - b.column - b.row);
  const world = {
    x0: Math.min(...rooms.map(room => room.bounds.x0)),
    y0: Math.min(...rooms.map(room => room.bounds.y0)),
    x1: Math.max(...rooms.map(room => room.bounds.x1)),
    y1: Math.max(...rooms.map(room => room.bounds.y1)),
  };
  const sheet = { x0: world.x0 - 420, y0: world.y0 - 336, x1: world.x1 + 420, y1: world.y1 + 420 };
  const roomAt = (x, y) => drawOrder.slice().reverse().find(room => pip(room.diamond, x, y));
  return { rooms, drawOrder, world, sheet, roomAt };
}

export function overlaps(a, b) {
  return a.x0 <= b.x1 && a.x1 >= b.x0 && a.y0 <= b.y1 && a.y1 >= b.y0;
}
