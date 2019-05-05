import {Composer} from './Composer';

describe('Composer', () => {
    it('some basics', () => {
        const composer = new Composer();
        compose.key = 'C Major';
        compose.speed(1);
        compose.start('C3');
        compose
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
