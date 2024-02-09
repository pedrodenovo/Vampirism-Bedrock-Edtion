import * as server from "@minecraft/server";

function calcularDistancia(x1, y1, z1, x2, y2, z2) {
    const distancia = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) + Math.pow((z2 - z1), 2));
    return distancia;
  }

server.system.runInterval(eventData => {
    var allPlayers = server.world.getAllPlayers()
    allPlayers.forEach(player => {
        let bite_display = ""
        if (player.hasTag('vamp') && player.getEntitiesFromViewDirection()[0]) {
            let successCountEntity = player.getEntitiesFromViewDirection()[0].entity.runCommand("testfor @s[family=mob,family=!monster,family=!vamp,family=!lob]").successCount
            let distance = calcularDistancia(player.getEntitiesFromViewDirection()[0].entity.location.x, player.getEntitiesFromViewDirection()[0].entity.location.y, player.getEntitiesFromViewDirection()[0].entity.location.z, player.location.x, player.location.y, player.location.z)
            if (successCountEntity == 1 && distance <= 2.75) {
                bite_display = "bite_display"
            }

        }
        player.runCommand("title @s times 0 0 0")
        player.runCommand(`title @s title ${bite_display} x`)
    });

}, 1)