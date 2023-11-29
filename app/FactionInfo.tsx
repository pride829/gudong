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

    const { characters, characterList } =
        useGameContext() ?? {
            characters: [],
            characterList: [],
        }

    const { getPlayerTextBackground, getPlayerTextStyle } =
        useGameMetaContext() ?? { getPlayerTextBackground: () => Object, getPlayerTextStyle: () => Object };

    const getCharacterName = (index) => { return characterList[characters[index]] }

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
                <div>
                    <span style={{ fontSize: "150%", ...getPlayerTextStyle(findBigBrother()), ...getPlayerTextBackground(findBigBrother()) }}>
                        {playerNames[findBigBrother()]}: (老朝奉)
                    </span>
                </div>
                <div>
                    <span style={{ fontSize: "150%", ...getPlayerTextStyle(findSecondBrother()), ...getPlayerTextBackground(findSecondBrother()) }}>
                        {playerNames[findSecondBrother()]}: (藥不然)
                    </span>
                </div>
            </div>
        )
    }

    return (
        <div>
            {(getCharacterName(playerNow) === "老朝奉" || getCharacterName(playerNow) === "藥不然") &&
                <FactionBadInfo></FactionBadInfo>}
            {(getCharacterName(playerNow) === "鄭國渠") &&
                "鄭國渠並不會和隊友相認。"
            }
            {(getCharacterName(playerNow) !== "老朝奉" &&
                getCharacterName(playerNow) !== "藥不然" &&
                getCharacterName(playerNow) !== "鄭國渠") &&
                "不適用。"
            }
        </div>
    )
}
export default FactionInfo