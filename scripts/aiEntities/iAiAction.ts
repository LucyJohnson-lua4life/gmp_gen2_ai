export interface IAiAction{
    priority:number;
    aiId:number;
    shouldLoop:boolean
    executeAction():void;
}