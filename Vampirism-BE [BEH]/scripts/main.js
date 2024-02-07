import * as server from "@minecraft/server";













server.system.runInterval(eventData => {
    var allPlayers = server.world.getAllPlayers()
    allPlayers.forEach(player => {
      if (player.hasTag('vamp')){
        let successCountEntity = player.getEntitiesFromViewDirection[0].entity.runCommand("testfor @s[family=mob,family=!monster,family=!vamp,family=!lob]").successCount
        if (successCountEntity==1){
            player.runCommand("title @s times 0 0 0")
            player.runCommand("title @s title ´&")
        }
    }
});
},1)
