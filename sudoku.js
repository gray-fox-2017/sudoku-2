"use strict"

class Sudoku {
  constructor(board_string) {
    this.length = 9;
    this.board = this.matrixBoard(board_string);
    this.emptyPlace = this.emptyMatrix();

  }

  matrixBoard(str) {
    let board = [];
    for (let i = 0, idx = 0; i < this.length; i++) {
      let arr = [];
      board.push(arr);
      for (let j = 0; j < this.length; j++, idx++) {
        if (str[idx] != undefined) {
          board[i].push(parseInt(str[idx]));
        } else {
          board[i].push(0);
        }
      }
    }
    return board;
  }

  emptyMatrix(){
    let empty = [];
    for(let i = 0; i < this.board.length; i++) {
      for(let j = 0; j < this.board[i].length; j++) {
        if(this.board[i][j] === 0) {
          empty.push([i, j]);
        }
      }
    }
    return empty;
  }

  checkRow(row,value){
    for(let i = 0; i < this.board[row].length; i++) {
      if(this.board[row][i] === value) {
        return false;
      }
    }
    return true;
  }
  checkColumn(column,value){
    for(let i = 0; i < this.board.length; i++) {
      if(this.board[i][column] === value) {
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
        if (value == this.board[k][l]) {
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
      value = this.board[row][column];
      found = false;
      while(!found && value <= this.length) {
        if(this.checkValue(column, row, value)) {
          found = true;
          this.board[row][column] = value;
          i++;
        }
        else {
          value++;
        }
      }
      if(!found) {
        this.board[row][column] = 0;
        i--;
      }
      // this.print_board();
      // this.sleep(100)
      // this.reset_board()
    }
    console.log("Sudoku Solve");
    this.print_board();
    return this.board;
  }


  print_board() {
    let layout = "+++++++++++++++++++++++\n";
    for (var i = 0; i < this.length ; i++) {
      for (var j = 0; j < this.length; j++) {
        if (j == 8) {
          layout += this.board[i][j] + " + ";
        } else if (j == 2 || j == 5) {
           layout += this.board[i][j] + " | ";
        } else {
           layout += this.board[i][j] + " ";
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
var fs = require('fs')
var board_string = fs.readFileSync('set-04_peter-norvig_11-hardest-puzzles.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"

game.print_board()
game.solve()
//
// console.log(game.board())
