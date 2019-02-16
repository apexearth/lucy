var Speaker = require('audio-speaker/stream');
var Generator = require('audio-generator/stream');

Generator(function (time) {
    //panned unisson effect
    var τ = Math.PI * 2;
    return [Math.cos(τ * time * 441), Math.cos(τ * time * 439), Math.sin(τ * time * 437), Math.sin(τ * time * 443)];
})
    .pipe(Speaker({
        //PCM input format defaults, optional.
        //channels: 2,
        //sampleRate: 44100,
        //byteOrder: 'LE',
        //bitDepth: 16,
        //signed: true,
        //float: false,
        //interleaved: true,
    }));
