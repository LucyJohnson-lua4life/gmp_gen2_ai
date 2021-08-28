
import { IWaynet } from "../waynet/iwaynet";
import { Waynet } from "../waynet/waynet";
import { EntityManager } from "./entityManager";


/** Entry point to access the all ai related state.*/
export class AiState {
    private entityManager:EntityManager
    private waynet: IWaynet

    constructor() {
        this.entityManager = new EntityManager()
        this.waynet = new Waynet('./newworld.wp', './newworld.fp')
    }

    public getEntityManager(): EntityManager{
        return this.entityManager
    }
    public getWaynet(): IWaynet {
        return this.waynet
    }

}
