import Note from "../core/Note";

export class Composer {
    public key: string = 'C Major';
    public note: string = 'C3';
    public speed: number = 1;
    public notes: Note[] = [];
    public velocity: number = 100;

    public index: number = 1;

    public start(note: string) {
        this.note = note;
        this.notes = [
            Note.create({
                note: this.note,
                index: this.index,
                duration: this.speed,
                velocity: this.velocity,
            }),
        ];

    }

    public up(distance: number = 1): this {

        return this
    }

    public down(distance: number = 1): this {

        return this
    }
}
