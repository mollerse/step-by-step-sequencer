/*
  <button id="play">Play</button>
*/

export default function playPauseButton(onPlay, onPause) {
  let button = document.createElement("button");
  button.setAttribute("id", "play");
  button.innerText = "Play";
  document.body.appendChild(button);

  let playing = false;
  button.addEventListener("click", function () {
    playing = !playing;

    if (playing) {
      button.innerText = "Pause";
      onPlay();
    } else {
      onPause();
      button.innerText = "Play";
    }
  });
}
