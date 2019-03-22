class Foe extends XiaImage {
    constructor(game, name) {
        name = name || t2
        super(game, name)
        this.setup()
    }
    setup() {
        this.x = 0
        this.y = 200
        this.destination = 500
        this.speed = 1
        this.maxHp = 15
        this.hp = this.maxHp
        this.dead = false
    }
    update() {
        this.x += this.speed
        if (this.x >= this.destination) {
            log('敌人到达')
        }
    }
    drawLifebar() {
        let context = this.game.context
        let w = 31
        this.game.context.fillStyle  = 'red'
        context.fillRect(this.x, this.y - 10, 31, 5)
        let i = (this.hp / this.maxHp) * w
        this.game.context.fillStyle  = 'green'
        context.fillRect(this.x, this.y - 10, i, 5)
    }
    draw() {
        super.draw()
        this.drawLifebar()
    }
    goDie() {
        this.dead = true
        this.scene.removeElement(this)
    }
}