import React, { useState } from 'react';
import PlayerList from './PlayerList';

function GameSetup({ onSubmit, onNameChange }) {
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
                    <input type="number" value={numberOfPlayers} onChange={handleInputChange} min="1" max="8" />
                </label>
                <PlayerList numberOfPlayers={numberOfPlayers} onNameChange={onNameChange} />
            </form>
        </div>
    );
}

export default GameSetup;