import React, { useState } from 'react';
import { useGameMetaContext } from './GameMetaContext';
import PlayerIdent from './PlayerIdent';
import PlayerPower from './PlayerPower';

function PlayerMoving({ }) {

    const [phase, setPhase] = useState('playerIdent');

    const handlePlayerIdentFinish = () => {
        setPhase('playerPower')
    };

    return (
        <div>
            {phase === 'playerIdent' && (
                <div>
                    <PlayerIdent onPlayerIdentFinish={handlePlayerIdentFinish} />
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