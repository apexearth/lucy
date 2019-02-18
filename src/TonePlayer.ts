///<reference path="TonePlayer.d.ts"/>
import Player from './Player'

import Speaker from 'speaker'
import {StreamAudioContext} from 'web-audio-engine'

export * from './Player'
export default class TonePlayer extends Player {
    private bufferTime: number = 1
    private context: any

    constructor() {
        super()
        const context = this.context = new StreamAudioContext()
        const speaker = new Speaker()
        context.resume()
        context.pipe(speaker)
        let last = Date.now()
        this.on('note', (note) => {
            console.log(Date.now() - last, JSON.stringify(note))
            last = Date.now()
            const amp: any = context.createGain()
            amp.gain.setValueAtTime(0.35, this.bufferTime + context.currentTime)
            amp.gain.linearRampToValueAtTime(.15, this.bufferTime + context.currentTime + .05)
            amp.gain.linearRampToValueAtTime(0, this.bufferTime + context.currentTime + .15)
            amp.connect(context.destination)

            const osc: any = context.createOscillator()
            osc.type = "square"
            osc.frequency.value = frequencies[note.note]
            osc.connect(amp)
            osc.start(context.currentTime + this.bufferTime)
            osc.stop(context.currentTime + this.bufferTime + .15)
            osc.onended = () => {
                osc.disconnect()
                amp.disconnect()
            }
        })

    }

    public start() {
        super.start()
    }
}

const frequencies = [
    16.35,
    17.32,
    18.35,
    19.45,
    20.60,
    21.83,
    23.12,
    24.50,
    25.96,
    27.50,
    29.14,
    30.87,
    32.70,
    34.65,
    36.71,
    38.89,
    41.20,
    43.65,
    46.25,
    49.00,
    51.91,
    55.00,
    58.27,
    61.74,
    65.41,
    69.30,
    73.42,
    77.78,
    82.41,
    87.31,
    92.50,
    98.00,
    103.83,
    110.00,
    116.54,
    123.47,
    130.81,
    138.59,
    146.83,
    155.56,
    164.81,
    174.61,
    185.00,
    196.00,
    207.65,
    220.00,
    233.08,
    246.94,
    261.63,
    277.18,
    293.66,
    311.13,
    329.63,
    349.23,
    369.99,
    392.00,
    415.30,
    440.00,
    466.16,
    493.88,
    523.25,
    554.37,
    587.33,
    622.25,
    659.25,
    698.46,
    739.99,
    783.99,
    830.61,
    880.00,
    932.33,
    987.77,
    1046.50,
    1108.73,
    1174.66,
    1244.51,
    1318.51,
    1396.91,
    1479.98,
    1567.98,
    1661.22,
    1760.00,
    1864.66,
    1975.53,
    2093.00,
    2217.46,
    2349.32,
    2489.02,
    2637.02,
    2793.83,
    2959.96,
    3135.96,
    3322.44,
    3520.00,
    3729.31,
    3951.07,
    4186.01,
    4434.92,
    4698.63,
    4978.03,
    5274.04,
    5587.65,
    5919.91,
    6271.93,
    6644.88,
    7040.00,
    7458.62,
    7902.13,
]