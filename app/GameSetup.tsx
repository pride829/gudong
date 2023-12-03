import React, { useEffect, useState } from 'react';
import PlayerList from './PlayerList';
import { useGameMetaContext } from './GameMetaContext';
import { useGameContext } from './GameContext';

function GameSetup({ onSubmit }) {
    const { getPlayerTextStyle, MIN_PLAYERS, MAX_PLAYERS, numberOfPlayers, setNumberOfPlayers = () => { }, playerNames, playerNow, setPlayerNow = () => { }, playerPlayed, setPlayerPlayed } =
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
            getPlayerTextStyle: () => { }
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
            alert("請填入所有玩家名稱");
        } else {
            if (isBigEyeOn) {
                onBigEyeIsIn()
            } else if (isLaiOn) {
                setCharacterList(['許願', '方震', '黃煙煙', '木戶加奈', '老朝奉', '藥不然', '鄭國渠', '藥來'])
            }
            if (isDirectorOn) {
                setCharacterList((prevCharacterList) => {
                    const tempCharacterList = [...prevCharacterList]
                    tempCharacterList[2] = "劉局"
                    return tempCharacterList
                })
            }
            if (isDevilSecondBrotherOn) {
                setCharacterList((prevCharacterList) => {
                    const tempCharacterList = [...prevCharacterList]
                    tempCharacterList[5] = "魔藥不然"
                    return tempCharacterList
                })
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
    const [isLaiOn, setIsLaiOn] = useState(false)
    const [isDirectorOn, setIsDirectorOn] = useState(false)
    const [isDevilSecondBrotherOn, setIsDevilSecondBrotherOn] = useState(false)

    const handleIsBigEyeOnChange = () => {
        setIsBigEyeOn(!isBigEyeOn)
    }

    const handleIsLaiOnChange = () => {
        setIsLaiOn(!isLaiOn)
    }

    const handleIsDirectorOnChange = () => {
        setIsDirectorOn(!isDirectorOn)
    }

    const handleIsDevilSecondBrotherOn = () => {
        setIsDevilSecondBrotherOn(!isDevilSecondBrotherOn)
    }
    const [isBigEyeRuleDisplay, setIsBigEyeRuleDisplay] = useState(false)
    const [isLaiRuleDisplay, setIsLaiRuleDisplay] = useState(false)
    const [isDirectorRuleDisplay, setIsDirectorRuleDisplay] = useState(false)
    const [isDevilSecondBrotherRuleDisplay, setIsDevilSecondBrotherRuleDisplay] = useState(false)

    useEffect(() => {


    })

    const GithubLink = () => {
        return (
            <div>
                <a href="https://github.com/pride829/gudong">Github</a>
            </div>
        );
    };


    return (
        <div>
            <div>
                <div>建議使用Firefox進行遊戲</div>
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
                    <button type="submit">確定</button>
                    <div style={{ color: "gray" }}><i>不論首家是誰，都是由第一家先選角色</i></div>
                </form>
            </div>
            <div>
                <li hidden={numberOfPlayers < 8}>
                    啟用粉絲角色：大眼賊
                    <label className="toggle-switch">
                        <input type="checkbox" disabled={isLaiOn} onChange={handleIsBigEyeOnChange} checked={isBigEyeOn}></input>
                        <div className="switch-track">
                            <div className="switch-thumb"></div>
                        </div>
                    </label>
                    <button onClick={() => { setIsBigEyeRuleDisplay(!isBigEyeRuleDisplay) }}>查看規則</button>
                    {isBigEyeRuleDisplay && (
                        <div style={{ backgroundColor: "gray", height: '500px', overflow: 'auto' }}>
                            <p>大眼賊屬於許願方陣營</p>
                            <p>大眼賊會取代姬雲浮的角色</p>
                            <p>大眼賊無法查驗當回合的獸首，取而代之的是他可以查驗<i>上一回合</i>和<i>下一回合</i>的獸首各一個</p>
                            <p>在查驗時，大眼賊無法看到獸首的名稱，而是看到<i>編號</i></p>
                            <p>每個回合的獸首編號依序為「子，丑，寅，卯」、「辰，巳，午，未」、「申，酉，戌，亥」</p>
                            <p>大眼賊的查驗<i>會受到老朝奉和鄭國渠的效果影響</i>，他也同樣會被偷襲</p>
                            <p>另外，如果大眼賊被方震查驗，則<i>視作被偷襲</i></p>
                            <p>註：老朝奉的能力只會影響<i>當回合</i>的獸首<i>之後</i>的查驗結果</p>
                            <p>註：因此，如果老朝奉在最後一個位置開了技能，也會影響到之後大眼賊的查驗</p>
                            <p>出處：小說《古董局中局2：清明上河圖之謎》</p>
                        </div>
                    )}
                </li>
            </div>
            <div>
                <li hidden={numberOfPlayers < 8}>
                    啟用粉絲角色：藥來
                    <label className="toggle-switch">
                        <input type="checkbox" disabled={isBigEyeOn} onChange={handleIsLaiOnChange} checked={isLaiOn}></input>
                        <div className="switch-track">
                            <div className="switch-thumb"></div>
                        </div>
                    </label>
                    <button onClick={() => { setIsLaiRuleDisplay(!isLaiRuleDisplay) }}>查看規則</button>
                    {isLaiRuleDisplay && (
                        <div style={{ backgroundColor: "gray", height: '500px', overflow: 'auto' }}>
                            <p>藥來屬於許願方陣營</p>
                            <p>藥來會取代姬雲浮的角色</p>
                            <p>在遊戲的一開始，藥來有二分之一的機率會被老朝奉影響。如果藥來被影響的話，他的查驗結果會必定是錯的，反之，則必定是對的。</p>
                            <p>無論如何，藥來的查驗結果都不會受到老朝奉的影響</p>
                            <p>出處：小說《古董局中局1》</p>
                            <p>角色概念提供：彥瑋@那間桌遊店</p>
                        </div>
                    )}
                </li>
            </div>
            <div>
                <li>
                    啟用粉絲角色：劉局
                    <label className="toggle-switch">
                        <input type="checkbox" onChange={handleIsDirectorOnChange} checked={isDirectorOn}></input>
                        <div className="switch-track">
                            <div className="switch-thumb"></div>
                        </div>
                    </label>
                    <button onClick={() => { setIsDirectorRuleDisplay(!isDirectorRuleDisplay) }}>查看規則</button>
                    {isDirectorRuleDisplay && (
                        <div style={{ backgroundColor: "gray", height: '500px', overflow: 'auto' }}>
                            <p>劉局屬於許願方陣營</p>
                            <p>劉局會取代黃煙煙的角色</p>
                            <p>劉局在第二和第三回合無法鑒定寶物。</p>
                            <p>劉局可以得知許願和方震的身份，但無從分辨兩者。</p>
                            <p>出處：小說《古董局中局1》</p>
                        </div>
                    )}
                </li>
            </div>
            <div>
                <li>
                    啟用粉絲角色：魔藥不然
                    <label className="toggle-switch">
                        <input type="checkbox" onChange={handleIsDevilSecondBrotherOn} checked={isDevilSecondBrotherOn}></input>
                        <div className="switch-track">
                            <div className="switch-thumb"></div>
                        </div>
                    </label>
                    <button onClick={() => { setIsDevilSecondBrotherRuleDisplay(!isDevilSecondBrotherRuleDisplay) }}>查看規則</button>
                    {isDevilSecondBrotherRuleDisplay && (
                        <div style={{ backgroundColor: "gray", height: '500px', overflow: 'auto' }}>
                            <p>魔藥不然屬於老朝奉方陣營</p>
                            <p>魔藥不然會取代藥不然的角色</p>
                            <p>魔藥不然不會偷襲，取而代之的是，他可以投毒</p>
                            <p>魔藥不然一場遊戲最多可以投毒兩次</p>
                            <p>被投毒的角色不會察覺自己被投毒，而毒藥會導致他的查驗結果相反</p>
                            <p>這個效果會和老朝奉的技能效果疊加</p>
                            <p>方震的查驗結果不會被毒藥影響，但如果方震被投毒，會導致許願連帶被投毒</p>
                            <p>如果姬雲浮被投毒，則視作被偷襲</p>
                        </div>
                    )}
                </li>
            </div>
            <div>
                <div><i>該程式為粉絲製作的古董局中局桌遊輔助程式，不代表官方立場！</i></div>
                <div><i>重新整理會導致該場遊戲資料消失，請小心！</i></div>
                <div><i>程式仍然處於早期測試階段，可能會出現導致遊戲錯誤的Bug！</i></div>
                <div><GithubLink /></div>
            </div>
        </div >
    );
}

export default GameSetup;
