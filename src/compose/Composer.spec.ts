import {Composer} from './Composer';

describe('Composer', () => {
    it('some basics', () => {
        const composer = new Composer();
        composer.key = 'C Major';
        composer.speed = 1;
        composer.start('C3');
        composer
            .up()
            .up()
            .up(2)
            .down(4)
            .up()
            .up()
            .up(2)
            .down(4)
            .up()
            .up()
            .up(2)
            .down(4)
            .up()
            .up()
            .up(2)

    });
});
