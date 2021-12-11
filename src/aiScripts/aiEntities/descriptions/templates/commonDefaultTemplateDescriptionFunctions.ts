import { deleteActionsComponent, getActionsComponent, getAttackEventComponent, getEnemyComponent, getPositionsComponents, getWaynet, setActionsComponentIfUndefined, setAttackEventComponent, setEnemyComponent } from "../../../aiStates/aiStateFunctions/commonAiStateFunctions"
import { getDistanceToPoint, hasMeleeWeapon } from "../../../aiFunctions/aiUtils"
import { GotoPoint, WarnEnemy, WarnEnemyActionInput } from "../../actions/commonActions"
import { IActionComponent } from "../../components/iActionsComponent"
import { IAiAction } from "../../iAiAction"
import { IDefaultDescriptionTemplateValues } from "./defaultDescriptionTemplate"

export function warnEnemy(values: IDefaultDescriptionTemplateValues, warnableEnemyId: number) {
    const actionsComponent = getActionsComponent(values.aiState, values.aiId)
    const warnInput: WarnEnemyActionInput = {
        aiId: values.aiId,
        enemyId: warnableEnemyId,
        waitTime: 3000,
        warnDistance: 400,
        attackDistance: 0,
        aiState: values.aiState 
    }

    if (typeof actionsComponent !== 'undefined' && !(actionsComponent instanceof WarnEnemy)) {
        deleteActionsComponent(values.aiState, values.aiId)
    }
    setActionsComponentIfUndefined(values.aiState, new WarnEnemy(warnInput))
    revmp.drawMeleeWeapon(values.aiId)
}

export function setAttackerToEnemy(values: IDefaultDescriptionTemplateValues){
    const attackEvent = getAttackEventComponent(values.aiState, values.aiId) ?? {isUnderAttack: false, attackedBy: -1}
        const enemyId = getEnemyComponent(values.aiState, values.aiId)?.enemyId ?? -1
        if (enemyId === -1) {
            setEnemyComponent(values.aiState, { entityId: values.aiId, enemyId: attackEvent.attackedBy, lastAttackTime: 0 })
        }
        setAttackEventComponent(values.aiState, {entityId: values.aiId, isUnderAttack: false, attackedBy: -1})
}

export function gotoStartPoint(values: IDefaultDescriptionTemplateValues) {
    const startPoint = getPositionsComponents(values.aiState, values.aiId)?.startPoint
    const startWayPoint = typeof startPoint !== 'undefined' ? getWaynet(values.aiState).waypoints.get(startPoint) : undefined
    let pointVec: revmp.Vec3 | undefined = undefined;

    if (typeof startWayPoint === 'undefined') {
        const startFreepoint = getWaynet(values.aiState).freepoints.find(fp => fp.fpName === startPoint)
        if (typeof startFreepoint !== 'undefined') {
            pointVec = [startFreepoint.x, startFreepoint.y, startFreepoint.z]
        }
    }
    else {
        pointVec = [startWayPoint.x, startWayPoint.y, startWayPoint.z]
    }

    if (typeof pointVec !== 'undefined' && typeof startPoint !== 'undefined') {
        setActionsComponentIfUndefined(values.aiState, new GotoPoint(values.aiId, values.aiState, startPoint, "S_RUNL"))
        if(hasMeleeWeapon(values.aiId)){
            revmp.putWeaponAway(values.aiId)
        }
    }
}


