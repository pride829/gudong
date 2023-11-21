import React, { useState } from 'react';
import { useGameMetaContext } from './GameMetaContext';
import { useGameContext } from './GameContext';
import IdentTreasure from './IdentTreasure';

function PlayerPower({ }) {
    const { playerNow, playerNames } =
        useGameMetaContext() ?? {
            playerNow: 0,
            playerNames: [],
        }

    const { characters, CHARACTERLIST } =
        useGameContext() ?? {
            characters: [],
            CHARACTERLIST: [],
        }

    const PowerGank = () => {
        // TODO: 無法偷襲老朝奉

        console.log(playerNames)
        return (
            <div>
                <div>
                    請選擇要偷襲的對象：
                    {playerNow}
                    {playerNames}
                    {characters}, {CHARACTERLIST}
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

    return (
        <div>
            <Power characterName={CHARACTERLIST[characters[playerNow]]} />
        </div>

    )
}

export default PlayerPower;