import React from 'react';

function Square(props) {
    return (
        <button
            className="square"
            onClick={props.doPlayerMovement}
        >
            {props.squareLabel}
        </button>
    );
}

export default Square;
