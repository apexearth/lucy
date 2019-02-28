import {expect} from 'chai'
import Note from './Note'

describe('Note', () => {
    it('Note.time', () => {
        expect(Note.time('quarter')).to.equal(1)
        expect(Note.time('Quarter')).to.equal(1)

        expect(Note.time('half')).to.equal(2)

        expect(Note.time('whole')).to.equal(4)
        expect(Note.time('bar')).to.equal(4)

        expect(Note.time('eighth')).to.equal(.5)

        expect(Note.time('sixteenth')).to.equal(.25)
        expect(Note.time('thirty-second')).to.equal(.125)
        expect(Note.time('sixty-fourth')).to.equal(.0625)
        expect(Note.time(.0625)).to.equal(.0625)
    })
    it('Note.midi', () => {
        expect(Note.midi(59)).to.equal(59)

        expect(Note.midi('A2')).to.equal(45)
        expect(Note.midi('A#2')).to.equal(46)
        expect(Note.midi('B2')).to.equal(47)
        expect(Note.midi('C3')).to.equal(48)
        expect(Note.midi('C#3')).to.equal(49)
        expect(Note.midi('D3')).to.equal(50)
        expect(Note.midi('Eb3')).to.equal(51)
        expect(Note.midi('E3')).to.equal(52)
        expect(Note.midi('F3')).to.equal(53)
        expect(Note.midi('F#3')).to.equal(54)
        expect(Note.midi('G3')).to.equal(55)
        expect(Note.midi('Ab3')).to.equal(56)
        expect(Note.midi('A3')).to.equal(57)
    })
    it('Note.create', () => {
        expect(Note.create({
            note: 'C4',
            duration: 1,
            velocity: 127,
            index: 1,
        }).toMidi()).to.deep.equal({
            midi: 60,
            duration: 1,
            velocity: 127,
            index: 1,
        })
    })
})
