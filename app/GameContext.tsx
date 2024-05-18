import { init } from 'next/dist/compiled/webpack/webpack';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from 'react-use';

function generateNumbersUpToN(n: number) {
    const numbers: number[] = [];
    for (let i = 0; i <= n; i++) {
        numbers.push(i);
    }
    return numbers;
}

function shuffleArray(array: number[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function shuffleArray2DnTimes(array: boolean[][], n: number) {
    let newArray = array.map(row => [...row]); // Create a deep copy
    for (let i = 0; i < n; i++) {
        newArray = shuffleArray2D(newArray)
    }
    return newArray
}

function shuffleArray2D(array: boolean[][]) {
    const newArray = array.map(row => [...row]); // Create a deep copy
    for (let i = newArray.length - 1; i > 0; i--) {
        for (let j = newArray[i].length - 1; j > 0; j--) {
            const m = Math.floor(Math.random() * (j + 1));
            //console.log(j, m);
            //console.log(newArray);
            [newArray[i][j], newArray[i][m]] = [newArray[i][m], newArray[i][j]];
            //console.log(newArray)
        }
        const n = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[n]] = [newArray[n], newArray[i]]
    }

    return newArray;
}

function sortGroups(array, groupSize) {
    const result: number[] = []
    for (let i = 0; i < array.length; i += groupSize) {
        const group: number[] = array.slice(i, i + groupSize);
        group.sort((a, b) => a - b)
        result.push(...group)
    }
    return result
}

interface GameContextProps {
    ANIMALS: string[];
    CHINESE: string[];
    animalOrders: number[] | undefined,
    setAnimalOrders: React.Dispatch<React.SetStateAction<number[] | undefined>> ,
    animalReals: boolean[][] | undefined,
    characters: number[] | undefined,
    setCharacters: React.Dispatch<React.SetStateAction<number[] | undefined>>,
    characterList: string[] | undefined,
    setCharacterList: React.Dispatch<React.SetStateAction<string[] | undefined>>,
    beingGankedTime: number[] | undefined,
    setBeingGankedTime: React.Dispatch<React.SetStateAction<number[] | undefined>>,
    dummy: number | undefined,
    setDummy: React.Dispatch<React.SetStateAction<number | undefined>>,
    civHuangBlockedTurn: number | undefined,
    civMuBlockedTurn: number | undefined,
    animalBlocked: boolean[] | undefined,
    setAnimalBlocked: React.Dispatch<React.SetStateAction<boolean[] | undefined>>,
    animalRealAltered: boolean[] | undefined,
    setAnimalRealAltered: React.Dispatch<React.SetStateAction<boolean[] | undefined>>,
    identedPeople: number[] | undefined,
    setIdentedPeople: React.Dispatch<React.SetStateAction<number[] | undefined>>,
    votedAnimals: boolean[] | undefined,
    setVotedAnimals: React.Dispatch<React.SetStateAction<boolean[] | undefined>>,
    bossVoted: number[] | undefined,
    setBossVoted: React.Dispatch<React.SetStateAction<number[] | undefined>>,
    xuVoted: number | undefined,
    setXuVoted: React.Dispatch<React.SetStateAction<number | undefined>>,
    funVoted: number | undefined,
    setFunVoted: React.Dispatch<React.SetStateAction<number | undefined>>,
    gameLog: string[] | undefined,
    addGameLog: (s: string) => void,
    setGameLog: React.Dispatch<React.SetStateAction<string[] | undefined>>,
    isLaiEffected: boolean | undefined,
    isXuDisplayFirstDirectorFactionInfo: boolean | undefined,
    beingPoisonedTime: number[] | undefined,
    setBeingPoisonedTime: React.Dispatch<React.SetStateAction<number[] | undefined>>,
    poisonUsedTime: number | undefined,
    setPoisonUsedTime: React.Dispatch<React.SetStateAction<number | undefined>>,
    beingConfusedPlayerIndex: number[] | undefined,
    setBeingConfusedPlayerIndex: React.Dispatch<React.SetStateAction<number[] | undefined>>,
}

export const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({ children }) => {
    const ANIMALS = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'];
    const CHINESE = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    //const [animalOrders, setAnimalOrders] = useState<number[]>([]);
    const [animalOrders, setAnimalOrders, removeAnimalOrder] = useLocalStorage<number[]>('animalOrders', [])
    const initialBooleanArray = [
        [true, true, false, false],
        [false, true, true, false],
        [false, false, true, true],
    ];
    //const [animalReals, setAnimalReals] = useState(initialBooleanArray);
    const [animalReals, setAnimalReals, removeAnimalReal] = useLocalStorage<boolean[][]>('animalReals', initialBooleanArray)
    //const [animalRealAltered, setAnimalRealAltered] = useState([false, false, false])
    const [animalRealAltered, setAnimalRealAltered, removeAnimalRealAltered] = useLocalStorage<boolean[]>('animalRealAltered', [false, false, false])
    //const [characters, setCharacters] = useState<number[]>([1, 2, 7, 3, 4, 5, 6, 0]); // characterList[character[0]] === '黃煙煙' 代表玩家0的角色是黃煙煙
    //const [characters, setCharacters] = useState<number[]>([])
    const [characters, setCharacters, removeCharacters] = useLocalStorage<number[]>('characters', [])
    //const [beingGankedTime, setBeingGankedTime] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]); // 被偷襲的次數
    const [beingGankedTime, setBeingGankedTime, removeBeingGankedTime] = useLocalStorage<number[]>('beingGankedTime', [0, 0, 0, 0, 0, 0, 0, 0])   // 被偷襲的次數
    //const [beingPoisonedTime, setBeingPoisonedTime] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0]);
    const [beingPoisonedTime, setBeingPoisonedTime, removeBeingPoisonedTime] = useLocalStorage<number[]>('beingPoisonedTime', [0, 0, 0, 0, 0, 0, 0, 0])
    //const [beingConfusedPlayerIndex, setBeingConfusedPlayerIndex] = useState([-1, -1, -1])
    const [beingConfusedPlayerIndex, setBeingConfusedPlayerIndex, removeBeingConfusedPlayerIndex] = useLocalStorage<number[]>('beingConfusedPlayerIndex', [-1, -1, -1])
    //const [poisonUsedTime, setPoisonUsedTime] = useState(0)
    const [poisonUsedTime, setPoisonUsedTime, removePoisonUsedTime] = useLocalStorage<number>('poisonUsedTime', 0)
    // const [dummy, setDummy] = useState<number>(0)
    const [dummy, setDummy, removeDummy] = useLocalStorage<number>('dummy', 0)
   // const [identedPeople, setIdentedPeople] = useState<number[]>([])
    const [identedPeople, setIdentedPeople, removeIdentedPeople] = useLocalStorage<number[]>('identedPeople', [])
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    //const [civHuangBlockedTurn, setCivHuangBlockedTurn] = useState(getRandomInt(0, 3))
    const [civHuangBlockedTurn, setCivHuangBlockedTurn, removeCivHuangBlockedTurn] = useLocalStorage<number>('civHuangBlockedTurn', getRandomInt(0, 3))
    //const [civMuBlockedTurn, setCivMuBlockedTurn] = useState(getRandomInt(0, 3))
    const [civMuBlockedTurn, setCivMuBlockedTurn, removeCivMuBlockedTurn] = useLocalStorage<number>('civMuBlockedTurn', getRandomInt(0, 3))
    //const [animalBlocked, setAnimalBlocked] = useState([false, false, false, false, false, false, false, false, false, false, false, false])
    const [animalBlocked, setAnimalBlocked, removeAnimalBlocked] = useLocalStorage<boolean[]>('animalBlocked', [false, false, false, false, false, false, false, false, false, false, false, false])
    //const [votedAnimals, setVotedAnimals] = useState([false, false, false, false, false, false, false, false, false, false, false, false])
    const [votedAnimals, setVotedAnimals, removeVotedAnimals] = useLocalStorage<boolean[]>('votedAnimals', [false, false, false, false, false, false, false, false, false, false, false, false])
    //const [bossVoted, setBossVoted] = useState([0, 0, 0, 0, 0, 0, 0, 0])
    const [bossVoted, setBossVoted, removeBossVoted] = useLocalStorage<number[]>('bossVoted', [0, 0, 0, 0, 0, 0, 0, 0])
    // const [xuVoted, setXuVoted] = useState(-1)
    const [xuVoted, setXuVoted, removeXuVoted] = useLocalStorage<number>('xuVoted', -1) 
    // const [funVoted, setFunVoted] = useState(-1)
    const [funVoted, setFunVoted, removeFunVoted] = useLocalStorage<number>('funVoted', -1)
    // const [gameLog, setGameLog] = useState<string[]>([])
    const [gameLog, setGameLog, removeGameLog] = useLocalStorage<string[]>('gameLog', [])
    // const [isXuDisplayFirstDirectorFactionInfo, setIsXuDisplayFirstDirectorFactionInfo] = useState(Math.random() < 0.5)
    const [isXuDisplayFirstDirectorFactionInfo, setIsXuDisplayFirstDirectorFactionInfo, removeIsXuDisplayFirstDirectorFactionInfo] = useLocalStorage<boolean>('isXuDisplayFirstDirectorFactionInfo', Math.random() < 0.5)
    // const [isLaiEffected, setIsLaiEffected] = useState(Math.random() < 0.5)
    const [isLaiEffected, setIsLaiEffected, removeIsLaiEffected] = useLocalStorage<boolean>('isLaiEffected', Math.random() < 0.5)
    function addGameLog(s: string) {
        //console.log(s)
        //console.log(gameLog)
        setGameLog(() => { if(gameLog){ return ([...gameLog, s])} })
    }

    // static character list
    //const [characterList, setCharacterList] = useState(['許願', '方震', '黃煙煙', '木戶加奈', '老朝奉', '藥不然', '鄭國渠', '大眼賊'])
    //const [characterList, setCharacterList] = useState(['許願', '方震', '黃煙煙', '木戶加奈', '老朝奉', '藥不然', '鄭國渠', '姬雲浮'])
    const [characterList, setCharacterList, removeCharacterList] = useLocalStorage<string[]>('characterList', ['許願', '方震', '黃煙煙', '木戶加奈', '老朝奉', '藥不然', '鄭國渠', '姬雲浮'])
    const contextValue: GameContextProps = {
        ANIMALS,
        animalOrders,
        setAnimalOrders,
        animalReals,
        characters,
        setCharacters,
        characterList,
        setCharacterList,
        beingGankedTime,
        setBeingGankedTime,
        dummy,
        setDummy,
        civHuangBlockedTurn,
        civMuBlockedTurn,
        animalBlocked,
        setAnimalBlocked,
        animalRealAltered,
        setAnimalRealAltered,
        identedPeople,
        setIdentedPeople,
        votedAnimals,
        setVotedAnimals,
        bossVoted,
        setBossVoted,
        xuVoted,
        setXuVoted,
        funVoted,
        setFunVoted,
        gameLog,
        addGameLog,
        setGameLog,
        CHINESE,
        isLaiEffected,
        isXuDisplayFirstDirectorFactionInfo,
        beingPoisonedTime,
        setBeingPoisonedTime,
        poisonUsedTime,
        setPoisonUsedTime,
        beingConfusedPlayerIndex,
        setBeingConfusedPlayerIndex,
    };


    useEffect(() => {
        const tempAnimalOrders = shuffleArray(shuffleArray(shuffleArray(generateNumbersUpToN(12 - 1))))
        setAnimalOrders(sortGroups(tempAnimalOrders, 4))
        const tempAnimalReals = shuffleArray2DnTimes(initialBooleanArray, 100)
        setAnimalReals(tempAnimalReals)
    }, []); // Empty dependency array ensures this runs only once


    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    return useContext(GameContext);
};