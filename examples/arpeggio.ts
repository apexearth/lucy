import {TonePlayer} from '../'
import Song from "../src/Song";

const song = new Song()
const player = new TonePlayer(song)
for (let i = 0; i < 2; i++) {
    const track = song.createTrack()
    const section = track.createSection({
        index: 1,
    })
    section.composeArpeggio({
        index: 1,
        duration: 4,
        noteTiming: 'sixteenth',
        noteDuration: 'sixteenth',
        noteVelocity: 65,
        chord: 'G7',
        octave: 3,
        count: 6,
        direction: 'up',
    }).composeArpeggio({
        chord: 'F',
        octave: 4,
        count: 4,
        direction: 'downup',
    }).composeArpeggio({
        chord: 'Am',
        count: 3,
        direction: 'down',
    }).composeArpeggio({
        chord: 'Cmaj7',
        octave: 3,
        count: 3,
    })
}
player.loop(1, 16)
player.start()
