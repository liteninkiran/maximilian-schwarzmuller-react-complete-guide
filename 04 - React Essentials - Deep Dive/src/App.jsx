import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';

function App() {
    const [activePlayer, setActivePlayer] = useState('X');
    const [gameTurns, setGameTurns] = useState([]);

    const handleSelectSquare = (rowIndex, colIndex) => {
        setActivePlayer((prev) => prev === 'X' ? 'O' : 'X');
        setGameTurns(prev => {
            const curr = (prev.length > 0 && prev[0].player === 'X' ? 'O' : 'X');
            const updatedTurns = [
                {
                    square: {
                        row: rowIndex,
                        col: colIndex,
                    },
                    player: curr,
                },
                ...prev,
            ];
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
                <GameBoard
                    onSelectSquare={handleSelectSquare}
                    activePlayerSymbol={activePlayer}
                    turns={gameTurns}
                />
            </div>
            <Log />
        </main>
    );
}

export default App;
