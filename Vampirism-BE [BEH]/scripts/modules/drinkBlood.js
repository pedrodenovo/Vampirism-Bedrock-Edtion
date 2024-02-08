import * as server from "@minecraft/server";

server.system.runInterval(eventData => {
    var allPlayers = server.world.getAllPlayers()
    allPlayers.forEach(player => {
        if (player.hasTag('vamp') && player.getEntitiesFromViewDirection()[0]) {
            let successCountEntity = player.getEntitiesFromViewDirection()[0].entity.runCommand("testfor @s[family=mob,family=!monster,family=!vamp,family=!lob]").successCount
            if (successCountEntity == 1) {
                player.runCommand("title @s times 0 0 0")
                player.runCommand("title @s title  bite_display")
            }

        } else {
            player.runCommand("title @s times 0 0 0")
            player.runCommand("title @s title bite_display")
        }
    });
}, 1)

server.world.beforeEvents.itemUse.subscribe(eventData => {
    if (eventData.source.isSneaking && eventData.source.hasTag('vamp') && eventData.source.getEntitiesFromViewDirection()[0]) {
        eventData.source.getEntitiesFromViewDirection()[0].entity.runCommandAsync("damage @s 5")
    }
})