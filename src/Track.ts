import Section, {ISection} from './Section'
import Tracker from './Tracker'

export interface ITrack {
    sections?: Section[]
}

export default class Track {
    public sections: Section[] = []

    constructor(track: ITrack = {}) {
        if (track.sections) {
            this.sections = track.sections
        }
    }

    public createSection(params: ISection): Section {
        const section = new Section(params)
        this.sections.push(section)
        return section
    }

    public update(tracker: Tracker) {
        for (const section of this.sections) {
            section.update(tracker)
        }
    }
}
