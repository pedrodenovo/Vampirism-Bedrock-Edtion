import * as server from "@minecraft/server";

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

server.system.runInterval(eventData => {
    var allPlayers = server.world.getAllPlayers()
    allPlayers.forEach(player => {
        let bite_display = _bite_display(player)
        let lv_vamp = _lv_vamp(player)
        let vp_effects = _vp_effects(player)
        player.runCommand("title @s times 0 0 0")
        player.runCommand(`title @s title ${bite_display} ${lv_vamp} ${vp_effects} x`)
    });
}, 1)


function _vp_effects(player){
    let vp_effects = ""
    if (player.hasTag("timerToVamp") && player.runCommand("testfor @s[scores={timerToVamp=0..1200}]") .successCount == 1){
        vp_effects += "timer_max_vamp_effect"
    } else if (player.hasTag("timerToVamp") && player.runCommand("testfor @s[scores={timerToVamp=1201..}]") .successCount == 1){
        vp_effects += "timer_1min_vamp_effect"
    }
    return vp_effects
}

function calcularDistancia(x1, y1, z1, x2, y2, z2) {
    const distancia = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) + Math.pow((z2 - z1), 2));
    return distancia;
}

function _lv_vamp(player){
    let lv_vamp
    for (const tag in tagToLevelMap) {
        if (player.hasTag(tag)) {
            lv_vamp = tagToLevelMap[tag];
            break;
        }
    }
    return lv_vamp
}

function _bite_display(player){
    let bite_display
    if (player.hasTag('vamp')) {
        if (player.getEntitiesFromViewDirection()[0]) {
            let successCountEntity = player.getEntitiesFromViewDirection()[0].entity.runCommand("testfor @s[family=mob,family=!monster,family=!vamp,family=!lob]").successCount
            let distance = calcularDistancia(player.getEntitiesFromViewDirection()[0].entity.location.x, player.getEntitiesFromViewDirection()[0].entity.location.y, player.getEntitiesFromViewDirection()[0].entity.location.z, player.location.x, player.location.y, player.location.z)
            if (successCountEntity == 1 && distance <= 3.25) {
                bite_display = drainEntityBlood(player.getEntitiesFromViewDirection()[0].entity)
                return bite_display
            }
        }
    }
}

function drainEntityBlood(entity) {
    if (entity.hasTag("drainedBlood_2")) {
        return "bite_2_display"
    } else if (entity.hasTag("drainedBlood_3")) {
        return "bite_3_display"
    } else if (entity.hasTag("drainedBlood_4")) {
        return "bite_4_display"
    } else if (entity.hasTag("drainedBlood_5")) {
        return "bite_5_display"
    } else if (entity.hasTag("drainedBlood_6")) {
        return ""
    }else {
        return "bite_1_display"
    }
}