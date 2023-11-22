import React, { useEffect, useState } from 'react';
import { useGameMetaContext } from './GameMetaContext';
import { useGameContext } from './GameContext';
import IdentTreasure from './IdentTreasure';

function PlayerPower({ }) {

    const [clickedGankingButton, setClickedGankingButton] = useState(-1);

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

    const PowerGank = () => {
        // TODO: 無法偷襲老朝奉
        return (
            <div>
                <div>
                    請選擇要偷襲的對象：
                    <GankedButtonList onPlayerGanked={handlePlayerGanked}></GankedButtonList>
                </div>
                <div>

                </div>
            </div>
        )
    }

    const Power = ({ characterName }) => {
        let content
        if (characterName === "藥不然") {
            content = <PowerGank></PowerGank>
        } else if (characterName === "姬雲浮") {
            content = <IdentTreasure identTime={1} identTruly={true}></IdentTreasure>
        } else if (characterName === "方震") {
            content = <IdentTreasure identTime={1} identTruly={true}></IdentTreasure>
        } else if (characterName === "黃煙煙") {
            content = <IdentTreasure identTime={1} identTruly={false}></IdentTreasure>
        } // TODO: Add all characters
        return <div>{content}</div>
    }

    useEffect(() => {
        console.log(beingGankedTime)
    })

    return (
        <div>
            <Power characterName={CHARACTERLIST[characters[playerNow]]} />
        </div>

    )
}

export default PlayerPower;