import playPauseButton from "../nuts-and-bolts/play-pause";
import SimpleSynth from "../nuts-and-bolts/simple-synth";
import bpmInput from "../nuts-and-bolts/bpm-input";
import padInput from "../nuts-and-bolts/pad-input";

import kick from "../samples/kick.mp3";
import crash from "../samples/crash.mp3";
import tom from "../samples/tomLow.mp3";
import hat from "../samples/hatClosed.mp3";
import ride from "../samples/ride.mp3";
import snare from "../samples/snare2.mp3";

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
  Array(16).fill(false),
  Array(16).fill(false),
  Array(16).fill(false),
];

let samples = {};

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
        switch (index) {
          case 0:
            samples["kick"]();
            break;
          case 1:
            samples["crash"]();
            break;
          case 2:
            samples["tom"]();
            break;
          case 3:
            samples["hat"]();
            break;
          case 4:
            samples["ride"]();
            break;
          case 5:
            samples["snare"]();
            break;
          default:
            break;
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

  fetch(kick)
    .then((res) => res.arrayBuffer())
    .then((buf) => audioContext.decodeAudioData(buf))
    .then((val) => {
      samples["kick"] = function () {
        let src = audioContext.createBufferSource();
        src.buffer = val;
        src.connect(audioContext.destination);
        src.start(audioContext.currentTime);
      };
    });
  fetch(crash)
    .then((res) => res.arrayBuffer())
    .then((buf) => audioContext.decodeAudioData(buf))
    .then((val) => {
      samples["crash"] = function () {
        let src = audioContext.createBufferSource();
        src.buffer = val;
        src.connect(audioContext.destination);
        src.start(audioContext.currentTime);
      };
    });
  fetch(tom)
    .then((res) => res.arrayBuffer())
    .then((buf) => audioContext.decodeAudioData(buf))
    .then((val) => {
      samples["tom"] = function () {
        let src = audioContext.createBufferSource();
        src.buffer = val;
        src.connect(audioContext.destination);
        src.start(audioContext.currentTime);
      };
    });
  fetch(hat)
    .then((res) => res.arrayBuffer())
    .then((buf) => audioContext.decodeAudioData(buf))
    .then((val) => {
      samples["hat"] = function () {
        let src = audioContext.createBufferSource();
        src.buffer = val;
        src.connect(audioContext.destination);
        src.start(audioContext.currentTime);
      };
    });
  fetch(ride)
    .then((res) => res.arrayBuffer())
    .then((buf) => audioContext.decodeAudioData(buf))
    .then((val) => {
      samples["ride"] = function () {
        let src = audioContext.createBufferSource();
        src.buffer = val;
        src.connect(audioContext.destination);
        src.start(audioContext.currentTime);
      };
    });
  fetch(snare)
    .then((res) => res.arrayBuffer())
    .then((buf) => audioContext.decodeAudioData(buf))
    .then((val) => {
      samples["snare"] = function () {
        let src = audioContext.createBufferSource();
        src.buffer = val;
        src.connect(audioContext.destination);
        src.start(audioContext.currentTime);
      };
    });

  resetState();
}

init();
loop();
