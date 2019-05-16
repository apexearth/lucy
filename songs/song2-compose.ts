import {TonePlayer} from '../'
import {Composer} from "../src/compose/Composer";
import Song from "../src/core/Song";

const song = new Song();
const player = new TonePlayer(song)
const track = song.createTrack()

const composer = new Composer();
composer.speed = .25;
composer.clear()
composer.array([
    1, 1, 2, -5,
    1, 1, 2, -5,
    1, 1, 2, -5,
    1, 2, 3, -3,
    1, 1, 2, -5,
    1, 1, 2, -5,
    1, 1, 2, -5,
    1, 2, 3, -3,
])

track.addNotes(1, composer.notes)

console.log(track.sections)

player.loop(1, 32)
player.start()
