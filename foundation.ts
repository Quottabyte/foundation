/**
* Foundation blocks
*/
//% groups='["Builders", "Util"]'
//% weight=60 color=#fcba03 icon="\uf0e3"
namespace Foundation {
    /**
     * Applies a preset flag list, in case you can't be asked to make your own.
     * @param preset The Flag preset.
     */
    //% block
    //% group="Util"
    export function applyFlagPreset(preset: sprites.flagPresets): SpriteFlag[] {
        const builtFlags: SpriteFlag[] = [];
        clearArray(builtFlags);
        
        if (preset == sprites.flagPresets.DEFAULT) {
            builtFlags.push(SpriteFlag.StayInScreen);
        }

        if (preset == sprites.flagPresets.COLLISIONLESS) {
            builtFlags.push(SpriteFlag.Ghost);
            builtFlags.push(SpriteFlag.GhostThroughSprites);
            builtFlags.push(SpriteFlag.GhostThroughWalls);
        }

        if (preset == sprites.flagPresets.CLEARONWALL) {
            builtFlags.push(SpriteFlag.DestroyOnWall);
            builtFlags.push(SpriteFlag.AutoDestroy);
        }

        return builtFlags;
    }

    /**
     * Clears an array of every element it contains.
     * @param array The array to clear.
     */
    //% block
    //% group="Util"
    export function clearArray(array: any[]) {
        for (let value of array) {
            array.removeElement(value);
        }
    }

    /**
     * Applies every flag in a SpriteFlag array to a Sprite.
     * @param array The array of SpriteFlags to apply.
     * @param sprite The Sprite to apply the flags to.
     */
    //% block
    //% group="Util"
    export function applyFlagsToSprite(array: SpriteFlag[], sprite: Sprite) {
        if (array != null) {
            for (let value of array) {
                sprite.setFlag(value, true);
            }
        }
    }

    /**
     * Builds a Player from the given fields.
     * @param img The Sprite image.
     * @param kind The SpriteKind.
     * @param flags The SpriteFlags to apply to the player.
     * @param xSpeed The Sprite's X-Speed.
     * @param ySpeed The Sprite's Y-Speed.
     */
    //% block
    //% group="Builders"
    export function buildPlayer(img: Image, kind: number, flags: SpriteFlag[], xSpeed?: number, ySpeed?: number): Sprite {
        const spriteFromBuilder: Sprite = sprites.create(img, kind);
        applyFlagsToSprite(flags, spriteFromBuilder);
        forever(function movementController() {
            controller.moveSprite(spriteFromBuilder, xSpeed, ySpeed);
        });
        return spriteFromBuilder;
    }

    /**
     * Builds an Enemy sprite from the given fields.
     * @param img The Sprite image.
     * @param kind The SpriteKind.
     * @param flags The SpriteFlags to apply to the player.
     * @param followTarget The target the Sprite follows.
     * @param followSpeed The Sprite's speed while following the target.
     * @param turnRate The rate of turning while following the target.
     */
    //% block
    //% group="Builders"
    export function buildEnemy(img: Image, kind: number, flags: SpriteFlag[], followTarget?: Sprite, followSpeed?: number, turnRate?: number): Sprite {
        const spriteFromBuilder: Sprite = sprites.create(img, kind);
        applyFlagsToSprite(flags, spriteFromBuilder);

        spriteFromBuilder.follow(followTarget, followSpeed, turnRate);
        return spriteFromBuilder;
    }

    /**
     * Builds a regular Sprite from the given fields.
     * @param img The Sprite image.
     * @param kind The SpriteKind.
     * @param flags The SpriteFlags to apply to the player.
     */
    //% block
    //% group="Builders"
    export function buildCommonSprite(img: Image, kind: number, flags: SpriteFlag[]): Sprite {
        const spriteFromBuilder: Sprite = sprites.create(img, kind);
        applyFlagsToSprite(flags, spriteFromBuilder);
        return spriteFromBuilder;
    }

    sprites.onCreated(SpriteKind.Placeholder, function placeHoldersAreIntangible(sprite: Sprite) {
        sprite.setFlag(SpriteFlag.Ghost, true);
        sprite.setFlag(SpriteFlag.GhostThroughSprites, true);
        sprite.setFlag(SpriteFlag.GhostThroughTiles, true);
        sprite.setFlag(SpriteFlag.GhostThroughWalls, true);
    });
}

namespace sprites {
    export enum flagPresets {
        DEFAULT,
        COLLISIONLESS,
        CLEARONWALL
    }
}

namespace SpriteKind {
    export let Particle = SpriteKind.create();
    export let MenuElement = SpriteKind.create();
    export let Placeholder = SpriteKind.create();
}