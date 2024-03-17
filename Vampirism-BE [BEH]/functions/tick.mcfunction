scoreboard players remove @a[tag=timerToVamp,scores={timerToVamp=1..}] timerToVamp 1
scoreboard players remove @a[m=!c,scores={blood=-2..}] blood 1
scoreboard players set @a[scores={blood=14500..}] blood 14499
effect @a[tag=has_night_vision,scores={blood=720..}] night_vision 666 20 true
effect @a[tag=bat_mayfly] weakness 1 20 true
effect @a[tag=bat_mayfly] slowness 1 3 true
execute as @a[tag=timerToVamp,scores={timerToVamp=-1000..0}] run function system/transform/endVampire

      