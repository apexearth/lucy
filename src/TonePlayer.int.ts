import TonePlayer from './TonePlayer'

describe('TonePlayer', () => {
    it('play notes!', function (done) {
        this.timeout(60000)
        const player = new TonePlayer()
        for (let i = 0; i < 2; i++) {
            const track = player.createTrack()
            const section = track.createSection({
                index: 1,
                duration: 8,
            })
            section.composeArpeggio({
                index: 1,
                duration: 2,
                noteTiming: 'eighth',
                noteDuration: 'eighth',
                noteVelocity: 65,
                chord: 'G7',
                octave: 3,
                count: 4,
            }).composeArpeggio({
                chord: 'F',
            }).composeArpeggio({
                chord: 'Am',
            }).composeArpeggio({
                chord: 'Cmaj7',
            })
        }
        player.loop(1, 8)
        setTimeout(() => {
            player.start()
        }, 500)
        setTimeout(() => {
            done()
            process.exit(0)
        }, 50000)
    })
})
