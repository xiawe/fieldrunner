class Tower extends XiaImage {
    constructor(game, name) {
        name = name || 't1'
        super(game, name)
        this.setup()
    }
    setup() {
        this.attack = 1
        this.target = null
        this.range = 100
        this._cooldown = 8
        this.attackCount = this._cooldown
    }
    update() {
        if (this.canAttack(this.target)) {
            this.updateAngle(this.target)
            log('attack foe!')
            this.fire(this.target)
            if (this.target.dead) {
                this.target = null
                // this.angle = 0
            }
        }
    }
    updateAngle(foe) {
        let dx = foe.x + foe.w / 2 - (this.x + this.w / 2)
        let dy = foe.y + foe.h / 2 - (this.y + this.h / 2)
        this.angle = - angleByVector(dx, dy)
        // log('tower angle', angleByVector(dx, dy), this.angle)
    }
    fire(foe) {
        if (this.attackCount!= 0) {
            this.attackCount--
            return false
        } else {
            this.attackCount = this._cooldown
        }
        foe.hp -= this.attack
        if (foe.hp <= 0) {
            foe.goDie()
        }
    }
    draw() {
        super.draw()
        let ctx = this.game.context
        let {x, y} = this.center()
        ctx.beginPath()
        ctx.arc(x, y, this.range, 0 , 2 * Math.PI)
        ctx.stroke()
    }
    canAttack(f) {
        let enemyExist = f != null && !f.dead
        if (!enemyExist) {
            this.angle = 0
            this.target = null
            return false
        }
        let enemyInRange = this.center().distance(f.center()) <= this.range
        return enemyInRange
    }
    findTarget(foes) {
        for(let f of foes) {
            if (this.canAttack(f)) {
                this.target = f 
                log('can attack')
            }
        }
    }
}