import React, { useEffect, useState } from 'react';
import { useGameMetaContext } from './GameMetaContext';
import { useGameContext } from './GameContext';
import IdentTreasure from './IdentTreasure';

function PlayerPass({ onPlayerPassFinish }) {

    const { playerNow, playerNames, numberOfPlayers, gameTurn, playerPlayed, setPlayerPlayed } =
        useGameMetaContext() ?? {
            playerNow: 0,
            playerNames: [],
            numberOfPlayers: 0,
            gameTurn: 0,
            playerPlayed: [0],
            setPlayerPlayed: () => { }
        }

    const { characters, CHARACTERLIST, beingGankedTime, setBeingGankedTime, setAnimalOrders, ANIMALS, animalBlocked, setAnimalBlocked, animalOrders, animalRealAltered, setAnimalRealAltered } =
        useGameContext() ?? {
            characters: [],
            CHARACTERLIST: [],
            beingGankedTime: [],
            setBeingGankedTime: () => { },
            ANIMALS: [],
            animalOrders: [],
            animalBlocked: [],
            setAnimalBlocked: () => { },
            animalRealAltered: [],
            setAnimalRealAltered: () => { },
        }

    const handleChooseNextPlayerButtonClick = (index) => {
        setPlayerPlayed((prevPlayerPlayed) => {
            prevPlayerPlayed = [...prevPlayerPlayed, index]
            return prevPlayerPlayed
        })

        onPlayerPassFinish(index)
    }

    function ChooseNextPlayerButtonList({ }) {

        const renderedChooseNextPlayerButttons = Array.from(
            { length: numberOfPlayers }
            , (_, index) => (
                <button
                    key={index}
                    onClick={() => { handleChooseNextPlayerButtonClick(index) }}
                    hidden={playerPlayed.includes(index)}
                >
                    {playerNames[index]}
                </button >
            ));

        return (
            <div>
                {renderedChooseNextPlayerButttons}
            </div>
        )
    }


    return (
        <div>
            {playerPlayed.length < numberOfPlayers &&
                <div>
                    <div>請選擇下一位玩家：</div>
                    <ChooseNextPlayerButtonList></ChooseNextPlayerButtonList>
                </div>
            }
            {playerPlayed.length >= numberOfPlayers &&
                <div>
                    <div>您是本回合最後一位玩家！</div>
                    <button
                        key={-1}
                        onClick={() => { handleChooseNextPlayerButtonClick(-1) }}
                    >
                        前往鑑寶
                    </button >
                </div>
            }
        </div>)
}


export default PlayerPass;