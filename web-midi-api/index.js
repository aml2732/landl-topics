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

//--------------------------------------------------

const FORMAT = {
    SINGLE_MULTI_CHANNEL_TRACK : 0,
    ONE_OR_MORE_SIMULTANIOUS_TRACK: 1,
    ONE_OR_MORE_SEQUENTIAL_TRACK: 2
}

const EVENTTYPE = {
    NOTE_AFTERTOUCH: 0xA,
    CONTROLLER: 0xB,
    PITCH_BEND_EVENT: 0xE,
    NOTE_OFF: 0x8,
    NOTE_ON: 0x9,
    PROGRAM_CHANTE: 0xC,
    CHANNEL_AFTERTOUCH: 0xD,
    EOF: -1
}

let audioContext2 = new AudioContext();
let mainGainNode2 = audioContext2.createGain(); //Think of 'gain' as Volume
mainGainNode2.connect(audioContext2.destination); //In order for sound to happen we must be connected to the computer's speaker system or headphones.
mainGainNode2.gain.value = 2
let simpleNoteLookup = {};
let timeDivision = 0; // 48 - 960
let timeDelta = 0;
let tempo = 120;
let beatsPerMinute = 120; //default (tempo)
let scheduledNotes = [];

function init2(){
    mainGainNode2 = audioContext2.createGain();
    mainGainNode2.connect(audioContext2.destination);
    mainGainNode2.gain.value = 2
}

function callInitIfNotDoneAlready2(){
    if(!mainGainNode2){
        init2();
    }
}


function parseEvent(eventItem){
    //Only look at channel events for now (Meta + other can wait till later)
    //notes: https://github.com/colxi/midi-parser-js/blob/310b0769399f53a209880280d8b27236175dfe17/src/main.js
    if(eventItem.metaType){
        if(eventItem.metaType == 0x51){
            console.log("setTempo meta event reached", eventItem.data)//microseconds per quarter-note
            //500000 microseconds per quarter-note = 0.5 seconds per quarter-note
            beatsPerMinute = (60*100000)/eventItem.data
            tempo = beatsPerMinute
        }
        if(eventItem.metaType == 0x2F){
            console.log("End of track reached")
        }
    }else{//regular event
        //https://github.com/colxi/midi-parser-js/wiki/MIDI-File-Format-Specifications
        callInitIfNotDoneAlready2()
        let frequency, velocity;
        switch(eventItem.type){
            case EVENTTYPE.NOTE_ON:
                console.log("Note on reached...")
                console.log("delta-times", eventItem.deltaTime)
                //deltaTime = unit = frames per second | ticks per beat
                //note number: eventItem.data[0]
                frequency = Math.pow(2, (eventItem.data[0]-69)/12)*440
                velocity = eventItem.data[1]// how long to hold
                const osc = audioContext2.createOscillator()
                osc.connect(mainGainNode2);
                osc.type = "sine" //sine, square, sawtooth, triangle, custom
                osc.frequency.value = frequency //in Hz (440 is a standard middle-A note)
                //TODO: apply velocity, (gain?) https://stackoverflow.com/questions/41042486/volume-velocity-to-gain-web-audio
                osc.start();
                if(!simpleNoteLookup[frequency]){simpleNoteLookup[frequency] = []}
                simpleNoteLookup[frequency].push(osc)
                break;
            case EVENTTYPE.NOTE_OFF:
                console.log("Note off reached...")
                frequency = Math.pow(2, (eventItem.data[0]-69)/12)*440
                // velocity is ignored because it makes no diff since we're STOPPING a sound
                if(simpleNoteLookup[frequency]){
                    simpleNoteLookup[frequency].shift().stop()
                }
                break;
            default:
                break;
        }
    }
}

function playSample(){
    console.log("Play sample using: ", window.humanReadableMidiToPlay)
    let midiToPlay = window.humanReadableMidiToPlay;
    console.log("what is audiocontext? ", audioContext2)
    timeDivision = typeof midiToPlay.timeDivision === 'number' ? midiToPlay.timeDivision : midiToPlay.timeDivision[0]
    console.log("startFramesPerSecond", startFramesPerSecond)
    switch(midiToPlay.formatType){
        case FORMAT.SINGLE_MULTI_CHANNEL_TRACK:
            break;
        case FORMAT.ONE_OR_MORE_SIMULTANIOUS_TRACK:
            console.log("got to format.one_or_more_simultanious_track")
            midiToPlay.track.forEach(function(trackItem){
                trackItem.event.forEach(function(eventItem){
                    parseEvent(eventItem)

                })
            })

            break;
        case FORMAT.ONE_OR_MORE_SEQUENTIAL_TRACK:
            break;
        default:
            break;
    }
}

//NOTE TO SELF. I THINK THESE ARE ALL TURNING OFF AND ON TOO FAST, because the LOOP happens ZIP. We need to better time when each note is played.