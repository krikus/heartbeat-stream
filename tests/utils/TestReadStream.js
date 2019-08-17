const { Readable } = require('stream')

class TestReadStream extends Readable {
    constructor({ delay = 1, items = 100 } = {}) {
        super()
        this._items = items
        this._delay = delay
    }

    _read(size) {
        const item = Math.round(Math.random() * 100) + '\n'
        if (this._items--) {
            setTimeout(() => this.push(item), this._delay)
        } else {
            this.push(null)
        }
    }
}

module.exports = TestReadStream