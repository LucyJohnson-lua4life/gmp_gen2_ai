import { deleteAiAction, getAiAction, getAiAttackEventInfo, getAiEnemyInfo, getAiPosition, getWaynet, setAiActionIfUndefined, setAiAttackEventInfo, setAiEnemyInfo } from "../../../aiStates/aiStateFunctions/commonAiStateFunctions"
import { hasMeleeWeapon } from "../../../aiFunctions/aiUtils"
import { GotoPoint, WarnEnemy, WarnEnemyActionInput } from "../../actions/commonActions"
import { IDefaultDescriptionTemplateValues } from "./defaultDescriptionTemplate"
import {Vector3} from "three";

export function warnEnemy(values: IDefaultDescriptionTemplateValues, warnableEnemyId: number) {
    const currentAction = getAiAction(values.aiState, values.aiId)
    const warnInput: WarnEnemyActionInput = {
        aiId: values.aiId,
        enemyId: warnableEnemyId,
        waitTime: 3000,
        warnDistance: 400,
        attackDistance: 0,
        aiState: values.aiState 
    }

    if (typeof currentAction !== 'undefined' && !(currentAction instanceof WarnEnemy)) {
        deleteAiAction(values.aiState, values.aiId)
    }
    setAiActionIfUndefined(values.aiState, new WarnEnemy(warnInput))
    revmp.drawMeleeWeapon(values.aiId)
}

export function setAttackerToEnemy(values: IDefaultDescriptionTemplateValues){
    const attackEvent = getAiAttackEventInfo(values.aiState, values.aiId) ?? {isUnderAttack: false, attackedBy: -1}
        const enemyId = getAiEnemyInfo(values.aiState, values.aiId)?.enemyId ?? -1
        if (enemyId === -1) {
            setAiEnemyInfo(values.aiState, { entityId: values.aiId, enemyId: attackEvent.attackedBy, lastAttackTime: 0 })
        }
        setAiAttackEventInfo(values.aiState, {entityId: values.aiId, isUnderAttack: false, attackedBy: -1})
}

export function gotoStartPoint(values: IDefaultDescriptionTemplateValues) {
    const startPoint = getAiPosition(values.aiState, values.aiId)?.startPoint
    const startWayPoint = typeof startPoint !== 'undefined' ? getWaynet(values.aiState).waypoints.get(startPoint) : undefined
    let pointVec: Vector3 | undefined = undefined;

    if (typeof startWayPoint === 'undefined') {
        if (startPoint !== undefined) {
            const startFreepoint = getWaynet(values.aiState).freepoints.get(startPoint)
            if (typeof startFreepoint !== 'undefined') {
                pointVec = startFreepoint.pos;
            }
        }
    }
    else {
        pointVec = startWayPoint.pos;
    }

    if (typeof pointVec !== 'undefined' && typeof startPoint !== 'undefined') {
        setAiActionIfUndefined(values.aiState, new GotoPoint(values.aiId, values.aiState, startPoint, "S_RUNL"))
        if(hasMeleeWeapon(values.aiId)){
            revmp.putWeaponAway(values.aiId)
        }
    }
}


