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

    return (
        <main>
            <div id='game-container'>
                <ol id='players' className='highlight-player'>
                    <Player initialName='Player 1' symbol='X' isActive={activePlayer === 'X'} />
                    <Player initialName='Player 2' symbol='O' isActive={activePlayer === 'O'} />
                </ol>
                <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}

export default App;
