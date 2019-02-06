import Note from './Note'

export interface ISection {
    notes?: Note[]
}

export default class Section {
    public notes: Note[] = []

    constructor(section?: ISection) {
        if (section) {
            this.notes = section.notes || []
        }
    }

    public validate() {
        return true
    }
}
