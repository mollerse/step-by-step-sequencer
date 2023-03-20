/*
<div class="bpm-group">
  <input
    type="range"
    id="bpm"
    value="90"
    min="1"
    max="240"
    autocomplete="off"
  />
  <label for="bpm">BPM: 90</label>
</div>
*/

export default function bpmInput(initialValue, onChange) {
  let container = document.createElement("div");
  container.classList.add("bpm-group");

  let input = document.createElement("input");
  input.setAttribute("type", "range");
  input.setAttribute("id", "bpm");
  input.setAttribute("value", `${initialValue}`);
  input.setAttribute("min", "1");
  input.setAttribute("max", "240");
  input.setAttribute("autocomplete", "off");

  let label = document.createElement("label");
  label.setAttribute("for", "bpm");
  label.innerText = `BPM: ${input.value}`;

  container.appendChild(input);
  container.appendChild(label);
  document.body.appendChild(container);

  input.addEventListener("input", function () {
    label.innerText = `BPM: ${input.value}`;
  });

  input.addEventListener("change", function () {
    let newValue = parseInt(input.value, 10);

    onChange(newValue);
  });
}
