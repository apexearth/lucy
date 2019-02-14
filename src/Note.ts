import assert from 'assert'
import {EventEmitter} from "events"
import Tracker, {ITimeComponent} from "./Tracker"

export interface INote {
    note: number
    velocity: number
    index: number
    duration: number
}

export interface ILetterNote {
    note: string | number
    velocity: number
    index: number
    duration: number
}

export default class Note extends EventEmitter implements INote, ITimeComponent {

    public static create(note: ILetterNote): Note {
        return new Note({
            note: this.translateLetterNote(note.note),
            velocity: note.velocity,
            index: note.index,
            duration: note.duration,
        })
    }

    public static translateTiming(timing: string | number): number {
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

    public static translateLetterNote(letterNote: string | number): number {
        if (typeof letterNote === 'number') {
            return letterNote
        }
        assert(/[A-Z]/.test(letterNote[0]))
        const letter = letterNote.charCodeAt(0) - 65
        let octave: number = parseInt(letterNote[letterNote.length - 1], 10)
        if (letter === 0 || letter === 1) {
            octave += 1
        }
        const base = 10 + octave * 12
        let mod = 0
        if (letterNote[1] === '#') {
            mod = 1
        } else if (letterNote[1] === 'b') {
            mod = -1
        }
        return base + letter + mod
    }

    public note: number = 64
    public velocity: number = 100
    public index: number
    public duration: number = 1
    public active: boolean = false

    constructor(note: INote) {
        super()
        this.note = note.note
        this.velocity = note.velocity
        this.index = note.index
        this.duration = note.duration
    }

    public update(tracker: Tracker, timeOffset: number) {
        if (tracker.isNow(this, timeOffset)) {
            if (!this.active) {
                this.emit('note', this.toINote(timeOffset))
                this.emit('noteon', this.toINote(timeOffset))
                this.active = true
            }
        } else {
            if (this.active) {
                this.emit('noteoff', this.toINote(timeOffset))
                this.active = false
            }
        }
    }

    public toINote(timeOffset: number = 0): INote {
        return {
            note: this.note,
            velocity: this.velocity,
            index: this.index + timeOffset,
            duration: this.duration,
        };
    }
}
