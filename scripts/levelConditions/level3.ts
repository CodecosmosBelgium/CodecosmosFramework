import { BlockType, MinecraftBlockTypes, Vector3 } from "@minecraft/server";
import { LevelCondition } from "../level/levelTypes";

let level3Conditions: LevelCondition = {
  conditions: [
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 225, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 226, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 227, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 233, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 235, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 241, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 242, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 243, y: 74, z: 29 },
    },
    {
      block: MinecraftBlockTypes.sapling,
      position: { x: 244, y: 74, z: 29 },
    },
  ],
};

export { level3Conditions };
