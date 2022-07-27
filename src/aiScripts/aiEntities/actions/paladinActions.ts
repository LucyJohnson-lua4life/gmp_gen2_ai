import { AiState } from "../../aiStates/aiState"
import { setAiEnemyInfo } from "../../aiStates/aiStateFunctions/commonAiStateFunctions"
import {
    getCombatStateBasedAni,
    getDistance,
    getNecessaryAngleToWatchTarget,
    sendChatMessageInRange,
    setPlayerAngle
} from "../../aiFunctions/aiUtils"
import { IAiEnemyInfo } from "../components/iAiEnemyInfo"
import { IAiAction } from "../iAiAction"

export class EnforcePrayerAction implements IAiAction {
    aiId: number
    shouldLoop: boolean
    targetId: number
    chaseDistance: number
    waitTime: number
    startTime: number | undefined
    prayStartTime: number | undefined
    prayStage: number
    prayTimeAbs: number
    aiState: AiState 
    timesWarned: number
    aiName: string


    constructor(aiState: AiState, aiId: number, targetId: number, chaseDistance: number, waitTime: number) {
        this.aiId = aiId
        this.shouldLoop = true
        this.targetId = targetId
        this.chaseDistance = chaseDistance
        this.waitTime = waitTime
        this.aiState = aiState
        this.timesWarned = 0
        this.aiName = revmp.getName(this.aiId).name ?? "Enemy"
        this.prayTimeAbs = 20000
        this.prayStage = 0
    }

    public executeAction(): void {
        if (!this.isTargetPraying()) {
            this.warnTarget()
        }
        else if (this.isTargetPraying()) {
            this.executePrayers()
        }
        else if (typeof this.startTime !== 'undefined' && Date.now() > this.startTime + this.waitTime) {
            this.shouldLoop = false
        }
    }

    private executePrayers(): void {
        if (typeof this.prayStartTime === 'undefined') {
            this.prayStartTime = Date.now()
            sendChatMessageInRange(this.aiId, this.chaseDistance * 4, this.aiName + ": " + "Fantastic. Now hold my hand...")
            sendChatMessageInRange(this.aiId, this.chaseDistance * 4, this.aiName + ": " + "Oh Innos Lord of Life!")
            this.prayStage++
        }
        if (revmp.valid(this.targetId) && Date.now() < this.prayStartTime + this.prayTimeAbs) {
            const y = getNecessaryAngleToWatchTarget(this.aiId, this.targetId)
            setPlayerAngle(this.aiId, y)
            const distance = getDistance(this.aiId, this.targetId)

            if (Date.now() > this.prayStartTime + this.prayTimeAbs / 3 && this.prayStage === 1) {
                sendChatMessageInRange(this.aiId, this.chaseDistance * 4, this.aiName + ": " + "Let thine flame burn strong!")
                sendChatMessageInRange(this.aiId, this.chaseDistance * 4, this.aiName + ": " + "With this body so innocent...")
                sendChatMessageInRange(this.aiId, this.chaseDistance * 4, this.aiName + ": " + "Let it withstand all temptations...")
                this.prayStage++
            }
            else if (Date.now() > this.prayStartTime + (this.prayTimeAbs / 3) * 2 && this.prayStage === 2) {
                sendChatMessageInRange(this.aiId, this.chaseDistance * 4, this.aiName + ": " + "Let it not lust for fleshly pleasure...")
                sendChatMessageInRange(this.aiId, this.chaseDistance * 4, this.aiName + ": " + "But only for your love....")
                sendChatMessageInRange(this.aiId, this.chaseDistance * 4, this.aiName + ": " + "Let us honour you and our sacred brothers!")
                this.prayStage++
            }

            if (!revmp.isAnimationActive(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL")) && distance > this.chaseDistance) {
                revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))
            }
            else if (distance < this.chaseDistance) {
                revmp.stopAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))
            }

        }
        else if (Date.now() > this.prayStartTime + this.prayTimeAbs) {
            sendChatMessageInRange(this.aiId, this.chaseDistance * 4, this.aiName + ": " + "Because at the and we know it's you who will save us all.")
            this.shouldLoop = false
        }

    }

    private warnTarget(): void {
        if (typeof this.startTime === 'undefined') {
            this.startTime = Date.now()
            sendChatMessageInRange(this.aiId, this.chaseDistance * 4, this.aiName + ": " + "Divine blessings to you, friend!")
            sendChatMessageInRange(this.aiId, this.chaseDistance * 4, this.aiName + ": " + "Tell me, when was the last time you expressed your gratitude towoards our great Lord Innos?")
            this.timesWarned++
        }
        if (revmp.valid(this.targetId) && Date.now() < this.startTime + this.waitTime) {
            const y = getNecessaryAngleToWatchTarget(this.aiId, this.targetId)
            setPlayerAngle(this.aiId, y)
            const distance = getDistance(this.aiId, this.targetId)

            if (Date.now() > this.startTime + this.waitTime / 3 && this.timesWarned === 1) {
                sendChatMessageInRange(this.aiId, this.chaseDistance * 4, this.aiName + ": " + "I think it's time to refresh your prayers!")
                sendChatMessageInRange(this.aiId, this.chaseDistance * 4, this.aiName + ": " + "Stay still and pray with me to our Lord!")
                this.timesWarned++
            }
            else if (Date.now() > this.startTime + (this.waitTime / 3) * 2 && this.timesWarned === 2) {
                sendChatMessageInRange(this.aiId, this.chaseDistance * 4, this.aiName + ": " + "HEY! ON YOUR KNEES!")
                this.timesWarned++
            }

            if (!revmp.isAnimationActive(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL")) && distance > this.chaseDistance) {
                revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))
            }
            else if (distance < this.chaseDistance) {
                revmp.stopAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))
            }

        }
        else if (Date.now() > this.startTime + this.waitTime && !this.isTargetPraying()) {
            sendChatMessageInRange(this.aiId, this.chaseDistance * 4, this.aiName + ": " + "Unbelievable! I WILL bring you on the right path!")
            this.shouldLoop = false
            revmp.drawMeleeWeapon(this.aiId)
            this.setEnemy()
        }
    }

    private setEnemy(): void {
        this.shouldLoop = false
        const enemyComponent: IAiEnemyInfo = { entityId: this.aiId, enemyId: this.targetId, lastAttackTime: 0 }
        setAiEnemyInfo(this.aiState, enemyComponent)
    }

    private isTargetPraying(): boolean {
        return revmp.isAnimationActive(this.targetId, "S_PRAY");
    }
}