import React, { useState } from 'react';
import { useGameMetaContext } from './GameMetaContext';
import { useGameContext } from './GameContext';

function GameInProgress() {
    const { numberOfPlayers, playerNames, playerNow, setPlayerNow = () => { } } =
        useGameMetaContext() ?? {
            numberOfPlayers: 0,
            playerNames: [],
            playerNow: 0,
            setPlayerNow: undefined,
        };
    const { ANIMALS } =
        useGameContext() ?? {
            ANIMALS: [],
        };


    return (
        <>
            {ANIMALS}
        </>
    );
}

export default GameInProgress;