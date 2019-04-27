import {EventEmitter} from 'events'

import Song from "./Song";
import Track from './Track'
import Tracker from './Tracker'

export * from './Note'

/**
 * I play notes! (MIDI)
 */
export default class Player extends EventEmitter {
    public tracker: Tracker = new Tracker()

    // public output?: object = midi.output('Lucy Output')

    constructor(
        public song: Song,
    ) {
        super()
        this.song.on('note', (note) => this.emit('note', note))
        this.song.on('noteon', (note) => this.emit('noteon', note))
        this.song.on('noteoff', (note) => this.emit('noteoff', note))

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
        this.song.update(this.tracker);
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
    const song = new Song()
    const player = new Player(song)
    player.start()
    let quarter = 0
    player.tracker.on('tick', () => {
        if (player.tracker.count(1) !== quarter) {
            quarter = player.tracker.count(1)
            console.log(quarter)
        }
    })
}
