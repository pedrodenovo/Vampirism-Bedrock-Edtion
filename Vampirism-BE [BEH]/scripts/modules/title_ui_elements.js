import * as server from "@minecraft/server";

function calcularDistancia(x1, y1, z1, x2, y2, z2) {
    const distancia = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) + Math.pow((z2 - z1), 2));
    return distancia;
  }

server.system.runInterval(eventData => {
    var allPlayers = server.world.getAllPlayers()
    allPlayers.forEach(player => {
        let bite_display = ""
        let lv_vamp = ""
        if (player.hasTag('vamp')) {
            if(player.hasTag("lv_vamp_1")){lv_vamp="lv_vamp_1"}else if(player.hasTag("lv_vamp_2")){lv_vamp="lv_vamp_2"}else if(player.hasTag("lv_vamp_3")){lv_vamp="lv_vamp_3"}else if(player.hasTag("lv_vamp_4")){lv_vamp="lv_vamp_4"}else if(player.hasTag("lv_vamp_5")){lv_vamp="lv_vamp_5"}else if(player.hasTag("lv_vamp_6")){lv_vamp="lv_vamp_6"}else if(player.hasTag("lv_vamp_7")){lv_vamp="lv_vamp_7"}else if(player.hasTag("lv_vamp_8")){lv_vamp="lv_vamp_8"}else if(player.hasTag("lv_vamp_9")){lv_vamp="lv_vamp_9"}else if(player.hasTag("lv_vamp_10")){lv_vamp="lv_vamp_10"}else if(player.hasTag("lv_vamp_11")){lv_vamp="lv_vamp_11"}else if(player.hasTag("lv_vamp_12")){lv_vamp="lv_vamp_12"}else if(player.hasTag("lv_vamp_13")){lv_vamp="lv_vamp_13"}else if(player.hasTag("lv_vamp_14")){lv_vamp="lv_vamp_14"}
            if (player.getEntitiesFromViewDirection()[0]){
                let successCountEntity = player.getEntitiesFromViewDirection()[0].entity.runCommand("testfor @s[family=mob,family=!monster,family=!vamp,family=!lob]").successCount
                let distance = calcularDistancia(player.getEntitiesFromViewDirection()[0].entity.location.x, player.getEntitiesFromViewDirection()[0].entity.location.y, player.getEntitiesFromViewDirection()[0].entity.location.z, player.location.x, player.location.y, player.location.z)
                if (successCountEntity == 1 && distance <= 3.25) {
                    bite_display = "bite_display"
                }
            }

        }
        player.runCommand("title @s times 0 0 0")
        player.runCommand(`title @s title ${bite_display} ${lv_vamp} x`)
    });

}, 1)