/**
 * Represents a action that a npc should execute. The action should be put into a collection so that a game loop
 * can iterate through that collection to decide which action to execute next.
 * @interface IAiAction
 * @field aiId: id of the npc for which the action should executed 
 * @field shouldLoop: indicates if the action should be looped. That means that the game loop should not remove the action from the action collection until, the flag is set to false. The decision when to set this flag should be implemented in the {@method executeAction} method.
 */
export interface IAiAction{
    aiId:number;
    shouldLoop:boolean
    /**
     * Executes the npc action
     */
    executeAction():void;
}
