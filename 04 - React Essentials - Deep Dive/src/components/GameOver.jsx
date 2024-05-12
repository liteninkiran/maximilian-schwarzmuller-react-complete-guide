export default function GameOver({ winner, draw = false }) {
    return (
        <div id='game-over'>
            <h2>Game Over</h2>
            {winner ? <p>{winner} won!</p> : <p>It&apos;s a draw</p>}
            <p><button>Re-start</button></p>
        </div>
    );
}
