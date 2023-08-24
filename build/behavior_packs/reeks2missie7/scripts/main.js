import { world, system } from "@minecraft/server";
import Level from "./level";
import { Mindkeeper, StoreType } from "./mindKeeper";
import BlockCondition from "./completionCondition/BlockCondition";
import Pupeteer from "./pupeteer";
import { level1Conditions } from "./levelConditions/level1";
import { level2Conditions } from "./levelConditions/level2";
import { delayedRun } from "./waitUtil";
import { level3Conditions } from "./levelConditions/level3";
import { levelExtraConditions } from "./levelConditions/levelExtra";
const mindKeeper = new Mindkeeper(world);
const pupeteer = new Pupeteer(world);
const level1 = new Level(() => {
    pupeteer.setTitleTimed("Level 1", 500);
    pupeteer.setActionBar("Maak level 1");
    world.sendMessage("Level 1 started");
}, () => {
    world.sendMessage("Level 1 completed");
    pupeteer.setTitle("Level 1 completed");
    delayedRun(() => {
        mindKeeper.set("currentLevel", "4");
    }, 100);
}, () => {
    let isCompleted = true;
    level1Conditions.conditions.forEach((condition) => {
        if (!new BlockCondition(condition.position, condition.block).checkCondition()) {
            isCompleted = false;
        }
    });
    return isCompleted;
});
const level2 = new Level(() => {
    pupeteer.setTitleTimed("Level 2", 500);
    pupeteer.setActionBar("Maak level 2");
}, () => {
    world.sendMessage("Level 2 completed");
    pupeteer.setTitleTimed("Level 2 completed", 1000);
    delayedRun(() => {
        mindKeeper.set("currentLevel", "6");
    }, 100);
}, () => {
    let isCompleted = true;
    level2Conditions.conditions.forEach((condition) => {
        if (!new BlockCondition(condition.position, condition.block).checkCondition()) {
            isCompleted = false;
        }
    });
    return isCompleted;
});
const level3 = new Level(() => {
    pupeteer.setTitleTimed("Level 3", 500);
    pupeteer.setActionBar("Maak level 3");
}, () => {
    world.sendMessage("Level 3 completed");
    pupeteer.setTitleTimed("Level 3 completed", 1000);
    delayedRun(() => {
        mindKeeper.set("currentLevel", "8");
    }, 100);
}, () => {
    let isCompleted = true;
    level3Conditions.conditions.forEach((condition) => {
        if (!new BlockCondition(condition.position, condition.block).checkCondition()) {
            isCompleted = false;
        }
    });
    return isCompleted;
});
const levelExtra = new Level(() => {
    pupeteer.setTitleTimed("Extra level", 500);
    pupeteer.setActionBar("WIP");
}, () => {
    world.sendMessage("Level 3 completed");
    pupeteer.setTitleTimed("Level 3 completed", 1000);
    delayedRun(() => {
        mindKeeper.set("currentLevel", "10");
    }, 100);
}, () => {
    let isCompleted = true;
    levelExtraConditions.conditions.forEach((condition) => {
        if (!new BlockCondition(condition.position, condition.block).checkCondition()) {
            isCompleted = false;
        }
    });
    return isCompleted;
});
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
                level1.setup();
                mindKeeper.set("currentLevel", "3");
                break;
            case "3":
                level1.update();
                break;
            case "4":
                level2.setup();
                mindKeeper.set("currentLevel", "5");
                break;
            case "5":
                level2.update();
                break;
            case "6":
                level3.setup();
                mindKeeper.set("currentLevel", "7");
                break;
            case "7":
                level3.update();
                break;
            case "8":
                levelExtra.setup();
                mindKeeper.set("currentLevel", "9");
                break;
            case "9":
                levelExtra.update();
                break;
            case "10":
                pupeteer.setActionBar("Je hebt alle levels gehaald!");
                break;
        }
    }
});
world.afterEvents.worldInitialize.subscribe(({ propertyRegistry }) => {
    mindKeeper.registerStore("currentLevel", StoreType.string);
    mindKeeper.registerToWorld(propertyRegistry);
});
world.afterEvents.blockPlace.subscribe((event) => { });
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
        level2.reset();
        level3.reset();
        levelExtra.reset();
    }
    if (event.message.startsWith("!test")) {
        fetch("./test.json").then((response) => {
            response.json().then((data) => {
                world.sendMessage(data.test);
            });
        });
    }
});

//# sourceMappingURL=../../_reeks2missie7Debug/main.js.map
