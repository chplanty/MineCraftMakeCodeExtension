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
    //% block
    export function buildCastleWall() {
        let BlocType = 0
        let WallWidth = 0
        let WallLenght = 0
        let WallHeight = 0
        let alternate = false
        let putBlock = false
        let TowerSize = 0
        let TowerHeight = 0

        BlocType = COBBLESTONE
        WallWidth = 3
        WallLenght = 13
        WallHeight = 6
        builder.place(CYAN_STAINED_GLASS)
        // builder.teleportTo(pos(0, 0, 0))
        // builder is at the center of the tower - shift it to a corner
        builder.shift((0 - WallWidth) / 2 + 1, 0, (0 - WallWidth) / 2 + 1)
        // build 2 walls from bottom to top (up to WallHeight)
        for (let posY = 0; posY <= WallHeight - 1; posY++) {
            alternate = false
            // add 2 walls
            // builder.mark()
            for (let index = 0; index < 2; index++) {
                putBlock = true
                if (posY == WallHeight - 1) {
                    alternate = true
                }
                // add a wall
                for (let index = 0; index < WallLenght - 1; index++) {
                    if (putBlock) {
                        builder.place(BlocType)
                    }
                    if (alternate) {
                        putBlock = !(putBlock)
                    }
                    builder.move(FORWARD, 1)
                }
                // builder.tracePath(BlocType)
                builder.turn(LEFT_TURN)
                for (let index = 0; index < WallWidth - 1; index++) {
                    if (putBlock) {
                        builder.place(BlocType)
                    }
                    if (alternate) {
                        putBlock = !(putBlock)
                    }
                    builder.move(FORWARD, 1)
                }
                // builder.tracePath(BlocType)
                builder.turn(LEFT_TURN)
            }
            builder.move(UP, 1)
        }
        // mov builder to center on other wall's end   ( added -1 as hotfix :/ )
        builder.shift(WallLenght - 1 - WallWidth / 2, 0 - WallHeight, WallWidth / 2 - 1)
        // verify it's ok
        builder.place(CYAN_WOOL)
    }

    //% block
    export function buildCastleTower() {
        let BlocType = 0
        let WallWidth = 0
        let WallLenght = 0
        let WallHeight = 0
        let alternate = false
        let putBlock = false
        let TowerSize = 0
        let TowerHeight = 0

        BlocType = COBBLESTONE
        TowerSize = 5
        TowerHeight = 8
        // builder.teleportTo(pos(0, 0, 0))
        // builder is at the center of the tower - shift it to a corner
        builder.shift((0 - TowerSize) / 2 + 1, 0, (0 - TowerSize) / 2 + 1)
        // let posX = Math.sin(3.14159265*2)  // will need this for circular tower's base
        // build 4 walls from bottom to top (up to TowerHeight)
        for (let height2 = 0; height2 <= TowerHeight; height2++) {
            // add 4 walls
            for (let index = 0; index < 4; index++) {
                // builder.mark()
                // add a wall
                for (let index = 0; index < TowerSize - 1; index++) {
                    builder.place(BlocType)
                    builder.move(FORWARD, 1)
                }
                // builder.tracePath(BlocType)
                builder.turn(LEFT_TURN)
            }
            builder.move(UP, 1)
        }
        // build the upper part, larger by 1
        // shift in diagonal by 1 block
        builder.shift(-1, 0, -1)
        for (let height22 = 0; height22 <= 2; height22++) {
            // add 4 walls
            for (let index = 0; index < 4; index++) {
                // builder.mark()
                // add a wall
                for (let index42 = 0; index42 <= TowerSize; index42++) {
                    if (height22 == 2 && index42 % 2 == 1) {

                    } else {
                        builder.place(BlocType)
                    }
                    builder.move(FORWARD, 1)
                }
                // builder.tracePath(BlocType)
                builder.turn(LEFT_TURN)
            }
            builder.move(UP, 1)
        }
        // mov builder back to center
        builder.shift(TowerSize / 2, 0 - (TowerHeight + 4), TowerSize / 2)
        // verify it's ok
        builder.place(GLASS)
    }

}