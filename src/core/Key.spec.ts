import {expect} from 'chai'
import {Key} from './Key'

describe('Key', () => {
    it('Key generation', () => {
        expect(new Key(Key.Notes.C, Key.Modes.Dorian).toString()).to.equal('C Dorian')
        expect(Key.create(Key.Notes.C, Key.Modes.Major).toString()).to.equal('C Major')
        expect(Key.create(Key.Notes.ASharp, Key.Modes.Minor).toString()).to.equal('A# Minor')
        expect(Key.create(Key.Notes.BFlat, Key.Modes.Mixolydian).toString()).to.equal('Bb Mixolydian')
    })
});
