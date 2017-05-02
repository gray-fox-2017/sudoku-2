"use strict"

class Sudoku {
  constructor(board_string) {
    this.sudokuArr = this.sudokuArray(board_string);
    this.guessNum = '123456789'.split('')
  }

  // make sudoku board on array 2D
  sudokuArray(sudokuStr){
    let regx = /\d{9}/g;
    let arr = sudokuStr.match(regx);
    let boardArr = []
    for (let i = 0; i < arr.length; i++) {
      let row =[]
      for (let j=0; j < arr[i].length; j++){
        row.push(+arr[i][j]);
      }
      boardArr.push(row);
    }
    return boardArr;
  }

  // empty location
  findEmpty(){
    let location = []
    for (let i=0; i<this.sudokuArr.length; i++){
      for (let j=0; j<this.sudokuArr[i].length; j++){
        if(this.sudokuArr[i][j]===0){
          location.push([i, j]);
        }
      }
    }
    return location;
  }

  // get list of row value
  valueRow(row){
    let rowArr = []
    for (let i=0; i<this.sudokuArr.length; i++){
      rowArr.push(this.sudokuArr[row][i]);
    }
    return rowArr;
  }

  // get list of column value
  valueColumn(col){
    let columnArr = []
    for (let i=0; i<this.sudokuArr.length; i++){
      columnArr.push(this.sudokuArr[i][col])
    }
    return columnArr;
  }

  // get list of box value
  boxValue(row, col){
    row = Math.floor(row / 3) * 3;
    col = Math.floor(col / 3) * 3;
    let boxArr = []
    for (var r = row; r < row+3; r++){
      for (var c = col; c < col+3; c++) {
        boxArr.push(this.sudokuArr[r][c])
      }
    }
    return boxArr;
  }

  solve() {
      for(let i=0; i<this.findEmpty().length; i++){
        let xZero = this.findEmpty()[i][0]; // get zero x coordinate
        let yZero = this.findEmpty()[i][1]; // get zero y coordinate
        let zeroRow = this.valueRow(xZero); // get list of value of row / horizontal; based on zero x coordinate
        let zeroColumn = this.valueColumn(yZero); // get list of value of column / vertical; based on zero y coordinate
        let zeroBox = this.boxValue(xZero, yZero); // get list of value of box area; based on zero x and y coordinate

        for (let j=0; j<this.guessNum.length; j++){
          if(zeroBox.indexOf(+this.guessNum[j]) == -1 && zeroColumn.indexOf(+this.guessNum[j]) == -1 && zeroBox.indexOf(+this.guessNum[j]) == -1){
            this.sudokuArr[xZero][yZero] = +this.guessNum[j]; // if guessNum not a part of list (row, colum and box), then push guessNum into that sudokuArr (based on index of zero)
            if (this.solve(this.sudokuArr)) {
              return true;
            }
            this.sudokuArr[xZero][yZero] = 0;
          }
        }
    }

    return this.sudokuArr;
  }

  // solver() {
  //   this.solve(this.sudokuArr);
  //   return this.sudokuArr;
  // }

  // Returns a string representing the current state of the board
  board() {
    let result =[]
    for(let i=0; i<this.sudokuArr.length; i++){
      let row=[]
      for (let j=0; j<this.sudokuArr.length; j+=3){
        if(j<4){
          row.push(`${this.solve()[i][j]} ${this.solve()[i][j+1]} ${this.solve()[i][j+2]} | `)
        } else {
          row.push(`${this.solve()[i][j]} ${this.solve()[i][j+1]} ${this.solve()[i][j+2]}`)
        }
      }
      let rows = row.join(' ')
      result.push(rows);
      if(i==2 || i==5){
        result.push('-----------------------')
      }
    }
    return result.join('\n')
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
game.solve()

console.log(game.board())
