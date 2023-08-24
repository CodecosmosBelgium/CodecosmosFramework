import { BlockType, MinecraftBlockTypes, Vector3 } from "@minecraft/server";
import { LevelCondition } from "../levelTypes";

let level2Conditions: LevelCondition = {
  conditions: [
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 226, y: 74, z: 36 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 228, y: 74, z: 36 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 232, y: 74, z: 36 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 237, y: 74, z: 36 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 239, y: 74, z: 36 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 243, y: 74, z: 36 },
    },
  ],
};

export { level2Conditions };
