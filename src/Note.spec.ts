import {expect} from 'chai'
import Note, {translateLetterNote, translateTiming} from './Note'

describe('Note', () => {
    it('timing string conversion', () => {
        expect(translateTiming('quarter')).to.equal(1)
        expect(translateTiming('Quarter')).to.equal(1)

        expect(translateTiming('half')).to.equal(2)

        expect(translateTiming('whole')).to.equal(4)
        expect(translateTiming('bar')).to.equal(4)

        expect(translateTiming('eighth')).to.equal(.5)

        expect(translateTiming('sixteenth')).to.equal(.25)
        expect(translateTiming('thirty-second')).to.equal(.125)
        expect(translateTiming('sixty-fourth')).to.equal(.0625)
        expect(translateTiming(.0625)).to.equal(.0625)
    })
    it('letter note conversion', () => {
        expect(translateLetterNote(59)).to.equal(59)

        expect(translateLetterNote('A2')).to.equal(45)
        expect(translateLetterNote('A#2')).to.equal(46)
        expect(translateLetterNote('B2')).to.equal(47)
        expect(translateLetterNote('C3')).to.equal(48)
        expect(translateLetterNote('C#3')).to.equal(49)
        expect(translateLetterNote('D3')).to.equal(50)
        expect(translateLetterNote('Eb3')).to.equal(51)
        expect(translateLetterNote('E3')).to.equal(52)
        expect(translateLetterNote('F3')).to.equal(53)
        expect(translateLetterNote('F#3')).to.equal(54)
        expect(translateLetterNote('G3')).to.equal(55)
        expect(translateLetterNote('Ab3')).to.equal(56)
        expect(translateLetterNote('A3')).to.equal(57)
    })
    it('create Note from ILetterNote', () => {
        const note = Note.create({
            note: 'C4',
            duration: 1,
            velocity: 127,
            index: 1,
        })
        expect(note.note).to.equal(60)
        expect(note.duration).to.equal(1)
        expect(note.velocity).to.equal(127)
        expect(note.index).to.equal(1)
    })
})
