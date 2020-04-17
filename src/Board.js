import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

 // chance light starts on:
 // needs to receive float (or int converted to probability value .00 to 1.00)
 // default to 0.5
 // 

function Board({ nrows, ncols, chanceLightStartsOn=0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  // TODO: create array-of-arrays of true/false values
  function createBoard() {
    let initialBoard = [];
    //push array of size ncols into each row
    for (let row=0; row < nrows; row++){
      initialBoard.push(new Array(ncols));
      for (let col=0; col < ncols; col++) {
        initialBoard[row][col]=getRandomBool(chanceLightStartsOn);
      }
    }
    return initialBoard;
  }

  // returns bool with weighted probability.
  // ex: 0.65 has 65% chance of returning true
  const getRandomBool = (prob) => (Math.random() >= 1-prob);

  // player wins when all board array elements contain false
  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
}

export default Board;
