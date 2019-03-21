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
    }
    update() {
        if (this.canAttack(this.target)) {
            log('attack foe!')
            this.target.beAttack(this.attack)
            if (this.target.dead) {
                this.target = null
            }
        }
    }
    canAttack(f) {
        let enemyExist = f != null && !f.dead
        if (!enemyExist) {
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