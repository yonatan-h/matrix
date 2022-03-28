const normalGridC = document.querySelector("#normalGridC");
const artC = document.querySelector("#artC");
const traceC = document.querySelector("#traceC");
const slantGrid = document.querySelector("#slantGrid");
const vectorC = document.querySelector("#vectorC");
const textC = document.querySelector("#textC");

const canvasList = [normalGridC, artC, traceC, slantGrid, vectorC, textC];

canvasList.forEach((canvas) => {
  canvas.height = 0.99 * window.innerHeight;
  canvas.width = 0.99 * window.innerWidth;
});

const ng = normalGridC.getContext("2d");
const ac = artC.getContext("2d");
const trc = traceC.getContext("2d");
const sg = slantGrid.getContext("2d");
const vc = vectorC.getContext("2d");
const txc = textC.getContext("2d");

const contextList = [ng, ac, trc, sg, vc, txc];

contextList.forEach((context) => {
  context.translate(window.innerWidth / 2, window.innerHeight / 2);
  context.scale(1, -1);
  context.lineWidth = 1.5;
});

//textC's context should not have been flipped, so reverse it
txc.scale(1, -1);
txc.font = "1rem Arial";

function decideColor(context) {
  let color;

  if (context == ng) {
    color = "grey";
  } else if (context == trc) {
    color == "lightblue";
  } else if (context == sg) {
    color = "blue";
  } else if (context == vc) {
    color = "green";
  } else if (context == ac) {
    color = "red";
  } else {
    color = "black";
  }
  return color;
}
