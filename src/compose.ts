///<reference path="compose.d.ts"/>
import assert from 'assert'
import {Chord} from 'tonal'
import Note from './Note'

export interface ICompose {
    index: number
    duration: number
}

export interface IComposeRepeating extends ICompose {
    index: number
    duration: number
    startingNote: string
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
    const note: string = params.startingNote
    const noteTiming = Note.time(params.noteTiming)
    const noteDuration = Note.time(params.noteDuration)
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
    octave: number,
    count: number,
    noteTiming: string | number
    noteDuration: string | number
    noteVelocity: number
}

export function composeArpeggio(params: IComposeArpeggio): Note[] {
    assert(params.index !== undefined, 'A valid index is required.')
    assert(params.duration !== undefined, 'A valid duration is required.')
    assert(params.chord !== undefined, 'A valid string is required.')
    assert(params.octave !== undefined, 'A valid octave is required.')
    assert(params.count !== undefined, 'A valid count is required.')
    assert(params.noteTiming !== undefined, 'A valid noteTiming is required.')
    assert(params.noteDuration !== undefined, 'A valid noteDuration is required.')
    assert(params.noteVelocity !== undefined, 'A valid noteVelocity is required.')
    let chordNotes = Chord.notes(params.chord)
    assert(chordNotes.length > 0, 'Chord not found.')
    while (chordNotes.length < params.count) {
        chordNotes = chordNotes.concat(chordNotes)
    }
    chordNotes = chordNotes.slice(0, params.count)
    console.log(chordNotes.length)
    let chordCurrent = 0
    const noteTiming = Note.time(params.noteTiming)
    const noteDuration = Note.time(params.noteDuration)
    const notes = []
    let scaleUp = 0
    let index: number = params.index
    while (index < params.index + params.duration) {
        const lastNote = chordNotes[chordCurrent - 1]
        const currentNote = chordNotes[chordCurrent]
        if (currentNote >= 'C' && (lastNote < 'C' || lastNote > currentNote)) {
            scaleUp += 1
        }
        const note = Note.from({oct: params.octave + scaleUp}, currentNote)
        console.log(note, index)
        notes.push(Note.create({
            note,
            velocity: params.noteVelocity,
            index,
            duration: noteDuration,
        }))
        index += noteTiming
        chordCurrent += 1
        if (chordCurrent === chordNotes.length) {
            chordCurrent = 0
            scaleUp = 0
        }
    }
    return notes
}
