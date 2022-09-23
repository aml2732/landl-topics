const testMidiSingleEvent1 = [144, 72, 64 ] //command, note value, velocity
const testMidiSingleEvent2 = [128, 72, 64]
//144 = note on event
//128 signals note off
//Note values (low)0-127(high)
//velocity (softest)0-127(loudest)
//command 128 === velocity 0 signifying no sound

let audioContext = new AudioContext();
let mainGainNode = null;

const keyPressedDictionary = {
    "middleC": false,
    "middleCSharp": false,
    "D": false,
    "DSharp":false,
    "E": false,
    "F": false,
    "FSharp": false,
    "G": false,
    "GSharp": false,
    "A": false,
    "ASharp": false,
    "B": false,
    "TenorC": false
}

const keyDictionary = {
    "middleC": 261.6256,
    "middleCSharp": 277.1826,
    "D": 293.6648,
    "DSharp":311.1270,
    "E": 329.6276,
    "F": 349.2282,
    "FSharp": 369.9944,
    "G": 391.9954,
    "GSharp": 415.3047,
    "A": 440,
    "ASharp": 466.1638,
    "B": 493.8833,
    "TenorC": 523.2511
}
let toneHistory = [];

function init(){
    mainGainNode = audioContext.createGain();
    mainGainNode.connect(audioContext.destination);
    mainGainNode.gain.value = 2
}

function callInitIfNotDoneAlready(){
    if(!mainGainNode){
        init();
    }
}

function testVolumeOnChange(event){
    callInitIfNotDoneAlready();
    mainGainNode.gain.value= event.target.value
}

function addToToneHistory(keyIdentifier){
    toneHistory.push(keyIdentifier)
    document.getElementById('history').innerText = toneHistory.join(" ")
}

function playTone(frequency){
    callInitIfNotDoneAlready();

    const osc = audioContext.createOscillator()
    osc.connect(mainGainNode);

    osc.type = "sine" //sine, square, sawtooth, triangle, custom
    osc.frequency.value = frequency //in Hz (440 is a standard middle-A note)
    osc.start();
    return osc;
}

function testSingleToneButtonPressed(){
    let obj = playTone(440)
    setTimeout(function(){
        obj.stop()
    }, 500)
}

function testKeyPressed(keyIdentifier){

    if(keyPressedDictionary[keyIdentifier]){return;}//key is already pressed; don't do it again.

    const toneToPlay = keyDictionary[keyIdentifier] || 440;

    keyPressedDictionary[keyIdentifier] = playTone(toneToPlay)
    addToToneHistory(keyIdentifier)
}

function testKeyReleased(keyIdentifier){
    if(keyPressedDictionary[keyIdentifier]){
        keyPressedDictionary[keyIdentifier].stop();
        keyPressedDictionary[keyIdentifier] = false;
    }
}

function replayHistory(){
    if(toneHistory.length>0){
        let nextToneToPlayIdentifier = toneHistory.shift();
        let nextToneToPlay = keyDictionary[nextToneToPlayIdentifier] || 440;
        let toneObjReference = playTone(nextToneToPlay);
        setTimeout(function(){
            toneObjReference.stop();
            replayHistory();
        }, 500)
    } else{
        return;
    }
}
