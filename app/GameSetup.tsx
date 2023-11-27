import React, { useEffect, useState } from 'react';
import PlayerList from './PlayerList';
import { useGameMetaContext } from './GameMetaContext';
import { useGameContext } from './GameContext';

function GameSetup({ onSubmit }) {
    const { MIN_PLAYERS, MAX_PLAYERS, numberOfPlayers, setNumberOfPlayers = () => { }, playerNames, playerNow, setPlayerNow = () => { }, playerPlayed, setPlayerPlayed } =
        useGameMetaContext() ?? {
            MIN_PLAYERS: 0,
            MAX_PLAYERS: 0,
            numberOfPlayers: 0,
            setNumberOfPlayers: undefined,
            playerNames: [],
            playerNow: 0,
            setPlayerNow: undefined,
            playerPlayed: [],
            setPlayerPlayed: () => { },
        };

    const { setCharacterList } = useGameContext() ?? {
        setCharacterList: () => { },
    }
    const { gameLog } = useGameContext() ?? { gameLog: "" }

    const [selectedFirstPlayer, setSelectedFirstPlayer] = useState(-1);

    const handleFirstPlayerSelection = (player) => {
        setSelectedFirstPlayer(player);
    };

    const handlePlayerCountChange = event => {
        const inputNumber = parseInt(event.target.value, 10);
        setNumberOfPlayers(isNaN(inputNumber) ? 0 : inputNumber);
    };

    const onBigEyeIsIn = () => {
        setCharacterList(['許願', '方震', '黃煙煙', '木戶加奈', '老朝奉', '藥不然', '鄭國渠', '大眼賊'])
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        // Check if the first numberOfPlayers elements are filled.
        const isFormValid = Object.values(playerNames).slice(0, numberOfPlayers).every((value) => value !== '');

        if (!isFormValid) {
            alert("Please fill in all fields");
        } else {
            if (isBigEyeOn) {
                onBigEyeIsIn()
            }
            if (selectedFirstPlayer === -1) {
                let randomNumber = Math.floor(Math.random() * (numberOfPlayers - 0))
                setPlayerNow(randomNumber)
                setPlayerPlayed([randomNumber])
                onSubmit();

            } else {
                setPlayerNow(selectedFirstPlayer)
                setPlayerPlayed([selectedFirstPlayer])
                onSubmit();
            }

        }
    };

    const playerOptions = Array.from({ length: MAX_PLAYERS - MIN_PLAYERS + 1 }, (_, index) => MIN_PLAYERS + index);
    const [isBigEyeOn, setIsBigEyeOn] = useState(false)

    const handleIsBigEyeOnChange = () => {
        setIsBigEyeOn(!isBigEyeOn)
    }

    const [isBigEyeRuleDisplay, setIsBigEyeRuleDisplay] = useState(false)

    useEffect(() => {


    })


    return (
        <div>
            <div>
                <h2>遊戲設置</h2>
                <form onSubmit={handleFormSubmit}>
                    請輸入玩家數量：
                    <select id="playerCount" value={numberOfPlayers} onChange={handlePlayerCountChange}>
                        {playerOptions.map((count) => (
                            <option key={count} value={count}>
                                {count}
                            </option>
                        ))}
                    </select>
                    <PlayerList numberOfPlayers={numberOfPlayers} selectedFirstPlayer={selectedFirstPlayer} onFirstPlayerSelection={handleFirstPlayerSelection} />
                    <button type="submit">Submit</button>
                </form>
            </div >
            <div>
                <li>
                    啟用粉絲角色：大眼賊
                    <label className="toggle-switch">
                        <input type="checkbox" onChange={handleIsBigEyeOnChange} checked={isBigEyeOn}></input>
                        <div className="switch-track">
                            <div className="switch-thumb"></div>
                        </div>
                    </label>
                    <button onClick={() => { setIsBigEyeRuleDisplay(!isBigEyeRuleDisplay) }}>查看規則</button>
                    {isBigEyeRuleDisplay && (
                        <div style={{ height: '400px', overflow: 'auto' }}>
                            <p>大眼賊屬於許願方陣營</p>
                            <p>大眼賊會取代姬雲浮的角色</p>
                            <p>大眼賊無法查驗當回合的獸首，取而代之的是他可以查驗<i>上一回合</i>和<i>下一回合</i>的獸首各一個</p>
                            <p>在查驗時，大眼賊無法看到獸首的名稱，而是看到<i>編號</i></p>
                            <p>每個回合的獸首編號依序為「甲，乙，丙，丁」、「戊，己，庚，辛」、「申，酉，戌，亥」</p>
                            <p>大眼賊的查驗<i>會受到老朝奉和鄭國渠的效果影響</i>，他也同樣會被偷襲</p>
                            <p>另外，如果大眼賊被方震查驗，則<i>視作被偷襲</i></p>
                            <p>註：老朝奉的能力只會影響<i>當回合</i>的獸首<i>之後</i>的查驗結果</p>
                            <p>註：因此，如果老朝奉在最後一個位置開了技能，也會影響到之後大眼賊的查驗</p>
                        </div>
                    )}
                </li>
            </div>
            <div>
                <div><i>該程式為粉絲製作的古董局中局桌遊輔助程式，不代表官方立場！</i></div>
                <div><i>重新整理會導致該場遊戲資料消失，請小心！</i></div>
            </div>
        </div>
    );
}

export default GameSetup;