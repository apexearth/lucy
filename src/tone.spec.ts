import speaker from './speaker'
import tone from './tone'

describe('tone', () => {
    it('generate a tone', () => {
        const sp = speaker()
        tone(60, {
            duration: 1,
        }).pipe(sp)
    })
})
