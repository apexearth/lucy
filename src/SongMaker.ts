import Song from "./Song";
import TonePlayer from "./TonePlayer";

export interface ISongSchematic {
    key: string,
}

export default class SongMaker {
    public static create(schematic: ISongSchematic): Song {
        const song = new Song()

        return song;
    }
}

if (require.main === module) {
    const song = SongMaker.create({
        key: 'C major',
    })
    const player = new TonePlayer(song)

}
