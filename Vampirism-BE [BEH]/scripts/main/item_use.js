import * as server from "@minecraft/server";
import * as skill_screen from "./use_skill_screen.js";

const blood_bottleMap = [
    "sunrise:blood_bottle_0",
    "sunrise:blood_bottle_1",
    "sunrise:blood_bottle_2",
    "sunrise:blood_bottle_3",
    "sunrise:blood_bottle_4",
    "sunrise:blood_bottle_5",
    "sunrise:blood_bottle_6",
    "sunrise:blood_bottle_7",
    "sunrise:blood_bottle_8",
    "sunrise:blood_bottle_9"
];

function calcularDistancia(x1, y1, z1, x2, y2, z2) {
    const distancia = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) + Math.pow((z2 - z1), 2));
    return distancia;
}

function drainEntityBlood(entity) {
    if (entity.hasTag("drainedBlood_2")) {
        entity.runCommandAsync("tag @s add drainedBlood_3")
        entity.runCommandAsync("tag @s remove drainedBlood_2")
    } else if (entity.hasTag("drainedBlood_3")) {
        entity.runCommandAsync("tag @s add drainedBlood_4")
        entity.runCommandAsync("tag @s remove drainedBlood_3")
    } else if (entity.hasTag("drainedBlood_4")) {
        entity.runCommandAsync("tag @s add drainedBlood_5")
        entity.runCommandAsync("tag @s remove drainedBlood_4")
    } else if (entity.hasTag("drainedBlood_5")) {
        entity.runCommandAsync("tag @s remove drainedBlood_5")
        entity.runCommandAsync("tag @s add drainedBlood_6")
        entity.runCommandAsync("kill @s")
    } else {
        entity.runCommandAsync("tag @s add drainedBlood_2")
    }
    entity.runCommandAsync(`particle sunrise:bite_blood_particle ~~~`)
    entity.runCommandAsync(`playsound mob.vampire.bite`)
    entity.runCommandAsync(`damage @s 1 entity_attack entity @p`)
}

server.world.afterEvents.itemUse.subscribe(eventData => {
    eventData.source.runCommand("gamerule sendCommandFeedback false")
    if (eventData.source.getEntitiesFromViewDirection()[0]) {
        let indexItemBottle = blood_bottleMap.indexOf(eventData.itemStack.typeId)
        let successCountEntity = eventData.source.getEntitiesFromViewDirection()[0].entity.runCommand("testfor @s[family=mob,family=!monster,family=!vamp,family=!lob]").successCount
        let distanceSquare = eventData.source.getEntitiesFromViewDirection()[0] && calcularDistancia(eventData.source.getEntitiesFromViewDirection()[0].entity.location.x, eventData.source.getEntitiesFromViewDirection()[0].entity.location.y, eventData.source.getEntitiesFromViewDirection()[0].entity.location.z, eventData.source.location.x, eventData.source.location.y, eventData.source.location.z)
        if (successCountEntity == 1 && indexItemBottle >= 0 && eventData.source.isSneaking && eventData.source.hasTag('vamp') && !eventData.source.hasTag('disable_auto_blood_fill') && distanceSquare <= 3.25) {
            if (eventData.source.runCommand("testfor @s[hasitem={item=sunrise:blood_bottle_8}]").successCount == 1) {
                eventData.source.runCommandAsync(`clear @s sunrise:blood_bottle_8 0 1`)
                eventData.source.runCommandAsync(`give @s sunrise:blood_bottle_9 1`)
                drainEntityBlood(eventData.source.getEntitiesFromViewDirection()[0].entity)

            } else if (eventData.source.runCommand("testfor @s[hasitem={item=sunrise:blood_bottle_7}]").successCount == 1) {
                eventData.source.runCommandAsync(`clear @s sunrise:blood_bottle_7 0 1`)
                eventData.source.runCommandAsync(`give @s sunrise:blood_bottle_8 1`)
                drainEntityBlood(eventData.source.getEntitiesFromViewDirection()[0].entity)

            } else if (eventData.source.runCommand("testfor @s[hasitem={item=sunrise:blood_bottle_6}]").successCount == 1) {
                eventData.source.runCommandAsync(`clear @s sunrise:blood_bottle_6 0 1`)
                eventData.source.runCommandAsync(`give @s sunrise:blood_bottle_7 1`)
                drainEntityBlood(eventData.source.getEntitiesFromViewDirection()[0].entity)

            } else if (eventData.source.runCommand("testfor @s[hasitem={item=sunrise:blood_bottle_5}]").successCount == 1) {
                eventData.source.runCommandAsync(`clear @s sunrise:blood_bottle_5 0 1`)
                eventData.source.runCommandAsync(`give @s sunrise:blood_bottle_6 1`)
                drainEntityBlood(eventData.source.getEntitiesFromViewDirection()[0].entity)

            } else if (eventData.source.runCommand("testfor @s[hasitem={item=sunrise:blood_bottle_4}]").successCount == 1) {
                eventData.source.runCommandAsync(`clear @s sunrise:blood_bottle_4 0 1`)
                eventData.source.runCommandAsync(`give @s sunrise:blood_bottle_5 1`)
                drainEntityBlood(eventData.source.getEntitiesFromViewDirection()[0].entity)

            } else if (eventData.source.runCommand("testfor @s[hasitem={item=sunrise:blood_bottle_3}]").successCount == 1) {
                eventData.source.runCommandAsync(`clear @s sunrise:blood_bottle_3 0 1`)
                eventData.source.runCommandAsync(`give @s sunrise:blood_bottle_4 1`)
                drainEntityBlood(eventData.source.getEntitiesFromViewDirection()[0].entity)

            } else if (eventData.source.runCommand("testfor @s[hasitem={item=sunrise:blood_bottle_2}]").successCount == 1) {
                eventData.source.runCommandAsync(`clear @s sunrise:blood_bottle_2 0 1`)
                eventData.source.runCommandAsync(`give @s sunrise:blood_bottle_3 1`)
                drainEntityBlood(eventData.source.getEntitiesFromViewDirection()[0].entity)

            } else if (eventData.source.runCommand("testfor @s[hasitem={item=sunrise:blood_bottle_1}]").successCount == 1) {
                eventData.source.runCommandAsync(`clear @s sunrise:blood_bottle_1 0 1`)
                eventData.source.runCommandAsync(`give @s sunrise:blood_bottle_2 1`)
                drainEntityBlood(eventData.source.getEntitiesFromViewDirection()[0].entity)

            } else if (eventData.source.runCommand("testfor @s[hasitem={item=sunrise:blood_bottle_0}]").successCount == 1) {
                eventData.source.runCommandAsync(`clear @s sunrise:blood_bottle_0 0 1`)
                eventData.source.runCommandAsync(`give @s sunrise:blood_bottle_1 1`)
                drainEntityBlood(eventData.source.getEntitiesFromViewDirection()[0].entity)

            }
        } else if (successCountEntity == 1 && !indexItemBottle == 9 && indexItemBottle >= 0 && eventData.source.isSneaking && eventData.source.hasTag('disable_auto_blood_fill') && eventData.source.hasTag('vamp') && distanceSquare <= 3.25) {
            eventData.source.runCommandAsync(`clear @s ${blood_bottleMap[indexItemBottle]} 0 1`)
            eventData.source.runCommandAsync(`give @s sunrise:blood_bottle_${(indexItemBottle + 1)} 1`)
            drainEntityBlood(eventData.source.getEntitiesFromViewDirection()[0].entity)
        } else if (eventData.source.isSneaking && eventData.source.hasTag('vamp') && distanceSquare <= 3.25 && eventData.itemStack.typeId == "minecraft:glass_bottle") {
            eventData.source.runCommandAsync(`clear @s glass_bottle 0 1`)
            eventData.source.runCommandAsync(`give @s sunrise:blood_bottle_1 1`)
            drainEntityBlood(eventData.source.getEntitiesFromViewDirection()[0].entity)
        }
        else if (successCountEntity == 1 && eventData.source.isSneaking && eventData.source.hasTag('vamp') && distanceSquare <= 3.25) {
            eventData.source.runCommandAsync(`scoreboard players add @s blood 480`)
            drainEntityBlood(eventData.source.getEntitiesFromViewDirection()[0].entity)
        }
    }
    if (eventData.source.getBlockFromViewDirection() && eventData.source.getBlockFromViewDirection().block) {
        let blockLoc = eventData.source.getBlockFromViewDirection().block.location
        let playerLoc = eventData.source.location
        if (calcularDistancia(playerLoc.x, playerLoc.y, playerLoc.z, blockLoc.x, blockLoc.y, blockLoc.z) <= 5) {
            if (eventData.source.runCommand(`testforblock ${blockLoc.x} ${blockLoc.y} ${blockLoc.z} sunrise:cursed_grass_block`).successCount == 1) {
                if (eventData.itemStack.typeId.includes("_shovel")) {
                    eventData.source.runCommand(`setblock ${blockLoc.x} ${blockLoc.y} ${blockLoc.z} sunrise:cursed_earth_path`)
                }
            }
        }
    }
    if (eventData.itemStack.typeId == "sunrise:vampire_skill_item") {
        let player = eventData.source
        skill_screen.open_screen_for(player)
    }
})

server.world.afterEvents.itemCompleteUse.subscribe(eventData=>{
    let player = eventData.source
    let item = eventData.itemStack
    let itemId = eventData.itemStack.typeId
    if (itemId.startsWith("sunrise:blood_bottle_")) {
        blood_bottleProcess(itemId,player)
    } else if (itemId == "sunrise:vampire_fang") {
       player.runCommand("function system/transform/startVampire")
       player.runCommand("clear @s[tag=!vamp] sunrise:vampire_fang 0 1")
    }
}
)

server.world.afterEvents.entityHitBlock.subscribe(eventData => {
    let player = eventData.damagingEntity
    let blockId = eventData.hitBlock.typeId
    let blockLoc = eventData.hitBlock.location
    if (blockId.startsWith("sunrise:altar_inspiration")){
        if ((player.hasTag('lv_vamp_1')||player.hasTag('lv_vamp_2')||player.hasTag('lv_vamp_3')) && player.hasTag("vamp") && blockId == "sunrise:altar_inspiration_full"){
            skill_screen.unlock_skill_for(player,blockLoc)
        } else if (blockId == "sunrise:altar_inspiration" && player.hasTag("vamp") && player.runCommand('testfor @s[hasitem=[{item=sunrise:blood_bottle_9,location=slot.weapon.mainhand}]]').successCount==1){
            player.runCommandAsync(`setblock ${blockLoc.x} ${blockLoc.y} ${blockLoc.z} sunrise:altar_inspiration_1`);
            player.runCommand("clear @s[tag=!vamp] sunrise:blood_bottle_9 0 1")
        } else if ((player.hasTag('lv_vamp_1')||player.hasTag('lv_vamp_2')||player.hasTag('lv_vamp_3')) && player.hasTag("vamp") && player.runCommand('testfor @s[hasitem=[{item=sunrise:blood_bottle_9,location=slot.weapon.mainhand}]]').successCount==1){
            altar_inspirationFillProcess(blockId,player,blockLoc)
        } else if ((!player.hasTag('lv_vamp_1')||!player.hasTag('lv_vamp_2')||!player.hasTag('lv_vamp_3')) && player.hasTag("vamp") && player.runCommand('testfor @s[hasitem=[{item=sunrise:blood_bottle_9,location=slot.weapon.mainhand}]]').successCount==1){
            player.runCommand('tellraw @a {"rawtext":[{"translate":"skill.altar_limit"}]}')
        }
    }
})

function blood_bottleProcess(input,player) {
        let lastChar = input.charAt(input.length - 1);

        if (lastChar >= '1' && lastChar <= '9') {
            let number = parseInt(lastChar, 10);
            number *= 860;
            player.runCommandAsync(`scoreboard players add @s blood ${number}`);
        }
}

function altar_inspirationFillProcess(input,player,blockLoc) {
    let lastChar = input.charAt(input.length - 1);
    if (lastChar >= '1' && lastChar <= '8') {
        let number = parseInt(lastChar, 10);
        player.runCommandAsync(`setblock ${blockLoc.x} ${blockLoc.y} ${blockLoc.z} sunrise:altar_inspiration_${number+1}`);
       player.runCommand("clear @s[tag=!vamp] sunrise:blood_bottle_9 0 1")
    }else if (lastChar == "9"){
        player.runCommandAsync(`setblock ${blockLoc.x} ${blockLoc.y} ${blockLoc.z} sunrise:altar_inspiration_full`);
       player.runCommand("clear @s[tag=!vamp] sunrise:blood_bottle_9 0 1")

    }
}