import React, { useState } from 'react';
import GameSetup from './GameSetup';
import { GameProvider } from './GameContext';

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
        <GameProvider>
            {phase === 'setup' && (
                <GameSetup onSubmit={handlePlayerSetupSubmit} onNameChange={handleNameChange} />
            )}
        </GameProvider>
    );
}

export default Game;