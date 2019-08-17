# HeartBeat Stream
HeartBeat stream will slow down chunks when number of them is below bufferSize.


constructor (inherits from [Duplex](https://nodejs.org/api/stream.html#stream_api_for_stream_implementers)) takes object with following options:
- bufferSize - threshold of items
- delay - each element below will be emitted with every `delay` milliseconds

## Usage
```javascript
const readableStream = /*...*/
const writeStream = /*...*/
const heartBeatStream = new HeartBeatStream({ bufferSize: 1000, delay: 1000 })

readableStream
    .pipe(heartBeatStream)
    .pipe(writeStream)
```

## Build Status
[![Build Status](https://travis-ci.org/krikus/heartbeat-stream.svg?branch=master)](https://travis-ci.org/krikus/heartbeat-stream)