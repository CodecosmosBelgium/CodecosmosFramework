import {
  world,
  system,
  MinecraftBlockTypes,
  Vector3,
  BlockType,
  ButtonPushAfterEvent,
  EntityQueryOptions,
  Vector,
} from "@minecraft/server";
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

let extraLevel2Wall: Wall = {
  startPos: { x: 231, y: 74, z: 11 },
  endPos: { x: 231, y: 71, z: -11 },
};

let nullWall: Wall = {
  startPos: { x: -10, y: -10, z: -10 },
  endPos: { x: -10, y: -10, z: -10 },
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
let levelExtra1CommandBlockPos: Vector3 = { x: 216, y: 72, z: 42 };
let levelExtra2CommandBlockPos: Vector3 = { x: 216, y: 72, z: 41 };

function generateLevel(
  translationString: string,
  levelCommandBlockPos: Vector3,
  levelWall: Wall,
  levelConditions: LevelCondition
): Level {
  const generatedLevel: Level = new Level(
    () => {
      //Setblock for level 2
      world.sendMessage(`%message.${translationString}.started`);
      pupeteer.setTitleTimed(`%message.${translationString}.name`, 2.5);
      startLevel(levelCommandBlockPos);
    },
    () => {
      pupeteer.setActionBar(`%message.${translationString}.make`);
    },
    () => {
      pupeteer.clearActionBar();
      world.sendMessage(`%message.${translationString}.complete`);
      pupeteer.setTitleTimed(`%message.${translationString}.complete`, 5);
      if (levelWall != nullWall) {
        setWall(levelWall, MinecraftBlockTypes.air);
      }
      // delayedRun(() => {
      //   mindKeeper.increment("currentLevel");
      // }, 100);
      mindKeeper.increment("currentLevel"); // debating between delayed and this (cuz npc's text doesnt update right away with delay? ask Marieke)
    },
    generateBlockCondition(levelConditions)
  );
  return generatedLevel;
}

const level1: Level = generateLevel("level1", level1CommandBlockPos, level1Wall, level1Conditions);
const level2: Level = generateLevel("level2", level2CommandBlockPos, level2Wall, level2Conditions);
const level3: Level = generateLevel("level3", level3CommandBlockPos, nullWall, level3Conditions);

const levelExtra1: Level = generateLevel(
  "level_extra1",
  levelExtra1CommandBlockPos,
  extraLevel2Wall,
  levelExtra1Conditions
);

const levelExtra2: Level = generateLevel("level_extra2", levelExtra2CommandBlockPos, nullWall, levelExtra2Conditions);

let trailStart: Trail = new Trail("startTrail", 2);
trailStart.fromTrail(startTrail);

function setNpcText(npcTag: string, sceneName: string) {
  world.getDimension("overworld").runCommand(`/dialogue change @e[tag=${npcTag}] ${sceneName} @a`);
}

// Subscribe to an event that calls every Minecraft tick
system.runInterval(() => {
  if (mindKeeper.initialised) {
    switch (mindKeeper.get("currentLevel")) {
      case 1:
        //waiting for the player to talk to Ramses
        pupeteer.setActionBar("%message.talkto.ramses");
        break;
      case 2:
        trailStart.spawnNext();
        pupeteer.setActionBar("%message.trail.follow");
        if (pupeteer.testForLocation({ x: 225, y: 74, z: 48 }, 2)) {
          mindKeeper.increment("currentLevel");
        }
        //Volg het lichtspoor
        break;

      case 3:
        pupeteer.setActionBar("%message.talkto.chanel");
        break;
      case 4:
        level1.update();
        break;
      case 5:
        setNpcText("chanel1", "chanel_level1_complete");
        pupeteer.setActionBar("%message.talkto.chanel");
        break;
      case 6:
        level2.update();
        break;
      case 7:
        setNpcText("chanel1", "chanel_level2_complete");
        pupeteer.setActionBar("%message.talkto.chanel");
        break;
      case 8:
        level3.update();
        break;
      case 9:
        setNpcText("chanel1", "chanel_level3_complete_1");
        pupeteer.setActionBar("%message.talkto.chanel");
        break;
      case 10:
      //end of level
      case 11:
        pupeteer.setActionBar("%message.talkto.chanel");
        break;
      case 12:
        levelExtra1.update();
        break;
      case 13: //still need text to goto extra level 2
        setNpcText("chanel2", "chanel_level2Extra_greeting_1");
        pupeteer.setActionBar("%message.talkto.chanel");
        break;
      case 14:
        levelExtra2.update();
        break;
      case 15:
        setNpcText("chanel2", "chanel_level2Extra_complete_1");
        pupeteer.setActionBar("%message.levels.completed");
        break;
      case 16: //finish ending
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
  const command = event.message.split(" ")[0];
  const args = event.message.split(" ").slice(1);
  if (command === "!get") {
    const store = event.message.split(" ")[1];
    const value = mindKeeper.get(store);
    world.sendMessage(`Value of ${store} is ${value}`);
  }
  if (command === "!set") {
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
    levelExtra1.reset();
    levelExtra2.reset();

    setWall(level1Wall, MinecraftBlockTypes.barrier);
    setWall(level2Wall, MinecraftBlockTypes.barrier);
    setWall(extraLevel2Wall, MinecraftBlockTypes.barrier);

    startLevel(noLevelCommandBlockPos);

    setNpcText("chanel1", "chanel_greeting_1");
  }
  if (event.message.startsWith("!listStores")) {
    mindKeeper.getStores().forEach((store) => {
      world.sendMessage(`${store.getName()} is ${store.getType()}`);
    });
  }

  if (event.message.startsWith("!setNpcText")) {
    const npcTag = event.message.split(" ")[1];
    const sceneName = event.message.split(" ")[2];
    setNpcText(npcTag, sceneName);
  }

  if (command === "!startExtra") {
    mindKeeper.set("currentLevel", 11);
    setNpcText("chanel2", "chanel_levelExtra1_greeting_1");
  }
});

system.afterEvents.scriptEventReceive.subscribe((event) => {
  if (event.id == "cc:startTrail") {
    if (mindKeeper.get("currentLevel") == 1) {
      mindKeeper.increment("currentLevel");
    }
  }
  if (event.id == "cc:startLevel1") {
    if (mindKeeper.get("currentLevel") == 3) {
      mindKeeper.increment("currentLevel");
    }
  }
  if (event.id == "cc:startLevel2") {
    if (mindKeeper.get("currentLevel") == 5) {
      mindKeeper.increment("currentLevel");
    }
  }
  if (event.id == "cc:startLevel3") {
    if (mindKeeper.get("currentLevel") == 7) {
      mindKeeper.increment("currentLevel");
    }
  }
  if (event.id == "cc:startExtraLevel1") {
    if (mindKeeper.get("currentLevel") == 11) {
      mindKeeper.increment("currentLevel");
    }
  }
  if (event.id == "cc:startExtraLevel2") {
    if (mindKeeper.get("currentLevel") == 13) {
      mindKeeper.increment("currentLevel");
    }
  }
});
