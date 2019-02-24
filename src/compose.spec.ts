import {expect} from 'chai'
import * as Compose from './compose'
import Note, {INote} from "./Note"

const testEquals = (actual: Note[], expected: INote[]) => {
    expect(actual.map((note) => note.toINote())).to.deep.equal(expected)
}

describe('compose', () => {
    it('composeRepeating', () => {
        testEquals(
            Compose.composeRepeating({
                index: 1,
                duration: 2,
                startingNote: 'C3',
                noteTiming: 'Eighth',
                noteDuration: 'Eighth',
                noteVelocity: 65,
            }),
            [
                {index: 1, duration: 0.5, note: 48, velocity: 65},
                {index: 1.5, duration: 0.5, note: 48, velocity: 65},
                {index: 2, duration: 0.5, note: 48, velocity: 65},
                {index: 2.5, duration: 0.5, note: 48, velocity: 65},
            ],
        )
    })
    it('composeArpeggio', () => {
        testEquals(
            Compose.composeArpeggio({
                index: 1,
                duration: 2,
                noteTiming: 'Eighth',
                noteDuration: 'Eighth',
                noteVelocity: 65,
                chord: 'CMaj7',
                startingNote: 'C3',
            }),
            [
                {index: 1, duration: 0.5, note: 48, velocity: 65},
                {index: 1.5, duration: 0.5, note: 48, velocity: 65},
                {index: 2, duration: 0.5, note: 48, velocity: 65},
                {index: 2.5, duration: 0.5, note: 48, velocity: 65},
            ],
        )
    })
})
