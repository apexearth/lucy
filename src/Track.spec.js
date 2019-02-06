const Track = require('./Track')
const Tracker = require('./Tracker')
const {expect} = require('chai')

describe('Track', () => {
    let tracker, track
    beforeEach(() => {
        tracker = new Tracker()
        track = new Track({tracker})
    })

    it('basics', () => {
        expect(track.sections).to.be.an('array')
        expect(track.notes).to.be.an('array')
        expect(track.validate()).to.equal(true)
    })
})
