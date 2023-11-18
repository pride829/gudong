import React, { useState } from 'react';
import PlayerList from './PlayerList';
import { useGameContext } from './GameContext';

function GameSetup(onSubmit) {
    const { MIN_PLAYERS, MAX_PLAYERS, numberOfPlayers, setNumberOfPlayers } =
        useGameContext() ?? {
            MIN_PLAYERS: 0,
            MAX_PLAYERS: 0,
            numberOfPlayers: 0,
            setNumberOfPlayers: undefined
        };

    const playerOptions = Array.from({ length: MAX_PLAYERS - MIN_PLAYERS + 1 }, (_, index) => MIN_PLAYERS + index);

    const handleInputChange = event => {
        const inputNumber = parseInt(event.target.value, 10);
        setNumberOfPlayers(isNaN(inputNumber) ? 0 : inputNumber);
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        onSubmit(numberOfPlayers);
    };

    return (
        <div>
            <h2>Game Setup</h2>
            <form onSubmit={handleFormSubmit}>
                Enter the number of players:
                <select id="playerCount" value={numberOfPlayers} onChange={handleInputChange}>
                    {playerOptions.map((count) => (
                        <option key={count} value={count}>
                            {count}
                        </option>
                    ))}
                </select>
                <PlayerList numberOfPlayers={numberOfPlayers} />
            </form>
        </div >
    );
}

export default GameSetup;