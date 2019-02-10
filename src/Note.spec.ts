import {expect} from 'chai'
import Note from './Note'

describe('Note', () => {
    it('timing string conversion', () => {
        expect(Note.translateTiming('quarter')).to.equal(1)
        expect(Note.translateTiming('Quarter')).to.equal(1)

        expect(Note.translateTiming('half')).to.equal(2)

        expect(Note.translateTiming('whole')).to.equal(4)
        expect(Note.translateTiming('bar')).to.equal(4)

        expect(Note.translateTiming('eighth')).to.equal(.5)

        expect(Note.translateTiming('sixteenth')).to.equal(.25)
        expect(Note.translateTiming('thirty-second')).to.equal(.125)
        expect(Note.translateTiming('sixty-fourth')).to.equal(.0625)
    })
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
