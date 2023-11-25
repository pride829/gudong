import React from 'react';

import { GameMetaProvider } from './GameMetaContext';
import { GameProvider } from './GameContext';
import GameInProgress from './GameInProgress';
import GameInTurn from './GameInTurn';
import VotePeople from './VotePeople';
import GameEnd from './GameEnd';

function TestGame() {

    return (
        <div>
            <GameMetaProvider>
                <GameProvider>
                    <GameEnd></GameEnd>
                </GameProvider>
            </GameMetaProvider>
        </div>
    );
}

export default TestGame;