"use strict"

class Sudoku {
  constructor(board_string) {
    this.sudokuBoard = 9;
    this.boards = this.toMatrix(board_string);
    this.empty = this.get_empty();
  }

  toMatrix (board_string) {
    debugger;
    let matrix = [];
    for (let i = 0, num = 0; i < this.sudokuBoard; i++) {
      matrix.push([]);
      for (let j = 0; j < this.sudokuBoard; j++, num++) {
        matrix[i].push(parseInt(board_string[num]));
      }
    }
    return matrix;
  }

  get_empty () {
    let arr = [];
    for (let i = 0; i < this.sudokuBoard; i++) {
      for (let j = 0; j < this.sudokuBoard; j++) {
        if (this.boards[i][j] == 0) {
          arr.push([i, j]);
        }
      }
    }
    return arr;
  }

  checkColumn (value, j) {
    for (let i = 0; i < this.sudokuBoard; i++) {
      if (value == this.boards[i][j]) {
        return false;
      }
    }
    return true;
  }

  checkRow(value, i) {
    for (let j = 0; j < this.sudokuBoard; j++) {
      if (value == this.boards[i][j]) {
        return false;
      }
    }
    return true;
  }

  validate_block (value, i, j) {
    let rowStart = Math.floor(i / 3) * 3;
    let columnStart = Math.floor(j / 3) * 3;
    for (let k = rowStart; k < 9 / 3 + rowStart; k++) {
      for (let l = columnStart; l < 9 / 3 + columnStart; l++) {
        if (value == this.boards[k][l]) {
          return false;
        }
      }
    }
    return true;
  }

  validate_value (value, i, j) {
    return (this.checkColumn(value, j) && this.checkRow(value, i) && this.validate_block(value, i, j));
  }

  solve () {
    for (let i = 0; i < this.empty.length;) {
      let row = this.empty[i][0];
      let column = this.empty[i][1];
      let value = this.boards[row][column] + 1;
      let found = false;
      while (!found && value <= 9) {
        if (this.validate_value(value, row, column)) {
          found = true;
          this.boards[row][column] = value;
          i++;
        } else {
          value++;
        }
      }
      if (!found) {
        this.boards[row][column] = 0;
        i--;
      }
    }
    this.board();
  }

  // Returns a string representing the current state of the board
  board() {
    let str = "------------------------------------------\n";
    for (let i = 0; i < this.sudokuBoard; i++) {
      for (let j = 0; j < this.sudokuBoard; j++) {
        if (j == 8) {
          str += this.boards[i][j] + "\n";
        } else if (j == 2 || j == 5) {
          str += this.boards[i][j] + "   |   ";
        } else {
          str += this.boards[i][j] + "   ";
        }
      }

      if (i == 2 | i == 5 | i == 8) {
        str += "\n------------------------------------------\n"
      } else {
        str += "\n";
      }
    }
    console.log(str);
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log("SOLVED THIS SUDOKU BOARD");
game.solve()
