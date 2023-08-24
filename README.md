# Codefever Typescript level framework

This is the readme for the typescript framework for minecraft education

# Terminology

## Puppeteer

Puppeteer is a class that handles all the UI code for displaying messages to the player.

## MindKeeper

This is the system that handles all the world storage, supported types are `boolean`, `number`, `string`

> **Important** : all registering of the world variables must be done in the world.afterEvents.worldInitialize event (this event can't send anything to the world (like messages))
>
> Here is a example of a definition of the world variable foo

```typescript
world.afterEvents.worldInitialize.subscribe(({ propertyRegistry }) => {
  mindKeeper.registerStore("foo", StoreType.string);

  mindKeeper.registerToWorld(propertyRegistry);
});
```

## Level (could be abit convoluted) **WIP**

This defines a level in a world, it has 3 callback functions as parameters. These functions should

- define the setup logic
- define the condition to pass the level
- define the code to be run when the level is completed

> There is a a AbstractCondition class included with a BlockCondition. This (convoluted) way you can define a BlockCondition in the function that checks if the level is complete.

# Random knowlege

# Authors

- [Bram Verhulst](https://github.com/brammie15)