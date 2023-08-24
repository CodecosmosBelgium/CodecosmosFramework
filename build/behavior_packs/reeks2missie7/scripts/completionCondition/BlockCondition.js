import { world } from "@minecraft/server";
import LevelCondition from "./AbstractCondition";
class BlockCondition extends LevelCondition {
    constructor(position, blockType) {
        super();
        this.position = position;
        this.blockType = blockType;
    }
    checkCondition() {
        const block = world.getDimension("overworld").getBlock(this.position);
        if (!block) {
            return false;
        }
        return block.typeId === this.blockType.id;
    }
}
export default BlockCondition;

//# sourceMappingURL=../../../_reeks2missie7Debug/completionCondition/BlockCondition.js.map
