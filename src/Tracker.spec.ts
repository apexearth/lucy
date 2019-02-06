import {expect} from 'chai'
import Tracker from './Tracker'

describe('Tracker', () => {
    let tracker: Tracker

    beforeEach(function() {
        tracker = new Tracker({bpm: 120})
    })

    it('basics', function() {
        expect(tracker.bpm).to.equal(120)
        expect(tracker.bps).to.equal(2)
        expect(tracker.mspb).to.equal(500)

        // These values track which quarter note, sixteenth note, bar, etc... we're on.
        tracker.delta = 5000
        expect(tracker[.5]).to.equal(2)
        expect(tracker[1]).to.equal(3)
        expect(tracker[2]).to.equal(6)
        expect(tracker[4]).to.equal(11)
        expect(tracker[8]).to.equal(21)
        expect(tracker[16]).to.equal(41)
        expect(tracker[32]).to.equal(81)
        expect(tracker[64]).to.equal(161)
        expect(tracker[128]).to.equal(321)

        tracker.delta = 4900
        expect(tracker[.5]).to.equal(2)
        expect(tracker[1]).to.equal(3)
        expect(tracker[2]).to.equal(5)
        expect(tracker[4]).to.equal(10)
        expect(tracker[8]).to.equal(20)
        expect(tracker[16]).to.equal(40)
        expect(tracker[32]).to.equal(79)
        expect(tracker[64]).to.equal(157)
        expect(tracker[128]).to.equal(314)
    })

    it('start', function(done) {
        tracker.on('start', () => {
            tracker.kill()
            done()
        })
        tracker.start()
    })

    it('stop', function(done) {
        tracker.on('tick', (delta) => {
            tracker.kill()
            expect(delta).to.be.gte(0)
            done()
        })
        tracker.start()
    })
})
