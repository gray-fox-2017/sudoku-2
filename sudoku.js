"use strict"

class Sudoku {
  constructor(board_string) {
    this.str = board_string
    this.boardjelek = this.board()
    this.emptyPositions = this.saveEmptyPositions()
  }

  solve() {
    let limit = 9,
    i, row, column, value, found;
    for(i = 0; i < this.emptyPositions.length;) {
      row = this.emptyPositions[i][0];
      column = this.emptyPositions[i][1];
      value = this.boardjelek[row][column];
      //console.log(row)
      // console.log(column)
      // console.log(value)
      found = false;
      while(!found && value <= limit) {
        if(this.checkValue(this.boardjelek, column, row, value)) {
          found = true;
          this.boardjelek[row][column] = value;
          i++;
        }
        else {
          value++;
        }
      }
      if(!found) {
        this.boardjelek[row][column] = 0;
        i--;
      }
      this.boardbagus()
      this.sleep(200)
      this.reset_board()
    }
    this.boardbagus()
    return this.boardjelek;
  }


  board() {
    let board = [];
    let n = 0;
    for (let i=0; i<9; i++){
      board.push([])
      for (let j=0; j<9; j++){
        board[i].push(Number(this.str[n]));
        n++;
      }
    }
    return board
  }

  boardbagus(){
    let space = `---------------------\n`
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        if(j === 8){
          space += this.boardjelek[i][j] + "\n"
        }
        else if(j === 2 || j === 5){
          space += this.boardjelek[i][j] + " | "
        }
        else {
          space += this.boardjelek[i][j] + " "
        }
      }
      if (i === 2 || i === 5 || i === 8){
        space += "\n---------------------\n"
      }
      else {
        space += "\n"
      }
    }
    console.log(space)
  }

  saveEmptyPositions(){
    let empty = [];
    for(let i = 0; i < this.boardjelek.length; i++) {
      for(let j = 0; j < this.boardjelek[i].length; j++) {
        if(this.boardjelek[i][j] === 0) {
          empty.push([i, j]);
        }
      }
    }
    return empty;
  }
  checkRow(board,row,value){
    for(let i = 0; i < board[row].length; i++) {
      if(board[row][i] === value) {
        return false;
      }
    }
    return true;
  }
  checkColumn(board,column,value){
    for(let i = 0; i < board.length; i++) {
      if(board[i][column] === value) {
        return false;
      }
    }
    return true;
  }
  checkSquare(board, column, row, value){
    let columnCorner = 0,
    rowCorner = 0,
    squareSize = 3;
    while(column >= columnCorner + squareSize) {
      columnCorner += squareSize;
    }
    while(row >= rowCorner + squareSize) {
      rowCorner += squareSize;
    }
    for(let i = rowCorner; i < rowCorner + squareSize; i++) {
      for(let j = columnCorner; j < columnCorner + squareSize; j++) {
        if(board[i][j] === value) {
          return false;
        }
      }
    }
    return true;
  }
  checkValue(board, column, row, value){
    if(this.checkRow(board, row, value) &&
    this.checkColumn(board, column, value) &&
    this.checkSquare(board, column, row, value)) {
      return true;
    } else {
      return false;
    }
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
let fs = require('fs')
let board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[5]

let game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"

//console.log(game.saveEmptyPositions(game.board()))
console.log(game.boardbagus())
game.solve()
