import { TownWaynetRegistry } from "./citizenWaynetRegistry";
import { CrimminalWaynetRegistry } from "./crimminalWaynetRegistry";

export class WaynetRegistry {

    private crimminalRegistry:CrimminalWaynetRegistry
    private townieRegistry:TownWaynetRegistry

    constructor(){
        this.crimminalRegistry = new CrimminalWaynetRegistry()
        this.townieRegistry = new TownWaynetRegistry()
    }


    public registerCrimminalAndGetPoint(npcId: number): string{
        return this.crimminalRegistry.registerAndGetRandomPoint(npcId)
    }

    public unregisterCrimminal(npcId: number): void {
        return this.crimminalRegistry.unregisterFromAllPoints(npcId)
    }

    public resetCrimminalRegistry(){
        this.crimminalRegistry = new CrimminalWaynetRegistry()
    }

    public registerTownieAndGetPoint(npcId: number): string{
        return this.townieRegistry.registerAndGetRandomPoint(npcId)
    }

    public unregisterTownie(npcId: number): void {
        return this.townieRegistry.unregisterFromAllPoints(npcId)
    }
    public resetTownieRegistry(){
        this.townieRegistry = new TownWaynetRegistry()
    }

}