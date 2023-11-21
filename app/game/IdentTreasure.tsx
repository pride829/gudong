import React, { useState } from 'react';
import { useGameMetaContext } from './GameMetaContext';
import { useGameContext } from './GameContext';
import { resourceUsage } from 'process';
import { render } from 'react-dom';

function IdentTreasure({ identTime, identTruly }) {
    const { playerNow, playerNames, gameTurn } =
        useGameMetaContext() ?? {
            playerNow: 0,
            playerNames: [],
            gameTurn: 0
        }

    const { ANIMALS, animalOrders, animalReals, setAnimalOrders = () => { }, characters, setCharacters = () => { }, CHARACTERLIST } =
        useGameContext() ?? {
            ANIMALS: [],
            animalOrders: [],
            animalReals: [],
            setAnimalOrders: undefined,
            characters: [],
            setCharacters: undefined,
            CHARACTERLIST: []
        };

    const [identTimeUse, setIdentTimeUse] = useState(0)
    const [identedAnimals, setIdentedAnimals] = useState<number[]>([])

    const ANIMAL_DISPLAY_IN_ONE_TURN = 4

    const renderedElements = Array.from({
        length: ANIMAL_DISPLAY_IN_ONE_TURN
    }, (_, index) => (
        <div className="word" key={index}>
            {ANIMALS[
                animalOrders[
                index + gameTurn * ANIMAL_DISPLAY_IN_ONE_TURN
                ]
            ]}
        </div>
    ));

    const handleIdentOneAnimal = (animalIndex: number) => {
        // TODO: 增加被偷襲和封鎖等
        if (identTimeUse < identTime) {
            setIdentedAnimals([...identedAnimals, animalIndex])
            setIdentTimeUse(identTimeUse + 1)
        }
    }

    function IdentOneAnimal({ index }) { // 這裡要加{}!!!
        return (
            <button onClick={() => handleIdentOneAnimal(index)}>
                {ANIMALS[animalOrders[index + gameTurn * ANIMAL_DISPLAY_IN_ONE_TURN]]}
            </button>
        )
    }

    function IdentResult() {
        return (
            identedAnimals.map((item, index) => <p key={index}>鑑別的結果 {ANIMALS[animalOrders[item + gameTurn * ANIMAL_DISPLAY_IN_ONE_TURN]]} 是 {animalReals[gameTurn][index] ? "真" : "假"} 的</p>)
        ) // HISTORY_PUSH
    }

    return (
        <div>
            <div>
                <div>請選擇想鑑定的獸首</div>
                <IdentOneAnimal index={0}></IdentOneAnimal>
                <IdentOneAnimal index={1}></IdentOneAnimal>
                <IdentOneAnimal index={2}></IdentOneAnimal>
                <IdentOneAnimal index={3}></IdentOneAnimal>
            </div>
            <div>
                <IdentResult></IdentResult>
            </div>
        </div>
    )
}

export default IdentTreasure;