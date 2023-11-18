import React, { useState } from 'react';

function PlayerList({ numberOfPlayers, onNameChange }) {
    function clamp(number, min, max) {
        return Math.min(Math.max(number, min), max);
    }

    numberOfPlayers = clamp(numberOfPlayers, 1, 8)

    const playersIndex = Array.from({ length: numberOfPlayers }, (_, index) => index);
    const [playerNames, setPlayerNames] = useState(Array(numberOfPlayers).fill(''));

    const handleInputChange = (index, text) => {
        const updatedPlayerNames = [...playerNames];
        updatedPlayerNames[index] = text;
        onNameChange(updatedPlayerNames);
    };

    let defalutColors = ["紅", "橙", "黃", "綠", "藍", "紫", "黑", "白"];

    return (
        <div>
            <h2>Player List:</h2>
            <ul>
                {playersIndex.map(index => (
                    <li key={index}>
                        Player {index}: {defalutColors[index]}
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