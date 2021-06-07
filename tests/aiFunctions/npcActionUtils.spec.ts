import { NpcActionUtils } from '../../scripts/aiFunctions/npcActionUtils';
import {EntityManager} from '../../scripts/aiStates/entityManager';

const worldName = "NEWWORLD\\NEWWORLD.ZEN"
const AITargetDistance = 2500;
test('Should only return npc ids that are in the same 2500x2500x2500 distance sector.', () => {
    let entityManager:EntityManager = new EntityManager();
   // state.positionMap[worldName][calculatePositionCheckSum(3200,3000,)]
    addNpcByChecksum(entityManager, calculatePositionCheckSum(2700,2800,2900), 1);
    addNpcByChecksum(entityManager, calculatePositionCheckSum(3800,3900,3000), 2);
    addNpcByChecksum(entityManager, calculatePositionCheckSum(5100,3900,3000), 3);
    addNpcByChecksum(entityManager, calculatePositionCheckSum(7100,7000,7450), 4);
    addNpcByChecksum(entityManager, calculatePositionCheckSum(5500,6100,5700), 5);

   let actionUtils:NpcActionUtils = new NpcActionUtils(entityManager);

   expect(actionUtils.getNearbyNpcs(worldName, 3000,3000,3000)).toStrictEqual([1,2]) 
   expect(actionUtils.getNearbyNpcs(worldName, 5100,3000,3000)).toStrictEqual([3]) 
   expect(actionUtils.getNearbyNpcs(worldName, 5800,6000,6200)).toStrictEqual([4,5]) 

})

function addNpcByChecksum(entityManager:EntityManager, checksum:number, npcid:number){
    let npclist = entityManager.positionMap.get(worldName).get(checksum);
    if(typeof npclist === 'undefined'){
        entityManager.positionMap.get(worldName).set(checksum, []);
    }
    entityManager.positionMap.get(worldName).get(checksum).push(npcid);
}

function calculatePositionCheckSum(x:number, y:number, z:number){
    return Math.floor(x/AITargetDistance)+1000 * Math.floor(y/AITargetDistance)+1000 * Math.floor(z/AITargetDistance)*1000
}