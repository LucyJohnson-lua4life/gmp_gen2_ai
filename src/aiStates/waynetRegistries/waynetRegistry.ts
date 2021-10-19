import { CitizenWaynetRegistry } from "./citizenWaynetRegistry";
import { CrimminalWaynetRegistry } from "./crimminalWaynetRegistry";

export class WaynetRegistry {

    private crimminalRegistry:CrimminalWaynetRegistry
    private citizenRegistry:CitizenWaynetRegistry

    constructor(){
        this.crimminalRegistry = new CrimminalWaynetRegistry()
        this.citizenRegistry = new CitizenWaynetRegistry()
    }


    public registerCrimminalAndGetPoint(npcId: number): string{
        return this.crimminalRegistry.registerAndGetRandomPoint(npcId)
    }

    public unregisterCrimminal(npcId: number): void {
        return this.crimminalRegistry.unregisterFromAllPoints(npcId)
    }


    public registerCitizenAndGetPoint(npcId: number): string{
        return this.citizenRegistry.registerAndGetRandomPoint(npcId)
    }

    public unregisterCitizen(npcId: number): void {
        return this.citizenRegistry.unregisterFromAllPoints(npcId)
    }
}