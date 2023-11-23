import React, { useState, useEffect } from 'react';
import { useGameMetaContext } from './GameMetaContext';
import { useGameContext } from './GameContext';
import { resourceUsage } from 'process';
import { render } from 'react-dom';
import { fail } from 'assert';

function IdentTreasure({ onFinished }) {
    const { playerNow, playerNames, gameTurn } =
        useGameMetaContext() ?? {
            playerNow: 0,
            playerNames: [],
            gameTurn: 0
        }

    const { ANIMALS,
        animalOrders,
        animalReals,
        setAnimalOrders = () => { },
        characters,
        setCharacters = () => { },
        CHARACTERLIST,
        beingGankedTime,
        setBeingGankedTime = () => { },
        dummy,
        setDummy,
    } = useGameContext() ?? {

        ANIMALS: [],
        animalOrders: [],
        animalReals: [],
        setAnimalOrders: undefined,
        characters: [],
        setCharacters: undefined,
        CHARACTERLIST: [],
        beingGankedTime: [],
        setBeingGankedTime: undefined,
    }
        ;

    const [identTimeUse, setIdentTimeUse] = useState(0)
    const [identedAnimals, setIdentedAnimals] = useState<number[]>([])
    const [failIdentedAnimals, setFailIdentedAnimals] = useState<number[]>([])
    const [beingGanked, setBeingGanked] = useState(false)

    const getInitialIdentTime = (contextValue) => {
        if (contextValue === '許願') {
            return 2;
        } else {
            return 1;
        }
    };
    const [identTime, setIdentTime] = useState(
        getInitialIdentTime(CHARACTERLIST[characters[playerNow]])
    )

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
        if (beingGankedTime[playerNow] > 0) {
            setBeingGanked(true)
            setFailIdentedAnimals([...failIdentedAnimals, animalIndex])

        } else {
            setIdentedAnimals([...identedAnimals, animalIndex])
            setIdentTimeUse(identTimeUse + 1)
        }
    }

    function IdentOneAnimal({ index }) { // 這裡要加{}!!!
        return (
            <button
                onClick={() => handleIdentOneAnimal(index)}
                disabled={
                    identedAnimals.includes(index) ||
                    identTimeUse >= identTime ||
                    beingGanked}
            >
                {ANIMALS[animalOrders[index + gameTurn * ANIMAL_DISPLAY_IN_ONE_TURN]]}
            </button>
        )
    }

    function BeingGankedResult() {
        return (beingGanked ? <div>你被藥不然偷襲了，所以</div> : "")
    }

    function IdentResult() {
        return (
            identedAnimals.map((item, index) => <p key={index}>鑑別的結果 {ANIMALS[animalOrders[item + gameTurn * ANIMAL_DISPLAY_IN_ONE_TURN]]} 是 {animalReals[gameTurn][index] ? "真" : "假"} 的</p>)
        ) // HISTORY_PUSH
    }

    function FailIdentResult() {
        return (
            identedAnimals.map((item, index) => <p key={index}>鑑別的結果 {ANIMALS[animalOrders[item + gameTurn * ANIMAL_DISPLAY_IN_ONE_TURN]]} 是 {animalReals[gameTurn][index] ? "真" : "假"} 的</p>)
        ) // HISTORY_PUSH
    }

    useEffect(() => {
        // This effect will run when beingGanked state changes
        console.log('Being Ganked:', beingGanked);

        if (beingGanked || identTimeUse >= identTime) {
            onFinished()
        }

        // Your other logic here, if needed
    }, [beingGanked, identedAnimals, failIdentedAnimals, onFinished]);

    return (
        <div>
            <div>
                <div>請選擇想鑑定的獸首</div>
                <IdentOneAnimal index={0}></IdentOneAnimal>
                <IdentOneAnimal index={1}></IdentOneAnimal>
                <IdentOneAnimal index={2}></IdentOneAnimal>
                <IdentOneAnimal index={3}></IdentOneAnimal>
            </div>
            <BeingGankedResult></BeingGankedResult>
            <div>
                <IdentResult></IdentResult>
            </div>
        </div>
    )
}

export default IdentTreasure;