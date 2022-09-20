player.onChat("\"castle\"", function () {
    for (let index = 0; index < 4; index++) {
        builder.tracePath(COBBLESTONE)
        builder.mark()
        builder.move(FORWARD, 10)
        builder.tracePath(COBBLESTONE)
        builder.turn(LEFT_TURN)
    }
})
