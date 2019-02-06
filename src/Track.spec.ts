import {expect} from 'chai'
import Track from './Track'
import Tracker from './Tracker'

describe('Track', () => {
    let tracker: Tracker
    let track: Track

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
