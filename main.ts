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
    export function buildCastleWall() {
        let BlocType = COBBLESTONE
        let WallWidth = 3
        let WallLenght = 13
        let WallHeight = 6
        builder.place(CYAN_STAINED_GLASS)
        // builder.teleportTo(pos(0, 0, 0))
        // builder is at the center of the tower - shift it to a corner
        builder.shift(-Math.floor(WallWidth / 2), 0, -Math.floor(WallWidth / 2))
        // build 2 walls from bottom to top (up to WallHeight)
        for (let index4 = 0; index4 < WallHeight - 1; index4++) {
            drawRectangle(WallLenght, WallWidth, BlocType)
            builder.move(UP, 1)
        }
        drawAlternatingRectangle(WallLenght, WallWidth, BlocType)
        // mov builder to center on other wall's end   ( added -1 as hotfix :/ )
        builder.shift(WallLenght - Math.floor(WallWidth / 2) - 1, 1 - WallHeight, Math.floor(WallWidth / 2))
        // verify it's ok
        builder.place(CYAN_WOOL)
    }

    //% block
    export function buildCastleTower() {
        let BlockType = 0
        let TowerSize = 0
        let TowerHeight = 0

        BlockType = COBBLESTONE
        TowerSize = 5
        TowerHeight = 8
        // builder.teleportTo(pos(0, 0, 0))
        // builder is at the center of the tower - shift it to a corner
        builder.shift( - Math.floor(TowerSize / 2), 0, - Math.floor(TowerSize / 2))
        // let posX = Math.sin(3.14159265*2)  // will need this for circular tower's base
        // build 4 walls from bottom to top (up to TowerHeight)
        for (let height2 = 0; height2 <= TowerHeight; height2++) {
            // add 4 walls
            drawRectangle(TowerSize, TowerSize, BlockType);
            builder.move(UP, 1)
        }
        // build the upper part, larger by 1
        // shift in diagonal by 1 block
        builder.shift(-1, 0, -1)
        for (let height22 = 0; height22 <= 2; height22++) {
            // add 4 walls
            drawRectangle(TowerSize + 2, TowerSize + 2, BlockType)
            builder.move(UP, 1)
        }
        // mov builder back to center
        builder.shift(Math.floor(TowerSize / 2) + 1, 0 - (TowerHeight + 4), Math.floor(TowerSize / 2) + 1)
        // verify it's ok
        builder.place(GLASS)
    }
}
