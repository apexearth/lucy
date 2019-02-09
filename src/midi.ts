const easymidi = require('easymidi')

export const input = (name: string) => new easymidi.Input(name, true)
export const output = (name: string) => new easymidi.Output(name, true)

export default {
    input,
    output,
}
