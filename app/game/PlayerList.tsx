import React, { useState } from 'react';
import { useGameContext } from './GameContext';

function PlayerList({ numberOfPlayers }) {
    const { playerNames, setPlayerNames = () => { } } =
        useGameContext() ?? { MIN_PLAYERS: 0, MAX_PLAYERS: 0, playerNames: [], setPlayerNames: undefined };

    const handleInputChange = (index, text) => {
        const updatedPlayerNames = [...playerNames];
        updatedPlayerNames[index] = text;
        setPlayerNames(updatedPlayerNames);
    };

    const playersIndex = Array.from({ length: numberOfPlayers }, (_, index) => index);
    const defalutColors = ["黑", "紅", "橙", "黃", "綠", "藍", "紫", "白"];

    return (
        <div>
            <h2>Player List:</h2>
            <ul>
                {playersIndex.map(index => (
                    <li key={index}>
                        Player {index + 1}: {defalutColors[index]}
                        <input
                            type="text"
                            value={playerNames[index]}
                            onChange={(e) => handleInputChange(index, e.target.value)} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PlayerList;