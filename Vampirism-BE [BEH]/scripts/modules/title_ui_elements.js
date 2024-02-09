import * as server from "@minecraft/server";

function calcularDistancia(x1, y1, z1, x2, y2, z2) {
    const distancia = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) + Math.pow((z2 - z1), 2));
    return distancia;
}

const tagToLevelMap = {
    "lv_vamp_1": "lv_vamp_1",
    "lv_vamp_2": "lv_vamp_2",
    "lv_vamp_3": "lv_vamp_3",
    "lv_vamp_4": "lv_vamp_4",
    "lv_vamp_5": "lv_vamp_5",
    "lv_vamp_6": "lv_vamp_6",
    "lv_vamp_7": "lv_vamp_7",
    "lv_vamp_8": "lv_vamp_8",
    "lv_vamp_9": "lv_vamp_9",
    "lv_vamp_10": "lv_vamp_10",
    "lv_vamp_11": "lv_vamp_11",
    "lv_vamp_12": "lv_vamp_12",
    "lv_vamp_13": "lv_vamp_13",
    "lv_vamp_14": "lv_vamp_14"
};

function drainEntityBlood(entity){
    if (entity.hasTag("drainedBlood_2")){
        return "bite_2_display"
    }else if (entity.hasTag("drainedBlood_3")){
        return "bite_3_display"
    }else if (entity.hasTag("drainedBlood_4")){
        return "bite_4_display"
    }else if (entity.hasTag("drainedBlood_5")){
        return "bite_5_display"
    }else{
        return "bite_1_display"
    }
}

server.system.runInterval(eventData => {
    var allPlayers = server.world.getAllPlayers()
    allPlayers.forEach(player => {
        let bite_display = ""
        let lv_vamp = ""
        if (player.hasTag('vamp')) {
            if (player.getEntitiesFromViewDirection()[0]) {
                let successCountEntity = player.getEntitiesFromViewDirection()[0].entity.runCommand("testfor @s[family=mob,family=!monster,family=!vamp,family=!lob]").successCount
                let distance = calcularDistancia(player.getEntitiesFromViewDirection()[0].entity.location.x, player.getEntitiesFromViewDirection()[0].entity.location.y, player.getEntitiesFromViewDirection()[0].entity.location.z, player.location.x, player.location.y, player.location.z)
                if (successCountEntity == 1 && distance <= 3.25) {
                    bite_display = drainEntityBlood(player.getEntitiesFromViewDirection()[0].entity)
                }
            }
        }
        for (const tag in tagToLevelMap) {
            if (player.hasTag(tag)) {
                lv_vamp = tagToLevelMap[tag];
                break;
            }
        }
        player.runCommand("title @s times 0 0 0")
        player.runCommand(`title @s title ${bite_display} ${lv_vamp} x`)
    });
}, 1)