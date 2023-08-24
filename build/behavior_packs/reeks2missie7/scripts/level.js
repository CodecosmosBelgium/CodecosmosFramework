class Level {
    constructor(levelSetupCallback, levelCompleteCallback, levelCheckCallback) {
        this.isCompleted = false;
        this.isSetup = false;
        this.levelSetupCallback = levelSetupCallback;
        this.levelCompleteCallback = levelCompleteCallback;
        this.levelCheckCallback = levelCheckCallback;
    }
    update() {
        if (!this.isSetup) {
            this.isSetup = true;
            this.levelSetupCallback();
        }
        if (this.levelCheckCallback() && !this.isCompleted) {
            this.isCompleted = true;
            this.levelCompleteCallback();
        }
    }
    reset() {
        this.isCompleted = false;
    }
}
//nextlevel
//mindkeeper
//pupeteer
export default Level;

//# sourceMappingURL=../../_reeks2missie7Debug/level.js.map
