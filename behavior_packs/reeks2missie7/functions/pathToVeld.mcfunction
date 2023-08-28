execute unless entity @e[scores={test=0..}] run scoreboard objectives add test dummy
execute unless entity @e[scores={test=0..}] run scoreboard players set @s test 0
execute unless entity @e[scores={test_r=0..}] run scoreboard objectives add test_r dummy
execute unless entity @e[scores={test_r=0..}] run scoreboard players set @s test_r 0

execute as @s[scores={test=0..,test_r=0..0}] positioned 0 0 0 run particle minecraft:balloon_gas_particle ~ ~ ~
execute as @s[scores={test=1..,test_r=1..1}] positioned 0 0 0 run particle minecraft:balloon_gas_particle ~ ~ ~-1
execute as @s[scores={test=2..,test_r=2..2}] positioned 0 0 0 run particle minecraft:balloon_gas_particle ~ ~ ~-2
execute as @s[scores={test=3..,test_r=3..3}] positioned 0 0 0 run particle minecraft:balloon_gas_particle ~ ~ ~-3
execute as @s[scores={test=4..,test_r=4..4}] positioned 0 0 0 run particle minecraft:balloon_gas_particle ~ ~ ~-4
execute as @s[scores={test=5..,test_r=5..5}] positioned 0 0 0 run particle minecraft:balloon_gas_particle ~1 ~ ~-4
execute as @s[scores={test=6..,test_r=6..6}] positioned 0 0 0 run particle minecraft:balloon_gas_particle ~2 ~ ~-4
execute as @s[scores={test=7..,test_r=7..7}] positioned 0 0 0 run particle minecraft:balloon_gas_particle ~3 ~ ~-4
execute as @s[scores={test=8..,test_r=8..8}] positioned 0 0 0 run particle minecraft:balloon_gas_particle ~3 ~ ~-3
execute as @s[scores={test=9..,test_r=9..9}] positioned 0 0 0 run particle minecraft:balloon_gas_particle ~3 ~ ~-2
execute as @s[scores={test=10..,test_r=0..0}] positioned 0 0 0 run particle minecraft:balloon_gas_particle ~3 ~ ~-1
execute as @s[scores={test=11..,test_r=1..1}] positioned 0 0 0 run particle minecraft:balloon_gas_particle ~3 ~ ~
execute as @s[scores={test=12..,test_r=2..2}] positioned 0 0 0 run particle minecraft:balloon_gas_particle ~2 ~ ~
execute as @s[scores={test=13..,test_r=3..3}] positioned 0 0 0 run particle minecraft:balloon_gas_particle ~1 ~ ~


execute as @s[scores={test=..13}] run scoreboard players add @s test 1
execute as @s[scores={test_r=..8}] run scoreboard players add @s test_r 1
execute as @s[scores={test_r=9..}] run scoreboard players set @s test_r 0
