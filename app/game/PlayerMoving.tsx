import React, { useState } from 'react';
import { useGameMetaContext } from './GameMetaContext';
import PlayerIdent from './PlayerIdent';

function PlayerMoving({ }) {
    const { playerNow, playerNames } =
        useGameMetaContext() ?? {
            playerNow: 0,
            playerNames: []
        }
    const [phase, setPhase] = useState('playerIdent');

    const handlePlayerConfirmFinish = () => {
        setPhase('playerMoving')
    };

    return (
        <div>
            {phase === 'playerIdent' && (
                <div>
                    <PlayerIdent />
                </div>
            )}

        </div >
    )
}

export default PlayerMoving;