import React, { useEffect, useState } from 'react';
import { useGameMetaContext } from './GameMetaContext';
import PlayerMoving from './PlayerMoving';
import PlayerPass from './PlayerPass';

function Player({ onPlayerFinish }) {
    const { playerNow, playerNames, setPlayerNow, playerPlayed, setPlayerPlayed } =
        useGameMetaContext() ?? {
            playerNow: 0,
            setPlayerNow: () => { },
            playerNames: [],
            playerPlayed: 0,
            setPlayerPlayed: () => { },

        }
    const { getPlayerTextBackground, getPlayerTextStyle } =
        useGameMetaContext() ?? { getPlayerTextBackground: () => Object, getPlayerTextStyle: () => Object };

    const [phase, setPhase] = useState('playerConfirm');

    const handlePlayerConfirmFinish = () => {
        setPhase('playerMoving')
    };
    const handlePlayerMovingFinish = () => {
        setPhase('playerPass')
    }
    const handlePlayerPassFinish = (index) => {
        if (index != -1) {
            setPlayerNow(index);
            setPhase('playerConfirm')
        } else {
            setPlayerPlayed([playerNow])
            onPlayerFinish()
        }
    }

    useEffect(() => {

        //console.log(playerPlayed)
    })

    return (
        <div>
            請 <span style={{ ...getPlayerTextStyle(playerNow), ...getPlayerTextBackground(playerNow) }}>{playerNames[playerNow]}
            </span>    進行回合
            {phase === 'playerConfirm' && (
                <div>
                    <div>請{" "}
                        <span style={{ ...getPlayerTextStyle(playerNow), ...getPlayerTextBackground(playerNow) }}>{playerNames[playerNow]}</span>
                        {" "}確認現在是自己的回合</div>
                    <button onClick={handlePlayerConfirmFinish}>確認</button>
                </div>
            )}
            {phase === 'playerMoving' && (
                <div>
                    <PlayerMoving onPlayerMovingEnd={handlePlayerMovingFinish} />
                </div>
            )}
            {phase === 'playerPass' && (
                <div>
                    <PlayerPass onPlayerPassFinish={handlePlayerPassFinish}></PlayerPass>
                </div>
            )}

        </div >
    )
}

export default Player;