import { DynamicPropertiesDefinition } from "@minecraft/server";
class Store {
    constructor(type, name) {
        this.type = type;
        this.name = name;
    }
    getType() {
        return this.type;
    }
    getName() {
        return this.name;
    }
}
var StoreType;
(function (StoreType) {
    StoreType["string"] = "string";
    StoreType["number"] = "number";
    StoreType["boolean"] = "boolean";
})(StoreType || (StoreType = {}));
class Mindkeeper {
    constructor(world) {
        this.registerdStores = [];
        this.propertyManager = new DynamicPropertiesDefinition();
        this.initialised = false;
        this.debugLog = [];
        this.world = world;
    }
    registerStore(store, type) {
        this.registerdStores.push(new Store(type, store));
    }
    getStores() {
        return this.registerdStores;
    }
    printDebug() {
        this.debugLog.forEach((t) => {
            this.world.sendMessage(t);
        });
    }
    registerToWorld(propertyRegistry) {
        for (let i = 0; i < this.registerdStores.length; i++) {
            let isAlreadyDefined = true;
            try {
                let test = this.world.getDynamicProperty(this.registerdStores[i].getName());
                if (test === undefined) {
                    isAlreadyDefined = false;
                }
            }
            catch (e) {
                isAlreadyDefined = false;
            }
            if (isAlreadyDefined) {
                continue;
            }
            switch (this.registerdStores[i].getType()) {
                case StoreType.string:
                    this.propertyManager.defineString(this.registerdStores[i].getName(), 255);
                    this.debugLog.push("registerd string" + this.registerdStores[i].getName());
                    break;
                case StoreType.number:
                    this.propertyManager.defineNumber(this.registerdStores[i].getName(), 0);
                    this.debugLog.push("registerd number" + this.registerdStores[i].getName());
                    break;
                case StoreType.boolean:
                    this.propertyManager.defineBoolean(this.registerdStores[i].getName(), false);
                    this.debugLog.push("registerd boolean" + this.registerdStores[i].getName());
                    break;
            }
        }
        propertyRegistry.registerWorldDynamicProperties(this.propertyManager);
        this.initialised = true;
    }
    set(store, value) {
        if (this.registerdStores.find((s) => s.getName() === store)?.getType() != typeof value) {
            this.world.sendMessage(`Store ${store} is not of type ${typeof value}`);
            return;
        }
        this.world.setDynamicProperty(store, value);
    }
    get(store) {
        try {
            let data = this.world.getDynamicProperty(store);
            if (data === undefined) {
                this.world.sendMessage(`Store ${store} is not defined`);
                return undefined;
            }
            return data;
        }
        catch (e) {
            // this.world.sendMessage(`Store ${store} is not defined`);
            return undefined;
        }
    }
}
export { Mindkeeper, Store, StoreType };

//# sourceMappingURL=../../../_reeks2missie7Debug/Commandeer/mindKeeper.js.map
