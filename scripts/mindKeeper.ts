import { DynamicPropertiesDefinition, PropertyRegistry, World } from "@minecraft/server";

class Store {
  type: StoreType;
  name: string;

  constructor(type: StoreType, name: string) {
    this.type = type;
    this.name = name;
  }

  getType(): StoreType {
    return this.type;
  }

  getName(): string {
    return this.name;
  }
}

enum StoreType {
  string = "string",
  number = "number",
  boolean = "boolean",
}

class Mindkeeper {
  registerdStores: Array<Store> = [];

  propertyManager = new DynamicPropertiesDefinition();

  world: World;

  initialised: boolean = false;

  constructor(world: World) {
    this.world = world;
  }

  registerStore(store: string, type: StoreType): void {
    this.registerdStores.push(new Store(type, store));
  }

  getStores() {
    return this.registerdStores;
  }

  registerToWorld(propertyRegistry: PropertyRegistry) {
    for (let i = 0; i < this.registerdStores.length; i++) {
      let isAlreadyDefined = true;

      try {
        let test = this.world.getDynamicProperty(this.registerdStores[i].getName());
        if (test === undefined) {
          isAlreadyDefined = false;
        }
      } catch (e) {
        isAlreadyDefined = false;
      }
      if (isAlreadyDefined) {
        continue;
      }
      switch (this.registerdStores[i].getType()) {
        case StoreType.string:
          this.propertyManager.defineString(this.registerdStores[i].getName(), 255);
          break;
        case StoreType.number:
          this.propertyManager.defineNumber(this.registerdStores[i].getName(), 0);
          break;
        case StoreType.boolean:
          this.propertyManager.defineBoolean(this.registerdStores[i].getName(), false);
          break;
      }
    }
    propertyRegistry.registerWorldDynamicProperties(this.propertyManager);
    this.initialised = true;
  }

  set(store: string, value: string | number | boolean): void {
    if (this.registerdStores.find((s) => s.getName() === store)?.getType() != typeof value) {
      this.world.sendMessage(`Store ${store} is not of type ${typeof value}`);
      return;
    }
    this.world.setDynamicProperty(store, value);
  }

  get(store: string): string | number | boolean | undefined {
    try {
      let data = this.world.getDynamicProperty(store);
      if (data === undefined) {
        this.world.sendMessage(`Store ${store} is not defined`);
        return undefined;
      }
      return data;
    } catch (e) {
      this.world.sendMessage(`Store ${store} is not defined`);
      return undefined;
    }
  }
}

export { Mindkeeper, Store, StoreType };
