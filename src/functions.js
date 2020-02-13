const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

exports.calculateWinner = function(squares) {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    let allFilled = true;
    for (let i = 0; i <= squares.length - 1; i++) {
        if (squares[i] == null) {
            allFilled = false;
        }
    }

    if (allFilled) {
        return 'draw';
    }

    return null;
};

exports.highlightWinnerIfAny = function(squares, className) {
    let resultSquares = squares.slice();

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            resultSquares[a] = '<span class="' + className + '">' + resultSquares[a] + '</span>';
            resultSquares[b] = '<span class="' + className + '">' + resultSquares[b] + '</span>';
            resultSquares[c] = '<span class="' + className + '">' + resultSquares[c] + '</span>';
            break;
        }
    }

    return resultSquares;
};

exports.getPositionFromIndex = function(index) {
    switch (index) {
        case 0:
            return "1, 1";
        case 1:
            return "2, 1";
        case 2:
            return "3, 1";
        case 3:
            return "1, 2";
        case 4:
            return "2, 2";
        case 5:
            return "3, 2";
        case 6:
            return "1, 3";
        case 7:
            return "2, 3";
        case 8:
            return "3, 3";
    }

    return "";
};
