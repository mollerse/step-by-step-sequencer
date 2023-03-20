import playPauseButton from "../nuts-and-bolts/play-pause";
import SimpleSynth from "../nuts-and-bolts/simple-synth";
import bpmInput from "../nuts-and-bolts/bpm-input";
import padInput from "../nuts-and-bolts/pad-input";

const audioContext = new AudioContext();
const synth = new SimpleSynth(audioContext);

let bpm = 90;
let notesPerBeat = 4;
let startTime = 0;

let notePlayed = 0;

let pads = Array(16).fill(false);

function bpm2bps(bpm) {
  return bpm / 60;
}

function frame(t) {
  let bps = bpm2bps(bpm);
  let beatLength = 1 / bps;
  let noteLength = beatLength / notesPerBeat;

  let noteNumber = Math.floor(t / noteLength);

  if (noteNumber > notePlayed) {
    let relevantPad = noteNumber % pads.length;

    document.body.dataset["note"] = relevantPad;

    if (pads[relevantPad]) synth.play(69, audioContext.currentTime, 0.25);

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

  padInput(pads, function (index) {
    pads[index] = !pads[index];
  });

  resetState();
}

init();
loop();
