

export enum KHORINIS_FRACTION{
    PALADIN,
    MERCENARY,
    BELIAR
}

export interface IWorldEventState {
    // 0 - 100, default should be 50
    lastStateUpdate:number,
    khorinisState:Map<KHORINIS_FRACTION,number>
}
