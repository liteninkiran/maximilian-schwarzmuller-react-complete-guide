// React
import { useState } from 'react';

// Components
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import Player from './components/Player';
import Log from './components/Log';

// Data
import { WINNING_COMBINATIONS } from './winning-combinations';

const deriveActivePlayer = (gameTurns) => (
    gameTurns.length > 0 && gameTurns[0].player === 'X'
        ? 'O'
        : 'X'
);

const deriveWinner = (gameBoard, players) => {
    let winner = undefined;

    for (const combo of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combo[0].row][combo[0].column];
        const secondSquareSymbol = gameBoard[combo[1].row][combo[1].column];
        const thirdSquareSymbol = gameBoard[combo[2].row][combo[2].column];
        if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
        ) {
            winner = players[firstSquareSymbol];
        }
    }

    return winner;
}

const deriveGameBoard = (gameTurns) => {
    const gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

    for (const turn of gameTurns) {
        const { square, player } = turn;
        const { row, col } = square;
        gameBoard[row][col] = player;
    }

    return gameBoard;
}

function App() {
    const [players, setPlayers] = useState(PLAYERS);
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
    const hasDraw = gameTurns.length === 9 && !winner;
    const handleRestart = () => setGameTurns([]);
    const handlePlayerNameChange = (symbol, name) => setPlayers((prev) => ({ ...prev, [symbol]: name }));
    const gameBoard = deriveGameBoard(gameTurns);
    const winner = deriveWinner(gameBoard, players);

    return (
        <main>
            <div id='game-container'>
                <ol id='players' className='highlight-player'>
                    <Player initialName={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
                    <Player initialName={PLAYERS.O} symbol='O' isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />
                </ol>
                { (winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} /> }
                <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App;

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2',
}
