import {EventEmitter} from 'events'

export interface ITimeComponent {
    index: number
    duration: number
}

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

    public delta: number = 0
    public beat: number = 0
    public pulseInterval?: NodeJS.Timeout
    public startTime: number = 0
    public currentTime: number = 0
    private _bpm: number = 0
    private _bps: number = 0
    private _mspb: number = 0
    private _loop?: { start: number, end: number, duration: number }

    constructor({
        bpm = 120,
    } = {}) {
        super()
        this.bpm = bpm
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

    public tick(time?: number) {
        this.currentTime = typeof time === 'undefined' ? Date.now() : time
        this.delta = this.currentTime - this.startTime
        if (this._loop) {
            this.delta = this._loop.start * this.mspb - this.mspb
            this.delta += (this.currentTime - this.startTime) % (this._loop.duration * this.mspb)
        }
        this.beat = this.count(1)
        this.emit('tick', this.delta)
    }

    public count(length: number): number {
        return Math.floor(this.delta / this.mspb / length) + 1
    }

    /**
     * Loop from start to end inclusively.
     */
    public loop(start: number, end: number) {
        this._loop = {start, end, duration: (end - start + 1)}
    }

    public removeLoop() {
        this._loop = undefined
    }

    public isNow(component: ITimeComponent, timeOffset: number = 0) {
        return (
            this.delta >= ((component.index - 1 + timeOffset) * this.mspb)
            &&
            this.delta < ((component.index - 1 + timeOffset + component.duration) * this.mspb)
        )
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
