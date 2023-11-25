import React, { useEffect, useState } from 'react';
import { useGameContext } from './GameContext';
import { useGameMetaContext } from './GameMetaContext';

function TurnVoting({ onTurnVotingEnd }) {
    const { playerNow, playerNames, gameTurn } =
        useGameMetaContext() ?? {
            playerNow: 0,
            playerNames: [],
            gameTurn: 0
        }

    const { ANIMALS,
        animalOrders,
        animalReals,
        setAnimalOrders = () => { },
        characters,
        setCharacters = () => { },
        CHARACTERLIST,
        beingGankedTime,
        setBeingGankedTime = () => { },
        dummy,
        setDummy,
        civHuangBlockedTurn,
        civMuBlockedTurn,
        animalBlocked,
        animalRealAltered,
        votedAnimals,
        setVotedAnimals
    } = useGameContext() ?? {

        ANIMALS: [],
        animalOrders: [],
        animalReals: [],
        setAnimalOrders: undefined,
        characters: [],
        setCharacters: undefined,
        CHARACTERLIST: [],
        beingGankedTime: [],
        setBeingGankedTime: undefined,
        civHuangBlockedTurn: 0,
        civMuBlockedTurn: 0,
        animalBlocked: [],
        animalRealAltered: [],
        votedAnimals: [],
        setVotedAnimals: () => { },
    }

    const [voteNumber, setVoteNumber] = useState([0, 0, 0, 0])
    const [largestVoteIndex, setLargestVoteIndex] = useState(-1)
    const [secondLargestVoteIndex, setSecondLargestVoteIndex] = useState(-1)
    const [voteFinished, setVoteFinished] = useState(false)

    const handleInputChange = (event, index) => {
        // Ensure only numeric values are allowed (you can customize this validation)
        let inputValue = event.target.value.replace(/[^0-9]/g, '');
        if (inputValue === '') {
            inputValue = 0
        }
        const newInputValue = [...voteNumber]
        newInputValue[index] = parseInt(inputValue)
        setVoteNumber(newInputValue);
    };

    useEffect(() => {
        //console.log(votedAnimals)
        //console.log(animalReals)
    })

    function DisplayAnimalReal({ isDisplayed, isHidden, isReal }) {
        if (!isDisplayed) {
            return <div></div>
        }
        if (isHidden) {
            return <div>隱藏</div>
        }
        if (isReal) {
            return <div>真品</div>
        }
        return <div>贗品</div>
    }

    function VoteOneAnimal({ index }) { // 這裡要加{}!!!
        return (
            <div>
                <div>
                    {ANIMALS[animalOrders[index + gameTurn * 4]]}
                </div>
                <DisplayAnimalReal isDisplayed={voteFinished && (largestVoteIndex === index || secondLargestVoteIndex === index)} isHidden={largestVoteIndex === index}
                    isReal={animalReals[gameTurn][index]}></DisplayAnimalReal>
                <div>
                    <input placeholder="請投票"
                        disabled={voteFinished}
                        type="number" min="0" step="1" value={voteNumber[index]} onChange={(event) => handleInputChange(event, index)}></input>
                </div>
            </div>
        )
    }

    const handleSubmit = () => {
        const isConfirmed = window.confirm(
            "確定要進行投票嗎？" + "\n" +
            ANIMALS[animalOrders[0 + gameTurn * 4]] + ":" + voteNumber[0] + "\n" +
            ANIMALS[animalOrders[1 + gameTurn * 4]] + ":" + voteNumber[1] + "\n" +
            ANIMALS[animalOrders[2 + gameTurn * 4]] + ":" + voteNumber[2] + "\n" +
            ANIMALS[animalOrders[3 + gameTurn * 4]] + ":" + voteNumber[3]
        )

        // Check the user's response
        if (isConfirmed) {

            const tempVoteNumber = [...voteNumber]

            // find largest
            let largestVoting = tempVoteNumber[0]
            let largestIndex = 0

            for (let i = 1; i < 4; i++) {
                if (tempVoteNumber[i] > tempVoteNumber[largestIndex]) {
                    largestVoting = tempVoteNumber[i]
                    largestIndex = i
                }
            }
            tempVoteNumber[largestIndex] = -1

            let secondLargestVoting = tempVoteNumber[0]
            let secondLargestIndex = 0

            for (let i = 1; i < 4; i++) {
                if (tempVoteNumber[i] > tempVoteNumber[secondLargestIndex]) {
                    secondLargestVoting = tempVoteNumber[i]
                    secondLargestIndex = i
                }
            }
            setLargestVoteIndex(largestIndex)
            setSecondLargestVoteIndex(secondLargestIndex)
            setVotedAnimals((prevVotedAnimals) => {
                prevVotedAnimals[animalOrders[largestIndex + gameTurn * 4]] = true
                prevVotedAnimals[animalOrders[secondLargestIndex + gameTurn * 4]] = true
                return prevVotedAnimals
            })
            setVoteFinished(true)
        }
    }

    return (
        <div>
            <div>請進行投票鑒寶：</div>
            <VoteOneAnimal index={0}></VoteOneAnimal>
            <VoteOneAnimal index={1}></VoteOneAnimal>
            <VoteOneAnimal index={2}></VoteOneAnimal>
            <VoteOneAnimal index={3}></VoteOneAnimal>
            <button onClick={handleSubmit} disabled={voteFinished}>確認投票</button>
            <button onClick={onTurnVotingEnd} disabled={!voteFinished}>結束本回合</button>
        </div>)
}

export default TurnVoting