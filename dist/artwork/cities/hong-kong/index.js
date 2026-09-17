import aberdeenMooring from './aberdeen-mooring.js';
import kennedyTownTram from './kennedy-town-tram.js';
import sheungWanMilkTea from './sheung-wan-milk-tea.js';
import northPointMarket from './north-point-market.js';
import choiHungBreakfast from './choi-hung-breakfast.js';
import mongKokFlowers from './mong-kok-flowers.js';
import shamShuiPoFabric from './sham-shui-po-fabric.js';
import kwunTongPrint from './kwun-tong-print.js';
import tsuenWanBamboo from './tsuen-wan-bamboo.js';
import kowloonBayPorcelain from './kowloon-bay-porcelain.js';
import yauMaTeiOpera from './yau-ma-tei-opera.js';
import harbourFerry from './harbour-ferry.js';
import shaTinRowing from './sha-tin-rowing.js';
import taiPoCycle from './tai-po-cycle.js';
import saiKungKayak from './sai-kung-kayak.js';
import tinShuiWaiHide from './tin-shui-wai-hide.js';
import lauFauShanOysters from './lau-fau-shan-oysters.js';
import taiOStiltHouse from './tai-o-stilt-house.js';
import lammaParcels from './lamma-parcels.js';
import pingShanCourtyard from './ping-shan-courtyard.js';
import westKowloonSketch from './west-kowloon-sketch.js';
import taiHangDragon from './tai-hang-dragon.js';
import wanChaiSteps from './wan-chai-steps.js';
import centralWalkway from './central-walkway.js';
import quarryBayWindow from './quarry-bay-window.js';

export const HONG_KONG_ROOMS = [
  aberdeenMooring, kennedyTownTram, sheungWanMilkTea, northPointMarket, choiHungBreakfast,
  mongKokFlowers, shamShuiPoFabric, kwunTongPrint, tsuenWanBamboo, kowloonBayPorcelain,
  yauMaTeiOpera, harbourFerry, shaTinRowing, taiPoCycle, saiKungKayak,
  tinShuiWaiHide, lauFauShanOysters, taiOStiltHouse, lammaParcels, pingShanCourtyard,
  westKowloonSketch, taiHangDragon, wanChaiSteps, centralWalkway, quarryBayWindow,
].map((room, index) => ({ ...room, order: index + 1 }));
