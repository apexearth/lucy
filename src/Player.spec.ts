import {expect} from 'chai'
import Player from './Player'

describe('Player', () => {
    it('usage basics', () => {
        const player = new Player()
        const track = player.createTrack()
        const section = track.createSection()
        section.composeNotes({
            startingNote: 'C3',
            timing: 'Quarter',
            length: 'Eighth',
        })
    })
})
