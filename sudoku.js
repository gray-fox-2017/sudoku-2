"use strict"
//src = http://stackoverflow.com/questions/18420489/recursion-backtracking-sudoku-solver-in-js
class Sudoku {
  constructor(board_string) {
    // this.board = board_string.split("");
    this.column = []
    this.solved = [];
    this.length = 9;
    this.emptyPlace = this.emptyMatrix();
    this.big_board = this.create(board_string.split(""));
  }
  create(str){
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
    return this.big_board;
  }
  emptyMatrix(){
    let empty = [];
    for(let i = 0; i < this.big_board.length; i++) {
      for(let j = 0; j < this.big_board[i].length; j++) {
        if(this.big_board[i][j] === 0) {
          empty.push([i, j]);
        }
      }
    }
    console.log(empty);
    return empty;
  }

  checkRow(row,value){
    for(let i = 0; i < this.big_board[row].length; i++) {
      if(this.big_board[row][i] === value) {
        return false;
      }
    }
    return true;
  }
  checkColumn(column,value){
    for(let i = 0; i < this.big_board.length; i++) {
      if(this.big_board[i][column] === value) {
        return false;
      }
    }
    return true;
  }

  checkBlock(column, row, value){
    let rowStart = Math.floor(row / 3) * 3;
    let coloumnStart = Math.floor(column / 3) * 3;
    for (var k = rowStart; k < Math.sqrt(this.length) + rowStart ; k++) {
      for (var l = coloumnStart; l < Math.sqrt(this.length) + coloumnStart ; l++) {
        if (value == this.big_board[k][l]) {
          return false;
        }
      }
    }
    return true;
  }

  checkValue(column, row, value){
    if(this.checkRow(row, value) &&
    this.checkColumn(column, value) &&
    this.checkBlock(column, row, value)) {
      return true;
    } else {
      return false;
    }
  }

  solve() {
    let row, column, value, found;
    for(let i = 0; i < this.emptyPlace.length;) {
      row = this.emptyPlace[i][0];
      column = this.emptyPlace[i][1];
      value = this.big_board[row][column];
      found = false;
      while(!found && value <= this.length) {
        if(this.checkValue(column, row, value)) {
          found = true;
          this.big_board[row][column] = value;
          i++;
        }
        else {
          value++;
        }
      }
      if(!found) {
        this.big_board[row][column] = 0;
        i--;
      }
      // this.print_board();
      // this.sleep(100)
      // this.reset_board()
    }
    console.log("Sudoku Solve");
    this.print_board();
    return this.big_board;
  }


  print_board() {
    let layout = "+++++++++++++++++++++++\n";
    for (var i = 0; i < this.length ; i++) {
      for (var j = 0; j < this.length; j++) {
        if (j == 8) {
          layout += this.big_board[i][j] + " + ";
        } else if (j == 2 || j == 5) {
           layout += this.big_board[i][j] + " | ";
        } else {
           layout += this.big_board[i][j] + " ";
         }
      }

      if (i == 2 | i == 5 | i == 8) {
        layout += "\n+++++++++++++++++++++++\n";
      } else {
        layout += "\n"
      }
    }
    console.log(layout);
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  reset_board() {
    console.log("\x1B[2J")
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
