// Revmp server 0.13.0
declare namespace revmp {
  /**
   * A number representing an entity.
   * It's best to treat a entity as an opaque value.
   */
  type Entity = number;

  type Vec3 = [number, number, number] | Float32Array;

  type Quat = [number, number, number, number] | Float32Array;

  export enum ItemType {
    MeleeWeapon = 0,
    RangedWeapon = 1,
    Munition = 2,
    Armor = 3,
    Consumable = 4,
    Accessories = 5,
    Magic = 6,
    Misc = 7,
  }

  export enum ItemCategory {
    None = 0,
    Dagger = 1,
    Sword = 2,
    Axe = 3,
    TwoHandSword = 4,
    TwoHandAxe = 5,
    Shield = 6,
    Bow = 7,
    Crossbow = 8,
    Ring = 9,
    Amulet = 10,
    Belt = 11,
    Torch = 12,
    BowMunition = 13,
    CrossbowMunition = 14,
    Armor = 15,
    Helmet = 16,
    Food = 17,
    Potion = 18,
    Document = 19,
    Rune = 20,
  }

  export enum Material {
    Wood = 0,
    Stone = 1,
    Metal = 2,
    Leather = 3,
    Clay = 4,
    Glas = 5,
  }

  export enum WeaponMode {
    None = 0,
    Fist = 1,
    Dagger = 2,
    OneHand = 3,
    TwoHand = 4,
    Bow = 5,
    Crossbow = 6,
    Magic = 7,
  }

  export enum GuildType {
    None = 0,
    Human = 1,
    Mil = 2,
    Vlk = 3,
    Kdf = 4,
    Nov = 5,
    Djg = 6,
    Sld = 7,
    Bau = 8,
    Bdt = 9,
    Strf = 10,
    Dmt = 11,
    Out = 12,
    Pir = 13,
    Kdw = 14,
    Public = 15,
    SeperatorHum = 16,
    Meatbug = 17,
    Sheep = 18,
    Gobbo = 19,
    GobboSkeleton = 20,
    SummonedGobboSkeleton = 21,
    Scavenger = 22,
    GiantRat = 23,
    GiantBug = 24,
    Bloodfly = 25,
    Waran = 26,
    Wolf = 27,
    SummonedWolf = 28,
    Minecrawler = 29,
    Lurker = 30,
    Skeleton = 31,
    SummonedSkeleton = 32,
    SkeletonMage = 33,
    Zombie = 34,
    Snapper = 35,
    Shadowbeast = 36,
    ShadowbeastSkeleton = 37,
    Harpy = 38,
    Stonegolem = 39,
    Firegolem = 40,
    Icegolem = 41,
    SummonedGolem = 42,
    Demon = 43,
    SummonedDemon = 44,
    Troll = 45,
    Swampshark = 46,
    Dragon = 47,
    Molerat = 48,
    Alligator = 49,
    Swampgolem = 50,
    Stoneguardian = 51,
    Gargoyle = 52,
    EmptyA = 53,
    SummonedGuardian = 54,
    SummonedZombie = 55,
    EmptyB = 56,
    EmptyC = 57,
    SeperatorOrc = 58,
    Orc = 59,
    FriendlyOrc = 60,
    UndeadOrc = 61,
    Draconian = 62,
    EmptyX = 63,
    EmptyY = 64,
    EmptyZ = 65,
  }

  ///////////////////////////////////
  // ItemInstances
  ///////////////////////////////////
  export interface MeleeWeaponInstance {
    type: ItemType.MeleeWeapon;
    id: string;
    name?: string;
    meleeAttack: {
      blunt?: number;
      edge?: number;
      point?: number;
      fire?: number;
      fly?: number;
      magic?: number;
      fall?: number;
      range: number;
    };
    visual: string;
    material: Material;
    category:
      | ItemCategory.Dagger
      | ItemCategory.Sword
      | ItemCategory.Axe
      | ItemCategory.TwoHandSword
      | ItemCategory.TwoHandAxe;
    value?: number;
    effect?: string;
    description?: {
      title?: string; // If empty, this corresponds to name.
      text?: [
        [string?, number?],
        [string?, number?],
        [string?, number?],
        [string?, number?],
        [string?, number?],
        [string?, number?]
      ];
    };
  }

  export interface MunitionInstance {
    type: ItemType.Munition;
    id: string;
    name?: string;
    visual: string;
    material: Material;
    category: ItemCategory.BowMunition | ItemCategory.CrossbowMunition;
    value?: number;
    effect?: string;
    description?: {
      title?: string; // If empty, this corresponds to name.
      text?: [
        [string?, number?],
        [string?, number?],
        [string?, number?],
        [string?, number?],
        [string?, number?],
        [string?, number?]
      ];
    };
  }

  export interface RangedWeaponInstance {
    type: ItemType.RangedWeapon;
    id: string;
    name?: string;
    rangedAttack: {
      blunt?: number;
      edge?: number;
      point?: number;
      fire?: number;
      fly?: number;
      magic?: number;
      fall?: number;
      munition: Entity;
    };
    visual: string;
    material: Material;
    category: ItemCategory.Bow | ItemCategory.Crossbow;
    value?: number;
    effect?: string;
    description?: {
      title?: string; // If empty, this corresponds to name.
      text?: [
        [string?, number?],
        [string?, number?],
        [string?, number?],
        [string?, number?],
        [string?, number?],
        [string?, number?]
      ];
    };
  }

  export interface ArmorInstance {
    type: ItemType.Armor;
    id: string;
    name?: string;
    protection?: {
      blunt?: number;
      edge?: number;
      point?: number;
      fire?: number;
      fly?: number;
      magic?: number;
      fall?: number;
    };
    visual: string;
    visualChange: string;
    visualSkin?: number;
    material: Material;
    category: ItemCategory.Armor;
    value?: number;
    effect?: string;
    description?: {
      title?: string; // If empty, this corresponds to name.
      text?: [
        [string?, number?],
        [string?, number?],
        [string?, number?],
        [string?, number?],
        [string?, number?],
        [string?, number?]
      ];
    };
  }

  export interface ConsumableInstance {
    type: ItemType.Consumable;
    id: string;
    name?: string;
    visual: string;
    material: Material;
    category: ItemCategory.Food | ItemCategory.Potion;
    value?: number;
    effect?: string;
    scheme?: string;
    description?: {
      title?: string; // If empty, this corresponds to name.
      text?: [
        [string?, number?],
        [string?, number?],
        [string?, number?],
        [string?, number?],
        [string?, number?],
        [string?, number?]
      ];
    };
  }

  ///////////////////////////////////
  // Entity functions
  ///////////////////////////////////

  /**
   * Creates an item instance entity.
   * @param itemTemplate
   * @throws Will throw if called after Revmp init, instance contains, instance is already used or type is unkown.
   */
  export function createItemInstance(
    itemTemplate: MeleeWeaponInstance | ArmorInstance | ConsumableInstance
  ): Entity;

  /**
   * Checks if entity is valid.
   * @param entity
   * @returns True if entity is valid.
   */
  export function valid(entity: Entity): boolean;

  export interface WorldTemplate {
    zen: string;
    startpoint?: string; // If empty position will be [0, 0, 0].
    name?: string;
    time?: { hour?: number; minute?: number };
  }

  /**
   * Creates a world entity.
   * @param template
   * @returns The created entity.
   * @throws Will throw if instance contains, instance is not a WorldInstance or instance doesn't exists.
   */
  export function createWorld(template: WorldTemplate): Entity;

  export interface BotTemplate {
    world?: Entity;
    name?: string;
    visual: string;
    visualBody: {
      bodyMesh: string;
      bodyTexture?: number;
      skinColor?: number;
      headMesh?: string;
      headTexture?: number;
      teethTexture?: number;
      bodyMass?: number;
    };
    position?: Vec3;
    rotation?: Quat;
    //scale?: Vec3;
    maxHealth?: number;
    maxMana?: number;
    attributes?: {
      strength?: number;
      dexterity?: number;
      magicCircle?: number;
      oneHanded?: number;
      twoHanded?: number;
      bow?: number;
      crossbow?: number;
    };
    meleeAttack?: {
      blunt?: number;
      edge?: number;
      point?: number;
      fire?: number;
      fly?: number;
      magic?: number;
      fall?: number;
      range: number;
    };
    protection?: {
      blunt?: number;
      edge?: number;
      point?: number;
      fire?: number;
      fly?: number;
      magic?: number;
      fall?: number;
    };
    effect?: string;
    weaponMode?: WeaponMode;
    guild?: GuildType;
    //voice?
    //npcType?
    //talents?
  }

  /**
   * Creates a bot entity.
   * @param template
   * @returns The created entity.
   * @throws Will throw if instance contains, instance is not a CharacterInstance or instance doesn't exists.
   */
  export function createBot(template: BotTemplate): Entity;

  export interface VobTemplate {
    world?: Entity; // Defaults to revmp.defaultWorld
    visual: string;
    name?: string;
    position?: Vec3;
    rotation?: Quat;
    //scale?: Vec3;
  }

  /**
   * Creates a vob entity.
   * @param template
   * @returns The created entity.
   * @throws Will throw if instance contains, instance is not a CharacterInstance or instance doesn't exists.
   */
  export function createVob(template: VobTemplate): Entity;

  /**
   *
   * @param entity Entity to be destroyed.
   * @throws Will throw if entity is not {@link valid} or not destroyable.
   */
  export function destroyCharacter(entity: Entity): void;

  /**
   *
   * @param entity Entity to be destroyed.
   * @throws Will throw if entity is not {@link valid} or not destroyable.
   */
  export function destroyVob(entity: Entity): void;

  // Note: An entity can be one or more of the following types.
  /**
   * A player entity may have the following components:
   * Name, Position, Rotation, Scale, Model, Health, Mana, Attributes,
   * MeleeAttack, Protection, Visual, VisualBody, Effect, CombatState,
   * Homeworld, Inventory, Equipment, Focus, NetworkClient, NetworkSync
   * and MovementController.
   * @param entity
   */
  export function isPlayer(entity: Entity): boolean;

  /**
    * A bot entity may have the following components:
    * Name, Position, Rotation, Scale, Model, Health, Mana, Attributes,
    * MeleeAttack, Protection, Visual, VisualBody, Effect, CombatState,
    * Homeworld, Inventory and Equipment.
    * @param entity
    */
  export function isBot(entity: Entity): boolean;
 
  /**
    * A character entity may have the following components:
    * Name, Position, Rotation, Scale, Model, Health, Mana, Attributes,
    * MeleeAttack, Protection, Visual, VisualBody, Effect, CombatState,
    * Homeworld, Inventory and Equipment.
    * @param entity
    */
  export function isCharacter(entity: Entity): boolean;
 
  /**
    * A vob entity may have the following components:
    * Homeworld, Position, Rotation and Visual.
    * @param entity
    */
  export function isVob(entity: Entity): boolean;
 
  /**
    * A world entity may have the following components:
    * Name, Inventory, Time, Zen, WorldEntities and Waynet.
    * TODO: Weather, WorldSync.
    * @param entity
    */
  export function isWorld(entity: Entity): boolean;
 
  /**
    * A waypoint entity may have the following components:
    * Name, Homeworld, Position, Rotation and Waypoint.
    * @param entity
    */
  export function isWaypoint(entity: Entity): boolean;
 
  /**
    * A freepoint entity may have the following components:
    * Name, Homeworld, Position, Rotation.
    * @param entity
    */
  export function isFreepoint(entity: Entity): boolean;
 
  /**
    * A item entity may have the following components:
    * ItemInstance and Countable
    * @param entity
    */
  export function isItem(entity: Entity): boolean;
 
  /**
    * A item entity may have the following components:
    * ItemInstance, Countable, Position, Rotation and Homeworld.
    * @param entity
    */
  export function isWorldItem(entity: Entity): boolean;
 
  /**
    * A item instance entity may have no specific components.
    * @param entity
    */
  export function isItemInstance(entity: Entity): boolean;
 
  /**
    * A melee weapon item entity may have the following components:
    * Instance, Countable, Name, MeleeAttack, Visual, ItemMisc,
    * Description and Effect.
    * @param entity
    */
  export function isMeleeWeaponItem(entity: Entity): boolean;
 
  /**
    * A armor item entity may have the following components:
    * Instance, Countable, Name, Protection, Visual, VisualChange,
    * ItemMisc, Description and Effect.
    * @param entity
    */
  export function isArmorItem(entity: Entity): boolean;
 
   /**
    * A consumable item entity may have the following components:
    * Instance, Countable, Name, Visual, Scheme, ItemMisc, Description
    * and Effect.
    * @param entity
    */
  export function isConsumableItem(entity: Entity): boolean;

  ///////////////////////////////////
  // Inventory functions
  ///////////////////////////////////

  /**
   * Checks if entity has an item with the specified instance in his inventory.
   * @param entity
   * @param instance
   * @returns True if entity has item.
   * @throws Will throw if entity is not valid, instance contains, instance doesn't exists or entity doesn't have Inventory component.
   */
  export function hasItem(entity: Entity, instance: string | Entity): boolean;

  /**
   * Checks and returns the item if the entity has it.
   * The returned item entity can be invalid if entity doesn't have it.
   * @param entity
   * @param instance
   * @returns Item entity.
   * @throws Will throw if entity is not valid, instance contains, instance doesn't exists or entity doesn't have Inventory component.
   */
  export function getItem(entity: Entity, instance: string | Entity): Entity;

  /**
   * Adds and returns item to an entity with an inventory component.
   * If entity is a character the entity will be an item otherwise if it's
   * a world it will be an world item.
   * Options can be an amount or an object containing amount, position
   * and/or rotation.
   * Position and rotation only have an effect if the entity is a world.
   * @param entity
   * @param instance
   * @param options
   */
  export function addItem(
    entity: Entity,
    instance: string | Entity,
    options?: number | { amount?: number; position?: Vec3; rotation?: Quat }
  ): Entity;

  export function removeItem(
    entity: Entity,
    instance: string | Entity,
    amount?: number
  ): void;

  export function useItem(entity: Entity, instance: string | Entity): void;

  export function equipItem(entity: Entity, instance: string | Entity): void;

  export function unequipItem(entity: Entity, instance: string | Entity): void;

  export function equipped(entity: Entity, instance: string | Entity): boolean;

  /**
   * Drops the item into the world.
   * If the amount is larger than actually available, everything will be
   * dropped. In this case, the item is unequipped, if necessary, removed
   * from the inventory, the world item is created and the entityCreated
   * event is triggered. Position will be that of the character -70 on
   * the y axis, the item is added to the world, the itemDropped event
   * is triggered, then the itemRemoved event and, if necessary, the
   * beforeEntityDestroy event triggered.
   * @param entity Character entity
   * @param instance Item instance
   * @param amount Amount to be dropped
   * @throws Will throw if entity is not valid, instance contains, instance doesn't exists or entity doesn't have Inventory component.
   * @returns Item entity.
   */
  export function dropItem(
    entity: Entity,
    instance: string | Entity,
    amount?: number
  ): Entity;

  export function takeItem(entity: Entity, item: Entity): void;

  /**
   * Clears all items in inventory and calls successively the 'itemRemoved' event.
   * @param entity Entity with inventory component.
   * @throws Will throw if entity is not valid or entity doesn't have Inventory component.
   */
  export function clearInventory(entity: Entity): void;

  ///////////////////////////////////
  // Combat functions
  ///////////////////////////////////

  export function drawMeleeWeapon(entity: Entity): void;

  export function drawRangedWeapon(entity: Entity): void;

  export function putWeaponAway(entity: Entity): void;

  /**
   * Creates an attack with the attacker's drawn weapon to hit target.
   * Position and rotation are not considered.
   * Gothic is responsible for the audiovisual part. The target will stumble
   * while no animation for the attacker is guaranteed.
   * No damage will be dealt.
   * Triggers the attacked event.
   * @throws Will throw if attacker or target are invalid or attacker didn't draw a weapon.
   * @param attacker Entity with Equipment and CombatState component.
   * @param target Entity with Health component.
   */
  export function attack(attacker: Entity, target: Entity): void;

  // TODO: getDrawnWeapon?

  ///////////////////////////////////
  // Animation functions
  ///////////////////////////////////

  /**
   * Adds a modelscript overlay to an entity with an Model component.
   * The overlay is converted to uppercase by default.
   * Does nothing if entity already has the overlay.
   * @param entity
   * @param overlay
   * @throws Will throw if entity is not valid or entity doesn't have Model component.
   */
  export function addMdsOverlay(entity: Entity, overlay: string): void;

  /**
   * Removes a modelscript overlay to an entity with an Model component.
   * The overlay is converted to uppercase by default.
   * Does nothing if entity doesn't have the overlay.
   * @throws Will throw if entity is not valid or entity doesn't have Model component.
   * @param entity
   * @param overlay
   */
  export function removeMdsOverlay(entity: Entity, overlay: string): void;

  /**
   * Removes all modelscript overlays from an entity with an Model component.
   * @throws Will throw if entity is not valid or entity doesn't have Model component.
   * @param entity
   * @param overlay
   */
  export function clearMdsOverlays(entity: Entity): void;

  /**
   * Returns true if animation exists in any model prototype. Case-insensitive.
   * @param entity 
   * @param ani 
   */
  export function hasAnimation(entity: Entity, ani: string): boolean;

  /**
   * Return true if animation is currently active. Case-insensitive.
   * @param entity 
   * @param ani 
   */
  export function isAnimationActive(entity: Entity, ani: string): boolean;

  /**
   * Returns animation or undefined if entity doesn't have it.
   * Case-insensitive.
   * @param entity 
   * @param ani 
   */
  export function getAnimationByName(entity: Entity, ani: string): Animation|undefined;

  /**
   * Starts animation. Case-insensitive.
   * Note: Currently the server doesn't have any animation system. Starting an
   * animation for a player will send a notification to the client. Only after
   * the client sended a response the server can observe if the animation is
   * active or not.
   * For bots the first slot of activeAni from Model stores the last started
   * animation. It's not possible to observe any active animations for bots.
   * @throws Will throw if animation doesn't exists in any model prototype.
   * @param entity 
   * @param ani 
   */
  export function startAnimation(entity: Entity, ani: string): void;

  /**
   * Stops animation. Case-insensitive.
   * @throws Will throw if animation doesn't exists in any model prototype.
   * @param entity 
   * @param ani 
   */
  export function stopAnimation(entity: Entity, ani: string): void;

  /**
   * Fade out animation. Case-insensitive.
   * @throws Will throw if animation doesn't exists in any model prototype.
   * @param entity 
   * @param ani 
   */
  export function fadeOutAnimation(entity: Entity, ani: string): void;

  //export function playSound(entity: Entity, sound: string): void

  //export function playEffect(entity: Entity, effect: string): void

  //export function changePlayerWorld(entity: Entity, world: string|Entity, position?: Vec3): void

  ///////////////////////////////////
  // Event functions
  ///////////////////////////////////

  /**
   * Sends a user defined event to the client.
   * @param event
   * @throws Will throw if event is a revmp built in event.
   */
  export function send(entity: Entity, event: string, ...args: unknown[]): void;

  /**
   * Receives user defined event from the client.
   * CAUTION: Client side scripts could be manipulated.
   * @param event
   * @throws Will throw if event is a revmp built in event.
   */
  export function receive(
    event: string,
    callback: (entity: Entity, ...args: unknown[]) => void
  ): void;

  /**
   * Emits user defined event.
   * @param event
   * @throws Will throw if event is a revmp built in event.
   */
  export function emit(event: string, ...args: unknown[]): void;

  /**
   * Adds callback to an user defined event.
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    event: string,
    callback: (...args: unknown[]) => void
  ): () => void;

  /**
   * Adds callback to global event listener.
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(event: "init", callback: () => void): () => void;

  /**
   * Adds callback to global event listener.
   * Will be called every server tick.
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(event: "update", callback: () => void): () => void;

  /**
   * Adds callback to global event listener.
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(event: "shutdown", callback: () => void): () => void;

  /**
   * Adds callback to global event listener.
   * Will be called after an entity was created.
   * @param {string} event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    event: "entityCreated",
    callback: (entity: Entity) => void
  ): () => void;

  /**
   * Adds callback to global event listener.
   * Will be called before an entity will be destroyed.
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    event: "beforeEntityDestroy",
    callback: (entity: Entity) => void
  ): () => void;

  /**
   * Adds callback to global event listener.
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    event: "itemEquipped",
    callback: (entity: Entity, item: Entity, userEvent: boolean) => void
  ): () => void;

  /**
   * Adds callback to global event listener.
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    event: "itemUnequipped",
    callback: (entity: Entity, item: Entity, userEvent: boolean) => void
  ): () => void;

  /**
   * Adds callback to global event listener.
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    event: "itemReceived",
    callback: (entity: Entity, item: Entity, amount: number) => void
  ): () => void;

  /**
   * Adds callback to global event listener.
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    event: "itemRemoved",
    callback: (entity: Entity, item: Entity, amount: number) => void
  ): () => void;

  /**
   * Adds callback to global event listener.
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    event: "itemUsed",
    callback: (entity: Entity, item: Entity, userEvent: boolean) => void
  ): () => void;

  /**
   * Adds callback to global event listener.
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    event: "itemDropped",
    callback: (
      entity: Entity,
      item: Entity,
      amount: number,
      world: Entity,
      userEvent: boolean
    ) => void
  ): () => void;

  /**
   * Adds callback to global event listener.
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    event: "itemTaken",
    callback: (
      entity: Entity,
      item: Entity,
      amount: number,
      world: Entity,
      userEvent: boolean
    ) => void
  ): () => void;

  /**
   * Adds callback to global event listener.
   * @param  event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    event: "itemTransferred",
    callback: (
      sender: Entity,
      receiver: Entity,
      item: Entity,
      amount: number,
      userEvent: boolean
    ) => void
  ): () => void;

  /**
   * Adds callback to global event listener.
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    event: "chatCommand",
    callback: (entity: Entity, command: string) => void
  ): () => void;

  /**
   * Adds callback to global event listener.
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    event: "chatInput",
    callback: (entity: Entity, message: string) => void
  ): () => void;

  /**
   * Adds callback to global event listener.
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    event: "attacked",
    callback: (attacker: Entity, target: Entity, userEvent: boolean) => void
  ): () => void;

  /**
   * Adds callback only to the given entity.
   * Will be called before an entity will be destroyed.
   * @param entity
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    entity: Entity,
    event: "beforeEntityDestroy",
    callback: (entity: Entity) => void
  ): () => void;

  /**
   * Adds callback only to the given entity.
   * @param entity
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    entity: Entity,
    event: "itemEquipped",
    callback: (entity: Entity, item: Entity, userEvent: boolean) => void
  ): () => void;

  /**
   * Adds callback only to the given entity.
   * @param entity
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    entity: Entity,
    event: "itemUnequipped",
    callback: (entity: Entity, item: Entity, userEvent: boolean) => void
  ): () => void;

  /**
   * Adds callback only to the given entity.
   * @param entity
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    entity: Entity,
    event: "itemReceived",
    callback: (entity: Entity, item: Entity, amount: number) => void
  ): () => void;

  /**
   * Adds callback only to the given entity.
   * @param entity
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    entity: Entity,
    event: "itemRemoved",
    callback: (entity: Entity, item: Entity, amount: number) => void
  ): () => void;

  /**
   * Adds callback only to the given entity.
   * @param entity
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    entity: Entity,
    event: "itemUsed",
    callback: (entity: Entity, item: Entity, userEvent: boolean) => void
  ): () => void;

  /**
   * Adds callback only to the given entity.
   * @param entity
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    entity: Entity,
    event: "itemDropped",
    callback: (
      entity: Entity,
      item: Entity,
      amount: number,
      world: Entity,
      userEvent: boolean
    ) => void
  ): () => void;

  /**
   * Adds callback only to the given entity.
   * @param entity
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    entity: Entity,
    event: "itemTaken",
    callback: (
      entity: Entity,
      item: Entity,
      amount: number,
      world: Entity,
      userEvent: boolean
    ) => void
  ): () => void;

  /**
   * Adds callback to global event listener.
   * @param entity
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    entity: Entity,
    event: "itemTransferred",
    callback: (
      sender: Entity,
      receiver: Entity,
      item: Entity,
      amount: number,
      userEvent: boolean
    ) => void
  ): () => void;

  /**
   * Adds callback only to the given entity.
   * @param entity
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    entity: Entity,
    event: "chatCommand",
    callback: (entity: Entity, command: string) => void
  ): () => void;

  /**
   * Adds callback only to the given entity.
   * @param entity
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    entity: Entity,
    event: "chatInput",
    callback: (entity: Entity, message: string) => void
  ): () => void;

  /**
   * Adds callback only to the given entity.
   * @param entity
   * @param event
   * @param callback
   * @returns Function to remove listener.
   */
  export function on(
    entity: Entity,
    event: "attacked",
    callback: (attacker: Entity, target: Entity, userEvent: boolean) => void
  ): () => void;

  ///////////////////////////////////
  // Component functions
  ///////////////////////////////////

  export interface Position {
    position: Vec3;
  }

  export function setPosition(entity: Entity, position: Position | Vec3): void;

  export function getPosition(entity: Entity): Position;

  export function hasPosition(entity: Entity): boolean;

  export interface Rotation {
    rotation: Quat;
  }

  export function setRotation(entity: Entity, rotation: Rotation | Quat): void;

  export function getRotation(entity: Entity): Rotation;

  export function hasRotation(entity: Entity): boolean;

  //export interface Scale {
  //    scale: Vec3;
  //}
  //
  //export function setScale(entity: Entity, scale: Scale | Vec3): void
  //
  //export function getScale(entity: Entity): Scale
  //
  //export function hasScale(entity: Entity): boolean

  export interface ItemInstance {
    id: string;
    instance: Entity;
  }

  export function getItemInstance(entity: Entity): ItemInstance;

  export function hasItemInstance(entity: Entity): boolean;

  export interface Health {
    current: number;
    max: number;
  }

  export function setHealth(
    entity: Entity,
    health: { current?: number; max?: number }
  ): void;

  export function getHealth(entity: Entity): Health;

  export function hasHealth(entity: Entity): boolean;

  export interface Mana {
    current: number;
    max: number;
  }

  export function setMana(
    entity: Entity,
    mana: { current?: number; max?: number }
  ): void;

  export function getMana(entity: Entity): Mana;

  export function hasMana(entity: Entity): boolean;

  export interface CombatState {
    weaponMode: WeaponMode;
    unconscious: boolean;
  }

  export function setCombatState(
    entity: Entity,
    combatState: { weaponMode?: WeaponMode; unconscious?: boolean }
  ): void;

  export function getCombatState(entity: Entity): CombatState;

  export function hasCombatState(entity: Entity): boolean;

  export interface Name {
    name: string;
  }

  export function setName(entity: Entity, name: Name | string): void;

  export function getName(entity: Entity): Name;

  export function hasName(entity: Entity): boolean;

  export interface Time {
    hour: number;
    minute: number;
  }

  export function setTime(
    entity: Entity,
    time: { hour?: number; minute?: number }
  ): void;

  export function getTime(entity: Entity): Time;

  export function hasTime(entity: Entity): boolean;

  export interface Attributes {
    strength: number;
    dexterity: number;
    magicCircle: number;
    oneHanded: number;
    twoHanded: number;
    bow: number;
    crossbow: number;
  }

  export function setAttributes(
    entity: Entity,
    attributes: {
      strength?: number;
      dexterity?: number;
      magicCircle?: number;
      oneHanded?: number;
      twoHanded?: number;
      bow?: number;
      crossbow?: number;
    }
  ): void;

  export function getAttributes(entity: Entity): Attributes;

  export function hasAttributes(entity: Entity): boolean;

  export interface MeleeAttack {
    blunt: number;
    edge: number;
    point: number;
    fire: number;
    fly: number;
    magic: number;
    fall: number;
    range: number;
  }

  export function setMeleeAttack(
    entity: Entity,
    meleeAttack: {
      blunt?: number;
      edge?: number;
      point?: number;
      fire?: number;
      fly?: number;
      magic?: number;
      fall?: number;
      range?: number;
    }
  ): void;

  export function getMeleeAttack(entity: Entity): MeleeAttack;

  export function hasMeleeAttack(entity: Entity): boolean;

  export interface RangedAttack {
    blunt: number;
    edge: number;
    point: number;
    fire: number;
    fly: number;
    magic: number;
    fall: number;
    munition: Entity;
  }

  export function setRangedAttack(
    entity: Entity,
    rangedAttack: {
      blunt?: number;
      edge?: number;
      point?: number;
      fire?: number;
      fly?: number;
      magic?: number;
      fall?: number;
      munition?: Entity;
    }
  ): void;

  export function getRangedAttack(entity: Entity): RangedAttack;

  export function hasRangedAttack(entity: Entity): boolean;

  export interface Protection {
    blunt: number;
    edge: number;
    point: number;
    fire: number;
    fly: number;
    magic: number;
    fall: number;
  }

  export function setProtection(
    entity: Entity,
    protection: {
      blunt: number;
      edge: number;
      point: number;
      fire: number;
      fly: number;
      magic: number;
      fall: number;
    }
  ): void;

  export function getProtection(entity: Entity): Protection;

  export function hasProtection(entity: Entity): boolean;

  export interface Guild {
    guild: GuildType;
  }

  export function setGuild(entity: Entity, guild: Guild | GuildType): void;

  export function getGuild(entity: Entity): Guild;

  export function hasGuild(entity: Entity): boolean;

  export interface RigidBody {
    staticCollision: boolean;
    dynamicCollision: boolean;
    physics: boolean;
    gravity: boolean;
  }

  export function setRigidBody(
    entity: Entity,
    rigidBody: {
      staticCollision?: boolean;
      dynamicCollision?: boolean;
      physics?: boolean;
      gravity?: boolean;
    }
  ): void;

  export function getRigidBody(entity: Entity): Guild;

  export function hasRigidBody(entity: Entity): boolean;

  export interface Zen {
    zen: string;
    startpoint: string; // Name of a waypoint or empty string
  }

  export function getZen(entity: Entity): Zen;

  export function hasZen(entity: Entity): boolean;

  export interface Inventory {
    items: Entity[];
  }

  export function getInventory(entity: Entity): Inventory;

  export function hasInventory(entity: Entity): boolean;

  export interface Animation {
    type: number; // TODO: enum
    layer: number;
    name: string;
    alias: string;
    next: string;
    dir: number; // TODO: enum
    fps: number;
    blendInSpeed: number;
    blendOutSpeed: number;
    firstFrame: number;
    lastFrame: number;
    speed: number;
  }

  export interface ActiveAni {
    ani: Animation;

    /**
     * True if ani is fading out.
     */
    isFadingOut: boolean;
  }

  export interface ModelPrototype {
    /**
     * Mds name
     */
    name: string;

    /**
     * Contains all animations.
     */
    animations: Map<string, Animation>;
  }

  export interface Model {
    /**
     * List of animations. 6 animations can be played in parallel if they are
     * on different layers.
     */
    activeAnis: [
      ActiveAni?,
      ActiveAni?,
      ActiveAni?,
      ActiveAni?,
      ActiveAni?,
      ActiveAni?
    ];

    /**
     * Modelscript overlays.
     * Note: all overlays are in uppercase.
     */
    overlays: string[];

    /**
     * Modelscript prototypes. Contains all available animations.
     * The first prototyp is the visual and all others are mds overlays.
     */
    prototypes: ModelPrototype[];
  }

  export function getModel(entity: Entity): Model;

  export function hasModel(entity: Entity): boolean;

  /**
   * Contains the current character or world item in focus.
   * Entity can also be invalid.
   * This is sent from the client, which means it can be tampered with.
   */
  export interface Focus {
    focus: Entity;
  }

  export function getFocus(entity: Entity): Focus;

  export function hasFocus(entity: Entity): boolean;

  export interface Homeworld {
    world: Entity;
  }

  export function getHomeworld(entity: Entity): Homeworld;

  export function hasHomeworld(entity: Entity): boolean;

  export interface Description {
    title: string;
    text: [
      [string, number],
      [string, number],
      [string, number],
      [string, number],
      [string, number],
      [string, number]
    ];
  }

  export function getDescription(entity: Entity): Description;

  export function hasDescription(entity: Entity): boolean;

  export interface Countable {
    amount: number;
  }

  export function getCountable(entity: Entity): Countable;

  export function hasCountable(entity: Entity): boolean;

  export interface Equipment {
    meleeWeapon: Entity;
    rangedWeapon: Entity;
    //shield: Entity;
    armor: Entity;
    //helmet: Entity;
    amulet: Entity;
    belt: Entity;
    //rings: [Entity, Entity];
    //magicSpells: [Entity, Entity, Entity, Entity, Entity, Entity, Entity];
  }

  export function getEquipment(entity: Entity): Equipment;

  export function hasEquipment(entity: Entity): boolean;

  export interface Visual {
    visual: string;
  }

  export function setVisual(entity: Entity, visual: Visual | string): void;

  export function getVisual(entity: Entity): Visual;

  export function hasVisual(entity: Entity): boolean;

  export interface VisualBody {
    bodyMesh: string;
    bodyTexture: number;
    skinColor: number;
    headMesh: string;
    headTexture: number;
    teethTexture: number;
    bodyMass: number;
  }

  export function setVisualBody(
    entity: Entity,
    visualBody: {
      bodyMesh?: string;
      bodyTexture?: number;
      skinColor?: number;
      headMesh?: string;
      headTexture?: number;
      teethTexture?: number;
      bodyMass?: number;
    }
  ): void;

  export function getVisualBody(entity: Entity): VisualBody;

  export function hasVisualBody(entity: Entity): boolean;

  export interface VisualChange {
    visual: string;
    skin: number;
  }

  export function getVisualChange(entity: Entity): VisualChange;

  export function hasVisualChange(entity: Entity): boolean;

  export interface Scheme {
    scheme: string;
  }

  export function setScheme(entity: Entity, scheme: Scheme | string): void;

  export function getScheme(entity: Entity): Scheme;

  export function hasScheme(entity: Entity): boolean;

  export interface Waynet {
    waypoints: Entity[];
    freepoints: Entity[];
  }

  export function getWaynet(entity: Entity): Waynet;

  export function hasWaynet(entity: Entity): boolean;

  export interface Waypoint {
    underWater: boolean;
    waterDepth: number;
    connections: Entity[];
  }

  export function getWaypoint(entity: Entity): Waypoint;

  export function hasWaypoint(entity: Entity): boolean;
  
  export interface ItemMisc {
    /**
     * Gothic item categories.
     */
    category: ItemCategory;

    /**
     * Gothic item materials.
     */
    material: Material;

    /**
     * Gothic item value in gold.
     */
    value: number;
  }

  export function getItemMisc(entity: Entity): ItemMisc;

  export function hasItemMisc(entity: Entity): boolean;
    
  export interface WorldEntities {
    bots: Entity[];
    mobs: Entity[];
    vobs: Entity[];
    players: Entity[];
    sounds: Entity[];
  }

  export function getWorldEntities(entity: Entity): WorldEntities;

  export function hasWorldEntities(entity: Entity): boolean;

  export interface NetworkClient {
    /**
     * Unique identifier generated by the network.
     */
    guid: BigInt;

    /**
     * Ip address.
     */
    ip: string;

    /**
     * Last received tick from the client.
     */
    tick: number;

    /**
     * Last ping or -1 if there's none avalaible yet.
     */
    ping: number;

    /**
     * Average ping or -1 if there's none avalaible yet.
     */
    averagePing: number;
  }

  export function getNetworkClient(entity: Entity): NetworkClient;

  export function hasNetworkClient(entity: Entity): boolean;

  export interface NetworkSync {
    /**
     * After the client connects, the server sends all necessary initial data.
     * As soon as the client has loaded the world, worldLoaded becomes true and
     * the client begins to synchronize its state. 
     */
    worldLoaded: boolean;

    /**
     * Contains every bot that is synced by this client.
     * The position is synchronized, which depends on the gothic animations,
     * collisions and physics. 
     */
    botSync: Entity[];
  }

  export function getNetworkSync(entity: Entity): NetworkSync;

  export function hasNetworkSync(entity: Entity): boolean;

  //export enum WeatherType {
  //    Normal = 0,
  //    Rain = 1,
  //    Thunderstorm = 2,
  //    Snow = 3
  //}
  //
  //export interface Weather {
  //    type: WeatherType;
  //    weight: number;
  //}
  //
  //export function setWeather(entity: Entity, weather: Weather): void
  //
  //export function getWeather(entity: Entity): Weather
  //
  //export function hasWeather(entity: Entity): boolean

  /**
   * @throws Will throw if entity is not Player or has already a MovementController component.
   * @param entity
   */
  export function addMovementController(entity: Entity): void;

  /**
   * @throws Will throw if entity doesn't have a MovementController component.
   * @param entity
   */
  export function removeMovementController(entity: Entity): void;

  export function hasMovementController(entity: Entity): boolean;

  ///////////////////////////////////
  // Misc functions
  ///////////////////////////////////

  /**
   * Calls 'shutdown' event, disconnects all clients and stops program execution.
   */
  export function shutdown(exitCode: number): void;

  /**
   * Load waynet from vdfs.
   * @param world 
   * @throws Will throw if entity is invalid or not a world or if waynet couldn't be loaded.
   */
  export function loadWaynet(world: Entity): void;

   /**
    * Sends a chat message to the specified player or an array of players
    * which is more efficient.
    * @param player
    * @param message
    * @param color Defaults to [255, 255, 255, 255]
    * @throws Will throw if entity is not valid or not a player.
    */
  export function sendChatMessage(
     player: Entity | Entity[],
     message: string,
     color?: [number, number, number, number?]
   ): void;

  export function logTrace(...data: any[]): void;

  export function logDebug(...data: any[]): void;

  export function logInfo(...data: any[]): void;

  export function logWarn(...data: any[]): void;

  export function logError(...data: any[]): void;

  export function logCritical(...data: any[]): void;

  /**
   * A invalid entity.
   * Note: This is not the same as 0.
   */
  export const nullEntity: Entity;

  /**
   * Revmp server version.
   */
  export const version: string;

  /**
   * Required Revmp client version.
   */
  export const clientVersion: string;

  /**
   * Delta time in seconds between last and current tick.
   */
  export const deltaTime: number;

  /**
   * Current server tick.
   */
  export const tick: number;

  /**
   * Tick rate.
   */
  export const tickRate: number;

  /**
   * Max allowed players.
   */
  export const maxPlayers: number;

  /**
   * Log level.
   */
  export let logLevel: "trace"|"debug"|"info"|"warn"|"error"|"critical"|"off";

  /**
   * Range in which entities are streamend to the players.
   */
  export let streamRange: number;

  /**
   * Default world. First world created will be automatically
   * the default world.
   */
  export let defaultWorld: Entity;

  /**
   * Server name in launcher.
   */
  export let name: string;

  /**
   * Server description in launcher
   */
  export let description: string;

  /**
   * Server website in launcher
   */
  export let website: string;

  export const entities: Entity[];
  export const characters: Entity[];
  export const players: Entity[];
  export const bots: Entity[];
  export const worlds: Entity[];
  export const items: Entity[];
  export const vobs: Entity[];
  export const mobs: Entity[];
  export const itemInstances: Entity[];
}
