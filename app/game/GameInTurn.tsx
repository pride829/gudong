import React, { useEffect, useState } from 'react';
import TurnStart from './TurnStart';
import Player from './Player';
import { useGameMetaContext } from './GameMetaContext';
import TurnVoting from './TurnVoting';

function GameInTurn({ onGameInTurnFinish }) {
    const [phase, setPhase] = useState('turnVoting');

    const { gameTurn, setGameTurn } =
        useGameMetaContext() ?? {
            gameTurn: 0,
            setGameTurn: () => { }
        }

    const handleTurnStartFinish = () => {
        setPhase('turnGoing')
    };

    const handlePlayerFinish = () => {
        setPhase('turnVoting')
    };

    const handleTurnVotingFinish = () => {
        if (gameTurn != 2) {
            setPhase("turnStart")
            const prevGameTurn = gameTurn
            setGameTurn(prevGameTurn + 1)
        } else {
            onGameInTurnFinish()
        }
    };

    const turnInChinese = ['一', '二', '三']

    useEffect(() => {

    })

    return (
        <div>
            <div>第{turnInChinese[gameTurn]}回合</div>
            {phase === 'turnStart' && (
                <TurnStart
                    turnNumber={gameTurn}
                    onTurnStartEnd={handleTurnStartFinish} />
            )}
            {phase === 'turnGoing' && (
                <div>

                    <Player onPlayerFinish={handlePlayerFinish} />
                </div>
            )}
            {
                phase === 'turnVoting' && (
                    <div>
                        <TurnVoting onTurnVotingEnd={handleTurnVotingFinish}></TurnVoting>
                    </div>
                )
            }
        </div >
    )
}

export default GameInTurn;