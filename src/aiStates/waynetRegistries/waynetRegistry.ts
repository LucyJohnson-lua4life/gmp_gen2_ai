import { CrimminalWaynetRegistry } from "./crimminalWaynetRegistry";

export class WaynetRegistry {

    private crimminalRegistry:CrimminalWaynetRegistry

    constructor(){
        this.crimminalRegistry = new CrimminalWaynetRegistry()
    }


    public registerCrimminalAndGetPoint(npcId: number): string{
        return this.crimminalRegistry.registerAndGetRandomPoint(npcId)
    }

    public unregisterCrimminal(npcId: number): void {
        return this.crimminalRegistry.unregisterFromAllPoints(npcId)
    }


}