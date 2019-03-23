class Foe extends XiaImage {
    constructor(game, name) {
        name = name || t2
        super(game, name)
        this.setup()
    }
    setup() {
        // this.x = 0
        this.y = 300
        this.destination = 500
        this.speed = 1
        this.maxHp = 15
        this.hp = this.maxHp
        this.dead = false
        this.stepIndex = 0
        this.steps = [
            [0, 300],
            [0, 100],
            [200, 100],
            [200, 300],
            [200, 500],
        ]
    }
    update() {
        if (this.dead) {
            return
        }
        let [dx, dy] = this.steps[this.stepIndex]
        let signX = dx - this.x > 0 ? 1 : -1
        let signY = dy - this.y > 0 ? 1 : -1
        if (dx == this.x) {
            signX = 0
        } else if (dy == this.y) {
            signY = 0
        }
        this.x += this.speed * signX
        this.y += this.speed * signY
        if (this.x == dx && this.y == dy) {
            this.stepIndex++
            if (this.stepIndex >= this.steps.length) {
                this.goDie()
            }
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