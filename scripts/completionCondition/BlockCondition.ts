import { BlockType, Vector3, world } from "@minecraft/server";
import LevelCondition from "./AbstractCondition";
import { Vector3ToString } from "../randomUtils";

class BlockCondition extends LevelCondition {
  position: Vector3;
  blockType: BlockType;

  constructor(position: Vector3, blockType: BlockType) {
    super();
    this.position = position;
    this.blockType = blockType;
  }

  checkCondition(): boolean {
    const block = world.getDimension("overworld").getBlock(this.position);
    if (!block) {
      return false;
    }
    return block.typeId === this.blockType.id;
  }
}

export default BlockCondition;
