import React, { useState, memo } from 'react';
import { useGameMetaContext } from './GameMetaContext';
import { useGameContext } from './GameContext';
import IdentTreasure from './IdentTreasure';
import IdentPeople from './IdentPeople';
import FactionInfo from './FactionInfo';

function PlayerIdent({ onPlayerIdentFinish }) {
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

    const [identDone, setIdentDone] = useState(false)

    const handleIdentDone = () => {
        setIdentDone(true)
    }

    // 這裡把if判斷式給刪掉，因為似乎會造成if內的東西再identDone 被更改時re-render. 判斷identTime和identTruly則在IdentTreasure裡面

    return (
        <div>
            <div>
                {
                    CHARACTERLIST[characters[playerNow]] != "方震" &&
                    <IdentTreasure onFinished={handleIdentDone} />
                }
                {
                    CHARACTERLIST[characters[playerNow]] === "方震" &&
                    <IdentPeople onFinished={handleIdentDone} />
                }
            </div>
            <div>
                <div>陣營資訊</div>
                <FactionInfo></FactionInfo>
            </div>
            <div>
                <button disabled={identDone === false} onClick={onPlayerIdentFinish}>確認</button>
            </div>
        </div>
    )
}

export default PlayerIdent;