import React, { useEffect, useState } from 'react';
import { useGameMetaContext } from './GameMetaContext';
import { useGameContext } from './GameContext';
import IdentTreasure from './IdentTreasure';

function PlayerPower({ }) {

    const getCharacterName = (index) => { return CHARACTERLIST[characters[index]] }

    const [clickedGankingButton, setClickedGankingButton] = useState(-1);
    const [plyaerPowerConfirm, setPlayerPowerConfirm] = useState(false)

    const { playerNow, playerNames, numberOfPlayers, gameTurn } =
        useGameMetaContext() ?? {
            playerNow: 0,
            playerNames: [],
            numberOfPlayers: 0
        }

    const { characters, CHARACTERLIST, beingGankedTime, setBeingGankedTime, setAnimalOrders, ANIMALS, setAnimalBlocked, animalOrders } =
        useGameContext() ?? {
            characters: [],
            CHARACTERLIST: [],
            beingGankedTime: [],
            setBeingGankedTime: () => { }
        }

    function findXu(): number {
        for (let i = 0; i < numberOfPlayers; i++) {
            if (getCharacterName(i) === "許願") {
                return i
            }
        }
        return -1
    }

    function findBigBrother(): number {
        for (let i = 0; i < numberOfPlayers; i++) {
            if (getCharacterName(i) === "老朝奉") {
                return i
            }
        }
        return -1
    }

    const handlePlayerGanked = (index) => {
        let numberOfBeingGanked = 1
        if (CHARACTERLIST[characters[index]] === "姬雲浮") {
            numberOfBeingGanked = 99
        }

        setBeingGankedTime(
            (beingGankedTime) => {
                const tempBeingGankedTime: number[] = [...beingGankedTime]
                tempBeingGankedTime[index] += numberOfBeingGanked
                return tempBeingGankedTime;
            }
        )

        if (CHARACTERLIST[characters[index]] != "方震") {
            return
        }

        setBeingGankedTime(
            (beingGankedTime) => {
                const tempBeingGankedTime: number[] = [...beingGankedTime]
                tempBeingGankedTime[findXu()] += numberOfBeingGanked
                return tempBeingGankedTime;
            }
        )

    }

    function GankedButtonList({ onPlayerGanked }) {
        //const [clickedButton, setClickedButton] = useState(-1); // 這個不能放裡面!!否則會導致它一直是在1, 我猜是重新render時，GankedButtonList也會重新Render所導致的

        const handleGankingButtonClick = (value) => {
            setClickedGankingButton(value)
            onPlayerGanked(value)
            handlePowerDone()
        }

        const renderedGankingButttons = Array.from(
            playerNames
            , (name, index) => (
                <button
                    key={index}
                    onClick={() => handleGankingButtonClick(index)}
                    disabled={
                        (clickedGankingButton !== -1) ||
                        index === playerNow ||
                        index === findBigBrother()
                    }>
                    {clickedGankingButton === -1 || clickedGankingButton != index ? name : ("已經偷襲 " + name)}
                </button>
            ));
        return (
            <div>
                {renderedGankingButttons}
            </div>
        )
    }

    const handleClickcedGankingPassButton = (index) => {
        setClickedGankingButton(index)
        handlePowerDone()
    }

    const PowerGank = () => {
        return (
            <div>
                <div>
                    請選擇要偷襲的對象：
                    <GankedButtonList onPlayerGanked={handlePlayerGanked}></GankedButtonList>
                    <button
                        key={99}
                        onClick={() => handleClickcedGankingPassButton(99)}
                        disabled={(clickedGankingButton !== -1)}>
                        {clickedGankingButton === -1 || clickedGankingButton != 99 ? '跳過，不進行偷襲' : ("您已經選擇跳過")}
                    </button>
                </div>
            </div>
        )
    }

    const PowerBlock = () => {
        return (
            <div>
                <div>
                    請選擇要偷襲的對象：
                    <GankedButtonList onPlayerGanked={handlePlayerGanked}></GankedButtonList>
                    <button
                        key={99}
                        onClick={() => handleClickcedGankingPassButton(99)}
                        disabled={(clickedGankingButton !== -1)}>
                        {clickedGankingButton === -1 || clickedGankingButton != 99 ? '跳過，不進行偷襲' : ("您已經選擇跳過")}
                    </button>
                </div>
            </div>
        )
    }

    const handleBlockOneAnimal = (animalIndex) => {

    }

    function BlockOneAnimal({ index }) { // 這裡要加{}!!!

    }

    const handlePowerDone = () => {
        setPlayerPowerConfirm(true)
    }

    const Power = ({ characterName }) => {
        let content
        if (characterName === "藥不然") {
            content = <PowerGank></PowerGank>
        }
        // TODO: Add all characters
        return <div>{content}</div>
    }

    useEffect(() => {
        console.log(beingGankedTime)
    })

    return (
        <div>
            <div>
                {getCharacterName(playerNow) === "藥不然" && <PowerGank></PowerGank>}
                {getCharacterName(playerNow) === "鄭國渠" && <div></div>}
            </div>
            <div>
                <button disabled={!plyaerPowerConfirm}>確認</button>
            </div>
        </div>

    )
}

export default PlayerPower;