import { enrichments } from './details.js';
import afterHours from './after-hours.js';
import strangeJourneys from './strange-journeys.js';
import impossiblePlaces from './impossible-places.js';
import curiousTrades from './curious-trades.js';
import dreamLogic from './dream-logic.js';

export const NEW_ROOMS = [...afterHours, ...strangeJourneys, ...impossiblePlaces, ...curiousTrades, ...dreamLogic].map((room, index) => ({ ...enrichments[room.id](room), order: index + 1 }));
