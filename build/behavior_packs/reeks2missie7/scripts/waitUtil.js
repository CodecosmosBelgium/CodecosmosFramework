import { system } from "@minecraft/server";
export function delayedRun(callback, delay) {
    let timer = system.runTimeout(() => {
        callback();
        system.clearRun(timer);
    }, delay);
}

//# sourceMappingURL=../../_reeks2missie7Debug/waitUtil.js.map
