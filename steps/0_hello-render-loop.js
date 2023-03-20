function checkForWebAudio() {
  let hasWebAudio = !!window.AudioContext;

  let message = `WebAudio status: ${hasWebAudio ? "GOOD" : "BAD"}`;

  let messageContainer = document.createElement("p");
  messageContainer.innerText = message;
  document.body.appendChild(messageContainer);
}

let frameCounter;

function frame() {
  console.log(`frame: ${frameCounter}`);
  frameCounter++;
}

function loop() {
  requestAnimationFrame(loop);

  frame();
}

function init() {
  checkForWebAudio();

  frameCounter = 0;
}

init();
loop();
