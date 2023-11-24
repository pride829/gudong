import React, { useEffect, useState } from 'react';
import { useGameContext } from './GameContext';
import { useGameMetaContext } from './GameMetaContext';

function VotePeople({ onVotePeopleEnd }) {

    const { numberOfPlayers, playerNames, playerNow, setPlayerNow = () => { } } =
        useGameMetaContext() ?? {
            numberOfPlayers: 0,
            playerNames: [],
            playerNow: 0,
            setPlayerNow: undefined,
        };
    const { ANIMALS, animalOrders, setAnimalOrders = () => { }, characters, setCharacters = () => { }, CHARACTERLIST,
        bossVoted,
        setBossVoted,
        xuVoted,
        setXuVoted,
        funVoted,
        setFunVoted } =
        useGameContext() ?? {
            ANIMALS: [],
            animalOrders: [],
            setAnimalOrders: undefined,
            characters: [],
            setCharacters: undefined,
            CHARACTERLIST: [],
            bossVoted: [],
            setBossVoted: () => { },
            xuVoted: -1,
            setXuVoted: () => { },
            funVoted: -1,
            setFunVoted: () => { },

        };

    function PeopleVoting() {

        const handleCharacterChoosing = (event) => {
            setPeopleChose(parseInt(event.target.value))
        }

        return (
            <form onSubmit={handlePeopleVotingSubmit}>
                {playerNames.map((c, characterIndex) => (
                    <ul key={characterIndex}>
                        <label>
                            <input
                                type="radio"
                                name="characterChoosing"
                                value={characterIndex}
                                checked={peopleChose === characterIndex}
                                disabled={characterIndex === playerIndex}
                                onChange={handleCharacterChoosing}
                            />
                            {c}
                        </label >
                    </ul>
                ))}
                <button type="submit">Submit</button>
            </form>
        );
    }

    const [playerIndex, setPlayerIndex] = useState(0);
    const [peopleChose, setPeopleChose] = useState((playerIndex + 1) % numberOfPlayers);


    const handlePeopleVotingSubmit = () => {
        console.log("index", playerIndex)
        console.log("peopleChose", peopleChose)


        if (CHARACTERLIST[characters[playerIndex]] === "老朝奉") {
            setXuVoted(peopleChose)
        } else if (CHARACTERLIST[characters[playerIndex]] === "藥不然") {
            setFunVoted(peopleChose)
        } else if (CHARACTERLIST[characters[playerIndex]] === "鄭國渠") {
            // pass
        } else {
            console.log("Added!")
            setBossVoted(
                (prevBossVoted) => {
                    const tempBossVoted = [...prevBossVoted]
                    tempBossVoted[peopleChose] += 1
                    return tempBossVoted
                })
        }

        setPlayerIndex(playerIndex + 1)
    }

    function PeopleVotingMsg() {

        const getCharacterName = () => {
            return CHARACTERLIST[characters[playerIndex]]
        }

        const msg = (name) => {
            if (name === "老朝奉") {
                return "請找出許願，讓許願陣營無法加2分"
            } else if (name === "藥不然") {
                return "請找出方震，讓許願陣營無法加1分"
            } else if (name === "鄭國渠") {
                return "你可以隨便選一個人，但不會有效果"
            } else {
                return "請投出老朝奉的人選，幫許願陣營加1分"
            }
        }

        return (<div>{getCharacterName()}，{msg(getCharacterName())}</div>)
    }

    useEffect(() => {
        if (playerIndex >= numberOfPlayers) {
            onVotePeopleEnd()
        }
    })

    useEffect(() => {
        setPeopleChose((playerIndex + 1) % numberOfPlayers)
    }, [playerIndex]
    )

    return (<div>
        鑒人
        <PeopleVotingMsg></PeopleVotingMsg>
        <PeopleVoting ></PeopleVoting>
    </div>)
}
export default VotePeople