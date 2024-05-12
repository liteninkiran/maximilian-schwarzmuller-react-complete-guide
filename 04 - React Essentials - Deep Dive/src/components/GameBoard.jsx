export default function GameBoard() {
    return (
        <ol id='game-board'>
            {
                initialGameBoard.map((row, rowIndex) => (
                    <li key={rowIndex}>
                        <ol>
                            {
                                row.map((playerSymbol, colIndex) => (
                                    <li key={colIndex}>
                                        <button>{playerSymbol}</button>
                                    </li>
                                ))
                            }
                        </ol>
                    </li>
                ))
            }
        </ol>
    );
}

const initialGameBoard = [
    [null, null, 'X'],
    [null, null, null],
    [null, null, null],
];
