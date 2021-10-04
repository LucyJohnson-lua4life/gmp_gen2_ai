
export class CrimminalWaynetRegistry {

    private registry: Map<string, number>;
    private availablePoints = ["HAFEN"]

    constructor() {
        this.registry = new Map()
    }

    public registerAndGetRandomPoint(npcId: number): string{
        let randomIndex = Math.floor(Math.random() * this.availablePoints.length);
        let randomPoint = this.availablePoints[randomIndex]
        let counter = 0
        while (typeof this.registry.get(randomPoint) !== 'undefined') {
            randomPoint = this.availablePoints[randomIndex % this.availablePoints.length]
            randomIndex++
            counter++
            if(counter > this.availablePoints.length*2){
                break
            }
        }
        this.registry.set(randomPoint,npcId)
        return randomPoint
    }

    public unregisterFromAllPoints(npcId: number) {
        for (let entry of this.registry.entries()) {
            if(entry[1] === npcId){
                this.registry.delete(entry[0])
            }
        }
    }

}