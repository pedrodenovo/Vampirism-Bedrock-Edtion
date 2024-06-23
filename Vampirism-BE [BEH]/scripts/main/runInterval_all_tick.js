import * as server from "@minecraft/server";
import * as skill_screen from "./use_skill_screen.js";

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
    "lv_vamp_10": "lv_vamp_x0",
    "lv_vamp_11": "lv_vamp_x1",
    "lv_vamp_12": "lv_vamp_x2",
    "lv_vamp_13": "lv_vamp_x3",
    "lv_vamp_14": "lv_vamp_x4"
};

server.system.runInterval(eventData => {
    var allPlayers = server.world.getAllPlayers()
    allPlayers.forEach(player => {
        let bite_display = _bite_display(player)
        let lv_vamp = _lv_vamp(player)
        let vp_effects = _vp_effects(player)
        let vp_tb = _vp_tb(player)
        player.runCommand("title @s times 0 0 0")
        player.runCommand(`title @s title ${bite_display} ${lv_vamp} ${vp_effects} ${vp_tb} x`)
        if (player.isSneaking && player.hasTag("disable_item_skill") && player.hasTag("vamp") && player.hasTag("next_isSneaking") == false){
            player.addTag("next_isSneaking")
            server.system.runTimeout(eventData => {player.removeTag("next_isSneaking") },7)
        }else if (player.isSneaking==false && player.hasTag("disable_item_skill") && player.hasTag("vamp") && player.hasTag("next_isSneaking") == true){
            player.addTag("next_isSneaking_I")
            server.system.runTimeout(eventData => {player.removeTag("next_isSneaking_I") },7)
        }else if (player.isSneaking && player.hasTag("disable_item_skill") && player.hasTag("vamp") && player.hasTag("next_isSneaking_I") == true){
            skill_screen.open_screen_for(player)
        }
    });
}, 1)

function _vp_tb(player) {
    let vp_tb = ""
    if (!player.hasTag("vamp")) {
        vp_tb += "_not_vamp_blood "
    }
    else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=13680..}]").successCount == 1) {
        vp_tb += "vamp_blood_XX0 "
    }
    else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=12960..}]").successCount == 1) {
        vp_tb += "vamp_blood_X9 "

    } else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=12240..}]").successCount == 1) {
        vp_tb += "vamp_blood_X8 "

    } else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=11520..}]").successCount == 1) {
        vp_tb += "vamp_blood_X7 "

    } else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=10800..}]").successCount == 1) {
        vp_tb += 'vamp_blood_X6 '

    } else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=10080..}]").successCount == 1) {
        vp_tb += "vamp_blood_X5 "

    } else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=9360..}]").successCount == 1) {
        vp_tb += 'vamp_blood_X4 '

    } else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=8640..}]").successCount == 1) {
        vp_tb += 'vamp_blood_X3 '

    } else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=7920..}]").successCount == 1) {
        vp_tb += 'vamp_blood_X2 '

    } else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=7200..}]").successCount == 1) {
        vp_tb += 'vamp_blood_X1 '

    } else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=6480..}]").successCount == 1) {
        vp_tb += 'vamp_blood_X0 '

    } else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=5760..}]").successCount == 1) {
        vp_tb += 'vamp_blood_9 '

    } else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=5040..}]").successCount == 1) {
        vp_tb += 'vamp_blood_8 ' 

    } else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=4320..}]").successCount == 1) {
        vp_tb += 'vamp_blood_7 '

    } else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=1200..}]").successCount == 1) {
        vp_tb += 'vamp_blood_6 '

    } else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=3600..}]").successCount == 1) {
        vp_tb += 'vamp_blood_5 '

    } else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=2880..}]").successCount == 1) {
        vp_tb += 'vamp_blood_4 '

    } else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=2160..}]").successCount == 1) {
        vp_tb += 'vamp_blood_3 '

    } else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=1440..}]").successCount == 1) {
        vp_tb += 'vamp_blood_2 '

    } else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=920..}]").successCount == 1) {
        vp_tb += 'vamp_blood_1 '
    } else if (player.hasTag("vamp") && player.runCommand("testfor @s[m=!c,scores={blood=..120}]").successCount == 1) {
        vp_tb += 'vamp_blood_0 '
    }
    return vp_tb
}

function _vp_effects(player) {
    let vp_effects = ""
    if (player.hasTag("timerToVamp") && player.runCommand("testfor @s[scores={timerToVamp=0..1200}]").successCount == 1) {
        vp_effects += "timer_max_vamp_effect "
    } else if (player.hasTag("timerToVamp") && player.runCommand("testfor @s[scores={timerToVamp=1201..}]").successCount == 1) {
        vp_effects += "timer_1min_vamp_effect "
    }
    return vp_effects
}

function _calcularDistancia(x1, y1, z1, x2, y2, z2) {
    const distancia = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) + Math.pow((z2 - z1), 2));
    return distancia;
}

function _lv_vamp(player) {
    let lv_vamp
    if (player.hasTag("vamp")) {
        for (const tag in tagToLevelMap) {
            if (player.hasTag(tag)) {
                lv_vamp = tagToLevelMap[tag];
                break;
            }
        }
        return lv_vamp
    }
}

function _bite_display(player) {
    let bite_display
    if (player.hasTag('vamp')) {
        if (player.getEntitiesFromViewDirection()[0]) {
            let successCountEntity = player.getEntitiesFromViewDirection()[0].entity.runCommand("testfor @s[family=!hunter,family=mob,family=!monster,family=!vamp,family=!lob]").successCount
            let distance = _calcularDistancia(player.getEntitiesFromViewDirection()[0].entity.location.x, player.getEntitiesFromViewDirection()[0].entity.location.y, player.getEntitiesFromViewDirection()[0].entity.location.z, player.location.x, player.location.y, player.location.z)
            if (successCountEntity == 1 && distance <= 3.25) {
                bite_display = _drainEntityBlood(player.getEntitiesFromViewDirection()[0].entity)
                return bite_display
            }
        }
    }
}

function _drainEntityBlood(entity) {
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
    } else {
        return "bite_1_display"
    }
}

