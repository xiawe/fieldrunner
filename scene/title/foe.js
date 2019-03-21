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
        this.speed = 5
        this.hp = 3
        this.dead = false
    }
    update() {
        this.x += this.speed
        if (this.x >= this.destination) {
            log('敌人到达')
        }
    }
    beAttack(ap) {
        // ap 攻击力
        this.hp -= ap
        if (this.hp <= 0) {
            this.goDie()
        }
    }
    goDie() {
        this.dead = true
        this.scene.removeElement(this)
    }
}