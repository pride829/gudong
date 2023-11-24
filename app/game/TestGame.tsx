import React from 'react';

import { GameMetaProvider } from './GameMetaContext';
import { GameProvider } from './GameContext';
import GameInProgress from './GameInProgress';
import GameInTurn from './GameInTurn';
import VotePeople from './VotePeople';

function TestGame() {

    return (
        <div>
            <GameMetaProvider>
                <GameProvider>
                    <VotePeople onVotePeopleEnd={() => { console.log("onVotePeopleEnd") }}></VotePeople>
                </GameProvider>
            </GameMetaProvider>
        </div>
    );
}

export default TestGame;