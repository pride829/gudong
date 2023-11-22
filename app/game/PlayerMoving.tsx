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
            {phase === 'playerIdent' && (
                <div>
                    <PlayerIdent />
                </div>
            )}
            {phase === 'playerPower' && (
                <div>
                    <PlayerPower />
                </div>
            )}

        </div >
    )
}

export default PlayerMoving;