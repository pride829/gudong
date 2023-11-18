import React, { useState } from 'react';
import PlayerList from './PlayerList';
import { useGameContext } from './GameContext';

function GameSetup({ onSubmit }) {
    const { MIN_PLAYERS, MAX_PLAYERS, numberOfPlayers, setNumberOfPlayers = () => { }, playerNames, setPlayerNow } =
        useGameContext() ?? {
            MIN_PLAYERS: 0,
            MAX_PLAYERS: 0,
            numberOfPlayers: 0,
            setNumberOfPlayers: undefined,
            playerNames: [],
            setPlayerNow: undefined,
        };
    const [selectedFirstPlayer, setSelectedFirstPlayer] = useState(-1);

    const handleFirstPlayerSelection = (player) => {
        setSelectedFirstPlayer(player);
    };

    const handlePlayerCountChange = event => {
        const inputNumber = parseInt(event.target.value, 10);
        setNumberOfPlayers(isNaN(inputNumber) ? 0 : inputNumber);
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        // Check if the first numberOfPlayers elements are filled.
        const isFormValid = Object.values(playerNames).slice(0, numberOfPlayers).every((value) => value !== '');

        if (!isFormValid) {
            alert("Please fill in all fields");
        } else {
            if (selectedFirstPlayer === -1) {
                let randomNumber = Math.floor(Math.random() * (numberOfPlayers - 0))
                console.log(randomNumber)
                setSelectedFirstPlayer(randomNumber)
            }
            console.log(selectedFirstPlayer)
            onSubmit();
        }
    };

    const playerOptions = Array.from({ length: MAX_PLAYERS - MIN_PLAYERS + 1 }, (_, index) => MIN_PLAYERS + index);

    return (
        <>
            <h2>Game Setup</h2>
            <form onSubmit={handleFormSubmit}>
                Enter the number of players:
                <select id="playerCount" value={numberOfPlayers} onChange={handlePlayerCountChange}>
                    {playerOptions.map((count) => (
                        <option key={count} value={count}>
                            {count}
                        </option>
                    ))}
                </select>
                <PlayerList numberOfPlayers={numberOfPlayers} selectedFirstPlayer={selectedFirstPlayer} onFirstPlayerSelection={handleFirstPlayerSelection} />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default GameSetup;