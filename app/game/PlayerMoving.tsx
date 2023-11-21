import React, { useState } from 'react';
import { useGameMetaContext } from './GameMetaContext';
import PlayerIdent from './PlayerIdent';
import PlayerPower from './PlayerPower';

function PlayerMoving({ }) {
    const { playerNow, playerNames } =
        useGameMetaContext() ?? {
            playerNow: 0,
            playerNames: []
        }
    const [phase, setPhase] = useState('playerPower');

    const handlePlayerConfirmFinish = () => {
        setPhase('playerPower')
    };

    return (
        <div>
            ffff
            {phase === 'playerIdent' && (
                <div>sdfsdfsdf
                    <PlayerIdent />
                </div>
            )}
            {phase === 'playerPower' && (
                <div>4dssdf
                    sdfsdfweg
                    <PlayerPower />
                </div>
            )}

        </div >
    )
}

export default PlayerMoving;