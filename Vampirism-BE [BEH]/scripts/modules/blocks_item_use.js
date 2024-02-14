import * as server from "@minecraft/server";

function calcularDistancia(x1, y1, z1, x2, y2, z2) {
    const distancia = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) + Math.pow((z2 - z1), 2));
    return distancia;
}

server.world.afterEvents.itemUse.subscribe(eventData => {
    let blockLoc = eventData.source.getBlockFromViewDirection().block.location
    let playerLoc = eventData.source.location
    eventData.source.runCommand("say "+calcularDistancia(playerLoc.x, playerLoc.y, playerLoc.z, blockLoc.x, blockLoc.y, blockLoc.z))
    if (calcularDistancia(playerLoc.x, playerLoc.y, playerLoc.z, blockLoc.x, blockLoc.y, blockLoc.z) <= 5) {
        if (eventData.source.runCommand(`testforblock ${blockLoc.x} ${blockLoc.y} ${blockLoc.z} sunrise:cursed_grass_block`)) {
            if (eventData.itemStack.typeId.includes("_shovel")) {
                eventData.source.runCommand(`setblock ${blockLoc.x} ${blockLoc.y} ${blockLoc.z} sunrise:cursed_earth_path`)
            }
        }
    }
})