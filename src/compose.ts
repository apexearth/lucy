import Note from './Note'

export default function compose(params: ICompositionParameters): Note[] {
    params.startingNote = Note.translateLetterNote(params.startingNote)
    params.noteTiming = Note.translateTiming(params.noteTiming)
    params.noteDuration = Note.translateTiming(params.noteDuration)
    let timeIndex: number = 1
    const currentNote: number = params.startingNote
    const notes = []
    while (timeIndex < 4 + 1) {
        notes.push(Note.create({
            note: currentNote,
            duration: params.noteDuration,
            velocity: params.noteVelocity,
            timeIndex,
        }))
        timeIndex += params.noteTiming
    }
    return notes
}

export interface ICompositionParameters {
    duration: number
    startingNote: string | number
    noteTiming: string | number
    noteDuration: string | number
    noteVelocity: number
    repeat: boolean
}
