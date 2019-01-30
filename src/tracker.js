const {EventEmitter} = require('events')

class Tracker extends EventEmitter {
    constructor({
        bpm = 120
    } = {}) {
        super()
        this.bpm = bpm
        this.pulse = 0
        this.pulseInterval = null
    }

    start() {
        this.pulseInterval = setInterval(() => this.tick(), this.bpm / 128)
        this.emit('start')
    }

    stop() {
        clearInterval(this.pulseInterval)
        this.emit('stop')
    }

    restart() {
        this.pulse = 0
        this.emit('restart')
    }

    tick() {
        this.pulse++
        this.emit('tick')
    }

    get quarter() {
        return Math.floor(this.pulse / 32)
    }
}

module.exports = Tracker

if (require.main === module) {
    let tracker = new Tracker()
    tracker.start()
    tracker.on('tick', () => {
        console.log(tracker.quarter)
    })
}