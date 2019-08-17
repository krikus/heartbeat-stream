const { Writable } = require('stream')

class TestWriteStream extends Writable {
    constructor() {
        super()
        this.count = 0
    }

    _write(chunk, encode, callback) {
        this.count++
        callback()
    }

    _final(cb) {
        cb()
    }

    getItemsCount() {
        return this.count
    }
}

module.exports = TestWriteStream