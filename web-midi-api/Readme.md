# Exploring Audio support in web browser, beyond just the basics:

## Resources: 
- [Web Audio Api docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Piano frequencies (Hz) and MIDI keys](https://en.wikipedia.org/wiki/Piano_key_frequencies)
- [Create the actual sound with OscillatorNode](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode)
- [Simple Synth Mozilla Demo](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Simple_synth)

## Overview of how Audio works with web audio api:
![drawing of input effects destination](img/web-audio-api.drawio.png)

## Making a sound
```javascript
//Need to setup an AudioContext to make use of the web audio api features
let audioContext = new AudioContext();
let mainGainNode = audioContext.createGain(); //Think of 'gain' as Volume 
mainGainNode.connect(audioContext.destination); //In order for sound to happen we must be connected to the computer's speaker system or headphones.
mainGainNode.gain.value = 2 //Set the volume to something other than 0

//Begin the sound creation
const osc = audioContext.createOscillator(); //Create a new "input", mathematically
osc.type = "sine" //All sounds are waves, and we're giving this one a 'sine' wave
osc.frequency.value = 440 //440 is a frequency in Hz that represents the "A" tone (middle of piano)
osc.start(); //Begin making the noise detailed above
//osc.stop(); //sometime later (maybe you have this connected to mouseup or mousedown), STOP making the noise.
```

## MIDI file format
<placeholder>

## Playing MIDI files in the browser
<placeholder>
