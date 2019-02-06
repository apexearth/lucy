const Section = require('./Section')

class Track extends Section {
    constructor(...args) {
        super(...args)
        this.sections = []
    }
}

module.exports = Track
