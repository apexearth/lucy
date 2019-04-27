import {Key, Mode, Note} from "./core/Key";
import Song from "./core/Song";
import TonePlayer from "./core/TonePlayer";

enum Style {
    'Lucy',
}

export interface ISongSchematic {
    key: Key,
    style: Style
}

export class SongWriter {
    public static create(schematic: ISongSchematic): Song {
        const song = new Song()

        return song
    }
}

if (require.main === module) {
    const song = SongWriter.create({
        key: Key.create(Note.C, Mode.Dorian),
        style: Style.Lucy,
    })
    const player = new TonePlayer(song)
    player.start();
}
