let SC = 50;
const UNITS = 10;
const FRAMES = 100;

function clearScreen(context) {
  context.clearRect(
    -window.innerWidth,
    -window.innerHeight,
    2 * window.innerWidth,
    2 * window.innerHeight
  );
}

function writeVector(vector) {
  const gap = 20;
  clearScreen(txc);
  const x = Math.round(vector[0] * 100) / 100;
  const y = Math.round(vector[1] * 100) / 100;

  txc.fillText(x, vector[0] * SC, -vector[1] * SC - 1.5 * gap);
  txc.fillText(y, vector[0] * SC, -vector[1] * SC - 0.5 * gap);
}

function drawLine(context, vector, translate = [0, 0]) {
  const color = decideColor(context);

  context.beginPath();
  context.strokeStyle = color;
  context.moveTo(translate[0] * SC, translate[1] * SC);
  context.lineTo(
    (translate[0] + vector[0]) * SC,
    (translate[1] + vector[1]) * SC
  );
  context.stroke();
}

function drawVector(context, vector) {
  clearScreen(context);
  drawLine(context, vector);
}

function drawGrid(context, vi, vj) {
  function drawHorizontals(nth) {
    const longVi = scale(UNITS, vi);
    const oppositeLongVi = scale(-1, longVi);
    const shifterVj = scale(nth, vj);

    drawLine(context, longVi, shifterVj);
    drawLine(context, oppositeLongVi, shifterVj);
  }

  function drawVerticals(nth) {
    const longVj = scale(UNITS, vj);
    const oppositeLongVj = scale(-1, longVj);
    const shifterVi = scale(nth, vi);

    drawLine(context, longVj, shifterVi);
    drawLine(context, oppositeLongVj, shifterVi);
  }

  clearScreen(context);
  for (let i = -UNITS + 1; i < UNITS; i++) {
    drawHorizontals(i);
    drawVerticals(i);
  }
}

function startAnimation(matrix) {
  function drawTrace() {
    const lastSnapShot = vectorSnapShots[vectorSnapShots.length - 1];
    drawVector(trc, lastSnapShot[2]);
    drawGrid(trc, lastSnapShot[0], lastSnapShot[1]);
  }

  function saveSnapShot() {
    const lastSnapShot = vectorSnapShots[vectorSnapShots.length - 1];
    const newVi = multiply(matrix, lastSnapShot[0]);
    const newVj = multiply(matrix, lastSnapShot[1]);
    const newVector = multiply(matrix, lastSnapShot[2]);
    vectorSnapShots.push([newVi, newVj, newVector]);
  }

  function animate() {
    /*  
        transition

        from [1,0]     to     [a,b]
        from [0,1]            [c,d]

      */

    const lastSnapShot = vectorSnapShots[vectorSnapShots.length - 1];
    const dt = 2000 / FRAMES;
    const oneToA = matrix[0][0] - 1;
    const zeroToB = matrix[0][1] - 0;
    const zeroToC = matrix[1][0] - 0;
    const oneToD = matrix[1][1] - 1;

    for (let f = 0; f <= FRAMES; f++) {
      const p = f / FRAMES; // percent

      const newMatrix = [
        [1 + p * oneToA, 0 + p * zeroToB],
        [0 + p * zeroToC, 1 + p * oneToD],
      ];

      const temporarySnap = [];
      lastSnapShot.forEach((vector) => {
        const newVector = multiply(newMatrix, vector);
        temporarySnap.push(newVector);
      });

      setTimeout(() => {
        drawVector(vc, temporarySnap[2]);
        writeVector(temporarySnap[2]);
        drawGrid(sg, temporarySnap[0], temporarySnap[1]);
      }, f * dt);
    }
  }
  drawTrace();
  animate();
  saveSnapShot();
}
