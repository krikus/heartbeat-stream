const { Duplex, Readable } = require('stream')
const defaultOptions = {
    bufferSize: 0,
    delay: 0,
}

class HeartBeatStream extends Duplex {
    constructor(options = {}) {
        options = {...defaultOptions, ...options}
        super(options)
        this._buf = []
        this._bufferSize = options.bufferSize
        this._delay = options.delay
        this._drainedCallback = () => { this._resumeRead = true }
        this._timeoutHandler = null
    }

    _pushOne() {
        this.push(this._buf.shift())
    }

    _read(size) {
        if (this._buf.length >= this._bufferSize) {
            this._pushOne()
        } else {
            if (this._buf.length) {
                if (this._force) {
                    this._pushOne()
                } else {
                    this._timeoutHandler = setTimeout(() => this._pushOne(), this._delay)
                }
            } else {
                this._drainedCallback()
            }
        }
    }

    _write(chunk, encoding, next) {
        this._buf.push(chunk)
        if(this._resumeRead) {
            this._resumeRead = false
            this._read(0)
        }
        next()
    }

    _final(cb) {
        this._force = true
        this._drainedCallback = () => {
            this.push(null)
            cb()
        }
        if (this._timeoutHandler) {
            clearTimeout(this._timeoutHandler)
            this._resumeRead = true
        }
        if (this._resumeRead) {
            this._read(0)
        }
    }
}

module.exports = HeartBeatStream