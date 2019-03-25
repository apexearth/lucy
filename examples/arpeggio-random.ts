import {TonePlayer} from '../'

const player = new TonePlayer()
const track = player.createTrack()
for (let i = 0; i < 16; i++) {
    const high = track.createSection({
        index: 1 + i * 32,
    })
    high.composeSetParameters({
        index: 1,
        duration: 8,
        noteTiming: 'eighth',
        noteDuration: 'eighth',
        noteVelocity: 45,
        direction: 'up',
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
        duration: 8,
        noteTiming: 'eighth',
        noteDuration: 'eighth',
        noteVelocity: 75,
        direction: 'up',
        count: 4,
        octave: 2,
        key: 'C major',
    })

    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
    lower.composeArpeggio()
}

// player.loop(1, 32)
player.start()
