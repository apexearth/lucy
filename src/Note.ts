export interface INote {
    channel: number
    duration: number
    note: number
    velocity: number
}

export default class Note implements INote {
    public channel: number = 1;
    public duration: number = 100;
    public note: number = 64;
    public velocity: number = 100;

    constructor(note: INote) {
        Object.assign(this, note)
    }
}
