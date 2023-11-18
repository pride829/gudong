import React, { useState } from 'react';
import PlayerList from './PlayerList';
import { useGameContext } from './GameContext';

function GameSetup({ onSubmit, onNameChange }) {
    const { MIN_PLAYERS, MAX_PLAYERS } = useGameContext() ?? { MIN_PLAYERS: 0, MAX_PLAYERS: 0 };
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);

    const handleInputChange = event => {
        const inputNumber = parseInt(event.target.value, 10);
        setNumberOfPlayers(isNaN(inputNumber) ? 0 : inputNumber);
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        onSubmit(numberOfPlayers);
    };

    return (
        <div>
            <h2>Game Setup</h2>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Enter the number of players:
                    <input type="number" value={numberOfPlayers} onChange={handleInputChange} min={MIN_PLAYERS} max={MAX_PLAYERS} />
                </label>
                <PlayerList numberOfPlayers={numberOfPlayers} onNameChange={onNameChange} />
            </form>
        </div>
    );
}

export default GameSetup;