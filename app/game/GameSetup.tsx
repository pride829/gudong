import React, { useEffect, useState } from 'react';
import PlayerList from './PlayerList';
import { useGameMetaContext } from './GameMetaContext';
import { useGameContext } from './GameContext';

function GameSetup({ onSubmit }) {
    const { MIN_PLAYERS, MAX_PLAYERS, numberOfPlayers, setNumberOfPlayers = () => { }, playerNames, playerNow, setPlayerNow = () => { }, playerPlayed, setPlayerPlayed } =
        useGameMetaContext() ?? {
            MIN_PLAYERS: 0,
            MAX_PLAYERS: 0,
            numberOfPlayers: 0,
            setNumberOfPlayers: undefined,
            playerNames: [],
            playerNow: 0,
            setPlayerNow: undefined,
            playerPlayed: [],
            setPlayerPlayed: () => { },
        };
    const { gameLog } = useGameContext() ?? { gameLog: "" }

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
                setPlayerNow(randomNumber)
                setPlayerPlayed([randomNumber])
                onSubmit();

            } else {
                setPlayerNow(selectedFirstPlayer)
                setPlayerPlayed([selectedFirstPlayer])
                onSubmit();
            }

        }
    };

    const playerOptions = Array.from({ length: MAX_PLAYERS - MIN_PLAYERS + 1 }, (_, index) => MIN_PLAYERS + index);

    useEffect(() => {

    })
    return (
        <div>
            <h2>遊戲設置</h2>
            <form onSubmit={handleFormSubmit}>
                請輸入玩家數量：
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
        </div >
    );
}

export default GameSetup;