import {TonePlayer} from '../'
import {Composer} from "../src/compose/Composer";
import Song from "../src/core/Song";

const song = new Song();
const player = new TonePlayer(song)
const track1 = song.createTrack()
const track2 = song.createTrack()

const composer1 = new Composer();
composer1.speed = .5;
composer1.velocity *= .8;
composer1.clear()
composer1.array([
    5, -7, 3, 3,
    1, -7, 3, 3,
    1, -7, 3, 3,
    1, -7, 6, -3,

    -1, -7, 3, 3,
    1, -7, 3, 3,
    1, -7, 3, 3,
    1, -7, 3, 3,
])

const composer2 = new Composer({
    note: 'C2',
});
composer2.speed = 2;
composer2.clear()
composer2.array([
    0, 2, 1, 1,
    -5, 2, 1, 1,
])

track1.addNotes(1, composer1.notes)
track2.addNotes(1, composer2.notes)

player.loop(1, 16)
player.start()
