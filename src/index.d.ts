declare namespace revmp {
    // Components
    export interface Instance {
        readonly id: string;
        readonly entity: number;
    }

    export interface Health {
        current: number;
        max: number;
    }

    export interface Mana {
        current: number;
        max: number;
    }

    export interface Attributes {
        strength: number;
        dexterity: number;
        magicCircle: number;
        oneHanded: number;
        twoHanded: number;
        bow: number;
        crossbow: number;
    }

    export interface Position {
        x: number;
        y: number;
        z: number;
    }

    export interface Rotation {
        x: number;
        y: number;
        z: number;
    }

    export interface Name {
        name: string;
    }

    export interface Time {
        hour: number;
        minute: number;
    }

    export interface Zen {
        readonly zen: string;
        readonly waypoint: string;
    }

    export interface Inventory {
        readonly items: number[];
    }

    export interface Equipment {
        readonly meleeWeapon: number;
        readonly rangedWeapon: number;
        //readonly shield: number;
        readonly armor: number;
        //readonly helmet: number;
        readonly amulet: number;
        readonly belt: number;
        //readonly rings: [number, number];
        //readonly magicSpells: [number, number, number, number, number, number, number];
    }

    //export interface Weather {
    //    type: string; // TODO: should be an enum
    //    weight: number;
    //}

    /*export interface Ani {
        id: number;
        layer: number;
        name: string;
    }

    export interface ActiveAni {
        ani: Ani;
        isFadingOut: boolean;
    }*/

    export interface Animations {
        //activeAnis: [ActiveAni, ActiveAni, ActiveAni, ActiveAni, ActiveAni, ActiveAni];
        overlays: [string];
    }

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

    export interface RangedAttack {
        blunt: number;
        edge: number;
        point: number;
        fire: number;
        fly: number;
        magic: number;
        fall: number;
        munition: number;
    }

    export interface Protection {
        blunt: number;
        edge: number;
        point: number;
        fire: number;
        fly: number;
        magic: number;
        fall: number;
    }

    export interface WorldResident {
        readonly world: number;
    }

    export interface Description {
        readonly title: string;
        //readonly text: [[string, number], [string, number], [string, number], [string, number], [string, number], [string, number]];
    }

    export interface Visual {
        visual: string;
    }

    export interface VisualBody {
        bodyMesh: string;
        bodyTexture: number;
        skinColor: number;
        headMesh: string;
        headTexture: number;
        teethTexture: number;
        bodyMass: number;
    }

    export interface WeaponMode {
        mode: WeaponState;
    }

    export interface Countable {
        readonly amount: number;
    }

    export enum InstanceType {
        World = 0,
        Character = 1,
        MeleeWeapon = 2,
        RangedWeapon = 3,
        Munition = 4,
        Armor = 5,
        Consumable = 6,
        Accessories = 7,
        Magic = 8,
        OtherItem = 9,
    }

    export enum WeaponState {
        None = 0,
        Fist = 1,
        Dagger = 2,
        OneHand = 3,
        TwoHand = 4,
        Bow = 5,
        Crossbow = 6,
        Magic = 7,
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

    // InstanceTemplates
    export interface WorldTemplate {
        type: InstanceType.World;
        id: string;
        name?: string;
        zen: string;
        waypoint?: string;
    }

    export interface CharacterTemplate {
        type: InstanceType.Character;
        id: string;
        name?: string;
        maxHealth: number;
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
        visualBody: {
            bodyMesh: string;
            bodyTexture?: number;
            skinColor?: number;
            headMesh?: string;
            headTexture?: number;
            teethTexture?: number;
            bodyMass?: number;
        };
        effect?: string;
        weaponMode?: WeaponMode;
        //voice?
        //npcType?
        //talents?
        //guild?
    }

    export interface MeleeWeaponTemplate {
        type: InstanceType.MeleeWeapon;
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
        category: ItemCategory.Dagger|ItemCategory.Sword|ItemCategory.Axe|ItemCategory.TwoHandSword|ItemCategory.TwoHandAxe;
        value?: number;
        effect?: string;
        description?: {
            title?: string; // If empty, this corresponds to name. 
            text?: [[string, number?], [string, number?], [string, number?], [string, number?], [string, number?], [string, number?]];
        };
    }

    export interface MunitionTemplate {
        type: InstanceType.Munition;
        id: string;
        name?: string;
        visual: string;
        material: Material;
        category: ItemCategory.BowMunition|ItemCategory.CrossbowMunition;
        value?: number;
        effect?: string;
        description?: {
            title?: string; // If empty, this corresponds to name. 
            text?: [[string, number], [string, number], [string, number], [string, number], [string, number], [string, number]];
        };
    }

    export interface RangedWeaponTemplate {
        type: InstanceType.RangedWeapon;
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
            munition: number; // Needs to be an entity
        };
        visual: string;
        material: Material;
        category: ItemCategory.Bow|ItemCategory.Crossbow;
        value?: number;
        effect?: string;
        description?: {
            title?: string; // If empty, this corresponds to name. 
            text?: [[string, number], [string, number], [string, number], [string, number], [string, number], [string, number]];
        };
    }

    export interface ArmorTemplate {
        type: InstanceType.Armor;
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
            text?: [[string, number], [string, number], [string, number], [string, number], [string, number], [string, number]];
        };
    }

    export interface ConsumableTemplate {
        type: InstanceType.Consumable;
        id: string;
        name?: string;
        visual: string;
        material: Material;
        category: ItemCategory.Food|ItemCategory.Potion;
        value?: number;
        effect?: string;
        sceme?: string;
        description?: {
            title?: string; // If empty, this corresponds to name. 
            text?: [[string, number], [string, number], [string, number], [string, number], [string, number], [string, number]];
        };
    }

    type InstanceTemplate = WorldTemplate | CharacterTemplate | MeleeWeaponTemplate | ArmorTemplate | ConsumableTemplate;

    // Functions
    /**
     * Adds callback to global event listener.
     * @param {string} event 
     * @param {Function} callback 
     */
    export function on(event: "init", callback: () => void): void

    /**
     * Adds callback to global event listener.
     * Will be called every server tick.
     * @param {string} event 
     * @param {Function} callback 
     */
    export function on(event: "update", callback: () => void): void

    /**
     * Adds callback to global event listener.
     * @param {string} event 
     * @param {Function} callback 
     */
    export function on(event: "shutdown", callback: () => void): void

    /**
     * Adds callback to global event listener.
     * Will be called after an entity was created.
     * @param {string} event 
     * @param {(entity: number) => void} callback 
     */
    export function on(event: "entityCreated", callback: (entity: number) => void): void

    /**
     * Adds callback to global event listener.
     * Will be called before an entity will be destroyed.
     * @param {string} event 
     * @param {(entity: number) => void} callback 
     */
    export function on(event: "entityDestroy", callback: (entity: number) => void): void

    /**
     * Adds callback to global event listener.
     * @param {string} event 
     * @param {(entity: number) => void} callback 
     */
    export function on(event: "itemEquipped", callback: (entity: number) => void): void

    /**
     * Adds callback to global event listener.
     * @param {string} event 
     * @param {(entity: number, item: number) => void} callback 
     */
    export function on(event: "itemUnequipped", callback: (entity: number, item: number) => void): void

    /**
     * Adds callback to global event listener.
     * @param {string} event 
     * @param {(entity: number, item: number, amount: number) => void} callback 
     */
    export function on(event: "itemReceived", callback: (entity: number, item: number, amount: number) => void): void

    /**
     * Adds callback to global event listener.
     * @param {string} event 
     * @param {(entity: number, item: number, amount: number) => void} callback 
     */
    export function on(event: "itemRemoved", callback: (entity: number, item: number, amount: number) => void): void
    
    /**
     * Adds callback to global event listener.
     * @param {string} event 
     * @param {(entity: number, item: number) => void} callback 
     */
    export function on(event: "itemUsed", callback: (entity: number, item: number) => void): void
        
    /**
     * Adds callback to global event listener.
     * @param {string} event 
     * @param {(entity: number, item: number) => void} callback 
     */
    export function on(event: "itemDropped", callback: (entity: number, item: number) => void): void
            
    /**
     * Adds callback to global event listener.
     * @param {string} event 
     * @param {(entity: number, item: number) => void} callback 
     */
    export function on(event: "itemTaken", callback: (entity: number, item: number) => void): void
                
    /**
     * Adds callback to global event listener.
     * @param {string} event 
     * @param {(entity: number, message: string) => void} callback 
     */
    export function on(event: "chatCommand", callback: (player: number, command: string) => void): void
                    
    /**
     * Adds callback to global event listener.
     * @param {string} event 
     * @param {(entity: number, message: string) => void} callback 
     */
    export function on(event: "chatInput", callback: (player: number, message: string) => void): void

    /**
     * Adds callback only to the given entity.
     * Will be called before an entity will be destroyed.
     * @param {number} entity 
     * @param {string} event 
     * @param {(entity: number) => void} callback 
     */
    export function on(entity: number, event: "entityDestroy", callback: (entity: number) => void): void

    /**
     * Adds callback only to the given entity.
     * @param {number} entity 
     * @param {string} event 
     * @param {(entity: number) => void} callback 
     */
    export function on(entity: number, event: "itemEquipped", callback: (entity: number) => void): void

    /**
     * Adds callback only to the given entity.
     * @param {number} entity 
     * @param {string} event 
     * @param {(entity: number, item: number) => void} callback 
     */
    export function on(entity: number, event: "itemUnequipped", callback: (entity: number, item: number) => void): void

    /**
     * Adds callback only to the given entity.
     * @param {number} entity 
     * @param {string} event 
     * @param {(entity: number, item: number, amount: number) => void} callback 
     */
    export function on(entity: number, event: "itemReceived", callback: (entity: number, item: number, amount: number) => void): void

    /**
     * Adds callback only to the given entity.
     * @param {number} entity 
     * @param {string} event 
     * @param {(entity: number, item: number, amount: number) => void} callback 
     */
    export function on(entity: number, event: "itemRemoved", callback: (entity: number, item: number, amount: number) => void): void
    
    /**
     * Adds callback only to the given entity.
     * @param {number} entity 
     * @param {string} event 
     * @param {(entity: number, item: number) => void} callback 
     */
    export function on(entity: number, event: "itemUsed", callback: (entity: number, item: number) => void): void
        
    /**
     * Adds callback only to the given entity.
     * @param {number} entity 
     * @param {string} event 
     * @param {(entity: number, item: number) => void} callback 
     */
    export function on(entity: number, event: "itemDropped", callback: (entity: number, item: number) => void): void
            
    /**
     * Adds callback only to the given entity.
     * @param {number} entity 
     * @param {string} event 
     * @param {(entity: number, item: number) => void} callback 
     */
    export function on(entity: number, event: "itemTaken", callback: (entity: number, item: number) => void): void
                
    /**
     * Adds callback only to the given entity.
     * @param {number} entity 
     * @param {string} event 
     * @param {(entity: number, command: string) => void} callback 
     */
    export function on(entity: number, event: "chatCommand", callback: (player: number, command: string) => void): void
                    
    /**
     * Adds callback only to the given entity.
     * @param {number} entity 
     * @param {string} event 
     * @param {(entity: number, message: string) => void} callback 
     */
    export function on(entity: number, event: "chatInput", callback: (player: number, message: string) => void): void

    /**
     * Checks if entity still exists in RevMP.
     * @param {number} entity 
     * @returns {boolean} True if entity exists in RevMP.
     */
    export function valid(entity: number): boolean

    /**
     * Creates a template for an instance. The id must be an unique ascii string.
     * You have to make sure that the instance does not appear in deadalus scripts.
     * @param {InstanceTemplate} instanceTemplate 
     * @throws Will throw if called after RevMP init, instance contains non-ascii characters, instance is already used or type is unkown.
     */
    export function createInstanceTemplate(instanceTemplate: InstanceTemplate): number

    /**
     * Creates a world entity with the following components:
     * World, Instance, Inventory, Weather, Time and Zen.
     * Inventory and Equipment.
     * @param {string|number} instance 
     * @returns {number} The created entity.
     * @throws Will throw if instance contains non-ascii characters, instance is not a WorldInstance or instance doesn't exists.
     */
    export function createWorld(instance: string|number): number

    /**
     * Creates a bot entity with the following components:
     * Character, Instance, Position, Rotation, Scale, Animations, VisualBody, Health,
     * Mana, Attributes, MeleeAttack, Protection, WeaponMode, WorldResident,
     * Inventory and Equipment.
     * @param {string|number} instance 
     * @returns {number} The created entity.
     * @throws Will throw if instance contains non-ascii characters, instance is not a CharacterInstance or instance doesn't exists.
     */
    export function createBot(instance: string|number): number

    /**
     * 
     * @param {number} entity Entity to be destroyed.
     * @throws Will throw if entity is not {@link valid} or not destroyable.
     */
    export function destroyEntity(entity: number): void

    /**
     * Calls 'shutdown' event, disconnects all clients and stops program execution.
     */
    export function shutdown(): void

    /**
     * Sends a chat message to the specified player or an array of players
     * which is more efficient.
     * @param {number} player 
     * @param {string} message 
     * @param {[number, number, number, number?]} color defaults to [255, 255, 255, 255]
     * @throws Will throw if entity is not valid or not a player.
     */
    export function sendChatMessage(player: number|number[], message: string, color?: [number, number, number, number?]): void

    /**
     * Checks if entity has an item with the specified instance in his inventory.
     * @param {number} entity 
     * @param {string|number} instance 
     * @returns {boolean} True if entity has item.
     * @throws Will throw if entity is not valid, instance contains non-ascii characters, instance doesn't exists or entity doesn't have Inventory component.
     */
    export function hasItem(entity: number, instance: string|number): boolean

    /**
     * Checks and returns the item if the entity has it. 
     * @param {number} entity 
     * @param {string|number} instance 
     * @returns {number?} Item entity or null.
     * @throws Will throw if entity is not valid, instance contains non-ascii characters, instance doesn't exists or entity doesn't have Inventory component.
     */
    export function getItem(entity: number, instance: string|number): number

    /**
     * Adds and returns item to an entity with an inventory component.
     * Item entity will have the following components if entity is a player:
     * Instance and Countable
     * Or if entity is a world:
     * Instance, Countable, Position, Rotation, WorldResident
     * 
     * If entity is a player and already possesses the item,
     * the amount of the existing item will be increased instead. 
     * @param entity 
     * @param instance 
     * @param amount 
     */
    export function addItem(entity: number, instance: string|number, amount?: number): number

    export function removeItem(entity: number, instance: string|number, amount?: number): void

    export function interactItem(entity: number, instance: string|number): void

    export function equipped(entity: number, instance: string|number): boolean

    export function dropItem(entity: number, instance: string|number, amount?: number): number

    export function takeItem(entity: number, item: number): void

    /**
     * Clears all items in inventory and calls successively the 'itemRemoved' event.
     * @param {number} entity Entity with inventory component.
     * @throws Will throw if entity is not valid or entity doesn't have Inventory component.
     */
    export function clearInventory(entity: number): void

    export function drawMeleeWeapon(entity: number): void

    export function drawRangedWeapon(entity: number): void

    export function putWeaponAway(entity: number): void

    //export function changeInstance(entity: number, instance: string|number): void
    //export function changeWorld(entity: number, world: string|number): void

    //export function addOverlay(entity: number, overlay: string): void
    //export function removeOverlay(entity: number, overlay: string): void
    //export function clearOverlays(entity: number): void
    //export function startAnimation(entity: number, ani: string): void
    //export function stopAnimation(entity: number, ani: string): void

    export function getInstance(entity: number): Instance
    export function hasInstance(entity: number): boolean

    export function setHealth(entity: number, health: Health): void
    export function getHealth(entity: number): Health
    export function hasHealth(entity: number): boolean

    export function setMana(entity: number, mana: Mana): void
    export function getMana(entity: number): Mana
    export function hasMana(entity: number): boolean

    export function setPosition(entity: number, position: Position): void
    export function getPosition(entity: number): Position
    export function hasPosition(entity: number): boolean

    export function setRotation(entity: number, rotation: Rotation): void
    export function getRotation(entity: number): Rotation
    export function hasRotation(entity: number): boolean
    
    export function setWeaponMode(entity: number, weaponMode: WeaponMode): void
    export function getWeaponMode(entity: number): WeaponMode
    export function hasWeaponMode(entity: number): boolean

    export function setName(entity: number, name: Name): void
    export function getName(entity: number): Name
    export function hasName(entity: number): boolean

    export function setTime(entity: number, time: Time): void
    export function getTime(entity: number): Time
    export function hasTime(entity: number): boolean

    export function setAttributes(entity: number, attributes: Attributes): void
    export function getAttributes(entity: number): Attributes
    export function hasAttributes(entity: number): boolean

    export function setMeleeAttack(entity: number, meleeAttack: MeleeAttack): void
    export function getMeleeAttack(entity: number): MeleeAttack
    export function hasMeleeAttack(entity: number): boolean
    
    export function setProtection(entity: number, protection: Protection): void
    export function getProtection(entity: number): Protection
    export function hasProtection(entity: number): boolean

    export function getZen(entity: number): Zen
    export function hasZen(entity: number): boolean

    export function getInventory(entity: number): Inventory
    export function hasInventory(entity: number): boolean

    export function getAnimations(entity: number): Animations
    export function hasAnimations(entity: number): boolean

    export function getWorldResident(entity: number): WorldResident
    export function hasWorldResident(entity: number): boolean

    export function getDescription(entity: number): Description
    export function hasDescription(entity: number): boolean

    export function getCountable(entity: number): Countable
    export function hasCountable(entity: number): boolean

    export function getEquipment(entity: number): Equipment
    export function hasEquipment(entity: number): boolean

    export function getVisual(entity: number): Visual
    export function hasVisual(entity: number): boolean

    export function setVisualBody(entity: number, visualBody: VisualBody): void
    export function getVisualBody(entity: number): VisualBody
    export function hasVisualBody(entity: number): boolean

    //export function setWeather(entity: number, weather: Weather): void
    //export function getWeather(entity: number): Weather
    //export function hasWeather(entity: number): boolean

    export function isPlayer(entity: number): boolean
    export function isBot(entity: number): boolean
    export function isCharacter(entity: number): boolean
    export function isItem(entity: number): boolean
    export function isWorld(entity: number): boolean
    export function isInstanceTemplate(entity: number): boolean

    export const entities: number[];
    export const characters: number[];
    export const players: number[];
    export const bots: number[];
    export const worlds: number[];
    export const items: number[];
    export const instances: number[];
}