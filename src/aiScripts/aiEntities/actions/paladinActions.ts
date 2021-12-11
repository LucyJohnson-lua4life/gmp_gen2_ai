import { AiState } from "../../../aiScripts/aiStates/aiState"
import { setEnemyComponent } from "../../aiStates/aiStateFunctions/commonAiStateFunctions"
import { getCombatStateBasedAni, getDistance, getNecessaryAngleToWatchTarget, hasMeleeWeapon, isAniPlaying, setPlayerAngle } from "../../aiFunctions/aiUtils"
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
            this.sendMessageToNearbyPlayers(this.aiName + ": " + "Fantastic. Now hold my hand...")
            this.sendMessageToNearbyPlayers(this.aiName + ": " + "Oh Innos Lord of Life!")
            this.prayStage++
        }
        if (revmp.valid(this.targetId) && Date.now() < this.prayStartTime + this.prayTimeAbs) {
            const y = getNecessaryAngleToWatchTarget(this.aiId, this.targetId)
            setPlayerAngle(this.aiId, y)
            const distance = getDistance(this.aiId, this.targetId)

            if (Date.now() > this.prayStartTime + this.prayTimeAbs / 3 && this.prayStage === 1) {
                this.sendMessageToNearbyPlayers(this.aiName + ": " + "Let thine flame burn strong!")
                this.sendMessageToNearbyPlayers(this.aiName + ": " + "With this body so innocent...")
                this.sendMessageToNearbyPlayers(this.aiName + ": " + "Let it withstand all temptations...")
                this.prayStage++
            }
            else if (Date.now() > this.prayStartTime + (this.prayTimeAbs / 3) * 2 && this.prayStage === 2) {
                this.sendMessageToNearbyPlayers(this.aiName + ": " + "Let it not lust for fleshly pleasure...")
                this.sendMessageToNearbyPlayers(this.aiName + ": " + "But only for your love....")
                this.sendMessageToNearbyPlayers(this.aiName + ": " + "Let us honour you and our sacred brothers!")
                this.prayStage++
            }

            if (!isAniPlaying(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL")) && distance > this.chaseDistance) {
                revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))
            }
            else if (distance < this.chaseDistance) {
                revmp.stopAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))
            }

        }
        else if (Date.now() > this.prayStartTime + this.prayTimeAbs) {
            this.sendMessageToNearbyPlayers(this.aiName + ": " + "Because at the and we know it's you who will save us all.")
            this.shouldLoop = false
        }

    }

    private warnTarget(): void {
        if (typeof this.startTime === 'undefined') {
            this.startTime = Date.now()
            this.sendMessageToNearbyPlayers(this.aiName + ": " + "Divine blessings to you, friend!")
            this.sendMessageToNearbyPlayers(this.aiName + ": " + "Tell me, when was the last time you expressed your gratitude towoards our great Lord Innos?")
            this.timesWarned++
        }
        if (revmp.valid(this.targetId) && Date.now() < this.startTime + this.waitTime) {
            const y = getNecessaryAngleToWatchTarget(this.aiId, this.targetId)
            setPlayerAngle(this.aiId, y)
            const distance = getDistance(this.aiId, this.targetId)

            if (Date.now() > this.startTime + this.waitTime / 3 && this.timesWarned === 1) {
                this.sendMessageToNearbyPlayers(this.aiName + ": " + "I think it's time to refresh your prayers!")
                this.sendMessageToNearbyPlayers(this.aiName + ": " + "Stay still and pray with me to our Lord!")
                this.timesWarned++
            }
            else if (Date.now() > this.startTime + (this.waitTime / 3) * 2 && this.timesWarned === 2) {
                this.sendMessageToNearbyPlayers(this.aiName + ": " + "HEY! ON YOUR KNEES!")
                this.timesWarned++
            }

            if (!isAniPlaying(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL")) && distance > this.chaseDistance) {
                revmp.startAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))
            }
            else if (distance < this.chaseDistance) {
                revmp.stopAnimation(this.aiId, getCombatStateBasedAni(this.aiId, "S_RUNL"))
            }

        }
        else if (Date.now() > this.startTime + this.waitTime && !this.isTargetPraying()) {
            this.sendMessageToNearbyPlayers(this.aiName + ": " + "Unbelievable! I WILL bring you on the right path!")
            this.shouldLoop = false
            revmp.drawMeleeWeapon(this.aiId)
            this.setEnemy()
        }
    }

    private setEnemy(): void {
        this.shouldLoop = false
        const enemyComponent: IAiEnemyInfo = { entityId: this.aiId, enemyId: this.targetId, lastAttackTime: 0 }
        setEnemyComponent(this.aiState, enemyComponent)
    }

    private isTargetPraying(): boolean {
        return revmp
            .getAnimations(this.targetId)
            .activeAnis.find((a) => a.ani.name.includes("S_PRAY")) !== undefined
    }

    private sendMessageToNearbyPlayers(message: string): void {
        revmp.players.forEach(player => {
            const distance = getDistance(this.aiId, player)
            if (distance < this.chaseDistance * 4) {
                revmp.sendChatMessage(player, message)
            }
        })

    }

}