import React, { useState } from 'react';

import { GameProvider } from './GameContext';
import GameSetup from './GameSetup';

function Game() {
    const [phase, setPhase] = useState('setup');

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