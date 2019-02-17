import EventEmitter from 'events'
import Section, {ISection} from './Section'
import Tracker from './Tracker'

export interface ITrack {
    sections?: Section[]
}

export default class Track extends EventEmitter {
    public sections: Section[] = []

    constructor(track: ITrack = {}) {
        super()
        if (track.sections) {
            this.sections = track.sections
        }
    }

    public addSection(section: Section): Section {
        section.on('note', (note) => this.emit('note', note))
        section.on('noteon', (note) => this.emit('noteon', note))
        section.on('noteoff', (note) => this.emit('noteoff', note))
        this.sections.push(section)
        return section
    }

    public createSection(params: ISection): Section {
        const section = new Section(params)
        return this.addSection(section)
    }

    public update(tracker: Tracker) {
        for (const section of this.sections) {
            section.update(tracker)
        }
    }
}
