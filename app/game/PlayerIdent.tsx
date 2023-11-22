import React, { useState } from 'react';
import { useGameMetaContext } from './GameMetaContext';
import { useGameContext } from './GameContext';
import IdentTreasure from './IdentTreasure';

function PlayerIdent({ }) {
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

    const Ident = ({ characterName }) => {
        let content
        if (characterName === "許願") {
            content = <IdentTreasure identTime={2} identTruly={false}></IdentTreasure>
        } else if (characterName === "姬雲浮") {
            content = <IdentTreasure identTime={1} identTruly={true}></IdentTreasure>
        } else if (characterName === "方震") {
            content = <IdentTreasure identTime={1} identTruly={true}></IdentTreasure>
        } else if (characterName === "黃煙煙") {
            content = <IdentTreasure identTime={1} identTruly={false}></IdentTreasure>
        } else if (characterName === "藥不然") {
            content = <IdentTreasure identTime={1} identTruly={true}></IdentTreasure>
        }

        // TODO: Add all characters
        return <div>{content}</div>
    }


    return (
        <div>
            <Ident characterName={CHARACTERLIST[characters[playerNow]]} />
        </div>

    )
}

export default PlayerIdent;