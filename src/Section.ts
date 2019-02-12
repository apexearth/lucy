import {EventEmitter} from "events";
import compose, {ICompositionParameters} from './compose'
import Note from './Note'
import Tracker, {ITimeComponent} from "./Tracker";

export interface ISection {
    notes?: Note[]
    timeIndex: number
    duration: number
}

export default class Section extends EventEmitter implements ISection, ITimeComponent {
    public notes: Note[] = []
    public timeIndex: number = 0
    public duration: number = 4

    constructor(section?: ISection) {
        super();
        if (section) {
            if (section.notes) {
                for (const note of section.notes) {
                    this.addNote(note)
                }
            }
            this.timeIndex = section.timeIndex
            this.duration = section.duration
        }
    }

    public validate() {
        return true
    }

    public addNote(note: Note) {
        note.on('note', (n) => this.emit('note', n))
        this.notes.push(note)
    }

    public composeNotes(params: ICompositionParameters) {
        const notes = compose(params)
        for (const note of notes) {
            this.addNote(note)
        }
    }

    public update(tracker: Tracker) {
        if (!tracker.isNow(this)) {
            return
        }
        for (const note of this.notes) {
            note.update(tracker)
        }
    }
}
