import playPauseButton from "../nuts-and-bolts/play-pause";
import SimpleSynth from "../nuts-and-bolts/simple-synth";
import bpmInput from "../nuts-and-bolts/bpm-input";
import padInput from "../nuts-and-bolts/pad-input";

const audioContext = new AudioContext();
const synth = new SimpleSynth(audioContext);
const synth2 = new SimpleSynth(audioContext);

synth.envelope(0.25, 0.5, 0.25, 1);
synth2.envelope(0, 0.5, 0, 0);

let bpm = 90;
let notesPerBeat = 4;
let startTime = 0;

let notePlayed = 0;

let pads = [
  Array(16).fill(false),
  Array(16).fill(false),
  Array(16).fill(false),
];

function bpm2bps(bpm) {
  return bpm / 60;
}

function frame(t) {
  let bps = bpm2bps(bpm);
  let beatLength = 1 / bps;
  let noteLength = beatLength / notesPerBeat;

  let noteNumber = Math.floor(t / noteLength);

  if (noteNumber > notePlayed) {
    let relevantPad = noteNumber % pads[0].length;

    document.body.dataset["note"] = relevantPad;

    for (let [index, row] of pads.entries()) {
      if (row[relevantPad]) {
        if (index === 0) {
          synth.play(30, audioContext.currentTime, 0.25);
        } else {
          synth2.play([0, 69, 71][index], audioContext.currentTime, 0.25);
        }
      }
    }

    notePlayed++;
  }
}

function loop() {
  requestAnimationFrame(loop);
  let totalTimePassed = audioContext.currentTime - startTime;

  frame(totalTimePassed);
}

function resetState() {
  startTime = audioContext.currentTime;
  notePlayed = 0;
}

function init() {
  function onPlay() {
    audioContext.resume();
    resetState();
  }

  function onPause() {
    audioContext.suspend();
  }

  playPauseButton(onPlay, onPause);

  bpmInput(bpm, function (newBpm) {
    bpm = newBpm;
    resetState();
  });

  padInput(pads, function (row, column) {
    pads[row][column] = !pads[row][column];
  });

  resetState();
}

init();
loop();
