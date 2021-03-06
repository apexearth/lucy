import assert from 'assert'
import {EventEmitter} from "events"
import Tracker, {ITimeDuration} from "./Tracker"

import * as Tonal from 'tonal'

export interface IMidiNote {
    midi: number
    velocity: number
    index: number
    duration: number
}

export interface INote {
    note: string
    velocity: number
    index: number
    duration: number
}

export default class Note extends EventEmitter implements INote, ITimeDuration {

    public static from(opts: any, note: string): string {
        return Tonal.Note.from(opts, note) as string
    }

    public static midi(note: string | number): number | null {
        return Tonal.midi(note)
    }

    public static letterValue(letter: string): number | null {
        if (!letter) {
            return null
        }
        let code = letter[0].charCodeAt(0)
        if (code < 67) {
            code += 7
        }
        return code - 66
    }

    public static time(timing: string | number): number {
        if (typeof timing === 'number') {
            return timing
        }
        timing = timing.toLowerCase()
        switch (timing) {
            case "whole":
            case "bar":
                return 4
            case "half":
                return 2
            case"quarter":
                return 1
            case "eighth":
                return .5
            case "sixteenth":
                return .25
            case "thirty-second":
                return .125
            case "sixty-fourth":
                return .0625
            default:
                throw new Error(`Invalid timing: ${timing}`)
        }
    }

    public static create(params: INote): Note {
        return new Note(params)
    }

    public note: string = 'C3'
    public velocity: number = 100
    public index: number
    public duration: number = 1
    public active: boolean = false

    constructor(params: INote) {
        super()
        assert(params.note !== null, 'note required')
        assert(params.velocity !== null, 'velocity required')
        assert(params.index !== null, 'index required')
        assert(params.duration !== null, 'duration required')
        this.note = params.note
        this.velocity = params.velocity
        this.index = params.index
        this.duration = params.duration
    }

    public update(tracker: Tracker, timeOffset: number) {
        if (tracker.isNow(this, timeOffset)) {
            if (!this.active) {
                this.emit('note', this.toMidi(timeOffset))
                this.emit('noteon', this.toMidi(timeOffset))
                this.active = true
            }
        } else {
            if (this.active) {
                this.emit('noteoff', this.toMidi(timeOffset))
                this.active = false
            }
        }
    }

    public toMidi(timeOffset: number = 0): IMidiNote {
        return {
            midi: Note.midi(this.note) as number,
            velocity: this.velocity,
            index: this.index + timeOffset,
            duration: this.duration,
        }
    }
}
