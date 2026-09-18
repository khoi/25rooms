# Final Hong Kong domestic and café revision

Edited only `choi-hung-breakfast.js` and `sheung-wan-milk-tea.js` in the main checkout. Prior room work is retained.

| Room | Added scene relationships | Construction and value hierarchy | Visual review |
| --- | --- | --- | --- |
| Choi Hung | Toast board and knife below an egg/utensil shelf; cookware beside stove; school satchel, workbook and pencil cup beside the coat rail; bedside books, clock, lamp and open linen drawer; bookmark and striped blanket on bed | Dark kitchen splash recess, supported preparation shelf, dark school storage compartments, recessed bedside bookcase, lamp glow | Opened before and final 800px, final 1400px, and 5/11/22-second motion views. Moved bedside cabinet from behind the adult to the side of the bed and removed its tall headboard after the first close view revealed misleading overlap with the adult's feet. Hand, folding tabletop and child route stay clear. |
| Sheung Wan | Open tea tin and scoop beside a weighing platform; folded filter cloths and drying rail above; rinsed pot and spoon tray; clock above wash area; customer table with cup, half-toast, book, bench cushion and bag; open paper drawer below serving counter | Replaced the generic six-tin row with a varied preparation assembly, supported shelf and dark splash recess; dark serving-storage recesses; joined foreground seating/table group | Opened before/final 800px and final 1400px; inspected 5/11/18-second motion views plus still/start. Pouring hands and stream remain visible, and the new seating stays below the working area. |

Evidence actually inspected:

- `/tmp/hk-domestic-before.png`
- `/tmp/hk-domestic-final-normal.png`
- `/tmp/hk-domestic-choi-corrected.png`
- `/tmp/hk-domestic-choi-hung-breakfast-still.png`
- `/tmp/hk-domestic-choi-hung-breakfast-5.png`
- `/tmp/hk-domestic-choi-hung-breakfast-11.png`
- `/tmp/hk-domestic-choi-hung-breakfast-22.png`
- `/tmp/hk-domestic-sheung-wan-milk-tea-still.png`
- `/tmp/hk-domestic-sheung-wan-milk-tea-5.png`
- `/tmp/hk-domestic-sheung-wan-milk-tea-11.png`
- `/tmp/hk-domestic-sheung-wan-milk-tea-18.png`

The center of the home still has broad clearance for the child's stool movement. The café keeps a continuous aisle around the pouring worker. Small clock ticks, pencil tips, and the bookmark reward close inspection; the new shelves, table group, and bedside cabinet read at normal size. Neither room relies on extra floor texture for this increase in detail. IDs, loop durations, still times, and all original animation/contact code are unchanged.

Validation: `node scripts/check-rooms.mjs` passes: 325 unique rooms across 13 collections; valid layout and hit targets; 300 authored rooms draw in 4144 sampled animation frames, including 250 declared loop boundaries.
