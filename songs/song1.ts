import {TonePlayer} from '../'

const player = new TonePlayer()
const track = player.createTrack()
const one = track.createSection({
    index: 1,
})
one.composeSetParameters({
    index: 1,
    duration: 8,
    noteTiming: 'sixteenth',
    noteDuration: 'eighth',
    noteVelocity: 45,
    direction: 'up',
    count: 8,
    octave: 3,
})
const two = track.createSection({
    index: 1,
})
two.composeSetParameters({
    index: 1,
    duration: 8,
    noteTiming: 'sixteenth',
    noteDuration: 'eighth',
    noteVelocity: 45,
    direction: 'updown',
    count: 8,
    octave: 3,
})

one.composeArpeggio({chord: 'F3M'})
two.composeArpeggio({chord: 'F3M', rotate: 4})
one.composeArpeggio({chord: 'D3m'})
two.composeArpeggio({chord: 'D3m', rotate: 4})
one.composeArpeggio({chord: 'C3M'})
two.composeArpeggio({chord: 'C3M', rotate: 4})
one.composeArpeggio({chord: 'E3m'})
two.composeArpeggio({chord: 'E3m', rotate: 4})

const lower = track.createSection({
    index: 1,
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
})
lower.composeArpeggio({chord: 'F5M'})
lower.composeArpeggio({chord: 'D5m'})
lower.composeArpeggio({chord: 'C5M'})
lower.composeArpeggio({chord: 'E5m'})

player.loop(1, 32)
player.start()
