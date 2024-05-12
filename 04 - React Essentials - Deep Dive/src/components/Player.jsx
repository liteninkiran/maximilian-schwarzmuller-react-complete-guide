import { useState } from 'react';

export default function Player({ initialName, symbol }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    const handleEditClick = () => {
        setIsEditing(edit => !edit);
    }
    const handleNameChange = (event) => {
        setPlayerName(event.target.value);
    }
    return (
        <li>
            <span className='player'>
                {
                    isEditing ? (
                        <input type='text' required value={playerName} onChange={handleNameChange} />
                    ) : (
                        <span className='player-name'>{playerName}</span>
                    )
                }
                <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}
