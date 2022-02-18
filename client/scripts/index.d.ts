// Revmp client 0.13.0
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
  
    export enum KeyCode {
      KEY_ESCAPE = 0x01,
      KEY_1 = 0x02,
      KEY_2 = 0x03,
      KEY_3 = 0x04,
      KEY_4 = 0x05,
      KEY_5 = 0x06,
      KEY_6 = 0x07,
      KEY_7 = 0x08,
      KEY_8 = 0x09,
      KEY_9 = 0x0A,
      KEY_0 = 0x0B,
      KEY_MINUS = 0x0C,
      KEY_EQUALS = 0x0D,
      KEY_BACK = 0x0E, 
      KEY_TAB = 0x0F,
      KEY_Q = 0x10,
      KEY_W = 0x11,
      KEY_E = 0x12,
      KEY_R = 0x13,
      KEY_T = 0x14,
      KEY_Y = 0x15,
      KEY_U = 0x16,
      KEY_I = 0x17,
      KEY_O = 0x18,
      KEY_P = 0x19,
      KEY_LBRACKET = 0x1A,
      KEY_RBRACKET = 0x1B,
      KEY_RETURN = 0x1C,
      KEY_LCONTROL = 0x1D,
      KEY_A = 0x1E,
      KEY_S = 0x1F,
      KEY_D = 0x20,
      KEY_F = 0x21,
      KEY_G = 0x22,
      KEY_H = 0x23,
      KEY_J = 0x24,
      KEY_K = 0x25,
      KEY_L = 0x26,
      KEY_SEMICOLON = 0x27,
      KEY_APOSTROPHE = 0x28,
      KEY_TILDE = 0x29,
      KEY_LSHIFT = 0x2A,
      KEY_BACKSLASH = 0x2B,
      KEY_Z = 0x2C,
      KEY_X = 0x2D,
      KEY_C = 0x2E,
      KEY_V = 0x2F,
      KEY_B = 0x30,
      KEY_N = 0x31,
      KEY_M = 0x32,
      KEY_COMMA = 0x33,
      KEY_PERIOD = 0x34,
      KEY_SLASH = 0x35,
      KEY_RSHIFT = 0x36,
      KEY_MULTIPLY = 0x37,
      KEY_LMENU = 0x38,
      KEY_SPACE = 0x39,
      KEY_CAPITAL = 0x3A,
      KEY_F1 = 0x3B,
      KEY_F2 = 0x3C,
      KEY_F3 = 0x3D,
      KEY_F4 = 0x3E,
      KEY_F5 = 0x3F,
      KEY_F6 = 0x40,
      KEY_F7 = 0x41,
      KEY_F8 = 0x42,
      KEY_F9 = 0x43,
      KEY_F10 = 0x44,
      KEY_NUMLOCK = 0x45,
      KEY_SCROLL = 0x46,
      KEY_NUMPAD7 = 0x47,
      KEY_NUMPAD8 = 0x48,
      KEY_NUMPAD9 = 0x49,
      KEY_SUBTRACT = 0x4A,
      KEY_NUMPAD4 = 0x4B,
      KEY_NUMPAD5 = 0x4C,
      KEY_NUMPAD6 = 0x4D,
      KEY_ADD = 0x4E,
      KEY_NUMPAD1 = 0x4F,
      KEY_NUMPAD2 = 0x50,
      KEY_NUMPAD3 = 0x51,
      KEY_NUMPAD0 = 0x52,
      KEY_DECIMAL = 0x53,
      KEY_OEM_102 = 0x56,
      KEY_F11 = 0x57,
      KEY_F12 = 0x58,
      KEY_F13 = 0x64,
      KEY_F14 = 0x65,
      KEY_F15 = 0x66,
      KEY_KANA = 0x70,
      KEY_ABNT_C1 = 0x73,
      KEY_CONVERT = 0x79,
      KEY_NOCONVERT = 0x7B,
      KEY_YEN = 0x7D,
      KEY_ABNT_C2 = 0x7E,
      KEY_NUMPADEQUALS = 0x8D,
      KEY_PREVTRACK = 0x90,
      KEY_AT = 0x91,
      KEY_COLON = 0x92,
      KEY_UNDERLINE = 0x93,
      KEY_KANJI = 0x94,
      KEY_STOP = 0x95,
      KEY_AX = 0x96,
      KEY_UNLABELED = 0x97,
      KEY_NEXTTRACK = 0x99,
      KEY_NUMPADENTER = 0x9C,
      KEY_RCONTROL = 0x9D,
      KEY_MUTE = 0xA0,
      KEY_CALCULATOR = 0xA1,
      KEY_PLAYPAUSE = 0xA2,
      KEY_MEDIASTOP = 0xA4,
      KEY_VOLUMEDOWN = 0xAE,
      KEY_VOLUMEUP = 0xB0,
      KEY_WEBHOME = 0xB2,
      KEY_NUMPADCOMMA = 0xB3,
      KEY_DIVIDE = 0xB5,
      KEY_SYSRQ = 0xB7,
      KEY_RMENU = 0xB8,
      KEY_PAUSE = 0xC5,
      KEY_HOME = 0xC7,
      KEY_UP = 0xC8,
      KEY_PRIOR = 0xC9,
      KEY_LEFT = 0xCB,
      KEY_RIGHT = 0xCD,
      KEY_END = 0xCF,
      KEY_DOWN = 0xD0,
      KEY_NEXT = 0xD1,
      KEY_INSERT = 0xD2,
      KEY_DELETE = 0xD3,
      KEY_LWIN = 0xDB,
      KEY_RWIN = 0xDC,
      KEY_APPS = 0xDD,
      KEY_POWER = 0xDE,
      KEY_SLEEP = 0xDF,
      KEY_WAKE = 0xE3,
      KEY_WEBSEARCH = 0xE5,
      KEY_WEBFAVORITES = 0xE6,
      KEY_WEBREFRESH = 0xE7,
      KEY_WEBSTOP = 0xE8,
      KEY_WEBFORWARD = 0xE9,
      KEY_WEBBACK = 0xEA,
      KEY_MYCOMPUTER = 0xEB,
      KEY_MAIL = 0xEC,
      KEY_MEDIASELECT = 0xED,
    }
  
    /**
     * ViewText is a wrapper around Gothic's zCViewText class.
     */
    export class ViewText {
      /**
       * Virtual coordinate x.
       * @throws Will throw if valid is false.
       */
      x: number;
  
      /**
       * Virtual coordinate y.
       * @throws Will throw if valid is false.
       */
      y: number;
  
      /**
       * Text width in virtual size.
       * @throws Will throw if valid is false.
       */
      readonly width: number;
  
      /**
       * Text height in virtual size.
       * @throws Will throw if valid is false.
       */
      readonly height: number;
  
      /**
       * Text
       * @throws Will throw if valid is false.
       */
      text: string;
  
      /**
       * Font
       * Example: "Font_Old_10_White_Hi.TGA"
       * @throws Will throw if valid is false.
       */
      font: string;
  
      /**
       * Color of font
       * Note: Getter returns a copied array. Changes to this array are not
       * reflected in ViewText color.
       * @throws Will throw if valid is false.
       */
      color: [number, number, number, number];
  
      /**
       * Time in floating point ms.
       * After timer the ViewText gets removed from the parent.
       * ViewText is then no longer usable. 
       * @throws Will throw if valid is false.
       */
      timer: number;
  
      /**
       * True if ViewText is a child.
       */
      readonly valid: boolean;
  
      /**
       * Parent View.
       * @throws Will throw if valid is false.
       */
      readonly parent: View;
    }
  
    /**
     * View is a wrapper around Gothic's zCView class.
     */
    export class View {
      /**
       * Max virtual coordinate: 8192
       */
      static readonly vMax: number;
  
      /**
       * Min virtual coordinate: 0
       */
      static readonly vMin: number;
  
      /**
       * Virtual coordinate x.
       * @throws Will throw if valid is false.
       */
      x: number;
  
      /**
       * Virtual coordinate y.
       * @throws Will throw if valid is false.
       */
      y: number;
  
      /**
       * Virtual size width
       * @throws Will throw if valid is false.
       */
      width: number;
  
      /**
       * Virtual size height
       * @throws Will throw if valid is false.
       */
      height: number;
  
      /**
       * Background color
       * Note: Getter returns a copied array. Changes to this array are not
       * reflected in View backgroundColor.
       * @throws Will throw if valid is false.
       */
      backgroundColor: [number, number, number, number];
  
      /**
       * Background texture in tga format.
       * Example: "DLG_CHOICE.TGA"
       * @throws Will throw if valid is false.
       */
      backgroundImage: string;
  
      /**
       * Font texture in tga format.
       * Example: "Font_Old_10_White_Hi.TGA"
       * @throws Will throw if valid is false.
       */
      font: string;
  
      /**
       * Text color
       * Note: Getter returns a copied array. Changes to this array are not
       * reflected in View color.
       * @throws Will throw if valid is false.
       */
      color: [number, number, number, number];
  
      /**
       * Visibility
       * @throws Will throw if valid is false.
       */
      //visible: boolean;
  
      /**
       * Returns a copy of ViewTexts.
       * @throws Will throw if valid is false.
       */
      readonly texts: ViewText[];
  
      /**
       * Returns a copy of Views.
       * @throws Will throw if valid is false.
       */
      readonly childrens: View[];
  
      /**
       * True if View is a child or root.
       */
      readonly valid: boolean;
  
      /**
       * Parent View.
       * Note: Only undefined on root View.
       * @throws Will throw if valid is false.
       */
      readonly parent: View|undefined;
  
      /**
       * True if view is root view. revmp.screen represents the root.
       * @throws Will throw if valid is false.
       */
      readonly isRoot: boolean;
  
      /**
       * Add ViewText.
       * @param options 
       * @throws Will throw if valid is false.
       */
      addText(options?: { text?: string, x?: number, y?: number, font?: string, color?: [number, number, number, number], timer?: number }): ViewText;
  
      /**
       * Remove child if it is a children of this View.
       * ViewText is then no longer usable. 
       * @param viewText 
       * @throws Will throw if valid is false.
       */
      removeText(viewText: ViewText): void;
  
      /**
       * Clears all ViewTexts.
       * They are then no longer usable.
       * @throws Will throw if valid is false.
       */
      clearTexts(): void;
  
      /**
       * Add View.
       * @param options 
       * @throws Will throw if valid is false.
       */
      addChildren(options?: { width?: number, height?: number, x?: number, y?: number, backgroundColor?: [number, number, number, number], backgroundImage?: string, font?: string, color?: [number, number, number, number] }): View;
      
      /**
       * Remove child if it is a children of this View.
       * Child is then no longer usable. 
       * @param child 
       * @throws Will throw if valid is false.
       */
      removeChildren(child: View): void;
  
      /**
       * Removes all childrens.
       * Childrens are then no longer usable.
       * @throws Will throw if valid is false.
       */
      clearChildrens(): void;
  
      /**
       * Font width of the string in virtual size.
       * @param str 
       * @throws Will throw if valid is false.
       */
      fontWidth(str: string): number;
  
      /**
       * Font height in virtual size.
       * @throws Will throw if valid is false.
       */
      fontHeight(): number;
  
      /**
       * Virtual height to pixel height in relation to this views height.
       * @param x 
       * @throws Will throw if valid is false.
       */
      nax(x: number): number;
  
      /**
       * Virtual width to pixel width in relation to this views width.
       * @param x 
       * @throws Will throw if valid is false.
       */
      nay(y: number): number;
  
      /**
       * Pixel height to virtual height in relation to this views height.
       * @param x 
       * @throws Will throw if valid is false.
       */
      anx(x: number): number;
      
      /**
       * Pixel width to virtual width in relation to this views width.
       * @param x 
       * @throws Will throw if valid is false.
       */
      any(y: number): number;
    }
  
    export interface Keyboard {
      /**
       * If false disables Gothic keyboard input handling.
       * The ESC key can still be used.
       * Default is true.
       */
      gameInputEnabled: boolean;
  
      /**
       * True if left ctrl or right ctrl is pressed.
       */
      readonly ctrlKey: boolean;
  
      /**
       * True if left shift, right shift is pressed or caps lock is active.
       */
      readonly shiftKey: boolean;
  
      /**
       * True if left alt or right alt is pressed.
       */
      readonly altKey: boolean;
  
      /**
       * 
       * @param key 
       * @throws Will throw if key is >= 576.
       */
      keyToggled(key: KeyCode): boolean;
  
      /**
       * 
       * @param key 
       * @throws Will throw if key is >= 576.
       */
      keyPressed(key: KeyCode): boolean;
  
      clearKeyBuffer(): void;
    }
  
    // WIP
    export interface Mouse {
      /**
       * If false disables Gothic mouse input handling.
       * Default is true.
       */
      gameInputEnabled: boolean;
  
      /**
       * If true renders mouse cursor tetxure.
       * Defaults to false.
       */
      visible: boolean;
  
      /**
       * Texture for mouse cursor.
       * Defaults to "LO.TGA".
       */
      texture: string;
  
      /**
       * Mouse cursor x position.
       */
      x: number;
  
      /**
       * Mouse cursor y position.
       */
      y: number;
  
      // TODO: wheel
  
      buttonToggled(button: number): boolean;
  
      buttonPressed(button: number): boolean;
    }
  
    ///////////////////////////////////
    // Functions
    ///////////////////////////////////
  
    /**
     * Checks if entity is valid.
     * @param entity
     * @returns True if entity is valid.
     */
    export function valid(entity: Entity): boolean;
  
    /**
     * Adds a message to the chat.
     * @param message
     * @param color Defaults to [255, 255, 255, 255]
     * @throws Will throw if entity is not valid or not a player.
     */
    export function addChatMessage(
      message: string,
      color?: [number, number, number, number?]
    ): void;
  
    export function openInventory(): void;
  
    export function closeInventory(): void;
  
    export function isInventoryOpen(): boolean;
  
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
    export function send(event: string, ...args: unknown[]): void;
  
    /**
     * Receives user defined event from the server.
     * @param event
     * @throws Will throw if event is a revmp built in event.
     */
    export function receive(
      event: string,
      callback: (...args: unknown[]) => void
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
     * Will be called every client tick.
     * @param event
     * @param callback
     * @returns Function to remove listener.
     */
    export function on(event: "update", callback: () => void): () => void;
  
    /**
     * Adds callback to global event listener.
     * Will be called after every Gothic frame.
     * @param event
     * @param callback
     * @returns Function to remove listener.
     */
    export function on(event: "frame", callback: () => void): () => void;
  
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
      event: "chatCommand",
      callback: (command: string) => void
    ): () => void;
  
    /**
     * Adds callback to global event listener.
     * @param event
     * @param callback
     * @returns Function to remove listener.
     */
    export function on(
      event: "chatInput",
      callback: (message: string) => void
    ): () => void;
  
    /**
     * Adds callback to global event listener.
     * @param event
     * @param callback
     * @returns Function to remove listener.
     */
    export function on(
      event: "chatMessage",
      callback: (message: string, color: [number, number, number, number]) => void
    ): () => void;
  
    ///////////////////////////////////
    // Getter and Setter
    ///////////////////////////////////
  
    export interface Position {
      position: Vec3;
    }
  
    export function getPosition(entity: Entity): Position;
  
    export function hasPosition(entity: Entity): boolean;
  
    export interface Rotation {
      rotation: Quat;
    }
  
    export function getRotation(entity: Entity): Rotation;
  
    export function hasRotation(entity: Entity): boolean;
  
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
  
    export function getItemInstance(entity: Entity): ItemInstance;
  
    export function hasItemInstance(entity: Entity): boolean;
  
    export interface Health {
      current: number;
      max: number;
    }
  
    /**
     * Returns health in percentage.
     * @param entity
     */
    export function getHealth(entity: Entity): Health;
  
    export function hasHealth(entity: Entity): boolean;
  
    export interface Mana {
      current: number;
      max: number;
    }
  
    export function getMana(entity: Entity): Mana;
  
    export function hasMana(entity: Entity): boolean;
  
    export interface CombatState {
      weaponMode: WeaponMode;
      unconscious: boolean;
    }
  
    export function getCombatState(entity: Entity): CombatState;
  
    export function hasCombatState(entity: Entity): boolean;
  
    export interface Name {
      name: string;
    }
  
    export function getName(entity: Entity): Name;
  
    export function hasName(entity: Entity): boolean;
  
    export interface Time {
      hour: number;
      minute: number;
    }
  
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
  
    export function getProtection(entity: Entity): Protection;
  
    export function hasProtection(entity: Entity): boolean;
  
    export interface Guild {
      guild: GuildType;
    }
  
    export function getGuild(entity: Entity): Guild;
  
    export function hasGuild(entity: Entity): boolean;
  
    export interface RigidBody {
      staticCollision: boolean;
      dynamicCollision: boolean;
      physics: boolean;
      gravity: boolean;
    }
  
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
  
    export interface Ani {
      name: string;
      //layer: number;
    }
  
    export interface ActiveAni {
      ani: Ani;
      isFadingOut: boolean;
    }
  
    export interface Animations {
      activeAnis: [
        ActiveAni,
        ActiveAni,
        ActiveAni,
        ActiveAni,
        ActiveAni,
        ActiveAni
      ];
      overlays: string[];
    }
  
    export function getAnimations(entity: Entity): Animations;
  
    export function hasAnimations(entity: Entity): boolean;
  
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
  
    export function getScheme(entity: Entity): Scheme;
  
    export function hasScheme(entity: Entity): boolean;
  
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
  
    export function hasMovementController(entity: Entity): boolean;
  
    // Note: An entity can be one or more of the following types.
    /**
     * A character entity may have the following components:
     * Name, Position, Rotation, Scale, Animations, Health, Mana, Attributes,
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
     * A item entity may have the following components:
     * ItemInstance and Countable
     * @param entity
     */
    export function isItem(entity: Entity): boolean;
  
    export function logTrace(...data: any[]): void;
  
    export function logDebug(...data: any[]): void;
  
    export function logInfo(...data: any[]): void;
  
    export function logWarn(...data: any[]): void;
  
    export function logError(...data: any[]): void;
  
    export function logCritical(...data: any[]): void;
  
  
    /**
     * A invalid entity which is not the same as 0.
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
     * Root view
     */
    export const screen: View;
  
    export const keyboard: Keyboard;
  
    export const mouse: Mouse;
  
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
  