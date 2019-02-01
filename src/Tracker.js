const {EventEmitter} = require('events')

/**
 * I track time and beats!
 */
class Tracker extends EventEmitter {
    constructor({
        bpm = 120
    } = {}) {
        super()
        this.bpm = bpm // Beats per minute.
        this.bps = bpm / 60 // Beats per second.
        this.mspb = 1000 / (bpm / 60) // Milliseconds per beat.
        this.delta = 0 // Track the ms from startTime to currentTime.
        this.pulseInterval = null
    }

    start() {
        this.startTime = Date.now()
        this.pulseInterval = setInterval(() => this.tick(), 1)
        this.emit('start')
    }

    stop() {
        clearInterval(this.pulseInterval)
        this.emit('stop')
    }

    kill() {
        this.removeAllListeners()
        this.stop()
    }

    tick() {
        this.currentTime = Date.now()
        this.delta = this.currentTime - this.startTime
        this.emit('tick', this.delta)
    }

    get [.5]() {
        return Math.floor(this.delta / this.mspb / 8) + 1
    }

    get [1]() {
        return Math.floor(this.delta / this.mspb / 4) + 1
    }

    get [2]() {
        return Math.floor(this.delta / this.mspb / 2) + 1
    }

    get [4]() {
        return Math.floor(this.delta / this.mspb) + 1
    }

    get [8]() {
        return Math.floor(this.delta / this.mspb * 2) + 1
    }

    get [16]() {
        return Math.floor(this.delta / this.mspb * 4) + 1
    }

    get [32]() {
        return Math.floor(this.delta / this.mspb * 8) + 1
    }

    get [64]() {
        return Math.floor(this.delta / this.mspb * 16) + 1
    }

    get [128]() {
        return Math.floor(this.delta / this.mspb * 32) + 1
    }
}

module.exports = Tracker

if (require.main === module) {
    let tracker = new Tracker()
    tracker.start()
    let quarter = 0
    tracker.on('tick', () => {
        if(tracker[4] !== quarter) {
            quarter = tracker[4]
            console.log(quarter)
        }
    })
}