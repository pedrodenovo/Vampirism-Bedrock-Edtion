import * as server from "@minecraft/server";

server.world.afterEvents.entityDie.subscribe(eventData => {
    if (eventData.deadEntity.typeId == "minecraft:player"){
        eventData.deadEntity.runCommand("scoreboard players set @s[tag=vamp] blood 14440")
    }
})

