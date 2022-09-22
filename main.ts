/**
* Fun with castles!
* Build your castle walls and towers.
* Functions are mapped to blocks using various macros
* in comments starting with %. The most important macro
* is "block", and it specifies that a block should be
* generated for an **exported** function.
*/

//% color="#AA278D" weight=100
namespace castles {
    function drawRectangle(length: number, width: number, blockType: number) {
        for (let index = 0; index < 2; index++) {
            builder.mark()
            builder.move(FORWARD, length - 1)
            builder.tracePath(blockType)
            builder.turn(LEFT_TURN)
            builder.mark()
            builder.move(FORWARD, width - 1)
            builder.tracePath(blockType)
            builder.turn(LEFT_TURN)
        }
    }

    function drawAlternatingRectangle(length: number, width: number, blockType: number) {
        function drawAlternatingLine(l: number, placeAtStart: boolean) {
            let putBlock = placeAtStart;
            for (let index2 = 0; index2 < l - 1; index2++) {
                builder.move(FORWARD, 1)
                if (putBlock) {
                    builder.place(blockType)
                }
                putBlock = !(putBlock)
            }
            return putBlock
        }

        builder.place(blockType)
        for (let index3 = 0; index3 < 2; index3++) {
            let putBlock2 = drawAlternatingLine(length, false)
            builder.turn(LEFT_TURN)
            drawAlternatingLine(width, putBlock2)
            builder.turn(LEFT_TURN)
        }
    }

    /**
     * Build a wall
     */

    //% block="build castle wall || made of $blockType width $width length $length height $height" 
    //% width.defl=3
    //% length.defl=27
    //% height.defl=6
    //% blockType.defl=Block.Cobblestone
    //% expandableArgumentMode="toggle"
    //% blockType.fieldEditor="gridpicker"
    //% blockType.fieldOptions.width=340 block.fieldOptions.columns=8 block.fieldOptions.tooltips=true
    //% blockType.fieldOptions.tooltipsXOffset="20" block.fieldOptions.tooltipsYOffset="-20"
    //% blockType.fieldOptions.columns="8"
    //% blockType.fieldOptions.maxRows="8"
    //% blockType.fieldOptions.hasSearchBar=true
    //% blockType.fieldOptions.hideRect=true
    export function buildCastleWall(width: number = 3, length: number = 27, height: number = 6, blockType: Block = Block.Cobblestone) {
        builder.place(CYAN_STAINED_GLASS)
        builder.shift(-Math.floor(width / 2), 0, -Math.floor(width / 2))
        // build 2 walls from bottom to top (up to WallHeight)
        for (let index4 = 0; index4 < height - 1; index4++) {
            drawRectangle(length, width, blockType)
            builder.move(UP, 1)
        }
        drawAlternatingRectangle(length, width, blockType)
        // mov builder to center on other wall's end   ( added -1 as hotfix :/ )
        builder.shift(length - Math.floor(width / 2) - 1, 1 - height, Math.floor(width / 2))
        // verify it's ok
        builder.place(CYAN_WOOL)
    }

    /**
     * Build a square tower
     */

    //% block="build castle tower || shape square made of $blockType width $width height $height"
    //% width.defl=5
    //% height.defl=8
    //% blockType.defl=Block.Cobblestone
    //% expandableArgumentMode="toggle"
    //% blockType.fieldEditor="gridpicker"
    //% blockType.fieldOptions.width=340 block.fieldOptions.columns=8 block.fieldOptions.tooltips=true
    //% blockType.fieldOptions.tooltipsXOffset="20" block.fieldOptions.tooltipsYOffset="-20"
    //% blockType.fieldOptions.columns="8"
    //% blockType.fieldOptions.maxRows="8"
    //% blockType.fieldOptions.hasSearchBar=true
    //% blockType.fieldOptions.hideRect=true
    export function buildCastleTower(width: number = 5, height: number = 8, blockType: Block = Block.Cobblestone) {
        // builder is at the center of the tower - shift it to a corner
        builder.shift(- Math.floor(width / 2), 0, - Math.floor(width / 2))
        // build 4 walls from bottom to top (up to TowerHeight)
        for (let index = 0; index <= height; index++) {
            // add 4 walls
            drawRectangle(width, width, blockType);
            builder.move(UP, 1)
        }
        // build the upper part, larger by 1
        // shift in diagonal by 1 block
        builder.shift(-1, 0, -1)
        for (let builderHeight = 0; builderHeight < 2; builderHeight++) {
            // add 4 walls
            drawRectangle(width + 2, width + 2, blockType)
            builder.move(UP, 1)
        }

        // put crenelation on the last level
        drawAlternatingRectangle(width + 2, width + 2, blockType)

        // mov builder back to center
        builder.shift(Math.floor(width / 2) + 1, 0 - (height + 3), Math.floor(width / 2) + 1)
    }

    /**
     * Build a simple castle with four towers and four walls around the player
     */

    //% block="build a simple castle."
    export function buildBasicCastle() {
        let originalPlayerPosition = player.position()
        // move builder back to player position to allow repeat usage
        builder.teleportTo(originalPlayerPosition)
        // start off facing left of the player
        builder.face(getDirectionLeftOfPlayer())
        // shift away from player
        builder.shift(-13, 0, -13)

        for (let index = 0; index < 4; index++) {
            buildCastleTower(5, 8)
            buildCastleWall(3, 27, 6)
            builder.turn(LEFT_TURN)
        }
    }

    /**
     * Build a castle in the sky.
     */

    //% block="Build a castle in the sky."
    export function buildCastleInTheSky() {
        let originalPlayerPosition = player.position()
        builder.teleportTo(originalPlayerPosition)
        builder.face(getDirectionLeftOfPlayer())
        builder.turn(RIGHT_TURN)

        builder.shift(24, 20, 0)
        shapes.circle(Block.Wool, builder.position(), 23, Axis.Y, ShapeOperation.Replace)
        builder.shift(-13, 1, -13)

        for (let index7 = 0; index7 < 4; index7++) {
            buildCastleTower()
            buildCastleWall()
            builder.turn(LEFT_TURN)
        }
    }

    /**
     * Grow a bean stalk to reach a castle in the sky.
     */

    //% block="Grow a bean stalk to reach a castle in the sky."
    export function growBeanStalk() {
        blocks.fill(
            GREEN_WOOL,
            player.position(),
            pos(0, 20, 0),
            FillOperation.Replace
        )
        blocks.fill(
            LADDER,
            player.position(),
            positions.add(
                player.position(),
                pos(0, 40, 0)
            ),
            FillOperation.Keep
        )
    }

    function getDirectionLeftOfPlayer(): CompassDirection {
        let playerOrientation = player.getOrientation(); // between -180 && 180
        if (playerOrientation >= -45 && playerOrientation < 45) {
            return CompassDirection.East
        }

        if (playerOrientation >= 45 && playerOrientation < 135) {
            return CompassDirection.South
        }

        if (playerOrientation >= -135 && playerOrientation < -45) {
            return CompassDirection.West
        }

        return CompassDirection.North
    }
}