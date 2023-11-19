import React, { useState } from 'react';
import TurnStart from './TurnStart';
import Player from './Player';

function GameInTurn({ onGameInTurnFinish }) {
    const [phase, setPhase] = useState('turnStart');
    const [turn, setTurn] = useState(0);

    const handleTurnStartFinish = () => {
        setPhase('turnGoing')
    };

    const turnInChinese = ['一', '二', '三']

    return (
        <>
            {phase === 'turnStart' && (
                <TurnStart
                    turnNumber={turn}
                    onTurnStartEnd={handleTurnStartFinish} />
            )}
            {phase === 'turnGoing' && (
                <div>
                    <div>第{turnInChinese[turn]}回合</div>
                    <Player turn={turn} />
                </div>
            )}
        </>
    )
}

export default GameInTurn;