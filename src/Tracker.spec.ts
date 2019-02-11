import {expect} from 'chai'
import Tracker from './Tracker'

describe('Tracker', () => {
    let tracker: Tracker

    beforeEach(() => {
        tracker = new Tracker({bpm: 120})
    })

    it('basics', () => {
        expect(tracker.bpm).to.equal(120)
        expect(tracker.bps).to.equal(2)
        expect(tracker.mspb).to.equal(500)

        // These values track which quarter note, sixteenth note, bar, etc... we're on.
        tracker.delta = 499
        expect(tracker.count(.125)).to.equal(8)
        expect(tracker.count(.25)).to.equal(4)
        expect(tracker.count(.5)).to.equal(2)
        expect(tracker.count(1)).to.equal(1)
        expect(tracker.count(2)).to.equal(1)
        expect(tracker.count(4)).to.equal(1)
        expect(tracker.count(8)).to.equal(1)

        tracker.delta = 500
        expect(tracker.count(.125)).to.equal(9)
        expect(tracker.count(.25)).to.equal(5)
        expect(tracker.count(.5)).to.equal(3)
        expect(tracker.count(1)).to.equal(2)
        expect(tracker.count(2)).to.equal(1)
        expect(tracker.count(4)).to.equal(1)
        expect(tracker.count(8)).to.equal(1)

    })

    it('start', (done) => {
        tracker.on('start', () => {
            tracker.kill()
            done()
        })
        tracker.start()
    })

    it('stop', (done) => {
        tracker.on('tick', (delta) => {
            tracker.kill()
            expect(delta).to.be.gte(0)
            done()
        })
        tracker.start()
    })

    it('loop', () => {
        tracker.loop(1, 4)
        tracker.startTime = 0
        tracker.tick(0)
        expect(tracker.count(1)).to.equal(1)
        tracker.tick(500)
        expect(tracker.count(1)).to.equal(2)
        tracker.tick(1000)
        expect(tracker.count(1)).to.equal(3)
        tracker.tick(1500)
        expect(tracker.count(1)).to.equal(4)
        tracker.tick(2000)
        expect(tracker.count(1)).to.equal(1)
        tracker.tick(2500)
        expect(tracker.count(1)).to.equal(2)
    })
})
