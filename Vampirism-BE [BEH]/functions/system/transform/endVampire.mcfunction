tag @s add player_creeper_att
tag @s remove timerToVamp
tag @s add lv_vamp_1
tag @s add vamp
give @s sunrise:vampire_skill_item 1 0  {"item_lock":{"mode":"lock_in_inventory"},"keep_on_death":{}}
event entity @s sunrise:end_vampire_transformation
scoreboard players set @s timerToVamp -2000
scoreboard objectives add blood dummy blood
scoreboard players set @s blood 4800