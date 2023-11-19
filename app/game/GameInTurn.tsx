import React, { useState } from 'react';
import TurnStart from './TurnStart';

function GameInTurn({ onGameInTurnFinish }) {
    const [phase, setPhase] = useState('turnStart');
    const [turn, setTurn] = useState(0);

    const handleTurnStartFinish = () => {
        setPhase('turnEnd')
    };

    return (
        <>
            {phase === 'turnStart' && (
                <TurnStart turnNumber={turn} />
            )}
        </>
    )
}

export default GameInTurn;