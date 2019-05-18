import {expect} from 'chai';
import {Composer} from './Composer';

describe('Composer', () => {
    it('some basics', () => {
        const composer = new Composer();
        composer.start();
        composer
            .up()
            .up()
            .up(2)
            .down(5)
            .up()
            .up()
            .up(2)
            .down(5)
            .up()
            .up()
            .up(2)
            .down(5)
            .up()
            .up()
            .up(2)
        expect(composer.notes.map(({note}) => note)).to.deep.equal([
            "C3", "D3", "E3", "G3",
            "B2", "C3", "D3", "F3",
            "A2", "B2", "C3", "E3",
            "G2", "A2", "B2", "D3",
        ])
        expect(composer.notes.map(({index}) => index)).to.deep.equal([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16,
        ])
    });
    it('.array', () => {
        const composer = new Composer();
        composer.array([
            0, 1, 1, 2,
            -5, 1, 1, 2,
            -5, 1, 1, 2,
            -5, 1, 1, 2,
        ])
        expect(composer.notes.map(({note}) => note)).to.deep.equal([
            "C3", "D3", "E3", "G3",
            "B2", "C3", "D3", "F3",
            "A2", "B2", "C3", "E3",
            "G2", "A2", "B2", "D3",
        ])
        expect(composer.notes.map(({index}) => index)).to.deep.equal([
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16,
        ])
    });
});
