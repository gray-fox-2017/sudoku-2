"use strict"

class Sudoku {
  constructor(board_string) {
    this.firstBoard = this.sudokuArray(board_string);
    this.sudokuArray = this.sudokuArray(board_string);
    this.sudokuZeroIndex = this.getZeroIndex();
    this.sudokuGuess = "123456789".split("");

  }

  // return 2D array of sudoku
  sudokuArray(sudokuStr) {
    let regx = /\d{9}/g;
    let arr = sudokuStr.match(regx)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("")
    }
    return arr;
  }

  // return array of zero index
  getZeroIndex() {
    // make 2D array of index values of zero
    let indexArr = []
    for (let i = 0; i < this.sudokuArray.length; i++) {
      for (let j = 0; j < this.sudokuArray.length; j++) {
        let tempIndex = [];
        if (this.sudokuArray[i][j] == 0) {
          tempIndex.push(i);
          tempIndex.push(j);
          indexArr.push(tempIndex);
        }
      }
    }
    return indexArr;
  }

  // checkAll(row, column) {
  //   if (rowArr.indexOf(this.sudokuGuess[j]) == -1 && columnArr.indexOf(this.sudokuGuess[j]) == -1 && boxArr.indexOf(this.sudokuGuess[j]) == -1) {
  //     this.sudokuArray[xZero][yZero] = this.sudokuGuess[j];
  //   } else {
  //     continue;
  //   }
  // }

  // return horizontal array of checked value
  horizontalArr(row) {
    let horizontalArr = [];
    for (let i = 0; i < this.sudokuArray.length; i++) {
      horizontalArr.push(this.sudokuArray[row][i]);
    }
    return horizontalArr;
  }

  //return vertical array of checked value
  verticalArr(column) {
    let vertikalArr = [];
    for (let i = 0; i < this.sudokuArray.length; i++) {
      vertikalArr.push(this.sudokuArray[i][column]);
    }
    return vertikalArr;
  }

  // return box array of checked value
  boxArr(x, y) {
    let boxCheckArr = [];
    let borderBox = this.boxGroup(x, y);
    let xMin = borderBox[0];
    let xMax = borderBox[1];
    let yMin = borderBox[2];
    let yMax = borderBox[3];
    for (let i = xMin; i < xMax; i++) {
      for (let j = yMin; j < yMax; j++) {
        boxCheckArr.push(this.sudokuArray[i][j]);
      }
    }
    return boxCheckArr;
  }

  // return box's border index [Xmin, Xmax, Ymin, Ymax]
  boxGroup(x, y) {
    if (x < 3 && y < 3) {
      return [0,3,0,3];
    } else if (x < 6 && y < 3) {
      return [3,6,0,3];
    } else if (x < 9 && y < 3) {
      return [6,9,0,3];
    } else if (x < 3 && y < 6) {
      return [0,3,3,6];
    } else if (x < 6 && y < 6) {
      return [3,6,3,6];
    } else if (x < 9 && y < 6) {
      return [6,9,3,6];
    } else if (x < 3 && y < 9) {
      return [0,3,6,9];
    } else if (x < 6 && y < 9) {
      return [3,6,6,9];
    } else if (x < 9 && y < 9) {
      return [6,9,6,9];
    }
  }

  // Pick a starting point.
  //   while(Problem is not solved)
  //   	For each path from the starting point.
  //   		check if selected path is safe, if yes select it
  //                   and make recursive call to rest of the problem
  //   		If recursive calls returns true, then return true.
  //   		else undo the current move and return false.
  //   	End For
  //   	If none of the move works out, return false, NO SOLUTON.
  backtrack(sudokuArr) {

    this.sudokuArray = sudokuArr;

    if (this.sudokuZeroIndex[0] == undefined) {return true;}

    for (let i = 0; i < this.sudokuZeroIndex.length; i++) {
      let xZero = this.sudokuZeroIndex[i][0];
      let yZero = this.sudokuZeroIndex[i][1];
      let rowArr = this.horizontalArr(xZero);
      let columnArr = this.verticalArr(yZero);
      let boxArr = this.boxArr(xZero, yZero);

      for (let j = 0; j < this.sudokuGuess.length; j++) {
        if (rowArr.indexOf(this.sudokuGuess[j]) == -1 && columnArr.indexOf(this.sudokuGuess[j]) == -1 && boxArr.indexOf(this.sudokuGuess[j]) == -1) {
          this.sudokuArray[xZero][yZero] = this.sudokuGuess[j];
          // this.sudokuZeroIndex[i].shift();

          // recursive with updated sudokuArray
          if (this.backtrack(this.sudokuArray)) {return true;}

          // undo last move
          this.sudokuArray[xZero][yZero] = 0;
          // this.sudokuZeroIndex(unshift());
        }
      }
    }
    return false;
  }

  solve() {
    this.backtrack(this.sudokuArray);
    return this.sudokuArray;
  }

  // Returns a string representing the current state of the board
  solvedBoard() {
    console.log(this.solve());
  }

  unsolvedBoard() {
    console.log(this.firstBoard);
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
