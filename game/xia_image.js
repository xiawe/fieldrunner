class XiaImage extends XiaScene {
    constructor(game, name) {
        super(game, name)
        this.name = name
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }
    static new(...args) {
        var i = new this(...args)
        return i
    }
    pointInGoal(x, y) {
        let xIn = x > this.x && x <= this.x + this.w
        let yIn = y > this.y && y <= this.y + this.h
        return xIn && yIn
    }
    draw() {
        this.game.drawImg(this)
    }
    clone() {
        var c = XiaImage.new(this.game, this.name)
        // log('clone c', c)
        return c
    }
    center() {
        let x = this.x + this.w / 2
        let y = this.y + this.h / 2
        return XiaVector.new(x, y)
    }
}