import React from 'react';

function Square(props) {
    return (
        <button
            className="square"
            onClick={props.doPlayerMovement}
            dangerouslySetInnerHTML={{__html:props.squareLabel}}
        >
        </button>
    );
}

export default Square;
