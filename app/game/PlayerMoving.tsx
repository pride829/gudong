import React, { useState } from 'react';
import { useGameMetaContext } from './GameMetaContext';
import PlayerIdent from './PlayerIdent';
import PlayerPower from './PlayerPower';

function PlayerMoving({ }) {

    const [phase, setPhase] = useState('playerIdent');
    const [skipPower, setSkipPower] = useState(false);

    const handlePlayerIdentFinish = () => {
        if (!skipPower) {
            setPhase('playerPower')
        } else {
            setPhase('playerPass')
        }
    };

    const handlePlayerPowerBeingSkip = () => {
        setSkipPower(true)
    }

    return (
        <div>
            {phase === 'playerIdent' && (
                <div>
                    <PlayerIdent onPlayerIdentFinish={handlePlayerIdentFinish} onPlayerBeingSkip={handlePlayerPowerBeingSkip} />
                </div>
            )}
            {phase === 'playerPower' && (
                <div>
                    <PlayerPower />
                </div>
            )}
            {phase === 'playerPass' && (
                <div>
                    playerPass
                </div>
            )}

        </div >
    )
}

export default PlayerMoving;