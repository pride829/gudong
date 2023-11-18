import React, { useState } from 'react';
import { useGameContext } from './GameContext';

function TurnStart() {
    const { ANIMALS, animalOrders, animalReals } =
        useGameContext() ?? {
            ANIMALS: [],
            animalOrders: [],
            animalReals: [],
        };

    return (
        <>
        </>
    )
}

export default TurnStart;