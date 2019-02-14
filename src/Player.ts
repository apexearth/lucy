import {EventEmitter} from 'events'

// import midi from './midi'
import Track from './Track'
import Tracker from './Tracker'

export * from './Note'

/**
 * I play notes! (MIDI)
 */
export default class Player extends EventEmitter {
    public tracker: Tracker = new Tracker()
    public tracks: Track[] = []

    // public output?: object = midi.output('Lucy Output')

    constructor() {
        super()
        this.tracker.on('tick', () => this.update())
    }

    public start() {
        this.tracker.start()
        this.emit('start')
    }

    public stop() {
        this.tracker.stop()
        this.emit('stop')
    }

    public tick(time?: number) {
        this.tracker.tick(time)
        this.emit('tick', time)
    }

    public update() {
        for (const track of this.tracks) {
            track.update(this.tracker)
        }
    }

    public addTrack(track: Track) {
        track.on('note', (note) => this.emit('note', note))
        this.tracks.push(track)
        return track
    }

    public createTrack(): Track {
        const track = new Track()
        return this.addTrack(track)
    }

    /**
     * Loop from start to end inclusively.
     */
    public loop(start: number, end: number) {
        this.tracker.loop(start, end)
    }

    public removeLoop() {
        this.tracker.removeLoop()
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
