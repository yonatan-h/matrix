const zoom = document.querySelector(".zoom");
const go = document.querySelector(".go");
const takeVector = document.querySelector(".takeVector");
const back = document.querySelector(".back");

const matrixNum = document.querySelectorAll(".matrix_container > div>  input");
const vectorNum = document.querySelectorAll(".vector_container > input");

const controls = document.querySelector(".controls");
const vectorContainer = document.querySelector(".vector_container");

function drawArt() {
  clearScreen(ac);
  if (vectorSnapShots.length <= 1) return;

  const color = decideColor(ac);
  ac.strokeStyle = color;
  for (let i = 0; i < vectorSnapShots.length - 1; i++) {
    const point1 = vectorSnapShots[i][2];
    const point2 = vectorSnapShots[i + 1][2];

    ac.beginPath();
    ac.moveTo(point1[0] * SC, point1[1] * SC);
    ac.lineTo(point2[0] * SC, point2[1] * SC);
    ac.stroke();
  }
}

function drawEveryCanvas() {
  const lastSnapShot = vectorSnapShots[vectorSnapShots.length - 1];

  //take care of trace canvas
  if (vectorSnapShots.length >= 2) {
    const traceSnapShot = vectorSnapShots[vectorSnapShots.length - 2];
    drawVector(trc, traceSnapShot[2]);
    drawGrid(trc, traceSnapShot[0], traceSnapShot[1]);
  }

  //take care of slant grid and vector canvas
  drawVector(vc, lastSnapShot[2]);
  drawGrid(sg, lastSnapShot[0], lastSnapShot[1]);

  //take care of normal grid canvas
  clearScreen(ng);
  drawGrid(ng, [1, 0], [0, 1]);

  //take care of vector numbers
  writeVector(lastSnapShot[2]);

  //take care of art
  drawArt();
}

function collectNumAndAnimate() {
  const firstRow = [matrixNum[0].value, matrixNum[1].value];
  const secondRow = [matrixNum[2].value, matrixNum[3].value];
  const newMatrix = [firstRow, secondRow];
  startAnimation(newMatrix);
  drawArt();
}

function undoAction() {
  if (vectorSnapShots.length > 1) {
    vectorSnapShots.pop();
    drawEveryCanvas();
  }
}
function zoomEveryCanvas() {
  SC = zoom.value;
  drawEveryCanvas();
}

function collectNumAndSnap(firstTime = false) {
  let vi = [1, 0];
  let vj = [0, 1];
  let vector = [];

  if (firstTime == true) {
    vector = [0, 0];
  } else {
    vector = [vectorNum[0].value, vectorNum[1].value];
    controls.classList.toggle("switchOn");
    vectorContainer.classList.toggle("switchOff");
  }

  vectorSnapShots = [[vi, vj, vector]];
  drawEveryCanvas();
}
let vectorSnapShots;
collectNumAndSnap(true);

takeVector.addEventListener("click", collectNumAndSnap);
go.addEventListener("click", collectNumAndAnimate);
back.addEventListener("click", undoAction);
zoom.addEventListener("input", zoomEveryCanvas);
