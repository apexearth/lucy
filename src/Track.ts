import Section, {ISection} from './Section'
import Tracker from './Tracker'

export interface ITrack extends ISection {
    tracker: Tracker
    sections?: Section[]
}

export default class Track extends Section {
    public sections: Section[] = []
    public tracker: Tracker

    constructor(track: ITrack) {
        super(track)
        this.tracker = track.tracker
    }
}
