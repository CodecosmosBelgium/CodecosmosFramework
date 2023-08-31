import { world, system, MinecraftBlockTypes, Vector3, BlockType, ButtonPushAfterEvent } from "@minecraft/server";
import Level from "./Commandeer/level/level";
import { Mindkeeper, Store, StoreType } from "./Commandeer/mindKeeper";
import BlockCondition from "./Commandeer/completionCondition/BlockCondition";
import Pupeteer from "./Commandeer/pupeteer";
import { level1Conditions } from "./levelConditions/level1";
import { level2Conditions } from "./levelConditions/level2";
import { delayedRun } from "./Commandeer/utils/waitUtil";
import { level3Conditions } from "./levelConditions/level3";
import { levelExtra2Conditions } from "./levelConditions/levelExtra2";
import { LevelCondition } from "./Commandeer/level/levelTypes";
import { startTrail } from "./trails/startTrail";
import { Trail } from "./Commandeer/trail/trailEngine";
import ButtonPushCondition from "./Commandeer/completionCondition/ButtonPushCondition";
import { levelExtra1Conditions } from "./levelConditions/levelExtra1";

const mindKeeper = new Mindkeeper(world);
const pupeteer = new Pupeteer(world);

const generateBlockCondition = (condition: LevelCondition): Function => {
  return (): boolean => {
    let isComplete: boolean = true;
    condition.conditions.forEach((condition) => {
      if (!new BlockCondition(condition.position, condition.block).checkCondition()) {
        isComplete = false;
      }
      // return false;
    });
    return isComplete;
  };
};

type Wall = {
  startPos: Vector3;
  endPos: Vector3;
};

let level1Wall: Wall = {
  startPos: { x: 214, y: 74, z: 38 },
  endPos: { x: 247, y: 77, z: 38 },
};

let level2Wall: Wall = {
  startPos: { x: 214, y: 74, z: 31 },
  endPos: { x: 247, y: 77, z: 31 },
};

let extraLevelWall: Wall = {
  startPos: { x: 238, y: 74, z: 21 },
  endPos: { x: 233, y: 78, z: 21 },
};

function setWall(wall: Wall, block: BlockType) {
  world.getDimension("overworld").fillBlocks(wall.startPos, wall.endPos, block);
}

function startLevel(commandBlockPos: Vector3) {
  world.getDimension("overworld").fillBlocks(commandBlockPos, commandBlockPos, MinecraftBlockTypes.redstoneBlock);
}
let noLevelCommandBlockPos: Vector3 = { x: 216, y: 72, z: 46 };

let level1CommandBlockPos: Vector3 = { x: 216, y: 72, z: 45 };
let level2CommandBlockPos: Vector3 = { x: 216, y: 72, z: 44 };
let level3CommandBlockPos: Vector3 = { x: 216, y: 72, z: 43 };
let levelExtraCommandBlockPos: Vector3 = { x: 216, y: 72, z: 42 };

const level1: Level = new Level(
  () => {
    //setup
    pupeteer.setTitleTimed("message.level1.name", 2.5);
    world.sendMessage("%message.level1.started");
    startLevel(level1CommandBlockPos);
  },
  () => {
    //update
    pupeteer.setActionBar("%message.level1.make");
  },
  () => {
    //after complete
    pupeteer.clearActionBar();
    world.sendMessage("%message.level1.complete");
    pupeteer.setTitle("%message.level1.complete");
    setWall(level1Wall, MinecraftBlockTypes.air);
    delayedRun(() => {
      mindKeeper.increment("currentLevel");
    }, 100);
  },
  generateBlockCondition(level1Conditions)
);

const level2: Level = new Level(
  () => {
    //Setblock for level 2
    world.sendMessage("%message.level2.started");
    pupeteer.setTitleTimed("%message.level2.name", 2.5);
    startLevel(level2CommandBlockPos);
  },
  () => {
    pupeteer.setActionBar("%message.level2.make");
  },
  () => {
    pupeteer.clearActionBar();
    world.sendMessage("%message.level2.complete");
    pupeteer.setTitleTimed("%message.level2.complete", 5);
    setWall(level2Wall, MinecraftBlockTypes.air);
    delayedRun(() => {
      mindKeeper.increment("currentLevel");
    }, 100);
  },
  generateBlockCondition(level2Conditions)
);

const level3: Level = new Level(
  () => {
    world.sendMessage("%message.level3.started");
    pupeteer.setTitleTimed("%message.level3.name", 5);
    startLevel(level3CommandBlockPos);
  },
  () => {
    pupeteer.setActionBar("%message.level3.make");
  },
  () => {
    pupeteer.clearActionBar();
    world.sendMessage("%message.level3.complete");
    pupeteer.setTitleTimed("%message.level3.complete", 2.5);
    setWall(extraLevelWall, MinecraftBlockTypes.air);
    delayedRun(() => {
      mindKeeper.increment("currentLevel");
    }, 100);
  },
  generateBlockCondition(level3Conditions)
);

const levelExtra1: Level = new Level(
  () => {
    world.sendMessage("%message.level_extra1.started");
    pupeteer.setTitleTimed("%message.level_extra1.name", 2.5);
    startLevel(levelExtraCommandBlockPos);
  },
  () => {
    pupeteer.setActionBar("%message.level_extra1.make");
  },
  () => {
    pupeteer.clearActionBar();
    pupeteer.setTitleTimed("%message.level_extra1.complete", 5);
    delayedRun(() => {
      mindKeeper.increment("currentLevel");
    }, 100);
  },
  generateBlockCondition(levelExtra1Conditions)
);

const levelExtra2: Level = new Level(
  () => {
    world.sendMessage("%message.level_extra2.started");
    pupeteer.setTitleTimed("%message.level_extra2.name", 2.5);
    startLevel(levelExtraCommandBlockPos);
  },
  () => {
    pupeteer.setActionBar("%message.level_extra2.make");
  },
  () => {
    pupeteer.clearActionBar();
    pupeteer.setTitleTimed("%message.level_extra2.complete", 5);
    delayedRun(() => {
      mindKeeper.increment("currentLevel");
    }, 100);
  },
  generateBlockCondition(levelExtra2Conditions)
);

let trailStart: Trail = new Trail("startTrail", 2);
trailStart.fromTrail(startTrail);

// Subscribe to an event that calls every Minecraft tick
system.runInterval(() => {
  if (mindKeeper.initialised) {
    switch (mindKeeper.get("currentLevel")) {
      case 1:
        trailStart.spawnNext();
        pupeteer.setActionBar("%message.trail.follow");
        if (pupeteer.testForLocation({ x: 225, y: 74, z: 48 }, 2)) {
          mindKeeper.set("currentLevel", 2);
        }
        //Volg het lichtspoor
        break;
      case 2:
        level1.setup();
        mindKeeper.increment("currentLevel");
        break;
      case 3:
        level1.update();
        break;
      case 4:
        level2.setup();
        mindKeeper.increment("currentLevel");
        break;
      case 5:
        level2.update();
        break;
      case 6:
        level3.setup();
        mindKeeper.increment("currentLevel");
        break;
      case 7:
        level3.update();
        break;
      //End of normal world
      case 8:
        pupeteer.setActionBar("%message.levels.completed");
      case 9:
        levelExtra1.setup();
        mindKeeper.increment("currentLevel");
        break;
      case 10:
        levelExtra1.update();
        break;
      case 11:
        levelExtra2.setup();
        mindKeeper.increment("currentLevel");
        break;
      case 12:
        levelExtra2.update();
        break;
      case 13:
        pupeteer.setActionBar("%message.levels.completed");
        break;
    }
  }
});

world.afterEvents.worldInitialize.subscribe(({ propertyRegistry }) => {
  mindKeeper.registerStore("currentLevel", StoreType.number);
  mindKeeper.registerToWorld(propertyRegistry);
});

world.afterEvents.blockPlace.subscribe((event) => {});

world.afterEvents.chatSend.subscribe((event) => {
  if (event.message.startsWith("!get")) {
    const store = event.message.split(" ")[1];
    const value = mindKeeper.get(store);
    world.sendMessage(`Value of ${store} is ${value}`);
  }
  if (event.message.startsWith("!set")) {
    const store = event.message.split(" ")[1];
    const value = event.message.split(" ")[2];
    const type = event.message.split(" ")[3];
    if (type === "number") {
      mindKeeper.set(store, Number(value));
    } else {
      mindKeeper.set(store, value);
    }
    world.sendMessage(`Value of ${store} is ${value}`);
  }
  if (event.message.startsWith("!reset")) {
    mindKeeper.set("currentLevel", 1);
    level1.reset();
    level2.reset();
    level3.reset();
    levelExtra2.reset();

    setWall(level1Wall, MinecraftBlockTypes.barrier);
    setWall(level2Wall, MinecraftBlockTypes.barrier);
    setWall(extraLevelWall, MinecraftBlockTypes.barrier);

    startLevel(noLevelCommandBlockPos);
  }
  if (event.message.startsWith("!test")) {
    mindKeeper.getStores().forEach((store) => {
      world.sendMessage(`${store.getName()} is ${store.getType()}`);
    });
  }

  if (event.message.startsWith("!dinga")) {
    world.sendMessage("%message.level1.complete");
  }

  if (event.message.startsWith("!mariekeCommand")) {
    const level = event.message.split(" ")[1];

    switch (level) {
      case "1":
        mindKeeper.set("currentLevel", 2);
        level1.reset();
        break;
      case "2":
        setWall(level1Wall, MinecraftBlockTypes.air);
        mindKeeper.set("currentLevel", 4);
        level2.reset();
        break;
      case "3":
        setWall(level1Wall, MinecraftBlockTypes.air);
        setWall(level2Wall, MinecraftBlockTypes.air);
        mindKeeper.set("currentLevel", 6);
        level3.reset();
        break;
      case "4":
        setWall(level1Wall, MinecraftBlockTypes.air);
        setWall(level2Wall, MinecraftBlockTypes.air);
        setWall(extraLevelWall, MinecraftBlockTypes.air);
        mindKeeper.set("currentLevel", 8);
        levelExtra2.reset();
        break;
    }
  }
  if (event.message.startsWith("!trans")) {
    world.getPlayers().forEach((player) => {
      player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "%message.level1.name" }] });
      player.onScreenDisplay.setActionBar({ rawtext: [{ translate: "message.level1.name" }] });
    });
  }
});
