"use strict";
import Rect from "./sudokuRect.js";
class Sudoku {
  #sudokuArray = [];
  flag = false;
  constructor() {
    this.#sudokuArray = this.initializeSudoku();
  }

  initializeSudoku() {
    // creating sudoku array with init values
    const sudoku = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push(new Rect(i, j));
      }
      sudoku.push(row);
    }
    return sudoku;
  }
  eliminateNumbersToChoose(number, row, col, sudoku = []) {
    //Eliminate numbers in Row
    // console.log(row);
    //console.log(sudoku);

    for (let i = col + 1; i < 9; i++) {
      sudoku[row][i].removeNumber(number);
    }
    // eliminate numbers in Column
    for (let i = row + 1; i < 9; i++) {
      sudoku[i][col].removeNumber(number);
    }
    // eliminate numbers in small sudokuRect
    const rowCoord = row % 3;
    const colCoord = col % 3;
    const bigCol = Math.floor(col / 3);
    const bigRow = Math.floor(row / 3);

    const rectRowArr = [0, 1, 2];
    const rectColArr = [0, 1, 2];

    const finalLocalRows = rectRowArr.filter((item) => item > rowCoord);
    const finalLocalCols = rectColArr.filter((item) => item !== colCoord);

    finalLocalRows.forEach((finalrow) => {
      const totalRowNumber = finalrow + 3 * bigRow;

      for (let i = 0; i < finalLocalCols.length; i++) {
        const totalColNumber = finalLocalCols[i] + 3 * bigCol;
        sudoku[totalRowNumber][totalColNumber].removeNumber(number);
      }
      // eliminate Errors
    });
    return sudoku;
  }
  errorCorrection(row, col, sudoku) {
    // corection for rows
    if (row > 0 && col > 2 && col < 6) {
      const numbersToCheck = sudoku[row][col].numbersToChoose;
      const corespondingNumbers = sudoku[row][col + 3].numbersToChoose;
      // comparing arrays
      const testNumbers = numbersToCheck.filter(
        (number) => corespondingNumbers.indexOf(number) === -1
      );
      const choosedNumber = testNumbers.length > 0 ? testNumbers[0] : 0;

      /*console.log(numbersToCheck);
      console.log(corespondingNumbers);

      console.log(choosedNumber);
      console.log(row);
      console.log("--------------------------------------------------");*/
      return choosedNumber;
    }
    return 0;
  }
  checkSudoku(sudoku = []) {
    const sudokuNumbers = this.getSudokuNumbers([...sudoku]);
    let sudokuSum = 0;
    sudokuNumbers.forEach((row) => {
      row.forEach((number) => {
        sudokuSum += number;
      });
    });
    if (sudokuSum === 405) {
      return true;
    } else {
      return false;
    }
  }
  createSudoku() {
    const sudoku = this.initializeSudoku();
    sudoku.forEach((row) => {
      row.forEach((rect) => {
        const { number, index } = rect.drawNumber(
          this.errorCorrection(rect.row, rect.column, sudoku)
        );
        return this.eliminateNumbersToChoose(
          number,
          rect.row,
          rect.column,
          sudoku
        );
      });
    });
    return sudoku;
  }
  generateSudoku() {
    this.flag = false;
    let index = 0;
    while (!this.flag && index < 10000) {
      const tempSudoku = this.createSudoku();
      const flag = this.checkSudoku(tempSudoku);
      if (flag) {
        this.#sudokuArray = tempSudoku;
        this.flag = flag;
        // console.log(index);
        //console.log(this.getSudokuNumbers(tempSudoku));
        return index;
      }
      index++;
    }
    //this.#sudokuArray = this.createSudoku();
    //const flag = this.checkSudoku([...this.#sudokuArray]);
    //console.log(flag);
    //console.log(this.getSudokuNumbers(this.#sudokuArray));
  }
  getSudokuNumbers(sudoku = []) {
    const sudokuNumbersArr = [];
    sudoku.forEach((row) => {
      const newRow = [];
      row.forEach((rect) => {
        newRow.push(rect.number);
      });
      sudokuNumbersArr.push(newRow);
    });
    return sudokuNumbersArr;
  }
  // Getters
  /*get sudokuNumbers() {
    const sudokuNumbersArr = [];
    this.#sudokuArray.forEach((row) => {
      const newRow = [];
      row.forEach((rect) => {
        newRow.push(rect.number);
      });
      sudokuNumbersArr.push(newRow);
    });
    return sudokuNumbersArr;
  }*/
  test() {
    /* this.#sudokuArray.forEach((row) => {
      row.forEach((rect) => {
        console.log(rect);
      });
    });*/
  }
}
export default Sudoku;
//this.errorCorrection(rect.row, rect.column, sudoku)
