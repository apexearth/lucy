import {EventEmitter} from 'events'

import Track from './Track'
import Tracker from "./Tracker";

export * from './Note'

/**
 * I play notes! (MIDI)
 */
export default class Song extends EventEmitter {
    public tracks: Track[] = []

    public key: string = 'C Major';

    constructor() {
        super()
    }

    public tick(time?: number) {
        this.emit('tick', time)
    }

    public update(tracker: Tracker) {
        for (const track of this.tracks) {
            track.update(tracker)
        }
    }

    public addTrack(track: Track) {
        track.on('note', (note) => this.emit('note', note))
        track.on('noteon', (note) => this.emit('noteon', note))
        track.on('noteoff', (note) => this.emit('noteoff', note))
        this.tracks.push(track)
        return track
    }

    public createTrack(): Track {
        const track = new Track({key: this.key})
        return this.addTrack(track)
    }
}
