import { world, system, MinecraftBlockTypes, Vector3, BlockType, ScreenDisplay } from "@minecraft/server";
import Level from "./level";
import { Mindkeeper, Store, StoreType } from "./mindKeeper";
import BlockCondition from "./completionCondition/BlockCondition";
import Pupeteer from "./pupeteer";

const mindKeeper = new Mindkeeper(world);
const pupeteer = new Pupeteer(world);

const level1: Level = new Level(
  () => {
    pupeteer.setTitleTimed("Level 1", 1000);
    pupeteer.setActionBar("Maak level 1");
  },
  () => {
    world.sendMessage("Level 1 completed");
    pupeteer.setTitleTimed("Level 1 completed", 1000);
    mindKeeper.set("currentLevel", "3");
  },
  () => {
    return new BlockCondition({ x: 225, y: 74, z: 43 }, MinecraftBlockTypes.dirt).checkCondition();
  }
);

let initialised = false;
// Subscribe to an event that calls every Minecraft tick
system.runInterval(() => {
  if (mindKeeper.initialised) {
    switch (mindKeeper.get("currentLevel")) {
      case "1":
        pupeteer.setActionBarTimed("Volg het lichtspoor", 1000);
        if (pupeteer.testForLocation({ x: 225, y: 74, z: 48 }, 2)) {
          pupeteer.setActionBar("Goed gedaan!");
          mindKeeper.set("currentLevel", "2");
        }
        //Volg het lichtspoor
        break;
      case "2":
        level1.update();
        break;
    }
  }
});

world.afterEvents.worldInitialize.subscribe(({ propertyRegistry }) => {
  mindKeeper.registerStore("currentLevel", StoreType.string);
  mindKeeper.registerToWorld(propertyRegistry);

  initialised = true;
});

world.afterEvents.blockPlace.subscribe((event) => {
  mindKeeper.set("currentLevel", "2");
});

world.afterEvents.chatSend.subscribe((event) => {
  if (event.message.startsWith("!get")) {
    const store = event.message.split(" ")[1];
    const value = mindKeeper.get(store);
    world.sendMessage(`Value of ${store} is ${value}`);
  }
  if (event.message.startsWith("!set")) {
    const store = event.message.split(" ")[1];
    const value = event.message.split(" ")[2];
    mindKeeper.set(store, value);
    world.sendMessage(`Value of ${store} is ${value}`);
  }
  if (event.message.startsWith("!reset")) {
    mindKeeper.set("currentLevel", "1");
    level1.reset();
  }
});
