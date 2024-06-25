import * as server from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
const skillsVampire = ['advanced_biter', 'bat_mode', 'blood_charge', 'blood_vision', 'blood_vision_garlic', 'dark_blood_projectile', 'freeze', 'half_invulnerable', 'less_blood_thirst', 'less_sundamage', 'night_vision', 'sunscreen', 'summon_bats', 'sword_finisher', 'teleport', 'vampire_disguise', 'vampire_invisibility', 'vampire_jump', 'vampire_rage', 'vampire_regeneration', 'vampire_speed', 'water_resistance']

const tagToNextLevelMap = {
    "lv_vamp_1": "lv_vamp_2",
    "lv_vamp_2": "lv_vamp_3",
    "lv_vamp_3": "lv_vamp_4",
    "lv_vamp_4": "lv_vamp_5",
    "lv_vamp_5": "lv_vamp_6",
    "lv_vamp_6": "lv_vamp_7",
    "lv_vamp_7": "lv_vamp_8",
    "lv_vamp_8": "lv_vamp_9",
    "lv_vamp_9": "lv_vamp_10",
    "lv_vamp_10": "lv_vamp_11",
    "lv_vamp_11": "lv_vamp_12",
    "lv_vamp_12": "lv_vamp_13",
    "lv_vamp_13": "lv_vamp_14"
};

const tagLevelMap = {
    "lv_vamp_1": 1,
    "lv_vamp_2": 2,
    "lv_vamp_3": 3,
    "lv_vamp_4": 4,
    "lv_vamp_5": 5,
    "lv_vamp_6": 6,
    "lv_vamp_7": 7,
    "lv_vamp_8": 9,
    "lv_vamp_9": 10,
    "lv_vamp_10": 11,
    "lv_vamp_11": 11,
    "lv_vamp_12": 12,
    "lv_vamp_13": 13,
    "lv_vamp_14": 14
};

export function open_screen_for(player) {
    player.runCommandAsync('ability @s[m=!c] mayfly false')
    player.runCommandAsync('function reset_skills');
    const dlg_UseSkill = new ActionFormData();
    dlg_UseSkill.button('_unlockSkill', 'textures/ui/reunlock_skill.png');
    dlg_UseSkill.button('_no_used', 'textures/ui/skills/none.png');
    dlg_UseSkill.button('_no_used', 'textures/ui/skills/none.png');
    dlg_UseSkill.title("SkillScreen")
    let res_UseSkill = ["", "", "", ""]
    dlg_UseSkill.button('gui.button.no_skill', 'textures/ui/skills/none.png');
    skillsVampire.forEach(skill => {
        if (skill == 'night_vision') {

        } else {
            if (player.hasTag("has_" + skill) == true) {
                dlg_UseSkill.button('gui.button.UseSkill_' + skill, 'textures/ui/skills/' + skill + '.png');
                res_UseSkill.push(skill);
            }
        }
    });
    dlg_UseSkill.show(player).then(result => {
        if (result.selection == 0) {
            player.runCommand("function system/transform/removeallskill")
            unlock_skill_for(player)
        } else
            if (res_UseSkill[result.selection] == "bat_mode") {
                player.runCommandAsync('ability @s[scores={blood=720..}] mayfly true');
                player.runCommandAsync('tag @s[scores={blood=720..}] add bat_mayfly');
                player.runCommandAsync('particle sunrise:transform_smoke ~~~');
                player.runCommandAsync('event entity @s[scores={blood=720..}] sunrise:bat');
                player.runCommandAsync('camera @s[tag=!disable_camera_changes,tag=bat_mayfly,scores={blood=720..}] set minecraft:third_person');
            } else if (res_UseSkill[result.selection] == "vampire_regeneration") {
                player.runCommandAsync('effect @s[scores={blood=720..}] regeneration 10 5 true');
                player.runCommandAsync('scoreboard players remove @s[m=!c,scores={blood=720..}] blood 720');
            }
    })
}

export function unlock_skill_for(player) {
    if (player.hasTag("lv_vamp_1")) {
        let dlg_UnlockSkill_1 = new ActionFormData();
        let res_UnlockSkill_1 = run_skill_unlocker(player, dlg_UnlockSkill_1)
        dlg_UnlockSkill_1.show(player).then(result => {
            player.runCommand(`tag @s add has_${res_UnlockSkill_1[result.selection]}`)
        })
    } else
    if (player.hasTag("lv_vamp_2")) {
        let dlg_UnlockSkill_1 = new ActionFormData();
        let res_UnlockSkill_1 = run_skill_unlocker(player, dlg_UnlockSkill_1)
        dlg_UnlockSkill_1.show(player).then(result => {
            player.runCommand(`tag @s add has_${res_UnlockSkill_1[result.selection]}`)
            let dlg_UnlockSkill_2 = new ActionFormData();
            let res_UnlockSkill_2 = run_skill_unlocker(player, dlg_UnlockSkill_2)
            dlg_UnlockSkill_2.show(player).then(result => {
                player.runCommand(`tag @s add has_${res_UnlockSkill_2[result.selection]}`)
            })
        })
    } else
    if (player.hasTag("lv_vamp_3")) {
        let dlg_UnlockSkill_1 = new ActionFormData();
        let res_UnlockSkill_1 = run_skill_unlocker(player, dlg_UnlockSkill_1)
        dlg_UnlockSkill_1.show(player).then(result => {
            player.runCommand(`tag @s add has_${res_UnlockSkill_1[result.selection]}`)
            let dlg_UnlockSkill_2 = new ActionFormData();
            let res_UnlockSkill_2 = run_skill_unlocker(player, dlg_UnlockSkill_2)
            dlg_UnlockSkill_2.show(player).then(result => {
                player.runCommand(`tag @s add has_${res_UnlockSkill_2[result.selection]}`)
                let dlg_UnlockSkill_3 = new ActionFormData();
                let res_UnlockSkill_3 = run_skill_unlocker(player, dlg_UnlockSkill_3)
                dlg_UnlockSkill_3.show(player).then(result => {
                    player.runCommand(`tag @s add has_${res_UnlockSkill_3[result.selection]}`)
                })
            })
        })
    }
    return
}

function run_skill_unlocker(player, dlg_UnlockSkill) {
    let res_UnlockSkill = []
    dlg_UnlockSkill.title("unlockScreen")
    if (player.hasTag('has_night_vision')) {
        dlg_UnlockSkill.button('_no_used', 'textures/ui/skills/none.png');
        dlg_UnlockSkill.button('gui.button.disable_night_vision.bottom_l', 'textures/ui/skills/night_vision.png');
        res_UnlockSkill.push('none');
        res_UnlockSkill.push('night_vision');
        res_UnlockSkill.push('none');
        dlg_UnlockSkill.button('_no_used', 'textures/ui/skills/none.png');
        if (player.hasTag('has_vampire_regeneration')) {
            dlg_UnlockSkill.button('_no_used', 'textures/ui/skills/none.png');
            dlg_UnlockSkill.button('gui.button.disable_vampire_regeneration.bottom_l.up_l', 'textures/ui/skills/vampire_regeneration.png');
            res_UnlockSkill.push('none');
            res_UnlockSkill.push('vampire_regeneration');
            res_UnlockSkill.push('none');
            dlg_UnlockSkill.button('_no_used', 'textures/ui/skills/none.png');
            if (player.hasTag('has_bat_mode')) {
                dlg_UnlockSkill.button('_no_used', 'textures/ui/skills/none.png');
                dlg_UnlockSkill.button('gui.button.disable_bat_mode.bottom_f.up_l', 'textures/ui/skills/bat_mode.png');
                res_UnlockSkill.push('none');
                res_UnlockSkill.push('bat_mode');
                res_UnlockSkill.push('none');
                dlg_UnlockSkill.button('_no_used', 'textures/ui/skills/none.png');
            } else {
                dlg_UnlockSkill.button('_no_used', 'textures/ui/skills/none.png');
                dlg_UnlockSkill.button('gui.button.UseSkill_bat_mode.bottom_f.up_l', 'textures/ui/skills/bat_mode.png');
                dlg_UnlockSkill.button('_no_used', 'textures/ui/skills/none.png');
                res_UnlockSkill.push('none');
                res_UnlockSkill.push('bat_mode');
                res_UnlockSkill.push('none');
            }
        } else {
            dlg_UnlockSkill.button('_no_used', 'textures/ui/skills/none.png');
            dlg_UnlockSkill.button('gui.button.UseSkill_vampire_regeneration.bottom_l.up_l', 'textures/ui/skills/vampire_regeneration.png');
            dlg_UnlockSkill.button('_no_used', 'textures/ui/skills/none.png');
            res_UnlockSkill.push('none');
            res_UnlockSkill.push('vampire_regeneration');
            res_UnlockSkill.push('none');
        }
    } else {
        dlg_UnlockSkill.button('_no_used', 'textures/ui/skills/none.png');
        dlg_UnlockSkill.button('gui.button.UseSkill_night_vision.bottom_l', 'textures/ui/skills/night_vision.png');
        dlg_UnlockSkill.button('_no_used', 'textures/ui/skills/none.png');
        res_UnlockSkill.push('none');
        res_UnlockSkill.push('night_vision');
        res_UnlockSkill.push('none');

    }
    return res_UnlockSkill
}

export function add_level(player, blockLoc) {
    player.runCommand(`setblock ${loc.x} ${loc.y} ${loc.z} sunrise:altar_inspiration_5`)
    server.system.runTimeout(e => {
        if (player.hasTag("lv_vamp_1")) {
            player.runCommandAsync("tag @s remove lv_vamp_1")
            player.runCommandAsync("tag @s add " + tagToNextLevelMap["lv_vamp_1"])
        } else if (player.hasTag("lv_vamp_2")) {
            player.runCommandAsync("tag @s remove lv_vamp_2")
            player.runCommandAsync("tag @s add " + tagToNextLevelMap["lv_vamp_2"])
        } else if (player.hasTag("lv_vamp_3")) {
            player.runCommandAsync("tag @s remove lv_vamp_3")
            player.runCommandAsync("tag @s add " + tagToNextLevelMap["lv_vamp_3"])
        }
        player.runCommand(`setblock ${loc.x} ${loc.y} ${loc.z} sunrise:altar_inspiration`)
        player.runCommand(`clear @s sunrise:blood_bottle_9 0 1`)
    }, 20)
}

export function add_level_avanced(player, blockLoc) {
    player.runCommand(`setblock ${loc.x} ${loc.y} ${loc.z} sunrise:altar_infusion_5`)
    server.system.runTimeout(e => {
        if (player.hasTag("lv_vamp_1")) {
            player.runCommandAsync("tag @s remove lv_vamp_1")
            player.runCommandAsync("tag @s add " + tagToNextLevelMap["lv_vamp_1"])
        } else if (player.hasTag("lv_vamp_2")) {
            player.runCommandAsync("tag @s remove lv_vamp_2")
            player.runCommandAsync("tag @s add " + tagToNextLevelMap["lv_vamp_2"])
        } else if (player.hasTag("lv_vamp_3")) {
            player.runCommandAsync("tag @s remove lv_vamp_3")
            player.runCommandAsync("tag @s add " + tagToNextLevelMap["lv_vamp_3"])
        } else if (player.hasTag("lv_vamp_4")) {
            player.runCommandAsync("tag @s remove lv_vamp_4")
            player.runCommandAsync("tag @s add " + tagToNextLevelMap["lv_vamp_4"])
        } else if (player.hasTag("lv_vamp_5")) {
            player.runCommandAsync("tag @s remove lv_vamp_5")
            player.runCommandAsync("tag @s add " + tagToNextLevelMap["lv_vamp_5"])
        } else if (player.hasTag("lv_vamp_6")) {
            player.runCommandAsync("tag @s remove lv_vamp_6")
            player.runCommandAsync("tag @s add " + tagToNextLevelMap["lv_vamp_6"])
        } else if (player.hasTag("lv_vamp_7")) {
            player.runCommandAsync("tag @s remove lv_vamp_7")
            player.runCommandAsync("tag @s add " + tagToNextLevelMap["lv_vamp_7"])
        } else if (player.hasTag("lv_vamp_8")) {
            player.runCommandAsync("tag @s remove lv_vamp_8")
            player.runCommandAsync("tag @s add " + tagToNextLevelMap["lv_vamp_8"])
        } else if (player.hasTag("lv_vamp_9")) {
            player.runCommandAsync("tag @s remove lv_vamp_9")
            player.runCommandAsync("tag @s add " + tagToNextLevelMap["lv_vamp_9"])
        } else if (player.hasTag("lv_vamp_10")) {
            player.runCommandAsync("tag @s remove lv_vamp_10")
            player.runCommandAsync("tag @s add " + tagToNextLevelMap["lv_vamp_10"])
        } else if (player.hasTag("lv_vamp_11")) {
            player.runCommandAsync("tag @s remove lv_vamp_11")
            player.runCommandAsync("tag @s add " + tagToNextLevelMap["lv_vamp_11"])
        } else if (player.hasTag("lv_vamp_12")) {
            player.runCommandAsync("tag @s remove lv_vamp_12")
            player.runCommandAsync("tag @s add " + tagToNextLevelMap["lv_vamp_12"])
        } else if (player.hasTag("lv_vamp_13")) {
            player.runCommandAsync("tag @s remove lv_vamp_13")
            player.runCommandAsync("tag @s add " + tagToNextLevelMap["lv_vamp_13"])
        }
        player.runCommand(`setblock ${loc.x} ${loc.y} ${loc.z} sunrise:altar_infusion`)
        player.runCommand(`clear @s sunrise:blood_bottle_9 0 1`)
    }, 20)
}