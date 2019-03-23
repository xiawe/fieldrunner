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
        // this.bg = XiaImage.new(game, 'bg')
        // this.bg.y = 300
        // this.bg.w = 400
        // this.bg.h = this.bg.h * 2
        // this.addElement(this.bg)
    }
    setupGun() {
        let game = this.game
        this.gun = XiaImage.new(game, 't1')
        this.gun.x = 500
        this.gun.y = 300
        this.addElement(this.gun)
    }
    addTower(x, y) {
        let x1 = Math.floor(x / 50) * 50
        let y1 = Math.floor(y / 50) * 50
        let game = this.game
        let t1 = Tower.new(game)
        t1.x = x1
        t1.y = y1
        this.addElement(t1)
        this.towers.push(t1)
    }
    setupTower() {
        this.addTower(150, 250)
        this.addTower(150, 150)
    }
    setupFoe() {
        let game = this.game
        // this.foe1 = Foe.new(game, 't4')
        // this.addElement(this.foe1)
        // this.foe2 = Foe.new(game, 't4')
        // this.foe2.x = this.foe1.x - 35
        // this.addElement(this.foe2)
        // this.foes.push(this.foe1, this.foe2)
        for (let i = 0; i < 5; i++) {
            let foe = Foe.new(game, 't4')
            foe.x = foe.x - 35 * i
            this.addElement(foe)
            this.foes.push(foe)
        }
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
                    log('start')
                    // log('gun', this.gun)
                    this.tower = this.gun.clone()
                    this.addElement(this.tower)
                    log()
                }
            } else if (status == 'drag') {
                // log('tower', this.tower, this.tower.x, this.tower.y)
                this.tower.x = x
                this.tower.y = y
            } else if (status == 'mouseup') {
                draging = false 
                this.removeElement(this.tower)
                this.addTower(x, y)
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
