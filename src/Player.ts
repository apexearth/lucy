import {EventEmitter} from 'events'

// import midi from './midi'
import Track from './Track'
import Tracker from './Tracker'

/**
 * I play notes! (MIDI)
 */
export default class Player extends EventEmitter {
    public tracker: Tracker = new Tracker()
    public tracks: Track[] = []

    // public output?: object = midi.output('Lucy Output')

    constructor() {
        super()
        this.tracker.on('tick', () => this.tick())
    }

    public start() {
        this.tracker.start()
        this.emit('start')
    }

    public stop() {
        this.tracker.stop()
        this.emit('stop')
    }

    public tick() {
        /** Shine! */
        this.emit('tick')
    }

    public noteon(...args: any[]) {
        this.emit('noteon', ...args)
    }

    public noteoff(...args: any[]) {
        this.emit('noteoff', ...args)
    }

    public createTrack(): Track {
        const track = new Track({tracker: this.tracker})
        this.tracks.push(track)
        return track
    }

    /**
     * Loop from start to end inclusively.
     */
    public loop(start: number, end: number) {
        this.tracker.loop(start, end)
    }
}

if (require.main === module) {
    const player = new Player()
    player.start()
    let quarter = 0
    player.tracker.on('tick', () => {
        if (player.tracker.count(1) !== quarter) {
            quarter = player.tracker.count(1)
            console.log(quarter)
        }
    })
}
