import { NpcActionUtils } from '../../scripts/aiFunctions/npcActionUtils';
import {AIState} from '../../scripts/aiStates/aiStates';

const worldName = "NEWWORLD\\NEWWORLD.ZEN"
const AITargetDistance = 2500;
test('Should only return npc ids that are in the same 2500x2500x2500 distance sector.', () => {
    let state:AIState = new AIState();
   // state.positionMap[worldName][calculatePositionCheckSum(3200,3000,)]
    addNpcByChecksum(state, calculatePositionCheckSum(2700,2800,2900), 1);
    addNpcByChecksum(state, calculatePositionCheckSum(3800,3900,3000), 2);
    addNpcByChecksum(state, calculatePositionCheckSum(5100,3900,3000), 3);
    addNpcByChecksum(state, calculatePositionCheckSum(7100,7000,7450), 4);
    addNpcByChecksum(state, calculatePositionCheckSum(5500,6100,5700), 5);

   let actionUtils:NpcActionUtils = new NpcActionUtils(state);

   expect(actionUtils.getNearbyNpcs(worldName, 3000,3000,3000)).toStrictEqual([1,2]) 
   expect(actionUtils.getNearbyNpcs(worldName, 5100,3000,3000)).toStrictEqual([3]) 
   expect(actionUtils.getNearbyNpcs(worldName, 5800,6000,6200)).toStrictEqual([4,5]) 

})

function addNpcByChecksum(state:AIState, checksum:number, npcid:number){
    let npclist = state.positionMap[worldName][checksum];
    if(typeof npclist === 'undefined'){
        state.positionMap[worldName][checksum] = []
    }
    state.positionMap[worldName][checksum].push(npcid);
}

function calculatePositionCheckSum(x:number, y:number, z:number){
    return Math.floor(x/AITargetDistance)+1000 * Math.floor(y/AITargetDistance)+1000 * Math.floor(z/AITargetDistance)*1000
}