// React
import { useState } from 'react';

// Components
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';

// Data
import { WINNING_COMBINATIONS } from './winning-combinations';

const deriveActivePlayer = (gameTurns) => (
    gameTurns.length > 0 && gameTurns[0].player === 'X'
        ? 'O'
        : 'X'
);

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    const activePlayer = deriveActivePlayer(gameTurns);
    const handleSelectSquare = (rowIndex, colIndex) => {
        setGameTurns(prev => {
            const activePlayer = deriveActivePlayer(gameTurns);
            const square = { row: rowIndex, col: colIndex }
            const updatedTurns = [{ square, player: activePlayer }, ...prev];
            return updatedTurns;
        });
    }

    const gameBoard = initialGameBoard;

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }


    for (const combo of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameTurns[0];
        const secondSquareSymbol = gameTurns[0];
        const thirdSquareSymbol = gameTurns[0];
    }

    return (
        <main>
            <div id='game-container'>
                <ol id='players' className='highlight-player'>
                    <Player initialName='Player 1' symbol='X' isActive={activePlayer === 'X'} />
                    <Player initialName='Player 2' symbol='O' isActive={activePlayer === 'O'} />
                </ol>
                <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App;

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];
