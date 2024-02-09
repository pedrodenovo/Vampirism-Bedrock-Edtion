import * as server from "@minecraft/server";

const blood_bottleMap = [
    "sunrise:blood_bottle_0",
    "sunrise:blood_bottle_1",
    "sunrise:blood_bottle_2",
    "sunrise:blood_bottle_3",
    "sunrise:blood_bottle_4",
    "sunrise:blood_bottle_5",
    "sunrise:blood_bottle_6",
    "sunrise:blood_bottle_7",
    "sunrise:blood_bottle_8"
];

function calcularDistancia(x1, y1, z1, x2, y2, z2) {
    const distancia = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) + Math.pow((z2 - z1), 2));
    return distancia;
}

function drainEntityBlood(entity){
    if (entity.hasTag("drainedBlood_2")){
        entity.runCommandAsync("tag @s add drainedBlood_3")
        entity.runCommandAsync("tag @s remove drainedBlood_2")
    }else if (entity.hasTag("drainedBlood_3")){
        entity.runCommandAsync("tag @s add drainedBlood_4")
        entity.runCommandAsync("tag @s remove drainedBlood_3")
    }else if (entity.hasTag("drainedBlood_4")){
        entity.runCommandAsync("tag @s add drainedBlood_5")
        entity.runCommandAsync("tag @s remove drainedBlood_4")
    }else if (entity.hasTag("drainedBlood_5")){
        entity.runCommandAsync("kill @s")
    }else{
        entity.runCommandAsync("tag @s add drainedBlood_2")
    }
}

server.world.afterEvents.itemUse.subscribe(eventData => {
    let indexItemBottle = blood_bottleMap.indexOf(eventData.itemStack.typeId)
    let successCountEntity = eventData.source.getEntitiesFromViewDirection()[0].entity.runCommand("testfor @s[family=mob,family=!monster,family=!vamp,family=!lob]").successCount
    let distanceSquare = eventData.source.getEntitiesFromViewDirection()[0] && calcularDistancia(eventData.source.getEntitiesFromViewDirection()[0].entity.location.x, eventData.source.getEntitiesFromViewDirection()[0].entity.location.y, eventData.source.getEntitiesFromViewDirection()[0].entity.location.z, eventData.source.location.x, eventData.source.location.y, eventData.source.location.z)
    if (successCountEntity == 1 && indexItemBottle >= 0 && eventData.source.isSneaking && eventData.source.hasTag('vamp') && distanceSquare <= 3.25) {
        eventData.source.runCommandAsync(`clear @s ${blood_bottleMap[indexItemBottle]} 0 1`)
        eventData.source.runCommandAsync(`give @s sunrise:blood_bottle_${indexItemBottle + 1} 1`)
        drainEntityBlood(eventData.source.getEntitiesFromViewDirection()[0].entity)
    }else if (successCountEntity == 1 &&  eventData.source.isSneaking && eventData.source.hasTag('vamp') && distanceSquare <= 3.25) {
        drainEntityBlood(eventData.source.getEntitiesFromViewDirection()[0].entity)
    }
})