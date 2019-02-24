import {expect} from 'chai'
import * as Compose from './compose'

describe('compose', () => {
    it('composeRepeating', () => {
        expect(Compose.composeRepeating({
            index: 1,
            duration: 1,
            startingNote: 'C3',
            noteTiming: 'Eighth',
            noteDuration: 'Eighth',
            noteVelocity: 65,
        }).map((note) => note.toINote())).to.deep.equal([
            {
                index: 1,
                duration: 0.5,
                note: 48,
                velocity: 65,
            },
            {
                index: 1.5,
                duration: 0.5,
                note: 48,
                velocity: 65,
            },
        ])
    })
})
