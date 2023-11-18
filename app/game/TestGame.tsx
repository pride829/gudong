import React from 'react';

import { GameMetaProvider } from './GameMetaContext';
import { GameProvider } from './GameContext';
import GameInProgress from './GameInProgress';

function TestGame() {

    return (
        <GameMetaProvider>
            <GameProvider>
                <GameInProgress />
            </GameProvider>
        </GameMetaProvider>
    );
}

export default TestGame;