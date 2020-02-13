import React from "react";

import Board from "./Board";
import { calculateWinner, getPositionFromIndex, highlightWinnerIfAny } from "./functions";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getFirstState();

        this.state.reverse = false;
    }

    render() {
        return (
            <div>
                <h1>Hello World - Tic Tac Toe</h1>
                <div className="game">
                    <div className="game-board">
                        <h4>Player 1: X &nbsp;&nbsp; Player 2: O</h4>
                        <Board
                            squares={this.getCurrentMoveSquares()}
                            doPlayerMovement={(i) => this.doPlayerMovement(i)}
                        />
                        <p dangerouslySetInnerHTML={{__html: this.getMoveDescription()}}></p>
                    </div>
                    <div className="game-info">
                        <p className="moves-history-title">
                            <strong>Moves History:</strong>
                            (<input
                                type="checkbox"
                                checked={this.state.reverse}
                                onChange={this.reverseClick}
                                id="reverse" />reverse?)
                        </p>
                        <ol>{this.getMovesListHistory()}</ol>
                    </div>
                </div>
            </div>
        );
    }

    getCurrentMoveSquares() {
        return highlightWinnerIfAny(this.state.history[this.state.stepNumber].squares, 'square-winner');
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
                movePosition: getPositionFromIndex(i),
                squares: currentSquares
            }),
            stepNumber: historyCopy.length,
            xIsNext: !this.state.xIsNext
        };

        this.setState(newState);
    }

    getMoveDescription() {
        const winner = calculateWinner(this.getCurrentMoveSquares());

        switch(winner) {
            case 'draw':
                return '<span class="description winner">Draw: No winner!</span>';
            case 'O':
            case 'X':
                return '<span class="description winner">Winner: ' + (winner == 'X' ? 'Player 1' : 'Player 2') + '</span>';
            default:
                return '<span class="description"><u>Next</u>: ' + (((this.state.xIsNext) ? 'Player 1' : 'Player 2') + '</span>');
        }
    }

    reverseClick = () => {
        this.setState({reverse: !this.state.reverse});
    };

    getMovesListHistory() {
        let movesHistory = this.state.history.map((step, move, position) => {
            const desc = move ?
                'Go to move #' + move + ' (' + step.movePosition + ')':
                'Go to game start';

            return (
                <li key={move}>
                    <button
                        style={this.state.stepNumber == move ? {fontWeight: 'bold'} : {}}
                        onClick={() => this.jumpToHistoryMove(move)}
                    >{desc}</button>
                </li>
            );
        });

        if (this.state.reverse) {
            return movesHistory.reverse();
        }

        return movesHistory;
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
            movePosition: "",
            xIsNext: true
        };
    }
}

export default Game;
