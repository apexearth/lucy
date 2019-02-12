import {expect} from 'chai'
import Track from './Track'
import Tracker from './Tracker'

describe('Track', () => {
    let tracker: Tracker
    let track: Track

    beforeEach(() => {
        tracker = new Tracker()
        track = new Track()
    })

    it('basics', () => {
        expect(track.sections).to.be.an('array')
    })
})
