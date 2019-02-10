import {expect} from 'chai'
import Player from './Player'

describe('Player', () => {
    it('usage basics', () => {
        const player = new Player()
        const track = player.createTrack()
        const section = track.createSection({
            duration: 4,
        })
        section.composeNotes({
            duration: 4,
            startingNote: 'C3',
            noteTiming: 'Quarter',
            noteDuration: 'Eighth',
            noteVelocity: 65,
            repeat: true,
        })
        expect(section.notes).to.deep.equal([
            {note: 48, timeIndex: 1, duration: .5, velocity: 65},
            {note: 48, timeIndex: 2, duration: .5, velocity: 65},
            {note: 48, timeIndex: 3, duration: .5, velocity: 65},
            {note: 48, timeIndex: 4, duration: .5, velocity: 65},
        ])
    })
})
