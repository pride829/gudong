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
    gameTurn: number;
    setGameTurn: React.Dispatch<React.SetStateAction<number>>;
    playerPlayed: number[],
    setPlayerPlayed: React.Dispatch<React.SetStateAction<number[]>>,
}

export const GameMetaContext = createContext<GameMetaContextProps | undefined>(undefined);

export const GameMetaProvider = ({ children }) => {
    const MIN_PLAYERS = 6;
    const MAX_PLAYERS = 8;
    const [playerNames, setPlayerNames] = useState(["黑", "紅", "橙", "黃", "綠", "藍", "紫", "白"]);
    const [numberOfPlayers, setNumberOfPlayers] = useState(MAX_PLAYERS);
    const [playerNow, setPlayerNow] = useState(0);
    const [gameTurn, setGameTurn] = useState(0);

    const [playerPlayed, setPlayerPlayed] = useState([0]) // 這邊記得要改！

    const contextValue: GameMetaContextProps = {
        MIN_PLAYERS,
        MAX_PLAYERS,
        playerNames,
        setPlayerNames,
        numberOfPlayers,
        setNumberOfPlayers,
        playerNow, // 這不應該算在meta context
        setPlayerNow,
        gameTurn,
        setGameTurn,
        playerPlayed,
        setPlayerPlayed,
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