// Revmp client 0.11.0
declare namespace revmp {
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
        Misc = 7
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
        EmptyZ = 65
    }

    ///////////////////////////////////
    // Functions
    ///////////////////////////////////

    /**
     * Checks if entity is valid.
     * @param entity 
     * @returns True if entity is valid.
     */
    export function valid(entity: Entity): boolean

    /**
     * Adds a message to the chat.
     * @param message 
     * @param color Defaults to [255, 255, 255, 255]
     * @throws Will throw if entity is not valid or not a player.
     */
    export function addChatMessage(message: string, color?: [number, number, number, number?]): void

    //export function hasItem(instance: string|Entity): boolean

    //export function getItem(instance: string|Entity): Entity

    //export function useItem(instance: string|Entity): void

    //export function equipItem(instance: string|Entity): void

    //export function unequipItem(instance: string|Entity): void

    //export function equipped(instance: string|Entity): boolean

    //export function dropItem(instance: string|Entity, amount?: number): void

    //export function takeItem(item: Entity): void

    //export function drawMeleeWeapon(): void

    //export function drawRangedWeapon(): void

    //export function putWeaponAway(): void

    //export function attack(target: Entity): void

    //export function playSound(sound: string): void

    //export function playEffect(effect: string): void

    //export function changePlayerWorld(world: string|Entity): void

    ///////////////////////////////////
    // Events
    ///////////////////////////////////

    /**
     * Sends a user defined event to the server.
     * @param event 
     * @throws Will throw if event is a revmp built in event.
     */
    export function send(event: string, ...args: unknown[]): void

    /**
     * Receives user defined event from the server.
     * @param event 
     * @throws Will throw if event is a revmp built in event.
     */
    export function receive(event: string, callback: (...args: unknown[]) => void): void

    /**
     * Emits user defined event.
     * @param event 
     * @throws Will throw if event is a revmp built in event.
     */
    export function emit(event: string, ...args: unknown[]): void

    /**
     * Adds callback to an user defined event.
     * @param event 
     * @param callback 
     * @returns Function to remove listener.
     */
    export function on(event: string, callback: (...args: unknown[]) => void): () => void

    /**
     * Adds callback to global event listener.
     * @param event 
     * @param callback 
     * @returns Function to remove listener.
     */
    export function on(event: "init", callback: () => void): () => void

    /**
     * Adds callback to global event listener.
     * Will be called every client tick.
     * @param event 
     * @param callback 
     * @returns Function to remove listener.
     */
    export function on(event: "update", callback: () => void): () => void
    
    /**
     * Adds callback to global event listener.
     * Will be called after every Gothic frame.
     * @param event 
     * @param callback 
     * @returns Function to remove listener.
     */
     export function on(event: "frame", callback: () => void): () => void

    /**
     * Adds callback to global event listener.
     * Will be called after an entity was created.
     * @param {string} event 
     * @param callback 
     * @returns Function to remove listener.
     */
    export function on(event: "entityCreated", callback: (entity: Entity) => void): () => void

    /**
     * Adds callback to global event listener.
     * Will be called before an entity will be destroyed.
     * @param event 
     * @param callback 
     * @returns Function to remove listener.
     */
    export function on(event: "beforeEntityDestroy", callback: (entity: Entity) => void): () => void

    /**
     * Adds callback to global event listener.
     * @param event 
     * @param callback 
     * @returns Function to remove listener.
     */
    export function on(event: "chatCommand", callback: (command: string) => void): () => void
                    
    /**
     * Adds callback to global event listener.
     * @param event 
     * @param callback 
     * @returns Function to remove listener.
     */
    export function on(event: "chatInput", callback: (message: string) => void): () => void

    /**
     * Adds callback to global event listener.
     * @param event 
     * @param callback 
     * @returns Function to remove listener.
     */
    export function on(event: "chatMessage", callback: (message: string, color: [number, number, number, number]) => void): () => void


    ///////////////////////////////////
    // Getter and Setter
    ///////////////////////////////////

    export interface Position {
        position: Vec3;
    }

    export function getPosition(entity: Entity): Position

    export function hasPosition(entity: Entity): boolean


    export interface Rotation {
        rotation: Quat;
    }

    export function getRotation(entity: Entity): Rotation

    export function hasRotation(entity: Entity): boolean


    //export interface Scale {
    //    scale: Vec3;
    //}
    //
    //export function getScale(entity: Entity): Scale
    //
    //export function hasScale(entity: Entity): boolean


    export interface ItemInstance {
        id: string;
        instance: Entity;
    }

    export function getItemInstance(entity: Entity): ItemInstance

    export function hasItemInstance(entity: Entity): boolean


    export interface Health {
        current: number;
        max: number;
    }

    /**
     * Returns health in percentage.
     * @param entity 
     */
    export function getHealth(entity: Entity): Health

    export function hasHealth(entity: Entity): boolean


    export interface Mana {
        current: number;
        max: number;
    }

    export function getMana(entity: Entity): Mana

    export function hasMana(entity: Entity): boolean

    
    export interface CombatState {
        weaponMode: WeaponMode;
        unconscious: boolean;
    }

    export function getCombatState(entity: Entity): CombatState

    export function hasCombatState(entity: Entity): boolean


    export interface Name {
        name: string;
    }

    export function getName(entity: Entity): Name

    export function hasName(entity: Entity): boolean


    export interface Time {
        hour: number;
        minute: number;
    }

    export function getTime(entity: Entity): Time

    export function hasTime(entity: Entity): boolean


    export interface Attributes {
        strength: number;
        dexterity: number;
        magicCircle: number;
        oneHanded: number;
        twoHanded: number;
        bow: number;
        crossbow: number;
    }

    export function getAttributes(entity: Entity): Attributes

    export function hasAttributes(entity: Entity): boolean


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

    export function getMeleeAttack(entity: Entity): MeleeAttack

    export function hasMeleeAttack(entity: Entity): boolean

    
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

    export function getRangedAttack(entity: Entity): RangedAttack

    export function hasRangedAttack(entity: Entity): boolean


    export interface Protection {
        blunt: number;
        edge: number;
        point: number;
        fire: number;
        fly: number;
        magic: number;
        fall: number;
    }

    export function getProtection(entity: Entity): Protection

    export function hasProtection(entity: Entity): boolean


    export interface Guild {
        guild: GuildType;
    }

    export function getGuild(entity: Entity): Guild

    export function hasGuild(entity: Entity): boolean


    export interface RigidBody {
        staticCollision: boolean;
        dynamicCollision: boolean;
        physics: boolean;
        gravity: boolean;
    }

    export function getRigidBody(entity: Entity): Guild

    export function hasRigidBody(entity: Entity): boolean


    export interface Zen {
        zen: string;
        startpoint: string; // Name of a waypoint or empty string
    }

    export function getZen(entity: Entity): Zen

    export function hasZen(entity: Entity): boolean


    export interface Inventory {
        items: Entity[];
    }

    export function getInventory(entity: Entity): Inventory

    export function hasInventory(entity: Entity): boolean
    

    export interface Ani {
        name: string;
        //layer: number;
    }

    export interface ActiveAni {
        ani: Ani;
        isFadingOut: boolean;
    }

    export interface Animations {
        activeAnis: [ActiveAni, ActiveAni, ActiveAni, ActiveAni, ActiveAni, ActiveAni];
        overlays: string[];
    }

    export function getAnimations(entity: Entity): Animations

    export function hasAnimations(entity: Entity): boolean


    /**
     * Contains the current character or world item in focus.
     * Entity can also be invalid.
     * This is sent from the client, which means it can be tampered with.
     */
     export interface Focus {
        focus: Entity;
    }
    
    export function getFocus(entity: Entity): Focus

    export function hasFocus(entity: Entity): boolean


    export interface Homeworld {
        world: Entity;
    }

    export function getHomeworld(entity: Entity): Homeworld

    export function hasHomeworld(entity: Entity): boolean


    export interface Description {
        title: string;
        text: [[string, number], [string, number], [string, number], [string, number], [string, number], [string, number]];
    }

    export function getDescription(entity: Entity): Description

    export function hasDescription(entity: Entity): boolean


    export interface Countable {
        amount: number;
    }

    export function getCountable(entity: Entity): Countable

    export function hasCountable(entity: Entity): boolean


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

    export function getEquipment(entity: Entity): Equipment

    export function hasEquipment(entity: Entity): boolean


    export interface Visual {
        visual: string;
    }

    export function getVisual(entity: Entity): Visual

    export function hasVisual(entity: Entity): boolean


    export interface VisualBody {
        bodyMesh: string;
        bodyTexture: number;
        skinColor: number;
        headMesh: string;
        headTexture: number;
        teethTexture: number;
        bodyMass: number;
    }

    export function getVisualBody(entity: Entity): VisualBody

    export function hasVisualBody(entity: Entity): boolean


    export interface VisualChange {
        visual: string;
        skin: number;
    }

    export function getVisualChange(entity: Entity): VisualChange

    export function hasVisualChange(entity: Entity): boolean


    export interface Scheme {
        scheme: string;
    }

    export function getScheme(entity: Entity): Scheme

    export function hasScheme(entity: Entity): boolean


    export interface Waypoint {
        underWater: boolean;
        waterDepth: number;
        connections: Entity[];
    }

    export function getWaypoint(entity: Entity): Waypoint

    export function hasWaypoint(entity: Entity): boolean

    
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
    //export function getWeather(entity: Entity): Weather
    //
    //export function hasWeather(entity: Entity): boolean


    export function hasMovementController(entity: Entity): boolean


    // Note: An entity can be one or more of the following types.
    /**
     * A character entity may have the following components:
     * Name, Position, Rotation, Scale, Animations, Health, Mana, Attributes,
     * MeleeAttack, Protection, Visual, VisualBody, Effect, CombatState,
     * Homeworld, Inventory and Equipment.
     * @param entity 
     */
    export function isCharacter(entity: Entity): boolean

    /**
     * A vob entity may have the following components:
     * Homeworld, Position, Rotation and Visual.
     * @param entity 
     */
    export function isVob(entity: Entity): boolean

    /**
     * A item entity may have the following components:
     * ItemInstance and Countable
     * @param entity 
     */
    export function isItem(entity: Entity): boolean

    /**
     * A invalid entity.
     */
    export const nullEntity: Entity;

    /**
     * Player entity. Will be valid after first snapshot.
     */
    export const player: Entity;

    /**
     * World entity.
     */
    export const world: Entity;

    /**
     * Revmp client version.
     */
    export const version: string;

    /**
     * Delta time in seconds between last and current tick.
     */
    //export const deltaTime: number;

    /**
     * Last snapshot tick received from server.
     */
    export const lastSnapshot: number;

    /**
     * Current client tick.
     */
    export const tick: number;

    /**
     * Tick rate.
     */
    export const tickRate: number;

    /**
     * Resolution width.
     */
    export const resolutionX: number;

    /**
     * Resolution height.
     */
     export const resolutionY: number;

    /**
     * Log level. Possible values: "trace", "debug", "info", "warn", "error", "critical", "off".
     */
    export let logLevel: string;

    export const entities: Entity[];
    export const characters: Entity[];
    export const items: Entity[];
    export const vobs: Entity[];
    export const mobs: Entity[];
    export const itemInstances: Entity[];
}