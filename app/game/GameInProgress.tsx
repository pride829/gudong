import React, { useState } from 'react';
import { useGameMetaContext } from './GameMetaContext';
import { useGameContext } from './GameContext';
import TurnStart from './TurnStart';

function GameInProgress() {
    const { numberOfPlayers, playerNames, playerNow, setPlayerNow = () => { } } =
        useGameMetaContext() ?? {
            numberOfPlayers: 0,
            playerNames: [],
            playerNow: 0,
            setPlayerNow: undefined,
        };
    const { ANIMALS, animalOrders, setAnimalOrders = () => { } } =
        useGameContext() ?? {
            ANIMALS: [],
            animalOrders: [],
            setAnimalOrders: undefined
        };
    const [phase, setPhase] = useState('turnStart');
    const [turn, setTurn] = useState(1);

    return (
        <>
            {phase === 'turnStart' && (
                <TurnStart />
            )}
        </>
    );
}

export default GameInProgress;