import React, { useState } from 'react';
import TurnStart from './TurnStart';
import GameStart from './GameStart';

function GameInProgress() {

    const [phase, setPhase] = useState('gameStart');
    const [turn, setTurn] = useState(1);

    const handleGameStartFinish = () => {
        setPhase('turnStart')
    };

    return (
        <>
            {phase === 'gameStart' && (
                <GameStart onGameStartFinish={handleGameStartFinish} />
            )}
            {phase === 'turnStart' && (
                <TurnStart />
            )}
        </>
    );
}

export default GameInProgress;