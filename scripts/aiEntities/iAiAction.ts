export interface IAiAction{
    aiId:number;
    shouldLoop:boolean
    executeAction():void;
    actionName: string;
}
