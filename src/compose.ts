///<reference path="compose.d.ts"/>
import assert from 'assert'
import * as Chord from 'tonal-chord'
import {scale} from 'tonal-key'
import Note from './Note'
import {parts, translateLetterNote, translateTiming} from './Note'

export interface ICompose {
    index: number
    duration: number
}

export interface IComposeRepeating extends ICompose {
    index: number
    duration: number
    startingNote: string | number
    noteTiming: string | number
    noteDuration: string | number
    noteVelocity: number
}

export function composeRepeating(params: IComposeRepeating): Note[] {
    assert(params.index !== undefined, 'A valid index is required.')
    assert(params.duration !== undefined, 'A valid duration is required.')
    assert(params.startingNote !== undefined, 'A valid startingNote is required.')
    assert(params.noteTiming !== undefined, 'A valid noteTiming is required.')
    assert(params.noteDuration !== undefined, 'A valid noteDuration is required.')
    assert(params.noteVelocity !== undefined, 'A valid noteVelocity is required.')
    const note: number = translateLetterNote(params.startingNote)
    const noteTiming = translateTiming(params.noteTiming)
    const noteDuration = translateTiming(params.noteDuration)
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

export interface IComposeArpeggio extends ICompose {
    index: number
    duration: number
    chord: string
    startingNote: string
    noteTiming: string | number
    noteDuration: string | number
    noteVelocity: number
}

export function composeArpeggio(params: IComposeArpeggio): Note[] {
    assert(params.index !== undefined, 'A valid index is required.')
    assert(params.duration !== undefined, 'A valid duration is required.')
    assert(params.chord !== undefined, 'A valid string is required.')
    assert(params.startingNote !== undefined, 'A valid startingNote is required.')
    assert(params.noteTiming !== undefined, 'A valid noteTiming is required.')
    assert(params.noteDuration !== undefined, 'A valid noteDuration is required.')
    assert(params.noteVelocity !== undefined, 'A valid noteVelocity is required.')
    const chordNodes = Chord.notes(params.chord)
    const {octave, letter} = parts(params.startingNote)
    const noteTiming = translateTiming(params.noteTiming)
    const noteDuration = translateTiming(params.noteDuration)
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
