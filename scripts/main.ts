import {
  world,
  system,
  MinecraftBlockTypes,
  Vector3,
  BlockType,
  ScreenDisplay,
  MolangVariableMap,
} from "@minecraft/server";
import Level from "./level/level";
import { Mindkeeper, Store, StoreType } from "./mindKeeper";
import BlockCondition from "./completionCondition/BlockCondition";
import Pupeteer from "./pupeteer";
import { level1Conditions } from "./levelConditions/level1";
import { level2Conditions } from "./levelConditions/level2";
import { delayedRun } from "./utils/waitUtil";
import { level3Conditions } from "./levelConditions/level3";
import { levelExtraConditions } from "./levelConditions/levelExtra";
import AbstractLevelCondition from "./completionCondition/AbstractCondition";
import { LevelCondition } from "./level/levelTypes";
import { TrailPoint, Trail } from "./trail/trailEngine";
import { startTrail } from "./trail/trails/startTrail";

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

const level1: Level = new Level(
  () => {
    //setup
    pupeteer.setTitleTimed("Level 1", 150);
    world.sendMessage("Level 1 started");
  },
  () => {
    //update
    pupeteer.setActionBar("Maak level 1");
  },
  () => {
    //after complete
    pupeteer.clearActionBar();
    world.sendMessage("Level 1 completed");
    pupeteer.setTitle("Level 1 completed");
    delayedRun(() => {
      mindKeeper.set("currentLevel", 4);
    }, 100);
  },
  generateBlockCondition(level1Conditions)
);

const level2: Level = new Level(
  () => {
    //Setblock for level 2
    world.sendMessage("Level 1 started");
    pupeteer.setTitleTimed("Level 2", 150);
  },
  () => {
    pupeteer.setActionBar("Maak level 2");
  },
  () => {
    pupeteer.clearActionBar();
    world.sendMessage("Level 2 completed");
    pupeteer.setTitleTimed("Level 2 completed", 150);
    delayedRun(() => {
      mindKeeper.set("currentLevel", 6);
    }, 100);
  },
  generateBlockCondition(level2Conditions)
);

const level3: Level = new Level(
  () => {
    pupeteer.setTitleTimed("Level 3", 500);
  },
  () => {
    pupeteer.setActionBar("Maak level 3");
  },
  () => {
    pupeteer.clearActionBar();
    world.sendMessage("Level 3 completed");
    pupeteer.setTitleTimed("Level 3 completed", 150);
    delayedRun(() => {
      mindKeeper.set("currentLevel", 8);
    }, 100);
  },
  generateBlockCondition(level3Conditions)
);

const levelExtra: Level = new Level(
  () => {
    pupeteer.setTitleTimed("Extra level", 500);
  },
  () => {
    pupeteer.setActionBar("WIP");
  },
  () => {
    pupeteer.clearActionBar();
    world.sendMessage("Level 3 completed");
    pupeteer.setTitleTimed("Level 3 completed", 1000);
    delayedRun(() => {
      mindKeeper.set("currentLevel", 10);
    }, 100);
  },
  generateBlockCondition(levelExtraConditions)
);

let trailStart: Trail = new Trail("startTrail", 2);
trailStart.fromTrail(startTrail);

// Subscribe to an event that calls every Minecraft tick
system.runInterval(() => {
  if (mindKeeper.initialised) {
    switch (mindKeeper.get("currentLevel")) {
      case 1:
        trailStart.spawnNext();
        pupeteer.setActionBar("Volg het lichtspoor");
        if (pupeteer.testForLocation({ x: 225, y: 74, z: 48 }, 2)) {
          pupeteer.setActionBar("Goed gedaan!");
          mindKeeper.set("currentLevel", 2);
        }
        //Volg het lichtspoor
        break;
      case 2:
        level1.setup();
        mindKeeper.set("currentLevel", 3);
        break;
      case 3:
        level1.update();
        break;
      case 4:
        level2.setup();
        mindKeeper.set("currentLevel", 5);
        break;
      case 5:
        level2.update();
        break;
      case 6:
        level3.setup();
        mindKeeper.set("currentLevel", 7);
        break;
      case 7:
        level3.update();
        break;
      case 8:
        levelExtra.setup();
        mindKeeper.set("currentLevel", 9);
        break;
      case 9:
        levelExtra.update();
        break;
      case 10:
        pupeteer.setActionBar("Je hebt alle levels gehaald!");
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
    levelExtra.reset();
  }
  if (event.message.startsWith("!test")) {
    mindKeeper.getStores().forEach((store) => {
      world.sendMessage(`${store.getName()} is ${store.getType()}`);
    });
  }
  if (event.message.startsWith("!dingus")) {
    world.sendMessage("dingus");
    console.error("dingus");
    console.log("dingus");
    console.info("dingus");
    console.warn("dingus");
  }
  if (event.message.startsWith("!setAction")) {
    pupeteer.setActionBar("This is a test");
  }
  if (event.message.startsWith("!dinga")) {
    level1Conditions.conditions.forEach((condition) => {
      world
        .getDimension("overworld")
        .fillBlocks(
          { x: condition.position.x, y: condition.position.y, z: condition.position.z },
          { x: condition.position.x, y: condition.position.y, z: condition.position.z },
          MinecraftBlockTypes.diamondBlock
        );
    });
  }
});
