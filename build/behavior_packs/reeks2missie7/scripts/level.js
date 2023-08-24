class Level {
    constructor(levelSetupCallback, levelCompleteCallback, levelCheckCallback) {
        this.isCompleted = false;
        this.isSetup = false;
        this.levelSetupCallback = levelSetupCallback;
        this.levelCompleteCallback = levelCompleteCallback;
        this.levelCheckCallback = levelCheckCallback;
    }
    setup() {
        this.levelSetupCallback();
    }
    update() {
        if (this.levelCheckCallback() && !this.isCompleted) {
            this.levelCompleteCallback();
            this.isCompleted = true;
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
