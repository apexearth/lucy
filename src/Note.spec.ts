import {expect} from 'chai'
import Note from './Note'

describe('Note', () => {
    it('letter note conversion', () => {
        expect(Note.translateLetterNote('A2')).to.equal(46)
        expect(Note.translateLetterNote('B2')).to.equal(47)
        expect(Note.translateLetterNote('C3')).to.equal(48)
        expect(Note.translateLetterNote('A3')).to.equal(58)
        expect(Note.translateLetterNote('B3')).to.equal(59)
        expect(Note.translateLetterNote('C4')).to.equal(60)
        expect(Note.translateLetterNote('C#4')).to.equal(61)
        expect(Note.translateLetterNote('Cb4')).to.equal(59)
    })
    it('create Note from ILetterNote', () => {
        const note = Note.create({
            note: 'C4',
            duration: 1,
            velocity: 127,
        })
        expect(note.note).to.equal(60)
        expect(note.duration).to.equal(1)
        expect(note.velocity).to.equal(127)
    })
})
