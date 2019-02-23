import assert from 'assert'
import Note from './Note'

export default function compose(params: ICompositionParameters): Note[] {
    switch (params.type) {
        case EComposeTypes.Repeating:
            return composeRepeating(params)
        default:
            throw new Error(`Unknown type: ${params.type}`)
    }
}

function composeRepeating(params: ICompositionParameters): Note[] {
    assert(params.index !== undefined, 'A valid index is required.')
    assert(params.duration !== undefined, 'A valid duration is required.')
    assert(params.type !== undefined, 'A valid type is required.')
    assert(params.startingNote !== undefined, 'A valid startingNote is required.')
    assert(params.noteTiming !== undefined, 'A valid noteTiming is required.')
    assert(params.noteDuration !== undefined, 'A valid noteDuration is required.')
    assert(params.noteVelocity !== undefined, 'A valid noteVelocity is required.')

    const note: number = Note.translateLetterNote(params.startingNote)
    const noteTiming = Note.translateTiming(params.noteTiming)
    const noteDuration = Note.translateTiming(params.noteDuration)
    const notes = []
    let index: number = params.index
    while (index < params.index + params.duration) {
        notes.push(Note.create({
            note,
            velocity: params.noteVelocity,
            index,
            duration: noteDuration,
        }))
        index += noteTiming
    }
    return notes
}

export interface ICompositionParameters {
    index: number
    duration: number
    type: EComposeTypes
    startingNote: string | number
    noteTiming: string | number
    noteDuration: string | number
    noteVelocity: number
}

export enum EComposeTypes {
    Repeating,
    Arpeggio,
}
