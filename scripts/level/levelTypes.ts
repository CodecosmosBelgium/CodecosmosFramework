import { BlockType, Vector3 } from "@minecraft/server";

export type blockCondition = {
  block: BlockType;
  position: Vector3;
};

export type LevelCondition = {
  conditions: blockCondition[];
};
