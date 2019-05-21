import EventEmitter from 'events'
import {Composer} from "../compose/Composer";
import Note, {INote} from "./Note";
import Section, {ISection} from './Section'
import Tracker from './Tracker'

export interface ITrack {
    key: string,
    sections?: Section[]
}

export default class Track extends EventEmitter {
    public key: string;
    public sections: Section[] = []
    public composer: Composer

    constructor(track: ITrack) {
        super()
        this.key = track.key
        this.composer = new Composer(this, {key: this.key})
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

    public addNotes(index: number = 1, notes: Note[]) {
        return this.createSection({index, notes})
    }

    public update(tracker: Tracker) {
        for (const section of this.sections) {
            section.update(tracker)
        }
    }
}
