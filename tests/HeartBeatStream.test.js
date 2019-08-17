const HeartBeatStream = require('../src')
const { TestReadStream, TestWriteStream } = require('./utils')
const { Readable, Writable } = require('stream')

describe("HeartBeat Stream", () => {
    it('should implement readable and writable', () => {
        const heartBeatStream = new HeartBeatStream()
        expect(heartBeatStream).toBeInstanceOf(Readable)
        expect(heartBeatStream).toBeInstanceOf(Writable)
    })

    it('should pass all elements autoflushing before delay', function(done) {
        const items = 20
        const readStream = new TestReadStream({ items, delay: 0 })
        const writeStream = new TestWriteStream()
        const heartBeatStream = new HeartBeatStream({ bufferSize: 10, delay: 100000 })

        writeStream.on('finish', () => {
            expect(items).toBe(writeStream.getItemsCount())
            done()
        })

        readStream
            .pipe(heartBeatStream)
            .pipe(writeStream)

    }, 5000)

    it('should finish even with too big buffer', function(done) {
        const items = 1
        const readStream = new TestReadStream({ items, delay: 0 })
        const writeStream = new TestWriteStream()
        const heartBeatStream = new HeartBeatStream({ bufferSize: 220, delay: 100000 })

        writeStream.on('finish', () => {
            expect(items).toBe(writeStream.getItemsCount())
            done()
        })

        readStream
            .pipe(heartBeatStream)
            .pipe(writeStream)

    }, 5000)
})