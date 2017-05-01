"use strict"

class Sudoku {
  constructor(board_string) {
    this._board = board_string;
  }

  checkRow(board, row, num) {
    for (let col = 0; col < 9; col++)
    if (board[row][col] == num)
    return false;

    return true;
  }

  checkCol(board, col, num) {
    for (let row = 0; row < 9; row++)
    if (board[row][col] == num)
    return false;

    return true;
  }

  check3x3(board,row,col,num) {
    row=row-row%3;
    col=col-col%3;

    for (let row=0; row<3; row++)
    for (let col=0; col<3; col++)
    if (board[row+row][col+row] == num)
    return false;

    return true;
  }

  isAvailable(board,row,col,num) {
    return this.checkRow(board,row,num) && this.checkCol(board,col,num) && this.check3x3(board,row,col,num);
  }

  findUnassignedLocation(board,row,col) {
    for (;row<9; col=0,row++)
    for (;col<9; col++)
    if (board[row][col] == 0)
    return [row,col];

    return [-1,-1];
  }

  solve(board=this._board, row=0, col=0) {
    let cell = this.findUnassignedLocation(board,row,col);
    row = cell[0];
    col = cell[1];

    if (row == -1) {
      return true;
    }

    for (let num=1; num<=9; num++) {

      if (this.isAvailable(board,row,col,num)) {
        board[row][col]=num;

        if (this.solve(board,row,col)) {
          return true;
        }
        board[row][col] = 0;
      }
    }
    return false;
  }

  board() {
    let arrSplit=this._board.split('');
    let res=[];
    for(let i=0; i<arrSplit.length;i+=9){
      let arr=[];
      for(let j=i; j<i+9; j++)
      arr.push(+arrSplit[j]);
      res.push(arr)
    }

    return this._board=res;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
let fs = require('fs')
let board_string = fs.readFileSync('set-04_peter-norvig_11-hardest-puzzles.txt')
.toString()
.split("\n")[0]

let game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log('\n')
console.log('unsolved');
console.log(game.board())
game.solve()
console.log('\n')
console.log('solved');
console.log(game._board);
