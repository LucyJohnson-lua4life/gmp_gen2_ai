import { sendChatMessageInRange } from "../aiFunctions/aiUtils";
import { AiState } from "./aiState"

export class AiDialogueHandler {
    private aiState: AiState

    constructor(aiState: AiState) {
        this.aiState = aiState
    }

    public onChatCommand(entity: number, msg: string): void {
        const words = msg.toLowerCase().split(' ');
        const command = words[0];
        const focusedNpcId = revmp.getFocus(entity).focus
        const dialogueKey = words[1] ?? ""

        if (command === "/i" && revmp.valid(focusedNpcId)) {
                const dialogueText = this.getDialogueText(focusedNpcId, dialogueKey)
                if (typeof dialogueText !== 'undefined') {
                    const npcName = revmp.getName(focusedNpcId).name
                    sendChatMessageInRange(entity, 500, npcName + ": " + dialogueText)
                }
        }
    }

    private getDialogueText(aiId: number, dialogueKey: string): string | undefined {
        return this.aiState.aiDialogues.get(aiId)?.dialogues?.get(dialogueKey) 
    }
}