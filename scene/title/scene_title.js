class SceneTitle extends XiaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.foes = []
        this.towers = []
        this.setupInputs()
        this.setupBg()
        this.setupGun()
        this.setupFoe()
        this.setupTower()
    }
    setupBg() {
        let game = this.game
        let label = XiaLabel.new(this.game, 'hello')
        this.addElement(label)
        this.bg = XiaImage.new(game, 'bg')
        this.bg.y = 300
        this.bg.w = 400
        this.bg.h = this.bg.h * 2
        this.addElement(this.bg)
    }
    setupGun() {
        let game = this.game
        this.gun = XiaImage.new(game, 't1')
        this.gun.x = 500
        this.gun.y = 300
        this.addElement(this.gun)
    }
    setupTower() {
        let game = this.game
        let t1 = Tower.new(game)
        t1.x = 300
        t1.y = 250
        this.addElement(t1)
        this.towers.push(t1)
    }
    setupFoe() {
        let game = this.game
        this.foe1 = Foe.new(game, 't2')
        this.addElement(this.foe1)
        this.foe2 = Foe.new(game, 't2')
        this.foe2.x = this.foe1.x - 35
        this.addElement(this.foe2)
        this.foes.push(this.foe1, this.foe2)
    }
    setupInputs() {
        this.game.registerMouse((event, status) => {
            let x = event.offsetX
            let y = event.offsetY
            let draging = false
            if (status == 'mousedown') {
                let hasPoint= this.gun.pointInGoal(x, y)
                if (hasPoint) {
                    draging = true
                    this.tower = this.gun.clone()
                    this.addElement(this.tower)
                }
            } else if (status == 'drag') {
                this.tower.x = x
                this.tower.y = y
            } else if (status == 'mouseup') {
                draging = false 
                this.removeElement(this.tower)
            }
        })
    }
    update() {
        super.update()
        this.skipCount--
        var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 5
            offset = 20
        }
        var game = this.game
        // for (let i = 0; i < 2; i++) {
        //     var l = this.lands[i]
        //     l.x += offset
        //     l.y = 400
        //     this.lands.push(l)
        // }
        for(let t of this.towers) {
            if (t.target == null) {
                t.findTarget(this.foes)
            }
        }
        // log('foes', this.foes)
        // for(let f of this.foes) {
        //     this.foes = this.foes.filter(f => !f.dead)
        // }
    }
    move(s, keyStatus) {
        this.flipX = s < 0
        this.x += s
    }
    jump() {
        this.vy = -10
    }
}
