// https://stackoverflow.com/a/9614122/10637905
function angle(x1: number, y1: number, x2: number, y2: number): number {
    const dy = y2 - y1;
    const dx = x2 - x1;
    let theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    if (theta < 0) {
        theta = 360 + theta; // range [0, 360)
    }
    // Avoid minus range
    if (theta < 90) {
        theta += 360;
    }
    return theta - 90; // Idk why Gothic needs -90
}

function isSimilarAniPlaying(
    entity: revmp.Entity,
    ani: string
): boolean {
    return (
        revmp
            .getAnimations(entity)
            .activeAnis.find((a) => a.ani.name.includes(ani)) !== undefined
    );
}

function calculateTotalDamage(
    meleeAttack: revmp.MeleeAttack,
    protection: revmp.Protection
): number {
    const edgeDamage = Math.max(0, meleeAttack.edge - protection.edge);
    const bluntDamage = Math.max(0, meleeAttack.blunt - protection.blunt);
    const pointDamage = Math.max(0, meleeAttack.point - protection.point);
    const fireDamage = Math.max(0, meleeAttack.fire - protection.fire);
    const flyDamage = Math.max(0, meleeAttack.fly - protection.fly);
    const magicDamage = Math.max(0, meleeAttack.magic - protection.magic);
    const fallDamage = Math.max(0, meleeAttack.fall - protection.fall);
    return (
        edgeDamage +
        bluntDamage +
        pointDamage +
        fireDamage +
        flyDamage +
        magicDamage +
        fallDamage
    );
}

function getDrawnWeaponDamage(
    entity: revmp.Entity,
    target: revmp.Entity
): number {
    const protection = revmp.getProtection(target);
    const attributes = revmp.getAttributes(entity);
    const weaponMode = revmp.getCombatState(entity).weaponMode;
    switch (weaponMode) {
        case revmp.WeaponMode.Fist: {
            // TODO: monster damage formular
            const strength = attributes.strength;
            const meleeAttack = revmp.getMeleeAttack(entity);
            return strength + meleeAttack.blunt - protection.blunt;
        }
        case revmp.WeaponMode.OneHand: {
            const weapon = revmp.getEquipment(entity).meleeWeapon;
            const meleeAttack = revmp.getMeleeAttack(weapon);

            const strength = attributes.strength;
            const totalDamage = calculateTotalDamage(meleeAttack, protection);
            const random = Math.floor(Math.random() * 100);
            if (random < attributes.oneHanded) {
                return strength + totalDamage;
            } else {
                return Math.floor((strength + totalDamage - 1) / 10);
            }
        }
        case revmp.WeaponMode.TwoHand: {
            const weapon = revmp.getEquipment(entity).meleeWeapon;
            const meleeAttack = revmp.getMeleeAttack(weapon);

            const strength = attributes.strength;
            const totalDamage = calculateTotalDamage(meleeAttack, protection);
            const random = Math.floor(Math.random() * 100);
            if (random < attributes.twoHanded) {
                return strength + totalDamage;
            } else {
                return Math.floor((strength + totalDamage - 1) / 10);
            }
        }
        case revmp.WeaponMode.Bow:
        case revmp.WeaponMode.Crossbow: {
            const weapon = revmp.getEquipment(entity).rangedWeapon;
            const meleeAttack = revmp.getMeleeAttack(weapon);

            const dexterity = revmp.getAttributes(entity).dexterity;
            const totalDamage = calculateTotalDamage(meleeAttack, protection);
            return dexterity + totalDamage;
        }
        default:
            throw new Error("Unkown weapon mode");
    }
}

function isMeleeAttack(attacker: revmp.Entity) {
    const weaponMode = revmp.getCombatState(attacker).weaponMode;
    return (
        weaponMode === revmp.WeaponMode.Fist ||
        weaponMode === revmp.WeaponMode.OneHand ||
        weaponMode === revmp.WeaponMode.TwoHand ||
        weaponMode === revmp.WeaponMode.Dagger
    );
}

function isRangedAttack(attacker: revmp.Entity) {
    const weaponMode = revmp.getCombatState(attacker).weaponMode;
    return (
        weaponMode === revmp.WeaponMode.Bow ||
        weaponMode === revmp.WeaponMode.Crossbow ||
        weaponMode === revmp.WeaponMode.Magic
    );
}

function isHuman(entity: revmp.Entity) {
    return revmp.getGuild(entity).guild <= revmp.GuildType.SeperatorHum;
}

function canParadeAttack(
    attacker: revmp.Entity,
    target: revmp.Entity
): boolean {
    // TODO: check if damage typ is fly, which is unblockable
    if (!revmp.hasAnimations(target) || isRangedAttack(attacker)) {
        return false;
    }

    if (!isSimilarAniPlaying(target, "PARADE")) {
        return false;
    }

    const targetPos = revmp.getPosition(target).position;
    const attackerPos = revmp.getPosition(attacker).position;
    if (angle(targetPos[0], targetPos[2], attackerPos[0], attackerPos[2]) > 90) {
        return false;
    }

    const isTargetJumping = isSimilarAniPlaying(target, "JUMP");
    if (
        isHuman(target) &&
        !isHuman(attacker) &&
        revmp.getCombatState(attacker).weaponMode === revmp.WeaponMode.Fist &&
        !isTargetJumping
    ) {
        return false;
    }

    const weaponMode = revmp.getCombatState(attacker).weaponMode;
    if (
        isTargetJumping &&
        weaponMode != revmp.WeaponMode.OneHand &&
        weaponMode != revmp.WeaponMode.TwoHand
    ) {
        return false;
    }

    return true;
}

const unconsciousEntities: Map<
    revmp.Entity,
    ReturnType<typeof setTimeout>
> = new Map();

function damageCalculation(attacker: revmp.Entity, target: revmp.Entity) {
    const damage = getDrawnWeaponDamage(attacker, target);
    const damageDealt = Math.max(5, damage);
    const currentHealth = Math.max(
        0,
        revmp.getHealth(target).current - damageDealt
    );

    const targetPos = revmp.getPosition(target).position;
    const attackerPos = revmp.getPosition(attacker).position;
    const a = angle(targetPos[0], targetPos[2], attackerPos[0], attackerPos[2]);
    /*if (
        (currentHealth === 0 || currentHealth === 1) &&
        isHuman(attacker) &&
        isHuman(target)
        // TODO: check weapon lethality
    ) {
        dropUnconscious(target, a);
        return;
    } else*/ 
    if (currentHealth === 0) {
        dropDead(target, a);
        return;
    }

    if (revmp.isPlayer(target)) {
        if (a <= 90) {
            revmp.startAnimation(target, "T_STUMBLEB");
        } else {
            revmp.startAnimation(target, "T_STUMBLE");
        }
    }

    revmp.setHealth(target, { current: currentHealth });
}



revmp.on("attacked", (attacker, target, userEvent) => {
    if (userEvent) {
        // TODO: anti cheat, check if attacker is attacking too often
        // TODO: check rotation.
        // TODO: check focus
        if (isMeleeAttack(attacker)) {
            // TODO: check melee range.
        } else {
            // TODO: check ranged range.
        }
    }

    if (canParadeAttack(attacker, target)) {
        if (revmp.isPlayer(target)) {
            // TODO: anti cheat, check if target is blocking too often
        }
        // TODO: parade effect & parade sound
        return;
    }

    // TODO: hit effect & sound
    damageCalculation(attacker, target);
});

function stunAttackDamageCalculation(attacker: revmp.Entity, target: revmp.Entity) {
    const damage = getDrawnWeaponDamage(attacker, target);
    const damageDealt = Math.max(5, damage);
    const currentHealth = Math.max(
        0,
        revmp.getHealth(target).current - damageDealt
    );

    const targetPos = revmp.getPosition(target).position;
    const attackerPos = revmp.getPosition(attacker).position;
    const a = angle(targetPos[0], targetPos[2], attackerPos[0], attackerPos[2]);
    /*if (
        (currentHealth === 0 || currentHealth === 1) &&
        isHuman(attacker) &&
        isHuman(target)
        // TODO: check weapon lethality
    ) {
        dropUnconscious(target, a);
        return;
    } else*/ 
    if (currentHealth === 0) {
        dropDead(target, a);
        return;
    }

    if (revmp.isPlayer(target)) {
        if(!isAnimationPlaying(target, "S_FALLB")){
            revmp.startAnimation(target, "S_FALLB")
        }
    }

    revmp.setHealth(target, { current: currentHealth });
}
revmp.on("stunAttack", (attacker, target) => {
    if (typeof attacker === 'number' && typeof target === 'number') {
        // TODO: anti cheat, check if attacker is attacking too often
        // TODO: check rotation.
        // TODO: check focus
        if (isMeleeAttack(attacker)) {
            // TODO: check melee range.
        } else {
            // TODO: check ranged range.
        }

        if (canParadeAttack(attacker, target)) {
            if (revmp.isPlayer(target)) {
                // TODO: anti cheat, check if target is blocking too often
            }
            // TODO: parade effect & parade sound
            return;
        }

        // TODO: hit effect & sound
        stunAttackDamageCalculation(attacker, target);
    }
});

export function dropUnconscious(entity: revmp.Entity, angle?: number): void {
    revmp.setCombatState(entity, {
        weaponMode: revmp.WeaponMode.None,
        unconscious: true,
    });
    revmp.setHealth(entity, { current: 1 });

    let ani = "WOUNDED";
    if (angle ?? 0 <= 90) {
        ani = "WOUNDEDB";
    }
    revmp.startAnimation(entity, "T_STAND_2_" + ani);
    // TODO: call gothic function dropUnconscious?

    // TODO: look into this
    if (revmp.isPlayer(entity)) {
        //revmp.removeMovementController(entity);
    }

    const isUncoscious = unconsciousEntities.get(entity);
    if (isUncoscious !== undefined) {
        clearTimeout(isUncoscious);
        unconsciousEntities.delete(entity);
    }

    unconsciousEntities.set(
        entity,
        setTimeout(() => {
            unconsciousEntities.delete(entity);
            if (revmp.valid(entity)) {
                revmp.setCombatState(entity, { unconscious: false });
                revmp.startAnimation(entity, "T_" + ani + "_2_STAND");
                if (revmp.isPlayer(entity)) {
                    //revmp.addMovementController(entity);
                }

                // TODO: play voice line NEXTTIMEYOUREINFORIT or OHMYHEAD
            }
        }, 20000) // TODO: Use ticks instead?
    );
}

export function dropDead(entity: revmp.Entity, angle?: number): void {
    revmp.setCombatState(entity, {
        weaponMode: revmp.WeaponMode.None,
        unconscious: false,
    });
    revmp.setHealth(entity, { current: 0 });

    if (angle ?? 0 <= 90) {
        revmp.startAnimation(entity, "T_DEADB");
    } else {
        revmp.startAnimation(entity, "T_DEAD");
    }
    // TODO: call gothic function doDie?

    // TODO: look into this
    if (revmp.isPlayer(entity)) {
        //revmp.removeMovementController(entity);
    }
}

export function revive(entity: revmp.Entity): void {
    //revmp.stopAnimation(entity, "VISEME"); // TODO: stop face ani
    revmp.setHealth(entity, { current: revmp.getHealth(entity).max });
    revmp.startAnimation(entity, "S_RUN"); // TODO: standup from dead ani
    revmp.setCombatState(entity, { unconscious: false });

    if (revmp.isPlayer(entity)) {
        //revmp.addMovementController(entity);
    }
}

function isAnimationPlaying(entity: revmp.Entity, ani: string) {
    return revmp
        .getAnimations(entity)
        .activeAnis.find((a) => a.ani.name.includes(ani) && !a.isFadingOut) !== undefined
}