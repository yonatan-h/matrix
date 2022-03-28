function scale(magnitude, vector) {
  const newVector = [vector[0] * magnitude, vector[1] * magnitude];
  return newVector;
}

function add(...vList) {
  let newVector = [0, 0];
  vList.forEach((vector) => {
    newVector[0] += vector[0];
    newVector[1] += vector[1];
  });
  return newVector;
}

function multiply(matrix, vector) {
  /*
        [a,b]   X  [vx]  ==  [a*vx + b*vy]
        [c,d]      [vy]      [c*vx + d*vy]
    
     */
  let newVector = [];
  for (let rowNum = 0; rowNum < 2; rowNum++) {
    const row = matrix[rowNum];
    const dot = row[0] * vector[0] + row[1] * vector[1];
    newVector[rowNum] = dot;
  }
  return newVector;
}
