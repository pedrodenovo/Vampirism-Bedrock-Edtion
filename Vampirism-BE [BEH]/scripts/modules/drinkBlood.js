import * as server from "@minecraft/server";

function calcularDistancia(x1, y1, z1, x2, y2, z2) {
    const distancia = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) + Math.pow((z2 - z1), 2));
    return distancia;
}

server.world.beforeEvents.itemUse.subscribe(eventData => {
    if (eventData.source.isSneaking && eventData.source.hasTag('vamp') && eventData.source.getEntitiesFromViewDirection()[0] && calcularDistancia(eventData.source.getEntitiesFromViewDirection()[0].entity.location.x, eventData.source.getEntitiesFromViewDirection()[0].entity.location.y, eventData.source.getEntitiesFromViewDirection()[0].entity.location.z, eventData.source.location.x, eventData.source.location.y, eventData.source.location.z) <= 2.75) {
        eventData.source.getEntitiesFromViewDirection()[0].entity.runCommandAsync("damage @s 5")
    }
})