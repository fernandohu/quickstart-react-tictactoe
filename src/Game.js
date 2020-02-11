import React from "react";

import Board from "./Board";
import calculateWinner from "./functions";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getFirstState();
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={this.getCurrentMoveSquares()}
                        doPlayerMovement={(i) => this.doPlayerMovement(i)}
                    />
                    <p>{this.getMoveDescription()}</p>
                </div>
                <div className="game-info">
                    <ol>{this.getMovesList()}</ol>
                </div>
            </div>
        );
    }

    getMovesList() {
        return this.state.history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';

            return (
                <li key={move}>
                    <button onClick={() => this.jumpToHistoryMove(move)}>{desc}</button>
                </li>
            );
        });
    }

    getMoveDescription() {
        const winner = calculateWinner(this.getCurrentMoveSquares());

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + ((this.state.xIsNext) ? 'X' : 'O');
        }

        return status;
    }

    getCurrentMoveSquares() {
        return this.state.history[this.state.stepNumber].squares;
    }

    doPlayerMovement(i) {
        const historyCopy = this.state.history.slice(0, this.state.stepNumber + 1);
        const currentHistory = historyCopy[historyCopy.length - 1];
        const currentSquares = currentHistory.squares.slice();

        if (calculateWinner(currentSquares) || currentSquares[i]) {
            return;
        }

        currentSquares[i] = this.state.xIsNext ? 'X' : 'O';

        const newState = {
            history: historyCopy.concat({
                squares: currentSquares
            }),
            stepNumber: historyCopy.length,
            xIsNext: !this.state.xIsNext
        };

        this.setState(newState);
    }

    jumpToHistoryMove(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    getFirstState() {
        const blankHistoryItem = {
            squares: Array(9).fill(null)
        };

        return {
            history: [blankHistoryItem],
            stepNumber: 0,
            xIsNext: true
        };
    }
}

export default Game;
