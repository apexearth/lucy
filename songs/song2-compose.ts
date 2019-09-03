import {TonePlayer} from '../'
import Song from "../src/core/Song";

const song = new Song();
const player = new TonePlayer(song);

const composer1 = song.createTrack().composer;
composer1.note = "C5";
composer1.duration = .5;
composer1.velocity *= .8;
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

const composer2 = song.createTrack().composer
composer2.note = 'C3';
composer2.duration = 2;
composer2.clear()
composer2.array([
    0, 2, 1, 1,
    -5, 2, 1, 1,
])

player.loop(1, 16)
player.start()
