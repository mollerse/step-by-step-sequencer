import playPauseButton from "../nuts-and-bolts/play-pause";

const audioContext = new AudioContext();

let bpm = 90;
let notesPerBeat = 4;
let startTime = 0;

function bpm2bps(bpm) {
  return bpm / 60;
}

function frame(t) {
  let bps = bpm2bps(bpm);
  let beatLength = 1 / bps;
  let noteLength = beatLength / notesPerBeat;

  let noteNumber = Math.floor(t / noteLength) % notesPerBeat;
  let beatNumber = Math.floor(t / beatLength);

  console.log(beatNumber, noteNumber);
}

function loop() {
  requestAnimationFrame(loop);
  let totalTimePassed = audioContext.currentTime - startTime;

  frame(totalTimePassed);
}

function init() {
  function onPlay() {
    audioContext.resume();
  }

  function onPause() {
    audioContext.suspend();
  }

  playPauseButton(onPlay, onPause);

  startTime = audioContext.currentTime;
}

init();
loop();
