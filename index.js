function checkForWebAudio() {
  let hasWebAudio = !!window.AudioContext;

  let message = `WebAudio status: ${hasWebAudio ? "GOOD" : "BAD"}`;

  let messageContainer = document.createElement("p");
  messageContainer.innerText = message;
  document.body.appendChild(messageContainer);
}

function frame() {}

function loop() {
  requestAnimationFrame(loop);
  frame();
}

function init() {
  checkForWebAudio(); // You can delete this after you've checked that WebAudio is ok.
}

init();
loop();
