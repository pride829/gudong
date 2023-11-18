import React, { createContext, useContext } from 'react';

interface GameContextProps {
    MIN_PLAYERS: number;
    MAX_PLAYERS: number;
}

export const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }) => {
    const MIN_PLAYERS = 6;
    const MAX_PLAYERS = 8;

    return (
        <GameContext.Provider value={{ MIN_PLAYERS, MAX_PLAYERS }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    return useContext(GameContext);
};