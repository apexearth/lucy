///<reference path="Composer.d.ts"/>
import * as Key from "tonal-key";
import Note from "../core/Note";
import Section from "../core/Section";
import Track from "../core/Track";

export interface IComposeInstruction {
    transpose?: number;
    duration?: number;
}

export class Composer {
    public key: string = 'C Major';
    public note: string;
    public duration: number = 1;
    public section?: Section;
    public velocity: number = 100;

    public index: number = 1;
    public startNote: string;
    public keyNotes: string[];
    public keyIndex: number = 0;
    public keyOctave: number = 3;

    constructor(
        private track: Track,
        options?: {
            key?: string,
            note?: string,
            duration?: number,
            velocity?: number,
        },
    ) {
        if (options) {
            this.key = options.key || this.key;
            this.keyNotes = Key.scale(this.key)
            this.note = options.note || (this.keyNotes[0] + this.keyOctave);
            this.duration = options.duration || this.duration;
            this.velocity = options.velocity || this.velocity;
        } else {
            this.keyNotes = Key.scale(this.key)
            this.note = this.keyNotes[0] + this.keyOctave;
        }
        this.startNote = this.note;
        const startNote = /([A-G][#b]?)/.exec(this.note);
        if (!startNote) {
            throw new Error('Invalid start note received.');
        }
        const startOctave = /[0-9]/.exec(this.note);
        if (!startOctave) {
            throw new Error('Invalid start octave received.');
        }
        this.keyIndex = this.keyNotes.indexOf(startNote[0]);
        this.keyOctave = Number(startOctave[0])
    }

    public moveNote(amount: number) {
        this.keyIndex += amount;
        if (this.keyIndex > 6) {
            this.keyIndex -= 7;
            this.keyOctave++
        } else if (this.keyIndex < 0) {
            this.keyIndex += 7;
            this.keyOctave--
        }
        this.note = this.keyNotes[this.keyIndex] + this.keyOctave
    }

    public clear() {
        this.section = undefined;
        this.note = this.startNote;
    }

    public start() {
        this.next({transpose: 0});
        this.index += this.duration;
        return this;
    }

    public next(instruction: IComposeInstruction) {
        if (!this.section) {
            this.section = this.track.createSection({index: this.index});
        }
        if (instruction.transpose !== undefined) {
            this.moveNote(instruction.transpose);
            this.section.addNote(Note.create({
                note: this.note,
                index: this.index,
                duration: instruction.duration || this.duration,
                velocity: this.velocity,
            }));
        }
        this.index += instruction.duration || this.duration;
        return this;
    }

    public up(distance: number = 1): this {
        return this.next({transpose: distance})
    }

    public down(distance: number = 1): this {
        return this.next({transpose: -distance})
    }

    public array(transpositions: number[]): this {
        for (const transpose of transpositions) {
            this.next({transpose})
        }
        return this
    }
}
