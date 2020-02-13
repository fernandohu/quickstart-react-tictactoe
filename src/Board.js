import React from "react";

import Square from "./Square";

class Board extends React.Component {
    render() {
        return (
            <div>
                {Array(3).fill(null).map((item, index) => {
                    return this.renderBoardRow(index * 3);
                })}
            </div>
        );
    }

    renderBoardRow(lineIndex) {
        return (
            <div className="board-row" key={lineIndex}>
                {Array(3).fill(null).map((item, index) => {
                    return this.renderBoardSquare(lineIndex + index);
                })}
            </div>
        );
    }

    renderBoardSquare(squareIndex) {
        return (
            <Square key={squareIndex}
                squareLabel={this.props.squares[squareIndex]}
                doPlayerMovement={() => this.props.doPlayerMovement(squareIndex)}
            />
        );
    }
}

export default Board;
