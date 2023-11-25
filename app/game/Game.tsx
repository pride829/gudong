import React, { useEffect, useState } from 'react';

import { GameMetaProvider } from './GameMetaContext';
import { GameProvider } from './GameContext';
import GameSetup from './GameSetup';
import GameInProgress from './GameInProgress';
import { useGameContext } from './GameContext';
import { useGameMetaContext } from './GameMetaContext';

function Game() {
    const [phase, setPhase] = useState('setup');
    const { MIN_PLAYERS, MAX_PLAYERS, numberOfPlayers, setNumberOfPlayers = () => { }, playerNames, playerNow, setPlayerNow = () => { }, playerPlayed, setPlayerPlayed } =
        useGameMetaContext() ?? {
            MIN_PLAYERS: 0,
            MAX_PLAYERS: 0,
            numberOfPlayers: 0,
            setNumberOfPlayers: undefined,
            playerNames: [],
            playerNow: 0,
            setPlayerNow: undefined,
            playerPlayed: [],
            setPlayerPlayed: () => { },
        };
    const { ANIMALS, animalOrders, setAnimalOrders = () => { }, characters, setCharacters = () => { }, CHARACTERLIST } =
        useGameContext() ?? {
            ANIMALS: [],
            animalOrders: [],
            setAnimalOrders: undefined,
            characters: [],
            setCharacters: undefined,
            CHARACTERLIST: []
        };


    const handlePlayerSetupSubmit = () => {
        setPhase('inprogress');
    };

    useEffect(() => {
        console.log(numberOfPlayers)
    })

    return (
        <div>
            <GameMetaProvider>
                {phase === 'setup' && (
                    <GameSetup onSubmit={handlePlayerSetupSubmit} />
                )}
                <GameProvider>
                    {phase === 'inprogress' && (
                        <GameInProgress />
                    )}
                </GameProvider>
            </GameMetaProvider>
        </div>
    );
}

export default Game;