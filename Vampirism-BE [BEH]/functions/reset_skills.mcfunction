camera @s[tag=!disable_camera_changes,tag=bat_mayfly] set minecraft:first_person
event entity @s sunrise:remove_bat
execute as @s[tag=bat_mayfly] run particle sunrise:transform_smoke ~~~
tag @s remove bat_mayfly