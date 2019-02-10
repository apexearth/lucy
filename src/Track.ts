import Section, {ISection} from './Section'
import Tracker from './Tracker'

export interface ITrack {
    tracker: Tracker
    sections?: Section[]
}

export default class Track {
    public sections: Section[] = []
    public tracker: Tracker

    constructor(track: ITrack) {
        this.tracker = track.tracker
        if (track.sections) {
            this.sections = track.sections
        }
    }

    public createSection(params: ISection): Section {
        const section = new Section(params)
        this.sections.push(section)
        return section
    }
}
