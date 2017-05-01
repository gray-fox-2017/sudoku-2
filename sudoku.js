"use strict"

class Sudoku {
  constructor(board_string) {
    this.problem = board_string.match(/\d{9}/g);
    this.problem = this.problem.map(arr => arr=arr.split(""));
    this.guesses = "123456789".split("");
  }

  solve() {
    // QUESTION: The first and second console.log will produce different results
    // console.log(this.problem);
    // console.log(`solve init: \n ${this.problem}`)

    
    for (let i=0; i<this.problem.length; i++) {
      for (let j=0; j<this.problem[0].length; j++) {
        this.reset_board();
        console.log(this.board());
        this.sleep(3);
        if (this.problem[i][j]==0) {
          for (let guess in this.guesses) {
            if (this.checker(i,j,this.guesses[guess])) {
              this.problem[i][j] = this.guesses[guess];
              let checkSolve = this.solve();
              if (checkSolve === true) return true;
              this.problem[i][j] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  checker(indexI, indexJ, guess){
    let hChecker=false, vChecker=true, sChecker = true;
    // Horizontal Checker
    hChecker = !this.problem[indexI].includes(guess);
    // Vertical Checker
    for (let i=0; i<this.problem.length; i++) {
      if (this.problem[i][indexJ] == guess){
        vChecker = false;
        break;
      }
    }
    // Section Checker
    let minIndexI = indexI-indexI%3;
    let minIndexJ = indexJ-indexJ%3;
    for (let i=minIndexI; i<minIndexI+3; i++) {
      for (let j=minIndexJ; j<minIndexJ+3; j++) {
        if (this.problem[i][j] == guess) {
          sChecker = false;
          break;
        }
      }
    }
    return hChecker && vChecker && sChecker;
  }

  // Returns a string representing the current state of the board
  board() {
    let printBoard = "";
    let dashLine = "---------------------";
    printBoard += dashLine + "\n";
    for (let i=0; i<this.problem.length; i++) {
      for (let j=0; j<3; j++) {
        printBoard += this.problem[i].slice(j*3,j*3+3).join(" ");
        if (j!=2) printBoard += " | ";
      }
      printBoard += "\n";
      if ((i+1)%3===0) printBoard += dashLine + "\n";
    }
    return printBoard;
  }

  reset_board() {
    console.log("\x1B[2J");
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i=0;i<1e7;i++) {
      if ((new Date().getTime()-start)>milliseconds) {
        break;
      }
    }
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)
//var game = new Sudoku("609238745274561398853947621486352179792614583531879264945723816328196457167485932")

// Remember: this will just fill out what it can and not "guess"
game.solve()

//console.log(game.board())
