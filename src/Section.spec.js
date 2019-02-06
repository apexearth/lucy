const Section = require('./Section')
const Tracker = require('./Tracker')
const {expect} = require('chai')

describe('Section', () => {
    let tracker, section
    beforeEach(() => {
        tracker = new Tracker()
        section = new Section({tracker})
    })

    it('basics', () => {
        /**
         * - We are a collection of notes played somewhere over time.
         * - We should be optimized for front-to-back play.
         * - We deliver notes quickly and at the proper time.
         * - Our start time is variable and defined.
         * - Out length is variable and defined.
         * - We can be looped over N.
         * - Our end time is variable and defined. (differs from length when looped)
         */
        expect(section.notes).to.be.an('array')
        expect(section.validate()).to.equal(true)
        expect(section.addNote())
    })
})
