import React, { useState } from 'react';
import { useGameMetaContext } from './GameMetaContext';

function PlayerList({ numberOfPlayers, selectedFirstPlayer, onFirstPlayerSelection }) {
    const { playerNames, setPlayerNames = () => { } } =
        useGameMetaContext() ?? { MIN_PLAYERS: 0, MAX_PLAYERS: 0, playerNames: [], setPlayerNames: undefined };

    const handleInputChange = (index, text) => {
        const updatedPlayerNames = [...playerNames];
        updatedPlayerNames[index] = text;
        setPlayerNames(updatedPlayerNames);
    };

    const playersIndex = Array.from({ length: numberOfPlayers }, (_, index) => index);
    const defalutColors = ["黑", "紅", "橙", "黃", "綠", "藍", "紫", "白"];

    return (
        <div>
            <h2>玩家名稱：</h2>
            <ul>
                <label>
                    <input
                        type="radio"
                        name="firstPlayer"
                        value={-1}
                        checked={selectedFirstPlayer === -1}
                        onChange={() => onFirstPlayerSelection(-1)}
                    />
                    隨機首家
                </label >
                {playersIndex.map(index => (
                    <li key={index}>
                        <label>
                            玩家 {index + 1}:
                            <input
                                type="radio"
                                name="firstPlayer"
                                value={index}
                                checked={selectedFirstPlayer === index}
                                onChange={() => onFirstPlayerSelection(index)}
                            />
                            <input
                                type="text"
                                value={playerNames[index]}
                                onChange={(e) => handleInputChange(index, e.target.value)} />
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PlayerList;