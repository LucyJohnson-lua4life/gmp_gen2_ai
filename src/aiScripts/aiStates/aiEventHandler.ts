
import { AiState } from "./aiState";
import { AiWorldStateEventHandler } from "./aiWorldStateEventHandler";
import { setAiAttackEventInfo } from "./aiStateFunctions/commonAiStateFunctions";
import { AiDialogueHandler } from "./aiDialogueHandler";

export class AiEventHandler {
    private readonly aiState: AiState
    private worldStateEventHandler: AiWorldStateEventHandler
    private dialogueHandler: AiDialogueHandler

    constructor(aiState: AiState, worldStateEventHandler: AiWorldStateEventHandler, dialogueHandler: AiDialogueHandler) {
        this.aiState = aiState
        this.worldStateEventHandler = worldStateEventHandler
        this.dialogueHandler = dialogueHandler
    }

    public initEventHandler(): void {
        revmp.on("attacked", (attacker, target, userEvent) => {
            setAiAttackEventInfo(this.aiState,{entityId: target, isUnderAttack: true, attackedBy: attacker})
            this.worldStateEventHandler.onAttacked(attacker, target)
        })

        revmp.on("chatCommand", (entity, msg) => {
            this.dialogueHandler.onChatCommand(entity, msg)
        });
    }
}


