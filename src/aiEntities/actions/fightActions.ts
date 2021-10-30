import { getAngleToTarget, getCombatStateBasedAni, getDistance, isAniPlaying } from "../../aiFunctions/aiUtils"
import { IAiAction} from "../iAiAction"

export class StrafeLeftWithPause implements IAiAction {
    aiId: number
    shouldLoop: boolean
    waitTime: number
    pauseTime: number | undefined

    constructor(aiId: number, pauseTime: number) {
        this.aiId = aiId
        this.shouldLoop = true
        this.waitTime = pauseTime
    }

    public executeAction(): void {
        if (typeof this.pauseTime === 'undefined') {
            this.pauseTime = Date.now()
            revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "T_RUNSTRAFEL"))
        }
        if (Date.now() > this.pauseTime + this.waitTime) {
            this.shouldLoop = false
        }
    }
}


export class StrafeRightWithPause implements IAiAction {
    aiId: number
    shouldLoop: boolean
    pauseTime: number
    startTime: number | undefined

    constructor(aiId: number, pauseTime: number) {
        this.aiId = aiId
        this.shouldLoop = true
        this.pauseTime = pauseTime
    }

    public executeAction(): void {
        if (typeof this.startTime === 'undefined') {
            this.startTime = Date.now()
            revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "T_RUNSTRAFER"))
        }

        if (Date.now() > this.startTime + this.pauseTime) {
            this.shouldLoop = false
        }
    }
}

export class ParadeWithPause implements IAiAction {
    aiId: number
    shouldLoop: boolean
    pauseTime: number
    startTime: number | undefined
    constructor(aiId: number, pauseTime: number) {
        this.aiId = aiId
        this.shouldLoop = true
        this.pauseTime = pauseTime
    }

    public executeAction(): void {
        if (typeof this.startTime === 'undefined') {
            this.startTime = Date.now()
            revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "T_PARADEJUMPB"))
        }

        if (Date.now() > this.startTime + this.pauseTime) {
            this.shouldLoop = false
        }
    }
}


export class DoubleParadeWithPause implements IAiAction {
    aiId: number
    shouldLoop: boolean
    pauseTime: number
    startTime: number | undefined
    paradePauseTime = 500
    constructor(aiId: number, pauseTime: number) {
        this.aiId = aiId
        this.shouldLoop = true
        this.pauseTime = pauseTime
    }

    public executeAction(): void {
        if (typeof this.startTime === 'undefined') {
            this.startTime = Date.now()
            revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "T_PARADEJUMPB"))
        }

        if (Date.now() > this.startTime + this.paradePauseTime) {
            revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "T_PARADEJUMPB"))
        }

        if (Date.now() > this.startTime + this.pauseTime + this.paradePauseTime) {
            this.shouldLoop = false
        }
    }
}



export class ForwardAttackWithPause implements IAiAction {
    aiId: number
    shouldLoop: boolean
    victimId: number
    necessaryDistance: number
    pauseTime: number
    startTime: number | undefined

    constructor(aiId: number, victimId: number, necessaryDistance: number, pauseTime: number) {
        this.aiId = aiId
        this.shouldLoop = true
        this.victimId = victimId
        this.necessaryDistance = necessaryDistance
        this.pauseTime = pauseTime
    }


    public executeAction(): void {
        if (typeof this.startTime === 'undefined') {
            this.startTime = Date.now()
            this.attack()
        }

        if (Date.now() > this.startTime + this.pauseTime) {
            this.shouldLoop = false
        }
    }

    private attack(): void {
        if (revmp.valid(this.victimId)) {
            revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_ATTACK"))
            setTimeout(() => {
                if (revmp.valid(this.aiId)) {
                    revmp.fadeOutAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_ATTACK"));
                }
            }, 900);

            const angleRange = Math.abs(getAngleToTarget(this.aiId, this.victimId) - getAngleToTarget(this.victimId, this.aiId))
            const isEntityInEnemyAngleRange = (angleRange < 180 + 20 || angleRange > 180 + 20)
            if (getDistance(this.aiId, this.victimId) < this.necessaryDistance && isEntityInEnemyAngleRange) {
                revmp.attack(this.aiId, this.victimId);
            }
        }
    }

}

export class TripleQuickAttack implements IAiAction{
    aiId: number
    shouldLoop: boolean
    victimId: number
    necessaryDistance: number
    pauseTime: number
    startTime: number | undefined
    attackCounter: number

    constructor(aiId: number, victimId: number, necessaryDistance: number, pauseTime: number) {
        this.aiId = aiId
        this.shouldLoop = true
        this.victimId = victimId
        this.necessaryDistance = necessaryDistance
        this.pauseTime = pauseTime
        this.attackCounter = 0
    }

    public executeAction(): void {
        if (typeof this.startTime === 'undefined') {
            this.startTime = Date.now()
            this.attack("T_ATTACKL")
            this.attackCounter++
        }
        else if (Date.now() > this.startTime + 350 && this.attackCounter === 1) {
            this.attack("T_ATTACKR")
            this.attackCounter++
        }
        else if (Date.now() > this.startTime + 700 && this.attackCounter === 2) {
            this.attack("T_ATTACKL")
            this.attackCounter++
        }
        else if (Date.now() > this.startTime + 1100 && this.attackCounter >= 3) {
            this.shouldLoop = false
        }
    }

    private attack(aniName: string): void {
        if (revmp.valid(this.victimId)) {
            revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, aniName))
            /*
            setTimeout(() => {
                if (revmp.valid(this.aiId)) {
                    revmp.fadeOutAnimation(this.aiId, getCombatStateBasedAni(this.aiId, aniName));
                }
            }, 200);
            */

            const angleRange = Math.abs(getAngleToTarget(this.aiId, this.victimId) - getAngleToTarget(this.victimId, this.aiId))
            const isEntityInEnemyAngleRange = (angleRange < 180 + 20 || angleRange > 180 + 20)
            if (getDistance(this.aiId, this.victimId) < this.necessaryDistance && isEntityInEnemyAngleRange) {
                revmp.attack(this.aiId, this.victimId);
            }
        }
    }

}