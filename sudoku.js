"use strict"
//src = http://stackoverflow.com/questions/18420489/recursion-backtracking-sudoku-solver-in-js
class Sudoku {
  constructor(board_string) {
    this.board = board_string.split("");
    this.big_board = [];
    this.column = []
    this.solved = [];
  }
  create(){
    // let big_board = [];
    for (let j = 0;j < 9; j++ ){
      this.column = [];
      for (let i = 0; i < 9; i++){
        this.column[i] = parseInt(this.board[i]);
      }
      this.big_board.push(this.column);
      this.board = this.board.slice(9)
    }
    console.log("Before Solve");
    console.log(this.big_board);
  }

  solve() {
    var grid = this.big_board;
    this.solveSudoku();
    this.printGrid();
  }

  // Returns a string representing the current state of the board
  board() {
  }

  solveSudoku(grid, row, col) {
    var cell = this.findUnassignedLocation(grid, row, col);
    row = cell[0];
    col = cell[1];

    // base case: if no empty cell
    if (row == -1) {
        console.log("solved");
        return true;
    }

    for (var num = 1; num <= 9; num++) {
        if ( this.noConflicts(grid, row, col, num) ) {
            grid[row][col] = num;
            if ( this.solveSudoku(grid, row, col) ) {
                return true;
            }
                    // mark cell as empty (with 0)
            grid[row][col] = 0;
        }
    }
    // trigger back tracking
    return false;
  }


  findUnassignedLocation(grid, row, col) {
    var done = false;
    var res = [-1, -1];

    while (!done) {
        if (row == 9) {
            done = true;
        }
        else {
            if (grid[row][col] == 0) {
                res[0] = row;
                res[1] = col;
                done = true;
            }
            else {
                if (col < 8) {
                    col++;
                }
                else {
                    row++;
                    col = 0;
                }
            }
        }
    }
    return res;
  }

  noConflicts(grid, row, col, num) {
    return this.isRowOk(grid, row, num) && this.isColOk(grid, col, num) && this.isBoxOk(grid, row, col, num);
  }

  isRowOk(grid, row, num) {
    for (var col = 0; col < 9; col++)
        if (grid[row][col] == num)
            return false;
    return true;
  }

  isColOk(grid, col, num) {
    for (var row = 0; row < 9; row++)
    if (grid[row][col] == num)
        return false;

    return true;
  }

  isBoxOk(grid, row, col, num) {
    row = Math.floor(row / 3) * 3;
    col = Math.floor(col / 3) * 3;

    for (var r = 0; r < 3; r++)
        for (var c = 0; c < 3; c++)
            if (grid[row + r][col + c] == num)
                return false;

    return true;
  }

  printGrid(grid) {
    var res = "";
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            res += grid[i][j];
        }
        res += "\n";
    }
    console.log(res);
  }
}
// The file has newlines at the end of each line,
// so we call split to remove it (\n)
const fs = require('fs')
let board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.solve()
//
// console.log(game.board())

//Tester
game.create();
game.solve();
