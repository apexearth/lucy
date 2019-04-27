///<reference path="composeRepeating.d.ts"/>
import assert from "assert";
import Note from "../core/Note";
import {ITimeDuration} from "../core/Tracker";

export interface IComposeRepeating extends ITimeDuration {
    index: number
    duration: number
    startingNote: string
    noteTiming: string | number
    noteDuration: string | number
    noteVelocity: number
}

export default function composeRepeating(params: IComposeRepeating): Note[] {
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
