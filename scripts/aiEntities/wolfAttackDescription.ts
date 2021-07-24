
import { IActionDescription } from './IActionDescription';
import { EntityManager } from '../aiStates/entityManager';
import { getAngle, getDistance } from "../aiFunctions/aiUtils";
import { SFistAttackAction, WaitAction, TurnToTargetAction, RunToTargetAction} from "../aiFunctions/commonActions";

export class WolfAttackDescription implements IActionDescription {
    entityId: number

    constructor(id: number) {
        this.entityId = id
    }

    describeAction(entityManager: EntityManager): void {
        let enemyId = entityManager.getEnemyComponent(this.entityId).enemyId
        if(this.enemyExists(enemyId)){
            let range = getDistance(this.entityId, enemyId)
            if(range < 800){
                this.describeFightAction(entityManager, enemyId, range)
            }
        }

    }

    private describeFightAction(entityManager: EntityManager, enemyId: number, range: number):void {

        if(range > 300){
            entityManager.getActionsComponent(this.entityId).nextActions.push(new RunToTargetAction(5,this.entityId, enemyId, 300))
        }

    }


    private enemyExists(id: number): boolean {
        return id >= 0 && revmp.isPlayer(id)
    }
}
