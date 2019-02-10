import Note from './Note'

export default function compose(params: ICompositionParameters): Note[] {
    params.startingNote = Note.translateLetterNote(params.startingNote)
    return []
}

export interface ICompositionParameters {
    startingNote: string | number
    timing: string | number
    duration: string | number
    repeat: boolean
}
