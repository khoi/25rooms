import toyosu from './toyosu-dawn.js';
import yamanote from './yamanote-carriage.js';
import yanaka from './yanaka-breakfast.js';
import asakusa from './asakusa-incense.js';
import ryogoku from './ryogoku-practice.js';
import jimbocho from './jimbocho-books.js';
import kiriko from './sumida-kiriko.js';
import kappabashi from './kappabashi-samples.js';
import kiyosumi from './kiyosumi-roastery.js';
import ginza from './ginza-sweets.js';
import harajuku from './harajuku-atelier.js';
import akihabara from './akihabara-repair.js';
import nakano from './nakano-collectors.js';
import shimokitazawa from './shimokitazawa-rehearsal.js';
import nerima from './nerima-animation.js';
import meiji from './meiji-clearing.js';
import ueno from './ueno-hanami.js';
import yakatabune from './sumida-yakatabune.js';
import sento from './koto-sento.js';
import shiba from './shiba-rooftop.js';
import shibuya from './shibuya-window.js';
import yakitori from './shinjuku-yakitori.js';
import goldenGai from './golden-gai-records.js';
import koenji from './koenji-laundry.js';
import sangenjaya from './sangenjaya-home.js';

export const TOKYO_ROOMS = [
  toyosu, yamanote, yanaka, asakusa, ryogoku,
  jimbocho, kiriko, kappabashi, kiyosumi, ginza,
  harajuku, akihabara, nakano, shimokitazawa, nerima,
  meiji, ueno, yakatabune, sento, shiba,
  shibuya, yakitori, goldenGai, koenji, sangenjaya,
].map((room, index) => ({ ...room, order: index + 1 }));
