import {TonePlayer} from '../'
import Song from "../src/core/Song";

const song = new Song()
const player = new TonePlayer(song)
const track = song.createTrack()
for (let i = 0; i < 16; i++) {
    const high = track.createSection({
        index: 1 + i * 32,
    })
    high.composeSetParameters({
        index: 1,
        duration: 8,
        noteTiming: 1,
        noteDuration: 1 / 16,
        noteVelocity: 50,
        direction: 'updown',
        count: 8,
        octave: 3,
        key: 'C major',
    })

    high.composeArpeggio()
    high.composeArpeggio()
    high.composeArpeggio()
    high.composeArpeggio()

    const lower = track.createSection({
        index: 1 + i * 32,
    })
    lower.composeSetParameters({
        index: 1,
        duration: 1,
        noteTiming: 1 / 4,
        noteDuration: 1 / 4,
        noteVelocity: 25,
        direction: 'up',
        count: 2,
        octave: 4,
        key: 'C major',
    })

    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
}

// player.loop(1, 32)
player.start()
