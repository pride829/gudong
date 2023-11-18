import React, { createContext, useContext, useState } from 'react';

interface GameContextProps {
    MIN_PLAYERS: number;
    MAX_PLAYERS: number;
    playerNames: string[];
    setPlayerNames: React.Dispatch<React.SetStateAction<string[]>>;
    numberOfPlayers: number;
    setNumberOfPlayers: React.Dispatch<React.SetStateAction<number>>;
    playerNow: number;
    setPlayerNow: React.Dispatch<React.SetStateAction<number>>;
}

export const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }) => {
    const MIN_PLAYERS = 6;
    const MAX_PLAYERS = 8;
    const [playerNames, setPlayerNames] = useState(Array(MAX_PLAYERS).fill('TESTNAME'));
    const [numberOfPlayers, setNumberOfPlayers] = useState(MAX_PLAYERS);
    const [playerNow, setPlayerNow] = useState(0);

    const contextValue: GameContextProps = {
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
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    return useContext(GameContext);
};