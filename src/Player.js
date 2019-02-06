const {EventEmitter} = require('events')

const Tracker = require('./Tracker')
const midi = require('./midi')

/**
 * I play notes! (MIDI)
 */
class Player extends EventEmitter {
    constructor(...args) {
        super(...args)
        this.tracker = new Tracker()
        this.output = midi.output('Lucy Output')
        this.tracker.on('tick', () => this.tick())
    }

    start() {
        this.tracker.start()
        this.emit('start')
    }

    stop() {
        this.tracker.stop()
        this.emit('stop')
    }

    tick() {
        /** Shine! */
        this.emit('tick')
    }

    noteon(...args) {
        this.emit('noteon', ...args)
    }

    noteoff(...args) {
        this.emit('noteoff', ...args)
    }
}

module.exports = Player

if (require.main === module) {
    let player = new Player()
    player.start()
    let quarter = 0
    player.tracker.on('tick', () => {
        if (player.tracker[4] !== quarter) {
            quarter = player.tracker[4]
            console.log(quarter)
        }
    })
}