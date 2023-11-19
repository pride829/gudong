import React, { useState } from 'react';
import { useGameMetaContext } from './GameMetaContext';

function IdentTreasure({ identTime, identTruly }) {
    const { playerNow, playerNames } =
        useGameMetaContext() ?? {
            playerNow: 0,
            playerNames: []
        }

    return (
        <>
        </>
    )
}

export default IdentTreasure;