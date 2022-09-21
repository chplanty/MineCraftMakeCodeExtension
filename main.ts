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

    //% block="build a $blockType wall of width $width, length $length and height = $height" 
    //% width.defl=3
    //% length.defl=27
    //% height.defl=6
    //% blockType.defl=Block.Cobblestone
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

    //% block="build a $blockType square tower of width $width and height $height"
    //% width.defl=5
    //% height.defl=8
    //% blockType.defl=Block.Cobblestone
    export function buildCastleTower(width: number = 5, height: number = 8, blockType: Block = Block.Cobblestone) {
        // builder.teleportTo(pos(0, 0, 0))
        // builder is at the center of the tower - shift it to a corner
        builder.shift( - Math.floor(width / 2), 0, - Math.floor(width / 2))
        // let posX = Math.sin(3.14159265*2)  // will need this for circular tower's base
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
        drawAlternatingRectangle(width +2, width + 2, blockType)

        // mov builder back to center
        builder.shift(Math.floor(width / 2) + 1, 0 - (height + 3), Math.floor(width / 2) + 1)
        // verify it's ok
        builder.place(GLASS)
    }

    /**
     * Build a simple castle with four towers and four walls.
     */

    //% block="build a simple castle."
    export function buildBasicCastle() {
        for (let index = 0; index <4; index++) {
            buildCastleWall();
            buildCastleTower();
            builder.turn(LEFT_TURN);
        }
    }
}