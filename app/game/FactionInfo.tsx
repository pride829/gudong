import React, { useState, memo } from 'react';
import { useGameMetaContext } from './GameMetaContext';
import { useGameContext } from './GameContext';
import IdentTreasure from './IdentTreasure';
import IdentPeople from './IdentPeople';

function FactionInfo() {
    const { playerNow, playerNames, numberOfPlayers } =
        useGameMetaContext() ?? {
            playerNow: 0,
            playerNames: [],
            numberOfPlayers: 0
        }

    const { characters, CHARACTERLIST } =
        useGameContext() ?? {
            characters: [],
            CHARACTERLIST: [],
        }

    const getCharacterName = (index) => { return CHARACTERLIST[characters[index]] }

    function findBigBrother(): number {
        for (let i = 0; i < numberOfPlayers; i++) {
            if (getCharacterName(i) === "老朝奉") {
                return i
            }
        }
        return -1
    }

    function findSecondBrother(): number {
        for (let i = 0; i < numberOfPlayers; i++) {
            if (getCharacterName(i) === "藥不然") {
                return i
            }
        }
        return -1
    }

    function FactionBadInfo() {

        return (
            <div>
                <div>{playerNames[findBigBrother()] + "(老朝奉)"}</div>
                <div>{playerNames[findSecondBrother()] + "(藥不然)"}</div>
            </div>
        )
    }

    return (
        <div>
            {getCharacterName(playerNow) === "老朝奉" || getCharacterName(playerNow) === "藥不然" ?
                <FactionBadInfo></FactionBadInfo>
                : "不適用"}
        </div>
    )
}
export default FactionInfo