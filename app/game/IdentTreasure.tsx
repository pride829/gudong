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
        civHuangBlockedTurn,
        civMuBlockedTurn,
        animalBlocked,
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
        civHuangBlockedTurn: 0,
        civMuBlockedTurn: 0,
        animalBlocked: [],
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

    const handleIdentOneAnimal = (animalIndex: number) => {
        // TODO: 增加被偷襲和封鎖等
        console.log("animal order: ", animalOrders[animalIndex + gameTurn * ANIMAL_DISPLAY_IN_ONE_TURN])
        if (beingGankedTime[playerNow] > 0) {
            setBeingGanked(true)
            setFailIdentedAnimals([...failIdentedAnimals, animalIndex])
            setBeingGankedTime((prevBeingGankedTime) => {
                prevBeingGankedTime[playerNow] -= 1 // 姑且當作這個是對的
                return prevBeingGankedTime
            })
        } else if (CHARACTERLIST[characters[playerNow]] === "黃煙煙" && civHuangBlockedTurn === gameTurn ||
            CHARACTERLIST[characters[playerNow]] === "木戶加奈" && civMuBlockedTurn === gameTurn
        ) {
            setFailIdentedAnimals([...failIdentedAnimals, animalIndex])
            setIdentTimeUse(identTimeUse + 1)
        } else if (animalBlocked[animalOrders[animalIndex + gameTurn * ANIMAL_DISPLAY_IN_ONE_TURN]]) {
            setFailIdentedAnimals([...failIdentedAnimals, animalIndex])
            setIdentTimeUse(identTimeUse + 1)
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
        return (beingGanked ? "你被藥不然偷襲了，所以" : "")
    }

    function IdentResult() {
        return (
            identedAnimals.map((item, index) => <p key={index}>鑑別的結果 {ANIMALS[animalOrders[item + gameTurn * ANIMAL_DISPLAY_IN_ONE_TURN]]} 是 {animalReals[gameTurn][index] ? "真" : "假"} 的</p>)
        ) // HISTORY_PUSH
    }

    function FailIdentResult() {
        return (
            failIdentedAnimals.map((item, index) => <p key={index}>無法辨別 {ANIMALS[animalOrders[item + gameTurn * ANIMAL_DISPLAY_IN_ONE_TURN]]} 的真偽！</p>)
        ) // HISTORY_PUSH
    }

    useEffect(() => {
        // This effect will run when beingGanked state changes
        console.log('Being Ganked:', beingGanked);
        console.log('Being Ganked Time:', beingGankedTime);
        console.log('Civ Huang Blocked Turn', civHuangBlockedTurn)
        console.log('Civ Mu Blocked Turn', civMuBlockedTurn)
        console.log('animal blocked', animalBlocked)
        if (beingGanked || identTimeUse >= identTime) {
            onFinished()
        }
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

                <FailIdentResult></FailIdentResult>
            </div>
        </div>
    )
}

export default IdentTreasure;