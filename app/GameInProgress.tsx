import React, { useState } from 'react';
import GameInTurn from './GameInTurn';
import GameStart from './GameStart';
import GameEnd from './GameEnd';
import TurnVoting from './TurnVoting';
import VotePeople from './VotePeople';

function GameInProgress() {

    const [phase, setPhase] = useState('gameStart');

    const handleGameStartFinish = () => {
        setPhase('turnStart')
    };

    const handleGameInTurnFinish = () => {
        setPhase('votePeople')
    };

    const handleVotePeopleFinish = () => {
        setPhase('gameEnd')
    }

    return (
        <div>
            {phase === 'gameStart' && (
                <GameStart onGameStartFinish={handleGameStartFinish} />
            )}
            {phase === 'turnStart' && (
                <GameInTurn onGameInTurnFinish={handleGameInTurnFinish} />
            )}
            {phase === 'votePeople' && (
                <VotePeople onVotePeopleEnd={handleVotePeopleFinish} />
            )}
            {phase === 'gameEnd' && (
                <GameEnd></GameEnd>
            )}
        </div >
    );
}

export default GameInProgress;