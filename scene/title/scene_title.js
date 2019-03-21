class SceneTitle extends XiaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setup() {
        var game = this.game
        var label = XiaLabel.new(this.game, 'hello')
        this.addElement(label)
        this.bg = XiaImage.new(game, 'bg')
        this.bg.y = 300
        this.bg.w = 400
        this.bg.h = this.bg.h * 2
        this.addElement(this.bg)
        // this.addElement(this.pipe)
        this.land = XiaImage.new(game, 'land')
        // this.addElement(this.land)
        this.lands = []
        this.skipCount = 5
        for (let i = 0; i < 2; i++) {
            var l = XiaImage.new(game, 'land')
            l.x = l.w * i
            l.y = 400
            this.addElement(l)
            this.lands.push(l)
        }
        // this.mario = XiaNesSprite.new(game)
        // this.mario.x = 100
        // this.mario.y = 306
        // this.addElement(this.mario)
        this.gun = XiaImage.new(game, 't1')
        this.gun.x = 500
        this.gun.y = 300
        this.addElement(this.gun)
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
    }
    move(s, keyStatus) {
        this.flipX = s < 0
        this.x += s
    }
    jump() {
        this.vy = -10
    }
}
