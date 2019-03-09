///<reference path="compose.d.ts"/>
import assert from 'assert'
import {Chord} from 'tonal'
import Note from './Note'
import {ITimeDuration} from './Tracker'

export interface IComposeRepeating extends ITimeDuration {
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

export interface IComposeArpeggio extends ITimeDuration {
    index: number
    duration: number
    chord: string
    octave: number,
    count: number,
    direction: string,
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
    assert(params.direction !== undefined, 'A valid direction is required.')
    assert(params.noteTiming !== undefined, 'A valid noteTiming is required.')
    assert(params.noteDuration !== undefined, 'A valid noteDuration is required.')
    assert(params.noteVelocity !== undefined, 'A valid noteVelocity is required.')

    let direction = params.direction.startsWith('up') ? 'up' : 'down'
    let chordNotes = Chord.notes(params.chord)
    assert(chordNotes.length > 0, 'Chord not found.')
    while (chordNotes.length < params.count) {
        chordNotes = chordNotes.concat(chordNotes)
    }
    chordNotes = chordNotes.slice(0, params.count)
    if (direction === 'down') {
        chordNotes = chordNotes.reverse()
    }
    console.log(chordNotes.length)
    let chordCurrent = 0
    let chordDirection = 1
    const noteTiming = Note.time(params.noteTiming)
    const noteDuration = Note.time(params.noteDuration)
    const notes = []
    let octaveModifier = 0
    let index: number = params.index
    let lastNote = null
    let lastNoteValue = null
    while (index < params.index + params.duration) {
        const currentNote = chordNotes[chordCurrent]
        const currentNoteValue = Note.letterValue(currentNote)
        if (lastNoteValue !== null && currentNoteValue !== null) {
            if (direction === 'up') {
                if (lastNoteValue >= currentNoteValue) {
                    octaveModifier += 1
                }
            } else if (direction === 'down') {
                if (lastNoteValue <= currentNoteValue) {
                    octaveModifier -= 1
                }
            }
        }

        const note = Note.from({oct: params.octave + octaveModifier}, currentNote)
        console.log(note, index)
        notes.push(Note.create({
            note,
            velocity: params.noteVelocity,
            index,
            duration: noteDuration,
        }))

        index += noteTiming
        chordCurrent += chordDirection
        lastNote = currentNote
        lastNoteValue = currentNoteValue
        if (chordCurrent === chordNotes.length || chordCurrent < 0) {
            if (params.direction === 'updown' || params.direction === 'downup') {
                chordDirection *= -1
                chordCurrent += chordDirection * 2
                direction = direction === 'up' ? 'down' : 'up'
            } else {
                chordCurrent = 0
                octaveModifier = 0
                lastNote = null
                lastNoteValue = null
            }
        }
    }
    return notes
}
