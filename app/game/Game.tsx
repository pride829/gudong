import React, { useState } from 'react';
import GameSetup from './GameSetup';

function Game() {
    const [phase, setPhase] = useState('setup');
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);
    const [playerNames, setPlayerNames] = useState([]);

    const handlePlayerSetupSubmit = (numberOfPlayers) => {
        setNumberOfPlayers(numberOfPlayers);
        setPhase('playerList');
    };

    const handleNameChange = (newPlayerNames) => {
        setPlayerNames(newPlayerNames);
        console.log(newPlayerNames);
    };


    return (
        <div>
            <h1>Game</h1>

            {phase === 'setup' && (
                <GameSetup onSubmit={handlePlayerSetupSubmit} onNameChange={handleNameChange} />
            )}

            {/* Add more phases as needed */}
        </div>
    );
}

export default Game;