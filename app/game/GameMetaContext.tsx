import React, { createContext, useContext, useState } from 'react';

interface GameMetaContextProps {
    MIN_PLAYERS: number;
    MAX_PLAYERS: number;
    playerNames: string[];
    setPlayerNames: React.Dispatch<React.SetStateAction<string[]>>;
    numberOfPlayers: number;
    setNumberOfPlayers: React.Dispatch<React.SetStateAction<number>>;
    playerNow: number;
    setPlayerNow: React.Dispatch<React.SetStateAction<number>>;
}

export const GameMetaContext = createContext<GameMetaContextProps | undefined>(undefined);

export const GameMetaProvider = ({ children }) => {
    const MIN_PLAYERS = 6;
    const MAX_PLAYERS = 8;
    const [playerNames, setPlayerNames] = useState(Array(MAX_PLAYERS).fill('TESTNAME'));
    const [numberOfPlayers, setNumberOfPlayers] = useState(MAX_PLAYERS);
    const [playerNow, setPlayerNow] = useState(0);

    const contextValue: GameMetaContextProps = {
        MIN_PLAYERS,
        MAX_PLAYERS,
        playerNames,
        setPlayerNames,
        numberOfPlayers,
        setNumberOfPlayers,
        playerNow,
        setPlayerNow,
    };

    return (
        <GameMetaContext.Provider value={contextValue}>
            {children}
        </GameMetaContext.Provider>
    );
};

export const useGameMetaContext = () => {
    return useContext(GameMetaContext);
};