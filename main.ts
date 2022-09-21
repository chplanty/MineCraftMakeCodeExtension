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

    //% block
    export function buildCastleWall(width: number = 3, length: number = 13, height: number = 6) {
        let BlocType = COBBLESTONE
        builder.place(CYAN_STAINED_GLASS)
        // builder.teleportTo(pos(0, 0, 0))
        // builder is at the center of the tower - shift it to a corner
        builder.shift(-Math.floor(width / 2), 0, -Math.floor(width / 2))
        // build 2 walls from bottom to top (up to WallHeight)
        for (let index4 = 0; index4 < height - 1; index4++) {
            drawRectangle(length, width, BlocType)
            builder.move(UP, 1)
        }
        drawAlternatingRectangle(length, width, BlocType)
        // mov builder to center on other wall's end   ( added -1 as hotfix :/ )
        builder.shift(length - Math.floor(width / 2) - 1, 1 - height, Math.floor(width / 2))
        // verify it's ok
        builder.place(CYAN_WOOL)
    }

    //% block
    export function buildCastleTower(width: number = 5, height: number = 8) {
        let BlockType = 0

        BlockType = COBBLESTONE
        width = 5
        height = 8
        // builder.teleportTo(pos(0, 0, 0))
        // builder is at the center of the tower - shift it to a corner
        builder.shift( - Math.floor(width / 2), 0, - Math.floor(width / 2))
        // let posX = Math.sin(3.14159265*2)  // will need this for circular tower's base
        // build 4 walls from bottom to top (up to TowerHeight)
        for (let height2 = 0; height2 <= height; height2++) {
            // add 4 walls
            drawRectangle(width, width, BlockType);
            builder.move(UP, 1)
        }
        // build the upper part, larger by 1
        // shift in diagonal by 1 block
        builder.shift(-1, 0, -1)
        for (let height22 = 0; height22 <= 2; height22++) {
            // add 4 walls
            drawRectangle(width + 2, width + 2, BlockType)
            builder.move(UP, 1)
        }
        // mov builder back to center
        builder.shift(Math.floor(width / 2) + 1, 0 - (height + 4), Math.floor(width / 2) + 1)
        // verify it's ok
        builder.place(GLASS)
    }
}
