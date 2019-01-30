const easymidi = require('easymidi');

const output = new easymidi.Output('MIDI Output Name', true);

const playNote = (note, duration) => {
    return new Promise((resolve, reject) => {
        output.send('noteon', {
            note,
            velocity: 127,
            channel: 3
        })
        setTimeout(() => {
            output.send('noteoff', {
                note,
                velocity: 127,
                channel: 3
            });
            resolve()
        }, duration)
    })
}

setTimeout(async () => {
    while (true) {
        for (let i = 0; i < 12; i++) {
            await playNote(70 - i, 200)
        }
        for (let i = 12; i > 0; i--) {
            await playNote(70 - i, 200)
        }
    }
}, 1000)
