import {EComposeTypes} from "./compose";
import TonePlayer, {INote} from './TonePlayer'

describe('TonePlayer', () => {
    it('play notes!', function (done) {
        this.timeout(6000)
        const player = new TonePlayer()
        for (let i = 0; i < 2; i++) {
            const track = player.createTrack()
            for (let k = 0; k < 2; k++) {
                const section = track.createSection({
                    index: 1 + k * 4,
                    duration: 4,
                })
                for (let j = 1; j < 5; j += .125) {
                    section.composeNotes({
                        index: j,
                        duration: .125,
                        type: EComposeTypes.Repeating,
                        startingNote: Math.floor(Math.random() * 24 + 48),
                        noteTiming: 'thirty-second',
                        noteDuration: 'thirty-second',
                        noteVelocity: 65,
                    })
                }
            }
        }
        setTimeout(() => {
            player.start()
        }, 500)
        setTimeout(() => {
            done()
            process.exit(0)
        }, 5000)
    })
})
