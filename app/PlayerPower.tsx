import React, { useEffect, useState } from 'react';
import { useGameMetaContext } from './GameMetaContext';
import { useGameContext } from './GameContext';
import IdentTreasure from './IdentTreasure';

function PlayerPower({ onPlayerPowerFinish }) {

    const getCharacterName = (index) => { return characterList[characters[index]] }

    const [clickedGankingButton, setClickedGankingButton] = useState(-1);
    const [clikcedBlockingButton, setClickedBlockingButton] = useState(-1);
    const [plyaerPowerConfirm, setPlayerPowerConfirm] = useState(false)
    const [alterSwitch, setAlterSwitch] = useState(false);
    const [preAlterSwitch, setPrevAlterSwitch] = useState(false);

    const { playerNow, playerNames, numberOfPlayers, gameTurn } =
        useGameMetaContext() ?? {
            playerNow: 0,
            playerNames: [],
            numberOfPlayers: 0,
            gameTurn: 0
        }

    const { addGameLog, characters, characterList, beingGankedTime, setBeingGankedTime, setAnimalOrders, ANIMALS, animalBlocked, setAnimalBlocked, animalOrders, animalRealAltered, setAnimalRealAltered } =
        useGameContext() ?? {
            characters: [],
            characterList: [],
            beingGankedTime: [],
            setBeingGankedTime: () => { },
            ANIMALS: [],
            animalOrders: [],
            animalBlocked: [],
            setAnimalBlocked: () => { },
            animalRealAltered: [],
            setAnimalRealAltered: () => { },
            addGameLog: () => { }
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
        if (characterList[characters[index]] === "姬雲浮") {
            numberOfBeingGanked = 99
        }

        setBeingGankedTime(
            (beingGankedTime) => {
                const tempBeingGankedTime: number[] = [...beingGankedTime]
                tempBeingGankedTime[index] += numberOfBeingGanked
                return tempBeingGankedTime;
            }
        )

        if (characterList[characters[index]] != "方震") {
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

        //console.log(numberOfPlayers)
        const handleGankingButtonClick = (value) => {
            if (value === findBigBrother()) {
                const isConfirmed = window.confirm(
                    "你確定要偷襲" + playerNames[value] + "嗎？他是你隊友！"
                )

                if (!isConfirmed) return;
            }

            setClickedGankingButton(value)
            onPlayerGanked(value)

            addGameLog(playerNames[playerNow] + "偷襲了" + playerNames[value] + "！")
            handlePowerDone()
        }

        const renderedGankingButttons = Array.from(
            playerNames.slice(0, numberOfPlayers)
            , (name, index) => (
                <button
                    key={index}
                    onClick={() => handleGankingButtonClick(index)}
                    disabled={
                        (clickedGankingButton !== -1) ||
                        index === playerNow

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

        addGameLog(playerNames[playerNow] + "並沒有使用偷襲的能力。")
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

    const handleAnimalBlocked = (index) => {

        setAnimalBlocked((prevAnimalBlocked) => {
            prevAnimalBlocked[animalOrders[index + gameTurn * 4]] = true
            return prevAnimalBlocked
        })

        addGameLog(playerNames[playerNow] + "封鎖了" + ANIMALS[animalOrders[index + gameTurn * 4]] + "！")
    }

    function BlockButtonList({ }) {

        const handleBlockingButtonClick = (value) => {
            setClickedBlockingButton(value)
            handleAnimalBlocked(value)
            handlePowerDone()
        }

        const renderedBlockingButttons = Array.from(
            { length: 4 }
            , (_, index) => (
                <button
                    key={index}
                    onClick={() => handleBlockingButtonClick(index)}
                    disabled={
                        (clikcedBlockingButton !== -1)
                    }>
                    {clikcedBlockingButton === -1 || clikcedBlockingButton != index ?
                        ANIMALS[animalOrders[index + gameTurn * 4]] : ("已經封鎖 " + ANIMALS[animalOrders[index + gameTurn * 4]])}
                </button>
            ));
        return (
            <div>
                {renderedBlockingButttons}
            </div>
        )
    }

    const handleClickcedBlockingPassButton = (index) => {
        setClickedBlockingButton(index)
        addGameLog(playerNames[playerNow] + "並沒有使用封鎖的能力。")

        handlePowerDone()
    }

    const PowerBlock = () => {
        return (
            <div>
                <div>
                    請選擇要封鎖的獸首：
                    <BlockButtonList></BlockButtonList>
                    <button
                        key={99}
                        onClick={() => handleClickcedBlockingPassButton(99)}
                        disabled={(clikcedBlockingButton !== -1)}>
                        {clikcedBlockingButton === -1 || clikcedBlockingButton != 99 ? '跳過，不進行封鎖' : ("您已經選擇跳過")}
                    </button>
                </div>
            </div>
        )
    }


    const handlePowerAlterChange = () => {
        setAlterSwitch(!alterSwitch);
    }

    const PowerAlter = () => {
        return (
            <div>
                老朝奉，是否改變除了姬雲浮以外的許願陣營玩家之後的鑑定結果？
                <label className="toggle-switch">
                    <input type="checkbox" onChange={handlePowerAlterChange} checked={alterSwitch}></input>
                    <div className="switch-track">
                        <div className="switch-thumb"></div>
                    </div>

                </label>
            </div>
        )
    }

    const PowerNothing = () => {
        return (
            <div>
                您沒有其他特殊能力。
            </div>
        )
    }
    const handlePowerDone = () => {
        setPlayerPowerConfirm(true)
    }

    useEffect(() => {
        if (getCharacterName(playerNow) != "藥不然" && getCharacterName(playerNow) != "鄭國渠") {
            handlePowerDone();
        }
        if (getCharacterName(playerNow) === "老朝奉") {
            setAnimalRealAltered((prevAnimalReals) => {
                prevAnimalReals[gameTurn] = alterSwitch
                return prevAnimalReals
            })
        }
        //console.log("封鎖", animalBlocked)
        //console.log("animalOrders", animalOrders)
    })

    const handlePlayerPowerFinish = () => {
        if (preAlterSwitch === false && alterSwitch === true && characterList[characters[playerNow]] === "老朝奉") {
            addGameLog(playerNames[playerNow] + "發動了老朝奉的能力！")
            setPrevAlterSwitch(true)
        } else if (characterList[characters[playerNow]] === "老朝奉") {
            addGameLog(playerNames[playerNow] + "並沒有發動老朝奉的能力。")
        }
        onPlayerPowerFinish()

    }

    return (
        <div>
            <div>
                {getCharacterName(playerNow) === "藥不然" && <PowerGank></PowerGank>}
                {getCharacterName(playerNow) === "鄭國渠" && <PowerBlock></PowerBlock>}
                {getCharacterName(playerNow) === "老朝奉" && <PowerAlter></PowerAlter>}
                {getCharacterName(playerNow) !== "老朝奉" &&
                    getCharacterName(playerNow) !== "鄭國渠" &&
                    getCharacterName(playerNow) !== "藥不然" &&
                    <PowerNothing></PowerNothing>}
            </div>
            <div>
                <button disabled={!plyaerPowerConfirm} onClick={handlePlayerPowerFinish}>確認</button>
            </div>
        </div>

    )
}

export default PlayerPower;