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

    public static translateLetterNote(letterNote: string): number {
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
