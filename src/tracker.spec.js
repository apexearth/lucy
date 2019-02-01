const Tracker = require('./tracker')

describe('tracker', () => {
    let tracker

    beforeEach(function () {
        tracker = new Tracker({bpm: 120})
    })

    it('start', function (done) {
        tracker.on('start', () => {
            tracker.removeAllListeners()
            done()
        })
        tracker.start()
    })

    it('stop', function (done) {
        tracker.on('tick', () => {
            tracker.removeAllListeners()
            done()
        })
        tracker.start()
    });
})