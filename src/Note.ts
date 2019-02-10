import assert from 'assert'

export interface INote {
    note: number
    duration: number
    velocity: number
}

export interface ILetterNote {
    note: string
    duration: number
    velocity: number
}

export default class Note implements INote {

    public static create(note: ILetterNote): Note {
        return {
            note: this.translateLetterNote(note.note),
            duration: note.duration,
            velocity: note.velocity,
        }
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

    public duration: number = 1;
    public note: number = 64;
    public velocity: number = 100;

    constructor(note: INote) {
        Object.assign(this, note)
    }
}
