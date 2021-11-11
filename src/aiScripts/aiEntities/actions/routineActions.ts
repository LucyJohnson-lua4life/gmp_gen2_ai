import { getCombatStateBasedAni } from "../../aiFunctions/aiUtils"
import { IAiAction } from "../iAiAction"

export class EatRoutine implements IAiAction {
    aiId: number
    shouldLoop: boolean
    pauseTime: number
    startTime: number | undefined
    aniPauseTime = 500 

    constructor(aiId: number, pauseTime:number) {
        this.aiId = aiId
        this.shouldLoop = false
        this.pauseTime = pauseTime
    }

    public executeAction(): void {
        if (typeof this.startTime === 'undefined') {
            this.startTime = Date.now()
            revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "T_PARADEJUMPB"))
        }

    }
}