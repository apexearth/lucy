import compose, {ICompositionParameters} from './compose'
import Note from './Note'
import Tracker from "./Tracker";

export interface ISection {
    notes?: Note[]
    duration: number
}

export default class Section {
    public notes: Note[] = []
    public duration: number = 4

    constructor(section?: ISection) {
        if (section) {
            this.notes = section.notes || []
            this.duration = section.duration
        }
    }

    public validate() {
        return true
    }

    public composeNotes(params: ICompositionParameters) {
        const notes = compose(params)
        this.notes = [...this.notes, ...notes]
    }

    public update(tracker: Tracker) {
        for (const note of this.notes) {
            note.update(tracker)
        }
    }
}
