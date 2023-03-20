import playPauseButton from "../nuts-and-bolts/play-pause";

const audioContext = new AudioContext();

let startTime = 0;

function frame(totalTimePassed) {
  console.log(totalTimePassed);
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
