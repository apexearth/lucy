import assert from 'assert'
import {EventEmitter} from "events";
import * as Compose from './compose'
import {IComposeArpeggio, IComposeRepeating} from "./compose";
import Note from './Note'
import Tracker, {ITimeComponent} from "./Tracker";

export interface ISection extends ITimeComponent {
    notes?: Note[]
    index: number
    duration: number
}

export default class Section extends EventEmitter implements ISection, ITimeComponent {
    public notes: Note[] = []
    public index: number = 1
    public duration: number = 4
    public active: boolean = false

    private _previousParameters?: Compose.ICompose

    constructor(section?: ISection) {
        super();
        if (section) {
            if (section.notes) {
                for (const note of section.notes) {
                    this.addNote(note)
                }
            }
            this.index = section.index
            this.duration = section.duration
        }
        this.validate()
    }

    public absorbPreviousParameters(params: Compose.ICompose) {
        let modifiedParams: Compose.ICompose
        if (this._previousParameters) {
            modifiedParams = Object.assign({}, this._previousParameters, params) as Compose.ICompose
            if (params.index === undefined) {
                modifiedParams.index = (
                    this._previousParameters.index + this._previousParameters.duration
                )
            }
        } else {
            modifiedParams = params
        }
        return modifiedParams
    }

    public composeRepeating(params: IComposeRepeating | any) {
        params = this.absorbPreviousParameters(params)
        const notes = Compose.composeRepeating(params)
        for (const note of notes) {
            this.addNote(note)
        }
        this._previousParameters = params
        return this
    }

    public composeArpeggio(params: IComposeArpeggio | any) {
        params = this.absorbPreviousParameters(params)
        const notes = Compose.composeArpeggio(params)
        for (const note of notes) {
            this.addNote(note)
        }
        this._previousParameters = params
        return this
    }

    public validate() {
        assert(this.index >= 1, 'Indexes must be gte 1.')
        return true
    }

    public addNote(note: Note) {
        note.on('note', (n) => this.emit('note', n))
        note.on('noteon', (n) => this.emit('noteon', n))
        note.on('noteoff', (n) => this.emit('noteoff', n))
        this.notes.push(note)
    }

    public update(tracker: Tracker) {
        if (!tracker.isNow(this)) {
            if (this.active) {
                for (const note of this.notes) {
                    note.update(tracker, this.index - 1)
                }
                this.active = false
            }
            return
        }
        this.active = true
        for (const note of this.notes) {
            note.update(tracker, this.index - 1)
        }
    }
}
