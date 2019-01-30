const easymidi = require('easymidi')

module.exports = {
    input: name => new easymidi.Input(name, true),
    output: name => new easymidi.Output(name, true)
}
