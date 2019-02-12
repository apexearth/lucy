import {expect} from 'chai'
import Player, {INote} from './Player'

describe('Player', () => {
    it('usage basics', () => {
        const player = new Player()
        const track = player.createTrack()
        const section = track.createSection({
            timeIndex: 0,
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
        expect(section.notes.map((note) => note.toJSON())).to.deep.equal([
            {note: 48, timeIndex: 1, duration: .5, velocity: 65},
            {note: 48, timeIndex: 2, duration: .5, velocity: 65},
            {note: 48, timeIndex: 3, duration: .5, velocity: 65},
            {note: 48, timeIndex: 4, duration: .5, velocity: 65},
        ])

        const notesPlayed: INote[] = []
        player.on('note', (note: INote) => {
            notesPlayed.push(note)
        })
        player.loop(1, 4)
        player.tracker.startTime = 0
        player.tick(0)
        expect(notesPlayed).to.deep.equal([])
        // TODO: Test for note output!
    })
})
