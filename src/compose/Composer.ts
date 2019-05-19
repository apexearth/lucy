///<reference path="Composer.d.ts"/>
import * as Key from "tonal-key";
import Note from "../core/Note";

export class Composer {
    public key: string = 'C Major';
    public note: string = 'C3';
    public speed: number = 1;
    public notes: Note[] = [];
    public velocity: number = 100;

    public index: number = 1;
    public startNote: string;
    public keyNotes: string[];
    public keyIndex: number = 0;
    public keyOctave: number = 3;

    constructor(options?: {
        key?: string,
        note?: string,
        speed?: number,
        velocity?: number,
    }) {
        if (options) {
            this.key = options.key || this.key;
            this.note = options.note || this.note;
            this.speed = options.speed || this.speed;
            this.velocity = options.velocity || this.velocity;
        }
        this.startNote = this.note;
        this.keyNotes = Key.scale(this.key)
        const startNote = /([A-G][#b]?)/.exec(this.note);
        if (!startNote) {
            throw new Error('Invalid start note received.');
        }
        const startOctave = /[0-9]/.exec(this.note);
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
        this.note = this.startNote;
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

    public next(direction: number | null) {
        if (direction !== null) {
            this.moveNote(direction);
            this.notes.push(Note.create({
                note: this.note,
                index: this.index,
                duration: this.speed,
                velocity: this.velocity,
            }));
        }
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
