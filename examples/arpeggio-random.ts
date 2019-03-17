import {TonePlayer} from '../'

const player = new TonePlayer()
const track = player.createTrack()
const section = track.createSection({
    index: 1,
})
section.composeSetParameters({
    index: 1,
    duration: 8,
    noteTiming: 'sixteenth',
    noteDuration: 'sixteenth',
    noteVelocity: 65,
    direction: 'up',
    count: 6,
    octave: 3,
    key: 'A minor',
})

section.composeArpeggio()

section.composeArpeggio()
section.composeArpeggio()
section.composeArpeggio()

player.loop(1, 32)
player.start()
