/**
* Foundation blocks
*/
//% weight=60 color=#fcba03 icon="\uf0e3"
namespace Foundation {
    /**
     * Applies a preset flag list, in case you can't be asked to make your own.
     * @param preset The Flag preset.
     */
    //% block
    export function applyFlagPreset(preset: sprites.flagPresets): SpriteFlag[] {
        const builtFlags: SpriteFlag[] = [];
        Foundation.clearArray(builtFlags);

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
    export function clearArray(array: any[]) {
        for (let value of array) {
            array.removeElement(value);
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
    export function buildPlayer(img: Image, kind: number, flags: SpriteFlag[], xSpeed?: number, ySpeed?: number): Sprite {
        const spriteFromBuilder: Sprite = sprites.create(img, kind);
        for (let value of flags) {
            spriteFromBuilder.setFlag(value, true);
        }
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
    export function buildEnemy(img: Image, kind: number, flags: SpriteFlag[], followTarget?: Sprite, followSpeed?: number, turnRate?: number): Sprite {
        const spriteFromBuilder: Sprite = sprites.create(img, kind);
        for (let value of flags) {
            spriteFromBuilder.setFlag(value, true);
        }

        spriteFromBuilder.follow(followTarget, followSpeed, turnRate);
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