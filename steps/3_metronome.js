import playPauseButton from "../nuts-and-bolts/play-pause";
import SimpleSynth from "../nuts-and-bolts/simple-synth";
import bpmInput from "../nuts-and-bolts/bpm-input";

const audioContext = new AudioContext();
const synth = new SimpleSynth(audioContext);

let bpm = 90;
let notesPerBeat = 4;
let startTime = 0;

let beatPlayed = 0;

function bpm2bps(bpm) {
  return bpm / 60;
}

function frame(t) {
  let bps = bpm2bps(bpm);
  let beatLength = 1 / bps;
  let noteLength = beatLength / notesPerBeat;

  let noteNumber = Math.floor(t / noteLength);
  let beatNumber = Math.floor(t / beatLength);

  if (beatNumber > beatPlayed) {
    synth.play(69, audioContext.currentTime, 0.25);
    beatPlayed++;
  }
}

function loop() {
  requestAnimationFrame(loop);
  let totalTimePassed = audioContext.currentTime - startTime;

  frame(totalTimePassed);
}

function resetState() {
  startTime = audioContext.currentTime;
  beatPlayed = 0;
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

  resetState();
}

init();
loop();
