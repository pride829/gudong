import React, { useState } from 'react';
import GameSetup from './GameSetup';
import { GameProvider } from './GameContext';
import { useGameContext } from './GameContext';

function Game() {
    const [phase, setPhase] = useState('setup');

    const { } =
        useGameContext() ?? {
        };

    const handlePlayerSetupSubmit = () => {
        setPhase('playerList');
    };

    return (
        <GameProvider>
            {phase === 'setup' && (
                <GameSetup onSubmit={handlePlayerSetupSubmit} />
            )}
        </GameProvider>
    );
}

export default Game;