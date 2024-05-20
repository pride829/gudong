import React, { useState } from 'react';
import GameInTurn from './GameInTurn';
import GameStart from './GameStart';
import GameEnd from './GameEnd';
import TurnVoting from './TurnVoting';
import VotePeople from './VotePeople';
import { useSsrLocalStorage } from './util/useSsrLocalStorage';

enum GameProgressPhase {
    gameStart = 'gameStart',
    turnStart = 'turnStart',
    votePeople = 'votePeople',
    gameEnd = 'gameEnd'

}

function GameInProgress() {

    const [phase, setPhase] = useSsrLocalStorage('gameProgressPhase', GameProgressPhase.gameStart);


    const handleGameStartFinish = () => {
        setPhase(GameProgressPhase.turnStart)
    };

    const handleGameInTurnFinish = () => {
        setPhase(GameProgressPhase.votePeople)
    };

    const handleVotePeopleFinish = () => {
        setPhase(GameProgressPhase.gameEnd)
    }

    return (
        <div>
            {phase === GameProgressPhase.gameStart && (
                <GameStart onGameStartFinish={handleGameStartFinish} />
            )}
            {phase === GameProgressPhase.turnStart && (
                <GameInTurn onGameInTurnFinish={handleGameInTurnFinish} />
            )}
            {phase === GameProgressPhase.votePeople && (
                <VotePeople onVotePeopleEnd={handleVotePeopleFinish} />
            )}
            {phase === GameProgressPhase.gameEnd && (
                <GameEnd></GameEnd>
            )}
        </div >
    );
}

export default GameInProgress;