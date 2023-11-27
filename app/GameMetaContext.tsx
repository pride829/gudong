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
    getPlayerTextStyle: (index: number) => object
    getPlayerTextBackground: (index: number) => object
}

export const GameMetaContext = createContext<GameMetaContextProps | undefined>(undefined);

export const GameMetaProvider = ({ children }) => {
    const MIN_PLAYERS = 6;
    const MAX_PLAYERS = 8;
    const [playerNames, setPlayerNames] = useState(["黑", "紅", "橙", "黃", "綠", "藍", "紫", "白"]);
    const [numberOfPlayers, setNumberOfPlayers] = useState(MAX_PLAYERS);
    const [playerNow, setPlayerNow] = useState(0);
    const [gameTurn, setGameTurn] = useState(0);

    const [playerPlayed, setPlayerPlayed] = useState<number[]>([])

    const getPlayerTextStyle = (abs_index: number) => {
        if (abs_index == 0) {
            return { color: "black" }
        } else if (abs_index == 1) {
            return { color: "black" }
        } else if (abs_index == 2) {
            return { color: "black" }
        } else if (abs_index == 3) {
            return { color: "black" }
        } else if (abs_index == 4) {
            return { color: "black" }
        } else if (abs_index == 5) {
            return { color: "black" }
        } else if (abs_index == 6) {
            return { color: "black" }
        } else if (abs_index == 7) {
            return { color: "white" }
        }
        return { color: "black" }
    }

    const getPlayerTextBackground = (abs_index: number) => {
        if (abs_index == 0) {
            return { backgroundColor: "white" }
        } else if (abs_index == 1) {
            return { backgroundColor: "orangered" }
        } else if (abs_index == 2) {
            return { backgroundColor: "darkorange" }
        } else if (abs_index == 3) {
            return { backgroundColor: "gold" }
        } else if (abs_index == 4) {
            return { backgroundColor: "Lime" }
        } else if (abs_index == 5) {
            return { backgroundColor: "DeepSkyBlue" }
        } else if (abs_index == 6) {
            return { backgroundColor: "violet" }
        } else if (abs_index == 7) {
            return { backgroundColor: "black" }
        }
        return { color: "black" }
    }


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
        getPlayerTextStyle,
        getPlayerTextBackground,
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