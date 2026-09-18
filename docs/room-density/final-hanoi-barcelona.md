# Hanoi and Barcelona detail review

Reviewed on 2026-09-18 after the final additions to four rooms.

| Room | Added detail | Visual result |
| --- | --- | --- |
| `hanoi/night-soup-table` | Three lidded provision jars, condiment shelf, small produce tray, hanging strainer, extra bowls, storage jar, and drying cloth | The rear corner now reads as kitchen storage. The central covered bowl and seated arrival remain clear. |
| `hanoi/bicycle-courier` | Stacked wrapping sheets, tape rolls, repair-tool caddy, coiled tube, patch packets, pencils, and marked packing slips | Shelf compartments have distinct uses. The parcel flap, hands, bicycle, and exit route remain visible. |
| `barcelona/linen-balcony` | Rolled towels, different folded stack sizes, colored hems, laundry basket, scrub brush, soap tray, and washing tin | The six repeated stacks now have different shapes. Supplies occupy the lower shelf while the basin and pulley action stay clear. |
| `barcelona/listening-balcony` | Group photograph, portrait, landscape, varied record spine widths and labels, used sleeve, record brush, and cleaning cloth | The wall frames have distinct subjects. The record collection reads as used storage while the guitarist and listener remain the focus. |

Rendered and visually inspected all four rooms at normal width 800, close width 1400, and time 7 seconds. The still times were 23, 10, 8, and 12 seconds, respectively. `git diff --check` passed for the four scene files.

Evidence:

- `/tmp/final-hanoi-barcelona-normal.png`
- `/tmp/final-hanoi-barcelona-close.png`
- `/tmp/final-hanoi-barcelona-phase-7.png`

Reproduce the normal sheet:

```sh
node /tmp/rooms-200-render/density-render.mjs --root /Users/Developer/code/github.com/khoi/a-small-light-somewhere-else --rooms hanoi/night-soup-table,hanoi/bicycle-courier,barcelona/linen-balcony,barcelona/listening-balcony --width 800 --columns 2 --out /tmp/final-hanoi-barcelona-normal.png
```

For the close sheet, use `--width 1400` and a different output path. For the motion phase, use `--time 7` and a different output path.
