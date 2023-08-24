import { system } from "@minecraft/server";
class Pupeteer {
    constructor(world) {
        this.world = world;
    }
    setActionBarTimed(message, duration) {
        this.world.getPlayers().forEach((player) => {
            player.onScreenDisplay.setActionBar(message);
        });
        system.runInterval(() => {
            this.clearActionBar();
        }, duration);
    }
    setActionBar(message) {
        this.world.getPlayers().forEach((player) => {
            player.onScreenDisplay.setActionBar(message);
        });
    }
    setTitleTimed(message, duration) {
        this.world.getPlayers().forEach((player) => {
            player.onScreenDisplay.setTitle(message);
        });
        system.runInterval(() => {
            this.clearTitle();
        }, duration);
    }
    updateSubtitle(message) {
        this.world.getPlayers().forEach((player) => {
            player.onScreenDisplay.updateSubtitle(message);
        });
    }
    clearTitle() {
        this.world.getPlayers().forEach((player) => {
            player.onScreenDisplay.setTitle("");
        });
    }
    clearSubtitle() {
        this.world.getPlayers().forEach((player) => {
            player.onScreenDisplay.updateSubtitle("");
        });
    }
    clearActionBar() {
        this.world.getPlayers().forEach((player) => {
            player.onScreenDisplay.setActionBar("");
        });
    }
    testForLocation(location, radius) {
        let isPlayerInArea = false;
        this.world.getPlayers().forEach((player) => {
            let dx = location.x - player.location.x;
            let dy = location.y - player.location.y;
            let dz = location.z - player.location.z;
            let distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (distance < radius) {
                isPlayerInArea = true;
            }
        });
        return isPlayerInArea;
    }
}
export default Pupeteer;

//# sourceMappingURL=../../_reeks2missie7Debug/pupeteer.js.map
