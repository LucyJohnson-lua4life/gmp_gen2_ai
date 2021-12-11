import { NpcActionUtils } from '../../src/aiScripts/aiFunctions/npcActionUtils';
import { AiState } from '../../src/aiScripts/aiStates/aiState';
import { getCharacterInPositionAreas } from '../../src/aiScripts/aiStates/aiStateFunctions';

const worldName = "NEWWORLD\\NEWWORLD.ZEN"
const AITargetDistance = 2500;
test('Should only return npc ids that are in the same 2500x2500x2500 distance sector.', () => {
    const aiState: AiState = new AiState("./tests/waynet/test_with_whitespaces.wp","./tests/waynet/test_with_whitespaces.fp")
   // state.positionMap[worldName][calculatePositionCheckSum(3200,3000,)]
    addNpcByChecksum(aiState, calculatePositionCheckSum(2700,2800,2900), 1);
    addNpcByChecksum(aiState, calculatePositionCheckSum(3800,3900,3000), 2);
    addNpcByChecksum(aiState, calculatePositionCheckSum(5100,3900,3000), 3);
    addNpcByChecksum(aiState, calculatePositionCheckSum(7100,7000,7450), 4);
    addNpcByChecksum(aiState, calculatePositionCheckSum(5500,6100,5700), 5);

   const actionUtils:NpcActionUtils = new NpcActionUtils(aiState);

   expect(actionUtils.getNearbyNpcs(worldName, 3000,3000,3000)).toStrictEqual([1,2]) 
   expect(actionUtils.getNearbyNpcs(worldName, 5100,3000,3000)).toStrictEqual([3]) 
   expect(actionUtils.getNearbyNpcs(worldName, 5800,6000,6200)).toStrictEqual([4,5]) 

})

function addNpcByChecksum(aiState:AiState, checksum:number, npcid:number){
    const npclist = getCharacterInPositionAreas(aiState)?.get(worldName)?.get(checksum);
    if(typeof npclist === 'undefined'){
        getCharacterInPositionAreas(aiState)?.get(worldName)?.set(checksum, []);
    }
    getCharacterInPositionAreas(aiState)?.get(worldName)?.get(checksum)?.push(npcid);
}

function calculatePositionCheckSum(x:number, y:number, z:number){
    return Math.floor(x/AITargetDistance)+1000 * Math.floor(y/AITargetDistance)+1000 * Math.floor(z/AITargetDistance)*1000
}
