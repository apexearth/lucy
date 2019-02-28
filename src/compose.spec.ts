import {expect} from 'chai'
import * as Compose from './compose'
import Note, {IMidiNote} from "./Note"

const testEquals = (actual: Note[], expected: IMidiNote[]) => {
    expect(actual.map((note) => note.toMidi())).to.deep.equal(expected)
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
                {index: 1, duration: 0.5, midi: 48, velocity: 65},
                {index: 1.5, duration: 0.5, midi: 48, velocity: 65},
                {index: 2, duration: 0.5, midi: 48, velocity: 65},
                {index: 2.5, duration: 0.5, midi: 48, velocity: 65},
            ],
        )
    })
    it('composeArpeggio', () => {
        testEquals(
            Compose.composeArpeggio({
                index: 1,
                duration: 4,
                noteTiming: 'Eighth',
                noteDuration: 'Eighth',
                noteVelocity: 65,
                chord: 'CMaj7',
                octave: 3,
                count: 4,
            }),
            [
                {index: 1, duration: 0.5, midi: 48, velocity: 65},
                {index: 1.5, duration: 0.5, midi: 52, velocity: 65},
                {index: 2, duration: 0.5, midi: 55, velocity: 65},
                {index: 2.5, duration: 0.5, midi: 59, velocity: 65},
                {index: 3, duration: 0.5, midi: 48, velocity: 65},
                {index: 3.5, duration: 0.5, midi: 52, velocity: 65},
                {index: 4, duration: 0.5, midi: 55, velocity: 65},
                {index: 4.5, duration: 0.5, midi: 59, velocity: 65},
            ],
        )
        expect(() => {
            Compose.composeArpeggio({
                index: 1,
                duration: 4,
                noteTiming: 'Eighth',
                noteDuration: 'Eighth',
                noteVelocity: 65,
                chord: 'Marshmallow',
                octave: 3,
                count: 4,
            })
        }).to.throw('Chord not found.')
    })
})
