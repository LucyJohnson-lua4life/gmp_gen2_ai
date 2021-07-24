
import { IActionDescription } from './IActionDescription';
import { EntityManager } from '../aiStates/entityManager';
import { getAngle, getDistance } from "../aiFunctions/aiUtils";
import { SFistAttackAction, SRunParadeJump, SRunStrafeLeft, SRunStrafeRight, RunToTargetAction, WaitAction, TurnToTargetAction} from "../aiFunctions/commonActions";

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
        else{

            let random = Math.floor(Math.random() * 4);

            if(random == 0){
                entityManager.getActionsComponent(this.entityId).nextActions.push(new TurnToTargetAction(2, this.entityId, enemyId))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new SFistAttackAction(2, this.entityId, enemyId, 400))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(2, this.entityId, 800, new Date().getMilliseconds()))
            }
            else if(random == 1){
                entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunParadeJump(2, this.entityId))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new TurnToTargetAction(2, this.entityId, enemyId))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(2, this.entityId, 400, new Date().getMilliseconds()))
            }

            else if (random == 2) {
                entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunStrafeLeft(2, this.entityId))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new TurnToTargetAction(2, this.entityId, enemyId))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(2, this.entityId, 400, new Date().getMilliseconds()))
            }

            else if (random == 3) {
                entityManager.getActionsComponent(this.entityId).nextActions.push(new SRunStrafeRight(2, this.entityId))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new TurnToTargetAction(2, this.entityId, enemyId))
                entityManager.getActionsComponent(this.entityId).nextActions.push(new WaitAction(2, this.entityId, 400, new Date().getMilliseconds()))
            }

        }

    }


    private enemyExists(id: number): boolean {
        return id >= 0 && revmp.isPlayer(id)
    }
}
