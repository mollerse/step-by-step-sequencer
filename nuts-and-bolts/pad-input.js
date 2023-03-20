/*
<div id="pads">
  <div data-row="0" class="row">
    <button data-pad="0" class="pad"></button>
    <button data-pad="1" class="pad"></button>
    <button data-pad="2" class="pad"></button>
    <button data-pad="3" class="pad"></button>
    <button data-pad="4" class="pad"></button>
    <button data-pad="5" class="pad"></button>
  </div>
</div>
*/

export default function pads(padSpec, onClick) {
  let container = document.createElement("div");
  container.setAttribute("id", "pads");

  let matrixMode = Array.isArray(padSpec[0]);

  if (matrixMode) {
    for (let r = 0; r < padSpec.length; r++) {
      let row = document.createElement("div");
      row.dataset["row"] = r;
      row.classList.add("row");

      for (let p = 0; p < padSpec[r].length; p++) {
        let pad = document.createElement("button");
        pad.dataset["pad"] = p;
        pad.classList.add("pad");
        if (padSpec[r][p]) pad.classList.add("on");
        row.appendChild(pad);
      }
      container.appendChild(row);
    }
  } else {
    let row = document.createElement("div");
    row.dataset["row"] = "0";
    row.classList.add("row");
    for (let p = 0; p < padSpec.length; p++) {
      let pad = document.createElement("button");
      pad.dataset["pad"] = p;
      pad.classList.add("pad");
      if (padSpec[p]) pad.classList.add("on");
      row.appendChild(pad);
    }
    container.appendChild(row);
  }

  document.body.appendChild(container);

  container.addEventListener("click", function (e) {
    let pad = e.target;
    if (pad.tagName !== "BUTTON") return;

    let row = pad.parentElement;

    let padIdx = parseInt(pad.dataset["pad"], 10);
    let rowIdx = parseInt(row.dataset["row"], 10);
    pad.classList.toggle("on");

    if (matrixMode) {
      onClick(rowIdx, padIdx);
    } else {
      onClick(padIdx);
    }
  });
}
