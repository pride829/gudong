import React, { useEffect, useState } from 'react'
import { GameContext, useGameContext } from './GameContext'

function Dummy() {

    const { dummy, setDummy } = useGameContext() ?? {
        dummy: 0,
        setDummy: () => { }

    }
    const [mydummy, setMydummy] = useState(-1)

    useEffect(() => {
        console.log("mydummy:", mydummy)
        console.log("dummy", dummy)
    })

    const handleButtonClicked = () => {
        setMydummy(10)
        setDummy(7)
    }

    return (
        <div>
            <button onClick={handleButtonClicked} disabled={mydummy == 10}>button</button>
        </div>
    )
}

export default Dummy;