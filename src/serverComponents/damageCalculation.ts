
function calculateTotalDamage(meleeAttack: revmp.MeleeAttack, protection: revmp.Protection): number {
    const edgeDamage = Math.max(0, meleeAttack.edge - protection.edge);
    const bluntDamage = Math.max(0, meleeAttack.blunt - protection.blunt);
    const pointDamage = Math.max(0, meleeAttack.point - protection.point);
    const fireDamage = Math.max(0, meleeAttack.fire - protection.fire);
    const flyDamage = Math.max(0, meleeAttack.fly - protection.fly);
    const magicDamage = Math.max(0, meleeAttack.magic - protection.magic);
    const fallDamage = Math.max(0, meleeAttack.fall - protection.fall);
    return edgeDamage + bluntDamage + pointDamage + fireDamage + flyDamage + magicDamage + fallDamage;
}

function getDrawnWeaponDamage(entity: revmp.Entity, target: revmp.Entity): number {
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
    return weaponMode === revmp.WeaponMode.Fist
        || weaponMode === revmp.WeaponMode.OneHand
        || weaponMode === revmp.WeaponMode.TwoHand
        || weaponMode === revmp.WeaponMode.Dagger;
}

function isRangedAttack(attacker: revmp.Entity) {
    const weaponMode = revmp.getCombatState(attacker).weaponMode;
    return weaponMode === revmp.WeaponMode.Bow
        || weaponMode === revmp.WeaponMode.Crossbow
        || weaponMode === revmp.WeaponMode.Magic;
}

function canParadeAttack(attacker: revmp.Entity, target: revmp.Entity): boolean {
    // TODO: check if is in parade angle

    if ((revmp.getGuild(attacker).guild !== revmp.GuildType.Human
        && revmp.getCombatState(attacker).weaponMode === revmp.WeaponMode.Fist)
        || isRangedAttack(attacker)) {
            return false;
    }

    if (revmp.hasAnimations(target)) {
        const animations = revmp.getAnimations(target);
        for (const activeAni of animations.activeAnis) {
            if (activeAni.ani.name.includes("PARADE")) {
                return true;
            }
        }
    }
    return false;
}

revmp.on("attacked", (attacker, target, userEvent) => {
    if (userEvent) {
        // TODO: anti cheat, check if attacker is attacking too often
        // TODO: check rotation.
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
        return;
    }

    const damage = getDrawnWeaponDamage(attacker, target);
    const health = revmp.getHealth(target);
    console.log("current: health" + health.current)
    const damageDealt = Math.max(5, damage);
    const newHealth = Math.max(0, health.current - damageDealt);
    console.log("after asignment: " + newHealth)


    if ((newHealth == 0 || newHealth == 1)
        && revmp.getGuild(attacker).guild === revmp.GuildType.Human
        && revmp.getGuild(target).guild === revmp.GuildType.Human) {
            health.current = 1;
            revmp.setCombatState(target, { unconscious: true });
    }
    revmp.startAnimation(target,"T_STUMBLEB");
    revmp.setHealth(target, {current: newHealth, max: health.max});
});
