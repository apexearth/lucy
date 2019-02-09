import {EventEmitter} from 'events'

/**
 * I track time and beats!
 */
export default class Tracker extends EventEmitter {

    set bpm(val) {
        this._bpm = val // Beats per minute.
        this._bps = val / 60 // Beats per second.
        this._mspb = 1000 / (val / 60) // Milliseconds per beat.
    }

    get bpm(): number {
        return this._bpm
    }

    get bps(): number {
        return this._bps
    }

    get mspb(): number {
        return this._mspb
    }

    public delta: number
    public pulseInterval?: NodeJS.Timeout
    public startTime: number = 0
    public currentTime: number = 0
    private _bpm: number = 0
    private _bps: number = 0
    private _mspb: number = 0

    constructor({
        bpm = 120,
    } = {}) {
        super()
        this.bpm = bpm
        this.delta = 0 // Track the ms from startTime to currentTime.
    }

    public start() {
        this.startTime = Date.now()
        this.pulseInterval = setInterval(() => this.tick(), 1)
        this.emit('start')
    }

    public stop() {
        if (this.pulseInterval) {
            clearInterval(this.pulseInterval)
        }
        this.emit('stop')
    }

    public kill() {
        this.removeAllListeners()
        this.stop()
    }

    public tick() {
        this.currentTime = Date.now()
        this.delta = this.currentTime - this.startTime
        this.emit('tick', this.delta)
    }

    public count(length: number): number {
        return Math.floor(this.delta / this.mspb / length) + 1
    }
}

if (require.main === module) {
    const tracker = new Tracker()
    tracker.start()
    let quarter = 0
    tracker.on('tick', () => {
        if (tracker.count(1) !== quarter) {
            quarter = tracker.count(1)
            console.log(quarter)
        }
    })
}
