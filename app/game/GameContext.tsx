import React, { createContext, useContext, useState } from 'react';

interface GameContextProps {
    MIN_PLAYERS: number;
    MAX_PLAYERS: number;
    playerNames: string[];
    setPlayerNames: React.Dispatch<React.SetStateAction<string[]>>;
    numberOfPlayers: number;
    setNumberOfPlayers: React.Dispatch<React.SetStateAction<number>>;
}

export const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }) => {
    const MIN_PLAYERS = 6;
    const MAX_PLAYERS = 8;
    const [playerNames, setPlayerNames] = useState(Array(MAX_PLAYERS).fill(''));
    const [numberOfPlayers, setNumberOfPlayers] = useState(MAX_PLAYERS);

    const contextValue: GameContextProps = {
        MIN_PLAYERS,
        MAX_PLAYERS,
        playerNames,
        setPlayerNames,
        numberOfPlayers,
        setNumberOfPlayers,
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