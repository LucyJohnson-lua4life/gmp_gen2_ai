
    export function registerAndGetRandomPoint(registry:Map<string,number>, npcId: number, availablePoints:Array<string>): string{
        let randomIndex = Math.floor(Math.random() * availablePoints.length);
        let randomPoint = availablePoints[randomIndex]
        let counter = 0
        while (typeof registry.get(randomPoint) !== 'undefined') {
            randomPoint = availablePoints[randomIndex % availablePoints.length]
            randomIndex++
            counter++
            if(counter > availablePoints.length*2){
                break
            }
        }
        registry.set(randomPoint,npcId)
        return randomPoint
    }

    export function unregisterFromAllPoints(registry:Map<string,number>, npcId: number) {
        for (const entry of registry.entries()) {
            if(entry[1] === npcId){
                registry.delete(entry[0])
            }
        }
    }