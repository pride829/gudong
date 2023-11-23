import React, { useEffect, useState } from 'react';
import { useGameMetaContext } from './GameMetaContext';
import { useGameContext } from './GameContext';
import IdentTreasure from './IdentTreasure';

function PlayerPower({ }) {

    const [clickedGankingButton, setClickedGankingButton] = useState(-1);
    const [plyaerPowerConfirm, setPlayerPowerConfirm] = useState(false)

    const { playerNow, playerNames } =
        useGameMetaContext() ?? {
            playerNow: 0,
            playerNames: [],
        }

    const { characters, CHARACTERLIST, beingGankedTime, setBeingGankedTime, setAnimalOrders } =
        useGameContext() ?? {
            characters: [],
            CHARACTERLIST: [],
            beingGankedTime: [],
            setBeingGankedTime: () => { }
        }

    const handlePlayerGanked = (index) => {
        setBeingGankedTime(
            (beingGankedTime) => {
                const tempBeingGankedTime: number[] = [...beingGankedTime]
                tempBeingGankedTime[index] += 1
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
                    disabled={(clickedGankingButton !== -1)}>
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
        // TODO: 無法偷襲老朝奉
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
    })

    return (
        <div>
            <div>
                <Power characterName={CHARACTERLIST[characters[playerNow]]} />
            </div>
            <div>
                <button disabled={!plyaerPowerConfirm}>確認</button>
            </div>
        </div>

    )
}

export default PlayerPower;