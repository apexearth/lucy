import {expect} from 'chai'
import Player, {IMidiNote} from './Player'

describe('Player', () => {
    it('usage basics', () => {
        const player = new Player()
        const track = player.createTrack()
        const section = track.createSection({
            index: 1,
            duration: 4,
        })
        section.composeRepeating({
            index: 1,
            duration: 4,
            startingNote: 'C3',
            noteTiming: 'Quarter',
            noteDuration: 'Eighth',
            noteVelocity: 65,
        })
        expect(section.notes.map((note) => note.toMidi())).to.deep.equal([
            {midi: 48, index: 1, duration: .5, velocity: 65},
            {midi: 48, index: 2, duration: .5, velocity: 65},
            {midi: 48, index: 3, duration: .5, velocity: 65},
            {midi: 48, index: 4, duration: .5, velocity: 65},
        ])

        const notesPlayed: IMidiNote[] = []
        player.on('note', (midi: IMidiNote) => {
            notesPlayed.push(midi)
        })
        player.loop(1, 4)
        player.tracker.startTime = 0
        let time = 0
        player.tick(time)
        expect(notesPlayed).to.deep.equal([
            {midi: 48, index: 1, duration: .5, velocity: 65},
        ])
        time += 100
        player.tick(time)
        time += 100
        player.tick(time)
        time += 100
        player.tick(time)
        time += 100
        player.tick(time)
        time += 100
        player.tick(time)
        expect(notesPlayed).to.deep.equal([
            {midi: 48, index: 1, duration: .5, velocity: 65},
            {midi: 48, index: 2, duration: .5, velocity: 65},
        ])
        time += 500
        player.tick(time)
        expect(notesPlayed).to.deep.equal([
            {midi: 48, index: 1, duration: .5, velocity: 65},
            {midi: 48, index: 2, duration: .5, velocity: 65},
            {midi: 48, index: 3, duration: .5, velocity: 65},
        ])
        time += 500
        player.tick(time)
        expect(notesPlayed).to.deep.equal([
            {midi: 48, index: 1, duration: .5, velocity: 65},
            {midi: 48, index: 2, duration: .5, velocity: 65},
            {midi: 48, index: 3, duration: .5, velocity: 65},
            {midi: 48, index: 4, duration: .5, velocity: 65},
        ])
        time += 500
        player.tick(time)
        expect(notesPlayed).to.deep.equal([
            {midi: 48, index: 1, duration: .5, velocity: 65},
            {midi: 48, index: 2, duration: .5, velocity: 65},
            {midi: 48, index: 3, duration: .5, velocity: 65},
            {midi: 48, index: 4, duration: .5, velocity: 65},
            {midi: 48, index: 1, duration: .5, velocity: 65},
        ])

        player.removeLoop()
        track.createSection({
            index: 5,
            duration: 4,
        }).composeRepeating({
            index: 1,
            duration: 4,
            startingNote: 'D4',
            noteTiming: 'Quarter',
            noteDuration: 'Eighth',
            noteVelocity: 65,
        })
        time += 500
        player.tick(time)
        time += 500
        player.tick(time)
        expect(notesPlayed).to.deep.equal([
            {midi: 48, index: 1, duration: .5, velocity: 65},
            {midi: 48, index: 2, duration: .5, velocity: 65},
            {midi: 48, index: 3, duration: .5, velocity: 65},
            {midi: 48, index: 4, duration: .5, velocity: 65},
            {midi: 48, index: 1, duration: .5, velocity: 65},
            {midi: 62, index: 6, duration: .5, velocity: 65},
            {midi: 62, index: 7, duration: .5, velocity: 65},
        ])

        // TODO: Test for non looped, time offset section output.
    })

    it('usage test 2', () => {
        const player = new Player()
        const notesPlayed: IMidiNote[] = []
        player.on('note', (midi: IMidiNote) => {
            notesPlayed.push(midi)
        })
        for (let i = 0; i < 1; i++) {
            const track = player.createTrack()
            for (let k = 0; k < 64; k++) {
                track.createSection({
                    index: 1 + k * 4,
                    duration: 4,
                }).composeRepeating({
                    index: 1,
                    duration: 1,
                    startingNote: 'C3',
                    noteTiming: 'Eighth',
                    noteDuration: 'Eighth',
                    noteVelocity: 65,
                }).composeRepeating({
                    startingNote: 'D3',
                }).composeRepeating({
                    startingNote: 'E3',
                }).composeRepeating({
                    startingNote: 'F3',
                })
            }
        }
        for (let i = 0; i < 10000; i += 50) {
            player.tick(i)
        }
        expect(notesPlayed).to.deep.equal([
            {midi: 48, velocity: 65, index: 1, duration: 0.5},
            {midi: 48, velocity: 65, index: 1.5, duration: 0.5},
            {midi: 50, velocity: 65, index: 2, duration: 0.5},
            {midi: 50, velocity: 65, index: 2.5, duration: 0.5},
            {midi: 52, velocity: 65, index: 3, duration: 0.5},
            {midi: 52, velocity: 65, index: 3.5, duration: 0.5},
            {midi: 53, velocity: 65, index: 4, duration: 0.5},
            {midi: 53, velocity: 65, index: 4.5, duration: 0.5},
            {midi: 48, velocity: 65, index: 5, duration: 0.5},
            {midi: 48, velocity: 65, index: 5.5, duration: 0.5},
            {midi: 50, velocity: 65, index: 6, duration: 0.5},
            {midi: 50, velocity: 65, index: 6.5, duration: 0.5},
            {midi: 52, velocity: 65, index: 7, duration: 0.5},
            {midi: 52, velocity: 65, index: 7.5, duration: 0.5},
            {midi: 53, velocity: 65, index: 8, duration: 0.5},
            {midi: 53, velocity: 65, index: 8.5, duration: 0.5},
            {midi: 48, velocity: 65, index: 9, duration: 0.5},
            {midi: 48, velocity: 65, index: 9.5, duration: 0.5},
            {midi: 50, velocity: 65, index: 10, duration: 0.5},
            {midi: 50, velocity: 65, index: 10.5, duration: 0.5},
            {midi: 52, velocity: 65, index: 11, duration: 0.5},
            {midi: 52, velocity: 65, index: 11.5, duration: 0.5},
            {midi: 53, velocity: 65, index: 12, duration: 0.5},
            {midi: 53, velocity: 65, index: 12.5, duration: 0.5},
            {midi: 48, velocity: 65, index: 13, duration: 0.5},
            {midi: 48, velocity: 65, index: 13.5, duration: 0.5},
            {midi: 50, velocity: 65, index: 14, duration: 0.5},
            {midi: 50, velocity: 65, index: 14.5, duration: 0.5},
            {midi: 52, velocity: 65, index: 15, duration: 0.5},
            {midi: 52, velocity: 65, index: 15.5, duration: 0.5},
            {midi: 53, velocity: 65, index: 16, duration: 0.5},
            {midi: 53, velocity: 65, index: 16.5, duration: 0.5},
            {midi: 48, velocity: 65, index: 17, duration: 0.5},
            {midi: 48, velocity: 65, index: 17.5, duration: 0.5},
            {midi: 50, velocity: 65, index: 18, duration: 0.5},
            {midi: 50, velocity: 65, index: 18.5, duration: 0.5},
            {midi: 52, velocity: 65, index: 19, duration: 0.5},
            {midi: 52, velocity: 65, index: 19.5, duration: 0.5},
            {midi: 53, velocity: 65, index: 20, duration: 0.5},
            {midi: 53, velocity: 65, index: 20.5, duration: 0.5},
        ])
    })

    it('stress test', () => {
        const player = new Player()
        let count: number = 0
        player.on('note', (midi: IMidiNote) => {
            count++
        })
        for (let i = 0; i < 16; i++) {
            const track = player.createTrack()
            for (let k = 0; k < 512; k++) {
                track.createSection({
                    index: 1 + k * 4,
                    duration: 4,
                }).composeRepeating({
                    index: 1,
                    duration: 1,
                    startingNote: 'C3',
                    noteTiming: 'Eighth',
                    noteDuration: 'Eighth',
                    noteVelocity: 65,
                }).composeRepeating({
                    startingNote: 'D3',
                }).composeRepeating({
                    startingNote: 'E3',
                }).composeRepeating({
                    startingNote: 'F3',
                })
            }
        }
        for (let i = 0; i < 100000; i += 50) {
            player.tick(i)
        }
        expect(count).to.equal(6400)
    })
})
