import {expect} from 'chai'
import * as Compose from './compose'
import Note, {IMidiNote} from "../Note"

const testEquals = (actual: Note[], expected: IMidiNote[]) => {
    const result = actual.map((note) => note.toMidi())
    console.log(JSON.stringify(result, null, 2))
    expect(result).to.deep.equal(expected)
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
                direction: 'up',
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
                direction: 'up',
            })
        }).to.throw('Chord not found.')
    })
    it('composeArpeggio up', () => {
        testEquals(
            Compose.composeArpeggio({
                index: 1,
                duration: 8,
                noteTiming: 'Quarter',
                noteDuration: 'Quarter',
                noteVelocity: 65,
                chord: 'CMaj7',
                octave: 3,
                count: 4,
                direction: 'up',
            }),
            [
                {index: 1, duration: 1, midi: 48, velocity: 65},
                {index: 2, duration: 1, midi: 52, velocity: 65},
                {index: 3, duration: 1, midi: 55, velocity: 65},
                {index: 4, duration: 1, midi: 59, velocity: 65},
                {index: 5, duration: 1, midi: 48, velocity: 65},
                {index: 6, duration: 1, midi: 52, velocity: 65},
                {index: 7, duration: 1, midi: 55, velocity: 65},
                {index: 8, duration: 1, midi: 59, velocity: 65},
            ],
        )
    })
    it('composeArpeggio down', () => {
        testEquals(
            Compose.composeArpeggio({
                index: 1,
                duration: 8,
                noteTiming: 'Quarter',
                noteDuration: 'Quarter',
                noteVelocity: 65,
                chord: 'CMaj7',
                octave: 3,
                count: 4,
                direction: 'down',
            }),
            [
                {index: 1, duration: 1, midi: 59, velocity: 65},
                {index: 2, duration: 1, midi: 55, velocity: 65},
                {index: 3, duration: 1, midi: 52, velocity: 65},
                {index: 4, duration: 1, midi: 48, velocity: 65},
                {index: 5, duration: 1, midi: 59, velocity: 65},
                {index: 6, duration: 1, midi: 55, velocity: 65},
                {index: 7, duration: 1, midi: 52, velocity: 65},
                {index: 8, duration: 1, midi: 48, velocity: 65},
            ],
        )
    })
    it('composeArpeggio down 2', () => {
        testEquals(
            Compose.composeArpeggio({
                index: 1,
                duration: 8,
                noteTiming: 'Quarter',
                noteDuration: 'Quarter',
                noteVelocity: 65,
                chord: 'CMaj7',
                octave: 3,
                count: 3,
                direction: 'down',
            }),
            [
                {
                    midi: 55,
                    velocity: 65,
                    index: 1,
                    duration: 1,
                },
                {
                    midi: 52,
                    velocity: 65,
                    index: 2,
                    duration: 1,
                },
                {
                    midi: 48,
                    velocity: 65,
                    index: 3,
                    duration: 1,
                },
                {
                    midi: 55,
                    velocity: 65,
                    index: 4,
                    duration: 1,
                },
                {
                    midi: 52,
                    velocity: 65,
                    index: 5,
                    duration: 1,
                },
                {
                    midi: 48,
                    velocity: 65,
                    index: 6,
                    duration: 1,
                },
                {
                    midi: 55,
                    velocity: 65,
                    index: 7,
                    duration: 1,
                },
                {
                    midi: 52,
                    velocity: 65,
                    index: 8,
                    duration: 1,
                },
            ],
        )
    })
    it('composeArpeggio updown', () => {
        testEquals(
            Compose.composeArpeggio({
                index: 1,
                duration: 16,
                noteTiming: 'Quarter',
                noteDuration: 'Quarter',
                noteVelocity: 65,
                chord: 'CMaj7',
                octave: 3,
                count: 6,
                direction: 'updown',
            }), [
                {
                    midi: 48,
                    velocity: 65,
                    index: 1,
                    duration: 1,
                },
                {
                    midi: 52,
                    velocity: 65,
                    index: 2,
                    duration: 1,
                },
                {
                    midi: 55,
                    velocity: 65,
                    index: 3,
                    duration: 1,
                },
                {
                    midi: 59,
                    velocity: 65,
                    index: 4,
                    duration: 1,
                },
                {
                    midi: 60,
                    velocity: 65,
                    index: 5,
                    duration: 1,
                },
                {
                    midi: 64,
                    velocity: 65,
                    index: 6,
                    duration: 1,
                },
                {
                    midi: 60,
                    velocity: 65,
                    index: 7,
                    duration: 1,
                },
                {
                    midi: 59,
                    velocity: 65,
                    index: 8,
                    duration: 1,
                },
                {
                    midi: 55,
                    velocity: 65,
                    index: 9,
                    duration: 1,
                },
                {
                    midi: 52,
                    velocity: 65,
                    index: 10,
                    duration: 1,
                },
                {
                    midi: 48,
                    velocity: 65,
                    index: 11,
                    duration: 1,
                },
                {
                    midi: 52,
                    velocity: 65,
                    index: 12,
                    duration: 1,
                },
                {
                    midi: 55,
                    velocity: 65,
                    index: 13,
                    duration: 1,
                },
                {
                    midi: 59,
                    velocity: 65,
                    index: 14,
                    duration: 1,
                },
                {
                    midi: 60,
                    velocity: 65,
                    index: 15,
                    duration: 1,
                },
                {
                    midi: 64,
                    velocity: 65,
                    index: 16,
                    duration: 1,
                },
            ],
        )
    })
    it('composeArpeggio downup', () => {
        testEquals(
            Compose.composeArpeggio({
                index: 1,
                duration: 16,
                noteTiming: 'Quarter',
                noteDuration: 'Quarter',
                noteVelocity: 65,
                chord: 'CMaj7',
                octave: 3,
                count: 6,
                direction: 'downup',
            }),
            [
                {
                    midi: 52,
                    velocity: 65,
                    index: 1,
                    duration: 1,
                },
                {
                    midi: 48,
                    velocity: 65,
                    index: 2,
                    duration: 1,
                },
                {
                    midi: 47,
                    velocity: 65,
                    index: 3,
                    duration: 1,
                },
                {
                    midi: 43,
                    velocity: 65,
                    index: 4,
                    duration: 1,
                },
                {
                    midi: 40,
                    velocity: 65,
                    index: 5,
                    duration: 1,
                },
                {
                    midi: 36,
                    velocity: 65,
                    index: 6,
                    duration: 1,
                },
                {
                    midi: 40,
                    velocity: 65,
                    index: 7,
                    duration: 1,
                },
                {
                    midi: 43,
                    velocity: 65,
                    index: 8,
                    duration: 1,
                },
                {
                    midi: 47,
                    velocity: 65,
                    index: 9,
                    duration: 1,
                },
                {
                    midi: 48,
                    velocity: 65,
                    index: 10,
                    duration: 1,
                },
                {
                    midi: 52,
                    velocity: 65,
                    index: 11,
                    duration: 1,
                },
                {
                    midi: 48,
                    velocity: 65,
                    index: 12,
                    duration: 1,
                },
                {
                    midi: 47,
                    velocity: 65,
                    index: 13,
                    duration: 1,
                },
                {
                    midi: 43,
                    velocity: 65,
                    index: 14,
                    duration: 1,
                },
                {
                    midi: 40,
                    velocity: 65,
                    index: 15,
                    duration: 1,
                },
                {
                    midi: 36,
                    velocity: 65,
                    index: 16,
                    duration: 1,
                },
            ],
        )
    })
    it('composeArpeggio key', () => {
        const notes = Compose.composeArpeggio({
            index: 1,
            duration: 4,
            noteTiming: 'Eighth',
            noteDuration: 'Eighth',
            noteVelocity: 65,
            key: 'C major',
            octave: 3,
            count: 4,
            direction: 'up',
        })
        expect(notes.length).to.equal(8)
    })
})
