import React, { useState } from 'react';

import { GameMetaProvider } from './GameMetaContext';
import { GameProvider } from './GameContext';
import GameSetup from './GameSetup';
import GameInProgress from './GameInProgress';

function Game() {
    const [phase, setPhase] = useState('setup');

    const handlePlayerSetupSubmit = () => {
        setPhase('inprogress');
    };

    return (
        <div>
            <GameMetaProvider>
                {phase === 'setup' && (
                    <GameSetup onSubmit={handlePlayerSetupSubmit} />
                )}
                <GameProvider>
                    {phase === 'inprogress' && (
                        <GameInProgress />
                    )}
                </GameProvider>
            </GameMetaProvider>
        </div>
    );
}

export default Game;