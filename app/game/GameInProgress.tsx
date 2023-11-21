import React, { useState } from 'react';
import GameInTurn from './GameInTurn';
import GameStart from './GameStart';

function GameInProgress() {

    const [phase, setPhase] = useState('gameStart');

    const handleGameStartFinish = () => {
        setPhase('turnStart')
    };

    const handleGameInTurnFinish = () => {
        setPhase('gameEnd')
    };

    return (
        <div>
            {phase === 'gameStart' && (
                <GameStart onGameStartFinish={handleGameStartFinish} />
            )}
            {phase === 'turnStart' && (
                <GameInTurn onGameInTurnFinish={handleGameInTurnFinish} />
            )}
            {phase === 'gameEnd' && (
                <div></div>
            )}
        </div >
    );
}

export default GameInProgress;