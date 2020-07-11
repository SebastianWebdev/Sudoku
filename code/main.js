import Sudoku from "./sudoku/sudoku.js";
const sd = new Sudoku();
const benchmark = (repetitions = 100) => {
  let countSum = 0;
  let deltaSum = 0;
  let minTime = 0;
  let maxTime = 0;
  let minIter = 0;
  let maxIter = 0;
  const iterations = repetitions;
  for (let i = 0; i < iterations; i++) {
    const t1 = new Date().getTime();
    const count = sd.generateSudoku();
    const t2 = new Date().getTime();
    const delta = t2 - t1;
    if (i === 0) {
      maxTime = delta;
      minTime = delta;
      maxIter = count;
      minIter = count;
    } else {
      if (delta > maxTime) {
        maxTime = delta;
      }
      if (delta < minTime) {
      }
      if (count > maxIter) {
        maxIter = count;
      }
      if (count < minIter) {
        minIter = count;
      }
    }

    countSum += count;
    deltaSum += delta;
  }
  const avgCount = countSum / iterations;
  const avgTime = deltaSum / iterations;
  console.log("---------------------------------------------------------");
  console.log(`średnia ilośc powtórzeń: ${avgCount}`);
  console.log(`średni czas wykonania: ${avgTime}`);
  console.log(`------ maksymalne i minimalne wartości ------`);
  console.log(`Maksymalny czas: ${maxTime}`);
  console.log(`Minimalny czas czas: ${minTime}`);
  console.log(" ");
  console.log(`Maksymalna ilość powtórzeń: ${maxIter}`);
  console.log(`Minimalna ilość powtórzeń: ${minIter}`);
  console.log(" ");
};
document.getElementById("btn").addEventListener("click", (e) => {
  //benchmark(100);
  //console.log(sd.sudoku);

  const sudoku = sd.generateSudoku(2);
  console.log(sudoku);
});
//console.log(sd.sudokNumbers);
