import React, { useEffect, useState } from 'react';

import { GameMetaProvider } from './GameMetaContext';
import { GameProvider } from './GameContext';
import GameSetup from './GameSetup';
import GameInProgress from './GameInProgress';
import { useGameContext } from './GameContext';
import { useGameMetaContext } from './GameMetaContext';
import { useSsrLocalStorage } from './util/useSsrLocalStorage';

enum GameMetaPhase {
    setup = 'setup',
    inProgress = 'inprogress',

}

function Game() {
    const [phase, setPhase] = useSsrLocalStorage('gameMetaPhase', GameMetaPhase.setup);
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
    const { gameLog, ANIMALS, animalOrders, setAnimalOrders = () => { }, characters, setCharacters = () => { }, characterList } =
        useGameContext() ?? {
            ANIMALS: [],
            animalOrders: [],
            setAnimalOrders: undefined,
            characters: [],
            setCharacters: undefined,
            characterList: [],
            gameLog: ""
        };


    const handlePlayerSetupSubmit = () => {
        setPhase(GameMetaPhase.inProgress);
    };


    useEffect(() => {
        const handleBeforeUnload = (event) => {
            const message = '離開後遊戲資料將會消失！確認離開？';
            event.returnValue = message; // Standard for most browsers
            return message; // For some older browsers
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <div>
            <GameMetaProvider>
                <GameProvider>
                    {phase === GameMetaPhase.setup && (
                        <GameSetup onSubmit={handlePlayerSetupSubmit} />
                    )}
                    {phase === GameMetaPhase.inProgress && (
                        <GameInProgress />
                    )}
                    
                </GameProvider>
            </GameMetaProvider>
        </div>
    );
}

export default Game;