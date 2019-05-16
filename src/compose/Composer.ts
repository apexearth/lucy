///<reference path="Composer.d.ts"/>
import * as Key from "tonal-key";
import Note from "../core/Note";

export class Composer {
    public index: number = 1;
    public keyNotes: string[];
    public keyIndex: number = 0;
    public keyOctave: number = 3;

    constructor(
        public key: string = 'C Major',
        public note: string = 'C3',
        public speed: number = 1,
        public notes: Note[] = [],
        public velocity: number = 100,
    ) {
        this.keyNotes = Key.scale(key)
        const startNote = /([A-G][#b]?)/.exec(note);
        if (!startNote) {
            throw new Error('Invalid start note received.');
        }
        const startOctave = /[0-9]/.exec(note);
        if (!startOctave) {
            throw new Error('Invalid start octave received.');
        }
        this.keyIndex = this.keyNotes.indexOf(startNote[0])
        this.keyOctave = Number(startOctave[0])
    }

    public moveNote(amount: number) {
        this.keyIndex += amount;
        if (this.keyIndex > 6) {
            this.keyIndex -= 7
            this.keyOctave++
        } else if (this.keyIndex < 0) {
            this.keyIndex += 7
            this.keyOctave--
        }
        this.note = this.keyNotes[this.keyIndex] + this.keyOctave
    }

    public clear() {
        this.notes = []
    }

    public start() {
        this.notes = [
            Note.create({
                note: this.note,
                index: this.index,
                duration: this.speed,
                velocity: this.velocity,
            }),
        ];
        this.index += this.speed;
        return this;
    }

    public next(direction: number) {
        this.moveNote(direction);
        this.notes.push(Note.create({
            note: this.note,
            index: this.index,
            duration: this.speed,
            velocity: this.velocity,
        }));
        this.index += this.speed;
        return this;
    }

    public up(distance: number = 1): this {
        return this.next(distance)
    }

    public down(distance: number = 1): this {
        return this.next(-distance)
    }

    public array(directions: number[]): this {
        for (const dir of directions) {
            this.next(dir)
        }
        return this
    }
}
