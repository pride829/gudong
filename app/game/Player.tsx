import React, { useState } from 'react';
import { useGameMetaContext } from './GameMetaContext';
import PlayerIdent from './PlayerIdent';

function Player({ }) {
    const { playerNow, playerNames } =
        useGameMetaContext() ?? {
            playerNow: 0,
            playerNames: []
        }
    const [phase, setPhase] = useState('playerConfirm');

    const handlePlayerConfirmFinish = () => {
        setPhase('playerMoving')
    };

    return (
        <div>
            請 {playerNames[playerNow]} 進行回合
            {phase === 'playerConfirm' && (
                <div>
                    <div>請 {playerNames[playerNow]} 確認現在是自己的回合</div>
                    <button onClick={handlePlayerConfirmFinish}>確認</button>
                </div>
            )}
            {phase === 'playerMoving' && (
                <div>
                    <PlayerIdent />
                </div>
            )}

        </div >
    )
}

export default Player;