import React, { useState } from 'react';
import TurnStart from './TurnStart';
import Player from './Player';
import { useGameMetaContext } from './GameMetaContext';

function GameInTurn({ onGameInTurnFinish }) {
    const [phase, setPhase] = useState('turnStart');

    const { gameTurn } =
        useGameMetaContext() ?? {
            gameTurn: 0,
        }

    const handleTurnStartFinish = () => {
        setPhase('turnGoing')
    };

    const turnInChinese = ['一', '二', '三']

    return (
        <>
            {phase === 'turnStart' && (
                <TurnStart
                    turnNumber={gameTurn}
                    onTurnStartEnd={handleTurnStartFinish} />
            )}
            {phase === 'turnGoing' && (
                <div>
                    <div>第{turnInChinese[gameTurn]}回合</div>
                    <Player />
                </div>
            )}
        </>
    )
}

export default GameInTurn;