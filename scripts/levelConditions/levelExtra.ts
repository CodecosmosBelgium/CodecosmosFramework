import { BlockType, MinecraftBlockTypes, Vector3 } from "@minecraft/server";
import { LevelCondition } from "../levelTypes";

let levelExtraConditions: LevelCondition = {
  conditions: [
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 234, y: 71, z: 8 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 234, y: 71, z: 6 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 234, y: 71, z: 5 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 234, y: 71, z: 3 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 234, y: 71, z: 2 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 234, y: 71, z: 1 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 234, y: 71, z: -7 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 234, y: 71, z: -8 },
    },
  ],
};

export { levelExtraConditions };
