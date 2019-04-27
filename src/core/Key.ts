export enum Note {
    AFlat = 'Ab',
    A = 'A',
    ASharp = 'A#',
    BFlat = 'Bb',
    B = 'B',
    BSharp = 'B#',
    CFlat = 'Cb',
    C = 'C',
    CSharp = 'C#',
    DFlat = 'Db',
    D = 'D',
    DSharp = 'D#',
    EFlat = 'Eb',
    E = 'E',
    ESharp = 'E#',
    FFlat = 'Fb',
    F = 'F',
    FSharp = 'F#',
    GFlat = 'Gb',
    G = 'G',
    GSharp = 'G#',
}

export enum Mode {
    'Major' = 'Major',
    'Dorian' = 'Dorian',
    'Phrygian' = 'Phrygian',
    'Lydian' = 'Lydian',
    'Mixolydian' = 'Mixolydian',
    'Minor' = 'Minor',
    'Locrian' = 'Locrian',
}

export class Key {

    // tslint:disable:variable-name
    public static readonly Notes = Note
    public static readonly Modes = Mode
    // tslint:enable:variable-name

    public static create(
        note: Note,
        mode: Mode,
    ) {
        return new Key(note, mode);
    }

    constructor(
        public note: Note,
        public mode: Mode,
    ) {
    }

    public toString(): string {
        return `${this.note} ${this.mode}`
    }
}
