class XiaVector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    static new(...args) {
        return new this(...args)
    }
    distance(vector) {
        let v = vector
        let dx = this.x - v.x
        let dy = this.y - v.y
        return Math.sqrt(dx * dx + dy * dy)
    }
}