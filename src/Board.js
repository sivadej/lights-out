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

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.5 }) {
	const [board, setBoard] = useState(createBoard());

	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
	// TODO: create array-of-arrays of true/false values
	function createBoard() {
		let initialBoard = [];
		//push array of size ncols into each row, then insert bool into each element
		for (let row = 0; row < nrows; row++) {
			initialBoard.push(new Array(ncols));
			for (let col = 0; col < ncols; col++) {
				initialBoard[row][col] = getRandomBool(chanceLightStartsOn);
			}
		}
		console.log(`creating board rows ${nrows} cols ${ncols} with ${chanceLightStartsOn * 100}% chance of true`);
		return initialBoard;
	}

	// hasWon bool: player wins when all board array elements contain false
	const hasWon = (board) => board.flat().every(el => !el);

	console.table(board);

	function flipCellsAround(coord) {
		setBoard(oldBoard => {
			const [y, x] = coord.split("-").map(Number);

			const flipCell = (y, x, boardCopy) => {
				// if this coord is actually on board, flip it

				if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
					boardCopy[y][x] = !boardCopy[y][x];
				}
			};

			const boardCopy = oldBoard.map(row => [...row]);
			flipCell(y, x, boardCopy);
			flipCell(y, x - 1, boardCopy);
			flipCell(y, x + 1, boardCopy);
			flipCell(y - 1, x, boardCopy);
			flipCell(y + 1, x, boardCopy);
			return boardCopy;
		});
	}

	// if the game is won, just show a winning msg & render nothing else
	if (hasWon([true, false])) return (<h1>YOU WIN</h1>)
	// TEMP passed in dummy array to keep win condition check off

	// TODO
	// make table board
	let htmlBoard = [];

	for (let y=0; y<nrows; y++) {
		let row = [];
		for (let x=0;x<ncols;x++){
			let coord = `${y}-${x}`;
			row.push(
				<Cell key={coord} isLit={board[y][x]} flipCellsAroundMe={()=>flipCellsAround(coord)}/>
			);
		}
		htmlBoard.push(<tr key={y}>{row}</tr>);
	}

	return (
		<div>
			<p>Board with rows {nrows} cols {ncols} with {chanceLightStartsOn * 100}% chance of lights on</p>
			<p>{hasWon(board) ? 'winner' : 'no winner yet'}</p>
			<table>
				<tbody>{htmlBoard}</tbody>
			</table>
		</div>
	)
}

// returns bool with weighted probability.
// ex: 0.65 has 65% chance of returning true
const getRandomBool = (prob) => (Math.random() >= 1 - prob);

export default Board;
